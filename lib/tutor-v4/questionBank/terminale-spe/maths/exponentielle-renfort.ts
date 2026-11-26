// Renfort exponentielle de Terminale spé (26/11/2026).
//
// Mesure du 26/11 (scripts/mesurer-squelettes-coach.ts terminale-spe
// fonction_exponentielle) : 8 à 10 squelettes par micro, 54 items figés pour
// 6 gabarits, 13 à 18 répétitions sur 20 à chaque étoile. Frédéric, le même
// jour : « utilise des générateurs », « enlève les questions open ».
//
// Sur le modèle de derivation-renfort.ts : chaque gabarit tire une SITUATION
// (24 métiers où l'exponentielle sert : santé, archéologie, son, finance,
// sport, numérique… les maths sont transversales) × une TOURNURE, puis ses
// nombres. Aucune question « open » : QCM dès que la réponse est une
// expression, réponse courte seulement pour un nombre.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { makeChoices } from "@/lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Entier non nul entre −m et m. */
function nonNul(m: number) {
  let k = 0;
  while (k === 0) k = randomInt(-m, m);
  return k;
}

/** Nombre en LaTeX : virgule décimale « {,} ». */
function n(x: number) {
  const r = Math.round(x * 1000) / 1000;
  return String(r === 0 ? 0 : r).replace(".", "{,}");
}

/** Nombre pour une réponse tapée : virgule décimale. */
function fr(x: number) {
  const r = Math.round(x * 1000) / 1000;
  return String(r === 0 ? 0 : r).replace(".", ",");
}

/** ax + b en LaTeX (« 2x - 3 », « -x », « 5 »). */
function lin(a: number, b: number, v = "x") {
  const t = a === 0 ? "" : a === 1 ? v : a === -1 ? `-${v}` : `${n(a)}${v}`;
  if (b === 0) return t || "0";
  if (!t) return n(b);
  return t + (b < 0 ? ` - ${n(-b)}` : ` + ${n(b)}`);
}

/** k·e^u en LaTeX (« e^{2x} », « -e^{x} », « 3e^{-x} »). */
function ke(k: number, u: string) {
  const e = u === "1" ? "e" : `e^{${u}}`;
  return k === 1 ? e : k === -1 ? `-${e}` : `${n(k)}${e}`;
}

/** e^k pour un exposant numérique (« 1 », « e », « e^{-3} »). */
function eNum(k: number) {
  return k === 0 ? "1" : k === 1 ? "e" : `e^{${n(k)}}`;
}

/** « + 3 », « - 2 », « » (pour 0). */
function plus(x: number) {
  return x === 0 ? "" : x < 0 ? ` - ${n(-x)}` : ` + ${n(x)}`;
}

/** Équation de droite y = mx + p. */
function droiteEq(m: number, p: number) {
  return `y = ${lin(m, p)}`;
}

const $ = (s: string) => `$${s}$`;

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul / Observation : ${calcul}\n\nConclusion : ${conclusion}`;
}

/** Écriture usuelle : « (x)e^x » → « xe^x », « (3)e » → « 3e », « 1e^x » → « e^x », « 1x^2 » → « x^2 ». */
function propre(s: string) {
  return s
    .replace(/\((-?x)\)e/g, "$1e")
    .replace(/\((-?\d+(?:\{,\}\d+)?)\)e/g, "$1e")
    .replace(/(^|[^\d}])1e\^/g, "$1e^")
    .replace(/(^|[^\d}])1x/g, "$1x");
}

function qcm(text: string, correct: string, pieges: string[], explanation: string): TutorGeneratedQuestionV4 {
  const bon = propre(correct);
  return { text: propre(text), format: "qcm", choices: makeChoices(bon, pieges.map(propre)), expected: [bon], comparator: "mcq_exact", explanation: propre(explanation) };
}

function court(text: string, valeur: number, explanation: string): TutorGeneratedQuestionV4 {
  return { text: propre(text), format: "short", expected: [fr(valeur)], comparator: "number_equal", explanation: propre(explanation) };
}

/* =========================================================
   SITUATIONS : où l'exponentielle sert (⛔ La Réunion ≈ 1 sur 25)
========================================================= */

const METIERS: Array<[string, string]> = [
  ["Une pharmacienne", "l’élimination d’un médicament dans le sang"],
  ["Un archéologue", "la datation d’un objet au carbone 14"],
  ["Une épidémiologiste", "le début d’une épidémie de grippe"],
  ["Un biologiste", "la croissance d’une culture de bactéries"],
  ["Une community manager", "le nombre de partages d’une vidéo"],
  ["Un ingénieur du son", "l’atténuation d’une note de guitare"],
  ["Une physicienne", "la désintégration d’un élément radioactif"],
  ["Un conseiller bancaire", "la valeur d’un placement à intérêts composés"],
  ["Une ingénieure en électronique", "la charge d’un condensateur"],
  ["Un préparateur physique", "la baisse du rythme cardiaque après un sprint"],
  ["Une démographe", "la croissance d’une population"],
  ["Un barista", "le refroidissement d’une tasse de café"],
  ["Une océanographe", "l’absorption de la lumière sous la mer"],
  ["Un développeur de jeux vidéo", "la montée en puissance des ennemis d’un jeu"],
  ["Une écologue", "la population de tortues marines d’une réserve"],
  ["Un météorologue", "la baisse de la pression avec l’altitude"],
  ["Une data scientist", "le nombre d’utilisateurs d’une application"],
  ["Un chimiste", "la vitesse d’une réaction chimique"],
  ["Une médecin du sport", "la récupération musculaire après l’effort"],
  ["Un ingénieur en batteries", "la décharge d’une batterie"],
  ["Une astrophysicienne", "la luminosité d’une étoile qui s’éteint"],
  ["Un agronome", "la propagation d’un ravageur dans un champ"],
  ["Une volcanologue du Piton de la Fournaise", "la baisse du débit de lave en fin d’éruption"],
  ["Un économiste", "la hausse des prix sur plusieurs années"],
];

function minuscule(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/** Une phrase de situation, sans nombre (le squelette change avec elle). */
function cadre() {
  const [q, w] = randomChoice(METIERS);
  return randomChoice([
    `${q} étudie ${w}.`,
    `Pour modéliser ${w}, ${minuscule(q)} utilise la fonction exponentielle.`,
    `${q} travaille sur ${w} et rencontre ce calcul.`,
    `Dans une étude sur ${w}, ${minuscule(q)} doit répondre à cette question.`,
  ]);
}

/* =========================================================
   EXP_DEFINITION — Comprendre la fonction exponentielle
========================================================= */

function genValeurEnZero() {
  const k = nonNul(9);
  const a = nonNul(5);
  return court(
    `${cadre()} On pose $f(x) = ${ke(k, lin(a, 0))}$. Que vaut $f(0)$ ?`,
    k,
    expl("$e^0 = 1$.", "on remplace $x$ par $0$ dans l’exposant.", `$f(0) = ${n(k)} \\times e^{0} = ${n(k)} \\times 1 = ${n(k)}$.`, `$f(0) = ${n(k)}$.`)
  );
}

const APPROCHES: Array<[string, string]> = [
  ["e", "2{,}72"],
  ["e^{2}", "7{,}39"],
  ["e^{-1}", "0{,}37"],
  ["e^{3}", "20{,}09"],
  ["e^{0{,}5}", "1{,}65"],
  ["e^{-2}", "0{,}14"],
];

function genValeurApprochee() {
  const [x, v] = randomChoice(APPROCHES);
  const pieges = APPROCHES.filter(([y]) => y !== x).map(([, w]) => $(w));
  return qcm(
    `${cadre()} Sa calculatrice affiche une valeur approchée de $${x}$ à $0{,}01$ près. Laquelle ?`,
    $(v),
    pieges,
    expl("$e \\approx 2{,}718$ : c’est l’image de $1$ par l’exponentielle.", "on utilise la touche $e^x$ de la calculatrice.", `$${x} \\approx ${v}$.`, `la bonne valeur est $${v}$.`)
  );
}

function genSigneExp() {
  const k = nonNul(7);
  const u = lin(nonNul(4), randomInt(-6, 6));
  const pos = "Strictement positif pour tout réel $x$";
  const neg = "Strictement négatif pour tout réel $x$";
  return qcm(
    `${cadre()} Quel est le signe de $g(x) = ${ke(k, u)}$ ?`,
    k > 0 ? pos : neg,
    [k > 0 ? neg : pos, "Il dépend du signe de $x$", "Il s’annule une fois sur $\\mathbb{R}$"],
    expl("pour tout réel $X$, $e^X > 0$.", "le signe de $g(x)$ est celui du coefficient devant l’exponentielle.", `$e^{${u}} > 0$ et le coefficient vaut $${n(k)}$.`, k > 0 ? "$g(x) > 0$ pour tout réel $x$." : "$g(x) < 0$ pour tout réel $x$.")
  );
}

function genNombreSolutions() {
  const c = randomInt(-6, 6);
  const u = lin(nonNul(4), randomInt(-5, 5));
  const bon = c > 0 ? "Une seule" : "Aucune";
  return qcm(
    `${cadre()} Combien l’équation $e^{${u}} = ${n(c)}$ a-t-elle de solutions ?`,
    bon,
    ["Aucune", "Une seule", "Deux", "Une infinité"].filter((x) => x !== bon),
    expl("l’exponentielle est strictement croissante et ne prend que des valeurs strictement positives.", "on regarde le signe du second membre.", c > 0 ? `$${n(c)} > 0$ : la valeur $${n(c)}$ est atteinte une fois, et une seule.` : `$${n(c)} \\le 0$, or $e^{${u}} > 0$.`, c > 0 ? "une seule solution." : "aucune solution.")
  );
}

function genComparer() {
  let p = 0, q = 0;
  while (p === q) {
    p = randomInt(-8, 8);
    q = randomInt(-8, 8);
  }
  const A = `e^{${p}}`, B = `e^{${q}}`;
  const bon = p < q ? `$${A} < ${B}$` : `$${A} > ${B}$`;
  return qcm(
    `${cadre()} Comment se comparent $${A}$ et $${B}$ ?`,
    bon,
    [`$${A} < ${B}$`, `$${A} > ${B}$`, `$${A} = ${B}$`].filter((x) => x !== bon),
    expl("l’exponentielle est strictement croissante sur $\\mathbb{R}$.", "elle range les images dans le même ordre que les exposants.", `$${p} ${p < q ? "<" : ">"} ${q}$.`, `donc ${bon}.`)
  );
}

function genSensVariation() {
  const k = nonNul(6);
  const c = randomInt(-9, 9);
  const cr = "Strictement croissante sur $\\mathbb{R}$";
  const de = "Strictement décroissante sur $\\mathbb{R}$";
  return qcm(
    `${cadre()} Quel est le sens de variation de $f(x) = ${ke(k, "x")}${plus(c)}$ ?`,
    k > 0 ? cr : de,
    [k > 0 ? de : cr, "Croissante puis décroissante", "Décroissante puis croissante"],
    expl("$(e^x)' = e^x$ et $e^x > 0$.", "on dérive, puis on étudie le signe de $f'$.", `$f'(x) = ${ke(k, "x")}$, du signe de $${n(k)}$.`, k > 0 ? "$f$ est strictement croissante." : "$f$ est strictement décroissante.")
  );
}

