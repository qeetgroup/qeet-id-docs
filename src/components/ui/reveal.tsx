"use client";

import type { ComponentProps } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface RevealProps extends ComponentProps<"div"> {
  /** Stagger a group of reveals by offsetting the transition start. */
  delayMs?: number;
}

/**
 * Reveal — a lightweight scroll-in wrapper. Uses one IntersectionObserver per
 * block (no animation runtime), reveals immediately for reduced-motion users
 * and for anything already in view on load, and always keeps children in the
 * DOM so content and SEO are unaffected.
 */
export function Reveal({
  className,
  delayMs,
  style,
  children,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("qid-reveal", visible && "is-visible", className)}
      style={delayMs ? { ...style, transitionDelay: `${delayMs}ms` } : style}
      {...props}
    >
      {children}
    </div>
  );
}
