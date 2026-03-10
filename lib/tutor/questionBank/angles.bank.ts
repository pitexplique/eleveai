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
    id: "angle_compare_qcm_tpl_1",
    notionId: "angles",
    microId: "angle_compare",
    difficulty: 2,
    generate: () => {
      const values = [25, 35, 45, 55, 65, 75, 85, 95];
      const good = values[Math.floor(Math.random() * values.length)];

      const distractors = Array.from(
        new Set([
          good - 10,
          good + 10,
          good + 20,
          good - 20,
        ])
      ).filter((n) => n > 0 && n !== good).slice(0, 3);

      const choices = shuffle([
        `${good}°`,
        ...distractors.map((n) => `${n}°`),
      ]);

      return {
        text: "Choisis l’angle le plus grand.",
        format: "qcm",
        choices,
        expected: [`${Math.max(good, ...distractors)}°`, String(Math.max(good, ...distractors))],
        comparator: "mcq_exact",
      };
    },
    hint: "Compare toutes les mesures proposées.",
  },
];