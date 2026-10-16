"use client";

import { Menu } from "@base-ui/react/menu";
import { CheckIcon, ChevronsUpDownIcon } from "@qeetrix/icons";
// @qeetrix/ui's cn knows the type-role sizes (text-label, text-body, …); the plain one drops them.
import { cn } from "@qeetrix/ui";
import { usePathname, useRouter } from "next/navigation";
import { createContext, type ReactNode, use, useEffect, useMemo } from "react";
import { SdkLogo } from "@/components/sdk/sdk-logo";
import { parseSdkPath, type SdkId, sdkHref, sdkStatus, sdks } from "@/lib/sdks";
import { setSdk, useSdk } from "./sdk-store";

const SdkPages = createContext<ReadonlySet<string>>(new Set());

/**
 * Around the docs layout: the URLs of the SDKs' own pages, so the menu can move from one SDK's
 * page to the same page of another, and the choice follows client-side navigation onto an SDK's
 * pages (the inline script covers full page loads).
 */
export function SdkProvider({
  pages,
  children,
}: {
  pages: string[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const set = useMemo(() => new Set(pages), [pages]);

  useEffect(() => {
    const at = parseSdkPath(pathname);
    if (at) setSdk(at.sdk);
  }, [pathname]);

  return <SdkPages value={set}>{children}</SdkPages>;
}

/**
 * Choose an SDK, and stay where you are: on an SDK's own page, move to the same page of the chosen
 * SDK, or its overview when it has none — as LangChain's docs switch language.
 */
export function useChooseSdk() {
  const pathname = usePathname();
  const router = useRouter();
  const pages = use(SdkPages);
  return (id: SdkId) => {
    setSdk(id);
    const at = parseSdkPath(pathname);
    if (!at || at.sdk === id) return;
    const same = `${sdkHref(id)}${at.rest}`;
    router.push(pages.has(same) ? same : sdkHref(id));
  };
}

const groups = [
  {
    label: "SDKs",
    items: sdks.filter((sdk) => sdk.status !== "planned"),
  },
  {
    label: "Planned",
    items: sdks.filter((sdk) => sdk.status === "planned"),
  },
];

/**
 * The SDK menu: in the sidebar, where Fumadocs puts search (the site header keeps search), drawn as
 * the section menu above it is; `compact` is the phone version in the page header. The label shows
 * every SDK's name and the styles show the chosen one, so it never flashes the default.
 */
export function SdkMenu({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
  /** Passed by the sidebar's search slot; the menu is never disabled. */
  hideIfDisabled?: boolean;
}) {
  const current = useSdk();
  const choose = useChooseSdk();

  return (
    <Menu.Root>
      <Menu.Trigger
        className={cn(
          compact
            ? "inline-flex h-8 items-center gap-2 rounded-lg border border-border-subtle bg-surface-subtle ps-2.5 pe-2 text-label font-medium text-foreground outline-none transition-colors hover:bg-surface-interactive focus-visible:focus-ring data-popup-open:bg-surface-interactive [&_svg]:size-3.5 [&_svg]:shrink-0"
            : "flex h-10 w-full items-center gap-3 rounded-xl border bg-fd-secondary/50 ps-[calc(--spacing(2.5)-1px)] pe-2.5 text-start font-medium outline-none transition-colors hover:bg-fd-accent focus-visible:ring-2 focus-visible:ring-fd-ring data-popup-open:bg-fd-accent [&_svg]:size-4 [&_svg]:shrink-0",
          className,
        )}
      >
        {sdks.map((sdk) => (
          <span
            key={sdk.id}
            data-sdk-label={sdk.id}
            className={cn(
              "flex min-w-0 items-center",
              compact ? "gap-2" : "flex-1 gap-3",
            )}
          >
            <SdkLogo sdk={sdk.id} />
            <span className="truncate">
              {sdk.name}
              <span className="text-fd-muted-foreground"> SDK</span>
            </span>
          </span>
        ))}
        <ChevronsUpDownIcon
          aria-hidden
          className="size-3.5! text-fd-muted-foreground"
        />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner
          align="start"
          sideOffset={8}
          alignOffset={-4}
          positionMethod="fixed"
          className="z-50"
        >
          <Menu.Popup className="flex max-h-(--available-height) w-[max(calc(var(--anchor-width)+--spacing(2)),16rem)] origin-(--transform-origin) flex-col overflow-y-auto rounded-2xl border bg-fd-popover p-1 text-sm text-fd-popover-foreground shadow-lg outline-none transition-[opacity,scale] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-97 data-ending-style:opacity-0 data-ending-style:duration-100 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none">
            {groups.map((group, index) => (
              <Menu.Group
                key={group.label}
                className={cn(index > 0 && "mt-1 border-t pt-1")}
              >
                <Menu.GroupLabel className="px-2.5 pt-1.5 pb-1 text-xs font-medium text-fd-muted-foreground">
                  {group.label}
                </Menu.GroupLabel>
                {group.items.map((sdk) => {
                  const status = sdkStatus[sdk.status];
                  return (
                    <Menu.Item
                      key={sdk.id}
                      onClick={() => choose(sdk.id)}
                      className="flex min-h-9 w-full items-start gap-3 rounded-lg px-[calc(--spacing(2.5)-1px)] py-2 text-start outline-none transition-colors duration-100 data-highlighted:bg-fd-accent data-highlighted:text-fd-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0"
                    >
                      <SdkLogo sdk={sdk.id} className="mt-0.5" />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate font-medium">{sdk.name}</span>
                        <span className="truncate text-xs text-fd-muted-foreground">
                          {status.label} · {status.detail}
                        </span>
                      </span>
                      {sdk.id === current ? (
                        <CheckIcon
                          aria-hidden
                          className="mt-0.5 text-fd-primary"
                        />
                      ) : null}
                    </Menu.Item>
                  );
                })}
              </Menu.Group>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
