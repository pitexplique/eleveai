// ÉQUATIONS TRIGONOMÉTRIQUES AU-DELÀ DE cos x = a (06/11/2026). Hors programme français (registre
// `hors_france`). Lignes visées : Maroc TC V-6 et 1re bac AA-3b, Sénégal 1re GE 3, Côte d'Ivoire 1re C3-L2.
// ⛔ Ne double ni `trig_equation_generale` (cos x = a sur ℝ, cos(mx) = a, cos(x − φ) = a, a cos x + b sin x)
// ni `trigo_equation_cos` (Terminale, valeurs sur un intervalle). Ici : cos u = cos v où u et v dépendent
// de x, solutions sur un intervalle de cos x = cos a, argument mx + φ complet, passage de sin à cos,
// second degré après transformation et racines parasites, inéquations tan x ≥ a et cos(mx + φ) ≥ a.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { T, expl, fabrique, melange, phrase, qcm, somme, un } from "../../lycee-commun";
import { F, ajoute, argL, divise, egal, enonce, inf, ligneDe, ligneL, oppose, piL, principal, reel, retire, type Fr } from "./trigo-pi-commun";

const tpl = fabrique("premiere-spe", "trigo_formules_equations", "1s_");
const M = "trig_equation_formes";

type Fn = "cos" | "sin" | "tan";
type Fam = { a: Fr; p: Fr };
const r2 = "\\dfrac{\\sqrt{2}}{2}";
const r3 = "\\dfrac{\\sqrt{3}}{2}";
const r33 = "\\dfrac{\\sqrt{3}}{3}";
/** Valeurs remarquables : l'écriture, puis un angle par fonction. */
const VALS_CS: { l: string; c: Fr; s: Fr }[] = [
  { l: "\\dfrac{1}{2}", c: F(1, 3), s: F(1, 6) },
  { l: "-\\dfrac{1}{2}", c: F(2, 3), s: F(-1, 6) },
  { l: r2, c: F(1, 4), s: F(1, 4) },
  { l: `-${r2}`, c: F(3, 4), s: F(-1, 4) },
  { l: r3, c: F(1, 6), s: F(1, 3) },
  { l: `-${r3}`, c: F(5, 6), s: F(-1, 3) },
];
const VALS_T: { l: string; a: Fr }[] = [
  { l: "1", a: F(1, 4) },
  { l: "-1", a: F(-1, 4) },
  { l: "\\sqrt{3}", a: F(1, 3) },
  { l: "-\\sqrt{3}", a: F(-1, 3) },
  { l: r33, a: F(1, 6) },
  { l: `-${r33}`, a: F(-1, 6) },
];
const DEC: Fr[] = [F(1, 3), F(-1, 3), F(1, 4), F(-1, 4), F(1, 6), F(-1, 6)];

/** Le représentant de a le plus proche de 0, modulo p : une écriture unique par famille. */
function norm(f: Fam): Fam {
  const q = (f.a.n / f.a.d) / (f.p.n / f.p.d);
  const k = Math.round(q);
  let a = retire(f.a, F(k * f.p.n, f.p.d));
  if (2 * (a.n / a.d) <= -(f.p.n / f.p.d) + 1e-12) a = ajoute(a, f.p);
  return { a, p: f.p };
}
function periodeL(p: Fr) {
  const N = p.n === 1 ? "" : String(p.n);
  return p.d === 1 ? `${N}k\\pi` : `\\dfrac{${N}k\\pi}{${p.d}}`;
}
const fam = (f: Fam) => {
  const g = norm(f);
  return g.a.n === 0 ? `x = ${periodeL(g.p)}` : `x = ${piL(g.a)} + ${periodeL(g.p)}`;
};
const ecrit = (l: Fam[]) => `${l.map((f) => `$${fam(f)}$`).join(" ou ")}, avec $k \\in \\mathbb{Z}$`;
/** Le jeu de solutions sur deux tours : pour écarter un piège qui dirait la même chose autrement. */
function signature(l: Fam[]) {
  const s = new Set<string>();
  for (const f of l) for (let k = -60; k <= 60; k++) {
    const v = f.a.n / f.a.d + (k * f.p.n) / f.p.d;
    if (v > -2 && v <= 2) s.add(v.toFixed(6));
  }
  return [...s].sort().join("|");
}
function pieges(J: Fam[], faux: Fam[][]) {
  const vus = new Set([signature(J)]);
  const r: string[] = [];
  for (const f of faux) {
    const sg = signature(f);
    if (vus.has(sg)) continue;
    vus.add(sg);
    r.push(ecrit(f));
  }
  return r;
}
const decale = (l: Fam[], d: Fr): Fam[] => l.map((f) => ({ a: ajoute(f.a, d), p: f.p }));
/** Décalage dans le dénominateur de la solution : un piège en π/42 à côté de π/14 se repère sans calcul. */
const pasDe = (l: Fam[]) => Math.max(norm(l[0]).a.d, 6);
const voisins = (l: Fam[]) => [1, -1, 2, -2, 3, -3].map((k) => decale(l, F(k, pasDe(l)))).concat([1, -1].map((k) => decale(l, F(k, 2 * pasDe(l)))));

