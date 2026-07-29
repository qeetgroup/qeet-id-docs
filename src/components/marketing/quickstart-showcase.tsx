import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { CodeWindow } from "@/components/ui/code-window";
import { Container } from "@/components/ui/container";

const quickstartCode = `client := qeetid.New(qeetid.Config{
  APIKey:  os.Getenv("QEETID_API_KEY"),
  BaseURL: os.Getenv("QEETID_BASE_URL"),
})

claims, err := client.Sessions.Verify(ctx, token)
if err != nil { return err }

allowed, err := client.Permissions.Check(ctx, qeetid.PermissionCheck{
  User: claims.UserID,
  Tenant: claims.TenantID,
  Permission: "billing:write",
})`;

/**
 * First executable integration: available Go module, real configuration, and
 * the complete session-to-authorization path.
 */
export async function QuickstartShowcase() {
  return (
    <section id="quickstart" className="py-18 sm:py-24">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold text-brand-text">
              AVAILABLE NOW · GO
            </p>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              From bearer token to decision in one handler.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Verify ES256 sessions locally against cached JWKS, then authorize
              against the organization carried by the token. No identity lookup
              on the request hot path.
            </p>

            <ul className="mt-7 space-y-3 text-sm text-muted-foreground">
              <QuickstartPoint text="Published Go module with idiomatic context-aware methods" />
              <QuickstartPoint text="Local token verification after the JWKS is cached" />
              <QuickstartPoint text="Tenant-scoped checks with explainable grant paths" />
            </ul>

            <Link
              href="/docs/getting-started/quickstart"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-brand-text underline-offset-4 hover:underline"
            >
              Open the executable quickstart
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="relative min-w-0">
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-lg border border-brand-500/10"
            />
            <CodeWindow code={quickstartCode} lang="go" filename="handler.go" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function QuickstartPoint({ text }: { text: string }) {
  return (
    <li className="flex gap-3">
      <CheckCircle2
        className="mt-0.5 size-4 shrink-0 text-fd-success"
        aria-hidden
      />
      {text}
    </li>
  );
}
