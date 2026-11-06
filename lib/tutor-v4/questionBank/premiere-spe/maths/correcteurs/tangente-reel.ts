// Correcteurs de la tangente d'un réel : ils relisent le LaTeX de l'énoncé, recalculent tan x, le signe, les
// pôles, le nombre dérivé par différences finies, et n'utilisent aucune valeur du gabarit.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { deriveeNum, proche, seulChoix } from "../../../lycee-correcteurs-commun";
import { blocs, droite, expr, inline, intervalles, valeur } from "./lecture-trigo";

type Q = TutorGeneratedQuestionV4;
const R = "1s_tan_reel_tpl_";
const I = "1s_tan_identite_derivee_tpl_";
const exact = (q: Q, v: number) => (proche(Number(String(q.expected[0]).replace(",", ".")), v, 1e-6) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`]);
const choixVaut = (q: Q, v: number) => seulChoix(q, (c) => proche(valeur(c), v, 1e-7));
const blocAvec = (q: Q, cle: string) => {
  const b = blocs(q.text).find((s) => s.startsWith(cle));
  if (!b) throw new Error(`« ${cle} » absent : ${q.text}`);
  return valeur(droite(b));
};
const intervalleDuBloc = (q: Q) => {
  const b = blocs(q.text).find((s) => s.startsWith("\\left]"));
  if (!b) throw new Error(`intervalle absent : ${q.text}`);
  return intervalles(b)[0];
};
/** La fonction f(x) = … du premier paragraphe en formule. */
const fonction = (q: Q) => {
  const b = blocs(q.text).find((s) => /^[fh]\(x\) = /.test(s));
  if (!b) throw new Error(`fonction absente : ${q.text}`);
  const e = expr(droite(b));
  return (x: number) => e({ x });
};
/** Vrai si deux expressions de x coïncident sur quelques essais. */
const egales = (f: (x: number) => number, g: (x: number) => number) => [0.31, 0.7, 1.13, -0.52, -1.2].every((x) => proche(f(x), g(x), 1e-4));

const valeurDuBloc = (q: Q) => choixVaut(q, valeur(blocs(q.text)[0]));
const signe = (q: Q) => {
  const b = blocs(q.text)[0];
  let s: number;
  const m = b.match(/\\cos x ([<>]) 0 \\text\{ et \} \\sin x ([<>]) 0/);
  if (m) s = (m[1] === ">" ? 1 : -1) * (m[2] === ">" ? 1 : -1);
  else {
    const J = intervalles(b)[0];
    s = Math.sign(Math.tan((J.a + J.b) / 2));
  }
  return seulChoix(q, (c) => (s > 0 ? c.includes("> 0") : c.includes("< 0")));
};

export const CORRECTEURS: CorrecteursMaths = {
  [`${R}1`]: valeurDuBloc,
  [`${R}2`]: (q) => choixVaut(q, blocAvec(q, "\\sin x") / blocAvec(q, "\\cos x")),
  [`${R}3`]: (q) => seulChoix(q, (c) => proche(Math.cos(valeur(c)), 0, 1e-9)),
  [`${R}4`]: valeurDuBloc,
  [`${R}5`]: signe,
  [`${R}6`]: (q) => {
    const f = fonction(q);
    const pole = (x: number) => Math.abs(f(x)) > 1e8;
    return seulChoix(q, (c) => {
      const m = c.match(/x \\neq (.+?)\$/);
      if (!m) throw new Error(`condition illisible : ${c}`);
      const e = expr(m[1]);
      const [a, a1] = [e({ k: 0 }), e({ k: 1 })];
      if (!pole(a) || !pole(a1)) return false;
      // Aucun autre pôle entre deux valeurs voisines : sinon la condition en oublie.
      for (let t = 0.01; t < 0.99; t += 0.0005) if (Math.abs(f(a + t * (a1 - a))) > 200) return false;
      return true;
    });
  },
  [`${R}7`]: (q) => {
    const L = q.text.match(/\$(\d+)\$\u00a0m/);
    const ang = inline(q.text).find((s) => s.includes("\\pi"));
    if (!L || !ang) throw new Error(`mesures illisibles : ${q.text}`);
    const v = Number(L[1]) * Math.tan(valeur(ang));
    return seulChoix(q, (c) => proche(valeur(inline(c)[0]), v, 1e-6));
  },
  [`${R}8`]: (q) => {
    const J = intervalleDuBloc(q);
    const mil = (J.a + J.b) / 2;
    const donne = blocs(q.text)[0];
    const v = valeur(droite(donne));
    let t: number;
    if (donne.startsWith("\\sin")) {
      if (Math.sign(v) !== Math.sign(Math.sin(mil))) return ["sinus incompatible avec l'intervalle"];
      t = v / (Math.sign(Math.cos(mil)) * Math.sqrt(1 - v * v));
    } else {
      if (Math.sign(v) !== Math.sign(Math.cos(mil))) return ["cosinus incompatible avec l'intervalle"];
      t = (Math.sign(Math.sin(mil)) * Math.sqrt(1 - v * v)) / v;
    }
    return choixVaut(q, t);
  },
  [`${R}9`]: (q) => {
    const e = expr(blocs(q.text)[0]);
    return seulChoix(q, (c) => {
      const g = expr(c);
      return egales((x) => e({ x }), (x) => g({ x }));
    });
  },

  [`${I}1`]: (q) => {
    const e = expr(blocs(q.text)[0]);
    return seulChoix(q, (c) => {
      const g = expr(c);
      return egales((x) => e({ x }), (x) => g({ x }));
    });
  },
  [`${I}2`]: (q) => {
    const [b0, b1] = blocs(q.text);
    const t = valeur(droite(b0));
    return exact(q, b1 === "\\cos^2 x" ? 1 / (1 + t * t) : 1 + t * t);
  },
  [`${I}3`]: (q) => {
    const f = fonction(q);
    return seulChoix(q, (c) => {
      const g = expr(c);
      return egales((x) => deriveeNum(f, x), (x) => g({ x }));
    });
  },
  [`${I}4`]: (q) => {
    const t = blocAvec(q, "\\tan x");
    const J = intervalleDuBloc(q);
    return choixVaut(q, Math.sign(Math.cos((J.a + J.b) / 2)) / Math.sqrt(1 + t * t));
  },
  [`${I}5`]: (q) => {
    const t = blocAvec(q, "\\tan x");
    const J = intervalleDuBloc(q);
    const mil = (J.a + J.b) / 2;
    if (Math.sign(t) !== Math.sign(Math.tan(mil))) return ["tangente incompatible avec l'intervalle"];
    return choixVaut(q, (t * Math.sign(Math.cos(mil))) / Math.sqrt(1 + t * t));
  },
  [`${I}6`]: (q) => {
    const f = fonction(q);
    const b = blocs(q.text).find((s) => s.startsWith("f'"));
    if (!b) throw new Error(`point absent : ${q.text}`);
    const x = valeur(b.replace(/^f'\\left\(/, "").replace(/\\right\)$/, ""));
    return exact(q, Math.round(deriveeNum(f, x) * 1e4) / 1e4);
  },
  [`${I}7`]: (q) =>
    seulChoix(q, (c) => {
      const m = c.match(/^\$(.+) ([<>=]) (.+)\$$/);
      if (!m) return false;
      const [a, b] = [valeur(m[1]), valeur(m[3])];
      if (m[2] === "=") return proche(a, b, 1e-9);
      return m[2] === "<" ? a < b - 1e-9 : a > b + 1e-9;
    }),
  [`${I}8`]: (q) => {
    const f = fonction(q);
    let [mi, ma] = [Infinity, -Infinity];
    for (let x = -1.5; x <= 1.5; x += 0.01) {
      const d = deriveeNum(f, x);
      mi = Math.min(mi, d);
      ma = Math.max(ma, d);
    }
    return seulChoix(q, (c) => {
      if (/strictement croissante/.test(c)) return mi >= -1e-6 && ma > 1e-3;
      if (/strictement décroissante/.test(c)) return ma <= 1e-6 && mi < -1e-3;
      if (/change de sens/.test(c)) return mi < -1e-3 && ma > 1e-3;
      return false;
    });
  },
  [`${I}9`]: (q) => {
    const a = valeur(droite(blocs(q.text)[0]));
    return seulChoix(q, (c) => {
      const g = expr(droite(c));
      const y = (x: number) => g({ x });
      return proche(y(a), Math.tan(a), 1e-7) && proche(y(a + 1) - y(a), 1 / Math.cos(a) ** 2, 1e-7);
    });
  },
  [`${I}10`]: (q) => {
    const f = fonction(q);
    const b = blocs(q.text).find((s) => s.startsWith("h'"));
    if (!b) throw new Error(`point absent : ${q.text}`);
    const x = valeur(b.replace(/^h'\\left\(/, "").replace(/\\right\)$/, ""));
    return exact(q, Math.round(deriveeNum(f, x) * 1e4) / 1e4);
  },
};
