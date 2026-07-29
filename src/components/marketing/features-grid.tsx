import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { GradientText } from "@/components/ui/gradient-text";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section";
import { features } from "@/config/marketing";

/**
 * FeaturesGrid — the full capabilities matrix (auth methods, orgs,
 * multi-tenancy, SSO/SAML/SCIM, RBAC, audit …) rendered as a responsive grid
 * of `FeatureCard`s with a staggered scroll reveal.
 */
export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          eyebrow="Platform"
          title={
            <>
              Everything identity, <GradientText>nothing gated</GradientText>
            </>
          }
          description="From passkeys to SCIM, every capability enterprises expect is part of the core — not a line item on an upgrade quote."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 0.05}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
