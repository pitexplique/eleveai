// lib/tutor-v4/question-banks/maths/cm2/figures-planes.bank.ts

import type {
  TutorBankItemV4,
  TriangleCanvasData,
  QuadrilatereCanvasData,
  FigureLibreCanvasData,
  CercleCanvasData,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
}

// ============================================================
// HELPERS CANVAS
// ============================================================

function triangleCanvas(data?: {
  rightAngleAt?: "A" | "B" | "C";
  equalSides?: NonNullable<TriangleCanvasData["marks"]>["equalSides"];
  sideLabels?: TriangleCanvasData["sideLabels"];
}): TriangleCanvasData {
  return {
    kind: "triangle",
    points: {
      A: { x: 55, y: 185 },
      B: { x: 225, y: 185 },
      C: { x: 135, y: 55 },
    },
    sideLabels: data?.sideLabels,
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
    },
    marks: {
      ...(data?.rightAngleAt ? { rightAngleAt: data.rightAngleAt } : {}),
      ...(data?.equalSides ? { equalSides: data.equalSides } : {}),
    },
  };
}
function triangleRectangleCanvas(): TriangleCanvasData {
  return {
    kind: "triangle",
    points: {
      A: { x: 60, y: 185 },
      B: { x: 230, y: 185 },
      C: { x: 60, y: 70 },
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

function rectangleCanvas(): QuadrilatereCanvasData {
  return {
    kind: "quadrilatere",
    points: {
      A: { x: 60, y: 75 },
      B: { x: 240, y: 75 },
      C: { x: 240, y: 170 },
      D: { x: 60, y: 170 },
    },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
    },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      equalSides: [
        ["AB", "CD"],
        ["BC", "DA"],
      ],
      parallelSides: [
        ["AB", "CD"],
        ["BC", "DA"],
      ],
    },
  };
}

function carreCanvas(): QuadrilatereCanvasData {
  return {
    kind: "quadrilatere",
    points: {
      A: { x: 80, y: 60 },
      B: { x: 200, y: 60 },
      C: { x: 200, y: 180 },
      D: { x: 80, y: 180 },
    },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
    },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      equalSides: [
        ["AB", "BC"],
        ["BC", "CD"],
        ["CD", "DA"],
      ],
      parallelSides: [
        ["AB", "CD"],
        ["BC", "DA"],
      ],
    },
  };
}

function losangeCanvas(): QuadrilatereCanvasData {
  return {
    kind: "quadrilatere",
    points: {
      A: { x: 150, y: 45 },
      B: { x: 240, y: 120 },
      C: { x: 150, y: 195 },
      D: { x: 60, y: 120 },
    },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
    },
    marks: {
      equalSides: [
        ["AB", "BC"],
        ["BC", "CD"],
        ["CD", "DA"],
      ],
      parallelSides: [
        ["AB", "CD"],
        ["BC", "DA"],
      ],
    },
  };
}

function parallelogrammeCanvas(): QuadrilatereCanvasData {
  return {
    kind: "quadrilatere",
    points: {
      A: { x: 70, y: 75 },
      B: { x: 235, y: 75 },
      C: { x: 200, y: 170 },
      D: { x: 35, y: 170 },
    },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
    },
    marks: {
      equalSides: [
        ["AB", "CD"],
        ["BC", "DA"],
      ],
      parallelSides: [
        ["AB", "CD"],
        ["BC", "DA"],
      ],
    },
  };
}

function cercleCanvas(data?: {
  showDisk?: boolean;
  radius?: boolean;
  diameter?: boolean;
  chord?: boolean;
}): CercleCanvasData {
  const points: CercleCanvasData["points"] = [
    {
      id: "O",
      x: 170,
      y: 130,
      label: "O",
      color: "#ef4444",
      highlight: true,
    },
    {
      id: "A",
      x: 255,
      y: 130,
      label: "A",
      color: "#0f172a",
    },
    {
      id: "B",
      x: 85,
      y: 130,
      label: "B",
      color: "#0f172a",
    },
    {
      id: "C",
      x: 115,
      y: 72,
      label: "C",
      color: "#0f172a",
    },
    {
      id: "D",
      x: 225,
      y: 72,
      label: "D",
      color: "#0f172a",
    },
  ];

  const segments: CercleCanvasData["segments"] = [];

  if (data?.radius) {
    segments.push({
      id: "OA",
      kind: "rayon",
      from: "O",
      to: "A",
      label: "rayon",
      highlight: true,
    });
  }

  if (data?.diameter) {
    segments.push({
      id: "BA",
      kind: "diametre",
      from: "B",
      to: "A",
      label: "diamètre",
      highlight: true,
    });
  }

  if (data?.chord) {
    segments.push({
      id: "CD",
      kind: "corde",
      from: "C",
      to: "D",
      label: "corde",
      highlight: true,
    });
  }

  return {
    kind: "cercle",
    circle: {
      cx: 170,
      cy: 130,
      r: 85,
      label: data?.showDisk ? "Disque de centre O" : "Cercle de centre O",
      showDisk: data?.showDisk ?? false,
      showCircle: true,
    },
    points,
    segments,
    display: {
      showLabels: true,
      showPoints: true,
      showDisk: data?.showDisk ?? false,
    },
  };
}

function figureLibreRectangle(): FigureLibreCanvasData {
  return {
    kind: "figure_libre",
    grid: {
      rows: 5,
      cols: 6,
      filledCells: [],
    },
    vertices: {
      A: [1, 1],
      B: [1, 5],
      C: [3, 5],
      D: [3, 1],
    },
    perimeterPath: [
      [1, 1],
      [1, 5],
      [3, 5],
      [3, 1],
      [1, 1],
    ],
    display: {
      showGrid: true,
      showFilled: false,
      showPerimeter: true,
      showVertices: true,
      showVertexLabels: true,
    },
  };
}

// ============================================================
// BANK
// ============================================================

