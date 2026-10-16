import { HomeLayout } from "fumadocs-ui/layouts/home";
import { SiteFooter } from "@/components/layout/site-footer";
import { homeOptions } from "@/lib/layout.shared";

/**
 * Marketing route-group shell: shared navigation, page content, then the site
 * footer as a sibling. Release status lives in the hero, avoiding a
 * hydration-dependent announcement shift above the navigation.
 *
 * `qid-home` scopes the landing page's own styles (global.css), so they never
 * reach the documentation.
 */
export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className="qid-home flex flex-1 flex-col">
      <HomeLayout {...homeOptions()} className="flex-1">
        {children}
      </HomeLayout>
      <SiteFooter />
    </div>
  );
}
