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
            .replace(/(\d h) (?=\d)/g, `$1${NBSP}`) // « 2 h » puis « 30 » à la ligne
            .replace(/\b(angle|point|dessin|segment|droite|place|découpe|horloge) ([A-Z0-9])(?![\wà-ÿ])/g, `$1${NBSP}$2`),
    )
    .join("");
}

/**
 * ⛔ « NH = » PUIS « 21 cm » À LA LIGNE (06/11/2026, captures à 375 px). KaTeX autorise
 * une coupure après chaque relation : on la retire avec `\nobreak`, tant que la
 * formule tient d'un bloc. Au-delà de LARGEUR_D_UN_BLOC signes depuis la dernière
 * coupure possible, on la garde, sinon une chaîne d'égalités déborde du téléphone :
 * mesuré dans le coach, la loi des sinus sortait de l'écran sous 300 px à 24 signes.
 * 18 signes tiennent sur un écran de 320 px (256 px de texte).
 */
const LARGEUR_D_UN_BLOC = 18;
const SIGNES_D_UNE_RELATION = 2; // le signe et ses espaces
const RELATION = /^(?:[=<>]|\\(?:approx|simeq|equiv|leqslant|geqslant|leq?|geq?|neq?|in)(?![a-zA-Z]))/;
const OPERATEUR = /^(?:[+-]|\\(?:times|cdot|div|pm)(?![a-zA-Z]))/;

const signesAffiches = (membre: string) =>
  membre
    .replace(/\\(?:[dt]?frac|text|math[a-z]+|left|right|sqrt|widehat|overline|operatorname)(?![a-zA-Z])/g, "")
    .replace(/\\[a-zA-Z]+/g, "xx") // \times, \cos, la flèche d'un vecteur… : autour de deux signes
    .replace(/[\\{}^_\s]/g, "").length;

function relationsNonCoupees(formule: string): string {
  if (formule.includes("\\begin")) return formule; // les tableaux ne se coupent pas
  // Les membres et ce qui les sépare, en alternance, hors de toute accolade.
  const morceaux = [""];
  let profondeur = 0;
  for (let i = 0; i < formule.length; i++) {
    const reste = formule.slice(i);
    const separateur = profondeur === 0 ? (RELATION.exec(reste) ?? OPERATEUR.exec(reste))?.[0] : undefined;
    if (separateur) {
      morceaux.push(separateur, "");
      i += separateur.length - 1;
      continue;
    }
    const commande = /^\\(?:[a-zA-Z]+|.)/.exec(reste)?.[0] ?? formule[i];
    if (commande === "{") profondeur++;
    if (commande === "}") profondeur--;
    morceaux[morceaux.length - 1] += commande;
    i += commande.length - 1;
  }
  let bloc = signesAffiches(morceaux[0]);
  return morceaux
    .map((morceau, i) => {
      if (i % 2 === 0) return morceau;
      const suivant = signesAffiches(morceaux[i + 1]);
      // KaTeX peut couper après un opérateur : le bloc repart de là.
      if (!OPERATEUR.test(morceau) && bloc + SIGNES_D_UNE_RELATION + suivant <= LARGEUR_D_UN_BLOC) {
        bloc += SIGNES_D_UNE_RELATION + suivant;
        return `${morceau}\\nobreak `;
      }
      bloc = suivant;
      return morceau;
    })
    .join("");
}

/** Les formules en ligne seulement : une formule centrée n'est jamais coupée par KaTeX. */
function formulesNonCoupees(texte: string): string {
  return texte.replace(/\$\$[\s\S]*?\$\$|\$[^$]*\$|`[^`]*`/g, (morceau) =>
    morceau.startsWith("$") && !morceau.startsWith("$$")
      ? `$${relationsNonCoupees(morceau.slice(1, -1))}$`
      : morceau,
  );
}

/**
 * ⛔ « x² » PUIS « . Calcule » À LA LIGNE (06/11/2026, captures à 375 px). Pour Chrome,
 * une formule KaTeX est un bloc insécable : il coupe juste après, même devant un point
 * ou une espace insécable. On enferme donc la formule et ce qui doit lui rester collé
 * dans un `white-space: nowrap`.
 *
 * ⚠️ Une longue formule doit pouvoir encore se couper après un opérateur, entre ses
 * morceaux `.base`. Mesuré dans Chrome : ce qui décide de la coupure après un morceau,
 * c'est le `white-space` de son parent direct. Remettre `normal` sur toute la formule
 * rouvre donc la coupure devant la ponctuation : seuls les morceaux d'avant le dernier
 * sont regroupés sous `normal`.
 */
type NoeudHtml = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: NoeudHtml[];
};
const COLLE_A_LA_FORMULE = /^(?: [^ \t\n]*|[.,;:!?…)\]»%]+)/;

const aLaClasse = (noeud: NoeudHtml, classe: string) => {
  const classes = noeud.properties?.className;
  return Array.isArray(classes) && classes.includes(classe);
};

function longueFormuleSecable(formule: NoeudHtml): void {
  const rendu = formule.children?.find((enfant) => aLaClasse(enfant, "katex-html"));
  const morceaux = rendu?.children ?? [];
  if (!rendu || morceaux.length < 2 || !morceaux.every((m) => aLaClasse(m, "base"))) return;
  rendu.children = [
    {
      type: "element",
      tagName: "span",
      properties: { style: "white-space:normal" },
      children: morceaux.slice(0, -1),
    },
    morceaux[morceaux.length - 1],
  ];
}

function collerLaPonctuation(noeud: NoeudHtml): void {
  const enfants = noeud.children;
  if (!enfants) return;
  for (let i = enfants.length - 1; i >= 0; i--) {
    const enfant = enfants[i];
    if (enfant.tagName !== "span" || !aLaClasse(enfant, "katex")) {
      collerLaPonctuation(enfant);
      continue;
    }
    const suite = enfants[i + 1];
    const colle = suite?.type === "text" ? COLLE_A_LA_FORMULE.exec(suite.value ?? "")?.[0] : undefined;
    if (!colle || !suite) continue;
    suite.value = (suite.value ?? "").slice(colle.length);
    longueFormuleSecable(enfant);
    enfants[i] = {
      type: "element",
      tagName: "span",
      properties: { style: "white-space:nowrap" },
      children: [enfant, { type: "text", value: colle }],
    };
  }
}

const ponctuationCollee = () => (arbre: unknown) => collerLaPonctuation(arbre as NoeudHtml);

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
      rehypePlugins={[rehypeKatex, ponctuationCollee]}
      components={{
        p: ({ children }) =>
          inline ? <span>{children}</span> : <p className="mb-2 last:mb-0">{children}</p>,
      }}
    >
      {formulesNonCoupees(espacesInsecables(children))}
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
