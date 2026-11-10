import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { QuadrilatereCanvasData, FigureLibreCanvasData } from "@/lib/tutor-v4/types_canvas";
import { PRENOMS, pick, de, type Prenom } from "./entiers.bank";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

// Les propositions d'un gabarit sont écrites à la main, et deux d'entre elles
// finissent par coïncider dès qu'un paramètre tombe sur une valeur particulière
// (a = b, un coefficient nul, une fraction qui se simplifie…). L'élève voyait
// alors deux fois la même ligne. On met la bonne réponse de côté, on tire trois
// pièges réellement distincts, puis on mélange l'ensemble.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}


function shuffle<T>(arr: T[]): T[] {
  return melangeEnPlace([...arr]);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * LE CARRÉ DÉCOUPÉ EN 100 — la figure qui remplace le tableau de conversion.
 *
 * ⛔ Le BO 6e : « le recours à un tableau de conversion est déconseillé à ce
 * stade ». Ce qu'il fait verbaliser à la place, c'est justement ce dessin :
 * 1 dm² = 1 dm × 1 dm = 10 cm × 10 cm = 100 cm². Ici la figure EST la méthode,
 * pas une décoration.
 *
 * Sans case colorée, on compte les cent carrés ; avec une seule, on lit
 * « 1 cm² est le centième de 1 dm² ».
 */
function carreDecoupe(casesColorees: [number, number][]) {
  return {
    kind: "figure_libre" as const,
    grid: { rows: 10, cols: 10, filledCells: casesColorees },
    display: {
      showGrid: true,
      showFilled: casesColorees.length > 0,
      showPerimeter: true,
    },
    size: { cellSize: 22, padding: 14 },
  };
}

function expl(calcul: string) {
  return (
    "Définition : une aire mesure la surface occupée par une figure.\n\n" +
    "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ⭐ 06/10/2026 — DES SITUATIONS, PAS UNE PHRASE. Mesuré le 05/10 : 5 à 12
// squelettes par micro, 13 à 18 répétitions sur 20. Chaque gabarit compose
// maintenant une situation × une tournure × des prénoms. Décisions de
// Frédéric : unité OBLIGATOIRE dans l'énoncé ET dans la réponse (« 24 cm² » ;
// « 24 » seul accepterait « 24 m² »), division écrite « ÷ », jamais de barre,
// mesures à deux chiffres après la virgule au plus. Les correcteurs :
// correcteurs/aires.ts. Ces outils servent aussi à volumes.bank.ts.
// ═══════════════════════════════════════════════════════════════════════════

/** Virgule décimale, deux chiffres après la virgule au plus, espaces des milliers. */
export function nf(x: number): string {
  const r = Math.round(x * 100) / 100;
  const [e, d] = String(r).split(".");
  return e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
}
/** La réponse AVEC son unité (« 24 cm² ») ; sans espace des milliers en second. */
export function avecUnite(x: number, u: string): string[] {
  const a = `${nf(x)} ${u}`;
  const b = `${nf(x).replace(/ /g, "")} ${u}`;
  return a === b ? [a] : [a, b];
}
/** Deux prénoms différents. */
export function deuxPrenoms(): [Prenom, Prenom] {
  const p = pick(PRENOMS);
  let q = pick(PRENOMS);
  while (q.nom === p.nom) q = pick(PRENOMS);
  return [p, q];
}
export const il = (p: Prenom) => (p.f ? "elle" : "il");
export const Il = (p: Prenom) => (p.f ? "Elle" : "Il");
export { pick, de, PRENOMS };
export type { Prenom };

// ─── aire_comprendre ────────────────────────────────────────────────────────
// Petites surfaces (cm²) et grandes (m²) : l'unité doit coller à l'objet.
const SURFACES_PETITES: { de: string; min: number; max: number }[] = [
  { de: "d’un timbre", min: 4, max: 9 },
  { de: "d’une feuille de cahier", min: 500, max: 630 },
  { de: "de l’écran d’un téléphone", min: 70, max: 110 },
  { de: "d’une carte à jouer", min: 50, max: 60 },
  { de: "d’un ticket de bus", min: 20, max: 30 },
  { de: "d’une étiquette de pot de confiture", min: 30, max: 60 },
  { de: "d’une photo de vacances", min: 90, max: 150 },
  { de: "d’un post-it", min: 50, max: 76 },
  { de: "d’un carreau de chocolat", min: 4, max: 8 },
  { de: "de la couverture d’un livre", min: 300, max: 450 },
];
const SURFACES_GRANDES: { de: string; min: number; max: number }[] = [
  { de: "du sol d’une chambre", min: 9, max: 16 },
  { de: "d’un terrain de basket", min: 400, max: 450 },
  { de: "de la pelouse d’un parc", min: 600, max: 900 },
  { de: "d’un tapis de judo", min: 30, max: 60 },
  { de: "d’un mur du salon", min: 10, max: 20 },
  { de: "d’un potager", min: 20, max: 60 },
  { de: "de la cour de l’école", min: 500, max: 900 },
  { de: "du toit d’une cabane", min: 4, max: 9 },
  { de: "d’une salle de classe", min: 50, max: 70 },
];
const AUTRES_UNITES = ["kg", "g", "L"];

/* ⛔⛔ 03/11/2026 — D'ABORD LE GESTE NU (Frédéric, ../REGLES-6E.md) : à ★1 et
   ★2, ni prénom, ni objet de la vie, ni lieu — « un rectangle de 6 cm sur
   4 cm », 12 mots au plus à ★1, 15 à ★2, verbe d'action en tête. Les
   situations (timbre, chambre, potager, carrelage…) servent à partir de ★3 :
   les gabarits « _ctx3 » les gardent. La variété vient des nombres, des unités,
   du nom de la figure, de la tournure, et du dessin quand il remplace la lecture. */
const UNITES_NUES = ["cm", "cm", "dm", "m"];
const NOMS_RECT = ["", "", "", "ABCD", "EFGH", "MNOP"];
/** Un rectangle (ou un carré) dessiné, ses côtés écrits dessus : l'élève lit la figure, pas une phrase. */
function quadriCote(L: number, l: number, u: string, carre: boolean): QuadrilatereCanvasData {
  const w = 180;
  const h = carre ? w : Math.max(50, Math.round((w * l) / L));
  const x0 = 50;
  const y0 = 50;
  return {
    kind: "quadrilatere" as const,
    points: { A: { x: x0, y: y0 }, B: { x: x0 + w, y: y0 }, C: { x: x0 + w, y: y0 + h }, D: { x: x0, y: y0 + h } },
    sideLabels: carre ? { AB: `${nf(L)} ${u}` } : { AB: `${nf(L)} ${u}`, BC: `${nf(l)} ${u}` },
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      equalSides: carre ? [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]] : [["AB", "CD"], ["BC", "DA"]],
    },
  };
}

/** ★1-★2 : quelle unité pour une aire ? La figure et ses côtés, sans objet. */
function genAireComprendreUniteNue() {
  const u = pick(UNITES_NUES);
  const autre = pick(AUTRES_UNITES);
  const choices = shuffle([`${u}²`, u, `${u}³`, autre]);
  const explication = expl(
    `Une aire mesure une surface : elle s’écrit avec une unité CARRÉE. ${u} mesure une longueur, ${u}³ un volume. Ici l’aire s’écrit en ${u}².`
  );
  if (Math.random() < 0.55) {
    const c = randomInt(2, 12);
    const L = randomInt(4, 12);
    const l = randomInt(2, L - 1);
    const text = pick([
      `Un carré mesure ${c} ${u} de côté. Son aire s’écrit en…`,
      `Côté du carré : ${c} ${u}. Quelle unité pour son aire ?`,
      `Un rectangle mesure ${L} ${u} sur ${l} ${u}. Son aire s’écrit en…`,
    ]);
    return { text, format: "qcm" as const, choices, expected: [`${u}²`], comparator: "mcq_exact" as const, explanation: explication };
  }
  const n = randomInt(4, 90);
  const N = nf(n);
  const text = pick([
    "Laquelle de ces mesures est une aire ?",
    "Choisis la mesure d’une aire.",
    "Quelle écriture donne une aire ?",
    "Trouve la mesure qui est une aire.",
  ]);
  return {
    text,
    format: "qcm" as const,
    choices: shuffle([`${N} ${u}²`, `${N} ${u}`, `${N} ${u}³`, `${N} ${autre}`]),
    expected: [`${N} ${u}²`],
    comparator: "mcq_exact" as const,
    explanation: expl(`Une aire s’écrit avec une unité carrée. ${N} ${u} est une longueur, ${N} ${u}³ un volume. L’aire est donc ${N} ${u}².`),
  };
}

/** ★2 : le tour, l'intérieur ou l'espace d'une figure nue — périmètre, aire ou volume. */
const FIGURES_PLANES = ["carré", "rectangle", "triangle", "disque", "losange", "hexagone"];
const SOLIDES = ["cube", "pavé droit"];
function genAireComprendreGrandeurNue() {
  const r = Math.random();
  const [quoi, rep, f] =
    r < 0.45
      ? [pick(["l’intérieur", "la surface"]), "l’aire", pick(FIGURES_PLANES)]
      : r < 0.85
        ? [pick(["le tour", "le contour", "le bord"]), "le périmètre", pick(FIGURES_PLANES)]
        : ["l’espace", "le volume", pick(SOLIDES)];
  const text = pick([
    `On mesure ${quoi} d’un ${f}. Quelle grandeur est-ce ?`,
    `Quelle grandeur mesure ${quoi} d’un ${f} ?`,
    `${maj(quoi)} d’un ${f} : quelle grandeur mesure-t-on ?`,
  ]);
  const pourquoi =
    rep === "l’aire"
      ? "L’intérieur, toute la surface : on mesure l’aire."
      : rep === "le périmètre"
        ? "On ne s’occupe que du bord, tout autour : on mesure le périmètre."
        : "L’espace occupé par un solide : on mesure le volume.";
  return {
    text,
    format: "qcm" as const,
    choices: shuffle(["l’aire", "le périmètre", "le volume", "la masse"]),
    expected: [rep],
    comparator: "mcq_exact" as const,
    explanation: expl(pourquoi),
  };
}

function genAireComprendreUnite() {
  const grande = Math.random() < 0.5;
  const o = pick(grande ? SURFACES_GRANDES : SURFACES_PETITES);
  const u = grande ? "m" : "cm";
  const p = pick(PRENOMS);
  const autre = pick(AUTRES_UNITES);
  if (Math.random() < 0.5) {
    const text = pick([
      `${p.nom} veut connaître l’aire ${o.de}. Quelle unité doit-${il(p)} choisir ?`,
      `Quelle unité convient pour mesurer l’aire ${o.de} ?`,
      `Pour mesurer la surface ${o.de}, ${p.nom} hésite entre quatre unités. Laquelle convient ?`,
      `${p.nom} calcule l’aire ${o.de}. Dans quelle unité peut-${il(p)} écrire son résultat ?`,
    ]);
    return {
      text,
      format: "qcm" as const,
      choices: shuffle([`${u}²`, u, `${u}³`, autre]),
      expected: [`${u}²`],
      comparator: "mcq_exact" as const,
      explanation: expl(
        `Une aire mesure une surface : elle s’écrit avec une unité CARRÉE. ${u} mesure une longueur, ${u}³ un volume, ${autre} ${autre === "L" ? "une contenance" : "une masse"}. Ici on choisit ${u}².`
      ),
    };
  }
  const n = randomInt(o.min, o.max);
  const N = nf(n);
  const text = pick([
    `${p.nom} a noté quatre mesures. Laquelle peut être l’aire ${o.de} ?`,
    `Laquelle de ces mesures peut être l’aire ${o.de} ?`,
    `Voici quatre écritures. Laquelle donne l’aire ${o.de} ?`,
  ]);
  return {
    text,
    format: "qcm" as const,
    choices: shuffle([`${N} ${u}²`, `${N} ${u}`, `${N} ${u}³`, `${N} ${autre}`]),
    expected: [`${N} ${u}²`],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `Une aire s’écrit avec une unité carrée. ${N} ${u} est une longueur, ${N} ${u}³ un volume. L’aire est donc ${N} ${u}².`
    ),
  };
}

// Ce que l'on veut faire dit ce qu'il faut mesurer : couvrir → aire,
// faire le tour → périmètre, remplir → volume.
const ACTIONS_GRANDEUR: { phrase: string; rep: "l’aire" | "le périmètre" | "le volume" }[] = [
  { phrase: "veut poser du gazon sur tout son jardin", rep: "l’aire" },
  { phrase: "veut peindre tout un mur de sa chambre", rep: "l’aire" },
  { phrase: "veut couvrir toute la table avec une nappe", rep: "l’aire" },
  { phrase: "veut carreler tout le sol de la salle de bain", rep: "l’aire" },
  { phrase: "veut poser de la moquette dans toute sa chambre", rep: "l’aire" },
  { phrase: "veut savoir quelle place son tapis occupe sur le sol", rep: "l’aire" },
  { phrase: "veut acheter le tissu d’un drapeau entier", rep: "l’aire" },
  { phrase: "veut semer des fleurs sur toute la plate-bande", rep: "l’aire" },
  { phrase: "veut recouvrir son cahier de papier", rep: "l’aire" },
  { phrase: "veut poser une clôture autour du potager", rep: "le périmètre" },
  { phrase: "veut coller un ruban tout autour d’un cadre photo", rep: "le périmètre" },
  { phrase: "veut mettre une guirlande tout autour de la fenêtre", rep: "le périmètre" },
  { phrase: "veut coudre un galon sur tout le bord d’une nappe", rep: "le périmètre" },
  { phrase: "veut planter une haie tout autour du jardin", rep: "le périmètre" },
  { phrase: "veut remplir un aquarium d’eau", rep: "le volume" },
  { phrase: "veut remplir un bac de sable", rep: "le volume" },
];

function genAireComprendreGrandeur() {
  const a = pick(ACTIONS_GRANDEUR);
  const p = pick(PRENOMS);
  const text = pick([
    `${p.nom} ${a.phrase}. Que doit-${il(p)} mesurer ?`,
    `${p.nom} ${a.phrase}. Quelle grandeur doit-${il(p)} calculer ?`,
    `${p.nom} ${a.phrase}. Avant de commencer, que doit-${il(p)} connaître ?`,
    `Ce week-end, ${p.nom} ${a.phrase}. Quelle mesure lui faut-il ?`,
  ]);
  const pourquoi =
    a.rep === "l’aire"
      ? "Il faut couvrir toute une surface : on mesure l’aire."
      : a.rep === "le périmètre"
        ? "On ne s’occupe que du bord, tout autour : on mesure le périmètre."
        : "Il faut remplir un espace : on mesure le volume.";
  return {
    text,
    format: "qcm" as const,
    choices: shuffle(["l’aire", "le périmètre", "le volume", "la masse"]),
    expected: [a.rep],
    comparator: "mcq_exact" as const,
    explanation: expl(pourquoi),
  };
}

// ─── aire_compter ───────────────────────────────────────────────────────────
// Une surface pavée de carrés UNITÉS : l'aire est le nombre de carrés, suivi
// de l'unité du carré (1 cm², 1 dm² ou 1 m²).
const PAVAGES: { intro: (p: Prenom) => string; carre: string; u: string }[] = [
  { intro: (p) => `Sur du papier à carreaux de 1 cm², ${p.nom} colorie une figure.`, carre: "carreaux", u: "cm²" },
  { intro: (p) => `${p.nom} fait une mosaïque avec des carreaux de 1 cm².`, carre: "carreaux", u: "cm²" },
  { intro: (p) => `${p.nom} dessine un robot avec des cases de 1 cm².`, carre: "cases", u: "cm²" },
  { intro: (p) => `${p.nom} décore une boîte avec des gommettes carrées de 1 cm².`, carre: "gommettes", u: "cm²" },
  { intro: (p) => `${p.nom} coud un patchwork avec des carrés de tissu de 1 dm².`, carre: "carrés", u: "dm²" },
  { intro: (p) => `${p.nom} colle des post-it carrés de 1 dm² sur sa porte.`, carre: "post-it", u: "dm²" },
  { intro: (p) => `Le mur de cuisine ${de(p.nom)} a des carreaux de 1 dm².`, carre: "carreaux", u: "dm²" },
  { intro: (p) => `Pour la gym, ${p.nom} pose des dalles de mousse de 1 m².`, carre: "dalles", u: "m²" },
  { intro: (p) => `${p.nom} partage son potager en parcelles carrées de 1 m².`, carre: "parcelles", u: "m²" },
  { intro: (p) => `Sur la terrasse ${de(p.nom)}, on pose des dalles de 1 m².`, carre: "dalles", u: "m²" },
  { intro: (p) => `Au judo, ${p.nom} pose des tapis carrés de 1 m².`, carre: "tapis", u: "m²" },
  { intro: (p) => `Pour la kermesse, ${p.nom} trace une marelle en cases de 1 m².`, carre: "cases", u: "m²" },
];
const QUESTIONS_AIRE_COUVERTE = [
  "Quelle aire est couverte ?",
  "Calcule l’aire totale.",
  "Trouve l’aire totale.",
  "Combien mesure cette aire ?",
];

/** ★2 nu : des lignes de carreaux unités, dessinées (on compte) ou écrites (on additionne). */
function genAireCompterLignesNue() {
  const u = pick(["cm²", "cm²", "dm²", "m²"]);
  const n = randomInt(2, 4);
  const lignes = Array.from({ length: n }, () => randomInt(2, 8));
  const total = lignes.reduce((a, b) => a + b, 0);
  const explication = expl(
    `Chaque carreau a une aire de 1 ${u}. On compte tous les carreaux : ${lignes.join(" + ")} = ${total}. L’aire est donc ${total} ${u}.`
  );
  const base = { format: "short" as const, expected: avecUnite(total, u), comparator: "number_equal" as const, explanation: explication };
  if (n === 4 || Math.random() < 0.5) {
    // Le dessin : une ligne de carreaux par rangée, calées à gauche.
    const filledCells: FigureLibreCanvasData["grid"]["filledCells"] = [];
    lignes.forEach((k, r) => {
      for (let c = 0; c < k; c++) filledCells.push([r, c]);
    });
    return {
      ...base,
      text: pick([
        `Un carreau fait 1 ${u}. Calcule l’aire de la figure.`,
        `Chaque carreau mesure 1 ${u}. Quelle est l’aire de la figure ?`,
        `Compte les carreaux de 1 ${u}. Écris l’aire de la figure.`,
      ]),
      canvas: {
        kind: "figure_libre" as const,
        grid: { rows: n + 1, cols: 10, filledCells },
        display: { showGrid: true, showFilled: true, showPerimeter: true },
        size: { cellSize: 26, padding: 14 },
      },
    };
  }
  const liste = lignes.slice(0, -1).join(", ") + " et " + lignes[n - 1];
  return {
    ...base,
    text: pick([
      `Lignes de ${liste} carreaux de 1 ${u}. Calcule l’aire.`,
      `Écris l’aire : ${liste} carreaux de 1 ${u} par ligne.`,
    ]),
  };
}

function genAireCompterLignes() {
  const ctx = pick(PAVAGES);
  const p = pick(PRENOMS);
  const n = randomInt(2, 4);
  const lignes = Array.from({ length: n }, () => randomInt(2, 9));
  const liste = lignes.slice(0, -1).join(", ") + " et " + lignes[lignes.length - 1];
  const total = lignes.reduce((a, b) => a + b, 0);
  return {
    text: `${ctx.intro(p)} Lignes : ${liste} ${ctx.carre}. ${pick(QUESTIONS_AIRE_COUVERTE)}`,
    format: "short" as const,
    expected: avecUnite(total, ctx.u),
    comparator: "number_equal" as const,
    explanation: expl(
      `Chaque carré a une aire de 1 ${ctx.u}. On compte tous les carrés : ${lignes.join(" + ")} = ${total}. L’aire est donc ${total} ${ctx.u}.`
    ),
  };
}

function genAireCompterRangees() {
  const ctx = pick(PAVAGES);
  const p = pick(PRENOMS);
  const a = randomInt(3, 9);
  const b = randomInt(3, 12);
  const good = a * b;
  const forme = pick([
    `Il y a ${a} rangées de ${b} ${ctx.carre}.`,
    `Il y a ${a} rangées de ${b}.`,
    `${a} rangées, ${b} ${ctx.carre} par rangée.`,
  ]);
  return {
    text: `${ctx.intro(p)} ${forme} ${pick(QUESTIONS_AIRE_COUVERTE)}`,
    format: "qcm" as const,
    choices: makeChoices(`${good} ${ctx.u}`, [
      `${a + b} ${ctx.u}`,
      `${good + 1} ${ctx.u}`,
      `${good - 1} ${ctx.u}`,
      `${2 * (a + b)} ${ctx.u}`,
      `${good + a} ${ctx.u}`,
    ]),
    expected: [`${good} ${ctx.u}`],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `Chaque carré a une aire de 1 ${ctx.u}. ${a} rangées de ${b}, c’est ${a} × ${b} = ${good} carrés. L’aire est donc ${good} ${ctx.u}. Additionner ${a} + ${b} ne compte pas les carrés.`
    ),
  };
}

// ─── aire_convertir ─────────────────────────────────────────────────────────
// ⛔ SEULEMENT m² ↔ dm² ET dm² ↔ cm² (BO de 6e), sans tableau de conversion :
// « 1 dm² = 10 cm × 10 cm = 100 cm² ». Facteur 100, jamais 10.
const OBJETS_M2 = [
  "le plateau de son bureau",
  "le tableau blanc de sa classe",
  "la fenêtre de sa chambre",
  "son tapis de yoga",
  "la porte du placard",
  "une grande affiche de cinéma",
  "la bâche de sa tente",
];
const OBJETS_DM2 = [
  "une feuille de cahier",
  "un set de table",
  "son ardoise",
  "la couverture d’une BD",
  "un carreau de faïence",
  "une serviette en papier",
  "son tapis de souris",
];
type Conversion = { v: number; de: string; vers: string; r: number };
/** Une conversion entre unités voisines ; `grande` = l'objet se mesure en m²/dm². */
function tirerConversion(): Conversion & { objet: string } {
  const grande = Math.random() < 0.5;
  const [haut, bas] = grande ? ["m²", "dm²"] : ["dm²", "cm²"];
  const objet = pick(grande ? OBJETS_M2 : OBJETS_DM2);
  // Une aire plausible pour l'objet, dans l'unité du haut, deux décimales au plus.
  const enHaut = grande ? randomInt(60, 300) / 100 : randomInt(200, 1400) / 100;
  return Math.random() < 0.5
    ? { v: enHaut, de: haut, vers: bas, r: Math.round(enHaut * 100), objet }
    : { v: Math.round(enHaut * 100), de: bas, vers: haut, r: enHaut, objet };
}
function explConversion(c: Conversion) {
  const versPetite = c.r > c.v;
  return versPetite
    ? `1 ${c.de} = 100 ${c.vers} : un carré de 1 ${c.de.replace("²", "")} de côté se découpe en 10 × 10 = 100 carrés de 1 ${c.vers.replace("²", "")} de côté. On va vers une unité plus PETITE, donc le nombre grandit : ${nf(c.v)} × 100 = ${nf(c.r)}. Donc ${nf(c.v)} ${c.de} = ${nf(c.r)} ${c.vers}.`
    : `Il faut 100 ${c.de} pour faire 1 ${c.vers} (10 × 10 = 100). On va vers une unité plus GRANDE, donc le nombre diminue : ${nf(c.v)} ÷ 100 = ${nf(c.r)}. Donc ${nf(c.v)} ${c.de} = ${nf(c.r)} ${c.vers}.`;
}

function genAireConvertir() {
  const c = tirerConversion();
  const p = pick(PRENOMS);
  const V = nf(c.v);
  const text = pick([
    `Convertis ${V} ${c.de} en ${c.vers}.`,
    `Complète : ${V} ${c.de} = … ${c.vers}.`,
    `Combien de ${c.vers} y a-t-il dans ${V} ${c.de} ?`,
    `Écris ${V} ${c.de} en ${c.vers}.`,
    `${p.nom} mesure ${c.objet} : ${V} ${c.de}. Écris cette aire en ${c.vers}.`,
    `Pour un bricolage, ${p.nom} note l’aire ${/^une? /.test(c.objet) ? "d’" : "de "}${c.objet} : ${V} ${c.de}. Combien cela fait-il en ${c.vers} ?`,
  ]);
  return {
    text,
    format: "short" as const,
    expected: avecUnite(c.r, c.vers),
    comparator: "number_equal" as const,
    explanation: expl(explConversion(c)),
  };
}

function genAireConvertirPiege() {
  // Des nombres entiers au départ : les pièges (× 10, × 1 000, ÷ 100 au lieu
  // de × 100) gardent deux chiffres après la virgule au plus.
  const grande = Math.random() < 0.5;
  const [haut, bas] = grande ? ["m²", "dm²"] : ["dm²", "cm²"];
  const versPetite = Math.random() < 0.5;
  const k = randomInt(2, 60);
  const c: Conversion = versPetite
    ? { v: k, de: haut, vers: bas, r: k * 100 }
    : { v: k * 100, de: bas, vers: haut, r: k };
  const pieges = versPetite ? [c.v * 10, c.v * 1000, c.v / 100] : [c.v / 10, c.v / 1000, c.v * 100];
  const faux = pieges[0];
  const [p] = deuxPrenoms();
  const e = p.f ? "e" : "";
  const V = nf(c.v);
  const text = pick([
    `${p.nom} a écrit : « ${V} ${c.de} = ${nf(faux)} ${c.vers} ». ${p.f ? "Elle" : "Il"} s’est trompé${e}. Quel est le bon résultat ?`,
    `${p.nom} convertit ${V} ${c.de} en ${c.vers}. Quel résultat doit-${il(p)} trouver ?`,
    `Complète : ${V} ${c.de} = … ${c.vers}. Choisis le bon résultat.`,
    `${p.nom} hésite : combien font ${V} ${c.de} en ${c.vers} ?`,
  ]);
  return {
    text,
    format: "qcm" as const,
    choices: makeChoices(`${nf(c.r)} ${c.vers}`, pieges.map((x) => `${nf(x)} ${c.vers}`)),
    expected: [`${nf(c.r)} ${c.vers}`],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `${explConversion(c)} Le piège : multiplier ou diviser par 10, comme pour les longueurs. Une aire est un produit de DEUX longueurs : 10 × 10 = 100.`
    ),
  };
}

