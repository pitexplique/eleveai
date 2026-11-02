// Renfort dérivation de Terminale spé (02/11/2026).
//
// Mesure du 02/11 (scripts/mesurer-squelettes-coach.ts terminale-spe
// derivation_fonction) : 7 à 10 squelettes par micro, 70 items dont 59 figés,
// 13 à 18 répétitions sur 20 à chaque étoile. On branche des générateurs, sur
// le modèle de convexite-renfort.ts : familles de fonctions × tournures ×
// situations (physique, économie, santé, sport, ingénierie, numérique : les
// maths sont transversales). Aucune question « open » : QCM dès que la réponse
// est une expression, réponse courte seulement pour un nombre.

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { makeChoices } from "@/lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
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

/** x^p en LaTeX (« x », « x^{3} »). */
function pw(v: string, p: number) {
  return p === 1 ? v : `${v}^{${p}}`;
}

/** Polynôme en LaTeX à partir de [coefficient, puissance], sans les termes nuls. */
function poly(termes: Array<[number, number]>, v = "x") {
  let s = "";
  for (const [c, p] of termes) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const corps = p === 0 ? n(abs) : `${abs === 1 ? "" : n(abs)}${pw(v, p)}`;
    if (!s) s = (c < 0 ? "-" : "") + corps;
    else s += (c < 0 ? " - " : " + ") + corps;
  }
  return s || "0";
}

const lin = (a: number, b: number, v = "x") => poly([[a, 1], [b, 0]], v);

/** Coefficient devant une parenthèse ou une fonction : « », « - », « 3 ». */
function cs(k: number) {
  return k === 1 ? "" : k === -1 ? "-" : n(k);
}

/** Fraction signée : « -\dfrac{3}{x^2} ». */
function frac(num: number, den: string) {
  return num < 0 ? `-\\dfrac{${n(-num)}}{${den}}` : `\\dfrac{${n(num)}}{${den}}`;
}

/** « + 3 », « - 2 », « » (pour 0) : un terme ajouté à une expression. */
function plus(x: number) {
  return x === 0 ? "" : x < 0 ? ` - ${n(-x)}` : ` + ${n(x)}`;
}

/** Nombre entre parenthèses s'il est négatif (dans un produit). */
function pn(x: number) {
  return x < 0 ? `(${n(x)})` : n(x);
}

/** e^k en LaTeX : « 1 », « e », « e^{-2} ». */
function expE(k: number) {
  return k === 0 ? "1" : k === 1 ? "e" : `e^{${k}}`;
}

/** (x + m) en LaTeX : « x + 3 », « x - 2 », « x ». */
function xPlus(m: number) {
  return m === 0 ? "x" : m > 0 ? `x + ${n(m)}` : `x - ${n(-m)}`;
}

/** Facteur (x − r) d'un produit : « x » quand r = 0. */
function fac(r: number) {
  return r === 0 ? "x" : `(${xPlus(-r)})`;
}

/** Évaluation d'un polynôme [coefficient, puissance]. */
function evalPoly(termes: Array<[number, number]>, x: number) {
  return termes.reduce((s, [c, p]) => s + c * x ** p, 0);
}

function derivPoly(termes: Array<[number, number]>): Array<[number, number]> {
  return termes.filter(([, p]) => p > 0).map(([c, p]) => [c * p, p - 1]);
}

const R = "$\\mathbb{R}$";
const gauche = (k: number) => `$]-\\infty\\,;${n(k)}]$`;
const droite = (k: number) => `$[${n(k)}\\,;+\\infty[$`;
const ferme = (a: number, b: number) => `$[${n(a)}\\,;${n(b)}]$`;

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul / Observation : ${calcul}\n\nConclusion : ${conclusion}`;
}

/** Écriture usuelle : « (x)e^x » → « xe^x », « (-x)e » → « -xe », « 1e^{…} » → « e^{…} ». */
function propre(s: string) {
  return s
    .replace(/\((-?(?:\d+(?:\{,\}\d+)?)?x)\)e/g, "$1e")
    .replace(/\((-?\d+(?:\{,\}\d+)?)\)e/g, "$1e")
    .replace(/(^|[^\d}])1e\^/g, "$1e^");
}

function qcm(text: string, correct: string, pieges: string[], explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  const bon = propre(correct);
  return { text: propre(text), format: "qcm", choices: makeChoices(bon, pieges.map(propre)), expected: [bon], comparator: "mcq_exact", explanation: propre(explanation), ...(canvas ? { canvas } : {}) };
}

function court(text: string, valeur: number, explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  return { text: propre(text), format: "short", expected: [fr(valeur)], comparator: "number_equal", explanation: propre(explanation), ...(canvas ? { canvas } : {}) };
}

const $ = (s: string) => `$${s}$`;

/** « Une physicienne » → « une physicienne ». */
function minuscule(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/** « le nombre » → « du nombre », « la masse » → « de la masse ». */
function de(gn: string) {
  return gn.startsWith("le ") ? `du ${gn.slice(3)}` : gn.startsWith("un ") || gn.startsWith("une ") ? `d’${gn}` : `de ${gn}`;
}

/** Des grandeurs positives qui varient dans le temps : [qui, quoi, lettre, unité de t]. */
const METIERS: Array<[string, string, string, string]> = [
  ["Une physicienne", "la position d’un chariot sur un rail", "p", "secondes"],
  ["Un ingénieur en aéronautique", "l’altitude d’un drone", "h", "secondes"],
  ["Une pharmacologue", "la quantité de médicament absorbée", "Q", "heures"],
  ["Un biologiste", "la masse d’une culture de levures", "m", "heures"],
  ["Une économiste", "le chiffre d’affaires d’une jeune entreprise", "R", "mois"],
  ["Un hydrologue", "le volume d’eau d’un réservoir", "V", "heures"],
  ["Une entraîneuse d’athlétisme", "la distance parcourue par une sprinteuse", "d", "secondes"],
  ["Une ingénieure en électronique", "la charge d’un condensateur", "q", "millisecondes"],
  ["Un développeur de jeux vidéo", "la distance parcourue par un personnage", "d", "secondes"],
  ["Une data scientist", "le nombre d’utilisateurs d’une application, en milliers", "U", "semaines"],
  ["Un agronome", "la hauteur d’un plant de maïs", "H", "jours"],
  ["Une banquière", "la valeur d’un placement", "S", "années"],
  ["Un logisticien", "le nombre de colis expédiés depuis le matin", "N", "heures"],
  ["Une épidémiologiste", "le nombre total de personnes vaccinées, en milliers", "M", "jours"],
  ["Un chimiste", "la quantité de produit formé dans une réaction", "Q", "minutes"],
  ["Une cycliste professionnelle", "l’énergie dépensée pendant un effort", "E", "minutes"],
  ["Un garde forestier", "la surface d’une forêt replantée", "A", "années"],
  ["Une gérante de cinéma", "le nombre total d’entrées d’un film, en milliers", "E", "semaines"],
  ["Un ingénieur en génie civil", "l’enfoncement d’un pieu dans le sol", "s", "minutes"],
  ["Une astronome", "la distance parcourue par une sonde, en millions de km", "D", "jours"],
  ["Un ostéopathe", "l’amplitude d’un mouvement pendant une rééducation", "a", "semaines"],
  ["Une ingénieure en batteries", "l’énergie stockée dans une batterie", "W", "minutes"],
  ["Un brasseur", "le volume de gaz dégagé par une fermentation", "V", "heures"],
  ["Une volcanologue de l’observatoire du Piton de la Fournaise", "le volume de lave émis", "V", "heures"],
];

/** Des grandeurs qui oscillent : [qui, quoi, lettre, unité de t]. */
const OSCILLE: Array<[string, string, string, string]> = [
  ["Une océanographe", "l’écart de la marée à son niveau moyen", "h", "heures"],
  ["Une sismologue", "le déplacement du sol pendant une secousse", "s", "secondes"],
  ["Un ingénieur du son", "la pression d’une onde sonore", "p", "millisecondes"],
  ["Une cardiologue", "un signal électrique du cœur", "u", "secondes"],
  ["Un électricien", "la tension du secteur", "u", "millisecondes"],
];

/* =========================================================
   FAMILLES DE FONCTIONS USUELLES
========================================================= */

type Corps = (k: number) => string;
type Terme = [number, Corps];

const coef = (k: number) => (k === 1 ? "" : n(k));
const M = (p: number, v: string): Corps => (k) => (p === 0 ? n(k) : `${coef(k)}${pw(v, p)}`);
const Fr = (den: string): Corps => (k) => `\\dfrac{${n(k)}}{${den}}`;
const B = (corps: string): Corps => (k) => `${coef(k)}${corps}`;

/** Somme de termes c·corps, avec les signes. */
function somme(termes: Terme[]) {
  let s = "";
  for (const [c, corps] of termes) {
    if (Math.abs(c) < 1e-12) continue;
    const t = corps(Math.abs(c));
    if (!s) s = (c < 0 ? "-" : "") + t;
    else s += (c < 0 ? " - " : " + ") + t;
  }
  return s || "0";
}

type Fam = {
  nom: string;
  f: Corps;
  /** Dérivée de f : [multiplicateur du coefficient, corps]. */
  d: Terme;
  /** Erreurs typiques : [multiplicateur du coefficient, corps]. */
  faux: Terme[];
  /** Définie (ou dérivable) seulement pour v > 0. */
  pos: boolean;
  regle: string;
};

/** p : exposant tiré par l'appelant (2 à 7), pour retrouver la même famille en x et en t. */
function famille(nom: string, v: string, p = randomInt(2, 7)): Fam {
  const q = 2 + (p % 2);
  switch (nom) {
    case "puissance":
      return { nom, f: M(p, v), d: [p, M(p - 1, v)], faux: [[1, M(p - 1, v)], [p, M(p, v)], [p - 1, M(p - 1, v)], [p, M(0, v)]], pos: false, regle: `$(${v}^n)' = n${v}^{n-1}$` };
    case "identite":
      return { nom, f: M(1, v), d: [1, M(0, v)], faux: [[1, M(1, v)], [0, M(0, v)], [0.5, M(2, v)]], pos: false, regle: `$(${v})' = 1$` };
    case "constante":
      return { nom, f: M(0, v), d: [0, M(0, v)], faux: [[1, M(0, v)], [1, M(1, v)], [0.5, M(0, v)]], pos: false, regle: "la dérivée d’une constante est nulle" };
    case "inverse":
      return { nom, f: Fr(v), d: [-1, Fr(pw(v, 2))], faux: [[1, Fr(pw(v, 2))], [1, B(`\\ln ${v}`)], [-1, Fr(v)], [-1, Fr(`2${v}`)]], pos: true, regle: `$\\left(\\dfrac{1}{${v}}\\right)' = -\\dfrac{1}{${v}^2}$` };
    case "racine":
      return { nom, f: B(`\\sqrt{${v}}`), d: [1, Fr(`2\\sqrt{${v}}`)], faux: [[1, Fr(`\\sqrt{${v}}`)], [2, B(`\\sqrt{${v}}`)], [1, Fr(`2${v}`)], [0.5, B(`\\sqrt{${v}}`)]], pos: true, regle: `$(\\sqrt{${v}})' = \\dfrac{1}{2\\sqrt{${v}}}$` };
    case "exp":
      return { nom, f: B(`e^{${v}}`), d: [1, B(`e^{${v}}`)], faux: [[1, B(`${v}e^{${v}-1}`)], [-1, B(`e^{${v}}`)], [1, Fr(`e^{${v}}`)], [1, B(`e^{${v}-1}`)]], pos: false, regle: `$(e^{${v}})' = e^{${v}}$` };
    case "ln":
      return { nom, f: B(`\\ln ${v}`), d: [1, Fr(v)], faux: [[1, Fr(`\\ln ${v}`)], [-1, Fr(pw(v, 2))], [1, B(`e^{${v}}`)], [-1, Fr(v)]], pos: true, regle: `$(\\ln ${v})' = \\dfrac{1}{${v}}$` };
    case "cos":
      return { nom, f: B(`\\cos ${v}`), d: [-1, B(`\\sin ${v}`)], faux: [[1, B(`\\sin ${v}`)], [-1, B(`\\cos ${v}`)], [1, B(`\\cos ${v}`)]], pos: false, regle: `$(\\cos ${v})' = -\\sin ${v}$` };
    case "sin":
      return { nom, f: B(`\\sin ${v}`), d: [1, B(`\\cos ${v}`)], faux: [[-1, B(`\\cos ${v}`)], [-1, B(`\\sin ${v}`)], [1, B(`\\sin ${v}`)]], pos: false, regle: `$(\\sin ${v})' = \\cos ${v}$` };
    default:
      // inverse d'une puissance : 1/v^q
      return {
        nom,
        f: Fr(pw(v, q)),
        d: [-q, Fr(pw(v, q + 1))],
        faux: [[q, Fr(pw(v, q + 1))], [-q, Fr(pw(v, q - 1))], [-1, Fr(pw(v, q + 1))], [1, Fr(pw(v, q - 1))]],
        pos: true,
        regle: `$\\left(\\dfrac{1}{${v}^n}\\right)' = -\\dfrac{n}{${v}^{n+1}}$`,
      };
  }
}

