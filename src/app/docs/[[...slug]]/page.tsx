import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import {
  breadcrumbSchema,
  JsonLd,
  techArticleSchema,
} from "@/components/seo/json-ld";
import { gitConfig, siteUrl } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import { getPageImageUrl, getPageMarkdownUrl, source } from "@/lib/source";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`;
  const pageUrl = new URL(page.url, siteUrl).toString();
  const breadcrumbTrail: [string, string][] = [
    ["Docs", new URL("/docs", siteUrl).toString()],
    ...page.slugs.map(
      (slug, index) =>
        [
          index === page.slugs.length - 1
            ? page.data.title
            : formatSegment(slug),
          new URL(
            `/docs/${page.slugs.slice(0, index + 1).join("/")}`,
            siteUrl,
          ).toString(),
        ] satisfies [string, string],
    ),
  ];

  return (
    <>
      <JsonLd
        schema={[
          techArticleSchema({
            title: page.data.title,
            description: page.data.description,
            url: pageUrl,
          }),
          breadcrumbSchema(breadcrumbTrail),
        ]}
      />
      <DocsPage
        id="main-content"
        tabIndex={-1}
        toc={page.data.toc}
        full={page.data.full}
        breadcrumb={{ enabled: true }}
        footer={{ enabled: true }}
        tableOfContent={{ single: false }}
      >
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription className="mb-0">
          {page.data.description}
        </DocsDescription>
        <div className="flex flex-wrap items-center gap-3 border-b py-5">
          <div className="flex items-center gap-3 text-xs text-fd-muted-foreground">
            <span className="inline-flex items-center gap-2 font-medium text-fd-foreground">
              <span className="size-1.5 bg-amber-500" aria-hidden />
              Developer preview
            </span>
            <span aria-hidden>·</span>
            <span>{formatSegment(page.slugs[0] ?? "documentation")}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <MarkdownCopyButton markdownUrl={markdownUrl} />
            <ViewOptionsPopover
              markdownUrl={markdownUrl}
              githubUrl={githubUrl}
            />
          </div>
        </div>
        <DocsBody>
          <MDX
            components={getMDXComponents({
              // Allow linking to other pages via relative file paths in MDX.
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </DocsPage>
    </>
  );
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

  return buildMetadata({
    title: page.data.title,
    description: page.data.description,
    path: page.url,
    image: getPageImageUrl(page).url,
  });
}

function formatSegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
