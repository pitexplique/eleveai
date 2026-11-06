// Lecteurs communs aux correcteurs de trigonométrie et de vecteurs (06/11/2026) : ils relisent le LaTeX de
// l'énoncé, recalculent numériquement et ne reçoivent aucune valeur du gabarit.
import { compiler, type Env } from "../../../lycee-correcteurs-commun";

/** \cos^2 x → (\cos x)^2, que l'interpréteur commun sait lire. */
const propre = (s: string) =>
  s
    .replace(/\$/g, "")
    .replace(/\\(sin|cos|tan)\^2\s*([a-zA-Z])/g, "(\\$1 $2)^2")
    .replace(/\\nobreak/g, "");
export const expr = (s: string) => compiler(propre(s));
export const valeur = (s: string, env: Env = {}) => expr(s)(env);
/** Les formules seules dans leur paragraphe. */
export const blocs = (t: string) => [...`\n\n${t}\n\n`.matchAll(/\n\n\$([^$\n]+)\$(?=\n\n)/g)].map((m) => m[1]);
export const inline = (t: string) => [...t.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);
export const principale = (v: number) => {
  const x = v / Math.PI;
  const k = Math.ceil((x - 1) / 2 - 1e-9);
  return (x - 2 * k) * Math.PI;
};
export const congru = (a: number, b: number, tol = 1e-6) => {
  const q = (a - b) / (2 * Math.PI);
  return Math.abs(q - Math.round(q)) < tol;
};
/** Le côté droit de « … = … ». */
export const droite = (s: string) => s.slice(s.lastIndexOf("=") + 1).trim();

/* ───────── familles de solutions : « $x = a + 2k\pi$ ou $x = …$, avec $k \in \mathbb{Z}$ » ───────── */

export function valeursFamilles(c: string, lo: number, hi: number, env: Env = {}): number[] {
  const fam = inline(c).filter((f) => /^[a-zA-Z] = /.test(f));
  if (!fam.length) throw new Error(`famille illisible : ${c}`);
  const r: number[] = [];
  for (const f of fam) {
    const e = expr(f.slice(f.indexOf("=") + 1));
    for (let k = -80; k <= 80; k++) {
      const v = e({ ...env, k });
      if (v > lo && v < hi && !r.some((w) => Math.abs(w - v) < 1e-7)) r.push(v);
    }
  }
  return r.sort((a, b) => a - b);
}
/** Les zéros de g sur [lo ; hi], par balayage de |g| (zéros simples ou doubles). */
export function racines(g: (x: number) => number, lo: number, hi: number, pas = 0.002): number[] {
  const n = Math.round((hi - lo) / pas);
  const r: number[] = [];
  let a = Math.abs(g(lo - pas));
  let b = Math.abs(g(lo));
  for (let i = 0; i <= n; i++) {
    const x = lo + i * pas;
    const c = Math.abs(g(x + pas));
    if (b <= a && b <= c && b < 0.05) {
      // Affinage par section dorée sur le creux.
      let [u, v] = [x - pas, x + pas];
      for (let t = 0; t < 40; t++) {
        const m1 = u + (v - u) * 0.382;
        const m2 = u + (v - u) * 0.618;
        if (Math.abs(g(m1)) < Math.abs(g(m2))) v = m2;
        else u = m1;
      }
      const s = (u + v) / 2;
      if (Math.abs(g(s)) < 1e-6 && !r.some((w) => Math.abs(w - s) < 1e-3)) r.push(s);
    }
    a = b;
    b = c;
  }
  return r;
}
const memeListe = (a: number[], b: number[], tol = 2e-3) => a.length === b.length && a.every((x, i) => Math.abs(x - b[i]) < tol);
/** Vrai si la proposition donne exactement les zéros de g sur une plage de plus d'une période. */
export function familleJuste(c: string, g: (x: number) => number, L = 3.3, env: Env = {}): boolean {
  return memeListe(valeursFamilles(c, -L, L, env), racines(g, -L, L));
}
/** Une équation écrite « gauche = droite » : la différence. */
export function equation(src: string, nom = "x", env: Env = {}) {
  const [a, b] = propre(src).split("=");
  const A = compiler(a);
  const B = compiler(b);
  return (x: number) => A({ ...env, [nom]: x }) - B({ ...env, [nom]: x });
}

