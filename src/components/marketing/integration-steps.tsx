import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section";
import { integrationSteps } from "@/config/marketing";

/**
 * IntegrationSteps — the "how it works" walkthrough: four numbered steps with a
 * connecting rail on large screens. Composed from primitives (marketing layout,
 * so kept custom rather than forcing the interactive Qeetrix Stepper).
 */
export function IntegrationSteps() {
  return (
    <section
      id="how-it-works"
      className="border-t border-border/60 bg-card/30 py-20 sm:py-28"
    >
      <Container size="wide">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Integrated in <GradientText>four steps</GradientText>
            </>
          }
          description="From install to authorized request — the whole path, no detours."
        />

        <ol className="relative mt-14 grid gap-8 lg:grid-cols-4">
          {/* Connecting rail (lg+) */}
          <div
            aria-hidden
            className="absolute top-5 right-0 left-0 hidden h-px bg-linear-to-r from-transparent via-border to-transparent lg:block"
          />
          {integrationSteps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 0.08}
              as="li"
              className="relative"
            >
              <span className="flex size-10 items-center justify-center rounded-full border border-brand-500/30 bg-brand-500/10 font-mono text-sm font-semibold text-brand-text">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