function genEgaleSaDerivee() {
  const k = randomChoice([2, 3, 4, 5, 6, 7, -2, -3, -5]);
  const bon = $(ke(k, "x"));
  return qcm(
    `${cadre()} Quelle fonction $f$ vérifie $f' = f$ et $f(0) = ${n(k)}$ ?`,
    bon,
    [$(`e^{${n(k)}x}`), $(`e^{x}${plus(k - 1)}`), $(`${n(k)}x`), $(`e^{x + ${n(Math.abs(k))}}`)],
    expl("l’exponentielle est l’unique fonction égale à sa dérivée qui vaut $1$ en $0$.", "les fonctions $f' = f$ sont les $ke^x$ ; on fixe $k$ avec $f(0)$.", `$f(x) = ke^x$ et $f(0) = k = ${n(k)}$.`, `$f(x) = ${ke(k, "x")}$.`)
  );
}

function genTangenteEnZero() {
  const k = nonNul(5);
  const a = nonNul(4);
  const bon = $(droiteEq(k * a, k));
  return qcm(
    `${cadre()} Quelle est la tangente en $0$ à la courbe de $f(x) = ${ke(k, lin(a, 0))}$ ?`,
    bon,
    [$(droiteEq(k, k * a)), $(droiteEq(k * a, 0)), $(droiteEq(a, k)), $(droiteEq(k * a, 1))],
    expl("la tangente en $0$ a pour équation $y = f'(0)\\,x + f(0)$.", "$(e^{ax})' = ae^{ax}$.", `$f(0) = ${n(k)}$ et $f'(x) = ${ke(k * a, lin(a, 0))}$, donc $f'(0) = ${n(k * a)}$.`, `$${droiteEq(k * a, k)}$.`)
  );
}

/* =========================================================
   EXP_PROPRIETES — Propriétés algébriques
========================================================= */

const SIMPLIFIE = ["Simplifie", "Écris plus simplement", "Réduis", "Donne une écriture simplifiée de"];

function genProduit() {
  const a = nonNul(9), b = nonNul(9);
  const bon = $(eNum(a + b));
  return qcm(
    `${cadre()} ${randomChoice(SIMPLIFIE)} $e^{${a}} \\times e^{${b}}$.`,
    bon,
    [$(eNum(a * b)), $(eNum(a - b)), $(`2${eNum(a + b)}`), $(eNum(a + b + 1))],
    expl("$e^a \\times e^b = e^{a+b}$.", "on additionne les exposants.", `$${a} + ${b < 0 ? `(${b})` : b} = ${a + b}$.`, `$e^{${a}} \\times e^{${b}} = ${eNum(a + b)}$.`)
  );
}

function genQuotient() {
  const a = nonNul(9), b = nonNul(9);
  const bon = $(eNum(a - b));
  return qcm(
    `${cadre()} ${randomChoice(SIMPLIFIE)} $\\dfrac{e^{${a}}}{e^{${b}}}$.`,
    bon,
    [$(eNum(a + b)), $(eNum(b - a)), $(eNum(a * b))],
    expl("$\\dfrac{e^a}{e^b} = e^{a-b}$.", "on soustrait les exposants : celui du haut moins celui du bas.", `$${a} - ${b < 0 ? `(${b})` : b} = ${a - b}$.`, `$\\dfrac{e^{${a}}}{e^{${b}}} = ${eNum(a - b)}$.`)
  );
}

