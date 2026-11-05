// Correcteurs histogramme, polygone cumulé, médiane estimée : on relit la figure.
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { accepte, lectureHistogramme } from "../../../lycee-correcteurs-stats";

type Q = TutorGeneratedQuestionV4;
const poly = (q: Q) => {
  const c = q.canvas as any;
  return { b: c.data.map((d: any) => Number(d.label)) as number[], F: c.data.map((d: any) => d.value) as number[] };
};
const x$ = (t: string, re: RegExp) => Number(t.match(re)![1]);
const med = (q: Q) => {
  const c = q.canvas as any;
  const lignes = c.rows.map((r: any) => r.values) as [string, number][];
  const b = lignes.map((l) => Number(l[0].match(/\[(\d+)/)![1]));
  const h = Number(lignes[0][0].match(/; (\d+)\[/)![1]) - b[0];
  const e = lignes.map((l) => l[1]);
  const N = e.reduce((a, v) => a + v, 0);
  let k = 0;
  let avant = 0;
  while (avant + e[k] <= N / 2) avant += e[k++];
  return { b, h, e, N, k, avant, m: b[k] + ((N / 2 - avant) / e[k]) * h };
};
const histoTous = Object.fromEntries([1, 2, 3, 4, 5, 6].map((n) => [`2de_stat_histogramme_tpl_${n}`, lectureHistogramme]));

export const CORRECTEURS: CorrecteursMaths = {
  ...histoTous,
  "2de_stat_polygone_cumule_tpl_1": (q) => {
    const { b, F } = poly(q);
    return accepte(q, F[b.indexOf(x$(q.text, /inférieure? à \$(\d+)\$/))]);
  },
  "2de_stat_polygone_cumule_tpl_2": (q) => {
    const { b, F } = poly(q);
    return accepte(q, 100 - F[b.indexOf(x$(q.text, /d'au moins \$(\d+)\$/))]);
  },
  "2de_stat_polygone_cumule_tpl_3": (q) => {
    const { b, F } = poly(q);
    return accepte(q, b[F.indexOf(50)]);
  },
  "2de_stat_polygone_cumule_tpl_4": (q) => {
    const { b, F } = poly(q);
    return accepte(q, b[F.indexOf(/Q_1/.test(q.text) ? 25 : 75)]);
  },
  "2de_stat_polygone_cumule_tpl_5": (q) => {
    const { b, F } = poly(q);
    const i = F.findIndex((v) => v > 50) - 1;
    return accepte(q, b[i] + ((b[i + 1] - b[i]) * (50 - F[i])) / (F[i + 1] - F[i]));
  },
  "2de_stat_polygone_cumule_tpl_6": (q) => {
    const { b, F } = poly(q);
    const N = Number((q.text.match(/Il y a (\d+)/) ?? q.text.match(/porte sur (\d+)/))![1]);
    const i = b.indexOf(x$(q.text, /classe \$\[(\d+)/));
    return accepte(q, ((F[i + 1] - F[i]) * N) / 100);
  },
  "2de_stat_mediane_estimee_tpl_1": (q) => {
    const s = med(q);
    const j = `$[${s.b[s.k]}\\,;${s.b[s.k] + s.h}[$`;
    return j === q.expected[0] ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
  },
  "2de_stat_mediane_estimee_tpl_2": (q) => accepte(q, med(q).avant),
  "2de_stat_mediane_estimee_tpl_3": (q) => accepte(q, med(q).m),
  "2de_stat_mediane_estimee_tpl_4": (q) => {
    const s = med(q);
    return accepte(q, s.N / 2 - s.avant);
  },
  "2de_stat_mediane_estimee_tpl_5": (q) => accepte(q, med(q).m),
  "2de_stat_mediane_estimee_tpl_6": (q) => {
    const s = med(q);
    const m = q.text.match(/entre \$(\d+)\$ et \$([\d{},]+)\$/);
    if (!m) return accepte(q, s.m);
    const a = Number(m[1]);
    const x = Number(m[2].replace("{,}", "."));
    return accepte(q, (s.e[s.b.indexOf(a)] * (x - a)) / s.h);
  },
};
