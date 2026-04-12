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

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

export const calculMentalBank: TutorBankItemV4[] = [
  // =========================
  // MENTAL_ADDITION
  // =========================
  {
    kind: "fixed",
    id: "mental_addition_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 68 + 7",
    format: "short",
    expected: ["75"],
    explanation: expectedExplanation(["75"]),
    comparator: "number_equal",
    hint: "68 + 2 = 70, puis + 5.",
    tags: ["calcul_mental", "addition"],
  },
  {
    kind: "fixed",
    id: "mental_addition_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 134 + 28",
    format: "short",
    expected: ["162"],
    explanation: expectedExplanation(["162"]),
    comparator: "number_equal",
    hint: "134 + 20 = 154, puis + 8.",
    tags: ["calcul_mental", "addition"],
  },
  {
    kind: "fixed",
    id: "mental_addition_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 56 + 8",
    format: "short",
    expected: ["64"],
    explanation: expectedExplanation(["64"]),
    comparator: "number_equal",
    hint: "56 + 4 = 60, puis + 4.",
    tags: ["calcul_mental", "addition"],
  },
  {
    kind: "fixed",
    id: "mental_addition_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le résultat de 45 + 8 ?",
    format: "qcm",
    choices: ["51", "52", "53", "54"],
    expected: ["53"],
    explanation: expectedExplanation(["53"]),
    comparator: "mcq_exact",
    hint: "45 + 5 = 50, puis + 3.",
    tags: ["calcul_mental", "addition", "qcm"],
  },

  // =========================
  // MENTAL_SUBTRACTION
  // =========================
  {
    kind: "fixed",
    id: "mental_subtraction_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_subtraction",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 183 - 6",
    format: "short",
    expected: ["177"],
    explanation: expectedExplanation(["177"]),
    comparator: "number_equal",
    hint: "183 - 3 = 180, puis - 3.",
    tags: ["calcul_mental", "soustraction"],
  },
  {
    kind: "fixed",
    id: "mental_subtraction_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_subtraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 96 - 27",
    format: "short",
    expected: ["69"],
    explanation: expectedExplanation(["69"]),
    comparator: "number_equal",
    hint: "96 - 20 = 76, puis - 7.",
    tags: ["calcul_mental", "soustraction"],
  },
  {
    kind: "fixed",
    id: "mental_subtraction_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_subtraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 121 - 38",
    format: "short",
    expected: ["83"],
    explanation: expectedExplanation(["83"]),
    comparator: "number_equal",
    hint: "121 - 40 = 81, puis ajoute 2.",
    tags: ["calcul_mental", "soustraction"],
  },
  {
    kind: "fixed",
    id: "mental_subtraction_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_subtraction",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le résultat de 72 - 8 ?",
    format: "qcm",
    choices: ["62", "63", "64", "65"],
    expected: ["64"],
    explanation: expectedExplanation(["64"]),
    comparator: "mcq_exact",
    hint: "72 - 2 = 70, puis - 6.",
    tags: ["calcul_mental", "soustraction", "qcm"],
  },

  // =========================
  // MENTAL_MULTIPLICATION
  // =========================
  {
    kind: "fixed",
    id: "mental_multiplication_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 8 × 7",
    format: "short",
    expected: ["56"],
    explanation: expectedExplanation(["56"]),
    comparator: "number_equal",
    hint: "Utilise la table de 8.",
    tags: ["calcul_mental", "multiplication"],
  },
  {
    kind: "fixed",
    id: "mental_multiplication_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 18 × 5",
    format: "short",
    expected: ["90"],
    explanation: expectedExplanation(["90"]),
    comparator: "number_equal",
    hint: "Multiplier par 5, c’est prendre la moitié de ×10.",
    tags: ["calcul_mental", "multiplication"],
  },
  {
    kind: "fixed",
    id: "mental_multiplication_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 11 × 9",
    format: "short",
    expected: ["99"],
    explanation: expectedExplanation(["99"]),
    comparator: "number_equal",
    hint: "Utilise la table de 9.",
    tags: ["calcul_mental", "multiplication"],
  },
  {
    kind: "fixed",
    id: "mental_multiplication_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le résultat de 6 × 8 ?",
    format: "qcm",
    choices: ["46", "48", "52", "54"],
    expected: ["48"],
    explanation: expectedExplanation(["48"]),
    comparator: "mcq_exact",
    hint: "Table de 6 ou de 8.",
    tags: ["calcul_mental", "multiplication", "qcm"],
  },

  // =========================
  // MENTAL_DIVISION
  // =========================
  {
    kind: "fixed",
    id: "mental_division_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_division",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 645 ÷ 10",
    format: "short",
    expected: ["64,5", "64.5"],
    explanation: expectedExplanation(["64,5", "64.5"]),
    comparator: "number_equal",
    hint: "Diviser par 10 décale la virgule d’un rang.",
    tags: ["calcul_mental", "division"],
  },
  {
    kind: "fixed",
    id: "mental_division_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_division",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 63 ÷ 9",
    format: "short",
    expected: ["7"],
    explanation: expectedExplanation(["7"]),
    comparator: "number_equal",
    hint: "9 × 7 = 63.",
    tags: ["calcul_mental", "division"],
  },
  {
    kind: "fixed",
    id: "mental_division_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_division",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 56 ÷ 8",
    format: "short",
    expected: ["7"],
    explanation: expectedExplanation(["7"]),
    comparator: "number_equal",
    hint: "8 × 7 = 56.",
    tags: ["calcul_mental", "division"],
  },
  {
    kind: "fixed",
    id: "mental_division_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_division",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le résultat de 45 ÷ 5 ?",
    format: "qcm",
    choices: ["8", "9", "10", "11"],
    expected: ["9"],
    explanation: expectedExplanation(["9"]),
    comparator: "mcq_exact",
    hint: "5 × 9 = 45.",
    tags: ["calcul_mental", "division", "qcm"],
  },

  // =========================
  // MENTAL_STRATEGIES
  // =========================
  {
    kind: "fixed",
    id: "mental_strategies_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_strategies",
    difficulty: 1,
    theme: "neutral",
    text: "Donne le quart de 28.",
    format: "short",
    expected: ["7"],
    explanation: expectedExplanation(["7"]),
    comparator: "number_equal",
    hint: "Partager en 4 parts égales.",
    tags: ["calcul_mental", "strategie"],
  },
  {
    kind: "fixed",
    id: "mental_strategies_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_strategies",
    difficulty: 1,
    theme: "neutral",
    text: "Donne le double de 70.",
    format: "short",
    expected: ["140"],
    explanation: expectedExplanation(["140"]),
    comparator: "number_equal",
    hint: "70 + 70.",
    tags: ["calcul_mental", "strategie"],
  },
  {
    kind: "fixed",
    id: "mental_strategies_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_strategies",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 4,23 × 10",
    format: "short",
    expected: ["42,3", "42.3"],
    explanation: expectedExplanation(["42,3", "42.3"]),
    comparator: "number_equal",
    hint: "Multiplier par 10 décale la virgule d’un rang.",
    tags: ["calcul_mental", "strategie", "decimaux"],
  },
  {
    kind: "fixed",
    id: "mental_strategies_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_strategies",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la moitié de 26 ?",
    format: "qcm",
    choices: ["12", "13", "14", "15"],
    expected: ["13"],
    explanation: expectedExplanation(["13"]),
    comparator: "mcq_exact",
    hint: "26 partagé en 2.",
    tags: ["calcul_mental", "strategie", "qcm"],
  },

  // =========================
  // MENTAL_DEFIS / PROBLEMES
  // =========================
  {
    kind: "fixed",
    id: "mental_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_defis",
    difficulty: 2,
    theme: "neutral",
    text: "À la boulangerie, Léa achète une tarte à 5 €, un jus à 3 € ainsi qu’un gâteau à 26 €. Combien Léa va-t-elle payer en tout ?",
    format: "short",
    expected: ["34", "34 €", "34€"],
    explanation: expectedExplanation(["34", "34 €", "34€"]),
    comparator: "contains_keyword",
    hint: "Additionne 5 + 3 + 26.",
    tags: ["calcul_mental", "probleme"],
  },
  {
    kind: "fixed",
    id: "mental_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_defis",
    difficulty: 2,
    theme: "neutral",
    text: "Un album contient 87 pages. Tu en as déjà lu 39. Combien de pages te reste-t-il à lire ?",
    format: "short",
    expected: ["48"],
    explanation: expectedExplanation(["48"]),
    comparator: "number_equal",
    hint: "Fais 87 - 39.",
    tags: ["calcul_mental", "probleme", "soustraction"],
  },
  {
    kind: "fixed",
    id: "mental_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_defis",
    difficulty: 2,
    theme: "reunion",
    text: "63 mangues sont partagées entre 9 enfants. Combien chaque enfant reçoit-il de mangues ?",
    format: "short",
    expected: ["7"],
    explanation: expectedExplanation(["7"]),
    comparator: "number_equal",
    hint: "Fais 63 ÷ 9.",
    tags: ["calcul_mental", "probleme", "reunion", "division"],
  },
  {
    kind: "fixed",
    id: "mental_defis_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_defis",
    difficulty: 3,
    theme: "neutral",
    text: "Un spectacle commence à 15 h 35 et dure 1 heure et 25 minutes. À quelle heure se termine-t-il ?",
    format: "short",
    expected: ["17 h 00", "17h00", "17:00", "17 h"],
    explanation: expectedExplanation(["17 h 00", "17h00", "17:00", "17 h"]),
    comparator: "contains_keyword",
    hint: "Ajoute 1 heure puis 25 minutes.",
    tags: ["calcul_mental", "probleme", "heure"],
  },
  {
    kind: "fixed",
    id: "mental_defis_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_defis",
    difficulty: 2,
    theme: "reunion",
    text: "Dans un jardin à Saint-Pierre, il y a 9 rangées de 7 fleurs. Combien de fleurs y a-t-il en tout ?",
    format: "short",
    expected: ["63"],
    explanation: expectedExplanation(["63"]),
    comparator: "number_equal",
    hint: "Fais 9 × 7.",
    tags: ["calcul_mental", "probleme", "reunion", "multiplication"],
  },

  // =========================
  // TEMPLATES - ADDITION
  // =========================
  {
    kind: "template",
    id: "mental_addition_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_addition",
    difficulty: 1,
    theme: "neutral",
    hint: "Passe par la dizaine suivante.",
    tags: ["calcul_mental", "addition", "template"],
    generate: () => {
      const a = [26, 37, 48, 59, 67][Math.floor(Math.random() * 5)];
      const b = [4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 6)];
      const sum = a + b;

      return {
        text: `Calcule : ${a} + ${b}`,
        format: "short",
        expected: [String(sum)],
        explanation: expectedExplanation([String(sum)]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "mental_addition_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "Tu peux ajouter 10 puis corriger.",
    tags: ["calcul_mental", "addition", "template"],
    generate: () => {
      const a = [104, 116, 127, 138][Math.floor(Math.random() * 4)];
      const b = [18, 24, 29][Math.floor(Math.random() * 3)];
      const sum = a + b;

      return {
        text: `Calcule : ${a} + ${b}`,
        format: "short",
        expected: [String(sum)],
        explanation: expectedExplanation([String(sum)]),
        comparator: "number_equal",
      };
    },
  },

  // =========================
  // TEMPLATES - SUBTRACTION
  // =========================
  {
    kind: "template",
    id: "mental_subtraction_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_subtraction",
    difficulty: 1,
    theme: "neutral",
    hint: "Retire d’abord jusqu’à la dizaine.",
    tags: ["calcul_mental", "soustraction", "template"],
    generate: () => {
      const a = [73, 84, 95, 106, 117][Math.floor(Math.random() * 5)];
      const b = [6, 7, 8, 9][Math.floor(Math.random() * 4)];
      const diff = a - b;

      return {
        text: `Calcule : ${a} - ${b}`,
        format: "short",
        expected: [String(diff)],
        explanation: expectedExplanation([String(diff)]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "mental_subtraction_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_subtraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Enlève les dizaines puis les unités.",
    tags: ["calcul_mental", "soustraction", "template"],
    generate: () => {
      const a = [92, 104, 115, 126][Math.floor(Math.random() * 4)];
      const b = [16, 24, 27][Math.floor(Math.random() * 3)];
      const diff = a - b;

      return {
        text: `Calcule : ${a} - ${b}`,
        format: "short",
        expected: [String(diff)],
        explanation: expectedExplanation([String(diff)]),
        comparator: "number_equal",
      };
    },
  },

  // =========================
  // TEMPLATES - MULTIPLICATION
  // =========================
  {
    kind: "template",
    id: "mental_multiplication_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_multiplication",
    difficulty: 1,
    theme: "neutral",
    hint: "Utilise les tables.",
    tags: ["calcul_mental", "multiplication", "template"],
    generate: () => {
      const a = [6, 7, 8, 9, 11][Math.floor(Math.random() * 5)];
      const b = [4, 5, 6, 7, 8][Math.floor(Math.random() * 5)];
      const product = a * b;

      return {
        text: `Calcule : ${a} × ${b}`,
        format: "short",
        expected: [String(product)],
        explanation: expectedExplanation([String(product)]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "mental_multiplication_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_multiplication",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 5, c’est parfois faire ×10 puis ÷2.",
    tags: ["calcul_mental", "multiplication", "template"],
    generate: () => {
      const a = [12, 16, 18, 22, 26][Math.floor(Math.random() * 5)];
      const b = 5;
      const product = a * b;

      return {
        text: `Calcule : ${a} × ${b}`,
        format: "short",
        expected: [String(product)],
        explanation: expectedExplanation([String(product)]),
        comparator: "number_equal",
      };
    },
  },

  // =========================
  // TEMPLATES - DIVISION
  // =========================
  {
    kind: "template",
    id: "mental_division_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_division",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche la table inverse.",
    tags: ["calcul_mental", "division", "template"],
    generate: () => {
      const divisor = [2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 8)];
      const quotient = [5, 6, 7, 8, 9, 10][Math.floor(Math.random() * 6)];
      const dividend = divisor * quotient;

      return {
        text: `Calcule : ${dividend} ÷ ${divisor}`,
        format: "short",
        expected: [String(quotient)],
        explanation: expectedExplanation([String(quotient)]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "mental_division_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_division",
    difficulty: 1,
    theme: "neutral",
    hint: "Avec ÷10, la virgule se déplace.",
    tags: ["calcul_mental", "division", "template", "decimaux"],
    generate: () => {
      const values = [145, 236, 384, 645, 812];
      const dividend = values[Math.floor(Math.random() * values.length)];
      const quotient = dividend / 10;

      return {
        text: `Calcule : ${dividend} ÷ 10`,
        format: "short",
        expected: [String(quotient), formatComma(quotient)],
        explanation: expectedExplanation([String(quotient), formatComma(quotient)]),
        comparator: "number_equal",
      };
    },
  },

  // =========================
  // TEMPLATES - STRATEGIES
  // =========================
  {
    kind: "template",
    id: "mental_strategies_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_strategies",
    difficulty: 1,
    theme: "neutral",
    hint: "Double ou moitié.",
    tags: ["calcul_mental", "strategie", "template"],
    generate: () => {
      const type = Math.random() < 0.5 ? "double" : "moitie";

      if (type === "double") {
        const n = [30, 40, 50, 60, 70, 80, 90][
          Math.floor(Math.random() * 7)
        ];
        return {
          text: `Donne le double de ${n}.`,
          format: "short",
          expected: [String(n * 2)],
          explanation: expectedExplanation([String(n * 2)]),
          comparator: "number_equal",
        };
      }

      const n = [14, 16, 18, 20, 24, 30, 40][
        Math.floor(Math.random() * 7)
      ];
      return {
        text: `Donne la moitié de ${n}.`,
        format: "short",
        expected: [String(n / 2)],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "mental_strategies_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_strategies",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplier ou diviser par 10.",
    tags: ["calcul_mental", "strategie", "template", "decimaux"],
    generate: () => {
      const type = Math.random() < 0.5 ? "times10" : "divide10";

      if (type === "times10") {
        const n = [1.4, 2.7, 3.6, 4.23, 5.8][Math.floor(Math.random() * 5)];
        const answer = n * 10;
        return {
          text: `Calcule : ${formatComma(n)} × 10`,
          format: "short",
          expected: [String(answer), formatComma(answer)],
          explanation: expectedExplanation([String(answer), formatComma(answer)]),
          comparator: "number_equal",
        };
      }

      const n = [140, 270, 360, 423, 580][Math.floor(Math.random() * 5)];
      const answer = n / 10;
      return {
        text: `Calcule : ${n} ÷ 10`,
        format: "short",
        expected: [String(answer), formatComma(answer)],
        comparator: "number_equal",
      };
    },
  },

  // =========================
  // TEMPLATES - PROBLEMES
  // =========================
  {
    kind: "template",
    id: "mental_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_defis",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les deux prix.",
    tags: ["calcul_mental", "probleme", "template"],
    generate: () => {
      const a = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const b = [11, 14, 17, 19][Math.floor(Math.random() * 4)];
      const total = a + b;

      return {
        text: `Dans un magasin, un cahier coûte ${a} € et une trousse coûte ${b} €. Combien paie-t-on en tout ?`,
        format: "short",
        expected: [String(total), `${total} €`, `${total}€`],
        explanation: expectedExplanation([String(total), `${total} €`, `${total}€`]),
        comparator: "contains_keyword",
      };
    },
  },
  {
    kind: "template",
    id: "mental_defis_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_defis",
    difficulty: 2,
    theme: "reunion",
    hint: "Multiplie le nombre de rangées par le nombre d’arbres.",
    tags: ["calcul_mental", "probleme", "template", "reunion"],
    generate: () => {
      const rows = [5, 6, 7, 9][Math.floor(Math.random() * 4)];
      const perRow = [4, 5, 6, 7][Math.floor(Math.random() * 4)];
      const total = rows * perRow;

      return {
        text: `Dans un verger à La Réunion, il y a ${rows} rangées de ${perRow} arbres. Combien y a-t-il d’arbres en tout ?`,
        format: "short",
        expected: [String(total)],
        explanation: expectedExplanation([String(total)]),
        comparator: "number_equal",
      };
    },
  },
];
