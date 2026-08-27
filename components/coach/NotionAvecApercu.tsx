"use client";

// components/coach/NotionAvecApercu.tsx
//
// UNE NOTION DE LA PAGE DU COACH, QUI MONTRE SON EXERCICE AU SURVOL.
//
// ── LE CHIFFRE QUI JUSTIFIE CE COMPOSANT ─────────────────────────────────────
// Frédéric, 27/08/2026 : « un élève sur deux quitte le coach et ne va pas sur
// tutor ». La page liste des titres — « Nombres relatifs », « Angles » — et la
// moitié des gens n'y donnent pas suite. Un titre ne dit pas ce qu'on va FAIRE :
// ni si c'est un cours ou un exercice, ni à quoi ressemble l'écran d'après.
//
// Le pari est celui déjà tenu sur les cartes de l'accueil : montrer AVANT le
// clic. C'est la même fenêtre (FenetreApercu.tsx), les mêmes règles de
// non-coût — rien ne se charge tant que la souris n'est pas passée, rien sous
// 1024 px, rien au doigt, rien pour une notion sans capture.
//
// ⚠️ CE QU'ON PHOTOGRAPHIE N'EST PAS CETTE PAGE. La capture montre le TUTOR,
// c'est-à-dire l'écran d'après — l'exercice qui attend. C'est tout l'intérêt :
// l'aperçu répond à « et si je clique, il se passe quoi ? ».
// La fabrique est scripts/capturer-apercus-coach.ts.
//
// ⚠️ POURQUOI UN COMPOSANT, ET PAS QUELQUES LIGNES DANS LA PAGE. Chaque notion
// a besoin de son propre état de survol, et les notions sont rendues dans un
// `.map()`. Des hooks dans une boucle, c'est interdit ; un composant par notion,
// c'est la façon normale de le dire.

import { useState } from "react";
import FenetreApercu, { type Libelle } from "@/components/matrice/FenetreApercu";
import { apercuNotion } from "@/lib/tutor-v4/apercus.generated";

/**
 * La condition du survol — lue AU MOMENT du survol, jamais au rendu (le serveur
 * n'a pas de `window`, et React reprocherait au client de dire autre chose).
 *
 * `any-hover` et non `hover` : sur un portable à écran tactile, le pointeur
 * PRINCIPAL peut être le tactile, et `hover` répond alors `none` — l'aperçu ne
 * se montait jamais sur les Samsung. `any-hover` demande « est-ce qu'AU MOINS UN
 * pointeur sait survoler ». Un portable tactile répond oui, un téléphone non.
 *
 * ⚠️ 1024 px, c'est le `lg:block` de FenetreApercu. Le CSS décide de ce qui se
 * VOIT, ce test décide de ce qui se CHARGE. Si l'un bouge, l'autre bouge avec.
 */
function peutSurvoler() {
  return typeof window !== "undefined"
    ? window.matchMedia("(any-hover: hover) and (min-width: 1024px)").matches
    : false;
}

/**
 * CE QUE DIT L'EN-TÊTE DE CHAQUE ÉCRAN (Frédéric, 27/08 : « et si on rajoutait
 * en en-tête Mode complet / Mode simple ? »).
 *
 * ⚠️ LE NOMBRE D'ÉCRANS SUFFIT À SAVOIR LESQUELS, et ce n'est pas une devinette :
 * c'est la règle de fabrication (scripts/capturer-apercus-coach.ts). Une notion
 * dont la classe ouvre en vue complète est capturée deux fois, la vue par défaut
 * d'abord — donc deux écrans, toujours dans cet ordre. Une classe qui n'a que la
 * vue simple (le primaire, les niveaux du CECRL) n'en a qu'un, et c'est la
 * simple. Il n'y a pas de troisième cas.
 *
 * ⛔ Ne pas remplacer ça par un champ dans le manifeste « pour être sûr » : un
 * chiffre recopié à deux endroits finit par se contredire, alors qu'ici les deux
 * faits n'en sont qu'un.
 */
