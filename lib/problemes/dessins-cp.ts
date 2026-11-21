// Petits outils de dessin pour les énigmes du CP (21/11/2026). Au CP, le
// DESSIN porte l'information : des objets à compter, des cartes, des dés.
// Seulement les couleurs de la palette COULEURS (types.ts).
import { C, t, r, o, l, p } from "./dessins-ecole";

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

/** Une balance à deux plateaux. penche : -1 = la gauche descend, 0 = équilibre,
 *  1 = la droite descend. gauche/droite dessinent le contenu, posé en (x, y). */
export const balance = (
  gauche: (x: number, y: number) => string,
  droite: (x: number, y: number) => string,
  penche: -1 | 0 | 1,
  cx = 240,
  cy = 150
) => {
  const d = penche === -1 ? 30 : penche === 1 ? -30 : 0;
  const xg = cx - 150, xd = cx + 150, yg = cy + d, yd = cy - d;
  const plateau = (x: number, y: number) =>
    l(x, y, x - 55, y + 70, C.pale, 2) + l(x, y, x + 55, y + 70, C.pale, 2) +
    p(`M${x - 70} ${y + 70} Q${x} ${y + 95} ${x + 70} ${y + 70} Z`, C.craie, 3, 0.15);
  return (
    p(`M${cx} ${cy} L${cx - 40} ${cy + 190} L${cx + 40} ${cy + 190} Z`, C.pale, 3, 0.2) +
    l(xg, yg, xd, yd, C.craie, 5) + o(cx, cy, 7, C.craie, 1, 0) +
    plateau(xg, yg) + plateau(xd, yd) + gauche(xg, yg + 62) + droite(xd, yd + 62)
  );
};

/** Des petits cubes empilés en ligne, posés sur y (le bas). */
export const cubes = (n: number, x: number, y: number, cote = 22, c: string = C.bleu) => {
  let s = "";
  const x0 = x - (Math.min(n, 4) * cote) / 2;
  for (let i = 0; i < n; i++) s += r(x0 + (i % 4) * cote, y - cote - Math.floor(i / 4) * cote, cote, cote, c, 0.35, 2, 2);
  return s;
};
