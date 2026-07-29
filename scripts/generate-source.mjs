/**
 * Deterministic wrapper around the `fumadocs-mdx` generator.
 *
 * The CLI writes `.source/*.ts` asynchronously and occasionally exits before
 * the write flushes, leaving empty stubs — which then makes a standalone
 * `tsc --noEmit` fail with "`.source/server.ts` is not a module". (The Next
 * build never hits this because its bundler plugin generates synchronously.)
 *
 * This runs the generator and verifies the output is non-empty, retrying a few
 * times, so `types:check` is reliable in local dev and CI.
 */
import { execSync } from "node:child_process";
import { statSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const required = [".source/server.ts", ".source/browser.ts"];

const isPopulated = () =>
  required.every((file) => {
    try {
      return statSync(file).size > 0;
    } catch {
      return false;
    }
  });

let ok = false;
for (let attempt = 1; attempt <= 6 && !ok; attempt++) {
  execSync("bunx fumadocs-mdx", { stdio: "inherit" });
  await sleep(150);
  ok = isPopulated();
  if (!ok) {
    console.warn(
      `[generate-source] attempt ${attempt}: .source was empty, retrying…`,
    );
  }
}

if (!ok) {
  console.error(
    "[generate-source] failed to generate a non-empty .source after 6 attempts",
  );
  process.exit(1);
}
