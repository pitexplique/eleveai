"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type MarkdownMathProps = {
  children: string;
  /** Classe CSS appliquée au conteneur (porte le style du texte). */
  className?: string;
  /**
   * Rendu en ligne : les paragraphes deviennent des <span> sans marge,
   * pour insérer une formule dans un bouton, un libellé, etc.
   */
  inline?: boolean;
};

/**
 * Rend du texte contenant éventuellement des formules LaTeX ($...$ ou $$...$$).
 *
 * Rétro-compatible : un texte sans `$` est rendu tel quel (texte simple).
 * On peut donc l'utiliser partout sans réécrire les banques existantes en
 * Unicode ; seules les banques écrites en LaTeX bénéficient du rendu KaTeX.
 */
export function MarkdownMath({ children, className, inline = false }: MarkdownMathProps) {
  const content = (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({ children }) =>
          inline ? <span>{children}</span> : <p className="mb-2 last:mb-0">{children}</p>,
      }}
    >
      {children}
    </ReactMarkdown>
  );

  if (inline) {
    return <span className={className}>{content}</span>;
  }

  if (className) {
    return <div className={className}>{content}</div>;
  }

  return content;
}

export default MarkdownMath;
