// Petits outils de dessin pour les énigmes de terminale (21/11/2026) : un repère
// de l'espace en perspective cavalière (x vers le bas à gauche, y à droite,
// z vers le haut). Seulement la palette COULEURS (types.ts).
import { C, t, l } from "./dessins-ecole";

export type Espace = {
  /** Le point (x ; y ; z) en pixels. */
  P: (x: number, y: number, z: number) => [number, number];
  /** Les trois axes, gradués d'un petit trait tous les 1, avec x, y, z et O. */
  axes: (lx: number, ly: number, lz: number) => string;
  /** Un segment entre deux points de l'espace. */
  seg: (a: number[], b: number[], c?: string, ep?: number, tirets?: string) => string;
  /** Un point plein, avec son nom écrit à côté (dx, dy en pixels). */
  pt: (a: number[], nom?: string, c?: string, dx?: number, dy?: number, taille?: number) => string;
};

/** Repère de l'espace d'origine (ox, oy), k pixels par unité ; la fuite des x
 *  vaut `fuite` × k, à 45°. */
export const espace = (ox: number, oy: number, k: number, fuite = 0.5): Espace => {
  const c45 = Math.SQRT1_2;
  const P = (x: number, y: number, z: number): [number, number] =>
    [+(ox + y * k - x * k * fuite * c45).toFixed(1), +(oy - z * k + x * k * fuite * c45).toFixed(1)];
  const seg = (a: number[], b: number[], c: string = C.craie, ep = 3, tirets = "") => {
    const [x1, y1] = P(a[0], a[1], a[2]), [x2, y2] = P(b[0], b[1], b[2]);
    return l(x1, y1, x2, y2, c, ep, tirets);
  };
  const axes = (lx: number, ly: number, lz: number) => {
    let s = seg([0, 0, 0], [lx, 0, 0], C.pale, 2.5) + seg([0, 0, 0], [0, ly, 0], C.pale, 2.5) + seg([0, 0, 0], [0, 0, lz], C.pale, 2.5);
    const [xx, xy] = P(lx, 0, 0), [yx, yy] = P(0, ly, 0), [zx, zy] = P(0, 0, lz), [o1, o2] = P(0, 0, 0);
    s += t(xx - 10, xy + 20, "x", C.pale, 20) + t(yx + 14, yy + 7, "y", C.pale, 20) + t(zx, zy - 10, "z", C.pale, 20) + t(o1 - 14, o2 + 6, "O", C.pale, 18);
    return s;
  };
  const pt = (a: number[], nom = "", c: string = C.rose, dx = 12, dy = -10, taille = 20) => {
    const [x, y] = P(a[0], a[1], a[2]);
    return `<circle cx="${x}" cy="${y}" r="6" fill="${c}"/>` + (nom ? t(x + dx, y + dy, nom, c, taille, dx < 0 ? "end" : "start") : "");
  };
  return { P, axes, seg, pt };
};

/** Un vecteur dans le texte (question, réponse) : la flèche au-dessus du nom. */
export const vec = (nom: string) =>
  `<span style="position:relative;display:inline-block">${nom}<span style="position:absolute;left:0;right:0;top:-0.55em;text-align:center;font-size:.8em">→</span></span>`;

/** Un vecteur dans un dessin : le nom (centré sur x) et une petite flèche au-dessus. */
export const vecS = (x: number, y: number, nom: string, c: string = C.craie, taille = 24) => {
  const d = nom.length * taille * 0.3 + 2, h = y - taille * 0.95;
  return t(x, y, nom, c, taille) + l(x - d, h, x + d, h, c, 2) + l(x + d - 5, h - 4, x + d, h, c, 2) + l(x + d - 5, h + 4, x + d, h, c, 2);
};

/** Un indice dans un texte de dessin : « u » puis l'indice, puis la suite du texte
 *  (à écrire dans un t() : `${ind("u", "n+1", " = 2")}`). */
export const ind = (lettre: string, indice: string | number, suite = "") =>
  `${lettre}<tspan dy="7" font-size="16">${indice}</tspan><tspan dy="-7"${suite.startsWith(" ") ? ` dx="6"` : ""}>${suite.replace(/^ /, "")}</tspan>`;
