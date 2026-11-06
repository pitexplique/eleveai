import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { longueursDe, reponseLongueur, reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import { cotesVraies, estPatronPyramide, longueurInconnue, texteNet, unSeulVrai } from "@/lib/tutor-v4/questionBank/patrons-outils";

// LES CORRECTEURS DE patron-pyramide.bank.ts (06/11/2026) : côtés de la base relus dans le
// TEXTE, Pythagore et aires refaits, dépliages jugés sur leurs pièces. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const COTES: [RegExp, number][] = [[/triangle équilatéral/, 3], [/carré/, 4], [/pentagone/, 5], [/hexagone/, 6]];
const nBase = (t: string) => COTES.find(([re]) => re.test(t))?.[1] ?? 0;
const l = (q: Q) => longueursDe(texteNet(q));
const nombreSeul = (q: Q, x: number) => (Number(q.expected[0]) === x ? [] : [`attendu ${q.expected[0]}, juste ${x}`]);
const aire = (q: Q, x: number, u: string) => {
  const e = String(q.expected[0]).replace(/[  ]/g, " ");
  const m = e.match(/^([\d ]+) (\S+)$/);
  return m && Number(m[1].replace(/ /g, "")) === x && m[2] === u ? [] : [`attendu « ${e} », juste ${x} ${u}`];
};
const entier = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
/** Le sommet se referme si l'arête dépasse le rayon du cercle circonscrit à la base. */
const refermable = (n: number, c: number, s: number) => (s > c / (2 * Math.sin(Math.PI / n)) ? [] : [`arête ${s} trop courte pour n = ${n}, c = ${c}`]);

/** Base carrée : la hauteur d'une face doit dépasser la moitié du côté. */
const seReferme = (c: number, a: number) => (a > c / 2 ? [] : [`pyramide impossible : côté ${c}, hauteur de face ${a}`]);

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  patron_pyramide_tpl_1: (q) => {
    const t = texteNet(q);
    const n = nBase(t);
    if (!n) return ["base illisible"];
    return nombreSeul(q, /triangles|triangulaires/.test(t.replace(/triangle équilatéral/, "")) ? n : n + 1);
  },
  patron_pyramide_tpl_2: (q) => {
    const x = longueurInconnue(q);
    const c = (q.canvas as any).panneaux[0].cotes[0].texte as string;
    const [v, u] = c.split(" ");
    return x === null ? ["pas de « ? »"] : [...cotesVraies(q), ...(Math.abs(x - Number(v)) < 1e-6 ? [] : ["le « ? » n'est pas une arête latérale"]), ...reponseLongueur(q, x, u)];
  },
  patron_pyramide_tpl_3: (q) => {
    const [c, s] = l(q);
    return [...refermable(nBase(texteNet(q)), c.v, s.v), ...reponseQcm(q, `${c.v} ${c.u}, ${s.v} ${s.u} et ${s.v} ${s.u}`)];
  },
  patron_pyramide_tpl_4: (q) => {
    const [, s] = l(q);
    return reponseLongueur(q, nBase(texteNet(q)) * s.v, s.u);
  },
  patron_pyramide_tpl_5: (q) => {
    const [c, s] = l(q);
    const n = nBase(texteNet(q));
    return [...refermable(n, c.v, s.v), ...unSeulVrai(q, (p) => estPatronPyramide(p, n, c.v, s.v))];
  },
  patron_pyramide_tpl_6: (q) => {
    const [, s] = l(q);
    return reponseLongueur(q, 2 * nBase(texteNet(q)) * s.v, s.u);
  },
  patron_pyramide_tpl_7: (q) => {
    const [c, s] = l(q);
    const a = Math.sqrt(s.v * s.v - (c.v * c.v) / 4);
    return entier(a) ? [...seReferme(c.v, a), ...reponseLongueur(q, a, s.u)] : [`hauteur non entière : ${a}`];
  },
  patron_pyramide_tpl_8: (q) => {
    const [c, a] = l(q);
    return [...seReferme(c.v, a.v), ...aire(q, (c.v * a.v) / 2, `${c.u}²`)];
  },
  patron_pyramide_tpl_9: (q) => {
    const [c, a] = l(q);
    return [...seReferme(c.v, a.v), ...aire(q, c.v * c.v + 2 * c.v * a.v, "cm²")];
  },
  patron_pyramide_tpl_10: (q) => {
    const [c, a] = l(q);
    return [...seReferme(c.v, a.v), ...reponseLongueur(q, c.v + 2 * a.v, "cm")];
  },
  patron_pyramide_tpl_11: (q) => {
    const [c, a] = l(q);
    const s = Math.hypot(c.v / 2, a.v);
    return entier(s) ? [...seReferme(c.v, a.v), ...reponseLongueur(q, s, "dm")] : [`arête non entière : ${s}`];
  },
  patron_pyramide_tpl_12: (q) => {
    const [c, s] = l(q);
    const n = nBase(texteNet(q));
    return [...refermable(n, c.v, s.v), ...reponseLongueur(q, n * c.v + n * s.v, "cm")];
  },
});
