// Petits outils de dessin pour les énigmes de première sans spé (21/11/2026) :
// un repère dont les pas diffèrent en x et en y, une ligne brisée, des barres,
// une boîte à moustaches. Seulement la palette COULEURS (types.ts).
import { C, t, l, p, r } from "./dessins-ecole";
import type { Repere } from "./dessins-2de";

/** Un nombre écrit à la française : virgule, « − », espace des milliers. */
export const ecrit = (v: number) => {
  const s = String(+v.toFixed(3)).replace("-", "−").replace(".", ",");
  const [e, d] = s.split(",");
  const signe = e.startsWith("−") ? "−" : "";
  const n = e.replace("−", "");
  const g = n.length > 3 ? n.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : n;
  return signe + g + (d ? "," + d : "");
};

/** Repère [x0 ; x1] × [y0 ; y1] : quadrillage tous les px (en x) et py (en y),
 *  étiquettes tous les ex et ey. Le « 0 » de l'origine n'est écrit que si
 *  les deux axes passent par 0. */
export const repereXY = (
  x0: number, x1: number, y0: number, y1: number,
  { gx = 90, gy = 30, gl = 350, gh = 290, px = 1, py = 1, ex = 0, ey = 0, etiquettes = true, quadrillage = true }: { gx?: number; gy?: number; gl?: number; gh?: number; px?: number; py?: number; ex?: number; ey?: number; etiquettes?: boolean; quadrillage?: boolean } = {}
): Repere => {
  ex = ex || px; ey = ey || py;
  const X = (v: number) => +(gx + ((v - x0) / (x1 - x0)) * gl).toFixed(1);
  const Y = (v: number) => +(gy + gh - ((v - y0) / (y1 - y0)) * gh).toFixed(1);
  let fond = "";
  if (quadrillage) {
    for (let v = Math.ceil(x0 / px - 1e-9) * px; v <= x1 + 1e-9; v += px) fond += l(X(v), gy, X(v), gy + gh, C.pale, 1);
    for (let v = Math.ceil(y0 / py - 1e-9) * py; v <= y1 + 1e-9; v += py) fond += l(gx, Y(v), gx + gl, Y(v), C.pale, 1);
  }
  const zx = x0 <= 0 && 0 <= x1, zy = y0 <= 0 && 0 <= y1;
  const ox = zx ? X(0) : gx, oy = zy ? Y(0) : gy + gh;
  fond += l(gx, oy, gx + gl + 8, oy, C.craie, 3) + l(ox, gy + gh, ox, gy - 8, C.craie, 3);
  if (etiquettes) {
    for (let v = Math.ceil(x0 / ex - 1e-9) * ex; v <= x1 + 1e-9; v += ex)
      if (!(zx && Math.abs(v) < 1e-9)) fond += l(X(v), oy - 6, X(v), oy + 6, C.craie, 2) + t(X(v), oy + 24, ecrit(v), C.pale, 17);
    for (let v = Math.ceil(y0 / ey - 1e-9) * ey; v <= y1 + 1e-9; v += ey)
      if (!(zy && Math.abs(v) < 1e-9)) fond += l(ox - 6, Y(v), ox + 6, Y(v), C.craie, 2) + t(ox - 10, Y(v) + 6, ecrit(v), C.pale, 17, "end");
    if (zx && zy) fond += t(ox - 10, oy + 22, "0", C.pale, 17, "end");
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

/** Une ligne brisée par des points. */
export const brisee = (R: Repere, pts: [number, number][], c: string = C.bleu, ep = 5) =>
  p(pts.map(([x, y], k) => `${k ? "L" : "M"}${R.X(x)} ${R.Y(y)}`).join(" "), c, ep);

/** Une barre de x à x + larg, de y = base jusqu'à y = v. */
export const barre = (R: Repere, x: number, larg: number, v: number, c: string = C.bleu, base = 0, op = 0.35) =>
  r(R.X(x), R.Y(v), R.X(x + larg) - R.X(x), R.Y(base) - R.Y(v), c, op, 3);

/** Une boîte à moustaches horizontale, à la hauteur y (pixels), d'épaisseur h. */
export const boite = (R: Repere, y: number, [mi, q1, me, q3, ma]: number[], c: string = C.bleu, h = 44) =>
  l(R.X(mi), y, R.X(q1), y, c, 3) + l(R.X(q3), y, R.X(ma), y, c, 3) +
  l(R.X(mi), y - h / 4, R.X(mi), y + h / 4, c, 3) + l(R.X(ma), y - h / 4, R.X(ma), y + h / 4, c, 3) +
  r(R.X(q1), y - h / 2, R.X(q3) - R.X(q1), h, c, 0.25, 3) + l(R.X(me), y - h / 2, R.X(me), y + h / 2, C.rose, 4);

/** Un secteur de disque, de l'angle a0 à a1 en degrés (0° = en haut, sens des aiguilles). */
export const secteur = (cx: number, cy: number, rayon: number, a0: number, a1: number, c: string = C.bleu, op = 0.35) => {
  const pt = (a: number) => [+(cx + rayon * Math.sin((a * Math.PI) / 180)).toFixed(1), +(cy - rayon * Math.cos((a * Math.PI) / 180)).toFixed(1)];
  const [xa, ya] = pt(a0), [xb, yb] = pt(a1);
  return p(`M${cx} ${cy} L${xa} ${ya} A${rayon} ${rayon} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${xb} ${yb} Z`, c, 3, op);
};

/** Le point au milieu d'un secteur, à la distance d du centre (pour une étiquette). */
export const dansSecteur = (cx: number, cy: number, d: number, a0: number, a1: number): [number, number] => {
  const a = (((a0 + a1) / 2) * Math.PI) / 180;
  return [+(cx + d * Math.sin(a)).toFixed(1), +(cy - d * Math.cos(a)).toFixed(1)];
};
