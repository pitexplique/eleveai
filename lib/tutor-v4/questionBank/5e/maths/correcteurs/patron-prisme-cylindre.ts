import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { longueursDe, reponseLongueur, reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import { cotesVraies, estPatronCylindre, estPatronPrisme, longueurInconnue, texteNet, unSeulVrai } from "@/lib/tutor-v4/questionBank/patrons-outils";

// LES CORRECTEURS DE patron-prisme-cylindre.bank.ts (06/11/2026) : dimensions relues dans le
// TEXTE, périmètre recalculé, dépliages jugés sur leurs pièces. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const l = (q: Q) => longueursDe(texteNet(q));
const P = (r: number) => Math.round(2 * 3.14 * r * 100) / 100;
const aire = (q: Q, x: number, u: string) => {
  const e = String(q.expected[0]).replace(/[  ]/g, " ");
  const m = e.match(/^([\d ]+(?:,\d+)?) (\S+)$/);
  const lu = m ? Number(m[1].replace(/ /g, "").replace(",", ".")) : NaN;
  return Math.abs(lu - x) < 1e-6 && m?.[2] === u ? [] : [`attendu « ${e} », juste ${x} ${u}`];
};
const nombreSeul = (q: Q, x: number) => (Number(q.expected[0]) === x ? [] : [`attendu ${q.expected[0]}, juste ${x}`]);

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  patron_prisme_cylindre_tpl_1: (q) => {
    const [r] = l(q);
    return [...cotesVraies({ ...q, canvas: undefined } as Q), ...reponseLongueur(q, P(r.v), r.u)];
  },
  patron_prisme_cylindre_tpl_2: (q) => {
    const [r, h] = l(q);
    const x = longueurInconnue(q);
    if (x === null || Math.abs(x - h.v) > 1e-6) return [`le « ? » du dessin vaut ${x}, la hauteur ${h.v}`];
    return reponseLongueur(q, h.v, r.u);
  },
  patron_prisme_cylindre_tpl_3: (q) => {
    const [a, b, c] = l(q);
    return [...cotesVraies(q), ...reponseLongueur(q, a.v + b.v + c.v, a.u)];
  },
  patron_prisme_cylindre_tpl_4: (q) => {
    const t = texteNet(q);
    const n = [[/triangle/, 3], [/quadrilatère/, 4], [/pentagone/, 5], [/hexagone/, 6], [/octogone/, 8]].find(([re]) => (re as RegExp).test(t))?.[1] as number;
    return nombreSeul(q, /rectangle|rectangulaires/.test(t) ? n : n + 2);
  },
  patron_prisme_cylindre_tpl_5: (q) => {
    const [L] = l(q);
    const r = L.v / (2 * 3.14);
    if (Math.abs(r - Math.round(r)) > 1e-6) return [`rayon non entier : ${r}`];
    return reponseLongueur(q, /diamètre/.test(q.text) ? 2 * r : r, L.u);
  },
  patron_prisme_cylindre_tpl_6: (q) => {
    const [r, h] = l(q);
    return unSeulVrai(q, (p) => estPatronCylindre(p, r.v, h.v));
  },
  patron_prisme_cylindre_tpl_7: (q) => {
    const [a, b, c, h] = l(q);
    return unSeulVrai(q, (p) => estPatronPrisme(p, a.v, b.v, c.v, h.v));
  },
  patron_prisme_cylindre_tpl_8: (q) => {
    const t = texteNet(q);
    const m = l(q);
    const B = m[0];
    const [x, y] = /hauteur/.test(t) ? [m[2], m[3]] : [m[1], m[2]];
    return reponseLongueur(q, B.v - x.v - y.v, B.u);
  },
  patron_prisme_cylindre_tpl_9: (q) => {
    const [r, p] = l(q);
    return reponseLongueur(q, P(r.v) + p.v, "cm");
  },
  patron_prisme_cylindre_tpl_10: (q) => {
    const [r, h] = l(q);
    return aire(q, Math.round(P(r.v) * h.v * 100) / 100, "m²");
  },
  patron_prisme_cylindre_tpl_11: (q) => {
    const [a, b, c, h] = l(q);
    return aire(q, (a.v + b.v + c.v) * h.v, "dm²");
  },
  patron_prisme_cylindre_tpl_12: (q) => {
    const [r, h, a, b] = l(q);
    const X = P(r.v);
    const Y = h.v + 4 * r.v;
    return reponseQcm(q, X <= a.v && Y <= b.v ? "Oui, la feuille suffit" : "Non, la longueur manque");
  },
});
