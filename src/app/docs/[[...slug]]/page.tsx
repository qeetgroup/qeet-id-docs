import {
  DocsBody,
  DocsPage,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/spacious/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPageHeader } from "@/components/docs/page-header";
import { getMDXComponents } from "@/components/mdx";
import {
  breadcrumbSchema,
  JsonLd,
  techArticleSchema,
} from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";
import {
  appDescription,
  getPageImageUrl,
  getPageMarkdownUrl,
  siteUrl,
} from "@/lib/shared";
import { links, sectionIdOf, sections } from "@/lib/site-links";
import { source } from "@/lib/source";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const section = sections[sectionIdOf(page.slugs)];
  const pageUrl = new URL(page.url, siteUrl).toString();

  return (
    <DocsPage
      // The skip link's target (src/app/layout.tsx).
      id="main-content"
      tabIndex={-1}
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{ enabled: false }}
      // The "clerk" outline: a line that follows heading depth, lighting only the current section.
      tableOfContent={{ style: "clerk", single: true }}
      tableOfContentPopover={{ style: "clerk" }}
    >
      <JsonLd
        schema={[
          techArticleSchema({
            title: page.data.title,
            description: page.data.description,
            url: pageUrl,
          }),
          breadcrumbSchema(
            trail([
              ["Docs", links.docs],
              [section.name, section.url],
              [page.data.title, page.url],
            ]),
          ),
        ]}
      />
      <DocsPageHeader
        section={section}
        title={page.data.title}
        description={page.data.description}
        actions={
          <>
            <MarkdownCopyButton markdownUrl={markdownUrl} />
            <ViewOptionsPopover markdownUrl={markdownUrl} />
          </>
        }
      />
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

/**
 * A breadcrumb trail in absolute URLs, each URL once: a section's own page is the section, and the
 * docs index is the Getting started section, so the later, more specific name wins.
 */
function trail(items: [name: string, path: string][]): [string, string][] {
  const byUrl = new Map<string, string>();
  for (const [name, path] of items) {
    const url = new URL(path, siteUrl).toString();
    byUrl.delete(url);
    byUrl.set(url, name);
  }
  return Array.from(byUrl, ([url, name]) => [name, url]);
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return pageMetadata({
    title: page.data.title,
    description: page.data.description ?? appDescription,
    path: page.url,
    image: getPageImageUrl(page).url,
  });
}
