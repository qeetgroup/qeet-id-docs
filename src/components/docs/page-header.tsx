import { StatusPill } from "@qeetrix/ui";
import Link from "next/link";
import type { ReactNode } from "react";
import { SdkMenu } from "@/components/sdk/sdk-menu";
import { productStatus } from "@/lib/shared";

/**
 * The top of every docs page: the section it sits in, the page actions (and, on phones, the SDK
 * menu), the title with the product's release status, and the lead — the page header of every Qeet product's docs, after
 * Qeetrix's (ui.qeet.in), where a component page shows its status in the same place.
 */
export function DocsPageHeader({
  section,
  title,
  description,
  actions,
}: {
  section: { name: string; url: string };
  title: ReactNode;
  description?: ReactNode;
  actions: ReactNode;
}) {
  return (
    <header className="not-prose flex flex-col gap-6 border-b border-border-subtle pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 items-center gap-1.5 text-label text-muted-foreground"
        >
          <Link
            href={section.url}
            className="rounded-sm font-medium text-[var(--qx-color-text-brand)] transition-opacity duration-fast hover:opacity-80 focus-visible:focus-ring"
          >
            {section.name}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {/* The sidebar holds the SDK menu; on phones it is a drawer, so the menu is here too. */}
          <SdkMenu compact className="md:hidden" />
          {actions}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h1 className="font-heading text-title font-semibold tracking-tight text-foreground md:text-[calc(var(--qx-typography-title-font-size)*1.2)]">
            {title}
          </h1>
          <StatusPill kind={productStatus.kind} dot>
            {productStatus.label}
          </StatusPill>
        </div>
        {description ? (
          <p className="max-w-[46rem] text-[calc(var(--qx-typography-body-font-size)*1.2)] leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
