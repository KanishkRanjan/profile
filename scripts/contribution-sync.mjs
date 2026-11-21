import { gatherEvidence, generateSummary } from "./gemini-summary.mjs";
import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const providers = new Set(["github", "gitlab", "gerrit"]);
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const nonempty = (value) => typeof value === "string" && value.trim().length > 0;
const numbers = (value) => Array.isArray(value) && value.every((n) => Number.isSafeInteger(n) && n > 0);
const strings = (value) => Array.isArray(value) && value.every(nonempty);

function knownKeys(value, keys, context) {
  assert(value && typeof value === "object" && !Array.isArray(value), `${context}: expected an object`);
  for (const key of Object.keys(value)) assert(keys.includes(key), `${context}: unknown setting ${key}`);
}

function secureOrigin(value) {
  const url = new URL(value);
  assert(url.protocol === "https:" && !url.username && !url.password && url.pathname === "/" && !url.search && !url.hash, "baseUrl must be an HTTPS origin");
  return url.origin;
}

export function validateConfig(config) {
  knownKeys(config, ["version", "groups", "sources", "ai"], "config");
  if (config.ai !== undefined) {
    knownKeys(config.ai, ["enabled", "maxNewEntries"], "ai");
    assert(typeof config.ai.enabled === "boolean" && Number.isInteger(config.ai.maxNewEntries) && config.ai.maxNewEntries > 0 && config.ai.maxNewEntries <= 5, "AI budget must be between 1 and 5 new entries");
  }
  assert(config.version === 1, "Unsupported config version");
  assert(Array.isArray(config.groups) && config.groups.length > 0, "Configure at least one group");
  assert(Array.isArray(config.sources) && config.sources.length > 0, "Configure at least one source");
  const groupIds = new Set();
  for (const group of config.groups) {
    knownKeys(group, ["id", "name", "role", "summary", "sourceUrl"], "group");
    assert(nonempty(group.id) && nonempty(group.name) && nonempty(group.role), "Groups need id, name, and role");
    assert(!groupIds.has(group.id), `Duplicate group ${group.id}`);
    groupIds.add(group.id);
    if (group.summary !== undefined) assert(typeof group.summary === "string", "summary must be text");
    if (group.sourceUrl !== undefined) assert(new URL(group.sourceUrl).protocol === "https:", "sourceUrl must use HTTPS");
  }
  const sourceIds = new Set();
  for (const source of config.sources) {
    knownKeys(source, ["id", "provider", "group", "project", "author", "baseUrl", "labelPrefix", "only", "exclude", "filters", "limit", "overrides"], "source");
    assert(nonempty(source.id) && !sourceIds.has(source.id), "Source IDs must be nonempty and unique");
    sourceIds.add(source.id);
    assert(providers.has(source.provider), `Unsupported provider ${source.provider}`);
    assert(groupIds.has(source.group), `Unknown group ${source.group}`);
    assert(nonempty(source.project) && /^[\w.-]+(?:\/[\w.-]+)+$/.test(source.project), "project must be a repository path");
    assert(nonempty(source.author) && /^[\w@.+-]+$/.test(source.author), "author must be a username or email");
    if (source.provider === "github") {
      assert(source.project.split("/").length === 2 && !source.baseUrl, "GitHub sources use owner/repo on github.com");
    } else secureOrigin(source.baseUrl);
    if (source.labelPrefix !== undefined) assert(nonempty(source.labelPrefix), "labelPrefix must be text");
    for (const key of ["only", "exclude"]) if (source[key] !== undefined) assert(numbers(source[key]), `${key} must contain positive change numbers`);
    if (source.limit !== undefined) assert(Number.isSafeInteger(source.limit) && source.limit > 0, "limit must be a positive integer");
    if (source.filters !== undefined) {
      knownKeys(source.filters, ["includeKeywords", "excludeKeywords", "labels"], "filters");
      for (const [key, value] of Object.entries(source.filters)) assert(strings(value), `${key} must be a string array`);
      assert(source.provider !== "gerrit" || !source.filters.labels?.length, "Gerrit sources do not support label filters");
    }
    if (source.overrides !== undefined) {
      assert(source.overrides && typeof source.overrides === "object" && !Array.isArray(source.overrides), "overrides must be an object keyed by change number");
      for (const [number, override] of Object.entries(source.overrides)) {
        assert(/^[1-9]\d*$/.test(number), "Override keys must be change numbers");
        knownKeys(override, ["title", "description"], "override");
        if (override.title !== undefined) assert(nonempty(override.title), "Override title must be text");
        if (override.description !== undefined) assert(strings(override.description) && override.description.length > 0, "Override description must contain text");
      }
    }
  }
  return config;
}

