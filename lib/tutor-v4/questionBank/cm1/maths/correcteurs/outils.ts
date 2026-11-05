// Outils des correcteurs de CM1 (05/11/2026) : même contrat que la 6e (voir
// 6e/maths/correcteurs/types.ts). Un correcteur RELIT le texte (et la figure quand
// elle porte les données) et refait le calcul. Vide = juste.
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { NB, num } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/grandeurs";

export type Q = TutorGeneratedQuestionV4;
export { NB, num };

export const egal = (a: number, b: number) => Math.abs(a - b) < 1e-9;

/** Les nombres du texte dans l'ordre, fractions « a/b » retirées. */
export function nombres(t: string): number[] {
  return [...t.replace(/\d+\/\d+/g, " ").matchAll(new RegExp(`(?<![\\d,])${NB}(?![\\d/])`, "g"))].map((m) => num(m[1]));
}
export const fractions = (t: string): [number, number][] => [...t.matchAll(/(\d+)\/(\d+)/g)].map((m) => [Number(m[1]), Number(m[2])]);

/** La valeur d'une proposition « 4 500 », « 3,4 km » ; null si ce n'est pas un nombre. */
export function valeur(c: string): number | null {
  const m = String(c).trim().match(new RegExp(`^${NB}(?: ?[\\p{L}€°²³/]+.*)?$`, "u"));
  return m ? num(m[1]) : null;
}

function communs(q: Q): string[] {
  const p: string[] = [];
  if (q.format !== "qcm") p.push(`format ${q.format} au lieu d'un QCM`);
  if ((q.choices ?? []).length < 2) p.push("moins de deux propositions");
  return p;
}

/** La réponse attendue est ce texte-là, et il figure une seule fois. */
export function justeTexte(q: Q, juste: string): string[] {
  const p = communs(q);
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », juste : « ${juste} »`);
  if ((q.choices ?? []).filter((c) => c === juste).length !== 1) p.push(`« ${juste} » absent des propositions`);
  return p;
}

/** La réponse attendue vaut `juste`, et une seule proposition vaut ce nombre. */
export function justeNombre(q: Q, juste: number, u?: string): string[] {
  const p = communs(q);
  const v = valeur(q.expected[0]);
  if (v === null || !egal(v, juste)) p.push(`attendu « ${q.expected[0]} », juste : ${juste}`);
  const ok = (q.choices ?? []).filter((c) => { const x = valeur(c); return x !== null && egal(x, juste); });
  if (ok.length !== 1) p.push(`${ok.length} proposition(s) valent ${juste} : ${(q.choices ?? []).join(" | ")}`);
  const vals = (q.choices ?? []).map(valeur);
  if (new Set(vals).size !== vals.length) p.push(`deux propositions de même valeur : ${(q.choices ?? []).join(" | ")}`);
  if (u !== undefined && !String(q.expected[0]).endsWith(u)) p.push(`unité attendue « ${u} » : ${q.expected[0]}`);
  return p;
}

/** Une seule proposition vérifie la condition, et c'est l'attendue. */
export function justeUnique(q: Q, ok: (c: string) => boolean): string[] {
  const p = communs(q);
  const j = (q.choices ?? []).filter(ok);
  if (j.length !== 1) p.push(`${j.length} proposition(s) justes : ${j.join(" | ")} parmi ${(q.choices ?? []).join(" | ")}`);
  else if (j[0] !== q.expected[0]) p.push(`la juste « ${j[0]} » n'est pas l'attendue « ${q.expected[0]} »`);
  return p;
}
