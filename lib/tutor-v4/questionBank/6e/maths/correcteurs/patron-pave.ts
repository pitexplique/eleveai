import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "./pourcentages";
import { airesDe, longueursDe, reponseLongueur, reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import { cotesVraies, estPatronPave, longueurInconnue, panneauxDe, texteNet, unSeulVrai } from "@/lib/tutor-v4/questionBank/patrons-outils";

// LES CORRECTEURS DE patron-pave.bank.ts (06/11/2026) : ils relisent les dimensions dans le
// TEXTE ou sur la figure, et recalculent. Les dépliages sont jugés sur leurs pièces. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const dims = (q: Q) => {
  const l = longueursDe(texteNet(q));
  return { L: l[0]?.v, l: l[1]?.v, h: l[2]?.v, u: l[0]?.u ?? "" };
};
const sur = (a: number, b: number, u: string) => `${a} ${u} sur ${b} ${u}`;
const faceDe = (t: string, L: number, l: number, h: number): [number, number] | null =>
  /\bdu dess(us|ous)\b/.test(t) ? [L, l] : /\bde (devant|derrière)\b/.test(t) ? [L, h] : /\bde (gauche|droite)\b/.test(t) ? [l, h] : null;
const aireAttendue = (q: Q, x: number, u: string) => {
  const e = String(q.expected[0]).replace(/[  ]/g, " ");
  const m = e.match(/^([\d ]+) (\S+)$/);
  return m && Number(m[1].replace(/ /g, "")) === x && m[2] === u ? [] : [`attendu « ${e} », juste ${x} ${u}`];
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  patron_pave_dimensions_tpl_1: (q) => {
    const x = longueurInconnue(q);
    const u = panneauxDe(q)[0]?.cotes?.[0]?.texte.split(" ")[1] ?? "";
    return x === null ? ["pas de « ? »"] : [...cotesVraies(q), ...reponseLongueur(q, x, u)];
  },
  patron_pave_dimensions_tpl_2: (q) => {
    const { L, l, h, u } = dims(q);
    const f = faceDe(texteNet(q), L, l, h);
    return f ? reponseQcm(q, sur(f[0], f[1], u)) : ["face illisible"];
  },
  patron_pave_dimensions_tpl_3: (q) => {
    const { L, l, h, u } = dims(q);
    const f = faceDe(texteNet(q), L, l, h);
    return f ? aireAttendue(q, f[0] * f[1], `${u}²`) : ["face illisible"];
  },
  patron_pave_dimensions_tpl_4: (q) => {
    const P = panneauxDe(q)[0];
    const piece = P?.pieces.find((x) => x.fond);
    if (!piece) return ["pas de face colorée"];
    const u = P.cotes?.[0]?.texte.split(" ")[1] ?? "";
    const xs = piece.points.map((p) => p[0]);
    const ys = piece.points.map((p) => p[1]);
    const w = Math.max(...xs) - Math.min(...xs);
    const h = Math.max(...ys) - Math.min(...ys);
    return [...cotesVraies(q), ...reponseQcm(q, sur(w, h, u))];
  },
  patron_pave_dimensions_tpl_5: (q) => {
    const { L, l, u } = dims(q);
    return [...cotesVraies(q), ...reponseLongueur(q, 2 * (L + l), u)];
  },
  patron_pave_dimensions_tpl_6: (q) => {
    const { L, l, h } = dims(q);
    return unSeulVrai(q, (p) => estPatronPave(p, L, l, h));
  },
  patron_pave_dimensions_tpl_7: (q) => {
    const { L, l, h, u } = dims(q);
    return reponseQcm(q, sur(2 * (L + l), h + 2 * l, u));
  },
  patron_pave_dimensions_tpl_8: (q) => {
    const m = longueursDe(texteNet(q));
    if (m.length !== 4) return ["faces illisibles"];
    const [a, b, c, d] = m.map((x) => x.v);
    if (a !== c) return ["arête commune absente"];
    return reponseQcm(q, sur(b, d, m[0].u));
  },
  patron_pave_dimensions_tpl_9: (q) => {
    const { L, l, h } = dims(q);
    return aireAttendue(q, 2 * (L * l + L * h + l * h), "cm²");
  },
  patron_pave_dimensions_tpl_10: (q) => {
    const m = longueursDe(texteNet(q)).map((x) => x.v);
    const [L, l, h, a, b] = m;
    const [X, Y] = [2 * (L + l), h + 2 * l];
    const tient = (X <= a && Y <= b) || (X <= b && Y <= a);
    return reponseQcm(q, tient ? "Oui, la feuille suffit" : "Non, la feuille est trop petite");
  },
  patron_pave_dimensions_tpl_11: (q) => {
    const m = longueursDe(texteNet(q)).map((x) => x.v);
    const [L, l, h] = m;
    return airesDe(texteNet(q)).length ? ["aire dans l'énoncé"] : aireAttendue(q, L * l + 2 * L * h + 2 * l * h, "dm²");
  },
  patron_pave_dimensions_tpl_12: (q) => {
    const [B, L] = longueursDe(texteNet(q)).map((x) => x.v);
    return reponseLongueur(q, B / 2 - L, "cm");
  },
});
