import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function expectedExplanation(expected: string[]) {
  const answer = expected[0] ?? "";
  return answer
    ? `La bonne réponse attendue est : ${answer}. Relis les données puis compare ton raisonnement.`
    : "Relis les données de l’énoncé et vérifie chaque étape du calcul.";
}


function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export const perimetresBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "perim_square_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le périmètre d’un carré de côté 5 cm ?",
    format: "short",
    expected: ["20", "20 cm", "20cm"],
    explanation: expectedExplanation(["20", "20 cm", "20cm"]),
    comparator: "number_equal",
    hint: "Périmètre du carré = 4 × côté.",
    tags: ["perimetre", "carre"],
  },
  {
    kind: "fixed",
    id: "perim_square_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 1,
    theme: "neutral",
    text: "Un carré a un côté de 7 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["28", "28 cm", "28cm"],
    explanation: expectedExplanation(["28", "28 cm", "28cm"]),
    comparator: "number_equal",
    hint: "Le carré a 4 côtés égaux.",
    tags: ["perimetre", "carre"],
  },
  {
    kind: "fixed",
    id: "perim_square_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le périmètre d’un carré de côté 6 cm ?",
    format: "qcm",
    choices: ["12 cm", "18 cm", "24 cm", "36 cm"],
    expected: ["24 cm", "24cm", "24"],
    explanation: expectedExplanation(["24 cm", "24cm", "24"]),
    comparator: "mcq_exact",
    hint: "Pour le périmètre, on additionne les 4 côtés.",
    tags: ["perimetre", "carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_square_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis la bonne réponse : le périmètre d’un carré de côté 9 cm est...",
    format: "qcm",
    choices: ["18 cm", "27 cm", "36 cm", "81 cm"],
    expected: ["36 cm", "36cm", "36"],
    explanation: expectedExplanation(["36 cm", "36cm", "36"]),
    comparator: "mcq_exact",
    hint: "Attention à ne pas confondre périmètre et aire.",
    tags: ["perimetre", "carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_rectangle_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Un rectangle mesure 3 cm sur 7 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["20", "20 cm", "20cm"],
    explanation: expectedExplanation(["20", "20 cm", "20cm"]),
    comparator: "number_equal",
    hint: "Périmètre du rectangle = 2 × longueur + 2 × largeur.",
    tags: ["perimetre", "rectangle"],
  },
  {
    kind: "fixed",
    id: "perim_rectangle_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Un rectangle mesure 4 cm de largeur et 8 cm de longueur. Quel est son périmètre ?",
    format: "short",
    expected: ["24", "24 cm", "24cm"],
    explanation: expectedExplanation(["24", "24 cm", "24cm"]),
    comparator: "number_equal",
    hint: "Additionne les 4 côtés ou fais 2 × (L + l).",
    tags: ["perimetre", "rectangle"],
  },
  {
    kind: "fixed",
    id: "perim_rectangle_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle mesure 5 cm sur 2 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["7 cm", "10 cm", "14 cm", "20 cm"],
    expected: ["14 cm", "14cm", "14"],
    explanation: expectedExplanation(["14 cm", "14cm", "14"]),
    comparator: "mcq_exact",
    hint: "Il y a 2 longueurs et 2 largeurs.",
    tags: ["perimetre", "rectangle", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_rectangle_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle mesure 6 cm sur 4 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["10 cm", "20 cm", "24 cm", "16 cm"],
    expected: ["20 cm", "20cm", "20"],
    explanation: expectedExplanation(["20 cm", "20cm", "20"]),
    comparator: "mcq_exact",
    hint: "Le périmètre est le tour complet de la figure.",
    tags: ["perimetre", "rectangle", "qcm"],
  },
  {
    kind: "fixed",
    id: "perim_rectangle_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm sur 3 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["11 cm", "22 cm", "24 cm", "48 cm"],
    expected: ["22 cm", "22cm", "22"],
    explanation: expectedExplanation(["22 cm", "22cm", "22"]),
    comparator: "mcq_exact",
    hint: "24 correspond à l’aire, pas au périmètre.",
    tags: ["perimetre", "rectangle", "confusion", "qcm"],
  },
  {
    kind: "template",
    id: "perim_square_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 1,
    theme: "neutral",
    hint: "Le carré a 4 côtés égaux.",
    tags: ["perimetre", "carre", "template"],
    generate: () => {
      const c = [2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 8)];
      const p = c * 4;

      return {
        text: `Quel est le périmètre d’un carré de côté ${c} cm ?`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        explanation: expectedExplanation([String(p), `${p} cm`, `${p}cm`]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "perim_square_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 1,
    theme: "neutral",
    hint: "On additionne les 4 côtés.",
    tags: ["perimetre", "carre", "template"],
    generate: () => {
      const c = [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)];
      const p = c * 4;

      return {
        text: `Un carré a un côté de ${c} cm. Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        explanation: expectedExplanation([String(p), `${p} cm`, `${p}cm`]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "perim_square_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_square",
    difficulty: 2,
    theme: "neutral",
    hint: "Le périmètre n’est pas l’aire.",
    tags: ["perimetre", "carre", "qcm", "template"],
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
        explanation: expectedExplanation([`${good} cm`, `${good}cm`, String(good)]),
        comparator: "mcq_exact",
      };
    },
  },
  {
    kind: "template",
    id: "perim_rectangle_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 1,
    theme: "neutral",
    hint: "Il y a 2 longueurs et 2 largeurs.",
    tags: ["perimetre", "rectangle", "template"],
    generate: () => {
      const l = [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)];
      const w = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const p = 2 * (l + w);

      return {
        text: `Un rectangle mesure ${l} cm sur ${w} cm. Quel est son périmètre ?`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        explanation: expectedExplanation([String(p), `${p} cm`, `${p}cm`]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "perim_rectangle_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 1,
    theme: "neutral",
    hint: "Périmètre = 2 × (longueur + largeur).",
    tags: ["perimetre", "rectangle", "template"],
    generate: () => {
      const l = [4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 6)];
      const w = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const p = 2 * (l + w);

      return {
        text: `Calcule le périmètre d’un rectangle de longueur ${l} cm et de largeur ${w} cm.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        explanation: expectedExplanation([String(p), `${p} cm`, `${p}cm`]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "perim_rectangle_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perim_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention : longueur × largeur donne l’aire.",
    tags: ["perimetre", "rectangle", "qcm", "template"],
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
        expected: [`${good} cm`, `${good}cm`, String(good)],
        explanation: expectedExplanation([`${good} cm`, `${good}cm`, String(good)]),
        comparator: "mcq_exact",
      };
    },
  },
];
