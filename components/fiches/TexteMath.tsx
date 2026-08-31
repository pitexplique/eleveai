"use client";

// ─── Le texte d'une fiche, avec ses formules ───────────────────────────────────
//
// Frédéric, 26/08/2026 : « pour les fractions utilise au mieux l'écriture
// mathématique, évite 2/3 ».
//
// ⛔ LE PROBLÈME. `FicheCoursClient` affichait le TEXTE BRUT. Écrire
// `$\frac{2}{3}$` dans une fiche montrait donc le code à l'élève. La fiche pilote
// du lycée (`maths-premiere-derivation.tsx`) contournait en écrivant tout en
// Unicode — ce qui marche pour `x²` et `√x`, mais pas pour une fraction : il n'y
// a pas de glyphe pour 6/15, ni pour 3/7.
//
// ⭐ POURQUOI PAS `MarkdownMath`, QUI EXISTE DÉJÀ. Il fait deux choses : il rend
// le LaTeX, et il interprète le MARKDOWN. La seconde est le risque : cent neuf
// fiches sont déjà écrites, et un `*`, un `_` ou un `#` au milieu d'une phrase y
// changerait silencieusement d'aspect. Ici on ne veut qu'une chose.
//
// ⭐ CE COMPOSANT EST DONC L'IDENTITÉ SUR UN TEXTE SANS `$`. Il découpe sur les
// paires de dollars et ne confie à KaTeX que ce qui est entre elles ; tout le
// reste ressort tel quel, au caractère près. Les fiches écrites avant lui ne
// bougent pas d'un pixel — c'est vérifiable en comptant les `$` : aucune n'en
// contient dans un texte affiché (les seules occurrences sont des `${…}` de
// gabarits, dans le code).
//
// ⚠️ Un `$` orphelin ne casse rien : faute de fermeture, le morceau est rendu
// comme du texte. C'est le même choix que `verifier-banque.mjs`, qui signale les
// dollars non appariés sans faire échouer le rendu.

// ⭐ CE COMPOSANT EST AUSSI L'ENDROIT DE LA TYPOGRAPHIE (31/08/2026). Il est déjà
// le passage obligé de tout texte de fiche affiché — vingt-six appels dans
// `FicheCoursClient`, plus les légendes de dessins des fiches de maths. Poser
// l'espace insécable ici la pose donc partout, sans toucher une seule fiche.
// La mesure qui a décidé de cette méthode est dans `lib/fiches/typographie.ts`.
import React from "react";
import katex from "katex";
import { insecables } from "@/lib/fiches/typographie";
// La CSS de KaTeX suit le composant qui la rend, et non plus le layout (voir
// l'explication complète dans `components/MarkdownMath.tsx`). Sans cette ligne,
// `renderToString` ci-dessous produit son balisage mais les fractions sortent à
// plat — c'est-à-dire exactement le « 2/3 » que ce composant existe pour éviter.
import "katex/dist/katex.min.css";

/** Découpe un texte en morceaux littéraux et en formules `$…$`. */
function decouper(texte: string): { math: boolean; contenu: string }[] {
  const morceaux: { math: boolean; contenu: string }[] = [];
  let reste = texte;

  while (reste.length > 0) {
    const debut = reste.indexOf("$");
    if (debut === -1) {
      morceaux.push({ math: false, contenu: reste });
      break;
    }
    const fin = reste.indexOf("$", debut + 1);
    if (fin === -1) {
      // Dollar orphelin : on rend tout le reste en texte.
      morceaux.push({ math: false, contenu: reste });
      break;
    }
    if (debut > 0) morceaux.push({ math: false, contenu: reste.slice(0, debut) });
    morceaux.push({ math: true, contenu: reste.slice(debut + 1, fin) });
    reste = reste.slice(fin + 1);
  }

  return morceaux;
}

export default function TexteMath({ children }: { children: string }) {
  // Le cas de loin le plus fréquent : un texte sans formule. Il ne reste que la
  // typographie à poser.
  if (!children || !children.includes("$")) return <>{insecables(children)}</>;

  return (
    <>
      {decouper(children).map((m, i) => {
        // ⚠️ La typographie ne s'applique QU'AUX morceaux littéraux : dans une
        // formule, `:` et `!` sont des opérateurs et KaTeX doit les recevoir
        // intacts.
        if (!m.math)
          return <React.Fragment key={i}>{insecables(m.contenu)}</React.Fragment>;
        let html: string;
        try {
          html = katex.renderToString(m.contenu, {
            throwOnError: false,
            displayMode: false,
            output: "html",
          });
        } catch {
          // Une formule illisible ne doit jamais faire tomber une fiche entière :
          // on retombe sur le texte source, entre ses dollars.
          return <React.Fragment key={i}>{`$${m.contenu}$`}</React.Fragment>;
        }
        return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </>
  );
}
