# Qeet ID Docs

The developer documentation portal for **Qeet ID** — the passkeys-first identity platform: a landing
page and the full docs. The docs pages are built like Qeetrix's docs
([ui.qeet.in](https://ui.qeet.in), `qeetrix-docs`), so every Qeet product's docs look and work the
same; the landing page keeps its own design for now.

> This portal is the conceptual and how-to documentation. The complete **API
> reference** is served separately in Scalar and linked from the top navigation.

## Stack

- **Next.js 16.3** (App Router, React 19) + **TypeScript**
- **[Fumadocs](https://fumadocs.dev) 16** (`@fumadocs/base-ui`) — the **Spacious** docs layout,
  search, and MDX through the [Macro API](https://fumadocs.dev/docs/mdx/macro): collections are
  defined in `src/lib/source.ts`, with no generated `.source` and no `postinstall`
- **Tailwind CSS v4** + **[`@qeetrix/ui`](https://www.npmjs.com/package/@qeetrix/ui) 2** — the
  shared Qeet design system (tokens, fonts, components) — and
  **[`@qeetrix/icons`](https://www.npmjs.com/package/@qeetrix/icons)**; third-party brand logos
  from `@thesvg/react`
- Code in Qeetrix's syntax colours (`src/lib/code-theme.ts`), following the light and dark themes
- **Biome** — lint/format · **Bun** — package manager

The landing page still uses Lucide, Shiki and `class-variance-authority`; the docs do not.

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
| `bun run start` | Serve the production build |
| `bun run types:check` | Clear stale dev route types → `next typegen` → `tsc --noEmit` |
| `bun run lint` | Biome check (lint + format) |
| `bun run format` | Biome format-write |
| `bun run test` | Internal-link integrity check across all docs |

## Structure

```
content/docs/            # the MDX pages; one root folder per sidebar section
  (getting-started)/ (concepts)/ (platform)/ (resources)/   # folder groups — not part of URLs
  security/ guides/ sdks/
src/
  app/
    (home)/              # the landing page
    docs/                # the docs layout (Spacious, under the site header) and pages
    api/search/          # search index
    llms.txt/ llms-full.txt/ llms.mdx/   # the docs as Markdown, for LLMs
    og/                  # share images: /og/image.png, /og/docs/<slug>/image.png
    healthz/ · rss.xml/ · sitemap.ts · robots.ts · manifest.ts
  components/
    docs/                # page header, code blocks and tabs, callouts, copy button, identity model
    layout/              # site header, mobile menu, keyboard-shortcuts dialog, landing footer
    mdx.tsx              # the MDX components
    brand-logo.tsx · brand-mark.tsx   # third-party logos · the Qeet mark
    marketing/ · ui/ · brand/         # the landing page
    seo/                 # JSON-LD
  config/                # site.ts, navigation.ts, marketing.ts — the landing page's content & links
  lib/                   # source, site-links, icons, code-theme, shared, metadata, og, layout.shared
  proxy.ts               # serves Markdown from a docs URL when Accept prefers it
scripts/                 # check-links, clean-generated-types
```

## Content

Write pages as MDX under `content/docs/`. Each root folder is a sidebar **section** (a tab): its
`meta.json` sets `"root": true`, a `title`, `description` and `icon`, and `content/docs/meta.json`
orders the sections. A folder in parentheses, such as `(platform)`, is a folder group: it gathers
pages into a section and leaves no trace in the URL. `"...folder"` in `pages` lifts a folder's pages
into its parent. A page's section comes from its first slug (`sectionOfSlug` in
`src/lib/site-links.ts`) — add a new top-level page or folder there.

`icon:` in frontmatter and `meta.json` takes an `@qeetrix/icons` name registered in
`src/lib/icons.ts` (an unknown name logs a warning), or a brand logo: `Go`, `Nodejs`, `React`.

Available MDX components: `Callout`, `Cards`/`Card`, `Tabs`/`Tab`, `Steps`/`Step`,
`Accordions`/`Accordion`, `Files`/`Folder`/`File`, `TypeTable`, zoomable images and `IdentityModel`,
plus code blocks (`title=`, line highlighting, `tab=` code tabs). An ```` ```npm ```` block becomes
package-manager tabs — Bun, npm, pnpm, Yarn — and the reader's choice is remembered.

## Configuration

All values are public — this portal has no server secrets. See
[`.env.example`](./.env.example):

- `NEXT_PUBLIC_SITE_URL` — canonical origin (canonical URLs, OG, sitemap, RSS).
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — optional; enables cookieless analytics.

## Deployment

[`vercel.json`](./vercel.json) pins the framework and commands for Vercel, but this repository has
no Vercel project yet: `docs.qeet.in` is currently served by `qeetgroup/qeet-docs` (see
[`qeet-repo.yml`](./qeet-repo.yml)). Security headers (CSP, HSTS, …) are set in
[`next.config.mjs`](./next.config.mjs).

CI ([`.github/workflows/ci.yml`](./.github/workflows/ci.yml)) runs lint · types · test · build on
pushes to `main`, `develop` and `release/**` and on every PR. On `release/**` it also publishes the
container image ([`Dockerfile`](./Dockerfile), `ghcr.io/qeetgroup/qeet-id-docs:sha-<commit>`) that
the Qeet ID Kit (`qeet-id-kit`) runs. Merging a `release/x.y.z` PR into `main` tags `vX.Y.Z`
([`release-tag.yml`](./.github/workflows/release-tag.yml)).

---

Part of the [Qeet Group](https://github.com/qeetgroup) suite.
