// lib/tutor-v4/questionBank/cp/maths/figures-solides.bank.ts
//
// Les figures planes et les solides du CP.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   LES SOLIDES
//   — reconnaitre cube, boule, cône, cylindre et pavé ;
//   — NOMMER un cube, un pavé et une boule — le cône et le cylindre se
//     reconnaissent, ils ne sont pas encore à nommer ;
//   — décrire un cube ou un pavé « en utilisant le terme FACE », et connaitre
//     le nombre et la nature de ces faces (carré ou rectangle) ;
//   — construire des cubes et des pavés en assemblant leurs faces.
//   ⛔ Ni « arête » ni « sommet » pour les solides : ces deux mots arrivent au
//     CE1. Au CP, un solide se décrit avec ses FACES.
//   ⛔ Et le BO prévient : « Au CP, où le classement se fait sur des critères
//     visuels, le cube n'est pas considéré comme un pavé. » On ne pose donc
//     jamais la question.
//
//   LA GÉOMÉTRIE PLANE
//   — reconnaitre et nommer le DISQUE, le carré, le rectangle et le triangle.
//     ⛔ On dit « disque » au CP, pas « cercle » : le cercle arrive au CE1 ;
//   — décrire ces figures avec les termes CÔTÉ et SOMMET ;
//   — repérer visuellement des alignements, et « dire si trois points sont
//     alignés ou non EN UTILISANT LA RÈGLE dans les cas où la réponse n'est
//     pas perceptible de façon évidente » ;
//   — tracer une droite passant par deux points ; elle peut être horizontale,
//     verticale ou OBLIQUE ;
//   — construire un carré, un rectangle, un triangle ou un assemblage sur
//     papier quadrillé ou pointé.
//   ⛔ Ni équerre, ni compas, ni angle droit : tous arrivent au CE1.
//
// LE PIÈGE DE LA NOTION : l'œil, qui décide trop vite. Trois points ont l'air
// alignés, et ils ne le sont pas — le BO demande justement la règle pour ces
// cas-là. Et son revers : une figure PENCHÉE cesse d'être reconnue, alors
// qu'un carré posé sur la pointe reste un carré.
//
// ⭐ 10/11/2026 — RÉÉCRITE EN GÉNÉRATEURS (robustesse cycle 2). Avant : 6 à 16
// squelettes par micro, 13 à 18 répétitions sur 20, 10 % d'énoncés dessinés.
// Chaque gabarit tire une SITUATION (prénom de la troupe, objet, lieu, métier)
// × une TOURNURE × la figure. Le dessin porte la question (la figure à nommer,
// les points à juger, le quadrillage à reproduire) sans jamais écrire la
// réponse : aucun nom de sommet, aucune longueur, aucun nom de solide.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type {
  CanvasFigure,
  DroitesCanvasData,
  FigureLibreCanvasData,
  Solide3DCanvasData,
  TutorBankItemV4,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/* ─── La troupe et les prénoms ─────────────────────────────────────────── */

const ENFANTS = [
  { n: "Nina", f: true },
  { n: "Téo", f: false },
  { n: "Zoé", f: true },
  { n: "Ravi", f: false },
  { n: "Lou", f: true },
  { n: "Malo", f: false },
  { n: "Inès", f: true },
  { n: "Sacha", f: false },
  { n: "Amir", f: false },
  { n: "Jade", f: true },
  { n: "Naïa", f: true },
  { n: "Tom", f: false },
  { n: "Lina", f: true },
  { n: "Yanis", f: false },
  { n: "Léa", f: true },
  { n: "Noé", f: false },
  { n: "Maya", f: true },
  { n: "Hugo", f: false },
] as const;

type Enfant = (typeof ENFANTS)[number];
const enfant = () => randomChoice(ENFANTS);
const deuxEnfants = (): [Enfant, Enfant] => {
  const [a, b] = shuffle(ENFANTS);
  return [a, b];
};
const il = (e: Enfant) => (e.f ? "elle" : "il");

/* ─── Les figures planes, dessinées ────────────────────────────────────── */

type FigPlane = "carre" | "rectangle" | "triangle" | "disque";

const NOM_FIG: Record<FigPlane, string> = {
  carre: "un carré",
  rectangle: "un rectangle",
  triangle: "un triangle",
  disque: "un disque",
};
const TOUTES_FIGS: FigPlane[] = ["carre", "rectangle", "triangle", "disque"];
const COTES: Record<FigPlane, number> = { carre: 4, rectangle: 4, triangle: 3, disque: 0 };

const DESCRIPTION: Record<FigPlane, string> = {
  carre: "4 côtés de la même longueur",
  rectangle: "4 côtés : 2 longs et 2 courts",
  triangle: "3 côtés et 3 sommets",
  disque: "un bord tout rond, sans sommet",
};

function tourner(p: { x: number; y: number }, c: { x: number; y: number }, deg: number) {
  const a = (deg * Math.PI) / 180;
  const dx = p.x - c.x;
  const dy = p.y - c.y;
  return {
    x: Math.round(c.x + dx * Math.cos(a) - dy * Math.sin(a)),
    y: Math.round(c.y + dx * Math.sin(a) + dy * Math.cos(a)),
  };
}

/**
 * La figure à reconnaitre, SANS aucun nom de sommet ni longueur : le dessin
 * montre la forme, il ne la nomme pas. `angle` penche la figure (le piège :
 * un carré sur la pointe reste un carré).
 */
function figurePlane(fig: FigPlane, angle = 0): CanvasFigure {
  const c = { x: 150, y: 120 };
  if (fig === "disque") {
    return {
      kind: "cercle",
      size: { width: 300, height: 240 },
      circle: { cx: 150, cy: 120, r: randomInt(55, 85), showDisk: true, showCircle: true },
      points: [],
      segments: [],
      arcs: [],
      display: { showLabels: false, showPoints: false, showCenter: false, showDisk: true },
    };
  }
  if (fig === "triangle") {
    const formes = [
      [{ x: 150, y: 40 }, { x: 60, y: 200 }, { x: 240, y: 200 }],
      [{ x: 70, y: 60 }, { x: 70, y: 200 }, { x: 230, y: 200 }],
      [{ x: 110, y: 50 }, { x: 40, y: 190 }, { x: 250, y: 170 }],
      [{ x: 60, y: 80 }, { x: 240, y: 60 }, { x: 170, y: 200 }],
      [{ x: 150, y: 70 }, { x: 50, y: 170 }, { x: 250, y: 170 }],
    ];
    const [A, B, C] = randomChoice(formes).map((p) => tourner(p, c, angle));
    return {
      kind: "triangle",
      size: { width: 300, height: 240 },
      points: { A, B, C },
      display: { showPoints: false, showLabels: false, showSides: false, showAngles: false },
    };
  }
  const [l, h] =
    fig === "carre"
      ? (() => {
          const s = randomInt(80, 120);
          return [s, s];
        })()
      : angle === 0
        ? [randomInt(150, 200), randomInt(60, 90)]
        : [randomInt(140, 170), randomInt(60, 80)];
  const [A, B, C2, D] = [
    { x: c.x - l / 2, y: c.y - h / 2 },
    { x: c.x + l / 2, y: c.y - h / 2 },
    { x: c.x + l / 2, y: c.y + h / 2 },
    { x: c.x - l / 2, y: c.y + h / 2 },
  ].map((p) => tourner(p, c, angle));
  return {
    kind: "quadrilatere",
    size: { width: 300, height: 240 },
    points: { A, B, C: C2, D },
    display: {
      showPoints: false,
      showLabels: false,
      showSides: false,
      showAngles: false,
      showDiagonals: false,
    },
  };
}

/** Une petite inclinaison, ou aucune : la figure « bien posée ». */
const petitAngle = () => randomChoice([0, 0, 0, 10, -10]);
/** La figure franchement penchée, voire sur sa pointe. */
const grandAngle = () => randomChoice([25, 35, 45, -25, -35, -45]);

/** Ce que l'enfant a fait de la figure — une phrase courte, un monde d'enfant. */
const SCENES_FIG: ((e: Enfant) => string)[] = [
  (e) => `${e.n} a découpé cette forme dans du carton.`,
  (e) => `${e.n} a dessiné cette forme au tableau.`,
  () => "La maîtresse montre cette forme à la classe.",
  (e) => `${e.n} a trouvé cette forme dans sa trousse.`,
  () => "Pic le paille-en-queue a posé cette forme dans la cour.",
  (e) => `${e.n} colle cette forme sur son cahier.`,
  () => "La boulangère a fait un biscuit de cette forme.",
  (e) => `${e.n} a peint cette forme sur une feuille.`,
  (e) => `${e.n} a fait cette forme en pâte à modeler.`,
  () => "Ti Margo a dessiné cette forme dans le sable.",
  (e) => `${e.n} a tracé cette forme à la craie.`,
  () => "Le pâtissier a coupé un gâteau de cette forme.",
  (e) => `${e.n} a trouvé cette forme dans la boîte de jeux.`,
  (e) => `${e.n} a vu cette forme sur la porte du château.`,
  () => "Le pirate a dessiné cette forme sur sa carte.",
  (e) => `${e.n} a cousu cette forme sur son sac.`,
];
const scene = () => randomChoice(SCENES_FIG)(enfant());

