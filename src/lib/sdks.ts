/**
 * The SDKs the documentation is written for — the choices of the sidebar's SDK menu. Pages show
 * the code and the notes of the chosen SDK (src/components/sdk), and each SDK has its own pages
 * under /docs/sdks/<id>.
 *
 * `status` is the release state, stated honestly: Go installs from GitHub (no tagged release yet),
 * Node.js and React build from source (neither is on npm), and the rest are planned — placeholders
 * with no package and no code. Adding an SDK here adds it everywhere: the menu, the code tabs and
 * the styles that show the chosen one (sdk-styles.tsx).
 */
export const sdks = [
  {
    id: "go",
    name: "Go",
    status: "available",
    package: "github.com/qeetgroup/qeet-id-go",
    repository: "https://github.com/qeetgroup/qeet-id-go",
  },
  {
    id: "node",
    name: "Node.js",
    status: "preview",
    package: "@qeet-id/node",
    repository: "https://github.com/qeetgroup/qeet-id-node",
  },
  {
    id: "react",
    name: "React",
    status: "preview",
    package: "@qeet-id/react",
    repository: "https://github.com/qeetgroup/qeet-id-react",
  },
  { id: "python", name: "Python", status: "planned" },
  { id: "java", name: "Java", status: "planned" },
  { id: "dotnet", name: ".NET", status: "planned" },
  { id: "php", name: "PHP", status: "planned" },
  { id: "ruby", name: "Ruby", status: "planned" },
] as const;

export type Sdk = (typeof sdks)[number];
export type SdkId = Sdk["id"];
export type SdkStatus = Sdk["status"];

/** The SDK a first visit shows: the one a reader can install today. */
export const defaultSdk: SdkId = "go";

/** Where the reader's choice is kept between visits. */
export const sdkStorageKey = "qeet-id-sdk";

export const sdkStatus = {
  available: {
    label: "Available",
    detail: "Install from GitHub",
    kind: "success",
  },
  preview: {
    label: "Source preview",
    detail: "Not on npm yet",
    kind: "info",
  },
  planned: { label: "Planned", detail: "Not available yet", kind: "muted" },
} as const satisfies Record<
  SdkStatus,
  { label: string; detail: string; kind: string }
>;

const ids = new Set<string>(sdks.map((sdk) => sdk.id));

export function isSdkId(value: unknown): value is SdkId {
  return typeof value === "string" && ids.has(value);
}

export function getSdk(id: SdkId): Sdk {
  return sdks.find((sdk) => sdk.id === id) ?? sdks[0];
}

/** An SDK's own pages start here. */
export function sdkHref(id: SdkId) {
  return `/docs/sdks/${id}`;
}

/** `/docs/sdks/<id>/<rest>` → the SDK and the rest of the path; anything else → nothing. */
export function parseSdkPath(
  pathname: string,
): { sdk: SdkId; rest: string } | undefined {
  const match = /^\/docs\/sdks\/([^/]+)(\/.*)?$/.exec(pathname);
  if (!match || !isSdkId(match[1])) return;
  return { sdk: match[1], rest: match[2] ?? "" };
}
