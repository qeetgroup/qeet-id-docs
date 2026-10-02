# AGENTS.md — qeet-id-docs

**The model-neutral instruction file for coding agents.** [CLAUDE.md](CLAUDE.md),
[GEMINI.md](GEMINI.md) and [.github/copilot-instructions.md](.github/copilot-instructions.md) point
here and add nothing architectural.

## What this repository is

The **developer documentation portal for Qeet ID** — `docs.qeet.in`. Next.js 16.2.12 + **Fumadocs**,
React 19, Tailwind v4, `@qeetrix/ui`, Biome, bun. 69 source files plus MDX content.

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
It is **`bun run types:check`**, not `typecheck` — it cleans generated types, runs `next typegen`,
regenerates the Fumadocs source, then `tsc --noEmit`. There is no `typecheck` script in this
repository — that name belongs to the sibling Next.js repos.

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

`postinstall` runs `fumadocs-mdx`.

## What CI enforces

`.github/workflows/ci.yml`, job `verify` (push to `main`, `develop`, `release/**`; every PR):
checkout → bun 1.3.14 → `install --frozen-lockfile` → `lint` → `types:check` → `test` → `build`.
On `release/**` only, job `image` then publishes `ghcr.io/qeetgroup/qeet-id-docs:sha-<commit>`
(amd64 + arm64, `Dockerfile`) for the `qeet-id-deploy` test kit. The image changes no header: the CSP
(including `upgrade-insecure-requests`) was verified to work on the kit's `http://*.localhost`.

## Before you finish

```bash
bun run lint && bun run types:check && bun run test && bun run build
git diff
```

## Escalate rather than proceed

Documenting an unverified behaviour · presenting a `planned` capability as shipped · weakening a
security header · changing the content shape without checking the AI surfaces · anything requiring
another repository.
