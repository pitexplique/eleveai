// Correcteurs de première : arbre relu, probabilités refaites par dénombrement sur 100 000 personnes.
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { accepte, lectureHistogramme } from "../../../lycee-correcteurs-stats";

type Q = TutorGeneratedQuestionV4;
const C = "1_alea_cond_faux_negatifs_tpl_";
const G = "1_alea_loi_grands_nombres_tpl_";
const test = (q: Q) => {
  const m = q.text.match(/, (\d+) % des personnes ont .*positif chez (\d+) % des malades, et négatif chez (\d+) % des/)!;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
};
const egal = (q: Q, j: string) => (q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`]);
/** L'arbre doit dire la même chose que l'énoncé. */
function arbreOk(q: Q): string[] {
  const [p, se, sp] = test(q);
  const a = (q.canvas as any).racineEnfants;
  const n = (s: string) => Number(s.replace(",", "."));
  const ok = Math.abs(n(a[0].proba) - p / 100) < 1e-9 && Math.abs(n(a[0].enfants[0].proba) - se / 100) < 1e-9 && Math.abs(n(a[1].enfants[1].proba) - sp / 100) < 1e-9 && Math.abs(n(a[0].proba) + n(a[1].proba) - 1) < 1e-9 && Math.abs(n(a[1].enfants[0].proba) + n(a[1].enfants[1].proba) - 1) < 1e-9;
  return ok ? [] : ["arbre différent de l'énoncé"];
}
const quatre = (q: Q, N = 100000) => {
  const [p, se, sp] = test(q);
  const mal = (N * p) / 100;
  const sain = N - mal;
  return { VP: (mal * se) / 100, FN: (mal * (100 - se)) / 100, FP: (sain * (100 - sp)) / 100, VN: (sain * sp) / 100, N };
};
const VOCAB: Record<string, string> = { "atteinte|négatif": "un faux négatif", "atteinte|positif": "un vrai positif", "pas|positif": "un faux positif", "pas|négatif": "un vrai négatif" };

export const CORRECTEURS: CorrecteursMaths = {
  [`${C}1`]: (q) => egal(q, VOCAB[`${/atteinte/.test(q.text) ? "atteinte" : "pas"}|${/test négatif/.test(q.text) ? "négatif" : "positif"}`]),
  [`${C}2`]: (q) => {
    const v = Number(q.text.match(/(\d+) %/)![1]);
    return accepte(q, 100 - v);
  },
  [`${C}3`]: (q) => {
    const N = Number(q.text.replace(/ /g, "").match(/On teste (\d+)/)![1]);
    const t = quatre(q, N);
    return [...arbreOk(q), ...accepte(q, Math.round(/faux négatifs attend|Combien de malades/.test(q.text) ? t.FN : t.FP))];
  },
  [`${C}4`]: (q) => {
    const t = quatre(q);
    return [...arbreOk(q), ...accepte(q, (/soit malade et|P\(M \\cap/.test(q.text) ? t.FN : t.FP) / t.N, 1e-9)];
  },
  [`${C}5`]: (q) => {
    const t = quatre(q);
    const neg = /test négatif \?|P\(\\overline\{T\}\)/.test(q.text);
    return [...arbreOk(q), ...accepte(q, (neg ? t.FN + t.VN : t.VP + t.FP) / t.N, 1e-9)];
  },
  [`${C}6`]: (q) => {
    const t = quatre(q);
    const v = /Une personne a un test positif/.test(q.text) ? t.FP / (t.FP + t.VP) : t.FN / (t.FN + t.VN);
    return [...arbreOk(q), ...accepte(q, Math.round(v * 1000) / 1000, 1e-9)];
  },
  [`${G}1`]: (q) => {
    const c = q.canvas as any;
    const fin = c.data[c.data.length - 1].value;
    const lu = Number(q.expected[0].match(/\$(\d+)\$/)![1]);
    return Math.abs(fin - lu) <= 1.5 ? [] : [`la courbe finit à ${fin}, attendu ${lu}`];
  },
  [`${G}2`]: (q) => (/rapproche|proche/.test(q.expected[0]) ? [] : ["énoncé juste mal choisi"]),
  [`${G}3`]: (q) => {
    const t = q.text.replace(/ /g, "");
    const m = t.match(/simulation de (\d+) .*? donne (\d+) fois/)!;
    return accepte(q, Number(m[2]) / Number(m[1]));
  },
  [`${G}4`]: (q) => {
    const t = q.text.replace(/ /g, "");
    const p = Number(t.match(/autour de \$(\d+)\$ %/)![1]);
    const M = Number(t.slice(t.indexOf("autour de")).match(/[Ss]ur (\d+) /)![1]);
    return accepte(q, (p * M) / 100);
  },
  [`${G}5`]: (q) => {
    const tailles = q.choices!.map((c) => Number(c.replace(/ /g, "").match(/sur (\d+)/)![1]));
    const i = tailles.indexOf(Math.max(...tailles));
    return q.choices![i] === q.expected[0] ? [] : ["ce n'est pas la plus longue simulation"];
  },
  [`${G}6`]: (q) => {
    const p = Number(q.expected[0].replace(/[^\d.]/g, ""));
    const faux = q.text.match(/« (.*?) »/);
    return p > 0 && p < 1 && faux ? [] : [`test ${q.expected[0]} impossible`];
  },
  ...Object.fromEntries([1, 2, 3, 4, 5, 6].map((n) => [`1_auto_stat_lire_histogramme_tpl_${n}`, lectureHistogramme])),
};
