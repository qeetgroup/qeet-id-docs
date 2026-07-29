"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Kbd,
} from "@qeetrix/ui";
import { useEffect, useState } from "react";

interface Shortcut {
  keys: string[];
  label: string;
}

const shortcuts: Shortcut[] = [
  { keys: ["⌘", "K"], label: "Open search & command palette" },
  { keys: ["d"], label: "Toggle light / dark theme" },
  { keys: ["?"], label: "Show this shortcut help" },
  { keys: ["Esc"], label: "Close dialogs & menus" },
];

/**
 * KeyboardShortcuts — a global help dialog opened with `?`. Listens site-wide
 * but ignores the key while the user is typing in a field or another dialog is
 * focused. Built on the Qeetrix (Base UI) Dialog, driven controlled.
 */
export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "?") return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      event.preventDefault();
      setOpen((prev) => !prev);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>
            Move around the docs without touching the mouse.
          </DialogDescription>
        </DialogHeader>
        <ul className="mt-2 flex flex-col divide-y divide-border">
          {shortcuts.map((shortcut) => (
            <li
              key={shortcut.label}
              className="flex items-center justify-between gap-4 py-2.5"
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.label}
              </span>
              <span className="flex items-center gap-1">
                {shortcut.keys.map((key) => (
                  <Kbd key={key}>{key}</Kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
