// lib/tutor-v4/question-banks/maths/cm2/fractions.bank.ts

import type {
  TutorBankItemV4,
  FractionCanvasData,
} from "@/lib/tutor-v4/types";

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
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function fractionCanvas(
  data: Omit<FractionCanvasData, "kind">
): FractionCanvasData {
  return { kind: "fraction", ...data };
}

function numberLineCanvas(data: {
  min?: number;
  max?: number;
  step?: number;
  points?: {
    value: number;
    label?: string;
    color?: string;
  }[];
  display?: {
    showTicks?: boolean;
    showValues?: boolean;
    showPoints?: boolean;
    showPointLabels?: boolean;
    showZero?: boolean;
  };
  size?: {
    width?: number;
    height?: number;
  };
}) {
  return {
    kind: "number_line" as const,
    min: data.min ?? 0,
    max: data.max ?? 2,
    step: data.step ?? 0.25,
    points: data.points ?? [],
    display: {
      showTicks: true,
      showValues: true,
      showPoints: true,
      showPointLabels: true,
      showZero: true,
      ...(data.display ?? {}),
    },
    size: data.size,
  };
}

export const fractionsBank: TutorBankItemV4[] = [
  // ============================================================
  // FRACTION_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_fraction_lire_fixed_1_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans la fraction 3/4, quel nombre est le numérateur ?",
    format: "qcm",
    choices: ["3", "4", "7", "1"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Le numérateur est le nombre du haut.",
    explanation: exp(
      "Une fraction s’écrit avec un numérateur et un dénominateur.",
      "Le numérateur est le nombre écrit au-dessus de la barre de fraction.",
      "Dans 3/4, le nombre du haut est 3.",
      "Le numérateur est 3."
    ),
    tags: ["cm2", "fraction", "lire", "vocabulaire", "qcm"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: {
        numerator: 3,
        denominator: 4,
        label: "3/4",
      },
      display: {
        showFraction: true,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_fraction_lire_fixed_2_denominateur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans la fraction 3/4, que représente le nombre 4 ?",
    format: "qcm",
    choices: [
      "le nombre total de parts égales",
      "le nombre de parts coloriées",
      "le résultat de la fraction",
      "le nombre de gâteaux",
    ],
    expected: ["le nombre total de parts égales"],
    comparator: "mcq_exact",
    hint: "Le dénominateur indique en combien de parts égales le tout est partagé.",
    explanation: exp(
      "Le dénominateur indique en combien de parts égales le tout est partagé.",
      "On regarde le nombre du bas dans la fraction.",
      "Dans 3/4, le dénominateur est 4 : le tout est partagé en 4 parts égales.",
      "Le nombre 4 représente le nombre total de parts égales."
    ),
    tags: ["cm2", "fraction", "lire", "denominateur", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: {
        numerator: 3,
        denominator: 4,
        label: "3/4",
      },
      display: {
        showFraction: true,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_fraction_lire_fixed_3_sens",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie la fraction 2/5 ?",
    format: "qcm",
    choices: [
      "2 parts prises sur 5 parts égales",
      "5 parts prises sur 2 parts égales",
      "2 + 5",
      "2 × 5",
    ],
    expected: ["2 parts prises sur 5 parts égales"],
    comparator: "mcq_exact",
    hint: "Le bas indique le nombre total de parts égales, le haut indique les parts prises.",
    explanation: exp(
      "Une fraction peut représenter une partie d’un tout partagé en parts égales.",
      "On lit le dénominateur puis le numérateur.",
      "Dans 2/5, le tout est partagé en 5 parts égales et on en prend 2.",
      "2/5 signifie 2 parts prises sur 5 parts égales."
    ),
    tags: ["cm2", "fraction", "lire", "sens", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: {
        numerator: 2,
        denominator: 5,
        label: "2/5",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_fraction_lire_fixed_4_nombre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 2,
    theme: "neutral",
    text: "La fraction 1/2 est-elle un nombre ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Une fraction peut se placer sur une droite graduée.",
    explanation: exp(
      "Une fraction n’est pas seulement un partage : c’est aussi un nombre.",
      "Pour le voir, on peut la placer sur une droite graduée.",
      "1/2 se place entre 0 et 1.",
      "Donc 1/2 est bien un nombre."
    ),
    tags: ["cm2", "fraction", "lire", "fraction_nombre", "qcm", "droite"],
    canvas: numberLineCanvas({
      min: 0,
      max: 1,
      step: 0.25,
      points: [
        {
          value: 1 / 2,
          label: "1/2",
        },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_fraction_lire_fixed_5_superieure_un",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 2,
    theme: "neutral",
    text: "La fraction 5/4 est-elle plus petite ou plus grande que 1 ?",
    format: "qcm",
    choices: ["plus grande que 1", "plus petite que 1", "égale à 1"],
    expected: ["plus grande que 1"],
    comparator: "mcq_exact",
    hint: "4/4 vaut 1. Compare 5/4 avec 4/4.",
    explanation: exp(
      "Une fraction peut être plus petite, égale ou plus grande que 1.",
      "On compare le numérateur avec le dénominateur.",
      "4/4 = 1. Comme 5/4 est plus grand que 4/4, alors 5/4 > 1.",
      "5/4 est plus grande que 1."
    ),
    tags: ["cm2", "fraction", "lire", "superieure_un", "qcm", "droite"],
    canvas: numberLineCanvas({
      min: 0,
      max: 2,
      step: 0.25,
      points: [
        {
          value: 5 / 4,
          label: "5/4",
        },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_fraction_lire_fixed_6_unite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est égale à 1 ?",
    format: "qcm",
    choices: ["4/4", "3/4", "4/3", "1/4"],
    expected: ["4/4"],
    comparator: "mcq_exact",
    hint: "Quand toutes les parts sont prises, on obtient l’unité entière.",
    explanation: exp(
      "Une fraction est égale à 1 quand le numérateur est égal au dénominateur.",
      "On cherche la fraction où toutes les parts sont prises.",
      "4/4 signifie 4 parts prises sur 4 parts égales.",
      "4/4 est égal à 1."
    ),
    tags: ["cm2", "fraction", "lire", "unite", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: {
        numerator: 4,
        denominator: 4,
        label: "4/4 = 1",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_fraction_lire_fixed_7_open",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Explique avec tes mots ce que signifie 3/8.",
    format: "open",
    expected: ["3", "8", "parts", "égales", "trois"],
    comparator: "contains_keyword",
    hint: "Parle du nombre de parts égales et du nombre de parts prises.",
    explanation: exp(
      "Une fraction décrit souvent des parts égales d’un tout.",
      "On lit le dénominateur pour connaître le nombre total de parts et le numérateur pour connaître les parts prises.",
      "Dans 3/8, le tout est partagé en 8 parts égales et on en prend 3.",
      "3/8 signifie 3 parts prises sur 8 parts égales."
    ),
    tags: ["cm2", "fraction", "lire", "open", "sens"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: {
        numerator: 3,
        denominator: 8,
        label: "3/8",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_fraction_lire_fixed_8_piege_parts_egales",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on parler de fraction si les parts ne sont pas égales ?",
    format: "qcm",
    choices: ["non", "oui", "seulement avec un cercle", "seulement avec une barre"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour une fraction, les parts doivent être égales.",
    explanation: exp(
      "Une fraction partage un tout en parts égales.",
      "On vérifie toujours si les parts ont la même taille.",
      "Si les parts ne sont pas égales, 1 part sur 4 ne représente pas forcément 1/4.",
      "On ne peut pas parler correctement de fraction si les parts ne sont pas égales."
    ),
    tags: ["cm2", "fraction", "lire", "piege", "parts_egales", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: {
        numerator: 1,
        denominator: 4,
        label: "Attention",
      },
      display: {
        unequalParts: true,
        showFraction: false,
      },
    }),
  },

  {
    kind: "template",
    id: "cm2_fraction_lire_tpl_1_numerateur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Le numérateur est le nombre du haut.",
    tags: ["cm2", "fraction", "lire", "numerateur", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([3, 4, 5, 6, 8, 10]);
      const numerator = randomInt(1, denominator - 1);

      return {
        text: `Dans la fraction ${numerator}/${denominator}, quel est le numérateur ?`,
        format: "short",
        expected: [String(numerator)],
        comparator: "number_equal",
        explanation: exp(
          "Le numérateur est le nombre du haut dans une fraction.",
          "On lit la fraction et on repère le nombre placé au-dessus de la barre.",
          `Dans ${numerator}/${denominator}, le nombre du haut est ${numerator}.`,
          `Le numérateur est ${numerator}.`
        ),
        canvas: fractionCanvas({
          model: "bar",
          fraction: {
            numerator,
            denominator,
            label: `${numerator}/${denominator}`,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_fraction_lire_tpl_2_denominateur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Le dénominateur est le nombre du bas.",
    tags: ["cm2", "fraction", "lire", "denominateur", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([3, 4, 5, 6, 8, 10]);
      const numerator = randomInt(1, denominator - 1);

      return {
        text: `Dans la fraction ${numerator}/${denominator}, quel est le dénominateur ?`,
        format: "short",
        expected: [String(denominator)],
        comparator: "number_equal",
        explanation: exp(
          "Le dénominateur est le nombre du bas dans une fraction.",
          "Il indique en combien de parts égales le tout est partagé.",
          `Dans ${numerator}/${denominator}, le nombre du bas est ${denominator}.`,
          `Le dénominateur est ${denominator}.`
        ),
        canvas: fractionCanvas({
          model: "bar",
          fraction: {
            numerator,
            denominator,
            label: `${numerator}/${denominator}`,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_fraction_lire_tpl_3_sens",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le bas donne les parts égales, le haut donne les parts prises.",
    tags: ["cm2", "fraction", "lire", "sens", "qcm", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([3, 4, 5, 6, 8]);
      const numerator = randomInt(1, denominator - 1);
      const correct = `${numerator} parts prises sur ${denominator} parts égales`;

      return {
        text: `Que signifie la fraction ${numerator}/${denominator} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${denominator} parts prises sur ${numerator} parts égales`,
          `${numerator} + ${denominator}`,
          `${numerator} × ${denominator}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction peut représenter une partie d’un tout partagé en parts égales.",
          "On lit le dénominateur puis le numérateur.",
          `Dans ${numerator}/${denominator}, le tout est partagé en ${denominator} parts égales et on prend ${numerator} parts.`,
          `${numerator}/${denominator} signifie ${correct}.`
        ),
        canvas: fractionCanvas({
          model: randomChoice(["bar", "circle"] as const),
          fraction: {
            numerator,
            denominator,
            label: `${numerator}/${denominator}`,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_fraction_lire_tpl_4_fraction_nombre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Une fraction peut se placer sur une droite graduée.",
    tags: ["cm2", "fraction", "lire", "fraction_nombre", "droite", "template"],
    generate: () => {
      const denominators = [2, 4, 5, 10];
      const denominator = randomChoice(denominators);
      const numerator = randomInt(1, denominator - 1);
      const value = numerator / denominator;

      return {
        text: `La fraction ${numerator}/${denominator} est-elle un nombre ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction est aussi un nombre.",
          "On peut la placer sur une droite graduée.",
          `${numerator}/${denominator} se place entre 0 et 1.`,
          `${numerator}/${denominator} est bien un nombre.`
        ),
        canvas: numberLineCanvas({
          min: 0,
          max: 1,
          step: 1 / denominator,
          points: [
            {
              value,
              label: `${numerator}/${denominator}`,
            },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_fraction_lire_tpl_5_comparer_a_un",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare le numérateur et le dénominateur.",
    tags: ["cm2", "fraction", "lire", "comparer_un", "template", "droite"],
    generate: () => {
      const denominator = randomChoice([3, 4, 5, 6, 8]);
      const kind = randomChoice(["inf", "egal", "sup"] as const);

      const numerator =
        kind === "inf"
          ? randomInt(1, denominator - 1)
          : kind === "egal"
            ? denominator
            : denominator + randomInt(1, 3);

      const expected =
        kind === "inf"
          ? "plus petite que 1"
          : kind === "egal"
            ? "égale à 1"
            : "plus grande que 1";

      return {
        text: `La fraction ${numerator}/${denominator} est-elle plus petite que 1, égale à 1 ou plus grande que 1 ?`,
        format: "qcm",
        choices: ["plus petite que 1", "égale à 1", "plus grande que 1"],
        expected: [expected],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer une fraction à 1, on compare le numérateur et le dénominateur.",
          "Si le numérateur est plus petit que le dénominateur, la fraction est plus petite que 1. S’ils sont égaux, elle vaut 1. Si le numérateur est plus grand, elle est plus grande que 1.",
          `${numerator}/${denominator} : on compare ${numerator} et ${denominator}.`,
          `${numerator}/${denominator} est ${expected}.`
        ),
        canvas: numberLineCanvas({
          min: 0,
          max: Math.max(2, Math.ceil(numerator / denominator)),
          step: 1 / denominator,
          points: [
            {
              value: numerator / denominator,
              label: `${numerator}/${denominator}`,
            },
          ],
        }),
      };
    },
  },
    // ============================================================
  // FRACTION_REPRESENTER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_fraction_representer_fixed_1_barre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_representer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction de la barre est coloriée ?",
    format: "qcm",
    choices: ["3/4", "1/4", "4/3", "3/7"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Compte les parts coloriées puis le nombre total de parts égales.",
    explanation: exp(
      "Représenter une fraction, c’est montrer des parts égales d’un tout.",
      "On compte les parts coloriées et le nombre total de parts.",
      "Il y a 3 parts coloriées sur 4 parts égales.",
      "La fraction représentée est 3/4."
    ),
    canvas: fractionCanvas({
      model: "bar",
      fraction: {
        numerator: 3,
        denominator: 4,
        label: "3/4",
      },
      display: {
        showFraction: false,
      },
    }),
    tags: ["cm2", "fraction", "representer", "barre", "qcm", "canvas"],
  },

{
  kind: "fixed",
  id: "cm2_fraction_representer_fixed_2_cercle",
  niveau: "cm2",
  matiere: "maths",
  notionId: "fraction",
  microId: "fraction_representer",
  difficulty: 1,
  theme: "neutral",
  text: "Un disque est partagé en 6 parts égales. 2 parts sont coloriées. Quelle fraction est coloriée ?",
  format: "qcm",
  choices: ["2/6", "6/2", "2/4", "4/6"],
  expected: ["2/6"],
  comparator: "mcq_exact",
  hint: "Nombre de parts coloriées / nombre total de parts.",
  explanation: exp(
    "Une fraction peut représenter une partie d’un disque partagé en parts égales.",
    "On écrit au numérateur les parts coloriées et au dénominateur le nombre total de parts.",
    "2 parts sont coloriées sur 6 parts égales.",
    "La fraction coloriée est 2/6."
  ),
  canvas: fractionCanvas({
    model: "circle",
    fraction: {
      numerator: 2,
      denominator: 6,
      label: "2/6",
    },
    display: {
      showFraction: false,
    },
  }),
  tags: ["cm2", "fraction", "representer", "cercle", "qcm", "canvas"],
},

{
  kind: "fixed",
  id: "cm2_fraction_representer_fixed_3_grille",
  niveau: "cm2",
  matiere: "maths",
  notionId: "fraction",
  microId: "fraction_representer",
  difficulty: 2,
  theme: "neutral",
  text: "Dans la grille, quelle fraction des cases est coloriée ?",
  format: "qcm",
  choices: ["7/10", "3/10", "7/5", "10/7"],
  expected: ["7/10"],
  comparator: "mcq_exact",
  hint: "Il y a 10 cases au total. La fraction s’écrit : cases coloriées / cases totales.",
  explanation: exp(
    "Une fraction peut représenter des cases coloriées dans une grille.",
    "On compte les cases coloriées puis le nombre total de cases.",
    "7 cases sont coloriées sur 10 cases.",
    "La fraction représentée est 7/10."
  ),
  canvas: fractionCanvas({
    model: "grid",
    grid: {
      rows: 2,
      cols: 5,
      shaded: 7,
    },
  }),
  tags: [
    "cm2",
    "fraction",
    "representer",
    "grille",
    "fraction_decimale",
    "qcm",
    "canvas",
  ],
},

  {
    kind: "fixed",
    id: "cm2_fraction_representer_fixed_4_choisir",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle représentation correspond à 1/2 ?",
    format: "qcm",
    choices: [
      "1 part coloriée sur 2 parts égales",
      "2 parts coloriées sur 1 part",
      "1 part coloriée sur 3 parts égales",
      "2 parts coloriées sur 4 parts non égales",
    ],
    expected: ["1 part coloriée sur 2 parts égales"],
    comparator: "mcq_exact",
    hint: "1/2 signifie 1 part prise sur 2 parts égales.",
    explanation: exp(
      "Représenter 1/2, c’est montrer une moitié.",
      "On cherche une représentation avec 2 parts égales et 1 part coloriée.",
      "1 part coloriée sur 2 parts égales représente 1/2.",
      "La bonne représentation est 1 part sur 2 parts égales."
    ),
    canvas: fractionCanvas({
      model: "bar",
      fraction: {
        numerator: 1,
        denominator: 2,
        label: "1/2",
      },
      display: {
        showFraction: true,
      },
    }),
    tags: ["cm2", "fraction", "representer", "moitie", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_fraction_representer_fixed_5_piege_parts_inegales",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_representer",
    difficulty: 3,
    theme: "neutral",
    text: "La figure peut-elle représenter correctement 1/4 si les parts ne sont pas égales ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour représenter une fraction, les parts doivent être égales.",
    explanation: exp(
      "Une fraction représente des parts égales d’un tout.",
      "On vérifie d’abord si les parts ont la même taille.",
      "Si les parts ne sont pas égales, une part coloriée ne représente pas correctement 1/4.",
      "La figure ne représente pas correctement 1/4."
    ),
    canvas: fractionCanvas({
      model: "bar",
      fraction: {
        numerator: 1,
        denominator: 4,
        label: "1/4 ?",
      },
      display: {
        unequalParts: true,
        showFraction: false,
      },
    }),
    tags: ["cm2", "fraction", "representer", "piege", "parts_egales", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_fraction_representer_fixed_6_unite_complete",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Une barre entière est partagée en 5 parts égales et les 5 parts sont coloriées. Quelle fraction est représentée ?",
    format: "qcm",
    choices: ["5/5", "1/5", "5/1", "4/5"],
    expected: ["5/5"],
    comparator: "mcq_exact",
    hint: "Toutes les parts sont coloriées.",
    explanation: exp(
      "Quand toutes les parts d’un tout sont coloriées, on représente une unité entière.",
      "On écrit le nombre de parts coloriées sur le nombre total de parts.",
      "5 parts sont coloriées sur 5 parts égales.",
      "La fraction représentée est 5/5, c’est-à-dire 1."
    ),
    canvas: fractionCanvas({
      model: "bar",
      fraction: {
        numerator: 5,
        denominator: 5,
        label: "5/5 = 1",
      },
    }),
    tags: ["cm2", "fraction", "representer", "unite", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_fraction_representer_fixed_7_superieur_un",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_representer",
    difficulty: 3,
    theme: "neutral",
    text: "La fraction 5/4 est-elle plus grande que l’unité entière ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "4/4 représente une unité entière.",
    explanation: exp(
      "Une fraction peut représenter plus qu’une unité.",
      "On compare le numérateur et le dénominateur.",
      "4/4 vaut 1. Comme 5/4 est plus grand que 4/4, 5/4 est plus grand que 1.",
      "La fraction 5/4 est plus grande que l’unité entière."
    ),
    canvas: numberLineCanvas({
      min: 0,
      max: 2,
      step: 0.25,
      points: [
        {
          value: 5 / 4,
          label: "5/4",
        },
      ],
    }),
    tags: ["cm2", "fraction", "representer", "superieur_un", "droite", "canvas"],
  },

{
  kind: "template",
  id: "cm2_fraction_representer_tpl_1_barre",
  niveau: "cm2",
  matiere: "maths",
  notionId: "fraction",
  microId: "fraction_representer",
  difficulty: 1,
  theme: "neutral",
  hint: "Compte les parts coloriées puis toutes les parts.",
  tags: ["cm2", "fraction", "representer", "barre", "template", "qcm", "canvas"],
  generate: () => {
    const denominator = randomChoice([3, 4, 5, 6, 8]);
    const numerator = randomInt(1, denominator - 1);
    const answer = `${numerator}/${denominator}`;

    const distractors = [
      `${denominator}/${numerator}`, // inverse
      `${Math.min(numerator + 1, denominator)}/${denominator}`, // numérateur faux
      `${numerator}/${Math.max(2, denominator - 1)}`, // dénominateur faux
      `${numerator}/${denominator + 1}`,
      `${Math.max(1, numerator - 1)}/${denominator}`,
    ]
      .filter((choice) => choice !== answer)
      .filter((choice, index, arr) => arr.indexOf(choice) === index)
      .slice(0, 3);

    return {
      text: "Quelle fraction de la barre est coloriée ?",
      format: "qcm",
      choices: shuffle([answer, ...distractors]),
      expected: [answer],
      comparator: "mcq_exact",
      explanation: exp(
        "Une barre peut représenter un tout partagé en parts égales.",
        "On compte les parts coloriées puis les parts totales.",
        `Il y a ${numerator} part(s) coloriée(s) sur ${denominator} parts égales.`,
        `La fraction représentée est ${answer}.`
      ),
      canvas: fractionCanvas({
        model: "bar",
        fraction: {
          numerator,
          denominator,
          label: answer,
        },
        display: {
          showFraction: false,
        },
      }),
    };
  },
},

  {
  kind: "template",
  id: "cm2_fraction_representer_tpl_2_cercle",
  niveau: "cm2",
  matiere: "maths",
  notionId: "fraction",
  microId: "fraction_representer",
  difficulty: 2,
  theme: "neutral",
  hint: "Un cercle peut aussi être partagé en parts égales.",
  tags: ["cm2", "fraction", "representer", "cercle", "template", "qcm", "canvas"],
  generate: () => {
    const denominator = randomChoice([3, 4, 5, 6, 8]);
    const numerator = randomInt(1, denominator - 1);
    const answer = `${numerator}/${denominator}`;

    const wrong1 = `${denominator}/${numerator}`;
    const wrong2 = `${numerator + 1 <= denominator ? numerator + 1 : numerator - 1}/${denominator}`;
    const wrong3 = `${numerator}/${denominator - 1}`;

    return {
      text: "Quelle fraction du disque est coloriée ?",
      format: "qcm",
      choices: shuffle([answer, wrong1, wrong2, wrong3]),
      expected: [answer],
      comparator: "mcq_exact",
      explanation: exp(
        "Un disque peut représenter un tout partagé en parts égales.",
        "On compte les secteurs coloriés puis le nombre total de secteurs.",
        `${numerator} secteur(s) sont colorié(s) sur ${denominator}.`,
        `La fraction représentée est ${answer}.`
      ),
      canvas: fractionCanvas({
        model: "circle",
        fraction: {
          numerator,
          denominator,
          label: answer,
        },
        display: {
          showFraction: false,
        },
      }),
    };
  },
},
{
  kind: "template",
  id: "cm2_fraction_representer_tpl_3_grille",
  niveau: "cm2",
  matiere: "maths",
  notionId: "fraction",
  microId: "fraction_representer",
  difficulty: 2,
  theme: "neutral",
  hint: "Dans une grille, le dénominateur est le nombre total de cases.",
  tags: ["cm2", "fraction", "representer", "grille", "template", "qcm", "canvas"],
  generate: () => {
    const grid = randomChoice([
      { rows: 2, cols: 5 },
      { rows: 3, cols: 4 },
      { rows: 4, cols: 4 },
    ]);

    const total = grid.rows * grid.cols;
    const shaded = randomInt(1, total - 1);
    const answer = `${shaded}/${total}`;

    const distractors = [
      `${total}/${shaded}`, // inverse
      `${Math.min(shaded + 1, total)}/${total}`, // numérateur faux
      `${Math.max(1, shaded - 1)}/${total}`, // autre numérateur faux
      `${shaded}/${total + 1}`, // dénominateur faux
      `${shaded}/${Math.max(2, total - 1)}`, // autre dénominateur faux
    ]
      .filter((choice) => choice !== answer)
      .filter((choice, index, arr) => arr.indexOf(choice) === index)
      .slice(0, 3);

    return {
      text: "Dans la grille, quelle fraction des cases est coloriée ?",
      format: "qcm",
      choices: shuffle([answer, ...distractors]),
      expected: [answer],
      comparator: "mcq_exact",
      explanation: exp(
        "Une grille peut représenter un tout partagé en cases égales.",
        "On compte les cases coloriées puis le nombre total de cases.",
        `Il y a ${shaded} case(s) coloriée(s) sur ${total} cases.`,
        `La fraction représentée est ${answer}.`
      ),
      canvas: fractionCanvas({
        model: "grid",
        grid: {
          rows: grid.rows,
          cols: grid.cols,
          shaded,
        },
      }),
    };
  },
},

  {
    kind: "template",
    id: "cm2_fraction_representer_tpl_4_choisir_fraction",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    hint: "La fraction s’écrit : parts coloriées / parts totales.",
    tags: ["cm2", "fraction", "representer", "qcm", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([4, 5, 6, 8]);
      const numerator = randomInt(1, denominator - 1);
      const correct = `${numerator}/${denominator}`;

      return {
        text: "Quelle fraction correspond à la partie coloriée ?",
        format: "qcm",
        choices: makeChoices(correct, [
          `${denominator}/${numerator}`,
          `${numerator}/${denominator + 1}`,
          `${Math.max(1, numerator - 1)}/${denominator}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour lire une représentation, on écrit parts coloriées sur parts totales.",
          "On compte les parts coloriées et les parts égales du tout.",
          `${numerator} part(s) coloriée(s) sur ${denominator} parts égales.`,
          `La bonne fraction est ${correct}.`
        ),
        canvas: fractionCanvas({
          model: randomChoice(["bar", "circle"] as const),
          fraction: {
            numerator,
            denominator,
            label: correct,
          },
          display: {
            showFraction: false,
          },
        }),
      };
    },
  },

{
  kind: "template",
  id: "cm2_fraction_representer_tpl_5_unite_complete",
  niveau: "cm2",
  matiere: "maths",
  notionId: "fraction",
  microId: "fraction_representer",
  difficulty: 2,
  theme: "neutral",
  hint: "Toutes les parts sont coloriées : le numérateur est égal au dénominateur.",
  tags: ["cm2", "fraction", "representer", "unite", "template", "qcm", "canvas"],
  generate: () => {
    const denominator = randomChoice([3, 4, 5, 6, 8, 10]);
    const answer = `${denominator}/${denominator}`;

    const distractors = [
      `1/${denominator}`,
      `${denominator - 1}/${denominator}`,
      `${denominator}/${denominator + 1}`,
      `${denominator + 1}/${denominator}`,
      "1/1",
    ]
      .filter((choice) => choice !== answer)
      .filter((choice, index, arr) => arr.indexOf(choice) === index)
      .slice(0, 3);

    return {
      text: `Une barre est partagée en ${denominator} parts égales et toutes les parts sont coloriées. Quelle fraction est représentée ?`,
      format: "qcm",
      choices: shuffle([answer, ...distractors]),
      expected: [answer],
      comparator: "mcq_exact",
      explanation: exp(
        "Quand toutes les parts sont coloriées, on représente une unité entière.",
        "On écrit le nombre de parts coloriées sur le nombre total de parts.",
        `${denominator} parts sont coloriées sur ${denominator}.`,
        `La fraction représentée est ${answer}, c’est-à-dire 1.`
      ),
      canvas: fractionCanvas({
        model: "bar",
        fraction: {
          numerator: denominator,
          denominator,
          label: `${answer} = 1`,
        },
      }),
    };
  },
},

  {
    kind: "template",
    id: "cm2_fraction_representer_tpl_6_piege_parts_inegales",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_representer",
    difficulty: 3,
    theme: "neutral",
    hint: "Les parts doivent être égales pour parler de fraction.",
    tags: ["cm2", "fraction", "representer", "piege", "parts_inegales", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([4, 5, 6]);
      const numerator = randomInt(1, denominator - 1);

      return {
        text: `Cette figure représente-t-elle correctement ${numerator}/${denominator} si les parts ne sont pas égales ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction doit représenter des parts égales.",
          "On vérifie d’abord si les parts ont la même taille.",
          "Ici, les parts ne sont pas égales.",
          `La figure ne représente pas correctement ${numerator}/${denominator}.`
        ),
        canvas: fractionCanvas({
          model: "bar",
          fraction: {
            numerator,
            denominator,
            label: `${numerator}/${denominator} ?`,
          },
          display: {
            unequalParts: true,
            showFraction: false,
          },
        }),
      };
    },
  },
    // ============================================================
  // FRACTION_DROITE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_fraction_droite_fixed_1_demi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 1,
    theme: "neutral",
    text: "Sur une droite graduée de 0 à 1, où se place 1/2 ?",
    format: "qcm",
    choices: ["au milieu entre 0 et 1", "sur 0", "sur 1", "après 1"],
    expected: ["au milieu entre 0 et 1"],
    comparator: "mcq_exact",
    hint: "1/2 signifie une moitié de l’unité.",
    explanation: exp(
      "Une fraction peut être placée sur une droite graduée.",
      "On partage l’unité entre 0 et 1 en parts égales.",
      "1/2 correspond à une part sur 2, donc au milieu entre 0 et 1.",
      "1/2 se place au milieu entre 0 et 1."
    ),
    canvas: numberLineCanvas({
      min: 0,
      max: 1,
      step: 0.25,
      points: [
        {
          value: 1 / 2,
          label: "1/2",
        },
      ],
    }),
    tags: ["cm2", "fraction", "droite", "demi", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_fraction_droite_fixed_2_quarts",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 1,
    theme: "neutral",
    text: "Sur une droite de 0 à 1 partagée en 4 parts égales, quelle fraction correspond au troisième trait après 0 ?",
    format: "qcm",
    choices: ["3/4", "1/4", "4/3", "3/3"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Chaque petit intervalle vaut 1/4.",
    explanation: exp(
      "Sur une droite graduée, chaque graduation peut représenter une fraction de l’unité.",
      "Si l’unité est partagée en 4 parts égales, chaque part vaut 1/4.",
      "Le troisième trait après 0 correspond à 3 parts de 1/4.",
      "La fraction est 3/4."
    ),
    canvas: numberLineCanvas({
      min: 0,
      max: 1,
      step: 0.25,
      points: [
        {
          value: 3 / 4,
          label: "3/4",
        },
      ],
    }),
    tags: ["cm2", "fraction", "droite", "quarts", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_fraction_droite_fixed_3_cinquieme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une droite de 0 à 1 partagée en 5 parts égales, où se place 2/5 ?",
    format: "qcm",
    choices: [
      "au deuxième trait après 0",
      "au cinquième trait après 0",
      "sur 1",
      "après 1",
    ],
    expected: ["au deuxième trait après 0"],
    comparator: "mcq_exact",
    hint: "2/5 signifie 2 parts de 1/5.",
    explanation: exp(
      "Une fraction peut indiquer une position sur une droite graduée.",
      "On partage l’unité en autant de parts que le dénominateur.",
      "Pour 2/5, on partage l’unité en 5 parts et on avance de 2 parts.",
      "2/5 se place au deuxième trait après 0."
    ),
    canvas: numberLineCanvas({
      min: 0,
      max: 1,
      step: 0.2,
      points: [
        {
          value: 2 / 5,
          label: "2/5",
        },
      ],
    }),
    tags: ["cm2", "fraction", "droite", "cinquiemes", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_fraction_droite_fixed_4_superieur_un",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 2,
    theme: "neutral",
    text: "La fraction 5/4 se place-t-elle avant ou après 1 ?",
    format: "qcm",
    choices: ["après 1", "avant 1", "sur 0", "sur 1/2"],
    expected: ["après 1"],
    comparator: "mcq_exact",
    hint: "4/4 vaut 1. Donc 5/4 est plus grand que 1.",
    explanation: exp(
      "Une fraction peut être plus grande que 1.",
      "On compare la fraction avec l’unité.",
      "4/4 = 1. Comme 5/4 est plus grand que 4/4, 5/4 est après 1.",
      "5/4 se place après 1."
    ),
    canvas: numberLineCanvas({
      min: 0,
      max: 2,
      step: 0.25,
      points: [
        {
          value: 5 / 4,
          label: "5/4",
        },
      ],
    }),
    tags: ["cm2", "fraction", "droite", "superieur_un", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_fraction_droite_fixed_5_egale_un",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 2,
    theme: "neutral",
    text: "Où se place 4/4 sur une droite graduée ?",
    format: "qcm",
    choices: ["sur 1", "sur 0", "au milieu entre 0 et 1", "après 2"],
    expected: ["sur 1"],
    comparator: "mcq_exact",
    hint: "4/4 signifie toute l’unité.",
    explanation: exp(
      "Quand le numérateur est égal au dénominateur, la fraction vaut 1.",
      "On compare 4/4 avec l’unité.",
      "4/4 représente 4 parts prises sur 4 parts égales, donc l’unité entière.",
      "4/4 se place sur 1."
    ),
    canvas: numberLineCanvas({
      min: 0,
      max: 2,
      step: 0.25,
      points: [
        {
          value: 1,
          label: "4/4",
        },
      ],
    }),
    tags: ["cm2", "fraction", "droite", "unite", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_fraction_droite_fixed_6_entre_entiers",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 3,
    theme: "neutral",
    text: "Entre quels entiers se place la fraction 7/3 ?",
    format: "qcm",
    choices: ["entre 2 et 3", "entre 0 et 1", "entre 1 et 2", "entre 3 et 4"],
    expected: ["entre 2 et 3"],
    comparator: "mcq_exact",
    hint: "3/3 = 1, 6/3 = 2, 9/3 = 3.",
    explanation: exp(
      "Une fraction peut être située entre deux entiers.",
      "On cherche les fractions égales à des entiers autour de 7/3.",
      "6/3 = 2 et 9/3 = 3. Comme 7/3 est entre 6/3 et 9/3, elle est entre 2 et 3.",
      "7/3 se place entre 2 et 3."
    ),
    canvas: numberLineCanvas({
      min: 0,
      max: 3,
      step: 1 / 3,
      points: [
        {
          value: 7 / 3,
          label: "7/3",
        },
      ],
      size: {
        width: 360,
        height: 130,
      },
    }),
    tags: ["cm2", "fraction", "droite", "entre_entiers", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_fraction_droite_fixed_7_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève place 3/4 au troisième trait d’une droite partagée en 3 parts égales. Est-ce correct ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour placer 3/4, l’unité doit être partagée en 4 parts égales.",
    explanation: exp(
      "Pour placer une fraction sur une droite, le dénominateur indique le nombre de parts de l’unité.",
      "On vérifie si l’unité est partagée selon le bon dénominateur.",
      "3/4 demande de partager l’unité en 4 parts égales, pas en 3.",
      "Le placement n’est pas correct."
    ),
    canvas: numberLineCanvas({
      min: 0,
      max: 1,
      step: 1 / 3,
      points: [
        {
          value: 1,
          label: "3e trait",
          color: "#ef4444",
        },
      ],
    }),
    tags: ["cm2", "fraction", "droite", "erreur", "denominateur", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "cm2_fraction_droite_tpl_1_unite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 1,
    theme: "neutral",
    hint: "Le dénominateur indique en combien de parts on partage l’unité.",
    tags: ["cm2", "fraction", "droite", "entre_0_1", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([2, 4, 5, 8, 10]);
      const numerator = randomInt(1, denominator - 1);
      const fraction = `${numerator}/${denominator}`;

      return {
        text: `Sur une droite de 0 à 1 partagée en ${denominator} parts égales, à quel trait se place ${fraction} ?`,
        format: "qcm",
        choices: makeChoices(`au ${numerator}e trait après 0`, [
          `au ${denominator}e trait après 0`,
          "sur 0",
          "après 1",
        ]),
        expected: [`au ${numerator}e trait après 0`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour placer une fraction entre 0 et 1, on partage l’unité en parts égales.",
          "Le dénominateur donne le nombre de parts et le numérateur dit combien de parts on avance.",
          `${fraction} signifie qu’on avance de ${numerator} part(s) quand l’unité est partagée en ${denominator} parts.`,
          `${fraction} se place au ${numerator}e trait après 0.`
        ),
        canvas: numberLineCanvas({
          min: 0,
          max: 1,
          step: 1 / denominator,
          points: [
            {
              value: numerator / denominator,
              label: fraction,
            },
          ],
        }),
      };
    },
  },

{
  kind: "template",
  id: "cm2_fraction_droite_tpl_2_valeur_position",
  niveau: "cm2",
  matiere: "maths",
  notionId: "fraction",
  microId: "fraction_droite",
  difficulty: 2,
  theme: "neutral",
  hint: "Regarde le nombre de parts égales entre 0 et 1.",
  tags: ["cm2", "fraction", "droite", "identifier_position", "template", "qcm", "canvas"],
  generate: () => {
    const denominator = randomChoice([4, 5, 8, 10]);
    const numerator = randomInt(1, denominator - 1);
    const correct = `${numerator}/${denominator}`;

    const distractors = [
      `${numerator + 1}/${denominator}`,
      `${Math.max(1, numerator - 1)}/${denominator}`,
      `1/${denominator}`,
      `${numerator}/${Math.max(2, denominator - 1)}`,
      `${denominator}/${numerator}`,
    ]
      .filter((choice) => choice !== correct)
      .filter((choice, index, arr) => arr.indexOf(choice) === index)
      .slice(0, 3);

    return {
      text: `Une droite de 0 à 1 est partagée en ${denominator} parts égales. Le point est au ${numerator}e trait après 0. Quelle fraction représente-t-il ?`,
      format: "qcm",
      choices: shuffle([correct, ...distractors]),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: exp(
        "Un point sur une droite graduée peut représenter une fraction.",
        "On écrit le numéro du trait sur le nombre total de parts de l’unité.",
        `Le point est au ${numerator}e trait sur ${denominator} parts égales.`,
        `La fraction est ${correct}.`
      ),
      canvas: numberLineCanvas({
        min: 0,
        max: 1,
        step: 1 / denominator,
        points: [
          {
            value: numerator / denominator,
            label: "?",
          },
        ],
      }),
    };
  },
},

  {
    kind: "template",
    id: "cm2_fraction_droite_tpl_3_superieur_un",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 3,
    theme: "neutral",
    hint: "Une fraction dont le numérateur est plus grand que le dénominateur peut dépasser 1.",
    tags: ["cm2", "fraction", "droite", "superieur_un", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([2, 3, 4, 5]);
      const numerator = denominator + randomInt(1, denominator - 1);
      const fraction = `${numerator}/${denominator}`;
      const value = numerator / denominator;

      return {
        text: `La fraction ${fraction} se place-t-elle avant 1, sur 1 ou après 1 ?`,
        format: "qcm",
        choices: ["avant 1", "sur 1", "après 1"],
        expected: ["après 1"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction peut être plus grande que 1.",
          "On compare le numérateur avec le dénominateur.",
          `Comme ${numerator} est plus grand que ${denominator}, ${fraction} est plus grande que 1.`,
          `${fraction} se place après 1.`
        ),
        canvas: numberLineCanvas({
          min: 0,
          max: Math.max(2, Math.ceil(value)),
          step: 1 / denominator,
          points: [
            {
              value,
              label: fraction,
            },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_fraction_droite_tpl_4_egale_un",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 2,
    theme: "neutral",
    hint: "Quand le numérateur et le dénominateur sont égaux, la fraction vaut 1.",
    tags: ["cm2", "fraction", "droite", "unite", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([2, 3, 4, 5, 6, 8, 10]);
      const fraction = `${denominator}/${denominator}`;

      return {
        text: `Où se place ${fraction} sur une droite graduée ?`,
        format: "qcm",
        choices: ["sur 1", "sur 0", "entre 1 et 2", "après 2"],
        expected: ["sur 1"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction est égale à 1 quand le numérateur et le dénominateur sont égaux.",
          "On compare les deux nombres de la fraction.",
          `${fraction} signifie que toutes les parts de l’unité sont prises.`,
          `${fraction} se place sur 1.`
        ),
        canvas: numberLineCanvas({
          min: 0,
          max: 2,
          step: 1 / denominator,
          points: [
            {
              value: 1,
              label: fraction,
            },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_fraction_droite_tpl_5_entre_entiers",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche les multiples du dénominateur autour du numérateur.",
    tags: ["cm2", "fraction", "droite", "entre_entiers", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([2, 3, 4, 5]);
      const integerPart = randomChoice([1, 2, 3]);
      const numerator = integerPart * denominator + randomInt(1, denominator - 1);
      const fraction = `${numerator}/${denominator}`;
      const lower = Math.floor(numerator / denominator);
      const upper = lower + 1;

      return {
        text: `Entre quels entiers se place la fraction ${fraction} ?`,
        format: "qcm",
        choices: makeChoices(`entre ${lower} et ${upper}`, [
          "entre 0 et 1",
          `entre ${upper} et ${upper + 1}`,
          `sur ${lower}`,
        ]),
        expected: [`entre ${lower} et ${upper}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction plus grande que 1 peut se placer entre deux entiers.",
          "On cherche les multiples du dénominateur autour du numérateur.",
          `${lower * denominator}/${denominator} = ${lower} et ${upper * denominator}/${denominator} = ${upper}. ${fraction} est entre les deux.`,
          `${fraction} se place entre ${lower} et ${upper}.`
        ),
        canvas: numberLineCanvas({
          min: 0,
          max: upper,
          step: 1 / denominator,
          points: [
            {
              value: numerator / denominator,
              label: fraction,
            },
          ],
          size: {
            width: 360,
            height: 130,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_fraction_droite_tpl_6_piege_mauvais_partage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 4,
    theme: "neutral",
    hint: "Le dénominateur indique le partage de l’unité.",
    tags: ["cm2", "fraction", "droite", "erreur", "piege", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([4, 5, 8]);
      const wrongDenominator = denominator - 1;
      const numerator = randomInt(1, wrongDenominator);
      const fraction = `${numerator}/${denominator}`;

      return {
        text: `Un élève veut placer ${fraction}, mais il partage l’unité en ${wrongDenominator} parts égales. Est-ce correct ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour placer une fraction, le dénominateur indique en combien de parts égales on partage l’unité.",
          "On vérifie si le partage correspond au dénominateur.",
          `${fraction} demande de partager l’unité en ${denominator} parts égales, pas en ${wrongDenominator}.`,
          "Le placement n’est pas correct."
        ),
        canvas: numberLineCanvas({
          min: 0,
          max: 1,
          step: 1 / wrongDenominator,
          points: [
            {
              value: Math.min(1, numerator / wrongDenominator),
              label: "mauvais",
              color: "#ef4444",
            },
          ],
        }),
      };
    },
  },
]