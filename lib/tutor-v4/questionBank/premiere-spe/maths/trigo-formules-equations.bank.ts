// FORMULES ET ÉQUATIONS TRIGONOMÉTRIQUES (05/11/2026). Hors programme français
// (registre `hors_france`). Lignes visées : Maroc 1re bac (sin x = a, cos x = a, tan x = a ;
// addition, duplication ; a cos x + b sin x), Sénégal et Côte d'Ivoire (addition,
// duplication, linéarisation, cos x = cos a, a cos x + b sin x + c = 0), Belgique
// humanités 3.2.2a et 3.3.1a.
// ⛔ Ne double pas `trigo_equation_cos` (Terminale, sur [−π ; π], programme français) :
// ici, les solutions GÉNÉRALES sur ℝ, avec k entier.
// ⚠️ Les angles se calculent en fractions exactes de π : aucun arrondi possible.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { T, court, entre, expl, fabrique, melange, pgcd, phrase, qcm, somme, un } from "../../lycee-commun";

const tpl = fabrique("premiere-spe", "trigo_formules_equations", "1s_");

/* ───────────────── fractions de π ───────────────── */

type Fr = { n: number; d: number };
const F = (n: number, d = 1): Fr => {
  const g = pgcd(Math.abs(n), Math.abs(d)) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
};
const ajoute = (a: Fr, b: Fr) => F(a.n * b.d + b.n * a.d, a.d * b.d);
const oppose = (a: Fr): Fr => ({ n: -a.n, d: a.d });
const divise = (a: Fr, m: number) => F(a.n, a.d * m);
/** Ramène dans ]−π ; π]. */
function principal(a: Fr): Fr {
  let r = a;
  while (r.n * 1 > r.d) r = ajoute(r, F(-2));
  while (r.n <= -r.d) r = ajoute(r, F(2));
  return r;
}
function piL(a: Fr) {
  if (a.n === 0) return "0";
  const N = Math.abs(a.n);
  const s = a.n < 0 ? "-" : "";
  if (a.d === 1) return N === 1 ? `${s}\\pi` : `${s}${N}\\pi`;
  return N === 1 ? `${s}\\dfrac{\\pi}{${a.d}}` : `${s}\\dfrac{${N}\\pi}{${a.d}}`;
}
/** La période 2kπ, kπ, 2kπ/3… */
function periodeL(p: Fr) {
  const N = p.n === 1 ? "" : String(p.n);
  return p.d === 1 ? `${N}k\\pi` : `\\dfrac{${N}k\\pi}{${p.d}}`;
}
const famille = (a: Fr, p: Fr) => (a.n === 0 ? `x = ${periodeL(p)}` : `x = ${piL(a)} + ${periodeL(p)}`);
const fin = ", avec $k \\in \\mathbb{Z}$";
const ecrit = (fams: string[]) => `${fams.map((f) => `$${f}$`).join(" ou ")}${fin}`;

/* ───────────────── valeurs remarquables ───────────────── */

type Fn = "cos" | "sin";
type Val = { l: string; c: Fr; s: Fr };
const r2 = "\\dfrac{\\sqrt{2}}{2}";
const r3 = "\\dfrac{\\sqrt{3}}{2}";
const VALS: Val[] = [
  { l: "\\dfrac{1}{2}", c: F(1, 3), s: F(1, 6) },
  { l: "-\\dfrac{1}{2}", c: F(2, 3), s: F(-1, 6) },
  { l: r2, c: F(1, 4), s: F(1, 4) },
  { l: `-${r2}`, c: F(3, 4), s: F(-1, 4) },
  { l: r3, c: F(1, 6), s: F(1, 3) },
  { l: `-${r3}`, c: F(5, 6), s: F(-1, 3) },
];
const VALS_SPE: Val[] = [
  { l: "0", c: F(1, 2), s: F(0) },
  { l: "1", c: F(0), s: F(1, 2) },
  { l: "-1", c: F(1), s: F(-1, 2) },
];
const TOUTES = [...VALS, ...VALS, ...VALS_SPE];

/** Les familles de solutions de fn(m·x − φ) = fn(α). */
function familles(fn: Fn, alpha: Fr, m = 1, phi: Fr = F(0)) {
  let bases: Fr[];
  let per: Fr = F(2);
  if (fn === "cos") {
    if (alpha.n === 0) bases = [F(0)];
    else if (alpha.n === 1 && alpha.d === 1) bases = [F(1)];
    else if (alpha.n === 1 && alpha.d === 2) {
      bases = [F(1, 2)];
      per = F(1);
    } else bases = [alpha, oppose(alpha)];
  } else {
    if (alpha.n === 0) {
      bases = [F(0)];
      per = F(1);
    } else if (alpha.d === 2) bases = [alpha];
    else bases = [alpha, ajoute(F(1), oppose(alpha))];
  }
  return bases.map((b) => ({ a: divise(ajoute(principal(b), phi), m), p: divise(per, m) }));
}
const ecritF = (l: { a: Fr; p: Fr }[]) => ecrit(l.map((x) => famille(principal2(x.a), x.p)));
/** Une base lisible : dans ]−π ; π] quand il n'y a pas de division qui l'y ramène déjà. */
const principal2 = (a: Fr) => (a.n > a.d || a.n <= -a.d ? principal(a) : a);

/** La clé d'un ensemble de solutions : ses valeurs sur une période. Deux écritures du même ensemble ont la même clé. */
function cle(l: { a: Fr; p: Fr }[]) {
  const vus = new Set<number>();
  for (const f of l)
    for (let k = 0; k < 96; k++) {
      const t = f.a.n / f.a.d + (k * f.p.n) / f.p.d;
      vus.add(Math.round((((t % 2) + 2) % 2) * 1e6) % 2000000);
    }
  return [...vus].sort((u, v) => u - v).join(",");
}
/** Les propositions fausses, écrites : aucune n'a les mêmes solutions que la juste ni qu'une autre. */
function distincts(juste: { a: Fr; p: Fr }[], listes: { a: Fr; p: Fr }[][]) {
  const vus = new Set([cle(juste)]);
  const res: string[] = [];
  for (const l of listes) {
    const c = cle(l);
    if (!vus.has(c)) {
      vus.add(c);
      res.push(ecritF(l));
    }
  }
  return res;
}

