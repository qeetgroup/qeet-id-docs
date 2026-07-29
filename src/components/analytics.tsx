import Script from "next/script";

/**
 * Analytics — privacy-friendly, provider-agnostic and opt-in.
 *
 * Renders a cookieless Plausible script only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
 * is set, so the portal ships zero tracking by default and never blocks on an
 * analytics vendor. Swap the script here for Vercel Analytics / PostHog / etc.
 * without touching the rest of the app.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
