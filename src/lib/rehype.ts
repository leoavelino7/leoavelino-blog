import { createElement, Fragment } from "react";
import { MdxComponents } from "../components/MdxComponents";

export const rehype = async (text: string) => {
  const { unified } = await import("unified");
  const rehypeParse = await import("rehype-parse");
  const rehypeReact = await import("rehype-react");
  return unified()
    .use(rehypeParse.default as any, { fragment: true })
    .use(rehypeReact.default as any, {
      createElement,
      Fragment,
      components: MdxComponents
    })
    .process(text);
};
