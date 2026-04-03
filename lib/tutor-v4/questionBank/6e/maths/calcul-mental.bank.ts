import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

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
    text: "Calcule : 57 + 8",
    format: "short",
    expected: ["65"],
    comparator: "number_equal",
    hint: "57 + 3 = 60, puis + 5.",
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
    text: "Calcule : 123 + 39",
    format: "short",
    expected: ["162"],
    comparator: "number_equal",
    hint: "123 + 40 = 163, puis enlève 1.",
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
    text: "Calcule : 48 + 7",
    format: "short",
    expected: ["55"],
    comparator: "number_equal",
    hint: "48 + 2 = 50, puis + 5.",
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
    text: "Quel est le résultat de 36 + 9 ?",
    format: "qcm",
    choices: ["44", "45", "46", "47"],
    expected: ["45"],
    comparator: "mcq_exact",
    hint: "36 + 10 = 46, puis enlève 1.",
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
    text: "Calcule : 194 - 7",
    format: "short",
    expected: ["187"],
    comparator: "number_equal",
    hint: "194 - 4 = 190, puis - 3.",
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
    text: "Calcule : 105 - 28",
    format: "short",
    expected: ["77"],
    comparator: "number_equal",
    hint: "105 - 20 = 85, puis - 8.",
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
    text: "Calcule : 98 - 47",
    format: "short",
    expected: ["51"],
    comparator: "number_equal",
    hint: "98 - 40 = 58, puis - 7.",
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
    text: "Quel est le résultat de 63 - 9 ?",
    format: "qcm",
    choices: ["52", "53", "54", "55"],
    expected: ["54"],
    comparator: "mcq_exact",
    hint: "63 - 10 = 53, puis ajoute 1.",
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
    text: "Calcule : 9 × 6",
    format: "short",
    expected: ["54"],
    comparator: "number_equal",
    hint: "Utilise la table de 9.",
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
    text: "Calcule : 24 × 5",
    format: "short",
    expected: ["120"],
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
    text: "Calcule : 12 × 8",
    format: "short",
    expected: ["96"],
    comparator: "number_equal",
    hint: "Utilise la table de 8.",
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
    text: "Quel est le résultat de 7 × 8 ?",
    format: "qcm",
    choices: ["54", "56", "58", "64"],
    expected: ["56"],
    comparator: "mcq_exact",
    hint: "Table de 7 ou de 8.",
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
    text: "Calcule : 732 ÷ 10",
    format: "short",
    expected: ["73,2", "73.2"],
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
    text: "Calcule : 72 ÷ 9",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "9 × 8 = 72.",
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
    text: "Calcule : 84 ÷ 7",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "7 × 12 = 84.",
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
    text: "Quel est le résultat de 60 ÷ 5 ?",
    format: "qcm",
    choices: ["10", "11", "12", "15"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "5 × 12 = 60.",
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
    text: "Donne le quart de 20.",
    format: "short",
    expected: ["5"],
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
    text: "Donne le double de 90.",
    format: "short",
    expected: ["180"],
    comparator: "number_equal",
    hint: "90 + 90.",
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
    text: "Calcule : 7,65 × 10",
    format: "short",
    expected: ["76,5", "76.5"],
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
    text: "Quelle est la moitié de 18 ?",
    format: "qcm",
    choices: ["7", "8", "9", "10"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "18 partagé en 2.",
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
    text: "À la pâtisserie, Isabelle achète un éclair à 3 €, un mille-feuille à 4 € ainsi qu’un fraisier à 37 €. Combien Isabelle va-t-elle payer en tout ?",
    format: "short",
    expected: ["44", "44 €", "44€"],
    comparator: "contains_keyword",
    hint: "Additionne 3 + 4 + 37.",
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
    text: "Un livre contient 98 pages. Tu en as déjà lu 47. Combien de pages te reste-t-il à lire ?",
    format: "short",
    expected: ["51"],
    comparator: "number_equal",
    hint: "Fais 98 - 47.",
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
    text: "72 letchis sont partagés entre 9 enfants. Combien chaque enfant reçoit-il de letchis ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Fais 72 ÷ 9.",
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
    text: "Au cinéma, un film commence à 14 h 20 et dure 1 heure et 43 minutes. À quelle heure se termine-t-il ?",
    format: "short",
    expected: ["16 h 03", "16h03", "16:03", "16 h 3"],
    comparator: "contains_keyword",
    hint: "Ajoute 1 heure puis 43 minutes.",
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
    text: "Dans un verger au Tampon, il y a 12 rangées de 8 arbres. Combien d’arbres y a-t-il en tout ?",
    format: "short",
    expected: ["96"],
    comparator: "number_equal",
    hint: "Fais 12 × 8.",
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
      const a = [27, 38, 46, 57, 68][Math.floor(Math.random() * 5)];
      const b = [4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 6)];
      const sum = a + b;

      return {
        text: `Calcule : ${a} + ${b}`,
        format: "short",
        expected: [String(sum)],
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
      const a = [112, 123, 134, 145][Math.floor(Math.random() * 4)];
      const b = [19, 29, 39][Math.floor(Math.random() * 3)];
      const sum = a + b;

      return {
        text: `Calcule : ${a} + ${b}`,
        format: "short",
        expected: [String(sum)],
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
      const a = [84, 95, 106, 117, 128][Math.floor(Math.random() * 5)];
      const b = [6, 7, 8, 9][Math.floor(Math.random() * 4)];
      const diff = a - b;

      return {
        text: `Calcule : ${a} - ${b}`,
        format: "short",
        expected: [String(diff)],
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
      const a = [95, 105, 115, 125][Math.floor(Math.random() * 4)];
      const b = [18, 27, 36][Math.floor(Math.random() * 3)];
      const diff = a - b;

      return {
        text: `Calcule : ${a} - ${b}`,
        format: "short",
        expected: [String(diff)],
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
      const a = [6, 7, 8, 9, 12][Math.floor(Math.random() * 5)];
      const b = [4, 5, 6, 7, 8][Math.floor(Math.random() * 5)];
      const product = a * b;

      return {
        text: `Calcule : ${a} × ${b}`,
        format: "short",
        expected: [String(product)],
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
      const a = [14, 16, 18, 22, 24][Math.floor(Math.random() * 5)];
      const b = 5;
      const product = a * b;

      return {
        text: `Calcule : ${a} × ${b}`,
        format: "short",
        expected: [String(product)],
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
      const quotient = [6, 7, 8, 9, 10, 12][Math.floor(Math.random() * 6)];
      const dividend = divisor * quotient;

      return {
        text: `Calcule : ${dividend} ÷ ${divisor}`,
        format: "short",
        expected: [String(quotient)],
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
      const values = [125, 248, 376, 540, 732];
      const dividend = values[Math.floor(Math.random() * values.length)];
      const quotient = dividend / 10;

      return {
        text: `Calcule : ${dividend} ÷ 10`,
        format: "short",
        expected: [String(quotient), formatComma(quotient)],
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
        const n = [20, 30, 40, 50, 60, 70, 80, 90][
          Math.floor(Math.random() * 8)
        ];
        return {
          text: `Donne le double de ${n}.`,
          format: "short",
          expected: [String(n * 2)],
          comparator: "number_equal",
        };
      }

      const n = [12, 14, 16, 18, 20, 24, 30, 40][
        Math.floor(Math.random() * 8)
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
        const n = [1.2, 2.5, 3.4, 4.8, 7.65][Math.floor(Math.random() * 5)];
        const answer = n * 10;
        return {
          text: `Calcule : ${formatComma(n)} × 10`,
          format: "short",
          expected: [String(answer), formatComma(answer)],
          comparator: "number_equal",
        };
      }

      const n = [120, 250, 340, 480, 765][Math.floor(Math.random() * 5)];
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
      const a = [3, 4, 5, 6][Math.floor(Math.random() * 4)];
      const b = [12, 15, 18, 20][Math.floor(Math.random() * 4)];
      const total = a + b;

      return {
        text: `Dans un magasin, un cahier coûte ${a} € et une trousse coûte ${b} €. Combien paie-t-on en tout ?`,
        format: "short",
        expected: [String(total), `${total} €`, `${total}€`],
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
      const rows = [6, 8, 9, 12][Math.floor(Math.random() * 4)];
      const perRow = [4, 5, 6, 8][Math.floor(Math.random() * 4)];
      const total = rows * perRow;

      return {
        text: `Dans un verger à La Réunion, il y a ${rows} rangées de ${perRow} arbres. Combien y a-t-il d’arbres en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
      };
    },
  },
];