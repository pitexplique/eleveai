import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { airesDe, longueursDe, reponseLongueur, reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";

// LES CORRECTEURS DE aires-losange-trapeze.bank.ts (05/11/2026) : ils relisent les
// longueurs dans le TEXTE (ou sur la figure quand l'énoncé y renvoie) et refont le calcul.
// Vide = juste.

type Q = TutorGeneratedQuestionV4;

const v = (q: Q) => longueursDe(q.text).map((m) => m.v);
const unite = (q: Q) => longueursDe(q.text)[0]?.u ?? "";

/** L'aire en unités carrées, à partir de f(longueurs du texte). */
const aireDepuis = (f: (l: number[]) => number) => (q: Q) => {
  const l = v(q);
  return l.length ? reponseLongueur(q, f(l), `${unite(q)}²`) : ["longueurs illisibles"];
};

/** Une légende « 12 cm » de la figure. */
function legende(s: string | undefined): { x: number; u: string } | null {
  const m = longueursDe(String(s ?? ""))[0];
  return m ? { x: m.v, u: m.u } : null;
}

function losangeFigure(q: Q) {
  const c = q.canvas as any;
  const a = legende(c?.sideLabels?.AC);
  const b = legende(c?.sideLabels?.BD);
  return a && b ? reponseLongueur(q, (a.x * b.x) / 2, `${a.u}²`) : ["diagonales absentes de la figure"];
}

function trapezeFigure(q: Q) {
  const c = q.canvas as any;
  // Le dessin est à l'envers et renommé : la grande base y est le côté CD.
  const B = legende(c?.sideLabels?.CD);
  const b = legende(c?.sideLabels?.AB);
  const h = legende(c?.height?.label);
  return B && b && h ? reponseLongueur(q, ((B.x + b.x) * h.x) / 2, `${B.u}²`) : ["longueurs absentes de la figure"];
}

/** Longueur nommée : « AB = 12 cm ». */
function nommee(t: string, nom: string): number | null {
  const m = t.match(new RegExp(`${nom} = (\\d+(?:,\\d+)?)`));
  return m ? Number(m[1].replace(",", ".")) : null;
}

function demiDiagonales(q: Q) {
  const c = q.text.match(/(?:centre|en) ([A-Z])\b/)?.[1];
  const a = c && nommee(q.text, `${c}A`);
  const b = c && nommee(q.text, `${c}B`);
  return a && b ? reponseLongueur(q, (2 * a * 2 * b) / 2, `${unite(q)}²`) : ["demi-diagonales illisibles"];
}

function autreDiagonale(q: Q) {
  const a = airesDe(q.text)[0];
  const d = longueursDe(q.text)[0];
  return a && d ? reponseLongueur(q, (a.v * 2) / d.v, d.u) : ["aire ou diagonale illisible"];
}

function collection(q: Q) {
  const n = Number(q.text.match(/(\d+) [a-zéèà -]*en losange/)?.[1] ?? NaN);
  const l = v(q);
  return n && l.length === 2 ? reponseLongueur(q, (n * l[0] * l[1]) / 2, `${unite(q)}²`) : ["nombre ou diagonales illisibles"];
}

function trapezeRectangle(q: Q) {
  const [AB, DC, AD, BC] = ["AB", "DC", "AD", "BC"].map((n) => nommee(q.text, n));
  if (!AB || !DC || !AD || !BC) return ["longueurs illisibles"];
  const p: string[] = [];
  if (Math.abs(Math.hypot(AB - DC, AD) - BC) > 1e-9) p.push(`côté oblique ${BC} faux : ${Math.hypot(AB - DC, AD)}`);
  return [...p, ...reponseLongueur(q, ((AB + DC) * AD) / 2, `${unite(q)}²`)];
}

function trapezeAvecOblique(q: Q) {
  const [AB, CD, DH, AD] = ["AB", "CD", "DH", "AD"].map((n) => nommee(q.text, n));
  if (!AB || !CD || !DH || !AD) return ["longueurs illisibles"];
  const p = AD > DH ? [] : ["le côté oblique doit dépasser la hauteur"];
  return [...p, ...reponseLongueur(q, ((AB + CD) * DH) / 2, `${unite(q)}²`)];
}

function hauteurDepuisAire(q: Q) {
  const a = airesDe(q.text)[0];
  const l = longueursDe(q.text);
  return a && l.length === 2 ? reponseLongueur(q, (a.v * 2) / (l[0].v + l[1].v), l[0].u) : ["aire ou bases illisibles"];
}

function petiteBaseDepuisAire(q: Q) {
  const a = airesDe(q.text)[0];
  const l = longueursDe(q.text);
  return a && l.length === 2 ? reponseLongueur(q, (a.v * 2) / l[0].v - l[1].v, l[0].u) : ["aire, hauteur ou base illisible"];
}

const produit = (q: Q) => (v(q)[0] * v(q)[1]) / 2;
const calculLosange = (q: Q) => {
  const [D, d] = v(q);
  return D && d ? reponseQcm(q, `${String(D).replace(".", ",")} × ${String(d).replace(".", ",")} ÷ 2`) : ["diagonales illisibles"];
};
const calculTrapeze = (q: Q) => {
  const [B, b, h] = v(q);
  return B && b && h ? reponseQcm(q, `(${B} + ${b}) × ${h} ÷ 2`) : ["longueurs illisibles"];
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  aire_losange_tpl_1: aireDepuis(([D, d]) => (D * d) / 2),
  aire_losange_tpl_2: calculLosange,
  aire_losange_tpl_3: losangeFigure,
  aire_losange_tpl_4: aireDepuis(([D, d]) => (D * d) / 2),
  aire_losange_tpl_5: demiDiagonales,
  aire_losange_tpl_6: aireDepuis(([L, l]) => (L * l) / 2),
  aire_losange_tpl_7: aireDepuis(([D]) => (D * D) / 2),
  aire_losange_tpl_8: autreDiagonale,
  aire_losange_tpl_9: (q) => reponseLongueur(q, produit(q), `${unite(q)}²`),
  aire_losange_tpl_10: autreDiagonale,
  aire_losange_tpl_11: collection,

  aire_trapeze_tpl_1: aireDepuis(([B, b, h]) => ((B + b) * h) / 2),
  aire_trapeze_tpl_2: calculTrapeze,
  aire_trapeze_tpl_3: trapezeFigure,
  aire_trapeze_tpl_4: aireDepuis(([B, b, h]) => ((B + b) * h) / 2),
  aire_trapeze_tpl_5: trapezeRectangle,
  aire_trapeze_tpl_6: aireDepuis(([h, B, b]) => ((B + b) * h) / 2),
  aire_trapeze_tpl_7: trapezeAvecOblique,
  aire_trapeze_tpl_8: hauteurDepuisAire,
  aire_trapeze_tpl_9: petiteBaseDepuisAire,
  aire_trapeze_tpl_10: aireDepuis(([B, b, h]) => ((B + b) * h) / 2),
  aire_trapeze_tpl_11: hauteurDepuisAire,
});
