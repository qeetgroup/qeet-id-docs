# Workflows — qeet-id-docs

**Level:** L2 · **Last verified:** 2026-08-28
**Verification scope:** every command checked against `package.json` and `.github/workflows/ci.yml`.

## Set up

```bash
bun install          # postinstall runs fumadocs-mdx
bun run dev          # http://localhost:3000
```

No backend and no `.env` required.

## Add a documentation page

```text
1  VERIFY THE BEHAVIOUR         read the handler in qeet-id-server, or its OpenAPI document
2  check capability status      qeet-id-context/PRODUCT.md — implemented | partial | planned
3  content/docs/<section>/<page>.mdx
4  add it to the section's meta.json for navigation
5  cross-link with RELATIVE links — the link checker verifies them
6  bun run lint && bun run types:check && bun run test && bun run build
```

**Never write from memory, and never copy a claim from an older page on this site.** That is how a
wrong statement becomes self-reinforcing.

## Add a section

```text
1  content/docs/<section>/  with index.mdx + meta.json
2  register it in the root navigation (content/docs/meta.json)
3  src/config/navigation.ts if it needs chrome treatment
4  bun run test     ← link integrity
5  bun run build
```

## Write an authentication or crypto example

**Treat this as security work.**

```text
1  verify against qeet-id-server — the handler, not the docs
2  the example must be COMPLETE and CORRECT: readers paste it into production
3  never show a token, key, or real credential — use an obvious placeholder
4  never demonstrate a weakened pattern "for brevity"
   (no skipping verification, no disabling CSRF, no wildcard origins)
5  bun run test && bun run build
```

## Update SDK documentation

```text
1  read the SDK repo — qeet-id-{go,node,react}
2  the three SDKs DIFFER: auth scheme, error model, base URL default, field casing
   (see each SDK's docs/llm/boundaries.md)
3  do not describe one SDK's behaviour for another
```

> **No Qeet ID SDK is published today** — npm returns 404 and the Go proxy has never fetched the
> module (QID-009). Installation instructions in `content/docs/sdks/` describe packages a reader
> **cannot install**. Do not add more until they ship, and consider saying so.

## Change the AI surfaces

```text
1  src/app/llms.txt/ · llms-full.txt/ · llms.mdx/docs/[[...slug]]/ · src/proxy.ts
2  these are consumed by MACHINES that will not report a break
3  keep Vary: Accept correct on the negotiation path
4  bun run build and fetch each surface manually
```

## Change security headers

**Security review required.**

```text
1  next.config.mjs
2  do NOT weaken the CSP to make a component work
3  'unsafe-eval' and ws: must stay development-only
4  HSTS preload is effectively irreversible — do not touch max-age casually
5  bun run build and inspect the response headers
```

## Finish any task

```bash
bun run lint && bun run types:check && bun run test && bun run build
git diff
```

> The script is **`types:check`**, not `typecheck`. No `typecheck` script exists in this
> repository, though it does in `qeet-id-login` and `qeet-id-website`.

CI runs exactly this sequence, so a local pass is a real signal — unlike the sibling front-ends,
which have no CI at all.

### Escalate rather than proceed

An unverified technical claim · presenting a planned capability as shipped · a security example you
cannot verify · weakening the CSP · breaking a slug without a redirect · anything requiring another
repository.