/* ───────── intervalles et ensembles ───────── */

export type Int = { a: number; b: number; fa: boolean; fb: boolean };
/** Tous les « \left[a\,;b\right[ » d'une écriture. */
export function intervalles(s: string): Int[] {
  return [...s.matchAll(/\\left([\[\]])(.+?)\\,;(.+?)\\right([\[\]])/g)].map((m) => ({ a: valeur(m[2]), b: valeur(m[3]), fa: m[1] === "[", fb: m[4] === "]" }));
}
export const dans = (x: number, I: Int) => (x > I.a + 1e-9 || (I.fa && Math.abs(x - I.a) < 1e-9)) && (x < I.b - 1e-9 || (I.fb && Math.abs(x - I.b) < 1e-9));
/** « \left\{a\,;b\right\} » → les valeurs. */
export function ensemble(c: string): number[] {
  const m = c.match(/\\left\\\{(.+?)\\right\\\}/);
  if (!m) throw new Error(`ensemble illisible : ${c}`);
  return m[1].split("\\,;").map((s) => valeur(s)).sort((a, b) => a - b);
}
/** Les zéros de g dans un intervalle, bornes comprises selon le crochet. */
export function racinesDans(g: (x: number) => number, I: Int): number[] {
  const r = racines(g, I.a - 0.01, I.b + 0.01);
  return r.filter((x) => (Math.abs(x - I.a) < 1e-3 ? I.fa : Math.abs(x - I.b) < 1e-3 ? I.fb : x > I.a && x < I.b));
}
export const memeEnsemble = (a: number[], b: number[]) => memeListe([...a].sort((x, y) => x - y), [...b].sort((x, y) => x - y));

/* ───────── vecteurs ───────── */

export type Pt = { x: number; y: number };
/** « 3\overrightarrow{MA} - \dfrac{2}{5}\overrightarrow{AB} » : la somme des vecteurs ; \vec{0} ne compte pas. */
export function vecteur(src: string, pos: Record<string, Pt>): Pt {
  const s = src.replace(/\$/g, "").replace(/\\,/g, "");
  let x = 0;
  let y = 0;
  for (const m of s.matchAll(/([+-]?)\s*((?:\\dfrac\{\d+\}\{\d+\})|\d*)\s*\\overrightarrow\{([A-Z])([A-Z])\}/g)) {
    const co = m[2] ? valeur(m[2]) : 1;
    const sg = m[1] === "-" ? -1 : 1;
    const [p, q] = [pos[m[3]], pos[m[4]]];
    if (!p || !q) throw new Error(`point inconnu dans ${src}`);
    x += sg * co * (q.x - p.x);
    y += sg * co * (q.y - p.y);
  }
  return { x, y };
}
/** Les couples (A ; 2) écrits dans un texte. */
export function poids(t: string): { nom: string; w: number }[] {
  return [...t.matchAll(/\$\(([A-Z])\\,;\s*(-?\d+)\)\$/g)].map((m) => ({ nom: m[1], w: Number(m[2]) }));
}
export function bary(pos: Record<string, Pt>, l: { nom: string; w: number }[]): Pt {
  const S = l.reduce((s, c) => s + c.w, 0);
  return { x: l.reduce((s, c) => s + c.w * pos[c.nom].x, 0) / S, y: l.reduce((s, c) => s + c.w * pos[c.nom].y, 0) / S };
}
/** Une position d'essai quelconque, non alignée, pour tester une égalité de vecteurs. */
export function positions(noms: string[]): Record<string, Pt> {
  const pos: Record<string, Pt> = {};
  noms.forEach((n, i) => (pos[n] = { x: Math.cos(i * 1.7) * (i + 2) + 0.31 * i, y: Math.sin(i * 2.3) * (i + 3) - 0.17 * i }));
  return pos;
}
export const nulVec = (v: Pt, tol = 1e-7) => Math.abs(v.x) < tol && Math.abs(v.y) < tol;
