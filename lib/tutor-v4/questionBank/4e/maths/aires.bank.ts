/**
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Aires
 *
 * Objectifs :
 * - comprendre qu’une aire mesure une surface ;
 * - distinguer aire et périmètre ;
 * - utiliser les unités carrées ;
 * - calculer l’aire d’un rectangle, d’un carré, d’un triangle et d’un parallélogramme ;
 * - calculer l’aire d’une figure composée ;
 * - résoudre des problèmes concrets d’aires ;
 * - éviter les erreurs fréquentes : utiliser le côté incliné au lieu de la hauteur, confondre aire et périmètre.
 *
 * Organisation :
 * - fixed : ancrage des définitions et formules essentielles ;
 * - templates : variation des longueurs, figures et contextes ;
 * - canvas : figures géométriques et figures sur quadrillage ;
 * - open : justification et verbalisation du raisonnement.
 *
 * ⛔⛔ 03/10/2026 — « DES QUESTIONS REVIENNENT SOUVENT » (mesure du 30/09 :
 * 8 à 22 squelettes d’énoncé par micro, 8 à 18 répétitions sur une série de 20).
 * Chaque gabarit compose désormais une SITUATION (tables d’objets réels :
 * pelouse, parquet, voile, panneau solaire, pizza, champ, mur à peindre…) × une
 * TOURNURE (4 à 6 façons de poser la même question), avec des unités variées
 * (mm², cm², m², ares, ha, km²). Les figures (canvas) sont dessinées À
 * L’ÉCHELLE des nombres de l’énoncé, avec des noms de points variés ; un côté
 * oblique affiché vient d’un triplet entier (3-4-5, 5-12-13…), donc il est juste.
 * Mesure : npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 4e aire_surface
 */
import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type {
  CercleCanvasData,
  FigureLibreCanvasData,
  QuadrilatereCanvasData,
  TriangleCanvasData,
} from "@/lib/tutor-v4/types_canvas";

type Q = TutorGeneratedQuestionV4;

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/* ---------------------------------------------------------------------------
   Nombres et unités
--------------------------------------------------------------------------- */

const arrondi = (x: number) => Math.round(x * 1000) / 1000;

/** Nombre en LaTeX à la française : 10\,000 ; 12{,}5. */
function tx(n: number): string {
  const v = arrondi(n);
  const [ent, dec] = String(Math.abs(v)).split(".");
  const groupes = ent.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
  return (v < 0 ? "-" : "") + groupes + (dec ? "{,}" + dec : "");
}
/** Nombre en texte brut à la française (étiquettes des figures) : 2,5. */
function fr(n: number): string {
  const v = arrondi(n);
  const [ent, dec] = String(Math.abs(v)).split(".");
  return (v < 0 ? "-" : "") + ent.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (dec ? "," + dec : "");
}
const N = (n: number) => `$${tx(n)}$`;
/** Unité d’aire : « $\text{cm}^2$ », ou « ha », « ares », « unités² ». */
function U2(u: string): string {
  if (u === "unités") return "unités²";
  if (u === "ha" || u === "ares") return u;
  return `$\\text{${u}}^2$`;
}
const lg = (x: number, u: string) => `${N(x)} ${u}`;
const ar = (x: number, u: string) => `${N(x)} ${U2(u)}`;
const ans = (x: number) => String(arrondi(x));
/** « de » + unité, avec élision : « d’ares », « de $\text{m}^2$ ». */
const deU = (s: string) => (/^[aeiouy]/i.test(s) ? "d’" + s : "de " + s);

type R = [number, number, number];
/** Tire une valeur dans [min ; max] par pas. */
function pick(r: R): number {
  const n = Math.round((r[1] - r[0]) / r[2]);
  return arrondi(r[0] + r[2] * randomInt(0, n));
}

/* ---------------------------------------------------------------------------
   Petite grammaire : un objet est un nom avec son genre (f) et une voyelle
   initiale (v) pour les élisions.
--------------------------------------------------------------------------- */
type Nom = { n: string; f?: boolean; v?: boolean };
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const un = (o: Nom) => (o.f ? "une " : "un ") + o.n;
const dUn = (o: Nom) => (o.f ? "d’une " : "d’un ") + o.n;
const le = (o: Nom) => (o.v ? "l’" : o.f ? "la " : "le ") + o.n;
const duN = (o: Nom) => (o.v ? "de l’" : o.f ? "de la " : "du ") + o.n;
const ce = (o: Nom) => (o.f ? "cette " : o.v ? "cet " : "ce ") + o.n;
const son = (o: Nom) => (o.f && !o.v ? "sa " : "son ") + o.n;
const ilN = (o: Nom) => (o.f ? "elle" : "il");
/** « de » devant un groupe nominal écrit avec son article : « du capteur », « d’une forêt ». */
function deGN(gn: string): string {
  if (gn.startsWith("le ")) return "du " + gn.slice(3);
  if (gn.startsWith("les ")) return "des " + gn.slice(4);
  if (/^(un|une) /.test(gn)) return "d’" + gn;
  return "de " + gn;
}
/** « de Lucas », « d’Inès ». */
const dePrenom = (p: string) => (/^[AEIOUÉ]/.test(p) ? "d’" + p : "de " + p);
const eF = (o: Nom) => (o.f ? "e" : "");

const PRENOMS: readonly [string, "il" | "elle"][] = [
  ["Léa", "elle"], ["Hugo", "il"], ["Inès", "elle"], ["Nathan", "il"],
  ["Chloé", "elle"], ["Yanis", "il"], ["Manon", "elle"], ["Lucas", "il"],
  ["Sarah", "elle"], ["Tom", "il"], ["Jade", "elle"], ["Adam", "il"],
];

const NOMS4 = ["ABCD", "EFGH", "KLMN", "RSTU", "MNPQ", "IJKL", "PQRS", "WXYZ"] as const;
const NOMS3 = ["ABC", "EFG", "RST", "KLM", "IJK", "DEF", "MNP", "XYZ", "UVW"] as const;

// Triplets entiers (décalage du pied de la hauteur, hauteur, côté oblique) :
// un côté oblique AFFICHÉ sur une figure doit être juste.
const TRIPLETS: readonly [number, number, number][] = [
  [3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13],
  [9, 12, 15], [12, 9, 15], [8, 15, 17], [15, 8, 17],
];
/**
 * Un triplet dont la hauteur ne dépasse pas `hMax` (un pignon de 12 m n’est pas
 * plausible) et, si possible, peu penché (décalage ≤ hauteur : pas de fanion de
 * 25 cm de haut avec un côté de 65 cm).
 */
function tripletPour(hMax: number): [number, number, number] {
  const bas = TRIPLETS.filter((t) => t[1] <= hMax);
  const droits = bas.filter((t) => t[0] <= t[1]);
  return randomChoice(droits.length ? droits : bas.length ? bas : TRIPLETS);
}

/* ---------------------------------------------------------------------------
   Quadrillages
--------------------------------------------------------------------------- */
type GridCell = [row: number, col: number];

function rectangleCells(height: number, width: number): GridCell[] {
  const cells: GridCell[] = [];
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      cells.push([r, c]);
    }
  }
  return cells;
}

function lShapeCells(a: number, b: number, cutW: number, cutH: number): GridCell[] {
  const cells: GridCell[] = [];
  for (let r = 0; r < a; r++) {
    for (let c = 0; c < b; c++) {
      const inCut = r >= a - cutH && c >= b - cutW;
      if (!inCut) cells.push([r, c]);
    }
  }
  return cells;
}

function figureLibreFromCells(
  rows: number,
  cols: number,
  filledCells: GridCell[],
  showPerimeter = false
): FigureLibreCanvasData {
  return {
    kind: "figure_libre" as const,
    grid: {
      rows,
      cols,
      filledCells,
    },
    display: {
      showGrid: true,
      showFilled: true,
      showCellLabels: false,
      showPerimeter,
      showVertices: false,
      showVertexLabels: false,
    },
    colors: {
      filled: "#dbeafe",
      grid: "#cbd5e1",
      border: "#0f172a",
      perimeter: "#dc2626",
    },
    size: {
      cellSize: 28,
      padding: 16,
      width: cols * 28 + 32,
      height: rows * 28 + 32,
    },
  };
}

type Forme = { rows: number; cols: number; cells: GridCell[]; dUne: string; deForme: string };

/** Une forme sur quadrillage (au plus 5 lignes et 7 colonnes : lisible à 375 px). */
function formeGrille(sortes: readonly string[]): Forme {
  const sorte = randomChoice(sortes);
  if (sorte === "L") {
    const a = randomInt(3, 5), b = randomInt(3, 6);
    const cells = lShapeCells(a, b, randomInt(1, b - 2), randomInt(1, a - 2));
    return { rows: a, cols: b, cells, dUne: "d’un L", deForme: "de L" };
  }
  if (sorte === "T") {
    const c = randomChoice([5, 7]), barre = randomInt(1, 2), pied = randomChoice([1, 3]), r = randomInt(4, 5);
    const g = (c - pied) / 2;
    const cells: GridCell[] = [];
    for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) if (i < barre || (j >= g && j < g + pied)) cells.push([i, j]);
    return { rows: r, cols: c, cells, dUne: "d’un T", deForme: "de T" };
  }
  if (sorte === "U") {
    const r = randomInt(3, 5), c = randomInt(4, 7), cw = randomInt(1, c - 2), cd = randomInt(1, r - 1);
    const m = Math.floor((c - cw) / 2);
    const cells: GridCell[] = [];
    for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) if (!(i < cd && j >= m && j < m + cw)) cells.push([i, j]);
    return { rows: r, cols: c, cells, dUne: "d’un U", deForme: "de U" };
  }
  if (sorte === "croix") {
    const n = randomChoice([3, 5]), t = n === 5 ? randomChoice([1, 3]) : 1;
    const g = (n - t) / 2;
    const cells: GridCell[] = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if ((i >= g && i < g + t) || (j >= g && j < g + t)) cells.push([i, j]);
    return { rows: n, cols: n, cells, dUne: "d’une croix", deForme: "de croix" };
  }
  if (sorte === "escalier") {
    const k = randomInt(3, 5);
    const cells: GridCell[] = [];
    for (let i = 0; i < k; i++) for (let j = 0; j <= i; j++) cells.push([i, j]);
    return { rows: k, cols: k, cells, dUne: "d’un escalier", deForme: "d’escalier" };
  }
  if (sorte === "cadre") {
    const r = randomInt(4, 5), c = randomInt(5, 7);
    const cells: GridCell[] = [];
    for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) if (i === 0 || j === 0 || i === r - 1 || j === c - 1) cells.push([i, j]);
    return { rows: r, cols: c, cells, dUne: "d’un cadre", deForme: "de cadre" };
  }
  const r = randomInt(2, 4), c = randomInt(3, 6);
  return { rows: r, cols: c, cells: rectangleCells(r, c), dUne: "d’un rectangle", deForme: "de rectangle" };
}

/* ---------------------------------------------------------------------------
   Figures dessinées À L’ÉCHELLE des nombres de l’énoncé
--------------------------------------------------------------------------- */

/** Rectangle (ou carré) ABCD, A en haut à gauche ; étiquettes avec unité. */
function rectCanvas(L: number, l: number, u: string, nom: string, carre = false): QuadrilatereCanvasData {
  const ratio = Math.min(Math.max(L, l) / Math.min(L, l), 3);
  const grand = Math.min(210, 130 * ratio);
  const petit = grand / ratio;
  const w = L >= l ? grand : petit;
  const h = L >= l ? petit : grand;
  const x0 = 50, y0 = 40;
  return {
    kind: "quadrilatere",
    points: {
      A: { x: x0, y: y0 },
      B: { x: x0 + w, y: y0 },
      C: { x: x0 + w, y: y0 + h },
      D: { x: x0, y: y0 + h },
    },
    labels: { A: nom[0], B: nom[1], C: nom[2], D: nom[3] },
    sideLabels: carre ? { AB: `${fr(L)} ${u}` } : { AB: `${fr(L)} ${u}`, BC: `${fr(l)} ${u}` },
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: false, showDiagonals: false },
    marks: carre
      ? { rightAnglesAt: ["A", "B", "C", "D"], equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]] }
      : { rightAnglesAt: ["A", "B", "C", "D"] },
    size: { width: Math.round(w + 100), height: Math.round(h + 80) },
  };
}

/** Parallélogramme ABCD de base AB = b, hauteur h, D décalé de `dec` : DA = côté oblique. */
function paraCanvas(b: number, h: number, dec: number, oblique: number | null, u: string, nom: string): QuadrilatereCanvasData {
  const span = b + dec;
  const k = Math.min(220 / span, 130 / h);
  const x0 = 40, yb = 40 + h * k;
  return {
    kind: "quadrilatere",
    points: {
      A: { x: x0, y: yb },
      B: { x: x0 + b * k, y: yb },
      C: { x: x0 + (b + dec) * k, y: 40 },
      D: { x: x0 + dec * k, y: 40 },
    },
    labels: { A: nom[0], B: nom[1], C: nom[2], D: nom[3] },
    sideLabels: oblique ? { AB: `${fr(b)} ${u}`, DA: `${fr(oblique)} ${u}` } : { AB: `${fr(b)} ${u}` },
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: false, showDiagonals: false },
    marks: { parallelSides: [["AB", "CD"], ["BC", "DA"]] },
    height: { fromVertex: "D", onSide: "AB", label: `${fr(h)} ${u}` },
    size: { width: Math.round(span * k + 80), height: Math.round(h * k + 80) },
  };
}

/** Trapèze rectangle ABCD : grande base AB = B, petite base DC = b, hauteur DA = h. */
function trapezeCanvas(B: number, b: number, h: number, u: string, nom: string): QuadrilatereCanvasData {
  const k = Math.min(220 / B, 130 / h);
  const x0 = 40, yb = 40 + h * k;
  return {
    kind: "quadrilatere",
    points: {
      A: { x: x0, y: yb },
      B: { x: x0 + B * k, y: yb },
      C: { x: x0 + b * k, y: 40 },
      D: { x: x0, y: 40 },
    },
    labels: { A: nom[0], B: nom[1], C: nom[2], D: nom[3] },
    sideLabels: { AB: `${fr(B)} ${u}`, CD: `${fr(b)} ${u}`, DA: `${fr(h)} ${u}` },
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: false, showDiagonals: false },
    marks: { rightAnglesAt: ["A", "D"], parallelSides: [["AB", "CD"]] },
    size: { width: Math.round(B * k + 80), height: Math.round(h * k + 80) },
  };
}

/**
 * Triangle ABC de base AB = b ; C est à la hauteur h, au-dessus du point
 * d’abscisse `dec` (dec < 0 ou dec > b : pied de la hauteur HORS de [AB]).
 * `droit` : angle droit en A (dec = 0) ou en B (dec = b), sans hauteur tracée.
 */
function triCanvas(
  b: number,
  h: number,
  dec: number,
  u: string,
  nom: string,
  opts: { oblique?: number; droit?: "A" | "B"; hyp?: number } = {}
): TriangleCanvasData {
  const minx = Math.min(0, dec), maxx = Math.max(b, dec);
  const k = Math.min(210 / (maxx - minx), 130 / h);
  const X = (x: number) => 40 + (x - minx) * k;
  const yb = 40 + h * k;
  const sideLabels: Partial<Record<"AB" | "BC" | "CA", string>> = { AB: `${fr(b)} ${u}` };
  if (opts.droit === "A") {
    sideLabels.CA = `${fr(h)} ${u}`;
    if (opts.hyp) sideLabels.BC = `${fr(opts.hyp)} ${u}`;
  } else if (opts.droit === "B") {
    sideLabels.BC = `${fr(h)} ${u}`;
    if (opts.hyp) sideLabels.CA = `${fr(opts.hyp)} ${u}`;
  } else if (opts.oblique) {
    sideLabels.CA = `${fr(opts.oblique)} ${u}`;
  }
  return {
    kind: "triangle",
    points: { A: { x: X(0), y: yb }, B: { x: X(b), y: yb }, C: { x: X(dec), y: 40 } },
    labels: { A: nom[0], B: nom[1], C: nom[2] },
    sideLabels,
    angleLabels: {},
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
    ...(opts.droit
      ? { marks: { rightAngleAt: opts.droit } }
      : { height: { fromVertex: "C" as const, label: `${fr(h)} ${u}` } }),
    size: { width: Math.round((maxx - minx) * k + 80), height: Math.round(h * k + 80) },
  };
}

/** Disque de centre O, rayon [OA] ou diamètre [BA] marqué. */
function disqueCanvas(r: number, u: string, diametre: boolean): CercleCanvasData {
  return {
    kind: "cercle",
    size: { width: 260, height: 220 },
    circle: { cx: 130, cy: 110, r: 80, showCircle: true, showDisk: true },
    points: [
      { id: "O", x: 130, y: 110, label: "O" },
      { id: "A", x: 210, y: 110, label: "A" },
      ...(diametre ? [{ id: "B", x: 50, y: 110, label: "B" }] : []),
    ],
    segments: [
      diametre
        ? { id: "d", kind: "diametre", from: "B", to: "A", label: `${fr(2 * r)} ${u}` }
        : { id: "r", kind: "rayon", from: "O", to: "A", label: `${fr(r)} ${u}` },
    ],
    display: { showLabels: true, showPoints: true, showCenter: true, showDisk: true, showRadius: !diametre, showDiameter: diametre },
  };
}

/* ===========================================================================
   AIRE_COMPRENDRE
=========================================================================== */

const QUADRILLAGES: readonly Nom[] = [
  { n: "carrelage" }, { n: "mosaïque", f: true }, { n: "potager en carrés" },
  { n: "damier" }, { n: "plan de terrasse" }, { n: "plaque de chocolat", f: true },
  { n: "dessin en pixels" }, { n: "grille de mots croisés", f: true }, { n: "tapis de jeu" },
  { n: "panneau de Post-it" }, { n: "dallage de cour" }, { n: "fresque en carreaux", f: true },
  { n: "motif de broderie" }, { n: "vitrail en carrés" },
];

/** ★1 — compter les carreaux : l’AIRE ou le PÉRIMÈTRE, selon la consigne. */
function genAireOuPerimetreGrille(): Q {
  const h = randomInt(2, 4), w = randomInt(2, 5);
  const cells = rectangleCells(h, w);
  const o = randomChoice(QUADRILLAGES);
  const perimetre = 2 * (h + w);
  const canvas = figureLibreFromCells(h, w, cells, false);
  if (Math.random() < 0.6) {
    return {
      text: randomChoice([
        `${cap(un(o))} est formé${eF(o)} de petits carrés de $1$ unité de côté. Quelle est son AIRE, en unités² ?`,
        `Quelle est l’aire ${duN(o)} ci-contre, en unités² ? Chaque petit carré mesure $1$ unité de côté.`,
        `Chaque carreau ${duN(o)} ci-contre mesure $1$ unité de côté. Combien d’unités² couvre-t-${ilN(o)} ?`,
        `On veut connaître la surface ${duN(o)} dessiné${eF(o)} ci-contre. Chaque petit carré vaut $1$ unité². Quelle est cette aire ?`,
      ]),
      format: "short",
      expected: [String(cells.length)],
      comparator: "number_equal",
      explanation:
        "Définition : l'aire est le nombre de carrés unité qui recouvrent la surface.\n\n" +
        "Méthode : on compte les carrés — ou, pour un rectangle, on multiplie les deux côtés.\n\n" +
        `Calcul : $${w} \\times ${h} = ${cells.length}$ carrés.\n\n` +
        `Conclusion : l'aire vaut $${cells.length}$ unités². ⚠️ À ne pas confondre avec le PÉRIMÈTRE, qui vaut ici $${perimetre}$ unités : l'un mesure la surface, l'autre le tour.`,
      canvas,
    };
  }
  return {
    text: randomChoice([
      `${cap(un(o))} est formé${eF(o)} de petits carrés de $1$ unité de côté. Quel est son PÉRIMÈTRE, en unités ?`,
      `On fait le tour ${duN(o)} ci-contre en suivant son bord. Chaque petit carré mesure $1$ unité de côté. Quelle est la longueur de ce tour, en unités ?`,
      `Chaque carreau ${duN(o)} ci-contre mesure $1$ unité de côté. Quelle longueur de ruban faut-il pour en faire exactement le tour, en unités ?`,
      `Quel est le périmètre ${duN(o)} ci-contre, en unités, si le côté d’un carreau mesure $1$ unité ?`,
    ]),
    format: "short",
    expected: [String(perimetre)],
    comparator: "number_equal",
    explanation:
      "Définition : le périmètre est la longueur du TOUR de la figure, pas la surface qu'elle couvre.\n\n" +
      "Méthode : on fait le tour en comptant les côtés des carrés du bord — ou, pour un rectangle, on ajoute la longueur et la largeur, puis on double.\n\n" +
      `Calcul : $(${w} + ${h}) \\times 2 = ${perimetre}$ unités.\n\n` +
      `Conclusion : le périmètre vaut $${perimetre}$ unités. ⚠️ L'aire, elle, vaut $${cells.length}$ unités². ⭐ Deux figures peuvent avoir le même périmètre et des aires très différentes — c'est ce qui prouve que ce sont deux grandeurs distinctes.`,
    canvas,
  };
}

const SITUATIONS_GRANDEUR: readonly [string, "l’aire" | "le périmètre"][] = [
  ["semer du gazon sur une pelouse", "l’aire"],
  ["acheter de la moquette pour une chambre", "l’aire"],
  ["peindre un mur", "l’aire"],
  ["carreler le sol d’une cuisine", "l’aire"],
  ["couvrir une table avec une nappe", "l’aire"],
  ["recouvrir un livre de papier", "l’aire"],
  ["poser des panneaux solaires sur un toit", "l’aire"],
  ["acheter la toile d’une voile", "l’aire"],
  ["vernir un parquet", "l’aire"],
  ["étaler du paillis sur un massif", "l’aire"],
  ["coller du papier peint dans un salon", "l’aire"],
  ["bâcher une piscine", "l’aire"],
  ["poser une clôture autour d’un champ", "le périmètre"],
  ["coller une frise tout autour d’une chambre", "le périmètre"],
  ["poser des plinthes au bas des murs d’un salon", "le périmètre"],
  ["savoir quelle distance on parcourt en faisant le tour d’un stade", "le périmètre"],
  ["border un massif de petits pavés", "le périmètre"],
  ["entourer un cadeau d’un ruban", "le périmètre"],
  ["accrocher une guirlande autour d’une fenêtre", "le périmètre"],
  ["installer un grillage autour d’un potager", "le périmètre"],
  ["coudre un galon sur le bord d’une nappe", "le périmètre"],
  ["poser un joint tout autour d’une vitre", "le périmètre"],
];