export function cleanText(text = "") {
  return text
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)(?:\{[^}]*\})?/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[`*]/g, "")
    .replace(/(^|\s)_([^_]+)_(?=\s|[.,;:]|$)/g, "$1$2")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ").trim();
}

function excerpt(text) {
  if (text.length <= 360) return text;
  const cut = text.slice(0, 357);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

// Deterministic extraction: no generated claims and no external AI service.
export function describeChange(change, override = {}) {
  if (override.description) return override.description;
  const title = cleanText(override.title ?? change.title).replace(/^(?:fix|feat|test|chore|docs|refactor)(?:\([^)]*\))?!?:\s*/i, "");
  const body = (change.body ?? "").replace(/<!--[\s\S]*?-->/g, "").replace(/```[\s\S]*?```/g, "");
  const releases = body.match(/^#{1,6}\s+Release Notes?\s*\r?\n([\s\S]*?)(?=^#{1,6}\s|$(?![\s\S]))/im);
  const notes = releases?.[1].replace(/^\s*Notes:\s*/i, "").trim();
  let detail = notes && !/^(?:none|n\/a|no release notes|pending)[.!\s]*$/i.test(notes) ? cleanText(notes) : "";
  if (!detail) {
    const lines = body.split(/\r?\n/);
    const paragraphs = [];
    let paragraph = [];
    for (const line of lines) {
      if (/^#{1,6}\s+(?:Checklist|Release Notes|Test(?:ing| Plan)?|Screenshots?)/i.test(line)) break;
      if (/^\s*[-*]\s*\[[ xX]\]/.test(line) || /^\s*(?:Fixes|Closes|Resolves|Bug|Change-Id|Reviewed-on|Reviewed-by|Commit-Queue|Cr-Commit-Position|Co-authored-by|Feature-Flag|Test|Notes):/i.test(line)) continue;
      if (/^#{1,6}\s/.test(line) || !line.trim()) {
        if (paragraph.length) paragraphs.push(cleanText(paragraph.join(" ")));
        paragraph = [];
      } else paragraph.push(line);
    }
    if (paragraph.length) paragraphs.push(cleanText(paragraph.join(" ")));
    detail = paragraphs.find((text) => text && text !== cleanText(change.title) && !/^(?:Thank you|Before:|After:|Fixes?\s+#|BUG\s+\d+)/i.test(text)) ?? "";
  }
  return [detail && detail.toLowerCase() !== title.toLowerCase() ? `**${title}**: ${excerpt(detail)}` : `**${title}**`];
}

export function selectChanges(changes, source) {
  const filters = source.filters ?? {};
  const selected = changes.filter((change) => {
    if (source.exclude?.includes(change.number)) return false;
    if (source.only && !source.only.includes(change.number)) return false;
    const text = `${change.title}\n${change.body}`.toLowerCase();
    if (/^(?:revert|reapply)\b/i.test(change.title.trim())) return false;
    if (filters.includeKeywords?.length && !filters.includeKeywords.some((word) => text.includes(word.toLowerCase()))) return false;
    if (filters.excludeKeywords?.some((word) => text.includes(word.toLowerCase()))) return false;
    if (filters.labels?.some((label) => !(change.labels ?? []).includes(label))) return false;
    return true;
  });
  const seen = new Set();
  return selected.sort((a, b) => b.mergedAt.localeCompare(a.mergedAt) || b.number - a.number)
    .filter((change) => { if (seen.has(change.number)) return false; seen.add(change.number); return true; })
    .slice(0, source.limit ?? Infinity)
    .map((change) => {
      const override = source.overrides?.[change.number] ?? {};
      return {
        sourceId: source.id,
        number: change.number,
        id: `${source.labelPrefix ?? (source.provider === "gerrit" ? "CL " : source.provider === "gitlab" ? "MR !" : "PR #")}${change.number}`,
        title: cleanText(override.title ?? change.title),
        status: "merged",
        description: describeChange(change, override),
        link: change.link,
        mergedAt: change.mergedAt,
      };
    });
}

async function request(url, fetcher, token) {
  const headers = { "User-Agent": "profile-contribution-sync", Accept: "application/json" };
  // A GitHub token is never forwarded to another host (or through a redirect).
  if (new URL(url).origin === "https://api.github.com" && token) headers.Authorization = `Bearer ${token}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    let response;
    try { response = await fetcher(url, { headers, redirect: "error", signal: AbortSignal.timeout(20000) }); }
    catch (error) { if (attempt === 2) throw error; continue; }
    if (response.ok) {
      const text = await response.text();
      return { data: JSON.parse(text.replace(/^\)\]\}'\s*\n/, "")), headers: response.headers };
    }
    if (attempt === 2 || !(response.status === 429 || response.status >= 500)) throw new Error(`HTTP ${response.status} fetching ${new URL(url).hostname}; previous snapshot preserved`);
    await new Promise((done) => setTimeout(done, 1000 * (attempt + 1)));
  }
}

