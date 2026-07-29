import { type CodeLang, highlight } from "@/lib/highlight";
import { CopyButton } from "./copy-button";
import { WindowChrome } from "./window-chrome";

/**
 * CodeWindow — a single Shiki-highlighted snippet in window chrome, with a copy
 * button. Server component: highlighting happens at build time.
 */
export async function CodeWindow({
  code,
  lang = "ts",
  filename,
  className,
}: {
  code: string;
  lang?: CodeLang;
  filename?: string;
  className?: string;
}) {
  const html = await highlight(code, lang);

  return (
    <WindowChrome
      title={filename}
      className={className}
      actions={<CopyButton value={code} label="Copy code" />}
    >
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is
          generated at build time from our own trusted source strings. */}
      <div className="qid-shiki" dangerouslySetInnerHTML={{ __html: html }} />
    </WindowChrome>
  );
}
