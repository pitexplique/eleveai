// LECTURES COMMUNES AUX CORRECTEURS DES THÈMES « 3 PAYS » DE SECONDE (06/11/2026). Elles lisent le LaTeX
// écrit dans l'énoncé (|…|, E(…), accolades par morceaux, intervalles) : aucune valeur du gabarit.

import { compiler, nombres, proche, val, type Env } from "../../../lycee-correcteurs-commun";

export const segments = (t: string) => t.split("$").filter((_, i) => i % 2 === 1);

/** Remplace |…| et E(…) par leur valeur, puis calcule. Gère les imbrications simples. */
export function evaluer(src: string, env: Env = {}): number {
  let s = src.replace(/−/g, "-").replace(/\\nobreak/g, "");
  for (;;) {
    const d = s.indexOf("\\left|");
    if (d < 0) break;
    let n = 0;
    let k = d;
    let f = -1;
    while (k < s.length) {
      if (s.startsWith("\\left|", k)) {
        n++;
        k += 6;
      } else if (s.startsWith("\\right|", k)) {
        n--;
        if (!n) {
          f = k;
          break;
        }
        k += 7;
      } else k++;
    }
    if (f < 0) throw new Error(`barres non fermées : ${src}`);
    const v = Math.abs(evaluer(s.slice(d + 6, f), env));
    s = `${s.slice(0, d)}(${v.toFixed(10)})${s.slice(f + 7)}`;
  }
  for (;;) {
    const d = s.indexOf("E(");
    if (d < 0) break;
    let n = 0;
    let f = -1;
    for (let k = d + 1; k < s.length; k++) {
      if (s[k] === "(") n++;
      if (s[k] === ")" && --n === 0) {
        f = k;
        break;
      }
    }
    if (f < 0) throw new Error(`E( non fermé : ${src}`);
    const v = Math.floor(evaluer(s.slice(d + 2, f), env) + 1e-9);
    s = `${s.slice(0, d)}(${v < 0 ? `-${-v}` : v})${s.slice(f + 1)}`;
  }
  // Les écritures « (-0.5000000000) » passent par le compilateur.
  return compiler(s)(env);
}

/** La partie affine a x + b d'une écriture en x (lue par évaluation). */
export function affineDe(src: string, v = "x") {
  const f = compiler(src);
  const b = f({ [v]: 0 });
  return { a: f({ [v]: 1 }) - b, b };
}

/** Une formule posée à part : le segment `$…$` qui contient `motif`. */
export function segmentAvec(t: string, motif: RegExp) {
  const s = segments(t).find((x) => motif.test(x));
  if (!s) throw new Error(`formule illisible (${motif}) : ${t}`);
  return s;
}

/** Les deux côtés de |A| = c ou |A| = |B|. */
export function membres(s: string) {
  const i = s.indexOf("=");
  if (i < 0) throw new Error(`égalité illisible : ${s}`);
  return [s.slice(0, i).trim(), s.slice(i + 1).trim()];
}

export type Inter = { a: number; b: number; fa: boolean; fb: boolean };
/** Un ensemble écrit en LaTeX : réunion d'intervalles, {a ; b}, ∅, ℝ. */
export function lireEnsemble(src: string): Inter[] {
  const s = src.replace(/\$/g, "").replace(/\s+/g, "").replace(/^[^=]*=/, "").replace(/\{\}/g, "").replace(/\{-\}/g, "-").replace(/\\,\\cup\\,/g, "\\cup");
  if (s === "\\varnothing") return [];
  if (s === "\\mathbb{R}") return [{ a: -Infinity, b: Infinity, fa: false, fb: false }];
  const m = s.match(/^\\\{(.*)\\\}$/);
  if (m) return m[1].split("\\,;").map((v) => ({ a: val(v), b: val(v), fa: true, fb: true })).sort((p, q) => p.a - q.a);
  return s.split("\\cup").map((p) => {
    const [g, d] = p.slice(1, -1).split("\\,;");
    if (d === undefined) throw new Error(`intervalle illisible : ${src}`);
    return {
      a: g.includes("\\infty") ? -Infinity : val(g),
      b: d.includes("\\infty") ? Infinity : val(d),
      fa: p[0] === "[",
      fb: p[p.length - 1] === "]",
    };
  });
}
export const memeEnsemble = (A: Inter[], B: Inter[]) =>
  A.length === B.length && A.every((p, i) => (p.a === B[i].a || proche(p.a, B[i].a)) && (p.b === B[i].b || proche(p.b, B[i].b)) && p.fa === B[i].fa && p.fb === B[i].fb);

