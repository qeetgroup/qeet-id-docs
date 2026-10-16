import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { Callout } from "./docs/callout";
import {
  CodeBlock,
  CodeTab,
  CodeTabs,
  CodeTabsList,
  CodeTabsTrigger,
} from "./docs/code-block";
import { IdentityModel } from "./docs/identity-model";
import { Sdk, SdkTab, SdkTabs } from "./sdk/sdk-tabs";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    // Code, tabbed code and callouts in the site's own frames (src/components/docs).
    pre: (props) => <CodeBlock {...props} />,
    CodeBlockTabs: CodeTabs,
    CodeBlockTabsList: CodeTabsList,
    CodeBlockTabsTrigger: CodeTabsTrigger,
    CodeBlockTab: CodeTab,
    Callout,
    // The rest of Fumadocs' authoring set, and a zoomable image.
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
    img: (props) => (
      <ImageZoom {...(props as ComponentProps<typeof ImageZoom>)} />
    ),
    IdentityModel,
    // The chosen SDK's code and notes (src/components/sdk).
    SdkTabs,
    SdkTab,
    Sdk,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
