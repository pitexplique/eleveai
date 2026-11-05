// Correcteurs des formules et équations trigonométriques : ils relisent le LaTeX
// écrit et recalculent. Une équation est balayée finement sur [−9,4 ; 9,4] et comparée
// à l'ensemble des valeurs des familles proposées, k entier compris.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, proche, seulChoix, val as valBase, type Env } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
const P = "1s_trig_";

/** Écritures que l'interpréteur commun ne lit pas : cos², sin², tan. */
const prep = (s: string) =>
  s
    .replace(/\\(cos|sin)\^2\s*(\\left\(.*?\\right\)|[a-z])/g, "(\\$1 $2)^2")
    .replace(/\\tan\s*(\\left\(.*?\\right\)|[a-z])/g, "\\frac{\\sin $1}{\\cos $1}");
const comp = (s: string) => compiler(prep(s));
const val = (s: string, e: Env = {}) => valBase(prep(s), e);
const nu = (c: string) => c.replace(/\$/g, "").trim();
const segs = (t: string) => t.split("$").filter((_, i) => i % 2 === 1);
const ENV = [
  { a: 0.7, b: 1.9, x: 0.7, y: 1.9, p: 0.7, q: 1.9, u: 0.7, v: 1.9, s: 0.7, t: 1.9 },
  { a: -1.3, b: 0.4, x: -1.3, y: 0.4, p: -1.3, q: 0.4, u: -1.3, v: 0.4, s: -1.3, t: 0.4 },
];
/** Vrai si les deux écritures valent la même chose aux points d'essai. */
const identique = (g: string, d: string) => ENV.every((e) => proche(val(g, e), val(d, e), 1e-9));
const egal = (q: Q, v: number): string[] => (proche(Number(String(q.expected[0]).replace(",", ".")), v, 1e-6) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`]);

/** Le premier segment du texte qui contient une ligne trigonométrique et l'une des lettres. */
function expressionTrig(t: string) {
  const s = segs(t).find((x) => /\\(cos|sin)/.test(x) && !x.includes("="));
  if (!s) throw new Error(`pas d'expression : ${t}`);
  return s;
}

/* ───────────────── équations ───────────────── */