const NOMS_1 = ["puissance", "puissance", "identite", "constante"];
const NOMS_2 = ["inverse", "racine", "exp", "ln", "cos", "sin", "invpuiss", "puissance"];
const NOMS_SOMME = ["puissance", "inverse", "racine", "exp", "ln", "cos", "sin", "invpuiss", "identite"];

/** Énoncé « dérive f » : sans contexte ou avec une situation. */
function enonceDerivee(F: (v: string) => string, pos: boolean, oscille: boolean) {
  const ctx = randomInt(1, 5) <= 2 ? randomChoice(oscille ? OSCILLE : METIERS) : null;
  if (!ctx) {
    const dom = pos ? " sur $]0\\,;+\\infty[$" : "";
    const fx = F("x");
    return {
      v: "x",
      texte: randomChoice([
        `Quelle est la dérivée de la fonction $f$ définie${dom} par $f(x) = ${fx}$ ?`,
        `On pose $f(x) = ${fx}$${dom}. Alors $f'(x)$ est égal à :`,
        `Complète : si $f(x) = ${fx}$${dom}, alors $f'(x) = \\ldots$`,
        `Dérive la fonction $f$ définie${dom} par $f(x) = ${fx}$.`,
      ]),
      L: "f",
    };
  }
  const [qui, quoi, L, unite] = ctx;
  const dom = pos ? " pour $t > 0$" : "";
  const ft = F("t");
  return {
    v: "t",
    texte: randomChoice([
      `${qui} modélise ${quoi} par $${L}(t) = ${ft}$${dom}, avec $t$ en ${unite}. Quelle est la dérivée $${L}'(t)$ ?`,
      `Pour étudier ${quoi}, ${minuscule(qui)} utilise la fonction $${L}(t) = ${ft}$${dom} ($t$ en ${unite}). Que vaut $${L}'(t)$ ?`,
      `${qui} a besoin de la vitesse de variation ${de(quoi)}. Le modèle est $${L}(t) = ${ft}$${dom}, avec $t$ en ${unite}. Quelle est $${L}'(t)$ ?`,
    ]),
    L,
  };
}

/* =========================================================
   DERIVATION_FORMULES
========================================================= */

function genFormule(niv: 1 | 2) {
  const nom = randomChoice(niv === 1 ? NOMS_1 : NOMS_2);
  const p = randomInt(2, 7);
  const oscille = nom === "cos" || nom === "sin";
  const c =
    nom === "constante"
      ? randomChoice([2, 3, 4, 5, 7, 8, 10, 12, 15, -3, -5])
      : niv === 1
        ? randomChoice([1, 1, 2, 3, 4, 5, 6, 10])
        : randomChoice([1, 1, 2, 3, 4, 5, 10, -1, -2, -3]);
  const e = enonceDerivee((v) => somme([[c, famille(nom, v, p).f]]), famille(nom, "x", p).pos, oscille);
  const fam = famille(nom, e.v, p);
  const bon = somme([[c * fam.d[0], fam.d[1]]]);
  const faux = fam.faux.map(([m, corps]) => somme([[c * m, corps]])).filter((s) => s !== bon);
  return qcm(
    e.texte,
    $(bon),
    faux.map($),
    expl(fam.regle + ".", "on applique la formule ; le coefficient reste devant.", `$${e.L}'(${e.v}) = ${bon}$.`, `la dérivée est $${bon}$.`)
  );
}

function genFormuleSomme() {
  const [n1, n2] = (() => {
    const a = randomChoice(NOMS_SOMME);
    let b = randomChoice(NOMS_SOMME);
    while (b === a) b = randomChoice(NOMS_SOMME);
    return [a, b];
  })();
  const c1 = randomChoice([1, 2, 3, 4, 5, -2, -3]);
  const c2 = randomChoice([1, 2, 3, 4, 6, -1, -2, -4, -5]);
  // Les exposants sont tirés une fois, pour x et pour t.
  const e1 = randomInt(2, 7);
  const e2 = randomInt(2, 7);
  const pos = famille(n1, "x", e1).pos || famille(n2, "x", e2).pos;
  const oscille = (n1 === "cos" || n1 === "sin") && (n2 === "cos" || n2 === "sin");
  const e = enonceDerivee((v) => somme([[c1, famille(n1, v, e1).f], [c2, famille(n2, v, e2).f]]), pos, oscille);
  const f1 = famille(n1, e.v, e1);
  const f2 = famille(n2, e.v, e2);
  const d1: Terme = [c1 * f1.d[0], f1.d[1]];
  const d2: Terme = [c2 * f2.d[0], f2.d[1]];
  const bon = somme([d1, d2]);
  const [m1, b1] = randomChoice(f1.faux);
  const [m2, b2] = randomChoice(f2.faux);
  const faux = [
    somme([[c1 * m1, b1], d2]),
    somme([d1, [c2 * m2, b2]]),
    somme([d1, [-d2[0], d2[1]]]),
    somme([[f1.d[0], f1.d[1]], [f2.d[0], f2.d[1]]]),
  ].filter((s) => s !== bon);
  return qcm(
    e.texte,
    $(bon),
    faux.map($),
    expl(
      `${f1.regle} et ${f2.regle}.`,
      "on dérive terme à terme : $(au + bv)' = au' + bv'$.",
      `$${e.L}'(${e.v}) = ${bon}$.`,
      `la dérivée est $${bon}$.`
    )
  );
}

function genVraiFauxFormule(niv: 1 | 2) {
  const nom = randomChoice(niv === 1 ? NOMS_1 : NOMS_2);
  const fam = famille(nom, "x");
  const c = nom === "constante" ? randomChoice([2, 3, 5, 9, -4]) : randomChoice([1, 2, 3, 5, -1, -2]);
  const fx = somme([[c, fam.f]]);
  const bon = somme([[c * fam.d[0], fam.d[1]]]);
  const faux = fam.faux.map(([m, corps]) => somme([[c * m, corps]])).filter((s) => s !== bon);
  const juste = randomInt(1, 2) === 1;
  const propose = juste ? bon : randomChoice(faux);
  const qui = randomChoice(["Un élève", "Une élève", "Ton voisin", "Une camarade", "Un logiciel mal réglé"]);
  return qcm(
    randomChoice([
      `Vrai ou faux ? Si $f(x) = ${fx}$${fam.pos ? " sur $]0\\,;+\\infty[$" : ""}, alors $f'(x) = ${propose}$.`,
      `${qui} affirme : « la dérivée de $${fx}$ est $${propose}$ ». Est-ce juste ?`,
    ]),
    juste ? "Vrai" : "Faux",
    [juste ? "Faux" : "Vrai"],
    expl(fam.regle + ".", "on applique la formule et on compare.", `$f'(x) = ${bon}$.`, juste ? "l’affirmation est vraie." : `l’affirmation est fausse : $f'(x) = ${bon}$.`)
  );
}

function genValeurDerivee() {
  const t = randomInt(1, 4);
  let fx: string, val: number, calc: string, a: number;
  if (t === 1) {
    const p = randomInt(2, 4);
    const c = randomChoice([1, 2, 3, -1, -2, 0.5]);
    a = randomChoice([-2, -1, 1, 2, 3]);
    fx = somme([[c, M(p, "x")]]);
    val = c * p * a ** (p - 1);
    calc = `$f'(x) = ${somme([[c * p, M(p - 1, "x")]])}$, donc $f'(${n(a)}) = ${n(val)}$`;
  } else if (t === 2) {
    const c = randomChoice([2, 3, 4, 5, -2, -6]);
    a = 0;
    fx = somme([[c, B("e^{x}")]]);
    val = c;
    calc = `$f'(x) = ${fx}$ et $e^0 = 1$, donc $f'(0) = ${n(c)}$`;
  } else if (t === 3) {
    a = randomChoice([1, 2, 4, 5, 10]);
    const c = a * randomChoice([1, 2, 3, -1]);
    fx = somme([[c, B("\\ln x")]]);
    val = c / a;
    calc = `$f'(x) = ${frac(c, "x")}$, donc $f'(${a}) = ${n(val)}$`;
  } else {
    const r = randomChoice([1, 2, 3, 5]);
    a = r * r;
    const c = 2 * r * randomChoice([1, 2, 3]);
    fx = somme([[c, B("\\sqrt{x}")]]);
    val = c / (2 * r);
    calc = `$f'(x) = \\dfrac{${c}}{2\\sqrt{x}}$, donc $f'(${a}) = \\dfrac{${c}}{2 \\times ${r}} = ${n(val)}$`;
  }
  const ctx = randomInt(1, 3) === 1 && val > 0 ? randomChoice(METIERS) : null;
  const text = ctx
    ? `${ctx[0]} modélise ${ctx[1]} par $${ctx[2]}(t) = ${fx.replace(/x/g, "t")}$ ($t$ en ${ctx[3]}). Calcule $${ctx[2]}'(${n(a)})$, la vitesse de variation à cet instant.`
    : randomChoice([
        `Soit $f(x) = ${fx}$. Calcule $f'(${n(a)})$.`,
        `On donne $f(x) = ${fx}$. Quelle est la valeur du nombre dérivé $f'(${n(a)})$ ?`,
        `Pour $f(x) = ${fx}$, combien vaut $f'(${n(a)})$ ?`,
      ]);
  return court(text, val, expl("$f'(a)$ s’obtient en dérivant puis en remplaçant $x$ par $a$.", "on dérive, puis on calcule.", calc + ".", `la réponse est $${n(val)}$.`));
}

/* =========================================================
   DERIVATION_SOMME_PRODUIT_QUOTIENT
========================================================= */

function genPolynome(niv: 2 | 3) {
  const deg = niv === 2 ? randomInt(2, 3) : randomInt(3, 4);
  const termes: Array<[number, number]> = [];
  for (let p = deg; p >= 0; p--) {
    const c = p === deg ? randomChoice([1, 2, 3, 4, 5, -1, -2, -3]) : randomChoice([0, 1, 2, 3, 4, 5, 6, 7, -1, -2, -3, -4, -5, -6]);
    if (c !== 0) termes.push([c, p]);
  }
  if (!termes.some(([, p]) => p === 1)) termes.push([randomChoice([2, 3, -4, 5]), 1]);
  termes.sort((u, w) => w[1] - u[1]);
  const d = derivPoly(termes);
  const e = enonceDerivee((v) => poly(termes, v), false, false);
  const v = e.v;
  const bon = poly(d, v);
  const faux = [
    poly(termes.filter(([, p]) => p > 0).map(([c, p]) => [c, p - 1]), v),
    poly(termes.map(([c, p]) => [c * p, p]), v),
    poly([...d, ...termes.filter(([, p]) => p === 0)], v),
    poly(d.map(([c, p], i) => [i === d.length - 1 ? -c : c, p]), v),
  ].filter((s) => s !== bon);
  return qcm(
    e.texte,
    $(bon),
    faux.map($),
    expl("$(x^n)' = nx^{n-1}$, la dérivée d’une constante est nulle.", "on dérive terme à terme.", `$${e.L}'(${v}) = ${bon}$.`, `la dérivée est $${bon}$.`)
  );
}