/** ★1 — aire ou périmètre ? Des situations réelles. */
function genAireOuPerimetreSituation(): Q {
  const [s, correct] = randomChoice(SITUATIONS_GRANDEUR);
  const [p, pr] = randomChoice(PRENOMS);
  return {
    text: randomChoice([
      `Pour ${s}, quelle grandeur faut-il calculer ?`,
      `${p} veut ${s}. Quelle grandeur doit-${pr} calculer ?`,
      `On cherche à ${s}. De quelle mesure a-t-on besoin ?`,
      `Quelle mesure est utile pour ${s} ?`,
    ]),
    format: "qcm",
    choices: makeChoices(correct, ["l’aire", "le périmètre", "le volume", "la longueur de la diagonale", "la masse"]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation:
      "Définition : l’aire mesure une SURFACE (ce qu’on recouvre) ; le périmètre mesure un TOUR (ce qu’on entoure).\n\n" +
      `Méthode : on se demande si l’on recouvre une surface ou si l’on suit un bord.\n\n` +
      `Calcul : pour ${s}, ${correct === "l’aire" ? "on recouvre une surface" : "on suit le bord"}.\n\n` +
      `Conclusion : il faut calculer ${correct}.`,
  };
}

const UNITES_OBJETS: readonly { quoi: string; u: string; exclus: string[] }[] = [
  { quoi: "l’écran d’un téléphone", u: "cm²", exclus: ["mm²"] },
  { quoi: "une forêt", u: "ha", exclus: ["km²"] },
  { quoi: "un pays", u: "km²", exclus: ["ha"] },
  { quoi: "le sol d’une salle de classe", u: "m²", exclus: [] },
  { quoi: "une feuille de cahier", u: "cm²", exclus: [] },
  { quoi: "un terrain de football", u: "m²", exclus: ["ha"] },
  { quoi: "un champ de blé", u: "ha", exclus: ["m²", "km²"] },
  { quoi: "une puce électronique", u: "mm²", exclus: [] },
  { quoi: "un timbre-poste", u: "cm²", exclus: ["mm²"] },
  { quoi: "une île comme la Corse", u: "km²", exclus: [] },
  { quoi: "un grand lac", u: "km²", exclus: ["ha"] },
  { quoi: "une pelouse de jardin", u: "m²", exclus: [] },
  { quoi: "une carte bancaire", u: "cm²", exclus: ["mm²"] },
  { quoi: "un parc national", u: "km²", exclus: ["ha"] },
  { quoi: "un appartement", u: "m²", exclus: [] },
  { quoi: "une touche de clavier", u: "cm²", exclus: ["mm²"] },
  { quoi: "une vigne", u: "ha", exclus: ["m²", "km²"] },
  { quoi: "un mur à peindre", u: "m²", exclus: [] },
  { quoi: "le capteur d’un appareil photo", u: "mm²", exclus: ["cm²"] },
  { quoi: "une grande ville", u: "km²", exclus: ["ha"] },
];

/** ★2 — quelle unité d’aire convient ? */
function genUniteAdaptee(): Q {
  const o = randomChoice(UNITES_OBJETS);
  const [p, pr] = randomChoice(PRENOMS);
  const leurres = ["mm²", "cm²", "m²", "ha", "km²", "cm", "m", "m³"].filter((x) => x !== o.u && !o.exclus.includes(x));
  return {
    text: randomChoice([
      `Quelle unité choisir pour exprimer l’aire ${deGN(o.quoi)} ?`,
      `Pour donner la surface ${deGN(o.quoi)}, on utilise plutôt…`,
      `Laquelle de ces unités convient le mieux pour mesurer l’aire ${deGN(o.quoi)} ?`,
      `${p} veut indiquer la surface ${deGN(o.quoi)}. Quelle unité doit-${pr} choisir ?`,
    ]),
    format: "qcm",
    choices: makeChoices(o.u, leurres),
    expected: [o.u],
    comparator: "mcq_exact",
    explanation:
      "Définition : une aire s’exprime avec une unité CARRÉE (mm², cm², m², km²) ou agraire (are, hectare) — jamais en cm, m ou m³.\n\n" +
      "Méthode : on choisit l’unité qui donne un nombre raisonnable : mm² pour le minuscule, cm² pour un objet qu’on tient, m² pour une pièce ou un jardin, ha pour un champ, km² pour un territoire.\n\n" +
      `Calcul : pour l’aire ${deGN(o.quoi)}, c’est le ${o.u}.\n\n` +
      `Conclusion : on choisit le ${o.u}.`,
  };
}

const CONVERSIONS: readonly { de: string; vers: string; f: number; pourquoi: string }[] = [
  { de: "m", vers: "cm", f: 10000, pourquoi: "$1$ m $= 100$ cm, donc $1\\ \\text{m}^2 = 100 \\times 100 = 10\\,000\\ \\text{cm}^2$" },
  { de: "m", vers: "dm", f: 100, pourquoi: "$1$ m $= 10$ dm, donc $1\\ \\text{m}^2 = 10 \\times 10 = 100\\ \\text{dm}^2$" },
  { de: "dm", vers: "cm", f: 100, pourquoi: "$1$ dm $= 10$ cm, donc $1\\ \\text{dm}^2 = 100\\ \\text{cm}^2$" },
  { de: "cm", vers: "mm", f: 100, pourquoi: "$1$ cm $= 10$ mm, donc $1\\ \\text{cm}^2 = 100\\ \\text{mm}^2$" },
  { de: "ha", vers: "m", f: 10000, pourquoi: "$1$ ha est l’aire d’un carré de $100$ m de côté : $100 \\times 100 = 10\\,000\\ \\text{m}^2$" },
  { de: "km", vers: "ha", f: 100, pourquoi: "$1\\ \\text{km}^2 = 1\\,000\\,000\\ \\text{m}^2$ et $1$ ha $= 10\\,000\\ \\text{m}^2$, donc $1\\ \\text{km}^2 = 100$ ha" },
  { de: "ha", vers: "ares", f: 100, pourquoi: "$1$ ha $= 100$ ares" },
  { de: "ares", vers: "m", f: 100, pourquoi: "$1$ are est l’aire d’un carré de $10$ m de côté : $1$ are $= 100\\ \\text{m}^2$" },
];

/** ★2 — conversions d’unités d’aire, dans les deux sens. */
function genConversionAire(): Q {
  const c = randomChoice(CONVERSIONS);
  const monte = Math.random() < 0.5;
  const v = randomChoice([2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 1.5, 2.5]);
  const depart = monte ? v : v * c.f;
  const arrivee = monte ? v * c.f : v;
  const ud = monte ? U2(c.de) : U2(c.vers);
  const ua = monte ? U2(c.vers) : U2(c.de);
  return {
    text: randomChoice([
      `Convertis ${N(depart)} ${ud} en ${ua}.`,
      `Combien ${deU(ua)} y a-t-il dans ${N(depart)} ${ud} ?`,
      `Complète : ${N(depart)} ${ud} $=$ … ${ua}.`,
      `Une surface mesure ${N(depart)} ${ud}. Exprime-la en ${ua}.`,
      `Exprime en ${ua} une aire de ${N(depart)} ${ud}.`,
    ]),
    format: "short",
    expected: [ans(arrivee)],
    comparator: "number_equal",
    explanation:
      "Définition : une unité d’aire est l’aire d’un carré ; quand le côté est multiplié par $10$, l’aire est multipliée par $100$.\n\n" +
      `Méthode : ${c.pourquoi}.\n\n` +
      `Calcul : ${monte ? `$${tx(depart)} \\times ${tx(c.f)} = ${tx(arrivee)}$` : `$${tx(depart)} \\div ${tx(c.f)} = ${tx(arrivee)}$`}.\n\n` +
      `Conclusion : ${N(depart)} ${ud} $=$ ${N(arrivee)} ${ua}.`,
  };
}

const PAIRES_PLURIEL: readonly { pl: string; f?: boolean; u: string; k: number }[] = [
  { pl: "enclos", u: "m", k: 1 }, { pl: "potagers", u: "m", k: 1 }, { pl: "terrasses", f: true, u: "m", k: 1 },
  { pl: "parcelles", f: true, u: "m", k: 1 }, { pl: "massifs de fleurs", u: "m", k: 1 }, { pl: "bassins", u: "m", k: 1 },
  { pl: "jardins", u: "m", k: 1 }, { pl: "cours", f: true, u: "m", k: 1 }, { pl: "nappes", f: true, u: "cm", k: 10 },
  { pl: "tapis", u: "cm", k: 10 }, { pl: "affiches", f: true, u: "cm", k: 10 }, { pl: "cadres", u: "cm", k: 10 },
  { pl: "photos", f: true, u: "cm", k: 1 }, { pl: "plaques de liège", f: true, u: "cm", k: 10 },
];

/** ★3 — même périmètre, aires différentes. */
function genMemePerimetre(): Q {
  const o = randomChoice(PAIRES_PLURIEL);
  const somme = randomInt(9, 14);
  // Pas de côté 1 : une affiche de 10 cm sur 110 cm n’est pas plausible.
  const a1 = randomInt(2, Math.floor(somme / 2) - 1);
  let a2 = randomInt(2, Math.floor(somme / 2));
  while (a2 === a1) a2 = randomInt(2, Math.floor(somme / 2));
  const k = o.k;
  const [x1, y1, x2, y2] = [a1 * k, (somme - a1) * k, a2 * k, (somme - a2) * k];
  const aire1 = x1 * y1, aire2 = x2 * y2, P = 2 * somme * k;
  const prem = o.f ? "la première" : "le premier";
  const sec = o.f ? "la seconde" : "le second";
  const ils = o.f ? "elles" : "ils";
  const choixPrem = `${prem} a la plus grande aire`;
  const choixSec = `${sec} a la plus grande aire`;
  const choixEg = `${ils} ont la même aire`;
  const correct = aire1 === aire2 ? choixEg : aire1 > aire2 ? choixPrem : choixSec;
  const [p] = randomChoice(PRENOMS);
  const u = o.u;
  return {
    text: randomChoice([
      `Deux ${o.pl} rectangulaires ont le MÊME périmètre, ${lg(P, u)}. ${cap(prem)} mesure ${lg(x1, u)} sur ${lg(y1, u)}, ${sec} ${lg(x2, u)} sur ${lg(y2, u)}. Que peut-on dire de leurs aires ?`,
      `${p} compare deux ${o.pl} rectangulaires de même périmètre : ${lg(x1, u)} × ${lg(y1, u)}, puis ${lg(x2, u)} × ${lg(y2, u)}. Quelle phrase est vraie ?`,
      `Même tour, même aire ? Deux ${o.pl} rectangulaires mesurent ${lg(x1, u)} sur ${lg(y1, u)} et ${lg(x2, u)} sur ${lg(y2, u)} : leur périmètre commun vaut ${lg(P, u)}. Compare leurs aires.`,
    ]),
    format: "qcm",
    choices: makeChoices(correct, [choixEg, choixPrem, choixSec, "on ne peut pas comparer sans les dessiner"]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation:
      "Définition : le PÉRIMÈTRE mesure le tour, l'AIRE mesure la surface. Ce sont deux grandeurs indépendantes.\n\n" +
      "Méthode : on calcule les deux aires et on compare — le périmètre commun ne dit rien sur elles.\n\n" +
      `Calcul : $${tx(x1)} \\times ${tx(y1)} = ${tx(aire1)}$ et $${tx(x2)} \\times ${tx(y2)} = ${tx(aire2)}$ (en ${U2(u)}).\n\n` +
      (aire1 === aire2
        ? "Conclusion : ici les aires sont égales, mais c'est un hasard des dimensions choisies — pas une conséquence du périmètre commun."
        : `Conclusion : ⭐ même tour, aires différentes : ${correct}. Plus un rectangle est allongé, plus son aire est petite à périmètre égal.`),
    canvas: {
      kind: "tableau_donnees",
      headers: ["rectangle", "périmètre", "aire"],
      rows: [
        { values: [`${fr(x1)} × ${fr(y1)}`, fr(P), fr(aire1)] },
        { values: [`${fr(x2)} × ${fr(y2)}`, fr(P), fr(aire2)] },
      ],
      highlight: { col: 2 },
      caption: "même tour, aires différentes ?",
      display: { compact: true, striped: true },
    },
  };
}

const OBJETS_AGRANDIS: readonly Nom[] = [
  { n: "photo", f: true }, { n: "plan d’appartement" }, { n: "logo" }, { n: "drapeau" },
  { n: "affiche", f: true, v: true }, { n: "timbre" }, { n: "carte postale", f: true },
  { n: "dessin" }, { n: "pochoir" }, { n: "schéma" }, { n: "motif de tissu" },
  { n: "vitrail" }, { n: "panneau" }, { n: "tapis" },
];

/** ★3 — longueurs × k ⇒ aire × k². */
function genAgrandissementConcept(): Q {
  const o = randomChoice(OBJETS_AGRANDIS);
  const k = randomChoice([2, 3, 4, 5, 10]);
  const [p] = randomChoice(PRENOMS);
  const correct = `$${k * k}$`;
  return {
    text: randomChoice([
      `On agrandit ${un(o)} en multipliant toutes ses longueurs par ${N(k)}. Par combien son aire est-elle multipliée ?`,
      `${p} agrandit ${un(o)} à la photocopieuse : chaque longueur est multipliée par ${N(k)}. Son aire est alors multipliée par…`,
      `Toutes les dimensions ${dUn(o)} sont multipliées par ${N(k)}. Par quel nombre son aire est-elle multipliée ?`,
      `${cap(un(o))} est reproduit${eF(o)} ${N(k)} fois plus grand${eF(o)}, toutes longueurs comprises. Par combien sa surface est-elle multipliée ?`,
    ]),
    format: "qcm",
    choices: makeChoices(correct, [`$${k}$`, `$${2 * k}$`, `$${k * k * k}$`, `$${k * k + k}$`]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation:
      "Définition : une aire se calcule en multipliant DEUX longueurs.\n\n" +
      `Méthode : si chaque longueur est multipliée par $${k}$, l’aire est multipliée par $${k} \\times ${k}$.\n\n` +
      `Calcul : $${k} \\times ${k} = ${k * k}$.\n\n` +
      `Conclusion : l’aire ${duN(o)} est multipliée par $${k * k}$, pas par $${k}$.`,
  };
}

/* ===========================================================================
   AIRE_RECTANGLE
=========================================================================== */

type ObjR = Nom & { u: string; L: R; l: R };
const RECT_OBJETS: readonly ObjR[] = [
  { n: "pelouse", f: true, u: "m", L: [10, 30, 1], l: [5, 9, 1] },
  { n: "chambre", f: true, u: "m", L: [4, 6, 1], l: [2, 3, 1] },
  { n: "tapis", u: "m", L: [3, 5, 1], l: [1, 2, 1] },
  { n: "écran", v: true, u: "cm", L: [60, 120, 10], l: [30, 50, 10] },
  { n: "tableau blanc", u: "cm", L: [150, 300, 50], l: [100, 120, 10] },
  { n: "affiche", f: true, v: true, u: "cm", L: [50, 80, 10], l: [30, 40, 10] },
  { n: "terrain de sport", u: "m", L: [40, 60, 5], l: [20, 30, 5] },
  { n: "piscine", f: true, u: "m", L: [10, 25, 5], l: [5, 8, 1] },
  { n: "potager", u: "m", L: [5, 12, 1], l: [2, 4, 1] },
  { n: "parking", u: "m", L: [30, 50, 5], l: [15, 25, 5] },
  { n: "bac à sable", u: "m", L: [3, 4, 1], l: [2, 2, 1] },
  { n: "carte postale", f: true, u: "cm", L: [14, 16, 1], l: [9, 11, 1] },
  { n: "tablette de chocolat", f: true, u: "cm", L: [15, 20, 1], l: [7, 9, 1] },
  { n: "porte", f: true, u: "cm", L: [200, 210, 10], l: [70, 90, 10] },
  { n: "terrasse", f: true, u: "m", L: [5, 10, 1], l: [3, 4, 1] },
  { n: "cour de récréation", f: true, u: "m", L: [40, 60, 10], l: [20, 30, 5] },
  { n: "champ de blé", u: "m", L: [100, 200, 20], l: [50, 80, 10] },
  { n: "tapis de yoga", u: "cm", L: [170, 180, 10], l: [60, 60, 1] },
  { n: "plateau de bureau", u: "cm", L: [100, 160, 20], l: [60, 80, 10] },
  { n: "photo", f: true, u: "cm", L: [15, 18, 3], l: [10, 13, 3] },
  { n: "champ de canne à sucre", u: "m", L: [100, 150, 10], l: [40, 60, 10] },
  { n: "panneau solaire", u: "cm", L: [160, 180, 10], l: [100, 100, 1] },
  { n: "timbre", u: "mm", L: [30, 40, 5], l: [20, 25, 5] },
  { n: "vitre", f: true, u: "cm", L: [80, 120, 10], l: [50, 70, 10] },
  { n: "parcelle", f: true, u: "m", L: [20, 40, 5], l: [10, 15, 5] },
];

/** ★2 — aire d’un rectangle réel, avec ou sans figure. */
function genRectAire(avecFigure: boolean): Q {
  const o = randomChoice(RECT_OBJETS);
  const L = pick(o.L), l = pick(o.l);
  const A = L * l;
  const u = o.u, U = U2(u);
  const [p, pr] = randomChoice(PRENOMS);
  const nom = randomChoice(NOMS4);
  const text = avecFigure
    ? randomChoice([
        `Le rectangle ${nom} représente ${un(o)}. Calcule son aire en ${U}.`,
        `Sur la figure, ${nom} est un rectangle. Quelle est son aire, en ${U} ?`,
        `Lis les dimensions du rectangle ${nom} sur la figure, puis donne son aire en ${U}.`,
        `${cap(un(o))} a la forme du rectangle ${nom} ci-contre. Quelle est son aire, en ${U} ?`,
        `Quelle surface, en ${U}, couvre le rectangle ${nom} dessiné ci-contre ?`,
      ])
    : randomChoice([
        `${cap(un(o))} rectangulaire mesure ${lg(L, u)} sur ${lg(l, u)}. Quelle est son aire, en ${U} ?`,
        `Calcule l’aire ${dUn(o)} rectangulaire de ${lg(L, u)} de long et ${lg(l, u)} de large. Donne-la en ${U}.`,
        `${p} relève les dimensions ${dUn(o)} rectangulaire : ${lg(L, u)} sur ${lg(l, u)}. Quelle aire doit-${pr} trouver, en ${U} ?`,
        `Quelle surface, en ${U}, occupe ${un(o)} rectangulaire de ${lg(l, u)} de large et ${lg(L, u)} de long ?`,
        `La longueur ${duN(o)} est de ${lg(L, u)} et sa largeur de ${lg(l, u)}. Combien de ${U} ${ce(o)} rectangulaire couvre-t-${ilN(o)} ?`,
        `${cap(un(o))} a la forme d’un rectangle : largeur ${lg(l, u)}, longueur ${lg(L, u)}. Que vaut son aire, en ${U} ?`,
      ]);
  return {
    text,
    format: "short",
    expected: [ans(A)],
    comparator: "number_equal",
    explanation:
      "Définition : l’aire d’un rectangle vaut longueur × largeur, les deux dans la même unité.\n\n" +
      `Méthode : on multiplie ${lg(L, u)} par ${lg(l, u)} ; le résultat est en ${U}.\n\n` +
      `Calcul : $${tx(L)} \\times ${tx(l)} = ${tx(A)}$.\n\n` +
      `Conclusion : l’aire vaut ${ar(A, u)}.`,
    ...(avecFigure ? { canvas: rectCanvas(L, l, u, nom) } : {}),
  };
}

type ObjMixte = Nom & { Lm: R; lcm: R };
const RECT_MIXTES: readonly ObjMixte[] = [
  { n: "étagère", f: true, v: true, Lm: [1, 2, 0.2], lcm: [20, 40, 10] },
  { n: "banc", Lm: [1.5, 2.5, 0.5], lcm: [30, 40, 10] },
  { n: "planche", f: true, Lm: [1, 3, 0.5], lcm: [20, 30, 10] },
  { n: "tapis de couloir", Lm: [2, 5, 1], lcm: [60, 80, 10] },
  { n: "rideau", Lm: [2, 3, 0.5], lcm: [120, 150, 10] },
  { n: "banderole", f: true, Lm: [3, 6, 1], lcm: [50, 80, 10] },
  { n: "bande de pelouse", f: true, Lm: [8, 12, 1], lcm: [50, 50, 1] },
  { n: "nappe", f: true, Lm: [1.5, 3, 0.5], lcm: [80, 120, 20] },
  { n: "store", Lm: [1, 2, 0.5], lcm: [60, 120, 20] },
  { n: "plan de travail", Lm: [2, 3, 0.5], lcm: [60, 60, 1] },
];
const RECT_DECIMAUX: readonly ObjR[] = [
  { n: "chambre", f: true, u: "m", L: [3.5, 5.5, 1], l: [3, 4, 1] },
  { n: "terrasse", f: true, u: "m", L: [4.5, 8.5, 1], l: [2, 4, 1] },
  { n: "tapis", u: "m", L: [1.5, 3.5, 1], l: [1, 2, 1] },
  { n: "salle de bain", f: true, u: "m", L: [2.5, 3.5, 1], l: [2, 2, 1] },
  { n: "garage", u: "m", L: [5.5, 6.5, 1], l: [3, 4, 1] },
  { n: "potager", u: "m", L: [6.5, 9.5, 1], l: [2, 4, 2] },
  { n: "cuisine", f: true, u: "m", L: [3.5, 4.5, 1], l: [2, 3, 1] },
  { n: "parquet de salon", u: "m", L: [5.5, 7.5, 1], l: [4, 4, 1] },
];

/** ★3 — rectangle à mesures décimales ou en unités mélangées. */
function genRectDecimalOuMixte(): Q {
  const [p, pr] = randomChoice(PRENOMS);
  if (Math.random() < 0.5) {
    const o = randomChoice(RECT_DECIMAUX);
    const L = pick(o.L), l = pick(o.l);
    const A = L * l;
    return {
      text: randomChoice([
        `${cap(un(o))} rectangulaire mesure ${lg(L, "m")} sur ${lg(l, "m")}. Quelle est sa surface, en ${U2("m")} ?`,
        `Calcule l’aire ${dUn(o)} rectangulaire de ${lg(L, "m")} de long et ${lg(l, "m")} de large, en ${U2("m")}.`,
        `${p} veut connaître la surface de ${son(o)} : ${lg(l, "m")} de large, ${lg(L, "m")} de long. Combien de ${U2("m")} trouve-t-${pr} ?`,
        `Largeur ${lg(l, "m")}, longueur ${lg(L, "m")} : quelle est l’aire de ${ce(o)} rectangulaire, en ${U2("m")} ?`,
      ]),
      format: "short",
      expected: [ans(A)],
      comparator: "number_equal",
      explanation:
        "Définition : l’aire d’un rectangle vaut longueur × largeur, même avec des nombres décimaux.\n\n" +
        `Méthode : on multiplie ${lg(L, "m")} par ${lg(l, "m")}.\n\n` +
        `Calcul : $${tx(L)} \\times ${tx(l)} = ${tx(A)}$.\n\n` +
        `Conclusion : la surface vaut ${ar(A, "m")}.`,
    };
  }
  const o = randomChoice(RECT_MIXTES);
  const Lm = pick(o.Lm), lcm = pick(o.lcm);
  const enCm = Math.random() < 0.5;
  const A = enCm ? Lm * 100 * lcm : (Lm * lcm) / 100;
  const U = enCm ? U2("cm") : U2("m");
  return {
    text: randomChoice([
      `${cap(un(o))} rectangulaire mesure ${lg(Lm, "m")} de long et ${lg(lcm, "cm")} de large. Quelle est son aire, en ${U} ?`,
      `Calcule, en ${U}, l’aire ${dUn(o)} rectangulaire de ${lg(Lm, "m")} sur ${lg(lcm, "cm")}.`,
      `${p} mesure ${un(o)} rectangulaire : ${lg(lcm, "cm")} de large et ${lg(Lm, "m")} de long. Quelle aire trouve-t-${pr}, en ${U} ?`,
      `Attention aux unités : ${un(o)} rectangulaire a une longueur de ${lg(Lm, "m")} et une largeur de ${lg(lcm, "cm")}. Donne son aire en ${U}.`,
    ]),
    format: "short",
    expected: [ans(A)],
    comparator: "number_equal",
    explanation:
      "Définition : l’aire d’un rectangle vaut longueur × largeur, les deux dans la MÊME unité.\n\n" +
      (enCm
        ? `Méthode : on convertit la longueur : ${lg(Lm, "m")} $=$ ${lg(Lm * 100, "cm")}.\n\nCalcul : $${tx(Lm * 100)} \\times ${tx(lcm)} = ${tx(A)}$.\n\n`
        : `Méthode : on convertit la largeur : ${lg(lcm, "cm")} $=$ ${lg(lcm / 100, "m")}.\n\nCalcul : $${tx(Lm)} \\times ${tx(lcm / 100)} = ${tx(A)}$.\n\n`) +
      `Conclusion : l’aire vaut ${N(A)} ${U}.`,
  };
}

/** ★4 — retrouver une dimension à partir de l’aire. */
function genRectInverse(): Q {
  const o = randomChoice(RECT_OBJETS);
  const L = pick(o.L), l = pick(o.l);
  const A = L * l;
  const u = o.u, U = U2(u);
  const [p, pr] = randomChoice(PRENOMS);
  const chercheLargeur = Math.random() < 0.5;
  const connu = chercheLargeur ? L : l;
  const cherche = chercheLargeur ? l : L;
  const motConnu = chercheLargeur ? "longueur" : "largeur";
  const motCherche = chercheLargeur ? "largeur" : "longueur";
  return {
    text: randomChoice([
      `${cap(un(o))} rectangulaire a une aire de ${ar(A, u)} et une ${motConnu} de ${lg(connu, u)}. Quelle est sa ${motCherche}, en ${u} ?`,
      `L’aire ${dUn(o)} rectangulaire vaut ${ar(A, u)}. Sa ${motConnu} mesure ${lg(connu, u)}. Calcule sa ${motCherche}.`,
      `${p} sait que ${son(o)} rectangulaire couvre ${ar(A, u)} et que sa ${motConnu} vaut ${lg(connu, u)}. Quelle ${motCherche} en déduit-${pr}, en ${u} ?`,
      `${cap(le(o))} est un rectangle de ${motConnu} ${lg(connu, u)} et d’aire ${ar(A, u)}. Combien mesure sa ${motCherche}, en ${u} ?`,
      `Trouve la ${motCherche} ${dUn(o)} rectangulaire dont l’aire est ${ar(A, u)} et la ${motConnu} ${lg(connu, u)}.`,
    ]),
    format: "short",
    expected: [ans(cherche)],
    comparator: "number_equal",
    explanation:
      `Définition : aire $=$ longueur × largeur, donc la dimension cherchée $=$ aire ÷ dimension connue.\n\n` +
      `Méthode : on divise ${ar(A, u)} par ${lg(connu, u)}.\n\n` +
      `Calcul : $${tx(A)} \\div ${tx(connu)} = ${tx(cherche)}$ (vérification : $${tx(connu)} \\times ${tx(cherche)} = ${tx(A)}$).\n\n` +
      `Conclusion : la ${motCherche} mesure ${lg(cherche, u)}.`,
  };
}

/* ===========================================================================
   AIRE_CARRE
=========================================================================== */

type ObjC = Nom & { u: string; c: R };
const CARRE_OBJETS: readonly ObjC[] = [
  { n: "carreau de faïence", u: "cm", c: [10, 20, 5] },
  { n: "dalle", f: true, u: "cm", c: [30, 60, 10] },
  { n: "case d’échiquier", f: true, u: "cm", c: [3, 6, 1] },
  { n: "timbre", u: "mm", c: [20, 30, 5] },
  { n: "coussin", u: "cm", c: [40, 60, 5] },
  { n: "mouchoir en tissu", u: "cm", c: [20, 40, 5] },
  { n: "ring de boxe", u: "m", c: [5, 7, 1] },
  { n: "bac à sable", u: "m", c: [2, 4, 1] },
  { n: "place", f: true, u: "m", c: [20, 50, 10] },
  { n: "bassin", u: "m", c: [3, 8, 1] },
  { n: "table", f: true, u: "cm", c: [80, 100, 10] },
  { n: "fenêtre", f: true, u: "cm", c: [50, 120, 10] },
  { n: "toile de peintre", f: true, u: "cm", c: [30, 100, 10] },
  { n: "parterre de fleurs", u: "m", c: [2, 6, 1] },
  { n: "photo", f: true, u: "cm", c: [9, 15, 1] },
  { n: "serviette de table", f: true, u: "cm", c: [30, 50, 5] },
  { n: "plaque de liège", f: true, u: "cm", c: [20, 40, 10] },
  { n: "tapis de jeu", u: "cm", c: [80, 120, 10] },
  { n: "salle", f: true, u: "m", c: [6, 10, 1] },
  { n: "voile d’ombrage", f: true, u: "m", c: [3, 5, 1] },
];
const carre = (o: Nom) => (o.f ? "carrée" : "carré");

function texteCarreAire(o: ObjC, c: number): string {
  const u = o.u, U = U2(u);
  const [p, pr] = randomChoice(PRENOMS);
  return randomChoice([
    `${cap(un(o))} ${carre(o)} a un côté de ${lg(c, u)}. Quelle est son aire, en ${U} ?`,
    `Calcule l’aire ${dUn(o)} ${carre(o)} de ${lg(c, u)} de côté, en ${U}.`,
    `Quelle surface couvre ${un(o)} ${carre(o)} dont le côté mesure ${lg(c, u)} ? Réponds en ${U}.`,
    `${p} mesure le côté ${dUn(o)} ${carre(o)} : ${lg(c, u)}. Quelle aire en déduit-${pr}, en ${U} ?`,
    `Le côté ${duN(o)} ${carre(o)} vaut ${lg(c, u)}. Que vaut son aire, en ${U} ?`,
  ]);
}
const explCarre = (c: number, u: string) =>
  "Définition : l’aire d’un carré vaut côté × côté.\n\n" +
  `Méthode : on multiplie ${lg(c, u)} par lui-même.\n\n` +
  `Calcul : $${tx(c)} \\times ${tx(c)} = ${tx(c * c)}$.\n\n` +
  `Conclusion : l’aire vaut ${ar(c * c, u)}.`;

/** ★1 — côté donné → aire, objets réels (figure une fois sur trois si demandé). */
function genCarreAire(figureParfois: boolean): Q {
  const o = randomChoice(CARRE_OBJETS);
  const c = pick(o.c);
  if (figureParfois && Math.random() < 0.35) {
    const nom = randomChoice(NOMS4);
    return {
      text: randomChoice([
        `Le carré ${nom} représente ${un(o)}. Quelle est son aire, en ${U2(o.u)} ?`,
        `${nom} est un carré. Calcule son aire en ${U2(o.u)}.`,
        `Lis le côté du carré ${nom} sur la figure et donne son aire, en ${U2(o.u)}.`,
      ]),
      format: "short",
      expected: [ans(c * c)],
      comparator: "number_equal",
      explanation: explCarre(c, o.u),
      canvas: rectCanvas(c, c, o.u, nom, true),
    };
  }
  return { text: texteCarreAire(o, c), format: "short", expected: [ans(c * c)], comparator: "number_equal", explanation: explCarre(c, o.u) };
}

/** ★2 — carré : figure nommée, côté décimal, ou aire à partir du périmètre. */
function genCarreNiveau2(): Q {
  const o = randomChoice(CARRE_OBJETS);
  const u = o.u, U = U2(u);
  const mode = randomInt(0, 2);
  if (mode === 0) {
    const c = pick(o.c);
    const P = 4 * c;
    const [p] = randomChoice(PRENOMS);
    return {
      text: randomChoice([
        `Le périmètre ${dUn(o)} ${carre(o)} est de ${lg(P, u)}. Quelle est son aire, en ${U} ?`,
        `Le tour ${dUn(o)} ${carre(o)} mesure ${lg(P, u)}. Que vaut son aire, en ${U} ?`,
        `${p} fait le tour ${dUn(o)} ${carre(o)} avec un ruban : il faut exactement ${lg(P, u)}. Quelle est l’aire ${duN(o)}, en ${U} ?`,
        `On connaît seulement le périmètre ${dUn(o)} ${carre(o)} : ${lg(P, u)}. Calcule son aire en ${U}.`,
      ]),
      format: "short",
      expected: [ans(c * c)],
      comparator: "number_equal",
      explanation:
        "Définition : un carré a quatre côtés égaux ; périmètre $= 4 \\times$ côté, aire $=$ côté × côté.\n\n" +
        `Méthode : on trouve d’abord le côté : $${tx(P)} \\div 4 = ${tx(c)}$.\n\n` +
        `Calcul : $${tx(c)} \\times ${tx(c)} = ${tx(c * c)}$.\n\n` +
        `Conclusion : l’aire vaut ${ar(c * c, u)} (et non ${ar(P, u)} : ${N(P)} est le périmètre).`,
    };
  }
  if (mode === 1) {
    const c = randomInt(1, 9) + 0.5;
    const oc = randomChoice(CARRE_OBJETS.filter((x) => x.u === "cm"));
    return { text: texteCarreAire(oc, c), format: "short", expected: [ans(c * c)], comparator: "number_equal", explanation: explCarre(c, "cm") };
  }
  const c = pick(o.c);
  const nom = randomChoice(NOMS4);
  return {
    text: randomChoice([
      `La figure représente ${un(o)} ${carre(o)} ${nom}. Calcule son aire en ${U}.`,
      `Quelle est l’aire du carré ${nom} ci-contre, en ${U} ?`,
      `${nom} est un carré dont le côté est indiqué sur la figure. Donne son aire, en ${U}.`,
      `Calcule l’aire du carré ${nom} : c’est la forme ${dUn(o)}. Réponds en ${U}.`,
    ]),
    format: "short",
    expected: [ans(c * c)],
    comparator: "number_equal",
    explanation: explCarre(c, u),
    canvas: rectCanvas(c, c, u, nom, true),
  };
}

const CARRE_COUTS: readonly { lieu: Nom; c: R; mat: string; action: string; prix: R }[] = [
  { lieu: { n: "place", f: true }, c: [20, 40, 10], mat: "les pavés", action: "paver", prix: [30, 50, 5] },
  { lieu: { n: "salle de jeux", f: true }, c: [4, 6, 1], mat: "la moquette", action: "couvrir de moquette", prix: [12, 20, 2] },
  { lieu: { n: "terrain de jeu" }, c: [10, 20, 5], mat: "le gazon synthétique", action: "couvrir de gazon synthétique", prix: [15, 25, 5] },
  { lieu: { n: "chambre", f: true }, c: [3, 4, 1], mat: "le parquet", action: "parqueter", prix: [25, 40, 5] },
  { lieu: { n: "terrasse", f: true }, c: [4, 7, 1], mat: "les dalles", action: "daller", prix: [20, 35, 5] },
  { lieu: { n: "cour", f: true }, c: [10, 20, 2], mat: "l’enrobé", action: "goudronner", prix: [20, 30, 5] },
  { lieu: { n: "ring de boxe" }, c: [5, 7, 1], mat: "le tapis de sol", action: "recouvrir d’un tapis de sol", prix: [40, 60, 10] },
];

/** ★3 — problèmes sur le carré : coût, nombre de dalles, côté décimal. */
function genCarreProbleme(): Q {
  const mode = randomInt(0, 2);
  const [p, pr] = randomChoice(PRENOMS);
  if (mode === 0) {
    const x = randomChoice(CARRE_COUTS);
    const c = pick(x.c), prix = pick(x.prix);
    const A = c * c;
    return {
      text: randomChoice([
        `On veut ${x.action} ${un(x.lieu)} ${carre(x.lieu)} de ${lg(c, "m")} de côté. ${cap(x.mat)} coûte${x.mat.startsWith("les") ? "nt" : ""} ${N(prix)} € le ${U2("m")}. Quel est le prix à payer, en € ?`,
        `${p} doit ${x.action} ${un(x.lieu)} ${carre(x.lieu)} de ${lg(c, "m")} de côté, à ${N(prix)} € le ${U2("m")}. Combien va-t-${pr} payer ?`,
        `Prix : ${N(prix)} € par ${U2("m")}. Combien faut-il payer pour ${x.action} ${un(x.lieu)} ${carre(x.lieu)} dont le côté mesure ${lg(c, "m")} ?`,
      ]),
      format: "short",
      expected: [ans(A * prix)],
      comparator: "number_equal",
      explanation:
        "Définition : le coût vaut l’aire × le prix d’un mètre carré.\n\n" +
        `Méthode : aire du carré $= ${tx(c)} \\times ${tx(c)} = ${tx(A)}\\ \\text{m}^2$.\n\n` +
        `Calcul : $${tx(A)} \\times ${tx(prix)} = ${tx(A * prix)}$.\n\n` +
        `Conclusion : il faut payer ${N(A * prix)} €.`,
    };
  }
  if (mode === 1) {
    const lieu = randomChoice<Nom>([{ n: "cuisine", f: true }, { n: "terrasse", f: true }, { n: "salle de bain", f: true }, { n: "entrée", f: true, v: true }, { n: "atelier", v: true }, { n: "garage" }]);
    const c = randomInt(2, 6), t = randomChoice([20, 25, 50]);
    const parCote = (c * 100) / t;
    const nb = parCote * parCote;
    return {
      text: randomChoice([
        `${cap(un(lieu))} ${carre(lieu)} de ${lg(c, "m")} de côté est carrelé${eF(lieu)} avec des dalles carrées de ${lg(t, "cm")} de côté, sans découpe. Combien faut-il de dalles ?`,
        `${p} pose des dalles carrées de ${lg(t, "cm")} de côté dans ${son(lieu)}, un carré de ${lg(c, "m")} de côté. Combien de dalles lui faut-il ?`,
        `Combien de dalles carrées de ${lg(t, "cm")} de côté recouvrent exactement ${un(lieu)} ${carre(lieu)} de ${lg(c, "m")} de côté ?`,
      ]),
      format: "short",
      expected: [ans(nb)],
      comparator: "number_equal",
      explanation:
        "Définition : on compte combien de dalles tiennent sur un côté, puis on fait côté × côté.\n\n" +
        `Méthode : ${lg(c, "m")} $=$ ${lg(c * 100, "cm")}, donc $${tx(c * 100)} \\div ${t} = ${tx(parCote)}$ dalles par côté.\n\n` +
        `Calcul : $${tx(parCote)} \\times ${tx(parCote)} = ${tx(nb)}$.\n\n` +
        `Conclusion : il faut ${N(nb)} dalles (on retrouve aire de la pièce ÷ aire d’une dalle).`,
    };
  }
  const o = randomChoice<Nom>([{ n: "nappe", f: true }, { n: "voile d’ombrage", f: true }, { n: "bâche", f: true }, { n: "toile", f: true }, { n: "tapis" }, { n: "plateau de table" }, { n: "panneau de bois" }]);
  const c = randomChoice([0.5, 0.8, 1.2, 1.5, 2.5, 3.5]);
  return {
    text: randomChoice([
      `${cap(un(o))} ${carre(o)} mesure ${lg(c, "m")} de côté. Quelle est son aire, en ${U2("m")} ?`,
      `Calcule l’aire ${dUn(o)} ${carre(o)} de ${lg(c, "m")} de côté, en ${U2("m")}.`,
      `${p} achète ${un(o)} ${carre(o)} de ${lg(c, "m")} de côté. Quelle surface couvre-t-${ilN(o)}, en ${U2("m")} ?`,
    ]),
    format: "short",
    expected: [ans(c * c)],
    comparator: "number_equal",
    explanation: explCarre(c, "m") + ` ⚠️ Pas ${N(2 * c)} : multiplier par $2$ n’est pas élever au carré.`,
  };
}

/** ★4 — de l’aire au côté (et au périmètre). */
function genCarreInverse(): Q {
  const o = randomChoice(CARRE_OBJETS);
  const c = pick(o.c);
  const A = c * c;
  const u = o.u;
  const [p, pr] = randomChoice(PRENOMS);
  if (Math.random() < 0.6) {
    return {
      text: randomChoice([
        `${cap(un(o))} ${carre(o)} a une aire de ${ar(A, u)}. Quelle est la longueur de son côté, en ${u} ?`,
        `L’aire ${dUn(o)} ${carre(o)} vaut ${ar(A, u)}. Combien mesure son côté ?`,
        `${p} sait que ${son(o)} ${carre(o)} couvre ${ar(A, u)}. Quel côté en déduit-${pr}, en ${u} ?`,
        `Trouve le côté ${dUn(o)} ${carre(o)} d’aire ${ar(A, u)}.`,
      ]),
      format: "short",
      expected: [ans(c)],
      comparator: "number_equal",
      explanation:
        "Définition : aire du carré $=$ côté × côté.\n\n" +
        `Méthode : on cherche le nombre qui, multiplié par lui-même, donne $${tx(A)}$ (c’est $\\sqrt{${tx(A)}}$).\n\n` +
        `Calcul : $${tx(c)} \\times ${tx(c)} = ${tx(A)}$.\n\n` +
        `Conclusion : le côté mesure ${lg(c, u)}.`,
    };
  }
  return {
    text: randomChoice([
      `${cap(un(o))} ${carre(o)} a une aire de ${ar(A, u)}. Quel est son périmètre, en ${u} ?`,
      `On veut poser une bordure tout autour ${dUn(o)} ${carre(o)} de ${ar(A, u)}. Quelle longueur de bordure faut-il, en ${u} ?`,
      `${p} connaît l’aire de ${son(o)} ${carre(o)} : ${ar(A, u)}. Quel périmètre trouve-t-${pr}, en ${u} ?`,
    ]),
    format: "short",
    expected: [ans(4 * c)],
    comparator: "number_equal",
    explanation:
      "Définition : aire $=$ côté × côté ; périmètre $= 4 \\times$ côté.\n\n" +
      `Méthode : le côté est le nombre dont le carré vaut $${tx(A)}$ : c’est $${tx(c)}$.\n\n` +
      `Calcul : $4 \\times ${tx(c)} = ${tx(4 * c)}$.\n\n` +
      `Conclusion : le périmètre vaut ${lg(4 * c, u)}.`,
  };
}

/* ===========================================================================
   AIRE_TRIANGLE
=========================================================================== */

type ObjT = Nom & { u: string; b: R; h: R };
const TRI_OBJETS: readonly ObjT[] = [
  { n: "voile", f: true, u: "m", b: [2, 6, 1], h: [4, 9, 1] },
  { n: "fanion", u: "cm", b: [10, 30, 2], h: [15, 40, 5] },
  { n: "panneau de signalisation", u: "cm", b: [60, 100, 10], h: [50, 80, 10] },
  { n: "pignon de maison", u: "m", b: [6, 10, 1], h: [2, 5, 1] },
  { n: "parcelle", f: true, u: "m", b: [20, 60, 10], h: [10, 40, 10] },
  { n: "foulard", u: "cm", b: [80, 120, 10], h: [40, 60, 10] },
  { n: "fronton", u: "m", b: [8, 14, 2], h: [2, 4, 1] },
  { n: "voile d’ombrage", f: true, u: "m", b: [3, 5, 1], h: [2, 4, 1] },
  { n: "pièce de tangram", f: true, u: "cm", b: [6, 12, 2], h: [3, 6, 1] },
  { n: "vitrail", u: "cm", b: [10, 30, 2], h: [8, 20, 2] },
  { n: "massif de fleurs", u: "m", b: [4, 8, 1], h: [2, 5, 1] },
  { n: "aile de deltaplane", f: true, v: true, u: "m", b: [8, 10, 1], h: [2, 3, 1] },
  { n: "drapeau", u: "cm", b: [20, 40, 5], h: [30, 60, 10] },
];
const explTri = (b: number, h: number, u: string, extra = "") =>
  "Définition : l’aire d’un triangle vaut (base × hauteur) ÷ 2 : c’est la moitié d’un rectangle de même base et de même hauteur.\n\n" +
  `Méthode : on prend la base ${lg(b, u)} et la hauteur qui lui est perpendiculaire, ${lg(h, u)}.${extra}\n\n` +
  `Calcul : $\\dfrac{${tx(b)} \\times ${tx(h)}}{2} = \\dfrac{${tx(b * h)}}{2} = ${tx((b * h) / 2)}$.\n\n` +
  `Conclusion : l’aire vaut ${ar((b * h) / 2, u)}.`;

/** ★2 — triangle réel : base et hauteur dans le texte. */
function genTriTexte(): Q {
  const o = randomChoice(TRI_OBJETS);
  const b = pick(o.b), h = pick(o.h);
  const u = o.u, U = U2(u);
  const [p, pr] = randomChoice(PRENOMS);
  return {
    text: randomChoice([
      `${cap(un(o))} triangulaire a une base de ${lg(b, u)} et une hauteur de ${lg(h, u)}. Quelle est son aire, en ${U} ?`,
      `Calcule l’aire ${dUn(o)} triangulaire : base ${lg(b, u)}, hauteur relative à cette base ${lg(h, u)}. Donne-la en ${U}.`,
      `Quelle surface, en ${U}, couvre ${un(o)} triangulaire de ${lg(b, u)} de base et ${lg(h, u)} de hauteur ?`,
      `${p} mesure ${un(o)} triangulaire : la base fait ${lg(b, u)}, la hauteur ${lg(h, u)}. Quelle aire doit-${pr} trouver, en ${U} ?`,
      `La hauteur ${dUn(o)} triangulaire mesure ${lg(h, u)} et sa base ${lg(b, u)}. Que vaut son aire, en ${U} ?`,
    ]),
    format: "short",
    expected: [ans((b * h) / 2)],
    comparator: "number_equal",
    explanation: explTri(b, h, u),
  };
}

/** ★2 — triangle dessiné : hauteur tracée, côté oblique parfois affiché (piège). */
function genTriFigure(): Q {
  const o = randomChoice(TRI_OBJETS);
  const [dec0, h0, s0] = tripletPour(o.h[1]);
  const k = Math.max(1, Math.round(pick(o.h) / h0));
  const dec = dec0 * k, h = h0 * k, s = s0 * k;
  const b = Math.max(pick(o.b), dec + 2 * k);
  const u = o.u;
  const nom = randomChoice(NOMS3);
  const oblique = Math.random() < 0.6;
  const U = U2(u);
  return {
    text: randomChoice([
      `Dans le triangle ${nom}, la hauteur issue de ${nom[2]} est tracée en pointillés. Calcule l’aire du triangle, en ${U}.`,
      `Le triangle ${nom} ci-contre représente ${un(o)}. Quelle est son aire, en ${U} ?`,
      `Sur la figure, [${nom[0]}${nom[1]}] mesure ${lg(b, u)} et la hauteur relative à [${nom[0]}${nom[1]}] mesure ${lg(h, u)}. Calcule l’aire du triangle ${nom}, en ${U}.`,
      `Quelle est l’aire du triangle ${nom} ? Lis sur la figure la base et la hauteur qui lui correspond, puis réponds en ${U}.`,
    ]),
    format: "short",
    expected: [ans((b * h) / 2)],
    comparator: "number_equal",
    explanation: explTri(b, h, u, oblique ? ` ⚠️ Le côté [${nom[0]}${nom[2]}] (${lg(s, u)}) n’est pas la hauteur : il n’est pas perpendiculaire à la base.` : ""),
    canvas: triCanvas(b, h, dec, u, nom, oblique ? { oblique: s } : {}),
  };
}

const TRI_RECTANGLES: readonly (Nom & { u: string })[] = [
  { n: "équerre", f: true, v: true, u: "cm" }, { n: "rampe d’accès", f: true, u: "dm" },
  { n: "parcelle", f: true, u: "m" }, { n: "cale en bois", f: true, u: "cm" },
  { n: "coin de jardin", u: "m" }, { n: "serre-livres", u: "cm" },
  { n: "voile", f: true, u: "m" }, { n: "panneau de bois", u: "dm" },
  { n: "pan de toit", u: "m" }, { n: "morceau de carton", u: "cm" },
];

/** ★3 — triangle rectangle : les côtés de l’angle droit, pas l’hypoténuse. */
function genTriRectangle(): Q {
  const [a0, b0, c0] = randomChoice(TRIPLETS);
  const k = randomChoice([1, 2]);
  const a = a0 * k, h = b0 * k, hyp = c0 * k;
  const o = randomChoice(TRI_RECTANGLES);
  const u = o.u, U = U2(u);
  const nom = randomChoice(NOMS3);
  const A = (a * h) / 2;
  const expl = explTri(a, h, u, ` Dans un triangle rectangle, les deux côtés de l’angle droit sont perpendiculaires : l’un sert de base, l’autre de hauteur. L’hypoténuse (${lg(hyp, u)}) ne sert pas.`);
  if (Math.random() < 0.5) {
    const droit: "A" | "B" = Math.random() < 0.5 ? "A" : "B";
    const sommet = droit === "A" ? nom[0] : nom[1];
    return {
      text: randomChoice([
        `Le triangle ${nom} est rectangle en ${sommet}. Calcule son aire en ${U}.`,
        `Le triangle ${nom}, rectangle en ${sommet}, représente ${un(o)}. Quelle est son aire, en ${U} ?`,
        `Sur la figure, ${nom} est un triangle rectangle. Toutes les longueurs ne servent pas : quelle est son aire, en ${U} ?`,
      ]),
      format: "short",
      expected: [ans(A)],
      comparator: "number_equal",
      explanation: expl,
      canvas: triCanvas(a, h, droit === "A" ? 0 : a, u, nom, { droit, hyp }),
    };
  }
  const [p, pr] = randomChoice(PRENOMS);
  return {
    text: randomChoice([
      `${cap(un(o))} a la forme d’un triangle rectangle dont les côtés de l’angle droit mesurent ${lg(a, u)} et ${lg(h, u)}, et l’hypoténuse ${lg(hyp, u)}. Quelle est son aire, en ${U} ?`,
      `Le triangle ${nom} est rectangle en ${nom[0]} : ${nom[0]}${nom[1]} $= ${tx(a)}$ ${u}, ${nom[0]}${nom[2]} $= ${tx(h)}$ ${u} et ${nom[1]}${nom[2]} $= ${tx(hyp)}$ ${u}. Calcule son aire en ${U}.`,
      `${p} découpe ${un(o)} en forme de triangle rectangle : ${lg(hyp, u)} pour le plus grand côté, ${lg(a, u)} et ${lg(h, u)} pour les deux autres. Quelle aire obtient-${pr}, en ${U} ?`,
    ]),
    format: "short",
    expected: [ans(A)],
    comparator: "number_equal",
    explanation: expl,
  };
}

/** ★3 — hauteur extérieure : le pied tombe hors de la base. */
function genTriHauteurExterieure(): Q {
  const [dec0, h0, s0] = randomChoice(TRIPLETS);
  const k = randomChoice([1, 1, 2]);
  const dec = dec0 * k, h = h0 * k, s = s0 * k;
  const b = k * randomInt(2, 8);
  const u = randomChoice(["cm", "m", "dm"]);
  const U = U2(u);
  const nom = randomChoice(NOMS3);
  return {
    text: randomChoice([
      `Dans le triangle ${nom}, la hauteur issue de ${nom[2]} tombe EN DEHORS du côté [${nom[0]}${nom[1]}]. Calcule l’aire du triangle, en ${U}.`,
      `Le triangle ${nom} a un angle obtus en ${nom[0]}. Avec la base [${nom[0]}${nom[1]}] et la hauteur tracée, quelle est son aire, en ${U} ?`,
      `Calcule l’aire du triangle ${nom} ci-contre, en ${U}. Attention : le pied de la hauteur est sur le prolongement de [${nom[0]}${nom[1]}].`,
      `Quelle est l’aire du triangle ${nom}, en ${U} ? Choisis bien les deux longueurs qui servent.`,
    ]),
    format: "short",
    expected: [ans((b * h) / 2)],
    comparator: "number_equal",
    explanation: explTri(b, h, u, ` La hauteur relative à [${nom[0]}${nom[1]}] est la distance de ${nom[2]} à la DROITE (${nom[0]}${nom[1]}), même si son pied tombe hors du segment ; le côté [${nom[0]}${nom[2]}] (${lg(s, u)}) ne sert pas.`),
    canvas: triCanvas(b, h, -dec, u, nom, { oblique: s }),
  };
}

/** ★3 — l’erreur d’un élève : oubli du ÷ 2, côté oblique pris pour la hauteur. */
function genTriErreur(): Q {
  const o = randomChoice(TRI_OBJETS);
  const [, h0, s0] = tripletPour(o.h[1]);
  const k = Math.max(1, Math.round(pick(o.h) / h0));
  const b = pick(o.b);
  const h = h0 * k, s = s0 * k;
  const u = o.u, U = U2(u);
  const bonne = (b * h) / 2;
  const sorte = randomInt(0, 2); // 0 : juste ; 1 : oubli du ÷ 2 ; 2 : côté oblique
  const trouve = sorte === 0 ? bonne : sorte === 1 ? b * h : (b * s) / 2;
  const [p, pr] = randomChoice(PRENOMS);
  const correct = sorte === 0 ? "oui" : "non";
  return {
    text: randomChoice([
      `${p} calcule l’aire ${dUn(o)} triangulaire de base ${lg(b, u)}, de hauteur ${lg(h, u)}, dont un côté oblique mesure ${lg(s, u)}. ${cap(pr)} trouve ${ar(trouve, u)}. A-t-${pr} raison ?`,
      `${cap(un(o))} triangulaire a une base de ${lg(b, u)}, une hauteur de ${lg(h, u)} et un côté oblique de ${lg(s, u)}. ${p} annonce une aire de ${ar(trouve, u)}. Est-ce juste ?`,
      `Base ${lg(b, u)}, hauteur ${lg(h, u)}, côté oblique ${lg(s, u)} : ${p} affirme que l’aire ${duN(o)} triangulaire vaut ${ar(trouve, u)}. Vrai ?`,
    ]),
    format: "qcm",
    choices: ["oui", "non"],
    expected: [correct],
    comparator: "mcq_exact",
    explanation: explTri(b, h, u,
      sorte === 0
        ? " C’est bien ce qui a été fait."
        : sorte === 1
          ? ` ⚠️ Erreur : ${N(trouve)} est base × hauteur, on a oublié de diviser par $2$.`
          : ` ⚠️ Erreur : on a pris le côté oblique (${lg(s, u)}) au lieu de la hauteur.`) +
      ` Réponse : ${correct}.`,
  };
}

/** ★4 — retrouver la hauteur ou la base d’un triangle. */
function genTriInverse(): Q {
  const o = randomChoice(TRI_OBJETS);
  const b = pick(o.b), h = pick(o.h);
  const A = (b * h) / 2;
  const u = o.u;
  const [p, pr] = randomChoice(PRENOMS);
  const chercheH = Math.random() < 0.6;
  const connu = chercheH ? b : h, cherche = chercheH ? h : b;
  const mc = chercheH ? "base" : "hauteur", mx = chercheH ? "hauteur" : "base";
  return {
    text: randomChoice([
      `${cap(un(o))} triangulaire a une aire de ${ar(A, u)} et une ${mc} de ${lg(connu, u)}. Quelle est sa ${mx}, en ${u} ?`,
      `L’aire ${dUn(o)} triangulaire vaut ${ar(A, u)} ; sa ${mc} mesure ${lg(connu, u)}. Calcule sa ${mx}.`,
      `${p} veut ${un(o)} triangulaire de ${ar(A, u)}, avec une ${mc} de ${lg(connu, u)}. Quelle ${mx} doit-${pr} prévoir, en ${u} ?`,
      `Trouve la ${mx} ${dUn(o)} triangulaire dont l’aire est ${ar(A, u)} et la ${mc} ${lg(connu, u)}.`,
    ]),
    format: "short",
    expected: [ans(cherche)],
    comparator: "number_equal",
    explanation:
      "Définition : aire du triangle $= \\dfrac{\\text{base} \\times \\text{hauteur}}{2}$, donc base × hauteur $= 2 \\times$ aire.\n\n" +
      `Méthode : $2 \\times ${tx(A)} = ${tx(2 * A)}$, puis on divise par la ${mc}.\n\n` +
      `Calcul : $${tx(2 * A)} \\div ${tx(connu)} = ${tx(cherche)}$.\n\n` +
      `Conclusion : la ${mx} mesure ${lg(cherche, u)}.`,
  };
}

/* ===========================================================================
   AIRE_PARALLELOGRAMME
=========================================================================== */

type ObjP = Nom & { u: string; k: number[] };
const PARA_OBJETS: readonly ObjP[] = [
  { n: "parcelle", f: true, u: "m", k: [2, 5] },
  { n: "dalle", f: true, u: "cm", k: [5] },
  { n: "carreau de mosaïque", u: "cm", k: [1] },
  { n: "pièce de tangram", f: true, u: "cm", k: [1] },
  { n: "champ", u: "m", k: [10] },
  { n: "place pavée", f: true, u: "m", k: [2, 4] },
  { n: "étiquette", f: true, v: true, u: "cm", k: [1] },
  { n: "terrain", u: "m", k: [5] },
  { n: "pochoir", u: "cm", k: [1, 2] },
  { n: "plate-bande", f: true, u: "m", k: [1] },
  { n: "vitrail", u: "cm", k: [5] },
  { n: "logo", u: "mm", k: [2, 5] },
  { n: "massif de fleurs", u: "m", k: [1] },
  { n: "place de parking en épi", f: true, u: "dm", k: [5] },
];
/** Base, hauteur, décalage et côté oblique cohérents (triplet entier). */
function dimsPara(o: ObjP) {
  const [dec0, h0, s0] = randomChoice(TRIPLETS);
  const k = randomChoice(o.k);
  const dec = dec0 * k, h = h0 * k, s = s0 * k;
  const b = k * randomInt(dec0 + 2, dec0 + 10);
  return { b, h, dec, s };
}
const explPara = (b: number, h: number, u: string, extra = "") =>
  "Définition : l’aire d’un parallélogramme vaut base × hauteur (on le découpe et on le recolle en rectangle).\n\n" +
  `Méthode : base ${lg(b, u)}, hauteur perpendiculaire à cette base ${lg(h, u)}.${extra}\n\n` +
  `Calcul : $${tx(b)} \\times ${tx(h)} = ${tx(b * h)}$.\n\n` +
  `Conclusion : l’aire vaut ${ar(b * h, u)}.`;

/** ★2 — parallélogramme : figure nommée ou objet réel. */
function genParaAire(): Q {
  const o = randomChoice(PARA_OBJETS);
  const { b, h, dec, s } = dimsPara(o);
  const u = o.u, U = U2(u);
  if (Math.random() < 0.5) {
    const nom = randomChoice(NOMS4);
    const oblique = Math.random() < 0.6;
    return {
      text: randomChoice([
        `${nom} est un parallélogramme ; la hauteur issue de ${nom[3]} est tracée. Calcule son aire en ${U}.`,
        `Le parallélogramme ${nom} ci-contre représente ${un(o)}. Quelle est son aire, en ${U} ?`,
        `Calcule l’aire du parallélogramme ${nom}, en ${U}. Attention : toutes les longueurs de la figure ne servent pas forcément.`,
        `Quelle est l’aire du parallélogramme ${nom}, en ${U} ?`,
      ]),
      format: "short",
      expected: [ans(b * h)],
      comparator: "number_equal",
      explanation: explPara(b, h, u, oblique ? ` Le côté [${nom[0]}${nom[3]}] (${lg(s, u)}) est penché : ce n’est pas la hauteur.` : ""),
      canvas: paraCanvas(b, h, dec, oblique ? s : null, u, nom),
    };
  }
  const [p, pr] = randomChoice(PRENOMS);
  return {
    text: randomChoice([
      `${cap(un(o))} en forme de parallélogramme a une base de ${lg(b, u)} et une hauteur relative à cette base de ${lg(h, u)}. Quelle est son aire, en ${U} ?`,
      `Quelle surface, en ${U}, couvre ${un(o)} en forme de parallélogramme, de base ${lg(b, u)} et de hauteur ${lg(h, u)} ?`,
      `${p} dessine le plan ${dUn(o)} : un parallélogramme de base ${lg(b, u)} et de hauteur ${lg(h, u)}. Quelle aire doit-${pr} trouver, en ${U} ?`,
      `La hauteur ${dUn(o)} en forme de parallélogramme mesure ${lg(h, u)}, sa base ${lg(b, u)}. Calcule son aire en ${U}.`,
      `Calcule l’aire ${dUn(o)} en forme de parallélogramme : base ${lg(b, u)}, hauteur ${lg(h, u)}. Réponds en ${U}.`,
    ]),
    format: "short",
    expected: [ans(b * h)],
    comparator: "number_equal",
    explanation: explPara(b, h, u),
  };
}

/** ★3 — le piège du côté penché, ou la hauteur relative à L’AUTRE côté. */
function genParaPiege(): Q {
  const o = randomChoice(PARA_OBJETS);
  const u = o.u, U = U2(u);
  const [p, pr] = randomChoice(PRENOMS);
  if (Math.random() < 0.5) {
    const { b, h, dec, s } = dimsPara(o);
    const nom = randomChoice(NOMS4);
    const avecFigure = Math.random() < 0.5;
    return {
      text: avecFigure
        ? randomChoice([
            `Le parallélogramme ${nom} a une base de ${lg(b, u)}, un côté penché de ${lg(s, u)} et une hauteur de ${lg(h, u)}. Quelle est son aire, en ${U} ?`,
            `Sur la figure, quelles longueurs servent pour l’aire du parallélogramme ${nom} ? Calcule cette aire en ${U}.`,
            `${p} dit que l’aire de ${nom} vaut ${tx(b)} × ${tx(s)}. Calcule la vraie aire du parallélogramme ${nom}, en ${U}.`,
          ])
        : randomChoice([
            `Les côtés ${dUn(o)} en forme de parallélogramme mesurent ${lg(b, u)} et ${lg(s, u)} ; la hauteur relative au côté de ${lg(b, u)} vaut ${lg(h, u)}. Quelle surface occupe-t-${ilN(o)}, en ${U} ?`,
            `Calcule l’aire ${dUn(o)} en forme de parallélogramme : base ${lg(b, u)}, côté oblique ${lg(s, u)}, hauteur ${lg(h, u)}. Réponds en ${U}.`,
            `${p} mesure ${un(o)} en forme de parallélogramme : ${lg(b, u)} de base, ${lg(s, u)} de côté penché, ${lg(h, u)} de hauteur. Quelle aire doit-${pr} trouver, en ${U} ?`,
          ]),
      format: "short",
      expected: [ans(b * h)],
      comparator: "number_equal",
      explanation: explPara(b, h, u, ` ⚠️ Le côté penché (${lg(s, u)}) ne sert pas : ${tx(b)} × ${tx(s)} $= ${tx(b * s)}$ serait faux.`),
      ...(avecFigure ? { canvas: paraCanvas(b, h, dec, s, u, nom) } : {}),
    };
  }
  // Deux côtés b et s, deux hauteurs : b × h_b = s × h_s.
  const g = randomInt(2, 5), t = randomInt(1, g - 1);
  let pp = randomInt(1, 5), q = randomInt(1, 5);
  while (q === pp) q = randomInt(1, 5);
  const m = u === "m" ? 2 : 1;
  const b = g * pp * m, s = g * q * m, hb = q * t * m, hs = pp * t * m;
  const surS = Math.random() < 0.5;
  const [cote, haut, autre] = surS ? [s, hs, b] : [b, hb, s];
  return {
    text: randomChoice([
      `${cap(un(o))} en forme de parallélogramme a des côtés de ${lg(b, u)} et ${lg(s, u)}. La hauteur relative au côté de ${lg(cote, u)} mesure ${lg(haut, u)}. Quelle est son aire, en ${U} ?`,
      `Un parallélogramme a deux côtés consécutifs de ${lg(autre, u)} et ${lg(cote, u)} ; la hauteur tombant sur le côté de ${lg(cote, u)} vaut ${lg(haut, u)}. Calcule son aire en ${U}.`,
      `${p} sait que ${son(o)} est un parallélogramme de côtés ${lg(b, u)} et ${lg(s, u)}, et que la hauteur relative au côté de ${lg(cote, u)} est ${lg(haut, u)}. Quelle aire trouve-t-${pr}, en ${U} ?`,
    ]),
    format: "short",
    expected: [ans(cote * haut)],
    comparator: "number_equal",
    explanation:
      "Définition : aire du parallélogramme $=$ un côté × la hauteur RELATIVE À CE CÔTÉ.\n\n" +
      `Méthode : la hauteur ${lg(haut, u)} est perpendiculaire au côté de ${lg(cote, u)} : on multiplie ces deux-là.\n\n` +
      `Calcul : $${tx(cote)} \\times ${tx(haut)} = ${tx(cote * haut)}$ (et non $${tx(autre)} \\times ${tx(haut)}$).\n\n` +
      `Conclusion : l’aire vaut ${ar(cote * haut, u)}.`,
  };
}

/** ★3 — parallélogrammes réels, avec conversion pour les grands terrains. */
function genParaProbleme(): Q {
  const [p, pr] = randomChoice(PRENOMS);
  if (Math.random() < 0.4) {
    const o = randomChoice<Nom>([{ n: "champ" }, { n: "parcelle", f: true }, { n: "prairie", f: true }, { n: "vigne", f: true }, { n: "verger" }, { n: "terrain de camping" }]);
    const b = randomChoice([100, 150, 200, 250, 300]), h = randomChoice([40, 50, 60, 80, 100]);
    const A = b * h;
    const enHa = Math.random() < 0.5;
    const res = enHa ? A / 10000 : A / 100;
    const unite = enHa ? "ha" : "ares";
    return {
      text: randomChoice([
        `${cap(un(o))} a la forme d’un parallélogramme de base ${lg(b, "m")} et de hauteur ${lg(h, "m")}. Quelle est son aire, en ${unite} ?`,
        `${p} achète ${un(o)} en forme de parallélogramme : ${lg(b, "m")} de base, ${lg(h, "m")} de hauteur. Combien ${deU(unite)} cela représente-t-il ?`,
        `Exprime en ${unite} l’aire ${dUn(o)} en forme de parallélogramme de base ${lg(b, "m")} et de hauteur ${lg(h, "m")}.`,
      ]),
      format: "short",
      expected: [ans(res)],
      comparator: "number_equal",
      explanation:
        "Définition : aire du parallélogramme $=$ base × hauteur ; $1$ ha $= 10\\,000\\ \\text{m}^2$, $1$ are $= 100\\ \\text{m}^2$.\n\n" +
        `Méthode : on calcule en ${U2("m")}, puis on convertit.\n\n` +
        `Calcul : $${tx(b)} \\times ${tx(h)} = ${tx(A)}\\ \\text{m}^2$, puis $${tx(A)} \\div ${enHa ? "10\\,000" : "100"} = ${tx(res)}$.\n\n` +
        `Conclusion : l’aire vaut ${N(res)} ${unite}.`,
    };
  }
  const o = randomChoice(PARA_OBJETS);
  const { b, h } = dimsPara(o);
  const u = o.u, U = U2(u);
  return {
    text: randomChoice([
      `${cap(un(o))} en forme de parallélogramme mesure ${lg(b, u)} de base pour ${lg(h, u)} de hauteur. Quelle surface occupe-t-${ilN(o)}, en ${U} ?`,
      `On doit recouvrir ${un(o)} en forme de parallélogramme (base ${lg(b, u)}, hauteur ${lg(h, u)}). Quelle surface faut-il recouvrir, en ${U} ?`,
      `${p} calcule la surface de ${son(o)}, un parallélogramme de base ${lg(b, u)} et de hauteur ${lg(h, u)}. Quel résultat obtient-${pr}, en ${U} ?`,
    ]),
    format: "short",
    expected: [ans(b * h)],
    comparator: "number_equal",
    explanation: explPara(b, h, u),
  };
}

/** ★4 — retrouver la hauteur ou la base d’un parallélogramme. */
function genParaInverse(): Q {
  const o = randomChoice(PARA_OBJETS);
  const { b, h } = dimsPara(o);
  const A = b * h;
  const u = o.u;
  const [p, pr] = randomChoice(PRENOMS);
  const chercheH = Math.random() < 0.6;
  const connu = chercheH ? b : h, cherche = chercheH ? h : b;
  const mc = chercheH ? "base" : "hauteur", mx = chercheH ? "hauteur" : "base";
  return {
    text: randomChoice([
      `${cap(un(o))} en forme de parallélogramme a une aire de ${ar(A, u)} et une ${mc} de ${lg(connu, u)}. Quelle est sa ${mx}, en ${u} ?`,
      `Un parallélogramme d’aire ${ar(A, u)} a une ${mc} de ${lg(connu, u)}. Calcule sa ${mx}.`,
      `${p} veut ${un(o)} en forme de parallélogramme de ${ar(A, u)}, avec une ${mc} de ${lg(connu, u)}. Quelle ${mx} doit-${pr} prévoir ?`,
      `Trouve la ${mx} ${dUn(o)} en forme de parallélogramme : aire ${ar(A, u)}, ${mc} ${lg(connu, u)}.`,
    ]),
    format: "short",
    expected: [ans(cherche)],
    comparator: "number_equal",
    explanation:
      "Définition : aire du parallélogramme $=$ base × hauteur.\n\n" +
      `Méthode : on divise l’aire par la ${mc}.\n\n` +
      `Calcul : $${tx(A)} \\div ${tx(connu)} = ${tx(cherche)}$.\n\n` +
      `Conclusion : la ${mx} mesure ${lg(cherche, u)}.`,
  };
}

/* ===========================================================================
   AIRE_FIGURE
=========================================================================== */

const DESSINS: readonly Nom[] = [
  { n: "dessin en pixels" }, { n: "mosaïque", f: true }, { n: "motif de carrelage" },
  { n: "plan de piscine" }, { n: "plan d’appartement" }, { n: "parcelle de jardin", f: true },
  { n: "logo" }, { n: "vitrail" }, { n: "tapis" }, { n: "dallage" },
  { n: "broderie", f: true }, { n: "fresque", f: true },
];

/** ★2 — compter les carreaux d’une forme (L, T, U, croix, escalier, cadre…). */
function genGrilleSimple(): Q {
  const f = formeGrille(["rectangle", "L", "T", "U", "croix", "escalier", "cadre"]);
  const o = randomChoice(DESSINS);
  const [p, pr] = randomChoice(PRENOMS);
  const [phrase, U] = randomChoice<[string, string]>([
    ["Chaque carreau a une aire de $1$ unité².", "unités²"],
    ["Chaque carreau est un carré de $1$ cm de côté.", U2("cm")],
    [`Chaque carreau représente $1\\ \\text{m}^2$.`, U2("m")],
  ]);
  const n = f.cells.length;
  return {
    text: randomChoice([
      `${cap(un(o))} dessiné${eF(o)} sur un quadrillage a la forme ${f.dUne}. ${phrase} Quelle est son aire, en ${U} ?`,
      `${phrase} Combien ${deU(U)} couvre ${le(o)} ci-contre ?`,
      `Calcule l’aire ${duN(o)} ci-contre, en forme ${f.deForme}. ${phrase} Réponds en ${U}.`,
      `${p} a dessiné ${un(o)} en forme ${f.deForme} sur du papier quadrillé. ${phrase} Quelle aire trouve-t-${pr}, en ${U} ?`,
    ]),
    format: "short",
    expected: [String(n)],
    comparator: "number_equal",
    explanation:
      "Définition : l’aire d’une figure tracée sur un quadrillage est le nombre de carreaux unité qu’elle recouvre.\n\n" +
      "Méthode : on compte les carreaux ligne par ligne (ou on découpe en rectangles), sans en oublier ni en compter deux fois.\n\n" +
      `Calcul : la figure contient $${n}$ carreaux.\n\n` +
      `Conclusion : l’aire vaut $${n}$ ${U}.`,
    canvas: figureLibreFromCells(f.rows, f.cols, f.cells, false),
  };
}

const PLANS: readonly Nom[] = [
  { n: "plan d’appartement" }, { n: "plan de piscine" }, { n: "plan de jardin" }, { n: "plan de parking" },
  { n: "plan de camping" }, { n: "plan de cour d’école" }, { n: "plan de salle de sport" },
  { n: "plan de potager" }, { n: "plan de halle de marché" }, { n: "plan de place" },
];

/** ★3 — quadrillage à l’échelle : un carreau vaut c × c. */
function genGrilleEchelle(sortes: readonly string[]): Q {
  const f = formeGrille(sortes);
  const o = randomChoice(PLANS);
  const [c, u] = randomChoice<[number, string]>([[2, "m"], [3, "m"], [5, "m"], [10, "m"], [5, "cm"], [2, "cm"]]);
  const n = f.cells.length;
  const A = n * c * c;
  const [p, pr] = randomChoice(PRENOMS);
  return {
    text: randomChoice([
      `Sur ce ${o.n}, chaque carreau est un carré de ${lg(c, u)} de côté. Quelle est l’aire de la figure en forme ${f.deForme}, en ${U2(u)} ?`,
      `Un ${o.n} est dessiné sur un quadrillage dont les carreaux mesurent ${lg(c, u)} de côté. Calcule l’aire de la zone coloriée, en ${U2(u)}.`,
      `${p} lit un ${o.n} : un carreau représente un carré de ${lg(c, u)} sur ${lg(c, u)}. Quelle aire trouve-t-${pr} pour la figure en forme ${f.deForme}, en ${U2(u)} ?`,
      `Chaque carreau de ce ${o.n} mesure ${lg(c, u)} de côté. Combien de ${U2(u)} couvre la partie coloriée ?`,
    ]),
    format: "short",
    expected: [ans(A)],
    comparator: "number_equal",
    explanation:
      "Définition : un carreau de côté c a une aire c × c ; l’aire de la figure est le nombre de carreaux × l’aire d’un carreau.\n\n" +
      `Méthode : on compte $${n}$ carreaux ; un carreau vaut $${c} \\times ${c} = ${c * c}$ ${U2(u)}.\n\n` +
      `Calcul : $${n} \\times ${c * c} = ${tx(A)}$.\n\n` +
      `Conclusion : l’aire vaut ${ar(A, u)} (⚠️ pas ${ar(n * c, u)} : un carreau de ${lg(c, u)} de côté ne vaut pas ${ar(c, u)}).`,
    canvas: figureLibreFromCells(f.rows, f.cols, f.cells, false),
  };
}

const EN_L: readonly (Nom & { u: string; m: number })[] = [
  { n: "salon en L", u: "m", m: 1 }, { n: "piscine en L", f: true, u: "m", m: 1 },
  { n: "jardin en L", u: "m", m: 2 }, { n: "terrasse en L", f: true, u: "m", m: 1 },
  { n: "plan de travail en L", u: "cm", m: 20 }, { n: "bureau d’angle", u: "cm", m: 20 },
  { n: "cour en L", f: true, u: "m", m: 3 }, { n: "parking en L", u: "m", m: 5 },
  { n: "appartement en L", v: true, u: "m", m: 2 }, { n: "canapé d’angle", u: "cm", m: 20 },
  { n: "atelier en L", v: true, u: "m", m: 1 }, { n: "potager en L", u: "m", m: 1 },
];

/** ★3 — deux rectangles accolés (dimensions dans le texte). */
function genDeuxRectangles(): Q {
  const o = randomChoice(EN_L);
  const m = o.m, u = o.u, U = U2(u);
  const a = randomInt(3, 6) * m, b = randomInt(2, 4) * m;
  const c = randomInt(2, 5) * m;
  const d0 = Math.random() < 0.3 ? c : randomInt(2, 4) * m;
  const carreBis = d0 === c; // un « rectangle de 8 m sur 8 m » se dit « un carré »
  const d = d0;
  const A = a * b + c * d;
  const [p, pr] = randomChoice(PRENOMS);
  const deuxieme = carreBis ? `un carré de ${lg(c, u)} de côté` : `un rectangle de ${lg(c, u)} sur ${lg(d, u)}`;
  return {
    text: randomChoice([
      `${cap(un(o))} se découpe en un rectangle de ${lg(a, u)} sur ${lg(b, u)} et ${deuxieme}. Quelle est son aire totale, en ${U} ?`,
      `On partage ${le(o)} en deux morceaux : un rectangle de ${lg(a, u)} × ${lg(b, u)} et ${deuxieme}. Calcule son aire, en ${U}.`,
      `${p} mesure ${son(o)} : un rectangle de ${lg(a, u)} sur ${lg(b, u)}, collé à ${deuxieme}. Quelle surface trouve-t-${pr} en tout, en ${U} ?`,
      `Quelle est l’aire, en ${U}, ${dUn(o)} formé${eF(o)} d’un rectangle de ${lg(a, u)} sur ${lg(b, u)} et ${deuxieme.replace(/^un /, "d’un ")} ?`,
    ]),
    format: "short",
    expected: [ans(A)],
    comparator: "number_equal",
    explanation:
      "Définition : l’aire d’une figure composée est la somme des aires des morceaux qui ne se chevauchent pas.\n\n" +
      `Méthode : on calcule chaque aire, puis on additionne.\n\n` +
      `Calcul : $${tx(a)} \\times ${tx(b)} + ${tx(c)} \\times ${tx(d)} = ${tx(a * b)} + ${tx(c * d)} = ${tx(A)}$.\n\n` +
      `Conclusion : l’aire totale vaut ${ar(A, u)}.`,
  };
}

type Trou = { o: Nom; sorte: "carre" | "rect" | "tri"; a: R; b?: R };
const DIFFERENCES: readonly { grand: Nom; u: string; L: R; l: R; action: string; trou: Trou }[] = [
  { grand: { n: "mur" }, u: "m", L: [4, 7, 1], l: [2, 3, 1], action: "peindre", trou: { o: { n: "fenêtre", f: true }, sorte: "rect", a: [1, 2, 1], b: [1, 1, 1] } },
  { grand: { n: "façade", f: true }, u: "m", L: [8, 12, 1], l: [5, 7, 1], action: "repeindre", trou: { o: { n: "porte de garage", f: true }, sorte: "rect", a: [3, 3, 1], b: [2, 2, 1] } },
  { grand: { n: "jardin" }, u: "m", L: [12, 20, 1], l: [8, 12, 1], action: "engazonner", trou: { o: { n: "bassin" }, sorte: "carre", a: [2, 4, 1] } },
  { grand: { n: "terrain" }, u: "m", L: [20, 30, 2], l: [15, 20, 1], action: "engazonner", trou: { o: { n: "maison", f: true }, sorte: "rect", a: [8, 12, 1], b: [6, 9, 1] } },
  { grand: { n: "cour", f: true }, u: "m", L: [15, 25, 1], l: [10, 15, 1], action: "goudronner", trou: { o: { n: "massif" }, sorte: "tri", a: [4, 6, 2], b: [3, 5, 1] } },
  { grand: { n: "plaque de bois", f: true }, u: "cm", L: [40, 60, 10], l: [30, 40, 10], action: "vernir", trou: { o: { n: "trou" }, sorte: "carre", a: [5, 10, 1] } },
  { grand: { n: "plan de travail" }, u: "cm", L: [200, 240, 20], l: [60, 60, 1], action: "carreler", trou: { o: { n: "évier", v: true }, sorte: "rect", a: [50, 60, 10], b: [40, 40, 1] } },
  { grand: { n: "feuille de carton", f: true }, u: "cm", L: [30, 40, 5], l: [20, 30, 5], action: "peindre", trou: { o: { n: "fenêtre", f: true }, sorte: "tri", a: [6, 10, 2], b: [5, 8, 1] } },
  { grand: { n: "salle", f: true }, u: "m", L: [8, 12, 1], l: [6, 8, 1], action: "couvrir de lino", trou: { o: { n: "estrade", f: true, v: true }, sorte: "carre", a: [2, 3, 1] } },
  { grand: { n: "parking" }, u: "m", L: [30, 50, 5], l: [20, 30, 5], action: "goudronner", trou: { o: { n: "îlot de verdure", v: true }, sorte: "tri", a: [6, 10, 2], b: [4, 6, 1] } },
  { grand: { n: "pelouse", f: true }, u: "m", L: [15, 25, 1], l: [10, 15, 1], action: "tondre", trou: { o: { n: "piscine", f: true }, sorte: "rect", a: [8, 10, 1], b: [4, 5, 1] } },
  { grand: { n: "cadre photo" }, u: "cm", L: [20, 30, 2], l: [16, 24, 2], action: "vernir", trou: { o: { n: "photo", f: true }, sorte: "rect", a: [0, 0, 1], b: [0, 0, 1] } },
];

/** ★4 — grand rectangle MOINS un trou (carré, rectangle ou triangle). */
function genDifference(): Q {
  const x = randomChoice(DIFFERENCES);
  const L = pick(x.L), l = pick(x.l), u = x.u, U = U2(u);
  const t = x.trou;
  let aire: number, desc: string, calc: string;
  if (x.grand.n === "cadre photo") {
    const a = L - 4, b = l - 4;
    aire = a * b;
    desc = `rectangulaire de ${lg(a, u)} sur ${lg(b, u)}`;
    calc = `$${tx(a)} \\times ${tx(b)} = ${tx(aire)}$`;
  } else if (t.sorte === "carre") {
    const a = pick(t.a);
    aire = a * a;
    desc = `${carre(t.o)} de ${lg(a, u)} de côté`;
    calc = `$${tx(a)} \\times ${tx(a)} = ${tx(aire)}$`;
  } else if (t.sorte === "rect") {
    const a = pick(t.a), b = pick(t.b!);
    aire = a * b;
    desc = `rectangulaire de ${lg(a, u)} sur ${lg(b, u)}`;
    calc = `$${tx(a)} \\times ${tx(b)} = ${tx(aire)}$`;
  } else {
    const a = pick(t.a), b = pick(t.b!);
    aire = (a * b) / 2;
    desc = `triangulaire de base ${lg(a, u)} et de hauteur ${lg(b, u)}`;
    calc = `$\\dfrac{${tx(a)} \\times ${tx(b)}}{2} = ${tx(aire)}$`;
  }
  const A = L * l - aire;
  const [p, pr] = randomChoice(PRENOMS);
  const g = x.grand;
  return {
    text: randomChoice([
      `On veut ${x.action} ${un(g)} rectangulaire de ${lg(L, u)} sur ${lg(l, u)}, sauf ${un(t.o)} ${desc}. Quelle surface faut-il ${x.action}, en ${U} ?`,
      `${cap(un(g))} rectangulaire mesure ${lg(L, u)} sur ${lg(l, u)}. On y trouve ${un(t.o)} ${desc}. Quelle aire reste-t-il à ${x.action}, en ${U} ?`,
      `${p} doit ${x.action} ${le(g)} : un rectangle de ${lg(L, u)} sur ${lg(l, u)}, dont il faut retirer ${un(t.o)} ${desc}. Quelle aire trouve-t-${pr}, en ${U} ?`,
      `Calcule, en ${U}, l’aire ${duN(g)} rectangulaire de ${lg(L, u)} sur ${lg(l, u)}, privé${eF(g)} ${dUn(t.o)} ${desc}.`,
    ]),
    format: "short",
    expected: [ans(A)],
    comparator: "number_equal",
    explanation:
      "Définition : l’aire d’une figure trouée est l’aire de la grande figure MOINS l’aire du trou.\n\n" +
      `Méthode : grand rectangle $${tx(L)} \\times ${tx(l)} = ${tx(L * l)}$ ; ${t.o.n} : ${calc}.\n\n` +
      `Calcul : $${tx(L * l)} - ${tx(aire)} = ${tx(A)}$.\n\n` +
      `Conclusion : la surface cherchée vaut ${ar(A, u)}.`,
  };
}

/** ★4 — figures composées avec triangle, trapèze ou demi-disque. */
function genComposeeCourbe(): Q {
  const mode = randomInt(0, 2);
  const [p, pr] = randomChoice(PRENOMS);
  if (mode === 0) {
    // Façade : rectangle + triangle (pignon).
    const o = randomChoice<Nom & { u: string; m: number }>([
      { n: "façade de maison", f: true, u: "m", m: 1 }, { n: "façade de cabane", f: true, u: "m", m: 1 },
      { n: "panneau en forme de flèche", u: "dm", m: 1 }, { n: "nichoir", u: "cm", m: 5 },
      { n: "façade de grange", f: true, u: "m", m: 2 }, { n: "étiquette en forme de maison", f: true, v: true, u: "cm", m: 2 },
    ]);
    const L = randomInt(3, 6) * 2 * o.m, hr = randomInt(2, 5) * o.m, ht = randomInt(1, 4) * o.m;
    const A = L * hr + (L * ht) / 2;
    const u = o.u, U = U2(u);
    return {
      text: randomChoice([
        `${cap(un(o))} est formé${eF(o)} d’un rectangle de ${lg(L, u)} de large et ${lg(hr, u)} de haut, surmonté d’un triangle de même base et de ${lg(ht, u)} de hauteur. Quelle est son aire, en ${U} ?`,
        `${p} doit peindre ${un(o)} : un rectangle de ${lg(L, u)} sur ${lg(hr, u)}, avec au-dessus un triangle de base ${lg(L, u)} et de hauteur ${lg(ht, u)}. Quelle surface trouve-t-${pr}, en ${U} ?`,
        `Calcule l’aire ${dUn(o)} composé${eF(o)} d’un rectangle (${lg(L, u)} × ${lg(hr, u)}) et d’un triangle posé dessus (base ${lg(L, u)}, hauteur ${lg(ht, u)}), en ${U}.`,
      ]),
      format: "short",
      expected: [ans(A)],
      comparator: "number_equal",
      explanation:
        "Définition : on découpe la figure en morceaux simples et on additionne leurs aires.\n\n" +
        `Méthode : rectangle $${tx(L)} \\times ${tx(hr)} = ${tx(L * hr)}$ ; triangle $\\dfrac{${tx(L)} \\times ${tx(ht)}}{2} = ${tx((L * ht) / 2)}$.\n\n` +
        `Calcul : $${tx(L * hr)} + ${tx((L * ht) / 2)} = ${tx(A)}$.\n\n` +
        `Conclusion : l’aire vaut ${ar(A, u)}.`,
    };
  }
  if (mode === 1) {
    // Trapèze rectangle = rectangle + triangle rectangle.
    const o = randomChoice<Nom & { u: string; m: number }>([
      { n: "parcelle", f: true, u: "m", m: 2 }, { n: "champ", u: "m", m: 10 }, { n: "plate-bande", f: true, u: "m", m: 1 },
      { n: "pan de toit", u: "m", m: 1 }, { n: "étagère d’angle", f: true, v: true, u: "cm", m: 10 }, { n: "terrain", u: "m", m: 5 },
    ]);
    const b = randomInt(2, 6) * o.m, ecart = randomInt(1, 4) * 2 * o.m, h = randomInt(2, 5) * o.m;
    const B = b + ecart;
    const A = b * h + (ecart * h) / 2;
    const u = o.u, U = U2(u);
    const nom = randomChoice(NOMS4);
    return {
      text: randomChoice([
        `${cap(un(o))} a la forme du trapèze rectangle ${nom} ci-contre. Découpe-le en un rectangle et un triangle pour calculer son aire, en ${U}.`,
        `${nom} est un trapèze rectangle : bases ${lg(B, u)} et ${lg(b, u)}, hauteur ${lg(h, u)}. Quelle est son aire, en ${U} ?`,
        `${p} calcule l’aire de ${son(o)}, qui a la forme du trapèze ${nom}. Quel résultat doit-${pr} trouver, en ${U} ?`,
      ]),
      format: "short",
      expected: [ans(A)],
      comparator: "number_equal",
      explanation:
        "Définition : un trapèze rectangle se découpe en un rectangle et un triangle rectangle.\n\n" +
        `Méthode : rectangle $${tx(b)} \\times ${tx(h)} = ${tx(b * h)}$ ; triangle de base $${tx(B)} - ${tx(b)} = ${tx(ecart)}$ et de hauteur $${tx(h)}$ : $\\dfrac{${tx(ecart)} \\times ${tx(h)}}{2} = ${tx((ecart * h) / 2)}$.\n\n` +
        `Calcul : $${tx(b * h)} + ${tx((ecart * h) / 2)} = ${tx(A)}$.\n\n` +
        `Conclusion : l’aire vaut ${ar(A, u)}.`,
      canvas: trapezeCanvas(B, b, h, u, nom),
    };
  }
  // Rectangle + demi-disque, arrondi à l’unité.
  const o = randomChoice<Nom & { u: string; r: R; L: R }>([
    { n: "table", f: true, u: "cm", r: [40, 60, 10], L: [100, 160, 20] },
    { n: "bassin", u: "m", r: [2, 4, 1], L: [6, 10, 1] },
    { n: "scène", f: true, u: "m", r: [3, 5, 1], L: [8, 14, 2] },
    { n: "fenêtre cintrée", f: true, u: "cm", r: [40, 60, 10], L: [100, 140, 20] },
    { n: "terrain de sport", u: "m", r: [10, 20, 5], L: [40, 80, 10] },
    { n: "massif de fleurs", u: "m", r: [1, 3, 1], L: [4, 8, 1] },
  ]);
  // Le demi-disque est collé sur le PETIT côté : la longueur doit dépasser le diamètre.
  const r = pick(o.r);
  let L = pick(o.L);
  while (L <= 2 * r) L = pick(o.L);
  const exact = L * 2 * r + (Math.PI * r * r) / 2;
  const avec314 = L * 2 * r + (3.14 * r * r) / 2;
  const u = o.u, U = U2(u);
  return {
    text: randomChoice([
      `${cap(un(o))} est formé${eF(o)} d’un rectangle de ${lg(L, u)} sur ${lg(2 * r, u)}, terminé par un demi-disque de ${lg(2 * r, u)} de diamètre. Quelle est son aire, arrondie à l’unité, en ${U} ?`,
      `Calcule l’aire ${dUn(o)} composé${eF(o)} d’un rectangle (${lg(L, u)} × ${lg(2 * r, u)}) et d’un demi-disque de rayon ${lg(r, u)} collé sur le petit côté. Arrondis à l’unité, en ${U}.`,
      `${p} mesure ${un(o)} : un rectangle de ${lg(L, u)} de long et ${lg(2 * r, u)} de large, plus un demi-disque de rayon ${lg(r, u)}. Quelle aire trouve-t-${pr}, arrondie à l’unité, en ${U} ?`,
    ]),
    format: "short",
    expected: Array.from(new Set([String(Math.round(exact)), String(Math.round(avec314))])),
    comparator: "number_equal",
    explanation:
      "Définition : aire d’un disque $= \\pi \\times r^2$ ; un demi-disque en vaut la moitié.\n\n" +
      `Méthode : rectangle $${tx(L)} \\times ${tx(2 * r)} = ${tx(L * 2 * r)}$ ; demi-disque $\\dfrac{\\pi \\times ${tx(r)}^2}{2} \\approx ${tx(Math.round(((Math.PI * r * r) / 2) * 10) / 10)}$.\n\n` +
      `Calcul : $${tx(L * 2 * r)} + ${tx(Math.round(((Math.PI * r * r) / 2) * 10) / 10)} \\approx ${tx(Math.round(exact * 10) / 10)}$.\n\n` +
      `Conclusion : l’aire vaut environ ${ar(Math.round(exact), u)}.`,
  };
}

/* ===========================================================================
   AIRE_PROBLEME
=========================================================================== */

const M2 = U2("m");
type Surf = { desc: string; A: number; calc: string };
const sRect = (gn: string, L: number, l: number): Surf => ({
  desc: `${gn} rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")}`,
  A: L * l,
  calc: `$${tx(L)} \\times ${tx(l)} = ${tx(L * l)}$`,
});
const sCarre = (gn: string, f: boolean, c: number): Surf => ({
  desc: `${gn} ${f ? "carrée" : "carré"} de ${lg(c, "m")} de côté`,
  A: c * c,
  calc: `$${tx(c)} \\times ${tx(c)} = ${tx(c * c)}$`,
});
const sTri = (gn: string, b: number, h: number): Surf => ({
  desc: `${gn} triangulaire de ${lg(b, "m")} de base et ${lg(h, "m")} de hauteur`,
  A: (b * h) / 2,
  calc: `$\\dfrac{${tx(b)} \\times ${tx(h)}}{2} = ${tx((b * h) / 2)}$`,
});
const sPara = (gn: string, b: number, h: number): Surf => ({
  desc: `${gn} en forme de parallélogramme, de base ${lg(b, "m")} et de hauteur ${lg(h, "m")}`,
  A: b * h,
  calc: `$${tx(b)} \\times ${tx(h)} = ${tx(b * h)}$`,
});
const pair = (a: number, b: number) => 2 * randomInt(a / 2, b / 2);

const PEINTURES: readonly (() => { desc: string; A: number; calc: string })[] = [
  () => { const L = randomInt(3, 6), h = randomChoice([2.5, 3]); return { desc: `un mur de chambre de ${lg(L, "m")} de long et ${lg(h, "m")} de haut`, A: L * h, calc: `$${tx(L)} \\times ${tx(h)} = ${tx(L * h)}$` }; },
  () => { const L = randomInt(3, 5), l = randomInt(3, 4); return { desc: `le plafond d’une pièce rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")}`, A: L * l, calc: `$${tx(L)} \\times ${tx(l)} = ${tx(L * l)}$` }; },
  () => { const l = randomChoice([0.8, 0.9]); return { desc: `les deux faces d’une porte de ${lg(2, "m")} de haut et ${lg(l, "m")} de large`, A: 2 * 2 * l, calc: `$2 \\times ${tx(2)} \\times ${tx(l)} = ${tx(4 * l)}$` }; },
  () => { const L = randomInt(10, 20), h = randomChoice([1.5, 2]); return { desc: `une palissade de ${lg(L, "m")} de long et ${lg(h, "m")} de haut (une seule face)`, A: L * h, calc: `$${tx(L)} \\times ${tx(h)} = ${tx(L * h)}$` }; },
  () => { const L = randomInt(3, 5), l = randomInt(3, 4), h = 2.5; return { desc: `les quatre murs d’une pièce de ${lg(L, "m")} sur ${lg(l, "m")}, hauts de ${lg(h, "m")} (sans ouverture)`, A: 2 * (L + l) * h, calc: `$2 \\times (${tx(L)} + ${tx(l)}) \\times ${tx(h)} = ${tx(2 * (L + l) * h)}$` }; },
  () => { const L = randomInt(4, 8), h = randomInt(2, 3); return { desc: `la façade rectangulaire d’un garage de ${lg(L, "m")} sur ${lg(h, "m")}`, A: L * h, calc: `$${tx(L)} \\times ${tx(h)} = ${tx(L * h)}$` }; },
  () => { const b = pair(4, 8), h = randomInt(2, 4); return { desc: `le pignon d’une maison : un triangle de ${lg(b, "m")} de base et ${lg(h, "m")} de hauteur`, A: (b * h) / 2, calc: `$\\dfrac{${tx(b)} \\times ${tx(h)}}{2} = ${tx((b * h) / 2)}$` }; },
  () => { const L = randomChoice([1.5, 2, 2.5]); return { desc: `deux volets rectangulaires de ${lg(L, "m")} sur ${lg(1, "m")}, une seule face chacun`, A: 2 * L, calc: `$2 \\times ${tx(L)} \\times 1 = ${tx(2 * L)}$` }; },
];

/** ★3 — la surface à peindre. */
function genPeinture(): Q {
  const s = randomChoice(PEINTURES)();
  const [p, pr] = randomChoice(PRENOMS);
  return {
    text: randomChoice([
      `On repeint ${s.desc}. Quelle surface faut-il peindre, en ${M2} ?`,
      `${p} veut peindre ${s.desc}. Quelle aire doit-${pr} couvrir, en ${M2} ?`,
      `Pour acheter la peinture, il faut connaître la surface à peindre : ${s.desc}. Combien de ${M2} cela fait-il ?`,
    ]),
    format: "short",
    expected: [ans(s.A)],
    comparator: "number_equal",
    explanation:
      "Définition : la peinture recouvre une SURFACE : on calcule une aire.\n\n" +
      "Méthode : on repère les rectangles (ou triangles) à peindre et on additionne leurs aires.\n\n" +
      `Calcul : ${s.calc}.\n\n` +
      `Conclusion : il faut peindre ${ar(s.A, "m")}.`,
  };
}

/** ★3 — triangles de la vie réelle (voile, pignon, parcelle, rampe…). */
function genTriReel(): Q {
  if (Math.random() < 0.3) {
    const o = randomChoice<Nom>([{ n: "rampe", f: true }, { n: "parcelle", f: true }, { n: "voile", f: true }, { n: "coin de terrasse" }, { n: "toit d’abri" }, { n: "massif d’angle" }]);
    const [a0, b0, c0] = randomChoice(TRIPLETS);
    const k = randomChoice([1, 2]);
    const a = a0 * k, b = b0 * k, c = c0 * k;
    const [p, pr] = randomChoice(PRENOMS);
    return {
      text: randomChoice([
        `${cap(un(o))} a la forme d’un triangle rectangle : ${lg(a, "m")} et ${lg(b, "m")} pour les côtés de l’angle droit, ${lg(c, "m")} pour le troisième côté. Quelle est sa surface, en ${M2} ?`,
        `${p} mesure ${un(o)} en triangle rectangle : côtés de ${lg(a, "m")}, ${lg(b, "m")} et ${lg(c, "m")}. Quelle aire doit-${pr} trouver, en ${M2} ?`,
      ]),
      format: "short",
      expected: [ans((a * b) / 2)],
      comparator: "number_equal",
      explanation: explTri(a, b, "m", ` Dans un triangle rectangle, les côtés de l’angle droit servent de base et de hauteur ; le plus grand côté (${lg(c, "m")}) ne sert pas.`),
    };
  }
  const o = randomChoice(TRI_OBJETS.filter((x) => x.u === "m"));
  const b = pick(o.b), h = pick(o.h);
  const [p, pr] = randomChoice(PRENOMS);
  return {
    text: randomChoice([
      `${cap(un(o))} triangulaire a une base de ${lg(b, "m")} et une hauteur de ${lg(h, "m")}. Quelle est sa surface, en ${M2} ?`,
      `${p} doit recouvrir ${un(o)} triangulaire (base ${lg(b, "m")}, hauteur ${lg(h, "m")}). Quelle surface doit-${pr} recouvrir, en ${M2} ?`,
      `Quelle surface occupe ${un(o)} triangulaire de ${lg(b, "m")} de base et ${lg(h, "m")} de hauteur, en ${M2} ?`,
      `On veut traiter ${un(o)} triangulaire : base ${lg(b, "m")}, hauteur ${lg(h, "m")}. Combien de ${M2} faut-il traiter ?`,
    ]),
    format: "short",
    expected: [ans((b * h) / 2)],
    comparator: "number_equal",
    explanation: explTri(b, h, "m"),
  };
}

const GRANDS_TERRAINS: readonly Nom[] = [
  { n: "champ de blé" }, { n: "vigne", f: true }, { n: "verger" }, { n: "prairie", f: true },
  { n: "parcelle de forêt", f: true }, { n: "terrain de camping" }, { n: "parc" },
  { n: "champ de canne à sucre" }, { n: "champ de tournesols" }, { n: "pâturage" },
];

/** ★3 — grands rectangles : m², ares ou hectares. */
function genChampHectares(): Q {
  const o = randomChoice(GRANDS_TERRAINS);
  const L = randomChoice([100, 150, 200, 250, 300, 400]), l = randomChoice([50, 100, 120, 150, 200]);
  const A = L * l;
  const unite = randomChoice(["ha", "ares", "m"]);
  const res = unite === "ha" ? A / 10000 : unite === "ares" ? A / 100 : A;
  const U = unite === "m" ? M2 : unite;
  const [p] = randomChoice(PRENOMS);
  return {
    text: randomChoice([
      `${cap(un(o))} rectangulaire mesure ${lg(L, "m")} sur ${lg(l, "m")}. Quelle est sa superficie, en ${U} ?`,
      `${p} hérite ${dUn(o)} rectangulaire de ${lg(L, "m")} de long et ${lg(l, "m")} de large. Combien ${deU(U)} cela représente-t-il ?`,
      `Exprime en ${U} la superficie ${dUn(o)} rectangulaire de ${lg(l, "m")} sur ${lg(L, "m")}.`,
      `Un agriculteur mesure ${un(o)} : un rectangle de ${lg(L, "m")} sur ${lg(l, "m")}. Quelle surface trouve-t-il, en ${U} ?`,
    ]),
    format: "short",
    expected: [ans(res)],
    comparator: "number_equal",
    explanation:
      "Définition : aire du rectangle $=$ longueur × largeur ; $1$ are $= 100\\ \\text{m}^2$ et $1$ ha $= 10\\,000\\ \\text{m}^2$.\n\n" +
      `Méthode : on calcule en ${M2}${unite === "m" ? "" : ", puis on convertit"}.\n\n` +
      `Calcul : $${tx(L)} \\times ${tx(l)} = ${tx(A)}\\ \\text{m}^2$${unite === "ha" ? ` ; $${tx(A)} \\div 10\\,000 = ${tx(res)}$` : unite === "ares" ? ` ; $${tx(A)} \\div 100 = ${tx(res)}$` : ""}.\n\n` +
      `Conclusion : la superficie vaut ${N(res)} ${U}.`,
  };
}

const PRODUITS: readonly {
  action: string;
  phrase: (q: number) => string;
  pour: (q: number) => string;
  question: string;
  unite: string;
  q: readonly number[];
  surfs: readonly (() => Surf)[];
}[] = [
  {
    action: "semer du gazon sur", unite: "g", q: [25, 30, 35, 40, 50],
    phrase: (q) => `Il faut ${N(q)} g de graines par ${M2}`, pour: (q) => `${N(q)} g de graines`,
    question: "Combien de grammes de graines faut-il en tout ?",
    surfs: [() => sRect("une pelouse", randomInt(6, 15), randomInt(4, 8)), () => sCarre("un jardin", false, randomInt(5, 12)), () => sTri("une parcelle", pair(8, 20), randomInt(5, 12)), () => sPara("un terrain", randomInt(8, 16), randomInt(5, 10))],
  },
  {
    action: "fertiliser", unite: "g", q: [20, 40, 50, 60],
    phrase: (q) => `On répand ${N(q)} g d’engrais par ${M2}`, pour: (q) => `${N(q)} g d’engrais`,
    question: "Quelle masse d’engrais faut-il, en grammes ?",
    surfs: [() => sRect("un potager", randomInt(4, 10), randomInt(2, 5)), () => sCarre("un verger", false, randomInt(10, 20)), () => sTri("un massif", pair(4, 8), randomInt(3, 6))],
  },
  {
    action: "planter des salades dans", unite: "salades", q: [4, 5, 6, 8, 9],
    phrase: (q) => `On plante ${N(q)} salades par ${M2}`, pour: (q) => `${N(q)} salades`,
    question: "Combien de salades faut-il ?",
    surfs: [() => sRect("un potager", randomInt(3, 8), randomInt(2, 4)), () => sCarre("une plate-bande", true, randomInt(2, 4)), () => sPara("une plate-bande", randomInt(4, 8), randomInt(2, 3))],
  },
  {
    action: "récupérer la pluie tombée sur", unite: "L", q: [8, 10, 12, 15, 20],
    phrase: (q) => `Lors d’un orage, il tombe ${N(q)} L d’eau par ${M2}`, pour: (q) => `${N(q)} L d’eau de pluie`,
    question: "Combien de litres d’eau tombent sur cette surface ?",
    surfs: [() => sRect("un toit", randomInt(8, 12), randomInt(5, 8)), () => sCarre("une terrasse", true, randomInt(4, 8)), () => sTri("une cour", pair(10, 20), randomInt(6, 10))],
  },
  {
    action: "couvrir de panneaux solaires", unite: "kWh", q: [150, 180, 200, 220],
    phrase: (q) => `Les panneaux produisent ${N(q)} kWh par ${M2} et par an`, pour: (q) => `une production de ${N(q)} kWh par an`,
    question: "Quelle énergie les panneaux produisent-ils en un an, en kWh ?",
    surfs: [() => sRect("un toit", randomInt(6, 10), randomInt(4, 6)), () => sRect("une ombrière de parking", randomInt(10, 20), 5), () => sCarre("un toit-terrasse", false, randomInt(5, 8))],
  },
  {
    action: "pailler", unite: "L", q: [5, 6, 8, 10],
    phrase: (q) => `On compte ${N(q)} L de paillis par ${M2}`, pour: (q) => `${N(q)} L de paillis`,
    question: "Combien de litres de paillis faut-il ?",
    surfs: [() => sTri("un massif", pair(4, 8), randomInt(2, 5)), () => sRect("une plate-bande", randomInt(4, 10), randomInt(1, 2)), () => sPara("un talus", randomInt(6, 10), randomInt(2, 4))],
  },
  {
    action: "daller", unite: "dalles", q: [4, 9, 16, 25],
    phrase: (q) => `Il faut ${N(q)} dalles par ${M2}`, pour: (q) => `${N(q)} dalles`,
    question: "Combien de dalles faut-il en tout ?",
    surfs: [() => sRect("une terrasse", randomInt(4, 8), randomInt(3, 5)), () => sCarre("une cour", true, randomInt(5, 9)), () => sPara("une allée", randomInt(6, 12), randomInt(1, 2))],
  },
];

/** ★4 — aire × quantité par m². */
function genQuantiteParM2(): Q {
  const x = randomChoice(PRODUITS);
  const s = randomChoice(x.surfs)();
  const q = randomChoice(x.q);
  const total = s.A * q;
  const [p] = randomChoice(PRENOMS);
  return {
    text: randomChoice([
      `On veut ${x.action} ${s.desc}. ${x.phrase(q)}. ${x.question}`,
      `${p} veut ${x.action} ${s.desc}. ${x.phrase(q)}. ${x.question}`,
      `Pour ${x.action} ${s.desc}, on compte ${x.pour(q)} par ${M2}. ${x.question}`,
      `Voici ${s.desc}. ${x.phrase(q)}. ${x.question}`,
    ]),
    format: "short",
    expected: [ans(total)],
    comparator: "number_equal",
    explanation:
      "Définition : quand une quantité est donnée « par m² », la quantité totale vaut l’aire × la quantité par m².\n\n" +
      `Méthode : on calcule d’abord l’aire : ${s.calc} ${M2}.\n\n` +
      `Calcul : $${tx(s.A)} \\times ${tx(q)} = ${tx(total)}$.\n\n` +
      `Conclusion : on obtient ${N(total)} ${x.unite}.`,
  };
}

const MATERIAUX: readonly { prix: (p: number) => string; action: string; p: readonly number[]; surfs: readonly (() => Surf)[] }[] = [
  { prix: (p) => `La moquette coûte ${N(p)} € le ${M2}`, action: "poser de la moquette dans", p: [12, 15, 18, 20, 25], surfs: [() => sRect("une chambre", randomInt(3, 5), randomInt(3, 4)), () => sCarre("une salle de jeux", true, randomInt(4, 6))] },
  { prix: (p) => `Le parquet coûte ${N(p)} € le ${M2}`, action: "poser du parquet dans", p: [25, 30, 35, 40], surfs: [() => sRect("un salon", randomInt(5, 8), randomInt(4, 5)), () => sCarre("une chambre", true, randomInt(3, 4))] },
  { prix: (p) => `Le gazon en rouleaux coûte ${N(p)} € le ${M2}`, action: "dérouler du gazon sur", p: [5, 6, 7, 8], surfs: [() => sRect("une pelouse", randomInt(8, 15), randomInt(5, 8)), () => sTri("un jardin", pair(10, 16), randomInt(6, 10))] },
  { prix: (p) => `Le carrelage coûte ${N(p)} € le ${M2}`, action: "carreler", p: [20, 25, 30, 35], surfs: [() => sRect("une cuisine", randomInt(3, 5), randomInt(2, 4)), () => sCarre("une salle de bain", true, randomInt(2, 3))] },
  { prix: (p) => `La toile coûte ${N(p)} € le ${M2}`, action: "fabriquer", p: [15, 20, 25, 30], surfs: [() => sTri("une voile", randomInt(2, 4), pair(4, 8)), () => sRect("un store", randomInt(2, 4), 2)] },
  { prix: (p) => `La bâche coûte ${N(p)} € le ${M2}`, action: "couvrir", p: [3, 4, 5, 6], surfs: [() => sRect("une piscine", randomInt(8, 10), randomInt(4, 5)), () => sCarre("un bassin", false, randomInt(3, 5))] },
  { prix: (p) => `Le terrain est vendu ${N(p)} € le ${M2}`, action: "acheter", p: [80, 100, 120, 150], surfs: [() => sRect("un terrain", randomInt(20, 30), randomInt(15, 20)), () => sPara("une parcelle", randomInt(20, 30), randomInt(10, 15))] },
  { prix: (p) => `Le verre coûte ${N(p)} € le ${M2}`, action: "poser", p: [40, 50, 60], surfs: [() => sRect("une baie vitrée", randomInt(2, 4), 2), () => sCarre("une verrière", true, randomInt(2, 3))] },
];

/** ★4 — aire × prix au m². */
function genPrixParM2(): Q {
  const x = randomChoice(MATERIAUX);
  const s = randomChoice(x.surfs)();
  const p = randomChoice(x.p);
  const total = s.A * p;
  const [pn, pr] = randomChoice(PRENOMS);
  return {
    text: randomChoice([
      `${x.prix(p)}. Quel est le prix à payer pour ${x.action} ${s.desc} ?`,
      `${pn} veut ${x.action} ${s.desc}. ${x.prix(p)}. Combien va-t-${pr} payer, en € ?`,
      `Pour ${x.action} ${s.desc}, on paie ${N(p)} € par ${M2}. Quel est le coût total, en € ?`,
    ]),
    format: "short",
    expected: [ans(total)],
    comparator: "number_equal",
    explanation:
      "Définition : le coût vaut l’aire × le prix d’un mètre carré.\n\n" +
      `Méthode : aire : ${s.calc} ${M2}.\n\n` +
      `Calcul : $${tx(s.A)} \\times ${tx(p)} = ${tx(total)}$.\n\n` +
      `Conclusion : le coût est de ${N(total)} €.`,
  };
}

/** ★5 — combien d’objets ? (division exacte, ou arrondi au-dessus). */
function genNombreObjets(): Q {
  const mode = randomInt(0, 5);
  const [p] = randomChoice(PRENOMS);
  const fin = (q: string) => randomChoice([q, `${p} veut savoir : ${q.charAt(0).toLowerCase()}${q.slice(1)}`]);
  if (mode === 0) {
    const lieu = randomChoice<Nom>([{ n: "cuisine", f: true }, { n: "salle de bain", f: true }, { n: "terrasse", f: true }, { n: "garage" }, { n: "entrée", f: true, v: true }, { n: "couloir" }]);
    const L = randomInt(2, 6), l = randomInt(1, 4), t = randomChoice([20, 25, 50]);
    const nb = ((L * 100) / t) * ((l * 100) / t);
    return {
      text: `${cap(un(lieu))} rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")} est carrelé${eF(lieu)} avec des dalles carrées de ${lg(t, "cm")} de côté, sans découpe. ${fin("Combien faut-il de dalles ?")}`,
      format: "short",
      expected: [ans(nb)],
      comparator: "number_equal",
      explanation:
        "Définition : nombre de dalles $=$ aire à couvrir ÷ aire d’une dalle (ou dalles en longueur × dalles en largeur).\n\n" +
        `Méthode : ${lg(L, "m")} $=$ ${lg(L * 100, "cm")} et ${lg(l, "m")} $=$ ${lg(l * 100, "cm")} ; on place $${tx((L * 100) / t)}$ dalles en longueur et $${tx((l * 100) / t)}$ en largeur.\n\n` +
        `Calcul : $${tx((L * 100) / t)} \\times ${tx((l * 100) / t)} = ${tx(nb)}$.\n\n` +
        `Conclusion : il faut ${N(nb)} dalles.`,
    };
  }
  if (mode === 1) {
    const L = randomInt(3, 10) * 2, l = randomInt(2, 6);
    return {
      text: `Un toit plat rectangulaire de ${lg(L, "m")} sur ${lg(l, "m")} reçoit des panneaux solaires de ${lg(2, "m")} sur ${lg(1, "m")}, posés côte à côte sans perte de place. ${fin("Combien de panneaux peut-on poser ?")}`,
      format: "short",
      expected: [ans((L * l) / 2)],
      comparator: "number_equal",
      explanation:
        "Définition : nombre de panneaux $=$ aire du toit ÷ aire d’un panneau.\n\n" +
        `Méthode : toit $${tx(L)} \\times ${tx(l)} = ${tx(L * l)}\\ \\text{m}^2$ ; panneau $2 \\times 1 = 2\\ \\text{m}^2$.\n\n` +
        `Calcul : $${tx(L * l)} \\div 2 = ${tx((L * l) / 2)}$.\n\n` +
        `Conclusion : on peut poser ${N((L * l) / 2)} panneaux.`,
    };
  }
  if (mode === 2) {
    const a = randomInt(3, 8), b = randomInt(3, 8);
    const [cl, cw] = randomChoice<[number, number]>([[15, 10], [20, 10], [10, 5]]);
    return {
      text: `Un panneau de liège rectangulaire mesure ${lg(a * cl, "cm")} sur ${lg(b * cw, "cm")}. On le recouvre de cartes de ${lg(cl, "cm")} sur ${lg(cw, "cm")}, toutes dans le même sens, sans chevauchement. ${fin("Combien de cartes faut-il ?")}`,
      format: "short",
      expected: [ans(a * b)],
      comparator: "number_equal",
      explanation:
        "Définition : nombre de cartes $=$ aire du panneau ÷ aire d’une carte.\n\n" +
        `Méthode : panneau $${tx(a * cl)} \\times ${tx(b * cw)} = ${tx(a * cl * b * cw)}\\ \\text{cm}^2$ ; carte $${cl} \\times ${cw} = ${cl * cw}\\ \\text{cm}^2$.\n\n` +
        `Calcul : $${tx(a * cl * b * cw)} \\div ${cl * cw} = ${a * b}$ (soit $${a}$ cartes sur la longueur et $${b}$ sur la largeur).\n\n` +
        `Conclusion : il faut ${N(a * b)} cartes.`,
    };
  }
  if (mode === 3) {
    const L = randomInt(3, 8), h = randomChoice([2.5, 3]);
    const couvre = randomChoice([5, 8, 10, 12]);
    const A = 2 * L * h;
    const nb = Math.ceil(A / couvre - 1e-9);
    return {
      text: `On peint deux murs identiques de ${lg(L, "m")} de long et ${lg(h, "m")} de haut. Un pot de peinture couvre ${ar(couvre, "m")}. ${fin("Combien de pots faut-il acheter au minimum ?")}`,
      format: "short",
      expected: [String(nb)],
      comparator: "number_equal",
      explanation:
        "Définition : nombre de pots $=$ surface à peindre ÷ surface couverte par un pot, arrondi AU-DESSUS (un pot entamé s’achète entier).\n\n" +
        `Méthode : surface $2 \\times ${tx(L)} \\times ${tx(h)} = ${tx(A)}\\ \\text{m}^2$.\n\n` +
        `Calcul : $${tx(A)} \\div ${couvre} \\approx ${tx(Math.round((A / couvre) * 100) / 100)}$, donc $${nb}$ pots.\n\n` +
        `Conclusion : il faut acheter ${N(nb)} pots.`,
    };
  }
  if (mode === 4) {
    const s = randomChoice([() => sRect("une pelouse", randomInt(10, 30), randomInt(8, 15)), () => sTri("une parcelle", pair(10, 30), randomInt(8, 20))])();
    const couvre = randomChoice([20, 25, 50]);
    const nb = Math.ceil(s.A / couvre - 1e-9);
    return {
      text: `Un sac de graines permet de semer ${ar(couvre, "m")}. On sème ${s.desc}. ${fin("Combien de sacs faut-il acheter au minimum ?")}`,
      format: "short",
      expected: [String(nb)],
      comparator: "number_equal",
      explanation:
        "Définition : nombre de sacs $=$ aire ÷ surface semée par un sac, arrondi AU-DESSUS.\n\n" +
        `Méthode : aire : ${s.calc} ${M2}.\n\n` +
        `Calcul : $${tx(s.A)} \\div ${couvre} \\approx ${tx(Math.round((s.A / couvre) * 100) / 100)}$, donc $${nb}$ sacs.\n\n` +
        `Conclusion : il faut ${N(nb)} sacs.`,
    };
  }
  const t = randomChoice([10, 20]);
  const L = t === 20 ? randomInt(1, 2) * 100 : randomInt(2, 4) * 50, h = randomChoice([40, 60, 80]);
  const nb = (L / t) * (h / t);
  return {
    text: `Une crédence de cuisine mesure ${lg(L / 100, "m")} de long et ${lg(h, "cm")} de haut. On la couvre de carreaux de faïence carrés de ${lg(t, "cm")} de côté. ${fin("Combien de carreaux faut-il ?")}`,
    format: "short",
    expected: [ans(nb)],
    comparator: "number_equal",
    explanation:
      "Définition : nombre de carreaux $=$ aire de la crédence ÷ aire d’un carreau, dans la même unité.\n\n" +
      `Méthode : ${lg(L / 100, "m")} $=$ ${lg(L, "cm")} ; crédence $${tx(L)} \\times ${tx(h)} = ${tx(L * h)}\\ \\text{cm}^2$ ; carreau $${t} \\times ${t} = ${t * t}\\ \\text{cm}^2$.\n\n` +
      `Calcul : $${tx(L * h)} \\div ${t * t} = ${tx(nb)}$.\n\n` +
      `Conclusion : il faut ${N(nb)} carreaux.`,
  };
}

/* ===========================================================================
   AIRE_DEFI
=========================================================================== */

const PAIRES_DEFI: readonly { pl: string; f?: boolean; u: string }[] = [
  { pl: "jardins", u: "m" }, { pl: "tapis", u: "m" }, { pl: "affiches", f: true, u: "dm" },
  { pl: "enclos", u: "m" }, { pl: "photos", f: true, u: "cm" }, { pl: "terrasses", f: true, u: "m" },
  { pl: "potagers", u: "m" }, { pl: "nappes", f: true, u: "dm" }, { pl: "plaques", f: true, u: "dm" },
  { pl: "parcelles", f: true, u: "m" }, { pl: "bassins", u: "m" }, { pl: "tableaux", u: "dm" },
  { pl: "dalles", f: true, u: "dm" }, { pl: "écrans", u: "cm" },
];
const AIRES_MULTIPLES = [12, 16, 18, 24, 30, 36, 40, 48] as const;
function deuxFacteurs(n: number): [number, number][] {
  const r: [number, number][] = [];
  for (let a = 1; a * a <= n; a++) if (n % a === 0) r.push([a, n / a]);
  return r;
}

/** ★4 — même aire ? même périmètre ? */
function genMemeAireOuPerimetre(): Q {
  const o = randomChoice(PAIRES_DEFI);
  const cas = randomInt(0, 2);
  let a: number, b: number, c: number, d: number;
  if (cas === 0) {
    // Pas de côté 1 (une photo de 1 cm sur 24 cm n’est pas plausible).
    const paires = deuxFacteurs(randomChoice(AIRES_MULTIPLES)).filter(([x]) => x >= 2);
    const [p1, p2] = shuffle(paires).slice(0, 2);
    [a, b, c, d] = [p1[0], p1[1], p2[0], p2[1]];
  } else if (cas === 1) {
    const s = randomInt(8, 14);
    a = randomInt(2, Math.floor(s / 2) - 1);
    c = randomInt(2, Math.floor(s / 2));
    while (c === a) c = randomInt(2, Math.floor(s / 2));
    b = s - a; d = s - c;
  } else {
    do {
      a = randomInt(2, 6); b = randomInt(a + 1, 10); c = randomInt(2, 6); d = randomInt(c + 1, 10);
    } while (a * b === c * d || a + b === c + d);
  }
  const A1 = a * b, A2 = c * d, P1 = 2 * (a + b), P2 = 2 * (c + d);
  const choix = [
    "même aire et même périmètre",
    "même aire, mais pas le même périmètre",
    "même périmètre, mais pas la même aire",
    "ni la même aire, ni le même périmètre",
  ];
  const correct = A1 === A2 ? (P1 === P2 ? choix[0] : choix[1]) : P1 === P2 ? choix[2] : choix[3];
  const u = o.u;
  const lun = o.f ? "l’une" : "l’un";
  const [p] = randomChoice(PRENOMS);
  return {
    text: randomChoice([
      `Deux ${o.pl} rectangulaires mesurent, ${lun} ${lg(a, u)} sur ${lg(b, u)}, l’autre ${lg(c, u)} sur ${lg(d, u)}. Que peut-on dire ?`,
      `On compare deux ${o.pl} rectangulaires : ${lg(a, u)} × ${lg(b, u)} et ${lg(c, u)} × ${lg(d, u)}. Quelle phrase est juste ?`,
      `${p} hésite entre deux ${o.pl} rectangulaires, de ${lg(a, u)} sur ${lg(b, u)} et de ${lg(c, u)} sur ${lg(d, u)}. Que peut-on affirmer ?`,
      `Deux ${o.pl} rectangulaires : ${lun} de ${lg(b, u)} de long et ${lg(a, u)} de large, l’autre de ${lg(d, u)} de long et ${lg(c, u)} de large. Compare leurs aires et leurs périmètres.`,
    ]),
    format: "qcm",
    choices: shuffle([...choix]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation:
      "Définition : aire et périmètre sont deux grandeurs indépendantes ; on calcule les deux.\n\n" +
      "Méthode : aire $=$ longueur × largeur ; périmètre $= 2 \\times$ (longueur + largeur).\n\n" +
      `Calcul : aires $${a} \\times ${b} = ${A1}$ et $${c} \\times ${d} = ${A2}$ ; périmètres $2 \\times (${a} + ${b}) = ${P1}$ et $2 \\times (${c} + ${d}) = ${P2}$.\n\n` +
      `Conclusion : ${correct}.`,
  };
}

/** ★5 — l’affirmation d’un élève sur un parallélogramme (parfois juste). */
function genAffirmationPara(): Q {
  const o = randomChoice(PARA_OBJETS);
  const { b, h, s } = dimsPara(o);
  const u = o.u;
  const juste = Math.random() < 0.3;
  const annonce = juste ? b * h : b * s;
  const [p, pr] = randomChoice(PRENOMS);
  const correct = juste ? "oui" : "non";
  return {
    text: randomChoice([
      `${p} affirme que l’aire ${dUn(o)} en forme de parallélogramme de base ${lg(b, u)}, de côté ${lg(s, u)} et de hauteur ${lg(h, u)} vaut ${ar(annonce, u)}. A-t-${pr} raison ?`,
      `${cap(un(o))} en forme de parallélogramme : base ${lg(b, u)}, côté penché ${lg(s, u)}, hauteur ${lg(h, u)}. ${p} annonce ${ar(annonce, u)}. Est-ce juste ?`,
      `Un parallélogramme a une base de ${lg(b, u)}, des côtés obliques de ${lg(s, u)} et une hauteur de ${lg(h, u)}. Son aire vaut-elle ${ar(annonce, u)} ?`,
      `Vrai ou faux ? « L’aire ${dUn(o)} en forme de parallélogramme (base ${lg(b, u)}, côté ${lg(s, u)}, hauteur ${lg(h, u)}) est ${ar(annonce, u)}. »`,
    ]),
    format: "qcm",
    choices: ["oui", "non"],
    expected: [correct],
    comparator: "mcq_exact",
    explanation:
      "Définition : l’aire d’un parallélogramme se calcule avec la base et la HAUTEUR, jamais avec le côté penché.\n\n" +
      `Méthode : base ${lg(b, u)} × hauteur ${lg(h, u)}.\n\n` +
      `Calcul : $${tx(b)} \\times ${tx(h)} = ${tx(b * h)}$${juste ? "" : ` (et non $${tx(b)} \\times ${tx(s)} = ${tx(b * s)}$)`}.\n\n` +
      `Conclusion : ${juste ? "oui, c’est juste" : `non, l’aire vaut ${ar(b * h, u)}`}.`,
  };
}

/** ★5 — rectangle ou carré : lequel est le plus grand ? (situations nommées) */
function genCompareRectCarre(): Q {
  const o = randomChoice<Nom & { u: string; m: number }>([
    { n: "jardin", u: "m", m: 1 }, { n: "potager", u: "m", m: 1 }, { n: "tapis", u: "dm", m: 1 },
    { n: "terrasse", f: true, u: "m", m: 1 }, { n: "photo", f: true, u: "cm", m: 2 }, { n: "affiche", f: true, v: true, u: "dm", m: 1 },
    { n: "enclos", v: true, u: "m", m: 2 }, { n: "bassin", u: "m", m: 1 }, { n: "nappe", f: true, u: "dm", m: 2 },
    { n: "parcelle", f: true, u: "m", m: 5 },
  ]);
  const a = randomInt(2, 5) * o.m, b = randomInt(3, 7) * o.m, c = randomChoice([2, 3, 4, 5]) * o.m;
  const R = a * b, C = c * c;
  const [p1] = randomChoice(PRENOMS);
  let [p2] = randomChoice(PRENOMS);
  while (p2 === p1) [p2] = randomChoice(PRENOMS);
  const celui = o.f ? "celle" : "celui";
  const c1 = `${celui} ${dePrenom(p1)}`, c2 = `${celui} ${dePrenom(p2)}`, eg = "les deux ont la même aire";
  const correct = R > C ? c1 : R < C ? c2 : eg;
  const u = o.u;
  return {
    text: randomChoice([
      `${cap(le(o))} ${dePrenom(p1)} est un rectangle de ${lg(a, u)} sur ${lg(b, u)} ; ${c2} est un carré de ${lg(c, u)} de côté. ${o.f ? "Laquelle" : "Lequel"} a la plus grande aire ?`,
      `${p1} a ${un(o)} rectangulaire de ${lg(a, u)} × ${lg(b, u)}, ${p2} ${un(o)} ${carre(o)} de côté ${lg(c, u)}. Quelle surface est la plus grande ?`,
      `Qui a ${le(o)} ${o.f ? "la plus grande" : "le plus grand"} ? ${p1} : rectangle de ${lg(b, u)} sur ${lg(a, u)}. ${p2} : carré de ${lg(c, u)} de côté.`,
    ]),
    format: "qcm",
    choices: [c1, c2, eg],
    expected: [correct],
    comparator: "mcq_exact",
    explanation:
      "Définition : on compare des surfaces en calculant les deux aires.\n\n" +
      `Méthode : rectangle $${tx(a)} \\times ${tx(b)}$ ; carré $${tx(c)} \\times ${tx(c)}$.\n\n` +
      `Calcul : $${tx(R)}$ ${U2(u)} contre $${tx(C)}$ ${U2(u)}.\n\n` +
      `Conclusion : ${correct}.`,
  };
}

const EXPLIQUE_CONTEXTES = ["deux jardins", "deux tapis", "deux tablettes de chocolat", "deux nappes", "deux terrains", "deux affiches", "deux pièces d’un appartement", "deux parcelles", "deux plaques de bois", "deux figures dessinées sur un quadrillage"] as const;
const EXEMPLES_MEME_AIRE: readonly [number, number, number][] = [[1, 4, 2], [2, 8, 4], [4, 9, 6], [1, 9, 3], [3, 12, 6], [2, 18, 6], [4, 16, 8], [1, 16, 4], [4, 25, 10], [1, 36, 6]];

/** ★5 — rédiger : pourquoi deux figures différentes peuvent avoir la même aire. */
function genExpliqueMemeAire(): Q {
  const ctx = randomChoice(EXPLIQUE_CONTEXTES);
  const [a, b, c] = randomChoice(EXEMPLES_MEME_AIRE);
  const [p] = randomChoice(PRENOMS);
  return {
    text: randomChoice([
      `Explique pourquoi ${ctx} de formes différentes peuvent avoir la même aire. Tu peux t’appuyer sur un rectangle de $${a}$ sur $${b}$ et un carré de côté $${c}$.`,
      `${p} pense que ${ctx} de formes différentes ont forcément des aires différentes. Explique-lui pourquoi c’est faux.`,
      `Un rectangle de $${a}$ sur $${b}$ et un carré de côté $${c}$ : explique ce qu’ils ont en commun, alors que leurs formes diffèrent.`,
      `Avec l’exemple de ${ctx}, explique en une ou deux phrases la différence entre « même forme » et « même aire ».`,
    ]),
    format: "open",
    expected: ["même", "aire", "surface", "différentes"],
    comparator: "contains_keyword",
    explanation:
      "Définition : l’aire mesure la surface occupée, quelle que soit la forme.\n\n" +
      "Méthode : on calcule l’aire de chaque figure et on compare.\n\n" +
      `Calcul : par exemple $${a} \\times ${b} = ${a * b}$ et $${c} \\times ${c} = ${c * c}$ : même aire, formes différentes (et périmètres différents : $${2 * (a + b)}$ et $${4 * c}$).\n\n` +
      "Conclusion : deux figures différentes peuvent occuper la même surface ; la forme ne décide pas de l’aire.",
  };
}

/** ★5 — agrandissement ou réduction : la nouvelle aire. */
function genAgrandissementAire(): Q {
  const o = randomChoice(OBJETS_AGRANDIS);
  const reduit = Math.random() < 0.3;
  const k = reduit ? 2 : randomChoice([2, 3, 4, 5]);
  const [u, A] = reduit
    ? randomChoice<[string, number]>([["cm", 4 * randomInt(5, 30)], ["dm", 4 * randomInt(2, 15)], ["mm", 4 * randomInt(20, 60)]])
    : randomChoice<[string, number]>([["cm", randomInt(5, 40)], ["dm", randomInt(2, 15)], ["mm", randomInt(50, 200)]]);
  const res = reduit ? A / 4 : A * k * k;
  const [p, pr] = randomChoice(PRENOMS);
  return {
    text: reduit
      ? randomChoice([
          `${cap(un(o))} a une aire de ${ar(A, u)}. On ${o.f ? "la" : "le"} réduit en divisant toutes ses longueurs par $2$. Quelle est sa nouvelle aire, en ${U2(u)} ?`,
          `${p} réduit ${un(o)} de ${ar(A, u)} : chaque longueur est divisée par $2$. Quelle aire obtient-${pr}, en ${U2(u)} ?`,
          `Toutes les longueurs ${dUn(o)} de ${ar(A, u)} sont divisées par $2$. Que vaut sa nouvelle aire, en ${U2(u)} ?`,
        ])
      : randomChoice([
          `${cap(un(o))} a une aire de ${ar(A, u)}. On multiplie toutes ses longueurs par ${N(k)}. Quelle est sa nouvelle aire, en ${U2(u)} ?`,
          `${p} agrandit ${un(o)} de ${ar(A, u)} : chaque longueur est multipliée par ${N(k)}. Quelle aire obtient-${pr}, en ${U2(u)} ?`,
          `Toutes les longueurs ${dUn(o)} de ${ar(A, u)} sont multipliées par ${N(k)}. Que vaut sa nouvelle aire, en ${U2(u)} ?`,
          `Une copie ${dUn(o)} de ${ar(A, u)} est ${N(k)} fois plus longue et ${N(k)} fois plus large. Quelle surface occupe la copie, en ${U2(u)} ?`,
        ]),
    format: "short",
    expected: [ans(res)],
    comparator: "number_equal",
    explanation: reduit
      ? "Définition : diviser les longueurs par $2$ divise l’aire par $2 \\times 2 = 4$.\n\n" +
        "Méthode : on divise l’aire par $4$, pas par $2$.\n\n" +
        `Calcul : $${tx(A)} \\div 4 = ${tx(res)}$.\n\n` +
        `Conclusion : la nouvelle aire vaut ${ar(res, u)}.`
      : `Définition : multiplier les longueurs par $${k}$ multiplie l’aire par $${k} \\times ${k} = ${k * k}$.\n\n` +
        `Méthode : on multiplie l’aire par $${k * k}$, pas par $${k}$.\n\n` +
        `Calcul : $${tx(A)} \\times ${k * k} = ${tx(res)}$.\n\n` +
        `Conclusion : la nouvelle aire vaut ${ar(res, u)}.`,
  };
}

/** ★5 — comparer deux figures de natures différentes (dont deux pizzas). */
function genCompareFigures(): Q {
  const mode = randomInt(0, 3);
  const [p] = randomChoice(PRENOMS);
  if (mode === 0) {
    // Pizzas : une grande ou deux petites ?
    const D = randomChoice([30, 32, 36, 40]), d = randomChoice([20, 22, 24, 26]);
    const g = Math.PI * (D / 2) ** 2, pp = 2 * Math.PI * (d / 2) ** 2;
    const c1 = "la grande pizza", c2 = "les deux petites pizzas", eg = "c’est pareil";
    const correct = Math.abs(g - pp) < 1 ? eg : g > pp ? c1 : c2;
    return {
      text: randomChoice([
        `Pour le même prix, ${p} peut avoir une pizza de ${lg(D, "cm")} de diamètre ou deux pizzas de ${lg(d, "cm")} de diamètre. Où y a-t-il le plus à manger ?`,
        `Une pizza de ${lg(D, "cm")} de diamètre ou deux pizzas de ${lg(d, "cm")} : quelle offre donne la plus grande surface de pizza ?`,
        `Une pizzeria propose une grande pizza (${lg(D, "cm")} de diamètre) ou deux petites (${lg(d, "cm")} chacune). Laquelle des deux offres a la plus grande aire ?`,
      ]),
      format: "qcm",
      choices: [c1, c2, eg],
      expected: [correct],
      comparator: "mcq_exact",
      explanation:
        "Définition : aire d’un disque $= \\pi \\times r^2$, avec r le RAYON (la moitié du diamètre).\n\n" +
        `Méthode : grande : $\\pi \\times ${D / 2}^2$ ; deux petites : $2 \\times \\pi \\times ${d / 2}^2$.\n\n` +
        `Calcul : $\\approx ${tx(Math.round(g))}\\ \\text{cm}^2$ contre $\\approx ${tx(Math.round(pp))}\\ \\text{cm}^2$.\n\n` +
        `Conclusion : ${correct}. ⚠️ Doubler le nombre de pizzas ne double pas le diamètre.`,
      canvas: disqueCanvas(D / 2, "cm", true),
    };
  }
  if (mode === 1) {
    // Carré contre disque.
    const c = randomChoice([4, 6, 8, 10]), r = randomChoice([2, 3, 4, 5, 6]);
    const C = c * c, D = Math.PI * r * r;
    const correct = C > D ? "le carré" : "le disque";
    return {
      text: randomChoice([
        `Qui a la plus grande aire : un carré de ${lg(c, "cm")} de côté ou un disque de ${lg(r, "cm")} de rayon ?`,
        `${p} compare un dessous-de-plat carré de ${lg(c, "cm")} de côté et un dessous-de-plat rond de ${lg(r, "cm")} de rayon. Lequel couvre le plus de surface ?`,
        `Un carré de côté ${lg(c, "cm")} et le disque de rayon ${lg(r, "cm")} ci-contre : lequel a la plus grande aire ?`,
      ]),
      format: "qcm",
      choices: ["le carré", "le disque", "ils ont la même aire"],
      expected: [correct],
      comparator: "mcq_exact",
      explanation:
        "Définition : aire du carré $= c^2$ ; aire du disque $= \\pi \\times r^2$.\n\n" +
        `Méthode : $${c}^2$ et $\\pi \\times ${r}^2$.\n\n` +
        `Calcul : $${C}\\ \\text{cm}^2$ contre $\\approx ${tx(Math.round(D * 10) / 10)}\\ \\text{cm}^2$.\n\n` +
        `Conclusion : ${correct} a la plus grande aire.`,
      canvas: disqueCanvas(r, "cm", false),
    };
  }
  // Rectangle contre triangle (ou parallélogramme).
  const a = randomInt(3, 8), b = randomInt(2, 6);
  const tri = mode === 2;
  const base = randomInt(3, 10), haut = randomInt(2, 8);
  const R = a * b, F = tri ? (base * haut) / 2 : base * haut;
  const nomF = tri ? "le triangle" : "le parallélogramme";
  const correct = R > F ? "le rectangle" : R < F ? nomF : "ils ont la même aire";
  return {
    text: randomChoice([
      `On compare un rectangle de ${lg(a, "cm")} sur ${lg(b, "cm")} et ${tri ? "un triangle" : "un parallélogramme"} de base ${lg(base, "cm")} et de hauteur ${lg(haut, "cm")}. Lequel a la plus grande aire ?`,
      `${p} découpe un rectangle de ${lg(a, "cm")} × ${lg(b, "cm")} et ${tri ? "un triangle" : "un parallélogramme"} (base ${lg(base, "cm")}, hauteur ${lg(haut, "cm")}). Quelle pièce a la plus grande surface ?`,
      `Rectangle de ${lg(a, "cm")} sur ${lg(b, "cm")}, ou ${tri ? "triangle" : "parallélogramme"} de ${lg(base, "cm")} de base et ${lg(haut, "cm")} de hauteur : lequel couvre le plus ?`,
    ]),
    format: "qcm",
    choices: ["le rectangle", nomF, "ils ont la même aire"],
    expected: [correct],
    comparator: "mcq_exact",
    explanation:
      "Définition : on compare les aires, calculées chacune avec sa formule.\n\n" +
      `Méthode : rectangle $${a} \\times ${b}$ ; ${tri ? `triangle $\\dfrac{${base} \\times ${haut}}{2}$` : `parallélogramme $${base} \\times ${haut}$`}.\n\n` +
      `Calcul : $${tx(R)}\\ \\text{cm}^2$ contre $${tx(F)}\\ \\text{cm}^2$.\n\n` +
      `Conclusion : ${correct === "ils ont la même aire" ? "ils ont la même aire" : `${correct} a la plus grande aire`}.`,
  };
}

/** ★5 — une dimension écrite avec une lettre. */
function genAireLitterale(): Q {
  const o = randomChoice<Nom>([{ n: "carte", f: true }, { n: "affiche", f: true, v: true }, { n: "napperon" }, { n: "étiquette", f: true, v: true }, { n: "plaque", f: true }, { n: "carreau" }, { n: "écran", v: true }, { n: "panneau" }]);
  const lettre = randomChoice(["x", "a", "t", "n", "y"]);
  const k = randomInt(1, 5), v = randomInt(2, 9);
  const forme = randomInt(0, 3);
  let pred: string, A: number, formule: string, calc: string;
  if (forme === 0) {
    pred = `est un rectangle de largeur $${lettre}$ et de longueur $${lettre} + ${k}$`;
    A = v * (v + k);
    formule = `${lettre} \\times (${lettre} + ${k})`;
    calc = `${v} \\times ${v + k} = ${A}`;
  } else if (forme === 1) {
    pred = `est un carré de côté $${lettre} + ${k}$`;
    A = (v + k) ** 2;
    formule = `(${lettre} + ${k}) \\times (${lettre} + ${k})`;
    calc = `${v + k} \\times ${v + k} = ${A}`;
  } else if (forme === 2) {
    pred = `a la forme d’un triangle de base $2${lettre}$ et de hauteur $${lettre} + ${k}$`;
    A = v * (v + k);
    formule = `\\dfrac{2${lettre} \\times (${lettre} + ${k})}{2}`;
    calc = `\\dfrac{${2 * v} \\times ${v + k}}{2} = ${A}`;
  } else {
    pred = `a la forme d’un parallélogramme de base $${lettre} + ${k}$ et de hauteur $${lettre}$`;
    A = (v + k) * v;
    formule = `(${lettre} + ${k}) \\times ${lettre}`;
    calc = `${v + k} \\times ${v} = ${A}`;
  }
  const [p, pr] = randomChoice(PRENOMS);
  return {
    text: randomChoice([
      `${cap(un(o))} ${pred} (longueurs en cm). Pour $${lettre} = ${v}$, quelle est son aire, en ${U2("cm")} ?`,
      `${p} dessine ${un(o)} qui ${pred}, les longueurs étant en cm. Quelle aire trouve-t-${pr} pour $${lettre} = ${v}$ ?`,
      `On note $${lettre}$ une longueur en cm. ${cap(un(o))} ${pred}. Calcule son aire lorsque $${lettre} = ${v}$.`,
    ]),
    format: "short",
    expected: [ans(A)],
    comparator: "number_equal",
    explanation:
      `Définition : l’aire s’écrit $${formule}$.\n\n` +
      `Méthode : on remplace $${lettre}$ par $${v}$.\n\n` +
      `Calcul : $${calc}$.\n\n` +
      `Conclusion : l’aire vaut $${A}\\ \\text{cm}^2$.`,
  };
}

/* ===========================================================================
   LA BANQUE
=========================================================================== */

export const airesBank: TutorBankItemV4[] = [
  // =========================
  // AIRE_COMPRENDRE
  // =========================
  {
    kind: "fixed",
    id: "aire_comprendre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "L’aire d’une figure correspond…",
    format: "qcm",
    choices: [
      "à la longueur de son contour",
      "à la surface qu’elle occupe",
      "au nombre de ses côtés",
      "à la somme de ses angles",
    ],
    expected: ["à la surface qu’elle occupe"],
    comparator: "mcq_exact",
    hint: "On parle de l’intérieur de la figure.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          ("L’aire mesure la surface occupée par une figure, et non son contour.") +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
    tags: ["aire", "definition"],
  },
  {
    kind: "fixed",
    id: "aire_comprendre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est adaptée pour exprimer une aire ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "kg"],
    expected: ["cm²"],
    comparator: "mcq_exact",
    hint: "Une aire s’exprime en unité carrée.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          ("Une aire s’exprime avec une unité carrée, par exemple en cm².") +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
    tags: ["aire", "unite"],
  },
  {
    kind: "fixed",
    id: "aire_comprendre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique la différence entre aire et périmètre.",
    format: "open",
    expected: ["aire", "surface", "périmètre", "contour"],
    comparator: "contains_keyword",
    hint: "L’un mesure l’intérieur, l’autre le tour.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          ("L’aire mesure la surface occupée par une figure. Le périmètre mesure la longueur de son contour.") +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
    tags: ["aire", "aire_perimetre", "open"],
  },

  // =========================
  // AIRE_RECTANGLE
  // =========================
  {
    kind: "fixed",
    id: "aire_rectangle_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer l’aire d’un rectangle de longueur 8 cm et de largeur 3 cm.",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Aire du rectangle = longueur × largeur.",
    explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          ("A = 8 × 3 = 24.") +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
    tags: ["aire", "rectangle"],
  },
  {
    kind: "template",
    id: "aire_rectangle_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "On multiplie la longueur par la largeur.",
    tags: ["aire", "rectangle", "template"],
    generate: () => genRectAire(false),
  },
  {
    kind: "template",
    id: "aire_rectangle_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "La surface d’un objet rectangulaire est l’aire du rectangle : longueur × largeur.",
    tags: ["aire", "rectangle", "probleme", "template"],
    generate: () => genRectAire(false),
  },
  {
    kind: "template",
    id: "aire_rectangle_tpl_canvas_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis les dimensions directement sur la figure.",
    tags: ["aire", "rectangle", "quadrilatere", "canvas", "template"],
    generate: () => genRectAire(true),
  },
  {
    kind: "fixed",
    id: "aire_rectangle_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi l’aire d’un rectangle de longueur 8 cm et de largeur 3 cm vaut 24 cm².",
    format: "open",
    expected: ["8", "3", "24", "multiplie"],
    comparator: "contains_keyword",
    hint: "On multiplie la longueur par la largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          ("L’aire d’un rectangle se calcule en multipliant longueur × largeur : 8 × 3 = 24 cm².") +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
    tags: ["aire", "rectangle", "open"],
  },

  // =========================
  // AIRE_CARRE
  // =========================
  {
    kind: "fixed",
    id: "aire_carre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer l’aire d’un carré de côté 6 cm.",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Aire du carré = côté × côté.",
    explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          ("A = 6 × 6 = 36.") +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
    tags: ["aire", "carre"],
  },
  {
    kind: "template",
    id: "aire_carre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplie le côté par lui-même.",
    tags: ["aire", "carre", "template"],
    generate: () => genCarreAire(false),
  },

  // =========================
  // AIRE_TRIANGLE
  // =========================
  {
    kind: "fixed",
    id: "aire_triangle_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer l’aire d’un triangle de base 10 cm et de hauteur 4 cm.",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Aire du triangle = (base × hauteur) ÷ 2.",
    explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          ("A = (10 × 4) ÷ 2 = 20.") +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
    tags: ["aire", "triangle"],
  },
  {
    kind: "template",
    id: "aire_triangle_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise la formule (base × hauteur) ÷ 2.",
    tags: ["aire", "triangle", "canvas", "template"],
    generate: () => genTriFigure(),
  },
  {
    kind: "template",
    id: "aire_triangle_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un triangle rectangle, les deux côtés de l’angle droit peuvent servir de base et de hauteur.",
    tags: ["aire", "triangle_rectangle", "canvas", "template"],
    generate: () => genTriRectangle(),
  },
  {
    kind: "fixed",
    id: "aire_triangle_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi on divise par 2 dans la formule de l’aire d’un triangle.",
    format: "open",
    expected: ["rectangle", "moitié", "2"],
    comparator: "contains_keyword",
    hint: "Un triangle peut être vu comme la moitié d’un rectangle.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          ("Un triangle de base et de hauteur données correspond à la moitié d’un rectangle de même base et même hauteur. C’est pourquoi on divise par 2.") +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
    tags: ["aire", "triangle", "open"],
  },

  // =========================
  // AIRE_PARALLELOGRAMME
  // =========================
  {
    kind: "fixed",
    id: "aire_parallelogramme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer l’aire d’un parallélogramme de base 8 cm et de hauteur 5 cm.",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "Aire du parallélogramme = base × hauteur.",
    explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          ("A = 8 × 5 = 40.") +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
    tags: ["aire", "parallelogramme"],
  },
  {
    kind: "template",
    id: "aire_parallelogramme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise la base et la hauteur, pas le côté incliné.",
    tags: ["aire", "parallelogramme", "quadrilatere", "template"],
    generate: () => genParaPiege(),
  },
  {
    kind: "fixed",
    id: "aire_parallelogramme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi on utilise la hauteur et non le côté incliné pour calculer l’aire d’un parallélogramme.",
    format: "open",
    expected: ["hauteur", "base", "côté incliné"],
    comparator: "contains_keyword",
    hint: "La hauteur est perpendiculaire à la base.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          ("L’aire d’un parallélogramme se calcule avec base × hauteur. Le côté incliné n’est pas la hauteur car il n’est pas perpendiculaire à la base.") +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
    tags: ["aire", "parallelogramme", "open", "erreur"],
  },

  // =========================
  // AIRE_FIGURE
  // =========================
  {
    kind: "template",
    id: "aire_figure_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte le nombre de petits carrés unité.",
    tags: ["aire", "figure", "figure_libre", "template"],
    generate: () => genGrilleSimple(),
  },
  {
    kind: "template",
    id: "aire_figure_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les carreaux, puis multiplie par l’aire d’UN carreau (côté × côté).",
    tags: ["aire", "figure_composee", "figure_libre", "template"],
    generate: () => genGrilleEchelle(["L", "T", "U", "croix", "escalier", "cadre"]),
  },
  {
    kind: "fixed",
    id: "aire_figure_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer l’aire d’une figure dessinée sur un quadrillage.",
    format: "open",
    expected: ["compter", "carrés", "unité"],
    comparator: "contains_keyword",
    hint: "Chaque petit carré représente une unité d’aire.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          ("Pour une figure sur quadrillage, on compte les carrés unités qui composent la figure.") +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
    tags: ["aire", "quadrillage", "open"],
  },

  // =========================
  // AIRE_PROBLEME
  // =========================
  {
    kind: "template",
    id: "aire_probleme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "La surface à peindre correspond à une aire.",
    tags: ["aire", "probleme", "template"],
    generate: () => genPeinture(),
  },
  {
    kind: "template",
    id: "aire_probleme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Un triangle rectangle se traite comme un triangle avec base et hauteur.",
    tags: ["aire", "probleme", "template"],
    generate: () => genTriReel(),
  },

  // =========================
  // AIRE_DEFIS
  // =========================
  {
    kind: "template",
    id: "aire_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux figures peuvent avoir la même aire même si elles n’ont pas la même forme.",
    tags: ["aire", "defi", "hpi", "template"],
    generate: () => genMemeAireOuPerimetre(),
  },
  {
    kind: "template",
    id: "aire_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Pour l’aire d’un parallélogramme, on utilise la hauteur, pas le côté incliné.",
    tags: ["aire", "defi", "parallelogramme", "hpi", "template"],
    generate: () => genAffirmationPara(),
  },
  {
    kind: "template",
    id: "aire_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les aires, pas les périmètres.",
    tags: ["aire", "defi", "comparaison", "hpi", "template"],
    generate: () => genCompareRectCarre(),
  },
  {
    kind: "template",
    id: "aire_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Même aire ne veut pas forcément dire même forme ou même périmètre.",
    tags: ["aire", "defi", "open", "raisonnement"],
    generate: () => genExpliqueMemeAire(),
  },

  /* ===== COMPRENDRE (compléments) ===== */
  {
    kind: "fixed",
    id: "4e_aire_comprendre_x1_formrect",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la formule de l’aire d’un rectangle ?",
    format: "qcm",
    choices: ["$L \\times l$", "$2 \\times (L + l)$", "$L + l$", "$\\dfrac{L \\times l}{2}$"],
    expected: ["$L \\times l$"],
    comparator: "mcq_exact",
    hint: "On multiplie les deux dimensions.",
    explanation:
      "Définition : l’aire d’un rectangle est longueur × largeur.\n\nMéthode : on multiplie $L$ par $l$.\n\nCalcul : $A = L \\times l$.\n\nConclusion : c’est $L \\times l$.",
    tags: ["aire", "comprendre", "formule", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_aire_comprendre_x2_formtri",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de l’aire d’un triangle ?",
    format: "qcm",
    choices: ["$\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$", "$\\text{base} \\times \\text{hauteur}$", "$\\text{base} + \\text{hauteur}$", "$2 \\times \\text{base}$"],
    expected: ["$\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$"],
    comparator: "mcq_exact",
    hint: "C’est la moitié d’un rectangle.",
    explanation:
      "Définition : un triangle est la moitié d’un rectangle de mêmes base et hauteur.\n\nMéthode : on calcule base × hauteur, puis on divise par $2$.\n\nCalcul : $A = \\dfrac{b \\times h}{2}$.\n\nConclusion : c’est $\\dfrac{b \\times h}{2}$.",
    tags: ["aire", "comprendre", "formule", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_aire_comprendre_x3_double",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Si on double toutes les longueurs d’une figure, son aire est multipliée par…",
    format: "qcm",
    choices: ["$4$", "$2$", "$8$", "elle ne change pas"],
    expected: ["$4$"],
    comparator: "mcq_exact",
    hint: "Une aire est en deux dimensions.",
    explanation:
      "Définition : l’aire dépend de deux dimensions.\n\nMéthode : doubler les longueurs multiplie l’aire par $2^2$.\n\nCalcul : $2^2 = 4$.\n\nConclusion : l’aire est multipliée par $4$.",
    tags: ["aire", "comprendre", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_comprendre_x4_compte",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte les petits carrés.",
    tags: ["aire", "comprendre", "figure_libre", "template"],
    // ⛔ RÉPARÉ LE 30/08/2026 : le CONTEXTE entre dans le texte, et la QUESTION
    // alterne entre l'AIRE et le PÉRIMÈTRE — la confusion centrale de la notion.
    // 03/10 : 14 contextes × 4 tournures de chaque côté (et l'accord « formé /
    // formée », faux avant pour « Une mosaïque est formé »).
    generate: () => genAireOuPerimetreGrille(),
  },
  {
    // ⭐ SECOND GABARIT AJOUTÉ LE 31/08/2026 : deux figures de MÊME PÉRIMÈTRE
    // peuvent avoir des aires très différentes. 03/10 : objets réels nommés.
    kind: "template",
    id: "4e_aire_comprendre_x7_meme_perimetre",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule les deux aires : le même tour n'oblige à rien.",
    tags: ["aire", "comprendre", "perimetre", "qcm", "template", "canvas"],
    generate: () => genMemePerimetre(),
  },
  {
    kind: "template",
    id: "4e_aire_comprendre_x8_aire_ou_perimetre",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Recouvrir une surface, c’est l’aire ; faire le tour, c’est le périmètre.",
    tags: ["aire", "comprendre", "aire_perimetre", "qcm", "template"],
    generate: () => genAireOuPerimetreSituation(),
  },
  {
    kind: "template",
    id: "4e_aire_comprendre_x9_unite",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une aire s’exprime en unité carrée (ou en ares, hectares) ; choisis celle qui donne un nombre raisonnable.",
    tags: ["aire", "comprendre", "unite", "qcm", "template"],
    generate: () => genUniteAdaptee(),
  },
  {
    kind: "template",
    id: "4e_aire_comprendre_x10_conversion",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Entre deux unités d’aire voisines, on multiplie ou on divise par $100$ (et non par $10$).",
    tags: ["aire", "comprendre", "conversion", "template"],
    generate: () => genConversionAire(),
  },
  {
    kind: "template",
    id: "4e_aire_comprendre_x11_agrandissement",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Une aire, c’est une longueur × une longueur : chacune est multipliée.",
    tags: ["aire", "comprendre", "agrandissement", "qcm", "template"],
    generate: () => genAgrandissementConcept(),
  },
  {
    kind: "fixed",
    id: "4e_aire_comprendre_x5_unite2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de $\\text{cm}^2$ y a-t-il dans $1\\ \\text{m}^2$ ?",
    format: "short",
    expected: ["10000"],
    comparator: "number_equal",
    hint: "$1$ m $= 100$ cm, donc $100 \\times 100$.",
    explanation:
      "Définition : $1$ m $= 100$ cm.\n\nMéthode : $1\\ \\text{m}^2 = 100 \\times 100\\ \\text{cm}^2$.\n\nCalcul : $100 \\times 100 = 10\\,000$.\n\nConclusion : il y a $10\\,000\\ \\text{cm}^2$.",
    tags: ["aire", "comprendre", "conversion", "short"],
  },
  {
    kind: "fixed",
    id: "4e_aire_comprendre_x6_formpara",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de l’aire d’un parallélogramme ?",
    format: "qcm",
    choices: ["$\\text{base} \\times \\text{hauteur}$", "$\\text{base} \\times \\text{côté}$", "$\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$", "$4 \\times \\text{côté}$"],
    expected: ["$\\text{base} \\times \\text{hauteur}$"],
    comparator: "mcq_exact",
    hint: "On utilise la hauteur, pas le côté incliné.",
    explanation:
      "Définition : l’aire d’un parallélogramme est base × hauteur.\n\nMéthode : on prend la hauteur perpendiculaire à la base.\n\nCalcul : $A = \\text{base} \\times \\text{hauteur}$.\n\nConclusion : c’est base × hauteur.",
    tags: ["aire", "comprendre", "formule", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_aire_comprendre_x7_vs",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Une aire se mesure en…",
    format: "qcm",
    choices: ["unités carrées", "unités de longueur", "unités cubes", "degrés"],
    expected: ["unités carrées"],
    comparator: "mcq_exact",
    hint: "C’est une surface.",
    explanation:
      "Définition : une aire mesure une surface.\n\nMéthode : on utilise une unité carrée.\n\nCalcul : par exemple $\\text{cm}^2$, $\\text{m}^2$.\n\nConclusion : on la mesure en unités carrées.",
    tags: ["aire", "comprendre", "qcm"],
  },

  /* ===== RECTANGLE (compléments) ===== */
  {
    kind: "template",
    id: "4e_aire_rectangle_x1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "$A = L \\times l$.",
    tags: ["aire", "rectangle", "template"],
    generate: () => genRectAire(false),
  },
  {
    kind: "template",
    id: "4e_aire_rectangle_x2_inverse",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 4,
    theme: "neutral",
    hint: "$l = \\dfrac{A}{L}$.",
    tags: ["aire", "rectangle", "inverse", "template"],
    generate: () => genRectInverse(),
  },
  {
    kind: "template",
    id: "4e_aire_rectangle_x3_canvas",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis les dimensions sur la figure.",
    tags: ["aire", "rectangle", "quadrilatere", "canvas", "template"],
    generate: () => genRectAire(true),
  },
  {
    kind: "fixed",
    id: "4e_aire_rectangle_x4",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle mesure $9$ cm sur $4$ cm. Quelle est son aire (en $\\text{cm}^2$) ?",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "$9 \\times 4$.",
    explanation:
      "Définition : $A = L \\times l$.\n\nMéthode : on multiplie.\n\nCalcul : $9 \\times 4 = 36$.\n\nConclusion : l’aire est $36\\ \\text{cm}^2$.",
    tags: ["aire", "rectangle", "short"],
  },
  {
    kind: "template",
    id: "4e_aire_rectangle_x5_carrelage",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Mets les deux dimensions dans la même unité, puis multiplie.",
    tags: ["aire", "rectangle", "probleme", "conversion", "template"],
    generate: () => genRectDecimalOuMixte(),
  },

  /* ===== CARRE (compléments) ===== */
  {
    kind: "template",
    id: "4e_aire_carre_x1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 1,
    theme: "neutral",
    hint: "$A = c \\times c = c^2$.",
    tags: ["aire", "carre", "template"],
    generate: () => genCarreAire(true),
  },
  {
    kind: "fixed",
    id: "4e_aire_carre_x2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté $8$ cm (en $\\text{cm}^2$) ?",
    format: "short",
    expected: ["64"],
    comparator: "number_equal",
    hint: "$8 \\times 8$.",
    explanation:
      "Définition : $A = c^2$.\n\nMéthode : on multiplie le côté par lui-même.\n\nCalcul : $8 \\times 8 = 64$.\n\nConclusion : l’aire est $64\\ \\text{cm}^2$.",
    tags: ["aire", "carre", "short"],
  },
  {
    kind: "fixed",
    id: "4e_aire_carre_x3_formule",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la formule de l’aire d’un carré de côté $c$ ?",
    format: "qcm",
    choices: ["$c^2$", "$4c$", "$2c$", "$c + c$"],
    expected: ["$c^2$"],
    comparator: "mcq_exact",
    hint: "côté × côté.",
    explanation:
      "Définition : l’aire d’un carré est côté × côté.\n\nMéthode : on multiplie le côté par lui-même.\n\nCalcul : $A = c^2$ (et $4c$ est le périmètre).\n\nConclusion : c’est $c^2$.",
    tags: ["aire", "carre", "formule", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_carre_x4_inverse",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 4,
    theme: "neutral",
    hint: "côté $= \\sqrt{\\text{aire}}$.",
    tags: ["aire", "carre", "inverse", "template"],
    generate: () => genCarreInverse(),
  },
  {
    kind: "fixed",
    id: "4e_aire_carre_x5_inverse",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 4,
    theme: "neutral",
    text: "Un carré a une aire de $81\\ \\text{cm}^2$. Quel est son côté (en cm) ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "$\\sqrt{81}$.",
    explanation:
      "Définition : côté $= \\sqrt{\\text{aire}}$.\n\nMéthode : on cherche le nombre dont le carré vaut $81$.\n\nCalcul : $\\sqrt{81} = 9$.\n\nConclusion : le côté mesure $9$ cm.",
    tags: ["aire", "carre", "inverse", "short"],
  },
  {
    kind: "template",
    id: "4e_aire_carre_x6_probleme",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 3,
    theme: "neutral",
    hint: "La surface d’un carré $= c^2$.",
    tags: ["aire", "carre", "probleme", "template"],
    generate: () => genCarreProbleme(),
  },
  {
    kind: "fixed",
    id: "4e_aire_carre_x7_distinction",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 3,
    theme: "neutral",
    text: "Un carré a un côté de $5$ cm. Quelle phrase est correcte ?",
    format: "qcm",
    choices: [
      "son aire est $25\\ \\text{cm}^2$ et son périmètre $20$ cm",
      "son aire est $20\\ \\text{cm}^2$ et son périmètre $25$ cm",
      "son aire est $10\\ \\text{cm}^2$",
      "son périmètre est $25$ cm",
    ],
    expected: ["son aire est $25\\ \\text{cm}^2$ et son périmètre $20$ cm"],
    comparator: "mcq_exact",
    hint: "Aire $= c^2$, périmètre $= 4c$.",
    explanation:
      "Définition : aire $= c^2$, périmètre $= 4c$.\n\nMéthode : on calcule les deux.\n\nCalcul : aire $= 5^2 = 25$ ; périmètre $= 4 \\times 5 = 20$.\n\nConclusion : aire $25\\ \\text{cm}^2$, périmètre $20$ cm.",
    tags: ["aire", "carre", "aire_perimetre", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_carre_x8",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_carre",
    difficulty: 2,
    theme: "neutral",
    hint: "$A = c^2$ ; si l’on connaît le périmètre, le côté vaut périmètre ÷ 4.",
    tags: ["aire", "carre", "template"],
    generate: () => genCarreNiveau2(),
  },

  /* ===== TRIANGLE (compléments) ===== */
  {
    kind: "template",
    id: "4e_aire_triangle_x1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "$A = \\dfrac{\\text{base} \\times \\text{hauteur}}{2}$.",
    tags: ["aire", "triangle", "template"],
    generate: () => genTriTexte(),
  },
  {
    kind: "fixed",
    id: "4e_aire_triangle_x2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle a une base de $12$ cm et une hauteur de $5$ cm. Quelle est son aire (en $\\text{cm}^2$) ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "$\\dfrac{12 \\times 5}{2}$.",
    explanation:
      "Définition : $A = \\dfrac{b \\times h}{2}$.\n\nMéthode : base × hauteur, puis ÷ $2$.\n\nCalcul : $\\dfrac{12 \\times 5}{2} = \\dfrac{60}{2} = 30$.\n\nConclusion : l’aire est $30\\ \\text{cm}^2$.",
    tags: ["aire", "triangle", "short"],
  },
  {
    kind: "template",
    id: "4e_aire_triangle_x3_rect",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un triangle rectangle, les deux côtés de l’angle droit sont la base et la hauteur.",
    tags: ["aire", "triangle_rectangle", "canvas", "template"],
    generate: () => genTriRectangle(),
  },
  {
    kind: "template",
    id: "4e_aire_triangle_x7_hauteur_exterieure",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "neutral",
    hint: "La hauteur est perpendiculaire à la DROITE qui porte la base : son pied peut tomber en dehors du côté.",
    tags: ["aire", "triangle", "hauteur", "canvas", "template"],
    generate: () => genTriHauteurExterieure(),
  },
  {
    kind: "template",
    id: "4e_aire_triangle_x8_erreur",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Refais le calcul : base × hauteur, puis ÷ 2 — et la hauteur n’est pas le côté penché.",
    tags: ["aire", "triangle", "erreur", "qcm", "template"],
    generate: () => genTriErreur(),
  },
  {
    kind: "fixed",
    id: "4e_aire_triangle_x4_piege",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule l’aire d’un triangle (base $10$, hauteur $6$) et trouve $60\\ \\text{cm}^2$. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il a oublié de diviser par $2$.",
    explanation:
      "Définition : $A = \\dfrac{b \\times h}{2}$.\n\nMéthode : on n’oublie pas le ÷ $2$.\n\nCalcul : $\\dfrac{10 \\times 6}{2} = 30$, pas $60$.\n\nConclusion : non, l’aire est $30\\ \\text{cm}^2$.",
    tags: ["aire", "triangle", "erreur", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_triangle_x5_hauteur_inverse",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 4,
    theme: "neutral",
    hint: "hauteur $= \\dfrac{2 \\times A}{\\text{base}}$.",
    tags: ["aire", "triangle", "inverse", "template"],
    generate: () => genTriInverse(),
  },
  {
    kind: "fixed",
    id: "4e_aire_triangle_x6_formule",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Pour calculer l’aire d’un triangle, après base × hauteur, on…",
    format: "qcm",
    choices: ["divise par $2$", "multiplie par $2$", "ajoute la base", "ne fait rien d’autre"],
    expected: ["divise par $2$"],
    comparator: "mcq_exact",
    hint: "Le triangle est la moitié d’un rectangle.",
    explanation:
      "Définition : un triangle est la moitié d’un rectangle.\n\nMéthode : on calcule base × hauteur, puis on divise par $2$.\n\nCalcul : $A = \\dfrac{b \\times h}{2}$.\n\nConclusion : on divise par $2$.",
    tags: ["aire", "triangle", "qcm"],
  },

  /* ===== PARALLELOGRAMME (compléments) ===== */
  {
    kind: "template",
    id: "4e_aire_parallelogramme_x1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 2,
    theme: "neutral",
    hint: "$A = \\text{base} \\times \\text{hauteur}$.",
    tags: ["aire", "parallelogramme", "template"],
    generate: () => genParaAire(),
  },
  {
    kind: "fixed",
    id: "4e_aire_parallelogramme_x2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 2,
    theme: "neutral",
    text: "Un parallélogramme a une base de $9$ cm et une hauteur de $6$ cm. Quelle est son aire (en $\\text{cm}^2$) ?",
    format: "short",
    expected: ["54"],
    comparator: "number_equal",
    hint: "$9 \\times 6$.",
    explanation:
      "Définition : $A = \\text{base} \\times \\text{hauteur}$.\n\nMéthode : on multiplie.\n\nCalcul : $9 \\times 6 = 54$.\n\nConclusion : l’aire est $54\\ \\text{cm}^2$.",
    tags: ["aire", "parallelogramme", "short"],
  },
  {
    kind: "fixed",
    id: "4e_aire_parallelogramme_x3_piege",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 3,
    theme: "neutral",
    text: "Pour l’aire d’un parallélogramme, on utilise…",
    format: "qcm",
    choices: ["la base et la hauteur", "la base et le côté incliné", "les deux côtés", "les diagonales"],
    expected: ["la base et la hauteur"],
    comparator: "mcq_exact",
    hint: "La hauteur est perpendiculaire à la base.",
    explanation:
      "Définition : l’aire utilise la hauteur perpendiculaire à la base.\n\nMéthode : on évite le côté incliné.\n\nCalcul : $A = \\text{base} \\times \\text{hauteur}$.\n\nConclusion : on utilise la base et la hauteur.",
    tags: ["aire", "parallelogramme", "erreur", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_parallelogramme_x4_inverse",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 4,
    theme: "neutral",
    hint: "hauteur $= \\dfrac{A}{\\text{base}}$.",
    tags: ["aire", "parallelogramme", "inverse", "template"],
    generate: () => genParaInverse(),
  },
  {
    kind: "fixed",
    id: "4e_aire_parallelogramme_x5_formule",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la formule de l’aire d’un parallélogramme ?",
    format: "qcm",
    choices: ["$\\text{base} \\times \\text{hauteur}$", "$\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$", "$2 \\times (\\text{base} + \\text{hauteur})$", "$\\text{côté}^2$"],
    expected: ["$\\text{base} \\times \\text{hauteur}$"],
    comparator: "mcq_exact",
    hint: "Comme un rectangle « penché ».",
    explanation:
      "Définition : un parallélogramme se ramène à un rectangle de mêmes base et hauteur.\n\nMéthode : on multiplie base et hauteur.\n\nCalcul : $A = \\text{base} \\times \\text{hauteur}$.\n\nConclusion : c’est base × hauteur.",
    tags: ["aire", "parallelogramme", "formule", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_parallelogramme_x6_probleme",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 3,
    theme: "neutral",
    hint: "Aire $= \\text{base} \\times \\text{hauteur}$.",
    tags: ["aire", "parallelogramme", "probleme", "template"],
    generate: () => genParaProbleme(),
  },

  /* ===== FIGURE (compléments) ===== */
  {
    kind: "template",
    id: "4e_aire_figure_x1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les carrés remplis.",
    tags: ["aire", "figure", "figure_libre", "template"],
    generate: () => genGrilleSimple(),
  },
  {
    kind: "template",
    id: "4e_aire_figure_x2_L",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte tous les carrés de la figure en L, puis tiens compte de l’aire d’un carreau.",
    tags: ["aire", "figure_composee", "figure_libre", "template"],
    generate: () => genGrilleEchelle(["L"]),
  },
  {
    kind: "fixed",
    id: "4e_aire_figure_x3_compose",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure",
    difficulty: 4,
    theme: "neutral",
    text: "Une figure est formée d’un rectangle de $6 \\times 4$ cm et d’un triangle (base $6$ cm, hauteur $3$ cm) posé dessus. Quelle est l’aire totale (en $\\text{cm}^2$) ?",
    format: "short",
    expected: ["33"],
    comparator: "number_equal",
    hint: "Rectangle $+$ triangle.",
    explanation:
      "Définition : l’aire d’une figure composée est la somme des aires.\n\nMéthode : rectangle $6 \\times 4 = 24$ ; triangle $\\dfrac{6 \\times 3}{2} = 9$.\n\nCalcul : $24 + 9 = 33$.\n\nConclusion : l’aire totale est $33\\ \\text{cm}^2$.",
    tags: ["aire", "figure_composee", "short"],
  },
  {
    kind: "fixed",
    id: "4e_aire_figure_x4_method",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer l’aire d’une figure composée, on…",
    format: "qcm",
    choices: [
      "la découpe en figures simples et on additionne les aires",
      "la découpe en figures simples et on additionne les périmètres",
      "la découpe en figures simples et on multiplie les aires",
      "l’entoure par un rectangle et on additionne les deux aires",
    ],
    expected: ["la découpe en figures simples et on additionne les aires"],
    comparator: "mcq_exact",
    hint: "On se ramène à des figures connues.",
    explanation:
      "Définition : une figure composée se ramène à des figures simples.\n\nMéthode : on découpe, on calcule chaque aire, puis on additionne (ou soustrait).\n\nCalcul : on combine les aires.\n\nConclusion : on découpe et on additionne les aires.",
    tags: ["aire", "figure", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_figure_x5_difference",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure",
    difficulty: 4,
    theme: "neutral",
    hint: "Grand rectangle moins le trou.",
    tags: ["aire", "figure_composee", "template"],
    generate: () => genDifference(),
  },
  {
    kind: "template",
    id: "4e_aire_figure_x6",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Somme de deux rectangles.",
    tags: ["aire", "figure_composee", "template"],
    generate: () => genDeuxRectangles(),
  },
  {
    kind: "template",
    id: "4e_aire_figure_x7_triangle_trapeze_disque",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure",
    difficulty: 4,
    theme: "neutral",
    hint: "Découpe en morceaux connus : rectangle, triangle, demi-disque ($\\pi r^2 \\div 2$).",
    tags: ["aire", "figure_composee", "trapeze", "disque", "template"],
    generate: () => genComposeeCourbe(),
  },

  /* ===== PROBLEME (compléments) ===== */
  {
    kind: "template",
    id: "4e_aire_probleme_x1_peinture",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule l’aire, puis multiplie par la quantité par m².",
    tags: ["aire", "probleme", "template"],
    generate: () => genQuantiteParM2(),
  },
  {
    kind: "template",
    id: "4e_aire_probleme_x2_terrasse",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule l’aire du rectangle en m², puis convertis si besoin : 1 are = 100 m², 1 ha = 10 000 m².",
    tags: ["aire", "probleme", "conversion", "template"],
    generate: () => genChampHectares(),
  },
  {
    kind: "template",
    id: "4e_aire_probleme_x3_carrelage",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Nombre de carreaux = aire de la pièce ÷ aire d’un carreau.",
    tags: ["aire", "probleme", "template"],
    generate: () => genNombreObjets(),
  },
  {
    kind: "fixed",
    id: "4e_aire_probleme_x4_qcm",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Pour savoir combien de gazon acheter pour couvrir un terrain, on calcule…",
    format: "qcm",
    choices: ["l’aire du terrain", "le périmètre du terrain", "la diagonale", "le volume"],
    expected: ["l’aire du terrain"],
    comparator: "mcq_exact",
    hint: "Le gazon couvre une surface.",
    explanation:
      "Définition : le gazon couvre une surface.\n\nMéthode : on calcule l’aire.\n\nCalcul : c’est la surface à couvrir.\n\nConclusion : on calcule l’aire.",
    tags: ["aire", "probleme", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_probleme_x5_cout",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Aire × prix au m².",
    tags: ["aire", "probleme", "template"],
    generate: () => genPrixParM2(),
  },
  {
    kind: "fixed",
    id: "4e_aire_probleme_x6_triangle",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une voile triangulaire a une base de $4$ m et une hauteur de $5$ m. Quelle est sa surface (en $\\text{m}^2$) ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$\\dfrac{4 \\times 5}{2}$.",
    explanation:
      "Définition : $A = \\dfrac{b \\times h}{2}$.\n\nMéthode : base × hauteur ÷ $2$.\n\nCalcul : $\\dfrac{4 \\times 5}{2} = 10$.\n\nConclusion : la surface est $10\\ \\text{m}^2$.",
    tags: ["aire", "probleme", "triangle", "short"],
  },

  /* ===== DEFI (compléments) ===== */
  {
    kind: "fixed",
    id: "4e_aire_defi_x1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux rectangles ont la même aire de $24\\ \\text{cm}^2$. Ont-ils forcément le même périmètre ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "$1 \\times 24$ et $4 \\times 6$ ont la même aire.",
    explanation:
      "Définition : aire et périmètre sont indépendants.\n\nMéthode : on cherche un contre-exemple à aire $24$.\n\nCalcul : $1 \\times 24$ (périmètre $50$) et $4 \\times 6$ (périmètre $20$) ont la même aire.\n\nConclusion : non, pas forcément le même périmètre.",
    tags: ["aire", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_defi_x2_agrandissement",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Aire multipliée par $k^2$.",
    tags: ["aire", "defi", "agrandissement", "template"],
    generate: () => genAgrandissementAire(),
  },
  {
    kind: "fixed",
    id: "4e_aire_defi_x3_disque",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text: "L’aire d’un disque de rayon $r$ est…",
    format: "qcm",
    choices: ["$\\pi r^2$", "$2\\pi r$", "$\\pi r$", "$\\pi d$"],
    expected: ["$\\pi r^2$"],
    comparator: "mcq_exact",
    hint: "$2\\pi r$ est le périmètre.",
    explanation:
      "Définition : l’aire d’un disque est $\\pi r^2$.\n\nMéthode : on distingue aire ($\\pi r^2$) et périmètre ($2\\pi r$).\n\nCalcul : aire $= \\pi r^2$.\n\nConclusion : c’est $\\pi r^2$.",
    tags: ["aire", "defi", "disque", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_defi_x4_compare",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule les deux aires.",
    tags: ["aire", "defi", "comparaison", "disque", "template"],
    generate: () => genCompareFigures(),
  },
  {
    kind: "fixed",
    id: "4e_aire_defi_x5_brevet",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un carré et un rectangle ont la même aire de $36\\ \\text{cm}^2$. Le carré a un côté de combien de cm ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "côté $= \\sqrt{36}$.",
    explanation:
      "Définition : aire d’un carré $= c^2$.\n\nMéthode : côté $= \\sqrt{\\text{aire}}$.\n\nCalcul : $\\sqrt{36} = 6$.\n\nConclusion : le côté du carré est $6$ cm.",
    tags: ["aire", "defi", "brevet", "short"],
  },
  {
    kind: "template",
    id: "4e_aire_defi_x6_param",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris l’aire avec la lettre, puis remplace la lettre par sa valeur.",
    tags: ["aire", "defi", "litteral", "template"],
    generate: () => genAireLitterale(),
  },
];
