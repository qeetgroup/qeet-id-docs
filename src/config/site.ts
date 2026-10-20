/**
 * Site metadata and outbound links for the landing page (src/components/marketing,
 * src/components/layout/site-footer.tsx) and the structured data. The documentation pages take
 * theirs from src/lib/shared.ts and src/lib/site-links.ts, which build on the same values.
 */
import { appDescription, productName, siteUrl } from "@/lib/shared";

export { siteUrl };

export const site = {
  /** Product this portal documents. */
  name: productName,
  /** Legal / umbrella entity. */
  company: "Qeet Group",
  /** Short domain-style label used in nav and footer. */
  domain: "docs.qeet.in",
  /** Product tagline — kept in sync with the marketing site. */
  tagline: "Identity You Can Own and Prove",
  /** Default meta description; individual pages override this. */
  description: appDescription,
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
  apiReference: "https://api.qeet.in/reference#qeet-id",
  /** Qeet ID marketing site. */
  website: "https://id.qeet.in",
  /** Admin console. */
  console: "https://console.id.qeet.in",
  /** Hosted status page. */
  status: "https://id.qeet.in/status",
  /** GitHub organisation. */
  githubOrg: "https://github.com/qeetgroup",
  /** Social. */
  x: "https://x.com/qeetgroup",
  /** Support / contact. */
  support: "mailto:support@qeet.in",
  /** Legal and trust center pages shared with the API portal. */
  privacy: "https://api.qeet.in/privacy",
  terms: "https://api.qeet.in/terms",
  security: "https://api.qeet.in/security",
} as const;

/** Where "GitHub" links go: the public organisation (this site's own source is private). */
export const githubUrl = links.githubOrg;
