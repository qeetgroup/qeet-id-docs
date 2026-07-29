"use client";

import { Badge, buttonVariants } from "@qeetrix/ui";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";
import { type PointerEvent, useRef } from "react";
import { GithubIcon } from "@/components/brand/icons";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { marketingLinks, trustChips } from "@/config/marketing";
import { cn } from "@/lib/cn";

/**
 * Hero — the landing headline. Above the fold, so it animates on mount (not on
 * scroll): a staggered fade-up for the copy, an animated aurora + grid
 * backdrop, and a subtle pointer-tracking glow. All motion is disabled under
 * `prefers-reduced-motion`.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 },
    },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden"
    >
      {/* Backdrop layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-grid mask-[radial-gradient(ellipse_60%_55%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-20 size-168 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl animate-aurora"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[12%] -z-20 size-112 rounded-full bg-amber-400/15 blur-3xl animate-float"
      />
      {/* Pointer-tracking glow (set via --mx/--my on the section) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 mix-blend-normal"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 0px), color-mix(in oklab, var(--brand-500) 14%, transparent), transparent 70%)",
        }}
      />

      <Container
        size="content"
        className="flex flex-col items-center py-24 text-center sm:py-32"
      >
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.div variants={item}>
            <Badge
              variant="outline"
              className="mb-6 gap-1.5 border-brand-500/30 bg-brand-500/10 text-brand-text"
            >
              <span className="size-1.5 rounded-full bg-brand-500" />
              Developer preview · Docs v0.1
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="max-w-4xl text-balance font-display text-4xl font-semibold tracking-tight sm:text-6xl"
          >
            Identity you can <GradientText>own and prove</GradientText>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl"
          >
            Qeet ID is the passkeys-first, open-source identity platform. Ship
            authentication, authorization, SSO and audit in minutes — no per-MAU
            fee, no SSO tax. These docs take you from zero to integrated.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link
              href={marketingLinks.getStarted}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "text-white",
              )}
            >
              Get started
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={marketingLinks.apiReference}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              View API reference
            </a>
            <a
              href={marketingLinks.github}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              <GithubIcon className="size-4" />
              Star on GitHub
            </a>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
          >
            {trustChips.map((chip) => (
              <li key={chip} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-brand-500/70" />
                {chip}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}
