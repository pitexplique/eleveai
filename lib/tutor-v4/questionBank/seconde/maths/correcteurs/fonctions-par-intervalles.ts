// Correcteurs des fonctions par intervalles et de |ax + b| en morceaux : ils relisent l'accolade, le dessin
// (ligne brisée, paliers pleins et creux) ou la formule écrite, et recalculent point par point.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { accepte } from "../../../lycee-correcteurs-stats";
import { seulChoix } from "../../../lycee-correcteurs-commun";
import { affineDe, evaluer, lireMorceaux, nombres, ordonnee, pointsDessin, proche, segments, traits, val, valeurMorceaux } from "./themes-3-pays-lecture";

type Q = TutorGeneratedQuestionV4;
const P = "2de_fct_par_intervalles_tpl_";
const A = "2de_abs_affine_morceaux_tpl_";

/** Le dernier nombre posé seul ou sous la forme f(n) : l'abscisse demandée. */
function abscisse(t: string) {
  const seg = segments(t);
  for (let i = seg.length - 1; i >= 0; i--) {
    const m = seg[i].match(/^(?:[a-z]\()?(-?[\d{},]+)\)?$/);
    if (m) return val(m[1]);
  }
  throw new Error(`abscisse illisible : ${t}`);
}
const GRILLE = Array.from({ length: 401 }, (_, i) => -50 + i / 4);
/** Mêmes valeurs aux points de la grille entre deux écritures. */
const memeFonction = (f: (x: number) => number, g: (x: number) => number, xs = GRILLE) => xs.every((x) => proche(f(x), g(x)));
/** Valeur d'une expression en escalier, au point donné : point plein sinon intérieur du palier. */
function palier(q: Q, x: number) {
  const pl = pointsDessin(q).filter((p) => !p.ouvert && proche(p.x, x));
  if (pl.length === 1) return pl[0].y;
  const t = traits(q).filter((k) => k[0].x < x - 1e-9 && x < k[k.length - 1].x - 1e-9);
  if (t.length !== 1) throw new Error(`${t.length} paliers en x = ${x}`);
  return t[0][0].y;
}
/** La formule posée d'une valeur absolue, en x. */
const formuleAbs = (t: string) => {
  const s = segments(t).find((x) => x.includes("\\left|"));
  if (!s) throw new Error(`formule illisible : ${t}`);
  return s.replace(/^[^=]*=\s*/, "").replace(/^x \\mapsto\s*/, "");
};
const nue = (c: string) => c.replace(/\$/g, "").replace(/^[^=]*=\s*/, "").replace(/^x \\mapsto\s*/, "");

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}1`]: (q) => accepte(q, valeurMorceaux(lireMorceaux(q.text), abscisse(q.text))),
  [`${P}2`]: (q) => accepte(q, ordonnee(traits(q), abscisse(q.text))),
  [`${P}3`]: (q) => accepte(q, palier(q, abscisse(q.text))),
  [`${P}4`]: (q) => {
    const m = q.text.match(/\[(-?\d+)\\,;(-?\d+)\]/);
    if (!m) throw new Error(`intervalle illisible : ${q.text}`);
    const [a, b] = [Number(m[1]), Number(m[2])];
    const t = traits(q);
    const xs = [a, (a + b) / 2, b];
    return seulChoix(q, (c) => xs.every((x) => proche(evaluer(c.replace(/\$/g, ""), { x }), ordonnee(t, x))));
  },
  [`${P}5`]: (q) => {
    const ms = lireMorceaux(q.text);
    const lu = segments(q.text).pop()!.match(/(-?\d+)$/);
    if (!lu) throw new Error(`valeur illisible : ${q.text}`);
    const v = Number(lu[1]);
    const sols: number[] = [];
    for (const m of ms) {
      const { a, b } = affineDe(m.expr);
      if (!a) continue;
      const x = (v - b) / a;
      if (m.test(x)) sols.push(x);
    }
    if (sols.length !== 1) throw new Error(`${sols.length} solutions : ${q.text}`);
    return accepte(q, sols[0]);
  },
  [`${P}6`]: (q) => {
    const xs = traits(q).flatMap((k) => [k[0].x + 0.25, k[0].x + 0.75, k[1].x]);
    return seulChoix(q, (c) => {
      const ms = lireMorceaux(c);
      return xs.every((x) => {
        const ok = ms.filter((m) => m.test(x));
        return ok.length === 1 && proche(evaluer(ok[0].expr, { x }), palier(q, x));
      });
    });
  },
  [`${P}7`]: (q) => {
    const [k, t, x] = nombres(q.text);
    return accepte(q, Math.ceil(x / t) * k);
  },
  [`${P}8`]: (q) => {
    const m = q.text.match(/\\begin\{cases\} (.+?) & \\text\{si \} x < (-?\d+) \\\\ (.+?) & /);
    if (!m) throw new Error(`accolade illisible : ${q.text}`);
    const k = Number(m[2]);
    const y = evaluer(m[1], { x: k });
    return accepte(q, y - evaluer(m[3], { x: k, m: 0 }));
  },
  [`${P}9`]: (q) => {
    const [q0, p1, s, p2] = nombres(q.text);
    const vrai = (x: number) => (x <= s ? q0 + p1 * x : q0 + p1 * s + p2 * (x - s));
    const xs = [0, s / 2, s, s + 1, s + 3];
    return seulChoix(q, (c) => {
      const ms = lireMorceaux(c);
      return xs.every((x) => proche(valeurMorceaux(ms, x), vrai(x)));
    });
  },

  [`${A}1`]: (q) => {
    const s = formuleAbs(q.text).replace("\\left|", "").replace("\\right|", "");
    const { a, b } = affineDe(s);
    return accepte(q, -b / a);
  },
  [`${A}2`]: (q) => accepte(q, evaluer(formuleAbs(q.text), { x: abscisse(q.text) })),
  [`${A}3`]: (q) => {
    const seg = segments(q.text);
    const cond = seg[0].match(/x (\\geq|\\leq) (-?\d+)/)!;
    const k = Number(cond[2]);
    const xs = [1, 2, 5, 9].map((d) => (cond[1] === "\\geq" ? k + d : k - d));
    const f = formuleAbs(q.text);
    return seulChoix(q, (c) => memeFonction((x) => evaluer(f, { x }), (x) => evaluer(c.replace(/\$/g, ""), { x }), xs));
  },
  [`${A}4`]: (q) => {
    const f = formuleAbs(q.text);
    const xs = GRILLE.slice(100, 300);
    return seulChoix(q, (c) => {
      const ms = lireMorceaux(c);
      return xs.every((x) => proche(valeurMorceaux(ms, x), evaluer(f, { x })));
    });
  },
  [`${A}5`]: (q) => {
    const f = formuleAbs(q.text);
    const v = (x: number) => evaluer(f, { x });
    const s = f.match(/\\left\|(.+?)\\right\|/)![1];
    const { a, b } = affineDe(s);
    const k = -b / a;
    return seulChoix(q, (c) => {
      const m = c.match(/\((-?\d+)\\,;(-?\d+)\)/)!;
      return proche(Number(m[1]), k) && proche(Number(m[2]), v(k));
    });
  },
  [`${A}6`]: (q) => {
    const t = traits(q);
    const xs = t[0].map((p) => p.x).concat((t[0][0].x + t[0][1].x) / 2, (t[0][1].x + t[0][2].x) / 2);
    return seulChoix(q, (c) => xs.every((x) => proche(evaluer(nue(c), { x }), ordonnee(t, x))));
  },
  [`${A}7`]: (q) => {
    const t = traits(q);
    const xs = t[0].map((p) => p.x).concat((t[0][0].x + t[0][1].x) / 2, (t[0][1].x + t[0][2].x) / 2);
    return seulChoix(q, (c) => xs.every((x) => proche(evaluer(nue(c), { x }), ordonnee(t, x))));
  },
  [`${A}8`]: (q) => {
    const seg = segments(q.text);
    const f = formuleAbs(q.text);
    const m = seg[0].match(/^(-?\d+) \\leq x \\leq (-?\d+)$/);
    let xs: number[];
    if (m) xs = [Number(m[1]), Number(m[2]), (Number(m[1]) + Number(m[2])) / 2];
    else {
      const d = seg[0].match(/^x (\\geq|\\leq) (-?\d+)$/)!;
      const k = Number(d[2]);
      xs = [0, 1, 3].map((u) => (d[1] === "\\geq" ? k + u : k - u));
    }
    return seulChoix(q, (c) => xs.every((x) => proche(evaluer(c.replace(/\$/g, ""), { x }), evaluer(f, { x }))));
  },
  [`${A}9`]: (q) => {
    const s = segments(q.text).find((x) => x.startsWith("d(t) = \\left|"))!;
    const inner = s.match(/\\left\|(.+)\\right\|/)![1];
    const { a, b } = affineDe(inner, "t");
    const t0 = -b / a;
    if (q.format !== "qcm") return accepte(q, t0);
    const cond = q.text.match(/t (\\leq|\\geq) (-?\d+)/)!;
    const xs = [1, 2, 4].map((d) => (cond[1] === "\\geq" ? t0 + d : t0 - d));
    return seulChoix(q, (c) => xs.every((t) => proche(evaluer(nue(c), { t }), Math.abs(a * t + b))));
  },
};
