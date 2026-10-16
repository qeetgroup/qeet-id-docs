import { ogImage } from "@/lib/og";
import { appDescription, productName } from "@/lib/shared";

export const revalidate = false;

export function GET() {
  return ogImage({
    title: `${productName} documentation`,
    description: appDescription,
  });
}
