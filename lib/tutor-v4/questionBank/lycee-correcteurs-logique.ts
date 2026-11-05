// Correcteur de la contraposée, commun à la seconde et à la STMG (05/11/2026).
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { IMPLICATIONS, repriseDe, SI, siAlors } from "./lycee-logique-commun";

type Q = TutorGeneratedQuestionV4;
const trouver = (q: Q) => IMPLICATIONS.find((i) => q.text.includes(`« ${siAlors(i, i.P, i.Q)} »`));
const egal = (q: Q, j: string) => (q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`]);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** Négation calculée, pour relire les énoncés mathématiques de la preuve par contraposée. */
const nier = (s: string) => {
  if (s.includes("\\neq")) return s.replace("\\neq", "=");
  if (s.includes(" = ")) return s.replace("=", "\\neq");
  if (s.includes("impair")) return s.replace("impair", "pair");
  return s.replace("pair", "impair");
};

export function correcteursContraposee(pref: string): Record<string, (q: Q) => string[]> {
  const c = (n: number) => `${pref}_tpl_${n}`;
  const avec = (f: (q: Q, i: (typeof IMPLICATIONS)[number]) => string[]) => (q: Q) => {
    const i = trouver(q);
    return i ? f(q, i) : ["implication non retrouvée"];
  };
  return {
    [c(1)]: avec((q, i) => egal(q, siAlors(i, i.nQ, i.nP))),
    [c(2)]: avec((q, i) => {
      if (q.text.endsWith(`« ${siAlors(i, i.nQ, i.nP)} »`)) return egal(q, "sa contraposée");
      if (q.text.endsWith(`« ${siAlors(i, i.Q, i.P)} »`)) return egal(q, "sa réciproque");
      return ["phrase montrée inconnue"];
    }),
    [c(3)]: avec((q, i) => egal(q, siAlors(i, i.nQ, i.nP))),
    [c(4)]: avec((q, i) => (q.text.includes(`${repriseDe(i, i.nQ)}.`) ? egal(q, cap(`${repriseDe(i, i.nP)}.`)) : ["observation absente"])),
    [c(5)]: (q) => {
      const m = q.text.match(/« Si (.*?), alors (.*?)\. »/)!;
      return egal(q, SI(nier(m[2]), nier(m[1])));
    },
    [c(6)]: avec((q, i) => egal(q, i.recVrai ? "La réciproque et la contraposée sont vraies." : "La contraposée est vraie, la réciproque est fausse.")),
  };
}
