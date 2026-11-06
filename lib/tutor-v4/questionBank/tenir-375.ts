// LA CORRECTION QUI TIENT À 375 PX (06/11/2026), pour les banques des thèmes à trois pays.
//
// Vu en capture sur les 53 micros du jour :
//  · « 44 × 100 = 4 400 ; 4 400 ÷ 4 = / 1 100. » : un « = » en bout de ligne dans l'explication ;
//  · « La bonne réponse était : 542 cm² ou 542 ou 542 cm2 » : l'écran joint tout `expected`.
// La coupure se fait aux espaces ordinaires : une insécable après « = » garde le résultat avec
// lui. Une variante que le comparateur accepte déjà sans qu'on la liste n'apprend rien à
// l'élève : elle quitte `expected`, et la correction reste la même (on le recalcule ici).

import { compareAnswer } from "@/lib/tutor/evaluation/comparators";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const NBSP = " ";

const horsFormule = (s: string) =>
  s
    .replace(/ ([=≈]) /g, ` $1${NBSP}`)
    .replace(/(\d) (€|F CFA)/g, `$1${NBSP}$2`);
/** Une formule courte reste entière (« y = 5cos(7x) + / 5sin(7x) ») : elle passe à la ligne d'un bloc. */
const COURTE = 30;
const dansFormule = (s: string) => {
  const f = s.replace(/ (=|\\approx) /g, " $1 \\nobreak ");
  if (s.includes("\\text")) return f;
  // Longue, elle se coupe, mais son dernier terme ne part pas seul.
  return s.length <= COURTE ? f.replace(/ ([+-]) /g, " $1 \\nobreak ") : f.replace(/ ([+-]) (?!.* [+-] )/, " $1 \\nobreak ");
};

/** Le texte d'une explication, sans « = » en bout de ligne. */
export const colleEgal = (t: string) =>
  t
    .split(/(\$[^$]*\$)/)
    .map((s, i) => (i % 2 ? dansFormule(s) : horsFormule(s)))
    .join("");

/** « 1 242 000 F / CFA » dans le cadre de la bonne réponse : la monnaie ne se coupe pas. */
const monnaieEntiere = (t: string) => String(t).replace(/(\d) F CFA/g, `$1${NBSP}F${NBSP}CFA`);

/** La bonne réponse telle qu'on la montre : la première écriture, si elle suffit à accepter les autres. */
function attendueSeule(q: { comparator?: unknown; expected?: unknown }) {
  const e = q.expected as string[] | undefined;
  const c = q.comparator as Parameters<typeof compareAnswer>[0]["comparator"] | undefined;
  if (!c || !e || e.length < 2) return e;
  return e.slice(1).every((v) => compareAnswer({ comparator: c, answer: String(v), expected: [e[0]] })) ? [e[0]] : e;
}

/** Chaque gabarit de la banque passe sa correction par ces deux règles. L'énoncé ne change pas. */
export function tenir375<T extends TutorBankItemV4>(banque: readonly T[]): T[] {
  return banque.map((item) => {
    const g = item as unknown as { kind?: string; generate?: (...a: unknown[]) => Record<string, unknown> };
    if (g.kind !== "template" || !g.generate) return item;
    const generate = g.generate;
    return {
      ...item,
      generate: (...a: unknown[]) => {
        const q = generate(...a);
        return {
          ...q,
          expected: attendueSeule(q)?.map(monnaieEntiere),
          ...(Array.isArray(q.choices) ? { choices: (q.choices as string[]).map(monnaieEntiere) } : {}),
          explanation: typeof q.explanation === "string" ? colleEgal(q.explanation) : q.explanation,
        };
      },
    } as T;
  });
}
