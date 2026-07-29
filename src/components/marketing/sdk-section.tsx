import { Badge } from "@qeetrix/ui";
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock3 } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CopyButton } from "@/components/ui/copy-button";
import { sdkReleases } from "@/config/marketing";

/**
 * SDK release matrix: the available Go path receives the primary surface;
 * source previews link to code without presenting invalid install commands.
 */
export function SdkSection() {
  const [available, ...previews] = sdkReleases;
  if (!available?.install) return null;

  return (
    <section id="sdks" className="py-18 sm:py-24">
      <Container size="wide">
        <div className="max-w-3xl">
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Release status before installation.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every client has documentation and source. Only packages with a
            verifiable release receive an install command.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="qid-featured-card relative flex min-h-80 flex-col overflow-hidden rounded-lg border p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <CheckCircle2 className="size-4" aria-hidden />
                  AVAILABLE NOW
                </div>
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight">
                  {available.name}
                </h3>
                <p className="qid-featured-muted mt-2 font-mono text-sm">
                  {available.pkg}
                </p>
              </div>
              <Badge className="qid-featured-badge rounded-md">
                0.1 preview
              </Badge>
            </div>

            <p className="qid-featured-muted mt-7 max-w-lg text-sm leading-relaxed">
              The executable backend path for local JWT verification,
              tenant-scoped resources and authorization checks.
            </p>

            <div className="mt-auto flex items-center gap-2 rounded-md border border-white/10 bg-white/6 py-2 pr-2 pl-3">
              <code className="min-w-0 flex-1 truncate font-mono text-xs">
                {available.install}
              </code>
              <CopyButton
                value={available.install}
                label="Copy Go install command"
                className="text-white hover:bg-white/10 hover:text-white"
              />
            </div>

            <Link
              href={available.href}
              className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
            >
              Read the Go SDK guide
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </article>

          <div className="grid gap-4">
            {previews.map((sdk) => (
              <article
                key={sdk.pkg}
                className="qid-card flex min-h-38 flex-col rounded-lg border p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <Clock3 className="size-3.5" aria-hidden />
                      SOURCE PREVIEW
                    </div>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight">
                      {sdk.name}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {sdk.pkg}
                    </p>
                  </div>
                  <a
                    href={sdk.repository}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Open ${sdk.name} source repository`}
                    className="flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
                <Link
                  href={sdk.href}
                  className="mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand-text underline-offset-4 hover:underline"
                >
                  Review the intended 0.1 surface
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
