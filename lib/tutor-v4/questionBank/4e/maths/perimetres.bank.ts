import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

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
      if (!filled.has(cellKey(n))) {
        perimeter += 1;
      }
    }
  }

  return perimeter;
}

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
  showPerimeter = true
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

function triangleFigureFromSides(ab: number, bc: number, ca: number) {
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
      AB: String(ab),
      BC: String(bc),
      CA: String(ca),
    },
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
  };
}

export const perimetresBank: TutorBankItemV4[] = [
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
    text: "Calculer le périmètre d’un rectangle de longueur 8 cm et de largeur 3 cm.",
    format: "short",
    expected: ["22"],
    comparator: "number_equal",
    hint: "P = 2 × (L + l).",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          ("Le périmètre d’un rectangle vaut 2 × (8 + 3) = 2 × 11 = 22.") +
          "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["aire_perimetre", "rectangle"],
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
    generate: () => {
      const L = randomInt(4, 12);
      const l = randomInt(2, 8);
      const perimeter = 2 * (L + l);

      return {
        text: `Calculer le périmètre d’un rectangle de longueur ${L} cm et de largeur ${l} cm.`,
        format: "short",
        expected: [String(perimeter)],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          (`P = 2 × (${L} + ${l}) = ${perimeter}.`) +
          "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
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
    hint: "On fait le tour complet du terrain.",
    tags: ["aire_perimetre", "rectangle", "probleme", "template"],
    generate: () => {
      const L = randomInt(10, 30);
      const l = randomInt(5, 15);
      const perimeter = 2 * (L + l);

      return {
        text: `Un terrain rectangulaire mesure ${L} m de longueur et ${l} m de largeur. Quelle longueur de grillage faut-il prévoir pour l’entourer entièrement ?`,
        format: "short",
        expected: [String(perimeter)],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          (`Le grillage correspond au périmètre : 2 × (${L} + ${l}) = ${perimeter}.`) +
          "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
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
    text: "Calculer le périmètre d’un carré de côté 6 cm.",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Un carré a 4 côtés égaux.",
    explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          ("P = 4 × 6 = 24.") +
          "\n\nConclusion : on obtient la longueur totale du contour.",
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
    tags: ["aire_perimetre", "carre", "template"],
    generate: () => {
      const c = randomInt(2, 15);
      const perimeter = 4 * c;

      return {
        text: `Calculer le périmètre d’un carré de côté ${c} cm.`,
        format: "short",
        expected: [String(perimeter)],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          (`Le périmètre d’un carré vaut 4 × ${c} = ${perimeter}.`) +
          "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
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
    text: "Calculer le périmètre d’un triangle dont les côtés mesurent 5 cm, 7 cm et 8 cm.",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Additionne les 3 côtés.",
    explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          ("P = 5 + 7 + 8 = 20.") +
          "\n\nConclusion : on obtient la longueur totale du contour.",
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
    generate: () => {
      const ab = randomInt(4, 10);
      const bc = randomInt(4, 10);
      const ca = randomInt(4, 10);
      const perimeter = ab + bc + ca;

      return {
        text: "Calculer le périmètre du triangle représenté.",
        format: "short",
        expected: [String(perimeter)],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          (`P = ${ab} + ${bc} + ${ca} = ${perimeter}.`) +
          "\n\nConclusion : on obtient la longueur totale du contour.",
        canvas: triangleFigureFromSides(ab, bc, ca),
      };
    },
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
    generate: () => {
      const h = randomInt(2, 4);
      const w = randomInt(3, 5);
      const cells = rectangleCells(h, w);
      const perimeter = computeGridPerimeter(cells);

      return {
        text: "Chaque côté d’un petit carré mesure 1 unité. Calculer le périmètre de la figure.",
        format: "short",
        expected: [String(perimeter)],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          (`Le contour extérieur contient ${perimeter} unités de longueur.`) +
          "\n\nConclusion : on obtient la longueur totale du contour.",
        canvas: figureLibreFromCells(h, w, cells, true),
      };
    },
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
    hint: "Les côtés intérieurs ne comptent pas dans le périmètre.",
    tags: ["aire_perimetre", "figure_composee", "figure_libre", "template"],
    generate: () => {
      const a = randomInt(3, 5);
      const b = randomInt(3, 5);
      const cutW = randomInt(1, Math.max(1, b - 2));
      const cutH = randomInt(1, Math.max(1, a - 2));

      const cells = lShapeCells(a, b, cutW, cutH);
      const perimeter = computeGridPerimeter(cells);

      return {
        text: "Chaque côté d’un petit carré mesure 1 unité. Calculer le périmètre de la figure en L.",
        format: "short",
        expected: [String(perimeter)],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          (`En comptant uniquement le contour extérieur, on obtient ${perimeter}.`) +
          "\n\nConclusion : on obtient la longueur totale du contour.",
        canvas: figureLibreFromCells(a, b, cells, true),
      };
    },
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
    hint: "Il faut faire le tour complet de la figure.",
    tags: ["aire_perimetre", "probleme", "template"],
    generate: () => {
      const side = randomInt(5, 18);
      const perimeter = 4 * side;

      return {
        text: `On veut poser une bordure autour d’un carré de côté ${side} m. Quelle longueur totale de bordure faut-il prévoir ?`,
        format: "short",
        expected: [String(perimeter)],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          (`Le contour du carré vaut 4 × ${side} = ${perimeter}.`) +
          "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
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
    tags: ["aire_perimetre", "probleme", "template"],
    generate: () => {
      const x = randomInt(3, 10);
      const y = randomInt(4, 10);
      const z = randomInt(5, 12);
      const perimeter = x + y + z;

      return {
        text: `Un triangle a pour côtés ${x} m, ${y} m et ${z} m. Quelle longueur de ruban faut-il pour faire tout le tour ?`,
        format: "short",
        expected: [String(perimeter)],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          (`Il faut additionner les trois côtés : ${x} + ${y} + ${z} = ${perimeter}.`) +
          "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
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
    hint: "Deux figures peuvent avoir la même aire sans avoir le même périmètre.",
    tags: ["aire_perimetre", "defi", "hpi", "template"],
    generate: () => {
      const rect1 = rectangleCells(2, 4); // aire 8
      const rect2 = lShapeCells(3, 3, 1, 1); // aire 8
      const p1 = computeGridPerimeter(rect1);
      const p2 = computeGridPerimeter(rect2);

      const correct =
        p1 === p2
          ? "même périmètre"
          : p1 > p2
            ? "la figure en rectangle a le plus grand périmètre"
            : "la figure en L a le plus grand périmètre";

      return {
        text: "On compare deux figures de même aire. Peut-on affirmer qu’elles ont forcément le même périmètre ?",
        format: "qcm",
        choices: [
          "oui, toujours",
          "non, pas forcément",
          "oui, si elles ont le même nombre de cases",
          "non, seulement pour les triangles",
        ],
        expected: ["non, pas forcément"],
        comparator: "mcq_exact",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          (`Deux figures peuvent avoir la même aire mais des périmètres différents. Ici, les périmètres seraient ${p1} et ${p2}.`) +
          "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
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
    hint: "Pense au lien entre dimensions et contour.",
    tags: ["aire_perimetre", "defi", "hpi", "template"],
    generate: () => {
      const L = randomInt(6, 12);
      const l = randomInt(3, 7);
      const perimeter = 2 * (L + l);
      const newL = L + 1;
      const newl = l + 1;
      const newP = 2 * (newL + newl);

      return {
        text: `Un rectangle mesure ${L} cm par ${l} cm. Si on augmente sa longueur et sa largeur d’1 cm, de combien augmente son périmètre ?`,
        format: "short",
        expected: [String(newP - perimeter)],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          (`Le nouveau périmètre vaut ${newP} au lieu de ${perimeter}, donc l’augmentation est de ${newP - perimeter}.`) +
          "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
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
    generate: () => {
      const cells = randomChoice([
        lShapeCells(4, 4, 1, 2),
        lShapeCells(5, 4, 2, 2),
        lShapeCells(4, 5, 2, 1),
      ]);
      const maxRow = Math.max(...cells.map((c) => c[0])) + 1;
      const maxCol = Math.max(...cells.map((c) => c[1])) + 1;
      const perimeter = computeGridPerimeter(cells);

      return {
        text: "Chaque côté d’un petit carré mesure 1 unité. Calculer le périmètre de cette figure plus complexe.",
        format: "short",
        expected: [String(perimeter)],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on repère tous les côtés du contour et on vérifie qu’ils sont dans la même unité.\n\nCalcul : " +
          (`En suivant le contour extérieur, on obtient un périmètre de ${perimeter} unités.`) +
          "\n\nConclusion : on obtient la longueur totale du contour.",
        canvas: figureLibreFromCells(maxRow, maxCol, cells, true),
      };
    },
  },
];