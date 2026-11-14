// OUTILS DES GABARITS « SYMÉTRIE » CM1 (14/11/2026).
//
// ⛔ Le quadrillage du canvas `transformation` n'a AUCUN nombre écrit : un élève
// de CM1 ne lit pas « la droite x = 4 » ni « le point (2 ; 3) ». Tout se dit en
// CARREAUX comptés depuis l'axe, à gauche / à droite, au-dessus / au-dessous.
// ⭐ Les pièges = vraies erreurs : la figure qui GLISSE au lieu de se retourner,
// les carreaux comptés depuis le BORD de la feuille au lieu de l'axe, la figure
// retournée dans le mauvais sens (tête en bas), l'axe OBLIQUE traité comme un
// axe vertical, le rectangle « à 4 axes » (ses diagonales n'en sont pas).
// ⭐ Chaque gabarit tire une SITUATION (objet, métier) × une TOURNURE : le
// squelette change même quand les lettres sont neutralisées (`--lettres`).
// Les coordonnées du canvas : x vers la droite, y vers le BAS (SVG).

import type { TransformationCanvasData } from "@/lib/tutor-v4/types";
import { cap, entre, melange, un } from "./trous-outils";

export { cap, entre, melange, un };

export type Pt = { x: number; y: number };

/* ═════════════════ mots ═════════════════ */

export const car = (n: number) => (n === 1 ? "1 carreau" : `${n} carreaux`);

const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Lila"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Bilal", "Jules"];

/** Une situation de vie : l'objet dessiné et le métier de qui le dessine. */
type Sit = { o: string; m: readonly [string, string] | null };
const S = (o: string, m: readonly [string, string] | null = null): Sit => ({ o, m });

// ⛔ La Réunion : 1 situation sur 25 (le lambrequin de la case créole), 4 %.
export const SITUATIONS: readonly Sit[] = [
  S("le papillon de la fresque", ["peintre", "peintre"]),
  S("le masque de carnaval", ["costumière", "costumier"]),
  S("le logo du club de foot", ["graphiste", "graphiste"]),
  S("la rosace du vitrail", ["verrière", "verrier"]),
  S("le motif du carrelage", ["carreleuse", "carreleur"]),
  S("le drapeau de l'équipe"),
  S("le cerf-volant de la fête"),
  S("la fusée en carton"),
  S("la couronne de la galette", ["boulangère", "boulanger"]),
  S("le motif du tapis", ["tisserande", "tisserand"]),
  S("la façade de la maison", ["architecte", "architecte"]),
  S("le blason du château", ["illustratrice", "illustrateur"]),
  S("le napperon en papier découpé"),
  S("le pendentif", ["bijoutière", "bijoutier"]),
  S("le décor du gâteau", ["pâtissière", "pâtissier"]),
  S("la broderie du tee-shirt", ["brodeuse", "brodeur"]),
  S("le panneau de la piste cyclable", ["urbaniste", "urbaniste"]),
  S("la mosaïque de la piscine", ["mosaïste", "mosaïste"]),
  S("le vase en céramique", ["potière", "potier"]),
  S("le plan du jardin", ["jardinière", "jardinier"]),
  S("le sapin en papier de la classe"),
  S("l'enseigne de la pharmacie", ["pharmacienne", "pharmacien"]),
  S("le lambrequin de la case créole", ["menuisière", "menuisier"]),
  S("la maquette de l'avion", ["maquettiste", "maquettiste"]),
  S("le costume du robot de la kermesse"),
];

export type Perso = { nom: string; txt: string };
export function perso(s?: Sit): Perso {
  const f = Math.random() < 0.5;
  const nom = un(f ? NOMS_F : NOMS_M);
  const m = s?.m ? (f ? s.m[0] : s.m[1]) : "";
  return { nom, txt: m && Math.random() < 0.7 ? `${nom}, ${m},` : nom };
}

/** « pour le masque », « pour l'enseigne ». */
const pour = (o: string) => `pour ${o}`;

/** Une phrase d'ouverture : qui dessine quoi. ~75 ouvertures différentes. */
export function ouverture(): string {
  const s = un(SITUATIONS);
  const p = perso(s);
  return un([
    `${p.txt} dessine ${s.o} sur quadrillage.`,
    `${cap(pour(s.o))}, ${p.txt} trace une figure sur quadrillage.`,
    `${p.txt} termine ${s.o}, sur une feuille quadrillée.`,
  ]);
}

