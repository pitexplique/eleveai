// lib/tutor-v4/question-banks/maths/4e/operations-relatifs.bank.ts

/**
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Opérations sur les nombres relatifs
 *
 * Objectifs :
 * - additionner et soustraire des nombres relatifs ;
 * - multiplier et diviser des nombres relatifs ;
 * - utiliser correctement les règles de signes ;
 * - effectuer des calculs avec plusieurs opérations ;
 * - résoudre des problèmes simples avec des températures, gains/pertes, altitudes ;
 * - éviter les erreurs fréquentes : signe oublié, confusion soustraction/opposé, produit de deux négatifs.
 *
 * Organisation :
 * - fixed : ancrage des règles essentielles ;
 * - templates : variation des nombres et des situations ;
 * - open : justification des règles de signes et verbalisation du raisonnement.
 */

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function signed(n: number) {
  return n >= 0 ? `+${n}` : `${n}`;
}

export const operationsRelatifsBank: TutorBankItemV4[] = [
  // =========================
  // RELATIF_ADDITION
  // =========================
  {
    kind: "fixed",
    id: "relatif_addition_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : (-3) + 7",
    format: "qcm",
    choices: ["4", "-4", "10", "-10"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "On part de -3 et on avance de 7.",
    explanation: "(-3) + 7 = 4.",
    tags: ["relatifs", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : (-5) + (-4)",
    format: "qcm",
    choices: ["-9", "9", "-1", "1"],
    expected: ["-9"],
    comparator: "mcq_exact",
    hint: "Deux pertes s’additionnent.",
    explanation: "(-5) + (-4) = -9.",
    tags: ["relatifs", "addition", "signe"],
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne en tenant compte des signes.",
    tags: ["relatifs", "addition", "template"],
    generate: () => {
      const a = randomInt(-12, 12);
      const b = randomInt(-12, 12);
      const result = a + b;

      return {
        text: `Calculer : (${a}) + (${b})`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: `(${a}) + (${b}) = ${result}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "relatif_addition_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi (-5) + (-4) = -9.",
    format: "open",
    expected: ["deux", "négatifs", "-9"],
    comparator: "contains_keyword",
    hint: "Deux nombres négatifs s’additionnent comme deux pertes.",
    explanation:
      "On additionne deux nombres négatifs : les distances à zéro s’additionnent et le résultat reste négatif. Donc (-5) + (-4) = -9.",
    tags: ["relatifs", "addition", "open"],
  },

  // =========================
  // RELATIF_SOUSTRACTION
  // =========================
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_soustraction",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : 6 - 9",
    format: "qcm",
    choices: ["-3", "3", "15", "-15"],
    expected: ["-3"],
    comparator: "mcq_exact",
    hint: "6 - 9 signifie qu’on recule de 9 à partir de 6.",
    explanation: "6 - 9 = -3.",
    tags: ["relatifs", "soustraction"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : 5 - (-3)",
    format: "qcm",
    choices: ["2", "8", "-8", "-2"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Soustraire un nombre négatif revient à ajouter son opposé.",
    explanation: "5 - (-3) = 5 + 3 = 8.",
    tags: ["relatifs", "soustraction", "opposé"],
  },
  {
    kind: "template",
    id: "relatif_soustraction_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Soustraire un nombre revient à ajouter son opposé.",
    tags: ["relatifs", "soustraction", "template"],
    generate: () => {
      const a = randomInt(-10, 12);
      const b = randomInt(-10, 12);
      const result = a - b;

      return {
        text: `Calculer : (${a}) - (${b})`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: `(${a}) - (${b}) = ${a} + (${-b}) = ${result}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 5 - (-3) = 8.",
    format: "open",
    expected: ["soustraire", "négatif", "ajouter", "opposé"],
    comparator: "contains_keyword",
    hint: "Transformer la soustraction en addition.",
    explanation:
      "Soustraire -3 revient à ajouter son opposé, donc 5 - (-3) = 5 + 3 = 8.",
    tags: ["relatifs", "soustraction", "open"],
  },

  // =========================
  // RELATIF_MULTIPLICATION
  // =========================
  {
    kind: "fixed",
    id: "relatif_multiplication_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : (-4) × 3",
    format: "qcm",
    choices: ["-12", "12", "-7", "7"],
    expected: ["-12"],
    comparator: "mcq_exact",
    hint: "Un négatif multiplié par un positif donne un négatif.",
    explanation: "(-4) × 3 = -12.",
    tags: ["relatifs", "multiplication", "signe"],
  },
  {
    kind: "fixed",
    id: "relatif_multiplication_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : (-5) × (-2)",
    format: "qcm",
    choices: ["10", "-10", "7", "-7"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Le produit de deux nombres négatifs est positif.",
    explanation: "(-5) × (-2) = 10.",
    tags: ["relatifs", "multiplication", "deux_negatifs"],
  },
  {
    kind: "template",
    id: "relatif_multiplication_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_multiplication",
    difficulty: 2,
    theme: "neutral",
    hint: "Détermine d’abord le signe, puis multiplie les distances à zéro.",
    tags: ["relatifs", "multiplication", "template"],
    generate: () => {
      const a = randomChoice([-1, 1]) * randomInt(2, 9);
      const b = randomChoice([-1, 1]) * randomInt(2, 9);
      const result = a * b;

      return {
        text: `Calculer : (${a}) × (${b})`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: `(${a}) × (${b}) = ${result}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "relatif_multiplication_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi le produit de deux nombres négatifs est positif.",
    format: "open",
    expected: ["deux", "négatifs", "positif"],
    comparator: "contains_keyword",
    hint: "Pense à la règle des signes.",
    explanation:
      "D’après la règle des signes, le produit de deux nombres de même signe est positif. Deux nombres négatifs ont le même signe, donc leur produit est positif.",
    tags: ["relatifs", "multiplication", "open"],
  },

  // =========================
  // RELATIF_DIVISION
  // =========================
  {
    kind: "fixed",
    id: "relatif_division_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_division",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : (-12) ÷ 3",
    format: "qcm",
    choices: ["-4", "4", "-9", "9"],
    expected: ["-4"],
    comparator: "mcq_exact",
    hint: "Un négatif divisé par un positif donne un négatif.",
    explanation: "(-12) ÷ 3 = -4.",
    tags: ["relatifs", "division", "signe"],
  },
  {
    kind: "fixed",
    id: "relatif_division_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_division",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : (-20) ÷ (-5)",
    format: "qcm",
    choices: ["4", "-4", "15", "-15"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Deux nombres négatifs donnent un quotient positif.",
    explanation: "(-20) ÷ (-5) = 4.",
    tags: ["relatifs", "division", "deux_negatifs"],
  },
  {
    kind: "template",
    id: "relatif_division_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_division",
    difficulty: 3,
    theme: "neutral",
    hint: "Détermine le signe, puis divise les distances à zéro.",
    tags: ["relatifs", "division", "template"],
    generate: () => {
      const quotient = randomChoice([-1, 1]) * randomInt(2, 9);
      const divisor = randomChoice([-1, 1]) * randomInt(2, 9);
      const dividend = quotient * divisor;

      return {
        text: `Calculer : (${dividend}) ÷ (${divisor})`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation: `(${dividend}) ÷ (${divisor}) = ${quotient}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "relatif_division_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_division",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment déterminer le signe d’un quotient de deux nombres relatifs.",
    format: "open",
    expected: ["même signe", "positif", "signes différents", "négatif"],
    comparator: "contains_keyword",
    hint: "C’est la même règle que pour le produit.",
    explanation:
      "Si les deux nombres ont le même signe, le quotient est positif. S’ils ont des signes différents, le quotient est négatif.",
    tags: ["relatifs", "division", "open"],
  },

  // =========================
  // RELATIF_CALCUL
  // =========================
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Calculer : (-3) × 4 + 5",
    format: "qcm",
    choices: ["-7", "17", "-17", "7"],
    expected: ["-7"],
    comparator: "mcq_exact",
    hint: "Commence par la multiplication.",
    explanation: "(-3) × 4 + 5 = -12 + 5 = -7.",
    tags: ["relatifs", "calcul", "priorites"],
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Respecte les priorités opératoires.",
    tags: ["relatifs", "calcul", "template"],
    generate: () => {
      const a = randomChoice([-1, 1]) * randomInt(2, 8);
      const b = randomInt(2, 6);
      const c = randomChoice([-1, 1]) * randomInt(1, 10);
      const result = a * b + c;

      return {
        text: `Calculer : (${a}) × ${b} ${signed(c)}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: `(${a}) × ${b} ${signed(c)} = ${a * b} ${signed(c)} = ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par les parenthèses, puis multiplication ou division.",
    tags: ["relatifs", "calcul", "priorites", "template"],
    generate: () => {
      const a = randomInt(-8, 8);
      const b = randomInt(-8, 8);
      const k = randomChoice([-1, 1]) * randomInt(2, 5);
      const result = (a + b) * k;

      return {
        text: `Calculer : (${a} ${signed(b)}) × (${k})`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: `On calcule d’abord la parenthèse : ${a} ${signed(b)} = ${a + b}. Puis ${a + b} × (${k}) = ${result}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "relatif_calcul_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi dans (-3) × 4 + 5, il faut commencer par la multiplication.",
    format: "open",
    expected: ["priorité", "multiplication", "addition"],
    comparator: "contains_keyword",
    hint: "Pense aux priorités opératoires.",
    explanation:
      "La multiplication est prioritaire sur l’addition. On calcule donc d’abord (-3) × 4 = -12, puis -12 + 5 = -7.",
    tags: ["relatifs", "calcul", "open"],
  },

  // =========================
  // RELATIF_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Il fait -2 °C le matin. La température augmente de 7 °C. Quelle est la température finale ?",
    format: "qcm",
    choices: ["5", "-5", "9", "-9"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Calcule -2 + 7.",
    explanation: "-2 + 7 = 5. La température finale est 5 °C.",
    tags: ["relatifs", "probleme", "temperature"],
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_temperature_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Traduis la situation par une addition de nombres relatifs.",
    tags: ["relatifs", "probleme", "temperature", "template"],
    generate: () => {
      const start = -randomInt(1, 8);
      const change = randomChoice([-1, 1]) * randomInt(2, 10);
      const final = start + change;

      return {
        text: `Il fait ${start} °C. La température varie de ${change} °C. Quelle est la température finale ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation: `On calcule ${start} ${signed(change)} = ${final}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_reunion_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Une montée est positive, une descente est négative.",
    tags: ["relatifs", "probleme", "reunion", "altitude"],
    generate: () => {
      const altitude = randomInt(300, 1200);
      const descent = randomInt(100, 400);
      const final = altitude - descent;

      return {
        text: `À La Réunion, un randonneur est à ${altitude} m d’altitude puis descend de ${descent} m. À quelle altitude arrive-t-il ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation: `Il descend, donc on soustrait : ${altitude} - ${descent} = ${final}.`,
      };
    },
  },

  // =========================
  // RELATIF_DEFIS_OPS
  // =========================
  {
    kind: "fixed",
    id: "relatif_defis_ops_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_defis_ops",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme que (-4) × (-3) = -12. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Regarde la règle des signes pour deux nombres négatifs.",
    explanation:
      "Non. Le produit de deux nombres négatifs est positif : (-4) × (-3) = 12.",
    tags: ["relatifs", "defi", "erreur"],
  },
  {
    kind: "template",
    id: "relatif_defis_ops_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "operations_relatifs",
    microId: "relatif_defis_ops",
    difficulty: 5,
    theme: "neutral",
    hint: "Corrige le signe et explique la règle.",
    tags: ["relatifs", "defi", "open", "erreur"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const result = a * b;

      return {
        text: `Un élève écrit : (-${a}) × (-${b}) = -${result}. Explique son erreur.`,
        format: "open",
        expected: ["deux", "négatifs", "positif", String(result)],
        comparator: "contains_keyword",
        explanation: `L’erreur porte sur le signe : le produit de deux nombres négatifs est positif. Donc (-${a}) × (-${b}) = ${result}.`,
      };
    },
  },
];