/** Les réponses fausses : l'autre formule, la solution oubliée, la mauvaise période. */
function piegesEq(fn: Fn, alpha: Fr, m: number, phi: Fr) {
  const juste = familles(fn, alpha, m, phi);
  const autre: Fn = fn === "cos" ? "sin" : "cos";
  return distincts(juste, [
    familles(autre, alpha, m, phi),
    [juste[0]],
    juste.map((f) => ({ a: f.a, p: divise(f.p, 2) })),
    juste.map((f) => ({ a: oppose(ajoute(f.a, F(1, 6))), p: f.p })),
    juste.map((f) => ({ a: ajoute(f.a, F(1, 3)), p: f.p })),
    juste.map((f) => ({ a: ajoute(f.a, F(1, 6)), p: f.p })),
    juste.map((f) => ({ a: oppose(f.a), p: divise(f.p, 2) })),
  ]);
}
const explEq = (fn: Fn, eq: string, sol: string) =>
  expl(
    fn === "cos" ? "$\\cos X = \\cos \\alpha$ équivaut à $X = \\alpha + 2k\\pi$ ou $X = -\\alpha + 2k\\pi$, avec $k$ entier." : "$\\sin X = \\sin \\alpha$ équivaut à $X = \\alpha + 2k\\pi$ ou $X = \\pi - \\alpha + 2k\\pi$, avec $k$ entier.",
    "on cherche un angle $\\alpha$ qui a la bonne valeur, on écrit les deux familles, puis on isole $x$.",
    `Pour $${eq}$, sur le cercle, on repère les points qui conviennent.`,
    sol.replace(/, avec.*$/, "") + ", avec $k$ entier.",
  );
const eqVal = (fn: Fn, v: Val, x = "x") => `\\${fn} ${x} = ${v.l}`;
const alphaDe = (fn: Fn, v: Val) => (fn === "cos" ? v.c : v.s);

/* ───────────────── contextes ───────────────── */

const CTX = [
  "Deux signaux sonores se superposent dans un casque.",
  "En électricité, deux tensions alternatives s'ajoutent.",
  "Sur un oscilloscope, on observe la somme de deux courbes.",
  "Une marée est modélisée par deux composantes.",
  "Le bras d'un robot combine deux rotations.",
  "Une antenne reçoit deux ondes de même fréquence.",
  "Un sismographe enregistre deux vibrations.",
  "Une ingénieure du son règle deux micros.",
  "Dans un moteur, deux pistons agissent ensemble.",
  "Un astronome étudie la position apparente d'un satellite.",
  "Une balançoire est poussée à deux rythmes accordés.",
  "Un physicien mesure l'interférence de deux lasers.",
];
const CTX_DUP = [
  "En courant alternatif, la puissance dépend de ce signal.",
  "Un ballon est lancé : sa portée dépend de l'angle de tir.",
  "Une lanceuse de javelot cherche le meilleur angle.",
  "Un rectangle est inscrit dans un cercle : son aire dépend de l'angle.",
  "Une architecte étudie l'éclairage d'une façade selon le soleil.",
  "Un jet d'eau de fontaine dépend de l'angle de la buse.",
  "Une lampe éclaire une table, selon son inclinaison.",
  "Un moteur vibre, et l'énergie suit cette formule.",
  "Dans un synthétiseur, le signal est élevé au carré.",
  "Un panneau solaire reçoit une puissance qui dépend de l'angle.",
  "Une équipe de robotique règle un bras articulé.",
  "Une toiture est conçue pour évacuer au mieux la pluie.",
];

/* ───────────────── a cos x + b sin x ───────────────── */

const LETTRES: [string, string][] = [["a", "b"], ["x", "y"], ["p", "q"], ["u", "v"], ["s", "t"]];

type Combi = { a: string; b: string; signeB: 1 | -1; R: string; Rv: number; phi: Fr; somme: string };
const COMBIS: Combi[] = [
  { a: "\\sqrt{3}", b: "", signeB: 1, R: "2", Rv: 2, phi: F(1, 6), somme: "\\sqrt{3} + 1" },
  { a: "", b: "\\sqrt{3}", signeB: 1, R: "2", Rv: 2, phi: F(1, 3), somme: "1 + \\sqrt{3}" },
  { a: "", b: "", signeB: 1, R: "\\sqrt{2}", Rv: Math.SQRT2, phi: F(1, 4), somme: "2" },
  { a: "", b: "", signeB: -1, R: "\\sqrt{2}", Rv: Math.SQRT2, phi: F(-1, 4), somme: "2" },
  { a: "\\sqrt{3}", b: "", signeB: -1, R: "2", Rv: 2, phi: F(-1, 6), somme: "\\sqrt{3} + 1" },
  { a: "", b: "\\sqrt{3}", signeB: -1, R: "2", Rv: 2, phi: F(-1, 3), somme: "1 + \\sqrt{3}" },
];
const texteCombi = (c: Combi) => `${c.a}\\cos x ${c.signeB > 0 ? "+" : "-"} ${c.b}\\sin x`;
/** cos(x − φ), écrit avec le bon signe. */
const cosPhi = (phi: Fr, fn = "cos") => (phi.n > 0 ? `\\${fn}\\left(x - ${piL(phi)}\\right)` : `\\${fn}\\left(x + ${piL(oppose(phi))}\\right)`);

/* ───────────────── triplets pythagoriciens ───────────────── */

const TRIPLETS: [number, number, number][] = [[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17], [7, 24, 25], [24, 7, 25]];
const frL = (p: number, q: number) => somme([T(p, q)]);

/* ───────────────── angles dont le double est remarquable ───────────────── */

const DOUBLE = [
  { t: F(1, 12), dbl: F(1, 6) },
  { t: F(1, 8), dbl: F(1, 4) },
  { t: F(1, 6), dbl: F(1, 3) },
  { t: F(5, 12), dbl: F(5, 6) },
  { t: F(3, 8), dbl: F(3, 4) },
  { t: F(1, 3), dbl: F(2, 3) },
];
const VALEURS: [string, number][] = [
  ["\\dfrac{1}{2}", 1 / 2],
  ["-\\dfrac{1}{2}", -1 / 2],
  [r2, Math.SQRT2 / 2],
  [`-${r2}`, -Math.SQRT2 / 2],
  [r3, Math.sqrt(3) / 2],
  [`-${r3}`, -Math.sqrt(3) / 2],
  ["1", 1],
  ["0", 0],
];
function valeurL(x: number) {
  const r = VALEURS.find(([, v]) => Math.abs(v - x) < 1e-9);
  if (!r) throw new Error(`valeur non remarquable ${x}`);
  return r[0];
}
const enPi = (a: Fr) => (a.n * Math.PI) / a.d;
const arg = (a: Fr) => `\\left(${piL(a)}\\right)`;

/* ───────────────── racines de second degré en cos ou sin ───────────────── */