function genInverse() {
  const a = nonNul(9);
  const bon = $(eNum(-a));
  return qcm(
    `${cadre()} Écris $\\dfrac{1}{e^{${a}}}$ sous la forme $e^{n}$.`,
    bon,
    [$(`-${eNum(a)}`), $(eNum(1 - a)), $(eNum(a - 1)), $(eNum(a))],
    expl("$\\dfrac{1}{e^a} = e^{-a}$.", "l’inverse change le signe de l’exposant.", `$\\dfrac{1}{e^{${a}}} = e^{-(${a})}$.`, `$\\dfrac{1}{e^{${a}}} = ${eNum(-a)}$.`)
  );
}

function genPuissance() {
  const a = nonNul(6);
  const p = randomInt(2, 5);
  const bon = $(eNum(a * p));
  return qcm(
    `${cadre()} ${randomChoice(SIMPLIFIE)} $\\left(e^{${a}}\\right)^{${p}}$.`,
    bon,
    [$(eNum(a + p)), $(`${p}${eNum(a)}`), $(eNum(a - p)), $(eNum(-a * p))],
    expl("$(e^a)^n = e^{na}$.", "on multiplie les exposants.", `$${p} \\times ${a < 0 ? `(${a})` : a} = ${a * p}$.`, `$\\left(e^{${a}}\\right)^{${p}} = ${eNum(a * p)}$.`)
  );
}

function genCombine() {
  const a = nonNul(7), b = nonNul(7), c = nonNul(7);
  const r = a + b - c;
  const bon = $(eNum(r));
  return qcm(
    `${cadre()} ${randomChoice(SIMPLIFIE)} $\\dfrac{e^{${a}} \\times e^{${b}}}{e^{${c}}}$.`,
    bon,
    [$(eNum(a + b + c)), $(eNum(a * b - c)), $(eNum(a - b - c)), $(eNum(c - a - b))],
    expl("$e^a \\times e^b = e^{a+b}$ et $\\dfrac{e^a}{e^b} = e^{a-b}$.", "on additionne en haut, puis on soustrait l’exposant du bas.", `$${a} + ${b < 0 ? `(${b})` : b} - ${c < 0 ? `(${c})` : c} = ${r}$.`, `le résultat est $${eNum(r)}$.`)
  );
}

function genAvecX() {
  const p = randomInt(2, 4), q = nonNul(4);
  let r = nonNul(4);
  while (p + q - r === 0) r = nonNul(4);
  const s = p + q - r;
  const bon = $(ke(1, lin(s, 0)));
  return qcm(
    `${cadre()} ${randomChoice(SIMPLIFIE)} $\\dfrac{\\left(e^{x}\\right)^{${p}} \\times e^{${lin(q, 0)}}}{e^{${lin(r, 0)}}}$.`,
    bon,
    [$(ke(1, lin(p * q - r, 0))), $(ke(1, lin(p + q + r, 0))), $(ke(1, lin(s, 0) + "^{2}")), $(ke(1, lin(p + q - r + 1, 0)))],
    expl("$(e^x)^n = e^{nx}$, $e^a e^b = e^{a+b}$, $\\dfrac{e^a}{e^b} = e^{a-b}$.", "on ramène tout à une seule exponentielle.", `$${p}x + ${q < 0 ? `(${lin(q, 0)})` : lin(q, 0)} - ${r < 0 ? `(${lin(r, 0)})` : lin(r, 0)} = ${lin(s, 0)}$.`, `le résultat est $${ke(1, lin(s, 0))}$.`)
  );
}

const AFFIRMATIONS: Array<[string, boolean, string]> = [
  ["e^{a+b} = e^{a} + e^{b}", false, "c’est un PRODUIT : $e^{a+b} = e^a \\times e^b$."],
  ["e^{a+b} = e^{a} \\times e^{b}", true, "c’est la relation fondamentale de l’exponentielle."],
  ["e^{a} \\times e^{b} = e^{ab}", false, "on ADDITIONNE les exposants : $e^a \\times e^b = e^{a+b}$."],
  ["\\left(e^{a}\\right)^{b} = e^{ab}", true, "une puissance de puissance multiplie les exposants."],
  ["e^{-a} = -e^{a}", false, "$e^{-a} = \\dfrac{1}{e^a}$, qui est strictement positif."],
  ["e^{-a} = \\dfrac{1}{e^{a}}", true, "l’inverse change le signe de l’exposant."],
  ["\\dfrac{e^{a}}{e^{b}} = e^{a-b}", true, "pour un quotient, on soustrait les exposants."],
  ["e^{2a} = 2e^{a}", false, "$e^{2a} = \\left(e^{a}\\right)^2$, pas le double."],
  ["e^{2a} = \\left(e^{a}\\right)^{2}", true, "une puissance de puissance multiplie les exposants."],
  ["\\sqrt{e^{a}} = e^{a/2}", true, "$\\left(e^{a/2}\\right)^2 = e^{a}$ et $e^{a/2} > 0$."],
  ["\\dfrac{e^{a}}{e^{b}} = e^{a/b}", false, "on SOUSTRAIT les exposants : $e^{a-b}$."],
  ["e^{a} + e^{a} = e^{2a}", false, "$e^a + e^a = 2e^a$."],
];

function genVraiFaux() {
  const [f, vrai, pourquoi] = randomChoice(AFFIRMATIONS);
  return qcm(
    `${cadre()} Pour tous réels $a$ et $b$, l’égalité $${f}$ est-elle vraie ?`,
    vrai ? "Vrai" : "Faux",
    [vrai ? "Faux" : "Vrai"],
    expl("les règles de calcul de l’exponentielle ressemblent à celles des puissances.", "on compare l’égalité aux règles du cours.", pourquoi, vrai ? "l’égalité est vraie." : "l’égalité est fausse.")
  );
}

function genDevelopper() {
  const k = nonNul(6);
  const bon = $(`e^{2x}${plus(2 * k)}e^{x}${plus(k * k)}`.replace(/([+-] )(-?)1e/, "$1$2e"));
  return qcm(
    `${cadre()} Développe $\\left(e^{x}${plus(k)}\\right)^{2}$.`,
    bon,
    [$(`e^{2x}${plus(k * k)}`), $(`e^{x^{2}}${plus(2 * k)}e^{x}${plus(k * k)}`), $(`e^{2x}${plus(k)}e^{x}${plus(k * k)}`), $(`2e^{x}${plus(2 * k)}e^{x}${plus(k * k)}`)],
    expl("$(A + B)^2 = A^2 + 2AB + B^2$ et $\\left(e^{x}\\right)^2 = e^{2x}$.", "on applique l’identité remarquable avec $A = e^x$.", `$\\left(e^{x}\\right)^2 + 2 \\times ${k < 0 ? `(${k})` : k} \\times e^{x} + ${k < 0 ? `(${k})` : k}^2$.`, `${bon}.`)
  );
}

function genFactoriser() {
  const k = randomInt(2, 9);
  const bon = $(`e^{x}\\left(e^{x} - ${k}\\right)`);
  return qcm(
    `${cadre()} Factorise $e^{2x} - ${k}e^{x}$.`,
    bon,
    [$(`e^{x}\\left(e^{2x} - ${k}\\right)`), $(`e^{2x}\\left(1 - ${k}\\right)`), $(`e^{x}\\left(e^{x} - ${k}e^{x}\\right)`), $(`${k}e^{x}\\left(e^{x} - 1\\right)`)],
    expl("$e^{2x} = e^{x} \\times e^{x}$.", "on met $e^x$ en facteur commun.", `$e^{2x} - ${k}e^{x} = e^{x} \\times e^{x} - ${k} \\times e^{x}$.`, `${bon}.`)
  );
}