const MODE_SIMPLE: Libelle = {
  texte: "Mode simple",
  icone: "une-question",
  // L'olive du badge « testée en classe » : la couleur du travail relu.
  fond: "#ecf2e2",
  encre: "#3f6b0c",
};
const MODE_COMPLET: Libelle = {
  texte: "Mode complet",
  icone: "manette",
  // L'indigo du bandeau de mission du tutor — c'est l'écran qu'on montre.
  fond: "#e6e8fb",
  encre: "#4338ca",
};

/**
 * ⚠️ L'ORDRE SUIT CELUI DE LA CAPTURE, ET RIEN NE LE VÉRIFIE.
 *
 * Le mode COMPLET est en premier, parce que c'est l'ordre des aperçus publiés
 * (`--ordre=complet-simple`, le défaut de scripts/capturer-apercus-coach.ts).
 *
 * ⛔ SI L'ORDRE DES VUES CHANGE LÀ-BAS, IL DOIT CHANGER ICI. Rien ne relie les
 * deux à part cette note : une pastille qui annonce « Mode complet » au-dessus
 * d'un écran simple ne se voit dans aucun test, seulement à l'œil.
 *
 * ── ARBITRAGE EN COURS AU 27/08/2026 ─────────────────────────────────────────
 * Trois montages ont été fabriqués et comparés en images sur une notion chacun :
 *   complet → simple        le plus FIDÈLE : le premier écran est celui que le
 *                           clic ouvre vraiment (c'est l'ordre actuel) ;
 *   simple → complet        le plus CONVAINCANT : une question posée d'abord,
 *                           mais elle montre un écran que le clic ne donne pas ;
 *   complet → invitation    finit sur « Prêt pour une question ? » et son bouton
 *                           vert, donc sur une porte plutôt que sur des devoirs.
 * Frédéric réfléchit. Tant que ce n'est pas tranché, on ne bouge NI l'ordre de
 * capture NI celui-ci — les deux se déplacent ensemble ou pas du tout.
 */
const LIBELLES: Record<number, Libelle[]> = {
  1: [MODE_SIMPLE],
  2: [MODE_COMPLET, MODE_SIMPLE],
};

export default function NotionAvecApercu({
  matiere,
  classe,
  notionId,
  children,
}: {
  matiere: string;
  classe: string;
  notionId: string;
  children: React.ReactNode;
}) {
  const apercu = apercuNotion(matiere, classe, notionId);

  /**
   * DEUX ÉTATS, ET PAS UN.
   * `montee` : la fenêtre a été demandée au moins une fois, et reste montée —
   *   l'image reste alors dans le cache et un second survol est instantané.
   * `ouverte` : la souris est dessus en ce moment ; c'est ce booléen qui pilote
   *   l'opacité et le minuteur des pastilles.
   * Les fusionner ferait recharger l'image à chaque aller-retour de souris dans
   * une liste qui en compte vingt.
   */
  const [montee, setMontee] = useState(false);
  const [ouverte, setOuverte] = useState(false);

  function survoler() {
    if (!apercu || !peutSurvoler()) return;
    setMontee(true);
    setOuverte(true);
  }

  return (
    <article
      className="relative"
      onMouseEnter={survoler}
      onMouseLeave={() => setOuverte(false)}
      onFocus={survoler}
      onBlur={() => setOuverte(false)}
    >
      {children}
      {/* ⚠️ La fenêtre se pose SOUS le titre, alignée à droite du bloc de la
          notion. Deux raisons : le titre — ce qu'on survole — reste lisible, et
          elle ne sort jamais du bloc, donc jamais de la page. Les cartes de
          l'accueil, elles, la centrent sur leur bord droit : c'est pour ça que
          la position est un paramètre et non une constante du composant. */}
      {montee && apercu && (
        <FenetreApercu
          src={apercu.src}
          ecrans={apercu.ecrans}
          ouverte={ouverte}
          position="absolute right-0 top-9"
          libelles={LIBELLES[apercu.ecrans] ?? LIBELLES[1]}
        />
      )}
    </article>
  );
}
