import { Badge, Card } from "@qeetrix/ui";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CopyButton } from "@/components/ui/copy-button";
import { GradientText } from "@/components/ui/gradient-text";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section";
import { sdks } from "@/config/marketing";
import { highlight } from "@/lib/highlight";

/**
 * SdkSection — one card per official SDK (Node, React, Go) with a copyable
 * install command and a Shiki-highlighted usage snippet. Server component:
 * snippets are highlighted at build time.
 */
export async function SdkSection() {
  const rendered = await Promise.all(
    sdks.map(async (sdk) => ({
      ...sdk,
      html: await highlight(sdk.snippet, sdk.lang),
    })),
  );

  return (
    <section id="sdks" className="py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          eyebrow="SDKs"
          title={
            <>
              Drop in the <GradientText>SDK</GradientText> for your stack
            </>
          }
          description="Typed, ergonomic clients that wrap the API — install, configure, and you're authenticating."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {rendered.map((sdk, i) => (
            <Reveal key={sdk.pkg} delay={i * 0.06}>
              <Card className="flex h-full flex-col p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold tracking-tight">{sdk.name}</h3>
                  <Badge variant="muted" className="font-mono text-[0.65rem]">
                    {sdk.pkg}
                  </Badge>
                </div>

                <div className="mt-3 flex items-center gap-2 rounded-md border border-border bg-muted/40 py-1 pr-1 pl-3">
                  <code className="flex-1 truncate font-mono text-xs text-muted-foreground">
                    {sdk.install}
                  </code>
                  <CopyButton
                    value={sdk.install}
                    label={`Copy install command for ${sdk.name}`}
                  />
                </div>

                <div
                  className="qid-shiki mt-4 flex-1 overflow-hidden rounded-lg border border-border bg-muted/30 text-left"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: build-time Shiki output from trusted strings.
                  dangerouslySetInnerHTML={{ __html: sdk.html }}
                />

                <Link
                  href={sdk.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-text hover:underline"
                >
                  Read the {sdk.name} docs
                  <ArrowRight className="size-3.5" />
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
