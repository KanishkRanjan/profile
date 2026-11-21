import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateConfig, describeChange, selectChanges, fetchSource, collectContributions, changeReport } from "./contribution-sync.mjs";

const source = { id: "example", provider: "github", group: "desktop", project: "owner/repo", author: "author" };
const config = () => ({ version: 1, groups: [{ id: "desktop", name: "Desktop", role: "Contributor" }], sources: [{ ...source }] });
const change = (number = 1, extras = {}) => ({ number, title: "fix: Preserve window icons", body: "Fixes #123\n\nPreserves native icons when menus reopen.\n\n#### Checklist\n- [x] Tests pass", mergedAt: "2026-11-01T00:00:00.000Z", labels: ["bug"], link: `https://github.com/owner/repo/pull/${number}`, ...extras });
const response = (data, headers = {}) => new Response(JSON.stringify(data), { status: 200, headers });
const githubItem = (number = 1, extras = {}) => ({ number, title: change().title, body: change().body, user: { login: "author" }, labels: [{ name: "bug" }], pull_request: { merged_at: change().mergedAt }, ...extras });

test("repository settings validate, and typoed or unsafe settings fail explicitly", async () => {
  validateConfig(JSON.parse(await readFile("config/contributions.json", "utf8")));
  const bad = config(); bad.sources[0].exlude = [1];
  assert.throws(() => validateConfig(bad), /unknown setting exlude/);
  for (const author of ["user is:open", 'user"', "user\nrepo:other/repo"]) {
    const bad = config(); bad.sources[0].author = author;
    assert.throws(() => validateConfig(bad), /author/);
  }
  for (const baseUrl of ["http://example.com", "https://user:secret@example.com", "https://example.com/subpath"]) {
    const bad = config(); Object.assign(bad.sources[0], { provider: "gitlab", baseUrl });
    assert.throws(() => validateConfig(bad), /HTTPS origin/);
  }
  const badLabel = config(); Object.assign(badLabel.sources[0], { provider: "gerrit", baseUrl: "https://review.example.com", filters: { labels: ["bug"] } });
  assert.throws(() => validateConfig(badLabel), /do not support label/);
});

test("release notes take precedence over template text without including checklists", () => {
  const description = describeChange(change(1, { body: "#### Description of Change\nInternal implementation details.\n#### Checklist\n- [x] tests\n#### Release Notes\nNotes: Fixed **window icons** disappearing.\n\n#### Other\nIgnored." }));
  assert.deepEqual(description, ["**Preserve window icons**: Fixed window icons disappearing."]);
});

test("none release notes fall back to the first relevant description paragraph", () => {
  const description = describeChange(change(1, { body: change().body + "\n#### Release Notes\nNotes: None" }));
  assert.deepEqual(description, ["**Preserve window icons**: Preserves native icons when menus reopen."]);
});

test("empty descriptions use the title; markdown, images, HTML, code and trailers are removed", () => {
  assert.deepEqual(describeChange(change(1, { body: "" })), ["**Preserve window icons**"]);
  const body = "<!-- template -->\n```js\ndanger()\n```\n![before](https://example.com/a.png)\n\nKeeps `window_icon` valid with [gfx::Image](https://example.com). <b>Native</b> behavior.\n\nBug: 12\nReviewed-by: Reviewer";
  assert.deepEqual(describeChange(change(1, { body })), ["**Preserve window icons**: Keeps window_icon valid with gfx::Image. Native behavior."]);
  assert.ok(describeChange(change(1, { body: "word ".repeat(200) }))[0].length < 400);
});

test("curated descriptions remain exact and exclusion takes precedence over an override", () => {
  const overrides = { 1: { description: ["**A curated summary**", "A second point."] } };
  assert.deepEqual(selectChanges([change()], { ...source, overrides })[0].description, overrides[1].description);
  assert.deepEqual(selectChanges([change()], { ...source, exclude: [1], overrides }), []);
});

test("only, keywords, labels, revert titles, deduplication, ordering and limits are applied", () => {
  const rules = { ...source, only: [1, 2, 3], filters: { includeKeywords: ["native"], excludeKeywords: ["skip"], labels: ["bug"] }, limit: 1 };
  const changes = [change(), change(), change(2, { mergedAt: "2026-11-02T00:00:00Z" }), change(3, { title: 'Revert "Preserve native icons"' }), change(4)];
  assert.deepEqual(selectChanges(changes, rules).map((entry) => entry.number), [2]);
  assert.equal(selectChanges([change(1, { labels: [] })], rules).length, 0);
  assert.equal(selectChanges([change(1, { body: "native skip" })], rules).length, 0);
});