function genProduit() {
  const t = randomInt(1, 5);
  const a = randomChoice([1, 2, 3, -1, -2, 4]);
  let b = randomChoice([1, 2, 3, 5, -1, -2, -3, -4]);
  let fx: string, bon: string, faux: string[], calc: string, dom = "";
  if (t === 1) {
    fx = `(${lin(a, b)})e^{x}`;
    bon = `(${lin(a, a + b)})e^{x}`;
    faux = [somme([[a, B("e^{x}")]]), `(${lin(a, b - a)})e^{x}`, `(${lin(a, b)})e^{x}`, `(${lin(a + 1, b)})e^{x}`];
    calc = `$u = ${lin(a, b)}$, $u' = ${n(a)}$, $v = v' = e^{x}$ : $f'(x) = ${n(a)}e^{x} + (${lin(a, b)})e^{x} = ${bon}$`;
  } else if (t === 2) {
    fx = `(${lin(a, b)})e^{-x}`;
    bon = `(${lin(-a, a - b)})e^{-x}`;
    faux = [somme([[-a, B("e^{-x}")]]), `(${lin(a, a + b)})e^{-x}`, `(${lin(-a, b - a)})e^{-x}`, `(${lin(a, b)})e^{-x}`];
    calc = `$u' = ${n(a)}$, $(e^{-x})' = -e^{-x}$ : $f'(x) = ${n(a)}e^{-x} - (${lin(a, b)})e^{-x} = ${bon}$`;
  } else if (t === 3) {
    const aa = Math.abs(a);
    b = Math.abs(b);
    dom = " sur $]0\\,;+\\infty[$";
    fx = `(${lin(aa, b)})\\ln x`;
    bon = `${cs(aa)}\\ln x + ${n(aa)} + \\dfrac{${n(b)}}{x}`;
    faux = [`\\dfrac{${n(aa)}}{x}`, `${cs(aa)}\\ln x + \\dfrac{${n(b)}}{x}`, `${cs(aa)}\\ln x + ${n(aa)}`, `${cs(aa)}\\ln x + \\dfrac{${n(aa)}}{x}`];
    calc = `$u' = ${n(aa)}$, $(\\ln x)' = \\dfrac{1}{x}$ : $f'(x) = ${cs(aa)}\\ln x + \\dfrac{${lin(aa, b)}}{x} = ${bon}$`;
  } else if (t === 4) {
    const c = randomChoice([1, 2, 3, -1, -2]);
    fx = `${cs(c)}x^{2}e^{x}`;
    bon = `(${poly([[c, 2], [2 * c, 1]])})e^{x}`;
    faux = [`${cs(2 * c)}xe^{x}`, `(${poly([[c, 2], [c, 1]])})e^{x}`, `(${poly([[c, 2], [-2 * c, 1]])})e^{x}`, `${cs(2 * c)}x^{2}e^{x}`];
    calc = `$(x^2)' = 2x$ : $f'(x) = ${somme([[2 * c, B("xe^{x}")], [c, B("x^{2}e^{x}")]])} = ${bon}$`;
  } else {
    const c = randomChoice([1, 2, 3, -1]);
    const d = randomChoice([1, 2, 4, -3, -5]);
    if (d === b) b = -b;
    fx = `(${lin(a, b)})(${lin(c, d)})`;
    bon = lin(2 * a * c, a * d + b * c);
    faux = [n(a * c), lin(a * c, a * d + b * c), lin(2 * a * c, a * d - b * c), lin(2 * a * c, b * d)];
    calc = `$(uv)' = u'v + uv' = ${cs(a)}(${lin(c, d)}) ${c < 0 ? "-" : "+"} ${cs(Math.abs(c))}(${lin(a, b)})$, soit $${bon}$`;
  }
  const qui = randomChoice(METIERS);
  return qcm(
    randomChoice([
      `Soit $f(x) = ${fx}$${dom}. Quelle est sa dérivée ?`,
      `On dérive le produit $f(x) = ${fx}$${dom}. On obtient :`,
      `Dans son modèle, ${minuscule(qui[0])} utilise $f(x) = ${fx}$${dom}. Que vaut $f'(x)$ ?`,
      `Quelle est la dérivée du produit $${fx}$${dom} ?`,
    ]),
    $(bon),
    faux.filter((s) => s !== bon).map($),
    expl("$(uv)' = u'v + uv'$.", "on repère $u$ et $v$, on les dérive, puis on assemble.", calc + ".", `$f'(x) = ${bon}$.`)
  );
}

function genQuotient() {
  const t = randomInt(1, 3);
  let fx: string, bon: string, faux: string[], calc: string, dom: string;
  if (t === 1) {
    const c = randomChoice([1, 1, 2]);
    let a = 0, b = 0, d = 0;
    do {
      a = randomChoice([1, 2, 3, -1, -2]);
      b = randomChoice([1, 2, 3, 4, -1, -3, -5]);
      d = randomChoice([1, 2, 3, -1, -2, -4]);
    } while (a * d - b * c === 0 || a * d + b * c === 0 || a * d === b * c);
    const den = lin(c, d);
    fx = `\\dfrac{${lin(a, b)}}{${den}}`;
    const k = a * d - b * c;
    bon = frac(k, `(${den})^{2}`);
    faux = [frac(-k, `(${den})^{2}`), frac(a * d + b * c, `(${den})^{2}`), frac(k, den), frac(a * c, `(${den})^{2}`)];
    dom = ` là où $${den} \\neq 0$`;
    calc = `$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2} = \\dfrac{${cs(a)}(${den}) - ${cs(c)}(${lin(a, b)})}{(${den})^{2}} = ${bon}$`;
  } else if (t === 2) {
    const m = randomChoice([1, 2, 3, -1, -2]);
    fx = `\\dfrac{e^{x}}{${xPlus(m)}}`;
    bon = `\\dfrac{(${xPlus(m - 1)})e^{x}}{(${xPlus(m)})^{2}}`;
    faux = [`\\dfrac{(${xPlus(m + 1)})e^{x}}{(${xPlus(m)})^{2}}`, `\\dfrac{e^{x}}{(${xPlus(m)})^{2}}`, "e^{x}", `\\dfrac{(${xPlus(m - 1)})e^{x}}{${xPlus(m)}}`];
    dom = ` sur $]${n(-m)}\\,;+\\infty[$`;
    calc = `$u = u' = e^{x}$, $v = ${xPlus(m)}$, $v' = 1$ : $f'(x) = \\dfrac{e^{x}(${xPlus(m)}) - e^{x}}{(${xPlus(m)})^{2}} = ${bon}$`;
  } else {
    const k = randomChoice([1, 2, 3, 5]);
    fx = `\\dfrac{${cs(k)}\\ln x}{x}`;
    bon = `\\dfrac{${n(k)} - ${cs(k)}\\ln x}{x^{2}}`;
    faux = [`\\dfrac{${cs(k)}\\ln x - ${n(k)}}{x^{2}}`, `\\dfrac{${n(k)}}{x^{2}}`, `\\dfrac{${n(k)} - ${cs(k)}\\ln x}{x}`, `\\dfrac{${n(k)} + ${cs(k)}\\ln x}{x^{2}}`];
    dom = " sur $]0\\,;+\\infty[$";
    calc = `$u' = \\dfrac{${n(k)}}{x}$, $v' = 1$ : $f'(x) = \\dfrac{\\frac{${n(k)}}{x} \\times x - ${cs(k)}\\ln x}{x^{2}} = ${bon}$`;
  }
  return qcm(
    randomChoice([
      `Soit $f(x) = ${fx}$${dom}. Quelle est sa dérivée ?`,
      `Dérive le quotient $f(x) = ${fx}$${dom}.`,
      `Un ingénieur doit dériver $f(x) = ${fx}$${dom}. Quel résultat est juste ?`,
      `Parmi ces expressions, laquelle est $f'(x)$ pour $f(x) = ${fx}$${dom} ?`,
    ]),
    $(bon),
    faux.filter((s) => s !== bon).map($),
    expl("$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.", "on repère $u$ et $v$, on dérive, on assemble sans oublier le carré.", calc + ".", `$f'(x) = ${bon}$.`)
  );
}

function genValeurOperation() {
  const t = randomInt(1, 4);
  let fx: string, x0: number, val: number, calc: string;
  if (t === 1) {
    const a = randomChoice([1, 2, 3, -1, -2]);
    const b = randomChoice([1, 2, 4, -3, -5]);
    fx = `(${lin(a, b)})e^{x}`;
    x0 = 0;
    val = a + b;
    calc = `$f'(x) = (${lin(a, a + b)})e^{x}$, et $e^0 = 1$`;
  } else if (t === 2) {
    const a = randomChoice([1, 2, 3]);
    const b = randomChoice([1, 2, 5, -1]);
    fx = `(${lin(a, b)})\\ln x`;
    x0 = 1;
    val = a + b;
    calc = `$f'(x) = ${cs(a)}\\ln x + \\dfrac{${lin(a, b)}}{x}$, et $\\ln 1 = 0$`;
  } else if (t === 3) {
    let a = 0, b = 0, d = 0, c = 0, s = 1;
    do {
      c = randomChoice([1, 2]);
      x0 = randomChoice([0, 1, 2, -1]);
      s = randomChoice([1, -1]);
      d = s - c * x0;
      a = randomChoice([1, 2, 3, -1]);
      b = randomChoice([1, 2, -2, 4]);
    } while (d === 0 || a * d - b * c === 0);
    fx = `\\dfrac{${lin(a, b)}}{${lin(c, d)}}`;
    val = a * d - b * c;
    calc = `$f'(x) = ${frac(val, `(${lin(c, d)})^{2}`)}$ et $${n(c)} \\times ${pn(x0)} ${d < 0 ? "-" : "+"} ${n(Math.abs(d))} = ${s}$`;
  } else {
    const k = randomChoice([2, 3, 4, 6, 10, -4]);
    x0 = randomChoice([1, -1]);
    fx = `\\dfrac{${n(k)}}{x^{2} + 1}`;
    val = (-2 * k * x0) / 4;
    calc = `$f'(x) = ${frac(-2 * k, "(x^{2} + 1)^{2}")} \\times x$, et $(${n(x0)})^2 + 1 = 2$`;
  }
  return court(
    randomChoice([`Soit $f(x) = ${fx}$. Calcule $f'(${n(x0)})$.`, `On donne $f(x) = ${fx}$. Que vaut le nombre dérivé $f'(${n(x0)})$ ?`, `Quelle est la pente de la tangente à la courbe de $f(x) = ${fx}$ au point d’abscisse $${n(x0)}$ ?`]),
    val,
    expl("$(uv)' = u'v + uv'$ et $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.", "on dérive, puis on remplace $x$.", `${calc}.`, `$f'(${n(x0)}) = ${n(val)}$.`)
  );
}

/* =========================================================
   DERIVATION_COMPOSEE
========================================================= */

