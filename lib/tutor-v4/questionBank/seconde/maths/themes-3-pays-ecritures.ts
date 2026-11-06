// ÉCRITURES COMMUNES AUX THÈMES « 3 PAYS » DE SECONDE (06/11/2026) : ax + b, |…|, fractions réduites,
// ensembles et intervalles en LaTeX, repère `fonctionGraphique`. Rien de mathématique n'est décidé ici.

import type { CanvasFigure } from "@/lib/tutor-v4/types";
import { entre, pgcd } from "../../lycee-commun";

export const nz = (a: number, b: number) => {
  for (;;) {
    const v = entre(a, b);
    if (v) return v;
  }
};
/** « 2x », « x », « -x ». */
export const mono = (a: number, v = "x") => (a === 1 ? v : a === -1 ? `-${v}` : `${a}${v}`);
/** « 2x - 3 », « -x + 1 », « x », « 4 ». */
export function aff(a: number, b: number, v = "x") {
  if (!a) return String(b);
  return b ? `${mono(a, v)} ${b < 0 ? "-" : "+"} ${Math.abs(b)}` : mono(a, v);
}
/** |…| en LaTeX. */
export const va = (s: string) => `\\left|${s}\\right|`;

/** La fraction p/q réduite en LaTeX : « 3 », « -\dfrac{1}{2} ». */
export function fracL(p: number, q: number) {
  const g = pgcd(p, q) || 1;
  const s = p * q < 0 ? "-" : "";
  const n = Math.abs(p) / g;
  const d = Math.abs(q) / g;
  return d === 1 ? `${s}${n}` : `${s}\\dfrac{${n}}{${d}}`;
}
/** (p/q) x en LaTeX : « \dfrac{1}{2}x », « -x », « 3x ». */
export function coefL(p: number, q: number, v = "x") {
  const g = pgcd(p, q) || 1;
  const s = p * q < 0 ? "-" : "";
  const n = Math.abs(p) / g;
  const d = Math.abs(q) / g;
  if (d === 1) return `${s}${n === 1 ? "" : n}${v}`;
  return `${s}\\dfrac{${n}}{${d}}${v}`;
}
/** y = (p/q) x + b, b entier ou nul. */
export function droiteL(p: number, q: number, b: number, v = "x") {
  return `${coefL(p, q, v)}${b ? ` ${b < 0 ? "-" : "+"} ${Math.abs(b)}` : ""}`;
}

export const ensL = (vals: readonly (string | number)[]) => `\\{${vals.join("\\,;")}\\}`;
export const VIDE = "\\varnothing";
export const REELS = "\\mathbb{R}";
/** [a ; b], ]a ; b[, … : `f` = fermé. */
const borneG = (a: string | number, f: boolean) => (f ? `[${a}` : `]${String(a).replace(/^-/, "{-}")}`);
export const interL = (a: string | number, b: string | number, fa = true, fb = true) => `${borneG(a, fa)}\\,;${b}${fb ? "]" : "["}`;
export const versMoins = (b: string | number, f = true) => `]{-}\\infty\\,;${b}${f ? "]" : "["}`;
export const versPlus = (a: string | number, f = true) => `${borneG(a, f)}\\,;+\\infty[`;

export type Pt = { x: number; y: number };
export const BLEU = "#2563eb";
/** Un repère à grille : une courbe = une liste de points reliés ; plusieurs courbes ne se relient pas entre elles. */
export function repere(traits: Pt[][], opt: { xmin?: number; xmax?: number; ymin?: number; ymax?: number; points?: { x: number; y: number; ouvert?: boolean; label?: string; couleur?: string }[]; verticale?: number; horizontale?: number } = {}): CanvasFigure {
  const misesEnEvidence = [
    ...(opt.verticale !== undefined ? [{ verticale: { x: opt.verticale } }] : []),
    ...(opt.horizontale !== undefined ? [{ horizontale: { y: opt.horizontale } }] : []),
  ];
  // Un chiffre d'ordonnée occupe la bande juste à gauche de l'axe : un palier qui y passe serait coupé par son halo.
  const masquees = new Set<number>();
  for (const t of traits) for (let i = 1; i < t.length; i++) {
    const [p, q] = [t[i - 1], t[i]];
    if (p.y === q.y && p.y !== 0 && Math.min(p.x, q.x) < 0 && Math.max(p.x, q.x) > -0.7) masquees.add(p.y);
  }
  return {
    ...(masquees.size ? { ordonneesMasquees: [...masquees] } : {}),
    kind: "fonctionGraphique",
    size: { width: 340, height: 340 },
    xmin: opt.xmin ?? -7,
    xmax: opt.xmax ?? 7,
    ymin: opt.ymin ?? -7,
    ymax: opt.ymax ?? 7,
    grille: true,
    courbes: traits.map((points, i) => ({ id: `c${i}`, type: "points", couleur: BLEU, points })),
    points: opt.points ?? [],
    ...(misesEnEvidence.length ? { misesEnEvidence } : {}),
  } as CanvasFigure;
}
