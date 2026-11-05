// Correcteurs des combinaisons de vecteurs : coordonnées relues, décompositions vérifiées
// sur un vrai parallélogramme (coordonnées choisies au hasard, sommets calculés).
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { accepte } from "../../../lycee-correcteurs-stats";

type Q = TutorGeneratedQuestionV4;
const P = "2de_vecteur_combinaison_lineaire_tpl_";
const coord = (t: string, n: string) => {
  const m = t.match(new RegExp(`\\\\vec\\{${n}\\}\\\\,\\((-?\\d+)\\\\,;(-?\\d+)\\)`))!;
  return [Number(m[1]), Number(m[2])];
};
const coefs = (t: string) => {
  const m = t.match(/(-?\d*)\\vec\{u\} ([+-]) (\d*)\\vec\{v\}\$/)!;
  const l = m[1] === "" ? 1 : m[1] === "-" ? -1 : Number(m[1]);
  const b = m[3] === "" ? 1 : Number(m[3]);
  return [l, m[2] === "-" ? -b : b];
};
/** Lit « ½AB − AD » en coefficients sur (x, y). */
function lireDecomp(s: string, x: string, y: string) {
  const c: Record<string, number> = {};
  for (const m of s.matchAll(/([+-]?)\s*(\\dfrac\{1\}\{2\})?(\\overrightarrow\{[A-Z]{2}\})/g)) c[m[3]] = (m[1] === "-" ? -1 : 1) * (m[2] ? 0.5 : 1);
  return [c[x] ?? 0, c[y] ?? 0];
}
const vect = (a: number[], b: number[]) => [b[0] - a[0], b[1] - a[1]];
/** Vérifie la décomposition sur un parallélogramme non aplati. */
function verifie(q: Q, X: string, Y: string, V: string, sommets: Record<string, number[]>): string[] {
  const cx = lireDecomp(q.expected[0], `\\overrightarrow{${X}}`, `\\overrightarrow{${Y}}`);
  const s = (n: string) => sommets[n];
  const vX = vect(s(X[0]), s(X[1]));
  const vY = vect(s(Y[0]), s(Y[1]));
  const v = vect(s(V[0]), s(V[1]));
  const r = [cx[0] * vX[0] + cx[1] * vY[0], cx[0] * vX[1] + cx[1] * vY[1]];
  return Math.abs(r[0] - v[0]) < 1e-9 && Math.abs(r[1] - v[1]) < 1e-9 ? [] : [`décomposition fausse : ${q.expected[0]} pour ${V}`];
}
function para(q: Q) {
  const n = q.text.match(/^\$([A-Z])([A-Z])([A-Z])([A-Z])\$/)!.slice(1);
  const a = [0, 0], b = [4, 1], d = [1, 6], c = [5, 7];
  const s: Record<string, number[]> = { [n[0]]: a, [n[1]]: b, [n[2]]: c, [n[3]]: d };
  const mil = (p: string, r: string) => [(s[p][0] + s[r][0]) / 2, (s[p][1] + s[r][1]) / 2];
  const m = q.text.match(/milieu de \$\[([A-Z])([A-Z])\]\$/);
  if (m) s.I = mil(m[1], m[2]);
  if (/centre/.test(q.text)) s.O = mil(n[0], n[2]);
  const v = q.text.match(/(?:Exprime|Écris|Décompose) \$\\overrightarrow\{([A-Z]{2})\}\$/)![1];
  return { n, s, v };
}

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}1`]: (q) => {
    const [u, v] = [coord(q.text, "u"), coord(q.text, "v")];
    const [l, m] = coefs(q.text);
    const i = /ordonnée/.test(q.text) ? 1 : 0;
    return accepte(q, l * u[i] + m * v[i]);
  },
  [`${P}2`]: (q) => {
    const [u, v] = [coord(q.text, "u"), coord(q.text, "v")];
    const [l, m] = coefs(q.text.replace(/ \?$| ?\.$/, "").replace(/\$ \?$/, "$"));
    const j = `$(${l * u[0] + m * v[0]}\\,;${l * u[1] + m * v[1]})$`;
    return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
  },
  [`${P}3`]: (q) => {
    const [u, v, w] = [coord(q.text, "u"), coord(q.text, "v"), coord(q.text, "w")];
    const a = /\$\\vec\{w\} = a\\vec\{u\}/.test(q.text);
    if (a) {
      const m = q.text.match(/a\\vec\{u\} ([+-]) (\d*)\\vec\{v\}/)!;
      const b = (m[2] === "" ? 1 : Number(m[2])) * (m[1] === "-" ? -1 : 1);
      return accepte(q, (w[0] - b * v[0]) / u[0]);
    }
    const m = q.text.match(/= (-?\d*)\\vec\{u\} \+ b/)!;
    const l = m[1] === "" ? 1 : m[1] === "-" ? -1 : Number(m[1]);
    return accepte(q, (w[0] - l * u[0]) / v[0]);
  },
  [`${P}4`]: (q) => {
    const { n, s, v } = para(q);
    return verifie(q, n[0] + n[1], n[0] + n[3], v, s);
  },
  [`${P}5`]: (q) => {
    const { n, s, v } = para(q);
    return verifie(q, n[0] + n[1], n[0] + n[3], v, s);
  },
  [`${P}6`]: (q) => {
    const [u, v, w] = [coord(q.text, "u"), coord(q.text, "v"), coord(q.text, "w")];
    const d = u[0] * v[1] - u[1] * v[0];
    const a = (w[0] * v[1] - w[1] * v[0]) / d;
    const b = (u[0] * w[1] - u[1] * w[0]) / d;
    return accepte(q, /valeur de \$a\$|Détermine \$a\$|vaut \$a\$/.test(q.text) ? a : b);
  },
};
