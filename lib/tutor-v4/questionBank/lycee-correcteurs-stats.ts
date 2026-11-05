// Correcteurs des lectures d'histogramme (05/11/2026) : ils relisent le DESSIN (hauteurs,
// bornes) et la question écrite, et refont le calcul sans passer par le gabarit.

import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { proche } from "./lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
export const num = (s: string) => Number(String(s).replace(/\s|%/g, "").replace(",", "."));
export const accepte = (q: Q, v: number, tol = 1e-6): string[] => (proche(num(q.expected[0]), v, tol) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`]);

export function lectureHistogramme(q: Q): string[] {
  const c = q.canvas as any;
  if (c?.kind !== "stat_graph" || c.graphType !== "histogramme") return ["pas d'histogramme"];
  if (c.display?.showValues) return ["les effectifs sont écrits sur le dessin"];
  const eff: number[] = c.data.map((d: any) => d.value);
  const b: number[] = c.bornes;
  const N = eff.reduce((a, x) => a + x, 0);
  if (eff.some((e) => e % c.display.step)) return ["effectif non lisible sur la graduation"];
  const t = q.text;
  const cl = t.match(/classe \$\[(\d+)\\,;(\d+)\[\$/);
  const idx = cl ? b.indexOf(+cl[1]) : -1;
  if (cl && b[idx + 1] !== +cl[2]) return ["classe introuvable"];
  if (/plus représentée|plus grand effectif|le plus d/.test(t)) {
    const i = eff.indexOf(Math.max(...eff));
    const j = `$[${b[i]}\\,;${b[i + 1]}[$`;
    return j === q.expected[0] ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
  }
  if (/centre/.test(t)) return accepte(q, eff.reduce((a, e, i) => a + (e * (b[i] + b[i + 1])) / 2, 0) / N);
  const x = t.match(/(inférieure? à|d'au moins|supérieure? ou égale? à) \$(\d+)\$/);
  if (x) {
    const k = b.indexOf(+x[2]);
    const n = x[1].startsWith("inf") ? eff.slice(0, k).reduce((a, v) => a + v, 0) : eff.slice(k).reduce((a, v) => a + v, 0);
    return accepte(q, /pourcentage/.test(t) ? (n * 100) / N : n);
  }
  if (idx >= 0) return accepte(q, /fréquence|pourcentage|part/.test(t) ? (eff[idx] * 100) / N : eff[idx]);
  if (/total|en tout/.test(t)) return accepte(q, N);
  return ["question non reconnue"];
}
