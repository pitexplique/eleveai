// lib/tutor-v4/question-banks/maths/5e/aires.bank.ts

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";
import { PRENOMS, de, pick, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Ajouté le 04/08/2026 après un test qui tirait chaque générateur soixante
// fois : deux gabarits d'aire proposaient deux fois la même valeur, et un
// troisième perdait la bonne réponse au découpage — la question devenait
// impossible sans que rien ne le signale. On met la bonne réponse de côté,
// on tire trois distracteurs distincts, puis on mélange l'ensemble.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function formatNumber(n: number) {
  return Number.isInteger(n) ? String(n) : String(n).replace(".", ",");
}

function rectangleCells(rows: number, cols: number): [number, number][] {
  const cells: [number, number][] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cells.push([row, col]);
    }
  }

  return cells;
}

function lShapeCells(args: {
  rows: number;
  cols: number;
  cutRows: number;
  cutCols: number;
}): [number, number][] {
  const { rows, cols, cutRows, cutCols } = args;
  const cells: [number, number][] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isCut = row < cutRows && col >= cols - cutCols;
      if (!isCut) cells.push([row, col]);
    }
  }

  return cells;
}

function triangleAireCanvas(baseLabel?: string): CanvasFigure {
  return {
    kind: "triangle",
    size: { width: 280, height: 240 },
    points: {
      A: { x: 40, y: 190 },
      B: { x: 230, y: 190 },
      C: { x: 135, y: 55 },
    },
    labels: { A: "A", B: "B", C: "C" },
    sideLabels: baseLabel ? { AB: baseLabel } : undefined,
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
    },
  };
}

function triangleRectangleAireCanvas(
  baseLabel?: string,
  hauteurLabel?: string
): CanvasFigure {
  return {
    kind: "triangle",
    size: { width: 280, height: 240 },
    points: {
      A: { x: 55, y: 190 },
      B: { x: 230, y: 190 },
      C: { x: 55, y: 55 },
    },
    labels: { A: "A", B: "B", C: "C" },
    sideLabels: {
      ...(baseLabel ? { AB: baseLabel } : {}),
      ...(hauteurLabel ? { CA: hauteurLabel } : {}),
    },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
    },
    marks: {
      rightAngleAt: "A",
    },
  };
}

// 13/10/2026 : la hauteur était écrite sur le côté oblique [AD] ; elle est
// maintenant TRACÉE (perpendiculaire à [AB], depuis D) et porte son étiquette.
function parallelogrammeAireCanvas(baseLabel?: string, hauteurLabel?: string) {
  return {
    kind: "quadrilatere",
    size: { width: 300, height: 240 },
    points: {
      A: { x: 45, y: 185 },
      B: { x: 220, y: 185 },
      C: { x: 255, y: 65 },
      D: { x: 80, y: 65 },
    },
    labels: { A: "A", B: "B", C: "C", D: "D" },
    sideLabels: {
      ...(baseLabel ? { AB: baseLabel } : {}),
    },
    ...(hauteurLabel ? { height: { fromVertex: "D", onSide: "AB", label: hauteurLabel } } : {}),
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
      showDiagonals: false,
    },
    marks: {
      parallelSides: [
        ["AB", "CD"],
        ["AD", "BC"],
      ],
    },
  } as any;
}

function rectangleAireCanvas(
  longueurLabel?: string,
  largeurLabel?: string
): CanvasFigure {
  return {
    kind: "quadrilatere",
    size: { width: 300, height: 220 },
    points: {
      A: { x: 55, y: 170 },
      B: { x: 245, y: 170 },
      C: { x: 245, y: 55 },
      D: { x: 55, y: 55 },
    },
    labels: { A: "A", B: "B", C: "C", D: "D" },
    sideLabels: {
      ...(longueurLabel ? { AB: longueurLabel } : {}),
      ...(largeurLabel ? { BC: largeurLabel } : {}),
    },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
      showDiagonals: false,
    },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      parallelSides: [
        ["AB", "CD"],
        ["AD", "BC"],
      ],
    },
  };
}

function figureLibreAireCanvas(args: {
  rows: number;
  cols: number;
  filledCells: [number, number][];
  showPerimeter?: boolean;
}): CanvasFigure {
  return {
    kind: "figure_libre",
    grid: {
      rows: args.rows,
      cols: args.cols,
      filledCells: args.filledCells,
    },
    display: {
      showGrid: true,
      showFilled: true,
      showCellLabels: true,
      showPerimeter: args.showPerimeter ?? true,
    },
  };
}

function figureLibreAireComposeeCanvas(
  filledCells: [number, number][]
): CanvasFigure {
  return figureLibreAireCanvas({
    rows: Math.max(...filledCells.map(([row]) => row)) + 1,
    cols: Math.max(...filledCells.map(([, col]) => col)) + 1,
    filledCells,
    showPerimeter: true,
  });
}

/* ⭐ 13/10/2026 — LA VARIÉTÉ ET LES FIGURES À LEURS MESURES.
   Mesuré le 13/10 : 8 à 12 squelettes par micro, jusqu'à 18 répétitions sur
   20 (« Un triangle a une base de # cm et une hauteur de # cm » revenait à
   l'identique ; les figures étaient toujours les mêmes, la hauteur du
   parallélogramme écrite sur le côté oblique). Chaque gabarit compose une
   SITUATION (fanion, voile, pignon, potager…) × une TOURNURE × un PRÉNOM × des
   NOMS de sommets tirés ; triangles et parallélogrammes sont DESSINÉS à leurs
   mesures, la hauteur tracée ; les quadrillages sont tirés (polyominos). Les
   réponses portent leur unité (« 24 cm² »). Le correcteur
   (correcteurs/aires.ts) relit le texte ET la figure. */

const rnd = randomInt;
/** 3 538 ; 12,5 — virgule française, espace des milliers. */
const fr = (x: number) => {
  const [e, d] = String(Math.round(x * 100) / 100).split(".");
  return e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? `,${d}` : "");
};
const Maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Trois ou quatre lettres qui se suivent (EFG, MNPQ…). */
function sommets(n: 3 | 4): string[] {
  const A = "ABCDEFGHIJKLMNPRSTUV".split("");
  const i = rnd(0, A.length - n);
  return A.slice(i, i + n);
}

/** Un objet de la vie courante : « un fanion », « la voile », « l’équerre ». */
type Objet = { nom: string; f?: boolean; u: "cm" | "m"; min: number; max: number };
const voy = (s: string) => /^[aeiouéèêh]/i.test(s);
const un = (o: Objet) => `${o.f ? "une" : "un"} ${o.nom}`;
const le = (o: Objet) => (voy(o.nom) ? `l’${o.nom}` : `${o.f ? "la" : "le"} ${o.nom}`);

/** Une mesure dans [min ; max], entière ou au demi près. */
const mesure = (o: Objet, demi = true) => (demi && Math.random() < 0.3 ? rnd(2 * o.min, 2 * o.max) / 2 : rnd(o.min, o.max));

const OBJ_TRIANGLE: Objet[] = [
  { nom: "fanion", u: "cm", min: 8, max: 30 },
  { nom: "voile de bateau", f: true, u: "m", min: 2, max: 9 },
  { nom: "pignon de la maison", u: "m", min: 3, max: 10 },
  { nom: "foulard plié en deux", u: "cm", min: 30, max: 90 },
  { nom: "parcelle de jardin", f: true, u: "m", min: 5, max: 25 },
  { nom: "panneau « attention »", u: "cm", min: 40, max: 90 },
  { nom: "pièce de puzzle", f: true, u: "cm", min: 3, max: 9 },
  { nom: "sandwich coupé en triangle", u: "cm", min: 7, max: 14 },
  { nom: "façade de la tente", f: true, u: "m", min: 1, max: 3 },
  { nom: "morceau de tissu", u: "cm", min: 10, max: 60 },
  { nom: "triangle de signalisation", u: "cm", min: 30, max: 50 },
  { nom: "part de tarte vue de dessus", f: true, u: "cm", min: 6, max: 15 },
];
const OBJ_PARA: Objet[] = [
  { nom: "carreau de mosaïque", u: "cm", min: 4, max: 15 },
  { nom: "parcelle de terrain", f: true, u: "m", min: 8, max: 40 },
  { nom: "pièce de tangram", f: true, u: "cm", min: 3, max: 10 },
  { nom: "étiquette penchée", f: true, u: "cm", min: 4, max: 12 },
  { nom: "pan de toit", u: "m", min: 3, max: 12 },
  { nom: "panneau de bois", u: "cm", min: 20, max: 80 },
  { nom: "bande de pelouse", f: true, u: "m", min: 4, max: 20 },
  { nom: "dalle de la terrasse", f: true, u: "cm", min: 20, max: 60 },
  { nom: "morceau de carton", u: "cm", min: 8, max: 30 },
  { nom: "vitrail", u: "cm", min: 10, max: 40 },
  { nom: "tapis de l’entrée", u: "cm", min: 40, max: 120 },
];
const OBJ_RECT: Objet[] = [
  { nom: "tapis", u: "cm", min: 40, max: 150 },
  { nom: "potager", u: "m", min: 2, max: 15 },
  { nom: "affiche", f: true, u: "cm", min: 20, max: 80 },
  { nom: "nappe", f: true, u: "cm", min: 60, max: 180 },
  { nom: "terrasse", f: true, u: "m", min: 2, max: 9 },
  { nom: "cahier", u: "cm", min: 17, max: 30 },
  { nom: "chambre", f: true, u: "m", min: 2, max: 6 },
  { nom: "plaque de chocolat", f: true, u: "cm", min: 8, max: 20 },
  { nom: "terrain de basket", u: "m", min: 14, max: 28 },
  { nom: "photo", f: true, u: "cm", min: 9, max: 30 },
  { nom: "panneau solaire", u: "m", min: 1, max: 3 },
  { nom: "bac à sable", u: "m", min: 1, max: 4 },
];

/** Le triangle DESSINÉ à ses mesures : [AB] horizontale (b), sommet C à la hauteur h, pied à la fraction t de [AB]. */
function triangleMesure(
  b: number,
  h: number,
  o: { noms: string[]; base?: string; haut?: string; t?: number; droit?: boolean; cote?: string },
): CanvasFigure {
  const t = o.droit ? 0 : (o.t ?? rnd(20, 80) / 100);
  const xmin = Math.min(0, t * b), xmax = Math.max(b, t * b);
  const s = Math.min(210 / (xmax - xmin), 140 / h);
  const x0 = 35 - xmin * s, y0 = 195;
  return {
    kind: "triangle",
    size: { width: 290, height: 240 },
    points: { A: { x: x0, y: y0 }, B: { x: x0 + b * s, y: y0 }, C: { x: x0 + t * b * s, y: y0 - h * s } },
    labels: { A: o.noms[0], B: o.noms[1], C: o.noms[2] },
    sideLabels: { ...(o.base ? { AB: o.base } : {}), ...(o.droit && o.haut ? { CA: o.haut } : {}), ...(o.cote ? { BC: o.cote } : {}) },
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
    ...(o.droit ? { marks: { rightAngleAt: "A" as const } } : o.haut ? { height: { fromVertex: "C" as const, label: o.haut } } : {}),
  } as CanvasFigure;
}

/** Le parallélogramme DESSINÉ à ses mesures : base [AB] = b, hauteur h issue de D, décalage d (côté [AD] = √(d² + h²)). */
function paraMesure(b: number, h: number, o: { noms: string[]; base?: string; haut?: string; d?: number; cote?: string }): CanvasFigure {
  const d = o.d ?? (b * rnd(15, 45)) / 100;
  const s = Math.min(230 / (b + d), 140 / h);
  const x0 = 30, y0 = 190;
  return {
    kind: "quadrilatere",
    size: { width: 300, height: 240 },
    points: {
      A: { x: x0, y: y0 },
      B: { x: x0 + b * s, y: y0 },
      C: { x: x0 + (b + d) * s, y: y0 - h * s },
      D: { x: x0 + d * s, y: y0 - h * s },
    },
    labels: { A: o.noms[0], B: o.noms[1], C: o.noms[2], D: o.noms[3] },
    sideLabels: { ...(o.base ? { AB: o.base } : {}), ...(o.cote ? { DA: o.cote } : {}) },
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: false, showDiagonals: false },
    marks: { parallelSides: [["AB", "CD"], ["DA", "BC"]] },
    ...(o.haut ? { height: { fromVertex: "D" as const, onSide: "AB" as const, label: o.haut } } : {}),
  } as CanvasFigure;
}