/* ═════════════════ géométrie ═════════════════ */

export const refV = (p: Pt, X: number): Pt => ({ x: 2 * X - p.x, y: p.y });
export const refH = (p: Pt, Y: number): Pt => ({ x: p.x, y: 2 * Y - p.y });
/** Symétrie par rapport à l'axe oblique qui descend du coin en haut à gauche. */
export const refD = (p: Pt): Pt => ({ x: p.y, y: p.x });
export const bouge = (l: Pt[], dx: number, dy: number) => l.map((p) => ({ x: p.x + dx, y: p.y + dy }));
export const boite = (l: Pt[]) => ({
  x0: Math.min(...l.map((p) => p.x)),
  y0: Math.min(...l.map((p) => p.y)),
  x1: Math.max(...l.map((p) => p.x)),
  y1: Math.max(...l.map((p) => p.y)),
});
export const norm = (l: Pt[]) => {
  const b = boite(l);
  return bouge(l, -b.x0, -b.y0);
};
export const cle = (l: Pt[]) => norm(l).map((p) => `${p.x},${p.y}`).sort().join(" ");
const miroirX = (l: Pt[]) => norm(l.map((p) => ({ x: -p.x, y: p.y })));
const miroirY = (l: Pt[]) => norm(l.map((p) => ({ x: p.x, y: -p.y })));
const transpose = (l: Pt[]) => norm(l.map(refD));
/** Aire d'un polygone (formule du lacet), en carreaux. */
export const aire = (l: Pt[]) => Math.abs(l.reduce((a, p, i) => { const q = l[(i + 1) % l.length]; return a + p.x * q.y - q.x * p.y; }, 0)) / 2;

const P = (...xy: number[]): Pt[] => { const r: Pt[] = []; for (let i = 0; i < xy.length; i += 2) r.push({ x: xy[i], y: xy[i + 1] }); return r; };

/** Figures SANS symétrie : leur glissé, leur retourné et leur symétrique diffèrent. */
const ASYM: readonly Pt[][] = [
  P(0, 0, 1, 0, 3, 1, 1, 2, 1, 4, 0, 4), // fanion
  P(0, 0, 1, 0, 1, 2, 3, 2, 3, 3, 0, 3), // botte
  P(0, 0, 0, 3, 2, 3), // triangle rectangle
  P(0, 0, 1, 0, 1, 1, 2, 1, 2, 2, 3, 2, 3, 3, 0, 3), // escalier
  P(0, 0, 2, 0, 3, 2, 0, 2), // trapèze rectangle
  P(0, 0, 2, 0, 2, 2, 1, 2, 1, 4, 0, 4), // « P »
  P(0, 0, 3, 3, 0, 2), // voile
  P(0, 1, 2, 0, 3, 2, 1, 3), // quadrilatère penché
  P(0, 0, 2, 0, 2, 1, 1, 1, 1, 3, 0, 3), // « Γ »
];

/** Une figure sans symétrie, tournée au hasard, dont les 4 retournements diffèrent. */
export function figureAsym(oblique = false): Pt[] {
  for (let k = 0; k < 40; k++) {
    let f = norm(un(ASYM));
    if (Math.random() < 0.5) f = miroirX(f);
    if (Math.random() < 0.5) f = miroirY(f);
    if (Math.random() < 0.5) f = transpose(f);
    const cles = [f, miroirX(f), miroirY(f), miroirX(miroirY(f))].map(cle);
    if (new Set(cles).size < 4) continue;
    if (oblique && cles.includes(cle(transpose(f)))) continue;
    return f;
  }
  return norm(ASYM[1]);
}

/* ═════════════════ figures symétriques (leurs axes) ═════════════════ */

export type Sym = {
  /** « une maison », « la lettre H ». */
  nom: string;
  pts: Pt[];
  /** Abscisse locale de l'axe vertical, ordonnée locale de l'axe horizontal. */
  v?: number;
  h?: number;
  /** Les diagonales de la boîte sont des axes (carré, croix). */
  diag?: boolean;
  /** Nombre total d'axes. */
  n: number;
  lettre?: boolean;
  /** Le piège de cette figure, écrit pour l'explication. */
  piege?: string;
};