// ─── Objets rectangulaires et carrés (aire_rectangle, aire_carre, problèmes) ─
type Objet = { nom: string; f: boolean; u: "cm" | "m"; L: [number, number]; l: [number, number] };
const elide = (nom: string) => /^[aeiouéèêh]/i.test(nom);
/** « la chambre », « le potager », « l’étiquette ». */
export const leNom = (o: { nom: string; f: boolean }) => (elide(o.nom) ? `l’${o.nom}` : `${o.f ? "la" : "le"} ${o.nom}`);
/** « de la chambre », « du potager », « de l’étiquette ». */
export const duNom = (o: { nom: string; f: boolean }) => (elide(o.nom) ? `de l’${o.nom}` : o.f ? `de la ${o.nom}` : `du ${o.nom}`);
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const RECTANGLES: Objet[] = [
  { nom: "étiquette", f: true, u: "cm", L: [6, 10], l: [3, 5] },
  { nom: "ticket de cinéma", f: false, u: "cm", L: [7, 9], l: [3, 5] },
  { nom: "carte postale", f: true, u: "cm", L: [14, 16], l: [9, 11] },
  { nom: "tablette de chocolat", f: true, u: "cm", L: [15, 18], l: [7, 9] },
  { nom: "photo de classe", f: true, u: "cm", L: [15, 20], l: [10, 13] },
  { nom: "set de table", f: false, u: "cm", L: [40, 45], l: [28, 32] },
  { nom: "écran de la tablette", f: false, u: "cm", L: [20, 25], l: [14, 17] },
  { nom: "couvercle du jeu de société", f: false, u: "cm", L: [25, 30], l: [15, 20] },
  { nom: "chambre", f: true, u: "m", L: [3, 6], l: [2, 3] },
  { nom: "potager", f: false, u: "m", L: [5, 12], l: [2, 4] },
  { nom: "terrasse", f: true, u: "m", L: [4, 8], l: [3, 4] },
  { nom: "place de parking", f: true, u: "m", L: [5, 5], l: [2, 3] },
  { nom: "enclos des poules", f: false, u: "m", L: [4, 8], l: [2, 3] },
  { nom: "salle de classe", f: true, u: "m", L: [8, 10], l: [6, 7] },
  { nom: "terrain de mini-foot", f: false, u: "m", L: [30, 40], l: [15, 25] },
  { nom: "bâche de la piscine", f: true, u: "m", L: [4, 6], l: [2, 3] },
];
const CARRES: Objet[] = [
  { nom: "timbre", f: false, u: "cm", L: [2, 3], l: [0, 0] },
  { nom: "post-it", f: false, u: "cm", L: [7, 8], l: [0, 0] },
  { nom: "carreau de faïence", f: false, u: "cm", L: [10, 20], l: [0, 0] },
  { nom: "coussin", f: false, u: "cm", L: [30, 45], l: [0, 0] },
  { nom: "plateau d’échecs", f: false, u: "cm", L: [30, 50], l: [0, 0] },
  { nom: "boîte à pizza", f: true, u: "cm", L: [28, 34], l: [0, 0] },
  { nom: "serviette en papier", f: true, u: "cm", L: [20, 33], l: [0, 0] },
  { nom: "bac à sable", f: false, u: "m", L: [2, 4], l: [0, 0] },
  { nom: "ring de boxe", f: false, u: "m", L: [5, 7], l: [0, 0] },
  { nom: "parcelle de fraises", f: true, u: "m", L: [2, 6], l: [0, 0] },
  { nom: "piscine", f: true, u: "m", L: [4, 8], l: [0, 0] },
  { nom: "salle de danse", f: true, u: "m", L: [8, 12], l: [0, 0] },
];
/** À une étoile : des côtés de 10 au plus. */
const petitsCotes = (o: Objet) => o.L[0] <= 10;

/** Un rectangle : longueur et largeur entières, ou (★3) une demi-unité. */
function tirerRectangle(etoile: 1 | 2 | 3) {
  const p = pick(PRENOMS);
  const geometrie = Math.random() < (etoile === 1 ? 0.35 : 0.15);
  if (geometrie) {
    // Sur un cahier ou dans du carton : des cm (des dm pour un grand carton).
    const u = pick(["cm", "cm", "cm", "dm"]);
    const L = randomInt(4, etoile === 1 ? 10 : 15);
    const l = randomInt(2, L - 1);
    return { p, o: null as Objet | null, u, L, l };
  }
  const o = pick(RECTANGLES.filter((x) => etoile > 1 || petitsCotes(x)));
  let L = randomInt(o.L[0], o.L[1]);
  let l = randomInt(o.l[0], o.l[1]);
  // Une chambre de 3 m sur 3 m serait un carré : la largeur reste plus petite.
  while (l >= L) l = randomInt(o.l[0], o.l[1]);
  if (etoile === 3 && o.u === "m" && Math.random() < 0.5 && L < 20) L += 0.5;
  return { p, o, u: o.u as string, L, l };
}

/** ★1-★2 : un rectangle nu, écrit ou dessiné. */
function genAireRectangleNu(etoile: 1 | 2) {
  const u = pick(UNITES_NUES);
  const L = randomInt(3, etoile === 1 ? 10 : 15);
  const l = randomInt(2, L - 1);
  const Ls = `${L} ${u}`;
  const ls = `${l} ${u}`;
  const nom = pick(NOMS_RECT);
  const leR = nom ? `le rectangle ${nom}` : "un rectangle";
  const duR = nom ? `du rectangle ${nom}` : "d’un rectangle";
  const base = {
    format: "short" as const,
    expected: avecUnite(L * l, `${u}²`),
    comparator: "number_equal" as const,
    explanation: expl(
      `L’aire d’un rectangle est longueur × largeur : ${L} × ${l} = ${L * l}. Des ${u} fois des ${u} donnent des ${u}² : l’aire est ${L * l} ${u}².`
    ),
  };
  if (Math.random() < 0.25)
    return {
      ...base,
      text: pick(["Calcule l’aire du rectangle ABCD.", "Quelle est l’aire du rectangle ABCD ?", "Observe le rectangle. Calcule son aire."]),
      canvas: quadriCote(L, l, u, false),
    };
  const formes = [
    `Calcule l’aire ${duR} de ${Ls} sur ${ls}.`,
    `${maj(leR)} mesure ${Ls} sur ${ls}. Calcule son aire.`,
    `Longueur ${Ls}, largeur ${ls}. Calcule l’aire du rectangle${nom ? ` ${nom}` : ""}.`,
    `Trouve l’aire ${duR} de ${Ls} sur ${ls}.`,
  ];
  if (etoile === 2)
    formes.push(
      `Longueur ${Ls} et largeur ${ls} : calcule l’aire du rectangle${nom ? ` ${nom}` : ""}.`,
      `Quelle est l’aire ${duR} de ${ls} sur ${Ls} ?`,
    );
  return { ...base, text: pick(formes) };
}

/** ★1-★2 : un carré nu, écrit ou dessiné. */
function genAireCarreNu(etoile: 1 | 2) {
  const u = pick(UNITES_NUES);
  const c = randomInt(2, etoile === 1 ? 10 : 15);
  const cs = `${c} ${u}`;
  const nom = pick(["", "", "", "ABCD", "EFGH", "RSTU"]);
  const leC = nom ? `le carré ${nom}` : "un carré";
  const duC = nom ? `du carré ${nom}` : "d’un carré";
  const base = {
    format: "short" as const,
    expected: avecUnite(c * c, `${u}²`),
    comparator: "number_equal" as const,
    explanation: expl(`L’aire d’un carré est côté × côté : ${c} × ${c} = ${c * c}. L’aire est ${c * c} ${u}².`),
  };
  if (Math.random() < 0.25)
    return {
      ...base,
      text: pick(["Calcule l’aire du carré ABCD.", "Quelle est l’aire du carré ABCD ?", "Observe le carré. Calcule son aire."]),
      canvas: quadriCote(c, c, u, true),
    };
  const formes = [
    `Calcule l’aire ${duC} de côté ${cs}.`,
    `${maj(leC)} mesure ${cs} de côté. Calcule son aire.`,
    `Trouve l’aire ${duC} de ${cs} de côté.`,
    `Côté du carré${nom ? ` ${nom}` : ""} : ${cs}. Calcule son aire.`,
  ];
  if (etoile === 2) formes.push(`Quelle est l’aire ${duC} de côté ${cs} ?`, `${maj(leC)} a pour côté ${cs}. Quelle est son aire ?`);
  return { ...base, text: pick(formes) };
}

function genAireRectangle(etoile: 1 | 2 | 3) {
  if (etoile < 3) return genAireRectangleNu(etoile as 1 | 2);
  const { p, o, u, L, l } = tirerRectangle(etoile);
  const A = L * l;
  const Ls = `${nf(L)} ${u}`;
  const ls = `${nf(l)} ${u}`;
  const sujet = o ? `${maj(leNom(o))} ${de(p.nom)}` : `Le rectangle ${de(p.nom)}`;
  const intro = o
    ? pick([
        `${sujet} mesure ${Ls} de long et ${ls} de large.`,
        `${sujet} mesure ${Ls} sur ${ls}.`,
        `${sujet} a une longueur de ${Ls} et une largeur de ${ls}.`,
        `${sujet} fait ${ls} de large et ${Ls} de long.`,
      ])
    : pick([
        `Sur son cahier, ${p.nom} trace un rectangle de ${Ls} sur ${ls}.`,
        `${p.nom} dessine un rectangle. Sa longueur est ${Ls}, sa largeur ${ls}.`,
        `${p.nom} découpe dans du carton un rectangle de ${ls} sur ${Ls}.`,
      ]);
  const question = o
    ? pick([`Quelle est son aire ?`, `Calcule son aire.`, `Combien mesure son aire ?`, `Quelle surface couvre-t-${o.f ? "elle" : "il"} ?`])
    : pick(["Quelle est l’aire de ce rectangle ?", "Calcule l’aire du rectangle.", "Combien mesure l’aire de ce rectangle ?"]);
  const base = {
    text: `${intro} ${question}`,
    explanation: expl(
      `L’aire d’un rectangle est longueur × largeur : ${nf(L)} × ${nf(l)} = ${nf(A)}. Des ${u} fois des ${u} donnent des ${u}² : l’aire est ${nf(A)} ${u}².`
    ),
  };
  if (etoile < 3)
    return { ...base, format: "short" as const, expected: avecUnite(A, `${u}²`), comparator: "number_equal" as const };
  return {
    ...base,
    format: "qcm" as const,
    choices: makeChoices(`${nf(A)} ${u}²`, [
      `${nf(2 * (L + l))} ${u}²`,
      `${nf(L + l)} ${u}²`,
      `${nf(A)} ${u}`,
      `${nf(A + L)} ${u}²`,
    ]),
    expected: [`${nf(A)} ${u}²`],
    comparator: "mcq_exact" as const,
  };
}

function genAireCarre(etoile: 1 | 2 | 3) {
  if (etoile < 3) return genAireCarreNu(etoile as 1 | 2);
  const p = pick(PRENOMS);
  const geometrie = Math.random() < (etoile === 1 ? 0.35 : 0.15);
  const o = geometrie ? null : pick(CARRES.filter((x) => etoile > 1 || petitsCotes(x)));
  const u: string = o ? o.u : pick(["cm", "cm", "cm", "dm"]);
  const c = o ? randomInt(o.L[0], o.L[1]) : randomInt(2, etoile === 1 ? 10 : 15);
  const A = c * c;
  const cs = `${c} ${u}`;
  const intro = o
    ? pick([
        `${maj(leNom(o))} ${de(p.nom)} est un carré de ${cs} de côté.`,
        `${maj(leNom(o))} ${de(p.nom)} est carré${o.f ? "e" : ""} : chaque côté mesure ${cs}.`,
        `${p.nom} mesure ${leNom(o)} : c’est un carré de côté ${cs}.`,
      ])
    : pick([
        `${p.nom} trace un carré de ${cs} de côté.`,
        `Sur son cahier, ${p.nom} dessine un carré. Ses quatre côtés mesurent ${cs}.`,
        `${p.nom} découpe un carré de côté ${cs} dans du papier.`,
      ]);
  const question = o
    ? pick([`Quelle est l’aire ${duNom(o)} ?`, `Calcule l’aire ${duNom(o)}.`, `Combien mesure son aire ?`])
    : pick(["Quelle est l’aire de ce carré ?", "Calcule l’aire du carré.", "Combien mesure l’aire de ce carré ?"]);
  const base = {
    text: `${intro} ${question}`,
    explanation: expl(`L’aire d’un carré est côté × côté : ${c} × ${c} = ${nf(A)}. L’aire est ${nf(A)} ${u}².`),
  };
  if (etoile < 3)
    return { ...base, format: "short" as const, expected: avecUnite(A, `${u}²`), comparator: "number_equal" as const };
  return {
    ...base,
    format: "qcm" as const,
    // À 4 de côté, 4 × 4 et le périmètre valent tous deux 16 : makeChoices
    // écarte le piège qui tombe sur la réponse.
    choices: makeChoices(`${nf(A)} ${u}²`, [`${4 * c} ${u}²`, `${2 * c} ${u}²`, `${nf(A + c)} ${u}²`, `${nf(A)} ${u}`]),
    expected: [`${nf(A)} ${u}²`],
    comparator: "mcq_exact" as const,
  };
}

// ─── aire_comparer ──────────────────────────────────────────────────────────
type CtxDeuxAires = { u: string; min: number; max: number; phrase: (p: Prenom, q: Prenom, a: string, b: string) => string };
const CTX_DEUX_AIRES: CtxDeuxAires[] = [
  { u: "m²", min: 8, max: 20, phrase: (p, q, a, b) => `La chambre ${de(p.nom)} mesure ${a}. Celle ${de(q.nom)} mesure ${b}.` },
  { u: "m²", min: 10, max: 60, phrase: (p, q, a, b) => `Le potager ${de(p.nom)} couvre ${a}. Celui ${de(q.nom)} couvre ${b}.` },
  { u: "m²", min: 2, max: 15, phrase: (p, q, a, b) => `Pour la fête de l’école, ${p.nom} peint une fresque de ${a}. ${q.nom} en peint une de ${b}.` },
  { u: "cm²", min: 40, max: 300, phrase: (p, q, a, b) => `Sur la feuille, le dessin ${de(p.nom)} occupe ${a}. Celui ${de(q.nom)} occupe ${b}.` },
  { u: "m²", min: 2, max: 8, phrase: (p, q, a, b) => `Le tapis ${de(p.nom)} a une aire de ${a}. Celui ${de(q.nom)} a une aire de ${b}.` },
  { u: "dm²", min: 20, max: 90, phrase: (p, q, a, b) => `L’affiche de concert ${de(p.nom)} mesure ${a}. Celle ${de(q.nom)} mesure ${b}.` },
  { u: "m²", min: 3, max: 12, phrase: (p, q, a, b) => `Au camping, la tente ${de(p.nom)} couvre ${a} au sol. Celle ${de(q.nom)} couvre ${b}.` },
  { u: "dm²", min: 10, max: 40, phrase: (p, q, a, b) => `Le fond de l’aquarium ${de(p.nom)} mesure ${a}. Celui de l’aquarium ${de(q.nom)} mesure ${b}.` },
  { u: "dm²", min: 20, max: 80, phrase: (p, q, a, b) => `La voile du cerf-volant ${de(p.nom)} mesure ${a}. Celle du cerf-volant ${de(q.nom)} mesure ${b}.` },
  { u: "cm²", min: 40, max: 120, phrase: (p, q, a, b) => `La part de pizza ${de(p.nom)} couvre ${a}. Celle ${de(q.nom)} couvre ${b}.` },
  { u: "m²", min: 60, max: 150, phrase: (p, q, a, b) => `L’emplacement de camping ${de(p.nom)} fait ${a}. Celui ${de(q.nom)} fait ${b}.` },
  { u: "cm²", min: 90, max: 300, phrase: (p, q, a, b) => `La photo ${de(p.nom)} a une aire de ${a}. Celle ${de(q.nom)} a une aire de ${b}.` },
  { u: "m²", min: 20, max: 45, phrase: (_p, _q, a, b) => `Au gymnase, le tapis de judo couvre ${a}. Le tapis de lutte couvre ${b}.` },
  { u: "m²", min: 15, max: 40, phrase: (_p, _q, a, b) => `À la ferme, l’enclos des chèvres mesure ${a}. L’enclos des moutons mesure ${b}.` },
];
const QUESTIONS_DEUX_AIRES: { q: string; grand: boolean }[] = [
  { q: "Écris la plus grande aire.", grand: true },
  { q: "Écris la plus petite aire.", grand: false },
  { q: "Donne la plus grande aire.", grand: true },
  { q: "Quelle aire est la plus petite ?", grand: false },
];

/** ★2 nu : deux aires dans la même unité, on garde la plus grande ou la plus petite. */
function genAireComparerDeuxNu() {
  const [u, lo, hi] = pick([["cm²", 10, 300], ["dm²", 5, 90], ["m²", 4, 150]] as [string, number, number][]);
  const a = randomInt(lo, hi);
  let b = randomInt(lo, hi);
  while (b === a) b = randomInt(lo, hi);
  const grand = Math.random() < 0.5;
  const mot = grand ? "grande" : "petite";
  const A = `${a} ${u}`;
  const B = `${b} ${u}`;
  const text = pick([
    `Compare ${A} et ${B}. Écris la plus ${mot} aire.`,
    `Figure A : ${A}. Figure B : ${B}. Écris la plus ${mot}.`,
    `Quelle est la plus ${mot} aire : ${A} ou ${B} ?`,
    `Écris la plus ${mot} aire : ${A} ou ${B}.`,
  ]);
  const r = grand ? Math.max(a, b) : Math.min(a, b);
  return {
    text,
    format: "short" as const,
    expected: avecUnite(r, u),
    comparator: "number_equal" as const,
    explanation: expl(
      `Les deux aires sont dans la même unité (${u}) : on compare les nombres. ${Math.min(a, b)} < ${Math.max(a, b)}. La plus ${mot} est ${r} ${u}.`
    ),
  };
}

function genAireComparerDeux() {
  const ctx = pick(CTX_DEUX_AIRES);
  const [p, q] = deuxPrenoms();
  const a = randomInt(ctx.min, ctx.max);
  let b = randomInt(ctx.min, ctx.max);
  while (b === a) b = randomInt(ctx.min, ctx.max);
  const t = pick(QUESTIONS_DEUX_AIRES);
  const r = t.grand ? Math.max(a, b) : Math.min(a, b);
  return {
    text: `${ctx.phrase(p, q, `${a} ${ctx.u}`, `${b} ${ctx.u}`)} ${t.q}`,
    format: "short" as const,
    expected: avecUnite(r, ctx.u),
    comparator: "number_equal" as const,
    explanation: expl(
      `Les deux aires sont dans la même unité (${ctx.u}) : on compare les nombres. ${Math.min(a, b)} < ${Math.max(a, b)}. La plus ${t.grand ? "grande" : "petite"} est ${r} ${ctx.u}.`
    ),
  };
}

// Deux rectangles : il faut CALCULER les aires avant de comparer. Une fois sur
// quatre, les deux aires sont égales avec des formes différentes (4 × 6 et 3 × 8).
const OBJETS_COMPARES: { nom: string; f: boolean; u: string; lo: number; hi: number }[] = [
  { nom: "tapis", f: false, u: "m", lo: 1, hi: 4 },
  { nom: "potager", f: false, u: "m", lo: 2, hi: 10 },
  { nom: "affiche", f: true, u: "dm", lo: 3, hi: 9 },
  { nom: "serviette", f: true, u: "dm", lo: 8, hi: 18 },
  { nom: "photo", f: true, u: "cm", lo: 9, hi: 20 },
  { nom: "nappe", f: true, u: "dm", lo: 10, hi: 20 },
  { nom: "bâche", f: true, u: "m", lo: 2, hi: 8 },
  { nom: "tableau", f: false, u: "dm", lo: 4, hi: 12 },
  { nom: "drapeau", f: false, u: "dm", lo: 4, hi: 12 },
  { nom: "terrain", f: false, u: "m", lo: 3, hi: 15 },
];

function genAireComparerRectangles() {
  const o = pick(OBJETS_COMPARES);
  const [p, q] = deuxPrenoms();
  const tir = () => {
    const x = randomInt(o.lo, o.hi);
    let y = randomInt(o.lo, o.hi);
    while (y === x) y = randomInt(o.lo, o.hi);
    return [Math.max(x, y), Math.min(x, y)];
  };
  let [a, b] = tir();
  let [c, d] = tir();
  if (Math.random() < 0.25) {
    for (let k = 0; k < 300; k++) {
      [c, d] = tir();
      if (c * d === a * b && c !== a) break;
      [a, b] = tir();
    }
  }
  while (c === a && d === b) [c, d] = tir();
  // Le plus souvent, l'un est plus long et l'autre plus large : impossible de
  // conclure sans calculer.
  if ((a - c) * (b - d) > 0 && Math.random() < 0.75) {
    [b, d] = [d, b];
    if (a === b || c === d) [b, d] = [d, b];
  }
  while (c === a && d === b) [c, d] = tir();
  const grand = Math.random() < 0.6;
  const A1 = a * b;
  const A2 = c * d;
  const celui = (x: Prenom) => `${o.f ? "celle" : "celui"} ${de(x.nom)}`;
  const egales = "les deux ont la même aire";
  const juste = A1 === A2 ? egales : (A1 > A2) === grand ? celui(p) : celui(q);
  const un = o.f ? "une" : "un";
  const text = pick([
    `${p.nom} a ${un} ${o.nom} de ${a} ${o.u} sur ${b} ${o.u}. ${maj(celui(q))} mesure ${c} ${o.u} sur ${d} ${o.u}. ${o.f ? "Laquelle" : "Lequel"} a la plus ${grand ? "grande" : "petite"} aire ?`,
    `${maj(o.f ? "la" : "le")} ${o.nom} ${de(p.nom)} mesure ${a} ${o.u} sur ${b} ${o.u}. ${maj(o.f ? "celle" : "celui")} ${de(q.nom)} mesure ${c} ${o.u} sur ${d} ${o.u}. ${o.f ? "Laquelle" : "Lequel"} couvre la plus ${grand ? "grande" : "petite"} surface ?`,
  ]);
  return {
    text: text.replace(/^Le affiche|^La affiche/, "L’affiche"),
    format: "qcm" as const,
    choices: shuffle([celui(p), celui(q), egales]),
    expected: [juste],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `On calcule chaque aire : ${a} × ${b} = ${A1} ${o.u}² et ${c} × ${d} = ${A2} ${o.u}². ${A1 === A2 ? "Les deux aires sont égales, même si les formes sont différentes." : `La plus ${grand ? "grande" : "petite"} aire est ${grand ? Math.max(A1, A2) : Math.min(A1, A2)} ${o.u}² : c’est ${juste}.`} Comparer les côtés un par un ne suffit pas.`
    ),
  };
}

// ─── aire_decomposer ────────────────────────────────────────────────────────
// Une surface faite de morceaux : on ajoute leurs aires (ou on retrouve le
// morceau qui manque quand l'aire totale est donnée).
type Assemblage = { u: string; tout: string; parties: [string, number, number][]; intro: (p: Prenom) => string };
const ASSEMBLAGES: Assemblage[] = [
  { u: "m²", tout: "le jardin", intro: (p) => `Le jardin ${de(p.nom)} a trois parties.`, parties: [["une pelouse", 20, 80], ["un potager", 6, 25], ["une terrasse", 8, 20]] },
  { u: "m²", tout: "l’appartement", intro: (p) => `L’appartement ${de(p.nom)} a trois pièces.`, parties: [["un salon", 18, 30], ["une cuisine", 7, 12], ["une chambre", 9, 14]] },
  { u: "cm²", tout: "le drapeau", intro: (p) => `${p.nom} dessine un drapeau en trois bandes.`, parties: [["une bande bleue", 20, 60], ["une bande blanche", 20, 60], ["une bande rouge", 20, 60]] },
  { u: "cm²", tout: "la figure", intro: (p) => `${p.nom} assemble trois pièces de tangram pour faire une figure.`, parties: [["un grand triangle", 30, 50], ["un carré", 8, 16], ["un parallélogramme", 8, 16]] },
  { u: "dm²", tout: "le patchwork", intro: (p) => `${p.nom} coud un patchwork avec trois morceaux de tissu.`, parties: [["un morceau vert", 4, 15], ["un morceau jaune", 4, 15], ["un morceau orange", 4, 15]] },
  { u: "m²", tout: "le parc", intro: () => `Un petit parc a trois zones.`, parties: [["une aire de jeux", 40, 90], ["un bassin", 15, 40], ["une pelouse", 100, 250]] },
  { u: "dm²", tout: "le vitrail", intro: (p) => `${p.nom} fabrique un vitrail avec trois morceaux de verre.`, parties: [["un morceau bleu", 3, 12], ["un morceau rouge", 3, 12], ["un morceau jaune", 3, 12]] },
  { u: "m²", tout: "la cour", intro: () => `La cour de l’école a trois zones.`, parties: [["un terrain de basket", 150, 250], ["un préau", 60, 120], ["un coin potager", 10, 30]] },
  { u: "cm²", tout: "la carte", intro: (p) => `${p.nom} colle trois photos sur une carte.`, parties: [["une photo de plage", 30, 80], ["une photo de montagne", 30, 80], ["une photo de forêt", 30, 80]] },
  { u: "m²", tout: "le stand", intro: (p) => `Pour la kermesse, ${p.nom} installe un stand en trois coins.`, parties: [["un coin jeux", 4, 10], ["un coin gâteaux", 3, 8], ["un coin boissons", 2, 6]] },
];

