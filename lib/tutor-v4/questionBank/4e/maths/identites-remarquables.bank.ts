// lib/tutor-v4/question-banks/maths/4e/identites-remarquables.bank.ts

/**
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Identités remarquables
 *
 * Idée centrale :
 * - une identité remarquable n’est pas une formule magique ;
 * - c’est un raccourci issu de la double distributivité.
 *
 * Progression :
 * 1. ir_lier_distributivite
 *    → comprendre le lien avec (a + b)(a + b), (a - b)(a - b), (a - b)(a + b)
 *
 * 2. ir_reconnaitre
 *    → reconnaître les trois formes classiques
 *
 * 3. ir_developper
 *    → développer en gardant le sens
 *
 * 4. ir_choisir
 *    → choisir entre double distributivité classique et identité remarquable
 *
 * 5. ir_defis
 *    → erreurs fréquentes :
 *      ❌ (a + b)² = a² + b²
 *      ❌ oubli du 2ab
 *      ❌ erreur de signe dans (a - b)²
 *      ❌ confusion avec a² - b²
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

export const identitesRemarquablesBank: TutorBankItemV4[] = [
  // =========================
  // IR_LIER_DISTRIBUTIVITE
  // =========================
  {
    kind: "fixed",
    id: "litteral_identite_lier_litteral_distributivite_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 1,
    theme: "neutral",
    text: "Pourquoi peut-on écrire (x + 3)² = (x + 3)(x + 3) ?",
    format: "qcm",
    choices: [
      "car le carré signifie multiplier par soi-même",
      "car on additionne deux parenthèses",
      "car x² = x + x",
      "car 3² = 6",
    ],
    expected: ["car le carré signifie multiplier par soi-même"],
    comparator: "mcq_exact",
    hint: "Un carré signifie qu’une expression est multipliée par elle-même.",
    explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          ("(x + 3)² signifie (x + 3) multiplié par lui-même, donc (x + 3)(x + 3).") +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "sens"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_lier_litteral_distributivite_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 2,
    theme: "neutral",
    text: "Développer par double distributivité : (x + 2)(x + 2)",
    format: "qcm",
    choices: [
      "x² + 4x + 4",
      "x² + 4",
      "2x + 4",
      "x² + 2x + 4",
    ],
    expected: ["x² + 4x + 4"],
    comparator: "mcq_exact",
    hint: "Fais les 4 produits : x×x, x×2, 2×x, 2×2.",
    explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          ("(x + 2)(x + 2) = x² + 2x + 2x + 4 = x² + 4x + 4.") +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
    tags: ["litteral_identite_remarquable", "double_distributivite"],
  },
  {
    kind: "template",
    id: "litteral_identite_lier_litteral_distributivite_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace le carré par un produit de deux parenthèses identiques.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "template"],
    generate: () => {
      const a = randomInt(1, 8);

      return {
        text: `Quelle écriture correspond à (x + ${a})² ?`,
        format: "qcm",
        choices: shuffle([
          `(x + ${a})(x + ${a})`,
          `x² + ${a}²`,
          `(x + ${a}) + (x + ${a})`,
          `${a}(x + ${a})`,
        ]),
        expected: [`(x + ${a})(x + ${a})`],
        comparator: "mcq_exact",
        explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          (`(x + ${a})² signifie (x + ${a}) multiplié par lui-même : (x + ${a})(x + ${a}).`) +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_identite_lier_litteral_distributivite_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 3,
    theme: "neutral",
    hint: "Développe avec les 4 produits, puis réduis.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "template"],
    generate: () => {
      const a = randomInt(1, 6);
      const mid = 2 * a;
      const last = a * a;

      return {
        text: `Développer par double distributivité : (x + ${a})(x + ${a})`,
        format: "short",
        expected: [
          `x²+${mid}x+${last}`,
          `x² + ${mid}x + ${last}`,
          `x^2+${mid}x+${last}`,
          `x^2 + ${mid}x + ${last}`,
        ],
        comparator: "contains_keyword",
        explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          (`(x + ${a})(x + ${a}) = x² + ${a}x + ${a}x + ${last} = x² + ${mid}x + ${last}.`) +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_identite_lier_litteral_distributivite_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi (x + 4)² donne x² + 8x + 16 en passant par la double distributivité.",
    format: "open",
    expected: ["(x + 4)(x + 4)", "x²", "4x", "8x", "16"],
    comparator: "contains_keyword",
    hint: "Commence par écrire (x + 4)² sous forme de produit.",
    explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          ("(x + 4)² = (x + 4)(x + 4) = x² + 4x + 4x + 16 = x² + 8x + 16.") +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
    tags: ["litteral_identite_remarquable", "open", "justification"],
  },

  // =========================
  // IR_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "litteral_identite_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression est de la forme (a + b)² ?",
    format: "qcm",
    choices: ["(x + 5)²", "(x + 5)(x - 5)", "x + 5²", "2(x + 5)"],
    expected: ["(x + 5)²"],
    comparator: "mcq_exact",
    hint: "On cherche une somme entre parenthèses élevée au carré.",
    explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          ("(x + 5)² est bien de la forme (a + b)².") +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
    tags: ["litteral_identite_remarquable", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_reconnaitre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression correspond à une différence de deux carrés ?",
    format: "qcm",
    choices: ["(x - 3)(x + 3)", "(x + 3)²", "(x - 3)²", "x² + 9"],
    expected: ["(x - 3)(x + 3)"],
    comparator: "mcq_exact",
    hint: "La différence de deux carrés vient de (a - b)(a + b).",
    explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          ("(x - 3)(x + 3) correspond à la forme (a - b)(a + b), qui donne a² - b².") +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
    tags: ["litteral_identite_remarquable", "difference_carres"],
  },
  {
    kind: "template",
    id: "litteral_identite_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde la structure : carré d’une somme, carré d’une différence ou produit somme-différence.",
    tags: ["litteral_identite_remarquable", "reconnaitre", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const mode = randomChoice(["somme", "difference", "carres"]);

      const correct =
        mode === "somme"
          ? "carré d’une somme"
          : mode === "difference"
            ? "carré d’une différence"
            : "différence de deux carrés";

      const expression =
        mode === "somme"
          ? `(x + ${a})²`
          : mode === "difference"
            ? `(x - ${a})²`
            : `(x - ${a})(x + ${a})`;

      return {
        text: `Quelle est la forme de ${expression} ?`,
        format: "qcm",
        choices: shuffle([
          "carré d’une somme",
          "carré d’une différence",
          "différence de deux carrés",
          "distributivité simple",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          (mode === "somme"
            ? `${expression} est de la forme (a + b)².`
            : mode === "difference"
              ? `${expression} est de la forme (a - b)².`
              : `${expression} est de la forme (a - b)(a + b).`) +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
      };
    },
  },

  // =========================
  // IR_DEVELOPPER
  // =========================
  {
    kind: "fixed",
    id: "litteral_identite_developper_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 2,
    theme: "neutral",
    text: "Développer : (x + 3)²",
    format: "qcm",
    choices: [
      "x² + 6x + 9",
      "x² + 9",
      "x² + 3x + 9",
      "2x + 6",
    ],
    expected: ["x² + 6x + 9"],
    comparator: "mcq_exact",
    hint: "Pense à (x + 3)(x + 3).",
    explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          ("(x + 3)² = (x + 3)(x + 3) = x² + 6x + 9.") +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
    tags: ["litteral_identite_remarquable", "developper"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_developper_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 2,
    theme: "neutral",
    text: "Développer : (x - 4)²",
    format: "qcm",
    choices: [
      "x² - 8x + 16",
      "x² - 16",
      "x² + 8x + 16",
      "x² - 4x + 16",
    ],
    expected: ["x² - 8x + 16"],
    comparator: "mcq_exact",
    hint: "Pense à (x - 4)(x - 4).",
    explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          ("(x - 4)² = (x - 4)(x - 4) = x² - 4x - 4x + 16 = x² - 8x + 16.") +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
    tags: ["litteral_identite_remarquable", "developper", "signe"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_developper_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 2,
    theme: "neutral",
    text: "Développer : (x - 5)(x + 5)",
    format: "qcm",
    choices: [
      "x² - 25",
      "x² + 25",
      "x² - 10x + 25",
      "x² + 10x + 25",
    ],
    expected: ["x² - 25"],
    comparator: "mcq_exact",
    hint: "C’est une différence de deux carrés.",
    explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          ("(x - 5)(x + 5) = x² - 25.") +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
    tags: ["litteral_identite_remarquable", "difference_carres"],
  },
  {
    kind: "template",
    id: "litteral_identite_developper_tpl_somme_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "Passe par (x + a)(x + a), puis réduis.",
    tags: ["litteral_identite_remarquable", "developper", "somme", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      const mid = 2 * a;
      const last = a * a;

      return {
        text: `Développer : (x + ${a})²`,
        format: "short",
        expected: [
          `x²+${mid}x+${last}`,
          `x² + ${mid}x + ${last}`,
          `x^2+${mid}x+${last}`,
          `x^2 + ${mid}x + ${last}`,
        ],
        comparator: "contains_keyword",
        explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          (`(x + ${a})² = (x + ${a})(x + ${a}) = x² + ${a}x + ${a}x + ${last} = x² + ${mid}x + ${last}.`) +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_identite_developper_tpl_difference_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention au signe du terme du milieu.",
    tags: ["litteral_identite_remarquable", "developper", "difference", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      const mid = 2 * a;
      const last = a * a;

      return {
        text: `Développer : (x - ${a})²`,
        format: "short",
        expected: [
          `x²-${mid}x+${last}`,
          `x² - ${mid}x + ${last}`,
          `x^2-${mid}x+${last}`,
          `x^2 - ${mid}x + ${last}`,
        ],
        comparator: "contains_keyword",
        explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          (`(x - ${a})² = (x - ${a})(x - ${a}) = x² - ${a}x - ${a}x + ${last} = x² - ${mid}x + ${last}.`) +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_identite_developper_tpl_carres_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "Les termes en x s’annulent.",
    tags: ["litteral_identite_remarquable", "difference_carres", "template"],
    generate: () => {
      const a = randomInt(1, 12);
      const last = a * a;

      return {
        text: `Développer : (x - ${a})(x + ${a})`,
        format: "short",
        expected: [
          `x²-${last}`,
          `x² - ${last}`,
          `x^2-${last}`,
          `x^2 - ${last}`,
        ],
        comparator: "contains_keyword",
        explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          (`(x - ${a})(x + ${a}) = x² + ${a}x - ${a}x - ${last} = x² - ${last}.`) +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
      };
    },
  },

  // =========================
  // IR_CHOISIR
  // =========================
  {
    kind: "fixed",
    id: "litteral_identite_choisir_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "Pour développer (x + 7)², quelle méthode est la plus adaptée ?",
    format: "qcm",
    choices: [
      "écrire (x + 7)(x + 7), puis appliquer la double distributivité",
      "additionner x² et 7² seulement",
      "multiplier x par 7",
      "calculer seulement 7²",
    ],
    expected: ["écrire (x + 7)(x + 7), puis appliquer la double distributivité"],
    comparator: "mcq_exact",
    hint: "Un carré d’expression signifie produit par soi-même.",
    explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          ("La méthode correcte est de passer par (x + 7)(x + 7), puis de développer.") +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
    tags: ["litteral_identite_remarquable", "choisir"],
  },
  {
    kind: "template",
    id: "litteral_identite_choisir_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    hint: "Identifie d’abord la structure de l’expression.",
    tags: ["litteral_identite_remarquable", "choisir", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const mode = randomChoice(["somme", "difference", "carres", "classique"]);

      const expression =
        mode === "somme"
          ? `(x + ${a})²`
          : mode === "difference"
            ? `(x - ${a})²`
            : mode === "carres"
              ? `(x - ${a})(x + ${a})`
              : `(x + ${a})(x + ${a + 1})`;

      const correct =
        mode === "somme"
          ? "carré d’une somme"
          : mode === "difference"
            ? "carré d’une différence"
            : mode === "carres"
              ? "différence de deux carrés"
              : "double distributivité classique";

      return {
        text: `Quelle méthode reconnais-tu pour développer ${expression} ?`,
        format: "qcm",
        choices: shuffle([
          "carré d’une somme",
          "carré d’une différence",
          "différence de deux carrés",
          "double distributivité classique",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          (mode === "classique"
            ? `${expression} n’a pas deux parenthèses identiques ni une forme (a - b)(a + b), donc on utilise la double distributivité classique.`
            : `${expression} correspond à : ${correct}.`) +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
      };
    },
  },

  // =========================
  // IR_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "litteral_identite_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : (x + 5)² = x² + 25. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il manque le double produit.",
    explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          ("Non. (x + 5)² = (x + 5)(x + 5) = x² + 10x + 25. Il manque 10x.") +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
    tags: ["litteral_identite_remarquable", "erreur", "defi"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : (x - 4)² = x² - 16. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il confond carré d’une différence et différence de deux carrés.",
    explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          ("Non. (x - 4)² = x² - 8x + 16. En revanche, (x - 4)(x + 4) = x² - 16.") +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
    tags: ["litteral_identite_remarquable", "erreur", "defi"],
  },
  {
    kind: "template",
    id: "litteral_identite_defi_open_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe en écrivant le carré comme un produit de deux parenthèses.",
    tags: ["litteral_identite_remarquable", "open", "erreur", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const mid = 2 * a;
      const last = a * a;

      return {
        text: `Explique l’erreur : (x + ${a})² = x² + ${last}.`,
        format: "open",
        expected: ["double produit", `${mid}x`, "manque"],
        comparator: "contains_keyword",
        explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          (`L’erreur est l’oubli du double produit. (x + ${a})² = (x + ${a})(x + ${a}) = x² + ${mid}x + ${last}. Il manque ${mid}x.`) +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_identite_defi_tpl_comparaison_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les deux formes : carré d’une différence et produit somme-différence.",
    tags: ["litteral_identite_remarquable", "defi", "comparaison", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const square = a * a;
      const mid = 2 * a;

      return {
        text: `Quelle est la différence entre (x - ${a})² et (x - ${a})(x + ${a}) ?`,
        format: "qcm",
        choices: shuffle([
          `(x - ${a})² = x² - ${mid}x + ${square}, tandis que (x - ${a})(x + ${a}) = x² - ${square}`,
          "les deux expressions donnent toujours le même résultat",
          `(x - ${a})² = x² - ${square}, tandis que (x - ${a})(x + ${a}) = x² - ${mid}x + ${square}`,
          "aucune des deux ne se développe",
        ]),
        expected: [
          `(x - ${a})² = x² - ${mid}x + ${square}, tandis que (x - ${a})(x + ${a}) = x² - ${square}`,
        ],
        comparator: "mcq_exact",
        explanation: "Définition : une identité remarquable est une formule qui permet de développer ou factoriser rapidement certaines expressions.\n\n" +
          "Méthode : on reconnaît la forme (a + b)², (a - b)² ou (a + b)(a - b).\n\nCalcul : " +
          (`(x - ${a})² est un carré d’une différence : x² - ${mid}x + ${square}. Mais (x - ${a})(x + ${a}) est une différence de deux carrés : x² - ${square}.`) +
          "\n\nConclusion : la formule donne directement l’expression correcte.",
      };
    },
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- IR_LIER_DISTRIBUTIVITE ----------
  {
    kind: "fixed",
    id: "litteral_identite_lier_litteral_distributivite_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle écriture correspond à $(x - 2)^2$ ?",
    format: "qcm",
    choices: ["$(x - 2)(x - 2)$", "$x^2 - 2^2$", "$(x - 2) + (x - 2)$", "$2(x - 2)$"],
    expected: ["$(x - 2)(x - 2)$"],
    comparator: "mcq_exact",
    hint: "Le carré signifie multiplier par soi-même.",
    explanation:
      "Définition : élever au carré, c’est multiplier l’expression par elle-même.\n\n" +
      "Méthode : on récrit le carré comme un produit.\n\n" +
      "Calcul : $(x - 2)^2 = (x - 2)(x - 2)$.\n\n" +
      "Conclusion : l’écriture est $(x - 2)(x - 2)$.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_lier_litteral_distributivite_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 2,
    theme: "neutral",
    text: "Développer par double distributivité : $(x + 1)(x + 1)$",
    format: "qcm",
    choices: ["$x^2 + 2x + 1$", "$x^2 + 1$", "$x^2 + x + 1$", "$2x + 1$"],
    expected: ["$x^2 + 2x + 1$"],
    comparator: "mcq_exact",
    hint: "Fais les quatre produits puis réduis.",
    explanation:
      "Définition : la double distributivité fait quatre produits.\n\n" +
      "Méthode : $(x+1)(x+1) = x^2 + x + x + 1$.\n\n" +
      "Calcul : $= x^2 + 2x + 1$.\n\n" +
      "Conclusion : le résultat est $x^2 + 2x + 1$.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_lier_litteral_distributivite_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle égalité est FAUSSE ?",
    format: "qcm",
    choices: [
      "$(x + 3)^2 = x^2 + 9$",
      "$(x + 3)^2 = (x + 3)(x + 3)$",
      "$(x + 3)^2 = x^2 + 6x + 9$",
      "$(x + 3)(x + 3) = x^2 + 6x + 9$",
    ],
    expected: ["$(x + 3)^2 = x^2 + 9$"],
    comparator: "mcq_exact",
    hint: "Le carré d’une somme n’est pas la somme des carrés.",
    explanation:
      "Définition : $(a + b)^2 = a^2 + 2ab + b^2$, et non $a^2 + b^2$.\n\n" +
      "Méthode : on compare chaque égalité à la vraie formule.\n\n" +
      "Calcul : $(x + 3)^2 = x^2 + 6x + 9$, donc « $= x^2 + 9$ » est faux.\n\n" +
      "Conclusion : l’égalité fausse est $(x + 3)^2 = x^2 + 9$.",
    tags: ["litteral_identite_remarquable", "erreur", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_identite_lier_litteral_distributivite_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 2,
    theme: "neutral",
    hint: "Le carré d’une différence est aussi un produit par soi-même.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "template"],
    generate: () => {
      const a = randomInt(1, 8);
      return {
        text: `Quelle écriture correspond à $(x - ${a})^2$ ?`,
        format: "qcm",
        choices: shuffle([
          `$(x - ${a})(x - ${a})$`,
          `$x^2 - ${a}^2$`,
          `$(x - ${a}) + (x - ${a})$`,
          `$${a}(x - ${a})$`,
        ]),
        expected: [`$(x - ${a})(x - ${a})$`],
        comparator: "mcq_exact",
        explanation:
          "Définition : élever au carré, c’est multiplier par soi-même.\n\n" +
          `Méthode : on récrit $(x - ${a})^2$ comme un produit.\n\n` +
          `Calcul : $(x - ${a})^2 = (x - ${a})(x - ${a})$.\n\n` +
          `Conclusion : l’écriture est $(x - ${a})(x - ${a})$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_identite_lier_litteral_distributivite_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi $(x - 3)^2$ donne $x^2 - 6x + 9$ en passant par la double distributivité.",
    format: "open",
    expected: ["(x - 3)(x - 3)", "6x", "9", "x²"],
    comparator: "contains_keyword",
    hint: "Écris d’abord le carré comme un produit.",
    explanation:
      "Définition : un carré est un produit par soi-même.\n\n" +
      "Méthode : on développe les quatre produits.\n\n" +
      "Calcul : $(x - 3)^2 = (x - 3)(x - 3) = x^2 - 3x - 3x + 9 = x^2 - 6x + 9$.\n\n" +
      "Conclusion : $(x - 3)^2 = x^2 - 6x + 9$.",
    tags: ["litteral_identite_remarquable", "open"],
  },

  // ---------- IR_RECONNAITRE ----------
  {
    kind: "fixed",
    id: "litteral_identite_reconnaitre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression est de la forme $(a - b)^2$ ?",
    format: "qcm",
    choices: ["$(x - 6)^2$", "$(x - 6)(x + 6)$", "$(x + 6)^2$", "$x^2 - 6$"],
    expected: ["$(x - 6)^2$"],
    comparator: "mcq_exact",
    hint: "On cherche une différence entre parenthèses élevée au carré.",
    explanation:
      "Définition : $(a - b)^2$ est le carré d’une différence.\n\n" +
      "Méthode : on cherche une différence au carré.\n\n" +
      "Calcul : $(x - 6)^2$ est de la forme $(a - b)^2$.\n\n" +
      "Conclusion : c’est $(x - 6)^2$.",
    tags: ["litteral_identite_remarquable", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_reconnaitre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "De quelle identité provient l’expression développée $x^2 + 10x + 25$ ?",
    format: "qcm",
    choices: ["$(x + 5)^2$", "$(x - 5)^2$", "$(x - 5)(x + 5)$", "$(x + 10)^2$"],
    expected: ["$(x + 5)^2$"],
    comparator: "mcq_exact",
    hint: "Cherche un carré : 25 = 5², et 10 = 2 × 5.",
    explanation:
      "Définition : $(a + b)^2 = a^2 + 2ab + b^2$.\n\n" +
      "Méthode : on identifie $b^2 = 25$ donc $b = 5$, et on vérifie $2b = 10$.\n\n" +
      "Calcul : $x^2 + 10x + 25 = (x + 5)^2$.\n\n" +
      "Conclusion : l’identité est $(x + 5)^2$.",
    tags: ["litteral_identite_remarquable", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_reconnaitre_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "L’expression $x^2 - 49$ correspond à quelle identité ?",
    format: "qcm",
    choices: ["$(x - 7)(x + 7)$", "$(x - 7)^2$", "$(x + 7)^2$", "$(x - 49)(x + 1)$"],
    expected: ["$(x - 7)(x + 7)$"],
    comparator: "mcq_exact",
    hint: "C’est une différence de deux carrés : 49 = 7².",
    explanation:
      "Définition : $a^2 - b^2 = (a - b)(a + b)$.\n\n" +
      "Méthode : on reconnaît $49 = 7^2$.\n\n" +
      "Calcul : $x^2 - 49 = (x - 7)(x + 7)$.\n\n" +
      "Conclusion : c’est $(x - 7)(x + 7)$.",
    tags: ["litteral_identite_remarquable", "reconnaitre", "difference_carres", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_identite_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Carré d’une somme, d’une différence, ou produit somme-différence.",
    tags: ["litteral_identite_remarquable", "reconnaitre", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const mode = randomChoice(["somme", "difference", "carres"]);
      const expression =
        mode === "somme"
          ? `(x + ${a})^2`
          : mode === "difference"
          ? `(x - ${a})^2`
          : `(x + ${a})(x - ${a})`;
      const correct =
        mode === "somme"
          ? "carré d’une somme"
          : mode === "difference"
          ? "carré d’une différence"
          : "différence de deux carrés";
      return {
        text: `Quelle est la forme de $${expression}$ ?`,
        format: "qcm",
        choices: shuffle([
          "carré d’une somme",
          "carré d’une différence",
          "différence de deux carrés",
          "distributivité simple",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : on reconnaît les trois identités remarquables.\n\n" +
          "Méthode : on observe la structure de l’expression.\n\n" +
          `Calcul : $${expression}$ correspond à : ${correct}.\n\n` +
          `Conclusion : c’est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_identite_reconnaitre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le terme du milieu et le signe indiquent l’identité.",
    tags: ["litteral_identite_remarquable", "reconnaitre", "developpe", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const mid = 2 * a;
      const sq = a * a;
      const mode = randomChoice(["somme", "difference", "carres"]);
      const expr =
        mode === "somme"
          ? `x^2 + ${mid}x + ${sq}`
          : mode === "difference"
          ? `x^2 - ${mid}x + ${sq}`
          : `x^2 - ${sq}`;
      const correct =
        mode === "somme"
          ? `$(x + ${a})^2$`
          : mode === "difference"
          ? `$(x - ${a})^2$`
          : `$(x - ${a})(x + ${a})$`;
      return {
        text: `L’expression développée $${expr}$ provient de quelle identité ?`,
        format: "qcm",
        choices: shuffle([
          `$(x + ${a})^2$`,
          `$(x - ${a})^2$`,
          `$(x - ${a})(x + ${a})$`,
          `$(x + ${a})(x + ${a + 1})$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : on remonte de la forme développée à l’identité.\n\n" +
          "Méthode : on regarde le signe du terme du milieu et la présence d’un double produit.\n\n" +
          `Calcul : $${expr}$ provient de ${correct}.\n\n` +
          `Conclusion : l’identité est ${correct}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_identite_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment distinguer une expression de la forme $(a + b)^2$ d’une expression de la forme $(a - b)(a + b)$.",
    format: "open",
    expected: ["carré", "différence", "signe"],
    comparator: "contains_keyword",
    hint: "L’une est un carré, l’autre un produit somme-différence.",
    explanation:
      "Définition : $(a + b)^2$ est un carré ; $(a - b)(a + b)$ est un produit somme-différence.\n\n" +
      "Méthode : on regarde si l’expression est un carré ou le produit d’une somme par une différence.\n\n" +
      "Calcul : $(a + b)^2$ donne $a^2 + 2ab + b^2$ ; $(a - b)(a + b)$ donne $a^2 - b^2$.\n\n" +
      "Conclusion : le carré garde un double produit, le produit somme-différence l’élimine.",
    tags: ["litteral_identite_remarquable", "reconnaitre", "open"],
  },

  // ---------- IR_DEVELOPPER ----------
  {
    kind: "fixed",
    id: "litteral_identite_developper_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 2,
    theme: "neutral",
    text: "Développer : $(x + 6)^2$",
    format: "qcm",
    choices: ["$x^2 + 12x + 36$", "$x^2 + 36$", "$x^2 + 6x + 36$", "$x^2 + 12x + 12$"],
    expected: ["$x^2 + 12x + 36$"],
    comparator: "mcq_exact",
    hint: "$2 \\times 6 = 12$ et $6^2 = 36$.",
    explanation:
      "Définition : $(a + b)^2 = a^2 + 2ab + b^2$.\n\n" +
      "Méthode : ici $a = x$, $b = 6$.\n\n" +
      "Calcul : $(x + 6)^2 = x^2 + 12x + 36$.\n\n" +
      "Conclusion : le résultat est $x^2 + 12x + 36$.",
    tags: ["litteral_identite_remarquable", "developper", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_developper_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 2,
    theme: "neutral",
    text: "Développer : $(x - 7)(x + 7)$",
    format: "qcm",
    choices: ["$x^2 - 49$", "$x^2 + 49$", "$x^2 - 14x + 49$", "$x^2 - 14x - 49$"],
    expected: ["$x^2 - 49$"],
    comparator: "mcq_exact",
    hint: "Différence de deux carrés.",
    explanation:
      "Définition : $(a - b)(a + b) = a^2 - b^2$.\n\n" +
      "Méthode : les termes en x s’annulent.\n\n" +
      "Calcul : $(x - 7)(x + 7) = x^2 - 49$.\n\n" +
      "Conclusion : le résultat est $x^2 - 49$.",
    tags: ["litteral_identite_remarquable", "developper", "difference_carres", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_identite_developper_tpl_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "$(a + b)^2 = a^2 + 2ab + b^2$.",
    tags: ["litteral_identite_remarquable", "developper", "qcm", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const mid = 2 * a;
      const sq = a * a;
      const correct = `$x^2 + ${mid}x + ${sq}$`;
      return {
        text: `Développer : $(x + ${a})^2$`,
        format: "qcm",
        choices: shuffle([
          correct,
          `$x^2 + ${sq}$`,
          `$x^2 + ${a}x + ${sq}$`,
          `$x^2 + ${mid}x + ${a}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : $(a + b)^2 = a^2 + 2ab + b^2$.\n\n" +
          `Méthode : ici $a = x$, $b = ${a}$.\n\n` +
          `Calcul : $(x + ${a})^2 = x^2 + ${mid}x + ${sq}$.\n\n` +
          `Conclusion : le résultat est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_identite_developper_tpl_carres_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "$(a - b)(a + b) = a^2 - b^2$.",
    tags: ["litteral_identite_remarquable", "developper", "difference_carres", "qcm", "template"],
    generate: () => {
      const a = randomInt(2, 11);
      const sq = a * a;
      const mid = 2 * a;
      const correct = `$x^2 - ${sq}$`;
      return {
        text: `Développer : $(x - ${a})(x + ${a})$`,
        format: "qcm",
        choices: shuffle([
          correct,
          `$x^2 + ${sq}$`,
          `$x^2 - ${mid}x + ${sq}$`,
          `$x^2 - ${mid}x - ${sq}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : $(a - b)(a + b) = a^2 - b^2$.\n\n" +
          "Méthode : les termes en x s’annulent.\n\n" +
          `Calcul : $(x - ${a})(x + ${a}) = x^2 - ${sq}$.\n\n` +
          `Conclusion : le résultat est ${correct}.`,
      };
    },
  },

  // ---------- IR_CHOISIR ----------
  {
    kind: "fixed",
    id: "litteral_identite_choisir_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle formule s’applique pour développer $(a + b)^2$ ?",
    format: "qcm",
    choices: [
      "$a^2 + 2ab + b^2$",
      "$a^2 + b^2$",
      "$a^2 - 2ab + b^2$",
      "$a^2 - b^2$",
    ],
    expected: ["$a^2 + 2ab + b^2$"],
    comparator: "mcq_exact",
    hint: "C’est le carré d’une somme.",
    explanation:
      "Définition : le carré d’une somme suit $(a + b)^2 = a^2 + 2ab + b^2$.\n\n" +
      "Méthode : on choisit la formule correspondant à la somme au carré.\n\n" +
      "Calcul : $(a + b)^2 = a^2 + 2ab + b^2$.\n\n" +
      "Conclusion : la formule est $a^2 + 2ab + b^2$.",
    tags: ["litteral_identite_remarquable", "choisir", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_choisir_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle formule s’applique pour développer $(a - b)^2$ ?",
    format: "qcm",
    choices: [
      "$a^2 - 2ab + b^2$",
      "$a^2 + 2ab + b^2$",
      "$a^2 - b^2$",
      "$a^2 + b^2$",
    ],
    expected: ["$a^2 - 2ab + b^2$"],
    comparator: "mcq_exact",
    hint: "C’est le carré d’une différence.",
    explanation:
      "Définition : le carré d’une différence suit $(a - b)^2 = a^2 - 2ab + b^2$.\n\n" +
      "Méthode : on choisit la formule avec le double produit négatif.\n\n" +
      "Calcul : $(a - b)^2 = a^2 - 2ab + b^2$.\n\n" +
      "Conclusion : la formule est $a^2 - 2ab + b^2$.",
    tags: ["litteral_identite_remarquable", "choisir", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_choisir_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "Pour développer $(x + 2)(x + 5)$, quelle méthode utiliser ?",
    format: "qcm",
    choices: [
      "la double distributivité classique",
      "le carré d’une somme",
      "la différence de deux carrés",
      "le carré d’une différence",
    ],
    expected: ["la double distributivité classique"],
    comparator: "mcq_exact",
    hint: "Les deux parenthèses ne sont ni identiques ni de la forme somme-différence.",
    explanation:
      "Définition : une identité remarquable ne s’applique que pour des formes précises.\n\n" +
      "Méthode : ici les parenthèses sont différentes et ne forment pas $(a-b)(a+b)$.\n\n" +
      "Calcul : on développe par double distributivité classique.\n\n" +
      "Conclusion : on utilise la double distributivité classique.",
    tags: ["litteral_identite_remarquable", "choisir", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_choisir_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle formule s’applique pour développer $(a - b)(a + b)$ ?",
    format: "qcm",
    choices: ["$a^2 - b^2$", "$a^2 + b^2$", "$a^2 - 2ab + b^2$", "$a^2 + 2ab + b^2$"],
    expected: ["$a^2 - b^2$"],
    comparator: "mcq_exact",
    hint: "C’est la différence de deux carrés.",
    explanation:
      "Définition : $(a - b)(a + b) = a^2 - b^2$.\n\n" +
      "Méthode : on choisit la différence de deux carrés.\n\n" +
      "Calcul : les termes croisés s’annulent.\n\n" +
      "Conclusion : la formule est $a^2 - b^2$.",
    tags: ["litteral_identite_remarquable", "choisir", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_identite_choisir_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 4,
    theme: "neutral",
    hint: "Associe l’expression à la bonne formule.",
    tags: ["litteral_identite_remarquable", "choisir", "formule", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const mode = randomChoice(["somme", "difference", "carres"]);
      const expression =
        mode === "somme"
          ? `(x + ${a})^2`
          : mode === "difference"
          ? `(x - ${a})^2`
          : `(x - ${a})(x + ${a})`;
      const correct =
        mode === "somme"
          ? "$a^2 + 2ab + b^2$"
          : mode === "difference"
          ? "$a^2 - 2ab + b^2$"
          : "$a^2 - b^2$";
      return {
        text: `Quelle formule faut-il appliquer pour développer $${expression}$ ?`,
        format: "qcm",
        choices: shuffle([
          "$a^2 + 2ab + b^2$",
          "$a^2 - 2ab + b^2$",
          "$a^2 - b^2$",
          "$a^2 + b^2$",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque identité remarquable a sa formule.\n\n" +
          "Méthode : on identifie la structure de l’expression.\n\n" +
          `Calcul : $${expression}$ se développe avec ${correct}.\n\n` +
          `Conclusion : la formule est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_identite_choisir_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 4,
    theme: "neutral",
    hint: "Identité remarquable ou double distributivité classique ?",
    tags: ["litteral_identite_remarquable", "choisir", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      const ir = randomChoice([true, false]);
      const expression = ir
        ? `(x + ${a})^2`
        : `(x + ${a})(x + ${a + randomInt(1, 3)})`;
      const correct = ir
        ? "une identité remarquable"
        : "la double distributivité classique";
      return {
        text: `Pour développer $${expression}$, on utilise…`,
        format: "qcm",
        choices: ["une identité remarquable", "la double distributivité classique"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une identité remarquable ne s’applique qu’aux formes $(a \\pm b)^2$ ou $(a - b)(a + b)$.\n\n" +
          "Méthode : on regarde si l’expression a cette forme.\n\n" +
          `Calcul : $${expression}$ ${ir ? "est un carré" : "est un produit de deux parenthèses différentes"}.\n\n` +
          `Conclusion : on utilise ${correct}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_identite_choisir_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "Explique quand utiliser une identité remarquable plutôt que la double distributivité classique.",
    format: "open",
    expected: ["carré", "différence de deux carrés", "rapide"],
    comparator: "contains_keyword",
    hint: "Pense aux formes $(a+b)^2$, $(a-b)^2$, $(a-b)(a+b)$.",
    explanation:
      "Définition : les identités remarquables sont des raccourcis pour des formes précises.\n\n" +
      "Méthode : on les utilise pour un carré de somme, un carré de différence ou une différence de deux carrés.\n\n" +
      "Calcul : sinon, on revient à la double distributivité classique.\n\n" +
      "Conclusion : on choisit une identité remarquable quand la forme correspond, car c’est plus rapide.",
    tags: ["litteral_identite_remarquable", "choisir", "open"],
  },

  // ---------- IR_DEFIS ----------
  {
    kind: "fixed",
    id: "litteral_identite_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Factoriser $x^2 - 9$ à l’aide d’une identité remarquable.",
    format: "qcm",
    choices: ["$(x - 3)(x + 3)$", "$(x - 9)(x + 1)$", "$(x - 3)^2$", "$(x + 3)^2$"],
    expected: ["$(x - 3)(x + 3)$"],
    comparator: "mcq_exact",
    hint: "$x^2 - 9$ est une différence de deux carrés.",
    explanation:
      "Définition : $a^2 - b^2 = (a - b)(a + b)$.\n\n" +
      "Méthode : on reconnaît $9 = 3^2$.\n\n" +
      "Calcul : $x^2 - 9 = (x - 3)(x + 3)$.\n\n" +
      "Conclusion : la forme factorisée est $(x - 3)(x + 3)$.",
    tags: ["litteral_identite_remarquable", "defi", "factorisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "En utilisant une identité remarquable, calculer $101^2$ (avec $101 = 100 + 1$).",
    format: "qcm",
    choices: ["10201", "10001", "11000", "10101"],
    expected: ["10201"],
    comparator: "mcq_exact",
    hint: "$(100 + 1)^2 = 100^2 + 2 \\times 100 \\times 1 + 1^2$.",
    explanation:
      "Définition : $(a + b)^2 = a^2 + 2ab + b^2$.\n\n" +
      "Méthode : on pose $a = 100$, $b = 1$.\n\n" +
      "Calcul : $100^2 + 2 \\times 100 + 1 = 10000 + 200 + 1 = 10201$.\n\n" +
      "Conclusion : $101^2 = 10201$.",
    tags: ["litteral_identite_remarquable", "defi", "calcul_malin", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_identite_defi_tpl_erreur_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le carré d’une différence a un double produit négatif.",
    tags: ["litteral_identite_remarquable", "defi", "erreur", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const sq = a * a;
      return {
        text: `Un élève écrit $(x - ${a})^2 = x^2 - ${sq}$. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : $(a - b)^2 = a^2 - 2ab + b^2$.\n\n" +
          "Méthode : il a confondu carré d’une différence et différence de deux carrés.\n\n" +
          `Calcul : $(x - ${a})^2 = x^2 - ${2 * a}x + ${sq}$.\n\n` +
          "Conclusion : non, il manque le double produit.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_identite_defi_tpl_developper_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Applique $(a - b)^2 = a^2 - 2ab + b^2$.",
    tags: ["litteral_identite_remarquable", "defi", "developper", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const mid = 2 * a;
      const sq = a * a;
      return {
        text: `Développer : $(x - ${a})^2$`,
        format: "short",
        expected: [
          `x²-${mid}x+${sq}`,
          `x² - ${mid}x + ${sq}`,
          `x^2-${mid}x+${sq}`,
          `x^2 - ${mid}x + ${sq}`,
        ],
        comparator: "contains_keyword",
        explanation:
          "Définition : $(a - b)^2 = a^2 - 2ab + b^2$.\n\n" +
          `Méthode : ici $a = x$, $b = ${a}$.\n\n` +
          `Calcul : $(x - ${a})^2 = x^2 - ${mid}x + ${sq}$.\n\n` +
          `Conclusion : le résultat est $x^2 - ${mid}x + ${sq}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_identite_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi $(a + b)^2$ n’est pas égal à $a^2 + b^2$.",
    format: "open",
    expected: ["double produit", "2ab", "manque"],
    comparator: "contains_keyword",
    hint: "Il y a un terme supplémentaire dans le développement.",
    explanation:
      "Définition : $(a + b)^2 = a^2 + 2ab + b^2$.\n\n" +
      "Méthode : on développe le carré comme un produit par soi-même.\n\n" +
      "Calcul : $(a + b)(a + b) = a^2 + ab + ab + b^2 = a^2 + 2ab + b^2$.\n\n" +
      "Conclusion : il manque le double produit $2ab$, donc $(a + b)^2 \\neq a^2 + b^2$.",
    tags: ["litteral_identite_remarquable", "defi", "open"],
  },
];