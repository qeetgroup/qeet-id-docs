"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";
import { WindowChrome } from "./window-chrome";

export interface TerminalLine {
  text: string;
  type?: "command" | "output" | "comment" | "success";
}

const lineStyles: Record<NonNullable<TerminalLine["type"]>, string> = {
  command: "text-foreground",
  output: "text-muted-foreground",
  comment: "text-muted-foreground/70 italic",
  success: "text-fd-success",
};

/**
 * Terminal — an animated terminal window that reveals its lines in sequence on
 * scroll (with a blinking cursor on the final line). Reduced-motion users get
 * the full output immediately. Purely decorative, so it is `aria-hidden` and a
 * plain-text transcript is available to assistive tech via the caller.
 */
export function Terminal({
  lines,
  title = "bash",
  className,
}: {
  lines: TerminalLine[];
  title?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.4, delayChildren: 0.15 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 4 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  return (
    <WindowChrome title={title} className={className}>
      <motion.div
        aria-hidden
        className="space-y-1.5 p-4 font-mono text-[0.8rem] leading-relaxed"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
      >
        {lines.map((line, i) => {
          const type = line.type ?? "output";
          const isLast = i === lines.length - 1;
          return (
            <motion.div
              // biome-ignore lint/suspicious/noArrayIndexKey: static, ordered transcript
              key={i}
              variants={item}
              className={cn("flex whitespace-pre-wrap", lineStyles[type])}
            >
              {type === "command" ? (
                <span className="mr-2 shrink-0 select-none text-brand-text">
                  $
                </span>
              ) : null}
              <span>{line.text}</span>
              {isLast ? (
                <span className="ml-0.5 inline-block h-[1.1em] w-[0.5em] translate-y-[0.15em] animate-pulse bg-brand-500" />
              ) : null}
            </motion.div>
          );
        })}
      </motion.div>
    </WindowChrome>
  );
}
