// ENCADRER UNE INTÉGRALE, SUITES D'INTÉGRALES (05/11/2026). Trous du programme :
// « Linéarité, positivité et intégration des inégalités » ; « Majorer (minorer) une
// intégrale à partir d'une majoration d'une fonction par une autre » ; « Étudier
// une suite d'intégrales, vérifiant éventuellement une relation de récurrence ».
// ⚠️ Les correcteurs relisent la fonction écrite et intègrent par Simpson.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { T, court, entre, expl, fabrique, fauxExacts, nL, phrase, plusC, qcm, somme, un, type Terme } from "../../lycee-commun";

const tpl = fabrique("terminale-spe", "primitive_integrale", "tle_");

const dx = "\\,\\mathrm{d}x";
const I_ = (a: string | number, b: string | number, f: string) => `\\int_{${a}}^{${b}} ${f}${dx}`;
const signe = (c: number, s: string, debut = false) => {
  const v = Math.abs(c) === 1 ? s : `${Math.abs(c)}${s}`;
  return debut ? (c < 0 ? `-${v}` : v) : c < 0 ? ` - ${v}` : ` + ${v}`;
};
const nomInt = () => un(["f", "g", "h"]);

/* ───── familles à variations connues : encadrement par les bornes ───── */
type Mono = { f: string; a: number; b: number; lo: Terme[]; hi: Terme[]; sens: "croissante" | "décroissante"; g: (x: number) => number };
function mono(): Mono {
  return un<Mono>([
    { f: "e^{-x^{2}}", a: 0, b: 1, lo: [T(1, 1, "e^{-1}")], hi: [T(1, 1)], sens: "décroissante", g: (x) => Math.exp(-x * x) },
    { f: "e^{-x^{2}}", a: 1, b: 2, lo: [T(1, 1, "e^{-4}")], hi: [T(1, 1, "e^{-1}")], sens: "décroissante", g: (x) => Math.exp(-x * x) },
    { f: "\\dfrac{1}{1+x^{2}}", a: 0, b: 1, lo: [T(1, 2)], hi: [T(1, 1)], sens: "décroissante", g: (x) => 1 / (1 + x * x) },
    { f: "\\dfrac{1}{1+x^{2}}", a: 1, b: 3, lo: [T(1, 5)], hi: [T(1, 1)], sens: "décroissante", g: (x) => 1 / (1 + x * x) },
    { f: "\\dfrac{1}{1+x^{2}}", a: 0, b: 2, lo: [T(2, 5)], hi: [T(2, 1)], sens: "décroissante", g: (x) => 1 / (1 + x * x) },
    { f: "\\dfrac{1}{x}", a: 1, b: 2, lo: [T(1, 2)], hi: [T(1, 1)], sens: "décroissante", g: (x) => 1 / x },
    { f: "\\dfrac{1}{x}", a: 1, b: 3, lo: [T(2, 3)], hi: [T(2, 1)], sens: "décroissante", g: (x) => 1 / x },
    { f: "\\dfrac{1}{x}", a: 2, b: 4, lo: [T(1, 2)], hi: [T(1, 1)], sens: "décroissante", g: (x) => 1 / x },
    { f: "e^{-x}", a: 0, b: 2, lo: [T(2, 1, "e^{-2}")], hi: [T(2, 1)], sens: "décroissante", g: (x) => Math.exp(-x) },
    { f: "e^{-x}", a: 1, b: 2, lo: [T(1, 1, "e^{-2}")], hi: [T(1, 1, "e^{-1}")], sens: "décroissante", g: (x) => Math.exp(-x) },
    { f: "\\sqrt{1+x^{2}}", a: 0, b: 1, lo: [T(1, 1)], hi: [T(1, 1, "\\sqrt{2}")], sens: "croissante", g: (x) => Math.sqrt(1 + x * x) },
    { f: "\\sqrt{1+x^{2}}", a: 0, b: 2, lo: [T(2, 1)], hi: [T(2, 1, "\\sqrt{5}")], sens: "croissante", g: (x) => Math.sqrt(1 + x * x) },
    { f: "\\ln x", a: 1, b: 3, lo: [T(0, 1)], hi: [T(2, 1, "\\ln 3")], sens: "croissante", g: Math.log },
    { f: "xe^{x}", a: 0, b: 1, lo: [T(0, 1)], hi: [T(1, 1, "e")], sens: "croissante", g: (x) => x * Math.exp(x) },
    { f: "e^{x^{2}}", a: 0, b: 1, lo: [T(1, 1)], hi: [T(1, 1, "e")], sens: "croissante", g: (x) => Math.exp(x * x) },
    { f: "\\sqrt{x}", a: 1, b: 4, lo: [T(3, 1)], hi: [T(6, 1)], sens: "croissante", g: Math.sqrt },
  ]);
}
const enc = (lo: string, x: string, hi: string) => `$${lo} \\leq ${x} \\leq ${hi}$`;

/* ───── comparaison de deux fonctions ───── */
type Comp = { f: string; g: string; a: number; b: number; gens: "majore" | "minore"; v: Terme[]; pourquoi: string };
function comparaison(): Comp {
  const b = un([2, 3, 4]);
  return un<Comp>([
    { f: "e^{-x^{2}}", g: "e^{-x}", a: 1, b, gens: "majore", v: [T(1, 1, "e^{-1}"), T(-1, 1, `e^{-${b}}`)], pourquoi: "pour $x \\geq 1$, $x^{2} \\geq x$, donc $-x^{2} \\leq -x$" },
    { f: "\\dfrac{1}{1+x^{2}}", g: "\\dfrac{1}{x^{2}}", a: 1, b, gens: "majore", v: [T(1, 1), T(-1, b)], pourquoi: "$1 + x^{2} \\geq x^{2}$, et l'inverse change le sens" },
    { f: "\\ln x", g: "x - 1", a: 1, b, gens: "majore", v: [T((b - 1) ** 2, 2)], pourquoi: "la courbe de $\\ln$ est sous sa tangente en $1$" },
    { f: "e^{x}", g: "1 + x", a: 0, b: un([1, 2]), gens: "minore", v: [], pourquoi: "la courbe de $\\exp$ est au-dessus de sa tangente en $0$" },
    { f: "\\sin x", g: "x", a: 0, b: un([1, 2, 3]), gens: "majore", v: [], pourquoi: "$\\sin x \\leq x$ pour $x \\geq 0$" },
    { f: "\\sqrt{1+x}", g: "1 + \\dfrac{x}{2}", a: 0, b: un([1, 2, 4]), gens: "majore", v: [], pourquoi: "$\\left(1 + \\dfrac{x}{2}\\right)^{2} = 1 + x + \\dfrac{x^{2}}{4} \\geq 1 + x$" },
  ]);
}
function valeurComp(c: Comp): Terme[] {
  if (c.v.length) return c.v;
  if (c.g === "1 + x") return [T(c.b, 1), T(c.b * c.b, 2)];
  if (c.g === "x") return [T(c.b * c.b, 2)];
  return [T(c.b, 1), T(c.b * c.b, 4)];
}