/* =========================================================
   EXP_DERIVER — Dériver une expression avec exponentielle
========================================================= */

function genDeriveeAffine() {
  const k = nonNul(6), a = nonNul(5), b = randomInt(-6, 6);
  const u = lin(a, b);
  const bon = $(ke(k * a, u));
  return qcm(
    `${cadre()} Quelle est la dérivée de $f(x) = ${ke(k, u)}$ ?`,
    bon,
    [$(ke(k, u)), $(ke(-k * a, u)), $(`${k === 1 ? "" : k === -1 ? "-" : n(k)}(${u})e^{${u}}`), $(ke(k * a, lin(a, b - 1)))],
    expl("$(e^u)' = u'e^u$.", `ici $u(x) = ${u}$, donc $u'(x) = ${n(a)}$.`, `$f'(x) = ${n(k)} \\times ${a < 0 ? `(${a})` : a} \\times e^{${u}}$.`, `$f'(x) = ${ke(k * a, u)}$.`)
  );
}

function genDeriveeSomme() {
  const a = nonNul(5), m = nonNul(6);
  const bon = $(`${ke(a, lin(a, 0))}${plus(2 * m)}x`);
  return qcm(
    `${cadre()} Quelle est la dérivée de $f(x) = e^{${lin(a, 0)}}${plus(m)}x^{2}$ ?`,
    bon,
    [$(`e^{${lin(a, 0)}}${plus(2 * m)}x`), $(`${ke(a, lin(a, 0))}${plus(m)}x`), $(`${ke(a, lin(a, 0))}${plus(2 * m)}`), $(`${ke(a, lin(a - 1, 0))}${plus(2 * m)}x`)],
    expl("on dérive terme à terme : $(e^u)' = u'e^u$ et $(x^2)' = 2x$.", `$u(x) = ${lin(a, 0)}$, $u'(x) = ${n(a)}$.`, `$f'(x) = ${ke(a, lin(a, 0))} + ${m < 0 ? `(${m})` : m} \\times 2x$.`, `${bon}.`)
  );
}

function genNombreDerive() {
  const k = nonNul(6), a = nonNul(5);
  return court(
    `${cadre()} On pose $f(x) = ${ke(k, lin(a, 0))}$. Que vaut $f'(0)$ ?`,
    k * a,
    expl("$(e^{ax})' = ae^{ax}$.", "on dérive, puis on remplace $x$ par $0$.", `$f'(x) = ${ke(k * a, lin(a, 0))}$, donc $f'(0) = ${n(k * a)} \\times e^0 = ${n(k * a)}$.`, `$f'(0) = ${n(k * a)}$.`)
  );
}

function genDeriveeContexte() {
  const A = randomChoice([10, 20, 50, 80, 100, 200]);
  const b = randomChoice([0.1, 0.2, 0.5, 2, 3]);
  const u = lin(-b, 0, "t");
  const bon = $(ke(-A * b, u));
  return qcm(
    `${cadre()} La grandeur étudiée vaut $Q(t) = ${ke(A, u)}$, avec $t$ en heures. Quelle est sa vitesse de variation $Q'(t)$ ?`,
    bon,
    [$(ke(A * b, u)), $(ke(-A, u)), $(ke(-b, u)), $(ke(A, u))],
    expl("la vitesse de variation est la dérivée ; $(e^u)' = u'e^u$.", `$u(t) = ${u}$, $u'(t) = ${n(-b)}$.`, `$Q'(t) = ${n(A)} \\times (${n(-b)}) \\times e^{${u}}$.`, `$Q'(t) = ${ke(-A * b, u)}$ : la grandeur diminue.`)
  );
}

function genDeriveeProduit() {
  const m = nonNul(4), p = randomInt(-6, 6);
  const bon = $(`(${lin(m, m + p)})e^{x}`);
  return qcm(
    `${cadre()} Quelle est la dérivée de $f(x) = (${lin(m, p)})e^{x}$ ?`,
    bon,
    [$(`${n(m)}e^{x}`), $(`(${lin(m, p)})e^{x}`), $(`(${lin(m, p - m)})e^{x}`), $(`(${lin(m, m + p + 1)})e^{x}`)],
    expl("$(uv)' = u'v + uv'$.", `$u = ${lin(m, p)}$, $u' = ${n(m)}$ ; $v = e^x$, $v' = e^x$.`, `$f'(x) = ${n(m)}e^{x} + (${lin(m, p)})e^{x} = (${lin(m, m + p)})e^{x}$.`, `${bon}.`)
  );
}

function genDeriveeProduitMoins() {
  const m = nonNul(4), p = randomInt(-6, 6);
  const bon = $(`(${lin(-m, m - p)})e^{-x}`);
  return qcm(
    `${cadre()} Quelle est la dérivée de $f(x) = (${lin(m, p)})e^{-x}$ ?`,
    bon,
    [$(`(${lin(m, m + p)})e^{-x}`), $(`${n(-m)}e^{-x}`), $(`(${lin(-m, -m - p)})e^{-x}`), $(`(${lin(m, p - m)})e^{-x}`)],
    expl("$(uv)' = u'v + uv'$ et $(e^{-x})' = -e^{-x}$.", `$u = ${lin(m, p)}$, $u' = ${n(m)}$ ; $v = e^{-x}$, $v' = -e^{-x}$.`, `$f'(x) = ${n(m)}e^{-x} - (${lin(m, p)})e^{-x} = (${lin(-m, m - p)})e^{-x}$.`, `${bon}.`)
  );
}

function genDeriveeCarre() {
  const a = nonNul(4), b = randomInt(-5, 5);
  const u = `${a === 1 ? "" : a === -1 ? "-" : n(a)}x^{2}${plus(b)}`;
  const bon = $(`${n(2 * a)}xe^{${u}}`);
  return qcm(
    `${cadre()} Quelle est la dérivée de $f(x) = e^{${u}}$ ?`,
    bon,
    [$(`e^{${u}}`), $(`${n(2 * a)}e^{${u}}`), $(`(${u})e^{${u}}`), $(`${n(a)}xe^{${u}}`)],
    expl("$(e^u)' = u'e^u$.", `$u(x) = ${u}$, donc $u'(x) = ${lin(2 * a, 0)}$.`, `$f'(x) = ${lin(2 * a, 0)} \\times e^{${u}}$.`, `${bon}.`)
  );
}

function genDeriveeQuotient() {
  const m = randomInt(-5, 5);
  const den = m === 0 ? "x" : `x${plus(m)}`;
  const bon = $(`\\dfrac{(${lin(1, m - 1)})e^{x}}{(${den})^{2}}`);
  return qcm(
    `${cadre()} Quelle est la dérivée de $f(x) = \\dfrac{e^{x}}{${den}}$ ?`,
    bon,
    [$(`\\dfrac{(${lin(1, m + 1)})e^{x}}{(${den})^{2}}`), $(`\\dfrac{e^{x}}{(${den})^{2}}`), $(`e^{x}`), $(`\\dfrac{(${lin(1, m - 1)})e^{x}}{${den}}`)],
    expl("$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.", `$u = e^x$, $u' = e^x$ ; $v = ${den}$, $v' = 1$.`, `$f'(x) = \\dfrac{e^{x}(${den}) - e^{x}}{(${den})^{2}} = \\dfrac{(${lin(1, m - 1)})e^{x}}{(${den})^{2}}$.`, `${bon}.`)
  );
}

