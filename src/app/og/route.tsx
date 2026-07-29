import { generate as OgImage } from "fumadocs-ui/og";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const revalidate = false;

/**
 * Default social share image (1200×630), served at `/og`. Per-page docs images
 * are generated separately under `/og/docs/*`; this is the site-wide fallback
 * used by the home page and any route without its own image.
 */
export function GET() {
  return new ImageResponse(
    <OgImage
      title={`${site.name} Docs`}
      description={site.tagline}
      site={site.company}
    />,
    { width: 1200, height: 630 },
  );
}
