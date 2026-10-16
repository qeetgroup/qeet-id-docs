import type { Metadata } from "next";
import { appName } from "./shared";

/** Inline code (`tenant_id`) is markup, not words: it reads as noise in a search snippet. */
export function plainText(text: string) {
  return text.replace(/`([^`]+)`/g, "$1");
}

/** The share card of every page without its own: the landing page and the site-wide fallback. */
export const defaultOgImage = "/og/image.png";

/** The Open Graph fields every page carries. */
export const openGraphBase = {
  type: "website",
  siteName: appName,
  locale: "en_US",
} as const;

/**
 * A page's metadata: its canonical URL, its Open Graph card and the large X card. Next merges
 * `openGraph` shallowly — a page that sets it replaces the layout's whole object — so every page
 * passes through here and gets the full set. `og:title` and `og:description` come from `title`
 * and `description`, title template included.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: Metadata["title"];
  description: string;
  path: string;
  image: string;
}): Metadata {
  return {
    title,
    description: plainText(description),
    alternates: { canonical: path },
    openGraph: { ...openGraphBase, url: path, images: image },
    twitter: { card: "summary_large_image", images: image },
  };
}