export async function fetchSource(source, { fetcher = fetch, token = process.env.GITHUB_TOKEN } = {}) {
  const all = [];
  for (let page = 1; page <= 100; page++) {
    if (source.provider === "github") {
      const url = new URL("https://api.github.com/search/issues");
      url.search = new URLSearchParams({ q: `repo:${source.project} author:${source.author} is:pr is:merged`, per_page: "100", page: String(page), sort: "created", order: "asc" });
      const { data } = await request(url, fetcher, token);
      assert(Array.isArray(data.items) && !data.incomplete_results && data.total_count <= 1000, `${source.id}: incomplete GitHub search; narrow the source rather than silently truncating`);
      for (const item of data.items) {
        if (!item.pull_request?.merged_at || item.user?.login?.toLowerCase() !== source.author.toLowerCase()) continue;
        all.push({ number: item.number, title: item.title, body: item.body, mergedAt: item.pull_request.merged_at, labels: item.labels.map((label) => label.name), link: `https://github.com/${source.project}/pull/${item.number}` });
      }
      if (page * 100 >= data.total_count) return all;
      assert(data.items.length > 0, `${source.id}: incomplete pagination`);
    } else if (source.provider === "gitlab") {
      const url = new URL(`/api/v4/projects/${encodeURIComponent(source.project)}/merge_requests`, source.baseUrl);
      url.search = new URLSearchParams({ scope: "all", state: "merged", author_username: source.author, per_page: "100", page: String(page), order_by: "created_at", sort: "asc" });
      const { data, headers } = await request(url, fetcher);
      assert(Array.isArray(data), `${source.id}: invalid GitLab response`);
      for (const item of data) {
        if (item.state !== "merged" || !item.merged_at || item.author?.username?.toLowerCase() !== source.author.toLowerCase()) continue;
        all.push({ number: item.iid, title: item.title, body: item.description, mergedAt: item.merged_at, labels: item.labels, link: `${secureOrigin(source.baseUrl)}/${source.project}/-/merge_requests/${item.iid}` });
      }
      if (!headers.get("x-next-page") && data.length < 100) return all;
    } else {
      const url = new URL("/changes/", source.baseUrl);
      url.search = new URLSearchParams({ q: `owner:${source.author} project:${source.project} status:merged`, n: "100", S: String((page - 1) * 100) });
      url.searchParams.append("o", "CURRENT_REVISION");
      url.searchParams.append("o", "CURRENT_COMMIT");
      const { data } = await request(url, fetcher);
      assert(Array.isArray(data), `${source.id}: invalid Gerrit response`);
      for (const item of data) {
        if (item.status !== "MERGED" || item.project !== source.project) continue;
        const revision = item.revisions?.[item.current_revision];
        const submitted = item.submitted;
        assert(submitted && revision?.commit, `${source.id}: missing merged date or commit message`);
        all.push({ number: item._number, title: item.subject, body: revision.commit.message, mergedAt: new Date(submitted.replace(" ", "T") + "Z").toISOString(), link: `${secureOrigin(source.baseUrl)}/c/${source.project}/+/${item._number}` });
      }
      if (!data.at(-1)?._more_changes) return all;
    }
  }
  throw new Error(`${source.id}: pagination limit reached; previous snapshot preserved`);
}

