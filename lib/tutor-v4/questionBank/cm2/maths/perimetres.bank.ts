// lib/tutor-v4/question-banks/maths/cm2/perimetres.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs])
    .filter((choice, index, arr) => arr.indexOf(choice) === index)
    .slice(0, 4);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

export const perimetresBank: TutorBankItemV4[] = [
  /* ============================================================
     PERIMETRE_COMPRENDRE
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_perimetre_comprendre_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Le périmètre d’une figure correspond à...",
    format: "qcm",
    choices: [
      "la longueur du contour de la figure",
      "la surface à l’intérieur de la figure",
      "le nombre de couleurs de la figure",
      "le volume de la figure",
    ],
    expected: ["la longueur du contour de la figure"],
    comparator: "mcq_exact",
    hint: "Le périmètre, c’est le tour de la figure.",
    explanation: exp(
      "Le périmètre est la longueur du contour d’une figure.",
      "On imagine que l’on fait le tour de la figure.",
      "Pour calculer un périmètre, on additionne les longueurs des côtés.",
      "Le périmètre correspond à la longueur du contour."
    ),
    tags: ["cm2", "perimetre", "comprendre", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_comprendre_fixed_2_unite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité peut convenir pour exprimer un périmètre ?",
    format: "qcm",
    choices: ["cm", "cm²", "L", "kg"],
    expected: ["cm"],
    comparator: "mcq_exact",
    hint: "Un périmètre est une longueur.",
    explanation: exp(
      "Un périmètre est une longueur.",
      "On utilise donc une unité de longueur.",
      "Le cm est une unité de longueur. Le cm² sert à mesurer une aire.",
      "Une unité possible pour un périmètre est le cm."
    ),
    tags: ["cm2", "perimetre", "comprendre", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_comprendre_fixed_3_aire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle phrase est correcte ?",
    format: "qcm",
    choices: [
      "Le périmètre mesure le contour.",
      "Le périmètre mesure la surface intérieure.",
      "Le périmètre se mesure toujours en cm².",
      "Le périmètre est toujours égal à l’aire.",
    ],
    expected: ["Le périmètre mesure le contour."],
    comparator: "mcq_exact",
    hint: "Attention à ne pas confondre périmètre et aire.",
    explanation: exp(
      "Le périmètre et l’aire ne mesurent pas la même chose.",
      "Le périmètre mesure le contour ; l’aire mesure la surface intérieure.",
      "Quand on calcule le tour d’une figure, on calcule son périmètre.",
      "La phrase correcte est : le périmètre mesure le contour."
    ),
    tags: ["cm2", "perimetre", "comprendre", "aire", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_comprendre_fixed_4_reunion_jardin",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 2,
    theme: "reunion",
    text: "Pour mesurer le tour d’un petit jardin à La Réunion, on calcule...",
    format: "qcm",
    choices: ["son périmètre", "son volume", "sa masse", "sa contenance"],
    expected: ["son périmètre"],
    comparator: "mcq_exact",
    hint: "Le tour d’une figure, c’est le périmètre.",
    explanation: exp(
      "Le périmètre mesure le contour d’une figure ou d’un terrain.",
      "Quand on parle du tour d’un jardin, on cherche une longueur.",
      "Le tour du jardin correspond à son périmètre.",
      "On calcule donc son périmètre."
    ),
    tags: ["cm2", "perimetre", "comprendre", "reunion", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_comprendre_fixed_5_erreur_aire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Pour calculer le périmètre d’un rectangle, je fais longueur × largeur.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Longueur × largeur sert plutôt pour l’aire.",
    explanation: exp(
      "Le périmètre mesure le contour d’une figure.",
      "Pour un rectangle, on additionne les quatre côtés.",
      "Longueur × largeur donne l’aire du rectangle, pas son périmètre.",
      "L’élève a tort."
    ),
    tags: ["cm2", "perimetre", "comprendre", "erreur", "aire", "qcm"],
  },

  /* ============================================================
     PERIMETRE_TRIANGLE
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_perimetre_triangle_fixed_1_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle a pour côtés 4 cm, 5 cm et 6 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["15 cm", "20 cm", "11 cm", "120 cm"],
    expected: ["15 cm"],
    comparator: "mcq_exact",
    hint: "Additionne les trois côtés.",
    explanation: exp(
      "Le périmètre d’un triangle est la somme des longueurs de ses trois côtés.",
      "On additionne les trois longueurs données.",
      "4 + 5 + 6 = 15.",
      "Le périmètre du triangle est 15 cm."
    ),
    tags: ["cm2", "perimetre", "triangle", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_triangle_fixed_2_equilateral",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle équilatéral a des côtés de 7 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["21 cm", "14 cm", "49 cm", "7 cm"],
    expected: ["21 cm"],
    comparator: "mcq_exact",
    hint: "Un triangle équilatéral a 3 côtés égaux.",
    explanation: exp(
      "Un triangle équilatéral possède trois côtés de même longueur.",
      "On multiplie la longueur d’un côté par 3.",
      "3 × 7 = 21.",
      "Le périmètre est 21 cm."
    ),
    tags: ["cm2", "perimetre", "triangle", "equilateral", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_triangle_fixed_3_canvas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Observe le triangle. Ses côtés mesurent 5 cm, 6 cm et 7 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["18", "18 cm", "18cm"],
    comparator: "number_equal",
    hint: "Additionne les trois côtés.",
    explanation: exp(
      "Le périmètre d’un triangle est la somme de ses trois côtés.",
      "On additionne les longueurs du contour.",
      "5 + 6 + 7 = 18.",
      "Le périmètre est 18 cm."
    ),
    tags: ["cm2", "perimetre", "triangle", "canvas"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 180 },
        B: { x: 230, y: 180 },
        C: { x: 140, y: 60 },
      },
      sideLabels: {
        AB: "7 cm",
        BC: "6 cm",
        CA: "5 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
      },
    },
  },

  {
    kind: "template",
    id: "cm2_perimetre_triangle_tpl_1_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 1,
    theme: "neutral",
    hint: "Additionne les trois côtés du triangle.",
    tags: ["cm2", "perimetre", "triangle", "template"],
    generate: () => {
      const a = randomInt(3, 12);
      const b = randomInt(3, 12);
      const c = randomInt(3, 12);
      const p = a + b + c;

      return {
        text: `Un triangle a pour côtés ${a} cm, ${b} cm et ${c} cm. Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation: exp(
          "Le périmètre d’un triangle est la somme des longueurs de ses trois côtés.",
          "On additionne les trois côtés.",
          `${a} + ${b} + ${c} = ${p}.`,
          `Le périmètre est ${p} cm.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_perimetre_triangle_tpl_2_equilateral",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Un triangle équilatéral a 3 côtés égaux.",
    tags: ["cm2", "perimetre", "triangle", "equilateral", "template"],
    generate: () => {
      const cote = randomInt(4, 15);
      const p = 3 * cote;

      return {
        text: `Un triangle équilatéral a des côtés de ${cote} cm. Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation: exp(
          "Un triangle équilatéral a trois côtés de même longueur.",
          "On multiplie la longueur d’un côté par 3.",
          `3 × ${cote} = ${p}.`,
          `Le périmètre est ${p} cm.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_perimetre_triangle_tpl_3_isocele",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Un triangle isocèle a deux côtés égaux.",
    tags: ["cm2", "perimetre", "triangle", "isocele", "template"],
    generate: () => {
      const coteEgal = randomInt(5, 12);
      const base = randomInt(4, 14);
      const p = coteEgal + coteEgal + base;

      return {
        text: `Un triangle isocèle a deux côtés de ${coteEgal} cm et une base de ${base} cm. Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation: exp(
          "Un triangle isocèle possède deux côtés de même longueur.",
          "On additionne les deux côtés égaux et la base.",
          `${coteEgal} + ${coteEgal} + ${base} = ${p}.`,
          `Le périmètre est ${p} cm.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_triangle_fixed_4_erreur_oublier_cote",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule le périmètre d’un triangle de côtés 5 cm, 6 cm et 7 cm en faisant seulement 5 + 6. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un triangle a trois côtés.",
    explanation: exp(
      "Le périmètre d’un triangle est la somme de ses trois côtés.",
      "Il ne faut oublier aucun côté.",
      "Il fallait calculer 5 + 6 + 7 = 18.",
      "L’élève a tort."
    ),
    tags: ["cm2", "perimetre", "triangle", "erreur", "qcm"],
  },

  /* ============================================================
     PERIMETRE_QUADRILATERE
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_perimetre_quadrilatere_fixed_1_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm de longueur et 5 cm de largeur. Quel est son périmètre ?",
    format: "qcm",
    choices: ["26 cm", "13 cm", "40 cm", "18 cm"],
    expected: ["26 cm"],
    comparator: "mcq_exact",
    hint: "Un rectangle a deux longueurs et deux largeurs.",
    explanation: exp(
      "Le périmètre d’un rectangle est la somme de ses quatre côtés.",
      "On peut calculer 2 × longueur + 2 × largeur.",
      "8 + 8 + 5 + 5 = 26.",
      "Le périmètre est 26 cm."
    ),
    tags: ["cm2", "perimetre", "quadrilatere", "rectangle", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_quadrilatere_fixed_2_carre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Un carré a un côté de 6 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["24 cm", "12 cm", "36 cm", "18 cm"],
    expected: ["24 cm"],
    comparator: "mcq_exact",
    hint: "Un carré a 4 côtés égaux.",
    explanation: exp(
      "Un carré possède quatre côtés de même longueur.",
      "On multiplie la longueur d’un côté par 4.",
      "4 × 6 = 24.",
      "Le périmètre est 24 cm."
    ),
    tags: ["cm2", "perimetre", "quadrilatere", "carre", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_quadrilatere_fixed_3_canvas_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Observe le rectangle ABCD. Quel est son périmètre ?",
    format: "short",
    expected: ["18", "18 cm", "18cm"],
    comparator: "number_equal",
    hint: "Il y a deux côtés de 6 cm et deux côtés de 3 cm.",
    explanation: exp(
      "Le périmètre d’un rectangle est la somme de ses quatre côtés.",
      "On additionne deux longueurs et deux largeurs.",
      "6 + 6 + 3 + 3 = 18.",
      "Le périmètre est 18 cm."
    ),
    tags: ["cm2", "perimetre", "quadrilatere", "rectangle", "canvas"],
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
        equalSides: [
          ["AB", "CD"],
          ["BC", "DA"],
        ],
      },
    },
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_quadrilatere_fixed_4_canvas_carre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Observe le carré ABCD. Le côté mesure 5 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["20", "20 cm", "20cm"],
    comparator: "number_equal",
    hint: "Le carré a 4 côtés égaux.",
    explanation: exp(
      "Un carré possède quatre côtés de même longueur.",
      "On multiplie la longueur d’un côté par 4.",
      "4 × 5 = 20.",
      "Le périmètre est 20 cm."
    ),
    tags: ["cm2", "perimetre", "quadrilatere", "carre", "canvas"],
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
        equalSides: [
          ["AB", "BC"],
          ["BC", "CD"],
          ["CD", "DA"],
        ],
      },
    },
  },

  {
    kind: "template",
    id: "cm2_perimetre_quadrilatere_tpl_1_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    hint: "Un rectangle a deux longueurs et deux largeurs.",
    tags: ["cm2", "perimetre", "quadrilatere", "rectangle", "template"],
    generate: () => {
      const longueur = randomInt(5, 15);
      const largeur = randomInt(2, 10);
      const p = 2 * (longueur + largeur);

      return {
        text: `Un rectangle mesure ${longueur} cm de longueur et ${largeur} cm de largeur. Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation: exp(
          "Le périmètre d’un rectangle est la somme de ses quatre côtés.",
          "On additionne deux longueurs et deux largeurs.",
          `${longueur} + ${longueur} + ${largeur} + ${largeur} = ${p}.`,
          `Le périmètre est ${p} cm.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_perimetre_quadrilatere_tpl_2_carre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    hint: "Un carré a quatre côtés égaux.",
    tags: ["cm2", "perimetre", "quadrilatere", "carre", "template"],
    generate: () => {
      const cote = randomInt(3, 15);
      const p = 4 * cote;

      return {
        text: `Un carré a un côté de ${cote} cm. Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation: exp(
          "Le périmètre d’un carré est la somme de ses quatre côtés égaux.",
          "On multiplie la longueur du côté par 4.",
          `4 × ${cote} = ${p}.`,
          `Le périmètre est ${p} cm.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_quadrilatere_fixed_5_erreur_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm sur 3 cm. Un élève répond 24 cm car il a fait 8 × 3. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "8 × 3 donne l’aire, pas le périmètre.",
    explanation: exp(
      "Le périmètre mesure le contour.",
      "Pour un rectangle, on additionne les quatre côtés.",
      "8 + 8 + 3 + 3 = 22 cm. Le calcul 8 × 3 donne l’aire.",
      "L’élève a tort."
    ),
    tags: ["cm2", "perimetre", "quadrilatere", "rectangle", "erreur", "qcm"],
  },

  /* ============================================================
     PERIMETRE_POLYGONE
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_perimetre_polygone_fixed_1_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    text: "Une figure a pour côtés 3 cm, 4 cm, 5 cm et 6 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["18 cm", "12 cm", "24 cm", "30 cm"],
    expected: ["18 cm"],
    comparator: "mcq_exact",
    hint: "Additionne toutes les longueurs du contour.",
    explanation: exp(
      "Le périmètre d’un polygone est la somme des longueurs de tous ses côtés.",
      "On additionne tous les côtés donnés.",
      "3 + 4 + 5 + 6 = 18.",
      "Le périmètre est 18 cm."
    ),
    tags: ["cm2", "perimetre", "polygone", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_polygone_fixed_2_canvas_carre_cases",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Quel est son périmètre en unités ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Compte uniquement le contour extérieur.",
    explanation: exp(
      "Le périmètre est la longueur du contour extérieur.",
      "Sur un quadrillage, on compte les côtés extérieurs des cases.",
      "La figure forme un carré de 2 cases sur 2. Son contour compte 8 unités.",
      "Le périmètre est 8 unités."
    ),
    tags: ["cm2", "perimetre", "polygone", "figure_libre", "canvas"],
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
    id: "cm2_perimetre_polygone_fixed_3_canvas_l",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 4,
    theme: "neutral",
    text: "Observe la figure en L sur quadrillage. Quel est son périmètre en unités ?",
    format: "qcm",
    choices: ["8", "10", "12", "14"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Compte seulement le contour extérieur, pas les côtés collés entre deux cases.",
    explanation: exp(
      "Le périmètre est le contour extérieur d’une figure.",
      "Sur une figure composée de cases, les côtés entre deux cases collées ne comptent pas.",
      "En suivant le contour extérieur de la figure en L, on obtient 10 unités.",
      "Le périmètre est 10 unités."
    ),
    tags: ["cm2", "perimetre", "polygone", "figure_libre", "canvas", "qcm"],
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
    kind: "template",
    id: "cm2_perimetre_polygone_tpl_1_cotes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les longueurs données.",
    tags: ["cm2", "perimetre", "polygone", "template"],
    generate: () => {
      const n = randomChoice([4, 5, 6]);
      const sides = Array.from({ length: n }, () => randomInt(2, 8));
      const p = sides.reduce((sum, side) => sum + side, 0);

      return {
        text: `Un polygone a pour côtés ${sides.map((s) => `${s} cm`).join(", ")}. Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation: exp(
          "Le périmètre d’un polygone est la somme des longueurs de ses côtés.",
          "On additionne toutes les longueurs du contour.",
          `${sides.join(" + ")} = ${p}.`,
          `Le périmètre est ${p} cm.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_perimetre_polygone_tpl_2_regulier",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 3,
    theme: "neutral",
    hint: "Si tous les côtés sont égaux, on peut multiplier.",
    tags: ["cm2", "perimetre", "polygone", "regulier", "template"],
    generate: () => {
      const nbCotes = randomChoice([5, 6, 8]);
      const cote = randomInt(3, 10);
      const p = nbCotes * cote;

      return {
        text: `Un polygone a ${nbCotes} côtés de ${cote} cm chacun. Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation: exp(
          "Le périmètre est la somme des longueurs de tous les côtés.",
          "Quand tous les côtés ont la même longueur, on peut multiplier.",
          `${nbCotes} × ${cote} = ${p}.`,
          `Le périmètre est ${p} cm.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_polygone_fixed_4_erreur_interieur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une figure composée de cases collées, faut-il compter les côtés qui sont à l’intérieur entre deux cases ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le périmètre ne compte que le contour extérieur.",
    explanation: exp(
      "Le périmètre est le contour extérieur de la figure.",
      "Les côtés collés entre deux cases sont à l’intérieur de la figure.",
      "On ne les compte donc pas dans le périmètre.",
      "Il ne faut compter que le contour extérieur."
    ),
    tags: ["cm2", "perimetre", "polygone", "erreur", "qcm"],
  },

  /* ============================================================
     PERIMETRE_DEFI
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_perimetre_defi_fixed_1_jardin",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, un petit jardin rectangulaire mesure 10 m de long et 4 m de large. Quelle longueur de clôture faut-il pour faire tout le tour ?",
    format: "short",
    expected: ["28", "28 m", "28m"],
    comparator: "number_equal",
    hint: "Il faut calculer le périmètre du rectangle.",
    explanation: exp(
      "Pour faire le tour d’un jardin, on calcule son périmètre.",
      "Un rectangle a deux longueurs et deux largeurs.",
      "10 + 10 + 4 + 4 = 28.",
      "Il faut 28 m de clôture."
    ),
    tags: ["cm2", "perimetre", "defi", "rectangle", "reunion"],
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_defi_fixed_2_carre_inverse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un carré a un périmètre de 28 cm. Combien mesure un côté ?",
    format: "short",
    expected: ["7", "7 cm", "7cm"],
    comparator: "number_equal",
    hint: "Dans un carré, les 4 côtés sont égaux.",
    explanation: exp(
      "Le périmètre d’un carré est égal à 4 fois la longueur du côté.",
      "Pour retrouver un côté, on divise le périmètre par 4.",
      "28 ÷ 4 = 7.",
      "Un côté mesure 7 cm."
    ),
    tags: ["cm2", "perimetre", "defi", "inverse", "carre"],
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_defi_fixed_3_rectangle_inverse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un rectangle a un périmètre de 18 cm. Sa longueur est 6 cm. Quelle est sa largeur ?",
    format: "short",
    expected: ["3", "3 cm", "3cm"],
    comparator: "number_equal",
    hint: "Les deux longueurs mesurent déjà 12 cm au total.",
    explanation: exp(
      "Dans un rectangle, le périmètre contient deux longueurs et deux largeurs.",
      "On retire d’abord les deux longueurs du périmètre.",
      "6 + 6 = 12. Il reste 18 - 12 = 6 cm pour les deux largeurs. Donc une largeur vaut 3 cm.",
      "La largeur mesure 3 cm."
    ),
    tags: ["cm2", "perimetre", "defi", "inverse", "rectangle"],
  },

  {
    kind: "fixed",
    id: "cm2_perimetre_defi_fixed_4_meme_perimetre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux figures différentes peuvent-elles avoir le même périmètre ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le périmètre donne seulement la longueur totale du contour.",
    explanation: exp(
      "Le périmètre mesure la longueur totale du contour.",
      "Deux formes différentes peuvent avoir un contour de même longueur.",
      "Par exemple, plusieurs rectangles différents peuvent avoir le même périmètre.",
      "Oui, deux figures différentes peuvent avoir le même périmètre."
    ),
    tags: ["cm2", "perimetre", "defi", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_perimetre_defi_tpl_1_cloture",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Pour faire le tour, on calcule le périmètre.",
    tags: ["cm2", "perimetre", "defi", "reunion", "cloture", "template"],
    generate: () => {
      const longueur = randomInt(6, 14);
      const largeur = randomInt(3, 8);
      const p = 2 * (longueur + largeur);

      return {
        text: `À La Réunion, un terrain rectangulaire mesure ${longueur} m de long et ${largeur} m de large. Quelle longueur de grillage faut-il pour faire tout le tour ?`,
        format: "short",
        expected: [String(p), `${p} m`, `${p}m`],
        comparator: "number_equal",
        explanation: exp(
          "Pour faire le tour d’un terrain, on calcule son périmètre.",
          "Un rectangle a deux longueurs et deux largeurs.",
          `${longueur} + ${longueur} + ${largeur} + ${largeur} = ${p}.`,
          `Il faut ${p} m de grillage.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_perimetre_defi_tpl_2_carre_inverse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le périmètre d’un carré vaut 4 × côté.",
    tags: ["cm2", "perimetre", "defi", "inverse", "carre", "template"],
    generate: () => {
      const cote = randomInt(4, 12);
      const p = 4 * cote;

      return {
        text: `Un carré a un périmètre de ${p} cm. Combien mesure un côté ?`,
        format: "short",
        expected: [String(cote), `${cote} cm`, `${cote}cm`],
        comparator: "number_equal",
        explanation: exp(
          "Un carré a quatre côtés égaux.",
          "Pour retrouver un côté, on divise le périmètre par 4.",
          `${p} ÷ 4 = ${cote}.`,
          `Un côté mesure ${cote} cm.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_perimetre_defi_tpl_3_figure_canvas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte uniquement le contour extérieur.",
    tags: ["cm2", "perimetre", "defi", "figure_libre", "canvas", "template"],
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
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
            [2, 3],
          ] as Array<[number, number]>,
          perimeter: 12,
        },
      ];

      const shape = randomChoice(shapes);

      return {
        text: "Observe la figure sur quadrillage. Quel est son périmètre en unités ?",
        format: "short",
        expected: [String(shape.perimeter)],
        comparator: "number_equal",
        explanation: exp(
          "Le périmètre est la longueur du contour extérieur.",
          "Sur un quadrillage, on compte les côtés extérieurs des cases.",
          `En suivant le contour extérieur, on obtient ${shape.perimeter} unités.`,
          `Le périmètre est ${shape.perimeter} unités.`
        ),
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

  {
    kind: "fixed",
    id: "cm2_perimetre_defi_open_1_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment calculer le périmètre d’une figure.",
    format: "open",
    expected: ["contour", "additionner", "côtés", "longueurs"],
    comparator: "contains_keyword",
    hint: "Parle du contour et des côtés.",
    explanation: exp(
      "Le périmètre est la longueur du contour d’une figure.",
      "On repère tous les côtés du contour, puis on additionne leurs longueurs.",
      "Par exemple, pour un triangle, on additionne ses trois côtés.",
      "Pour calculer un périmètre, on additionne les longueurs du contour."
    ),
    tags: ["cm2", "perimetre", "defi", "open", "methode"],
  },
];