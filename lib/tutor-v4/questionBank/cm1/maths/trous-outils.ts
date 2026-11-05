// OUTILS DES GABARITS « TROUS DU PROGRAMME » (05/11/2026), CM1 et 6e.
//
// ⛔ CM1 : aucune question ouverte. Tous ces gabarits rendent un QCM (zéro clavier,
// voir mathsKeyboardFreeTransform.ts). Les leurres sont écrits ici, un par erreur
// d'élève, plutôt que fabriqués après coup.
// ⭐ Un squelette se compte sur le texte, nombres retirés : les tournures se
// composent (`tournure`), et les lettres de points comptent. Sinon un élève
// reconnaît la phrase.

import type { CanvasFigure, DifficultyLevel, SchoolLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

export const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
export const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
export const melange = <T,>(l: T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Écriture française : virgule, espace insécable dès 1 000. */
export function fr(n: number): string {
  const [e, d] = String(Math.round(n * 1000) / 1000).split(".");
  const ent = e.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return d ? `${ent},${d}` : ent;
}

export type Qcm = Pick<TutorGeneratedQuestionV4, "format" | "choices" | "expected" | "comparator">;

/** QCM à propositions écrites : jamais deux fois la même, 4 au plus. */
export function qcm(juste: string, faux: string[]): Qcm {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return { format: "qcm", choices: melange([juste, ...d]), expected: [juste], comparator: "mcq_exact" };
}

/** QCM de nombres : leurres distincts en VALEUR, complétés par des voisins s'il en manque. */
export function qcmN(juste: number, faux: number[], u = "", pas = 1): Qcm {
  const ecr = (v: number) => (u ? `${fr(v)} ${u}` : fr(v));
  const arr = (v: number) => Math.round(v * 1000) / 1000;
  const vals: number[] = [];
  for (const v of melange(faux.map(arr))) if (v > 0 && v !== arr(juste) && !vals.includes(v)) vals.push(v);
  for (let k = 1; vals.length < 3 && k < 30; k++) {
    for (const v of [arr(juste + k * pas), arr(juste - k * pas)]) if (v > 0 && !vals.includes(v) && vals.length < 3) vals.push(v);
  }
  return qcm(ecr(juste), vals.slice(0, 3).map(ecr));
}

/** Une tournure tirée dans chaque liste, mises bout à bout. */
export const tournure = (...listes: string[][]) => listes.map((l) => un(l)).filter(Boolean).join(" ");

export const etapes = (methode: string, calcul: string, conclusion: string) =>
  `Méthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;

/** Le fabricant des gabarits d'une micro. */
export const atelier =
  (niveau: SchoolLevel, notionId: string, microId: string, prefixe = "") =>
  (n: number, difficulty: DifficultyLevel, hint: string, generate: () => Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure }): TutorBankItemV4 =>
    ({
      kind: "template",
      id: `${prefixe}${microId}_tpl_${n}`,
      niveau,
      matiere: "maths",
      notionId,
      microId,
      difficulty,
      theme: "neutral",
      hint,
      tags: [notionId, microId, "template"],
      generate,
    }) as TutorBankItemV4;

/** Douze façons de demander un calcul nu. */
export const CALC = (x: string) => [`Calcule ${x}.`, `Effectue ${x}.`, `Trouve ${x}.`, `Quel est le résultat de ${x} ?`, `Combien fait ${x} ?`, `Que vaut ${x} ?`, `Donne le résultat de ${x}.`, `Résous ${x}.`, `${x} = ?`, `Cherche ${x}.`, `Complète : ${x} = …`, `Que donne ${x} ?`];

export const LETTRES = ["A", "B", "C", "D", "E", "F", "G", "K", "M", "N", "P", "R", "S", "T"];
