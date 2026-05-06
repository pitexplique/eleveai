// lib/tutor-v4/question-banks/maths/4e/factorisation.bank.ts

/**
 * =========================================================
 * FACTORISATION.BANK.TS
 * =========================================================
 *
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Factorisation
 *
 * Idée centrale :
 * - factoriser, c’est transformer une somme ou une différence en produit ;
 * - la factorisation est le chemin inverse du développement ;
 * - on commence par le facteur commun ;
 * - puis on utilise les identités remarquables comme formes reconnues.
 *
 * Progression :
 * 1. facteur_commun
 *    → repérer ce qui est commun dans chaque terme
 *
 * 2. factoriser_simple
 *    → écrire sous forme de produit
 *
 * 3. factoriser_ir
 *    → reconnaître une identité remarquable à l’envers
 *
 * 4. factoriser_verifier
 *    → vérifier en développant
 *
 * 5. factorisation_defis
 *    → erreurs fréquentes, choix de méthode, situations concrètes
 */

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

function factorizedForms(a: number, b: number, sign: "+" | "-") {
  const compact = `${a}(x${sign}${b})`;
  const spaced = `${a}(x ${sign} ${b})`;
  return [compact, spaced];
}

export const factorisationBank: TutorBankItemV4[] = [
  // =========================
  // FACTEUR_COMMUN
  // =========================
  {
    kind: "fixed",
    id: "facteur_commun_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "facteur_commun",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 3x + 12, quel est le facteur commun ?",
    format: "qcm",
    choices: ["3", "x", "12", "15"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Cherche un nombre qui divise les deux termes.",
    explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          ("3x = 3 × x et 12 = 3 × 4. Le facteur commun est donc 3.") +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["factorisation", "facteur_commun", "qcm"],
  },
  {
    kind: "fixed",
    id: "facteur_commun_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "facteur_commun",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 5x + 5y, quel est le facteur commun ?",
    format: "qcm",
    choices: ["5", "x", "y", "x + y"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Le même nombre multiplie x et y.",
    explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          ("5x = 5 × x et 5y = 5 × y. Le facteur commun est donc 5.") +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["factorisation", "facteur_commun"],
  },
  {
    kind: "template",
    id: "facteur_commun_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "facteur_commun",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche le nombre qui multiplie les deux termes.",
    tags: ["factorisation", "facteur_commun", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);

      return {
        text: `Dans l’expression ${a}x + ${a * b}, quel est le facteur commun ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          (`${a}x = ${a} × x et ${a * b} = ${a} × ${b}. Le facteur commun est ${a}.`) +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
      };
    },
  },
  {
    kind: "fixed",
    id: "facteur_commun_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "facteur_commun",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 4 est un facteur commun dans 4x + 20.",
    format: "open",
    expected: ["4", "multiplie", "x", "5"],
    comparator: "contains_keyword",
    hint: "Écris chaque terme sous forme d’un produit par 4.",
    explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          ("4x = 4 × x et 20 = 4 × 5. Donc 4 est un facteur commun.") +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["factorisation", "facteur_commun", "open"],
  },

  // =========================
  // FACTORISER_SIMPLE
  // =========================
  {
    kind: "fixed",
    id: "factoriser_simple_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Factoriser : 3x + 12",
    format: "qcm",
    choices: ["3(x + 4)", "3x(12)", "x(3 + 12)", "3(x + 12)"],
    expected: ["3(x + 4)"],
    comparator: "mcq_exact",
    hint: "Mets 3 en facteur.",
    explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          ("3x + 12 = 3 × x + 3 × 4 = 3(x + 4).") +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["factorisation", "simple", "qcm"],
  },
  {
    kind: "fixed",
    id: "factoriser_simple_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Factoriser : 5x - 20",
    format: "qcm",
    choices: ["5(x - 4)", "5(x + 4)", "x(5 - 20)", "5x(1 - 4)"],
    expected: ["5(x - 4)"],
    comparator: "mcq_exact",
    hint: "20 = 5 × 4.",
    explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          ("5x - 20 = 5 × x - 5 × 4 = 5(x - 4).") +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["factorisation", "simple", "signe"],
  },
  {
    kind: "template",
    id: "factoriser_simple_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Mets le facteur commun devant la parenthèse.",
    tags: ["factorisation", "simple", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(1, 9);

      return {
        text: `Factoriser : ${a}x + ${a * b}`,
        format: "short",
        expected: factorizedForms(a, b, "+"),
        comparator: "contains_keyword",
        explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          (`${a}x + ${a * b} = ${a} × x + ${a} × ${b} = ${a}(x + ${b}).`) +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
      };
    },
  },
  {
    kind: "template",
    id: "factoriser_simple_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention au signe dans la parenthèse.",
    tags: ["factorisation", "simple", "soustraction", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(1, 9);

      return {
        text: `Factoriser : ${a}x - ${a * b}`,
        format: "short",
        expected: factorizedForms(a, b, "-"),
        comparator: "contains_keyword",
        explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          (`${a}x - ${a * b} = ${a} × x - ${a} × ${b} = ${a}(x - ${b}).`) +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
      };
    },
  },
  {
    kind: "template",
    id: "factoriser_simple_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_simple",
    difficulty: 3,
    theme: "neutral",
    hint: "x est présent dans les deux termes.",
    tags: ["factorisation", "x_commun", "template"],
    generate: () => {
      const a = randomInt(2, 9);

      return {
        text: `Factoriser : x² + ${a}x`,
        format: "short",
        expected: [`x(x+${a})`, `x(x + ${a})`],
        comparator: "contains_keyword",
        explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          (`x² + ${a}x = x × x + ${a} × x = x(x + ${a}).`) +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
      };
    },
  },
  {
    kind: "fixed",
    id: "factoriser_simple_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_simple",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 6x + 18 = 6(x + 3).",
    format: "open",
    expected: ["6", "facteur commun", "x", "3"],
    comparator: "contains_keyword",
    hint: "Écris 6x et 18 comme des produits par 6.",
    explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          ("6x = 6 × x et 18 = 6 × 3. Donc 6x + 18 = 6(x + 3).") +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["factorisation", "simple", "open"],
  },

  // =========================
  // FACTORISER_IR
  // =========================
  {
    kind: "fixed",
    id: "factoriser_ir_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_ir",
    difficulty: 3,
    theme: "neutral",
    text: "Factoriser : x² + 6x + 9",
    format: "qcm",
    choices: ["(x + 3)²", "(x - 3)²", "(x - 3)(x + 3)", "x(x + 9)"],
    expected: ["(x + 3)²"],
    comparator: "mcq_exact",
    hint: "9 = 3² et 6x = 2 × 3 × x.",
    explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          ("x² + 6x + 9 = x² + 2 × x × 3 + 3² = (x + 3)².") +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["factorisation", "identite_remarquable", "somme"],
  },
  {
    kind: "fixed",
    id: "factoriser_ir_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_ir",
    difficulty: 3,
    theme: "neutral",
    text: "Factoriser : x² - 8x + 16",
    format: "qcm",
    choices: ["(x - 4)²", "(x + 4)²", "(x - 4)(x + 4)", "x(x - 16)"],
    expected: ["(x - 4)²"],
    comparator: "mcq_exact",
    hint: "16 = 4² et -8x = -2 × 4 × x.",
    explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          ("x² - 8x + 16 = x² - 2 × x × 4 + 4² = (x - 4)².") +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["factorisation", "identite_remarquable", "difference"],
  },
  {
    kind: "fixed",
    id: "factoriser_ir_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_ir",
    difficulty: 3,
    theme: "neutral",
    text: "Factoriser : x² - 25",
    format: "qcm",
    choices: ["(x - 5)(x + 5)", "(x - 5)²", "(x + 5)²", "x(x - 25)"],
    expected: ["(x - 5)(x + 5)"],
    comparator: "mcq_exact",
    hint: "C’est une différence de deux carrés.",
    explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          ("x² - 25 = x² - 5² = (x - 5)(x + 5).") +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["factorisation", "difference_carres"],
  },
  {
    kind: "template",
    id: "factoriser_ir_tpl_somme_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_ir",
    difficulty: 4,
    theme: "neutral",
    hint: "Reconnais x² + 2ax + a².",
    tags: ["factorisation", "identite_remarquable", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const mid = 2 * a;
      const square = a * a;

      return {
        text: `Factoriser : x² + ${mid}x + ${square}`,
        format: "short",
        expected: [`(x+${a})²`, `(x + ${a})²`, `(x+${a})^2`, `(x + ${a})^2`],
        comparator: "contains_keyword",
        explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          (`x² + ${mid}x + ${square} = x² + 2 × x × ${a} + ${a}² = (x + ${a})².`) +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
      };
    },
  },
  {
    kind: "template",
    id: "factoriser_ir_tpl_difference_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_ir",
    difficulty: 4,
    theme: "neutral",
    hint: "Reconnais x² - 2ax + a².",
    tags: ["factorisation", "identite_remarquable", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const mid = 2 * a;
      const square = a * a;

      return {
        text: `Factoriser : x² - ${mid}x + ${square}`,
        format: "short",
        expected: [`(x-${a})²`, `(x - ${a})²`, `(x-${a})^2`, `(x - ${a})^2`],
        comparator: "contains_keyword",
        explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          (`x² - ${mid}x + ${square} = x² - 2 × x × ${a} + ${a}² = (x - ${a})².`) +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
      };
    },
  },
  {
    kind: "template",
    id: "factoriser_ir_tpl_carres_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_ir",
    difficulty: 4,
    theme: "neutral",
    hint: "Reconnais x² - a².",
    tags: ["factorisation", "difference_carres", "template"],
    generate: () => {
      const a = randomInt(2, 12);
      const square = a * a;

      return {
        text: `Factoriser : x² - ${square}`,
        format: "short",
        expected: [
          `(x-${a})(x+${a})`,
          `(x - ${a})(x + ${a})`,
          `(x+${a})(x-${a})`,
          `(x + ${a})(x - ${a})`,
        ],
        comparator: "contains_keyword",
        explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          (`x² - ${square} = x² - ${a}² = (x - ${a})(x + ${a}).`) +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
      };
    },
  },

  // =========================
  // FACTORISER_VERIFIER
  // =========================
  {
    kind: "fixed",
    id: "factoriser_verifier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "La factorisation 4x + 12 = 4(x + 3) est-elle correcte ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Développe 4(x + 3).",
    explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          ("4(x + 3) = 4x + 12. La factorisation est correcte.") +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["factorisation", "verifier"],
  },
  {
    kind: "fixed",
    id: "factoriser_verifier_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "La factorisation 3x + 15 = 3(x + 15) est-elle correcte ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Développe 3(x + 15).",
    explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          ("3(x + 15) = 3x + 45, pas 3x + 15. La bonne factorisation est 3(x + 5).") +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["factorisation", "verifier", "erreur"],
  },
  {
    kind: "template",
    id: "factoriser_verifier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Développe la forme factorisée pour comparer.",
    tags: ["factorisation", "verifier", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(1, 9);
      const isCorrect = randomChoice([true, false]);
      const proposed = isCorrect ? `${a}(x + ${b})` : `${a}(x + ${a * b})`;
      const expected = `${a}x + ${a * b}`;

      return {
        text: `La factorisation ${expected} = ${proposed} est-elle correcte ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [isCorrect ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          (isCorrect
          ? `${proposed} = ${expected}. La factorisation est correcte.`
          : `${proposed} ne donne pas ${expected} après développement. La bonne factorisation est ${a}(x + ${b}).`) +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
      };
    },
  },
  {
    kind: "fixed",
    id: "factoriser_verifier_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factoriser_verifier",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment vérifier que x² - 25 = (x - 5)(x + 5).",
    format: "open",
    expected: ["développer", "x²", "25"],
    comparator: "contains_keyword",
    hint: "Développe (x - 5)(x + 5).",
    explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          ("On développe : (x - 5)(x + 5) = x² + 5x - 5x - 25 = x² - 25.") +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["factorisation", "verifier", "open"],
  },

  // =========================
  // FACTORISATION_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "factorisation_defis_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factorisation_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : 5x + 20 = 5(x + 20). A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Développe 5(x + 20).",
    explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          ("Non. 5(x + 20) = 5x + 100. La bonne factorisation est 5(x + 4).") +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["factorisation", "defi", "erreur"],
  },
  {
    kind: "fixed",
    id: "factorisation_defis_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factorisation_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle méthode est la plus adaptée pour factoriser x² - 36 ?",
    format: "qcm",
    choices: [
      "utiliser la différence de deux carrés",
      "chercher seulement un facteur commun numérique",
      "additionner x² et 36",
      "développer avec la distributivité simple",
    ],
    expected: ["utiliser la différence de deux carrés"],
    comparator: "mcq_exact",
    hint: "36 est un carré parfait.",
    explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          ("x² - 36 = x² - 6² = (x - 6)(x + 6).") +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["factorisation", "defi", "choix_methode"],
  },
  {
    kind: "template",
    id: "factorisation_defis_open_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factorisation_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe la proposition de l’élève.",
    tags: ["factorisation", "defi", "open", "erreur", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);

      return {
        text: `Un élève écrit : ${a}x + ${a * b} = ${a}(x + ${a * b}). Explique son erreur.`,
        format: "open",
        expected: ["erreur", String(b), String(a), "développer"],
        comparator: "contains_keyword",
        explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          (`L’élève a gardé ${a * b} dans la parenthèse. Or ${a * b} = ${a} × ${b}. La bonne factorisation est ${a}(x + ${b}).`) +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
      };
    },
  },
  {
    kind: "template",
    id: "factorisation_defis_tpl_reunion_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "factorisation",
    microId: "factorisation_defis",
    difficulty: 5,
    theme: "reunion",
    hint: "Cherche le facteur commun.",
    tags: ["factorisation", "defi", "reunion", "probleme", "template"],
    generate: () => {
      const lots = randomInt(2, 6);
      const extra = randomInt(1, 5);

      return {
        text: `Pour une sortie à La Réunion, ${lots} groupes achètent chacun x bouteilles d’eau et ${extra} fruits. Exprimer sous forme factorisée le nombre total d’objets.`,
        format: "short",
        expected: [`${lots}(x+${extra})`, `${lots}(x + ${extra})`],
        comparator: "contains_keyword",
        explanation: "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.\n\n" +
          "Méthode : on cherche un facteur commun ou une forme connue, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
          (`Chaque groupe prend x + ${extra} objets. Pour ${lots} groupes, cela donne ${lots}(x + ${extra}).`) +
          "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
      };
    },
  },
];