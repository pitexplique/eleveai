// Correcteurs de la fonction réciproque : ils relisent la fonction écrite, testent
// la monotonie sur une grille, vérifient g(f(x)) = x. Aucune valeur du gabarit.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, deriveeNum, lireFonction, nue, proche, seulChoix, val } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
const P = "tle_reciproque_";

const racineCubique = (s: string) => s.replace(/\\sqrt\[3\]\{([^}]*)\}/g, "($1)^{\\frac{1}{3}}");
const compilerX = (src: string) => {
  const c = compiler(racineCubique(src));
  return (x: number) => c({ x });
};
type Int = { lo: number; hi: number; oLo: boolean; oHi: boolean; sauf?: number };
function borne(s: string) {
  if (s.includes("+\\infty")) return Infinity;
  if (s.includes("-\\infty")) return -Infinity;
  return val(s);
}
/** Un intervalle écrit en LaTeX : `]a\,;+\infty[`, `\mathbb{R}`, `\mathbb{R}\setminus\{a\}`. */
function lireInt(s: string): Int {
  const sauf = s.match(/\\setminus\\\{(-?[\d.]+)\\\}/);
  if (s.includes("\\mathbb{R}")) return { lo: -Infinity, hi: Infinity, oLo: true, oHi: true, ...(sauf ? { sauf: Number(sauf[1]) } : {}) };
  const m = s.match(/([\[\]])\s*(.+?)\\,;\s*(.+?)\s*(?:\\right)?([\[\]])/);
  if (!m) throw new Error(`intervalle illisible : ${s}`);
  return { lo: borne(m[2]), hi: borne(m[3]), oLo: m[1] === "]" || m[2].includes("\\infty"), oHi: m[4] === "[" || m[3].includes("\\infty") };
}
const segmentsDollars = (t: string) => t.split("$").filter((_, i) => i % 2 === 1);
/** Le premier intervalle du texte : celui de départ, écrit avant l'image. */
function intervalleTexte(t: string): Int {
  const s = segmentsDollars(t).find((x) => /[\[\]].*\\,;.*[\[\]]|\\mathbb\{R\}/.test(x));
  if (!s) throw new Error(`pas d'intervalle : ${t}`);
  return lireInt(s);
}
/** Des points à l'intérieur de l'intervalle. */
function grille(I: Int, n = 200): number[] {
  const lo = Number.isFinite(I.lo) ? I.lo : Number.isFinite(I.hi) ? I.hi - 12 : -6;
  const hi = Number.isFinite(I.hi) ? I.hi : Number.isFinite(I.lo) ? I.lo + 12 : 6;
  const res: number[] = [];
  for (let k = 1; k < n; k++) res.push(lo + ((hi - lo) * k) / n);
  return res.filter((x) => I.sauf === undefined || Math.abs(x - I.sauf) > 1e-6);
}
function sens(f: (x: number) => number, I: Int): 1 | -1 | 0 {
  const pts = grille(I, 400).map(f);
  let s = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = pts[i] - pts[i - 1];
    if (!Number.isFinite(d) || d === 0) return 0;
    if (s === 0) s = Math.sign(d);
    else if (s !== Math.sign(d)) return 0;
  }
  return s as 1 | -1 | 0;
}
const egalNum = (q: Q, v: number): string[] => (proche(Number(String(q.expected[0]).replace(",", ".")), v, 1e-6) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`]);
/** Un seul choix est-il l'inverse de f sur l'intervalle ? */
function expressionJuste(q: Q): string[] {
  const F = lireFonction(q.text);
  const I = intervalleTexte(q.text);
  const f = (x: number) => F.f(x);
  const pts = grille(I, 40).filter((x) => Number.isFinite(f(x)));
  if (pts.length < 10) return ["trop peu de points"];
  return seulChoix(q, (c) => {
    const g = compilerX(nue(c));
    return pts.every((x) => proche(g(f(x)), x, 1e-6));
  });
}
const couples = (t: string) => [...t.matchAll(/\((-?\d+)\\,;(-?\d+)\)/g)].map((m) => [Number(m[1]), Number(m[2])] as const);
const valeursDe = (t: string, n: string) => [...t.matchAll(new RegExp(`${n}\\((-?\\d+)\\) = (-?\\d+)`, "g"))].map((m) => [Number(m[1]), Number(m[2])] as const);
/** La lettre de la fonction, lue sur « f^{-1} » ou sur « f(… ». */
function nomDe(t: string) {
  const m = t.match(/([fgh])(?:\^\{-1\}|'|\()/);
  if (!m) throw new Error(`pas de fonction nommée : ${t}`);
  return m[1];
}

/** L'image exacte d'un intervalle, par échantillonnage logarithmique près des bornes. */
function imageDe(f: (x: number) => number, I: Int) {
  const xs: number[] = [];
  const bas = Number.isFinite(I.lo) ? I.lo : null;
  const haut = Number.isFinite(I.hi) ? I.hi : null;
  if (bas !== null && !I.oLo) xs.push(bas);
  if (haut !== null && !I.oHi) xs.push(haut);
  for (let t = -30; t <= 30; t += 0.5) {
    const e = 10 ** t;
    if (bas !== null && haut === null) xs.push(bas + e);
    else if (bas === null && haut !== null) xs.push(haut - e);
    else if (bas === null && haut === null) xs.push(e, -e);
    else xs.push(bas! + ((haut! - bas!) * (t + 30.5)) / 61);
  }
  xs.push(...grille(I, 200));
  const vs = xs.map(f).filter((v) => !Number.isNaN(v));
  let lo = Math.min(...vs);
  let hi = Math.max(...vs);
  if (lo < -40) lo = -Infinity;
  if (hi > 40) hi = Infinity;
  const atteint = (v: number, borneX: number | null, ouvert: boolean) => borneX !== null && !ouvert && Math.abs(f(borneX) - v) < 1e-6;
  const fermeLo = Number.isFinite(lo) && (atteint(lo, bas, I.oLo) || atteint(lo, haut, I.oHi));
  const fermeHi = Number.isFinite(hi) && (atteint(hi, bas, I.oLo) || atteint(hi, haut, I.oHi));
  return { lo, hi, fermeLo, fermeHi };
}
const memesBornes = (a: number, b: number) => (a === b ? true : proche(a, b, 1e-4));

export const CORRECTEURS: CorrecteursMaths = {
  [`${P}bijection_tpl_1`]: (q) => {
    const m = [...q.text.matchAll(/\\\{([^}]*?)\\\}/g)].map((x) => x[1].split("\\,;").map(Number));
    const [E, F] = m;
    const im = valeursDe(q.text, "f");
    if (im.length !== E.length) return [`${im.length} images pour ${E.length} éléments`];
    const vals = im.map(([, y]) => y);
    if (vals.some((y) => !F.includes(y))) return ["une image hors de F"];
    const inj = new Set(vals).size === E.length;
    const surj = F.every((y) => vals.includes(y));
    const r = inj && surj ? "Bijective" : inj ? "Injective mais pas surjective" : surj ? "Surjective mais pas injective" : "Ni injective ni surjective";
    return r === q.expected[0] ? [] : [`attendu ${q.expected[0]}, recalculé ${r}`];
  },
  [`${P}bijection_tpl_2`]: (q) => {
    const F = lireFonction(q.text);
    const I = intervalleTexte(q.text);
    const s = sens(F.f, I);
    const r = s > 0 ? /croissante/ : s < 0 ? /décroissante/ : /deux antécédents/;
    return seulChoix(q, (c) => r.test(c) && (s <= 0 || !/décroissante/.test(c)));
  },
  [`${P}bijection_tpl_3`]: (q) => {
    const F = lireFonction(q.text);
    const I = intervalleTexte(q.text);
    if (sens(F.f, I) === 0) return ["pas strictement monotone"];
    const [p, r] = [F.f(I.lo), F.f(I.hi)];
    const [lo, hi] = [Math.min(p, r), Math.max(p, r)];
    return seulChoix(q, (c) => {
      const J = lireInt(c);
      return proche(J.lo, lo) && proche(J.hi, hi);
    });
  },
  [`${P}bijection_tpl_4`]: (q) => {
    const n = nomDe(q.text);
    const v = valeursDe(q.text, n);
    if (v.length !== 2) return [`${v.length} valeurs lues`];
    const k = Number(q.text.match(new RegExp(`${n}\\(x\\) = (-?\\d+)`))![1]);
    const croit = !/décroissante/.test(q.text);
    if (croit !== v[1][1] > v[0][1]) return ["le sens annoncé contredit les valeurs"];
    const [lo, hi] = [Math.min(v[0][1], v[1][1]), Math.max(v[0][1], v[1][1])];
    return egalNum(q, k >= lo && k <= hi ? 1 : 0);
  },
  [`${P}bijection_tpl_5`]: (q) => {
    const F = lireFonction(q.text);
    return seulChoix(q, (c) => sens(F.f, lireInt(c)) !== 0);
  },
  [`${P}bijection_tpl_6`]: (q) => {
    const F = lireFonction(q.text);
    const n = F.nom;
    const k = Number([...q.text.matchAll(new RegExp(`${n}\\(x\\) = (-?\\d+)\\$`, "g"))][0][1]);
    const x = Number(q.expected[0]);
    if (sens(F.f, { lo: -20, hi: 20, oLo: false, oHi: false }) !== 1) return ["pas strictement croissante"];
    return proche(F.f(x), k) ? [] : [`f(${x}) = ${F.f(x)}, attendu ${k}`];
  },

  [`${P}expression_tpl_1`]: (q) => {
    const F = lireFonction(q.text);
    const k = Number(q.text.match(/\^\{-1\}\((-?\d+)\)/)![1]);
    return proche(F.f(Number(q.expected[0])), k) ? [] : [`f(${q.expected[0]}) ≠ ${k}`];
  },
  [`${P}expression_tpl_2`]: (q) => {
    const n = nomDe(q.text);
    const v = valeursDe(q.text, n);
    const comp1 = q.text.match(/\^\{-1\}\(\w\((-?\d+)\)\)/);
    const comp2 = q.text.match(/\w\(\w\^\{-1\}\((-?\d+)\)\)/);
    if (new Set(v.map(([, y]) => y)).size !== v.length) return ["la fonction des données n'est pas injective"];
    if (comp1) return egalNum(q, Number(comp1[1]));
    if (comp2) return egalNum(q, Number(comp2[1]));
    const k = Number(q.text.match(/\^\{-1\}\((-?\d+)\)/)![1]);
    const t = v.find(([, y]) => y === k);
    if (!t) return ["image absente des données"];
    return egalNum(q, t[0]);
  },
  [`${P}expression_tpl_3`]: expressionJuste,
  [`${P}expression_tpl_4`]: expressionJuste,
  [`${P}expression_tpl_5`]: expressionJuste,
  [`${P}expression_tpl_6`]: (q) => {
    const F = lireFonction(q.text);
    const k = Number(q.text.match(/\^\{-1\}\((-?\d+)\)/)![1]);
    return proche(F.f(Number(q.expected[0])), k) ? [] : [`f(${q.expected[0]}) ≠ ${k}`];
  },

  [`${P}courbe_tpl_1`]: (q) => {
    const [a, b] = q.text.match(/[A-Z]\((-?\d+)\\,;(-?\d+)\)/)!.slice(1).map(Number);
    return seulChoix(q, (c) => {
      const [x, y] = couples(c)[0];
      return x === b && y === a;
    });
  },
  [`${P}courbe_tpl_2`]: (q) => {
    const F = lireFonction(q.text);
    const a = Number(q.text.match(/ordonnée \$(-?\d+)\$/)![1]);
    if (a < 0) return ["ordonnée hors de l'intervalle annoncé"];
    if (sens(F.f, { lo: 0, hi: 20, oLo: false, oHi: true }) === 0) return ["pas monotone sur l'intervalle annoncé"];
    return seulChoix(q, (c) => {
      const [x, y] = couples(c)[0];
      return y === a && proche(x, F.f(a));
    });
  },
  [`${P}courbe_tpl_3`]: (q) => {
    const k = Number(q.text.match(/\^\{-1\}\((-?\d+)\)/)![1]);
    const c = q.canvas;
    if (c?.kind !== "fonctionGraphique") return ["pas de courbe"];
    const pts = c.courbes!.find((x) => x.id === "cf")!.points!;
    const trouve: number[] = [];
    for (let i = 0; i + 1 < pts.length; i++) {
      const [u, w] = [pts[i], pts[i + 1]];
      if ((u.y - k) * (w.y - k) <= 0 && u.y !== w.y) trouve.push(u.x + ((k - u.y) * (w.x - u.x)) / (w.y - u.y));
    }
    if (!trouve.length) return [`aucun point d'ordonnée ${k}`];
    if (Math.max(...trouve) - Math.min(...trouve) > 1e-6) return ["courbe non injective"];
    if (k > c.ymax || trouve[0] > c.xmax) return ["le point sort de la fenêtre"];
    return proche(Number(q.expected[0]), trouve[0], 1e-3) ? [] : [`attendu ${q.expected[0]}, lu ${trouve[0]}`];
  },
  [`${P}courbe_tpl_4`]: (q) => {
    const F = lireFonction(q.text);
    const I = intervalleTexte(q.text);
    const x = Number(q.expected[0]);
    if (x < I.lo) return ["hors de l'intervalle"];
    if (sens(F.f, I) === 0) return ["pas monotone"];
    // Aucune autre solution de f(x) = x sur la grille.
    const zeros = grille(I, 2000).filter((u) => Math.abs(F.f(u) - u) < 1e-9);
    if (zeros.some((u) => Math.abs(u - x) > 1e-3)) return [`autre point fixe en ${zeros[0]}`];
    return proche(F.f(x), x) ? [] : [`f(${x}) ≠ ${x}`];
  },
  [`${P}courbe_tpl_5`]: (q) => {
    const F = lireFonction(q.text);
    const I = intervalleTexte(q.text);
    const s = sens(F.f, I);
    if (s === 0) return ["pas monotone"];
    const [p, r] = [F.f(I.lo), F.f(I.hi)];
    const [lo, hi] = [Math.min(p, r), Math.max(p, r)];
    return seulChoix(q, (c) => {
      const J = lireInt(c.split("$")[1]);
      const mot = /décroissante/.test(c) ? -1 : 1;
      return mot === s && proche(J.lo, lo) && proche(J.hi, hi);
    });
  },
  [`${P}courbe_tpl_6`]: (q) => {
    const F = lireFonction(q.text, "[fgh]");
    const f = compilerX(F.source);
    const I = intervalleTexte(q.text);
    if (sens(f, I) === 0) return ["pas monotone"];
    const im = imageDe(f, I);
    return seulChoix(q, (c) => {
      const J = lireInt(c);
      const fLo = Number.isFinite(J.lo) && !J.oLo;
      const fHi = Number.isFinite(J.hi) && !J.oHi;
      return memesBornes(J.lo, im.lo) && memesBornes(J.hi, im.hi) && fLo === im.fermeLo && fHi === im.fermeHi;
    });
  },

  [`${P}derivee_tpl_1`]: (q) => {
    const n = nomDe(q.text);
    const m = q.text.match(new RegExp(`${n}'\\((-?\\d+)\\) = ([^$]+)\\$`))!;
    const b = Number(q.text.match(/\)'\((-?\d+)\)/)![1]);
    const a = Number(m[1]);
    const lu = valeursDe(q.text, n).find(([x]) => x === a);
    if (!lu || lu[1] !== b) return [`f(${a}) n'est pas ${b}`];
    const r = 1 / val(m[2]);
    const justes = (q.choices ?? []).filter((c) => proche(val(nue(c)), r));
    if (justes.length !== 1) return [`${justes.length} justes`];
    return justes[0] === q.expected[0] ? [] : [`attendu ${q.expected[0]}, juste ${justes[0]}`];
  },
  [`${P}derivee_tpl_2`]: (q) => {
    const n = nomDe(q.text);
    const m = q.text.match(new RegExp(`${n}'\\((-?\\d+)\\) = (-?\\d+)`));
    const coef = m ? Number(m[2]) : Number(q.text.match(/coefficient directeur \$(-?\d+)\$/)![1]);
    return egalNum(q, 1 / coef);
  },
  [`${P}derivee_tpl_3`]: (q) => {
    const F = lireFonction(q.text);
    const v = valeursDe(q.text, F.nom)[0];
    if (!proche(F.f(v[0]), v[1])) return [`f(${v[0]}) ne vaut pas ${v[1]}`];
    const b = Number(q.text.match(/\)'\((-?\d+)\)/)![1]);
    if (b !== v[1]) return ["le point demandé n'est pas l'image donnée"];
    const r = 1 / deriveeNum(F.f, v[0]);
    return seulChoix(q, (c) => proche(val(nue(c)), r, 1e-4));
  },
  [`${P}derivee_tpl_4`]: (q) => {
    const F = lireFonction(q.text);
    const y = Number(q.text.match(/\)'\((-?\d+)\)/)![1]);
    const I = intervalleTexte(q.text);
    if (sens(F.f, I) === 0) return ["pas monotone"];
    let a = NaN;
    for (let x = 0; x <= 30; x++) if (proche(F.f(x), y)) a = x;
    if (Number.isNaN(a)) return [`aucun antécédent entier de ${y}`];
    const r = 1 / deriveeNum(F.f, a);
    return seulChoix(q, (c) => proche(val(nue(c)), r, 1e-4));
  },
  [`${P}derivee_tpl_5`]: (q) => {
    const n = nomDe(q.text);
    const m = q.text.match(new RegExp(`${n}'\\((-?\\d+)\\) = (-?\\d+)`))!;
    const [a, coef] = [Number(m[1]), Number(m[2])];
    const lu = couples(q.text)[0] ?? valeursDe(q.text, n).find(([x]) => x === a)!;
    const b = lu[1];
    if (lu[0] !== a) return ["le point donné ne correspond pas au nombre dérivé"];
    const tang = (x: number) => (x - b) / coef + a;
    return seulChoix(q, (c) => {
      const d = compiler(c.replace(/\$/g, "").replace(/^y =/, ""));
      return [b - 2, b, b + 3].every((x) => proche(d({ x }), tang(x)));
    });
  },
  [`${P}derivee_tpl_6`]: (q) => {
    const n = nomDe(q.text);
    const coef = Number(q.text.match(new RegExp(`${n}'\\(-?\\d+\\) = (-?\\d+)`))![1]);
    const b = Number(q.text.match(/\)'\((-?\d+)\)/)![1]);
    const v = valeursDe(q.text, n);
    if (!v.some(([, y]) => y === b)) return ["l'image n'est pas celle du texte"];
    return egalNum(q, 1 / coef);
  },
};
