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

// ─── La ponctuation soudée à sa formule (22/09/2026) ───────────────────────────
//
// ⛔ LE DÉFAUT. À 360 px, le point de « $f(2) = 3$. » ou la virgule de « donne
// $+$, un nombre » passait SEUL en tête de la ligne suivante : 21 cas sur 1 091
// formules suivies d'une ponctuation, sur trois feuilles et trois fiches de
// seconde. Même chose, à l'envers, pour « répondre « $10$ » » : le guillemet
// ouvrant restait seul en fin de ligne (2 sur 18).
//
// ⭐ LA CAUSE. KaTeX découpe une formule en `.base`, des `inline-block` — c'est
// ce qui lui permet de passer à la ligne après un `=` ou un `+`. Or CSS Text
// impose une occasion de coupure avant et après toute boîte `inline-block`,
// « même à côté d'un caractère qui l'interdit d'ordinaire ». Chrome l'applique
// et décide de cette coupure avec le `white-space` du parent DIRECT de la
// boîte. D'où deux échecs mesurés, chacun à 21 sur 1 091, zéro gagné :
//   · un joint de mot U+2060 après la formule — Chrome coupe quand même ;
//   · un `nowrap` autour de la formule entière ET du point, la formule remise
//     en `normal` dedans pour garder ses coupures — la dernière `.base` a pour
//     parent un `normal`, la coupure est permise, et elle glisse derrière les
//     balises fermantes jusque devant le point.
//
// ⭐ LA SOLUTION MESURÉE : 0 sur 1 091. La dernière `.base` passe dans une
// seconde `.katex`, et cette seconde formule est soudée au point dans un
// `nowrap`. La coupure après un `=` au milieu de la formule reste possible,
// seule celle d'avant le point disparaît. Visuellement rien ne bouge : chaque
// `.base` porte ses propres espacements et son `strut`, deux `.katex` côte à
// côte se lisent comme une seule. Même geste, symétrique, pour la première
// `.base` et le guillemet ouvrant.
//
// ⛔ JAMAIS `nowrap` SUR TOUTE LA FORMULE : une longue formule deviendrait
// insécable et déborderait à 360 px (la leçon du `\left[ \right]` de la feuille
// des réels). Ici, seule la dernière `.base` est soudée — elle l'était déjà.