const TOURNURES_NOM = [
  "Quelle est cette figure ?",
  "Comment s'appelle cette figure ?",
  "Quel est le nom de cette figure ?",
  "Quelle figure est-ce ?",
];

/* ─── Les solides ──────────────────────────────────────────────────────── */

type Sol = "cube" | "pave_droit" | "boule" | "cylindre" | "cone";
const NOM_SOL: Record<Sol, string> = {
  cube: "un cube",
  pave_droit: "un pavé",
  boule: "une boule",
  cylindre: "un cylindre",
  cone: "un cône",
};
const TOUS_SOL: Sol[] = ["cube", "pave_droit", "boule", "cylindre", "cone"];
const ROULE: Record<Sol, boolean> = {
  cube: false,
  pave_droit: false,
  boule: true,
  cylindre: true,
  cone: true,
};

/** Des objets de tous les jours, rangés par solide. Pas d'objet douteux. */
const OBJETS_SOL: Record<Sol, string[]> = {
  boule: [
    "un ballon de football",
    "une balle de tennis",
    "une bille",
    "une orange",
    "un globe terrestre",
    "une perle de collier",
    "une boule de Noël",
  ],
  cube: [
    "un dé à jouer",
    "un morceau de sucre",
    "un glaçon carré",
    "un dé en mousse",
  ],
  pave_droit: [
    "une boîte à chaussures",
    "une brique de lait",
    "une boîte de céréales",
    "une gomme",
    "une brique de jus",
    "un carton de déménagement",
  ],
  cylindre: [
    "une boîte de conserve",
    "une bougie ronde",
    "une pile",
    "un tambour",
    "une boîte de petits pois",
  ],
  cone: [
    "un chapeau pointu de fête",
    "un cornet de glace",
    "un plot de sport",
    "un cône de chantier",
  ],
};

function solide(kind: Sol): Solide3DCanvasData {
  // ⛔ 10/11/2026 — `solide: "cube"` dessine une face avant de 140 × 100 : un
  // PAVÉ, pareil à `pave_droit` au pixel près. Un enfant ne pouvait donc pas
  // les distinguer. Le cube passe par l'assemblage d'UN petit cube, dessiné en
  // perspective isométrique : six faces carrées, enfin un vrai cube.
  if (kind === "cube") {
    return {
      kind: "solide_3d",
      solide: "assemblage_cubes",
      // Le cadre se resserre autour du cube (le canvas projette depuis une
      // origine fixe) : rendu, il fait la moitié de la largeur de la carte.
      cubes: [{ x: -1, y: 1, z: 2 }],
      size: { width: 210, height: 212 },
      colors: { cubeStroke: "#0f172a" },
      display: { showLabels: false, showDimensions: false, showFormulaHint: false, showUnitCubes: false },
    };
  }
  return {
    kind: "solide_3d",
    solide: kind,
    display: {
      // ⛔ Aucune étiquette, aucune dimension : le dessin donnerait le nom du
      // solide, et la question n'aurait plus d'objet.
      showLabels: false,
      showDimensions: false,
      showFormulaHint: false,
      showUnitCubes: false,
    },
  };
}

const SCENES_SOL: ((e: Enfant) => string)[] = [
  (e) => `${e.n} a trouvé ce solide dans la boîte de jeux.`,
  (e) => `${e.n} a sorti ce solide de son cartable.`,
  () => "Pic le paille-en-queue a trouvé ce solide au jardin.",
  () => "La maîtresse pose ce solide sur son bureau.",
  (e) => `${e.n} a fabriqué ce solide en pâte à modeler.`,
  () => "Le marchand vend des bonbons dans ce solide.",
  (e) => `${e.n} a reçu ce solide pour son anniversaire.`,
  () => "Le pirate a caché ce solide dans son coffre.",
  (e) => `${e.n} joue avec ce solide à la récré.`,
  () => "Ti Margo a trouvé ce solide sur la plage.",
  (e) => `${e.n} a peint ce solide en bleu.`,
  () => "Le menuisier a taillé ce solide dans du bois.",
];
const sceneSol = () => randomChoice(SCENES_SOL)(enfant());

/* ─── Points et droites ────────────────────────────────────────────────── */

type Pt = { x: number; y: number };

function pointsDroites(points: (Pt & { color?: string })[], lignes: { from: Pt; to: Pt }[] = []): DroitesCanvasData {
  return {
    kind: "droites",
    size: { width: 340, height: 240 },
    lines: lignes.map((l, i) => ({ id: `d${i}`, type: "droite" as const, from: l.from, to: l.to, color: "#2563eb", strokeWidth: 3 })),
    points: points.map((p) => ({ x: p.x, y: p.y, color: p.color ?? "#dc2626" })),
    display: {
      showGrid: false,
      showLabels: false,
      showPoints: true,
      showIntersections: false,
      showRightAngleMarkers: false,
      showParallelMarkers: false,
    },
  };
}

/** Une direction au hasard : couchée, debout, ou penchée (montante ou descendante). */
function directionAuHasard() {
  return randomChoice([
    { dx: 1, dy: 0, sens: "couchee" as const },
    { dx: 0, dy: 1, sens: "debout" as const },
    { dx: 0.8, dy: 0.6, sens: "penchee" as const },
    { dx: 0.8, dy: -0.6, sens: "penchee" as const },
    { dx: 0.6, dy: 0.8, sens: "penchee" as const },
  ]);
}

/** Trois points sur une droite (ou le troisième écarté de `ecart` px). */
function troisPoints(ecart: number) {
  const d = directionAuHasard();
  const c = { x: 170, y: 120 };
  // Le pas suit la place disponible : 340 de large, 240 de haut.
  const k0 = d.dy === 0 ? 1.3 : d.dx === 0 ? 0.95 : 1;
  const ts = [-90, randomInt(-30, 30), 90].map((t) => t * k0);
  const n = { x: -d.dy, y: d.dx }; // perpendiculaire
  const k = randomInt(0, 2);
  const signe = randomChoice([1, -1]);
  const pts = ts.map((t, i) => {
    const e = i === k ? ecart * signe : 0;
    return { x: Math.round(c.x + t * d.dx + e * n.x), y: Math.round(c.y + t * d.dy + e * n.y) };
  });
  return { pts, d, k };
}

/** La scène des trois points, et le genre des objets (ils / elles). */
const SCENES_POINTS: ((e: Enfant) => { t: string; f: boolean })[] = [
  (e) => ({ t: `${e.n} a planté trois piquets dans le jardin.`, f: false }),
  () => ({ t: "Trois coccinelles sont posées sur la feuille.", f: true }),
  () => ({ t: "Pic le paille-en-queue a posé trois graines.", f: true }),
  (e) => ({ t: `${e.n} a mis trois billes sur la table.`, f: true }),
  () => ({ t: "Le pompier a placé trois plots dans la cour.", f: false }),
  (e) => ({ t: `${e.n} a collé trois gommettes sur son cahier.`, f: true }),
  () => ({ t: "Le jardinier a planté trois arbres.", f: false }),
  () => ({ t: "Trois étoiles brillent dans le ciel.", f: true }),
  (e) => ({ t: `${e.n} a dessiné trois points rouges.`, f: false }),
  () => ({ t: "Le pirate a marqué trois trésors sur sa carte.", f: false }),
  () => ({ t: "Trois poissons nagent dans l'aquarium.", f: false }),
  (e) => ({ t: `${e.n} a posé trois cailloux sur le sable.`, f: false }),
];

/* ─── Le quadrillage ───────────────────────────────────────────────────── */

const LIGNES = 7;
const COLONNES = 9;

function quadrillage(cells: [number, number][], chemin?: [number, number][]): FigureLibreCanvasData {
  return {
    kind: "figure_libre",
    size: { cellSize: 28, padding: 14 },
    grid: { rows: LIGNES, cols: COLONNES, filledCells: cells },
    perimeterPath: chemin,
    display: {
      showGrid: true,
      showFilled: cells.length > 0,
      showCellLabels: false,
      showPerimeter: !!chemin,
      showVertices: false,
      showVertexLabels: false,
    },
  };
}

function rectangleDeCarreaux(l: number, h: number): [number, number][] {
  const r0 = randomInt(0, LIGNES - h);
  const c0 = randomInt(0, COLONNES - l);
  const cells: [number, number][] = [];
  for (let r = r0; r < r0 + h; r++) for (let c = c0; c < c0 + l; c++) cells.push([r, c]);
  return cells;
}

/** Un dessin de carreaux d'un seul tenant, grandi au hasard. */
function dessinDeCarreaux(n: number): [number, number][] {
  const cle = (r: number, c: number) => `${r},${c}`;
  const pris = new Map<string, [number, number]>();
  const r0 = randomInt(2, 4);
  const c0 = randomInt(3, 5);
  pris.set(cle(r0, c0), [r0, c0]);
  let essais = 0;
  while (pris.size < n && essais++ < 500) {
    const [r, c] = randomChoice([...pris.values()]);
    const [dr, dc] = randomChoice([
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]);
    const nr = r + dr;
    const nc = c + dc;
    if (nr < 0 || nr >= LIGNES || nc < 0 || nc >= COLONNES) continue;
    if (!pris.has(cle(nr, nc))) pris.set(cle(nr, nc), [nr, nc]);
  }
  return [...pris.values()];
}

