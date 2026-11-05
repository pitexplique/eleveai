import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, deriveeNum, lireFonction, lireIntegrale, nombres, nue, proche, seuleJuste, seulChoix, simpson, val } from "../../../lycee-correcteurs-commun";

// Ils relisent l'équation, l'inéquation ou la fonction ÉCRITE, et la testent sur une
// grille fine ou par différences finies : aucune valeur ne vient du gabarit.

type Q = TutorGeneratedQuestionV4;
const f$ = (src: string) => {
  const c = compiler(src);
  return (x: number) => c({ x });
};

/** L'intervalle avec ses crochets : `]-\pi\,;\pi]`. */
function intervalle(t: string) {
  const m = t.match(/(\\left)?([\[\]])\s*(-?[^\[\];$]*?)\\,;\s*([^\[\];$]*?)\s*(\\right)?([\[\]])/);
  if (!m) throw new Error(`intervalle illisible : ${t}`);
  return { lo: val(m[3]), hi: val(m[4]), oLo: m[2] === "]", oHi: m[6] === "[" };
}
/** L'équation écrite dans le texte, ramenée à g(x) = 0. */
function equation(t: string) {
  for (const seg of t.split("$")) {
    if (!/\\(cos|sin) x/.test(seg) || !seg.includes("=")) continue;
    const [g, d] = seg.split("=");
    const G = f$(g);
    const D = f$(d);
    return (x: number) => G(x) - D(x);
  }
  throw new Error(`équation illisible : ${t}`);
}
const EPS = 1e-9;
/** Solutions d'une équation sur un intervalle : balayage fin, zéros doubles compris. */
function racines(g: (x: number) => number, I: ReturnType<typeof intervalle>) {
  const res: number[] = [];
  const N = 4800;
  for (let k = 0; k <= N; k++) {
    const x = I.lo + ((I.hi - I.lo) * k) / N;
    if (Math.abs(g(x)) < 1e-9) res.push(x);
    else if (k < N) {
      const y = I.lo + ((I.hi - I.lo) * (k + 1)) / N;
      if (g(x) * g(y) < 0 && Math.abs(g(y)) >= 1e-9) {
        let [a, b] = [x, y];
        for (let i = 0; i < 60; i++) {
          const m = (a + b) / 2;
          if (g(a) * g(m) <= 0) b = m;
          else a = m;
        }
        res.push((a + b) / 2);
      }
    }
  }
  return res
    .filter((x) => !(I.oLo && Math.abs(x - I.lo) < EPS) && !(I.oHi && Math.abs(x - I.hi) < EPS))
    .filter((x, i, l) => i === 0 || Math.abs(x - l[i - 1]) > 1e-6);
}
function lireEnsemble(c: string): number[] {
  if (c.includes("\\emptyset")) return [];
  const m = c.match(/\\left\\\{(.*)\\right\\\}/);
  if (!m) throw new Error(`ensemble illisible ${c}`);
  return m[1].split("\\,;").map((x) => val(x));
}
const memeEnsemble = (a: number[], b: number[]) => a.length === b.length && a.every((x, i) => proche(x, b[i], 1e-7));

function ensembleEq(q: Q): string[] {
  const g = equation(q.text);
  const I = intervalle(q.text.slice(q.text.search(/[\[\]](-|0)/)));
  const r = racines(g, I);
  return seulChoix(q, (c) => memeEnsemble(lireEnsemble(c).sort((a, b) => a - b), r));
}
function nbSolutions(q: Q): string[] {
  const m = q.text.match(/\\(cos|sin) x = (-?[\d{},]+)/);
  if (!m) return ["équation illisible"];
  const a = val(m[2]);
  const f = m[1] === "cos" ? Math.cos : Math.sin;
  const seg = q.text.split("$").find((s) => /\\,;/.test(s))!;
  const I = intervalle(seg);
  const n = racines((x) => f(x) - a, I).length;
  return String(n) === q.expected[0] ? [] : [`${n} solutions recalculées, attendu ${q.expected[0]}`];
}
function extremeSolution(q: Q): string[] {
  const g = equation(q.text);
  const r = racines(g, { lo: -Math.PI, hi: Math.PI, oLo: false, oHi: false });
  const v = /plus petite/.test(q.text) ? r[0] : r[r.length - 1];
  return seuleJuste(q, v);
}