test("GitHub pagination verifies merged state and authorship and scopes the query", async () => {
  const calls = [];
  const result = await fetchSource(source, { token: "test-token", fetcher: async (url, options) => {
    calls.push({ url, options });
    return response(calls.length === 1 ? { total_count: 101, incomplete_results: false, items: [githubItem(), githubItem(2, { pull_request: { merged_at: null } }), githubItem(3, { user: { login: "someone-else" } })] } : { total_count: 101, incomplete_results: false, items: [githubItem(4)] });
  } });
  assert.deepEqual(result.map((entry) => entry.number), [1, 4]);
  assert.equal(calls[0].url.searchParams.get("q"), "repo:owner/repo author:author is:pr is:merged");
  assert.equal(calls[1].url.searchParams.get("page"), "2");
  assert.equal(calls[0].options.headers.Authorization, "Bearer test-token");
  assert.equal(calls[0].options.redirect, "error");
  await assert.rejects(fetchSource(source, { fetcher: async () => response({ total_count: 1001, incomplete_results: false, items: [] }) }), /incomplete/);
  await assert.rejects(fetchSource(source, { fetcher: async () => response({ total_count: 1, incomplete_results: true, items: [] }) }), /incomplete/);
});

test("GitLab paginates project MRs, checks author and state, and receives no GitHub token", async () => {
  const calls = [];
  const result = await fetchSource({ ...source, provider: "gitlab", baseUrl: "https://invent.kde.org" }, { token: "secret", fetcher: async (url, options) => {
    calls.push({ url, options });
    const item = { iid: 1, title: "A fix", description: "Details", merged_at: change().mergedAt, author: { username: "author" }, state: "merged", labels: [] };
    return calls.length === 1 ? response([item, { ...item, iid: 2, state: "opened" }, { ...item, iid: 3, author: { username: "other" } }], { "x-next-page": "2" }) : response([]);
  } });
  assert.equal(result.length, 1);
  assert.equal(result[0].link, "https://invent.kde.org/owner/repo/-/merge_requests/1");
  assert.match(calls[0].url.pathname, /owner%2Frepo/);
  assert.equal(calls[1].url.searchParams.get("page"), "2");
  assert.equal(calls[0].options.headers.Authorization, undefined);
});

test("Gerrit handles XSSI, pagination, project scope, commit bodies and submitted dates", async () => {
  const calls = [];
  const result = await fetchSource({ ...source, provider: "gerrit", baseUrl: "https://review.example.com" }, { token: "secret", fetcher: async (url, options) => {
    calls.push({ url, options });
    const data = calls.length === 1 ? [{ _number: 7, subject: "Fix icons", project: "owner/repo", status: "MERGED", submitted: "2026-11-01 10:20:30.000000000", current_revision: "sha", revisions: { sha: { commit: { message: "Fix icons\n\nPreserves native behavior." } } }, _more_changes: true }] : [];
    return new Response(")]}'\n" + JSON.stringify(data));
  } });
  assert.equal(result[0].mergedAt, "2026-11-01T10:20:30.000Z");
  assert.match(result[0].body, /Preserves native/);
  assert.equal(calls[1].url.searchParams.get("S"), "100");
  assert.equal(calls[0].options.headers.Authorization, undefined);
});

test("unchanged syncs retain the snapshot date and do not create daily churn", async () => {
  const options = { fetcher: async () => response({ total_count: 1, items: [githubItem()] }), now: new Date("2026-11-01T00:00:00Z") };
  const previous = await collectContributions(config(), undefined, options);
  const next = await collectContributions(config(), previous, { ...options, now: new Date("2026-11-21T00:00:00Z") });
  assert.equal(next, previous);
});

test("a failed or unexpectedly empty source rejects the whole refresh without mutating prior data", async () => {
  const previous = await collectContributions(config(), undefined, { fetcher: async () => response({ total_count: 1, items: [githubItem()] }) });
  const frozen = JSON.stringify(previous);
  await assert.rejects(collectContributions(config(), previous, { fetcher: async () => new Response("rate limited", { status: 403 }) }), /HTTP 403/);
  await assert.rejects(collectContributions(config(), previous, { fetcher: async () => response({ total_count: 0, items: [] }) }), /unexpectedly empty/);
  const multi = config(); multi.sources.push({ ...source, id: "second", project: "owner/second" });
  await assert.rejects(collectContributions(multi, previous, { fetcher: async (url) => url.searchParams.get("q").includes("owner/second") ? new Response("no", { status: 404 }) : response({ total_count: 1, items: [githubItem(8)] }) }), /HTTP 404/);
  assert.equal(JSON.stringify(previous), frozen);
});

test("update reports show additions, removals and changed descriptions", () => {
  const first = selectChanges([change(1), change(2)], source);
  const second = selectChanges([change(2), change(3)], { ...source, overrides: { 2: { description: ["Updated wording"] } } });
  const report = changeReport({ groups: [{ contributions: first }] }, { groups: [{ contributions: second }] });
  assert.match(report, /Added: \[PR #3\]/);
  assert.match(report, /Removed: \[PR #1\]/);
  assert.match(report, /Updated: \[PR #2\]/);
  assert.match(report, /Updated wording/);
});
