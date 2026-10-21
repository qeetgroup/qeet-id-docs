# Repository Context — qeet-id-docs

**Level:** L2 · **Status:** active · **Evidence state:** verified · **Last verified:** 2026-10-17
**Verification scope:** routes, scripts, CI steps, security headers, the docs layout and the content
tree read from source.

## Identity

The **developer documentation portal for Qeet ID**, built for `docs.qeet.in` (the planned host — see
`qeet-repo.yml`). Next.js 16.3.8 + **Fumadocs 16.16.2** (`fumadocs-ui` aliased to
`@fumadocs/base-ui@16.16.2`, `fumadocs-mdx` 15.4.6), React ^19.3.0, TypeScript ^7.0.2, Tailwind v4,
`@qeetrix/ui ^2.1.5`, `@qeetrix/icons ^1.0.11`, `@thesvg/react` (third-party brand logos), Biome
2.5.15, bun. 68 source files under `src/`, ~5.2k LOC, plus 44 MDX pages.

Version note: this repository runs **Next 16.3.8 / React 19.3** while `qeet-id-login` and
`qeet-id-website` are on 16.2.6 / 19.2.6.

## Context inheritance

```text
qeet-context (L0)  →  qeet-id-context (L1)  →  qeet-id-server (what is documented)
                                            →  qeet-id-docs (L2 — this document)
```

## Responsibilities

Publishing developer documentation: getting started, concepts, authentication, authorization,
provisioning, security, architecture, guides and SDK references. Search. SEO and OpenGraph.
**Machine-readable surfaces for AI agents.**

## Non-responsibilities

**It owns no behaviour and no truth.** Everything documented here is implemented in
`qeet-id-server`; capability status is owned by `qeet-id-context/PRODUCT.md`. This repository is a
*renderer*, and it must never become the place a claim originates.

It does not call the API, hold a secret, or implement authentication.

## Architecture

A static-first Fumadocs site in two parts with two designs:

| Part | Paths | Design |
|---|---|---|
| **Docs** (`/docs/*`) | `src/app/docs/`, `src/components/{docs,layout}/`, `src/components/mdx.tsx`, `src/lib/` | Rebuilt from **qeetrix-docs** (`ui.qeet.in`), so every Qeet product's docs look and work the same. Change the shared shell there first, or in the same step |
| **Landing page** (`/`) | `src/app/(home)/`, `src/components/{marketing,ui,brand}/`, `src/config/`, `site-footer.tsx` | Its own design until it is redesigned; its styles are scoped to `.qid-home`. Only the landing page still uses `lucide-react`, `shiki` (`src/lib/highlight.ts`) and `class-variance-authority` |

### Content and collections

MDX under `content/docs/`. Collections are defined with the Fumadocs **Macro API** — `defineDocs`
from `fumadocs-mdx/macro` in `src/lib/source.ts`. There is no `source.config.ts`, no generated
`.source` directory and no `postinstall`. `src/lib/source.ts` also:

- sets the code theme (`src/lib/code-theme.ts` — Qeetrix syntax colours as CSS variables, defined in
  `global.css`, so one highlight pass follows both themes) and records each block's language;
