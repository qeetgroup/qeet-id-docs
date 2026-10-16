import {
  BuildingIcon,
  FingerprintPatternIcon,
  KeyRoundIcon,
  ShieldCheckIcon,
  UserRoundIcon,
  UsersRoundIcon,
} from "@qeetrix/icons";

const domainNodes = [
  {
    icon: UserRoundIcon,
    title: "User records",
    detail: "Identities scoped to the organization",
  },
  {
    icon: UsersRoundIcon,
    title: "Groups",
    detail: "Teams, directories and nested membership",
  },
  {
    icon: KeyRoundIcon,
    title: "Roles",
    detail: "Permission bundles and inherited grants",
  },
] as const;

const brandText = "text-[var(--qx-color-text-brand)]";

/**
 * A semantic, responsive domain diagram for the core concepts page, in the frame the docs give
 * examples (src/components/docs): a card surface with a header strip, in the Qeetrix tokens.
 */
export function IdentityModel() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-border-subtle bg-card shadow-xs dark:border-border">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-surface-subtle px-5 py-4">
        <div>
          <p className="text-label font-semibold text-foreground">
            Active organization boundary
          </p>
          <p className="mt-1 text-caption text-muted-foreground">
            Product term: organization · API and storage term: tenant
          </p>
        </div>
        <code className={`font-mono text-caption font-medium ${brandText}`}>
          org_acme / tenant_id
        </code>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-4 rounded-lg border border-border-brand/30 bg-brand-subtle p-4">
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-md bg-card ${brandText}`}
          >
            <BuildingIcon className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-body font-semibold text-foreground">
              Organization
            </p>
            <p className="mt-1 text-label text-muted-foreground">
              Isolation boundary for users, policy, federation, keys and audit
            </p>
          </div>
        </div>

        <div aria-hidden className="mx-auto h-6 w-px bg-border-subtle" />

        <div className="grid gap-3 md:grid-cols-3">
          {domainNodes.map((node) => (
            <div
              key={node.title}
              className="rounded-lg border border-border-subtle bg-surface-subtle p-4"
            >
              <node.icon className={`size-4 ${brandText}`} aria-hidden />
              <p className="mt-4 text-label font-semibold text-foreground">
                {node.title}
              </p>
              <p className="mt-1 text-caption leading-relaxed text-muted-foreground">
                {node.detail}
              </p>
            </div>
          ))}
        </div>

        <div aria-hidden className="mx-auto h-6 w-px bg-border-subtle" />

        <div className="grid gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle sm:grid-cols-2">
          <div className="flex items-center gap-4 bg-card p-4">
            <FingerprintPatternIcon
              className={`size-5 shrink-0 ${brandText}`}
              aria-hidden
            />
            <div>
              <p className="text-label font-semibold text-foreground">
                Session token
              </p>
              <p className="mt-1 text-caption text-muted-foreground">
                Carries one active organization scope
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-card p-4">
            <ShieldCheckIcon
              className="size-5 shrink-0 text-success-text"
              aria-hidden
            />
            <div>
              <p className="text-label font-semibold text-foreground">
                Decision
              </p>
              <p className="mt-1 text-caption text-muted-foreground">
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
