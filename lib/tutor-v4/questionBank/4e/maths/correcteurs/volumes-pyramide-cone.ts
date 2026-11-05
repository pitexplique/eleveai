import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { NB, num, verifierReponse } from "./grandeurs";

// LES CORRECTEURS DE volumes-pyramide-cone.bank.ts (05/11/2026). Ils relisent les
// mesures dans le TEXTE, dans l'ordre où l'énoncé les donne (base avant hauteur),
// et refont le calcul sans passer par le gabarit. Vide = juste.

type Q = TutorGeneratedQuestionV4;

/** Toutes les mesures du texte, dans l'ordre : « 12 cm », « 40 cm² », « 9π cm³ ». */
function mesuresTexte(t: string) {
  const res: { v: number; pi: boolean; u: string }[] = [];
  for (const m of t.matchAll(new RegExp(`${NB}(π)? ?(mm|cm|dm|m)([²³]?)(?![\\p{L}\\d])`, "gu")))
    res.push({ v: num(m[1]), pi: !!m[2], u: m[3] + m[4] });
  return res;
}
const parExposant = (t: string, e: "" | "²" | "³") => mesuresTexte(t).filter((m) => (e === "" ? !/[²³]/.test(m.u) : m.u.endsWith(e)));

function verifierPi(q: Q, a: number, u: string): string[] {
  if (!Number.isInteger(a)) return [`coefficient ${a} non entier`];
  const p: string[] = [];
  const lu = String(q.expected[0]).match(new RegExp(`^${NB}π ${u}³$`));
  if (!lu || num(lu[1]) !== a) p.push(`attendu « ${q.expected[0]} », juste : ${a}π ${u}³`);
  for (const x of q.expected) {
    const m = String(x).match(new RegExp(`^${NB}(?:π| × π| \\* π| pi)(?: ${u}[³3])?$`));
    if (!m || num(m[1]) !== a) p.push(`écriture admise « ${x} » ≠ ${a}π`);
    if (/^\d+$/.test(String(x).trim())) p.push("coefficient seul accepté");
  }
  return p;
}
const base = (u: string) => u.replace(/[²³]$/, "");
const unite = (t: string) => {
  const us = new Set(mesuresTexte(t).map((m) => base(m.u)));
  return us.size === 1 ? [...us][0] : null;
};

/* ───── pyramide ───── */
function aireHauteur(q: Q) {
  const u = unite(q.text);
  const [A] = parExposant(q.text, "²");
  const [h] = parExposant(q.text, "");
  if (!u || !A || !h) return ["aire et hauteur illisibles"];
  return verifierReponse(q, (A.v * h.v) / 3, `${u}³`);
}
function calculPyramide(q: Q) {
  const [A] = parExposant(q.text, "²");
  const [h] = parExposant(q.text, "");
  if (!A || !h) return ["aire et hauteur illisibles"];
  const juste = `${A.v} × ${h.v} ÷ 3`;
  return [...(q.expected[0] === juste ? [] : [`attendu ${juste}`]), ...qcmUnique(q, (x) => x === juste)];
}
function carreHauteur(q: Q) {
  const u = unite(q.text);
  const l = parExposant(q.text, "");
  if (!u || l.length !== 2 || !/carr/.test(q.text)) return ["côté et hauteur illisibles"];
  return verifierReponse(q, (l[0].v * l[0].v * l[1].v) / 3, `${u}³`);
}
function rectangleHauteur(q: Q) {
  const u = unite(q.text);
  const l = parExposant(q.text, "");
  if (!u || l.length !== 3) return ["dimensions illisibles"];
  return verifierReponse(q, (l[0].v * l[1].v * l[2].v) / 3, `${u}³`);
}
/** Prisme/cylindre donné → pyramide/cône (÷ 3), et l'inverse (× 3) : on lit ce que la QUESTION demande. */
function tiers(q: Q) {
  const [V] = parExposant(q.text, "³");
  if (!V) return ["volume illisible"];
  const demandeGrand = /(?:volume du|fait le) (?:prisme|cylindre)|(?:Prisme|Cylindre) de même/.test(q.text);
  return verifierReponse(q, demandeGrand ? V.v * 3 : V.v / 3, V.u);
}
function triangleHauteur(q: Q) {
  const u = unite(q.text);
  const l = parExposant(q.text, "");
  if (!u || l.length !== 3) return ["côté, hauteur relative et hauteur illisibles"];
  return verifierReponse(q, ((l[0].v * l[1].v) / 2) * l[2].v / 3, `${u}³`);
}
/** Prisme et pyramide de même base : aire × hP ÷ (aire × h ÷ 3) = 3 × hP ÷ h. */
function versements(q: Q) {
  const l = parExposant(q.text, "");
  const lon = l.filter((m) => /\d/.test(String(m.v)));
  const h = lon[lon.length - 2];
  const hP = lon[lon.length - 1];
  if (!h || !hP) return ["hauteurs illisibles"];
  const juste = (3 * hP.v) / h.v;
  return Number(q.expected[0]) === juste ? [] : [`attendu ${q.expected[0]}, juste ${juste}`];
}
function retrouverHauteurPyramide(q: Q) {
  const u = unite(q.text);
  const [V] = parExposant(q.text, "³");
  const [A] = parExposant(q.text, "²");
  if (!u || !V || !A) return ["volume et aire illisibles"];
  return verifierReponse(q, (3 * V.v) / A.v, u);
}
function maison(q: Q) {
  const l = parExposant(q.text, "");
  if (l.length !== 3) return ["côté et hauteurs illisibles"];
  return verifierReponse(q, l[0].v * l[0].v * l[1].v + (l[0].v * l[0].v * l[2].v) / 3, "m³");
}
function effetDimension(q: Q) {
  const [V] = parExposant(q.text, "³");
  if (!V) return ["volume illisible"];
  const fois = /double/.test(q.text) ? 2 : /triple/.test(q.text) ? 3 : 0;
  if (!fois) return ["changement illisible"];
  const auCarre = /(côté|rayon)/.test(q.text.match(/On (?:double|triple) [^.]*?\b(sa hauteur|le côté|son rayon)/)?.[1] ?? "");
  return verifierReponse(q, V.v * (auCarre ? fois * fois : fois), V.u);
}