const RACINES: { num: number }[] = [{ num: 2 }, { num: 1 }, { num: 0 }, { num: -1 }, { num: -2 }];
const VAL_DE_DEMI: Record<number, Val> = { 2: VALS_SPE[1], 1: VALS[0], 0: VALS_SPE[0], "-1": VALS[1], "-2": VALS_SPE[2] };
/** Les réels de ]−π ; π] solutions de fn x = v. */
function surPP(fn: Fn, v: Val) {
  const l: Fr[] = [];
  const a = alphaDe(fn, v);
  for (const b of fn === "cos" ? [a, oppose(a)] : [a, ajoute(F(1), oppose(a))]) l.push(principal(b));
  return l.filter((x, i) => l.findIndex((y) => y.n === x.n && y.d === x.d) === i);
}
const ensL = (l: Fr[]) => {
  const tri = [...l].sort((a, b) => a.n / a.d - b.n / b.d);
  const uniq = tri.filter((x, i) => i === 0 || x.n / x.d !== tri[i - 1].n / tri[i - 1].d);
  return `$\\left\\{${uniq.map(piL).join("\\,;")}\\right\\}$`;
};
const PP = "]-\\pi\\,;\\pi]";

const INTERVALLES = ["]-\\pi\\,;\\pi]", "[0\\,;2\\pi[", "[0\\,;\\pi]", "[0\\,;4\\pi["];

