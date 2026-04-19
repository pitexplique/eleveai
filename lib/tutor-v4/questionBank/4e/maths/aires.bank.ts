import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

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
) {
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

function triangleFigure(base: number, other1: number, other2: number, heightLabel?: number) {
  return {
    kind: "triangle" as const,
    points: {
      A: { x: 40, y: 180 },
      B: { x: 240, y: 180 },
      C: { x: 140, y: 40 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
    },
    sideLabels: {
      AB: String(base),
      BC: String(other1),
      CA: String(other2),
    },
    angleLabels: {},
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
    },
    size: {
      width: 280,
      height: 220,
    },
    ...(heightLabel
      ? {
          marks: {
            rightAngleAt: "A" as const,
          },
        }
      : {}),
  };
}

function triangleRectangleFigure(base: number, height: number, hypotenuse: number) {
  return {
    kind: "triangle" as const,
    points: {
      A: { x: 50, y: 180 },
      B: { x: 230, y: 180 },
      C: { x: 50, y: 60 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
    },
    sideLabels: {
      AB: String(base),
      BC: String(hypotenuse),
      CA: String(height),
    },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
    },
    marks: {
      rightAngleAt: "A" as const,
    },
    size: {
      width: 280,
      height: 220,
    },
  };
}

function quadrilatereRectangleFigure(length: number, width: number) {
  return {
    kind: "quadrilatere" as const,
    points: {
      A: { x: 50, y: 60 },
      B: { x: 230, y: 60 },
      C: { x: 230, y: 170 },
      D: { x: 50, y: 170 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
    },
    sideLabels: {
      AB: String(length),
      BC: String(width),
      CD: String(length),
      DA: String(width),
    },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
      showDiagonals: false,
    },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"] as const,
    },
    size: {
      width: 280,
      height: 220,
    },
  };
}

function quadrilatereParallelogramFigure(base: number, side: number, heightValue: number) {
  return {
    kind: "quadrilatere" as const,
    points: {
      A: { x: 60, y: 160 },
      B: { x: 220, y: 160 },
      C: { x: 250, y: 80 },
      D: { x: 90, y: 80 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
    },
    sideLabels: {
      AB: String(base),
      BC: String(side),
      CD: String(base),
      DA: String(side),
    },
    angleLabels: {
      A: String(heightValue),
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
        ["BC", "DA"],
      ] as const,
    },
    size: {
      width: 300,
      height: 220,
    },
  };
}