function genAireDecomposerParties() {
  const a = pick(ASSEMBLAGES);
  const p = pick(PRENOMS);
  const aires = a.parties.map(([, lo, hi]) => randomInt(lo, hi));
  const total = aires.reduce((x, y) => x + y, 0);
  // 07/11/2026 : « Bande bleue : 40 cm². » plutôt qu'une phrase de 50 mots.
  const desc = a.parties.map(([nom], i) => `${maj(nom.replace(/^une? /, ""))} : ${aires[i]} ${a.u}.`);
  if (Math.random() < 0.6) {
    const text = `${a.intro(p)} ${desc.join(" ")} ${pick([`Calcule l’aire totale.`, `Trouve l’aire totale.`, `Écris l’aire totale.`])}`;
    return {
      text,
      format: "short" as const,
      expected: avecUnite(total, a.u),
      comparator: "number_equal" as const,
      explanation: expl(`Les trois parties couvrent toute la surface sans se chevaucher : on additionne leurs aires. ${aires.join(" + ")} = ${nf(total)} ${a.u}.`),
    };
  }
  // L'aire totale est donnée : on retrouve la partie qui manque.
  const k = randomInt(0, 2);
  const autres = desc.filter((_, i) => i !== k);
  const [article, ...reste] = a.parties[k][0].split(" ");
  const nom = reste.join(" ");
  const duCherche = /^[aeiouéèh]/i.test(nom) ? `de l’${nom}` : article === "une" ? `de la ${nom}` : `du ${nom}`;
  const text = `En tout, ${a.tout} mesure ${nf(total)} ${a.u}. ${autres[0]} ${autres[1]} ${pick([
    `Quelle est l’aire ${duCherche} ?`,
    `Combien mesure l’aire ${duCherche} ?`,
  ])}`;
  return {
    text,
    format: "short" as const,
    expected: avecUnite(aires[k], a.u),
    comparator: "number_equal" as const,
    explanation: expl(
      `On enlève à l’aire totale les parties connues : ${nf(total)} − ${aires.filter((_, j) => j !== k).join(" − ")} = ${aires[k]} ${a.u}.`
    ),
  };
}

// Deux rectangles accolés (forme en L), ou un rectangle dont on retire un carré.
const FORMES_EN_L: { u: string; lo: number; hi: number; phrase: (p: Prenom) => string; quoi: string; la: string }[] = [
  { u: "m", lo: 2, hi: 6, phrase: (p) => `La chambre ${de(p.nom)} a la forme d’un L.`, quoi: "de la chambre", la: "la" },
  { u: "m", lo: 2, hi: 8, phrase: (p) => `La terrasse ${de(p.nom)} a la forme d’un L.`, quoi: "de la terrasse", la: "la" },
  { u: "cm", lo: 2, hi: 9, phrase: (p) => `Sur son cahier, ${p.nom} dessine une figure en forme de L.`, quoi: "de la figure", la: "la" },
  { u: "m", lo: 3, hi: 9, phrase: () => `La salle de jeux du centre de loisirs a la forme d’un L.`, quoi: "de la salle", la: "la" },
  { u: "cm", lo: 3, hi: 12, phrase: (p) => `${p.nom} découpe dans du carton une pièce en forme de L.`, quoi: "de la pièce", la: "la" },
  { u: "m", lo: 2, hi: 5, phrase: (p) => `Le potager ${de(p.nom)} a la forme d’un L.`, quoi: "du potager", la: "le" },
];
const TROUS: { u: string; L: [number, number]; l: [number, number]; c: [number, number]; phrase: (p: Prenom, L: string, l: string, c: string) => string; question: string }[] = [
  { u: "m", L: [8, 15], l: [5, 9], c: [2, 4], phrase: (p, L, l, c) => `Le jardin ${de(p.nom)} est un rectangle de ${L} sur ${l}. Au milieu, il y a un bassin carré de ${c} de côté.`, question: "Quelle est l’aire du jardin sans le bassin ?" },
  { u: "m", L: [4, 7], l: [3, 4], c: [1, 2], phrase: (p, L, l, c) => `${p.nom} repeint un mur rectangulaire de ${L} sur ${l}. Il y a une fenêtre carrée de ${c} de côté.`, question: "Quelle aire faut-il peindre ?" },
  { u: "m", L: [20, 40], l: [15, 25], c: [3, 6], phrase: (_p, L, l, c) => `La cour de l’école est un rectangle de ${L} sur ${l}. On y installe un bac à sable carré de ${c} de côté.`, question: "Quelle aire de cour reste-t-il autour du bac ?" },
  { u: "cm", L: [21, 30], l: [15, 20], c: [5, 9], phrase: (p, L, l, c) => `${p.nom} colle une photo carrée de ${c} de côté sur une feuille de ${L} sur ${l}.`, question: "Quelle aire de la feuille reste visible ?" },
  { u: "m", L: [10, 16], l: [6, 9], c: [3, 5], phrase: (p, L, l, c) => `Le terrain ${de(p.nom)} mesure ${L} sur ${l}. Une cabane carrée de ${c} de côté y est posée.`, question: "Quelle aire de terrain reste libre ?" },
  { u: "cm", L: [30, 45], l: [20, 30], c: [8, 12], phrase: (p, L, l, c) => `${p.nom} découpe un carré de ${c} de côté dans un carton de ${L} sur ${l}.`, question: "Quelle est l’aire du carton qui reste ?" },
];

function tirerDecomposition() {
  const p = pick(PRENOMS);
  if (Math.random() < 0.55) {
    const f = pick(FORMES_EN_L);
    const r = () => {
      const x = randomInt(f.lo, f.hi);
      let y = randomInt(f.lo, f.hi);
      while (y === x) y = randomInt(f.lo, f.hi);
      return [x, y];
    };
    const [a, b] = r();
    let [c, d] = r();
    // Deux rectangles identiques (4 sur 5 et 5 sur 4) feraient un faux L.
    while ((c === a && d === b) || (c === b && d === a)) [c, d] = r();
    const u = f.u;
    return {
      text: `${f.phrase(p)} On ${f.la} découpe en deux rectangles : l’un de ${a} ${u} sur ${b} ${u}, l’autre de ${c} ${u} sur ${d} ${u}. ${pick([`Quelle est l’aire ${f.quoi} ?`, `Calcule l’aire ${f.quoi}.`, `Combien mesure l’aire ${f.quoi} ?`])}`,
      u,
      r: a * b + c * d,
      pieges: [a * b, c * d, a + b + c + d, a * b + c + d, a * b + c * d + 1],
      calc: `On ajoute les aires des deux rectangles : ${a} × ${b} + ${c} × ${d} = ${a * b} + ${c * d} = ${a * b + c * d} ${u}².`,
    };
  }
  const t = pick(TROUS);
  const L = randomInt(t.L[0], t.L[1]);
  const l = randomInt(t.l[0], t.l[1]);
  const c = randomInt(t.c[0], t.c[1]);
  const u = t.u;
  return {
    text: `${t.phrase(p, `${L} ${u}`, `${l} ${u}`, `${c} ${u}`)} ${t.question}`,
    u,
    r: L * l - c * c,
    pieges: [L * l, L * l + c * c, L * l - c, L * l - 4 * c],
    calc: `On part du grand rectangle et on retire le carré : ${L} × ${l} − ${c} × ${c} = ${L * l} − ${c * c} = ${L * l - c * c} ${u}².`,
  };
}

function genAireDecomposer(qcm: boolean) {
  const d = tirerDecomposition();
  const u2 = `${d.u}²`;
  if (!qcm)
    return { text: d.text, format: "short" as const, expected: avecUnite(d.r, u2), comparator: "number_equal" as const, explanation: expl(d.calc) };
  return {
    text: d.text,
    format: "qcm" as const,
    choices: makeChoices(`${nf(d.r)} ${u2}`, d.pieges.map((x) => `${nf(x)} ${u2}`)),
    expected: [`${nf(d.r)} ${u2}`],
    comparator: "mcq_exact" as const,
    explanation: expl(d.calc),
  };
}

// ─── aire_probleme ──────────────────────────────────────────────────────────
// L'aire n'est plus la réponse : elle sert à acheter, à payer, à compter des pots.
const LIEUX: { nom: string; f: boolean; L: [number, number]; l: [number, number] }[] = [
  { nom: "chambre", f: true, L: [3, 5], l: [2, 3] },
  { nom: "salon", f: false, L: [5, 8], l: [3, 5] },
  { nom: "terrasse", f: true, L: [4, 8], l: [2, 4] },
  { nom: "cabane", f: true, L: [2, 4], l: [2, 3] },
  { nom: "bureau", f: false, L: [3, 4], l: [2, 3] },
  { nom: "garage", f: false, L: [5, 7], l: [3, 4] },
  { nom: "atelier", f: false, L: [4, 6], l: [3, 4] },
  { nom: "salle de jeux", f: true, L: [4, 7], l: [3, 5] },
];
const MATERIAUX: { quoi: string; Quoi: string; pl?: boolean; prix: [number, number] }[] = [
  { quoi: "du carrelage", Quoi: "Le carrelage", prix: [15, 30] },
  { quoi: "de la moquette", Quoi: "La moquette", prix: [8, 20] },
  { quoi: "du parquet", Quoi: "Le parquet", prix: [20, 40] },
  { quoi: "du lino", Quoi: "Le lino", prix: [6, 15] },
  { quoi: "des dalles en caoutchouc", Quoi: "Les dalles en caoutchouc", pl: true, prix: [10, 25] },
  { quoi: "des dalles de liège", Quoi: "Les dalles de liège", pl: true, prix: [9, 18] },
];
type Lieu = { nom: string; f: boolean };
const POTS: { action: (o: Lieu) => string; objet: string; objets: string; couvre: number[] }[] = [
  { action: (o) => `veut repeindre le sol ${duLieu(o)}`, objet: "Un pot de peinture", objets: "pots", couvre: [2, 3, 4, 5] },
  { action: (o) => `veut vernir le sol ${duLieu(o)}`, objet: "Un bidon de vernis", objets: "bidons", couvre: [3, 4, 5, 6] },
  { action: (o) => `veut poser du parquet dans ${leLieu(o)}`, objet: "Un paquet de lames", objets: "paquets", couvre: [2, 3] },
  { action: (o) => `veut carreler le sol ${duLieu(o)}`, objet: "Un carton de carreaux", objets: "cartons", couvre: [1, 2] },
  { action: (o) => `veut couvrir de dalles le sol ${duLieu(o)}`, objet: "Un lot de dalles", objets: "lots", couvre: [2, 4] },
];
const duLieu = (o: { nom: string; f: boolean }) => (/^[aeiou]/.test(o.nom) ? `de l’${o.nom}` : o.f ? `de la ${o.nom}` : `du ${o.nom}`);
const leLieu = (o: { nom: string; f: boolean }) => (/^[aeiou]/.test(o.nom) ? `l’${o.nom}` : o.f ? `la ${o.nom}` : `le ${o.nom}`);

/** ★2 nu : la surface à couvrir, en m², d'un rectangle donné par ses côtés. */
function genAireProblemeSimpleNu() {
  const L = randomInt(3, 20);
  const l = randomInt(2, L - 1);
  const A = L * l;
  const text = pick([
    `Un rectangle mesure ${L} m sur ${l} m. Combien de m² couvre-t-il ?`,
    `Combien de m² couvre un rectangle de ${L} m sur ${l} m ?`,
    `Longueur ${L} m, largeur ${l} m. Quelle aire faut-il couvrir ?`,
    `Calcule la surface en m² d’un rectangle de ${l} m sur ${L} m.`,
  ]);
  return {
    text,
    format: "short" as const,
    expected: avecUnite(A, "m²"),
    comparator: "number_equal" as const,
    explanation: expl(`L’aire du rectangle est longueur × largeur : ${L} × ${l} = ${A}. Il faut couvrir ${A} m².`),
  };
}

function genAireProblemeSimple() {
  const p = pick(PRENOMS);
  const o = pick(LIEUX);
  const m = pick(MATERIAUX);
  let L = randomInt(o.L[0], o.L[1]);
  let l = randomInt(o.l[0], o.l[1]);
  while (l >= L) [L, l] = [randomInt(o.L[0], o.L[1]), randomInt(o.l[0], o.l[1])];
  const A = L * l;
  const text = pick([
    `${p.nom} veut poser ${m.quoi} dans ${leLieu(o)} de ${L} m sur ${l} m. Combien de m² doit-${il(p)} acheter ?`,
    `${maj(leLieu(o))} ${de(p.nom)} mesure ${L} m de long et ${l} m de large. Quelle aire doit-${il(p)} couvrir ${m.quoi.replace(/^(du|de la|des) /, "de ")} ?`,
    `${p.nom} couvre le sol ${duLieu(o)} : ${l} m de large, ${L} m de long. Combien de m² lui faut-il ?`,
  ]);
  return {
    text,
    format: "short" as const,
    expected: avecUnite(A, "m²"),
    comparator: "number_equal" as const,
    explanation: expl(`Le sol est un rectangle : ${L} × ${l} = ${A}. Il faut couvrir ${A} m².`),
  };
}

function tirerLieu(decimal: boolean) {
  const o = pick(LIEUX);
  let L = randomInt(o.L[0], o.L[1]);
  let l = randomInt(o.l[0], o.l[1]);
  while (l >= L) [L, l] = [randomInt(o.L[0], o.L[1]), randomInt(o.l[0], o.l[1])];
  if (decimal) L += pick([0.5, 0.25, 0.75]);
  return { o, L, l, A: L * l };
}

function genAireProblemeDeuxEtapes(qcm: boolean) {
  const p = pick(PRENOMS);
  const prix = Math.random() < (qcm ? 1 : 0.55);
  if (prix) {
    const { o, L, l, A } = tirerLieu(qcm && Math.random() < 0.7);
    const m = pick(MATERIAUX);
    const pu = randomInt(m.prix[0], m.prix[1]);
    const cout = A * pu;
    const text = pick([
      `${p.nom} veut poser ${m.quoi} dans ${leLieu(o)}, qui mesure ${nf(L)} m sur ${l} m. ${m.Quoi} ${m.pl ? "coûtent" : "coûte"} ${pu} € le m². Combien va-t-${il(p)} payer ?`,
      `${maj(leLieu(o))} ${de(p.nom)} mesure ${nf(L)} m de long et ${l} m de large. ${m.Quoi} ${m.pl ? "coûtent" : "coûte"} ${pu} € le m². Quel est le prix pour couvrir tout le sol ?`,
      `${m.Quoi} ${m.pl ? "coûtent" : "coûte"} ${pu} € le m². ${p.nom} en veut pour tout le sol ${duLieu(o)} : ${nf(L)} m sur ${l} m. Calcule le prix à payer.`,
    ]);
    const calc = `D’abord l’aire du sol : ${nf(L)} × ${l} = ${nf(A)} m². Puis le prix : ${nf(A)} × ${pu} = ${nf(cout)} €.`;
    if (!qcm) return { text, format: "short" as const, expected: avecUnite(cout, "€"), comparator: "number_equal" as const, explanation: expl(calc) };
    return {
      text,
      format: "qcm" as const,
      choices: makeChoices(`${nf(cout)} €`, [
        `${nf(2 * (L + l) * pu)} €`,
        `${nf((L + l) * pu)} €`,
        `${nf(A + pu)} €`,
        `${nf(cout + pu)} €`,
      ]),
      expected: [`${nf(cout)} €`],
      comparator: "mcq_exact" as const,
      explanation: expl(`${calc} Le piège : multiplier le prix par le périmètre, ou par la somme des côtés.`),
    };
  }
  // Combien de pots, de paquets… : l'aire divisée par ce que couvre un pot.
  for (;;) {
    const { o, L, l, A } = tirerLieu(false);
    const c = pick(POTS);
    const k = pick(c.couvre.filter((x) => A % x === 0 && A / x >= 2));
    if (!k) continue;
    const n = A / k;
    const text = `${p.nom} ${c.action(o)}. ${maj(leLieu(o))} mesure ${L} m sur ${l} m. ${c.objet} couvre ${k} m². Combien de ${c.objets} lui faut-il ?`;
    return {
      text,
      format: "short" as const,
      expected: avecUnite(n, c.objets),
      comparator: "number_equal" as const,
      explanation: expl(`D’abord l’aire : ${L} × ${l} = ${A} m². Chacun couvre ${k} m², donc ${A} ÷ ${k} = ${n}. Il faut ${n} ${c.objets}.`),
    };
  }
}

// ─── aire_defi ──────────────────────────────────────────────────────────────
const FOIS_MOTS: Record<number, string> = { 2: "deux", 3: "trois" };

/** ★4 : un côté deux fois plus long ne donne pas une aire deux fois plus grande ; même périmètre, aires différentes. */
function genAireDefiPieges() {
  const [p, q] = deuxPrenoms();
  if (Math.random() < 0.5) {
    const u = pick(["cm", "m", "dm"]);
    const c = randomInt(2, 8);
    const k = pick([2, 3]);
    const A = c * c;
    const B = k * c * k * c;
    const text = pick([
      `${p.nom} trace un carré de ${c} ${u} de côté. Puis ${il(p)} trace un carré dont le côté est ${FOIS_MOTS[k]} fois plus long. Quelle est l’aire du grand carré ?`,
      `Un carré a des côtés de ${c} ${u}. ${p.nom} rend chaque côté ${FOIS_MOTS[k]} fois plus long. Quelle est l’aire du nouveau carré ?`,
      `${p.nom} agrandit un carré de côté ${c} ${u} : chaque côté devient ${FOIS_MOTS[k]} fois plus long. Que vaut l’aire du carré agrandi ?`,
    ]);
    return {
      text,
      format: "qcm" as const,
      choices: makeChoices(`${B} ${u}²`, [`${k * A} ${u}²`, `${A + k} ${u}²`, `${4 * k * c} ${u}²`, `${B + A} ${u}²`]),
      expected: [`${B} ${u}²`],
      comparator: "mcq_exact" as const,
      explanation: expl(
        `Le nouveau côté mesure ${k} × ${c} = ${k * c} ${u}. L’aire est ${k * c} × ${k * c} = ${B} ${u}². Elle n’est pas ${k} fois plus grande (${k * A} ${u}²) mais ${k} × ${k} = ${k * k} fois plus grande.`
      ),
    };
  }
  // Même périmètre, aires différentes : le carré gagne toujours.
  const u = pick(["cm", "m"]);
  const c = randomInt(4, 12);
  const d = randomInt(1, c - 1);
  const [a, b] = [c + d, c - d];
  const carre = `le carré ${de(p.nom)}`;
  const rect = `le rectangle ${de(q.nom)}`;
  const text = pick([
    `${p.nom} dessine un carré de ${c} ${u} de côté. ${q.nom} dessine un rectangle de ${a} ${u} sur ${b} ${u}. Les deux figures ont le même périmètre. Laquelle a la plus grande aire ?`,
    `Le carré ${de(p.nom)} a des côtés de ${c} ${u}. Le rectangle ${de(q.nom)} mesure ${a} ${u} sur ${b} ${u}. Ils ont le même périmètre. Lequel a la plus grande aire ?`,
  ]);
  return {
    text,
    format: "qcm" as const,
    choices: shuffle([carre, rect, "ils ont la même aire"]),
    expected: [carre],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `Les périmètres sont égaux : 4 × ${c} = ${4 * c} et 2 × (${a} + ${b}) = ${2 * (a + b)}. Mais les aires non : ${c} × ${c} = ${c * c} ${u}² pour le carré, ${a} × ${b} = ${a * b} ${u}² pour le rectangle. Même périmètre ne veut pas dire même aire.`
    ),
  };
}

/** ★5 : retrouver un côté à partir de l'aire (division écrite « ÷ »). */
function genAireDefiCoteManquant() {
  const p = pick(PRENOMS);
  const o = pick(RECTANGLES.filter((x) => x.L[1] <= 45));
  let L = randomInt(o.L[0], o.L[1]);
  let l = randomInt(o.l[0], o.l[1]);
  while (l >= L) [L, l] = [randomInt(o.L[0], o.L[1]), randomInt(o.l[0], o.l[1])];
  const A = L * l;
  const u = o.u;
  const chercheLargeur = Math.random() < 0.6;
  const connu = chercheLargeur ? L : l;
  const r = chercheLargeur ? l : L;
  const text = pick([
    `${maj(leNom(o))} ${de(p.nom)} a une aire de ${A} ${u}². ${o.f ? "Elle" : "Il"} mesure ${connu} ${u} de ${chercheLargeur ? "long" : "large"}. Quelle est sa ${chercheLargeur ? "largeur" : "longueur"} ?`,
    `${p.nom} sait que ${leNom(o)} a une aire de ${A} ${u}² et une ${chercheLargeur ? "longueur" : "largeur"} de ${connu} ${u}. Combien mesure sa ${chercheLargeur ? "largeur" : "longueur"} ?`,
    `Aire ${duNom(o)} : ${A} ${u}². ${chercheLargeur ? "Longueur" : "Largeur"} : ${connu} ${u}. Trouve sa ${chercheLargeur ? "largeur" : "longueur"}.`,
  ]);
  return {
    text,
    format: "short" as const,
    expected: avecUnite(r, u),
    comparator: "number_equal" as const,
    explanation: expl(
      `L’aire est longueur × largeur. On cherche le nombre qui, multiplié par ${connu}, donne ${A} : ${A} ÷ ${connu} = ${r}. Vérification : ${connu} × ${r} = ${A}. La ${chercheLargeur ? "largeur" : "longueur"} est ${r} ${u}.`
    ),
  };
}

