import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { Terminal, type TerminalLine } from "@/components/ui/terminal";

const terminalLines: TerminalLine[] = [
  { type: "comment", text: "# Install the client for your stack" },
  { type: "command", text: "bun add @qeet-id/node" },
  { type: "output", text: "✓ 1 package installed [1.24s]" },
  {
    type: "comment",
    text: "# Zero-config: everything is discovered from the issuer",
  },
  {
    type: "command",
    text: "curl $QEETID_URL/.well-known/openid-configuration",
  },
  {
    type: "output",
    text: '{ "issuer": "…", "jwks_uri": "…", "token_endpoint": "…" }',
  },
  {
    type: "success",
    text: "Ready — verify sessions locally against cached JWKS.",
  },
];

const dxPoints = [
  "Typed SDKs for Node, React and Go — first-class autocomplete.",
  "Local session verification against cached JWKS — no round-trip.",
  "Zero-config discovery: point the SDK at the issuer and go.",
  "Hosted login or fully embedded — your call, same API.",
];

/**
 * DxSection — the developer-experience story, anchored by the animated
 * `Terminal`. Illustrates install → zero-config discovery → local verification.
 */
export function DxSection() {
  return (
    <section id="developer-experience" className="py-20 sm:py-28">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Terminal
            lines={terminalLines}
            title="~/acme-api"
            className="order-last lg:order-first"
          />

          <div>
            <span className="text-sm font-semibold tracking-wide text-brand-text uppercase">
              Developer experience
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Built for the <GradientText>terminal</GradientText>, not the sales
              call
            </h2>
            <p className="mt-4 text-lg text-pretty text-muted-foreground">
              A clean, typed API surface and sensible defaults get you to a
              working integration fast — then stay out of your way.
            </p>
            <ul className="mt-8 space-y-3">
              {dxPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-text" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
