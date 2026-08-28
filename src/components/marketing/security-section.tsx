import { BadgeCheck, CircleAlert, Fingerprint, Link2 } from "lucide-react";
import Link from "next/link";
import { CodeWindow } from "@/components/ui/code-window";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const securityCode = `# Ask for the decision and the complete grant path.
curl --get "$QEETID_BASE_URL/v1/check" \
  -H "Authorization: ApiKey $QEETID_API_KEY" \
  --data-urlencode "user_id=$USER_ID" \
  --data-urlencode "tenant_id=$TENANT_ID" \
  --data-urlencode "permission=billing:write" \
  --data-urlencode "explain=true"

# Independently verify the audit hash chain.
curl "$QEETID_BASE_URL/v1/audit/verify"`;

const assuranceItems = [
  {
    icon: Fingerprint,
    title: "Cryptographic identity",
    description:
      "ES256 signatures are checked against the issuer's cached JWKS before claims enter your request context.",
  },
  {
    icon: Link2,
    title: "Traceable decisions",
    description:
      "RBAC explanations identify the permission, role and direct or group-derived grant path.",
  },
  {
    icon: BadgeCheck,
    title: "Tamper-evident events",
    description:
      "Security events are linked in a SHA-256 chain with a verification endpoint for integrity checks.",
  },
  {
    icon: CircleAlert,
    title: "Limits stated in public",
    description:
      "External attestation, conformance and production-hardening gaps are documented rather than implied.",
  },
] as const;

/**
 * An assurance ledger grounded in current contracts and explicit limitations.
 */
export async function SecuritySection() {
  return (
    <section
      id="security"
      className="border-y border-border/70 bg-card/40 py-18 sm:py-24"
    >
      <Container size="wide">
        <Reveal className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-16">
          <div className="max-w-xl">
            <Eyebrow>Assurance, not adjectives</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Evidence over assurances.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Qeet ID exposes the path behind authorization and the integrity of
              its audit history. Where third-party assurance is incomplete, the
              documentation says so directly.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
              <Link
                href="/docs/security/compliance"
                className="text-brand-text underline-offset-4 hover:underline"
              >
                Read the compliance posture
              </Link>
              <Link
                href="/docs/roadmap"
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Review GA hardening
              </Link>
            </div>
          </div>

          <div className="min-w-0">
            <CodeWindow code={securityCode} lang="bash" filename="verify.sh" />
          </div>
        </Reveal>

        <Reveal
          className="mt-12 grid border-t border-border md:grid-cols-2"
          delayMs={80}
        >
          {assuranceItems.map((item, index) => (
            <article
              key={item.title}
              className={`grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-6 md:px-6 ${
                index % 2 === 0 ? "md:border-r md:pl-0" : "md:pr-0"
              }`}
            >
              <span className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <item.icon className="size-4" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