/** Un polyomino de n cases (connexe), tiré dans une grille rows × cols. */
function polyomino(n: number, rows: number, cols: number): [number, number][] {
  for (;;) {
    const cells: [number, number][] = [[rnd(0, rows - 1), rnd(0, cols - 1)]];
    const cle = (c: [number, number]) => `${c[0]};${c[1]}`;
    const vus = new Set(cells.map(cle));
    let essais = 0;
    while (cells.length < n && essais++ < 500) {
      const [r, c] = pick(cells);
      const [dr, dc] = pick([[1, 0], [-1, 0], [0, 1], [0, -1]] as const);
      const v: [number, number] = [r + dr, c + dc];
      if (v[0] < 0 || v[1] < 0 || v[0] >= rows || v[1] >= cols || vus.has(cle(v))) continue;
      cells.push(v);
      vus.add(cle(v));
    }
    if (cells.length !== n) continue;
    // Recadrer en haut à gauche ; refuser un simple rectangle plein.
    const r0 = Math.min(...cells.map((c) => c[0])), c0 = Math.min(...cells.map((c) => c[1]));
    const out = cells.map(([r, c]) => [r - r0, c - c0] as [number, number]);
    const R = Math.max(...out.map((c) => c[0])) + 1, C = Math.max(...out.map((c) => c[1])) + 1;
    if (R * C !== n) return out;
  }
}

/** Les cases d'une figure en L : un rectangle l1 × h1 en bas, un rectangle l2 × h2 posé dessus, à gauche. */
function casesL(l1: number, h1: number, l2: number, h2: number): [number, number][] {
  const cells: [number, number][] = [];
  for (let r = 0; r < h2; r++) for (let c = 0; c < l2; c++) cells.push([r, c]);
  for (let r = h2; r < h2 + h1; r++) for (let c = 0; c < l1; c++) cells.push([r, c]);
  return cells;
}

/** Des surfaces couvertes de carrés unités : le texte dit l'aire d'un carré (1 cm², 1 dm², 1 m²). */
const CTX_CASES: { u: "cm" | "dm" | "m"; dire: (p: Prenom) => string }[] = [
  { u: "dm", dire: (p) => `${p.nom} pose sur un mur des carreaux carrés de 1 dm².` },
  { u: "m", dire: (p) => `Dans la cour, ${p.nom} colorie à la craie des dalles carrées de 1 m².` },
  { u: "cm", dire: (p) => `Sur son cahier, ${p.nom} colorie des carreaux de 1 cm².` },
  { u: "cm", dire: (p) => `${p.nom} décore une boîte avec des gommettes carrées de 1 cm².` },
  { u: "cm", dire: (p) => `Pour une mosaïque, ${p.nom} colle des petits carrés de 1 cm².` },
  { u: "m", dire: (p) => `${p.nom} pose des dalles de moquette de 1 m² dans une salle.` },
  { u: "m", dire: (p) => `Le jardin ${de(p.nom)} est partagé en carrés de 1 m² ; les carrés colorés sont plantés.` },
  { u: "dm", dire: (p) => `Pour un patchwork, ${p.nom} assemble des carrés de tissu de 1 dm².` },
  { u: "cm", dire: (p) => `${p.nom} dessine un personnage de jeu vidéo avec des pixels carrés de 1 cm².` },
  { u: "dm", dire: (p) => `${p.nom} recouvre une table avec des plaques de liège carrées de 1 dm².` },
  { u: "m", dire: (p) => `Sur la plage, ${p.nom} trace un château avec des carrés de 1 m².` },
];
const Q_CASES = [
  "Quelle est l’aire de la partie colorée ?",
  "Quelle est l’aire de la figure colorée ?",
  "Combien mesure l’aire colorée ?",
  "Calcule l’aire de la surface colorée.",
];

/** Un triangle de la vie courante, ses sommets nommés, ses mesures (pas deux demis : l'aire garde 2 décimales). */
function triSituation(demi = true) {
  const p = pick(PRENOMS);
  const o = pick(OBJ_TRIANGLE);
  const N = sommets(3);
  const b = mesure(o, demi);
  const h = Number.isInteger(b) ? mesure(o, demi) : rnd(o.min, o.max);
  const intro = pick([
    `${p.nom} découpe ${un(o)} : c’est le triangle ${N.join("")}.`,
    `${Maj(le(o))} ${de(p.nom)} a la forme du triangle ${N.join("")}.`,
    `Pour un exposé, ${p.nom} dessine ${le(o)} : le triangle ${N.join("")}.`,
    `${p.nom} mesure ${le(o)}, qui a la forme du triangle ${N.join("")}.`,
    `${p.nom} observe ${le(o)}, un triangle ${N.join("")}.`,
  ]);
  return { p, o, N, b, h, u: o.u, intro };
}
/** « La base [AB] mesure 8 cm et la hauteur issue de C mesure 5 cm. » (ordre et tournure tirés) */
function baseHauteur(N: string[], b: string, h: string, u: string) {
  return pick([
    `La base [${N[0]}${N[1]}] mesure ${b} ${u} et la hauteur issue de ${N[2]} mesure ${h} ${u}.`,
    `Sa base [${N[0]}${N[1]}] mesure ${b} ${u} ; la hauteur relative à cette base mesure ${h} ${u}.`,
    `La hauteur issue de ${N[2]} mesure ${h} ${u} et la base [${N[0]}${N[1]}] mesure ${b} ${u}.`,
  ]);
}
/** Un parallélogramme de la vie courante, ses sommets nommés, ses mesures. */
function paraSituation(demi = true) {
  const p = pick(PRENOMS);
  const o = pick(OBJ_PARA);
  const N = sommets(4);
  const nom = `parallélogramme ${N.join("")}`;
  const b = mesure(o, demi);
  const h = Math.min(mesure(o, demi), Math.max(o.min, Math.round(b * 1.2)));
  const intro = pick([
    `${p.nom} découpe ${un(o)} : c’est le ${nom}.`,
    `${Maj(le(o))} ${de(p.nom)} a la forme du ${nom}.`,
    `Pour un exposé, ${p.nom} dessine ${le(o)} : le ${nom}.`,
    `${p.nom} observe ${le(o)}, un ${nom}.`,
    `${p.nom} mesure ${le(o)}, qui a la forme du ${nom}.`,
  ]);
  return { p, o, N, nom, b, h, u: o.u, intro };
}
/** « La base [AB] mesure 8 cm et la hauteur issue de D mesure 5 cm. » pour le parallélogramme ABCD. */
function baseHauteurPara(N: string[], b: string, h: string, u: string) {
  return pick([
    `La base [${N[0]}${N[1]}] mesure ${b} ${u} et la hauteur issue de ${N[3]} mesure ${h} ${u}.`,
    `Sa base [${N[0]}${N[1]}] mesure ${b} ${u} ; la hauteur relative à cette base mesure ${h} ${u}.`,
    `La hauteur issue de ${N[3]} mesure ${h} ${u} et la base [${N[0]}${N[1]}] mesure ${b} ${u}.`,
  ]);
}

const Q_AIRE = (nom: string) =>
  pick(["Quelle est son aire ?", `Calcule l’aire du ${nom}.`, `Combien mesure l’aire du ${nom} ?`, `Quelle est l’aire du ${nom} ?`]);

