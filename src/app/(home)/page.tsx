import type { Metadata } from "next";
import {
  CtaBand,
  DxSection,
  Faq,
  FeaturesGrid,
  Hero,
  IntegrationSteps,
  QuickstartShowcase,
  SdkSection,
  SecuritySection,
  Testimonials,
  TrustBar,
} from "@/components/marketing";
import { JsonLd, softwareApplicationSchema } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({ path: "/" });

/**
 * Landing page (Phase 2). Composed entirely from the marketing section
 * components, which are in turn built on Qeetrix primitives + the local
 * design-system helpers. Order tells the story: what → proof → capabilities →
 * security → DX → SDKs → how → social proof → FAQ → final CTA.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd schema={softwareApplicationSchema} />
      <Hero />
      <QuickstartShowcase />
      <TrustBar />
      <FeaturesGrid />
      <SecuritySection />
      <DxSection />
      <SdkSection />
      <IntegrationSteps />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  );
}
