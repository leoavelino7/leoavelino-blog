import { useEffect, useRef, useState } from "react";
import { PrismAsyncLight } from "react-syntax-highlighter";
import classnames from "classnames";
import codeStyle from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";

import { slugify } from "../lib/helpers";
import Link from "next/link";

type HeadingTag = `h${2 | 3 | 4 | 5 | 6}`;

const Heading = ({
  noLink,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & { tag: HeadingTag; noLink: boolean }) => {
  const Tag = props.tag;
  const [text, setText] = useState("");
  const spanRef = useRef<HTMLSpanElement>(null);
  const _noLink = noLink ?? false;

  useEffect(() => {
    if (!spanRef.current) return;
    setText(slugify(spanRef.current.innerText));
  }, []);

  if (_noLink) {
    return (
      <Tag {...props}>
        <span className="font-extrabold no-underline group text-gray-600 hover:text-gray-700">{props.children}</span>
      </Tag>
    );
  }

  return (
    <Tag {...props} id={props.id ?? text}>
      <Link className="font-extrabold no-underline group text-gray-600 hover:text-gray-700" href={`#${text}`}>
        <span aria-hidden="true" className="inline-block opacity-90 transition-opacity duration-75 ease-linear group-hover:opacity-100 mr-2">
          #
        </span>
        <span ref={spanRef}>{props.children}</span>
      </Link>
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
      "bg-neutral text-paper rounded-md p-1": true
    });
    return <span className={className}>{content}</span>;
  },
  p: (props) => <p className="leading-loose text-lg text-gray-700 my-3">{props.children}</p>,
  a: (props) => (
    <a
      className="text-primary underline cursor-pointer opacity-90 transition-opacity duration-75 ease-linear hover:opacity-100"
      href={props.href}
      target="_blank"
    >
      {props.children}
    </a>
  ),
  ul: (props) => <ul className="flex flex-col gap-3 ml-8 list-disc">{props.children}</ul>,
  ol: (props) => <ul className="flex flex-col gap-3 ml-8 list-decimal">{props.children}</ul>,
  blockquote: (props) => {
    return <div className="my-4 border-gray-600 border-solid border-l-4 py-1 px-3 bg-yellow-100 rounded-md">{props.children}</div>;
  },
  pre: (props) => {
    const { className, children } = props.children.props;
    const lang = (className ?? "").replace("language-", "");
    return (
      <PrismAsyncLight showLineNumbers language={lang} className="text-md" style={{ ...codeStyle }}>
        {children.trim()}
      </PrismAsyncLight>
    );
  },
  h2: (props) => <Heading {...props} tag="h2" className="text-3xl md:text-4xl mt-12 mb-3" />,
  h3: (props) => <Heading {...props} tag="h3" className="text-2xl md:text-3xl mt-12 mb-3" />,
  h4: (props) => <Heading {...props} tag="h4" className="text-xl md:text-2xl mt-8 mb-3" />,
  h5: (props) => <Heading {...props} noLink tag="h5" className="text-lg md:text-xl mt-8 mb-3" />,
  h6: (props) => <Heading {...props} noLink tag="h6" className="text-md md:text-lg mt-8 mb-3" />
};
