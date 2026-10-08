// lib/tutor-v4/questionBank/4e/maths/perimetres.bank.ts
//
// ⛔⛔ 03/10/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». Mesuré avant ce jour :
// 7 à 10 squelettes d'énoncé par micro, 13 à 18 répétitions sur une série de
// 20. Chaque gabarit compose désormais une SITUATION (tables ci-dessous :
// clôtures, bordures, cadres, galons, pistes, rond-points, terrasses
// carrelées…) × une TOURNURE (3 à 6 façons de poser la même question), avec
// des figures variées (rectangle, carré, triangle, polygones, cercle, figures
// composées), des unités et des conversions, et l'arrondi avec π.
// Mesure : scripts/mesurer-squelettes-coach.ts 4e aire_perimetre.
//
// ⭐ LES FIGURES SONT JUSTES : le triangle est construit à partir de ses trois
// côtés (et non posé au hasard), le rectangle garde à peu près ses
// proportions, les noms des sommets du dessin sont ceux de l'énoncé.
//
// ⛔ 04/10/2026 — LES UNITÉS (« rajoute ABSOLUMENT les unités ! », Frédéric) :
// chaque réponse chiffrée porte son unité dans `expected` (« 24 cm » : « 24 »,
// « 24cm » passent, « 24 m » est refusé), l'énoncé dit l'unité attendue
// (voir `avecUnite`, au bas du fichier) et l'explication conclut avec elle.
// Seule exception : un coefficient (« par combien est-il multiplié ? »).
//
// ⭐ π : la réponse attendue accepte l'arrondi obtenu avec la touche π ET
// celui obtenu avec 3,14 quand ils diffèrent — l'élève de 4e utilise l'un ou
// l'autre, et les deux sont justes.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type {
  CercleCanvasData,
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

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/* ---------------------------------------------------------------------------
   Nombres : écriture française dans le texte ($12{,}5$), réponses attendues.
--------------------------------------------------------------------------- */
const arrondi = (x: number, d = 2) => Math.round(x * 10 ** d) / 10 ** d;

/** 1250.5 → « 1 250,5 ». */
function fr(n: number): string {
  const v = arrondi(n, 3);
  const [ent, dec] = String(Math.abs(v)).split(".");
  const entFr = ent.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (v < 0 ? "−" : "") + entFr + (dec ? "," + dec : "");
}
/** Le nombre tel qu'on l'écrit DANS une formule : « 12{,}5 », « 1\,250 ». */
const T = (n: number) => fr(n).replace(",", "{,}").replace(/ /g, "\\,");
/** Le nombre dans le texte : « $12{,}5$ ». */
const M = (n: number) => `$${T(n)}$`;
/** Une mesure dans le texte : « $12{,}5$ m ». */
const q = (n: number, u: string) => `${M(n)} ${u}`;

/**
 * ⛔ 04/10/2026 — « Périmètres : rajoute ABSOLUMENT les unités ! » (Frédéric).
 * Réponses acceptées pour une MESURE, unité comprise : « 12,5 cm » ; « 1250 m »
 * et « 1 250 m ». Avec l'unité dans `expected`, number_equal accepte « 12,5 »,
 * « 12,5 cm », « 12,5cm » et REFUSE « 12,5 m » (mesuré le 04/10).
 * Pour un nombre d'objets, `u` est le nom compté (« tours », « rouleaux »).
 */
function rep(n: number, u: string): string[] {
  const v = arrondi(n, 3);
  const s = String(v).replace(".", ",");
  const nums = Math.abs(v) >= 1000 ? [s, fr(v)] : [s];
  const out = nums.map((x) => `${x} ${u}`);
  if (u === "€") out.push(...nums.map((x) => `${x} euros`));
  return out;
}
/** Un nom compté, accordé : « 1 rouleau », « 3 rouleaux ». */
const compte = (n: number, sing: string, plur: string) => (n === 1 ? sing : plur);

/** Un calcul avec π, arrondi à `d` décimales : touche π et 3,14 acceptés. */
function avecPi(f: (pi: number) => number, d: number, u: string) {
  const a = arrondi(f(Math.PI), d);
  const b = arrondi(f(3.14), d);
  const exp = [`${String(a).replace(".", ",")} ${u}`];
  if (b !== a) exp.push(`${String(b).replace(".", ",")} ${u}`);
  const note = b !== a ? ` (avec $\\pi \\approx 3{,}14$, on trouve $${T(b)}$, accepté aussi)` : "";
  return { val: a, exp, note };
}
const MOT_ARRONDI: Record<number, string> = { 0: "à l’unité", 1: "au dixième", 2: "au centième" };

const E = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;
const DEF_P = "le périmètre d’une figure est la longueur de son contour.";

/** « 3 cm, 5 cm et 4 cm ». */
function liste(xs: string[]) {
  return xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}`;
}

/* ---------------------------------------------------------------------------
   Petite grammaire.
--------------------------------------------------------------------------- */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « le potager » → « du potager », « une nappe » → « d’une nappe ». */
function de(gn: string): string {
  if (gn.startsWith("le ")) return "du " + gn.slice(3);
  if (gn.startsWith("les ")) return "des " + gn.slice(4);
  if (/^(un|une) /.test(gn)) return "d’" + gn;
  return "de " + gn;
}
/** « de grillage », « d’osier ». */
const deNu = (n: string) => (/^[aeiouyéèêâîô]/i.test(n) ? "d’" + n : "de " + n);
const estFem = (gn: string) => /^(une|la) /.test(gn);
/** « clôturer » + « l’enclos » ; « orner tout le bord de » + « une nappe » → « orner tout le bord d’une nappe ». */
const pour = (but: string, gn: string) =>
  but.endsWith(" de") ? `${but.slice(0, -3)} ${de(gn)}` : `${but} ${gn}`;

const UMOT: Record<string, string> = {
  mm: "millimètres",
  cm: "centimètres",
  dm: "décimètres",
  m: "mètres",
  km: "kilomètres",
};

const PRENOMS = [
  { p: "Léa", f: true },
  { p: "Hugo", f: false },
  { p: "Inès", f: true },
  { p: "Noah", f: false },
  { p: "Chloé", f: true },
  { p: "Yanis", f: false },
  { p: "Manon", f: true },
  { p: "Lucas", f: false },
  { p: "Aïcha", f: true },
  { p: "Tom", f: false },
  { p: "Jade", f: true },
  { p: "Mathis", f: false },
  { p: "Sofia", f: true },
  { p: "Ethan", f: false },
] as const;
type Prenom = (typeof PRENOMS)[number];
const il = (p: Prenom) => (p.f ? "elle" : "il");
/** « de Léa », « d’Ethan », « d’Inès », « d’Hugo ». */
const deP = (p: Prenom) => (/^[aeiouéèêâîôœh]/i.test(p.p) ? "d’" : "de ") + p.p;

const RECT_NOMS = ["ABCD", "EFGH", "MNOP", "RSTU", "IJKL", "WXYZ", "PQRS", "KLMN"];
const TRI_NOMS = ["ABC", "EFG", "RST", "KLM", "IJK", "MNP", "DEF", "UVW", "XYZ", "PQR"];

/* ---------------------------------------------------------------------------
   Quadrillages (figures « à compter »).
--------------------------------------------------------------------------- */
type GridCell = [row: number, col: number];

function cellKey([row, col]: GridCell): string {
  return `${row}-${col}`;
}

function computeGridPerimeter(filledCells: GridCell[]) {
  const filled = new Set(filledCells.map(cellKey));
  let perimeter = 0;
  for (const [row, col] of filledCells) {
    const neighbors: GridCell[] = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];
    for (const n of neighbors) {
      if (!filled.has(cellKey(n))) perimeter += 1;
    }
  }
  return perimeter;
}

function rectangleCells(height: number, width: number): GridCell[] {
  const cells: GridCell[] = [];
  for (let r = 0; r < height; r++) for (let c = 0; c < width; c++) cells.push([r, c]);
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

function figureLibreFromCells(rows: number, cols: number, filledCells: GridCell[], showPerimeter = true) {
  return {
    kind: "figure_libre" as const,
    grid: { rows, cols, filledCells },
    display: {
      showGrid: true,
      showFilled: true,
      showCellLabels: false,
      showPerimeter,
      showVertices: false,
      showVertexLabels: false,
    },
    colors: { filled: "#dbeafe", grid: "#cbd5e1", border: "#0f172a", perimeter: "#dc2626" },
    size: { cellSize: 28, padding: 16, width: cols * 28 + 32, height: rows * 28 + 32 },
  };
}

/** Recadre les cases sur (0, 0). */
function recadrer(cells: GridCell[]) {
  const r0 = Math.min(...cells.map((c) => c[0]));
  const c0 = Math.min(...cells.map((c) => c[1]));
  const out = cells.map(([r, c]) => [r - r0, c - c0] as GridCell);
  return {
    cells: out,
    rows: Math.max(...out.map((c) => c[0])) + 1,
    cols: Math.max(...out.map((c) => c[1])) + 1,
  };
}

function connexe(cells: GridCell[]) {
  const set = new Set(cells.map(cellKey));
  const vu = new Set<string>([cellKey(cells[0])]);
  const pile: GridCell[] = [cells[0]];
  while (pile.length) {
    const [r, c] = pile.pop()!;
    for (const n of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]] as GridCell[]) {
      const k = cellKey(n);
      if (set.has(k) && !vu.has(k)) {
        vu.add(k);
        pile.push(n);
      }
    }
  }
  return vu.size === cells.length;
}

/** Une forme à compter, plus ou moins découpée selon l'étoile. */
function formeGrille(niveau: number): { cells: GridCell[]; rows: number; cols: number; mot: string } {
  if (niveau <= 2) {
    const h = randomInt(2, 5);
    const w = randomInt(3, 7);
    return { cells: rectangleCells(h, w), rows: h, cols: w, mot: "" };
  }
  if (niveau === 3) {
    const t = randomInt(0, 2);
    if (t === 0) {
      const a = randomInt(3, 6);
      const b = randomInt(3, 7);
      const cells = lShapeCells(a, b, randomInt(1, b - 2), randomInt(1, a - 2));
      return { ...recadrer(cells), mot: " en L" };
    }
    if (t === 1) {
      const w = randomInt(4, 7);
      const barH = randomInt(1, 2);
      const stemW = randomInt(1, w - 2);
      const start = Math.floor((w - stemW) / 2);
      const stemH = randomInt(2, 4);
      const cells: GridCell[] = [];
      for (let r = 0; r < barH + stemH; r++)
        for (let c = 0; c < w; c++) if (r < barH || (c >= start && c < start + stemW)) cells.push([r, c]);
      return { ...recadrer(cells), mot: " en T" };
    }
    const n = randomInt(3, 4);
    const sw = randomInt(1, 2);
    const sh = randomInt(1, 2);
    const cells: GridCell[] = [];
    for (let r = 0; r < n * sh; r++) {
      const largeur = (Math.floor(r / sh) + 1) * sw;
      for (let c = 0; c < largeur; c++) cells.push([r, c]);
    }
    return { ...recadrer(cells), mot: " en escalier" };
  }
  // ★4 et ★5 : un rectangle « grignoté » sur ses bords (coins ou milieux).
  for (let essai = 0; essai < 50; essai++) {
    const h = randomInt(4, 6);
    const w = randomInt(5, 8);
    let cells = rectangleCells(h, w);
    const morsures = niveau >= 5 ? 3 : 2;
    for (let k = 0; k < morsures; k++) {
      const bh = randomInt(1, Math.floor((h - 1) / 2));
      const bw = randomInt(1, Math.floor((w - 1) / 2));
      const cote = randomInt(0, 3);
      let r0: number;
      let c0: number;
      if (cote === 0) { r0 = 0; c0 = randomInt(0, w - bw); }
      else if (cote === 1) { r0 = h - bh; c0 = randomInt(0, w - bw); }
      else if (cote === 2) { c0 = 0; r0 = randomInt(0, h - bh); }
      else { c0 = w - bw; r0 = randomInt(0, h - bh); }
      cells = cells.filter(([r, c]) => !(r >= r0 && r < r0 + bh && c >= c0 && c < c0 + bw));
    }
    if (cells.length >= 0.55 * h * w && connexe(cells)) {
      const p = computeGridPerimeter(cells);
      if (p > 2 * (h + w)) return { ...recadrer(cells), mot: "" };
    }
  }
  return { ...recadrer(lShapeCells(5, 6, 2, 2)), mot: "" };
}

const GRILLES: { intro: string; obj: string; sq: string; cotes: [number, string][] }[] = [
  { intro: "La figure est tracée sur un quadrillage", obj: "la figure", sq: "chaque carreau", cotes: [[1, "cm"], [5, "mm"]] },
  { intro: "Ce dessin représente une terrasse vue de dessus", obj: "la terrasse", sq: "chaque dalle", cotes: [[50, "cm"], [1, "m"]] },
  { intro: "Ce plan montre un potager découpé en parcelles carrées", obj: "le potager", sq: "chaque parcelle", cotes: [[2, "m"], [3, "m"]] },
  { intro: "Voici une mosaïque", obj: "la mosaïque", sq: "chaque petit carreau", cotes: [[2, "cm"], [3, "cm"]] },
  { intro: "Voici un dessin en pixel art", obj: "le dessin", sq: "chaque pixel", cotes: [[1, "mm"], [2, "mm"]] },
  { intro: "Ce dessin représente le sol carrelé d’une salle de bains", obj: "la salle de bains", sq: "chaque carreau", cotes: [[20, "cm"], [30, "cm"]] },
  { intro: "Voici un patchwork cousu avec des carrés de tissu", obj: "le patchwork", sq: "chaque carré de tissu", cotes: [[10, "cm"], [15, "cm"]] },
  { intro: "Ce plan représente un tapis de gymnastique fait de dalles de mousse", obj: "le tapis", sq: "chaque dalle", cotes: [[50, "cm"], [1, "m"]] },
  { intro: "Voici ce qui reste d’une tablette de chocolat", obj: "ce morceau de tablette", sq: "chaque carré de chocolat", cotes: [[2, "cm"], [3, "cm"]] },
  { intro: "Ce plan montre un champ partagé en parcelles carrées", obj: "le champ", sq: "chaque parcelle", cotes: [[10, "m"], [20, "m"]] },
  { intro: "Voici un plateau de jeu", obj: "le plateau", sq: "chaque case", cotes: [[3, "cm"], [4, "cm"]] },
  { intro: "Voici une fresque peinte sur un mur quadrillé", obj: "la fresque", sq: "chaque carreau", cotes: [[50, "cm"], [1, "m"]] },
  { intro: "Ce schéma représente une salle d’exposition vue de dessus", obj: "la salle", sq: "chaque carreau du sol", cotes: [[1, "m"], [2, "m"]] },
  { intro: "Voici la forme d’un jardin dessinée sur du papier quadrillé", obj: "le jardin", sq: "chaque carreau", cotes: [[1, "m"], [5, "m"]] },
  { intro: "Ce dessin montre un panneau solaire vu de face", obj: "le panneau", sq: "chaque cellule", cotes: [[15, "cm"], [20, "cm"]] },
  { intro: "Voici une piscine dessinée sur un plan quadrillé", obj: "la piscine", sq: "chaque carreau du plan", cotes: [[1, "m"], [2, "m"]] },
];

function questionGrille(niveau: number): Q {
  const g = randomChoice(GRILLES);
  const [v, u] = randomChoice(g.cotes);
  const f = formeGrille(niveau);
  const n = computeGridPerimeter(f.cells);
  const total = n * v;
  // ★4-5 : on demande parfois le résultat dans une autre unité.
  let ua = u;
  let res = total;
  if (niveau >= 4 && u === "cm" && v >= 10 && Math.random() < 0.5) {
    ua = "m";
    res = total / 100;
  } else if (niveau >= 4 && u === "mm" && Math.random() < 0.5) {
    ua = "cm";
    res = total / 10;
  }
  const enonce = randomChoice([
    `${cap(g.sq)} est un carré de ${q(v, u)} de côté.`,
    `${cap(g.sq)} mesure ${q(v, u)} de côté.`,
  ]);
  const enUa = ` Donne la réponse en ${ua}.`;
  const question = randomChoice([
    `Quel est le périmètre ${de(g.obj)} ?${enUa}`,
    `Calcule la longueur du contour ${de(g.obj)}, en ${ua}.`,
    `Combien de ${UMOT[ua]} mesure le tour ${de(g.obj)} ?`,
    `Quelle longueur de bordure faudrait-il pour faire tout le tour ${de(g.obj)} ?${enUa}`,
  ]);
  const conv = ua !== u ? ` ; en ${ua} : ${M(total)} ${u} $=$ ${q(res, ua)}` : "";
  return {
    text: `${g.intro}.${f.mot ? ` Le contour forme une figure${f.mot}.` : ""} ${enonce} ${question}`,
    format: "short",
    expected: rep(res, ua),
    comparator: "number_equal",
    explanation: E(
      DEF_P,
      "on suit le bord extérieur et on compte les côtés de carreau ; les traits intérieurs ne comptent pas.",
      `le contour compte $${n}$ côtés de carreau, chacun de ${q(v, u)} : $${n} \\times ${T(v)} = ${T(total)}$ ${u}${conv}.`,
      `le périmètre ${de(g.obj)} est ${q(res, ua)}.`
    ),
    canvas: figureLibreFromCells(f.rows, f.cols, f.cells, true),
  };
}

/* ---------------------------------------------------------------------------
   Figures dessinées.
--------------------------------------------------------------------------- */
function rectCanvas(nom: string, L: number, l: number, labL: string, labl: string): QuadrilatereCanvasData {
  const W = 200;
  const H = Math.max(50, Math.min(150, Math.round((W * l) / L)));
  const x0 = 40;
  const y0 = 40;
  return {
    kind: "quadrilatere",
    points: {
      A: { x: x0, y: y0 },
      B: { x: x0 + W, y: y0 },
      C: { x: x0 + W, y: y0 + H },
      D: { x: x0, y: y0 + H },
    },
    labels: { A: nom[0], B: nom[1], C: nom[2], D: nom[3] },
    sideLabels: { AB: labL, BC: labl },
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: false, showDiagonals: false },
    marks: { rightAnglesAt: ["A", "B", "C", "D"] },
    size: { width: W + 80, height: H + 80 },
  };
}

function carreCanvas(nom: string, lab: string): QuadrilatereCanvasData {
  const c = 150;
  const x0 = 50;
  const y0 = 40;
  return {
    kind: "quadrilatere",
    points: {
      A: { x: x0, y: y0 },
      B: { x: x0 + c, y: y0 },
      C: { x: x0 + c, y: y0 + c },
      D: { x: x0, y: y0 + c },
    },
    labels: { A: nom[0], B: nom[1], C: nom[2], D: nom[3] },
    sideLabels: { AB: lab },
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: false, showDiagonals: false },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
    },
    size: { width: c + 100, height: c + 80 },
  };
}

type CoteTri = "AB" | "BC" | "CA";
/** Le triangle construit à partir de SES côtés (AB, BC, CA), mis à l'échelle. */
function triCanvas(
  nom: string,
  ab: number,
  bc: number,
  ca: number,
  labs: Partial<Record<CoteTri, string>>,
  egaux?: Array<[CoteTri, CoteTri]>
): TriangleCanvasData {
  const x = (ca * ca + ab * ab - bc * bc) / (2 * ab);
  const y = Math.sqrt(Math.max(0, ca * ca - x * x));
  const minX = Math.min(0, x);
  const maxX = Math.max(ab, x);
  const s = Math.min(220 / (maxX - minX), 140 / Math.max(y, 0.0001));
  const px = (v: number) => Math.round(30 + (v - minX) * s);
  const py = (v: number) => Math.round(30 + (y - v) * s);
  return {
    kind: "triangle",
    points: { A: { x: px(0), y: py(0) }, B: { x: px(ab), y: py(0) }, C: { x: px(x), y: py(y) } },
    labels: { A: nom[0], B: nom[1], C: nom[2] },
    sideLabels: labs,
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
    ...(egaux ? { marks: { equalSides: egaux } } : {}),
    size: { width: Math.max(220, Math.round((maxX - minX) * s) + 60), height: Math.max(140, Math.round(y * s) + 60) },
  };
}

/** Trois côtés entiers d'un vrai triangle (ni plat, ni trop écrasé). */
function cotesTriangle(min: number, max: number): [number, number, number] {
  for (let k = 0; k < 200; k++) {
    const a = randomInt(min, max);
    const b = randomInt(min, max);
    const c = randomInt(min, max);
    const m = Math.max(a, b, c);
    if (a + b + c - m > m * 1.25) return [a, b, c];
  }
  return [min + 2, min + 3, min + 4];
}

function cercleCanvas(type: "rayon" | "diametre", label: string): CercleCanvasData {
  const cx = 150;
  const cy = 120;
  const r = 85;
  const ax = Math.round(cx + r * Math.cos(Math.PI / 6));
  const ay = Math.round(cy - r * Math.sin(Math.PI / 6));
  const bx = Math.round(cx - r * Math.cos(Math.PI / 6));
  const by = Math.round(cy + r * Math.sin(Math.PI / 6));
  return {
    kind: "cercle",
    size: { width: 300, height: 240 },
    circle: { cx, cy, r, showCircle: true },
    points: [
      { id: "O", x: cx, y: cy, label: "O" },
      { id: "A", x: ax, y: ay, label: "A" },
      ...(type === "diametre" ? [{ id: "B", x: bx, y: by, label: "B" }] : []),
    ],
    segments: [
      type === "rayon"
        ? { id: "s1", kind: "rayon" as const, from: "O", to: "A", label, highlight: true }
        : { id: "s1", kind: "diametre" as const, from: "B", to: "A", label, highlight: true },
    ],
    display: {
      showLabels: true,
      showPoints: true,
      showCenter: true,
      showRadius: type === "rayon",
      showDiameter: type === "diametre",
    },
  };
}

/* ---------------------------------------------------------------------------
   LES CONTOURS DE LA VIE RÉELLE : un objet, son unité, ses dimensions
   plausibles, ce qu'on pose autour et pourquoi.
   `carre: false` : l'objet n'existe guère en carré.
   `porte: true` : on y laisse une ouverture (portail, portillon).
--------------------------------------------------------------------------- */
type Contour = {
  un: string;
  le: string;
  u: "cm" | "m";
  L: [number, number];
  l: [number, number];
  mat: string;
  prix: [number, number];
  but: string;
  carre?: boolean;
  porte?: boolean;
};
const CONTOURS: Contour[] = [
  { un: "un enclos à moutons", le: "l’enclos", u: "m", L: [15, 40], l: [8, 14], mat: "grillage", prix: [2, 6], but: "clôturer", porte: true },
  { un: "un potager", le: "le potager", u: "m", L: [5, 12], l: [2, 4], mat: "bordure en bois", prix: [3, 9], but: "border", porte: true },
  { un: "un massif de fleurs", le: "le massif", u: "m", L: [3, 9], l: [1, 2], mat: "bordure en pierre", prix: [5, 15], but: "border" },
  { un: "un cadre photo", le: "le cadre", u: "cm", L: [20, 45], l: [12, 18], mat: "baguette", prix: [4, 12], but: "fabriquer" },
  { un: "une nappe", le: "la nappe", u: "cm", L: [160, 240], l: [100, 140], mat: "galon", prix: [1, 4], but: "orner tout le bord de" },
  { un: "un tapis", le: "le tapis", u: "cm", L: [150, 220], l: [70, 120], mat: "frange", prix: [2, 6], but: "border" },
  { un: "une fenêtre", le: "la fenêtre", u: "cm", L: [100, 140], l: [50, 90], mat: "joint isolant", prix: [1, 4], but: "isoler le pourtour de" },
  { un: "un tableau d’affichage", le: "le tableau", u: "cm", L: [80, 150], l: [50, 70], mat: "ruban adhésif", prix: [1, 3], but: "encadrer" },
  { un: "un champ", le: "le champ", u: "m", L: [80, 200], l: [40, 70], mat: "clôture électrique", prix: [1, 3], but: "clôturer", porte: true },
  { un: "un poulailler", le: "le poulailler", u: "m", L: [4, 9], l: [2, 3], mat: "grillage", prix: [2, 6], but: "entourer", porte: true },
  { un: "une cour d’école", le: "la cour", u: "m", L: [30, 60], l: [15, 25], mat: "grillage", prix: [2, 6], but: "clôturer", porte: true },
  { un: "un terrain de pétanque", le: "le terrain", u: "m", L: [12, 15], l: [3, 4], mat: "bordure en bois", prix: [3, 9], but: "délimiter", carre: false },
  { un: "une vitrine de magasin", le: "la vitrine", u: "m", L: [4, 6], l: [2, 3], mat: "guirlande lumineuse", prix: [2, 5], but: "décorer le contour de", carre: false },
  { un: "une piscine", le: "la piscine", u: "m", L: [8, 15], l: [4, 6], mat: "corde de sécurité", prix: [1, 4], but: "entourer", porte: true },
  { un: "un paddock pour chevaux", le: "le paddock", u: "m", L: [30, 60], l: [20, 28], mat: "lice en bois", prix: [4, 12], but: "clôturer", porte: true },
  { un: "un drapeau", le: "le drapeau", u: "cm", L: [90, 150], l: [60, 85], mat: "ruban", prix: [1, 3], but: "border", carre: false },
  { un: "une couverture", le: "la couverture", u: "cm", L: [180, 220], l: [130, 160], mat: "ruban de satin", prix: [2, 5], but: "border" },
  { un: "un verger", le: "le verger", u: "m", L: [40, 90], l: [25, 35], mat: "haie", prix: [5, 15], but: "entourer", porte: true },
  { un: "un champ de canne à sucre", le: "le champ", u: "m", L: [90, 200], l: [50, 80], mat: "clôture", prix: [2, 5], but: "clôturer", porte: true },
  { un: "un miroir", le: "le miroir", u: "cm", L: [60, 120], l: [40, 55], mat: "baguette de finition", prix: [4, 12], but: "encadrer" },
  { un: "un rideau", le: "le rideau", u: "cm", L: [200, 260], l: [120, 150], mat: "galon", prix: [1, 4], but: "border" },
  { un: "une toile de peintre", le: "la toile", u: "cm", L: [50, 100], l: [30, 45], mat: "baguette", prix: [4, 12], but: "encadrer" },
];
const CONTOURS_CM = CONTOURS.filter((c) => c.u === "cm");
const CONTOURS_CARRES = CONTOURS.filter((c) => c.carre !== false);
const adjCarre = (gn: string) => (estFem(gn) ? "carrée" : "carré");

/** Des dimensions pour un contexte ; au besoin des demi-mètres. */
function dims(c: Contour, demi = false) {
  let L = randomInt(c.L[0], c.L[1]);
  let l = randomInt(c.l[0], c.l[1]);
  if (c.u === "cm" && L >= 100) {
    L = Math.round(L / 5) * 5;
    l = Math.round(l / 5) * 5;
  }
  if (demi && c.u === "m" && Math.random() < 0.5) {
    if (Math.random() < 0.5) L += 0.5;
    else l += 0.5;
  }
  if (l >= L) l = L - 1;
  return { L, l };
}

/* ===========================================================================
   COMPRENDRE
=========================================================================== */
const SITUATIONS: { s: string; g: "p" | "a" }[] = [
  { s: "poser un galon tout autour d’une nappe", g: "p" },
  { s: "clôturer un enclos à chèvres", g: "p" },
  { s: "border un massif de fleurs avec des pavés", g: "p" },
  { s: "fixer une baguette autour d’un cadre photo", g: "p" },
  { s: "connaître la distance parcourue en un tour de piste", g: "p" },
  { s: "poser des plinthes au bas des murs d’une chambre", g: "p" },
  { s: "entourer un gâteau d’un ruban", g: "p" },
  { s: "installer une guirlande lumineuse autour d’une fenêtre", g: "p" },
  { s: "poser un joint tout autour d’une porte", g: "p" },
  { s: "planter une haie tout autour d’un jardin", g: "p" },
  { s: "faire une fois le tour d’un rond-point à vélo", g: "p" },
  { s: "coudre une dentelle sur le bord d’un mouchoir", g: "p" },
  { s: "tracer le contour d’un terrain de basket", g: "p" },
  { s: "tendre une corde de sécurité autour d’une piscine", g: "p" },
  { s: "faire courir un fil électrique autour d’un pré", g: "p" },
  { s: "peindre un mur", g: "a" },
  { s: "semer du gazon dans un jardin", g: "a" },
  { s: "carreler le sol d’une salle de bains", g: "a" },
  { s: "poser de la moquette dans une chambre", g: "a" },
  { s: "recouvrir une table d’une nappe", g: "a" },
  { s: "couvrir un toit de tuiles", g: "a" },
  { s: "vernir le plateau d’une table", g: "a" },
  { s: "couvrir une piscine avec une bâche", g: "a" },
  { s: "acheter du papier peint pour une chambre", g: "a" },
  { s: "épandre de l’engrais sur un champ", g: "a" },
  { s: "poser des panneaux solaires sur un toit", g: "a" },
  { s: "goudronner un parking", g: "a" },
  { s: "recouvrir un cahier de papier", g: "a" },
  { s: "repeindre la porte d’un garage", g: "a" },
];

function compGrandeur(): Q {
  const { s, g } = randomChoice(SITUATIONS);
  const p = randomChoice(PRENOMS);
  const peri = g === "p";
  const formes = [
    () => ({
      text: `Pour ${s}, faut-il calculer un périmètre ou une aire ?`,
      ok: peri ? "un périmètre" : "une aire",
      faux: [peri ? "une aire" : "un périmètre", "un volume", "une durée"],
    }),
    () => ({
      text: `${p.p} veut ${s}. Quelle grandeur doit-${il(p)} calculer ?`,
      ok: peri ? "le périmètre" : "l’aire",
      faux: [peri ? "l’aire" : "le périmètre", "le volume", "la masse"],
    }),
    () => ({
      text: `Quelle grandeur faut-il connaître pour ${s} ?`,
      ok: peri ? "le périmètre" : "l’aire",
      faux: [peri ? "l’aire" : "le périmètre", "le volume", "un angle"],
    }),
    () => ({
      text: `On souhaite ${s}. Que faut-il mesurer ?`,
      ok: peri ? "la longueur du contour" : "la surface",
      faux: [peri ? "la surface" : "la longueur du contour", "le volume", "la hauteur seulement"],
    }),
    () => ({
      text: `« ${cap(s)} » : est-ce un problème de contour ou de surface ?`,
      ok: peri ? "de contour, donc de périmètre" : "de surface, donc d’aire",
      faux: [peri ? "de surface, donc d’aire" : "de contour, donc de périmètre", "de volume", "d’angle"],
    }),
  ];
  const f = randomChoice(formes)();
  return {
    text: f.text,
    format: "qcm",
    choices: makeChoices(f.ok, f.faux),
    expected: [f.ok],
    comparator: "mcq_exact",
    explanation: E(
      peri ? DEF_P : "l’aire mesure la surface occupée par une figure.",
      `pour ${s}, on s’intéresse ${peri ? "au bord, au tour complet" : "à toute la surface, pas seulement au bord"}.`,
      `le résultat s’exprimera ${peri ? "en m ou en cm (une longueur)" : "en m² ou en cm² (une aire)"}.`,
      `il faut calculer ${peri ? "le périmètre" : "l’aire"}.`
    ),
  };
}

const OBJ_UNITE: { gn: string; u: string }[] = [
  { gn: "un timbre", u: "mm" },
  { gn: "une carte à jouer", u: "mm" },
  { gn: "un cadre photo", u: "cm" },
  { gn: "une feuille de papier", u: "cm" },
  { gn: "une table", u: "cm" },
  { gn: "un écran de téléphone", u: "mm" },
  { gn: "une chambre", u: "m" },
  { gn: "un terrain de football", u: "m" },
  { gn: "un champ", u: "m" },
  { gn: "une piscine", u: "m" },
  { gn: "un lac", u: "km" },
  { gn: "une île", u: "km" },
  { gn: "une forêt", u: "km" },
  { gn: "un tapis", u: "cm" },
  { gn: "une cour de récréation", u: "m" },
];

function compUnite(): Q {
  const { gn, u } = randomChoice(OBJ_UNITE);
  const peri = Math.random() < 0.55;
  const p = randomChoice(PRENOMS);
  const gr = peri ? "le périmètre" : "l’aire";
  const text = randomChoice([
    `${cap(gr)} ${de(gn)} s’exprime en…`,
    `On mesure ${peri ? "le tour" : "la surface"} ${de(gn)}. Quelle unité convient ?`,
    `${p.p} calcule ${gr} ${de(gn)}. Dans quelle unité donne-t-${il(p)} son résultat ?`,
    `Quelle unité choisir pour ${gr} ${de(gn)} ?`,
  ]);
  const ok = peri ? u : `${u}²`;
  const faux = peri ? [`${u}²`, `${u}³`, "L"] : [u, `${u}³`, "kg"];
  return {
    text,
    format: "qcm",
    choices: makeChoices(ok, faux),
    expected: [ok],
    comparator: "mcq_exact",
    explanation: E(
      peri ? "le périmètre est une LONGUEUR." : "l’aire est une SURFACE.",
      peri ? "une longueur s’exprime avec une unité de longueur, sans exposant." : "une aire s’exprime en unité « au carré ».",
      peri ? `${u}² serait une aire, ${u}³ un volume.` : `${u} serait une longueur, ${u}³ un volume.`,
      `on l’exprime en ${ok}.`
    ),
  };
}

const POLYS = [
  { nom: "quadrilatère", n: 4 },
  { nom: "pentagone", n: 5 },
  { nom: "hexagone", n: 6 },
];
const POLY_NOMS = ["ABCDEF", "EFGHIJ", "MNOPQR", "RSTUVW", "IJKLMN", "PQRSTU"];
const LIEUX_POLY = [
  { un: "un terrain", le: "le terrain", u: "m", r: [8, 40] },
  { un: "une parcelle de jardin", le: "la parcelle", u: "m", r: [4, 15] },
  { un: "un champ", le: "le champ", u: "m", r: [30, 90] },
  { un: "une cour", le: "la cour", u: "m", r: [10, 30] },
  { un: "une terrasse", le: "la terrasse", u: "m", r: [2, 8] },
  { un: "un panneau de bois", le: "le panneau", u: "cm", r: [20, 60] },
  { un: "une étiquette", le: "l’étiquette", u: "cm", r: [2, 9] },
  { un: "un vitrail", le: "le vitrail", u: "cm", r: [15, 45] },
  { un: "une parcelle de forêt", le: "la parcelle", u: "m", r: [50, 150] },
  { un: "un bassin", le: "le bassin", u: "m", r: [2, 9] },
] as const;

function compPolygone(): Q {
  const poly = randomChoice(POLYS);
  const lieu = randomChoice(LIEUX_POLY);
  const u = lieu.u;
  let cotes: number[] = [];
  for (let k = 0; k < 100; k++) {
    cotes = Array.from({ length: poly.n }, () => randomInt(lieu.r[0], lieu.r[1]));
    const m = Math.max(...cotes);
    if (cotes.reduce((s, x) => s + x, 0) - m > m) break;
  }
  const P = cotes.reduce((s, x) => s + x, 0);
  const nom = randomChoice(POLY_NOMS).slice(0, poly.n);
  const mes = cotes.map((c) => q(c, u));
  const segs = cotes.map((c, i) => `${nom[i]}${nom[(i + 1) % poly.n]} $=$ ${q(c, u)}`);
  const text = randomChoice([
    `${poly.n === 6 ? "L’" : "Le "}${poly.nom} ${nom} a des côtés de ${liste(mes)}. Quel est son périmètre ?`,
    `Calcule le périmètre d’un ${poly.nom} dont les côtés mesurent ${liste(mes)}.`,
    `${cap(lieu.un)} a la forme d’un ${poly.nom} dont les côtés mesurent ${liste(mes)}. Quelle est la longueur de son contour ?`,
    `On fait une fois le tour ${de(lieu.le)}, un ${poly.nom} de côtés ${liste(mes)}. Quelle distance parcourt-on ?`,
    `Dans ${poly.n === 6 ? "l’" : "le "}${poly.nom} ${nom} : ${liste(segs)}. Calcule son périmètre.`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(P, u),
    comparator: "number_equal",
    explanation: E(
      DEF_P,
      `un ${poly.nom} a ${poly.n} côtés : on les additionne tous.`,
      `$${cotes.map(T).join(" + ")} = ${T(P)}$.`,
      `le périmètre est ${q(P, u)}.`
    ),
  };
}

const REGULIERS = [
  { fig: "un carré", n: 4 },
  { fig: "un triangle équilatéral", n: 3 },
  { fig: "un pentagone régulier", n: 5 },
  { fig: "un hexagone régulier", n: 6 },
  { fig: "un octogone régulier", n: 8 },
  { fig: "un losange", n: 4 },
];
const OBJ_REGULIERS: { gn: string; k: number; u: string; r: [number, number] }[] = [
  { gn: "un panneau « stop »", k: 4, u: "cm", r: [25, 40] },
  { gn: "un écrou", k: 3, u: "mm", r: [5, 12] },
  { gn: "une dalle hexagonale", k: 3, u: "cm", r: [10, 25] },
  { gn: "un kiosque à musique", k: 4, u: "m", r: [3, 6] },
  { gn: "un panneau « cédez le passage »", k: 1, u: "cm", r: [70, 100] },
  { gn: "un triangle de billard", k: 1, u: "cm", r: [28, 35] },
  { gn: "un carreau de faïence", k: 0, u: "cm", r: [10, 20] },
  { gn: "un cerf-volant", k: 5, u: "cm", r: [40, 80] },
  { gn: "une table octogonale", k: 4, u: "cm", r: [40, 60] },
  { gn: "un abri de jardin", k: 3, u: "m", r: [2, 4] },
  { gn: "une tuile de jeu de société", k: 3, u: "cm", r: [4, 6] },
  { gn: "une case d’échiquier", k: 0, u: "cm", r: [3, 6] },
  { gn: "une boîte à bijoux pentagonale (vue de dessus)", k: 2, u: "cm", r: [6, 12] },
];

function compRegulier(): Q {
  const o = randomChoice(OBJ_REGULIERS);
  const fig = REGULIERS[o.k];
  const c = randomInt(o.r[0], o.r[1]);
  const P = fig.n * c;
  const text = randomChoice([
    `Calcule le périmètre ${de(fig.fig)} de côté ${q(c, o.u)}.`,
    `${cap(fig.fig)} a tous ses côtés égaux à ${q(c, o.u)}. Quel est son périmètre ?`,
    `${cap(o.gn)} a la forme ${de(fig.fig)} de ${q(c, o.u)} de côté. Quelle est la longueur de son contour ?`,
    `Combien mesure le tour ${de(o.gn)}, en forme ${de(fig.fig)} de ${q(c, o.u)} de côté ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(P, o.u),
    comparator: "number_equal",
    explanation: E(
      DEF_P,
      `${fig.fig} a ${fig.n} côtés de même longueur : on multiplie le côté par ${fig.n}.`,
      `$${fig.n} \\times ${T(c)} = ${T(P)}$.`,
      `le périmètre est ${q(P, o.u)}.`
    ),
  };
}

