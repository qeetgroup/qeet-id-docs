// Spacious: the full-width layout fumadocs.dev uses — the page sits in an inset panel beside the
// sidebar, which collapses, and the sidebar's menu switches between the docs sections (the layout
// tabs, one per root folder in content/docs). The site header sits above it; `--fd-banner-height`
// is how Fumadocs layouts make room for a bar above them, so the layout's height and sticky offsets
// account for the header. The same shell as Qeetrix's docs (ui.qeet.in), with one addition: the
// SDK menu takes the sidebar's search slot (search stays in the site header), and the pages show
// the chosen SDK's code (src/components/sdk).
import { SearchTrigger } from "fumadocs-ui/layouts/shared/slots/search-trigger";
import { DocsLayout } from "fumadocs-ui/layouts/spacious";
import { SiteHeader } from "@/components/layout/site-header";
import { SdkMenu, SdkProvider } from "@/components/sdk/sdk-menu";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

/** The SDKs' own pages, for the menu's move to the same page of another SDK. */
const sdkPages = source
  .getPages()
  .map((page) => page.url)
  .filter((url) => url.startsWith("/docs/sdks/"));

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <div className="docs-shell flex flex-1 flex-col [--fd-banner-height:var(--site-header-height)]">
      <SiteHeader />
      <SdkProvider pages={sdkPages}>
        <DocsLayout
          tree={source.getPageTree()}
          {...baseOptions()}
          slots={{ searchTrigger: { full: SdkMenu, sm: SearchTrigger } }}
        >
          {children}
        </DocsLayout>
      </SdkProvider>
    </div>
  );
}