/* ───── inéquations ───── */
function inequation(t: string) {
  for (const seg of t.split("$")) {
    const m = seg.match(/^(.*\\(?:cos|sin) x.*?)\s*(\\geq|\\leq|>|<)\s*(.*)$/);
    if (!m) continue;
    const G = f$(m[1]);
    const D = f$(m[3]);
    return (x: number) => {
      const d = G(x) - D(x);
      if (Math.abs(d) < 1e-9) return m[2] === "\\geq" || m[2] === "\\leq";
      return m[2] === "\\geq" || m[2] === ">" ? d > 0 : d < 0;
    };
  }
  throw new Error(`inéquation illisible : ${t}`);
}
function lireReunion(c: string) {
  const parts = c.replace(/\$/g, "").split("\\cup");
  const I = parts.map((p) => intervalle(p.trim()));
  return (x: number) =>
    I.some((i) => {
      const dansLo = Math.abs(x - i.lo) < 1e-9 ? !i.oLo : x > i.lo;
      const dansHi = Math.abs(x - i.hi) < 1e-9 ? !i.oHi : x < i.hi;
      return dansLo && dansHi;
    });
}
/** Grille : les 48 multiples de π/24, tous les angles remarquables et leurs milieux, plus 500 points. */
function grille() {
  const g: number[] = [];
  for (let k = -24; k <= 24; k++) g.push((k * Math.PI) / 24);
  for (let k = 0; k < 500; k++) g.push(-Math.PI + (2 * Math.PI * (k + 0.37)) / 500);
  return g;
}
function ensembleIneq(q: Q): string[] {
  const vrai = inequation(q.text);
  const G = grille();
  return seulChoix(q, (c) => {
    const m = lireReunion(c);
    return G.every((x) => m(x) === vrai(x));
  });
}
function longueur(q: Q): string[] {
  const vrai = inequation(q.text);
  const N = 240000;
  let n = 0;
  for (let k = 0; k < N; k++) if (vrai(-Math.PI + (2 * Math.PI * (k + 0.5)) / N)) n++;
  return seuleJuste(q, (2 * Math.PI * n) / N, {}, 1e-3);
}

/* ───── études ───── */
function derivee(q: Q): string[] {
  const F = lireFonction(q.text, "[fgh]");
  const pts = [0.2, 0.5, 0.9, 1.3, 2, 2.7];
  return seulChoix(q, (c) => {
    const d = f$(c.replace(/\$/g, ""));
    return pts.every((x) => proche(deriveeNum(F.f, x), d(x), 1e-4));
  });
}
function sensTrig(q: Q): string[] {
  const m = q.text.match(/\\(cos|sin)/);
  const seg = q.text.split("$").find((s) => /\\,;/.test(s))!;
  const I = intervalle(seg);
  const f = m![1] === "cos" ? Math.cos : Math.sin;
  const N = 400;
  let plus = true;
  let moins = true;
  for (let k = 0; k < N; k++) {
    const a = f(I.lo + ((I.hi - I.lo) * k) / N);
    const b = f(I.lo + ((I.hi - I.lo) * (k + 1)) / N);
    if (b <= a) plus = false;
    if (b >= a) moins = false;
  }
  const juste = plus ? "strictement croissante" : moins ? "strictement décroissante" : "ni croissante ni décroissante sur tout l'intervalle";
  return juste === q.expected[0] ? [] : [`recalculé : ${juste}, attendu ${q.expected[0]}`];
}
function sensR(q: Q): string[] {
  const F = lireFonction(q.text, "[fgh]");
  let plus = true;
  let moins = true;
  for (let x = -20; x < 20; x += 0.01) {
    if (F.f(x + 0.01) < F.f(x) - 1e-12) plus = false;
    if (F.f(x + 0.01) > F.f(x) + 1e-12) moins = false;
  }
  if (plus === moins) return ["ni croissante ni décroissante"];
  const juste = plus ? "croissante" : "décroissante";
  return q.expected[0].startsWith(juste) ? [] : [`recalculé ${juste}, attendu ${q.expected[0]}`];
}
function surIntervalle(q: Q) {
  const F = lireFonction(q.text, "[fgh]");
  const apres = q.text.slice(q.text.indexOf(F.source) + F.source.length);
  const I = intervalle(apres);
  const N = 20000;
  let xMax = I.lo;
  let xMin = I.lo;
  for (let k = 0; k <= N; k++) {
    const x = I.lo + ((I.hi - I.lo) * k) / N;
    if (F.f(x) > F.f(xMax) + 1e-13) xMax = x;
    if (F.f(x) < F.f(xMin) - 1e-13) xMin = x;
  }
  const estMax = /maximum|maximale|grande valeur|pic/.test(q.text);
  return { x: estMax ? xMax : xMin, y: F.f(estMax ? xMax : xMin) };
}
const ouExtremum = (q: Q) => seuleJuste(q, surIntervalle(q).x, {}, 1e-3);
const valeurExtremum = (q: Q) => seuleJuste(q, surIntervalle(q).y, {}, 1e-6);

