/**
 * Landing-page content model. All copy, feature data, code samples, SDK cards,
 * steps, testimonials and FAQ live here as data so the marketing components
 * stay presentational and the messaging is edited in one place.
 *
 * Code samples are illustrative usage taken from the local SDK repos
 * (`qeet-id-node`, `qeet-id-react`, `qeet-id-go`) — the SDKs are not yet
 * published; these show the intended developer experience.
 */
import {
  IconApiKey,
  IconAuditLog,
  IconCrossDevice,
  IconMfaShield,
  IconOidcConnector,
  IconPasskey,
  IconSamlConnector,
  IconScimSync,
} from "@qeetrix/ui/brand";
import {
  Boxes,
  Building2,
  Fingerprint,
  Globe,
  Palette,
  ShieldCheck,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { CodeLang } from "@/lib/highlight";
import { links } from "./site";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

/* -------------------------------------------------------------------------- */
/* Hero trust strip                                                           */
/* -------------------------------------------------------------------------- */

export const trustChips: string[] = [
  "Open source · MIT",
  "Self-hostable",
  "No per-MAU fee",
  "No SSO tax",
  "OAuth 2.1 · OIDC · SAML",
];

/** Products in the Qeet Group suite that authenticate through Qeet ID. */
export const suiteProducts: string[] = [
  "Qeet Pay",
  "Qeet Notify",
  "Qeet Logs",
  "Qeet People",
  "Qeet AI",
  "Qeetrix",
];

/* -------------------------------------------------------------------------- */
/* Quickstart showcase (tabbed code window in the hero)                       */
/* -------------------------------------------------------------------------- */

export interface CodeSample {
  value: string;
  label: string;
  filename: string;
  lang: CodeLang;
  code: string;
}

export const quickstartSamples: CodeSample[] = [
  {
    value: "install",
    label: "Install",
    filename: "terminal",
    lang: "bash",
    code: `# Node / TypeScript
bun add @qeet-id/node

# React
bun add @qeet-id/react

# Go
go get github.com/qeetgroup/qeet-id-go`,
  },
  {
    value: "node",
    label: "Node",
    filename: "server.ts",
    lang: "ts",
    code: `import { QeetID } from "@qeet-id/node";

const client = new QeetID({ apiKey: process.env.QEETID_API_KEY! });

// Verify a session token locally against cached JWKS.
const claims = await client.sessions.verify(token);

// Ask an explainable authorization question.
const allowed = await client.permissions.check({
  user: claims.userId!,
  tenant: claims.tenantId!,
  permission: "billing:write",
});`,
  },
  {
    value: "react",
    label: "React",
    filename: "App.tsx",
    lang: "tsx",
    code: `import {
  QeetIDProvider,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@qeet-id/react";

export function App() {
  return (
    <QeetIDProvider loginUrl="/api/auth/login" logoutUrl="/api/auth/logout">
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </QeetIDProvider>
  );
}`,
  },
  {
    value: "go",
    label: "Go",
    filename: "main.go",
    lang: "go",
    code: `client := qeetid.New(qeetid.Config{
	APIKey: os.Getenv("QEETID_API_KEY"),
})

claims, err := client.Sessions.Verify(ctx, token)

allowed, err := client.Permissions.Check(ctx, qeetid.PermissionCheck{
	User:       claims.UserID,
	Tenant:     claims.TenantID,
	Permission: "billing:write",
})`,
  },
];

/* -------------------------------------------------------------------------- */
/* Capabilities grid                                                          */
/* -------------------------------------------------------------------------- */

export interface Feature {
  icon: IconType;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: IconPasskey,
    title: "Passkeys & WebAuthn",
    description:
      "Phishing-resistant passkeys as a first-class credential, with cross-device sync support.",
  },
  {
    icon: IconMfaShield,
    title: "Multi-factor auth",
    description:
      "TOTP, WebAuthn and recovery codes with per-tenant step-up policies.",
  },
  {
    icon: IconOidcConnector,
    title: "OAuth 2.1 & OIDC",
    description:
      "A conformant OpenID provider — every Qeet Group product is a relying party.",
  },
  {
    icon: IconSamlConnector,
    title: "Enterprise SSO (SAML)",
    description:
      "SAML 2.0 SSO in the core, never behind an enterprise paywall.",
  },
  {
    icon: IconScimSync,
    title: "SCIM provisioning",
    description:
      "Automated user and group lifecycle sync from your customers' IdPs.",
  },
  {
    icon: Building2,
    title: "Organizations",
    description:
      "Model teams, memberships, invitations and per-org roles out of the box.",
  },
  {
    icon: Boxes,
    title: "Multi-tenancy",
    description:
      "Every record is tenant-scoped, with Postgres row-level isolation in progress.",
  },
  {
    icon: ShieldCheck,
    title: "RBAC & permissions",
    description:
      "Roles, permissions and grant-path explanations you can trace with ?explain.",
  },
  {
    icon: Fingerprint,
    title: "Sessions & tokens",
    description:
      "Refresh rotation, device sessions and short-lived tokens for agents.",
  },
  {
    icon: IconAuditLog,
    title: "Audit logs",
    description:
      "A SHA-256 hash-chained log with a public endpoint to verify integrity.",
  },
  {
    icon: Palette,
    title: "Branding",
    description:
      "Themeable hosted login and emails via the shared Qeetrix design system.",
  },
  {
    icon: Globe,
    title: "Custom domains",
    description: "Serve auth on your own domain with managed certificates.",
  },
];

/* -------------------------------------------------------------------------- */
/* Security pillars                                                           */
/* -------------------------------------------------------------------------- */

