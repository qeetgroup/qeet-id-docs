import {
  BookOpenIcon,
  BotIcon,
  BoxesIcon,
  CodeIcon,
  HouseIcon,
  KeyRoundIcon,
  LayersIcon,
  LibraryIcon,
  LifeBuoyIcon,
  LockIcon,
  MapIcon,
  MessageCircleIcon,
  RefreshCwIcon,
  RocketIcon,
  ScrollTextIcon,
  ServerIcon,
  ShieldCheckIcon,
} from "@qeetrix/icons";
import { createElement } from "react";
import { BrandLogo, type BrandName } from "@/components/brand-logo";

// Icons available to `icon:` in page frontmatter and meta.json. SDK pages, planned ones included,
// show the language's or framework's own logo, in its colours (src/components/brand-logo.tsx).
const brandMarks: Record<string, BrandName> = {
  Dotnet: "dotnet",
  Go: "go",
  Java: "java",
  Nodejs: "nodejs",
  Php: "php",
  Python: "python",
  React: "react",
  Ruby: "ruby",
};

const icons = {
  BookOpen: BookOpenIcon,
  Bot: BotIcon,
  Boxes: BoxesIcon,
  Code: CodeIcon,
  House: HouseIcon,
  KeyRound: KeyRoundIcon,
  Layers: LayersIcon,
  Library: LibraryIcon,
  LifeBuoy: LifeBuoyIcon,
  Lock: LockIcon,
  Map: MapIcon,
  MessageCircle: MessageCircleIcon,
  RefreshCw: RefreshCwIcon,
  Rocket: RocketIcon,
  ScrollText: ScrollTextIcon,
  Server: ServerIcon,
  ShieldCheck: ShieldCheckIcon,
};

export function resolveIcon(icon: string | undefined) {
  if (icon === undefined) return;
  if (icon in brandMarks) {
    return createElement(BrandLogo, { name: brandMarks[icon] });
  }
  if (!(icon in icons)) {
    console.warn(
      `[icons] Unknown icon "${icon}" — register it in src/lib/icons.ts.`,
    );
    return;
  }
  return createElement(icons[icon as keyof typeof icons]);
}
