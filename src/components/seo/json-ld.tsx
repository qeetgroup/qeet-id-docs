import { links, site, siteUrl } from "@/config/site";

type Schema = Record<string, unknown>;

/**
 * JsonLd — renders one or more schema.org objects as a JSON-LD `<script>`.
 * Search engines read this to build rich results; it's inert for users.
 */
export function JsonLd({ schema }: { schema: Schema | Schema[] }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is a script element; `<` is escaped.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** The publishing organisation. */
export const organizationSchema: Schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.company,
  url: "https://qeet.in",
  logo: `${siteUrl}/icon.png`,
  sameAs: [links.githubOrg, links.x],
};

/** The documentation website. Search is exposed through the in-product command palette. */
export const websiteSchema: Schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${site.name} Docs`,
  url: siteUrl,
  description: site.description,
  publisher: { "@type": "Organization", name: site.company },
};

/** Qeet ID as a software product. */
export const softwareApplicationSchema: Schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web, Self-hosted",
  description: site.description,
  url: links.website,
};

/** A documentation page as a technical article. */
export function techArticleSchema({
  title,
  description,
  url,
}: {
  title: string;
  description?: string;
  url: string;
}): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url,
    isPartOf: { "@type": "WebSite", name: `${site.name} Docs`, url: siteUrl },
    publisher: { "@type": "Organization", name: site.company },
  };
}

/** A breadcrumb trail: array of [name, url] pairs, in order. */
export function breadcrumbSchema(trail: [name: string, url: string][]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, url], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: url,
    })),
  };
}