/* ───── suites d'intégrales ───── */
type Suite = {
  corps: string;
  a: string;
  b: string;
  debut: number;
  val: (n: number) => Terme[];
  sens: "décroissante" | "croissante";
  lim: string;
  limN: number | "inf";
  pourquoi: string;
  rel?: { juste: (L: string) => string; faux: (L: string) => string[]; ipp: string; depuis: (n: number) => string };
};
/** I_n = a·e + b pour x^n e^x et (ln x)^n : I_{n+1} = e − (n+1) I_n. */
function coefE(n: number): [number, number] {
  let a = 1;
  let b = -1;
  for (let k = 0; k < n; k++) [a, b] = [1 - (k + 1) * a, -(k + 1) * b];
  return [a, b];
}
/** I_n = a/e + b pour x^n e^(−x) : I_{n+1} = (n+1) I_n − 1/e. */
function coefEm(n: number): [number, number] {
  let a = -1;
  let b = 1;
  for (let k = 0; k < n; k++) [a, b] = [(k + 1) * a - 1, (k + 1) * b];
  return [a, b];
}
/** I_n = s ln 2 + p/q pour x^n/(1+x) : I_{n+1} = 1/(n+1) − I_n. */
function coefLn(n: number): [number, Terme] {
  let s = 1;
  let r = T(0, 1);
  for (let k = 0; k < n; k++) {
    s = -s;
    r = T(r.q - r.p * (k + 1), r.q * (k + 1));
  }
  return [s, r];
}
const REL_E = {
  juste: (L: string) => `${L}_{n+1} = e - (n+1)${L}_n`,
  faux: (L: string) => [`${L}_{n+1} = e + (n+1)${L}_n`, `${L}_{n+1} = e - n${L}_n`, `${L}_{n+1} = 1 - (n+1)${L}_n`, `${L}_{n+1} = (n+1)${L}_n - e`],
};
function suite(): Suite {
  return un<Suite>([
    { corps: "x^{n}", a: "0", b: "1", debut: 0, val: (n) => [T(1, n + 1)], sens: "décroissante", lim: "0", limN: 0, pourquoi: "sur $[0\\,;1]$, $x^{n+1} \\leq x^{n}$" },
    { corps: "e^{-nx}", a: "0", b: "1", debut: 1, val: (n) => [T(1, n), T(-1, n, `e^{-${n}}`)], sens: "décroissante", lim: "0", limN: 0, pourquoi: "sur $[0\\,;1]$, $e^{-(n+1)x} \\leq e^{-nx}$" },
    { corps: "x^{n}e^{x}", a: "0", b: "1", debut: 0, val: (n) => { const [a, b] = coefE(n); return [T(a, 1, "e"), T(b, 1)]; }, sens: "décroissante", lim: "0", limN: 0, pourquoi: "sur $[0\\,;1]$, $x^{n+1}e^{x} \\leq x^{n}e^{x}$ ; et $0 \\leq x^{n}e^{x} \\leq ex^{n}$", rel: { ...REL_E, ipp: "on pose $u(x) = x^{n+1}$ et $v'(x) = e^{x}$", depuis: () => "" } },
    { corps: "(\\ln x)^{n}", a: "1", b: "e", debut: 0, val: (n) => { const [a, b] = coefE(n); return [T(a, 1, "e"), T(b, 1)]; }, sens: "décroissante", lim: "0", limN: 0, pourquoi: "sur $[1\\,;e]$, $0 \\leq \\ln x \\leq 1$, donc $(\\ln x)^{n+1} \\leq (\\ln x)^{n}$", rel: { ...REL_E, ipp: "on pose $u(x) = (\\ln x)^{n+1}$ et $v'(x) = 1$", depuis: () => "" } },
    { corps: "x^{n}e^{-x}", a: "0", b: "1", debut: 0, val: (n) => { const [a, b] = coefEm(n); return [T(b, 1), T(a, 1, "e^{-1}")]; }, sens: "décroissante", lim: "0", limN: 0, pourquoi: "sur $[0\\,;1]$, $x^{n+1}e^{-x} \\leq x^{n}e^{-x}$ ; et $0 \\leq x^{n}e^{-x} \\leq x^{n}$", rel: { juste: (L) => `${L}_{n+1} = (n+1)${L}_n - e^{-1}`, faux: (L) => [`${L}_{n+1} = (n+1)${L}_n + e^{-1}`, `${L}_{n+1} = n${L}_n - e^{-1}`, `${L}_{n+1} = e^{-1} - (n+1)${L}_n`, `${L}_{n+1} = (n+1)${L}_n - e`], ipp: "on pose $u(x) = x^{n+1}$ et $v'(x) = e^{-x}$", depuis: () => "" } },
    { corps: "\\dfrac{x^{n}}{1+x}", a: "0", b: "1", debut: 0, val: (n) => { const [s, r] = coefLn(n); return [T(s, 1, "\\ln 2"), r]; }, sens: "décroissante", lim: "0", limN: 0, pourquoi: "sur $[0\\,;1]$, $x^{n+1} \\leq x^{n}$ ; et $0 \\leq \\dfrac{x^{n}}{1+x} \\leq x^{n}$", rel: { juste: (L) => `${L}_{n+1} = \\dfrac{1}{n+1} - ${L}_n`, faux: (L) => [`${L}_{n+1} = \\dfrac{1}{n+1} + ${L}_n`, `${L}_{n+1} = \\dfrac{1}{n} - ${L}_n`, `${L}_{n+1} = 1 - ${L}_n`, `${L}_{n+1} = ${L}_n - \\dfrac{1}{n+1}`], ipp: "on additionne : $\\dfrac{x^{n+1}}{1+x} + \\dfrac{x^{n}}{1+x} = x^{n}$", depuis: () => "" } },
  ]);
}
/** Suites sans valeur exacte, ou dont une borne dépend de n : pour les variations et les limites. */
function suiteVariation(): Pick<Suite, "corps" | "a" | "b" | "debut" | "sens" | "lim" | "limN" | "pourquoi"> {
  return un([
    suite(),
    suite(),
    { corps: "x^{n}\\sqrt{1+x}", a: "0", b: "1", debut: 0, sens: "décroissante" as const, lim: "0", limN: 0, pourquoi: "sur $[0\\,;1]$, $x^{n+1} \\leq x^{n}$ ; et $0 \\leq x^{n}\\sqrt{1+x} \\leq \\sqrt{2}x^{n}$" },
    { corps: "\\dfrac{x^{n}}{1+x^{2}}", a: "0", b: "1", debut: 0, sens: "décroissante" as const, lim: "0", limN: 0, pourquoi: "sur $[0\\,;1]$, $x^{n+1} \\leq x^{n}$ ; et $0 \\leq \\dfrac{x^{n}}{1+x^{2}} \\leq x^{n}$" },
    { corps: "x^{n}e^{-x^{2}}", a: "0", b: "1", debut: 0, sens: "décroissante" as const, lim: "0", limN: 0, pourquoi: "sur $[0\\,;1]$, $x^{n+1} \\leq x^{n}$ ; et $0 \\leq x^{n}e^{-x^{2}} \\leq x^{n}$" },
    { corps: "e^{-x}", a: "0", b: "n", debut: 1, sens: "croissante" as const, lim: "1", limN: 1, pourquoi: "la fonction intégrée est positive, et la borne $n$ augmente ; $I_n = 1 - e^{-n}$" },
    { corps: "\\dfrac{1}{x^{2}}", a: "1", b: "n", debut: 1, sens: "croissante" as const, lim: "1", limN: 1, pourquoi: "la fonction intégrée est positive, et la borne $n$ augmente ; $I_n = 1 - \\dfrac{1}{n}$" },
    { corps: "\\dfrac{1}{x}", a: "1", b: "n", debut: 1, sens: "croissante" as const, lim: "+\\infty", limN: "inf" as const, pourquoi: "la fonction intégrée est positive, et la borne $n$ augmente ; $I_n = \\ln n$" },
  ]);
}
const LETTRE = () => un(["I", "J", "u"]);
const defSuite = (s: { corps: string; a: string; b: string; debut: number }, L: string) =>
  `$${L}_n = ${I_(s.a, s.b, s.corps)}$ pour tout entier $n \\geq ${s.debut}$`;
