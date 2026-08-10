import type { CSSProperties } from "react";

/**
 * LES COULEURS DE LA RUBRIQUE « ÉVALUATIONS NATIONALES ».
 *
 * LE PAPIER JOURNAL S'EN VA (Frédéric, 09/08 : « cette page demande un fond
 * fun », puis « fais pareil pour les pages filles »). Le crème `#f6f1e4` et ses
 * filets noirs venaient de l'accueil-journal, qui n'est plus rendu depuis le
 * 06/08 : le hub ET ses quatre épreuves portaient les habits d'un journal
 * disparu, pour parler à des 6ᵉ et des 4ᵉ la semaine de la rentrée.
 *
 * On reprend la palette de l'île déjà tranchée le 02/08 — SES mots : boucan
 * canot, flamboyant, canne, safran péi — et sa règle : la couleur PORTE, elle
 * ne décore pas. Ici elle porte l'épreuve, du hub jusqu'au bilan : une carte
 * safran sur le hub ouvre une épreuve safran. L'encre ne bouge pas.
 *
 * ⚠️ CE FICHIER EST LA SEULE SOURCE. Le hub (composant serveur) et
 * `EpreuveClient` (composant client) l'importent tous les deux — deux copies
 * de la palette divergeraient au premier ajustement, et l'accord de couleur
 * entre la carte et l'épreuve est justement ce qui fait tenir la rubrique.
 */

/** Le boucan canot dilué de l'accueil, encore éclairci. */
export const CIEL = "#e7f4f7";
export const INK = "#1d1c16";

export const BOUCAN = "#0e7490";
export const FLAMBOYANT = "#bf3b1e";
export const CANNE = "#3f6b0c";
export const SAFRAN = "#a34c07";

/**
 * Une couleur par épreuve, jamais deux voisines identiques dans la grille du
 * hub (l'ordre y est 6ᵉ FR · 6ᵉ maths · 4ᵉ FR · 4ᵉ maths).
 */
export const ACCENTS: Record<string, string> = {
  "6e-francais": BOUCAN,
  "6e-maths": FLAMBOYANT,
  "4e-francais": CANNE,
  "4e-maths": SAFRAN,
};

/** Le repli sur le boucan couvre une épreuve ajoutée sans sa couleur. */
export function accentDe(slug: string): string {
  return ACCENTS[slug] ?? BOUCAN;
}

/**
 * Le fond : quatre lavis de l'île très dilués + le quadrillage d'un cahier
 * par-dessus. Aucune image, aucun octet téléchargé — que du CSS, sur des pages
 * qui doivent s'ouvrir vite en septembre.
 *
 * ⚠️ L'ORDRE COMPTE : la première couche est celle du DESSUS (le quadrillage),
 * et `backgroundSize` se lit dans le même ordre.
 */
export const FOND: CSSProperties = {
  backgroundColor: CIEL,
  backgroundImage: [
    "linear-gradient(rgba(29,28,22,0.045) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(29,28,22,0.045) 1px, transparent 1px)",
    "radial-gradient(58rem 40rem at 88% -8%, rgba(163,76,7,0.20), transparent 62%)",
    "radial-gradient(52rem 38rem at -8% 14%, rgba(14,116,144,0.24), transparent 62%)",
    "radial-gradient(46rem 34rem at 16% 108%, rgba(63,107,12,0.18), transparent 62%)",
    "radial-gradient(42rem 32rem at 104% 92%, rgba(191,59,30,0.16), transparent 62%)",
  ].join(", "),
  backgroundSize: "30px 30px, 30px 30px, auto, auto, auto, auto",
  color: INK,
};