export const SYMS: readonly Sym[] = [
  { nom: "une maison", pts: P(0, 2, 2, 0, 4, 2, 4, 5, 0, 5), v: 2, n: 1 },
  { nom: "une flèche", pts: P(2, 0, 4, 2, 3, 2, 3, 5, 1, 5, 1, 2, 0, 2), v: 2, n: 1 },
  { nom: "un sapin", pts: P(2, 0, 4, 3, 3, 3, 3, 5, 1, 5, 1, 3, 0, 3), v: 2, n: 1 },
  { nom: "une couronne", pts: P(0, 0, 1, 2, 2, 0, 3, 2, 4, 0, 4, 3, 0, 3), v: 2, n: 1 },
  { nom: "une fusée", pts: P(2, 0, 3, 2, 3, 4, 4, 5, 0, 5, 1, 4, 1, 2), v: 2, n: 1 },
  { nom: "un cerf-volant", pts: P(2, 0, 4, 2, 2, 6, 0, 2), v: 2, n: 1 },
  { nom: "un nœud papillon", pts: P(0, 0, 2, 1, 4, 0, 4, 4, 2, 3, 0, 4), v: 2, h: 2, n: 2 },
  { nom: "un losange", pts: P(0, 2, 3, 0, 6, 2, 3, 4), v: 3, h: 2, n: 2, piege: "ses côtés ne sont pas des axes : ce sont ses deux diagonales" },
  { nom: "un triangle isocèle", pts: P(0, 3, 2, 0, 4, 3), v: 2, n: 1 },
  { nom: "un trapèze isocèle", pts: P(0, 3, 1, 0, 3, 0, 4, 3), v: 2, n: 1 },
  { nom: "un rectangle", pts: P(0, 0, 6, 0, 6, 2, 0, 2), v: 3, h: 1, n: 2, piege: "ses diagonales ne sont PAS des axes : en pliant, les coins ne se rejoignent pas" },
  { nom: "un rectangle", pts: P(0, 0, 4, 0, 4, 2, 0, 2), v: 2, h: 1, n: 2, piege: "ses diagonales ne sont PAS des axes : en pliant, les coins ne se rejoignent pas" },
  { nom: "un rectangle", pts: P(0, 0, 2, 0, 2, 4, 0, 4), v: 1, h: 2, n: 2, piege: "ses diagonales ne sont PAS des axes : en pliant, les coins ne se rejoignent pas" },
  { nom: "un carré", pts: P(0, 0, 4, 0, 4, 4, 0, 4), v: 2, h: 2, diag: true, n: 4, piege: "deux axes par les milieux des côtés ET deux par les diagonales" },
  { nom: "une croix de pharmacie", pts: P(2, 0, 4, 0, 4, 2, 6, 2, 6, 4, 4, 4, 4, 6, 2, 6, 2, 4, 0, 4, 0, 2, 2, 2), v: 3, h: 3, diag: true, n: 4 },
  { nom: "un parallélogramme", pts: P(1, 0, 4, 0, 3, 3, 0, 3), n: 0, piege: "il n'a AUCUN axe : en le pliant, il ne se superpose jamais à lui-même" },
  { nom: "la lettre T", pts: P(0, 0, 4, 0, 4, 1, 3, 1, 3, 5, 1, 5, 1, 1, 0, 1), v: 2, n: 1, lettre: true },
  { nom: "la lettre H", pts: P(0, 0, 1, 0, 1, 2, 3, 2, 3, 0, 4, 0, 4, 6, 3, 6, 3, 4, 1, 4, 1, 6, 0, 6), v: 2, h: 3, n: 2, lettre: true },
  { nom: "la lettre U", pts: P(0, 0, 1, 0, 1, 4, 3, 4, 3, 0, 4, 0, 4, 5, 0, 5), v: 2, n: 1, lettre: true },
  { nom: "la lettre C", pts: P(0, 0, 3, 0, 3, 1, 1, 1, 1, 3, 3, 3, 3, 4, 0, 4), h: 2, n: 1, lettre: true },
  { nom: "la lettre E", pts: P(0, 0, 3, 0, 3, 1, 1, 1, 1, 2, 2, 2, 2, 3, 1, 3, 1, 4, 3, 4, 3, 5, 0, 5), h: 2.5, n: 1, lettre: true },
  { nom: "la lettre I", pts: P(0, 0, 3, 0, 3, 1, 2, 1, 2, 4, 3, 4, 3, 5, 0, 5, 0, 4, 1, 4, 1, 1, 0, 1), v: 1.5, h: 2.5, n: 2, lettre: true },
  { nom: "la lettre L", pts: P(0, 0, 1, 0, 1, 4, 3, 4, 3, 5, 0, 5), n: 0, lettre: true },
  { nom: "la lettre F", pts: P(0, 0, 3, 0, 3, 1, 1, 1, 1, 2, 2, 2, 2, 3, 1, 3, 1, 5, 0, 5), n: 0, lettre: true },
  { nom: "la lettre Z", pts: P(0, 0, 4, 0, 4, 1, 1, 4, 4, 4, 4, 5, 0, 5, 0, 4, 3, 1, 0, 1), n: 0, lettre: true, piege: "elle se retourne par un demi-tour, mais aucun pliage ne la superpose à elle-même" },
];

