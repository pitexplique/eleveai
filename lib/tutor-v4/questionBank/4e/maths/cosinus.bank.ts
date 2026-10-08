// lib/tutor-v4/question-banks/maths/4e/cosinus.bank.ts
//
// Notion : Cosinus dans le triangle rectangle (trigo_cosinus) — programme de 4e.
// Micro-compétences : cos_cotes, cos_definition, cos_calculer_longueur,
// cos_calculer_angle, cos_probleme, cos_defi.
//
// Conventions : LaTeX $...$, règle QCM (numérique -> short number_equal,
// expression -> qcm), helper explication Définition/Méthode/Calcul/Conclusion,
// canvas triangle rectangle (kind "triangle", angle droit en A).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function degToRad(angle: number) {
  return (angle * Math.PI) / 180;
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Arrondi à l'unité (pas 1), au dixième (0,1) ou au centième (sinon). */
function arrondir(x: number, pas: number) {
  if (pas === 1) return Math.round(x);
  if (pas === 0.1) return Math.round(x * 10) / 10;
  return Math.round(x * 100) / 100;
}

/** Nombre déjà arrondi → texte français (virgule). */
function fmt(n: number) {
  return String(n).replace(".", ",");
}

/** Nombre déjà arrondi → LaTeX (virgule sans espace parasite). */
function tex(n: number) {
  return String(n).replace(".", "{,}");
}

/**
 * La réponse attendue : virgule française, et l'unité quand l'énoncé en impose
 * une (« 2,9 cm », règle de Frédéric). ⚠️ 08/10/2026 : plus de « 2.9 » en
 * premier — c'est la réponse affichée ; le comparateur accepte le point de
 * toute façon, et l'unité omise par l'élève.
 */
function reponses(n: number, u = "") {
  return [u ? `${fmt(n)} ${u}` : fmt(n)];
}

function cosD(a: number) {
  return Math.cos(degToRad(a));
}

function acosD(r: number) {
  return (Math.acos(r) * 180) / Math.PI;
}

/** Une longueur entière ou au dixième, entre min et max. */
function tirerLongueur(min: number, max: number) {
  return Math.random() < 0.5
    ? randomInt(min, max)
    : arrondir(min + Math.random() * (max - min), 0.1);
}

/**
 * ⭐ LES NOMS DU TRIANGLE, ajoutés le 30/08/2026, élargis le 03/10/2026.
 * Le sommet `A` du canvas porte toujours l'angle droit — c'est sa géométrie —,
 * mais son NOM change, et depuis le 03/10 la lettre de l'angle droit est tirée
 * parmi les trois (le triangle RST peut être rectangle en R, en S ou en T), et
 * le triangle s'écrit dans un ordre quelconque. C'est ce qui empêche
 * d'apprendre « l'hypoténuse, c'est [BC] » au lieu de « c'est le côté en face
 * de l'angle droit ».
 * ⚠️ Les lettres sont choisies pour rester lisibles à 11 px : pas de I ni de O.
 */
const NOMMAGES: string[][] = [
  ["A", "B", "C"],
  ["R", "S", "T"],
  ["M", "N", "P"],
  ["E", "F", "G"],
  ["K", "L", "H"],
  ["D", "U", "V"],
  ["J", "L", "N"],
  ["P", "R", "T"],
  ["E", "G", "K"],
  ["M", "P", "S"],
  ["H", "K", "Z"],
  ["D", "F", "Y"],
  ["T", "V", "X"],
  ["B", "D", "F"],
  ["C", "E", "W"],
];

type Tri = { A: string; B: string; C: string; nom: string };

/** A = sommet de l'angle droit, B et C = sommets des angles aigus. */
function tirerTriangle(): Tri {
  const [A, B, C] = shuffle(randomChoice(NOMMAGES));
  return { A, B, C, nom: shuffle([A, B, C]).join("") };
}

/**
 * L'angle étudié, en B ou en C du canvas. S = son sommet, X = l'autre sommet
 * aigu ; adj, opp, hyp = les noms des côtés (deux lettres).
 */
type Cfg = {
  t: Tri;
  angleAt: "B" | "C";
  S: string;
  X: string;
  adj: string;
  opp: string;
  hyp: string;
  adjKey: "AB" | "CA";
  oppKey: "AB" | "CA";
};

function configurer(t: Tri, angleAt?: "B" | "C"): Cfg {
  const at = angleAt ?? randomChoice<"B" | "C">(["B", "C"]);
  return at === "B"
    ? { t, angleAt: at, S: t.B, X: t.C, adj: t.A + t.B, opp: t.A + t.C, hyp: t.B + t.C, adjKey: "AB", oppKey: "CA" }
    : { t, angleAt: at, S: t.C, X: t.B, adj: t.A + t.C, opp: t.A + t.B, hyp: t.B + t.C, adjKey: "CA", oppKey: "AB" };
}

/** L'angle écrit avec une lettre ou avec trois : $\widehat{S}$, $\widehat{ASX}$. */
function nomAngle(c: Cfg) {
  return randomChoice([
    `\\widehat{${c.S}}`,
    `\\widehat{${c.S}}`,
    `\\widehat{${c.t.A}${c.S}${c.X}}`,
    `\\widehat{${c.X}${c.S}${c.t.A}}`,
  ]);
}

const PRENOMS: { p: string; il: string }[] = [
  { p: "Lina", il: "elle" },
  { p: "Hugo", il: "il" },
  { p: "Inès", il: "elle" },
  { p: "Noah", il: "il" },
  { p: "Maëlys", il: "elle" },
  { p: "Yanis", il: "il" },
  { p: "Chloé", il: "elle" },
  { p: "Malik", il: "il" },
  { p: "Jade", il: "elle" },
  { p: "Théo", il: "il" },
  { p: "Sarah", il: "elle" },
  { p: "Kenzo", il: "il" },
];

/** Triplets pythagoriciens : les trois longueurs données restent cohérentes. */
const TRIPLETS: [number, number, number][] = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
  [9, 40, 41],
];

function tirerTriplet() {
  const [p, q, r] = randomChoice(TRIPLETS);
  const k = randomInt(1, Math.max(1, Math.floor(50 / r)));
  return { p: p * k, q: q * k, r: r * k };
}

/** Rapports « ronds » (cosinus en écriture décimale exacte). */
const RAPPORTS = [0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95];

/** Une hypoténuse et un adjacent au dixième dont le quotient est un rapport rond. */
function tirerRapport() {
  for (let k = 0; k < 400; k++) {
    const r = randomChoice(RAPPORTS);
    const h = tirerLongueur(4, 25);
    const d = arrondir(h * r, 0.01);
    // ⛔ 08/10/2026 (trouvé par le correcteur) : il faut d ÷ h = r EXACTEMENT.
    // Avant, d était arrondi (12,9 × 0,55 = 7,095 → 7,1) et l'élève devait
    // répondre 0,55 alors que 7,1 ÷ 12,9 = 0,5503…
    if (Math.abs(h * r - d) < 1e-9 && Math.abs(d * 10 - Math.round(d * 10)) < 1e-9 && d > 0) return { r, h, d };
  }
  return { r: 0.6, h: 20, d: 12 };
}

const UNITES = ["cm", "cm", "m"];

/**
 * Le triangle rectangle du cosinus.
 *
 * ⛔⛔ DEUX FAUTES CORRIGÉES LE 30/08/2026.
 *
 * 1. `sideLabels` s'écrivait `AC` — or le type ne connaît que `AB`, `BC` et
 *    `CA`, et `TriangleCanvas` ne lit QUE ces trois-là. Le `as any` de la fin
 *    masquait l'erreur au typecheck : l'étiquette « opposé » n'a JAMAIS été
 *    affichée dans une question de cosinus. Elle l'est maintenant, sur `CA`.
 *
 * 2. Les sommets s'appelaient toujours A, B, C, avec l'angle droit toujours
 *    en A. Un élève y apprenait « l'hypoténuse, c'est [BC] » au lieu de « c'est
 *    le côté en face de l'angle droit ». Les noms sont donc un paramètre, et
 *    les gabarits en tirent une table.
 *
 * ⚠️ Le viewBox fait 280 pour un rendu plafonné à 240 px : l'échelle vaut
 * 0,857, et la plus petite police du canvas (13) sort à 11,1 px — juste
 * au-dessus du plancher. Ne pas élargir ce viewBox sans remesurer.
 */
function triangleCosCanvas(params?: {
  angleAt?: "B" | "C";
  sideLabels?: { AB?: string; CA?: string; BC?: string };
  angleLabel?: string;
  noms?: { A: string; B: string; C: string };
}) {
  const angleAt = params?.angleAt ?? "B";
  const noms = params?.noms ?? { A: "A", B: "B", C: "C" };
  return {
    kind: "triangle",
    points: {
      A: { x: 55, y: 190 },
      B: { x: 230, y: 190 },
      C: { x: 55, y: 70 },
    },
    labels: { A: noms.A, B: noms.B, C: noms.C },
    sideLabels: params?.sideLabels ?? {
      AB: "adjacent",
      CA: "opposé",
      BC: "hypoténuse",
    },
    angleLabels:
      angleAt === "B"
        ? { B: params?.angleLabel ?? "θ" }
        : { C: params?.angleLabel ?? "θ" },
    marks: { rightAngleAt: "A" },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: true,
    },
    size: { width: 280, height: 240 },
  } as any;
}

/** Le canvas d'une configuration : étiquettes posées sur les bons côtés. */
function figure(c: Cfg, l: { adj?: string; opp?: string; hyp?: string; angle?: string }) {
  const sideLabels: { AB?: string; CA?: string; BC?: string } = { BC: l.hyp ?? "" };
  sideLabels[c.adjKey] = l.adj ?? "";
  sideLabels[c.oppKey] = l.opp ?? "";
  return triangleCosCanvas({
    angleAt: c.angleAt,
    noms: { A: c.t.A, B: c.t.B, C: c.t.C },
    sideLabels,
    angleLabel: l.angle ?? "",
  });
}

/* =========================
   GÉNÉRATEURS (03/10/2026)
   ⛔ Pourquoi : les élèves de 4e reconnaissaient la PHRASE (9 à 26 squelettes
   par micro, 7 à 18 répétitions sur 20). Chaque gabarit compose maintenant un
   triangle (15 nommages × 3 places de l'angle droit × angle en B ou en C,
   écrit avec une ou trois lettres), une tournure, et pour les problèmes un
   objet réel tiré d'une table de contextes.
   ⛔ En 4e : le COSINUS seulement (décision de Frédéric).
========================= */

/* ---------- COS_COTES ---------- */