/* =========================================================
   EXP_EQUATION_INEQUATION
========================================================= */

/** a et b tels que la solution x de ax + b = c soit entière. */
function affineEntier() {
  const a = nonNul(5);
  const x = randomInt(-6, 6);
  const b = randomInt(-8, 8);
  return { a, b, x, c: a * x + b };
}

function genEquationExposants() {
  const { a, b, x, c } = affineEntier();
  return court(
    `${cadre()} Résous $e^{${lin(a, b)}} = ${eNum(c)}$. Quelle est la valeur de $x$ ?`,
    x,
    expl("$e^A = e^B \\iff A = B$.", "on égale les exposants, puis on résout l’équation du premier degré.", `$${lin(a, b)} = ${c}$, donc $${lin(a, 0)} = ${c - b}$.`, `$x = ${n(x)}$.`)
  );
}

function genEquationUn() {
  const a = nonNul(5), x = randomInt(-6, 6);
  const b = -a * x;
  return court(
    `${cadre()} Résous $e^{${lin(a, b)}} = 1$. Quelle est la valeur de $x$ ?`,
    x,
    expl("$1 = e^0$, et $e^A = e^B \\iff A = B$.", "on écrit $1$ sous la forme $e^0$.", `$${lin(a, b)} = 0$.`, `$x = ${n(x)}$.`)
  );
}

function genEquationDeuxExp() {
  let a = 0, c = 0;
  while (a === c) {
    a = nonNul(5);
    c = nonNul(5);
  }
  const x = randomInt(-5, 5);
  const b = randomInt(-6, 6);
  const d = (a - c) * x + b;
  return court(
    `${cadre()} Résous $e^{${lin(a, b)}} = e^{${lin(c, d)}}$. Quelle est la valeur de $x$ ?`,
    x,
    expl("$e^A = e^B \\iff A = B$.", "on égale les exposants et on regroupe les $x$.", `$${lin(a, b)} = ${lin(c, d)}$, donc $${lin(a - c, 0)} = ${d - b}$.`, `$x = ${n(x)}$.`)
  );
}

function genEquationProduitNul() {
  const r = nonNul(7), a = nonNul(4);
  return court(
    `${cadre()} Résous $(${lin(1, -r)})e^{${lin(a, 0)}} = 0$. Quelle est la valeur de $x$ ?`,
    r,
    expl("un produit est nul si l’un de ses facteurs est nul ; or $e^{X} > 0$.", "seul le facteur affine peut s’annuler.", `$e^{${lin(a, 0)}} \\neq 0$, donc $${lin(1, -r)} = 0$.`, `$x = ${n(r)}$.`)
  );
}

function genEquationSansSolution() {
  const { a, b } = affineEntier();
  const c = randomInt(1, 9);
  const forme = randomInt(0, 1);
  const eq = forme === 0 ? `e^{${lin(a, b)}} = -${c}` : `e^{${lin(a, b)}} + ${c} = 0`;
  const bon = "Aucune solution";
  return qcm(
    `${cadre()} Quelles sont les solutions de $${eq}$ ?`,
    bon,
    [`$x = ${n(c)}$`, `$x = -${n(c)}$`, "Une infinité de solutions", "$x = 0$"],
    expl("pour tout réel $X$, $e^X > 0$.", "on isole l’exponentielle et on regarde le signe de l’autre membre.", `$e^{${lin(a, b)}} = -${c}$, or $-${c} < 0$.`, "l’équation n’a aucune solution.")
  );
}

function genEquationCarre() {
  const s = randomInt(2, 6), c = randomInt(-5, 5);
  const d = s * s + c;
  const bon = `$x = -${s}$ ou $x = ${s}$`;
  return qcm(
    `${cadre()} Quelles sont les solutions de $e^{x^{2}${plus(c)}} = ${eNum(d)}$ ?`,
    bon,
    [`$x = ${s}$ seulement`, `$x = ${s * s}$`, `$x = -${s * s}$ ou $x = ${s * s}$`, "Aucune solution"],
    expl("$e^A = e^B \\iff A = B$.", "on égale les exposants ; $x^2 = k$ avec $k > 0$ a deux solutions.", `$x^{2}${plus(c)} = ${d}$, donc $x^2 = ${s * s}$.`, `${bon}.`)
  );
}

type Signe = "<" | ">" | "\\le" | "\\ge";

function intervalle(sens: "gauche" | "droite", x0: number, large: boolean) {
  return sens === "droite"
    ? `$${large ? "[" : "]"}${n(x0)}\\,;+\\infty[$`
    : `$]-\\infty\\,;${n(x0)}${large ? "]" : "["}$`;
}

function genInequation() {
  const { a, b, x, c } = affineEntier();
  const sg = randomChoice<Signe>(["<", ">", "\\le", "\\ge"]);
  const large = sg === "\\le" || sg === "\\ge";
  const versDroite = (sg === ">" || sg === "\\ge") === a > 0;
  const second = c === 0 ? randomChoice(["1", eNum(0)]) : eNum(c);
  const bon = intervalle(versDroite ? "droite" : "gauche", x, large);
  return qcm(
    `${cadre()} Résous l’inéquation $e^{${lin(a, b)}} ${sg} ${second}$. Quel est l’ensemble des solutions ?`,
    bon,
    [intervalle(versDroite ? "gauche" : "droite", x, large), intervalle(versDroite ? "droite" : "gauche", x, !large), intervalle(versDroite ? "droite" : "gauche", -x === x ? x + 1 : -x, large)],
    expl("l’exponentielle est strictement croissante : $e^A < e^B \\iff A < B$.", `on compare les exposants${a < 0 ? " ; en divisant par un nombre négatif, on change le sens" : ""}.`, `$${lin(a, b)} ${sg} ${c}$, donc $${lin(a, 0)} ${sg} ${c - b}$.`, `l’ensemble des solutions est ${bon}.`)
  );
}

/* =========================================================
   EXP_LIMITE
========================================================= */

const LIMITES = ["$+\\infty$", "$0$", "$-\\infty$", "$1$"];

function genLimiteSimple() {
  const a = nonNul(5);
  const versPlus = randomInt(0, 1) === 1;
  const bon = (a > 0) === versPlus ? "$+\\infty$" : "$0$";
  return qcm(
    `${cadre()} Que vaut $\\displaystyle\\lim_{x \\to ${versPlus ? "+" : "-"}\\infty} e^{${lin(a, 0)}}$ ?`,
    bon,
    LIMITES.filter((l) => l !== bon),
    expl("$\\lim_{X \\to +\\infty} e^X = +\\infty$ et $\\lim_{X \\to -\\infty} e^X = 0$.", "on cherche d’abord la limite de l’exposant.", `quand $x \\to ${versPlus ? "+" : "-"}\\infty$, $${lin(a, 0)} \\to ${(a > 0) === versPlus ? "+" : "-"}\\infty$.`, `la limite vaut ${bon}.`)
  );
}

