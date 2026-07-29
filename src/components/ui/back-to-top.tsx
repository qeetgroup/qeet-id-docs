"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * BackToTop — a floating button that appears once the reader has scrolled past
 * the fold and smoothly returns them to the top. Fades in/out with Motion;
 * respects reduced-motion for the scroll behaviour.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.2 }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
          }
          aria-label="Back to top"
          className="fixed right-6 bottom-6 z-40 flex size-10 items-center justify-center rounded-full border border-fd-border bg-fd-card text-fd-muted-foreground shadow-lg transition-colors hover:border-brand-500/40 hover:text-fd-foreground"
        >
          <ArrowUp className="size-4" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
