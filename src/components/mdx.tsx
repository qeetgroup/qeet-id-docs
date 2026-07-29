import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { IdentityModel } from "@/components/docs/identity-model";

/**
 * MDX component registry.
 *
 * `defaultMdxComponents` already supplies headings, links, tables, Cards,
 * Callout and the Shiki code blocks (with copy button + `title=`/line-highlight
 * support). We extend it with the rest of the Fumadocs authoring set so any
 * page can use them, and swap `img` for the zoomable variant.
 *
 * These are Fumadocs' docs-native components rather than the Qeetrix marketing
 * primitives: they integrate with the docs pipeline (TOC, code tabs, search)
 * and are already painted in the Qeet ID brand via the `--color-fd-*` → Qeetrix
 * token bridge in `global.css`, so they stay visually consistent.
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tabs,
    Tab,
    Steps,
    Step,
    Accordion,
    Accordions,
    Files,
    File,
    Folder,
    TypeTable,
    IdentityModel,
    img: (props) => (
      <ImageZoom {...(props as ComponentProps<typeof ImageZoom>)} />
    ),
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
