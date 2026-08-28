# Repository Context — qeet-id-docs

**Level:** L2 · **Status:** active · **Evidence state:** verified · **Last verified:** 2026-08-28
**Verification scope:** routes, scripts, CI steps and security headers read from source.

## Identity

The **developer documentation portal for Qeet ID**, served at `docs.qeet.in`. Next.js 16.2.12 +
**Fumadocs 16.13.0** (`fumadocs-ui` aliased to `@fumadocs/base-ui`), React 19.2.8, Tailwind v4,
`@qeetrix/ui ^1.0.2`, Biome, bun. 69 source files, ~4.4k LOC, plus MDX content.

Version note: this repository runs **Next 16.2.12 / React 19.2.8** while `qeet-id-login` and
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

A static-first Fumadocs site. Content is MDX under `content/docs/`, loaded via `src/lib/source.ts`
and configured in `source.config.ts`. Search is served locally by `src/app/api/search/route.ts` — no
external search service.

### The AI surfaces are a real contract

```text
/llms.txt                      a compact index for agents
/llms-full.txt                 the full corpus
/llms.mdx/docs/[[...slug]]     per-page Markdown
src/proxy.ts                   content negotiation — serves Markdown from the SAME
                               canonical URL when Accept prefers it, sets Vary: Accept
```

`src/proxy.ts` uses `fumadocs-core/negotiation`. **Changing the content shape affects agent
consumers**, not just human readers.

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
are added **only when `NODE_ENV !== "production"`**.

**Do not relax any of this** to make a component work; find another way.

## Documentation correctness is a security concern

An identity platform's docs are copied into production code. A wrong auth example is a real
vulnerability in someone else's system.

**Verify before writing.** Two live traps:

| Trap | Reality |
|---|---|
| Documenting SDK installation | **No Qeet ID SDK is published** — npm 404, Go proxy never fetched (QID-009). `content/docs/sdks/` describes packages a reader cannot install |
| Writing "generally available" | Highest published version is **`v0.1.14`**; the roadmap says pre-1.0 (QID-010) |

The `sdks/` section is the single most likely place for this repository to mislead someone.

## Testing and CI

`bun run test` is **`node scripts/check-links.mjs`** — an internal-link integrity check across all
MDX. There are **no unit tests** and no `*.test.*` files; link integrity is the test.

**This is the only Qeet ID front-end with a CI workflow.** `.github/workflows/ci.yml`, one job
`verify` on `bby-ubuntu`: install → `lint` → `types:check` → `test` → `build`.

`qeet-id-login`, `qeet-id-website` and `qeet-id-auth` have no CI at all. **This repository is the
reference for what the others should adopt.**

## Script naming

The type-check script is **`types:check`**, not `typecheck` — it chains
`clean-generated-types.mjs` → `next typegen` → `generate-source.mjs` → `tsc --noEmit`.
`qeet-id-login` and `qeet-id-website` use `typecheck`. **The name differs — no `typecheck` script
exists in this repository.**

## Local development

`bun run dev` → `http://localhost:3000`. No backend dependency, no `.env` required
(`NEXT_PUBLIC_SITE_URL` defaults to the production host).

## Security-relevant

| Area | Path | Risk | Note |
|---|---|---|---|
| Security headers, CSP | `next.config.mjs` | **High** | Strongest posture in the org — do not weaken |
| Documented auth examples | `content/docs/authentication/` | **High** | Copied into production by readers |
| SDK install instructions | `content/docs/sdks/` | High | The packages are not published |
| AI surfaces | `src/app/llms*`, `src/proxy.ts` | Medium | Machine consumers depend on the shape |

No secrets, no auth, no API access.

## Known constraints

- **No unit tests** — link integrity is the only automated content check.
- `content/docs/sdks/` documents unpublished packages.
- Framework versions drift ahead of the sibling Next.js repos.
- The `types:check` name differs from the siblings' `typecheck`.
- `.gitignore` covers `.env*.local` only, not `.env`.
- `@qeetrix/ui ^1.0.2` is a major version behind npm's `2.0.0`.

## Documentation authority

For anything technical: **`qeet-id-server` source > its OpenAPI documents > `qeet-id-context` >
this site.** This repository renders truth; it does not hold it.
