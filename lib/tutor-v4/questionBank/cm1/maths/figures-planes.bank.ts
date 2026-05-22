// lib/tutor-v4/question-banks/maths/cm1/figures-planes.bank.ts

import type {
  TutorBankItemV4,
  TriangleCanvasData,
  QuadrilatereCanvasData,
  CercleCanvasData,
  FigureLibreCanvasData,
} from "@/lib/tutor-v4/types";

type Pt = { x: number; y: number };
type GridCell = [row: number, col: number];
type GridPoint = [row: number, col: number];

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
}

function exp(
  definition: string,
  methode: string,
  observation: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nObservation : ${observation}\n\nConclusion : ${conclusion}`;
}

function triangleCanvas(
  data: Omit<TriangleCanvasData, "kind">
): TriangleCanvasData {
  return {
    kind: "triangle",
    ...data,
  };
}

function quadrilatereCanvas(
  data: Omit<QuadrilatereCanvasData, "kind">
): QuadrilatereCanvasData {
  return {
    kind: "quadrilatere",
    ...data,
  };
}

function cercleCanvas(data: Omit<CercleCanvasData, "kind">): CercleCanvasData {
  return {
    kind: "cercle",
    ...data,
  };
}

function figureLibreCanvas(
  data: Omit<FigureLibreCanvasData, "kind">
): FigureLibreCanvasData {
  return {
    kind: "figure_libre",
    ...data,
  };
}

// ============================================================
// FIGURES MODÈLES
// ============================================================

function triangleRectangleCanvas(): TriangleCanvasData {
  return triangleCanvas({
    points: {
      A: { x: 60, y: 180 },
      B: { x: 220, y: 180 },
      C: { x: 60, y: 60 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
    },
    marks: {
      rightAngleAt: "A",
    },
    display: {
      showLabels: true,
      showPoints: true,
      showSides: true,
      showAngles: true,
    },
  });
}

function triangleIsoceleCanvas(): TriangleCanvasData {
  return triangleCanvas({
    points: {
      A: { x: 150, y: 45 },
      B: { x: 55, y: 185 },
      C: { x: 245, y: 185 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
    },
    marks: {
      equalSides: [["AB", "BC"]],
    },
    display: {
      showLabels: true,
      showPoints: true,
      showSides: true,
      showAngles: true,
    },
  });
}

function triangleEquilateralCanvas(): TriangleCanvasData {
  return triangleCanvas({
    points: {
      A: { x: 150, y: 45 },
      B: { x: 60, y: 190 },
      C: { x: 240, y: 190 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
    },
    marks: {
      equalSides: [
        ["AB", "BC"],
        ["BC", "CA"],
      ],
    },
    display: {
      showLabels: true,
      showPoints: true,
      showSides: true,
      showAngles: true,
    },
  });
}

function rectangleCanvas(): QuadrilatereCanvasData {
  return quadrilatereCanvas({
    points: {
      A: { x: 55, y: 55 },
      B: { x: 245, y: 55 },
      C: { x: 245, y: 175 },
      D: { x: 55, y: 175 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
    },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      parallelSides: [
        ["AB", "CD"],
        ["AD", "BC"],
      ],
    },
    display: {
      showLabels: true,
      showPoints: true,
      showSides: true,
      showAngles: true,
    },
  });
}

function carreCanvas(): QuadrilatereCanvasData {
  return quadrilatereCanvas({
    points: {
      A: { x: 70, y: 50 },
      B: { x: 210, y: 50 },
      C: { x: 210, y: 190 },
      D: { x: 70, y: 190 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
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
        ["AD", "BC"],
      ],
    },
    display: {
      showLabels: true,
      showPoints: true,
      showSides: true,
      showAngles: true,
    },
  });
}

function losangeCanvas(): QuadrilatereCanvasData {
  return quadrilatereCanvas({
    points: {
      A: { x: 150, y: 35 },
      B: { x: 250, y: 115 },
      C: { x: 150, y: 195 },
      D: { x: 50, y: 115 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
    },
    marks: {
      equalSides: [
        ["AB", "BC"],
        ["BC", "CD"],
        ["CD", "DA"],
      ],
      parallelSides: [
        ["AB", "CD"],
        ["AD", "BC"],
      ],
    },
    display: {
      showLabels: true,
      showPoints: true,
      showSides: true,
      showAngles: true,
    },
  });
}

function cercleRayonCanvas(): CercleCanvasData {
  return cercleCanvas({
    circle: {
      cx: 170,
      cy: 130,
      r: 80,
      showCircle: true,
      showDisk: false,
    },
    points: [
      { id: "O", x: 170, y: 130, label: "O", highlight: true },
      { id: "A", x: 250, y: 130, label: "A" },
    ],
    segments: [
      {
        id: "OA",
        from: "O",
        to: "A",
        kind: "rayon",
        label: "rayon",
        highlight: true,
      },
    ],
    display: {
      showLabels: true,
      showPoints: true,
    },
  });
}

function cercleDiametreCanvas(): CercleCanvasData {
  return cercleCanvas({
    circle: {
      cx: 170,
      cy: 130,
      r: 80,
      showCircle: true,
      showDisk: false,
    },
    points: [
      { id: "O", x: 170, y: 130, label: "O", highlight: true },
      { id: "A", x: 90, y: 130, label: "A" },
      { id: "B", x: 250, y: 130, label: "B" },
    ],
    segments: [
      {
        id: "AB",
        from: "A",
        to: "B",
        kind: "diametre",
        label: "diamètre",
        highlight: true,
      },
    ],
    display: {
      showLabels: true,
      showPoints: true,
    },
  });
}

function disqueCanvas(): CercleCanvasData {
  return cercleCanvas({
    circle: {
      cx: 170,
      cy: 130,
      r: 80,
      showCircle: true,
      showDisk: true,
    },
    points: [{ id: "O", x: 170, y: 130, label: "O", highlight: true }],
    display: {
      showLabels: true,
      showPoints: true,
    },
  });
}

function maisonGridCanvas(): FigureLibreCanvasData {
  return figureLibreCanvas({
    grid: {
      rows: 6,
      cols: 6,
      filledCells: [
        [2, 2],
        [2, 3],
        [3, 1],
        [3, 2],
        [3, 3],
        [3, 4],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
      ],
    },
    vertices: {
      A: [3, 1],
      B: [3, 5],
      C: [5, 5],
      D: [5, 1],
    },
    display: {
      showGrid: true,
      showFilled: true,
      showPerimeter: true,
      showVertices: true,
      showVertexLabels: true,
    },
    colors: {
      filled: "#dbeafe",
      perimeter: "#ef4444",
      vertex: "#7c3aed",
    },
  });
}

// ============================================================
// HELPERS TEMPLATES
// ============================================================

const TRIANGLE_TYPES = [
  {
    name: "triangle rectangle",
    canvas: triangleRectangleCanvas,
    keyProperty: "il a un angle droit",
  },
  {
    name: "triangle isocèle",
    canvas: triangleIsoceleCanvas,
    keyProperty: "il a deux côtés de même longueur",
  },
  {
    name: "triangle équilatéral",
    canvas: triangleEquilateralCanvas,
    keyProperty: "il a trois côtés de même longueur",
  },
] as const;

const QUADRILATERE_TYPES = [
  {
    name: "rectangle",
    canvas: rectangleCanvas,
    keyProperty: "il a quatre angles droits",
  },
  {
    name: "carré",
    canvas: carreCanvas,
    keyProperty: "il a quatre côtés égaux et quatre angles droits",
  },
  {
    name: "losange",
    canvas: losangeCanvas,
    keyProperty: "il a quatre côtés égaux",
  },
] as const;

const CERCLE_ELEMENTS = [
  {
    name: "rayon",
    canvas: cercleRayonCanvas,
    definition: "un segment qui relie le centre à un point du cercle",
  },
  {
    name: "diamètre",
    canvas: cercleDiametreCanvas,
    definition: "un segment qui relie deux points du cercle en passant par le centre",
  },
  {
    name: "disque",
    canvas: disqueCanvas,
    definition: "toute la surface à l’intérieur du cercle",
  },
] as const;

// ============================================================
// BANK
// ============================================================

export const figuresPlanesBank: TutorBankItemV4[] = [
  // ============================================================
  // FIGURE_TRIANGLE
  // Reconnaître les triangles et quelques triangles particuliers
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_figure_triangle_fixed_1_rectangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la nature de ce triangle ?",
    format: "qcm",
    choices: [
      "triangle rectangle",
      "triangle isocèle",
      "triangle équilatéral",
      "quadrilatère",
    ],
    expected: ["triangle rectangle"],
    comparator: "mcq_exact",
    hint: "Cherche le petit carré qui indique un angle droit.",
    explanation: exp(
      "Un triangle rectangle est un triangle qui possède un angle droit.",
      "On observe les codages de la figure.",
      "Le petit carré indique un angle droit au point A.",
      "Ce triangle est un triangle rectangle."
    ),
    tags: ["cm1", "figure_plane", "triangle", "rectangle", "qcm", "canvas"],
    canvas: triangleRectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_triangle_fixed_2_isocele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la nature de ce triangle ?",
    format: "qcm",
    choices: [
      "triangle isocèle",
      "triangle rectangle",
      "triangle quelconque",
      "carré",
    ],
    expected: ["triangle isocèle"],
    comparator: "mcq_exact",
    hint: "Cherche les deux côtés codés de la même façon.",
    explanation: exp(
      "Un triangle isocèle possède deux côtés de même longueur.",
      "On observe les codages des côtés.",
      "Deux côtés sont codés comme égaux.",
      "Ce triangle est un triangle isocèle."
    ),
    tags: ["cm1", "figure_plane", "triangle", "isocele", "qcm", "canvas"],
    canvas: triangleIsoceleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_triangle_fixed_3_equilateral",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Ce triangle a trois côtés de même longueur. C’est un...",
    format: "qcm",
    choices: [
      "triangle équilatéral",
      "triangle rectangle",
      "rectangle",
      "losange",
    ],
    expected: ["triangle équilatéral"],
    comparator: "mcq_exact",
    hint: "Équi-latéral veut dire : côtés égaux.",
    explanation: exp(
      "Un triangle équilatéral possède trois côtés de même longueur.",
      "On cherche le codage d’égalité sur les trois côtés.",
      "Les trois côtés sont codés comme égaux.",
      "C’est un triangle équilatéral."
    ),
    tags: ["cm1", "figure_plane", "triangle", "equilateral", "qcm", "canvas"],
    canvas: triangleEquilateralCanvas(),
  },

  {
    kind: "template",
    id: "cm1_figure_triangle_tpl_1_reconnaitre_type",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe les codages : angle droit ou côtés égaux.",
    tags: ["cm1", "figure_plane", "triangle", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice(TRIANGLE_TYPES);

      return {
        text: "Quelle est la nature de ce triangle ?",
        format: "qcm",
        choices: makeChoices(item.name, [
          "triangle rectangle",
          "triangle isocèle",
          "triangle équilatéral",
          "quadrilatère",
        ]),
        expected: [item.name],
        comparator: "mcq_exact",
        explanation: exp(
          "On peut reconnaître certains triangles grâce à leurs propriétés.",
          "On observe les côtés et les angles codés.",
          `Ici, ${item.keyProperty}.`,
          `La figure est un ${item.name}.`
        ),
        canvas: item.canvas(),
      };
    },
  },

  // ============================================================
  // FIGURE_QUADRILATERE
  // Reconnaître carré, rectangle, losange, quadrilatère
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_figure_quadrilatere_fixed_1_rectangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la nature de ce quadrilatère ?",
    format: "qcm",
    choices: ["rectangle", "triangle", "cercle", "losange"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Un rectangle a quatre angles droits.",
    explanation: exp(
      "Un rectangle est un quadrilatère qui possède quatre angles droits.",
      "On observe les codages des angles.",
      "Les quatre angles sont droits.",
      "Cette figure est un rectangle."
    ),
    tags: ["cm1", "figure_plane", "quadrilatere", "rectangle", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_quadrilatere_fixed_2_carre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 1,
    theme: "neutral",
    text: "Cette figure a quatre côtés égaux et quatre angles droits. C’est un...",
    format: "qcm",
    choices: ["carré", "rectangle", "triangle", "cercle"],
    expected: ["carré"],
    comparator: "mcq_exact",
    hint: "Le carré est à la fois un rectangle spécial et un losange spécial.",
    explanation: exp(
      "Un carré est un quadrilatère qui possède quatre côtés égaux et quatre angles droits.",
      "On observe les codages des côtés et des angles.",
      "Tous les côtés sont égaux et tous les angles sont droits.",
      "Cette figure est un carré."
    ),
    tags: ["cm1", "figure_plane", "quadrilatere", "carre", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_quadrilatere_fixed_3_losange",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Cette figure a quatre côtés de même longueur. C’est un...",
    format: "qcm",
    choices: ["losange", "triangle", "cercle", "droite"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "Un losange a ses quatre côtés égaux.",
    explanation: exp(
      "Un losange est un quadrilatère qui possède quatre côtés de même longueur.",
      "On regarde les marques d’égalité sur les côtés.",
      "Les quatre côtés sont codés comme égaux.",
      "Cette figure est un losange."
    ),
    tags: ["cm1", "figure_plane", "quadrilatere", "losange", "qcm", "canvas"],
    canvas: losangeCanvas(),
  },

  {
    kind: "template",
    id: "cm1_figure_quadrilatere_tpl_1_reconnaitre_type",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe les côtés égaux, les angles droits et les côtés parallèles.",
    tags: ["cm1", "figure_plane", "quadrilatere", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice(QUADRILATERE_TYPES);

      return {
        text: "Quelle est la nature de ce quadrilatère ?",
        format: "qcm",
        choices: makeChoices(item.name, [
          "rectangle",
          "carré",
          "losange",
          "triangle",
        ]),
        expected: [item.name],
        comparator: "mcq_exact",
        explanation: exp(
          "Un quadrilatère est une figure qui possède quatre côtés.",
          "On utilise les propriétés visibles pour identifier la figure.",
          `Ici, ${item.keyProperty}.`,
          `La figure est un ${item.name}.`
        ),
        canvas: item.canvas(),
      };
    },
  },

  // ============================================================
  // FIGURE_CERCLE
  // Centre, rayon, diamètre, cercle et disque
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_figure_cercle_fixed_1_rayon",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 1,
    theme: "neutral",
    text: "Le segment qui relie le centre du cercle à un point du cercle s’appelle...",
    format: "qcm",
    choices: ["un rayon", "un diamètre", "une corde", "un côté"],
    expected: ["un rayon"],
    comparator: "mcq_exact",
    hint: "Le rayon part du centre.",
    explanation: exp(
      "Un rayon est un segment qui relie le centre du cercle à un point du cercle.",
      "On repère le centre O et le point A sur le cercle.",
      "Le segment OA part du centre et rejoint le cercle.",
      "OA est un rayon."
    ),
    tags: ["cm1", "figure_plane", "cercle", "rayon", "qcm", "canvas"],
    canvas: cercleRayonCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_cercle_fixed_2_diametre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 1,
    theme: "neutral",
    text: "Le segment qui passe par le centre et relie deux points du cercle s’appelle...",
    format: "qcm",
    choices: ["un diamètre", "un rayon", "un côté", "une diagonale"],
    expected: ["un diamètre"],
    comparator: "mcq_exact",
    hint: "Le diamètre traverse tout le cercle en passant par le centre.",
    explanation: exp(
      "Un diamètre relie deux points du cercle et passe par le centre.",
      "On observe le segment AB.",
      "Il traverse le cercle en passant par O.",
      "AB est un diamètre."
    ),
    tags: ["cm1", "figure_plane", "cercle", "diametre", "qcm", "canvas"],
    canvas: cercleDiametreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_cercle_fixed_3_disque",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "La surface coloriée à l’intérieur du cercle s’appelle...",
    format: "qcm",
    choices: ["un disque", "un rayon", "un diamètre", "une droite"],
    expected: ["un disque"],
    comparator: "mcq_exact",
    hint: "Le cercle est le contour ; le disque est l’intérieur.",
    explanation: exp(
      "Le cercle est le contour. Le disque est toute la surface à l’intérieur.",
      "On regarde la partie coloriée.",
      "La surface intérieure est colorée.",
      "La surface coloriée est un disque."
    ),
    tags: ["cm1", "figure_plane", "cercle", "disque", "qcm", "canvas"],
    canvas: disqueCanvas(),
  },

  {
    kind: "template",
    id: "cm1_figure_cercle_tpl_1_vocabulaire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 2,
    theme: "neutral",
    hint: "Rayon : centre vers cercle. Diamètre : traverse par le centre. Disque : intérieur.",
    tags: ["cm1", "figure_plane", "cercle", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice(CERCLE_ELEMENTS);

      return {
        text: `Sur la figure, quel élément est représenté ?`,
        format: "qcm",
        choices: makeChoices(item.name, ["rayon", "diamètre", "disque", "triangle"]),
        expected: [item.name],
        comparator: "mcq_exact",
        explanation: exp(
          "Le vocabulaire du cercle permet de nommer précisément les éléments.",
          "On observe l’élément mis en évidence.",
          `Il s’agit de ${item.definition}.`,
          `La bonne réponse est : ${item.name}.`
        ),
        canvas: item.canvas(),
      };
    },
  },

  // ============================================================
  // FIGURE_PROPRIETE
  // Utiliser les propriétés simples des figures planes
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_figure_propriete_fixed_1_diametre_double_rayon",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Un cercle a un rayon de 4 cm. Quel est son diamètre ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Le diamètre est le double du rayon.",
    explanation: exp(
      "Dans un cercle, le diamètre est deux fois plus long que le rayon.",
      "On multiplie le rayon par 2.",
      "2 × 4 = 8.",
      "Le diamètre mesure 8 cm."
    ),
    tags: ["cm1", "figure_plane", "propriete", "cercle", "diametre", "short", "canvas"],
    canvas: cercleDiametreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_propriete_fixed_2_carre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle propriété est vraie pour un carré ?",
    format: "qcm",
    choices: [
      "Il a quatre côtés égaux et quatre angles droits.",
      "Il a trois côtés.",
      "Il n’a aucun angle droit.",
      "Il est toujours rond.",
    ],
    expected: ["Il a quatre côtés égaux et quatre angles droits."],
    comparator: "mcq_exact",
    hint: "Le carré est très régulier.",
    explanation: exp(
      "Un carré est un quadrilatère particulier.",
      "On vérifie ses côtés et ses angles.",
      "Il possède quatre côtés égaux et quatre angles droits.",
      "La propriété correcte est : quatre côtés égaux et quatre angles droits."
    ),
    tags: ["cm1", "figure_plane", "propriete", "carre", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_propriete_fixed_3_triangle_rectangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle propriété permet de reconnaître un triangle rectangle ?",
    format: "qcm",
    choices: [
      "Il possède un angle droit.",
      "Il possède quatre côtés.",
      "Il possède un diamètre.",
      "Il n’a aucun sommet.",
    ],
    expected: ["Il possède un angle droit."],
    comparator: "mcq_exact",
    hint: "Rectangle fait penser à angle droit.",
    explanation: exp(
      "Un triangle rectangle est un triangle particulier.",
      "On cherche un angle droit.",
      "La figure a un angle droit.",
      "La propriété importante est : il possède un angle droit."
    ),
    tags: ["cm1", "figure_plane", "propriete", "triangle_rectangle", "qcm", "canvas"],
    canvas: triangleRectangleCanvas(),
  },

  {
    kind: "template",
    id: "cm1_figure_propriete_tpl_1_rayon_diametre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Diamètre = 2 × rayon.",
    tags: ["cm1", "figure_plane", "propriete", "cercle", "template", "short", "canvas"],
    generate: () => {
      const rayon = randomInt(2, 9);
      const diametre = 2 * rayon;

      return {
        text: `Un cercle a un rayon de ${rayon} cm. Quel est son diamètre ?`,
        format: "short",
        expected: [String(diametre)],
        comparator: "number_equal",
        explanation: exp(
          "Le diamètre d’un cercle est le double de son rayon.",
          "On multiplie le rayon par 2.",
          `2 × ${rayon} = ${diametre}.`,
          `Le diamètre mesure ${diametre} cm.`
        ),
        canvas: cercleDiametreCanvas(),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_figure_propriete_tpl_2_vrai_faux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise la définition de la figure.",
    tags: ["cm1", "figure_plane", "propriete", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          statement: "Un carré a quatre angles droits.",
          expected: "vrai",
          observation: "Un carré possède quatre angles droits.",
        },
        {
          statement: "Un triangle a toujours quatre côtés.",
          expected: "faux",
          observation: "Un triangle possède trois côtés.",
        },
        {
          statement: "Un diamètre passe par le centre du cercle.",
          expected: "vrai",
          observation: "Un diamètre relie deux points du cercle en passant par le centre.",
        },
        {
          statement: "Un rectangle n’a jamais d’angle droit.",
          expected: "faux",
          observation: "Un rectangle possède justement quatre angles droits.",
        },
        {
          statement: "Un losange a quatre côtés égaux.",
          expected: "vrai",
          observation: "C’est une propriété du losange.",
        },
      ]);

      return {
        text: item.statement,
        format: "qcm",
        choices: ["vrai", "faux"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: exp(
          "Les propriétés permettent de reconnaître les figures.",
          "On vérifie si la phrase correspond à la définition.",
          item.observation,
          `La réponse est ${item.expected}.`
        ),
      };
    },
  },

  // ============================================================
  // FIGURE_CONSTRUIRE
  // Choisir les bonnes informations pour construire une figure
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_figure_construire_fixed_1_cercle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire un cercle, de quoi a-t-on besoin en priorité ?",
    format: "qcm",
    choices: [
      "d’un centre et d’un rayon",
      "de quatre côtés égaux",
      "de trois sommets",
      "de deux angles droits",
    ],
    expected: ["d’un centre et d’un rayon"],
    comparator: "mcq_exact",
    hint: "Un cercle est défini par son centre et sa distance au centre.",
    explanation: exp(
      "Un cercle est l’ensemble des points situés à la même distance d’un centre.",
      "Pour le construire, il faut connaître le centre et le rayon.",
      "Avec le centre O et un rayon, on peut tracer le cercle au compas.",
      "Il faut un centre et un rayon."
    ),
    tags: ["cm1", "figure_plane", "construire", "cercle", "qcm", "canvas"],
    canvas: cercleRayonCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_construire_fixed_2_rectangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire un rectangle, quelle information est indispensable ?",
    format: "qcm",
    choices: [
      "des angles droits",
      "un centre et un rayon",
      "trois côtés seulement",
      "une part de camembert",
    ],
    expected: ["des angles droits"],
    comparator: "mcq_exact",
    hint: "Un rectangle est lié aux angles droits.",
    explanation: exp(
      "Un rectangle est un quadrilatère avec quatre angles droits.",
      "Pour le construire, on doit construire des angles droits.",
      "Les angles droits sont indispensables.",
      "La bonne réponse est : des angles droits."
    ),
    tags: ["cm1", "figure_plane", "construire", "rectangle", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_construire_fixed_3_triangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire un triangle, combien de sommets faut-il placer ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Tri- veut dire trois.",
    explanation: exp(
      "Un triangle est une figure qui possède trois côtés et trois sommets.",
      "Pour le construire, on place trois sommets.",
      "Les sommets sont souvent nommés A, B et C.",
      "Il faut placer 3 sommets."
    ),
    tags: ["cm1", "figure_plane", "construire", "triangle", "short", "canvas"],
    canvas: triangleIsoceleCanvas(),
  },

  {
    kind: "template",
    id: "cm1_figure_construire_tpl_1_outil",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Pense à l’outil adapté à la figure.",
    tags: ["cm1", "figure_plane", "construire", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          figure: "un cercle",
          expected: "un compas",
          wrongs: ["une calculatrice", "un dé", "un tableau"],
          observation: "Pour tracer un cercle, on utilise un compas.",
        },
        {
          figure: "un angle droit",
          expected: "une équerre",
          wrongs: ["un compas seul", "un dé", "une balance"],
          observation: "Pour tracer ou vérifier un angle droit, on utilise une équerre.",
        },
        {
          figure: "un segment de longueur donnée",
          expected: "une règle graduée",
          wrongs: ["une roue", "un verre doseur", "une balance"],
          observation: "Pour mesurer une longueur, on utilise une règle graduée.",
        },
      ]);

      return {
        text: `Quel outil est le plus adapté pour construire ${item.figure} ?`,
        format: "qcm",
        choices: makeChoices(item.expected, item.wrongs),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: exp(
          "Construire une figure demande de choisir le bon outil.",
          "On associe l’outil à la propriété de la figure.",
          item.observation,
          `L’outil adapté est : ${item.expected}.`
        ),
      };
    },
  },

  // ============================================================
  // FIGURE_DEFI
  // Petits défis visuels, concrets et fun
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_figure_defi_fixed_1_maison_quadrillage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Sur le quadrillage, la figure ressemble à une petite maison. Quelle partie forme le toit ?",
    format: "qcm",
    choices: ["un triangle", "un cercle", "un rectangle", "un diamètre"],
    expected: ["un triangle"],
    comparator: "mcq_exact",
    hint: "Le toit a trois côtés.",
    explanation: exp(
      "Un triangle est une figure qui possède trois côtés.",
      "On observe la partie haute de la maison.",
      "Le toit est formé par une partie à trois côtés.",
      "Le toit forme un triangle."
    ),
    tags: ["cm1", "figure_plane", "defi", "maison", "quadrillage", "qcm", "canvas"],
    canvas: maisonGridCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_defi_fixed_2_margouillat_carre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Un margouillat fait le tour d’un carré. Quelle propriété est vraie pour ce carré ?",
    format: "qcm",
    choices: [
      "ses quatre côtés sont égaux",
      "il a trois côtés",
      "il n’a aucun angle droit",
      "il a un rayon",
    ],
    expected: ["ses quatre côtés sont égaux"],
    comparator: "mcq_exact",
    hint: "Un carré est très régulier.",
    explanation: exp(
      "Un carré est un quadrilatère particulier.",
      "On utilise ses propriétés.",
      "Un carré a quatre côtés égaux et quatre angles droits.",
      "La propriété vraie est : ses quatre côtés sont égaux."
    ),
    tags: ["cm1", "figure_plane", "defi", "reunion", "carre", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_defi_fixed_3_volcan_cercle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Autour du volcan, on trace une zone à 5 km du point O. Quelle figure obtient-on si tous les points sont exactement à 5 km de O ?",
    format: "qcm",
    choices: ["un cercle", "un rectangle", "un triangle", "un carré"],
    expected: ["un cercle"],
    comparator: "mcq_exact",
    hint: "Un cercle regroupe tous les points à la même distance du centre.",
    explanation: exp(
      "Un cercle est l’ensemble des points situés à une même distance d’un centre.",
      "On regarde les points exactement à 5 km de O.",
      "Ils sont tous à la même distance du point O.",
      "On obtient un cercle."
    ),
    tags: ["cm1", "figure_plane", "defi", "reunion", "cercle", "qcm", "canvas"],
    canvas: cercleRayonCanvas(),
  },

  {
    kind: "template",
    id: "cm1_figure_defi_tpl_1_qui_suis_je",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Associe les indices à une figure connue.",
    tags: ["cm1", "figure_plane", "defi", "qui_suis_je", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          indices: "J’ai trois côtés et un angle droit.",
          expected: "triangle rectangle",
          wrongs: ["rectangle", "cercle", "losange"],
          observation: "Trois côtés indiquent un triangle ; un angle droit indique triangle rectangle.",
          canvas: triangleRectangleCanvas(),
        },
        {
          indices: "J’ai quatre côtés égaux et quatre angles droits.",
          expected: "carré",
          wrongs: ["triangle", "cercle", "rectangle quelconque"],
          observation: "Quatre côtés égaux et quatre angles droits indiquent un carré.",
          canvas: carreCanvas(),
        },
        {
          indices: "Je suis formé de tous les points à la même distance d’un centre.",
          expected: "cercle",
          wrongs: ["triangle", "rectangle", "losange"],
          observation: "Cette phrase définit un cercle.",
          canvas: cercleRayonCanvas(),
        },
        {
          indices: "J’ai quatre côtés égaux, mais pas forcément quatre angles droits.",
          expected: "losange",
          wrongs: ["cercle", "triangle", "rectangle"],
          observation: "Quatre côtés égaux indiquent un losange.",
          canvas: losangeCanvas(),
        },
      ]);

      return {
        text: `Qui suis-je ? ${item.indices}`,
        format: "qcm",
        choices: makeChoices(item.expected, item.wrongs),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: exp(
          "Un défi de géométrie se résout avec les propriétés des figures.",
          "On lit les indices un par un.",
          item.observation,
          `La bonne réponse est : ${item.expected}.`
        ),
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_figure_defi_open_1_expliquer_carre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi cette figure est un carré.",
    format: "open",
    expected: ["côtés", "égaux", "angles", "droits"],
    comparator: "contains_keyword",
    hint: "Parle des côtés et des angles.",
    explanation: exp(
      "Un carré est un quadrilatère particulier.",
      "Pour justifier, on cite ses propriétés.",
      "La figure a quatre côtés égaux et quatre angles droits.",
      "C’est donc un carré."
    ),
    tags: ["cm1", "figure_plane", "defi", "open", "carre", "canvas"],
    canvas: carreCanvas(),
  },
];