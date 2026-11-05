// OUTILS COMMUNS AUX GABARITS DU LYCÉE (05/11/2026, trous du programme français).
// Tirages, QCM sans doublon, écritures LaTeX exactes (fractions réduites).

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

export const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
export const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
export const melange = <T,>(l: readonly T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
/** Une phrase = un début × une fin : deux listes courtes donnent beaucoup de tournures. */
export function phrase(debuts: readonly string[], fins: readonly string[]) {
  const d = un(debuts);
  const f = un(fins);
  // Après un point, la fin commence par une majuscule.
  const g = /[.?!]$/.test(d) && f ? f.charAt(0).toUpperCase() + f.slice(1) : f;
  return `${d} ${g}`.trim();
}

/** « de élèves » n'existe pas : « d'élèves », « de joueuses ». */
export const de = (s: string) => (/^[aeiouyéèêh]/i.test(s) ? `d'${s}` : `de ${s}`);

/** 12000 → « 12 000 », avec une espace insécable. */
export const mil = (n: number) => String(n).replace(/\B(?=(\d{3})+$)/g, "\u00a0");

export const pgcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : pgcd(b, a % b));

export function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul / Observation : ${calcul}\n\nConclusion : ${conclusion}`;
}

/** Nombre pour une réponse : virgule décimale. */
export const fr = (x: number) => String(Math.round(x * 1e6) / 1e6).replace(".", ",");
/** Nombre en LaTeX : virgule « {,} ». */
export const nL = (x: number) => String(Math.round(x * 1e6) / 1e6).replace(".", "{,}");

/** QCM à quatre propositions : la bonne, plus trois pièges tous différents. */
export function qcm(text: string, juste: string, faux: readonly string[], explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  const pieges = melange([...new Set(faux)].filter((f) => f !== juste)).slice(0, 3);
  return { text, format: "qcm", choices: melange([juste, ...pieges]), expected: [juste], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) };
}

/** Réponse courte numérique ; `v` est écrit à la française, d'autres écritures admises peuvent suivre. */
export function court(text: string, v: number | string, explanation: string, canvas?: CanvasFigure, autres: string[] = []): TutorGeneratedQuestionV4 {
  return { text, format: "short", expected: [typeof v === "number" ? fr(v) : v, ...autres], comparator: "number_equal", explanation, ...(canvas ? { canvas } : {}) };
}

/** Fabrique de gabarits pour une notion d'une classe. */
export function fabrique(niveau: string, notionId: string, pref: string) {
  return (microId: string, n: number, difficulty: number, hint: string, generate: () => TutorGeneratedQuestionV4): TutorBankItemV4 =>
    ({
      kind: "template",
      id: `${pref}${microId}_tpl_${n}`,
      niveau,
      matiere: "maths",
      notionId,
      microId,
      difficulty,
      theme: "neutral",
      hint,
      tags: [niveau, microId, "template"],
      generate,
    }) as TutorBankItemV4;
}

/* ───────────────────── écritures exactes ───────────────────── */

/** Un terme p/q × corps ; corps "" = constante. */
export type Terme = { p: number; q: number; c: string };
export const T = (p: number, q: number, c = ""): Terme => {
  const g = pgcd(p, q) || 1;
  const s = q < 0 ? -1 : 1;
  return { p: (s * p) / g, q: (s * q) / g, c };
};
function corps(t: Terme) {
  const abs = Math.abs(t.p);
  if (t.c === "\\pi" && t.q !== 1) return `\\dfrac{${abs === 1 ? "" : abs}\\pi}{${t.q}}`;
  const coef = t.q === 1 ? (abs === 1 && t.c ? "" : String(abs)) : `\\dfrac{${abs}}{${t.q}}`;
  return `${coef}${t.c}`;
}
/** La somme écrite proprement : « 3e^{2} - \dfrac{1}{4} ». Les termes nuls disparaissent. */
export function somme(l: readonly Terme[]) {
  const v = l.filter((t) => t.p !== 0);
  if (!v.length) return "0";
  // Le premier terme positif passe devant : « 1 - ln 2 » plutôt que « -ln 2 + 1 ».
  const k = v.findIndex((t) => t.p > 0);
  if (k > 0) v.unshift(...v.splice(k, 1));
  return v.map((t, i) => (i === 0 ? `${t.p < 0 ? "-" : ""}${corps(t)}` : ` ${t.p < 0 ? "-" : "+"} ${corps(t)}`)).join("");
}
/** Ajoute une constante en la fusionnant avec le terme constant s'il existe. */
export function plusC(l: readonly Terme[], c: Terme): Terme[] {
  const i = l.findIndex((t) => t.c === "");
  if (i < 0) return [...l, c];
  return l.map((t, k) => (k === i ? T(t.p * c.q + c.p * t.q, t.q * c.q) : t));
}
/** Des pièges vraisemblables pour une valeur exacte (signes, oubli, décalage). */
export function fauxExacts(l: readonly Terme[]): string[] {
  const v = l.filter((t) => t.p !== 0);
  if (!v.length) return ["1", "-1", "2", "-2"];
  const dernier = v.length - 1;
  const res = [
    somme(v.map((t, i) => (i === dernier ? T(-t.p, t.q, t.c) : t))),
    somme(v.map((t, i) => (i === 0 ? T(-t.p, t.q, t.c) : t))),
    somme(v.map((t, i) => (i === 0 ? T(2 * t.p, t.q, t.c) : t))),
    somme(plusC(v, T(1, 1))),
    somme(plusC(v, T(-1, 1))),
  ];
  return [...new Set(res)].filter((s) => s !== somme(v));
}
/** Des pièges pour une PRIMITIVE : jamais la bonne à une constante près. */
export function fauxPrimitives(l: readonly Terme[], x = "x"): string[] {
  const v = l.filter((t) => t.p !== 0);
  const dernier = v.length - 1;
  const res = [
    somme(v.map((t, i) => (i === dernier ? T(-t.p, t.q, t.c) : t))),
    somme(v.map((t, i) => (i === 0 ? T(2 * t.p, t.q, t.c) : t))),
    somme([...v, T(1, 1, x)]),
    somme([...v, T(-1, 1, x)]),
    ...(v.length > 1 ? [somme(v.slice(0, dernier))] : [somme(v.map((t) => T(-t.p, t.q, t.c)))]),
  ];
  return [...new Set(res)].filter((s) => s !== somme(v));
}
/** ax + b écrit proprement (« 2x + 3 », « x - 1 », « x »), variable au choix. */
export function lin(m: number, p: number, x = "x") {
  return somme([T(m, 1, x), T(p, 1)]);
}
