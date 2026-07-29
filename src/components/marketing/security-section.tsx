import { CodeWindow } from "@/components/ui/code-window";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { Reveal } from "@/components/ui/reveal";
import { securityPoints } from "@/config/marketing";

const securityCode = `# Explainable authorization — returns the exact grant path,
# not just an allow/deny boolean.
curl "$QEETID_URL/v1/permissions/check?explain=true" \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{ "user": "usr_123", "permission": "billing:write" }'

# Provable audit — verify the SHA-256 hash chain.
# Public endpoint, no authentication required.
curl "$QEETID_URL/v1/audit/verify"`;

/**
 * SecuritySection — the trust story: provable audit, explainable authz,
 * BYOK and agent identity, paired with a live-looking API example that shows
 * the two features no researched competitor ships for CIAM.
 */
export async function SecuritySection() {
  return (
    <section
      id="security"
      className="border-t border-border/60 bg-card/30 py-20 sm:py-28"
    >
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold tracking-wide text-brand-text uppercase">
              Security
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Trust, but <GradientText>verify</GradientText> — literally
            </h2>
            <p className="mt-4 text-lg text-pretty text-muted-foreground">
              Most platforms ask you to take their security posture on faith.
              Qeet ID lets you prove it — from every access decision to the
              integrity of the audit log itself.
            </p>

            <ul className="mt-8 space-y-6">
              {securityPoints.map((point) => (
                <li key={point.title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-text">
                    <point.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Reveal direction="left">
            <CodeWindow code={securityCode} lang="bash" filename="verify.sh" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
