// Outils partagés des micros CM2 ouvertes le 05/11/2026 (trous du programme).
//
// ⛔ Règles : aucune question ouverte en CM ; ★1-★2 phrase courte, sans prénom ni
// contexte ; contexte à partir de ★3. Division « ÷ », virgule décimale.
// Toutes les questions sont des QCM écrits à la main : les leurres disent une
// erreur d'élève (virgule mal placée, oubli d'un zéro…), pas des nombres au hasard.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";

export const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
export const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
export const melange = <T,>(l: readonly T[]): T[] =>
  l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Une phrase par liste, tirée au hasard, mises bout à bout. */
export const v = (...listes: readonly (readonly string[])[]) => listes.map((l) => un(l)).filter(Boolean).join(" ");

/** 1234.5 → « 1 234,5 ». Efface les poussières du calcul flottant. */
export function fr(n: number): string {
  const r = Math.round(n * 1e6) / 1e6;
  const [e, d] = String(r).split(".");
  const ent = e.length >= 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : e;
  return d ? `${ent},${d}` : ent;
}
export const net = (n: number) => Math.round(n * 1e6) / 1e6;
/** Un prix : 17.7 → « 17,70 » ; 18 → « 18 ». */
export const eur = (n: number) => (Number.isInteger(net(n)) ? fr(n) : fr(Math.floor(net(n))) + "," + net(n).toFixed(2).split(".")[1]);

export const exp = (definition: string, methode: string, calcul: string, conclusion: string) =>
  `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;

/** Les apostrophes droites deviennent typographiques, partout, au même endroit. */
export const typo = (t: string) => t.replace(/'/g, "’");

/** QCM à propositions écrites : jamais deux fois la même, toujours la bonne. */
export function qcm(juste: string, faux: readonly string[], explanation: string, text: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return { text: typo(text), format: "qcm", choices: melange([juste, ...d]).map(typo), expected: [typo(juste)], comparator: "mcq_exact", explanation: typo(explanation), ...(canvas ? { canvas } : {}) };
}

/** QCM numérique : les leurres de même valeur que la réponse (ou entre eux) sont écartés,
 *  et on complète avec des voisins pour avoir toujours quatre propositions. */
export function qcmN(juste: number, faux: readonly number[], explanation: string, text: string, canvas?: CanvasFigure, u = ""): TutorGeneratedQuestionV4 {
  const j = net(juste);
  const vus = new Set<number>([j]);
  const garde: number[] = [];
  for (const f of melange(faux.map(net))) if (f >= 0 && !vus.has(f)) { vus.add(f); garde.push(f); }
  const decimales = (String(j).split(".")[1] ?? "").length;
  const pas = 10 ** -decimales;
  for (let k = 1; garde.length < 3 && k < 30; k++)
    for (const f of [net(j + k * pas), net(j - k * pas)]) if (f >= 0 && !vus.has(f) && garde.length < 3) { vus.add(f); garde.push(f); }
  const s = (n: number) => `${u === "€" ? eur(n) : fr(n)}${u ? ` ${u}` : ""}`;
  return qcm(s(j), garde.slice(0, 3).map(s), explanation, text, canvas);
}

/** Fabrique de gabarits d'une micro. */
export const gabarits = (micro: string, notionId: string, tags: string[] = []) => {
  let n = 0;
  return (difficulty: number, hint: string, generate: () => TutorGeneratedQuestionV4): TutorBankItemV4 =>
    ({
      kind: "template",
      id: `${micro}_tpl_${++n}`,
      niveau: "cm2",
      matiere: "maths",
      notionId,
      microId: micro,
      difficulty,
      theme: "neutral",
      hint: typo(hint),
      tags: [...tags, "template"],
      generate,
    }) as TutorBankItemV4;
};

/** Les diviseurs d'un entier, dans l'ordre. */
export const diviseurs = (n: number) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
