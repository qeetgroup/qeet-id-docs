import { type CodeTab, CodeTabs } from "@/components/ui/code-tabs";
import { Container } from "@/components/ui/container";
import { quickstartSamples } from "@/config/marketing";
import { highlight } from "@/lib/highlight";

/**
 * QuickstartShowcase — the developer code window that sits directly under the
 * hero. Server component: it Shiki-highlights every sample at build time and
 * hands the pre-rendered HTML to the client `CodeTabs` for switching + copy.
 */
export async function QuickstartShowcase() {
  const tabs: CodeTab[] = await Promise.all(
    quickstartSamples.map(async (sample) => ({
      value: sample.value,
      label: sample.label,
      filename: sample.filename,
      code: sample.code,
      html: await highlight(sample.code, sample.lang),
    })),
  );

  return (
    <Container size="content" className="pb-20 sm:pb-28">
      <div className="relative mx-auto max-w-3xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 -top-10 -z-10 h-48 bg-brand-glow opacity-60 blur-2xl"
        />
        <CodeTabs tabs={tabs} />
      </div>
    </Container>
  );
}