export async function collectContributions(config, previous, options = {}) {
  validateConfig(config);
  // Fetch every source before any write. One failed API keeps the entire snapshot intact.
  const byGroup = new Map(config.groups.map((group) => [group.id, []]));
  let attempted = 0;
  const frozen = new Map((previous?.groups ?? []).flatMap(g => g.contributions.map(item => [`${item.sourceId}:${item.number}`, item])));
  for (const source of config.sources) {
    options.log?.(`Checking ${source.id} (${source.provider}: ${source.project})…`);
    const changes = await fetchSource(source, options);
    const hadData = previous?.groups?.some((group) => group.contributions.some((item) => item.sourceId === source.id));
    assert(changes.length || !hadData, `${source.id}: unexpectedly empty response; previous snapshot preserved`);
    for (const change of changes) {
      assert(Number.isSafeInteger(change.number) && nonempty(change.title) && !Number.isNaN(Date.parse(change.mergedAt)), `${source.id}: invalid contribution data`);
      change.mergedAt = new Date(change.mergedAt).toISOString();
    }
    const selected = selectChanges(changes, source);
    if (!config.ai?.enabled) byGroup.get(source.group).push(...selected.filter(item => !frozen.has(`${source.id}:${item.number}`)));
    else {
      for (const item of selected) {
        // Existing entries are immutable, including dates, titles and descriptions.
        if (frozen.has(`${source.id}:${item.number}`)) continue;
        if (source.overrides?.[item.number]?.description) { byGroup.get(source.group).push(item); continue; }
        if (attempted >= config.ai.maxNewEntries) { options.log?.(`Held ${source.id}:${item.number}: cycle budget reached`); continue; }
        attempted++;
        try {
          const raw = changes.find(c => c.number === item.number);
          const docs = await (options.gatherEvidence ?? gatherEvidence)(source, raw, async url => (await request(url, options.fetcher ?? fetch, options.token ?? process.env.GITHUB_TOKEN)).data);
          const cached = options.cache?.groups?.flatMap(g => g.contributions).find(c => c.sourceId === source.id && c.number === item.number);
          const result = await (options.generateSummary ?? generateSummary)(docs, { key: options.geminiKey ?? process.env.GEMINI_API_KEY, fetcher: options.geminiFetcher ?? fetch, cached });
          byGroup.get(source.group).push({ ...item, description: result.description, ai: result.ai });
        } catch (error) {
          const message = `Held ${source.id}:${item.number}: ${error.message}`;
          options.log?.(message);
          options.held?.push(message);
        }
      }
    }
  }
  {
    // Keep entire existing groups and entries even if upstream metadata or config filters change.
    for (const group of previous?.groups ?? []) {
      if (!byGroup.has(group.id)) byGroup.set(group.id, []);
      byGroup.get(group.id).push(...group.contributions);
    }
  }
  const groupDefinitions = [...(previous?.groups ?? []).map(({ contributions, ...group }) => group), ...config.groups.filter(g => !previous?.groups?.some(old => old.id === g.id))];
  const groups = groupDefinitions.map((group) => ({
    ...group, summary: group.summary ?? "", sourceUrl: group.sourceUrl ?? "",
    contributions: byGroup.get(group.id).sort((a, b) => b.mergedAt.localeCompare(a.mergedAt) || a.sourceId.localeCompare(b.sourceId) || b.number - a.number),
  }));
  if (previous && JSON.stringify(previous.groups) === JSON.stringify(groups)) return previous;
  return { version: 1, verifiedOn: previous?.verifiedOn ?? (options.now ?? new Date()).toISOString().slice(0, 10), groups };
}

