import { ArrowUpRightIcon, HourglassIcon } from "@qeetrix/icons";
import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useId,
} from "react";
import { getSdk, isSdkId, type SdkId, sdks } from "@/lib/sdks";
import { links } from "@/lib/site-links";
import { SdkLogo } from "./sdk-logo";
import { SdkSwitch, SdkTabList } from "./sdk-tab-list";

type SdkTabProps = { sdk: SdkId; children?: ReactNode };

/** One SDK's code (and, at most, a line of text) inside <SdkTabs>. */
export function SdkTab({ children }: SdkTabProps) {
  return <>{children}</>;
}

function sdkList(value: string, where: string): SdkId[] {
  const ids = value.split(/\s+/).filter(Boolean);
  for (const id of ids) {
    if (!isSdkId(id)) {
      throw new Error(
        `${where}: unknown SDK "${id}" — use one of ${sdks.map((sdk) => sdk.id).join(", ")} (src/lib/sdks.ts).`,
      );
    }
  }
  return ids as SdkId[];
}

/**
 * The same step in each SDK: the chosen SDK's tab shows, and every SDK has one — its code, or a
 * placeholder saying why there is none (a planned SDK, or a step that SDK does not do, with an
 * optional `notes` line) and offering the SDKs that have code. All of it is in the page, so search
 * engines and the Markdown routes see every SDK; sdk-styles.tsx shows the chosen one.
 *
 * ```mdx
 * <SdkTabs notes={{ react: "React runs in the browser; verify sessions on your server." }}>
 * <SdkTab sdk="go">
 *
 * ```go title="main.go"
 * …
 * ```
 *
 * </SdkTab>
 * </SdkTabs>
 * ```
 *
 * No headings inside a tab: the table of contents lists every heading on the page, whichever SDK
 * is chosen.
 */
export function SdkTabs({
  children,
  notes = {},
}: {
  children: ReactNode;
  notes?: Partial<Record<SdkId, string>>;
}) {
  const base = useId();
  const tabs = Children.toArray(children).filter(
    (child): child is ReactElement<SdkTabProps> =>
      isValidElement(child) && child.type === SdkTab,
  );
  const present = tabs.map(
    (tab) => sdkList(String(tab.props.sdk ?? ""), "<SdkTab sdk>")[0],
  );
  if (present.length === 0 || new Set(present).size !== present.length) {
    throw new Error(
      "<SdkTabs> needs one <SdkTab sdk> per SDK, each SDK at most once.",
    );
  }
  const missing = sdks
    .map((sdk) => sdk.id)
    .filter((id) => !present.includes(id));

  return (
    <div
      data-sdk-tabs=""
      className="my-6 overflow-hidden rounded-xl border border-border-subtle bg-surface-subtle shadow-xs dark:border-border"
    >
      <SdkTabList base={base} present={present} missing={missing} />
      {tabs.map((tab, index) => (
        <div
          key={present[index]}
          role="tabpanel"
          id={`${base}-${present[index]}`}
          aria-labelledby={`${base}-${present[index]}-tab`}
          data-sdk-panel={present[index]}
        >
          {tab.props.children}
        </div>
      ))}
      {missing.map((sdk) => (
        <div
          key={sdk}
          role="tabpanel"
          id={`${base}-${sdk}`}
          aria-labelledby={`${base}-${sdk}-tab`}
          data-sdk-panel={sdk}
        >
          <SdkPlaceholder sdk={sdk} present={present} note={notes[sdk]} />
        </div>
      ))}
    </div>
  );
}

function SdkPlaceholder({
  sdk,
  present,
  note,
}: {
  sdk: SdkId;
  present: SdkId[];
  note?: string;
}) {
  const { name, status } = getSdk(sdk);
  const planned = status === "planned";
  return (
    <div className="not-prose flex flex-col items-start gap-3 px-5 py-6 text-label text-muted-foreground">
      <p className="flex items-center gap-2 font-medium text-foreground [&_svg]:size-4">
        {planned ? (
          <HourglassIcon aria-hidden className="text-muted-foreground" />
        ) : (
          <SdkLogo sdk={sdk} />
        )}
        {planned
          ? `The ${name} SDK is planned`
          : `No ${name} example for this step`}
      </p>
      {planned ? (
        <p className="max-w-[40rem] leading-relaxed">
          There is no {name} SDK yet, so there is no {name} code to show. Until
          it ships, call the HTTP API directly — every endpoint is in the{" "}
          <a
            href={links.apiReference}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-0.5 font-medium text-foreground underline underline-offset-2"
          >
            API reference
            <ArrowUpRightIcon aria-hidden className="size-3" />
          </a>
          .
        </p>
      ) : null}
      {note ? <p className="max-w-[40rem] leading-relaxed">{note}</p> : null}
      <div className="flex flex-wrap gap-2">
        {present.map((id) => (
          <SdkSwitch key={id} sdk={id} />
        ))}
      </div>
    </div>
  );
}

/**
 * Text for some SDKs only: `<Sdk only="go node">…</Sdk>`. Hidden, not removed, for the others —
 * search and the Markdown routes keep it. No headings inside, for the table of contents' sake.
 */
export function Sdk({ only, children }: { only: string; children: ReactNode }) {
  return (
    <div data-sdk-only={sdkList(only, "<Sdk only>").join(" ")}>{children}</div>
  );
}
