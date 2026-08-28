import {
  Building2,
  Fingerprint,
  KeyRound,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

const domainNodes = [
  {
    icon: UserRound,
    title: "User records",
    detail: "Identities scoped to the organization",
  },
  {
    icon: UsersRound,
    title: "Groups",
    detail: "Teams, directories and nested membership",
  },
  {
    icon: KeyRound,
    title: "Roles",
    detail: "Permission bundles and inherited grants",
  },
] as const;

/** A semantic, responsive domain diagram for the core concepts page. */
export function IdentityModel() {
  return (
    <figure className="qid-card not-prose my-8 overflow-hidden rounded-lg border">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fd-border px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-fd-foreground">
            Active organization boundary
          </p>
          <p className="mt-1 text-xs text-fd-muted-foreground">
            Product term: organization · API and storage term: tenant
          </p>
        </div>
        <span className="font-mono text-[0.7rem] font-semibold text-brand-text">
          org_acme / tenant_id
        </span>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-4 rounded-md bg-brand-500/[0.07] p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-500/12 text-brand-text">
            <Building2 className="size-5" aria-hidden />
          </span>
          <div>
            <p className="font-semibold text-fd-foreground">Organization</p>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              Isolation boundary for users, policy, federation, keys and audit
            </p>
          </div>
        </div>

        <div aria-hidden className="mx-auto h-6 w-px bg-fd-border" />

        <div className="grid gap-3 md:grid-cols-3">
          {domainNodes.map((node) => (
            <div
              key={node.title}
              className="rounded-md border border-fd-border p-4"
            >
              <node.icon className="size-4 text-brand-text" aria-hidden />
              <p className="mt-4 text-sm font-semibold text-fd-foreground">
                {node.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-fd-muted-foreground">
                {node.detail}
              </p>
            </div>
          ))}
        </div>

        <div aria-hidden className="mx-auto h-6 w-px bg-fd-border" />

        <div className="grid gap-px overflow-hidden rounded-md border border-fd-border bg-fd-border sm:grid-cols-2">
          <div className="flex items-center gap-4 bg-fd-card p-4">
            <Fingerprint
              className="size-5 shrink-0 text-brand-text"
              aria-hidden
            />
            <div>
              <p className="text-sm font-semibold text-fd-foreground">
                Session token
              </p>
              <p className="mt-1 text-xs text-fd-muted-foreground">
                Carries one active organization scope
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-fd-card p-4">
            <ShieldCheck
              className="size-5 shrink-0 text-fd-success"
              aria-hidden
            />
            <div>
              <p className="text-sm font-semibold text-fd-foreground">
                Decision
              </p>
              <p className="mt-1 text-xs text-fd-muted-foreground">
                Resolves permission and returns the grant path
              </p>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="sr-only">
        An organization, called a tenant in the API and storage model, contains
        user records, groups and roles. A session token carries one active
        organization scope into an authorization decision.
      </figcaption>
    </figure>
  );
}
