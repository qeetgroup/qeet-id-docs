"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface AnnouncementBarProps {
  /** Bump this id whenever the message changes to re-show a dismissed bar. */
  id: string;
  children: React.ReactNode;
  href: string;
  linkLabel?: string;
  /** External links open in a new tab. */
  external?: boolean;
  className?: string;
}

/**
 * AnnouncementBar — a slim, dismissible strip above the header. Dismissal is
 * remembered per `id` in localStorage, so changing the message (and its id)
 * brings it back. Rendered on the server as visible; a returning visitor who
 * dismissed it sees it hidden after hydration.
 */
export function AnnouncementBar({
  id,
  children,
  href,
  linkLabel = "Learn more",
  external = false,
  className,
}: AnnouncementBarProps) {
  const storageKey = `qid-announcement:${id}`;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(storageKey) === "dismissed") setVisible(false);
  }, [storageKey]);

  if (!visible) return null;

  const linkProps = external
    ? { href, target: "_blank" as const, rel: "noreferrer noopener" }
    : { href };

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden border-b border-brand-500/20 bg-brand-500/[0.06] text-sm",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-3 px-10 py-2.5 text-center">
        <p className="text-fd-foreground/90">
          {children}{" "}
          <Link
            {...linkProps}
            className="group inline-flex items-center gap-0.5 font-medium text-brand-text underline-offset-4 hover:underline"
          >
            {linkLabel}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          localStorage.setItem(storageKey, "dismissed");
          setVisible(false);
        }}
        aria-label="Dismiss announcement"
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
