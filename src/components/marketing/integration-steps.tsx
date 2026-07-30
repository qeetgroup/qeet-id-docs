import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { integrationSteps } from "@/config/marketing";

/**
 * The actual enterprise adoption sequence, from architecture review to
 * operated evidence. The order is meaningful, so a numbered timeline is used.
 */
export function IntegrationSteps() {
  return (
    <section
      id="rollout"
      className="border-y border-border/70 bg-muted/20 py-18 sm:py-24"
    >
      <Container size="wide">
        <Reveal className="max-w-3xl">
          <Eyebrow>Rollout</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            From evaluation to operated identity.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Enterprise identity is not complete at first login. Treat rollout as
            a sequence of boundaries, controls and evidence.
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <ol className="relative mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
            {integrationSteps.map((step, i) => (
              <li
                key={step.title}
                className="qid-card relative min-h-60 p-6 sm:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-semibold text-brand-text">
                    PHASE {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {i + 1}/4
                  </span>
                </div>
                <div className="mt-16">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