/** Les solutions de fn(u) = fn(v), avec u = m₁x + φ₁ et v = m₂x + φ₂. */
function solU(fn: Fn, m1: number, p1: Fr, m2: number, p2: Fr): Fam[] {
  const l: Fam[] = [];
  const per = fn === "tan" ? F(1) : F(2);
  if (m1 !== m2) l.push({ a: divise(retire(p2, p1), m1 - m2), p: divise(per, Math.abs(m1 - m2)) });
  if (fn === "tan") return l;
  const s = m1 + m2;
  if (s !== 0) {
    const a = fn === "cos" ? oppose(ajoute(p1, p2)) : retire(retire(F(1), p1), p2);
    l.push({ a: divise(a, s), p: divise(per, Math.abs(s)) });
  }
  return l;
}
const tableAngle = (fn: Fn, v: { c?: Fr; s?: Fr; a?: Fr }) => (fn === "cos" ? v.c! : fn === "sin" ? v.s! : v.a!);

const num = (fn: Fn, x: number) => (fn === "cos" ? Math.cos(x) : fn === "sin" ? Math.sin(x) : Math.tan(x));
const ens = (l: Fr[]) => {
  const v = [...new Map(l.map((x) => [piL(x), x])).values()].sort((a, b) => a.n / a.d - b.n / b.d);
  return `$${v.length > 3 ? (v.some((x) => x.d >= 6) ? "\\scriptsize " : "\\footnotesize ") : ""}\\left\\{${v.map(piL).join("\\,;")}\\right\\}$`;
};

const INTS = [
  { l: "\\left]-\\pi\\,;\\pi\\right]", lo: -1, hi: 1, fa: false, fb: true },
  { l: "\\left[0\\,;2\\pi\\right[", lo: 0, hi: 2, fa: true, fb: false },
];
type Plage = (typeof INTS)[number];
/** Les éléments d'une famille dans la plage. */
function dansPlage(l: Fam[], I: Plage): Fr[] {
  const r: Fr[] = [];
  for (const f of l) for (let k = -80; k <= 80; k++) {
    const a = ajoute(f.a, F(k * f.p.n, f.p.d));
    const v = a.n / a.d;
    const okLo = v > I.lo + 1e-9 || (I.fa && Math.abs(v - I.lo) < 1e-9);
    const okHi = v < I.hi - 1e-9 || (I.fb && Math.abs(v - I.hi) < 1e-9);
    if (okLo && okHi) r.push(a);
  }
  return r;
}

const D_R = ["Résous dans $\\mathbb{R}$ l'équation :", "On résout sur $\\mathbb{R}$ :", "Quelles sont les solutions réelles de :", "Dans $\\mathbb{R}$, on cherche les solutions de :", "Sur $\\mathbb{R}$ tout entier, on résout :", "On cherche tous les réels $x$ tels que :"];
const F_R = ["Quel est l'ensemble des solutions ?", "Quelle proposition donne toutes les solutions ?", "Laquelle de ces écritures convient ?", "Quelles sont les solutions ?", ""];
const EXPL_D = "$\\cos u = \\cos v$ équivaut à $u = v + 2k\\pi$ ou $u = -v + 2k\\pi$ ; $\\sin u = \\sin v$ à $u = v + 2k\\pi$ ou $u = \\pi - v + 2k\\pi$ ; $\\tan u = \\tan v$ à $u = v + k\\pi$, avec $k$ entier.";
const FORMES: Record<Fn, string> = { cos: "$u = v + 2k\\pi$ ou $u = -v + 2k\\pi$", sin: "$u = v + 2k\\pi$ ou $u = \\pi - v + 2k\\pi$", tan: "$u = v + k\\pi$" };

/* ───────── inéquations : découpe de la plage aux valeurs frontières ───────── */

