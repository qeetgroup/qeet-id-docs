# AGENTS.md — qeet-id-docs

**The model-neutral instruction file for coding agents.** [CLAUDE.md](CLAUDE.md),
[GEMINI.md](GEMINI.md) and [.github/copilot-instructions.md](.github/copilot-instructions.md) point
here and add nothing architectural.

## What this repository is

The **developer documentation portal for Qeet ID** — `docs.qeet.in`. Next.js 16.3.8 +
**Fumadocs 16.16.2** (`fumadocs-ui` aliased to `@fumadocs/base-ui`; `fumadocs-mdx` 15.4.6, Macro
API), React 19.3, TypeScript 7, Tailwind v4, `@qeetrix/ui` 2.1 + `@qeetrix/icons` 1.0, Biome 2.5.15,
bun. 68 source files under `src/` plus MDX content.

**It documents a product it does not own.** Every technical claim here describes `qeet-id-server`'s
behaviour, and the source of truth is that repository — not this one.

## Context hierarchy

```text
qeet-context (L0)  →  qeet-id-context (L1)  →  qeet-id-server (what is being documented)
                                            →  qeet-id-docs (L2 — this repository)
```

## Read before changing code

| File | For |
|---|---|
| [qeet-repo.yml](qeet-repo.yml) | Machine-readable identity |
| [docs/llm/architecture-map.md](docs/llm/architecture-map.md) | "Where is X?" |
| [docs/llm/context.md](docs/llm/context.md) | How the site is built |
| [docs/llm/boundaries.md](docs/llm/boundaries.md) | What it owns and must not assert |
| [docs/llm/workflows.md](docs/llm/workflows.md) | Adding a page, a section, an SDK guide |

## Rules

### 1. Never document behaviour you have not verified
A docs site for an identity platform is a **security surface**: an incorrect auth example gets
copied into production. Verify against the handler in `qeet-id-server`, or the OpenAPI document —
not against memory, and not against an older page on this site.

### 2. Distinguish shipped from planned
`qeet-id-context/PRODUCT.md` marks every capability `implemented` / `partial` / `planned` /
`unknown`. **Do not document a `planned` capability as available.** Currently relevant: the product
is **pre-1.0 (`v0.1.14`)** and **no SDK is published** — see `qeet-id-context/DRIFT-REGISTER.md`
QID-009 and QID-010. The `sdks/` section describes packages a reader **cannot install today.**

### 3. Never weaken the security headers
`next.config.mjs` sets a full CSP plus `nosniff`, `Referrer-Policy`, HSTS with `preload`, and
`Permissions-Policy`. `'unsafe-eval'` and `ws:` are added **only** outside production.
This is the strongest header posture of any Qeet ID front-end — do not relax it for convenience.

### 4. Internal links are tested
`bun run test` runs `scripts/check-links.mjs`, an internal-link integrity check, and **CI runs it**.
A broken cross-reference fails the build.

### 5. The AI surfaces are part of the contract
`/llms.txt`, `/llms-full.txt`, `/llms.mdx/docs/[[...slug]]` and `src/proxy.ts` content negotiation
exist so agents can consume the docs as Markdown. Changing the content shape affects them.

### 6. The type-check script has a different name
It is **`bun run types:check`**, not `typecheck` — it cleans stale generated route types
(`scripts/clean-generated-types.mjs`), runs `next typegen`, then `tsc --noEmit`. Nothing else is
generated: collections are defined with the Fumadocs Macro API in `src/lib/source.ts`, so there is no
`source.config.ts`, `.source` directory or `postinstall`. There is no `typecheck` script in this
repository — that name belongs to the sibling Next.js repos.

### 7. The docs pages follow qeetrix-docs
The docs shell is rebuilt from **qeetrix-docs** (`qeetgroup/qeetrix-docs`, `ui.qeet.in`), so every
Qeet product's docs look and work the same: `src/app/docs/`, the site header
(`src/components/layout/site-header.tsx`, `mobile-menu.tsx`), `src/components/docs/`,
`src/components/mdx.tsx`, `src/lib/{source,code-theme,icons,layout.shared,site-links}` and the docs
rules in `src/app/global.css`. **Change the shared shell in qeetrix-docs first, or in the same step,
and keep the two consistent** — do not let it drift here alone. The landing page (`src/app/(home)`,
`src/components/marketing`, `src/config/{marketing,navigation}.ts`, `site-footer.tsx`) keeps its own
design until it is redesigned; its styles are scoped to `.qid-home`.

**One deliberate addition is Qeet ID's own: the SDK menu.** It takes the sidebar's search slot
(search stays in the site header), and pages show the chosen SDK's code and notes
(`src/components/sdk/`, the list in `src/lib/sdks.ts`). It is not part of the shared shell — keep it
out of qeetrix-docs, and keep the rest of the shell identical around it.

### 8. Every top-level page belongs to a section
`content/docs` is split into sidebar sections — one root folder each (`root: true` in its
`meta.json`). Folder groups such as `(platform)` do not appear in URLs. A page's section comes from
its **first slug** via `sectionOfSlug` in `src/lib/site-links.ts`: a **new top-level page or folder
must be added there**, or it silently falls into Getting started.

### 9. SDK content is per SDK, and honest about each one
`src/lib/sdks.ts` lists the SDKs and their release state: Go installs from GitHub (no tagged
release), Node.js and React build from source (not on npm), Python, Java, .NET, PHP and Ruby are
**planned placeholders** — no package and no code exists, so never write code for them. Each SDK's own
pages live in `content/docs/sdks/<id>/` (Go and Node.js share slugs, so the menu can move between the
same page of each). Shared pages put per-SDK code in `<SdkTabs>`/`<SdkTab sdk>` and per-SDK prose in
`<Sdk only>`; an SDK without code for a step gets an automatic placeholder. **No headings inside
them** — the table of contents lists every heading whichever SDK is chosen.

## Commands

```bash
bun install
bun run dev            # http://localhost:3000
bun run build
bun run lint           # biome check
bun run types:check    # NOT "typecheck"
bun run test           # internal link integrity
bun run format
```

## What CI enforces

`.github/workflows/ci.yml`, job `verify` (push to `main`, `develop`, `release/**`; every PR):
checkout → bun 1.3.14 → `install --frozen-lockfile` → `lint` → `types:check` → `test` → `build`.
On `release/**` only, job `image` then publishes `ghcr.io/qeetgroup/qeet-id-docs:sha-<commit>`
(amd64 + arm64, `Dockerfile`) for the Qeet ID Kit (`qeet-id-kit`). The image changes no header: the CSP
(including `upgrade-insecure-requests`) was verified to work on the kit's `http://*.localhost`.

`.github/workflows/release-tag.yml` tags `vx.y.z` when a `release/x.y.z` pull request is merged
into `main`, so the docs carry the same product version as the applications. It deploys nothing.
qeetrix-docs' Vercel release pipeline (`version.yml` / `release.yml` / `rollback.yml`) is
deliberately **not** adopted: Qeet ID releases through `release/x.y.z` branches owned by `qeet-id-kit`.

## Before you finish

```bash
bun run lint && bun run types:check && bun run test && bun run build
git diff
```

## Escalate rather than proceed

Documenting an unverified behaviour · presenting a `planned` capability as shipped · weakening a
security header · changing the content shape without checking the AI surfaces · letting the docs
shell drift from qeetrix-docs · anything requiring another repository.
