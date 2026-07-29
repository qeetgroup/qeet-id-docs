import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { type NextRequest, NextResponse } from "next/server";
import { docsContentRoute, docsRoute } from "@/lib/shared";

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

/** Serve HTML and Markdown from one canonical docs URL, selected by Accept. */
export default function proxy(request: NextRequest) {
  const suffixResult = rewriteSuffix(request.nextUrl.pathname);
  if (suffixResult) {
    return NextResponse.rewrite(new URL(suffixResult, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const markdownPath =
      request.nextUrl.pathname === docsRoute
        ? `${docsContentRoute}/content.md`
        : rewriteDocs(request.nextUrl.pathname);

    if (markdownPath) {
      return NextResponse.rewrite(new URL(markdownPath, request.nextUrl), {
        headers: { Vary: "Accept" },
      });
    }
  }

  const response = NextResponse.next();
  if (
    request.nextUrl.pathname === docsRoute ||
    request.nextUrl.pathname.startsWith(`${docsRoute}/`)
  ) {
    response.headers.set("Vary", "Accept");
  }
  return response;
}