function genLimiteConstante() {
  const k = nonNul(8), c = nonNul(9);
  const plusInf = randomInt(0, 1) === 1;
  const f = plusInf ? `${ke(k, "-x")}${plus(c)}` : `${ke(k, "x")}${plus(c)}`;
  const bon = $(n(c));
  return qcm(
    `${cadre()} Que vaut $\\displaystyle\\lim_{x \\to ${plusInf ? "+" : "-"}\\infty} \\left(${f}\\right)$ ?`,
    bon,
    ["$+\\infty$", "$-\\infty$", $(n(k)), $(n(k + c)), "$0$"],
    expl("$e^{X} \\to 0$ quand $X \\to -\\infty$.", "l’exponentielle tend vers $0$, il reste la constante.", `$${ke(k, plusInf ? "-x" : "x")} \\to 0$.`, `la limite vaut $${n(c)}$.`)
  );
}

function genAsymptote() {
  const k = nonNul(6), c = nonNul(9);
  const a = nonNul(3);
  const cote = a > 0 ? "-" : "+";
  const bon = `La droite $y = ${n(c)}$`;
  return qcm(
    `${cadre()} La courbe de $f(x) = ${n(c)} ${k < 0 ? "-" : "+"} ${ke(Math.abs(k), lin(a, 0))}$ admet une asymptote en $${cote}\\infty$. Laquelle ?`,
    bon,
    [`La droite $y = ${n(Math.abs(k))}$`, `La droite $x = ${n(c)}$`, "La droite $y = 0$", `La droite $y = ${n(c + k)}$`],
    expl("si $\\lim f = c$ en l’infini, la droite $y = c$ est asymptote horizontale.", `en $${cote}\\infty$, l’exposant $${lin(a, 0)}$ tend vers $-\\infty$.`, `$e^{${lin(a, 0)}} \\to 0$, donc $f(x) \\to ${n(c)}$.`, `${bon} est asymptote.`)
  );
}

function genLimiteQuotient() {
  const m = randomInt(1, 6), q = randomInt(1, 6);
  const k = m * q;
  const bon = $(n(q));
  return qcm(
    `${cadre()} Que vaut $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{${k}}{${m} + e^{-x}}$ ?`,
    bon,
    ["$+\\infty$", "$0$", $(n(k)), $(n(k + 1))],
    expl("$\\lim_{x \\to +\\infty} e^{-x} = 0$.", "on cherche la limite du dénominateur.", `$${m} + e^{-x} \\to ${m}$.`, `la limite vaut $\\dfrac{${k}}{${m}} = ${n(q)}$.`)
  );
}

function genCroissancesComparees() {
  const p = randomInt(1, 5);
  const k = randomInt(1, 9);
  const xp = p === 1 ? "x" : `x^{${p}}`;
  const kk = k === 1 ? "" : String(k);
  const cas: Array<[string, string, string]> = [
    [`\\lim_{x \\to +\\infty} \\dfrac{${kk}e^{x}}{${xp}}`, "$+\\infty$", "l’exponentielle l’emporte sur toute puissance de $x$."],
    [`\\lim_{x \\to +\\infty} ${kk}${xp}e^{-x}`, "$0$", `$${xp}e^{-x} = \\dfrac{${xp}}{e^{x}}$ et l’exponentielle l’emporte.`],
    [`\\lim_{x \\to -\\infty} ${kk}${xp}e^{x}`, "$0$", "en $-\\infty$, $x^n e^x \\to 0$ : l’exponentielle l’emporte."],
    [`\\lim_{x \\to +\\infty} \\dfrac{${kk}${xp}}{e^{x}}`, "$0$", "l’exponentielle au dénominateur l’emporte."],
  ];
  const [lim, bon, pourquoi] = randomChoice(cas);
  return qcm(
    `${cadre()} Par croissances comparées, que vaut $\\displaystyle${lim}$ ?`,
    bon,
    LIMITES.filter((l) => l !== bon),
    expl("croissances comparées : pour tout entier $n$, $\\dfrac{e^x}{x^n} \\to +\\infty$ en $+\\infty$ et $x^n e^x \\to 0$ en $-\\infty$.", "on reconnaît une forme indéterminée et on applique le cours.", pourquoi, `la limite vaut ${bon}.`)
  );
}

function genFormeIndeterminee() {
  const m = randomInt(1, 9);
  const p = randomInt(1, 3);
  const xp = p === 1 ? "x" : `x^{${p}}`;
  const sens = randomInt(0, 1);
  const f = sens === 0 ? `e^{x} - ${m}${xp}` : `${m}${xp} - e^{x}`;
  const bon = sens === 0 ? "$+\\infty$" : "$-\\infty$";
  return qcm(
    `${cadre()} Que vaut $\\displaystyle\\lim_{x \\to +\\infty} \\left(${f}\\right)$ ?`,
    bon,
    LIMITES.filter((l) => l !== bon),
    expl("« $+\\infty - \\infty$ » est une forme indéterminée : on factorise.", `on met $${xp}$ en facteur : $${xp}\\left(\\dfrac{e^{x}}{${xp}} - ${m}\\right)$.`, `$\\dfrac{e^{x}}{${xp}} \\to +\\infty$ par croissances comparées.`, `la limite vaut ${bon}.`)
  );
}

function genLimiteReference() {
  const k = nonNul(6);
  return court(
    `${cadre()} On sait que $\\displaystyle\\lim_{h \\to 0} \\dfrac{e^{h} - 1}{h} = 1$. Que vaut $\\displaystyle\\lim_{x \\to 0} \\dfrac{e^{${lin(k, 0)}} - 1}{x}$ ?`,
    k,
    expl("$\\lim_{h \\to 0} \\dfrac{e^h - 1}{h} = 1$ : c’est le nombre dérivé de $e^x$ en $0$.", `on pose $h = ${lin(k, 0)}$ : $\\dfrac{e^{${lin(k, 0)}} - 1}{x} = ${n(k)} \\times \\dfrac{e^{h} - 1}{h}$.`, `quand $x \\to 0$, $h \\to 0$.`, `la limite vaut $${n(k)}$.`)
  );
}

/* =========================================================
   EXP_DEFI — Exercice type bac
========================================================= */

function genDefiDerivee() {
  const p = randomInt(-6, 5);
  const bon = $(`(${lin(1, p + 1)})e^{x}`);
  return qcm(
    `${cadre()} Partie A. Soit $f(x) = (${lin(1, p)})e^{x}$ sur $\\mathbb{R}$. Quelle est sa dérivée ?`,
    bon,
    [$(`e^{x}`), $(`(${lin(1, p)})e^{x}`), $(`(${lin(1, p - 1)})e^{x}`), $(`xe^{x}${plus(p)}`)],
    expl("$(uv)' = u'v + uv'$.", `$u = ${lin(1, p)}$, $u' = 1$ ; $v = v' = e^x$.`, `$f'(x) = e^{x} + (${lin(1, p)})e^{x}$.`, `${bon}.`)
  );
}

function genDefiAnnulation() {
  const p = randomInt(-6, 5);
  return court(
    `${cadre()} Partie B. Soit $f(x) = (${lin(1, p)})e^{x}$, de dérivée $f'(x) = (${lin(1, p + 1)})e^{x}$. En quelle valeur de $x$ la dérivée s’annule-t-elle ?`,
    -(p + 1),
    expl("$e^x > 0$ : $f'(x)$ a le signe de $" + lin(1, p + 1) + "$.", "on résout $f'(x) = 0$.", `$${lin(1, p + 1)} = 0$.`, `$x = ${n(-(p + 1))}$.`)
  );
}

