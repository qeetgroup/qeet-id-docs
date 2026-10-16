import { cn } from "@qeetrix/ui";
import Bun from "@thesvg/react/bun";
import Css from "@thesvg/react/css3";
import Dotnet from "@thesvg/react/dotnet";
import Go from "@thesvg/react/go";
import Html from "@thesvg/react/html5";
import Java from "@thesvg/react/java";
import JavaScript from "@thesvg/react/javascript";
import Nodejs from "@thesvg/react/nodedotjs";
import Npm from "@thesvg/react/npm";
import Php from "@thesvg/react/php";
import Pnpm from "@thesvg/react/pnpm";
import Python from "@thesvg/react/python";
import ReactMark from "@thesvg/react/react";
import Ruby from "@thesvg/react/ruby";
import TypeScript from "@thesvg/react/typescript";
import Yarn from "@thesvg/react/yarn";

export type BrandName =
  | "bun"
  | "css"
  | "dotnet"
  | "go"
  | "html"
  | "java"
  | "javascript"
  | "nodejs"
  | "npm"
  | "php"
  | "pnpm"
  | "python"
  | "react"
  | "ruby"
  | "typescript"
  | "yarn";

/**
 * Yarn's brand blue. theSVG's Yarn file is a disc (`.st0`) and the cat (`.st1`) whose colours came
 * from a stylesheet it no longer carries, so both paint `currentColor`; the disc takes the blue
 * from `color` and the cat is filled white again.
 */
const YARN_BLUE = "#2C8EBB";

/**
 * Go's brand cyan. theSVG's full-colour Go drawings are the wide wordmark, in white or black; the
 * square mark is its `mono` drawing, which paints `currentColor`.
 */
const GO_BLUE = "#00ADD8";

/**
 * .NET's purple and PHP's lilac. theSVG draws both square marks in `currentColor` (PHP's
 * full-colour drawing is its wide oval wordmark), so they take the brand colour from `color`.
 */
const DOTNET_PURPLE = "#512BD4";
const PHP_LILAC = "#777BB4";

/**
 * A tool's own logo in its brand colours, from theSVG, legible on either theme. Where a logo has
 * a drawing per background (pnpm's grey squares, React's two blues) both are rendered and the
 * `.dark` class shows the right one, as BrandMark does for the Qeet logo — no client JavaScript,
 * no flash. `data-brand` keeps surrounding styles (the sidebar's icon tint) off the logo's colours.
 */
export function BrandLogo({
  name,
  className,
}: {
  name: BrandName;
  className?: string;
}) {
  // theSVG's mono drawings carry a <title>; with no pointer events the hover reaches the control
  // around the logo, so the title never shows as a tooltip (the logo is aria-hidden either way).
  const props = {
    "aria-hidden": true,
    "data-brand": "",
    className: cn("pointer-events-none", className),
  } as const;
  switch (name) {
    case "bun":
      return <Bun {...props} />;
    case "npm":
      return <Npm {...props} />;
    case "typescript":
      return <TypeScript {...props} />;
    case "javascript":
      return <JavaScript {...props} />;
    case "css":
      return <Css {...props} />;
    case "html":
      return <Html {...props} />;
    case "nodejs":
      return <Nodejs {...props} />;
    case "go":
      return <Go {...props} variant="mono" style={{ color: GO_BLUE }} />;
    case "python":
      return <Python {...props} />;
    case "java":
      return <Java {...props} />;
    case "ruby":
      return <Ruby {...props} />;
    case "dotnet":
      return <Dotnet {...props} style={{ color: DOTNET_PURPLE }} />;
    case "php":
      return <Php {...props} variant="mono" style={{ color: PHP_LILAC }} />;
    case "yarn":
      return (
        <Yarn
          {...props}
          className={cn("pointer-events-none [&_.st1]:fill-white", className)}
          style={{ color: YARN_BLUE }}
        />
      );
    case "pnpm":
      return (
        <>
          <Pnpm
            {...props}
            variant="light"
            className={cn("pointer-events-none dark:hidden", className)}
          />
          <Pnpm
            {...props}
            variant="dark"
            className={cn("pointer-events-none hidden dark:block", className)}
          />
        </>
      );
    case "react":
      return (
        <>
          <ReactMark
            {...props}
            variant="light"
            className={cn("pointer-events-none dark:hidden", className)}
          />
          <ReactMark
            {...props}
            variant="dark"
            className={cn("pointer-events-none hidden dark:block", className)}
          />
        </>
      );
  }
}