export type Morceau = { expr: string; test: (x: number) => boolean };
/** Une condition « x < k », « x \geq k », « p \leq x < q », « p < x \leq q ». */
function lireCondition(c: string): (x: number) => boolean {
  const toks = c.replace(/\\leq|\\leqslant/g, "≤").replace(/\\geq|\\geqslant/g, "≥").replace(/\s+/g, "");
  const parts = toks.split(/(≤|≥|<|>)/);
  const cmp = (u: number, op: string, w: number) => (op === "≤" ? u <= w + 1e-9 : op === "≥" ? u >= w - 1e-9 : op === "<" ? u < w - 1e-9 : u > w + 1e-9);
  return (x) => {
    for (let i = 0; i + 2 < parts.length; i += 2) {
      const g = parts[i] === "x" ? x : val(parts[i]);
      const d = parts[i + 2] === "x" ? x : val(parts[i + 2]);
      if (!cmp(g, parts[i + 1], d)) return false;
    }
    return true;
  };
}
/** La fonction écrite par morceaux dans un `\begin{cases}`. */
export function lireMorceaux(t: string): Morceau[] {
  const m = t.match(/\\begin\{cases\}(.*?)\\end\{cases\}/);
  if (!m) throw new Error(`accolade illisible : ${t}`);
  return m[1].split("\\\\").map((l) => {
    const [e, c] = l.split("&");
    if (!c) throw new Error(`ligne illisible : ${l}`);
    return { expr: e.trim(), test: lireCondition(c.replace(/\\text\{[^}]*\}/g, "")) };
  });
}
/** La valeur d'une fonction par morceaux : exactement un morceau doit s'appliquer. */
export function valeurMorceaux(ms: Morceau[], x: number) {
  const ok = ms.filter((m) => m.test(x));
  if (ok.length !== 1) throw new Error(`${ok.length} morceau(x) pour x = ${x}`);
  return evaluer(ok[0].expr, { x });
}

/** Les coordonnées d'un point nommé : « A(2\,;-3) ». */
export function lirePoint(t: string, nom: string) {
  const m = t.match(new RegExp(`${nom}\\((-?[^\\\\;()]+)\\\\,;(-?[^;()]+?)\\)`));
  if (!m) throw new Error(`point ${nom} illisible : ${t}`);
  return { x: val(m[1]), y: val(m[2]) };
}

/** La courbe du dessin (tous les traits) : l'ordonnée à l'abscisse x par interpolation dans un trait. */
export function traits(q: { canvas?: unknown }): { x: number; y: number }[][] {
  const c = q.canvas as { kind?: string; courbes?: { points?: { x: number; y: number }[] }[] } | undefined;
  if (c?.kind !== "fonctionGraphique") throw new Error("pas de repère");
  return (c.courbes ?? []).map((k) => k.points ?? []);
}
/** Les points posés sur le dessin. */
export function pointsDessin(q: { canvas?: unknown }) {
  const c = q.canvas as { points?: { x: number; y: number; ouvert?: boolean }[] } | undefined;
  return c?.points ?? [];
}
export function ordonnee(ts: { x: number; y: number }[][], x: number) {
  for (const t of ts)
    for (let i = 1; i < t.length; i++)
      if (x >= t[i - 1].x - 1e-9 && x <= t[i].x + 1e-9) {
        const r = (x - t[i - 1].x) / (t[i].x - t[i - 1].x);
        return t[i - 1].y + r * (t[i].y - t[i - 1].y);
      }
  throw new Error(`x = ${x} hors du dessin`);
}

export { nombres, proche, val };
