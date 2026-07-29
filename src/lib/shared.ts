/**
 * Compatibility shim for the Fumadocs scaffold's route handlers (`/og`,
 * `/llms*`, `proxy.ts`), which import route/name/git constants from here.
 *
 * The canonical definitions now live in `@/config/site`; this file simply
 * re-exports them under the names the generated routes expect, so there is a
 * single source of truth.
 */
import { gitConfig as git, routes, site } from "@/config/site";

export const appName = site.name;
export const docsRoute = routes.docs;
export const docsImageRoute = routes.docsImage;
export const docsContentRoute = routes.docsContent;
export const gitConfig = git;
