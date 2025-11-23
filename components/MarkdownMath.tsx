"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type MarkdownMathProps = {
  children: string;
};

export function MarkdownMath({ children }: MarkdownMathProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({ children }) => <p className="mb-2">{children}</p>,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
