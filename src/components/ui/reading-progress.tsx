"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * ReadingProgress — a thin brand-gradient bar pinned to the very top of the
 * viewport that fills as the reader scrolls the page. Spring-smoothed for a
 * premium feel; `aria-hidden` since it's a decorative progress indicator.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-linear-to-r from-brand-500 to-amber-400"
    />
  );
}