function equation(t: string) {
  for (const s of segs(t)) {
    if (!/\\(cos|sin|tan)/.test(s) || !s.includes("=")) continue;
    const [g, d] = s.split("=");
    const [G, D] = [comp(g), comp(d)];
    return (x: number) => G({ x }) - D({ x });
  }
  throw new Error(`équation illisible : ${t}`);
}
/** Tous les zéros, doubles compris : on cherche les minimums de |g|. */
function racines(g: (x: number) => number, lo: number, hi: number, N = 4000) {
  const res: number[] = [];
  const pas = (hi - lo) / N;
  const ab = (x: number) => Math.abs(g(x));
  for (let i = 1; i < N; i++) {
    const x = lo + i * pas;
    const v = ab(x);
    if (!(v <= ab(x - pas) && v <= ab(x + pas)) || v > 0.5) continue;
    let [a, b] = [x - pas, x + pas];
    for (let k = 0; k < 80; k++) {
      const m1 = a + (b - a) / 3;
      const m2 = b - (b - a) / 3;
      if (ab(m1) <= ab(m2)) b = m2;
      else a = m1;
    }
    const r = (a + b) / 2;
    if (ab(r) < 1e-7 && (!res.length || Math.abs(res[res.length - 1] - r) > 1e-4)) res.push(r);
  }
  return res;
}
/** Les valeurs d'une proposition « x = A + 2kπ ou x = B + 2kπ » sur l'intervalle. */
function valeursFamilles(c: string, lo: number, hi: number) {
  const fams = [...c.matchAll(/x = ([^$]+)\$/g)].map((m) => compiler(m[1]));
  if (!fams.length) throw new Error(`familles illisibles : ${c}`);
  const vus: number[] = [];
  for (const f of fams)
    for (let k = -200; k <= 200; k++) {
      const v = f({ k });
      if (v > lo && v < hi && !vus.some((u) => Math.abs(u - v) < 1e-6)) vus.push(v);
    }
  return vus.sort((a, b) => a - b);
}
const LO = -9.4321;
const HI = 9.4321;
function equationGenerale(q: Q): string[] {
  const r = racines(equation(q.text), LO, HI);
  if (!r.length) return ["aucune solution trouvée"];
  // Deux propositions de mêmes solutions, écrites autrement : c'est une faute du QCM.
  const cles = (q.choices ?? []).map((c) => valeursFamilles(c, LO, HI).map((v) => v.toFixed(5)).join(";"));
  if (new Set(cles).size !== cles.length) return [`deux propositions ont les mêmes solutions : ${q.choices?.join(" | ")}`];
  return seulChoix(q, (c) => {
    const v = valeursFamilles(c, LO, HI);
    return v.length === r.length && v.every((x, i) => Math.abs(x - r[i]) < 1e-5);
  });
}
function intervalleDans(t: string) {
  const s = segs(t).find((x) => /[\[\]].*\\,;.*[\[\]]/.test(x));
  if (!s) throw new Error(`pas d'intervalle : ${t}`);
  const m = s.match(/([\[\]])([^\[\]]*?)\\,;([^\[\]]*?)([\[\]])/)!;
  return { lo: val(m[2]), hi: val(m[3]), oLo: m[1] === "]", oHi: m[4] === "[" };
}
function solutionsSur(q: Q) {
  const I = intervalleDans(q.text);
  const eps = 1e-3;
  const r = racines(equation(q.text), I.lo - eps, I.hi + eps, 6000);
  return r.filter((x) => (x > I.lo + 1e-6 || (!I.oLo && Math.abs(x - I.lo) < 1e-6)) && (x < I.hi - 1e-6 || (!I.oHi && Math.abs(x - I.hi) < 1e-6)));
}
function ensemble(c: string) {
  const m = c.match(/\\left\\\{(.*)\\right\\\}/);
  if (!m) throw new Error(`ensemble illisible ${c}`);
  return m[1].split("\\,;").map((x) => val(x)).sort((a, b) => a - b);
}

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}formule_addition_tpl_1`]: (q) => {
    const lhs = segs(q.text).find((s) => /\\(cos|sin)\([a-z] [+-] [a-z]\)/.test(s))!.match(/\\(cos|sin)\([a-z] [+-] [a-z]\)/)![0];
    return seulChoix(q, (c) => identique(lhs, nu(c)));
  },
  [`${P}formule_addition_tpl_2`]: (q) => {
    const e = expressionTrig(q.text);
    return seulChoix(q, (c) => identique(e, nu(c)));
  },
  [`${P}formule_addition_tpl_3`]: (q) => {
    const cible = segs(q.text).find((s) => /^\\(cos|sin)\\left/.test(s));
    const deco = segs(q.text).find((s) => s.includes("="));
    if (!cible || !deco) return ["énoncé illisible"];
    const [g, d] = deco.split("=");
    if (!proche(val(g), val(d))) return [`décomposition fausse : ${deco}`];
    const v = val(cible);
    return seulChoix(q, (c) => proche(val(nu(c)), v));
  },
  [`${P}formule_addition_tpl_4`]: (q) => {
    const lus = [...q.text.matchAll(/\\(cos|sin) ([a-z]) = ([^$]+)\$/g)];
    if (lus.length !== 4) return [`${lus.length} valeurs lues`];
    const d: Record<string, number> = {};
    for (const m of lus) d[`${m[1]}${m[2]}`] = val(m[3]);
    const t = q.text.match(/\\(cos|sin)\(([a-z]) ([+-]) ([a-z])\)/)!;
    const [fn, u, s, w] = [t[1], t[2], t[3], t[4]];
    const e = s === "+" ? 1 : -1;
    const v = fn === "cos" ? d[`cos${u}`] * d[`cos${w}`] - e * d[`sin${u}`] * d[`sin${w}`] : d[`sin${u}`] * d[`cos${w}`] + e * d[`cos${u}`] * d[`sin${w}`];
    return seulChoix(q, (c) => proche(val(nu(c)), v));
  },
  [`${P}formule_addition_tpl_5`]: (q) => {
    const m = q.text.match(/f\(x\) = ([^$]+)\$/)!;
    const pts = [0.3, 1.1, 2.7, -0.9];
    return seulChoix(q, (c) => pts.every((x) => proche(val(m[1], { x }), val(nu(c), { x }), 1e-9)));
  },
  [`${P}formule_addition_tpl_6`]: (q) => {
    const m = q.text.match(/f\(x\) = ([^$]+)\$/)!;
    let max = -Infinity;
    const f = comp(m[1]);
    for (let i = 0; i < 20000; i++) max = Math.max(max, f({ x: (i * 2 * Math.PI) / 20000 }));
    return seulChoix(q, (c) => proche(val(nu(c)), max, 1e-5));
  },

  [`${P}formule_duplication_tpl_1`]: (q) => {
    const lhs = q.text.match(/\\(cos|sin)\(2[a-z]\)/)![0];
    return seulChoix(q, (c) => identique(lhs, nu(c)));
  },
  [`${P}formule_duplication_tpl_2`]: (q) => {
    const e = expressionTrig(q.text);
    return seulChoix(q, (c) => identique(e, nu(c)));
  },
  [`${P}formule_duplication_tpl_3`]: (q) => {
    const m = q.text.match(/\\(cos|sin) ([a-z]) = ([^$]+)\$/)!;
    const I = q.text.match(/\\left\]([^$]*?)\\,;([^$]*?)\\right\[/)!;
    const [lo, hi] = [val(I[1]), val(I[2])];
    const lu = val(m[3]);
    const candidats = m[1] === "cos" ? [Math.acos(lu), -Math.acos(lu)] : [Math.asin(lu), Math.PI - Math.asin(lu), -Math.PI - Math.asin(lu)];
    const a = candidats.find((x) => x > lo && x < hi);
    if (a === undefined) return ["aucun angle dans l'intervalle"];
    const t = q.text.match(/\\(cos|sin)\(2[a-z]\)/)!;
    const v = t[1] === "cos" ? Math.cos(2 * a) : Math.sin(2 * a);
    return seulChoix(q, (c) => proche(val(nu(c)), v, 1e-9));
  },
  [`${P}formule_duplication_tpl_4`]: (q) => {
    const e = expressionTrig(q.text);
    const v = val(e);
    return seulChoix(q, (c) => proche(val(nu(c)), v));
  },
  [`${P}formule_duplication_tpl_5`]: (q) => {
    const m = q.text.match(/f\(x\) = ([^$]+)\$/)!;
    const pts = [0.3, 1.1, 2.7, -0.9];
    return seulChoix(q, (c) => pts.every((x) => proche(val(m[1], { x }), val(nu(c), { x }), 1e-9)));
  },
  [`${P}formule_duplication_tpl_6`]: (q) => {
    const m = q.text.match(/f\(x\) = ([^$]+)\$/)!;
    const f = comp(m[1]);
    let max = -Infinity;
    for (let i = 0; i <= 20000; i++) max = Math.max(max, f({ x: (i * Math.PI) / 2 / 20000 }));
    return egal(q, max);
  },

  [`${P}equation_generale_tpl_1`]: equationGenerale,
  [`${P}equation_generale_tpl_2`]: equationGenerale,
  [`${P}equation_generale_tpl_3`]: equationGenerale,
  [`${P}equation_generale_tpl_4`]: equationGenerale,
  [`${P}equation_generale_tpl_5`]: (q) => egal(q, solutionsSur(q).length),
  [`${P}equation_generale_tpl_6`]: (q) => {
    if (q.text.includes("]-\\pi\\,;\\pi]")) {
      const r = solutionsSur(q);
      return seulChoix(q, (c) => {
        const e = ensemble(c);
        return e.length === r.length && e.every((x, i) => Math.abs(x - r[i]) < 1e-5);
      });
    }
    return equationGenerale(q);
  },
};
