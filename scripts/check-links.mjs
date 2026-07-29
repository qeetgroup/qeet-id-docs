/**
 * Internal-link integrity test for the documentation.
 *
 * Every MDX page is scanned for internal links (`](/…)` and `href="/…"`), and
 * each target is checked against the set of real page URLs derived from the
 * `content/docs` file tree. A broken cross-link fails the build — the cheapest
 * way to keep a large doc set honest as it's refactored.
 *
 * Runs in CI via `bun run test`. Filesystem-based (no `.source`), so it's
 * immune to the generator race and needs no build.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const DOCS_DIR = "content/docs";

/** Recursively collect every `.mdx` file under `content/docs`. */
function collectMdx(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...collectMdx(full));
    else if (entry.endsWith(".mdx")) out.push(full);
  }
  return out;
}

/** Map a file path to its public URL (mirrors Fumadocs slug rules). */
function fileToUrl(file) {
  let slug = relative(DOCS_DIR, file)
    .replace(/\\/g, "/")
    .replace(/\.mdx$/, "");
  if (slug === "index") return "/docs";
  if (slug.endsWith("/index")) slug = slug.slice(0, -"/index".length);
  return `/docs/${slug}`;
}

const files = collectMdx(DOCS_DIR);
const validUrls = new Set(files.map(fileToUrl));
validUrls.add("/"); // the marketing home is a real route too

// Match `](/path)` and `href="/path"` / `href='/path'`.
const linkPattern = /\]\((\/[^)\s#]*)[^)]*\)|href=["'](\/[^"'#?]*)/g;

let broken = 0;
for (const file of files) {
  const content = readFileSync(file, "utf8");
  const seen = new Set();
  for (const match of content.matchAll(linkPattern)) {
    const target = (match[1] ?? match[2]).replace(/\/$/, "") || "/";
    if (seen.has(target)) continue;
    seen.add(target);
    if (!validUrls.has(target)) {
      broken++;
      console.error(`✗ ${relative(DOCS_DIR, file)} → ${target} (no such page)`);
    }
  }
}

if (broken > 0) {
  console.error(`\n[check-links] ${broken} broken internal link(s) found.`);
  process.exit(1);
}

console.log(
  `[check-links] ✓ ${files.length} pages, all internal links resolve.`,
);
