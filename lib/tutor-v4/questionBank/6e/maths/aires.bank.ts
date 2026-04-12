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

export const airesBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "area_rectangle_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "area_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de 4 cm sur 3 cm ?",
    format: "short",
    expected: ["12", "12 cm²", "12 cm2", "12cm²", "12cm2"],
    explanation: expectedExplanation(["12", "12 cm²", "12 cm2", "12cm²", "12cm2"]),
    comparator: "number_equal",
    hint: "Aire du rectangle = longueur × largeur.",
    tags: ["aires", "rectangle"],
  },
  {
    kind: "fixed",
    id: "area_square_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "area_square",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 5 cm ?",
    format: "short",
    expected: ["25", "25 cm²", "25 cm2", "25cm²", "25cm2"],
    explanation: expectedExplanation(["25", "25 cm²", "25 cm2", "25cm²", "25cm2"]),
    comparator: "number_equal",
    hint: "Aire du carré = côté × côté.",
    tags: ["aires", "carre"],
  },
  {
    kind: "fixed",
    id: "area_rectangle_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "area_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de 6 cm sur 4 cm ?",
    format: "qcm",
    choices: ["10 cm²", "20 cm²", "24 cm²", "28 cm²"],
    expected: ["24 cm²", "24 cm2", "24"],
    explanation: expectedExplanation(["24 cm²", "24 cm2", "24"]),
    comparator: "mcq_exact",
    hint: "Pour l’aire, on multiplie longueur et largeur.",
    tags: ["aires", "rectangle", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_square_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "area_square",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 7 cm ?",
    format: "qcm",
    choices: ["14 cm²", "28 cm²", "49 cm²", "21 cm²"],
    expected: ["49 cm²", "49 cm2", "49"],
    explanation: expectedExplanation(["49 cm²", "49 cm2", "49"]),
    comparator: "mcq_exact",
    hint: "Il faut multiplier le côté par lui-même.",
    tags: ["aires", "carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_rectangle_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "area_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm de longueur et 5 cm de largeur. Quelle est son aire ?",
    format: "qcm",
    choices: ["13 cm²", "26 cm²", "40 cm²", "16 cm²"],
    expected: ["40 cm²", "40 cm2", "40"],
    explanation: expectedExplanation(["40 cm²", "40 cm2", "40"]),
    comparator: "mcq_exact",
    hint: "Attention à ne pas confondre aire et périmètre.",
    tags: ["aires", "rectangle", "confusion", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_square_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "area_square",
    difficulty: 3,
    theme: "neutral",
    text: "Choisis la bonne réponse : l’aire d’un carré de côté 9 cm est...",
    format: "qcm",
    choices: ["18 cm²", "36 cm²", "81 cm²", "27 cm²"],
    expected: ["81 cm²", "81 cm2", "81"],
    explanation: expectedExplanation(["81 cm²", "81 cm2", "81"]),
    comparator: "mcq_exact",
    hint: "Un carré de côté 9 a une aire de 9 × 9.",
    tags: ["aires", "carre", "confusion", "qcm"],
  },
  {
    kind: "template",
    id: "area_rectangle_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "area_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire = longueur × largeur.",
    tags: ["aires", "rectangle", "template"],
    generate: () => {
      const l = [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)];
      const w = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)];
      const a = l * w;

      return {
        text: `Quelle est l’aire d’un rectangle de ${l} cm sur ${w} cm ?`,
        format: "short",
        expected: [String(a), `${a} cm²`, `${a} cm2`, `${a}cm²`, `${a}cm2`],
        explanation: expectedExplanation([String(a), `${a} cm²`, `${a} cm2`, `${a}cm²`, `${a}cm2`]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "area_square_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "area_square",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire du carré = côté × côté.",
    tags: ["aires", "carre", "template"],
    generate: () => {
      const c = [2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 8)];
      const a = c * c;

      return {
        text: `Quelle est l’aire d’un carré de côté ${c} cm ?`,
        format: "short",
        expected: [String(a), `${a} cm²`, `${a} cm2`, `${a}cm²`, `${a}cm2`],
        explanation: expectedExplanation([String(a), `${a} cm²`, `${a} cm2`, `${a}cm²`, `${a}cm2`]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "area_rectangle_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "area_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne confonds pas aire et périmètre.",
    tags: ["aires", "rectangle", "qcm", "template"],
    generate: () => {
      const l = [4, 5, 6, 7, 8][Math.floor(Math.random() * 5)];
      const w = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const good = l * w;
      const distractors = Array.from(
        new Set([l + w, 2 * (l + w), l * 2, w * 2, good + l])
      )
        .filter((n) => n !== good)
        .slice(0, 3);

      const choices = shuffle([
        `${good} cm²`,
        ...distractors.map((n) => `${n} cm²`),
      ]);

      return {
        text: `Un rectangle mesure ${l} cm de longueur et ${w} cm de largeur. Quelle est son aire ?`,
        format: "qcm",
        choices,
        expected: [`${good} cm²`, `${good} cm2`, String(good)],
        explanation: expectedExplanation([`${good} cm²`, `${good} cm2`, String(good)]),
        comparator: "mcq_exact",
      };
    },
  },
  {
    kind: "template",
    id: "area_square_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "area_square",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour un carré, on fait côté × côté.",
    tags: ["aires", "carre", "qcm", "template"],
    generate: () => {
      const c = [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)];
      const good = c * c;
      const distractors = Array.from(
        new Set([c + c, 4 * c, good - c, good + c])
      )
        .filter((n) => n !== good)
        .slice(0, 3);

      const choices = shuffle([
        `${good} cm²`,
        ...distractors.map((n) => `${n} cm²`),
      ]);

      return {
        text: `Quelle est l’aire d’un carré de côté ${c} cm ?`,
        format: "qcm",
        choices,
        expected: [`${good} cm²`, `${good} cm2`, String(good)],
        explanation: expectedExplanation([`${good} cm²`, `${good} cm2`, String(good)]),
        comparator: "mcq_exact",
      };
    },
  },
];