/* ───── primitives ───── */
function primitive(q: Q): string[] {
  const m = q.text.match(/\\mapsto ([^$]+?)\$/) ?? q.text.match(/F'\(x\) = ([^$]+?)\$/);
  if (!m) return ["fonction illisible"];
  const f = f$(m[1]);
  const pts = [0.3, 0.8, 1.4, 2.2];
  return seulChoix(q, (c) => {
    const F = f$(nue(c));
    return pts.every((x) => proche(deriveeNum(F, x), f(x), 1e-4));
  });
}
const integraleVal = (q: Q) => seuleJuste(q, lireIntegrale(q.text).valeur);
function primitiveCondition(q: Q): string[] {
  const m = q.text.match(/\\mapsto ([^$]+?)\$/);
  const cond = q.text.match(/\(0\) = (-?\d+)\$/) ?? q.text.match(/la valeur \$(-?\d+)\$ en/);
  if (!m || !cond) return ["énoncé illisible"];
  const f = f$(m[1]);
  const c = Number(cond[1]);
  return seulChoix(q, (ch) => {
    const F = f$(nue(ch));
    return proche(F(0), c, 1e-9) && [0.3, 0.8, 1.4].every((x) => proche(deriveeNum(F, x), f(x), 1e-4));
  });
}
function moyenne(q: Q): string[] {
  const F = lireFonction(q.text, "f");
  return seuleJuste(q, simpson(F.f, 0, Math.PI) / Math.PI);
}
function carre(q: Q): string[] {
  // On vérifie aussi l'égalité donnée.
  const m = q.text.match(/\$\(\\(cos|sin) x\)\^\{2\} = (.+?)\$/);
  if (!m) return ["égalité illisible"];
  const g = f$(m[2]);
  const f = m[1] === "cos" ? Math.cos : Math.sin;
  const p: string[] = [];
  if (![0.3, 1.1, 2.5].every((x) => proche(f(x) ** 2, g(x), 1e-9))) p.push("égalité fausse");
  return [...p, ...integraleVal(q)];
}
void nombres;

export const CORRECTEURS: CorrecteursMaths = {
  tle_trigo_equation_cos_tpl_1: ensembleEq,
  tle_trigo_equation_cos_tpl_2: ensembleEq,
  tle_trigo_equation_cos_tpl_3: ensembleEq,
  tle_trigo_equation_cos_tpl_4: nbSolutions,
  tle_trigo_equation_cos_tpl_5: extremeSolution,
  tle_trigo_equation_cos_tpl_6: ensembleEq,
  tle_trigo_inequation_cos_tpl_1: ensembleIneq,
  tle_trigo_inequation_cos_tpl_2: ensembleIneq,
  tle_trigo_inequation_cos_tpl_3: ensembleIneq,
  tle_trigo_inequation_cos_tpl_4: ensembleIneq,
  tle_trigo_inequation_cos_tpl_5: ensembleIneq,
  tle_trigo_inequation_cos_tpl_6: longueur,
  tle_trigo_etude_fonction_tpl_1: derivee,
  tle_trigo_etude_fonction_tpl_2: sensTrig,
  tle_trigo_etude_fonction_tpl_3: sensR,
  tle_trigo_etude_fonction_tpl_4: ouExtremum,
  tle_trigo_etude_fonction_tpl_5: valeurExtremum,
  tle_trigo_etude_fonction_tpl_6: valeurExtremum,
  tle_trigo_primitives_tpl_1: primitive,
  tle_trigo_primitives_tpl_2: integraleVal,
  tle_trigo_primitives_tpl_3: primitiveCondition,
  tle_trigo_primitives_tpl_4: moyenne,
  tle_trigo_primitives_tpl_5: carre,
};
