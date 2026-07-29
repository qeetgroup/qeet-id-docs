import type { Metadata } from "next";
import {
  CtaBand,
  DxSection,
  Faq,
  FeaturesGrid,
  Hero,
  IntegrationSteps,
  QuickstartShowcase,
  ReadinessSection,
  SdkSection,
  SecuritySection,
  TrustBar,
} from "@/components/marketing";
import { JsonLd, softwareApplicationSchema } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Developer Documentation",
  path: "/",
});

/**
 * Enterprise documentation home. The sequence moves from product thesis and
 * executable proof through platform domains, role-based reading paths,
 * assurance, release status, rollout and explicit readiness.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd schema={softwareApplicationSchema} />
      <Hero />
      <TrustBar />
      <QuickstartShowcase />
      <FeaturesGrid />
      <DxSection />
      <SecuritySection />
      <SdkSection />
      <IntegrationSteps />
      <ReadinessSection />
      <Faq />
      <CtaBand />
    </>
  );
}