/** ★1 : l'hypoténuse, ou les deux côtés de l'angle droit. */
function genCotesAngleDroit() {
  const t = tirerTriangle();
  const c = configurer(t, "B");
  const hypS = `$[${t.B}${t.C}]$`;
  const s1 = `$[${t.A}${t.B}]$`;
  const s2 = `$[${t.A}${t.C}]$`;
  const canvas = figure(c, {});
  if (Math.random() < 0.55) {
    const text = randomChoice([
      `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, quel côté est l'hypoténuse ?`,
      `Le triangle $${t.nom}$ a un angle droit en $${t.A}$. Quel est son plus long côté ?`,
      `$${t.nom}$ est un triangle rectangle en $${t.A}$. Quel côté est en face de l'angle droit ?`,
      `Sur la figure, le triangle $${t.nom}$ est rectangle en $${t.A}$. Lequel de ses côtés est l'hypoténuse ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: shuffle([hypS, s1, s2]),
      expected: [hypS],
      comparator: "mcq_exact",
      explanation:
        "Définition : l'hypoténuse est le côté OPPOSÉ à l'angle droit ; c'est aussi le plus long des trois.\n\n" +
        `Méthode : on repère l'angle droit, ici en $${t.A}$, puis on prend le côté qui ne touche pas $${t.A}$.\n\n` +
        `Calcul : ${s1} et ${s2} partent de $${t.A}$ ; il reste ${hypS}.\n\n` +
        `Conclusion : l'hypoténuse est ${hypS}.`,
      canvas,
    };
  }
  const bon = `${s1} et ${s2}`;
  const text = randomChoice([
    `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, quels sont les deux côtés de l'angle droit ?`,
    `Le triangle $${t.nom}$ est rectangle en $${t.A}$. Quels côtés forment l'angle droit ?`,
    `Quels côtés du triangle $${t.nom}$, rectangle en $${t.A}$, se rejoignent pour former l'angle droit ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([bon, `${s1} et ${hypS}`, `${s2} et ${hypS}`]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      "Définition : les côtés de l'angle droit sont les deux côtés qui partent du sommet de l'angle droit.\n\n" +
      `Méthode : l'angle droit est en $${t.A}$ ; on garde les deux côtés qui contiennent la lettre $${t.A}$.\n\n` +
      `Calcul : ce sont ${s1} et ${s2}. Le troisième, ${hypS}, est l'hypoténuse.\n\n` +
      `Conclusion : les côtés de l'angle droit sont ${bon}.`,
    canvas,
  };
}

/** ★2 : l'hypoténuse, l'angle droit étant donné de plusieurs façons. */
function genCotesHypotenuse() {
  const t = tirerTriangle();
  const c = configurer(t, "B");
  const hypS = `$[${t.B}${t.C}]$`;
  const s1 = `$[${t.A}${t.B}]$`;
  const s2 = `$[${t.A}${t.C}]$`;
  const tour = randomChoice([
    {
      text: `Dans le triangle $${t.nom}$, l'angle $\\widehat{${t.B}${t.A}${t.C}}$ est droit. Quel côté est l'hypoténuse ?`,
      pourquoi: `le sommet de l'angle droit est la lettre du MILIEU de $\\widehat{${t.B}${t.A}${t.C}}$, c'est-à-dire $${t.A}$`,
    },
    {
      text: `Le triangle $${t.nom}$ vérifie $(${t.A}${t.B}) \\perp (${t.A}${t.C})$. Quelle est son hypoténuse ?`,
      pourquoi: `les droites $(${t.A}${t.B})$ et $(${t.A}${t.C})$ sont perpendiculaires et se coupent en $${t.A}$`,
    },
    {
      text: `On sait que $\\widehat{${t.C}${t.A}${t.B}} = 90^\\circ$ dans le triangle $${t.nom}$. Quel côté est le plus long ?`,
      pourquoi: `l'angle de $90^\\circ$ a pour sommet la lettre du milieu, $${t.A}$`,
    },
    {
      text: `Le triangle $${t.nom}$ est rectangle en $${t.A}$. Quel côté ne touche pas l'angle droit ?`,
      pourquoi: `l'énoncé le dit : le triangle est rectangle en $${t.A}$`,
    },
  ]);
  return {
    text: tour.text,
    format: "qcm",
    choices: shuffle([hypS, s1, s2]),
    expected: [hypS],
    comparator: "mcq_exact",
    explanation:
      "Définition : l'hypoténuse est le côté OPPOSÉ à l'angle droit — c'est aussi le plus long des trois.\n\n" +
      `Méthode : on repère l'angle droit : ${tour.pourquoi}. Puis on prend le côté qui ne touche pas $${t.A}$.\n\n` +
      `Calcul : ${s1} et ${s2} partent de $${t.A}$. Reste ${hypS}.\n\n` +
      `Conclusion : l'hypoténuse est ${hypS}. ⚠️ Elle se repère par l'ANGLE DROIT, jamais par les lettres.`,
    canvas: figure(c, {}),
  };
}

/** ★3 : le côté adjacent ou le côté opposé à un angle aigu. */
function genCotesAdjacentOppose() {
  const t = tirerTriangle();
  const c = configurer(t);
  const ang = nomAngle(c);
  const adjS = `$[${c.adj}]$`;
  const oppS = `$[${c.opp}]$`;
  const hypS = `$[${c.hyp}]$`;
  const canvas = figure(c, {});
  if (Math.random() < 0.6) {
    const text = randomChoice([
      `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, quel est le côté adjacent à l'angle $${ang}$ ?`,
      `$${t.nom}$ est rectangle en $${t.A}$. On s'intéresse à l'angle $${ang}$ : quel côté lui est adjacent ?`,
      `Pour calculer $\\cos(${ang})$ dans le triangle $${t.nom}$ rectangle en $${t.A}$, quel côté adjacent faut-il mesurer ?`,
      `Dans $${t.nom}$, rectangle en $${t.A}$, on regarde l'angle aigu $${ang}$. Lequel de ces côtés lui est adjacent ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: shuffle([adjS, oppS, hypS]),
      expected: [adjS],
      comparator: "mcq_exact",
      explanation:
        "Définition : le côté ADJACENT à un angle est celui qui le touche SANS être l'hypoténuse.\n\n" +
        `Méthode : on écarte d'abord l'hypoténuse ${hypS} — elle est en face de l'angle droit $${t.A}$ —, puis on garde le côté restant qui part de $${c.S}$.\n\n` +
        `Calcul : les deux côtés qui partent de $${c.S}$ sont ${adjS} et ${hypS}. Comme ${hypS} est l'hypoténuse, l'adjacent est ${adjS}.\n\n` +
        `Conclusion : ⚠️ « adjacent » n'est jamais le nom d'un côté fixe : il change avec l'ANGLE qu'on regarde. Ici ${oppS} est l'opposé à $${ang}$.`,
      canvas,
    };
  }
  const text = randomChoice([
    `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, quel côté est opposé à l'angle $${ang}$ ?`,
    `$${t.nom}$ est rectangle en $${t.A}$. Quel côté est en face de l'angle $${ang}$ ?`,
    `On regarde l'angle $${ang}$ du triangle $${t.nom}$, rectangle en $${t.A}$. Quel est le côté opposé à cet angle ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([oppS, adjS, hypS]),
    expected: [oppS],
    comparator: "mcq_exact",
    explanation:
      "Définition : le côté OPPOSÉ à un angle est celui qui lui fait face : il ne touche pas son sommet.\n\n" +
      `Méthode : le sommet de $${ang}$ est $${c.S}$ ; on cherche le côté qui ne contient pas la lettre $${c.S}$.\n\n` +
      `Calcul : ${adjS} et ${hypS} partent de $${c.S}$ ; il reste ${oppS}.\n\n` +
      `Conclusion : le côté opposé à $${ang}$ est ${oppS}. ⚠️ Le cosinus, lui, n'utilise pas ce côté : il utilise l'adjacent ${adjS} et l'hypoténuse ${hypS}.`,
    canvas,
  };
}

/* ---------- COS_DEFINITION ---------- */

/** ★2 : compléter la fraction du cosinus (numérateur ou dénominateur). */
function genDefinitionTrou() {
  const t = tirerTriangle();
  const c = configurer(t);
  const ang = nomAngle(c);
  const choix = shuffle([`$${c.adj}$`, `$${c.opp}$`, `$${c.hyp}$`]);
  const explication = (bon: string) =>
    "Définition : $\\cos = \\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$ — l'adjacent en haut, l'hypoténuse en bas.\n\n" +
    `Méthode : l'hypoténuse est en face de l'angle droit $${t.A}$ : c'est $${c.hyp}$. L'adjacent à $${ang}$ part de $${c.S}$ sans être l'hypoténuse : c'est $${c.adj}$.\n\n` +
    `Calcul : $\\cos(${ang}) = \\dfrac{${c.adj}}{${c.hyp}}$.\n\n` +
    `Conclusion : la longueur qui manque est ${bon}.`;
  if (Math.random() < 0.5) {
    const text = randomChoice([
      `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, on écrit $\\cos(${ang}) = \\dfrac{\\ldots}{${c.hyp}}$. Quelle longueur manque au numérateur ?`,
      `Complète : dans le triangle $${t.nom}$ rectangle en $${t.A}$, $\\cos(${ang}) = \\dfrac{\\;?\\;}{${c.hyp}}$.`,
      `Le triangle $${t.nom}$ est rectangle en $${t.A}$. Quelle longueur faut-il diviser par $${c.hyp}$ pour obtenir $\\cos(${ang})$ ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: choix,
      expected: [`$${c.adj}$`],
      comparator: "mcq_exact",
      explanation: explication(`$${c.adj}$`),
      canvas: figure(c, {}),
    };
  }
  const text = randomChoice([
    `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, $\\cos(${ang}) = \\dfrac{${c.adj}}{\\ldots}$. Quelle longueur faut-il écrire au dénominateur ?`,
    `Complète : dans $${t.nom}$ rectangle en $${t.A}$, $\\cos(${ang}) = \\dfrac{${c.adj}}{\\;?\\;}$.`,
    `Le triangle $${t.nom}$ est rectangle en $${t.A}$. Par quelle longueur divise-t-on $${c.adj}$ pour obtenir $\\cos(${ang})$ ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix,
    expected: [`$${c.hyp}$`],
    comparator: "mcq_exact",
    explanation: explication(`$${c.hyp}$`),
    canvas: figure(c, {}),
  };
}

/** Les trois longueurs dans un ordre quelconque : « $AB = 9$ cm, … et … ». */
function listeLongueurs(items: [string, number][], u: string) {
  const l = shuffle(items).map(([n, v]) => `$${n} = ${tex(v)}$ ${u}`);
  return l.length === 2 ? `${l[0]} et ${l[1]}` : `${l[0]}, ${l[1]} et ${l[2]}`;
}

/** ★3 : la fraction du cosinus avec des longueurs (triplet cohérent). */
function genDefinitionValeur() {
  const t = tirerTriangle();
  const c = configurer(t);
  const ang = nomAngle(c);
  const u = randomChoice(UNITES);
  const tr = tirerTriplet();
  const [a, o] = Math.random() < 0.5 ? [tr.p, tr.q] : [tr.q, tr.p];
  const h = tr.r;
  const troisDonnees = Math.random() < 0.6;
  const donnees: [string, number][] = troisDonnees
    ? [[c.adj, a], [c.opp, o], [c.hyp, h]]
    : [[c.adj, a], [c.hyp, h]];
  const liste = listeLongueurs(donnees, u);
  const correct = `$\\dfrac{${a}}{${h}}$`;
  const text = randomChoice([
    `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, on a ${liste}. Quelle fraction est égale à $\\cos(${ang})$ ?`,
    `On donne ${liste}. Le triangle $${t.nom}$ est rectangle en $${t.A}$. Que vaut $\\cos(${ang})$ ?`,
    `Le triangle $${t.nom}$, rectangle en $${t.A}$, est tel que ${liste}. Parmi ces fractions, laquelle est égale à $\\cos(${ang})$ ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([correct, `$\\dfrac{${h}}{${a}}$`, `$\\dfrac{${o}}{${h}}$`, `$\\dfrac{${a}}{${o}}$`]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation:
      "Définition : $\\cos = \\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$.\n\n" +
      `Méthode : l'hypoténuse est en face de l'angle droit $${t.A}$ : $${c.hyp} = ${h}$ ${u}. L'adjacent à $${ang}$ est $${c.adj} = ${a}$ ${u}.\n\n` +
      `Calcul : $\\cos(${ang}) = \\dfrac{${c.adj}}{${c.hyp}} = \\dfrac{${a}}{${h}}$.\n\n` +
      `Conclusion : $\\cos(${ang}) = \\dfrac{${a}}{${h}}$.${troisDonnees ? ` ⚠️ $${c.opp} = ${o}$ ${u} ne sert pas : c'est le côté opposé.` : ""}`,
    canvas: figure(c, {
      adj: `${a} ${u}`,
      opp: troisDonnees ? `${o} ${u}` : "",
      hyp: `${h} ${u}`,
    }),
  };
}

/** ★3 : la formule du cosinus écrite avec les lettres du triangle. */
function genDefinitionFormule() {
  const t = tirerTriangle();
  const c = configurer(t);
  const ang = nomAngle(c);
  const fr = (n: string, d: string) => `\\dfrac{${n}}{${d}}`;
  const egalites = Math.random() < 0.3;
  const habille = (f: string) => (egalites ? `$\\cos(${ang}) = ${f}$` : `$${f}$`);
  const correct = habille(fr(c.adj, c.hyp));
  const text = egalites
    ? randomChoice([
        `Le triangle $${t.nom}$ est rectangle en $${t.A}$. Quelle égalité est juste ?`,
        `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, laquelle de ces égalités est vraie ?`,
      ])
    : randomChoice([
        `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, à quoi est égal $\\cos(${ang})$ ?`,
        `Quelle fraction donne le cosinus de l'angle $${ang}$ dans le triangle $${t.nom}$ rectangle en $${t.A}$ ?`,
        `$${t.nom}$ est un triangle rectangle en $${t.A}$. Comment s'écrit $\\cos(${ang})$ avec les longueurs du triangle ?`,
      ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([
      correct,
      habille(fr(c.hyp, c.adj)),
      habille(fr(c.opp, c.hyp)),
      habille(fr(c.adj, c.opp)),
    ]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation:
      "Définition : $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ — l'adjacent EN HAUT, toujours.\n\n" +
      `Méthode : on repère l'hypoténuse par l'angle droit (en $${t.A}$), donc $${c.hyp}$. Puis l'adjacent à $${ang}$, c'est-à-dire le côté qui part de $${c.S}$ sans être l'hypoténuse : $${c.adj}$.\n\n` +
      `Calcul : $\\cos(${ang}) = \\dfrac{${c.adj}}{${c.hyp}}$.\n\n` +
      `Conclusion : ⚠️ $\\dfrac{${c.hyp}}{${c.adj}}$ est le piège — c'est la fraction retournée, et elle donne un nombre plus grand que 1, ce qu'un cosinus ne peut jamais être.`,
    canvas: figure(c, {}),
  };
}

/** ★4 : un élève écrit une égalité ; est-elle juste ? */
function genDefinitionEleve() {
  const t = tirerTriangle();
  const c = configurer(t);
  const ang = nomAngle(c);
  const el = randomChoice(PRENOMS);
  const erreur = randomChoice(["juste", "juste", "retournee", "oppose", "cotes_angle_droit"]);
  const f =
    erreur === "juste"
      ? [c.adj, c.hyp]
      : erreur === "retournee"
        ? [c.hyp, c.adj]
        : erreur === "oppose"
          ? [c.opp, c.hyp]
          : [c.adj, c.opp];
  const ecrit = `$\\cos(${ang}) = \\dfrac{${f[0]}}{${f[1]}}$`;
  const juste = erreur === "juste";
  const tour = randomChoice([
    { q: `A-t-${el.il} raison ?`, ch: ["oui", "non"] },
    { q: `Cette égalité est-elle juste ?`, ch: ["oui", "non"] },
    { q: `Vrai ou faux ?`, ch: ["vrai", "faux"] },
  ]);
  const intro = randomChoice([
    `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, ${el.p} écrit ${ecrit}.`,
    `${el.p} étudie le triangle $${t.nom}$, rectangle en $${t.A}$, et écrit : ${ecrit}.`,
    `Le triangle $${t.nom}$ est rectangle en $${t.A}$. Sur sa copie, ${el.p} a écrit ${ecrit}.`,
  ]);
  const pourquoi: Record<string, string> = {
    juste: `C'est bien l'adjacent $${c.adj}$ sur l'hypoténuse $${c.hyp}$.`,
    retournee: `La fraction est retournée : l'hypoténuse doit être EN BAS (sinon le cosinus dépasserait 1).`,
    oppose: `$${c.opp}$ est le côté OPPOSÉ à $${ang}$, pas l'adjacent.`,
    cotes_angle_droit: `$${c.opp}$ n'est pas l'hypoténuse : c'est un côté de l'angle droit. L'hypoténuse est $${c.hyp}$.`,
  };
  return {
    text: `${intro} ${tour.q}`,
    format: "qcm",
    choices: tour.ch,
    expected: [juste ? tour.ch[0] : tour.ch[1]],
    comparator: "mcq_exact",
    explanation:
      "Définition : $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      `Méthode : hypoténuse = côté en face de l'angle droit $${t.A}$, donc $${c.hyp}$ ; adjacent à $${ang}$ = $${c.adj}$.\n\n` +
      `Calcul : la bonne égalité est $\\cos(${ang}) = \\dfrac{${c.adj}}{${c.hyp}}$. ${pourquoi[erreur]}\n\n` +
      `Conclusion : ${juste ? `${tour.ch[0]}, l'égalité est juste.` : `${tour.ch[1]}, l'égalité est fausse.`}`,
    canvas: figure(c, {}),
  };
}

/** ★4 : la valeur décimale exacte du cosinus. */
function genDefinitionDecimal() {
  const t = tirerTriangle();
  const c = configurer(t);
  const ang = nomAngle(c);
  const u = randomChoice(UNITES);
  const { r, h, d } = tirerRapport();
  const text = randomChoice([
    `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, $${c.adj} = ${tex(d)}$ ${u} et $${c.hyp} = ${tex(h)}$ ${u}. Donne la valeur décimale de $\\cos(${ang})$.`,
    `Le triangle $${t.nom}$ est rectangle en $${t.A}$, avec $${c.hyp} = ${tex(h)}$ ${u} et $${c.adj} = ${tex(d)}$ ${u}. Calcule $\\cos(${ang})$ en écriture décimale.`,
    `On mesure $${c.adj} = ${tex(d)}$ ${u} et $${c.hyp} = ${tex(h)}$ ${u} sur le triangle $${t.nom}$ rectangle en $${t.A}$. Que vaut $\\cos(${ang})$ ?`,
  ]);
  return {
    text,
    format: "short",
    expected: reponses(r),
    comparator: "number_equal",
    explanation:
      "Définition : $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      `Méthode : l'hypoténuse est $${c.hyp}$ (en face de l'angle droit $${t.A}$), l'adjacent à $${ang}$ est $${c.adj}$.\n\n` +
      `Calcul : $\\cos(${ang}) = \\dfrac{${tex(d)}}{${tex(h)}} = ${tex(r)}$.\n\n` +
      `Conclusion : $\\cos(${ang}) = ${tex(r)}$ — un nombre entre 0 et 1, comme tout cosinus d'angle aigu.`,
    canvas: figure(c, { adj: `${fmt(d)} ${u}`, hyp: `${fmt(h)} ${u}` }),
  };
}

/* ---------- COS_CALCULER_LONGUEUR ---------- */

type OptsLongueur = {
  cherche: "adj" | "hyp";
  mode: "60" | "calc" | "cosDonne" | "autre";
  pas?: number; // 0,1 ou 1 en mode calcul
};

function genLongueur(o: OptsLongueur) {
  const t = tirerTriangle();
  const c = configurer(t);
  const ang = nomAngle(c);
  const u = randomChoice(UNITES);
  const pas = o.pas ?? 0.1;
  const arr =
    o.mode === "calc" || o.mode === "autre"
      ? pas === 1
        ? ` (en ${u}, à l'unité près)`
        : ` (en ${u}, au dixième près)`
      : ` (en ${u})`;
  const tourAdj = (h: number, donneeAngle: string) =>
    randomChoice([
      `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, $${c.hyp} = ${tex(h)}$ ${u} et ${donneeAngle}. Calcule $${c.adj}$${arr}.`,
      `Le triangle $${t.nom}$ est rectangle en $${t.A}$ ; son hypoténuse mesure ${fmt(h)} ${u} et ${donneeAngle}. Quelle est la longueur $${c.adj}$${arr} ?`,
      `On considère le triangle $${t.nom}$ rectangle en $${t.A}$ tel que $${c.hyp} = ${tex(h)}$ ${u} et ${donneeAngle}. Combien mesure le côté $[${c.adj}]$${arr} ?`,
      `$${t.nom}$ est rectangle en $${t.A}$. On sait que ${donneeAngle} et que l'hypoténuse $[${c.hyp}]$ mesure ${fmt(h)} ${u}. Détermine $${c.adj}$${arr}.`,
    ]);

  if (o.mode === "autre") {
    // L'angle donné est l'AUTRE angle aigu : il faut passer par 90° − b.
    const b = randomInt(15, 75);
    const a = 90 - b;
    const h = tirerLongueur(5, 25);
    const res = arrondir(h * cosD(a), pas);
    const cX = configurer(t, c.angleAt === "B" ? "C" : "B");
    const text = randomChoice([
      `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, $${c.hyp} = ${tex(h)}$ ${u} et $\\widehat{${c.X}} = ${b}^\\circ$. Calcule $${c.adj}$${arr}.`,
      `Le triangle $${t.nom}$ est rectangle en $${t.A}$, d'hypoténuse $${c.hyp} = ${tex(h)}$ ${u}, avec $\\widehat{${c.X}} = ${b}^\\circ$. Quelle est la longueur $${c.adj}$${arr} ?`,
      `$${t.nom}$ est rectangle en $${t.A}$ ; on connaît $\\widehat{${c.X}} = ${b}^\\circ$ et $${c.hyp} = ${tex(h)}$ ${u}. Combien mesure $${c.adj}$${arr} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: reponses(res, u),
      comparator: "number_equal",
      explanation:
        "Définition : $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$, et dans un triangle rectangle les deux angles aigus ont pour somme $90^\\circ$.\n\n" +
        `Méthode : $[${c.adj}]$ est OPPOSÉ à $\\widehat{${c.X}}$ : on ne peut pas utiliser cet angle directement. On calcule l'autre angle aigu : $\\widehat{${c.S}} = 90^\\circ - ${b}^\\circ = ${a}^\\circ$. Pour $\\widehat{${c.S}}$, $[${c.adj}]$ est bien l'adjacent.\n\n` +
        `Calcul : $${c.adj} = ${c.hyp} \\times \\cos(\\widehat{${c.S}}) = ${tex(h)} \\times \\cos(${a}^\\circ) \\approx ${tex(res)}$.\n\n` +
        `Conclusion : $${c.adj} \\approx ${tex(res)}$ ${u}.`,
      canvas: figure(cX, { opp: "?", hyp: `${fmt(h)} ${u}`, angle: `${b}°` }),
    };
  }

  if (o.mode === "cosDonne") {
    // ⛔ 08/10/2026 (trouvé par le correcteur) : aucun arrondi n'est annoncé, donc
    // h × cos doit tomber juste au centième (6,9 × 0,35 = 2,415 attendait « 2,42 »).
    let r = randomChoice(RAPPORTS);
    let h = tirerLongueur(4, 30);
    for (let k = 0; k < 200 && Math.abs(h * r * 100 - Math.round(h * r * 100)) > 1e-6; k++) {
      r = randomChoice(RAPPORTS);
      h = tirerLongueur(4, 30);
    }
    const res = arrondir(h * r, 0.01);
    const text = randomChoice([
      `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, $${c.hyp} = ${tex(h)}$ ${u} et $\\cos(${ang}) = ${tex(r)}$. Calcule $${c.adj}$${arr}.`,
      `Le triangle $${t.nom}$ est rectangle en $${t.A}$. Son hypoténuse mesure ${fmt(h)} ${u} et on sait que $\\cos(${ang}) = ${tex(r)}$. Quelle est la longueur $${c.adj}$${arr} ?`,
      `On donne $\\cos(${ang}) = ${tex(r)}$ dans le triangle $${t.nom}$ rectangle en $${t.A}$, avec $${c.hyp} = ${tex(h)}$ ${u}. Combien mesure $${c.adj}$${arr} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: reponses(res, u),
      comparator: "number_equal",
      explanation:
        `Définition : $\\cos(${ang}) = \\dfrac{${c.adj}}{${c.hyp}}$ (adjacent sur hypoténuse).\n\n` +
        `Méthode : on multiplie les deux membres par l'hypoténuse : $${c.adj} = ${c.hyp} \\times \\cos(${ang})$.\n\n` +
        `Calcul : $${c.adj} = ${tex(h)} \\times ${tex(r)} = ${tex(res)}$.\n\n` +
        `Conclusion : $${c.adj} = ${tex(res)}$ ${u}.`,
      canvas: figure(c, { adj: "?", hyp: `${fmt(h)} ${u}` }),
    };
  }

  const a = o.mode === "60" ? 60 : randomInt(15, 72);
  const cosTxt = o.mode === "60" ? "0{,}5" : "";
  const donneeAngle = `$${ang} = ${a}^\\circ$`;

  if (o.cherche === "adj") {
    let h: number;
    let res: number;
    if (o.mode === "60") {
      res = tirerLongueur(2, 15);
      h = arrondir(2 * res, 0.1);
    } else {
      h = tirerLongueur(5, 25);
      res = arrondir(h * cosD(a), pas);
    }
    return {
      text: tourAdj(h, donneeAngle),
      format: "short",
      expected: reponses(res, u),
      comparator: "number_equal",
      explanation:
        `Définition : dans le triangle $${t.nom}$ rectangle en $${t.A}$, l'hypoténuse est $[${c.hyp}]$ et le côté adjacent à $${ang}$ est $[${c.adj}]$ ; $\\cos(${ang}) = \\dfrac{${c.adj}}{${c.hyp}}$.\n\n` +
        `Méthode : on multiplie les deux membres par $${c.hyp}$ : $${c.adj} = ${c.hyp} \\times \\cos(${ang})$.\n\n` +
        (o.mode === "60"
          ? `Calcul : $${c.adj} = ${tex(h)} \\times \\cos(60^\\circ) = ${tex(h)} \\times ${cosTxt} = ${tex(res)}$.\n\n` +
            `Conclusion : $${c.adj} = ${tex(res)}$ ${u}.`
          : `Calcul : $${c.adj} = ${tex(h)} \\times \\cos(${a}^\\circ) \\approx ${tex(res)}$ (calculatrice en mode degrés).\n\n` +
            `Conclusion : $${c.adj} \\approx ${tex(res)}$ ${u}.`),
      canvas: figure(c, { adj: "?", hyp: `${fmt(h)} ${u}`, angle: `${a}°` }),
    };
  }

  // cherche l'hypoténuse
  let d: number;
  let res: number;
  if (o.mode === "60") {
    d = tirerLongueur(2, 15);
    res = arrondir(2 * d, 0.1);
  } else {
    d = tirerLongueur(3, 18);
    res = arrondir(d / cosD(a), pas);
  }
  const text = randomChoice([
    `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, $${c.adj} = ${tex(d)}$ ${u} et ${donneeAngle}. Calcule l'hypoténuse $${c.hyp}$${arr}.`,
    `Le triangle $${t.nom}$ est rectangle en $${t.A}$. Le côté $[${c.adj}]$ mesure ${fmt(d)} ${u} et ${donneeAngle}. Quelle est la longueur $${c.hyp}$${arr} ?`,
    `On sait que ${donneeAngle} et $${c.adj} = ${tex(d)}$ ${u} dans le triangle $${t.nom}$ rectangle en $${t.A}$. Combien mesure $${c.hyp}$${arr} ?`,
    `$${t.nom}$ est un triangle rectangle en $${t.A}$ avec $${c.adj} = ${tex(d)}$ ${u}. Sachant que ${donneeAngle}, détermine $${c.hyp}$${arr}.`,
  ]);
  return {
    text,
    format: "short",
    expected: reponses(res, u),
    comparator: "number_equal",
    explanation:
      `Définition : $\\cos(${ang}) = \\dfrac{${c.adj}}{${c.hyp}}$ : $[${c.adj}]$ est l'adjacent, $[${c.hyp}]$ l'hypoténuse (en face de l'angle droit $${t.A}$).\n\n` +
      `Méthode : on isole l'hypoténuse : $${c.hyp} = \\dfrac{${c.adj}}{\\cos(${ang})}$.\n\n` +
      (o.mode === "60"
        ? `Calcul : $${c.hyp} = \\dfrac{${tex(d)}}{0{,}5} = ${tex(res)}$.\n\n` + `Conclusion : $${c.hyp} = ${tex(res)}$ ${u}.`
        : `Calcul : $${c.hyp} = \\dfrac{${tex(d)}}{\\cos(${a}^\\circ)} \\approx ${tex(res)}$.\n\n` +
          `Conclusion : $${c.hyp} \\approx ${tex(res)}$ ${u} — plus long que $${c.adj}$, comme toute hypoténuse.`),
    canvas: figure(c, { adj: `${fmt(d)} ${u}`, hyp: "?", angle: `${a}°` }),
  };
}

/* ---------- COS_CALCULER_ANGLE ---------- */

/** Un adjacent et une hypoténuse au dixième, l'adjacent nettement plus court. */
function tirerAdjHyp() {
  for (let k = 0; k < 100; k++) {
    const h = tirerLongueur(4, 20);
    const d = arrondir(h * (0.15 + 0.8 * Math.random()), 0.1);
    if (d > 0 && d < h) return { h, d };
  }
  return { h: 10, d: 7 };
}

type ModeAngle = "moitie" | "calc" | "ratio" | "dixieme" | "autre";

function genAngle(mode: ModeAngle) {
  const t = tirerTriangle();
  const c = configurer(t);
  const ang = nomAngle(c);
  const u = randomChoice(UNITES);

  if (mode === "moitie") {
    if (Math.random() < 0.5) {
      const d = tirerLongueur(2, 12);
      const h = arrondir(2 * d, 0.1);
      const text = randomChoice([
        `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, $${c.adj} = ${tex(d)}$ ${u} et $${c.hyp} = ${tex(h)}$ ${u}. Combien mesure l'angle $${ang}$ (en degrés) ?`,
        `Le triangle $${t.nom}$ est rectangle en $${t.A}$ ; son hypoténuse mesure ${fmt(h)} ${u} et $${c.adj} = ${tex(d)}$ ${u}. Quelle est la mesure de $${ang}$ (en degrés) ?`,
        `Sachant que $\\cos(60^\\circ) = 0{,}5$, trouve $${ang}$ (en degrés) dans le triangle $${t.nom}$ rectangle en $${t.A}$ où $${c.adj} = ${tex(d)}$ ${u} et $${c.hyp} = ${tex(h)}$ ${u}.`,
      ]);
      return {
        text,
        format: "short",
        expected: ["60"],
        comparator: "number_equal",
        explanation:
          `Définition : $\\cos(${ang}) = \\dfrac{${c.adj}}{${c.hyp}}$ (adjacent sur hypoténuse).\n\n` +
          `Méthode : on calcule le cosinus, puis on cherche l'angle qui a ce cosinus.\n\n` +
          `Calcul : $\\cos(${ang}) = \\dfrac{${tex(d)}}{${tex(h)}} = 0{,}5$, et $\\cos(60^\\circ) = 0{,}5$.\n\n` +
          `Conclusion : $${ang} = 60^\\circ$ — l'adjacent est la MOITIÉ de l'hypoténuse.`,
        canvas: figure(c, { adj: `${fmt(d)} ${u}`, hyp: `${fmt(h)} ${u}`, angle: "?" }),
      };
    }
    const { r, h, d } = tirerRapport();
    const text = randomChoice([
      `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, $${c.adj} = ${tex(d)}$ ${u} et $${c.hyp} = ${tex(h)}$ ${u}. Pour trouver $${ang}$, on calcule d'abord $\\cos(${ang})$. Quelle est sa valeur décimale ?`,
      `Première étape pour trouver l'angle $${ang}$ du triangle $${t.nom}$, rectangle en $${t.A}$ : calcule $\\cos(${ang})$, sachant que $${c.hyp} = ${tex(h)}$ ${u} et $${c.adj} = ${tex(d)}$ ${u}.`,
      `Quel nombre faut-il taper après la touche $\\cos^{-1}$ pour obtenir $${ang}$ dans le triangle $${t.nom}$ rectangle en $${t.A}$, où $${c.adj} = ${tex(d)}$ ${u} et $${c.hyp} = ${tex(h)}$ ${u} ? Donne-le en écriture décimale.`,
    ]);
    return {
      text,
      format: "short",
      expected: reponses(r),
      comparator: "number_equal",
      explanation:
        `Définition : $\\cos(${ang}) = \\dfrac{${c.adj}}{${c.hyp}}$ (adjacent sur hypoténuse).\n\n` +
        `Méthode : on divise l'adjacent par l'hypoténuse ; c'est ce nombre qu'on donne ensuite à la touche $\\cos^{-1}$.\n\n` +
        `Calcul : $\\dfrac{${tex(d)}}{${tex(h)}} = ${tex(r)}$.\n\n` +
        `Conclusion : $\\cos(${ang}) = ${tex(r)}$, puis $${ang} = \\cos^{-1}(${tex(r)}) \\approx ${Math.round(acosD(r))}^\\circ$.`,
      canvas: figure(c, { adj: `${fmt(d)} ${u}`, hyp: `${fmt(h)} ${u}`, angle: "?" }),
    };
  }

  if (mode === "ratio") {
    const r = randomChoice(RAPPORTS);
    const res = Math.round(acosD(r));
    const text = randomChoice([
      `On a trouvé $\\cos(${ang}) = ${tex(r)}$ dans le triangle $${t.nom}$ rectangle en $${t.A}$. Combien mesure $${ang}$ (en degrés, au degré près) ?`,
      `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, le cosinus de l'angle $${ang}$ vaut ${fmt(r)}. Calcule $${ang}$ au degré près.`,
      `Sachant que $\\cos(${ang}) = ${tex(r)}$ dans le triangle $${t.nom}$, rectangle en $${t.A}$, donne la mesure de l'angle $${ang}$ au degré près.`,
      `Pour le triangle $${t.nom}$ rectangle en $${t.A}$, la calculatrice a donné $\\cos(${ang}) = ${tex(r)}$. Quelle mesure trouve-t-on pour $${ang}$, au degré près ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [String(res)],
      comparator: "number_equal",
      explanation:
        `Définition : pour retrouver un angle à partir de son cosinus, on utilise la touche $\\cos^{-1}$ (calculatrice en degrés).\n\n` +
        `Méthode : $${ang} = \\cos^{-1}(${tex(r)})$.\n\n` +
        `Calcul : $\\cos^{-1}(${tex(r)}) \\approx ${tex(arrondir(acosD(r), 0.01))}^\\circ$.\n\n` +
        `Conclusion : $${ang} \\approx ${res}^\\circ$ au degré près.`,
      canvas: figure(c, { angle: "?" }),
    };
  }

  const { h, d } = tirerAdjHyp();
  const exact = acosD(d / h);

  if (mode === "autre") {
    const res = Math.round(90 - exact);
    const cX = configurer(t, c.angleAt === "B" ? "C" : "B");
    const text = randomChoice([
      `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, $${c.adj} = ${tex(d)}$ ${u} et $${c.hyp} = ${tex(h)}$ ${u}. Calcule $\\widehat{${c.X}}$ au degré près.`,
      `Le triangle $${t.nom}$ est rectangle en $${t.A}$, avec $${c.hyp} = ${tex(h)}$ ${u} et $${c.adj} = ${tex(d)}$ ${u}. Quelle est la mesure de l'angle $\\widehat{${c.X}}$, au degré près ?`,
      `On connaît $${c.adj} = ${tex(d)}$ ${u} et $${c.hyp} = ${tex(h)}$ ${u} dans le triangle $${t.nom}$ rectangle en $${t.A}$. Détermine l'angle $\\widehat{${c.X}}$ au degré près.`,
    ]);
    return {
      text,
      format: "short",
      expected: [String(res)],
      comparator: "number_equal",
      explanation:
        `Définition : $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$, et les deux angles aigus d'un triangle rectangle ont pour somme $90^\\circ$.\n\n` +
        `Méthode : $[${c.adj}]$ est adjacent à $\\widehat{${c.S}}$, pas à $\\widehat{${c.X}}$. On calcule donc d'abord $\\widehat{${c.S}}$ avec le cosinus, puis $\\widehat{${c.X}} = 90^\\circ - \\widehat{${c.S}}$.\n\n` +
        `Calcul : $\\cos(\\widehat{${c.S}}) = \\dfrac{${tex(d)}}{${tex(h)}}$, donc $\\widehat{${c.S}} \\approx ${tex(arrondir(exact, 0.1))}^\\circ$ ; puis $\\widehat{${c.X}} \\approx 90 - ${tex(arrondir(exact, 0.1))} = ${tex(arrondir(90 - arrondir(exact, 0.1), 0.1))}^\\circ$.\n\n` +
        `Conclusion : $\\widehat{${c.X}} \\approx ${res}^\\circ$ au degré près.`,
      canvas: figure(cX, { opp: `${fmt(d)} ${u}`, hyp: `${fmt(h)} ${u}`, angle: "?" }),
    };
  }

  const dixieme = mode === "dixieme";
  const res = dixieme ? arrondir(exact, 0.1) : Math.round(exact);
  const arrDeg = dixieme ? " (en degrés, au dixième de degré près)" : " (en degrés, au degré près)";
  const text = randomChoice([
    `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, $${c.adj} = ${tex(d)}$ ${u} et $${c.hyp} = ${tex(h)}$ ${u}. Calcule $${ang}$${arrDeg}.`,
    `Le triangle $${t.nom}$ est rectangle en $${t.A}$, avec $${c.hyp} = ${tex(h)}$ ${u} et $${c.adj} = ${tex(d)}$ ${u}. Quelle est la mesure de l'angle $${ang}$${arrDeg} ?`,
    `On mesure $${c.adj} = ${tex(d)}$ ${u} et $${c.hyp} = ${tex(h)}$ ${u} sur le triangle $${t.nom}$, rectangle en $${t.A}$. Détermine $${ang}$${arrDeg}.`,
    `$${t.nom}$ est un triangle rectangle en $${t.A}$ dont l'hypoténuse mesure ${fmt(h)} ${u}. Sachant que $${c.adj} = ${tex(d)}$ ${u}, combien mesure l'angle $${ang}$${arrDeg} ?`,
  ]);
  return {
    text,
    format: "short",
    expected: reponses(res),
    comparator: "number_equal",
    explanation:
      `Définition : $\\cos(${ang}) = \\dfrac{${c.adj}}{${c.hyp}}$ : $[${c.adj}]$ est l'adjacent, $[${c.hyp}]$ l'hypoténuse.\n\n` +
      `Méthode : on calcule le rapport, puis on applique la touche $\\cos^{-1}$ (calculatrice en degrés).\n\n` +
      `Calcul : $\\cos(${ang}) = \\dfrac{${tex(d)}}{${tex(h)}}$, donc $${ang} = \\cos^{-1}\\!\\left(\\dfrac{${tex(d)}}{${tex(h)}}\\right) \\approx ${tex(arrondir(exact, 0.01))}^\\circ$.\n\n` +
      `Conclusion : $${ang} \\approx ${tex(res)}^\\circ$${dixieme ? " au dixième de degré près" : " au degré près"}.`,
    canvas: figure(c, { adj: `${fmt(d)} ${u}`, hyp: `${fmt(h)} ${u}`, angle: "?" }),
  };
}

/* ---------- COS_PROBLEME : les objets réels ---------- */

/**
 * Un contexte = un objet incliné (l'hypoténuse) dans un triangle rectangle.
 * pts = [sommet de l'angle étudié, sommet de l'angle droit, troisième sommet].
 * `vertical` : l'angle étudié est en haut (avec un mur, un mât, la verticale),
 * l'adjacent est alors le côté vertical du canvas.
 * `grand` : longueurs de plusieurs centaines de mètres, arrondies au mètre.
 */
type Ctx = {
  intro: string;
  obj: string;
  un: string;
  deObj: string;
  adj: string;
  opp: string;
  angle: string;
  pts: [string, string, string];
  h: [number, number];
  a: [number, number];
  vertical?: boolean;
  grand?: boolean;
  /** Pente très douce : l'adjacent arrondi égale presque l'hypoténuse, donc
   *  ni l'angle ni l'hypoténuse ne se calculent proprement à partir de lui. */
  douce?: boolean;
};

const CONTEXTES: Ctx[] = [
  {
    intro: "Une échelle est posée contre un mur vertical, sur un sol horizontal.",
    obj: "l'échelle", un: "une échelle", deObj: "de l'échelle",
    adj: "la distance entre le pied de l'échelle et le mur",
    opp: "la hauteur atteinte par le haut de l'échelle",
    angle: "l'angle formé par l'échelle et le sol",
    pts: ["le pied de l'échelle", "le pied du mur", "le haut de l'échelle"],
    h: [3, 8], a: [60, 78],
  },
  {
    intro: "Une échelle est posée contre un mur vertical, sur un sol horizontal.",
    obj: "l'échelle", un: "une échelle", deObj: "de l'échelle",
    adj: "la hauteur atteinte par le haut de l'échelle",
    opp: "la distance entre le pied de l'échelle et le mur",
    angle: "l'angle formé par l'échelle et le mur",
    pts: ["le haut de l'échelle", "le pied du mur", "le pied de l'échelle"],
    h: [3, 8], a: [12, 30], vertical: true,
  },
  {
    intro: "Dans une aire de jeux, la glissière d'un toboggan descend en ligne droite jusqu'au sol.",
    obj: "la glissière", un: "une glissière", deObj: "de la glissière",
    adj: "la longueur au sol couverte par la glissière",
    opp: "la hauteur du haut de la glissière",
    angle: "l'angle formé par la glissière et le sol",
    pts: ["le bas de la glissière", "le point du sol situé sous le haut de la glissière", "le haut de la glissière"],
    h: [2, 5], a: [30, 45],
  },
  {
    intro: "Au skatepark, un module a une rampe droite qui descend jusqu'au sol.",
    obj: "la rampe", un: "une rampe", deObj: "de la rampe",
    adj: "la longueur au sol couverte par la rampe",
    opp: "la hauteur du module",
    angle: "l'angle formé par la rampe et le sol",
    pts: ["le bas de la rampe", "le point du sol situé sous le haut de la rampe", "le haut de la rampe"],
    h: [2, 5], a: [15, 35],
  },
  {
    intro: "Devant une médiathèque, une rampe d'accès permet aux fauteuils roulants de monter jusqu'à la porte.",
    obj: "la rampe d'accès", un: "une rampe d'accès", deObj: "de la rampe d'accès",
    adj: "la distance horizontale couverte par la rampe d'accès",
    opp: "la hauteur à franchir",
    angle: "l'angle formé par la rampe d'accès et l'horizontale",
    pts: ["le bas de la rampe", "le point situé sous le haut de la rampe, au niveau du sol", "le haut de la rampe"],
    h: [5, 12], a: [3, 6], douce: true,
  },
  {
    intro: "Sur un lac, un tremplin de ski nautique sort de l'eau en ligne droite.",
    obj: "le tremplin", un: "un tremplin", deObj: "du tremplin",
    adj: "la longueur du tremplin mesurée à la surface de l'eau",
    opp: "la hauteur du haut du tremplin au-dessus de l'eau",
    angle: "l'angle formé par le tremplin et la surface de l'eau",
    pts: ["le bas du tremplin", "le point de la surface situé sous le haut du tremplin", "le haut du tremplin"],
    h: [4, 8], a: [12, 25],
  },
  {
    intro: "Le câble d'un téléski monte en ligne droite du bas jusqu'au haut de la piste.",
    obj: "le câble", un: "un câble", deObj: "du câble",
    adj: "la distance horizontale entre le départ et l'arrivée",
    opp: "le dénivelé entre le départ et l'arrivée",
    angle: "l'angle formé par le câble et l'horizontale",
    pts: ["le départ du téléski", "le point situé sous l'arrivée, au niveau du départ", "l'arrivée du téléski"],
    h: [300, 900], a: [15, 30], grand: true,
  },
  {
    intro: "Vu de face, le toit d'une maison a deux pans droits et symétriques.",
    obj: "le pan du toit", un: "un pan de toit", deObj: "du pan du toit",
    adj: "la demi-largeur de la maison",
    opp: "la hauteur du toit",
    angle: "l'angle formé par le pan du toit et l'horizontale",
    pts: ["le bas du pan", "le point situé sous le faîte, au niveau du bas du pan", "le faîte du toit"],
    h: [4, 8], a: [25, 45],
  },
  {
    intro: "Le câble d'une tyrolienne est tendu en ligne droite entre une plateforme de départ et le point d'arrivée, plus bas.",
    obj: "le câble", un: "un câble", deObj: "du câble",
    adj: "la distance horizontale entre le départ et l'arrivée",
    opp: "le dénivelé de la tyrolienne",
    angle: "l'angle formé par le câble et l'horizontale",
    pts: ["le point d'arrivée", "le point situé sous le départ, au niveau de l'arrivée", "le point de départ"],
    h: [60, 300], a: [5, 15], grand: true,
  },
  {
    intro: "Une enfant fait voler un cerf-volant ; le fil est bien tendu et on néglige la taille de l'enfant.",
    obj: "le fil", un: "un fil", deObj: "du fil",
    adj: "la distance au sol entre l'enfant et le point situé juste sous le cerf-volant",
    opp: "la hauteur du cerf-volant",
    angle: "l'angle formé par le fil et le sol",
    pts: ["la main de l'enfant", "le point du sol situé sous le cerf-volant", "le cerf-volant"],
    h: [20, 60], a: [30, 60],
  },
  {
    intro: "Une enfant fait voler un cerf-volant ; le fil est bien tendu et on néglige la taille de l'enfant.",
    obj: "le fil", un: "un fil", deObj: "du fil",
    adj: "la hauteur du cerf-volant",
    opp: "la distance au sol entre l'enfant et le point situé juste sous le cerf-volant",
    angle: "l'angle formé par le fil et la verticale",
    pts: ["le cerf-volant", "le point du sol situé sous le cerf-volant", "la main de l'enfant"],
    h: [20, 60], a: [30, 55], vertical: true,
  },
  {
    intro: "Un hauban (un câble tendu) relie le sommet d'un mât vertical à un point d'ancrage au sol.",
    obj: "le hauban", un: "un hauban", deObj: "du hauban",
    adj: "la distance entre le pied du mât et le point d'ancrage",
    opp: "la hauteur du mât",
    angle: "l'angle formé par le hauban et le sol",
    pts: ["le point d'ancrage", "le pied du mât", "le sommet du mât"],
    h: [8, 25], a: [45, 70],
  },
  {
    intro: "Un hauban (un câble tendu) relie le sommet d'un mât vertical à un point d'ancrage au sol.",
    obj: "le hauban", un: "un hauban", deObj: "du hauban",
    adj: "la hauteur du mât",
    opp: "la distance entre le pied du mât et le point d'ancrage",
    angle: "l'angle formé par le hauban et le mât",
    pts: ["le sommet du mât", "le pied du mât", "le point d'ancrage"],
    h: [8, 25], a: [20, 45], vertical: true,
  },
  {
    intro: "Dans une gare, un escalator monte en ligne droite d'un niveau à l'autre.",
    obj: "l'escalator", un: "un escalator", deObj: "de l'escalator",
    adj: "la distance horizontale entre le bas et le haut de l'escalator",
    opp: "la hauteur entre les deux niveaux",
    angle: "l'angle formé par l'escalator et le sol",
    pts: ["le bas de l'escalator", "le point situé sous le haut de l'escalator, au niveau du sol", "le haut de l'escalator"],
    h: [8, 20], a: [27, 35],
  },
  {
    intro: "Un drone décolle et s'élève en ligne droite.",
    obj: "sa trajectoire", un: "une trajectoire", deObj: "de sa trajectoire",
    adj: "la distance au sol entre le point de décollage et le point situé juste sous le drone",
    opp: "l'altitude du drone",
    angle: "l'angle formé par la trajectoire et le sol",
    pts: ["le point de décollage", "le point du sol situé sous le drone", "le drone"],
    h: [40, 150], a: [20, 60], grand: true,
  },
  {
    intro: "Pour monter à bord d'un bateau, on pose une passerelle droite entre le quai et le pont.",
    obj: "la passerelle", un: "une passerelle", deObj: "de la passerelle",
    adj: "la distance horizontale entre les deux extrémités de la passerelle",
    opp: "la différence de hauteur entre le quai et le pont",
    angle: "l'angle formé par la passerelle et l'horizontale",
    pts: ["l'extrémité posée sur le quai", "le point situé sous l'autre extrémité, au niveau du quai", "l'extrémité posée sur le pont"],
    h: [2, 5], a: [10, 25],
  },
  {
    intro: "Sur le sentier qui monte au Piton des Neiges, une portion grimpe en ligne droite.",
    obj: "cette portion", un: "une portion", deObj: "de cette portion",
    adj: "la distance horizontale correspondante, celle qu'on mesure sur la carte",
    opp: "le dénivelé de cette portion",
    angle: "l'angle de la pente avec l'horizontale",
    pts: ["le bas de la portion", "le point situé sous le haut de la portion, au niveau du bas", "le haut de la portion"],
    h: [200, 600], a: [8, 20], grand: true,
  },
  {
    intro: "Sur un chantier, un tapis roulant droit monte les gravats jusqu'au bord d'une benne.",
    obj: "le tapis", un: "un tapis", deObj: "du tapis",
    adj: "la distance au sol entre les deux extrémités du tapis",
    opp: "la hauteur du haut du tapis",
    angle: "l'angle formé par le tapis et le sol",
    pts: ["le bas du tapis", "le point du sol situé sous le haut du tapis", "le haut du tapis"],
    h: [3, 8], a: [15, 30],
  },
];

type Inconnue = "adj" | "hyp" | "angle" | "cosDonne" | "opp2" | "angle2" | "opp3";

function genProbleme(inc: Inconnue): any {
  for (let essai = 0; essai < 50; essai++) {
    const ctx = randomChoice(CONTEXTES);
    // ⛔ 08/10/2026 (trouvé par le correcteur) : avec une pente de 3°, le cosinus
    // arrondi au centième vaut 1 — « cos(B) = 1 » n'est pas un angle aigu.
    if (ctx.douce && (inc === "angle" || inc === "hyp" || inc === "cosDonne")) continue;
    const t = tirerTriangle();
    const c = configurer(t, ctx.vertical ? "C" : "B");
    const S = c.S;
    const pas = ctx.grand ? 1 : 0.1;
    const arr = ctx.grand ? " (en m, au mètre près)" : " (en m, au dixième près)";
    const h = ctx.grand
      ? randomInt(ctx.h[0] / 10, ctx.h[1] / 10) * 10
      : tirerLongueur(ctx.h[0], ctx.h[1]);
    const a = randomInt(ctx.a[0], ctx.a[1]);
    const modele = `On modélise la situation par le triangle $${t.nom}$ rectangle en $${t.A}$ : $${S}$ est ${ctx.pts[0]}, $${t.A}$ ${ctx.pts[1]} et $${c.X}$ ${ctx.pts[2]}.`;
    const Obj = cap(ctx.obj);
    const Ang = cap(ctx.angle);
    const Adj = cap(ctx.adj);
    const def =
      `Définition : dans le triangle $${t.nom}$ rectangle en $${t.A}$, l'hypoténuse $[${c.hyp}]$ représente ${ctx.obj}, ` +
      `et le côté $[${c.adj}]$, adjacent à l'angle $\\widehat{${S}}$, représente ${ctx.adj}` +
      (inc === "opp2" || inc === "angle2" || inc === "opp3" ? ` ; le côté $[${c.opp}]$ représente ${ctx.opp}.` : ".");
    // Une longueur se donne en mètres (« 3,1 m ») ; un angle, en degrés sans unité écrite.
    const enM = !(inc === "angle" || inc === "angle2");
    const finir = (question: string, res: number, methode: string, calcul: string, conclusion: string, canvas: any) => ({
      text: `${ctx.intro} ${modele} ${question}`,
      format: "short",
      expected: reponses(res, enM ? "m" : ""),
      comparator: "number_equal",
      explanation: `${def}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`,
      canvas,
    });

    if (inc === "adj") {
      const res = arrondir(h * cosD(a), pas);
      const q = randomChoice([
        `${Obj} mesure ${fmt(h)} m et ${ctx.angle} vaut $${a}^\\circ$. Calcule ${ctx.adj}${arr}.`,
        `${Ang} vaut $${a}^\\circ$ et ${ctx.obj} mesure ${fmt(h)} m. Que vaut ${ctx.adj}${arr} ?`,
        `Calcule ${ctx.adj}${arr}, sachant que ${ctx.obj} mesure ${fmt(h)} m et que ${ctx.angle} vaut $${a}^\\circ$.`,
        `On mesure ${ctx.obj} : ${fmt(h)} m. ${Ang} est de $${a}^\\circ$. Détermine ${ctx.adj}${arr}.`,
      ]);
      return finir(
        q,
        res,
        `$${c.adj} = ${c.hyp} \\times \\cos(\\widehat{${S}})$ (adjacent = hypoténuse × cosinus).`,
        `$${c.adj} = ${tex(h)} \\times \\cos(${a}^\\circ) \\approx ${tex(res)}$.`,
        `${ctx.adj} vaut environ ${fmt(res)} m.`,
        figure(c, { hyp: `${fmt(h)} m`, adj: "?", angle: `${a}°` }),
      );
    }

    if (inc === "cosDonne") {
      const r = arrondir(cosD(a), 0.01);
      // Une pente très faible (tyrolienne à 5°) donnerait aussi « cos = 1 ».
      if (r >= 0.995) continue;
      const res = arrondir(h * r, pas);
      const q = randomChoice([
        `${Obj} mesure ${fmt(h)} m et, pour ${ctx.angle}, on prend $\\cos(\\widehat{${S}}) = ${tex(r)}$. Calcule ${ctx.adj}${arr}.`,
        `On donne $\\cos(\\widehat{${S}}) = ${tex(r)}$, où $\\widehat{${S}}$ est ${ctx.angle}, et ${ctx.obj} mesure ${fmt(h)} m. Que vaut ${ctx.adj}${arr} ?`,
        `Sachant que ${ctx.obj} mesure ${fmt(h)} m et que $\\cos(\\widehat{${S}}) = ${tex(r)}$ (c'est ${ctx.angle}), détermine ${ctx.adj}${arr}.`,
      ]);
      return finir(
        q,
        res,
        `$${c.adj} = ${c.hyp} \\times \\cos(\\widehat{${S}})$, avec la valeur du cosinus donnée.`,
        `$${c.adj} = ${tex(h)} \\times ${tex(r)} \\approx ${tex(res)}$.`,
        `${ctx.adj} vaut environ ${fmt(res)} m.`,
        figure(c, { hyp: `${fmt(h)} m`, adj: "?" }),
      );
    }

    if (inc === "hyp") {
      const d = arrondir(h * cosD(a), pas);
      if (d <= 0) continue;
      const res = arrondir(d / cosD(a), pas);
      const q = randomChoice([
        `${Adj} est de ${fmt(d)} m et ${ctx.angle} vaut $${a}^\\circ$. Calcule la longueur ${ctx.deObj}${arr}.`,
        `On mesure ${ctx.adj} : ${fmt(d)} m. ${Ang} vaut $${a}^\\circ$. Que vaut la longueur ${ctx.deObj}${arr} ?`,
        `Sachant que ${ctx.angle} mesure $${a}^\\circ$ et que ${ctx.adj} vaut ${fmt(d)} m, détermine la longueur ${ctx.deObj}${arr}.`,
      ]);
      return finir(
        q,
        res,
        `$\\cos(\\widehat{${S}}) = \\dfrac{${c.adj}}{${c.hyp}}$, donc $${c.hyp} = \\dfrac{${c.adj}}{\\cos(\\widehat{${S}})}$.`,
        `$${c.hyp} = \\dfrac{${tex(d)}}{\\cos(${a}^\\circ)} \\approx ${tex(res)}$.`,
        `la longueur ${ctx.deObj} est d'environ ${fmt(res)} m.`,
        figure(c, { adj: `${fmt(d)} m`, hyp: "?", angle: `${a}°` }),
      );
    }

    if (inc === "angle") {
      const d = arrondir(h * cosD(a), pas);
      if (d <= 0 || d >= h) continue;
      const exact = acosD(d / h);
      const res = Math.round(exact);
      // L'arrondi des longueurs ne doit pas déplacer l'angle hors du plausible.
      if (Math.abs(res - a) > 2) continue;
      const q = randomChoice([
        `${Obj} mesure ${fmt(h)} m et ${ctx.adj} est de ${fmt(d)} m. Calcule ${ctx.angle} au degré près.`,
        `On mesure ${ctx.adj} : ${fmt(d)} m, pour ${ctx.un} de ${fmt(h)} m. Que vaut ${ctx.angle}, au degré près ?`,
        `Sachant que ${ctx.obj} mesure ${fmt(h)} m et que ${ctx.adj} vaut ${fmt(d)} m, détermine ${ctx.angle} au degré près.`,
      ]);
      return finir(
        q,
        res,
        `$\\cos(\\widehat{${S}}) = \\dfrac{${c.adj}}{${c.hyp}}$, puis la touche $\\cos^{-1}$ (calculatrice en degrés).`,
        `$\\cos(\\widehat{${S}}) = \\dfrac{${tex(d)}}{${tex(h)}}$, donc $\\widehat{${S}} \\approx ${tex(arrondir(exact, 0.1))}^\\circ$.`,
        `${ctx.angle} mesure environ $${res}^\\circ$.`,
        figure(c, { adj: `${fmt(d)} m`, hyp: `${fmt(h)} m`, angle: "?" }),
      );
    }

    if (inc === "opp2") {
      const adjE = h * cosD(a);
      const oE = Math.sqrt(h * h - adjE * adjE);
      const res = arrondir(oE, pas);
      if (res <= 0) continue;
      const q = randomChoice([
        `${Obj} mesure ${fmt(h)} m et ${ctx.angle} vaut $${a}^\\circ$. Calcule ${ctx.opp}${arr}.`,
        `${Ang} est de $${a}^\\circ$ et ${ctx.obj} mesure ${fmt(h)} m. Que vaut ${ctx.opp}${arr} ? Commence par le cosinus.`,
        `Sachant que ${ctx.obj} mesure ${fmt(h)} m et que ${ctx.angle} vaut $${a}^\\circ$, détermine ${ctx.opp}${arr}.`,
      ]);
      return finir(
        q,
        res,
        `$[${c.opp}]$ n'est pas l'adjacent : on calcule d'abord $${c.adj}$ avec le cosinus, puis $${c.opp}$ avec le théorème de Pythagore (en gardant la valeur exacte de $${c.adj}$ dans la calculatrice).`,
        `$${c.adj} = ${tex(h)} \\times \\cos(${a}^\\circ) \\approx ${tex(arrondir(adjE, 0.01))}$ ; puis $${c.opp} = \\sqrt{${c.hyp}^2 - ${c.adj}^2} \\approx \\sqrt{${tex(h)}^2 - ${tex(arrondir(adjE, 0.01))}^2} \\approx ${tex(res)}$.`,
        `${ctx.opp} vaut environ ${fmt(res)} m.`,
        figure(c, { hyp: `${fmt(h)} m`, opp: "?", angle: `${a}°` }),
      );
    }

    if (inc === "angle2") {
      const d = arrondir(h * cosD(a), pas);
      const o = arrondir(h * Math.sin(degToRad(a)), pas);
      if (d <= 0 || o <= 0) continue;
      const hE = Math.sqrt(d * d + o * o);
      const exact = acosD(d / hE);
      const res = Math.round(exact);
      if (Math.abs(res - a) > 2) continue;
      const q = randomChoice([
        `${Adj} est de ${fmt(d)} m et ${ctx.opp} est de ${fmt(o)} m. Calcule ${ctx.angle} au degré près.`,
        `On mesure ${ctx.adj} : ${fmt(d)} m, et ${ctx.opp} : ${fmt(o)} m. Que vaut ${ctx.angle}, au degré près ?`,
        `Sachant que ${ctx.opp} vaut ${fmt(o)} m et que ${ctx.adj} vaut ${fmt(d)} m, détermine ${ctx.angle} au degré près.`,
      ]);
      return finir(
        q,
        res,
        `le cosinus a besoin de l'hypoténuse, qu'on ne connaît pas : on la calcule d'abord avec le théorème de Pythagore, puis $\\cos(\\widehat{${S}}) = \\dfrac{${c.adj}}{${c.hyp}}$ et la touche $\\cos^{-1}$.`,
        `$${c.hyp} = \\sqrt{${tex(d)}^2 + ${tex(o)}^2} \\approx ${tex(arrondir(hE, 0.01))}$ ; $\\cos(\\widehat{${S}}) \\approx \\dfrac{${tex(d)}}{${tex(arrondir(hE, 0.01))}}$, donc $\\widehat{${S}} \\approx ${tex(arrondir(exact, 0.1))}^\\circ$.`,
        `${ctx.angle} mesure environ $${res}^\\circ$.`,
        figure(c, { adj: `${fmt(d)} m`, opp: `${fmt(o)} m`, angle: "?" }),
      );
    }

    // opp3 : l'adjacent et l'angle donnés → l'hypoténuse, puis le côté opposé.
    const d = arrondir(h * cosD(a), pas);
    if (d <= 0) continue;
    const hE = d / cosD(a);
    const oE = Math.sqrt(hE * hE - d * d);
    const res = arrondir(oE, pas);
    if (res <= 0) continue;
    const q = randomChoice([
      `${Adj} est de ${fmt(d)} m et ${ctx.angle} vaut $${a}^\\circ$. Calcule ${ctx.opp}${arr}.`,
      `On mesure ${ctx.adj} : ${fmt(d)} m. ${Ang} vaut $${a}^\\circ$. Que vaut ${ctx.opp}${arr} ?`,
      `Sachant que ${ctx.angle} mesure $${a}^\\circ$ et que ${ctx.adj} vaut ${fmt(d)} m, détermine ${ctx.opp}${arr}.`,
    ]);
    return finir(
      q,
      res,
      `on calcule d'abord l'hypoténuse avec le cosinus, puis $${c.opp}$ avec le théorème de Pythagore (en gardant la valeur exacte de $${c.hyp}$ dans la calculatrice).`,
      `$${c.hyp} = \\dfrac{${tex(d)}}{\\cos(${a}^\\circ)} \\approx ${tex(arrondir(hE, 0.01))}$ ; puis $${c.opp} = \\sqrt{${c.hyp}^2 - ${c.adj}^2} \\approx \\sqrt{${tex(arrondir(hE, 0.01))}^2 - ${tex(d)}^2} \\approx ${tex(res)}$.`,
      `${ctx.opp} vaut environ ${fmt(res)} m.`,
      figure(c, { adj: `${fmt(d)} m`, opp: "?", angle: `${a}°` }),
    );
  }
  throw new Error("genProbleme : aucun tirage valable");
}

/* ---------- COS_DEFI ---------- */

/** ★4 : une affirmation chiffrée sur le cosinus, vraie ou fausse. */
function genDefiAffirmation() {
  const t = tirerTriangle();
  const c = configurer(t);
  const ang = nomAngle(c);
  const u = randomChoice(UNITES);
  const tr = tirerTriplet();
  const [a, o] = Math.random() < 0.5 ? [tr.p, tr.q] : [tr.q, tr.p];
  const h = tr.r;
  const ecrire = (n: number, d: number) =>
    Number.isInteger(arrondir((n / d) * 100, 0.01)) ? tex(arrondir(n / d, 0.01)) : `\\dfrac{${n}}{${d}}`;
  const sorte = randomChoice(["juste", "juste", "oppose", "retournee", "cotes"]);
  const val =
    sorte === "juste" ? ecrire(a, h) : sorte === "oppose" ? ecrire(o, h) : sorte === "retournee" ? ecrire(h, a) : ecrire(a, o);
  const el = randomChoice(PRENOMS);
  const liste = listeLongueurs([[c.adj, a], [c.opp, o], [c.hyp, h]], u);
  const tour = randomChoice([
    { text: `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, on a ${liste}. ${el.p} affirme que $\\cos(${ang}) = ${val}$. A-t-${el.il} raison ?`, ch: ["oui", "non"] },
    { text: `${el.p} étudie le triangle $${t.nom}$, rectangle en $${t.A}$, où ${liste}. ${cap(el.il)} écrit : $\\cos(${ang}) = ${val}$. Cette égalité est-elle juste ?`, ch: ["oui", "non"] },
    { text: `Le triangle $${t.nom}$ est rectangle en $${t.A}$, avec ${liste}. Vrai ou faux : $\\cos(${ang}) = ${val}$ ?`, ch: ["vrai", "faux"] },
  ]);
  const juste = sorte === "juste";
  const pourquoi: Record<string, string> = {
    juste: "c'est bien l'adjacent sur l'hypoténuse.",
    oppose: `on a pris le côté opposé $${c.opp}$ au lieu de l'adjacent $${c.adj}$.`,
    retournee: "la fraction est retournée : elle dépasse 1, ce qu'un cosinus ne fait jamais.",
    cotes: `on a divisé par $${c.opp}$, qui n'est pas l'hypoténuse.`,
  };
  return {
    text: tour.text,
    format: "qcm",
    choices: tour.ch,
    expected: [juste ? tour.ch[0] : tour.ch[1]],
    comparator: "mcq_exact",
    explanation:
      "Définition : $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      `Méthode : l'hypoténuse est en face de l'angle droit $${t.A}$ : $${c.hyp} = ${h}$ ${u} ; l'adjacent à $${ang}$ est $${c.adj} = ${a}$ ${u}.\n\n` +
      `Calcul : $\\cos(${ang}) = \\dfrac{${a}}{${h}}${ecrire(a, h).includes("dfrac") ? "" : ` = ${ecrire(a, h)}`}$. Pour l'affirmation : ${pourquoi[sorte]}\n\n` +
      `Conclusion : ${juste ? `${tour.ch[0]}, l'égalité est juste.` : `${tour.ch[1]}, l'égalité est fausse.`}`,
    canvas: figure(c, { adj: `${a} ${u}`, opp: `${o} ${u}`, hyp: `${h} ${u}` }),
  };
}

/** ★4 : Pythagore donne l'hypoténuse, puis le cosinus en écriture décimale. */
function genDefiPythagoreCos() {
  const t = tirerTriangle();
  const c = configurer(t);
  const ang = nomAngle(c);
  const u = randomChoice(UNITES);
  const base = randomChoice<[number, number, number]>([[3, 4, 5], [3, 4, 5], [7, 24, 25]]);
  const k = base[2] === 5 ? randomInt(1, 9) : randomInt(1, 2);
  const [p, q, r] = base.map((x) => x * k);
  const [a, o] = Math.random() < 0.5 ? [p, q] : [q, p];
  const res = arrondir(a / r, 0.01);
  const text = randomChoice([
    `Le triangle $${t.nom}$ est rectangle en $${t.A}$, avec $${c.adj} = ${a}$ ${u} et $${c.opp} = ${o}$ ${u}. Calcule l'hypoténuse, puis donne la valeur décimale de $\\cos(${ang})$.`,
    `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, les côtés de l'angle droit mesurent $${c.adj} = ${a}$ ${u} et $${c.opp} = ${o}$ ${u}. Que vaut $\\cos(${ang})$, en écriture décimale ?`,
    `On connaît seulement $${c.opp} = ${o}$ ${u} et $${c.adj} = ${a}$ ${u} dans le triangle $${t.nom}$ rectangle en $${t.A}$. Quelle est la valeur décimale de $\\cos(${ang})$ ?`,
  ]);
  return {
    text,
    format: "short",
    expected: reponses(res),
    comparator: "number_equal",
    explanation:
      "Définition : $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ : il faut l'hypoténuse.\n\n" +
      `Méthode : le théorème de Pythagore donne l'hypoténuse $${c.hyp}$, puis on divise l'adjacent $${c.adj}$ par elle.\n\n` +
      `Calcul : $${c.hyp}^2 = ${a}^2 + ${o}^2 = ${a * a} + ${o * o} = ${r * r}$, donc $${c.hyp} = ${r}$ ${u} ; $\\cos(${ang}) = \\dfrac{${a}}{${r}} = ${tex(res)}$.\n\n` +
      `Conclusion : $\\cos(${ang}) = ${tex(res)}$.`,
    canvas: figure(c, { adj: `${a} ${u}`, opp: `${o} ${u}`, hyp: "?" }),
  };
}

const RECTANGLES: { objet: string; L: [number, number]; u: string; coin: string }[] = [
  { objet: "un écran rectangulaire", L: [30, 160], u: "cm", coin: "trois coins de l'écran" },
  { objet: "une tablette rectangulaire", L: [15, 35], u: "cm", coin: "trois coins de la tablette" },
  { objet: "un terrain de jeu rectangulaire", L: [20, 120], u: "m", coin: "trois coins du terrain" },
  { objet: "une porte vitrée rectangulaire", L: [150, 250], u: "cm", coin: "trois coins de la vitre" },
  { objet: "un panneau solaire rectangulaire", L: [100, 200], u: "cm", coin: "trois coins du panneau" },
  { objet: "un champ rectangulaire", L: [60, 400], u: "m", coin: "trois coins du champ" },
  { objet: "une table rectangulaire", L: [80, 240], u: "cm", coin: "trois coins de la table" },
  { objet: "un bassin rectangulaire", L: [8, 50], u: "m", coin: "trois coins du bassin" },
  { objet: "un drapeau rectangulaire", L: [60, 180], u: "cm", coin: "trois coins du drapeau" },
];

/** ★5 : deux côtés de l'angle droit → l'angle (Pythagore puis cosinus). */
function genDefiCombine() {
  const t = tirerTriangle();
  if (Math.random() < 0.5) {
    // Un rectangle réel : l'angle entre la diagonale et le grand côté.
    const R = randomChoice(RECTANGLES);
    let L = 0, l = 0, D = 0;
    for (let k = 0; k < 200; k++) {
      const [p, q, r] = randomChoice(TRIPLETS);
      const f = randomInt(1, 60);
      if (q * f >= R.L[0] && q * f <= R.L[1]) {
        L = q * f; l = p * f; D = r * f;
        break;
      }
    }
    if (!L) { L = R.L[1]; l = Math.round((3 * L) / 4); D = Math.round((5 * L) / 4); }
    const c = configurer(t, "B");
    const exact = acosD(L / D);
    const res = Math.round(exact);
    const text = randomChoice([
      `${cap(R.objet)} mesure ${L} ${R.u} de long et ${l} ${R.u} de large. On note $${t.A}$, $${t.B}$ et $${t.C}$ ${R.coin} : $[${t.A}${t.B}]$ est la longueur, $[${t.A}${t.C}]$ la largeur et $[${t.B}${t.C}]$ une diagonale. Calcule l'angle $\\widehat{${t.A}${t.B}${t.C}}$ entre la diagonale et la longueur, au degré près.`,
      `On s'intéresse à ${R.objet} de ${L} ${R.u} sur ${l} ${R.u}. Dans le triangle $${t.nom}$ rectangle en $${t.A}$, $${t.A}${t.B} = ${L}$ ${R.u} (la longueur) et $${t.A}${t.C} = ${l}$ ${R.u} (la largeur). Quel angle $\\widehat{${t.B}}$ la diagonale $[${t.B}${t.C}]$ fait-elle avec la longueur, au degré près ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [String(res)],
      comparator: "number_equal",
      explanation:
        "Définition : pour le cosinus il faut l'hypoténuse, ici la diagonale.\n\n" +
        `Méthode : le théorème de Pythagore dans le triangle rectangle en $${t.A}$ donne $${t.B}${t.C}$, puis $\\cos(\\widehat{${t.B}}) = \\dfrac{${t.A}${t.B}}{${t.B}${t.C}}$.\n\n` +
        `Calcul : $${t.B}${t.C}^2 = ${L}^2 + ${l}^2 = ${L * L + l * l}$, donc $${t.B}${t.C} = ${D}$ ${R.u} ; $\\cos(\\widehat{${t.B}}) = \\dfrac{${L}}{${D}}$, donc $\\widehat{${t.B}} \\approx ${tex(arrondir(exact, 0.1))}^\\circ$.\n\n` +
        `Conclusion : la diagonale fait un angle d'environ $${res}^\\circ$ avec la longueur.`,
      canvas: figure(c, { adj: `${L} ${R.u}`, opp: `${l} ${R.u}`, angle: "?" }),
    };
  }
  const c = configurer(t);
  const ang = nomAngle(c);
  const u = randomChoice(UNITES);
  const tr = tirerTriplet();
  const [a, o] = Math.random() < 0.5 ? [tr.p, tr.q] : [tr.q, tr.p];
  const h = tr.r;
  const exact = acosD(a / h);
  const res = Math.round(exact);
  const text = randomChoice([
    `Le triangle $${t.nom}$ est rectangle en $${t.A}$, avec $${c.adj} = ${a}$ ${u} et $${c.opp} = ${o}$ ${u}. Calcule $${ang}$ au degré près en utilisant le cosinus.`,
    `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, les côtés de l'angle droit mesurent ${a} ${u} ($[${c.adj}]$) et ${o} ${u} ($[${c.opp}]$). Combien mesure l'angle $${ang}$, au degré près ?`,
    `On ne connaît que $${c.opp} = ${o}$ ${u} et $${c.adj} = ${a}$ ${u} dans le triangle $${t.nom}$ rectangle en $${t.A}$. Détermine $${ang}$ au degré près avec le cosinus.`,
  ]);
  return {
    text,
    format: "short",
    expected: [String(res)],
    comparator: "number_equal",
    explanation:
      "Définition : pour le cosinus il faut l'hypoténuse.\n\n" +
      `Méthode : le théorème de Pythagore donne $${c.hyp}$, puis $\\cos(${ang}) = \\dfrac{${c.adj}}{${c.hyp}}$ et la touche $\\cos^{-1}$.\n\n` +
      `Calcul : $${c.hyp}^2 = ${a}^2 + ${o}^2 = ${a * a + o * o}$, donc $${c.hyp} = ${h}$ ${u} ; $\\cos(${ang}) = \\dfrac{${a}}{${h}}$, donc $${ang} \\approx ${tex(arrondir(exact, 0.1))}^\\circ$.\n\n` +
      `Conclusion : $${ang} \\approx ${res}^\\circ$.`,
    canvas: figure(c, { adj: `${a} ${u}`, opp: `${o} ${u}`, angle: "?" }),
  };
}

/** ★5 : le côté opposé, en passant par l'adjacent (cosinus) puis Pythagore. */
function genDefiOppose() {
  const t = tirerTriangle();
  const c = configurer(t);
  const ang = nomAngle(c);
  const u = randomChoice(UNITES);
  const h = tirerLongueur(5, 25);
  const a = randomInt(20, 70);
  const adjE = h * cosD(a);
  const res = arrondir(Math.sqrt(h * h - adjE * adjE), 0.1);
  const text = randomChoice([
    `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, $${c.hyp} = ${tex(h)}$ ${u} et $${ang} = ${a}^\\circ$. Calcule $${c.opp}$ au dixième près (en ${u}).`,
    `Le triangle $${t.nom}$ est rectangle en $${t.A}$, d'hypoténuse ${fmt(h)} ${u}, avec $${ang} = ${a}^\\circ$. Combien mesure le côté $[${c.opp}]$, au dixième près (en ${u}) ?`,
    `Défi : $${t.nom}$ est rectangle en $${t.A}$, $${ang} = ${a}^\\circ$ et $${c.hyp} = ${tex(h)}$ ${u}. Avec le cosinus puis le théorème de Pythagore, détermine $${c.opp}$ au dixième près (en ${u}).`,
  ]);
  return {
    text,
    format: "short",
    expected: reponses(res, u),
    comparator: "number_equal",
    explanation:
      `Définition : $[${c.opp}]$ est OPPOSÉ à $${ang}$ : le cosinus ne le donne pas directement.\n\n` +
      `Méthode : on calcule l'adjacent $${c.adj} = ${c.hyp} \\times \\cos(${ang})$, puis $${c.opp}$ par le théorème de Pythagore, en gardant la valeur exacte de $${c.adj}$ dans la calculatrice. (Autre chemin : l'autre angle aigu vaut $${90 - a}^\\circ$ et $[${c.opp}]$ lui est adjacent.)\n\n` +
      `Calcul : $${c.adj} = ${tex(h)} \\times \\cos(${a}^\\circ) \\approx ${tex(arrondir(adjE, 0.01))}$ ; $${c.opp} = \\sqrt{${tex(h)}^2 - ${c.adj}^2} \\approx ${tex(res)}$.\n\n` +
      `Conclusion : $${c.opp} \\approx ${tex(res)}$ ${u}.`,
    canvas: figure(c, { hyp: `${fmt(h)} ${u}`, opp: "?", angle: `${a}°` }),
  };
}

/** ★5 : le périmètre, à partir d'un côté et d'un angle. */
function genDefiPerimetre() {
  const t = tirerTriangle();
  const c = configurer(t);
  const ang = nomAngle(c);
  const u = randomChoice(UNITES);
  const d = tirerLongueur(3, 15);
  const a = randomInt(20, 70);
  const hE = d / cosD(a);
  const oE = Math.sqrt(hE * hE - d * d);
  const res = arrondir(d + hE + oE, 0.1);
  const text = randomChoice([
    `Dans le triangle $${t.nom}$ rectangle en $${t.A}$, $${c.adj} = ${tex(d)}$ ${u} et $${ang} = ${a}^\\circ$. Calcule le périmètre du triangle au dixième près (en ${u}).`,
    `Défi : le triangle $${t.nom}$ est rectangle en $${t.A}$, avec $${ang} = ${a}^\\circ$ et $${c.adj} = ${tex(d)}$ ${u}. Quel est son périmètre, au dixième près (en ${u}) ?`,
    `On connaît $${c.adj} = ${tex(d)}$ ${u} et $${ang} = ${a}^\\circ$ dans le triangle $${t.nom}$ rectangle en $${t.A}$. Détermine le périmètre de $${t.nom}$ au dixième près (en ${u}).`,
  ]);
  return {
    text,
    format: "short",
    // Un périmètre : l'unité est OBLIGATOIRE dans la réponse (Frédéric).
    expected: reponses(res, u),
    comparator: "number_equal",
    explanation:
      "Définition : le périmètre est la somme des trois côtés ; on n'en connaît qu'un.\n\n" +
      `Méthode : le cosinus donne l'hypoténuse $${c.hyp} = \\dfrac{${c.adj}}{\\cos(${ang})}$, puis le théorème de Pythagore donne $${c.opp}$. On garde les valeurs exactes dans la calculatrice et on n'arrondit qu'à la fin.\n\n` +
      `Calcul : $${c.hyp} \\approx ${tex(arrondir(hE, 0.01))}$ ; $${c.opp} = \\sqrt{${c.hyp}^2 - ${c.adj}^2} \\approx ${tex(arrondir(oE, 0.01))}$ ; périmètre $\\approx ${tex(d)} + ${tex(arrondir(hE, 0.01))} + ${tex(arrondir(oE, 0.01))} \\approx ${tex(res)}$.\n\n` +
      `Conclusion : le périmètre vaut environ ${fmt(res)} ${u}.`,
    canvas: figure(c, { adj: `${fmt(d)} ${u}`, hyp: "?", opp: "?", angle: `${a}°` }),
  };
}

/* =========================
   BANK
========================= */

export const cosinusBank: TutorBankItemV4[] = [
  /* =========================
     COS_COTES
  ========================= */
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un triangle rectangle, le côté opposé à l’angle droit s’appelle…",
    format: "qcm",
    choices: ["l’hypoténuse", "le côté adjacent", "le côté opposé", "la hauteur"],
    expected: ["l’hypoténuse"],
    comparator: "mcq_exact",
    hint: "C’est le plus grand côté.",
    explanation:
      "Définition : l’hypoténuse est le côté opposé à l’angle droit.\n\n" +
      "Méthode : on repère l’angle droit, puis le côté en face.\n\n" +
      "Calcul : ce côté est aussi le plus long du triangle.\n\n" +
      "Conclusion : c’est l’hypoténuse.",
    // ⛔ 03/10 : le dessin par défaut écrivait « hypoténuse » sur le côté demandé.
    canvas: triangleCosCanvas({ sideLabels: {} }),
    tags: ["trigo_cosinus", "cotes", "hypotenuse", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle rectangle en $A$, quel côté est adjacent à l’angle $\\widehat{B}$ ?",
    format: "qcm",
    choices: ["$[AB]$", "$[AC]$", "$[BC]$", "aucun"],
    expected: ["$[AB]$"],
    comparator: "mcq_exact",
    hint: "Le côté adjacent touche l’angle sans être l’hypoténuse.",
    explanation:
      "Définition : le côté adjacent à un angle touche cet angle sans être l’hypoténuse.\n\n" +
      "Méthode : on se place sur l’angle $\\widehat{B}$ et on écarte l’hypoténuse $[BC]$.\n\n" +
      "Calcul : le côté qui touche $B$ sans être $[BC]$ est $[AB]$.\n\n" +
      "Conclusion : le côté adjacent à $\\widehat{B}$ est $[AB]$.",
    canvas: triangleCosCanvas({ angleAt: "B" }),
    tags: ["trigo_cosinus", "cotes", "adjacent", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle rectangle en $A$, quel est le côté adjacent à l’angle $\\widehat{C}$ ?",
    format: "qcm",
    choices: ["$[AC]$", "$[AB]$", "$[BC]$", "aucun"],
    expected: ["$[AC]$"],
    comparator: "mcq_exact",
    hint: "Il touche l’angle $\\widehat{C}$ sans être l’hypoténuse.",
    explanation:
      "Définition : le côté adjacent à un angle touche cet angle sans être l’hypoténuse.\n\n" +
      "Méthode : on se place sur $\\widehat{C}$ et on écarte $[BC]$ (l’hypoténuse).\n\n" +
      "Calcul : le côté qui touche $C$ sans être $[BC]$ est $[AC]$.\n\n" +
      "Conclusion : le côté adjacent à $\\widehat{C}$ est $[AC]$.",
    canvas: triangleCosCanvas({ angleAt: "C" }),
    tags: ["trigo_cosinus", "cotes", "adjacent", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "4e_cos_cotes_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 3,
    theme: "neutral",
    hint: "Adjacent = touche l’angle ; hypoténuse = opposée à l’angle droit.",
    tags: ["trigo_cosinus", "cotes", "canvas", "template"],
    // ⛔ RÉPARÉ LE 30/08/2026 : deux énoncés seulement, parce que le triangle
    // s'appelait toujours ABC avec l'angle droit en A.
    // ⭐ Et ce n'était pas qu'un problème de compteur : un élève qui ne voit
    // jamais que ce triangle-là retient « l'adjacent, c'est [AB] » au lieu de
    // « c'est le côté qui touche l'angle sans être l'hypoténuse ». La table de
    // nommages est donc la vraie réparation, le renouvellement vient avec.
    // ⭐ 03/10/2026 : adjacent OU opposé, angle écrit avec une ou trois
    // lettres, 7 tournures. Le canvas ne nomme plus les côtés (il donnait la
    // réponse).
    generate: () => genCotesAdjacentOppose() as any,
  },
  {
    kind: "template",
    id: "4e_cos_cotes_tpl_3_angle_droit",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 1,
    theme: "neutral",
    hint: "L’hypoténuse est en face de l’angle droit ; les deux autres côtés forment l’angle droit.",
    tags: ["trigo_cosinus", "cotes", "hypotenuse", "canvas", "template"],
    generate: () => genCotesAngleDroit() as any,
  },
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_4_hyp",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 2,
    theme: "neutral",
    text: "L’hypoténuse d’un triangle rectangle est…",
    format: "qcm",
    choices: ["le plus long côté", "le plus court côté", "un côté de l’angle droit", "toujours vertical"],
    expected: ["le plus long côté"],
    comparator: "mcq_exact",
    hint: "Elle est en face de l’angle droit.",
    explanation:
      "Définition : l’hypoténuse est opposée à l’angle droit.\n\n" +
      "Méthode : on compare les longueurs des côtés.\n\n" +
      "Calcul : l’hypoténuse est toujours le plus long.\n\n" +
      "Conclusion : c’est le plus long côté.",
    tags: ["trigo_cosinus", "cotes", "hypotenuse", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_5_depend",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 3,
    theme: "neutral",
    text: "Le côté adjacent dépend-il de l’angle aigu que l’on choisit ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Change d’angle : le côté adjacent change.",
    explanation:
      "Définition : « adjacent » se définit par rapport à un angle.\n\n" +
      "Méthode : on change d’angle et on regarde le côté qui le touche.\n\n" +
      "Calcul : pour $\\widehat{B}$ l’adjacent est $[AB]$, pour $\\widehat{C}$ c’est $[AC]$.\n\n" +
      "Conclusion : oui, il dépend de l’angle choisi.",
    canvas: triangleCosCanvas(),
    tags: ["trigo_cosinus", "cotes", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_6_oppose",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le triangle rectangle en $A$, quel côté est opposé à l’angle $\\widehat{B}$ ?",
    format: "qcm",
    choices: ["$[AC]$", "$[AB]$", "$[BC]$", "aucun"],
    expected: ["$[AC]$"],
    comparator: "mcq_exact",
    hint: "Le côté opposé est en face de l’angle.",
    explanation:
      "Définition : le côté opposé à un angle est celui qui lui fait face.\n\n" +
      "Méthode : on se place sur $\\widehat{B}$ et on cherche le côté en face.\n\n" +
      "Calcul : le côté en face de $B$ est $[AC]$.\n\n" +
      "Conclusion : le côté opposé à $\\widehat{B}$ est $[AC]$.",
    canvas: triangleCosCanvas({ angleAt: "B" }),
    tags: ["trigo_cosinus", "cotes", "oppose", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "4e_cos_cotes_tpl_2_hyp",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 2,
    theme: "neutral",
    hint: "L’hypoténuse est opposée à l’angle droit (en $A$).",
    tags: ["trigo_cosinus", "cotes", "canvas", "template"],
    // ⛔ RÉPARÉ LE 30/08/2026 : ce gabarit ne fabriquait qu'UN SEUL énoncé —
    // toujours le même triangle, toujours la même réponse $[BC]$. Un élève
    // pouvait le réussir sans jamais chercher où était l'angle droit.
    // ⭐ 03/10/2026 : l'angle droit est donné de quatre façons (« rectangle
    // en », angle à trois lettres droit, perpendiculaires, 90°).
    generate: () => genCotesHypotenuse() as any,
  },
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_7",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 1,
    theme: "neutral",
    text: "Les deux côtés qui forment l’angle droit s’appellent…",
    format: "qcm",
    choices: ["les côtés de l’angle droit", "les hypoténuses", "les diagonales", "les médianes"],
    expected: ["les côtés de l’angle droit"],
    comparator: "mcq_exact",
    hint: "Ils se rejoignent en formant l’angle droit.",
    explanation:
      "Définition : les deux côtés formant l’angle droit sont les côtés de l’angle droit.\n\n" +
      "Méthode : on repère les côtés qui se rejoignent en l’angle droit.\n\n" +
      "Calcul : ce sont les deux côtés autres que l’hypoténuse.\n\n" +
      "Conclusion : ce sont les côtés de l’angle droit.",
    tags: ["trigo_cosinus", "cotes", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_cotes_fixed_8_oppose_c",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_cotes",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le triangle rectangle en $A$, quel côté est opposé à l’angle $\\widehat{C}$ ?",
    format: "qcm",
    choices: ["$[AB]$", "$[AC]$", "$[BC]$", "aucun"],
    expected: ["$[AB]$"],
    comparator: "mcq_exact",
    hint: "Le côté qui ne touche pas $C$ (et qui n’est pas l’hypoténuse).",
    explanation:
      "Définition : le côté opposé à un angle lui fait face.\n\n" +
      "Méthode : on se place sur $\\widehat{C}$ et on cherche le côté en face.\n\n" +
      "Calcul : le côté en face de $C$ est $[AB]$.\n\n" +
      "Conclusion : le côté opposé à $\\widehat{C}$ est $[AB]$.",
    canvas: triangleCosCanvas({ angleAt: "C" }),
    tags: ["trigo_cosinus", "cotes", "oppose", "qcm", "canvas"],
  },

  /* =========================
     COS_DEFINITION
  ========================= */
  {
    kind: "fixed",
    id: "4e_cos_definition_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle rectangle, le cosinus d’un angle aigu est égal à…",
    format: "qcm",
    choices: [
      "$\\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$",
      "$\\dfrac{\\text{côté opposé}}{\\text{hypoténuse}}$",
      "$\\dfrac{\\text{côté opposé}}{\\text{côté adjacent}}$",
      "$\\dfrac{\\text{hypoténuse}}{\\text{côté adjacent}}$",
    ],
    expected: ["$\\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$"],
    comparator: "mcq_exact",
    hint: "« CAH » : Cosinus = Adjacent / Hypoténuse.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on retient le moyen mnémotechnique « CAH ».\n\n" +
      "Calcul : le cosinus relie le côté adjacent et l’hypoténuse.\n\n" +
      "Conclusion : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.",
    canvas: triangleCosCanvas({ angleAt: "B" }),
    tags: ["trigo_cosinus", "definition", "formule", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "4e_cos_definition_fixed_2_formule_b",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le triangle rectangle en $A$, à quoi est égal $\\cos(\\widehat{B})$ ?",
    format: "qcm",
    choices: ["$\\dfrac{AB}{BC}$", "$\\dfrac{AC}{BC}$", "$\\dfrac{AB}{AC}$", "$\\dfrac{BC}{AB}$"],
    expected: ["$\\dfrac{AB}{BC}$"],
    comparator: "mcq_exact",
    hint: "Adjacent à $\\widehat{B}$ : $AB$ ; hypoténuse : $BC$.",
    explanation:
      "Définition : $\\cos(\\widehat{B}) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : l’adjacent à $\\widehat{B}$ est $AB$, l’hypoténuse est $BC$.\n\n" +
      "Calcul : $\\cos(\\widehat{B}) = \\dfrac{AB}{BC}$.\n\n" +
      "Conclusion : $\\cos(\\widehat{B}) = \\dfrac{AB}{BC}$.",
    canvas: triangleCosCanvas({ angleAt: "B" }),
    tags: ["trigo_cosinus", "definition", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "4e_cos_definition_fixed_3_bornes",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Le cosinus d’un angle aigu est toujours un nombre…",
    format: "qcm",
    choices: ["compris entre $0$ et $1$", "supérieur à $1$", "négatif", "égal à l’angle"],
    expected: ["compris entre $0$ et $1$"],
    comparator: "mcq_exact",
    hint: "L’adjacent est plus court que l’hypoténuse.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on compare l’adjacent et l’hypoténuse.\n\n" +
      "Calcul : l’adjacent est toujours plus petit que l’hypoténuse, donc le quotient est entre $0$ et $1$.\n\n" +
      "Conclusion : le cosinus d’un angle aigu est compris entre $0$ et $1$.",
    tags: ["trigo_cosinus", "definition", "bornes", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_definition_tpl_1_valeur",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.",
    tags: ["trigo_cosinus", "definition", "valeur", "canvas", "template"],
    // ⭐ 03/10/2026 : trois longueurs cohérentes (triplet de Pythagore), dont
    // parfois l'opposé en piège ; noms et tournures tirés.
    generate: () => genDefinitionValeur() as any,
  },
  {
    kind: "template",
    id: "4e_cos_definition_tpl_3_trou",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 2,
    theme: "neutral",
    hint: "Cosinus = adjacent (en haut) sur hypoténuse (en bas).",
    tags: ["trigo_cosinus", "definition", "formule", "qcm", "canvas", "template"],
    generate: () => genDefinitionTrou() as any,
  },
  {
    kind: "template",
    id: "4e_cos_definition_tpl_4_eleve",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère l’hypoténuse (en face de l’angle droit), puis l’adjacent à l’angle.",
    tags: ["trigo_cosinus", "definition", "erreur", "qcm", "canvas", "template"],
    generate: () => genDefinitionEleve() as any,
  },
  {
    kind: "template",
    id: "4e_cos_definition_tpl_5_decimal",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 4,
    theme: "neutral",
    hint: "Divise le côté adjacent par l’hypoténuse.",
    tags: ["trigo_cosinus", "definition", "valeur", "canvas", "template"],
    generate: () => genDefinitionDecimal() as any,
  },
  {
    kind: "fixed",
    id: "4e_cos_definition_fixed_4_cah",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Que signifie le moyen mnémotechnique « CAH » pour le cosinus ?",
    format: "qcm",
    choices: [
      "Cosinus = Adjacent / Hypoténuse",
      "Cosinus = Aire / Hauteur",
      "Cosinus = Angle / Hypoténuse",
      "Cosinus = Adjacent / Hauteur",
    ],
    expected: ["Cosinus = Adjacent / Hypoténuse"],
    comparator: "mcq_exact",
    hint: "C → Cosinus, A → Adjacent, H → Hypoténuse.",
    explanation:
      "Définition : « CAH » résume $\\cos = \\dfrac{\\text{Adjacent}}{\\text{Hypoténuse}}$.\n\n" +
      "Méthode : chaque lettre rappelle un mot.\n\n" +
      "Calcul : C(osinus) = A(djacent) / H(ypoténuse).\n\n" +
      "Conclusion : Cosinus = Adjacent / Hypoténuse.",
    tags: ["trigo_cosinus", "definition", "mnemotechnique", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_definition_fixed_5_60",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $\\cos(60^\\circ)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$1$", "$0$", "$0{,}87$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "Valeur remarquable à connaître.",
    explanation:
      "Définition : certaines valeurs de cosinus sont remarquables.\n\n" +
      "Méthode : on retient $\\cos(60^\\circ) = 0{,}5$.\n\n" +
      "Calcul : $\\cos(60^\\circ) = \\dfrac{1}{2} = 0{,}5$.\n\n" +
      "Conclusion : $\\cos(60^\\circ) = 0{,}5$.",
    tags: ["trigo_cosinus", "definition", "valeur_remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_definition_fixed_6_0",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $\\cos(0^\\circ)$ ?",
    format: "qcm",
    choices: ["$1$", "$0$", "$0{,}5$", "$90$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Quand l’angle est nul, l’adjacent est presque égal à l’hypoténuse.",
    explanation:
      "Définition : $\\cos(0^\\circ)$ est une valeur remarquable.\n\n" +
      "Méthode : on retient $\\cos(0^\\circ) = 1$.\n\n" +
      "Calcul : l’adjacent est alors confondu avec l’hypoténuse.\n\n" +
      "Conclusion : $\\cos(0^\\circ) = 1$.",
    tags: ["trigo_cosinus", "definition", "valeur_remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_definition_tpl_2_formule_c",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "Adjacent à l’angle choisi, sur l’hypoténuse.",
    tags: ["trigo_cosinus", "definition", "qcm", "canvas", "template"],
    // ⛔ RÉPARÉ LE 30/08/2026 : deux énoncés, parce que le triangle s'appelait
    // toujours ABC. Il prend maintenant ses noms dans `NOMMAGES`, et l'élève
    // doit relire la figure au lieu de reconnaître une formule apprise.
    // ⭐ 03/10/2026 : angle à une ou trois lettres, 5 tournures (dont « quelle
    // égalité est juste ? »).
    generate: () => genDefinitionFormule() as any,
  },
  {
    kind: "fixed",
    id: "4e_cos_definition_fixed_7_erreur",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_definition",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit $\\cos(\\theta) = \\dfrac{\\text{hypoténuse}}{\\text{adjacent}}$. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le cosinus est inférieur à $1$ : l’adjacent est au numérateur.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on vérifie l’ordre numérateur / dénominateur.\n\n" +
      "Calcul : il a inversé : c’est adjacent sur hypoténuse.\n\n" +
      "Conclusion : non, $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.",
    tags: ["trigo_cosinus", "definition", "erreur", "qcm"],
  },

  /* =========================
     COS_CALCULER_LONGUEUR
  ========================= */
  {
    kind: "fixed",
    id: "4e_cos_calculer_longueur_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer le côté adjacent connaissant l’angle et l’hypoténuse, quelle formule utilise-t-on ?",
    format: "qcm",
    choices: [
      "$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$",
      "$\\text{adjacent} = \\dfrac{\\text{hypoténuse}}{\\cos(\\theta)}$",
      "$\\text{adjacent} = \\text{hypoténuse} + \\cos(\\theta)$",
      "$\\text{adjacent} = \\cos(\\theta) - \\text{hypoténuse}$",
    ],
    expected: ["$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$"],
    comparator: "mcq_exact",
    hint: "On multiplie l’hypoténuse par le cosinus.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on multiplie les deux membres par l’hypoténuse.\n\n" +
      "Calcul : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$.\n\n" +
      "Conclusion : c’est la première formule.",
    tags: ["trigo_cosinus", "calculer_longueur", "isoler", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_calculer_longueur_tpl_1_adjacent_60",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(60^\\circ)$ et $\\cos(60^\\circ) = 0{,}5$.",
    tags: ["trigo_cosinus", "calculer_longueur", "canvas", "template"],
    generate: () => genLongueur({ cherche: "adj", mode: "60" }) as any,
  },
  {
    kind: "template",
    id: "4e_cos_calculer_longueur_tpl_6_cos_donne",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\text{adjacent} = \\text{hypoténuse} \\times \\cos$ : multiplie par la valeur donnée.",
    tags: ["trigo_cosinus", "calculer_longueur", "canvas", "template"],
    generate: () => genLongueur({ cherche: "adj", mode: "cosDonne" }) as any,
  },
  {
    kind: "template",
    id: "4e_cos_calculer_longueur_tpl_2_decimal",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$, au dixième.",
    tags: ["trigo_cosinus", "calculer_longueur", "decimal", "canvas", "template"],
    generate: () => genLongueur({ cherche: "adj", mode: "calc", pas: 0.1 }) as any,
  },
  {
    kind: "template",
    id: "4e_cos_calculer_longueur_tpl_3_hypotenuse",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{\\cos(\\theta)}$ et $\\cos(60^\\circ) = 0{,}5$.",
    tags: ["trigo_cosinus", "calculer_longueur", "hypotenuse", "canvas", "template"],
    generate: () => genLongueur({ cherche: "hyp", mode: "60" }) as any,
  },
  {
    kind: "fixed",
    id: "4e_cos_calculer_longueur_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un triangle rectangle, l’hypoténuse mesure $10$ cm et l’angle étudié vaut $60^\\circ$. Quelle est la longueur du côté adjacent (en cm) ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$10 \\times \\cos(60^\\circ) = 10 \\times 0{,}5$.",
    explanation:
      "Définition : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$.\n\n" +
      "Méthode : on multiplie $10$ par $\\cos(60^\\circ) = 0{,}5$.\n\n" +
      "Calcul : $10 \\times 0{,}5 = 5$.\n\n" +
      "Conclusion : le côté adjacent mesure $5$ cm.",
    canvas: triangleCosCanvas({
      angleAt: "B",
      angleLabel: "60°",
      sideLabels: { BC: "10 cm", AB: "?", CA: "" },
    }),
    tags: ["trigo_cosinus", "calculer_longueur", "short"],
  },
  {
    kind: "fixed",
    id: "4e_cos_calculer_longueur_qcm_2_choix",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    text: "On connaît l’hypoténuse et l’angle, et on cherche le côté adjacent. Quel rapport faut-il utiliser ?",
    format: "qcm",
    choices: ["le cosinus", "le périmètre", "Pythagore seul", "la proportionnalité"],
    expected: ["le cosinus"],
    comparator: "mcq_exact",
    hint: "Adjacent et hypoténuse → cosinus.",
    explanation:
      "Définition : le cosinus relie l’adjacent et l’hypoténuse.\n\n" +
      "Méthode : on choisit le rapport correspondant aux deux côtés en jeu.\n\n" +
      "Calcul : adjacent et hypoténuse → cosinus.\n\n" +
      "Conclusion : on utilise le cosinus.",
    tags: ["trigo_cosinus", "calculer_longueur", "choix", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_calculer_longueur_tpl_4_decimal_hyp",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 5,
    theme: "neutral",
    hint: "$\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{\\cos(\\theta)}$, au dixième.",
    tags: ["trigo_cosinus", "calculer_longueur", "decimal", "template"],
    generate: () => genLongueur({ cherche: "hyp", mode: "calc", pas: 0.1 }) as any,
  },
  {
    kind: "template",
    id: "4e_cos_calculer_longueur_tpl_7_autre_angle",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 5,
    theme: "neutral",
    hint: "Le côté cherché est-il adjacent à l’angle donné ? Sinon, passe par l’autre angle aigu (90° − l’angle).",
    tags: ["trigo_cosinus", "calculer_longueur", "complementaire", "canvas", "template"],
    generate: () => genLongueur({ cherche: "adj", mode: "autre", pas: 0.1 }) as any,
  },
  {
    kind: "fixed",
    id: "4e_cos_calculer_longueur_fixed_2_hyp",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    text: "Le côté adjacent à un angle de $60^\\circ$ mesure $7$ cm. Quelle est la longueur de l’hypoténuse (en cm) ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "$\\dfrac{7}{\\cos(60^\\circ)} = \\dfrac{7}{0{,}5}$.",
    explanation:
      "Définition : $\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{\\cos(\\theta)}$.\n\n" +
      "Méthode : on divise $7$ par $\\cos(60^\\circ) = 0{,}5$.\n\n" +
      "Calcul : $\\dfrac{7}{0{,}5} = 14$.\n\n" +
      "Conclusion : l’hypoténuse mesure $14$ cm.",
    tags: ["trigo_cosinus", "calculer_longueur", "hypotenuse", "short"],
  },
  {
    kind: "template",
    id: "4e_cos_calculer_longueur_tpl_5_adjacent_decimal",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\theta)$.",
    tags: ["trigo_cosinus", "calculer_longueur", "decimal", "canvas", "template"],
    // ⭐ 03/10/2026 : arrondi à l'unité (le gabarit tpl_2 arrondit au dixième).
    generate: () => genLongueur({ cherche: "adj", mode: "calc", pas: 1 }) as any,
  },

  /* =========================
     COS_CALCULER_ANGLE
  ========================= */
  {
    kind: "fixed",
    id: "4e_cos_calculer_angle_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer un angle dont on connaît le cosinus, on utilise…",
    format: "qcm",
    choices: [
      "la touche $\\cos^{-1}$ de la calculatrice",
      "la touche $\\cos$ de la calculatrice",
      "la touche $\\tan^{-1}$ de la calculatrice",
      "le théorème de Pythagore dans le triangle",
    ],
    expected: ["la touche $\\cos^{-1}$ de la calculatrice"],
    comparator: "mcq_exact",
    hint: "C’est la fonction inverse du cosinus.",
    explanation:
      "Définition : $\\cos^{-1}$ retrouve un angle à partir de son cosinus.\n\n" +
      "Méthode : quand on connaît le rapport, on utilise $\\cos^{-1}$.\n\n" +
      "Calcul : par exemple $\\cos^{-1}(0{,}5) = 60^\\circ$.\n\n" +
      "Conclusion : on utilise $\\cos^{-1}$.",
    tags: ["trigo_cosinus", "calculer_angle", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_calculer_angle_fixed_1_60",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un triangle rectangle, le côté adjacent à l’angle $\\theta$ mesure $5$ cm et l’hypoténuse $10$ cm. Combien vaut $\\theta$ (en degrés) ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "$\\cos(\\theta) = \\dfrac{5}{10} = 0{,}5$, puis $\\cos^{-1}(0{,}5)$.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on calcule le rapport, puis $\\cos^{-1}$.\n\n" +
      "Calcul : $\\cos(\\theta) = \\dfrac{5}{10} = 0{,}5$, donc $\\theta = \\cos^{-1}(0{,}5) = 60^\\circ$.\n\n" +
      "Conclusion : $\\theta = 60^\\circ$.",
    canvas: triangleCosCanvas({
      angleAt: "B",
      angleLabel: "?",
      sideLabels: { AB: "5 cm", BC: "10 cm", CA: "" },
    }),
    tags: ["trigo_cosinus", "calculer_angle", "short"],
  },
  {
    kind: "template",
    id: "4e_cos_calculer_angle_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule $\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$, puis $\\cos^{-1}$, au degré près.",
    tags: ["trigo_cosinus", "calculer_angle", "canvas", "template"],
    generate: () => genAngle("calc") as any,
  },
  {
    kind: "template",
    id: "4e_cos_calculer_angle_tpl_4_moitie",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par $\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ ; si l’adjacent est la moitié de l’hypoténuse, l’angle vaut $60^\\circ$.",
    tags: ["trigo_cosinus", "calculer_angle", "canvas", "template"],
    generate: () => genAngle("moitie") as any,
  },
  {
    kind: "fixed",
    id: "4e_cos_calculer_angle_qcm_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Si $\\cos(\\theta) = 0{,}5$, combien vaut l’angle $\\theta$ ?",
    format: "qcm",
    choices: ["$60^\\circ$", "$30^\\circ$", "$45^\\circ$", "$50^\\circ$"],
    expected: ["$60^\\circ$"],
    comparator: "mcq_exact",
    hint: "$\\cos^{-1}(0{,}5) = 60^\\circ$.",
    explanation:
      "Définition : $\\cos^{-1}$ retrouve l’angle à partir de son cosinus.\n\n" +
      "Méthode : on applique $\\cos^{-1}(0{,}5)$.\n\n" +
      "Calcul : $\\cos^{-1}(0{,}5) = 60^\\circ$.\n\n" +
      "Conclusion : $\\theta = 60^\\circ$.",
    tags: ["trigo_cosinus", "calculer_angle", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_calculer_angle_tpl_2_ratio",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    hint: "Applique $\\cos^{-1}$ à la valeur donnée.",
    tags: ["trigo_cosinus", "calculer_angle", "template"],
    // ⭐ 03/10/2026 : 17 valeurs du cosinus au lieu de 2 (dont 1 → 0°, qui
    // n'est pas un angle de triangle), au degré près.
    generate: () => genAngle("ratio") as any,
  },
  {
    kind: "fixed",
    id: "4e_cos_calculer_angle_qcm_3_choix",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 3,
    theme: "neutral",
    text: "On connaît le côté adjacent et l’hypoténuse, et on cherche l’angle. Que faut-il faire ?",
    format: "qcm",
    choices: [
      "calculer $\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ puis $\\cos^{-1}$",
      "calculer $\\dfrac{\\text{hypoténuse}}{\\text{adjacent}}$ puis $\\cos^{-1}$",
      "calculer $\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ puis $\\cos$",
      "calculer $\\dfrac{\\text{opposé}}{\\text{hypoténuse}}$ puis $\\cos^{-1}$",
    ],
    expected: ["calculer $\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ puis $\\cos^{-1}$"],
    comparator: "mcq_exact",
    hint: "Le rapport adjacent/hypoténuse donne le cosinus de l’angle.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on calcule le rapport, puis on applique $\\cos^{-1}$.\n\n" +
      "Calcul : cela donne directement l’angle.\n\n" +
      "Conclusion : on calcule le rapport puis $\\cos^{-1}$.",
    tags: ["trigo_cosinus", "calculer_angle", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_calculer_angle_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule le rapport, puis $\\cos^{-1}$, et arrondis comme demandé.",
    tags: ["trigo_cosinus", "calculer_angle", "template"],
    // ⭐ 03/10/2026 : au dixième de degré près (le ★4 arrondit au degré).
    generate: () => genAngle("dixieme") as any,
  },
  {
    kind: "template",
    id: "4e_cos_calculer_angle_tpl_5_autre_angle",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule d’abord l’angle dont tu connais l’adjacent, puis utilise : les deux angles aigus font $90^\\circ$.",
    tags: ["trigo_cosinus", "calculer_angle", "complementaire", "canvas", "template"],
    generate: () => genAngle("autre") as any,
  },
  {
    kind: "fixed",
    id: "4e_cos_calculer_angle_fixed_2_complementaire",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_calculer_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle rectangle, un angle aigu vaut $60^\\circ$. Combien mesure l’autre angle aigu (en degrés) ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Les deux angles aigus ont une somme de $90^\\circ$.",
    explanation:
      "Définition : dans un triangle rectangle, les deux angles aigus sont complémentaires.\n\n" +
      "Méthode : on soustrait l’angle connu à $90^\\circ$.\n\n" +
      "Calcul : $90 - 60 = 30$.\n\n" +
      "Conclusion : l’autre angle aigu mesure $30^\\circ$.",
    tags: ["trigo_cosinus", "calculer_angle", "complementaire", "short"],
  },

  /* =========================
     COS_PROBLEME
  ========================= */
  {
    kind: "template",
    id: "4e_cos_probleme_tpl_1_echelle",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "L’objet incliné est l’hypoténuse : hypoténuse = adjacent ÷ cos(angle).",
    tags: ["trigo_cosinus", "probleme", "canvas", "template"],
    // ⭐ 03/10/2026 : 18 objets réels (échelle, toboggan, téléski, hauban,
    // cerf-volant…) ; ici on cherche la longueur de l'objet (l'hypoténuse).
    generate: () => genProbleme("hyp"),
  },
  {
    kind: "template",
    id: "4e_cos_probleme_tpl_5_adjacent",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "L’objet incliné est l’hypoténuse : adjacent = hypoténuse × cos(angle).",
    tags: ["trigo_cosinus", "probleme", "canvas", "template"],
    generate: () => genProbleme("adj"),
  },
  {
    kind: "template",
    id: "4e_cos_probleme_tpl_2_rampe",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Il manque l’hypoténuse : calcule-la avec le théorème de Pythagore, puis cos⁻¹(adjacent / hypoténuse).",
    tags: ["trigo_cosinus", "probleme", "pythagore", "canvas", "template"],
    // ⭐ 03/10/2026 : deux étapes (Pythagore puis cosinus), 18 objets réels.
    generate: () => genProbleme("angle2"),
  },
  {
    kind: "fixed",
    id: "4e_cos_probleme_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "On connaît un angle et l’hypoténuse d’un triangle rectangle, et on cherche le côté adjacent. Que faut-il utiliser ?",
    format: "qcm",
    choices: ["le cosinus", "le théorème de Pythagore seul", "le périmètre", "la moyenne"],
    expected: ["le cosinus"],
    comparator: "mcq_exact",
    hint: "Un angle intervient, avec adjacent et hypoténuse.",
    explanation:
      "Définition : le cosinus relie un angle, l’adjacent et l’hypoténuse.\n\n" +
      "Méthode : on choisit le rapport adapté aux côtés en jeu.\n\n" +
      "Calcul : adjacent et hypoténuse → cosinus.\n\n" +
      "Conclusion : on utilise le cosinus.",
    tags: ["trigo_cosinus", "probleme", "choix", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_probleme_tpl_3_toboggan",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Le côté cherché n’est pas l’adjacent : calcule d’abord l’adjacent avec le cosinus, puis le dernier côté avec Pythagore.",
    tags: ["trigo_cosinus", "probleme", "pythagore", "canvas", "template"],
    // ⭐ 03/10/2026 : cosinus puis Pythagore (la hauteur, le dénivelé…).
    generate: () => genProbleme("opp2"),
  },
  {
    kind: "fixed",
    id: "4e_cos_probleme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Une planche de $4$ m est appuyée contre un mur, son pied étant à $2$ m du mur. Quel angle (en degrés) la planche forme-t-elle avec le sol ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "$\\cos(\\theta) = \\dfrac{2}{4} = 0{,}5$.",
    explanation:
      "Définition : la distance au mur est l’adjacent, la planche est l’hypoténuse.\n\n" +
      "Méthode : $\\cos(\\theta) = \\dfrac{2}{4} = 0{,}5$, puis $\\cos^{-1}$.\n\n" +
      "Calcul : $\\theta = \\cos^{-1}(0{,}5) = 60^\\circ$.\n\n" +
      "Conclusion : la planche forme un angle de $60^\\circ$ avec le sol.",
    tags: ["trigo_cosinus", "probleme", "short"],
  },
  {
    kind: "template",
    id: "4e_cos_probleme_tpl_4_hypotenuse",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule d’abord l’hypoténuse avec le cosinus, puis le dernier côté avec Pythagore.",
    tags: ["trigo_cosinus", "probleme", "pythagore", "canvas", "template"],
    // ⭐ 03/10/2026 : hypoténuse par le cosinus, puis Pythagore (et la faute
    // « haubban » est partie avec l'ancien énoncé).
    generate: () => genProbleme("opp3"),
  },

  /* =========================
     COS_DEFI
  ========================= */
  {
    kind: "fixed",
    id: "4e_cos_defi_fixed_1_pythagore",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un triangle rectangle, on connaît les deux côtés de l’angle droit ($3$ et $4$). Pour trouver un angle aigu avec le cosinus, que doit-on d’abord calculer ?",
    format: "qcm",
    choices: [
      "l’hypoténuse avec le théorème de Pythagore",
      "l’hypoténuse avec la réciproque de Pythagore",
      "le côté adjacent avec le théorème de Pythagore",
      "le troisième angle avec la somme des angles",
    ],
    expected: ["l’hypoténuse avec le théorème de Pythagore"],
    comparator: "mcq_exact",
    hint: "Le cosinus a besoin de l’hypoténuse.",
    explanation:
      "Définition : le cosinus utilise l’adjacent et l’hypoténuse.\n\n" +
      "Méthode : on ne connaît pas l’hypoténuse, on la calcule d’abord avec Pythagore.\n\n" +
      "Calcul : $\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$, puis on utilise le cosinus.\n\n" +
      "Conclusion : on calcule d’abord l’hypoténuse avec Pythagore.",
    tags: ["trigo_cosinus", "defi", "pythagore", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_defi_fixed_2_brevet",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Type brevet : dans un triangle rectangle, l’hypoténuse mesure $8$ cm et le côté adjacent à $\\theta$ mesure $4$ cm. Combien vaut $\\theta$ (en degrés) ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "$\\cos(\\theta) = \\dfrac{4}{8} = 0{,}5$.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on calcule le rapport, puis $\\cos^{-1}$.\n\n" +
      "Calcul : $\\cos(\\theta) = \\dfrac{4}{8} = 0{,}5$, donc $\\theta = 60^\\circ$.\n\n" +
      "Conclusion : $\\theta = 60^\\circ$.",
    tags: ["trigo_cosinus", "defi", "brevet", "short"],
  },
  {
    kind: "template",
    id: "4e_cos_defi_tpl_1_combine",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule d’abord l’hypoténuse avec Pythagore, puis le cosinus de l’angle.",
    tags: ["trigo_cosinus", "defi", "pythagore", "template"],
    // ⭐ 03/10/2026 : 6 triplets agrandis, ou un rectangle réel (écran,
    // champ, porte vitrée…) dont on cherche l'angle de la diagonale.
    generate: () => genDefiCombine() as any,
  },
  {
    kind: "template",
    id: "4e_cos_defi_tpl_4_affirmation",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule toi-même adjacent ÷ hypoténuse, puis compare.",
    tags: ["trigo_cosinus", "defi", "erreur", "qcm", "canvas", "template"],
    generate: () => genDefiAffirmation() as any,
  },
  {
    kind: "template",
    id: "4e_cos_defi_tpl_5_pythagore_cos",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Il manque l’hypoténuse : théorème de Pythagore d’abord, cosinus ensuite.",
    tags: ["trigo_cosinus", "defi", "pythagore", "canvas", "template"],
    generate: () => genDefiPythagoreCos() as any,
  },
  {
    kind: "fixed",
    id: "4e_cos_defi_fixed_3_erreur",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève écrit $\\cos(\\theta) = 1{,}5$. Est-ce possible pour un angle aigu ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le cosinus d’un angle aigu est entre $0$ et $1$.",
    explanation:
      "Définition : le cosinus d’un angle aigu est compris entre $0$ et $1$.\n\n" +
      "Méthode : on compare $1{,}5$ à $1$.\n\n" +
      "Calcul : $1{,}5 > 1$, c’est impossible (l’adjacent serait plus grand que l’hypoténuse).\n\n" +
      "Conclusion : non, c’est impossible.",
    tags: ["trigo_cosinus", "defi", "erreur", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_defi_fixed_4_distinction",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Quand utilise-t-on le cosinus plutôt que le théorème de Pythagore ?",
    format: "qcm",
    choices: [
      "quand un angle intervient",
      "quand on connaît seulement les trois côtés",
      "quand le triangle n’est pas rectangle",
      "jamais",
    ],
    expected: ["quand un angle intervient"],
    comparator: "mcq_exact",
    hint: "Pythagore ne fait pas intervenir d’angle.",
    explanation:
      "Définition : le cosinus relie un angle à deux côtés ; Pythagore relie trois côtés.\n\n" +
      "Méthode : on regarde si un angle est connu ou cherché.\n\n" +
      "Calcul : si un angle intervient, on utilise le cosinus.\n\n" +
      "Conclusion : on utilise le cosinus quand un angle intervient.",
    tags: ["trigo_cosinus", "defi", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_defi_tpl_2_longueur",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le côté cherché est opposé à l’angle : cosinus pour l’adjacent, puis Pythagore.",
    tags: ["trigo_cosinus", "defi", "pythagore", "canvas", "template"],
    // ⭐ 03/10/2026 : le côté OPPOSÉ, en deux étapes (cosinus puis Pythagore).
    generate: () => genDefiOppose() as any,
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- COS_PROBLEME ----------
  {
    kind: "fixed",
    id: "4e_cos_probleme_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une échelle de 4 m est appuyée contre un mur et fait un angle de $60^\\circ$ avec le sol. À quelle distance du mur se trouve son pied (en m) ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$\\text{distance} = \\text{longueur} \\times \\cos(60^\\circ)$.",
    explanation:
      "Définition : la distance au mur est le côté adjacent à l’angle au sol.\n\n" +
      "Méthode : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(60^\\circ)$.\n\n" +
      "Calcul : $4 \\times 0{,}5 = 2$.\n\n" +
      "Conclusion : le pied de l’échelle est à 2 m du mur.",
    tags: ["trigo_cosinus", "probleme", "echelle"],
  },
  {
    kind: "template",
    id: "4e_cos_probleme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "cos(angle) = adjacent ÷ hypoténuse, puis la touche cos⁻¹.",
    tags: ["trigo_cosinus", "probleme", "canvas", "template"],
    // ⭐ 03/10/2026 : on cherche l'ANGLE (18 objets réels).
    generate: () => genProbleme("angle"),
  },
  {
    kind: "template",
    id: "4e_cos_probleme_tpl_3_valeur_donnee",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "adjacent = hypoténuse × cos(angle), avec la valeur du cosinus donnée.",
    tags: ["trigo_cosinus", "probleme", "canvas", "template"],
    generate: () => genProbleme("cosDonne"),
  },
  {
    kind: "fixed",
    id: "4e_cos_probleme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_probleme",
    difficulty: 4,
    theme: "neutral",
    // ⛔ 08/10/2026 : QCM, plus une question à mots-clés (règle de Frédéric).
    text: "Dans un triangle rectangle, quand utilise-t-on le cosinus d’un angle aigu ?",
    format: "qcm",
    choices: [
      "quand on connaît les deux côtés de l’angle droit et qu’on cherche seulement l’hypoténuse",
      "quand le problème relie cet angle, son côté adjacent et l’hypoténuse",
      "dans n’importe quel triangle, même sans angle droit",
      "quand le problème relie cet angle, le côté opposé et le côté adjacent",
    ],
    expected: ["quand le problème relie cet angle, son côté adjacent et l’hypoténuse"],
    comparator: "mcq_exact",
    hint: "Le cosinus relie l’adjacent et l’hypoténuse.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on utilise le cosinus quand le problème fait intervenir un angle, le côté adjacent et l’hypoténuse.\n\n" +
      "Calcul : on isole la grandeur cherchée à partir de la formule.\n\n" +
      "Conclusion : on utilise le cosinus pour relier angle, adjacent et hypoténuse.",
    tags: ["trigo_cosinus", "probleme", "open"],
  },

  // ---------- COS_DEFI ----------
  {
    kind: "fixed",
    id: "4e_cos_defi_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle rectangle, le cosinus d’un angle aigu est égal à…",
    format: "qcm",
    choices: [
      "$\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$",
      "$\\dfrac{\\text{opposé}}{\\text{hypoténuse}}$",
      "$\\dfrac{\\text{hypoténuse}}{\\text{adjacent}}$",
      "$\\dfrac{\\text{opposé}}{\\text{adjacent}}$",
    ],
    expected: ["$\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$"],
    comparator: "mcq_exact",
    hint: "Cosinus = adjacent sur hypoténuse.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : on identifie le côté adjacent et l’hypoténuse.\n\n" +
      "Calcul : aucun calcul n’est nécessaire.\n\n" +
      "Conclusion : le cosinus est le quotient adjacent ÷ hypoténuse.",
    tags: ["trigo_cosinus", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_cos_defi_fixed_2_borne",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Le cosinus d’un angle aigu peut-il être supérieur à 1 ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "L’adjacent est toujours plus court que l’hypoténuse.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : l’hypoténuse est le plus grand côté.\n\n" +
      "Calcul : adjacent < hypoténuse, donc le quotient est inférieur à 1.\n\n" +
      "Conclusion : non, le cosinus d’un angle aigu est compris entre 0 et 1.",
    tags: ["trigo_cosinus", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "4e_cos_defi_tpl_3_hypotenuse",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Hypoténuse = adjacent ÷ cos(angle), puis Pythagore pour le dernier côté, puis la somme.",
    tags: ["trigo_cosinus", "defi", "pythagore", "perimetre", "canvas", "template"],
    // ⭐ 03/10/2026 : le périmètre à partir d'un côté et d'un angle.
    generate: () => genDefiPerimetre() as any,
  },
  {
    kind: "fixed",
    id: "4e_cos_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "trigo_cosinus",
    microId: "cos_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi le cosinus d’un angle aigu est-il toujours compris entre 0 et 1 ?",
    format: "qcm",
    choices: [
      "parce qu’un angle aigu mesure moins de 1°",
      "parce que l’hypoténuse est plus courte que le côté adjacent",
      "parce que le côté adjacent est plus court que l’hypoténuse, le plus grand côté",
      "parce qu’on arrondit toujours le cosinus au dixième",
    ],
    expected: ["parce que le côté adjacent est plus court que l’hypoténuse, le plus grand côté"],
    comparator: "mcq_exact",
    hint: "Compare l’adjacent et l’hypoténuse.",
    explanation:
      "Définition : $\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.\n\n" +
      "Méthode : dans un triangle rectangle, l’hypoténuse est le plus grand côté.\n\n" +
      "Calcul : un côté adjacent positif plus petit que l’hypoténuse donne un quotient entre 0 et 1.\n\n" +
      "Conclusion : le cosinus d’un angle aigu est donc compris entre 0 et 1.",
    tags: ["trigo_cosinus", "defi", "open"],
  },
];