export const trigoFormulesEquationsBank: TutorBankItemV4[] = [
  /* ===== trig_formule_addition ===== */
  tpl("trig_formule_addition", 1, 1, "cos garde les mêmes lignes et change le signe ; sin mélange les lignes et garde le signe.", () => {
    const [a, b] = un(LETTRES);
    const fn = un<Fn>(["cos", "sin"]);
    const s = un(["+", "-"]);
    const ca = `\\cos ${a}\\cos ${b}`;
    const sa = `\\sin ${a}\\sin ${b}`;
    const sc = `\\sin ${a}\\cos ${b}`;
    const cs = `\\cos ${a}\\sin ${b}`;
    const juste = fn === "cos" ? `${ca} ${s === "+" ? "-" : "+"} ${sa}` : `${sc} ${s} ${cs}`;
    const lhs = `\\${fn}(${a} ${s} ${b})`;
    return qcm(
      phrase([`Que vaut $${lhs}$ ?`, `Quelle égalité donne $${lhs}$ ?`, `Développe $${lhs}$.`, `Pour tous réels $${a}$ et $${b}$, $${lhs}$ est égal à :`, `Quelle est la formule d'addition pour $${lhs}$ ?`], ["", "C'est une formule du cours.", "Teste avec une valeur si tu hésites."]),
      `$${juste}$`,
      [`$${ca} + ${sa}$`, `$${ca} - ${sa}$`, `$${sc} + ${cs}$`, `$${sc} - ${cs}$`, `$${ca} + ${cs}$`],
      expl("les formules d'addition : $\\cos(a + b) = \\cos a\\cos b - \\sin a\\sin b$ et $\\sin(a + b) = \\sin a\\cos b + \\cos a\\sin b$.", "on remplace $b$ par $-b$ pour la soustraction : $\\cos(-b) = \\cos b$ et $\\sin(-b) = -\\sin b$.", `Ici, la formule s'applique à $${lhs}$.`, `$${lhs} = ${juste}$.`),
    );
  }),
  tpl("trig_formule_addition", 2, 1, "Repère la formule d'addition à l'envers : quelles lignes, quel signe ?", () => {
    const x = un(["x", "t", "u"]);
    const d = un([3, 5, 6, 7, 8, 9, 10, 12]); // π/4 exclu : sin(x + π/4) = cos(x − π/4), deux réponses justes.
    const A = F(1, d);
    const fn = un<Fn>(["cos", "sin"]);
    const s = un<1 | -1>([1, -1]);
    const c1 = `\\cos ${x}\\cos${arg(A)}`;
    const s1 = `\\sin ${x}\\sin${arg(A)}`;
    const m1 = `\\sin ${x}\\cos${arg(A)}`;
    const m2 = `\\cos ${x}\\sin${arg(A)}`;
    const ecrite = fn === "cos" ? `${c1} ${s > 0 ? "-" : "+"} ${s1}` : `${m1} ${s > 0 ? "+" : "-"} ${m2}`;
    const forme = (f: string, sg: 1 | -1) => `\\${f}\\left(${x} ${sg > 0 ? "+" : "-"} ${piL(A)}\\right)`;
    return qcm(
      phrase([`Écris $${ecrite}$ avec une seule ligne trigonométrique.`, `À quoi est égal $${ecrite}$ ?`, `Simplifie $${ecrite}$.`, `Reconnais une formule d'addition : $${ecrite}$ vaut :`], ["", "Regarde le signe du milieu."]),
      `$${forme(fn, s)}$`,
      [`$${forme(fn, s > 0 ? -1 : 1)}$`, `$${forme(fn === "cos" ? "sin" : "cos", s)}$`, `$${forme(fn === "cos" ? "sin" : "cos", s > 0 ? -1 : 1)}$`],
      expl("une formule d'addition se lit dans les deux sens.", "cos × cos et sin × sin, c'est le cosinus d'une somme, avec le signe inversé ; sin × cos et cos × sin, c'est le sinus d'une somme, avec le même signe.", `Ici : $${ecrite}$.`, `il vaut $${forme(fn, s)}$.`),
    );
  }),
  tpl("trig_formule_addition", 3, 2, "Applique la formule d'addition aux deux angles, puis remplace par les valeurs remarquables.", () => {
    const C = un([
      { t: F(1, 12), g: F(1, 3), h: F(1, 4), s: "-" },
      { t: F(5, 12), g: F(1, 4), h: F(1, 6), s: "+" },
      { t: F(7, 12), g: F(1, 3), h: F(1, 4), s: "+" },
      { t: F(11, 12), g: F(3, 4), h: F(1, 6), s: "+" },
    ]);
    const fn = un<Fn>(["cos", "sin"]);
    const v = (fn === "cos" ? Math.cos : Math.sin)(enPi(C.t));
    const CAND: [string, number][] = [
      ["\\dfrac{\\sqrt{6} + \\sqrt{2}}{4}", (Math.sqrt(6) + Math.SQRT2) / 4],
      ["\\dfrac{\\sqrt{6} - \\sqrt{2}}{4}", (Math.sqrt(6) - Math.SQRT2) / 4],
      ["\\dfrac{\\sqrt{2} - \\sqrt{6}}{4}", (Math.SQRT2 - Math.sqrt(6)) / 4],
      ["-\\dfrac{\\sqrt{6} + \\sqrt{2}}{4}", -(Math.sqrt(6) + Math.SQRT2) / 4],
      [r2, Math.SQRT2 / 2],
      [r3, Math.sqrt(3) / 2],
    ];
    const juste = CAND.find(([, c]) => Math.abs(c - v) < 1e-9)![0];
    const cible = `\\${fn}${arg(C.t)}`;
    const deco = `${piL(C.t)} = ${piL(C.g)} ${C.s} ${piL(C.h)}`;
    return qcm(
      phrase([`On écrit $${deco}$. Que vaut $${cible}$ ?`, `En utilisant $${deco}$, calcule $${cible}$.`, `Sachant que $${deco}$, donne la valeur exacte de $${cible}$.`, `Quelle est la valeur exacte de $${cible}$, en écrivant $${deco}$ ?`], ["", "Utilise une formule d'addition.", "Donne une valeur exacte."]),
      `$${juste}$`,
      CAND.map(([l]) => `$${l}$`),
      expl("$\\cos(a \\pm b)$ et $\\sin(a \\pm b)$ se calculent à partir des cosinus et sinus de $a$ et de $b$.", "on applique la formule, puis on remplace par les valeurs remarquables.", `Avec $${deco}$, le calcul donne une somme de produits de $\\dfrac{\\sqrt{2}}{2}$, $\\dfrac{1}{2}$ et $\\dfrac{\\sqrt{3}}{2}$.`, `$${cible} = ${juste}$.`),
    );
  }),
  tpl("trig_formule_addition", 4, 2, "Applique la formule, puis calcule avec les fractions données.", () => {
    const [A, B] = melange(TRIPLETS);
    const [u, w] = un(LETTRES.filter(([p]) => p !== "x"));
    const fn = un<Fn>(["cos", "sin"]);
    const s = un(["+", "-"]);
    const cc = A[0] * B[0];
    const ss = A[1] * B[1];
    const sc = A[1] * B[0];
    const cs = A[0] * B[1];
    const q = A[2] * B[2];
    const val = (f: Fn, sg: string) => (f === "cos" ? (sg === "+" ? cc - ss : cc + ss) : sg === "+" ? sc + cs : sc - cs);
    const p = val(fn, s);
    const donne = `$\\cos ${u} = ${frL(A[0], A[2])}$, $\\sin ${u} = ${frL(A[1], A[2])}$, $\\cos ${w} = ${frL(B[0], B[2])}$ et $\\sin ${w} = ${frL(B[1], B[2])}$`;
    const cible = `\\${fn}(${u} ${s} ${w})`;
    return qcm(
      phrase([`On donne ${donne}. Que vaut $${cible}$ ?`, `Avec ${donne}, calcule $${cible}$.`, `Sachant que ${donne}, quelle est la valeur de $${cible}$ ?`, `Les réels $${u}$ et $${w}$ vérifient ${donne}. Détermine $${cible}$.`], ["", "Écris d'abord la formule."]),
      `$${frL(p, q)}$`,
      [`$${frL(val(fn, s === "+" ? "-" : "+"), q)}$`, `$${frL(val(fn === "cos" ? "sin" : "cos", s), q)}$`, `$${frL(val(fn === "cos" ? "sin" : "cos", s === "+" ? "-" : "+"), q)}$`, `$${frL(-p, q)}$`, `$${frL(p + q, 2 * q)}$`],
      expl("la formule d'addition donne $\\cos(a \\pm b)$ et $\\sin(a \\pm b)$ à partir des quatre valeurs.", "on écrit la formule, on remplace, on calcule les produits de fractions.", `Le dénominateur commun est $${q}$ ; le numérateur vaut $${p}$.`, `$${cible} = ${frL(p, q)}$.`),
    );
  }),
  tpl("trig_formule_addition", 5, 3, "Factorise par R = √(a² + b²), puis reconnais cos φ et sin φ.", () => {
    const c = un(COMBIS);
    const k = un([1, 1, 2, 3]);
    const mult = (s: string) => (k === 1 ? s || "" : s ? `${k}${s}` : String(k));
    const f = `${mult(c.a)}\\cos x ${c.signeB > 0 ? "+" : "-"} ${mult(c.b)}\\sin x`;
    const R = c.R === "2" ? String(2 * k) : k === 1 ? c.R : `${k}${c.R}`;
    const juste = `${R}${cosPhi(c.phi)}`;
    return qcm(
      `${un(CTX)} ${phrase([`Le signal total vaut $f(x) = ${f}$. Écris-le sous la forme $R\\cos(x - \\varphi)$.`, `On a $f(x) = ${f}$. Quelle écriture en $R\\cos(x - \\varphi)$ convient ?`, `La somme s'écrit $f(x) = ${f}$. Quelle est sa forme avec un seul cosinus ?`, `La somme vaut $f(x) = ${f}$, qu'on veut écrire avec un seul cosinus. Laquelle est juste ?`], ["", "Calcule $R$ d'abord."])}`,
      `$${juste}$`,
      [`$${R}${cosPhi(oppose(c.phi))}$`, `$${R}${cosPhi(c.phi, "sin")}$`, `$${c.somme === "2" ? 2 * k : k === 1 ? c.somme : `${k}(${c.somme})`}${cosPhi(c.phi)}$`, `$${R}${cosPhi(ajoute(c.phi, F(1, 6)))}$`],
      expl("$a\\cos x + b\\sin x = R\\cos(x - \\varphi)$, avec $R = \\sqrt{a^2 + b^2}$, $\\cos\\varphi = \\dfrac{a}{R}$ et $\\sin\\varphi = \\dfrac{b}{R}$.", "on calcule $R$, puis on repère l'angle $\\varphi$ sur le cercle.", `Ici, $R = ${R}$ et $\\varphi = ${piL(c.phi)}$.`, `$f(x) = ${juste}$.`),
    );
  }),
  tpl("trig_formule_addition", 6, 3, "Avec un seul cosinus, le maximum se lit : c'est R.", () => {
    const c = un(COMBIS);
    const k = un([1, 1, 2, 3]);
    const mult = (s: string) => (k === 1 ? s || "" : s ? `${k}${s}` : String(k));
    const f = `${mult(c.a)}\\cos x ${c.signeB > 0 ? "+" : "-"} ${mult(c.b)}\\sin x`;
    const R = c.R === "2" ? String(2 * k) : k === 1 ? c.R : `${k}${c.R}`;
    const faux = [c.somme === "2" ? String(2 * k) : k === 1 ? c.somme : `${k}(${c.somme})`, String(k), String(4 * k), c.R === "2" ? `${k === 1 ? "" : k}\\sqrt{2}` : String(2 * k), String(3 * k)];
    return qcm(
      `${un(CTX)} ${phrase([`Le signal vaut $f(x) = ${f}$. Quelle est sa valeur maximale ?`, `Quelle est l'amplitude de $f(x) = ${f}$ ?`, `On a $f(x) = ${f}$. Quel est le maximum de $f$ sur $\\mathbb{R}$ ?`, `Jusqu'où monte $f(x) = ${f}$ ?`], ["", "Écris $f$ avec un seul cosinus.", "Ce n'est pas la somme des coefficients."])}`,
      `$${R}$`,
      faux.map((x) => `$${x}$`),
      expl("$a\\cos x + b\\sin x = R\\cos(x - \\varphi)$, avec $R = \\sqrt{a^2 + b^2}$ : le cosinus vaut au plus $1$.", "on calcule $R$ : c'est le maximum.", `$R = ${R}$.`, `le maximum est $${R}$.`),
    );
  }),

  /* ===== trig_formule_duplication ===== */
  tpl("trig_formule_duplication", 1, 1, "C'est la formule d'addition avec b = a.", () => {
    const a = un(["a", "x", "t", "u"]);
    const fn = un<Fn>(["cos", "cos", "sin"]);
    const lhs = `\\${fn}(2${a})`;
    const c2 = `\\cos^2 ${a}`;
    const s2 = `\\sin^2 ${a}`;
    const sc = `\\sin ${a}\\cos ${a}`;
    const juste = fn === "sin" ? `2${sc}` : un([`${c2} - ${s2}`, `2${c2} - 1`, `1 - 2${s2}`]);
    const pieges = fn === "sin" ? [`2\\sin ${a}`, sc, `${c2} - ${s2}`, `2${c2} - 1`, `${s2} - ${c2}`] : [`2\\cos ${a}`, `${c2} + ${s2}`, `1 - 2${c2}`, `2${s2} - 1`, `2${sc}`];
    return qcm(
      phrase([`Quelle égalité est vraie pour tout réel $${a}$ : $${lhs}$ est égal à ?`, `Que vaut $${lhs}$ ?`, `Laquelle de ces expressions est égale à $${lhs}$ ?`, `Quelle est la formule de duplication de $${lhs}$ ?`], ["", "Pars de la formule d'addition.", "Teste une valeur si tu hésites."]),
      `$${juste}$`,
      pieges.map((x) => `$${x}$`),
      expl("formules de duplication : $\\sin(2a) = 2\\sin a\\cos a$ et $\\cos(2a) = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$.", "on applique la formule d'addition avec $b = a$, puis $\\cos^2 a + \\sin^2 a = 1$.", `Ici, on cherche $${lhs}$.`, `$${lhs} = ${juste}$.`),
    );
  }),
  tpl("trig_formule_duplication", 2, 1, "Reconnais la formule de duplication, en sortant le coefficient si besoin.", () => {
    const x = un(["x", "t", "u"]);
    const k = entre(1, 5);
    const c2 = `\\cos^2 ${x}`;
    const s2 = `\\sin^2 ${x}`;
    const co = (v: number) => (v === 1 ? "" : String(v));
    const C = un([
      { e: `${co(2 * k)}\\sin ${x}\\cos ${x}`, fn: "sin" },
      { e: `${co(k)}${c2} - ${co(k)}${s2}`, fn: "cos" },
      { e: `${co(2 * k)}${c2} - ${k}`, fn: "cos" },
      { e: `${k} - ${co(2 * k)}${s2}`, fn: "cos" },
    ]);
    const forme = (f: string, m = k) => `${co(m)}\\${f}(2${x})`;
    const autre = C.fn === "sin" ? "cos" : "sin";
    return qcm(
      phrase([`Simplifie $${C.e}$.`, `À quoi est égal $${C.e}$ ?`, `Écris $${C.e}$ avec une seule ligne trigonométrique.`, `Quelle expression est égale à $${C.e}$ ?`], ["", "Pense à la duplication."]),
      `$${forme(C.fn)}$`,
      [`$${forme(autre)}$`, `$${forme(C.fn, 2 * k)}$`, `$${forme(autre, 2 * k)}$`, `$${co(k)}\\${C.fn} ${x}$`],
      expl("les formules de duplication se lisent dans les deux sens.", "on met en facteur le coefficient, puis on reconnaît la formule.", `Ici, on factorise par $${k}$.`, `$${C.e} = ${forme(C.fn)}$.`),
    );
  }),
  tpl("trig_formule_duplication", 3, 2, "Trouve d'abord l'autre ligne avec cos² + sin² = 1, et son signe sur l'intervalle.", () => {
    const [a, b, c] = un(TRIPLETS);
    const Q = un([
      { l: "\\left]0\\,;\\dfrac{\\pi}{2}\\right[", sc: 1, ss: 1 },
      { l: "\\left]\\dfrac{\\pi}{2}\\,;\\pi\\right[", sc: -1, ss: 1 },
      { l: "\\left]-\\dfrac{\\pi}{2}\\,;0\\right[", sc: 1, ss: -1 },
      { l: "\\left]-\\pi\\,;-\\dfrac{\\pi}{2}\\right[", sc: -1, ss: -1 },
    ]);
    const u = un(["a", "x", "t", "u"]);
    const cosA = Q.sc * a;
    const sinA = Q.ss * b;
    const donneCos = Math.random() < 0.5;
    const donne = donneCos ? `\\cos ${u} = ${frL(cosA, c)}` : `\\sin ${u} = ${frL(sinA, c)}`;
    const fn = un<Fn>(["cos", "sin"]);
    const q = c * c;
    const v = fn === "sin" ? 2 * sinA * cosA : cosA * cosA - sinA * sinA;
    const cible = `\\${fn}(2${u})`;
    return qcm(
      phrase([`On sait que $${donne}$ et que $${u} \\in ${Q.l}$. Que vaut $${cible}$ ?`, `Avec $${donne}$ et $${u} \\in ${Q.l}$, calcule $${cible}$.`, `Soit $${u} \\in ${Q.l}$ tel que $${donne}$. Détermine $${cible}$.`, `Pour $${u} \\in ${Q.l}$, on a $${donne}$. Quelle est la valeur exacte de $${cible}$ ?`], ["", "Attention au signe."]),
      `$${frL(v, q)}$`,
      [`$${frL(-v, q)}$`, fn === "sin" ? `$${frL(cosA * cosA - sinA * sinA, q)}$` : `$${frL(2 * sinA * cosA, q)}$`, fn === "sin" ? `$${frL(-(cosA * cosA - sinA * sinA), q)}$` : `$${frL(-2 * sinA * cosA, q)}$`, `$${frL(2 * (donneCos ? cosA : sinA), c)}$`, `$${frL(v + q, 2 * q)}$`].filter((x) => x !== `$${frL(v, q)}$`),
      expl("$\\cos^2 a + \\sin^2 a = 1$, et le signe de chaque ligne se lit sur l'intervalle.", "on calcule la ligne manquante, on choisit son signe, puis on applique la formule de duplication.", `$\\cos ${u} = ${frL(cosA, c)}$ et $\\sin ${u} = ${frL(sinA, c)}$.`, `$${cible} = ${frL(v, q)}$.`),
    );
  }),
  tpl("trig_formule_duplication", 4, 2, "Reconnais une formule de duplication : l'angle double a une valeur connue.", () => {
    const D = un(DOUBLE);
    const a = arg(D.t);
    const C = un([
      { e: `2\\sin${a}\\cos${a}`, v: Math.sin(enPi(D.dbl)) },
      { e: `\\cos^2${a} - \\sin^2${a}`, v: Math.cos(enPi(D.dbl)) },
      { e: `2\\cos^2${a} - 1`, v: Math.cos(enPi(D.dbl)) },
      { e: `1 - 2\\sin^2${a}`, v: Math.cos(enPi(D.dbl)) },
    ]);
    const juste = valeurL(C.v);
    return qcm(
      phrase([`Calcule $${C.e}$.`, `Quelle est la valeur exacte de $${C.e}$ ?`, `Sans calculatrice, que vaut $${C.e}$ ?`, `Reconnais une formule de duplication et calcule $${C.e}$.`], ["", "Pense à l'angle double."]),
      `$${juste}$`,
      VALEURS.map(([l]) => `$${l}$`),
      expl("les formules de duplication ramènent l'expression au cosinus ou au sinus de l'angle double.", "on reconnaît la formule, puis on lit la valeur remarquable.", `L'angle double vaut $${piL(D.dbl)}$.`, `le résultat est $${juste}$.`),
    );
  }),
  tpl("trig_formule_duplication", 5, 3, "Linéariser : remplacer un carré ou un produit par une expression en cos(2x) ou sin(2x).", () => {
    const m = entre(1, 5);
    const k = 2 * m;
    const co = (v: number) => (v === 1 ? "" : String(v));
    const C = un([
      { e: `${k}\\cos^2 x`, j: `${m} + ${co(m)}\\cos(2x)`, f: [`${m} - ${co(m)}\\cos(2x)`, `${m} + ${co(m)}\\sin(2x)`, `${k} + ${co(m)}\\cos(2x)`, `${m} + ${k}\\cos(2x)`] },
      { e: `${k}\\sin^2 x`, j: `${m} - ${co(m)}\\cos(2x)`, f: [`${m} + ${co(m)}\\cos(2x)`, `${m} - ${co(m)}\\sin(2x)`, `${k} - ${co(m)}\\cos(2x)`, `${m} - ${k}\\cos(2x)`] },
      { e: `${k}\\sin x\\cos x`, j: `${co(m)}\\sin(2x)`, f: [`${k}\\sin(2x)`, `${co(m)}\\cos(2x)`, `${k}\\cos(2x)`, `${m} + ${co(m)}\\sin(2x)`] },
    ]);
    return qcm(
      `${un(CTX_DUP)} ${phrase([`On a $f(x) = ${C.e}$. Linéarise cette expression.`, `Pour étudier $f(x) = ${C.e}$, on la linéarise. Quelle écriture est juste ?`, `Écris $f(x) = ${C.e}$ sans carré ni produit de lignes trigonométriques.`, `Quelle expression en $2x$ est égale à $f(x) = ${C.e}$ ?`], ["", "Utilise la duplication."])}`,
      `$${C.j}$`,
      C.f.map((x) => `$${x}$`),
      expl("linéariser : $\\cos^2 x = \\dfrac{1 + \\cos(2x)}{2}$, $\\sin^2 x = \\dfrac{1 - \\cos(2x)}{2}$, $\\sin x\\cos x = \\dfrac{\\sin(2x)}{2}$.", "on remplace, puis on multiplie par le coefficient.", `On part de $${C.e}$.`, `$f(x) = ${C.j}$.`),
    );
  }),
  tpl("trig_formule_duplication", 6, 3, "Passe par l'angle double : un sinus ou un cosinus vaut au plus 1.", () => {
    const m = entre(2, 12);
    const c = entre(1, 9);
    const C = un([
      { e: `${2 * m}\\sin x\\cos x`, v: m },
      { e: `${2 * m}\\sin x\\cos x + ${c}`, v: m + c },
      { e: `${m}\\cos^2 x - ${m}\\sin^2 x`, v: m },
      { e: `${m}\\cos^2 x - ${m}\\sin^2 x + ${c}`, v: m + c },
      { e: `${2 * m}\\cos^2 x - ${m}`, v: m },
      { e: `${m} - ${2 * m}\\sin^2 x`, v: m },
    ]);
    return court(
      `${un(CTX_DUP)} ${un([`On a $f(x) = ${C.e}$ sur $[0\\,;\\dfrac{\\pi}{2}]$. Quel est le maximum de $f$ ?`, `Le modèle est $f(x) = ${C.e}$, pour $x$ dans $[0\\,;\\dfrac{\\pi}{2}]$. Quelle est sa valeur maximale ?`, `Quelle est la plus grande valeur de $f(x) = ${C.e}$ sur $[0\\,;\\dfrac{\\pi}{2}]$ ?`, `Quelle valeur maximale atteint $f(x) = ${C.e}$ sur $[0\\,;\\dfrac{\\pi}{2}]$ ?`, `Calcule le maximum de $f(x) = ${C.e}$ sur $[0\\,;\\dfrac{\\pi}{2}]$.`])}`,
      C.v,
      expl("les formules de duplication écrivent $f$ avec $\\sin(2x)$ ou $\\cos(2x)$, qui valent au plus $1$.", "on réécrit $f$, puis on cherche où la ligne trigonométrique vaut $1$ sur l'intervalle.", `On trouve une valeur maximale de $${C.v}$.`, `le maximum est $${C.v}$.`),
    );
  }),

  /* ===== trig_equation_generale ===== */
  tpl("trig_equation_generale", 1, 1, "Cherche un angle α qui a ce cosinus : les solutions sont α + 2kπ et −α + 2kπ.", () => {
    const v = un(TOUTES);
    const eq = eqVal("cos", v);
    const juste = ecritF(familles("cos", v.c));
    return qcm(
      phrase([`Résous dans $\\mathbb{R}$ : $${eq}$.`, `Quelles sont les solutions réelles de $${eq}$ ?`, `Dans $\\mathbb{R}$, l'équation $${eq}$ a pour solutions :`, `Quel est l'ensemble des réels $x$ tels que $${eq}$ ?`, `Sur $\\mathbb{R}$ tout entier, résous $${eq}$.`], ["", "Pense au cercle trigonométrique.", "N'oublie pas la période."]),
      juste,
      piegesEq("cos", v.c, 1, F(0)),
      explEq("cos", eq, juste),
    );
  }),
  tpl("trig_equation_generale", 2, 1, "Cherche un angle α qui a ce sinus : les solutions sont α + 2kπ et π − α + 2kπ.", () => {
    const v = un(TOUTES);
    const eq = eqVal("sin", v);
    const juste = ecritF(familles("sin", v.s));
    return qcm(
      phrase([`Résous dans $\\mathbb{R}$ : $${eq}$.`, `Quelles sont les solutions réelles de $${eq}$ ?`, `Dans $\\mathbb{R}$, l'équation $${eq}$ a pour solutions :`, `Quel est l'ensemble des réels $x$ tels que $${eq}$ ?`, `Sur $\\mathbb{R}$ tout entier, résous $${eq}$.`], ["", "Pense au cercle trigonométrique.", "N'oublie pas la période."]),
      juste,
      piegesEq("sin", v.s, 1, F(0)),
      explEq("sin", eq, juste),
    );
  }),
  tpl("trig_equation_generale", 3, 2, "cos x = cos α, sin x = sin α : deux familles ; tan x = tan α : une seule, de période π.", () => {
    const d = un([5, 7, 8, 9, 10, 11]);
    const n = un([1, 1, 2, 3]);
    const A = F(n, d);
    const genre = un(["cos", "sin", "tan", "tanv"]);
    if (genre === "cos" || genre === "sin") {
      const fn = genre as Fn;
      const eq = `\\${fn} x = \\${fn}${arg(A)}`;
      const juste = ecritF(familles(fn, A));
      return qcm(
        phrase([`Résous dans $\\mathbb{R}$ : $${eq}$.`, `Quelles sont les solutions de $${eq}$ dans $\\mathbb{R}$ ?`, `Quel est l'ensemble des réels $x$ vérifiant $${eq}$ ?`, `Sur $\\mathbb{R}$, l'équation $${eq}$ équivaut à :`], ["", "Il y a deux familles."]),
        juste,
        piegesEq(fn, A, 1, F(0)),
        explEq(fn, eq, juste),
      );
    }
    const T_VALS = [
      { l: "1", a: F(1, 4) },
      { l: "-1", a: F(-1, 4) },
      { l: "\\sqrt{3}", a: F(1, 3) },
      { l: "-\\sqrt{3}", a: F(-1, 3) },
      { l: "\\dfrac{\\sqrt{3}}{3}", a: F(1, 6) },
      { l: "-\\dfrac{\\sqrt{3}}{3}", a: F(-1, 6) },
    ];
    const V = genre === "tan" ? { l: `\\tan${arg(A)}`, a: A } : un(T_VALS);
    const eq = `\\tan x = ${V.l}`;
    const juste = ecrit([famille(V.a, F(1))]);
    return qcm(
      phrase([`Résous dans $\\mathbb{R}$ : $${eq}$.`, `Quelles sont les solutions de $${eq}$ dans $\\mathbb{R}$ ?`, `Quel est l'ensemble des réels $x$ vérifiant $${eq}$ ?`, `Sur $\\mathbb{R}$, l'équation $${eq}$ équivaut à :`], ["", "La tangente a pour période $\\pi$."]),
      juste,
      [ecrit([famille(V.a, F(2))]), ecrit([famille(oppose(V.a), F(1))]), ecrit([famille(V.a, F(2)), famille(oppose(V.a), F(2))]), ecrit([famille(ajoute(V.a, F(1, 6)), F(1))])],
      expl("$\\tan x = \\tan \\alpha$ équivaut à $x = \\alpha + k\\pi$, avec $k$ entier, car la tangente a pour période $\\pi$.", "on cherche un angle $\\alpha$ de tangente connue, puis on écrit une seule famille.", `Ici, $\\alpha = ${piL(V.a)}$.`, `${juste.replace(/, avec.*$/, "")}, avec $k$ entier.`),
    );
  }),
  tpl("trig_equation_generale", 4, 2, "Résous pour X = mx, puis divise tout par m, la période comprise.", () => {
    const v = un(VALS);
    const fn = un<Fn>(["cos", "sin"]);
    const m = un([2, 2, 3, 4]);
    const a = alphaDe(fn, v);
    const eq = `\\${fn}(${m}x) = ${v.l}`;
    const juste = ecritF(familles(fn, a, m));
    const faux = distincts(familles(fn, a, m), [
      familles(fn, a, 1),
      familles(fn, a, m).map((f) => ({ a: f.a, p: F(2) })),
      familles(fn, a, 1).map((f) => ({ a: divise(f.a, m), p: F(1) })),
      familles(fn === "cos" ? "sin" : "cos", a, m),
      familles(fn, a, m).map((f) => ({ a: oppose(ajoute(f.a, F(1, 6))), p: f.p })),
      familles(fn, a, m).map((f) => ({ a: ajoute(f.a, F(1, 3)), p: f.p })),
    ]);
    return qcm(
      phrase([`Résous dans $\\mathbb{R}$ : $${eq}$.`, `Quelles sont les solutions réelles de $${eq}$ ?`, `Sur $\\mathbb{R}$, l'équation $${eq}$ a pour solutions :`, `Quels réels $x$ vérifient $${eq}$ ?`], ["", "Pose $X = " + m + "x$.", "La période aussi est divisée."]),
      juste,
      faux,
      explEq(fn, eq, juste),
    );
  }),
  tpl("trig_equation_generale", 5, 3, "Écris les solutions générales, puis cherche les valeurs de k qui tombent dans l'intervalle.", () => {
    const v = un(VALS);
    const fn = un<Fn>(["cos", "sin"]);
    const m = un([1, 2, 2, 3]);
    const I = un(INTERVALLES);
    const a = alphaDe(fn, v);
    const X = m === 1 ? "x" : `(${m}x)`;
    const eq = `\\${fn}${m === 1 ? " x" : X} = ${v.l}`;
    // Bornes en multiples de π.
    const lo = I.startsWith("]-") ? -1 : 0;
    const hi = I === "[0\\,;\\pi]" ? 1 : I === "]-\\pi\\,;\\pi]" ? 1 : I === "[0\\,;2\\pi[" ? 2 : 4;
    const ferLo = !I.startsWith("]");
    const ferHi = I.endsWith("]");
    const vus = new Set<number>();
    for (const f of familles(fn, a, m)) {
      for (let k = -60; k <= 60; k++) {
        const t = (f.a.n / f.a.d) + (k * f.p.n) / f.p.d;
        if ((t > lo + 1e-9 || (ferLo && Math.abs(t - lo) < 1e-9)) && (t < hi - 1e-9 || (ferHi && Math.abs(t - hi) < 1e-9))) vus.add(Math.round(t * 1e6));
      }
    }
    return court(
      `${un(CTX)} ${phrase([`On cherche les réels $x$ de $${I}$ tels que $${eq}$. Combien y en a-t-il ?`, `Combien l'équation $${eq}$ a-t-elle de solutions sur $${I}$ ?`, `Sur $${I}$, compte les solutions de $${eq}$.`, `La condition s'écrit $${eq}$, avec $x$ dans $${I}$. Combien de valeurs de $x$ conviennent ?`], ["", "Réponds par un nombre.", "Écris d'abord les solutions générales."])}`,
      vus.size,
      expl("les solutions générales sont des familles indexées par $k$ entier.", "on écrit les familles, puis on essaie les valeurs de $k$ pour rester dans l'intervalle.", `Les familles sont : ${ecritF(familles(fn, a, m)).replace(/, avec.*$/, "")}.`, `il y a ${vus.size} solution${vus.size > 1 ? "s" : ""} sur l'intervalle.`),
    );
  }),
  tpl("trig_equation_generale", 6, 3, "Ramène l'équation à cos X = cos α : décalage, second degré ou a cos x + b sin x.", () => {
    const genre = un(["decale", "degre2", "combi"]);
    const prefixe = un(CTX);
    if (genre === "decale") {
      const v = un(VALS);
      const fn = un<Fn>(["cos", "sin"]);
      const phi = un([F(1, 3), F(1, 4), F(1, 6), F(-1, 3), F(-1, 4), F(-1, 6), F(1, 2), F(-1, 2)]);
      const interne = phi.n > 0 ? `x - ${piL(phi)}` : `x + ${piL(oppose(phi))}`;
      const eq = `\\${fn}\\left(${interne}\\right) = ${v.l}`;
      const a = alphaDe(fn, v);
      const J = familles(fn, a, 1, phi);
      const juste = ecritF(J);
      return qcm(
        `${prefixe} ${un([`La condition s'écrit $${eq}$. Résous-la dans $\\mathbb{R}$.`, `Résous dans $\\mathbb{R}$ la condition $${eq}$.`, `Quelles sont les solutions réelles de $${eq}$ ?`])}`,
        juste,
        distincts(J, [familles(fn, a, 1, oppose(phi)), familles(fn, a), familles(fn === "cos" ? "sin" : "cos", a, 1, phi), [J[0]], J.map((f) => ({ a: ajoute(f.a, F(1, 6)), p: f.p })), J.map((f) => ({ a: ajoute(f.a, F(1, 3)), p: f.p }))]),
        explEq(fn, eq, juste),
      );
    }
    if (genre === "degre2") {
      const fn = un<Fn>(["cos", "sin"]);
      const [r, s] = melange(RACINES).slice(0, 2).map((x) => x.num);
      // (2X − r)(2X − s) = 4X² − 2(r + s)X + rs, réduit.
      let [A, B, C] = [4, -2 * (r + s), r * s];
      const g = pgcd(pgcd(A, Math.abs(B)), Math.abs(C)) || 1;
      [A, B, C] = [A / g, B / g, C / g];
      const eq = `${somme([T(A, 1, `\\${fn}^2 x`), T(B, 1, `\\${fn} x`), T(C, 1)])} = 0`;
      const de = (u: number) => surPP(fn, VAL_DE_DEMI[u]);
      const juste = ensL([...de(r), ...de(s)]);
      const autre: Fn = fn === "cos" ? "sin" : "cos";
      return qcm(
        `${prefixe} ${un([`La condition s'écrit $${eq}$, avec $x \\in ${PP}$. Quelles sont les solutions ?`, `Résous sur $${PP}$ : $${eq}$.`, `Sur $${PP}$, quelles sont les solutions de $${eq}$ ?`])}`,
        juste,
        [ensL(de(r)), ensL(de(s)), ensL([...surPP(autre, VAL_DE_DEMI[r]), ...surPP(autre, VAL_DE_DEMI[s])]), ensL([...de(r), ...de(s).map(oppose)].map(principal)), ensL([...de(r), ...de(-s)])].filter((c) => c !== juste),
        expl(`on pose $X = \\${fn} x$ : l'équation devient une équation du second degré.`, "on résout en $X$, puis on résout chaque équation $\\" + fn + " x = X$ sur l'intervalle.", `Les racines en $X$ sont $${frL(r, 2)}$ et $${frL(s, 2)}$.`, `l'ensemble des solutions est ${juste}.`),
      );
    }
    const c = un(COMBIS);
    const Vs = c.R === "2" ? [{ l: "1", al: F(1, 3) }, { l: "-1", al: F(2, 3) }, { l: "\\sqrt{2}", al: F(1, 4) }, { l: "-\\sqrt{2}", al: F(3, 4) }, { l: "\\sqrt{3}", al: F(1, 6) }, { l: "-\\sqrt{3}", al: F(5, 6) }] : [{ l: "1", al: F(1, 4) }, { l: "-1", al: F(3, 4) }];
    const W = un(Vs);
    const eq = `${texteCombi(c)} = ${W.l}`;
    const J = familles("cos", W.al, 1, c.phi);
    const juste = ecritF(J);
    return qcm(
      `${prefixe} ${un([`La condition s'écrit $${eq}$. Résous-la dans $\\mathbb{R}$.`, `Résous dans $\\mathbb{R}$ : $${eq}$.`, `Quelles sont les solutions réelles de $${eq}$ ?`])}`,
      juste,
      distincts(J, [familles("cos", W.al, 1, oppose(c.phi)), familles("cos", W.al), familles("sin", W.al, 1, c.phi), [J[0]], J.map((f) => ({ a: ajoute(f.a, F(1, 6)), p: f.p })), J.map((f) => ({ a: ajoute(f.a, F(1, 3)), p: f.p }))]),
      expl("$a\\cos x + b\\sin x = R\\cos(x - \\varphi)$, avec $R = \\sqrt{a^2 + b^2}$.", "on écrit le premier membre avec un seul cosinus, on divise par $R$, puis on résout.", `$R = ${c.R}$ et $\\varphi = ${piL(c.phi)}$.`, `${juste.replace(/, avec.*$/, "")}, avec $k$ entier.`),
    );
  }),
];
