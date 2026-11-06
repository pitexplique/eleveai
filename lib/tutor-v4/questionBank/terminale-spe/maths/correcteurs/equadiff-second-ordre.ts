// Correcteurs du second ordre : ils relisent l'équation et les conditions, remettent chaque
// proposition dans l'équation par différences finies, et intègrent numériquement quand il
// faut une valeur. Aucune valeur du gabarit n'est utilisée.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { compiler, nue, seulChoix, type Env } from "../../../lycee-correcteurs-commun";
import { corrige, courtJuste, egal, finale, lu, mqFabrique, segments, type Q } from "./courbes-lire";

const mq = mqFabrique("tle_");
type F = (x: number) => number;
const H = 1e-3;
const XS = [0.15, 0.4, 0.75, 1.1];

const propre = (s: string) => s.replace(/\\footnotesize\\begin\{aligned\} & /, "").replace(/ \\\\ & (?=\()/, "").replace(/ \\end\{aligned\}/, "").replace(/\\left\(/g, "(").replace(/\\right\)/g, ")");
/** Les coefficients (a, b, c) de ay'' + by' + cy = 0, relus dans l'énoncé (`env` pour m). */
function lireEq(t: string, env: Env = {}): [number, number, number] {
  const seg = segments(t).find((s) => s.includes("y''"));
  if (!seg) throw new Error(`équation illisible : ${t}`);
  const [g, d] = seg.split(" = ").map((s) => compiler(s.replace(/y''/g, "P").replace(/y'/g, "Q").replace(/y/g, "R")));
  const v = (P: number, Q: number, R: number) => g({ ...env, P, Q, R }) - d({ ...env, P, Q, R });
  const c0 = v(0, 0, 0);
  if (Math.abs(c0) > 1e-9) throw new Error(`équation non homogène : ${seg}`);
  return [v(1, 0, 0), v(0, 1, 0), v(0, 0, 1)];
}
const d1 = (f: F, x: number) => (f(x + H) - f(x - H)) / (2 * H);
const d2 = (f: F, x: number) => (f(x + H) - 2 * f(x) + f(x - H)) / (H * H);
function resout(f: F, [a, b, c]: [number, number, number]) {
  return XS.every((x) => {
    const [y0, y1, y2] = [f(x), d1(f, x), d2(f, x)];
    const r = a * y2 + b * y1 + c * y0;
    return Math.abs(r) < 2e-3 * (1 + Math.abs(a * y2) + Math.abs(b * y1) + Math.abs(c * y0));
  });
}
const avec = (s: string, env: Env = {}) => {
  const e = compiler(s);
  return (x: number) => e({ ...env, x, t: x });
};
/** Une famille à deux constantes : les deux fonctions de base sont solutions et indépendantes. */
function generale(expr: string, eq: [number, number, number]) {
  if (!/A/.test(expr) || !/B/.test(expr)) return false;
  const u = avec(expr, { A: 1, B: 0 });
  const v = avec(expr, { A: 0, B: 1 });
  if (!resout(u, eq) || !resout(v, eq)) return false;
  const det = u(0.3) * v(0.9) - u(0.9) * v(0.3);
  return Math.abs(det) > 1e-6;
}
const solutionsGenerales = (q: Q) => {
  const eq = lireEq(q.text);
  return seulChoix(q, (c) => generale(nue(c), eq));
};
function caracteristique(q: Q): string[] {
  const [a, b, c] = lireEq(q.text);
  return seulChoix(q, (ch) => {
    const m = ch.replace(/\$/g, "").split(" = ")[0];
    const e = compiler(m);
    return [-2, 0.5, 3].every((r) => egal(e({ r }), a * r * r + b * r + c, 1e-6));
  });
}
function discriminant(q: Q): string[] {
  const [a, b, c] = lireEq(q.text);
  return courtJuste(q, b * b - 4 * a * c);
}
function periode(q: Q): string[] {
  const [a, b, c] = lireEq(q.text);
  if (b !== 0 || c / a <= 0) return ["pas une oscillation pure"];
  const T = (2 * Math.PI) / Math.sqrt(c / a);
  return seulChoix(q, (ch) => egal(compiler(nue(ch))({}), T, 1e-6));
}
function pulsation(q: Q): string[] {
  const [a, b, c] = lireEq(q.text);
  if (b !== 0) return ["amortie"];
  return courtJuste(q, Math.sqrt(c / a));
}
function regime(q: Q): string[] {
  const [a, b, c] = lireEq(q.text);
  const D = b * b - 4 * a * c;
  if (b / a < 0) return ["amplification"];
  if (D < 0) return corrige(q, b === 0 ? "Des oscillations d'amplitude constante" : "Des oscillations qui s'amortissent");
  return corrige(q, D === 0 ? "Un retour sans oscillation, avec une racine double" : "Un retour sans oscillation, avec deux racines distinctes");
}
function parametre(q: Q): string[] {
  const m = lu(String(q.expected[0]));
  const eq = lireEq(q.text, { m });
  const s = segments(q.text).map((x) => x.match(/^y = (.+)$/)).find(Boolean);
  if (!s) throw new Error(`solution illisible : ${q.text}`);
  return resout(avec(s[1]), eq) ? [] : [`m = ${m} : la fonction n'est pas solution`];
}

/* ─────────── conditions ─────────── */
type Cond = { x: number; v: number; derivee: boolean };
function lireConds(t: string): Cond[] {
  const l: Cond[] = [];
  for (const brut of segments(t)) {
    const s = propre(brut);
    const m = s.match(/^y('?)\((.+)\) = (.+)$/);
    if (!m || m[2] === "x" || m[2] === "t") continue;
    l.push({ derivee: m[1] === "'", x: compiler(m[2])({}), v: compiler(m[3])({}) });
  }
  if (l.length !== 2) throw new Error(`${l.length} condition(s) lue(s) : ${t}`);
  return l;
}
/** A et B de la forme écrite, par le système que donnent les deux conditions. */
function constantes(t: string) {
  const s = segments(t).map((x) => x.match(/^y\((?:x|t)\) = (.+)$/)).find(Boolean);
  if (!s) throw new Error(`forme illisible : ${t}`);
  const u = avec(s[1], { A: 1, B: 0 });
  const v = avec(s[1], { A: 0, B: 1 });
  const [c1, c2] = lireConds(t);
  const val = (f: F, c: Cond) => (c.derivee ? d1(f, c.x) : f(c.x));
  const [a, b, c, d] = [val(u, c1), val(v, c1), val(u, c2), val(v, c2)];
  const det = a * d - b * c;
  return { A: (c1.v * d - b * c2.v) / det, B: (a * c2.v - c1.v * c) / det };
}
function constanteLue(q: Q): string[] {
  const { A, B } = constantes(q.text);
  const L = finale(q.text).match(/\$([AB])\$/)?.[1];
  if (!L) throw new Error(`constante illisible : ${q.text}`);
  return courtJuste(q, L === "A" ? A : B, 2e-3);
}
function amplitude(q: Q): string[] {
  const { A, B } = constantes(q.text);
  return courtJuste(q, Math.hypot(A, B), 2e-3);
}
function solutionChoisie(q: Q): string[] {
  const eq = lireEq(q.text);
  const cs = lireConds(q.text);
  return seulChoix(q, (c) => {
    const f = avec(nue(c));
    return resout(f, eq) && cs.every((k) => egal(k.derivee ? d1(f, k.x) : f(k.x), k.v, 1e-2));
  });
}
/** La valeur demandée, par intégration numérique depuis les conditions initiales (Runge-Kutta). */
function valeurIntegree(q: Q): string[] {
  const [a, b, c] = lireEq(q.text);
  const cs = lireConds(q.text);
  const y0 = cs.find((k) => !k.derivee);
  const y1 = cs.find((k) => k.derivee);
  const cible = segments(finale(q.text)).map((s) => propre(s).match(/^y\((.+)\)$/)).find(Boolean);
  if (!y0 || !y1 || !cible) throw new Error(`illisible : ${q.text}`);
  const T = compiler(cible[1])({});
  const n = 4000;
  const h = T / n;
  const acc = (y: number, v: number) => -(b * v + c * y) / a;
  let [y, v] = [y0.v, y1.v];
  for (let k = 0; k < n; k++) {
    const [k1y, k1v] = [v, acc(y, v)];
    const [k2y, k2v] = [v + (h * k1v) / 2, acc(y + (h * k1y) / 2, v + (h * k1v) / 2)];
    const [k3y, k3v] = [v + (h * k2v) / 2, acc(y + (h * k2y) / 2, v + (h * k2v) / 2)];
    const [k4y, k4v] = [v + h * k3v, acc(y + h * k3y, v + h * k3v)];
    y += (h * (k1y + 2 * k2y + 2 * k3y + k4y)) / 6;
    v += (h * (k1v + 2 * k2v + 2 * k3v + k4v)) / 6;
  }
  return courtJuste(q, y, 1e-4);
}

export const CORRECTEURS: CorrecteursMaths = {
  ...mq("equadiff_second_ordre", {
    1: caracteristique, 2: discriminant, 3: solutionsGenerales, 4: solutionsGenerales,
    5: solutionsGenerales, 6: solutionsGenerales, 7: solutionsGenerales, 8: periode,
    9: pulsation, 10: regime, 11: solutionsGenerales, 12: parametre,
  }),
  ...mq("equadiff_second_ordre_conditions", {
    1: constanteLue, 2: constanteLue, 3: constanteLue, 4: solutionChoisie,
    5: solutionChoisie, 6: solutionChoisie, 7: solutionChoisie, 8: constanteLue,
    9: valeurIntegree, 10: constanteLue, 11: constanteLue, 12: amplitude,
  }),
};
