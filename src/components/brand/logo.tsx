import type { ComponentProps } from "react";
import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/cn";

/**
 * Logo — the Qeet mark (`@qeetrix/icons`' QeetLogo, one drawing per theme) paired with the
 * "Qeet ID" wordmark. Used in the landing page's navigation bar and footer.
 */
export function Logo({
  className,
  showWordmark = true,
  ...props
}: ComponentProps<"span"> & { showWordmark?: boolean }) {
  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    >
      <BrandMark height={24} className="shrink-0" />
      {showWordmark ? (
        <span className="text-[0.95rem] font-semibold tracking-tight text-foreground">
          Qeet <span className="text-brand-text">ID</span>
        </span>
      ) : null}
    </span>
  );
}
