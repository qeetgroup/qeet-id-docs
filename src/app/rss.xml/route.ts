import { site, siteUrl } from "@/config/site";
import { source } from "@/lib/source";

export const revalidate = false;

/** Minimal XML entity escaping for text nodes. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 feed of documentation pages, served at `/rss.xml`. Lets readers and
 * aggregators follow the docs; the sitemap covers crawler discovery.
 */
export function GET() {
  const items = source
    .getPages()
    .map((page) => {
      const url = new URL(page.url, siteUrl).toString();
      return `    <item>
      <title>${escapeXml(page.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(page.data.description ?? "")}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.name} Docs`)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
