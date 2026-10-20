import { ArrowRight, Braces, Building2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const journeys = [
  {
    role: "Builder",
    icon: Braces,
    description: "Move from a verified token to an enforced permission check.",
    links: [
      ["Go quickstart", "/docs/getting-started/quickstart"],
      ["Session middleware", "/docs/guides/verify-sessions-in-go"],
      ["SDK release status", "/docs/sdks"],
    ],
  },
  {
    role: "Architect",
    icon: Building2,
    description:
      "Model organizations, federation and policy boundaries before rollout.",
    links: [
      ["Core concepts", "/docs/concepts"],
      ["System architecture", "/docs/architecture"],
      ["Authorization models", "/docs/authorization"],
    ],
  },
  {
    role: "Security reviewer",
    icon: ShieldCheck,
    description:
      "Inspect controls, evidence, current limits and the architecture.",
    links: [
      ["Security posture", "/docs/security"],
      ["Compliance evidence", "/docs/security/compliance"],
      ["Architecture", "/docs/architecture"],
    ],
  },
] as const;

/**
 * Job-based entry points replace a decorative terminal with direct routes to
 * the decisions builders, architects and security reviewers need to make.
 */
export function DxSection() {
  return (
    <section id="documentation-paths" className="py-18 sm:py-24">
      <Container size="wide">
        <Reveal className="max-w-3xl">
          <Eyebrow>Choose your path</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Enter the docs from the decision you own.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            The same platform reads differently when you are shipping code,
            defining the trust model, or reviewing operational risk. Pick the
            track that matches your job and follow it end to end.
          </p>
        </Reveal>

        <Reveal
          className="mt-12 divide-y divide-border border-y border-border"
          delayMs={80}
        >
          {journeys.map((journey) => (
            <article
              key={journey.role}
              className="grid gap-6 py-7 md:grid-cols-[12rem_minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-start md:gap-10"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <journey.icon className="size-4" aria-hidden />
                </span>
                <h3 className="font-semibold tracking-tight">{journey.role}</h3>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                {journey.description}
              </p>
              <ul className="grid gap-2 sm:grid-cols-3">
                {journey.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group flex min-h-11 items-center justify-between gap-3 rounded-md px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {label}
                      <ArrowRight
                        className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
