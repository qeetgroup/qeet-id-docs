import { QeetLogoMark } from "@qeetrix/ui/brand";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Logo — the official Qeetrix `QeetLogoMark` (theme-adaptive "Q") paired with
 * the "Qeet ID" wordmark. Qeetrix does not yet ship a horizontal wordmark
 * lockup, so the wordmark is composed here. Used in the header and footer.
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
      <QeetLogoMark className="size-6 shrink-0" />
      {showWordmark ? (
        <span className="text-[0.95rem] font-semibold tracking-tight text-foreground">
          Qeet <span className="text-brand-text">ID</span>
        </span>
      ) : null}
    </span>
  );
}
