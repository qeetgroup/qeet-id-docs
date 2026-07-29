"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ComponentProps, ElementType } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 20 },
  down: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
  none: {},
};

/**
 * Reveal — a reusable scroll-triggered entrance animation. Wraps its children
 * and fades/slides them in the first time they enter the viewport.
 *
 * Honours `prefers-reduced-motion`: when set, content renders immediately with
 * no transform. Kept intentionally small so Phase 2's marketing sections can
 * lean on it instead of re-implementing viewport animations.
 */
export interface RevealProps extends ComponentProps<typeof motion.div> {
  as?: ElementType;
  direction?: Direction;
  delay?: number;
  duration?: number;
}

export function Reveal({
  as = "div",
  direction = "up",
  delay = 0,
  duration = 0.6,
  children,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const variants: Variants = {
    hidden: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, ...offset[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
