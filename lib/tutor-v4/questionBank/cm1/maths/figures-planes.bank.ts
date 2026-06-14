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

  // ============================================================
  // TOP-UP — FIGURE_TRIANGLE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_figure_triangle_fixed_4_nb_cotes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de côtés possède un triangle ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Tri- veut dire trois.",
    explanation: exp(
      "Un triangle est une figure fermée à trois côtés.",
      "On compte les côtés de la figure.",
      "La figure a bien trois côtés.",
      "Un triangle a 3 côtés."
    ),
    tags: ["cm1", "figure_plane", "triangle", "cotes", "short", "canvas"],
    canvas: triangleIsoceleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_triangle_fixed_5_nb_sommets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de sommets possède un triangle ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Un sommet est un coin de la figure.",
    explanation: exp(
      "Un sommet est un coin où deux côtés se rejoignent.",
      "On compte les coins du triangle.",
      "Le triangle a trois coins.",
      "Un triangle a 3 sommets."
    ),
    tags: ["cm1", "figure_plane", "triangle", "sommets", "short", "canvas"],
    canvas: triangleEquilateralCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_triangle_fixed_6_isocele_def",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle qui a deux côtés de même longueur est un...",
    format: "qcm",
    choices: ["triangle isocèle", "triangle rectangle", "triangle équilatéral", "carré"],
    expected: ["triangle isocèle"],
    comparator: "mcq_exact",
    hint: "Deux côtés égaux seulement.",
    explanation: exp(
      "Un triangle isocèle possède exactement deux côtés de même longueur.",
      "On compte les côtés codés comme égaux.",
      "Deux côtés sont égaux.",
      "C’est un triangle isocèle."
    ),
    tags: ["cm1", "figure_plane", "triangle", "isocele", "qcm", "canvas"],
    canvas: triangleIsoceleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_triangle_fixed_7_nb_angle_droit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d’angles droits possède un triangle rectangle ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Rectangle fait penser à un seul angle droit.",
    explanation: exp(
      "Un triangle rectangle possède un angle droit.",
      "On cherche le petit carré codant l’angle droit.",
      "Il n’y a qu’un seul angle droit.",
      "Un triangle rectangle a 1 angle droit."
    ),
    tags: ["cm1", "figure_plane", "triangle", "rectangle", "short", "canvas"],
    canvas: triangleRectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_triangle_fixed_8_equilateral_def",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle qui a ses trois côtés de même longueur est un...",
    format: "qcm",
    choices: ["triangle équilatéral", "triangle isocèle", "triangle rectangle", "losange"],
    expected: ["triangle équilatéral"],
    comparator: "mcq_exact",
    hint: "Trois côtés égaux.",
    explanation: exp(
      "Un triangle équilatéral a ses trois côtés de même longueur.",
      "On vérifie les marques d’égalité sur les côtés.",
      "Les trois côtés sont codés égaux.",
      "C’est un triangle équilatéral."
    ),
    tags: ["cm1", "figure_plane", "triangle", "equilateral", "qcm", "canvas"],
    canvas: triangleEquilateralCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_triangle_fixed_9_nom_3_cotes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Comment appelle-t-on une figure fermée qui a exactement trois côtés ?",
    format: "qcm",
    choices: ["un triangle", "un carré", "un cercle", "un quadrilatère"],
    expected: ["un triangle"],
    comparator: "mcq_exact",
    hint: "Compte les côtés : trois.",
    explanation: exp(
      "Le nom d’une figure dépend de son nombre de côtés.",
      "On compte les côtés de la figure.",
      "Une figure à trois côtés porte un nom précis.",
      "C’est un triangle."
    ),
    tags: ["cm1", "figure_plane", "triangle", "vocabulaire", "qcm"],
  },

  // ============================================================
  // TOP-UP — FIGURE_QUADRILATERE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_figure_quadrilatere_fixed_4_nb_cotes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de côtés possède un quadrilatère ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Quadri- veut dire quatre.",
    explanation: exp(
      "Un quadrilatère est une figure fermée à quatre côtés.",
      "On compte les côtés de la figure.",
      "La figure a bien quatre côtés.",
      "Un quadrilatère a 4 côtés."
    ),
    tags: ["cm1", "figure_plane", "quadrilatere", "cotes", "short", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_quadrilatere_fixed_5_rectangle_def",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Un quadrilatère qui a quatre angles droits mais des côtés pas tous égaux est un...",
    format: "qcm",
    choices: ["rectangle", "carré", "losange", "triangle"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Quatre angles droits, mais ce n’est pas un carré.",
    explanation: exp(
      "Un rectangle a quatre angles droits ; ses côtés opposés sont égaux.",
      "On vérifie les angles et les côtés.",
      "Les quatre angles sont droits mais les côtés ne sont pas tous égaux.",
      "C’est un rectangle."
    ),
    tags: ["cm1", "figure_plane", "quadrilatere", "rectangle", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_quadrilatere_fixed_6_carre_def",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Un carré est un quadrilatère qui a...",
    format: "qcm",
    choices: [
      "quatre côtés égaux et quatre angles droits",
      "trois côtés égaux",
      "deux côtés seulement",
      "aucun angle droit",
    ],
    expected: ["quatre côtés égaux et quatre angles droits"],
    comparator: "mcq_exact",
    hint: "Le carré est le quadrilatère le plus régulier.",
    explanation: exp(
      "Un carré a quatre côtés égaux et quatre angles droits.",
      "On vérifie côtés et angles.",
      "Tous les côtés sont égaux et tous les angles sont droits.",
      "C’est bien la définition du carré."
    ),
    tags: ["cm1", "figure_plane", "quadrilatere", "carre", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_quadrilatere_fixed_7_nb_angles_droits_rectangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’angles droits possède un rectangle ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Regarde les quatre coins.",
    explanation: exp(
      "Un rectangle possède quatre angles droits.",
      "On compte les coins codés par un petit carré.",
      "Les quatre coins sont des angles droits.",
      "Un rectangle a 4 angles droits."
    ),
    tags: ["cm1", "figure_plane", "quadrilatere", "rectangle", "short", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_quadrilatere_fixed_8_losange_def",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Un quadrilatère qui a quatre côtés égaux mais pas forcément d’angle droit est un...",
    format: "qcm",
    choices: ["losange", "rectangle", "triangle", "cercle"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "Quatre côtés égaux, mais penché.",
    explanation: exp(
      "Un losange a ses quatre côtés égaux.",
      "On observe les marques d’égalité des côtés.",
      "Les quatre côtés sont égaux, sans forcément d’angle droit.",
      "C’est un losange."
    ),
    tags: ["cm1", "figure_plane", "quadrilatere", "losange", "qcm", "canvas"],
    canvas: losangeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_quadrilatere_fixed_9_nom_4_cotes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_quadrilatere",
    difficulty: 1,
    theme: "neutral",
    text: "Comment appelle-t-on une figure fermée qui a exactement quatre côtés ?",
    format: "qcm",
    choices: ["un quadrilatère", "un triangle", "un cercle", "un rayon"],
    expected: ["un quadrilatère"],
    comparator: "mcq_exact",
    hint: "Quadri- veut dire quatre.",
    explanation: exp(
      "Le nom d’une figure dépend de son nombre de côtés.",
      "On compte les côtés de la figure.",
      "Une figure à quatre côtés porte un nom précis.",
      "C’est un quadrilatère."
    ),
    tags: ["cm1", "figure_plane", "quadrilatere", "vocabulaire", "qcm"],
  },

  // ============================================================
  // TOP-UP — FIGURE_CERCLE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_figure_cercle_fixed_4_contour",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 1,
    theme: "neutral",
    text: "Comment appelle-t-on la ligne courbe fermée dont tous les points sont à la même distance du centre ?",
    format: "qcm",
    choices: ["un cercle", "un carré", "un triangle", "un segment"],
    expected: ["un cercle"],
    comparator: "mcq_exact",
    hint: "C’est la forme d’une roue vue de face.",
    explanation: exp(
      "Un cercle est une ligne courbe fermée dont tous les points sont à la même distance du centre.",
      "On observe le contour rond.",
      "Tous ses points sont à la même distance du centre O.",
      "C’est un cercle."
    ),
    tags: ["cm1", "figure_plane", "cercle", "vocabulaire", "qcm", "canvas"],
    canvas: cercleRayonCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_cercle_fixed_5_centre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 1,
    theme: "neutral",
    text: "Le point situé au milieu du cercle, à égale distance de tous ses points, s’appelle...",
    format: "qcm",
    choices: ["le centre", "le rayon", "le diamètre", "le sommet"],
    expected: ["le centre"],
    comparator: "mcq_exact",
    hint: "On le note souvent O.",
    explanation: exp(
      "Le centre d’un cercle est le point à égale distance de tous les points du cercle.",
      "On repère le point marqué O.",
      "C’est le point d’où partent tous les rayons.",
      "Ce point s’appelle le centre."
    ),
    tags: ["cm1", "figure_plane", "cercle", "centre", "qcm", "canvas"],
    canvas: cercleRayonCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_cercle_fixed_6_diametre_double",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "Le diamètre est combien de fois plus long que le rayon ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Le diamètre est formé de deux rayons mis bout à bout.",
    explanation: exp(
      "Le diamètre traverse le cercle en passant par le centre.",
      "On compare le diamètre et le rayon.",
      "Le diamètre est formé de deux rayons.",
      "Le diamètre est 2 fois plus long que le rayon."
    ),
    tags: ["cm1", "figure_plane", "cercle", "diametre", "short", "canvas"],
    canvas: cercleDiametreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_cercle_fixed_7_nb_rayons",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de rayons différents peut-on tracer dans un cercle ?",
    format: "qcm",
    choices: ["une infinité", "un seul", "quatre", "trois"],
    expected: ["une infinité"],
    comparator: "mcq_exact",
    hint: "On peut relier le centre à chaque point du cercle.",
    explanation: exp(
      "Un rayon relie le centre à un point du cercle.",
      "On compte combien de points il y a sur le cercle.",
      "Il y a une infinité de points sur le cercle, donc une infinité de rayons.",
      "On peut tracer une infinité de rayons."
    ),
    tags: ["cm1", "figure_plane", "cercle", "rayon", "qcm", "canvas"],
    canvas: cercleRayonCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_cercle_fixed_8_diametre_passe_centre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "Par quel point passe toujours un diamètre ?",
    format: "qcm",
    choices: ["le centre", "un sommet", "un angle droit", "le bord de la feuille"],
    expected: ["le centre"],
    comparator: "mcq_exact",
    hint: "Le diamètre coupe le cercle en deux moitiés égales.",
    explanation: exp(
      "Un diamètre relie deux points du cercle en passant par le centre.",
      "On suit le segment d’un bord à l’autre.",
      "Il passe par le point O, le centre.",
      "Un diamètre passe toujours par le centre."
    ),
    tags: ["cm1", "figure_plane", "cercle", "diametre", "qcm", "canvas"],
    canvas: cercleDiametreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_cercle_fixed_9_disque_interieur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "La ligne qui fait le tour s’appelle le cercle. Comment appelle-t-on toute la surface à l’intérieur ?",
    format: "qcm",
    choices: ["le disque", "le rayon", "le diamètre", "le centre"],
    expected: ["le disque"],
    comparator: "mcq_exact",
    hint: "Cercle = contour ; intérieur rempli = disque.",
    explanation: exp(
      "Le cercle est le contour ; le disque est la surface intérieure.",
      "On regarde la partie remplie.",
      "Toute la surface intérieure forme le disque.",
      "La surface intérieure s’appelle le disque."
    ),
    tags: ["cm1", "figure_plane", "cercle", "disque", "qcm", "canvas"],
    canvas: disqueCanvas(),
  },

  // ============================================================
  // TOP-UP — FIGURE_PROPRIETE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_figure_propriete_fixed_4_rectangle_cotes_opposes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un rectangle, les côtés opposés sont...",
    format: "qcm",
    choices: ["de même longueur", "tous différents", "courbes", "des rayons"],
    expected: ["de même longueur"],
    comparator: "mcq_exact",
    hint: "Les deux longueurs sont égales, et les deux largeurs aussi.",
    explanation: exp(
      "Dans un rectangle, les côtés opposés sont égaux deux à deux.",
      "On compare les côtés qui se font face.",
      "Les deux longueurs sont égales et les deux largeurs aussi.",
      "Les côtés opposés sont de même longueur."
    ),
    tags: ["cm1", "figure_plane", "propriete", "rectangle", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_propriete_fixed_5_diametre_vers_rayon",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Un cercle a un diamètre de 6 cm. Quel est son rayon ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Le rayon est la moitié du diamètre.",
    explanation: exp(
      "Le rayon est la moitié du diamètre.",
      "On divise le diamètre par 2.",
      "6 ÷ 2 = 3.",
      "Le rayon mesure 3 cm."
    ),
    tags: ["cm1", "figure_plane", "propriete", "cercle", "rayon", "short", "canvas"],
    canvas: cercleDiametreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_propriete_fixed_6_losange_cotes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un losange, les quatre côtés sont...",
    format: "qcm",
    choices: ["égaux", "tous différents", "courbes", "des diamètres"],
    expected: ["égaux"],
    comparator: "mcq_exact",
    hint: "C’est la propriété principale du losange.",
    explanation: exp(
      "Un losange est un quadrilatère à quatre côtés égaux.",
      "On observe les marques d’égalité.",
      "Les quatre côtés portent la même marque.",
      "Dans un losange, les quatre côtés sont égaux."
    ),
    tags: ["cm1", "figure_plane", "propriete", "losange", "qcm", "canvas"],
    canvas: losangeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_propriete_fixed_7_equilateral_cotes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de côtés égaux possède un triangle équilatéral ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Équilatéral veut dire : tous les côtés égaux.",
    explanation: exp(
      "Un triangle équilatéral a tous ses côtés de même longueur.",
      "On compte les côtés codés comme égaux.",
      "Les trois côtés sont égaux.",
      "Un triangle équilatéral a 3 côtés égaux."
    ),
    tags: ["cm1", "figure_plane", "propriete", "equilateral", "short", "canvas"],
    canvas: triangleEquilateralCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_propriete_fixed_8_carre_angles_droits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_propriete",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’angles droits possède un carré ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Regarde les quatre coins.",
    explanation: exp(
      "Un carré possède quatre angles droits.",
      "On compte les coins codés par un petit carré.",
      "Les quatre coins sont des angles droits.",
      "Un carré a 4 angles droits."
    ),
    tags: ["cm1", "figure_plane", "propriete", "carre", "short", "canvas"],
    canvas: carreCanvas(),
  },

  // ============================================================
  // TOP-UP — FIGURE_CONSTRUIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_figure_construire_fixed_4_compas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_construire",
    difficulty: 1,
    theme: "neutral",
    text: "Quel instrument utilise-t-on pour tracer un cercle ?",
    format: "qcm",
    choices: ["un compas", "une équerre", "une balance", "un dé"],
    expected: ["un compas"],
    comparator: "mcq_exact",
    hint: "On l’ouvre selon le rayon voulu.",
    explanation: exp(
      "Le compas sert à tracer des cercles.",
      "On choisit l’outil adapté à la figure ronde.",
      "On pique la pointe sur le centre et on tourne.",
      "On utilise un compas."
    ),
    tags: ["cm1", "figure_plane", "construire", "compas", "qcm", "canvas"],
    canvas: cercleRayonCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_construire_fixed_5_equerre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_construire",
    difficulty: 1,
    theme: "neutral",
    text: "Quel instrument utilise-t-on pour tracer ou vérifier un angle droit ?",
    format: "qcm",
    choices: ["une équerre", "un compas", "une balance", "un verre doseur"],
    expected: ["une équerre"],
    comparator: "mcq_exact",
    hint: "Son coin forme un angle droit.",
    explanation: exp(
      "L’équerre possède un coin en angle droit.",
      "On choisit l’outil adapté à l’angle droit.",
      "On pose le coin de l’équerre sur le sommet.",
      "On utilise une équerre."
    ),
    tags: ["cm1", "figure_plane", "construire", "equerre", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_construire_fixed_6_carre_outils",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Pour tracer un carré de 4 cm de côté, de quels instruments a-t-on besoin ?",
    format: "qcm",
    choices: [
      "une règle et une équerre",
      "un compas seul",
      "une balance",
      "un verre doseur",
    ],
    expected: ["une règle et une équerre"],
    comparator: "mcq_exact",
    hint: "Il faut mesurer les côtés et tracer les angles droits.",
    explanation: exp(
      "Un carré demande des côtés égaux et des angles droits.",
      "On choisit les outils pour mesurer et pour les angles droits.",
      "La règle mesure les côtés, l’équerre trace les angles droits.",
      "Il faut une règle et une équerre."
    ),
    tags: ["cm1", "figure_plane", "construire", "carre", "qcm", "canvas"],
    canvas: carreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_construire_fixed_7_nb_cotes_quadrilatere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_construire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de côtés faut-il tracer pour construire un quadrilatère ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Quadri- veut dire quatre.",
    explanation: exp(
      "Un quadrilatère est une figure à quatre côtés.",
      "On compte les côtés à tracer.",
      "Il faut quatre côtés pour fermer la figure.",
      "On trace 4 côtés."
    ),
    tags: ["cm1", "figure_plane", "construire", "quadrilatere", "short", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_construire_fixed_8_ecartement_compas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Pour tracer un cercle de rayon 3 cm avec un compas, quel écartement donne-t-on au compas, en cm ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "L’écartement du compas est égal au rayon.",
    explanation: exp(
      "L’écartement du compas correspond au rayon du cercle.",
      "On règle l’écartement sur la valeur du rayon.",
      "Le rayon vaut 3 cm, donc l’écartement vaut 3 cm.",
      "On donne un écartement de 3 cm."
    ),
    tags: ["cm1", "figure_plane", "construire", "compas", "rayon", "short", "canvas"],
    canvas: cercleRayonCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_construire_fixed_9_regle_graduee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_construire",
    difficulty: 1,
    theme: "neutral",
    text: "Quel instrument utilise-t-on pour mesurer et tracer un segment d’une longueur donnée ?",
    format: "qcm",
    choices: ["une règle graduée", "un compas", "une balance", "un chronomètre"],
    expected: ["une règle graduée"],
    comparator: "mcq_exact",
    hint: "Elle porte des graduations en cm et mm.",
    explanation: exp(
      "La règle graduée sert à mesurer et à tracer des longueurs.",
      "On choisit l’outil adapté à la mesure d’un segment.",
      "Ses graduations permettent de mesurer en centimètres.",
      "On utilise une règle graduée."
    ),
    tags: ["cm1", "figure_plane", "construire", "regle", "qcm"],
  },

  // ============================================================
  // TOP-UP — FIGURE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_figure_defi_fixed_4_maison_mur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Sur le quadrillage, la partie sous le toit de la maison forme un...",
    format: "qcm",
    choices: ["un rectangle", "un cercle", "un triangle", "un losange"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "Compte ses côtés et ses angles droits.",
    explanation: exp(
      "Un rectangle a quatre côtés et quatre angles droits.",
      "On observe le bas de la maison (les murs).",
      "Cette partie a quatre côtés et quatre angles droits.",
      "Le mur forme un rectangle."
    ),
    tags: ["cm1", "figure_plane", "defi", "maison", "quadrillage", "qcm", "canvas"],
    canvas: maisonGridCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_defi_fixed_5_cerf_volant_losange",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur la plage, un cerf-volant a la forme d’un losange. Combien de côtés a un losange ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Un losange est un quadrilatère.",
    explanation: exp(
      "Un losange est un quadrilatère à quatre côtés égaux.",
      "On compte les côtés du losange.",
      "Le losange a quatre côtés.",
      "Un losange a 4 côtés."
    ),
    tags: ["cm1", "figure_plane", "defi", "reunion", "losange", "short", "canvas"],
    canvas: losangeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_defi_fixed_6_panneau_triangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 2,
    theme: "neutral",
    text: "Un panneau routier de danger a la forme d’un triangle. Combien de côtés a ce panneau ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Tri- veut dire trois.",
    explanation: exp(
      "Un triangle est une figure à trois côtés.",
      "On compte les côtés du panneau.",
      "Le panneau triangulaire a trois côtés.",
      "Ce panneau a 3 côtés."
    ),
    tags: ["cm1", "figure_plane", "defi", "triangle", "short", "canvas"],
    canvas: triangleEquilateralCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_defi_fixed_7_qui_suis_je_rectangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Qui suis-je ? J’ai quatre angles droits, mes côtés opposés sont égaux, mais mes quatre côtés ne sont pas tous égaux.",
    format: "qcm",
    choices: ["un rectangle", "un carré", "un losange", "un triangle"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "Quatre angles droits mais ce n’est pas un carré.",
    explanation: exp(
      "On reconnaît une figure grâce à ses propriétés.",
      "On lit chaque indice : angles droits, côtés opposés égaux.",
      "Quatre angles droits sans côtés tous égaux désignent un rectangle.",
      "Je suis un rectangle."
    ),
    tags: ["cm1", "figure_plane", "defi", "rectangle", "qcm", "canvas"],
    canvas: rectangleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_figure_defi_fixed_8_roue_cercle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "figure_plane",
    microId: "figure_defi",
    difficulty: 2,
    theme: "reunion",
    text: "La roue d’une charrette est ronde. Quelle figure géométrique représente son contour ?",
    format: "qcm",
    choices: ["un cercle", "un carré", "un triangle", "un losange"],
    expected: ["un cercle"],
    comparator: "mcq_exact",
    hint: "Tous les points du bord sont à la même distance du centre.",
    explanation: exp(
      "Un cercle est une ligne courbe fermée dont tous les points sont à la même distance du centre.",
      "On observe le contour de la roue.",
      "Tous les points du bord sont à la même distance du moyeu.",
      "Le contour est un cercle."
    ),
    tags: ["cm1", "figure_plane", "defi", "reunion", "cercle", "qcm", "canvas"],
    canvas: cercleRayonCanvas(),
  },
];