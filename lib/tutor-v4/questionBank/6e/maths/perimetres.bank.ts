import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const perimetresBank: TutorBankItemV4[] = [
  // =========================
  // PERIM_COMPRENDRE
  // =========================
  {
    kind: "fixed",
    id: "perim_comprendre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Le périmètre d’une figure correspond…",
    format: "qcm",
    choices: [
      "à la surface intérieure",
      "au contour de la figure",
      "au nombre d’angles",
      "à l’aire de la figure",
    ],
    expected: ["au contour de la figure"],
    comparator: "mcq_exact",
    hint: "Le périmètre, c’est le tour de la figure.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre correspond à la longueur du contour d’une figure, c’est-à-dire tout son tour.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_comprendre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité convient pour mesurer un périmètre ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "kg"],
    expected: ["cm"],
    comparator: "mcq_exact",
    hint: "Le périmètre est une longueur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre est une longueur. On l’exprime donc avec une unité de longueur, par exemple en centimètres.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_comprendre_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture peut désigner un périmètre ?",
    format: "qcm",
    choices: ["18 cm", "18 cm²", "18 cm³", "18 L"],
    expected: ["18 cm"],
    comparator: "mcq_exact",
    hint: "Le périmètre se mesure en unités de longueur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("18 cm désigne une longueur. 18 cm² désigne une aire et 18 cm³ un volume. Un périmètre s’exprime donc ici en cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_comprendre_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_comprendre",
    difficulty: 2,
    theme: "reunion",
    text: "Pour mesurer le tour d’un petit jardin à La Réunion, on parle de…",
    format: "qcm",
    choices: ["aire", "volume", "périmètre", "masse"],
    expected: ["périmètre"],
    comparator: "mcq_exact",
    hint: "Le tour d’une figure s’appelle le périmètre.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le tour d’un jardin correspond à son contour. On mesure donc son périmètre.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "comprendre", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_comprendre_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 5 cm sur 4 cm. Que vaut son périmètre ?",
    format: "qcm",
    choices: ["9 cm", "20 cm", "18 cm", "20 cm²"],
    expected: ["18 cm"],
    comparator: "mcq_exact",
    hint: "Attention à ne pas faire longueur × largeur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre du rectangle vaut 2 × (5 + 4) = 18 cm. Le calcul 5 × 4 = 20 donne l’aire, pas le périmètre.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "comprendre", "confusion", "qcm"],
  },

  // =========================
  // PERIM_SQUARE
  // =========================
  {
    kind: "fixed",
    id: "perim_square_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_square",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le périmètre d’un carré de côté 5 cm ?",
    format: "short",
    expected: ["20", "20 cm", "20cm"],
    comparator: "number_equal",
    hint: "Périmètre du carré = 4 × côté.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Un carré a 4 côtés égaux. Avec un côté de 5 cm, on calcule 4 × 5 = 20 cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "carre"],
  },
  {
    kind: "fixed",
    id: "perim_square_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_square",
    difficulty: 1,
    theme: "neutral",
    text: "Un carré a un côté de 7 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["28", "28 cm", "28cm"],
    comparator: "number_equal",
    hint: "Le carré a 4 côtés égaux.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre d’un carré est égal à 4 fois la longueur d’un côté. Ici, 4 × 7 = 28 cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "carre"],
  },
  {
    kind: "fixed",
    id: "perim_square_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_square",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le périmètre d’un carré de côté 6 cm ?",
    format: "qcm",
    choices: ["12 cm", "18 cm", "24 cm", "36 cm"],
    expected: ["24 cm"],
    comparator: "mcq_exact",
    hint: "Pour le périmètre, on additionne les 4 côtés.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Un carré a 4 côtés de 6 cm. Son périmètre vaut donc 6 + 6 + 6 + 6 = 24 cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_square_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_square",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis la bonne réponse : le périmètre d’un carré de côté 9 cm est...",
    format: "qcm",
    choices: ["18 cm", "27 cm", "36 cm", "81 cm"],
    expected: ["36 cm"],
    comparator: "mcq_exact",
    hint: "Attention à ne pas confondre périmètre et aire.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre d’un carré de côté 9 cm vaut 4 × 9 = 36 cm. 81 correspondrait à l’aire.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_square_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_square",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. Quel est le périmètre du carré ABCD ?",
    format: "short",
    expected: ["20", "20 cm", "20cm"],
    comparator: "number_equal",
    hint: "Le carré a 4 côtés de même longueur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le côté AB mesure 5 cm et tous les côtés d’un carré sont égaux. Le périmètre vaut donc 4 × 5 = 20 cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "carre", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 70 },
        B: { x: 190, y: 70 },
        C: { x: 190, y: 190 },
        D: { x: 70, y: 190 },
      },
      sideLabels: {
        AB: "5 cm",
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
  // PERIM_RECTANGLE
  // =========================
  {
    kind: "fixed",
    id: "perim_rectangle_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Un rectangle mesure 3 cm sur 7 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["20", "20 cm", "20cm"],
    comparator: "number_equal",
    hint: "Périmètre du rectangle = 2 × longueur + 2 × largeur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Un rectangle a 2 longueurs et 2 largeurs. Ici, 7 + 7 + 3 + 3 = 20 cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "rectangle"],
  },
  {
    kind: "fixed",
    id: "perim_rectangle_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Un rectangle mesure 4 cm de largeur et 8 cm de longueur. Quel est son périmètre ?",
    format: "short",
    expected: ["24", "24 cm", "24cm"],
    comparator: "number_equal",
    hint: "Additionne les 4 côtés ou fais 2 × (L + l).",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre du rectangle vaut 2 × (8 + 4) = 2 × 12 = 24 cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "rectangle"],
  },
  {
    kind: "fixed",
    id: "perim_rectangle_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle mesure 5 cm sur 2 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["7 cm", "10 cm", "14 cm", "20 cm"],
    expected: ["14 cm"],
    comparator: "mcq_exact",
    hint: "Il y a 2 longueurs et 2 largeurs.",
    explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre vaut 5 + 5 + 2 + 2 = 14 cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "rectangle", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_rectangle_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle mesure 6 cm sur 4 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["10 cm", "20 cm", "24 cm", "16 cm"],
    expected: ["20 cm"],
    comparator: "mcq_exact",
    hint: "Le périmètre est le tour complet de la figure.",
    explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("On additionne tous les côtés : 6 + 6 + 4 + 4 = 20 cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "rectangle", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_rectangle_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm sur 3 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["11 cm", "22 cm", "24 cm", "48 cm"],
    expected: ["22 cm"],
    comparator: "mcq_exact",
    hint: "24 correspond à l’aire, pas au périmètre.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre vaut 8 + 8 + 3 + 3 = 22 cm. 24 correspond au produit 8 × 3, donc à l’aire.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "rectangle", "confusion", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_rectangle_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 6 cm sur 2 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["8 cm", "16 cm", "12 cm", "20 cm"],
    expected: ["16 cm"],
    comparator: "mcq_exact",
    hint: "Il y a deux longueurs et deux largeurs.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre vaut 2 × (6 + 2) = 16 cm. 8 cm correspond seulement à 6 + 2.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "rectangle", "erreur", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_rectangle_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. Quel est le périmètre du rectangle ABCD ?",
    format: "short",
    expected: ["18", "18 cm", "18cm"],
    comparator: "number_equal",
    hint: "Il y a 2 côtés de 6 cm et 2 côtés de 3 cm.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le rectangle a deux côtés de 6 cm et deux côtés de 3 cm. Son périmètre vaut 6 + 6 + 3 + 3 = 18 cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "rectangle", "canvas"],
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
  // PERIM_FIGURE
  // =========================
  {
    kind: "fixed",
    id: "perim_figure_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_figure",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure a pour côtés 3 cm, 4 cm, 5 cm et 6 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["18", "18 cm", "18cm"],
    comparator: "number_equal",
    hint: "Additionne toutes les longueurs du contour.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre d’une figure se calcule en additionnant toutes les longueurs de son contour : 3 + 4 + 5 + 6 = 18 cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "figure"],
  },
  {
    kind: "fixed",
    id: "perim_figure_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_figure",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure a des côtés de 2 cm, 2 cm, 3 cm, 3 cm et 4 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["10 cm", "12 cm", "14 cm", "16 cm"],
    expected: ["14 cm"],
    comparator: "mcq_exact",
    hint: "Additionne tous les côtés.",
    explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre vaut 2 + 2 + 3 + 3 + 4 = 14 cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "figure", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_figure_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_figure",
    difficulty: 4,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Quel est son périmètre en unités ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Compte seulement le contour extérieur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("La figure est un carré de 2 cases sur 2. Son contour extérieur compte 8 unités.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "figure", "canvas"],
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
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
        showPerimeter: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "perim_figure_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_figure",
    difficulty: 5,
    theme: "neutral",
    text: "Observe la figure en L sur quadrillage. Quel est son périmètre en unités ?",
    format: "qcm",
    choices: ["8", "10", "12", "14"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Compte le contour extérieur sans compter l’intérieur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("On suit tout le contour extérieur de la figure en L. On obtient un périmètre total de 10 unités.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "figure", "canvas", "qcm"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 6,
        cols: 6,
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
        showPerimeter: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "perim_figure_canvas_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_figure",
    difficulty: 5,
    theme: "neutral",
    text: "Quel est le périmètre de cette figure ?",
    format: "qcm",
    choices: ["8", "10", "12", "16"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "Ne compte pas les côtés à l’intérieur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Seul le contour extérieur compte. Les segments internes ne font pas partie du périmètre. Le périmètre de cette figure est 12 unités.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "figure", "canvas", "erreur", "qcm"],
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
          [2, 3],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
        showPerimeter: true,
      },
    },
  },

  // =========================
  // PERIM_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "perim_probleme_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un jardin rectangulaire mesure 8 m de long et 3 m de large. Quelle longueur de grillage faut-il pour faire tout le tour ?",
    format: "short",
    expected: ["22", "22 m", "22m"],
    comparator: "number_equal",
    hint: "Il faut calculer le périmètre du rectangle.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le grillage doit faire tout le tour du jardin. On calcule donc le périmètre : 2 × (8 + 3) = 22 m.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "probleme"],
  },
  {
    kind: "fixed",
    id: "perim_probleme_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_probleme",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, un terrain rectangulaire mesure 10 m sur 4 m. Quel est son périmètre ?",
    format: "short",
    expected: ["28", "28 m", "28m"],
    comparator: "number_equal",
    hint: "Périmètre du rectangle = 2 × (L + l).",
    explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("On calcule le tour du terrain : 2 × (10 + 4) = 28 m.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "perim_probleme_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Une cour carrée a un côté de 12 m. Quelle longueur de clôture faut-il pour faire le tour ?",
    format: "qcm",
    choices: ["24 m", "36 m", "48 m", "144 m"],
    expected: ["48 m"],
    comparator: "mcq_exact",
    hint: "Le carré a 4 côtés égaux.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le tour de la cour correspond au périmètre du carré : 4 × 12 = 48 m.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "probleme", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_probleme_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Un rectangle a une longueur de 9 m et une largeur de 2,5 m. Quel est son périmètre ?",
    format: "qcm",
    choices: ["11,5 m", "18 m", "23 m", "22,5 m"],
    expected: ["23 m"],
    comparator: "mcq_exact",
    hint: "Calcule 2 × (9 + 2,5).",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre vaut 2 × (9 + 2,5) = 2 × 11,5 = 23 m.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "probleme", "qcm", "decimaux"],
  },

  // =========================
  // PERIM_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "perim_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi le périmètre d’une figure ne peut-il pas s’exprimer en cm² ?",
    format: "short",
    expected: ["longueur", "cm", "aire", "cm²"],
    comparator: "contains_keyword",
    hint: "Le périmètre mesure un contour, pas une surface.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre mesure une longueur, donc il s’exprime en cm, m, etc. Les cm² servent à mesurer une aire, c’est-à-dire une surface.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "perim_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi un carré de côté 6 cm a un périmètre plus grand qu’un carré de côté 4 cm.",
    format: "short",
    expected: ["6", "4", "24", "16"],
    comparator: "contains_keyword",
    hint: "Compare 4 × 6 et 4 × 4.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Un carré de côté 6 cm a pour périmètre 4 × 6 = 24 cm. Un carré de côté 4 cm a pour périmètre 4 × 4 = 16 cm. Comme 24 est plus grand que 16, son périmètre est plus grand.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "perim_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Un rectangle mesure 7 cm sur 3 cm. Si on augmente seulement la longueur de 1 cm, de combien augmente le périmètre ?",
    format: "short",
    expected: ["2", "2 cm", "2cm"],
    comparator: "number_equal",
    hint: "La longueur apparaît deux fois dans le périmètre.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre d’un rectangle vaut 2 × longueur + 2 × largeur. Si la longueur augmente de 1 cm, elle augmente en fait deux côtés. Le périmètre augmente donc de 2 cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "perim_defis_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Deux rectangles ont la même aire. Ont-ils forcément le même périmètre ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare par exemple 3 × 4 et 2 × 6.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Non. Deux rectangles peuvent avoir la même aire sans avoir le même périmètre. Par exemple, 3 × 4 et 2 × 6 ont tous deux une aire de 12, mais leurs périmètres sont différents.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "defi", "qcm", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "perim_defis_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Un carré a un périmètre de 28 cm. Combien mesure un côté ?",
    format: "short",
    expected: ["7", "7 cm", "7cm"],
    comparator: "number_equal",
    hint: "Dans un carré, les 4 côtés sont égaux.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre d’un carré vaut 4 × côté. Donc le côté vaut 28 ÷ 4 = 7 cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "defi", "inverse"],
  },
  {
    kind: "fixed",
    id: "perim_defis_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Un rectangle a un périmètre de 18 cm. Sa longueur est 6 cm. Quelle est sa largeur ?",
    format: "short",
    expected: ["3", "3 cm", "3cm"],
    comparator: "number_equal",
    hint: "6 + 6 = 12 cm. Il reste 6 cm pour les deux largeurs.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre vaut 18 cm. Les deux longueurs valent déjà 6 + 6 = 12 cm. Il reste donc 6 cm pour les deux largeurs, soit 3 cm pour une largeur.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "defi", "inverse"],
  },
  {
    kind: "fixed",
    id: "perim_defis_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Quel rectangle a le plus grand périmètre ?",
    format: "qcm",
    choices: [
      "rectangle 6 cm sur 2 cm",
      "rectangle 5 cm sur 3 cm",
      "rectangle 4 cm sur 4 cm",
      "ils ont le même périmètre",
    ],
    expected: ["ils ont le même périmètre"],
    comparator: "mcq_exact",
    hint: "Calcule les trois périmètres.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("6 sur 2 donne 2 × (6 + 2) = 16 cm. 5 sur 3 donne 2 × (5 + 3) = 16 cm. 4 sur 4 donne 2 × (4 + 4) = 16 cm. Les trois rectangles ont donc le même périmètre.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "defi", "qcm", "comparaison"],
  },
  {
    kind: "fixed",
    id: "perim_defis_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Si on double le côté d’un carré, que devient son périmètre ?",
    format: "qcm",
    choices: ["il reste le même", "il double", "il triple", "il quadruple"],
    expected: ["il double"],
    comparator: "mcq_exact",
    hint: "Le périmètre du carré vaut 4 × côté.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Si le côté est multiplié par 2, alors le périmètre 4 × côté est lui aussi multiplié par 2. Le périmètre double.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "defi", "qcm", "proportionnalite"],
  },
  {
    kind: "fixed",
    id: "perim_defis_qcm_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Deux figures peuvent-elles avoir le même périmètre mais des formes différentes ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le même contour total ne force pas la même forme.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Oui. Deux figures différentes peuvent avoir le même périmètre. Le périmètre donne seulement la longueur totale du contour, pas la forme exacte.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "defi", "qcm", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "perim_defis_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Quel est son périmètre en unités ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Compte uniquement le contour extérieur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("La figure recouvre 5 cases en forme de L. En suivant uniquement le contour extérieur, on obtient un périmètre de 10 unités.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "defi", "canvas"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 6,
        cols: 6,
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
        showPerimeter: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "perim_defis_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Cette figure a-t-elle le même périmètre qu’un carré de côté 3 unités ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le carré de côté 3 a pour périmètre 12 unités.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Un carré de côté 3 a pour périmètre 4 × 3 = 12 unités. En comptant le contour de la figure, on trouve aussi 12 unités. Les deux périmètres sont donc égaux.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "defi", "canvas", "qcm", "comparaison"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 6,
        cols: 6,
        filledCells: [
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 1],
          [2, 3],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
        showPerimeter: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "perim_defis_intervalle_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Donne un exemple de périmètre compris entre 20 cm et 25 cm.",
    format: "short",
    expected: ["21", "22", "23", "24"],
    comparator: "exact_text",
    hint: "Choisis un nombre strictement entre 20 et 25.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Un périmètre strictement compris entre 20 cm et 25 cm peut être 21 cm, 22 cm, 23 cm ou 24 cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "perim_defis_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 5,
    theme: "reunion",
    text: "À La Réunion, deux côtés d’un terrain rectangulaire mesurent 7 m et 5 m. Quel est son périmètre ?",
    format: "short",
    expected: ["24", "24 m", "24m"],
    comparator: "number_equal",
    hint: "Le rectangle a deux longueurs et deux largeurs.",
    explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre du terrain vaut 2 × (7 + 5) = 24 m.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
    tags: ["perimetres", "defi", "reunion"],
  },

  // =========================
  // TEMPLATES - PERIM_COMPRENDRE
  // =========================
  {
    kind: "template",
    id: "perim_comprendre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Le périmètre est une longueur.",
    tags: ["perimetres", "comprendre", "template"],
    generate: () => {
      return {
        text: "Quelle unité est adaptée pour mesurer un périmètre ?",
        format: "qcm",
        choices: shuffle(["cm", "cm²", "cm³", "L"]),
        expected: ["cm"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Le périmètre mesure une longueur. Il s’exprime donc avec une unité de longueur, par exemple en cm.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
  },

  // =========================
  // TEMPLATES - PERIM_SQUARE
  // =========================
  {
    kind: "template",
    id: "perim_square_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_square",
    difficulty: 1,
    theme: "neutral",
    hint: "Le carré a 4 côtés égaux.",
    tags: ["perimetres", "carre", "template"],
    generate: () => {
      const c = [2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 8)];
      const p = c * 4;

      return {
        text: `Quel est le périmètre d’un carré de côté ${c} cm ?`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      (`Le périmètre du carré vaut 4 × ${c} = ${p} cm.`) +
      "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
  },
  {
    kind: "template",
    id: "perim_square_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_square",
    difficulty: 1,
    theme: "neutral",
    hint: "On additionne les 4 côtés.",
    tags: ["perimetres", "carre", "template"],
    generate: () => {
      const c = [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)];
      const p = c * 4;

      return {
        text: `Un carré a un côté de ${c} cm. Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      (`Comme le carré a 4 côtés égaux, son périmètre vaut 4 × ${c} = ${p} cm.`) +
      "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
  },
  {
    kind: "template",
    id: "perim_square_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_square",
    difficulty: 2,
    theme: "neutral",
    hint: "Le périmètre n’est pas l’aire.",
    tags: ["perimetres", "carre", "qcm", "template"],
    generate: () => {
      const c = [4, 5, 6, 7, 8][Math.floor(Math.random() * 5)];
      const good = c * 4;

      const distractors = Array.from(
        new Set([c * 2, c * 3, c * c, good + c])
      )
        .filter((n) => n !== good)
        .slice(0, 3);

      const choices = shuffle([
        `${good} cm`,
        ...distractors.map((n) => `${n} cm`),
      ]);

      return {
        text: `Quel est le périmètre d’un carré de côté ${c} cm ?`,
        format: "qcm",
        choices,
        expected: [`${good} cm`],
        comparator: "mcq_exact",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      (`Le périmètre du carré vaut 4 × ${c} = ${good} cm.`) +
      "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
  },

  // =========================
  // TEMPLATES - PERIM_RECTANGLE
  // =========================
  {
    kind: "template",
    id: "perim_rectangle_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_rectangle",
    difficulty: 1,
    theme: "neutral",
    hint: "Il y a 2 longueurs et 2 largeurs.",
    tags: ["perimetres", "rectangle", "template"],
    generate: () => {
      const l = [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)];
      const w = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const p = 2 * (l + w);

      return {
        text: `Un rectangle mesure ${l} cm sur ${w} cm. Quel est son périmètre ?`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      (`Le périmètre du rectangle vaut 2 × (${l} + ${w}) = ${p} cm.`) +
      "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
  },
  {
    kind: "template",
    id: "perim_rectangle_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_rectangle",
    difficulty: 1,
    theme: "neutral",
    hint: "Périmètre = 2 × (longueur + largeur).",
    tags: ["perimetres", "rectangle", "template"],
    generate: () => {
      const l = [4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 6)];
      const w = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const p = 2 * (l + w);

      return {
        text: `Calcule le périmètre d’un rectangle de longueur ${l} cm et de largeur ${w} cm.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      (`Le périmètre vaut 2 × (${l} + ${w}) = ${p} cm.`) +
      "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
  },
  {
    kind: "template",
    id: "perim_rectangle_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention : longueur × largeur donne l’aire.",
    tags: ["perimetres", "rectangle", "qcm", "template"],
    generate: () => {
      const l = [4, 5, 6, 7, 8][Math.floor(Math.random() * 5)];
      const w = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const good = 2 * (l + w);

      const distractors = Array.from(
        new Set([l + w, l * w, 2 * l + w, good + 2])
      )
        .filter((n) => n !== good)
        .slice(0, 3);

      const choices = shuffle([
        `${good} cm`,
        ...distractors.map((n) => `${n} cm`),
      ]);

      return {
        text: `Un rectangle mesure ${l} cm sur ${w} cm. Quel est son périmètre ?`,
        format: "qcm",
        choices,
        expected: [`${good} cm`],
        comparator: "mcq_exact",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      (`Le périmètre vaut 2 × (${l} + ${w}) = ${good} cm.`) +
      "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
  },

  // =========================
  // TEMPLATES - PERIM_FIGURE
  // =========================
  {
    kind: "template",
    id: "perim_figure_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les longueurs du contour.",
    tags: ["perimetres", "figure", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(2, 6);
      const c = randomInt(2, 6);
      const d = randomInt(2, 6);
      const total = a + b + c + d;

      return {
        text: `Une figure a pour côtés ${a} cm, ${b} cm, ${c} cm et ${d} cm. Quel est son périmètre ?`,
        format: "short",
        expected: [String(total), `${total} cm`, `${total}cm`],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      (`Le périmètre se calcule en additionnant tous les côtés : ${a} + ${b} + ${c} + ${d} = ${total} cm.`) +
      "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
  },
  {
    kind: "template",
    id: "perim_figure_canvas_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_figure",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les unités sur le contour extérieur.",
    tags: ["perimetres", "figure", "canvas", "template"],
    generate: () => {
      const shapes = [
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
          ] as Array<[number, number]>,
          perimeter: 8,
        },
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [2, 1],
          ] as Array<[number, number]>,
          perimeter: 8,
        },
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
            [3, 1],
          ] as Array<[number, number]>,
          perimeter: 10,
        },
      ];

      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      return {
        text: "Observe la figure sur quadrillage. Quel est son périmètre en unités ?",
        format: "short",
        expected: [String(shape.perimeter)],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      (`En suivant le contour extérieur de la figure, on obtient un périmètre de ${shape.perimeter} unités.`) +
      "\n\nConclusion : on obtient la longueur totale du contour.",
        canvas: {
          kind: "figure_libre",
          grid: {
            rows: 6,
            cols: 6,
            filledCells: shape.filledCells,
          },
          display: {
            showGrid: true,
            showFilled: true,
            showPerimeter: true,
          },
        },
      };
    },
  },

  // =========================
  // TEMPLATES - PERIM_PROBLEME
  // =========================
  {
    kind: "template",
    id: "perim_probleme_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour faire le tour, on calcule le périmètre.",
    tags: ["perimetres", "probleme", "template"],
    generate: () => {
      const l = randomInt(5, 12);
      const w = randomInt(2, 6);
      const p = 2 * (l + w);

      return {
        text: `Un jardin rectangulaire mesure ${l} m de long et ${w} m de large. Quelle longueur de clôture faut-il pour faire tout le tour ?`,
        format: "short",
        expected: [String(p), `${p} m`, `${p}m`],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      (`La clôture doit faire tout le tour du jardin. On calcule donc le périmètre : 2 × (${l} + ${w}) = ${p} m.`) +
      "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
  },
  {
    kind: "template",
    id: "perim_probleme_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Le périmètre d’un rectangle vaut 2 × (L + l).",
    tags: ["perimetres", "probleme", "qcm", "template"],
    generate: () => {
      const lengths = [6, 7, 8, 9];
      const widths = [2.5, 3.5, 4.5];
      const l = lengths[Math.floor(Math.random() * lengths.length)];
      const w = widths[Math.floor(Math.random() * widths.length)];
      const good = Number((2 * (l + w)).toFixed(1));

      const distractors = Array.from(
        new Set([
          Number((l + w).toFixed(1)),
          Number((l * w).toFixed(1)),
          Number((good + 2).toFixed(1)),
        ])
      ).filter((n) => n !== good);

      const format = (n: number) => `${String(n).replace(".", ",")} m`;

      return {
        text: `Un rectangle a une longueur de ${l} m et une largeur de ${String(
          w
        ).replace(".", ",")} m. Quel est son périmètre ?`,
        format: "qcm",
        choices: shuffle([
          format(good),
          ...distractors.slice(0, 3).map(format),
        ]),
        expected: [format(good)],
        comparator: "mcq_exact",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      (`Le périmètre vaut 2 × (${l} + ${String(w).replace(
          ".",
          ","
        )}) = ${String(good).replace(".", ",")} m.`) +
      "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
  },

  // =========================
  // TEMPLATES - PERIM_DEFIS
  // =========================
  {
    kind: "template",
    id: "perim_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Dans un carré, le périmètre vaut 4 × côté.",
    tags: ["perimetres", "defi", "template", "inverse"],
    generate: () => {
      const side = randomInt(3, 9);
      const perim = side * 4;

      return {
        text: `Un carré a un périmètre de ${perim} cm. Combien mesure un côté ?`,
        format: "short",
        expected: [String(side), `${side} cm`, `${side}cm`],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      (`Le côté vaut ${perim} ÷ 4 = ${side} cm.`) +
      "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
  },
  {
    kind: "template",
    id: "perim_defis_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "La longueur compte deux fois dans le périmètre du rectangle.",
    tags: ["perimetres", "defi", "template", "raisonnement"],
    generate: () => {
      const l = randomInt(4, 9);
      const w = randomInt(2, 6);
      const increase = randomInt(1, 3);
      const delta = increase * 2;

      return {
        text: `Un rectangle mesure ${l} cm sur ${w} cm. Si on augmente seulement la longueur de ${increase} cm, de combien augmente le périmètre ?`,
        format: "short",
        expected: [String(delta), `${delta} cm`, `${delta}cm`],
        comparator: "number_equal",
        explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      (`La longueur apparaît deux fois dans le périmètre. Si elle augmente de ${increase} cm, le périmètre augmente de ${increase} + ${increase} = ${delta} cm.`) +
      "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
  },
  {
    kind: "template",
    id: "perim_defis_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetres",
    microId: "perim_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Même périmètre ne veut pas dire même forme.",
    tags: ["perimetres", "defi", "qcm", "template", "raisonnement"],
    generate: () => {
      return {
        text: "Deux figures peuvent-elles avoir le même périmètre mais des formes différentes ?",
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un périmètre mesure la longueur du contour d’une figure.\n\nMéthode : on repère tous les côtés du contour et on les exprime dans la même unité.\n\nCalcul : " +
      ("Oui. Deux figures différentes peuvent avoir le même périmètre car le périmètre donne seulement la longueur totale du contour.") +
      "\n\nConclusion : on obtient la longueur totale du contour.",
      };
    },
  },
];