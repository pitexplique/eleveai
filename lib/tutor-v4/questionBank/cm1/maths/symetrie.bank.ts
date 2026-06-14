// lib/tutor-v4/question-banks/maths/cm1/symetrie.bank.ts

import type {
  TutorBankItemV4,
  TransformationCanvasData,
} from "@/lib/tutor-v4/types";

type Pt = { x: number; y: number };

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

function transformationCanvas(
  data: Omit<TransformationCanvasData, "kind">
): TransformationCanvasData {
  return {
    kind: "transformation",
    ...data,
  };
}

function coord(p: Pt) {
  return `(${p.x} ; ${p.y})`;
}

function reflectVertical(p: Pt, axisX: number): Pt {
  return { x: 2 * axisX - p.x, y: p.y };
}

function reflectHorizontal(p: Pt, axisY: number): Pt {
  return { x: p.x, y: 2 * axisY - p.y };
}

function reflectVerticalShape(points: Pt[], axisX: number): Pt[] {
  return points.map((p) => reflectVertical(p, axisX));
}

function reflectHorizontalShape(points: Pt[], axisY: number): Pt[] {
  return points.map((p) => reflectHorizontal(p, axisY));
}

function triangleLeftOfVertical(axisX: number): Pt[] {
  const x1 = randomInt(1, axisX - 2);
  const y1 = randomInt(1, 4);
  return [
    { x: x1, y: y1 },
    { x: x1 + 1, y: y1 + 2 },
    { x: x1 + 2, y: y1 },
  ];
}

function triangleBelowHorizontal(axisY: number): Pt[] {
  const y1 = randomInt(1, axisY - 2);
  const x1 = randomInt(1, 4);
  return [
    { x: x1, y: y1 },
    { x: x1 + 2, y: y1 },
    { x: x1 + 1, y: y1 + 2 },
  ];
}

const BASE_DISPLAY = {
  showGrid: true,
  showLabels: false,
  showPoints: true,
  showDashedLinks: true,
  showTransformationInfo: false,
};

const SOURCE_STYLE = {
  label: "Figure",
  color: "#2563eb",
  fill: "rgba(37, 99, 235, 0.18)",
};

const IMAGE_STYLE = {
  label: "Image",
  color: "#db2777",
  fill: "rgba(219, 39, 119, 0.18)",
};

