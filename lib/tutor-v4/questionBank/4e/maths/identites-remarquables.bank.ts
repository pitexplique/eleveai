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
];