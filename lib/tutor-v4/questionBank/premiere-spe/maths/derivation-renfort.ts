// Renfort dérivation de 1re spé (02/11/2026).
//
// Mesure du 02/11 (scripts/mesurer-squelettes-coach.ts premiere-spe
// derivation_formules derivation_nombre_derive derivation_operations
// derivation_tangente) : 9 à 62 squelettes par micro, 5 à 18 répétitions sur
// 20 à chaque étoile. On branche des GÉNÉRATEURS : familles de fonctions ×
// tournures × situations (physique, économie, santé, sport, ingénierie,
// biologie, informatique : les maths sont transversales). Aucune question
// « open » : QCM ou réponse courte (un nombre). Toute réponse qui est une
// expression passe en QCM ; les pièges sont des erreurs d'élève typiques.

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { makeChoices } from "@/lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank";

/* ---------- Sonde de contrôle (scripts de vérification seulement) ---------- */

/** Ce que le générateur affirme, pour qu'un script le vérifie numériquement. */
export type SondeDerivation = {
  /** f en LaTeX (sans $), variable v (x par défaut). */
  f?: string;
  v?: string;
  /** f' en LaTeX : doit être la dérivée de f. */
  df?: string;
  /** f'(x0) = val. */
  x0?: number;
  val?: number;
  /** La réponse courte attendue (nombre). */
  rep?: number;
  /** Fonctions dont la dérivée n'est PAS df (pièges « primitive »). */
  nonPrimitives?: string[];
  /** Taux de variation de f entre a et b. */
  taux?: { a: number; b: number; val: number };
  /** Expression en h : f(a+h) − f(a) (diff) ou le taux entre a et a+h (taux). */
  exprH?: { a: number; kind: "diff" | "taux"; expr: string };
  /** Tangente au point d'abscisse a : « mx + p » (F = f(a), m = f'(a) si f absente). */
  tan?: { a: number; F?: number; m?: number; eq: string };
};
let sonde: ((s: SondeDerivation) => void) | null = null;
export function sonderDerivation(fn: ((s: SondeDerivation) => void) | null) {
  sonde = fn;
}
const ctl = (s: SondeDerivation) => sonde?.(s);

/* ---------- Outils ---------- */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const exact = (x: number) => Number.isFinite(x) && Math.abs(x * 1000 - Math.round(x * 1000)) < 1e-6;

/** Nombre en LaTeX : virgule décimale « {,} ». */
function n(x: number) {
  const r = Math.round(x * 1000) / 1000;
  return String(r === 0 ? 0 : r).replace(".", "{,}");
}

/** Nombre long (6 décimales) en LaTeX. */
function nL(x: number) {
  const r = Math.round(x * 1e6) / 1e6;
  return String(r === 0 ? 0 : r).replace(".", "{,}");
}

/** Nombre pour une réponse tapée : virgule décimale. */
function fr(x: number) {
  const r = Math.round(x * 1000) / 1000;
  return String(r === 0 ? 0 : r).replace(".", ",");
}

/** Nombre entre parenthèses s'il est négatif (pour une substitution). */
const par = (x: number) => (x < 0 ? `(${n(x)})` : n(x));

/** x^p en LaTeX (accolades si p < 0 ou p > 9). */
function puiss(p: number, v = "x") {
  return p === 1 ? v : p < 0 || p > 9 ? `${v}^{${p}}` : `${v}^${p}`;
}

/** Polynôme en LaTeX à partir de [coefficient, puissance], sans les termes nuls. */
function poly(termes: Array<[number, number]>, v = "x") {
  let s = "";
  for (const [c, p] of termes) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const corps = p === 0 ? n(abs) : `${abs === 1 ? "" : n(abs)}${puiss(p, v)}`;
    if (!s) s = (c < 0 ? "-" : "") + corps;
    else s += (c < 0 ? " - " : " + ") + corps;
  }
  return s || "0";
}
const mono = (c: number, p: number, v = "x") => poly([[c, p]], v);
const lin = (a: number, b: number, v = "x") => poly([[a, 1], [b, 0]], v);

/** Coefficient devant une expression : « », « - », « 3 ». */
const coef = (k: number) => (k === 1 ? "" : k === -1 ? "-" : n(k));

/** « + 5 », « - 3 » ou rien. */
const plusC = (c: number) => (c === 0 ? "" : c > 0 ? ` + ${n(c)}` : ` - ${n(-c)}`);

/** Fraction num / den, le signe sorti devant. */
function frac(num: number, den: string) {
  return num < 0 ? `-\\dfrac{${n(-num)}}{${den}}` : `\\dfrac{${n(num)}}{${den}}`;
}

function pgcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

/** Fraction d'entiers p / q réduite (« 3 », « -\dfrac{1}{2} »). */
function fq(p: number, q: number) {
  const g = pgcd(p, q);
  let a = p / g;
  let b = q / g;
  if (b < 0) {
    a = -a;
    b = -b;
  }
  return b === 1 ? n(a) : frac(a, String(b));
}

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul / Observation : ${calcul}\n\nConclusion : ${conclusion}`;
}

/** Hors des $…$, la virgule décimale s'écrit « , » et non « {,} ». */
function propre(s: string) {
  return s
    .split("$")
    .map((morceau, i) => (i % 2 === 0 ? morceau.replace(/\{,\}/g, ",") : morceau))
    .join("$");
}

function qcm(text: string, correct: string, pieges: string[], explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  const bon = propre(correct);
  return { text: propre(text), format: "qcm", choices: makeChoices(bon, pieges.map(propre)), expected: [bon], comparator: "mcq_exact", explanation: propre(explanation), ...(canvas ? { canvas } : {}) };
}

function court(text: string, valeur: number, explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  return { text: propre(text), format: "short", expected: [fr(valeur)], comparator: "number_equal", explanation: propre(explanation), ...(canvas ? { canvas } : {}) };
}

const PRENOMS = ["Léa", "Nassim", "Inès", "Tom", "Chloé", "Yanis", "Jade", "Malo", "Aïcha", "Hugo", "Sofia", "Enzo", "Maëlys", "Rayan", "Zoé", "Lucas"];
const PRENOMS_F = ["Léa", "Inès", "Chloé", "Jade", "Aïcha", "Sofia", "Maëlys", "Zoé", "Nora", "Emma"];

/** Métiers × grandeurs modélisées (une seule situation réunionnaise sur 26). */
const SITUATIONS: Array<[string, string]> = [
  ["Une ingénieure en aéronautique", "la portance d’une aile"],
  ["Un économiste", "le bénéfice d’une entreprise"],
  ["Une pharmacienne", "la concentration d’un médicament"],
  ["Un entraîneur d’athlétisme", "la distance parcourue par un sprinteur"],
  ["Une biologiste", "la taille d’une colonie de bactéries"],
  ["Un développeur de jeux vidéo", "la trajectoire d’un personnage"],
  ["Une architecte", "le profil d’un toit"],
  ["Un climatologue", "la température d’un océan"],
  ["Une data scientist", "le nombre de visites d’un site"],
  ["Un ingénieur du son", "le volume d’une enceinte"],
  ["Une agronome", "le rendement d’un champ"],
  ["Un kinésithérapeute", "l’amplitude d’un mouvement"],
  ["Une ingénieure en énergie solaire", "la production d’un panneau"],
  ["Un banquier", "la valeur d’un placement"],
  ["Une urbaniste", "le trafic sur une avenue"],
  ["Un chimiste", "l’avancement d’une réaction"],
  ["Une médecin du sport", "le rythme cardiaque d’une coureuse"],
  ["Un ingénieur automobile", "la consommation d’une voiture"],
  ["Une géologue", "la hauteur d’une nappe d’eau"],
  ["Un astronome", "la position d’une comète"],
  ["Une logisticienne", "le coût d’une livraison"],
  ["Un ingénieur en robotique", "la position d’un bras articulé"],
  ["Une océanographe", "la hauteur de la marée"],
  ["Un nutritionniste", "l’énergie apportée par un repas"],
  ["Une informaticienne", "le temps de calcul d’un programme"],
  ["Un volcanologue de l’observatoire du Piton de la Fournaise", "la hauteur d’une coulée de lave"],
];

function avecSituation(f: string, question: string, fn = "f", v = "x") {
  const [qui, quoi] = randomChoice(SITUATIONS);
  return `${qui} modélise ${quoi} par $${fn}(${v}) = ${f}$. ${question}`;
}

function enonceDerivee(f: string) {
  return randomChoice([
    `Quelle est la dérivée de $f(x) = ${f}$ ?`,
    `Soit $f(x) = ${f}$. Que vaut $f'(x)$ ?`,
    `On dérive $f(x) = ${f}$. Quel résultat obtient-on ?`,
    `Parmi ces expressions, laquelle est $f'(x)$ pour $f(x) = ${f}$ ?`,
    `${randomChoice(PRENOMS)} doit dériver $f(x) = ${f}$. Quel est le bon résultat ?`,
    avecSituation(f, "Quelle est $f'(x)$ ?"),
    avecSituation(f, "Pour étudier ses variations, on calcule $f'(x)$. Que vaut-elle ?"),
  ]);
}

function enonceValeur(f: string, a: number) {
  return randomChoice([
    `Soit $f(x) = ${f}$. Calcule $f'(${n(a)})$.`,
    `Pour $f(x) = ${f}$, que vaut le nombre dérivé en $${n(a)}$ ?`,
    `On donne $f(x) = ${f}$. Quel est le nombre dérivé de $f$ en $x = ${n(a)}$ ?`,
    `Aide ${randomChoice(PRENOMS)} : pour $f(x) = ${f}$, combien vaut $f'(${n(a)})$ ?`,
    avecSituation(f, `Que vaut $f'(${n(a)})$ ?`),
    avecSituation(f, `Calcule le nombre dérivé $f'(${n(a)})$.`),
  ]);
}

/* ---------- Figures ---------- */

type Marque = { x: number; y: number; label: string };

function figure(o: {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  quad?: [number, number, number];
  pts?: Array<{ x: number; y: number }>;
  droites?: Array<[number, number]>;
  marques?: Marque[];
}): CanvasFigure {
  const courbes: any[] = [];
  if (o.quad) courbes.push({ id: "f", type: "quadratique", a: o.quad[0], b: o.quad[1], c: o.quad[2], couleur: "#2563eb" });
  if (o.pts) courbes.push({ id: "f", type: "points", points: o.pts, couleur: "#2563eb" });
  (o.droites ?? []).forEach(([a, b], i) => courbes.push({ id: `d${i}`, type: "affine", a, b, couleur: "#dc2626" }));
  return {
    kind: "fonctionGraphique",
    size: { width: 320, height: 320 },
    xmin: o.xmin,
    xmax: o.xmax,
    ymin: o.ymin,
    ymax: o.ymax,
    grille: true,
    courbes,
    misesEnEvidence: (o.marques ?? []).map((m) => ({ point: { x: m.x, y: m.y, label: m.label, couleur: "#16a34a" } })),
  } as CanvasFigure;
}

/** Parabole y = al·x² + be·x + ga avec sa tangente en A d'abscisse a ; fenêtre centrée sur A. */
function figTangente(al: number, be: number, ga: number, a: number) {
  const fa = al * a * a + be * a + ga;
  const m = 2 * al * a + be;
  const demi = Math.max(3, Math.ceil(Math.abs(m)) + 2);
  return {
    fa,
    m,
    canvas: figure({ xmin: a - demi, xmax: a + demi, ymin: fa - demi, ymax: fa + demi, quad: [al, be, ga], droites: [[m, fa - m * a]], marques: [{ x: a, y: fa, label: "A" }] }),
  };
}

/* =========================================================
   DER_USUELLES — dérivées des fonctions de référence
========================================================= */

type Usu = { f: string; df: string; pieges: string[]; d: (x: number) => number; pts: number[]; regle: string };
const PTS_R = [-4, -3, -2, -1, 1, 2, 3, 4];
const PTS_INV = [1, -1, 2, -2, 5, -5, 10, 0.5, -0.5];
const PTS_RAC = [1, 4, 16, 25, 100, 0.25];

function usuelle(niv: number): Usu {
  const k = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]) * randomChoice([1, -1]);
  const cst = (): Usu => {
    const c = randomChoice([2, 3, 4, 5, 7, 8, 9, 12, 15, 20]) * randomChoice([1, -1]);
    return { f: n(c), df: "0", pieges: [n(c), "1", mono(c, 1)], d: () => 0, pts: PTS_R, regle: "la dérivée d’une fonction constante est nulle" };
  };
  const id = (): Usu => ({ f: "x", df: "1", pieges: ["0", "x", "2x"], d: () => 1, pts: PTS_R, regle: "$(x)' = 1$" });
  const carre = (): Usu => ({ f: "x^2", df: "2x", pieges: ["x", "2", "2x^2"], d: (x) => 2 * x, pts: PTS_R, regle: "$(x^2)' = 2x$" });
  const affine = (): Usu => {
    const m = randomChoice([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8]);
    const p = randomChoice([-9, -7, -5, -3, -1, 1, 2, 4, 6, 8, 10].filter((q) => q !== m));
    return { f: lin(m, p), df: n(m), pieges: [mono(m, 1), n(p), n(m + p)], d: () => m, pts: PTS_R, regle: "$(mx + p)' = m$ : la dérivée d’une fonction affine est son coefficient directeur" };
  };
  const xn = (lo: number, hi: number): Usu => {
    const p = randomInt(lo, hi);
    return { f: puiss(p), df: mono(p, p - 1), pieges: [puiss(p - 1), mono(p, p), mono(p - 1, p - 1)], d: (x) => p * x ** (p - 1), pts: [-2, -1, 1, 2], regle: `$(x^n)' = nx^{n-1}$, ici avec $n = ${p}$` };
  };
  const kcarre = (): Usu => ({ f: mono(k, 2), df: mono(2 * k, 1), pieges: [mono(k, 1), n(2 * k), mono(2 * k, 2)], d: (x) => 2 * k * x, pts: PTS_R, regle: "$(kx^2)' = k \\times 2x$" });
  const kxn = (lo: number, hi: number): Usu => {
    const p = randomInt(lo, hi);
    return { f: mono(k, p), df: mono(k * p, p - 1), pieges: [mono(k, p - 1), mono(k * p, p), mono(k * (p - 1), p - 1)], d: (x) => k * p * x ** (p - 1), pts: [-2, -1, 1, 2], regle: `$(kx^n)' = k \\times nx^{n-1}$, ici avec $n = ${p}$` };
  };
  const inverse = (): Usu => ({ f: "\\dfrac{1}{x}", df: "-\\dfrac{1}{x^2}", pieges: ["\\dfrac{1}{x^2}", "-\\dfrac{1}{x}", "\\dfrac{1}{2\\sqrt{x}}"], d: (x) => -1 / (x * x), pts: PTS_INV, regle: "$\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$ pour $x \\neq 0$" });
  const racine = (): Usu => ({ f: "\\sqrt{x}", df: "\\dfrac{1}{2\\sqrt{x}}", pieges: ["\\dfrac{1}{\\sqrt{x}}", "2\\sqrt{x}", "\\dfrac{\\sqrt{x}}{2}"], d: (x) => 1 / (2 * Math.sqrt(x)), pts: PTS_RAC, regle: "$(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$ pour $x > 0$" });
  const kinv = (): Usu => {
    const c = randomInt(2, 9);
    const s = randomChoice([1, -1]);
    return { f: frac(s * c, "x"), df: frac(-s * c, "x^2"), pieges: [frac(s * c, "x^2"), frac(-s, "x^2"), frac(-s * c, "x")], d: (x) => (-s * c) / (x * x), pts: PTS_INV, regle: "$\\left(\\dfrac{k}{x}\\right)' = k \\times \\left(-\\dfrac{1}{x^2}\\right) = -\\dfrac{k}{x^2}$" };
  };
  const krac = (): Usu => {
    const c = randomInt(2, 8);
    const df = c % 2 === 0 ? `\\dfrac{${c / 2}}{\\sqrt{x}}` : `\\dfrac{${c}}{2\\sqrt{x}}`;
    return { f: `${c}\\sqrt{x}`, df, pieges: ["\\dfrac{1}{2\\sqrt{x}}", `\\dfrac{${c}}{\\sqrt{x}}`, `\\dfrac{${c}\\sqrt{x}}{2}`, `${2 * c}\\sqrt{x}`], d: (x) => c / (2 * Math.sqrt(x)), pts: PTS_RAC, regle: "$(k\\sqrt{x})' = k \\times \\dfrac{1}{2\\sqrt{x}}$" };
  };
  const pools: Array<Array<() => Usu>> = [
    [cst, id, carre, affine],
    [cst, affine, () => xn(3, 4), kcarre],
    [inverse, racine, () => xn(5, 8), () => kxn(3, 3)],
    [kinv, krac, () => kxn(3, 7)],
    [kinv, krac, () => kxn(8, 12), inverse, racine],
  ];
  return randomChoice(pools[Math.min(Math.max(niv, 1), 5) - 1])();
}

const DEF_US = "on utilise le tableau des dérivées usuelles.";

function genUsDerivee(niv: number) {
  return () => {
    const u = usuelle(niv);
    ctl({ f: u.f, df: u.df });
    return qcm(enonceDerivee(u.f), `$${u.df}$`, u.pieges.map((p) => `$${p}$`), expl(DEF_US, `${u.regle}.`, `$f(x) = ${u.f}$, donc $f'(x) = ${u.df}$.`, `$f'(x) = ${u.df}$.`));
  };
}

function genUsValeur(niv: number) {
  return () => {
    const u = usuelle(niv);
    const a = randomChoice(u.pts);
    const v = u.d(a);
    ctl({ f: u.f, x0: a, val: v, rep: v });
    return court(
      enonceValeur(u.f, a),
      v,
      expl("le nombre dérivé $f'(a)$ s’obtient en remplaçant $x$ par $a$ dans $f'(x)$.", `${u.regle}, donc $f'(x) = ${u.df}$.`, `on remplace $x$ par $${n(a)}$ : $f'(${n(a)}) = ${n(v)}$.`, `$f'(${n(a)}) = ${n(v)}$.`)
    );
  };
}

function genUsVraiFaux(niv: number) {
  return () => {
    const u = usuelle(niv);
    const juste = Math.random() < 0.5;
    const [p1, p2] = shuffle(u.pieges);
    const aff = juste ? u.df : p1;
    ctl({ f: u.f, df: u.df });
    const ex = expl(DEF_US, `${u.regle}.`, `$f(x) = ${u.f}$, donc $f'(x) = ${u.df}$.`, juste ? "le résultat proposé est juste." : `le résultat proposé est faux : $f'(x) = ${u.df}$.`);
    const t = randomInt(1, 4);
    if (t === 1) return qcm(`Vrai ou faux ? La dérivée de $f(x) = ${u.f}$ est $f'(x) = ${aff}$.`, juste ? "Vrai" : "Faux", [juste ? "Faux" : "Vrai"], ex);
    const [qui] = randomChoice(SITUATIONS);
    const intro =
      t === 2
        ? `${randomChoice(PRENOMS)} affirme : « si $f(x) = ${u.f}$, alors $f'(x) = ${aff}$ ».`
        : t === 3
          ? `Dans sa copie, ${randomChoice(PRENOMS)} écrit : $f(x) = ${u.f}$, donc $f'(x) = ${aff}$.`
          : `${qui} a trouvé $f'(x) = ${aff}$ pour $f(x) = ${u.f}$.`;
    const bon = juste ? "Oui" : `Non, $f'(x) = ${u.df}$`;
    const pieges = juste ? [`Non, $f'(x) = ${p1}$`, `Non, $f'(x) = ${p2}$`] : ["Oui", `Non, $f'(x) = ${p2}$`];
    return qcm(`${intro} Est-ce juste ?`, bon, pieges, ex);
  };
}

function genUsRetrouver(niv: number) {
  return () => {
    const c = randomChoice([0, 1, 2, -3, 5, -7, 10]);
    const t = randomInt(1, niv >= 5 ? 6 : 5);
    let Y = "", F = "", P: string[] = [];
    if (t === 1) {
      const p = randomInt(2, 6);
      Y = mono(p, p - 1);
      F = puiss(p) + plusC(c);
      P = [mono(p, p), puiss(p - 1), puiss(p + 1)];
    } else if (t === 2) {
      Y = "-\\dfrac{1}{x^2}";
      F = "\\dfrac{1}{x}" + plusC(c);
      P = ["-\\dfrac{1}{x}", "\\dfrac{1}{x^2}", "-\\dfrac{1}{x^3}"];
    } else if (t === 3) {
      Y = "\\dfrac{1}{2\\sqrt{x}}";
      F = "\\sqrt{x}" + plusC(c);
      P = ["2\\sqrt{x}", "\\dfrac{1}{\\sqrt{x}}", "\\dfrac{\\sqrt{x}}{2}"];
    } else if (t === 4) {
      const k = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]) * randomChoice([1, -1]);
      Y = n(k);
      F = poly([[k, 1], [c, 0]]);
      P = [n(k), poly([[1, 1], [k, 0]]), mono(k, 2)];
    } else if (t === 5) {
      const k = randomInt(2, 5);
      Y = mono(2 * k, 1);
      F = poly([[k, 2], [c, 0]]);
      P = [mono(2 * k, 2), mono(k, 1), poly([[1, 2], [2 * k, 0]])];
    } else {
      const k = randomInt(2, 9);
      Y = frac(k, "x^2");
      F = frac(-k, "x") + plusC(c);
      P = [frac(k, "x"), frac(k, "x^3"), frac(-k, "x^3")];
    }
    ctl({ f: F, df: Y, nonPrimitives: P });
    const [qui, quoi] = randomChoice(SITUATIONS);
    return qcm(
      randomChoice([
        `Laquelle de ces fonctions a pour dérivée $${Y}$ ?`,
        `On cherche une fonction $f$ telle que $f'(x) = ${Y}$. Laquelle convient ?`,
        `Parmi ces fonctions, une seule a pour dérivée $f'(x) = ${Y}$. Laquelle ?`,
        `${qui} connaît la dérivée $f'(x) = ${Y}$ de la fonction $f$ qui modélise ${quoi}. Quelle peut être $f(x)$ ?`,
        `${randomChoice(PRENOMS)} a dérivé une fonction et a obtenu $${Y}$. Quelle fonction a pu être dérivée ?`,
      ]),
      `$${F}$`,
      P.map((p) => `$${p}$`),
      expl(DEF_US, "on dérive chaque proposition et on compare avec la dérivée donnée.", `$(${F})' = ${Y}$ (une constante ajoutée a une dérivée nulle).`, `$f(x) = ${F}$ convient.`)
    );
  };
}

const ENS = {
  pos: "$]0\\,;+\\infty[$",
  posF: "$[0\\,;+\\infty[$",
  R: "$\\mathbb{R}$",
  Rs: "$]-\\infty\\,;0[ \\cup ]0\\,;+\\infty[$",
};

