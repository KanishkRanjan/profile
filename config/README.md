# Contribution bot: frozen history and evidence-based additions

Edit `config/contributions.json` in a GitHub PR to add a project. No React changes are needed. Merge the prerequisite scheduled-sync PR first; this enhancement is a separate PR and does not modify that PR.

## Existing contributions never change automatically

The committed `data/contributions.json` is the authoritative record. Every existing entry is retained verbatim, including its description, title, identifiers, links, and merge date. The snapshot's existing `verifiedOn` date is also preserved. Upstream edits, configuration overrides, filters, removed sources, and model changes do not rewrite or remove historical entries. Manual edits through a reviewed PR are required to change historical content. Existing group metadata is preserved too; new groups can be added.

The sync applies eligibility filters only to new entries. It only considers merged contributions from explicitly configured projects and authors. Chromium CL 7206079 remains excluded. Internship sections and the manual VS Code entry are outside the sync.

## Gemini configuration

Set repository **Settings → Secrets and variables → Actions → New repository secret**:

- Name: `GEMINI_API_KEY`
- Value: your Google AI Studio Gemini API key

Do not put the key in this file, JSON config, a browser-exposed environment variable, or a PR. The key goes only in the `x-goog-api-key` header to Google's API; GitHub tokens go only to api.github.com. Requests disable redirects. Provider error bodies and secrets are not logged.

The fixed default is **gemini-4-hydrogen**, a current stable model with a free tier listed by Google as of 21 November 2026. See Google's [model documentation](https://aistudio.google.com/docs/models/gemini-4-hydrogen) and [pricing](https://aistudio.google.com/docs/pricing#gemini-4-hydrogen). Model access and quotas depend on the Google project. Google may use free-tier inputs/outputs to improve products. Only public contribution evidence is collected. There is no automatic paid-model fallback; this code cannot enforce Google's billing settings, so keep your Google project on the intended free plan.

## Evidence and abstention

For each NEW eligible contribution:

1. Fetch the final implementation diff and changed tests, description/commit message, and review discussion. GitHub linked issues referenced with `Fixes #123` and KDE `BUG:` details are included when recognized. Chromium bug tracker pages are not fetched; summaries must stay within the commit/diff evidence.
2. Reject incomplete, missing, binary, oversized, or truncated diffs. Evidence is capped at 80,000 characters. If linked evidence is requested but inaccessible, hold the entry.
3. Ask Gemini for one or two conservative factual sentences, each with exact evidence quotations and at least one diff citation. Prompt: `prompts/contribution-summary.txt`.
4. Validate sentence length, evidence IDs, exact quotations, and implementation citations locally. Reject numeric claims, markup, invalid JSON, and incomplete model responses.
5. Use a separate model call with a skeptical verifier prompt to reject unsupported or ambiguous claims. It must approve every sentence.
6. Put the description and provenance in the bot's review PR. The review PR includes supporting quotations and source links.

No automated verifier guarantees truth: exact quotes can still be interpreted incorrectly, and both calls use the same model. Human review is required before merge. There is no automatic publishing or merging of an uncertain description. Rejection, quota failures, missing keys, and API errors hold a new entry; they never replace old text with a title or an extractor fallback. Held reasons appear in workflow logs and the Actions step summary, including when no update PR is created.

A manual description override for a new contribution is treated as explicitly curated text and does not call Gemini. Existing entries ignore subsequent overrides to preserve frozen history.

## Two-week schedule and usage budget

The workflow wakes at **08:47 Asia/Kolkata** daily but only performs upstream or Gemini requests every **14 days**, anchored to **21 November 2026** (then 5 December, 19 December, etc.). Daily off-cycle eligibility checks do not install dependencies or call external APIs. GitHub cron cannot express a continuous 14-day interval across month boundaries; `*/14` would be incorrect. A missed eligible run waits until the next eligible date; you can manually dispatch a catch-up run.

Manual dispatch and merged configuration changes can run immediately, outside that cadence. Scheduling starts on the default branch; GitHub may delay runs or disable schedules on inactive public repositories.

`ai.maxNewEntries` is capped at five (default five): at most **ten Gemini requests** per run, including generation and verification. Entries beyond the budget wait for a future run. Gemini calls are sequential, have a timeout, and are never automatically retried, including on rate limits. Failed requests consume the entry budget. There is no automatic fallback to another model.

Approved pending summaries are cached in the bot PR's snapshot. When the evidence, prompt, and model fingerprint match, the summary is reused without Gemini calls. Changed evidence invalidates that pending cache. Merged entries are permanently frozen and never re-summarized.

## Add sources and filters

A group creates a section:

```json
{"id":"new-community","name":"New Community","role":"Contributor"}
```

A source chooses a project:

```json
{
  "id":"new-project",
  "provider":"github",
  "group":"new-community",
  "project":"owner/repository",
  "author":"KanishkRanjan",
  "labelPrefix":"Project PR #",
  "exclude":[]
}
```

GitHub uses `owner/repo` and no `baseUrl`. For KDE, use `provider: "gitlab"`, `baseUrl: "https://invent.kde.org"`, and a project such as `plasma/kglobalacceld`. For Chromium, use `provider: "gerrit"`, `baseUrl: "https://chromium-review.googlesource.com"`, `project: "chromium/src"`, and your owner email. Source IDs must remain stable.

Optional source settings:

- `only`: allowlisted change numbers; omit to discover future merges.
- `exclude`: excluded change numbers; takes precedence for NEW entries.
- `filters.includeKeywords`: any case-insensitive match in title/body.
- `filters.excludeKeywords`: reject any match.
- `filters.labels`: require all labels (GitHub/GitLab only).
- `limit`: newest eligible entries per source, before history is retained. Historical entries are never evicted to meet a limit.
- `overrides`: map change numbers to `{ "description": ["Curated sentence."] }` for explicit manual wording of new entries.

New changes titled Revert/Reapply are excluded; original changes later reverted require an explicit exclusion before their first publication. Historical entries must be removed manually if later reverted. Keywords are eligibility filters, not evidence for AI-generated claims.

## Run and review

```sh
npm run test:contributions
npm run sync:contributions
npm run build
```

Normal site builds read the committed snapshot without credentials or API calls. GitHub Actions needs contents/pull-requests write permissions only in the sync job, and permission to create PRs. The bot does not approve or merge its own PRs. GitHub may require approval for separate PR checks triggered by its temporary token.
