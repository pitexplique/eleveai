"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

type Props = {
  content: string;
};

function formatBlogMarkdown(md: string) {
  let out = md;

  // ✅ Ligne vide AVANT les séparateurs --- / ---- / -----
  out = out.replace(/\n([ \t]*-{3,}[ \t]*)\n/g, "\n\n$1\n");

  // ✅ Colorer "## 1) ..." (numéro principal)
  out = out.replace(
    /^##\s+(\d+\))\s+/gm,
    `## <span class="num-main">$1</span> `
  );

  // ✅ Colorer "### 1.1 ..." (sous-numéro)
  out = out.replace(
    /^###\s+(\d+\.\d+)\s+/gm,
    `### <span class="num-sub">$1</span> `
  );

  return out;
}

export default function BlogMarkdownMath({ content }: Props) {
  const formatted = formatBlogMarkdown(content);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      components={{
        p: ({ children }) => <p className="mb-2">{children}</p>,
        hr: () => <hr className="my-8 border-slate-700/60" />,
      }}
      className="prose prose-invert max-w-none"
    >
      {formatted}
    </ReactMarkdown>
  );
}
