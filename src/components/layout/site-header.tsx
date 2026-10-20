"use client";

import { ArrowUpRightIcon } from "@qeetrix/icons";
// @qeetrix/ui's cn knows the type-role sizes (text-label, text-body, …); the plain one drops them.
import { cn } from "@qeetrix/ui";
import Github from "@thesvg/react/github";
import {
  FullSearchTrigger,
  SearchTrigger,
} from "fumadocs-ui/layouts/shared/slots/search-trigger";
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { container } from "@/lib/layout.shared";
import { productName } from "@/lib/shared";
import { links, primaryNav, sectionIdOfPath } from "@/lib/site-links";

const navLink =
  "inline-flex items-center gap-1 rounded-md px-3.5 py-2 text-body transition-colors duration-fast hover:bg-surface-interactive hover:text-foreground focus-visible:focus-ring";

/**
 * The documentation's header, one component for the docs and the error pages, so they have the
 * same brand, navigation, search, theme switch and GitHub link at the same size — the header of
 * every Qeet product's docs, after Qeetrix's (ui.qeet.in). Search and the theme switch are
 * Fumadocs' own controls, so there is one search dialog and one theme across the site. The section
 * you are in is marked; outside the docs nothing is.
 *
 * Its height is `--site-header-height` (global.css): the docs layout offsets its sticky parts by it.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const active = sectionIdOfPath(pathname);

  return (
    <header className="site-header sticky top-0 z-(--qx-z-sticky) border-b border-border-subtle bg-background/95 supports-backdrop-filter:bg-background/85 supports-backdrop-filter:backdrop-blur-xl">
      <div className={`${container} flex h-16 items-center gap-6`}>
        <Link
          href={links.home}
          className="flex shrink-0 items-center gap-2 rounded-md font-heading text-heading font-semibold text-foreground focus-visible:focus-ring"
        >
          <BrandMark height={22} />
          {productName}
        </Link>

        <nav aria-label="Primary" className="mx-auto hidden xl:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              if (item.external) {
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(navLink, "text-foreground/80")}
                    >
                      {item.label}
                      <ArrowUpRightIcon
                        aria-hidden
                        className="size-3.5 text-muted-foreground"
                      />
                    </a>
                  </li>
                );
              }
              const current = item.section === active;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      navLink,
                      current
                        ? "bg-surface-interactive font-medium text-foreground"
                        : "text-foreground/80",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2 xl:ms-0">
          <FullSearchTrigger className="hidden w-52 md:flex 2xl:w-60" />
          <SearchTrigger className="md:hidden" />
          <span
            aria-hidden
            className="mx-1 hidden h-5 w-px bg-border-subtle sm:block"
          />
          <ThemeSwitch className="hidden sm:flex" />
          <a
            href={links.github}
            aria-label="Qeet Group on GitHub"
            className="inline-flex size-9 items-center justify-center rounded-md text-foreground transition-colors duration-fast hover:bg-surface-interactive focus-visible:focus-ring"
          >
            <Github variant="mono" aria-hidden className="size-6" />
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
