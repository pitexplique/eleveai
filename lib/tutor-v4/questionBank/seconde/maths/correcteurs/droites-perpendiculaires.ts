// Correcteurs des droites perpendiculaires par a × a' = −1 : ils relisent les équations et les coordonnées
// écrites, recalculent les coefficients et vérifient chaque équation proposée par évaluation.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { accepte } from "../../../lycee-correcteurs-stats";
import { compiler, seulChoix } from "../../../lycee-correcteurs-commun";
import { lirePoint, proche, segments, traits, val } from "./themes-3-pays-lecture";

type Q = TutorGeneratedQuestionV4;
const P = "2de_droite_perpendiculaire_coeff_tpl_";

/** y = expr : coefficient et ordonnée à l'origine. */
function droite(s: string) {
  const m = s.replace(/\$/g, "").match(/^y = (.+)$/);
  if (!m) throw new Error(`droite illisible : ${s}`);
  const f = compiler(m[1]);
  const b = f({ x: 0 });
  return { a: f({ x: 1 }) - b, b };
}
const equations = (t: string) => segments(t).filter((s) => s.startsWith("y = "));
/** ax + by = c lu par évaluation, mis sous forme réduite. */
function cartesienne(s: string) {
  const [g, d] = s.split("=");
  const F = compiler(g);
  const c = Number(d);
  const c0 = F({ x: 0, y: 0 });
  const A = F({ x: 1, y: 0 }) - c0;
  const B = F({ x: 0, y: 1 }) - c0;
  return { a: -A / B, b: (c - c0) / B };
}
const nomPoint = (t: string) => {
  const m = segments(t).find((s) => /^[A-Z]\(/.test(s));
  if (!m) throw new Error(`point illisible : ${t}`);
  return m[0];
};
/** L'unique équation proposée, de coefficient a', passant par (x, y). */
const parEquation = (q: Q, ap: number, x: number, y: number) =>
  seulChoix(q, (c) => {
    const d = droite(c);
    return proche(d.a, ap) && proche(d.a * x + d.b, y);
  });
const pointDeDroite = (t: string) => lirePoint(t, nomPoint(t));

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}1`]: (q) => {
    const [d1, d2] = equations(q.text).map(droite);
    const j = proche(d1.a * d2.a, -1) ? "Perpendiculaires" : proche(d1.a, d2.a) ? (proche(d1.b, d2.b) ? "Confondues" : "Parallèles") : "Sécantes, mais pas perpendiculaires";
    return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
  },
  [`${P}2`]: (q) => {
    const a = droite(equations(q.text)[0]).a;
    return seulChoix(q, (c) => proche(val(c.replace(/\$/g, "")) * a, -1));
  },
  [`${P}3`]: (q) => accepte(q, -1 / droite(equations(q.text)[0]).a),
  [`${P}4`]: (q) => {
    const a = droite(equations(q.text)[0]).a;
    const M = pointDeDroite(q.text);
    return parEquation(q, -1 / a, M.x, M.y);
  },
  [`${P}5`]: (q) => {
    const a = droite(equations(q.text)[0]).a;
    const M = pointDeDroite(q.text);
    return accepte(q, M.y - (-1 / a) * M.x);
  },
  [`${P}6`]: (q) => {
    const t = traits(q)[0];
    const a = (t[t.length - 1].y - t[0].y) / (t[t.length - 1].x - t[0].x);
    return seulChoix(q, (c) => Math.abs(val(c.replace(/\$/g, "")) * a + 1) < 1e-2);
  },
  [`${P}7`]: (q) => {
    const s = segments(q.text).find((x) => /=/.test(x) && /y/.test(x) && !x.startsWith("y ="))!;
    const a = cartesienne(s).a;
    const M = pointDeDroite(q.text);
    return parEquation(q, -1 / a, M.x, M.y);
  },
  [`${P}8`]: (q) => {
    const [A, B, C] = ["A", "B", "C"].map((n) => lirePoint(q.text, n));
    return parEquation(q, -(C.x - B.x) / (C.y - B.y), A.x, A.y);
  },
  [`${P}9`]: (q) => {
    const seg = segments(q.text).filter((s) => /^[A-Z]\(/.test(s));
    const [N1, N2] = [seg[0][0], seg[1][0]];
    const [A, B] = [lirePoint(q.text, N1), lirePoint(q.text, N2)];
    const I = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
    return parEquation(q, -(B.x - A.x) / (B.y - A.y), I.x, I.y);
  },
  [`${P}10`]: (q) => {
    const [A, B, C] = ["A", "B", "C"].map((n) => lirePoint(q.text, n));
    const scal = (B.x - A.x) * (C.x - A.x) + (B.y - A.y) * (C.y - A.y);
    const j = Math.abs(scal) < 1e-9 ? "Oui" : "Non";
    return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
  },
  [`${P}11`]: (q) => {
    const a = droite(equations(q.text)[0]).a;
    const M = pointDeDroite(q.text);
    return parEquation(q, -1 / a, M.x, M.y);
  },
};
