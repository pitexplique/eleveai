import type { BankItem } from "@/lib/tutor/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export const anglesBank: BankItem[] = [
  {
    kind: "fixed",
    id: "angle_right_fixed_1",
    notionId: "angles",
    microId: "angle_right",
    difficulty: 1,
    text: "Un angle droit mesure combien de degrés ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Le coin d'un carré mesure 90°.",
  },
  {
    kind: "fixed",
    id: "angle_right_fixed_2",
    notionId: "angles",
    microId: "angle_right",
    difficulty: 1,
    text: "Complète : un angle droit mesure ___ degrés.",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Un angle droit vaut toujours 90°.",
  },
  {
    kind: "fixed",
    id: "angle_right_fixed_3",
    notionId: "angles",
    microId: "angle_right",
    difficulty: 1,
    text: "Quelle est la mesure d’un angle droit ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Toujours 90°.",
  },
  {
    kind: "fixed",
    id: "angle_right_qcm_1",
    notionId: "angles",
    microId: "angle_right",
    difficulty: 2,
    text: "Parmi ces mesures, laquelle correspond à un angle droit ?",
    format: "qcm",
    choices: ["45°", "90°", "100°", "180°"],
    expected: ["90°", "90"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
  },
  {
    kind: "fixed",
    id: "angle_right_qcm_2",
    notionId: "angles",
    microId: "angle_right",
    difficulty: 2,
    text: "Choisis la mesure d’un angle droit.",
    format: "qcm",
    choices: ["60°", "90°", "120°", "150°"],
    expected: ["90°", "90"],
    comparator: "mcq_exact",
    hint: "Le bon choix est 90°.",
  },
  {
    kind: "fixed",
    id: "angle_compare_fixed_1",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 1,
    text: "Quel angle est le plus grand : 30° ou 80° ?",
    format: "short",
    expected: ["80", "80°"],
    comparator: "number_equal",
    hint: "Compare les nombres.",
  },
  {
    kind: "fixed",
    id: "angle_compare_fixed_2",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 1,
    text: "Quel angle est le plus petit : 120° ou 70° ?",
    format: "short",
    expected: ["70", "70°"],
    comparator: "number_equal",
    hint: "Le plus petit angle a la plus petite mesure.",
  },
  {
    kind: "fixed",
    id: "angle_compare_fixed_3",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 1,
    text: "Quel angle est le plus grand : 45° ou 95° ?",
    format: "short",
    expected: ["95", "95°"],
    comparator: "number_equal",
    hint: "Cherche la plus grande mesure.",
  },
  {
    kind: "fixed",
    id: "angle_compare_fixed_4",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 1,
    text: "Quel angle est le plus petit : 85° ou 55° ?",
    format: "short",
    expected: ["55", "55°"],
    comparator: "number_equal",
    hint: "Compare les deux nombres.",
  },
  {
    kind: "fixed",
    id: "angle_compare_qcm_1",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 2,
    text: "Quel angle est le plus grand ?",
    format: "qcm",
    choices: ["25°", "65°", "85°", "45°"],
    expected: ["85°", "85"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre.",
  },
  {
    kind: "fixed",
    id: "angle_compare_qcm_2",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 2,
    text: "Quel angle est le plus petit ?",
    format: "qcm",
    choices: ["110°", "95°", "70°", "100°"],
    expected: ["70°", "70"],
    comparator: "mcq_exact",
    hint: "Cherche le plus petit nombre.",
  },
  {
    kind: "fixed",
    id: "angle_compare_qcm_3",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 2,
    text: "Choisis l’angle le plus grand.",
    format: "qcm",
    choices: ["40°", "75°", "55°", "65°"],
    expected: ["75°", "75"],
    comparator: "mcq_exact",
    hint: "Compare les quatre mesures.",
  },
  {
    kind: "fixed",
    id: "angle_compare_qcm_4",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 2,
    text: "Choisis l’angle le plus petit.",
    format: "qcm",
    choices: ["35°", "25°", "45°", "30°"],
    expected: ["25°", "25"],
    comparator: "mcq_exact",
    hint: "L’angle le plus petit a la mesure la plus petite.",
  },
  {
    kind: "fixed",
    id: "angle_nature_fixed_1",
    notionId: "angles",
    microId: "angle_nature",
    difficulty: 2,
    text: "Un angle de 45° est-il plus petit ou plus grand qu’un angle droit ?",
    format: "short",
    expected: ["plus petit", "petit"],
    comparator: "contains_keyword",
    hint: "Un angle droit mesure 90°.",
  },
  {
    kind: "fixed",
    id: "angle_nature_fixed_2",
    notionId: "angles",
    microId: "angle_nature",
    difficulty: 2,
    text: "Un angle de 120° est-il plus petit ou plus grand qu’un angle droit ?",
    format: "short",
    expected: ["plus grand", "grand"],
    comparator: "contains_keyword",
    hint: "Compare 120° à 90°.",
  },
  {
    kind: "fixed",
    id: "angle_nature_qcm_1",
    notionId: "angles",
    microId: "angle_nature",
    difficulty: 2,
    text: "Un angle de 60° est :",
    format: "qcm",
    choices: [
      "plus petit qu’un angle droit",
      "égal à un angle droit",
      "plus grand qu’un angle droit",
      "impossible à savoir",
    ],
    expected: ["plus petit qu’un angle droit"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
  },
  {
    kind: "fixed",
    id: "angle_nature_qcm_2",
    notionId: "angles",
    microId: "angle_nature",
    difficulty: 2,
    text: "Un angle de 100° est :",
    format: "qcm",
    choices: [
      "plus petit qu’un angle droit",
      "égal à un angle droit",
      "plus grand qu’un angle droit",
      "nul",
    ],
    expected: ["plus grand qu’un angle droit"],
    comparator: "mcq_exact",
    hint: "Compare 100° à 90°.",
  },

  {
    kind: "template",
    id: "angle_right_tpl_1",
    notionId: "angles",
    microId: "angle_right",
    difficulty: 1,
    generate: () => {
      return {
        text: "Combien mesure un angle droit ?",
        format: "short",
        expected: ["90", "90°"],
        comparator: "number_equal",
      };
    },
    hint: "Toujours 90°.",
  },
  {
    kind: "template",
    id: "angle_right_tpl_2",
    notionId: "angles",
    microId: "angle_right",
    difficulty: 1,
    generate: () => {
      return {
        text: "Quelle est la mesure d’un angle droit ?",
        format: "short",
        expected: ["90", "90°"],
        comparator: "number_equal",
      };
    },
    hint: "Un angle droit ne change jamais de mesure.",
  },
  {
    kind: "template",
    id: "angle_right_qcm_tpl_1",
    notionId: "angles",
    microId: "angle_right",
    difficulty: 2,
    generate: () => {
      const choices = shuffle(["90°", "60°", "120°", "180°"]);
      return {
        text: "Choisis la mesure d’un angle droit.",
        format: "qcm",
        choices,
        expected: ["90°", "90"],
        comparator: "mcq_exact",
      };
    },
    hint: "Un angle droit mesure 90°.",
  },
  {
    kind: "template",
    id: "angle_right_qcm_tpl_2",
    notionId: "angles",
    microId: "angle_right",
    difficulty: 2,
    generate: () => {
      const choices = shuffle(["45°", "90°", "135°", "150°"]);
      return {
        text: "Parmi ces angles, lequel est un angle droit ?",
        format: "qcm",
        choices,
        expected: ["90°", "90"],
        comparator: "mcq_exact",
      };
    },
    hint: "Cherche 90°.",
  },
  {
    kind: "template",
    id: "angle_compare_tpl_1",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 1,
    generate: () => {
      const values = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
      const a = values[Math.floor(Math.random() * values.length)];
      let b = values[Math.floor(Math.random() * values.length)];

      while (b === a) {
        b = values[Math.floor(Math.random() * values.length)];
      }

      const max = Math.max(a, b);

      return {
        text: `Quel angle est le plus grand : ${a}° ou ${b}° ?`,
        format: "short",
        expected: [String(max), `${max}°`],
        comparator: "number_equal",
      };
    },
    hint: "L’angle le plus grand a la plus grande mesure.",
  },
  {
    kind: "template",
    id: "angle_compare_tpl_2",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 1,
    generate: () => {
      const values = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
      const a = values[Math.floor(Math.random() * values.length)];
      let b = values[Math.floor(Math.random() * values.length)];

      while (b === a) {
        b = values[Math.floor(Math.random() * values.length)];
      }

      const min = Math.min(a, b);

      return {
        text: `Quel angle est le plus petit : ${a}° ou ${b}° ?`,
        format: "short",
        expected: [String(min), `${min}°`],
        comparator: "number_equal",
      };
    },
    hint: "L’angle le plus petit a la plus petite mesure.",
  },
  {
    kind: "template",
    id: "angle_compare_tpl_3",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 1,
    generate: () => {
      const values = [25, 35, 45, 55, 65, 75, 85];
      const a = values[Math.floor(Math.random() * values.length)];
      let b = values[Math.floor(Math.random() * values.length)];

      while (b === a) {
        b = values[Math.floor(Math.random() * values.length)];
      }

      const max = Math.max(a, b);

      return {
        text: `Entre ${a}° et ${b}°, quel angle est le plus grand ?`,
        format: "short",
        expected: [String(max), `${max}°`],
        comparator: "number_equal",
      };
    },
    hint: "Compare simplement les deux mesures.",
  },
  {
    kind: "template",
    id: "angle_compare_qcm_tpl_1",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 2,
    generate: () => {
      const values = [25, 35, 45, 55, 65, 75, 85, 95];
      const all = shuffle(values).slice(0, 4);
      const good = Math.max(...all);

      const choices = shuffle(all.map((n) => `${n}°`));

      return {
        text: "Choisis l’angle le plus grand.",
        format: "qcm",
        choices,
        expected: [`${good}°`, String(good)],
        comparator: "mcq_exact",
      };
    },
    hint: "Compare toutes les mesures proposées.",
  },
  {
    kind: "template",
    id: "angle_compare_qcm_tpl_2",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 2,
    generate: () => {
      const values = [20, 30, 40, 50, 60, 70, 80, 90];
      const all = shuffle(values).slice(0, 4);
      const good = Math.min(...all);

      const choices = shuffle(all.map((n) => `${n}°`));

      return {
        text: "Choisis l’angle le plus petit.",
        format: "qcm",
        choices,
        expected: [`${good}°`, String(good)],
        comparator: "mcq_exact",
      };
    },
    hint: "Cherche la plus petite mesure.",
  },
  {
    kind: "template",
    id: "angle_nature_tpl_1",
    notionId: "angles",
    microId: "angle_nature",
    difficulty: 2,
    generate: () => {
      const value = [30, 40, 50, 60, 70, 80][Math.floor(Math.random() * 6)];

      return {
        text: `Un angle de ${value}° est-il plus petit ou plus grand qu’un angle droit ?`,
        format: "short",
        expected: ["plus petit", "petit"],
        comparator: "contains_keyword",
      };
    },
    hint: "Compare à 90°.",
  },
  {
    kind: "template",
    id: "angle_nature_tpl_2",
    notionId: "angles",
    microId: "angle_nature",
    difficulty: 2,
    generate: () => {
      const value = [100, 110, 120, 130, 140][Math.floor(Math.random() * 5)];

      return {
        text: `Un angle de ${value}° est-il plus petit ou plus grand qu’un angle droit ?`,
        format: "short",
        expected: ["plus grand", "grand"],
        comparator: "contains_keyword",
      };
    },
    hint: "Compare ${value}° à 90°.",
  },
  {
    kind: "template",
    id: "angle_nature_qcm_tpl_1",
    notionId: "angles",
    microId: "angle_nature",
    difficulty: 2,
    generate: () => {
      const value = [35, 45, 55, 65, 75, 85][Math.floor(Math.random() * 6)];

      return {
        text: `Un angle de ${value}° est :`,
        format: "qcm",
        choices: shuffle([
          "plus petit qu’un angle droit",
          "égal à un angle droit",
          "plus grand qu’un angle droit",
          "plat",
        ]),
        expected: ["plus petit qu’un angle droit"],
        comparator: "mcq_exact",
      };
    },
    hint: "Tous les angles inférieurs à 90° sont plus petits qu’un angle droit.",
  },
  {
    kind: "template",
    id: "angle_nature_qcm_tpl_2",
    notionId: "angles",
    microId: "angle_nature",
    difficulty: 2,
    generate: () => {
      const value = [95, 105, 115, 125, 135][Math.floor(Math.random() * 5)];

      return {
        text: `Un angle de ${value}° est :`,
        format: "qcm",
        choices: shuffle([
          "plus petit qu’un angle droit",
          "égal à un angle droit",
          "plus grand qu’un angle droit",
          "nul",
        ]),
        expected: ["plus grand qu’un angle droit"],
        comparator: "mcq_exact",
      };
    },
    hint: "Tous les angles supérieurs à 90° sont plus grands qu’un angle droit.",
  },
];