export const figuresPlanesBank: TutorBankItemV4[] = [
  // ============================================================
  // FIGURE_RECONNAITRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_figure_reconnaitre_fixed_1_triangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle figure est représentée ?",
    format: "qcm",
    choices: ["un triangle", "un carré", "un cercle", "un rectangle"],
    expected: ["un triangle"],
    comparator: "mcq_exact",
    hint: "Compte le nombre de côtés.",
    explanation:
      "La figure a 3 côtés et 3 sommets. C’est donc un triangle.",
    tags: ["cm2", "figure_plane", "reconnaitre", "triangle", "qcm", "canvas"],
    canvas: triangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_reconnaitre_fixed_2_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle figure est représentée ?",
    format: "qcm",
    choices: ["un rectangle", "un triangle", "un cercle", "un pentagone"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "Il a 4 angles droits.",
    explanation:
      "Cette figure a 4 côtés et 4 angles droits. Ses côtés opposés sont de même longueur : c’est un rectangle.",
    tags: ["cm2", "figure_plane", "reconnaitre", "rectangle", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_reconnaitre_fixed_3_carre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle figure est représentée ?",
    format: "qcm",
    choices: ["un carré", "un rectangle quelconque", "un triangle", "un cercle"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "Il a 4 côtés égaux et 4 angles droits.",
    explanation:
      "Cette figure a 4 côtés égaux et 4 angles droits. C’est un carré.",
    tags: ["cm2", "figure_plane", "reconnaitre", "carre", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_reconnaitre_fixed_4_losange",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle figure est représentée ?",
    format: "qcm",
    choices: ["un losange", "un rectangle", "un cercle", "un triangle"],
    expected: ["un losange"],
    comparator: "mcq_exact",
    hint: "Cherche les 4 côtés égaux.",
    explanation:
      "Cette figure a 4 côtés égaux. Elle n’a pas forcément 4 angles droits : c’est un losange.",
    tags: ["cm2", "figure_plane", "reconnaitre", "losange", "qcm", "canvas"],
    canvas: losangeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_reconnaitre_fixed_5_cercle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle figure est représentée ?",
    format: "qcm",
    choices: ["un cercle", "un carré", "un triangle", "un rectangle"],
    expected: ["un cercle"],
    comparator: "mcq_exact",
    hint: "Tous les points du contour sont à la même distance du centre.",
    explanation:
      "Le contour bleu est formé de points situés à la même distance du centre O. C’est un cercle.",
    tags: ["cm2", "figure_plane", "reconnaitre", "cercle", "qcm", "canvas"],
    canvas: cercleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_reconnaitre_fixed_6_parallelogramme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle figure est représentée ?",
    format: "qcm",
    choices: ["un parallélogramme", "un cercle", "un triangle", "un carré"],
    expected: ["un parallélogramme"],
    comparator: "mcq_exact",
    hint: "Les côtés opposés sont parallèles.",
    explanation:
      "Les côtés opposés sont parallèles deux à deux. Cette figure est un parallélogramme.",
    tags: ["cm2", "figure_plane", "reconnaitre", "parallelogramme", "qcm", "canvas"],
    canvas: parallelogrammeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_reconnaitre_fixed_7_nombre_cotes_triangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de côtés possède un triangle ?",
    format: "short",
    expected: ["3", "trois"],
    comparator: "contains_keyword",
    hint: "Tri- fait penser à trois.",
    explanation: "Un triangle possède 3 côtés et 3 sommets.",
    tags: ["cm2", "figure_plane", "reconnaitre", "triangle", "vocabulaire"],
  },

  {
    kind: "fixed",
    id: "cm2_figure_reconnaitre_fixed_8_nombre_cotes_quadrilatere",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de côtés possède un quadrilatère ?",
    format: "short",
    expected: ["4", "quatre"],
    comparator: "contains_keyword",
    hint: "Quadri- fait penser à quatre.",
    explanation: "Un quadrilatère possède 4 côtés et 4 sommets.",
    tags: ["cm2", "figure_plane", "reconnaitre", "quadrilatere", "vocabulaire"],
  },

  {
    kind: "fixed",
    id: "cm2_figure_reconnaitre_fixed_9_carre_rectangle_piege",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Un carré est-il aussi un rectangle particulier ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un rectangle a 4 angles droits.",
    explanation:
      "Oui. Un rectangle est un quadrilatère avec 4 angles droits. Un carré a aussi 4 angles droits : c’est donc un rectangle particulier, avec en plus 4 côtés égaux.",
    tags: ["cm2", "figure_plane", "reconnaitre", "carre", "rectangle", "piege", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_reconnaitre_fixed_10_losange_carre_piege",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Un carré est-il aussi un losange particulier ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un losange a 4 côtés égaux.",
    explanation:
      "Oui. Un losange est un quadrilatère qui a 4 côtés égaux. Un carré a aussi 4 côtés égaux : c’est donc un losange particulier, avec en plus 4 angles droits.",
    tags: ["cm2", "figure_plane", "reconnaitre", "carre", "losange", "piege", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_reconnaitre_fixed_11_erreur_cercle_disque",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Le cercle désigne plutôt...",
    format: "qcm",
    choices: [
      "le contour",
      "toute la surface intérieure",
      "un angle droit",
      "un segment",
    ],
    expected: ["le contour"],
    comparator: "mcq_exact",
    hint: "Le disque, lui, contient l’intérieur.",
    explanation:
      "Le cercle désigne le contour. Le disque désigne la surface intérieure avec le contour.",
    tags: ["cm2", "figure_plane", "reconnaitre", "cercle", "disque", "qcm", "canvas"],
    canvas: cercleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_reconnaitre_fixed_12_figure_quadrillage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "La figure tracée sur le quadrillage est plutôt...",
    format: "qcm",
    choices: ["un rectangle", "un triangle", "un cercle", "une demi-droite"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "Observe les 4 sommets et les angles droits.",
    explanation:
      "La figure a 4 côtés et forme un rectangle sur le quadrillage.",
    tags: ["cm2", "figure_plane", "reconnaitre", "quadrillage", "rectangle", "qcm", "canvas"],
    canvas: figureLibreRectangle(),
  },

  {
    kind: "template",
    id: "cm2_figure_reconnaitre_tpl_1_nom_figure",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe le nombre de côtés, les angles droits ou le contour.",
    tags: ["cm2", "figure_plane", "reconnaitre", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          name: "un triangle",
          canvas: triangleCanvas(),
          explanation: "La figure a 3 côtés et 3 sommets : c’est un triangle.",
          wrongs: ["un carré", "un rectangle", "un cercle"],
        },
        {
          name: "un rectangle",
          canvas: rectangleCanvas(),
          explanation:
            "La figure a 4 angles droits et ses côtés opposés sont égaux : c’est un rectangle.",
          wrongs: ["un triangle", "un cercle", "un losange"],
        },
        {
          name: "un carré",
          canvas: carreCanvas(),
          explanation:
            "La figure a 4 côtés égaux et 4 angles droits : c’est un carré.",
          wrongs: ["un triangle", "un cercle", "un rectangle quelconque"],
        },
        {
          name: "un cercle",
          canvas: cercleCanvas(),
          explanation:
            "Le contour est à la même distance du centre O : c’est un cercle.",
          wrongs: ["un triangle", "un carré", "un rectangle"],
        },
      ]);

      return {
        text: "Quelle figure est représentée ?",
        format: "qcm",
        choices: makeChoices(item.name, item.wrongs),
        expected: [item.name],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_figure_reconnaitre_tpl_2_nombre_cotes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte les côtés de la figure.",
    tags: ["cm2", "figure_plane", "reconnaitre", "cotes", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          figure: "triangle",
          sides: "3",
          explanation: "Un triangle possède 3 côtés.",
        },
        {
          figure: "quadrilatère",
          sides: "4",
          explanation: "Un quadrilatère possède 4 côtés.",
        },
        {
          figure: "rectangle",
          sides: "4",
          explanation: "Un rectangle est un quadrilatère : il possède donc 4 côtés.",
        },
        {
          figure: "carré",
          sides: "4",
          explanation: "Un carré est un quadrilatère : il possède donc 4 côtés.",
        },
      ]);

      return {
        text: `Combien de côtés possède un ${item.figure} ?`,
        format: "qcm",
        choices: shuffle(["3", "4", "5", "6"]),
        expected: [item.sides],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_figure_reconnaitre_tpl_3_propriete",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Associe la propriété à la bonne figure.",
    tags: ["cm2", "figure_plane", "reconnaitre", "propriete", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          property: "4 côtés égaux et 4 angles droits",
          correct: "un carré",
          explanation:
            "Une figure qui a 4 côtés égaux et 4 angles droits est un carré.",
        },
        {
          property: "4 angles droits, mais pas forcément 4 côtés égaux",
          correct: "un rectangle",
          explanation:
            "Une figure qui a 4 angles droits est un rectangle. Elle n’a pas forcément 4 côtés égaux.",
        },
        {
          property: "4 côtés égaux, mais pas forcément 4 angles droits",
          correct: "un losange",
          explanation:
            "Une figure qui a 4 côtés égaux est un losange. Elle n’a pas forcément 4 angles droits.",
        },
        {
          property: "3 côtés et 3 sommets",
          correct: "un triangle",
          explanation:
            "Une figure qui a 3 côtés et 3 sommets est un triangle.",
        },
      ]);

      return {
        text: `Quelle figure possède cette propriété : ${item.property} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, [
          "un carré",
          "un rectangle",
          "un losange",
          "un triangle",
          "un cercle",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },
  // ============================================================
  // FIGURE_TRIANGLE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_figure_triangle_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle est une figure qui possède...",
    format: "qcm",
    choices: ["3 côtés", "4 côtés", "0 côté", "6 côtés"],
    expected: ["3 côtés"],
    comparator: "mcq_exact",
    hint: "Tri- fait penser à trois.",
    explanation:
      "Un triangle possède 3 côtés et 3 sommets.",
    tags: ["cm2", "figure_plane", "triangle", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_figure_triangle_fixed_2_sommets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Sur la figure, quels sont les sommets du triangle ?",
    format: "qcm",
    choices: ["A, B et C", "A et B seulement", "AB, BC et CA", "O, A et B"],
    expected: ["A, B et C"],
    comparator: "mcq_exact",
    hint: "Les sommets sont les points nommés.",
    explanation:
      "Les sommets du triangle sont les points A, B et C.",
    tags: ["cm2", "figure_plane", "triangle", "sommets", "qcm", "canvas"],
    canvas: triangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_triangle_fixed_3_cotes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Quels sont les côtés du triangle ABC ?",
    format: "qcm",
    choices: ["[AB], [BC] et [CA]", "A, B et C", "(AB) seulement", "[AB] et [BC] seulement"],
    expected: ["[AB], [BC] et [CA]"],
    comparator: "mcq_exact",
    hint: "Les côtés sont les segments qui relient les sommets.",
    explanation:
      "Les côtés du triangle ABC sont les segments [AB], [BC] et [CA].",
    tags: ["cm2", "figure_plane", "triangle", "cotes", "qcm", "canvas"],
    canvas: triangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_triangle_fixed_4_triangle_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature du triangle représenté ?",
    format: "qcm",
    choices: ["triangle rectangle", "triangle équilatéral", "triangle quelconque", "cercle"],
    expected: ["triangle rectangle"],
    comparator: "mcq_exact",
    hint: "Cherche le petit carré rouge.",
    explanation:
      "Le triangle possède un angle droit en A. C’est donc un triangle rectangle.",
    tags: ["cm2", "figure_plane", "triangle", "rectangle", "qcm", "canvas"],
    canvas: triangleRectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_triangle_fixed_5_triangle_isocele",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature du triangle représenté ?",
    format: "qcm",
    choices: ["triangle isocèle", "triangle rectangle", "triangle équilatéral", "rectangle"],
    expected: ["triangle isocèle"],
    comparator: "mcq_exact",
    hint: "Cherche les deux côtés codés de la même façon.",
    explanation:
      "Deux côtés du triangle sont codés comme égaux. C’est donc un triangle isocèle.",
    tags: ["cm2", "figure_plane", "triangle", "isocele", "qcm", "canvas"],
    canvas: triangleCanvas({
      equalSides: [["AB", "CA"]],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_triangle_fixed_6_triangle_equilateral",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature du triangle représenté ?",
    format: "qcm",
    choices: ["triangle équilatéral", "triangle rectangle", "triangle quelconque", "losange"],
    expected: ["triangle équilatéral"],
    comparator: "mcq_exact",
    hint: "Les trois côtés sont égaux.",
    explanation:
      "Les trois côtés du triangle sont codés comme égaux. C’est un triangle équilatéral.",
    tags: ["cm2", "figure_plane", "triangle", "equilateral", "qcm", "canvas"],
    canvas: triangleCanvas({
      equalSides: [
        ["AB", "BC"],
        ["BC", "CA"],
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_triangle_fixed_7_triangle_quelconque",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle qui n’a pas de propriété particulière visible peut être appelé...",
    format: "qcm",
    choices: ["triangle quelconque", "triangle carré", "cercle", "quadrilatère"],
    expected: ["triangle quelconque"],
    comparator: "mcq_exact",
    hint: "Aucun angle droit, aucun codage d’égalité.",
    explanation:
      "Quand aucun angle droit ou côté égal n’est indiqué, on peut parler d’un triangle quelconque.",
    tags: ["cm2", "figure_plane", "triangle", "quelconque", "qcm", "canvas"],
    canvas: triangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_triangle_fixed_8_piege_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle rectangle est-il forcément un rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un rectangle a 4 côtés.",
    explanation:
      "Non. Un triangle rectangle reste un triangle : il a 3 côtés. On l’appelle rectangle parce qu’il possède un angle droit.",
    tags: ["cm2", "figure_plane", "triangle", "rectangle", "piege", "qcm", "canvas"],
    canvas: triangleRectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_triangle_fixed_9_piege_isocele_equilateral",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle équilatéral est-il aussi un triangle isocèle particulier ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un triangle isocèle a au moins deux côtés égaux.",
    explanation:
      "Oui. Un triangle équilatéral a 3 côtés égaux. Il a donc aussi au moins 2 côtés égaux : c’est un triangle isocèle particulier.",
    tags: ["cm2", "figure_plane", "triangle", "isocele", "equilateral", "piege", "qcm", "canvas"],
    canvas: triangleCanvas({
      equalSides: [
        ["AB", "BC"],
        ["BC", "CA"],
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_triangle_fixed_10_identifier_angle_droit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le triangle représenté, où se trouve l’angle droit ?",
    format: "qcm",
    choices: ["en A", "en B", "en C", "il n’y a pas d’angle droit"],
    expected: ["en A"],
    comparator: "mcq_exact",
    hint: "Cherche le petit carré rouge.",
    explanation:
      "Le petit carré rouge est placé au sommet A. L’angle droit est donc en A.",
    tags: ["cm2", "figure_plane", "triangle", "angle_droit", "qcm", "canvas"],
    canvas: triangleRectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_triangle_fixed_11_cote_oppose",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le triangle ABC, quel côté est opposé au sommet A ?",
    format: "qcm",
    choices: ["[BC]", "[AB]", "[CA]", "A"],
    expected: ["[BC]"],
    comparator: "mcq_exact",
    hint: "Le côté opposé à A ne touche pas le point A.",
    explanation:
      "Le côté opposé au sommet A est le côté qui ne contient pas A. Dans le triangle ABC, c’est [BC].",
    tags: ["cm2", "figure_plane", "triangle", "cote_oppose", "qcm", "canvas"],
    canvas: triangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_triangle_fixed_12_reunion_toit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 3,
    theme: "reunion",
    text: "Sur le dessin d’un toit de case créole, la forme du toit ressemble à une figure à 3 côtés. C’est...",
    format: "qcm",
    choices: ["un triangle", "un rectangle", "un cercle", "un losange"],
    expected: ["un triangle"],
    comparator: "mcq_exact",
    hint: "Une figure à 3 côtés est un triangle.",
    explanation:
      "Une figure à 3 côtés est un triangle. Le toit dessiné peut donc être modélisé par un triangle.",
    tags: ["cm2", "figure_plane", "triangle", "reunion", "qcm", "canvas"],
    canvas: triangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_triangle_fixed_13_open_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment reconnaître un triangle.",
    format: "open",
    expected: ["3", "côtés", "sommets"],
    comparator: "contains_keyword",
    hint: "Parle du nombre de côtés et de sommets.",
    explanation:
      "On reconnaît un triangle car il possède 3 côtés et 3 sommets.",
    tags: ["cm2", "figure_plane", "triangle", "open", "definition"],
  },

  {
    kind: "fixed",
    id: "cm2_figure_triangle_fixed_14_open_triangle_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi le triangle représenté est rectangle.",
    format: "open",
    expected: ["angle", "droit"],
    comparator: "contains_keyword",
    hint: "Cherche le codage de l’angle droit.",
    explanation:
      "Le triangle possède un angle droit. C’est pour cela qu’on l’appelle triangle rectangle.",
    tags: ["cm2", "figure_plane", "triangle", "rectangle", "open", "canvas"],
    canvas: triangleRectangleCanvas(),
  },

  {
    kind: "template",
    id: "cm2_figure_triangle_tpl_1_nature_triangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe les codages : angle droit ou côtés égaux.",
    tags: ["cm2", "figure_plane", "triangle", "nature", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          correct: "triangle rectangle",
          canvas: triangleRectangleCanvas(),
          explanation:
            "Le triangle possède un angle droit. C’est un triangle rectangle.",
          wrongs: ["triangle équilatéral", "triangle isocèle", "cercle"],
        },
        {
          correct: "triangle isocèle",
          canvas: triangleCanvas({
            equalSides: [["AB", "CA"]],
          }),
          explanation:
            "Deux côtés du triangle sont égaux. C’est un triangle isocèle.",
          wrongs: ["triangle rectangle", "triangle équilatéral", "rectangle"],
        },
        {
          correct: "triangle équilatéral",
          canvas: triangleCanvas({
            equalSides: [
              ["AB", "BC"],
              ["BC", "CA"],
            ],
          }),
          explanation:
            "Les trois côtés du triangle sont égaux. C’est un triangle équilatéral.",
          wrongs: ["triangle rectangle", "triangle quelconque", "carré"],
        },
      ]);

      return {
        text: "Quelle est la nature du triangle représenté ?",
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_figure_triangle_tpl_2_nombre_cotes_sommets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 1,
    theme: "neutral",
    hint: "Un triangle a toujours 3 côtés et 3 sommets.",
    tags: ["cm2", "figure_plane", "triangle", "vocabulaire", "template", "qcm"],
    generate: () => {
      const askSides = Math.random() < 0.5;

      return {
        text: askSides
          ? "Combien de côtés possède un triangle ?"
          : "Combien de sommets possède un triangle ?",
        format: "qcm",
        choices: shuffle(["2", "3", "4", "5"]),
        expected: ["3"],
        comparator: "mcq_exact",
        explanation: askSides
          ? "Un triangle possède 3 côtés."
          : "Un triangle possède 3 sommets.",
      };
    },
  },

  {
    kind: "template",
    id: "cm2_figure_triangle_tpl_3_cote_oppose",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Le côté opposé à un sommet ne touche pas ce sommet.",
    tags: ["cm2", "figure_plane", "triangle", "cote_oppose", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          sommet: "A",
          correct: "[BC]",
          explanation:
            "Le côté opposé au sommet A ne contient pas A. C’est donc [BC].",
        },
        {
          sommet: "B",
          correct: "[CA]",
          explanation:
            "Le côté opposé au sommet B ne contient pas B. C’est donc [CA].",
        },
        {
          sommet: "C",
          correct: "[AB]",
          explanation:
            "Le côté opposé au sommet C ne contient pas C. C’est donc [AB].",
        },
      ]);

      return {
        text: `Dans le triangle ABC, quel côté est opposé au sommet ${item.sommet} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, ["[AB]", "[BC]", "[CA]", item.sommet]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: triangleCanvas(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_figure_triangle_tpl_4_piege",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 4,
    theme: "neutral",
    hint: "Lis bien la propriété demandée.",
    tags: ["cm2", "figure_plane", "triangle", "piege", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un triangle rectangle est-il forcément un rectangle ?",
          expected: "non",
          explanation:
            "Non. Un triangle rectangle a 3 côtés et un angle droit. Un rectangle a 4 côtés.",
          canvas: triangleRectangleCanvas(),
        },
        {
          text: "Un triangle équilatéral est-il aussi un triangle isocèle particulier ?",
          expected: "oui",
          explanation:
            "Oui. Un triangle équilatéral a 3 côtés égaux. Il a donc au moins 2 côtés égaux, comme un triangle isocèle.",
          canvas: triangleCanvas({
            equalSides: [
              ["AB", "BC"],
              ["BC", "CA"],
            ],
          }),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },
    // ============================================================
  // FIGURE_QUADRILATERE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 1,
    theme: "neutral",
    text: "Un quadrilatère est une figure qui possède...",
    format: "qcm",
    choices: ["4 côtés", "3 côtés", "1 côté", "6 côtés"],
    expected: ["4 côtés"],
    comparator: "mcq_exact",
    hint: "Quadri- fait penser à quatre.",
    explanation: "Un quadrilatère possède 4 côtés et 4 sommets.",
    tags: ["cm2", "figure_plane", "quadrilatere", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_2_sommets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 1,
    theme: "neutral",
    text: "Sur la figure, quels sont les sommets du quadrilatère ?",
    format: "qcm",
    choices: ["A, B, C et D", "A, B et C", "AB, BC, CD et DA", "O, A et B"],
    expected: ["A, B, C et D"],
    comparator: "mcq_exact",
    hint: "Les sommets sont les points nommés.",
    explanation: "Les sommets du quadrilatère sont les points A, B, C et D.",
    tags: ["cm2", "figure_plane", "quadrilatere", "sommets", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_3_cotes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 1,
    theme: "neutral",
    text: "Quels sont les côtés du quadrilatère ABCD ?",
    format: "qcm",
    choices: [
      "[AB], [BC], [CD] et [DA]",
      "A, B, C et D",
      "[AC] et [BD]",
      "[AB], [BC] et [CA]",
    ],
    expected: ["[AB], [BC], [CD] et [DA]"],
    comparator: "mcq_exact",
    hint: "Les côtés relient deux sommets voisins.",
    explanation:
      "Les côtés du quadrilatère ABCD sont [AB], [BC], [CD] et [DA]. Les segments [AC] et [BD] sont les diagonales.",
    tags: ["cm2", "figure_plane", "quadrilatere", "cotes", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_4_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature du quadrilatère représenté ?",
    format: "qcm",
    choices: ["rectangle", "triangle", "cercle", "losange quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Cherche les 4 angles droits.",
    explanation:
      "La figure a 4 angles droits. Ses côtés opposés sont de même longueur : c’est un rectangle.",
    tags: ["cm2", "figure_plane", "quadrilatere", "rectangle", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_5_carre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature du quadrilatère représenté ?",
    format: "qcm",
    choices: ["carré", "rectangle quelconque", "triangle", "cercle"],
    expected: ["carré"],
    comparator: "mcq_exact",
    hint: "Il a 4 côtés égaux et 4 angles droits.",
    explanation:
      "La figure a 4 côtés égaux et 4 angles droits. C’est un carré.",
    tags: ["cm2", "figure_plane", "quadrilatere", "carre", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_6_losange",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature du quadrilatère représenté ?",
    format: "qcm",
    choices: ["losange", "rectangle", "triangle rectangle", "cercle"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "Les 4 côtés sont égaux.",
    explanation:
      "La figure a 4 côtés égaux. Elle n’a pas forcément 4 angles droits : c’est un losange.",
    tags: ["cm2", "figure_plane", "quadrilatere", "losange", "qcm", "canvas"],
    canvas: losangeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_7_parallelogramme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la nature du quadrilatère représenté ?",
    format: "qcm",
    choices: ["parallélogramme", "triangle", "cercle", "angle droit"],
    expected: ["parallélogramme"],
    comparator: "mcq_exact",
    hint: "Les côtés opposés sont parallèles.",
    explanation:
      "Un parallélogramme a ses côtés opposés parallèles deux à deux. C’est le cas ici.",
    tags: ["cm2", "figure_plane", "quadrilatere", "parallelogramme", "qcm", "canvas"],
    canvas: parallelogrammeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_8_diagonales",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le quadrilatère ABCD, quels segments sont les diagonales ?",
    format: "qcm",
    choices: ["[AC] et [BD]", "[AB] et [BC]", "[AB] et [CD]", "[AD] et [DC]"],
    expected: ["[AC] et [BD]"],
    comparator: "mcq_exact",
    hint: "Une diagonale relie deux sommets opposés.",
    explanation:
      "Les diagonales relient des sommets opposés. Dans ABCD, ce sont [AC] et [BD].",
    tags: ["cm2", "figure_plane", "quadrilatere", "diagonales", "qcm", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 60, y: 75 },
        B: { x: 240, y: 75 },
        C: { x: 240, y: 170 },
        D: { x: 60, y: 170 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
        showDiagonals: true,
      },
      sideLabels: {
        AC: "diagonale",
        BD: "diagonale",
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [
          ["AB", "CD"],
          ["BC", "DA"],
        ],
        parallelSides: [
          ["AB", "CD"],
          ["BC", "DA"],
        ],
      },
    },
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_9_rectangle_proprietes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle propriété est vraie pour un rectangle ?",
    format: "qcm",
    choices: [
      "il a 4 angles droits",
      "il a toujours 3 côtés",
      "il n’a jamais de côtés parallèles",
      "il est toujours un cercle",
    ],
    expected: ["il a 4 angles droits"],
    comparator: "mcq_exact",
    hint: "Regarde les codages rouges.",
    explanation:
      "Un rectangle est un quadrilatère qui possède 4 angles droits.",
    tags: ["cm2", "figure_plane", "quadrilatere", "rectangle", "propriete", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_10_carre_proprietes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle propriété est vraie pour un carré ?",
    format: "qcm",
    choices: [
      "il a 4 côtés égaux et 4 angles droits",
      "il a seulement 3 côtés",
      "il n’a aucun angle droit",
      "il n’a pas de sommets",
    ],
    expected: ["il a 4 côtés égaux et 4 angles droits"],
    comparator: "mcq_exact",
    hint: "Un carré est très régulier.",
    explanation:
      "Un carré possède 4 côtés égaux et 4 angles droits.",
    tags: ["cm2", "figure_plane", "quadrilatere", "carre", "propriete", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_11_losange_proprietes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle propriété est vraie pour un losange ?",
    format: "qcm",
    choices: [
      "il a 4 côtés égaux",
      "il a forcément 4 angles droits",
      "il a 3 côtés",
      "il est toujours un cercle",
    ],
    expected: ["il a 4 côtés égaux"],
    comparator: "mcq_exact",
    hint: "Observe les codages des côtés.",
    explanation:
      "Un losange est un quadrilatère qui possède 4 côtés égaux. Il n’a pas forcément 4 angles droits.",
    tags: ["cm2", "figure_plane", "quadrilatere", "losange", "propriete", "qcm", "canvas"],
    canvas: losangeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_12_piege_carre_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi un carré est-il un rectangle particulier ?",
    format: "qcm",
    choices: [
      "parce qu’il a 4 angles droits",
      "parce qu’il a 3 côtés",
      "parce qu’il est rond",
      "parce qu’il n’a pas de côtés",
    ],
    expected: ["parce qu’il a 4 angles droits"],
    comparator: "mcq_exact",
    hint: "La propriété principale du rectangle est d’avoir 4 angles droits.",
    explanation:
      "Un rectangle possède 4 angles droits. Un carré possède aussi 4 angles droits : c’est donc un rectangle particulier.",
    tags: ["cm2", "figure_plane", "quadrilatere", "carre", "rectangle", "piege", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_13_piege_carre_losange",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi un carré est-il un losange particulier ?",
    format: "qcm",
    choices: [
      "parce qu’il a 4 côtés égaux",
      "parce qu’il est rond",
      "parce qu’il a 3 sommets",
      "parce qu’il n’a pas d’angle droit",
    ],
    expected: ["parce qu’il a 4 côtés égaux"],
    comparator: "mcq_exact",
    hint: "La propriété principale du losange est d’avoir 4 côtés égaux.",
    explanation:
      "Un losange possède 4 côtés égaux. Un carré possède aussi 4 côtés égaux : c’est donc un losange particulier.",
    tags: ["cm2", "figure_plane", "quadrilatere", "carre", "losange", "piege", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_14_piege_rectangle_losange",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 4,
    theme: "neutral",
    text: "Un rectangle est-il toujours un losange ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un losange doit avoir 4 côtés égaux.",
    explanation:
      "Non. Un rectangle a 4 angles droits, mais ses 4 côtés ne sont pas forcément égaux.",
    tags: ["cm2", "figure_plane", "quadrilatere", "rectangle", "losange", "piege", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_15_open_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment reconnaître un rectangle.",
    format: "open",
    expected: ["4", "angles", "droits"],
    comparator: "contains_keyword",
    hint: "Parle des angles droits.",
    explanation:
      "On reconnaît un rectangle car il possède 4 angles droits. Ses côtés opposés sont parallèles et de même longueur.",
    tags: ["cm2", "figure_plane", "quadrilatere", "rectangle", "open", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_16_open_carre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment reconnaître un carré.",
    format: "open",
    expected: ["4", "côtés", "égaux", "angles", "droits"],
    comparator: "contains_keyword",
    hint: "Parle des côtés égaux et des angles droits.",
    explanation:
      "On reconnaît un carré car il possède 4 côtés égaux et 4 angles droits.",
    tags: ["cm2", "figure_plane", "quadrilatere", "carre", "open", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_17_open_losange",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment reconnaître un losange.",
    format: "open",
    expected: ["4", "côtés", "égaux"],
    comparator: "contains_keyword",
    hint: "Parle des 4 côtés égaux.",
    explanation:
      "On reconnaît un losange car il possède 4 côtés égaux. Il n’a pas forcément 4 angles droits.",
    tags: ["cm2", "figure_plane", "quadrilatere", "losange", "open", "canvas"],
    canvas: losangeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_quadrilatere_fixed_18_reunion_case",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 3,
    theme: "reunion",
    text: "Sur le plan simplifié d’une cour à La Réunion, la forme a 4 angles droits. On peut la modéliser par...",
    format: "qcm",
    choices: ["un rectangle", "un triangle", "un cercle", "une corde"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "4 angles droits : pense au rectangle.",
    explanation:
      "Une figure à 4 angles droits peut être un rectangle. Le plan de la cour peut donc être modélisé par un rectangle.",
    tags: ["cm2", "figure_plane", "quadrilatere", "rectangle", "reunion", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "template",
    id: "cm2_figure_quadrilatere_tpl_1_nature",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe les côtés égaux, les angles droits et les parallèles.",
    tags: ["cm2", "figure_plane", "quadrilatere", "nature", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          correct: "rectangle",
          canvas: rectangleCanvas(),
          explanation:
            "La figure a 4 angles droits. C’est un rectangle.",
          wrongs: ["triangle", "cercle", "losange quelconque"],
        },
        {
          correct: "carré",
          canvas: carreCanvas(),
          explanation:
            "La figure a 4 côtés égaux et 4 angles droits. C’est un carré.",
          wrongs: ["rectangle quelconque", "triangle", "cercle"],
        },
        {
          correct: "losange",
          canvas: losangeCanvas(),
          explanation:
            "La figure a 4 côtés égaux. C’est un losange.",
          wrongs: ["rectangle", "triangle", "cercle"],
        },
        {
          correct: "parallélogramme",
          canvas: parallelogrammeCanvas(),
          explanation:
            "Les côtés opposés sont parallèles deux à deux. C’est un parallélogramme.",
          wrongs: ["triangle", "cercle", "angle droit"],
        },
      ]);

      return {
        text: "Quelle est la nature du quadrilatère représenté ?",
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_figure_quadrilatere_tpl_2_propriete",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 3,
    theme: "neutral",
    hint: "Associe la propriété à la bonne figure.",
    tags: ["cm2", "figure_plane", "quadrilatere", "propriete", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          property: "4 angles droits",
          correct: "rectangle",
          explanation:
            "Un rectangle possède 4 angles droits.",
        },
        {
          property: "4 côtés égaux et 4 angles droits",
          correct: "carré",
          explanation:
            "Un carré possède 4 côtés égaux et 4 angles droits.",
        },
        {
          property: "4 côtés égaux",
          correct: "losange",
          explanation:
            "Un losange possède 4 côtés égaux.",
        },
        {
          property: "côtés opposés parallèles deux à deux",
          correct: "parallélogramme",
          explanation:
            "Un parallélogramme a ses côtés opposés parallèles deux à deux.",
        },
      ]);

      return {
        text: `Quelle figure correspond à cette propriété : ${item.property} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, [
          "rectangle",
          "carré",
          "losange",
          "parallélogramme",
          "triangle",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_figure_quadrilatere_tpl_3_piege",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention aux figures particulières.",
    tags: ["cm2", "figure_plane", "quadrilatere", "piege", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un carré est-il un rectangle particulier ?",
          expected: "oui",
          explanation:
            "Oui. Un carré a 4 angles droits, comme un rectangle. Il a en plus 4 côtés égaux.",
          canvas: carreCanvas(),
        },
        {
          text: "Un carré est-il un losange particulier ?",
          expected: "oui",
          explanation:
            "Oui. Un carré a 4 côtés égaux, comme un losange. Il a en plus 4 angles droits.",
          canvas: carreCanvas(),
        },
        {
          text: "Un rectangle est-il toujours un losange ?",
          expected: "non",
          explanation:
            "Non. Un rectangle n’a pas forcément 4 côtés égaux.",
          canvas: rectangleCanvas(),
        },
        {
          text: "Un losange est-il toujours un rectangle ?",
          expected: "non",
          explanation:
            "Non. Un losange n’a pas forcément 4 angles droits.",
          canvas: losangeCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },
    // ============================================================
  // FIGURE_CERCLE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_1_reconnaitre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle figure est représentée ?",
    format: "qcm",
    choices: ["un cercle", "un carré", "un triangle", "un rectangle"],
    expected: ["un cercle"],
    comparator: "mcq_exact",
    hint: "Le contour est rond.",
    explanation:
      "Le contour bleu est un cercle. Tous les points du contour sont à la même distance du centre O.",
    tags: ["cm2", "figure_plane", "cercle", "reconnaitre", "qcm", "canvas"],
    canvas: cercleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_2_centre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le centre du cercle ?",
    format: "qcm",
    choices: ["O", "A", "B", "C"],
    expected: ["O"],
    comparator: "mcq_exact",
    hint: "Le centre est le point rouge au milieu.",
    explanation:
      "Le point O est placé au milieu du cercle. C’est le centre du cercle.",
    tags: ["cm2", "figure_plane", "cercle", "centre", "qcm", "canvas"],
    canvas: cercleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_3_rayon",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "Sur la figure, le segment [OA] est...",
    format: "qcm",
    choices: ["un rayon", "un diamètre", "une corde", "un côté du carré"],
    expected: ["un rayon"],
    comparator: "mcq_exact",
    hint: "Un rayon relie le centre à un point du cercle.",
    explanation:
      "Le segment [OA] relie le centre O à un point A du cercle. C’est un rayon.",
    tags: ["cm2", "figure_plane", "cercle", "rayon", "qcm", "canvas"],
    canvas: cercleCanvas({ radius: true }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_4_diametre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "Sur la figure, le segment [BA] est...",
    format: "qcm",
    choices: ["un diamètre", "un rayon", "une corde quelconque", "un côté"],
    expected: ["un diamètre"],
    comparator: "mcq_exact",
    hint: "Un diamètre passe par le centre du cercle.",
    explanation:
      "Le segment [BA] relie deux points du cercle et passe par le centre O. C’est un diamètre.",
    tags: ["cm2", "figure_plane", "cercle", "diametre", "qcm", "canvas"],
    canvas: cercleCanvas({ diameter: true }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_5_corde",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Sur la figure, le segment [CD] est...",
    format: "qcm",
    choices: ["une corde", "un rayon", "un diamètre", "un angle droit"],
    expected: ["une corde"],
    comparator: "mcq_exact",
    hint: "Une corde relie deux points du cercle.",
    explanation:
      "Le segment [CD] relie deux points du cercle. Il ne passe pas par le centre : c’est une corde.",
    tags: ["cm2", "figure_plane", "cercle", "corde", "qcm", "canvas"],
    canvas: cercleCanvas({ chord: true }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_6_cercle_disque",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "Le disque correspond...",
    format: "qcm",
    choices: [
      "au cercle et à toute la surface intérieure",
      "seulement au contour",
      "à un segment",
      "à un angle droit",
    ],
    expected: ["au cercle et à toute la surface intérieure"],
    comparator: "mcq_exact",
    hint: "Le disque contient l’intérieur.",
    explanation:
      "Le cercle est le contour. Le disque contient le contour et toute la surface intérieure.",
    tags: ["cm2", "figure_plane", "cercle", "disque", "qcm", "canvas"],
    canvas: cercleCanvas({ showDisk: true }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_7_piege_cercle_disque",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Le cercle désigne-t-il toute la surface intérieure ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le cercle est seulement le contour.",
    explanation:
      "Non. Le cercle désigne seulement le contour. La surface intérieure appartient au disque.",
    tags: ["cm2", "figure_plane", "cercle", "disque", "piege", "qcm", "canvas"],
    canvas: cercleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_8_rayon_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "Un rayon d’un cercle est un segment qui relie...",
    format: "qcm",
    choices: [
      "le centre à un point du cercle",
      "deux points du cercle en passant toujours par le centre",
      "deux sommets d’un triangle",
      "deux côtés d’un rectangle",
    ],
    expected: ["le centre à un point du cercle"],
    comparator: "mcq_exact",
    hint: "Rayon : du centre vers le cercle.",
    explanation:
      "Un rayon relie le centre du cercle à un point du cercle.",
    tags: ["cm2", "figure_plane", "cercle", "rayon", "definition", "qcm", "canvas"],
    canvas: cercleCanvas({ radius: true }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_9_diametre_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "Un diamètre d’un cercle est un segment qui...",
    format: "qcm",
    choices: [
      "relie deux points du cercle et passe par le centre",
      "relie le centre à un seul point du cercle",
      "forme toujours un carré",
      "est toujours extérieur au cercle",
    ],
    expected: ["relie deux points du cercle et passe par le centre"],
    comparator: "mcq_exact",
    hint: "Le diamètre traverse le cercle en passant par le centre.",
    explanation:
      "Un diamètre relie deux points du cercle et passe par le centre.",
    tags: ["cm2", "figure_plane", "cercle", "diametre", "definition", "qcm", "canvas"],
    canvas: cercleCanvas({ diameter: true }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_10_relation_diametre_rayon",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Le diamètre d’un cercle mesure...",
    format: "qcm",
    choices: [
      "deux fois le rayon",
      "la moitié du rayon",
      "la même chose que le rayon",
      "toujours 10 cm",
    ],
    expected: ["deux fois le rayon"],
    comparator: "mcq_exact",
    hint: "Un diamètre contient deux rayons alignés.",
    explanation:
      "Un diamètre passe par le centre. Il est formé de deux rayons alignés : il mesure donc deux fois le rayon.",
    tags: ["cm2", "figure_plane", "cercle", "diametre", "rayon", "relation", "qcm", "canvas"],
    canvas: cercleCanvas({ diameter: true, radius: true }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_11_calcul_diametre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Un cercle a un rayon de 4 cm. Quel est son diamètre ?",
    format: "short",
    expected: ["8", "8 cm", "8cm"],
    comparator: "number_equal",
    hint: "Le diamètre vaut 2 × rayon.",
    explanation:
      "Le diamètre vaut deux fois le rayon. Ici, 2 × 4 = 8 cm.",
    tags: ["cm2", "figure_plane", "cercle", "diametre", "rayon", "calcul"],
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_12_calcul_rayon",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Un cercle a un diamètre de 10 cm. Quel est son rayon ?",
    format: "short",
    expected: ["5", "5 cm", "5cm"],
    comparator: "number_equal",
    hint: "Le rayon est la moitié du diamètre.",
    explanation:
      "Le rayon est la moitié du diamètre. Ici, 10 ÷ 2 = 5 cm.",
    tags: ["cm2", "figure_plane", "cercle", "diametre", "rayon", "calcul"],
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_13_point_sur_cercle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Sur la figure, le point A est...",
    format: "qcm",
    choices: [
      "sur le cercle",
      "au centre du cercle",
      "à l’extérieur du cercle",
      "le nom du disque",
    ],
    expected: ["sur le cercle"],
    comparator: "mcq_exact",
    hint: "A est placé sur le contour bleu.",
    explanation:
      "Le point A est placé sur le contour bleu. Il est donc sur le cercle.",
    tags: ["cm2", "figure_plane", "cercle", "point", "qcm", "canvas"],
    canvas: cercleCanvas({ radius: true }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_14_reunion_roue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 3,
    theme: "reunion",
    text: "Sur le dessin d’une roue de vélo sur le front de mer de Saint-Pierre, le contour de la roue peut être modélisé par...",
    format: "qcm",
    choices: ["un cercle", "un carré", "un triangle", "un rectangle"],
    expected: ["un cercle"],
    comparator: "mcq_exact",
    hint: "Le contour d’une roue est rond.",
    explanation:
      "Le contour d’une roue peut être modélisé par un cercle.",
    tags: ["cm2", "figure_plane", "cercle", "reunion", "qcm", "canvas"],
    canvas: cercleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_15_open_centre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce qu’est le centre d’un cercle.",
    format: "open",
    expected: ["milieu", "centre", "distance"],
    comparator: "contains_keyword",
    hint: "Le centre est au milieu du cercle.",
    explanation:
      "Le centre d’un cercle est le point situé au milieu. Tous les points du cercle sont à la même distance de ce centre.",
    tags: ["cm2", "figure_plane", "cercle", "centre", "open", "canvas"],
    canvas: cercleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_16_open_rayon",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce qu’est un rayon.",
    format: "open",
    expected: ["centre", "point", "cercle"],
    comparator: "contains_keyword",
    hint: "Un rayon part du centre.",
    explanation:
      "Un rayon est un segment qui relie le centre du cercle à un point du cercle.",
    tags: ["cm2", "figure_plane", "cercle", "rayon", "open", "canvas"],
    canvas: cercleCanvas({ radius: true }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_cercle_fixed_17_open_diametre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce qu’est un diamètre.",
    format: "open",
    expected: ["deux", "points", "centre", "cercle"],
    comparator: "contains_keyword",
    hint: "Un diamètre passe par le centre.",
    explanation:
      "Un diamètre est un segment qui relie deux points du cercle en passant par le centre.",
    tags: ["cm2", "figure_plane", "cercle", "diametre", "open", "canvas"],
    canvas: cercleCanvas({ diameter: true }),
  },

  {
    kind: "template",
    id: "cm2_figure_cercle_tpl_1_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe le segment coloré.",
    tags: ["cm2", "figure_plane", "cercle", "vocabulaire", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Sur la figure, le segment [OA] est...",
          correct: "un rayon",
          canvas: cercleCanvas({ radius: true }),
          explanation:
            "Le segment [OA] relie le centre O à un point A du cercle. C’est un rayon.",
          wrongs: ["un diamètre", "une corde", "un côté"],
        },
        {
          text: "Sur la figure, le segment [BA] est...",
          correct: "un diamètre",
          canvas: cercleCanvas({ diameter: true }),
          explanation:
            "Le segment [BA] relie deux points du cercle et passe par le centre. C’est un diamètre.",
          wrongs: ["un rayon", "une corde", "un côté"],
        },
        {
          text: "Sur la figure, le segment [CD] est...",
          correct: "une corde",
          canvas: cercleCanvas({ chord: true }),
          explanation:
            "Le segment [CD] relie deux points du cercle. C’est une corde.",
          wrongs: ["un rayon", "un diamètre", "un angle droit"],
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_figure_cercle_tpl_2_calcul_diametre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 3,
    theme: "neutral",
    hint: "Le diamètre vaut deux fois le rayon.",
    tags: ["cm2", "figure_plane", "cercle", "diametre", "rayon", "calcul", "template"],
    generate: () => {
      const rayon = randomInt(2, 9);
      const diametre = 2 * rayon;

      return {
        text: `Un cercle a un rayon de ${rayon} cm. Quel est son diamètre ?`,
        format: "short",
        expected: [String(diametre), `${diametre} cm`, `${diametre}cm`],
        comparator: "number_equal",
        explanation:
          `Le diamètre vaut deux fois le rayon. Ici, 2 × ${rayon} = ${diametre} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_figure_cercle_tpl_3_calcul_rayon",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 3,
    theme: "neutral",
    hint: "Le rayon est la moitié du diamètre.",
    tags: ["cm2", "figure_plane", "cercle", "diametre", "rayon", "calcul", "template"],
    generate: () => {
      const rayon = randomInt(2, 9);
      const diametre = 2 * rayon;

      return {
        text: `Un cercle a un diamètre de ${diametre} cm. Quel est son rayon ?`,
        format: "short",
        expected: [String(rayon), `${rayon} cm`, `${rayon}cm`],
        comparator: "number_equal",
        explanation:
          `Le rayon est la moitié du diamètre. Ici, ${diametre} ÷ 2 = ${rayon} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_figure_cercle_tpl_4_cercle_disque",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 3,
    theme: "neutral",
    hint: "Le cercle est le contour ; le disque contient l’intérieur.",
    tags: ["cm2", "figure_plane", "cercle", "disque", "template", "qcm", "canvas"],
    generate: () => {
      const askDisk = Math.random() < 0.5;

      return {
        text: askDisk
          ? "Le disque désigne..."
          : "Le cercle désigne...",
        format: "qcm",
        choices: askDisk
          ? shuffle([
              "le contour et toute la surface intérieure",
              "seulement le contour",
              "un diamètre seulement",
              "un angle droit",
            ])
          : shuffle([
              "seulement le contour",
              "toute la surface intérieure",
              "un carré",
              "un triangle",
            ]),
        expected: askDisk
          ? ["le contour et toute la surface intérieure"]
          : ["seulement le contour"],
        comparator: "mcq_exact",
        explanation: askDisk
          ? "Le disque contient le contour et toute la surface intérieure."
          : "Le cercle désigne seulement le contour.",
        canvas: cercleCanvas({ showDisk: askDisk }),
      };
    },
  },
  // ============================================================
  // FIGURE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_1_carre_ou_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 4,
    theme: "neutral",
    text: "La figure représentée est un carré. Quelle affirmation est vraie ?",
    format: "qcm",
    choices: [
      "c’est aussi un rectangle particulier",
      "ce n’est jamais un rectangle",
      "elle a seulement 3 côtés",
      "elle n’a aucun angle droit",
    ],
    expected: ["c’est aussi un rectangle particulier"],
    comparator: "mcq_exact",
    hint: "Un rectangle possède 4 angles droits.",
    explanation:
      "Un carré possède 4 angles droits. Il vérifie donc la propriété d’un rectangle. C’est un rectangle particulier.",
    tags: ["cm2", "figure_plane", "defi", "carre", "rectangle", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_2_carre_ou_losange",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 4,
    theme: "neutral",
    text: "La figure représentée est un carré. Quelle affirmation est vraie ?",
    format: "qcm",
    choices: [
      "c’est aussi un losange particulier",
      "ce n’est jamais un losange",
      "elle n’a pas de côtés égaux",
      "elle est forcément un cercle",
    ],
    expected: ["c’est aussi un losange particulier"],
    comparator: "mcq_exact",
    hint: "Un losange possède 4 côtés égaux.",
    explanation:
      "Un carré possède 4 côtés égaux. Il vérifie donc la propriété d’un losange. C’est un losange particulier.",
    tags: ["cm2", "figure_plane", "defi", "carre", "losange", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_3_triangle_equilateral_isocele",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un triangle équilatéral est-il aussi un triangle isocèle particulier ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un triangle isocèle a au moins deux côtés égaux.",
    explanation:
      "Oui. Un triangle équilatéral a 3 côtés égaux. Il a donc au moins 2 côtés égaux : c’est un triangle isocèle particulier.",
    tags: ["cm2", "figure_plane", "defi", "triangle", "equilateral", "isocele", "qcm", "canvas"],
    canvas: triangleCanvas({
      equalSides: [
        ["AB", "BC"],
        ["BC", "CA"],
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_4_diametre_rayon_relation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un diamètre est composé de...",
    format: "qcm",
    choices: [
      "deux rayons alignés",
      "un seul rayon",
      "quatre côtés égaux",
      "trois sommets",
    ],
    expected: ["deux rayons alignés"],
    comparator: "mcq_exact",
    hint: "Le diamètre passe par le centre.",
    explanation:
      "Un diamètre passe par le centre du cercle. Il est formé de deux rayons alignés.",
    tags: ["cm2", "figure_plane", "defi", "cercle", "diametre", "rayon", "qcm", "canvas"],
    canvas: cercleCanvas({ diameter: true, radius: true }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_5_erreur_cercle_disque",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “Le cercle, c’est toute la surface coloriée.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le cercle est seulement le contour.",
    explanation:
      "Non. Le cercle désigne le contour. Toute la surface coloriée avec le contour correspond au disque.",
    tags: ["cm2", "figure_plane", "defi", "cercle", "disque", "erreur", "qcm", "canvas"],
    canvas: cercleCanvas({ showDisk: true }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_6_erreur_rectangle_losange",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “Tous les rectangles sont des losanges.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un losange doit avoir 4 côtés égaux.",
    explanation:
      "Non. Un rectangle a 4 angles droits, mais ses 4 côtés ne sont pas forcément égaux. Il n’est donc pas toujours un losange.",
    tags: ["cm2", "figure_plane", "defi", "rectangle", "losange", "erreur", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_7_erreur_losange_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “Tous les losanges sont des rectangles.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un rectangle doit avoir 4 angles droits.",
    explanation:
      "Non. Un losange a 4 côtés égaux, mais il n’a pas forcément 4 angles droits. Il n’est donc pas toujours un rectangle.",
    tags: ["cm2", "figure_plane", "defi", "losange", "rectangle", "erreur", "qcm", "canvas"],
    canvas: losangeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_8_diagonale_pas_cote",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans le quadrilatère ABCD, [AC] est...",
    format: "qcm",
    choices: ["une diagonale", "un côté", "un rayon", "un diamètre"],
    expected: ["une diagonale"],
    comparator: "mcq_exact",
    hint: "Une diagonale relie deux sommets opposés.",
    explanation:
      "[AC] relie deux sommets opposés du quadrilatère. C’est une diagonale, pas un côté.",
    tags: ["cm2", "figure_plane", "defi", "quadrilatere", "diagonale", "qcm", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 60, y: 75 },
        B: { x: 240, y: 75 },
        C: { x: 240, y: 170 },
        D: { x: 60, y: 170 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
        showDiagonals: true,
      },
      sideLabels: {
        AC: "diagonale",
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [
          ["AB", "CD"],
          ["BC", "DA"],
        ],
        parallelSides: [
          ["AB", "CD"],
          ["BC", "DA"],
        ],
      },
    },
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_9_deviner_figure_proprietes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Je suis un quadrilatère avec 4 côtés égaux et 4 angles droits. Qui suis-je ?",
    format: "qcm",
    choices: ["un carré", "un rectangle quelconque", "un triangle", "un cercle"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "C’est à la fois un rectangle particulier et un losange particulier.",
    explanation:
      "Une figure avec 4 côtés égaux et 4 angles droits est un carré.",
    tags: ["cm2", "figure_plane", "defi", "devinette", "carre", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_10_deviner_cercle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Je suis un segment qui relie deux points du cercle en passant par le centre. Qui suis-je ?",
    format: "qcm",
    choices: ["un diamètre", "un rayon", "une corde quelconque", "un côté"],
    expected: ["un diamètre"],
    comparator: "mcq_exact",
    hint: "Il traverse le cercle par le centre.",
    explanation:
      "Un diamètre relie deux points du cercle et passe par le centre.",
    tags: ["cm2", "figure_plane", "defi", "cercle", "diametre", "devinette", "qcm", "canvas"],
    canvas: cercleCanvas({ diameter: true }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_11_calcul_diametre_rayon",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un cercle a un diamètre de 18 cm. Quel est son rayon ?",
    format: "short",
    expected: ["9", "9 cm", "9cm"],
    comparator: "number_equal",
    hint: "Le rayon est la moitié du diamètre.",
    explanation:
      "Le rayon est la moitié du diamètre. Ici, 18 ÷ 2 = 9 cm.",
    tags: ["cm2", "figure_plane", "defi", "cercle", "rayon", "diametre", "calcul"],
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_12_calcul_rayon_diametre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un cercle a un rayon de 7 cm. Quel est son diamètre ?",
    format: "short",
    expected: ["14", "14 cm", "14cm"],
    comparator: "number_equal",
    hint: "Le diamètre vaut deux fois le rayon.",
    explanation:
      "Le diamètre vaut deux fois le rayon. Ici, 2 × 7 = 14 cm.",
    tags: ["cm2", "figure_plane", "defi", "cercle", "rayon", "diametre", "calcul"],
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_13_reunion_panneau",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, un panneau de randonnée a la forme d’un rectangle. Quelle propriété peut-on utiliser ?",
    format: "qcm",
    choices: [
      "il possède 4 angles droits",
      "il possède 3 côtés",
      "son contour est un cercle",
      "il n’a aucun sommet",
    ],
    expected: ["il possède 4 angles droits"],
    comparator: "mcq_exact",
    hint: "Pense à la propriété du rectangle.",
    explanation:
      "Un rectangle possède 4 angles droits. Cette propriété aide à reconnaître la forme du panneau.",
    tags: ["cm2", "figure_plane", "defi", "reunion", "rectangle", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_14_reunion_roue_velo",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Sur une roue de vélo, un rayon relie...",
    format: "qcm",
    choices: [
      "le centre à un point du cercle",
      "deux sommets d’un carré",
      "deux côtés d’un rectangle",
      "trois sommets d’un triangle",
    ],
    expected: ["le centre à un point du cercle"],
    comparator: "mcq_exact",
    hint: "Rayon : centre vers contour.",
    explanation:
      "Dans un cercle, un rayon relie le centre à un point du cercle. On retrouve cette idée sur une roue de vélo.",
    tags: ["cm2", "figure_plane", "defi", "reunion", "cercle", "rayon", "qcm", "canvas"],
    canvas: cercleCanvas({ radius: true }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_15_open_comparer_rectangle_carre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre un rectangle et un carré.",
    format: "open",
    expected: ["rectangle", "carré", "côtés", "égaux", "angles", "droits"],
    comparator: "contains_keyword",
    hint: "Les deux ont 4 angles droits, mais le carré a une propriété en plus.",
    explanation:
      "Un rectangle possède 4 angles droits. Un carré possède aussi 4 angles droits, mais il a en plus 4 côtés égaux.",
    tags: ["cm2", "figure_plane", "defi", "rectangle", "carre", "open"],
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_16_open_comparer_cercle_disque",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre un cercle et un disque.",
    format: "open",
    expected: ["cercle", "contour", "disque", "intérieur", "surface"],
    comparator: "contains_keyword",
    hint: "Le cercle est le contour ; le disque contient l’intérieur.",
    explanation:
      "Le cercle est seulement le contour. Le disque contient le contour et toute la surface intérieure.",
    tags: ["cm2", "figure_plane", "defi", "cercle", "disque", "open", "canvas"],
    canvas: cercleCanvas({ showDisk: true }),
  },

  {
    kind: "fixed",
    id: "cm2_figure_defi_fixed_17_open_choisir_figure",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Je veux une figure avec 4 côtés égaux mais pas forcément 4 angles droits. Quelle figure dois-je choisir ? Explique.",
    format: "open",
    expected: ["losange", "4", "côtés", "égaux"],
    comparator: "contains_keyword",
    hint: "La propriété principale est : 4 côtés égaux.",
    explanation:
      "Il faut choisir un losange. Un losange est un quadrilatère qui possède 4 côtés égaux, sans avoir forcément 4 angles droits.",
    tags: ["cm2", "figure_plane", "defi", "losange", "open", "canvas"],
    canvas: losangeCanvas(),
  },

  {
    kind: "template",
    id: "cm2_figure_defi_tpl_1_erreur_classique",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie la définition exacte de la figure.",
    tags: ["cm2", "figure_plane", "defi", "erreur", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un élève dit : “Un carré n’est jamais un rectangle.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Un carré a 4 angles droits, comme un rectangle. C’est donc un rectangle particulier.",
          canvas: carreCanvas(),
        },
        {
          text: "Un élève dit : “Un carré n’est jamais un losange.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Un carré a 4 côtés égaux, comme un losange. C’est donc un losange particulier.",
          canvas: carreCanvas(),
        },
        {
          text: "Un élève dit : “Le diamètre est plus petit que le rayon.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Le diamètre vaut deux fois le rayon. Il est donc plus grand que le rayon.",
          canvas: cercleCanvas({ diameter: true, radius: true }),
        },
        {
          text: "Un élève dit : “Le cercle est toute la surface intérieure.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Le cercle est seulement le contour. La surface intérieure appartient au disque.",
          canvas: cercleCanvas({ showDisk: true }),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_figure_defi_tpl_2_deviner_figure",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Associe les propriétés à la bonne figure.",
    tags: ["cm2", "figure_plane", "defi", "devinette", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Je suis une figure avec 3 côtés. Qui suis-je ?",
          correct: "un triangle",
          explanation: "Une figure avec 3 côtés est un triangle.",
          canvas: triangleCanvas(),
          wrongs: ["un rectangle", "un cercle", "un losange"],
        },
        {
          text: "Je suis un quadrilatère avec 4 angles droits. Qui suis-je ?",
          correct: "un rectangle",
          explanation: "Un quadrilatère avec 4 angles droits est un rectangle.",
          canvas: rectangleCanvas(),
          wrongs: ["un triangle", "un cercle", "une corde"],
        },
        {
          text: "Je suis un quadrilatère avec 4 côtés égaux. Qui suis-je ?",
          correct: "un losange",
          explanation: "Un quadrilatère avec 4 côtés égaux est un losange.",
          canvas: losangeCanvas(),
          wrongs: ["un triangle", "un cercle", "un segment"],
        },
        {
          text: "Je suis le contour rond à égale distance du centre. Qui suis-je ?",
          correct: "un cercle",
          explanation: "Le cercle est le contour formé par les points à égale distance du centre.",
          canvas: cercleCanvas(),
          wrongs: ["un carré", "un triangle", "un rectangle"],
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_figure_defi_tpl_3_calcul_cercle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise la relation entre rayon et diamètre.",
    tags: ["cm2", "figure_plane", "defi", "cercle", "rayon", "diametre", "calcul", "template"],
    generate: () => {
      const rayon = randomInt(3, 12);
      const diametre = 2 * rayon;
      const askDiameter = Math.random() < 0.5;

      if (askDiameter) {
        return {
          text: `Un cercle a un rayon de ${rayon} cm. Quel est son diamètre ?`,
          format: "short",
          expected: [String(diametre), `${diametre} cm`, `${diametre}cm`],
          comparator: "number_equal",
          explanation:
            `Le diamètre vaut deux fois le rayon. Ici, 2 × ${rayon} = ${diametre} cm.`,
        };
      }

      return {
        text: `Un cercle a un diamètre de ${diametre} cm. Quel est son rayon ?`,
        format: "short",
        expected: [String(rayon), `${rayon} cm`, `${rayon}cm`],
        comparator: "number_equal",
        explanation:
          `Le rayon est la moitié du diamètre. Ici, ${diametre} ÷ 2 = ${rayon} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_figure_defi_tpl_4_comparer_figures",
    niveau: "cm2",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche la propriété commune ou la différence.",
    tags: ["cm2", "figure_plane", "defi", "comparer", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Quelle propriété est commune au carré et au rectangle ?",
          correct: "ils ont 4 angles droits",
          explanation:
            "Le carré et le rectangle possèdent tous les deux 4 angles droits.",
          canvas: carreCanvas(),
          wrongs: [
            "ils ont toujours exactement la même forme",
            "ils sont toujours des cercles",
            "ils ont 3 côtés",
          ],
        },
        {
          text: "Quelle propriété est commune au carré et au losange ?",
          correct: "ils ont 4 côtés égaux",
          explanation:
            "Le carré et le losange possèdent tous les deux 4 côtés égaux.",
          canvas: carreCanvas(),
          wrongs: [
            "ils ont toujours 3 côtés",
            "ils sont toujours des cercles",
            "ils n’ont aucun sommet",
          ],
        },
        {
          text: "Quelle différence entre le cercle et le disque est correcte ?",
          correct: "le cercle est le contour, le disque contient l’intérieur",
          explanation:
            "Le cercle est le contour. Le disque contient le contour et la surface intérieure.",
          canvas: cercleCanvas({ showDisk: true }),
          wrongs: [
            "le cercle a 4 côtés",
            "le disque est seulement un segment",
            "le cercle est un triangle",
          ],
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },
];
