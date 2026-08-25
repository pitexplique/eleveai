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
    generate: () => {
      const a = randomInt(2, 6), b = randomInt(2, 6), c = randomInt(2, 6), d = randomInt(2, 6);
      const p = a + b + c + d;
      return {
        text: `Un quadrilatère a pour côtés $${a}$, $${b}$, $${c}$ et $${d}$ cm. Quel est son périmètre (en cm) ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          `Définition : le périmètre est la somme des côtés.\n\nMéthode : on additionne les quatre longueurs.\n\nCalcul : $${a} + ${b} + ${c} + ${d} = ${p}$.\n\nConclusion : le périmètre est $${p}$ cm.`,
      };
    },
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
    hint: "Périmètre d’un carré $= 4 \\times$ côté.",
    tags: ["aire_perimetre", "comprendre", "template"],
    generate: () => {
      const c = randomInt(3, 12);
      return {
        text: `Quel est le périmètre d’un carré de côté $${c}$ cm (en cm) ?`,
        format: "short",
        expected: [String(4 * c)],
        comparator: "number_equal",
        explanation:
          `Définition : périmètre d’un carré $= 4 \\times$ côté.\n\nMéthode : on multiplie le côté par $4$.\n\nCalcul : $4 \\times ${c} = ${4 * c}$.\n\nConclusion : le périmètre est $${4 * c}$ cm.`,
      };
    },
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
    generate: () => {
      const L = randomInt(5, 20), l = randomInt(2, 9);
      const p = 2 * (L + l);
      return {
        text: `Quel est le périmètre d’un rectangle de longueur $${L}$ cm et de largeur $${l}$ cm (en cm) ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          `Définition : $P = 2 \\times (L + l)$.\n\nMéthode : on additionne longueur et largeur, puis on multiplie par $2$.\n\nCalcul : $2 \\times (${L} + ${l}) = ${p}$.\n\nConclusion : le périmètre est $${p}$ cm.`,
      };
    },
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
    hint: "$l = \\dfrac{P}{2} - L$.",
    tags: ["aire_perimetre", "rectangle", "inverse", "template"],
    generate: () => {
      const L = randomInt(6, 12), l = randomInt(3, 8);
      const p = 2 * (L + l);
      return {
        text: `Un rectangle a un périmètre de $${p}$ cm et une longueur de $${L}$ cm. Quelle est sa largeur (en cm) ?`,
        format: "short",
        expected: [String(l)],
        comparator: "number_equal",
        explanation:
          `Définition : $P = 2 \\times (L + l)$.\n\nMéthode : on isole la largeur : $l = \\dfrac{P}{2} - L$.\n\nCalcul : $\\dfrac{${p}}{2} - ${L} = ${p / 2} - ${L} = ${l}$.\n\nConclusion : la largeur est $${l}$ cm.`,
      };
    },
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
    expected: ["24"],
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
    hint: "La clôture suit le contour.",
    tags: ["aire_perimetre", "rectangle", "probleme", "template"],
    generate: () => {
      const L = randomInt(12, 25), l = randomInt(6, 12);
      const p = 2 * (L + l);
      return {
        text: `Un jardin rectangulaire mesure $${L}$ m sur $${l}$ m. Quelle longueur de clôture faut-il pour l’entourer (en m) ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          `Définition : la clôture suit le périmètre.\n\nMéthode : $P = 2 \\times (L + l)$.\n\nCalcul : $2 \\times (${L} + ${l}) = ${p}$.\n\nConclusion : il faut $${p}$ m de clôture.`,
      };
    },
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
    tags: ["aire_perimetre", "rectangle", "template"],
    generate: () => {
      const L = randomInt(8, 15), l = randomInt(3, 7);
      const p = 2 * L + 2 * l;
      return {
        text: `Calcule le périmètre d’un rectangle de dimensions $${L}$ cm et $${l}$ cm (en cm).`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          `Définition : $P = 2L + 2l$.\n\nMéthode : on double chaque dimension et on additionne.\n\nCalcul : $2 \\times ${L} + 2 \\times ${l} = ${2 * L} + ${2 * l} = ${p}$.\n\nConclusion : le périmètre est $${p}$ cm.`,
      };
    },
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
    expected: ["9"],
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
    generate: () => {
      const c = randomInt(3, 18);
      return {
        text: `Quel est le périmètre d’un carré de côté $${c}$ cm (en cm) ?`,
        format: "short",
        expected: [String(4 * c)],
        comparator: "number_equal",
        explanation:
          `Définition : $P = 4 \\times c$.\n\nMéthode : on multiplie le côté par $4$.\n\nCalcul : $4 \\times ${c} = ${4 * c}$.\n\nConclusion : le périmètre est $${4 * c}$ cm.`,
      };
    },
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
    generate: () => {
      const c = randomInt(3, 12);
      const p = 4 * c;
      return {
        text: `Un carré a un périmètre de $${p}$ cm. Quelle est la longueur de son côté (en cm) ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          `Définition : $P = 4 \\times c$, donc côté $= \\dfrac{P}{4}$.\n\nMéthode : on divise le périmètre par $4$.\n\nCalcul : $\\dfrac{${p}}{4} = ${c}$.\n\nConclusion : le côté mesure $${c}$ cm.`,
      };
    },
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
    expected: ["36"],
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
    expected: ["7"],
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
    generate: () => {
      const c = randomInt(5, 15);
      return {
        text: `On veut entourer un parterre carré de côté $${c}$ m avec une bordure. Quelle longueur de bordure faut-il (en m) ?`,
        format: "short",
        expected: [String(4 * c)],
        comparator: "number_equal",
        explanation:
          `Définition : la bordure suit le périmètre.\n\nMéthode : $P = 4 \\times c$.\n\nCalcul : $4 \\times ${c} = ${4 * c}$.\n\nConclusion : il faut $${4 * c}$ m de bordure.`,
      };
    },
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
    hint: "côté $= \\dfrac{P}{4}$.",
    tags: ["aire_perimetre", "carre", "inverse", "template"],
    generate: () => {
      const c = randomInt(4, 16);
      const p = 4 * c;
      return {
        text: `Un cadre carré utilise $${p}$ cm de baguette pour son contour. Quelle est la longueur d’un côté (en cm) ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          `Définition : côté $= \\dfrac{P}{4}$.\n\nMéthode : on divise le contour par $4$.\n\nCalcul : $\\dfrac{${p}}{4} = ${c}$.\n\nConclusion : le côté mesure $${c}$ cm.`,
      };
    },
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
    expected: ["48"],
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
    generate: () => {
      const a = randomInt(3, 9), b = randomInt(3, 9), c = randomInt(3, 9);
      return {
        text: `Un triangle a pour côtés $${a}$ cm, $${b}$ cm et $${c}$ cm. Quel est son périmètre (en cm) ?`,
        format: "short",
        expected: [String(a + b + c)],
        comparator: "number_equal",
        explanation:
          `Définition : le périmètre est la somme des côtés.\n\nMéthode : on additionne les trois longueurs.\n\nCalcul : $${a} + ${b} + ${c} = ${a + b + c}$.\n\nConclusion : le périmètre est $${a + b + c}$ cm.`,
      };
    },
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
    generate: () => {
      const c = randomInt(3, 12);
      return {
        text: `Un triangle équilatéral a un côté de $${c}$ cm. Quel est son périmètre (en cm) ?`,
        format: "short",
        expected: [String(3 * c)],
        comparator: "number_equal",
        explanation:
          `Définition : un triangle équilatéral a trois côtés égaux.\n\nMéthode : $P = 3 \\times$ côté.\n\nCalcul : $3 \\times ${c} = ${3 * c}$.\n\nConclusion : le périmètre est $${3 * c}$ cm.`,
      };
    },
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
    generate: () => {
      const cote = randomInt(5, 10), base = randomInt(3, 8);
      const p = 2 * cote + base;
      return {
        text: `Un triangle isocèle a deux côtés de $${cote}$ cm et une base de $${base}$ cm. Quel est son périmètre (en cm) ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          `Définition : un triangle isocèle a deux côtés égaux.\n\nMéthode : $P = 2 \\times ${cote} + ${base}$.\n\nCalcul : $${2 * cote} + ${base} = ${p}$.\n\nConclusion : le périmètre est $${p}$ cm.`,
      };
    },
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
    hint: "Additionne les longueurs marquées sur la figure.",
    tags: ["aire_perimetre", "triangle", "canvas", "template"],
    generate: () => {
      const ab = randomInt(4, 9), bc = randomInt(4, 9), ca = randomInt(4, 9);
      return {
        text: "Calcule le périmètre du triangle représenté (en cm).",
        format: "short",
        expected: [String(ab + bc + ca)],
        comparator: "number_equal",
        explanation:
          `Définition : le périmètre est la somme des côtés.\n\nMéthode : on additionne les longueurs de la figure.\n\nCalcul : $${ab} + ${bc} + ${ca} = ${ab + bc + ca}$.\n\nConclusion : le périmètre est $${ab + bc + ca}$ cm.`,
        canvas: triangleFigureFromSides(ab, bc, ca),
      };
    },
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
    expected: ["7"],
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
    hint: "côté $= \\dfrac{P}{3}$ pour un équilatéral.",
    tags: ["aire_perimetre", "triangle", "inverse", "template"],
    generate: () => {
      const c = randomInt(4, 10);
      const p = 3 * c;
      return {
        text: `Un triangle équilatéral a un périmètre de $${p}$ cm. Quelle est la longueur d’un côté (en cm) ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          `Définition : un équilatéral a trois côtés égaux.\n\nMéthode : côté $= \\dfrac{P}{3}$.\n\nCalcul : $\\dfrac{${p}}{3} = ${c}$.\n\nConclusion : le côté mesure $${c}$ cm.`,
      };
    },
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
    hint: "Compte le contour extérieur unité par unité.",
    tags: ["aire_perimetre", "figure", "figure_libre", "template"],
    generate: () => {
      const h = randomInt(2, 5), w = randomInt(2, 5);
      const cells = rectangleCells(h, w);
      const p = computeGridPerimeter(cells);
      return {
        text: "Chaque petit carré a un côté de 1 unité. Quel est le périmètre de la figure ?",
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          `Définition : le périmètre est le contour extérieur.\n\nMéthode : on compte les unités du bord.\n\nCalcul : le contour contient $${p}$ unités.\n\nConclusion : le périmètre est $${p}$ unités.`,
        canvas: figureLibreFromCells(h, w, cells, true),
      };
    },
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
    generate: () => {
      const a = randomInt(3, 5), b = randomInt(3, 5);
      const cells = lShapeCells(a, b, 1, 1);
      const p = computeGridPerimeter(cells);
      return {
        text: "Chaque petit carré a un côté de 1 unité. Quel est le périmètre de cette figure en L ?",
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          `Définition : on ne compte que le contour extérieur.\n\nMéthode : on suit le bord de la figure.\n\nCalcul : on obtient $${p}$ unités.\n\nConclusion : le périmètre est $${p}$ unités.`,
        canvas: figureLibreFromCells(a, b, cells, true),
      };
    },
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
    choices: ["$26$", "$36$", "$31$", "$20$"],
    expected: ["$26$"],
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
    generate: () => {
      const cells = randomChoice([lShapeCells(4, 4, 2, 1), lShapeCells(5, 3, 1, 2), lShapeCells(4, 5, 2, 2)]);
      const maxRow = Math.max(...cells.map((c) => c[0])) + 1;
      const maxCol = Math.max(...cells.map((c) => c[1])) + 1;
      const p = computeGridPerimeter(cells);
      return {
        text: "Chaque petit carré a un côté de 1 unité. Quel est le périmètre de la figure ?",
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          `Définition : le périmètre est le contour extérieur.\n\nMéthode : on suit le bord de la figure.\n\nCalcul : on obtient $${p}$ unités.\n\nConclusion : le périmètre est $${p}$ unités.`,
        canvas: figureLibreFromCells(maxRow, maxCol, cells, true),
      };
    },
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
    hint: "Additionne tous les côtés du contour.",
    tags: ["aire_perimetre", "figure", "template"],
    generate: () => {
      const a = randomInt(4, 8), b = randomInt(2, 5), c = randomInt(3, 6);
      const p = 2 * a + 2 * b + 2 * c;
      return {
        text: `Une figure en escalier a un contour formé de segments dont la somme se calcule ainsi : deux fois $${a}$, deux fois $${b}$ et deux fois $${c}$ (en cm). Quel est son périmètre (en cm) ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          `Définition : le périmètre est la somme des longueurs du contour.\n\nMéthode : on additionne tous les segments.\n\nCalcul : $2 \\times ${a} + 2 \\times ${b} + 2 \\times ${c} = ${p}$.\n\nConclusion : le périmètre est $${p}$ cm.`,
      };
    },
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
    hint: "La clôture suit le périmètre.",
    tags: ["aire_perimetre", "probleme", "template"],
    generate: () => {
      const L = randomInt(10, 25), l = randomInt(5, 12);
      const p = 2 * (L + l);
      return {
        text: `Un champ rectangulaire mesure $${L}$ m sur $${l}$ m. Combien de mètres de clôture pour l’entourer ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          `Définition : la clôture suit le périmètre.\n\nMéthode : $P = 2 \\times (L + l)$.\n\nCalcul : $2 \\times (${L} + ${l}) = ${p}$.\n\nConclusion : il faut $${p}$ m.`,
      };
    },
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
    hint: "Calcule le périmètre, puis multiplie par le prix au mètre.",
    tags: ["aire_perimetre", "probleme", "template"],
    generate: () => {
      const c = randomInt(5, 12), prix = randomInt(2, 5);
      const p = 4 * c;
      const total = p * prix;
      return {
        text: `On clôture un jardin carré de côté $${c}$ m. La clôture coûte $${prix}$ € le mètre. Quel est le coût total (en €) ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : le coût dépend du périmètre.\n\nMéthode : périmètre $= 4 \\times ${c} = ${p}$ m, puis $\\times ${prix}$ €.\n\nCalcul : $${p} \\times ${prix} = ${total}$.\n\nConclusion : le coût total est $${total}$ €.`,
      };
    },
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
    expected: ["200"],
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
    hint: "côté $= \\dfrac{P}{4}$.",
    tags: ["aire_perimetre", "probleme", "inverse", "template"],
    generate: () => {
      const c = randomInt(4, 12);
      const p = 4 * c;
      return {
        text: `On a utilisé $${p}$ m de grillage pour entourer entièrement un enclos carré. Quelle est la longueur d’un côté (en m) ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          `Définition : le grillage correspond au périmètre.\n\nMéthode : côté $= \\dfrac{P}{4}$.\n\nCalcul : $\\dfrac{${p}}{4} = ${c}$.\n\nConclusion : le côté mesure $${c}$ m.`,
      };
    },
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
    hint: "Additionne les côtés, puis compare au rouleau disponible.",
    tags: ["aire_perimetre", "probleme", "template"],
    generate: () => {
      const L = randomInt(8, 14), l = randomInt(4, 8);
      const p = 2 * (L + l);
      const rouleau = p + randomInt(2, 8);
      return {
        text: `Un rectangle mesure $${L}$ m sur $${l}$ m. On a un rouleau de $${rouleau}$ m de ruban. Combien de mètres restera-t-il après avoir fait le tour (en m) ?`,
        format: "short",
        expected: [String(rouleau - p)],
        comparator: "number_equal",
        explanation:
          `Définition : le tour correspond au périmètre.\n\nMéthode : on calcule le périmètre, puis on soustrait au rouleau.\n\nCalcul : périmètre $= 2 \\times (${L} + ${l}) = ${p}$ ; reste $= ${rouleau} - ${p} = ${rouleau - p}$.\n\nConclusion : il reste $${rouleau - p}$ m.`,
      };
    },
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
    hint: "Périmètre d’un rectangle de dimensions $x$ et $x+k$ : $2(2x + k)$.",
    tags: ["aire_perimetre", "defi", "litteral", "template"],
    generate: () => {
      const k = randomInt(2, 5);
      const x = randomInt(3, 8);
      const p = 2 * (2 * x + k);
      return {
        text: `Un rectangle a une largeur $x$ et une longueur $x + ${k}$. Pour $x = ${x}$ cm, quel est son périmètre (en cm) ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          `Définition : $P = 2 \\times (L + l) = 2 \\times (x + (x + ${k})) = 2(2x + ${k})$.\n\nMéthode : on remplace $x$ par $${x}$.\n\nCalcul : $2 \\times (2 \\times ${x} + ${k}) = 2 \\times ${2 * x + k} = ${p}$.\n\nConclusion : le périmètre est $${p}$ cm.`,
      };
    },
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
    hint: "Compare l’ancien et le nouveau périmètre.",
    tags: ["aire_perimetre", "defi", "template"],
    generate: () => {
      const c = randomInt(4, 10), ajout = randomInt(1, 3);
      const diff = 4 * ajout;
      return {
        text: `On augmente le côté d’un carré (côté $${c}$ cm) de $${ajout}$ cm. De combien augmente son périmètre (en cm) ?`,
        format: "short",
        expected: [String(diff)],
        comparator: "number_equal",
        explanation:
          `Définition : $P = 4 \\times$ côté.\n\nMéthode : l’augmentation du périmètre est $4 \\times$ l’augmentation du côté.\n\nCalcul : $4 \\times ${ajout} = ${diff}$.\n\nConclusion : le périmètre augmente de $${diff}$ cm.`,
      };
    },
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
    hint: "Périmètre d’un carré = 4 × côté.",
    tags: ["aire_perimetre", "defi", "template"],
    generate: () => {
      const cote = randomInt(3, 9);
      const perimetre = 4 * cote;
      return {
        text: `Un carré a un périmètre de $${perimetre}$ cm. Quelle est la longueur de son côté (en cm) ?`,
        format: "short",
        expected: [String(cote)],
        comparator: "number_equal",
        explanation:
          `Définition : pour un carré, $P = 4 \\times$ côté, donc côté $= P \\div 4$.\n\n` +
          "Méthode : on divise le périmètre par 4.\n\n" +
          `Calcul : $${perimetre} \\div 4 = ${cote}$.\n\n` +
          `Conclusion : le côté mesure $${cote}$ cm.`,
      };
    },
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
    text: "Explique pourquoi deux figures peuvent avoir le même périmètre mais des formes différentes.",
    format: "open",
    expected: ["périmètre", "contour", "forme"],
    comparator: "contains_keyword",
    hint: "Le périmètre mesure le contour, pas la forme.",
    explanation:
      "Définition : le périmètre est la longueur totale du contour.\n\n" +
      "Méthode : on peut répartir cette longueur de bien des façons.\n\n" +
      "Calcul : un carré 5×5 et un rectangle 7×3 ont tous deux un périmètre de 20 cm.\n\n" +
      "Conclusion : un même périmètre peut correspondre à des formes différentes.",
    tags: ["aire_perimetre", "defi", "open"],
  },
];