import { HomeLayout } from "fumadocs-ui/layouts/home";
import { SiteFooter } from "@/components/layout/site-footer";
import { baseOptions } from "@/lib/layout.shared";

/**
 * Marketing route-group shell: shared navigation, page content, then the site
 * footer as a sibling. Release status lives in the hero, avoiding a
 * hydration-dependent announcement shift above the navigation.
 */
export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <HomeLayout {...baseOptions()} className="flex-1">
        {children}
      </HomeLayout>
      <SiteFooter />
    </>
  );
}
