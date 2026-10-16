# Boundaries — qeet-id-docs

**Level:** L2 · **Last verified:** 2026-10-17
**Verification scope:** ownership from `qeet-id-context/REPOSITORIES.md`; absence of an API client
verified against the tree.

## Owns

The documentation site at `docs.qeet.in`: MDX content, navigation, local search, SEO and OpenGraph
artifacts, the machine-readable AI surfaces, and the security-header configuration.

## Does not own

| Not owned | Owner |
|---|---|
| **Any technical truth it documents** | `qeet-id-server` |
| **Capability status (shipped vs planned)** | `qeet-id-context/PRODUCT.md` |
| The API contract | `qeet-id-server` — its OpenAPI documents |
| SDK behaviour | `qeet-id-{go,node,react}` |
| Marketing claims | `qeet-id-website` |
| Org-wide docs | `qeet-docs` — a **different** repository at `docs.qeet.in`'s sibling scope |
| The design system and icons | `qeetrix-ui` (`@qeetrix/ui`), `qeetrix-icons` (`@qeetrix/icons`) |
| **The shared docs shell** (layout, header, page header, MDX components, code theme) | `qeetrix-docs` (`ui.qeet.in`) — this site follows it |

**This repository renders truth. It never holds it.**

## Consumes

`@qeetrix/ui`, `@qeetrix/icons`, `@thesvg/react` and Fumadocs at build time; the docs shell's design
from `qeetrix-docs`. **Nothing at runtime** — no API, no external search, no secret.

## Provides

| Output | Consumer |
|---|---|
| HTML documentation | humans |
| `/llms.txt`, `/llms-full.txt`, `/llms.mdx/docs/*` | **AI agents** |
| Content negotiation via `src/proxy.ts` | agents requesting Markdown from a canonical URL |
| `/api/search` | the site's own search UI |
| `/rss.xml`, sitemap, OG images | crawlers and feed readers |

The AI surfaces are a **machine contract** — a content-shape change affects consumers who will not
report a break.

## Security boundaries

This repository holds nothing, so its risks are of a different kind:

| Surface | Risk |
|---|---|
| **Documented auth examples** | Copied verbatim into production systems. A wrong example is someone else's vulnerability |
| **SDK install instructions** | Currently describe unpublished packages (QID-009) |
| Security headers / CSP | The strongest posture in the org; weakening it is a regression |
| AI surfaces | Silent breakage for machine consumers |

## Cross-repository dependencies

```text
qeet-id-server         ──is documented by──►  qeet-id-docs
qeet-id-context        ──capability status──►  qeet-id-docs
qeet-id-{go,node,react} ──SDK behaviour────►  qeet-id-docs
qeetrix-ui             ──@qeetrix/ui───────►  qeet-id-docs
qeetrix-icons          ──@qeetrix/icons────►  qeet-id-docs
qeetrix-docs           ──docs shell design─►  qeet-id-docs
```

Downstream of everything. Upstream of nothing.

## Safe to change without coordination

Landing-page layout, styling and components · navigation ordering within a section · prose clarity
on already-verified behaviour · new examples of **existing, verified** behaviour · SEO metadata ·
accessibility.

## Requires verification or coordination

| Change | Why |
|---|---|
| **Any technical claim** | Verify against `qeet-id-server` — never from memory or an older page |
| **Any "available / shipped" claim** | Verify against `qeet-id-context/PRODUCT.md` |
| **SDK docs** | No SDK is published — QID-009 |
| An auth or crypto example | Readers copy it into production |
| Security headers or CSP | A deliberate, strong posture |
| Content shape or slugs | Breaks the AI surfaces and inbound links |
| The docs shell — `src/app/docs/`, site header, `src/components/docs/`, `mdx.tsx`, the docs rules in `global.css` | Keep it consistent with `qeetrix-docs`: change it there first, or in the same step |
| A new section or top-level page | `sectionOfSlug` in `src/lib/site-links.ts`, or it is placed in Getting started |
| `@qeetrix/ui` / `@qeetrix/icons` major upgrade | Owned by `qeetrix-ui` / `qeetrix-icons`; keep in step with `qeetrix-docs` |

Product-level fan-out: `qeet-id-context/CHANGE-MATRIX.md`.

## Hard limits

1. **Never document behaviour you have not verified** in `qeet-id-server`.
2. **Never present a `planned` capability as available.** The product is pre-1.0 and **no SDK is
   published**.
3. **Never weaken the CSP or the security headers** to make a component work.
4. **Never break an existing slug** without a redirect — inbound links and the AI surfaces depend on
   them.
5. **Never add a secret or an API client.** This site has neither, by design.
6. **Never let this site become the origin of a claim.** If it is not true in
   `qeet-id-server` or `qeet-id-context`, it is not true here.
7. **Never change another repository** from a task scoped to this one.