/** Où l'on voit la figure : ~8 lieux. */
export const LIEUX = [
  "sur l'affiche de la fête de l'école",
  "sur le journal de la classe",
  "sur un tee-shirt",
  "sur une carte d'anniversaire",
  "sur l'enseigne d'un magasin",
  "sur la banderole du match",
  "sur un tapis de jeu",
  "sur le carnet de dessin",
  "sur le mur du préau",
];

/* ═════════════════ dessin ═════════════════ */

export type Axe = { type: "vertical"; x: number } | { type: "horizontal"; y: number } | { type: "line"; from: Pt; to: Pt };

export function dessin(o: { cols: number; rows: number; source: Pt[]; image?: Pt[]; axe?: Axe; liens?: boolean; points?: boolean }): TransformationCanvasData {
  return {
    kind: "transformation",
    transformation: "symetrie_axiale",
    grid: { rows: o.rows, cols: o.cols },
    source: { points: o.source, color: "#2563eb", fill: "rgba(37, 99, 235, 0.18)" },
    ...(o.image ? { image: { points: o.image, color: "#db2777", fill: "rgba(219, 39, 119, 0.18)" } } : {}),
    ...(o.axe ? { axis: { ...o.axe, label: "axe" } } : {}),
    display: { showGrid: true, showLabels: false, showPoints: o.points ?? true, showDashedLinks: o.liens ?? false, showTransformationInfo: false },
  };
}

/* ═════════════════ placements ═════════════════ */

export type Cote = "gauche" | "droite" | "haut" | "bas";
/** Le côté opposé, dit comme on le dit en classe. */
export const OPPOSE: Record<Cote, string> = { gauche: "à droite de l'axe", droite: "à gauche de l'axe", haut: "au-dessous de l'axe", bas: "au-dessus de l'axe" };
export const MEME: Record<Cote, string> = { gauche: "à gauche de l'axe", droite: "à droite de l'axe", haut: "au-dessus de l'axe", bas: "au-dessous de l'axe" };

export type Placement = {
  source: Pt[];
  image: Pt[];
  axe: Axe;
  cols: number;
  rows: number;
  cote: Cote;
  /** Distance à l'axe du sommet le plus proche / le plus éloigné. */
  dMin: number;
  dMax: number;
  /** Distance du sommet le plus éloigné au BORD de la feuille (l'erreur classique). */
  dBord: number;
  /** Reflète un point ou une figure par cet axe. */
  ref: (l: Pt[]) => Pt[];
};

/**
 * Pose `f` (normalisée) à `d` carreaux de l'axe, d'un côté tiré au hasard.
 * Axe vertical ou horizontal ; le quadrillage est juste assez grand.
 */
export function placer(f: Pt[], d: number, sens?: "vertical" | "horizontal"): Placement {
  const vertical = sens ? sens === "vertical" : Math.random() < 0.5;
  const g = norm(f);
  const b = boite(g);
  const w = b.x1, h = b.y1;
  // ⚠️ Le cadre fait 360 px au plus : 14 carreaux de large au maximum.
  d = Math.max(0, Math.min(d, 6 - (vertical ? w : h)));
  const marge = 1 + (Math.random() < 0.4 && (vertical ? w : h) + d <= 5 ? 1 : 0);
  if (vertical) {
    const X = marge + w + d;
    const oy = 1;
    const gauche = bouge(g, marge, oy);
    const droite = gauche.map((p) => refV(p, X));
    const aGauche = Math.random() < 0.5;
    return {
      source: aGauche ? gauche : droite,
      image: aGauche ? droite : gauche,
      axe: { type: "vertical", x: X },
      cols: 2 * X,
      rows: h + 2,
      cote: aGauche ? "gauche" : "droite",
      dMin: d,
      dMax: d + w,
      dBord: marge,
      ref: (l) => l.map((p) => refV(p, X)),
    };
  }
  const Y = marge + h + d;
  const ox = 1;
  const haut = bouge(g, ox, marge);
  const bas = haut.map((p) => refH(p, Y));
  const enHaut = Math.random() < 0.5;
  return {
    source: enHaut ? haut : bas,
    image: enHaut ? bas : haut,
    axe: { type: "horizontal", y: Y },
    cols: w + 2,
    rows: 2 * Y,
    cote: enHaut ? "haut" : "bas",
    dMin: d,
    dMax: d + h,
    dBord: marge,
    ref: (l) => l.map((p) => refH(p, Y)),
  };
}

