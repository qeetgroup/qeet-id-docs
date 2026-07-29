import { HomeLayout } from "fumadocs-ui/layouts/home";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { baseOptions } from "@/lib/layout.shared";

/**
 * Marketing route-group shell: a dismissible announcement strip, the shared
 * Fumadocs home nav + page content, then the site footer as a sibling (kept
 * out of `<main>`). Docs routes use their own layout, so this footer never
 * doubles up under the sidebar.
 */
export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <AnnouncementBar
        id="dev-preview-2026"
        href="/docs/roadmap"
        linkLabel="See the roadmap"
      >
        <span className="font-medium text-fd-foreground">
          Qeet ID is in developer preview.
        </span>
      </AnnouncementBar>
      <HomeLayout {...baseOptions()} className="flex-1">
        {children}
      </HomeLayout>
      <SiteFooter />
    </>
  );
}
