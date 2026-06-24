# Fumadocs → Mintlify migration

Reproducible pipeline that migrated the old docs (`docs-old/`, **Fumadocs + Next.js**) to Mintlify
at the repo root. All scripts read from `docs-old/` and are idempotent — safe to re-run.

## Run order

```bash
# 1. content: move content/docs/** to root, strip prefix, rename index pages,
#    strip route groups, rewrite components, copy co-located + image assets
node migration/migrate-content.mjs

# 2. API reference: regenerate one Mintlify OpenAPI page per operation at the SAME path
node migration/migrate-openapi.mjs

# 3. navigation: build tabs/groups/pages from the meta.json tree -> migration/navigation.json
node migration/build-navigation.mjs

# 4. docs.json: branding + navigation + OpenAPI + redirects (parsed from old middleware)
node migration/assemble-docs-json.mjs

# verification
node migration/check-urls.mjs   # URL parity gate (old vs new published URLs)
mint broken-links               # internal link integrity
mint validate                   # build validation
mint a11y                       # accessibility
```

Also requires (one-time, done): copy `docs-old/public/logo/*` → `logo/`, `docs-old/public/images` → `images/`,
favicon → `favicon.svg`; `.mintignore` excludes `docs-old/` and `migration/`.

## Results

- **URL parity: 403 = 403, 0 missing, 0 extra.** Every old published URL maps to the same new URL.
- **broken-links: pass. validate: pass. content a11y: pass** (all images/links have accessible text).
- 397 published pages, 6 tabs, 81 redirects.

## Key URL-preservation rules

- `content/docs/<X>` → `/<X>` (prefix stripped).
- `<folder>/index.mdx` → `<folder>.mdx` (Mintlify maps paths literally; no folder-index).
- Fumadocs route groups `(providers)` are stripped from the path (no URL segment).
- `*.model.mdx` partials are excluded (never published in the old build either).

## Component conversions (mechanical, in migrate-content.mjs)

| Old | New |
|---|---|
| `<Callout type=info\|warn\|error>` | `<Note>` / `<Warning>` (indentation-preserving) |
| `<Tabs items=[]><Tab value>` | `<Tabs><Tab title>` |
| `<Cards><Card icon={<X/>}>` | `<Columns><Card icon="name">` (icons → Lucide/FA names) |
| `<Accordions>` | `<AccordionGroup>` |
| `:tooltip[x]{label="y"}` | `<Tooltip tip="y">x</Tooltip>` |
| `<Method href>label</Method>`, `<Link>`, raw `<a>` text-only | markdown links |
| `<TypeTable type={{…}}/>` | markdown table |
| `<Files>/<Folder>/<File>` | code-block ASCII tree |
| quickstart snippets, `EmailProviderNextSteps`, `OverviewPage`, `InboxCodeBlock` | authored MDX (`migration/snippets/*.md`) |
| `<CodeTemplateBlock>`, `<ChangelogDisplay>` | `<Note>` with a link |
| All non-`/snippets` top-level imports | stripped (Mintlify provides components globally) |
| `[!code]` markers, Twoslash | removed (no Mintlify equivalent) |

Imports inside ```code fences``` are preserved (fence-aware masking).

## Icons

The source used Lucide icons, so `docs.json` sets `"icons": { "library": "lucide" }`. Mintlify
renders Lucide from `cloudfront.net/lucide/v1.16.0/<name>.svg`, so icon names are validated
against that mirror. `migrate-content.mjs` kebab-cases names and applies `ICON_ALIASES` for
brand icons (Lucide has no logos: React→`atom`, Node→`server`, Java→`coffee`, …) and for
names absent from v1.16.0 (`circle-help`→`circle-question-mark`, `code-2`→`square-code`, etc.).
Group icons are restored from each folder's `meta.json`. All 95 distinct icons in use return 200.

## API reference spec

`migrate-openapi.mjs` fetches the **complete** spec from Speakeasy
(`https://spec.speakeasy.com/novu/novu/json-development-with-code-samples`, ~93 paths, v3.15.0)
— `docs-old/openapi.json` was a stale 36-path snapshot that left 80+ pages empty. It also
strips stray quotes from routes (`'/v2/x/{id}'` → `/v2/x/{id}`) and resolves param-name drift
(`{variableId}` → `{variableKey}`) by matching each operation's structural signature against the
spec. All 116 operation pages resolve to a real spec operation (verified at generation time).

## Redirects

All ~80 explicit entries from `docs-old/src/middleware.ts` `redirectMap` + root `/`→`/platform`,
ported into `docs.json` `redirects` (hash fragments preserved). The blanket catch-all
(`/{x}`→`/platform/{x}`) was NOT replicated as a wildcard (would swallow valid paths); the real
legacy unprefixed paths it covered are already enumerated in the explicit map.

## Intentionally not carried over (documented gaps)

- **Twoslash** TS hover types, **tab `groupId` cross-page persistence**, **interactive file tree**,
  **`TypeTable` popovers**, **Inkeep search** (→ Mintlify built-in search).
- **`InboxCodeBlock`** rendered a *dynamic* code block injecting the signed-in user's API keys; it is
  replaced with a representative static example.
- 12 broken/stale entries in old `meta.json` (e.g. `concepts/environments`, `sms/awa-sns` typo,
  `community/contributing`) were dropped from the sidebar; their URLs are covered by redirects where applicable.
- 4 internal links that were already broken in the old source are remapped to the correct targets
  (see `LINK_FIXES` in migrate-content.mjs).
- **Color a11y advisory:** the dark-mode accent (`#FF4CE1`) fails the checker's light-background combo,
  which never renders in practice; primary (`#D1006E`) passes. Kept for brand fidelity.

## Residual manual review suggested

- Spot-check the authored snippet content in `migration/snippets/*.md` against current product behavior.
- The platform landing (`OverviewPage`) was rebuilt with native Cards — verify links/copy.
