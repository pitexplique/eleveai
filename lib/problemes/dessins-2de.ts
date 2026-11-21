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
