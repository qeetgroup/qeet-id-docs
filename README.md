# Qeet ID Docs

The developer documentation portal for **Qeet ID** — the passkeys-first,
open-source identity platform. Marketing landing page + full docs, built to
match the rest of the Qeet ID suite.

> This portal is the conceptual and how-to documentation. The complete **API
> reference** is served separately in Scalar and linked from the top navigation.

## Stack

- **Next.js 16** (App Router, React 19) + **TypeScript**
- **Fumadocs** (`@fumadocs/base-ui`) — docs engine, MDX, search
- **Tailwind CSS v4** + **[`@qeetrix/ui`](https://www.npmjs.com/package/@qeetrix/ui)** — the shared Qeet design system (tokens, fonts, components)
- **Shiki** — syntax highlighting (docs + marketing share one theme)
- **Motion** — animations · **Biome** — lint/format · **Bun** — package manager

## Develop

```bash
bun install
bun run dev          # http://localhost:3000
```

## Scripts

| Script | Purpose |
| --- | --- |
| `bun run dev` | Start the dev server |
| `bun run build` | Production build (also runs the type check) |
| `bun run types:check` | `next typegen` → generate `.source` → `tsc --noEmit` |
| `bun run lint` | Biome check (lint + format) |
| `bun run format` | Biome format-write |
| `bun run test` | Internal-link integrity check across all docs |

## Structure

```
content/docs/          # all documentation (MDX) + meta.json sidebar config
src/
  app/                 # routes: (home) landing, docs, SEO (sitemap/robots/rss/og), search API
  components/
    ui/                # design-system primitives (Qeetrix re-exports + docs helpers)
    marketing/         # landing-page sections
    layout/ · brand/ · seo/
  config/              # site.ts, navigation.ts, marketing.ts — content & links
  lib/                 # source, metadata, fonts, highlight, cn
scripts/               # generate-source, check-links
```

## Content

Write pages as MDX under `content/docs/`. Order and group them with `meta.json`
(`---Label---` separators; `"root": true` promotes a folder to a sidebar tab).
Available MDX components: `Callout`, `Tabs`/`Tab`, `Steps`/`Step`, `Cards`/`Card`,
`Accordions`, `Files`, `TypeTable`, and Shiki code blocks (`title=`, line
highlighting, language tabs).

## Configuration

All values are public — this portal has no server secrets. See
[`.env.example`](./.env.example):

- `NEXT_PUBLIC_SITE_URL` — canonical origin (canonical URLs, OG, sitemap, RSS).
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — optional; enables cookieless analytics.

## Deployment

Deploys to **Vercel** (zero-config; framework + commands pinned in
[`vercel.json`](./vercel.json)). Security and caching headers are set in
[`next.config.mjs`](./next.config.mjs). CI (lint · types · test · build) runs on
every push and PR via [`.github/workflows/ci.yml`](./.github/workflows/ci.yml).

---

Part of the [Qeet Group](https://github.com/qeetgroup) suite.
# qeet-id-docs
