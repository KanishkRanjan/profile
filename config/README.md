# Automatic contribution updates

Edit `config/contributions.json` in a GitHub PR to choose what appears on the profile. No React changes are needed to add a project. Only merged changes authored by the configured account are eligible; open and closed-but-unmerged changes are never included.

The sync runs daily at **08:47 Asia/Kolkata**, on demand under **Actions → Sync contributions → Run workflow**, and after configuration changes merge into `main`. GitHub may delay scheduled runs. The workflow must be on the default branch for scheduling to start. Public repositories can have scheduled workflows disabled after 60 days without repository activity; re-enable the workflow in Actions if that happens.

## How publishing works

1. Fetch all configured projects through their public APIs.
2. Check merged status, author, filters, exclusions, and pagination.
3. Generate `data/contributions.json`, shared by the visual and ATS views.
4. Run tests and the production build, then open or update **one** PR from `bot/sync-contributions`.
5. Review and merge that PR. Your existing deployment process publishes the merged data.

An unchanged result produces no commit or PR. A date-only check does not change the snapshot. `verifiedOn` records the successful full check that last changed the snapshot; the Actions run history records later unchanged checks. API errors, incomplete results, or an unexpectedly empty previously populated source fail the run without replacing the last good snapshot. Failed runs are visible in Actions; normal GitHub Actions notification settings apply.

No upstream PR or MR is edited. The bot only updates this profile repository. Internship and other manually maintained sections remain manual. The existing VS Code entry is also still manual; it has not been verified or added to the automatic source list.

## Add a repository

Add a source under `sources`, pointing to an existing group:

```json
{
  "id": "another-project",
  "provider": "github",
  "group": "electron",
  "project": "owner/repository",
  "author": "KanishkRanjan",
  "labelPrefix": "Repository PR #",
  "exclude": []
}
```

Use an appropriate group: only put projects in the `electron` group if they should count toward the Electron statistic. To add a separate section, also add a group:

```json
{
  "id": "another-community",
  "name": "Another Community",
  "role": "Contributor"
}
```

Then set the source's `group` to `another-community`. Groups and sources have unique, stable IDs; group order controls section order. Entries are ordered by merge date within each group. Empty groups are hidden. A source is an explicit project allowlist entry: repositories not listed are not fetched.

Providers:

| `provider` | `project` | `author` | `baseUrl` |
| --- | --- | --- | --- |
| `github` | `electron/electron` | GitHub username | Omit; uses github.com |
| `gitlab` | `plasma/kglobalacceld` | KDE/GitLab username | `https://invent.kde.org` |
| `gerrit` | `chromium/src` | Owner email or username | `https://chromium-review.googlesource.com` |

Gerrit and GitLab support other public HTTPS origins. Credentials are not sent to those servers. This implementation supports public projects; private-project authentication needs a separate implementation. GitHub searches over 1,000 matches fail explicitly rather than silently omitting results.

## Choose which contributions appear

These optional source settings can be combined:

```json
{
  "only": [55057, 52519],
  "exclude": [12345],
  "filters": {
    "includeKeywords": ["macOS", "capture"],
    "excludeKeywords": ["experimental"],
    "labels": ["semver/patch"]
  },
  "limit": 20
}
```

- Omit `only` to discover all future eligible changes. Set it to a list to show only those numbers; an empty list shows none.
- `exclude` always wins, including over an override. Chromium CL **7206079** is excluded in the supplied config.
- Keyword filters search the original title and full description/commit message, case-insensitively. Any included keyword must match; any excluded keyword rejects the change. Labels must all match exactly and are supported for GitHub/GitLab only.
- `limit` keeps the newest matching entries **per source**. Counts reflect displayed entries, not an unfiltered lifetime total.
- Changes with titles beginning `Revert` or `Reapply` are skipped. That does not detect every original change later reverted; add the original number to `exclude` when needed.
- Remove a source to stop showing its data. Changing a previously populated source to return zero merged results fails conservatively; check account/project spelling or use `only`, `exclude`, or filters for intentional removals.

## Where the profile wording comes from

This is deterministic text extraction, not AI rewriting:

1. A curated `overrides[number].description` is used exactly, when present.
2. Otherwise, use the title and text from a `Release Notes` section, ignoring `Notes: None`.
3. If release notes are missing/empty, use the title and first relevant description paragraph (or Gerrit commit-message paragraph).
4. If no usable paragraph exists, show the title alone.

Checklists, HTML comments, code blocks, screenshots, links, and common commit trailers are stripped. Automatic excerpts are capped at 360 characters and may end in an ellipsis. The extractor does not inspect discussions, infer impact, promise performance gains, or rewrite prose into first person. Your existing curated descriptions are preserved as overrides. Review the bot PR for new wording; technical identifiers and template variations may need an override.

For example, in the Electron source:

```json
{
  "overrides": {
    "55057": {
      "title": "Preserve native macOS menu titles and icons",
      "description": [
        "**Preserve native macOS menu titles and icons**: Fixed native menu state updates that overwrote AppKit-managed titles and icons."
      ]
    }
  }
}
```

Each bot PR lists added, updated, and removed entries, with source links and proposed description text. Override text supports the existing `**bold**` formatting. Overrides do not bypass merged status, authorship, or filters. Remove an override to return that change to automatic wording.

## Permissions and local commands

No new secret is required for the current public projects. In Actions, the sync uses the repository's temporary `GITHUB_TOKEN` with `contents: write` and `pull-requests: write` in the sync job only. The repository's **Settings → Actions → General → Workflow permissions → Allow GitHub Actions to create and approve pull requests** must be enabled. The bot does not approve or merge its PRs.

The sync workflow validates the generated snapshot before creating its PR. GitHub may require approval before running separate PR workflows triggered by `GITHUB_TOKEN`; approve those runs if GitHub requests it. No broad personal token is required to bypass that behavior.

```sh
npm run test:contributions
npm run sync:contributions
npm run build
```

An optional local `GITHUB_TOKEN` increases GitHub API limits; do not commit it or prefix it with `NEXT_PUBLIC_`. Tokens are sent only to api.github.com, with redirects disabled. Normal builds use the committed snapshot and need no upstream API requests or credentials.

The generated snapshot is managed by the sync. Edit the config/overrides instead. Temporary PR reports live in the ignored `.contribution-sync/` directory.