/** Ponctuation fermante en tête du texte qui suit, avec l'insécable que `insecables()` a pu poser devant `:`, `;`, `?`, `!`, `»`. */
const PONCTUATION_APRES = /^(?:[\u00A0\u202F]?[.,;:!?…)\]»])+/;
/** Ponctuation ouvrante en fin du texte qui précède : `(`, `[`, ou `«` et son insécable. */
const PONCTUATION_AVANT = /(?:[(\[«][\u00A0\u202F]?)+$/;

const TETE_KATEX = '<span class="katex"><span class="katex-html" aria-hidden="true">';
const QUEUE_KATEX = "</span></span>";

/**
 * Les `.base` de premier niveau d'une formule rendue par KaTeX, ou `null` si le
 * balisage n'a pas la forme attendue (formule en erreur, `\\`, autre version de
 * KaTeX…) — la formule est alors rendue d'un bloc, comme avant.
 */
function basesDe(html: string): string[] | null {
  if (!html.startsWith(TETE_KATEX) || !html.endsWith(QUEUE_KATEX)) return null;
  const corps = html.slice(TETE_KATEX.length, html.length - QUEUE_KATEX.length);
  const bases: string[] = [];
  const balise = /<span\b|<\/span>/g;
  let profondeur = 0;
  let debut = 0;
  for (let m = balise.exec(corps); m; m = balise.exec(corps)) {
    if (m[0] !== "</span>") {
      if (profondeur === 0 && (m.index !== debut || !corps.startsWith('<span class="base">', m.index)))
        return null;
      profondeur++;
    } else if (--profondeur === 0) {
      bases.push(corps.slice(debut, balise.lastIndex));
      debut = balise.lastIndex;
    } else if (profondeur < 0) return null;
  }
  return profondeur === 0 && debut === corps.length && bases.length > 0 ? bases : null;
}

function Formule({ bases }: { bases: string[] }) {
  return <span dangerouslySetInnerHTML={{ __html: TETE_KATEX + bases.join("") + QUEUE_KATEX }} />;
}

type Morceau =
  | { math: false; texte: string }
  | { math: true; source: string; html: string | null; bases: string[] | null; avant: string; apres: string };

export default function TexteMath({ children }: { children: string }) {
  // Le cas de loin le plus fréquent : un texte sans formule. Il ne reste que la
  // typographie à poser.
  if (!children || !children.includes("$")) return <>{insecables(children)}</>;

  const morceaux: Morceau[] = decouper(children).map((m) => {
    // ⚠️ La typographie ne s'applique QU'AUX morceaux littéraux : dans une
    // formule, `:` et `!` sont des opérateurs et KaTeX doit les recevoir
    // intacts.
    if (!m.math) return { math: false, texte: insecables(m.contenu) };
    let html: string | null;
    try {
      html = katex.renderToString(m.contenu, {
        throwOnError: false,
        displayMode: false,
        output: "html",
      });
    } catch {
      // Une formule illisible ne doit jamais faire tomber une fiche entière :
      // on retombe sur le texte source, entre ses dollars.
      html = null;
    }
    return { math: true, source: m.contenu, html, bases: html ? basesDe(html) : null, avant: "", apres: "" };
  });

  // Chaque formule découpable prend à ses voisins la ponctuation qui la touche.
  morceaux.forEach((m, i) => {
    if (!m.math || !m.bases) return;
    const prec = morceaux[i - 1];
    const suiv = morceaux[i + 1];
    if (suiv && !suiv.math) {
      m.apres = suiv.texte.match(PONCTUATION_APRES)?.[0] ?? "";
      suiv.texte = suiv.texte.slice(m.apres.length);
    }
    if (prec && !prec.math) {
      m.avant = prec.texte.match(PONCTUATION_AVANT)?.[0] ?? "";
      prec.texte = prec.texte.slice(0, prec.texte.length - m.avant.length);
    }
  });

  return (
    <>
      {morceaux.map((m, i) => {
        if (!m.math) return m.texte ? <React.Fragment key={i}>{m.texte}</React.Fragment> : null;
        if (m.html === null) return <React.Fragment key={i}>{`$${m.source}$`}</React.Fragment>;
        if (m.bases && (m.avant || m.apres)) {
          const b = m.bases;
          // Une seule `.base` : la formule entière est soudée, elle l'était déjà.
          if (b.length === 1)
            return (
              <span key={i} className="whitespace-nowrap">
                {m.avant || null}
                <Formule bases={b} />
                {m.apres || null}
              </span>
            );
          const debut = m.avant ? 1 : 0;
          const fin = m.apres ? b.length - 1 : b.length;
          return (
            <React.Fragment key={i}>
              {m.avant ? (
                <span className="whitespace-nowrap">
                  {m.avant}
                  <Formule bases={b.slice(0, 1)} />
                </span>
              ) : null}
              {fin > debut ? <Formule bases={b.slice(debut, fin)} /> : null}
              {m.apres ? (
                <span className="whitespace-nowrap">
                  <Formule bases={b.slice(-1)} />
                  {m.apres}
                </span>
              ) : null}
            </React.Fragment>
          );
        }
        // ⚠️ 09/09/2026 — J'AI FAILLI AJOUTER ICI `inline-block whitespace-nowrap`.
        // Frédéric voyait « Le vecteur AB » puis une flèche SEULE à la ligne
        // suivante, sur toutes les fiches. J'ai conclu que le navigateur coupait
        // la formule entre la base et son accent, et j'ai corrigé ce span.
        //
        // ⛔ C'ÉTAIT UN MAUVAIS DIAGNOSTIC. Mesure dans la console de la page :
        // ZÉRO règle `.katex` chargée, et `getComputedStyle(.katex).fontFamily`
        // valait `Arial` au lieu de `KaTeX_Main`. La feuille de KaTeX manquait —
        // le défaut connu du cache `.next` corrompu, pas un problème de balisage.
        // Sans elle, la pile `vlist` qui pose l'accent au-dessus de la lettre
        // n'est plus positionnée : la flèche retombe en flux et passe à la ligne.
        // 👉 `Remove-Item -Recurse -Force .next` puis redémarrage : 228 règles
        // reviennent, et 0 formule coupée sur 164.
        //
        // ⭐ LA LEÇON : avant de durcir un rendu, vérifier que sa FEUILLE DE
        // STYLE est là. Un symptôme de mise en page a une cause de mise en page,
        // et la CSS absente en est une — voir la note du 01/09 sur les radicaux
        // de 400 em.
        return <span key={i} dangerouslySetInnerHTML={{ __html: m.html }} />;
      })}
    </>
  );
}