function genComposee(niv: 3 | 4 | 5) {
  const familles = niv === 3 ? [1, 1, 2] : niv === 4 ? [3, 4, 5, 1] : [6, 7, 8, 9];
  const t = randomChoice(familles);
  let a = randomChoice([2, 3, 4, 5, -2, -3]);
  const b = randomChoice([1, 2, 3, 5, -1, -4, -7]);
  const L = lin(a, b);
  let fx: string, bon: string, faux: string[], regle: string, calc: string, dom = "";
  if (t === 1) {
    const p = randomInt(2, 5);
    fx = `(${L})^{${p}}`;
    const puis = (q: number) => (q === 1 ? `(${L})` : `(${L})^{${q}}`);
    bon = `${cs(p * a)}${puis(p - 1)}`;
    faux = [`${n(p)}${puis(p - 1)}`, `${cs(p * a)}${puis(p)}`, `${cs(a)}${puis(p - 1)}`, `${cs(p * a)}${puis(p - 2 === 0 ? 1 : p - 2)}`];
    regle = "$(u^n)' = nu'u^{n-1}$";
    calc = `$u = ${L}$, $u' = ${n(a)}$ : $f'(x) = ${n(p)} \\times ${pn(a)} \\times ${puis(p - 1)}$`;
  } else if (t === 2) {
    fx = `e^{${L}}`;
    bon = `${cs(a)}e^{${L}}`;
    faux = [`e^{${L}}`, `(${L})e^{${lin(a, b - 1)}}`, `${cs(a)}xe^{${L}}`, `${cs(-a)}e^{${L}}`];
    regle = "$(e^u)' = u'e^u$";
    calc = `$u = ${L}$, $u' = ${n(a)}$`;
  } else if (t === 3) {
    a = Math.abs(a);
    const Lp = lin(a, b);
    fx = `\\ln(${Lp})`;
    bon = `\\dfrac{${n(a)}}{${Lp}}`;
    faux = [`\\dfrac{1}{${Lp}}`, `${cs(a)}\\ln(${Lp})`, `\\dfrac{${n(a)}}{x}`, `\\dfrac{${Lp}}{${n(a)}}`];
    regle = "$(\\ln u)' = \\dfrac{u'}{u}$";
    calc = `$u = ${Lp}$, $u' = ${n(a)}$`;
    dom = ` sur l’intervalle où $${Lp} > 0$`;
    return finComposee(fx, bon, faux, regle, calc, dom, Lp);
  } else if (t === 4) {
    a = Math.abs(a);
    const Lp = lin(a, b);
    fx = `\\sqrt{${Lp}}`;
    bon = a % 2 === 0 ? `\\dfrac{${n(a / 2)}}{\\sqrt{${Lp}}}`.replace("\\dfrac{1}{", "\\dfrac{1}{") : `\\dfrac{${n(a)}}{2\\sqrt{${Lp}}}`;
    faux = [`\\dfrac{1}{2\\sqrt{${Lp}}}`, `${cs(a)}\\sqrt{${Lp}}`, a % 2 === 0 ? `\\dfrac{${n(a)}}{\\sqrt{${Lp}}}` : `\\dfrac{${n(a)}}{\\sqrt{${Lp}}}`, `\\dfrac{${n(a)}}{2${Lp}}`.replace(`2${Lp}`, `2(${Lp})`)];
    regle = "$(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$";
    calc = `$u = ${Lp}$, $u' = ${n(a)}$ : $f'(x) = \\dfrac{${n(a)}}{2\\sqrt{${Lp}}}$`;
    dom = ` sur l’intervalle où $${Lp} > 0$`;
    return finComposee(fx, bon, faux, regle, calc, dom, Lp);
  } else if (t === 5) {
    const cosinus = randomInt(1, 2) === 1;
    if (cosinus) {
      fx = `\\cos(${L})`;
      bon = `${cs(-a)}\\sin(${L})`;
      faux = [`-\\sin(${L})`, `${cs(a)}\\sin(${L})`, `${cs(-a)}\\cos(${L})`, `${cs(a)}\\cos(${L})`];
      regle = "$(\\cos u)' = -u'\\sin u$";
    } else {
      fx = `\\sin(${L})`;
      bon = `${cs(a)}\\cos(${L})`;
      faux = [`\\cos(${L})`, `${cs(-a)}\\cos(${L})`, `${cs(a)}\\sin(${L})`, `${cs(-a)}\\sin(${L})`];
      regle = "$(\\sin u)' = u'\\cos u$";
    }
    calc = `$u = ${L}$, $u' = ${n(a)}$`;
  } else if (t === 6) {
    const k = randomChoice([1, 2, 3, -1]);
    const c = randomChoice([1, 3, -2, 5]);
    const U = poly([[k, 2], [c, 0]]);
    fx = `e^{${U}}`;
    bon = `${cs(2 * k)}xe^{${U}}`;
    faux = [`e^{${U}}`, `${cs(k)}xe^{${U}}`, `${cs(2 * k)}xe^{${poly([[2 * k, 1]])}}`, `(${U})e^{${U}}`];
    regle = "$(e^u)' = u'e^u$";
    calc = `$u = ${U}$, $u' = ${cs(2 * k)}x$`;
  } else if (t === 7) {
    const k = randomChoice([1, 2, 3, 4, -1]);
    const p = randomInt(2, 4);
    const U = poly([[1, 2], [k, 0]]);
    const puis = (q: number) => (q === 1 ? `(${U})` : `(${U})^{${q}}`);
    fx = puis(p);
    bon = `${n(2 * p)}x${puis(p - 1)}`;
    faux = [`${n(p)}${puis(p - 1)}`, `${n(2 * p)}x${puis(p)}`, `2x${puis(p - 1)}`, `${n(p)}x${puis(p - 1)}`];
    regle = "$(u^n)' = nu'u^{n-1}$";
    calc = `$u = ${U}$, $u' = 2x$ : $f'(x) = ${n(p)} \\times 2x \\times ${puis(p - 1)}$`;
  } else if (t === 8) {
    const k = randomChoice([1, 2, 3, 4, 9]);
    const U = poly([[1, 2], [k, 0]]);
    fx = `\\ln(${U})`;
    bon = `\\dfrac{2x}{${U}}`;
    faux = [`\\dfrac{1}{${U}}`, `\\dfrac{2}{${U}}`, `2x\\ln(${U})`, `\\dfrac{${U}}{2x}`];
    regle = "$(\\ln u)' = \\dfrac{u'}{u}$";
    calc = `$u = ${U} > 0$, $u' = 2x$`;
  } else {
    const k = randomChoice([1, 4, 9, 2]);
    const U = poly([[1, 2], [k, 0]]);
    fx = `\\sqrt{${U}}`;
    bon = `\\dfrac{x}{\\sqrt{${U}}}`;
    faux = [`\\dfrac{1}{2\\sqrt{${U}}}`, `\\dfrac{2x}{\\sqrt{${U}}}`, `\\dfrac{x}{${U}}`, `2x\\sqrt{${U}}`];
    regle = "$(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$";
    calc = `$u = ${U}$, $u' = 2x$ : $f'(x) = \\dfrac{2x}{2\\sqrt{${U}}}$`;
  }
  return finComposee(fx, bon, faux, regle, calc, dom, "");
}

function finComposee(fx: string, bon: string, faux: string[], regle: string, calc: string, dom: string, _u: string) {
  return qcm(
    randomChoice([
      `Quelle est la dérivée de $f(x) = ${fx}$${dom} ?`,
      `On pose $f(x) = ${fx}$${dom}. Alors $f'(x)$ vaut :`,
      `C’est une fonction composée : dérive $f(x) = ${fx}$${dom}.`,
      `Une ingénieure vérifie un calcul : quelle est la dérivée de $${fx}$${dom} ?`,
      `Un élève dérive $f(x) = ${fx}$${dom}. Quel résultat doit-il trouver ?`,
    ]),
    $(bon),
    faux.filter((s) => s !== bon).map($),
    expl(regle + ".", "on repère la fonction intérieure $u$, on calcule $u'$, puis on applique la formule.", calc + ".", `$f'(x) = ${bon}$.`)
  );
}

function genComposeeValeur() {
  const t = randomInt(1, 2);
  if (t === 1) {
    const a = randomChoice([1, 2, 3, -1, -2]);
    const x0 = randomChoice([0, 1, 2, -1]);
    // w = valeur de ax + b en x0 ; b ≠ 0, sinon la parenthèse ne sert à rien.
    const w = randomChoice([1, -1, 2].filter((v) => v !== a * x0));
    const b = w - a * x0;
    const p = randomInt(2, 4);
    const val = p * a * w ** (p - 1);
    return court(
      randomChoice([`Soit $f(x) = (${lin(a, b)})^{${p}}$. Calcule $f'(${n(x0)})$.`, `Pour $f(x) = (${lin(a, b)})^{${p}}$, que vaut $f'(${n(x0)})$ ?`]),
      val,
      expl("$(u^n)' = nu'u^{n-1}$.", "on dérive, puis on remplace $x$.", `$f'(x) = ${n(p * a)}(${lin(a, b)})${p - 1 === 1 ? "" : `^{${p - 1}}`}$ et, en $x = ${n(x0)}$, $${lin(a, b)} = ${n(w)}$.`, `$f'(${n(x0)}) = ${n(val)}$.`)
    );
  }
  const a = randomChoice([1, 2, 3, -1, -2, 0.5]);
  const c = randomChoice([1, 2, 3, 4, -2]);
  const val = c * a;
  return court(
    randomChoice([`Soit $f(x) = ${cs(c)}e^{${lin(a, 0)}}$. Calcule $f'(0)$.`, `Que vaut $f'(0)$ pour $f(x) = ${cs(c)}e^{${lin(a, 0)}}$ ?`]),
    val,
    expl("$(e^u)' = u'e^u$.", "on dérive puis on remplace $x$ par $0$.", `$f'(x) = ${n(c * a)}e^{${lin(a, 0)}}$ et $e^0 = 1$.`, `$f'(0) = ${n(val)}$.`)
  );
}

/** Modèles exponentiels en situation : vitesse de variation à l'instant 0. */
function genComposeeContexte() {
  const t = randomInt(1, 4);
  const k = randomChoice([0.1, 0.2, 0.5, 0.25, 2]);
  const ek = k === 1 ? "t" : `${n(k)}t`;
  let text: string, val: number, calc: string;
  if (t === 1) {
    const C0 = randomChoice([20, 40, 80, 100, 12]);
    val = -C0 * k;
    text = `${randomChoice(["Une pharmacologue", "Un médecin anesthésiste", "Une infirmière de recherche clinique"])} modélise la concentration d’un médicament dans le sang par $C(t) = ${C0}e^{-${ek}}$ (en mg/L, $t$ en heures). Calcule $C'(0)$, la vitesse d’élimination au départ.`;
    calc = `$C'(t) = ${C0} \\times (-${n(k)}) \\times e^{-${ek}} = ${n(-C0 * k)}e^{-${ek}}$, donc $C'(0) = ${n(val)}$`;
  } else if (t === 2) {
    const N0 = randomChoice([100, 200, 500, 1000, 40]);
    val = N0 * k;
    text = `${randomChoice(["Un biologiste", "Une technicienne de laboratoire", "Un microbiologiste en agroalimentaire"])} modélise une population de bactéries par $N(t) = ${N0}e^{${ek}}$ ($t$ en heures). Calcule $N'(0)$, la vitesse de croissance au départ.`;
    calc = `$N'(t) = ${N0} \\times ${n(k)}e^{${ek}}$, donc $N'(0) = ${n(val)}$`;
  } else if (t === 3) {
    const A = randomChoice([10, 12, 20, 50, 100]);
    val = A * k;
    text = `${randomChoice(["Une ingénieure en électronique", "Un technicien de maintenance", "Une étudiante en BTS électrotechnique"])} étudie la charge d’un condensateur : $q(t) = ${A} - ${A}e^{-${ek}}$ ($t$ en ms). Calcule $q'(0)$.`;
    calc = `$q'(t) = ${A} \\times ${n(k)}e^{-${ek}}$, donc $q'(0) = ${n(val)}$`;
  } else {
    const T0 = randomChoice([60, 70, 80]);
    const Ta = randomChoice([20, 25]);
    val = -(T0 - Ta) * k;
    text = `${randomChoice(["Un barista", "Une cheffe pâtissière", "Un thermicien"])} modélise la température d’une boisson qui refroidit par $T(t) = ${Ta} + ${T0 - Ta}e^{-${ek}}$ (en °C, $t$ en minutes). Calcule $T'(0)$.`;
    calc = `$T'(t) = ${T0 - Ta} \\times (-${n(k)}) \\times e^{-${ek}} = ${n(-(T0 - Ta) * k)}e^{-${ek}}$, donc $T'(0) = ${n(val)}$`;
  }
  return court(text, val, expl("$(e^{kt})' = ke^{kt}$.", "on dérive la fonction composée, puis on remplace $t$ par $0$ ($e^0 = 1$).", calc + ".", `la réponse est $${n(val)}$.`));
}

/* =========================================================
   DERIVATION_VARIATION
========================================================= */

type Var = "croissante" | "décroissante";

