import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function signed(n: number): string {
  return n >= 0 ? `+${n}` : `${n}`;
}

function withParens(n: number): string {
  return `(${signed(n)})`;
}

function asExpectedNumber(n: number): string[] {
  return [String(n), signed(n)];
}

export const operationsRelatifsBank: TutorBankItemV4[] = [
  // =========================
  // RELATIF_ADDITION
  // =========================
  {
    kind: "fixed",
    id: "relatif_addition_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 3 + 2",
    format: "short",
    expected: ["5", "+5"],
    comparator: "number_equal",
    hint: "Additionne deux nombres positifs.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("3 + 2 = 5.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "addition"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : -4 + (-3)",
    format: "short",
    expected: ["-7"],
    comparator: "number_equal",
    hint: "Quand les deux nombres sont négatifs, on additionne les distances à 0 et on garde le signe -.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-4 + (-3) = -7.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "addition"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : -5 + 2",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "Les signes sont différents : on soustrait les distances à 0.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-5 + 2 = -3 car 5 - 2 = 3 et le résultat garde le signe du nombre qui a la plus grande distance à 0.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "addition"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 7 + (-10)",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "Additionner un nombre négatif revient à reculer sur la droite graduée.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("7 + (-10) = -3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "addition"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : +(+2) + (-2)",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Un nombre et son opposé ont une somme nulle.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("+(+2) + (-2) = 2 + (-2) = 0.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "addition", "parentheses"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le résultat de -6 + 9 ?",
    format: "qcm",
    choices: ["-15", "-3", "3", "15"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Les signes sont différents : on soustrait 9 et 6.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-6 + 9 = 3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "addition", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si les deux termes ont le même signe ou non.",
    tags: ["relatif", "addition", "template"],
    generate: () => {
      const a = randomChoice([-9, -8, -7, -6, -5, -4, -3, 2, 3, 4, 5, 6, 7, 8, 9]);
      const b = randomChoice([-9, -8, -7, -6, -5, -4, -3, 2, 3, 4, 5, 6, 7, 8, 9]);
      const result = a + b;

      return {
        text: `Calcule : ${signed(a)} + ${withParens(b)}`,
        format: "short",
        expected: asExpectedNumber(result),
        comparator: "number_equal",
        explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          (`${signed(a)} + ${withParens(b)} = ${signed(result)}.`) +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
      };
    },
  },

  // =========================
  // RELATIF_SOUSTRACTION
  // =========================
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 5 - 2",
    format: "short",
    expected: ["3", "+3"],
    comparator: "number_equal",
    hint: "Soustraire 2, c’est reculer de 2.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("5 - 2 = 3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "soustraction"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : -2 - 3",
    format: "short",
    expected: ["-5"],
    comparator: "number_equal",
    hint: "Partir de -2 puis encore reculer de 3 donne un nombre plus petit.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-2 - 3 = -2 + (-3) = -5.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "soustraction", "sans_parentheses"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 4 - (-3)",
    format: "short",
    expected: ["7", "+7"],
    comparator: "number_equal",
    hint: "Soustraire un nombre négatif revient à ajouter son opposé.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("4 - (-3) = 4 + 3 = 7.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "soustraction", "regle_signes"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : -5 - (-2)",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "Soustraire un négatif revient à ajouter un positif.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-5 - (-2) = -5 + 2 = -3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "soustraction", "regle_signes"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : +(+2) - (-2)",
    format: "short",
    expected: ["4", "+4"],
    comparator: "number_equal",
    hint: "Le double signe -(-2) devient +2.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("+(+2) - (-2) = 2 + 2 = 4.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "soustraction", "parentheses", "regle_signes"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : -(-2)",
    format: "short",
    expected: ["2", "+2"],
    comparator: "number_equal",
    hint: "L’opposé d’un nombre négatif est un nombre positif.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-(-2) = +2.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "soustraction", "parentheses", "regle_signes"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le résultat de -7 - (-4) ?",
    format: "qcm",
    choices: ["-11", "-3", "3", "11"],
    expected: ["-3"],
    comparator: "mcq_exact",
    hint: "Soustraire un négatif revient à ajouter.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-7 - (-4) = -7 + 4 = -3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "soustraction", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_soustraction_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace la soustraction par une addition de l’opposé.",
    tags: ["relatif", "soustraction", "template"],
    generate: () => {
      const a = randomChoice([-9, -8, -7, -6, -5, -4, -3, 2, 3, 4, 5, 6, 7, 8, 9]);
      const b = randomChoice([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);
      const result = a - b;

      return {
        text: `Calcule : ${signed(a)} - ${withParens(b)}`,
        format: "short",
        expected: asExpectedNumber(result),
        comparator: "number_equal",
        explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          (`${signed(a)} - ${withParens(b)} = ${signed(a)} + ${withParens(-b)} = ${signed(result)}.`) +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
      };
    },
  },

  // =========================
  // RELATIF_CALCUL
  // =========================
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : -2 + 5 - 3",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Calcule étape par étape de gauche à droite.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-2 + 5 = 3 puis 3 - 3 = 0.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "calcul"],
  },
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : -4 - 3 + 10",
    format: "short",
    expected: ["3", "+3"],
    comparator: "number_equal",
    hint: "Attention à -4 - 3.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-4 - 3 = -7 puis -7 + 10 = 3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "calcul", "sans_parentheses"],
  },
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : +(+2) + (-3) - (-4)",
    format: "short",
    expected: ["3", "+3"],
    comparator: "number_equal",
    hint: "Remplace chaque écriture à double signe par une écriture simple.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("+(+2) + (-3) - (-4) = 2 - 3 + 4 = -1 + 4 = 3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "calcul", "parentheses", "regle_signes"],
  },
  {
    kind: "fixed",
    id: "relatif_calcul_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est le résultat de -6 - (-2) + 1 ?",
    format: "qcm",
    choices: ["-9", "-5", "-3", "3"],
    expected: ["-3"],
    comparator: "mcq_exact",
    hint: "Commence par transformer la soustraction du négatif.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-6 - (-2) + 1 = -6 + 2 + 1 = -4 + 1 = -3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "calcul", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Simplifie d’abord les écritures avec parenthèses, puis calcule.",
    tags: ["relatif", "calcul", "template"],
    generate: () => {
      const a = randomChoice([-8, -6, -4, -3, 2, 3, 4, 5, 6]);
      const b = randomChoice([-6, -4, -3, -2, 2, 3, 4, 5]);
      const c = randomChoice([-5, -4, -3, -2, 2, 3, 4, 5]);
      const result = a + b - c;

      return {
        text: `Calcule : ${withParens(a)} + ${withParens(b)} - ${withParens(c)}`,
        format: "short",
        expected: asExpectedNumber(result),
        comparator: "number_equal",
        explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          (`${withParens(a)} + ${withParens(b)} - ${withParens(c)} = ${signed(result)}.`) +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
      };
    },
  },

  // =========================
  // RELATIF_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Le matin, la température est de -2 °C. Elle baisse encore de 3 °C pendant la nuit suivante. Quelle est la nouvelle température ?",
    format: "short",
    expected: ["-5"],
    comparator: "number_equal",
    hint: "Baisser de 3 °C, c’est soustraire 3.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-2 - 3 = -5. La nouvelle température est donc -5 °C.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "probleme", "temperature"],
  },
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "sport",
    text: "Dans un jeu, un joueur perd 4 points puis gagne 7 points. Quelle est la variation totale de son score ?",
    format: "short",
    expected: ["3", "+3"],
    comparator: "number_equal",
    hint: "Perdre 4 points correspond à -4 et gagner 7 points à +7.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-4 + 7 = 3. La variation totale est de +3 points.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "probleme", "sport"],
  },
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, un plongeur est à -6 m. Il remonte de 2 m puis redescend de 5 m. À quelle profondeur se trouve-t-il ?",
    format: "short",
    expected: ["-9"],
    comparator: "number_equal",
    hint: "Remonter correspond à ajouter, redescendre à soustraire.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-6 + 2 - 5 = -4 - 5 = -9. Le plongeur est à -9 m.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "relatif_probleme_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un compte est à -8 €. On ajoute 5 €. Quel est le nouveau solde ?",
    format: "qcm",
    choices: ["-13 €", "-3 €", "3 €", "13 €"],
    expected: ["-3 €"],
    comparator: "mcq_exact",
    hint: "On calcule -8 + 5.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-8 + 5 = -3. Le nouveau solde est de -3 €.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "probleme", "qcm"],
  },

  // =========================
  // RELATIF_DEFIS_OPS
  // =========================
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi -2 - 3 donne un résultat négatif.",
    format: "short",
    expected: ["-5", "reculer", "negatif", "gauche"],
    comparator: "contains_keyword",
    hint: "Pars de -2 sur la droite graduée puis recule encore de 3.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("À partir de -2, soustraire 3 revient à reculer de 3 unités vers la gauche. On arrive à -5, qui est négatif.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "defi", "raisonnement", "sans_parentheses"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : -(+3) - (-5)",
    format: "short",
    expected: ["2", "+2"],
    comparator: "number_equal",
    hint: "Commence par simplifier -(+3).",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-(+3) = -3 et -(-5) = +5, donc -3 + 5 = 2.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "defi", "parentheses", "regle_signes"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel calcul donne 4 ?",
    format: "qcm",
    choices: ["-2 - 2", "-2 + 2", "-2 - (-6)", "-2 + (-6)"],
    expected: ["-2 - (-6)"],
    comparator: "mcq_exact",
    hint: "Teste mentalement chaque écriture.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-2 - (-6) = -2 + 6 = 4.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_operation_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Transforme d’abord les doubles signes, puis calcule.",
    tags: ["relatif", "defi", "template"],
    generate: () => {
      const a = randomChoice([-6, -5, -4, -3, 2, 3, 4, 5, 6]);
      const b = randomChoice([-5, -4, -3, -2, 2, 3, 4, 5]);
      const result = -a - b;

      return {
        text: `Calcule : -(${signed(a)}) - (${signed(b)})`,
        format: "short",
        expected: asExpectedNumber(result),
        comparator: "number_equal",
        explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          (`-(${signed(a)}) = ${signed(-a)} puis ${signed(-a)} - (${signed(b)}) = ${signed(result)}.`) +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
      };
    },
  },
    /* =========================
     QUESTIONS OUVERTES — OPÉRATIONS RELATIFS
  ========================= */
  {
    kind: "fixed",
    id: "relatif_addition_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi -5 + 2 = -3.",
    format: "open",
    expected: ["-5", "2", "-3", "droite"],
    comparator: "contains_keyword",
    hint: "Imagine un déplacement sur une droite graduée.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("On part de -5 et on avance de 2 unités vers la droite : on arrive à -3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "open", "addition"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 4 - (-3) = 7.",
    format: "open",
    expected: ["soustraire", "négatif", "ajouter", "opposé", "7"],
    comparator: "contains_keyword",
    hint: "Soustraire un nombre négatif revient à ajouter son opposé.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("Soustraire -3 revient à ajouter +3. Donc 4 - (-3) = 4 + 3 = 7.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "open", "soustraction"],
  },
  {
    kind: "fixed",
    id: "relatif_calcul_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    text: "Explique les étapes pour calculer -6 - (-2) + 1.",
    format: "open",
    expected: ["-6", "+2", "+1", "-3"],
    comparator: "contains_keyword",
    hint: "Commence par transformer -(-2) en +2.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("-6 - (-2) + 1 = -6 + 2 + 1 = -4 + 1 = -3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "open", "calcul"],
  },
  {
    kind: "fixed",
    id: "relatif_probleme_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "reunion",
    text: "Un plongeur est à -6 m. Il remonte de 2 m puis redescend de 5 m. Explique le calcul à faire.",
    format: "open",
    expected: ["-6", "+2", "-5", "-9"],
    comparator: "contains_keyword",
    hint: "Remonter correspond à ajouter ; redescendre correspond à soustraire.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("On calcule -6 + 2 - 5. Le plongeur remonte à -4 m, puis redescend à -9 m.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "open", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : -7 - (-4) = -11. Explique son erreur.",
    format: "open",
    expected: ["soustraire", "négatif", "ajouter", "-3"],
    comparator: "contains_keyword",
    hint: "Il a oublié que soustraire un négatif revient à ajouter.",
    explanation: "Définition : les opérations sur les nombres relatifs utilisent les signes et les distances à zéro.\n\n" +
          "Méthode : on applique la règle des signes, puis on calcule les distances à zéro.\n\nCalcul : " +
          ("L’élève a traité -(-4) comme -4. Or soustraire -4 revient à ajouter 4 : -7 - (-4) = -7 + 4 = -3.") +
          "\n\nConclusion : le résultat obtenu est la bonne réponse.",
    tags: ["relatif", "open", "defi", "erreur"],
  },
];