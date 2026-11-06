// ASYMPTOTE OBLIQUE, BRANCHES INFINIES, SYMÉTRIES D'UNE COURBE (06/11/2026).
// Hors programme français (registre `hors_france`) : la France s'arrête aux asymptotes
// parallèles aux axes. Lignes visées : Maroc 2e bac A2-4 ; Sénégal 1re AN 1, 1re AN 6,
// Tle AN 1 ; Côte d'Ivoire 1re C1-L7, Tle C1-L2.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, nL, qcm, un } from "../../lycee-commun";
import { aff, branche, decale, enonce, figure, fracS, intro, lim, MOINS, nonNul, PLUS, poly, queue, R, Rsauf } from "./courbes-commun";

const tpl = fabrique("terminale-spe", "asymptotes_symetries_courbes", "tle_");

const M1 = "asymptote_oblique";
const M2 = "branches_infinies";
const M3 = "symetrie_courbe";

const droite = (m: number, p: number) => `$y = ${aff(m, p)}$`;
const horiz = (p: number) => `$y = ${nL(p)}$`;
const vert = (a: number) => `$x = ${nL(a)}$`;
const om = (a: number, b: number) => `$\\Omega(${nL(a)}\\,;${nL(b)})$`;
const signeInf = () => un([PLUS, PLUS, MOINS]);

/* ───────────────── asymptote oblique ───────────────── */

function rationnelle() {
  const a = un([1, 2, 3, -1, -2, 4]);
  const b = nonNul(-7, 7);
  const c = nonNul(-9, 9);
  const d = nonNul(-4, 5);
  return { a, b, c, d, f: `${aff(a, b)} ${queue(c, decale(d))}`, dom: Rsauf(d) };
}
const exA = (calcul: string, conclusion: string) =>
  expl(
    "la droite $y = ax + b$ est asymptote à la courbe de $f$ en $+\\infty$ quand $f(x) - (ax + b)$ tend vers $0$ en $+\\infty$ (de même en $-\\infty$).",
    "on écrit $f(x)$ comme $ax + b$ plus un terme qui tend vers $0$, ou on calcule $a$ puis $b$ par les limites de $\\dfrac{f(x)}{x}$ et de $f(x) - ax$.",
    calcul,
    conclusion,
  );
const Q_ASY = (s: string) => [
  `Quelle droite est asymptote oblique à sa courbe en $${s}$ ?`,
  `Laquelle de ces droites est asymptote à sa courbe en $${s}$ ?`,
  `Sa courbe se rapproche d'une droite en $${s}$. Laquelle ?`,
  `Quelle est l'équation de l'asymptote oblique de sa courbe en $${s}$ ?`,
  `Repère la droite asymptote à sa courbe en $${s}$.`,
  `Vers quelle droite sa courbe tend-elle en $${s}$ ?`,
];
const piegesDroite = (a: number, b: number, c: number) => [droite(a, 0), droite(a, -b), droite(a, b + c), droite(b, a), droite(-a, b), droite(a, b + 1), horiz(b)];

/* Contextes : un coût réparti sur x, qui s'efface quand x grandit. */
const CTX_ASY: ((a: number, b: number, c: number) => { t: string; L: string })[] = [
  () => ({ L: "T", t: "Un atelier fabrique $x$ pièces. Le réglage de la machine se répartit sur la série, et la durée de travail, en minutes, est modélisée par :" }),
  () => ({ L: "T", t: "Une usine de jus de fruits remplit $x$ bouteilles. Le temps de nettoyage se répartit sur la série, et la durée totale, en secondes, est modélisée par :" }),
  () => ({ L: "T", t: "Un serveur traite $x$ requêtes. Son temps de calcul, en millisecondes, est modélisé par :" }),
  () => ({ L: "D", t: "Une imprimante 3D dépose $x$ couches. La durée d'impression, en minutes, est modélisée par :" }),
  () => ({ L: "T", t: "Une apicultrice s'occupe de $x$ ruches. Son temps de travail hebdomadaire, en minutes, est modélisé par :" }),
  () => ({ L: "E", t: "Une station de lavage traite $x$ vélos de location. L'énergie consommée, en kilojoules, est modélisée par :" }),
  () => ({ L: "D", t: "Une boulangerie cuit $x$ pains. La durée de préparation, en minutes, est modélisée par :" }),
  () => ({ L: "T", t: "Une chercheuse analyse $x$ échantillons d'eau de mer. La durée de l'analyse, en minutes, est modélisée par :" }),
];

/* ───────────────── branches infinies ───────────────── */

const OX = "Une branche parabolique de direction $(Ox)$";
const OY = "Une branche parabolique de direction $(Oy)$";
const DIR = (m: number) => `Une branche parabolique de direction la droite $y = ${aff(m, 0)}$`;
const ASY = (m: number, p: number) => `Une asymptote oblique d'équation $y = ${aff(m, p)}$`;
const HOR = (p: number) => `Une asymptote horizontale d'équation $y = ${nL(p)}$`;
const exB = (calcul: string, conclusion: string) =>
  expl(
    "quand $f(x)$ tend vers l'infini en $+\\infty$ ou $-\\infty$, on étudie $\\dfrac{f(x)}{x}$. Limite $0$ : direction $(Ox)$. Limite infinie : direction $(Oy)$. Limite $a \\neq 0$ : on étudie ensuite $f(x) - ax$ ; limite $b$ : asymptote $y = ax + b$ ; limite infinie : direction $y = ax$.",
    "on calcule d'abord la limite de $\\dfrac{f(x)}{x}$, puis si besoin celle de $f(x) - ax$.",
    calcul,
    conclusion,
  );
const Q_BR = (s: string) => [
  `Que peut-on dire de sa courbe en $${s}$ ?`,
  `Quelle est la nature de la branche infinie de sa courbe en $${s}$ ?`,
  `Quel comportement sa courbe a-t-elle en $${s}$ ?`,
  `Que présente sa courbe en $${s}$ ?`,
  `Quelle branche infinie sa courbe admet-elle en $${s}$ ?`,
  `Quelle conclusion tirer pour sa courbe en $${s}$ ?`,
];
const BRANCHE_CHOIX = (m: number, p: number) => [OX, OY, DIR(m), ASY(m, p), HOR(p), DIR(-m)];
/** Une somme ax + (terme lent), dont la direction est y = ax. */
function lente() {
  const a = un([1, 2, 3, -1, -2]);
  const k = nonNul(-5, 5);
  const [t, dom] = un<[string, string]>([[`\\sqrt{x}`, "[0\\,;+\\infty["], [`\\ln(x)`, "]0\\,;+\\infty["]]);
  return { a, k, f: poly([a, "x"], [k, t]), dom };
}
const coefPos = () => entre(2, 6);

/* ───────────────── symétries ───────────────── */

const exS = (calcul: string, conclusion: string) =>
  expl(
    "la droite $x = a$ est axe de symétrie de la courbe si, pour tout $x$ de l'ensemble de définition (centré en $a$), $f(2a - x) = f(x)$. Le point $\\Omega(a\\,;b)$ est centre de symétrie si $f(2a - x) + f(x) = 2b$.",
    "on repère la bonne valeur de $a$, puis on vérifie l'égalité en remplaçant $x$ par $2a - x$.",
    calcul,
    conclusion,
  );