export const figuresSolidesBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_FIGURE_RECONNAITRE — disque, carré, rectangle, triangle
     ★2 : la figure bien posée · ★3 : la description · ★4 : penchée
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_figure_reconnaitre_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Une figure a 4 côtés tous de la même longueur. Quelle figure est-ce ?",
    format: "qcm",
    choices: ["un carré", "un rectangle", "un triangle", "un disque"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "Compte les côtés, puis regarde s'ils sont tous pareils.",
    explanation: exp(
      "On reconnait une figure à son nombre de côtés et à la longueur de ces côtés.",
      "On compte d'abord les côtés, puis on compare leurs longueurs.",
      "4 côtés tous égaux : c'est un carré. Le rectangle a aussi 4 côtés, mais 2 longs et 2 courts. Le triangle en a 3. Le disque n'a pas de côté : son bord est tout rond.",
      "C'est un carré.",
    ),
    tags: ["cp", "figures_solides", "figure_reconnaitre", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "cp_figure_reconnaitre_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les côtés. Sont-ils tous pareils ?",
    tags: ["cp", "figures_solides", "figure_reconnaitre", "template", "canvas"],
    generate: () => {
      const f = randomChoice(TOUTES_FIGS);
      const bonne = NOM_FIG[f];
      return {
        text: `${scene()} ${randomChoice(TOURNURES_NOM)}`,
        format: "qcm",
        choices: shuffle(TOUTES_FIGS.map((x) => NOM_FIG[x])),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "On reconnait une figure à ses côtés et à ses sommets.",
          "On compte les côtés, puis on regarde s'ils ont la même longueur.",
          `Cette figure a ${DESCRIPTION[f]} : c'est ${bonne}.`,
          `C'est ${bonne}.`,
        ),
        canvas: figurePlane(f, petitAngle()),
      };
    },
  },
  {
    kind: "template",
    id: "cp_figure_reconnaitre_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde bien le dessin, puis compte ses côtés.",
    tags: ["cp", "figures_solides", "figure_reconnaitre", "template", "canvas"],
    generate: () => {
      const f = randomChoice(TOUTES_FIGS);
      const e = enfant();
      // Le nom annoncé : souvent la confusion d'enfant (carré ↔ rectangle).
      const voisin: Record<FigPlane, FigPlane> = {
        carre: "rectangle",
        rectangle: "carre",
        triangle: "carre",
        disque: "carre",
      };
      const dit = randomChoice<FigPlane>([f, f, voisin[f], randomChoice(TOUTES_FIGS)]);
      const bonne = dit === f ? `oui, c'est ${NOM_FIG[f]}` : `non, c'est ${NOM_FIG[f]}`;
      const leurres = [
        ...(dit === f ? [] : [`oui, c'est ${NOM_FIG[dit]}`]),
        ...TOUTES_FIGS.filter((x) => x !== f).map((x) => `non, c'est ${NOM_FIG[x]}`),
      ];
      return {
        text: `${e.n} regarde cette figure. ${cap(il(e))} dit : « C'est ${NOM_FIG[dit]}. » A-t-${il(e)} raison ?`,
        format: "qcm",
        choices: makeChoices(bonne, leurres),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "On reconnait une figure à ses côtés et à ses sommets.",
          "On compte les côtés du dessin, puis on compare leurs longueurs.",
          `Le dessin a ${DESCRIPTION[f]} : c'est ${NOM_FIG[f]}.${dit === f ? ` ${e.n} a raison.` : ` ${e.n} se trompe.`}`,
          `Réponse : ${bonne}.`,
        ),
        canvas: figurePlane(f, petitAngle()),
      };
    },
  },
  {
    kind: "template",
    id: "cp_figure_reconnaitre_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les côtés d'abord.",
    tags: ["cp", "figures_solides", "figure_reconnaitre", "template"],
    generate: () => {
      const INDICES: Record<FigPlane, string[]> = {
        triangle: ["3 côtés", "3 sommets", "3 côtés et 3 sommets", "3 pointes"],
        carre: ["4 côtés tous pareils", "4 côtés de la même longueur", "4 sommets et 4 côtés égaux"],
        rectangle: ["4 côtés : 2 longs et 2 courts", "2 grands côtés et 2 petits côtés"],
        disque: ["un bord tout rond", "un bord rond, sans côté", "un bord rond, sans sommet"],
      };
      const f = randomChoice(TOUTES_FIGS);
      const indice = randomChoice(INDICES[f]);
      const e = enfant();
      const forme = randomChoice([
        `Devinette de ${e.n} : « J'ai ${indice}. Qui suis-je ? »`,
        `${e.n} pense à une figure. Elle a ${indice}. Laquelle ?`,
        `Pic cherche une figure avec ${indice}. Laquelle ?`,
        `Quelle figure a ${indice} ?`,
        `${e.n} dessine une figure qui a ${indice}. Laquelle ?`,
      ]);
      return {
        text: forme,
        format: "qcm",
        choices: shuffle(TOUTES_FIGS.map((x) => NOM_FIG[x])),
        expected: [NOM_FIG[f]],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque figure se reconnait à son nombre de côtés et de sommets.",
          "On compte les côtés, puis on regarde s'ils ont tous la même longueur.",
          `${cap(indice)} : c'est ${NOM_FIG[f]}.`,
          `C'est ${NOM_FIG[f]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_figure_reconnaitre_tpl_4",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les côtés du dessin, puis compare leurs longueurs.",
    tags: ["cp", "figures_solides", "figure_reconnaitre", "template", "canvas"],
    generate: () => {
      const f = randomChoice(TOUTES_FIGS);
      const bonne = DESCRIPTION[f];
      return {
        text: `${scene()} ${randomChoice([
          "Qu'est-ce qui décrit cette figure ?",
          "Que peux-tu dire de cette figure ?",
          "Quelle phrase va avec ce dessin ?",
        ])}`,
        format: "qcm",
        choices: shuffle(TOUTES_FIGS.map((x) => DESCRIPTION[x])),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une figure se décrit avec ses côtés et ses sommets.",
          "On compte les côtés, puis on compare leurs longueurs.",
          `Sur le dessin, on voit ${NOM_FIG[f]} : il a ${bonne}.`,
          `Cette figure a ${bonne}.`,
        ),
        canvas: figurePlane(f, petitAngle()),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_figure_reconnaitre_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "On pose un carré sur une de ses pointes. Est-ce encore un carré ?",
    format: "qcm",
    choices: [
      "oui, il a toujours 4 côtés de la même longueur",
      "non, il est devenu une autre figure",
      "non, un carré doit être bien droit",
      "on ne peut pas savoir",
    ],
    expected: ["oui, il a toujours 4 côtés de la même longueur"],
    comparator: "mcq_exact",
    hint: "Tourner une figure ne change ni ses côtés ni ses coins.",
    explanation: exp(
      "Une figure garde son nom quand on la tourne : ce sont ses côtés et ses sommets qui comptent.",
      "On compte les côtés et on compare leurs longueurs, sans regarder comment elle est posée.",
      "Penché ou non, il a toujours 4 côtés de la même longueur : c'est toujours un carré. On peut tourner la feuille pour le voir.",
      "Oui, c'est toujours un carré.",
    ),
    tags: ["cp", "figures_solides", "figure_reconnaitre", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_figure_reconnaitre_tpl_5",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    hint: "Tourne la tête (ou la feuille) : la figure ne change pas.",
    tags: ["cp", "figures_solides", "figure_reconnaitre", "piege", "template", "canvas"],
    generate: () => {
      const f = randomChoice<FigPlane>(["carre", "rectangle", "triangle"]);
      const bonne = NOM_FIG[f];
      return {
        text: `${randomChoice(["Attention, elle est penchée !", "La figure est tournée.", "Elle est posée de travers."])} ${scene()} ${randomChoice(TOURNURES_NOM)}`,
        format: "qcm",
        choices: shuffle(TOUTES_FIGS.map((x) => NOM_FIG[x])),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une figure garde son nom quand on la tourne.",
          "On oublie comment elle est posée : on compte ses côtés et on compare leurs longueurs.",
          `Même penchée, cette figure a ${DESCRIPTION[f]} : c'est ${bonne}.`,
          `C'est ${bonne}.`,
        ),
        canvas: figurePlane(f, grandAngle()),
      };
    },
  },
  {
    kind: "template",
    id: "cp_figure_reconnaitre_tpl_6",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    hint: "Tourner la feuille ne change pas les côtés.",
    tags: ["cp", "figures_solides", "figure_reconnaitre", "piege", "template", "canvas"],
    generate: () => {
      const f = randomChoice<FigPlane>(["carre", "rectangle", "triangle"]);
      const e = enfant();
      const bonne = `non, c'est toujours ${NOM_FIG[f]}`;
      const leurres = TOUTES_FIGS.filter((x) => x !== f).map((x) => `oui, c'est devenu ${NOM_FIG[x]}`);
      const geste = randomChoice([
        "a tourné sa feuille",
        "a fait pivoter son dessin",
        "a penché sa forme en carton",
        "a posé sa forme de travers",
      ]);
      return {
        text: `${e.n} ${geste}. Voici sa figure. A-t-elle changé de nom ?`,
        format: "qcm",
        choices: makeChoices(bonne, leurres),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une figure garde son nom quand on la tourne.",
          "On compte ses côtés et on compare leurs longueurs.",
          `La figure a toujours ${DESCRIPTION[f]} : c'est toujours ${NOM_FIG[f]}.`,
          `Elle n'a pas changé : c'est ${NOM_FIG[f]}.`,
        ),
        canvas: figurePlane(f, grandAngle()),
      };
    },
  },

  /* =========================================================
     CP_FIGURE_DECRIRE — les mots côté et sommet
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_figure_decrire_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_decrire",
    difficulty: 2,
    theme: "neutral",
    text: "Combien un triangle a-t-il de sommets ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Un sommet, c'est une pointe : là où deux côtés se rejoignent.",
    explanation: exp(
      "Un sommet est le point où deux côtés se rejoignent : c'est une pointe de la figure.",
      "On suit le contour de la figure et on compte les pointes.",
      "Un triangle a 3 côtés. Chaque fois que deux côtés se rejoignent, cela fait une pointe : 3 sommets.",
      "Un triangle a 3 sommets.",
    ),
    tags: ["cp", "figures_solides", "figure_decrire", "definition"],
  },
  {
    kind: "template",
    id: "cp_figure_decrire_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_decrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Autant de sommets que de côtés.",
    tags: ["cp", "figures_solides", "figure_decrire", "template"],
    generate: () => {
      const f = randomChoice<FigPlane>(["triangle", "carre", "rectangle"]);
      const mot = NOM_FIG[f].replace("un ", "");
      const cherche = randomChoice(["côtés", "sommets"] as const);
      const e = enfant();
      const debut = randomChoice([
        `${e.n} dessine ${NOM_FIG[f]}.`,
        `${e.n} découpe ${NOM_FIG[f]} dans du papier.`,
        `Pic regarde ${NOM_FIG[f]}.`,
        `${e.n} trace ${NOM_FIG[f]} à la règle.`,
        `La maîtresse montre ${NOM_FIG[f]}.`,
        `${e.n} colle ${NOM_FIG[f]} sur son cahier.`,
        `Le pâtissier coupe un biscuit en forme de ${mot}.`,
      ]);
      const question = randomChoice([
        `Combien de ${cherche} a ce ${mot} ?`,
        `Compte ses ${cherche}. Combien y en a-t-il ?`,
        `Combien a-t-il de ${cherche} ?`,
      ]);
      return {
        text: `${debut} ${question}`,
        format: "short",
        expected: [String(COTES[f])],
        comparator: "number_equal",
        explanation: exp(
          "Dans une figure fermée, il y a autant de sommets que de côtés.",
          "On suit le contour en comptant, sans revenir en arrière.",
          `${cap(NOM_FIG[f])} a ${COTES[f]} côtés, donc aussi ${COTES[f]} sommets.`,
          `Il en a ${COTES[f]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_figure_decrire_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_decrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Mets ton doigt sur une pointe et fais le tour en comptant.",
    tags: ["cp", "figures_solides", "figure_decrire", "template", "canvas"],
    generate: () => {
      const f = randomChoice<FigPlane>(["triangle", "carre", "rectangle"]);
      const cherche = randomChoice(["côtés", "sommets", "pointes"] as const);
      return {
        text: `${scene()} ${randomChoice([
          `Combien de ${cherche} a cette figure ?`,
          `Compte ses ${cherche}. Combien en vois-tu ?`,
          `Combien de ${cherche} comptes-tu ?`,
        ])}`,
        format: "short",
        expected: [String(COTES[f])],
        comparator: "number_equal",
        explanation: exp(
          "Un côté est un trait droit du bord. Un sommet est une pointe, là où deux côtés se rejoignent.",
          "On pose le doigt sur une pointe et on fait le tour en comptant.",
          `Cette figure est ${NOM_FIG[f]} : ${COTES[f]} côtés et ${COTES[f]} sommets.`,
          `Il y en a ${COTES[f]}.`,
        ),
        canvas: figurePlane(f, petitAngle()),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_figure_decrire_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_decrire",
    difficulty: 3,
    theme: "neutral",
    text: "Qu'est-ce qu'un SOMMET dans une figure ?",
    format: "qcm",
    choices: [
      "le point où deux côtés se rejoignent",
      "le côté le plus long",
      "le haut de la figure",
      "le milieu de la figure",
    ],
    expected: ["le point où deux côtés se rejoignent"],
    comparator: "mcq_exact",
    hint: "Ce n'est pas forcément en haut : il y en a tout autour.",
    explanation: exp(
      "Un sommet est le point de rencontre de deux côtés.",
      "On suit le contour et on s'arrête à chaque pointe.",
      "Le mot fait penser au sommet d'une montagne. Mais en géométrie, un carré a un sommet à chacun de ses quatre coins, même en bas.",
      "Un sommet, c'est le point où deux côtés se rejoignent.",
    ),
    tags: ["cp", "figures_solides", "figure_decrire", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "cp_figure_decrire_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_decrire",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les côtés, puis les sommets, puis ajoute.",
    tags: ["cp", "figures_solides", "figure_decrire", "template", "canvas"],
    generate: () => {
      const f = randomChoice<FigPlane>(["triangle", "carre", "rectangle"]);
      const total = COTES[f] * 2;
      const e = enfant();
      const consigne = randomChoice([
        `${e.n} compte les côtés, puis les sommets. Combien en tout ?`,
        `Côtés et sommets ensemble : combien ${e.n} en trouve-t-${il(e)} ?`,
        `Pic veut une graine par côté et une par sommet. Combien de graines ?`,
        `${e.n} met une gommette sur chaque côté et chaque sommet. Combien de gommettes ?`,
      ]);
      return {
        text: `${randomChoice(["Regarde cette figure.", "Voici une figure.", "Observe ce dessin."])} ${consigne}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une figure fermée a autant de sommets que de côtés.",
          "On compte les côtés, puis les sommets, puis on ajoute.",
          `C'est ${NOM_FIG[f]} : ${COTES[f]} côtés et ${COTES[f]} sommets. ${COTES[f]} + ${COTES[f]} = ${total}.`,
          `En tout : ${total}.`,
        ),
        canvas: figurePlane(f, petitAngle()),
      };
    },
  },
  {
    kind: "template",
    id: "cp_figure_decrire_tpl_4",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_decrire",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les côtés de chaque figure, puis compare.",
    tags: ["cp", "figures_solides", "figure_decrire", "template"],
    generate: () => {
      const [a, b] = deuxEnfants();
      const fa = randomChoice<FigPlane>(["triangle", "carre", "rectangle"]);
      const fb = randomChoice<FigPlane>(["triangle", "carre", "rectangle"].filter((x) => x !== fa) as FigPlane[]);
      const cherche = randomChoice(["côtés", "sommets"] as const);
      const verbe = randomChoice(["dessine", "découpe", "trace", "colle"]);
      const bonne = COTES[fa] === COTES[fb] ? "autant tous les deux" : COTES[fa] > COTES[fb] ? a.n : b.n;
      return {
        text: `${a.n} ${verbe} ${NOM_FIG[fa]}. ${b.n} ${verbe} ${NOM_FIG[fb]}. Qui a le plus de ${cherche} ?`,
        format: "qcm",
        choices: shuffle([a.n, b.n, "autant tous les deux"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le triangle a 3 côtés et 3 sommets. Le carré et le rectangle en ont 4.",
          "On compte les côtés de chaque figure, puis on compare.",
          `${cap(NOM_FIG[fa])} : ${COTES[fa]} ${cherche}. ${cap(NOM_FIG[fb])} : ${COTES[fb]} ${cherche}.`,
          `Réponse : ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_SOLIDE_RECONNAITRE — cube, boule, cône, cylindre, pavé
  ========================================================= */
  {
    kind: "template",
    id: "cp_solide_reconnaitre_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Pense à la forme de l'objet dans ta main.",
    tags: ["cp", "figures_solides", "solide_reconnaitre", "template"],
    generate: () => {
      const s = randomChoice(TOUS_SOL);
      const objet = randomChoice(OBJETS_SOL[s]);
      const e = enfant();
      const text = randomChoice([
        `${cap(objet)} a la forme de quel solide ?`,
        `${e.n} joue avec ${objet}. Quelle est sa forme ?`,
        `À quel solide ressemble ${objet} ?`,
        `${e.n} a trouvé ${objet}. C'est quel solide ?`,
        `Pic regarde ${objet}. Quel solide voit-il ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(NOM_SOL[s], TOUS_SOL.filter((x) => x !== s).map((x) => NOM_SOL[x])),
        expected: [NOM_SOL[s]],
        comparator: "mcq_exact",
        explanation: exp(
          "On retrouve les solides dans les objets qui nous entourent.",
          "On compare la forme de l'objet à celle des solides connus.",
          `${cap(objet)} a la forme d'${NOM_SOL[s]}.`,
          `C'est ${NOM_SOL[s]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_solide_reconnaitre_tpl_4",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Est-il tout rond ? Ses faces sont-elles toutes pareilles ?",
    tags: ["cp", "figures_solides", "solide_reconnaitre", "template", "canvas"],
    generate: () => {
      // ★2 : les trois solides que le CP NOMME.
      const s = randomChoice<Sol>(["cube", "pave_droit", "boule"]);
      return {
        text: `${sceneSol()} ${randomChoice(["Quel est ce solide ?", "Comment s'appelle ce solide ?", "Quel est son nom ?"])}`,
        format: "qcm",
        choices: shuffle(["un cube", "un pavé", "une boule"]),
        expected: [NOM_SOL[s]],
        comparator: "mcq_exact",
        explanation: exp(
          "La boule est toute ronde. Le cube a 6 faces carrées. Le pavé a des faces rectangles.",
          "On regarde si le solide roule, puis la forme de ses faces.",
          `Ce solide est ${NOM_SOL[s]}.`,
          `C'est ${NOM_SOL[s]}.`,
        ),
        canvas: solide(s),
      };
    },
  },
  {
    kind: "template",
    id: "cp_solide_reconnaitre_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde ses faces : plates, rondes, carrées ?",
    tags: ["cp", "figures_solides", "solide_reconnaitre", "template", "canvas"],
    generate: () => {
      const s = randomChoice(TOUS_SOL);
      return {
        text: `${sceneSol()} ${randomChoice(["Quel est ce solide ?", "Comment s'appelle ce solide ?", "Quel solide vois-tu ?", "Reconnais-tu ce solide ?"])}`,
        format: "qcm",
        choices: makeChoices(NOM_SOL[s], TOUS_SOL.filter((x) => x !== s).map((x) => NOM_SOL[x])),
        expected: [NOM_SOL[s]],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque solide se reconnait à la forme de ses faces.",
          "On regarde si les faces sont plates ou rondes, et leur forme.",
          `Ce solide est ${NOM_SOL[s]}.`,
          `C'est ${NOM_SOL[s]}.`,
        ),
        canvas: solide(s),
      };
    },
  },
  {
    kind: "template",
    id: "cp_solide_reconnaitre_tpl_5",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Imagine chaque objet dans ta main.",
    tags: ["cp", "figures_solides", "solide_reconnaitre", "template", "canvas"],
    generate: () => {
      const s = randomChoice(TOUS_SOL);
      const bonne = randomChoice(OBJETS_SOL[s]);
      const autres = shuffle(TOUS_SOL.filter((x) => x !== s)).slice(0, 3).map((x) => randomChoice(OBJETS_SOL[x]));
      const e = enfant();
      return {
        text: randomChoice([
          "Regarde ce solide. Quel objet a la même forme ?",
          `${e.n} cherche un objet de cette forme. Lequel ?`,
          `Voici un solide. Quel objet lui ressemble ?`,
          `Pic veut un objet de cette forme. Lequel choisir ?`,
        ]),
        format: "qcm",
        choices: makeChoices(bonne, autres),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "On retrouve les solides dans les objets de tous les jours.",
          "On reconnait le solide, puis on cherche l'objet qui a la même forme.",
          `Le dessin montre ${NOM_SOL[s]}. ${cap(bonne)} a aussi la forme d'${NOM_SOL[s]}.`,
          `C'est ${bonne}.`,
        ),
        canvas: solide(s),
      };
    },
  },
  {
    kind: "template",
    id: "cp_solide_reconnaitre_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    hint: "Un solide roule s'il a une partie ronde.",
    tags: ["cp", "figures_solides", "solide_reconnaitre", "template"],
    generate: () => {
      // Le tri par critère visuel, que le BO installe au CP : « répartition en
      // deux groupes en fonction d'un critère donné ».
      const chercheRoule = randomChoice([true, false]);
      const bons = TOUS_SOL.filter((x) => ROULE[x] === chercheRoule);
      const mauvais = TOUS_SOL.filter((x) => ROULE[x] !== chercheRoule);
      const s = randomChoice(bons);
      const parObjets = randomChoice([true, false]);
      const nom = (x: Sol) => (parObjets ? randomChoice(OBJETS_SOL[x]) : NOM_SOL[x]);
      const bonne = nom(s);
      const leurres = shuffle(mauvais).map(nom);
      const e = enfant();
      const quoi = parObjets ? "objet" : "solide";
      const text = chercheRoule
        ? randomChoice([
            `Quel ${quoi} PEUT rouler ?`,
            `${e.n} veut faire rouler un ${quoi}. Lequel choisir ?`,
            `Sur la pente, quel ${quoi} peut rouler ?`,
          ])
        : randomChoice([
            `Quel ${quoi} ne peut PAS rouler du tout ?`,
            `${e.n} veut un ${quoi} qui ne roule pas. Lequel ?`,
            `Sur la pente, quel ${quoi} ne roule jamais ?`,
          ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne, leurres),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "On trie les solides selon ce qu'ils ont de rond ou de plat.",
          "On regarde s'il a une partie arrondie qui peut toucher la table.",
          chercheRoule
            ? `${cap(bonne)} a une partie ronde : il peut rouler. Le cube et le pavé n'ont que des faces plates.`
            : `${cap(bonne)} n'a que des faces plates : il ne roule jamais. La boule, le cylindre et le cône ont une partie ronde.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_solide_reconnaitre_tpl_6",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche une partie ronde sur le dessin.",
    tags: ["cp", "figures_solides", "solide_reconnaitre", "template", "canvas"],
    generate: () => {
      const s = randomChoice(TOUS_SOL);
      const e = enfant();
      const bonne = ROULE[s] ? "oui, il a une partie ronde" : "non, ses faces sont toutes plates";
      return {
        text: randomChoice([
          `${e.n} pose ce solide sur une pente. Peut-il rouler ?`,
          `Ce solide peut-il rouler sur la table ?`,
          `${e.n} pousse ce solide du doigt. Peut-il rouler ?`,
          `Pic donne un coup de bec dans ce solide. Peut-il rouler ?`,
        ]),
        format: "qcm",
        choices: shuffle([
          "oui, il a une partie ronde",
          "non, ses faces sont toutes plates",
          ROULE[s] ? "non, il est trop lourd" : "oui, tous les solides roulent",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un solide qui a une partie ronde peut rouler. Un solide aux faces toutes plates glisse, mais ne roule pas.",
          "On cherche une partie arrondie sur le dessin.",
          `Ce solide est ${NOM_SOL[s]} : ${ROULE[s] ? "il a une partie ronde, il peut rouler" : "toutes ses faces sont plates, il ne roule pas"}.`,
          `Réponse : ${bonne}.`,
        ),
        canvas: solide(s),
      };
    },
  },

  /* =========================================================
     CP_SOLIDE_FACES — le nombre et la nature des faces
     ⛔ On ne parle QUE de faces : arête et sommet sont au CE1.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_solide_faces_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_faces",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de faces a un cube ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Pense à un dé : dessus, dessous, et les quatre côtés.",
    explanation: exp(
      "Une face est une surface plate d'un solide.",
      "On compte le dessus, le dessous, puis les faces tout autour.",
      "Sur un dé : 1 face dessus, 1 face dessous, et 4 faces autour. Cela fait 6 faces : voilà pourquoi un dé va de 1 à 6.",
      "Un cube a 6 faces.",
    ),
    tags: ["cp", "figures_solides", "solide_faces", "definition"],
  },
  {
    kind: "template",
    id: "cp_solide_faces_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_faces",
    difficulty: 2,
    theme: "neutral",
    hint: "Dessus, dessous, et 4 tout autour. Certaines faces sont cachées !",
    tags: ["cp", "figures_solides", "solide_faces", "template", "canvas"],
    generate: () => {
      const s = randomChoice<Sol>(["cube", "pave_droit"]);
      const e = enfant();
      const text = randomChoice([
        `${e.n} colle une gommette sur chaque face. Combien de gommettes ?`,
        `${e.n} peint chaque face d'une couleur. Combien de couleurs ?`,
        `Combien de faces a ce solide ? Compte aussi les faces cachées.`,
        `Pic pose une graine sur chaque face. Combien de graines ?`,
        `${e.n} dessine une étoile sur chaque face. Combien d'étoiles ?`,
        `Le menuisier ponce chaque face. Combien de faces ponce-t-il ?`,
      ]);
      return {
        text,
        format: "short",
        expected: ["6"],
        comparator: "number_equal",
        explanation: exp(
          "Une face est une surface plate du solide. Certaines sont cachées derrière.",
          "On compte le dessus, le dessous, puis les faces tout autour.",
          `${cap(NOM_SOL[s])} a 1 face dessus, 1 dessous et 4 autour : 6 faces.`,
          "Il y a 6 faces.",
        ),
        canvas: solide(s),
      };
    },
  },
  {
    kind: "template",
    id: "cp_solide_faces_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_faces",
    difficulty: 2,
    theme: "neutral",
    hint: "Dessus, dessous, et tout autour.",
    tags: ["cp", "figures_solides", "solide_faces", "template"],
    generate: () => {
      const s = randomChoice<Sol>(["cube", "pave_droit"]);
      const objet = randomChoice(OBJETS_SOL[s]);
      const e = enfant();
      const text = randomChoice([
        `${e.n} peint chaque face d'${objet}. Combien de faces peint-${il(e)} ?`,
        `Combien de faces a ${objet} ?`,
        `${e.n} colle une gommette sur chaque face d'${objet}. Combien de gommettes ?`,
        `Pic pose une graine sur chaque face d'${objet}. Combien de graines ?`,
      ]);
      return {
        text,
        format: "short",
        expected: ["6"],
        comparator: "number_equal",
        explanation: exp(
          "Une face est une surface plate du solide.",
          "On compte le dessus, le dessous, puis les faces autour.",
          `${cap(objet)} a la forme d'${NOM_SOL[s]} : 1 face dessus, 1 dessous, 4 autour. 6 faces.`,
          "Il y a 6 faces.",
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_solide_faces_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_faces",
    difficulty: 3,
    theme: "neutral",
    text: "Les faces d'un cube, quelle forme ont-elles ?",
    format: "qcm",
    choices: ["des carrés", "des rectangles allongés", "des triangles", "des disques"],
    expected: ["des carrés"],
    comparator: "mcq_exact",
    hint: "Sur un dé, toutes les faces sont exactement pareilles.",
    explanation: exp(
      "Chaque face d'un solide a une forme qu'on peut nommer.",
      "On regarde une face bien en face, comme si on la dessinait.",
      "Toutes les faces d'un cube sont des carrés identiques. Le pavé, lui, a des faces rectangles.",
      "Les faces d'un cube sont des carrés.",
    ),
    tags: ["cp", "figures_solides", "solide_faces", "qcm"],
  },
  {
    kind: "template",
    id: "cp_solide_faces_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_faces",
    difficulty: 3,
    theme: "neutral",
    hint: "Imagine une face posée à plat sur la table.",
    tags: ["cp", "figures_solides", "solide_faces", "template", "canvas"],
    generate: () => {
      const s = randomChoice<Sol>(["cube", "pave_droit"]);
      const forme = s === "cube" ? "des carrés" : "des rectangles";
      const e = enfant();
      const text = randomChoice([
        `${e.n} pose ce solide sur la peinture. Quelle trace laisse une face ?`,
        `Quelle forme ont les faces de ce solide ?`,
        `${e.n} dessine le tour de chaque face. Que dessine-t-${il(e)} ?`,
        `Pic regarde les faces de ce solide. Quelle forme ont-elles ?`,
        `${e.n} découpe les faces de ce solide. Que découpe-t-${il(e)} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(["des carrés", "des rectangles", "des triangles", "des disques"]),
        expected: [forme],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque face d'un solide a une forme qu'on sait nommer.",
          "On imagine une face posée à plat sur la table.",
          s === "cube"
            ? "C'est un cube : ses 6 faces sont des carrés tous pareils."
            : "C'est un pavé : ses faces sont des rectangles.",
          `Ce sont ${forme}.`,
        ),
        canvas: solide(s),
      };
    },
  },
  {
    kind: "template",
    id: "cp_solide_faces_tpl_4",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_faces",
    difficulty: 3,
    theme: "neutral",
    hint: "Pense à un dé, une boîte à chaussures et un ballon.",
    tags: ["cp", "figures_solides", "solide_faces", "template"],
    generate: () => {
      const cas = randomChoice([
        { indice: "6 faces, toutes des carrés pareils", bonne: "un cube" },
        { indice: "6 faces, et ce sont des rectangles", bonne: "un pavé" },
        { indice: "aucune face plate", bonne: "une boule" },
        { indice: "des faces carrées, comme un dé", bonne: "un cube" },
        { indice: "des faces rectangles, comme une boîte", bonne: "un pavé" },
      ]);
      const e = enfant();
      const text = randomChoice([
        `Quel solide a ${cas.indice} ?`,
        `Devinette de ${e.n} : « J'ai ${cas.indice}. Qui suis-je ? »`,
        `${e.n} cherche un solide avec ${cas.indice}. Lequel ?`,
        `Pic pense à un solide. Il a ${cas.indice}. Lequel ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(["un cube", "un pavé", "une boule"]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le cube a 6 faces carrées. Le pavé a 6 faces rectangles. La boule n'a aucune face plate.",
          "On compare l'indice à chaque solide.",
          `${cap(cas.indice)} : c'est ${cas.bonne}.`,
          `C'est ${cas.bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_FIGURE_ALIGNEMENT — l'œil se trompe, la règle tranche
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_figure_alignement_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_alignement",
    difficulty: 3,
    theme: "neutral",
    text: "Combien faut-il de points pour tracer une droite avec la règle ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Avec un seul point, la règle peut tourner dans tous les sens.",
    explanation: exp(
      "Une droite est décidée par deux points.",
      "On pose la règle contre les deux points, puis on trace.",
      "Avec un seul point, la règle tourne autour : on peut tracer plein de droites. Avec deux points, il n'y en a plus qu'une.",
      "Il faut 2 points.",
    ),
    tags: ["cp", "figures_solides", "figure_alignement", "definition"],
  },
  {
    kind: "template",
    id: "cp_figure_alignement_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_alignement",
    difficulty: 3,
    theme: "neutral",
    hint: "Couchée comme le lit, debout comme la porte, ou penchée ?",
    tags: ["cp", "figures_solides", "figure_alignement", "template", "canvas"],
    generate: () => {
      const d = directionAuHasard();
      const c = { x: 170, y: 120 };
      const SENS = {
        couchee: "couchée, comme la ligne du cahier",
        debout: "debout, comme le bord de la porte",
        penchee: "penchée, ni couchée ni debout",
      } as const;
      const bonne = SENS[d.sens];
      const e = enfant();
      const text = randomChoice([
        `${e.n} a tracé cette droite à la règle. Comment est-elle ?`,
        `Pic s'est posé sur ce fil tendu. Comment est le fil ?`,
        `Voici une droite. Comment est-elle posée ?`,
        `${e.n} a tendu cette ficelle. Comment est-elle ?`,
        `Le peintre a tracé ce trait. Comment est-il posé ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(Object.values(SENS)),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une droite peut être couchée (horizontale), debout (verticale) ou penchée (oblique). C'est toujours une droite.",
          "On compare le trait au bord de la feuille.",
          `Ce trait est ${bonne}.`,
          `Elle est ${bonne.split(",")[0]}.`,
        ),
        canvas: pointsDroites([], [{ from: { x: c.x - 60 * d.dx, y: c.y - 60 * d.dy }, to: { x: c.x + 60 * d.dx, y: c.y + 60 * d.dy } }]),
      };
    },
  },
  {
    kind: "template",
    id: "cp_figure_alignement_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_alignement",
    difficulty: 3,
    theme: "neutral",
    hint: "Peut-on passer par les trois avec un seul trait droit ?",
    tags: ["cp", "figures_solides", "figure_alignement", "template", "canvas"],
    generate: () => {
      const alignes = randomChoice([true, false]);
      const { pts } = troisPoints(alignes ? 0 : randomInt(40, 60));
      const sc = randomChoice(SCENES_POINTS)(enfant());
      const ils = sc.f ? "elles" : "ils";
      const oui = `oui, ${ils} sont aligné${sc.f ? "e" : ""}s`;
      const non = `non, ${ils} ne sont pas aligné${sc.f ? "e" : ""}s`;
      const bonne = alignes ? oui : non;
      return {
        text: `${sc.t} ${randomChoice([
          `Sont-${ils} aligné${sc.f ? "e" : ""}s ?`,
          `Sont-${ils} sur une même ligne droite ?`,
          "Un trait droit peut-il passer par les trois ?",
        ])}`,
        format: "qcm",
        choices: shuffle([oui, non]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Trois points sont alignés quand une même droite passe par les trois.",
          "On pose la règle sur deux points et on regarde le troisième.",
          alignes ? "La règle posée sur deux points touche aussi le troisième." : "La règle posée sur deux points laisse le troisième à côté.",
          `Réponse : ${bonne}.`,
        ),
        canvas: pointsDroites(pts),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_figure_alignement_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_alignement",
    difficulty: 4,
    theme: "neutral",
    text: "Trois points ont l'air alignés, mais tu n'en es pas sûr. Comment le vérifier ?",
    format: "qcm",
    choices: [
      "avec la règle posée sur deux points",
      "en les regardant de plus près",
      "en mesurant leur distance",
      "en les reliant à main levée",
    ],
    expected: ["avec la règle posée sur deux points"],
    comparator: "mcq_exact",
    hint: "L'œil se trompe. La règle, non.",
    explanation: exp(
      "Trois points sont alignés quand une même droite passe par les trois.",
      "On pose le bord de la règle sur deux des points, puis on regarde le troisième.",
      "À l'œil, un point un peu décalé passe inaperçu. Avec la règle, on voit tout de suite s'il la touche.",
      "On pose la règle sur deux points et on regarde le troisième.",
    ),
    tags: ["cp", "figures_solides", "figure_alignement", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_figure_alignement_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_alignement",
    difficulty: 4,
    theme: "neutral",
    hint: "Le trait bleu est la règle. Le point vert la touche-t-il ?",
    tags: ["cp", "figures_solides", "figure_alignement", "piege", "template", "canvas"],
    generate: () => {
      const alignes = randomChoice([true, false]);
      // ⚠️ Le décalage reste VISIBLE contre le trait (≥ 14 px) : c'est la règle
      // qui le montre, pas l'œil seul.
      const { pts, k } = troisPoints(alignes ? 0 : randomInt(14, 22));
      const autres = pts.filter((_, i) => i !== k);
      const e = enfant();
      const [objet, fem] = randomChoice([
        ["piquets", false],
        ["plots", false],
        ["cailloux", false],
        ["graines", true],
        ["gommettes", true],
        ["billes", true],
      ] as const);
      const oui = `oui, ${fem ? "elle" : "il"} touche la règle`;
      const non = `non, ${fem ? "elle" : "il"} est à côté`;
      const bonne = alignes ? oui : non;
      const vert = fem ? "La verte" : "Le vert";
      return {
        text: `${randomChoice([
          `${e.n} pose sa règle sur deux ${objet} rouges.`,
          `Le trait bleu passe par deux ${objet} rouges.`,
          `${e.n} trace un trait par deux ${objet} rouges.`,
        ])} ${randomChoice([`${vert} est-${fem ? "elle" : "il"} aligné${fem ? "e" : ""} avec ${fem ? "elles" : "eux"} ?`, `${vert} est-${fem ? "elle" : "il"} sur le trait ?`])}`,
        format: "qcm",
        choices: shuffle([oui, non]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Trois points sont alignés quand une même droite passe par les trois.",
          "La règle posée sur deux points : on regarde si le troisième la touche.",
          alignes ? "Le point vert est juste sur le trait : les trois sont alignés." : "Le point vert est un peu à côté du trait : ils ne sont pas alignés.",
          `Réponse : ${bonne}.`,
        ),
        canvas: pointsDroites(
          [...autres, { ...pts[k], color: "#16a34a" }],
          [{ from: autres[0], to: autres[1] }],
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_figure_alignement_tpl_4",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_alignement",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte seulement les points posés SUR le trait.",
    tags: ["cp", "figures_solides", "figure_alignement", "template", "canvas"],
    generate: () => {
      const d = directionAuHasard();
      const c = { x: 170, y: 120 };
      const n = { x: -d.dy, y: d.dx };
      const total = randomInt(4, 6);
      const dessus = randomInt(1, total - 1);
      const lesQuels = shuffle(Array.from({ length: total }, (_, i) => i < dessus));
      const pts = lesQuels.map((sur, i) => {
        const demi = d.dy === 0 ? 130 : d.dx === 0 ? 85 : 105;
        const t = -demi + (2 * demi * i) / (total - 1);
        const e = sur ? 0 : randomChoice([1, -1]) * randomInt(30, 45);
        return { x: Math.round(c.x + t * d.dx + e * n.x), y: Math.round(c.y + t * d.dy + e * n.y) };
      });
      const quoi = randomChoice([
        ["fourmis", "marchent près de la ligne", "sont sur la ligne"],
        ["oiseaux", "volent près du fil", "sont posés sur le fil"],
        ["perles", "sont près du fil", "sont sur le fil"],
        ["graines", "sont près du trait", "sont sur le trait"],
        ["coccinelles", "sont près de la ficelle", "sont sur la ficelle"],
        ["billes", "roulent près de la règle", "touchent la règle"],
        ["poissons", "nagent près de la ligne", "sont sur la ligne"],
        ["étoiles", "brillent près du trait", "sont sur le trait"],
        ["papillons", "volent près du fil", "sont sur le fil"],
        ["gommettes", "sont collées près du trait", "sont sur le trait"],
      ]);
      const e = enfant();
      const intro = randomChoice([
        `Des ${quoi[0]} ${quoi[1]}.`,
        `${e.n} voit des ${quoi[0]} qui ${quoi[1]}.`,
        `Regarde bien ces ${quoi[0]}.`,
      ]);
      const de = /^[aeéiouy]/.test(quoi[0]) ? "d'" : "de ";
      const question = randomChoice([`Combien ${quoi[2]} ?`, `Combien ${de}${quoi[0]} ${quoi[2]} ?`]);
      return {
        text: `${intro} ${question}`,
        format: "short",
        expected: [String(dessus)],
        comparator: "number_equal",
        explanation: exp(
          "Un point est sur la droite quand le trait passe exactement par lui.",
          "On suit le trait du doigt et on compte les points qu'il touche.",
          `Le trait touche ${dessus} point${dessus > 1 ? "s" : ""}. Les ${total - dessus} autres sont à côté.`,
          `Il y en a ${dessus}.`,
        ),
        canvas: pointsDroites(pts, [{ from: { x: c.x - 60 * d.dx, y: c.y - 60 * d.dy }, to: { x: c.x + 60 * d.dx, y: c.y + 60 * d.dy } }]),
      };
    },
  },

  /* =========================================================
     CP_FIGURE_TRACER — construire sur quadrillage
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_figure_tracer_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_tracer",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi est-il plus facile de tracer un carré sur du papier quadrillé ?",
    format: "qcm",
    choices: [
      "les lignes guident les côtés et les coins",
      "le papier quadrillé est plus solide",
      "on peut effacer plus facilement",
      "le carré est déjà dessiné",
    ],
    expected: ["les lignes guident les côtés et les coins"],
    comparator: "mcq_exact",
    hint: "Regarde les lignes du quadrillage : que font-elles aux coins ?",
    explanation: exp(
      "Le quadrillage est fait de lignes régulières qui se croisent.",
      "On suit les lignes du quadrillage pour tracer les côtés.",
      "En suivant les lignes, les côtés sont bien droits et les coins bien formés. Il suffit de compter le même nombre de carreaux sur chaque côté.",
      "Les lignes guident les côtés et les coins.",
    ),
    tags: ["cp", "figures_solides", "figure_tracer", "qcm"],
  },
  {
    kind: "template",
    id: "cp_figure_tracer_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un carré, tous les côtés ont le même nombre de carreaux.",
    tags: ["cp", "figures_solides", "figure_tracer", "template"],
    generate: () => {
      const cote = randomInt(2, 7);
      const e = enfant();
      const debut = randomChoice([
        `${e.n} trace un carré sur son cahier.`,
        `${e.n} dessine un carré sur le quadrillage.`,
        `Pic veut un nid carré sur le quadrillage.`,
        `${e.n} fait une fenêtre carrée pour son château.`,
        `La maîtresse trace un carré au tableau quadrillé.`,
        `${e.n} dessine un tapis carré pour sa poupée.`,
      ]);
      return {
        text: `${debut} Un côté fait ${cote} carreaux. ${randomChoice([
          "Et les autres côtés ?",
          "Combien pour chaque autre côté ?",
          "Combien de carreaux pour le côté d'en face ?",
        ])}`,
        format: "short",
        expected: [String(cote)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un carré, les quatre côtés ont la même longueur.",
          "On compte les carreaux du premier côté et on reporte le même nombre partout.",
          `Le premier côté fait ${cote} carreaux, donc les trois autres aussi.`,
          `${cote} carreaux chacun.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_figure_tracer_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les carreaux le long du côté, un par un.",
    tags: ["cp", "figures_solides", "figure_tracer", "template", "canvas"],
    generate: () => {
      const estCarre = randomChoice([true, false]);
      let l = randomInt(2, 7);
      let h = estCarre ? l : randomInt(2, 5);
      if (!estCarre && h === l) h = l > 2 ? l - 1 : l + 1;
      if (h > 6) h = 6;
      if (estCarre && l > 6) l = h = 6;
      const nom = l === h ? "ce carré" : "ce rectangle";
      const cote = randomChoice([
        { mot: "du bas", n: l },
        { mot: "du haut", n: l },
        { mot: "de gauche", n: h },
        { mot: "de droite", n: h },
      ]);
      const e = enfant();
      return {
        text: `${randomChoice([
          `${e.n} veut reproduire ${nom}.`,
          `${e.n} recopie ${nom} sur son cahier.`,
          `Pic veut refaire ${nom}.`,
          `${e.n} veut le même dessin que la maîtresse.`,
        ])} Combien de carreaux pour le côté ${cote.mot} ?`,
        format: "short",
        expected: [String(cote.n)],
        comparator: "number_equal",
        explanation: exp(
          "Sur un quadrillage, on mesure un côté en comptant les carreaux.",
          "On suit le côté et on compte les carreaux un par un.",
          `Le côté ${cote.mot} longe ${cote.n} carreaux.`,
          `Il faut ${cote.n} carreaux.`,
        ),
        canvas: quadrillage(rectangleDeCarreaux(l, h)),
      };
    },
  },
  {
    kind: "template",
    id: "cp_figure_tracer_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_tracer",
    difficulty: 4,
    theme: "neutral",
    hint: "Combien de côtés a la figure entière ? Enlève ceux déjà tracés.",
    tags: ["cp", "figures_solides", "figure_tracer", "template", "canvas"],
    generate: () => {
      const f = randomChoice<FigPlane>(["rectangle", "carre", "triangle"]);
      const r0 = randomInt(1, 2);
      const c0 = randomInt(1, 3);
      const l = f === "carre" ? randomInt(3, 4) : randomInt(4, 5);
      const h = f === "carre" ? l : f === "rectangle" ? randomInt(2, 3) : randomInt(3, 4);
      // Les sommets, dans l'ordre du contour.
      const sommets: [number, number][] =
        f === "triangle"
          ? [
              [r0, c0],
              [r0 + h, c0],
              [r0 + h, c0 + l],
            ]
          : [
              [r0, c0],
              [r0, c0 + l],
              [r0 + h, c0 + l],
              [r0 + h, c0],
            ];
      const traces = randomInt(1, COTES[f] - 1);
      const reste = COTES[f] - traces;
      const chemin = sommets.slice(0, traces + 1);
      const e = enfant();
      return {
        text: (() => {
          const [debut, pronom] = randomChoice([
            [`${e.n} trace ${NOM_FIG[f]}.`, il(e)],
            [`${e.n} a commencé ${NOM_FIG[f]}.`, il(e)],
            [`Pic a commencé ${NOM_FIG[f]} avec son bec.`, "il"],
            [`La maîtresse commence ${NOM_FIG[f]}.`, "elle"],
            [`L'architecte dessine ${NOM_FIG[f]}.`, "il"],
          ]);
          return `${debut} ${randomChoice([
            "Combien de côtés reste-t-il à tracer ?",
            "Combien de côtés manque-t-il ?",
            `Combien de traits doit-${pronom} encore faire ?`,
          ])}`;
        })(),
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Une figure fermée n'est finie que lorsque tous ses côtés sont tracés.",
          "On compte les côtés de la figure entière, puis on enlève ceux déjà tracés.",
          `${cap(NOM_FIG[f])} a ${COTES[f]} côtés. ${traces} sont tracés. ${COTES[f]} - ${traces} = ${reste}.`,
          `Il reste ${reste} côté${reste > 1 ? "s" : ""}.`,
        ),
        canvas: quadrillage([], chemin),
      };
    },
  },
  {
    kind: "template",
    id: "cp_figure_tracer_tpl_4",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_tracer",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les carreaux coloriés ligne par ligne.",
    tags: ["cp", "figures_solides", "figure_tracer", "template", "canvas"],
    generate: () => {
      const n = randomInt(5, 12);
      const cells = dessinDeCarreaux(n);
      const e = enfant();
      return {
        text: `${randomChoice([
          `${e.n} veut refaire ce dessin sur son cahier.`,
          "La maîtresse a colorié ces carreaux.",
          "Pic a colorié des carreaux avec son bec.",
          `${e.n} recopie ce dessin pour sa mamie.`,
          `${e.n} fait une mosaïque comme celle-ci.`,
        ])} ${randomChoice([
          "Combien de carreaux faut-il colorier ?",
          "Combien de carreaux sont coloriés ?",
          "Combien de carreaux faut-il pour le reproduire ?",
        ])}`,
        format: "short",
        expected: [String(cells.length)],
        comparator: "number_equal",
        explanation: exp(
          "Pour reproduire un dessin sur quadrillage, on colorie les mêmes carreaux.",
          "On compte les carreaux coloriés, ligne par ligne, sans en oublier.",
          `Il y a ${cells.length} carreaux coloriés.`,
          `Il faut ${cells.length} carreaux.`,
        ),
        canvas: quadrillage(cells),
      };
    },
  },

  /* =========================================================
     CP_FIGURE_DEFI — assembler, et compter ce qui se cache
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_figure_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On coupe un rectangle d'un coin au coin opposé. Quelles figures obtient-on ?",
    format: "qcm",
    choices: ["deux triangles", "deux carrés", "deux rectangles", "un triangle et un carré"],
    expected: ["deux triangles"],
    comparator: "mcq_exact",
    hint: "Compte les côtés de chaque morceau : il y en a trois.",
    explanation: exp(
      "Une figure peut se couper en figures plus simples, qu'on reconnait à leurs côtés.",
      "On regarde chaque morceau et on compte ses côtés.",
      "Chaque morceau a deux côtés du rectangle, plus le trait de la coupe : 3 côtés. Ce sont deux triangles.",
      "On obtient deux triangles.",
    ),
    tags: ["cp", "figures_solides", "figure_defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_figure_defi_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour construire un cube avec des faces en carton, combien de carrés faut-il ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Autant que le cube a de faces.",
    explanation: exp(
      "Construire un solide, c'est assembler autant de figures qu'il a de faces.",
      "On compte les faces du cube.",
      "Un cube a 6 faces, toutes des carrés pareils : il faut 6 carrés de la même taille.",
      "Il faut 6 carrés.",
    ),
    tags: ["cp", "figures_solides", "figure_defi"],
  },
  {
    kind: "template",
    id: "cp_figure_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Un triangle a 3 côtés, un carré en a 4. Puis ajoute.",
    tags: ["cp", "figures_solides", "figure_defi", "template"],
    generate: () => {
      const nbT = randomInt(1, 3);
      const nbC = randomInt(1, 3);
      const total = nbT * 3 + nbC * 4;
      const e = enfant();
      const objet = randomChoice(["un robot", "une fusée", "un bateau", "une maison", "un dragon", "un château", "un poisson"]);
      const T = `${nbT} triangle${nbT > 1 ? "s" : ""}`;
      const C = `${nbC} carré${nbC > 1 ? "s" : ""}`;
      return {
        text: `${e.n} fait ${objet} avec ${T} et ${C}. ${randomChoice([
          "Combien de côtés en tout ?",
          "Combien de côtés compte-t-on ?",
          "Compte tous les côtés. Combien y en a-t-il ?",
        ])}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Chaque figure apporte ses côtés : le triangle en a 3, le carré en a 4.",
          "On compte les côtés figure par figure, puis on ajoute.",
          `${T} : ${nbT * 3} côtés. ${C} : ${nbC * 4} côtés. ${nbT * 3} + ${nbC * 4} = ${total}.`,
          `Il y a ${total} côtés.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_figure_defi_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte tour par tour, de bas en haut.",
    tags: ["cp", "figures_solides", "figure_defi", "template", "canvas"],
    generate: () => {
      // Des tours de cubes posées en ligne : chaque cube reste visible.
      const nbTours = randomInt(2, 4);
      const hauteurs = Array.from({ length: nbTours }, () => randomInt(1, 3));
      // Décalées vers la gauche pour que l'assemblage tombe au milieu du cadre.
      const decale = Math.floor(nbTours / 2);
      const cubes = hauteurs.flatMap((hh, x) => Array.from({ length: hh }, (_, z) => ({ x: x - decale, y: 0, z })));
      const total = cubes.length;
      const e = enfant();
      return {
        text: `${randomChoice([
          `${e.n} a construit ces tours de cubes.`,
          "Pic a empilé des cubes dans la cour.",
          `${e.n} a fait un mur de cubes.`,
          "La maîtresse a posé ces cubes sur la table.",
          `${e.n} construit un château en cubes.`,
        ])} ${randomChoice(["Combien de cubes y a-t-il ?", "Combien de cubes a-t-on utilisés ?", "Compte les cubes. Combien en vois-tu ?"])}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un assemblage se compte cube par cube.",
          "On compte chaque tour, de bas en haut, puis on ajoute.",
          `Les tours ont ${hauteurs.join(", ")} cube${total > 1 ? "s" : ""} : ${hauteurs.join(" + ")} = ${total}.`,
          `Il y a ${total} cubes.`,
        ),
        canvas: {
          kind: "solide_3d",
          solide: "assemblage_cubes",
          cubes,
          display: { showLabels: false, showDimensions: false, showFormulaHint: false, showUnitCubes: false },
        },
      };
    },
  },
  {
    kind: "template",
    id: "cp_figure_defi_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Un cube a 6 faces : 6 carrés par cube.",
    tags: ["cp", "figures_solides", "figure_defi", "template"],
    generate: () => {
      const n = randomInt(2, 3);
      const e = enfant();
      const objet = randomChoice(["dés", "cubes en carton", "boîtes cubes", "cubes pour le jeu"]);
      return {
        text: `${e.n} veut fabriquer ${n} ${objet}. ${randomChoice([
          "Combien de carrés de carton faut-il ?",
          `Combien de carrés doit-${il(e)} découper ?`,
          "Combien de faces faut-il découper ?",
        ])}`,
        format: "short",
        expected: [String(6 * n)],
        comparator: "number_equal",
        explanation: exp(
          "Un cube a 6 faces carrées.",
          "On compte 6 carrés pour chaque cube, puis on ajoute.",
          `${Array.from({ length: n }, () => "6").join(" + ")} = ${6 * n}.`,
          `Il faut ${6 * n} carrés.`,
        ),
      };
    },
  },
];
