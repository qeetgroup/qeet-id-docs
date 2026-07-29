"use client";

import { buttonVariants } from "@qeetrix/ui";
import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 items-center justify-center px-4 py-20"
    >
      <div className="w-full max-w-2xl border-y border-border py-10">
        <p className="text-xs font-semibold text-fd-error">RENDERING FAILED</p>
        <h1 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight">
          The documentation view could not be completed.
        </h1>
        <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Retry the route once. If it fails again, return to the documentation
          index and report the URL through support.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "qid-button-primary min-h-11 rounded-md",
            )}
          >
            <RefreshCw className="size-4" aria-hidden />
            Retry this route
          </button>
          <Link
            href="/docs"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "qid-button-secondary min-h-11 rounded-md",
            )}
          >
            Documentation index
          </Link>
        </div>
      </div>
    </main>
  );
}
