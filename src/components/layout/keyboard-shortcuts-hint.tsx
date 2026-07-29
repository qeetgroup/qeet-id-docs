"use client";

import { Kbd } from "@qeetrix/ui";
import { Command } from "lucide-react";

/**
 * KeyboardShortcutsHint — a sidebar affordance that opens the global shortcuts
 * dialog. It dispatches the same `?` key the dialog listens for, so there's a
 * single source of truth for the open behaviour (no shared context needed).
 */
export function KeyboardShortcutsHint() {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "?" }))
      }
      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
    >
      <Command className="size-4" />
      <span className="flex-1 text-left">Shortcuts</span>
      <Kbd>?</Kbd>
    </button>
  );
}