type Op = "\\geqslant" | "\\leqslant" | ">" | "<";
const vrai = (op: Op, a: number, b: number) => (op === "\\geqslant" ? a >= b - 1e-9 : op === "\\leqslant" ? a <= b + 1e-9 : op === ">" ? a > b + 1e-9 : a < b - 1e-9);
const compl: Record<Op, Op> = { "\\geqslant": "<", "\\leqslant": ">", ">": "\\leqslant", "<": "\\geqslant" };
type Seg = { a: Fr; b: Fr; fa: boolean; fb: boolean };
/** Résout fn(mx + φ) op v sur [lo, hi] ; `frontieres` = les fractions de π où la ligne vaut v ou n'existe pas. */
function resoudre(fn: Fn, m: number, phi: Fr, op: Op, v: number, frontieres: Fr[], lo: Fr, hi: Fr, fLo: boolean, fHi: boolean): Seg[] {
  const f = (x: number) => {
    const u = m * x + reel(phi);
    if (fn === "tan" && Math.abs(Math.cos(u)) < 1e-9) return NaN;
    return num(fn, u);
  };
  const ok = (x: number) => {
    const y = f(x);
    return !Number.isNaN(y) && vrai(op, y, v);
  };
  const pts = [lo, ...frontieres.filter((a) => inf(lo, a) && inf(a, hi)), hi].sort((a, b) => a.n / a.d - b.n / b.d);
  const uniq = pts.filter((a, i) => i === 0 || !egal(a, pts[i - 1]));
  const segs: Seg[] = [];
  for (let i = 0; i + 1 < uniq.length; i++) {
    const [a, b] = [uniq[i], uniq[i + 1]];
    if (!ok((reel(a) + reel(b)) / 2)) continue;
    const ga = i === 0 ? fLo && ok(reel(a)) : ok(reel(a));
    const gb = i + 2 === uniq.length ? fHi && ok(reel(b)) : ok(reel(b));
    const der = segs[segs.length - 1];
    if (der && egal(der.b, a) && der.fb && ga) {
      der.b = b;
      der.fb = gb;
    } else segs.push({ a, b, fa: ga, fb: gb });
  }
  return segs;
}
const ecrSeg = (s: Seg) => `\\left${s.fa ? "[" : "]"}${piL(s.a)}\\,;${piL(s.b)}\\right${s.fb ? "]" : "["}`;
const ecrSegs = (l: Seg[]) => `$${l.map(ecrSeg).join(" \\cup ")}$`;
const fauxBornes = (l: Seg[]) => l.map((s) => ({ ...s, fa: !s.fa, fb: !s.fb }));
const OPS: Op[] = ["\\geqslant", "\\leqslant", ">", "<"];
/** Toutes les valeurs de k (entiers) où une famille tombe sur la plage [lo ; hi]. */
function points(l: Fam[], lo: Fr, hi: Fr) {
  const r: Fr[] = [];
  for (const f of l) for (let k = -60; k <= 60; k++) {
    const a = ajoute(f.a, F(k * f.p.n, f.p.d));
    if (!inf(a, lo) && !inf(hi, a)) r.push(a);
  }
  return r;
}
const CTX_I = ["Un capteur de houle déclenche une alerte quand :", "Un panneau solaire produit assez d'énergie quand :", "Un signal sonore reste audible quand :", "Un bras articulé reste dans sa zone de travail quand :", "Une éolienne fonctionne à plein régime quand :", "Une lumière de scène reste allumée quand :", "On cherche les réels $x$ tels que :", "Un modèle de marée impose la condition :", "Un biologiste retient les périodes où :", "Le réglage d'une balançoire de parc impose la condition :"];
const F_I = ["On travaille sur l'intervalle :", "L'intervalle d'étude est :", "On se limite à l'intervalle :", "On regarde seulement l'intervalle :"];
const F_Q = ["Quel ensemble de solutions obtient-on ?", "Laquelle de ces écritures est juste ?", "Quelle proposition convient ?", "Quelle est la bonne réponse ?"];

/* ───────── second degré ───────── */
/** Les réels de la plage dont le cos (ou le sin) vaut u/2. */
function solDemi(fn: "cos" | "sin", u: number, I: Plage): Fr[] {
  const base: Record<number, { c: Fr; s: Fr } | null> = { [-4]: null, 4: null, [-2]: { c: F(1), s: F(-1, 2) }, 2: { c: F(0), s: F(1, 2) }, [-1]: { c: F(2, 3), s: F(-1, 6) }, 1: { c: F(1, 3), s: F(1, 6) }, 0: { c: F(1, 2), s: F(0) } };
  const b = base[u];
  if (!b) return [];
  const a = fn === "cos" ? b.c : b.s;
  const l = dansPlage(fn === "cos" ? [{ a, p: F(2) }, { a: oppose(a), p: F(2) }] : [{ a, p: F(2) }, { a: retire(F(1), a), p: F(2) }], I);
  return [...new Map(l.map((x) => [piL(x), x])).values()];
}

