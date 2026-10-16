"use client";

import { RefreshCwIcon } from "@qeetrix/icons";
import { buttonVariants, cn } from "@qeetrix/ui";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { container } from "@/lib/layout.shared";
import { links } from "@/lib/site-links";

/** A route that failed to render: the not-found page's shell, with a retry. */
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="docs-shell flex flex-1 flex-col">
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className={cn(
          container,
          "flex flex-1 flex-col items-center justify-center gap-6 py-24 text-center",
        )}
      >
        <p className="font-mono text-label text-muted-foreground">Error</p>
        <h1 className="font-display text-title font-bold text-balance text-foreground">
          This page couldn&apos;t be shown
        </h1>
        <p className="max-w-md text-body text-muted-foreground">
          Try it once more. If it fails again, start from the documentation and
          report the URL to support.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className={buttonVariants()}>
            <RefreshCwIcon data-icon="inline-start" aria-hidden />
            Try again
          </button>
          <Link
            href={links.docs}
            className={buttonVariants({ variant: "outline" })}
          >
            Documentation
          </Link>
        </div>
      </main>
    </div>
  );
}
