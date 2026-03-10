import type { BankItem } from "@/lib/tutor/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export const perimetreBank: BankItem[] = [
  {
    kind: "fixed",
    id: "perim_square_fixed_1",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 1,
    text: "Quel est le périmètre d’un carré de côté 5 cm ?",
    format: "short",
    expected: ["20", "20 cm", "20cm"],
    comparator: "number_equal",
    hint: "Périmètre du carré = 4 × côté.",
  },
  {
    kind: "fixed",
    id: "perim_square_fixed_2",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 1,
    text: "Un carré a un côté de 7 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["28", "28 cm", "28cm"],
    comparator: "number_equal",
    hint: "Le carré a 4 côtés égaux.",
  },
  {
    kind: "fixed",
    id: "perim_square_qcm_1",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 2,
    text: "Quel est le périmètre d’un carré de côté 6 cm ?",
    format: "qcm",
    choices: ["12 cm", "18 cm", "24 cm", "36 cm"],
    expected: ["24 cm", "24cm", "24"],
    comparator: "mcq_exact",
    hint: "Pour le périmètre, on additionne les 4 côtés.",
  },
  {
    kind: "fixed",
    id: "perim_square_qcm_2",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 2,
    text: "Choisis la bonne réponse : le périmètre d’un carré de côté 9 cm est...",
    format: "qcm",
    choices: ["18 cm", "27 cm", "36 cm", "81 cm"],
    expected: ["36 cm", "36cm", "36"],
    comparator: "mcq_exact",
    hint: "Attention à ne pas confondre périmètre et aire.",
  },
  {
    kind: "fixed",
    id: "perim_rectangle_fixed_1",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 1,
    text: "Un rectangle mesure 3 cm sur 7 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["20", "20 cm", "20cm"],
    comparator: "number_equal",
    hint: "Périmètre du rectangle = 2 × longueur + 2 × largeur.",
  },
  {
    kind: "fixed",
    id: "perim_rectangle_fixed_2",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 1,
    text: "Un rectangle mesure 4 cm de largeur et 8 cm de longueur. Quel est son périmètre ?",
    format: "short",
    expected: ["24", "24 cm", "24cm"],
    comparator: "number_equal",
    hint: "Additionne les 4 côtés ou fais 2 × (L + l).",
  },
  {
    kind: "fixed",
    id: "perim_rectangle_qcm_1",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 2,
    text: "Un rectangle mesure 5 cm sur 2 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["7 cm", "10 cm", "14 cm", "20 cm"],
    expected: ["14 cm", "14cm", "14"],
    comparator: "mcq_exact",
    hint: "Il y a 2 longueurs et 2 largeurs.",
  },
  {
    kind: "fixed",
    id: "perim_rectangle_qcm_2",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 2,
    text: "Un rectangle mesure 6 cm sur 4 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["10 cm", "20 cm", "24 cm", "16 cm"],
    expected: ["20 cm", "20cm", "20"],
    comparator: "mcq_exact",
    hint: "Le périmètre est le tour complet de la figure.",
  },
  {
    kind: "fixed",
    id: "perim_rectangle_confusion_1",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 3,
    text: "Un rectangle mesure 8 cm sur 3 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["11 cm", "22 cm", "24 cm", "48 cm"],
    expected: ["22 cm", "22cm", "22"],
    comparator: "mcq_exact",
    hint: "24 correspond à l’aire, pas au périmètre.",
  },
  {
    kind: "template",
    id: "perim_square_tpl_1",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 1,
    generate: () => {
      const c = [2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 8)];
      const p = c * 4;

      return {
        text: `Quel est le périmètre d’un carré de côté ${c} cm ?`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
      };
    },
    hint: "Le carré a 4 côtés égaux.",
  },
  {
    kind: "template",
    id: "perim_square_tpl_2",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 1,
    generate: () => {
      const c = [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)];
      const p = c * 4;

      return {
        text: `Un carré a un côté de ${c} cm. Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
      };
    },
    hint: "On additionne les 4 côtés.",
  },
  {
    kind: "template",
    id: "perim_square_qcm_tpl_1",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 2,
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
        expected: [`${good} cm`, `${good}cm`, String(good)],
        comparator: "mcq_exact",
      };
    },
    hint: "Le périmètre n’est pas l’aire.",
  },
  {
    kind: "template",
    id: "perim_rectangle_tpl_1",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 1,
    generate: () => {
      const l = [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)];
      const w = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const p = 2 * (l + w);

      return {
        text: `Un rectangle mesure ${l} cm sur ${w} cm. Quel est son périmètre ?`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
      };
    },
    hint: "Il y a 2 longueurs et 2 largeurs.",
  },
  {
    kind: "template",
    id: "perim_rectangle_tpl_2",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 1,
    generate: () => {
      const l = [4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 6)];
      const w = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const p = 2 * (l + w);

      return {
        text: `Calcule le périmètre d’un rectangle de longueur ${l} cm et de largeur ${w} cm.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
      };
    },
    hint: "Périmètre = 2 × (longueur + largeur).",
  },
  {
    kind: "template",
    id: "perim_rectangle_qcm_tpl_1",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 2,
    generate: () => {
      const l = [4, 5, 6, 7, 8][Math.floor(Math.random() * 5)];
      const w = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const good = 2 * (l + w);

      const distractors = Array.from(
        new Set([
          l + w,
          l * w,
          2 * l + w,
          good + 2,
        ])
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
        expected: [`${good} cm`, `${good}cm`, String(good)],
        comparator: "mcq_exact",
      };
    },
    hint: "Attention : longueur × largeur donne l’aire.",
  },
];