function genUsDomaine() {
  const k = randomInt(2, 9);
  const m = randomChoice([2, 3, -2, 5, -4]);
  const p = randomInt(3, 6);
  const F: Array<[string, keyof typeof ENS, string]> = [
    ["\\sqrt{x}", "pos", "$\\sqrt{x}$ est définie en 0, mais $\\dfrac{1}{2\\sqrt{x}}$ n’existe pas en 0"],
    [`${k}\\sqrt{x}`, "pos", "la dérivée $\\dfrac{k}{2\\sqrt{x}}$ n’existe pas en 0"],
    [`${mono(m, 1)} + \\sqrt{x}`, "pos", "la partie $\\sqrt{x}$ n’est pas dérivable en 0"],
    ["\\dfrac{1}{x}", "Rs", "la fonction inverse n’est pas définie en 0"],
    [`${frac(k, "x")} ${m < 0 ? "-" : "+"} ${mono(Math.abs(m), 1)}`, "Rs", "$\\dfrac{k}{x}$ n’est pas définie en 0"],
    [puiss(p), "R", "une fonction puissance d’exposant positif est dérivable sur $\\mathbb{R}$"],
    [poly([[m, 2], [k, 1], [-1, 0]]), "R", "un polynôme est dérivable sur $\\mathbb{R}$"],
    ["|x|", "Rs", "la valeur absolue n’est pas dérivable en 0 (sa courbe y fait une pointe)"],
  ];
  const [f, bon, raison] = randomChoice(F);
  const [qui, quoi] = randomChoice(SITUATIONS);
  return qcm(
    randomChoice([
      `Sur quel ensemble la fonction $f(x) = ${f}$ est-elle dérivable ?`,
      `Quel est le plus grand ensemble où l’on peut dériver $f(x) = ${f}$ ?`,
      `${qui} modélise ${quoi} par $f(x) = ${f}$. Sur quel ensemble peut-on calculer $f'(x)$ ?`,
      `Où la fonction $f(x) = ${f}$ est-elle dérivable ?`,
    ]),
    ENS[bon],
    (Object.keys(ENS) as Array<keyof typeof ENS>).filter((c) => c !== bon).map((c) => ENS[c]),
    expl("une fonction est dérivable là où son nombre dérivé existe.", "on repère les valeurs interdites ou les points « à problème » (0 pour $\\dfrac{1}{x}$, $\\sqrt{x}$ et $|x|$).", `${raison}.`, `$f$ est dérivable sur ${ENS[bon]}.`)
  );
}

function genUsInverse() {
  const t = randomInt(1, 5);
  let f = "", xs = 0, v = 0, dom = "", calc = "";
  if (t === 1) {
    xs = randomChoice([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 1.5, -1.5, 2.5, -0.5, 0.5]);
    f = "x^2";
    v = 2 * xs;
    calc = `$f'(x) = 2x = ${n(v)}$ donne $x = ${n(xs)}$`;
  } else if (t === 2) {
    const k = randomChoice([2, 3, 4, 5, -2, -3]);
    xs = randomChoice([-4, -3, -2, -1, 1, 2, 3, 4]);
    f = mono(k, 2);
    v = 2 * k * xs;
    calc = `$f'(x) = ${mono(2 * k, 1)} = ${n(v)}$ donne $x = ${n(xs)}$`;
  } else if (t === 3) {
    xs = randomChoice([1, 4, 16, 25, 100, 0.25]);
    f = "\\sqrt{x}";
    v = 1 / (2 * Math.sqrt(xs));
    dom = " (avec $x > 0$)";
    calc = `$\\dfrac{1}{2\\sqrt{x}} = ${n(v)}$ donne $\\sqrt{x} = ${n(Math.sqrt(xs))}$, donc $x = ${n(xs)}$`;
  } else if (t === 4) {
    xs = randomChoice([1, 2, 5, 10, 0.5]);
    f = "\\dfrac{1}{x}";
    v = -1 / (xs * xs);
    dom = " (avec $x > 0$)";
    calc = `$-\\dfrac{1}{x^2} = ${n(v)}$ donne $x^2 = ${n(xs * xs)}$, donc $x = ${n(xs)}$ car $x > 0$`;
  } else {
    xs = randomInt(1, 5);
    f = "x^3";
    v = 3 * xs * xs;
    dom = " (avec $x > 0$)";
    calc = `$3x^2 = ${n(v)}$ donne $x^2 = ${n(xs * xs)}$, donc $x = ${n(xs)}$ car $x > 0$`;
  }
  ctl({ f, x0: xs, val: v, rep: xs });
  return court(
    randomChoice([
      `Soit $f(x) = ${f}$${dom}. Pour quelle valeur de $x$ a-t-on $f'(x) = ${n(v)}$ ?`,
      `En quelle abscisse la tangente à la courbe de $f(x) = ${f}$${dom} a-t-elle pour coefficient directeur $${n(v)}$ ?`,
      avecSituation(f, `Pour quelle valeur de $x$${dom} la dérivée vaut-elle $${n(v)}$ ?`),
      `On cherche le point de la courbe de $f(x) = ${f}$${dom} où la pente vaut $${n(v)}$. Quelle est son abscisse ?`,
    ]),
    xs,
    expl(DEF_US, "on écrit $f'(x)$, puis on résout l’équation $f'(x) = $ la valeur donnée.", `${calc}.`, `$x = ${n(xs)}$.`)
  );
}

/* =========================================================
   DER_PUISSANCE — (x^n)' = n x^(n−1), n entier relatif
========================================================= */

function puissanceAuHasard(niv: number) {
  const p = niv >= 5 ? randomChoice([-7, -6, -5, -4, -3, -2, 8, 9, 10, 11, 12]) : randomChoice([2, 3, 4, 5, 6, 7, 8, 9, -2, -3, -4]);
  const k = randomChoice([1, 2, 3, 4, 5, 6, 7, -1, -2, -3, -4, -5]);
  return { p, k, f: mono(k, p), df: mono(k * p, p - 1) };
}

const DEF_PU = "$(x^n)' = nx^{n-1}$ pour tout entier $n$ (avec $x \\neq 0$ si $n < 0$), et $(kx^n)' = k \\times nx^{n-1}$.";

function genPuDerivee(niv: number) {
  return () => {
    const { p, k, f, df } = puissanceAuHasard(niv);
    ctl({ f, df });
    return qcm(
      enonceDerivee(f),
      `$${df}$`,
      [mono(k, p - 1), mono(k * p, p), mono(k * p, p + 1), mono(k * (p - 1), p - 1)].map((x) => `$${x}$`),
      expl(DEF_PU, "on multiplie par l’exposant, puis on enlève 1 à l’exposant.", `$${n(k)} \\times ${par(p)} = ${n(k * p)}$ et $${p} - 1 = ${p - 1}$.`, `$f'(x) = ${df}$.`)
    );
  };
}

function genPuValeur(niv: number) {
  return () => {
    let r = puissanceAuHasard(niv);
    let a = 1;
    let v = 0;
    for (let i = 0; i < 60; i++) {
      r = puissanceAuHasard(niv);
      a = randomChoice([1, -1, 2, -2]);
      v = r.k * r.p * a ** (r.p - 1);
      if (exact(v) && Math.abs(v) <= 5000) break;
    }
    ctl({ f: r.f, x0: a, val: v, rep: v });
    return court(
      randomChoice([enonceValeur(r.f, a), `Calcule $f'(${n(a)})$ pour $f(x) = ${r.f}$, avec la formule $(x^n)' = nx^{n-1}$.`]),
      v,
      expl(DEF_PU, "on dérive, puis on remplace $x$ par la valeur.", `$f'(x) = ${r.df}$, donc $f'(${n(a)}) = ${n(r.k * r.p)} \\times ${par(a)}${r.p - 1 === 1 ? "" : `^{${r.p - 1}}`} = ${n(v)}$.`, `$f'(${n(a)}) = ${n(v)}$.`)
    );
  };
}

function genPuQuotient() {
  const m = randomInt(2, 6);
  const k = randomChoice([1, 2, 3, 4, 5, 6, 7, 8, 9]) * randomChoice([1, -1]);
  const f = frac(k, puiss(m));
  const df = frac(-k * m, puiss(m + 1));
  ctl({ f, df });
  return qcm(
    randomChoice([
      `Quelle est la dérivée de $f(x) = ${f}$ (pour $x \\neq 0$) ?`,
      `En écrivant $f(x) = ${f}$ sous la forme $${mono(k, -m)}$, on obtient $f'(x)$ égal à :`,
      `Soit $f(x) = ${f}$ sur $]0\\,;+\\infty[$. Que vaut $f'(x)$ ?`,
      avecSituation(f, "Quelle est $f'(x)$ (pour $x > 0$) ?"),
      `${randomChoice(PRENOMS)} veut dériver $f(x) = ${f}$ sans la formule du quotient. Quel résultat est juste ?`,
    ]),
    `$${df}$`,
    [frac(-k * m, puiss(m - 1)), frac(k * m, puiss(m + 1)), frac(k, `${m}${puiss(m - 1)}`), frac(-k, puiss(m + 1))].map((x) => `$${x}$`),
    expl(DEF_PU, "on écrit $f$ sous forme de puissance d’exposant négatif, puis on applique la formule.", `$f(x) = ${mono(k, -m)}$, donc $f'(x) = ${mono(-k * m, -m - 1)} = ${df}$.`, `$f'(x) = ${df}$.`)
  );
}

function genPuReecrire() {
  const m = randomInt(2, 6);
  const k = randomChoice([1, 2, 3, 4, 5, 7]) * randomChoice([1, -1]);
  const f = frac(k, puiss(m));
  const ex = expl("$\\dfrac{1}{x^n} = x^{-n}$ pour $x \\neq 0$.", "le $x^n$ du dénominateur « monte » avec un exposant opposé.", `$${f} = ${mono(k, -m)}$.`, `$${f} = ${mono(k, -m)}$, que l’on peut ensuite dériver avec $(x^n)' = nx^{n-1}$.`);
  ctl({ f, df: mono(-k * m, -m - 1) });
  if (Math.random() < 0.5)
    return qcm(
      randomChoice([
        `Pour dériver $${f}$, on l’écrit d’abord sous forme de puissance. Laquelle ?`,
        `Quelle écriture est égale à $${f}$ (pour $x \\neq 0$) ?`,
        `${randomChoice(PRENOMS)} veut écrire $${f}$ sous la forme $kx^n$. Que doit-on trouver ?`,
        avecSituation(f, "Comment écrire $f(x)$ sous la forme $kx^n$ ?"),
      ]),
      `$${mono(k, -m)}$`,
      [mono(k, m), mono(-k, m), mono(k, 1 - m), mono(k, -m - 1)].map((x) => `$${x}$`),
      ex
    );
  return qcm(
    randomChoice([`Quelle fraction est égale à $${mono(k, -m)}$ ?`, `Comment écrire $${mono(k, -m)}$ sans exposant négatif ?`, `On a obtenu $${mono(k, -m)}$. À quoi est-ce égal ?`]),
    `$${f}$`,
    [frac(-k, puiss(m)), mono(-k, m), frac(k, `${m}x`), frac(k, puiss(m - 1))].map((x) => `$${x}$`),
    ex
  );
}

function genPuErreur() {
  const p = randomChoice([-5, -4, -3, -2, 3, 4, 5, 6, 7]);
  const k = randomChoice([1, 2, 3, -2, 4, 5]);
  const f = mono(k, p);
  const juste = mono(k * p, p - 1);
  const erreurs: Array<[string, string]> = [
    ["elle a ajouté 1 à l’exposant au lieu d’enlever 1", mono(k * p, p + 1)],
    ["elle a oublié de multiplier par l’exposant", mono(k, p - 1)],
    ["elle n’a pas changé l’exposant", mono(k * p, p)],
    ["elle s’est trompée de signe", mono(-k * p, p - 1)],
  ];
  const [desc, faux] = randomChoice(erreurs);
  const pf = randomChoice(PRENOMS_F);
  ctl({ f, df: juste });
  const ex = expl(DEF_PU, "on multiplie par l’exposant, puis on enlève 1 à l’exposant (même s’il est négatif).", `$f'(x) = ${n(k)} \\times ${par(p)} x^{${p} - 1} = ${juste}$ ; ${pf} a écrit $${faux}$.`, `${desc}. Le bon résultat est $${juste}$.`);
  const t = randomInt(1, 3);
  if (t === 3)
    return qcm(`${pf} dérive $f(x) = ${f}$ et trouve $${faux}$. Quel est le bon résultat ?`, `$${juste}$`, erreurs.map((e) => `$${e[1]}$`).filter((s) => s !== `$${faux}$`), ex);
  return qcm(
    t === 1 ? `${pf} dérive $f(x) = ${f}$ et trouve $${faux}$. Quelle erreur a-t-elle faite ?` : `Dans un exercice, ${pf} écrit : « $(${f})' = ${faux}$ ». Où est son erreur ?`,
    desc,
    [...erreurs.map((e) => e[0]).filter((d) => d !== desc), "elle n’a fait aucune erreur"],
    ex
  );
}

/* =========================================================
   Contextes de grandeurs (interpréter, taux, nombre dérivé)
========================================================= */

type Ctx = { sujet: string; f: string; v: string; quoi: string; val: string; uf: string; uv: string; uvs: string; inst: string; moy: string; unite: string; inv: string };

/** « le coût » → « du coût », « la charge » → « de la charge », « l’altitude » → « de l’altitude ». */
const deLa = (gn: string) => gn.replace(/^le /, "du ").replace(/^la /, "de la ").replace(/^l’/, "de l’");
/** Féminin ? (tous les « l’ » de la liste sont féminins.) */
const fem = (gn: string) => !/^le /.test(gn);
const CTX: Ctx[] = [
  { sujet: "Une entraîneuse de cyclisme", f: "d", v: "t", quoi: "la distance parcourue par une cycliste, en km, au bout de $t$ heures", val: "la distance parcourue", uf: "km", uv: "heures", uvs: "heure", inst: "la vitesse instantanée de la cycliste", moy: "la vitesse moyenne de la cycliste", unite: "km/h", inv: "h/km" },
  { sujet: "Le gérant d’une usine de vélos", f: "C", v: "q", quoi: "le coût de fabrication, en euros, de $q$ vélos", val: "le coût de fabrication", uf: "euros", uv: "vélos", uvs: "vélo", inst: "le coût marginal (le coût approximatif du vélo suivant)", moy: "le coût moyen de chaque vélo supplémentaire", unite: "euros par vélo", inv: "vélos par euro" },
  { sujet: "Un boulanger", f: "T", v: "t", quoi: "la température de son four, en °C, au bout de $t$ minutes", val: "la température du four", uf: "°C", uv: "minutes", uvs: "minute", inst: "la vitesse de chauffe du four", moy: "la vitesse moyenne de chauffe du four", unite: "°C par minute", inv: "minutes par °C" },
  { sujet: "Une hydrologue", f: "V", v: "t", quoi: "le volume d’eau dans une citerne, en litres, au bout de $t$ minutes", val: "le volume d’eau", uf: "L", uv: "minutes", uvs: "minute", inst: "le débit instantané", moy: "le débit moyen", unite: "L par minute", inv: "minutes par litre" },
  { sujet: "Une biologiste", f: "N", v: "t", quoi: "le nombre de bactéries, en milliers, au bout de $t$ heures", val: "le nombre de bactéries", uf: "milliers de bactéries", uv: "heures", uvs: "heure", inst: "la vitesse de croissance de la population", moy: "la vitesse moyenne de croissance", unite: "milliers de bactéries par heure", inv: "heures par millier de bactéries" },
  { sujet: "Une ingénieure en aérospatiale", f: "h", v: "t", quoi: "l’altitude d’une fusée, en mètres, au bout de $t$ secondes", val: "l’altitude de la fusée", uf: "m", uv: "secondes", uvs: "seconde", inst: "la vitesse verticale de la fusée", moy: "la vitesse verticale moyenne de la fusée", unite: "m/s", inv: "s/m" },
  { sujet: "Un pharmacologue", f: "m", v: "t", quoi: "la quantité de médicament dans le sang, en mg, au bout de $t$ heures", val: "la quantité de médicament", uf: "mg", uv: "heures", uvs: "heure", inst: "la vitesse de variation de la quantité de médicament", moy: "la vitesse moyenne de variation de la quantité de médicament", unite: "mg par heure", inv: "heures par mg" },
  { sujet: "Une responsable commerciale", f: "B", v: "q", quoi: "le bénéfice, en euros, quand on vend $q$ objets", val: "le bénéfice", uf: "euros", uv: "objets", uvs: "objet", inst: "le bénéfice marginal", moy: "le bénéfice moyen par objet supplémentaire", unite: "euros par objet", inv: "objets par euro" },
  { sujet: "Un démographe", f: "P", v: "t", quoi: "la population d’une ville, en milliers d’habitants, au bout de $t$ années", val: "la population", uf: "milliers d’habitants", uv: "années", uvs: "an", inst: "la vitesse de croissance de la population", moy: "la croissance moyenne de la population", unite: "milliers d’habitants par an", inv: "années par millier d’habitants" },
  { sujet: "Une technicienne en téléphonie", f: "Q", v: "t", quoi: "la charge d’une batterie de téléphone, en %, au bout de $t$ minutes", val: "la charge de la batterie", uf: "%", uv: "minutes", uvs: "minute", inst: "la vitesse de charge", moy: "la vitesse moyenne de charge", unite: "% par minute", inv: "minutes par %" },
  { sujet: "Un moniteur de parapente", f: "A", v: "t", quoi: "l’altitude d’un parapentiste, en mètres, au bout de $t$ minutes", val: "l’altitude du parapentiste", uf: "m", uv: "minutes", uvs: "minute", inst: "la vitesse verticale du parapentiste", moy: "la vitesse verticale moyenne du parapentiste", unite: "m par minute", inv: "minutes par mètre" },
  { sujet: "Un ingénieur éolien", f: "E", v: "t", quoi: "l’énergie produite par une éolienne, en kWh, au bout de $t$ heures", val: "l’énergie produite", uf: "kWh", uv: "heures", uvs: "heure", inst: "la puissance de l’éolienne", moy: "la puissance moyenne de l’éolienne", unite: "kWh par heure", inv: "heures par kWh" },
  { sujet: "Une community manager", f: "S", v: "t", quoi: "le nombre d’abonnés d’une chaîne vidéo, en milliers, au bout de $t$ jours", val: "le nombre d’abonnés", uf: "milliers d’abonnés", uv: "jours", uvs: "jour", inst: "la vitesse de gain d’abonnés", moy: "le gain moyen d’abonnés", unite: "milliers d’abonnés par jour", inv: "jours par millier d’abonnés" },
  { sujet: "Une océanographe", f: "H", v: "t", quoi: "la hauteur de la mer dans un port, en cm, au bout de $t$ heures", val: "la hauteur de la mer", uf: "cm", uv: "heures", uvs: "heure", inst: "la vitesse de variation de la hauteur de la mer", moy: "la vitesse moyenne de variation de la hauteur de la mer", unite: "cm par heure", inv: "heures par cm" },
  { sujet: "Un glaciologue", f: "G", v: "t", quoi: "l’épaisseur d’un glacier, en mètres, au bout de $t$ années", val: "l’épaisseur du glacier", uf: "m", uv: "années", uvs: "an", inst: "la vitesse de variation de l’épaisseur du glacier", moy: "la vitesse moyenne de variation de l’épaisseur", unite: "m par an", inv: "années par mètre" },
  { sujet: "Une informaticienne", f: "R", v: "n", quoi: "le temps de calcul d’un programme, en millisecondes, pour $n$ données", val: "le temps de calcul", uf: "ms", uv: "données", uvs: "donnée", inst: "le temps supplémentaire approximatif pour une donnée de plus", moy: "le temps moyen par donnée supplémentaire", unite: "ms par donnée", inv: "données par ms" },
];

/* =========================================================
   DER_TAUX — taux de variation
========================================================= */

type FT = { f: string; F: (x: number) => number; a: number; b: number };

function fonctionTaux(niv: number): FT {
  for (let i = 0; i < 80; i++) {
    const t = niv <= 2 ? randomInt(1, 2) : niv === 3 ? randomInt(3, 6) : randomInt(5, 8);
    let r: FT;
    if (t === 1) {
      const m = randomChoice([-5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8]);
      const p = randomInt(-9, 9);
      const a = randomInt(-3, 5);
      r = { f: lin(m, p), F: (x) => m * x + p, a, b: a + randomInt(1, 5) };
    } else if (t === 2) {
      const a = randomInt(-3, 4);
      r = { f: "x^2", F: (x) => x * x, a, b: a + randomInt(1, 4) };
    } else if (t === 3) {
      const k = randomChoice([2, 3, -2, 4, -1, 5]);
      const c = randomInt(-6, 6);
      const a = randomInt(-3, 3);
      r = { f: poly([[k, 2], [c, 0]]), F: (x) => k * x * x + c, a, b: a + randomInt(1, 4) };
    } else if (t === 4) {
      const a = randomInt(-2, 2);
      r = { f: "x^3", F: (x) => x ** 3, a, b: a + randomInt(1, 3) };
    } else if (t === 5) {
      const [a, b] = randomChoice([[1, 2], [1, 4], [1, 5], [2, 5], [1, 10], [2, 4], [4, 5], [2, 10], [5, 10], [0.5, 2]]);
      const k = niv >= 4 ? randomChoice([2, 3, 4, 6, -2]) : 1;
      r = { f: k === 1 ? "\\dfrac{1}{x}" : frac(k, "x"), F: (x) => k / x, a, b };
    } else if (t === 6) {
      const [a, b] = randomChoice([[0, 1], [0, 4], [1, 9], [0, 16], [0, 25], [1, 49], [4, 36], [9, 49], [1, 4], [4, 16]]);
      r = { f: "\\sqrt{x}", F: (x) => Math.sqrt(x), a, b };
    } else if (t === 7) {
      const k = randomChoice([1, -1, 2, -2, 3]);
      const bb = randomInt(-6, 6);
      const c = randomInt(-5, 5);
      const a = randomInt(-3, 3);
      r = { f: poly([[k, 2], [bb, 1], [c, 0]]), F: (x) => k * x * x + bb * x + c, a, b: a + randomInt(1, 4) };
    } else {
      const bb = randomChoice([-3, -2, -1, 1, 2, 4]);
      const a = randomInt(-2, 2);
      r = { f: poly([[1, 3], [bb, 1]]), F: (x) => x ** 3 + bb * x, a, b: a + randomInt(1, 3) };
    }
    if (exact((r.F(r.b) - r.F(r.a)) / (r.b - r.a))) return r;
  }
  return { f: "x^2", F: (x) => x * x, a: 1, b: 3 };
}

const DEF_TAUX = "le taux de variation de $f$ entre $a$ et $b$ est $\\dfrac{f(b) - f(a)}{b - a}$ : c’est le coefficient directeur de la sécante.";

