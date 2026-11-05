// Correcteurs du tableau croisé : on relit les cases dessinées, jamais le gabarit.
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { accepte } from "../../../lycee-correcteurs-stats";

type Q = TutorGeneratedQuestionV4;
const P = "2de_croise_";
const tab = (q: Q) => {
  const c = q.canvas as any;
  const r = c.rows.map((x: any) => x.values);
  return { head: c.headers as string[], r, a: r[0][1], b: r[1][1], l1: r[0][3], l2: r[1][3], c1: r[2][1], c2: r[2][2], N: r[2][3], n: [r[0][0].toLowerCase(), r[1][0].toLowerCase()] };
};
const coherent = (q: Q) => {
  const t = tab(q);
  const pb: string[] = [];
  if (t.l1 + t.l2 !== t.N) pb.push("lignes ≠ total");
  if (t.c1 + t.c2 !== t.N) pb.push("colonnes ≠ total");
  if (t.a + t.b !== t.c1) pb.push("colonne 1 ≠ total");
  if (t.a + t.r[0][2] !== t.l1) pb.push("ligne 1 ≠ total");
  return pb;
};
/** Le groupe nommé : le plus long libellé d'abord (« non abonnés » contient « abonnés »). */
const nommé = (s: string, t: ReturnType<typeof tab>) => {
  const long = t.n[0].length >= t.n[1].length ? 0 : 1;
  return s.toLowerCase().includes(t.n[long]) ? long : 1 - long;
};
const groupe = (q: Q, t: ReturnType<typeof tab>) => nommé(q.text.slice(q.text.indexOf(".") + 1), t);
const texteEgal = (q: Q, j: string) => (q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`]);
const fracT = (a: number, b: number) => `$\\dfrac{${a}}{${b}}$`;

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}completer_tableau_tpl_1`]: (q) => {
    const c = q.canvas as any;
    for (const v of c.rows.slice(0, 2).map((x: any) => x.values)) {
      const k = v.indexOf("?");
      if (k > 0) return accepte(q, v[3] - v[3 - k]);
    }
    return ["pas de case manquante"];
  },
  [`${P}completer_tableau_tpl_2`]: (q) => {
    const r = (q.canvas as any).rows.map((x: any) => x.values);
    for (let i = 0; i < 3; i++)
      for (let j = 1; j < 4; j++)
        if (r[i][j] === "?") {
          if (i < 2) return accepte(q, r[i][1] + r[i][2]);
          return accepte(q, j === 3 ? r[2][1] + r[2][2] : r[0][j] + r[1][j]);
        }
    return ["pas de case manquante"];
  },
  [`${P}completer_tableau_tpl_3`]: (q) => {
    const r = (q.canvas as any).rows.map((x: any) => x.values);
    return r[1][1] === "?" ? accepte(q, r[2][1] - r[0][1]) : ["pas de case manquante"];
  },
  [`${P}completer_tableau_tpl_4`]: (q) => {
    const m = q.text.match(/dans ce groupe, (\d+) sont .*En tout, (\d+)/);
    return m ? accepte(q, Number(m[2]) - Number(m[1])) : ["énoncé non lu"];
  },
  [`${P}completer_tableau_tpl_5`]: (q) => {
    const m = q.text.match(/Sur (\d+) .*?, (\d+) % .*dans ce groupe, (\d+) %/)!;
    return accepte(q, (Number(m[1]) * Number(m[2]) * Number(m[3])) / 10000);
  },
  [`${P}completer_tableau_tpl_6`]: (q) => {
    const m = q.text.match(/Sur (\d+) .*?, (\d+) % .*dans ce groupe, (\d+) %/)!;
    return accepte(q, (Number(m[1]) * Number(m[2]) * (100 - Number(m[3]))) / 10000);
  },
  [`${P}frequence_marginale_tpl_1`]: (q) => {
    const t = tab(q);
    return [...coherent(q), ...accepte(q, (groupe(q, t) ? t.l2 : t.l1) / t.N)];
  },
  [`${P}frequence_marginale_tpl_2`]: (q) => {
    const t = tab(q);
    return [...coherent(q), ...accepte(q, t.c1 / t.N)];
  },
  [`${P}frequence_marginale_tpl_3`]: (q) => {
    const t = tab(q);
    return [...coherent(q), ...texteEgal(q, fracT(t.c1, t.N))];
  },
  [`${P}frequence_marginale_tpl_4`]: (q) => {
    const t = tab(q);
    return [...coherent(q), ...accepte(q, t.a / t.N)];
  },
  [`${P}frequence_marginale_tpl_5`]: (q) => {
    const t = tab(q);
    const j = t.c1 > t.c2 ? t.head[1] : t.head[2];
    return q.expected[0].toLowerCase().includes(j.toLowerCase()) && q.expected[0].startsWith("Une majorité") ? [] : [`attendu ${q.expected[0]}, majorité ${j}`];
  },
  [`${P}frequence_marginale_tpl_6`]: (q) => {
    const t = tab(q);
    const M = Number(q.text.replace(/\u00a0/g, "").match(/(?:groupe de|sur) (\d{4,}) /)![1]);
    return accepte(q, (t.l1 / t.N) * M);
  },
  [`${P}frequence_conditionnelle_tpl_1`]: (q) => {
    const t = tab(q);
    const i = groupe(q, t);
    return [...coherent(q), ...accepte(q, i ? t.b / t.l2 : t.a / t.l1)];
  },
  [`${P}frequence_conditionnelle_tpl_2`]: (q) => {
    const t = tab(q);
    return accepte(q, t.a / t.c1);
  },
  [`${P}frequence_conditionnelle_tpl_3`]: (q) => {
    const t = tab(q);
    return texteEgal(q, fracT(t.a, t.l1));
  },
  [`${P}frequence_conditionnelle_tpl_4`]: (q) => {
    const t = tab(q);
    const g = t.a / t.l1 > t.b / t.l2 ? 0 : 1;
    return nommé(q.expected[0], t) === g ? [] : [`attendu ${q.expected[0]}, recalculé ${t.n[g]}`];
  },
  [`${P}frequence_conditionnelle_tpl_5`]: (q) => {
    const t = tab(q);
    const p = String(Math.round((t.a / t.l1) * 1e8) / 1e6).replace(".", "{,}");
    const pb: string[] = [];
    if (!q.expected[0].startsWith(`$${p}$ % des`)) pb.push(`pourcentage ${q.expected[0]} ≠ ${p}`);
    if (nommé(q.expected[0], t) !== 0) pb.push("mauvais groupe");
    return pb;
  },
  [`${P}frequence_conditionnelle_tpl_6`]: (q) => {
    const t = tab(q);
    const i = groupe(q, t);
    return accepte(q, t.r[i][2] / t.r[i][3]);
  },
};