function genDefiVariation() {
  const p = randomInt(-6, 5);
  const x0 = -(p + 1);
  const decroit = randomInt(0, 1) === 1;
  const g = `$]-\\infty\\,;${n(x0)}]$`, d = `$[${n(x0)}\\,;+\\infty[$`;
  const bon = decroit ? g : d;
  return qcm(
    `${cadre()} Partie B. Soit $f(x) = (${lin(1, p)})e^{x}$, de dérivée $f'(x) = (${lin(1, p + 1)})e^{x}$. Sur quel intervalle $f$ est-elle ${decroit ? "décroissante" : "croissante"} ?`,
    bon,
    [decroit ? d : g, `$]-\\infty\\,;${n(-p)}]$`, `$[${n(-p)}\\,;+\\infty[$`, "$\\mathbb{R}$"],
    expl("$f' \\le 0$ : $f$ décroissante ; $f' \\ge 0$ : $f$ croissante.", `$e^x > 0$, donc $f'(x)$ a le signe de $${lin(1, p + 1)}$.`, `$${lin(1, p + 1)} \\le 0 \\iff x \\le ${n(x0)}$.`, `$f$ est ${decroit ? "décroissante" : "croissante"} sur ${bon}.`)
  );
}

function genDefiMinimum() {
  const c = randomInt(-6, 6);
  const demandeValeur = randomInt(0, 1) === 1;
  const g = `e^{x} - x${plus(c)}`;
  return demandeValeur
    ? court(
        `${cadre()} Soit $g(x) = ${g}$. Son minimum est atteint en $x = 0$. Quelle est la valeur de ce minimum ?`,
        1 + c,
        expl("le minimum est l’image du point où $g'$ s’annule.", "on calcule $g(0)$.", `$g(0) = e^{0} - 0${plus(c)} = 1${plus(c)}$.`, `le minimum vaut $${n(1 + c)}$.`)
      )
    : court(
        `${cadre()} Soit $g(x) = ${g}$. En quelle valeur de $x$ la dérivée $g'$ s’annule-t-elle ?`,
        0,
        expl("$(e^x)' = e^x$ et $(x)' = 1$.", "on dérive, puis on résout $g'(x) = 0$.", "$g'(x) = e^{x} - 1 = 0 \\iff e^{x} = 1 \\iff x = 0$.", "$x = 0$.")
      );
}

function genDefiPic() {
  const A = randomChoice([2, 4, 5, 10, 20]);
  const b = randomChoice([1, 0.5, 0.25, 0.2]);
  const bt = b === 1 ? "t" : `${n(b)}t`;
  const [qui, quoi] = randomChoice<[string, string]>([
    ["Une pharmacienne", "la concentration d’un médicament dans le sang, en mg/L"],
    ["Une épidémiologiste", "le nombre de nouveaux cas d’une grippe, en centaines"],
    ["Un hydrologue", "le débit d’une rivière après un orage, en m³/s"],
    ["Une community manager", "le nombre de vues par heure d’une vidéo, en milliers"],
    ["Un agronome", "la quantité d’azote libérée par un engrais, en kg"],
    ["Une ingénieure du son", "le volume d’une note de piano, en unités arbitraires"],
  ]);
  return court(
    `${qui} modélise ${quoi} par $f(t) = ${A}te^{-${bt}}$, avec $t \\ge 0$. On admet que $f'(t) = ${A}(1 - ${b === 1 ? "" : n(b)}t)e^{-${bt}}$. En quel instant $t$ le maximum est-il atteint ?`,
    1 / b,
    expl("le maximum est là où la dérivée s’annule en passant du positif au négatif.", "$e^{-" + bt + "} > 0$ : $f'(t)$ a le signe de $1 - " + (b === 1 ? "" : n(b)) + "t$.", `$1 - ${b === 1 ? "" : n(b)}t = 0 \\iff t = ${n(1 / b)}$ ; positive avant, négative après.`, `le maximum est atteint en $t = ${n(1 / b)}$.`)
  );
}

function genDefiValeurMax() {
  const A = randomInt(2, 9);
  const bon = $(`\\dfrac{${A}}{e}`);
  return qcm(
    `${cadre()} Soit $f(x) = ${A}xe^{-x}$ sur $[0\\,;+\\infty[$, maximale en $x = 1$. Quelle est la valeur de ce maximum ?`,
    bon,
    [$(n(A)), $(`${A}e`), $(`\\dfrac{1}{e}`), $(`\\dfrac{${A}}{e^{2}}`)],
    expl("le maximum est l’image du point où il est atteint.", "on remplace $x$ par $1$.", `$f(1) = ${A} \\times 1 \\times e^{-1} = \\dfrac{${A}}{e}$.`, `le maximum vaut $\\dfrac{${A}}{e} \\approx ${n(A / Math.E)}$.`)
  );
}

function genDefiTangente() {
  const a = randomChoice([-2, -1, 1, 2, 3]);
  const ea = eNum(a);
  const reste = 1 - a;
  const bon = reste === 0 ? `$y = ${ea}x$` : `$y = ${ea}(${lin(1, reste)})$`;
  return qcm(
    `${cadre()} Quelle est l’équation de la tangente à la courbe de $x \\mapsto e^{x}$ au point d’abscisse $${a}$ ?`,
    bon,
    [`$y = ${ea}x$`, `$y = ${ea}(${lin(1, a)})$`, `$y = ${ea}(${lin(1, 1 + a)})$`, `$y = x + 1$`].filter((x) => x !== bon),
    expl("tangente en $a$ : $y = f'(a)(x - a) + f(a)$.", "pour l’exponentielle, $f(a) = f'(a) = e^a$.", `$y = ${ea}(${lin(1, -a)}) + ${ea} = ${ea}(${lin(1, reste)})$.`, `${bon}.`)
  );
}

function genDefiSigne() {
  const r = nonNul(6), k = nonNul(3);
  const bon = `$]${n(r)}\\,;+\\infty[$`;
  return qcm(
    `${cadre()} Pour une fonction $f$, on obtient $f'(x) = (${lin(1, -r)})e^{${lin(k, 0)}}$. Sur quel intervalle a-t-on $f'(x) > 0$ ?`,
    bon,
    [`$]-\\infty\\,;${n(r)}[$`, "$\\mathbb{R}$", `$]${n(-r)}\\,;+\\infty[$`, `$]0\\,;+\\infty[$`],
    expl("pour tout réel $X$, $e^X > 0$.", `$f'(x)$ a donc le signe de $${lin(1, -r)}$.`, `$${lin(1, -r)} > 0 \\iff x > ${n(r)}$.`, `$f'(x) > 0$ sur ${bon}.`)
  );
}

function genDefiLimite() {
  const m = nonNul(5), p = randomInt(-6, 6);
  const enPlus = randomInt(0, 1) === 1;
  const f = enPlus ? `(${lin(m, p)})e^{-x}` : `(${lin(m, p)})e^{x}`;
  return qcm(
    `${cadre()} Partie C. Que vaut $\\displaystyle\\lim_{x \\to ${enPlus ? "+" : "-"}\\infty} ${f}$ ?`,
    "$0$",
    ["$+\\infty$", "$-\\infty$", $(n(m))],
    expl("croissances comparées : $xe^{-x} \\to 0$ en $+\\infty$ et $xe^{x} \\to 0$ en $-\\infty$.", "on développe et on traite chaque terme.", enPlus ? `$${n(m)}xe^{-x} \\to 0$ et $${n(p)}e^{-x} \\to 0$.` : `$${n(m)}xe^{x} \\to 0$ et $${n(p)}e^{x} \\to 0$.`, "la limite vaut $0$.")
  );
}

