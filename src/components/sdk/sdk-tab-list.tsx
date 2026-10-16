"use client";

// @qeetrix/ui's cn knows the type-role sizes (text-label, text-body, …); the plain one drops them.
import { cn } from "@qeetrix/ui";
import type { KeyboardEvent } from "react";
import { getSdk, type SdkId } from "@/lib/sdks";
import { SdkLogo } from "./sdk-logo";
import { setSdk, useSdk } from "./sdk-store";

/**
 * The tab bar of <SdkTabs>: one tab per SDK with code here, plus the chosen SDK's placeholder tab
 * when it has none. Choosing a tab chooses the SDK for every page, as the sidebar's menu does. The
 * chosen tab's look comes from sdk-styles.tsx, so it is right before hydration.
 */
export function SdkTabList({
  base,
  present,
  missing,
}: {
  base: string;
  present: SdkId[];
  missing: SdkId[];
}) {
  const current = useSdk();
  const order = [...present, ...missing];

  // Arrow keys move between the tabs that show; activation follows focus, as in Fumadocs' tabs.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
    ).filter((tab) => tab.offsetParent !== null);
    const at = tabs.indexOf(document.activeElement as HTMLButtonElement);
    const last = tabs.length - 1;
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? last
          : event.key === "ArrowRight"
            ? at >= last
              ? 0
              : at + 1
            : at <= 0
              ? last
              : at - 1;
    event.preventDefault();
    tabs[next]?.focus();
    tabs[next]?.click();
  }

  return (
    <div
      role="tablist"
      aria-label="SDK"
      onKeyDown={onKeyDown}
      className="not-prose flex h-10 items-center gap-1 overflow-x-auto border-b border-border-subtle bg-surface/60 px-1.5"
    >
      {order.map((sdk) => {
        const isMissing = missing.includes(sdk);
        return (
          <button
            key={sdk}
            type="button"
            role="tab"
            id={`${base}-${sdk}-tab`}
            aria-controls={`${base}-${sdk}`}
            aria-selected={current === sdk}
            tabIndex={current === sdk ? 0 : -1}
            data-sdk-trigger={sdk}
            data-sdk-missing={isMissing || undefined}
            onClick={() => setSdk(sdk)}
            className={cn(
              "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-caption font-medium text-muted-foreground transition-colors duration-fast hover:text-foreground focus-visible:focus-ring [&_svg]:size-3.5",
              isMissing && "italic",
            )}
          >
            <SdkLogo sdk={sdk} />
            {getSdk(sdk).name}
          </button>
        );
      })}
    </div>
  );
}

/** A button in a placeholder that switches to an SDK with code here. */
export function SdkSwitch({ sdk }: { sdk: SdkId }) {
  return (
    <button
      type="button"
      onClick={() => setSdk(sdk)}
      className="inline-flex h-7 items-center gap-1.5 rounded-full border border-border-subtle bg-card px-3 text-caption font-medium text-foreground shadow-xs transition-colors duration-fast hover:bg-surface-interactive focus-visible:focus-ring [&_svg]:size-3.5"
    >
      <SdkLogo sdk={sdk} />
      Show {getSdk(sdk).name}
    </button>
  );
}