/* ═════════════════ « est-ce son symétrique ? » ═════════════════ */

export const VERDICT = {
  oui: "oui, c'est bien son symétrique",
  glisse: "non, la figure a seulement glissé",
  distance: "non, elle n'est pas à la même distance de l'axe",
  sens: "non, elle est retournée dans le mauvais sens",
} as const;
export type Verdict = keyof typeof VERDICT;

/** La figure rouge proposée, juste ou fausse d'une seule erreur d'élève. */
export function candidat(pl: Placement, v: Verdict): Pt[] {
  const img = pl.image;
  const bi = boite(img);
  const bs = boite(pl.source);
  const vertical = pl.axe.type === "vertical";
  if (v === "oui") return img;
  if (v === "glisse") return bouge(pl.source, bi.x0 - bs.x0, bi.y0 - bs.y0);
  if (v === "distance") {
    // Un carreau trop loin de l'axe : la distance mal comptée.
    const loin = pl.cote === "gauche" ? 1 : pl.cote === "droite" ? -1 : pl.cote === "haut" ? 0 : 0;
    const loinY = pl.cote === "haut" ? 1 : pl.cote === "bas" ? -1 : 0;
    return bouge(img, vertical ? loin : 0, vertical ? 0 : loinY);
  }
  // Retournée dans l'autre sens : de haut en bas pour un axe vertical, de gauche à droite pour un axe horizontal.
  const r = vertical ? miroirY(pl.source) : miroirX(pl.source);
  return bouge(r, bi.x0, bi.y0);
}

/** Agrandit le quadrillage si une figure proposée en déborde. */
export function cadre(cols: number, rows: number, ...ls: Pt[][]) {
  let c = cols, r = rows;
  for (const l of ls) for (const p of l) { c = Math.max(c, p.x + 1); r = Math.max(r, p.y + 1); }
  return { cols: c, rows: r };
}

/* ═════════════════ l'axe oblique ═════════════════ */

export type Oblique = { source: Pt[]; image: Pt[]; n: number; f: Pt[] };

/** Une figure au-dessus de la diagonale, son symétrique au-dessous. */
export function placerOblique(): Oblique {
  const f = figureAsym(true);
  const gap = un([1, 2]);
  const oy = un([0, 1]);
  const mn = Math.min(...f.map((p) => p.x - p.y));
  const source = bouge(f, oy + gap - mn, oy);
  const image = source.map(refD);
  const n = Math.max(...[...source, ...image].map((p) => Math.max(p.x, p.y))) + 1;
  return { source, image, n, f };
}

export const VERDICT_OBLIQUE = {
  oui: "oui, c'est bien son symétrique",
  glisse: "non, la figure a seulement glissé",
  vertical: "non, on l'a retournée comme pour un axe vertical",
  horizontal: "non, on l'a retournée comme pour un axe horizontal",
} as const;
export type VerdictOblique = keyof typeof VERDICT_OBLIQUE;

export function candidatOblique(o: Oblique, v: VerdictOblique): Pt[] | null {
  const bi = boite(o.image);
  const bs = boite(o.source);
  let c: Pt[];
  if (v === "oui") return o.image;
  if (v === "glisse") c = bouge(o.source, bi.x0 - bs.x0, bi.y0 - bs.y0);
  else c = bouge(v === "vertical" ? miroirX(o.source) : miroirY(o.source), bi.x0, bi.y0);
  // Le faux doit rester de l'autre côté de l'axe et différer du vrai.
  if (c.some((p) => p.y < p.x)) {
    const dec = Math.max(...c.map((p) => p.x - p.y));
    c = bouge(c, 0, dec);
  }
  if (cle(c) === cle(o.image)) return null;
  return c;
}
