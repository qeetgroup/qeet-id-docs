"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@qeetrix/ui";
import {
  ArrowUpRight,
  Check,
  ChevronsUpDown,
  Map as MapIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { links } from "@/config/site";

/**
 * VersionSelector — a docs-sidebar banner control showing the current docs
 * version and preview status, with quick links to the roadmap and releases.
 *
 * Qeet ID ships a single preview line today, so this is honest about that — the
 * control is in place for real version switching later.
 *
 * NB: we use a plain styled `<div>` for the heading rather than
 * `DropdownMenuLabel` — the latter is a Base UI `Menu.GroupLabel` that requires
 * a `Menu.Group` ancestor context and throws otherwise. Menu items render fine
 * directly under the popup, so no group is needed.
 */
export function VersionSelector() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-2 rounded-md border border-fd-border bg-fd-card px-2.5 py-1.5 text-sm transition-colors hover:bg-fd-accent">
        <span className="size-1.5 shrink-0 rounded-full bg-brand-500" />
        <span className="flex-1 text-left font-medium">v0.1</span>
        <span className="rounded bg-brand-500/10 px-1.5 py-0.5 text-[0.65rem] font-medium text-brand-text">
          Preview
        </span>
        <ChevronsUpDown className="size-3.5 shrink-0 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <div className="px-1.5 py-1 text-xs font-medium text-muted-foreground">
          Documentation version
        </div>
        <DropdownMenuItem className="justify-between">
          v0.1 · Preview
          <Check className="size-4 text-brand-text" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/docs/roadmap")}>
          <MapIcon className="size-4" />
          What's shipped & next
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            window.open(links.githubOrg, "_blank", "noopener,noreferrer")
          }
        >
          <ArrowUpRight className="size-4" />
          Releases on GitHub
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
