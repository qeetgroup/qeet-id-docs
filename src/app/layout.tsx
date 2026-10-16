import "./global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/analytics";
import { KeyboardShortcuts } from "@/components/layout/keyboard-shortcuts";
import { sdkScript } from "@/components/sdk/sdk-script";
import { SdkStyles } from "@/components/sdk/sdk-styles";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from "@/components/seo/json-ld";
import { defaultOgImage, openGraphBase } from "@/lib/metadata";
import { appDescription, appName, siteUrl } from "@/lib/shared";

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

// The manifest, the sitemap and robots.txt are file conventions in this directory; the icons are
// in public/. No canonical URL here: every page sets its own (lib/metadata.ts), and one set on the
// layout would be inherited by any page that forgot to.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: appDescription,
  applicationName: appName,
  publisher: "Qeet Group",
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
  openGraph: { ...openGraphBase, images: defaultOgImage },
  twitter: { card: "summary_large_image", images: defaultOgImage },
};

/** The canvas colour of each theme (`color.surface.canvas`), for the browser's own UI. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0d0d" },
  ],
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    // Fonts (Qeet Display / Qeet Text / Fira Code) are self-hosted by `@qeetrix/ui/styles.css`, so
    // no `next/font` loader is needed.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* The reader's SDK, on <html data-sdk> before the first paint (src/components/sdk). */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: a fixed script built from the SDK list, no user input.
          dangerouslySetInnerHTML={{ __html: sdkScript }}
        />
        <SdkStyles />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main-content" className="qid-skip-link">
          Skip to main content
        </a>
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
