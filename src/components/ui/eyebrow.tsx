import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Eyebrow — the small tracked label that opens a marketing section, prefixed
 * with a brand gradient tick. Gives the page consistent editorial rhythm.
 */
export function Eyebrow({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("qid-eyebrow", className)} {...props} />;
}
