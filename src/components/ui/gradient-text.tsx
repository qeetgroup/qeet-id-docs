import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/**
 * GradientText — clips the warm brand gradient to its text. Falls back to the
 * brand fill where `background-clip: text` is unsupported.
 */
export function GradientText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-gradient-brand [-webkit-text-fill-color:transparent]",
        className,
      )}
      {...props}
    />
  );
}
