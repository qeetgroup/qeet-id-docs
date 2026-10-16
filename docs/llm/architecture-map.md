# Architecture Map — qeet-id-docs

**Level:** L2 · **Last verified:** 2026-10-17
**Verification scope:** every path confirmed to exist.

| Need | Path |
|---|---|
| Repository identity | [`qeet-repo.yml`](../../qeet-repo.yml) |
| Agent instructions | [`AGENTS.md`](../../AGENTS.md) |
| **Collections (Macro API)**, code theme, `npm` tabs, icons, `docsLlms` | `src/lib/source.ts` |
| **Sections, `sectionOfSlug`, header navigation, docs links** | `src/lib/site-links.ts` |
| Icon registry for `icon:` | `src/lib/icons.ts` |
| Code colours | `src/lib/code-theme.ts` (+ the `--code-*` variables in `src/app/global.css`) |
| App name, `siteUrl`, `productStatus`, routes, `gitConfig` | `src/lib/shared.ts` |
| Page metadata, default share image | `src/lib/metadata.ts` |
| Share-image renderer | `src/lib/og.tsx` |
| Layout options (`baseOptions`, `homeOptions`, `container`) | `src/lib/layout.shared.tsx` |
| **Content negotiation proxy** | `src/proxy.ts` |
| Landing-page site config and links | `src/config/site.ts` |
| Landing-page navigation and footer links | `src/config/navigation.ts` |
| Marketing config | `src/config/marketing.ts` |

## Routes

| Route | Path | Purpose |
|---|---|---|
| `/` | `src/app/(home)/` | Landing page (its own design, scoped to `.qid-home`) |
| `/docs/[[...slug]]` | `src/app/docs/` | The documentation — Spacious layout + page |
| `/api/search` | `src/app/api/search/route.ts` | Local search index |
| `/llms.txt` | `src/app/llms.txt/route.ts` | **AI surface** |
| `/llms-full.txt` | `src/app/llms-full.txt/route.ts` | **AI surface** |
| `/llms.mdx/docs/[[...slug]]` | `src/app/llms.mdx/` | **AI surface — Markdown for agents** |
| `/og/image.png`, `/og/docs/[...slug]` | `src/app/og/` | OpenGraph images (default, per page) |
| `/rss.xml` | `src/app/rss.xml/route.ts` | Feed |
| `/healthz` | `src/app/healthz/route.ts` | Container health check |
| `/manifest.ts`, `/robots.ts`, `/sitemap.ts` | `src/app/` | SEO |

Root: `layout.tsx`, `error.tsx`, `not-found.tsx` (both with the site header), `global.css`.

## Content

```text
content/docs/meta.json                section order
content/docs/(getting-started)/       index.mdx · getting-started/
content/docs/(concepts)/              concepts/ · architecture/
content/docs/(platform)/              authentication/ · authorization/ · provisioning/ ·
                                      agents.mdx · audit-logs.mdx
content/docs/security/
content/docs/guides/
content/docs/sdks/
content/docs/(resources)/             roadmap.mdx · faq.mdx · support.mdx
```

Each root folder is a section (`root: true` in its `meta.json`); `(group)` folders are not in URLs.

## Components

```text
src/components/mdx.tsx                MDX component map
src/components/analytics.tsx
src/components/brand-logo.tsx         third-party logos (@thesvg/react)
src/components/brand-mark.tsx         the Qeet mark, both themes
src/components/docs/                  callout · code-block · copy-button · identity-model · page-header
src/components/layout/                keyboard-shortcuts · mobile-menu · site-header ·
                                      site-footer (landing page)
src/components/seo/json-ld
— landing page only —
src/components/brand/{icons,logo}
src/components/marketing/   11        (cta-band, dx-section, faq, features-grid, hero,
                                      integration-steps, quickstart-showcase, readiness-section,
                                      sdk-section, security-section, trust-bar) + index.ts
src/components/ui/          6         (code-window, container, copy-button, eyebrow, reveal,
                                      window-chrome) + index.ts
```

## Lib and scripts

```text
src/lib/   cn.ts · code-theme.ts · highlight.ts (landing page) · icons.ts · layout.shared.tsx ·
           metadata.ts · og.tsx · shared.ts · site-links.ts · source.ts
scripts/   check-links.mjs · clean-generated-types.mjs
```

## Config

| | |
|---|---|
| **Security headers + CSP** | `next.config.mjs` |
| Scripts | `package.json` |
| Biome | `biome.json` |
| TypeScript (`@/*` path only) | `tsconfig.json` |
| **CI** — `verify`, and `image` on `release/**` | `.github/workflows/ci.yml` |
| Release tag (`release/x.y.z` → `vX.Y.Z`) | `.github/workflows/release-tag.yml` |
| Container image for the Qeet ID Kit | `Dockerfile` |
| Deploy | `vercel.json` |

## Environment

| Variable | Default | Read by |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://docs.qeet.in` | `src/lib/shared.ts` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | — | `src/components/analytics.tsx` |
| `NEXT_OUTPUT` | — (`standalone` in the `Dockerfile`) | `next.config.mjs` |
| `QEET_BUILD_VERSION`, `QEET_BUILD_REVISION` | — (set by the `Dockerfile`) | `src/app/healthz/route.ts` |

## Upstream

The behaviour documented here is implemented in **`qeet-id-server`**. Capability status lives in
`qeet-id-context/PRODUCT.md`. The docs shell follows **qeetrix-docs** (`ui.qeet.in`).