export interface SecurityPoint {
  icon: IconType;
  title: string;
  description: string;
}

export const securityPoints: SecurityPoint[] = [
  {
    icon: IconAuditLog,
    title: "Provable audit trail",
    description:
      "Every security event is chained with SHA-256. A public /verify endpoint lets anyone prove the log was never altered — no peer ships this for CIAM.",
  },
  {
    icon: ShieldCheck,
    title: "Explainable authorization",
    description:
      "Ask why a decision was made. RBAC returns the exact grant path with ?explain=true, so access reviews and debugging stop being guesswork.",
  },
  {
    icon: IconApiKey,
    title: "Keys you control",
    description:
      "Bring-your-own-key encryption and per-tenant data residency for the managed tier; run the whole stack yourself under MIT.",
  },
  {
    icon: IconCrossDevice,
    title: "Agent & machine identity",
    description:
      "Ephemeral tokens, RFC 8693 delegation and a tenant-wide kill-switch for AI agents and service-to-service auth.",
  },
];

/* -------------------------------------------------------------------------- */
/* SDKs                                                                       */
/* -------------------------------------------------------------------------- */

export interface Sdk {
  name: string;
  pkg: string;
  install: string;
  lang: CodeLang;
  snippet: string;
  href: string;
}

export const sdks: Sdk[] = [
  {
    name: "Node & TypeScript",
    pkg: "@qeet-id/node",
    install: "bun add @qeet-id/node",
    lang: "ts",
    href: "/docs/sdks/node",
    snippet: `import { QeetID } from "@qeet-id/node";

const client = new QeetID({ apiKey: process.env.QEETID_API_KEY! });
const claims = await client.sessions.verify(token);`,
  },
  {
    name: "React",
    pkg: "@qeet-id/react",
    install: "bun add @qeet-id/react",
    lang: "tsx",
    href: "/docs/sdks/react",
    snippet: `import { SignedIn, useUser } from "@qeet-id/react";

const { user } = useUser();
// <SignedIn>…</SignedIn> guards protected UI`,
  },
  {
    name: "Go",
    pkg: "qeet-id-go",
    install: "go get github.com/qeetgroup/qeet-id-go",
    lang: "go",
    href: "/docs/sdks/go",
    snippet: `client := qeetid.New(qeetid.Config{
	APIKey: os.Getenv("QEETID_API_KEY"),
})
claims, err := client.Sessions.Verify(ctx, token)`,
  },
];

/* -------------------------------------------------------------------------- */
/* Integration steps                                                          */
/* -------------------------------------------------------------------------- */

export interface Step {
  title: string;
  description: string;
}

export const integrationSteps: Step[] = [
  {
    title: "Install the SDK",
    description:
      "Add the client for your stack — Node, React or Go — with a single command.",
  },
  {
    title: "Configure your tenant",
    description:
      "Create an application in the console and drop your API key into the environment.",
  },
  {
    title: "Authenticate users",
    description:
      "Redirect to hosted login or embed the flow. Passkeys, MFA and SSO work day one.",
  },
  {
    title: "Authorize every request",
    description:
      "Verify sessions locally and check permissions with explainable RBAC.",
  },
];

/* -------------------------------------------------------------------------- */
/* Testimonials (placeholder data)                                            */
/* -------------------------------------------------------------------------- */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

/** Placeholder social proof — replace with real quotes before GA. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "We replaced a per-MAU vendor and shipped SAML and SCIM for our first enterprise customer in a weekend. The no-SSO-tax model paid for itself immediately.",
    name: "A. Rao",
    role: "Staff Engineer, Platform",
  },
  {
    quote:
      "The explainable authorization is the feature I didn't know I needed. Access reviews used to take days of spelunking; now it's one query.",
    name: "M. Fischer",
    role: "Security Engineer",
  },
  {
    quote:
      "Self-hosting was genuinely a single Terraform apply, and the audit-chain verification satisfied our compliance team on the first call.",
    name: "J. Okafor",
    role: "Head of Infrastructure",
  },
];

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "Is Qeet ID open source?",
    answer:
      "Yes. The core is MIT-licensed and fully self-hostable. A managed cloud tier adds support, SLAs, BYOK and data-residency — but the identity engine itself is free forever.",
  },
  {
    question: "What does “no SSO tax” actually mean?",
    answer:
      "SAML SSO, SCIM provisioning, LDAP and RBAC are part of the core product, not an enterprise upsell. You are never charged a premium simply to connect an enterprise identity provider.",
  },
  {
    question: "How is Qeet ID priced?",
    answer:
      "There is no per-monthly-active-user fee. The open-source core is free; the managed cloud uses flat-rate plans. You scale users without watching a meter.",
  },
  {
    question: "What makes the audit log “provable”?",
    answer:
      "Every event is linked into a SHA-256 hash chain, so any tampering breaks the chain. A public, unauthenticated /verify endpoint lets anyone confirm the log's integrity independently.",
  },
  {
    question: "Where does the API reference live?",
    answer:
      "The complete OpenAPI reference is served separately in Scalar and linked from the top navigation. This portal is the conceptual and how-to documentation.",
  },
  {
    question: "Is it production-ready today?",
    answer:
      "Qeet ID is in active developer preview. The architecture, SDKs and console are usable now; follow the roadmap for the path to general availability.",
  },
];

/** Convenience: the primary outbound links used across CTAs. */
export const marketingLinks = {
  getStarted: "/docs",
  apiReference: links.apiReference,
  github: links.githubOrg,
} as const;
