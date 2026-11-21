// Petits outils de dessin pour les énigmes du CP (21/11/2026). Au CP, le
// DESSIN porte l'information : des objets à compter, des cartes, des dés.
// Seulement les couleurs de la palette COULEURS (types.ts).
import { C, t, r, o } from "./dessins-ecole";

/** Une rangée de n objets (emoji), de gauche à droite. */
export const rang = (objet: string, n: number, x0: number, y: number, pas = 50, taille = 40) => {
  let s = "";
  for (let i = 0; i < n; i++) s += t(x0 + i * pas, y, objet, C.craie, taille);
  return s;
};

/** n objets rangés en lignes de parLigne. */
export const tas = (objet: string, n: number, x0: number, y0: number, parLigne = 5, pas = 50, taille = 40) => {
  let s = "";
  for (let i = 0; i < n; i++) s += t(x0 + (i % parLigne) * pas, y0 + Math.floor(i / parLigne) * pas, objet, C.craie, taille);
  return s;
};

/** Une carte avec un nombre (ou « ? »), centrée sur x. */
export const carte = (x: number, y: number, v: string | number, c: string = C.craie, l = 70) =>
  r(x - l / 2, y - l / 2, l, l, c, 0.15, 3, 10) + t(x, y + 12, String(v), c, 34);

/** Une face de dé (1 à 6), centrée sur (x, y). */
export const de = (x: number, y: number, n: number, cote = 80) => {
  const k = cote / 4;
  const P: Record<number, [number, number][]> = {
    1: [[0, 0]],
    2: [[-1, -1], [1, 1]],
    3: [[-1, -1], [0, 0], [1, 1]],
    4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
    6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
  };
  return r(x - cote / 2, y - cote / 2, cote, cote, C.craie, 0, 3, 12) + P[n].map(([a, b]) => o(x + a * k, y + b * k, 7, C.craie, 1, 0)).join("");
};
