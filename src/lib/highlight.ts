/**
 * Server-only Shiki highlighter for marketing code samples.
 *
 * Uses the same engine Fumadocs uses for docs code blocks, so landing-page
 * snippets and documentation render identically. A single highlighter instance
 * is memoised across the build (all marketing pages are statically generated).
 *
 * Dual-theme output: light colours are inlined as `color`, dark colours as the
 * `--shiki-dark` CSS variable — `global.css` swaps them under `.dark`.
 */
import { createHighlighter, type Highlighter } from "shiki";

const LANGS = ["bash", "ts", "tsx", "go", "json"] as const;
export type CodeLang = (typeof LANGS)[number];

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: [...LANGS],
    });
  }
  return highlighterPromise;
}

/** Highlight a code string to theme-adaptive HTML. Call only on the server. */
export async function highlight(
  code: string,
  lang: CodeLang = "ts",
): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code.trim(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: "light",
  });
}
