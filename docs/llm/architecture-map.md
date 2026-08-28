# Architecture Map — qeet-id-docs

**Level:** L2 · **Last verified:** 2026-08-28
**Verification scope:** every path confirmed to exist.

| Need | Path |
|---|---|
| Repository identity | [`qeet-repo.yml`](../../qeet-repo.yml) |
| Agent instructions | [`AGENTS.md`](../../AGENTS.md) |
| Fumadocs source config | `source.config.ts` |
| Source loader | `src/lib/source.ts` |
| **Content negotiation proxy** | `src/proxy.ts` |
| Site config | `src/config/site.ts` |
| Navigation config | `src/config/navigation.ts` |
| Marketing config | `src/config/marketing.ts` |

## Routes

| Route | Path | Purpose |
|---|---|---|
| `/` | `src/app/(home)/` | Landing page |
| `/docs/[[...slug]]` | `src/app/docs/` | The documentation itself |
| `/api/search` | `src/app/api/search/route.ts` | Local search index |
| `/llms.txt` | `src/app/llms.txt/route.ts` | **AI surface** |
| `/llms-full.txt` | `src/app/llms-full.txt/route.ts` | **AI surface** |
| `/llms.mdx/docs/[[...slug]]` | `src/app/llms.mdx/` | **AI surface — Markdown for agents** |
| `/og`, `/og/docs/[...slug]` | `src/app/og/` | OpenGraph images |
| `/rss.xml` | `src/app/rss.xml/route.ts` | Feed |
| `/manifest.ts`, `/robots.ts`, `/sitemap.ts` | `src/app/` | SEO |

Root: `layout.tsx`, `error.tsx`, `not-found.tsx`, `global.css`.

## Content

```text
content/docs/architecture/     concepts/        getting-started/
             authentication/   guides/          provisioning/
             authorization/    sdks/            security/
```

## Components

```text
src/components/analytics.tsx · mdx.tsx
src/components/brand/{icons,logo}
src/components/docs/identity-model
src/components/layout/{keyboard-shortcuts,keyboard-shortcuts-hint,site-footer}
src/components/marketing/   11  (cta-band, dx-section, faq, features-grid, hero,
                                integration-steps, quickstart-showcase, readiness-section,
                                sdk-section, security-section, trust-bar)
src/components/seo/json-ld
src/components/ui/          10  (back-to-top, code-window, container, copy-button,
                                eyebrow, reading-progress, reveal, window-chrome)
```

## Lib and scripts

```text
src/lib/   cn.ts · highlight.ts · layout.shared.tsx · metadata.ts · shared.ts · source.ts
scripts/   check-links.mjs · clean-generated-types.mjs · generate-source.mjs
```

## Config

| | |
|---|---|
| **Security headers + CSP** | `next.config.mjs` |
| Scripts | `package.json` |
| Biome | `biome.json` |
| **CI — the only front-end that has one** | `.github/workflows/ci.yml` |
| Deploy | `vercel.json` |

## Environment

| Variable | Default | Read by |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://docs.qeet.in` | `src/config/site.ts` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | — | `src/components/analytics.tsx` |

## Upstream

The behaviour documented here is implemented in **`qeet-id-server`**. Capability status lives in
`qeet-id-context/PRODUCT.md`.
