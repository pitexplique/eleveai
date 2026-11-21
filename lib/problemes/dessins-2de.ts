// Petits outils de dessin pour les énigmes de seconde (21/11/2026) : un repère
// gradué et le tracé d'une courbe. Seulement la palette COULEURS (types.ts).
import { C, t, l, p } from "./dessins-ecole";

export type Repere = {
  X: (v: number) => number;
  Y: (v: number) => number;
  /** Quadrillage, axes, graduations (une étiquette tous les `pasE`). */
  fond: string;
  /** La courbe de f entre a et b. */
  courbe: (f: (x: number) => number, a: number, b: number, c?: string, ep?: number) => string;
  /** Un point plein. */
  point: (x: number, y: number, c?: string, rayon?: number) => string;
};

/** Repère [x0 ; x1] × [y0 ; y1] dans la boîte (gx, gy, gl, gh) en pixels. */
export const repere = (
  x0: number, x1: number, y0: number, y1: number,
  { gx = 50, gy = 30, gl = 400, gh = 360, pas = 1, pasE = 1, etiquettes = true } = {}
): Repere => {
  const X = (v: number) => +(gx + ((v - x0) / (x1 - x0)) * gl).toFixed(1);
  const Y = (v: number) => +(gy + gh - ((v - y0) / (y1 - y0)) * gh).toFixed(1);
  let fond = "";
  for (let v = Math.ceil(x0 / pas) * pas; v <= x1 + 1e-9; v += pas) fond += l(X(v), gy, X(v), gy + gh, C.pale, 1);
  for (let v = Math.ceil(y0 / pas) * pas; v <= y1 + 1e-9; v += pas) fond += l(gx, Y(v), gx + gl, Y(v), C.pale, 1);
  const ox = x0 <= 0 && 0 <= x1 ? X(0) : gx, oy = y0 <= 0 && 0 <= y1 ? Y(0) : gy + gh;
  fond += l(gx, oy, gx + gl + 8, oy, C.craie, 3) + l(ox, gy + gh, ox, gy - 8, C.craie, 3);
  if (etiquettes) {
    const ecrit = (v: number) => String(+v.toFixed(2)).replace("-", "−").replace(".", ",");
    for (let v = Math.ceil(x0 / pasE) * pasE; v <= x1 + 1e-9; v += pasE)
      if (Math.abs(v) > 1e-9) fond += l(X(v), oy - 6, X(v), oy + 6, C.craie, 2) + t(X(v), oy + 24, ecrit(v), C.pale, 17);
    for (let v = Math.ceil(y0 / pasE) * pasE; v <= y1 + 1e-9; v += pasE)
      if (Math.abs(v) > 1e-9) fond += l(ox - 6, Y(v), ox + 6, Y(v), C.craie, 2) + t(ox - 10, Y(v) + 6, ecrit(v), C.pale, 17, "end");
    fond += t(ox - 10, oy + 22, "0", C.pale, 17, "end");
  }
  const courbe = (f: (x: number) => number, a: number, b: number, c: string = C.bleu, ep = 4) => {
    let d = "";
    const n = 80;
    for (let k = 0; k <= n; k++) {
      const x = a + ((b - a) * k) / n;
      d += `${k ? "L" : "M"}${X(x)} ${Y(f(x))} `;
    }
    return p(d.trim(), c, ep);
  };
  const point = (x: number, y: number, c: string = C.rose, rayon = 8) => `<circle cx="${X(x)}" cy="${Y(y)}" r="${rayon}" fill="${c}"/>`;
  return { X, Y, fond, courbe, point };
};

/** Un tableau : `cols` = largeurs des colonnes, `h` = hauteur d'une ligne.
 *  `cellules[i][j]` = texte ; `couleur(i, j)` choisit sa couleur (craie par défaut). */
export const tableau = (
  x: number, y: number, cols: number[], h: number, cellules: (string | number)[][],
  couleur: (i: number, j: number) => string = () => C.craie, taille = 22
) => {
  const L = cols.reduce((a, b) => a + b, 0), H = h * cellules.length;
  let s = "";
  for (let i = 0; i <= cellules.length; i++) s += l(x, y + i * h, x + L, y + i * h, C.craie, i === 0 || i === cellules.length ? 3 : 2);
  let cx = x;
  for (let j = 0; j <= cols.length; j++) {
    s += l(cx, y, cx, y + H, C.craie, j === 0 || j === cols.length ? 3 : 2);
    if (j < cols.length) cx += cols[j];
  }
  cellules.forEach((ligne, i) => {
    let gx = x;
    ligne.forEach((v, j) => {
      if (v !== "") s += t(gx + cols[j] / 2, y + i * h + h / 2 + taille * 0.35, v, couleur(i, j), taille);
      gx += cols[j];
    });
  });
  return s;
};

/** Un arbre à deux niveaux, racine à gauche. `n1` = [nom, proba] ×2 ;
 *  `n2[k]` = les deux branches issues du nœud k (nom, proba), écrites à droite de x2. */
export const arbre2 = (
  n1: [string, string][], n2: [string, string][][],
  { x0 = 40, x1 = 200, x2 = 360, yh = 40, yb = 330, taille = 20, c = C.craie, cp = C.bleu } = {}
) => {
  const ym = (yh + yb) / 2, q = (yb - yh) / 4;
  const y1 = [ym - q, ym + q];
  const y2 = [yh, yh + q * 1.4, yb - q * 1.4, yb];
  let s = "";
  n1.forEach(([nom, pr], k) => {
    const demi = nom.length * (taille + 2) * 0.3 + 8;
    s += l(x0 + 10, ym, x1 - demi, y1[k], c, 2.5) + t(x1, y1[k] + 7, nom, c, taille + 2) + t((x0 + x1) / 2 - 14, (ym + y1[k]) / 2 + (k ? 28 : -14), pr, cp, taille);
    n2[k].forEach(([nom2, pr2], m) => {
      const yy = y2[2 * k + m];
      s += l(x1 + demi, y1[k], x2 - 8, yy, c, 2.5) + t(x2, yy + 7, nom2, c, taille + 2, "start") + t((x1 + x2) / 2, (y1[k] + yy) / 2 + (m ? 24 : -10), pr2, cp, taille);
    });
  });
  return s;
};