function genSigneDerivee() {
  const t = randomInt(1, 8);
  const c = randomChoice([1, 2, 3, 5]);
  let fp: string, I: string, bon: string, raison: string;
  if (t === 1) {
    fp = `e^{x} + ${c}`;
    I = R;
    bon = "croissante";
    raison = "$e^x > 0$, donc $f'(x) > 0$";
  } else if (t === 2) {
    fp = `-${c}e^{-x}`;
    I = R;
    bon = "décroissante";
    raison = "$e^{-x} > 0$, donc $f'(x) < 0$";
  } else if (t === 3) {
    fp = `\\dfrac{${c}}{x}`;
    I = "$]0\\,;+\\infty[$";
    bon = "croissante";
    raison = "$x > 0$, donc $f'(x) > 0$";
  } else if (t === 4) {
    fp = `-\\dfrac{${c}}{x^{2}}`;
    I = "$]0\\,;+\\infty[$";
    bon = "décroissante";
    raison = "un carré est positif, donc $f'(x) < 0$";
  } else if (t === 5) {
    fp = `${cs(c)}x^{2} + ${randomInt(1, 6)}`;
    I = R;
    bon = "croissante";
    raison = "une somme de termes positifs est positive";
  } else if (t === 6) {
    const r = randomInt(-3, 4);
    const s = randomChoice([1, -1]);
    fp = `${cs(s * c)}${fac(r)}`;
    I = R;
    bon = s > 0 ? "décroissante puis croissante" : "croissante puis décroissante";
    raison = `$f'$ change de signe en $${n(r)}$ : ${s > 0 ? "négative puis positive" : "positive puis négative"}`;
  } else if (t === 7) {
    const r = randomInt(-2, 3);
    fp = `(${xPlus(-r)})e^{x}`;
    I = R;
    bon = "décroissante puis croissante";
    raison = `$e^x > 0$ : $f'$ a le signe de $${xPlus(-r)}$, négatif puis positif`;
  } else {
    fp = `-(${xPlus(-randomInt(-3, 3))})^{2} - ${c}`;
    I = R;
    bon = "décroissante";
    raison = "$-(\\ldots)^2 \\le 0$, et on retire encore un nombre positif";
  }
  const ctx = randomInt(1, 4) === 1 ? randomChoice(METIERS) : null;
  const text = ctx
    ? `${ctx[0]} étudie une fonction $f$ dont la dérivée vaut $f'(x) = ${fp}$ sur ${I}. Sur ${I}, $f$ est :`
    : randomChoice([
        `Une fonction $f$ est dérivable sur ${I} et $f'(x) = ${fp}$. Sur ${I}, $f$ est :`,
        `On sait que $f'(x) = ${fp}$ pour tout $x$ de ${I}. Comment varie $f$ sur ${I} ?`,
        `La dérivée de $f$ est $f'(x) = ${fp}$ sur ${I}. Que peut-on dire de $f$ ?`,
      ]);
  const tous = ["croissante", "décroissante", "décroissante puis croissante", "croissante puis décroissante", "constante"];
  return qcm(
    text,
    bon,
    tous.filter((x) => x !== bon),
    expl("$f' > 0$ : $f$ croissante ; $f' < 0$ : $f$ décroissante.", "on étudie le signe de $f'(x)$.", raison + ".", `$f$ est ${bon} sur ${I}.`)
  );
}

/** Familles dont la dérivée s'annule en une seule valeur « propre ». */
function familleZero() {
  const t = randomInt(1, 5);
  if (t === 1) {
    const m = randomInt(-4, 3);
    return { fx: `(${xPlus(m)})e^{x}`, fp: `(${xPlus(m + 1)})e^{x}`, z: -m - 1, I: R, avant: "décroissante" as Var, dom: "" };
  }
  if (t === 2) {
    const m = randomInt(-3, 4);
    return { fx: `(${xPlus(m)})e^{-x}`, fp: `(${lin(-1, 1 - m)})e^{-x}`, z: 1 - m, I: R, avant: "croissante" as Var, dom: "" };
  }
  if (t === 3) {
    const a = randomChoice([1, 2, 4, 5, 10, 0.5]);
    return { fx: `${cs(a)}x - \\ln x`, fp: `${n(a)} - \\dfrac{1}{x}`, z: 1 / a, I: "$]0\\,;+\\infty[$", avant: "décroissante" as Var, dom: " sur $]0\\,;+\\infty[$" };
  }
  if (t === 4) {
    const k = randomChoice([2, 3, 4, 5, 6]);
    return { fx: `x - ${k}\\ln x`, fp: `1 - \\dfrac{${k}}{x}`, z: k, I: "$]0\\,;+\\infty[$", avant: "décroissante" as Var, dom: " sur $]0\\,;+\\infty[$" };
  }
  const k = randomInt(-4, 5) || 2;
  const a = randomChoice([1, 2, -1, -3]);
  const c = randomInt(-5, 6);
  return { fx: poly([[a, 2], [-2 * a * k, 1], [c, 0]]), fp: lin(2 * a, -2 * a * k), z: k, I: R, avant: (a > 0 ? "décroissante" : "croissante") as Var, dom: "" };
}

function genZeroDerivee() {
  const F = familleZero();
  const donne = randomInt(1, 2) === 1;
  const ctx = randomInt(1, 4) === 1 ? randomChoice(METIERS) : null;
  const intro = ctx ? `${ctx[0]} étudie la fonction $f(x) = ${F.fx}$${F.dom}. ` : `Soit $f(x) = ${F.fx}$${F.dom}. `;
  const question = donne
    ? randomChoice([`On a $f'(x) = ${F.fp}$. En quelle valeur de $x$ la dérivée s’annule-t-elle ?`, `Sachant que $f'(x) = ${F.fp}$, résous $f'(x) = 0$.`])
    : randomChoice(["En quelle valeur de $x$ la dérivée $f'$ s’annule-t-elle ?", "Calcule $f'(x)$, puis donne la valeur de $x$ qui annule $f'$."]);
  return court(
    intro + question,
    F.z,
    expl("les extremums se cherchent là où $f'$ s’annule.", "on dérive, puis on résout $f'(x) = 0$.", `$f'(x) = ${F.fp}$ s’annule pour $x = ${n(F.z)}$.`, `$x = ${n(F.z)}$.`)
  );
}

function genIntervalleVariation() {
  const t = randomInt(1, 2);
  const demande: Var = randomChoice(["croissante", "décroissante"]);
  if (t === 1) {
    const F = familleZero();
    const z = F.z;
    const bas = F.I === R ? gauche(z) : `$]0\\,;${n(z)}]$`;
    const haut = droite(z);
    const bon = demande === F.avant ? bas : haut;
    return qcm(
      randomChoice([
        `Soit $f(x) = ${F.fx}$${F.dom}, de dérivée $f'(x) = ${F.fp}$. Sur quel intervalle $f$ est-elle ${demande} ?`,
        `Soit $f(x) = ${F.fx}$${F.dom}. Sur quel intervalle $f$ est-elle ${demande} ?`,
        `Une analyste étudie $f(x) = ${F.fx}$${F.dom}. Sur quel intervalle cette fonction est-elle ${demande} ?`,
      ]),
      bon,
      [bon === bas ? haut : bas, F.I, bon === bas ? droite(-z) : gauche(-z), ferme(z, z + 3)],
      expl("$f$ croissante là où $f' \\ge 0$, décroissante là où $f' \\le 0$.", "on étudie le signe de $f'(x)$.", `$f'(x) = ${F.fp}$ s’annule en $${n(z)}$ ; $f$ est ${F.avant} avant, ${F.avant === "croissante" ? "décroissante" : "croissante"} après.`, `$f$ est ${demande} sur ${bon}.`)
    );
  }
  const r1 = randomInt(-4, 1);
  const r2 = r1 + 2 * randomInt(1, 3);
  const p = (-3 * (r1 + r2)) / 2;
  const q = 3 * r1 * r2;
  const c = randomInt(-5, 5);
  const fx = poly([[1, 3], [p, 2], [q, 1], [c, 0]]);
  const fp = poly([[3, 2], [2 * p, 1], [q, 0]]);
  const bon = demande === "décroissante" ? ferme(r1, r2) : `$]-\\infty\\,;${n(r1)}]$ et $[${n(r2)}\\,;+\\infty[$`;
  return qcm(
    randomChoice([
      `Soit $f(x) = ${fx}$. On a $f'(x) = ${fp} = 3${fac(r1)}${fac(r2)}$. Sur quel(s) intervalle(s) $f$ est-elle ${demande} ?`,
      `On étudie $f(x) = ${fx}$, dont la dérivée se factorise en $f'(x) = 3${fac(r1)}${fac(r2)}$. $f$ est ${demande} sur :`,
    ]),
    bon,
    demande === "décroissante"
      ? [`$]-\\infty\\,;${n(r1)}]$ et $[${n(r2)}\\,;+\\infty[$`, ferme(-r2, -r1), R, droite(r2)]
      : [ferme(r1, r2), ferme(-r2, -r1), R, droite(r1)],
    expl("$f' \\ge 0$ : $f$ croissante ; $f' \\le 0$ : $f$ décroissante.", "un trinôme a le signe de son coefficient $a$ à l’extérieur des racines.", `$f'$ est négative entre $${n(r1)}$ et $${n(r2)}$, positive à l’extérieur.`, `$f$ est ${demande} sur ${bon}.`)
  );
}

/* =========================================================
   DERIVATION_TANGENTE
========================================================= */

/** y = mx + p en LaTeX. */
function droiteEq(m: number, p: number) {
  return `y = ${poly([[m, 1], [p, 0]])}`;
}

function genTangenteDonnees() {
  const a = randomChoice([-2, -1, 1, 2, 3, 4]);
  const fa = randomInt(-5, 6);
  const m = randomChoice([-3, -2, -1, 1, 2, 3, 4, 0.5]);
  const t = randomInt(1, 3);
  const ctx = randomChoice(METIERS);
  const intro = randomChoice([
    `On sait que $f(${n(a)}) = ${n(fa)}$ et $f'(${n(a)}) = ${n(m)}$.`,
    `La courbe de $f$ passe par le point $A(${n(a)}\\,;${n(fa)})$ et $f'(${n(a)}) = ${n(m)}$.`,
    `${ctx[0]} lit dans un tableau : $f(${n(a)}) = ${n(fa)}$ et $f'(${n(a)}) = ${n(m)}$.`,
  ]);
  if (t === 1) {
    return court(
      `${intro} Quel est le coefficient directeur de la tangente à la courbe au point d’abscisse $${n(a)}$ ?`,
      m,
      expl("le coefficient directeur de la tangente en $a$ est $f'(a)$.", "on lit $f'(a)$.", `$f'(${n(a)}) = ${n(m)}$.`, `le coefficient directeur vaut $${n(m)}$.`)
    );
  }
  const p = fa - m * a;
  if (t === 2) {
    return court(
      `${intro} La tangente au point d’abscisse $${n(a)}$ a pour équation $y = mx + p$. Que vaut $p$ ?`,
      p,
      expl("$y = f'(a)(x - a) + f(a)$.", "on développe.", `$y = ${n(m)}(${xPlus(-a)})${plus(fa)}$, donc $p = ${n(fa)} - ${pn(m)} \\times ${pn(a)} = ${n(p)}$.`, `$p = ${n(p)}$.`)
    );
  }
  const bon = droiteEq(m, p);
  return qcm(
    `${intro} Quelle est l’équation réduite de la tangente au point d’abscisse $${n(a)}$ ?`,
    $(bon),
    [droiteEq(m, fa), droiteEq(fa, m), droiteEq(m, fa + m * a), droiteEq(-m, fa + m * a)].filter((s) => s !== bon).map($),
    expl("$y = f'(a)(x - a) + f(a)$.", "on remplace, puis on développe.", `$y = ${n(m)}(${xPlus(-a)})${plus(fa)}$.`, `$${bon}$.`)
  );
}

/** On connaît la tangente : on en déduit f'(a) ou f(a). */
function genTangenteLue() {
  const a = randomChoice([-3, -2, -1, 1, 2, 3, 4, 5]);
  const m = randomChoice([-4, -3, -2, -1, 1, 2, 3, 5, 0.5, -0.5]);
  const p = randomInt(-6, 8);
  const T = droiteEq(m, p);
  const fa = m * a + p;
  const ctx = randomChoice(METIERS);
  const intro = randomChoice([
    `La tangente à la courbe de $f$ au point d’abscisse $${n(a)}$ a pour équation $${T}$.`,
    `${ctx[0]} a tracé la tangente à la courbe de $f$ en $${n(a)}$ : son équation est $${T}$.`,
    `Un logiciel de géométrie donne la tangente à la courbe de $f$ en $x = ${n(a)}$ : $${T}$.`,
  ]);
  if (randomInt(1, 2) === 1) {
    return court(
      `${intro} ${randomChoice([`Que vaut $f'(${n(a)})$ ?`, `Quel est le nombre dérivé de $f$ en $${n(a)}$ ?`])}`,
      m,
      expl("$f'(a)$ est le coefficient directeur de la tangente en $a$.", "on lit le coefficient de $x$ dans l’équation réduite.", `dans $${T}$, le coefficient de $x$ est $${n(m)}$.`, `$f'(${n(a)}) = ${n(m)}$.`)
    );
  }
  return court(
    `${intro} ${randomChoice([`Que vaut $f(${n(a)})$ ?`, `Quelle est l’ordonnée du point de la courbe d’abscisse $${n(a)}$ ?`])}`,
    fa,
    expl("la tangente en $a$ passe par le point $(a\\,;f(a))$ de la courbe.", "on remplace $x$ par $a$ dans l’équation de la tangente.", `$y = ${n(m)} \\times ${pn(a)}${plus(p)} = ${n(fa)}$.`, `$f(${n(a)}) = ${n(fa)}$.`)
  );
}

