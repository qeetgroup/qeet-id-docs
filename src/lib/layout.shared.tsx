import { BookOpenIcon } from "@qeetrix/icons";
import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/brand/logo";
import { primaryNav } from "@/config/navigation";
import { githubUrl } from "@/config/site";

/**
 * The shared content width of the site header and the error pages. Wide screens get side padding
 * that grows with the viewport rather than a narrow reading column.
 */
export const container = "mx-auto w-full max-w-[96rem] px-6 lg:px-12 xl:px-20";

/**
 * Options for the docs layout. The brand, the theme switch and the GitHub link live in the site
 * header above it, so the sidebar's title names the docs instead of repeating the logo, and the
 * layout draws neither its own theme switch nor a GitHub icon link.
 */
export function baseOptions(): BaseLayoutProps {
  return {
    themeSwitch: { enabled: false },
    nav: {
      title: (
        <>
          <BookOpenIcon
            aria-hidden
            className="size-4 text-[var(--qx-color-text-brand)]"
          />
          Documentation
        </>
      ),
    },
  };
}

/**
 * Options for the landing page's own navigation bar, derived from the declarative
 * `config/navigation` model so the bar and the footer never drift apart. The documentation uses
 * the site header (src/components/layout/site-header.tsx) instead.
 */
export function homeOptions(): BaseLayoutProps {
  const links: LinkItemType[] = primaryNav.map((item) => ({
    type: "main",
    text: item.label,
    url: item.href,
    external: item.external,
  }));

  return {
    nav: {
      title: <Logo />,
      transparentMode: "top",
    },
    links,
    githubUrl,
    themeSwitch: {
      mode: "light-dark-system",
    },
  };
}
