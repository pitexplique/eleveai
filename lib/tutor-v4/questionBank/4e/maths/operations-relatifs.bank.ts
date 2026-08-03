// lib/tutor-v4/questionBank/4e/maths/operations-relatifs.bank.ts

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
    notionId: "relatif_operation",
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
    tags: ["relatif", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
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
    tags: ["relatif", "addition", "signe"],
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne en tenant compte des signes.",
    tags: ["relatif", "addition", "template"],
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
    notionId: "relatif_operation",
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
    tags: ["relatif", "addition", "open"],
  },

  // =========================
  // RELATIF_SOUSTRACTION
  // =========================
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
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
    tags: ["relatif", "soustraction"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
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
    tags: ["relatif", "soustraction", "opposé"],
  },
  {
    kind: "template",
    id: "relatif_soustraction_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Soustraire un nombre revient à ajouter son opposé.",
    tags: ["relatif", "soustraction", "template"],
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
    notionId: "relatif_operation",
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
    tags: ["relatif", "soustraction", "open"],
  },

  // =========================
  // RELATIF_MULTIPLICATION
  // =========================
  {
    kind: "fixed",
    id: "relatif_multiplication_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
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
    tags: ["relatif", "multiplication", "signe"],
  },
  {
    kind: "fixed",
    id: "relatif_multiplication_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
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
    tags: ["relatif", "multiplication", "deux_negatifs"],
  },
  {
    kind: "template",
    id: "relatif_multiplication_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 2,
    theme: "neutral",
    hint: "Détermine d’abord le signe, puis multiplie les distances à zéro.",
    tags: ["relatif", "multiplication", "template"],
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
    notionId: "relatif_operation",
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
    tags: ["relatif", "multiplication", "open"],
  },

  // =========================
  // RELATIF_DIVISION
  // =========================
  {
    kind: "fixed",
    id: "relatif_division_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
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
    tags: ["relatif", "division", "signe"],
  },
  {
    kind: "fixed",
    id: "relatif_division_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
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
    tags: ["relatif", "division", "deux_negatifs"],
  },
  {
    kind: "template",
    id: "relatif_division_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 3,
    theme: "neutral",
    hint: "Détermine le signe, puis divise les distances à zéro.",
    tags: ["relatif", "division", "template"],
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
    notionId: "relatif_operation",
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
    tags: ["relatif", "division", "open"],
  },

  // =========================
  // RELATIF_CALCUL
  // =========================
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
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
    tags: ["relatif", "calcul", "priorites"],
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Respecte les priorités opératoires.",
    tags: ["relatif", "calcul", "template"],
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
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par les parenthèses, puis multiplication ou division.",
    tags: ["relatif", "calcul", "priorites", "template"],
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
    notionId: "relatif_operation",
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
    tags: ["relatif", "calcul", "open"],
  },

  // =========================
  // RELATIF_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
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
    tags: ["relatif", "probleme", "temperature"],
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_temperature_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Traduis la situation par une addition de nombres relatifs.",
    tags: ["relatif", "probleme", "temperature", "template"],
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
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Une montée est positive, une descente est négative.",
    tags: ["relatif", "probleme", "reunion", "altitude"],
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
    id: "relatif_operation_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
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
    tags: ["relatif", "defi", "erreur"],
  },
  {
    kind: "template",
    id: "relatif_operation_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Corrige le signe et explique la règle.",
    tags: ["relatif", "defi", "open", "erreur"],
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

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- RELATIF_ADDITION ----------
  {
    kind: "fixed",
    id: "relatif_addition_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : (-8) + (-2)",
    format: "qcm",
    choices: ["-10", "10", "-6", "6"],
    expected: ["-10"],
    comparator: "mcq_exact",
    hint: "Deux nombres négatifs s’additionnent comme deux pertes.",
    explanation:
      "Définition : additionner deux relatifs de même signe garde ce signe.\n\n" +
      "Méthode : les deux sont négatifs, on additionne les distances à zéro.\n\n" +
      "Calcul : 8 + 2 = 10, et le signe reste négatif.\n\n" +
      "Conclusion : (-8) + (-2) = -10.",
    tags: ["relatif", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : 9 + (-4)",
    format: "qcm",
    choices: ["5", "13", "-5", "-13"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "On part de 9 et on recule de 4.",
    explanation:
      "Définition : additionner un négatif revient à reculer sur la droite graduée.\n\n" +
      "Méthode : on retire 4 à 9.\n\n" +
      "Calcul : 9 - 4 = 5.\n\n" +
      "Conclusion : 9 + (-4) = 5.",
    tags: ["relatif", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : (-6) + 6",
    format: "qcm",
    choices: ["0", "12", "-12", "6"],
    expected: ["0"],
    comparator: "mcq_exact",
    hint: "Deux nombres opposés s’annulent.",
    explanation:
      "Définition : deux nombres opposés ont une somme nulle.\n\n" +
      "Méthode : -6 et 6 sont opposés.\n\n" +
      "Calcul : (-6) + 6 = 0.\n\n" +
      "Conclusion : la somme vaut 0.",
    tags: ["relatif", "addition", "oppose", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux nombres négatifs : on additionne et on garde le signe −.",
    tags: ["relatif", "addition", "template"],
    generate: () => {
      const a = -randomInt(2, 12);
      const b = -randomInt(2, 12);
      const result = a + b;
      return {
        text: `Calculer : (${a}) + (${b})`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : additionner deux relatifs de même signe garde ce signe.\n\n" +
          "Méthode : on additionne les distances à zéro et on garde le signe −.\n\n" +
          `Calcul : ${-a} + ${-b} = ${-result}, donc le résultat est ${result}.\n\n` +
          `Conclusion : (${a}) + (${b}) = ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne de gauche à droite.",
    tags: ["relatif", "addition", "trois_termes", "template"],
    generate: () => {
      const a = randomInt(-9, 9);
      const b = randomInt(-9, 9);
      const c = randomInt(-9, 9);
      const result = a + b + c;
      return {
        text: `Calculer : (${a}) + (${b}) + (${c})`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : on additionne plusieurs relatifs en tenant compte des signes.\n\n" +
          "Méthode : on calcule de gauche à droite.\n\n" +
          `Calcul : (${a}) + (${b}) = ${a + b}, puis ${a + b} + (${c}) = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "On compare les distances à zéro et on garde le signe du plus grand.",
    tags: ["relatif", "addition", "signes_contraires", "template"],
    generate: () => {
      const pos = randomInt(2, 12);
      const neg = -randomInt(2, 12);
      const result = pos + neg;
      return {
        text: `Calculer : (${neg}) + ${pos}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : pour additionner deux relatifs de signes contraires, on soustrait les distances à zéro.\n\n" +
          "Méthode : on garde le signe du nombre le plus éloigné de zéro.\n\n" +
          `Calcul : ${pos} et ${-neg} : la différence est ${Math.abs(result)}.\n\n` +
          `Conclusion : (${neg}) + ${pos} = ${result}.`,
      };
    },
  },

  // ---------- RELATIF_SOUSTRACTION ----------
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : (-4) - 3",
    format: "qcm",
    choices: ["-7", "-1", "1", "7"],
    expected: ["-7"],
    comparator: "mcq_exact",
    hint: "On recule encore de 3 à partir de -4.",
    explanation:
      "Définition : soustraire revient à ajouter l’opposé.\n\n" +
      "Méthode : (-4) - 3 = (-4) + (-3).\n\n" +
      "Calcul : (-4) + (-3) = -7.\n\n" +
      "Conclusion : (-4) - 3 = -7.",
    tags: ["relatif", "soustraction", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : (-2) - (-5)",
    format: "qcm",
    choices: ["3", "-7", "-3", "7"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Soustraire -5 revient à ajouter 5.",
    explanation:
      "Définition : soustraire un négatif revient à ajouter son opposé.\n\n" +
      "Méthode : (-2) - (-5) = (-2) + 5.\n\n" +
      "Calcul : (-2) + 5 = 3.\n\n" +
      "Conclusion : (-2) - (-5) = 3.",
    tags: ["relatif", "soustraction", "oppose", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 6 - (-4) revient à effectuer…",
    format: "qcm",
    choices: ["6 + 4", "6 - 4", "-6 - 4", "-6 + 4"],
    expected: ["6 + 4"],
    comparator: "mcq_exact",
    hint: "Soustraire un négatif, c’est ajouter son opposé.",
    explanation:
      "Définition : soustraire un nombre revient à ajouter son opposé.\n\n" +
      "Méthode : l’opposé de -4 est +4.\n\n" +
      "Calcul : 6 - (-4) = 6 + 4.\n\n" +
      "Conclusion : cela revient à calculer 6 + 4.",
    tags: ["relatif", "soustraction", "oppose", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_soustraction_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Transforme la soustraction en addition de l’opposé.",
    tags: ["relatif", "soustraction", "template"],
    generate: () => {
      const a = randomInt(-10, 10);
      const b = randomInt(-10, 10);
      const result = a - b;
      return {
        text: `Calculer : (${a}) - (${b})`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : soustraire revient à ajouter l’opposé.\n\n" +
          `Méthode : (${a}) - (${b}) = (${a}) + (${-b}).\n\n` +
          `Calcul : (${a}) + (${-b}) = ${result}.\n\n` +
          `Conclusion : (${a}) - (${b}) = ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_soustraction_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Soustraire un négatif augmente le résultat.",
    tags: ["relatif", "soustraction", "oppose", "template"],
    generate: () => {
      const a = randomInt(-10, 10);
      const b = -randomInt(2, 10);
      const result = a - b;
      return {
        text: `Calculer : (${a}) - (${b})`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : soustraire un négatif revient à ajouter son opposé.\n\n" +
          `Méthode : (${a}) - (${b}) = (${a}) + ${-b}.\n\n` +
          `Calcul : (${a}) + ${-b} = ${result}.\n\n` +
          `Conclusion : (${a}) - (${b}) = ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_soustraction_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris la chaîne comme des additions d’opposés.",
    tags: ["relatif", "soustraction", "chaine", "template"],
    generate: () => {
      const a = randomInt(-8, 8);
      const b = randomInt(-8, 8);
      const c = randomInt(-8, 8);
      const result = a - b - c;
      return {
        text: `Calculer : (${a}) - (${b}) - (${c})`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : chaque soustraction se transforme en addition de l’opposé.\n\n" +
          "Méthode : on calcule de gauche à droite.\n\n" +
          `Calcul : (${a}) - (${b}) = ${a - b}, puis ${a - b} - (${c}) = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },

  // ---------- RELATIF_MULTIPLICATION ----------
  {
    kind: "fixed",
    id: "relatif_multiplication_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : 6 × (-3)",
    format: "qcm",
    choices: ["-18", "18", "-9", "9"],
    expected: ["-18"],
    comparator: "mcq_exact",
    hint: "Un positif par un négatif donne un négatif.",
    explanation:
      "Définition : le produit de deux nombres de signes contraires est négatif.\n\n" +
      "Méthode : on multiplie les distances à zéro puis on place le signe.\n\n" +
      "Calcul : 6 × 3 = 18, signe négatif.\n\n" +
      "Conclusion : 6 × (-3) = -18.",
    tags: ["relatif", "multiplication", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_multiplication_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : (-7) × (-1)",
    format: "qcm",
    choices: ["7", "-7", "1", "-1"],
    expected: ["7"],
    comparator: "mcq_exact",
    hint: "Deux négatifs donnent un positif ; multiplier par -1 change le signe.",
    explanation:
      "Définition : le produit de deux nombres négatifs est positif.\n\n" +
      "Méthode : multiplier par -1 change le signe.\n\n" +
      "Calcul : (-7) × (-1) = 7.\n\n" +
      "Conclusion : le résultat est 7.",
    tags: ["relatif", "multiplication", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_multiplication_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : (-1) × 9",
    format: "qcm",
    choices: ["-9", "9", "-1", "1"],
    expected: ["-9"],
    comparator: "mcq_exact",
    hint: "Multiplier par -1 change le signe.",
    explanation:
      "Définition : multiplier par -1 donne l’opposé.\n\n" +
      "Méthode : l’opposé de 9 est -9.\n\n" +
      "Calcul : (-1) × 9 = -9.\n\n" +
      "Conclusion : le résultat est -9.",
    tags: ["relatif", "multiplication", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_multiplication_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 2,
    theme: "neutral",
    hint: "Détermine le signe, puis multiplie les distances à zéro.",
    tags: ["relatif", "multiplication", "template"],
    generate: () => {
      const a = randomChoice([-1, 1]) * randomInt(2, 10);
      const b = randomChoice([-1, 1]) * randomInt(2, 10);
      const result = a * b;
      return {
        text: `Calculer : (${a}) × (${b})`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : produit de deux relatifs : même signe → positif, signes contraires → négatif.\n\n" +
          "Méthode : on détermine le signe puis on multiplie les distances à zéro.\n\n" +
          `Calcul : ${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(result)}.\n\n` +
          `Conclusion : (${a}) × (${b}) = ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_multiplication_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 2,
    theme: "neutral",
    hint: "Même signe → positif ; signes contraires → négatif.",
    tags: ["relatif", "multiplication", "signe", "template"],
    generate: () => {
      const a = randomChoice([-1, 1]) * randomInt(2, 9);
      const b = randomChoice([-1, 1]) * randomInt(2, 9);
      const positif = a * b > 0;
      return {
        text: `Sans calculer le résultat, quel est le signe de (${a}) × (${b}) ?`,
        format: "qcm",
        choices: ["positif", "négatif"],
        expected: [positif ? "positif" : "négatif"],
        comparator: "mcq_exact",
        explanation:
          "Définition : le signe d’un produit dépend des signes des facteurs.\n\n" +
          "Méthode : même signe → positif ; signes contraires → négatif.\n\n" +
          `Calcul : les facteurs ont ${positif ? "le même signe" : "des signes contraires"}.\n\n` +
          `Conclusion : le produit est ${positif ? "positif" : "négatif"}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_multiplication_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte le nombre de facteurs négatifs.",
    tags: ["relatif", "multiplication", "trois_facteurs", "template"],
    generate: () => {
      const a = randomChoice([-1, 1]) * randomInt(2, 5);
      const b = randomChoice([-1, 1]) * randomInt(2, 5);
      const c = randomChoice([-1, 1]) * randomInt(2, 5);
      const result = a * b * c;
      return {
        text: `Calculer : (${a}) × (${b}) × (${c})`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : le signe d’un produit dépend du nombre de facteurs négatifs (pair → positif, impair → négatif).\n\n" +
          "Méthode : on calcule pas à pas.\n\n" +
          `Calcul : (${a}) × (${b}) = ${a * b}, puis ${a * b} × (${c}) = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },

  // ---------- RELATIF_DIVISION ----------
  {
    kind: "fixed",
    id: "relatif_division_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : 15 ÷ (-3)",
    format: "qcm",
    choices: ["-5", "5", "-12", "12"],
    expected: ["-5"],
    comparator: "mcq_exact",
    hint: "Signes contraires → quotient négatif.",
    explanation:
      "Définition : le quotient de deux nombres de signes contraires est négatif.\n\n" +
      "Méthode : on divise les distances à zéro, puis on place le signe.\n\n" +
      "Calcul : 15 ÷ 3 = 5, signe négatif.\n\n" +
      "Conclusion : 15 ÷ (-3) = -5.",
    tags: ["relatif", "division", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_division_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : (-18) ÷ (-6)",
    format: "qcm",
    choices: ["3", "-3", "12", "-12"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Deux négatifs → quotient positif.",
    explanation:
      "Définition : le quotient de deux nombres de même signe est positif.\n\n" +
      "Méthode : les deux sont négatifs, le quotient est positif.\n\n" +
      "Calcul : 18 ÷ 6 = 3.\n\n" +
      "Conclusion : (-18) ÷ (-6) = 3.",
    tags: ["relatif", "division", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_division_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : (-24) ÷ 6",
    format: "qcm",
    choices: ["-4", "4", "-18", "18"],
    expected: ["-4"],
    comparator: "mcq_exact",
    hint: "Signes contraires → quotient négatif.",
    explanation:
      "Définition : le quotient de deux nombres de signes contraires est négatif.\n\n" +
      "Méthode : on divise les distances à zéro, puis on place le signe.\n\n" +
      "Calcul : 24 ÷ 6 = 4, signe négatif.\n\n" +
      "Conclusion : (-24) ÷ 6 = -4.",
    tags: ["relatif", "division", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_division_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 3,
    theme: "neutral",
    hint: "Détermine le signe, puis divise les distances à zéro.",
    tags: ["relatif", "division", "template"],
    generate: () => {
      const quotient = randomChoice([-1, 1]) * randomInt(2, 10);
      const divisor = randomChoice([-1, 1]) * randomInt(2, 9);
      const dividend = quotient * divisor;
      return {
        text: `Calculer : (${dividend}) ÷ (${divisor})`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation:
          "Définition : quotient de deux relatifs : même signe → positif, signes contraires → négatif.\n\n" +
          "Méthode : on détermine le signe puis on divise les distances à zéro.\n\n" +
          `Calcul : ${Math.abs(dividend)} ÷ ${Math.abs(divisor)} = ${Math.abs(quotient)}.\n\n` +
          `Conclusion : (${dividend}) ÷ (${divisor}) = ${quotient}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_division_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 3,
    theme: "neutral",
    hint: "Même signe → positif ; signes contraires → négatif.",
    tags: ["relatif", "division", "signe", "template"],
    generate: () => {
      const quotient = randomChoice([-1, 1]) * randomInt(2, 8);
      const divisor = randomChoice([-1, 1]) * randomInt(2, 8);
      const dividend = quotient * divisor;
      const positif = quotient > 0;
      return {
        text: `Sans calculer, quel est le signe de (${dividend}) ÷ (${divisor}) ?`,
        format: "qcm",
        choices: ["positif", "négatif"],
        expected: [positif ? "positif" : "négatif"],
        comparator: "mcq_exact",
        explanation:
          "Définition : le signe d’un quotient suit la règle des signes.\n\n" +
          "Méthode : même signe → positif ; signes contraires → négatif.\n\n" +
          `Calcul : les deux nombres ont ${positif ? "le même signe" : "des signes contraires"}.\n\n` +
          `Conclusion : le quotient est ${positif ? "positif" : "négatif"}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_division_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 3,
    theme: "neutral",
    hint: "Un négatif divisé par un positif reste négatif.",
    tags: ["relatif", "division", "template"],
    generate: () => {
      const quotient = -randomInt(2, 10);
      const divisor = randomInt(2, 8);
      const dividend = quotient * divisor;
      return {
        text: `Calculer : (${dividend}) ÷ ${divisor}`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation:
          "Définition : signes contraires → quotient négatif.\n\n" +
          "Méthode : on divise les distances à zéro, puis on place le signe.\n\n" +
          `Calcul : ${Math.abs(dividend)} ÷ ${divisor} = ${Math.abs(quotient)}, signe négatif.\n\n` +
          `Conclusion : (${dividend}) ÷ ${divisor} = ${quotient}.`,
      };
    },
  },

  // ---------- RELATIF_CALCUL ----------
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Calculer : (-2) × (-3) + (-4)",
    format: "qcm",
    choices: ["2", "-10", "10", "-2"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Commence par la multiplication.",
    explanation:
      "Définition : la multiplication est prioritaire sur l’addition.\n\n" +
      "Méthode : on calcule d’abord (-2) × (-3).\n\n" +
      "Calcul : (-2) × (-3) = 6, puis 6 + (-4) = 2.\n\n" +
      "Conclusion : le résultat est 2.",
    tags: ["relatif", "calcul", "priorites", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Calculer : 10 + (-2) × 3",
    format: "qcm",
    choices: ["4", "24", "-4", "16"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "La multiplication passe avant l’addition.",
    explanation:
      "Définition : la multiplication est prioritaire sur l’addition.\n\n" +
      "Méthode : on calcule d’abord (-2) × 3.\n\n" +
      "Calcul : (-2) × 3 = -6, puis 10 + (-6) = 4.\n\n" +
      "Conclusion : le résultat est 4.",
    tags: ["relatif", "calcul", "priorites", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Effectue la multiplication avant la soustraction.",
    tags: ["relatif", "calcul", "priorites", "template"],
    generate: () => {
      const a = randomChoice([-1, 1]) * randomInt(2, 8);
      const b = randomInt(2, 6);
      const c = randomInt(1, 10);
      const result = a * b - c;
      return {
        text: `Calculer : (${a}) × ${b} - ${c}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : la multiplication est prioritaire sur la soustraction.\n\n" +
          "Méthode : on calcule d’abord le produit.\n\n" +
          `Calcul : (${a}) × ${b} = ${a * b}, puis ${a * b} - ${c} = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "La multiplication passe avant l’addition.",
    tags: ["relatif", "calcul", "priorites", "template"],
    generate: () => {
      const a = randomInt(-10, 10);
      const b = randomChoice([-1, 1]) * randomInt(2, 6);
      const c = randomInt(2, 6);
      const result = a + b * c;
      return {
        text: `Calculer : ${a} + (${b}) × ${c}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : la multiplication est prioritaire sur l’addition.\n\n" +
          `Méthode : on calcule d’abord (${b}) × ${c}.\n\n` +
          `Calcul : (${b}) × ${c} = ${b * c}, puis ${a} + (${b * c}) = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord la parenthèse, puis la division.",
    tags: ["relatif", "calcul", "parentheses", "template"],
    generate: () => {
      const q = randomChoice([-1, 1]) * randomInt(2, 6);
      const divisor = randomChoice([-1, 1]) * randomInt(2, 5);
      const inside = q * divisor;
      const add = randomInt(-6, 6);
      const a = inside - add;
      const result = (a + add) / divisor;
      return {
        text: `Calculer : (${a} ${signed(add)}) ÷ (${divisor})`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : les parenthèses sont prioritaires.\n\n" +
          "Méthode : on calcule la parenthèse, puis on divise.\n\n" +
          `Calcul : ${a} ${signed(add)} = ${a + add}, puis ${a + add} ÷ (${divisor}) = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Parenthèse d’abord, puis multiplication.",
    tags: ["relatif", "calcul", "parentheses", "template"],
    generate: () => {
      const a = randomInt(-8, 8);
      const b = randomInt(-8, 8);
      const k = randomChoice([-1, 1]) * randomInt(2, 5);
      const result = (a - b) * k;
      return {
        text: `Calculer : (${a} - (${b})) × (${k})`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : les parenthèses sont prioritaires.\n\n" +
          "Méthode : on calcule la parenthèse, puis on multiplie.\n\n" +
          `Calcul : ${a} - (${b}) = ${a - b}, puis ${a - b} × (${k}) = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },

  // ---------- RELATIF_PROBLEME ----------
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Un compte bancaire est à -30 €. On y dépose 50 €. Quel est le nouveau solde ?",
    format: "qcm",
    choices: ["20", "-20", "80", "-80"],
    expected: ["20"],
    comparator: "mcq_exact",
    hint: "Calcule -30 + 50.",
    explanation:
      "Définition : un dépôt correspond à une addition.\n\n" +
      "Méthode : on ajoute 50 au solde de départ.\n\n" +
      "Calcul : -30 + 50 = 20.\n\n" +
      "Conclusion : le nouveau solde est 20 €.",
    tags: ["relatif", "probleme", "argent", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Il fait 3 °C, puis la température baisse de 8 °C. Quelle est la température finale ?",
    format: "qcm",
    choices: ["-5", "5", "-11", "11"],
    expected: ["-5"],
    comparator: "mcq_exact",
    hint: "Une baisse correspond à une soustraction.",
    explanation:
      "Définition : une baisse de température correspond à une soustraction.\n\n" +
      "Méthode : on retire 8 à 3.\n\n" +
      "Calcul : 3 - 8 = -5.\n\n" +
      "Conclusion : la température finale est -5 °C.",
    tags: ["relatif", "probleme", "temperature", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_argent_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Un gain est positif, une dépense est négative.",
    tags: ["relatif", "probleme", "argent", "template"],
    generate: () => {
      const start = -randomInt(10, 60);
      const gain = randomInt(20, 100);
      const final = start + gain;
      return {
        text: `Le solde d’un compte est de ${start} €. On dépose ${gain} €. Quel est le nouveau solde ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : un dépôt correspond à une addition de nombres relatifs.\n\n" +
          "Méthode : on ajoute le dépôt au solde.\n\n" +
          `Calcul : ${start} + ${gain} = ${final}.\n\n` +
          `Conclusion : le nouveau solde est ${final} €.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_ecart_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "L’écart se calcule par la plus haute moins la plus basse.",
    tags: ["relatif", "probleme", "temperature", "ecart", "template"],
    generate: () => {
      const high = randomInt(2, 15);
      const low = -randomInt(2, 15);
      const ecart = high - low;
      return {
        text: `Le jour, il fait ${high} °C ; la nuit, il fait ${low} °C. Quel est l’écart de température entre le jour et la nuit ?`,
        format: "short",
        expected: [String(ecart)],
        comparator: "number_equal",
        explanation:
          "Définition : l’écart est la différence entre la valeur la plus haute et la plus basse.\n\n" +
          "Méthode : on soustrait la température la plus basse de la plus haute.\n\n" +
          `Calcul : ${high} - (${low}) = ${ecart}.\n\n` +
          `Conclusion : l’écart est ${ecart} °C.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_altitude_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Sous le niveau de la mer, l’altitude est négative.",
    tags: ["relatif", "probleme", "altitude", "template"],
    generate: () => {
      const depth = -randomInt(20, 200);
      const rise = randomInt(30, 250);
      const final = depth + rise;
      return {
        text: `Un sous-marin est à ${depth} m (sous le niveau de la mer). Il remonte de ${rise} m. À quelle altitude se trouve-t-il ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : remonter correspond à une addition.\n\n" +
          "Méthode : on ajoute la remontée à l’altitude de départ.\n\n" +
          `Calcul : ${depth} + ${rise} = ${final}.\n\n` +
          `Conclusion : il se trouve à ${final} m.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_double_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les deux variations à la valeur de départ.",
    tags: ["relatif", "probleme", "temperature", "double", "template"],
    generate: () => {
      const start = randomInt(-5, 5);
      const v1 = randomChoice([-1, 1]) * randomInt(2, 8);
      const v2 = randomChoice([-1, 1]) * randomInt(2, 8);
      const final = start + v1 + v2;
      return {
        text: `Il fait ${start} °C. La température varie de ${signed(v1)} °C puis de ${signed(v2)} °C. Quelle est la température finale ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : chaque variation s’ajoute à la température.\n\n" +
          "Méthode : on additionne les deux variations à la valeur de départ.\n\n" +
          `Calcul : ${start} ${signed(v1)} = ${start + v1}, puis ${start + v1} ${signed(v2)} = ${final}.\n\n` +
          `Conclusion : la température finale est ${final} °C.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "relatif_probleme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment modéliser par un calcul de relatifs : « il fait -3 °C, la température baisse encore de 5 °C ».",
    format: "open",
    expected: ["addition", "négatif", "-8"],
    comparator: "contains_keyword",
    hint: "Une baisse se traduit par l’ajout d’un nombre négatif.",
    explanation:
      "Définition : une baisse se traduit par l’ajout d’un nombre négatif.\n\n" +
      "Méthode : on écrit -3 + (-5).\n\n" +
      "Calcul : -3 + (-5) = -8.\n\n" +
      "Conclusion : la température finale est -8 °C.",
    tags: ["relatif", "probleme", "open"],
  },

  // ---------- RELATIF_OPERATION_DEFI ----------
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est le signe de (-2) × (-3) × (-1) ?",
    format: "qcm",
    choices: ["négatif", "positif", "nul", "indéterminé"],
    expected: ["négatif"],
    comparator: "mcq_exact",
    hint: "Compte les facteurs négatifs : pair ou impair ?",
    explanation:
      "Définition : un produit est positif si le nombre de facteurs négatifs est pair, négatif s’il est impair.\n\n" +
      "Méthode : on compte les facteurs négatifs.\n\n" +
      "Calcul : il y a 3 facteurs négatifs (impair), donc le produit est négatif (le résultat est -6).\n\n" +
      "Conclusion : le signe est négatif.",
    tags: ["relatif", "defi", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : 5 - (-3) = 2. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Soustraire -3, c’est ajouter 3.",
    explanation:
      "Définition : soustraire un négatif revient à ajouter son opposé.\n\n" +
      "Méthode : 5 - (-3) = 5 + 3.\n\n" +
      "Calcul : 5 + 3 = 8.\n\n" +
      "Conclusion : non, le résultat correct est 8.",
    tags: ["relatif", "defi", "erreur", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Laquelle de ces expressions est égale à un nombre positif ?",
    format: "qcm",
    choices: ["(-4) × (-2)", "(-4) × 2", "(-4) + (-2)", "(-4) - 2"],
    expected: ["(-4) × (-2)"],
    comparator: "mcq_exact",
    hint: "Cherche le produit de deux nombres négatifs.",
    explanation:
      "Définition : le produit de deux négatifs est positif.\n\n" +
      "Méthode : on évalue chaque expression.\n\n" +
      "Calcul : (-4) × (-2) = 8 ; les autres donnent -8, -6 et -6.\n\n" +
      "Conclusion : (-4) × (-2) est positive.",
    tags: ["relatif", "defi", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Calculer : (-1) × (-1) × (-1) × (-1)",
    format: "qcm",
    choices: ["1", "-1", "4", "-4"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Compte le nombre de facteurs négatifs.",
    explanation:
      "Définition : un produit est positif si le nombre de facteurs négatifs est pair.\n\n" +
      "Méthode : il y a 4 facteurs négatifs (pair).\n\n" +
      "Calcul : (-1) × (-1) = 1, et 1 × 1 = 1.\n\n" +
      "Conclusion : le résultat est 1.",
    tags: ["relatif", "defi", "signe", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_operation_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le signe dépend de la parité du nombre de facteurs négatifs.",
    tags: ["relatif", "defi", "signe", "template"],
    generate: () => {
      const nbNeg = randomInt(2, 5);
      const result = nbNeg % 2 === 0 ? "positif" : "négatif";
      return {
        text: `Un produit comporte ${nbNeg} facteurs négatifs (et aucun facteur nul). Quel est le signe de ce produit ?`,
        format: "qcm",
        choices: ["positif", "négatif"],
        expected: [result],
        comparator: "mcq_exact",
        explanation:
          "Définition : un produit est positif si le nombre de facteurs négatifs est pair, négatif s’il est impair.\n\n" +
          "Méthode : on regarde la parité du nombre de facteurs négatifs.\n\n" +
          `Calcul : ${nbNeg} est ${nbNeg % 2 === 0 ? "pair" : "impair"}.\n\n` +
          `Conclusion : le produit est ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_operation_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Respecte les priorités : multiplication avant addition.",
    tags: ["relatif", "defi", "calcul", "template"],
    generate: () => {
      const a = randomChoice([-1, 1]) * randomInt(2, 6);
      const b = randomChoice([-1, 1]) * randomInt(2, 6);
      const c = randomChoice([-1, 1]) * randomInt(2, 6);
      const d = randomInt(1, 8);
      const result = a * b + c * d;
      return {
        text: `Calculer : (${a}) × (${b}) + (${c}) × ${d}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : les multiplications sont prioritaires sur l’addition.\n\n" +
          "Méthode : on calcule les deux produits, puis on additionne.\n\n" +
          `Calcul : (${a}) × (${b}) = ${a * b} et (${c}) × ${d} = ${c * d}, puis ${a * b} + (${c * d}) = ${result}.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment trouver rapidement le signe d’un long produit de nombres relatifs.",
    format: "open",
    expected: ["facteurs négatifs", "pair", "impair"],
    comparator: "contains_keyword",
    hint: "Compte le nombre de facteurs négatifs.",
    explanation:
      "Définition : le signe d’un produit dépend du nombre de facteurs négatifs.\n\n" +
      "Méthode : on compte les facteurs négatifs.\n\n" +
      "Calcul : si ce nombre est pair, le produit est positif ; s’il est impair, il est négatif.\n\n" +
      "Conclusion : on regarde la parité du nombre de facteurs négatifs.",
    tags: ["relatif", "defi", "open"],
  },
];