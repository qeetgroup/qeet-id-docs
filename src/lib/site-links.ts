import { links as siteLinks } from "@/config/site";
import { gitConfig } from "./shared";

/**
 * Every destination the documentation's header, page header and error pages link to, in one
 * place. Each one is real: a route in this site, the public qeetgroup/qeet-id-docs repository, or
 * a Qeet property (src/config/site.ts). Nothing here is a placeholder.
 */

export const docsRepo = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

export const links = {
  home: "/",
  docs: "/docs",
  gettingStarted: "/docs/getting-started",
  quickstart: "/docs/getting-started/quickstart",
  installation: "/docs/getting-started/installation",
  concepts: "/docs/concepts",
  authentication: "/docs/authentication",
  security: "/docs/security",
  guides: "/docs/guides",
  sdks: "/docs/sdks",
  roadmap: "/docs/roadmap",

  apiReference: siteLinks.apiReference,
  github: docsRepo,
  githubOrg: siteLinks.githubOrg,
} as const;

/**
 * The documentation's sections — the sidebar tabs, one per root folder in content/docs/meta.json.
 * `url` is the page a section opens on.
 */
export const sections = {
  "getting-started": { name: "Getting started", url: links.docs },
  concepts: { name: "Concepts", url: links.concepts },
  platform: { name: "Platform", url: links.authentication },
  security: { name: "Security", url: links.security },
  guides: { name: "Guides", url: links.guides },
  sdks: { name: "SDKs", url: links.sdks },
  resources: { name: "Resources", url: links.roadmap },
} as const;

export type SectionId = keyof typeof sections;

/**
 * The section of each top-level slug. Folder groups such as `(platform)` leave no trace in a URL,
 * so a page's first slug is what places it: a new top-level page or folder is added here too.
 */
const sectionOfSlug: Record<string, SectionId> = {
  "getting-started": "getting-started",
  concepts: "concepts",
  architecture: "concepts",
  authentication: "platform",
  authorization: "platform",
  provisioning: "platform",
  agents: "platform",
  "audit-logs": "platform",
  security: "security",
  guides: "guides",
  sdks: "sdks",
  roadmap: "resources",
  faq: "resources",
  support: "resources",
};

/** The section a page belongs to, from its slugs; the docs index is Getting started. */
export function sectionIdOf(slugs: string[]): SectionId {
  return sectionOfSlug[slugs[0] ?? ""] ?? "getting-started";
}

/** The section a docs pathname belongs to, or nothing outside the docs. */
export function sectionIdOfPath(pathname: string): SectionId | undefined {
  if (pathname !== links.docs && !pathname.startsWith(`${links.docs}/`)) return;
  return sectionIdOf(pathname.slice(links.docs.length + 1).split("/"));
}

type NavItem = {
  label: string;
  href: string;
  /** The section that marks this entry as current; external entries have none. */
  section?: SectionId;
  external?: boolean;
};

/**
 * The primary navigation, shared by the header and the mobile menu. Resources stays in the
 * sidebar's section menu, which leaves the header room for the API reference.
 */
export const primaryNav: readonly NavItem[] = [
  { label: "Docs", href: links.docs, section: "getting-started" },
  { label: "Concepts", href: links.concepts, section: "concepts" },
  { label: "Platform", href: links.authentication, section: "platform" },
  { label: "Security", href: links.security, section: "security" },
  { label: "Guides", href: links.guides, section: "guides" },
  { label: "SDKs", href: links.sdks, section: "sdks" },
  { label: "API Reference", href: links.apiReference, external: true },
];
