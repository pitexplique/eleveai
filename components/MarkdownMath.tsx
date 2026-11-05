"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// ⭐ LA CSS DE KATEX SE CHARGE ICI, PAS DANS LE LAYOUT (29/08/2026).
//
// Elle était importée par `app/layout.tsx`, donc servie en BLOQUANT LE RENDU sur
// les 450+ pages du site — l'accueil, /programme, les simulateurs, les cahiers,
// alors qu'aucune n'affiche de formule. PageSpeed le mesurait ce matin : 36,2 KiB
// de CSS bloquante, 440 ms estimés, et un FCP de 1,9 s en ORANGE chez les vrais
// visiteurs (le seul indicateur de champ qui ne passait pas au vert).
//
// ⚠️ CE N'EST PAS UNE SUPPRESSION, C'EST UN DÉPLACEMENT. Next rattache la CSS
// importée par un composant aux seules routes qui l'embarquent : le coach maths
// (`app/coach/serie/*`), le parcours (`app/parcours/*`), les évaluations nationales,
// le concours Avenir et le kit de survie continuent de la recevoir, dans le HTML
// initial et non après coup. Aucun `next/dynamic` dans le dépôt : rien n'arrive
// en différé, donc pas de formule qui s'affiche nue avant de se styler.
//
// ⛔ NE PAS RETIRER CETTE LIGNE en croyant qu'une autre la couvre : les trois
// autres points de rendu (TexteMath, BlogMarkdownMath, app/blog/[slug]) ont
// CHACUN la leur. Un composant qui rend du KaTeX importe sa CSS, sans exception —
// c'est ce qui permet de ne plus jamais la remettre dans le layout.
import "katex/dist/katex.min.css";

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
 * ⛔ « ? » SEUL EN DÉBUT DE LIGNE, « 7 » PUIS « dm » À LA LIGNE (05/11/2026, captures
 * à 375 px). Les banques écrivent une espace ordinaire : le téléphone coupait là,
 * et le « ? » ou le « » » se retrouvait seul sur sa ligne. On pose donc des espaces
 * insécables à l'affichage, jamais dans les formules ni dans le code, et sans toucher
 * aux banques : leurs textes restent ceux que les correcteurs relisent.
 */
const NBSP = "\u00a0";
const UNITE = "(?:km|dm|cm|mm|m|mL|cL|dL|L|kg|mg|g|min|ms|h|s|ans|pas)(?:[²³]|(?![\\wàâéèêîôû’'])|$)|[%€°]";
const AVANT_UNITE = new RegExp(`(^|\\d) (?=${UNITE})`, "g");

function espacesInsecables(texte: string): string {
  return texte
    .split(/(\$\$[\s\S]*?\$\$|\$[^$]*\$|`[^`]*`)/)
    .map((morceau, i) =>
      i % 2 === 1
        ? morceau
        : morceau
            .replace(/ ([?!;:»%])/g, `${NBSP}$1`)
            .replace(/« /g, `«${NBSP}`)
            .replace(/(\d) (?=\d{3}(?!\d))/g, `$1${NBSP}`)
            .replace(AVANT_UNITE, `$1${NBSP}`)
            .replace(/\b(angle|point|dessin|segment|droite|place|découpe|horloge) ([A-Z0-9])(?![\wà-ÿ])/g, `$1${NBSP}$2`),
    )
    .join("");
}

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
      {espacesInsecables(children)}
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
