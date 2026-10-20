import { Badge, buttonVariants } from "@qeetrix/ui";
import {
  ArrowRight,
  Building2,
  Check,
  Fingerprint,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { marketingLinks } from "@/config/marketing";
import { cn } from "@/lib/cn";

const decisionNodes = [
  {
    label: "Principal",
    value: "usr_ada",
    detail: "ES256 verified",
    icon: Fingerprint,
  },
  {
    label: "Organization",
    value: "org_acme",
    detail: "Token scoped",
    icon: Building2,
  },
  {
    label: "Permission",
    value: "billing:write",
    detail: "Role + group path",
    icon: KeyRound,
  },
  {
    label: "Decision",
    value: "Allow",
    detail: "Reason included",
    icon: ShieldCheck,
  },
] as const;

/**
 * Product thesis plus a concrete authorization trace. Kept server-rendered so
 * the first impression and primary actions never depend on hydration.
 */
export function Hero() {
  return (
    <section
      id="main-content"
      tabIndex={-1}
      className="qid-hero relative isolate overflow-hidden border-b border-border/70"
    >
      <div aria-hidden className="qid-aurora -z-20" />
      <div aria-hidden className="qid-hero-grid absolute inset-0 -z-10" />
      <Container size="full" className="relative pt-10 pb-4 sm:py-18 lg:py-22">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(34rem,1.18fr)] lg:items-end lg:gap-14">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="h-7 rounded-md border-brand-500/30 bg-background/80 px-2.5 text-brand-text"
              >
                Developer documentation
              </Badge>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="size-1.5 bg-amber-500" aria-hidden />
                0.1 developer preview
              </span>
            </div>

            <h1 className="mt-7 max-w-3xl text-balance font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-brand-text">Qeet ID.</span> Identity,
              proven.
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-7 sm:text-xl">
              Build authentication, tenant-scoped authorization, enterprise
              federation, and verifiable audit trails from one open identity
              platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={marketingLinks.getStarted}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "qid-button-primary group min-h-11 rounded-md px-5",
                )}
              >
                Start with Go
                <span className="qid-button-icon flex size-7 items-center justify-center rounded-sm transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
              <Link
                href="/docs/architecture"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "qid-button-secondary min-h-11 rounded-md px-5",
                )}
              >
                Review the architecture
              </Link>
            </div>

            <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
              <Check
                className="mt-0.5 size-4 shrink-0 text-fd-success"
                aria-hidden
              />
              Go is available now. Node and React are documented source previews
              until their npm releases are verifiable.
            </p>
          </div>

          <div className="relative min-w-0">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 opacity-70 blur-2xl [background:radial-gradient(60%_55%_at_62%_12%,color-mix(in_oklab,var(--brand-500)_18%,transparent),transparent_70%)]"
            />
            <DecisionTrace />
          </div>
        </div>

        <div className="mt-9 grid grid-cols-3 border-y border-border/70 bg-background/65 sm:mt-12 lg:mt-16">
          <HeroFact label="Deployment" value="Managed service" />
          <HeroFact label="Standards" value="OAuth 2.1 · OIDC · SAML · SCIM" />
          <HeroFact label="Audit" value="Tamper-evident chain" />
        </div>
      </Container>
    </section>
  );
}

function DecisionTrace() {
  return (
    <figure
      className="qid-card qid-trace relative min-w-0 overflow-hidden rounded-lg border p-1.5"
      aria-labelledby="decision-trace-title"
    >
      <div className="rounded-[calc(var(--radius)-2px)] border border-border/70 bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-5">
          <div>
            <p
              id="decision-trace-title"
              className="text-sm font-semibold text-foreground"
            >
              Example authorization trace
            </p>
            <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block">
              One request, every trust boundary visible
            </p>
          </div>
          <span className="inline-flex min-h-7 items-center gap-2 rounded-sm bg-fd-success/10 px-2.5 font-mono text-[0.7rem] font-semibold text-fd-success">
            <span className="size-1.5 bg-fd-success" aria-hidden />
            <span className="sm:hidden">ALLOW</span>
            <span className="hidden sm:inline">DECISION COMPLETE</span>
          </span>
        </div>

        <div className="relative grid grid-cols-2 gap-px bg-border/70 xl:grid-cols-4">
          {decisionNodes.map((node, index) => (
            <div
              key={node.label}
              className="relative min-w-0 bg-card px-3 py-3 sm:px-5 sm:py-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground sm:size-8">
                  <node.icon className="size-4" aria-hidden />
                </span>
                <span className="font-mono text-[0.65rem] text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-3 text-[0.68rem] font-medium text-muted-foreground sm:mt-5 sm:text-xs">
                {node.label}
              </p>
              <p
                className={cn(
                  "mt-1 truncate font-mono text-xs font-semibold sm:text-sm",
                  node.label === "Decision" && "text-fd-success",
                )}
              >
                {node.value}
              </p>
              <p className="mt-2 hidden text-xs text-muted-foreground sm:block">
                {node.detail}
              </p>
            </div>
          ))}
          <div
            aria-hidden
            className="qid-trace-signal absolute inset-x-0 top-0 h-px"
          />
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-t border-border/70 bg-muted/25 px-3 py-3 font-mono text-[0.68rem] sm:grid-cols-[auto_1fr_auto] sm:px-5 sm:py-4 sm:text-xs">
          <span className="hidden text-muted-foreground sm:inline">
            grant_path
          </span>
          <span className="min-w-0 truncate text-foreground">
            group:finance → role:admin → billing:write
          </span>
          <span className="w-fit rounded-sm bg-fd-success/10 px-2 py-1 font-semibold text-fd-success">
            allow
          </span>
        </div>
      </div>
      <figcaption className="sr-only">
        An example Qeet ID authorization decision verifies a principal, scopes
        the request to an organization, resolves the billing write permission,
        and returns an allow decision with the complete grant path.
      </figcaption>
    </figure>
  );
}

function HeroFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-border/70 px-2 py-3 last:border-r-0 sm:px-5 sm:py-4">
      <span className="text-[0.65rem] text-muted-foreground sm:text-xs">
        {label}
      </span>
      <p className="mt-1 text-[0.68rem] font-medium leading-snug text-foreground sm:text-sm">
        {value}
      </p>
    </div>
  );
}
