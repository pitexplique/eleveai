// Petits outils de dessin pour les énigmes de l'école (CM2, 20/11/2026).
// Ils n'écrivent que les couleurs de la palette COULEURS (types.ts) : la page
// les convertit seule pour le fond ardoise. Un dessin = svg(label, corps).
import { COULEURS } from "./types";

export const C = COULEURS;
/** Espace insécable, pour « ? » et « : » écrits dans un dessin. */
export const NB = " ";

type Ancre = "start" | "middle" | "end";

/** Le dessin complet, 480 × 420 par défaut. */
export const svg = (label: string, corps: string, h = 420) =>
  `<svg viewBox="0 0 480 ${h}" role="img" aria-label="${label}">${corps}</svg>`;

/** Un texte. */
export const t = (x: number, y: number, s: string | number, c: string = C.craie, taille = 28, ancre: Ancre = "middle") =>
  `<text x="${x}" y="${y}" fill="${c}" font-size="${taille}" text-anchor="${ancre}">${s}</text>`;

/** Un rectangle teinté (op = opacité du remplissage, 0 = vide). */
export const r = (x: number, y: number, l: number, h: number, c: string = C.craie, op = 0.2, ep = 3, rx = 0) =>
  `<rect x="${x}" y="${y}" width="${l}" height="${h}" rx="${rx}" fill="${op ? c : "none"}" fill-opacity="${op}" stroke="${c}" stroke-width="${ep}"/>`;

/** Un segment (tirets = « 8 6 » pour pointillés). */
export const l = (x1: number, y1: number, x2: number, y2: number, c: string = C.craie, ep = 4, tirets = "") =>
  `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="${ep}" stroke-linecap="round"${tirets ? ` stroke-dasharray="${tirets}"` : ""}/>`;

/** Un chemin libre (op > 0 : rempli). */
export const p = (d: string, c: string = C.craie, ep = 4, op = 0) =>
  `<path d="${d}" fill="${op ? c : "none"}" fill-opacity="${op}" stroke="${c}" stroke-width="${ep}" stroke-linejoin="round" stroke-linecap="round"/>`;

/** Un cercle. */
export const o = (cx: number, cy: number, rayon: number, c: string = C.craie, op = 0, ep = 4) =>
  `<circle cx="${cx}" cy="${cy}" r="${rayon}" fill="${op ? c : "none"}" fill-opacity="${op}" stroke="${c}" stroke-width="${ep}"/>`;

/** Un quadrillage de nx × ny carreaux de côté pas. */
export const grille = (x: number, y: number, nx: number, ny: number, pas: number, c: string = C.pale, ep = 1.5) => {
  let s = "";
  for (let i = 0; i <= nx; i++) s += l(x + i * pas, y, x + i * pas, y + ny * pas, c, ep);
  for (let j = 0; j <= ny; j++) s += l(x, y + j * pas, x + nx * pas, y + j * pas, c, ep);
  return s;
};

/** Une flèche horizontale ou oblique de (x1, y1) à (x2, y2). */
export const fleche = (x1: number, y1: number, x2: number, y2: number, c: string = C.rose, ep = 4) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const k = 14;
  const g = (d: number) => `${(x2 - k * Math.cos(a + d)).toFixed(1)} ${(y2 - k * Math.sin(a + d)).toFixed(1)}`;
  return l(x1, y1, x2, y2, c, ep) + p(`M${g(0.5)} L${x2} ${y2} L${g(-0.5)}`, c, ep);
};

/** Une droite graduée de x0 à x1 (px), valeurs v0 → v1, une graduation tous les pasV, étiquette tous les pasE. */
export const droiteGraduee = (y: number, x0: number, x1: number, v0: number, v1: number, pasV: number, pasE: number, c: string = C.craie) => {
  let s = l(x0 - 10, y, x1 + 16, y, c, 3);
  const n = Math.round((v1 - v0) / pasV);
  for (let k = 0; k <= n; k++) {
    const v = v0 + k * pasV;
    const x = x0 + ((x1 - x0) * k) / n;
    const grande = Math.abs(v / pasE - Math.round(v / pasE)) < 1e-9;
    s += l(x, y - (grande ? 12 : 7), x, y + (grande ? 12 : 7), c, grande ? 3 : 2);
    if (grande) s += t(x, y + 40, String(Math.round(v * 1000) / 1000).replace(".", ","), c, 20);
  }
  return s;
};

/** Une ellipse. */
export const ell = (cx: number, cy: number, rx: number, ry: number, c: string = C.craie, op = 0, ep = 4) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${op ? c : "none"}" fill-opacity="${op}" stroke="${c}" stroke-width="${ep}"/>`;

/** Un disque partagé en n parts égales, les k premières coloriées. */
export const secteurs = (cx: number, cy: number, rayon: number, n: number, k: number, c: string = C.jaune) => {
  let s = "";
  for (let i = 0; i < n; i++) {
    const a1 = (2 * Math.PI * i) / n - Math.PI / 2, a2 = (2 * Math.PI * (i + 1)) / n - Math.PI / 2;
    const P = (a: number) => `${(cx + rayon * Math.cos(a)).toFixed(1)} ${(cy + rayon * Math.sin(a)).toFixed(1)}`;
    s += `<path d="M${cx} ${cy} L${P(a1)} A${rayon} ${rayon} 0 0 1 ${P(a2)} Z" fill="${i < k ? c : "none"}" fill-opacity="${i < k ? 0.45 : 0}" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>`;
  }
  return s;
};

/** Une bande partagée en n parts égales, les k premières coloriées. */
export const bande = (x: number, y: number, largeur: number, h: number, n: number, k: number, c: string = C.bleu) => {
  let s = "";
  for (let i = 0; i < n; i++) s += r(x + (largeur * i) / n, y, largeur / n, h, i < k ? c : C.craie, i < k ? 0.4 : 0, 3);
  return s;
};

/** Un disque partagé en parts égales, une couleur par part (« » = vide). */
export const secteursCouleurs = (cx: number, cy: number, rayon: number, couleurs: string[]) => {
  const n = couleurs.length;
  return couleurs.map((c, i) => {
    const a1 = (2 * Math.PI * i) / n - Math.PI / 2, a2 = (2 * Math.PI * (i + 1)) / n - Math.PI / 2;
    const P = (a: number) => `${(cx + rayon * Math.cos(a)).toFixed(1)} ${(cy + rayon * Math.sin(a)).toFixed(1)}`;
    return `<path d="M${cx} ${cy} L${P(a1)} A${rayon} ${rayon} 0 0 1 ${P(a2)} Z" fill="${c || "none"}" fill-opacity="${c ? 0.45 : 0}" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>`;
  }).join("");
};
