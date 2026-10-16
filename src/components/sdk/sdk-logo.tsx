import { BrandLogo, type BrandName } from "@/components/brand-logo";
import type { SdkId } from "@/lib/sdks";

const logos: Record<SdkId, BrandName> = {
  go: "go",
  node: "nodejs",
  react: "react",
  python: "python",
  java: "java",
  dotnet: "dotnet",
  php: "php",
  ruby: "ruby",
};

/** An SDK's language or framework logo, in its own colours. */
export function SdkLogo({
  sdk,
  className,
}: {
  sdk: SdkId;
  className?: string;
}) {
  return <BrandLogo name={logos[sdk]} className={className} />;
}
