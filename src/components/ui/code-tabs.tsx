"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { CopyButton } from "./copy-button";

export interface CodeTab {
  value: string;
  label: string;
  filename: string;
  /** Pre-rendered Shiki HTML (highlighted on the server). */
  html: string;
  /** Raw source, for the copy button. */
  code: string;
}

/**
 * CodeTabs — a tabbed code window over server-highlighted snippets. Shiki runs
 * on the server (in the parent server component); this client component only
 * toggles which pre-rendered panel is visible and drives copy, so no
 * highlighter ships to the browser. Keyboard + ARIA tablist compliant.
 */
export function CodeTabs({
  tabs,
  className,
}: {
  tabs: CodeTab[];
  className?: string;
}) {
  const [active, setActive] = useState(tabs[0]?.value);
  const baseId = useId();
  const current = tabs.find((t) => t.value === active) ?? tabs[0];

  if (!current) return null;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card/80 shadow-xl shadow-black/5 backdrop-blur supports-[backdrop-filter]:bg-card/60",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-border/70 pr-2 pl-4">
        <span className="flex shrink-0 gap-1.5 py-3" aria-hidden>
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </span>

        <div
          role="tablist"
          aria-label="Code examples"
          className="flex min-w-0 flex-1 overflow-x-auto"
        >
          {tabs.map((tab) => {
            const selected = tab.value === current.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab.value}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.value}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.value)}
                className={cn(
                  "-mb-px shrink-0 border-b-2 px-3 py-3 font-mono text-xs transition-colors",
                  selected
                    ? "border-brand-500 text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <CopyButton value={current.code} label="Copy code" className="mr-1" />
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.value}
          role="tabpanel"
          id={`${baseId}-panel-${tab.value}`}
          aria-labelledby={`${baseId}-tab-${tab.value}`}
          hidden={tab.value !== current.value}
        >
          <div
            className="qid-shiki"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted build-time Shiki output.
            dangerouslySetInnerHTML={{ __html: tab.html }}
          />
        </div>
      ))}
    </div>
  );
}
