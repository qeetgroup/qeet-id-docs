/**
 * Header and footer navigation model.
 *
 * This is data, not UI — the header (`layout.shared.tsx`) and `SiteFooter`
 * consume it. Keeping the IA declarative means the command palette (Phase 5)
 * and the footer stay in lock-step with the top nav automatically.
 */
import {
  BookOpen,
  Code2,
  FileText,
  LifeBuoy,
  Map as MapIcon,
  Rocket,
  ScrollText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { GithubIcon } from "@/components/brand/icons";
import { links } from "./site";

/** Any SVG-based icon: works for both Lucide icons and our custom brand SVGs. */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface NavItem {
  label: string;
  href: string;
  /** External links open in a new tab and get an indicator. */
  external?: boolean;
  description?: string;
  icon?: IconComponent;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

/**
 * Primary links shown in the sticky top navigation. Docs is the anchor; the
 * API reference points at Scalar (external); GitHub is rendered as an icon
 * button by the layout.
 */
export const primaryNav: NavItem[] = [
  { label: "Docs", href: "/docs", icon: BookOpen },
  { label: "Guides", href: "/docs/guides", icon: Sparkles },
  { label: "SDKs", href: "/docs/sdks", icon: Code2 },
  {
    label: "API Reference",
    href: links.apiReference,
    external: true,
    icon: FileText,
  },
];

/** Grouped links for the marketing footer. */
export const footerNav: NavGroup[] = [
  {
    title: "Documentation",
    items: [
      {
        label: "Quickstart",
        href: "/docs/getting-started/quickstart",
        icon: Rocket,
      },
      { label: "Concepts", href: "/docs/concepts", icon: BookOpen },
      { label: "Guides", href: "/docs/guides", icon: Sparkles },
      { label: "SDKs", href: "/docs/sdks", icon: Code2 },
    ],
  },
  {
    title: "Platform",
    items: [
      {
        label: "Authentication",
        href: "/docs/authentication",
        icon: ShieldCheck,
      },
      {
        label: "Authorization",
        href: "/docs/authorization",
        icon: ShieldCheck,
      },
      { label: "Audit Logs", href: "/docs/audit-logs", icon: ScrollText },
      { label: "Roadmap", href: "/docs/roadmap", icon: MapIcon },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        label: "API Reference",
        href: links.apiReference,
        external: true,
        icon: FileText,
      },
      { label: "Website", href: links.website, external: true, icon: Sparkles },
      { label: "Status", href: links.status, external: true, icon: LifeBuoy },
      {
        label: "GitHub",
        href: links.githubOrg,
        external: true,
        icon: GithubIcon,
      },
    ],
  },
];

/** Legal / meta links rendered on the footer baseline. */
export const footerMeta: NavItem[] = [
  { label: "Support", href: links.support, external: true },
  { label: "GitHub", href: links.githubOrg, external: true },
];
