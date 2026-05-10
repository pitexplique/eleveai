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
];