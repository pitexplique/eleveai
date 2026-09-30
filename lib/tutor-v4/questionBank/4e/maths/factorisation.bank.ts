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
    id: "litteral_facteur_commun_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
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
    tags: ["litteral_factorisation", "litteral_facteur_commun", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_facteur_commun_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
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
    tags: ["litteral_factorisation", "litteral_facteur_commun"],
  },
  {
    kind: "template",
    id: "litteral_facteur_commun_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche le nombre qui multiplie les deux termes.",
    tags: ["litteral_factorisation", "litteral_facteur_commun", "template"],
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
    id: "litteral_facteur_commun_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
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
    tags: ["litteral_factorisation", "litteral_facteur_commun", "open"],
  },

  // =========================
  // FACTORISER_SIMPLE
  // =========================
  {
    kind: "fixed",
    id: "litteral_factoriser_simple_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
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
    tags: ["litteral_factorisation", "simple", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_factoriser_simple_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
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
    tags: ["litteral_factorisation", "simple", "signe"],
  },
  {
    kind: "template",
    id: "litteral_factoriser_simple_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Mets le facteur commun devant la parenthèse.",
    tags: ["litteral_factorisation", "simple", "template"],
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
    id: "litteral_factoriser_simple_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention au signe dans la parenthèse.",
    tags: ["litteral_factorisation", "simple", "soustraction", "template"],
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
    id: "litteral_factoriser_simple_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 3,
    theme: "neutral",
    hint: "x est présent dans les deux termes.",
    tags: ["litteral_factorisation", "x_commun", "template"],
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
    id: "litteral_factoriser_simple_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
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
    tags: ["litteral_factorisation", "simple", "open"],
  },

  // =========================
  // FACTORISER_IR
  // =========================

  // =========================
  // FACTORISER_VERIFIER
  // =========================
  {
    kind: "fixed",
    id: "litteral_factoriser_verifier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
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
    tags: ["litteral_factorisation", "verifier"],
  },
  {
    kind: "fixed",
    id: "litteral_factoriser_verifier_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
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
    tags: ["litteral_factorisation", "verifier", "erreur"],
  },
  {
    kind: "template",
    id: "litteral_factoriser_verifier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Développe la forme factorisée pour comparer.",
    tags: ["litteral_factorisation", "verifier", "template"],
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

  // =========================
  // FACTORISATION_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "litteral_litteral_factorisation_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
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
    tags: ["litteral_factorisation", "defi", "erreur"],
  },
  {
    kind: "template",
    id: "litteral_litteral_factorisation_defi_open_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe la proposition de l’élève.",
    tags: ["litteral_factorisation", "defi", "open", "erreur", "template"],
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
    id: "litteral_litteral_factorisation_defi_tpl_reunion_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Cherche le facteur commun.",
    tags: ["litteral_factorisation", "defi", "reunion", "probleme", "template"],
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

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- FACTEUR_COMMUN ----------
  {
    kind: "fixed",
    id: "litteral_facteur_commun_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression $6x + 9$, quel est le facteur commun ?",
    format: "qcm",
    choices: ["3", "6", "9", "x"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Cherche un nombre qui divise 6 et 9.",
    explanation:
      "Définition : le facteur commun divise tous les termes.\n\n" +
      "Méthode : on cherche un diviseur commun à 6 et 9.\n\n" +
      "Calcul : $6x = 3 \\times 2x$ et $9 = 3 \\times 3$, donc le facteur commun est 3.\n\n" +
      "Conclusion : le facteur commun est 3.",
    tags: ["litteral_factorisation", "litteral_facteur_commun", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_facteur_commun_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 2,
    theme: "neutral",
    text: "Dans l’expression $x^2 + 5x$, quel est le facteur commun ?",
    format: "qcm",
    choices: ["x", "5", "x²", "5x"],
    expected: ["x"],
    comparator: "mcq_exact",
    hint: "La lettre x est présente dans les deux termes.",
    explanation:
      "Définition : le facteur commun peut être une lettre.\n\n" +
      "Méthode : on repère que x apparaît dans $x^2$ et dans $5x$.\n\n" +
      "Calcul : $x^2 = x \\times x$ et $5x = x \\times 5$, donc x est commun.\n\n" +
      "Conclusion : le facteur commun est x.",
    tags: ["litteral_factorisation", "litteral_facteur_commun", "x_commun", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_facteur_commun_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 2,
    theme: "neutral",
    hint: "Le même nombre multiplie les deux lettres.",
    tags: ["litteral_factorisation", "litteral_facteur_commun", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      return {
        text: `Dans l’expression $${a}x + ${a}y$, quel est le facteur commun ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation:
          "Définition : le facteur commun divise tous les termes.\n\n" +
          `Méthode : ${a} multiplie x et y.\n\n` +
          `Calcul : $${a}x = ${a} \\times x$ et $${a}y = ${a} \\times y$.\n\n` +
          `Conclusion : le facteur commun est ${a}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_facteur_commun_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le plus grand nombre qui divise les deux coefficients.",
    tags: ["litteral_factorisation", "litteral_facteur_commun", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(2, 5);
      const c = randomInt(2, 5);
      return {
        text: `Dans l’expression $${a * b}x + ${a * c}$, quel est le plus grand facteur commun ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation:
          "Définition : on cherche le plus grand nombre qui divise les deux termes.\n\n" +
          `Méthode : $${a * b}x = ${a} \\times ${b}x$ et $${a * c} = ${a} \\times ${c}$.\n\n` +
          `Calcul : le facteur commun est ${a}.\n\n` +
          `Conclusion : le facteur commun est ${a}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_facteur_commun_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi x est un facteur commun dans $x^2 + 7x$.",
    format: "open",
    expected: ["x", "x²", "7x"],
    comparator: "contains_keyword",
    hint: "Écris chaque terme comme un produit faisant apparaître x.",
    explanation:
      "Définition : un facteur commun apparaît dans tous les termes.\n\n" +
      "Méthode : on écrit chaque terme comme un produit par x.\n\n" +
      "Calcul : $x^2 = x \\times x$ et $7x = x \\times 7$.\n\n" +
      "Conclusion : x est donc un facteur commun.",
    tags: ["litteral_factorisation", "litteral_facteur_commun", "open"],
  },

  // ---------- FACTORISER_SIMPLE ----------
  {
    kind: "fixed",
    id: "litteral_factoriser_simple_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Factoriser : $7x + 21$",
    format: "qcm",
    choices: ["$7(x + 3)$", "$7(x + 21)$", "$7x(1 + 3)$", "$x(7 + 21)$"],
    expected: ["$7(x + 3)$"],
    comparator: "mcq_exact",
    hint: "$21 = 7 \\times 3$.",
    explanation:
      "Définition : factoriser, c’est mettre le facteur commun devant une parenthèse.\n\n" +
      "Méthode : on met 7 en facteur.\n\n" +
      "Calcul : $7x + 21 = 7 \\times x + 7 \\times 3 = 7(x + 3)$.\n\n" +
      "Conclusion : la forme factorisée est $7(x + 3)$.",
    tags: ["litteral_factorisation", "simple", "qcm"],
  },

  // ---------- FACTORISER_IR ----------

  // ---------- FACTORISER_VERIFIER ----------
  {
    kind: "fixed",
    id: "litteral_factoriser_verifier_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la factorisation correcte de $6x + 9$ ?",
    format: "qcm",
    choices: ["$3(2x + 3)$", "$3(2x + 9)$", "$6(x + 9)$", "$9(x + 6)$"],
    expected: ["$3(2x + 3)$"],
    comparator: "mcq_exact",
    hint: "Vérifie en développant chaque proposition.",
    explanation:
      "Définition : on vérifie en développant.\n\n" +
      "Méthode : on développe $3(2x + 3)$.\n\n" +
      "Calcul : $3(2x + 3) = 6x + 9$.\n\n" +
      "Conclusion : la factorisation correcte est $3(2x + 3)$.",
    tags: ["litteral_factorisation", "verifier", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_factoriser_verifier_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Développe la forme factorisée proposée.",
    tags: ["litteral_factorisation", "verifier", "x_commun", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const correct = randomChoice([true, false]);
      const proposed = correct ? `x(x + ${a})` : `x(x + ${a + 1})`;
      return {
        text: `La factorisation $x^2 + ${a}x = ${proposed}$ est-elle correcte ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [correct ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : on vérifie en développant.\n\n" +
          `Méthode : on développe $${proposed}$.\n\n` +
          `Calcul : $x(x + ${correct ? a : a + 1}) = x^2 + ${correct ? a : a + 1}x$.\n\n` +
          `Conclusion : ${correct ? "oui, c’est correct" : `non, la bonne factorisation est x(x + ${a})`}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_factoriser_verifier_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe la forme factorisée pour comparer au point de départ.",
    tags: ["litteral_factorisation", "verifier", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(1, 9);
      const correct = randomChoice([true, false]);
      const proposed = correct ? `${a}(x + ${b})` : `${a}(x + ${b + 1})`;
      return {
        text: `La factorisation $${a}x + ${a * b} = ${proposed}$ est-elle correcte ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [correct ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : on vérifie une factorisation en développant.\n\n" +
          `Méthode : on développe $${proposed}$.\n\n` +
          `Calcul : $${proposed}$ donne ${correct ? `$${a}x + ${a * b}$` : `$${a}x + ${a * (b + 1)}$`}.\n\n` +
          `Conclusion : ${correct ? "oui, c’est correct" : `non, la bonne factorisation est ${a}(x + ${b})`}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_factoriser_verifier_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment vérifier qu’une factorisation est correcte.",
    format: "open",
    expected: ["développer", "produit", "départ"],
    comparator: "contains_keyword",
    hint: "La factorisation est l’inverse du développement.",
    explanation:
      "Définition : factoriser et développer sont des opérations inverses.\n\n" +
      "Méthode : on développe la forme factorisée obtenue.\n\n" +
      "Calcul : si on retrouve l’expression de départ, la factorisation est correcte.\n\n" +
      "Conclusion : on vérifie en développant le produit obtenu.",
    tags: ["litteral_factorisation", "verifier", "open"],
  },

  // ---------- FACTORISATION_DEFIS ----------
  {
    kind: "fixed",
    id: "litteral_factorisation_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Factoriser : $2x^2 + 6x$",
    format: "qcm",
    choices: ["$2x(x + 3)$", "$2(x^2 + 6)$", "$2x(x + 6)$", "$x(2x + 6)$"],
    expected: ["$2x(x + 3)$"],
    comparator: "mcq_exact",
    hint: "Le facteur commun est $2x$.",
    explanation:
      "Définition : on met en facteur tout ce qui est commun (nombre et lettre).\n\n" +
      "Méthode : $2x$ est commun à $2x^2$ et $6x$.\n\n" +
      "Calcul : $2x^2 + 6x = 2x \\times x + 2x \\times 3 = 2x(x + 3)$.\n\n" +
      "Conclusion : la forme la plus factorisée est $2x(x + 3)$.",
    tags: ["litteral_factorisation", "defi", "facteur_double", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_factorisation_defi_tpl_contexte_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Mets le facteur commun (nombre de groupes) devant la parenthèse.",
    tags: ["litteral_factorisation", "defi", "contexte", "template"],
    generate: () => {
      const groupes = randomInt(2, 6);
      const extra = randomInt(1, 6);
      return {
        text: `Dans un atelier, ${groupes} équipes reçoivent chacune x outils et ${extra} casques. Exprimer le nombre total d’objets sous forme factorisée.`,
        format: "short",
        expected: [`${groupes}(x+${extra})`, `${groupes}(x + ${extra})`],
        comparator: "contains_keyword",
        explanation:
          "Définition : factoriser, c’est écrire une somme comme un produit.\n\n" +
          "Méthode : chaque équipe reçoit $x + " + extra + "$ objets, et il y a " + groupes + " équipes.\n\n" +
          `Calcul : $${groupes} \\times (x + ${extra}) = ${groupes}(x + ${extra})$.\n\n` +
          `Conclusion : la forme factorisée est $${groupes}(x + ${extra})$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_factorisation_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la factorisation est l’opération inverse du développement.",
    format: "open",
    expected: ["produit", "somme", "inverse"],
    comparator: "contains_keyword",
    hint: "Développer transforme un produit en somme ; factoriser fait l’inverse.",
    explanation:
      "Définition : développer transforme un produit en somme ; factoriser transforme une somme en produit.\n\n" +
      "Méthode : on part d’une somme et on cherche le produit qui la donne.\n\n" +
      "Calcul : par exemple $3(x + 2) = 3x + 6$ (développer), et $3x + 6 = 3(x + 2)$ (factoriser).\n\n" +
      "Conclusion : factoriser est l’opération inverse du développement.",
    tags: ["litteral_factorisation", "defi", "open"],
  },
];