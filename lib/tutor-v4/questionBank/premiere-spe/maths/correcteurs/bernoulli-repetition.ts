// Correcteur Bernoulli : on énumère les 2ⁿ issues, sans formule de dénombrement.
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { accepte } from "../../../lycee-correcteurs-stats";

type Q = TutorGeneratedQuestionV4;
const A = "1s_pc_bernoulli_repetition_tpl_";
const U = "1s_pc_bernoulli_au_moins_un_tpl_";
const lire = (q: Q) => ({ p: Number(q.text.match(/probabilité \$0\{,\}(\d)\$/)![1]) / 10, n: Number(q.text.match(/répète (\d) fois/)?.[1] ?? 0) });
/** Loi du nombre de succès par énumération des 2ⁿ issues. */
function loi(p: number, n: number) {
  const r = Array(n + 1).fill(0);
  const chemins = Array(n + 1).fill(0);
  for (let m = 0; m < 1 << n; m++) {
    let k = 0;
    let pr = 1;
    for (let i = 0; i < n; i++) {
      if ((m >> i) & 1) { k++; pr *= p; } else pr *= 1 - p;
    }
    r[k] += pr;
    chemins[k]++;
  }
  return { r, chemins };
}
const exactement = (q: Q) => Number(q.text.match(/exactement (\d) succès/)![1]);
const parExact = (q: Q) => {
  const { p, n } = lire(q);
  return accepte(q, loi(p, n).r[exactement(q)], 2e-6);
};
const nb = (s: string) => Number(s.replace("{,}", "."));
/** Évalue l'écriture du QCM : « 3 × 0,2^{2} × 0,8 ». */
const evalue = (s: string) =>
  s.replace(/\$/g, "").split("\\times").reduce((a, f) => {
    const m = f.trim().match(/^([\d{},]+)(?:\^\{(\d)\})?$/)!;
    return a * nb(m[1]) ** Number(m[2] ?? 1);
  }, 1);

export const CORRECTEURS: CorrecteursMaths = {
  [`${A}1`]: (q) => {
    const { p, n } = lire(q);
    const l = loi(p, n).r;
    return accepte(q, /que des succès|soient des succès/.test(q.text) ? l[n] : l[0], 2e-6);
  },
  [`${A}2`]: (q) => {
    const { p, n } = lire(q);
    return accepte(q, loi(p, n).chemins[exactement(q)]);
  },
  [`${A}3`]: parExact,
  [`${A}4`]: parExact,
  [`${A}5`]: parExact,
  [`${A}6`]: (q) => {
    const { p, n } = lire(q);
    const v = loi(p, n).r[exactement(q)];
    const pb: string[] = [];
    if (Math.abs(evalue(q.expected[0]) - v) > 1e-9) pb.push(`écriture ${q.expected[0]} ≠ ${v}`);
    for (const c of q.choices!) if (c !== q.expected[0] && Math.abs(evalue(c) - v) < 1e-9) pb.push(`${c} vaut aussi ${v}`);
    return pb;
  },
  [`${U}1`]: (q) => (q.expected[0] === "N'obtenir aucun succès" ? [] : ["mauvais contraire"]),
  [`${U}2`]: (q) => {
    const { p, n } = lire(q);
    return accepte(q, loi(p, n).r[0], 2e-6);
  },
  [`${U}3`]: (q) => {
    const { p, n } = lire(q);
    return accepte(q, 1 - loi(p, n).r[0], 2e-6);
  },
  [`${U}4`]: (q) => {
    const { p, n } = lire(q);
    return accepte(q, 1 - loi(p, n).r[0], 2e-6);
  },
  [`${U}5`]: (q) => {
    const { p, n } = lire(q);
    const l = loi(p, n).r;
    return accepte(q, l.slice(2).reduce((a: number, b: number) => a + b, 0), 2e-6);
  },
  [`${U}6`]: (q) => {
    const p = lire(q).p;
    const s = nb(q.text.match(/(?:atteigne|atteint-elle) \$([\d{},]+)\$/)![1]);
    for (let n = 1; n <= 4; n++) if (1 - loi(p, n).r[0] >= s) return accepte(q, n);
    return ["seuil jamais atteint"];
  },
};
