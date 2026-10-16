# GitHub Copilot — qeet-id-docs

**Canonical instructions: [`AGENTS.md`](../AGENTS.md).** This file is a summary; it adds no
architecture.

## Repository

The **developer documentation portal for Qeet ID** (`docs.qeet.in`). Next.js 16 + Fumadocs, React 19, `@qeetrix/ui`, bun. It **documents a product it does not own** — the truth lives in `qeet-id-server`.

Context: **L0** `qeet-context` (organization) → **L1** `qeet-id-context` (product) → **L2** this
repository → source.

## Structure

MDX content under `content/docs/`, one root folder per sidebar section: `(getting-started)`, `(concepts)`, `(platform)`, `security`, `guides`, `sdks`, `(resources)` — folder groups in parentheses do not appear in URLs, and a new top-level page or folder is mapped to its section in `src/lib/site-links.ts`. App routes in `src/app/`, including the **AI surfaces** `/llms.txt`, `/llms-full.txt`, `/llms.mdx/docs/*` and the content-negotiation proxy `src/proxy.ts`. Local search at `/api/search`.

## Rules

1. **Never document behaviour you have not verified** in `qeet-id-server`. Readers paste auth examples into production — a wrong example is someone else's vulnerability.
2. **Never present a `planned` capability as available.** The product is pre-1.0 (`v0.1.14`) and **no SDK is published** (QID-009, QID-010).
3. **Never weaken the CSP or security headers** in `next.config.mjs` — this is the strongest posture of any Qeet ID front-end.
4. **Never break a slug** without a redirect — inbound links and the AI surfaces depend on them.
5. The type-check script is **`types:check`**, not `typecheck`.
6. Internal links are tested — `bun run test` runs the link checker, and CI runs it.

## Commands

`bun run dev` · `bun run build` · `bun run lint` · `bun run types:check` · `bun run test`

## Do not

- document behaviour from memory or from an older page on this site
- describe an SDK installation that does not work — none are published
- weaken the CSP to make a component render
- show a real token, key, or credential in an example
- demonstrate a weakened security pattern "for brevity"
- invoke a `typecheck` script — no such script exists here; it is `types:check`
