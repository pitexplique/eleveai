// Outils des correcteurs du CM2 (05/11/2026) : ils relisent le TEXTE (ou la figure
// envoyée à l'élève) et refont le calcul, sans rien demander au gabarit.
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

export type Q = TutorGeneratedQuestionV4;

export const num = (s: string) => Number(String(s).replace(/[\s  ]/g, "").replace(",", "."));
const NB = "\\d{1,3}(?: \\d{3})+(?:,\\d+)?|\\d+(?:,\\d+)?";
/** Tous les nombres du texte, dans l'ordre (les « 7/10 » comptent pour 7 et 10). */
export const nombres = (t: string) => [...t.matchAll(new RegExp(`(?<![\\d,])(?:${NB})`, "g"))].map((m) => num(m[0]));
export const net = (x: number) => Math.round(x * 1e6) / 1e6;
export const egal = (a: number, b: number) => Math.abs(a - b) < 1e-9;
/** Le nombre en tête d'une proposition : « 12,5 cm² » → 12.5. */
export const valeur = (c: string) => {
  const m = String(c).match(new RegExp(`^(?:${NB})`));
  return m ? num(m[0]) : NaN;
};

/** Exactement une proposition juste, et c'est l'attendue. */
export function unique(q: Q, juste: (c: string) => boolean): string[] {
  const j = (q.choices ?? []).filter(juste);
  if (j.length !== 1) return [`${j.length} proposition(s) juste(s) : ${j.join(" | ")}`];
  return j[0] === q.expected[0] ? [] : [`la juste « ${j[0]} » n'est pas l'attendue « ${q.expected[0]} »`];
}

/** Réponse numérique : l'attendue vaut `juste`, unité comprise, et aucune autre proposition n'a sa valeur. */
export function reponse(q: Q, juste: number, u = ""): string[] {
  const p: string[] = [];
  const e = String(q.expected[0]);
  if (!egal(valeur(e), net(juste))) p.push(`attendu « ${e} », le calcul donne ${juste}`);
  if (u && !e.endsWith(` ${u}`)) p.push(`unité absente de « ${e} » (${u})`);
  const vals = (q.choices ?? []).map(valeur).map(net);
  if (new Set(vals).size !== vals.length) p.push(`deux propositions de même valeur : ${q.choices?.join(" | ")}`);
  if (vals.some((x) => Number.isNaN(x))) p.push(`proposition non numérique : ${q.choices?.join(" | ")}`);
  return p;
}

/** Réponse écrite : l'attendue est exactement ce texte. */
export const texte = (q: Q, juste: string): string[] =>
  q.expected[0] === juste && (q.choices ?? []).includes(juste) ? [] : [`attendu « ${q.expected[0]} », juste : « ${juste} »`];

export const diviseurs = (n: number) => {
  const l: number[] = [];
  for (let d = 1; d <= n; d++) if (n % d === 0) l.push(d);
  return l;
};
export const pgcd = (a: number, b: number): number => (b ? pgcd(b, a % b) : a);
export const liste = (s: string) => [...s.matchAll(/\d+/g)].map((m) => Number(m[0]));
