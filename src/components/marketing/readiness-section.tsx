import { CheckCircle2, CircleOff, Construction } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { readinessGroups } from "@/config/marketing";
import { cn } from "@/lib/cn";

const tone = {
  available: {
    icon: CheckCircle2,
    className: "border-t-fd-success",
    iconClassName: "text-fd-success",
  },
  hardening: {
    icon: Construction,
    className: "border-t-amber-500",
    iconClassName: "text-amber-600 dark:text-amber-400",
  },
  "not-claimed": {
    icon: CircleOff,
    className: "border-t-muted-foreground",
    iconClassName: "text-muted-foreground",
  },
} as const;

/** Public release posture grounded in evidence available in the docs today. */
export function ReadinessSection() {
  return (
    <section id="readiness" className="py-18 sm:py-24">
      <Container size="wide">
        <Reveal className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Release posture</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Release posture, without euphemisms.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Preview software should make its boundaries inspectable. This
              ledger separates available paths, GA hardening and assurances that
              are explicitly not claimed.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
              <Link
                href="/docs/roadmap"
                className="text-brand-text underline-offset-4 hover:underline"
              >
                Review the roadmap
              </Link>
              <Link
                href="/docs/security/compliance"
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Read current compliance posture
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12 grid gap-6 md:grid-cols-3" delayMs={80}>
          {readinessGroups.map((group) => {
            const style = tone[group.tone];
            const Icon = style.icon;
            return (
              <article
                key={group.title}
                className={cn("border-t-2 pt-6", style.className)}
              >
                <Icon
                  className={cn("size-5", style.iconClassName)}
                  aria-hidden
                />
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {group.title}
                </h3>
                <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted-foreground">
                  {group.description}
                </p>
                <ul className="mt-6 space-y-3 border-t border-border pt-5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-muted-foreground"
                    >
                      <span
                        className="mt-2 size-1 shrink-0 bg-current"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
