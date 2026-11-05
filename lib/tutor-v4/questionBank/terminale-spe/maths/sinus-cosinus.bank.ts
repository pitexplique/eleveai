// FONCTIONS SINUS ET COSINUS (05/11/2026). Trou du programme de Terminale spé :
// « résoudre une équation du type cos(x) = a, une inéquation cos(x) ≥ a sur
// [−π ; π] » ; « étudier une fonction définie à partir de fonctions
// trigonométriques ». Notion nouvelle : la Tle n'avait aucune question là-dessus.
// ⚠️ Les angles se calculent en douzièmes de π, entiers : aucun arrondi possible.
// Les correcteurs relisent l'équation écrite et la testent sur toute la grille.

import type { CercleTrigoCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { T, court, entre, expl, fabrique, fauxExacts, fauxPrimitives, lin, melange, nL, pgcd, phrase, qcm, somme, un, type Terme } from "../../lycee-commun";

const tpl = fabrique("terminale-spe", "fonctions_sinus_cosinus", "tle_");

/* ───────────────── les réels en douzièmes de π ───────────────── */

export function piSur12(t: number) {
  if (t === 0) return "0";
  const g = pgcd(Math.abs(t), 12);
  const n = Math.abs(t) / g;
  const d = 12 / g;
  const s = t < 0 ? "-" : "";
  if (d === 1) return n === 1 ? `${s}\\pi` : `${s}${n}\\pi`;
  return n === 1 ? `${s}\\dfrac{\\pi}{${d}}` : `${s}\\dfrac{${n}\\pi}{${d}}`;
}

type Fn = "cos" | "sin";
type Val = { s: 1 | -1 | 0; r: "1" | "\\sqrt{2}" | "\\sqrt{3}" | "0" | "un"; c: number; si: number };
/** a = s·r/2 ; `c` = α tel que cos α = a (α dans [0 ; π]) ; `si` = β tel que sin β = a (β dans [−π/2 ; π/2]). */
const VALS: Val[] = [
  { s: 1, r: "\\sqrt{3}", c: 2, si: 4 },
  { s: 1, r: "\\sqrt{2}", c: 3, si: 3 },
  { s: 1, r: "1", c: 4, si: 2 },
  { s: 0, r: "0", c: 6, si: 0 },
  { s: -1, r: "1", c: 8, si: -2 },
  { s: -1, r: "\\sqrt{2}", c: 9, si: -3 },
  { s: -1, r: "\\sqrt{3}", c: 10, si: -4 },
];
const UN: Val = { s: 1, r: "un", c: 0, si: 6 };
const MOINS_UN: Val = { s: -1, r: "un", c: 12, si: -6 };
const valL = (v: Val) => (v.r === "0" ? "0" : v.r === "un" ? (v.s < 0 ? "-1" : "1") : `${v.s < 0 ? "-" : ""}\\dfrac{${v.r}}{2}`);

type Int = { l: string; lo: number; hi: number; oLo: boolean; oHi: boolean };
const PP: Int = { l: "[-\\pi\\,;\\pi]", lo: -12, hi: 12, oLo: false, oHi: false };
const INTERVALLES: Int[] = [PP, PP, { l: "]-\\pi\\,;\\pi]", lo: -12, hi: 12, oLo: true, oHi: false }, { l: "[0\\,;2\\pi[", lo: 0, hi: 24, oLo: false, oHi: true }];

function solutions(fn: Fn, v: Val, I: Int) {
  const bases = fn === "cos" ? [v.c, -v.c] : [v.si, 12 - v.si];
  const res = new Set<number>();
  for (const b of bases)
    for (const k of [-2, -1, 0, 1, 2]) {
      const t = b + 24 * k;
      if ((t > I.lo || (t === I.lo && !I.oLo)) && (t < I.hi || (t === I.hi && !I.oHi))) res.add(t);
    }
  return [...res].sort((a, b) => a - b);
}
const ens = (l: number[]) => (l.length ? `$\\left\\{${l.map(piSur12).join("\\,;")}\\right\\}$` : "$\\emptyset$");

/** L'équation, écrite sous une forme équivalente à fn(x) = a. */
function formeEq(fn: Fn, v: Val, simple = false) {
  const F = `\\${fn} x`;
  const ca = `${F} = ${valL(v)}`;
  if (simple) return ca;
  if (v.r === "0") return un([ca, `${un([2, 3, 5])}${F} = 0`]);
  if (v.r === "un") return v.s > 0 ? un([ca, `${F} - 1 = 0`]) : un([ca, `${F} + 1 = 0`]);
  return un([`2${F} = ${v.s < 0 ? "-" : ""}${v.r}`, `2${F} ${v.s < 0 ? "+" : "-"} ${v.r} = 0`, `${v.s < 0 ? "-" : ""}${v.r} = 2${F}`.replace(/^(.*) = (.*)$/, "$2 = $1")]);
}

function circle(): CercleTrigoCanvasData {
  return { kind: "cercle_trigo", reperes: "tous", valeursAxes: true, axesCouleur: true };
}

function explEq(fn: Fn, v: Val, I: Int, sol: number[]) {
  const a = valL(v);
  const base = fn === "cos" ? piSur12(v.c) : piSur12(v.si);
  return expl(
    `$\\${fn} x$ est ${fn === "cos" ? "l'abscisse" : "l'ordonnée"} du point du cercle trigonométrique associé à $x$.`,
    `on isole $\\${fn} x$, puis on cherche sur le cercle les points ${fn === "cos" ? "d'abscisse" : "d'ordonnée"} $${a}$.`,
    `$\\${fn}\\left(${base}\\right) = ${a}$. ${fn === "cos" ? "Le cosinus ne change pas quand on change $x$ en $-x$." : "Le sinus ne change pas quand on change $x$ en $\\pi - x$."} On garde les solutions dans $${I.l}$.`,
    `l'ensemble des solutions est ${ens(sol)}.`,
  );
}

function piegesEq(fn: Fn, v: Val, I: Int, sol: number[]) {
  const autre: Fn = fn === "cos" ? "sin" : "cos";
  const pool = [ens(solutions(autre, v, I))];
  if (sol.length > 1) pool.push(ens([sol[0]]), ens([sol[sol.length - 1]]));
  for (const w of melange(VALS)) if (w !== v) pool.push(ens(solutions(fn, w, I)));
  return pool.filter((p) => p !== ens(sol));
}

const CTX_EQ = [
  "Un pendule de démonstration",
  "Le niveau d'une marée, dans un modèle simplifié,",
  "Le signal d'un capteur",
  "La tension d'un circuit",
  "Le mouvement d'un piston",
  "La luminosité d'une enseigne qui clignote",
  "La nacelle d'une grande roue",
  "La note d'un diapason, vue sur un oscilloscope,",
  "La position d'une aiguille de sismographe",
  "La hauteur d'un ressort",
];

/* ───────────────── inéquations : réunion d'intervalles ───────────────── */

type Sens = "\\geq" | "\\leq" | ">" | "<";
const teste = (fn: Fn, t: number, s: Sens, a: number) => {
  const y = (fn === "cos" ? Math.cos : Math.sin)((t * Math.PI) / 12);
  const eg = Math.abs(y - a) < 1e-9;
  if (eg) return s === "\\geq" || s === "\\leq";
  return s === "\\geq" || s === ">" ? y > a : y < a;
};
const vNum = (v: Val) => (v.r === "0" ? 0 : v.r === "un" ? v.s : (v.s * Math.sqrt(v.r === "1" ? 1 : v.r === "\\sqrt{2}" ? 2 : 3)) / 2);

/** La solution sur [−π ; π], calculée sur les points critiques en douzièmes. */
function solIneq(fn: Fn, v: Val, s: Sens) {
  const pts = [...new Set([-12, 12, ...solutions(fn, v, PP)])].sort((a, b) => a - b);
  const morceaux: { a: number; b: number; fa: boolean; fb: boolean }[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [p, q] = [pts[i], pts[i + 1]];
    if (!teste(fn, (p + q) / 2, s, vNum(v))) continue;
    const dernier = morceaux[morceaux.length - 1];
    if (dernier && dernier.b === p && teste(fn, p, s, vNum(v))) {
      dernier.b = q;
      dernier.fb = teste(fn, q, s, vNum(v));
    } else morceaux.push({ a: p, b: q, fa: teste(fn, p, s, vNum(v)), fb: teste(fn, q, s, vNum(v)) });
  }
  return morceaux;
}
const ecrire = (m: ReturnType<typeof solIneq>) =>
  `$${m.map((x) => `\\left${x.fa ? "[" : "]"}${piSur12(x.a)}\\,;${piSur12(x.b)}\\right${x.fb ? "]" : "["}`).join(" \\cup ")}$`;
const inverse: Record<Sens, Sens> = { "\\geq": "<", "\\leq": ">", ">": "\\leq", "<": "\\geq" };
const VALS_INEQ_COS = VALS;
const VALS_INEQ_SIN = VALS.filter((v) => v.r !== "0"); // sin x ≥ 0 sur [−π ; π] contient le point isolé −π : on l'évite.

function formeIneq(fn: Fn, v: Val, s: Sens, simple: boolean) {
  const F = `\\${fn} x`;
  if (simple || v.r === "0") return `${F} ${s} ${valL(v)}`;
  return un([`2${F} ${s} ${v.s < 0 ? "-" : ""}${v.r}`, `2${F} ${v.s < 0 ? "+" : "-"} ${v.r} ${s} 0`]);
}
function piegesIneq(fn: Fn, v: Val, s: Sens) {
  const juste = ecrire(solIneq(fn, v, s));
  const pool = [ecrire(solIneq(fn, v, inverse[s]))];
  const liste = fn === "cos" ? VALS_INEQ_COS : VALS_INEQ_SIN;
  for (const w of melange(liste)) if (w !== v) pool.push(ecrire(solIneq(fn, w, s)));
  if (VALS_INEQ_SIN.includes(v)) pool.push(ecrire(solIneq(fn === "cos" ? "sin" : "cos", v, s)));
  return pool.filter((p) => p !== juste);
}
function explIneq(fn: Fn, v: Val, s: Sens) {
  const a = valL(v);
  const axe = fn === "cos" ? "à droite (ou à gauche) de la droite verticale" : "au-dessus (ou au-dessous) de la droite horizontale";
  return expl(
    `$\\${fn} x$ est ${fn === "cos" ? "l'abscisse" : "l'ordonnée"} du point du cercle associé à $x$.`,
    `on résout d'abord l'égalité $\\${fn} x = ${a}$, puis on repère l'arc ${axe} passant par ces points, en allant de $-\\pi$ à $\\pi$.`,
    `$\\${fn} x = ${a}$ a pour solutions ${ens(solutions(fn, v, PP))} sur $[-\\pi\\,;\\pi]$. On garde les points qui vérifient l'inégalité ; un crochet s'ouvre quand l'inégalité est stricte.`,
    `l'ensemble des solutions est ${ecrire(solIneq(fn, v, s))}.`,
  );
}
const PP_L = "$[-\\pi\\,;\\pi]$";
const questIn = (eq: string, fin: string) =>
  un([`Résous sur ${PP_L} : $${eq}$.`, `Sur ${PP_L}, quelles sont les solutions de $${eq}$ ?`, `Quel est l'ensemble des solutions, sur ${PP_L}, de $${eq}$ ?`, `Dans ${PP_L}, on cherche les $x$ tels que $${eq}$. Quel est cet ensemble ?`, `Détermine sur ${PP_L} l'ensemble des réels vérifiant $${eq}$.`]) + fin;

/* ───────────────── étude de fonctions ───────────────── */

type Etude = { f: string; fp: string; lo: string; hi: string; x: string; kind: "maximum" | "minimum"; v: Terme[]; cle: string };
const ko = (k: number, s: string) => (k === 1 ? s : `${k}${s}`);
function etude(): Etude {
  const k = un([1, 1, 2, 3, 4, 5]);
  const c = un([-3, -2, -1, 1, 2, 3]);
  const plus = (s: string) => (c > 0 ? `${s} + ${c}` : `${s} - ${-c}`);
  return un<Etude>([
    { f: `${ko(k, "\\sin x")} + ${ko(k, "\\cos x")}`, fp: `${ko(k, "\\cos x")} - ${ko(k, "\\sin x")}`, lo: "0", hi: "\\pi", x: "\\dfrac{\\pi}{4}", kind: "maximum", v: [T(k, 1, "\\sqrt{2}")], cle: "$\\cos x = \\sin x$ sur $[0\\,;\\pi]$ seulement en $\\dfrac{\\pi}{4}$" },
    { f: "x + 2\\cos x", fp: "1 - 2\\sin x", lo: "0", hi: "\\dfrac{\\pi}{2}", x: "\\dfrac{\\pi}{6}", kind: "maximum", v: [T(1, 6, "\\pi"), T(1, 1, "\\sqrt{3}")], cle: "$\\sin x = \\dfrac{1}{2}$ en $\\dfrac{\\pi}{6}$" },
    { f: "x - 2\\sin x", fp: "1 - 2\\cos x", lo: "0", hi: "\\pi", x: "\\dfrac{\\pi}{3}", kind: "minimum", v: [T(1, 3, "\\pi"), T(-1, 1, "\\sqrt{3}")], cle: "$\\cos x = \\dfrac{1}{2}$ en $\\dfrac{\\pi}{3}$" },
    { f: "x + 2\\sin x", fp: "1 + 2\\cos x", lo: "0", hi: "\\pi", x: "\\dfrac{2\\pi}{3}", kind: "maximum", v: [T(2, 3, "\\pi"), T(1, 1, "\\sqrt{3}")], cle: "$\\cos x = -\\dfrac{1}{2}$ en $\\dfrac{2\\pi}{3}$" },
    { f: ko(k, "e^{-x}\\sin x"), fp: `${ko(k, "e^{-x}")}(\\cos x - \\sin x)`, lo: "0", hi: "\\pi", x: "\\dfrac{\\pi}{4}", kind: "maximum", v: [T(k, 2, "\\sqrt{2}e^{-\\dfrac{\\pi}{4}}")], cle: "$e^{-x} > 0$ et $\\cos x = \\sin x$ en $\\dfrac{\\pi}{4}$" },
    { f: ko(k, "e^{x}\\cos x"), fp: `${ko(k, "e^{x}")}(\\cos x - \\sin x)`, lo: "0", hi: "\\pi", x: "\\dfrac{\\pi}{4}", kind: "maximum", v: [T(k, 2, "\\sqrt{2}e^{\\dfrac{\\pi}{4}}")], cle: "$e^{x} > 0$ et $\\cos x = \\sin x$ en $\\dfrac{\\pi}{4}$" },
    { f: ko(k, "\\sin(2x)"), fp: `${2 * k}\\cos(2x)`, lo: "0", hi: "\\dfrac{\\pi}{2}", x: "\\dfrac{\\pi}{4}", kind: "maximum", v: [T(k, 1)], cle: "$\\cos(2x) = 0$ en $\\dfrac{\\pi}{4}$" },
    { f: plus(ko(k, "\\cos(2x)")), fp: `-${2 * k}\\sin(2x)`, lo: "0", hi: "\\pi", x: "\\dfrac{\\pi}{2}", kind: "minimum", v: [T(c - k, 1)], cle: "$\\sin(2x) = 0$ en $\\dfrac{\\pi}{2}$ à l'intérieur de l'intervalle" },
    { f: plus(ko(k, "\\sin x")), fp: ko(k, "\\cos x"), lo: "0", hi: "\\pi", x: "\\dfrac{\\pi}{2}", kind: "maximum", v: [T(k + c, 1)], cle: "$\\cos x = 0$ en $\\dfrac{\\pi}{2}$" },
    { f: plus(ko(k, "\\cos x")), fp: `-${ko(k, "\\sin x")}`, lo: "-\\pi", hi: "\\pi", x: "0", kind: "maximum", v: [T(k + c, 1)], cle: "$\\sin x = 0$ en $0$ à l'intérieur de l'intervalle" },
    { f: `${ko(k, "\\sqrt{3}\\sin x")} + ${ko(k, "\\cos x")}`, fp: `${ko(k, "\\sqrt{3}\\cos x")} - ${ko(k, "\\sin x")}`, lo: "0", hi: "\\pi", x: "\\dfrac{\\pi}{3}", kind: "maximum", v: [T(2 * k, 1)], cle: "$\\sqrt{3}\\cos x = \\sin x$ en $\\dfrac{\\pi}{3}$" },
    { f: `${ko(k, "\\sin x")} - ${ko(k, "\\sqrt{3}\\cos x")}`, fp: `${ko(k, "\\cos x")} + ${ko(k, "\\sqrt{3}\\sin x")}`, lo: "0", hi: "\\pi", x: "\\dfrac{5\\pi}{6}", kind: "maximum", v: [T(2 * k, 1)], cle: "$\\cos x = -\\sqrt{3}\\sin x$ en $\\dfrac{5\\pi}{6}$" },
    { f: "2\\sin x + \\sin(2x)", fp: "2\\cos x + 2\\cos(2x)", lo: "0", hi: "\\pi", x: "\\dfrac{\\pi}{3}", kind: "maximum", v: [T(3, 2, "\\sqrt{3}")], cle: "$2\\cos x + 2\\cos(2x) = 2(2\\cos x - 1)(\\cos x + 1)$ s'annule en $\\dfrac{\\pi}{3}$" },
  ]);
}
const nomF = () => un(["f", "g", "h"]);
const explEtude = (e: Etude, nom: string, fin: string) =>
  expl(
    "$(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$, et $(\\sin(ax+b))' = a\\cos(ax+b)$.",
    "on dérive, on étudie le signe de la dérivée sur l'intervalle, puis on compare les valeurs.",
    `$${nom}'(x) = ${e.fp}$ ; ${e.cle}. La fonction atteint son ${e.kind} sur $[${e.lo}\\,;${e.hi}]$ en $x = ${e.x}$.`,
    fin,
  );
const piegesDerivee = (fp: string) => [
  fp.replace(/\\sin|\\cos/g, (m) => (m === "\\sin" ? "\\cos" : "\\sin")),
  fp.startsWith("-") ? fp.slice(1) : `-${/[+-]/.test(fp) ? `(${fp})` : fp}`,
  /-/.test(fp.slice(1)) ? fp.replace(/(?<=.) - /, " + ") : /\+/.test(fp) ? fp.replace(" + ", " - ") : `${fp} + 1`,
  fp.replace(/\\sin|\\cos/g, (m) => (m === "\\sin" ? "\\cos" : "\\sin")).replace(/(?<=.) - /, " + "),
  `${fp} + x`,
];

export const sinusCosinusBank: TutorBankItemV4[] = [
  /* ===== trigo_equation_cos ===== */
  tpl("trigo_equation_cos", 1, 1, "Cherche sur le cercle les points qui ont la bonne abscisse.", () => {
    const v = un(VALS);
    const I = un(INTERVALLES);
    const sol = solutions("cos", v, I);
    const eq = formeEq("cos", v, true);
    return qcm(phrase([`Sur $${I.l}$, résous $${eq}$.`, `Résous dans $${I.l}$ l'équation $${eq}$.`, `Quelles sont les solutions de $${eq}$ sur $${I.l}$ ?`, `On cherche $x$ dans $${I.l}$ tel que $${eq}$.`], ["", "Aide-toi du cercle.", "Lis le cercle trigonométrique.", "Quel est l'ensemble des solutions ?"]), ens(sol), piegesEq("cos", v, I, sol), explEq("cos", v, I, sol), circle());
  }),
  tpl("trigo_equation_cos", 2, 1, "Cherche sur le cercle les points qui ont la bonne ordonnée.", () => {
    const v = un(VALS);
    const I = un(INTERVALLES);
    const sol = solutions("sin", v, I);
    const eq = formeEq("sin", v, true);
    return qcm(phrase([`Sur $${I.l}$, résous $${eq}$.`, `Résous dans $${I.l}$ l'équation $${eq}$.`, `Quelles sont les solutions de $${eq}$ sur $${I.l}$ ?`, `On cherche $x$ dans $${I.l}$ tel que $${eq}$.`], ["", "Aide-toi du cercle.", "Lis le cercle trigonométrique.", "Quel est l'ensemble des solutions ?"]), ens(sol), piegesEq("sin", v, I, sol), explEq("sin", v, I, sol), circle());
  }),
  tpl("trigo_equation_cos", 3, 2, "Isole d'abord cos x ou sin x, puis lis le cercle.", () => {
    const fn = un<Fn>(["cos", "sin"]);
    const v = un([...VALS, UN, MOINS_UN]);
    const I = un(INTERVALLES);
    const sol = solutions(fn, v, I);
    const eq = formeEq(fn, v);
    return qcm(un([`Résous dans $${I.l}$ : $${eq}$.`, `Quel est l'ensemble des solutions, sur $${I.l}$, de $${eq}$ ?`, `On travaille sur $${I.l}$. Résous $${eq}$.`, `On travaille sur $${I.l}$. Résous l'équation $${eq}$.`, `Quelles sont les solutions dans $${I.l}$ de $${eq}$ ?`, `Quelles sont les solutions dans $${I.l}$ de l'équation $${eq}$ ?`, `Sur $${I.l}$, quelles valeurs de $x$ vérifient $${eq}$ ?`]), ens(sol), piegesEq(fn, v, I, sol), explEq(fn, v, I, sol));
  }),
  tpl("trigo_equation_cos", 4, 2, "Un cosinus et un sinus restent entre −1 et 1. À l'intérieur, regarde le cercle.", () => {
    const fn = un<Fn>(["cos", "sin"]);
    const a = un([0.3, 0.4, 0.6, 0.7, 0.9, 0.25, -0.3, -0.4, -0.6, -0.8, 1.2, 1.5, -1.3, 2]);
    const I = fn === "cos" ? un(["[-\\pi\\,;\\pi]", "[0\\,;\\pi]"]) : un(["[-\\pi\\,;\\pi]", "\\left[-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right]"]);
    const dehors = Math.abs(a) > 1;
    const n = dehors ? 0 : I.startsWith("[-\\pi") ? 2 : 1;
    const eq = `\\${fn} x = ${nL(a)}`;
    return court(
      phrase([`Combien l'équation $${eq}$ a-t-elle de solutions sur $${I}$ ?`, `Sur $${I}$, quel est le nombre de solutions de $${eq}$ ?`, `Sans calculer les valeurs, combien de réels de $${I}$ vérifient $${eq}$ ?`, `Compte les solutions de $${eq}$ dans $${I}$.`], ["", "Réponds par un nombre.", "Aide-toi du cercle ou de la courbe."]),
      n,
      expl(`$\\${fn} x$ est toujours compris entre $-1$ et $1$.`, "on compare $a$ à $-1$ et $1$, puis on compte les points du cercle sur l'intervalle.", dehors ? `$${nL(a)}$ est en dehors de $[-1\\,;1]$.` : `$${nL(a)}$ est dans $]-1\\,;1[$ : ${n === 2 ? "deux points du cercle conviennent" : `sur cet intervalle, $\\${fn}$ est strictement monotone, un seul réel convient`}.`, `il y a ${n} solution${n > 1 ? "s" : ""}.`),
    );
  }),
  tpl("trigo_equation_cos", 5, 3, "Trouve toutes les solutions, puis garde celle qui est demandée.", () => {
    const fn = un<Fn>(["cos", "sin"]);
    const v = un(VALS.filter((w) => w.r !== "0"));
    const I = INTERVALLES[0];
    const sol = solutions(fn, v, I);
    const quelle = un(["petite", "grande"]);
    const r = quelle === "petite" ? sol[0] : sol[sol.length - 1];
    const eq = formeEq(fn, v);
    const faux = [...new Set([...sol, ...solutions(fn === "cos" ? "sin" : "cos", v, I), -r, r + 12, r - 12, 12 - r, r + 6, r - 6, r + 4, r - 4])].filter((t) => t !== r && Math.abs(t) <= 12);
    return qcm(
      phrase([`Quelle est la plus ${quelle} solution de $${eq}$ sur $${I.l}$ ?`, `Sur $${I.l}$, l'équation $${eq}$ a pour plus ${quelle} solution :`, `Parmi les solutions de $${eq}$ dans $${I.l}$, laquelle est la plus ${quelle} ?`], ["", "(Valeur exacte.)", "Une seule proposition convient."]),
      `$${piSur12(r)}$`,
      faux.map((t) => `$${piSur12(t)}$`),
      explEq(fn, v, I, sol),
    );
  }),
  tpl("trigo_equation_cos", 6, 3, "Le contexte se ramène à une équation : résous-la sur le cercle.", () => {
    const fn = un<Fn>(["cos", "sin"]);
    const v = un(VALS);
    const I = PP;
    const sol = solutions(fn, v, I);
    const eq = formeEq(fn, v);
    return qcm(
      `${un(CTX_EQ)} suit un modèle en fonction de $x$. L'instant ou la position cherchés vérifient $${eq}$, avec $x$ dans $${I.l}$. ${un(["Quelles sont les valeurs possibles de $x$ ?", "Quelles valeurs de $x$ conviennent ?", "Résous cette équation.", "Quel est l'ensemble des solutions ?"])}`,
      ens(sol),
      piegesEq(fn, v, I, sol),
      explEq(fn, v, I, sol),
    );
  }),

  /* ===== trigo_inequation_cos ===== */
  tpl("trigo_inequation_cos", 1, 1, "Résous l'égalité, puis garde l'arc de droite du cercle.", () => {
    const v = un(VALS_INEQ_COS);
    const s: Sens = "\\geq";
    const eq = formeIneq("cos", v, s, true);
    return qcm(questIn(eq, un(["", " Aide-toi du cercle.", " Lis le cercle trigonométrique."])), ecrire(solIneq("cos", v, s)), piegesIneq("cos", v, s), explIneq("cos", v, s), circle());
  }),
  tpl("trigo_inequation_cos", 2, 1, "Résous l'égalité, puis garde l'arc de gauche du cercle.", () => {
    const v = un(VALS_INEQ_COS);
    const s: Sens = "\\leq";
    const eq = formeIneq("cos", v, s, true);
    return qcm(questIn(eq, un(["", " Aide-toi du cercle.", " Lis le cercle trigonométrique."])), ecrire(solIneq("cos", v, s)), piegesIneq("cos", v, s), explIneq("cos", v, s), circle());
  }),
  tpl("trigo_inequation_cos", 3, 2, "Pour le sinus, on regarde au-dessus ou au-dessous d'une droite horizontale.", () => {
    const v = un(VALS_INEQ_SIN);
    const s = un<Sens>(["\\geq", "\\leq"]);
    const eq = formeIneq("sin", v, s, true);
    return qcm(questIn(eq, un(["", " Attention aux bornes.", " La solution peut être en deux morceaux."])), ecrire(solIneq("sin", v, s)), piegesIneq("sin", v, s), explIneq("sin", v, s));
  }),
  tpl("trigo_inequation_cos", 4, 2, "Isole cos x ou sin x. Une inégalité stricte exclut les bornes.", () => {
    const fn = un<Fn>(["cos", "sin"]);
    const v = un(fn === "cos" ? VALS_INEQ_COS : VALS_INEQ_SIN);
    const s = un<Sens>(["\\geq", "\\leq", ">", "<"]);
    const eq = formeIneq(fn, v, s, false);
    return qcm(questIn(eq, un(["", " Fais attention aux crochets.", ` Commence par isoler $\\${fn} x$.`])), ecrire(solIneq(fn, v, s)), piegesIneq(fn, v, s), explIneq(fn, v, s));
  }),
  tpl("trigo_inequation_cos", 5, 3, "Traduis la condition en inéquation, puis lis le cercle.", () => {
    const fn = un<Fn>(["cos", "sin"]);
    const v = un(fn === "cos" ? VALS_INEQ_COS : VALS_INEQ_SIN);
    const s = un<Sens>(["\\geq", "\\leq"]);
    const eq = formeIneq(fn, v, s, false);
    return qcm(
      `${un(CTX_EQ)} ${un(["doit rester dans une zone sûre", "doit respecter un seuil", "déclenche une alarme au-delà d'un seuil"])}. Cela se traduit par $${eq}$, avec $x$ dans $[-\\pi\\,;\\pi]$. ${un(["Quelles valeurs de $x$ conviennent ?", "Sur quel ensemble la condition est-elle vraie ?", "Résous cette inéquation."])}`,
      ecrire(solIneq(fn, v, s)),
      piegesIneq(fn, v, s),
      explIneq(fn, v, s),
    );
  }),
  tpl("trigo_inequation_cos", 6, 3, "Résous, puis additionne les longueurs des intervalles.", () => {
    const fn = un<Fn>(["cos", "sin"]);
    const v = un(fn === "cos" ? VALS_INEQ_COS : VALS_INEQ_SIN);
    const s = un<Sens>(["\\geq", "\\leq"]);
    const m = solIneq(fn, v, s);
    const L = m.reduce((t, x) => t + x.b - x.a, 0);
    const eq = formeIneq(fn, v, s, true);
    const faux = [24 - L, L + 2, L - 2, L + 4, L / 2].filter((t) => t > 0 && t !== L && Number.isInteger(t));
    return qcm(
      phrase([`Sur $[-\\pi\\,;\\pi]$, l'ensemble des solutions de $${eq}$ a pour longueur totale :`, `Quelle est la longueur totale de l'ensemble des solutions de $${eq}$ dans $[-\\pi\\,;\\pi]$ ?`, `Sur un tour, de $-\\pi$ à $\\pi$, quelle longueur d'angle vérifie $${eq}$ ?`, `Sur $[-\\pi\\,;\\pi]$, on résout $${eq}$. Quelle est la longueur totale des intervalles obtenus ?`], ["", "(Additionne si la solution est en deux morceaux.)"]),
      `$${piSur12(L)}$`,
      faux.map((t) => `$${piSur12(t)}$`),
      explIneq(fn, v, s),
    );
  }),

  /* ===== trigo_etude_fonction ===== */
  tpl("trigo_etude_fonction", 1, 1, "(sin x)' = cos x et (cos x)' = −sin x.", () => {
    const e = etude();
    const nom = nomF();
    return qcm(
      phrase([`Soit $${nom}(x) = ${e.f}$.`, `On étudie $${nom}(x) = ${e.f}$.`, `La fonction $${nom}$ est définie par $${nom}(x) = ${e.f}$.`], [`Que vaut $${nom}'(x)$ ?`, `Quelle est sa dérivée ?`, `Quelle expression donne $${nom}'(x)$ ?`, `Dérive cette fonction.`, `Sa dérivée s'écrit :`, `Choisis $${nom}'(x)$.`]),
      `$${e.fp}$`,
      piegesDerivee(e.fp).map((x) => `$${x}$`),
      expl("$(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$, $(uv)' = u'v + uv'$, $(\\sin(ax))' = a\\cos(ax)$.", "on dérive terme à terme, et on applique la formule du produit s'il y en a un.", `on obtient $${nom}'(x) = ${e.fp}$.`, `la dérivée est $${e.fp}$.`),
    );
  }),
  tpl("trigo_etude_fonction", 2, 1, "Regarde la courbe de la fonction, ou la dérivée, sur cet intervalle.", () => {
    const fn = un<Fn>(["cos", "sin"]);
    const I = un([
      ["0", "\\dfrac{\\pi}{2}"],
      ["\\dfrac{\\pi}{2}", "\\pi"],
      ["-\\pi", "0"],
      ["0", "\\pi"],
      ["-\\dfrac{\\pi}{2}", "\\dfrac{\\pi}{2}"],
      ["-\\pi", "-\\dfrac{\\pi}{2}"],
      ["-\\dfrac{\\pi}{2}", "0"],
    ]);
    const val = (l: string) => {
      const s = l.startsWith("-") ? -1 : 1;
      const c = l.replace("-", "");
      return s * (c === "0" ? 0 : c === "\\pi" ? Math.PI : Math.PI / 2);
    };
    const f = fn === "cos" ? Math.cos : Math.sin;
    const [a, b] = [val(I[0]), val(I[1])];
    const milieu: number[] = [0.25, 0.5, 0.75].map((r) => f(a + r * (b - a)));
    const seq = [f(a), ...milieu, f(b)];
    const crois = seq.every((y, i) => i === 0 || y > seq[i - 1]);
    const decr = seq.every((y, i) => i === 0 || y < seq[i - 1]);
    const juste = crois ? "strictement croissante" : decr ? "strictement décroissante" : "ni croissante ni décroissante sur tout l'intervalle";
    return qcm(
      phrase([`Sur $[${I[0]}\\,;${I[1]}]$, la fonction $\\${fn}$ est :`, `Quel est le sens de variation de $\\${fn}$ sur $[${I[0]}\\,;${I[1]}]$ ?`, `On regarde $x \\mapsto \\${fn} x$ sur $[${I[0]}\\,;${I[1]}]$. Elle est :`, `Comment varie $\\${fn} x$ quand $x$ parcourt $[${I[0]}\\,;${I[1]}]$ ?`], ["", "(Pense au signe de sa dérivée.)"]),
      juste,
      ["strictement croissante", "strictement décroissante", "ni croissante ni décroissante sur tout l'intervalle", "constante"],
      expl(`$(\\${fn} x)' = ${fn === "cos" ? "-\\sin x" : "\\cos x"}$.`, "on étudie le signe de la dérivée sur l'intervalle.", `la dérivée ${crois ? "est positive" : decr ? "est négative" : "change de signe"} à l'intérieur de l'intervalle.`, `la fonction est ${juste}.`),
    );
  }),
  tpl("trigo_etude_fonction", 3, 2, "−1 ≤ sin x ≤ 1 et −1 ≤ cos x ≤ 1 : déduis-en le signe de la dérivée.", () => {
    const k = entre(1, 4);
    const nom = nomF();
    const c = un([
      { f: `${ko(k, "x")} + \\cos x`, fp: `${k} - \\sin x`, s: 1 },
      { f: `${ko(k, "x")} - \\cos x`, fp: `${k} + \\sin x`, s: 1 },
      { f: `${ko(k, "x")} + \\sin x`, fp: `${k} + \\cos x`, s: 1 },
      { f: `${ko(k, "x")} - \\sin x`, fp: `${k} - \\cos x`, s: 1 },
      { f: `-${ko(k, "x")} + \\cos x`, fp: `-${k} - \\sin x`, s: -1 },
      { f: `-${ko(k, "x")} + \\sin x`, fp: `-${k} + \\cos x`, s: -1 },
      { f: `\\cos x - ${ko(k, "x")}`, fp: `-\\sin x - ${k}`, s: -1 },
      { f: `\\sin x - ${ko(k, "x")}`, fp: `\\cos x - ${k}`, s: -1 },
    ]);
    const j = c.s > 0 ? "croissante" : "décroissante";
    return qcm(
      phrase([`Soit $${nom}(x) = ${c.f}$ sur $\\mathbb{R}$.`, `On considère $${nom}(x) = ${c.f}$ pour tout réel $x$.`, `La fonction $${nom}$ vérifie $${nom}(x) = ${c.f}$ sur $\\mathbb{R}$.`], ["Quel est son sens de variation ?", "Elle est :", "Comment varie-t-elle ?", "Étudie le signe de sa dérivée : la fonction est", "Que peut-on dire de ses variations ?"]),
      `${j} sur $\\mathbb{R}$`,
      [`${c.s > 0 ? "décroissante" : "croissante"} sur $\\mathbb{R}$`, "croissante puis décroissante", "décroissante puis croissante", "constante sur $\\mathbb{R}$"],
      expl("le signe de la dérivée donne le sens de variation.", "on dérive, puis on encadre le sinus ou le cosinus entre $-1$ et $1$.", `$${nom}'(x) = ${c.fp}$, de signe ${c.s > 0 ? "positif" : "négatif"} (au sens large) sur $\\mathbb{R}$, car le sinus et le cosinus restent entre $-1$ et $1$.`, `$${nom}$ est ${j} sur $\\mathbb{R}$.`),
    );
  }),
  tpl("trigo_etude_fonction", 4, 2, "Annule la dérivée sur l'intervalle, puis regarde son signe de part et d'autre.", () => {
    const e = etude();
    const nom = nomF();
    const cand = ["0", "\\dfrac{\\pi}{6}", "\\dfrac{\\pi}{4}", "\\dfrac{\\pi}{3}", "\\dfrac{\\pi}{2}", "\\dfrac{2\\pi}{3}", "\\dfrac{5\\pi}{6}"].filter((x) => x !== e.x);
    return qcm(
      phrase([`Soit $${nom}(x) = ${e.f}$ sur $[${e.lo}\\,;${e.hi}]$.`, `On étudie $${nom}(x) = ${e.f}$ sur $[${e.lo}\\,;${e.hi}]$.`], [`En quelle valeur $${nom}$ atteint-elle son ${e.kind} ?`, `Pour quelle valeur de $x$ le ${e.kind} est-il atteint ?`, `Où se situe son ${e.kind} ?`, `Son ${e.kind} est atteint en :`, `Quelle valeur de $x$ donne le ${e.kind} de $${nom}$ ?`]),
      `$x = ${e.x}$`,
      cand.map((x) => `$x = ${x}$`),
      explEtude(e, nom, `le ${e.kind} est atteint en $x = ${e.x}$.`),
    );
  }),
  tpl("trigo_etude_fonction", 5, 3, "Dérive, trouve où la dérivée s'annule, puis calcule la valeur de la fonction.", () => {
    const e = etude();
    const nom = nomF();
    const v = somme(e.v);
    return qcm(
      phrase([`Soit $${nom}(x) = ${e.f}$ sur $[${e.lo}\\,;${e.hi}]$.`, `On étudie $${nom}(x) = ${e.f}$ sur $[${e.lo}\\,;${e.hi}]$.`, `La fonction $${nom}(x) = ${e.f}$ est définie sur $[${e.lo}\\,;${e.hi}]$.`], [`Quel est son ${e.kind} ?`, `Que vaut son ${e.kind} ?`, `Détermine son ${e.kind}.`, `Valeur exacte de son ${e.kind} :`]),
      `$${v}$`,
      fauxExacts(e.v).map((x) => `$${x}$`),
      explEtude(e, nom, `le ${e.kind} vaut $${v}$.`),
    );
  }),
  tpl("trigo_etude_fonction", 6, 3, "Reconnais une recherche d'extremum : dérivée, signe, valeur.", () => {
    const e = etude();
    const v = somme(e.v);
    const ctx = un(CTX_EQ);
    return qcm(
      `${ctx} suit le modèle $f(x) = ${e.f}$ sur $[${e.lo}\\,;${e.hi}]$. ${e.kind === "maximum" ? un(["Quelle est la plus grande valeur atteinte ?", "Quelle valeur maximale le modèle prévoit-il ?", "Quel est le pic atteint ?"]) : un(["Quelle est la plus petite valeur atteinte ?", "Quelle valeur minimale le modèle prévoit-il ?", "Quel est le creux atteint ?"])}`,
      `$${v}$`,
      fauxExacts(e.v).map((x) => `$${x}$`),
      explEtude(e, "f", `la valeur cherchée est $${v}$.`),
    );
  }),

  /* ===== trigo_primitives ===== */
  tpl("trigo_primitives", 1, 1, "Une primitive de sin(ax+b) est −(1/a)cos(ax+b) ; de cos(ax+b), (1/a)sin(ax+b).", () => {
    const fn = un<Fn>(["cos", "sin"]);
    const a = un([1, 1, 2, 3, 4, 5]);
    const b = un([0, 0, 1, -1, 2]);
    const k = un([1, 1, 2, 3, 6]);
    const arg = a === 1 && b === 0 ? " x" : `(${lin(a, b)})`;
    const f = somme([T(k, 1, `\\${fn}${arg}`)]);
    const G = fn === "cos" ? "sin" : "cos";
    const F = [T(fn === "cos" ? k : -k, a, `\\${G}${arg}`)];
    return qcm(
      phrase([`Une primitive de $x \\mapsto ${f}$ est :`, `Parmi ces fonctions, laquelle est une primitive de $x \\mapsto ${f}$ ?`, `On cherche $F$ avec $F'(x) = ${f}$ :`, `Primitive de $x \\mapsto ${f}$ :`], ["", "(Tu peux vérifier en dérivant.)"]),
      `$${somme(F)}$`,
      [...fauxPrimitives(F).map((x) => `$${x}$`), `$${somme([T(k, 1, `\\${G}${arg}`)])}$`, `$${somme([T(-k, 1, `\\${fn}${arg}`)])}$`],
      expl("$F$ est une primitive de $f$ si $F' = f$.", `une primitive de $\\${fn}(ax+b)$ est $${fn === "cos" ? "" : "-"}\\dfrac{1}{a}\\${G}(ax+b)$.`, `ici $a = ${a}$ et le coefficient devant vaut $${k}$.`, `une primitive est $${somme(F)}$.`),
    );
  }),
  tpl("trigo_primitives", 2, 2, "Primitive, puis F(b) − F(a).", () => {
    const fn = un<Fn>(["cos", "sin"]);
    const a = un([1, 1, 2, 3, 4]);
    const k = un([1, 2, 3, 4, 6]);
    const arg = a === 1 ? " x" : `(${a}x)`;
    const f = somme([T(k, 1, `\\${fn}${arg}`)]);
    const d = fn === "sin" ? a : 2 * a;
    const b = d === 1 ? "\\pi" : `\\dfrac{\\pi}{${d}}`;
    const v = fn === "sin" ? [T(2 * k, a)] : [T(k, a)];
    const I = `\\int_{0}^{${b}} ${f}\\,\\mathrm{d}x`;
    return qcm(
      un([`Calcule $${I}$.`, `Que vaut $${I}$ ?`, `Quelle est la valeur exacte de $${I}$ ?`, `Donne la valeur de $${I}$.`, `On intègre : $${I}$ est égal à :`]),
      `$${somme(v)}$`,
      [...fauxExacts(v), somme([T(k, 1)]), somme([T(k * 2, 1)]), "0"].map((x) => `$${x}$`),
      expl("$\\int_a^b f(x)\\,\\mathrm{d}x = F(b) - F(a)$.", `on prend pour primitive $${fn === "cos" ? "" : "-"}\\dfrac{${k}}{${a}}\\${fn === "cos" ? "sin" : "cos"}${arg}$.`, `on remplace $x$ par $${b}$ puis par $0$.`, `l'intégrale vaut $${somme(v)}$.`),
    );
  }),
  tpl("trigo_primitives", 3, 2, "Écris toutes les primitives avec une constante C, puis utilise la condition.", () => {
    const fn = un<Fn>(["cos", "sin"]);
    const k = un([1, 2, 3, 4, 5]);
    const c = un([-3, -2, -1, 1, 2, 3, 4]);
    const nom = un(["F", "G", "H"]);
    const f = somme([T(k, 1, `\\${fn} x`)]);
    const juste = fn === "cos" ? somme([T(k, 1, "\\sin x"), T(c, 1)]) : somme([T(-k, 1, "\\cos x"), T(k + c, 1)]);
    const faux = fn === "cos" ? [somme([T(-k, 1, "\\sin x"), T(c, 1)]), somme([T(k, 1, "\\cos x"), T(c, 1)]), somme([T(k, 1, "\\sin x"), T(c + 1, 1)]), somme([T(k, 1, "\\sin x"), T(-c, 1)])] : [somme([T(-k, 1, "\\cos x"), T(c, 1)]), somme([T(k, 1, "\\cos x"), T(c, 1)]), somme([T(k, 1, "\\sin x"), T(c, 1)]), somme([T(-k, 1, "\\cos x"), T(c - k, 1)])];
    return qcm(
      phrase([`Quelle est la primitive $${nom}$ de $x \\mapsto ${f}$ telle que $${nom}(0) = ${c}$ ?`, `On cherche la primitive $${nom}$ de $x \\mapsto ${f}$ vérifiant $${nom}(0) = ${c}$.`, `Quelle est la primitive $${nom}$ de $x \\mapsto ${f}$ qui prend la valeur $${c}$ en $0$ ?`], ["", "Choisis la bonne expression."]),
      `$${nom}(x) = ${juste}$`,
      faux.map((x) => `$${nom}(x) = ${x}$`),
      expl("deux primitives d'une même fonction diffèrent d'une constante.", `on écrit $${nom}(x) = ${fn === "cos" ? somme([T(k, 1, "\\sin x")]) : somme([T(-k, 1, "\\cos x")])} + C$, puis on remplace $x$ par $0$.`, `$${nom}(0) = ${fn === "cos" ? "0" : -k} + C = ${c}$.`, `$${nom}(x) = ${juste}$.`),
    );
  }),
  tpl("trigo_primitives", 4, 3, "Valeur moyenne = intégrale divisée par la longueur de l'intervalle.", () => {
    const k = un([2, 3, 4, 5, 6, 10, 12]);
    const ctx = un(["La tension redressée d'un chargeur", "Le courant dans une bobine", "Le débit d'un jet d'eau pulsé", "La puissance d'un panneau solaire au fil de la journée", "La hauteur d'une vague sur une demi-période", "Le son d'une enceinte sur une demi-période", "La force exercée par un piston", "La lumière reçue par un capteur"]);
    const unite = un(["sur $[0\\,;\\pi]$", "pour $x$ dans $[0\\,;\\pi]$"]);
    return qcm(
      `${ctx} suit le modèle $f(x) = ${k}\\sin x$ ${unite}. ${un(["Quelle est sa valeur moyenne ?", "Quelle valeur moyenne le modèle donne-t-il ?", "Calcule sa valeur moyenne exacte."])}`,
      `$\\dfrac{${2 * k}}{\\pi}$`,
      [`$\\dfrac{${k}}{\\pi}$`, `$${2 * k}$`, `$${k}\\pi$`, `$${somme([T(k, 2)])}$`, "$0$"],
      expl("la valeur moyenne de $f$ sur $[a\\,;b]$ est $\\dfrac{1}{b-a}\\int_a^b f(x)\\,\\mathrm{d}x$.", "on primitive $\\sin x$ en $-\\cos x$.", `$\\int_0^{\\pi} ${k}\\sin x\\,\\mathrm{d}x = ${k}(1 + 1) = ${2 * k}$, puis on divise par $\\pi$.`, `la valeur moyenne est $\\dfrac{${2 * k}}{\\pi}$.`),
    );
  }),
  tpl("trigo_primitives", 5, 3, "Utilise l'égalité donnée pour remplacer le carré, puis primitive.", () => {
    const k = un([1, 2, 3, 4, 6]);
    const fn = un<Fn>(["cos", "sin"]);
    const signe = fn === "cos" ? "+" : "-";
    const b = un([{ l: "\\pi", v: [T(k, 2, "\\pi")] }, { l: "\\dfrac{\\pi}{2}", v: [T(k, 4, "\\pi")] }, { l: "2\\pi", v: [T(k, 1, "\\pi")] }]);
    const kk = k === 1 ? "" : String(k);
    const I = `\\int_{0}^{${b.l}} ${kk}(\\${fn} x)^{2}\\,\\mathrm{d}x`;
    return qcm(
      `${un(["On admet que", "On rappelle que", "On sait que"])} $(\\${fn} x)^{2} = \\dfrac{1 ${signe} \\cos(2x)}{2}$. ${un([`Calcule $${I}$.`, `Que vaut $${I}$ ?`, `En déduire $${I}$.`, `Quelle est la valeur exacte de $${I}$ ?`])}`,
      `$${somme(b.v)}$`,
      [...fauxExacts(b.v), somme([T(2, 1, "\\pi")]), somme(b.v.map((t) => T(t.p, 2 * t.q, t.c)))].map((x) => `$${x}$`),
      expl("linéarité de l'intégrale.", "on intègre $\\dfrac{1}{2}$, puis le terme en $\\cos(2x)$ à part.", "sur l'intervalle, le terme en $\\cos(2x)$ a une intégrale nulle : il ne reste que $\\dfrac{1}{2}$ fois la longueur de l'intervalle.", `l'intégrale vaut $${somme(b.v)}$.`),
    );
  }),
];