const ECHELLE_FIGS = [
  { un: "une photo", le: "la photo" },
  { un: "le plan d’une maison", le: "le plan" },
  { un: "un logo", le: "le logo" },
  { un: "la maquette d’un stade", le: "la maquette" },
  { un: "un dessin", le: "le dessin" },
  { un: "le patron d’une boîte", le: "le patron" },
  { un: "une figure géométrique", le: "la figure" },
  { un: "la carte d’un parc", le: "la carte" },
  { un: "un motif de tissu", le: "le motif" },
  { un: "une affiche", le: "l’affiche" },
];
const FACTEURS: { k: number; mot: string; verbe: string }[] = [
  { k: 2, mot: "doublées", verbe: "agrandit" },
  { k: 3, mot: "triplées", verbe: "agrandit" },
  { k: 4, mot: "multipliées par 4", verbe: "agrandit" },
  { k: 10, mot: "multipliées par 10", verbe: "agrandit" },
  { k: 0.5, mot: "divisées par 2", verbe: "réduit" },
  { k: 1.5, mot: "multipliées par 1,5", verbe: "agrandit" },
];

function compEchelle(): Q {
  const f = randomChoice(ECHELLE_FIGS);
  const fa = randomChoice(FACTEURS);
  const u = randomChoice(["cm", "cm", "cm", "dm"]);
  const P = randomInt(6, 40) * 2;
  const res = P * fa.k;
  const fem = estFem(f.le) || f.le.startsWith("l’affiche");
  const text = randomChoice([
    `Le contour ${de(f.un)} mesure ${q(P, u)}. On ${fa.verbe} ${f.le} : toutes ses longueurs sont ${fa.mot}. Quel est le nouveau périmètre ?`,
    `${cap(f.le)} a un périmètre de ${q(P, u)}. On en fait une copie dont toutes les longueurs sont ${fa.mot}. Quel est le périmètre de la copie ?`,
    `On ${fa.verbe} ${f.le} : ses longueurs sont ${fa.mot}. Son périmètre était de ${q(P, u)}. Que devient-il ?`,
    `${cap(f.le)}, de périmètre ${q(P, u)}, est ${fem ? "reproduite" : "reproduit"} avec des longueurs ${fa.mot}. Calcule le nouveau périmètre.`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(res, u),
    comparator: "number_equal",
    explanation: E(
      "le périmètre est une longueur : il change comme les longueurs.",
      `si toutes les longueurs sont multipliées par $${T(fa.k)}$, le périmètre aussi (et non par $${T(fa.k)}^2$ : ça, c’est l’aire).`,
      `$${T(P)} \\times ${T(fa.k)} = ${T(res)}$.`,
      `le nouveau périmètre est ${q(res, u)}.`
    ),
  };
}

/* ===========================================================================
   RECTANGLE
=========================================================================== */
function rectFigure(decimaux: boolean): Q {
  const nom = randomChoice(RECT_NOMS);
  const u = randomChoice(["mm", "cm", "m", "dm"]);
  let L = randomInt(5, 15);
  let l = randomInt(2, L - 2);
  if (decimaux) {
    if (Math.random() < 0.6) L += 0.5;
    if (Math.random() < 0.5) l += 0.5;
  }
  const P = 2 * (L + l);
  const ab = nom[0] + nom[1];
  const bc = nom[1] + nom[2];
  const text = randomChoice([
    `Calcule le périmètre du rectangle ${nom} ci-dessous, en ${u}.`,
    `Quel est le périmètre du rectangle ${nom} représenté (en ${u}) ?`,
    `Le rectangle ${nom} a pour longueur ${ab} $=$ ${q(L, u)} et pour largeur ${bc} $=$ ${q(l, u)}. Quel est son périmètre ?`,
    `${nom} est un rectangle tel que ${ab} $=$ ${q(L, u)} et ${bc} $=$ ${q(l, u)}. Calcule son périmètre.`,
    `Sur la figure, ${nom} est un rectangle. Quelle est la longueur de son contour, en ${u} ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(P, u),
    comparator: "number_equal",
    explanation: E(
      DEF_P,
      "un rectangle a deux longueurs et deux largeurs : $P = 2 \\times (L + l)$.",
      `$2 \\times (${T(L)} + ${T(l)}) = 2 \\times ${T(L + l)} = ${T(P)}$.`,
      `le périmètre du rectangle ${nom} est ${q(P, u)}.`
    ),
    canvas: rectCanvas(nom, L, l, `${fr(L)} ${u}`, `${fr(l)} ${u}`),
  };
}

function rectTexte(): Q {
  const u = randomChoice(["mm", "cm", "m", "dm"]);
  let L = randomInt(4, 20);
  let l = randomInt(2, L - 1);
  if (Math.random() < 0.4) L += 0.5;
  if (Math.random() < 0.3) l += 0.5;
  const P = 2 * (L + l);
  const text = randomChoice([
    `Calcule le périmètre d’un rectangle de longueur ${q(L, u)} et de largeur ${q(l, u)}.`,
    `Un rectangle mesure ${q(L, u)} sur ${q(l, u)}. Quel est son périmètre ?`,
    `Quel est le périmètre d’un rectangle dont la largeur vaut ${q(l, u)} et la longueur ${q(L, u)} ?`,
    `Longueur : ${q(L, u)}. Largeur : ${q(l, u)}. Donne le périmètre de ce rectangle.`,
    `Un rectangle a deux côtés de ${q(L, u)} et deux côtés de ${q(l, u)}. Que vaut son périmètre ?`,
    `Que vaut le périmètre d’un rectangle de ${q(L, u)} de long et ${q(l, u)} de large ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(P, u),
    comparator: "number_equal",
    explanation: E(
      DEF_P,
      "$P = 2 \\times (L + l)$, ou $L + l + L + l$.",
      `$2 \\times (${T(L)} + ${T(l)}) = 2 \\times ${T(L + l)} = ${T(P)}$.`,
      `le périmètre est ${q(P, u)}.`
    ),
  };
}

const OBJ_RECT: { gn: string; u: string; L: [number, number]; l: [number, number] }[] = [
  { gn: "une feuille de papier", u: "cm", L: [25, 30], l: [18, 22] },
  { gn: "une carte postale", u: "cm", L: [14, 16], l: [9, 11] },
  { gn: "un terrain de football", u: "m", L: [90, 110], l: [60, 70] },
  { gn: "un terrain de basket", u: "m", L: [26, 28], l: [14, 15] },
  { gn: "une porte", u: "cm", L: [200, 215], l: [70, 90] },
  { gn: "une table de cuisine", u: "cm", L: [120, 180], l: [70, 90] },
  { gn: "un écran de télévision", u: "cm", L: [90, 140], l: [50, 80] },
  { gn: "un livre", u: "cm", L: [20, 28], l: [13, 19] },
  { gn: "un tableau de classe", u: "cm", L: [200, 300], l: [100, 120] },
  { gn: "un bassin de natation", u: "m", L: [25, 50], l: [12, 21] },
  { gn: "un parking", u: "m", L: [40, 80], l: [20, 35] },
  { gn: "une tablette tactile", u: "mm", L: [230, 260], l: [160, 180] },
  { gn: "une affiche de cinéma", u: "cm", L: [100, 120], l: [60, 80] },
  { gn: "un timbre", u: "mm", L: [30, 40], l: [20, 26] },
  { gn: "une plaque de chocolat", u: "cm", L: [15, 20], l: [7, 9] },
  { gn: "une salle de classe", u: "m", L: [8, 10], l: [6, 7] },
  { gn: "un terrain de volley", u: "m", L: [18, 18], l: [9, 9] },
  { gn: "un court de tennis", u: "m", L: [23, 24], l: [10, 11] },
  { gn: "un tapis de souris", u: "mm", L: [220, 250], l: [180, 200] },
  { gn: "une boîte à chaussures (son couvercle)", u: "cm", L: [30, 35], l: [18, 22] },
];

function rectObjet(): Q {
  const o = randomChoice(OBJ_RECT);
  const L = randomInt(o.L[0], o.L[1]);
  const l = randomInt(o.l[0], o.l[1]);
  const P = 2 * (L + l);
  const gn = o.gn.replace(" (son couvercle)", "");
  const text =
    o.gn.includes("couvercle")
      ? randomChoice([
          `Le couvercle rectangulaire d’une boîte à chaussures mesure ${q(L, o.u)} sur ${q(l, o.u)}. Quel est son périmètre ?`,
          `Calcule le tour du couvercle d’une boîte à chaussures, un rectangle de ${q(L, o.u)} sur ${q(l, o.u)}.`,
        ])
      : randomChoice([
          `${cap(gn)} rectangulaire mesure ${q(L, o.u)} sur ${q(l, o.u)}. Quel est son périmètre ?`,
          `Quel est le périmètre ${de(gn)} de ${q(L, o.u)} de long et ${q(l, o.u)} de large ?`,
          `On mesure ${gn} : ${q(L, o.u)} de longueur, ${q(l, o.u)} de largeur. Calcule son périmètre.`,
          `Calcule la longueur du tour ${de(gn)} rectangulaire de dimensions ${q(L, o.u)} et ${q(l, o.u)}.`,
        ]);
  return {
    text,
    format: "short",
    expected: rep(P, o.u),
    comparator: "number_equal",
    explanation: E(
      DEF_P,
      "pour un rectangle, $P = 2 \\times (L + l)$.",
      `$2 \\times (${T(L)} + ${T(l)}) = 2 \\times ${T(L + l)} = ${T(P)}$.`,
      `le périmètre est ${q(P, o.u)}.`
    ),
  };
}

function rectMateriau(): Q {
  const c = randomChoice(CONTOURS);
  const { L, l } = dims(c);
  const P = 2 * (L + l);
  const u = c.u;
  const p = randomChoice(PRENOMS);
  const text = randomChoice([
    `${cap(c.un)} rectangulaire mesure ${q(L, u)} sur ${q(l, u)}. Quelle longueur ${deNu(c.mat)} faut-il pour ${pour(c.but, c.le)} ?`,
    `Pour ${pour(c.but, c.le)}, un rectangle de ${q(L, u)} de long et ${q(l, u)} de large, combien de ${UMOT[u]} ${deNu(c.mat)} faut-il ?`,
    `${p.p} veut ${pour(c.but, c.le)}, un rectangle de ${q(L, u)} par ${q(l, u)}. Quelle longueur ${deNu(c.mat)} doit-${il(p)} prévoir ?`,
    `${cap(c.le)} est rectangulaire : longueur ${q(L, u)}, largeur ${q(l, u)}. Calcule la longueur ${deNu(c.mat)} nécessaire pour en faire le tour.`,
    `Combien de ${UMOT[u]} ${deNu(c.mat)} faut-il acheter pour ${pour(c.but, c.un)} rectangulaire de ${q(l, u)} sur ${q(L, u)} ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(P, u),
    comparator: "number_equal",
    explanation: E(
      `la longueur ${deNu(c.mat)} suit tout le contour : on cherche le périmètre.`,
      "$P = 2 \\times (L + l)$.",
      `$2 \\times (${T(L)} + ${T(l)}) = 2 \\times ${T(L + l)} = ${T(P)}$.`,
      `il faut ${q(P, u)} ${deNu(c.mat)}.`
    ),
  };
}

function rectConversion(): Q {
  const c = randomChoice(CONTOURS_CM);
  const { L, l } = dims(c);
  const P = 2 * (L + l);
  const enM = randomChoice(["L", "l"]);
  const A = enM === "L" ? q(L / 100, "m") : q(L, "cm");
  const B = enM === "l" ? q(l / 100, "m") : q(l, "cm");
  const ua = randomChoice(["cm", "m"]);
  const res = ua === "cm" ? P : P / 100;
  const p = randomChoice(PRENOMS);
  const text = randomChoice([
    `${cap(c.un)} rectangulaire mesure ${A} sur ${B}. Quelle longueur ${deNu(c.mat)} faut-il pour ${pour(c.but, c.le)} ? Donne la réponse en ${ua}.`,
    `Pour ${pour(c.but, c.le)}, il faut faire le tour d’un rectangle de ${A} de long et ${B} de large. Combien de ${UMOT[ua]} ${deNu(c.mat)} faut-il ?`,
    `${p.p} mesure ${c.le} : longueur ${A}, largeur ${B}. Quelle longueur ${deNu(c.mat)}, en ${ua}, doit-${il(p)} acheter pour en faire le tour ?`,
    `Attention aux unités : ${c.le} est un rectangle de ${A} sur ${B}. Calcule, en ${ua}, la longueur ${deNu(c.mat)} nécessaire pour en faire le tour.`,
  ]);
  const conv = enM === "L" ? `${q(L / 100, "m")} $=$ ${q(L, "cm")}` : `${q(l / 100, "m")} $=$ ${q(l, "cm")}`;
  return {
    text,
    format: "short",
    expected: rep(res, ua),
    comparator: "number_equal",
    explanation: E(
      `${DEF_P} On n’additionne que des longueurs exprimées dans la même unité.`,
      `on convertit d’abord : ${conv}, puis $P = 2 \\times (L + l)$.`,
      `$2 \\times (${T(L)} + ${T(l)}) = ${T(P)}$ cm${ua === "m" ? `, soit ${q(res, "m")}` : ""}.`,
      `il faut ${q(res, ua)} ${deNu(c.mat)}.`
    ),
  };
}

function rectInverse(): Q {
  const c = randomChoice(CONTOURS);
  const { L, l } = dims(c);
  const P = 2 * (L + l);
  const u = c.u;
  const p = randomChoice(PRENOMS);
  const chercheLarg = Math.random() < 0.5;
  const connu = chercheLarg ? L : l;
  const res = chercheLarg ? l : L;
  const motConnu = chercheLarg ? "longueur" : "largeur";
  const motCherche = chercheLarg ? "largeur" : "longueur";
  const deConnu = chercheLarg ? "de long" : "de large";
  const forms = [
    () => `On a utilisé ${q(P, u)} ${deNu(c.mat)} pour ${pour(c.but, c.le)}, un rectangle de ${q(connu, u)} ${deConnu}. Quelle est sa ${motCherche} ?`,
    () => `${cap(c.le)} est rectangulaire et sa ${motConnu} mesure ${q(connu, u)}. Il a fallu ${q(P, u)} ${deNu(c.mat)} pour en faire le tour. Quelle est sa ${motCherche} ?`,
    () => `Un rectangle a un périmètre de ${q(P, u)} et une ${motConnu} de ${q(connu, u)}. Quelle est sa ${motCherche} ?`,
    () => `${p.p} dispose de ${q(P, u)} ${deNu(c.mat)}, juste assez pour ${pour(c.but, c.un)} rectangulaire de ${q(connu, u)} ${deConnu}. Quelle est la ${motCherche} ?`,
  ];
  let text = randomChoice(forms)();
  let ua = u;
  if (u === "cm" && P % 10 === 0 && Math.random() < 0.35) {
    text = `Avec ${q(P / 100, "m")} ${deNu(c.mat)}, on peut tout juste ${pour(c.but, c.un)} rectangulaire de ${q(connu, "cm")} ${deConnu}. Quelle est sa ${motCherche}, en cm ?`;
    ua = "cm";
  }
  return {
    text,
    format: "short",
    expected: rep(res, ua),
    comparator: "number_equal",
    explanation: E(
      "$P = 2 \\times (L + l)$, donc la moitié du périmètre vaut $L + l$.",
      `on prend la moitié du périmètre, puis on retire la ${motConnu} connue.`,
      `${text.startsWith("Avec") ? `${q(P / 100, "m")} $=$ ${q(P, "cm")} ; ` : ""}$${T(P)} \\div 2 = ${T(P / 2)}$ ; $${T(P / 2)} - ${T(connu)} = ${T(res)}$.`,
      `la ${motCherche} mesure ${q(res, ua)}.`
    ),
  };
}

/* ===========================================================================
   CARRÉ
=========================================================================== */
function carreFigure(): Q {
  const nom = randomChoice(RECT_NOMS);
  const u = randomChoice(["mm", "cm", "m", "dm"]);
  const c = randomInt(2, 15);
  const P = 4 * c;
  const s = nom[0] + nom[1];
  const text = randomChoice([
    `Calcule le périmètre du carré ${nom} représenté (en ${u}).`,
    `${nom} est un carré de côté ${q(c, u)}. Quel est son périmètre ?`,
    `Le carré ${nom} a un côté ${s} $=$ ${q(c, u)}. Calcule son périmètre.`,
    `Sur la figure, ${nom} est un carré. Quelle est la longueur de son contour, en ${u} ?`,
    `Quel est le périmètre du carré ${nom}, sachant que ${s} $=$ ${q(c, u)} ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(P, u),
    comparator: "number_equal",
    explanation: E(
      DEF_P,
      "un carré a 4 côtés égaux : $P = 4 \\times c$.",
      `$4 \\times ${T(c)} = ${T(P)}$.`,
      `le périmètre du carré ${nom} est ${q(P, u)}.`
    ),
    canvas: carreCanvas(nom, `${fr(c)} ${u}`),
  };
}

const OBJ_CARRE: { gn: string; u: string; r: [number, number] }[] = [
  { gn: "un carreau de faïence", u: "cm", r: [10, 20] },
  { gn: "une case d’échiquier", u: "cm", r: [3, 6] },
  { gn: "un timbre", u: "mm", r: [20, 30] },
  { gn: "une dalle de jardin", u: "cm", r: [30, 60] },
  { gn: "un napperon", u: "cm", r: [20, 40] },
  { gn: "un tableau", u: "cm", r: [30, 80] },
  { gn: "un bac à sable", u: "m", r: [2, 4] },
  { gn: "un ring de boxe", u: "m", r: [5, 7] },
  { gn: "une serviette de table", u: "cm", r: [30, 45] },
  { gn: "un coussin", u: "cm", r: [35, 60] },
  { gn: "une table", u: "cm", r: [70, 100] },
  { gn: "une fenêtre", u: "cm", r: [40, 80] },
  { gn: "un plateau de jeu", u: "cm", r: [30, 50] },
  { gn: "une parcelle de jardin", u: "m", r: [5, 15] },
  { gn: "une place de village", u: "m", r: [20, 50] },
  { gn: "un post-it", u: "mm", r: [50, 76] },
];

function carreObjet(): Q {
  const o = randomChoice(OBJ_CARRE);
  const c = randomInt(o.r[0], o.r[1]);
  const P = 4 * c;
  const adj = adjCarre(o.gn);
  const text = randomChoice([
    `Quel est le périmètre ${de(o.gn)} ${adj} de ${q(c, o.u)} de côté ?`,
    `${cap(o.gn)} ${adj} a un côté de ${q(c, o.u)}. Calcule son périmètre.`,
    `Le côté ${de(o.gn)} ${adj} mesure ${q(c, o.u)}. Quelle est la longueur de son contour ?`,
    `Combien mesure le tour ${de(o.gn)} ${adj} de côté ${q(c, o.u)} ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(P, o.u),
    comparator: "number_equal",
    explanation: E(DEF_P, "un carré a 4 côtés égaux : $P = 4 \\times c$.", `$4 \\times ${T(c)} = ${T(P)}$.`, `le périmètre est ${q(P, o.u)}.`),
  };
}

function carreMateriau(): Q {
  const ctx = randomChoice(CONTOURS_CARRES);
  let c = randomInt(ctx.l[0], ctx.l[1]);
  if (ctx.u === "cm" && c >= 100) c = Math.round(c / 5) * 5;
  if (ctx.u === "m" && c <= 20 && Math.random() < 0.4) c += 0.5;
  const P = 4 * c;
  const u = ctx.u;
  const adj = adjCarre(ctx.un);
  const p = randomChoice(PRENOMS);
  const text = randomChoice([
    `${cap(ctx.un)} ${adj} a ${q(c, u)} de côté. Quelle longueur ${deNu(ctx.mat)} faut-il pour ${pour(ctx.but, ctx.le)} ?`,
    `Pour ${pour(ctx.but, ctx.le)}, un carré de ${q(c, u)} de côté, combien de ${UMOT[u]} ${deNu(ctx.mat)} faut-il ?`,
    `${p.p} veut ${pour(ctx.but, ctx.un)} ${adj} de côté ${q(c, u)}. Quelle longueur ${deNu(ctx.mat)} doit-${il(p)} acheter ?`,
    `${cap(ctx.le)} est un carré de ${q(c, u)} de côté. Calcule la longueur ${deNu(ctx.mat)} nécessaire pour en faire le tour.`,
    `Combien de ${UMOT[u]} ${deNu(ctx.mat)} faut-il pour ${pour(ctx.but, ctx.un)} ${adj} dont le côté mesure ${q(c, u)} ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(P, u),
    comparator: "number_equal",
    explanation: E(DEF_P, "on fait le tour d’un carré : $P = 4 \\times c$.", `$4 \\times ${T(c)} = ${T(P)}$.`, `il faut ${q(P, u)} ${deNu(ctx.mat)}.`),
  };
}

function carreInverse(): Q {
  const ctx = randomChoice(CONTOURS_CARRES);
  let c = randomInt(ctx.l[0], ctx.l[1]);
  if (ctx.u === "cm" && c >= 100) c = Math.round(c / 5) * 5;
  const P = 4 * c;
  const u = ctx.u;
  const adj = adjCarre(ctx.un);
  const p = randomChoice(PRENOMS);
  const text = randomChoice([
    `On a utilisé ${q(P, u)} ${deNu(ctx.mat)} pour ${pour(ctx.but, ctx.le)}, qui est ${adj}. Combien mesure un côté ?`,
    `Un carré a un périmètre de ${q(P, u)}. Quelle est la longueur de son côté ?`,
    `${p.p} a exactement ${q(P, u)} ${deNu(ctx.mat)}, juste assez pour ${pour(ctx.but, ctx.un)} ${adj}. Quelle est la longueur du côté ?`,
    `Le tour ${de(ctx.un)} ${adj} mesure ${q(P, u)}. Quelle est la longueur de chacun de ses côtés ?`,
    `Quel est le côté d’un carré dont le contour mesure ${q(P, u)} ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(c, u),
    comparator: "number_equal",
    explanation: E("pour un carré, $P = 4 \\times c$.", "on divise le périmètre par 4.", `$${T(P)} \\div 4 = ${T(c)}$.`, `le côté mesure ${q(c, u)}.`),
  };
}

const LIEUX_TOUR = [
  { un: "une place", u: "m", r: [20, 60] },
  { un: "un pâté de maisons", u: "m", r: [60, 150] },
  { un: "un parc", u: "m", r: [100, 300] },
  { un: "une cour", u: "m", r: [20, 50] },
  { un: "un jardin", u: "m", r: [10, 40] },
  { un: "un champ", u: "m", r: [50, 200] },
  { un: "un bassin", u: "m", r: [5, 20] },
  { un: "un gymnase", u: "m", r: [25, 45] },
];
const PLURIELS_CARRES = [
  { pl: "massifs de fleurs", mat: "bordure", u: "m", r: [1, 3] },
  { pl: "cadres photo", mat: "baguette", u: "cm", r: [10, 30] },
  { pl: "napperons", mat: "dentelle", u: "cm", r: [20, 40] },
  { pl: "coussins", mat: "passepoil", u: "cm", r: [35, 50] },
  { pl: "bacs à fleurs", mat: "planche", u: "m", r: [1, 2] },
  { pl: "serviettes de table", mat: "ourlet", u: "cm", r: [30, 45] },
  { pl: "tableaux", mat: "baguette dorée", u: "cm", r: [20, 60] },
];

function carreProbleme(): Q {
  const t = randomInt(0, 2);
  const p = randomChoice(PRENOMS);
  if (t === 0) {
    const o = randomChoice(PLURIELS_CARRES);
    const n = randomInt(2, 6);
    const c = randomInt(o.r[0], o.r[1]);
    const res = n * 4 * c;
    const text = randomChoice([
      `On veut border ${n} ${o.pl} carrés identiques de ${q(c, o.u)} de côté. Quelle longueur ${deNu(o.mat)} faut-il en tout ?`,
      `${p.p} a ${n} ${o.pl} carrés de côté ${q(c, o.u)}. Combien de ${UMOT[o.u]} ${deNu(o.mat)} lui faut-il pour en faire le tour, tous ensemble ?`,
    ]);
    return {
      text,
      format: "short",
      expected: rep(res, o.u),
      comparator: "number_equal",
      explanation: E(DEF_P, "on calcule le tour d’un carré, puis on multiplie par le nombre de carrés.", `$4 \\times ${T(c)} = ${T(4 * c)}$ ; $${T(4 * c)} \\times ${n} = ${T(res)}$.`, `il faut ${q(res, o.u)} ${deNu(o.mat)}.`),
    };
  }
  if (t === 1) {
    const ctx = randomChoice(CONTOURS_CARRES.filter((x) => x.porte));
    const c = randomInt(ctx.l[0], ctx.l[1]);
    // ⛔ 08/10/2026 : l'ouverture est plus étroite que le côté.
    const g = randomChoice([1, 1.5, 2, 2.5, 3, 4].filter((x) => x < c));
    const res = 4 * c - g;
    const ouv = randomChoice(["un portail", "un passage", "une entrée", "un portillon"]);
    const text = randomChoice([
      `On veut ${pour(ctx.but, ctx.un)} ${adjCarre(ctx.un)} de ${q(c, "m")} de côté, en laissant ${ouv} de ${q(g, "m")}. Quelle longueur ${deNu(ctx.mat)} faut-il ?`,
      `${cap(ctx.le)} est un carré de côté ${q(c, "m")}. On laisse ${ouv} de ${q(g, "m")} sans ${ctx.mat}. Combien de mètres ${deNu(ctx.mat)} faut-il poser ?`,
    ]);
    return {
      text,
      format: "short",
      expected: rep(res, "m"),
      comparator: "number_equal",
      explanation: E(DEF_P, "on calcule le tour complet, puis on retire la largeur de l’ouverture.", `$4 \\times ${T(c)} = ${T(4 * c)}$ ; $${T(4 * c)} - ${T(g)} = ${T(res)}$.`, `il faut ${q(res, "m")} ${deNu(ctx.mat)}.`),
    };
  }
  const lieu = randomChoice(LIEUX_TOUR);
  const c = randomInt(lieu.r[0], lieu.r[1]);
  const k = randomInt(2, 6);
  const res = k * 4 * c;
  const text = randomChoice([
    `${p.p} fait ${k} fois le tour ${de(lieu.un)} ${adjCarre(lieu.un)} de ${q(c, lieu.u)} de côté. Quelle distance parcourt-${il(p)} ?`,
    `${cap(lieu.un)} ${adjCarre(lieu.un)} a ${q(c, lieu.u)} de côté. ${p.p} en fait ${k} fois le tour en courant. Combien de mètres a-t-${il(p)} parcourus ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(res, lieu.u),
    comparator: "number_equal",
    explanation: E("un tour correspond au périmètre.", "on calcule un tour, puis on multiplie par le nombre de tours.", `$4 \\times ${T(c)} = ${T(4 * c)}$ ; $${T(4 * c)} \\times ${k} = ${T(res)}$.`, `${p.p} parcourt ${q(res, lieu.u)}.`),
  };
}

function carreDefi(): Q {
  const t = randomInt(0, 2);
  if (t === 0) {
    const ctx = randomChoice(CONTOURS_CARRES.filter((x) => x.u === "cm"));
    const c = randomInt(Math.ceil(ctx.l[0] / 5), Math.floor(ctx.l[1] / 5)) * 5;
    const P = 4 * c;
    const text = randomChoice([
      `Il faut ${q(P / 100, "m")} ${deNu(ctx.mat)} pour ${pour(ctx.but, ctx.un)} ${adjCarre(ctx.un)}. Quelle est la longueur d’un côté, en cm ?`,
      `Le contour ${de(ctx.un)} ${adjCarre(ctx.un)} mesure ${q(P / 100, "m")}. Combien mesure son côté, en centimètres ?`,
    ]);
    return {
      text,
      format: "short",
      expected: rep(c, "cm"),
      comparator: "number_equal",
      explanation: E("pour un carré, $P = 4 \\times c$.", `on convertit : ${q(P / 100, "m")} $=$ ${q(P, "cm")}, puis on divise par 4.`, `$${T(P)} \\div 4 = ${T(c)}$.`, `le côté mesure ${q(c, "cm")}.`),
    };
  }
  if (t === 1) {
    const ctx = randomChoice(CONTOURS);
    let { L, l } = dims(ctx);
    if ((L + l) % 2 !== 0) L += 1;
    const c = (L + l) / 2;
    const u = ctx.u;
    const text = randomChoice([
      `Un carré a le même périmètre qu’${ctx.un} rectangulaire de ${q(L, u)} sur ${q(l, u)}. Quelle est la longueur du côté du carré ?`,
      `Avec la longueur ${deNu(ctx.mat)} qui borde ${ctx.un} rectangulaire de ${q(L, u)} sur ${q(l, u)}, on veut border un carré. Quel sera son côté ?`,
    ]);
    return {
      text,
      format: "short",
      expected: rep(c, u),
      comparator: "number_equal",
      explanation: E("deux figures de même périmètre ont des contours de même longueur.", "on calcule le périmètre du rectangle, puis on le divise par 4.", `$2 \\times (${T(L)} + ${T(l)}) = ${T(2 * (L + l))}$ ; $${T(2 * (L + l))} \\div 4 = ${T(c)}$.`, `le côté du carré mesure ${q(c, u)}.`),
    };
  }
  const tc = randomInt(2, 12) * 4;
  const c = (3 * tc) / 4;
  const u = randomChoice(["cm", "m", "mm"]);
  const text = randomChoice([
    `Un carré a le même périmètre qu’un triangle équilatéral de côté ${q(tc, u)}. Quelle est la longueur du côté du carré ?`,
    `On redresse en carré un fil qui formait un triangle équilatéral de ${q(tc, u)} de côté. Combien mesure le côté du carré ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(c, u),
    comparator: "number_equal",
    explanation: E("la longueur du contour reste la même.", "périmètre du triangle $= 3 \\times$ côté, puis côté du carré $=$ périmètre $\\div 4$.", `$3 \\times ${T(tc)} = ${T(3 * tc)}$ ; $${T(3 * tc)} \\div 4 = ${T(c)}$.`, `le côté du carré mesure ${q(c, u)}.`),
  };
}

/* ===========================================================================
   TRIANGLE
=========================================================================== */
function triTexte(): Q {
  const nom = randomChoice(TRI_NOMS);
  const u = randomChoice(["mm", "cm", "m"]);
  const [a, b, c] = cotesTriangle(3, 12);
  const P = a + b + c;
  const s1 = nom[0] + nom[1];
  const s2 = nom[1] + nom[2];
  const s3 = nom[2] + nom[0];
  const egal = `${s1} $=$ ${q(a, u)}, ${s2} $=$ ${q(b, u)} et ${s3} $=$ ${q(c, u)}`;
  const t = randomInt(0, 4);
  const text = [
    `Le triangle ${nom} a pour côtés ${egal}. Calcule son périmètre.`,
    `Quel est le périmètre d’un triangle dont les côtés mesurent ${q(a, u)}, ${q(b, u)} et ${q(c, u)} ?`,
    `Dans le triangle ${nom}, ${egal}. Quelle est la longueur de son contour ?`,
    `Calcule le périmètre du triangle ${nom} représenté (en ${u}).`,
    `Les trois côtés du triangle ${nom} mesurent ${q(a, u)}, ${q(b, u)} et ${q(c, u)}. Que vaut son périmètre ?`,
  ][t];
  return {
    text,
    format: "short",
    expected: rep(P, u),
    comparator: "number_equal",
    explanation: E(DEF_P, "un triangle a trois côtés : on les additionne.", `$${T(a)} + ${T(b)} + ${T(c)} = ${T(P)}$.`, `le périmètre est ${q(P, u)}.`),
    ...(t === 3 || t === 0 ? { canvas: triCanvas(nom, a, b, c, { AB: `${a} ${u}`, BC: `${b} ${u}`, CA: `${c} ${u}` }) } : {}),
  };
}

const OBJ_TRI: { gn: string; u: string; r: [number, number] }[] = [
  { gn: "une voile de bateau", u: "m", r: [2, 8] },
  { gn: "un fanion", u: "cm", r: [15, 40] },
  { gn: "un champ", u: "m", r: [40, 120] },
  { gn: "une parcelle de jardin", u: "m", r: [6, 20] },
  { gn: "un panneau publicitaire", u: "m", r: [2, 6] },
  { gn: "un foulard plié en deux", u: "cm", r: [40, 90] },
  { gn: "une place de village", u: "m", r: [20, 60] },
  { gn: "un jardin", u: "m", r: [8, 30] },
  { gn: "un morceau de tissu", u: "cm", r: [20, 60] },
  { gn: "un îlot de verdure", u: "m", r: [6, 20] },
  { gn: "une étagère d’angle", u: "cm", r: [25, 50] },
  { gn: "une prairie", u: "m", r: [50, 150] },
];

function triFigure(): Q {
  const o = randomChoice(OBJ_TRI);
  const nom = randomChoice(TRI_NOMS);
  const [a, b, c] = cotesTriangle(o.r[0], o.r[1]);
  const P = a + b + c;
  const intro = randomChoice([
    `La figure représente ${o.gn} en forme de triangle, noté ${nom}.`,
    `Voici le plan ${de(o.gn)} triangulaire ${nom}.`,
    `On a dessiné ${o.gn} triangulaire ; ses sommets sont ${nom[0]}, ${nom[1]} et ${nom[2]}.`,
  ]);
  const question = randomChoice([
    `Quel est son périmètre, en ${o.u} ?`,
    `Quelle longueur faut-il pour en faire le tour ?`,
    `Calcule la longueur de son contour, en ${o.u}.`,
    `Combien de ${UMOT[o.u]} mesure son contour ?`,
  ]);
  return {
    text: `${intro} ${question}`,
    format: "short",
    expected: rep(P, o.u),
    comparator: "number_equal",
    explanation: E(DEF_P, "on additionne les trois longueurs lues sur la figure.", `$${T(a)} + ${T(b)} + ${T(c)} = ${T(P)}$.`, `le périmètre est ${q(P, o.u)}.`),
    canvas: triCanvas(nom, a, b, c, { AB: `${a} ${o.u}`, BC: `${b} ${o.u}`, CA: `${c} ${o.u}` }),
  };
}

const OBJ_EQUI: { gn: string; u: string; r: [number, number] }[] = [
  { gn: "un panneau « danger »", u: "cm", r: [70, 100] },
  { gn: "un triangle de billard", u: "cm", r: [28, 35] },
  { gn: "un fanion", u: "cm", r: [20, 40] },
  { gn: "une pièce de puzzle", u: "cm", r: [3, 8] },
  { gn: "une parcelle de jardin", u: "m", r: [5, 15] },
  { gn: "un triangle de musique", u: "cm", r: [15, 25] },
  { gn: "un bassin", u: "m", r: [3, 8] },
  { gn: "un pendentif", u: "mm", r: [15, 30] },
  { gn: "un panneau de signalisation", u: "cm", r: [70, 100] },
  { gn: "un pare-feu de cheminée (vu de face)", u: "cm", r: [50, 80] },
];

function triEquilateral(): Q {
  const o = randomChoice(OBJ_EQUI);
  let c = randomInt(o.r[0], o.r[1]);
  if (o.u === "m" && Math.random() < 0.4) c += 0.5;
  const P = 3 * c;
  const nom = randomChoice(TRI_NOMS);
  const text = randomChoice([
    `Calcule le périmètre d’un triangle équilatéral de côté ${q(c, o.u)}.`,
    `${cap(o.gn)} a la forme d’un triangle équilatéral de ${q(c, o.u)} de côté. Quelle est la longueur de son contour ?`,
    `Les trois côtés ${de(o.gn)} mesurent chacun ${q(c, o.u)}. Quel est son périmètre ?`,
    `Le triangle ${nom} est équilatéral et ${nom[0]}${nom[1]} $=$ ${q(c, o.u)}. Que vaut son périmètre ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(P, o.u),
    comparator: "number_equal",
    explanation: E("un triangle équilatéral a trois côtés égaux.", "$P = 3 \\times$ côté.", `$3 \\times ${T(c)} = ${T(P)}$.`, `le périmètre est ${q(P, o.u)}.`),
  };
}

function triIsoceleFigure(): Q {
  const nom = randomChoice(TRI_NOMS);
  const u = randomChoice(["cm", "m", "mm"]);
  const base = randomInt(3, 10);
  let s = randomInt(Math.ceil(base * 0.65) + 1, base + 5);
  if (s === base) s += 1; // isocèle, mais pas équilatéral
  const P = 2 * s + base;
  const apex = nom[2];
  const text = randomChoice([
    `Le triangle ${nom} est isocèle en ${apex}. Calcule son périmètre (en ${u}).`,
    `Sur la figure, ${nom} est isocèle en ${apex} : les codages indiquent deux côtés égaux. Quel est son périmètre, en ${u} ?`,
    `Quel est le périmètre du triangle isocèle ${nom} représenté, en ${u} ?`,
    `${nom} est un triangle isocèle en ${apex} avec ${nom[0]}${nom[1]} $=$ ${q(base, u)} et ${nom[2]}${nom[0]} $=$ ${q(s, u)}. Calcule son périmètre.`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(P, u),
    comparator: "number_equal",
    explanation: E(
      `un triangle isocèle en ${apex} a deux côtés égaux : ${nom[2]}${nom[0]} $=$ ${nom[1]}${nom[2]}.`,
      "on compte deux fois le côté égal, une fois la base.",
      `$2 \\times ${T(s)} + ${T(base)} = ${T(2 * s)} + ${T(base)} = ${T(P)}$.`,
      `le périmètre est ${q(P, u)}.`
    ),
    canvas: triCanvas(nom, base, s, s, { AB: `${base} ${u}`, CA: `${s} ${u}` }, [["BC", "CA"]]),
  };
}

const OBJ_ISO: { gn: string; u: string; r: [number, number]; mat: string }[] = [
  { gn: "le pignon d’une maison", u: "m", r: [4, 10], mat: "guirlande" },
  { gn: "une voile", u: "m", r: [2, 7], mat: "ruban de renfort" },
  { gn: "un fanion", u: "cm", r: [20, 45], mat: "galon" },
  { gn: "une tente vue de face", u: "m", r: [2, 4], mat: "bande réfléchissante" },
  { gn: "le toit d’une cabane", u: "m", r: [2, 5], mat: "baguette de bois" },
  { gn: "un sapin en carton", u: "cm", r: [30, 80], mat: "guirlande" },
  { gn: "une part de pizza", u: "cm", r: [10, 18], mat: "croûte" },
  { gn: "un panneau en bois", u: "cm", r: [40, 90], mat: "baguette" },
  { gn: "un cerf-volant triangulaire", u: "cm", r: [40, 90], mat: "ruban" },
];

function triIsoceleProbleme(): Q {
  const o = randomChoice(OBJ_ISO);
  const base = randomInt(o.r[0], o.r[1]);
  let s = randomInt(Math.ceil(base * 0.6) + 1, Math.max(Math.ceil(base * 0.6) + 2, Math.round(base * 1.3)));
  if (s === base) s += 1; // isocèle, mais pas équilatéral
  const P = 2 * s + base;
  const conv = o.u === "m" && Math.random() < 0.4;
  const baseTxt = conv ? q(base * 100, "cm") : q(base, o.u);
  const p = randomChoice(PRENOMS);
  const text = randomChoice([
    `${cap(o.gn)} a la forme d’un triangle isocèle : deux côtés de ${q(s, o.u)} et une base de ${baseTxt}. Quel est son périmètre, en ${o.u} ?`,
    `Quelle longueur ${deNu(o.mat)} faut-il pour faire le tour ${de(o.gn)}, un triangle isocèle de base ${baseTxt} et de côtés égaux ${q(s, o.u)} ? Réponds en ${o.u}.`,
    `${p.p} mesure ${o.gn} : c’est un triangle isocèle dont les côtés égaux font ${q(s, o.u)} et la base ${baseTxt}. Calcule le périmètre en ${o.u}.`,
    `Un triangle isocèle a une base de ${baseTxt} et deux côtés de ${q(s, o.u)}. Quelle est la longueur de son contour, en ${o.u} ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(P, o.u),
    comparator: "number_equal",
    explanation: E(
      "un triangle isocèle a deux côtés égaux.",
      conv ? `on convertit la base : ${q(base * 100, "cm")} $=$ ${q(base, "m")}, puis $P = 2 \\times$ côté $+$ base.` : "$P = 2 \\times$ côté égal $+$ base.",
      `$2 \\times ${T(s)} + ${T(base)} = ${T(P)}$.`,
      `le périmètre est ${q(P, o.u)}.`
    ),
  };
}

function triInverse(): Q {
  const t = randomInt(0, 3);
  const u = randomChoice(["cm", "m", "mm"]);
  const nom = randomChoice(TRI_NOMS);
  const p = randomChoice(PRENOMS);
  if (t === 0) {
    const [a, b, c] = cotesTriangle(4, 15);
    const P = a + b + c;
    const text = randomChoice([
      `Le triangle ${nom} a un périmètre de ${q(P, u)}. On sait que ${nom[0]}${nom[1]} $=$ ${q(a, u)} et ${nom[1]}${nom[2]} $=$ ${q(b, u)}. Calcule ${nom[2]}${nom[0]}.`,
      `Un triangle a un périmètre de ${q(P, u)}. Deux de ses côtés mesurent ${q(a, u)} et ${q(b, u)}. Combien mesure le troisième ?`,
      `${p.p} a ${q(P, u)} de fil, juste assez pour former un triangle dont deux côtés mesurent ${q(a, u)} et ${q(b, u)}. Quelle est la longueur du troisième côté ?`,
    ]);
    return {
      text,
      format: "short",
      expected: rep(c, u),
      comparator: "number_equal",
      explanation: E("le périmètre est la somme des trois côtés.", "on retire du périmètre les deux côtés connus.", `$${T(P)} - ${T(a)} - ${T(b)} = ${T(c)}$.`, `le troisième côté mesure ${q(c, u)}.`),
    };
  }
  if (t === 1) {
    const o = randomChoice(OBJ_EQUI);
    const c = randomInt(o.r[0], o.r[1]);
    const P = 3 * c;
    const text = randomChoice([
      `${cap(o.gn)} a la forme d’un triangle équilatéral de périmètre ${q(P, o.u)}. Quelle est la longueur d’un côté ?`,
      `Un triangle équilatéral a un périmètre de ${q(P, o.u)}. Combien mesure chacun de ses côtés ?`,
      `Le tour ${de(o.gn)}, un triangle équilatéral, mesure ${q(P, o.u)}. Quelle est la longueur de son côté ?`,
    ]);
    return {
      text,
      format: "short",
      expected: rep(c, o.u),
      comparator: "number_equal",
      explanation: E("un triangle équilatéral a trois côtés égaux.", "côté $=$ périmètre $\\div 3$.", `$${T(P)} \\div 3 = ${T(c)}$.`, `le côté mesure ${q(c, o.u)}.`),
    };
  }
  const base = randomInt(4, 14);
  const s = randomInt(Math.ceil(base * 0.6) + 1, base + 6);
  const P = 2 * s + base;
  if (t === 2) {
    const text = randomChoice([
      `Le triangle ${nom} est isocèle en ${nom[2]}, de périmètre ${q(P, u)}, avec ${nom[2]}${nom[0]} $=$ ${q(s, u)}. Calcule la base ${nom[0]}${nom[1]}.`,
      `Un triangle isocèle a un périmètre de ${q(P, u)} et ses deux côtés égaux mesurent ${q(s, u)}. Quelle est la longueur de sa base ?`,
    ]);
    return {
      text,
      format: "short",
      expected: rep(base, u),
      comparator: "number_equal",
      explanation: E("un triangle isocèle a deux côtés égaux.", "base $=$ périmètre $- 2 \\times$ côté égal.", `$${T(P)} - 2 \\times ${T(s)} = ${T(P)} - ${T(2 * s)} = ${T(base)}$.`, `la base mesure ${q(base, u)}.`),
    };
  }
  const text = randomChoice([
    `Le triangle ${nom} est isocèle en ${nom[2]}, de périmètre ${q(P, u)}, avec ${nom[0]}${nom[1]} $=$ ${q(base, u)}. Calcule ${nom[2]}${nom[0]}.`,
    `Un triangle isocèle a un périmètre de ${q(P, u)} et une base de ${q(base, u)}. Combien mesure chacun des deux côtés égaux ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(s, u),
    comparator: "number_equal",
    explanation: E("un triangle isocèle a deux côtés égaux.", "on retire la base, puis on partage en deux.", `$${T(P)} - ${T(base)} = ${T(2 * s)}$ ; $${T(2 * s)} \\div 2 = ${T(s)}$.`, `chaque côté égal mesure ${q(s, u)}.`),
  };
}

/* ===========================================================================
   FIGURES COMPOSÉES
=========================================================================== */
const MAISONS = [
  { gn: "la façade d’une maison", u: "m", L: [6, 12] },
  { gn: "le pignon d’une grange", u: "m", L: [8, 14] },
  { gn: "un nichoir vu de face", u: "cm", L: [12, 20] },
  { gn: "une cabane de jardin vue de face", u: "m", L: [2, 4] },
  { gn: "le dessin d’une maison", u: "cm", L: [4, 10] },
  { gn: "une étiquette en forme de maison", u: "cm", L: [4, 8] },
];
const FLECHES = [
  { gn: "un panneau indicateur en forme de flèche", u: "cm", L: [60, 100], l: [15, 25] },
  { gn: "un crayon vu de côté", u: "mm", L: [120, 170], l: [7, 9] },
  { gn: "une étiquette de cadeau", u: "cm", L: [6, 10], l: [3, 5] },
  { gn: "un fanion de chantier", u: "cm", L: [30, 50], l: [15, 25] },
  { gn: "une balise de randonnée", u: "cm", L: [15, 25], l: [6, 10] },
];

function composeToit(): Q {
  if (Math.random() < 0.55) {
    const o = randomChoice(MAISONS);
    const L = randomInt(o.L[0], o.L[1]);
    const h = randomInt(Math.max(2, Math.round(L * 0.5)), L + 2);
    const s = randomInt(Math.ceil(L * 0.6) + 1, L);
    const P = L + 2 * h + 2 * s;
    const u = o.u;
    const text = randomChoice([
      `On modélise ${o.gn} par un rectangle de ${q(L, u)} de large et ${q(h, u)} de haut, surmonté d’un triangle isocèle dont les côtés égaux mesurent ${q(s, u)}. Quel est le périmètre de la figure obtenue ?`,
      `${cap(o.gn)} : un rectangle (largeur ${q(L, u)}, hauteur ${q(h, u)}) et, posé dessus, un toit en triangle isocèle de côtés ${q(s, u)}. Calcule la longueur du contour.`,
      `Pour dessiner ${o.gn}, on assemble un rectangle de ${q(h, u)} sur ${q(L, u)} et un triangle isocèle de côtés égaux ${q(s, u)}, posé sur le côté de ${q(L, u)}. Quel est le périmètre de l’ensemble ?`,
    ]);
    return {
      text,
      format: "short",
      expected: rep(P, u),
      comparator: "number_equal",
      explanation: E(
        `${DEF_P} Le côté commun au rectangle et au triangle est À L’INTÉRIEUR : il ne compte pas.`,
        "on fait le tour : le bas du rectangle, ses deux côtés verticaux, puis les deux côtés du toit.",
        `$${T(L)} + 2 \\times ${T(h)} + 2 \\times ${T(s)} = ${T(L)} + ${T(2 * h)} + ${T(2 * s)} = ${T(P)}$.`,
        `le périmètre est ${q(P, u)}.`
      ),
    };
  }
  const o = randomChoice(FLECHES);
  const L = randomInt(o.L[0], o.L[1]);
  const l = randomInt(o.l[0], o.l[1]);
  const P = 2 * L + 3 * l;
  const u = o.u;
  const text = randomChoice([
    `On modélise ${o.gn} par un rectangle de ${q(L, u)} sur ${q(l, u)}, prolongé, sur un côté de ${q(l, u)}, par un triangle équilatéral. Quel est le périmètre de la figure ?`,
    `Dessin ${de(o.gn)} : un rectangle de ${q(L, u)} de long et ${q(l, u)} de large, et un triangle équilatéral collé contre sa largeur. Calcule le périmètre de la figure.`,
    `${cap(o.gn)} est formé d’un rectangle (${q(L, u)} sur ${q(l, u)}) et d’un triangle équilatéral de côté ${q(l, u)} accolé à une largeur. Quelle est la longueur du contour ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(P, u),
    comparator: "number_equal",
    explanation: E(
      `${DEF_P} La largeur collée contre le triangle est intérieure : elle ne compte pas.`,
      "on compte les deux longueurs, une largeur, puis les deux côtés libres du triangle (égaux à la largeur).",
      `$2 \\times ${T(L)} + ${T(l)} + 2 \\times ${T(l)} = ${T(2 * L)} + ${T(3 * l)} = ${T(P)}$.`,
      `le périmètre est ${q(P, u)}.`
    ),
  };
}

const ACCOLES = [
  { gn: "un salon prolongé par une alcôve carrée", u: "m", L: [5, 9], l: [3, 5] },
  { gn: "une piscine avec un petit bassin carré pour les enfants", u: "m", L: [8, 14], l: [4, 6] },
  { gn: "un jardin avec un potager carré accolé", u: "m", L: [10, 25], l: [6, 12] },
  { gn: "un bureau prolongé par un coin carré", u: "cm", L: [120, 180], l: [60, 80] },
  { gn: "une terrasse avec un carré de pelouse accolé", u: "m", L: [6, 12], l: [3, 6] },
];
const PIECES_L = [
  { gn: "une cuisine en L", u: "m", W: [4, 7], H: [3, 6], mat: "plinthe" },
  { gn: "un salon en L", u: "m", W: [6, 10], H: [5, 8], mat: "plinthe" },
  { gn: "une terrasse en L", u: "m", W: [5, 10], H: [4, 8], mat: "bordure" },
  { gn: "un champ en L", u: "m", W: [60, 120], H: [40, 90], mat: "clôture" },
  { gn: "un bassin en L", u: "m", W: [6, 12], H: [5, 9], mat: "margelle" },
  { gn: "une étagère en L", u: "cm", W: [80, 140], H: [60, 120], mat: "baguette" },
];

function composeAccole(): Q {
  if (Math.random() < 0.5) {
    const o = randomChoice(ACCOLES);
    const L = randomInt(o.L[0], o.L[1]);
    const l = randomInt(o.l[0], o.l[1]);
    const c = randomInt(Math.max(1, Math.round(l * 0.4)), l);
    const P = 2 * (L + l) + 2 * c;
    const u = o.u;
    const text = randomChoice([
      `Le plan représente ${o.gn} : un rectangle de ${q(L, u)} sur ${q(l, u)} et un carré de ${q(c, u)} de côté, collé contre un côté de ${q(l, u)}. Quel est le périmètre de l’ensemble ?`,
      `On fait le tour ${de(o.gn)}. Le rectangle mesure ${q(L, u)} sur ${q(l, u)} ; le carré accolé a ${q(c, u)} de côté. Quelle distance parcourt-on ?`,
      `${cap(o.gn)} : rectangle de ${q(L, u)} par ${q(l, u)}, carré de côté ${q(c, u)} accolé sur la largeur. Calcule la longueur du contour extérieur.`,
    ]);
    return {
      text,
      format: "short",
      expected: rep(P, u),
      comparator: "number_equal",
      explanation: E(
        `${DEF_P} La partie du côté où le carré est collé est intérieure.`,
        "contour du rectangle, moins le segment caché par le carré, plus les trois côtés libres du carré : au total on ajoute deux côtés de carré.",
        `$2 \\times (${T(L)} + ${T(l)}) - ${T(c)} + 3 \\times ${T(c)} = ${T(2 * (L + l))} + 2 \\times ${T(c)} = ${T(P)}$.`,
        `le périmètre est ${q(P, u)}.`
      ),
    };
  }
  const o = randomChoice(PIECES_L);
  const W = randomInt(o.W[0], o.W[1]);
  const H = randomInt(o.H[0], o.H[1]);
  const w = randomInt(1, Math.max(1, Math.floor(W / 2)));
  const h = randomInt(1, Math.max(1, Math.floor(H / 2)));
  const cotes = [W, H - h, w, h, W - w, H];
  const P = 2 * (W + H);
  const u = o.u;
  const text = randomChoice([
    `${cap(o.gn)} a des côtés qui mesurent, en faisant le tour : ${liste(cotes.map((x) => q(x, u)))}. Quel est son périmètre ?`,
    `Quelle longueur ${deNu(o.mat)} faut-il pour faire le tour ${de(o.gn)} dont les côtés mesurent successivement ${liste(cotes.map((x) => q(x, u)))} ?`,
    `On longe les six côtés ${de(o.gn)} : ${liste(cotes.map((x) => q(x, u)))}. Quelle distance parcourt-on en un tour ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(P, u),
    comparator: "number_equal",
    explanation: E(DEF_P, "on additionne les six côtés du contour.", `$${cotes.map(T).join(" + ")} = ${T(P)}$.`, `le périmètre est ${q(P, u)}.`),
  };
}

const ARRONDIS = [
  { gn: "une piste d’athlétisme simplifiée", n: 2, u: "m", L: [80, 100], l: [60, 70] },
  { gn: "une table de réunion aux deux bouts arrondis", n: 2, u: "cm", L: [150, 250], l: [80, 120] },
  { gn: "une fenêtre cintrée", n: 1, u: "cm", L: [100, 150], l: [60, 90] },
  { gn: "un tapis aux extrémités arrondies", n: 2, u: "cm", L: [120, 200], l: [60, 80] },
  { gn: "un bassin de jardin", n: 2, u: "m", L: [4, 8], l: [2, 3] },
  { gn: "une porte de grange arrondie en haut", n: 1, u: "cm", L: [220, 300], l: [150, 200] },
  { gn: "un massif de fleurs", n: 1, u: "m", L: [4, 8], l: [2, 4] },
  { gn: "une terrasse arrondie au bout", n: 1, u: "m", L: [5, 9], l: [3, 5] },
  { gn: "un terrain de jeu", n: 2, u: "m", L: [30, 50], l: [16, 24] },
];

function composeDemiDisque(): Q {
  const o = randomChoice(ARRONDIS);
  const L = randomInt(o.L[0], o.L[1]);
  const l = randomInt(o.l[0], o.l[1]);
  const u = o.u;
  const d = randomChoice([0, 1]);
  const r = o.n === 2 ? avecPi((pi) => 2 * L + pi * l, d, u) : avecPi((pi) => 2 * L + l + (pi * l) / 2, d, u);
  const forme =
    o.n === 2
      ? `un rectangle de ${q(L, u)} sur ${q(l, u)} et deux demi-cercles de diamètre ${q(l, u)}, un à chaque bout`
      : `un rectangle de ${q(L, u)} sur ${q(l, u)} et un demi-cercle de diamètre ${q(l, u)} posé sur un côté de ${q(l, u)}`;
  const text = randomChoice([
    `On modélise ${o.gn} par ${forme}. Calcule son périmètre, arrondi ${MOT_ARRONDI[d]}.`,
    `${cap(o.gn)} est formé${estFem(o.gn) ? "e" : ""} ${de(forme)}. Quelle est la longueur de son contour ? Arrondis ${MOT_ARRONDI[d]}.`,
    `Quelle longueur faut-il pour faire le tour ${de(o.gn)}, composé${estFem(o.gn) ? "e" : ""} ${de(forme)} ? Donne un arrondi ${MOT_ARRONDI[d]}.`,
  ]);
  const calc =
    o.n === 2
      ? `deux longueurs : $2 \\times ${T(L)} = ${T(2 * L)}$ ; deux demi-cercles font un cercle entier : $\\pi \\times ${T(l)}$. Total : $${T(2 * L)} + \\pi \\times ${T(l)} \\approx ${T(r.val)}$${r.note}.`
      : `deux longueurs et une largeur : $2 \\times ${T(L)} + ${T(l)} = ${T(2 * L + l)}$ ; un demi-cercle : $\\pi \\times ${T(l)} \\div 2$. Total : $${T(2 * L + l)} + \\pi \\times ${T(l)} \\div 2 \\approx ${T(r.val)}$${r.note}.`;
  return {
    text,
    format: "short",
    expected: r.exp,
    comparator: "number_equal",
    explanation: E(
      `${DEF_P} La longueur d’un cercle de diamètre $d$ est $\\pi \\times d$ ; un demi-cercle en fait la moitié.`,
      "on additionne les segments du bord et les arcs ; le côté du rectangle recouvert par l’arc n’est pas sur le contour.",
      calc,
      `le périmètre vaut environ ${q(r.val, u)}.`
    ),
  };
}

/* ===========================================================================
   PROBLÈMES
=========================================================================== */
const LIEUX_RECT = [
  { un: "un pâté de maisons", L: [80, 150], l: [40, 70] },
  { un: "un parc", L: [150, 300], l: [80, 140] },
  { un: "un stade", L: [100, 120], l: [60, 75] },
  { un: "une cour de récréation", L: [30, 60], l: [20, 28] },
  { un: "un terrain de rugby", L: [100, 120], l: [68, 70] },
  { un: "un gymnase", L: [40, 50], l: [20, 30] },
  { un: "un champ", L: [100, 250], l: [50, 90] },
  { un: "un camping", L: [120, 200], l: [60, 100] },
  { un: "un lotissement", L: [150, 250], l: [80, 120] },
];

function probTours(): Q {
  const lieu = randomChoice(LIEUX_RECT);
  const t = randomInt(0, 3);
  // ⛔ 08/10/2026 : en km, deux décimales au plus (« 1,794 km » sortait) : dimensions multiples de 5 m.
  const pas = t === 1 ? 5 : 1;
  const L = Math.round(randomInt(lieu.L[0], lieu.L[1]) / pas) * pas;
  const l = Math.round(randomInt(lieu.l[0], lieu.l[1]) / pas) * pas;
  const P = 2 * (L + l);
  const k = randomInt(2, 8);
  const D = k * P;
  const p = randomChoice(PRENOMS);
  const expl = (res: string) =>
    E("un tour correspond au périmètre.", "on calcule un tour, puis on multiplie par le nombre de tours.", `$2 \\times (${T(L)} + ${T(l)}) = ${T(P)}$ m ; $${T(P)} \\times ${k} = ${T(D)}$ m.`, res);
  if (t === 0)
    return {
      text: `${p.p} fait ${k} fois le tour ${de(lieu.un)} rectangulaire de ${q(L, "m")} sur ${q(l, "m")}. Quelle distance parcourt-${il(p)}, en m ?`,
      format: "short",
      expected: rep(D, "m"),
      comparator: "number_equal",
      explanation: expl(`${p.p} parcourt ${q(D, "m")}.`),
    };
  if (t === 1)
    return {
      text: `En s’entraînant, ${p.p} court ${k} tours autour ${de(lieu.un)} rectangulaire de ${q(L, "m")} de long et ${q(l, "m")} de large. Quelle distance a-t-${il(p)} parcourue, en km ?`,
      format: "short",
      expected: rep(D / 1000, "km"),
      comparator: "number_equal",
      explanation: expl(`${q(D, "m")} $=$ ${q(D / 1000, "km")} : ${p.p} a parcouru ${q(D / 1000, "km")}.`),
    };
  if (t === 2)
    return {
      text: `Pour s’entraîner, ${p.p} doit courir ${q(D, "m")} autour ${de(lieu.un)} rectangulaire de ${q(L, "m")} sur ${q(l, "m")}. Combien de tours doit-${il(p)} faire ?`,
      format: "short",
      expected: rep(k, "tours"),
      comparator: "number_equal",
      explanation: E("un tour correspond au périmètre.", "on calcule un tour, puis on cherche combien de tours font la distance.", `$2 \\times (${T(L)} + ${T(l)}) = ${T(P)}$ m ; $${T(D)} \\div ${T(P)} = ${k}$.`, `${p.p} doit faire ${k} tours.`),
    };
  return {
    text: `Un tour ${de(lieu.un)}, rectangle de ${q(L, "m")} sur ${q(l, "m")} : ${p.p} en fait ${k}. Quelle distance totale, en m ?`,
    format: "short",
    expected: rep(D, "m"),
    comparator: "number_equal",
    explanation: expl(`la distance totale est ${q(D, "m")}.`),
  };
}

const TRI_CTX = [
  { un: "un champ triangulaire", mat: "clôture", u: "m", r: [40, 120] },
  { un: "un jardin triangulaire", mat: "bordure", u: "m", r: [6, 20] },
  { un: "une parcelle triangulaire", mat: "grillage", u: "m", r: [15, 50] },
  { un: "un îlot routier triangulaire", mat: "bordure de trottoir", u: "m", r: [5, 15] },
  { un: "une voile triangulaire", mat: "ruban de renfort", u: "m", r: [2, 8] },
  { un: "un massif triangulaire", mat: "bordure en pierre", u: "m", r: [2, 6] },
];
const TRI_PLURIELS = [
  { pl: "fanions", f: false, mat: "galon", r: [15, 30] },
  { pl: "étiquettes", f: true, mat: "ruban", r: [5, 12] },
  { pl: "foulards", f: false, mat: "ourlet", r: [50, 90] },
  { pl: "drapeaux de fête", f: false, mat: "biais coloré", r: [15, 30] },
  { pl: "serviettes pliées", f: true, mat: "dentelle", r: [20, 40] },
];

function probTriangle(): Q {
  const t = randomInt(0, 2);
  const p = randomChoice(PRENOMS);
  if (t === 0) {
    const o = randomChoice(TRI_CTX);
    const [a, b, c] = cotesTriangle(o.r[0], o.r[1]);
    const P = a + b + c;
    const text = randomChoice([
      `${cap(o.un)} a des côtés de ${q(a, o.u)}, ${q(b, o.u)} et ${q(c, o.u)}. Quelle longueur ${deNu(o.mat)} faut-il pour en faire le tour ?`,
      `${p.p} mesure les côtés ${de(o.un)} : ${q(a, o.u)}, ${q(b, o.u)} et ${q(c, o.u)}. Combien de mètres ${deNu(o.mat)} lui faut-il pour en faire le tour ?`,
    ]);
    return {
      text,
      format: "short",
      expected: rep(P, o.u),
      comparator: "number_equal",
      explanation: E(DEF_P, "on additionne les trois côtés.", `$${T(a)} + ${T(b)} + ${T(c)} = ${T(P)}$.`, `il faut ${q(P, o.u)} ${deNu(o.mat)}.`),
    };
  }
  if (t === 1) {
    const o = randomChoice(TRI_PLURIELS);
    const n = randomInt(3, 12);
    const [a, b, c] = cotesTriangle(o.r[0], o.r[1]);
    const P = a + b + c;
    const res = n * P;
    const text = randomChoice([
      `On fabrique ${n} ${o.pl} triangulaires identiques, de côtés ${q(a, "cm")}, ${q(b, "cm")} et ${q(c, "cm")}. Quelle longueur ${deNu(o.mat)} faut-il en tout pour les border ?`,
      `${p.p} borde ${n} ${o.pl} en forme de triangle ; ${o.f ? "chacune" : "chacun"} a des côtés de ${q(a, "cm")}, ${q(b, "cm")} et ${q(c, "cm")}. Combien de centimètres ${deNu(o.mat)} utilise-t-${il(p)} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: rep(res, "cm"),
      comparator: "number_equal",
      explanation: E(DEF_P, "on calcule le tour d’un triangle, puis on multiplie par le nombre d’objets.", `$${T(a)} + ${T(b)} + ${T(c)} = ${T(P)}$ ; $${T(P)} \\times ${n} = ${T(res)}$.`, `il faut ${q(res, "cm")} ${deNu(o.mat)}.`),
    };
  }
  const nom = randomChoice(TRI_NOMS);
  const [a, b, c] = cotesTriangle(300, 900);
  const A = Math.round(a / 10) * 10;
  const B = Math.round(b / 10) * 10;
  const C = Math.round(c / 10) * 10;
  const k = randomInt(2, 5);
  const D = k * (A + B + C);
  const enKm = Math.random() < 0.5;
  const course = randomChoice(["Un parcours de cross", "Une boucle de randonnée", "Un circuit de VTT", "Une course d’orientation"]);
  return {
    text: `${course} relie trois points ${nom[0]}, ${nom[1]} et ${nom[2]} : ${nom[0]}${nom[1]} $=$ ${q(A, "m")}, ${nom[1]}${nom[2]} $=$ ${q(B, "m")} et ${nom[2]}${nom[0]} $=$ ${q(C, "m")}. ${p.p} fait ${k} boucles. Quelle distance parcourt-${il(p)}, en ${enKm ? "km" : "m"} ?`,
    format: "short",
    expected: enKm ? rep(D / 1000, "km") : rep(D, "m"),
    comparator: "number_equal",
    explanation: E("une boucle correspond au périmètre du triangle.", "on additionne les trois côtés, puis on multiplie par le nombre de boucles.", `$${T(A)} + ${T(B)} + ${T(C)} = ${T(A + B + C)}$ m ; $${T(A + B + C)} \\times ${k} = ${T(D)}$ m${enKm ? `, soit ${q(D / 1000, "km")}` : ""}.`, `${p.p} parcourt ${enKm ? q(D / 1000, "km") : q(D, "m")}.`),
  };
}

function probPortail(): Q {
  const c = randomChoice(CONTOURS.filter((x) => x.porte));
  const { L, l } = dims(c, true);
  // ⛔ 08/10/2026 : l'ouverture est plus étroite que le plus petit côté (un portillon de 2,5 m sur un côté de 2 m sortait).
  const g = randomChoice([1, 1.5, 2, 2.5, 3, 4].filter((x) => x < l));
  const P = 2 * (L + l);
  const res = P - g;
  const ouv = randomChoice(["un portail", "un portillon", "un passage", "une entrée"]);
  const p = randomChoice(PRENOMS);
  const text = randomChoice([
    `On veut ${pour(c.but, c.un)} rectangulaire de ${q(L, "m")} sur ${q(l, "m")}, en laissant ${ouv} de ${q(g, "m")}. Quelle longueur ${deNu(c.mat)} faut-il ?`,
    `${cap(c.le)}, rectangulaire, mesure ${q(L, "m")} sur ${q(l, "m")}. On y prévoit ${ouv} de ${q(g, "m")}. Quelle longueur ${deNu(c.mat)} reste-t-il à poser tout autour ?`,
    `Combien de mètres ${deNu(c.mat)} faut-il pour ${pour(c.but, c.un)} rectangulaire de ${q(l, "m")} sur ${q(L, "m")}, si l’on prévoit ${ouv} de ${q(g, "m")} ?`,
    `${p.p} doit ${pour(c.but, c.le)} : un rectangle de ${q(L, "m")} de long et ${q(l, "m")} de large, avec ${ouv} de ${q(g, "m")}. Quelle longueur ${deNu(c.mat)} lui faut-il ?`,
  ]);
  return {
    text,
    format: "short",
    expected: rep(res, "m"),
    comparator: "number_equal",
    explanation: E(DEF_P, "on calcule le tour complet, puis on retire l’ouverture.", `$2 \\times (${T(L)} + ${T(l)}) = ${T(P)}$ ; $${T(P)} - ${T(g)} = ${T(res)}$.`, `il faut ${q(res, "m")} ${deNu(c.mat)}.`),
  };
}

function probCout(): Q {
  const c = randomChoice(CONTOURS);
  const forme = randomInt(0, 2);
  let P: number;
  let desc: string;
  let calc: string;
  const u = c.u;
  if (forme === 0 || c.carre === false) {
    const { L, l } = dims(c);
    P = 2 * (L + l);
    desc = `rectangulaire de ${q(L, u)} sur ${q(l, u)}`;
    calc = `$2 \\times (${T(L)} + ${T(l)}) = ${T(P)}$ ${u}`;
  } else if (forme === 1) {
    let s = randomInt(c.l[0], c.l[1]);
    if (u === "cm") s = Math.round(s / 5) * 5;
    P = 4 * s;
    desc = `${adjCarre(c.un)} de ${q(s, u)} de côté`;
    calc = `$4 \\times ${T(s)} = ${T(P)}$ ${u}`;
  } else {
    const [a, b, cc] = cotesTriangle(c.l[0], c.L[1]);
    const k = u === "cm" ? 5 : 1;
    const A = Math.round(a / k) * k;
    const B = Math.round(b / k) * k;
    const C = Math.round(cc / k) * k;
    P = A + B + C;
    desc = `triangulaire de côtés ${q(A, u)}, ${q(B, u)} et ${q(C, u)}`;
    calc = `$${T(A)} + ${T(B)} + ${T(C)} = ${T(P)}$ ${u}`;
  }
  const prix = randomInt(c.prix[0] * 10, c.prix[1] * 10) / 10;
  // Un prix s'écrit avec deux décimales : « 1,10 € », pas « 1,1 € ».
  const prixTxt = Number.isInteger(prix) ? M(prix) : `$${prix.toFixed(2).replace(".", "{,}")}$`;
  const Pm = u === "cm" ? P / 100 : P;
  /** Un montant en LaTeX : entier tel quel, sinon deux décimales (« 91{,}20 »). */
  const euros = (x: number) => (Number.isInteger(x) ? T(x) : x.toFixed(2).replace(".", "{,}"));
  // ⛔ 08/10/2026 : calcul en millièmes d'euro ENTIERS — en virgule flottante, 29,585 s'arrondissait à 29,58.
  const cout = Math.round(Math.round(Pm * prix * 1000) / 10) / 100;
  const p = randomChoice(PRENOMS);
  const text = randomChoice([
    `${cap(c.un)} est ${desc}. Le mètre ${deNu(c.mat)} coûte ${prixTxt} €. Combien coûte la longueur ${deNu(c.mat)} nécessaire pour ${pour(c.but, c.le)} ?`,
    `${p.p} veut ${pour(c.but, c.un)} ${desc}. Le mètre ${deNu(c.mat)} est à ${prixTxt} €. Quelle sera la dépense ?`,
    `Le mètre ${deNu(c.mat)} est vendu ${prixTxt} €. Combien faut-il dépenser pour ${pour(c.but, c.un)} ${desc} ?`,
    `Quel est le coût ${deNu(c.mat)} pour ${pour(c.but, c.un)} ${desc}, à ${prixTxt} € le mètre ?`,
  ]);
  const conv = u === "cm" ? ` $=$ ${q(Pm, "m")}` : "";
  return {
    text: `${text}${Math.abs(Pm * prix - cout) > 1e-9 ? " Arrondis au centime." : ""}`,
    format: "short",
    // ⛔ 08/10/2026 : un prix s'affiche avec deux chiffres après la virgule (« 91,20 € ») ; « 91,2 € » reste accepté.
    expected: Number.isInteger(cout)
      ? rep(cout, "€")
      : [...new Set([`${cout.toFixed(2).replace(".", ",")} €`, `${cout.toFixed(2).replace(".", ",")} euros`, ...rep(cout, "€")])],
    comparator: "number_equal",
    explanation: E(
      "le prix dépend de la longueur à poser, c’est-à-dire du périmètre.",
      "on calcule le périmètre (en m, puisque le prix est donné au mètre), puis on le multiplie par le prix d’un mètre.",
      `${calc}${conv} ; $${T(Pm)} \\times ${prixTxt.slice(1, -1)} ${Math.abs(Pm * prix - cout) > 1e-9 ? "\\approx" : "="} ${euros(cout)}$ €.`,
      `la dépense est de $${euros(cout)}$ €.`
    ),
  };
}

const EN_ROULEAUX = ["grillage", "clôture électrique", "clôture", "corde de sécurité", "guirlande lumineuse", "bordure en bois"];

function probRouleaux(): Q {
  const t = randomInt(0, 2);
  const c = randomChoice(
    CONTOURS.filter((x) => x.u === "m" && (t === 2 ? x.porte : EN_ROULEAUX.includes(x.mat)))
  );
  const { L, l } = dims(c);
  const P = 2 * (L + l);
  const p = randomChoice(PRENOMS);
  if (t === 0) {
    const rouleau = P + randomInt(2, 15);
    const text = randomChoice([
      `${cap(c.le)} est un rectangle de ${q(L, "m")} sur ${q(l, "m")}. On a ${q(rouleau, "m")} ${deNu(c.mat)}. Combien de mètres en restera-t-il après en avoir fait le tour ?`,
      `${p.p} achète ${q(rouleau, "m")} ${deNu(c.mat)} pour ${pour(c.but, c.un)} rectangulaire de ${q(L, "m")} sur ${q(l, "m")}. Quelle longueur lui restera-t-il ?`,
    ]);
    return {
      text,
      format: "short",
      expected: rep(rouleau - P, "m"),
      comparator: "number_equal",
      explanation: E(DEF_P, "on calcule le périmètre, puis on le retire de la longueur achetée.", `$2 \\times (${T(L)} + ${T(l)}) = ${T(P)}$ ; $${T(rouleau)} - ${T(P)} = ${T(rouleau - P)}$.`, `il restera ${q(rouleau - P, "m")}.`),
    };
  }
  if (t === 1) {
    const R = randomChoice([10, 15, 20, 25, 50]);
    const n = Math.ceil(P / R);
    const text = randomChoice([
      `Le magasin vend des rouleaux ${deNu(c.mat)} de ${q(R, "m")}. Combien de rouleaux faut-il acheter pour ${pour(c.but, c.un)} rectangulaire de ${q(L, "m")} sur ${q(l, "m")} ?`,
      `${p.p} veut ${pour(c.but, c.un)} rectangulaire de ${q(L, "m")} sur ${q(l, "m")}. Un rouleau ${deNu(c.mat)} mesure ${q(R, "m")}. Combien de rouleaux doit-${il(p)} prendre ?`,
    ]);
    return {
      text,
      format: "short",
      expected: rep(n, compte(n, "rouleau", "rouleaux")),
      comparator: "number_equal",
      explanation: E(DEF_P, "on calcule le périmètre, puis on cherche combien de rouleaux le couvrent (on arrondit au-dessus : un rouleau entamé s’achète entier).", `$2 \\times (${T(L)} + ${T(l)}) = ${T(P)}$ m ; $${T(P)} \\div ${R} \\approx ${T(arrondi(P / R, 2))}$, donc ${n} ${compte(n, "rouleau", "rouleaux")}.`, `il faut acheter ${n} ${compte(n, "rouleau", "rouleaux")}.`),
    };
  }
  const ds = [1, 2, 2.5, 3, 4, 5].filter((d) => Number.isInteger(P / d));
  const d = randomChoice(ds);
  const n = P / d;
  const piquets = Math.random() < 0.5;
  const mot = piquets ? "piquets" : "poteaux";
  const tousLes = d === 1 ? "tous les mètres" : `tous les ${q(d, "m")}`;
  const text = piquets
    ? `On plante un piquet ${tousLes} tout autour ${de(c.un)} rectangulaire de ${q(L, "m")} sur ${q(l, "m")}, en commençant par un coin. Combien de piquets faut-il ?`
    : `Autour ${de(c.le)}, un rectangle de ${q(L, "m")} sur ${q(l, "m")}, ${p.p} place un poteau ${tousLes}, en partant d’un coin. Combien de poteaux pose-t-${il(p)} ?`;
  return {
    text,
    format: "short",
    expected: rep(n, mot),
    comparator: "number_equal",
    explanation: E(DEF_P, `sur un contour fermé, il y a autant de ${mot} que d’intervalles : périmètre $\\div$ écart.`, `$2 \\times (${T(L)} + ${T(l)}) = ${T(P)}$ m ; $${T(P)} \\div ${T(d)} = ${T(n)}$.`, `il faut ${n} ${mot}.`),
  };
}

const CERCLES: { gn: string; u: string; r: [number, number]; mat: string }[] = [
  { gn: "un rond-point", u: "m", r: [8, 25], mat: "bordure" },
  { gn: "un bassin rond", u: "m", r: [2, 5], mat: "margelle" },
  { gn: "une nappe ronde", u: "cm", r: [60, 90], mat: "galon" },
  { gn: "un trampoline", u: "m", r: [1, 3], mat: "boudin de protection" },
  { gn: "une pizza", u: "cm", r: [13, 17], mat: "croûte" },
  { gn: "une horloge murale", u: "cm", r: [15, 25], mat: "liseré doré" },
  { gn: "une piste circulaire", u: "m", r: [30, 60], mat: "ligne peinte" },
  { gn: "un manège", u: "m", r: [4, 8], mat: "guirlande lumineuse" },
  { gn: "une cible de tir à l’arc", u: "cm", r: [40, 61], mat: "bande de mousse" },
  { gn: "un massif de fleurs rond", u: "m", r: [1, 4], mat: "bordure" },
  { gn: "une table ronde", u: "cm", r: [50, 80], mat: "baguette de finition" },
];

function probCercle(): Q {
  const t = randomInt(0, 3);
  const p = randomChoice(PRENOMS);
  const d = randomChoice([0, 1]);
  if (t === 0) {
    const D = randomInt(50, 70);
    const n = randomChoice([10, 20, 50, 100, 200]);
    const r = avecPi((pi) => (pi * D * n) / 100, d, "m");
    return {
      text: randomChoice([
        `La roue du vélo ${deP(p)} a un diamètre de ${q(D, "cm")}. Quelle distance parcourt-${il(p)} quand la roue fait ${n} tours ? Donne-la en mètres, arrondie ${MOT_ARRONDI[d]}.`,
        `Une roue de ${q(D, "cm")} de diamètre fait ${n} tours sans glisser. Quelle distance, en m, a-t-elle parcourue ? Arrondis ${MOT_ARRONDI[d]}.`,
      ]),
      format: "short",
      expected: r.exp,
      comparator: "number_equal",
      explanation: E("en un tour, la roue avance de la longueur de son cercle : $\\pi \\times d$.", "on calcule un tour, on multiplie par le nombre de tours, puis on convertit en m.", `$\\pi \\times ${D} \\times ${n} \\approx ${T(arrondi(Math.PI * D * n, 1))}$ cm, soit environ ${q(r.val, "m")}${r.note}.`, `la distance est d’environ ${q(r.val, "m")}.`),
      canvas: cercleCanvas("diametre", `${D} cm`),
    };
  }
  if (t === 3) {
    const C = randomInt(80, 400);
    const r = avecPi((pi) => C / pi, d, "cm");
    const obj = randomChoice(["un tronc d’arbre", "un vieux chêne", "une colonne de temple", "un baobab", "un séquoia"]);
    return {
      text: randomChoice([
        `On mesure le tour ${de(obj)} avec un mètre ruban : ${q(C, "cm")}. Quel est son diamètre, arrondi ${MOT_ARRONDI[d]} ?`,
        `La circonférence ${de(obj)} est de ${q(C, "cm")}. Calcule son diamètre en cm, arrondi ${MOT_ARRONDI[d]}.`,
      ]),
      format: "short",
      expected: r.exp,
      comparator: "number_equal",
      explanation: E("la longueur d’un cercle vaut $\\pi \\times d$.", "donc $d =$ longueur $\\div \\pi$.", `$${T(C)} \\div \\pi \\approx ${T(r.val)}$${r.note}.`, `le diamètre mesure environ ${q(r.val, "cm")}.`),
    };
  }
  const o = randomChoice(CERCLES);
  const R = randomInt(o.r[0], o.r[1]);
  const donneDiam = Math.random() < 0.5;
  const r = avecPi((pi) => 2 * pi * R, d, o.u);
  const donnee = donneDiam ? `de diamètre ${q(2 * R, o.u)}` : `de rayon ${q(R, o.u)}`;
  const text =
    t === 1
      ? randomChoice([
          `${cap(o.gn)} a la forme d’un cercle ${donnee}. Quelle est la longueur de son tour ? Arrondis ${MOT_ARRONDI[d]}.`,
          `Quelle longueur ${deNu(o.mat)} faut-il à ${p.p} pour faire tout le tour ${de(o.gn)} ${donnee} ? Arrondis ${MOT_ARRONDI[d]}.`,
        ])
      : randomChoice([
          `Calcule le périmètre ${de(o.gn)} ${donnee}, arrondi ${MOT_ARRONDI[d]}.`,
          `Combien de ${UMOT[o.u]} mesure le contour ${de(o.gn)} ${donnee} ? Donne un arrondi ${MOT_ARRONDI[d]}.`,
        ]);
  return {
    text,
    format: "short",
    expected: r.exp,
    comparator: "number_equal",
    explanation: E(
      "la longueur d’un cercle de rayon $r$ vaut $2 \\times \\pi \\times r$ (ou $\\pi \\times d$).",
      donneDiam ? `le diamètre vaut ${q(2 * R, o.u)}, donc on calcule $\\pi \\times ${T(2 * R)}$.` : `on calcule $2 \\times \\pi \\times ${T(R)}$.`,
      `$2 \\times \\pi \\times ${T(R)} \\approx ${T(r.val)}$${r.note}.`,
      `la longueur est d’environ ${q(r.val, o.u)}.`
    ),
    canvas: donneDiam ? cercleCanvas("diametre", `${2 * R} ${o.u}`) : cercleCanvas("rayon", `${R} ${o.u}`),
  };
}

/* ===========================================================================
   DÉFIS
=========================================================================== */
const PAIRES = [
  { deux: "deux jardins", f: false, u: "m" },
  { deux: "deux enclos", f: false, u: "m" },
  { deux: "deux bassins", f: false, u: "m" },
  { deux: "deux potagers", f: false, u: "m" },
  { deux: "deux terrasses", f: true, u: "m" },
  { deux: "deux parcelles", f: true, u: "m" },
  { deux: "deux pelouses", f: true, u: "m" },
  { deux: "deux cours", f: true, u: "m" },
  { deux: "deux cadres", f: false, u: "dm" },
  { deux: "deux tapis", f: false, u: "dm" },
  { deux: "deux nappes", f: true, u: "dm" },
  { deux: "deux affiches", f: true, u: "dm" },
  { deux: "deux figures", f: true, u: "cm" },
];

/** « On compare deux jardins : l’un est un carré…, l’autre un rectangle… ». */
function paire(fig1: string, fig2: string, u: string) {
  const pa = randomChoice(PAIRES.filter((x) => x.u === u));
  const un = pa.f ? "l’une" : "l’un";
  return randomChoice([
    `On compare ${pa.deux} : ${un} est ${fig1}, l’autre ${fig2}. Laquelle des deux formes a le plus grand périmètre ?`,
    `Voici ${pa.deux}. ${cap(un)} a la forme ${de(fig1)}, l’autre la forme ${de(fig2)}. Quelle forme a le contour le plus long ?`,
    `Pour ${pa.deux}, on hésite entre ${fig1} et ${fig2}. Laquelle de ces deux formes demande la plus grande bordure ?`,
  ]);
}

function defiCompare(): Q {
  const t = randomInt(0, 3);
  const u = randomChoice(["cm", "m", "dm"]);
  const egal = Math.random() < 0.33;
  const MEME = "ils ont le même périmètre";
  const NSP = "on ne peut pas savoir sans l’aire";
  if (t === 0 || t === 1) {
    const ctx = randomChoice(CONTOURS_CARRES);
    // Les mesures d'une nappe ou d'un cadre se comptent en dizaines de cm.
    const s = t === 1 && ctx.u === "cm" ? 10 : 1;
    const c0 = randomInt(4, 15);
    let L0: number;
    let l0: number;
    if (egal) {
      const e = randomInt(1, c0 - 1);
      L0 = c0 + e;
      l0 = c0 - e;
    } else {
      L0 = randomInt(c0 + 1, c0 + 8);
      l0 = randomInt(1, c0);
      if (L0 + l0 === 2 * c0) l0 = l0 > 1 ? l0 - 1 : l0 + 1;
    }
    const c = c0 * s;
    const L = L0 * s;
    const l = l0 * s;
    const Pc = 4 * c;
    const Pr = 2 * (L + l);
    if (t === 0) {
      const ok = Pc === Pr ? MEME : Pc > Pr ? "le carré" : "le rectangle";
      return {
        text: randomChoice([
          `Un carré de côté ${q(c, u)} et un rectangle de ${q(L, u)} sur ${q(l, u)} : lequel a le plus grand périmètre ?`,
          `Compare le périmètre d’un rectangle de ${q(L, u)} sur ${q(l, u)} et celui d’un carré de ${q(c, u)} de côté.`,
          paire(`un carré de ${q(c, u)} de côté`, `un rectangle de ${q(L, u)} sur ${q(l, u)}`, u),
          paire(`un rectangle de ${q(L, u)} sur ${q(l, u)}`, `un carré de ${q(c, u)} de côté`, u),
        ]),
        format: "qcm",
        choices: makeChoices(ok, ["le carré", "le rectangle", MEME, NSP]),
        expected: [ok],
        comparator: "mcq_exact",
        explanation: E(DEF_P, "on calcule les deux périmètres, puis on compare.", `carré : $4 \\times ${T(c)} = ${T(Pc)}$ ; rectangle : $2 \\times (${T(L)} + ${T(l)}) = ${T(Pr)}$.`, `réponse : ${ok}.`),
      };
    }
    let p1 = randomChoice(PRENOMS);
    let p2 = randomChoice(PRENOMS);
    while (p2.p === p1.p) p2 = randomChoice(PRENOMS);
    const celui = estFem(ctx.un) ? "Celle" : "Celui";
    const okP = Pc === Pr ? "il leur faudra la même longueur" : Pc > Pr ? p1.p : p2.p;
    return {
      text: `${p1.p} et ${p2.p} veulent ${p1.f && p2.f ? "chacune" : "chacun"} ${pour(ctx.but, ctx.un)}. ${celui} ${deP(p1)} est un carré de ${q(c, ctx.u)} de côté ; ${celui.toLowerCase()} ${deP(p2)} est un rectangle de ${q(L, ctx.u)} sur ${q(l, ctx.u)}. Qui aura besoin de la plus grande longueur ${deNu(ctx.mat)} ?`,
      format: "qcm",
      choices: makeChoices(okP, [p1.p, p2.p, "il leur faudra la même longueur", "on ne peut pas savoir sans l’aire"]),
      expected: [okP],
      comparator: "mcq_exact",
      explanation: E(`${DEF_P} La longueur ${deNu(ctx.mat)} est le périmètre.`, "on calcule les deux périmètres, puis on compare.", `${p1.p} : $4 \\times ${T(c)} = ${T(Pc)}$ ; ${p2.p} : $2 \\times (${T(L)} + ${T(l)}) = ${T(Pr)}$.`, `réponse : ${okP}.`),
    };
  }
  if (t === 2) {
    const k = randomInt(2, 6);
    let tc = 4 * k;
    const c = 3 * k + (egal ? 0 : randomChoice([-2, -1, 1, 2]));
    if (c <= 0) tc += 4;
    const Pt = 3 * tc;
    const Pc = 4 * c;
    const ok = Pt === Pc ? MEME : Pt > Pc ? "le triangle" : "le carré";
    return {
      text: randomChoice([
        `Un triangle équilatéral de côté ${q(tc, u)} et un carré de côté ${q(c, u)} : lequel a le plus long contour ?`,
        `Qui a le plus grand périmètre : un carré de ${q(c, u)} de côté ou un triangle équilatéral de ${q(tc, u)} de côté ?`,
        paire(`un triangle équilatéral de ${q(tc, u)} de côté`, `un carré de ${q(c, u)} de côté`, u),
        paire(`un carré de ${q(c, u)} de côté`, `un triangle équilatéral de ${q(tc, u)} de côté`, u),
      ]),
      format: "qcm",
      choices: makeChoices(ok, ["le triangle", "le carré", MEME, "on ne peut pas comparer un triangle et un carré"]),
      expected: [ok],
      comparator: "mcq_exact",
      explanation: E(DEF_P, "on calcule les deux périmètres, puis on compare.", `triangle : $3 \\times ${T(tc)} = ${T(Pt)}$ ; carré : $4 \\times ${T(c)} = ${T(Pc)}$.`, `réponse : ${ok}.`),
    };
  }
  const n1 = randomChoice(RECT_NOMS);
  let n2 = randomChoice(RECT_NOMS);
  // Deux noms SANS lettre commune (pas « MNOP » et « KLMN »).
  while ([...n2].some((x) => n1.includes(x))) n2 = randomChoice(RECT_NOMS);
  const a = randomInt(3, 15);
  const b = randomInt(2, a - 1); // un vrai rectangle, pas un carré
  let c2: number;
  let d2: number;
  // ⛔ 08/10/2026 : ni l'un ni l'autre ne doit être un carré (« 3 cm sur 3 cm » sortait).
  if (egal) {
    const s = a + b;
    c2 = randomInt(Math.floor(s / 2) + 1, s - 1);
    d2 = s - c2;
    if (c2 === a) { c2 += 1; d2 -= 1; }
  } else {
    c2 = randomInt(3, 15);
    d2 = randomInt(2, c2 - 1);
    if (c2 + d2 === a + b) c2 += 1;
  }
  const P1 = 2 * (a + b);
  const P2 = 2 * (c2 + d2);
  const ok = P1 === P2 ? MEME : P1 > P2 ? n1 : n2;
  return {
    text: randomChoice([
      `Le rectangle ${n1} mesure ${q(a, u)} sur ${q(b, u)}, le rectangle ${n2} mesure ${q(c2, u)} sur ${q(d2, u)}. Lequel a le plus grand périmètre ?`,
      `Deux rectangles : ${n1} (${q(a, u)} sur ${q(b, u)}) et ${n2} (${q(c2, u)} sur ${q(d2, u)}). Lequel a le plus long contour ?`,
    ]),
    format: "qcm",
    choices: makeChoices(ok, [n1, n2, MEME, NSP]),
    expected: [ok],
    comparator: "mcq_exact",
    explanation: E(DEF_P, "on calcule les deux périmètres, puis on compare.", `${n1} : $2 \\times (${T(a)} + ${T(b)}) = ${T(P1)}$ ; ${n2} : $2 \\times (${T(c2)} + ${T(d2)}) = ${T(P2)}$.`, `réponse : ${ok}.`),
  };
}

function defiAugmente(): Q {
  const c = randomChoice(CONTOURS);
  const { L, l } = dims(c);
  const u = c.u;
  const a = u === "cm" ? randomChoice([5, 10, 15, 20]) : randomInt(1, 5);
  const b = u === "cm" ? randomChoice([5, 10, 15, 20]) : randomInt(1, 5);
  const t = randomInt(0, 2);
  const P = 2 * (L + l);
  if (t === 0) {
    const inc = 2 * (a + b);
    return {
      text: randomChoice([
        `${cap(c.le)} est un rectangle de ${q(L, u)} sur ${q(l, u)}. On l’agrandit : ${q(a, u)} de plus en longueur et ${q(b, u)} de plus en largeur. De combien de ${UMOT[u]} ${deNu(c.mat)} supplémentaires a-t-on besoin ?`,
        `Un rectangle mesure ${q(L, u)} sur ${q(l, u)}. On allonge sa longueur de ${q(a, u)} et sa largeur de ${q(b, u)}. De combien son périmètre augmente-t-il ?`,
      ]),
      format: "short",
      expected: rep(inc, u),
      comparator: "number_equal",
      explanation: E("$P = 2 \\times (L + l)$.", `chaque longueur gagne ${q(a, u)} et chaque largeur ${q(b, u)} : il y a deux longueurs et deux largeurs.`, `$2 \\times ${T(a)} + 2 \\times ${T(b)} = ${T(inc)}$ (ancien périmètre $${T(P)}$, nouveau $${T(P + inc)}$).`, `le périmètre augmente de ${q(inc, u)}.`),
    };
  }
  if (t === 1) {
    const newP = 2 * (L + a + l + b);
    return {
      text: randomChoice([
        `On agrandit ${c.le}, un rectangle de ${q(L, u)} sur ${q(l, u)}, de ${q(a, u)} en longueur et de ${q(b, u)} en largeur. Quelle longueur ${deNu(c.mat)} faudra-t-il alors pour en faire le tour ?`,
        `Un rectangle de ${q(L, u)} sur ${q(l, u)} est agrandi : $+ ${T(a)}$ ${u} sur la longueur, $+ ${T(b)}$ ${u} sur la largeur. Quel est son nouveau périmètre ?`,
      ]),
      format: "short",
      expected: rep(newP, u),
      comparator: "number_equal",
      explanation: E("$P = 2 \\times (L + l)$.", "on calcule les nouvelles dimensions, puis le périmètre.", `$${T(L)} + ${T(a)} = ${T(L + a)}$ ; $${T(l)} + ${T(b)} = ${T(l + b)}$ ; $2 \\times (${T(L + a)} + ${T(l + b)}) = ${T(newP)}$.`, `le nouveau périmètre est ${q(newP, u)}.`),
    };
  }
  const s = randomInt(3, 20);
  const k = randomInt(1, 5);
  return {
    text: randomChoice([
      `On augmente de ${q(k, u)} le côté d’un carré de ${q(s, u)}. De combien augmente son périmètre ?`,
      `Le côté d’un carré passe de ${q(s, u)} à ${q(s + k, u)}. De combien son périmètre a-t-il augmenté ?`,
    ]),
    format: "short",
    expected: rep(4 * k, u),
    comparator: "number_equal",
    explanation: E("$P = 4 \\times c$.", "chacun des 4 côtés gagne la même longueur.", `$4 \\times ${T(k)} = ${T(4 * k)}$ (de $${T(4 * s)}$ à $${T(4 * (s + k))}$).`, `le périmètre augmente de ${q(4 * k, u)}.`),
  };
}

function defiLitteral(): Q {
  const t = randomInt(0, 4);
  const lettre = randomChoice(["x", "a", "t", "n", "y"]);
  const u = randomChoice(["cm", "m"]);
  const v = randomInt(4, 12); // 2v > 6 : le triangle isocèle existe toujours
  const k = randomInt(1, 6);
  const k2 = randomInt(1, 6);
  const x = lettre;
  type Fig = { desc: string; coef: number; cst: number; formule: string };
  const figs: Fig[] = [
    { desc: `un rectangle de largeur $${x}$ et de longueur $${x} + ${k}$`, coef: 4, cst: 2 * k, formule: `2 \\times (${x} + ${x} + ${k}) = 4${x} + ${2 * k}` },
    { desc: `un carré de côté $${x} + ${k}$`, coef: 4, cst: 4 * k, formule: `4 \\times (${x} + ${k}) = 4${x} + ${4 * k}` },
    { desc: `un triangle isocèle de côtés $${x}$, $${x}$ et $${k}$`, coef: 2, cst: k, formule: `${x} + ${x} + ${k} = 2${x} + ${k}` },
    { desc: `un triangle de côtés $${x}$, $${x} + ${k}$ et $${x} + ${k2}$`, coef: 3, cst: k + k2, formule: `${x} + ${x} + ${k} + ${x} + ${k2} = 3${x} + ${k + k2}` },
    { desc: `un rectangle de largeur $${x}$ et de longueur $2${x}$`, coef: 6, cst: 0, formule: `2 \\times (${x} + 2${x}) = 6${x}` },
  ];
  const f = figs[t];
  const P = f.coef * v + f.cst;
  const desc = f.desc;
  if (Math.random() < 0.5) {
    return {
      text: randomChoice([
        `On considère ${desc} (en ${u}). Calcule son périmètre pour $${lettre} = ${v}$.`,
        `Quel est le périmètre ${de(desc)}, lorsque $${lettre} = ${v}$ ${u} ?`,
        `Exprime le périmètre ${de(desc)} en fonction de $${lettre}$, puis calcule-le pour $${lettre} = ${v}$ (en ${u}).`,
      ]),
      format: "short",
      expected: rep(P, u),
      comparator: "number_equal",
      explanation: E(DEF_P, `on écrit le périmètre en fonction de ${lettre} : $${f.formule}$, puis on remplace ${lettre} par $${v}$.`, `$${f.coef} \\times ${v}${f.cst ? ` + ${f.cst}` : ""} = ${T(P)}$.`, `le périmètre vaut ${q(P, u)}.`),
    };
  }
  return {
    text: randomChoice([
      `On considère ${desc} (en ${u}). Pour quelle valeur de $${lettre}$ son périmètre vaut-il ${q(P, u)} ?`,
      `Le périmètre ${de(desc)} est égal à ${q(P, u)}. Que vaut $${lettre}$ ?`,
      `Trouve $${lettre}$ sachant qu’${desc} a un périmètre de ${q(P, u)}.`,
    ]),
    format: "short",
    expected: rep(v, u),
    comparator: "number_equal",
    explanation: E(DEF_P, `le périmètre s’écrit $${f.formule}$ ; on résout $${f.coef}${lettre}${f.cst ? ` + ${f.cst}` : ""} = ${T(P)}$.`, `${f.cst ? `$${f.coef}${lettre} = ${T(P)} - ${f.cst} = ${T(P - f.cst)}$, puis ` : ""}$${lettre} = ${T(P - f.cst)} \\div ${f.coef} = ${v}$.`, `$${lettre} = ${v}$ ${u}.`),
  };
}

const AUTOUR = [
  { gn: "la Terre (à l’équateur)", u: "m" },
  { gn: "un ballon de basket", u: "cm" },
  { gn: "un tronc d’arbre", u: "cm" },
  { gn: "un rond-point", u: "m" },
  { gn: "une table ronde", u: "cm" },
  { gn: "un manège", u: "m" },
  { gn: "une piste circulaire", u: "m" },
  { gn: "un gâteau rond", u: "cm" },
];

function defiCorde(): Q {
  const o = randomChoice(AUTOUR);
  const t = randomInt(0, 2);
  const d = randomChoice([1, 2]);
  if (t === 0) {
    const delta = randomInt(1, 20);
    const r = avecPi((pi) => 2 * pi * delta, d, o.u);
    return {
      text: randomChoice([
        `On entoure ${o.gn} d’une corde bien tendue. On veut maintenant qu’elle passe partout à ${q(delta, o.u)} du bord. De combien faut-il l’allonger ? Arrondis ${MOT_ARRONDI[d]}.`,
        `Une corde fait exactement le tour ${de(o.gn)}. On l’écarte de ${q(delta, o.u)} tout autour (le rayon augmente de ${q(delta, o.u)}). Quelle longueur de corde faut-il ajouter, arrondie ${MOT_ARRONDI[d]} ?`,
      ]),
      format: "short",
      expected: r.exp,
      comparator: "number_equal",
      explanation: E(
        "la longueur d’un cercle de rayon $r$ est $2\\pi r$.",
        `si le rayon passe de $r$ à $r + ${T(delta)}$, la longueur passe de $2\\pi r$ à $2\\pi r + 2\\pi \\times ${T(delta)}$ : l’allongement ne dépend PAS de $r$.`,
        `$2 \\times \\pi \\times ${T(delta)} \\approx ${T(r.val)}$${r.note}.`,
        `il faut ajouter environ ${q(r.val, o.u)}, que ce soit autour ${o.gn.startsWith("la Terre") ? "de la Terre" : de(o.gn)} ou d’autre chose.`
      ),
    };
  }
  if (t === 1) {
    const dd = randomInt(1, 30);
    const r = avecPi((pi) => pi * dd, d, o.u);
    return {
      text: randomChoice([
        `Le diamètre ${o.gn.startsWith("la Terre") ? "d’un cercle tracé autour de la Terre" : de(o.gn)} augmente de ${q(dd, o.u)}. De combien augmente la longueur de son tour ? Arrondis ${MOT_ARRONDI[d]}.`,
        `On agrandit ${o.gn.startsWith("la Terre") ? "un cercle" : o.gn} : son diamètre gagne ${q(dd, o.u)}. De combien son périmètre s’allonge-t-il, arrondi ${MOT_ARRONDI[d]} ?`,
      ]),
      format: "short",
      expected: r.exp,
      comparator: "number_equal",
      explanation: E("la longueur d’un cercle de diamètre $d$ est $\\pi \\times d$.", `si $d$ augmente de $${T(dd)}$, la longueur augmente de $\\pi \\times ${T(dd)}$.`, `$\\pi \\times ${T(dd)} \\approx ${T(r.val)}$${r.note}.`, `le tour s’allonge d’environ ${q(r.val, o.u)}.`),
    };
  }
  const k = randomChoice([2, 3, 4, 5, 10]);
  const mot = { 2: "double", 3: "triple", 4: "est multiplié par 4", 5: "est multiplié par 5", 10: "est multiplié par 10" }[k]!;
  const cercle = o.gn.startsWith("la Terre") ? "un cercle" : o.gn;
  return {
    text: randomChoice([
      `Le rayon ${de(cercle)} ${mot}. Par combien la longueur de son tour est-elle multipliée ?`,
      `Si le rayon ${de(cercle)} ${mot}, par quel nombre son périmètre est-il multiplié ?`,
    ]),
    format: "short",
    // Un COEFFICIENT multiplicateur : un nombre sans unité.
    expected: [String(k)],
    comparator: "number_equal",
    explanation: E("la longueur d’un cercle est $2\\pi r$ : elle est proportionnelle au rayon.", `si $r$ est multiplié par $${k}$, $2\\pi r$ l’est aussi (ce n’est pas l’aire, qui serait multipliée par $${k * k}$).`, `$2\\pi \\times (${k}r) = ${k} \\times 2\\pi r$.`, `le périmètre est multiplié par $${k}$.`),
  };
}

function defiEgal(): Q {
  const t = randomInt(0, 3);
  const p = randomChoice(PRENOMS);
  if (t === 0) {
    const ctx = randomChoice(CONTOURS_CARRES);
    let { L, l } = dims(ctx);
    if ((L + l) % 2 !== 0) L += 1;
    const c = (L + l) / 2;
    const u = ctx.u;
    return {
      text: randomChoice([
        `${p.p} avait de quoi ${pour(ctx.but, ctx.un)} rectangulaire de ${q(L, u)} sur ${q(l, u)}. Avec exactement la même longueur ${deNu(ctx.mat)}, ${il(p)} veut ${pour(ctx.but, ctx.un)} ${adjCarre(ctx.un)}. Quel sera son côté ?`,
        `Un carré a le même périmètre qu’un rectangle de ${q(L, u)} sur ${q(l, u)}. Combien mesure son côté ?`,
      ]),
      format: "short",
      expected: rep(c, u),
      comparator: "number_equal",
      explanation: E("même périmètre = même longueur de contour.", "on calcule le périmètre du rectangle, puis on le partage en 4 côtés égaux.", `$2 \\times (${T(L)} + ${T(l)}) = ${T(2 * (L + l))}$ ; $${T(2 * (L + l))} \\div 4 = ${T(c)}$.`, `le côté mesure ${q(c, u)}.`),
    };
  }
  if (t === 1) {
    const c = randomInt(2, 10) * 3;
    const tc = (4 * c) / 3;
    const u = randomChoice(["cm", "m"]);
    return {
      text: randomChoice([
        `Un triangle équilatéral a le même périmètre qu’un carré de ${q(c, u)} de côté. Quelle est la longueur du côté du triangle ?`,
        `Avec un fil qui faisait le tour d’un carré de côté ${q(c, u)}, ${p.p} forme un triangle équilatéral. Combien mesure chaque côté ?`,
      ]),
      format: "short",
      expected: rep(tc, u),
      comparator: "number_equal",
      explanation: E("même périmètre = même longueur de contour.", "périmètre du carré $= 4 \\times$ côté, puis côté du triangle $=$ périmètre $\\div 3$.", `$4 \\times ${T(c)} = ${T(4 * c)}$ ; $${T(4 * c)} \\div 3 = ${T(tc)}$.`, `le côté du triangle mesure ${q(tc, u)}.`),
    };
  }
  if (t === 2) {
    const c = randomInt(5, 20);
    const L = randomInt(c + 1, 2 * c - 1);
    const l = 2 * c - L;
    const u = randomChoice(["cm", "m"]);
    return {
      text: randomChoice([
        `Un rectangle a le même périmètre qu’un carré de ${q(c, u)} de côté. Sa longueur mesure ${q(L, u)}. Quelle est sa largeur ?`,
        `${p.p} transforme un enclos carré de ${q(c, u)} de côté en enclos rectangulaire de ${q(L, u)} de long, sans changer la longueur de clôture. Quelle sera la largeur ?`,
      ]),
      format: "short",
      expected: rep(l, u),
      comparator: "number_equal",
      explanation: E("même périmètre = même longueur de contour.", "périmètre du carré, puis demi-périmètre moins la longueur.", `$4 \\times ${T(c)} = ${T(4 * c)}$ ; $${T(4 * c)} \\div 2 = ${T(2 * c)}$ ; $${T(2 * c)} - ${T(L)} = ${T(l)}$.`, `la largeur mesure ${q(l, u)}.`),
    };
  }
  let [x, y, z] = cotesTriangle(3, 15);
  for (let k = 0; k < 100 && (x + y + z) % 4 !== 0; k++) [x, y, z] = cotesTriangle(3, 15);
  if ((x + y + z) % 4 !== 0) [x, y, z] = [5, 7, 8];
  const u = randomChoice(["cm", "m"]);
  return {
    text: randomChoice([
      `Un carré a le même périmètre qu’un triangle de côtés ${q(x, u)}, ${q(y, u)} et ${q(z, u)}. Quelle est la longueur du côté du carré ?`,
      `On reforme en carré une ficelle qui faisait le tour d’un triangle de côtés ${q(x, u)}, ${q(y, u)} et ${q(z, u)}. Quel est le côté du carré ?`,
    ]),
    format: "short",
    expected: rep((x + y + z) / 4, u),
    comparator: "number_equal",
    explanation: E("même périmètre = même longueur de contour.", "on additionne les côtés du triangle, puis on divise par 4.", `$${T(x)} + ${T(y)} + ${T(z)} = ${T(x + y + z)}$ ; $${T(x + y + z)} \\div 4 = ${T((x + y + z) / 4)}$.`, `le côté du carré mesure ${q((x + y + z) / 4, u)}.`),
  };
}

/* ===========================================================================
   LA BANQUE
=========================================================================== */
const base = {
  niveau: "4e" as const,
  matiere: "maths" as const,
  notionId: "aire_perimetre",
  theme: "neutral" as const,
};

/* ---------------------------------------------------------------------------
   ⛔ 04/10/2026 — L'ÉNONCÉ DIT L'UNITÉ ATTENDUE, TOUJOURS.
   L'unité est lue dans `expected` (« 24 cm » → cm). Si l'énoncé ne la
   demande pas déjà (« en cm », « Combien de centimètres… », « Combien de
   rouleaux… »), on ajoute « Donne la réponse en cm. » — même quand une seule
   unité apparaît dans le texte.
--------------------------------------------------------------------------- */
const MOT_UNITE: Record<string, string> = { ...UMOT, "€": "euros" };
/** L'unité de la réponse attendue, ou null si elle n'en a pas (QCM de mots). */
function uniteAttendue(expected: readonly string[]): string | null {
  const m = /^−?[\d\s]+(?:,\d+)?\s+(\S.*)$/.exec(String(expected[0] ?? "").trim());
  return m ? m[1] : null;
}
/** L'énoncé demande-t-il déjà cette unité ? */
function enonceDitUnite(text: string, u: string): boolean {
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const fin = "(?![A-Za-zÀ-ÿ²³])";
  const formes = [esc(u), ...(MOT_UNITE[u] ? [esc(MOT_UNITE[u])] : [])];
  return formes.some((f) =>
    new RegExp(`(\\ben |\\(en |Combien de |combien de |nombre de )${f}${fin}`).test(text)
  );
}
function avecUnite<T extends { text: string; expected: string[] }>(q: T): T {
  const u = uniteAttendue(q.expected);
  if (!u || enonceDitUnite(q.text, u)) return q;
  return { ...q, text: `${q.text} Donne la réponse en ${MOT_UNITE[u] && u === "€" ? "euros" : u}.` };
}

const ITEMS: TutorBankItemV4[] = [
  // =========================
  // PERIMETRE_COMPRENDRE
  // =========================
  {
    kind: "fixed",
    id: "aire_perimetre_comprendre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Le périmètre d’une figure correspond…",
    format: "qcm",
    choices: [
      "à la surface intérieure",
      "à la longueur de son contour",
      "au nombre de sommets",
      "à la moitié de son aire",
    ],
    expected: ["à la longueur de son contour"],
    comparator: "mcq_exact",
    hint: "On parle du tour complet de la figure.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          ("Le périmètre d’une figure est la longueur totale de son contour.") +
          "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["aire_perimetre", "definition"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_comprendre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Pour calculer un périmètre, on fait surtout…",
    format: "qcm",
    choices: [
      "une addition de longueurs",
      "une multiplication de surfaces",
      "une division par 2",
      "une soustraction d’angles",
    ],
    expected: ["une addition de longueurs"],
    comparator: "mcq_exact",
    hint: "On additionne les côtés du contour.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          ("Pour calculer un périmètre, on additionne les longueurs qui forment le contour de la figure.") +
          "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["aire_perimetre", "vocabulaire"],
  },
  {
    ...base,
    kind: "template",
    id: "4e_aire_perimetre_comprendre_tpl_grandeur",
    microId: "aire_perimetre_comprendre",
    difficulty: 1,
    hint: "Le périmètre fait le TOUR ; l’aire REMPLIT la surface.",
    tags: ["aire_perimetre", "comprendre", "qcm", "template"],
    generate: compGrandeur,
  },
  {
    ...base,
    kind: "template",
    id: "4e_aire_perimetre_comprendre_tpl_unite",
    microId: "aire_perimetre_comprendre",
    difficulty: 1,
    hint: "Un périmètre est une longueur (cm, m) ; une aire se mesure en cm², m².",
    tags: ["aire_perimetre", "comprendre", "unite", "qcm", "template"],
    generate: compUnite,
  },
  {
    ...base,
    kind: "template",
    id: "4e_aire_perimetre_comprendre_tpl_echelle",
    microId: "aire_perimetre_comprendre",
    difficulty: 3,
    hint: "Le périmètre est une longueur : il est multiplié par le même nombre que les longueurs.",
    tags: ["aire_perimetre", "comprendre", "agrandissement", "template"],
    generate: compEchelle,
  },

  // =========================
  // PERIMETRE_RECTANGLE
  // =========================
  {
    kind: "fixed",
    id: "aire_perimetre_rectangle_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule le périmètre d’un rectangle de longueur 8 cm et de largeur 3 cm. Donne la réponse en cm.",
    format: "short",
    expected: ["22 cm"],
    comparator: "number_equal",
    hint: "P = 2 × (L + l).",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          ("Le périmètre d’un rectangle vaut 2 × (8 + 3) = 2 × 11 = 22.") +
          "\n\nConclusion : le périmètre vaut 22 cm.",
    tags: ["aire_perimetre", "rectangle"],
  },
  {
    ...base,
    kind: "template",
    id: "4e_aire_perimetre_rectangle_tpl_figure",
    microId: "aire_perimetre_rectangle",
    difficulty: 1,
    hint: "Deux longueurs et deux largeurs : $P = 2 \\times (L + l)$.",
    tags: ["aire_perimetre", "rectangle", "canvas", "template"],
    generate: () => rectFigure(false),
  },
  {
    kind: "template",
    id: "aire_perimetre_rectangle_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne deux longueurs et deux largeurs.",
    tags: ["aire_perimetre", "rectangle", "template"],
    generate: rectTexte,
  },
  {
    kind: "template",
    id: "aire_perimetre_rectangle_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "On fait le tour complet : c’est le périmètre.",
    tags: ["aire_perimetre", "rectangle", "probleme", "template"],
    generate: rectMateriau,
  },

  // =========================
  // PERIMETRE_CARRE
  // =========================
  {
    kind: "fixed",
    id: "aire_perimetre_carre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule le périmètre d’un carré de côté 6 cm. Donne la réponse en cm.",
    format: "short",
    expected: ["24 cm"],
    comparator: "number_equal",
    hint: "Un carré a 4 côtés égaux.",
    explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          ("P = 4 × 6 = 24.") +
          "\n\nConclusion : le périmètre vaut 24 cm.",
    tags: ["aire_perimetre", "carre"],
  },
  {
    kind: "template",
    id: "aire_perimetre_carre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplie la longueur d’un côté par 4.",
    tags: ["aire_perimetre", "carre", "canvas", "template"],
    generate: carreFigure,
  },
  {
    ...base,
    kind: "template",
    id: "4e_aire_perimetre_carre_tpl_materiau",
    microId: "aire_perimetre_carre",
    difficulty: 2,
    hint: "Le tour d’un carré : $4 \\times$ côté.",
    tags: ["aire_perimetre", "carre", "probleme", "template"],
    generate: carreMateriau,
  },

  // =========================
  // PERIMETRE_TRIANGLE
  // =========================
  {
    kind: "fixed",
    id: "aire_perimetre_triangle_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule le périmètre d’un triangle dont les côtés mesurent 5 cm, 7 cm et 8 cm. Donne la réponse en cm.",
    format: "short",
    expected: ["20 cm"],
    comparator: "number_equal",
    hint: "Additionne les 3 côtés.",
    explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          ("P = 5 + 7 + 8 = 20.") +
          "\n\nConclusion : le périmètre vaut 20 cm.",
    tags: ["aire_perimetre", "triangle"],
  },
  {
    kind: "template",
    id: "aire_perimetre_triangle_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les trois longueurs du triangle.",
    tags: ["aire_perimetre", "triangle", "canvas", "template"],
    generate: triFigure,
  },

  // =========================
  // PERIMETRE_FIGURE
  // =========================
  {
    kind: "template",
    id: "aire_perimetre_figure_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte uniquement le contour extérieur de la figure.",
    tags: ["aire_perimetre", "figure", "figure_libre", "template"],
    generate: () => questionGrille(2),
  },
  {
    kind: "template",
    id: "aire_perimetre_figure_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Le côté commun à deux figures accolées est à l’intérieur : il ne compte pas.",
    tags: ["aire_perimetre", "figure_composee", "template"],
    generate: composeToit,
  },
  {
    ...base,
    kind: "template",
    id: "4e_aire_perimetre_figure_tpl_demi_disque",
    microId: "aire_perimetre_figure",
    difficulty: 4,
    hint: "Un demi-cercle de diamètre $d$ mesure $\\pi \\times d \\div 2$.",
    tags: ["aire_perimetre", "figure_composee", "cercle", "pi", "template"],
    generate: composeDemiDisque,
  },

  // =========================
  // PERIMETRE_PROBLEME
  // =========================
  {
    kind: "template",
    id: "aire_perimetre_probleme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Un tour = un périmètre.",
    tags: ["aire_perimetre", "probleme", "template"],
    generate: probTours,
  },
  {
    kind: "template",
    id: "aire_perimetre_probleme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Le périmètre correspond à la somme de tous les côtés.",
    tags: ["aire_perimetre", "probleme", "triangle", "template"],
    generate: probTriangle,
  },

  // =========================
  // PERIMETRE_DEFIS
  // =========================
  {
    kind: "template",
    id: "aire_perimetre_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule les deux périmètres avant de comparer.",
    tags: ["aire_perimetre", "defi", "hpi", "template"],
    generate: defiCompare,
  },
  {
    kind: "template",
    id: "aire_perimetre_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Un rectangle a deux longueurs et deux largeurs : chaque ajout compte deux fois.",
    tags: ["aire_perimetre", "defi", "hpi", "template"],
    generate: defiAugmente,
  },
  {
    kind: "template",
    id: "aire_perimetre_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le contour rouge montre exactement ce qu’il faut compter.",
    tags: ["aire_perimetre", "defi", "figure_libre", "hpi", "template"],
    generate: () => questionGrille(5),
  },

  /* ===== COMPRENDRE (compléments) ===== */
  {
    kind: "fixed",
    id: "4e_aire_perimetre_comprendre_x1_unite",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité convient pour un périmètre ?",
    format: "qcm",
    choices: ["cm", "$\\text{cm}^2$", "$\\text{cm}^3$", "L"],
    expected: ["cm"],
    comparator: "mcq_exact",
    hint: "Un périmètre est une longueur.",
    explanation:
      "Définition : le périmètre est une longueur.\n\nMéthode : on choisit une unité de longueur.\n\nCalcul : le $\\text{cm}^2$ est une aire.\n\nConclusion : on l’exprime en cm.",
    tags: ["aire_perimetre", "comprendre", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_comprendre_x2_vsaire",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence entre périmètre et aire ?",
    format: "qcm",
    choices: [
      "le périmètre est le contour, l’aire est la surface",
      "ce sont deux mots pour la même chose",
      "le périmètre est la surface, l’aire est le contour",
      "le périmètre est un volume",
    ],
    expected: ["le périmètre est le contour, l’aire est la surface"],
    comparator: "mcq_exact",
    hint: "L’un fait le tour, l’autre remplit.",
    explanation:
      "Définition : le périmètre mesure le contour, l’aire mesure la surface.\n\nMéthode : on associe chaque mot à sa grandeur.\n\nCalcul : périmètre en cm, aire en $\\text{cm}^2$.\n\nConclusion : périmètre = contour, aire = surface.",
    tags: ["aire_perimetre", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_comprendre_x3_formrect",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule du périmètre d’un rectangle ?",
    format: "qcm",
    choices: ["$2 \\times (L + l)$", "$L \\times l$", "$L + l$", "$4 \\times L$"],
    expected: ["$2 \\times (L + l)$"],
    comparator: "mcq_exact",
    hint: "Deux longueurs et deux largeurs.",
    explanation:
      "Définition : le périmètre est la somme des côtés.\n\nMéthode : un rectangle a deux longueurs et deux largeurs.\n\nCalcul : $P = 2 \\times (L + l)$.\n\nConclusion : c’est $2 \\times (L + l)$.",
    tags: ["aire_perimetre", "comprendre", "formule", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_comprendre_x4_formcarre",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la formule du périmètre d’un carré de côté $c$ ?",
    format: "qcm",
    choices: ["$4 \\times c$", "$c \\times c$", "$2 \\times c$", "$c + 4$"],
    expected: ["$4 \\times c$"],
    comparator: "mcq_exact",
    hint: "Un carré a 4 côtés égaux.",
    explanation:
      "Définition : le périmètre est la somme des côtés.\n\nMéthode : un carré a 4 côtés égaux.\n\nCalcul : $P = 4 \\times c$.\n\nConclusion : c’est $4 \\times c$.",
    tags: ["aire_perimetre", "comprendre", "formule", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_comprendre_x5_doubler",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Si on double toutes les longueurs d’une figure, son périmètre est multiplié par…",
    format: "qcm",
    choices: ["$2$", "$4$", "$8$", "il ne change pas"],
    expected: ["$2$"],
    comparator: "mcq_exact",
    hint: "Le périmètre est une longueur (une dimension).",
    explanation:
      "Définition : le périmètre est une longueur.\n\nMéthode : doubler les longueurs multiplie le contour par $2$.\n\nCalcul : $P$ devient $2P$.\n\nConclusion : le périmètre est multiplié par $2$.",
    tags: ["aire_perimetre", "comprendre", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_comprendre_x6_tpl",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne tous les côtés.",
    tags: ["aire_perimetre", "comprendre", "template"],
    generate: compPolygone,
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_comprendre_x7_contour",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Pour calculer le périmètre d’un polygone, on…",
    format: "qcm",
    choices: [
      "additionne les longueurs de tous ses côtés",
      "multiplie les longueurs de tous ses côtés",
      "additionne les longueurs de deux côtés voisins",
      "additionne les longueurs de ses côtés puis divise",
    ],
    expected: ["additionne les longueurs de tous ses côtés"],
    comparator: "mcq_exact",
    hint: "Le tour complet.",
    explanation:
      "Définition : le périmètre est la longueur du contour.\n\nMéthode : on additionne tous les côtés.\n\nCalcul : on parcourt tout le contour.\n\nConclusion : on additionne les longueurs de tous les côtés.",
    tags: ["aire_perimetre", "comprendre", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_comprendre_x8_tpl",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Côtés tous égaux : on multiplie le côté par le nombre de côtés.",
    tags: ["aire_perimetre", "comprendre", "template"],
    generate: compRegulier,
  },

  /* ===== RECTANGLE (compléments) ===== */
  {
    kind: "template",
    id: "4e_aire_perimetre_rectangle_x1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "$P = 2 \\times (L + l)$.",
    tags: ["aire_perimetre", "rectangle", "template"],
    generate: rectObjet,
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_rectangle_x2_inverse",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 4,
    theme: "neutral",
    hint: "La moitié du périmètre vaut $L + l$.",
    tags: ["aire_perimetre", "rectangle", "inverse", "template"],
    generate: rectInverse,
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_rectangle_x3_qcm",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle a une longueur de $7$ cm et une largeur de $5$ cm. Quel est son périmètre (en cm) ?",
    format: "short",
    expected: ["24 cm"],
    comparator: "number_equal",
    hint: "$2 \\times (7 + 5)$.",
    explanation:
      "Définition : $P = 2 \\times (L + l)$.\n\nMéthode : on additionne puis on multiplie par $2$.\n\nCalcul : $2 \\times (7 + 5) = 2 \\times 12 = 24$.\n\nConclusion : le périmètre est $24$ cm.",
    tags: ["aire_perimetre", "rectangle", "short"],
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_rectangle_x4_cl-ture",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Convertis d’abord toutes les longueurs dans la même unité.",
    tags: ["aire_perimetre", "rectangle", "conversion", "probleme", "template"],
    generate: rectConversion,
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_rectangle_x5_carre_special",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle dont la longueur égale la largeur est en fait…",
    format: "qcm",
    choices: ["un carré", "un losange", "un triangle", "un cercle"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "Quatre côtés égaux.",
    explanation:
      "Définition : un carré est un rectangle à côtés égaux.\n\nMéthode : si $L = l$, les quatre côtés sont égaux.\n\nCalcul : c’est la définition du carré.\n\nConclusion : c’est un carré.",
    tags: ["aire_perimetre", "rectangle", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_rectangle_x6",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "$P = 2L + 2l$.",
    tags: ["aire_perimetre", "rectangle", "canvas", "template"],
    generate: () => rectFigure(true),
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_rectangle_x7_inverse2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 4,
    theme: "neutral",
    text: "Un rectangle a un périmètre de $30$ cm et une largeur de $6$ cm. Quelle est sa longueur (en cm) ?",
    format: "short",
    expected: ["9 cm"],
    comparator: "number_equal",
    hint: "$L = \\dfrac{30}{2} - 6$.",
    explanation:
      "Définition : $P = 2 \\times (L + l)$.\n\nMéthode : $L = \\dfrac{P}{2} - l$.\n\nCalcul : $\\dfrac{30}{2} - 6 = 15 - 6 = 9$.\n\nConclusion : la longueur est $9$ cm.",
    tags: ["aire_perimetre", "rectangle", "inverse", "short"],
  },

  /* ===== CARRE (compléments) ===== */
  {
    kind: "template",
    id: "4e_aire_perimetre_carre_x1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 1,
    theme: "neutral",
    hint: "$P = 4 \\times c$.",
    tags: ["aire_perimetre", "carre", "template"],
    generate: carreObjet,
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_carre_x2_inverse",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 3,
    theme: "neutral",
    hint: "côté $= \\dfrac{P}{4}$.",
    tags: ["aire_perimetre", "carre", "inverse", "template"],
    generate: carreInverse,
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_carre_x3",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 2,
    theme: "neutral",
    text: "Un carré a un côté de $9$ cm. Quel est son périmètre (en cm) ?",
    format: "short",
    expected: ["36 cm"],
    comparator: "number_equal",
    hint: "$4 \\times 9$.",
    explanation:
      "Définition : $P = 4 \\times c$.\n\nMéthode : on multiplie le côté par $4$.\n\nCalcul : $4 \\times 9 = 36$.\n\nConclusion : le périmètre est $36$ cm.",
    tags: ["aire_perimetre", "carre", "short"],
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_carre_x4_inverse",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 3,
    theme: "neutral",
    text: "Le périmètre d’un carré est $28$ cm. Quel est son côté (en cm) ?",
    format: "short",
    expected: ["7 cm"],
    comparator: "number_equal",
    hint: "$\\dfrac{28}{4}$.",
    explanation:
      "Définition : côté $= \\dfrac{P}{4}$.\n\nMéthode : on divise par $4$.\n\nCalcul : $\\dfrac{28}{4} = 7$.\n\nConclusion : le côté mesure $7$ cm.",
    tags: ["aire_perimetre", "carre", "inverse", "short"],
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_carre_x5_qcm",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 2,
    theme: "neutral",
    text: "Pour calculer le périmètre d’un carré, on multiplie le côté par…",
    format: "qcm",
    choices: ["$4$", "$2$", "le côté", "$\\pi$"],
    expected: ["$4$"],
    comparator: "mcq_exact",
    hint: "Un carré a 4 côtés.",
    explanation:
      "Définition : un carré a 4 côtés égaux.\n\nMéthode : on multiplie le côté par le nombre de côtés.\n\nCalcul : $P = 4 \\times c$.\n\nConclusion : on multiplie par $4$.",
    tags: ["aire_perimetre", "carre", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_carre_x6_probleme",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le tour d’un carré $= 4 \\times$ côté.",
    tags: ["aire_perimetre", "carre", "probleme", "template"],
    generate: carreProbleme,
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_carre_x7",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 4,
    theme: "neutral",
    hint: "côté $= \\dfrac{P}{4}$ ; attention aux unités.",
    tags: ["aire_perimetre", "carre", "inverse", "template"],
    generate: carreDefi,
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_carre_x8",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 1,
    theme: "neutral",
    text: "Un carré a un côté de $12$ cm. Quel est son périmètre (en cm) ?",
    format: "short",
    expected: ["48 cm"],
    comparator: "number_equal",
    hint: "$4 \\times 12$.",
    explanation:
      "Définition : $P = 4 \\times c$.\n\nMéthode : on multiplie par $4$.\n\nCalcul : $4 \\times 12 = 48$.\n\nConclusion : le périmètre est $48$ cm.",
    tags: ["aire_perimetre", "carre", "short"],
  },

  /* ===== TRIANGLE (compléments) ===== */
  {
    kind: "template",
    id: "4e_aire_perimetre_triangle_x1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_triangle",
    difficulty: 1,
    theme: "neutral",
    hint: "On additionne les trois côtés.",
    tags: ["aire_perimetre", "triangle", "template"],
    generate: triTexte,
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_triangle_x2_equilateral",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Triangle équilatéral : $3 \\times$ côté.",
    tags: ["aire_perimetre", "triangle", "equilateral", "template"],
    generate: triEquilateral,
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_triangle_x3_isocele",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_triangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Isocèle : deux côtés égaux + la base.",
    tags: ["aire_perimetre", "triangle", "isocele", "template"],
    generate: triIsoceleProbleme,
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_triangle_x4_qcm",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Pour calculer le périmètre d’un triangle, on…",
    format: "qcm",
    choices: ["additionne ses trois côtés", "multiplie ses côtés", "calcule base × hauteur ÷ 2", "compte ses angles"],
    expected: ["additionne ses trois côtés"],
    comparator: "mcq_exact",
    hint: "C’est le contour.",
    explanation:
      "Définition : le périmètre est la longueur du contour.\n\nMéthode : un triangle a trois côtés.\n\nCalcul : on les additionne.\n\nConclusion : on additionne les trois côtés.",
    tags: ["aire_perimetre", "triangle", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_triangle_x5_canvas",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Les codages montrent deux côtés égaux : le côté non écrit vaut l’autre.",
    tags: ["aire_perimetre", "triangle", "isocele", "canvas", "template"],
    generate: triIsoceleFigure,
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_triangle_x6_inverse",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_triangle",
    difficulty: 4,
    theme: "neutral",
    text: "Un triangle a un périmètre de $20$ cm. Deux de ses côtés mesurent $6$ cm et $7$ cm. Combien mesure le troisième (en cm) ?",
    format: "short",
    expected: ["7 cm"],
    comparator: "number_equal",
    hint: "$20 - 6 - 7$.",
    explanation:
      "Définition : le périmètre est la somme des trois côtés.\n\nMéthode : on retire les deux côtés connus au périmètre.\n\nCalcul : $20 - 6 - 7 = 7$.\n\nConclusion : le troisième côté mesure $7$ cm.",
    tags: ["aire_perimetre", "triangle", "inverse", "short"],
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_triangle_x7_equi_inverse",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_triangle",
    difficulty: 4,
    theme: "neutral",
    hint: "On part du périmètre et on retire (ou on partage) ce qu’on connaît.",
    tags: ["aire_perimetre", "triangle", "inverse", "template"],
    generate: triInverse,
  },

  /* ===== FIGURE (compléments) ===== */
  {
    kind: "template",
    id: "4e_aire_perimetre_figure_x1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte le contour extérieur, carreau par carreau.",
    tags: ["aire_perimetre", "figure", "figure_libre", "template"],
    generate: () => questionGrille(2),
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_figure_x2_L",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Les bords intérieurs ne comptent pas.",
    tags: ["aire_perimetre", "figure_composee", "figure_libre", "template"],
    generate: () => questionGrille(3),
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_figure_x3_compose",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure est formée d’un carré de côté $5$ cm et d’un rectangle accolé de $5$ cm sur $3$ cm. Le côté commun (collé) mesure $5$ cm. Quel est le périmètre extérieur (en cm) ?",
    format: "qcm",
    choices: ["$26$ cm", "$36$ cm", "$31$ cm", "$20$ cm"],
    expected: ["$26$ cm"],
    comparator: "mcq_exact",
    hint: "On ne compte pas le côté collé (deux fois).",
    explanation:
      "Définition : le périmètre est le contour extérieur.\n\nMéthode : on additionne les côtés du bord, sans le côté commun caché.\n\nCalcul : carré $4 \\times 5 = 20$, rectangle ajoute $3 + 5 + 3 = 11$, mais le côté collé ($5$) est retiré deux fois : $20 + 11 - 5 = 26$.\n\nConclusion : le périmètre est $26$ cm.",
    tags: ["aire_perimetre", "figure_composee", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_figure_x4",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 4,
    theme: "neutral",
    hint: "Suis le contour rouge.",
    tags: ["aire_perimetre", "figure_libre", "template"],
    generate: () => questionGrille(4),
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_figure_x5_qcm",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 2,
    theme: "neutral",
    text: "Pour le périmètre d’une figure composée, les côtés situés à l’intérieur (cachés)…",
    format: "qcm",
    choices: ["ne comptent pas", "comptent double", "comptent une fois", "remplacent l’aire"],
    expected: ["ne comptent pas"],
    comparator: "mcq_exact",
    hint: "Seul le contour extérieur compte.",
    explanation:
      "Définition : le périmètre ne compte que le contour extérieur.\n\nMéthode : on ignore les segments intérieurs.\n\nCalcul : seuls les bords visibles comptent.\n\nConclusion : les côtés intérieurs ne comptent pas.",
    tags: ["aire_perimetre", "figure", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_figure_x6",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne tous les côtés du contour extérieur.",
    tags: ["aire_perimetre", "figure_composee", "template"],
    generate: composeAccole,
  },

  /* ===== PROBLEME (compléments) ===== */
  {
    kind: "template",
    id: "4e_aire_perimetre_probleme_x1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Tour complet, puis on retire l’ouverture.",
    tags: ["aire_perimetre", "probleme", "template"],
    generate: probPortail,
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_probleme_x2_cout",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule le périmètre (en m), puis multiplie par le prix au mètre.",
    tags: ["aire_perimetre", "probleme", "cout", "template"],
    generate: probCout,
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_probleme_x3",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "On veut faire $2$ tours d’une piste rectangulaire de $30$ m sur $20$ m. Quelle distance parcourt-on (en m) ?",
    format: "short",
    expected: ["200 m"],
    comparator: "number_equal",
    hint: "Un tour = périmètre ; puis $\\times 2$.",
    explanation:
      "Définition : un tour correspond au périmètre.\n\nMéthode : périmètre $= 2 \\times (30 + 20) = 100$ m, puis $\\times 2$.\n\nCalcul : $100 \\times 2 = 200$.\n\nConclusion : on parcourt $200$ m.",
    tags: ["aire_perimetre", "probleme", "short"],
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_probleme_x4_inverse",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Longueur d’un cercle : $\\pi \\times d$, ou $2 \\times \\pi \\times r$.",
    tags: ["aire_perimetre", "probleme", "cercle", "pi", "template"],
    generate: probCercle,
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_probleme_x5_qcm",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Pour savoir combien de plinthes acheter pour le tour d’une pièce, on calcule…",
    format: "qcm",
    choices: ["le périmètre de la pièce", "l’aire de la pièce", "le volume de la pièce", "la diagonale"],
    expected: ["le périmètre de la pièce"],
    comparator: "mcq_exact",
    hint: "Les plinthes suivent le bord.",
    explanation:
      "Définition : les plinthes suivent le contour.\n\nMéthode : on calcule le périmètre.\n\nCalcul : c’est la longueur du tour de la pièce.\n\nConclusion : on calcule le périmètre.",
    tags: ["aire_perimetre", "probleme", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_probleme_x6",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par le périmètre, puis réponds à la vraie question.",
    tags: ["aire_perimetre", "probleme", "template"],
    generate: probRouleaux,
  },

  /* ===== DEFI (compléments) ===== */
  {
    kind: "fixed",
    id: "4e_aire_perimetre_defi_x1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux rectangles ont le même périmètre de $20$ cm. Ont-ils forcément la même aire ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "$1 \\times 9$ et $4 \\times 6$ ont le même périmètre.",
    explanation:
      "Définition : périmètre et aire sont indépendants.\n\nMéthode : on cherche un contre-exemple à périmètre $20$.\n\nCalcul : $1 \\times 9$ (aire $9$) et $4 \\times 6$ (aire $24$) ont tous deux un périmètre de $20$.\n\nConclusion : non, pas forcément la même aire.",
    tags: ["aire_perimetre", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_defi_x2_litteral",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris le périmètre avec la lettre, puis remplace (ou résous).",
    tags: ["aire_perimetre", "defi", "litteral", "template"],
    generate: defiLitteral,
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_defi_x3_cercle",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "La longueur (périmètre) d’un cercle de rayon $r$ est…",
    format: "qcm",
    choices: ["$2\\pi r$", "$\\pi r^2$", "$\\pi r$", "$4r$"],
    expected: ["$2\\pi r$"],
    comparator: "mcq_exact",
    hint: "$\\pi r^2$ est l’aire du disque.",
    explanation:
      "Définition : la longueur d’un cercle est $2\\pi r$.\n\nMéthode : on distingue longueur ($2\\pi r$) et aire ($\\pi r^2$).\n\nCalcul : longueur $= 2\\pi r$.\n\nConclusion : c’est $2\\pi r$.",
    tags: ["aire_perimetre", "defi", "cercle", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_defi_x4_augmentation",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Longueur d’un cercle : $2\\pi r$ ; regarde ce que devient ce nombre quand $r$ change.",
    tags: ["aire_perimetre", "defi", "cercle", "pi", "template"],
    generate: defiCorde,
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_defi_carre_vs_rectangle",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un carré de côté 5 cm et un rectangle de 7 cm sur 3 cm ont-ils le même périmètre ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Calcule les deux périmètres.",
    explanation:
      "Définition : le périmètre est la longueur du contour.\n\n" +
      "Méthode : carré $P = 4 \\times 5$ ; rectangle $P = 2 \\times (7 + 3)$.\n\n" +
      "Calcul : $4 \\times 5 = 20$ et $2 \\times 10 = 20$.\n\n" +
      "Conclusion : oui, les deux périmètres valent 20 cm.",
    tags: ["aire_perimetre", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "4e_aire_perimetre_defi_perimetre_egal",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Même périmètre = même longueur de contour : calcule-la, puis partage-la.",
    tags: ["aire_perimetre", "defi", "template"],
    generate: defiEgal,
  },
  {
    kind: "fixed",
    id: "4e_aire_perimetre_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    // ⛔ 08/10/2026 : c'était une question ouverte validée par le seul mot « périmètre » ; QCM sur les mêmes pièges.
    text: "Un carré de 5 cm de côté et un rectangle de 7 cm sur 3 cm ont tous deux un périmètre de 20 cm. Pourquoi deux figures de formes différentes peuvent-elles avoir le même périmètre ?",
    format: "qcm",
    choices: [
      "le périmètre ne mesure que la longueur du contour, qu’on peut répartir de bien des façons",
      "c’est impossible : deux formes différentes ont toujours des périmètres différents",
      "parce qu’elles ont aussi la même aire",
      "parce qu’elles ont le même nombre de côtés",
    ],
    expected: ["le périmètre ne mesure que la longueur du contour, qu’on peut répartir de bien des façons"],
    comparator: "mcq_exact",
    hint: "Le périmètre mesure le contour, pas la forme.",
    explanation:
      "Définition : le périmètre est la longueur totale du contour.\n\n" +
      "Méthode : on peut répartir cette longueur de bien des façons.\n\n" +
      "Calcul : un carré 5×5 et un rectangle 7×3 ont tous deux un périmètre de 20 cm.\n\n" +
      "Conclusion : un même périmètre peut correspondre à des formes différentes.",
    tags: ["aire_perimetre", "defi", "open"],
  },
];

/** Chaque question chiffrée dit son unité (voir `avecUnite`). */
export const perimetresBank: TutorBankItemV4[] = ITEMS.map((it) =>
  it.kind === "template" ? { ...it, generate: () => avecUnite(it.generate()) } : it
);