const Q_AXE = [
  "Quelle droite est axe de symétrie de sa courbe ?",
  "Sa courbe admet un axe de symétrie. Lequel ?",
  "Parmi ces droites, laquelle est un axe de symétrie de sa courbe ?",
  "Repère l'axe de symétrie de sa courbe.",
  "Par rapport à quelle droite sa courbe est-elle symétrique ?",
  "Quelle est l'équation de l'axe de symétrie de sa courbe ?",
];
const Q_CENTRE = [
  "Quel point est centre de symétrie de sa courbe ?",
  "Sa courbe admet un centre de symétrie. Lequel ?",
  "Parmi ces points, lequel est un centre de symétrie de sa courbe ?",
  "Repère le centre de symétrie de sa courbe.",
  "Par rapport à quel point sa courbe est-elle symétrique ?",
  "Quelles sont les coordonnées du centre de symétrie de sa courbe ?",
];
const piegesAxe = (a: number, k: number) => [vert(-a), vert(a + 1), vert(a - 1), vert(2 * a), vert(k), horiz(a), horiz(k)];
const piegesCentre = (a: number, b: number, c: number) => [om(b, a), om(-a, b), om(a, -b), om(a, c), om(2 * a, b), om(a, 2 * b), om(-a, -b)];
const CTX_ARC = [
  "Une arche de pont suit, en mètres, le profil :",
  "Le jet d'une fontaine suit, en mètres, le profil :",
  "Un ballon lancé par une joueuse suit, en mètres, la trajectoire :",
  "Le câble d'un pont suspendu suit, en mètres, le profil :",
  "La toile d'une tente suit, en mètres, le profil :",
  "Une antenne parabolique a pour coupe, en décimètres, la courbe :",
  "Une voûte de cathédrale suit, en mètres, le profil :",
  "Le saut d'un dauphin suit, en mètres, la trajectoire :",
];

