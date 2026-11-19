// Petits outils pour écrire les problèmes : une fraction en étage (HTML ou SVG).
// Les 6e lisent mal « 3/8 » sur une ligne : on l'écrit en étage, comme au tableau.

import { COULEURS } from "./types";

/** Une fraction en étage dans le texte (question, réponse). */
export const frac = (n: string | number, d: string | number) =>
  `<span class="frac"><span>${n}</span><span>${d}</span></span>`;

/** Une fraction en étage dans un dessin SVG, centrée sur x, barre à la hauteur y. */
export const svgFrac = (
  x: number,
  y: number,
  n: string | number,
  d: string | number,
  couleur: string = COULEURS.craie,
  taille = 30
) =>
  `<text x="${x}" y="${y - 6}" fill="${couleur}" font-size="${taille}" text-anchor="middle">${n}</text>` +
  `<path d="M${x - taille * 0.55} ${y} L${x + taille * 0.55} ${y}" stroke="${couleur}" stroke-width="3" stroke-linecap="round"/>` +
  `<text x="${x}" y="${y + taille * 0.95}" fill="${couleur}" font-size="${taille}" text-anchor="middle">${d}</text>`;
