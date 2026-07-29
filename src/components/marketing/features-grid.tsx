import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { capabilityGroups } from "@/config/marketing";
import { cn } from "@/lib/cn";

/**
 * Five capability domains with deliberate hierarchy. Each cell is real
 * navigation, so hover and focus affordances communicate an available action.
 */
export function FeaturesGrid() {
  return (
    <section
      id="platform"
      className="border-y border-border/70 bg-muted/15 py-18 sm:py-24"
    >
      <Container size="wide">
        <div className="max-w-3xl">
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            One identity plane, five operational domains.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Follow the domain you own. Each path connects its mental model,
            implementation guidance, security posture and live API contract.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {capabilityGroups.map((capability, index) => (
            <Link
              key={capability.title}
              href={capability.href}
              className={cn(
                "group relative flex min-h-72 flex-col overflow-hidden rounded-lg border border-border bg-card p-6 transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:p-7",
                index === 0 && "lg:col-span-7 lg:min-h-80",
                index === 1 && "bg-brand-500/5 lg:col-span-5 lg:min-h-80",
                index === 2 && "lg:col-span-5",
                index === 3 && "bg-muted/30 lg:col-span-7",
                index === 4 &&
                  "lg:col-span-12 lg:min-h-0 lg:flex-row lg:items-end lg:gap-12",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-10 items-center justify-center rounded-md bg-brand-500/10 text-brand-text">
                  <capability.icon className="size-5" aria-hidden />
                </span>
                <ArrowUpRight
                  className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-text"
                  aria-hidden
                />
              </div>

              <div
                className={cn(
                  "mt-auto pt-10",
                  index === 4 && "lg:max-w-xl lg:pt-0",
                )}
              >
                <p className="text-xs font-medium text-brand-text">
                  {capability.status}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                  {capability.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {capability.description}
                </p>
              </div>

              <ul
                className={cn(
                  "mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-border/70 pt-5",
                  index === 4 &&
                    "lg:ml-auto lg:w-[42%] lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8",
                )}
              >
                {capability.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <span className="size-1 bg-brand-500" aria-hidden />
                    {detail}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