export const asymptotesSymetriesBank: TutorBankItemV4[] = [
  /* ===== asymptote_oblique ===== */
  tpl(M1, 1, 1, "Le terme en fraction tend vers 0 : il reste la partie affine.", () => {
    const r = rationnelle();
    const s = signeInf();
    return qcm(enonce(intro(r.dom), `f(x) = ${r.f}`, un(Q_ASY(s))), droite(r.a, r.b), [...piegesDroite(r.a, r.b, r.c), vert(r.d)], exA(`$${fracS(r.c, decale(r.d))}$ tend vers $0$ en $${s}$.`, `L'asymptote est ${droite(r.a, r.b)}.`));
  }),
  tpl(M1, 2, 1, "Lis les coefficients de la partie affine, une fois la fraction mise à part.", () => {
    const r = rationnelle();
    const coef = Math.random() < 0.5;
    const q = coef
      ? un(["Quel est le coefficient directeur de son asymptote oblique ?", "Sa courbe a une asymptote oblique : quelle est sa pente ?", "Que vaut $a$ si son asymptote oblique a pour équation $y = ax + b$ ?", "Donne le coefficient directeur de la droite asymptote à sa courbe."])
      : un(["Quelle est l'ordonnée à l'origine de son asymptote oblique ?", "Que vaut $b$ si son asymptote oblique a pour équation $y = ax + b$ ?", "En quelle ordonnée son asymptote oblique coupe-t-elle l'axe des ordonnées ?", "Donne l'ordonnée à l'origine de la droite asymptote à sa courbe."]);
    return court(enonce(intro(r.dom), `f(x) = ${r.f}`, q), coef ? r.a : r.b, exA(`L'asymptote est ${droite(r.a, r.b)}.`, `La valeur cherchée est $${coef ? r.a : r.b}$.`));
  }),
  tpl(M1, 3, 1, "Enlève la partie affine : il ne reste que la fraction.", () => {
    const r = rationnelle();
    const m = `f(x) - \\left(${aff(r.a, r.b)}\\right)`;
    const q = un([`Simplifie $${m}$.`, `À quoi est égal $${m}$ ?`, `Quelle expression donne $${m}$ ?`, `Écris $${m}$ sous une forme réduite.`, `Calcule $${m}$.`, `Que reste-t-il dans $${m}$ après réduction ?`]);
    return qcm(
      enonce(intro(r.dom), `f(x) = ${r.f}`, q),
      `$${fracS(r.c, decale(r.d))}$`,
      [fracS(-r.c, decale(r.d)), fracS(r.c, decale(-r.d)), fracS(r.c, "x"), `${aff(2 * r.a, 2 * r.b)} ${queue(r.c, decale(r.d))}`, fracS(r.d, decale(r.c === r.d ? r.d + 1 : r.c))].map((s) => `$${s}$`),
      exA("Les termes de la partie affine s'annulent deux à deux.", "Cette fraction tend vers $0$ à l'infini : la droite est bien asymptote."),
    );
  }),
  tpl(M1, 4, 1, "La définition : la différence entre la courbe et la droite tend vers 0.", () => {
    const a = un([1, 2, 3, -1, -2]);
    const b = nonNul(-7, 7);
    const s = signeInf();
    const dit = un(["Une fonction $f$ vérifie :", "On sait qu'une fonction $f$ vérifie :", "On a calculé, pour une fonction $f$ :", "Une étude de la fonction $f$ donne :"]);
    const q = un([`Quelle droite est asymptote à sa courbe en $${s}$ ?`, `Que peut-on en déduire pour la courbe de $f$ en $${s}$ ? Quelle droite en est asymptote ?`, `Quelle droite la courbe de $f$ approche-t-elle en $${s}$ ?`, `Laquelle de ces droites est asymptote à la courbe de $f$ ?`, `Quelle est l'asymptote oblique de la courbe de $f$ en $${s}$ ?`]);
    return qcm(
      enonce(dit, `${lim(s)} \\left[f(x) - (${aff(a, b)})\\right] = 0`, q),
      droite(a, b),
      [droite(a, 0), droite(a, -b), droite(b, a), horiz(b), droite(-a, b), vert(b), droite(a, b + 2)],
      exA("La différence tend vers $0$ : c'est la définition d'une asymptote.", `L'asymptote est ${droite(a, b)}.`),
    );
  }),

  tpl(M1, 5, 2, "Pose la division, ou écris le numérateur comme (ax + b)(x − d) + c.", () => {
    const r = rationnelle();
    const num = poly([r.a, "x^2"], [r.b - r.a * r.d, "x"], [r.c - r.b * r.d, ""]);
    const s = signeInf();
    return qcm(
      enonce(intro(r.dom), `f(x) = \\dfrac{${num}}{${decale(r.d)}}`, un(Q_ASY(s))),
      droite(r.a, r.b),
      [droite(r.a, r.b - r.a * r.d), ...piegesDroite(r.a, r.b, r.c)],
      exA(`La division donne $f(x) = ${r.f}$.`, `L'asymptote est ${droite(r.a, r.b)}.`),
    );
  }),
  tpl(M1, 6, 2, "Le terme qui s'ajoute tend vers 0 à cette infinité : il ne compte plus.", () => {
    const a = un([1, 2, 3, -1, -2]);
    const b = nonNul(-7, 7);
    const c = nonNul(-8, 8);
    const K = Math.abs(c);
    const sc = c < 0 ? "-" : "+";
    const [reste, dom, s] = un<[string, string, string]>([
      [`${sc} ${K === 1 ? "" : K}\\mathrm{e}^{-x}`, R, PLUS],
      [`${sc} ${K === 1 ? "" : K}\\mathrm{e}^{x}`, R, MOINS],
      [`${sc} \\dfrac{${K}}{x^2 + 1}`, R, un([PLUS, MOINS])],
      [`${sc} \\dfrac{${K}}{x^2}`, "\\mathbb{R}^{*}", un([PLUS, MOINS])],
      [`${sc} \\dfrac{${K}}{\\sqrt{x}}`, "]0\\,;+\\infty[", PLUS],
    ]);
    return qcm(enonce(intro(dom), `f(x) = ${aff(a, b)} ${reste}`, un(Q_ASY(s))), droite(a, b), piegesDroite(a, b, c), exA(`Le terme ajouté tend vers $0$ en $${s}$.`, `L'asymptote est ${droite(a, b)}.`));
  }),
  tpl(M1, 7, 2, "Étudie le signe de f(x) − (ax + b) sur l'intervalle demandé.", () => {
    const r = rationnelle();
    const droitePart = Math.random() < 0.5;
    const I = droitePart ? `]${r.d}\\,;+\\infty[` : `]-\\infty\\,;${r.d}[`;
    const fin = un([`Sur $${I}$, où se trouve sa courbe par rapport à son asymptote $D$ ?`, `Quelle est la position de sa courbe par rapport à la droite $D$ sur $${I}$ ?`, `Sur $${I}$, comment sa courbe est-elle placée par rapport à $D$ ?`, `Où est sa courbe, par rapport à $D$, sur $${I}$ ?`, `Compare sa courbe et $D$ sur $${I}$.`]);
    const dessus = r.c > 0 === droitePart;
    return qcm(
      `${enonce(intro(r.dom), `f(x) = ${r.f}`, `La droite $D$ d'équation $y = ${aff(r.a, r.b)}$ est asymptote à sa courbe.`)} ${fin}`,
      dessus ? "Au-dessus de $D$" : "En dessous de $D$",
      [dessus ? "En dessous de $D$" : "Au-dessus de $D$", "Elle coupe $D$ une seule fois", "Elle est confondue avec $D$"],
      exA(`$f(x) - (${aff(r.a, r.b)}) = ${fracS(r.c, decale(r.d))}$, dont le signe sur $${I}$ se lit au dénominateur.`, `La différence est ${dessus ? "positive" : "négative"} : la courbe est ${dessus ? "au-dessus" : "en dessous"}.`),
    );
  }),
  tpl(M1, 8, 2, "La première limite donne a, la seconde donne b.", () => {
    const a = un([1, 2, 3, -1, -2, 4]);
    const b = nonNul(-7, 7);
    const s = signeInf();
    const dit = un(["Une étude de la fonction $f$ donne :", "On a calculé, pour une fonction $f$ :", "Pour une fonction $f$, on trouve :", "Une fonction $f$ vérifie :"]);
    const q = un([`Quelle droite est asymptote à sa courbe en $${s}$ ?`, `Quelle est l'équation de l'asymptote oblique de sa courbe ?`, `Déduis-en l'asymptote oblique de la courbe de $f$.`, `Quelle droite ces deux limites désignent-elles ?`, `Quelle asymptote la courbe de $f$ admet-elle en $${s}$ ?`]);
    return qcm(
      `${dit}\n\n$${lim(s)} \\dfrac{f(x)}{x} = ${a}$\n\n$${lim(s)} \\left[f(x) ${a < 0 ? "+" : "-"} ${aff(Math.abs(a), 0)}\\right] = ${b}$\n\n${q}`,
      droite(a, b),
      [droite(b, a), droite(a, -b), droite(-a, b), droite(a, 0), horiz(b), droite(a, b + a)],
      exA(`Le coefficient directeur est $${a}$ et l'ordonnée à l'origine $${b}$.`, `L'asymptote est ${droite(a, b)}.`),
    );
  }),
  tpl(M1, 9, 2, "Sur la droite orange, lis l'ordonnée à l'origine, puis la pente.", () => {
    const a = un([1, -1, 0.5, -0.5]);
    const b = nonNul(-2, 2);
    const c = nonNul(1, 3) * un([1, -1]);
    const d = un([-1, 0, 1]);
    const f = (x: number) => a * x + b + c / (x - d);
    const [x0, x1] = [-5, 7];
    const yb = [a * x0 + b, a * x1 + b];
    const [ymin, ymax] = [Math.floor(Math.min(...yb)) - 2, Math.ceil(Math.max(...yb)) + 2];
    const fig = figure({ xmin: x0, xmax: x1, ymin, ymax, branches: [branche(f, x0, d - 0.05, ymin, ymax), branche(f, d + 0.05, x1, ymin, ymax)], droites: [{ a, b, id: "asymptote" }] });
    const q = un(["Sur la figure, la droite orange est asymptote à la courbe bleue. Quelle est son équation ?", "La courbe bleue se rapproche de la droite orange. Quelle est l'équation de cette droite ?", "Lis sur la figure l'équation de l'asymptote oblique, tracée en orange.", "Quelle équation a la droite orange, asymptote oblique de la courbe ?", "Quelle est l'équation de l'asymptote tracée en orange ?", "D'après la figure, quelle équation correspond à l'asymptote orange ?", "En lisant la figure, trouve l'équation de la droite orange.", "Une courbe et son asymptote oblique sont tracées. Quelle est l'équation de l'asymptote ?"]);
    return qcm(q, droite(a, b), [droite(-a, b), droite(a, -b), droite(2 * a, b), droite(a, b + 1), droite(a, b - 1), droite(b, a)], exA(`La droite orange coupe l'axe des ordonnées en $${b}$ et monte de $${nL(a)}$ quand $x$ augmente de $1$.`, `Son équation est ${droite(a, b)}.`), fig);
  }),

  tpl(M1, 10, 3, "Pour x grand, la fraction est négligeable : calcule avec la partie affine.", () => {
    const a = entre(2, 12);
    const b = entre(5, 60);
    const c = entre(20, 400);
    const X = un([100, 200, 250, 500, 1000]);
    const { t, L } = un(CTX_ASY)(a, b, c);
    const q = un([`Pour une grande valeur de $x$, on remplace $${L}(x)$ par son asymptote oblique. Quelle estimation de $${L}(${X})$ obtient-on ?`, `Estime $${L}(${X})$ en utilisant l'asymptote oblique de la courbe.`, `À l'aide de l'asymptote oblique, donne une estimation de $${L}(${X})$.`]);
    return court(enonce(t, `${L}(x) = ${aff(a, b)} ${queue(c, "x")}`, q), a * X + b, exA(`L'asymptote est ${droite(a, b)}, car $${fracS(c, "x")}$ tend vers $0$.`, `L'estimation est $${a * X + b}$.`));
  }),
  tpl(M1, 11, 3, "La courbe coupe la droite quand la différence s'annule : regarde le numérateur.", () => {
    const a = un([1, 2, 3, -1, -2]);
    const b = nonNul(-7, 7);
    const k = nonNul(-4, 5);
    const r = nonNul(-6, 6);
    const q = un(["En quelle abscisse sa courbe coupe-t-elle son asymptote oblique ?", "Sa courbe traverse son asymptote oblique en un seul point. Quelle est son abscisse ?", "Résous $f(x) = " + aff(a, b) + "$ : quelle valeur de $x$ obtiens-tu ?", "Pour quelle valeur de $x$ sa courbe et son asymptote oblique se rencontrent-elles ?", "Trouve l'abscisse du point commun à sa courbe et à son asymptote oblique."]);
    return court(enonce(intro(R), `f(x) = ${aff(a, b)} ${k < 0 ? "-" : "+"} \\dfrac{${aff(Math.abs(k), -Math.abs(k) * r)}}{x^2 + 1}`, q), r, exA(`La différence entre $f(x)$ et $${aff(a, b)}$ s'annule quand son numérateur s'annule.`, `L'abscisse est $${r}$.`));
  }),
  tpl(M1, 12, 3, "Factorise x² sous la racine : racine(x² + 2px + q) se comporte comme |x + p|.", () => {
    const p = nonNul(-5, 5);
    const q0 = p * p + entre(1, 12);
    const plus = Math.random() < 0.5;
    const s = plus ? PLUS : MOINS;
    const [m, o] = plus ? [1, p] : [-1, -p];
    return qcm(
      enonce(intro(R), `f(x) = \\sqrt{${poly([1, "x^2"], [2 * p, "x"], [q0, ""])}}`, un(Q_ASY(s))),
      droite(m, o),
      [droite(-m, o), droite(m, -o), droite(-m, -o), droite(m, 2 * o), droite(m, o + 1), droite(m, 0)],
      exA(`On écrit $f(x)^2 = (x ${p < 0 ? "-" : "+"} ${Math.abs(p)})^2 + ${q0 - p * p}$, donc $f(x)$ est proche de $|x ${p < 0 ? "-" : "+"} ${Math.abs(p)}|$ en $${s}$.`, `L'asymptote est ${droite(m, o)}.`),
    );
  }),
  tpl(M1, 13, 3, "Remplace x par la valeur donnée, puis isole c.", () => {
    const a = un([1, 2, 3, -1, -2]);
    const b = nonNul(-7, 7);
    const d = nonNul(-4, 5);
    const e = un([1, 2, 3, 4, 5]) * un([1, -1]);
    const k = nonNul(-5, 5);
    const c = k * e;
    const x0 = d + e;
    const v = a * x0 + b + k;
    const q = un(["Que vaut $c$ ?", "Détermine la constante $c$.", "Trouve la valeur de $c$.", "Calcule $c$.", "Quelle valeur de $c$ convient ?"]);
    const annonce = un([`La courbe de $f$ passe par le point de coordonnées $(${x0}\\,;${v})$.`, `On sait aussi que $f(${x0}) = ${v}$.`, `On a mesuré $f(${x0}) = ${v}$.`]);
    return court(`${enonce(un(["Une fonction $f$, dont la courbe a une asymptote oblique, s'écrit :", "La fonction $f$ s'écrit, avec une constante $c$ :", "Une courbe est modélisée, avec une constante $c$, par :"]), `f(x) = ${aff(a, b)} + \\dfrac{c}{${decale(d)}}`, annonce)}\n\n${q}`, c, exA(`En $x = ${x0}$, la partie affine vaut $${a * x0 + b}$, donc $\\dfrac{c}{${e}} = ${k}$.`, `$c = ${c}$.`));
  }),

  /* ===== branches_infinies ===== */
  tpl(M2, 1, 1, "Limite de f(x)/x : 0 donne la direction (Ox), l'infini donne (Oy).", () => {
    const s = signeInf();
    const signeF = un([PLUS, MOINS]);
    const type = Math.random() < 0.5;
    const lq = type ? "0" : un([PLUS, MOINS]);
    const dit = un(["Une fonction $f$ vérifie :", "On a calculé, pour une fonction $f$ :", "Une étude de la fonction $f$ donne :", "Pour une fonction $f$, on trouve :"]);
    return qcm(
      `${dit}\n\n$${lim(s)} f(x) = ${signeF}$\n\n$${lim(s)} \\dfrac{f(x)}{x} = ${lq}$\n\n${un(Q_BR(s))}`,
      type ? OX : OY,
      [type ? OY : OX, "Une asymptote horizontale", "Une asymptote verticale", "Une asymptote oblique"],
      exB(`$\\dfrac{f(x)}{x}$ tend vers $${lq}$.`, `La direction est ${type ? "$(Ox)$" : "$(Oy)$"}.`),
    );
  }),
  tpl(M2, 2, 1, "Compare la croissance de f(x) à celle de x.", () => {
    const k = coefPos();
    const [f, dom] = un<[string, string]>([
      [`${k}x^2`, R],
      [`${k}x^3`, R],
      [`${k}\\sqrt{x}`, "[0\\,;+\\infty["],
      [`${k}\\ln(x)`, "]0\\,;+\\infty["],
      [`${k}\\mathrm{e}^{x}`, R],
      [`${k}\\sqrt{x + ${k}}`, "[0\\,;+\\infty["],
      [poly([1, "x^2"], [k, "x"]), R],
      [`x\\sqrt{x}`, "[0\\,;+\\infty["],
    ]);
    const juste = /sqrt\{x( \+ \d)?\}$|ln/.test(f) && !f.startsWith("x\\sqrt") ? OX : OY;
    return qcm(enonce(intro(dom), `f(x) = ${f}`, un(Q_BR(PLUS))), juste, [OX, OY, ASY(k, 0), HOR(k), DIR(k)], exB(`$\\dfrac{f(x)}{x}$ tend vers ${juste === OX ? "$0$" : "l'infini"} en $+\\infty$.`, `La direction est ${juste === OX ? "$(Ox)$" : "$(Oy)$"}.`));
  }),
  tpl(M2, 3, 1, "Divise chaque terme par x : les termes lents disparaissent.", () => {
    const a = un([1, 2, 3, 4, -1, -2]);
    const k = nonNul(-5, 5);
    const c = nonNul(-9, 9);
    const [f, dom] = un<[string, string]>([
      [poly([a, "x"], [k, "\\sqrt{x}"]), "]0\\,;+\\infty["],
      [poly([a, "x"], [k, "\\ln(x)"]), "]0\\,;+\\infty["],
      [`${aff(a, k)} ${queue(c, "x")}`, "\\mathbb{R}^{*}"],
    ]);
    const m = "\\dfrac{f(x)}{x}";
    const q = un([`Calcule la limite de $${m}$ en $+\\infty$.`, `Vers quelle valeur $${m}$ tend-il en $+\\infty$ ?`, `Que vaut $${lim(PLUS)} ${m}$ ?`, `Quelle est la limite en $+\\infty$ de $${m}$ ?`, `Détermine la limite de $${m}$ quand $x$ tend vers $+\\infty$.`]);
    return court(enonce(intro(dom), `f(x) = ${f}`, q), a, exB("On divise chaque terme par $x$.", `La limite vaut $${a}$.`));
  }),
  tpl(M2, 4, 1, "Le terme en x s'annule : il reste la constante et une fraction qui tend vers 0.", () => {
    const a = un([1, 2, 3, 4]);
    const k = nonNul(-8, 8);
    const c = nonNul(-9, 9);
    const m = `f(x) - ${aff(a, 0)}`;
    const q = un([`Calcule la limite de $${m}$ en $+\\infty$.`, `Vers quelle valeur $${m}$ tend-il en $+\\infty$ ?`, `Que vaut $${lim(PLUS)} \\left[${m}\\right]$ ?`, `Quelle est la limite en $+\\infty$ de $${m}$ ?`, `Détermine la limite de $${m}$ quand $x$ tend vers $+\\infty$.`]);
    return court(enonce(intro("\\mathbb{R}^{*}"), `f(x) = ${aff(a, k)} ${queue(c, "x")}`, q), k, exB(`$${m} = ${k} ${queue(c, "x")}$.`, `La limite vaut $${k}$.`));
  }),

  tpl(M2, 5, 2, "f(x)/x tend vers a, mais f(x) − ax tend vers l'infini : pas d'asymptote.", () => {
    const { a, k, f, dom } = lente();
    return qcm(enonce(intro(dom), `f(x) = ${f}`, un(Q_BR(PLUS))), DIR(a), [ASY(a, k), ASY(a, 0), OX, OY, DIR(-a)], exB(`$\\dfrac{f(x)}{x}$ tend vers $${a}$, et $f(x) ${a < 0 ? "+" : "-"} ${aff(Math.abs(a), 0)}$ tend vers l'infini.`, `La direction est la droite $y = ${aff(a, 0)}$.`));
  }),
  tpl(M2, 6, 2, "Cherche d'abord la limite de f(x)/x, puis celle de f(x) − ax si elle est finie.", () => {
    const a = un([1, 2, 3, -1, -2]);
    const k = nonNul(-6, 6);
    const c = coefPos();
    const cas_ = un<[string, string, string]>([
      [`${aff(a, k)} ${queue(c, "x")}`, "\\mathbb{R}^{*}", ASY(a, k)],
      [poly([a, "x"], [k, "\\sqrt{x}"]), "]0\\,;+\\infty[", DIR(a)],
      [poly([a, "x"], [k, "\\ln(x)"]), "]0\\,;+\\infty[", DIR(a)],
      [`${c}\\sqrt{x}`, "]0\\,;+\\infty[", OX],
      [`${c}x^2`, R, OY],
      [poly([a, "x"], [k, ""], [c, "\\mathrm{e}^{-x}"]), R, ASY(a, k)],
    ]);
    return qcm(enonce(intro(cas_[1]), `f(x) = ${cas_[0]}`, un(Q_BR(PLUS))), cas_[2], BRANCHE_CHOIX(a, k), exB("On calcule la limite de $\\dfrac{f(x)}{x}$, puis si besoin celle de $f(x) - ax$.", `La courbe a : ${cas_[2].charAt(0).toLowerCase()}${cas_[2].slice(1)}.`));
  }),
  tpl(M2, 7, 2, "En −∞, pense que x est négatif : −x est grand et positif.", () => {
    const a = un([1, 2, 3, -1, -2]);
    const k = coefPos();
    const b = nonNul(-5, 5);
    const cas_ = un<[string, string, string]>([
      [`${k}x^2`, R, OY],
      [`${k}x^3`, R, OY],
      [`${k}\\mathrm{e}^{-x}`, R, OY],
      [`${k}\\sqrt{1 - x}`, "]-\\infty\\,;1]", OX],
      [`${k}\\ln(1 - x)`, "]-\\infty\\,;1[", OX],
      [poly([a, "x"], [b, ""], [k, "\\mathrm{e}^{x}"]), R, ASY(a, b)],
      [poly([a, "x"], [b, "\\sqrt{1 - x}"]), "]-\\infty\\,;1]", DIR(a)],
    ]);
    return qcm(enonce(intro(cas_[1]), `f(x) = ${cas_[0]}`, un(Q_BR(MOINS))), cas_[2], BRANCHE_CHOIX(a, b), exB("On étudie $\\dfrac{f(x)}{x}$ quand $x$ tend vers $-\\infty$.", `La courbe a : ${cas_[2].charAt(0).toLowerCase()}${cas_[2].slice(1)}.`));
  }),
  tpl(M2, 8, 2, "Limite finie de f(x) − ax : asymptote ; limite infinie : direction seulement.", () => {
    const a = un([2, 3, 4, -2, -3]);
    const b = nonNul(-7, 7);
    const s = signeInf();
    const fini = Math.random() < 0.5;
    const lq = fini ? String(b) : un([PLUS, MOINS]);
    const dit = un(["Une fonction $f$ vérifie :", "On a calculé, pour une fonction $f$ :", "Une étude de la fonction $f$ donne :", "Pour une fonction $f$, on trouve :"]);
    return qcm(
      `${dit}\n\n$${lim(s)} \\dfrac{f(x)}{x} = ${a}$\n\n$${lim(s)} \\left[f(x) ${a < 0 ? "+" : "-"} ${Math.abs(a)}x\\right] = ${lq}$\n\n${un(Q_BR(s))}`,
      fini ? ASY(a, b) : DIR(a),
      [fini ? DIR(a) : ASY(a, b), ASY(a, 0), OX, OY, DIR(-a)],
      exB(`$f(x) ${a < 0 ? "+" : "-"} ${aff(Math.abs(a), 0)}$ tend vers $${lq}$.`, fini ? `La droite $y = ${aff(a, b)}$ est asymptote.` : `La direction est $y = ${aff(a, 0)}$, sans asymptote.`),
    );
  }),

  tpl(M2, 9, 3, "Écris la limite de la grandeur divisée par x : elle dit à quelle vitesse la courbe s'éloigne.", () => {
    const k = coefPos();
    const a = entre(2, 9);
    const b = entre(2, 9);
    const c = un<[string, string, string, string]>([
      ["La hauteur d'un arbre, en mètres, après $x$ années, est modélisée par :", "h", `${k}\\sqrt{x}`, OX],
      ["Le son perçu d'une enceinte, de puissance $x$, est modélisé par :", "S", `${k}\\ln(x)`, OX],
      ["Le nombre de bactéries d'une culture, après $x$ heures, est modélisé par :", "N", `${k}\\mathrm{e}^{x}`, OY],
      ["La distance de freinage d'une voiture roulant à la vitesse $x$ est modélisée par :", "d", `0{,}0${k}x^2`, OY],
      ["La distance parcourue par une marathonienne, en mètres, après $x$ minutes, est modélisée par :", "D", poly([a, "x"], [b, "\\sqrt{x}"]), DIR(a)],
      ["Le nombre d'abonnés d'une chaîne vidéo, après $x$ jours, est modélisé par :", "A", poly([a, "x"], [b, "\\ln(x)"]), DIR(a)],
      ["La durée d'un chantier de $x$ mètres de route, en heures, est modélisée par :", "T", `${aff(a, b)} ${queue(k, "x")}`, ASY(a, b)],
      ["La consommation d'un bus électrique sur $x$ kilomètres, en kilowattheures, est modélisée par :", "E", `${aff(a, b)} ${queue(k, "x")}`, ASY(a, b)],
      ["Le volume d'eau recueilli par un toit après $x$ jours de pluie, en mètres cubes, est modélisé par :", "V", poly([a, "x"], [b, "\\sqrt{x}"]), DIR(a)],
    ]);
    const q = un(["Quel comportement sa courbe a-t-elle quand $x$ tend vers $+\\infty$ ?", "Que présente sa courbe en $+\\infty$ ?", "Quelle est la nature de la branche infinie de cette courbe ?", "Comment décrire cette courbe pour les grandes valeurs de $x$ ?", "Quelle branche infinie cette courbe admet-elle en $+\\infty$ ?"]);
    return qcm(enonce(c[0], `${c[1]}(x) = ${c[2]}`, q), c[3], BRANCHE_CHOIX(a, b), exB("On calcule la limite du quotient par $x$, puis si besoin celle de l'écart à $ax$.", `La courbe a : ${c[3].charAt(0).toLowerCase()}${c[3].slice(1)}.`));
  }),
  tpl(M2, 10, 3, "Teste chaque fonction : calcule la limite de f(x)/x, puis celle de f(x) − ax.", () => {
    const k = coefPos();
    const a = un([1, 2, 3]);
    const b = nonNul(-5, 5);
    const FAM = {
      ox: [`${k}\\sqrt{x}`, `${k}\\ln(x)`, `\\sqrt{x + ${k}}`, `\\ln(${k}x)`],
      oy: [`${k}x^2`, `${k}x^3`, `\\mathrm{e}^{x}`, `x\\sqrt{x}`],
      obl: [`${aff(a, b)} ${queue(k, "x")}`, poly([a, "x"], [b, ""], [k, "\\mathrm{e}^{-x}"])],
      dir: [poly([a, "x"], [b, "\\sqrt{x}"]), poly([a, "x"], [b, "\\ln(x)"])],
    };
    const cle = un(["ox", "oy", "obl", "dir"] as const);
    const Q = {
      ox: ["Laquelle de ces fonctions a une courbe avec une branche parabolique de direction $(Ox)$ en $+\\infty$ ?", "Quelle fonction a, en $+\\infty$, une branche parabolique de direction $(Ox)$ ?"],
      oy: ["Laquelle de ces fonctions a une courbe avec une branche parabolique de direction $(Oy)$ en $+\\infty$ ?", "Quelle fonction a, en $+\\infty$, une branche parabolique de direction $(Oy)$ ?"],
      obl: ["Laquelle de ces fonctions a une courbe avec une asymptote oblique en $+\\infty$ ?", "Quelle fonction a, en $+\\infty$, une asymptote oblique ?"],
      dir: [`Laquelle de ces fonctions a une courbe avec une branche parabolique de direction $y = ${aff(a, 0)}$ en $+\\infty$ ?`, `Quelle fonction a, en $+\\infty$, une branche parabolique de direction $y = ${aff(a, 0)}$ ?`],
    };
    const juste = un(FAM[cle]);
    const autres = (Object.keys(FAM) as (keyof typeof FAM)[]).filter((x) => x !== cle).map((x) => un(FAM[x]));
    return qcm(`${un(Q[cle])} ${un(["On travaille sur $]0\\,;+\\infty[$.", "Toutes sont définies sur $]0\\,;+\\infty[$.", "Elles sont étudiées sur $]0\\,;+\\infty[$.", "L'étude se fait sur $]0\\,;+\\infty[$.", "On se place sur $]0\\,;+\\infty[$."])}`, `$x \\mapsto ${juste}$`, autres.map((f) => `$x \\mapsto ${f}$`), exB("On compare chaque fonction à $x$.", `La bonne fonction est $x \\mapsto ${juste}$.`));
  }),
  tpl(M2, 11, 3, "Compare le degré du haut et celui du bas.", () => {
    const d = nonNul(-4, 4);
    const a = un([1, 2, 3, -1]);
    const b = nonNul(-6, 6);
    const c = nonNul(-9, 9);
    const den = decale(d);
    const s = un([PLUS, MOINS]);
    const cas_ = un<[string, string]>([
      [`\\dfrac{${poly([a, "x^3"], [b, "x"], [c, ""])}}{${den}}`, OY],
      [`\\dfrac{${poly([a, "x^2"], [b - a * d, "x"], [c - b * d, ""])}}{${den}}`, ASY(a, b)],
      [`\\dfrac{${poly([a, "x"], [c, ""])}}{${den}}`, HOR(a)],
    ]);
    return qcm(enonce(intro(Rsauf(d)), `f(x) = ${cas_[0]}`, un(Q_BR(s))), cas_[1], [OY, OX, ASY(a, b), HOR(a), ASY(a, 0), DIR(a)], exB("On compare les degrés, ou on divise par la plus grande puissance de $x$.", `La courbe a : ${cas_[1].charAt(0).toLowerCase()}${cas_[1].slice(1)}.`));
  }),
  tpl(M2, 12, 3, "Fais la division, ou réduis au même dénominateur : le terme en x disparaît.", () => {
    const d = nonNul(-4, 4);
    const a = un([1, 2, 3, -1]);
    const b = nonNul(-6, 6);
    const c = nonNul(-9, 9);
    const m = `f(x) ${a < 0 ? "+" : "-"} ${aff(Math.abs(a), 0)}`;
    const q = un([`Calcule la limite de $${m}$ en $+\\infty$.`, `Vers quelle valeur $${m}$ tend-il en $+\\infty$ ?`, `Sachant que $\\dfrac{f(x)}{x}$ tend vers $${a}$, quelle est la limite de $${m}$ ?`, `Quelle est la limite en $+\\infty$ de $${m}$ ?`, `Pour trouver l'asymptote, calcule la limite de $${m}$ en $+\\infty$.`]);
    return court(enonce(intro(Rsauf(d)), `f(x) = \\dfrac{${poly([a, "x^2"], [b - a * d, "x"], [c - b * d, ""])}}{${decale(d)}}`, q), b, exB(`La division donne $f(x) = ${aff(a, b)} ${queue(c, decale(d))}$.`, `La limite vaut $${b}$.`));
  }),

  /* ===== symetrie_courbe ===== */
  tpl(M3, 1, 1, "Axe x = a : on compare f(2a − x) et f(x).", () => {
    const a = nonNul(-5, 6);
    const dit = un([`Pour montrer que la droite $x = ${a}$ est axe de symétrie de la courbe de $f$, quelle égalité faut-il établir ?`, `La droite $x = ${a}$ est axe de symétrie de la courbe de $f$ si, et seulement si, quelle égalité est vraie pour tout $x$ ?`, `Quelle égalité traduit que la droite $x = ${a}$ est axe de symétrie de la courbe de $f$ ?`, `Une courbe est symétrique par rapport à la droite $x = ${a}$. Quelle égalité sa fonction $f$ vérifie-t-elle ?`, `Quelle égalité dit que la courbe de $f$ admet la droite $x = ${a}$ pour axe de symétrie ?`, `Laquelle de ces égalités prouve que $x = ${a}$ est un axe de symétrie de la courbe de $f$ ?`]);
    const t = (u: string) => `${u} - x`;
    return qcm(dit, `$f(${t(String(2 * a))}) = f(x)$`, [`$f(${t(String(2 * a))}) = -f(x)$`, `$f(${t(String(a))}) = f(x)$`, `$f(${aff(1, 2 * a)}) = f(x)$`, `$f(${t(String(2 * a))}) + f(x) = 0$`, `$f(${t(String(-2 * a))}) = f(x)$`], exS(`Ici $2a = ${2 * a}$.`, `L'égalité est $f(${t(String(2 * a))}) = f(x)$.`));
  }),
  tpl(M3, 2, 1, "Centre Ω(a ; b) : on calcule f(2a − x) + f(x), qui doit valoir 2b.", () => {
    const a = nonNul(-5, 6);
    const b = nonNul(-5, 6);
    const P = om(a, b);
    const dit = un([`Pour montrer que le point ${P} est centre de symétrie de la courbe de $f$, quelle égalité faut-il établir ?`, `Le point ${P} est centre de symétrie de la courbe de $f$ si, et seulement si, quelle égalité est vraie pour tout $x$ ?`, `Quelle égalité traduit que le point ${P} est centre de symétrie de la courbe de $f$ ?`, `Une courbe est symétrique par rapport au point ${P}. Quelle égalité sa fonction $f$ vérifie-t-elle ?`, `Quelle égalité dit que la courbe de $f$ admet le point ${P} pour centre de symétrie ?`, `Laquelle de ces égalités prouve que ${P} est un centre de symétrie de la courbe de $f$ ?`]);
    const g = (u: number) => `f(${u} - x)`;
    return qcm(dit, `$${g(2 * a)} + f(x) = ${2 * b}$`, [`$${g(2 * a)} + f(x) = ${b}$`, `$${g(a)} + f(x) = ${2 * b}$`, `$${g(2 * a)} - f(x) = ${2 * b}$`, `$${g(2 * b)} + f(x) = ${2 * a}$`, `$f(${aff(1, 2 * a)}) + f(x) = ${2 * b}$`], exS(`Ici $2a = ${2 * a}$ et $2b = ${2 * b}$.`, `L'égalité est $${g(2 * a)} + f(x) = ${2 * b}$.`));
  }),
  tpl(M3, 3, 1, "Une parabole a pour axe la droite qui passe par son sommet.", () => {
    const a = nonNul(-5, 6);
    const k = nonNul(-8, 8);
    const c = un([1, 2, 3, -1, -2]);
    const f = Math.random() < 0.5 ? `${c === 1 ? "" : c === -1 ? "-" : c}(${decale(a)})^2 ${k < 0 ? "-" : "+"} ${Math.abs(k)}` : poly([c, "x^2"], [-2 * c * a, "x"], [k, ""]);
    return qcm(enonce(intro(R), `f(x) = ${f}`, un(Q_AXE)), vert(a), piegesAxe(a, k), exS(`Le sommet de la parabole a pour abscisse $${a}$.`, `L'axe est ${vert(a)}.`));
  }),
  tpl(M3, 4, 1, "La courbe se déduit de celle de 1/x : son centre est le point où ses asymptotes se croisent.", () => {
    const a = nonNul(-3, 3);
    const b = nonNul(-3, 3);
    const c = nonNul(-6, 6);
    const f = (x: number) => b + c / (x - a);
    const [x0, x1, y0, y1] = [a - 5, a + 5, b - 5, b + 5];
    return qcm(
      enonce(intro(Rsauf(a)), `f(x) = ${b} ${queue(c, decale(a))}`, un(Q_CENTRE)),
      om(a, b),
      piegesCentre(a, b, c),
      exS(`Les asymptotes sont $x = ${a}$ et $y = ${b}$ : elles se croisent en ${om(a, b)}.`, `Le centre est ${om(a, b)}.`),
      figure({ xmin: x0, xmax: x1, ymin: y0, ymax: y1, branches: [branche(f, x0, a - 0.03, y0, y1), branche(f, a + 0.03, x1, y0, y1)] }),
    );
  }),

  tpl(M3, 5, 2, "Cherche la valeur de x qui joue le rôle de zéro dans la formule.", () => {
    const a = nonNul(-5, 6);
    const k = entre(1, 8);
    const c = nonNul(1, 9);
    const f = un([`|${decale(a)}| + ${k}`, `\\sqrt{(${decale(a)})^2 + ${k}}`, `\\dfrac{${c}}{(${decale(a)})^2 + 1}`, `(${decale(a)})^4 - ${k}`, `${k} - |${decale(a)}|`, `(${decale(a)})^2 + ${k}`]);
    return qcm(enonce(intro(R), `f(x) = ${f}`, un(Q_AXE)), vert(a), piegesAxe(a, k), exS(`$x$ et $${2 * a} - x$ donnent le même $(${decale(a)})^2$ : on vérifie $f(${2 * a} - x) = f(x)$.`, `L'axe est ${vert(a)}.`));
  }),
  tpl(M3, 6, 2, "Écris f(x) = b + c/(x − a) : la division donne le centre.", () => {
    const a = nonNul(-5, 6);
    const b = nonNul(-5, 6);
    const c = nonNul(-7, 7);
    const e = c - a * b;
    return qcm(enonce(intro(Rsauf(a)), `f(x) = \\dfrac{${aff(b, e)}}{${decale(a)}}`, un(Q_CENTRE)), om(a, b), [...piegesCentre(a, b, c), om(a, e)], exS(`$f(x) = ${b} ${queue(c, decale(a))}$.`, `Le centre est ${om(a, b)}.`));
  }),
  tpl(M3, 7, 2, "Le centre d'une cubique a pour abscisse le zéro de la dérivée seconde.", () => {
    const a = nonNul(-3, 3);
    const b = nonNul(-5, 5);
    const p = nonNul(-4, 4);
    const f = poly([1, "x^3"], [-3 * a, "x^2"], [3 * a * a + p, "x"], [-(a ** 3) - p * a + b, ""]);
    return qcm(enonce(intro(R), `f(x) = ${f}`, un(Q_CENTRE)), om(a, b), [om(-a, b), om(a, -b), om(b, a), om(a, b + 1), om(a + 1, b), om(-3 * a, b)], exS(`$f''(x) = 6x ${a < 0 ? "+" : "-"} ${Math.abs(6 * a)}$ s'annule en $${a}$, et $f(${a}) = ${b}$.`, `Le centre est ${om(a, b)}.`));
  }),
  tpl(M3, 8, 2, "Le centre est le point où les deux asymptotes se croisent.", () => {
    const r = rationnelle();
    const y = r.a * r.d + r.b;
    return qcm(enonce(intro(r.dom), `f(x) = ${r.f}`, un(Q_CENTRE)), om(r.d, y), [om(r.d, r.b), om(r.b, r.d), om(-r.d, y), om(r.d, -y), om(r.d, y + r.c), om(r.d, r.a), om(r.d + 1, y), om(r.d, y + 1), om(r.d - 1, y)], exS(`Les asymptotes sont $x = ${r.d}$ et $y = ${aff(r.a, r.b)}$. Sur la seconde, $x = ${r.d}$ donne $y = ${y}$.`, `Le centre est ${om(r.d, y)}.`));
  }),
  tpl(M3, 9, 2, "Les abscisses x et 2a − x se correspondent par la symétrie.", () => {
    const a = nonNul(-4, 5);
    const h = nonNul(1, 6) * un([1, -1]);
    const v = nonNul(-9, 9);
    const estAxe = Math.random() < 0.5;
    const x0 = a + h;
    const c = estAxe ? nonNul(-5, 5) : nonNul(-5, 6);
    const dit = estAxe ? un([`La droite $x = ${a}$ est axe de symétrie de la courbe de $f$.`, `La courbe de $f$ est symétrique par rapport à la droite $x = ${a}$.`, `La courbe de $f$ admet la droite $x = ${a}$ pour axe de symétrie.`]) : un([`Le point ${om(a, c)} est centre de symétrie de la courbe de $f$.`, `La courbe de $f$ est symétrique par rapport au point ${om(a, c)}.`, `La courbe de $f$ admet le point ${om(a, c)} pour centre de symétrie.`]);
    const rep = estAxe ? v : 2 * c - v;
    const fin = un([`Que vaut $f(${a - h})$ ?`, `Déduis-en $f(${a - h})$.`, `Calcule $f(${a - h})$.`, `Quelle est la valeur de $f(${a - h})$ ?`]);
    return court(`${dit} On sait que $f(${x0}) = ${v}$.\n\n${fin}`, rep, exS(`$2a - ${x0 < 0 ? `(${x0})` : x0} = ${a - h}$.`, `$f(${a - h}) = ${rep}$.`));
  }),

  tpl(M3, 10, 3, "Réduis : les termes en x s'annulent et il reste une constante.", () => {
    const r = rationnelle();
    const u = r.d;
    const m = `f(${aff(1, u).replace(/^x( [-+] )(\d+)$/, (_, s, n) => (s === " + " ? `${n} + x` : `-${n} + x`))}) + f(${u} - x)`;
    const q = un([`Pour tout $x$ non nul, $${m}$ ne dépend pas de $x$. Que vaut cette constante ?`, `Calcule $${m}$, pour $x$ non nul.`, `Que vaut $${m}$ quand $x$ est non nul ?`, `Réduis $${m}$ pour $x$ non nul : quel nombre obtiens-tu ?`, `Quelle constante donne $${m}$, pour tout $x$ non nul ?`]);
    const v = 2 * (r.a * r.d + r.b);
    return court(enonce(intro(r.dom), `f(x) = ${r.f}`, q), v, exS(`Les fractions s'annulent, il reste $2 \\times ${r.a * r.d + r.b}$.`, `La constante vaut $${v}$ : le point d'abscisse $${r.d}$ et d'ordonnée $${r.a * r.d + r.b}$ est centre de symétrie.`));
  }),
  tpl(M3, 11, 3, "L'axe passe par le sommet, ou le centre par les asymptotes : exprime-les avec m.", () => {
    const a = nonNul(-5, 6);
    const k = nonNul(-8, 8);
    const estAxe = Math.random() < 0.6;
    const q = un(["Que vaut $m$ ?", "Trouve la valeur de $m$.", "Détermine le réel $m$.", "Calcule $m$.", "Quelle valeur de $m$ convient ?"]);
    if (estAxe) {
      const c = un([1, 2, 3, -1, -2]);
      const m = -2 * c * a;
      const dit = un([`Sa courbe admet la droite $x = ${a}$ pour axe de symétrie.`, `La droite $x = ${a}$ est axe de symétrie de sa courbe.`, `Sa courbe est symétrique par rapport à la droite $x = ${a}$.`]);
      return court(`${enonce(intro(R), `f(x) = ${poly([c, "x^2"])} + mx ${k < 0 ? "-" : "+"} ${Math.abs(k)}`, dit)}\n\n${q}`, m, exS(`L'axe d'une parabole est $x = -\\dfrac{b}{2a}$, ici avec le coefficient $m$.`, `$m = ${m}$.`));
    }
    const b = nonNul(-5, 6);
    const c = nonNul(-7, 7);
    const dit = un([`Sa courbe admet le point ${om(a, b)} pour centre de symétrie.`, `Le point ${om(a, b)} est centre de symétrie de sa courbe.`, `Sa courbe est symétrique par rapport au point ${om(a, b)}.`]);
    return court(`${enonce(intro(Rsauf(a)), `f(x) = m ${queue(c, decale(a))}`, dit)}\n\n${q}`, b, exS(`L'asymptote horizontale est $y = m$ et elle passe par le centre.`, `$m = ${b}$.`));
  }),
  tpl(M3, 12, 3, "Les deux points symétriques sont à la même distance de l'axe.", () => {
    const a = entre(3, 12);
    const h = entre(1, Math.min(a - 1, 8));
    const k = un([0.1, 0.2, 0.5, 1]);
    const H = entre(4, 30);
    const p = a - h;
    const q = un([`Un point de la courbe a pour abscisse $${p}$. Quelle est l'abscisse de son symétrique, de même hauteur ?`, `Une attache est placée à l'abscisse $${p}$. À quelle abscisse placer l'attache symétrique, à la même hauteur ?`, `Un point est à l'abscisse $${p}$. Quelle autre abscisse donne la même hauteur ?`, `Quelle abscisse, autre que $${p}$, donne la même hauteur qu'en $${p}$ ?`, `Avec l'axe de symétrie, trouve l'abscisse de même hauteur que le point d'abscisse $${p}$.`]);
    const sol = a + h;
    return court(enonce(un(CTX_ARC), `h(x) = -${nL(k).replace(/^1$/, "")}(${decale(a)})^2 + ${H}`, q), sol, exS(`L'axe est la droite $x = ${a}$, et le symétrique de $${p}$ est $2 \\times ${a} - ${p}$.`, `L'abscisse est $${sol}$.`));
  }),
  tpl(M3, 13, 3, "Remplace x par 2a − x et regarde si f change ou non.", () => {
    const a = nonNul(-4, 4);
    const b = nonNul(-5, 5);
    const dA = decale(a);
    const dB = aff(-1, a).replace(/^-x( [-+] )(\d+)$/, (_, s, n) => (s === " + " ? `${n} - x` : `-${n} - x`));
    const axe = Math.random() < 0.5;
    const f = axe
      ? un([`\\mathrm{e}^{${dA}} + \\mathrm{e}^{${dB}} ${b < 0 ? "-" : "+"} ${Math.abs(b)}`, `\\ln\\left((${dA})^2 + 1\\right) ${b < 0 ? "-" : "+"} ${Math.abs(b)}`])
      : `\\mathrm{e}^{${dA}} - \\mathrm{e}^{${dB}} ${b < 0 ? "-" : "+"} ${Math.abs(b)}`;
    const C_A = (v: number) => `Un axe de symétrie : ${vert(v)}`;
    const C_C = (u: number, v: number) => `Un centre de symétrie : ${om(u, v)}`;
    const juste = axe ? C_A(a) : C_C(a, b);
    const q = un(["Quel élément de symétrie sa courbe admet-elle ?", "Quelle symétrie repères-tu sur sa courbe ?", "Quel élément de symétrie peut-on démontrer pour sa courbe ?", "Parmi ces éléments, lequel est un élément de symétrie de sa courbe ?", "Que peut-on dire de la symétrie de sa courbe ?"]);
    return qcm(enonce(intro(R), `f(x) = ${f}`, q), juste, [C_A(a), C_C(a, b), C_A(b), C_C(b, a), C_C(-a, b), C_A(-a)], exS(`On calcule $f(${2 * a} - x)$ : ${axe ? "il redonne $f(x)$" : `$f(${2 * a} - x) + f(x) = ${2 * b}$`}.`, `La courbe admet : ${juste.charAt(0).toLowerCase()}${juste.slice(1)}.`));
  }),
];
