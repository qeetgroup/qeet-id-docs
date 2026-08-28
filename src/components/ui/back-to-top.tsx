"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * A floating return control. Reduced-motion users get an immediate scroll
 * without adding an animation runtime to the docs shell.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      aria-label="Back to top"
      className="fixed right-6 bottom-6 z-40 flex size-11 animate-fade-in items-center justify-center rounded-full border border-fd-border bg-fd-card text-fd-muted-foreground shadow-lg transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-brand-500/40 hover:text-fd-foreground active:scale-[0.96] motion-reduce:animate-none motion-reduce:transition-none"
    >
      <ArrowUp className="size-4" aria-hidden />
    </button>
  );
}
