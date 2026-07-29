import type { StructuredData } from "fumadocs-core/mdx-plugins";
import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

export const { GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: "english",
  async buildIndex(page) {
    const structuredData = page.data.structuredData as
      | StructuredData
      | undefined;

    if (!structuredData) {
      throw new Error(`Missing structured search data for ${page.url}`);
    }

    return {
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData: {
        headings: structuredData.headings,
        contents: structuredData.contents.filter(
          ({ content }) => !looksLikeSerializedMdxProps(content),
        ),
      },
    };
  },
});

function looksLikeSerializedMdxProps(content: string): boolean {
  const trimmed = content.trim();
  if (/^<\/?[A-Z][A-Za-z0-9.]*/.test(trimmed)) return true;

  const markers = ["title:", "href:", "description:", "items:"];
  return (
    markers.filter((marker) => trimmed.toLowerCase().includes(marker)).length >=
    2
  );
}
