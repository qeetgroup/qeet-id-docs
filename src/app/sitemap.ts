import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { source } from "@/lib/source";

/**
 * sitemap.xml — the marketing home plus every documentation page, enumerated
 * from the content source so it stays in sync automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const docs: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: new URL(page.url, siteUrl).toString(),
    lastModified: now,
    changeFrequency: "weekly",
    priority: page.url === "/docs" ? 0.9 : 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...docs,
  ];
}