/* =========================================================
   GABARITS ET FUSION
========================================================= */

function tpl(microId: string, difficulty: number, rang: number, generate: () => TutorGeneratedQuestionV4, hint: string): TutorBankItemV4 {
  return {
    kind: "template",
    id: `terminale_spe_exp_renfort_${microId}_${difficulty}_${rang}`,
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "fonction_exponentielle",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["terminale-spe", "exponentielle", "renfort", "template"],
    generate,
  } as TutorBankItemV4;
}

const H_DEF = "eˣ > 0, e⁰ = 1, (eˣ)' = eˣ : l'exponentielle est strictement croissante.";
const H_PROP = "eᵃ × eᵇ = eᵃ⁺ᵇ ; eᵃ / eᵇ = eᵃ⁻ᵇ ; (eᵃ)ⁿ = eⁿᵃ ; e⁻ᵃ = 1/eᵃ.";
const H_DER = "(eᵘ)' = u'eᵘ ; (uv)' = u'v + uv'.";
const H_EQ = "eᴬ = eᴮ ⟺ A = B ; eᴬ < eᴮ ⟺ A < B ; et eˣ > 0 toujours.";
const H_LIM = "eˣ → +∞ en +∞, eˣ → 0 en −∞ ; l'exponentielle l'emporte sur xⁿ.";
const H_DEFI = "Dérive, étudie le signe (eˣ > 0), puis conclus.";

type Ligne = [string, number, () => TutorGeneratedQuestionV4, string];

const LIGNES: Ligne[] = [
  ["exp_definition", 1, genValeurEnZero, H_DEF],
  ["exp_definition", 1, genValeurApprochee, "e ≈ 2,718."],
  ["exp_definition", 1, genSigneExp, H_DEF],
  ["exp_definition", 2, genSigneExp, H_DEF],
  ["exp_definition", 2, genNombreSolutions, H_DEF],
  ["exp_definition", 2, genValeurEnZero, H_DEF],
  ["exp_definition", 2, genComparer, H_DEF],
  ["exp_definition", 3, genComparer, H_DEF],
  ["exp_definition", 3, genSensVariation, H_DEF],
  ["exp_definition", 3, genEgaleSaDerivee, H_DEF],
  ["exp_definition", 3, genNombreSolutions, H_DEF],
  ["exp_definition", 4, genTangenteEnZero, "Tangente en 0 : y = f'(0)x + f(0)."],
  ["exp_definition", 4, genEgaleSaDerivee, H_DEF],
  ["exp_definition", 4, genSensVariation, H_DEF],

  ["exp_proprietes", 2, genProduit, H_PROP],
  ["exp_proprietes", 2, genQuotient, H_PROP],
  ["exp_proprietes", 2, genInverse, H_PROP],
  ["exp_proprietes", 3, genPuissance, H_PROP],
  ["exp_proprietes", 3, genCombine, H_PROP],
  ["exp_proprietes", 3, genVraiFaux, H_PROP],
  ["exp_proprietes", 3, genQuotient, H_PROP],
  ["exp_proprietes", 4, genAvecX, H_PROP],
  ["exp_proprietes", 4, genDevelopper, "(A + B)² = A² + 2AB + B², et (eˣ)² = e²ˣ."],
  ["exp_proprietes", 4, genFactoriser, "e²ˣ = eˣ × eˣ."],
  ["exp_proprietes", 4, genVraiFaux, H_PROP],

  ["exp_deriver", 2, genDeriveeAffine, H_DER],
  ["exp_deriver", 2, genNombreDerive, H_DER],
  ["exp_deriver", 2, genDeriveeSomme, H_DER],
  ["exp_deriver", 3, genDeriveeAffine, H_DER],
  ["exp_deriver", 3, genDeriveeContexte, H_DER],
  ["exp_deriver", 3, genDeriveeSomme, H_DER],
  ["exp_deriver", 4, genDeriveeProduit, H_DER],
  ["exp_deriver", 4, genDeriveeProduitMoins, H_DER],
  ["exp_deriver", 4, genDeriveeContexte, H_DER],
  ["exp_deriver", 5, genDeriveeCarre, H_DER],
  ["exp_deriver", 5, genDeriveeQuotient, "(u/v)' = (u'v − uv')/v²."],
  ["exp_deriver", 5, genDeriveeProduitMoins, H_DER],

  ["exp_equation_inequation", 2, genEquationExposants, H_EQ],
  ["exp_equation_inequation", 2, genEquationUn, "1 = e⁰."],
  ["exp_equation_inequation", 2, genEquationSansSolution, H_EQ],
  ["exp_equation_inequation", 3, genEquationDeuxExp, H_EQ],
  ["exp_equation_inequation", 3, genEquationProduitNul, "eˣ ne s'annule jamais."],
  ["exp_equation_inequation", 3, genInequation, H_EQ],
  ["exp_equation_inequation", 3, genEquationSansSolution, H_EQ],
  ["exp_equation_inequation", 4, genInequation, H_EQ],
  ["exp_equation_inequation", 4, genEquationCarre, H_EQ],
  ["exp_equation_inequation", 4, genEquationDeuxExp, H_EQ],

  ["exp_limite", 2, genLimiteSimple, H_LIM],
  ["exp_limite", 2, genLimiteConstante, H_LIM],
  ["exp_limite", 2, genAsymptote, H_LIM],
  ["exp_limite", 3, genLimiteConstante, H_LIM],
  ["exp_limite", 3, genAsymptote, H_LIM],
  ["exp_limite", 3, genLimiteQuotient, H_LIM],
  ["exp_limite", 4, genCroissancesComparees, H_LIM],
  ["exp_limite", 4, genLimiteQuotient, H_LIM],
  ["exp_limite", 4, genFormeIndeterminee, H_LIM],
  ["exp_limite", 5, genFormeIndeterminee, H_LIM],
  ["exp_limite", 5, genLimiteReference, "(eʰ − 1)/h → 1 quand h → 0."],
  ["exp_limite", 5, genCroissancesComparees, H_LIM],

  ["exp_defi", 4, genDefiDerivee, H_DEFI],
  ["exp_defi", 4, genDefiAnnulation, H_DEFI],
  ["exp_defi", 4, genDefiMinimum, H_DEFI],
  ["exp_defi", 4, genDefiTangente, "Tangente en a : y = f'(a)(x − a) + f(a)."],
  ["exp_defi", 4, genDefiSigne, H_DEFI],
  ["exp_defi", 5, genDefiVariation, H_DEFI],
  ["exp_defi", 5, genDefiPic, H_DEFI],
  ["exp_defi", 5, genDefiValeurMax, H_DEFI],
  ["exp_defi", 5, genDefiLimite, H_LIM],
  ["exp_defi", 5, genDefiMinimum, H_DEFI],
];

export const renfortExponentielle: TutorBankItemV4[] = (() => {
  const rangs = new Map<string, number>();
  return LIGNES.map(([micro, d, g, h]) => {
    const cle = `${micro}_${d}`;
    const r = (rangs.get(cle) ?? 0) + 1;
    rangs.set(cle, r);
    return tpl(micro, d, r, g, h);
  });
})();