export const airesBank: TutorBankItemV4[] = [
  /* =========================
     AIRE_COMPRENDRE
  ========================= */

  {
    kind: "fixed",
    id: "5e_aire_comprendre_fixed_1_definition",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "L’aire d’une figure mesure...",
    format: "qcm",
    choices: [
      "la surface occupée par la figure",
      "la longueur du contour",
      "le nombre de sommets",
      "la hauteur de la figure seulement",
    ],
    expected: ["la surface occupée par la figure"],
    comparator: "mcq_exact",
    hint: "L’aire concerne l’intérieur de la figure.",
    explanation:
      "Définition : l’aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on distingue l’intérieur de la figure et son contour.\n\n" +
      "Observation : le contour correspond au périmètre, l’intérieur correspond à l’aire.\n\n" +
      "Conclusion : l’aire mesure la surface occupée par la figure.",
    tags: ["aire_surface", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_aire_comprendre_fixed_2_perimetre_piege",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Un élève dit : “L’aire, c’est la longueur du tour de la figure.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La longueur du tour, c’est le périmètre.",
    explanation:
      "Définition : l’aire mesure une surface, alors que le périmètre mesure une longueur.\n\n" +
      "Méthode : on identifie si l’on parle de l’intérieur ou du contour.\n\n" +
      "Observation : la longueur du tour correspond au périmètre.\n\n" +
      "Conclusion : l’élève a tort, l’aire n’est pas la longueur du tour.",
    tags: ["aire_surface", "perimetre", "piege", "qcm"],
  },

  {
    kind: "template",
    id: "5e_aire_comprendre_tpl_1_compter_cases",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Chaque case remplie vaut 1 unité d’aire.",
    tags: ["aire_surface", "comptage", "figure_libre", "canvas", "template"],
    // 13/10 : situation × tournure × prénom ; le carré unité (cm², dm², m²) change.
    generate: () => {
      const p = pick(PRENOMS);
      const ctx = pick(CTX_CASES);
      const rows = rnd(2, 5);
      const cols = rnd(2, 7);
      const aire = rows * cols;
      return {
        text: `${ctx.dire(p)} ${pick(Q_CASES)}`,
        format: "short",
        expected: [`${aire} ${ctx.u}²`],
        comparator: "number_equal",
        explanation:
          "Définition : une aire peut se mesurer en comptant des carrés unités.\n\n" +
          "Méthode : on compte les carrés colorés.\n\n" +
          `Calcul : ${rows} rangées de ${cols} carrés : ${rows} × ${cols} = ${aire} carrés de 1 ${ctx.u}².\n\n` +
          `Conclusion : l’aire est ${aire} ${ctx.u}².`,
        canvas: figureLibreAireCanvas({ rows, cols, filledCells: rectangleCells(rows, cols), showPerimeter: false }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_aire_comprendre_tpl_2_rectangle_grille",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les cases colorées ou fais lignes × colonnes.",
    tags: ["aire_surface", "rectangle", "comptage", "canvas", "template"],
    // 13/10 : des rangées de carrés dans la vie courante, dites en phrase.
    generate: () => {
      const p = pick(PRENOMS);
      const rows = rnd(2, 7);
      const cols = rnd(3, 9);
      const aire = rows * cols;
      const [quoi, u] = pick([
        [`La tablette de chocolat ${de(p.nom)} a ${rows} rangées de ${cols} carrés de 1 cm².`, "cm"],
        [`Le mur de la salle de bains ${de(p.nom)} a ${rows} rangées de ${cols} carreaux de 1 dm².`, "dm"],
        [`${p.nom} plante un potager de ${rows} rangées de ${cols} carrés de 1 m².`, "m"],
        [`${p.nom} colle ${rows} rangées de ${cols} timbres carrés de 1 cm² sur une page.`, "cm"],
        [`Le parquet de la salle de danse a ${rows} rangées de ${cols} dalles carrées de 1 m². ${p.nom} y danse.`, "m"],
        [`Sur une feuille, ${p.nom} colorie ${rows} rangées de ${cols} carreaux de 1 cm².`, "cm"],
        [`Le damier ${de(p.nom)} a ${rows} rangées de ${cols} cases carrées de 1 dm².`, "dm"],
        [`${p.nom} range des boîtes vues de dessus : ${rows} rangées de ${cols} carrés de 1 dm².`, "dm"],
      ] as const);
      const question = pick([
        "Quelle est l’aire totale ?",
        "Quelle aire l’ensemble recouvre-t-il ?",
        "Calcule l’aire de ce rectangle.",
        "Combien mesure l’aire de l’ensemble ?",
      ]);
      return {
        text: `${quoi} ${question}`,
        format: "short",
        expected: [`${aire} ${u}²`],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire correspond au nombre de carrés unités nécessaires pour recouvrir la figure.\n\n" +
          "Méthode : pour un rectangle, on multiplie le nombre de rangées par le nombre de carrés d’une rangée.\n\n" +
          `Calcul : ${rows} × ${cols} = ${aire}.\n\n` +
          `Conclusion : l’aire est ${aire} ${u}².`,
        canvas: figureLibreAireCanvas({ rows, cols, filledCells: rectangleCells(rows, cols), showPerimeter: false }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_aire_comprendre_tpl_3_figure_non_rectangle",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte uniquement les cases colorées.",
    tags: ["aire_surface", "figure_composee", "comptage", "canvas", "template"],
    // 13/10 : la figure est TIRÉE (polyomino de 5 à 14 carrés), dans une situation.
    generate: () => {
      const p = pick(PRENOMS);
      const ctx = pick(CTX_CASES);
      const n = rnd(5, 14);
      const cells = polyomino(n, 4, 6);
      return {
        text: `${ctx.dire(p)} ${pick(Q_CASES)}`,
        format: "short",
        expected: [`${n} ${ctx.u}²`],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire correspond à la surface occupée par la figure.\n\n" +
          "Méthode : on compte les carrés colorés, un par un, sans en oublier.\n\n" +
          `Calcul : la figure contient ${n} carrés de 1 ${ctx.u}².\n\n` +
          `Conclusion : l’aire est ${n} ${ctx.u}².`,
        canvas: figureLibreAireComposeeCanvas(cells),
      };
    },
  },

  {
    kind: "template",
    id: "5e_aire_comprendre_tpl_4_unite_aire",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "L’aire s’exprime avec une unité au carré.",
    tags: ["aire_surface", "unite", "qcm", "template"],
    // 13/10 : un objet, l'unité de ses longueurs, et l'unité de son aire.
    generate: () => {
      const p = pick(PRENOMS);
      // « de l'objet » déjà accordé : d’un, de sa, du.
      const [deObjet, u, mot] = pick([
        ["d’un timbre", "mm", "millimètres"],
        ["d’une puce de téléphone", "mm", "millimètres"],
        ["d’une photo", "cm", "centimètres"],
        ["de son cahier", "cm", "centimètres"],
        ["d’une carte à jouer", "cm", "centimètres"],
        ["d’un carreau de faïence", "dm", "décimètres"],
        ["du plateau d’une table", "dm", "décimètres"],
        ["de sa chambre", "m", "mètres"],
        ["du terrain de handball", "m", "mètres"],
        ["d’un jardin", "m", "mètres"],
        ["d’une forêt", "km", "kilomètres"],
        ["d’un lac", "km", "kilomètres"],
        ["d’une île", "km", "kilomètres"],
      ] as const);
      const good = `${u}²`;
      const question = pick([
        `${p.nom} mesure les côtés ${deObjet} en ${mot}. En quelle unité l’aire s’exprime-t-elle ?`,
        `Les longueurs ${deObjet} sont en ${mot}. ${p.nom} calcule l’aire : dans quelle unité ?`,
        `${p.nom} calcule l’aire ${deObjet} à partir de longueurs en ${mot}. Quelle unité écrit-${p.f ? "elle" : "il"} ?`,
      ]);
      return {
        text: question,
        format: "qcm",
        choices: shuffle([good, u, `${u}³`, "°"]),
        expected: [good],
        comparator: "mcq_exact",
        explanation:
          "Définition : une aire s’exprime avec une unité de surface.\n\n" +
          "Méthode : une unité de surface est une unité de longueur au carré.\n\n" +
          `Observation : avec des longueurs en ${mot} (${u}), l’aire s’exprime en ${u}² ; le ${u}³ sert aux volumes.\n\n` +
          `Conclusion : la bonne unité est ${good}.`,
      };
    },
  },

  // 13/10/2026 : l'étoile 3 n'avait que deux questions figées.
  {
    kind: "template",
    id: "5e_aire_comprendre_tpl_5_aire_ou_perimetre",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le périmètre est le tour (en cm) ; l’aire est la surface (en cm²).",
    tags: ["aire_surface", "perimetre", "qcm", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      const o = pick(OBJ_RECT);
      let L = 0, l = 0;
      do {
        L = rnd(Math.max(2, o.min), o.max);
        l = rnd(Math.max(1, Math.floor(o.min / 2)), L - 1);
      } while (L * l === 2 * (L + l) || l < 1);
      const A = L * l, P = 2 * (L + l);
      const veutAire = Math.random() < 0.5;
      const intro = pick([
        `${Maj(le(o))} ${de(p.nom)} est un rectangle de ${L} ${o.u} sur ${l} ${o.u}.`,
        `${p.nom} mesure ${le(o)} : c’est un rectangle de ${L} ${o.u} sur ${l} ${o.u}.`,
        `${Maj(un(o))} rectangulaire mesure ${L} ${o.u} sur ${l} ${o.u}. ${p.nom} fait les calculs.`,
      ]);
      const question = veutAire
        ? pick(["Quelle est son aire ?", "Quelle surface occupe-t-il ?", `Quelle est l’aire de ce rectangle ?`]).replace("occupe-t-il", o.f ? "occupe-t-elle" : "occupe-t-il")
        : pick(["Quel est son périmètre ?", "Quelle est la longueur de son tour ?", "Quel est le périmètre de ce rectangle ?"]);
      const juste = veutAire ? `${fr(A)} ${o.u}²` : `${fr(P)} ${o.u}`;
      return {
        text: `${intro} ${question}`,
        format: "qcm",
        choices: shuffle([`${fr(A)} ${o.u}²`, `${fr(P)} ${o.u}`, `${fr(A)} ${o.u}`, `${fr(P)} ${o.u}²`]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation:
          "Définition : le périmètre mesure le tour (une longueur) ; l’aire mesure la surface.\n\n" +
          `Méthode : périmètre = ${L} + ${l} + ${L} + ${l} ; aire = ${L} × ${l}.\n\n` +
          `Calcul : périmètre = ${fr(P)} ${o.u} ; aire = ${fr(A)} ${o.u}².\n\n` +
          `Conclusion : la réponse est ${juste}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_aire_comprendre_open_1_distinguer_aire_perimetre",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un rectangle mesure 6 cm sur 4 cm.\nQuel est son périmètre ?",
    format: "qcm",
    choices: ["20 cm", "24 cm²", "10 cm", "24 cm"],
    expected: ["20 cm"],
    comparator: "mcq_exact",
    hint: "Le périmètre, c’est le tour de la figure.",
    explanation:
      "Définition : le périmètre mesure la longueur du contour ; l’aire mesure la surface intérieure.\n\n" +
      "Méthode : on fait le tour : 6 + 4 + 6 + 4.\n\n" +
      "Calcul : 6 + 4 + 6 + 4 = 20, donc 20 cm. 24 cm² est l’aire (6 × 4). 10 cm n’est que la moitié du tour.\n\n" +
      "Conclusion : le périmètre est 20 cm.",
    tags: ["aire_surface", "perimetre", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_aire_comprendre_open_2_unite_carree",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "On couvre un rectangle avec 6 carrés de 1 cm de côté.\nQuelle est son aire ?",
    format: "qcm",
    choices: ["6 cm²", "6 cm", "6 cm³", "10 cm"],
    expected: ["6 cm²"],
    comparator: "mcq_exact",
    hint: "Un carré de 1 cm de côté a une aire de 1 cm².",
    explanation:
      "Définition : une aire mesure une surface.\n\n" +
      "Méthode : on compte les carrés de 1 cm de côté : chacun vaut 1 cm².\n\n" +
      "Observation : 6 carrés de 1 cm² font 6 cm². 10 cm est le périmètre (3 + 2 + 3 + 2). Le cm³ sert pour un volume.\n\n" +
      "Conclusion : l’aire est 6 cm².",
    canvas: figureLibreAireCanvas({
      rows: 2,
      cols: 3,
      filledCells: rectangleCells(2, 3),
      showPerimeter: false,
    }),
    tags: ["aire_surface", "unite", "qcm", "canvas"],
  },

  /* =========================
     AIRE_TRIANGLE
  ========================= */

  {
    kind: "fixed",
    id: "5e_aire_triangle_fixed_1_formule",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle formule permet de calculer l’aire d’un triangle ?",
    format: "qcm",
    choices: [
      "base × hauteur ÷ 2",
      "base × hauteur",
      "côté × côté",
      "longueur + largeur",
    ],
    expected: ["base × hauteur ÷ 2"],
    comparator: "mcq_exact",
    hint: "Un triangle correspond à la moitié d’un parallélogramme.",
    explanation:
      "Définition : l’aire d’un triangle se calcule avec une base et la hauteur associée.\n\n" +
      "Méthode : on multiplie la base par la hauteur, puis on divise par 2.\n\n" +
      "Formule : aire = base × hauteur ÷ 2.\n\n" +
      "Conclusion : la bonne formule est base × hauteur ÷ 2.",
    tags: ["aire_surface", "triangle", "formule", "qcm"],
  },

  {
    kind: "template",
    id: "5e_aire_triangle_tpl_1_calcul_direct",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise base × hauteur ÷ 2.",
    tags: ["aire_surface", "triangle", "calcul", "template", "canvas"],
    // 13/10 : situation × tournure × prénom × noms ; le triangle dessiné à ses mesures.
    generate: () => {
      const { N, b, h, u, intro } = triSituation();
      const aire = (b * h) / 2;
      const nom = `triangle ${N.join("")}`;
      return {
        text: `${intro} ${baseHauteur(N, fr(b), fr(h), u)} ${Q_AIRE(nom)}`,
        format: "short",
        expected: [`${fr(aire)} ${u}²`],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un triangle est base × hauteur ÷ 2.\n\n" +
          "Méthode : on prend la base et la hauteur qui lui est perpendiculaire.\n\n" +
          `Calcul : ${fr(b)} × ${fr(h)} ÷ 2 = ${fr(aire)}.\n\n` +
          `Conclusion : l’aire du ${nom} est ${fr(aire)} ${u}².`,
        canvas: triangleMesure(b, h, { noms: N, base: `${fr(b)} ${u}`, haut: `${fr(h)} ${u}` }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_aire_triangle_tpl_2_triangle_rectangle",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans un triangle rectangle, les deux côtés perpendiculaires peuvent servir de base et hauteur.",
    tags: ["aire_surface", "triangle_rectangle", "calcul", "template", "canvas"],
    // 13/10 : rectangle en un sommet nommé ; les deux côtés de l'angle droit, dessinés.
    generate: () => {
      const { N, b, h, u, intro } = triSituation();
      const aire = (b * h) / 2;
      const nom = `triangle ${N.join("")}`;
      const donnees = pick([
        `Il est rectangle en ${N[0]} : [${N[0]}${N[1]}] mesure ${fr(b)} ${u} et [${N[0]}${N[2]}] mesure ${fr(h)} ${u}.`,
        `Le ${nom} est rectangle en ${N[0]}, avec [${N[0]}${N[2]}] qui mesure ${fr(h)} ${u} et [${N[0]}${N[1]}] qui mesure ${fr(b)} ${u}.`,
      ]);
      return {
        text: `${intro} ${donnees} ${Q_AIRE(nom)}`,
        format: "short",
        expected: [`${fr(aire)} ${u}²`],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un triangle rectangle se calcule aussi avec base × hauteur ÷ 2.\n\n" +
          `Méthode : les deux côtés de l’angle droit, [${N[0]}${N[1]}] et [${N[0]}${N[2]}], sont perpendiculaires : l’un est la base, l’autre la hauteur.\n\n` +
          `Calcul : ${fr(b)} × ${fr(h)} ÷ 2 = ${fr(aire)}.\n\n` +
          `Conclusion : l’aire est ${fr(aire)} ${u}².`,
        canvas: triangleMesure(b, h, { noms: N, base: `${fr(b)} ${u}`, haut: `${fr(h)} ${u}`, droit: true }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_aire_triangle_tpl_3_qcm_calcul",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention : il faut diviser par 2.",
    tags: ["aire_surface", "triangle", "qcm", "piege", "template"],
    // 13/10 : mêmes situations ; les leurres sont les erreurs connues (oubli du ÷ 2, somme…).
    generate: () => {
      const { N, b, h, u, intro } = triSituation(false);
      const aire = (b * h) / 2;
      const produit = b * h;
      const nom = `triangle ${N.join("")}`;
      const question = pick(["Choisis son aire.", `Quelle est l’aire du ${nom} ?`, "Quelle aire est juste ?"]);
      return {
        text: `${intro} ${baseHauteur(N, fr(b), fr(h), u)} ${question}`,
        format: "qcm",
        choices: makeChoices(`${fr(aire)} ${u}²`, [
          `${fr(produit)} ${u}²`,
          `${fr(b + h)} ${u}²`,
          `${fr(produit * 2)} ${u}²`,
          `${fr(aire)} ${u}`,
          `${fr(aire + b)} ${u}²`,
        ]),
        expected: [`${fr(aire)} ${u}²`],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’aire d’un triangle est base × hauteur ÷ 2.\n\n" +
          "Méthode : on calcule d’abord base × hauteur, puis on divise par 2.\n\n" +
          `Calcul : ${fr(b)} × ${fr(h)} = ${fr(produit)}, puis ${fr(produit)} ÷ 2 = ${fr(aire)}.\n\n` +
          `Conclusion : l’aire est ${fr(aire)} ${u}².`,
        canvas: triangleMesure(b, h, { noms: N, base: `${fr(b)} ${u}`, haut: `${fr(h)} ${u}` }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_aire_triangle_tpl_4_retrouver_hauteur",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Si aire = base × hauteur ÷ 2, alors hauteur = aire × 2 ÷ base.",
    tags: ["aire_surface", "triangle", "hauteur", "inverse", "template", "canvas"],
    // 13/10 : l'aire et la base sont données, la hauteur est cherchée (« ? » sur la figure).
    generate: () => {
      const { N, b, h, u, intro } = triSituation(false);
      const aire = (b * h) / 2;
      const nom = `triangle ${N.join("")}`;
      const question = pick([
        `Combien mesure la hauteur issue de ${N[2]} ?`,
        `Quelle est la longueur de la hauteur issue de ${N[2]} ?`,
        `Calcule la hauteur issue de ${N[2]}.`,
      ]);
      return {
        text: `${intro} L’aire du ${nom} est ${fr(aire)} ${u}² et sa base [${N[0]}${N[1]}] mesure ${fr(b)} ${u}. ${question}`,
        format: "short",
        expected: [`${fr(h)} ${u}`],
        comparator: "number_equal",
        explanation:
          "Définition : aire du triangle = base × hauteur ÷ 2.\n\n" +
          "Méthode : base × hauteur = aire × 2, donc hauteur = aire × 2 ÷ base.\n\n" +
          `Calcul : ${fr(aire)} × 2 = ${fr(2 * aire)}, puis ${fr(2 * aire)} ÷ ${fr(b)} = ${fr(h)}.\n\n` +
          `Conclusion : la hauteur mesure ${fr(h)} ${u}.`,
        canvas: triangleMesure(b, h, { noms: N, base: `${fr(b)} ${u}`, haut: "?" }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_aire_triangle_tpl_5_retrouver_base",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Si aire = base × hauteur ÷ 2, alors base = aire × 2 ÷ hauteur.",
    tags: ["aire_surface", "triangle", "base", "inverse", "template", "canvas"],
    // 13/10 : l'aire et la hauteur sont données, la base est cherchée (« ? » sur la figure).
    generate: () => {
      const { N, b, h, u, intro } = triSituation(false);
      const aire = (b * h) / 2;
      const nom = `triangle ${N.join("")}`;
      const question = pick([
        `Combien mesure la base [${N[0]}${N[1]}] ?`,
        `Quelle est la longueur de la base [${N[0]}${N[1]}] ?`,
        `Calcule la longueur ${N[0]}${N[1]}.`,
      ]);
      return {
        text: `${intro} L’aire du ${nom} est ${fr(aire)} ${u}² et la hauteur issue de ${N[2]} mesure ${fr(h)} ${u}. ${question}`,
        format: "short",
        expected: [`${fr(b)} ${u}`],
        comparator: "number_equal",
        explanation:
          "Définition : aire du triangle = base × hauteur ÷ 2.\n\n" +
          "Méthode : base × hauteur = aire × 2, donc base = aire × 2 ÷ hauteur.\n\n" +
          `Calcul : ${fr(aire)} × 2 = ${fr(2 * aire)}, puis ${fr(2 * aire)} ÷ ${fr(h)} = ${fr(b)}.\n\n` +
          `Conclusion : la base mesure ${fr(b)} ${u}.`,
        canvas: triangleMesure(b, h, { noms: N, base: "?", haut: `${fr(h)} ${u}` }),
      };
    },
  },

  // 13/10/2026 : l'étoile 4 n'avait que des questions figées. Le piège du côté
  // oblique, sur un triangle parfois obtus (le pied de la hauteur hors de la base).
  {
    kind: "template",
    id: "5e_aire_triangle_tpl_6_cote_oblique",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 4,
    theme: "neutral",
    hint: "La hauteur est perpendiculaire à la base ; le côté oblique ne sert pas.",
    tags: ["aire_surface", "triangle", "hauteur", "piege", "template", "canvas"],
    generate: () => {
      const { N, b, h, u, intro } = triSituation(false);
      const c = h + rnd(1, Math.max(2, Math.round(h / 2)));
      const dx = Math.sqrt(c * c - h * h);
      // Le côté [BC] mesure c : le pied de la hauteur est à dx de B, dedans ou dehors.
      const t = Math.random() < 0.5 && dx < b ? 1 - dx / b : 1 + dx / b;
      const aire = (b * h) / 2;
      const nom = `triangle ${N.join("")}`;
      const donnees = pick([
        `La base [${N[0]}${N[1]}] mesure ${fr(b)} ${u}, le côté [${N[1]}${N[2]}] mesure ${fr(c)} ${u} et la hauteur issue de ${N[2]} mesure ${fr(h)} ${u}.`,
        `Le côté [${N[1]}${N[2]}] mesure ${fr(c)} ${u}, la base [${N[0]}${N[1]}] mesure ${fr(b)} ${u} et la hauteur issue de ${N[2]} mesure ${fr(h)} ${u}.`,
      ]);
      return {
        text: `${intro} ${donnees} ${Q_AIRE(nom)}`,
        format: "short",
        expected: [`${fr(aire)} ${u}²`],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un triangle est base × hauteur ÷ 2, avec la hauteur PERPENDICULAIRE à la base.\n\n" +
          `Méthode : le côté [${N[1]}${N[2]}] est oblique : il ne sert pas.` +
          (t > 1 ? " Ici le pied de la hauteur tombe en dehors de la base : on prolonge [" + N[0] + N[1] + "].\n\n" : "\n\n") +
          `Calcul : ${fr(b)} × ${fr(h)} ÷ 2 = ${fr(aire)}.\n\n` +
          `Conclusion : l’aire est ${fr(aire)} ${u}².`,
        canvas: triangleMesure(b, h, { noms: N, base: `${fr(b)} ${u}`, haut: `${fr(h)} ${u}`, cote: `${fr(c)} ${u}`, t }),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_aire_triangle_fixed_2_erreur_oubli_diviser",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule l’aire d’un triangle de base 8 cm et de hauteur 5 cm. Il répond 40 cm². A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour un triangle, il faut diviser par 2.",
    explanation:
      "Définition : l’aire d’un triangle est base × hauteur ÷ 2.\n\n" +
      "Méthode : on vérifie si l’élève a bien divisé par 2.\n\n" +
      "Calcul : 8 × 5 = 40, puis 40 ÷ 2 = 20.\n\n" +
      "Conclusion : l’élève a oublié de diviser par 2. La bonne aire est 20 cm².",
    tags: ["aire_surface", "triangle", "erreur", "qcm"],
    canvas: triangleAireCanvas("8 cm"),
  },

  {
    kind: "fixed",
    id: "5e_aire_triangle_open_1_methode",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un triangle a une base de 8 cm et une hauteur associée de 5 cm.\nQuelle est son aire ?",
    format: "qcm",
    choices: ["20 cm²", "40 cm²", "13 cm²", "20 cm"],
    expected: ["20 cm²"],
    comparator: "mcq_exact",
    hint: "Aire du triangle = base × hauteur ÷ 2.",
    explanation:
      "Définition : l’aire d’un triangle dépend d’une base et de la hauteur associée.\n\n" +
      "Méthode : on multiplie la base par la hauteur, puis on divise par 2.\n\n" +
      "Calcul : 8 × 5 = 40, puis 40 ÷ 2 = 20. 40 cm² oublie le ÷ 2. 13 vient de 8 + 5.\n\n" +
      "Conclusion : l’aire est 20 cm².",
    tags: ["aire_surface", "triangle", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_aire_triangle_open_2_hauteur_associee",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — garde l’idée : prendre la hauteur, pas le côté.
    text: "Dans un triangle ABC, la base [AB] mesure 10 cm, le côté [AC] mesure 5 cm et la hauteur issue de C mesure 4 cm.\nQuelle est son aire ?",
    format: "qcm",
    choices: ["20 cm²", "25 cm²", "40 cm²", "50 cm²"],
    expected: ["20 cm²"],
    comparator: "mcq_exact",
    hint: "On prend la hauteur perpendiculaire à [AB], pas le côté [AC].",
    explanation:
      "Définition : la hauteur associée à la base [AB] est perpendiculaire à [AB].\n\n" +
      "Méthode : aire = base × hauteur associée ÷ 2. Le côté [AC] n’est pas la hauteur.\n\n" +
      "Calcul : 10 × 4 = 40, puis 40 ÷ 2 = 20. 25 cm² utilise le côté [AC] (10 × 5 ÷ 2). 40 cm² oublie le ÷ 2.\n\n" +
      "Conclusion : l’aire est 20 cm².",
    tags: ["aire_surface", "triangle", "hauteur", "qcm"],
  },
  /* =========================
     AIRE_PARALLELOGRAMME
  ========================= */

  {
    kind: "fixed",
    id: "5e_aire_parallelogramme_fixed_1_formule",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle formule permet de calculer l’aire d’un parallélogramme ?",
    format: "qcm",
    choices: [
      "base × hauteur",
      "base × hauteur ÷ 2",
      "côté × côté",
      "longueur + largeur",
    ],
    expected: ["base × hauteur"],
    comparator: "mcq_exact",
    hint: "Contrairement au triangle, on ne divise pas par 2.",
    explanation:
      "Définition : l’aire d’un parallélogramme dépend d’une base et de la hauteur associée.\n\n" +
      "Méthode : on multiplie directement la base par la hauteur.\n\n" +
      "Formule : aire = base × hauteur.\n\n" +
      "Conclusion : la bonne formule est base × hauteur.",
    tags: ["aire_surface", "parallelogramme", "formule"],
  },

  {
    kind: "template",
    id: "5e_aire_parallelogramme_tpl_1_calcul_direct",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise base × hauteur.",
    tags: ["aire_surface", "parallelogramme", "calcul", "template", "canvas"],
    // 13/10 : situation × tournure × prénom × noms ; dessiné à ses mesures, hauteur tracée.
    generate: () => {
      const { N, nom, b, h, u, intro } = paraSituation(false);
      const aire = b * h;
      return {
        text: `${intro} ${baseHauteurPara(N, fr(b), fr(h), u)} ${Q_AIRE(nom)}`,
        format: "short",
        expected: [`${fr(aire)} ${u}²`],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un parallélogramme est égale à base × hauteur.\n\n" +
          "Méthode : on multiplie la base par la hauteur qui lui est perpendiculaire (pas de ÷ 2).\n\n" +
          `Calcul : ${fr(b)} × ${fr(h)} = ${fr(aire)}.\n\n` +
          `Conclusion : l’aire du ${nom} est ${fr(aire)} ${u}².`,
        canvas: paraMesure(b, h, { noms: N, base: `${fr(b)} ${u}`, haut: `${fr(h)} ${u}` }),
      };
    },
  },

{
  kind: "template",
  id: "5e_aire_parallelogramme_tpl_2_qcm",
  niveau: "5e",
  matiere: "maths",
  notionId: "aire_surface",
  microId: "aire_parallelogramme",
  difficulty: 2,
  theme: "neutral",
  hint: "Attention : on ne divise pas par 2.",
  tags: ["aire_surface", "parallelogramme", "qcm", "piege", "template"],
  // 13/10 : situations tirées ; leurres = erreurs connues (÷ 2 du triangle, somme, périmètre, cm).
  generate: () => {
    const { N, nom, b, h, u, intro } = paraSituation(false);
    const aire = b * h;
    const good = `${fr(aire)} ${u}²`;
    // ⚠️ Base 4, hauteur 4 : plusieurs leurres valaient l'aire ; makeChoices
    // écarte les doublons, et il reste toujours au moins trois leurres.
    const choices = makeChoices(good, [
      `${fr(aire / 2)} ${u}²`,
      `${fr(b + h)} ${u}²`,
      `${fr(2 * (b + h))} ${u}²`,
      `${fr(aire)} ${u}`,
      `${fr(aire + b)} ${u}²`,
      `${fr(aire * 2)} ${u}²`,
    ]);
    const question = pick(["Choisis son aire.", `Quelle est l’aire du ${nom} ?`, "Quelle aire est juste ?"]);
    return {
      text: `${intro} ${baseHauteurPara(N, fr(b), fr(h), u)} ${question}`,
      format: "qcm",
      choices,
      expected: [good],
      comparator: "mcq_exact",
      explanation:
        "Définition : l’aire d’un parallélogramme se calcule avec base × hauteur.\n\n" +
        "Méthode : on ne divise pas par 2, contrairement au triangle.\n\n" +
        `Calcul : ${fr(b)} × ${fr(h)} = ${fr(aire)}.\n\n` +
        `Conclusion : l’aire correcte est ${fr(aire)} ${u}².`,
      canvas: paraMesure(b, h, { noms: N, base: `${fr(b)} ${u}`, haut: `${fr(h)} ${u}` }),
    };
  },
},

  {
    kind: "template",
    id: "5e_aire_parallelogramme_tpl_3_retrouver_hauteur",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 3,
    theme: "neutral",
    hint: "hauteur = aire ÷ base.",
    tags: ["aire_surface", "parallelogramme", "hauteur", "template", "canvas"],
    // 13/10 : aire et base données ; la hauteur cherchée (« ? » sur la figure).
    generate: () => {
      const { N, nom, b, h, u, intro } = paraSituation(false);
      const aire = b * h;
      const question = pick([
        `Combien mesure la hauteur issue de ${N[3]} ?`,
        `Quelle est la longueur de la hauteur issue de ${N[3]} ?`,
        `Calcule la hauteur issue de ${N[3]}.`,
      ]);
      return {
        text: `${intro} L’aire du ${nom} est ${fr(aire)} ${u}² et sa base [${N[0]}${N[1]}] mesure ${fr(b)} ${u}. ${question}`,
        format: "short",
        expected: [`${fr(h)} ${u}`],
        comparator: "number_equal",
        explanation:
          "Définition : aire = base × hauteur.\n\n" +
          "Méthode : on divise l’aire par la base pour retrouver la hauteur.\n\n" +
          `Calcul : ${fr(aire)} ÷ ${fr(b)} = ${fr(h)}.\n\n` +
          `Conclusion : la hauteur mesure ${fr(h)} ${u}.`,
        canvas: paraMesure(b, h, { noms: N, base: `${fr(b)} ${u}`, haut: "?" }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_aire_parallelogramme_tpl_4_retrouver_base",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 3,
    theme: "neutral",
    hint: "base = aire ÷ hauteur.",
    tags: ["aire_surface", "parallelogramme", "base", "template", "canvas"],
    // 13/10 : aire et hauteur données ; la base cherchée (« ? » sur la figure).
    generate: () => {
      const { N, nom, b, h, u, intro } = paraSituation(false);
      const aire = b * h;
      const question = pick([
        `Combien mesure la base [${N[0]}${N[1]}] ?`,
        `Quelle est la longueur de la base [${N[0]}${N[1]}] ?`,
        `Calcule la longueur ${N[0]}${N[1]}.`,
      ]);
      return {
        text: `${intro} L’aire du ${nom} est ${fr(aire)} ${u}² et la hauteur issue de ${N[3]} mesure ${fr(h)} ${u}. ${question}`,
        format: "short",
        expected: [`${fr(b)} ${u}`],
        comparator: "number_equal",
        explanation:
          "Définition : aire = base × hauteur.\n\n" +
          "Méthode : on divise l’aire par la hauteur pour retrouver la base.\n\n" +
          `Calcul : ${fr(aire)} ÷ ${fr(h)} = ${fr(b)}.\n\n` +
          `Conclusion : la base mesure ${fr(b)} ${u}.`,
        canvas: paraMesure(b, h, { noms: N, base: "?", haut: `${fr(h)} ${u}` }),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_aire_parallelogramme_fixed_2_erreur_triangle",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule l’aire d’un parallélogramme de base 8 cm et hauteur 5 cm. Il répond 20 cm². A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il a peut-être utilisé la formule du triangle.",
    explanation:
      "Définition : l’aire d’un parallélogramme est base × hauteur.\n\n" +
      "Méthode : on vérifie si l’élève a utilisé la bonne formule.\n\n" +
      "Calcul : 8 × 5 = 40.\n\n" +
      "Conclusion : l’élève a divisé par 2 par erreur. La bonne aire est 40 cm².",
    tags: ["aire_surface", "parallelogramme", "erreur"],
    canvas: parallelogrammeAireCanvas("8 cm", "5 cm"),
  },

  {
    kind: "fixed",
    id: "5e_aire_parallelogramme_open_1_methode",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un parallélogramme a une base de 7 cm et une hauteur associée de 4 cm.\nQuelle est son aire ?",
    format: "qcm",
    choices: ["28 cm²", "14 cm²", "11 cm²", "28 cm"],
    expected: ["28 cm²"],
    comparator: "mcq_exact",
    hint: "Aire du parallélogramme = base × hauteur (sans diviser par 2).",
    explanation:
      "Définition : l’aire d’un parallélogramme dépend d’une base et de la hauteur associée.\n\n" +
      "Méthode : on multiplie la base par la hauteur associée.\n\n" +
      "Calcul : 7 × 4 = 28. 14 cm² divise par 2 comme pour un triangle. 11 vient de 7 + 4.\n\n" +
      "Conclusion : l’aire est 28 cm².",
    tags: ["aire_surface", "parallelogramme", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_aire_parallelogramme_open_2_hauteur_associee",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — garde l’idée : le côté oblique n’est pas la hauteur.
    text: "Un parallélogramme a une base de 8 cm, un côté oblique de 5 cm et une hauteur de 4 cm.\nQuelle est son aire ?",
    format: "qcm",
    choices: ["32 cm²", "40 cm²", "20 cm²", "16 cm²"],
    expected: ["32 cm²"],
    comparator: "mcq_exact",
    hint: "La hauteur est perpendiculaire à la base. Le côté oblique ne sert pas.",
    explanation:
      "Définition : la hauteur est perpendiculaire à la base ; le côté oblique ne l’est pas.\n\n" +
      "Méthode : aire = base × hauteur.\n\n" +
      "Calcul : 8 × 4 = 32. 40 cm² utilise le côté oblique (8 × 5). 16 cm² divise par 2 comme pour un triangle.\n\n" +
      "Conclusion : l’aire est 32 cm².",
    tags: ["aire_surface", "parallelogramme", "hauteur", "qcm"],
  },
  /* =========================
     AIRE_COMPOSER
  ========================= */

  {
    kind: "fixed",
    id: "5e_aire_composer_fixed_1_definition",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_composer",
    difficulty: 1,
    theme: "neutral",
    text: "Pour calculer l’aire d’une figure composée, on peut souvent…",
    format: "qcm",
    choices: [
      "la découper en figures simples",
      "additionner tous les côtés",
      "multiplier tous les nombres",
      "diviser par 2",
    ],
    expected: ["la découper en figures simples"],
    comparator: "mcq_exact",
    hint: "On utilise des figures connues : rectangle, carré, triangle…",
    explanation:
      "Définition : une figure composée est une figure formée de plusieurs figures simples.\n\n" +
      "Méthode : on découpe la figure en formes connues puis on calcule chaque aire.\n\n" +
      "Observation : on additionne ensuite les aires obtenues.\n\n" +
      "Conclusion : il faut découper la figure en figures simples.",
    tags: ["aire_surface", "composees", "definition"],
  },

  {
    kind: "template",
    id: "5e_aire_composer_tpl_1_deux_rectangles",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_composer",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule séparément les deux rectangles puis additionne.",
    tags: ["aire_surface", "composees", "rectangles", "template", "canvas"],
    // 13/10 : une figure en L tirée, dessinée carreau par carreau (1 carreau = 1 u²).
    generate: () => {
      const p = pick(PRENOMS);
      const [objet, u] = pick([
        ["La pièce en L de la maison", "m"],
        ["Le bureau d’angle", "dm"],
        ["Le potager en L", "m"],
        ["La piscine en L", "m"],
        ["Le tapis en L", "dm"],
        ["La terrasse en L", "m"],
        ["Le logo en L du club", "cm"],
        ["Le canapé d’angle", "dm"],
        ["La cour en L de l’école", "m"],
        ["La pièce de puzzle en L", "cm"],
      ] as const);
      const l1 = rnd(4, 8);
      const h1 = rnd(2, 4);
      const l2 = rnd(2, l1 - 1);
      const h2 = rnd(1, 3);
      const a1 = l1 * h1, a2 = l2 * h2, total = a1 + a2;
      const intro = pick([
        `${objet} ${de(p.nom)} se découpe en deux rectangles : l’un de ${l1} ${u} sur ${h1} ${u}, l’autre de ${l2} ${u} sur ${h2} ${u}.`,
        `${p.nom} découpe en deux rectangles ${objet.charAt(0).toLowerCase() + objet.slice(1)} : un rectangle de ${l1} ${u} sur ${h1} ${u} et un rectangle de ${l2} ${u} sur ${h2} ${u}.`,
      ]);
      const question = pick(["Quelle est l’aire totale ?", "Calcule l’aire de la figure entière.", "Quelle est l’aire de toute la figure ?"]);
      return {
        text: `${intro} ${question}`,
        format: "short",
        expected: [`${total} ${u}²`],
        comparator: "number_equal",
        explanation:
          "Définition : une figure composée peut être séparée en figures simples.\n\n" +
          "Méthode : on calcule l’aire de chaque rectangle, puis on additionne.\n\n" +
          `Calcul : ${l1} × ${h1} = ${a1} ${u}² ; ${l2} × ${h2} = ${a2} ${u}² ; ${a1} + ${a2} = ${total} ${u}².\n\n` +
          `Conclusion : l’aire totale est ${total} ${u}².`,
        canvas: figureLibreAireComposeeCanvas(casesL(l1, h1, l2, h2)),
      };
    },
  },

  {
    kind: "template",
    id: "5e_aire_composer_tpl_2_rectangle_triangle",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule l’aire du rectangle puis celle du triangle.",
    tags: ["aire_surface", "composees", "triangle", "template"],
    // 13/10 : un rectangle surmonté d'un triangle (maison, nichoir, enveloppe…).
    generate: () => {
      const p = pick(PRENOMS);
      const [objet, u, lmin, lmax] = pick([
        ["la façade de la maison", "m", 5, 12],
        ["la façade de la cabane", "m", 2, 5],
        ["le nichoir", "cm", 12, 30],
        ["l’enveloppe ouverte", "cm", 10, 24],
        ["la façade de la grange", "m", 6, 15],
        ["le panneau en forme de flèche", "dm", 4, 12],
        ["la maquette de maison", "cm", 10, 30],
        ["la niche du chien", "dm", 5, 12],
        ["le pignon du chalet", "m", 4, 10],
      ] as const);
      const L = rnd(lmin, lmax);
      const l = rnd(Math.max(1, Math.round(lmin / 2)), lmax);
      const t = rnd(Math.max(1, Math.round(lmin / 3)), Math.max(2, Math.round(lmax / 2)));
      const aR = L * l, aT = (L * t) / 2, total = aR + aT;
      const intro = pick([
        `${Maj(objet)} ${de(p.nom)} est formée d’un rectangle de ${L} ${u} sur ${l} ${u}, surmonté d’un triangle de base ${L} ${u} et de hauteur ${t} ${u}.`,
        `${p.nom} dessine ${objet} : un rectangle de ${L} ${u} sur ${l} ${u}, avec au-dessus un triangle de base ${L} ${u} et de hauteur ${t} ${u}.`,
      ]).replace("est formée", objet.startsWith("le ") ? "est formé" : "est formée");
      const question = pick(["Quelle est l’aire totale ?", "Calcule l’aire de la figure entière.", `Quelle est l’aire ${objet.startsWith("le ") ? `du ${objet.slice(3)}` : `de ${objet}`} ?`]);
      return {
        text: `${intro} ${question}`,
        format: "short",
        expected: [`${fr(total)} ${u}²`],
        comparator: "number_equal",
        explanation:
          "Définition : une figure composée peut contenir plusieurs formes différentes.\n\n" +
          "Méthode : on calcule séparément chaque aire, puis on additionne.\n\n" +
          `Calcul : rectangle = ${L} × ${l} = ${fr(aR)} ${u}² ; triangle = ${L} × ${t} ÷ 2 = ${fr(aT)} ${u}² ; total = ${fr(aR)} + ${fr(aT)} = ${fr(total)} ${u}².\n\n` +
          `Conclusion : l’aire totale est ${fr(total)} ${u}².`,
      };
    },
  },

  {
    kind: "template",
    id: "5e_aire_composer_tpl_3_qcm_piege",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention à ne pas additionner les longueurs à la place des aires.",
    tags: ["aire_surface", "composees", "piege", "qcm", "template"],
    // 13/10 : deux pièces d'un même lieu ; leurres = produit, différence, unité oubliée.
    generate: () => {
      const p = pick(PRENOMS);
      const [lieu, x, y, u, min, max] = pick([
        ["Le jardin", "un potager", "une pelouse", "m", 6, 60],
        ["L’appartement", "un salon", "une cuisine", "m", 8, 35],
        ["La salle de classe", "un coin lecture", "un espace de travail", "m", 4, 40],
        ["L’affiche", "une photo", "un texte", "cm", 50, 400],
        ["Le parc", "une aire de jeux", "un bassin", "m", 20, 300],
        ["La maquette", "une rivière", "une forêt", "cm", 20, 150],
        ["Le terrain de camping", "un emplacement de tente", "un parking", "m", 12, 90],
        ["La couverture en patchwork", "une partie bleue", "une partie rouge", "dm", 10, 60],
      ] as const);
      const a1 = rnd(min, max);
      let a2 = rnd(min, max);
      while (a2 === a1) a2 = rnd(min, max);
      const total = a1 + a2;
      const good = `${fr(total)} ${u}²`;
      const intro = pick([
        `${lieu} ${de(p.nom)} se compose d’${x} de ${fr(a1)} ${u}² et d’${y} de ${fr(a2)} ${u}².`,
        `${p.nom} mesure ${lieu.charAt(0).toLowerCase() + lieu.slice(1)} : ${x} de ${fr(a1)} ${u}² et ${y} de ${fr(a2)} ${u}².`,
      ]);
      const question = pick(["Quelle est l’aire totale ?", "Quelle est l’aire de l’ensemble ?", "Choisis l’aire totale."]);
      return {
        text: `${intro} ${question}`,
        format: "qcm",
        choices: makeChoices(good, [`${fr(a1 * a2)} ${u}²`, `${fr(Math.abs(a1 - a2))} ${u}²`, `${fr(total)} ${u}`, `${fr(2 * total)} ${u}²`]),
        expected: [good],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’aire totale d’une figure composée est la somme des aires des parties.\n\n" +
          "Méthode : on additionne les aires (on ne les multiplie pas).\n\n" +
          `Calcul : ${fr(a1)} + ${fr(a2)} = ${fr(total)}.\n\n` +
          `Conclusion : l’aire totale est ${good}.`,
      };
    },
  },

{
  kind: "template",
  id: "5e_aire_composer_tpl_4_quadrillage",
  niveau: "5e",
  matiere: "maths",
  notionId: "aire_surface",
  microId: "aire_composer",
  difficulty: 3,
  theme: "neutral",
  hint: "Compte les carreaux, puis multiplie par l’aire d’un carreau.",
  tags: ["aire_surface", "composees", "quadrillage", "canvas", "template"],
  // 13/10 : figure tirée ; un carreau n'est plus 1 cm² mais un carré de 2 à 5 unités de côté.
  generate: () => {
    const p = pick(PRENOMS);
    const n = rnd(5, 13);
    const k = rnd(2, 5);
    const u = pick(["cm", "m", "dm"]);
    const cells = polyomino(n, 4, 5);
    const aire = n * k * k;
    const intro = pick([
      `${p.nom} dessine cette figure sur un quadrillage. Chaque carreau est un carré de ${k} ${u} de côté.`,
      `Sur le plan ${de(p.nom)}, chaque carreau est un carré de ${k} ${u} de côté.`,
      `${p.nom} carrelle une surface avec des carreaux carrés de ${k} ${u} de côté (en couleur sur la figure).`,
      `Pour une mosaïque, ${p.nom} utilise des carrés de ${k} ${u} de côté (en couleur sur la figure).`,
    ]);
    const question = pick(["Quelle est l’aire de la figure colorée ?", "Calcule l’aire de la partie colorée.", "Quelle surface est colorée ?"]);
    return {
      text: `${intro} ${question}`,
      format: "short",
      expected: [`${fr(aire)} ${u}²`],
      comparator: "number_equal",
      explanation:
        "Définition : l’aire de la figure est le nombre de carreaux × l’aire d’un carreau.\n\n" +
        `Méthode : un carreau est un carré de ${k} ${u} de côté : son aire est ${k} × ${k} = ${k * k} ${u}².\n\n` +
        `Calcul : il y a ${n} carreaux colorés : ${n} × ${k * k} = ${fr(aire)} ${u}².\n\n` +
        `Conclusion : l’aire est ${fr(aire)} ${u}².`,
      canvas: figureLibreAireComposeeCanvas(cells),
    };
  },
},

  {
    kind: "fixed",
    id: "5e_aire_composer_fixed_2_erreur_perimetre",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_composer",
    difficulty: 4,
    theme: "neutral",
    text:
      "Un élève additionne tous les côtés d’une figure composée pour trouver son aire. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Additionner les côtés sert plutôt à calculer le périmètre.",
    explanation:
      "Définition : le périmètre mesure le contour ; l’aire mesure la surface.\n\n" +
      "Méthode : pour calculer une aire, on utilise des formules d’aires.\n\n" +
      "Observation : additionner les côtés donne un périmètre.\n\n" +
      "Conclusion : l’élève a confondu aire et périmètre.",
    tags: ["aire_surface", "composees", "erreur", "perimetre"],
  },

  {
    kind: "fixed",
    id: "5e_aire_composer_open_1_methode",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_composer",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text:
      "On découpe une figure en un rectangle de 15 cm² et un triangle de 6 cm².\nQuelle est l’aire de la figure ?",
    format: "qcm",
    choices: ["21 cm²", "90 cm²", "9 cm²", "21 cm"],
    expected: ["21 cm²"],
    comparator: "mcq_exact",
    hint: "On additionne les aires des morceaux.",
    explanation:
      "Définition : une figure composée est formée de plusieurs figures simples.\n\n" +
      "Méthode : on découpe la figure, puis on additionne les aires des morceaux.\n\n" +
      "Calcul : 15 + 6 = 21. 90 vient de 15 × 6 ; 9 vient de 15 − 6.\n\n" +
      "Conclusion : l’aire de la figure est 21 cm².",
    tags: ["aire_surface", "composees", "qcm"],
  },

  {
    kind: "template",
    id: "5e_aire_composer_tpl_5_reunion_jardin",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_composer",
    difficulty: 4,
    theme: "reunion",
    hint: "Aire du grand rectangle moins aire de la partie enlevée.",
    tags: ["aire_surface", "composees", "soustraction", "template"],
    // 13/10 : une surface rectangulaire dont on retire un rectangle (bassin,
    // allée, tapis…) ; La Réunion n'est plus qu'un contexte parmi neuf.
    generate: () => {
      const p = pick(PRENOMS);
      const [grand, petit, u, min, max] = pick([
        ["Un jardin créole de La Réunion", "un bassin", "m", 6, 25],
        ["Un terrain de sport", "un local à matériel", "m", 15, 40],
        ["Une cour d’école", "un bac à sable", "m", 10, 35],
        ["Une salle", "une estrade", "m", 5, 14],
        ["Une plaque de carton", "une fenêtre découpée", "cm", 20, 60],
        ["Un mur", "une porte", "dm", 20, 45],
        ["Une pelouse", "une piscine", "m", 8, 30],
        ["Une nappe", "une tache de jus", "cm", 80, 180],
        ["Un parking", "un îlot de fleurs", "m", 20, 50],
      ] as const);
      const L = rnd(min + 2, max);
      const l = rnd(Math.max(2, Math.round(min / 2)), L - 1);
      const a = rnd(1, Math.max(1, Math.floor(L / 3)));
      const b = rnd(1, Math.max(1, Math.floor(l / 2)));
      const A = L * l, B = a * b, reste = A - B;
      const intro = pick([
        `${grand} mesure ${L} ${u} sur ${l} ${u}. On y trouve ${petit} rectangulaire de ${a} ${u} sur ${b} ${u}. ${p.nom} calcule la surface qui reste autour.`,
        `${p.nom} étudie un plan. ${grand} de ${L} ${u} sur ${l} ${u} contient ${petit} de ${a} ${u} sur ${b} ${u}.`,
      ]);
      const question = pick(["Quelle est l’aire restante ?", `Quelle aire reste-t-il, sans ${petit.replace(/^(un|une) /, "l’").replace(/^l’([^aeiouéèêîh])/, (_, c) => (petit.startsWith("une") ? "la " : "le ") + c)} ?`, "Calcule l’aire de la partie restante."]);
      return {
        text: `${intro} ${question}`,
        format: "short",
        expected: [`${fr(reste)} ${u}²`],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire restante est l’aire totale moins l’aire enlevée.\n\n" +
          "Méthode : on calcule les deux aires de rectangles, puis on soustrait.\n\n" +
          `Calcul : ${L} × ${l} = ${fr(A)} ${u}² ; ${a} × ${b} = ${fr(B)} ${u}² ; ${fr(A)} − ${fr(B)} = ${fr(reste)} ${u}².\n\n` +
          `Conclusion : l’aire restante est ${fr(reste)} ${u}².`,
      };
    },
  },

  /* =========================
     AIRE_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "5e_aire_defi_fixed_1_unite",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle unité utilise-t-on pour exprimer une aire ?",
    format: "qcm",
    choices: ["cm²", "cm", "cm³", "°"],
    expected: ["cm²"],
    comparator: "mcq_exact",
    hint: "L’unité d’aire contient un carré.",
    explanation:
      "Définition : une aire mesure une surface.\n\n" +
      "Méthode : on utilise des unités au carré.\n\n" +
      "Observation : cm² signifie centimètre carré.\n\n" +
      "Conclusion : l’unité correcte est cm².",
    tags: ["aire_surface", "unite", "defi"],
  },

  {
    kind: "template",
    id: "5e_aire_defi_tpl_1_comparaison_figures",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule les deux aires avant de comparer.",
    tags: ["aire_surface", "comparaison", "defi", "template"],
    // 13/10 : deux enfants, deux potagers (ou affiches, tapis…) : un rectangle et
    // un triangle ; qui a le plus grand ? Parfois les deux aires sont égales.
    generate: () => {
      let p1 = pick(PRENOMS), p2 = pick(PRENOMS);
      while (p2.nom === p1.nom) p2 = pick(PRENOMS);
      const [objet, f, u, min, max] = pick([
        ["potager", false, "m", 3, 14],
        ["drapeau", false, "cm", 20, 60],
        ["tapis", false, "dm", 6, 20],
        ["affiche", true, "cm", 20, 70],
        ["voile", true, "m", 2, 9],
        ["parcelle", true, "m", 8, 30],
        ["carte d’anniversaire", true, "cm", 8, 25],
      ] as const);
      const L = rnd(min, max), l = rnd(min, max);
      let b = rnd(min, max), h = rnd(min, max);
      if (Math.random() < 0.2) {
        // Égalité exprès : base × hauteur = 2 × L × l.
        b = 2 * L;
        h = l;
      }
      const aR = L * l, aT = (b * h) / 2;
      const juste = aR > aT ? p1.nom : aT > aR ? p2.nom : "les deux ont la même aire";
      const art = f ? "une" : "un";
      return {
        text:
          `${p1.nom} a ${art} ${objet} rectangulaire de ${L} ${u} sur ${l} ${u}. ` +
          `${p2.nom} a ${art} ${objet} triangulaire de base ${b} ${u} et de hauteur ${h} ${u}. ` +
          pick([`Qui a ${f ? "la plus grande" : "le plus grand"} ${objet} ?`, "Qui a la surface la plus grande ?", `Qui a ${f ? "la" : "le"} ${objet} de plus grande aire ?`]),
        format: "qcm",
        choices: [p1.nom, p2.nom, "les deux ont la même aire"],
        expected: [juste],
        comparator: "mcq_exact",
        explanation:
          "Définition : pour comparer deux surfaces, on compare leurs aires.\n\n" +
          "Méthode : rectangle : longueur × largeur ; triangle : base × hauteur ÷ 2.\n\n" +
          `Calcul : ${p1.nom} : ${L} × ${l} = ${fr(aR)} ${u}² ; ${p2.nom} : ${b} × ${h} ÷ 2 = ${fr(aT)} ${u}².\n\n` +
          `Conclusion : ${juste === "les deux ont la même aire" ? "les deux aires sont égales" : `c’est ${juste} qui a la plus grande aire`}.`,
      };
    },
  },

  {
    kind: "template",
    id: "5e_aire_defi_tpl_2_rectangle_manquant",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "longueur = aire ÷ largeur.",
    tags: ["aire_surface", "rectangle", "defi", "template"],
    // 13/10 : un objet rectangulaire tiré ; on cherche la longueur ou la largeur.
    generate: () => {
      const p = pick(PRENOMS);
      const o = pick(OBJ_RECT);
      const L = rnd(Math.max(3, o.min), o.max);
      const l = rnd(Math.max(1, Math.floor(o.min / 2)), L - 1);
      const aire = L * l;
      const chercheL = Math.random() < 0.6;
      const [donne, vDonne, cherche, vCherche] = chercheL ? ["largeur", l, "longueur", L] : ["longueur", L, "largeur", l];
      const intro = pick([
        `${Maj(le(o))} ${de(p.nom)} est rectangulaire. Son aire est ${fr(aire)} ${o.u}² et sa ${donne} est ${vDonne} ${o.u}.`,
        `${p.nom} sait que ${le(o)}, rectangulaire, a une aire de ${fr(aire)} ${o.u}² et une ${donne} de ${vDonne} ${o.u}.`,
        `${Maj(un(o))} rectangulaire a une aire de ${fr(aire)} ${o.u}². Sa ${donne} est ${vDonne} ${o.u}. ${p.nom} cherche l’autre dimension.`,
      ]);
      const question = pick([`Quelle est sa ${cherche} ?`, `Combien mesure sa ${cherche} ?`, `Calcule sa ${cherche}.`]);
      return {
        text: `${intro} ${question}`,
        format: "short",
        expected: [`${vCherche} ${o.u}`],
        comparator: "number_equal",
        explanation:
          "Définition : aire du rectangle = longueur × largeur.\n\n" +
          `Méthode : on divise l’aire par la ${donne}.\n\n` +
          `Calcul : ${fr(aire)} ÷ ${vDonne} = ${vCherche}.\n\n` +
          `Conclusion : la ${cherche} mesure ${vCherche} ${o.u}.`,
      };
    },
  },

{
  kind: "template",
  id: "5e_aire_defi_tpl_3_triangle_piege",
  niveau: "5e",
  matiere: "maths",
  notionId: "aire_surface",
  microId: "aire_defi",
  difficulty: 5,
  theme: "neutral",
  hint: "Attention : il faut utiliser la hauteur et non le côté oblique.",
  tags: ["aire_surface", "triangle", "piege", "defi", "template", "canvas"],

  // 13/10 : triangle obtus (le pied de la hauteur hors de la base), dessiné à ses
  // mesures ; leurres = côté pris pour la hauteur, ÷ 2 oublié, somme.
  generate: () => {
    const { N, b, h, u, intro } = triSituation(false);
    const c = h + rnd(1, Math.max(2, Math.round(h / 2)));
    const t = 1 + Math.sqrt(c * c - h * h) / b;
    const aire = (b * h) / 2;
    const nom = `triangle ${N.join("")}`;
    const good = `${fr(aire)} ${u}²`;
    return {
      text:
        `${intro} Il est obtus : la hauteur issue de ${N[2]} tombe en dehors de la base. ` +
        `La base [${N[0]}${N[1]}] mesure ${fr(b)} ${u}, le côté [${N[1]}${N[2]}] mesure ${fr(c)} ${u} et la hauteur issue de ${N[2]} mesure ${fr(h)} ${u}. ` +
        pick(["Quelle est son aire ?", `Choisis l’aire du ${nom}.`, `Quelle est l’aire du ${nom} ?`]),
      format: "qcm",
      choices: makeChoices(good, [`${fr((b * c) / 2)} ${u}²`, `${fr(b * h)} ${u}²`, `${fr(b + h + c)} ${u}²`, `${fr((h * c) / 2)} ${u}²`]),
      expected: [good],
      comparator: "mcq_exact",
      explanation:
        "Définition : l’aire d’un triangle dépend de la base et de la hauteur associée, perpendiculaire à la base.\n\n" +
        `Méthode : la hauteur issue de ${N[2]} tombe sur le prolongement de [${N[0]}${N[1]}] : on l’utilise quand même ; le côté [${N[1]}${N[2]}] ne sert pas.\n\n` +
        `Calcul : ${fr(b)} × ${fr(h)} ÷ 2 = ${fr(aire)}.\n\n` +
        `Conclusion : l’aire du ${nom} est ${good}.`,
      canvas: triangleMesure(b, h, { noms: N, base: `${fr(b)} ${u}`, haut: `${fr(h)} ${u}`, cote: `${fr(c)} ${u}`, t }),
    };
  },
},

{
  kind: "template",
  id: "5e_aire_defi_tpl_4_quadrillage_complexe",
  niveau: "5e",
  matiere: "maths",
  notionId: "aire_surface",
  microId: "aire_defi",
  difficulty: 5,
  theme: "neutral",
  // 13/10 : à rebours : l'aire de la figure est donnée, on cherche l'aire d'UN carreau.
  generate: () => {
    const p = pick(PRENOMS);
    const n = rnd(6, 14);
    const k = pick([1, 2, 3, 4, 5, 6, 0.5, 1.5, 2.5]);
    const u = pick(["cm", "dm", "m"]);
    const unC = k * k;
    const total = n * unC;
    const cells = polyomino(n, 4, 6);
    const intro = pick([
      `La figure colorée ${de(p.nom)} a une aire de ${fr(total)} ${u}².`,
      `${p.nom} a colorié une figure sur un quadrillage. Son aire est ${fr(total)} ${u}².`,
      `Sur le plan ${de(p.nom)}, la partie colorée mesure ${fr(total)} ${u}².`,
    ]);
    const question = pick([
      "Quelle est l’aire d’un carreau ?",
      "Combien mesure l’aire d’un seul carreau ?",
      "Calcule l’aire d’un carreau du quadrillage.",
    ]);
    return {
      text: `${intro} ${question}`,
      format: "short",
      expected: [`${fr(unC)} ${u}²`],
      comparator: "number_equal",
      explanation:
        "Définition : l’aire de la figure = nombre de carreaux × aire d’un carreau.\n\n" +
        "Méthode : on compte les carreaux colorés, puis on divise l’aire totale par ce nombre.\n\n" +
        `Calcul : il y a ${n} carreaux ; ${fr(total)} ÷ ${n} = ${fr(unC)}.\n\n` +
        `Conclusion : un carreau a une aire de ${fr(unC)} ${u}².`,
      canvas: figureLibreAireComposeeCanvas(cells),
    };
  },
},

  {
    kind: "fixed",
    id: "5e_aire_defi_fixed_2_confusion_perimetre",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text:
      "Deux rectangles ont le même périmètre. Ont-ils toujours la même aire ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Périmètre et aire sont deux notions différentes.",
    explanation:
      "Définition : le périmètre mesure le contour et l’aire mesure la surface.\n\n" +
      "Méthode : deux figures peuvent avoir le même contour sans avoir la même surface.\n\n" +
      "Observation : un rectangle long et fin n’a pas la même aire qu’un rectangle plus carré.\n\n" +
      "Conclusion : deux rectangles peuvent avoir le même périmètre mais des aires différentes.",
    tags: ["aire_surface", "perimetre", "erreur", "defi"],
  },

  {
    kind: "fixed",
    id: "5e_aire_defi_open_1_difference_aire_perimetre",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text:
      "Un carré a un côté de 5 cm.\nQuelle est son aire ?",
    format: "qcm",
    choices: ["25 cm²", "20 cm", "20 cm²", "10 cm²"],
    expected: ["25 cm²"],
    comparator: "mcq_exact",
    hint: "Aire du carré = côté × côté.",
    explanation:
      "Définition : l’aire mesure la surface intérieure ; le périmètre mesure le contour.\n\n" +
      "Méthode : aire du carré = côté × côté.\n\n" +
      "Calcul : 5 × 5 = 25. 20 cm est le périmètre (5 + 5 + 5 + 5). 10 vient de 5 × 2.\n\n" +
      "Conclusion : l’aire est 25 cm².",
    tags: ["aire_surface", "perimetre", "qcm", "defi"],
  },

  {
    kind: "template",
    id: "5e_aire_defi_tpl_5_reunion_champ_canne",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Calcule d’abord l’aire, puis le prix : aire × prix d’un m².",
    tags: ["aire_surface", "prix", "defi", "template"],
    // 13/10 : deux étapes : l'aire d'un rectangle, puis le prix au m² (prix à deux
    // décimales). La Réunion (champ de canne) n'est plus qu'un contexte sur huit.
    generate: () => {
      const p = pick(PRENOMS);
      const [surface, produit, min, max, pmin, pmax] = pick([
        ["un champ de canne à sucre à La Réunion", "l’engrais", 10, 40, 15, 60],
        ["une pelouse", "le gazon en rouleau", 3, 15, 250, 690],
        ["le sol d’une chambre", "le parquet", 2, 5, 1590, 3990],
        ["un mur", "la peinture", 2, 6, 180, 450],
        ["une terrasse", "le carrelage", 2, 8, 1290, 2990],
        ["une salle de jeux", "la moquette", 3, 7, 890, 1990],
        ["un potager", "le terreau", 2, 6, 120, 390],
        ["une cour", "le dallage", 4, 12, 990, 2490],
      ] as const);
      const L = rnd(min, max);
      const l = rnd(Math.max(1, Math.floor(min / 2)), L);
      const pc = rnd(pmin, pmax); // prix d'un m², en centimes
      const aire = L * l;
      const totalC = aire * pc;
      const euros = (c: number) => `${fr(Math.floor(c / 100))},${String(c % 100).padStart(2, "0")} €`;
      const intro = pick([
        `${p.nom} veut couvrir ${surface} de ${L} m sur ${l} m. ${Maj(produit)} coûte ${euros(pc)} le m².`,
        `${Maj(surface)} mesure ${L} m sur ${l} m. ${p.nom} achète ${produit} à ${euros(pc)} le m².`,
      ]);
      const question = pick(["Combien va-t-on payer ?", "Quel est le prix total ?", `Combien ${p.nom} paie-t-${p.f ? "elle" : "il"} ?`]);
      return {
        text: `${intro} ${question}`,
        format: "short",
        expected: [euros(totalC)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un rectangle est longueur × largeur.\n\n" +
          "Méthode : on calcule l’aire, puis on multiplie par le prix d’un m².\n\n" +
          `Calcul : ${L} × ${l} = ${aire} m² ; ${aire} × ${euros(pc).replace(" €", "")} = ${euros(totalC).replace(" €", "")}.\n\n` +
          `Conclusion : on paie ${euros(totalC)}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_aire_defi_fixed_3_figure_plus_grande",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text:
      "Une figure paraît plus grande qu’une autre. Peut-on être sûr qu’elle a une aire plus grande sans calcul ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les apparences peuvent tromper.",
    explanation:
      "Définition : l’aire doit être mesurée ou calculée.\n\n" +
      "Méthode : on utilise des calculs ou un quadrillage.\n\n" +
      "Observation : une figure peut sembler plus grande sans l’être réellement.\n\n" +
      "Conclusion : il faut vérifier avec un calcul.",
    tags: ["aire_surface", "raisonnement", "defi"],
  },

  /* =========================
     TOP-UP — AIRE_COMPRENDRE (+2)
  ========================= */
  {
    kind: "fixed",
    id: "5e_aire_comprendre_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "En quelle unité exprime-t-on une aire ?",
    format: "qcm",
    choices: ["en cm²", "en cm", "en cm³", "en degrés"],
    expected: ["en cm²"],
    comparator: "mcq_exact",
    hint: "Une surface → unité au carré.",
    explanation:
      "Définition : l’aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on choisit une unité de surface.\n\n" +
      "Observation : une longueur s’exprime en cm, une aire en cm², un volume en cm³.\n\n" +
      "Conclusion : une aire s’exprime en cm².",
    tags: ["aire_surface", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_aire_comprendre_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un rectangle mesure 5 cm sur 2 cm.\nQue vaut 14 cm : son aire ou son périmètre ?",
    format: "qcm",
    choices: ["son périmètre", "son aire"],
    expected: ["son périmètre"],
    comparator: "mcq_exact",
    hint: "L’aire s’écrit en cm², le périmètre en cm.",
    explanation:
      "Définition : l’aire mesure la surface intérieure, le périmètre mesure la longueur du contour.\n\n" +
      "Méthode : on calcule les deux.\n\n" +
      "Calcul : périmètre = 5 + 2 + 5 + 2 = 14 cm. Aire = 5 × 2 = 10 cm².\n\n" +
      "Conclusion : 14 cm est le périmètre.",
    tags: ["aire_surface", "perimetre", "qcm"],
  },

  /* =========================
     TOP-UP — AIRE_TRIANGLE (+1)
  ========================= */
  {
    kind: "fixed",
    id: "5e_aire_triangle_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle a une base de 8 cm et une hauteur de 5 cm. Quelle est son aire ?",
    format: "short",
    expected: ["20 cm²", "20"],
    comparator: "number_equal",
    hint: "Aire = base × hauteur ÷ 2.",
    explanation:
      "Définition : l’aire d’un triangle est la moitié de celle du rectangle de mêmes base et hauteur.\n\n" +
      "Méthode : on calcule base × hauteur, puis on divise par 2.\n\n" +
      "Calcul : 8 × 5 ÷ 2 = 40 ÷ 2 = 20.\n\n" +
      "Conclusion : l’aire du triangle est 20 cm².",
    tags: ["aire_surface", "triangle", "canvas"],
    canvas: triangleAireCanvas("8 cm"),
  },

  /* =========================
     TOP-UP — AIRE_PARALLELOGRAMME (+2)
  ========================= */
  {
    kind: "fixed",
    id: "5e_aire_parallelogramme_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 2,
    theme: "neutral",
    text: "Un parallélogramme a une base de 7 cm et une hauteur de 4 cm. Quelle est son aire ?",
    format: "short",
    expected: ["28 cm²", "28"],
    comparator: "number_equal",
    hint: "Aire = base × hauteur.",
    explanation:
      "Définition : l’aire d’un parallélogramme est base × hauteur.\n\n" +
      "Méthode : on multiplie la base par la hauteur correspondante.\n\n" +
      "Calcul : 7 × 4 = 28.\n\n" +
      "Conclusion : l’aire du parallélogramme est 28 cm².",
    tags: ["aire_surface", "parallelogramme", "canvas"],
    canvas: parallelogrammeAireCanvas("7 cm", "4 cm"),
  },
  {
    kind: "template",
    id: "5e_aire_parallelogramme_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 3,
    theme: "neutral",
    hint: "Aire = base × hauteur.",
    tags: ["aire_surface", "parallelogramme", "template", "canvas"],
    // 13/10 : des mesures au demi près (aire à deux décimales au plus).
    generate: () => {
      const { N, nom, b, h, u, intro } = paraSituation(true);
      const aire = b * h;
      const question = pick([
        `Quelle surface faut-il recouvrir ?`,
        `Calcule l’aire du ${nom}.`,
        `Quelle est l’aire du ${nom} ?`,
      ]);
      return {
        text: `${intro} ${baseHauteurPara(N, fr(b), fr(h), u)} ${question}`,
        format: "short",
        expected: [`${fr(aire)} ${u}²`],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un parallélogramme est base × hauteur.\n\n" +
          "Méthode : on multiplie la base par la hauteur.\n\n" +
          `Calcul : ${fr(b)} × ${fr(h)} = ${fr(aire)}.\n\n` +
          `Conclusion : l’aire est ${fr(aire)} ${u}².`,
        canvas: paraMesure(b, h, { noms: N, base: `${fr(b)} ${u}`, haut: `${fr(h)} ${u}` }),
      };
    },
  },

  // 13/10/2026 : l'étoile 4 n'avait que des questions figées. Le piège du côté oblique.
  {
    kind: "template",
    id: "5e_aire_parallelogramme_tpl_5_cote_oblique",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_parallelogramme",
    difficulty: 4,
    theme: "neutral",
    hint: "La hauteur est perpendiculaire à la base ; le côté oblique ne sert pas.",
    tags: ["aire_surface", "parallelogramme", "hauteur", "piege", "template", "canvas"],
    generate: () => {
      const { N, nom, b, h, u, intro } = paraSituation(false);
      const c = h + rnd(1, Math.max(2, Math.round(h / 2)));
      const dcal = Math.sqrt(c * c - h * h);
      const aire = b * h;
      const donnees = pick([
        `La base [${N[0]}${N[1]}] mesure ${fr(b)} ${u}, le côté [${N[0]}${N[3]}] mesure ${fr(c)} ${u} et la hauteur issue de ${N[3]} mesure ${fr(h)} ${u}.`,
        `Le côté [${N[0]}${N[3]}] mesure ${fr(c)} ${u}, la hauteur issue de ${N[3]} mesure ${fr(h)} ${u} et la base [${N[0]}${N[1]}] mesure ${fr(b)} ${u}.`,
      ]);
      const qcm = Math.random() < 0.5;
      const good = `${fr(aire)} ${u}²`;
      return {
        text: `${intro} ${donnees} ${Q_AIRE(nom)}`,
        format: qcm ? "qcm" : "short",
        ...(qcm ? { choices: makeChoices(good, [`${fr(b * c)} ${u}²`, `${fr(aire / 2)} ${u}²`, `${fr((b * c) / 2)} ${u}²`, `${fr(b * h * c)} ${u}²`]) } : {}),
        expected: [good],
        comparator: qcm ? "mcq_exact" : "number_equal",
        explanation:
          "Définition : l’aire d’un parallélogramme est base × hauteur, avec la hauteur PERPENDICULAIRE à la base.\n\n" +
          `Méthode : le côté [${N[0]}${N[3]}] est oblique : il ne sert pas.\n\n` +
          `Calcul : ${fr(b)} × ${fr(h)} = ${fr(aire)}.\n\n` +
          `Conclusion : l’aire est ${fr(aire)} ${u}².`,
        canvas: paraMesure(b, h, { noms: N, base: `${fr(b)} ${u}`, haut: `${fr(h)} ${u}`, cote: `${fr(c)} ${u}`, d: dcal }),
      };
    },
  },

  /* =========================
     TOP-UP — AIRE_COMPOSER (+2)
  ========================= */
  {
    kind: "fixed",
    id: "5e_aire_composer_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure est formée d’un rectangle de 24 cm² et d’un carré de 9 cm². Quelle est son aire totale ?",
    format: "short",
    expected: ["33 cm²", "33"],
    comparator: "number_equal",
    hint: "On additionne les aires des morceaux.",
    explanation:
      "Définition : l’aire d’une figure composée est la somme des aires de ses morceaux.\n\n" +
      "Méthode : on découpe en figures simples puis on additionne.\n\n" +
      "Calcul : 24 + 9 = 33.\n\n" +
      "Conclusion : l’aire totale est 33 cm².",
    tags: ["aire_surface", "composer"],
  },
  {
    kind: "fixed",
    id: "5e_aire_composer_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Cette figure en L est faite de deux rectangles : 6 cm sur 2 cm et 3 cm sur 2 cm.\nQuelle est son aire ?",
    format: "qcm",
    choices: ["18 cm²", "72 cm²", "13 cm²", "18 cm"],
    expected: ["18 cm²"],
    comparator: "mcq_exact",
    hint: "Calcule l’aire de chaque rectangle, puis additionne.",
    explanation:
      "Définition : une figure en L se découpe en deux rectangles.\n\n" +
      "Méthode : on calcule l’aire de chaque rectangle, puis on additionne.\n\n" +
      "Calcul : 6 × 2 = 12 et 3 × 2 = 6. Puis 12 + 6 = 18. 72 vient de 12 × 6 ; 13 vient de 6 + 2 + 3 + 2.\n\n" +
      "Conclusion : l’aire du L est 18 cm².",
    canvas: figureLibreAireCanvas({
      rows: 4,
      cols: 6,
      filledCells: lShapeCells({ rows: 4, cols: 6, cutRows: 2, cutCols: 3 }),
      showPerimeter: false,
    }),
    tags: ["aire_surface", "composer", "qcm", "canvas"],
  },

  /* =========================
     TOP-UP — AIRE_DEFI (+1)
  ========================= */
  {
    kind: "fixed",
    id: "5e_aire_defi_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Un terrain rectangulaire de 12 m sur 8 m contient un bassin carré de 3 m de côté. Quelle est l’aire restante (hors bassin) ?",
    format: "short",
    expected: ["87 m²", "87"],
    comparator: "number_equal",
    hint: "Aire du terrain moins aire du bassin.",
    explanation:
      "Définition : l’aire restante est la différence entre l’aire totale et l’aire enlevée.\n\n" +
      "Méthode : on calcule chaque aire puis on soustrait.\n\n" +
      "Calcul : terrain = 12 × 8 = 96 m² ; bassin = 3 × 3 = 9 m² ; reste = 96 − 9 = 87 m².\n\n" +
      "Conclusion : l’aire restante est 87 m².",
    tags: ["aire_surface", "defi", "reunion"],
  },
];