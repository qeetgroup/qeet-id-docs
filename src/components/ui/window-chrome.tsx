import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * WindowChrome — the shared "app window" frame (traffic-light dots + a title
 * bar with an optional actions slot). Pure presentational and import-light, so
 * it is safe to use from both the server `CodeWindow` and the client
 * `CodeTabs` without dragging Shiki into the client bundle.
 */
export function WindowChrome({
  title,
  actions,
  children,
  className,
}: {
  title?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card/80 shadow-xl shadow-black/5 backdrop-blur supports-[backdrop-filter]:bg-card/60",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </span>
        {title ? (
          <span className="ml-2 truncate font-mono text-xs text-muted-foreground">
            {title}
          </span>
        ) : null}
        {actions ? (
          <div className="ml-auto flex items-center">{actions}</div>
        ) : null}
      </div>
      {children}
    </div>
  );
}