export const airesBank: TutorBankItemV4[] = [
  // =========================
  // AIRE_COMPRENDRE
  // =========================
  {
    kind: "fixed",
    id: "aire_comprendre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
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
      "L’aire mesure la surface occupée par une figure, et non son contour.",
    tags: ["aire", "definition"],
  },
  {
    kind: "fixed",
    id: "aire_comprendre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
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
      "Une aire s’exprime avec une unité carrée, par exemple en cm².",
    tags: ["aire", "unites"],
  },

  // =========================
  // AIRE_RECTANGLE
  // =========================
  {
    kind: "fixed",
    id: "aire_rectangle_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer l’aire d’un rectangle de longueur 8 cm et de largeur 3 cm.",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Aire du rectangle = longueur × largeur.",
    explanation: "A = 8 × 3 = 24.",
    tags: ["aire", "rectangle"],
  },
  {
    kind: "template",
    id: "aire_rectangle_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "On multiplie la longueur par la largeur.",
    tags: ["aire", "rectangle", "template"],
    generate: () => {
      const L = randomInt(4, 15);
      const l = randomInt(2, 9);
      const area = L * l;

      return {
        text: `Calculer l’aire d’un rectangle de longueur ${L} cm et de largeur ${l} cm.`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: `A = ${L} × ${l} = ${area}.`,
      };
    },
  },
  {
    kind: "template",
    id: "aire_rectangle_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "La surface du terrain est celle du rectangle.",
    tags: ["aire", "rectangle", "probleme", "template"],
    generate: () => {
      const L = randomInt(10, 30);
      const l = randomInt(5, 15);
      const area = L * l;

      return {
        text: `Un jardin rectangulaire mesure ${L} m sur ${l} m. Quelle est sa surface ?`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: `La surface d’un rectangle vaut longueur × largeur, donc ${L} × ${l} = ${area}.`,
      };
    },
  },
  {
    kind: "template",
    id: "aire_rectangle_tpl_canvas_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis les dimensions directement sur la figure.",
    tags: ["aire", "rectangle", "quadrilatere", "canvas", "template"],
    generate: () => {
      const L = randomInt(4, 12);
      const l = randomInt(2, 7);
      const area = L * l;

      return {
        text: "Calculer l’aire du rectangle représenté.",
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: `L’aire du rectangle vaut ${L} × ${l} = ${area}.`,
        canvas: quadrilatereRectangleFigure(L, l),
      };
    },
  },

  // =========================
  // AIRE_CARRE
  // =========================
  {
    kind: "fixed",
    id: "aire_carre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_carre",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer l’aire d’un carré de côté 6 cm.",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Aire du carré = côté × côté.",
    explanation: "A = 6 × 6 = 36.",
    tags: ["aire", "carre"],
  },
  {
    kind: "template",
    id: "aire_carre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_carre",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplie le côté par lui-même.",
    tags: ["aire", "carre", "template"],
    generate: () => {
      const c = randomInt(2, 14);
      const area = c * c;

      return {
        text: `Calculer l’aire d’un carré de côté ${c} cm.`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: `L’aire du carré vaut ${c} × ${c} = ${area}.`,
      };
    },
  },

  // =========================
  // AIRE_TRIANGLE
  // =========================
  {
    kind: "fixed",
    id: "aire_triangle_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer l’aire d’un triangle de base 10 cm et de hauteur 4 cm.",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Aire du triangle = (base × hauteur) ÷ 2.",
    explanation: "A = (10 × 4) ÷ 2 = 20.",
    tags: ["aire", "triangle"],
  },
  {
    kind: "template",
    id: "aire_triangle_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise la formule (base × hauteur) ÷ 2.",
    tags: ["aire", "triangle", "template"],
    generate: () => {
      const base = randomChoice([6, 8, 10, 12, 14]);
      const height = randomChoice([2, 4, 6, 8]);
      const area = (base * height) / 2;
      const other1 = randomInt(5, 12);
      const other2 = randomInt(5, 12);

      return {
        text: `Calculer l’aire d’un triangle de base ${base} cm et de hauteur ${height} cm.`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: `A = (${base} × ${height}) ÷ 2 = ${area}.`,
        canvas: triangleFigure(base, other1, other2),
      };
    },
  },
  {
    kind: "template",
    id: "aire_triangle_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un triangle rectangle, les deux côtés de l’angle droit peuvent servir de base et de hauteur.",
    tags: ["aire", "triangle_rectangle", "canvas", "template"],
    generate: () => {
      const base = randomChoice([6, 8, 10, 12]);
      const height = randomChoice([3, 4, 6, 8]);
      const hypotenuse = Math.round(Math.sqrt(base * base + height * height) * 10) / 10;
      const area = (base * height) / 2;

      return {
        text: "Calculer l’aire du triangle rectangle représenté.",
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: `Comme le triangle est rectangle, on prend les deux côtés perpendiculaires : A = (${base} × ${height}) ÷ 2 = ${area}.`,
        canvas: triangleRectangleFigure(base, height, hypotenuse),
      };
    },
  },

  // =========================
  // AIRE_PARALLELOGRAMME
  // =========================
  {
    kind: "fixed",
    id: "aire_parallelogramme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_parallelogramme",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer l’aire d’un parallélogramme de base 8 cm et de hauteur 5 cm.",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "Aire du parallélogramme = base × hauteur.",
    explanation: "A = 8 × 5 = 40.",
    tags: ["aire", "parallelogramme"],
  },
  {
    kind: "template",
    id: "aire_parallelogramme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_parallelogramme",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise la base et la hauteur, pas le côté incliné.",
    tags: ["aire", "parallelogramme", "quadrilatere", "template"],
    generate: () => {
      const base = randomInt(5, 14);
      const side = randomInt(4, 10);
      const height = randomInt(3, 8);
      const area = base * height;

      return {
        text: `Calculer l’aire d’un parallélogramme de base ${base} cm et de hauteur ${height} cm.`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: `L’aire d’un parallélogramme vaut base × hauteur, donc ${base} × ${height} = ${area}.`,
        canvas: quadrilatereParallelogramFigure(base, side, height),
      };
    },
  },

  // =========================
  // AIRE_FIGURE
  // =========================
  {
    kind: "template",
    id: "aire_figure_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_figure",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte le nombre de petits carrés unité.",
    tags: ["aire", "figure", "figure_libre", "template"],
    generate: () => {
      const h = randomInt(2, 4);
      const w = randomInt(3, 5);
      const cells = rectangleCells(h, w);
      const area = cells.length;

      return {
        text: "Chaque petit carré a une aire de 1 unité². Calculer l’aire de la figure.",
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: `On compte ${area} petits carrés, donc l’aire vaut ${area}.`,
        canvas: figureLibreFromCells(h, w, cells, false),
      };
    },
  },
  {
    kind: "template",
    id: "aire_figure_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "L’aire correspond au nombre total de carrés remplis.",
    tags: ["aire", "figure_composee", "figure_libre", "template"],
    generate: () => {
      const a = randomInt(3, 5);
      const b = randomInt(3, 5);
      const cutW = randomInt(1, Math.max(1, b - 2));
      const cutH = randomInt(1, Math.max(1, a - 2));
      const cells = lShapeCells(a, b, cutW, cutH);
      const area = cells.length;

      return {
        text: "Chaque petit carré a une aire de 1 unité². Calculer l’aire de la figure en L.",
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: `La figure contient ${area} carrés unité, donc son aire vaut ${area}.`,
        canvas: figureLibreFromCells(a, b, cells, false),
      };
    },
  },

  // =========================
  // AIRE_PROBLEME
  // =========================
  {
    kind: "template",
    id: "aire_probleme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "La surface à peindre correspond à une aire.",
    tags: ["aire", "probleme", "template"],
    generate: () => {
      const L = randomInt(3, 10);
      const l = randomInt(2, 8);
      const area = L * l;

      return {
        text: `Une terrasse rectangulaire mesure ${L} m de long et ${l} m de large. Quelle est sa surface ?`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: `La surface d’une terrasse rectangulaire vaut ${L} × ${l} = ${area}.`,
      };
    },
  },
  {
    kind: "template",
    id: "aire_probleme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Un triangle rectangle se traite comme un triangle avec base et hauteur.",
    tags: ["aire", "probleme", "template"],
    generate: () => {
      const base = randomChoice([6, 8, 10, 12]);
      const height = randomChoice([3, 4, 6]);
      const area = (base * height) / 2;

      return {
        text: `Un panneau triangulaire a pour base ${base} cm et pour hauteur ${height} cm. Quelle est son aire ?`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: `A = (${base} × ${height}) ÷ 2 = ${area}.`,
      };
    },
  },

  // =========================
  // AIRE_DEFIS
  // =========================
  {
    kind: "template",
    id: "aire_defis_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux figures peuvent avoir la même aire même si elles n’ont pas la même forme.",
    tags: ["aire", "defi", "hpi", "template"],
    generate: () => {
      const rect = rectangleCells(2, 4); // aire 8
      const lshape = lShapeCells(3, 3, 1, 1); // aire 8

      return {
        text: "Deux figures différentes peuvent-elles avoir la même aire ?",
        format: "qcm",
        choices: [
          "oui",
          "non",
          "seulement si elles ont le même périmètre",
          "seulement si ce sont des rectangles",
        ],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          `Oui. Par exemple, deux figures contenant chacune ${rect.length} carrés unité ont la même aire, même si leur forme est différente.`,
      };
    },
  },
  {
    kind: "template",
    id: "aire_defis_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Pour l’aire d’un parallélogramme, on utilise la hauteur, pas le côté incliné.",
    tags: ["aire", "defi", "parallelogramme", "hpi", "template"],
    generate: () => {
      const base = randomInt(6, 14);
      const side = randomInt(5, 11);
      const height = randomInt(3, 8);
      const good = base * height;
      const wrong = base * side;

      return {
        text: `Un élève affirme que l’aire d’un parallélogramme de base ${base} cm, de côté ${side} cm et de hauteur ${height} cm vaut ${wrong} cm². A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          `Non. L’aire d’un parallélogramme se calcule avec la base et la hauteur : ${base} × ${height} = ${good}, et non avec le côté incliné.`,
      };
    },
  },
  {
    kind: "template",
    id: "aire_defis_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les aires, pas les périmètres.",
    tags: ["aire", "defi", "comparaison", "hpi", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(3, 6);
      const rectArea = a * b;
      const squareSide = randomChoice([2, 3, 4, 5]);
      const squareArea = squareSide * squareSide;

      const correct =
        rectArea > squareArea
          ? "le rectangle"
          : rectArea < squareArea
            ? "le carré"
            : "elles ont la même aire";

      return {
        text: `On compare un rectangle de dimensions ${a} cm par ${b} cm et un carré de côté ${squareSide} cm. Quelle figure a la plus grande aire ?`,
        format: "qcm",
        choices: ["le rectangle", "le carré", "elles ont la même aire"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Aire du rectangle : ${a} × ${b} = ${rectArea}. Aire du carré : ${squareSide} × ${squareSide} = ${squareArea}.`,
      };
    },
  },
];