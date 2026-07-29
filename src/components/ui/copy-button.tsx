"use client";

import { Check, Copy, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type CopyStatus = "idle" | "copied" | "failed";

/**
 * CopyButton — a compact, icon-only copy control for code-window headers and
 * inline command rows.
 *
 * Qeetrix ships a `CopyButton`, but it always renders a visible text label
 * beside the icon, which breaks a square icon slot — so this docs-local variant
 * is icon-only (label lives in `aria-label`) with a copied→check confirmation.
 */
export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function onClick() {
    void navigator.clipboard
      .writeText(value)
      .then(() => setStatus("copied"))
      .catch(() => setStatus("failed"))
      .finally(() => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setStatus("idle"), 1800);
      });
  }

  const feedback =
    status === "copied"
      ? "Copied to clipboard"
      : status === "failed"
        ? "Copy failed"
        : label;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={feedback}
      title={feedback}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-[0.96]",
        className,
      )}
    >
      {status === "copied" ? (
        <Check className="size-3.5 text-fd-success" />
      ) : status === "failed" ? (
        <X className="size-3.5 text-fd-error" />
      ) : (
        <Copy className="size-3.5" />
      )}
      <span className="sr-only" aria-live="polite">
        {status === "idle" ? "" : feedback}
      </span>
    </button>
  );
}