- turns ```` ```npm ```` blocks into package-manager tabs (Bun first; the reader's choice persists);
- resolves `icon:` names with `src/lib/icons.ts`;
- exports `docsLlms`, which renders `/llms.txt`, `/llms-full.txt` and `/llms.mdx/docs/...`.

### Sections

`content/docs` is organised into seven sidebar **sections** (the layout's tabs), one root folder
each, with `root: true`, an icon and a description in its `meta.json`:

```text
(getting-started)   the docs index + getting-started/ (extracted with ...getting-started)
(concepts)          concepts/ (extracted with ...concepts) + architecture/
(platform)          authentication/ · authorization/ · provisioning/ · agents · audit-logs
security/
guides/
sdks/
(resources)         roadmap · faq · support
```

Folder groups in parentheses leave no trace in a URL — the regrouping changed none of the 44 URLs.
`src/lib/site-links.ts` holds the docs links, the `sections` map (name and landing page of each),
`sectionOfSlug` (a page's **first slug** → its section; an unmapped slug falls back to Getting
started, so a new top-level page or folder must be added there) and the header's `primaryNav`
(Docs, Concepts, Platform, Security, Guides, SDKs, API Reference ↗).

### The docs shell

| Piece | Path |
|---|---|
| Layout — Fumadocs **Spacious** (`fumadocs-ui/layouts/spacious`) under the site header; the header's height is `--site-header-height`, passed to Fumadocs as `--fd-banner-height` | `src/app/docs/layout.tsx` |
| Site header + mobile menu (docs, 404 and error pages) | `src/components/layout/{site-header,mobile-menu}.tsx` |
| Layout options — `baseOptions()` (docs), `homeOptions()` (the landing page's bar), `container` (shared width) | `src/lib/layout.shared.tsx` |
| Page — page header, "clerk" table of contents, JSON-LD (TechArticle + breadcrumb), skip-link target `#main-content` | `src/app/docs/[[...slug]]/page.tsx` |
| Page header — section breadcrumb, Copy Markdown + view options, title with the "Developer preview" `StatusPill` (`productStatus`), lead | `src/components/docs/page-header.tsx` |
| MDX components — code blocks, code tabs and callouts in the site's own frames, plus Tabs, Steps, Accordions, Files, TypeTable, ImageZoom, `IdentityModel` | `src/components/mdx.tsx`, `src/components/docs/` |
| Icon registry — `@qeetrix/icons` names for frontmatter and `meta.json` (an unknown name logs a warning); `Go`, `Nodejs`, `React` render brand logos | `src/lib/icons.ts`, `src/components/brand-logo.tsx` |
| Global `?` keyboard-help dialog and skip link | `src/app/layout.tsx`, `src/components/layout/keyboard-shortcuts.tsx` |

`src/app/global.css` imports `@qeetrix/ui/styles.css`, `fumadocs-ui/css/generated/spacious.css`,
`fumadocs-ui/css/shadcn.css` and `fumadocs-ui/css/preset.css`; then come the docs rules from
qeetrix-docs (sidebar, accent colour, tabs, code colours, prose), `.docs-shell` (headings in Qeet
Text inside the docs), the accessibility rules (skip link, reduced motion), and last the landing
page's own styles under `.qid-home`.

### Metadata and share images

`src/lib/shared.ts` is the source of `appName` ("Qeet ID Docs"), `productName`, `appDescription`,
`siteUrl` (`NEXT_PUBLIC_SITE_URL` overrides it), `productStatus`, the route constants,
`getPageMarkdownUrl` and `getPageImageUrl`. `src/config/site.ts` re-exports `siteUrl` and keeps
`site`, `links` and `githubUrl` for the landing page and the structured data. This site's source
repository is private, so nothing links into it: `githubUrl` and the header's GitHub icon open the
public Qeet Group organisation, and pages have no "open on GitHub" action.
`src/lib/metadata.ts` exports `pageMetadata`, `plainText`, `openGraphBase` and `defaultOgImage`.
The title template is `%s | Qeet ID Docs`. Share images: `/og/image.png` (the default) and
`/og/docs/<slug>/image.png`, both drawn by `src/lib/og.tsx` with the Qeet logo.

Search is served locally by `src/app/api/search/route.ts` (a custom index built from each page's
structured data) — no external search service.

### The AI surfaces are a real contract

```text
/llms.txt                      a compact index for agents
/llms-full.txt                 the full corpus
/llms.mdx/docs/[[...slug]]     per-page Markdown
src/proxy.ts                   content negotiation — serves Markdown from the SAME
                               canonical URL when Accept prefers it, sets Vary: Accept
```

The three routes render through `docsLlms` (`src/lib/source.ts`); `src/proxy.ts` uses
`fumadocs-core/negotiation`. **Changing the content shape affects agent consumers**, not just human
readers.

## Security posture — the strongest of the front-ends

