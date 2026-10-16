# Workflows — qeet-id-docs

**Level:** L2 · **Last verified:** 2026-10-17
**Verification scope:** every command checked against `package.json` and `.github/workflows/ci.yml`.

## Set up

```bash
bun install
bun run dev          # http://localhost:3000
```

No backend and no `.env` required. Nothing is generated before the first run: the Fumadocs Macro
API (`src/lib/source.ts`) compiles the content in the bundler.

## Add a documentation page

```text
1  VERIFY THE BEHAVIOUR         read the handler in qeet-id-server, or its OpenAPI document
2  check capability status      qeet-id-context/PRODUCT.md — implemented | partial | planned
3  content/docs/<folder>/<page>.mdx      the folder may sit inside a (group), e.g.
                                       content/docs/(platform)/authentication/ — the
                                       (group) is not part of the URL
4  frontmatter: title, description; icon only if registered in src/lib/icons.ts
5  add it to its folder's meta.json `pages`
6  a NEW top-level page or folder: map its first slug in sectionOfSlug
   (src/lib/site-links.ts) — otherwise it is placed in Getting started
7  cross-link with RELATIVE links — the link checker verifies them
8  bun run lint && bun run types:check && bun run test && bun run build
```

**Never write from memory, and never copy a claim from an older page on this site.** That is how a
wrong statement becomes self-reinforcing.

## Add a section

A section is a sidebar tab: one root folder in `content/docs`.

```text
1  content/docs/<section>/            a real folder — its name is the URL segment — or
   content/docs/(<section>)/          a folder group that gathers existing top-level pages
                                      and folders without changing their URLs
2  its meta.json: "root": true, title, description, icon, pages
   (`...folder` in pages extracts a folder's pages into the section)
3  list it in content/docs/meta.json `pages`, in sidebar order
4  src/lib/icons.ts         register the icon if it is new (@qeetrix/icons; an unknown
                            name logs a warning and renders nothing)
5  src/lib/site-links.ts    `sections` (name + the page it opens on), `sectionOfSlug`
                            for every first slug in it, `primaryNav` if it belongs in
                            the header
6  src/config/navigation.ts only if the landing page should link to it
7  bun run test     ← link integrity (strips (group) segments, as Fumadocs does)
8  bun run build    ← and confirm no URL changed
```

Moving pages into a `(group)` must not change a URL — inbound links and the AI surfaces depend on
them.

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
1  read the SDK repo at its default branch (main) — qeet-id-{go,node,react}; for what it sends to
   the server, check qeet-id-server's handlers and api/openapi
2  the three SDKs DIFFER: auth scheme, error model, base URL default, field casing
   (see each SDK's docs/llm/boundaries.md) — do not describe one SDK's behaviour for another
3  an SDK's own pages: content/docs/sdks/<id>/ (meta.json orders them). Go and Node.js use the
   same slugs for the same topic; keep it that way, so the SDK menu's move between SDKs lands
   on the same page
4  a shared page: wrap per-SDK code in <SdkTabs> with one <SdkTab sdk="go|node|react"> each;
   per-SDK prose in <Sdk only="go node">; `notes={{ react: "…" }}` explains a missing step.
   No headings inside either
5  planned SDKs (python, java, dotnet, php, ruby) have a placeholder page and an automatic
   placeholder tab — never write code for them; replace the placeholder when the SDK ships
6  adding an SDK: src/lib/sdks.ts, a logo in src/components/brand-logo.tsx and
   src/components/sdk/sdk-logo.tsx, an icon in src/lib/icons.ts, its pages; the menu, tabs
   and styles follow the list
7  bun run test && bun run build
```

> **Release state** — Go: public repo, no tagged release, so `go get` resolves a pseudo-version of
> `main`. Node.js and React: not on npm (QID-009), so their pages install from source — never show
> `npm install @qeet-id/…` as working. Change `status` in `src/lib/sdks.ts` only when a release is
> verifiable.

## Change the docs shell

The docs pages follow **qeetrix-docs** (`ui.qeet.in`) so every Qeet product's docs look and work
the same.

```text
1  find the counterpart in qeetrix-docs (layout, site header, page header, MDX components,
   code theme, docs rules in global.css)
2  change it there first, or in the same step — keep the two consistent
3  do not copy what is qeetrix-only: its Vercel release workflows, dev port 3006, the
   component/token/icon data generators
4  the landing page (src/app/(home), src/components/marketing, .qid-home styles) is
   separate — a docs change must not reach it, and vice versa
5  bun run lint && bun run types:check && bun run test && bun run build
```

## Change the AI surfaces

```text
1  src/app/llms.txt/ · llms-full.txt/ · llms.mdx/docs/[[...slug]]/ — rendered by docsLlms
   in src/lib/source.ts · src/proxy.ts — rewrites Markdown requests to llms.mdx
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

CI (`.github/workflows/ci.yml`, job `verify`) runs exactly this sequence, so a local pass is a real
signal.

### Escalate rather than proceed

An unverified technical claim · presenting a planned capability as shipped · a security example you
cannot verify · weakening the CSP · breaking a slug without a redirect · anything requiring another
repository.
