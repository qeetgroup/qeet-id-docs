# GEMINI.md — qeet-id-docs

**Read [AGENTS.md](AGENTS.md) first.** It is the model-neutral instruction file and the source of
truth for this repository. This file is a pointer and adds no architecture.

```text
GEMINI.md  →  AGENTS.md  →  docs/llm/*
```

## Canonical context

| File | For |
|---|---|
| [qeet-repo.yml](qeet-repo.yml) | Machine-readable repository identity |
| [AGENTS.md](AGENTS.md) | **Rules, commands, what CI enforces** |
| [docs/llm/context.md](docs/llm/context.md) | How this repository actually works |
| [docs/llm/boundaries.md](docs/llm/boundaries.md) | What it owns, and what it must not touch |
| [docs/llm/workflows.md](docs/llm/workflows.md) | Step-by-step for common changes |
| [docs/llm/architecture-map.md](docs/llm/architecture-map.md) | "Where is X?" — fastest path to a file |

Parent context: **L0** `qeetgroup/qeet-context` · **L1** `qeetgroup/qeet-id-context`.

## What this repository is

The **developer documentation portal for Qeet ID** (`docs.qeet.in`). Next.js 16 + Fumadocs, React 19, `@qeetrix/ui`, bun. It **documents a product it does not own** — the truth lives in `qeet-id-server`.

## Non-negotiables

1. **Never document behaviour you have not verified** in `qeet-id-server`. Readers paste auth examples into production — a wrong example is someone else's vulnerability.
2. **Never present a `planned` capability as available.** The product is pre-1.0 (`v0.1.14`) and **no SDK is published** (QID-009, QID-010).
3. **Never weaken the CSP or security headers** in `next.config.mjs` — this is the strongest posture of any Qeet ID front-end.
4. **Never break a slug** without a redirect — inbound links and the AI surfaces depend on them.
5. The type-check script is **`types:check`**, not `typecheck`.
6. Internal links are tested — `bun run test` runs the link checker, and CI runs it.

## Commands

`bun run dev` · `bun run build` · `bun run lint` · `bun run types:check` · `bun run test`

That list is complete — **do not invent commands.**

## Before finishing

```bash
bun run lint && bun run types:check && bun run test && bun run build
git diff
```
