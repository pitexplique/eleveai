// Correcteurs des paraboles : coefficients retrouvés par évaluation, sommet cherché par balayage.
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { compiler } from "../../../lycee-correcteurs-commun";
import { correcteursContraposee } from "../../../lycee-correcteurs-logique";
import { accepte } from "../../../lycee-correcteurs-stats";

type Q = TutorGeneratedQuestionV4;
const A = "stmg_fct_d2_axe_par_image_egale_tpl_";
const S = "stmg_fct_d2_sommet_general_tpl_";
const fonc = (t: string, nom = "f") => {
  const m = t.match(new RegExp(`\\$${nom}\\(x\\) = (.*?)\\$`))!;
  const g = compiler(m[1]);
  return (x: number) => g({ x });
};
/** Sommet par balayage au dixième : aucun calcul de -b/2a. */
function sommet(g: (x: number) => number) {
  const a = (g(1) + g(-1)) / 2 - g(0);
  let meilleur = -50;
  for (let i = -500; i <= 500; i++) {
    const x = i / 10;
    if (a > 0 ? g(x) < g(meilleur) : g(x) > g(meilleur)) meilleur = x;
  }
  return { x: Math.round(meilleur * 10) / 10, y: g(meilleur), a };
}
const egal = (q: Q, j: string) => (q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`]);

export const CORRECTEURS: CorrecteursMaths = {
  ...correcteursContraposee("stmg_logique_contraposee"),
  [`${A}1`]: (q) => accepte(q, fonc(q.text)(0)),
  [`${A}2`]: (q) => {
    const g = fonc(q.text);
    const m = q.text.match(/\$f\((-?\d+)\) = f\((-?\d+)\)\$/)!;
    if (Math.abs(g(+m[1]) - g(+m[2])) > 1e-9) return ["les deux images diffèrent"];
    return accepte(q, sommet(g).x);
  },
  [`${A}3`]: (q) => {
    const g = fonc(q.text);
    const s = sommet(g).x;
    if (Math.abs(g(2 * s) - g(0)) > 1e-9) return ["2s n'est pas solution"];
    return egal(q, `$x = 0$ ou $x = ${2 * s}$`);
  },
  [`${A}4`]: (q) => accepte(q, sommet(fonc(q.text)).x),
  [`${A}5`]: (q) => {
    const g = fonc(q.text, "B");
    const x1 = Number(q.text.match(/\$x = (\d+)\$/)![1]);
    const v = Number(q.expected[0]);
    if (v === x1) return ["même valeur"];
    return Math.abs(g(v) - g(x1)) < 1e-9 ? [] : [`B(${v}) ≠ B(${x1})`];
  },
  [`${A}6`]: (q) => {
    const k = Number(q.text.match(/\$x = (-?\d+)\$/)![1]);
    const pb: string[] = [];
    for (const c of q.choices!) {
      const s = sommet(fonc(c)).x;
      if (c === q.expected[0] && s !== k) pb.push(`${c} : axe ${s}, pas ${k}`);
      if (c !== q.expected[0] && s === k) pb.push(`${c} a aussi l'axe ${k}`);
    }
    return pb;
  },
  [`${S}1`]: (q) => accepte(q, sommet(fonc(q.text)).y),
  [`${S}2`]: (q) => {
    const a = sommet(fonc(q.text)).a;
    return q.expected[0].startsWith(a > 0 ? "Un minimum : la parabole est tournée vers le haut" : "Un maximum : la parabole est tournée vers le bas") ? [] : ["mauvais sens"];
  },
  [`${S}3`]: (q) => {
    const s = sommet(fonc(q.text));
    return egal(q, `$(${s.x}\\,;${s.y})$`);
  },
  [`${S}4`]: (q) => {
    const s = sommet(fonc(q.text));
    return accepte(q, s.y);
  },
  [`${S}5`]: (q) => accepte(q, sommet(fonc(q.text, "B")).x),
  [`${S}6`]: (q) => accepte(q, sommet(fonc(q.text, "B")).y),
};
