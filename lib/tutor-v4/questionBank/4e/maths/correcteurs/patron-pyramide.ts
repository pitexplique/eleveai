import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { longueursDe, reponseLongueur, reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import { cotesVraies, estPatronPyramide, longueurInconnue, texteNet, unSeulVrai } from "@/lib/tutor-v4/questionBank/patrons-outils";

// LES CORRECTEURS DE patron-pyramide.bank.ts (06/11/2026) : côtés de la base relus dans le
// TEXTE, Pythagore et aires refaits, dépliages jugés sur leurs pièces. Vide = juste.

type Q = TutorGeneratedQuestionV4;
// 15/11/2026 : les ★1-★2 disent « base triangulaire, carrée, pentagonale, hexagonale ».
const COTES: [RegExp, number][] = [[/triangle équilatéral|[Bb]ase triangulaire/, 3], [/carré/, 4], [/pentagon/, 5], [/hexagon/, 6]];
const nBase = (t: string) => COTES.find(([re]) => re.test(t))?.[1] ?? 0;
/** Le nombre de côtés de la base DESSINÉE (première pièce du premier panneau). */
const nFigure = (q: Q) => ((q.canvas as any)?.panneaux?.[0]?.pieces?.[0]?.points?.length as number | undefined) ?? 0;
/** Une base régulière à n côtés et n triangles isocèles qui se referment : le dépliage est-il un patron ? */
function sePlieEnPyramide(p: any, n: number): boolean {
  const pts = (k: number) => p.pieces[k].points as [number, number][];
  const lg = (a: [number, number], b: [number, number]) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  if (p.pieces.length !== n + 1 || pts(0).length !== n) return false;
  const base = pts(0);
  const c = lg(base[0], base[1]);
  if (!base.every((x, i) => Math.abs(lg(x, base[(i + 1) % n]) - c) < 1e-6)) return false;
  let s0 = -1;
  for (let k = 1; k <= n; k++) {
    const t = pts(k);
    if (t.length !== 3) return false;
    const cs = [lg(t[0], t[1]), lg(t[1], t[2]), lg(t[2], t[0])].sort((a, b) => a - b);
    const egaux = Math.abs(cs[1] - cs[2]) < 1e-6 ? cs[1] : Math.abs(cs[0] - cs[1]) < 1e-6 ? cs[0] : -1;
    if (egaux < 0 || !cs.some((x) => Math.abs(x - c) < 1e-6)) return false;
    if (s0 < 0) s0 = egaux;
    if (Math.abs(egaux - s0) > 1e-6) return false;
  }
  // Le sommet ne se referme que si l'arête latérale dépasse le rayon du cercle circonscrit.
  return s0 > c / (2 * Math.sin(Math.PI / n)) + 1e-6;
}
/** Les longueurs écrites sur les cotes de la figure, dans l'ordre. */
const cotesFigure = (q: Q) => (((q.canvas as any)?.panneaux?.[0]?.cotes ?? []) as { texte: string }[]).map((c) => c.texte.split(" "));
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
    const n = nFigure(q);
    if (!n) return ["base non dessinée"];
    if (nBase(t) && nBase(t) !== n) return [`le texte dit ${nBase(t)} côtés, la figure en a ${n}`];
    const lat = /latérales|autour|entourent/.test(t);
    const tout = /en tout|polygones|comprise|Combien de faces a/.test(t);
    if (lat === tout) return ["question illisible : faces latérales ou toutes les faces ?"];
    return nombreSeul(q, lat ? n : n + 1);
  },
  patron_pyramide_tpl_2: (q) => {
    const x = longueurInconnue(q);
    const c = (q.canvas as any).panneaux[0].cotes[0].texte as string;
    const [v, u] = c.split(" ");
    return x === null ? ["pas de « ? »"] : [...cotesVraies(q), ...(Math.abs(x - Number(v)) < 1e-6 ? [] : ["le « ? » n'est pas une arête latérale"]), ...reponseLongueur(q, x, u)];
  },
  // 15/11/2026 : les longueurs sont sur la FIGURE (un côté de base, une arête latérale).
  patron_pyramide_tpl_3: (q) => {
    const [[c, u], [s, u2]] = cotesFigure(q);
    if (u !== u2) return ["unités différentes sur la figure"];
    const pan = (q.canvas as any).panneaux[0];
    const n = nFigure(q);
    return [...cotesVraies(q), ...(estPatronPyramide(pan, n, Number(c), Number(s)) ? [] : ["la figure n'est pas le patron annoncé"]), ...refermable(n, Number(c), Number(s)), ...reponseQcm(q, `${c} ${u}, ${s} ${u} et ${s} ${u}`)];
  },
  patron_pyramide_tpl_4: (q) => {
    const [s] = l(q);
    const n = nBase(texteNet(q));
    if (!n || n !== nFigure(q)) return [`base : texte ${n}, figure ${nFigure(q)}`];
    return reponseLongueur(q, n * s.v, s.u);
  },
  patron_pyramide_tpl_5: (q) => {
    const n = nBase(texteNet(q));
    if (!n) return ["base illisible"];
    return unSeulVrai(q, (p) => sePlieEnPyramide(p, n));
  },
  patron_pyramide_tpl_6: (q) => {
    const [s] = l(q);
    const n = nFigure(q);
    if (nBase(texteNet(q)) && nBase(texteNet(q)) !== n) return ["base du texte ≠ base de la figure"];
    const pan = (q.canvas as any).panneaux[0];
    const c = Math.hypot(pan.pieces[0].points[0][0] - pan.pieces[0].points[1][0], pan.pieces[0].points[0][1] - pan.pieces[0].points[1][1]);
    return [...(estPatronPyramide(pan, n, c, s.v) ? [] : ["l'étoile dessinée n'a pas l'arête du texte"]), ...reponseLongueur(q, 2 * n * s.v, s.u)];
  },
  patron_pyramide_tpl_7: (q) => {
    const [c, s] = l(q);
    const pb = cotesVraies(q);
    if (pb.length) return pb;
    const a = Math.sqrt(s.v * s.v - (c.v * c.v) / 4);
    return entier(a) ? [...seReferme(c.v, a), ...reponseLongueur(q, a, s.u)] : [`hauteur non entière : ${a}`];
  },
  patron_pyramide_tpl_8: (q) => {
    const [c, a] = l(q);
    const pb = cotesVraies(q);
    if (pb.length) return pb;
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
    const pb = cotesVraies(q);
    if (pb.length) return pb;
    const s = Math.hypot(c.v / 2, a.v);
    return entier(s) ? [...seReferme(c.v, a.v), ...reponseLongueur(q, s, "dm")] : [`arête non entière : ${s}`];
  },
  patron_pyramide_tpl_12: (q) => {
    const [c, s] = l(q);
    const n = nBase(texteNet(q));
    if (n !== nFigure(q)) return ["la base dessinée n'est pas celle du texte"];
    return [...refermable(n, c.v, s.v), ...reponseLongueur(q, n * c.v + n * s.v, "cm")];
  },
});
