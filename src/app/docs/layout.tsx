import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { LayoutTab } from "fumadocs-ui/layouts/shared";
import { ArrowUpRight, BookOpen, Code, FileText, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/brand/icons";
import { KeyboardShortcutsHint } from "@/components/layout/keyboard-shortcuts-hint";
import { BackToTop } from "@/components/ui/back-to-top";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { links } from "@/config/site";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

/**
 * Sidebar tabs — switch the sidebar between the major documentation areas.
 * `Guides` and `SDKs` are marked `root: true` in their `meta.json`, so their
 * trees are scoped to their own tab; everything else lives under Documentation.
 */
const sidebarTabs: LayoutTab[] = [
  {
    title: "Documentation",
    description: "Concepts, auth & platform",
    url: "/docs",
    icon: <BookOpen className="size-4" />,
  },
  {
    title: "Guides",
    description: "How-to walkthroughs",
    url: "/docs/guides",
    icon: <Sparkles className="size-4" />,
  },
  {
    title: "SDKs",
    description: "Client libraries",
    url: "/docs/sdks",
    icon: <Code className="size-4" />,
  },
];

/**
 * Docs layout — the Fumadocs docs shell (sidebar tabs + tree + TOC + content).
 * The sidebar gets a branded footer linking out to the Scalar API reference and
 * GitHub; the tree, nav and links are shared with the site via `baseOptions()`.
 */
export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <>
      <ReadingProgress />
      <DocsLayout
        {...baseOptions()}
        tree={source.getPageTree()}
        tabs={sidebarTabs}
        sidebar={{
          collapsible: true,
          // Key required: Fumadocs renders `footer` inside a children array
          // (see its sidebar slot), so the element we pass needs a stable key.
          // NOTE: the version selector was removed for now — Qeetrix's Base UI
          // DropdownMenu throws a MenuGroupContext error in this app (likely a
          // duplicate @base-ui/react between Qeetrix and Fumadocs). Revisit with
          // a deduped Base UI or a custom dropdown.
          footer: <SidebarFooter key="qid-sidebar-footer" />,
        }}
      >
        {children}
      </DocsLayout>
      <BackToTop />
    </>
  );
}

function SidebarFooter() {
  return (
    <div className="flex flex-col gap-1 border-t border-fd-border pt-3">
      <KeyboardShortcutsHint />
      <SidebarFooterLink
        href={links.apiReference}
        icon={<FileText className="size-4" />}
      >
        API Reference
      </SidebarFooterLink>
      <SidebarFooterLink
        href={links.githubOrg}
        icon={<GithubIcon className="size-4" />}
      >
        GitHub
      </SidebarFooterLink>
    </div>
  );
}

function SidebarFooterLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
    >
      {icon}
      <span className="flex-1">{children}</span>
      <ArrowUpRight className="size-3.5 opacity-60" />
    </a>
  );
}
