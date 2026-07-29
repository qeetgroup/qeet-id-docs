import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/brand/logo";
import { primaryNav } from "@/config/navigation";
import { githubUrl } from "@/config/site";

/**
 * Shared layout options consumed by both the docs and home layouts, so the
 * header, product name and links stay identical across the site.
 *
 * The primary nav is derived from the declarative `config/navigation` model,
 * so the top bar, footer and (later) command palette never drift apart.
 */
export function baseOptions(): BaseLayoutProps {
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
