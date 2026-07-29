/**
 * Design-system entry point for the docs portal.
 *
 * Primitives come straight from Qeetrix (`@qeetrix/ui`) so the portal shares
 * the exact same components as the console/login/website. Only genuinely
 * docs-specific helpers (layout width, section rhythm, brand gradient text and
 * the scroll-reveal animation) are local. Import everything from here so pages
 * have a single, consistent surface.
 */

// Qeetrix primitives (re-exported for a single import site)
export {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  badgeVariants,
  buttonVariants,
  Callout,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Kbd,
  KbdGroup,
  Separator,
} from "@qeetrix/ui";

// Local, docs-specific helpers
export { type CodeTab, CodeTabs } from "./code-tabs";
export { CodeWindow } from "./code-window";
export { Container, type ContainerProps } from "./container";
export { CopyButton } from "./copy-button";
export { FeatureCard, type FeatureCardProps } from "./feature-card";
export { GradientText } from "./gradient-text";
export { Reveal, type RevealProps } from "./reveal";
export { Section, SectionHeading } from "./section";
export { Terminal, type TerminalLine } from "./terminal";
export { WindowChrome } from "./window-chrome";