function genTangenteGraphe() {
  const s = randomChoice([1, -1]);
  const a = randomChoice([0.5, 1]) * s;
  const h = randomInt(-1, 1);
  const k = s > 0 ? randomInt(-3, -1) : randomInt(1, 3);
  const x0 = h + randomChoice([-2, -1, 1, 2]);
  const y0 = a * (x0 - h) ** 2 + k;
  const pente = 2 * a * (x0 - h);
  const canvas = {
    kind: "fonctionGraphique",
    size: { width: 320, height: 250 },
    xmin: -4,
    xmax: 4,
    ymin: -5,
    ymax: 5,
    grille: true,
    courbes: [
      { id: "f", type: "quadratique", a, b: -2 * a * h, c: a * h * h + k, couleur: "#2563eb" },
      { id: "t", type: "affine", a: pente, b: y0 - pente * x0, couleur: "#16a34a" },
    ],
    misesEnEvidence: [{ point: { x: x0, y: y0, label: "A", couleur: "#dc2626" } }],
  } as CanvasFigure;
  return court(
    randomChoice([
      `La droite verte est la tangente à la courbe de $f$ au point A d’abscisse $${n(x0)}$. Lis $f'(${n(x0)})$ sur le graphique.`,
      `On a tracé la courbe de $f$ (en bleu) et sa tangente en A (en vert). Quel est le coefficient directeur de cette tangente ?`,
      `${randomChoice(["Une géomètre", "Un ingénieur des routes", "Une skateuse", "Un dessinateur industriel", "Une conductrice de travaux"])} a tracé un profil (en bleu) et sa tangente en A (en vert). Que vaut le nombre dérivé en A ?`,
      `Sur le graphique, la droite verte touche la courbe bleue au point A. Quelle est la pente de cette tangente ?`,
      `Le point A a pour abscisse $${n(x0)}$. Grâce à la tangente tracée en vert, donne le nombre dérivé de $f$ en $${n(x0)}$.`,
      `Lecture graphique : quel est le coefficient directeur de la droite verte, tangente à la courbe en A ?`,
    ]),
    pente,
    expl("le nombre dérivé $f'(a)$ est le coefficient directeur de la tangente en $a$.", "sur la tangente, on avance de 1 en abscisse et on lit de combien on monte (ou on descend).", `en partant de A, on ${pente >= 0 ? "monte" : "descend"} de $${n(Math.abs(pente))}$ quand on avance de 1.`, `le coefficient directeur vaut $${n(pente)}$.`),
    canvas
  );
}

function genPenteCalcul() {
  const t = randomInt(1, 3);
  let fx: string, a: number, m: number, calc: string;
  if (t === 1) {
    const termes: Array<[number, number]> = [[randomChoice([1, 2, -1, 3]), randomInt(2, 3)], [randomChoice([-4, -2, 1, 3, 5]), 1], [randomInt(-5, 5), 0]];
    a = randomChoice([-2, -1, 1, 2]);
    fx = poly(termes);
    m = evalPoly(derivPoly(termes), a);
    calc = `$f'(x) = ${poly(derivPoly(termes))}$`;
  } else if (t === 2) {
    const c = randomChoice([2, 3, 5, -1]);
    const k = randomChoice([1, 2, 3, -1]);
    a = 0;
    fx = `${cs(c)}e^{${lin(k, 0)}}`;
    m = c * k;
    calc = `$f'(x) = ${n(c * k)}e^{${lin(k, 0)}}$ et $e^0 = 1$`;
  } else {
    a = 1;
    const c = randomChoice([2, 3, 4, -2]);
    const d = randomChoice([1, -1, 2]);
    fx = `${cs(c)}\\ln x ${d < 0 ? "-" : "+"} ${cs(Math.abs(d))}x`;
    m = c + d;
    calc = `$f'(x) = ${frac(c, "x")} ${d < 0 ? "-" : "+"} ${n(Math.abs(d))}$`;
  }
  return court(
    randomChoice([
      `Soit $f(x) = ${fx}$. Quel est le coefficient directeur de la tangente à sa courbe au point d’abscisse $${n(a)}$ ?`,
      `Quelle est la pente de la tangente à la courbe de $f(x) = ${fx}$ en $x = ${n(a)}$ ?`,
      `${randomChoice(METIERS)[0]} trace la courbe de $f(x) = ${fx}$. Quelle pente a sa tangente au point d’abscisse $${n(a)}$ ?`,
    ]),
    m,
    expl("la pente de la tangente en $a$ est $f'(a)$.", "on dérive, puis on remplace $x$ par $a$.", `${calc}, donc $f'(${n(a)}) = ${n(m)}$.`, `la pente vaut $${n(m)}$.`)
  );
}

function genEquationTangente() {
  const t = randomInt(1, 2);
  let fx = "", a = 0, fa = 0, m = 0;
  do {
  if (t === 1) {
    const termes: Array<[number, number]> = [[randomChoice([1, 2, -1]), 2], [randomChoice([-4, -3, -1, 2, 3]), 1], [randomInt(-4, 5), 0]];
    a = randomChoice([-2, -1, 1, 2, 3]);
    fx = poly(termes);
    fa = evalPoly(termes, a);
    m = evalPoly(derivPoly(termes), a);
  } else {
    const termes: Array<[number, number]> = [[randomChoice([1, -1]), 3], [randomChoice([-3, -2, 1, 2]), 1], [randomInt(-3, 3), 0]];
    a = randomChoice([-1, 1, 2]);
    fx = poly(termes);
    fa = evalPoly(termes, a);
    m = evalPoly(derivPoly(termes), a);
  }
  } while (m === 0 || fa === 0);
  const p = fa - m * a;
  const bon = droiteEq(m, p);
  const pieges = [droiteEq(m, fa), droiteEq(fa, m), droiteEq(m, fa + m * a), droiteEq(-m, fa + m * a), droiteEq(m, -p)];
  return qcm(
    randomChoice([
      `Soit $f(x) = ${fx}$. Quelle est l’équation réduite de la tangente à sa courbe au point d’abscisse $${n(a)}$ ?`,
      `Détermine la tangente à la courbe de $f(x) = ${fx}$ en $x = ${n(a)}$.`,
      `${randomChoice(["Une ingénieure", "Un architecte", "Une graphiste 3D", "Un physicien"])} remplace la courbe de $f(x) = ${fx}$ par sa tangente en $${n(a)}$. Quelle est son équation ?`,
    ]),
    $(bon),
    pieges.filter((s) => s !== bon).map($),
    expl("$y = f'(a)(x - a) + f(a)$.", "on calcule $f(a)$ et $f'(a)$, puis on développe.", `$f(${n(a)}) = ${n(fa)}$ et $f'(${n(a)}) = ${n(m)}$ : $y = ${n(m)}(${xPlus(-a)})${plus(fa)}$.`, `$${bon}$.`)
  );
}

function genTangenteExpLn() {
  const t = randomInt(1, 4);
  let fx: string, a: number, m: number, fa: number, dom = "";
  if (t === 1) {
    const mm = randomInt(-3, 3);
    fx = `(${xPlus(mm)})e^{x}`;
    a = 0;
    fa = mm;
    m = mm + 1;
  } else if (t === 2) {
    const k = randomChoice([2, 3, -1, -2, 0.5]);
    fx = `e^{${lin(k, 0)}}`;
    a = 0;
    fa = 1;
    m = k;
  } else if (t === 3) {
    const c = randomChoice([1, 2, 3, -2]);
    fx = `${cs(c)}\\ln x`;
    a = 1;
    fa = 0;
    m = c;
    dom = " sur $]0\\,;+\\infty[$";
  } else {
    const k = randomChoice([2, 3, 4]);
    fx = `\\ln(${lin(k, 1)})`;
    a = 0;
    fa = 0;
    m = k;
    dom = ` sur $]-\\tfrac{1}{${k}}\\,;+\\infty[$`;
  }
  const p = fa - m * a;
  const bon = droiteEq(m, p);
  return qcm(
    randomChoice([
      `Quelle est l’équation de la tangente à la courbe de $f(x) = ${fx}$${dom} au point d’abscisse $${n(a)}$ ?`,
      `Soit $f(x) = ${fx}$${dom}. Sa tangente en $${n(a)}$ a pour équation :`,
      `Pour une approximation, ${minuscule(randomChoice(METIERS)[0])} remplace $f(x) = ${fx}$ par sa tangente en $${n(a)}$. Laquelle ?`,
    ]),
    $(bon),
    [droiteEq(m, fa + 1), droiteEq(fa, m), droiteEq(m + 1, p), droiteEq(-m, p), droiteEq(m, p - 1)].filter((s) => s !== bon).map($),
    expl("$y = f'(a)(x - a) + f(a)$.", "on calcule $f(a)$, on dérive, on calcule $f'(a)$.", `$f(${n(a)}) = ${n(fa)}$ et $f'(${n(a)}) = ${n(m)}$.`, `$${bon}$.`)
  );
}

function genTangenteHorizontale() {
  const F = familleZero();
  return court(
    randomChoice([
      `Soit $f(x) = ${F.fx}$${F.dom}. En quelle abscisse la courbe de $f$ a-t-elle une tangente horizontale ?`,
      `La courbe de $f(x) = ${F.fx}$${F.dom} admet une tangente parallèle à l’axe des abscisses. En quelle abscisse ?`,
      `${randomChoice(["Une architecte", "Un ingénieur des ponts", "Une conceptrice de montagnes russes"])} cherche le point où le profil $f(x) = ${F.fx}$${F.dom} est « à plat ». En quelle abscisse la tangente est-elle horizontale ?`,
    ]),
    F.z,
    expl("une tangente horizontale a un coefficient directeur nul : $f'(a) = 0$.", "on dérive, puis on résout $f'(x) = 0$.", `$f'(x) = ${F.fp}$ s’annule en $${n(F.z)}$.`, `la tangente est horizontale en $x = ${n(F.z)}$.`)
  );
}

/* =========================================================
   DERIVATION_OPTIMISATION
========================================================= */

/** [phrase, lettre, variable, ce que mesure la variable] */
const PARABOLES: Array<[string, string, string, string]> = [
  ["Une gérante de boulangerie estime son bénéfice quotidien, en euros", "B", "x", "le nombre de dizaines de croissants vendus"],
  ["Un entraîneur de basket décrit la hauteur du ballon, en décimètres", "h", "t", "le temps en dixièmes de seconde"],
  ["Une paysagiste calcule l’aire d’un enclos, en m²", "A", "x", "la largeur en mètres"],
  ["Un agronome modélise le rendement d’un champ, en quintaux", "R", "x", "la quantité d’engrais en dizaines de kilos"],
  ["Une community manager modélise le nombre de vues quotidiennes d’une vidéo, en milliers", "V", "t", "le nombre de jours depuis sa mise en ligne"],
  ["Une pharmacienne modélise l’effet d’un traitement, en points", "E", "x", "la dose en milligrammes"],
  ["Un organisateur de concerts estime sa recette, en centaines d’euros", "R", "x", "le prix du billet en euros"],
  ["Une ingénieure du trafic modélise le nombre de voitures qui passent par minute", "N", "x", "la vitesse limite en dizaines de km/h"],
  ["Un artisan ébéniste estime son bénéfice mensuel, en dizaines d’euros", "B", "x", "le nombre de tables fabriquées"],
  ["Une biologiste modélise une population de grenouilles, en centaines", "P", "t", "le nombre d’années"],
  ["Un ingénieur en balistique décrit l’altitude d’une fusée à eau, en mètres", "z", "t", "le temps en secondes"],
  ["Une gestionnaire de parc d’attractions estime le nombre de visiteurs, en centaines", "N", "x", "le prix d’entrée en euros"],
];

function parabole() {
  const [phrase, L, v, desc] = randomChoice(PARABOLES);
  const a = randomChoice([1, 2, 0.5, 3]);
  const k = randomInt(2, 12);
  const c = randomChoice([0, 0, 5, 10, 20]);
  const termes: Array<[number, number]> = [[-a, 2], [2 * a * k, 1], [c, 0]];
  return { phrase, L, v, desc, termes, k, max: a * k * k + c, expr: poly(termes, v), deriv: poly(derivPoly(termes), v) };
}