/** ★5 : le côté d'un carré dont on connaît l'aire, parfois puis son périmètre. */
function genAireDefiCarreInverse() {
  const p = pick(PRENOMS);
  const o = pick(CARRES);
  const c = randomInt(Math.max(2, o.L[0]), Math.min(o.L[1], 15));
  const A = c * c;
  const u = o.u;
  const perimetre = Math.random() < 0.35;
  const intro = pick([
    `${maj(leNom(o))} ${de(p.nom)} est carré${o.f ? "e" : ""}. Son aire est ${A} ${u}².`,
    `${p.nom} a ${o.f ? "une" : "un"} ${o.nom} carré${o.f ? "e" : ""} de ${A} ${u}².`,
  ]);
  const question = perimetre
    ? pick(["Quel est son périmètre ?", "Combien mesure son tour ?"])
    : pick(["Combien mesure son côté ?", "Quelle est la longueur d’un côté ?"]);
  const r = perimetre ? 4 * c : c;
  return {
    text: `${intro} ${question}`,
    format: "short" as const,
    expected: avecUnite(r, u),
    comparator: "number_equal" as const,
    explanation: expl(
      `On cherche le nombre qui, multiplié par lui-même, donne ${A} : ${c} × ${c} = ${A}. Le côté mesure ${c} ${u}.${perimetre ? ` Le périmètre est 4 × ${c} = ${4 * c} ${u}.` : ""}`
    ),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// ⭐ 07/11/2026 — LA MÊME PHRASE REVENAIT (scripts/mesurer-squelettes-coach.ts
// --lettres) : 14 répétitions sur 20 sur aire_probleme ★2, 4 à 7 sur les autres
// micros à ★1-★2. Il faut une quarantaine de phrases à peu près équiprobables
// par étoile : chaque gabarit ci-dessous pose la question de plusieurs FAÇONS
// (lire le quadrillage, choisir le calcul, compléter, vrai/faux, comparer deux
// figures, prendre la question par l'autre bout), chaque façon avec plusieurs
// tournures. ★1 : 12 mots au plus, ★2 : 15 mots au plus, ni prénom ni objet
// (../REGLES-6E.md). Correcteurs : correcteurs/aires.ts (même section).
// ═══════════════════════════════════════════════════════════════════════════
type QAire = TutorGeneratedQuestionV4;
type Cel = [number, number];
type CanvasAire = QAire["canvas"];

function qcmA(text: string, juste: string, faux: string[], calcul: string, canvas?: CanvasAire): QAire {
  const pieges = shuffle(Array.from(new Set(faux)).filter((f) => f !== juste)).slice(0, 3);
  return { text, format: "qcm", choices: shuffle([juste, ...pieges]), expected: [juste], comparator: "mcq_exact", explanation: expl(calcul), ...(canvas ? { canvas } : {}) };
}
function courtA(text: string, expected: string[], calcul: string, canvas?: CanvasAire): QAire {
  return { text, format: "short", expected, comparator: "number_equal", explanation: expl(calcul), ...(canvas ? { canvas } : {}) };
}
const vfA = (text: string, vrai: boolean, calcul: string, canvas?: CanvasAire) => qcmA(text, vrai ? "vrai" : "faux", [vrai ? "faux" : "vrai"], calcul, canvas);
const onA = (text: string, oui: boolean, calcul: string, canvas?: CanvasAire) => qcmA(text, oui ? "oui" : "non", [oui ? "non" : "oui"], calcul, canvas);
/** Des calculs faux qui n'ont pas la valeur du juste ni celle d'un autre piège. */
function piegesDeValeur(juste: number, faux: [string, number][]): string[] {
  const vus = new Set([juste]);
  return shuffle(faux).filter(([, v]) => (vus.has(v) ? false : (vus.add(v), true))).map(([s]) => s);
}
/** La réponse quand l'énoncé écrit déjà l'unité (« … cm² ») : le nombre seul suffit. */
const nombreOuUnite = (v: number, u: string) => [...avecUnite(v, u), nf(v)];
const nombreOuCarreaux = (n: number) => [nf(n), `${nf(n)} carreaux`];
const UNITES_AIRE = ["cm²", "cm²", "dm²", "m²"];
const mot = (grand: boolean) => (grand ? "grande" : "petite");

// ----- Le quadrillage
function grilleA(filledCells: Cel[], rows: number, cols: number) {
  return { kind: "figure_libre" as const, grid: { rows, cols, filledCells }, display: { showGrid: true, showFilled: true, showPerimeter: true }, size: { cellSize: 26, padding: 14 } };
}
/** Un rectangle plein, sa rangée du haut en `r0`, sa colonne de gauche en `c0`. */
function casesRect(a: number, b: number, r0 = 1, c0 = 1): Cel[] {
  const out: Cel[] = [];
  for (let r = 0; r < a; r++) for (let c = 0; c < b; c++) out.push([r0 + r, c0 + c]);
  return out;
}
/** Une forme d'un seul tenant, de n carreaux, dans une boîte. */
function formeCases(n: number, rows: number, cols: number, c0 = 0): Cel[] {
  const dedans = new Map<string, Cel>();
  const r = randomInt(0, rows - 1);
  const c = randomInt(0, cols - 1);
  dedans.set(`${r},${c}`, [r, c]);
  while (dedans.size < n) {
    const [x, y] = pick([...dedans.values()]);
    const [dx, dy] = pick([[0, 1], [1, 0], [0, -1], [-1, 0]] as Cel[]);
    const [u, v] = [x + dx, y + dy];
    if (u >= 0 && u < rows && v >= 0 && v < cols) dedans.set(`${u},${v}`, [u, v]);
  }
  return [...dedans.values()].map(([u, v]) => [u, v + c0] as Cel);
}
/** Deux figures, une à gauche et une à droite, séparées par une colonne vide. */
function deuxFormes(n: number, m: number) {
  return grilleA([...formeCases(n, 4, 4, 0), ...formeCases(m, 4, 4, 5)], 4, 9);
}
function deuxRectangles(a: number, b: number, c: number, d: number) {
  return grilleA([...casesRect(a, b, 0, 0), ...casesRect(c, d, 0, 5)], Math.max(a, c), 9);
}

// ----- AIRE_COMPRENDRE, ★1
const NATURE: Record<string, string> = { "²": "une aire", "": "une longueur", "³": "un volume" };
function genComprendreMesure(): QAire {
  const u = pick(UNITES_NUES);
  const mode = pick(["nature", "nature", "oui", "unite"] as const);
  if (mode === "unite") {
    const [g, sup] = pick([["d’aire", "²"], ["de longueur", ""], ["de volume", "³"]] as [string, string][]);
    return qcmA(
      pick([`Laquelle est une unité ${g} ?`, `Choisis une unité ${g}.`, `Trouve l’unité ${g}.`]),
      `${u}${sup}`,
      [u, `${u}²`, `${u}³`, "kg"],
      `Une longueur s’écrit en ${u}, une aire en ${u}², un volume en ${u}³. Une unité ${g} : ${u}${sup}.`,
    );
  }
  const sup = pick(["²", "²", "", "³"]);
  const m = `${nf(randomInt(4, 90))} ${u}${sup}`;
  const calcul = `L’unité ${u}${sup} dit la grandeur : ${m} est ${NATURE[sup]}.`;
  if (mode === "oui")
    return onA(pick([`« ${m} » est-il une aire ?`, `Est-ce une aire : ${m} ?`, `${m} : est-ce une aire ?`]), sup === "²", calcul);
  return qcmA(
    pick([`Que mesure « ${m} » ?`, `« ${m} » mesure quoi ?`, `Quelle grandeur est « ${m} » ?`, `Choisis ce que mesure « ${m} ».`]),
    NATURE[sup],
    ["une aire", "une longueur", "un volume", "une masse"],
    calcul,
  );
}
function genComprendreVrai(): QAire {
  const u = pick(UNITES_NUES);
  if (Math.random() < 0.5) {
    const [g, bonne] = pick([["une aire", "²"], ["un périmètre", ""], ["un volume", "³"]] as [string, string][]);
    const vrai = Math.random() < 0.5;
    const sup = vrai ? bonne : pick(["²", "", "³"].filter((s) => s !== bonne));
    const x = `${u}${sup}`;
    return vfA(
      pick([`On mesure ${g} en ${x}. Vrai ou faux ?`, `${maj(g)} peut s’écrire en ${x}. Vrai ou faux ?`, `${maj(x)} sert à mesurer ${g}. Vrai ou faux ?`]),
      vrai,
      `Une aire s’écrit en unité carrée, un périmètre en unité de longueur, un volume en unité cube. Pour ${g}, on écrit ${u}${bonne}.`,
    );
  }
  const f = pick(["carré", "rectangle", "triangle", "losange", "hexagone"]);
  const aire = Math.random() < 0.5;
  const g = aire ? "L’aire" : "Le périmètre";
  return qcmA(
    pick([`${g} d’un ${f} mesure…`, `Que mesure ${aire ? "l’aire" : "le périmètre"} d’un ${f} ?`, `Choisis ce que mesure ${aire ? "l’aire" : "le périmètre"} d’un ${f}.`]),
    aire ? "son intérieur" : "son contour",
    ["son intérieur", "son contour", "un seul côté", "un seul sommet"],
    "L’aire mesure tout l’intérieur de la figure, le périmètre seulement son contour.",
  );
}
const NOM_UNITE: Record<string, string> = { cm: "centimètre", dm: "décimètre", m: "mètre" };
function genComprendreUnitePetite(): QAire {
  const u = pick(UNITES_NUES);
  const n = NOM_UNITE[u];
  const mode = pick(["aire1", "cote1", "lire", "ecrire", "carreaux"] as const);
  const defn = `1 ${u}² est l’aire d’un carré de 1 ${u} de côté.`;
  if (mode === "aire1")
    return qcmA(
      pick([`Un carré de 1 ${u} de côté a pour aire…`, `Quelle est l’aire d’un carré de 1 ${u} de côté ?`, `Côté 1 ${u} : quelle est l’aire du carré ?`]),
      `1 ${u}²`,
      [`2 ${u}²`, `4 ${u}²`, `1 ${u}`],
      defn,
    );
  if (mode === "cote1")
    return qcmA(
      pick([`1 ${u}² est l’aire d’un carré de côté…`, `Un carré a pour aire 1 ${u}². Quel est son côté ?`, `Quel côté pour un carré de 1 ${u}² ?`]),
      `1 ${u}`,
      [`2 ${u}`, `10 ${u}`, `100 ${u}`],
      defn,
    );
  if (mode === "lire")
    return qcmA(
      pick([`Comment se lit « ${u}² » ?`, `Comment lit-on « ${u}² » ?`, `Lis cette unité : ${u}².`]),
      `${n} carré`,
      [n, `${n} cube`, u === "m" ? "centimètre carré" : "mètre carré"],
      `Le petit 2 se lit « carré » : ${u}² se lit ${n} carré.`,
    );
  if (mode === "ecrire")
    return qcmA(
      pick([`Comment écrit-on « ${n} carré » ?`, `Écris « ${n} carré » avec le symbole.`, `Choisis le symbole du ${n} carré.`]),
      `${u}²`,
      [u, `${u}³`, u === "m" ? "cm²" : "m²"],
      `Le ${n} carré s’écrit ${u}².`,
    );
  const k = randomInt(3, 20);
  return courtA(
    pick([`Combien de carreaux de 1 ${u}² couvrent ${k} ${u}² ?`, `${k} ${u}² : combien de carreaux de 1 ${u}² ?`, `Une aire de ${k} ${u}² fait combien de carreaux de 1 ${u}² ?`]),
    nombreOuCarreaux(k),
    `Chaque carreau couvre 1 ${u}². Pour ${k} ${u}², il en faut ${k}.`,
  );
}

// ----- AIRE_COMPTER, ★1
function genCompterFigure(): QAire {
  const u = pick(UNITES_AIRE);
  const n = randomInt(3, 12);
  const canvas = grilleA(formeCases(n, 4, 6), 4, 6);
  const calc = `On compte les carreaux coloriés : ${n}. Chaque carreau vaut 1 ${u}, donc l’aire est ${n} ${u}.`;
  const mode = pick(["aire", "compte", "choix", "unite"] as const);
  if (mode === "aire")
    return courtA(
      pick([
        `Un carreau fait 1 ${u}. Calcule l’aire de la figure.`,
        `Chaque carreau mesure 1 ${u}. Quelle est l’aire de la figure ?`,
        `Compte les carreaux de 1 ${u}. Écris l’aire de la figure.`,
        `Avec des carreaux de 1 ${u}, quelle est l’aire coloriée ?`,
        `Carreaux de 1 ${u} : trouve l’aire de la figure.`,
      ]),
      avecUnite(n, u),
      calc,
      canvas,
    );
  if (mode === "choix")
    return qcmA(
      pick([`Un carreau fait 1 ${u}. Choisis l’aire de la figure.`, `Un carreau fait 1 ${u}. Quelle réponse donne l’aire ?`, `Chaque carreau fait 1 ${u}. Coche l’aire de la figure.`]),
      `${n} ${u}`,
      [`${n + 1} ${u}`, `${n - 1} ${u}`, `${n + 2} ${u}`, `${n} ${u.replace("²", "")}`],
      calc,
      canvas,
    );
  if (mode === "unite")
    return courtA(
      pick(["Prends un carreau comme unité. Quelle est l’aire ?", "L’unité est le carreau. Écris l’aire de la figure.", "Ici, l’unité est le carreau. Quelle aire mesure la figure ?"]),
      nombreOuCarreaux(n),
      `L’unité d’aire est le carreau : la figure en couvre ${n}. Son aire est ${n} carreaux.`,
      canvas,
    );
  return courtA(
    pick(["Compte les carreaux coloriés.", "Combien de carreaux sont coloriés ?", "Combien de carreaux couvre cette figure ?", "Écris le nombre de carreaux coloriés."]),
    nombreOuCarreaux(n),
    `On compte les carreaux un par un : ${n}.`,
    canvas,
  );
}
function genCompterTexte(): QAire {
  const u = pick(UNITES_AIRE);
  const n = randomInt(5, 20);
  const k = randomInt(2, 4);
  const mode = pick(["aire", "aire", "inverse", "plus", "moins"] as const);
  if (mode === "aire")
    return courtA(
      pick([
        `Une figure couvre ${n} carreaux de 1 ${u}. Écris son aire.`,
        `${n} carreaux de 1 ${u} : quelle aire ?`,
        `Écris l’aire de ${n} carreaux de 1 ${u}.`,
        `Quelle aire font ${n} carreaux de 1 ${u} ?`,
      ]),
      avecUnite(n, u),
      `Chaque carreau vaut 1 ${u}. ${n} carreaux font ${n} ${u}.`,
    );
  if (mode === "inverse")
    return courtA(
      pick([`Une aire de ${n} ${u}. Combien de carreaux de 1 ${u} ?`, `Combien de carreaux de 1 ${u} pour ${n} ${u} ?`, `Pour couvrir ${n} ${u}, combien de carreaux de 1 ${u} ?`, `${n} ${u} font combien de carreaux de 1 ${u} ?`]),
      nombreOuCarreaux(n),
      `Chaque carreau couvre 1 ${u}. Pour ${n} ${u}, il en faut ${n}.`,
    );
  if (mode === "plus")
    return courtA(
      pick([`${n} carreaux de 1 ${u} plus ${k} autres : quelle aire ?`, `On ajoute ${k} carreaux à ${n} carreaux de 1 ${u}. Aire ?`, `${n} carreaux de 1 ${u}, puis ${k} de plus. Écris l’aire.`]),
      avecUnite(n + k, u),
      `${n} + ${k} = ${n + k} carreaux de 1 ${u} : l’aire est ${n + k} ${u}.`,
    );
  return courtA(
    pick([`On enlève ${k} carreaux à ${n} carreaux de 1 ${u}. Aire ?`, `${n} carreaux de 1 ${u} moins ${k} carreaux : quelle aire ?`]),
    avecUnite(n - k, u),
    `${n} − ${k} = ${n - k} carreaux de 1 ${u} : l’aire est ${n - k} ${u}.`,
  );
}
function genCompterDeuxFigures(): QAire {
  const u = pick(UNITES_AIRE);
  const n = randomInt(4, 11);
  let m = Math.random() < 0.2 ? n : randomInt(4, 11);
  const mode = pick(["plus", "plus", "meme", "total", "une", "ecart"] as const);
  if (mode === "ecart") while (m === n) m = randomInt(4, 11);
  const canvas = deuxFormes(n, m);
  const compte = `À gauche : ${n} carreaux. À droite : ${m} carreaux.`;
  if (mode === "plus") {
    const grand = Math.random() < 0.5;
    const juste = n === m ? "elles ont la même aire" : (n > m) === grand ? "la figure de gauche" : "la figure de droite";
    return qcmA(
      pick([
        `Quelle figure a la plus ${mot(grand)} aire ?`,
        `Laquelle a la plus ${mot(grand)} aire ?`,
        `Compte les carreaux. Quelle figure a la plus ${mot(grand)} aire ?`,
        `Laquelle couvre le ${grand ? "plus" : "moins"} de carreaux ?`,
      ]),
      juste,
      ["la figure de gauche", "la figure de droite", "elles ont la même aire"],
      compte,
      canvas,
    );
  }
  if (mode === "meme") {
    if (Math.random() < 0.34) return vfA("Ces deux figures ont la même aire. Vrai ou faux ?", n === m, compte, canvas);
    return onA(pick(["Les deux figures ont-elles la même aire ?", "Même aire pour les deux figures : oui ou non ?"]), n === m, compte, canvas);
  }
  if (mode === "total") {
    if (Math.random() < 0.34) return courtA(`Un carreau fait 1 ${u}. Quelle est l’aire totale ?`, avecUnite(n + m, u), `${compte} ${n} + ${m} = ${n + m}, soit ${n + m} ${u}.`, canvas);
    return courtA(pick(["Combien de carreaux en tout sur les deux figures ?", "Compte les carreaux des deux figures. Combien en tout ?"]), nombreOuCarreaux(n + m), `${compte} ${n} + ${m} = ${n + m}.`, canvas);
  }
  if (mode === "une") {
    const gauche = Math.random() < 0.5;
    const cote = gauche ? "gauche" : "droite";
    const v = gauche ? n : m;
    return courtA(
      pick([`Un carreau fait 1 ${u}. Calcule l’aire de la figure de ${cote}.`, `Écris l’aire de la figure de ${cote} : carreaux de 1 ${u}.`]),
      avecUnite(v, u),
      `${compte} L’aire de la figure de ${cote} est ${v} ${u}.`,
      canvas,
    );
  }
  return courtA(
    pick(["Quel est l’écart de carreaux entre les deux figures ?", "Combien de carreaux de différence entre les deux figures ?"]),
    nombreOuCarreaux(Math.abs(n - m)),
    `${compte} L’écart est ${Math.max(n, m)} − ${Math.min(n, m)} = ${Math.abs(n - m)}.`,
    canvas,
  );
}
function genCompterRectangle(): QAire {
  const u = pick(UNITES_AIRE);
  const a = randomInt(2, 5);
  let b = randomInt(2, 6);
  while (b === a) b = randomInt(2, 6);
  const canvas = grilleA(casesRect(a, b), a + 2, b + 2);
  const total = a * b;
  const calc = `${a} rangées de ${b} carreaux : ${a} × ${b} = ${total}.`;
  const mode = pick(["aire", "rangees", "calcul", "compte"] as const);
  if (mode === "aire")
    return courtA(
      pick([`Un carreau fait 1 ${u}. Calcule l’aire du rectangle colorié.`, `Chaque carreau fait 1 ${u}. Quelle est l’aire du rectangle ?`, `Carreaux de 1 ${u} : trouve l’aire de ce rectangle.`]),
      avecUnite(total, u),
      `${calc} L’aire est ${total} ${u}.`,
      canvas,
    );
  if (mode === "rangees") {
    const r = Math.random() < 0.5;
    return courtA(
      r ? pick(["Combien de rangées compte ce rectangle ?", "Compte les rangées de ce rectangle."]) : pick(["Combien de carreaux dans une rangée ?", "Combien de carreaux par rangée ?"]),
      r ? [nf(a), `${a} rangées`] : nombreOuCarreaux(b),
      `Une rangée va de gauche à droite. Il y a ${a} rangées de ${b} carreaux.`,
      canvas,
    );
  }
  if (mode === "calcul")
    return qcmA(
      pick(["Quel calcul donne le nombre de carreaux ?", "Choisis le calcul qui compte les carreaux.", "Combien de carreaux ? Choisis le bon calcul."]),
      `${a} × ${b}`,
      piegesDeValeur(total, [[`${a} + ${b}`, a + b], [`${a} × ${a}`, a * a], [`${b} × ${b}`, b * b]]),
      calc,
      canvas,
    );
  return courtA(pick(["Combien de carreaux dans ce rectangle ?", "Compte les carreaux de ce rectangle.", "Écris le nombre de carreaux du rectangle."]), nombreOuCarreaux(total), calc, canvas);
}

// ----- AIRE_COMPTER, ★2
function genCompterRangees2(): QAire {
  const u = pick(UNITES_AIRE);
  const a = randomInt(2, 8);
  let b = randomInt(3, 10);
  while (b === a) b = randomInt(3, 10);
  const total = a * b;
  const calc = `${a} rangées de ${b} carreaux : ${a} × ${b} = ${total}. L’aire est ${total} ${u}.`;
  const mode = pick(["texte", "calcul", "piege", "figure"] as const);
  if (mode === "texte")
    return courtA(
      pick([
        `${a} rangées de ${b} carreaux de 1 ${u}. Calcule l’aire.`,
        `Écris l’aire de ${a} rangées de ${b} carreaux de 1 ${u}.`,
        `Chaque rangée a ${b} carreaux de 1 ${u}. Il y a ${a} rangées. Aire ?`,
        `Quelle est l’aire de ${a} rangées de ${b} carreaux de 1 ${u} ?`,
      ]),
      avecUnite(total, u),
      calc,
    );
  if (mode === "calcul")
    return qcmA(
      pick([`Quel calcul donne l’aire de ${a} rangées de ${b} carreaux ?`, `${a} rangées de ${b} carreaux : choisis le calcul.`, `Choisis le calcul pour ${a} rangées de ${b} carreaux.`]),
      `${a} × ${b}`,
      piegesDeValeur(total, [[`${a} + ${b}`, a + b], [`2 × (${a} + ${b})`, 2 * (a + b)], [`${a} × ${a}`, a * a], [`${b} × ${b}`, b * b]]),
      calc,
    );
  if (mode === "piege")
    return qcmA(
      pick([`${a} rangées de ${b} carreaux de 1 ${u}. Choisis l’aire.`, `Coche l’aire de ${a} rangées de ${b} carreaux de 1 ${u}.`]),
      `${total} ${u}`,
      [`${a + b} ${u}`, `${total + 1} ${u}`, `${total - 1} ${u}`, `${total + a} ${u}`],
      `${calc} Additionner ${a} + ${b} ne compte pas les carreaux.`,
    );
  const r = randomInt(2, 5);
  const c = randomInt(3, 8);
  const canvas = grilleA(casesRect(r, c), r + 2, c + 2);
  const sens = pick(["aire", "aire", "ajoute", "enleve"] as const);
  if (sens === "aire")
    return courtA(
      pick([`Un carreau fait 1 ${u}. Calcule vite l’aire, avec une multiplication.`, `Multiplie rangées et colonnes. Un carreau fait 1 ${u}. Aire ?`, `Rectangle en carreaux de 1 ${u} : écris son aire.`]),
      avecUnite(r * c, u),
      `${r} rangées de ${c} carreaux : ${r} × ${c} = ${r * c}. L’aire est ${r * c} ${u}.`,
      canvas,
    );
  if (sens === "ajoute")
    return courtA(
      pick(["On ajoute une rangée à ce rectangle. Combien de carreaux en tout ?", "Une rangée de plus à ce rectangle : combien de carreaux ?"]),
      nombreOuCarreaux((r + 1) * c),
      `${r} + 1 = ${r + 1} rangées de ${c} carreaux : ${r + 1} × ${c} = ${(r + 1) * c}.`,
      canvas,
    );
  return courtA(
    pick(["On enlève une rangée à ce rectangle. Combien de carreaux restent ?", "Une rangée de moins à ce rectangle : combien de carreaux ?"]),
    nombreOuCarreaux((r - 1) * c),
    `${r} − 1 = ${r - 1} rangées de ${c} carreaux : ${r - 1} × ${c} = ${(r - 1) * c}.`,
    canvas,
  );
}
function genCompterValeur2(): QAire {
  const mode = pick(["demi", "demi", "vaut", "inverse"] as const);
  if (mode === "demi") {
    const u = pick(UNITES_AIRE);
    const n = randomInt(3, 15);
    const h = 2 * randomInt(1, 4);
    if (Math.random() < 0.3)
      return courtA(
        pick([`Combien font ${h} demi-carreaux de 1 ${u} ?`, `${h} demi-carreaux de 1 ${u} : quelle aire ?`]),
        avecUnite(h / 2, u),
        `2 demi-carreaux font 1 carreau : ${h} demi-carreaux font ${h} ÷ 2 = ${h / 2} carreaux, soit ${h / 2} ${u}.`,
      );
    return courtA(
      pick([
        `Carreaux de 1 ${u} : ${n} entiers et ${h} demis. Calcule l’aire.`,
        `${n} carreaux entiers, ${h} demi-carreaux. Un carreau fait 1 ${u}. Aire ?`,
        `Un carreau fait 1 ${u}. La figure a ${n} carreaux et ${h} demi-carreaux. Aire ?`,
      ]),
      avecUnite(n + h / 2, u),
      `${h} demi-carreaux font ${h} ÷ 2 = ${h / 2} carreaux. En tout ${n} + ${h / 2} = ${n + h / 2} carreaux de 1 ${u}, soit ${n + h / 2} ${u}.`,
    );
  }
  const v = pick([2, 3, 4, 5, 10]);
  const n = randomInt(3, 12);
  const X = n * v;
  const u = pick(UNITES_AIRE);
  if (mode === "vaut")
    return courtA(
      pick([`Ici, un carreau vaut ${v} ${u}. Quelle est l’aire de la figure ?`, `Chaque carreau vaut ${v} ${u}. Calcule l’aire coloriée.`, `Un carreau vaut ${v} ${u}. Écris l’aire de la figure.`]),
      avecUnite(X, u),
      `La figure couvre ${n} carreaux de ${v} ${u} : ${n} × ${v} = ${X} ${u}.`,
      grilleA(formeCases(n, 4, 6), 4, 6),
    );
  return courtA(
    pick([`Une figure de ${n} carreaux mesure ${X} ${u}. Aire d’un carreau ?`, `${n} carreaux égaux couvrent ${X} ${u}. Que vaut un carreau ?`, `${X} ${u} pour ${n} carreaux égaux. Calcule l’aire d’un carreau.`]),
    avecUnite(v, u),
    `${X} ÷ ${n} = ${v}. Un carreau vaut ${v} ${u}.`,
  );
}
function genCompterManque2(): QAire {
  const u = pick(UNITES_AIRE);
  const mode = pick(["ajout", "manque", "finir"] as const);
  if (mode === "ajout") {
    const n = randomInt(5, 12);
    const k = randomInt(2, 4);
    const canvas = grilleA(formeCases(n, 4, 6), 4, 6);
    const plus = Math.random() < 0.5;
    const v = plus ? n + k : n - k;
    const calc = `La figure a ${n} carreaux. ${n} ${plus ? "+" : "−"} ${k} = ${v}.`;
    if (Math.random() < 0.5)
      return courtA(
        plus ? `Un carreau fait 1 ${u}. On ajoute ${k} carreaux. Quelle est l’aire ?` : `Un carreau fait 1 ${u}. On enlève ${k} carreaux. Quelle aire reste-t-il ?`,
        avecUnite(v, u),
        `${calc} L’aire est ${v} ${u}.`,
        canvas,
      );
    return courtA(
      plus ? `On ajoute ${k} carreaux à la figure. Combien en tout ?` : `On enlève ${k} carreaux à la figure. Combien en reste-t-il ?`,
      nombreOuCarreaux(v),
      calc,
      canvas,
    );
  }
  if (mode === "manque") {
    const n = randomInt(4, 12);
    const T = n + randomInt(2, 8);
    return courtA(
      pick([`Un carreau fait 1 ${u}. Combien en manque-t-il pour faire ${T} ${u} ?`, `Il faut ${T} ${u}. Combien de carreaux de 1 ${u} faut-il ajouter ?`]),
      nombreOuCarreaux(T - n),
      `La figure a ${n} carreaux, soit ${n} ${u}. ${T} − ${n} = ${T - n} carreaux.`,
      grilleA(formeCases(n, 4, 6), 4, 6),
    );
  }
  // Le rectangle se devine : la rangée du haut et la colonne de gauche sont entières.
  const a = randomInt(3, 5);
  const b = randomInt(3, 7);
  const k = randomInt(1, b - 1);
  const cellules = casesRect(a, b).filter(([r, c]) => !(r === a && c > b - k));
  const canvas = grilleA(cellules, a + 2, b + 2);
  const calc = `Le rectangle complet a ${a} × ${b} = ${a * b} carreaux. Il y en a ${a * b - k}. Il en manque ${k}.`;
  if (Math.random() < 0.34) return courtA(`Un carreau fait 1 ${u}. Quelle aire manque au rectangle ?`, avecUnite(k, u), `${calc} Soit ${k} ${u}.`, canvas);
  return courtA(pick(["Combien de carreaux manque-t-il pour finir le rectangle ?", "Complète le rectangle. Combien de carreaux faut-il ajouter ?"]), nombreOuCarreaux(k), calc, canvas);
}

// ----- AIRE_RECTANGLE et AIRE_CARRE, ★1-★2 : la même façon d'interroger, deux figures.
function tirerQuad(carre: boolean, etoile: 1 | 2) {
  const u = pick(UNITES_NUES);
  const L = randomInt(3, etoile === 1 ? 10 : 15);
  const l = carre ? L : randomInt(2, L - 1);
  const dims = carre ? `de côté ${L} ${u}` : `de ${L} ${u} sur ${l} ${u}`;
  return { u, u2: `${u}²`, L, l, A: L * l, P: 2 * (L + l), dims, nom: carre ? "carré" : "rectangle", Nom: carre ? "Carré" : "Rectangle" };
}
/** « 6 × 4 » : le bon calcul et ses pièges, jamais deux de même valeur. */
function calculsQuad(carre: boolean, L: number, l: number) {
  const juste = `${L} × ${l}`;
  const faux: [string, number][] = carre
    ? [[`${L} + ${L}`, 2 * L], [`4 × ${L}`, 4 * L], [`${L} + 4`, L + 4], [`3 × ${L}`, 3 * L]]
    : [[`${L} + ${l}`, L + l], [`2 × (${L} + ${l})`, 2 * (L + l)], [`${L} × ${L}`, L * L], [`${l} × ${l}`, l * l]];
  return { juste, faux: piegesDeValeur(L * l, faux) };
}
const explQuad = (carre: boolean, L: number, l: number, u: string) =>
  carre
    ? `L’aire d’un carré est côté × côté : ${L} × ${L} = ${L * L}. L’aire est ${L * L} ${u}².`
    : `L’aire d’un rectangle est longueur × largeur : ${L} × ${l} = ${L * l}. L’aire est ${L * l} ${u}².`;
/** Une aire annoncée : la bonne une fois sur deux, sinon le périmètre ou la somme des côtés. */
function aireAnnoncee(A: number, P: number, somme: number) {
  const vrai = Math.random() < 0.5;
  if (vrai) return { X: A, vrai };
  return { X: pick([P, somme].filter((x) => x !== A)), vrai };
}
function genQuadCalcul(carre: boolean, etoile: 1 | 2): QAire {
  const q = tirerQuad(carre, etoile);
  const { u, u2, L, l, A, P, dims, nom, Nom } = q;
  const calc = explQuad(carre, L, l, u);
  const mode = pick(["calcul", "completer", "formule", "vrai"] as const);
  if (mode === "calcul") {
    const c = calculsQuad(carre, L, l);
    return qcmA(pick([`Quel calcul donne l’aire d’un ${nom} ${dims} ?`, `Aire d’un ${nom} ${dims} : choisis le calcul.`, `${Nom} ${dims} : quel calcul pour l’aire ?`]), c.juste, c.faux, calc);
  }
  if (mode === "completer")
    return courtA(
      pick([`Complète : ${L} ${u} × ${l} ${u} = … ${u2}.`, `Écris le résultat : ${L} ${u} × ${l} ${u} = … ${u2}.`, `Trouve le nombre manquant : ${L} ${u} × ${l} ${u} = … ${u2}.`]),
      nombreOuUnite(A, u2),
      `${L} × ${l} = ${A}. Des ${u} fois des ${u} donnent des ${u2}.`,
    );
  if (mode === "formule") {
    const a = carre ? "côté" : "longueur";
    const b = carre ? "côté" : "largeur";
    const f = pick(["trou", "trou", "formule"] as const);
    if (f === "trou")
      return qcmA(
        pick([`Complète : aire du ${nom} = ${a} × …`, `Aire du ${nom} : ${a} multiplié par…`]),
        b,
        carre ? ["périmètre", "aire", "diagonale"] : ["longueur", "périmètre", "aire"],
        carre ? "L’aire d’un carré est côté × côté." : "L’aire d’un rectangle est longueur × largeur.",
      );
    return qcmA(
      pick([`Quelle formule donne l’aire d’un ${nom} ?`, `Choisis la formule de l’aire d’un ${nom}.`]),
      `${a} × ${b}`,
      carre ? ["côté + côté", "4 × côté", "côté + 4"] : ["longueur + largeur", "2 × (longueur + largeur)", "largeur × largeur"],
      carre ? "L’aire d’un carré est côté × côté." : "L’aire d’un rectangle est longueur × largeur.",
    );
  }
  const { X, vrai } = aireAnnoncee(A, P, L + l);
  const vf = etoile === 1 && !carre ? "Vrai ?" : "Vrai ou faux ?";
  return qcmA(
    pick([`Un ${nom} ${dims} fait ${X} ${u2}. ${vf}`, `Aire d’un ${nom} ${dims} : ${X} ${u2}. ${vf}`]),
    vrai ? "vrai" : "faux",
    [vrai ? "faux" : "vrai"],
    calc,
  );
}
function genQuadLire(carre: boolean, etoile: 1 | 2): QAire {
  const { u, u2, L, l, A, P, nom } = tirerQuad(carre, etoile);
  const canvas = quadriCote(L, l, u, carre);
  const calc = explQuad(carre, L, l, u);
  const mode = pick(["choix", "vrai", "calcul", "court"] as const);
  if (mode === "choix")
    return qcmA(
      pick([`Choisis l’aire de ce ${nom}.`, `Quelle réponse donne l’aire du ${nom} ?`, `Coche l’aire de ce ${nom}.`, `Trouve son aire parmi ces réponses.`]),
      `${A} ${u2}`,
      [`${P} ${u2}`, `${L + l} ${u2}`, `${A} ${u}`, `${A + L} ${u2}`],
      calc,
      canvas,
    );
  if (mode === "vrai") {
    const { X, vrai } = aireAnnoncee(A, P, L + l);
    if (Math.random() < 0.34) return onA(`Aire de ce ${nom} : ${X} ${u2}. Est-ce juste ?`, vrai, calc, canvas);
    return vfA(pick([`L’aire de ce ${nom} est ${X} ${u2}. Vrai ou faux ?`, `Ce ${nom} a pour aire ${X} ${u2}. Vrai ou faux ?`]), vrai, calc, canvas);
  }
  if (mode === "calcul") {
    const c = calculsQuad(carre, L, l);
    return qcmA(pick([`Quel calcul donne l’aire de ce ${nom} ?`, "Choisis le calcul de son aire.", "Observe la figure. Quel calcul donne son aire ?"]), c.juste, c.faux, calc, canvas);
  }
  return courtA(
    pick([`Lis les côtés. Calcule l’aire du ${nom}.`, `Regarde les mesures. Écris l’aire du ${nom}.`, `Avec ces mesures, trouve l’aire du ${nom}.`, `Utilise la figure. Quelle est l’aire du ${nom} ?`]),
    avecUnite(A, u2),
    calc,
    canvas,
  );
}
function genQuadGrille(carre: boolean, etoile: 1 | 2): QAire {
  const u = pick(UNITES_NUES);
  const u2 = `${u}²`;
  const nom = carre ? "carré" : "rectangle";
  const a = randomInt(2, etoile === 1 ? 4 : 6);
  let b = carre ? a : randomInt(2, etoile === 1 ? 6 : 8);
  while (!carre && b === a) b = randomInt(2, etoile === 1 ? 6 : 8);
  const canvas = grilleA(casesRect(a, b), a + 2, b + 2);
  const A = a * b;
  const calc = `${a} rangées de ${b} carreaux : ${a} × ${b} = ${A} carreaux.`;
  const mode = pick(["aire1", "cote1", "calcul", "cote"] as const);
  if (mode === "aire1")
    return courtA(
      pick([`Un carreau fait 1 ${u2}. Calcule l’aire du ${nom} colorié.`, `Chaque carreau mesure 1 ${u2}. Quelle est l’aire du ${nom} ?`, `Compte les carreaux de 1 ${u2}. Écris l’aire du ${nom}.`, `Carreaux de 1 ${u2} : trouve l’aire de ce ${nom}.`]),
      avecUnite(A, u2),
      `${calc} L’aire est ${A} ${u2}.`,
      canvas,
    );
  if (mode === "cote1")
    return courtA(
      pick([`Les carreaux ont 1 ${u} de côté. Calcule l’aire du ${nom}.`, `Un carreau a 1 ${u} de côté. Quelle est l’aire du ${nom} ?`, `Carreaux de 1 ${u} de côté : calcule l’aire du ${nom}.`]),
      avecUnite(A, u2),
      `Un carreau de 1 ${u} de côté a une aire de 1 ${u2}. ${calc} L’aire est ${A} ${u2}.`,
      canvas,
    );
  if (mode === "calcul") {
    const c = calculsQuad(carre, a, b);
    return qcmA(pick(["Quel calcul donne le nombre de carreaux ?", "Combien de carreaux ? Choisis le bon calcul.", "Choisis le calcul qui compte les carreaux."]), c.juste, c.faux, calc, canvas);
  }
  const q = carre ? "le côté" : pick(["la longueur", "la largeur"]);
  const v = carre ? a : q === "la longueur" ? Math.max(a, b) : Math.min(a, b);
  return courtA(
    pick([`Un carreau a 1 ${u} de côté. Combien mesure ${q} ?`, `Les carreaux ont 1 ${u} de côté. Trouve ${q}.`]),
    avecUnite(v, u),
    `On compte les carreaux le long de ${q} : ${v}. Chacun mesure 1 ${u}, donc ${v} ${u}.`,
    canvas,
  );
}
/** ★2 : deux petites étapes, sans histoire. */
function genRectangleDeuxPas(): QAire {
  const u = pick(UNITES_NUES);
  const u2 = `${u}²`;
  const mode = pick(["double", "plus", "moins", "perimetre", "retrouver", "plusieurs"] as const);
  if (mode === "double") {
    const l = randomInt(2, 8);
    const k = pick([2, 3]);
    const L = k * l;
    const texte = k === 2 ? pick([`Largeur ${l} ${u}. La longueur est le double. Calcule l’aire.`, `Un rectangle : largeur ${l} ${u}, longueur 2 fois plus grande. Calcule l’aire.`]) : `Largeur ${l} ${u}, longueur 3 fois plus grande. Quelle est l’aire ?`;
    return courtA(texte, avecUnite(L * l, u2), `La longueur mesure ${k} × ${l} = ${L} ${u}. L’aire est ${L} × ${l} = ${L * l} ${u2}.`);
  }
  if (mode === "plus") {
    const l = randomInt(2, 9);
    const k = randomInt(1, 5);
    const L = l + k;
    return courtA(
      pick([`Largeur ${l} ${u}. Longueur : ${k} ${u} de plus. Calcule l’aire.`, `Un rectangle a ${l} ${u} de large et ${k} ${u} de plus en long. Aire ?`]),
      avecUnite(L * l, u2),
      `La longueur mesure ${l} + ${k} = ${L} ${u}. L’aire est ${L} × ${l} = ${L * l} ${u2}.`,
    );
  }
  if (mode === "moins") {
    const L = randomInt(5, 12);
    const k = randomInt(1, 3);
    const l = L - k;
    return courtA(
      pick([`Longueur ${L} ${u}. Largeur : ${k} ${u} de moins. Calcule l’aire.`, `Un rectangle a ${L} ${u} de long et ${k} ${u} de moins en large. Aire ?`]),
      avecUnite(L * l, u2),
      `La largeur mesure ${L} − ${k} = ${l} ${u}. L’aire est ${L} × ${l} = ${L * l} ${u2}.`,
    );
  }
  if (mode === "perimetre") {
    const L = randomInt(4, 12);
    const l = randomInt(2, L - 1);
    const P = 2 * (L + l);
    return courtA(
      pick([`Périmètre ${P} ${u}, longueur ${L} ${u}. Calcule l’aire du rectangle.`, `Un rectangle a ${P} ${u} de tour et ${L} ${u} de long. Aire ?`]),
      avecUnite(L * l, u2),
      `La moitié du périmètre est ${P} ÷ 2 = ${L + l} ${u}. La largeur est ${L + l} − ${L} = ${l} ${u}. L’aire est ${L} × ${l} = ${L * l} ${u2}.`,
    );
  }
  if (mode === "retrouver") {
    const L = randomInt(4, 10);
    const l = randomInt(2, L - 1);
    const A = L * l;
    const largeur = Math.random() < 0.5;
    const [connu, cherche, nomC, nomR] = largeur ? [L, l, "longueur", "largeur"] : [l, L, "largeur", "longueur"];
    return courtA(
      pick([`Aire ${A} ${u2}, ${nomC} ${connu} ${u}. Trouve la ${nomR}.`, `Un rectangle a pour aire ${A} ${u2}. Sa ${nomC} mesure ${connu} ${u}. ${maj(nomR)} ?`]),
      avecUnite(cherche, u),
      `${A} ÷ ${connu} = ${cherche}. Vérification : ${connu} × ${cherche} = ${A}. La ${nomR} est ${cherche} ${u}.`,
    );
  }
  const n = randomInt(2, 4);
  const L = randomInt(3, 9);
  const l = randomInt(2, L - 1);
  return courtA(
    pick([`${n} rectangles de ${L} ${u} sur ${l} ${u}. Calcule l’aire totale.`, `Calcule l’aire de ${n} rectangles de ${L} ${u} sur ${l} ${u}.`]),
    avecUnite(n * L * l, u2),
    `Un rectangle : ${L} × ${l} = ${L * l} ${u2}. ${n} rectangles : ${n} × ${L * l} = ${n * L * l} ${u2}.`,
  );
}
function genCarreDeuxPas(): QAire {
  const u = pick(UNITES_NUES);
  const u2 = `${u}²`;
  const c = randomInt(2, 12);
  const A = c * c;
  const P = 4 * c;
  const mode = pick(["perimetre", "cote", "tour", "plusieurs", "deux", "ecart", "agrandi"] as const);
  if (mode === "perimetre")
    return courtA(
      pick([`Un carré a ${P} ${u} de périmètre. Calcule son aire.`, `Périmètre d’un carré : ${P} ${u}. Quelle est son aire ?`, `Un carré a ${P} ${u} de tour. Trouve son aire.`]),
      avecUnite(A, u2),
      `Le côté mesure ${P} ÷ 4 = ${c} ${u}. L’aire est ${c} × ${c} = ${A} ${u2}.`,
    );
  if (mode === "cote")
    return courtA(
      pick([`Un carré a pour aire ${A} ${u2}. Trouve son côté.`, `Aire d’un carré : ${A} ${u2}. Combien mesure son côté ?`, `Quel côté pour un carré de ${A} ${u2} ?`]),
      avecUnite(c, u),
      `On cherche le nombre qui, multiplié par lui-même, donne ${A} : ${c} × ${c} = ${A}. Le côté mesure ${c} ${u}.`,
    );
  if (mode === "tour")
    return courtA(
      pick([`Un carré a pour aire ${A} ${u2}. Calcule son périmètre.`, `Aire d’un carré : ${A} ${u2}. Combien mesure son tour ?`]),
      avecUnite(P, u),
      `${c} × ${c} = ${A} : le côté mesure ${c} ${u}. Le périmètre est 4 × ${c} = ${P} ${u}.`,
    );
  if (mode === "plusieurs") {
    const n = randomInt(2, 4);
    return courtA(
      pick([`${n} carrés de côté ${c} ${u}. Calcule l’aire totale.`, `Calcule l’aire de ${n} carrés de côté ${c} ${u}.`]),
      avecUnite(n * A, u2),
      `Un carré : ${c} × ${c} = ${A} ${u2}. ${n} carrés : ${n} × ${A} = ${n * A} ${u2}.`,
    );
  }
  let d = randomInt(2, 12);
  while (d === c) d = randomInt(2, 12);
  if (mode === "deux")
    return courtA(
      pick([`Un carré de côté ${c} ${u} et un carré de côté ${d} ${u}. Aire totale ?`, `Carrés de côtés ${c} ${u} et ${d} ${u}. Calcule leur aire totale.`]),
      avecUnite(A + d * d, u2),
      `${c} × ${c} = ${A} et ${d} × ${d} = ${d * d}. Total : ${A} + ${d * d} = ${A + d * d} ${u2}.`,
    );
  if (mode === "ecart") {
    const [g, p] = [Math.max(c, d), Math.min(c, d)];
    return courtA(
      pick([`Carré de côté ${g} ${u}, carré de côté ${p} ${u}. Calcule l’écart des aires.`, `Écart entre l’aire d’un carré de côté ${g} ${u} et de côté ${p} ${u} ?`]),
      avecUnite(g * g - p * p, u2),
      `${g} × ${g} = ${g * g} et ${p} × ${p} = ${p * p}. Écart : ${g * g} − ${p * p} = ${g * g - p * p} ${u2}.`,
    );
  }
  const k = randomInt(1, 4);
  if (Math.random() < 0.5) {
    const n2 = 2 * c;
    return courtA(`Un carré de côté ${c} ${u}. Son côté double. Nouvelle aire ?`, avecUnite(n2 * n2, u2), `Le nouveau côté mesure 2 × ${c} = ${n2} ${u}. L’aire est ${n2} × ${n2} = ${n2 * n2} ${u2}.`);
  }
  const n2 = c + k;
  return courtA(`Un carré de côté ${c} ${u} gagne ${k} ${u} de côté. Nouvelle aire ?`, avecUnite(n2 * n2, u2), `Le nouveau côté mesure ${c} + ${k} = ${n2} ${u}. L’aire est ${n2} × ${n2} = ${n2 * n2} ${u2}.`);
}

// ----- AIRE_COMPARER, ★1
const BORNES_AIRES: [string, number, number][] = [["cm²", 10, 300], ["dm²", 5, 90], ["m²", 4, 150]];
function deuxAiresA() {
  const [u, lo, hi] = pick(BORNES_AIRES);
  const a = randomInt(lo, hi);
  let b = randomInt(lo, hi);
  while (b === a) b = randomInt(lo, hi);
  return { u, a, b };
}
const signe = (a: number, b: number) => (a < b ? "<" : a > b ? ">" : "=");
function genComparerSigne(): QAire {
  const { u, a, b: b0 } = deuxAiresA();
  const mode = pick(["signe", "vrai", "ecart"] as const);
  if (mode === "signe") {
    const b = Math.random() < 0.15 ? a : b0;
    const [A, B] = [`${a} ${u}`, `${b} ${u}`];
    return qcmA(
      pick([`Écris <, > ou = : ${A} … ${B}.`, `Complète avec <, > ou = : ${A} … ${B}.`, `Quel signe entre ${A} et ${B} ?`, `Choisis le signe : ${A} … ${B}.`]),
      signe(a, b),
      ["<", ">", "="],
      `Même unité : on compare les nombres. ${a} ${signe(a, b)} ${b}.`,
    );
  }
  const b = b0;
  const [A, B] = [`${a} ${u}`, `${b} ${u}`];
  const calc = `Même unité : on compare les nombres. ${Math.min(a, b)} < ${Math.max(a, b)}.`;
  if (mode === "vrai") {
    const [t, vrai] = pick([
      [`${A} est plus grand que ${B}. Vrai ou faux ?`, a > b],
      [`${A} est plus petit que ${B}. Vrai ou faux ?`, a < b],
      [`${A} dépasse ${B}. Vrai ou faux ?`, a > b],
      [`${A} > ${B}. Vrai ou faux ?`, a > b],
      [`${A} < ${B}. Vrai ou faux ?`, a < b],
    ] as [string, boolean][]);
    return vfA(t, vrai, calc);
  }
  const [G, P] = a > b ? [A, B] : [B, A];
  return courtA(
    pick([`Calcule l’écart entre ${A} et ${B}.`, `Quelle différence entre ${A} et ${B} ?`, `De combien ${G} dépasse-t-il ${P} ?`]),
    avecUnite(Math.abs(a - b), u),
    `On enlève la plus petite : ${Math.max(a, b)} − ${Math.min(a, b)} = ${Math.abs(a - b)} ${u}.`,
  );
}
function genComparerListe(n: 3 | 4): QAire {
  const [u, lo, hi] = pick(BORNES_AIRES);
  const vals: number[] = [];
  while (vals.length < n) {
    const v = randomInt(lo, hi);
    if (!vals.includes(v)) vals.push(v);
  }
  const asc = [...vals].sort((x, y) => x - y);
  const l = vals.map((v) => `${v} ${u}`).join(", ");
  const grand = Math.random() < 0.5;
  const juste = grand ? asc[n - 1] : asc[0];
  const mode = pick(n === 3 ? (["ecrire", "choix", "range", "milieu"] as const) : (["ecrire", "choix", "range"] as const));
  const calc = `Même unité : on range les nombres. ${asc.join(" < ")}.`;
  if (mode === "ecrire")
    return courtA(pick([`Écris la plus ${mot(grand)} aire : ${l}.`, `Quelle est la plus ${mot(grand)} : ${l} ?`]), avecUnite(juste, u), `${calc} La plus ${mot(grand)} est ${juste} ${u}.`);
  if (mode === "choix")
    return qcmA(pick([`Choisis la plus ${mot(grand)} aire.`, `Coche la plus ${mot(grand)} de ces aires.`, `Trouve la plus ${mot(grand)} de ces aires.`]), `${juste} ${u}`, vals.map((v) => `${v} ${u}`), calc);
  if (mode === "milieu")
    return courtA(`Range ${l}. Quelle aire est au milieu ?`, avecUnite(asc[1], u), `${calc} Au milieu : ${asc[1]} ${u}.`);
  const croissant = Math.random() < 0.5;
  const dire = croissant ? "de la plus petite à la plus grande" : "de la plus grande à la plus petite";
  const ecr = (t: number[]) => t.map((v) => `${v} ${u}`).join(" ; ");
  const ordre = croissant ? asc : [...asc].reverse();
  const melange = () => {
    let m = shuffle(asc);
    while (ecr(m) === ecr(ordre) || ecr(m) === ecr([...ordre].reverse())) m = shuffle(asc);
    return ecr(m);
  };
  return qcmA(pick([`Range ces aires ${dire}.`, `Classe ces aires ${dire}.`]), ecr(ordre), [ecr([...ordre].reverse()), melange(), melange(), melange()], calc);
}
function genComparerFigures(): QAire {
  const n = randomInt(4, 11);
  const m = Math.random() < 0.2 ? n : randomInt(4, 11);
  const canvas = deuxFormes(n, m);
  const compte = `À gauche : ${n} carreaux. À droite : ${m} carreaux.`;
  if (Math.random() < 0.2) {
    if (Math.random() < 0.34) return vfA("Ces deux figures ont la même aire. Vrai ou faux ?", n === m, compte, canvas);
    return onA(pick(["Les deux figures ont-elles la même aire ?", "Même aire pour les deux figures : oui ou non ?"]), n === m, compte, canvas);
  }
  const grand = Math.random() < 0.5;
  const juste = n === m ? "elles ont la même aire" : (n > m) === grand ? "la figure de gauche" : "la figure de droite";
  return qcmA(
    pick([
      `Quelle figure a la plus ${mot(grand)} aire ?`,
      `Laquelle a la plus ${mot(grand)} aire ?`,
      `Compte les carreaux. Quelle figure a la plus ${mot(grand)} aire ?`,
      `Observe. Quelle figure est la plus ${mot(grand)} ?`,
      `Laquelle couvre le ${grand ? "plus" : "moins"} de carreaux ?`,
    ]),
    juste,
    ["la figure de gauche", "la figure de droite", "elles ont la même aire"],
    compte,
    canvas,
  );
}
function genComparerSimple(): QAire {
  const grand = Math.random() < 0.5;
  const mode = pick(["carreaux", "carres", "largeurs"] as const);
  if (mode === "carreaux") {
    const a = randomInt(4, 30);
    let b = randomInt(4, 30);
    while (b === a) b = randomInt(4, 30);
    return qcmA(
      pick([`Figure A : ${a} carreaux. Figure B : ${b} carreaux. Plus ${mot(grand)} aire ?`, `A : ${a} carreaux. B : ${b} carreaux. Quelle aire est la plus ${mot(grand)} ?`]),
      (a > b) === grand ? "la figure A" : "la figure B",
      ["la figure A", "la figure B"],
      `Mêmes carreaux : la figure qui en a le ${grand ? "plus" : "moins"} a la plus ${mot(grand)} aire. ${a} et ${b}.`,
    );
  }
  const u = pick(UNITES_NUES);
  const a = randomInt(2, 12);
  let b = randomInt(2, 12);
  while (b === a) b = randomInt(2, 12);
  const j = grand ? Math.max(a, b) : Math.min(a, b);
  if (mode === "carres") {
    if (Math.random() < 0.5)
      return qcmA(pick([`Choisis le plus ${grand ? "grand" : "petit"} carré.`, `Coche le carré de plus ${mot(grand)} aire.`]), `côté ${j} ${u}`, [`côté ${a} ${u}`, `côté ${b} ${u}`, `côté ${a + b} ${u}`].filter((c) => grand ? c !== `côté ${a + b} ${u}` : true), `Plus le côté est ${grand ? "grand" : "petit"}, plus l’aire est ${grand ? "grande" : "petite"} : ${a} × ${a} = ${a * a} et ${b} × ${b} = ${b * b}.`);
    return qcmA(`Quel carré est le plus ${grand ? "grand" : "petit"} : côté ${a} ${u} ou ${b} ${u} ?`, `côté ${j} ${u}`, [`côté ${a} ${u}`, `côté ${b} ${u}`], `${a} × ${a} = ${a * a} et ${b} × ${b} = ${b * b}.`);
  }
  return qcmA(
    `Même longueur. Largeurs ${a} ${u} et ${b} ${u}. Plus ${mot(grand)} aire ?`,
    `largeur ${j} ${u}`,
    [`largeur ${a} ${u}`, `largeur ${b} ${u}`],
    `La longueur est la même : la plus ${mot(grand)} largeur donne la plus ${mot(grand)} aire.`,
  );
}

// ----- AIRE_COMPARER, ★2
function genComparerFiguresRect(): QAire {
  let [a, b, c, d] = [randomInt(1, 4), randomInt(2, 4), randomInt(1, 4), randomInt(2, 4)];
  if (Math.random() < 0.25) {
    [a, b, c, d] = pick([[2, 3, 3, 2], [2, 4, 4, 2], [3, 4, 4, 3], [1, 4, 2, 2], [2, 2, 1, 4]]);
  } else {
    while (a === c && b === d) [c, d] = [randomInt(1, 4), randomInt(2, 4)];
  }
  const canvas = deuxRectangles(a, b, c, d);
  const [n, m] = [a * b, c * d];
  const compte = `À gauche : ${a} × ${b} = ${n} carreaux. À droite : ${c} × ${d} = ${m} carreaux.`;
  if (Math.random() < 0.2) return onA(pick(["Les deux rectangles ont-ils la même aire ?", "Même aire pour ces deux rectangles : oui ou non ?"]), n === m, compte, canvas);
  const grand = Math.random() < 0.5;
  return qcmA(
    pick([
      `Quel rectangle a la plus ${mot(grand)} aire ?`,
      `Compte les carreaux. Quel rectangle a la plus ${mot(grand)} aire ?`,
      `Calcule les aires. Quel rectangle couvre le ${grand ? "plus" : "moins"} de carreaux ?`,
      `Multiplie, puis compare. Quel rectangle a la plus ${mot(grand)} aire ?`,
    ]),
    n === m ? "ils ont la même aire" : (n > m) === grand ? "le rectangle de gauche" : "le rectangle de droite",
    ["le rectangle de gauche", "le rectangle de droite", "ils ont la même aire"],
    compte,
    canvas,
  );
}
function genComparerCalcule2(): QAire {
  const u = pick(UNITES_NUES);
  const grand = Math.random() < 0.5;
  if (Math.random() < 0.5) {
    // Un carré et un rectangle.
    let [c, L, l] = [randomInt(3, 9), randomInt(4, 12), randomInt(2, 6)];
    while (l >= L) l = randomInt(2, L - 1);
    // Une fois sur quatre, les deux aires sont égales avec des formes différentes.
    if (Math.random() < 0.25) [c, L, l] = pick([[4, 8, 2], [6, 9, 4], [6, 12, 3], [3, 9, 1]]);
    const [Ac, Ar] = [c * c, L * l];
    const calc = `Carré : ${c} × ${c} = ${Ac} ${u}². Rectangle : ${L} × ${l} = ${Ar} ${u}².`;
    const [C, R] = [`arré de côté ${c} ${u}`, `ectangle de ${L} ${u} sur ${l} ${u}`];
    const mode = pick(["cr", "rc", "meme"] as const);
    if (mode === "meme") return onA(`Rectangle de ${L} ${u} sur ${l} ${u}, carré de côté ${c} ${u}. Même aire ?`, Ac === Ar, calc);
    return qcmA(
      `${mode === "cr" ? `C${C}, r${R}` : `R${R}, c${C}`}. Plus ${mot(grand)} aire ?`,
      Ac === Ar ? "la même aire" : (Ac > Ar) === grand ? "le carré" : "le rectangle",
      ["le carré", "le rectangle", "la même aire"],
      calc,
    );
  }
  // Deux rectangles A et B.
  const [a, b] = [randomInt(3, 9), randomInt(2, 6)];
  let [c, d] = [randomInt(3, 9), randomInt(2, 6)];
  while (a === c && b === d) [c, d] = [randomInt(3, 9), randomInt(2, 6)];
  const calc = `A : ${a} × ${b} = ${a * b} ${u}². B : ${c} × ${d} = ${c * d} ${u}².`;
  const mode = pick(["plus", "compare", "meme"] as const);
  if (mode === "meme") return onA(`Même aire ? A : ${a} ${u} sur ${b} ${u}. B : ${c} ${u} sur ${d} ${u}.`, a * b === c * d, calc);
  if (mode === "compare")
    return qcmA(
      `Rectangle A : ${a} ${u} sur ${b} ${u}. Rectangle B : ${c} ${u} sur ${d} ${u}. Compare.`,
      a * b === c * d ? "aires égales" : a * b > c * d ? "aire de A > aire de B" : "aire de A < aire de B",
      ["aire de A > aire de B", "aire de A < aire de B", "aires égales"],
      calc,
    );
  return qcmA(
    `A : ${a} ${u} sur ${b} ${u}. B : ${c} ${u} sur ${d} ${u}. Plus ${mot(grand)} aire ?`,
    a * b === c * d ? "la même aire" : (a * b > c * d) === grand ? "le rectangle A" : "le rectangle B",
    ["le rectangle A", "le rectangle B", "la même aire"],
    calc,
  );
}
function genComparerUnites2(): QAire {
  const grand = Math.random() < 0.5;
  const mode = pick(["mixte", "mixte", "signe", "decimal", "decimalSigne"] as const);
  if (mode === "mixte" || mode === "signe") {
    const [haut, bas] = pick([["m²", "dm²"], ["dm²", "cm²"]] as [string, string][]);
    const h = randomInt(2, 9);
    const egal = mode === "signe" && Math.random() < 0.2;
    const b = egal ? h * 100 : h * 100 + pick([-90, -50, -20, 20, 50, 90]);
    const [H, B] = [`${h} ${haut}`, `${nf(b)} ${bas}`];
    const calc = `On écrit tout dans la même unité : 1 ${haut} = 100 ${bas}, donc ${h} ${haut} = ${h * 100} ${bas}. On compare ${h * 100} et ${b}.`;
    if (mode === "signe")
      return qcmA(pick([`Écris <, > ou = : ${H} … ${B}.`, `Choisis le signe : ${H} … ${B}.`, `Quel signe entre ${H} et ${B} ?`]), signe(h * 100, b), ["<", ">", "="], calc);
    const hautGagne = (h * 100 > b) === grand;
    return courtA(
      pick([`Compare ${H} et ${B}. Écris la plus ${mot(grand)}.`, `Écris la plus ${mot(grand)} aire : ${H} ou ${B}.`, `Quelle aire est la plus ${mot(grand)} : ${H} ou ${B} ?`]),
      hautGagne ? avecUnite(h, haut) : avecUnite(b, bas),
      `${calc} La plus ${mot(grand)} est ${hautGagne ? H : B}.`,
    );
  }
  const u = pick(["cm²", "dm²", "m²"]);
  const e = randomInt(2, 40);
  const [x, y] = pick([[e + 0.5, e + 0.25], [e + 0.2, e + 0.15], [e + 0.75, e + 0.8], [e + 0.1, e + 0.09], [e + 0.3, e + 0.35]]);
  const [A, B] = shuffle([x, y]);
  const calc = `On compare les chiffres un par un, après la virgule : ${nf(Math.min(x, y))} < ${nf(Math.max(x, y))}.`;
  if (mode === "decimalSigne")
    return qcmA(pick([`Choisis le signe entre ${nf(A)} ${u} et ${nf(B)} ${u}.`, `Compare avec un signe : ${nf(A)} ${u} … ${nf(B)} ${u}.`]), signe(A, B), ["<", ">", "="], calc);
  return courtA(
    pick([`Entre ${nf(A)} ${u} et ${nf(B)} ${u}, écris la plus ${mot(grand)}.`, `Laquelle est la plus ${mot(grand)} : ${nf(A)} ${u} ou ${nf(B)} ${u} ?`]),
    avecUnite(grand ? Math.max(x, y) : Math.min(x, y), u),
    calc,
  );
}
function genComparerEcart2(): QAire {
  const mode = pick(["ecart", "ecart", "fois", "fois", "liste"] as const);
  if (mode === "liste") return genComparerListe(4);
  if (mode === "ecart") {
    const { u, a, b } = deuxAiresA();
    const [G, P] = [Math.max(a, b), Math.min(a, b)];
    return courtA(
      pick([`Combien manque-t-il à ${P} ${u} pour atteindre ${G} ${u} ?`, `De combien ${G} ${u} dépasse-t-il ${P} ${u} ?`, `A mesure ${G} ${u}, B ${P} ${u}. Calcule la différence.`, `Écart entre ${G} ${u} et ${P} ${u} ?`]),
      avecUnite(G - P, u),
      `${G} − ${P} = ${G - P} ${u}.`,
    );
  }
  const u = pick(["cm²", "dm²", "m²"]);
  const v = randomInt(3, 12);
  const k = randomInt(2, 6);
  const T = v * k;
  const t = pick(["combien", "plusGrand", "plusPetit"] as const);
  if (t === "combien")
    return courtA(
      pick([`Combien de fois ${v} ${u} dans ${T} ${u} ?`, `${T} ${u} fait combien de fois ${v} ${u} ?`, `${T} ${u} est combien de fois plus grand que ${v} ${u} ?`]),
      [nf(k), `${k} fois`],
      `${T} ÷ ${v} = ${k}.`,
    );
  if (t === "plusGrand") return courtA(`A : ${v} ${u}. B : ${k} fois plus grande. Aire de B ?`, avecUnite(T, u), `${k} × ${v} = ${T} ${u}.`);
  return courtA(`A : ${T} ${u}. B : ${k} fois plus petite. Aire de B ?`, avecUnite(v, u), `${T} ÷ ${k} = ${v} ${u}.`);
}

// ----- AIRE_PROBLEME, ★2 : un petit problème, sans histoire.
const uProbleme = () => pick(["m", "m", "cm", "dm"]);
function genProblemeAssembler(): QAire {
  const u = uProbleme();
  const u2 = `${u}²`;
  const L = randomInt(3, 12);
  const l = randomInt(2, L - 1);
  const c = randomInt(2, 9);
  const n = randomInt(2, 4);
  const mode = pick(["carres", "rectangles", "mixte", "parties"] as const);
  if (mode === "carres")
    return courtA(
      pick([`${n} carrés de ${c} ${u} de côté. Calcule l’aire totale.`, `Calcule l’aire de ${n} carrés de côté ${c} ${u}.`, `Aire totale de ${n} carrés de côté ${c} ${u} ?`]),
      avecUnite(n * c * c, u2),
      `Un carré : ${c} × ${c} = ${c * c} ${u2}. ${n} carrés : ${n} × ${c * c} = ${n * c * c} ${u2}.`,
    );
  if (mode === "rectangles")
    return courtA(
      pick([`${n} rectangles de ${L} ${u} sur ${l} ${u}. Calcule l’aire totale.`, `Calcule l’aire de ${n} rectangles de ${L} ${u} sur ${l} ${u}.`, `Aire totale de ${n} rectangles de ${L} ${u} sur ${l} ${u} ?`]),
      avecUnite(n * L * l, u2),
      `Un rectangle : ${L} × ${l} = ${L * l} ${u2}. ${n} rectangles : ${n} × ${L * l} = ${n * L * l} ${u2}.`,
    );
  if (mode === "mixte")
    return courtA(
      pick([`Rectangle de ${L} ${u} sur ${l} ${u}, carré de côté ${c} ${u}. Aire totale ?`, `Calcule l’aire totale : rectangle de ${L} ${u} sur ${l} ${u}, carré de côté ${c} ${u}.`, `Carré de côté ${c} ${u}, rectangle de ${L} ${u} sur ${l} ${u}. Aire des deux ?`]),
      avecUnite(L * l + c * c, u2),
      `${L} × ${l} = ${L * l} et ${c} × ${c} = ${c * c}. Total : ${L * l} + ${c * c} = ${L * l + c * c} ${u2}.`,
    );
  const [x, y] = [randomInt(6, 60), randomInt(6, 60)];
  return courtA(
    pick([`Une figure a deux parties : ${x} ${u2} et ${y} ${u2}. Aire totale ?`, `Partie A : ${x} ${u2}. Partie B : ${y} ${u2}. Calcule l’aire totale.`, `On réunit ${x} ${u2} et ${y} ${u2}. Quelle est l’aire totale ?`]),
    avecUnite(x + y, u2),
    `On additionne : ${x} + ${y} = ${x + y} ${u2}.`,
  );
}
function genProblemeReste(): QAire {
  const u = uProbleme();
  const u2 = `${u}²`;
  const mode = pick(["reste", "resteRect", "moins", "parts"] as const);
  if (mode === "reste") {
    const T = randomInt(20, 90);
    const x = randomInt(5, T - 5);
    return courtA(
      pick([`Aire totale : ${T} ${u2}. ${x} ${u2} sont couverts. Combien reste-t-il à couvrir ?`, `Il faut couvrir ${T} ${u2}. ${x} ${u2} sont déjà couverts. Combien reste-t-il ?`, `Sur ${T} ${u2}, ${x} ${u2} sont coloriés. Quelle aire reste à colorier ?`]),
      avecUnite(T - x, u2),
      `On enlève ce qui est fait : ${T} − ${x} = ${T - x} ${u2}.`,
    );
  }
  const L = randomInt(4, 12);
  const l = randomInt(3, L - 1);
  const A = L * l;
  if (mode === "resteRect") {
    const x = randomInt(2, A - 2);
    return courtA(
      pick([`Un rectangle de ${L} ${u} sur ${l} ${u}. ${x} ${u2} sont coloriés. Combien reste-t-il ?`, `Rectangle de ${L} ${u} sur ${l} ${u} : ${x} ${u2} coloriés. Quelle aire reste à colorier ?`]),
      avecUnite(A - x, u2),
      `L’aire totale : ${L} × ${l} = ${A} ${u2}. Il reste ${A} − ${x} = ${A - x} ${u2}.`,
    );
  }
  if (mode === "moins") {
    const c = randomInt(2, l - 1 >= 2 ? l - 1 : 2);
    if (Math.random() < 0.5) {
      const G = randomInt(c + 1, 12);
      return courtA(
        pick([`Un grand carré de côté ${G} ${u}, moins un carré de côté ${c} ${u}. Aire ?`, `Carré de côté ${G} ${u} moins carré de côté ${c} ${u}. Aire restante ?`]),
        avecUnite(G * G - c * c, u2),
        `${G} × ${G} = ${G * G} et ${c} × ${c} = ${c * c}. Il reste ${G * G} − ${c * c} = ${G * G - c * c} ${u2}.`,
      );
    }
    return courtA(
      `Rectangle de ${L} ${u} sur ${l} ${u} moins un carré de côté ${c} ${u}. Aire ?`,
      avecUnite(A - c * c, u2),
      `${L} × ${l} = ${A} et ${c} × ${c} = ${c * c}. Il reste ${A} − ${c * c} = ${A - c * c} ${u2}.`,
    );
  }
  if (Math.random() < 0.5) {
    const c = pick([2, 4, 6, 8, 10]);
    const kc = pick([2, 4]);
    return courtA(
      `Carré de côté ${c} ${u} coupé en ${kc} parts égales. Aire d’une part ?`,
      avecUnite((c * c) / kc, u2),
      `${c} × ${c} = ${c * c} ${u2}. ${c * c} ÷ ${kc} = ${(c * c) / kc} ${u2}.`,
    );
  }
  // La longueur est un multiple de k : le partage tombe juste.
  const k = pick([2, 3, 4]);
  const LP = k * randomInt(2, 4);
  const lP = randomInt(2, LP - 1);
  return courtA(
    `Rectangle de ${LP} ${u} sur ${lP} ${u} coupé en ${k} parts égales. Aire d’une part ?`,
    avecUnite((LP * lP) / k, u2),
    `${LP} × ${lP} = ${LP * lP} ${u2}. ${LP * lP} ÷ ${k} = ${(LP * lP) / k} ${u2}.`,
  );
}
function genProblemeRetrouver(): QAire {
  const u = uProbleme();
  const u2 = `${u}²`;
  const c = randomInt(2, 12);
  const mode = pick(["cote", "coteRect", "tour", "aireDuTour", "aireDuTourRect"] as const);
  if (mode === "cote")
    return courtA(
      pick([`Un carré a pour aire ${c * c} ${u2}. Trouve son côté.`, `Aire du carré : ${c * c} ${u2}. Combien mesure son côté ?`, `Un carré couvre ${c * c} ${u2}. Quel est son côté ?`]),
      avecUnite(c, u),
      `On cherche le nombre qui, multiplié par lui-même, donne ${c * c} : ${c} × ${c} = ${c * c}. Le côté mesure ${c} ${u}.`,
    );
  if (mode === "tour")
    return courtA(
      pick([`Un carré a pour aire ${c * c} ${u2}. Calcule son périmètre.`, `Aire du carré : ${c * c} ${u2}. Combien mesure son tour ?`]),
      avecUnite(4 * c, u),
      `${c} × ${c} = ${c * c} : le côté mesure ${c} ${u}. Le périmètre est 4 × ${c} = ${4 * c} ${u}.`,
    );
  if (mode === "aireDuTour")
    return courtA(
      pick([`Un carré a ${4 * c} ${u} de périmètre. Calcule son aire.`, `Périmètre du carré : ${4 * c} ${u}. Quelle est son aire ?`]),
      avecUnite(c * c, u2),
      `Le côté mesure ${4 * c} ÷ 4 = ${c} ${u}. L’aire est ${c} × ${c} = ${c * c} ${u2}.`,
    );
  const L = randomInt(4, 12);
  const l = randomInt(2, L - 1);
  if (mode === "aireDuTourRect")
    return courtA(
      pick([`Périmètre ${2 * (L + l)} ${u}, longueur ${L} ${u}. Calcule l’aire du rectangle.`, `Un rectangle a ${2 * (L + l)} ${u} de tour et ${l} ${u} de large. Aire ?`]),
      avecUnite(L * l, u2),
      `La moitié du périmètre : ${L + l} ${u}. L’autre côté en découle. L’aire est ${L} × ${l} = ${L * l} ${u2}.`,
    );
  const largeur = Math.random() < 0.5;
  const [connu, cherche, nomC, nomR] = largeur ? [L, l, "longueur", "largeur"] : [l, L, "largeur", "longueur"];
  return courtA(
    pick([`Rectangle d’aire ${L * l} ${u2}, ${nomC} ${connu} ${u}. Trouve sa ${nomR}.`, `Un rectangle a pour aire ${L * l} ${u2}. Sa ${nomC} mesure ${connu} ${u}. Trouve sa ${nomR}.`, `Aire ${L * l} ${u2}, ${nomC} ${connu} ${u}. Calcule la ${nomR} du rectangle.`]),
    avecUnite(cherche, u),
    `${L * l} ÷ ${connu} = ${cherche}. La ${nomR} mesure ${cherche} ${u}.`,
  );
}
function genProblemeCarreaux(): QAire {
  const u = uProbleme();
  const u2 = `${u}²`;
  const mode = pick(["unite", "uniteCarre", "aire", "rect"] as const);
  if (mode === "unite") {
    const L = randomInt(3, 12);
    const l = randomInt(2, L - 1);
    return courtA(
      pick([`Combien de carrés de 1 ${u2} remplissent un rectangle de ${L} ${u} sur ${l} ${u} ?`, `Un rectangle de ${L} ${u} sur ${l} ${u}. Combien de carrés de 1 ${u2} ?`]),
      [nf(L * l), `${L * l} carrés`],
      `L’aire est ${L} × ${l} = ${L * l} ${u2}. Il faut ${L * l} carrés de 1 ${u2}.`,
    );
  }
  if (mode === "uniteCarre") {
    const c = randomInt(2, 10);
    return courtA(
      pick([`Un carré de ${c} ${u} de côté. Combien de carrés de 1 ${u2} dedans ?`, `Combien de carrés de 1 ${u2} dans un carré de côté ${c} ${u} ?`]),
      [nf(c * c), `${c * c} carrés`],
      `L’aire est ${c} × ${c} = ${c * c} ${u2}. Il faut ${c * c} carrés de 1 ${u2}.`,
    );
  }
  const k = pick([2, 3, 4, 5]);
  const n = randomInt(3, 12);
  if (mode === "aire")
    return courtA(
      pick([`Un rectangle couvre ${k * n} ${u2}. Un carreau couvre ${k} ${u2}. Combien de carreaux ?`, `Combien de carreaux de ${k} ${u2} pour couvrir ${k * n} ${u2} ?`, `${k * n} ${u2} à couvrir, ${k} ${u2} par carreau. Combien de carreaux ?`]),
      nombreOuCarreaux(n),
      `${k * n} ÷ ${k} = ${n}. Il faut ${n} carreaux.`,
    );
  const l = pick([2, 3, 4, 5, 6]);
  const L = l + randomInt(1, 6);
  // l vaut 2 à 6 : au moins un de ces diviseurs convient toujours.
  const c = pick([2, 3, 4, 5].filter((x) => (L * l) % x === 0));
  return courtA(
    pick([`Rectangle de ${L} ${u} sur ${l} ${u}, carreaux de ${c} ${u2}. Combien de carreaux ?`, `Combien de carreaux de ${c} ${u2} pour un rectangle de ${L} ${u} sur ${l} ${u} ?`]),
    nombreOuCarreaux((L * l) / c),
    `L’aire est ${L} × ${l} = ${L * l} ${u2}. ${L * l} ÷ ${c} = ${(L * l) / c} carreaux.`,
  );
}
function genProblemeModifier(): QAire {
  const u = uProbleme();
  const u2 = `${u}²`;
  const L = randomInt(4, 12);
  const l = randomInt(2, L - 1);
  const dims = `${L} ${u} sur ${l} ${u}`;
  const k = randomInt(1, 4);
  const mode = pick(["double", "ajout", "gain", "carreDouble", "carreAjout"] as const);
  if (mode === "double") {
    const cote = pick(["longueur", "largeur"]);
    const facteur = pick(["double", "triple"]);
    const m = facteur === "double" ? 2 : 3;
    return courtA(
      `Un rectangle de ${dims}. La ${cote} ${facteur}. ${pick(["Nouvelle aire ?", "Quelle aire obtient-on ?"])}`,
      avecUnite(m * L * l, u2),
      `La ${cote} est multipliée par ${m} : l’aire aussi. ${m} × ${L * l} = ${m * L * l} ${u2}.`,
    );
  }
  if (mode === "ajout") {
    const lg = Math.random() < 0.5;
    const r = lg ? (L + k) * l : L * (l + k);
    const nomC = lg ? "longueur" : "largeur";
    return courtA(
      pick([`Rectangle de ${dims}. On ajoute ${k} ${u} à la ${nomC}. Aire ?`, `Rectangle de ${dims}. La ${nomC} gagne ${k} ${u}. Nouvelle aire ?`]),
      avecUnite(r, u2),
      `Les nouveaux côtés : ${lg ? L + k : L} ${u} et ${lg ? l : l + k} ${u}. L’aire est ${r} ${u2}.`,
    );
  }
  if (mode === "gain") {
    const lg = Math.random() < 0.5;
    const nomC = lg ? "longueur" : "largeur";
    const r = lg ? k * l : k * L;
    return courtA(
      `Un rectangle de ${dims} : sa ${nomC} gagne ${k} ${u}. Aire gagnée ?`,
      avecUnite(r, u2),
      `Le rectangle ajouté mesure ${k} ${u} sur ${lg ? l : L} ${u} : ${r} ${u2}.`,
    );
  }
  const c = randomInt(2, 9);
  if (mode === "carreDouble")
    return courtA(`Un carré de côté ${c} ${u}. Son côté double. Nouvelle aire ?`, avecUnite(4 * c * c, u2), `Le nouveau côté : 2 × ${c} = ${2 * c} ${u}. L’aire : ${2 * c} × ${2 * c} = ${4 * c * c} ${u2}.`);
  return courtA(`Un carré de côté ${c} ${u} gagne ${k} ${u} de côté. Nouvelle aire ?`, avecUnite((c + k) * (c + k), u2), `Le nouveau côté : ${c} + ${k} = ${c + k} ${u}. L’aire : ${c + k} × ${c + k} = ${(c + k) * (c + k)} ${u2}.`);
}

/** Les champs communs d'un gabarit neuf : chacun a son correcteur (correcteurs/aires.ts). */
function gabaritAire(id: string, notionId: string, microId: string, difficulty: 1 | 2, hint: string, generate: () => QAire): TutorBankItemV4 {
  return { kind: "template", id, niveau: "6e", matiere: "maths", notionId, microId, difficulty, theme: "neutral", hint, tags: [notionId, "template"], generate } as TutorBankItemV4;
}

export const airesBank: TutorBankItemV4[] = [
  // =========================
  // AREA_COMPRENDRE
  // =========================
  {
    kind: "fixed",
    id: "aire_comprendre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "L’aire d’une figure mesure…",
    format: "qcm",
    choices: ["son contour", "sa surface", "sa longueur", "son angle"],
    expected: ["sa surface"],
    comparator: "mcq_exact",
    hint: "L’aire mesure la place occupée à l’intérieur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire mesure la surface occupée par une figure, c’est-à-dire tout l’intérieur de la figure.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_comprendre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité convient pour mesurer une aire ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "g"],
    expected: ["cm²"],
    comparator: "mcq_exact",
    hint: "Une aire se mesure en unités carrées.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Une aire se mesure avec des unités carrées. Par exemple, on utilise cm² pour mesurer une surface.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_comprendre_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture correspond à une aire ?",
    format: "qcm",
    choices: ["15 cm", "15 cm²", "15 cm³", "15 kg"],
    expected: ["15 cm²"],
    comparator: "mcq_exact",
    hint: "Cherche l’unité carrée.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("15 cm est une longueur, 15 cm³ un volume, 15 kg une masse. Une aire s’écrit ici 15 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_comprendre_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    // 03/11/2026 : un lieu (jardin, La Réunion) = un contexte, donc ★3 (REGLES-6E.md).
    difficulty: 3,
    theme: "reunion",
    text: "Pour mesurer la surface d’un jardin à La Réunion, on peut utiliser…",
    format: "qcm",
    choices: ["m", "m²", "m³", "L"],
    expected: ["m²"],
    comparator: "mcq_exact",
    hint: "Une surface se mesure en unités carrées.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La surface d’un jardin est une aire. On la mesure donc en mètres carrés, notés m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "comprendre", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_comprendre_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 5 cm sur 4 cm. Quelle grandeur vaut 20 ?",
    format: "qcm",
    choices: ["son périmètre en cm", "son aire en cm²", "son contour en cm²", "son volume en cm³"],
    expected: ["son aire en cm²"],
    comparator: "mcq_exact",
    hint: "Pour l’aire du rectangle, on multiplie longueur et largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Pour un rectangle de 5 cm sur 4 cm, l’aire vaut 5 × 4 = 20 cm². Le périmètre vaudrait 18 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "comprendre", "confusion", "qcm"],
  },

  // =========================
  // AREA_COMPTER
  // =========================
  {
    kind: "fixed",
    id: "aire_compter_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 1,
    theme: "neutral",
    text: "Une surface recouvre 6 carreaux unités. Quelle est son aire ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On compte les carreaux unités.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Quand on mesure une aire par comptage, on compte les carreaux unités. Ici, 6 carreaux donnent une aire de 6 unités d’aire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "compter"],
  },
  {
    kind: "fixed",
    id: "aire_compter_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Une figure occupe 12 carreaux unités. Quelle est son aire ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "L’aire est égale au nombre de carreaux unités.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’une figure mesurée sur quadrillage est le nombre de carreaux unités qu’elle recouvre. Ici, cela fait 12.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "compter"],
  },
  {
    kind: "fixed",
    id: "aire_compter_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Une figure recouvre 9 carreaux unités. Son aire vaut…",
    format: "qcm",
    choices: ["6", "8", "9", "18"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "On compte les carreaux.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Chaque carreau unité compte pour 1 unité d’aire. Avec 9 carreaux, l’aire est donc 9.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "compter", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_compter_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 3,
    theme: "neutral",
    text: "Une surface couvre 3 rangées de 4 carreaux unités. Quelle est son aire ?",
    format: "qcm",
    choices: ["7", "10", "12", "14"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "3 × 4 carreaux.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Il y a 3 rangées de 4 carreaux, donc 3 × 4 = 12 carreaux unités. L’aire est 12.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "compter", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_compter_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Quelle est son aire en unités d’aire ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte les carreaux remplis.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La figure recouvre 5 carreaux unités. Son aire vaut donc 5 unités d’aire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "compter", "canvas"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 5,
        filledCells: [
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "aire_compter_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l’aire de cette figure sur quadrillage ?",
    format: "qcm",
    choices: ["4", "5", "6", "8"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Compte uniquement les carreaux remplis.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La figure recouvre 6 carreaux unités. Son aire vaut donc 6 unités d’aire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_unite", "compter", "canvas", "qcm"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 5,
        filledCells: [
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
      },
    },
  },

  // =========================
  // AREA_RECTANGLE
  // =========================
  {
    kind: "fixed",
    id: "aire_rectangle_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de 4 cm sur 3 cm ?",
    format: "short",
    expected: ["12 cm²"],
    comparator: "number_equal",
    hint: "Aire du rectangle = longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’un rectangle se calcule en multipliant la longueur par la largeur : 4 × 3 = 12. L’aire est donc 12 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "rectangle"],
  },
  {
    kind: "fixed",
    id: "aire_rectangle_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de 6 cm sur 4 cm ?",
    format: "qcm",
    choices: ["10 cm²", "20 cm²", "24 cm²", "28 cm²"],
    expected: ["24 cm²"],
    comparator: "mcq_exact",
    hint: "Pour l’aire, on multiplie longueur et largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("On applique la formule de l’aire du rectangle : 6 × 4 = 24. L’aire est donc 24 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "rectangle", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_rectangle_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm de longueur et 5 cm de largeur. Quelle est son aire ?",
    format: "qcm",
    choices: ["13 cm²", "26 cm²", "40 cm²", "16 cm²"],
    expected: ["40 cm²"],
    comparator: "mcq_exact",
    hint: "Attention à ne pas confondre aire et périmètre.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’un rectangle est longueur × largeur. Ici, 8 × 5 = 40. L’aire est donc 40 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "rectangle", "confusion", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_rectangle_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure. Quelle est l’aire du rectangle ABCD ?",
    format: "short",
    expected: ["18 cm²"],
    comparator: "number_equal",
    hint: "Multiplie la longueur par la largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Le rectangle a une longueur de 6 cm et une largeur de 3 cm. Son aire vaut 6 × 3 = 18 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "rectangle", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 60, y: 80 },
        B: { x: 240, y: 80 },
        C: { x: 240, y: 170 },
        D: { x: 60, y: 170 },
      },
      sideLabels: {
        AB: "6 cm",
        BC: "3 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "CD"], ["BC", "DA"]],
      },
    },
  },

  // =========================
  // AREA_SQUARE
  // =========================
  {
    kind: "fixed",
    id: "aire_carre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 5 cm ?",
    format: "short",
    expected: ["25 cm²"],
    comparator: "number_equal",
    hint: "Aire du carré = côté × côté.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Dans un carré, les côtés sont égaux. On calcule donc 5 × 5 = 25. L’aire est 25 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "carre"],
  },
  {
    kind: "fixed",
    id: "aire_carre_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 7 cm ?",
    format: "qcm",
    choices: ["14 cm²", "28 cm²", "49 cm²", "21 cm²"],
    expected: ["49 cm²"],
    comparator: "mcq_exact",
    hint: "Il faut multiplier le côté par lui-même.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’un carré de côté 7 cm vaut 7 × 7 = 49. La bonne réponse est 49 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_carre_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 3,
    theme: "neutral",
    text: "Choisis la bonne réponse : l’aire d’un carré de côté 9 cm est...",
    format: "qcm",
    choices: ["18 cm²", "36 cm²", "81 cm²", "27 cm²"],
    expected: ["81 cm²"],
    comparator: "mcq_exact",
    hint: "Un carré de côté 9 a une aire de 9 × 9.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Pour un carré, on calcule côté × côté. Ici 9 × 9 = 81. L’aire est donc 81 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "carre", "confusion", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_carre_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure. Quelle est l’aire du carré ABCD ?",
    format: "short",
    expected: ["16 cm²"],
    comparator: "number_equal",
    hint: "Dans un carré, on fait côté × côté.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Le côté du carré mesure 4 cm. Son aire vaut donc 4 × 4 = 16 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "carre", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 70 },
        B: { x: 180, y: 70 },
        C: { x: 180, y: 170 },
        D: { x: 80, y: 170 },
      },
      sideLabels: {
        AB: "4 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },

  // =========================
  // AREA_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "aire_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle aire est la plus grande : 12 cm² ou 15 cm² ?",
    format: "short",
    // ⛔ 06/10/2026 : contains_keyword « 15 » acceptait « 150 » → numérique, unité comprise.
    expected: ["15 cm²"],
    comparator: "number_equal",
    hint: "Compare les nombres 12 et 15.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Les deux aires sont dans la même unité. On compare donc 12 et 15. Comme 15 est plus grand, 15 cm² est la plus grande aire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "comparer"],
  },
  {
    kind: "fixed",
    id: "aire_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle aire est la plus petite : 20 cm² ou 9 cm² ?",
    format: "short",
    expected: ["9 cm²"],
    comparator: "number_equal",
    hint: "Compare les nombres.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Comme les unités sont identiques, il suffit de comparer 20 et 9. La plus petite aire est 9 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "comparer"],
  },
  {
    kind: "fixed",
    id: "aire_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Laquelle de ces quatre aires est la plus grande ?",
    format: "qcm",
    choices: ["8 cm²", "14 cm²", "11 cm²", "13 cm²"],
    expected: ["14 cm²"],
    comparator: "mcq_exact",
    hint: "Choisis la plus grande valeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La plus grande des quatre aires proposées est 14 cm². C’est donc la bonne réponse.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_comparer_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, quel potager est le plus grand : 18 m² ou 21 m² ?",
    format: "short",
    expected: ["21 m²"],
    comparator: "number_equal",
    hint: "Le plus grand nombre donne la plus grande aire.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("18 m² et 21 m² sont deux aires. Comme 21 est plus grand que 18, le potager de 21 m² est le plus grand.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "comparer", "reunion"],
  },
  {
    kind: "fixed",
    id: "aire_comparer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Quel carré a la plus grande aire ?",
    format: "qcm",
    choices: ["côté 3 cm", "côté 4 cm", "côté 5 cm", "côté 6 cm"],
    expected: ["côté 6 cm"],
    comparator: "mcq_exact",
    hint: "L’aire du carré vaut côté × côté.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Les aires valent 9 cm², 16 cm², 25 cm² et 36 cm². La plus grande aire est celle du carré de côté 6 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "comparer", "qcm", "carre"],
  },

  // =========================
  // AREA_DECOMPOSER
  // =========================
  {
    kind: "fixed",
    id: "aire_decomposer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure est formée de deux rectangles de 8 cm² et 5 cm². Quelle est son aire totale ?",
    format: "short",
    expected: ["13 cm²"],
    comparator: "number_equal",
    hint: "On additionne les aires des deux rectangles.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Quand une figure est décomposée en deux rectangles sans chevauchement, on additionne les aires : 8 + 5 = 13 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "decomposer"],
  },
  {
    kind: "fixed",
    id: "aire_decomposer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure est composée d’un rectangle de 12 cm² et d’un carré de 9 cm². Quelle est son aire ?",
    format: "short",
    expected: ["21 cm²"],
    comparator: "number_equal",
    hint: "Additionne les aires des deux parties.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("On décompose la figure en deux parties simples : 12 cm² et 9 cm². Leur somme vaut 21 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "decomposer"],
  },
  {
    kind: "fixed",
    id: "aire_decomposer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    text: "Une figure en L est décomposée en deux rectangles d’aires 10 cm² et 6 cm². Quelle est l’aire totale ?",
    format: "qcm",
    choices: ["14 cm²", "16 cm²", "20 cm²", "60 cm²"],
    expected: ["16 cm²"],
    comparator: "mcq_exact",
    hint: "On additionne les aires des deux rectangles.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La figure en L est découpée en deux rectangles. L’aire totale vaut 10 + 6 = 16 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "decomposer", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_decomposer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer l’aire d’une figure composée, que peut-on faire ?",
    format: "qcm",
    choices: [
      "multiplier toutes les longueurs",
      "la découper en figures simples",
      "additionner tous les périmètres",
      "chercher seulement le contour",
    ],
    expected: ["la découper en figures simples"],
    comparator: "mcq_exact",
    hint: "On cherche une méthode pour transformer une figure complexe en figures connues.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Pour calculer l’aire d’une figure composée, on peut la décomposer en rectangles ou carrés plus simples, puis additionner leurs aires.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "decomposer", "qcm", "methode"],
  },
  {
    kind: "fixed",
    id: "aire_decomposer_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    text: "La figure sur quadrillage est décomposée en deux rectangles d’aires 4 et 2. Quelle est son aire totale ?",
    format: "short",
    // ⛔ 06/10/2026 : contains_keyword « 6 » acceptait « 16 » → numérique.
    expected: ["6 unités", "6"],
    comparator: "number_equal",
    hint: "Additionne les aires des deux parties.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La figure peut être vue comme un rectangle de 4 unités d’aire et un autre de 2 unités d’aire. L’aire totale vaut 6.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "decomposer", "canvas"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 5,
        // 07/11/2026 : c'était un escalier (3 + 2 + 1), impossible à couper en deux
        // rectangles de 4 et de 2 comme le dit l'énoncé. Maintenant un vrai L.
        filledCells: [
          [1, 1],
          [1, 2],
          [1, 3],
          [1, 4],
          [2, 1],
          [2, 2],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
      },
    },
  },

  // =========================
  // AREA_PROBLEMES
  // =========================
  {
    kind: "fixed",
    id: "aire_probleme_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un jardin rectangulaire mesure 7 m de long et 3 m de large. Quelle est son aire ?",
    format: "short",
    expected: ["21 m²"],
    comparator: "number_equal",
    hint: "Aire du rectangle = longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Le jardin est un rectangle. Son aire vaut 7 × 3 = 21 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "probleme"],
  },
  {
    kind: "fixed",
    id: "aire_probleme_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, une parcelle rectangulaire mesure 8 m sur 5 m. Quelle est son aire ?",
    format: "short",
    expected: ["40 m²"],
    comparator: "number_equal",
    hint: "Multiplie la longueur par la largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Comme la parcelle est rectangulaire, on calcule son aire en faisant 8 × 5 = 40 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "aire_probleme_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Une pièce rectangulaire mesure 4,5 m sur 2 m. Quelle est son aire ?",
    format: "qcm",
    choices: ["6,5 m²", "9 m²", "13 m²", "4,5 m²"],
    expected: ["9 m²"],
    comparator: "mcq_exact",
    hint: "On multiplie 4,5 par 2.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’un rectangle se calcule par longueur × largeur. Ici, 4,5 × 2 = 9. L’aire est donc 9 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "probleme", "qcm", "decimal_nombre"],
  },
  {
    kind: "fixed",
    id: "aire_probleme_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Un rectangle a une largeur de 3 m. Si sa longueur double, que devient son aire ?",
    format: "qcm",
    choices: ["elle diminue", "elle reste la même", "elle double", "elle triple"],
    expected: ["elle double"],
    comparator: "mcq_exact",
    hint: "L’aire = longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Si la largeur reste la même et que la longueur est multipliée par 2, alors l’aire est aussi multipliée par 2. Elle double.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "probleme", "qcm", "prop_proportionnalite"],
  },
  {
    kind: "fixed",
    id: "aire_probleme_qcm_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Une terrasse rectangulaire mesure 2,5 m sur 4 m. Quelle est son aire ?",
    format: "qcm",
    choices: ["6,5 m²", "10 m²", "12 m²", "20 m²"],
    expected: ["10 m²"],
    comparator: "mcq_exact",
    hint: "Multiplie 2,5 par 4.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire de la terrasse vaut 2,5 × 4 = 10 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "probleme", "qcm", "decimal_nombre"],
  },

  // =========================
  // AREA_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "aire_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : question rendue précise (Frédéric).
    text: "Un rectangle mesure 5 cm sur 3 cm.\nQuelle est son aire ?",
    format: "qcm",
    choices: ["15 cm²", "15 cm³", "15 cm", "16 cm"],
    expected: ["15 cm²"],
    comparator: "mcq_exact",
    hint: "Une aire mesure une surface : elle s’écrit en cm².",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : aire du rectangle = longueur × largeur. L’unité est le cm².\n\n" +
      "Calcul : " +
      ("5 × 3 = 15, donc 15 cm². Le cm³ sert pour un volume. 16 cm est le périmètre.") +
      "\n\nConclusion : l’aire est 15 cm².",
    tags: ["aire_surface", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    // ⛔ 06/10/2026 : question ouverte dont les mots-clés étaient « 6 », « 5 »…
    // (n'importe quelle réponse avec un 5 passait). QCM sur les mêmes pièges.
    text: "Pourquoi un carré de côté 6 cm a-t-il une aire plus grande qu’un carré de côté 5 cm ? Choisis la bonne explication.",
    format: "qcm",
    choices: [
      "6 × 6 = 36 cm² et 5 × 5 = 25 cm², et 36 est plus grand que 25",
      "6 + 6 = 12 cm² et 5 + 5 = 10 cm², et 12 est plus grand que 10",
      "6 cm est plus long que 5 cm, donc l’aire a seulement 1 cm² de plus",
      "4 × 6 = 24 cm² et 4 × 5 = 20 cm², et 24 est plus grand que 20",
    ],
    expected: ["6 × 6 = 36 cm² et 5 × 5 = 25 cm², et 36 est plus grand que 25"],
    comparator: "mcq_exact",
    hint: "Compare 6 × 6 et 5 × 5.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Un carré de côté 6 cm a une aire de 6 × 6 = 36 cm². Un carré de côté 5 cm a une aire de 5 × 5 = 25 cm². Comme 36 est plus grand que 25, son aire est plus grande.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Deux rectangles peuvent-ils avoir la même aire mais des périmètres différents ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare par exemple 3 × 4 et 2 × 6.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Oui. Deux rectangles peuvent avoir la même aire mais des périmètres différents. Par exemple, 3 × 4 et 2 × 6 ont tous deux une aire de 12 cm², mais pas le même périmètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "qcm", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Si on double la longueur d’un rectangle sans changer sa largeur, que devient son aire ?",
    format: "qcm",
    choices: ["elle reste la même", "elle double", "elle triple", "elle diminue"],
    expected: ["elle double"],
    comparator: "mcq_exact",
    hint: "L’aire vaut longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Si la largeur reste la même et que la longueur est multipliée par 2, alors l’aire est aussi multipliée par 2. Elle double.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "qcm", "prop_proportionnalite"],
  },
  {
    kind: "fixed",
    id: "aire_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Donne un exemple d’aire comprise entre 10 cm² et 15 cm².",
    format: "short",
    // 07/11/2026 : « 12 cm² », écrit avec l'unité comme on le demande partout, était refusé.
    expected: ["11", "12", "13", "14", "11 cm²", "12 cm²", "13 cm²", "14 cm²"],
    comparator: "exact_text",
    hint: "Choisis un nombre strictement entre 10 et 15.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Une aire strictement comprise entre 10 cm² et 15 cm² peut être 11 cm², 12 cm², 13 cm² ou 14 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un carré a une aire de 36 cm². Combien mesure un côté ?",
    format: "short",
    expected: ["6 cm"],
    comparator: "number_equal",
    hint: "Cherche le nombre qui multiplié par lui-même donne 36.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Comme 6 × 6 = 36, un carré d’aire 36 cm² a un côté de 6 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "inverse"],
  },
  {
    kind: "fixed",
    id: "aire_defi_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un rectangle a une aire de 24 cm² et une largeur de 4 cm. Quelle est sa longueur ?",
    format: "short",
    expected: ["6 cm"],
    comparator: "number_equal",
    hint: "Aire = longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Si l’aire vaut 24 cm² et la largeur 4 cm, alors la longueur vaut 24 ÷ 4 = 6 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "inverse"],
  },
  {
    kind: "fixed",
    id: "aire_defi_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Cette figure a-t-elle la même aire qu’un rectangle de 3 unités sur 2 unités ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le rectangle de 3 sur 2 a une aire de 6.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Le rectangle de 3 unités sur 2 unités a une aire de 6. La figure sur quadrillage recouvre aussi 6 carreaux unités. Les deux aires sont donc égales.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "canvas", "qcm", "comparaison"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 5,
        filledCells: [
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "aire_defi_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "reunion",
    text: "À La Réunion, deux parcelles de 12 m² et 9 m² sont réunies. Quelle aire totale obtient-on ?",
    format: "short",
    expected: ["21 m²"],
    comparator: "number_equal",
    hint: "Additionne les deux aires.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Quand on réunit deux parcelles sans chevauchement, on additionne leurs aires : 12 + 9 = 21 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_surface", "defi", "reunion"],
  },

  // =========================
  // TEMPLATES - AREA_COMPRENDRE
  // =========================
  {
    kind: "template",
    id: "aire_comprendre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Une aire se mesure en unités carrées.",
    tags: ["aire_unite", "comprendre", "template"],
    generate: () => genAireComprendreUniteNue(),
  },
  {
    kind: "template",
    id: "aire_comprendre_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Couvrir une surface, c’est l’aire ; faire le tour, c’est le périmètre.",
    tags: ["aire_unite", "comprendre", "template"],
    generate: () => (Math.random() < 0.7 ? genAireComprendreGrandeurNue() : genAireComprendreUniteNue()),
  },
  {
    // 03/11/2026 : les situations (timbre, potager, gazon, clôture…) passent à ★3.
    kind: "template",
    id: "aire_comprendre_tpl_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Couvrir une surface, c’est l’aire ; faire le tour, c’est le périmètre.",
    tags: ["aire_unite", "comprendre", "template"],
    generate: () => (Math.random() < 0.6 ? genAireComprendreGrandeur() : genAireComprendreUnite()),
  },

  // =========================
  // TEMPLATES - AREA_COMPTER
  // =========================
  {
    kind: "template",
    id: "aire_compter_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les carreaux unités.",
    tags: ["aire_unite", "compter", "template"],
    generate: () => genAireCompterLignesNue(),
  },
  {
    // 03/11/2026 : mosaïque, patchwork, dalles… passent à ★3.
    kind: "template",
    id: "aire_compter_tpl_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les carreaux unités.",
    tags: ["aire_unite", "compter", "template"],
    generate: () => genAireCompterLignes(),
  },
  {
    kind: "template",
    id: "aire_compter_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_compter",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie les rangées par les carreaux de chaque rangée.",
    tags: ["aire_unite", "compter", "qcm", "template"],
    // makeChoices écarte les pièges qui tomberaient sur la bonne réponse
    // (à 3 rangées de 3, a + b + … pourrait coïncider) : cinq en réserve.
    generate: () => genAireCompterRangees(),
  },

  // =========================
  // TEMPLATES - AREA_RECTANGLE
  // =========================
  {
    kind: "template",
    id: "aire_rectangle_tpl_e1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 1,
    theme: "neutral",
    hint: "Aire = longueur × largeur.",
    tags: ["aire_surface", "rectangle", "template"],
    generate: () => genAireRectangle(1),
  },
  {
    kind: "template",
    id: "aire_rectangle_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire = longueur × largeur.",
    tags: ["aire_surface", "rectangle", "template"],
    generate: () => genAireRectangle(2),
  },
  {
    kind: "template",
    id: "aire_rectangle_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne confonds pas aire et périmètre.",
    tags: ["aire_surface", "rectangle", "qcm", "template"],
    // Pièges : le périmètre, la somme, l'unité de longueur au lieu de l'unité carrée.
    generate: () => genAireRectangle(3),
  },

  // =========================
  // TEMPLATES - AREA_SQUARE
  // =========================
  {
    kind: "template",
    id: "aire_carre_tpl_e1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 1,
    theme: "neutral",
    hint: "Aire du carré = côté × côté.",
    tags: ["aire_surface", "carre", "template"],
    generate: () => genAireCarre(1),
  },
  {
    kind: "template",
    id: "aire_carre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire du carré = côté × côté.",
    tags: ["aire_surface", "carre", "template"],
    generate: () => genAireCarre(2),
  },
  {
    kind: "template",
    id: "aire_carre_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour un carré, on fait côté × côté.",
    tags: ["aire_surface", "carre", "qcm", "template"],
    generate: () => genAireCarre(3),
  },

  // =========================
  // TEMPLATES - AREA_COMPARER
  // =========================
  {
    kind: "template",
    id: "aire_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les deux nombres.",
    tags: ["aire_surface", "comparer", "template"],
    // ⛔ 06/10/2026 — était en contains_keyword avec « 15 » comme mot-clé :
    // « 15 » acceptait « 150 ». Comparateur numérique, unité comprise.
    generate: () => genAireComparerDeuxNu(),
  },
  {
    // 03/11/2026 : chambres, potagers, tentes… passent à ★3.
    kind: "template",
    id: "aire_comparer_tpl_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les deux nombres.",
    tags: ["aire_surface", "comparer", "template"],
    generate: () => genAireComparerDeux(),
  },
  {
    kind: "template",
    id: "aire_comparer_tpl_e3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord les deux aires, puis compare-les.",
    tags: ["aire_surface", "comparer", "qcm", "template"],
    generate: () => genAireComparerRectangles(),
  },

  // =========================
  // TEMPLATES - AREA_DECOMPOSER
  // =========================
  {
    kind: "template",
    id: "aire_decomposer_tpl_e3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 3,
    theme: "neutral",
    hint: "Les morceaux couvrent tout, sans se chevaucher : additionne leurs aires.",
    tags: ["aire_surface", "decomposer", "template"],
    generate: () => genAireDecomposerParties(),
  },
  {
    kind: "template",
    id: "aire_decomposer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    hint: "Découpe la figure en rectangles plus simples, ou retire ce qui manque.",
    tags: ["aire_surface", "decomposer", "template"],
    generate: () => genAireDecomposer(false),
  },
  {
    kind: "template",
    id: "aire_decomposer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    hint: "On additionne les aires des parties.",
    tags: ["aire_surface", "decomposer", "qcm", "template"],
    // Pièges : un seul des deux rectangles, la somme des côtés, le carré
    // ajouté au lieu d'être retiré. makeChoices écarte les pièges en double.
    generate: () => genAireDecomposer(true),
  },

  // =========================
  // TEMPLATES - AREA_PROBLEMES
  // =========================
  {
    kind: "template",
    id: "aire_probleme_tpl_e2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire du rectangle = longueur × largeur.",
    tags: ["aire_surface", "probleme", "template"],
    generate: () => genAireProblemeSimpleNu(),
  },
  {
    // 03/11/2026 : carrelage, moquette, parquet dans une pièce passent à ★3.
    kind: "template",
    id: "aire_probleme_tpl_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Le sol est un rectangle : longueur × largeur.",
    tags: ["aire_surface", "probleme", "template"],
    generate: () => genAireProblemeSimple(),
  },
  {
    kind: "template",
    id: "aire_probleme_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord l’aire, puis sers-t’en.",
    tags: ["aire_surface", "probleme", "template"],
    generate: () => genAireProblemeDeuxEtapes(false),
  },
  {
    kind: "template",
    id: "aire_probleme_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "L’aire = longueur × largeur.",
    tags: ["aire_surface", "probleme", "qcm", "template"],
    // Le prix d'un sol, souvent avec une longueur décimale (4,5 m ; 3,25 m).
    // Pièges : prix × périmètre, prix × (longueur + largeur), aire + prix.
    generate: () => genAireProblemeDeuxEtapes(true),
  },

  // =========================
  // TEMPLATES - AREA_DEFIS
  // =========================
  {
    kind: "template",
    id: "aire_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Aire = longueur × largeur : quel nombre manque dans la multiplication ?",
    tags: ["aire_surface", "defi", "template"],
    // 06/10/2026 — était « donne une aire entre 9 et 14 cm² » : une phrase,
    // aucune aire à calculer. Remplacé par le côté manquant d'un rectangle.
    generate: () => genAireDefiCoteManquant(),
  },
  {
    kind: "template",
    id: "aire_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche le nombre qui multiplié par lui-même donne l’aire.",
    tags: ["aire_surface", "defi", "template", "inverse"],
    generate: () => genAireDefiCarreInverse(),
  },
  {
    kind: "template",
    id: "aire_defi_tpl_e4",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule les aires au lieu de deviner.",
    tags: ["aire_surface", "defi", "qcm", "template"],
    generate: () => genAireDefiPieges(),
  },

  // ========== TOP-UP — AIRE_COMPRENDRE ==========
  {
    kind: "fixed", id: "aire_comprendre_topup_1", niveau: "6e", matiere: "maths",
    notionId: "aire_unite", microId: "aire_comprendre", difficulty: 1, theme: "neutral",
    text: "Le périmètre mesure le contour d’une figure. Que mesure l’aire ?",
    format: "qcm", choices: ["la surface", "le contour", "la hauteur", "le nombre de sommets"],
    expected: ["la surface"], comparator: "mcq_exact",
    hint: "L’aire concerne l’intérieur de la figure.",
    explanation: expl("L’aire mesure la surface, c’est-à-dire la place occupée à l’intérieur de la figure, contrairement au périmètre qui mesure le contour."),
    tags: ["aire_unite", "comprendre", "qcm"],
  },
  {
    kind: "fixed", id: "aire_comprendre_topup_2", niveau: "6e", matiere: "maths",
    notionId: "aire_unite", microId: "aire_comprendre", difficulty: 1, theme: "neutral",
    // 07/11/2026 : « un terrain de football » était un contexte à ★1 (REGLES-6E).
    text: "Un carré a 50 m de côté. Quelle unité pour son aire ?",
    format: "qcm", choices: ["m²", "m", "m³", "kg"], expected: ["m²"], comparator: "mcq_exact",
    hint: "Une aire se mesure en unités carrées.",
    explanation: expl("Une aire se mesure en unités carrées. Les côtés sont en m : l’aire s’écrit en mètres carrés (m²)."),
    tags: ["aire_unite", "comprendre", "qcm"],
  },
  {
    kind: "fixed", id: "aire_comprendre_topup_3", niveau: "6e", matiere: "maths",
    notionId: "aire_unite", microId: "aire_comprendre", difficulty: 2, theme: "neutral",
    text: "« 15 cm² » est une mesure de…",
    format: "qcm", choices: ["aire", "longueur", "masse", "durée"], expected: ["aire"], comparator: "mcq_exact",
    hint: "Le « ² » indique une unité carrée.",
    explanation: expl("L’unité cm² (centimètre carré) est une unité d’aire. « 15 cm² » est donc une mesure d’aire."),
    tags: ["aire_unite", "comprendre", "qcm"],
  },
  {
    kind: "fixed", id: "aire_comprendre_topup_4", niveau: "6e", matiere: "maths",
    notionId: "aire_unite", microId: "aire_comprendre", difficulty: 2, theme: "neutral",
    text: "Un carreau fait 1 cm². Une figure couvre 12 carreaux. Quelle est son aire ?",
    format: "short", expected: ["12 cm²"], comparator: "number_equal",
    hint: "Chaque carreau vaut 1 cm².",
    explanation: expl("On compte les carreaux : 12 carreaux de 1 cm² donnent une aire de 12 cm²."),
    tags: ["aire_unite", "comprendre", "carreaux"],
  },

  // ========== TOP-UP — AIRE_CARRE ==========
  {
    kind: "fixed", id: "aire_carre_topup_1", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_carre", difficulty: 1, theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 9 cm ?",
    format: "short", expected: ["81 cm²"], comparator: "number_equal",
    hint: "Aire d’un carré = côté × côté.",
    explanation: expl("L’aire d’un carré est côté × côté. Ici, 9 × 9 = 81, donc l’aire est 81 cm²."),
    tags: ["aire_surface", "carre"],
  },
  {
    kind: "fixed", id: "aire_carre_topup_2", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_carre", difficulty: 2, theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 7 cm ?",
    format: "short", expected: ["49 cm²"], comparator: "number_equal",
    hint: "7 × 7.",
    explanation: expl("L’aire d’un carré est côté × côté. Ici, 7 × 7 = 49, donc l’aire est 49 cm²."),
    tags: ["aire_surface", "carre"],
  },
  {
    kind: "fixed", id: "aire_carre_topup_3", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_carre", difficulty: 2, theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 10 cm ?",
    format: "short", expected: ["100 cm²"], comparator: "number_equal",
    hint: "10 × 10.",
    explanation: expl("L’aire d’un carré est côté × côté. Ici, 10 × 10 = 100, donc l’aire est 100 cm²."),
    tags: ["aire_surface", "carre"],
  },
  {
    kind: "fixed", id: "aire_carre_topup_4", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_carre", difficulty: 1, theme: "neutral",
    text: "Quelle est la formule de l’aire d’un carré ?",
    format: "qcm", choices: ["côté × côté", "côté × 4", "côté + côté", "longueur × largeur"],
    expected: ["côté × côté"], comparator: "mcq_exact",
    hint: "Les quatre côtés d’un carré sont égaux.",
    explanation: expl("L’aire d’un carré se calcule en multipliant son côté par lui-même : côté × côté."),
    tags: ["aire_surface", "carre", "qcm"],
  },

  // ========== TOP-UP — AIRE_RECTANGLE ==========
  {
    kind: "fixed", id: "aire_rectangle_topup_1", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_rectangle", difficulty: 1, theme: "neutral",
    text: "Calcule l’aire d’un rectangle de 6 cm sur 4 cm.",
    format: "short", expected: ["24 cm²"], comparator: "number_equal",
    hint: "Aire = Longueur × largeur.",
    explanation: expl("L’aire d’un rectangle est Longueur × largeur. Ici, 6 × 4 = 24, donc l’aire est 24 cm²."),
    tags: ["aire_surface", "rectangle"],
  },
  {
    kind: "fixed", id: "aire_rectangle_topup_2", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_rectangle", difficulty: 2, theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de 8 cm sur 3 cm ?",
    format: "short", expected: ["24 cm²"], comparator: "number_equal",
    hint: "8 × 3.",
    explanation: expl("L’aire d’un rectangle est Longueur × largeur. Ici, 8 × 3 = 24, donc l’aire est 24 cm²."),
    tags: ["aire_surface", "rectangle"],
  },
  {
    kind: "fixed", id: "aire_rectangle_topup_3", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_rectangle", difficulty: 2, theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de longueur 10 cm et de largeur 5 cm ?",
    format: "short", expected: ["50 cm²"], comparator: "number_equal",
    hint: "10 × 5.",
    explanation: expl("L’aire d’un rectangle est Longueur × largeur. Ici, 10 × 5 = 50, donc l’aire est 50 cm²."),
    tags: ["aire_surface", "rectangle"],
  },
  {
    kind: "fixed", id: "aire_rectangle_topup_4", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_rectangle", difficulty: 1, theme: "neutral",
    text: "Quelle est la formule de l’aire d’un rectangle ?",
    format: "qcm", choices: ["Longueur × largeur", "Longueur + largeur", "côté × côté", "2 × (L + l)"],
    expected: ["Longueur × largeur"], comparator: "mcq_exact",
    hint: "On multiplie les deux dimensions.",
    explanation: expl("L’aire d’un rectangle se calcule en multipliant sa longueur par sa largeur : Longueur × largeur. (2 × (L + l) est le périmètre.)"),
    tags: ["aire_surface", "rectangle", "qcm"],
  },

  // ========== TOP-UP — AIRE_COMPARER ==========
  {
    kind: "fixed", id: "aire_comparer_topup_1", niveau: "6e", matiere: "maths",
    // 03/11/2026 : deux aires à calculer puis comparer = deux étapes, donc ★3.
    notionId: "aire_surface", microId: "aire_comparer", difficulty: 3, theme: "neutral",
    text: "Carré de côté 4 cm, rectangle de 5 cm sur 3 cm. Lequel a la plus grande aire ?",
    format: "qcm", choices: ["le carré", "le rectangle", "elles ont la même aire"], expected: ["le carré"], comparator: "mcq_exact",
    hint: "Calcule les deux aires puis compare.",
    explanation: expl("Aire du carré : 4 × 4 = 16 cm². Aire du rectangle : 5 × 3 = 15 cm². 16 > 15, donc le carré a la plus grande aire."),
    tags: ["aire_surface", "comparer", "qcm"],
  },
  {
    kind: "fixed", id: "aire_comparer_topup_2", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_comparer", difficulty: 3, theme: "neutral",
    text: "Deux rectangles mesurent 6 cm sur 2 cm et 4 cm sur 3 cm. Ont-ils la même aire ?",
    format: "qcm", choices: ["oui", "non"], expected: ["oui"], comparator: "mcq_exact",
    hint: "Calcule les deux aires.",
    explanation: expl("Premier rectangle : 6 × 2 = 12 cm². Deuxième rectangle : 4 × 3 = 12 cm². Les deux aires sont égales : 12 cm²."),
    tags: ["aire_surface", "comparer", "qcm"],
  },
  {
    kind: "fixed", id: "aire_comparer_topup_3", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_comparer", difficulty: 1, theme: "neutral",
    text: "Choisis la plus grande aire.",
    format: "qcm", choices: ["15 cm²", "20 cm²"], expected: ["20 cm²"], comparator: "mcq_exact",
    hint: "Compare 20 et 15.",
    explanation: expl("Les deux aires sont en cm² : on compare les nombres. 20 > 15, donc la plus grande aire est 20 cm²."),
    tags: ["aire_surface", "comparer", "qcm"],
  },
  {
    kind: "fixed", id: "aire_comparer_topup_4", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_comparer", difficulty: 2, theme: "neutral",
    text: "Aire de A : 30 cm². Aire de B : 18 cm². Calcule l’écart.",
    format: "short", expected: ["12 cm²"], comparator: "number_equal",
    hint: "Calcule 30 − 18.",
    explanation: expl("On calcule l’écart des deux aires : 30 - 18 = 12, donc 12 cm² de plus."),
    tags: ["aire_surface", "comparer"],
  },

  // ========== TOP-UP — AIRE_DECOMPOSER ==========
  {
    kind: "fixed", id: "aire_decomposer_topup_1", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_decomposer", difficulty: 3, theme: "neutral",
    text: "Une figure en L : un rectangle de 6 cm sur 2 cm et un carré de 2 cm de côté. Quelle est son aire ?",
    format: "short", expected: ["16 cm²"], comparator: "number_equal",
    hint: "Additionne l’aire du rectangle et celle du carré.",
    explanation: expl("Aire du rectangle : 6 × 2 = 12 cm². Aire du carré : 2 × 2 = 4 cm². Aire totale : 12 + 4 = 16 cm²."),
    tags: ["aire_surface", "decomposer"],
  },
  {
    kind: "fixed", id: "aire_decomposer_topup_2", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_decomposer", difficulty: 3, theme: "neutral",
    text: "Une figure : un rectangle de 5 cm sur 2 cm et un de 3 cm sur 2 cm. Quelle est son aire ?",
    format: "short", expected: ["16 cm²"], comparator: "number_equal",
    hint: "Calcule chaque aire, puis additionne.",
    explanation: expl("Premier rectangle : 5 × 2 = 10 cm². Deuxième rectangle : 3 × 2 = 6 cm². Aire totale : 10 + 6 = 16 cm²."),
    tags: ["aire_surface", "decomposer"],
  },
  {
    kind: "fixed", id: "aire_decomposer_topup_3", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_decomposer", difficulty: 2, theme: "neutral",
    text: "Pour calculer l’aire d’une figure compliquée, on peut...",
    format: "qcm", choices: ["la découper en figures simples", "mesurer seulement son contour", "compter ses sommets", "mesurer un seul côté"],
    expected: ["la découper en figures simples"], comparator: "mcq_exact",
    hint: "Pense aux rectangles et carrés.",
    explanation: expl("Pour une figure compliquée, on la découpe en figures simples (rectangles, carrés), on calcule l’aire de chacune, puis on additionne."),
    tags: ["aire_surface", "decomposer", "qcm"],
  },

  // ========== TOP-UP — AIRE_PROBLEME ==========
  {
    kind: "fixed", id: "aire_probleme_topup_1", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_probleme", difficulty: 2, theme: "neutral",
    text: "Un rectangle mesure 20 m sur 15 m. Calcule son aire.",
    format: "short", expected: ["300 m²"], comparator: "number_equal",
    hint: "Aire = Longueur × largeur.",
    explanation: expl("L’aire du rectangle est Longueur × largeur : 20 × 15 = 300, donc 300 m²."),
    tags: ["aire_surface", "probleme"],
  },
  {
    kind: "fixed", id: "aire_probleme_topup_2", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_probleme", difficulty: 2, theme: "neutral",
    text: "Un carré mesure 4 m de côté. Quelle est son aire ?",
    format: "short", expected: ["16 m²"], comparator: "number_equal",
    hint: "Aire d’un carré = côté × côté.",
    explanation: expl("L’aire du carré est côté × côté : 4 × 4 = 16, donc 16 m²."),
    tags: ["aire_surface", "probleme"],
  },
  {
    kind: "fixed", id: "aire_probleme_topup_3", niveau: "6e", matiere: "maths",
    notionId: "aire_surface", microId: "aire_probleme", difficulty: 3, theme: "neutral",
    text: "On veut recouvrir un sol de 5 m sur 3 m avec des dalles de 1 m². Combien de dalles faut-il ?",
    format: "short", expected: ["15 dalles"], comparator: "number_equal",
    hint: "Calcule d’abord l’aire du sol.",
    explanation: expl("L’aire du sol est 5 × 3 = 15 m². Chaque dalle couvre 1 m², il faut donc 15 dalles."),
    tags: ["aire_surface", "probleme"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AIRE_CONVERTIR — les conversions d'aire
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-GM-aires-1, « effectuer des
  // conversions d'aire »). C'est l'un des trois SEULS objectifs d'apprentissage
  // du chapitre « Les aires » en 6e, avec la formule et le calcul.
  //
  // ⛔⛔ DEUX BORNES DU BO, ET ELLES SONT STRICTES :
  //   1. UNIQUEMENT m² ↔ dm² et dm² ↔ cm². « Les autres conversions d'aire ne
  //      figurent pas au programme » — donc pas de cm² ↔ m², pas de km², pas de
  //      mm² en conversion. Aucun item de cette micro n'en propose.
  //   2. « Le recours à un tableau de conversion est DÉCONSEILLÉ à ce stade. »
  //      La figure remplace donc le tableau : un carré de 1 dm de côté découpé
  //      en 100 carrés de 1 cm de côté. C'est la méthode, pas une illustration.
  //
  // ⭐ LA DÉMONSTRATION EST DANS LE BO, mot pour mot, et elle tient en une ligne :
  //   1 dm² = 1 dm × 1 dm = 10 cm × 10 cm = 10 × 10 cm² = 100 cm².
  // Le côté est multiplié par 10, donc l'aire par 10 × 10 = 100. Un élève qui a
  // vu ce calcul n'a plus besoin de retenir un tableau — il le refabrique.
  //
  // ⚠️ L'ERREUR ATTENDUE EST ×10, importée des longueurs, où elle est juste.
  // Elle a son item, et le carré découpé la réfute d'un regard.
  //
  // ⚠️ mm² ET km² SE CONNAISSENT SANS SE CONVERTIR : le BO demande que l'élève
  // sache que 1 mm² est l'aire d'un carré de 1 mm de côté et 1 km² celle d'un
  // carré de 1 km de côté. Un item le pose, et il ne demande aucune conversion.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "aire_convertir_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Ce carré mesure 1 dm de côté. Compte ses carrés de 1 cm.",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "1 dm = 10 cm : compte les rangées, puis les carrés par rangée.",
    explanation: expl(
      "1 dm vaut 10 cm, donc le carré mesure 10 cm sur 10 cm : il contient 10 rangées de 10 carrés, soit 10 × 10 = 100 carrés de 1 cm². On écrit 1 dm² = 1 dm × 1 dm = 10 cm × 10 cm = 100 cm². Le côté a été multiplié par 10, mais l'aire par 100 — parce qu'on multiplie DEUX longueurs."
    ),
    tags: ["aire_unite", "convertir", "canvas", "short"],
    canvas: carreDecoupe([]),
  },
  {
    kind: "fixed",
    id: "aire_convertir_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Le carré ci-dessous mesure 1 dm de côté, et la case colorée 1 cm de côté. Quelle fraction du grand carré la case colorée représente-t-elle ?",
    format: "qcm",
    choices: ["un centième", "un dixième", "un millième", "un quart"],
    expected: ["un centième"],
    comparator: "mcq_exact",
    hint: "Compte les cases du grand carré.",
    explanation: expl(
      "Le grand carré contient 100 cases identiques : chacune en est donc UN CENTIÈME. On écrit 1 cm² = 0,01 dm² (un centième de dm²). De la même façon, 1 dm² = 0,01 m². C'est cette image — et non un tableau — qu'il faut garder en tête pour convertir."
    ),
    tags: ["aire_unite", "convertir", "canvas", "qcm"],
    canvas: carreDecoupe([[1, 1]]),
  },
  {
    kind: "fixed",
    id: "aire_convertir_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Convertis 3,7 m² en dm².",
    format: "short",
    expected: ["370 dm²"],
    comparator: "number_equal",
    hint: "1 m² = 100 dm².",
    explanation: expl(
      "1 m² vaut 100 dm², puisqu'un carré de 1 m de côté se découpe en 10 × 10 = 100 carrés de 1 dm de côté. Il y a donc 100 fois plus de dm² que de m² : 3,7 × 100 = 370 dm². On va vers une unité plus PETITE, donc le nombre grandit."
    ),
    tags: ["aire_unite", "convertir", "short"],
  },
  {
    kind: "fixed",
    id: "aire_convertir_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Convertis 370 cm² en dm².",
    format: "short",
    expected: ["3,7 dm²"],
    comparator: "number_equal",
    hint: "1 dm² = 100 cm² : ici on va vers une unité plus grande.",
    explanation: expl(
      "Il faut 100 cm² pour faire 1 dm². On cherche donc combien de fois 100 tient dans 370 : 370 ÷ 100 = 3,7 dm². On va vers une unité plus GRANDE, donc le nombre diminue — et il n'a aucune raison d'être entier."
    ),
    tags: ["aire_unite", "convertir", "short"],
  },
  {
    kind: "fixed",
    id: "aire_convertir_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 4,
    theme: "neutral",
    text: "Pour passer des dm² aux cm², par combien multiplie-t-on ?",
    format: "qcm",
    choices: ["par 100", "par 10", "par 1 000", "par 2"],
    expected: ["par 100"],
    comparator: "mcq_exact",
    hint: "C'est le côté qui est multiplié par 10, pas l'aire.",
    explanation: expl(
      "On multiplie par 100. L'erreur naturelle est de répondre 10, parce que c'est vrai pour les LONGUEURS : 1 dm = 10 cm. Mais une aire est un produit de deux longueurs : si chacune est multipliée par 10, l'aire l'est par 10 × 10 = 100. Le carré découpé en 100 cases le montre d'un regard."
    ),
    tags: ["aire_unite", "convertir", "piege", "canvas", "qcm"],
    canvas: carreDecoupe([]),
  },
  {
    kind: "fixed",
    id: "aire_convertir_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 3,
    theme: "reunion",
    text: "Le Piton de la Fournaise est parfois décrit par sa superficie en km². Que représente 1 km² ?",
    format: "qcm",
    choices: [
      "l'aire d'un carré de 1 km de côté",
      "un carré de 1 km de périmètre",
      "une longueur de 1 km",
      "l'aire d'un carré de 100 m de côté",
    ],
    expected: ["l'aire d'un carré de 1 km de côté"],
    comparator: "mcq_exact",
    hint: "Une unité d'aire se nomme toujours d'après le côté d'un carré.",
    explanation: expl(
      "Toutes les unités d'aire se lisent de la même façon : 1 km² est l'aire d'un carré de 1 km de côté, comme 1 cm² est l'aire d'un carré de 1 cm de côté et 1 mm² celle d'un carré de 1 mm de côté. Il faut le SAVOIR ; convertir des km² ou des mm², en revanche, n'est pas au programme de 6e."
    ),
    tags: ["aire_unite", "convertir", "974", "qcm"],
  },
  {
    kind: "template",
    id: "aire_convertir_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Cent d'une unité font l'unité juste au-dessus.",
    tags: ["aire_unite", "convertir", "template"],
    // ⛔ SEULEMENT m² ↔ dm² ET dm² ↔ cm² : voir tirerConversion().
    generate: () => genAireConvertir(),
  },
  {
    kind: "template",
    id: "aire_convertir_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_unite",
    microId: "aire_convertir",
    difficulty: 4,
    theme: "neutral",
    hint: "Une aire est un produit de DEUX longueurs — pars de là.",
    tags: ["aire_unite", "convertir", "template", "qcm"],
    // ⛔ 06/10/2026 — c'était une question ouverte dont les mots-clés étaient
    // des nombres seuls (« 100 », « 10 », « 500 ») : « 10 » validait une
    // réponse fausse. Remplacée par un QCM sur les MÊMES pièges (× 10 au lieu
    // de × 100, mauvais sens), avec l'explication « 10 × 10 = 100 ».
    generate: () => genAireConvertirPiege(),
  },

  // ⭐ 07/11/2026 — PLUSIEURS FAÇONS PAR ÉTOILE (voir la section au-dessus de la banque).
  gabaritAire("aire_comprendre_tpl_e1_mesure", "aire_unite", "aire_comprendre", 1, "Regarde l’unité : cm, cm² ou cm³.", genComprendreMesure),
  gabaritAire("aire_comprendre_tpl_e1_vrai", "aire_unite", "aire_comprendre", 1, "L’aire, c’est l’intérieur ; le périmètre, c’est le contour.", genComprendreVrai),
  gabaritAire("aire_comprendre_tpl_e1_unite", "aire_unite", "aire_comprendre", 1, "1 cm², c’est l’aire d’un carré de 1 cm de côté.", genComprendreUnitePetite),

  gabaritAire("aire_compter_tpl_e1_figure", "aire_unite", "aire_compter", 1, "Compte les carreaux coloriés.", genCompterFigure),
  gabaritAire("aire_compter_tpl_e1_texte", "aire_unite", "aire_compter", 1, "Un carreau de 1 cm² couvre 1 cm².", genCompterTexte),
  gabaritAire("aire_compter_tpl_e1_deux", "aire_unite", "aire_compter", 1, "Compte les carreaux de chaque figure.", genCompterDeuxFigures),
  gabaritAire("aire_compter_tpl_e1_rect", "aire_unite", "aire_compter", 1, "Compte les rangées et les carreaux par rangée.", genCompterRectangle),
  gabaritAire("aire_compter_tpl_e2_rangees", "aire_unite", "aire_compter", 2, "Rangées × carreaux par rangée.", genCompterRangees2),
  gabaritAire("aire_compter_tpl_e2_valeur", "aire_unite", "aire_compter", 2, "Regarde ce que vaut un carreau.", genCompterValeur2),
  gabaritAire("aire_compter_tpl_e2_manque", "aire_unite", "aire_compter", 2, "Compte d’abord les carreaux déjà là.", genCompterManque2),

  gabaritAire("aire_rectangle_tpl_e1_calcul", "aire_surface", "aire_rectangle", 1, "Aire du rectangle = longueur × largeur.", () => genQuadCalcul(false, 1)),
  gabaritAire("aire_rectangle_tpl_e1_lire", "aire_surface", "aire_rectangle", 1, "Lis les deux côtés, puis multiplie.", () => genQuadLire(false, 1)),
  gabaritAire("aire_rectangle_tpl_e1_grille", "aire_surface", "aire_rectangle", 1, "Rangées × carreaux par rangée.", () => genQuadGrille(false, 1)),
  gabaritAire("aire_rectangle_tpl_e2_calcul", "aire_surface", "aire_rectangle", 2, "Aire du rectangle = longueur × largeur.", () => genQuadCalcul(false, 2)),
  gabaritAire("aire_rectangle_tpl_e2_lire", "aire_surface", "aire_rectangle", 2, "Lis les deux côtés, puis multiplie.", () => genQuadLire(false, 2)),
  gabaritAire("aire_rectangle_tpl_e2_grille", "aire_surface", "aire_rectangle", 2, "Rangées × carreaux par rangée.", () => genQuadGrille(false, 2)),
  gabaritAire("aire_rectangle_tpl_e2_deuxpas", "aire_surface", "aire_rectangle", 2, "Trouve d’abord les deux côtés.", genRectangleDeuxPas),

  gabaritAire("aire_carre_tpl_e1_calcul", "aire_surface", "aire_carre", 1, "Aire du carré = côté × côté.", () => genQuadCalcul(true, 1)),
  gabaritAire("aire_carre_tpl_e1_lire", "aire_surface", "aire_carre", 1, "Lis le côté, puis multiplie-le par lui-même.", () => genQuadLire(true, 1)),
  gabaritAire("aire_carre_tpl_e1_grille", "aire_surface", "aire_carre", 1, "Rangées × carreaux par rangée.", () => genQuadGrille(true, 1)),
  gabaritAire("aire_carre_tpl_e2_calcul", "aire_surface", "aire_carre", 2, "Aire du carré = côté × côté.", () => genQuadCalcul(true, 2)),
  gabaritAire("aire_carre_tpl_e2_lire", "aire_surface", "aire_carre", 2, "Lis le côté, puis multiplie-le par lui-même.", () => genQuadLire(true, 2)),
  gabaritAire("aire_carre_tpl_e2_grille", "aire_surface", "aire_carre", 2, "Rangées × carreaux par rangée.", () => genQuadGrille(true, 2)),
  gabaritAire("aire_carre_tpl_e2_deuxpas", "aire_surface", "aire_carre", 2, "Trouve d’abord le côté.", genCarreDeuxPas),

  gabaritAire("aire_comparer_tpl_e1_signe", "aire_surface", "aire_comparer", 1, "Même unité : compare les nombres.", genComparerSigne),
  gabaritAire("aire_comparer_tpl_e1_liste", "aire_surface", "aire_comparer", 1, "Même unité : compare les nombres.", () => genComparerListe(3)),
  gabaritAire("aire_comparer_tpl_e1_figures", "aire_surface", "aire_comparer", 1, "Compte les carreaux de chaque figure.", genComparerFigures),
  gabaritAire("aire_comparer_tpl_e1_simple", "aire_surface", "aire_comparer", 1, "Plus de carreaux, plus d’aire.", genComparerSimple),
  gabaritAire("aire_comparer_tpl_e2_figures", "aire_surface", "aire_comparer", 2, "Compte les carreaux de chaque rectangle.", genComparerFiguresRect),
  gabaritAire("aire_comparer_tpl_e2_calcule", "aire_surface", "aire_comparer", 2, "Calcule les deux aires, puis compare.", genComparerCalcule2),
  gabaritAire("aire_comparer_tpl_e2_unites", "aire_surface", "aire_comparer", 2, "Écris tout dans la même unité.", genComparerUnites2),
  gabaritAire("aire_comparer_tpl_e2_ecart", "aire_surface", "aire_comparer", 2, "L’écart, c’est une soustraction.", genComparerEcart2),

  gabaritAire("aire_probleme_tpl_e2_assembler", "aire_surface", "aire_probleme", 2, "Calcule chaque aire, puis additionne.", genProblemeAssembler),
  gabaritAire("aire_probleme_tpl_e2_reste", "aire_surface", "aire_probleme", 2, "Calcule l’aire totale, puis enlève.", genProblemeReste),
  gabaritAire("aire_probleme_tpl_e2_retrouver", "aire_surface", "aire_probleme", 2, "Pars de l’aire : quel nombre manque dans la multiplication ?", genProblemeRetrouver),
  gabaritAire("aire_probleme_tpl_e2_carreaux", "aire_surface", "aire_probleme", 2, "Calcule l’aire, puis divise par l’aire d’un carreau.", genProblemeCarreaux),
  gabaritAire("aire_probleme_tpl_e2_modifier", "aire_surface", "aire_probleme", 2, "Écris les nouveaux côtés, puis multiplie.", genProblemeModifier),
];