function genTauxCalcul(niv: number) {
  return () => {
    const { f, F, a, b } = fonctionTaux(niv);
    const val = (F(b) - F(a)) / (b - a);
    ctl({ f, taux: { a, b, val }, rep: val });
    return court(
      randomChoice([
        `Calcule le taux de variation de $f(x) = ${f}$ entre $${n(a)}$ et $${n(b)}$.`,
        `Soit $f(x) = ${f}$. Que vaut $\\dfrac{f(${n(b)}) - f(${n(a)})}{${n(b)} - ${par(a)}}$ ?`,
        `Quel est le coefficient directeur de la sécante qui passe par les points de la courbe de $f(x) = ${f}$ d’abscisses $${n(a)}$ et $${n(b)}$ ?`,
        avecSituation(f, `Quel est le taux de variation de $f$ entre $x = ${n(a)}$ et $x = ${n(b)}$ ?`),
        `Pour $f(x) = ${f}$, calcule la variation moyenne de $f$ entre $${n(a)}$ et $${n(b)}$.`,
      ]),
      val,
      expl(DEF_TAUX, "on calcule les deux images, puis on divise leur différence par $b - a$.", `$f(${n(a)}) = ${n(F(a))}$ et $f(${n(b)}) = ${n(F(b))}$, donc $\\dfrac{${n(F(b))} - ${par(F(a))}}{${n(b)} - ${par(a)}} = \\dfrac{${n(F(b) - F(a))}}{${n(b - a)}} = ${n(val)}$.`, `le taux de variation vaut ${n(val)}.`)
    );
  };
}

type CT = [string, string, string, string, string, number, number[], [number, number]];
const TAUX_CTX: CT[] = [
  ["Une pédiatre", "la masse d’un bébé", "kg", "mois", "mois", 1, [0.5, 0.6, 0.7, 0.8], [4, 7]],
  ["Un entraîneur", "la distance parcourue par une cycliste", "km", "heures", "heure", 1, [15, 18, 20, 22, 25], [20, 60]],
  ["Une climatologue", "la température d’un lac", "°C", "semaines", "semaine", 0, [0.5, 1, 1.5], [12, 24]],
  ["Un boulanger", "la température de son four", "°C", "minutes", "minute", 1, [8, 10, 12, 15], [40, 90]],
  ["Une infirmière", "la quantité de médicament dans le sang d’un patient", "mg", "heures", "heure", -1, [2, 3, 4, 5], [60, 90]],
  ["Un économiste", "le chiffre d’affaires d’une entreprise", "millions d’euros", "ans", "an", 0, [0.5, 1, 1.5, 2], [10, 30]],
  ["Une data scientist", "le nombre d’abonnés d’une chaîne", "milliers", "jours", "jour", 1, [1.5, 2, 2.5, 3, 4], [10, 40]],
  ["Un hydrologue", "le niveau d’un barrage", "m", "jours", "jour", -1, [0.2, 0.3, 0.5], [30, 50]],
  ["Une agronome", "la hauteur d’un plant de maïs", "cm", "jours", "jour", 1, [2, 3, 4, 5], [20, 60]],
  ["Une pilote de ligne", "l’altitude de son avion", "m", "minutes", "minute", 1, [300, 400, 500, 600], [1000, 3000]],
  ["Un technicien", "la charge d’une batterie de vélo électrique", "%", "minutes", "minute", 1, [1, 1.5, 2], [10, 30]],
  ["Une biologiste", "le nombre de bactéries d’une culture", "milliers", "heures", "heure", 1, [3, 4, 5, 6, 8], [10, 40]],
  ["Un moniteur de plongée", "la profondeur d’un plongeur", "m", "minutes", "minute", 1, [2, 3, 4, 5], [5, 10]],
  ["Une commerçante", "le prix d’un vélo d’occasion", "euros", "mois", "mois", -1, [10, 15, 20, 25], [500, 800]],
  ["Un glaciologue", "l’épaisseur d’un glacier", "m", "ans", "an", -1, [0.5, 1, 1.5, 2], [80, 150]],
  ["Une ingénieure en énergie", "l’énergie produite par un parc solaire", "MWh", "heures", "heure", 1, [2, 3, 4, 5], [10, 40]],
];

function genTauxContexte() {
  const [sujet, quoi, u, t, ts, sens, rates, [lo, hi]] = randomChoice(TAUX_CTX);
  const s = sens === 0 ? randomChoice([1, -1]) : sens;
  const r = s * randomChoice(rates);
  const t1 = randomInt(2, 6);
  const dt = randomInt(2, 5);
  const t2 = t1 + dt;
  const v1 = randomInt(lo, hi);
  const v2 = v1 + r * dt;
  const ex = expl("le taux de variation moyen est $\\dfrac{\\text{variation de la grandeur}}{\\text{durée}}$.", "on divise la variation de la grandeur par la variation du temps.", `$\\dfrac{${n(v2)} - ${n(v1)}}{${t2} - ${t1}} = \\dfrac{${n(v2 - v1)}}{${dt}} = ${n(r)}$.`, `le taux moyen vaut ${n(r)} ${u} par ${ts}${r < 0 ? " : la grandeur diminue" : ""}.`);
  const Q = quoi[0].toUpperCase() + quoi.slice(1);
  return court(
    randomChoice([
      `${sujet} relève ${quoi} : ${n(v1)} ${u} au bout de ${t1} ${t}, puis ${n(v2)} ${u} au bout de ${t2} ${t}. Quel est le taux de variation moyen entre ces deux instants, en ${u} par ${ts} ?`,
      `${Q} passe de ${n(v1)} ${u} (au bout de ${t1} ${t}) à ${n(v2)} ${u} (au bout de ${t2} ${t}). Calcule le taux de variation moyen, en ${u} par ${ts}.`,
      `On note $f(t)$ ${quoi}, en ${u}, au bout de $t$ ${t}. On sait que $f(${t1}) = ${n(v1)}$ et $f(${t2}) = ${n(v2)}$. Calcule le taux de variation de $f$ entre ${t1} et ${t2}.`,
    ]),
    r,
    ex
  );
}

function genTauxSens() {
  const a = randomInt(0, 4);
  const b = a + randomInt(1, 5);
  if (Math.random() < 0.3) {
    return qcm(
      randomChoice([
        `Sur la courbe de $f$, on place les points A d’abscisse $${a}$ et B d’abscisse $${b}$. Le taux de variation de $f$ entre $${a}$ et $${b}$ est :`,
        `Que représente $\\dfrac{f(${b}) - f(${a})}{${b} - ${a}}$ sur la courbe de $f$ ?`,
        `${randomChoice(SITUATIONS)[0]} trace la courbe d’une fonction $f$ et place A d’abscisse $${a}$ et B d’abscisse $${b}$. Que représente le taux de variation de $f$ entre $${a}$ et $${b}$ ?`,
      ]),
      "le coefficient directeur de la droite (AB)",
      ["le coefficient directeur de la tangente en A", "la longueur du segment [AB]", "l’ordonnée du milieu de [AB]"],
      expl(DEF_TAUX, "A et B sont sur la courbe : $(AB)$ est une sécante.", "$\\dfrac{y_B - y_A}{x_B - x_A} = \\dfrac{f(b) - f(a)}{b - a}$.", "c’est le coefficient directeur de la droite (AB).")
    );
  }
  const c = randomChoice(CTX);
  return qcm(
    randomChoice([
      `${c.sujet} note $${c.f}(${c.v})$ ${c.quoi}. Que représente $\\dfrac{${c.f}(${b}) - ${c.f}(${a})}{${b} - ${a}}$ ?`,
      `On note $${c.f}(${c.v})$ ${c.quoi}. Que mesure le taux de variation de $${c.f}$ entre $${c.v} = ${a}$ et $${c.v} = ${b}$ ?`,
      `${c.sujet} calcule le taux de variation de $${c.f}$ entre $${c.v} = ${a}$ et $${c.v} = ${b}$, où $${c.f}(${c.v})$ est ${c.quoi}. Que représente ce nombre ?`,
    ]),
    `${c.moy} entre $${c.v} = ${a}$ et $${c.v} = ${b}$`,
    [`${c.inst} pour $${c.v} = ${b}$`, `${c.val} pour $${c.v} = ${b}$`, `la variation totale ${deLa(c.val)} entre $${c.v} = ${a}$ et $${c.v} = ${b}$`],
    expl(DEF_TAUX, "un taux de variation entre deux valeurs est une variation MOYENNE (par unité).", `$\\dfrac{${c.f}(${b}) - ${c.f}(${a})}{${b} - ${a}}$ est une variation divisée par un écart de $${c.v}$.`, `c’est ${c.moy} entre $${c.v} = ${a}$ et $${c.v} = ${b}$, en ${c.unite}.`)
  );
}

function genTauxGraphe() {
  for (let i = 0; i < 80; i++) {
    const al = randomChoice([1, -1]);
    const be = randomInt(-2, 2);
    const ga = randomInt(-3, 3);
    const xa = randomInt(-3, 2);
    const xb = xa + randomInt(1, 3);
    const F = (x: number) => al * x * x + be * x + ga;
    const ya = F(xa);
    const yb = F(xb);
    if (Math.abs(ya) > 7 || Math.abs(yb) > 7 || xb > 4) continue;
    const val = (yb - ya) / (xb - xa);
    if (!exact(val)) continue;
    const ymin = Math.min(ya, yb, ga) - 3;
    const ymax = Math.max(ya, yb, ga) + 3;
    const f = poly([[al, 2], [be, 1], [ga, 0]]);
    ctl({ f, taux: { a: xa, b: xb, val }, rep: val });
    const [qui, quoi] = randomChoice(SITUATIONS);
    return court(
      randomChoice([
        "Sur la figure, A et B sont deux points de la courbe de $f$. Lis leurs coordonnées, puis calcule le taux de variation de $f$ entre leurs abscisses.",
        "Quel est le coefficient directeur de la droite (AB) ? (A et B sont sur la courbe, à lire sur le quadrillage.)",
        `${qui} représente ${quoi} par la courbe ci-dessous. Calcule le taux de variation entre les abscisses de A et de B.`,
        "Lis les coordonnées de A et de B, puis calcule $\\dfrac{y_B - y_A}{x_B - x_A}$.",
        "D’après le graphique, que vaut le taux de variation de $f$ entre l’abscisse de A et celle de B ?",
      ]),
      val,
      expl(DEF_TAUX, "on lit les coordonnées des deux points sur le quadrillage.", `A$(${xa}\\,;${ya})$ et B$(${xb}\\,;${yb})$, donc $\\dfrac{${yb} - ${par(ya)}}{${xb} - ${par(xa)}} = \\dfrac{${yb - ya}}{${xb - xa}} = ${n(val)}$.`, `le taux de variation vaut ${n(val)}.`),
      figure({ xmin: -5, xmax: 5, ymin, ymax, quad: [al, be, ga], droites: [[val, ya - val * xa]], marques: [{ x: xa, y: ya, label: "A" }, { x: xb, y: yb, label: "B" }] })
    );
  }
  return genTauxContexte();
}

function genTauxInverse(niv: number) {
  return () => {
    const a = randomInt(-2, 4);
    const b = a + randomInt(1, 5);
    const r = randomChoice([-4, -3, -2, -1.5, -0.5, 0.5, 1, 1.5, 2, 3, 4, 5]);
    const fa = randomInt(-8, 12);
    const fb = fa + r * (b - a);
    const c = randomChoice(CTX);
    const demandeA = niv >= 5 && Math.random() < 0.5;
    const rep = demandeA ? fa : fb;
    const ex = expl(DEF_TAUX, "on écrit $f(b) - f(a) = \\text{taux} \\times (b - a)$.", `$f(${n(b)}) - f(${n(a)}) = ${n(r)} \\times ${n(b - a)} = ${n(r * (b - a))}$, avec $f(${n(a)}) = ${n(fa)}$ et $f(${n(b)}) = ${n(fb)}$.`, demandeA ? `$f(${n(a)}) = ${n(fa)}$.` : `$f(${n(b)}) = ${n(fb)}$.`);
    if (demandeA)
      return court(
        randomChoice([
          `Le taux de variation de $f$ entre $${n(a)}$ et $${n(b)}$ vaut $${n(r)}$, et $f(${n(b)}) = ${n(fb)}$. Que vaut $f(${n(a)})$ ?`,
          `On sait que $f(${n(b)}) = ${n(fb)}$ et que le taux de variation de $f$ entre $${n(a)}$ et $${n(b)}$ est $${n(r)}$. Retrouve $f(${n(a)})$.`,
          `${c.sujet} sait que, entre $${c.v} = ${n(a)}$ et $${c.v} = ${n(b)}$, le taux de variation de $f$ vaut $${n(r)}$, et que $f(${n(b)}) = ${n(fb)}$. Que valait $f(${n(a)})$ ?`,
        ]),
        rep,
        ex
      );
    return court(
      randomChoice([
        `Le taux de variation de $f$ entre $${n(a)}$ et $${n(b)}$ vaut $${n(r)}$, et $f(${n(a)}) = ${n(fa)}$. Que vaut $f(${n(b)})$ ?`,
        `On sait que $f(${n(a)}) = ${n(fa)}$ et que la sécante entre les abscisses $${n(a)}$ et $${n(b)}$ a pour coefficient directeur $${n(r)}$. Calcule $f(${n(b)})$.`,
        `${c.sujet} note $f(${c.v})$ ${c.quoi}. Entre $${c.v} = ${n(a)}$ et $${c.v} = ${n(b)}$, le taux de variation vaut $${n(r)}$, et $f(${n(a)}) = ${n(fa)}$. Que vaut $f(${n(b)})$ ?`,
        `${randomChoice(PRENOMS)} connaît $f(${n(a)}) = ${n(fa)}$ et le taux de variation $${n(r)}$ de $f$ entre $${n(a)}$ et $${n(b)}$. Quelle valeur de $f(${n(b)})$ doit-on trouver ?`,
      ]),
      rep,
      ex
    );
  };
}

function genTauxSigne() {
  const a = randomInt(-3, 3);
  const b = a + randomInt(1, 6);
  const s = randomChoice([1, -1, 0]);
  const r = s * randomChoice([0.5, 1, 2, 3, 4, 1.5]);
  const I = `$[${n(a)}\\,;${n(b)}]$`;
  const bon = s < 0 ? `$f(${n(b)}) < f(${n(a)})$` : s > 0 ? `$f(${n(b)}) > f(${n(a)})$` : `$f(${n(b)}) = f(${n(a)})$`;
  const pieges =
    s < 0
      ? [`$f$ est décroissante sur ${I}`, `$f(${n(a)}) < 0$`, `$f(${n(b)}) > f(${n(a)})$`]
      : s > 0
        ? [`$f$ est croissante sur ${I}`, `$f(${n(b)}) > 0$`, `$f(${n(b)}) < f(${n(a)})$`]
        : [`$f$ est constante sur ${I}`, `$f(${n(a)}) = 0$`, `$f(${n(b)}) > f(${n(a)})$`];
  const c = randomChoice(CTX);
  return qcm(
    randomChoice([
      `Pour une fonction $f$, le taux de variation entre $${n(a)}$ et $${n(b)}$ vaut $${n(r)}$. Que peut-on affirmer à coup sûr ?`,
      `On sait seulement que $\\dfrac{f(${n(b)}) - f(${n(a)})}{${n(b)} - ${par(a)}} = ${n(r)}$. Quelle affirmation est sûre ?`,
      `${c.sujet} calcule un taux de variation de $${n(r)}$ pour une fonction $f$ entre $${n(a)}$ et $${n(b)}$. Que peut-on en conclure avec certitude ?`,
      `${randomChoice(PRENOMS)} trouve que le taux de variation de $f$ entre $${n(a)}$ et $${n(b)}$ est $${n(r)}$. Que peut-on en déduire ?`,
    ]),
    bon,
    pieges,
    expl(DEF_TAUX, "le taux compare seulement les DEUX images $f(a)$ et $f(b)$ : il ne dit rien de ce qui se passe entre les deux.", `$b - a > 0$, donc $f(b) - f(a)$ a le signe du taux, ici $${n(r)}$.`, `${bon} ; on ne peut pas en déduire le sens de variation de $f$ sur tout l’intervalle.`)
  );
}

/** Polynôme k x² + b x + c pour les taux en h. */
function trinome() {
  for (;;) {
    const k = randomChoice([1, 2, 3, -1, -2]);
    const b = randomInt(-5, 5);
    const c = randomInt(-6, 6);
    const a = randomChoice([-3, -2, -1, 1, 2, 3, 4]);
    const d = 2 * k * a + b;
    if (d !== 0 && d !== k) return { k, b, c, a, d, f: poly([[k, 2], [b, 1], [c, 0]]), F: (x: number) => k * x * x + b * x + c };
  }
}

function genTauxH() {
  const T = trinome();
  const correct = poly([[T.d, 0], [T.k, 1]], "h");
  ctl({ f: T.f, exprH: { a: T.a, kind: "taux", expr: correct } });
  return qcm(
    randomChoice([
      `Pour $f(x) = ${T.f}$, que vaut le taux de variation entre $${T.a}$ et $${T.a} + h$ (avec $h \\neq 0$) ?`,
      `Soit $f(x) = ${T.f}$. Après simplification, $\\dfrac{f(${T.a} + h) - f(${T.a})}{h}$ est égal à :`,
      avecSituation(T.f, `Quel est le taux de variation de $f$ entre $${T.a}$ et $${T.a} + h$ ($h \\neq 0$) ?`),
      `${randomChoice(PRENOMS)} calcule le taux de variation de $f(x) = ${T.f}$ entre $${T.a}$ et $${T.a} + h$. Quel résultat doit-on obtenir ?`,
    ]),
    `$${correct}$`,
    [n(T.d), poly([[T.k, 2], [T.d, 1]], "h"), poly([[T.d, 0], [2 * T.k, 1]], "h"), poly([[2 * T.k * T.a, 0], [T.k, 1]], "h")].map((x) => `$${x}$`),
    expl(DEF_TAUX, "on développe $f(a + h) - f(a)$, puis on divise par $h$.", `$f(${T.a} + h) - f(${T.a}) = ${poly([[T.k, 2], [T.d, 1]], "h")}$, puis on divise par $h$.`, `le taux vaut $${correct}$.`)
  );
}

/* =========================================================
   DER_NOMBRE_DERIVE — limite du taux de variation
========================================================= */

const DEF_ND = "$f'(a)$ est la limite, quand $h$ tend vers 0, du taux de variation $\\dfrac{f(a + h) - f(a)}{h}$.";

function nombreDeriveAuHasard(niv: number) {
  const t = niv <= 3 ? randomInt(1, 3) : niv === 4 ? randomInt(2, 5) : randomInt(4, 8);
  if (t <= 2) {
    const k = t === 1 ? 1 : randomChoice([2, 3, -1, -2, 4]);
    const a = randomChoice([-3, -2, -1, 1, 2, 3, 4, 5]);
    return { f: mono(k, 2), a, T: poly([[2 * k * a, 0], [k, 1]], "h"), val: 2 * k * a };
  }
  if (t === 3 || t === 5) {
    const T = trinome();
    return { f: T.f, a: T.a, T: poly([[T.d, 0], [T.k, 1]], "h"), val: T.d };
  }
  if (t === 4) {
    const a = randomChoice([-2, -1, 1, 2, 3]);
    return { f: "x^3", a, T: poly([[3 * a * a, 0], [3 * a, 1], [1, 2]], "h"), val: 3 * a * a };
  }
  if (t === 6) {
    const a = randomChoice([1, 2, 5, 10]);
    const k = randomChoice([1, 1, 2, 3, -4]);
    const den = a === 1 ? "1 + h" : `${a}(${a} + h)`;
    return { f: k === 1 ? "\\dfrac{1}{x}" : frac(k, "x"), a, T: frac(-k, den), val: -k / (a * a) };
  }
  if (t === 7) {
    const a = randomChoice([1, 4, 16, 25, 100]);
    return { f: "\\sqrt{x}", a, T: `\\dfrac{1}{\\sqrt{${a} + h} + ${Math.sqrt(a)}}`, val: 1 / (2 * Math.sqrt(a)) };
  }
  const a = randomChoice([-1, 1, 2]);
  const b = randomChoice([-3, -1, 2, 4]);
  return { f: poly([[1, 3], [b, 1]]), a, T: poly([[3 * a * a + b, 0], [3 * a, 1], [1, 2]], "h"), val: 3 * a * a + b };
}

function genNdLimite(niv: number) {
  return () => {
    const r = nombreDeriveAuHasard(niv);
    ctl({ f: r.f, x0: r.a, val: r.val, rep: r.val, exprH: { a: r.a, kind: "taux", expr: r.T } });
    const c = randomChoice(CTX);
    return court(
      randomChoice([
        `Pour $f(x) = ${r.f}$, le taux de variation entre $${r.a}$ et $${r.a} + h$ vaut $${r.T}$. Vers quel nombre tend-il quand $h$ tend vers 0 ?`,
        `Le taux de variation de $f(x) = ${r.f}$ entre $${r.a}$ et $${r.a} + h$ est $${r.T}$. Que vaut le nombre dérivé $f'(${r.a})$ ?`,
        `On a calculé, pour $f(x) = ${r.f}$ et $h \\neq 0$ : $\\dfrac{f(${r.a} + h) - f(${r.a})}{h} = ${r.T}$. En déduire $f'(${r.a})$.`,
        `${c.sujet} étudie une fonction $f(x) = ${r.f}$. Entre $${r.a}$ et $${r.a} + h$, son taux de variation vaut $${r.T}$. Quelle est la valeur de $f'(${r.a})$ ?`,
        `Quand $h$ se rapproche de 0, $${r.T}$ se rapproche d’un nombre : lequel ? (Ici $f(x) = ${r.f}$ et l’on étudie $f$ en $${r.a}$.)`,
      ]),
      r.val,
      expl(DEF_ND, "on remplace $h$ par 0 dans l’expression SIMPLIFIÉE du taux.", `quand $h$ tend vers 0, $${r.T}$ tend vers $${n(r.val)}$.`, `$f'(${r.a}) = ${n(r.val)}$.`)
    );
  };
}

const MOBILES = ["d’un drone qui décolle", "d’une cycliste sur une piste", "d’un ascenseur", "d’un train qui quitte la gare", "d’une voiture radiocommandée", "d’un robot de livraison", "d’une nageuse au départ", "d’un skieur dans une descente", "d’une bille sur un plan incliné", "d’un TGV qui accélère"];

