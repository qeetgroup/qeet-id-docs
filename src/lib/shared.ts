import { createGetUrl } from "fumadocs-core/source";

export const appName = "Qeet ID Docs";
export const productName = "Qeet ID";
export const appDescription =
  "Developer documentation for Qeet ID — the passkeys-first identity platform. Guides, concepts, SDKs and tutorials for authentication, authorization, organizations, SSO, SCIM and audit.";

/**
 * The canonical origin. `NEXT_PUBLIC_SITE_URL` overrides it at build time (a preview deployment);
 * the container image for the Qeet ID Kit keeps docs.qeet.in.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.qeet.in"
).replace(/\/$/, "");

/**
 * Where the product stands, shown beside every page title. Qeet ID is pre-1.0, so no page may read
 * as describing a generally available product; drop this at 1.0.
 */
export const productStatus = {
  label: "Developer preview",
  kind: "warning",
} as const;

export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "content.md"];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "image.png"];

  return { segments, url: getImageUrl(segments, page.locale) };
}
