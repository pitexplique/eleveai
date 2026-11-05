// Correcteurs des systèmes 3 × 3 : ils relisent les lignes écrites (ou les relevés, ou les points) et
// résolvent par leur propre pivot de Gauss, sans reprendre la solution du gabarit.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, proche, seulChoix } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
const P = "tle_systeme_3x3_gauss_tpl_";
const nu = (s: string) => Number(String(s).replace(",", "."));

/** Les trois lignes du bloc cases, et les trois lettres dans l'ordre alphabétique lu. */
function lire(t: string) {
  const c = t.match(/\\begin\{cases\}(.*?)\\end\{cases\}/);
  if (!c) throw new Error(`système illisible : ${t}`);
  const eqs = c[1].split("\\\\").map((s) => s.trim());
  const lettres = [...new Set(eqs.join(" ").match(/[a-z]/g) ?? [])].sort();
  if (eqs.length !== 3 || lettres.length !== 3) throw new Error(`système inattendu : ${c[1]}`);
  // L'ordre des inconnues : celui de l'alphabet, sauf x, y, z, u, v, w, p, q, r, a, b, c : tous déjà rangés.
  const lignes = eqs.map((e) => coefficients(e, lettres));
  return { lignes, lettres };
}
function coefficients(e: string, l: string[]) {
  const [g, d] = e.split("=");
  const fg = compiler(g);
  const fd = compiler(d);
  const G = (x: number, y: number, z: number) => fg({ [l[0]]: x, [l[1]]: y, [l[2]]: z }) - fd({ [l[0]]: x, [l[1]]: y, [l[2]]: z });
  const c0 = G(0, 0, 0);
  return [G(1, 0, 0) - c0, G(0, 1, 0) - c0, G(0, 0, 1) - c0, -c0];
}
/** Pivot de Gauss sur les lignes : rang et solution éventuelle. */
function gauss(m: number[][]) {
  const a = m.map((l) => [...l]);
  let r = 0;
  const piv: number[] = [];
  for (let c = 0; c < 3 && r < 3; c++) {
    const i = a.findIndex((l, k) => k >= r && Math.abs(l[c]) > 1e-9);
    if (i < 0) continue;
    [a[r], a[i]] = [a[i], a[r]];
    for (let k = 0; k < 3; k++) {
      if (k === r) continue;
      const f = a[k][c] / a[r][c];
      a[k] = a[k].map((x, j) => x - f * a[r][j]);
    }
    piv.push(c);
    r++;
  }
  const impossible = a.some((l) => Math.abs(l[0]) + Math.abs(l[1]) + Math.abs(l[2]) < 1e-9 && Math.abs(l[3]) > 1e-9);
  const sol = r === 3 && !impossible ? [0, 1, 2].map((i) => a[i][3] / a[i][piv[i]]) : null;
  return { r, impossible, sol };
}
function solution(t: string) {
  const { lignes, lettres } = lire(t);
  const g = gauss(lignes);
  if (!g.sol) throw new Error(`pas de solution unique : ${t}`);
  return { sol: g.sol, lettres, lignes };
}
const accepte = (q: Q, v: number) => (proche(nu(q.expected[0]), v, 1e-7) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`]);

/** L'inconnue demandée : la dernière lettre seule entre dollars. */
function inconnue(q: Q) {
  const { sol, lettres } = solution(q.text);
  const l = [...q.text.matchAll(/\$([a-z])\$/g)];
  if (!l.length) throw new Error(`inconnue illisible : ${q.text}`);
  const i = lettres.indexOf(l[l.length - 1][1]);
  return accepte(q, sol[i]);
}
function tripletJuste(q: Q): string[] {
  const { sol } = solution(q.text);
  return seulChoix(q, (c) => {
    const m = c.match(/^\$\((-?\d+)\\,;(-?\d+)\\,;(-?\d+)\)\$$/);
    if (!m) throw new Error(`triplet illisible : ${c}`);
    return [1, 2, 3].every((k) => proche(Number(m[k]), sol[k - 1]));
  });
}
/** Chaque opération proposée est appliquée pour de vrai : le coefficient de tête doit s'annuler. */
function operationQuiElimine(q: Q): string[] {
  const { lignes } = lire(q.text);
  return seulChoix(q, (c) => {
    const m = c.match(/L_\{(\d)\} \\leftarrow L_\{\d\} ([+-]) (\d*)L_\{1\}/);
    if (!m) throw new Error(`opération illisible : ${c}`);
    const k = (m[2] === "-" ? -1 : 1) * (m[3] ? Number(m[3]) : 1);
    return proche(lignes[Number(m[1]) - 1][0] + k * lignes[0][0], 0);
  });
}
function ligneObtenue(q: Q): string[] {
  const { lignes, lettres } = lire(q.text);
  const m = q.text.match(/L_\{(\d)\} \\leftarrow L_\{\d\} ([+-]) (\d*)L_\{1\}/);
  if (!m) throw new Error(`opération illisible : ${q.text}`);
  const k = (m[2] === "-" ? -1 : 1) * (m[3] ? Number(m[3]) : 1);
  const r = lignes[Number(m[1]) - 1].map((x, j) => x + k * lignes[0][j]);
  if (!proche(r[0], 0)) return ["l'opération n'élimine pas la première inconnue"];
  return seulChoix(q, (c) => {
    const co = coefficients(c.replace(/\$/g, ""), lettres);
    return co.every((x, j) => proche(x, r[j]));
  });
}
function expressionFinale(q: Q): string[] {
  const { sol, lettres } = solution(q.text);
  const segs = q.text.split("$").filter((_, i) => i % 2 === 1 && !_.includes("cases"));
  const e = segs[segs.length - 1];
  const f = compiler(e);
  return accepte(q, f({ [lettres[0]]: sol[0], [lettres[1]]: sol[1], [lettres[2]]: sol[2] }));
}
/** Les relevés : « 2 gourdes, 3 boussoles et 1 lampes pèsent 40 hectogrammes ». */
function releves(q: Q): string[] {
  const re = /(\d+) ([^\s,.]+), (\d+) ([^\s,.]+) et (\d+) ([^\s,.]+) [^\d.]*?(\d+) /g;
  const l = [...q.text.matchAll(re)];
  if (l.length !== 3) throw new Error(`relevés illisibles (${l.length}) : ${q.text}`);
  const g = gauss(l.map((m) => [Number(m[1]), Number(m[3]), Number(m[5]), Number(m[7])]));
  if (!g.sol) return ["relevés sans solution unique"];
  const noms = [l[0][2], l[0][4], l[0][6]];
  const i = noms.findIndex((n) => q.text.slice(q.text.lastIndexOf(". ") + 2).includes(n));
  if (i < 0) throw new Error(`objet demandé illisible : ${q.text}`);
  return accepte(q, g.sol[i]);
}
/** La parabole : chaque point lu donne une ligne ; on demande a, b ou c. */
function parabole(q: Q): string[] {
  const pts = [...q.text.matchAll(/\$\((-?\d+)\\,;(-?\d+)\)\$/g)].map((m) => [Number(m[1]), Number(m[2])]);
  if (pts.length !== 3) throw new Error(`points illisibles : ${q.text}`);
  const g = gauss(pts.map(([x, y]) => [x * x, x, 1, y]));
  if (!g.sol) return ["points alignés sur une verticale"];
  const fin = q.text.slice(q.text.indexOf("Que") >= 0 ? q.text.lastIndexOf("$(") : 0);
  const m = [...fin.matchAll(/\$([abc])\$/g)];
  if (!m.length) throw new Error(`coefficient illisible : ${q.text}`);
  return accepte(q, g.sol[["a", "b", "c"].indexOf(m[m.length - 1][1])]);
}
function nombreSolutions(q: Q): string[] {
  const g = gauss(lire(q.text).lignes);
  const j = g.impossible ? "Aucune solution" : g.r === 3 ? "Une seule solution" : "Une infinité de solutions";
  return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
}

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}1`]: inconnue,
  [`${P}2`]: inconnue,
  [`${P}3`]: tripletJuste,
  [`${P}4`]: tripletJuste,
  [`${P}5`]: operationQuiElimine,
  [`${P}6`]: ligneObtenue,
  [`${P}7`]: inconnue,
  [`${P}8`]: expressionFinale,
  [`${P}9`]: releves,
  [`${P}10`]: parabole,
  [`${P}11`]: nombreSolutions,
};
