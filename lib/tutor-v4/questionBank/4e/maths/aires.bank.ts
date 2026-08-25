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
 */
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
    generate: () => {
      const L = randomInt(4, 15);
      const l = randomInt(2, 9);
      const area = L * l;

      return {
        text: `Calculer l’aire d’un rectangle de longueur ${L} cm et de largeur ${l} cm.`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          (`A = ${L} × ${l} = ${area}.`) +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
      };
    },
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
        explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          (`La surface d’un rectangle vaut longueur × largeur, donc ${L} × ${l} = ${area}.`) +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
      };
    },
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
    generate: () => {
      const L = randomInt(4, 12);
      const l = randomInt(2, 7);
      const area = L * l;

      return {
        text: "Calculer l’aire du rectangle représenté.",
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          (`L’aire du rectangle vaut ${L} × ${l} = ${area}.`) +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
        canvas: quadrilatereRectangleFigure(L, l),
      };
    },
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
    generate: () => {
      const c = randomInt(2, 14);
      const area = c * c;

      return {
        text: `Calculer l’aire d’un carré de côté ${c} cm.`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          (`L’aire du carré vaut ${c} × ${c} = ${area}.`) +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
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
        explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          (`A = (${base} × ${height}) ÷ 2 = ${area}.`) +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
        canvas: triangleFigure(base, other1, other2),
      };
    },
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
        explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          (`Comme le triangle est rectangle, on prend les deux côtés perpendiculaires : A = (${base} × ${height}) ÷ 2 = ${area}.`) +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
        canvas: triangleRectangleFigure(base, height, hypotenuse),
      };
    },
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
        explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          (`L’aire d’un parallélogramme vaut base × hauteur, donc ${base} × ${height} = ${area}.`) +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
        canvas: quadrilatereParallelogramFigure(base, side, height),
      };
    },
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
        explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          (`On compte ${area} petits carrés, donc l’aire vaut ${area}.`) +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
        canvas: figureLibreFromCells(h, w, cells, false),
      };
    },
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
        explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          (`La figure contient ${area} carrés unité, donc son aire vaut ${area}.`) +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
        canvas: figureLibreFromCells(a, b, cells, false),
      };
    },
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
    generate: () => {
      const L = randomInt(3, 10);
      const l = randomInt(2, 8);
      const area = L * l;

      return {
        text: `Une terrasse rectangulaire mesure ${L} m de long et ${l} m de large. Quelle est sa surface ?`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          (`La surface d’une terrasse rectangulaire vaut ${L} × ${l} = ${area}.`) +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
      };
    },
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
    generate: () => {
      const base = randomChoice([6, 8, 10, 12]);
      const height = randomChoice([3, 4, 6]);
      const area = (base * height) / 2;

      return {
        text: `Un panneau triangulaire a pour base ${base} cm et pour hauteur ${height} cm. Quelle est son aire ?`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          (`A = (${base} × ${height}) ÷ 2 = ${area}.`) +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
      };
    },
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
          "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          (`Oui. Par exemple, deux figures contenant chacune ${rect.length} carrés unité ont la même aire, même si leur forme est différente.`) +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
      };
    },
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
          "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          (`Non. L’aire d’un parallélogramme se calcule avec la base et la hauteur : ${base} × ${height} = ${good}, et non avec le côté incliné.`) +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
      };
    },
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
          "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          (`Aire du rectangle : ${a} × ${b} = ${rectArea}. Aire du carré : ${squareSide} × ${squareSide} = ${squareArea}.`) +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
      };
    },
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
    generate: () => {
      return {
        text: "Explique pourquoi deux figures différentes peuvent avoir la même aire.",
        format: "open",
        expected: ["même", "aire", "surface", "différentes"],
        comparator: "contains_keyword",
        explanation:
          "Définition : une aire mesure la surface occupée par une figure, avec une unité carrée comme cm² ou m².\n\n" +
          "Méthode : on choisit la formule adaptée à la figure ou on compte les carreaux quand la figure est quadrillée.\n\nCalcul : " +
          ("Deux figures peuvent avoir des formes différentes mais occuper la même surface. Par exemple, deux figures contenant chacune 8 carrés unités ont la même aire.") +
          "\n\nConclusion : on obtient l’aire demandée avec une unité carrée.",
      };
    },
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
    generate: () => {
      const h = randomInt(2, 4), w = randomInt(2, 5);
      const cells = rectangleCells(h, w);
      return {
        text: "Chaque petit carré a une aire de $1$ unité². Quelle est l’aire de la figure ?",
        format: "short",
        expected: [String(cells.length)],
        comparator: "number_equal",
        explanation:
          `Définition : l’aire est le nombre de carrés unité.\n\nMéthode : on compte les carrés.\n\nCalcul : il y en a $${cells.length}$.\n\nConclusion : l’aire est $${cells.length}$ unités².`,
        canvas: figureLibreFromCells(h, w, cells, false),
      };
    },
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
    generate: () => {
      const L = randomInt(5, 15), l = randomInt(2, 9);
      return {
        text: `Quelle est l’aire d’un rectangle de longueur $${L}$ cm et de largeur $${l}$ cm (en $\\text{cm}^2$) ?`,
        format: "short",
        expected: [String(L * l)],
        comparator: "number_equal",
        explanation:
          `Définition : $A = L \\times l$.\n\nMéthode : on multiplie les dimensions.\n\nCalcul : $${L} \\times ${l} = ${L * l}$.\n\nConclusion : l’aire est $${L * l}\\ \\text{cm}^2$.`,
      };
    },
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
    generate: () => {
      const L = randomInt(4, 9), l = randomInt(3, 8);
      const A = L * l;
      return {
        text: `Un rectangle a une aire de $${A}\\ \\text{cm}^2$ et une longueur de $${L}$ cm. Quelle est sa largeur (en cm) ?`,
        format: "short",
        expected: [String(l)],
        comparator: "number_equal",
        explanation:
          `Définition : $A = L \\times l$, donc $l = \\dfrac{A}{L}$.\n\nMéthode : on divise l’aire par la longueur.\n\nCalcul : $\\dfrac{${A}}{${L}} = ${l}$.\n\nConclusion : la largeur est $${l}$ cm.`,
      };
    },
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
    generate: () => {
      const L = randomInt(4, 12), l = randomInt(2, 7);
      return {
        text: "Calcule l’aire du rectangle représenté (en $\\text{cm}^2$).",
        format: "short",
        expected: [String(L * l)],
        comparator: "number_equal",
        explanation:
          `Définition : $A = L \\times l$.\n\nMéthode : on lit les dimensions et on multiplie.\n\nCalcul : $${L} \\times ${l} = ${L * l}$.\n\nConclusion : l’aire est $${L * l}\\ \\text{cm}^2$.`,
        canvas: quadrilatereRectangleFigure(L, l),
      };
    },
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
    hint: "La surface à carreler est l’aire.",
    tags: ["aire", "rectangle", "probleme", "template"],
    generate: () => {
      const L = randomInt(4, 8), l = randomInt(3, 6);
      return {
        text: `Une pièce rectangulaire mesure $${L}$ m sur $${l}$ m. Quelle est sa surface (en $\\text{m}^2$) ?`,
        format: "short",
        expected: [String(L * l)],
        comparator: "number_equal",
        explanation:
          `Définition : la surface est l’aire du rectangle.\n\nMéthode : $A = L \\times l$.\n\nCalcul : $${L} \\times ${l} = ${L * l}$.\n\nConclusion : la surface est $${L * l}\\ \\text{m}^2$.`,
      };
    },
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
    generate: () => {
      const c = randomInt(2, 15);
      return {
        text: `Quelle est l’aire d’un carré de côté $${c}$ cm (en $\\text{cm}^2$) ?`,
        format: "short",
        expected: [String(c * c)],
        comparator: "number_equal",
        explanation:
          `Définition : $A = c^2$.\n\nMéthode : on multiplie le côté par lui-même.\n\nCalcul : $${c} \\times ${c} = ${c * c}$.\n\nConclusion : l’aire est $${c * c}\\ \\text{cm}^2$.`,
      };
    },
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
    generate: () => {
      const c = randomChoice([5, 6, 7, 8, 9, 10, 12]);
      const A = c * c;
      return {
        text: `Un carré a une aire de $${A}\\ \\text{cm}^2$. Quelle est la longueur de son côté (en cm) ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          `Définition : $A = c^2$, donc côté $= \\sqrt{A}$.\n\nMéthode : on cherche le nombre dont le carré vaut $${A}$.\n\nCalcul : $\\sqrt{${A}} = ${c}$.\n\nConclusion : le côté mesure $${c}$ cm.`,
      };
    },
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
    generate: () => {
      const c = randomInt(3, 10);
      return {
        text: `Une nappe carrée a un côté de $${c}$ m. Quelle est sa surface (en $\\text{m}^2$) ?`,
        format: "short",
        expected: [String(c * c)],
        comparator: "number_equal",
        explanation:
          `Définition : surface d’un carré $= c^2$.\n\nMéthode : on calcule $c \\times c$.\n\nCalcul : $${c} \\times ${c} = ${c * c}$.\n\nConclusion : la surface est $${c * c}\\ \\text{m}^2$.`,
      };
    },
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
    hint: "$A = c^2$.",
    tags: ["aire", "carre", "template"],
    generate: () => {
      const c = randomInt(4, 13);
      return {
        text: `Calcule l’aire d’un carré de côté $${c}$ cm (en $\\text{cm}^2$).`,
        format: "short",
        expected: [String(c * c)],
        comparator: "number_equal",
        explanation:
          `Définition : $A = c^2$.\n\nMéthode : côté × côté.\n\nCalcul : $${c}^2 = ${c * c}$.\n\nConclusion : l’aire est $${c * c}\\ \\text{cm}^2$.`,
      };
    },
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
    generate: () => {
      const base = randomChoice([6, 8, 10, 12, 14]);
      const h = randomChoice([3, 4, 5, 6]);
      const A = (base * h) / 2;
      return {
        text: `Quelle est l’aire d’un triangle de base $${base}$ cm et de hauteur $${h}$ cm (en $\\text{cm}^2$) ?`,
        format: "short",
        expected: [String(A)],
        comparator: "number_equal",
        explanation:
          `Définition : $A = \\dfrac{b \\times h}{2}$.\n\nMéthode : base × hauteur, puis ÷ $2$.\n\nCalcul : $\\dfrac{${base} \\times ${h}}{2} = ${A}$.\n\nConclusion : l’aire est $${A}\\ \\text{cm}^2$.`,
        canvas: triangleFigure(base, randomInt(5, 12), randomInt(5, 12)),
      };
    },
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
    generate: () => {
      const base = randomChoice([6, 8, 10]);
      const h = randomChoice([4, 6, 8]);
      const hyp = Math.round(Math.sqrt(base * base + h * h) * 10) / 10;
      const A = (base * h) / 2;
      return {
        text: "Calcule l’aire du triangle rectangle représenté (en $\\text{cm}^2$).",
        format: "short",
        expected: [String(A)],
        comparator: "number_equal",
        explanation:
          `Définition : pour un triangle rectangle, base et hauteur sont les deux côtés de l’angle droit.\n\nMéthode : $A = \\dfrac{b \\times h}{2}$.\n\nCalcul : $\\dfrac{${base} \\times ${h}}{2} = ${A}$.\n\nConclusion : l’aire est $${A}\\ \\text{cm}^2$.`,
        canvas: triangleRectangleFigure(base, h, hyp),
      };
    },
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
    generate: () => {
      const base = randomChoice([4, 6, 8, 10]);
      const h = randomChoice([3, 5, 6]);
      const A = (base * h) / 2;
      return {
        text: `Un triangle a une aire de $${A}\\ \\text{cm}^2$ et une base de $${base}$ cm. Quelle est sa hauteur (en cm) ?`,
        format: "short",
        expected: [String(h)],
        comparator: "number_equal",
        explanation:
          `Définition : $A = \\dfrac{b \\times h}{2}$, donc $h = \\dfrac{2A}{b}$.\n\nMéthode : on isole la hauteur.\n\nCalcul : $\\dfrac{2 \\times ${A}}{${base}} = \\dfrac{${2 * A}}{${base}} = ${h}$.\n\nConclusion : la hauteur est $${h}$ cm.`,
      };
    },
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
    generate: () => {
      const base = randomInt(5, 14), h = randomInt(3, 8);
      return {
        text: `Quelle est l’aire d’un parallélogramme de base $${base}$ cm et de hauteur $${h}$ cm (en $\\text{cm}^2$) ?`,
        format: "short",
        expected: [String(base * h)],
        comparator: "number_equal",
        explanation:
          `Définition : $A = \\text{base} \\times \\text{hauteur}$.\n\nMéthode : on multiplie base et hauteur.\n\nCalcul : $${base} \\times ${h} = ${base * h}$.\n\nConclusion : l’aire est $${base * h}\\ \\text{cm}^2$.`,
        canvas: quadrilatereParallelogramFigure(base, randomInt(4, 10), h),
      };
    },
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
    generate: () => {
      const base = randomInt(4, 10), h = randomInt(3, 7);
      const A = base * h;
      return {
        text: `Un parallélogramme a une aire de $${A}\\ \\text{cm}^2$ et une base de $${base}$ cm. Quelle est sa hauteur (en cm) ?`,
        format: "short",
        expected: [String(h)],
        comparator: "number_equal",
        explanation:
          `Définition : $A = \\text{base} \\times \\text{hauteur}$, donc hauteur $= \\dfrac{A}{\\text{base}}$.\n\nMéthode : on divise l’aire par la base.\n\nCalcul : $\\dfrac{${A}}{${base}} = ${h}$.\n\nConclusion : la hauteur est $${h}$ cm.`,
      };
    },
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
    generate: () => {
      const base = randomInt(6, 12), h = randomInt(4, 9);
      return {
        text: `Un terrain en forme de parallélogramme a une base de $${base}$ m et une hauteur de $${h}$ m. Quelle est sa surface (en $\\text{m}^2$) ?`,
        format: "short",
        expected: [String(base * h)],
        comparator: "number_equal",
        explanation:
          `Définition : aire $= \\text{base} \\times \\text{hauteur}$.\n\nMéthode : on multiplie.\n\nCalcul : $${base} \\times ${h} = ${base * h}$.\n\nConclusion : la surface est $${base * h}\\ \\text{m}^2$.`,
      };
    },
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
    generate: () => {
      const h = randomInt(2, 5), w = randomInt(2, 5);
      const cells = rectangleCells(h, w);
      return {
        text: "Chaque petit carré a une aire de $1$ unité². Quelle est l’aire de la figure ?",
        format: "short",
        expected: [String(cells.length)],
        comparator: "number_equal",
        explanation:
          `Définition : l’aire est le nombre de carrés unité.\n\nMéthode : on compte les carrés.\n\nCalcul : il y en a $${cells.length}$.\n\nConclusion : l’aire est $${cells.length}$ unités².`,
        canvas: figureLibreFromCells(h, w, cells, false),
      };
    },
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
    hint: "Compte tous les carrés de la figure en L.",
    tags: ["aire", "figure_composee", "figure_libre", "template"],
    generate: () => {
      const a = randomInt(3, 5), b = randomInt(3, 5);
      const cells = lShapeCells(a, b, 1, 1);
      return {
        text: "Chaque petit carré a une aire de $1$ unité². Quelle est l’aire de la figure en L ?",
        format: "short",
        expected: [String(cells.length)],
        comparator: "number_equal",
        explanation:
          `Définition : on compte tous les carrés unité.\n\nMéthode : on additionne les carrés remplis.\n\nCalcul : il y en a $${cells.length}$.\n\nConclusion : l’aire est $${cells.length}$ unités².`,
        canvas: figureLibreFromCells(a, b, cells, false),
      };
    },
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
    generate: () => {
      const L = randomInt(8, 12), l = randomInt(5, 7), c = randomInt(2, 3);
      const A = L * l - c * c;
      return {
        text: `Dans un rectangle de $${L} \\times ${l}$ cm, on découpe un carré de côté $${c}$ cm. Quelle est l’aire restante (en $\\text{cm}^2$) ?`,
        format: "short",
        expected: [String(A)],
        comparator: "number_equal",
        explanation:
          `Définition : on soustrait l’aire enlevée à l’aire totale.\n\nMéthode : $A = L \\times l - c^2$.\n\nCalcul : $${L * l} - ${c * c} = ${A}$.\n\nConclusion : l’aire restante est $${A}\\ \\text{cm}^2$.`,
      };
    },
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
    generate: () => {
      const a = randomInt(3, 6), b = randomInt(2, 4), c = randomInt(2, 5), d = randomInt(2, 4);
      const A = a * b + c * d;
      return {
        text: `Une figure se découpe en deux rectangles : l’un de $${a} \\times ${b}$ cm, l’autre de $${c} \\times ${d}$ cm. Quelle est l’aire totale (en $\\text{cm}^2$) ?`,
        format: "short",
        expected: [String(A)],
        comparator: "number_equal",
        explanation:
          `Définition : l’aire totale est la somme des aires.\n\nMéthode : on additionne les deux aires.\n\nCalcul : $${a} \\times ${b} + ${c} \\times ${d} = ${a * b} + ${c * d} = ${A}$.\n\nConclusion : l’aire totale est $${A}\\ \\text{cm}^2$.`,
      };
    },
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
    generate: () => {
      const L = randomInt(4, 8), l = randomInt(3, 6), parM2 = randomInt(2, 4);
      const A = L * l;
      return {
        text: `Un mur rectangulaire mesure $${L}$ m sur $${l}$ m. Il faut $${parM2}$ pots de peinture par $\\text{m}^2$. Combien de pots faut-il ?`,
        format: "short",
        expected: [String(A * parM2)],
        comparator: "number_equal",
        explanation:
          `Définition : on calcule l’aire, puis on multiplie par les pots par $\\text{m}^2$.\n\nMéthode : aire $= ${L} \\times ${l} = ${A}\\ \\text{m}^2$, puis $\\times ${parM2}$.\n\nCalcul : $${A} \\times ${parM2} = ${A * parM2}$.\n\nConclusion : il faut $${A * parM2}$ pots.`,
      };
    },
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
    hint: "La surface est l’aire du rectangle.",
    tags: ["aire", "probleme", "template"],
    generate: () => {
      const L = randomInt(4, 10), l = randomInt(3, 7);
      return {
        text: `Une terrasse rectangulaire mesure $${L}$ m sur $${l}$ m. Quelle est sa surface (en $\\text{m}^2$) ?`,
        format: "short",
        expected: [String(L * l)],
        comparator: "number_equal",
        explanation:
          `Définition : la surface est l’aire.\n\nMéthode : $A = L \\times l$.\n\nCalcul : $${L} \\times ${l} = ${L * l}$.\n\nConclusion : la surface est $${L * l}\\ \\text{m}^2$.`,
      };
    },
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
    generate: () => {
      const cote = randomChoice([2, 3, 4]); // pièce côté en m
      const carreauCote = 1; // 1 m carreau pour rester entier
      const nb = (cote * cote) / (carreauCote * carreauCote);
      return {
        text: `Une pièce carrée de côté $${cote}$ m est carrelée avec des dalles carrées de $1$ m de côté. Combien de dalles faut-il ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation:
          `Définition : nombre de dalles = aire de la pièce ÷ aire d’une dalle.\n\nMéthode : aire pièce $= ${cote}^2 = ${cote * cote}\\ \\text{m}^2$, aire dalle $= 1\\ \\text{m}^2$.\n\nCalcul : $\\dfrac{${cote * cote}}{1} = ${nb}$.\n\nConclusion : il faut $${nb}$ dalles.`,
      };
    },
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
    generate: () => {
      const L = randomInt(3, 7), l = randomInt(2, 5), prix = randomInt(5, 12);
      const A = L * l;
      return {
        text: `Une moquette coûte $${prix}$ € le $\\text{m}^2$. Quel est le prix pour une pièce de $${L}$ m sur $${l}$ m (en €) ?`,
        format: "short",
        expected: [String(A * prix)],
        comparator: "number_equal",
        explanation:
          `Définition : le coût = aire × prix au $\\text{m}^2$.\n\nMéthode : aire $= ${L} \\times ${l} = ${A}$, puis $\\times ${prix}$.\n\nCalcul : $${A} \\times ${prix} = ${A * prix}$.\n\nConclusion : le prix est $${A * prix}$ €.`,
      };
    },
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
    generate: () => {
      const A = randomChoice([5, 8, 10, 12]);
      const k = randomChoice([2, 3]);
      return {
        text: `Une figure a une aire de $${A}\\ \\text{cm}^2$. On multiplie toutes ses longueurs par $${k}$. Quelle est la nouvelle aire (en $\\text{cm}^2$) ?`,
        format: "short",
        expected: [String(A * k * k)],
        comparator: "number_equal",
        explanation:
          `Définition : un agrandissement de rapport $${k}$ multiplie l’aire par $${k}^2$.\n\nMéthode : on multiplie l’aire par $${k * k}$.\n\nCalcul : $${A} \\times ${k * k} = ${A * k * k}$.\n\nConclusion : la nouvelle aire est $${A * k * k}\\ \\text{cm}^2$.`,
      };
    },
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
    tags: ["aire", "defi", "comparaison", "template"],
    generate: () => {
      const a = randomInt(3, 6), b = randomInt(4, 7);
      const rectA = a * b;
      const c = randomChoice([4, 5, 6]);
      const carreA = c * c;
      const correct = rectA > carreA ? "le rectangle" : rectA < carreA ? "le carré" : "ils ont la même aire";
      return {
        text: `On compare un rectangle de $${a} \\times ${b}$ cm et un carré de côté $${c}$ cm. Quelle figure a la plus grande aire ?`,
        format: "qcm",
        choices: ["le rectangle", "le carré", "ils ont la même aire"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : on compare les aires.\n\nMéthode : rectangle $= ${a} \\times ${b} = ${rectA}$ ; carré $= ${c}^2 = ${carreA}$.\n\nCalcul : on compare $${rectA}$ et $${carreA}$.\n\nConclusion : ${correct === "ils ont la même aire" ? "ils ont la même aire." : `c’est ${correct}.`}`,
      };
    },
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
    hint: "Aire d’un rectangle de dimensions $x$ et $x + k$.",
    tags: ["aire", "defi", "litteral", "template"],
    generate: () => {
      const k = randomInt(2, 4), x = randomInt(3, 7);
      const A = x * (x + k);
      return {
        text: `Un rectangle a pour largeur $x$ et pour longueur $x + ${k}$. Pour $x = ${x}$ cm, quelle est son aire (en $\\text{cm}^2$) ?`,
        format: "short",
        expected: [String(A)],
        comparator: "number_equal",
        explanation:
          `Définition : $A = x \\times (x + ${k})$.\n\nMéthode : on remplace $x$ par $${x}$.\n\nCalcul : $${x} \\times ${x + k} = ${A}$.\n\nConclusion : l’aire est $${A}\\ \\text{cm}^2$.`,
      };
    },
  },
];