export const symetrieBank: TutorBankItemV4[] = [
  // ============================================================
  // SYMETRIE_AXE
  // Reconnaître un axe de symétrie
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_symetrie_axe_fixed_1_verticale",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’axe de symétrie entre la figure bleue et la figure rose ?",
    format: "qcm",
    choices: ["la droite x = 4", "la droite y = 4", "la droite x = 2", "la droite y = 2"],
    expected: ["la droite x = 4"],
    comparator: "mcq_exact",
    hint: "L’axe de symétrie est à égale distance des deux figures.",
    explanation: exp(
      "En symétrie axiale, les deux figures sont de part et d’autre d’un axe.",
      "On cherche la droite qui partage les deux figures comme dans un miroir.",
      "La figure rose est l’image miroir de la figure bleue par rapport à la droite verticale x = 4.",
      "L’axe de symétrie est la droite x = 4."
    ),
    tags: ["cm1", "symetrie", "axe", "vertical", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 2 },
        ],
        ...SOURCE_STYLE,
      },
      image: {
        points: [
          { x: 7, y: 2 },
          { x: 6, y: 4 },
          { x: 5, y: 2 },
        ],
        ...IMAGE_STYLE,
      },
      axis: {
        type: "vertical",
        x: 4,
        label: "axe",
      },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_axe_fixed_2_horizontale",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’axe de symétrie entre les deux figures ?",
    format: "qcm",
    choices: ["la droite y = 4", "la droite x = 4", "la droite y = 2", "la droite x = 2"],
    expected: ["la droite y = 4"],
    comparator: "mcq_exact",
    hint: "Regarde si la symétrie se fait de haut en bas ou de gauche à droite.",
    explanation: exp(
      "En symétrie axiale, l’axe peut être vertical ou horizontal.",
      "On regarde si les figures sont au-dessus et au-dessous d’une même droite.",
      "Ici, la figure rose est l’image miroir de la figure bleue par rapport à y = 4.",
      "L’axe de symétrie est la droite y = 4."
    ),
    tags: ["cm1", "symetrie", "axe", "horizontal", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [
          { x: 2, y: 1 },
          { x: 4, y: 1 },
          { x: 3, y: 3 },
        ],
        ...SOURCE_STYLE,
      },
      image: {
        points: [
          { x: 2, y: 7 },
          { x: 4, y: 7 },
          { x: 3, y: 5 },
        ],
        ...IMAGE_STYLE,
      },
      axis: {
        type: "horizontal",
        y: 4,
        label: "axe",
      },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "template",
    id: "cm1_symetrie_axe_tpl_1_vertical_ou_horizontal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 2,
    theme: "neutral",
    hint: "L’axe est à mi-distance entre la figure et son image.",
    tags: ["cm1", "symetrie", "axe", "template", "canvas"],
    generate: () => {
      const mode = randomChoice(["vertical", "horizontal"] as const);

      if (mode === "vertical") {
        const axisX = randomChoice([4, 5]);
        const source = triangleLeftOfVertical(axisX);
        const image = reflectVerticalShape(source, axisX);

        return {
          text: "Quel est l’axe de symétrie entre la figure bleue et la figure rose ?",
          format: "qcm",
          choices: makeChoices(`la droite x = ${axisX}`, [
            `la droite x = ${axisX - 1}`,
            `la droite y = ${axisX}`,
            `la droite y = ${axisX - 1}`,
          ]),
          expected: [`la droite x = ${axisX}`],
          comparator: "mcq_exact",
          explanation: exp(
            "Une symétrie axiale se fait de part et d’autre d’un axe.",
            "On cherche la droite verticale ou horizontale qui partage les deux figures.",
            `Les deux figures sont disposées comme dans un miroir par rapport à la droite x = ${axisX}.`,
            `L’axe de symétrie est la droite x = ${axisX}.`
          ),
          canvas: transformationCanvas({
            transformation: "symetrie_axiale",
            grid: { rows: 8, cols: 8 },
            source: { points: source, ...SOURCE_STYLE },
            image: { points: image, ...IMAGE_STYLE },
            axis: {
              type: "vertical",
              x: axisX,
              label: "axe",
            },
            display: BASE_DISPLAY,
          }),
        };
      }

      const axisY = randomChoice([4, 5]);
      const source = triangleBelowHorizontal(axisY);
      const image = reflectHorizontalShape(source, axisY);

      return {
        text: "Quel est l’axe de symétrie entre la figure bleue et la figure rose ?",
        format: "qcm",
        choices: makeChoices(`la droite y = ${axisY}`, [
          `la droite y = ${axisY - 1}`,
          `la droite x = ${axisY}`,
          `la droite x = ${axisY - 1}`,
        ]),
        expected: [`la droite y = ${axisY}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une symétrie axiale se fait par rapport à une droite.",
          "On cherche la droite qui coupe la figure et son image comme un miroir.",
          `Les figures sont symétriques par rapport à la droite y = ${axisY}.`,
          `L’axe de symétrie est la droite y = ${axisY}.`
        ),
        canvas: transformationCanvas({
          transformation: "symetrie_axiale",
          grid: { rows: 8, cols: 8 },
          source: { points: source, ...SOURCE_STYLE },
          image: { points: image, ...IMAGE_STYLE },
          axis: {
            type: "horizontal",
            y: axisY,
            label: "axe",
          },
          display: BASE_DISPLAY,
        }),
      };
    },
  },

  // ============================================================
  // SYMETRIE_COMPLETER
  // Compléter une figure par symétrie
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_symetrie_completer_fixed_1_abscisse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Le point image du point (2 ; 3) par rapport à la droite x = 4 a la même ordonnée. Quelle est son abscisse ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Le point est à 2 carreaux de l’axe à gauche, donc son image sera à 2 carreaux à droite.",
    explanation: exp(
      "En symétrie axiale verticale, l’ordonnée ne change pas.",
      "On compte la distance entre le point et l’axe, puis on reporte cette distance de l’autre côté.",
      "Le point (2 ; 3) est à 2 carreaux de x = 4. Son image est donc en x = 6.",
      "L’abscisse cherchée est 6."
    ),
    tags: ["cm1", "symetrie", "completer", "abscisse", "short", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [{ x: 2, y: 3 }],
        ...SOURCE_STYLE,
      },
      axis: {
        type: "vertical",
        x: 4,
        label: "axe",
      },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_completer_fixed_2_ordonnee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Le point image du point (5 ; 2) par rapport à la droite y = 4 a la même abscisse. Quelle est son ordonnée ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Le point est à 2 carreaux sous l’axe, donc son image sera à 2 carreaux au-dessus.",
    explanation: exp(
      "En symétrie axiale horizontale, l’abscisse ne change pas.",
      "On reporte la même distance de l’autre côté de l’axe.",
      "Le point (5 ; 2) est à 2 carreaux sous y = 4. Son image est en y = 6.",
      "L’ordonnée cherchée est 6."
    ),
    tags: ["cm1", "symetrie", "completer", "ordonnee", "short", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [{ x: 5, y: 2 }],
        ...SOURCE_STYLE,
      },
      axis: {
        type: "horizontal",
        y: 4,
        label: "axe",
      },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "template",
    id: "cm1_symetrie_completer_tpl_1_abscisse_ou_ordonnee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point image est à la même distance de l’axe que le point de départ.",
    tags: ["cm1", "symetrie", "completer", "template", "canvas"],
    generate: () => {
      const mode = randomChoice(["vertical", "horizontal"] as const);

      if (mode === "vertical") {
        const axisX = randomChoice([4, 5]);
        const x = randomInt(1, axisX - 1);
        const y = randomInt(1, 7);
        const image = reflectVertical({ x, y }, axisX);

        return {
          text: `Le point image du point ${coord({ x, y })} par rapport à la droite x = ${axisX} a la même ordonnée. Quelle est son abscisse ?`,
          format: "short",
          expected: [String(image.x)],
          comparator: "number_equal",
          explanation: exp(
            "En symétrie axiale verticale, seule l’abscisse change.",
            "On compte l’écart à l’axe puis on le reporte de l’autre côté.",
            `Le point ${coord({ x, y })} devient ${coord(image)}.`,
            `L’abscisse cherchée est ${image.x}.`
          ),
          canvas: transformationCanvas({
            transformation: "symetrie_axiale",
            grid: { rows: 8, cols: 8 },
            source: {
              points: [{ x, y }],
              ...SOURCE_STYLE,
            },
            axis: {
              type: "vertical",
              x: axisX,
              label: "axe",
            },
            display: BASE_DISPLAY,
          }),
        };
      }

      const axisY = randomChoice([4, 5]);
      const x = randomInt(1, 7);
      const y = randomInt(1, axisY - 1);
      const image = reflectHorizontal({ x, y }, axisY);

      return {
        text: `Le point image du point ${coord({ x, y })} par rapport à la droite y = ${axisY} a la même abscisse. Quelle est son ordonnée ?`,
        format: "short",
        expected: [String(image.y)],
        comparator: "number_equal",
        explanation: exp(
          "En symétrie axiale horizontale, seule l’ordonnée change.",
          "On reporte de l’autre côté la même distance à l’axe.",
          `Le point ${coord({ x, y })} devient ${coord(image)}.`,
          `L’ordonnée cherchée est ${image.y}.`
        ),
        canvas: transformationCanvas({
          transformation: "symetrie_axiale",
          grid: { rows: 8, cols: 8 },
          source: {
            points: [{ x, y }],
            ...SOURCE_STYLE,
          },
          axis: {
            type: "horizontal",
            y: axisY,
            label: "axe",
          },
          display: BASE_DISPLAY,
        }),
      };
    },
  },

  // ============================================================
  // SYMETRIE_CONSTRUIRE
  // Construire le symétrique d’un point ou d’une figure
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_symetrie_construire_fixed_1_point_vertical",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le symétrique du point (2 ; 3) par rapport à la droite x = 4 ?",
    format: "qcm",
    choices: ["(6 ; 3)", "(4 ; 3)", "(6 ; 5)", "(2 ; 5)"],
    expected: ["(6 ; 3)"],
    comparator: "mcq_exact",
    hint: "L’ordonnée ne change pas avec un axe vertical.",
    explanation: exp(
      "Le symétrique d’un point se trouve de l’autre côté de l’axe, à la même distance.",
      "Avec un axe vertical, on garde la même ordonnée.",
      "Le point (2 ; 3) est à 2 unités de x = 4, donc son image est (6 ; 3).",
      "Le symétrique est (6 ; 3)."
    ),
    tags: ["cm1", "symetrie", "construire", "point", "vertical", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [{ x: 2, y: 3 }],
        ...SOURCE_STYLE,
      },
      axis: {
        type: "vertical",
        x: 4,
        label: "axe",
      },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_construire_fixed_2_point_horizontal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le symétrique du point (5 ; 2) par rapport à la droite y = 4 ?",
    format: "qcm",
    choices: ["(5 ; 6)", "(3 ; 2)", "(5 ; 4)", "(7 ; 6)"],
    expected: ["(5 ; 6)"],
    comparator: "mcq_exact",
    hint: "L’abscisse ne change pas avec un axe horizontal.",
    explanation: exp(
      "Le symétrique d’un point se place en miroir par rapport à l’axe.",
      "Avec un axe horizontal, on garde la même abscisse.",
      "Le point (5 ; 2) est à 2 unités de y = 4, donc son image est (5 ; 6).",
      "Le symétrique est (5 ; 6)."
    ),
    tags: ["cm1", "symetrie", "construire", "point", "horizontal", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [{ x: 5, y: 2 }],
        ...SOURCE_STYLE,
      },
      axis: {
        type: "horizontal",
        y: 4,
        label: "axe",
      },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "template",
    id: "cm1_symetrie_construire_tpl_1_point",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère la distance entre le point et l’axe.",
    tags: ["cm1", "symetrie", "construire", "template", "point", "canvas"],
    generate: () => {
      const mode = randomChoice(["vertical", "horizontal"] as const);

      if (mode === "vertical") {
        const axisX = randomChoice([4, 5]);
        const p = {
          x: randomInt(1, axisX - 1),
          y: randomInt(1, 7),
        };
        const image = reflectVertical(p, axisX);

        return {
          text: `Quel est le symétrique du point ${coord(p)} par rapport à la droite x = ${axisX} ?`,
          format: "qcm",
          choices: makeChoices(coord(image), [
            coord({ x: axisX, y: p.y }),
            coord({ x: image.x, y: p.y + 1 <= 8 ? p.y + 1 : p.y - 1 }),
            coord({ x: p.x, y: p.y }),
          ]),
          expected: [coord(image)],
          comparator: "mcq_exact",
          explanation: exp(
            "Le symétrique d’un point se place de l’autre côté de l’axe, à même distance.",
            "Avec un axe vertical, l’ordonnée reste la même.",
            `${coord(p)} devient ${coord(image)}.`,
            `Le symétrique est ${coord(image)}.`
          ),
          canvas: transformationCanvas({
            transformation: "symetrie_axiale",
            grid: { rows: 8, cols: 8 },
            source: {
              points: [p],
              ...SOURCE_STYLE,
            },
            axis: {
              type: "vertical",
              x: axisX,
              label: "axe",
            },
            display: BASE_DISPLAY,
          }),
        };
      }

      const axisY = randomChoice([4, 5]);
      const p = {
        x: randomInt(1, 7),
        y: randomInt(1, axisY - 1),
      };
      const image = reflectHorizontal(p, axisY);

      return {
        text: `Quel est le symétrique du point ${coord(p)} par rapport à la droite y = ${axisY} ?`,
        format: "qcm",
        choices: makeChoices(coord(image), [
          coord({ x: p.x, y: axisY }),
          coord({ x: p.x + 1 <= 8 ? p.x + 1 : p.x - 1, y: image.y }),
          coord({ x: p.x, y: p.y }),
        ]),
        expected: [coord(image)],
        comparator: "mcq_exact",
        explanation: exp(
          "En symétrie axiale, le point image est en miroir par rapport à l’axe.",
          "Avec un axe horizontal, l’abscisse reste la même.",
          `${coord(p)} devient ${coord(image)}.`,
          `Le symétrique est ${coord(image)}.`
        ),
        canvas: transformationCanvas({
          transformation: "symetrie_axiale",
          grid: { rows: 8, cols: 8 },
          source: {
            points: [p],
            ...SOURCE_STYLE,
          },
          axis: {
            type: "horizontal",
            y: axisY,
            label: "axe",
          },
          display: BASE_DISPLAY,
        }),
      };
    },
  },

  // ============================================================
  // SYMETRIE_PROPRIETE
  // Utiliser les propriétés simples de la symétrie
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_symetrie_propriete_fixed_1_verticale_ordonnee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une symétrie par rapport à une droite verticale, que garde le point image ?",
    format: "qcm",
    choices: ["la même ordonnée", "la même abscisse", "toujours les deux", "aucune coordonnée"],
    expected: ["la même ordonnée"],
    comparator: "mcq_exact",
    hint: "Avec une droite verticale, le point se déplace seulement de gauche à droite.",
    explanation: exp(
      "Avec un axe vertical, le point glisse horizontalement en miroir.",
      "On regarde ce qui change et ce qui ne change pas.",
      "L’ordonnée reste la même, seule l’abscisse change.",
      "Le point image garde la même ordonnée."
    ),
    tags: ["cm1", "symetrie", "propriete", "verticale", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_propriete_fixed_2_horizontale_abscisse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une symétrie par rapport à une droite horizontale, que garde le point image ?",
    format: "qcm",
    choices: ["la même abscisse", "la même ordonnée", "toujours les deux", "aucune coordonnée"],
    expected: ["la même abscisse"],
    comparator: "mcq_exact",
    hint: "Avec une droite horizontale, le point se déplace seulement de bas en haut.",
    explanation: exp(
      "Avec un axe horizontal, le point se déplace verticalement en miroir.",
      "On observe la coordonnée qui reste identique.",
      "L’abscisse reste la même, seule l’ordonnée change.",
      "Le point image garde la même abscisse."
    ),
    tags: ["cm1", "symetrie", "propriete", "horizontale", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_propriete_fixed_3_point_sur_axe",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Que devient un point placé sur l’axe de symétrie ?",
    format: "qcm",
    choices: [
      "il reste au même endroit",
      "il change toujours d’abscisse",
      "il change toujours d’ordonnée",
      "il disparaît",
    ],
    expected: ["il reste au même endroit"],
    comparator: "mcq_exact",
    hint: "Un point sur l’axe est déjà sur la ligne miroir.",
    explanation: exp(
      "Un point placé sur l’axe est confondu avec son image.",
      "Comme il est déjà sur la ligne miroir, il ne bouge pas.",
      "Il est à distance 0 de l’axe.",
      "Le point reste au même endroit."
    ),
    tags: ["cm1", "symetrie", "propriete", "axe", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_symetrie_propriete_tpl_1_vrai_ou_faux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Souviens-toi : axe vertical → même ordonnée ; axe horizontal → même abscisse.",
    tags: ["cm1", "symetrie", "propriete", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Dans une symétrie par rapport à une droite verticale, le point image garde la même ordonnée.",
          expected: "vrai",
          observation: "Avec un axe vertical, l’ordonnée ne change pas.",
        },
        {
          text: "Dans une symétrie par rapport à une droite horizontale, le point image garde la même abscisse.",
          expected: "vrai",
          observation: "Avec un axe horizontal, l’abscisse ne change pas.",
        },
        {
          text: "Un point situé sur l’axe de symétrie change de place.",
          expected: "faux",
          observation: "Un point sur l’axe reste sur lui-même.",
        },
        {
          text: "Dans une symétrie par rapport à une droite verticale, le point image garde la même abscisse.",
          expected: "faux",
          observation: "Avec un axe vertical, c’est l’ordonnée qui reste la même.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["vrai", "faux"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: exp(
          "La symétrie axiale conserve certaines propriétés simples.",
          "On identifie le type d’axe de symétrie.",
          item.observation,
          `La bonne réponse est ${item.expected}.`
        ),
      };
    },
  },

  // ============================================================
  // SYMETRIE_DEFI
  // Défis simples sur la symétrie
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_symetrie_defi_fixed_1_triangle_image",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Le triangle a pour sommets (1 ; 2), (2 ; 4) et (3 ; 2). Par rapport à la droite x = 4, quel est le sommet image de (1 ; 2) ?",
    format: "qcm",
    choices: ["(7 ; 2)", "(6 ; 2)", "(7 ; 4)", "(1 ; 2)"],
    expected: ["(7 ; 2)"],
    comparator: "mcq_exact",
    hint: "Le point image doit être à la même distance de l’axe.",
    explanation: exp(
      "Dans un défi de symétrie, on applique la règle du miroir.",
      "On conserve l’ordonnée et on reporte la distance à l’axe.",
      "Le point (1 ; 2) est à 3 unités de x = 4, donc son image est (7 ; 2).",
      "Le sommet image est (7 ; 2)."
    ),
    tags: ["cm1", "symetrie", "defi", "triangle", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 2 },
        ],
        ...SOURCE_STYLE,
      },
      axis: {
        type: "vertical",
        x: 4,
        label: "axe",
      },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_defi_fixed_2_point_sur_axe",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Le point (4 ; 5) est sur la droite x = 4. Quel est son symétrique par rapport à cette droite ?",
    format: "qcm",
    choices: ["(4 ; 5)", "(5 ; 5)", "(3 ; 5)", "(4 ; 3)"],
    expected: ["(4 ; 5)"],
    comparator: "mcq_exact",
    hint: "Un point sur l’axe ne bouge pas.",
    explanation: exp(
      "Un point sur l’axe de symétrie est confondu avec son image.",
      "On vérifie si le point est sur l’axe.",
      "Le point (4 ; 5) a bien pour abscisse 4, donc il est sur la droite x = 4.",
      "Son symétrique est lui-même : (4 ; 5)."
    ),
    tags: ["cm1", "symetrie", "defi", "axe", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [{ x: 4, y: 5 }],
        ...SOURCE_STYLE,
      },
      axis: {
        type: "vertical",
        x: 4,
        label: "axe",
      },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "template",
    id: "cm1_symetrie_defi_tpl_1_point_image",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par repérer si l’axe est vertical ou horizontal.",
    tags: ["cm1", "symetrie", "defi", "template", "point", "canvas"],
    generate: () => {
      const mode = randomChoice(["vertical", "horizontal"] as const);

      if (mode === "vertical") {
        const axisX = randomChoice([4, 5]);
        const p = { x: randomInt(1, axisX - 1), y: randomInt(1, 7) };
        const image = reflectVertical(p, axisX);

        return {
          text: `Par rapport à la droite x = ${axisX}, quel est le symétrique du point ${coord(p)} ?`,
          format: "qcm",
          choices: makeChoices(coord(image), [
            coord({ x: p.x, y: p.y }),
            coord({ x: axisX, y: p.y }),
            coord({ x: image.x, y: p.y + 1 <= 8 ? p.y + 1 : p.y - 1 }),
          ]),
          expected: [coord(image)],
          comparator: "mcq_exact",
          explanation: exp(
            "Le point image est en miroir par rapport à l’axe.",
            "Avec un axe vertical, on garde la même ordonnée.",
            `${coord(p)} devient ${coord(image)}.`,
            `Le symétrique est ${coord(image)}.`
          ),
          canvas: transformationCanvas({
            transformation: "symetrie_axiale",
            grid: { rows: 8, cols: 8 },
            source: { points: [p], ...SOURCE_STYLE },
            axis: {
              type: "vertical",
              x: axisX,
              label: "axe",
            },
            display: BASE_DISPLAY,
          }),
        };
      }

      const axisY = randomChoice([4, 5]);
      const p = { x: randomInt(1, 7), y: randomInt(1, axisY - 1) };
      const image = reflectHorizontal(p, axisY);

      return {
        text: `Par rapport à la droite y = ${axisY}, quel est le symétrique du point ${coord(p)} ?`,
        format: "qcm",
        choices: makeChoices(coord(image), [
          coord({ x: p.x, y: p.y }),
          coord({ x: p.x, y: axisY }),
          coord({ x: p.x + 1 <= 8 ? p.x + 1 : p.x - 1, y: image.y }),
        ]),
        expected: [coord(image)],
        comparator: "mcq_exact",
        explanation: exp(
          "Le point image se place à la même distance de l’axe.",
          "Avec un axe horizontal, l’abscisse ne change pas.",
          `${coord(p)} devient ${coord(image)}.`,
          `Le symétrique est ${coord(image)}.`
        ),
        canvas: transformationCanvas({
          transformation: "symetrie_axiale",
          grid: { rows: 8, cols: 8 },
          source: { points: [p], ...SOURCE_STYLE },
          axis: {
            type: "horizontal",
            y: axisY,
            label: "axe",
          },
          display: BASE_DISPLAY,
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_defi_open_1_expliquer_axe",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi un point placé sur l’axe de symétrie ne change pas de place.",
    format: "open",
    expected: ["axe", "même", "point"],
    comparator: "contains_keyword",
    hint: "Pense au miroir : le point est déjà sur la ligne miroir.",
    explanation: exp(
      "Un point sur l’axe est confondu avec son image.",
      "Il est à distance 0 de l’axe, donc il n’y a rien à reporter de l’autre côté.",
      "Il reste exactement au même endroit.",
      "Un point placé sur l’axe ne change pas de place."
    ),
    tags: ["cm1", "symetrie", "defi", "open"],
  },

  // ============================================================
  // TOP-UP — SYMETRIE_AXE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_symetrie_axe_fixed_3_verticale_x3",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’axe de symétrie entre la figure bleue et la figure rose ?",
    format: "qcm",
    choices: ["la droite x = 3", "la droite y = 3", "la droite x = 2", "la droite y = 4"],
    expected: ["la droite x = 3"],
    comparator: "mcq_exact",
    hint: "L’axe est à mi-distance entre les deux figures.",
    explanation: exp(
      "En symétrie axiale, les deux figures sont de part et d’autre d’un axe.",
      "On cherche la droite verticale qui les sépare comme un miroir.",
      "La figure rose est l’image miroir de la figure bleue par rapport à x = 3.",
      "L’axe de symétrie est la droite x = 3."
    ),
    tags: ["cm1", "symetrie", "axe", "vertical", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 2, y: 2 },
        ],
        ...SOURCE_STYLE,
      },
      image: {
        points: [
          { x: 5, y: 2 },
          { x: 4, y: 4 },
          { x: 4, y: 2 },
        ],
        ...IMAGE_STYLE,
      },
      axis: { type: "vertical", x: 3, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_axe_fixed_4_horizontale_y5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’axe de symétrie entre les deux figures ?",
    format: "qcm",
    choices: ["la droite y = 5", "la droite y = 4", "la droite x = 5", "la droite x = 3"],
    expected: ["la droite y = 5"],
    comparator: "mcq_exact",
    hint: "Regarde si la symétrie se fait de haut en bas ou de gauche à droite.",
    explanation: exp(
      "L’axe d’une symétrie peut être vertical ou horizontal.",
      "On regarde si les figures sont au-dessus et au-dessous d’une même droite.",
      "Ici, la figure rose est l’image miroir de la figure bleue par rapport à y = 5.",
      "L’axe de symétrie est la droite y = 5."
    ),
    tags: ["cm1", "symetrie", "axe", "horizontal", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [
          { x: 2, y: 2 },
          { x: 4, y: 2 },
          { x: 3, y: 4 },
        ],
        ...SOURCE_STYLE,
      },
      image: {
        points: [
          { x: 2, y: 8 },
          { x: 4, y: 8 },
          { x: 3, y: 6 },
        ],
        ...IMAGE_STYLE,
      },
      axis: { type: "horizontal", y: 5, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_axe_fixed_5_verticale_x5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’axe de symétrie entre la figure bleue et la figure rose ?",
    format: "qcm",
    choices: ["la droite x = 5", "la droite x = 4", "la droite y = 5", "la droite y = 4"],
    expected: ["la droite x = 5"],
    comparator: "mcq_exact",
    hint: "L’axe est à égale distance des deux figures.",
    explanation: exp(
      "En symétrie axiale, les deux figures se répondent de part et d’autre de l’axe.",
      "On cherche la droite verticale qui joue le rôle de miroir.",
      "La figure rose est l’image de la figure bleue par rapport à x = 5.",
      "L’axe de symétrie est la droite x = 5."
    ),
    tags: ["cm1", "symetrie", "axe", "vertical", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [
          { x: 2, y: 2 },
          { x: 4, y: 4 },
          { x: 2, y: 6 },
        ],
        ...SOURCE_STYLE,
      },
      image: {
        points: [
          { x: 8, y: 2 },
          { x: 6, y: 4 },
          { x: 8, y: 6 },
        ],
        ...IMAGE_STYLE,
      },
      axis: { type: "vertical", x: 5, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_axe_fixed_6_concept",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 1,
    theme: "neutral",
    text: "Une figure et son image par symétrie sont placées comme dans un miroir. Qu’est-ce qui les sépare ?",
    format: "qcm",
    choices: ["un axe de symétrie", "un sommet", "un cercle", "un angle droit"],
    expected: ["un axe de symétrie"],
    comparator: "mcq_exact",
    hint: "C’est la ligne qui sert de miroir.",
    explanation: exp(
      "Une symétrie axiale se fait toujours par rapport à une droite.",
      "On cherche le nom de la ligne qui sert de miroir.",
      "C’est cette droite qui sépare la figure de son image.",
      "Les deux figures sont séparées par un axe de symétrie."
    ),
    tags: ["cm1", "symetrie", "axe", "concept", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_axe_fixed_7_horizontale_y3",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est l’axe de symétrie entre les deux figures ?",
    format: "qcm",
    choices: ["la droite y = 3", "la droite y = 4", "la droite x = 3", "la droite y = 2"],
    expected: ["la droite y = 3"],
    comparator: "mcq_exact",
    hint: "Compte les carreaux entre chaque figure et l’axe.",
    explanation: exp(
      "L’axe est à mi-distance entre la figure et son image.",
      "On regarde la droite horizontale qui partage les deux figures.",
      "La figure rose est l’image de la figure bleue par rapport à y = 3.",
      "L’axe de symétrie est la droite y = 3."
    ),
    tags: ["cm1", "symetrie", "axe", "horizontal", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [
          { x: 2, y: 1 },
          { x: 4, y: 1 },
          { x: 3, y: 2 },
        ],
        ...SOURCE_STYLE,
      },
      image: {
        points: [
          { x: 2, y: 5 },
          { x: 4, y: 5 },
          { x: 3, y: 4 },
        ],
        ...IMAGE_STYLE,
      },
      axis: { type: "horizontal", y: 3, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_axe_fixed_8_verticale_x4",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est l’axe de symétrie entre la figure bleue et la figure rose ?",
    format: "qcm",
    choices: ["la droite x = 4", "la droite x = 5", "la droite y = 4", "la droite x = 3"],
    expected: ["la droite x = 4"],
    comparator: "mcq_exact",
    hint: "L’axe passe à mi-chemin entre les deux figures.",
    explanation: exp(
      "En symétrie axiale, l’axe est au milieu de la figure et de son image.",
      "On repère la droite verticale qui sépare les deux figures.",
      "La figure rose est l’image de la figure bleue par rapport à x = 4.",
      "L’axe de symétrie est la droite x = 4."
    ),
    tags: ["cm1", "symetrie", "axe", "vertical", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [
          { x: 1, y: 1 },
          { x: 3, y: 3 },
          { x: 1, y: 5 },
        ],
        ...SOURCE_STYLE,
      },
      image: {
        points: [
          { x: 7, y: 1 },
          { x: 5, y: 3 },
          { x: 7, y: 5 },
        ],
        ...IMAGE_STYLE,
      },
      axis: { type: "vertical", x: 4, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "template",
    id: "cm1_symetrie_axe_tpl_2_vertical_ou_horizontal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 3,
    theme: "neutral",
    hint: "Vertical = de gauche à droite ; horizontal = de haut en bas.",
    tags: ["cm1", "symetrie", "axe", "template", "qcm", "canvas"],
    generate: () => {
      const mode = randomChoice(["vertical", "horizontal"] as const);

      if (mode === "vertical") {
        const axisX = randomChoice([4, 5]);
        const source = triangleLeftOfVertical(axisX);
        const image = reflectVerticalShape(source, axisX);

        return {
          text: "L’axe de symétrie entre ces deux figures est-il vertical ou horizontal ?",
          format: "qcm",
          choices: ["vertical", "horizontal"],
          expected: ["vertical"],
          comparator: "mcq_exact",
          explanation: exp(
            "Un axe de symétrie peut être une droite verticale ou horizontale.",
            "On regarde si les figures se répondent de gauche à droite ou de haut en bas.",
            "Ici, les deux figures se font face de part et d’autre d’une droite verticale.",
            "L’axe de symétrie est vertical."
          ),
          canvas: transformationCanvas({
            transformation: "symetrie_axiale",
            grid: { rows: 8, cols: 8 },
            source: { points: source, ...SOURCE_STYLE },
            image: { points: image, ...IMAGE_STYLE },
            axis: { type: "vertical", x: axisX, label: "axe" },
            display: BASE_DISPLAY,
          }),
        };
      }

      const axisY = randomChoice([4, 5]);
      const source = triangleBelowHorizontal(axisY);
      const image = reflectHorizontalShape(source, axisY);

      return {
        text: "L’axe de symétrie entre ces deux figures est-il vertical ou horizontal ?",
        format: "qcm",
        choices: ["vertical", "horizontal"],
        expected: ["horizontal"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un axe de symétrie peut être une droite verticale ou horizontale.",
          "On regarde le sens dans lequel les figures se répondent.",
          "Ici, les deux figures se répondent de haut en bas, autour d’une droite horizontale.",
          "L’axe de symétrie est horizontal."
        ),
        canvas: transformationCanvas({
          transformation: "symetrie_axiale",
          grid: { rows: 8, cols: 8 },
          source: { points: source, ...SOURCE_STYLE },
          image: { points: image, ...IMAGE_STYLE },
          axis: { type: "horizontal", y: axisY, label: "axe" },
          display: BASE_DISPLAY,
        }),
      };
    },
  },

  // ============================================================
  // TOP-UP — SYMETRIE_COMPLETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_symetrie_completer_fixed_3_abscisse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Le point image du point (1 ; 5) par rapport à la droite x = 4 a la même ordonnée. Quelle est son abscisse ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Le point est à 3 carreaux à gauche de l’axe.",
    explanation: exp(
      "En symétrie axiale verticale, l’ordonnée ne change pas.",
      "On compte la distance à l’axe puis on la reporte de l’autre côté.",
      "Le point (1 ; 5) est à 3 carreaux de x = 4, donc son image est en x = 7.",
      "L’abscisse cherchée est 7."
    ),
    tags: ["cm1", "symetrie", "completer", "abscisse", "short", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: { points: [{ x: 1, y: 5 }], ...SOURCE_STYLE },
      axis: { type: "vertical", x: 4, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_completer_fixed_4_ordonnee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Le point image du point (3 ; 1) par rapport à la droite y = 4 a la même abscisse. Quelle est son ordonnée ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Le point est à 3 carreaux sous l’axe.",
    explanation: exp(
      "En symétrie axiale horizontale, l’abscisse ne change pas.",
      "On reporte la même distance de l’autre côté de l’axe.",
      "Le point (3 ; 1) est à 3 carreaux sous y = 4, donc son image est en y = 7.",
      "L’ordonnée cherchée est 7."
    ),
    tags: ["cm1", "symetrie", "completer", "ordonnee", "short", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: { points: [{ x: 3, y: 1 }], ...SOURCE_STYLE },
      axis: { type: "horizontal", y: 4, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_completer_fixed_5_abscisse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Le point image du point (2 ; 6) par rapport à la droite x = 5 a la même ordonnée. Quelle est son abscisse ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Compte les carreaux entre le point et l’axe.",
    explanation: exp(
      "En symétrie axiale verticale, seule l’abscisse change.",
      "On reporte la distance à l’axe de l’autre côté.",
      "Le point (2 ; 6) est à 3 carreaux de x = 5, donc son image est en x = 8.",
      "L’abscisse cherchée est 8."
    ),
    tags: ["cm1", "symetrie", "completer", "abscisse", "short", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: { points: [{ x: 2, y: 6 }], ...SOURCE_STYLE },
      axis: { type: "vertical", x: 5, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_completer_fixed_6_ordonnee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Le point image du point (2 ; 2) par rapport à la droite y = 5 a la même abscisse. Quelle est son ordonnée ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Le point est à 3 carreaux sous l’axe.",
    explanation: exp(
      "En symétrie axiale horizontale, seule l’ordonnée change.",
      "On reporte la même distance au-dessus de l’axe.",
      "Le point (2 ; 2) est à 3 carreaux sous y = 5, donc son image est en y = 8.",
      "L’ordonnée cherchée est 8."
    ),
    tags: ["cm1", "symetrie", "completer", "ordonnee", "short", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: { points: [{ x: 2, y: 2 }], ...SOURCE_STYLE },
      axis: { type: "horizontal", y: 5, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_completer_fixed_7_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Un point est à 3 carreaux à gauche d’un axe vertical. Son image est à combien de carreaux à droite de l’axe ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Le point et son image sont à la même distance de l’axe.",
    explanation: exp(
      "En symétrie axiale, le point et son image sont à la même distance de l’axe.",
      "On reporte simplement la même distance de l’autre côté.",
      "3 carreaux à gauche donnent 3 carreaux à droite.",
      "L’image est à 3 carreaux à droite de l’axe."
    ),
    tags: ["cm1", "symetrie", "completer", "distance", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_completer_fixed_8_abscisse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Le point image du point (3 ; 4) par rapport à la droite x = 5 a la même ordonnée. Quelle est son abscisse ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Compte les carreaux entre le point et l’axe.",
    explanation: exp(
      "En symétrie axiale verticale, l’ordonnée reste la même.",
      "On reporte la distance à l’axe de l’autre côté.",
      "Le point (3 ; 4) est à 2 carreaux de x = 5, donc son image est en x = 7.",
      "L’abscisse cherchée est 7."
    ),
    tags: ["cm1", "symetrie", "completer", "abscisse", "short", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: { points: [{ x: 3, y: 4 }], ...SOURCE_STYLE },
      axis: { type: "vertical", x: 5, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "template",
    id: "cm1_symetrie_completer_tpl_2_distance_doublee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point et son image sont à la même distance de l’axe, de part et d’autre.",
    tags: ["cm1", "symetrie", "completer", "template", "distance", "short"],
    generate: () => {
      const axisX = randomChoice([4, 5]);
      const x = randomInt(1, axisX - 1);
      const distance = axisX - x;

      return {
        text: `Un point est à ${distance} carreau${distance > 1 ? "x" : ""} à gauche de l’axe. Combien de carreaux séparent ce point de son image ?`,
        format: "short",
        expected: [String(distance * 2)],
        comparator: "number_equal",
        explanation: exp(
          "Le point et son image sont à la même distance de l’axe, chacun d’un côté.",
          "On additionne la distance à gauche et la distance à droite.",
          `${distance} carreaux à gauche et ${distance} carreaux à droite font ${distance * 2} carreaux.`,
          `Le point et son image sont séparés de ${distance * 2} carreaux.`
        ),
      };
    },
  },

  // ============================================================
  // TOP-UP — SYMETRIE_CONSTRUIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_symetrie_construire_fixed_3_point_vertical",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le symétrique du point (1 ; 5) par rapport à la droite x = 4 ?",
    format: "qcm",
    choices: ["(7 ; 5)", "(5 ; 5)", "(7 ; 3)", "(1 ; 5)"],
    expected: ["(7 ; 5)"],
    comparator: "mcq_exact",
    hint: "L’ordonnée ne change pas avec un axe vertical.",
    explanation: exp(
      "Le symétrique d’un point se place de l’autre côté de l’axe, à la même distance.",
      "Avec un axe vertical, on garde la même ordonnée.",
      "Le point (1 ; 5) est à 3 unités de x = 4, donc son image est (7 ; 5).",
      "Le symétrique est (7 ; 5)."
    ),
    tags: ["cm1", "symetrie", "construire", "point", "vertical", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: { points: [{ x: 1, y: 5 }], ...SOURCE_STYLE },
      axis: { type: "vertical", x: 4, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_construire_fixed_4_point_horizontal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le symétrique du point (3 ; 1) par rapport à la droite y = 4 ?",
    format: "qcm",
    choices: ["(3 ; 7)", "(3 ; 5)", "(5 ; 7)", "(3 ; 1)"],
    expected: ["(3 ; 7)"],
    comparator: "mcq_exact",
    hint: "L’abscisse ne change pas avec un axe horizontal.",
    explanation: exp(
      "Le symétrique d’un point se place en miroir par rapport à l’axe.",
      "Avec un axe horizontal, on garde la même abscisse.",
      "Le point (3 ; 1) est à 3 unités de y = 4, donc son image est (3 ; 7).",
      "Le symétrique est (3 ; 7)."
    ),
    tags: ["cm1", "symetrie", "construire", "point", "horizontal", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: { points: [{ x: 3, y: 1 }], ...SOURCE_STYLE },
      axis: { type: "horizontal", y: 4, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_construire_fixed_5_point_vertical",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le symétrique du point (3 ; 6) par rapport à la droite x = 5 ?",
    format: "qcm",
    choices: ["(7 ; 6)", "(5 ; 6)", "(7 ; 4)", "(3 ; 6)"],
    expected: ["(7 ; 6)"],
    comparator: "mcq_exact",
    hint: "Compte les carreaux entre le point et l’axe.",
    explanation: exp(
      "Le symétrique se trouve de l’autre côté de l’axe, à même distance.",
      "Avec un axe vertical, l’ordonnée reste la même.",
      "Le point (3 ; 6) est à 2 unités de x = 5, donc son image est (7 ; 6).",
      "Le symétrique est (7 ; 6)."
    ),
    tags: ["cm1", "symetrie", "construire", "point", "vertical", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: { points: [{ x: 3, y: 6 }], ...SOURCE_STYLE },
      axis: { type: "vertical", x: 5, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_construire_fixed_6_point_horizontal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le symétrique du point (6 ; 2) par rapport à la droite y = 5 ?",
    format: "qcm",
    choices: ["(6 ; 8)", "(6 ; 5)", "(4 ; 8)", "(6 ; 2)"],
    expected: ["(6 ; 8)"],
    comparator: "mcq_exact",
    hint: "L’abscisse ne change pas avec un axe horizontal.",
    explanation: exp(
      "Le symétrique se place en miroir par rapport à l’axe.",
      "Avec un axe horizontal, l’abscisse reste la même.",
      "Le point (6 ; 2) est à 3 unités de y = 5, donc son image est (6 ; 8).",
      "Le symétrique est (6 ; 8)."
    ),
    tags: ["cm1", "symetrie", "construire", "point", "horizontal", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: { points: [{ x: 6, y: 2 }], ...SOURCE_STYLE },
      axis: { type: "horizontal", y: 5, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_construire_fixed_7_point_vertical",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le symétrique du point (1 ; 1) par rapport à la droite x = 3 ?",
    format: "qcm",
    choices: ["(5 ; 1)", "(3 ; 1)", "(5 ; 3)", "(1 ; 1)"],
    expected: ["(5 ; 1)"],
    comparator: "mcq_exact",
    hint: "L’ordonnée ne change pas avec un axe vertical.",
    explanation: exp(
      "Le symétrique se place de l’autre côté de l’axe, à même distance.",
      "Avec un axe vertical, on garde la même ordonnée.",
      "Le point (1 ; 1) est à 2 unités de x = 3, donc son image est (5 ; 1).",
      "Le symétrique est (5 ; 1)."
    ),
    tags: ["cm1", "symetrie", "construire", "point", "vertical", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: { points: [{ x: 1, y: 1 }], ...SOURCE_STYLE },
      axis: { type: "vertical", x: 3, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_construire_fixed_8_point_vertical",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est le symétrique du point (2 ; 7) par rapport à la droite x = 5 ?",
    format: "qcm",
    choices: ["(8 ; 7)", "(6 ; 7)", "(8 ; 5)", "(2 ; 7)"],
    expected: ["(8 ; 7)"],
    comparator: "mcq_exact",
    hint: "Compte les carreaux entre le point et l’axe.",
    explanation: exp(
      "Le symétrique se trouve de l’autre côté de l’axe, à même distance.",
      "Avec un axe vertical, l’ordonnée reste la même.",
      "Le point (2 ; 7) est à 3 unités de x = 5, donc son image est (8 ; 7).",
      "Le symétrique est (8 ; 7)."
    ),
    tags: ["cm1", "symetrie", "construire", "point", "vertical", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: { points: [{ x: 2, y: 7 }], ...SOURCE_STYLE },
      axis: { type: "vertical", x: 5, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_construire_fixed_9_point_horizontal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est le symétrique du point (2 ; 1) par rapport à la droite y = 3 ?",
    format: "qcm",
    choices: ["(2 ; 5)", "(2 ; 3)", "(4 ; 5)", "(2 ; 1)"],
    expected: ["(2 ; 5)"],
    comparator: "mcq_exact",
    hint: "L’abscisse ne change pas avec un axe horizontal.",
    explanation: exp(
      "Le symétrique se place en miroir par rapport à l’axe.",
      "Avec un axe horizontal, l’abscisse reste la même.",
      "Le point (2 ; 1) est à 2 unités de y = 3, donc son image est (2 ; 5).",
      "Le symétrique est (2 ; 5)."
    ),
    tags: ["cm1", "symetrie", "construire", "point", "horizontal", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: { points: [{ x: 2, y: 1 }], ...SOURCE_STYLE },
      axis: { type: "horizontal", y: 3, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  // ============================================================
  // TOP-UP — SYMETRIE_PROPRIETE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_symetrie_propriete_fixed_4_longueurs",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "La symétrie axiale conserve-t-elle les longueurs ?",
    format: "qcm",
    choices: [
      "oui, les longueurs sont conservées",
      "non, les longueurs changent",
      "seulement parfois",
      "non, les longueurs doublent",
    ],
    expected: ["oui, les longueurs sont conservées"],
    comparator: "mcq_exact",
    hint: "Pense à une image dans un miroir : elle a la même taille.",
    explanation: exp(
      "La symétrie axiale est comme un reflet dans un miroir.",
      "On compare la figure et son image.",
      "L’image a exactement la même taille que la figure de départ.",
      "Oui, les longueurs sont conservées."
    ),
    tags: ["cm1", "symetrie", "propriete", "longueur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_propriete_fixed_5_forme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "L’image d’une figure par symétrie axiale a...",
    format: "qcm",
    choices: [
      "la même forme et la même taille",
      "une forme différente",
      "une taille plus grande",
      "une taille plus petite",
    ],
    expected: ["la même forme et la même taille"],
    comparator: "mcq_exact",
    hint: "Le miroir ne change ni la forme ni la taille.",
    explanation: exp(
      "La symétrie axiale conserve la forme et la taille.",
      "On observe la figure et son reflet.",
      "Seule la position change, pas la forme ni la taille.",
      "L’image a la même forme et la même taille."
    ),
    tags: ["cm1", "symetrie", "propriete", "forme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_propriete_fixed_6_segment",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 4,
    theme: "neutral",
    text: "L’image d’un segment par une symétrie axiale est...",
    format: "qcm",
    choices: [
      "un segment de même longueur",
      "un point",
      "un cercle",
      "un segment plus long",
    ],
    expected: ["un segment de même longueur"],
    comparator: "mcq_exact",
    hint: "La symétrie conserve les longueurs.",
    explanation: exp(
      "La symétrie axiale transforme un segment en un segment.",
      "Comme les longueurs sont conservées, la longueur ne change pas.",
      "L’image d’un segment est donc un segment de même longueur.",
      "C’est un segment de même longueur."
    ),
    tags: ["cm1", "symetrie", "propriete", "segment", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_propriete_fixed_7_distance_axe",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Un point et son image sont à la même distance de...",
    format: "qcm",
    choices: ["l’axe de symétrie", "l’origine", "du sommet le plus proche", "du bord de la feuille"],
    expected: ["l’axe de symétrie"],
    comparator: "mcq_exact",
    hint: "Le miroir est à mi-chemin entre le point et son image.",
    explanation: exp(
      "En symétrie axiale, l’axe joue le rôle de miroir.",
      "On mesure la distance entre chaque point et l’axe.",
      "Le point et son image sont toujours à la même distance de l’axe.",
      "Ils sont à la même distance de l’axe de symétrie."
    ),
    tags: ["cm1", "symetrie", "propriete", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_propriete_fixed_8_pliage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 4,
    theme: "neutral",
    text: "Si on plie la feuille le long de l’axe, la figure et son image...",
    format: "qcm",
    choices: [
      "se superposent exactement",
      "ne se touchent pas",
      "se croisent en un point",
      "forment un cercle",
    ],
    expected: ["se superposent exactement"],
    comparator: "mcq_exact",
    hint: "C’est le test du pliage pour vérifier une symétrie.",
    explanation: exp(
      "Le pliage le long de l’axe est un test de symétrie.",
      "On plie la feuille sur l’axe et on regarde si les deux parties coïncident.",
      "La figure tombe exactement sur son image.",
      "Elles se superposent exactement."
    ),
    tags: ["cm1", "symetrie", "propriete", "pliage", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_propriete_fixed_9_nom_axe",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un dessin symétrique, la droite qui joue le rôle de miroir s’appelle...",
    format: "qcm",
    choices: ["l’axe de symétrie", "la diagonale", "le rayon", "la hauteur"],
    expected: ["l’axe de symétrie"],
    comparator: "mcq_exact",
    hint: "C’est la ligne de pliage.",
    explanation: exp(
      "La droite-miroir d’une symétrie a un nom précis.",
      "On cherche le mot qui désigne cette ligne.",
      "C’est la droite sur laquelle on plie pour superposer la figure et son image.",
      "Cette droite s’appelle l’axe de symétrie."
    ),
    tags: ["cm1", "symetrie", "propriete", "vocabulaire", "qcm"],
  },

  // ============================================================
  // TOP-UP — SYMETRIE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_symetrie_defi_fixed_3_triangle_horizontal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Le triangle a pour sommets (2 ; 1), (4 ; 1) et (3 ; 3). Par rapport à la droite y = 4, quel est le sommet image de (2 ; 1) ?",
    format: "qcm",
    choices: ["(2 ; 7)", "(2 ; 5)", "(6 ; 7)", "(2 ; 1)"],
    expected: ["(2 ; 7)"],
    comparator: "mcq_exact",
    hint: "Avec un axe horizontal, l’abscisse ne change pas.",
    explanation: exp(
      "Dans un défi de symétrie, on applique la règle du miroir.",
      "On garde l’abscisse et on reporte la distance à l’axe.",
      "Le point (2 ; 1) est à 3 unités de y = 4, donc son image est (2 ; 7).",
      "Le sommet image est (2 ; 7)."
    ),
    tags: ["cm1", "symetrie", "defi", "triangle", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [
          { x: 2, y: 1 },
          { x: 4, y: 1 },
          { x: 3, y: 3 },
        ],
        ...SOURCE_STYLE,
      },
      axis: { type: "horizontal", y: 4, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_defi_fixed_4_axes_carre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Combien d’axes de symétrie possède un carré ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Pense aux 2 médianes et aux 2 diagonales.",
    explanation: exp(
      "Un axe de symétrie partage la figure en deux moitiés superposables.",
      "On cherche toutes les droites de pliage du carré.",
      "Il y a les 2 droites qui passent par le milieu des côtés et les 2 diagonales.",
      "Le carré possède 4 axes de symétrie."
    ),
    tags: ["cm1", "symetrie", "defi", "carre", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_defi_fixed_5_axes_rectangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Combien d’axes de symétrie possède un rectangle qui n’est pas un carré ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Les diagonales du rectangle ne sont pas des axes de symétrie.",
    explanation: exp(
      "Un axe de symétrie plie la figure en deux moitiés qui se superposent.",
      "On teste les droites de pliage du rectangle.",
      "Seules les 2 droites passant par le milieu des côtés conviennent ; les diagonales non.",
      "Le rectangle possède 2 axes de symétrie."
    ),
    tags: ["cm1", "symetrie", "defi", "rectangle", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_defi_fixed_6_trouver_axe",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Le sommet (1 ; 2) d’une figure a pour image (5 ; 2) par un axe vertical. Quelle est la droite axe de symétrie ?",
    format: "qcm",
    choices: ["la droite x = 3", "la droite x = 4", "la droite y = 3", "la droite x = 2"],
    expected: ["la droite x = 3"],
    comparator: "mcq_exact",
    hint: "L’axe passe au milieu du point et de son image.",
    explanation: exp(
      "L’axe de symétrie est à mi-distance entre un point et son image.",
      "On cherche le milieu entre les abscisses 1 et 5.",
      "Le milieu de 1 et 5 est 3, donc l’axe est la droite x = 3.",
      "L’axe de symétrie est la droite x = 3."
    ),
    tags: ["cm1", "symetrie", "defi", "axe", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_defi_fixed_7_segment_image",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Les extrémités d’un segment sont (1 ; 2) et (1 ; 6). Par rapport à la droite x = 4, quelle est l’image de (1 ; 6) ?",
    format: "qcm",
    choices: ["(7 ; 6)", "(7 ; 2)", "(5 ; 6)", "(1 ; 6)"],
    expected: ["(7 ; 6)"],
    comparator: "mcq_exact",
    hint: "Avec un axe vertical, l’ordonnée ne change pas.",
    explanation: exp(
      "On applique la symétrie à chaque extrémité du segment.",
      "Avec un axe vertical, on garde l’ordonnée et on reporte la distance à l’axe.",
      "Le point (1 ; 6) est à 3 unités de x = 4, donc son image est (7 ; 6).",
      "L’image de (1 ; 6) est (7 ; 6)."
    ),
    tags: ["cm1", "symetrie", "defi", "segment", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        points: [
          { x: 1, y: 2 },
          { x: 1, y: 6 },
        ],
        ...SOURCE_STYLE,
      },
      axis: { type: "vertical", x: 4, label: "axe" },
      display: BASE_DISPLAY,
    }),
  },

  {
    kind: "fixed",
    id: "cm1_symetrie_defi_fixed_8_vocabulaire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure que l’on peut replier exactement sur elle-même possède...",
    format: "qcm",
    choices: ["un axe de symétrie", "un seul sommet", "un angle droit", "un cercle"],
    expected: ["un axe de symétrie"],
    comparator: "mcq_exact",
    hint: "C’est la ligne de pliage qui superpose les deux moitiés.",
    explanation: exp(
      "Une figure symétrique se replie exactement sur elle-même.",
      "On cherche le nom de la ligne de pliage.",
      "Cette ligne de pliage est une droite particulière de la figure.",
      "La figure possède un axe de symétrie."
    ),
    tags: ["cm1", "symetrie", "defi", "vocabulaire", "qcm"],
  },
];