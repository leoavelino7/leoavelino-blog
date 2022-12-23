import { useEffect, useRef, useState } from "react";
import { PrismAsyncLight } from "react-syntax-highlighter";
import classnames from "classnames";
import codeStyle from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";

import { slugify } from "../lib/helpers";

type HeadingTag = `h${2 | 3 | 4 | 5 | 6}`;

const Heading = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > & { tag: HeadingTag }
) => {
  const Tag = props.tag;
  const [text, setText] = useState("");
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!spanRef.current) return;
    setText(slugify(spanRef.current.innerText));
  }, []);

  return (
    <Tag {...props} id={props.id ?? text}>
      <a
        className="font-extrabold no-underline group text-gray-600 hover:text-gray-700"
        href={`#${text}`}
      >
        <span
          aria-hidden="true"
          className="inline-block opacity-90 transition-opacity duration-75 ease-linear group-hover:opacity-100 mr-2"
        >
          #
        </span>
        <span ref={spanRef}>{props.children}</span>
      </a>
    </Tag>
  );
};

export const MdxComponents: Record<string, (props: any) => JSX.Element> = {
  code: (props) => {
    let isItalic = false;
    let isBold = false;

    const content = props.children
      .replace(/_(.*)_/gim, (originalText: string, newText: string) => {
        isItalic = originalText !== newText;
        return newText;
      })
      .replace(/\*\*(.*)\*\*/gim, (originalText: string, newText: string) => {
        isBold = originalText !== newText;
        return newText;
      });

    const className = classnames({
      "font-bold": isBold,
      italic: isItalic,
      "bg-gray-100 p-1 text-md": true,
    });
    return <span className={className}>{content}</span>;
  },
  p: (props) => (
    <p className="leading-8 text-lg text-gray-700 my-7">{props.children}</p>
  ),
  a: (props) => (
    <a className="text-gray-700 underline italic cursor-pointer opacity-90 transition-opacity duration-75 ease-linear hover:opacity-100">
      {props.children}
    </a>
  ),
  blockquote: (props) => (
    <div className=" border-gray-600 border-solid border-l-4 pl-3">
      {props.children}
    </div>
  ),
  pre: (props) => {
    const { className, children } = props.children.props;
    const lang = (className ?? "").replace("language-", "");
    return (
      <PrismAsyncLight
        showLineNumbers
        language={lang}
        className="text-md"
        style={{ ...codeStyle }}
      >
        {children.trim()}
      </PrismAsyncLight>
    );
  },
  h2: (props) => (
    <Heading {...props} tag="h2" className="text-3xl md:text-4xl my-3" />
  ),
  h3: (props) => (
    <Heading {...props} tag="h3" className="text-2xl md:text-3xl my-3" />
  ),
  h4: (props) => (
    <Heading {...props} tag="h4" className="text-xl md:text-2xl my-3" />
  ),
  h5: (props) => (
    <Heading {...props} tag="h5" className="text-lg md:text-xl my-3" />
  ),
  h6: (props) => (
    <Heading {...props} tag="h6" className="text-md md:text-lg my-3" />
  ),
};
