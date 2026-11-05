// Correcteurs de la modélisation : on relit les montants et, pour la courbe, ses points.
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { accepte } from "../../../lycee-correcteurs-stats";

type Q = TutorGeneratedQuestionV4;
const P = "2de_fonction_modeliser_tpl_";
const tarif = (t: string) => {
  const m = t.match(/de (\d+) €, plus (\d+) € /)!;
  return [Number(m[1]), Number(m[2])];
};
const perim = (t: string) => Number(t.match(/\$(\d+)\$ m/)![1]);
const egal = (q: Q, j: string) => (q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`]);

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}1`]: (q) => {
    const [F, U] = tarif(q.text);
    return egal(q, `$f(x) = ${F} + ${U}x$`);
  },
  [`${P}2`]: (q) => {
    const [F, U] = tarif(q.text);
    const x = Number(q.text.match(/(?:coûtent |pour |de )(\d+) [a-zé]/g)!.pop()!.match(/\d+/)![0]);
    return accepte(q, F + U * x);
  },
  [`${P}3`]: (q) => {
    const d = perim(q.text) / 2;
    return egal(q, `$A(x) = x(${d} - x)$`);
  },
  [`${P}4`]: (q) => egal(q, `$[0\\,;${perim(q.text) / 2}]$`),
  [`${P}5`]: (q) => {
    const c = q.canvas as any;
    const pts: { x: number; y: number }[] = c.courbes[0].points;
    const d = perim(q.text) / 2;
    if (pts.some((p) => Math.abs(p.y - p.x * (d - p.x)) > 1e-9)) return ["la courbe n'est pas A(x)"];
    const haut = pts.reduce((a, p) => (p.y > a.y ? p : a));
    if (/maximale, en|la plus grande possible/.test(q.text)) return accepte(q, haut.y);
    if (/valeur de \$x\$/.test(q.text)) return accepte(q, haut.x);
    const m = q.text.match(/A\((\d+)\)\$\.|pour \$x = (\d+)\$/)!;
    const x = Number(m[1] ?? m[2]);
    return accepte(q, x * (d - x));
  },
  [`${P}6`]: (q) => {
    const m = q.text.match(/de (\d+) €, plus (\d+) € .* Formule B : (\d+) €/)!;
    const x = Number(m[1]) / (Number(m[3]) - Number(m[2]));
    return Number.isInteger(x) ? accepte(q, x) : ["seuil non entier"];
  },
};
