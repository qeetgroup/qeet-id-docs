import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/brand/icons";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { footerMeta, footerNav } from "@/config/navigation";
import { links, site } from "@/config/site";

/**
 * SiteFooter — marketing footer, data-driven from `config/navigation`. Server
 * component (no interactivity). Docs pages use Fumadocs' own footer, so this is
 * mounted only under the `(home)` route group.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-fd-border bg-fd-card/40">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="w-fit rounded-md"
              aria-label={`${site.name} home`}
            >
              <Logo />
            </Link>
            <p className="max-w-xs text-sm text-pretty text-fd-muted-foreground">
              {site.tagline}. The passkeys-first, open-source identity platform
              — documentation for developers.
            </p>
            <div className="mt-1 flex items-center gap-3">
              <a
                href={links.githubOrg}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Qeet Group on GitHub"
                className="rounded-md p-2 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
              >
                <GithubIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Link groups */}
          {footerNav.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="flex flex-col gap-3"
            >
              <h2 className="text-sm font-semibold text-fd-foreground">
                {group.title}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href} external={item.external}>
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-fd-border pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-fd-muted-foreground">
            © {new Date().getFullYear()} {site.company}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerMeta.map((item) => (
              <li key={item.label}>
                <FooterLink href={item.href} external={item.external}>
                  {item.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const className =
    "inline-flex items-center gap-1 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
      >
        {children}
        <ArrowUpRight className="size-3 opacity-60" />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
