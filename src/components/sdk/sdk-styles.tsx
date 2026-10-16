import { defaultSdk, type SdkId, sdks } from "@/lib/sdks";

/** `<html>` with this SDK chosen; with none (no JavaScript), the default. */
function chosen(id: SdkId) {
  const root = `:root[data-sdk="${id}"]`;
  return id === defaultSdk ? `${root}, :root:not([data-sdk])` : root;
}

/** Each selector under the root of the chosen SDK. */
function under(id: SdkId, selector: string) {
  return chosen(id)
    .split(", ")
    .map((root) => `${root} ${selector}`)
    .join(", ");
}

/**
 * What shows for the chosen SDK, written from the SDK list (src/lib/sdks.ts) so a new SDK needs no
 * stylesheet change. Every SDK's content is in the page — for search engines, the Markdown routes
 * and readers without JavaScript — and these rules hide the others. They key off `<html data-sdk>`,
 * which is set before the first paint, so nothing flashes.
 *
 * - `[data-sdk-only="go node"]` — notes for some SDKs (<Sdk only>).
 * - `[data-sdk-panel]` — a code tab's panel (<SdkTabs>); every SDK has one, real or a placeholder.
 * - `[data-sdk-trigger]` — a code tab; a placeholder's tab shows only while its SDK is chosen.
 * - `[data-sdk-label]` — the SDK menu's label.
 */
const css = sdks
  .map(({ id }) =>
    [
      `${under(id, `[data-sdk-only]:not([data-sdk-only~="${id}"])`)},`,
      `${under(id, `[data-sdk-panel]:not([data-sdk-panel="${id}"])`)},`,
      `${under(id, `[data-sdk-trigger][data-sdk-missing]:not([data-sdk-trigger="${id}"])`)},`,
      `${under(id, `[data-sdk-label]:not([data-sdk-label="${id}"])`)} { display: none; }`,
      `${under(id, `[data-sdk-trigger="${id}"]`)} { background-color: var(--card); color: var(--foreground); box-shadow: 0 0 0 1px var(--qx-color-border-subtle), var(--shadow-xs); }`,
    ].join("\n"),
  )
  .join("\n");

export function SdkStyles() {
  return <style>{css}</style>;
}
