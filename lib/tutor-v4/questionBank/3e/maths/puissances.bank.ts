// lib/tutor-v4/question-banks/maths/3e/puissances.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export const puissancesBank: TutorBankItemV4[] = [
  /* =========================
     PUISSANCE_COMPRENDRE
  ========================= */

  {
    kind: "fixed",
    id: "3e_entier_puissance_comprendre_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie 3² ?",
    format: "qcm",
    choices: ["3 × 2", "3 + 2", "3 × 3", "2 × 2 × 2"],
    expected: ["3 × 3"],
    comparator: "mcq_exact",
    hint: "Une puissance correspond à une multiplication répétée.",
    explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("3² = 3 × 3.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
    tags: ["entier_puissance", "definition"],
  },

  {
    kind: "fixed",
    id: "3e_entier_puissance_comprendre_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie 2³ ?",
    format: "qcm",
    choices: ["2 × 3", "2 + 2 + 2", "2 × 2 × 2", "3 × 3"],
    expected: ["2 × 2 × 2"],
    comparator: "mcq_exact",
    explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("2³ = 2 × 2 × 2.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
  },

  {
    kind: "fixed",
    id: "3e_entier_puissance_comprendre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce que signifie 5⁴.",
    format: "open",
    expected: ["5", "4", "multiplier", "5×5×5×5"],
    comparator: "contains_keyword",
    hint: "Pense au nombre de fois où on multiplie.",
    explanation:
      `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("5⁴ signifie 5 × 5 × 5 × 5, soit 5 multiplié 4 fois par lui-même.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
  },

  {
    kind: "template",
    id: "3e_entier_puissance_comprendre_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Écris la multiplication correspondante.",
    generate: () => {
      const base = randomInt(2, 6);
      const exp = randomInt(2, 4);

      const correct = Array(exp).fill(base).join(" × ");

      return {
        text: `Développer ${base}^${exp}.`,
        format: "short",
        expected: [correct],
        comparator: "contains_keyword",
        explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
          `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
          `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
          (`${base}^${exp} = ${correct}.`) +
          `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
      };
    },
  },

  /* =========================
     PUISSANCE_CALCULER
  ========================= */

  {
    kind: "fixed",
    id: "3e_entier_puissance_calculer_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calculer",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer 2³",
    format: "qcm",
    choices: ["6", "8", "9", "12"],
    expected: ["8"],
    comparator: "mcq_exact",
    explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("2³ = 2 × 2 × 2 = 8.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
  },

  {
    kind: "fixed",
    id: "3e_entier_puissance_calculer_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 5²",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("5² = 5 × 5 = 25.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
  },

  {
    kind: "fixed",
    id: "3e_entier_puissance_calculer_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer (-2)³",
    format: "qcm",
    choices: ["-6", "6", "-8", "8"],
    expected: ["-8"],
    comparator: "mcq_exact",
    hint: "Attention au signe !",
    explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("(-2)³ = (-2) × (-2) × (-2) = -8.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
  },

  {
    kind: "fixed",
    id: "3e_entier_puissance_calculer_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : (-2)² = -4. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("(-2)² = (-2) × (-2) = 4.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
  },

  {
    kind: "template",
    id: "3e_entier_puissance_calculer_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie le nombre par lui-même plusieurs fois.",
    generate: () => {
      const base = randomInt(2, 9);
      const exp = randomInt(2, 3);

      const value = Math.pow(base, exp);

      return {
        text: `Calculer ${base}^${exp}.`,
        format: "short",
        expected: [String(value)],
        comparator: "number_equal",
        explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
          `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
          `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
          (`${base}^${exp} = ${value}.`) +
          `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
      };
    },
  },

  /* =========================
     PUISSANCE_CALCULS
  ========================= */

  {
    kind: "fixed",
    id: "3e_entier_entier_puissance_calcul_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Calculer : 2² × 2³",
    format: "qcm",
    choices: ["2⁵", "2⁶", "4⁵", "8⁵"],
    expected: ["2⁵"],
    comparator: "mcq_exact",
    hint: "Même base → on additionne les exposants.",
    explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("2² × 2³ = 2^(2+3) = 2⁵.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
  },

  {
    kind: "fixed",
    id: "3e_entier_entier_puissance_calcul_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Calculer : 3⁴ ÷ 3²",
    format: "qcm",
    choices: ["3²", "3⁶", "3⁸", "1"],
    expected: ["3²"],
    comparator: "mcq_exact",
    explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("3⁴ ÷ 3² = 3^(4-2) = 3².") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
  },

  {
    kind: "fixed",
    id: "3e_entier_entier_puissance_calcul_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calcul",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : 2² × 2³ = 4⁵. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    explanation:
      `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("Non. On ne change pas la base : 2² × 2³ = 2⁵.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
  },

  {
    kind: "template",
    id: "3e_entier_entier_puissance_calcul_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Même base → addition ou soustraction des exposants.",
    generate: () => {
      const base = randomChoice([2, 3, 5]);
      const a = randomInt(2, 5);
      const b = randomInt(1, 4);

      return {
        text: `Simplifier : ${base}^${a} × ${base}^${b}`,
        format: "short",
        expected: [`${base}^${a + b}`],
        comparator: "exact_text",
        explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
          `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
          `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
          (`${base}^${a} × ${base}^${b} = ${base}^${a + b}.`) +
          `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
      };
    },
  },
    /* =========================
     PUISSANCE_DIX
  ========================= */

  {
    kind: "fixed",
    id: "3e_entier_puissance_dix_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer 10³.",
    format: "qcm",
    choices: ["30", "100", "1 000", "10 000"],
    expected: ["1 000"],
    comparator: "mcq_exact",
    hint: "10³ = 10 × 10 × 10.",
    explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("10³ = 10 × 10 × 10 = 1 000.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
    tags: ["entier_puissance", "entier_puissance_dix", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_entier_puissance_dix_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 10⁻².",
    format: "qcm",
    choices: ["100", "0,1", "0,01", "-100"],
    expected: ["0,01"],
    comparator: "mcq_exact",
    hint: "10⁻² = 1 / 10².",
    explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("10⁻² = 1 / 100 = 0,01.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
    tags: ["entier_puissance", "entier_puissance_dix", "exposant_negatif", "qcm"],
  },

  {
    kind: "template",
    id: "3e_entier_puissance_dix_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "10ⁿ est un 1 suivi de n zéros si n est positif.",
    tags: ["entier_puissance", "entier_puissance_dix", "template"],
    generate: () => {
      const exp = randomInt(2, 6);
      const value = 10 ** exp;

      return {
        text: `Calculer 10^${exp}.`,
        format: "short",
        expected: [String(value)],
        comparator: "number_equal",
        explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
          `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
          `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
          (`10^${exp} = ${value}.`) +
          `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_entier_puissance_dix_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "10⁻ⁿ = 1 / 10ⁿ.",
    tags: ["entier_puissance", "entier_puissance_dix", "exposant_negatif", "template"],
    generate: () => {
      const exp = randomChoice([1, 2, 3, 4]);
      const value = 1 / 10 ** exp;
      const expected = value.toString().replace(".", ",");

      return {
        text: `Calculer 10^-${exp}.`,
        format: "short",
        expected: [expected, value.toString()],
        comparator: "exact_text",
        explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
          `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
          `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
          (`10^-${exp} = 1 / 10^${exp} = ${expected}.`) +
          `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
      };
    },
  },

  /* =========================
     PUISSANCE_ECRITURE_SCIENTIFIQUE
  ========================= */

  {
    kind: "fixed",
    id: "3e_puissance_scientifique_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_ecriture_scientifique",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture scientifique correspond à 5 600 ?",
    format: "qcm",
    choices: ["56 × 10²", "5,6 × 10³", "0,56 × 10⁴", "560 × 10"],
    expected: ["5,6 × 10³"],
    comparator: "mcq_exact",
    hint: "Le nombre devant ×10ⁿ doit être compris entre 1 et 10.",
    explanation:
      `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("En écriture scientifique, le nombre devant la puissance de 10 doit être compris entre 1 et 10. Donc 5 600 = 5,6 × 10³.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
    tags: ["entier_puissance", "ecriture_scientifique", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_puissance_scientifique_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_ecriture_scientifique",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 3,2 × 10⁴ ?",
    format: "qcm",
    choices: ["32", "320", "3 200", "32 000"],
    expected: ["32 000"],
    comparator: "mcq_exact",
    hint: "Multiplier par 10⁴ déplace la virgule de 4 rangs vers la droite.",
    explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("3,2 × 10⁴ = 3,2 × 10 000 = 32 000.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
    tags: ["entier_puissance", "ecriture_scientifique", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_puissance_scientifique_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_ecriture_scientifique",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 42 × 10³ n’est pas une écriture scientifique.",
    format: "open",
    expected: ["42", "entre", "1", "10", "scientifique"],
    comparator: "contains_keyword",
    hint: "Regarde le nombre placé devant la puissance de 10.",
    explanation:
      `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("42 × 10³ n’est pas une écriture scientifique car 42 n’est pas compris entre 1 et 10. On écrirait plutôt 4,2 × 10⁴.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
    tags: ["entier_puissance", "ecriture_scientifique", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "3e_puissance_scientifique_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_ecriture_scientifique",
    difficulty: 3,
    theme: "neutral",
    hint: "Place la virgule après le premier chiffre non nul.",
    tags: ["entier_puissance", "ecriture_scientifique", "template"],
    generate: () => {
      const mantisse = randomChoice([1.2, 2.5, 3.4, 4.8, 6.7, 8.9]);
      const exp = randomInt(3, 6);
      const value = mantisse * 10 ** exp;
      const mantisseText = String(mantisse).replace(".", ",");

      return {
        text: `Écrire ${value.toLocaleString("fr-FR")} en écriture scientifique.`,
        format: "short",
        expected: [`${mantisseText}×10^${exp}`, `${mantisseText} × 10^${exp}`, `${mantisseText}x10^${exp}`],
        comparator: "exact_text",
        explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
          `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
          `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
          (`${value.toLocaleString("fr-FR")} = ${mantisseText} × 10^${exp}.`) +
          `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_puissance_scientifique_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_ecriture_scientifique",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplier par une puissance de 10 déplace la virgule.",
    tags: ["entier_puissance", "ecriture_scientifique", "template"],
    generate: () => {
      const mantisse = randomChoice([1.5, 2.4, 3.6, 5.2, 7.8]);
      const exp = randomInt(2, 5);
      const value = mantisse * 10 ** exp;
      const mantisseText = String(mantisse).replace(".", ",");

      return {
        text: `Donner l’écriture décimale de ${mantisseText} × 10^${exp}.`,
        format: "short",
        expected: [String(value), value.toLocaleString("fr-FR")],
        comparator: "exact_text",
        explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
          `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
          `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
          (`${mantisseText} × 10^${exp} = ${value.toLocaleString("fr-FR")}.`) +
          `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
      };
    },
  },

  /* =========================
     PUISSANCE_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_entier_puissance_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : 10³ + 10² = 10⁵. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les règles sur les exposants ne s’appliquent pas à une addition.",
    explanation:
      `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("Non. 10³ + 10² = 1 000 + 100 = 1 100. On ne peut pas additionner les exposants dans une somme.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
    tags: ["entier_puissance", "defi", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_entier_puissance_defi_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : 2³ × 3³ = 6³. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Ici, les exposants sont identiques.",
    explanation:
      `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("Oui. 2³ × 3³ = (2 × 3)³ = 6³.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
    tags: ["entier_puissance", "defi", "calcul", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_entier_puissance_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi 2³ × 2⁴ = 2⁷, mais 2³ + 2⁴ n’est pas égal à 2⁷.",
    format: "open",
    expected: ["multiplie", "additionne les exposants", "addition", "pas"],
    comparator: "contains_keyword",
    hint: "La règle d’addition des exposants fonctionne pour un produit de puissances de même base.",
    explanation:
      `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
      `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
      `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
      ("Dans un produit de puissances de même base, on additionne les exposants : 2³ × 2⁴ = 2⁷. Mais pour une somme, cette règle ne s’applique pas : 2³ + 2⁴ = 8 + 16 = 24.") +
      `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
    tags: ["entier_puissance", "defi", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "3e_entier_puissance_defi_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : même base et multiplication → on additionne les exposants.",
    tags: ["entier_puissance", "defi", "template"],
    generate: () => {
      const base = randomChoice([2, 3, 5]);
      const a = randomInt(2, 5);
      const b = randomInt(2, 5);

      return {
        text: `Simplifier : ${base}^${a} × ${base}^${b}`,
        format: "short",
        expected: [`${base}^${a + b}`],
        comparator: "exact_text",
        explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
          `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
          `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
          (`Même base et multiplication : ${base}^${a} × ${base}^${b} = ${base}^${a + b}.`) +
          `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_entier_puissance_defi_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Utilise une écriture scientifique pour manipuler les grands nombres.",
    tags: ["entier_puissance", "defi", "reunion", "ecriture_scientifique", "template"],
    generate: () => {
      const distance = randomChoice([
        { value: "384 000", sci: "3,84 × 10^5", context: "la distance approximative Terre-Lune en km" },
        { value: "150 000 000", sci: "1,5 × 10^8", context: "la distance approximative Terre-Soleil en km" },
        { value: "8 800", sci: "8,8 × 10^3", context: "l’altitude approximative de l’Everest en mètres" },
      ]);

      return {
        text: `Écrire ${distance.value} en écriture scientifique. Contexte : ${distance.context}.`,
        format: "short",
        expected: [distance.sci, distance.sci.replace(" × ", "×")],
        comparator: "exact_text",
        explanation: `Définition : une puissance est une écriture qui résume des multiplications répétées d’un même nombre.\n\n` +
          `Méthode : on utilise la définition d’une puissance ou les règles sur les puissances de même base et les puissances de 10.\n\n` +
          `Calcul : on applique la règle choisie, puis on simplifie l’écriture si nécessaire. ` +
          (`${distance.value} = ${distance.sci}.`) +
          `\n\nConclusion : l’écriture obtenue est la réponse attendue.`,
      };
    },
  },

  /* =========================
     PUISSANCE_COMPRENDRE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_entier_puissance_comprendre_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie l’écriture $5^3$ ?",
    format: "qcm",
    choices: ["$5 \\times 5 \\times 5$", "$5 \\times 3$", "$3 \\times 3 \\times 3 \\times 3 \\times 3$", "$5 + 5 + 5$"],
    expected: ["$5 \\times 5 \\times 5$"],
    comparator: "mcq_exact",
    hint: "L’exposant indique combien de fois on multiplie la base.",
    explanation:
      "Définition : $a^n$ signifie $a$ multiplié par lui-même $n$ fois.\n\n" +
      "Méthode : la base est $5$, l’exposant est $3$.\n\n" +
      "Calcul : $5^3 = 5 \\times 5 \\times 5$.\n\n" +
      "Conclusion : $5^3 = 5 \\times 5 \\times 5$.",
    tags: ["entier_puissance", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_comprendre_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans l’écriture $7^4$, comment s’appelle le nombre $4$ ?",
    format: "qcm",
    choices: ["l’exposant", "la base", "le produit", "le facteur"],
    expected: ["l’exposant"],
    comparator: "mcq_exact",
    hint: "C’est le « petit » nombre en haut.",
    explanation:
      "Définition : dans $a^n$, $a$ est la base et $n$ est l’exposant.\n\n" +
      "Méthode : on repère le nombre placé en haut à droite.\n\n" +
      "Calcul : ici, $4$ est en exposant.\n\n" +
      "Conclusion : $4$ est l’exposant.",
    tags: ["entier_puissance", "comprendre", "vocabulaire", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_puissance_comprendre_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "L’exposant compte le nombre de facteurs.",
    tags: ["entier_puissance", "comprendre", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 5, 7]);
      const n = randomChoice([3, 4, 5]);
      return {
        text: `Dans le produit $${a} \\times ${a} \\times ${a}${n >= 4 ? ` \\times ${a}` : ""}${n >= 5 ? ` \\times ${a}` : ""}$, combien de fois le facteur $${a}$ apparaît-il ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          `Définition : une puissance résume un produit de facteurs identiques.\n\n` +
          `Méthode : on compte combien de fois $${a}$ est écrit.\n\n` +
          `Calcul : le facteur $${a}$ apparaît $${n}$ fois, donc ce produit vaut $${a}^${n}$.\n\n` +
          `Conclusion : le facteur apparaît $${n}$ fois.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_comprendre_fixed_4_un",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut $a^1$ ?",
    format: "qcm",
    choices: ["$a$", "$1$", "$0$", "$a \\times a$"],
    expected: ["$a$"],
    comparator: "mcq_exact",
    hint: "L’exposant $1$ signifie « une seule fois ».",
    explanation:
      "Définition : $a^1$ signifie que $a$ apparaît une seule fois.\n\n" +
      "Méthode : on applique la définition de la puissance.\n\n" +
      "Calcul : $a^1 = a$.\n\n" +
      "Conclusion : $a^1 = a$.",
    tags: ["entier_puissance", "comprendre", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_puissance_comprendre_tpl_2_ecrire",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "On écrit base puis exposant.",
    tags: ["entier_puissance", "comprendre", "qcm", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 6]);
      const n = randomChoice([3, 4, 5]);
      const correct = `$${a}^${n}$`;
      return {
        text: `Comment écrit-on sous forme de puissance le produit de $${n}$ facteurs égaux à $${a}$ ?`,
        format: "qcm",
        choices: shuffle([correct, `$${n}^${a}$`, `$${a} \\times ${n}$`, `$${a}^${n + 1}$`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : un produit de facteurs identiques s’écrit sous forme de puissance.\n\n` +
          `Méthode : la base est le facteur répété, l’exposant est le nombre de facteurs.\n\n` +
          `Calcul : $${a}$ répété $${n}$ fois $= ${a}^${n}$.\n\n` +
          `Conclusion : on écrit $${a}^${n}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_comprendre_qcm_3_carre",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "« $7$ au carré » s’écrit…",
    format: "qcm",
    choices: ["$7^2$", "$7^3$", "$2^7$", "$7 \\times 2$"],
    expected: ["$7^2$"],
    comparator: "mcq_exact",
    hint: "« au carré » veut dire exposant $2$.",
    explanation:
      "Définition : « au carré » correspond à l’exposant $2$.\n\n" +
      "Méthode : on place $2$ en exposant.\n\n" +
      "Calcul : $7$ au carré $= 7^2$.\n\n" +
      "Conclusion : on écrit $7^2$.",
    tags: ["entier_puissance", "comprendre", "carre", "qcm"],
  },

  /* =========================
     PUISSANCE_CALCULER (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_entier_puissance_calculer_tpl_2_carre",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "$n^2 = n \\times n$.",
    tags: ["entier_puissance", "calculer", "carre", "template"],
    generate: () => {
      const n = randomChoice([4, 5, 6, 7, 8, 9]);
      const r = n * n;
      return {
        text: `Calcule $${n}^2$.`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation:
          `Définition : $${n}^2 = ${n} \\times ${n}$.\n\n` +
          `Méthode : on multiplie la base par elle-même.\n\n` +
          `Calcul : $${n} \\times ${n} = ${r}$.\n\n` +
          `Conclusion : $${n}^2 = ${r}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "3e_entier_puissance_calculer_tpl_3_cube",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "$n^3 = n \\times n \\times n$.",
    tags: ["entier_puissance", "calculer", "cube", "template"],
    generate: () => {
      const n = randomChoice([2, 3, 4, 5]);
      const r = n * n * n;
      return {
        text: `Calcule $${n}^3$.`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation:
          `Définition : $${n}^3 = ${n} \\times ${n} \\times ${n}$.\n\n` +
          `Méthode : on multiplie la base trois fois.\n\n` +
          `Calcul : $${n} \\times ${n} \\times ${n} = ${r}$.\n\n` +
          `Conclusion : $${n}^3 = ${r}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_calculer_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $2^5$.",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "$2 \\times 2 \\times 2 \\times 2 \\times 2$.",
    explanation:
      "Définition : $2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2$.\n\n" +
      "Méthode : on multiplie $2$ cinq fois.\n\n" +
      "Calcul : $= 32$.\n\n" +
      "Conclusion : $2^5 = 32$.",
    tags: ["entier_puissance", "calculer", "short"],
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_calculer_qcm_1_piege",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut $3^2$ ?",
    format: "qcm",
    choices: ["$9$", "$6$", "$5$", "$8$"],
    expected: ["$9$"],
    comparator: "mcq_exact",
    hint: "$3^2 = 3 \\times 3$, pas $3 \\times 2$.",
    explanation:
      "Définition : $3^2 = 3 \\times 3$.\n\n" +
      "Méthode : attention, ce n’est pas $3 \\times 2$.\n\n" +
      "Calcul : $3 \\times 3 = 9$.\n\n" +
      "Conclusion : $3^2 = 9$.",
    tags: ["entier_puissance", "calculer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_puissance_calculer_tpl_4",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie la base autant de fois que l’exposant l’indique.",
    tags: ["entier_puissance", "calculer", "template"],
    generate: () => {
      const a = randomChoice([2, 3]);
      const n = randomChoice([4, 5, 6]);
      const r = Math.pow(a, n);
      return {
        text: `Calcule $${a}^${n}$.`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation:
          `Définition : $${a}^${n}$ est un produit de $${n}$ facteurs égaux à $${a}$.\n\n` +
          `Méthode : on multiplie $${a}$ par lui-même $${n}$ fois.\n\n` +
          `Calcul : $${a}^${n} = ${r}$.\n\n` +
          `Conclusion : $${a}^${n} = ${r}$.`,
      };
    },
  },

  /* =========================
     PUISSANCE_DIX (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_entier_puissance_dix_fixed_1b",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut $10^3$ ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "L’exposant donne le nombre de zéros.",
    explanation:
      "Définition : $10^n$ s’écrit $1$ suivi de $n$ zéros.\n\n" +
      "Méthode : pour $10^3$, on écrit $1$ suivi de $3$ zéros.\n\n" +
      "Calcul : $10^3 = 1000$.\n\n" +
      "Conclusion : $10^3 = 1000$.",
    tags: ["entier_puissance", "dix", "short"],
  },
  {
    kind: "template",
    id: "3e_entier_puissance_dix_tpl_1_valeur",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "$10^n = 1$ suivi de $n$ zéros.",
    tags: ["entier_puissance", "dix", "template"],
    generate: () => {
      const n = randomChoice([2, 3, 4, 5]);
      const r = Math.pow(10, n);
      return {
        text: `Que vaut $10^${n}$ ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation:
          `Définition : $10^${n}$ s’écrit $1$ suivi de $${n}$ zéros.\n\n` +
          `Méthode : on écrit $1$ puis $${n}$ zéros.\n\n` +
          `Calcul : $10^${n} = ${r}$.\n\n` +
          `Conclusion : $10^${n} = ${r}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "3e_entier_puissance_dix_tpl_2_zeros",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "L’exposant compte les zéros.",
    tags: ["entier_puissance", "dix", "zeros", "template"],
    generate: () => {
      const n = randomChoice([4, 6, 7, 9]);
      return {
        text: `Combien de zéros y a-t-il dans l’écriture décimale de $10^${n}$ ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          `Définition : $10^${n}$ s’écrit $1$ suivi de $${n}$ zéros.\n\n` +
          `Méthode : le nombre de zéros est égal à l’exposant.\n\n` +
          `Calcul : il y a donc $${n}$ zéros.\n\n` +
          `Conclusion : $10^${n}$ a $${n}$ zéros.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_dix_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Sous quelle forme s’écrit $1000$ comme puissance de $10$ ?",
    format: "qcm",
    choices: ["$10^3$", "$10^2$", "$10^4$", "$3^{10}$"],
    expected: ["$10^3$"],
    comparator: "mcq_exact",
    hint: "Compte les zéros de $1000$.",
    explanation:
      "Définition : $10^n$ a $n$ zéros.\n\n" +
      "Méthode : on compte les zéros de $1000$.\n\n" +
      "Calcul : $1000$ a $3$ zéros, donc $1000 = 10^3$.\n\n" +
      "Conclusion : $1000 = 10^3$.",
    tags: ["entier_puissance", "dix", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_dix_qcm_2_million",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Un million ($1\\,000\\,000$) s’écrit…",
    format: "qcm",
    choices: ["$10^6$", "$10^5$", "$10^7$", "$6^{10}$"],
    expected: ["$10^6$"],
    comparator: "mcq_exact",
    hint: "Un million a $6$ zéros.",
    explanation:
      "Définition : $10^n$ a $n$ zéros.\n\n" +
      "Méthode : on compte les zéros d’un million.\n\n" +
      "Calcul : $1\\,000\\,000$ a $6$ zéros, donc $= 10^6$.\n\n" +
      "Conclusion : un million $= 10^6$.",
    tags: ["entier_puissance", "dix", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_dix_fixed_2_produit",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_dix",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l’écriture de $10^2 \\times 10^3$ sous forme d’une seule puissance de $10$ ?",
    format: "qcm",
    choices: ["$10^5$", "$10^6$", "$10^1$", "$100^5$"],
    expected: ["$10^5$"],
    comparator: "mcq_exact",
    hint: "On additionne les exposants.",
    explanation:
      "Définition : $10^m \\times 10^n = 10^{m+n}$.\n\n" +
      "Méthode : on additionne les exposants.\n\n" +
      "Calcul : $10^2 \\times 10^3 = 10^{2+3} = 10^5$.\n\n" +
      "Conclusion : $10^2 \\times 10^3 = 10^5$.",
    tags: ["entier_puissance", "dix", "produit", "qcm"],
  },

  /* =========================
     PUISSANCE_ECRITURE_SCIENTIFIQUE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_entier_puissance_ecriture_scientifique_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_ecriture_scientifique",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l’écriture scientifique de $3500$ ?",
    format: "qcm",
    choices: ["$3{,}5 \\times 10^3$", "$35 \\times 10^2$", "$0{,}35 \\times 10^4$", "$3{,}5 \\times 10^2$"],
    expected: ["$3{,}5 \\times 10^3$"],
    comparator: "mcq_exact",
    hint: "Le premier facteur doit être entre $1$ et $10$.",
    explanation:
      "Définition : l’écriture scientifique est $a \\times 10^n$ avec $1 \\leq a < 10$.\n\n" +
      "Méthode : on place la virgule pour obtenir un nombre entre $1$ et $10$.\n\n" +
      "Calcul : $3500 = 3{,}5 \\times 1000 = 3{,}5 \\times 10^3$.\n\n" +
      "Conclusion : $3500 = 3{,}5 \\times 10^3$.",
    tags: ["entier_puissance", "ecriture_scientifique", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_ecriture_scientifique_qcm_2_valide",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_ecriture_scientifique",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi ces écritures, laquelle est une écriture scientifique correcte ?",
    format: "qcm",
    choices: ["$4{,}2 \\times 10^5$", "$42 \\times 10^4$", "$0{,}42 \\times 10^6$", "$4{,}2 \\times 5^{10}$"],
    expected: ["$4{,}2 \\times 10^5$"],
    comparator: "mcq_exact",
    hint: "Le premier facteur est entre $1$ et $10$, et la puissance est une puissance de $10$.",
    explanation:
      "Définition : une écriture scientifique est $a \\times 10^n$ avec $1 \\leq a < 10$.\n\n" +
      "Méthode : on vérifie le premier facteur et la base $10$.\n\n" +
      "Calcul : seul $4{,}2 \\times 10^5$ respecte les deux conditions.\n\n" +
      "Conclusion : c’est $4{,}2 \\times 10^5$.",
    tags: ["entier_puissance", "ecriture_scientifique", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_ecriture_scientifique_qcm_3_petit",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_ecriture_scientifique",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l’écriture scientifique de $0{,}004$ ?",
    format: "qcm",
    choices: ["$4 \\times 10^{-3}$", "$4 \\times 10^{3}$", "$0{,}4 \\times 10^{-2}$", "$4 \\times 10^{-2}$"],
    expected: ["$4 \\times 10^{-3}$"],
    comparator: "mcq_exact",
    hint: "Pour un nombre plus petit que $1$, l’exposant est négatif.",
    explanation:
      "Définition : l’écriture scientifique est $a \\times 10^n$ avec $1 \\leq a < 10$.\n\n" +
      "Méthode : on déplace la virgule pour obtenir $4$, en comptant les rangs.\n\n" +
      "Calcul : $0{,}004 = 4 \\times 0{,}001 = 4 \\times 10^{-3}$.\n\n" +
      "Conclusion : $0{,}004 = 4 \\times 10^{-3}$.",
    tags: ["entier_puissance", "ecriture_scientifique", "negatif", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_puissance_ecriture_scientifique_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_ecriture_scientifique",
    difficulty: 3,
    theme: "neutral",
    hint: "Premier facteur entre $1$ et $10$, puis puissance de $10$.",
    tags: ["entier_puissance", "ecriture_scientifique", "qcm", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 5, 7]);
      const n = randomChoice([3, 4, 5]);
      const valeurTexte = `${a}${"0".repeat(n)}`;
      const correct = `$${a} \\times 10^${n}$`;
      return {
        text: `Quelle est l’écriture scientifique de $${valeurTexte}$ ?`,
        format: "qcm",
        choices: shuffle([correct, `$${a} \\times 10^${n + 1}$`, `$${a}0 \\times 10^${n - 1}$`, `$${a} \\times 10^${n - 1}$`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : écriture scientifique $= a \\times 10^n$ avec $1 \\leq a < 10$.\n\n` +
          `Méthode : on garde un seul chiffre avant la virgule.\n\n` +
          `Calcul : $${valeurTexte} = ${a} \\times 10^${n}$.\n\n` +
          `Conclusion : $${valeurTexte} = ${a} \\times 10^${n}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_ecriture_scientifique_qcm_4_role",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_ecriture_scientifique",
    difficulty: 3,
    theme: "neutral",
    text: "Dans l’écriture scientifique $a \\times 10^n$, quelle condition doit vérifier $a$ ?",
    format: "qcm",
    choices: ["$1 \\leq a < 10$", "$a > 10$", "$a < 1$", "$a = 10$"],
    expected: ["$1 \\leq a < 10$"],
    comparator: "mcq_exact",
    hint: "Un seul chiffre non nul avant la virgule.",
    explanation:
      "Définition : en écriture scientifique, $a$ est compris entre $1$ (inclus) et $10$ (exclu).\n\n" +
      "Méthode : on vérifie qu’il y a un seul chiffre avant la virgule.\n\n" +
      "Calcul : donc $1 \\leq a < 10$.\n\n" +
      "Conclusion : la condition est $1 \\leq a < 10$.",
    tags: ["entier_puissance", "ecriture_scientifique", "qcm"],
  },

  /* =========================
     PUISSANCE_CALCUL (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_entier_puissance_calcul_qcm_1_produit",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $a^3 \\times a^4$ (avec $a \\neq 0$).",
    format: "qcm",
    choices: ["$a^7$", "$a^{12}$", "$a^1$", "$2a^7$"],
    expected: ["$a^7$"],
    comparator: "mcq_exact",
    hint: "On additionne les exposants.",
    explanation:
      "Définition : $a^m \\times a^n = a^{m+n}$.\n\n" +
      "Méthode : on additionne les exposants.\n\n" +
      "Calcul : $a^3 \\times a^4 = a^{3+4} = a^7$.\n\n" +
      "Conclusion : $a^3 \\times a^4 = a^7$.",
    tags: ["entier_puissance", "calcul", "produit", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_calcul_qcm_2_quotient",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calcul",
    difficulty: 4,
    theme: "neutral",
    text: "Simplifie $\\dfrac{a^5}{a^2}$ (avec $a \\neq 0$).",
    format: "qcm",
    choices: ["$a^3$", "$a^7$", "$a^{2{,}5}$", "$a^{10}$"],
    expected: ["$a^3$"],
    comparator: "mcq_exact",
    hint: "On soustrait les exposants.",
    explanation:
      "Définition : $\\dfrac{a^m}{a^n} = a^{m-n}$.\n\n" +
      "Méthode : on soustrait les exposants.\n\n" +
      "Calcul : $\\dfrac{a^5}{a^2} = a^{5-2} = a^3$.\n\n" +
      "Conclusion : $\\dfrac{a^5}{a^2} = a^3$.",
    tags: ["entier_puissance", "calcul", "quotient", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_puissance_calcul_tpl_1_produit",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "$a^m \\times a^n = a^{m+n}$.",
    tags: ["entier_puissance", "calcul", "produit", "qcm", "template"],
    generate: () => {
      const m = randomChoice([2, 3, 4]);
      const n = randomChoice([2, 3, 5]);
      const correct = `$a^{${m + n}}$`;
      return {
        text: `Simplifie $a^${m} \\times a^${n}$ (avec $a \\neq 0$).`,
        format: "qcm",
        choices: shuffle([correct, `$a^{${m * n}}$`, `$a^{${Math.abs(m - n)}}$`, `$2a^{${m + n}}$`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : $a^m \\times a^n = a^{m+n}$.\n\n` +
          `Méthode : on additionne les exposants.\n\n` +
          `Calcul : $a^${m} \\times a^${n} = a^{${m}+${n}} = a^{${m + n}}$.\n\n` +
          `Conclusion : le résultat est $a^{${m + n}}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_calcul_fixed_2_valeur",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calcul",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule la valeur de $2^3 \\times 2^2$.",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "$2^3 \\times 2^2 = 2^5$.",
    explanation:
      "Définition : $2^3 \\times 2^2 = 2^{3+2} = 2^5$.\n\n" +
      "Méthode : on additionne les exposants, puis on calcule.\n\n" +
      "Calcul : $2^5 = 32$.\n\n" +
      "Conclusion : $2^3 \\times 2^2 = 32$.",
    tags: ["entier_puissance", "calcul", "short"],
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_calcul_qcm_3_puissance_de_puissance",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calcul",
    difficulty: 4,
    theme: "neutral",
    text: "Simplifie $(a^2)^3$.",
    format: "qcm",
    choices: ["$a^6$", "$a^5$", "$a^8$", "$a^{2}$"],
    expected: ["$a^6$"],
    comparator: "mcq_exact",
    hint: "On multiplie les exposants.",
    explanation:
      "Définition : $(a^m)^n = a^{m \\times n}$.\n\n" +
      "Méthode : on multiplie les exposants.\n\n" +
      "Calcul : $(a^2)^3 = a^{2 \\times 3} = a^6$.\n\n" +
      "Conclusion : $(a^2)^3 = a^6$.",
    tags: ["entier_puissance", "calcul", "puissance_de_puissance", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_puissance_calcul_tpl_2_quotient",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\dfrac{a^m}{a^n} = a^{m-n}$.",
    tags: ["entier_puissance", "calcul", "quotient", "qcm", "template"],
    generate: () => {
      const n = randomChoice([1, 2, 3]);
      // L'écart entre les deux exposants ne doit pas valoir le plus petit : la
      // réponse $a^{m-n}$ s'écrirait alors comme le piège $a^{n}$.
      const m = n + randomChoice([2, 3, 4].filter((e) => e !== n));
      const correct = `$a^{${m - n}}$`;
      return {
        text: `Simplifie $\\dfrac{a^${m}}{a^${n}}$ (avec $a \\neq 0$).`,
        format: "qcm",
        choices: shuffle([correct, `$a^{${m + n}}$`, `$a^{${m}}$`, `$a^{${n}}$`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : $\\dfrac{a^m}{a^n} = a^{m-n}$.\n\n` +
          `Méthode : on soustrait les exposants.\n\n` +
          `Calcul : $\\dfrac{a^${m}}{a^${n}} = a^{${m}-${n}} = a^{${m - n}}$.\n\n` +
          `Conclusion : le résultat est $a^{${m - n}}$.`,
      };
    },
  },

  /* =========================
     PUISSANCE_DEFI (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_entier_puissance_defi_tpl_3_dix",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Pour multiplier des puissances de $10$, on additionne les exposants.",
    tags: ["entier_puissance", "defi", "dix", "template"],
    generate: () => {
      const m = randomChoice([2, 3, 4]);
      const n = randomChoice([2, 3, 5]);
      const r = Math.pow(10, m + n);
      return {
        text: `Calcule $10^${m} \\times 10^${n}$ (donne le résultat en écriture décimale).`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation:
          `Définition : $10^m \\times 10^n = 10^{m+n}$.\n\n` +
          `Méthode : on additionne les exposants, puis on écrit le nombre.\n\n` +
          `Calcul : $10^${m} \\times 10^${n} = 10^{${m + n}} = ${r}$.\n\n` +
          `Conclusion : le résultat est $${r}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_defi_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève écrit $2^3 = 6$. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "$2^3 = 2 \\times 2 \\times 2$, pas $2 \\times 3$.",
    explanation:
      "Définition : $2^3 = 2 \\times 2 \\times 2$.\n\n" +
      "Méthode : on n’effectue pas $2 \\times 3$.\n\n" +
      "Calcul : $2 \\times 2 \\times 2 = 8$.\n\n" +
      "Conclusion : non, $2^3 = 8$.",
    tags: ["entier_puissance", "defi", "erreur", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_puissance_defi_tpl_4_comparer",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule chaque puissance puis compare.",
    tags: ["entier_puissance", "defi", "comparaison", "template"],
    generate: () => {
      const data = randomChoice([
        { a: "2^4", va: 16, b: "3^2", vb: 9 },
        { a: "2^3", va: 8, b: "3^2", vb: 9 },
        { a: "5^2", va: 25, b: "2^4", vb: 16 },
      ]);
      const plusGrand = data.va > data.vb ? `$${data.a}$` : `$${data.b}$`;
      return {
        text: `Quel nombre est le plus grand : $${data.a}$ ou $${data.b}$ ?`,
        format: "qcm",
        choices: shuffle([`$${data.a}$`, `$${data.b}$`, "ils sont égaux"]),
        expected: [plusGrand],
        comparator: "mcq_exact",
        explanation:
          `Définition : on compare les valeurs des deux puissances.\n\n` +
          `Méthode : on calcule chaque puissance.\n\n` +
          `Calcul : $${data.a} = ${data.va}$ et $${data.b} = ${data.vb}$.\n\n` +
          `Conclusion : le plus grand est ${plusGrand}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_puissance_defi_qcm_2_bacterie",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId: "entier_puissance_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une bactérie double chaque heure. En partant de $1$, combien y en a-t-il après $4$ heures ?",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "Cela fait $2^4$.",
    explanation:
      "Définition : doubler $4$ fois revient à multiplier par $2^4$.\n\n" +
      "Méthode : on calcule $2^4$.\n\n" +
      "Calcul : $2^4 = 16$.\n\n" +
      "Conclusion : il y a $16$ bactéries.",
    tags: ["entier_puissance", "defi", "short"],
  },
];