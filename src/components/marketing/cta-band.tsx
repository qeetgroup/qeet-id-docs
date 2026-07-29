import { buttonVariants } from "@qeetrix/ui";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/brand/icons";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { marketingLinks } from "@/config/marketing";
import { cn } from "@/lib/cn";

/**
 * CtaBand — the closing call to action. A brand-glowing panel that mirrors the
 * hero's CTAs, giving visitors a final, obvious next step.
 */
export function CtaBand() {
  return (
    <section className="pb-24 sm:pb-32">
      <Container size="wide">
        <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-1/2 -z-10 h-full bg-brand-glow"
          />
          <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Start building on <GradientText>Qeet ID</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Read the quickstart, wire up an SDK, and authenticate your first
            user today. Open source, self-hostable, and free to start.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={marketingLinks.getStarted}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "text-white",
              )}
            >
              Get started
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={marketingLinks.github}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <GithubIcon className="size-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
