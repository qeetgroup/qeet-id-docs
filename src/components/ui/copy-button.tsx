"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

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
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function onClick() {
    void navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        className,
      )}
    >
      {copied ? (
        <Check className="size-3.5 text-fd-success" />
      ) : (
        <Copy className="size-3.5" />
      )}
      <span className="sr-only">{copied ? "Copied" : label}</span>
    </button>
  );
}
