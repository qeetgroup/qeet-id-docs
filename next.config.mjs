import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy.
 *
 * `'unsafe-inline'` is required in `script-src`/`style-src` because Next's
 * theme-flash-prevention script and our JSON-LD are inlined without a nonce
 * (docs routes are statically generated, so nonce middleware isn't available).
 *
 * In development React needs `'unsafe-eval'` (debugging/HMR) and Turbopack uses
 * a websocket — both are added only for dev and never ship to production.
 */
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  "https://plausible.io",
  isDev && "'unsafe-eval'",
]
  .filter(Boolean)
  .join(" ");
const connectSrc = ["'self'", "https://plausible.io", isDev && "ws:"]
  .filter(Boolean)
  .join(" ");

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src ${scriptSrc}`,
  `connect-src ${connectSrc}`,
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Self-contained server for the container image only (the Dockerfile sets
  // NEXT_OUTPUT); other builds are unchanged.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  async headers() {
    // Static-asset caching is handled by the platform (Vercel serves hashed
    // `/_next/static` assets as immutable); a custom rule here would only warn
    // in dev, so we scope headers to security and let the host cache.
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withMDX(config);
