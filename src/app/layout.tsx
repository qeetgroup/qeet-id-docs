import "./global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/analytics";
import { KeyboardShortcuts } from "@/components/layout/keyboard-shortcuts";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from "@/components/seo/json-ld";
import { site, siteUrl } from "@/config/site";
import { defaultOgImage } from "@/lib/metadata";

/** Quick links surfaced in the ⌘K command palette when the query is empty. */
const searchLinks: [name: string, href: string][] = [
  ["Quickstart", "/docs/getting-started/quickstart"],
  ["Installation", "/docs/getting-started/installation"],
  ["Core concepts", "/docs/concepts"],
  ["Authentication", "/docs/authentication"],
  ["Authorization", "/docs/authorization"],
  ["SDKs", "/docs/sdks"],
  ["Guides", "/docs/guides"],
  ["Roadmap", "/docs/roadmap"],
];

/**
 * Root metadata. Page- and doc-level metadata is composed via
 * `buildMetadata()` (see `@/lib/metadata`); this establishes the site-wide
 * defaults, the `%s — Qeet ID Docs` title template and the theme-adaptive
 * favicon shared with the marketing site.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} Docs — ${site.tagline}`,
    template: `%s — ${site.name} Docs`,
  },
  description: site.description,
  applicationName: `${site.name} Docs`,
  authors: [{ name: site.company, url: "https://qeet.in" }],
  creator: site.company,
  publisher: site.company,
  keywords: [
    "Qeet ID",
    "identity platform",
    "authentication",
    "authorization",
    "passkeys",
    "WebAuthn",
    "SSO",
    "SAML",
    "SCIM",
    "OIDC",
    "RBAC",
    "developer documentation",
  ],
  icons: {
    icon: [
      {
        url: "/qeet-logo-on-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/qeet-logo-on-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/icon.png" }],
  },
  openGraph: {
    type: "website",
    siteName: `${site.name} Docs`,
    title: `${site.name} Docs — ${site.tagline}`,
    description: site.description,
    url: siteUrl,
    locale: site.locale,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${site.name} Docs`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} Docs — ${site.tagline}`,
    description: site.description,
    images: [defaultOgImage],
  },
};

/** Brand-tinted browser chrome, per theme. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `data-qx-brand="qeet-id"` selects the Qeet ID palette from the Qeetrix
    // token set; fonts (Qeet Display / Qeet Text / Fira Code) are self-hosted
    // by `@qeetrix/ui/styles.css`, so no `next/font` loader is needed.
    <html lang="en" data-qx-brand="qeet-id" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <JsonLd schema={[organizationSchema, websiteSchema]} />
        <RootProvider search={{ links: searchLinks }}>
          {children}
          <KeyboardShortcuts />
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