function genOptimParabole(valeur: boolean) {
  const P = parabole();
  const intro = `${P.phrase} : $${P.L}(${P.v}) = ${P.expr}$, où $${P.v}$ est ${P.desc}.`;
  if (!valeur) {
    return court(
      `${intro} ${randomChoice([`Pour quelle valeur de $${P.v}$ la fonction $${P.L}$ est-elle maximale ?`, `Quelle valeur de $${P.v}$ rend $${P.L}(${P.v})$ la plus grande possible ?`, `Calcule $${P.L}'(${P.v})$, puis donne la valeur de $${P.v}$ qui donne le maximum.`])}`,
      P.k,
      expl("un maximum se trouve là où la dérivée s’annule en passant du positif au négatif.", "on dérive, puis on résout $" + P.L + "'(" + P.v + ") = 0$.", `$${P.L}'(${P.v}) = ${P.deriv}$ s’annule en $${P.v} = ${P.k}$ : positive avant, négative après.`, `le maximum est atteint pour $${P.v} = ${P.k}$.`)
    );
  }
  return court(
    `${intro} ${randomChoice([`Le maximum est atteint pour $${P.v} = ${P.k}$. Quelle est la valeur de ce maximum ?`, `Quelle est la valeur maximale de $${P.L}$ ?`, `Calcule le maximum de $${P.L}$ (tu peux d’abord chercher où $${P.L}'$ s’annule).`])}`,
    P.max,
    expl("le maximum est la valeur de la fonction au point où la dérivée s’annule.", "on trouve $" + P.v + "$, puis on calcule l’image.", `$${P.L}'(${P.v}) = ${P.deriv}$ s’annule en $${P.k}$, et $${P.L}(${P.k}) = ${n(P.max)}$.`, `le maximum vaut $${n(P.max)}$.`)
  );
}

function genOptimSigne() {
  const a = randomInt(1, 9);
  const b = a + randomInt(3, 8);
  const max = randomInt(1, 2) === 1;
  const [qui, L] = randomChoice<[string, string]>([
    ["le bénéfice $B$ d’une coopérative agricole", "B"],
    ["le coût $C$ de production d’une usine de vélos", "C"],
    ["l’altitude $h$ d’un drone de surveillance", "h"],
    ["la température $T$ d’un four de céramiste", "T"],
    ["le rendement $R$ d’un panneau solaire", "R"],
    ["le temps de trajet $D$ d’un livreur", "D"],
    ["la consommation $E$ d’un data center", "E"],
  ]);
  const signe = max ? `positive sur $[0\\,;${a}[$, nulle en $${a}$ et négative sur $]${a}\\,;${b}]$` : `négative sur $[0\\,;${a}[$, nulle en $${a}$ et positive sur $]${a}\\,;${b}]$`;
  const bon = max ? `un maximum en $${a}$` : `un minimum en $${a}$`;
  return qcm(
    randomChoice([`On étudie ${qui} sur $[0\\,;${b}]$. Sa dérivée $${L}'$ est ${signe}. Alors $${L}$ admet :`, `La dérivée ${de(qui)} est ${signe}. Sur $[0\\,;${b}]$, que peut-on dire ?`]),
    bon,
    [max ? `un minimum en $${a}$` : `un maximum en $${a}$`, `un maximum en $${b}$`, "ni maximum ni minimum", `un minimum en $0$`].filter((s) => s !== bon),
    expl("si $f'$ s’annule en changeant de signe, $f$ a un extremum en ce point.", "on lit les variations : $f' > 0$ fait monter, $f' < 0$ fait descendre.", max ? `$${L}$ monte puis descend.` : `$${L}$ descend puis monte.`, `$${L}$ admet ${bon}.`)
  );
}

function genCoutMoyen() {
  const a = randomChoice([1, 2, 4, 5]);
  const r = randomInt(2, 10);
  const c = a * r * r;
  const b = randomChoice([0, 5, 10, 20]);
  const [qui, unite] = randomChoice<[string, string]>([
    ["Une usine de trottinettes", "centaines de trottinettes"],
    ["Un imprimeur", "milliers d’affiches"],
    ["Une brasserie artisanale", "centaines de litres"],
    ["Un fabricant de panneaux solaires", "dizaines de panneaux"],
    ["Une entreprise de cosmétiques", "milliers de flacons"],
    ["Un atelier de vélos électriques", "dizaines de vélos"],
  ]);
  const fx = `${poly([[a, 1], [b, 0]])} + \\dfrac{${c}}{x}`;
  const valeur = randomInt(1, 2) === 1;
  const intro = `${qui} produit $x$ ${unite} ($x > 0$). Son coût moyen est $C_M(x) = ${fx}$.`;
  if (!valeur) {
    return court(
      `${intro} ${randomChoice(["Pour quelle production le coût moyen est-il minimal ?", "On a $C_M'(x) = " + n(a) + " - \\dfrac{" + c + "}{x^2}$. Pour quelle valeur de $x$ le coût moyen est-il le plus bas ?"])}`,
      r,
      expl("le minimum est là où $C_M'$ s’annule en passant du négatif au positif.", "on résout $C_M'(x) = 0$ avec $x > 0$.", `$C_M'(x) = ${n(a)} - \\dfrac{${c}}{x^2} = 0$ donne $x^2 = ${r * r}$, soit $x = ${r}$.`, `le coût moyen est minimal pour $x = ${r}$.`)
    );
  }
  const min = 2 * a * r + b;
  return court(
    `${intro} Le minimum est atteint pour $x = ${r}$. Quel est le coût moyen minimal ?`,
    min,
    expl("la valeur du minimum est l’image du point où $C_M'$ s’annule.", "on remplace $x$ par la valeur trouvée.", `$C_M(${r}) = ${n(a * r + b)} + \\dfrac{${c}}{${r}} = ${n(min)}$.`, `le coût moyen minimal vaut $${n(min)}$.`)
  );
}

function genBoite() {
  const L = randomChoice([6, 12, 18, 24, 30, 36]);
  const [qui, matiere] = randomChoice<[string, string]>([
    ["Un cartonnier", "une plaque de carton carrée"],
    ["Une designer d’emballages", "une feuille de carton carrée"],
    ["Un apprenti chaudronnier", "une tôle carrée"],
    ["Une pâtissière", "une feuille d’aluminium carrée"],
    ["Un ingénieur en logistique", "un carton carré"],
  ]);
  const valeur = randomInt(1, 3) === 1;
  const intro = `${qui} découpe un carré de côté $x$ cm à chaque coin d’${matiere.replace(/^une? /, (m) => (m === "un " ? "un " : "une "))} de côté $${L}$ cm, puis replie les bords pour faire une boîte sans couvercle. Son volume est $V(x) = x(${L} - 2x)^{2}$ pour $0 < x < ${L / 2}$.`;
  const aide = randomChoice(["", ` On admet que $V'(x) = (${L} - 2x)(${L} - 6x)$.`]);
  if (!valeur) {
    return court(
      `${intro}${aide} Pour quelle valeur de $x$ le volume est-il maximal ?`,
      L / 6,
      expl("le maximum est là où $V'$ s’annule en passant du positif au négatif.", "on factorise $V'$ et on cherche ses racines dans $]0\\,;" + L / 2 + "[$.", `$V'(x) = (${L} - 2x)(${L} - 6x)$ s’annule en $${L / 6}$ (et en $${L / 2}$, hors de l’intervalle).`, `le volume est maximal pour $x = ${L / 6}$ cm.`)
    );
  }
  const vmax = (L / 6) * (L - L / 3) ** 2;
  return court(
    `${intro}${aide} Le volume est maximal pour $x = ${L / 6}$. Quel est ce volume maximal, en cm³ ?`,
    vmax,
    expl("le maximum est l’image du point où $V'$ s’annule.", "on remplace $x$.", `$V(${L / 6}) = ${L / 6} \\times ${L - L / 3}^2 = ${vmax}$.`, `le volume maximal est $${vmax}$ cm³.`)
  );
}

function genPicExpo() {
  const b = randomChoice([1, 0.5, 0.25, 0.2, 0.1]);
  const a = randomChoice([2, 5, 10, 20, 50]);
  const eb = b === 1 ? "t" : `${n(b)}t`;
  const [qui, quoi, L, unite] = randomChoice<[string, string, string, string]>([
    ["Une pharmacologue", "la concentration d’un médicament (en mg/L)", "C", "heures"],
    ["Un community manager", "le nombre de partages d’une vidéo (en milliers)", "P", "jours"],
    ["Une hydrologue", "le débit d’une rivière après un orage (en m³/s)", "Q", "heures"],
    ["Un épidémiologiste", "le nombre de nouveaux cas d’une grippe (en centaines)", "N", "jours"],
    ["Une agronome", "la quantité d’azote libérée par un engrais (en kg)", "A", "semaines"],
    ["Un ingénieur du son", "le volume d’une note de piano (en unités arbitraires)", "S", "dixièmes de seconde"],
  ]);
  return court(
    `${qui} modélise ${quoi} par $${L}(t) = ${a}te^{-${eb}}$, avec $t$ en ${unite}. ${randomChoice([`On admet que $${L}'(t) = ${a}(1 - ${b === 1 ? "" : n(b)}t)e^{-${eb}}$. `, ""])}À quel instant $t$ le maximum est-il atteint ?`,
    1 / b,
    expl("le maximum est là où la dérivée s’annule en passant du positif au négatif.", "$(uv)' = u'v + uv'$, puis signe (avec $e^{\\ldots} > 0$).", `$${L}'(t) = ${a}(1 - ${b === 1 ? "" : n(b)}t)e^{-${eb}}$ s’annule pour $t = ${n(1 / b)}$, positive avant, négative après.`, `le maximum est atteint en $t = ${n(1 / b)}$.`)
  );
}

function genBeneficeCubique() {
  let r = 0, s = 0;
  do {
    r = randomInt(3, 10);
    s = randomInt(1, 9);
  } while ((r - s) % 2 !== 0 || s >= r);
  const p = (3 * (r - s)) / 2;
  const q = 3 * r * s;
  const c = -randomChoice([20, 50, 100, 10]);
  const termes: Array<[number, number]> = [[-1, 3], [p, 2], [q, 1], [c, 0]];
  const [qui, unite] = randomChoice<[string, string]>([
    ["Une start-up de casques audio", "centaines de casques"],
    ["Un fromager", "centaines de kilos de fromage"],
    ["Une entreprise de drones", "dizaines de drones"],
    ["Un studio de jeux vidéo", "milliers de licences"],
    ["Une chocolaterie", "centaines de tablettes"],
  ]);
  return court(
    `${qui} vend $x$ ${unite} ($0 \\le x \\le ${r + 5}$). Son bénéfice est $B(x) = ${poly(termes)}$.${randomChoice([` On a $B'(x) = -3(${xPlus(-r)})(${xPlus(s)})$.`, ""])} Pour quelle valeur de $x$ le bénéfice est-il maximal ?`,
    r,
    expl("le maximum est là où $B'$ s’annule en passant du positif au négatif.", "on dérive et on factorise $B'$.", `$B'(x) = ${poly(derivPoly(termes))} = -3(${xPlus(-r)})(${xPlus(s)})$ : sur $[0\\,;${r + 5}]$, positive avant $${r}$, négative après.`, `le bénéfice est maximal pour $x = ${r}$.`)
  );
}

/* =========================================================
   DERIVATION_DEFI
========================================================= */

const INTRO_DEFI = ["Exercice type bac.", "Sujet de bac, partie A.", "Étude de fonction.", "Problème."];

function cubique() {
  const r1 = randomInt(-4, 1);
  const r2 = r1 + 2 * randomInt(1, 3);
  const p = (-3 * (r1 + r2)) / 2;
  const q = 3 * r1 * r2;
  const c = randomInt(-5, 5);
  const termes: Array<[number, number]> = [[1, 3], [p, 2], [q, 1], [c, 0]];
  return { r1, r2, termes, fx: poly(termes), fp: poly(derivPoly(termes)) };
}

function genDefiCubique(niv: 4 | 5) {
  const C = cubique();
  const intro = `${randomChoice(INTRO_DEFI)} Soit $f(x) = ${C.fx}$ sur $\\mathbb{R}$.`;
  const t = niv === 4 ? randomInt(1, 2) : randomInt(3, 4);
  if (t === 1) {
    const d = derivPoly(C.termes);
    return qcm(
      `${intro} Quelle est sa dérivée ?`,
      $(C.fp),
      [
        poly([[1, 2], [2 * C.termes[1][0], 1], [C.termes[2][0], 0]]),
        poly([[3, 2], [C.termes[1][0], 1], [C.termes[2][0], 0]]),
        poly([...d, [C.termes[3][0], 0]]),
        poly(C.termes.map(([c, p]) => [c * p, p])),
        poly([[3, 2], [2 * C.termes[1][0], 1], [-C.termes[2][0], 0]]),
        poly([[3, 2], [-2 * C.termes[1][0], 1], [C.termes[2][0], 0]]),
      ].filter((s) => s !== C.fp).map($),
      expl("$(x^n)' = nx^{n-1}$.", "on dérive terme à terme.", `$f'(x) = ${C.fp}$.`, `$f'(x) = ${C.fp}$.`)
    );
  }
  if (t === 2) {
    return court(
      `${intro} On a $f'(x) = ${C.fp}$. Quelle est la plus grande des deux valeurs qui annulent $f'$ ?`,
      C.r2,
      expl("on résout $f'(x) = 0$.", "on factorise par 3, puis on cherche deux racines (somme et produit, ou discriminant).", `$f'(x) = 3${fac(C.r1)}${fac(C.r2)}$.`, `la plus grande racine est $${C.r2}$.`)
    );
  }
  if (t === 3) {
    const bon = ferme(C.r1, C.r2);
    return qcm(
      `${intro} Sur quel intervalle $f$ est-elle décroissante ?`,
      bon,
      [`$]-\\infty\\,;${n(C.r1)}]$ et $[${n(C.r2)}\\,;+\\infty[$`, ferme(-C.r2, -C.r1), droite(C.r2), gauche(C.r1)],
      expl("$f$ décroissante là où $f' \\le 0$.", "on factorise $f'$ et on fait le tableau de signes.", `$f'(x) = 3${fac(C.r1)}${fac(C.r2)}$ est négative entre les racines.`, `$f$ est décroissante sur ${bon}.`)
    );
  }
  const vmax = evalPoly(C.termes, C.r1);
  return court(
    `${intro} On a $f'(x) = 3${fac(C.r1)}${fac(C.r2)}$. Quelle est la valeur du maximum local de $f$ ?`,
    vmax,
    expl("un maximum local est atteint là où $f'$ passe du positif au négatif.", "on lit le tableau de signes de $f'$, puis on calcule l’image.", `$f'$ passe de $+$ à $-$ en $${n(C.r1)}$ ; $f(${n(C.r1)}) = ${n(vmax)}$.`, `le maximum local vaut $${n(vmax)}$.`)
  );
}

function genDefiExp(niv: 4 | 5) {
  const m = randomInt(-3, 3);
  const k = -m - 1;
  const intro = `${randomChoice(INTRO_DEFI)} Soit $f(x) = (${xPlus(m)})e^{x}$ sur $\\mathbb{R}$.`;
  if (niv === 4) {
    return court(
      `${intro} ${randomChoice(["En quelle valeur de $x$ la fonction $f$ atteint-elle son minimum ?", "Calcule $f'(x)$, puis donne l’abscisse du minimum de $f$."])}`,
      k,
      expl("le minimum est là où $f'$ passe du négatif au positif.", "$(uv)' = u'v + uv'$, puis signe de $f'$ (avec $e^x > 0$).", `$f'(x) = (${xPlus(m + 1)})e^{x}$ s’annule en $${k}$.`, `le minimum est atteint en $x = ${k}$.`)
    );
  }
  const bon = `-${expE(k)}`;
  return qcm(
    `${intro} On a $f'(x) = (${xPlus(m + 1)})e^{x}$. Quelle est la valeur du minimum de $f$ ?`,
    $(bon),
    [expE(k), k === 0 ? "0" : `-${expE(-k)}`, n(k), `${expE(k)} - 1`].filter((s) => s !== bon).map($),
    expl("le minimum est l’image du point où $f'$ s’annule.", "on remplace $x$ par la racine de $f'$.", `$f(${k}) = (${k}${plus(m)}) \\times ${expE(k)} = -${expE(k)}$.`, `le minimum vaut $-${expE(k)}$.`)
  );
}

function genDefiLn(niv: 4 | 5) {
  const a = niv === 4 ? randomChoice([2, 4, 5, 10]) : randomChoice([2, 3, 4, 5, 10]);
  const intro = `${randomChoice(INTRO_DEFI)} Soit $f(x) = ${a}x - \\ln x$ sur $]0\\,;+\\infty[$.`;
  if (niv === 4) {
    return court(
      `${intro} En quelle valeur de $x$ la fonction $f$ atteint-elle son minimum ?`,
      1 / a,
      expl("le minimum est là où $f'$ passe du négatif au positif.", "on dérive, puis on résout $f'(x) = 0$.", `$f'(x) = ${a} - \\dfrac{1}{x} = \\dfrac{${a}x - 1}{x}$ s’annule en $\\dfrac{1}{${a}} = ${n(1 / a)}$.`, `le minimum est atteint en $x = ${n(1 / a)}$.`)
    );
  }
  const bon = `1 + \\ln ${a}`;
  return qcm(
    `${intro} Le minimum est atteint en $x = \\dfrac{1}{${a}}$. Quelle est la valeur de ce minimum ?`,
    $(bon),
    [`1 - \\ln ${a}`, `\\ln ${a}`, `${a} - \\ln ${a}`, `-\\ln ${a}`].map($),
    expl("le minimum est l’image du point où $f'$ s’annule.", "$\\ln\\left(\\dfrac{1}{a}\\right) = -\\ln a$.", `$f\\left(\\dfrac{1}{${a}}\\right) = 1 - \\ln\\left(\\dfrac{1}{${a}}\\right) = 1 + \\ln ${a}$.`, `le minimum vaut $1 + \\ln ${a}$.`)
  );
}

/* ---------- Gabarits et fusion ---------- */

function tpl(microId: string, difficulty: number, rang: number, generate: () => TutorGeneratedQuestionV4, hint: string): TutorBankItemV4 {
  return {
    kind: "template",
    id: `terminale_spe_derivation_renfort_${microId}_${difficulty}_${rang}`,
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "derivation_fonction",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["terminale-spe", "derivation", "renfort", "template"],
    generate,
  } as TutorBankItemV4;
}

const H_FORM = "Connais tes formules : (xⁿ)' = nxⁿ⁻¹, (eˣ)' = eˣ, (ln x)' = 1/x…";
const H_OP = "(uv)' = u'v + uv' ; (u/v)' = (u'v − uv')/v².";
const H_COMP = "Repère la fonction intérieure u et calcule u' : (eᵘ)' = u'eᵘ, (uⁿ)' = nu'uⁿ⁻¹.";
const H_VAR = "f' > 0 : f croissante ; f' < 0 : f décroissante.";
const H_TAN = "Tangente en a : y = f'(a)(x − a) + f(a).";
const H_OPT = "Un extremum se cherche là où la dérivée s'annule en changeant de signe.";

type Ligne = [string, number, () => TutorGeneratedQuestionV4, string];

const LIGNES: Ligne[] = [
  ["derivation_formules", 1, () => genFormule(1), H_FORM],
  ["derivation_formules", 1, () => genVraiFauxFormule(1), H_FORM],
  ["derivation_formules", 1, () => genFormule(1), H_FORM],
  ["derivation_formules", 2, () => genFormule(2), H_FORM],
  ["derivation_formules", 2, () => genVraiFauxFormule(2), H_FORM],
  ["derivation_formules", 2, genValeurDerivee, "On dérive d'abord, puis on remplace x."],
  ["derivation_formules", 3, genFormuleSomme, "On dérive terme à terme."],
  ["derivation_formules", 3, () => genFormule(2), H_FORM],
  ["derivation_formules", 3, genValeurDerivee, "On dérive d'abord, puis on remplace x."],

  ["derivation_somme_produit_quotient", 2, () => genPolynome(2), "On dérive terme à terme."],
  ["derivation_somme_produit_quotient", 2, genFormuleSomme, "On dérive terme à terme."],
  ["derivation_somme_produit_quotient", 3, () => genPolynome(3), "On dérive terme à terme."],
  ["derivation_somme_produit_quotient", 3, genProduit, H_OP],
  ["derivation_somme_produit_quotient", 3, genFormuleSomme, "On dérive terme à terme."],
  ["derivation_somme_produit_quotient", 4, genProduit, H_OP],
  ["derivation_somme_produit_quotient", 4, genQuotient, H_OP],
  ["derivation_somme_produit_quotient", 4, genValeurOperation, H_OP],
  ["derivation_somme_produit_quotient", 5, genQuotient, H_OP],
  ["derivation_somme_produit_quotient", 5, genValeurOperation, H_OP],
  ["derivation_somme_produit_quotient", 5, genProduit, H_OP],

  ["derivation_composee", 3, () => genComposee(3), H_COMP],
  ["derivation_composee", 3, genComposeeValeur, H_COMP],
  ["derivation_composee", 3, () => genComposee(4), H_COMP],
  ["derivation_composee", 4, () => genComposee(4), H_COMP],
  ["derivation_composee", 4, genComposeeValeur, H_COMP],
  ["derivation_composee", 4, genComposeeContexte, H_COMP],
  ["derivation_composee", 5, () => genComposee(5), H_COMP],
  ["derivation_composee", 5, genComposeeContexte, H_COMP],
  ["derivation_composee", 5, () => genComposee(4), H_COMP],

  ["derivation_variation", 2, genSigneDerivee, H_VAR],
  ["derivation_variation", 2, genOptimSigne, H_VAR],
  ["derivation_variation", 2, genSigneDerivee, H_VAR],
  ["derivation_variation", 3, genZeroDerivee, "On résout f'(x) = 0."],
  ["derivation_variation", 3, genSigneDerivee, H_VAR],
  ["derivation_variation", 3, genIntervalleVariation, H_VAR],
  ["derivation_variation", 4, genIntervalleVariation, H_VAR],
  ["derivation_variation", 4, genZeroDerivee, "On résout f'(x) = 0."],
  ["derivation_variation", 4, genIntervalleVariation, H_VAR],

  ["derivation_tangente", 2, genTangenteDonnees, H_TAN],
  ["derivation_tangente", 2, genTangenteGraphe, "Le nombre dérivé est la pente de la tangente."],
  ["derivation_tangente", 2, genTangenteLue, "Dans y = mx + p, le coefficient directeur est m."],
  ["derivation_tangente", 3, genPenteCalcul, "La pente de la tangente en a est f'(a)."],
  ["derivation_tangente", 3, genTangenteGraphe, "Le nombre dérivé est la pente de la tangente."],
  ["derivation_tangente", 3, genTangenteDonnees, H_TAN],
  ["derivation_tangente", 4, genEquationTangente, H_TAN],
  ["derivation_tangente", 4, genTangenteHorizontale, "Tangente horizontale : f'(a) = 0."],
  ["derivation_tangente", 4, genPenteCalcul, "La pente de la tangente en a est f'(a)."],
  ["derivation_tangente", 5, genTangenteExpLn, H_TAN],
  ["derivation_tangente", 5, genEquationTangente, H_TAN],
  ["derivation_tangente", 5, genTangenteHorizontale, "Tangente horizontale : f'(a) = 0."],

  ["derivation_optimisation", 3, () => genOptimParabole(false), H_OPT],
  ["derivation_optimisation", 3, genOptimSigne, H_OPT],
  ["derivation_optimisation", 3, () => genOptimParabole(true), H_OPT],
  ["derivation_optimisation", 4, () => genOptimParabole(true), H_OPT],
  ["derivation_optimisation", 4, genCoutMoyen, H_OPT],
  ["derivation_optimisation", 4, genBoite, H_OPT],
  ["derivation_optimisation", 5, genBoite, H_OPT],
  ["derivation_optimisation", 5, genPicExpo, H_OPT],
  ["derivation_optimisation", 5, genBeneficeCubique, H_OPT],
  ["derivation_optimisation", 5, genCoutMoyen, H_OPT],

  ["derivation_defi", 4, () => genDefiCubique(4), H_VAR],
  ["derivation_defi", 4, () => genDefiExp(4), H_OPT],
  ["derivation_defi", 4, () => genDefiLn(4), H_OPT],
  ["derivation_defi", 4, genTangenteExpLn, H_TAN],
  ["derivation_defi", 5, () => genDefiCubique(5), H_VAR],
  ["derivation_defi", 5, () => genDefiExp(5), H_OPT],
  ["derivation_defi", 5, () => genDefiLn(5), H_OPT],
  ["derivation_defi", 5, genBeneficeCubique, H_OPT],
  ["derivation_defi", 5, genPicExpo, H_OPT],
];

export const renfortDerivation: TutorBankItemV4[] = (() => {
  const rangs = new Map<string, number>();
  return LIGNES.map(([micro, d, g, h]) => {
    const cle = `${micro}_${d}`;
    const r = (rangs.get(cle) ?? 0) + 1;
    rangs.set(cle, r);
    return tpl(micro, d, r, g, h);
  });
})();