export const trigoEquationsFormesBank: TutorBankItemV4[] = [
  /* ═══════ ★1 ═══════ */
  tpl(M, 1, 1, "cos : u = v ou u = −v ; sin : u = v ou u = π − v ; tan : u = v, période π.", () => {
    const fn = un<Fn>(["cos", "sin", "tan"]);
    const [u, v] = un([["a", "b"], ["u", "v"], ["X", "Y"], ["p", "q"], ["A", "B"], ["r", "s"]]);
    const f = (s: string) => s.replace(/\bu\b/g, u).replace(/\bv\b/g, v);
    const C = (s: string) => `$${f(s)}$`;
    const a = `${C(`u = v + 2k\\pi`)} ou ${C(`u = -v + 2k\\pi`)}`;
    const b = `${C(`u = v + 2k\\pi`)} ou ${C(`u = \\pi - v + 2k\\pi`)}`;
    const c = C(`u = v + k\\pi`);
    const d = C(`u = v + 2k\\pi`);
    const e = `${C(`u = v + k\\pi`)} ou ${C(`u = -v + k\\pi`)}`;
    const juste = fn === "cos" ? a : fn === "sin" ? b : c;
    const fin = ", avec $k \\in \\mathbb{Z}$";
    return qcm(
      enonce(un(["Pour deux réels donnés, on regarde l'égalité :", "On sait que :", "Deux réels vérifient :", "On considère l'équation :", "Soit l'égalité :"]), `\\${fn} ${u} = \\${fn} ${v}`, un(["À quoi équivaut-elle ?", "Quelle condition lui est équivalente ?", "Laquelle de ces écritures lui est équivalente ?", "Par quoi peut-on la remplacer ?"])),
      `${juste}${fin}`,
      [a, b, c, d, e].map((x) => `${x}${fin}`),
      expl(EXPL_D, "on pense au cercle : deux points de même abscisse, de même ordonnée, ou diamétralement opposés.", `Pour $\\${fn}$ : ${f(FORMES[fn])}.`, `elle équivaut à ${juste}${fin}.`),
    );
  }),
  tpl(M, 2, 1, "Remplace x par chaque valeur : calcule l'argument, puis sa ligne trigonométrique.", () => {
    for (;;) {
      const fn = un<Fn>(["cos", "sin", "tan"]);
      const m = un([2, 2, 3]);
      const phi = un(DEC);
      const eq = fn === "tan" ? un(VALS_T) : un(VALS_CS);
      const al = tableAngle(fn, eq as any);
      const fams: Fam[] = fn === "cos" ? [{ a: al, p: F(2) }, { a: oppose(al), p: F(2) }] : fn === "sin" ? [{ a: al, p: F(2) }, { a: retire(F(1), al), p: F(2) }] : [{ a: al, p: F(1) }];
      const sol = fams.map((f) => norm({ a: divise(retire(f.a, phi), m), p: divise(f.p, m) }));
      const x0 = un(sol).a;
      const valeurCible = num(fn, reel(al));
      const estSol = (x: Fr) => {
        const u = m * reel(x) + reel(phi);
        return Math.abs(Math.cos(u)) > 1e-6 && Math.abs(num(fn, u) - valeurCible) < 1e-9;
      };
      const faux = [ajoute(x0, F(1, 12)), retire(x0, F(1, 12)), oppose(x0), ajoute(x0, F(1, 6)), ajoute(x0, F(1, 4)), retire(x0, F(1, 3)), divise(x0, 2), F(0), F(1, 2), F(1)].filter((x) => !estSol(x));
      if (faux.length < 3) continue;
      return qcm(
        enonce(un(["On considère l'équation :", "Voici une équation trigonométrique :", "On étudie l'équation :", "Soit l'équation :", "Une condition s'écrit :"]), `${ligneL(fn, m, phi)} = ${eq.l}`, un(["Lequel de ces réels en est une solution ?", "Quelle valeur de $x$ convient ?", "Parmi ces réels, lequel la vérifie ?", "Quel réel vérifie cette égalité ?"])),
        `$${piL(x0)}$`,
        faux.map((x) => `$${piL(x)}$`),
        expl("un réel est solution si, remplacé dans l'équation, il rend l'égalité vraie.", "on remplace $x$ par chaque valeur et on calcule l'argument.", `Pour $x = ${piL(x0)}$, l'argument vaut $${piL(ajoute(F(m * x0.n, x0.d), phi))}$.`, `$${piL(x0)}$ convient.`),
      );
    }
  }),
  tpl(M, 3, 1, "Trouve les familles, puis garde les éléments de l'intervalle.", () => {
    const fn = un<Fn>(["cos", "sin", "tan"]);
    const I = un(INTS);
    const n = un([1, 2, 3]);
    const d = un([5, 7, 8, 9, 10, 11]);
    const a = F(n, d);
    const fams: Fam[] = fn === "cos" ? [{ a, p: F(2) }, { a: oppose(a), p: F(2) }] : fn === "sin" ? [{ a, p: F(2) }, { a: retire(F(1), a), p: F(2) }] : [{ a, p: F(1) }];
    const sol = dansPlage(fams, I);
    const eq = `\\${fn} x = ${ligneDe(fn, a)}`;
    const autre: Fam[] = fn === "cos" ? [{ a, p: F(2) }, { a: retire(F(1), a), p: F(2) }] : fn === "sin" ? [{ a, p: F(2) }, { a: oppose(a), p: F(2) }] : [{ a, p: F(2) }, { a: oppose(a), p: F(2) }];
    return qcm(
      `${un(["On résout l'équation :", "Voici l'équation à résoudre :", "On cherche les solutions de :", "Soit l'équation :"])}\n\n$${eq}$\n\n${un(["sur l'intervalle :", "pour $x$ dans :", "avec $x$ appartenant à :"])}\n\n$${I.l}$\n\n${un(F_Q)}`,
      ens(sol),
      [ens(dansPlage(autre, I)), ens([sol[0]]), ens(sol.map((x) => principal(ajoute(x, F(1))))), ens(sol.map(oppose)), ens(sol.map((x) => ajoute(x, F(1, d)))), ens(sol.map((x) => ajoute(x, F(-1, d))))].filter((c) => c !== ens(sol)),
      expl(EXPL_D, "on écrit les familles de solutions, puis on garde celles qui tombent dans l'intervalle.", `Les solutions de l'intervalle sont ${ens(sol)}.`, `l'ensemble est ${ens(sol)}.`),
    );
  }),

  /* ═══════ ★2 ═══════ */
  tpl(M, 4, 2, "Écris d'abord mx + φ = α + … , puis retire φ et divise tout par m, période comprise.", () => {
    const fn = un<Fn>(["cos", "sin", "tan"]);
    const m = un([2, 2, 3, 4]);
    const phi = un(DEC);
    const eq = fn === "tan" ? un(VALS_T) : un(VALS_CS);
    const al = tableAngle(fn, eq as any);
    const base: Fam[] = fn === "cos" ? [{ a: al, p: F(2) }, { a: oppose(al), p: F(2) }] : fn === "sin" ? [{ a: al, p: F(2) }, { a: retire(F(1), al), p: F(2) }] : [{ a: al, p: F(1) }];
    const sol = (ph: Fr, mm: number): Fam[] => base.map((f) => ({ a: divise(retire(f.a, ph), mm), p: divise(f.p, mm) }));
    const J = sol(phi, m);
    const texte = `${ligneL(fn, m, phi)} = ${eq.l}`;
    return qcm(
      enonce(un(D_R), texte, un(F_R)),
      ecrit(J),
      pieges(J, [sol(oppose(phi), m), sol(phi, 1), J.map((f) => ({ a: f.a, p: base[0].p })), [J[0]], ...voisins(J), base.map((f) => ({ a: divise(ajoute(f.a, phi), m), p: f.p }))]),
      expl(EXPL_D, "on résout en posant $X$ égal à l'argument, on retire $\\varphi$, puis on divise tout par $m$.", `On écrit $${argL(m, phi)} = ${piL(al)} + \\dots$`, `${ecrit(J)}.`),
    );
  }),
  tpl(M, 5, 2, "cos u = cos v donne deux équations du premier degré en x ; tan u = tan v n'en donne qu'une.", () => {
    const fn = un<Fn>(["cos", "sin", "cos", "sin", "tan"]);
    // tan(2x) = tan(x + φ) seulement : avec d'autres coefficients, une famille tomberait où tan n'existe pas.
    const m1 = fn === "tan" ? 2 : un([2, 3, 4]);
    const m2 = fn === "tan" ? 1 : un([1, 1, 2].filter((x) => x !== m1));
    const p1 = fn === "tan" ? F(0) : un([F(0), F(1, 3), F(-1, 4), F(1, 6)]);
    const p2 = fn === "tan" ? un([F(1, 3), F(-1, 3), F(1, 6), F(-1, 6)]) : un(DEC);
    const J = solU(fn, m1, p1, m2, p2);
    const texte = `${ligneL(fn, m1, p1)} = ${ligneL(fn, m2, p2)}`;
    return qcm(
      enonce(un(D_R), texte, un(F_R)),
      ecrit(J),
      pieges(J, [solU(fn, m1, p1, m2, oppose(p2)), solU(fn === "tan" ? "cos" : fn === "cos" ? "sin" : "cos", m1, p1, m2, p2), [J[0]], J.map((f) => ({ a: f.a, p: F(2) })), ...voisins(J)]),
      expl(EXPL_D, "on écrit les égalités des arguments, puis on résout chacune en $x$.", `Ici, $u = ${argL(m1, p1)}$ et $v = ${argL(m2, p2)}$.`, `${ecrit(J)}.`),
    );
  }),
  tpl(M, 6, 2, "sin v = cos(π/2 − v) : écris les deux membres avec la même ligne trigonométrique.", () => {
    const cas = un(["sinCosVal", "cosSinVal", "cosSin", "sinCos"]);
    const d = un([5, 7, 8, 9, 10]);
    const n = un([1, 2, 3]);
    const al = F(n, d);
    let texte: string;
    let J: Fam[];
    let etape: string;
    if (cas === "sinCosVal") {
      texte = `\\sin x = ${ligneDe("cos", al)}`;
      const be = retire(F(1, 2), al);
      J = solU("sin", 1, F(0), 0, be);
      etape = `$${ligneDe("cos", al)} = ${ligneDe("sin", be)}$`;
    } else if (cas === "cosSinVal") {
      texte = `\\cos x = ${ligneDe("sin", al)}`;
      const be = retire(F(1, 2), al);
      J = solU("cos", 1, F(0), 0, be);
      etape = `$${ligneDe("sin", al)} = ${ligneDe("cos", be)}$`;
    } else {
      const m = un([2, 3]);
      const phi = un([F(0), F(1, 3), F(-1, 6), F(1, 4)]);
      if (cas === "cosSin") {
        texte = `${ligneL("cos", m, F(0))} = ${ligneL("sin", 1, phi)}`;
        // sin(x + φ) = cos(π/2 − x − φ)
        J = solU("cos", m, F(0), -1, retire(F(1, 2), phi));
        etape = `$${ligneL("sin", 1, phi)} = \\cos\\left(\\dfrac{\\pi}{2} - ${phi.n === 0 ? "x" : `\\left(${argL(1, phi)}\\right)`}\\right)$`;
      } else {
        texte = `${ligneL("sin", m, F(0))} = ${ligneL("cos", 1, phi)}`;
        // cos(x + φ) = sin(π/2 − x − φ)
        J = solU("sin", m, F(0), -1, retire(F(1, 2), phi));
        etape = `$${ligneL("cos", 1, phi)} = \\sin\\left(\\dfrac{\\pi}{2} - ${phi.n === 0 ? "x" : `\\left(${argL(1, phi)}\\right)`}\\right)$`;
      }
    }
    return qcm(
      enonce(un(D_R), texte, un(F_R)),
      ecrit(J),
      pieges(J, [J.map((f) => ({ a: oppose(f.a), p: f.p })), decale(J, F(1, 2)), [J[0]], J.map((f) => ({ a: f.a, p: F(1) })), ...voisins(J)]),
      expl("$\\sin v = \\cos\\left(\\dfrac{\\pi}{2} - v\\right)$ et $\\cos v = \\sin\\left(\\dfrac{\\pi}{2} - v\\right)$.", "on écrit les deux membres avec la même ligne, puis on applique la règle de $\\cos u = \\cos v$ ou de $\\sin u = \\sin v$.", `On utilise ${etape}.`, `${ecrit(J)}.`),
    );
  }),

  /* ═══════ ★3 ═══════ */
  tpl(M, 7, 3, "Pose X = cos x (ou tan x) : au besoin, remplace d'abord sin² x par 1 − cos² x. Écarte les racines hors de [−1 ; 1].", () => {
    const I = un(INTS);
    const prefixe = un(["On résout l'équation :", "Un modèle d'oscillation conduit à l'équation :", "Une étude de pendule conduit à :", "Un réglage de hauts-parleurs impose :", "Une étude de marée donne la condition :", "Un ingénieur du son cherche les réels $x$ tels que :", "Une biologiste étudie un rythme saisonnier, avec la condition :"]);
    const genre = un(["direct", "direct", "parasite", "sinCarre", "cos2x", "tanCarre"]);
    let eq: string;
    let sol: Fr[];
    let fauxS: Fr[][];
    let etape: string;
    if (genre === "tanCarre") {
      const [A, C, al] = un<[number, number, Fr]>([[1, -3, F(1, 3)], [3, -1, F(1, 6)], [1, -1, F(1, 4)]]);
      eq = `${A === 1 ? "" : A}\\tan^2 x - ${-C} = 0`;
      sol = dansPlage([{ a: al, p: F(1) }, { a: oppose(al), p: F(1) }], I);
      fauxS = [dansPlage([{ a: al, p: F(1) }], I), dansPlage([{ a: al, p: F(2) }, { a: oppose(al), p: F(2) }], I), dansPlage([{ a: retire(F(1, 2), al), p: F(1) }, { a: oppose(retire(F(1, 2), al)), p: F(1) }], I), dansPlage([{ a: F(1, 12), p: F(1) }, { a: F(-1, 12), p: F(1) }], I)];
      etape = `On isole $\\tan^2 x$, puis $\\tan x$ vaut $\\pm$ une valeur remarquable.`;
    } else {
      const fn: "cos" | "sin" = genre === "direct" || genre === "parasite" ? un(["cos", "sin"]) : "cos";
      let r: number;
      let s: number;
      if (genre === "parasite") {
        r = un([-1, 1, 2, -2, 0]);
        s = un([4, -4]);
      } else if (genre === "cos2x") {
        // 2cos²x + bcos x + c : (2X − r)(X − s/2) avec r, s moitiés : r·s pair au besoin.
        const [p, q] = melange([-2, -1, 0, 1, 2]).slice(0, 2);
        r = p;
        s = q;
      } else {
        [r, s] = melange([-2, -1, 0, 1, 2]).slice(0, 2);
      }
      // (2X − r)(2X − s) = 4X² − 2(r + s)X + rs ; réduit si possible.
      let [A, B, C] = [4, -2 * (r + s), r * s];
      if (A % 2 === 0 && B % 2 === 0 && C % 2 === 0) [A, B, C] = [A / 2, B / 2, C / 2];
      if (A % 2 === 0 && B % 2 === 0 && C % 2 === 0) [A, B, C] = [A / 2, B / 2, C / 2];
      const X = `\\${fn} x`;
      if (genre === "sinCarre") eq = `${somme([T(-A, 1, "\\sin^2 x"), T(B, 1, X), T(C + A, 1)])} = 0`;
      else if (genre === "cos2x") {
        // A cos² x = (A/2)(cos 2x + 1)
        if (A % 2 !== 0) {
          [A, B, C] = [2 * A, 2 * B, 2 * C];
        }
        eq = `${somme([T(A / 2, 1, "\\cos(2x)"), T(B, 1, X), T(C + A / 2, 1)])} = 0`;
      } else eq = `${somme([T(A, 1, `\\${fn}^2 x`), T(B, 1, X), T(C, 1)])} = 0`;
      sol = [...solDemi(fn, r, I), ...solDemi(fn, s, I)];
      const autre: "cos" | "sin" = fn === "cos" ? "sin" : "cos";
      fauxS = [solDemi(fn, r, I), solDemi(fn, s, I), [...solDemi(autre, r, I), ...solDemi(autre, s, I)], [...solDemi(fn, -r, I), ...solDemi(fn, s, I)], [...solDemi(fn, r, I), ...solDemi(fn, -s, I)], [...solDemi(fn, -r, I), ...solDemi(fn, -s, I)]];
      etape = `En posant $X = ${X}$, les racines sont $${frDemi(r)}$ et $${frDemi(s)}$${Math.abs(r) > 2 || Math.abs(s) > 2 ? " ; une racine hors de $[-1\\,;1]$ ne donne aucune solution" : ""}.`;
    }
    const juste = ens(sol);
    const faux = fauxS.filter((l) => l.length).map(ens).filter((c) => c !== juste);
    return qcm(
      `${prefixe}\n\n$${eq}$\n\n${un(["On résout sur l'intervalle :", "On cherche les solutions dans :", "On garde les réels de :"])}\n\n$${I.l}$\n\n${un(F_Q)}`,
      juste,
      [...faux, ens(sol.map((x) => principal(ajoute(x, F(1, 6))))), ens(sol.map((x) => principal(ajoute(x, F(1, 12))))), ens(sol.map((x) => principal(retire(x, F(1, 12)))))],
      expl("on se ramène à une équation du second degré en posant $X$ égal à la ligne trigonométrique, avec $\\sin^2 x = 1 - \\cos^2 x$ ou $\\cos(2x) = 2\\cos^2 x - 1$ si besoin.", "on résout en $X$, on écarte les valeurs hors de $[-1\\,;1]$, puis on revient à $x$ sur l'intervalle.", etape, `l'ensemble est ${juste}.`),
    );
  }),
  tpl(M, 8, 3, "Sur chaque intervalle où elle existe, tan est croissante : place α avec tan α = a, et n'inclus jamais les valeurs où tan n'existe pas.", () => {
    const op = un(OPS);
    const v = un([...VALS_T, { l: "0", a: F(0) }]);
    const [dom, lo, hi, fLo, fHi] = un<[string, Fr, Fr, boolean, boolean]>([
      ["\\left]-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right[", F(-1, 2), F(1, 2), false, false],
      ["\\left]-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right[", F(-1, 2), F(1, 2), false, false],
      ["\\left[0\\,;\\pi\\right]", F(0), F(1), true, true],
      ["\\left]-\\pi\\,;\\pi\\right]", F(-1), F(1), false, true],
    ]);
    const front = [...points([{ a: v.a, p: F(1) }], lo, hi), ...points([{ a: F(1, 2), p: F(1) }], lo, hi)];
    const vn = Math.tan(reel(v.a));
    const seg = (o: Op, w: number, fr: Fr[]) => resoudre("tan", 1, F(0), o, w, fr, lo, hi, fLo, fHi);
    const J = seg(op, vn, front);
    const frontOpp = [...points([{ a: oppose(v.a), p: F(1) }], lo, hi), ...points([{ a: F(1, 2), p: F(1) }], lo, hi)];
    const juste = ecrSegs(J);
    const dans = `\\tan x ${op} ${v.l}`;
    // Une autre valeur remarquable : le piège d'une table mal lue, même quand la borne vaut 0.
    const alt = Math.abs(v.a.n / v.a.d) === 1 / 4 ? F(1, 3) : F(1, 4);
    const frontAlt = [...points([{ a: alt, p: F(1) }], lo, hi), ...points([{ a: F(1, 2), p: F(1) }], lo, hi)];
    return qcm(
      `${un(CTX_I)}\n\n$${dans}$\n\n${un(F_I)}\n\n$${dom}$\n\n${un(F_Q)}`,
      juste,
      [ecrSegs(seg(compl[op], vn, front)), ecrSegs(seg(op, -vn, frontOpp)), ecrSegs(seg(compl[op], -vn, frontOpp)), ecrSegs(fauxBornes(J)), ecrSegs(seg(op, Math.tan(reel(alt)), frontAlt))].filter((c) => c !== juste && c !== "$$"),
      expl("sur chaque intervalle $\\left]-\\dfrac{\\pi}{2} + k\\pi\\,;\\dfrac{\\pi}{2} + k\\pi\\right[$, la tangente est strictement croissante.", "on cherche $\\alpha$ tel que $\\tan \\alpha$ vaille la borne, puis on lit le sens sur chaque intervalle, sans inclure les réels où $\\tan$ n'existe pas.", `Ici, $\\alpha = ${piL(v.a)}$.`, `l'ensemble des solutions est ${juste}.`),
    );
  }),
  tpl(M, 9, 3, "Résous d'abord l'équation : elle donne les bornes. Teste ensuite un réel entre deux bornes.", () => {
    for (;;) {
      const fn = un<"cos" | "sin">(["cos", "sin"]);
      const m = un([1, 2, 2, 3]);
      const phi = m === 1 ? un(DEC) : un([F(0), F(0), ...DEC]);
      const op = un(OPS);
      const V = un(VALS_CS);
      const al = fn === "cos" ? V.c : V.s;
      const vn = num(fn, reel(al));
      const [dom, lo, hi, fLo, fHi] = un<[string, Fr, Fr, boolean, boolean]>([
        ["\\left[0\\,;\\pi\\right]", F(0), F(1), true, true],
        ["\\left[0\\,;2\\pi\\right[", F(0), F(2), true, false],
        ["\\left]-\\pi\\,;\\pi\\right]", F(-1), F(1), false, true],
      ]);
      const fams = (a: Fr): Fam[] => (fn === "cos" ? [{ a, p: F(2) }, { a: oppose(a), p: F(2) }] : [{ a, p: F(2) }, { a: retire(F(1), a), p: F(2) }]).map((f) => ({ a: divise(retire(f.a, phi), m), p: divise(f.p, m) }));
      const front = points(fams(al), lo, hi);
      const seg = (o: Op, w: number, fr: Fr[]) => resoudre(fn, m, phi, o, w, fr, lo, hi, fLo, fHi);
      const J = seg(op, vn, front);
      if (!J.length || J.length > 3) continue;
      const juste = ecrSegs(J);
      const altV = fn === "cos" ? retire(F(1), al) : oppose(al);
      const frontA = points(fams(altV), lo, hi);
      const faux = [ecrSegs(seg(compl[op], vn, front)), ecrSegs(seg(op, -vn, frontA)), ecrSegs(seg(compl[op], -vn, frontA)), ecrSegs(fauxBornes(J))].filter((c) => c !== juste && c !== "$$");
      if (new Set(faux).size < 3) continue;
      return qcm(
        `${un(CTX_I)}\n\n$${ligneL(fn, m, phi)} ${op} ${V.l}$\n\n${un(F_I)}\n\n$${dom}$\n\n${un(F_Q)}`,
        juste,
        faux,
        expl(EXPL_D, "on résout d'abord l'équation pour trouver les bornes sur l'intervalle, puis on teste un réel entre deux bornes.", `Les bornes intérieures sont ${front.length ? front.map((x) => `$${piL(x)}$`).join(", ") : "absentes"}.`, `l'ensemble des solutions est ${juste}.`),
      );
    }
  }),
];

function frDemi(u: number) {
  if (u % 2 === 0) return String(u / 2);
  return `${u < 0 ? "-" : ""}\\dfrac{${Math.abs(u)}}{2}`;
}