/* ───── cône ───── */
function rayonHauteurPi(q: Q) {
  const u = unite(q.text);
  const l = parExposant(q.text, "");
  if (!u || l.length !== 2) return ["rayon et hauteur illisibles"];
  const r = /[Dd]iam[èe]tre/.test(q.text) ? l[0].v / 2 : l[0].v;
  return verifierPi(q, (r * r * l[1].v) / 3, u);
}
function calculCone(q: Q) {
  const l = parExposant(q.text, "");
  if (l.length !== 2) return ["rayon et hauteur illisibles"];
  const juste = `π × ${l[0].v} × ${l[0].v} × ${l[1].v} ÷ 3`;
  return [...(q.expected[0] === juste ? [] : [`attendu ${juste}`]), ...qcmUnique(q, (x) => x === juste)];
}
function rayonHauteur314(q: Q) {
  const u = unite(q.text);
  const l = parExposant(q.text, "");
  if (!u || l.length !== 2 || !/3,14/.test(q.text)) return ["rayon, hauteur ou π ≈ 3,14 illisibles"];
  const V = (3.14 * l[0].v * l[0].v * l[1].v) / 3;
  return /litres/.test(q.text) ? verifierReponse(q, V, "L") : verifierReponse(q, V, `${u}³`);
}
function retrouverHauteurCone(q: Q) {
  const u = unite(q.text);
  const [V] = parExposant(q.text, "³");
  const [r] = parExposant(q.text, "");
  if (!u || !V?.pi || !r) return ["volume en π et rayon illisibles"];
  return verifierReponse(q, (3 * V.v) / (r.v * r.v), u);
}
function cylindreCone(q: Q) {
  const l = parExposant(q.text, "");
  if (l.length !== 3) return ["rayon et hauteurs illisibles"];
  return verifierPi(q, l[0].v * l[0].v * l[1].v + (l[0].v * l[0].v * l[2].v) / 3, "cm");
}

export const correcteursPyramideCone = (pref: string): CorrecteursMaths =>
  avecRegleMotsCles({
    [`${pref}volume_pyramide_tpl_1`]: aireHauteur,
    [`${pref}volume_pyramide_tpl_2`]: calculPyramide,
    [`${pref}volume_pyramide_tpl_3`]: carreHauteur,
    [`${pref}volume_pyramide_tpl_4`]: rectangleHauteur,
    [`${pref}volume_pyramide_tpl_5`]: tiers,
    [`${pref}volume_pyramide_tpl_6`]: carreHauteur,
    [`${pref}volume_pyramide_tpl_7`]: triangleHauteur,
    [`${pref}volume_pyramide_tpl_8`]: versements,
    [`${pref}volume_pyramide_tpl_9`]: retrouverHauteurPyramide,
    [`${pref}volume_pyramide_tpl_10`]: maison,
    [`${pref}volume_pyramide_tpl_11`]: effetDimension,
    [`${pref}volume_cone_tpl_1`]: rayonHauteurPi,
    [`${pref}volume_cone_tpl_2`]: calculCone,
    [`${pref}volume_cone_tpl_3`]: rayonHauteurPi,
    [`${pref}volume_cone_tpl_4`]: rayonHauteur314,
    [`${pref}volume_cone_tpl_5`]: tiers,
    [`${pref}volume_cone_tpl_6`]: rayonHauteurPi,
    [`${pref}volume_cone_tpl_7`]: rayonHauteur314,
    [`${pref}volume_cone_tpl_8`]: versements,
    [`${pref}volume_cone_tpl_9`]: retrouverHauteurCone,
    [`${pref}volume_cone_tpl_10`]: cylindreCone,
    [`${pref}volume_cone_tpl_11`]: effetDimension,
  });

export const CORRECTEURS = correcteursPyramideCone("");
