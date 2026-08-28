import { Container } from "@/components/ui/container";

const standards = [
  "WebAuthn",
  "OAuth 2.1",
  "OpenID Connect",
  "SAML 2.0",
  "SCIM 2.0",
  "AuthZEN",
  "JWT / JWKS",
] as const;

/**
 * Static standards rail: scannable, honest, and safe at every viewport width.
 */
export function TrustBar() {
  return (
    <section
      aria-label="Supported identity standards"
      className="border-b border-border/70 bg-muted/20"
    >
      <Container
        size="full"
        className="grid gap-5 py-5 lg:grid-cols-[13rem_1fr] lg:items-center"
      >
        <div>
          <p className="text-xs font-semibold text-foreground">
            Open by protocol
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            No proprietary identity dialect
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 lg:justify-end">
          {standards.map((standard) => (
            <li
              key={standard}
              className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
            >
              <span className="size-1 bg-brand-500" aria-hidden />
              {standard}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