const INTRO_S = ["On pose", "On définit", "Soit la suite donnée par", "On considère la suite définie par", "On étudie"];

export const integralesEncadrementBank: TutorBankItemV4[] = [
  /* ===== integrale_proprietes ===== */
  tpl("integrale_proprietes", 1, 1, "Linéarité : on remplace chaque intégrale par sa valeur.", () => {
    const a = entre(-3, 2);
    const b = a + entre(1, 6);
    const [A, B] = [un([-6, -4, -3, -2, 2, 3, 4, 5, 7, 8]), un([-5, -3, -2, 1, 2, 3, 4, 6, 9])];
    const [p, q] = [un([2, 3, 4, 5, -2, -1]), un([1, 2, 3, -1, -2, -3])];
    const [f, g] = un([["f", "g"], ["u", "v"], ["g", "h"]]);
    const cible = `(${signe(p, `${f}(x)`, true)}${signe(q, `${g}(x)`)})`;
    return court(
      phrase([`On sait que $${I_(a, b, `${f}(x)`)} = ${A}$ et $${I_(a, b, `${g}(x)`)} = ${B}$.`, `Deux fonctions continues vérifient $${I_(a, b, `${f}(x)`)} = ${A}$ et $${I_(a, b, `${g}(x)`)} = ${B}$.`], [`Calcule $${I_(a, b, cible)}$.`, `Que vaut $${I_(a, b, cible)}$ ?`, `Par linéarité, combien vaut $${I_(a, b, cible)}$ ?`, `Déduis-en $${I_(a, b, cible)}$.`, `Quelle est la valeur de $${I_(a, b, cible)}$ ?`]),
      p * A + q * B,
      expl("linéarité : $\\int_a^b (pf + qg) = p\\int_a^b f + q\\int_a^b g$.", "on sort les coefficients.", `$${p} \\times (${A}) + ${q < 0 ? `(${q})` : q} \\times (${B}) = ${p * A + q * B}$.`, `l'intégrale vaut $${p * A + q * B}$.`),
    );
  }),
  tpl("integrale_proprietes", 2, 1, "Relation de Chasles : les intervalles se mettent bout à bout. Échanger les bornes change le signe.", () => {
    const a = entre(-2, 1);
    const c = a + entre(1, 4);
    const b = c + entre(1, 4);
    const [A, B] = [un([-4, -2, 1, 3, 5, 6, 8]), un([-3, -1, 2, 4, 7, 9])];
    const f = nomInt();
    const q = entre(1, 3);
    const donnees = `$${I_(a, c, `${f}(x)`)} = ${A}$ et $${I_(c, b, `${f}(x)`)} = ${B}$`;
    const [cible, v] = q === 1 ? [I_(a, b, `${f}(x)`), A + B] : q === 2 ? [I_(b, a, `${f}(x)`), -(A + B)] : [I_(c, a, `${f}(x)`), -A];
    return court(
      phrase([`On donne ${donnees}.`, `Pour une fonction continue $${f}$, ${donnees}.`, `Sur un calcul d'aire orientée, on a trouvé ${donnees}.`], [`Calcule $${cible}$.`, `Que vaut $${cible}$ ?`, `Quelle est la valeur de $${cible}$ ?`, `Déduis-en $${cible}$.`, `Combien vaut $${cible}$ ?`]),
      v,
      expl("Chasles : $\\int_a^c + \\int_c^b = \\int_a^b$ ; et $\\int_b^a = -\\int_a^b$.", "on met les intervalles bout à bout, puis on regarde l'ordre des bornes.", `le résultat est $${v}$.`, `l'intégrale vaut $${v}$.`),
    );
  }),
  tpl("integrale_proprietes", 3, 2, "Regarde le signe de la fonction sur l'intervalle, puis l'ordre des bornes.", () => {
    const c = un([
      { f: "e^{-x^{2}}", a: "-1", b: "2" },
      { f: "\\ln x", a: "1", b: "3" },
      { f: "\\ln x", a: "3", b: "1" },
      { f: "\\ln x", a: "\\dfrac{1}{2}", b: "1" },
      { f: "(x-4)e^{x}", a: "0", b: "2" },
      { f: "(x+1)e^{-x}", a: "0", b: "3" },
      { f: "x^{2}+1", a: "2", b: "-1" },
      { f: "\\sin x", a: "0", b: "\\pi" },
      { f: "\\sin x", a: "-\\pi", b: "0" },
      { f: "\\sin x", a: "-\\pi", b: "\\pi" },
      { f: "x^{3}", a: "-2", b: "2" },
      { f: "x^{5}", a: "-1", b: "1" },
      { f: "\\cos x", a: "\\dfrac{\\pi}{2}", b: "\\pi" },
      { f: "\\cos x", a: "-\\dfrac{\\pi}{2}", b: "\\dfrac{\\pi}{2}" },
      { f: "x\\ln x", a: "1", b: "e" },
      { f: "\\dfrac{1}{x}", a: "2", b: "1" },
    ]);
    const I = I_(c.a, c.b, c.f);
    const nulle = /\\sin x/.test(c.f) && c.a === "-\\pi" && c.b === "\\pi" ? true : /x\^\{[35]\}/.test(c.f);
    const neg = !nulle && [c.f === "\\ln x" && (c.a === "3" || c.a === "\\dfrac{1}{2}"), c.f === "(x-4)e^{x}", c.f === "x^{2}+1", c.f === "\\sin x" && c.a === "-\\pi", c.f === "\\cos x" && c.a !== "-\\dfrac{\\pi}{2}", c.f === "\\dfrac{1}{x}"].some(Boolean);
    const juste = nulle ? "nulle" : neg ? "strictement négative" : "strictement positive";
    return qcm(
      phrase([`Sans calcul de primitive, quel est le signe de $${I}$ ?`, `On ne calcule pas $${I}$, on veut seulement son signe.`, `Que peut-on dire du signe de $${I}$ ?`, `Sans la calculer, l'intégrale $${I}$ est :`, `Quel est le signe de $${I}$ ? Raisonne sans primitive.`], ["", "Choisis la bonne réponse."]),
      juste,
      ["nulle", "strictement négative", "strictement positive", "on ne peut pas le savoir"],
      expl("si $f \\geq 0$ sur $[a\\,;b]$ avec $a \\leq b$, alors $\\int_a^b f \\geq 0$ ; échanger les bornes change le signe ; une fonction impaire sur un intervalle centré a une intégrale nulle.", "on regarde le signe de la fonction, puis l'ordre des bornes, puis une éventuelle symétrie.", nulle ? "la fonction est impaire et l'intervalle est centré en $0$." : `sur cet intervalle, compte tenu de l'ordre des bornes, l'intégrale est ${juste}.`, `l'intégrale est ${juste}.`),
    );
  }),
  tpl("integrale_proprietes", 4, 2, "Compare les fonctions sur l'intervalle : l'inégalité passe à l'intégrale si a ≤ b.", () => {
    const p = un([2, 3, 4, 5]);
    const q = p + un([1, 2, 3]);
    const c = un([
      { f: `x^{${p}}`, g: `x^{${q}}`, a: "0", b: "1", r: "$x^{p} \\geq x^{q}$ pour $p < q$ sur $[0\\,;1]$", gt: true },
      { f: `x^{${p}}`, g: `x^{${q}}`, a: "1", b: "2", r: "$x^{p} \\leq x^{q}$ pour $p < q$ sur $[1\\,;2]$", gt: false },
      { f: "e^{-x}", g: "e^{-2x}", a: "0", b: "1", r: "$e^{-x} \\geq e^{-2x}$ pour $x \\geq 0$", gt: true },
      { f: "e^{x}", g: "e^{2x}", a: "0", b: "1", r: "$e^{x} \\leq e^{2x}$ pour $x \\geq 0$", gt: false },
      { f: "\\ln x", g: "(\\ln x)^{2}", a: "1", b: "e", r: "sur $[1\\,;e]$, $0 \\leq \\ln x \\leq 1$", gt: true },
      { f: "x", g: "\\sqrt{x}", a: "0", b: "1", r: "$x \\leq \\sqrt{x}$ sur $[0\\,;1]$", gt: false },
      { f: "\\sqrt{x}", g: "x", a: "1", b: "4", r: "$\\sqrt{x} \\leq x$ sur $[1\\,;4]$", gt: false },
    ]);
    const [I, J] = [I_(c.a, c.b, c.f), I_(c.a, c.b, c.g)];
    const r = (s: string) => `$I ${s} J$`;
    return qcm(
      phrase([`On pose $I = ${I}$ et $J = ${J}$.`, `Soit $I = ${I}$ et $J = ${J}$.`], ["Sans calculer, comment se comparent-elles ?", "Laquelle est la plus grande ?", "Que peut-on affirmer ?", "Compare $I$ et $J$ sans primitive.", "Quelle inégalité est vraie ?"]),
      r(c.gt ? ">" : "<"),
      [r(c.gt ? "<" : ">"), r("="), "On ne peut pas comparer sans les calculer"],
      expl("si $f \\leq g$ sur $[a\\,;b]$ avec $a \\leq b$, alors $\\int_a^b f \\leq \\int_a^b g$.", "on compare les deux fonctions sur l'intervalle.", `${c.r}.`, `donc ${r(c.gt ? ">" : "<")}.`),
    );
  }),
  tpl("integrale_proprietes", 5, 3, "Chasles d'abord, puis divise par la longueur totale.", () => {
    const a = entre(0, 2);
    const L1 = un([1, 2, 3]);
    const L = un([4, 5, 8, 10]);
    const c = a + L1;
    const b = a + L;
    const [A, B] = [entre(2, 30), entre(2, 30)];
    const ctx = un(["La fonction $f$ modélise un débit d'eau.", "La fonction $f$ modélise la température d'un four.", "La fonction $f$ modélise une vitesse de vent.", "La fonction $f$ modélise la consommation d'un bâtiment.", "La fonction $f$ modélise la vitesse d'un cycliste.", "La fonction $f$ modélise le nombre de visiteurs d'un site web."]);
    const m = (A + B) / L;
    return court(
      `${ctx} On a mesuré $${I_(a, c, "f(x)")} = ${A}$ et $${I_(c, b, "f(x)")} = ${B}$. ${un([`Quelle est sa valeur moyenne sur $[${a}\\,;${b}]$ ?`, `Calcule sa valeur moyenne sur $[${a}\\,;${b}]$.`, `Donne sa moyenne sur $[${a}\\,;${b}]$.`])}`,
      m,
      expl("la valeur moyenne de $f$ sur $[a\\,;b]$ est $\\dfrac{1}{b-a}\\int_a^b f(x)\\,\\mathrm{d}x$.", "on additionne les deux intégrales (Chasles), puis on divise par la longueur.", `$${A} + ${B} = ${A + B}$ et $${b} - ${a} = ${L}$, donc $\\dfrac{${A + B}}{${L}} = ${nL(m)}$.`, `la valeur moyenne est $${nL(m)}$.`),
    );
  }),
  tpl("integrale_proprietes", 6, 3, "Additionne ou soustrais les deux égalités : g disparaît.", () => {
    const a = entre(0, 2);
    const b = a + entre(1, 5);
    const X = entre(-6, 9);
    const Y = entre(-6, 9);
    const [f, g] = un([["f", "g"], ["u", "v"], ["p", "q"]]);
    const cherche = un([f, g]);
    return court(
      phrase([`On sait que $${I_(a, b, `(${f}(x) + ${g}(x))`)} = ${X + Y}$ et $${I_(a, b, `(${f}(x) - ${g}(x))`)} = ${X - Y}$.`, `Pour deux fonctions continues, $${I_(a, b, `(${f}(x) + ${g}(x))`)} = ${X + Y}$ et $${I_(a, b, `(${f}(x) - ${g}(x))`)} = ${X - Y}$.`], [`Que vaut $${I_(a, b, `${cherche}(x)`)}$ ?`, `Calcule $${I_(a, b, `${cherche}(x)`)}$.`, `Déduis-en $${I_(a, b, `${cherche}(x)`)}$.`, `Trouve $${I_(a, b, `${cherche}(x)`)}$.`]),
      cherche === f ? X : Y,
      expl("linéarité de l'intégrale.", "on pose $A$ et $B$ les deux intégrales cherchées : on obtient un système simple.", `$A + B = ${X + Y}$ et $A - B = ${X - Y}$, donc $A = ${X}$ et $B = ${Y}$.`, `l'intégrale de $${cherche}$ vaut $${cherche === f ? X : Y}$.`),
    );
  }),

  /* ===== integrale_encadrer ===== */
  tpl("integrale_encadrer", 1, 1, "m(b − a) ≤ intégrale ≤ M(b − a).", () => {
    const a = entre(-2, 3);
    const L = entre(2, 6);
    const b = a + L;
    const m = entre(-2, 4);
    const M = m + entre(1, 5);
    const f = nomInt();
    const [lo, hi] = [m * L, M * L];
    const I = I_(a, b, `${f}(x)`);
    return qcm(
      phrase([`Pour tout $x$ de $[${a}\\,;${b}]$, $${m} \\leq ${f}(x) \\leq ${M}$.`, `Sur $[${a}\\,;${b}]$, la fonction continue $${f}$ vérifie $${m} \\leq ${f}(x) \\leq ${M}$.`, `On sait que $${m} \\leq ${f}(x) \\leq ${M}$ sur $[${a}\\,;${b}]$.`], [`Quel encadrement de $${I}$ en déduit-on ?`, `Que peut-on dire de $${I}$ ?`, `En intégrant, on obtient pour $${I}$ :`, `Encadre $${I}$.`]),
      enc(String(lo), "I", String(hi)),
      [enc(String(m), "I", String(M)), enc(String(m + L), "I", String(M + L)), enc(String(lo), "I", String(hi + L)), enc(String(lo - L), "I", String(hi))],
      expl("si $m \\leq f \\leq M$ sur $[a\\,;b]$, alors $m(b-a) \\leq \\int_a^b f \\leq M(b-a)$.", "on multiplie chaque borne par la longueur de l'intervalle.", `la longueur est $${L}$, donc $${m} \\times ${L} = ${lo}$ et $${M} \\times ${L} = ${hi}$.`, `$${lo} \\leq I \\leq ${hi}$, où $I$ désigne l'intégrale.`),
    );
  }),
  tpl("integrale_encadrer", 2, 1, "La moyenne de f reste entre le minimum et le maximum de f.", () => {
    const a = entre(0, 3);
    const L = entre(2, 6);
    const b = a + L;
    const m = entre(1, 6);
    const M = m + entre(2, 6);
    const f = nomInt();
    const grand = un([true, false]);
    if (grand) {
      const ctx = un(["La fonction $" + f + "$ est continue.", "Une mesure physique est modélisée par $" + f + "$, continue.", "Un débit est modélisé par $" + f + "$, continue.", "Une température est modélisée par $" + f + "$, continue."]);
      return court(`${ctx} Sur $[${a}\\,;${b}]$, $${f}(x) \\leq ${M}$. ${un(["Quel majorant de l'intégrale de $" + f + "$ sur cet intervalle obtient-on ?", "Donne le majorant de $" + I_(a, b, `${f}(x)`) + "$ que l'on obtient en intégrant.", "En intégrant cette inégalité, majore $" + I_(a, b, `${f}(x)`) + "$ : quel nombre trouve-t-on ?"])}`, M * L, expl("si $f \\leq M$ sur $[a\\,;b]$, alors $\\int_a^b f \\leq M(b-a)$.", "on multiplie $M$ par la longueur de l'intervalle.", `$${M} \\times ${L} = ${M * L}$.`, `l'intégrale est majorée par $${M * L}$.`));
    }
    return qcm(
      phrase([`Sur $[${a}\\,;${b}]$, $${m} \\leq ${f}(x) \\leq ${M}$.`, `La fonction continue $${f}$ vérifie $${m} \\leq ${f}(x) \\leq ${M}$ sur $[${a}\\,;${b}]$.`], ["Que peut-on dire de sa valeur moyenne $\\mu$ ?", "Quel encadrement de sa valeur moyenne $\\mu$ est juste ?", "Encadre sa valeur moyenne $\\mu$ sur cet intervalle."]),
      enc(String(m), "\\mu", String(M)),
      [enc(String(m * L), "\\mu", String(M * L)), enc(String(M), "\\mu", String(M + L)), enc(String(m - L), "\\mu", String(m)), enc("0", "\\mu", String(m))],
      expl("$\\mu = \\dfrac{1}{b-a}\\int_a^b f(x)\\,\\mathrm{d}x$.", "on encadre l'intégrale, puis on divise par la longueur.", `$${m}(b-a) \\leq \\int_a^b f \\leq ${M}(b-a)$ ; en divisant par $b-a$, la longueur disparaît.`, `$${m} \\leq \\mu \\leq ${M}$.`),
    );
  }),
  tpl("integrale_encadrer", 3, 2, "Sur l'intervalle, la fonction monotone est entre ses valeurs aux bornes ; puis multiplie par la longueur.", () => {
    const c = mono();
    const L = c.b - c.a;
    const [lo, hi] = [somme(c.lo), somme(c.hi)];
    const I = I_(c.a, c.b, c.f);
    const dbl = (t: Terme[]) => somme(t.map((x) => T(2 * x.p, x.q, x.c)));
    return qcm(
      phrase([`La fonction $x \\mapsto ${c.f}$ est ${c.sens} sur $[${c.a}\\,;${c.b}]$.`, `On admet que $x \\mapsto ${c.f}$ est ${c.sens} sur $[${c.a}\\,;${c.b}]$.`, `Sur $[${c.a}\\,;${c.b}]$, $x \\mapsto ${c.f}$ est ${c.sens}.`], [`Quel encadrement de $I = ${I}$ en déduit-on ?`, `On pose $I = ${I}$. Quel encadrement obtient-on ?`, `Encadre $I = ${I}$ par les valeurs aux bornes.`, `Parmi ces lignes, laquelle est une conséquence pour $I = ${I}$ ?`]),
      enc(lo, "I", hi),
      [enc(hi, "I", dbl(c.hi)), enc(somme(plusC(c.hi, T(1, 1))), "I", somme(plusC(c.hi, T(2, 1)))), enc(somme(plusC(c.hi, T(1, 2))), "I", somme(plusC(c.hi, T(3, 1)))), enc(somme(plusC(c.hi, T(1, 1))), "I", dbl(plusC(c.hi, T(2, 1))))],
      expl("si $f$ est monotone sur $[a\\,;b]$, elle reste entre $f(a)$ et $f(b)$.", "on calcule les valeurs aux bornes, puis on multiplie par la longueur $b-a$.", `la longueur vaut $${L}$ et la fonction est ${c.sens}.`, `$${lo} \\leq I \\leq ${hi}$.`),
    );
  }),
  tpl("integrale_encadrer", 4, 2, "Fonction monotone : somme des rectangles du dessous et somme des rectangles du dessus.", () => {
    const n = entre(3, 5);
    const a = entre(0, 2);
    const decroit = un([true, false]);
    let vals: number[] = [];
    let y = entre(2, 5);
    for (let k = 0; k <= n; k++) {
      vals.push(y);
      y += entre(1, 4);
    }
    if (decroit) vals = vals.reverse();
    const ctx = un(["La vitesse d'un drone, en m/s,", "Le débit d'une source, en L/min,", "La puissance d'une éolienne, en kW,", "Le débit d'un robinet, en L/min,", "La consommation d'un moteur, en L/h,", "La vitesse d'un coureur, en m/s,"]);
    const table = vals.map((v, i) => `$f(${a + i}) = ${v}$`).join(", ");
    const lo = vals.slice(decroit ? 1 : 0, decroit ? undefined : -1).reduce((s, v) => s + v, 0);
    const hi = vals.slice(decroit ? 0 : 1, decroit ? -1 : undefined).reduce((s, v) => s + v, 0);
    const canvas = {
      kind: "fonctionGraphique",
      size: { width: 320, height: 230 },
      xmin: a - 0.5,
      xmax: a + n + 0.5,
      ymin: -1,
      ymax: Math.max(...vals) + 2,
      grille: true,
      courbes: [{ id: "f", type: "points", couleur: "#2563eb", points: vals.map((v, i) => ({ x: a + i, y: v })) }],
      points: vals.map((v, i) => ({ x: a + i, y: v })),
    } as CanvasFigure;
    const I = I_(a, a + n, "f(x)");
    return qcm(
      `${ctx} suit une fonction $f$ ${decroit ? "décroissante" : "croissante"} sur $[${a}\\,;${a + n}]$, avec ${table}. ${un([`Quel encadrement de $I = ${I}$ obtient-on avec des rectangles de largeur $1$ ?`, `Avec des rectangles de largeur $1$, encadre $I = ${I}$.`, `Quel encadrement de $I = ${I}$ donnent les rectangles de largeur $1$ ?`])}`,
      enc(String(lo), "I", String(hi)),
      [enc(String(lo - 2), "I", String(lo)), enc(String(hi), "I", String(hi + 2)), enc(String(lo + hi), "I", String(2 * hi + 1)), enc(String(Math.min(...vals)), "I", String(Math.max(...vals)))],
      expl("si $f$ est monotone, l'aire sous la courbe est entre celle des rectangles du dessous et celle des rectangles du dessus.", "on additionne les valeurs de $f$, sans la dernière pour un côté, sans la première pour l'autre.", `rectangles du dessous : $${lo}$ ; rectangles du dessus : $${hi}$.`, `$${lo} \\leq I \\leq ${hi}$.`),
      canvas,
    );
  }),
  tpl("integrale_encadrer", 5, 3, "Sur [0 ; 1], encadre le facteur sans xⁿ, puis intègre xⁿ.", () => {
    const n = entre(2, 9);
    const N = n + 1;
    const c = un([
      { g: "e^{x}", f: `x^{${n}}e^{x}`, lo: [T(1, N)], hi: [T(1, N, "e")], m: "1", M: "e" },
      { g: "\\dfrac{1}{1+x}", f: `\\dfrac{x^{${n}}}{1+x}`, lo: [T(1, 2 * N)], hi: [T(1, N)], m: "\\dfrac{1}{2}", M: "1" },
      { g: "e^{-x}", f: `x^{${n}}e^{-x}`, lo: [T(1, N, "e^{-1}")], hi: [T(1, N)], m: "e^{-1}", M: "1" },
      { g: "\\dfrac{1}{1+x^{2}}", f: `\\dfrac{x^{${n}}}{1+x^{2}}`, lo: [T(1, 2 * N)], hi: [T(1, N)], m: "\\dfrac{1}{2}", M: "1" },
      { g: "\\sqrt{1+x}", f: `x^{${n}}\\sqrt{1+x}`, lo: [T(1, N)], hi: [T(1, N, "\\sqrt{2}")], m: "1", M: "\\sqrt{2}" },
    ]);
    const I = I_(0, 1, c.f);
    const [lo, hi] = [somme(c.lo), somme(c.hi)];
    const dbl = (t: Terme[]) => somme(t.map((x) => T(2 * x.p, x.q, x.c)));
    const moitie = (t: Terme[]) => somme(t.map((x) => T(x.p, 2 * x.q, x.c)));
    const quart = (t: Terme[]) => somme(t.map((x) => T(x.p, 4 * x.q, x.c)));
    return qcm(
      phrase([`On pose $I = ${I}$.`, `Soit $I = ${I}$.`, `On veut encadrer $I = ${I}$ sans la calculer.`], ["Quel encadrement est juste ?", "Quel encadrement obtient-on ?", `Sachant que $${c.m} \\leq ${c.g} \\leq ${c.M}$ sur $[0\\,;1]$, quel encadrement obtient-on ?`, "En intégrant une inégalité, on trouve :"]),
      enc(lo, "I", hi),
      [enc(hi, "I", dbl(c.hi)), enc(quart(c.lo), "I", moitie(c.lo)), enc(dbl(c.hi), "I", dbl(c.hi.map((x) => T(2 * x.p, x.q, x.c))))],
      expl("on intègre une inégalité sur $[0\\,;1]$.", `sur $[0\\,;1]$, $${c.m} \\leq ${c.g} \\leq ${c.M}$ ; on multiplie par $x^{${n}} \\geq 0$.`, `$\\int_0^1 x^{${n}}\\,\\mathrm{d}x = \\dfrac{1}{${N}}$.`, `$${lo} \\leq I \\leq ${hi}$.`),
    );
  }),
  tpl("integrale_encadrer", 6, 3, "Intègre la fonction la plus simple : elle donne la borne.", () => {
    const c = comparaison();
    const v = valeurComp(c);
    const I = I_(c.a, c.b, c.f);
    const mot = c.gens === "majore" ? "majorant" : "minorant";
    return qcm(
      phrase([`Sur $[${c.a}\\,;${c.b}]$, on admet que $${c.f} ${c.gens === "majore" ? "\\leq" : "\\geq"} ${c.g}$.`, `On sait que, pour tout $x$ de $[${c.a}\\,;${c.b}]$, $${c.f} ${c.gens === "majore" ? "\\leq" : "\\geq"} ${c.g}$.`], [`Quel ${mot} de $${I}$ obtient-on en intégrant ?`, `En déduire un ${mot} de $${I}$.`, `Quel ${mot} de $${I}$ cette inégalité donne-t-elle ?`, `Que donne cette inégalité pour $${I}$ ? On cherche un ${mot}.`]),
      `$${somme(v)}$`,
      fauxExacts(v).map((x) => `$${x}$`),
      expl("si $f \\leq g$ sur $[a\\,;b]$, alors $\\int_a^b f \\leq \\int_a^b g$.", `${c.pourquoi}.`, `on calcule $${I_(c.a, c.b, c.g)} = ${somme(v)}$.`, `le ${mot} obtenu est $${somme(v)}$.`),
    );
  }),

  /* ===== integrale_suite ===== */
  tpl("integrale_suite", 1, 1, "Remplace n par sa valeur, puis calcule l'intégrale.", () => {
    const s = suite();
    const L = LETTRE();
    const k = s.debut + entre(0, /x\^\{n\}$/.test(s.corps) || s.corps === "e^{-nx}" ? 4 : 1);
    const v = s.val(k);
    return qcm(
      phrase([`${un(INTRO_S)} ${defSuite(s, L)}.`], [`Que vaut $${L}_{${k}}$ ?`, `Calcule $${L}_{${k}}$.`, `Quelle est la valeur exacte de $${L}_{${k}}$ ?`, `Donne $${L}_{${k}}$.`, `Quel est le terme $${L}_{${k}}$ ?`]),
      `$${somme(v)}$`,
      fauxExacts(v).map((x) => `$${x}$`),
      expl("le terme de rang $k$ s'obtient en remplaçant $n$ par $k$.", "on calcule cette intégrale par primitive, ou par parties si besoin.", `on remplace $n$ par $${k}$ dans $${s.corps}$.`, `$${L}_{${k}} = ${somme(v)}$.`),
    );
  }),
  tpl("integrale_suite", 2, 1, "Remplace n dans la relation, puis le terme connu.", () => {
    const L = LETTRE();
    let c = suite();
    while (!c.rel) c = suite();
    const rel = c.rel;
    const k = entre(0, 2);
    const v = c.val(k + 1);
    return qcm(
      `${un(INTRO_S)} ${defSuite(c, L)}. ${un(["On admet que", "On a montré que", "Une intégration par parties donne"])} $${rel.juste(L)}$ et $${L}_{${k}} = ${somme(c.val(k))}$. ${un([`Que vaut $${L}_{${k + 1}}$ ?`, `Calcule $${L}_{${k + 1}}$.`, `Déduis-en $${L}_{${k + 1}}$.`, `Quelle est la valeur de $${L}_{${k + 1}}$ ?`])}`,
      `$${somme(v)}$`,
      fauxExacts(v).map((x) => `$${x}$`),
      expl("une relation de récurrence donne un terme à partir du précédent.", `on remplace $n$ par $${k}$ dans la relation.`, `on obtient $${L}_{${k + 1}} = ${somme(v)}$.`, `$${L}_{${k + 1}} = ${somme(v)}$.`),
    );
  }),
  tpl("integrale_suite", 3, 2, "Compare les deux fonctions intégrées, ou regarde ce qui se passe quand la borne grandit.", () => {
    const s = suiteVariation();
    const L = LETTRE();
    const ju = `$(${L}_n)$ est ${s.sens}`;
    return qcm(
      phrase([`${un(INTRO_S)} ${defSuite(s, L)}.`], ["Quel est son sens de variation ?", "Comment varie cette suite ?", "Que peut-on dire de ses variations ?", "Étudie son sens de variation.", "Quel résultat est juste ?"]),
      ju,
      [`$(${L}_n)$ est ${s.sens === "croissante" ? "décroissante" : "croissante"}`, `$(${L}_n)$ est constante`, `$(${L}_n)$ n'est pas monotone`],
      expl("on compare $u_{n+1}$ et $u_n$.", "on compare les fonctions intégrées (ou on regarde la borne qui bouge), puis on intègre l'inégalité.", `${s.pourquoi}.`.replace(/I_n/g, `${L}_n`), `${ju}.`),
    );
  }),
  tpl("integrale_suite", 4, 2, "Encadre l'intégrale par une suite qui tend vers 0, ou calcule-la directement.", () => {
    const s = suiteVariation();
    const L = LETTRE();
    return qcm(
      phrase([`${un(INTRO_S)} ${defSuite(s, L)}.`], [`Quelle est la limite de $${L}_n$ ?`, `Vers quoi tend $${L}_n$ quand $n$ tend vers $+\\infty$ ?`, `Détermine $\\lim\\limits_{n \\to +\\infty} ${L}_n$.`, `Quelle limite trouve-t-on pour $(${L}_n)$ ?`]),
      `$${s.lim}$`,
      ["$0$", "$1$", "$+\\infty$", "$e$", "$\\dfrac{1}{2}$"].filter((x) => x !== `$${s.lim}$`),
      expl("on utilise le théorème des gendarmes, ou le calcul direct.", "on encadre la fonction intégrée, puis on intègre.", `${s.pourquoi}.`.replace(/I_n/g, `${L}_n`), `la limite est $${s.lim}$.`),
    );
  }),
  tpl("integrale_suite", 5, 3, "Intègre par parties le terme de rang n + 1.", () => {
    let s = suite();
    while (!s.rel) s = suite();
    const L = LETTRE();
    return qcm(
      phrase([`${un(INTRO_S)} ${defSuite(s, L)}.`], ["Quelle relation de récurrence vérifie cette suite ?", "Quelle égalité est vraie pour tout $n$ ?", "Laquelle de ces relations est juste ?", "Une intégration bien choisie donne quelle relation ?"]),
      `$${s.rel.juste(L)}$`,
      s.rel.faux(L).map((x) => `$${x}$`),
      expl("une relation de récurrence exprime un terme à partir du précédent.", `${s.rel.ipp}.`, "on calcule le crochet, puis on reconnaît le terme précédent dans l'intégrale restante.", `$${s.rel.juste(L)}$.`),
    );
  }),
  tpl("integrale_suite", 6, 3, "Applique la relation autant de fois qu'il faut, en partant du premier terme.", () => {
    let s = suite();
    while (!s.rel) s = suite();
    const L = LETTRE();
    const k = entre(2, 4);
    const v = s.val(k);
    return qcm(
      `${un(INTRO_S)} ${defSuite(s, L)}. ${un(["On admet que", "On sait que"])} $${s.rel.juste(L)}$ et $${L}_{0} = ${somme(s.val(0))}$. ${un([`Calcule $${L}_{${k}}$.`, `Que vaut $${L}_{${k}}$ ?`, `Applique la relation pour trouver $${L}_{${k}}$.`, `Quelle est la valeur exacte de $${L}_{${k}}$ ?`])}`,
      `$${somme(v)}$`,
      fauxExacts(v).map((x) => `$${x}$`),
      expl("on applique la relation de récurrence de proche en proche.", `$n = 0$ donne $${L}_{1}$, puis $n = 1$ donne $${L}_{2}$, etc.`, `$${L}_{${k}} = ${somme(v)}$.`, `$${L}_{${k}} = ${somme(v)}$.`),
    );
  }),
];
