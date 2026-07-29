import { buttonVariants } from "@qeetrix/ui";
import { ArrowLeft, BookOpen, Search } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 items-center py-20 sm:py-28"
    >
      <Container size="content">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:items-end">
          <div className="font-mono text-[clamp(5rem,16vw,11rem)] font-semibold leading-none text-brand-500/20">
            404
          </div>
          <div className="max-w-xl border-t border-border pt-7">
            <p className="text-xs font-semibold text-brand-text">
              DOCUMENT NOT FOUND
            </p>
            <h1 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              This route is outside the current documentation map.
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
              Search the indexed docs, return to the documentation home, or use
              the quickstart to enter through a maintained path.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/docs"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "qid-button-primary min-h-11 rounded-md",
                )}
              >
                <BookOpen className="size-4" aria-hidden />
                Browse documentation
              </Link>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "qid-button-secondary min-h-11 rounded-md",
                )}
              >
                <ArrowLeft className="size-4" aria-hidden />
                Return home
              </Link>
            </div>
            <p className="mt-7 flex items-center gap-2 text-sm text-muted-foreground">
              <Search className="size-4" aria-hidden />
              Press{" "}
              <kbd className="rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
                ⌘ K
              </kbd>{" "}
              to search from any maintained page.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
