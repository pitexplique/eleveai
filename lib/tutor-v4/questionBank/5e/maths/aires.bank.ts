// lib/tutor-v4/question-banks/maths/5e/aires.bank.ts

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

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
      ...(hauteurLabel ? { AD: hauteurLabel } : {}),
    },
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
    generate: () => {
      const rows = randomChoice([2, 3, 4]);
      const cols = randomChoice([3, 4, 5]);
      const cells = rectangleCells(rows, cols);
      const aire = rows * cols;

      return {
        text: "Chaque petit carré vaut 1 unité d’aire. Quelle est l’aire de la figure colorée ?",
        format: "short",
        expected: [String(aire)],
        comparator: "number_equal",
        explanation:
          "Définition : une aire peut se mesurer en comptant des carrés unités.\n\n" +
          "Méthode : on compte les cases colorées.\n\n" +
          `Calcul : il y a ${rows} rangée(s) et ${cols} colonne(s), donc ${rows} × ${cols} = ${aire} cases.\n\n` +
          `Conclusion : l’aire est ${aire} unités d’aire.`,
        canvas: figureLibreAireCanvas({
          rows,
          cols,
          filledCells: cells,
          showPerimeter: false,
        }),
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
    generate: () => {
      const rows = randomChoice([2, 3, 4, 5]);
      const cols = randomChoice([3, 4, 5, 6]);
      const aire = rows * cols;

      return {
        text: `Une figure est composée de ${rows} rangée(s) de ${cols} cases. Quelle est son aire en cases ?`,
        format: "short",
        expected: [String(aire)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire correspond au nombre de carrés unités nécessaires pour recouvrir la figure.\n\n" +
          "Méthode : pour un rectangle sur quadrillage, on multiplie le nombre de rangées par le nombre de colonnes.\n\n" +
          `Calcul : ${rows} × ${cols} = ${aire}.\n\n` +
          `Conclusion : l’aire est ${aire} cases.`,
        canvas: figureLibreAireCanvas({
          rows,
          cols,
          filledCells: rectangleCells(rows, cols),
          showPerimeter: true,
        }),
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
    generate: () => {
      const situations = [
        {
          rows: 3,
          cols: 4,
          filledCells: [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
            [1, 2],
            [2, 0],
          ] as [number, number][],
        },
        {
          rows: 4,
          cols: 4,
          filledCells: [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 0],
            [1, 1],
            [2, 0],
            [3, 0],
          ] as [number, number][],
        },
        {
          rows: 4,
          cols: 5,
          filledCells: [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
            [3, 2],
          ] as [number, number][],
        },
      ];

      const s = randomChoice(situations);
      const aire = s.filledCells.length;

      return {
        text: "Chaque case colorée vaut 1 unité d’aire. Quelle est l’aire de cette figure ?",
        format: "short",
        expected: [String(aire)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire correspond à la surface occupée par la figure.\n\n" +
          "Méthode : sur un quadrillage, on peut compter les cases colorées.\n\n" +
          `Calcul : la figure contient ${aire} case(s) colorée(s).\n\n` +
          `Conclusion : l’aire est ${aire} unités d’aire.`,
        canvas: figureLibreAireCanvas({
          rows: s.rows,
          cols: s.cols,
          filledCells: s.filledCells,
          showPerimeter: true,
        }),
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
    generate: () => {
      const unit = randomChoice(["cm", "m", "km"]);
      const good = `${unit}²`;

      return {
        text: `Si les longueurs sont mesurées en ${unit}, dans quelle unité peut-on exprimer une aire ?`,
        format: "qcm",
        choices: shuffle([good, unit, `${unit}³`, "degrés"]),
        expected: [good],
        comparator: "mcq_exact",
        explanation:
          "Définition : une aire s’exprime avec une unité de surface.\n\n" +
          "Méthode : une unité de surface est une unité de longueur au carré.\n\n" +
          `Observation : avec des longueurs en ${unit}, l’aire s’exprime en ${unit}².\n\n` +
          `Conclusion : la bonne unité est ${good}.`,
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
    text: "Explique avec tes mots la différence entre aire et périmètre.",
    format: "open",
    expected: ["aire", "surface", "intérieur", "périmètre", "contour"],
    comparator: "contains_keyword",
    hint: "L’un concerne l’intérieur, l’autre le contour.",
    explanation:
      "Définition : l’aire mesure la surface intérieure d’une figure, le périmètre mesure la longueur de son contour.\n\n" +
      "Méthode : on se demande si l’on remplit la figure ou si l’on fait le tour.\n\n" +
      "Observation : remplir correspond à l’aire ; faire le tour correspond au périmètre.\n\n" +
      "Conclusion : aire et périmètre sont deux grandeurs différentes.",
    tags: ["aire_surface", "open", "perimetre", "vocabulaire"],
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
    text: "Pourquoi utilise-t-on souvent des unités comme cm² ou m² pour exprimer une aire ?",
    format: "open",
    expected: ["surface", "carré", "unité", "cm²", "m²"],
    comparator: "contains_keyword",
    hint: "Une aire peut être vue comme un nombre de petits carrés.",
    explanation:
      "Définition : une aire mesure une surface.\n\n" +
      "Méthode : on peut mesurer une surface avec des carrés unités.\n\n" +
      "Observation : un carré de 1 cm sur 1 cm a une aire de 1 cm².\n\n" +
      "Conclusion : on utilise des unités au carré comme cm² ou m² pour exprimer une aire.",
    tags: ["aire_surface", "open", "unite", "raisonnement"],
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
    generate: () => {
      const base = randomChoice([4, 5, 6, 8, 10, 12]);
      const hauteur = randomChoice([3, 4, 5, 6, 7]);
      const aire = (base * hauteur) / 2;

      return {
        text: `Un triangle a une base de ${base} cm et une hauteur de ${hauteur} cm. Quelle est son aire ?`,
        format: "short",
        expected: [formatNumber(aire)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un triangle est base × hauteur ÷ 2.\n\n" +
          "Méthode : on remplace la base et la hauteur par leurs valeurs.\n\n" +
          `Calcul : ${base} × ${hauteur} ÷ 2 = ${formatNumber(aire)}.\n\n` +
          `Conclusion : l’aire du triangle est ${formatNumber(aire)} cm².`,
        canvas: triangleAireCanvas(`${base} cm`),
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
    generate: () => {
      const base = randomChoice([6, 8, 10, 12]);
      const hauteur = randomChoice([3, 4, 5, 6]);
      const aire = (base * hauteur) / 2;

      return {
        text: `Un triangle rectangle a deux côtés perpendiculaires de ${base} cm et ${hauteur} cm. Quelle est son aire ?`,
        format: "short",
        expected: [formatNumber(aire)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un triangle rectangle se calcule aussi avec base × hauteur ÷ 2.\n\n" +
          "Méthode : les deux côtés perpendiculaires peuvent être pris comme base et hauteur.\n\n" +
          `Calcul : ${base} × ${hauteur} ÷ 2 = ${formatNumber(aire)}.\n\n` +
          `Conclusion : l’aire est ${formatNumber(aire)} cm².`,
        canvas: triangleRectangleAireCanvas(`${base} cm`, `${hauteur} cm`),
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
    generate: () => {
      const base = randomChoice([4, 6, 8, 10, 12]);
      const hauteur = randomChoice([3, 4, 5, 6]);
      const aire = (base * hauteur) / 2;
      const produit = base * hauteur;

      return {
        text: `Un triangle a une base de ${base} cm et une hauteur de ${hauteur} cm. Choisis son aire.`,
        format: "qcm",
        choices: makeChoices(`${formatNumber(aire)} cm²`, [
          `${formatNumber(produit)} cm²`,
          `${formatNumber(base + hauteur)} cm²`,
          `${formatNumber((base + hauteur) / 2)} cm²`,
          `${formatNumber(produit * 2)} cm²`,
        ]),
        expected: [`${formatNumber(aire)} cm²`],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’aire d’un triangle est base × hauteur ÷ 2.\n\n" +
          "Méthode : on calcule d’abord base × hauteur, puis on divise par 2.\n\n" +
          `Calcul : ${base} × ${hauteur} = ${produit}, puis ${produit} ÷ 2 = ${formatNumber(aire)}.\n\n` +
          `Conclusion : l’aire est ${formatNumber(aire)} cm².`,
        canvas: triangleAireCanvas(`${base} cm`),
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
    generate: () => {
      const base = randomChoice([4, 5, 6, 8, 10]);
      const hauteur = randomChoice([3, 4, 5, 6, 7]);
      const aire = (base * hauteur) / 2;

      return {
        text: `Un triangle a une aire de ${formatNumber(aire)} cm² et une base de ${base} cm. Quelle est sa hauteur ?`,
        format: "short",
        expected: [String(hauteur)],
        comparator: "number_equal",
        explanation:
          "Définition : aire du triangle = base × hauteur ÷ 2.\n\n" +
          "Méthode : pour retrouver la hauteur, on fait aire × 2 ÷ base.\n\n" +
          `Calcul : ${formatNumber(aire)} × 2 ÷ ${base} = ${hauteur}.\n\n` +
          `Conclusion : la hauteur est ${hauteur} cm.`,
        canvas: triangleAireCanvas(`${base} cm`),
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
    generate: () => {
      const base = randomChoice([4, 6, 8, 10, 12]);
      const hauteur = randomChoice([3, 4, 5, 6]);
      const aire = (base * hauteur) / 2;

      return {
        text: `Un triangle a une aire de ${formatNumber(aire)} cm² et une hauteur de ${hauteur} cm. Quelle est sa base ?`,
        format: "short",
        expected: [String(base)],
        comparator: "number_equal",
        explanation:
          "Définition : aire du triangle = base × hauteur ÷ 2.\n\n" +
          "Méthode : pour retrouver la base, on fait aire × 2 ÷ hauteur.\n\n" +
          `Calcul : ${formatNumber(aire)} × 2 ÷ ${hauteur} = ${base}.\n\n` +
          `Conclusion : la base mesure ${base} cm.`,
        canvas: triangleAireCanvas("?"),
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
    text: "Explique la méthode pour calculer l’aire d’un triangle quand on connaît une base et la hauteur associée.",
    format: "open",
    expected: ["base", "hauteur", "multiplie", "divise", "2"],
    comparator: "contains_keyword",
    hint: "Il faut parler de la base, de la hauteur et de la division par 2.",
    explanation:
      "Définition : l’aire d’un triangle dépend d’une base et de la hauteur associée.\n\n" +
      "Méthode : on multiplie la base par la hauteur, puis on divise le résultat par 2.\n\n" +
      "Observation : cette division par 2 vient du fait qu’un triangle est la moitié d’un parallélogramme de même base et de même hauteur.\n\n" +
      "Conclusion : aire = base × hauteur ÷ 2.",
    tags: ["aire_surface", "triangle", "open", "methode"],
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
    text: "Pourquoi la hauteur utilisée dans la formule de l’aire d’un triangle doit-elle être associée à la base choisie ?",
    format: "open",
    expected: ["hauteur", "base", "perpendiculaire", "associée"],
    comparator: "contains_keyword",
    hint: "La hauteur doit être perpendiculaire à la base.",
    explanation:
      "Définition : la hauteur d’un triangle est une distance perpendiculaire à une base.\n\n" +
      "Méthode : quand on choisit une base, il faut utiliser la hauteur qui tombe perpendiculairement sur cette base.\n\n" +
      "Observation : utiliser une hauteur qui ne correspond pas à la base donne un calcul faux.\n\n" +
      "Conclusion : dans la formule, la base et la hauteur doivent être associées.",
    tags: ["aire_surface", "triangle", "open", "hauteur", "raisonnement"],
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
    generate: () => {
      const base = randomChoice([5, 6, 8, 10, 12]);
      const hauteur = randomChoice([3, 4, 5, 6, 7]);
      const aire = base * hauteur;

      return {
        text: `Un parallélogramme a une base de ${base} cm et une hauteur de ${hauteur} cm. Quelle est son aire ?`,
        format: "short",
        expected: [formatNumber(aire)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un parallélogramme est égale à base × hauteur.\n\n" +
          "Méthode : on multiplie la base par la hauteur associée.\n\n" +
          `Calcul : ${base} × ${hauteur} = ${formatNumber(aire)}.\n\n` +
          `Conclusion : l’aire du parallélogramme est ${formatNumber(aire)} cm².`,
        canvas: parallelogrammeAireCanvas(`${base} cm`, `${hauteur} cm`),
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
  generate: () => {
    const base = randomChoice([4, 6, 8, 10]);
    const hauteur = randomChoice([3, 4, 5, 6]);
    const aire = base * hauteur;

    const good = `${formatNumber(aire)} cm²`;

    // ⚠️ Base 4, hauteur 4 : le périmètre, le carré de la base et celui de la
    // hauteur valent tous les trois l'aire cherchée, et il ne restait qu'une
    // proposition en face. Deux secours qui ne peuvent jamais coïncider avec
    // elle : l'aire augmentée de la base, et son double.
    const choices = makeChoices(good, [
      `${formatNumber(aire / 2)} cm²`,
      `${formatNumber(base + hauteur)} cm²`,
      `${formatNumber(2 * (base + hauteur))} cm²`,
      `${formatNumber(base * base)} cm²`,
      `${formatNumber(hauteur * hauteur)} cm²`,
      `${formatNumber(aire + base)} cm²`,
      `${formatNumber(aire * 2)} cm²`,
    ]);

    return {
      text: `Choisis l’aire correcte d’un parallélogramme de base ${base} cm et de hauteur ${hauteur} cm.`,
      format: "qcm",
      choices,
      expected: [good],
      comparator: "mcq_exact",
      explanation:
        "Définition : l’aire d’un parallélogramme se calcule avec base × hauteur.\n\n" +
        "Méthode : on ne divise pas par 2 contrairement au triangle.\n\n" +
        `Calcul : ${base} × ${hauteur} = ${formatNumber(aire)}.\n\n` +
        `Conclusion : l’aire correcte est ${formatNumber(aire)} cm².`,
      canvas: parallelogrammeAireCanvas(`${base} cm`),
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
    generate: () => {
      const base = randomChoice([4, 5, 6, 8, 10]);
      const hauteur = randomChoice([3, 4, 5, 6]);
      const aire = base * hauteur;

      return {
        text: `Un parallélogramme a une aire de ${formatNumber(aire)} cm² et une base de ${base} cm. Quelle est sa hauteur ?`,
        format: "short",
        expected: [String(hauteur)],
        comparator: "number_equal",
        explanation:
          "Définition : aire = base × hauteur.\n\n" +
          "Méthode : on divise l’aire par la base pour retrouver la hauteur.\n\n" +
          `Calcul : ${formatNumber(aire)} ÷ ${base} = ${hauteur}.\n\n` +
          `Conclusion : la hauteur mesure ${hauteur} cm.`,
        canvas: parallelogrammeAireCanvas(`${base} cm`, "?"),
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
    generate: () => {
      const base = randomChoice([5, 6, 8, 10, 12]);
      const hauteur = randomChoice([3, 4, 5, 6]);
      const aire = base * hauteur;

      return {
        text: `Un parallélogramme a une aire de ${formatNumber(aire)} cm² et une hauteur de ${hauteur} cm. Quelle est sa base ?`,
        format: "short",
        expected: [String(base)],
        comparator: "number_equal",
        explanation:
          "Définition : aire = base × hauteur.\n\n" +
          "Méthode : on divise l’aire par la hauteur pour retrouver la base.\n\n" +
          `Calcul : ${formatNumber(aire)} ÷ ${hauteur} = ${base}.\n\n` +
          `Conclusion : la base mesure ${base} cm.`,
        canvas: parallelogrammeAireCanvas("?", `${hauteur} cm`),
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
    text: "Explique la méthode pour calculer l’aire d’un parallélogramme.",
    format: "open",
    expected: ["base", "hauteur", "multiplie"],
    comparator: "contains_keyword",
    hint: "Parle de la base et de la hauteur associée.",
    explanation:
      "Définition : l’aire d’un parallélogramme dépend d’une base et de la hauteur correspondante.\n\n" +
      "Méthode : on multiplie la base par la hauteur associée.\n\n" +
      "Observation : il ne faut pas utiliser un côté oblique à la place de la hauteur.\n\n" +
      "Conclusion : aire = base × hauteur.",
    tags: ["aire_surface", "parallelogramme", "open", "methode"],
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
    text: "Pourquoi ne peut-on pas utiliser n’importe quel côté comme hauteur dans un parallélogramme ?",
    format: "open",
    expected: ["perpendiculaire", "base", "hauteur"],
    comparator: "contains_keyword",
    hint: "La hauteur doit être perpendiculaire à la base.",
    explanation:
      "Définition : la hauteur est une distance perpendiculaire à une base.\n\n" +
      "Méthode : quand on choisit une base, on doit prendre la hauteur correspondante.\n\n" +
      "Observation : un côté oblique n’est généralement pas une hauteur.\n\n" +
      "Conclusion : la hauteur doit être perpendiculaire à la base choisie.",
    tags: ["aire_surface", "parallelogramme", "raisonnement", "open"],
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
    generate: () => {
      const l1 = randomChoice([4, 5, 6, 8]);
      const h1 = randomChoice([2, 3, 4]);
      const l2 = randomChoice([2, 3, 4, 5]);
      const h2 = randomChoice([2, 3, 4]);

      const aire1 = l1 * h1;
      const aire2 = l2 * h2;
      const total = aire1 + aire2;

      return {
        text:
          `Une figure est composée de deux rectangles.\n` +
          `Rectangle 1 : ${l1} cm × ${h1} cm.\n` +
          `Rectangle 2 : ${l2} cm × ${h2} cm.\n` +
          `Quelle est l’aire totale ?`,
        format: "short",
        expected: [formatNumber(total)],
        comparator: "number_equal",
        explanation:
          "Définition : une figure composée peut être séparée en figures simples.\n\n" +
          "Méthode : on calcule chaque aire puis on additionne.\n\n" +
          `Calcul : ${l1} × ${h1} = ${aire1} cm².\n` +
          `${l2} × ${h2} = ${aire2} cm².\n` +
          `${aire1} + ${aire2} = ${total} cm².\n\n` +
          `Conclusion : l’aire totale est ${total} cm².`,
        canvas: figureLibreAireComposeeCanvas([
          [0, 0],
          [0, 1],
          [0, 2],
          [0, 3],
          [1, 0],
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 2],
          [2, 3],
        ]),
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
    generate: () => {
      const longueur = randomChoice([6, 8, 10]);
      const largeur = randomChoice([3, 4, 5]);

      const base = randomChoice([4, 6, 8]);
      const hauteur = randomChoice([2, 3, 4]);

      const aireRect = longueur * largeur;
      const aireTri = (base * hauteur) / 2;
      const total = aireRect + aireTri;

      return {
        text:
          `Une figure est composée :\n` +
          `• d’un rectangle ${longueur} cm × ${largeur} cm\n` +
          `• d’un triangle de base ${base} cm et hauteur ${hauteur} cm.\n` +
          `Quelle est l’aire totale ?`,
        format: "short",
        expected: [formatNumber(total)],
        comparator: "number_equal",
        explanation:
          "Définition : une figure composée peut contenir plusieurs formes différentes.\n\n" +
          "Méthode : on calcule séparément chaque aire.\n\n" +
          `Calcul : rectangle = ${longueur} × ${largeur} = ${aireRect} cm².\n` +
          `Triangle = ${base} × ${hauteur} ÷ 2 = ${aireTri} cm².\n` +
          `${aireRect} + ${aireTri} = ${total} cm².\n\n` +
          `Conclusion : l’aire totale est ${total} cm².`,
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
    generate: () => {
      const a1 = randomChoice([12, 15, 18]);
      const a2 = randomChoice([6, 8, 10]);

      const total = a1 + a2;

      return {
        text:
          `Une figure composée possède deux parties d’aires ${a1} cm² et ${a2} cm².\n` +
          `Quelle est son aire totale ?`,
        format: "qcm",
        choices: shuffle([
          `${total} cm²`,
          `${a1 * a2} cm²`,
          `${a1 + a2 + 10} cm²`,
          `${Math.abs(a1 - a2)} cm²`,
        ]),
        expected: [`${total} cm²`],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’aire totale d’une figure composée est la somme des aires des parties.\n\n" +
          "Méthode : on additionne les aires.\n\n" +
          `Calcul : ${a1} + ${a2} = ${total}.\n\n` +
          `Conclusion : l’aire totale est ${total} cm².`,
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
  hint: "Compte les carreaux de la figure.",
  tags: ["aire_surface", "composees", "quadrillage", "canvas", "template"],
  generate: () => {
    type GridCell = [number, number];

    const figures: Array<{
      cells: GridCell[];
      aire: number;
    }> = [
      {
        cells: [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
          [2, 1],
        ],
        aire: 5,
      },
      {
        cells: [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 1],
          [1, 2],
          [2, 2],
        ],
        aire: 6,
      },
      {
        cells: [
          [0, 1],
          [1, 0],
          [1, 1],
          [1, 2],
          [2, 1],
        ],
        aire: 5,
      },
    ];

    const fig = randomChoice(figures);

    return {
      text:
        "Chaque carreau représente 1 cm².\n" +
        "Quelle est l’aire de la figure colorée ?",
      format: "short",
      expected: [String(fig.aire)],
      comparator: "number_equal",
      explanation:
        "Définition : sur un quadrillage, chaque carreau possède une aire.\n\n" +
        "Méthode : on compte les carreaux remplis.\n\n" +
        `Calcul : il y a ${fig.aire} carreaux.\n\n` +
        `Conclusion : l’aire est ${fig.aire} cm².`,
      canvas: figureLibreAireComposeeCanvas(fig.cells),
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
    text:
      "Explique la méthode pour calculer l’aire d’une figure composée.",
    format: "open",
    expected: ["découper", "figures", "additionner"],
    comparator: "contains_keyword",
    hint: "Parle du découpage en formes simples.",
    explanation:
      "Définition : une figure composée est formée de plusieurs figures simples.\n\n" +
      "Méthode : on découpe la figure puis on calcule chaque aire.\n\n" +
      "Observation : on additionne ensuite les résultats.\n\n" +
      "Conclusion : on obtient ainsi l’aire totale.",
    tags: ["aire_surface", "composees", "open", "methode"],
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
    hint: "Additionne les aires des différentes zones.",
    tags: ["aire_surface", "composees", "reunion", "template"],
    generate: () => {
      const jardin1 = randomChoice([12, 15, 18]);
      const jardin2 = randomChoice([8, 10, 14]);

      const total = jardin1 + jardin2;

      return {
        text:
          `À La Réunion, un jardin est composé :\n` +
          `• d’un espace fleurs de ${jardin1} m²\n` +
          `• d’un espace légumes de ${jardin2} m².\n` +
          `Quelle est l’aire totale du jardin ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire totale correspond à la somme des différentes surfaces.\n\n" +
          "Méthode : on additionne les aires.\n\n" +
          `Calcul : ${jardin1} + ${jardin2} = ${total}.\n\n` +
          `Conclusion : l’aire totale du jardin est ${total} m².`,
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
    generate: () => {
      const l1 = randomChoice([6, 8, 10]);
      const h1 = randomChoice([3, 4, 5]);

      const base2 = randomChoice([6, 8, 10]);
      const hauteur2 = randomChoice([4, 6, 8]);

      const aireRect = l1 * h1;
      const aireTri = (base2 * hauteur2) / 2;

      const answer =
        aireRect > aireTri
          ? "rectangle"
          : aireTri > aireRect
            ? "triangle"
            : "égales";

      return {
        text:
          `On compare :\n` +
          `• un rectangle ${l1} cm × ${h1} cm\n` +
          `• un triangle de base ${base2} cm et hauteur ${hauteur2} cm.\n` +
          `Quelle figure a la plus grande aire ?`,
        format: "qcm",
        choices: ["rectangle", "triangle", "égales"],
        expected: [answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : pour comparer deux figures, on compare leurs aires.\n\n" +
          "Méthode : on calcule chaque aire.\n\n" +
          `Calcul : rectangle = ${aireRect} cm².\n` +
          `Triangle = ${aireTri} cm².\n\n` +
          `Conclusion : la bonne réponse est ${answer}.`,
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
    generate: () => {
      const largeur = randomChoice([2, 3, 4, 5]);
      const longueur = randomChoice([6, 8, 10, 12]);

      const aire = largeur * longueur;

      return {
        text:
          `Un rectangle a une aire de ${aire} cm² et une largeur de ${largeur} cm.\n` +
          `Quelle est sa longueur ?`,
        format: "short",
        expected: [String(longueur)],
        comparator: "number_equal",
        explanation:
          "Définition : aire rectangle = longueur × largeur.\n\n" +
          "Méthode : on divise l’aire par la largeur.\n\n" +
          `Calcul : ${aire} ÷ ${largeur} = ${longueur}.\n\n` +
          `Conclusion : la longueur mesure ${longueur} cm.`,
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

  generate: () => {
    const base = randomChoice([6, 8, 10]);
    const hauteur = randomChoice([3, 4, 5]);
    const faux = randomChoice([7, 9, 11]);

    const aire = (base * hauteur) / 2;

    return {
      text:
        `Un triangle possède :\n` +
        `• une base de ${base} cm\n` +
        `• une hauteur de ${hauteur} cm\n` +
        `• un côté oblique de ${faux} cm.\n\n` +
        `Quelle est son aire ?`,

      format: "qcm",

      choices: makeChoices(`${formatNumber(aire)} cm²`, [
        `${formatNumber((base * faux) / 2)} cm²`,
        `${formatNumber(base * hauteur)} cm²`,
        `${formatNumber(base + hauteur + faux)} cm²`,
        `${formatNumber((hauteur * faux) / 2)} cm²`,
      ]),

      expected: [`${formatNumber(aire)} cm²`],

      comparator: "mcq_exact",

      explanation:
        "Définition : l’aire d’un triangle dépend de la base et de la hauteur associée.\n\n" +
        "Méthode : on utilise uniquement la formule base × hauteur ÷ 2.\n\n" +
        `Calcul : ${base} × ${hauteur} ÷ 2 = ${formatNumber(aire)}.\n\n` +
        `Conclusion : l’aire du triangle est ${formatNumber(aire)} cm².`,

      canvas: triangleAireCanvas(`${base} cm`),
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
  hint: "Compte soigneusement tous les carreaux.",
  tags: ["aire_surface", "quadrillage", "defi", "canvas", "template"],
  generate: () => {
    type GridCell = [number, number];

    const figures: Array<{
      cells: GridCell[];
      aire: number;
    }> = [
      {
        cells: [
          [0, 1],
          [1, 0],
          [1, 1],
          [1, 2],
          [2, 0],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
        aire: 8,
      },
      {
        cells: [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2],
          [3, 2],
        ],
        aire: 8,
      },
    ];

    const fig = randomChoice(figures);

    return {
      text:
        "Chaque carreau représente 1 cm².\n" +
        "Quelle est l’aire de la figure colorée ?",
      format: "short",
      expected: [String(fig.aire)],
      comparator: "number_equal",
      explanation:
        "Définition : chaque carreau correspond à une unité d’aire.\n\n" +
        "Méthode : on compte les carreaux colorés.\n\n" +
        `Calcul : il y a ${fig.aire} carreaux.\n\n` +
        `Conclusion : l’aire est ${fig.aire} cm².`,
      canvas: figureLibreAireComposeeCanvas(fig.cells),
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
    text:
      "Explique la différence entre une aire et un périmètre.",
    format: "open",
    expected: ["surface", "contour", "aire", "périmètre"],
    comparator: "contains_keyword",
    hint: "L’un mesure la surface, l’autre le contour.",
    explanation:
      "Définition : l’aire mesure la surface intérieure d’une figure.\n\n" +
      "Définition : le périmètre mesure le contour d’une figure.\n\n" +
      "Observation : on n’utilise pas les mêmes unités.\n\n" +
      "Conclusion : aire et périmètre sont deux notions différentes.",
    tags: ["aire_surface", "perimetre", "open", "defi"],
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
    hint: "Calcule l’aire du champ.",
    tags: ["aire_surface", "reunion", "defi", "template"],
    generate: () => {
      const longueur = randomChoice([20, 25, 30]);
      const largeur = randomChoice([8, 10, 12]);

      const aire = longueur * largeur;

      return {
        text:
          `À La Réunion, un champ de canne à sucre mesure ${longueur} m de long et ${largeur} m de large.\n` +
          `Quelle est son aire ?`,
        format: "short",
        expected: [String(aire)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un rectangle est longueur × largeur.\n\n" +
          "Méthode : on multiplie les dimensions.\n\n" +
          `Calcul : ${longueur} × ${largeur} = ${aire}.\n\n` +
          `Conclusion : l’aire du champ est ${aire} m².`,
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
    text: "Explique la différence entre l’aire et le périmètre d’une figure.",
    format: "open",
    expected: ["surface", "contour", "périmètre"],
    comparator: "contains_keyword",
    hint: "L’un mesure l’intérieur, l’autre le tour.",
    explanation:
      "Définition : l’aire mesure la surface intérieure, le périmètre mesure la longueur du contour.\n\n" +
      "Méthode : on repère si l’on parle de l’intérieur ou du tour.\n\n" +
      "Observation : l’aire s’exprime en cm², le périmètre en cm.\n\n" +
      "Conclusion : l’aire est la surface, le périmètre est le tour de la figure.",
    tags: ["aire_surface", "perimetre", "open"],
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
    expected: ["20"],
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
    expected: ["28"],
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
    generate: () => {
      const base = randomChoice([5, 6, 8, 9, 10]);
      const hauteur = randomChoice([3, 4, 5, 6]);
      const aire = base * hauteur;
      return {
        text: `Un parallélogramme a une base de ${base} cm et une hauteur de ${hauteur} cm. Quelle est son aire ?`,
        format: "short",
        expected: [formatNumber(aire)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un parallélogramme est base × hauteur.\n\n" +
          "Méthode : on multiplie la base par la hauteur.\n\n" +
          `Calcul : ${base} × ${hauteur} = ${aire}.\n\n` +
          `Conclusion : l’aire est ${aire} cm².`,
        canvas: parallelogrammeAireCanvas(`${base} cm`, `${hauteur} cm`),
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
    expected: ["33"],
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
    text: "Explique comment calculer l’aire d’une figure en forme de L.",
    format: "open",
    expected: ["découpe", "rectangles", "additionne"],
    comparator: "contains_keyword",
    hint: "On la sépare en rectangles.",
    explanation:
      "Définition : une figure en L peut se décomposer en figures simples.\n\n" +
      "Méthode : on découpe le L en deux rectangles.\n\n" +
      "Calcul : on calcule l’aire de chaque rectangle puis on les additionne.\n\n" +
      "Conclusion : l’aire du L est la somme des aires des deux rectangles.",
    tags: ["aire_surface", "composer", "open"],
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
    expected: ["87"],
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