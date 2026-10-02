import {
  IconAuditLog,
  IconPasskey,
  IconSamlConnector,
} from "@qeetrix/ui/brand";
import { Boxes, ShieldCheck } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { githubUrl, links } from "./site";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface CapabilityGroup {
  icon: IconType;
  title: string;
  description: string;
  details: string[];
  href: string;
  status: string;
}

/** Grouped platform narrative used by the enterprise homepage. */
export const capabilityGroups: CapabilityGroup[] = [
  {
    icon: IconPasskey,
    title: "Authentication",
    description:
      "Passkeys, sessions, MFA and standards-based federation share one identity lifecycle.",
    details: ["WebAuthn", "OAuth 2.1", "OIDC", "Session rotation"],
    href: "/docs/authentication",
    status: "Developer preview",
  },
  {
    icon: ShieldCheck,
    title: "Authorization",
    description:
      "Answer whether access is allowed and return the exact path that produced the decision.",
    details: ["RBAC", "ReBAC", "AuthZEN", "Grant-path explanations"],
    href: "/docs/authorization",
    status: "Explainable by design",
  },
  {
    icon: IconSamlConnector,
    title: "Enterprise federation",
    description:
      "Connect workforce identity and directory lifecycle without changing your application model.",
    details: ["SAML 2.0", "SCIM 2.0", "LDAP", "Verified domains"],
    href: "/docs/authentication/enterprise-sso",
    status: "Enterprise surface",
  },
  {
    icon: IconAuditLog,
    title: "Audit & assurance",
    description:
      "Hash-chain security events and inspect the controls Qeet ID can prove today.",
    details: [
      "SHA-256 chain",
      "Public verification",
      "Evidence snapshots",
      "SIEM export",
    ],
    href: "/docs/audit-logs",
    status: "Verifiable evidence",
  },
  {
    icon: Boxes,
    title: "Deployment control",
    description:
      "Run the same modular Go service as a managed platform or inside infrastructure you control.",
    details: ["PostgreSQL", "Terraform reference", "Optional Redis + NATS"],
    href: "/docs/architecture/self-hosting",
    status: "Managed or self-hosted",
  },
];

export interface SdkRelease {
  name: string;
  pkg: string;
  status: "available" | "source-preview";
  install?: string;
  repository: string;
  href: string;
}

export const sdkReleases: SdkRelease[] = [
  {
    name: "Go",
    pkg: "qeet-id-go",
    status: "available",
    install: "go get github.com/qeetgroup/qeet-id-go",
    repository: "https://github.com/qeetgroup/qeet-id-go",
    href: "/docs/sdks/go",
  },
  {
    name: "Node & TypeScript",
    pkg: "@qeet-id/node",
    status: "source-preview",
    repository: "https://github.com/qeetgroup/qeet-id-node",
    href: "/docs/sdks/node",
  },
  {
    name: "React",
    pkg: "@qeet-id/react",
    status: "source-preview",
    repository: "https://github.com/qeetgroup/qeet-id-react",
    href: "/docs/sdks/react",
  },
];

export interface Step {
  title: string;
  description: string;
}

export const integrationSteps: Step[] = [
  {
    title: "Evaluate the boundaries",
    description:
      "Review the organization model, token lifecycle and deployment topology before choosing a flow.",
  },
  {
    title: "Integrate the available path",
    description:
      "Use the Go module or the HTTP contract in Scalar, then verify sessions locally.",
  },
  {
    title: "Harden tenant controls",
    description:
      "Configure federation, MFA, roles, key management and domain ownership for the organization.",
  },
  {
    title: "Operate with evidence",
    description:
      "Monitor decisions, verify the audit chain, export evidence and rehearse revocation before rollout.",
  },
];

export interface ReadinessGroup {
  title: string;
  description: string;
  items: string[];
  tone: "available" | "hardening" | "not-claimed";
}

export const readinessGroups: ReadinessGroup[] = [
  {
    title: "Available in preview",
    description: "Capabilities with a documented implementation path today.",
    items: [
      "Go SDK",
      "OIDC provider",
      "Explainable RBAC",
      "Hash-chained audit log",
    ],
    tone: "available",
  },
  {
    title: "Hardening before GA",
    description: "Tracked work required before a general-availability claim.",
    items: [
      "Database RLS",
      "Passkey-first signup",
      "External penetration test",
      "OpenID conformance",
    ],
    tone: "hardening",
  },
  {
    title: "Not claimed",
    description: "Assurances Qeet ID does not represent as complete today.",
    items: [
      "SOC 2 attestation",
      "ISO 27001 certification",
      "HIPAA BAA",
      "FIPS validation",
    ],
    tone: "not-claimed",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "Can I run Qeet ID myself?",
    answer:
      "Yes. Qeet ID is self-hostable. The reference architecture and required production configuration are documented in the self-hosting guide.",
  },
  {
    question: "Which SDK can I install today?",
    answer:
      "The Go module is available from GitHub. The Node and React clients are source previews and are not present in the public npm registry yet. Their documentation is labeled accordingly.",
  },
  {
    question: "Is Qeet ID generally available?",
    answer:
      "No. Qeet ID is in developer preview. It is suitable for evaluation and design-partner work, but the roadmap still includes an external penetration test, OpenID conformance and database-level isolation hardening.",
  },
  {
    question: "What makes the audit log verifiable?",
    answer:
      "Every event is linked into a SHA-256 hash chain, so altering a stored event breaks verification. The platform exposes an endpoint that checks the chain's integrity independently.",
  },
  {
    question: "Where does the API reference live?",
    answer:
      "The generated OpenAPI reference is served in Scalar and linked from the top navigation. This portal owns concepts, architecture, guides and SDK release status rather than duplicating endpoint schemas.",
  },
  {
    question: "What compliance claims does Qeet ID make?",
    answer:
      "The platform produces internal control evidence, but does not currently claim a SOC 2 or ISO 27001 attestation, FIPS validation or HIPAA BAA. The compliance page states the current posture explicitly.",
  },
  {
    question: "Are organization and tenant different objects?",
    answer:
      "No. Organization is the SDK-facing product term; tenant is the API and storage term for the same isolation boundary. An active token is scoped to one organization at a time.",
  },
];

export const marketingLinks = {
  getStarted: "/docs/getting-started/quickstart",
  apiReference: links.apiReference,
  github: githubUrl,
} as const;
