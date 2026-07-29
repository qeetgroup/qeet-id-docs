/**
 * Single source of truth for global site metadata, canonical URLs and outbound
 * links used across layouts, SEO, structured data and the footer.
 *
 * Everything that is environment- or brand-specific lives here so the rest of
 * the codebase never hard-codes a URL or product string. When the Qeet ID docs
 * repo is split to its own domain, only this file changes.
 */

/**
 * Canonical origin for the documentation portal.
 *
 * Overridable at build time via `NEXT_PUBLIC_SITE_URL` (e.g. Vercel preview
 * deployments) and falls back to the production docs domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.qeet.in"
).replace(/\/$/, "");

export const site = {
  /** Product this portal documents. */
  name: "Qeet ID",
  /** Legal / umbrella entity. */
  company: "Qeet Group",
  /** Short domain-style label used in nav and footer. */
  domain: "docs.qeet.in",
  /** Product tagline — kept in sync with the marketing site. */
  tagline: "Identity You Can Own and Prove",
  /** Default meta description; individual pages override this. */
  description:
    "Developer documentation for Qeet ID — the passkeys-first, open-source identity platform. Guides, concepts, SDKs and tutorials for authentication, authorization, organizations, SSO, SCIM and audit.",
  /** OG locale. */
  locale: "en_US",
  url: siteUrl,
} as const;

/**
 * Outbound and cross-property links. The API reference is intentionally NOT
 * built here — it is served by Scalar and only linked.
 */
export const links = {
  /** Scalar-hosted OpenAPI reference (linked, never rebuilt in this portal). */
  apiReference: "https://api.qeet.in",
  /** Qeet ID marketing site. */
  website: "https://id.qeet.in",
  /** Admin console. */
  console: "https://console.id.qeet.in",
  /** Hosted status page. */
  status: "https://status.qeet.in",
  /** GitHub organisation. */
  githubOrg: "https://github.com/qeetgroup",
  /** Social. */
  x: "https://x.com/qeetgroup",
  /** Support / contact. */
  support: "mailto:support@qeet.in",
} as const;

/**
 * GitHub coordinates for "edit this page" / "view source" links and the nav
 * repository button.
 */
export const gitConfig = {
  user: "qeetgroup",
  repo: "qeet-id-docs",
  branch: "main",
} as const;

export const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

/** Route prefixes. Kept as constants so the proxy/OG/LLM routes agree. */
export const routes = {
  docs: "/docs",
  docsImage: "/og/docs",
  docsContent: "/llms.mdx/docs",
} as const;