**Evidence:** `next.config.mjs`

| Header | Value |
|---|---|
| Content-Security-Policy | full policy |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=()` |
| `poweredByHeader` | `false` |

The CSP needs `'unsafe-inline'` in `script-src`/`style-src` for the Next theme-flash script and
JSON-LD — there is no nonce because docs routes are statically generated. `'unsafe-eval'` and `ws:`
are added **only when `NODE_ENV !== "production"`**. The docs rebuild left the headers unchanged
(verified at runtime: no `'unsafe-eval'` in production).

**Do not relax any of this** to make a component work; find another way.

## Documentation correctness is a security concern

An identity platform's docs are copied into production code. A wrong auth example is a real
vulnerability in someone else's system.

**Verify before writing.** Two live traps:

| Trap | Reality |
|---|---|
| Documenting SDK installation | **No Qeet ID SDK is published** — npm 404, Go proxy never fetched (QID-009). `content/docs/sdks/` describes packages a reader cannot install |
| Writing "generally available" | Highest published version is **`v0.1.14`**; the roadmap says pre-1.0 (QID-010). Every page title carries the "Developer preview" pill (`productStatus`) — remove it only at 1.0 |

The `sdks/` section is the single most likely place for this repository to mislead someone.

## Testing and CI

`bun run test` is **`node scripts/check-links.mjs`** — an internal-link integrity check across all
MDX. It maps each file to its URL the way Fumadocs does, dropping `(group)` folder segments. There
are **no unit tests** and no `*.test.*` files; link integrity is the test.

`.github/workflows/ci.yml`, job `verify` on `ubuntu-latest`: install → `lint` → `types:check` →
`test` → `build`. On `release/**` only, job `image` publishes
`ghcr.io/qeetgroup/qeet-id-docs:sha-<commit>` for the Qeet ID Kit (`qeet-id-kit`).
`.github/workflows/release-tag.yml` tags `vX.Y.Z` when a `release/x.y.z` pull request is merged into
`main`. qeetrix-docs' Vercel release pipeline (`version.yml` / `release.yml` / `rollback.yml`) is
**deliberately not adopted** — Qeet ID's release process (`release/x.y.z` branches, owned by
`qeet-id-kit`) differs.

## Script naming

The type-check script is **`types:check`**, not `typecheck` — it chains
`clean-generated-types.mjs` → `next typegen` → `tsc --noEmit`. There is no source-generation step
(the Macro API compiles the content in the bundler, during `next dev` and `next build`). `qeet-id-login` and `qeet-id-website` use
`typecheck`. **The name differs — no `typecheck` script exists in this repository.**

## Local development

`bun run dev` → `http://localhost:3000` (not qeetrix-docs' 3006). No backend dependency, no `.env`
required (`NEXT_PUBLIC_SITE_URL` defaults to the production host).

## Security-relevant

| Area | Path | Risk | Note |
|---|---|---|---|
| Security headers, CSP | `next.config.mjs` | **High** | Strongest posture in the org — do not weaken |
| Documented auth examples | `content/docs/(platform)/authentication/` | **High** | Copied into production by readers |
| SDK install instructions | `content/docs/sdks/` | High | The packages are not published |
| AI surfaces | `src/app/llms*`, `src/proxy.ts`, `docsLlms` in `src/lib/source.ts` | Medium | Machine consumers depend on the shape |

No secrets, no auth, no API access.

## Known constraints

- **No unit tests** — link integrity is the only automated content check.
- `content/docs/sdks/` documents unpublished packages.
- Framework versions drift ahead of the sibling Next.js repos.
- The `types:check` name differs from the siblings' `typecheck`.
- `.gitignore` covers `.env*.local` only, not `.env`.
- The landing page has not moved to the docs' design yet; until it does, it keeps its own
  components, dependencies and `.qid-home` styles.

## Documentation authority

For anything technical: **`qeet-id-server` source > its OpenAPI documents > `qeet-id-context` >
this site.** This repository renders truth; it does not hold it.
