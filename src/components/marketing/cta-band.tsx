import { buttonVariants } from "@qeetrix/ui";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { marketingLinks } from "@/config/marketing";
import { cn } from "@/lib/cn";

/**
 * CtaBand — the closing call to action. A brand-glowing panel that mirrors the
 * hero's CTAs, giving visitors a final, obvious next step.
 */
export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden border-y border-border bg-muted/25 py-18 sm:py-24">
      <div aria-hidden className="qid-cta-grid absolute inset-0 -z-10" />
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <h2 className="max-w-3xl text-balance font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Begin with the path that works today.
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Install the Go module, verify a session, and enforce a
              tenant-scoped permission before expanding the identity surface.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href={marketingLinks.getStarted}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "min-h-11 rounded-md px-5 text-primary-foreground active:scale-[0.98]",
              )}
            >
              Open the Go quickstart
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href={marketingLinks.apiReference}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-h-11 rounded-md px-5 active:scale-[0.98]",
              )}
            >
              Open the API reference
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