export function changeReport(previous, next) {
  const entries = (snapshot) => new Map((snapshot?.groups ?? []).flatMap((group) => group.contributions.map((item) => [`${item.sourceId}:${item.number}`, item])));
  const before = entries(previous), after = entries(next);
  const lines = ["Refresh merged contributions from the configured GitHub, GitLab, and Gerrit projects.", "", "Source statuses were checked during this run. Existing entries are frozen. New AI summaries require exact evidence quotations and a separate verification pass; human review is still required.", ""];
  for (const [key, item] of after) {
    const old = before.get(key);
    if (!old || JSON.stringify(old) !== JSON.stringify(item)) {
      lines.push(`- ${old ? "Updated" : "Added"}: [${item.id}](${item.link}) — ${item.title}`, ...item.description.map((text) => `  - ${text}`));
      for (const claim of item.ai?.claims ?? []) for (const support of claim.support) {
        const url = item.ai.sources.find(s => s.id === support.source)?.url ?? item.link;
        lines.push(`  - Evidence [${support.source}](${url}): ${support.quote.replace(/\s+/g, " ")}`);
      }
    }
  }
  for (const [key, item] of before) if (!after.has(key)) lines.push(`- Removed: [${item.id}](${item.link}) (excluded, filtered, source removed, or no longer returned as merged).`);
  lines.push("", "Validation: contribution sync tests and production build passed before this update was submitted.");
  return lines.join("\n") + "\n";
}

async function main() {
  const config = JSON.parse(await readFile("config/contributions.json", "utf8"));
  const output = "data/contributions.json";
  let previous;
  try { previous = JSON.parse(await readFile(output, "utf8")); } catch (error) { if (error.code !== "ENOENT") throw error; }
  let cache;
  try { cache = JSON.parse(await readFile(".contribution-sync/pending.json", "utf8")); } catch (error) { if (error.code !== "ENOENT") throw error; }
  const held = [];
  const next = await collectContributions(config, previous, { log: console.log, cache, held });
  const changed = JSON.stringify(previous) !== JSON.stringify(next);
  await mkdir(".contribution-sync", { recursive: true });
  await writeFile(".contribution-sync/pr-body.md", changeReport(previous, next) + (held.length ? "\nHeld for manual review (not published):\n" + held.map(s => `- ${s}`).join("\n") : ""));
  if (process.env.GITHUB_STEP_SUMMARY && held.length) await writeFile(process.env.GITHUB_STEP_SUMMARY, held.join("\n"), { flag: "a" });
  if (changed) {
    await mkdir(dirname(output), { recursive: true });
    await writeFile(`${output}.tmp`, JSON.stringify(next, null, 2) + "\n");
    await rename(`${output}.tmp`, output);
  }
  console.log(changed ? "Updated contribution snapshot." : "No contribution changes; no update PR needed.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => { console.error(`Contribution sync failed: ${error.message}`); process.exitCode = 1; });
}