function genNdTableau(niv: number) {
  return () => {
    const t = randomInt(1, 3);
    let f = "", F: (x: number) => number, a = 0, val = 0, v = "x";
    if (t === 1) {
      const k = randomChoice([1, 2, 3, 0.5]);
      const b = randomInt(0, 4);
      a = randomInt(1, 4);
      v = "t";
      f = poly([[k, 2], [b, 1]], "t");
      F = (x) => k * x * x + b * x;
      val = 2 * k * a + b;
    } else if (t === 2) {
      a = randomChoice([-2, -1, 1, 2, 3]);
      f = "x^3";
      F = (x) => x ** 3;
      val = 3 * a * a;
    } else {
      const T = trinome();
      f = T.f;
      F = T.F;
      a = T.a;
      val = T.d;
    }
    const hs = niv >= 5 && Math.random() < 0.5 ? [-0.1, -0.01, -0.001] : [0.1, 0.01, 0.001];
    const liste = hs.map((h) => `pour $h = ${n(h)}$, on trouve $${nL((F(a + h) - F(a)) / h)}$`).join(" ; ");
    ctl({ f, v, x0: a, val, rep: val });
    const ex = expl(DEF_ND, "quand $h$ devient très petit, le taux se rapproche du nombre dérivé.", `les valeurs ${hs.map((h) => nL((F(a + h) - F(a)) / h)).join(", ")} se rapprochent de ${n(val)}.`, `${v === "t" ? "la vitesse instantanée vaut" : `$f'(${a}) =`} ${n(val)}${v === "t" ? " m/s" : "$"}.`);
    if (t === 1) {
      const mob = randomChoice(MOBILES);
      return court(
        randomChoice([
          `La position ${mob} est $s(t) = ${f}$ (en mètres, $t$ en secondes). On calcule sa vitesse moyenne entre $t = ${a}$ et $t = ${a} + h$ : ${liste}. Quelle est sa vitesse instantanée à $t = ${a}$, en m/s ?`,
          `Un capteur suit la position $s(t) = ${f}$ ${mob} (en mètres). Vitesses moyennes entre $t = ${a}$ et $t = ${a} + h$ : ${liste}. Quelle vitesse instantanée peut-on conjecturer à $t = ${a}$ ?`,
        ]),
        val,
        ex
      );
    }
    return court(
      randomChoice([
        `On calcule le taux de variation de $f(x) = ${f}$ entre $${a}$ et $${a} + h$, pour des $h$ de plus en plus petits : ${liste}. Quelle valeur de $f'(${a})$ peut-on conjecturer ?`,
        `${randomChoice(SITUATIONS)[0]} programme le calcul du taux de variation de $f(x) = ${f}$ entre $${a}$ et $${a} + h$ : ${liste}. Vers quel nombre ces taux se rapprochent-ils ?`,
        `Pour $f(x) = ${f}$ : ${liste} (taux de variation entre $${a}$ et $${a} + h$). Quel est le nombre dérivé $f'(${a})$ ?`,
      ]),
      val,
      ex
    );
  };
}

function genNdConcept() {
  const a = randomInt(-3, 6);
  const m = randomChoice([-5, -3, -2, -1, 2, 3, 4, 7]);
  const t = randomInt(1, 4);
  if (t === 1)
    return qcm(
      randomChoice([`Le nombre dérivé $f'(${a})$ est :`, `Comment définit-on le nombre dérivé de $f$ en $${a}$ ?`, `${randomChoice(SITUATIONS)[0]} doit calculer $f'(${a})$. Par définition, c’est :`]),
      `la limite du taux de variation entre $${a}$ et $${a} + h$, quand $h$ tend vers 0`,
      [`le taux de variation entre $${a}$ et $${a + 1}$`, `l’image $f(${a})$`, `le quotient $\\dfrac{f(${a})}{h}$`],
      expl(DEF_ND, "on part du taux de variation entre $a$ et $a + h$, et on fait tendre $h$ vers 0.", "le taux entre $a$ et $a + 1$ n’est qu’une approximation.", `$f'(${a})$ est la limite du taux quand $h$ tend vers 0.`)
    );
  if (t === 2) {
    const c = randomChoice(CTX);
    return qcm(
      `${c.sujet} note $${c.f}(${c.v})$ ${c.quoi}. Comment obtient-on ${c.inst} pour $${c.v} = ${a}$ ?`,
      `en prenant la limite ${c.moy.startsWith("le ") ? `du ${c.moy.slice(3)}` : `de ${c.moy}`} entre $${c.v} = ${a}$ et $${c.v} = ${a} + h$, quand $h$ tend vers 0`,
      [`en calculant ${c.moy} entre $${c.v} = 0$ et $${c.v} = ${a}$`, `en divisant $${c.f}(${a})$ par $${a}$`, `en calculant $${c.f}(${a})$`],
      expl(DEF_ND, "la grandeur « instantanée » est la limite des grandeurs « moyennes » sur des intervalles de plus en plus courts.", `${c.moy} entre $${a}$ et $${a} + h$ est un taux de variation ; on fait tendre $h$ vers 0.`, `on obtient ${c.inst}, qui est $${c.f}'(${a})$.`)
    );
  }
  if (t === 3)
    return qcm(
      randomChoice([
        `Sur la courbe de $f$, on trace la sécante passant par les points d’abscisses $${a}$ et $${a} + h$. Quand $h$ tend vers 0, cette sécante se rapproche de :`,
        `${randomChoice(PRENOMS)} trace des sécantes à la courbe de $f$ entre $${a}$ et $${a} + h$, avec $h$ de plus en plus petit. De quelle droite se rapprochent-elles ?`,
      ]),
      `la tangente à la courbe au point d’abscisse $${a}$`,
      ["l’axe des abscisses", `la droite qui passe par l’origine et le point d’abscisse $${a}$`, "l’axe des ordonnées"],
      expl(DEF_ND, "le coefficient directeur de la sécante est le taux de variation.", "quand $h$ tend vers 0, ce coefficient tend vers $f'(a)$.", `les sécantes se rapprochent de la tangente au point d’abscisse $${a}$, de coefficient directeur $f'(${a})$.`)
    );
  return qcm(
    randomChoice([
      `Le taux de variation de $f$ entre $${a}$ et $${a} + h$ tend vers $${m}$ quand $h$ tend vers 0. Que peut-on dire ?`,
      `On a montré que $\\dfrac{f(${a} + h) - f(${a})}{h}$ tend vers $${m}$ quand $h$ tend vers 0. Conclusion ?`,
    ]),
    `$f$ est dérivable en $${a}$ et $f'(${a}) = ${m}$`,
    [`$f(${a}) = ${m}$`, `$f$ n’est pas dérivable en $${a}$`, `$f'(${m}) = ${a}$`].filter((x) => a !== m || !x.includes("f'(")),
    expl(DEF_ND, "si le taux a une limite finie, $f$ est dérivable en $a$ et cette limite est $f'(a)$.", `la limite vaut $${m}$.`, `$f'(${a}) = ${m}$.`)
  );
}

function genNdDerivable() {
  const a = randomInt(-3, 4);
  const L1 = randomChoice([-3, -2, -1, 0, 1, 2, 3]);
  const egal = Math.random() < 0.4;
  const L2 = egal ? L1 : randomChoice([-3, -2, -1, 0, 1, 2, 4].filter((x) => x !== L1));
  const [qui] = randomChoice(SITUATIONS);
  const text = randomChoice([
    `Pour une fonction $f$, le taux de variation entre $${a}$ et $${a} + h$ tend vers $${L1}$ quand $h$ tend vers 0 avec $h < 0$, et vers $${L2}$ avec $h > 0$. $f$ est-elle dérivable en $${a}$ ?`,
    `${qui} étudie une fonction $f$ en $${a}$. À gauche ($h < 0$), le taux de variation tend vers $${L1}$ ; à droite ($h > 0$), il tend vers $${L2}$. Que peut-on conclure ?`,
    `Quand $h$ tend vers 0 par valeurs négatives, $\\dfrac{f(${a} + h) - f(${a})}{h}$ tend vers $${L1}$ ; par valeurs positives, vers $${L2}$. Conclusion ?`,
  ]);
  const ex = expl(DEF_ND, "il faut que le taux ait la MÊME limite à gauche et à droite.", `limite à gauche : $${L1}$ ; limite à droite : $${L2}$.`, egal ? `les deux limites sont égales : $f'(${a}) = ${L1}$.` : "les deux limites sont différentes : $f$ n’est pas dérivable en ce point (la courbe fait une pointe).");
  const der = (L: number) => `$f$ est dérivable en $${a}$ et $f'(${a}) = ${n(L)}$`;
  const nonDer = `$f$ n’est pas dérivable en $${a}$`;
  if (egal) return qcm(text, der(L1), [nonDer, der(L1 + 1), der(-L1 - 2)], ex);
  const moy = (L1 + L2) / 2;
  return qcm(text, `${nonDer} : les deux limites sont différentes`, [der(L1), der(L2), ...(moy !== L1 && moy !== L2 ? [der(moy)] : [])], ex);
}

/* =========================================================
   DER_DEFINITION — calcul par la définition
========================================================= */

const DEF_DEF = "$f'(a) = \\lim\\limits_{h \\to 0} \\dfrac{f(a + h) - f(a)}{h}$.";

function genDefDifference() {
  const T = trinome();
  const correct = poly([[T.k, 2], [T.d, 1]], "h");
  ctl({ f: T.f, exprH: { a: T.a, kind: "diff", expr: correct } });
  const pieges = [poly([[T.k, 2], [T.b, 1]], "h"), poly([[T.d, 1]], "h"), T.c !== 0 ? poly([[T.k, 2], [T.d, 1], [T.c, 0]], "h") : poly([[T.k, 2], [T.k * T.a + T.b, 1]], "h"), poly([[T.k, 2], [T.k * T.a + T.b, 1]], "h")];
  return qcm(
    randomChoice([
      `Pour $f(x) = ${T.f}$, que vaut $f(${T.a} + h) - f(${T.a})$ ?`,
      `Première étape du calcul de $f'(${T.a})$ par la définition, avec $f(x) = ${T.f}$ : on développe $f(${T.a} + h) - f(${T.a})$. On obtient :`,
      avecSituation(T.f, `Pour calculer $f'(${T.a})$ par la définition, on développe $f(${T.a} + h) - f(${T.a})$. Que trouve-t-on ?`),
      `${randomChoice(PRENOMS)} développe $f(${T.a} + h) - f(${T.a})$ pour $f(x) = ${T.f}$. Quel est le bon résultat ?`,
    ]),
    `$${correct}$`,
    pieges.map((x) => `$${x}$`),
    expl(DEF_DEF, "on calcule $f(a + h)$ avec $(a + h)^2 = a^2 + 2ah + h^2$, puis on retire $f(a)$.", `$f(${T.a} + h) = ${coef(T.k)}(${T.a} + h)^2${T.b ? ` ${T.b < 0 ? "-" : "+"} ${coef(Math.abs(T.b))}(${T.a} + h)` : ""}${plusC(T.c)}$ ; après soustraction de $f(${T.a}) = ${n(T.F(T.a))}$, il reste $${correct}$.`, `$f(${T.a} + h) - f(${T.a}) = ${correct}$.`)
  );
}

function genDefTaux() {
  const T = trinome();
  const diff = poly([[T.k, 2], [T.d, 1]], "h");
  const correct = poly([[T.d, 0], [T.k, 1]], "h");
  ctl({ f: T.f, exprH: { a: T.a, kind: "taux", expr: correct } });
  return qcm(
    randomChoice([
      `Pour $f(x) = ${T.f}$, on a $f(${T.a} + h) - f(${T.a}) = ${diff}$. Après simplification par $h$ (avec $h \\neq 0$), le taux de variation vaut :`,
      `On sait que $f(${T.a} + h) - f(${T.a}) = ${diff}$. Que vaut $\\dfrac{f(${T.a} + h) - f(${T.a})}{h}$ pour $h \\neq 0$ ?`,
      `${randomChoice(SITUATIONS)[0]} calcule un nombre dérivé par la définition et obtient $f(${T.a} + h) - f(${T.a}) = ${diff}$. Que vaut le taux de variation après simplification ?`,
    ]),
    `$${correct}$`,
    [n(T.d), diff, poly([[T.d, 0], [T.k, 2]], "h"), poly([[T.k, 0], [T.d, 1]], "h")].map((x) => `$${x}$`),
    expl(DEF_DEF, "on factorise par $h$, puis on simplifie (c’est permis car $h \\neq 0$).", `$\\dfrac{${diff}}{h} = \\dfrac{h(${poly([[T.k, 1], [T.d, 0]], "h")})}{h} = ${correct}$.`, `le taux vaut $${correct}$ (et $f'(${T.a}) = ${n(T.d)}$).`)
  );
}

function genDefLimite() {
  if (Math.random() < 0.3) {
    const a = randomChoice([1, 2, 5, 10]);
    const k = randomChoice([1, 2, 3, 4]);
    const f = k === 1 ? "\\dfrac{1}{x}" : frac(k, "x");
    const val = -k / (a * a);
    ctl({ f, x0: a, val, rep: val });
    return court(
      randomChoice([
        `Pour $f(x) = ${f}$, on a $\\dfrac{f(${a} + h) - f(${a})}{h} = ${frac(-k, a === 1 ? "1 + h" : `${a}(${a} + h)`)}$. En déduire $f'(${a})$ par la définition.`,
        `Par la définition, calcule $f'(${a})$ pour $f(x) = ${f}$. (Le taux entre $${a}$ et $${a} + h$ vaut $${frac(-k, a === 1 ? "1 + h" : `${a}(${a} + h)`)}$.)`,
      ]),
      val,
      expl(DEF_DEF, "on fait tendre $h$ vers 0 dans le taux simplifié.", `$${frac(-k, a === 1 ? "1 + h" : `${a}(${a} + h)`)}$ tend vers $${frac(-k, String(a * a))} = ${n(val)}$.`, `$f'(${a}) = ${n(val)}$.`)
    );
  }
  const T = trinome();
  ctl({ f: T.f, x0: T.a, val: T.d, rep: T.d });
  return court(
    randomChoice([
      `En utilisant la définition, calcule $f'(${T.a})$ pour $f(x) = ${T.f}$.`,
      `Soit $f(x) = ${T.f}$. Calcule le taux de variation entre $${T.a}$ et $${T.a} + h$, puis sa limite quand $h$ tend vers 0. Que vaut $f'(${T.a})$ ?`,
      avecSituation(T.f, `Calcule $f'(${T.a})$ avec la définition du nombre dérivé.`),
      `Sans les formules de dérivation, calcule $f'(${T.a})$ pour $f(x) = ${T.f}$.`,
    ]),
    T.d,
    expl(DEF_DEF, "on développe $f(a + h) - f(a)$, on divise par $h$, puis on fait tendre $h$ vers 0.", `$f(${T.a} + h) - f(${T.a}) = ${poly([[T.k, 2], [T.d, 1]], "h")}$, donc le taux vaut $${poly([[T.d, 0], [T.k, 1]], "h")}$, qui tend vers $${n(T.d)}$.`, `$f'(${T.a}) = ${n(T.d)}$.`)
  );
}

function genDefInverse() {
  const a = randomChoice([1, 2, 3, 4, 5]);
  const k = randomChoice([1, 2, 3, 5]);
  const f = k === 1 ? "\\dfrac{1}{x}" : frac(k, "x");
  const den = a === 1 ? "1 + h" : `${a}(${a} + h)`;
  const diffJ = `\\dfrac{${mono(-k, 1, "h")}}{${den}}`;
  const tauxJ = frac(-k, den);
  if (Math.random() < 0.5) {
    ctl({ f, exprH: { a, kind: "diff", expr: diffJ } });
    return qcm(
      randomChoice([`Pour $f(x) = ${f}$, que vaut $f(${a} + h) - f(${a})$ ?`, `On calcule $f'(${a})$ par la définition pour $f(x) = ${f}$. Après réduction au même dénominateur, $f(${a} + h) - f(${a})$ vaut :`]),
      `$${diffJ}$`,
      [`\\dfrac{${mono(k, 1, "h")}}{${den}}`, tauxJ, `\\dfrac{${mono(-k, 1, "h")}}{${a * a}}`].map((x) => `$${x}$`),
      expl(DEF_DEF, "on réduit au même dénominateur.", `$${frac(k, `${a} + h`)} - ${frac(k, String(a))} = \\dfrac{${k * a} - ${k}(${a} + h)}{${den}} = ${diffJ}$.`, `$f(${a} + h) - f(${a}) = ${diffJ}$.`)
    );
  }
  ctl({ f, exprH: { a, kind: "taux", expr: tauxJ } });
  return qcm(
    randomChoice([`Pour $f(x) = ${f}$, on a $f(${a} + h) - f(${a}) = ${diffJ}$. Que vaut le taux de variation entre $${a}$ et $${a} + h$ ?`, `On sait que $f(${a} + h) - f(${a}) = ${diffJ}$ pour $f(x) = ${f}$. Après division par $h$, on obtient :`]),
    `$${tauxJ}$`,
    [frac(k, den), diffJ, frac(-k, String(a * a))].map((x) => `$${x}$`),
    expl(DEF_DEF, "on divise par $h$ (non nul) : le $h$ du numérateur se simplifie.", `$${diffJ} \\div h = ${tauxJ}$.`, `le taux vaut $${tauxJ}$ (il tend vers $${fq(-k, a * a)}$).`)
  );
}

function genDefEtape() {
  const T = trinome();
  const diff = poly([[T.k, 2], [T.d, 1]], "h");
  const t = randomInt(1, 3);
  const ex = expl(DEF_DEF, "trois étapes : développer $f(a + h) - f(a)$, simplifier par $h$ (car $h \\neq 0$), puis faire tendre $h$ vers 0.", `ici $f(${T.a} + h) - f(${T.a}) = ${diff}$, le taux vaut $${poly([[T.d, 0], [T.k, 1]], "h")}$ et sa limite est $${n(T.d)}$.`, `$f'(${T.a}) = ${n(T.d)}$.`);
  if (t === 1)
    return qcm(
      `On veut calculer $f'(${T.a})$ par la définition pour $f(x) = ${T.f}$. Par quoi commence-t-on ?`,
      `on calcule $f(${T.a} + h) - f(${T.a})$`,
      [`on remplace $h$ par 0`, `on calcule $f'(x)$ avec les formules`, `on calcule $f(${T.a})$ divisé par $${T.a}$`],
      ex
    );
  if (t === 2)
    return qcm(
      `Pour $f(x) = ${T.f}$, on arrive à $\\dfrac{f(${T.a} + h) - f(${T.a})}{h} = \\dfrac{${diff}}{h}$. Que fait-on ensuite ?`,
      "on factorise par $h$ et on simplifie, car $h \\neq 0$",
      ["on remplace $h$ par 0 tout de suite", "on développe encore le numérateur", "on multiplie par $h$ en haut et en bas"],
      ex
    );
  return qcm(
    `Pour $f(x) = ${T.f}$, le taux de variation entre $${T.a}$ et $${T.a} + h$ vaut $${poly([[T.d, 0], [T.k, 1]], "h")}$. Quelle est la dernière étape ?`,
    `on fait tendre $h$ vers 0 : $f'(${T.a}) = ${n(T.d)}$`,
    [`on remplace $h$ par 1 : $f'(${T.a}) = ${n(T.d + T.k)}$`, `on garde le taux : $f'(${T.a}) = ${poly([[T.d, 0], [T.k, 1]], "h")}$`, `on divise encore par $h$`],
    ex
  );
}

/* =========================================================
   DER_VALEUR_ABSOLUE — |x| non dérivable en 0
========================================================= */

const DEF_VA = "$|x| = x$ si $x \\ge 0$ et $|x| = -x$ si $x < 0$ : sa dérivée vaut 1 à droite de 0, $-1$ à gauche, et $|x|$ n’est pas dérivable en 0.";

/** f(x) = k|x − c| + d. */
function absAuHasard(niv: number) {
  const t = niv <= 4 ? randomInt(1, 4) : randomInt(3, 5);
  let k = 1, c = 0, d = 0;
  if (t === 2) k = randomChoice([2, 3, -1, -2, 5]);
  if (t === 3) c = randomChoice([-4, -3, -2, -1, 1, 2, 3, 5]);
  if (t === 4) d = randomChoice([-3, -2, 1, 2, 4]);
  if (t === 5) {
    k = randomChoice([2, 3, -1, -2, 0.5]);
    c = randomChoice([-3, -2, -1, 1, 2, 4]);
    d = randomChoice([-2, 1, 3]);
  }
  const f = `${coef(k)}|${xPlus(-c)}|${plusC(d)}`;
  return { k, c, d, f, F: (x: number) => k * Math.abs(x - c) + d };
}

function xPlus(m: number) {
  return m === 0 ? "x" : m > 0 ? `x + ${n(m)}` : `x - ${n(-m)}`;
}

const DISTANCES = [
  "la distance entre un drone et sa base, placée à l’abscisse",
  "l’écart entre une mesure et la valeur cible",
  "la distance entre un nageur et la bouée placée à l’abscisse",
  "l’erreur d’un capteur de position réglé sur l’abscisse",
  "la distance entre un robot et la borne de recharge placée à l’abscisse",
];

function genVaValeur(niv: number) {
  return () => {
    const r = absAuHasard(niv);
    const a = r.c + randomChoice([-4, -3, -2, -1, -0.5, 0.5, 1, 2, 3, 5]);
    const val = r.k * Math.sign(a - r.c);
    ctl({ f: r.f, x0: a, val, rep: val });
    const ex = expl(DEF_VA, `on regarde si $x$ est à droite ou à gauche de $${n(r.c)}$ : la courbe y est une droite.`, `$${n(a)} ${a > r.c ? ">" : "<"} ${n(r.c)}$, donc près de $${n(a)}$, $f(x) = ${a > r.c ? lin(r.k, -r.k * r.c + r.d) : lin(-r.k, r.k * r.c + r.d)}$.`, `$f'(${n(a)}) = ${n(val)}$.`);
    if (r.k === 1 && r.d === 0 && r.c !== 0 && Math.random() < 0.5) {
      const cible = randomChoice(DISTANCES);
      return court(`On modélise ${cible} $${n(r.c)}$ par $f(x) = ${r.f}$. Que vaut $f'(${n(a)})$ ?`, val, ex);
    }
    return court(
      randomChoice([
        `Que vaut la dérivée de $f(x) = ${r.f}$ au point d’abscisse $${n(a)}$ ?`,
        `Soit $f(x) = ${r.f}$. Calcule $f'(${n(a)})$.`,
        `Pour $f(x) = ${r.f}$, quel est le coefficient directeur de la tangente au point d’abscisse $${n(a)}$ ?`,
        `${randomChoice(PRENOMS)} étudie $f(x) = ${r.f}$. Combien vaut $f'(${n(a)})$ ?`,
        avecSituation(r.f, `Que vaut $f'(${n(a)})$ ?`),
      ]),
      val,
      ex
    );
  };
}

function genVaNonDerivable(niv: number) {
  return () => {
    let f: string, c: number;
    if (niv >= 5 && Math.random() < 0.6) {
      const a = randomChoice([2, 3, 4, 5]);
      c = randomChoice([-3, -2, -1, 1, 2, 3]);
      const k = randomChoice([1, 2, -1, 3]);
      f = `${coef(k)}|${lin(a, -a * c)}|${plusC(randomChoice([0, 1, -2, 4]))}`;
    } else {
      const r = absAuHasard(niv);
      if (r.c === 0) {
        r.c = randomChoice([-2, 1, 3]);
      }
      c = r.c;
      f = `${coef(r.k)}|${xPlus(-c)}|${plusC(r.d)}`;
    }
    ctl({ rep: c });
    return court(
      randomChoice([
        `En quelle abscisse la fonction $f(x) = ${f}$ n’est-elle pas dérivable ?`,
        `La courbe de $f(x) = ${f}$ présente une pointe. En quelle abscisse ?`,
        `${randomChoice(SITUATIONS)[0]} utilise $f(x) = ${f}$. En quel point ne peut-on pas calculer $f'(x)$ ?`,
        `Pour quelle valeur de $x$ la fonction $f(x) = ${f}$ n’admet-elle pas de nombre dérivé ?`,
      ]),
      c,
      expl(DEF_VA, "on cherche où l’expression dans la valeur absolue s’annule.", `elle s’annule en $x = ${n(c)}$ : la pente passe brusquement d’une valeur à l’autre.`, `$f$ n’est pas dérivable en $${n(c)}$.`)
    );
  };
}

function genVaTaux() {
  const h = randomChoice([0.5, 0.1, 2, 3, 0.01, -0.1, -0.5, -2, -3, -0.01]);
  const k = randomChoice([1, 1, 2, 3, -2]);
  const c = randomChoice([0, 0, 1, -2, 3]);
  const f = `${coef(k)}|${xPlus(-c)}|`;
  const val = k * Math.sign(h);
  ctl({ f, taux: { a: c, b: c + h, val }, rep: val });
  return court(
    randomChoice([
      `Pour $f(x) = ${f}$, calcule le taux de variation entre $${n(c)}$ et $${n(c + h)}$.`,
      `Soit $f(x) = ${f}$ et $h = ${n(h)}$. Que vaut $\\dfrac{f(${n(c)} + h) - f(${n(c)})}{h}$ ?`,
      `${randomChoice(PRENOMS)} calcule le taux de variation de $f(x) = ${f}$ entre $${n(c)}$ et $${n(c)} + h$ avec $h = ${n(h)}$. Que trouve-t-on ?`,
      avecSituation(f, `Calcule le taux de variation de $f$ entre $${n(c)}$ et $${n(c + h)}$.`),
    ]),
    val,
    expl(DEF_VA, "on calcule $\\dfrac{f(c + h) - f(c)}{h}$.", `$f(${n(c)}) = 0$ et $f(${n(c + h)}) = ${n(k * Math.abs(h))}$, donc le taux vaut $\\dfrac{${n(k * Math.abs(h))}}{${n(h)}} = ${n(val)}$.`, `le taux vaut ${n(val)} : il dépend du signe de $h$, d’où la non-dérivabilité en $${n(c)}$.`)
  );
}

function genVaCourbe() {
  const k = randomChoice([1, -1, 2, 0.5, -2]);
  const c = randomInt(-2, 2);
  const d = randomInt(-2, 2);
  const F = (x: number) => k * Math.abs(x - c) + d;
  const pts: Array<{ x: number; y: number }> = [];
  for (let i = 0; i <= 40; i++) {
    const x = c - 5 + i * 0.25;
    pts.push({ x, y: F(x) });
  }
  const canvas = figure({ xmin: c - 5, xmax: c + 5, ymin: d - 6, ymax: d + 6, pts });
  const t = randomInt(1, 3);
  const f = `${coef(k)}|${xPlus(-c)}|${plusC(d)}`;
  if (t === 1) {
    ctl({ rep: c });
    return court(
      randomChoice(["Voici la courbe d’une fonction $f$. En quelle abscisse $f$ n’est-elle pas dérivable ?", "La courbe ci-dessous a une pointe. Lis son abscisse.", `${randomChoice(SITUATIONS)[0]} trace la courbe ci-dessous. En quel point n’a-t-elle pas de tangente ?`]),
      c,
      expl(DEF_VA, "là où la courbe fait une pointe, il n’y a pas de tangente.", `la pointe est en $x = ${c}$.`, `$f$ n’est pas dérivable en $${c}$.`),
      canvas
    );
  }
  const a = c + (t === 2 ? randomChoice([1, 2, 3]) : -randomChoice([1, 2, 3]));
  const val = k * Math.sign(a - c);
  ctl({ f, x0: a, val, rep: val });
  return court(
    randomChoice([`Voici la courbe de $f$. Lis le coefficient directeur de la courbe au point d’abscisse $${a}$, puis donne $f'(${a})$.`, `D’après le graphique, que vaut $f'(${a})$ ?`, `Sur la courbe ci-dessous, la fonction est affine de chaque côté de la pointe. Que vaut $f'(${a})$ ?`]),
    val,
    expl(DEF_VA, "de chaque côté de la pointe, la courbe est un morceau de droite : on lit sa pente.", `près de $x = ${a}$, la courbe monte (ou descend) de $${n(Math.abs(k))}$ quand on avance de 1.`, `$f'(${a}) = ${n(val)}$.`),
    canvas
  );
}

const AFF_VA: Array<[string, boolean]> = [
  ["La fonction $x \\mapsto |x|$ est dérivable en 0.", false],
  ["La fonction $x \\mapsto |x|$ est continue en 0.", true],
  ["La fonction $x \\mapsto |x|$ est dérivable sur $]0\\,;+\\infty[$.", true],
  ["Sur $]-\\infty\\,;0[$, la dérivée de $x \\mapsto |x|$ vaut $-1$.", true],
  ["Sur $]0\\,;+\\infty[$, la dérivée de $x \\mapsto |x|$ vaut $x$.", false],
  ["Toute fonction continue en $a$ est dérivable en $a$.", false],
  ["Toute fonction dérivable en $a$ est continue en $a$.", true],
  ["La courbe de $x \\mapsto |x|$ admet une tangente horizontale en 0.", false],
  ["En 0, le taux de variation de $x \\mapsto |x|$ vaut 1 si $h > 0$ et $-1$ si $h < 0$.", true],
  ["La fonction $x \\mapsto |x|$ est dérivable sur $\\mathbb{R}$.", false],
];

function genVaVraiFaux() {
  let aff: string, vrai: boolean;
  const t = randomInt(1, 3);
  if (t === 1) [aff, vrai] = randomChoice(AFF_VA);
  else if (t === 2) {
    const c = randomChoice([-3, -2, -1, 1, 2, 4]);
    const ou = randomChoice([c, 0]);
    aff = `La fonction $x \\mapsto |${xPlus(-c)}|$ n’est pas dérivable en $${ou}$.`;
    vrai = ou === c;
  } else {
    const k = randomChoice([2, 3, 4, -2, -3]);
    const a = randomChoice([-3, -2, -1, 1, 2, 3]);
    const bonne = k * Math.sign(a);
    const dit = Math.random() < 0.5 ? bonne : -bonne;
    aff = `La dérivée de $x \\mapsto ${k}|x|$ en $${a}$ vaut $${dit}$.`;
    vrai = dit === bonne;
  }
  const ex = expl(DEF_VA, "on confronte l’affirmation au cours (la valeur absolue est l’exemple d’une fonction continue mais pas dérivable en 0).", "on regarde la pente à gauche et à droite du point étudié.", `l’affirmation est ${vrai ? "vraie" : "fausse"}.`);
  const u = randomInt(1, 3);
  if (u === 1) return qcm(`Vrai ou faux ? ${aff}`, vrai ? "Vrai" : "Faux", [vrai ? "Faux" : "Vrai"], ex);
  if (u === 2) return qcm(`${randomChoice(PRENOMS)} affirme : « ${aff} » Est-ce juste ?`, vrai ? "Oui" : "Non", [vrai ? "Non" : "Oui"], ex);
  return qcm(`${randomChoice(SITUATIONS)[0]} relit un cours et lit : « ${aff} » Cette phrase est-elle correcte ?`, vrai ? "Oui, elle est correcte" : "Non, elle est fausse", [vrai ? "Non, elle est fausse" : "Oui, elle est correcte"], ex);
}

function genVaGaucheDroite() {
  const k = randomChoice([1, 2, 3, 0.5, -1, -2]);
  const c = randomChoice([-3, -1, 0, 2, 4]);
  const d = randomChoice([0, 1, -2, 3]);
  const f = `${coef(k)}|${xPlus(-c)}|${plusC(d)}`;
  return qcm(
    randomChoice([
      `Pour $f(x) = ${f}$, le taux de variation entre $${c}$ et $${c} + h$ tend vers $${n(k)}$ si $h > 0$ et vers $${n(-k)}$ si $h < 0$. Donc :`,
      `On étudie $f(x) = ${f}$ en $${c}$ : à droite, la pente vaut $${n(k)}$ ; à gauche, elle vaut $${n(-k)}$. Que peut-on conclure ?`,
      `${randomChoice(SITUATIONS)[0]} utilise $f(x) = ${f}$. Que peut-on dire de $f$ en $${c}$ ?`,
    ]),
    `$f$ n’est pas dérivable en $${c}$`,
    [`$f'(${c}) = ${n(k)}$`, `$f'(${c}) = 0$`, `$f'(${c}) = ${n(-k)}$`],
    expl(DEF_VA, "on compare les limites du taux à gauche et à droite.", `à droite : $${n(k)}$ ; à gauche : $${n(-k)}$ ; elles sont différentes.`, `$f$ n’est pas dérivable en $${c}$ (sa courbe y fait une pointe).`)
  );
}

/* =========================================================
   DER_OPERATIONS — somme, produit, k·u
========================================================= */

const DEF_OP = "$(u + v)' = u' + v'$, $(ku)' = ku'$, $(uv)' = u'v + uv'$.";

/** Dérivée d'un polynôme donné par ses termes. */
function deriverTermes(t: Array<[number, number]>): Array<[number, number]> {
  return t.filter(([, p]) => p !== 0).map(([c, p]) => [c * p, p - 1]);
}

/** Regroupe les termes de même puissance. */
function fusion(t: Array<[number, number]>): Array<[number, number]> {
  const m = new Map<number, number>();
  for (const [c, p] of t) m.set(p, (m.get(p) ?? 0) + c);
  return [...m.entries()].sort((x, y) => y[0] - x[0]).map(([p, c]) => [c, p] as [number, number]);
}

function polyOp(niv: number) {
  const nz = (lo: number, hi: number) => {
    let x = 0;
    while (x === 0) x = randomInt(lo, hi);
    return x;
  };
  let termes: Array<[number, number]>;
  if (niv <= 3) termes = [[nz(-6, 7), 2], [nz(-9, 9), 1], [nz(-9, 9), 0]];
  else if (niv === 4) termes = [[nz(-4, 5), 3], [nz(-6, 6), 2], [nz(-9, 9), 1], [randomInt(-9, 9), 0]];
  else termes = [[nz(-3, 4), randomInt(4, 6)], [nz(-6, 6), 2], [nz(-9, 9), 1], [nz(-9, 9), 0]];
  const d = deriverTermes(termes);
  const cst = termes.find(([, p]) => p === 0)?.[0] ?? 0;
  const pieges = [
    poly(fusion([...d, [cst, 0]])),
    poly(termes.filter(([, p]) => p !== 0).map(([c, p], i) => [i === 0 ? c : c * p, p - 1] as [number, number])),
    poly(termes.filter(([, p]) => p !== 0).map(([c, p]) => [c * p, p] as [number, number])),
    poly(termes.filter(([, p]) => p !== 0).map(([c, p]) => [c, p - 1] as [number, number])),
  ];
  return { f: poly(termes), df: poly(d), pieges, termes };
}

function genOpPoly(niv: number) {
  return () => {
    if (niv === 3 && Math.random() < 0.4) {
      // somme avec une fonction de référence
      const m = randomChoice([2, 3, -2, 5, -4, 6]);
      const k = randomInt(2, 7);
      if (Math.random() < 0.5) {
        const f = `${mono(m, 1)} + ${k}\\sqrt{x}`;
        const rac = k % 2 === 0 ? `\\dfrac{${k / 2}}{\\sqrt{x}}` : `\\dfrac{${k}}{2\\sqrt{x}}`;
        const df = `${n(m)} + ${rac}`;
        ctl({ f, df });
        return qcm(enonceDerivee(f), `$${df}$`, [`${n(m)} + \\dfrac{1}{2\\sqrt{x}}`, `${mono(m, 1)} + ${rac}`, rac, `${n(m)} + ${k}\\sqrt{x}`].map((x) => `$${x}$`), expl(DEF_OP, "on dérive chaque terme de la somme.", `$(${mono(m, 1)})' = ${n(m)}$ et $(${k}\\sqrt{x})' = ${rac}$.`, `$f'(x) = ${df}$.`));
      }
      const f = `${mono(m, 2)} + ${frac(k, "x")}`;
      const df = `${mono(2 * m, 1)} - ${frac(k, "x^2")}`;
      ctl({ f, df });
      return qcm(enonceDerivee(f), `$${df}$`, [`${mono(2 * m, 1)} + ${frac(k, "x^2")}`, `${mono(m, 1)} - ${frac(k, "x^2")}`, `${mono(2 * m, 1)} - ${frac(k, "x")}`, `${mono(2 * m, 1)} - \\dfrac{1}{x^2}`].map((x) => `$${x}$`), expl(DEF_OP, "on dérive chaque terme de la somme.", `$(${mono(m, 2)})' = ${mono(2 * m, 1)}$ et $\\left(${frac(k, "x")}\\right)' = -${frac(k, "x^2")}$.`, `$f'(x) = ${df}$.`));
    }
    const P = polyOp(niv);
    ctl({ f: P.f, df: P.df });
    return qcm(
      randomChoice([enonceDerivee(P.f), `En dérivant terme à terme, quelle est la dérivée de $f(x) = ${P.f}$ ?`]),
      `$${P.df}$`,
      P.pieges.map((x) => `$${x}$`),
      expl(DEF_OP, "on dérive chaque terme : $(ax^n)' = a \\times nx^{n-1}$, et une constante a une dérivée nulle.", `$f(x) = ${P.f}$, donc $f'(x) = ${P.df}$.`, `$f'(x) = ${P.df}$.`)
    );
  };
}

function genOpValeur(niv: number) {
  return () => {
    const P = polyOp(niv);
    const x0 = randomInt(-3, 3);
    const dd = deriverTermes(P.termes);
    const val = dd.reduce((s, [c, p]) => s + c * x0 ** p, 0);
    ctl({ f: P.f, x0, val, rep: val });
    return court(
      enonceValeur(P.f, x0),
      val,
      expl(DEF_OP, "on dérive terme à terme, puis on remplace $x$.", `$f'(x) = ${P.df}$, donc $f'(${x0}) = ${n(val)}$.`, `$f'(${x0}) = ${n(val)}$.`)
    );
  };
}

function produitAuHasard() {
  for (;;) {
    const a = randomChoice([1, 2, 3, 4, -1, -2, -3]);
    const c = randomChoice([1, 2, 3, -1, -2, 4]);
    const b = randomChoice([-6, -5, -3, -2, -1, 1, 2, 3, 4, 5]);
    const d = randomChoice([-5, -4, -3, -1, 1, 2, 3, 6]);
    if (a * d + b * c === 0 || a * d === b * c) continue;
    return { a, b, c, d, f: `(${lin(a, b)})(${lin(c, d)})`, df: poly([[2 * a * c, 1], [a * d + b * c, 0]]) };
  }
}

function genOpProduit(niv: number) {
  return () => {
    if (niv >= 5 && Math.random() < 0.6) {
      const a = randomChoice([1, 2, 3, -1, -2, 4]);
      const b = randomChoice([-5, -3, -1, 1, 2, 4, 6]);
      const L = lin(a, b);
      const f = `(${L})\\sqrt{x}`;
      const df = `${coef(a)}\\sqrt{x} + \\dfrac{${L}}{2\\sqrt{x}}`;
      ctl({ f, df });
      return qcm(
        randomChoice([enonceDerivee(f), `Avec $(uv)' = u'v + uv'$, $u(x) = ${L}$ et $v(x) = \\sqrt{x}$, que vaut $f'(x)$ pour $f(x) = ${f}$ ($x > 0$) ?`]),
        `$${df}$`,
        [`\\dfrac{${a}}{2\\sqrt{x}}`, `${coef(a)}\\sqrt{x} - \\dfrac{${L}}{2\\sqrt{x}}`, `${coef(a)}\\sqrt{x} + \\dfrac{${L}}{\\sqrt{x}}`, `${coef(a)}\\sqrt{x}`].map((x) => `$${x}$`),
        expl(DEF_OP, "on pose $u(x) = " + L + "$ et $v(x) = \\sqrt{x}$, puis $(uv)' = u'v + uv'$.", `$u'(x) = ${n(a)}$ et $v'(x) = \\dfrac{1}{2\\sqrt{x}}$.`, `$f'(x) = ${df}$.`)
      );
    }
    const P = produitAuHasard();
    ctl({ f: P.f, df: P.df });
    return qcm(
      randomChoice([
        enonceDerivee(P.f),
        `Avec la formule $(uv)' = u'v + uv'$, quelle est la dérivée de $f(x) = ${P.f}$ ?`,
        `On pose $u(x) = ${lin(P.a, P.b)}$ et $v(x) = ${lin(P.c, P.d)}$. Que vaut $(uv)'(x)$, sous forme développée ?`,
      ]),
      `$${P.df}$`,
      [n(P.a * P.c), poly([[P.a * P.c, 1], [P.a * P.d + P.b * P.c, 0]]), poly([[P.a * P.c, 1], [P.a * P.d, 0]]), poly([[2 * P.a * P.c, 1], [P.a * P.d - P.b * P.c, 0]])].map((x) => `$${x}$`),
      expl(DEF_OP, "on pose $u$ et $v$, on calcule $u'$ et $v'$, puis $u'v + uv'$ que l’on développe.", `$u' = ${n(P.a)}$, $v' = ${n(P.c)}$ : $f'(x) = ${n(P.a)}(${lin(P.c, P.d)}) + ${par(P.c)}(${lin(P.a, P.b)}) = ${P.df}$.`, `$f'(x) = ${P.df}$ (et non $u'v' = ${n(P.a * P.c)}$).`)
    );
  };
}

function genOpProduitValeur() {
  if (Math.random() < 0.5) {
    for (;;) {
      const a = randomChoice([1, 2, 3, -1, -2, 4]);
      const b = randomChoice([-5, -3, -1, 1, 2, 4, 6]);
      const x0 = randomChoice([1, 4, 16, 25]);
      const val = a * Math.sqrt(x0) + (a * x0 + b) / (2 * Math.sqrt(x0));
      if (!exact(val)) continue;
      const f = `(${lin(a, b)})\\sqrt{x}`;
      ctl({ f, x0, val, rep: val });
      return court(enonceValeur(f, x0), val, expl(DEF_OP, "$(uv)' = u'v + uv'$ avec $u(x) = " + lin(a, b) + "$ et $v(x) = \\sqrt{x}$.", `$f'(x) = ${coef(a)}\\sqrt{x} + \\dfrac{${lin(a, b)}}{2\\sqrt{x}}$, donc $f'(${x0}) = ${n(a * Math.sqrt(x0))} + \\dfrac{${n(a * x0 + b)}}{${n(2 * Math.sqrt(x0))}}$.`, `$f'(${x0}) = ${n(val)}$.`));
    }
  }
  const P = produitAuHasard();
  const x0 = randomInt(-3, 3);
  const val = 2 * P.a * P.c * x0 + P.a * P.d + P.b * P.c;
  ctl({ f: P.f, x0, val, rep: val });
  return court(enonceValeur(P.f, x0), val, expl(DEF_OP, "$(uv)' = u'v + uv'$.", `$f'(x) = ${P.df}$, donc $f'(${x0}) = ${n(val)}$.`, `$f'(${x0}) = ${n(val)}$.`));
}

const STRUCTURES: Array<[string, string]> = [
  ["un produit $uv$", "$(uv)' = u'v + uv'$"],
  ["un quotient $\\dfrac{u}{v}$", "$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$"],
  ["une somme $u + v$", "$(u + v)' = u' + v'$"],
  ["un nombre fois une fonction $ku$", "$(ku)' = ku'$"],
];

function genOpStructure() {
  const a = randomChoice([2, 3, -1, 4]);
  const b = randomChoice([-3, 1, 5, -2]);
  const k = randomChoice([3, 5, 7, -4, 2]);
  const exemples: Array<[string, number]> = [
    [`(${lin(a, b)})(${lin(1, k)})`, 0],
    [`${puiss(2)}\\sqrt{x}`, 0],
    [`(${lin(a, b)})\\sqrt{x}`, 0],
    [`\\dfrac{${lin(a, b)}}{${lin(1, k)}}`, 1],
    [`\\dfrac{\\sqrt{x}}{${lin(a, b)}}`, 1],
    [`${poly([[a, 2], [b, 1]])} + \\sqrt{x}`, 2],
    [`${puiss(3)} ${k < 0 ? "-" : "+"} ${frac(Math.abs(k), "x")}`, 2],
    [`${k}\\sqrt{x}`, 3],
    [`${k}(${poly([[1, 2], [b, 0]])})`, 3],
  ];
  const [f, idx] = randomChoice(exemples);
  const formule = Math.random() < 0.5;
  const ex = expl(DEF_OP + " Et $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.", "on repère la DERNIÈRE opération de l’expression.", `$${f}$ est ${STRUCTURES[idx][0]}.`, `on utilise ${STRUCTURES[idx][1]}.`);
  if (formule)
    return qcm(
      randomChoice([`Quelle formule faut-il utiliser pour dériver $f(x) = ${f}$ ?`, `${randomChoice(PRENOMS)} veut dériver $f(x) = ${f}$. Quelle formule doit-on appliquer ?`, avecSituation(f, "Quelle formule utiliser pour la dériver ?")]),
      STRUCTURES[idx][1],
      STRUCTURES.filter((_, i) => i !== idx).map((s) => s[1]),
      ex
    );
  return qcm(
    randomChoice([`Pour dériver $f(x) = ${f}$, quelle forme reconnaît-on ?`, `L’expression $f(x) = ${f}$ est :`, `${randomChoice(SITUATIONS)[0]} doit dériver $f(x) = ${f}$. Quelle structure faut-il reconnaître ?`]),
    STRUCTURES[idx][0],
    STRUCTURES.filter((_, i) => i !== idx).map((s) => s[0]),
    ex
  );
}

/* =========================================================
   DER_QUOTIENT — 1/v et u/v
========================================================= */

const DEF_QUO = "$\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$ et $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$, là où $v \\neq 0$.";

function genQuoInverse() {
  const a = randomChoice([2, 3, 4, 5]);
  const b = randomChoice([-7, -5, -3, -1, 1, 2, 4, 6]);
  const k = randomChoice([1, 2, 3, 5, -1, -4]);
  const L = lin(a, b);
  const f = frac(k, L);
  const df = frac(-k * a, `(${L})^2`);
  ctl({ f, df });
  return qcm(
    randomChoice([enonceDerivee(f), `Avec $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$, quelle est la dérivée de $f(x) = ${f}$ ?`]),
    `$${df}$`,
    [frac(k * a, `(${L})^2`), frac(-k, `(${L})^2`), frac(-k * a, L)].map((x) => `$${x}$`),
    expl(DEF_QUO, `on pose $v(x) = ${L}$, donc $v'(x) = ${n(a)}$.`, `$f'(x) = ${n(k)} \\times \\left(-\\dfrac{${n(a)}}{(${L})^2}\\right) = ${df}$.`, `$f'(x) = ${df}$.`)
  );
}

function homographique(niv: number) {
  for (;;) {
    const c = niv <= 4 ? 1 : randomChoice([1, 2, 3, -1, -2]);
    const a = randomChoice([1, 2, 3, 4, -1, -2, -3]);
    const b = randomChoice([-5, -4, -3, -2, -1, 1, 2, 3, 5]);
    const d = randomChoice([-6, -4, -3, -2, -1, 1, 2, 3, 5]);
    const N = a * d - b * c;
    if (N === 0 || a * d + b * c === 0 || a * d === 0 || b * c === 0) continue;
    if (Math.abs(N) === Math.abs(a * d + b * c)) continue;
    const U = lin(a, b);
    const V = lin(c, d);
    return { a, b, c, d, N, U, V, f: `\\dfrac{${U}}{${V}}`, df: frac(N, `(${V})^2`) };
  }
}

function genQuoHomographique(niv: number) {
  return () => {
    const H = homographique(niv);
    ctl({ f: H.f, df: H.df });
    return qcm(
      randomChoice([enonceDerivee(H.f), `Avec $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$, quelle est la dérivée de $f(x) = ${H.f}$ ?`, `On pose $u(x) = ${H.U}$ et $v(x) = ${H.V}$. Que vaut $\\left(\\dfrac{u}{v}\\right)'(x)$ ?`]),
      `$${H.df}$`,
      [frac(-H.N, `(${H.V})^2`), frac(H.a * H.d + H.b * H.c, `(${H.V})^2`), fq(H.a, H.c), frac(H.N, H.V)].map((x) => `$${x}$`),
      expl(DEF_QUO, `$u = ${H.U}$, $u' = ${n(H.a)}$, $v = ${H.V}$, $v' = ${n(H.c)}$.`, `$u'v - uv' = ${n(H.a)}(${H.V}) - ${par(H.c)}(${H.U}) = ${n(H.N)}$.`, `$f'(x) = ${H.df}$.`)
    );
  };
}

function genQuoValeur(niv: number) {
  return () => {
    for (;;) {
      const H = homographique(niv);
      const x0 = randomInt(-4, 4);
      const den = H.c * x0 + H.d;
      if (den === 0) continue;
      const val = H.N / (den * den);
      if (!exact(val)) continue;
      ctl({ f: H.f, x0, val, rep: val });
      return court(enonceValeur(H.f, x0), val, expl(DEF_QUO, "on calcule $f'(x)$, puis on remplace $x$.", `$f'(x) = ${H.df}$, donc $f'(${x0}) = \\dfrac{${n(H.N)}}{${par(den)}^2} = ${n(val)}$.`, `$f'(${x0}) = ${n(val)}$.`));
    }
  };
}

function genQuoDomaine() {
  for (;;) {
    const H = homographique(5);
    const z = -H.d / H.c;
    const zu = -H.b / H.a;
    if (!Number.isInteger(z) || z === 0 || zu === z || zu === -z) continue;
    const ens = (p: number, q: number) => `$\\mathbb{R} \\setminus \\left\\{${fq(p, q)}\\right\\}$`;
    return qcm(
      randomChoice([`Sur quel ensemble la fonction $f(x) = ${H.f}$ est-elle dérivable ?`, `Où peut-on calculer $f'(x)$ pour $f(x) = ${H.f}$ ?`, avecSituation(H.f, "Sur quel ensemble cette fonction est-elle dérivable ?")]),
      ens(z, 1),
      [Number.isFinite(zu) ? ens(-H.b, H.a) : "$]0\\,;+\\infty[$", ens(-z, 1), "$\\mathbb{R}$"],
      expl(DEF_QUO, "un quotient est dérivable là où son dénominateur ne s’annule pas.", `$${H.V} = 0$ pour $x = ${n(z)}$.`, `$f$ est dérivable sur ${ens(z, 1)}.`)
    );
  }
}

const CTX_QUO: Array<[string, string]> = [
  ["Le coût moyen de fabrication de $q$ objets est", "q"],
  ["Une chimiste modélise la concentration d’une solution par", "t"],
  ["Un économiste modélise le prix moyen d’un abonnement par", "q"],
  ["Une ingénieure modélise le rendement d’un moteur par", "x"],
  ["Un biologiste modélise la vitesse de croissance d’une plante par", "t"],
];

function genQuoSigne() {
  const H = homographique(5);
  const croissante = H.N > 0;
  const bon = croissante ? "croissante sur chaque intervalle où elle est définie" : "décroissante sur chaque intervalle où elle est définie";
  const pieges = [croissante ? "décroissante sur chaque intervalle où elle est définie" : "croissante sur chaque intervalle où elle est définie", "croissante puis décroissante", "constante"];
  const ex = expl(DEF_QUO, "le signe de $f'$ donne le sens de variation ; ici le dénominateur $v^2$ est positif.", `$f'(x) = ${H.df}$ a le signe de $${n(H.N)}$.`, `$f$ est ${bon}.`);
  if (Math.random() < 0.4) {
    const [debut, v] = randomChoice(CTX_QUO);
    const fv = H.f.replace(/x/g, v);
    return qcm(`${debut} $f(${v}) = ${fv}$. On trouve $f'(${v}) = ${H.df.replace(/x/g, v)}$. La fonction $f$ est :`, bon, pieges, ex);
  }
  return qcm(
    randomChoice([`Pour $f(x) = ${H.f}$, on trouve $f'(x) = ${H.df}$. La fonction $f$ est :`, `Soit $f(x) = ${H.f}$. En étudiant le signe de $f'(x)$, on obtient que $f$ est :`]),
    bon,
    pieges,
    ex
  );
}

function genQuoXsurX2() {
  const k = randomInt(1, 9);
  const V = `x^2 + ${k}`;
  if (Math.random() < 0.5) {
    const f = `\\dfrac{x}{${V}}`;
    const df = `\\dfrac{${k} - x^2}{(${V})^2}`;
    ctl({ f, df });
    return qcm(enonceDerivee(f), `$${df}$`, [`\\dfrac{x^2 - ${k}}{(${V})^2}`, `\\dfrac{3x^2 + ${k}}{(${V})^2}`, "\\dfrac{1}{2x}"].map((x) => `$${x}$`), expl(DEF_QUO, `$u = x$, $u' = 1$, $v = ${V}$, $v' = 2x$.`, `$u'v - uv' = ${V} - 2x^2 = ${k} - x^2$.`, `$f'(x) = ${df}$.`));
  }
  const m = randomChoice([1, 2, 3, 5, -2]);
  const f = frac(m, V);
  const df = `\\dfrac{${mono(-2 * m, 1)}}{(${V})^2}`;
  ctl({ f, df });
  return qcm(enonceDerivee(f), `$${df}$`, [`\\dfrac{${mono(2 * m, 1)}}{(${V})^2}`, `\\dfrac{${mono(-2 * m, 1)}}{${V}}`, frac(m, "2x")].map((x) => `$${x}$`), expl(DEF_QUO, `$f = ${n(m)} \\times \\dfrac{1}{v}$ avec $v = ${V}$ et $v' = 2x$.`, `$f'(x) = ${n(m)} \\times \\left(-\\dfrac{2x}{(${V})^2}\\right)$.`, `$f'(x) = ${df}$.`));
}

/* =========================================================
   DER_COMPOSEE_AFFINE — g(ax + b)
========================================================= */

const DEF_CA = "si $f(x) = g(ax + b)$, alors $f'(x) = a \\times g'(ax + b)$.";

function genCaDerivee(niv: number) {
  return () => {
    const t = niv <= 4 ? randomInt(1, 3) : randomInt(1, 4);
    let f = "", df = "", P: string[] = [], calc = "";
    if (t === 1) {
      const a = randomChoice([3, 4, 5, -2, -3, -4]);
      const L = lin(a, randomChoice([-5, -3, -1, 1, 2, 4, 7]));
      f = `(${L})^2`;
      df = `${n(2 * a)}(${L})`;
      P = [`2(${L})`, `${n(a)}(${L})`, `${n(2 * a)}(${L})^2`];
      calc = `$g(X) = X^2$, $g'(X) = 2X$, donc $f'(x) = ${n(a)} \\times 2(${L}) = ${df}$`;
    } else if (t === 2) {
      const a = randomInt(2, 6);
      const L = lin(a, randomChoice([-5, -3, -1, 1, 2, 4, 7]));
      f = `\\sqrt{${L}}`;
      df = a % 2 === 0 ? `\\dfrac{${a / 2}}{\\sqrt{${L}}}` : `\\dfrac{${a}}{2\\sqrt{${L}}}`;
      P = [`\\dfrac{1}{2\\sqrt{${L}}}`, `\\dfrac{${a}}{\\sqrt{${L}}}`, `\\dfrac{${a}}{2\\sqrt{x}}`];
      calc = `$g(X) = \\sqrt{X}$, $g'(X) = \\dfrac{1}{2\\sqrt{X}}$, donc $f'(x) = ${a} \\times \\dfrac{1}{2\\sqrt{${L}}} = ${df}$`;
    } else if (t === 3) {
      const a = randomChoice([2, 3, 4, 5, -2, -3]);
      const L = lin(a, randomChoice([-5, -3, -1, 1, 2, 4, 7]));
      f = `\\dfrac{1}{${L}}`;
      df = frac(-a, `(${L})^2`);
      P = [frac(a, `(${L})^2`), `-\\dfrac{1}{(${L})^2}`, frac(-a, L)];
      calc = `$g(X) = \\dfrac{1}{X}$, $g'(X) = -\\dfrac{1}{X^2}$, donc $f'(x) = ${n(a)} \\times \\left(-\\dfrac{1}{(${L})^2}\\right) = ${df}$`;
    } else {
      const p = randomInt(3, 5);
      const a = randomChoice([2, 3, -2, -3, 6].filter((x) => x !== p));
      const L = lin(a, randomChoice([-5, -3, -1, 1, 2, 4]));
      f = `(${L})^${p}`;
      df = `${n(p * a)}(${L})^${p - 1}`;
      P = [`${p}(${L})^${p - 1}`, `${n(p * a)}(${L})^${p}`, `${n(a)}(${L})^${p - 1}`];
      calc = `$g(X) = X^${p}$, $g'(X) = ${p}X^${p - 1}$, donc $f'(x) = ${n(a)} \\times ${p}(${L})^${p - 1} = ${df}$`;
    }
    ctl({ f, df });
    return qcm(
      randomChoice([enonceDerivee(f), `Avec la règle $\\big(g(ax + b)\\big)' = a\\,g'(ax + b)$, quelle est la dérivée de $f(x) = ${f}$ ?`]),
      `$${df}$`,
      P.map((x) => `$${x}$`),
      expl(DEF_CA, "on repère $g$ et le nombre $a$ devant $x$ dans la parenthèse.", `${calc}.`, `$f'(x) = ${df}$.`)
    );
  };
}

function genCaRegle() {
  const a = randomChoice([2, 3, 4, 5, 7, -2, -3, -5, 0.5]);
  const b = randomChoice([-6, -4, -1, 1, 3, 8]);
  const L = lin(a, b);
  const g = randomChoice([[`(${L})^2`, "X^2"], [`\\sqrt{${L}}`, "\\sqrt{X}"], [`\\dfrac{1}{${L}}`, "\\dfrac{1}{X}"], [`(${L})^3`, "X^3"], [`(${L})^4`, "X^4"]]);
  ctl({ rep: a });
  return court(
    randomChoice([
      `On écrit $f(x) = ${g[0]}$ sous la forme $g(${L})$, avec $g(X) = ${g[1]}$. Par quel nombre faut-il multiplier $g'(${L})$ pour obtenir $f'(x)$ ?`,
      `Pour dériver $f(x) = ${g[0]}$, on utilise $\\big(g(ax + b)\\big)' = a\\,g'(ax + b)$. Que vaut $a$ ici ?`,
      avecSituation(g[0], "On l’écrit $g(" + L + ")$ avec $g(X) = " + g[1] + "$. Quel facteur apparaît devant $g'(" + L + ")$ quand on dérive ?"),
      `${randomChoice(PRENOMS)} dérive $f(x) = ${g[0]}$ et oublie un facteur. Lequel ? Donne sa valeur.`,
    ]),
    a,
    expl(DEF_CA, "le facteur est le coefficient de $x$ dans la parenthèse.", `dans $${L}$, le coefficient de $x$ est $${n(a)}$.`, `on multiplie par $${n(a)}$.`)
  );
}

function genCaValeur(niv: number) {
  return () => {
    for (;;) {
      const t = niv <= 4 ? randomInt(1, 2) : randomInt(1, 4);
      const a = randomChoice([2, 3, 4, -2, -3, 5]);
      const x0 = randomInt(-3, 3);
      let f = "", val = 0, df = "";
      if (t === 1) {
        const b = randomInt(-5, 5);
        if (b === 0) continue;
        const L = lin(a, b);
        f = `(${L})^2`;
        df = `${n(2 * a)}(${L})`;
        val = 2 * a * (a * x0 + b);
      } else if (t === 2) {
        const s = randomChoice([1, 2, 4, 5, 10]);
        const b = s * (randomChoice([1, -1]) || 1) - a * x0;
        const den = a * x0 + b;
        if (b === 0 || den === 0) continue;
        const L = lin(a, b);
        f = `\\dfrac{1}{${L}}`;
        df = frac(-a, `(${L})^2`);
        val = -a / (den * den);
      } else if (t === 3) {
        const aa = Math.abs(a);
        const s = randomChoice([1, 4, 16, 25, 100]);
        const b = s - aa * x0;
        if (b === 0) continue;
        const L = lin(aa, b);
        f = `\\sqrt{${L}}`;
        df = `\\dfrac{${aa}}{2\\sqrt{${L}}}`;
        val = aa / (2 * Math.sqrt(s));
      } else {
        const b = randomInt(-3, 3);
        if (b === 0) continue;
        const L = lin(a, b);
        f = `(${L})^3`;
        df = `${n(3 * a)}(${L})^2`;
        val = 3 * a * (a * x0 + b) ** 2;
      }
      if (!exact(val) || Math.abs(val) > 2000) continue;
      ctl({ f, x0, val, rep: val, df });
      return court(enonceValeur(f, x0), val, expl(DEF_CA, "on dérive avec la règle, puis on remplace $x$.", `$f'(x) = ${df}$.`, `$f'(${x0}) = ${n(val)}$.`));
    }
  };
}

function genCaErreur() {
  const a = randomChoice([3, 4, 5, -2, -3]);
  const L = lin(a, randomChoice([-5, -3, -1, 1, 2, 4]));
  const types: Array<[string, string, string, string]> = [
    // [f, juste, faux, description]
    [`(${L})^2`, `${n(2 * a)}(${L})`, `2(${L})`, `il a oublié de multiplier par ${n(a)}`],
    [`(${L})^2`, `${n(2 * a)}(${L})`, `${n(2 * a)}(${L})^2`, "il n’a pas baissé l’exposant"],
    [`\\dfrac{1}{${L}}`, frac(-a, `(${L})^2`), frac(a, `(${L})^2`), "il a oublié le signe moins"],
    [`\\dfrac{1}{${L}}`, frac(-a, `(${L})^2`), `-\\dfrac{1}{(${L})^2}`, `il a oublié de multiplier par ${n(a)}`],
    [`(${L})^3`, `${n(3 * a)}(${L})^2`, `3(${L})^2`, `il a oublié de multiplier par ${n(a)}`],
    [`(${L})^3`, `${n(3 * a)}(${L})^2`, `${n(3 * a)}(${L})^3`, "il n’a pas baissé l’exposant"],
  ];
  const [f, juste, faux, desc] = randomChoice(types);
  ctl({ f, df: juste });
  const descs = [`il a oublié de multiplier par ${n(a)}`, "il a oublié le signe moins", "il n’a pas baissé l’exposant", "il n’a fait aucune erreur"];
  const prenom = randomChoice(["Nassim", "Tom", "Yanis", "Malo", "Hugo", "Enzo", "Rayan", "Lucas"]);
  const ex = expl(DEF_CA, "on dérive $g$, puis on multiplie par le coefficient de $x$.", `$f'(x) = ${juste}$ ; ${prenom} a écrit $${faux}$.`, `${desc}.`);
  if (Math.random() < 0.4) return qcm(`${prenom} dérive $f(x) = ${f}$ et trouve $${faux}$. Quel est le bon résultat ?`, `$${juste}$`, [`$${faux}$`, ...types.filter((x) => x[0] === f && x[2] !== faux).map((x) => `$${x[2]}$`), `$${n(a)}$`], ex);
  return qcm(
    randomChoice([`${prenom} dérive $f(x) = ${f}$ et trouve $${faux}$. Quelle est son erreur ?`, `Dans sa copie, ${prenom} écrit : « $(${f})' = ${faux}$ ». Qu’a-t-il mal fait ?`]),
    desc,
    descs.filter((d) => d !== desc),
    ex
  );
}

/* =========================================================
   DER_INTERPRETER — f'(a) en situation
========================================================= */

const DEF_INT = "$f'(a)$ est la vitesse de variation de $f$ en $a$ : le coefficient directeur de la tangente, et l’unité est « unité de $f$ par unité de la variable ».";

function genIntSens() {
  const c = randomChoice(CTX);
  const a = randomInt(2, 9);
  return qcm(
    randomChoice([
      `${c.sujet} note $${c.f}(${c.v})$ ${c.quoi}. Que représente $${c.f}'(${a})$ ?`,
      `On note $${c.f}(${c.v})$ ${c.quoi}. Comment interpréter le nombre dérivé $${c.f}'(${a})$ ?`,
      `${c.sujet} étudie $${c.f}(${c.v})$, ${c.quoi}. Dans cette situation, $${c.f}'(${a})$ est :`,
    ]),
    `${c.inst} pour $${c.v} = ${a}$`,
    [`${c.val} pour $${c.v} = ${a}$`, `${c.moy} entre $${c.v} = 0$ et $${c.v} = ${a}$`, `la plus grande valeur ${deLa(c.val)}`],
    expl(DEF_INT, "on distingue la valeur $f(a)$, la variation moyenne (taux) et la variation instantanée $f'(a)$.", `$${c.f}'(${a})$ mesure comment ${c.val} varie à l’instant (ou pour la valeur) $${c.v} = ${a}$.`, `c’est ${c.inst} pour $${c.v} = ${a}$, en ${c.unite}.`)
  );
}

function genIntUnite() {
  const c = randomChoice(CTX);
  return qcm(
    randomChoice([
      `${c.sujet} note $${c.f}(${c.v})$ ${c.quoi}. Quelle est l’unité de $${c.f}'(${c.v})$ ?`,
      `On note $${c.f}(${c.v})$ ${c.quoi}. En quelle unité s’exprime le nombre dérivé $${c.f}'(${randomInt(2, 9)})$ ?`,
      `${c.sujet} calcule $${c.f}'(${randomInt(2, 9)})$, où $${c.f}(${c.v})$ est ${c.quoi}. Quelle unité doit accompagner le résultat ?`,
    ]),
    c.unite,
    [c.uf, c.uv, c.inv],
    expl(DEF_INT, "l’unité d’un nombre dérivé est « unité de $f$ » par « unité de la variable ».", `$${c.f}$ est en ${c.uf} et $${c.v}$ en ${c.uv}.`, `$${c.f}'(${c.v})$ s’exprime en ${c.unite}.`)
  );
}

function genIntTangente() {
  const c = randomChoice(CTX);
  const a = randomInt(1, 9);
  const m = randomChoice([-6, -4, -2.5, -1, -0.5, 0.5, 1.5, 2, 3, 4, 8, 12]);
  ctl({ rep: m });
  return court(
    randomChoice([
      `${c.sujet} trace la courbe de $${c.f}$, où $${c.f}(${c.v})$ est ${c.quoi}. On sait que $${c.f}'(${a}) = ${n(m)}$. Quel est le coefficient directeur de la tangente au point d’abscisse $${a}$ ?`,
      `On sait que $f'(${a}) = ${n(m)}$. Quelle est la pente de la tangente à la courbe de $f$ au point d’abscisse $${a}$ ?`,
      `${randomChoice(SITUATIONS)[0]} lit dans un rapport : « $f'(${a}) = ${n(m)}$ ». Quel est le coefficient directeur de la tangente à la courbe de $f$ en $${a}$ ?`,
    ]),
    m,
    expl(DEF_INT, "le coefficient directeur de la tangente au point d’abscisse $a$ est $f'(a)$.", `ici $f'(${a}) = ${n(m)}$.`, `la pente de la tangente vaut ${n(m)}.`)
  );
}

function genIntSigne(niv: number) {
  return () => {
    const c = randomChoice(CTX);
    const a = randomInt(1, 9);
    const m = niv >= 5 && Math.random() < 0.3 ? 0 : randomChoice([-12, -5, -3, -2, -0.5, 0.5, 1.5, 2, 4, 6, 15]);
    const ici = `pour $${c.v} = ${a}$`;
    const bon = m > 0 ? `${c.val} augmente autour de $${c.v} = ${a}$` : m < 0 ? `${c.val} diminue autour de $${c.v} = ${a}$` : `la tangente est horizontale ${ici} : ${c.val} ne varie presque plus`;
    const pieges = m === 0
      ? [`${c.val} est ${fem(c.val) ? "nulle" : "nul"} ${ici}`, `${c.val} augmente fortement autour de $${c.v} = ${a}$`, `${c.val} diminue fortement autour de $${c.v} = ${a}$`]
      : [m > 0 ? `${c.val} diminue autour de $${c.v} = ${a}$` : `${c.val} augmente autour de $${c.v} = ${a}$`, `${c.val} vaut $${n(m)}$ ${c.uf} ${ici}`, `${c.val} est ${fem(c.val) ? "maximale" : "maximal"} ${ici}`];
    return qcm(
      randomChoice([
        `${c.sujet} note $${c.f}(${c.v})$ ${c.quoi}. On calcule $${c.f}'(${a}) = ${n(m)}$. Que peut-on en déduire ?`,
        `On note $${c.f}(${c.v})$ ${c.quoi}, et l’on sait que $${c.f}'(${a}) = ${n(m)}$. Quelle phrase est juste ?`,
        `${c.sujet} obtient $${c.f}'(${a}) = ${n(m)}$, où $${c.f}(${c.v})$ est ${c.quoi}. Comment l’interpréter ?`,
      ]),
      bon,
      pieges,
      expl(DEF_INT, "le signe de $f'(a)$ indique si $f$ augmente ($f'(a) > 0$) ou diminue ($f'(a) < 0$) au voisinage de $a$.", `$${c.f}'(${a}) = ${n(m)}${m > 0 ? " > 0" : m < 0 ? " < 0" : ""}$ ; attention, $${c.f}'(${a})$ n’est pas la valeur $${c.f}(${a})$.`, `${bon}.`)
    );
  };
}

function genIntPhrase() {
  const c = randomChoice(CTX);
  const a = randomInt(2, 9);
  const m = randomChoice([-4, -2, -1.5, 0.5, 1.5, 2, 3, 5, 12].filter((x) => x !== a));
  return qcm(
    randomChoice([
      `${c.sujet} note $${c.f}(${c.v})$ ${c.quoi}. Que signifie $${c.f}'(${a}) = ${n(m)}$ ?`,
      `On note $${c.f}(${c.v})$ ${c.quoi}. Quelle phrase traduit $${c.f}'(${a}) = ${n(m)}$ ?`,
      `${c.sujet} écrit $${c.f}'(${a}) = ${n(m)}$, avec $${c.f}(${c.v})$ ${c.quoi}. Comment le dire avec des mots ?`,
    ]),
    `${c.inst} vaut $${n(m)}$ ${c.unite} pour $${c.v} = ${a}$`,
    [`${c.val} vaut $${n(m)}$ ${c.uf} pour $${c.v} = ${a}$`, `${c.moy} vaut $${n(m)}$ ${c.unite} entre $${c.v} = 0$ et $${c.v} = ${a}$`, `${c.inst} vaut $${a}$ ${c.unite} pour $${c.v} = ${n(m)}$`],
    expl(DEF_INT, "on traduit : nombre dérivé = variation instantanée, avec son unité.", `$${c.f}'(${a}) = ${n(m)}$ : la variation instantanée pour $${c.v} = ${a}$ vaut ${n(m)} ${c.unite}.`, `${c.inst} vaut ${n(m)} ${c.unite} pour $${c.v} = ${a}$.`)
  );
}

function genIntApprox() {
  const c = randomChoice(CTX);
  const a = randomInt(2, 8);
  const F = randomInt(10, 90);
  const m = randomChoice([-4, -3, -2, -1.5, -0.5, 0.5, 1.5, 2, 3, 5, 6]);
  const h = randomChoice([1, 0.5, 2, 0.1, 0.2]);
  const val = F + h * m;
  ctl({ rep: val });
  return court(
    randomChoice([
      `${c.sujet} note $${c.f}(${c.v})$ ${c.quoi}. On sait que $${c.f}(${a}) = ${F}$ et $${c.f}'(${a}) = ${n(m)}$. Estime $${c.f}(${n(a + h)})$ à l’aide de la tangente.`,
      `On note $${c.f}(${c.v})$ ${c.quoi}, avec $${c.f}(${a}) = ${F}$ et $${c.f}'(${a}) = ${n(m)}$. Donne une valeur approchée de $${c.f}(${n(a + h)})$.`,
      `Pour ${c.sujet.charAt(0).toLowerCase() + c.sujet.slice(1)}, $${c.f}(${c.v})$ est ${c.quoi}, avec $${c.f}(${a}) = ${F}$ et $${c.f}'(${a}) = ${n(m)}$. Utilise $f(a + h) \\approx f(a) + h\\,f'(a)$ pour estimer $${c.f}(${n(a + h)})$.`,
    ]),
    val,
    expl(DEF_INT, "près de $a$, la courbe est proche de sa tangente : $f(a + h) \\approx f(a) + h \\times f'(a)$.", `$${c.f}(${n(a + h)}) \\approx ${F} + ${n(h)} \\times ${par(m)} = ${n(val)}$.`, `on estime $${c.f}(${n(a + h)}) \\approx ${n(val)}$ ${c.uf}.`)
  );
}

function genIntComparer() {
  const c = randomChoice(CTX);
  const ts = shuffle([1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 3).sort((x, y) => x - y);
  const hausse = Math.random() < 0.5;
  const ms = shuffle(hausse ? [5, 2, -1, 0.5, 3, -2] : [-5, -2, 1, -0.5, -3, 2]).slice(0, 3);
  const cible = hausse ? Math.max(...ms) : Math.min(...ms);
  if (hausse ? cible <= 0 : cible >= 0) return genIntApprox();
  const rep = ts[ms.indexOf(cible)];
  ctl({ rep });
  const liste = ts.map((t, i) => `$${c.f}'(${t}) = ${n(ms[i])}$`).join(", ");
  return court(
    randomChoice([
      `${c.sujet} note $${c.f}(${c.v})$ ${c.quoi}. On a ${liste}. Pour quelle valeur de $${c.v}$ la ${hausse ? "hausse" : "baisse"} ${deLa(c.val)} est-elle la plus rapide ?`,
      `On note $${c.f}(${c.v})$ ${c.quoi}, et ${liste}. Parmi ces trois valeurs de $${c.v}$, laquelle correspond à la ${hausse ? "hausse" : "baisse"} la plus rapide ?`,
    ]),
    rep,
    expl(DEF_INT, "plus $f'(a)$ est grand (en positif), plus la hausse est rapide ; plus il est petit (en négatif), plus la baisse est rapide.", `on compare ${ms.map((x) => n(x)).join(", ")}.`, `c’est pour $${c.v} = ${rep}$.`)
  );
}

/* =========================================================
   DER_TANGENTE — équation y = f'(a)(x − a) + f(a)
========================================================= */

const DEF_TAN = "la tangente au point d’abscisse $a$ a pour équation $y = f'(a)(x - a) + f(a)$ : elle passe par $(a\\,;f(a))$ et a pour coefficient directeur $f'(a)$.";

function genTanLireEquation(niv: number) {
  return () => {
    const a = randomChoice([-3, -2, -1, 1, 2, 3, 4, 5]);
    const m = randomChoice([-5, -4, -3, -2, -1, 0.5, 1, 2, 3, 4, 6]);
    const p = randomChoice([-7, -5, -3, -1, 1, 2, 4, 6, 8]);
    const eq = `y = ${lin(m, p)}`;
    const F = m * a + p;
    const demandeF = niv >= 3;
    const rep = demandeF ? F : m;
    ctl({ rep });
    const [qui, quoi] = randomChoice(SITUATIONS);
    const Q = demandeF ? `Que vaut $f(${a})$ ?` : `Que vaut $f'(${a})$ ?`;
    return court(
      randomChoice([
        `La tangente à la courbe de $f$ au point d’abscisse $${a}$ a pour équation $${eq}$. ${Q}`,
        `${qui} modélise ${quoi} par une fonction $f$. Sa tangente au point d’abscisse $${a}$ a pour équation $${eq}$. ${Q}`,
        `On sait que la droite d’équation $${eq}$ est tangente à la courbe de $f$ en son point d’abscisse $${a}$. ${Q}`,
        `${randomChoice(PRENOMS)} a trouvé que la tangente en $${a}$ à la courbe de $f$ est $${eq}$. ${Q}`,
      ]),
      rep,
      expl(DEF_TAN, demandeF ? "le point de contact est sur la tangente : on remplace $x$ par $a$ dans son équation." : "$f'(a)$ est le coefficient directeur de la tangente (le nombre devant $x$).", demandeF ? `$y = ${n(m)} \\times ${par(a)} + ${par(p)} = ${n(F)}$.` : `le coefficient de $x$ dans $${eq}$ est $${n(m)}$.`, demandeF ? `$f(${a}) = ${n(F)}$.` : `$f'(${a}) = ${n(m)}$.`)
    );
  };
}

function genTanHorizontale() {
  const a = randomInt(-3, 5);
  const m = Math.random() < 0.34 ? 0 : randomChoice([-4, -2, -1, -0.5, 0.5, 1, 3, 5]);
  const etats = ["horizontale", "montante (de gauche à droite)", "descendante (de gauche à droite)", "verticale"];
  const bon = m === 0 ? etats[0] : m > 0 ? etats[1] : etats[2];
  const c = randomChoice(CTX);
  return qcm(
    randomChoice([
      `On sait que $f'(${a}) = ${n(m)}$. La tangente à la courbe de $f$ au point d’abscisse $${a}$ est :`,
      `${c.sujet} trace la courbe de $${c.f}$ (${c.quoi}). On sait que $${c.f}'(${a}) = ${n(m)}$. La tangente au point d’abscisse $${a}$ est :`,
      `Une fonction vérifie $f'(${a}) = ${n(m)}$. Comment est sa tangente au point d’abscisse $${a}$ ?`,
      `${randomChoice(PRENOMS)} lit $f'(${a}) = ${n(m)}$ dans un tableau. Quelle est l’allure de la tangente en $${a}$ ?`,
      `${c.sujet} note $${c.f}(${c.v})$ ${c.quoi}, et obtient $${c.f}'(${a}) = ${n(m)}$. Sur la courbe, la tangente au point d’abscisse $${a}$ est :`,
      `${randomChoice(SITUATIONS)[0]} sait que le nombre dérivé de $f$ en $${a}$ vaut $${n(m)}$. Comment est la tangente à la courbe en ce point ?`,
    ]),
    bon,
    etats.filter((e) => e !== bon),
    expl(DEF_TAN, "le signe de $f'(a)$ donne l’inclinaison de la tangente.", `$f'(${a}) = ${n(m)}${m > 0 ? " > 0" : m < 0 ? " < 0" : ""}$.`, `la tangente est ${bon}.`)
  );
}

function genTanDonnees() {
  for (;;) {
    const a = randomInt(-3, 5);
    const F = randomInt(-6, 8);
    const m = randomChoice([-4, -3, -2, -1, 1, 2, 3, 5]);
    if (new Set([a, F, m]).size < 3) continue;
    const pt = (x: number, y: number) => `$(${n(x)}\\,;${n(y)})$`;
    const [qui, quoi] = randomChoice(SITUATIONS);
    return qcm(
      randomChoice([
        `On sait que $f(${a}) = ${F}$ et $f'(${a}) = ${m}$. Par quel point passe la tangente à la courbe de $f$ au point d’abscisse $${a}$ ?`,
        `${qui} modélise ${quoi} par $f$, avec $f(${a}) = ${F}$ et $f'(${a}) = ${m}$. Quel est le point de contact de la tangente en $${a}$ ?`,
        `Pour une fonction $f$, $f(${a}) = ${F}$ et $f'(${a}) = ${m}$. Quel point appartient à la fois à la courbe et à la tangente en $${a}$ ?`,
        `${randomChoice(PRENOMS)} veut tracer la tangente en $${a}$ sachant que $f(${a}) = ${F}$ et $f'(${a}) = ${m}$. De quel point doit-on partir ?`,
        `${randomChoice(CTX).sujet} étudie une fonction $f$ avec $f(${a}) = ${F}$ et $f'(${a}) = ${m}$. Où la tangente en $${a}$ touche-t-elle la courbe ?`,
      ]),
      pt(a, F),
      [pt(a, m), pt(F, a), pt(m, F)],
      expl(DEF_TAN, "le point de contact a pour coordonnées $(a\\,;f(a))$ ; $f'(a)$ est la pente, pas une coordonnée.", `$a = ${a}$ et $f(${a}) = ${F}$.`, `la tangente passe par ${pt(a, F)}.`)
    );
  }
}

/** Fonction pour la pente d'une tangente. */
function fonctionPente(niv: number) {
  const t = niv <= 3 ? randomInt(1, 3) : randomInt(3, 6);
  if (t <= 2) {
    const P = polyOp(t === 1 ? 3 : 4);
    const dd = deriverTermes(P.termes);
    return { f: P.f, d: (x: number) => dd.reduce((s, [c, p]) => s + c * x ** p, 0), pts: [-3, -2, -1, 1, 2, 3] };
  }
  if (t === 3) {
    const b = randomChoice([-3, -2, 1, 2, 4]);
    return { f: poly([[1, 3], [b, 1]]), d: (x: number) => 3 * x * x + b, pts: [-2, -1, 1, 2, 3] };
  }
  if (t === 4) {
    const k = randomChoice([1, 2, 4, -3]);
    return { f: k === 1 ? "\\dfrac{1}{x}" : frac(k, "x"), d: (x: number) => -k / (x * x), pts: [1, 2, -1, -2, 0.5] };
  }
  if (t === 5) {
    const k = randomChoice([1, 2, 6, 4]);
    return { f: k === 1 ? "\\sqrt{x}" : `${k}\\sqrt{x}`, d: (x: number) => k / (2 * Math.sqrt(x)), pts: [1, 4, 16, 25] };
  }
  const k = randomChoice([1, 2, -1]);
  const b = randomInt(-4, 4);
  return { f: `${poly([[k, 2], [b, 1]])} + \\dfrac{1}{x}`, d: (x: number) => 2 * k * x + b - 1 / (x * x), pts: [1, -1, 2, 0.5] };
}

function genTanPente(niv: number) {
  return () => {
    for (;;) {
      const P = fonctionPente(niv);
      const a = randomChoice(P.pts);
      const val = P.d(a);
      if (!exact(val)) continue;
      ctl({ f: P.f, x0: a, val, rep: val });
      return court(
        randomChoice([
          `Soit $f(x) = ${P.f}$. Quelle est la pente de la tangente à sa courbe au point d’abscisse $${n(a)}$ ?`,
          `Quel est le coefficient directeur de la tangente à la courbe de $f(x) = ${P.f}$ au point d’abscisse $${n(a)}$ ?`,
          avecSituation(P.f, `Quelle est la pente de la tangente à la courbe au point d’abscisse $${n(a)}$ ?`),
          `${randomChoice(PRENOMS)} veut tracer la tangente à la courbe de $f(x) = ${P.f}$ en $${n(a)}$. Quel coefficient directeur doit-on utiliser ?`,
        ]),
        val,
        expl(DEF_TAN, "la pente de la tangente en $a$ est $f'(a)$ : on dérive, puis on remplace $x$ par $a$.", `on calcule $f'(x)$, puis $f'(${n(a)}) = ${n(val)}$.`, `la pente vaut ${n(val)}.`)
      );
    }
  };
}

function genTanHorizAbscisse(niv: number) {
  return () => {
    if (niv >= 5 && Math.random() < 0.5) {
      const m = randomInt(1, 4);
      const c = randomInt(-5, 5);
      const f = poly([[1, 3], [-3 * m * m, 1], [c, 0]]);
      ctl({ f, x0: m, val: 0, rep: m });
      return court(
        randomChoice([`Soit $f(x) = ${f}$. En quelle abscisse positive la tangente est-elle horizontale ?`, avecSituation(f, "En quelle abscisse positive la tangente à la courbe est-elle horizontale ?")]),
        m,
        expl(DEF_TAN, "tangente horizontale ⟺ $f'(a) = 0$.", `$f'(x) = 3x^2 - ${3 * m * m}$ s’annule pour $x^2 = ${m * m}$, soit $x = ${m}$ ou $x = -${m}$.`, `l’abscisse positive est ${m}.`)
      );
    }
    const k = randomChoice(niv >= 5 ? [2, -2, 4, 0.5] : [1, -1, 2, -2, 3]);
    const xs = niv >= 5 ? randomChoice([-2.5, -1.5, -0.5, 0.5, 1.5, 3, -3]) : randomChoice([-4, -3, -2, -1, 1, 2, 3, 4]);
    const b = -2 * k * xs;
    if (!exact(b) || !Number.isInteger(b)) return genTanPente(niv)();
    const c = randomInt(-6, 6);
    const f = poly([[k, 2], [b, 1], [c, 0]]);
    ctl({ f, x0: xs, val: 0, rep: xs });
    return court(
      randomChoice([
        `Soit $f(x) = ${f}$. En quelle abscisse la tangente à sa courbe est-elle horizontale ?`,
        avecSituation(f, "En quelle abscisse la tangente à la courbe est-elle horizontale ?"),
        `Pour $f(x) = ${f}$, résous $f'(x) = 0$ : en quelle abscisse la tangente est-elle horizontale ?`,
        `${randomChoice(PRENOMS)} cherche le sommet de la courbe de $f(x) = ${f}$, là où la tangente est horizontale. Quelle est son abscisse ?`,
      ]),
      xs,
      expl(DEF_TAN, "tangente horizontale ⟺ $f'(a) = 0$.", `$f'(x) = ${poly([[2 * k, 1], [b, 0]])} = 0$ donne $x = ${n(xs)}$.`, `la tangente est horizontale en $x = ${n(xs)}$.`)
    );
  };
}

function piegesTangente(m: number, F: number, a: number) {
  return [`y = ${lin(m, F)}`, `y = ${lin(F, m)}`, `y = ${lin(m, F + m * a)}`].map((x) => `$${x}$`);
}

function genTanEquation() {
  for (;;) {
    const a = randomChoice([-3, -2, -1, 1, 2, 3, 4]);
    const F = randomInt(-6, 8);
    const m = randomChoice([-4, -3, -2, -1, 1, 2, 3, 5]);
    if (F === m || F === 0) continue;
    const eq = `y = ${lin(m, F - m * a)}`;
    ctl({ tan: { a, F, m, eq: lin(m, F - m * a) } });
    const [qui, quoi] = randomChoice(SITUATIONS);
    return qcm(
      randomChoice([
        `Une fonction $f$ vérifie $f(${a}) = ${F}$ et $f'(${a}) = ${m}$. Quelle est l’équation réduite de la tangente au point d’abscisse $${a}$ ?`,
        `${qui} modélise ${quoi} par $f$, avec $f(${a}) = ${F}$ et $f'(${a}) = ${m}$. Quelle est l’équation de la tangente en $${a}$ ?`,
        `On sait que $f(${a}) = ${F}$ et $f'(${a}) = ${m}$. Écris la tangente en $${a}$ sous la forme $y = mx + p$. On obtient :`,
        `${randomChoice(PRENOMS)} applique $y = f'(a)(x - a) + f(a)$ avec $a = ${a}$, $f(${a}) = ${F}$ et $f'(${a}) = ${m}$. Quel est le résultat ?`,
      ]),
      `$${eq}$`,
      piegesTangente(m, F, a),
      expl(DEF_TAN, "on remplace dans $y = f'(a)(x - a) + f(a)$, puis on développe.", `$y = ${m}(${xPlus(-a)}) + ${par(F)}$.`, `$${eq}$.`)
    );
  }
}

function genTanEquationPoly(niv: number) {
  return () => {
    for (;;) {
      let f = "", Ff: (x: number) => number, d: (x: number) => number;
      let a = randomChoice([-2, -1, 1, 2, 3]);
      const t = niv <= 4 ? 1 : randomInt(1, 4);
      if (t === 1) {
        const k = randomChoice([1, -1, 2, 3, -2]);
        const b = randomInt(-5, 5);
        const c = randomInt(-6, 6);
        f = poly([[k, 2], [b, 1], [c, 0]]);
        Ff = (x) => k * x * x + b * x + c;
        d = (x) => 2 * k * x + b;
      } else if (t === 2) {
        const b = randomChoice([-3, -2, 1, 2]);
        const c = randomInt(-4, 4);
        f = poly([[1, 3], [b, 1], [c, 0]]);
        Ff = (x) => x ** 3 + b * x + c;
        d = (x) => 3 * x * x + b;
      } else if (t === 3) {
        a = randomChoice([1, 2, -1, -2]);
        f = "\\dfrac{1}{x}";
        Ff = (x) => 1 / x;
        d = (x) => -1 / (x * x);
      } else {
        a = randomChoice([1, 4, 16]);
        f = "\\sqrt{x}";
        Ff = (x) => Math.sqrt(x);
        d = (x) => 1 / (2 * Math.sqrt(x));
      }
      const F = Ff(a);
      const m = d(a);
      const p = F - m * a;
      if (!exact(m) || !exact(p) || m === 0 || F === m || F === 0) continue;
      const eq = `y = ${lin(m, p)}`;
      ctl({ f, tan: { a, eq: lin(m, p) } });
      return qcm(
        randomChoice([
          `Soit $f(x) = ${f}$. Quelle est l’équation réduite de la tangente à sa courbe au point d’abscisse $${n(a)}$ ?`,
          avecSituation(f, `Quelle est l’équation de la tangente à la courbe au point d’abscisse $${n(a)}$ ?`),
          `Détermine la tangente à la courbe de $f(x) = ${f}$ en $${n(a)}$, sous la forme $y = mx + p$.`,
        ]),
        `$${eq}$`,
        piegesTangente(m, F, a),
        expl(DEF_TAN, "on calcule $f(a)$ et $f'(a)$, puis on remplace dans $y = f'(a)(x - a) + f(a)$.", `$f(${n(a)}) = ${n(F)}$ et $f'(${n(a)}) = ${n(m)}$, donc $y = ${n(m)}(${xPlus(-a)}) + ${par(F)}$.`, `$${eq}$.`)
      );
    }
  };
}

function genTanOrdonnee() {
  for (;;) {
    const useF = Math.random() < 0.5;
    const a = randomChoice([-3, -2, -1, 1, 2, 3]);
    let F: number, m: number, f = "";
    if (useF) {
      const k = randomChoice([1, -1, 2]);
      const b = randomInt(-4, 4);
      const c = randomInt(-5, 5);
      f = poly([[k, 2], [b, 1], [c, 0]]);
      F = k * a * a + b * a + c;
      m = 2 * k * a + b;
    } else {
      F = randomInt(-6, 8);
      m = randomChoice([-4, -3, -2, -1, 1, 2, 3, 5]);
    }
    if (m === 0) continue;
    const p = F - m * a;
    ctl(useF ? { f, tan: { a, eq: lin(m, p) }, rep: p } : { rep: p });
    return court(
      useF
        ? randomChoice([`Soit $f(x) = ${f}$. Quelle est l’ordonnée à l’origine de la tangente à sa courbe au point d’abscisse $${a}$ ?`, avecSituation(f, `Quelle est l’ordonnée à l’origine de la tangente au point d’abscisse $${a}$ ?`)])
        : randomChoice([`On sait que $f(${a}) = ${F}$ et $f'(${a}) = ${m}$. Quelle est l’ordonnée à l’origine de la tangente au point d’abscisse $${a}$ ?`, `${randomChoice(SITUATIONS)[0]} connaît $f(${a}) = ${F}$ et $f'(${a}) = ${m}$. En quel point (ordonnée) la tangente en $${a}$ coupe-t-elle l’axe des ordonnées ?`]),
      p,
      expl(DEF_TAN, "on développe $y = f'(a)(x - a) + f(a)$ : l’ordonnée à l’origine est $f(a) - a\\,f'(a)$.", `$f(${a}) = ${F}$, $f'(${a}) = ${m}$, donc $p = ${F} - ${par(a)} \\times ${par(m)} = ${n(p)}$.`, `l’ordonnée à l’origine vaut ${n(p)}.`)
    );
  }
}

function genTanParallele() {
  for (;;) {
    const k = randomChoice([1, -1, 2, -2, 0.5]);
    const xs = randomChoice([-3, -2, -1, 1, 2, 3, 4]);
    const b = randomInt(-4, 4);
    const c = randomInt(-5, 5);
    const m = 2 * k * xs + b;
    const p = randomChoice([-3, 1, 5, 7]);
    if (!Number.isInteger(m) || m === 0) continue;
    const f = poly([[k, 2], [b, 1], [c, 0]]);
    ctl({ f, x0: xs, val: m, rep: xs });
    return court(
      randomChoice([
        `Soit $f(x) = ${f}$. En quelle abscisse la tangente à sa courbe est-elle parallèle à la droite d’équation $y = ${lin(m, p)}$ ?`,
        avecSituation(f, `En quel point la tangente est-elle parallèle à la droite $y = ${lin(m, p)}$ ? Donne son abscisse.`),
        `On cherche le point de la courbe de $f(x) = ${f}$ où la tangente a la même pente que la droite $y = ${lin(m, p)}$. Quelle est son abscisse ?`,
      ]),
      xs,
      expl(DEF_TAN, "deux droites parallèles ont le même coefficient directeur : on résout $f'(x) = m$.", `$f'(x) = ${poly([[2 * k, 1], [b, 0]])} = ${m}$ donne $x = ${n(xs)}$.`, `l’abscisse cherchée est ${n(xs)}.`)
    );
  }
}

/* =========================================================
   DER_GRAPHIQUE — lire f'(a) sur un graphique
========================================================= */

const DEF_GRA = "sur un graphique, $f'(a)$ est le coefficient directeur de la tangente au point d’abscisse $a$ : on avance de 1 vers la droite et on compte de combien on monte (ou descend).";

function tirerTangenteLisible(niv: number) {
  for (;;) {
    const al = niv <= 3 ? randomChoice([1, -1]) : niv === 4 ? randomChoice([1, -1, 0.5, -0.5]) : randomChoice([0.25, -0.25, 0.5, -0.5]);
    const a = randomInt(-3, 3);
    const be = randomInt(-3, 3);
    const ga = randomInt(-3, 3);
    const m = 2 * al * a + be;
    const fa = al * a * a + be * a + ga;
    const maxM = niv <= 3 ? 3 : 4;
    if (Math.abs(m) > maxM || m === 0 || !Number.isInteger(fa)) continue;
    if (niv <= 4 && !Number.isInteger(m)) continue;
    if (niv >= 5 && Number.isInteger(m) && Math.random() < 0.7) continue;
    return { al, a, be, ga, m, fa };
  }
}

function genGraLirePente(niv: number) {
  return () => {
    const T = tirerTangenteLisible(niv);
    const { canvas } = figTangente(T.al, T.be, T.ga, T.a);
    ctl({ f: poly([[T.al, 2], [T.be, 1], [T.ga, 0]]), x0: T.a, val: T.m, rep: T.m });
    const [qui, quoi] = randomChoice(SITUATIONS);
    return court(
      randomChoice([
        `Sur la figure, la droite rouge est la tangente à la courbe de $f$ au point A d’abscisse $${T.a}$. Lis $f'(${T.a})$.`,
        `Lis graphiquement le coefficient directeur de la tangente en A. Que vaut $f'(${T.a})$ ?`,
        `${qui} représente ${quoi} par la courbe bleue ; la droite rouge est sa tangente en A. Que vaut $f'(${T.a})$ ?`,
        `D’après le graphique, combien vaut le nombre dérivé de $f$ en $${T.a}$ ?`,
        `${randomChoice(PRENOMS)} a tracé la tangente en A (en rouge). Quelle valeur de $f'(${T.a})$ peut-on lire ?`,
      ]),
      T.m,
      expl(DEF_GRA, "on part de A et on suit la droite rouge : on avance de 1 (ou de 2, puis on divise).", `en avançant de 1, la tangente ${T.m > 0 ? "monte" : "descend"} de $${n(Math.abs(T.m))}$.`, `$f'(${T.a}) = ${n(T.m)}$.`),
      canvas
    );
  };
}

function genGraSigne() {
  const al = randomChoice([1, -1, 0.5, -0.5]);
  const h = randomInt(-2, 2);
  const k = randomInt(-2, 2);
  const d = randomChoice([-2, -1, 0, 1, 2]);
  const a = h + d;
  const be = -2 * al * h;
  const ga = al * h * h + k;
  const { canvas, m } = figTangente(al, be, ga, a);
  const bon = m > 0 ? "positif" : m < 0 ? "négatif" : "nul";
  const [qui, quoi] = randomChoice(SITUATIONS);
  return qcm(
    randomChoice([
      `Sur la figure, A est le point de la courbe de $f$ d’abscisse $${a}$, et la droite rouge est la tangente en A. Le nombre $f'(${a})$ est :`,
      `D’après le graphique, quel est le signe de $f'(${a})$ ?`,
      `${qui} représente ${quoi} par la courbe bleue. En A (abscisse $${a}$), le nombre dérivé est :`,
      `Regarde la tangente rouge en A. Le nombre dérivé $f'(${a})$ est :`,
    ]),
    bon,
    ["positif", "négatif", "nul", "impossible à connaître sans la formule"].filter((x) => x !== bon),
    expl(DEF_GRA, "le signe de $f'(a)$ se lit sur l’inclinaison de la tangente.", m > 0 ? "la tangente monte." : m < 0 ? "la tangente descend." : "la tangente est horizontale.", `$f'(${a})$ est ${bon}.`),
    canvas
  );
}

function genGraSommet(niv: number) {
  return () => {
    const al = randomChoice(niv >= 5 ? [0.5, -0.5, 1, -1] : [1, -1]);
    const h = randomInt(-3, 3);
    const k = randomInt(-3, 3);
    const be = -2 * al * h;
    const ga = al * h * h + k;
    const canvas = figure({ xmin: h - 4, xmax: h + 4, ymin: al > 0 ? k - 2 : k - 6, ymax: al > 0 ? k + 6 : k + 2, quad: [al, be, ga] });
    ctl({ f: poly([[al, 2], [be, 1], [ga, 0]]), x0: h, val: 0, rep: h });
    return court(
      randomChoice([
        "Voici la courbe d’une fonction $f$. En quelle abscisse a-t-on $f'(x) = 0$ ?",
        "Sur ce graphique, en quelle abscisse la tangente à la courbe est-elle horizontale ?",
        `${randomChoice(SITUATIONS)[0]} trace la courbe ci-dessous. Pour quelle valeur de $x$ le nombre dérivé est-il nul ?`,
        "Lis sur le graphique l’abscisse du point où la pente de la courbe est nulle.",
      ]),
      h,
      expl(DEF_GRA, "$f'(a) = 0$ quand la tangente est horizontale : au sommet de la courbe.", `le sommet de la courbe a pour abscisse $${h}$.`, `$f'(${h}) = 0$.`),
      canvas
    );
  };
}

function genGraDeuxPoints(niv: number) {
  return () => {
    for (;;) {
      const a = randomInt(-2, 4);
      const x1 = randomInt(-3, 2);
      const x2 = x1 + randomChoice(niv >= 5 ? [2, 4, 5] : [1, 2, 3, 4]);
      const m = niv >= 5 ? randomChoice([-1.5, -0.5, 0.5, 1.5, 2.5, -2.5, 0.25]) : randomChoice([-3, -2, -1, 1, 2, 3, 4]);
      const y1 = randomInt(-4, 4);
      const y2 = y1 + m * (x2 - x1);
      if (!exact(y2)) continue;
      ctl({ rep: m });
      const pt = (x: number, y: number) => `$(${n(x)}\\,;${n(y)})$`;
      return court(
        randomChoice([
          `La tangente à la courbe de $f$ au point d’abscisse $${a}$ passe par les points ${pt(x1, y1)} et ${pt(x2, y2)}. Combien vaut $f'(${a})$ ?`,
          `${randomChoice(SITUATIONS)[0]} lit sur un graphique que la tangente en $${a}$ passe par ${pt(x1, y1)} et ${pt(x2, y2)}. Que vaut le nombre dérivé $f'(${a})$ ?`,
          `Sur un graphique, la tangente à la courbe de $f$ en $${a}$ contient les points ${pt(x1, y1)} et ${pt(x2, y2)}. Quel est son coefficient directeur ?`,
          `${randomChoice(SITUATIONS)[0]} modélise ${randomChoice(SITUATIONS)[1]} par une fonction $f$. Sur sa courbe, la tangente au point d’abscisse $${a}$ passe par ${pt(x1, y1)} et ${pt(x2, y2)}. Que vaut $f'(${a})$ ?`,
          `${randomChoice(PRENOMS)} a tracé la tangente à la courbe de $f$ en $${a}$ : elle passe par ${pt(x1, y1)} et ${pt(x2, y2)}. Quel nombre dérivé $f'(${a})$ en déduit-on ?`,
          `Les points ${pt(x1, y1)} et ${pt(x2, y2)} sont sur la tangente à la courbe de $f$ au point d’abscisse $${a}$. Calcule $f'(${a})$.`,
        ]),
        m,
        expl(DEF_GRA, "$f'(a)$ est le coefficient directeur de la tangente : $\\dfrac{y_2 - y_1}{x_2 - x_1}$.", `$\\dfrac{${n(y2)} - ${par(y1)}}{${x2} - ${par(x1)}} = \\dfrac{${n(y2 - y1)}}{${x2 - x1}} = ${n(m)}$.`, `$f'(${a}) = ${n(m)}$.`)
      );
    }
  };
}

function genGraEquation() {
  for (;;) {
    const T = tirerTangenteLisible(3);
    if (T.fa === T.m || T.fa === 0 || T.a === 0) continue;
    const { canvas } = figTangente(T.al, T.be, T.ga, T.a);
    const p = T.fa - T.m * T.a;
    const eq = `y = ${lin(T.m, p)}`;
    ctl({ f: poly([[T.al, 2], [T.be, 1], [T.ga, 0]]), tan: { a: T.a, eq: lin(T.m, p) } });
    return qcm(
      randomChoice([
        "Sur la figure, la droite rouge est la tangente à la courbe de $f$ au point A. Lis les coordonnées de A et la pente, puis choisis l’équation de la tangente.",
        "Quelle est l’équation réduite de la tangente tracée en rouge ?",
        `${randomChoice(SITUATIONS)[0]} a tracé la tangente en A (en rouge). Quelle est son équation ?`,
        "D’après le graphique, quelle équation correspond à la tangente en A ?",
        `${randomChoice(SITUATIONS)[0]} représente ${randomChoice(SITUATIONS)[1]} par la courbe bleue. Quelle est l’équation de la tangente rouge en A ?`,
        `${randomChoice(PRENOMS)} lit A et la pente de la droite rouge sur le quadrillage. Quelle équation doit-on trouver pour cette tangente ?`,
        "La droite rouge touche la courbe en A. Lis $f(a)$ et $f'(a)$ en A, puis donne l’équation réduite de cette tangente.",
      ]),
      `$${eq}$`,
      piegesTangente(T.m, T.fa, T.a),
      expl(DEF_TAN, "on lit A$(a\\,;f(a))$ et la pente $f'(a)$, puis on écrit $y = f'(a)(x - a) + f(a)$.", `A$(${T.a}\\,;${T.fa})$ et pente $${T.m}$ : $y = ${T.m}(${xPlus(-T.a)}) + ${par(T.fa)}$.`, `$${eq}$.`),
      canvas
    );
  }
}

function genGraTracer() {
  for (;;) {
    const a = randomInt(-3, 3);
    const F = randomInt(-4, 5);
    const m = randomChoice([-3, -2, -1, 0.5, -0.5, 2, 3, 1.5]);
    const pas = randomChoice([1, 2]);
    if (F === 0 || m === 1 || F + pas * m === m) continue;
    const pt = (x: number, y: number) => `$(${n(x)}\\,;${n(y)})$`;
    const bon = pt(a + pas, F + pas * m);
    const pieges = [pt(a + pas * m, F + pas), pt(a + pas, F - pas * m), pt(a + pas, pas * m)].filter((x) => x !== bon);
    return qcm(
      randomChoice([
        `On sait que $f(${a}) = ${F}$ et $f'(${a}) = ${n(m)}$. Pour tracer la tangente en $${a}$, on part du point ${pt(a, F)}. Quel autre point est sur cette tangente ?`,
        `${randomChoice(SITUATIONS)[0]} trace la tangente à la courbe de $f$ en $${a}$, avec $f(${a}) = ${F}$ et $f'(${a}) = ${n(m)}$. Quel point doit-on aussi placer sur cette tangente ?`,
        `La tangente en $${a}$ passe par ${pt(a, F)} et a pour coefficient directeur $${n(m)}$. Lequel de ces points est aussi sur la tangente ?`,
      ]),
      bon,
      pieges,
      expl(DEF_GRA, "depuis le point de contact, on avance de $\\Delta x$ et on monte de $f'(a) \\times \\Delta x$.", `depuis ${pt(a, F)}, on avance de ${pas} et on ${m > 0 ? "monte" : "descend"} de $${n(Math.abs(pas * m))}$.`, `le point ${bon} est sur la tangente.`)
    );
  }
}

/* ---------- Gabarits et fusion ---------- */

const NOTION: Record<string, string> = {
  der_usuelles: "derivation_formules",
  der_puissance: "derivation_formules",
  der_taux: "derivation_nombre_derive",
  der_nombre_derive: "derivation_nombre_derive",
  der_definition: "derivation_nombre_derive",
  der_valeur_absolue: "derivation_nombre_derive",
  der_operations: "derivation_operations",
  der_quotient: "derivation_operations",
  der_composee_affine: "derivation_operations",
  der_interpreter: "derivation_tangente",
  der_tangente: "derivation_tangente",
  der_graphique: "derivation_tangente",
};

function tpl(microId: string, difficulty: number, rang: number, generate: () => TutorGeneratedQuestionV4, hint: string): TutorBankItemV4 {
  return {
    kind: "template",
    id: `premiere_der_renfort_${microId}_${difficulty}_${rang}`,
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: NOTION[microId],
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["premiere", "maths", "derivation", "renfort", "template"],
    generate,
  } as TutorBankItemV4;
}

const H_US = "(xⁿ)' = n·xⁿ⁻¹ ; (1/x)' = −1/x² ; (√x)' = 1/(2√x) ; une constante a une dérivée nulle.";
const H_PU = "On multiplie par l’exposant, puis on enlève 1 à l’exposant (même négatif) : 1/xⁿ = x⁻ⁿ.";
const H_TAUX = "Taux de variation = (f(b) − f(a)) ÷ (b − a).";
const H_ND = "f'(a) = limite du taux de variation entre a et a + h quand h tend vers 0.";
const H_DEF = "Développer f(a + h) − f(a), simplifier par h (h ≠ 0), puis faire tendre h vers 0.";
const H_VA = "|x| = x si x ≥ 0, −x si x < 0 : pente 1 à droite, −1 à gauche, pointe en 0.";
const H_OP = "(u + v)' = u' + v' ; (ku)' = ku' ; (uv)' = u'v + uv'.";
const H_QUO = "(1/v)' = −v'/v² ; (u/v)' = (u'v − uv')/v².";
const H_CA = "(g(ax + b))' = a × g'(ax + b) : ne pas oublier le facteur a.";
const H_INT = "f'(a) = vitesse de variation de f en a ; unité : unité de f par unité de la variable.";
const H_TAN = "Tangente : y = f'(a)(x − a) + f(a).";
const H_GRA = "On avance de 1 sur la tangente : de combien monte-t-on (ou descend-on) ? C’est f'(a).";

type Ligne = [string, number, () => TutorGeneratedQuestionV4, string];

const LIGNES: Ligne[] = [
  ["der_usuelles", 1, genUsDerivee(1), H_US],
  ["der_usuelles", 1, genUsValeur(1), H_US],
  ["der_usuelles", 1, genUsVraiFaux(1), H_US],
  ["der_usuelles", 2, genUsDerivee(2), H_US],
  ["der_usuelles", 2, genUsValeur(2), H_US],
  ["der_usuelles", 2, genUsVraiFaux(2), H_US],
  ["der_usuelles", 3, genUsDerivee(3), H_US],
  ["der_usuelles", 3, genUsValeur(3), H_US],
  ["der_usuelles", 3, genUsVraiFaux(3), H_US],
  ["der_usuelles", 4, genUsDerivee(4), H_US],
  ["der_usuelles", 4, genUsValeur(4), H_US],
  ["der_usuelles", 4, genUsRetrouver(4), H_US],
  ["der_usuelles", 4, genUsVraiFaux(4), H_US],
  ["der_usuelles", 5, genUsDomaine, "Repère les points où f ou f' n’existe pas (0 pour 1/x, √x, |x|)."],
  ["der_usuelles", 5, genUsInverse, H_US],
  ["der_usuelles", 5, genUsRetrouver(5), H_US],
  ["der_usuelles", 5, genUsDerivee(5), H_US],

  ["der_puissance", 4, genPuDerivee(4), H_PU],
  ["der_puissance", 4, genPuValeur(4), H_PU],
  ["der_puissance", 4, genPuReecrire, H_PU],
  ["der_puissance", 5, genPuDerivee(5), H_PU],
  ["der_puissance", 5, genPuQuotient, H_PU],
  ["der_puissance", 5, genPuErreur, H_PU],
  ["der_puissance", 5, genPuValeur(5), H_PU],

  ["der_taux", 2, genTauxCalcul(2), H_TAUX],
  ["der_taux", 2, genTauxContexte, H_TAUX],
  ["der_taux", 2, genTauxSens, H_TAUX],
  ["der_taux", 3, genTauxCalcul(3), H_TAUX],
  ["der_taux", 3, genTauxContexte, H_TAUX],
  ["der_taux", 3, genTauxSens, H_TAUX],
  ["der_taux", 4, genTauxGraphe, H_TAUX],
  ["der_taux", 4, genTauxInverse(4), H_TAUX],
  ["der_taux", 4, genTauxSigne, H_TAUX],
  ["der_taux", 4, genTauxCalcul(4), H_TAUX],
  ["der_taux", 5, genTauxH, H_TAUX],
  ["der_taux", 5, genTauxInverse(5), H_TAUX],
  ["der_taux", 5, genTauxSigne, H_TAUX],
  ["der_taux", 5, genTauxCalcul(5), H_TAUX],

  ["der_nombre_derive", 3, genNdConcept, H_ND],
  ["der_nombre_derive", 3, genNdLimite(3), H_ND],
  ["der_nombre_derive", 3, genNdTableau(3), H_ND],
  ["der_nombre_derive", 4, genNdLimite(4), H_ND],
  ["der_nombre_derive", 4, genNdTableau(4), H_ND],
  ["der_nombre_derive", 4, genNdDerivable, H_ND],
  ["der_nombre_derive", 5, genNdLimite(5), H_ND],
  ["der_nombre_derive", 5, genNdTableau(5), H_ND],
  ["der_nombre_derive", 5, genNdDerivable, H_ND],

  ["der_definition", 5, genDefDifference, H_DEF],
  ["der_definition", 5, genDefTaux, H_DEF],
  ["der_definition", 5, genDefLimite, H_DEF],
  ["der_definition", 5, genDefInverse, H_DEF],
  ["der_definition", 5, genDefEtape, H_DEF],

  ["der_valeur_absolue", 4, genVaValeur(4), H_VA],
  ["der_valeur_absolue", 4, genVaNonDerivable(4), H_VA],
  ["der_valeur_absolue", 4, genVaTaux, H_VA],
  ["der_valeur_absolue", 4, genVaCourbe, H_VA],
  ["der_valeur_absolue", 5, genVaVraiFaux, H_VA],
  ["der_valeur_absolue", 5, genVaNonDerivable(5), H_VA],
  ["der_valeur_absolue", 5, genVaGaucheDroite, H_VA],
  ["der_valeur_absolue", 5, genVaValeur(5), H_VA],

  ["der_operations", 3, genOpPoly(3), H_OP],
  ["der_operations", 3, genOpValeur(3), H_OP],
  ["der_operations", 3, genOpStructure, H_OP],
  ["der_operations", 4, genOpPoly(4), H_OP],
  ["der_operations", 4, genOpProduit(4), H_OP],
  ["der_operations", 4, genOpValeur(4), H_OP],
  ["der_operations", 5, genOpProduit(5), H_OP],
  ["der_operations", 5, genOpProduitValeur, H_OP],
  ["der_operations", 5, genOpPoly(5), H_OP],

  ["der_quotient", 4, genQuoInverse, H_QUO],
  ["der_quotient", 4, genQuoHomographique(4), H_QUO],
  ["der_quotient", 4, genQuoValeur(4), H_QUO],
  ["der_quotient", 5, genQuoHomographique(5), H_QUO],
  ["der_quotient", 5, genQuoDomaine, H_QUO],
  ["der_quotient", 5, genQuoSigne, H_QUO],
  ["der_quotient", 5, genQuoXsurX2, H_QUO],
  ["der_quotient", 5, genQuoValeur(5), H_QUO],

  ["der_composee_affine", 4, genCaDerivee(4), H_CA],
  ["der_composee_affine", 4, genCaRegle, H_CA],
  ["der_composee_affine", 4, genCaValeur(4), H_CA],
  ["der_composee_affine", 5, genCaDerivee(5), H_CA],
  ["der_composee_affine", 5, genCaValeur(5), H_CA],
  ["der_composee_affine", 5, genCaErreur, H_CA],

  ["der_interpreter", 3, genIntSens, H_INT],
  ["der_interpreter", 3, genIntUnite, H_INT],
  ["der_interpreter", 3, genIntTangente, H_INT],
  ["der_interpreter", 4, genIntSigne(4), H_INT],
  ["der_interpreter", 4, genIntPhrase, H_INT],
  ["der_interpreter", 4, genIntUnite, H_INT],
  ["der_interpreter", 5, genIntApprox, H_INT],
  ["der_interpreter", 5, genIntComparer, H_INT],
  ["der_interpreter", 5, genIntSigne(5), H_INT],

  ["der_tangente", 2, genTanLireEquation(2), H_TAN],
  ["der_tangente", 2, genTanHorizontale, H_TAN],
  ["der_tangente", 2, genTanDonnees, H_TAN],
  ["der_tangente", 3, genTanPente(3), H_TAN],
  ["der_tangente", 3, genTanLireEquation(3), H_TAN],
  ["der_tangente", 3, genTanHorizAbscisse(3), H_TAN],
  ["der_tangente", 4, genTanEquation, H_TAN],
  ["der_tangente", 4, genTanEquationPoly(4), H_TAN],
  ["der_tangente", 4, genTanOrdonnee, H_TAN],
  ["der_tangente", 5, genTanEquationPoly(5), H_TAN],
  ["der_tangente", 5, genTanParallele, H_TAN],
  ["der_tangente", 5, genTanPente(5), H_TAN],
  ["der_tangente", 5, genTanHorizAbscisse(5), H_TAN],

  ["der_graphique", 3, genGraLirePente(3), H_GRA],
  ["der_graphique", 3, genGraSigne, H_GRA],
  ["der_graphique", 3, genGraSommet(3), H_GRA],
  ["der_graphique", 4, genGraDeuxPoints(4), H_GRA],
  ["der_graphique", 4, genGraEquation, H_GRA],
  ["der_graphique", 4, genGraLirePente(4), H_GRA],
  ["der_graphique", 4, genGraSigne, H_GRA],
  ["der_graphique", 5, genGraTracer, H_GRA],
  ["der_graphique", 5, genGraLirePente(5), H_GRA],
  ["der_graphique", 5, genGraSommet(5), H_GRA],
  ["der_graphique", 5, genGraDeuxPoints(5), H_GRA],
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
