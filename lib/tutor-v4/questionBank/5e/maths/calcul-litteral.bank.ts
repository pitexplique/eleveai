//calcul-litteral.bank.ts
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatSigned(n: number): string {
  return n >= 0 ? `+${n}` : `${n}`;
}

function expl(calcul: string) {
  return (
    "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
    "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : l’expression obtenue répond à la question."
  );
}

export const calculLitteralBank: TutorBankItemV4[] = [
  // =========================
  // LITTERAL_EXPRESSION
  // =========================
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Dans l’expression 3x + 2, quelle lettre représente un nombre ?",
    format: "short",
    expected: ["x"],
    comparator: "exact_text",
    hint: "La lettre sert à représenter un nombre que l’on ne connaît pas encore.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Dans 3x + 2, la lettre x représente un nombre.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "expression"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « que signifie le 5 ? »
    // (un mot-clé). Leurres : 5 + 3 (addition) et « 53 » (chiffres collés).
    text: "On prend a = 3. Combien vaut 5a ?",
    format: "qcm",
    choices: ["8", "15", "53"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "5a veut dire 5 × a.",
    explanation: expl("5a veut dire 5 × a. Pour a = 3 : 5 × 3 = 15. Le 5 multiplie a."),
    tags: ["litteral_calcul", "expression", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Que veut dire l’écriture 2x ?",
    format: "qcm",
    choices: ["2 + x", "2 × x"],
    expected: ["2 × x"],
    comparator: "mcq_exact",
    hint: "Quand un nombre est collé à une lettre, cela signifie une multiplication.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("2x signifie 2 × x, c’est-à-dire 2 multiplié par x.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "expression"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture est une expression littérale ?",
    format: "qcm",
    choices: ["7 + 3", "4x - 1", "12", "9 ÷ 3"],
    expected: ["4x - 1"],
    comparator: "mcq_exact",
    hint: "Une expression littérale contient au moins une lettre.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("4x - 1 contient la lettre x : c’est une expression littérale.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "expression", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans l’expression 2x + 5, quel est le terme constant ?",
    format: "qcm",
    choices: ["2", "x", "5", "2x"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Le terme constant est celui qui ne contient pas de lettre.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Dans 2x + 5, le terme constant est 5 car il ne contient pas de lettre.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "expression", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_comprendre_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient est le nombre placé devant la lettre.",
    tags: ["litteral_calcul", "expression", "template"],
    generate: () => {
      const coef = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      return {
        text: `Dans l’expression ${coef}x + 4, quel est le coefficient de x ?`,
        format: "short",
        expected: [String(coef)],
        comparator: "number_equal",
        explanation: "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          (`Dans ${coef}x + 4, le coefficient de x est ${coef}.`) +
          "\n\nConclusion : l’expression obtenue répond à la question.",
      };
    },
  },

  // =========================
  // LITTERAL_TRADUIRE
  // =========================
  {
    kind: "fixed",
    id: "litteral_traduire_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 1,
    theme: "neutral",
    text: "Traduis par une expression littérale : « un nombre x augmenté de 3 »",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — l'expression est comparée, plus un mot-clé.
    expected: ["x + 3"],
    comparator: "expression_reduite",
    hint: "« augmenté de 3 » correspond à + 3.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("« un nombre x augmenté de 3 » se traduit par x + 3.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "traduire"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 1,
    theme: "neutral",
    text: "Traduis par une expression littérale : « le double de x »",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — l'expression est comparée, plus un mot-clé.
    expected: ["2x"],
    comparator: "expression_reduite",
    hint: "Le double signifie multiplier par 2.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Le double de x se traduit par 2x.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "traduire"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduis par une expression littérale : « 5 de plus que y »",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — l'expression est comparée, plus un mot-clé.
    expected: ["y + 5"],
    comparator: "expression_reduite",
    hint: "« de plus que y » signifie qu’on ajoute 5 à y.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("« 5 de plus que y » se traduit par y + 5.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "traduire"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduis par une expression littérale : « le triple d’un nombre n diminué de 4 »",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — l'expression est comparée, plus un mot-clé.
    expected: ["3n - 4"],
    comparator: "expression_reduite",
    hint: "Le triple de n donne 3n, puis on enlève 4.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("« le triple d’un nombre n diminué de 4 » se traduit par 3n - 4.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "traduire"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression traduit « le quart de x » ?",
    format: "qcm",
    choices: ["4x", "x/4", "x+4", "4+x"],
    expected: ["x/4"],
    comparator: "mcq_exact",
    hint: "Le quart signifie diviser par 4.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Le quart de x se note x/4.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "traduire", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_traduire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère les mots : double, triple, augmenté de, diminué de.",
    tags: ["litteral_calcul", "traduire", "template"],
    // 08/10/2026 : précise et simple (Frédéric) — l'expression est comparée, plus un mot-clé.
    generate: () => {
      const n = randomChoice([2, 3, 4, 5, 6, 7, 8]);
      const op = randomChoice(["augmente", "diminue"]);
      if (op === "augmente") {
        return {
          text: `Traduis par une expression littérale : « le double de x augmenté de ${n} »`,
          format: "short",
          expected: [`2x + ${n}`],
          comparator: "expression_reduite",
          explanation: "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          (`Le double de x est 2x, puis on ajoute ${n}, donc on obtient 2x + ${n}.`) +
          "\n\nConclusion : l’expression obtenue répond à la question.",
        };
      }
      return {
        text: `Traduis par une expression littérale : « le triple de x diminué de ${n} »`,
        format: "short",
        expected: [`3x - ${n}`],
        comparator: "expression_reduite",
        explanation: "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          (`Le triple de x est 3x, puis on enlève ${n}, donc on obtient 3x - ${n}.`) +
          "\n\nConclusion : l’expression obtenue répond à la question.",
      };
    },
  },

  // =========================
  // LITTERAL_SUBSTITUER
  // =========================
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule la valeur de x + 3 pour x = 5.",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Remplace x par 5, puis calcule.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Si x = 5, alors x + 3 = 5 + 3 = 8.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule la valeur de 2x pour x = 4.",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "2x signifie 2 multiplié par x.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Si x = 4, alors 2x = 2 × 4 = 8.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule la valeur de 3x - 2 pour x = 6.",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "Commence par calculer 3 × 6.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Si x = 6, alors 3x - 2 = 3 × 6 - 2 = 18 - 2 = 16.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule la valeur de 2x + 5 pour x = -3.",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "Remplace x par -3 en gardant les parenthèses mentalement.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Si x = -3, alors 2x + 5 = 2 × (-3) + 5 = -6 + 5 = -1.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "substituer", "relatif"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la valeur de y - 4 pour y = 10 ?",
    format: "qcm",
    choices: ["6", "14", "-6", "4"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Remplace y par 10.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Si y = 10, alors y - 4 = 10 - 4 = 6.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "substituer", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_substituer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace la lettre par la valeur donnée puis calcule.",
    tags: ["litteral_calcul", "substituer", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5, 6]);
      const b = randomChoice([1, 2, 3, 4, 5]);
      const x = randomChoice([-4, -3, -2, 2, 3, 4, 5]);
      const result = a * x + b;

      return {
        text: `Calcule la valeur de ${a}x + ${b} pour x = ${x}.`,
        format: "short",
        expected: [String(result), formatSigned(result)],
        comparator: "number_equal",
        explanation: "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          (`${a}x + ${b} = ${a} × (${x}) + ${b} = ${result}.`) +
          "\n\nConclusion : l’expression obtenue répond à la question.",
      };
    },
  },

  // =========================
  // LITTERAL_REDUIRE
  // =========================
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — la réponse doit VALOIR 2x et être réduite.
    text: "Réduis : x + x",
    format: "short",
    expected: ["2x"],
    comparator: "expression_reduite",
    hint: "Un x plus un autre x, cela fait deux x.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("x + x = 2x.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — la réponse doit VALOIR 5x et être réduite.
    text: "Réduis : 3x + 2x",
    format: "short",
    expected: ["5x"],
    comparator: "expression_reduite",
    hint: "On additionne les coefficients des termes semblables.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("3x + 2x = 5x.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — la réponse doit VALOIR 3x et être réduite.
    text: "Réduis : 4x - x",
    format: "short",
    expected: ["3x"],
    comparator: "expression_reduite",
    hint: "4x - x = 4x - 1x.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("4x - x = 4x - 1x = 3x.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — la réponse doit VALOIR 2x + 3 et être réduite.
    text: "Réduis : x + x + 3",
    format: "short",
    expected: ["2x + 3"],
    comparator: "expression_reduite",
    hint: "Regroupe les termes en x ensemble.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("x + x + 3 = 2x + 3.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — la réponse doit VALOIR x² et être réduite.
    text: "Réduis : x × x",
    format: "short",
    expected: ["x²"],
    comparator: "expression_reduite",
    hint: "Multiplier x par x donne le carré de x.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("x × x = x².") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la réduction correcte de 2x + 5x ?",
    format: "qcm",
    choices: ["7x", "10x", "7x²", "3x"],
    expected: ["7x"],
    comparator: "mcq_exact",
    hint: "On additionne seulement les coefficients.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("2x + 5x = 7x.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "reduire", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_reduire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne ou soustrais les coefficients des termes semblables.",
    tags: ["litteral_calcul", "reduire", "template"],
    // 08/10/2026 : précise et simple (Frédéric) — la réponse doit VALOIR le résultat et être réduite
    // (avant, « 2x - 2x » attendait « 0x », et « 5x + n'importe quoi » passait).
    generate: () => {
      const a = randomChoice([2, 3, 4, 5, 6]);
      const b = randomChoice([1, 2, 3, 4, 5]);
      const sign = randomChoice(["+", "-"]);
      const result = sign === "+" ? a + b : a - b;
      const terme = (k: number) => (k === 0 ? "0" : k === 1 ? "x" : k === -1 ? "−x" : k < 0 ? `−${-k}x` : `${k}x`);
      const bx = b === 1 ? "x" : `${b}x`;
      const ecrit = sign === "+" ? "+" : "−";

      return {
        text: `Réduis : ${a}x ${ecrit} ${bx}`,
        format: "short",
        expected: [result === 0 ? "0" : `${result}x`],
        comparator: "expression_reduite",
        explanation: expl(
          `On ${sign === "+" ? "additionne" : "soustrait"} les coefficients : ${a} ${ecrit} ${b} = ${result < 0 ? `−${-result}` : result}. ` +
            `Donc ${a}x ${ecrit} ${bx} = ${terme(result)}.`,
        ),
      };
    },
  },

  // =========================
  // LITTERAL_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "litteral_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi 3x + 2x
    // peut se réduire en 5x » (déjà posé par litteral_reduire_fixed_2). Désormais :
    // regrouper les termes en x quand un nombre est placé entre eux.
    text: "Réduis : 3x + 2 + 2x",
    format: "short",
    expected: ["5x + 2"],
    comparator: "expression_reduite",
    hint: "Regroupe les termes en x. Le 2 tout seul reste à part.",
    explanation: expl("3x et 2x ont la même lettre : 3x + 2x = 5x. Le 2 n’a pas de lettre : il reste seul. Donc 3x + 2 + 2x = 5x + 2."),
    tags: ["litteral_calcul", "defi", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On note x l’âge de Léa. Écris puis calcule l’expression qui représente l’âge de Léa dans 5 ans si Léa a actuellement 12 ans.",
    format: "short",
    expected: ["17"],
    comparator: "number_equal",
    hint: "L’expression est x + 5 puis on remplace x par 12.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("L’expression est x + 5. Si x = 12, alors x + 5 = 17.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "defi", "probleme"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Réduis puis calcule pour x = 3 : 2x + x + 4",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Commence par réduire 2x + x.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("2x + x + 4 = 3x + 4. Pour x = 3, on obtient 3 × 3 + 4 = 13.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "defi", "reduire", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique la différence
    // entre 5x × 2 et 5x + 2 ». Désormais : le produit à réduire ; « 7x » (le
    // piège de l'addition) est refusé par le correcteur.
    text: "Réduis : 5x × 2",
    format: "short",
    expected: ["10x"],
    comparator: "expression_reduite",
    hint: "Le 2 multiplie : 5 × 2, puis on garde le x.",
    explanation: expl("5x × 2 = 5 × 2 × x = 10x. Attention : 5x + 2 ne se réduit pas, car le 2 s’ajoute et n’a pas de lettre."),
    tags: ["litteral_calcul", "defi", "piege", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un rectangle a pour longueur x + 3 et pour largeur 2. Écris l’expression de son périmètre puis calcule-la pour x = 5.",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Le périmètre d’un rectangle est 2 × longueur + 2 × largeur.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Le périmètre vaut 2(x + 3) + 2×2. Pour x = 5, on obtient 2×8 + 4 = 16 + 4 = 20.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "defi", "probleme", "geometrie"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule pour x = -2 : 3x + x + 5",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "Réduis d’abord 3x + x.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("3x + x + 5 = 4x + 5. Pour x = -2, on obtient 4×(-2) + 5 = -8 + 5 = -3.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "defi", "relatif", "substituer", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle expression représente « le double d’un nombre x augmenté de 7 » ?",
    format: "qcm",
    choices: ["2x + 7", "2(x + 7)", "x + 14", "7x + 2"],
    expected: ["2x + 7"],
    comparator: "mcq_exact",
    hint: "On prend d’abord le double de x, puis on ajoute 7.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Le double de x est 2x, puis augmenté de 7 donne 2x + 7.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle réduction est correcte ?",
    format: "qcm",
    choices: ["3x + 2 = 5x", "4x + x = 5x", "2x + 3x = 6x", "x + 5 = 6x"],
    expected: ["4x + x = 5x"],
    comparator: "mcq_exact",
    hint: "Seuls les termes semblables peuvent se réduire.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("4x + x = 4x + 1x = 5x. Les autres propositions confondent termes en x et termes constants, ou additionnent mal les coefficients.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "defi", "qcm", "piege"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On sait que x = 4. Quelle est la valeur de 2x + x + 3 ?",
    format: "qcm",
    choices: ["11", "12", "15", "18"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "Réduis d’abord 2x + x.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("2x + x + 3 = 3x + 3. Pour x = 4, cela donne 3×4 + 3 = 12 + 3 = 15.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "defi", "qcm", "substituer"],
  },
  {
    kind: "template",
    id: "litteral_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Réduis d’abord, puis remplace la lettre par la valeur donnée.",
    tags: ["litteral_calcul", "defi", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5]);
      const b = randomChoice([1, 2, 3, 4]);
      const c = randomChoice([1, 2, 3, 4, 5]);
      const x = randomChoice([2, 3, 4, 5]);
      const coef = a + b;
      const result = coef * x + c;

      return {
        text: `Réduis puis calcule pour x = ${x} : ${a}x + ${b}x + ${c}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          (`${a}x + ${b}x + ${c} = ${coef}x + ${c}. Pour x = ${x}, on obtient ${coef} × ${x} + ${c} = ${result}.`) +
          "\n\nConclusion : l’expression obtenue répond à la question.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Fais attention : on ne peut réduire que les termes semblables.",
    tags: ["litteral_calcul", "defi", "template", "piege"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : réponse courte « non »
    // au mot-clé, toujours « non ». Désormais un QCM oui / non, et une fois sur
    // deux une somme qui SE réduit (ax + bx), pour que la réponse ne soit pas devinée.
    generate: () => {
      const a = randomChoice([2, 3, 4, 5]);
      const b = randomChoice([2, 3, 4, 5]);
      const reductible = randomChoice([true, false]);
      if (reductible) {
        return {
          text: `Peut-on réduire l’expression ${a}x + ${b}x ?`,
          format: "qcm",
          choices: ["oui", "non"],
          expected: ["oui"],
          comparator: "mcq_exact",
          explanation: expl(`${a}x et ${b}x ont la même lettre : ce sont des termes semblables. ${a}x + ${b}x = ${a + b}x.`),
        };
      }
      return {
        text: `Peut-on réduire l’expression ${a}x + ${b} ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: expl(`${a}x a une lettre, ${b} n’en a pas : ce ne sont pas des termes semblables. ${a}x + ${b} ne se réduit pas (ce n’est pas ${a + b}x).`),
      };
    },
  },
  {
    kind: "template",
    id: "litteral_defi_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Traduis d’abord la phrase, puis calcule.",
    tags: ["litteral_calcul", "defi", "template", "traduire", "substituer"],
    generate: () => {
      const add = randomChoice([3, 4, 5, 6, 7]);
      const x = randomChoice([2, 3, 4, 5, 6]);
      const result = 2 * x + add;

      return {
        text: `Le double d’un nombre x augmenté de ${add}. Calcule cette expression pour x = ${x}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          (`L’expression est 2x + ${add}. Pour x = ${x}, on obtient 2×${x} + ${add} = ${result}.`) +
          "\n\nConclusion : l’expression obtenue répond à la question.",
      };
    },
  },
    /* =========================
     QUESTIONS OUVERTES — CALCUL LITTÉRAL
  ========================= */
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique avec tes mots
    // ce que signifie 4x ». Leurres : 4 + 5 (addition) et « 45 » (chiffres collés).
    text: "On prend x = 5. Combien vaut 4x ?",
    format: "qcm",
    choices: ["9", "20", "45"],
    expected: ["20"],
    comparator: "mcq_exact",
    hint: "Quand un nombre est collé à une lettre, cela signifie une multiplication.",
    explanation: expl("4x veut dire 4 × x. Pour x = 5 : 4 × 5 = 20."),
    tags: ["litteral_calcul", "qcm", "expression"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi 2x + 5
    // et non 2(x + 5) ». Désormais l'élève calcule ; le leurre 16 = 2 × (3 + 5)
    // est l'erreur de la parenthèse, 13 = 3 + 2 × 5.
    text: "On prend x = 3. Calcule « le double de x augmenté de 5 ».",
    format: "qcm",
    choices: ["16", "11", "13"],
    expected: ["11"],
    comparator: "mcq_exact",
    hint: "On prend d’abord le double de x, puis on ajoute 5.",
    explanation: expl("Le double de x : 2 × 3 = 6. Augmenté de 5 : 6 + 5 = 11. L’expression est 2x + 5, pas 2(x + 5) : 2 × (3 + 5) = 16 n’est pas la bonne réponse."),
    tags: ["litteral_calcul", "qcm", "traduire", "piege"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique les étapes… ».
    text: "Calcule la valeur de 3x + 2 pour x = 4.",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Commence par remplacer x par 4.",
    explanation: expl("On remplace x par 4 : 3x + 2 = 3 × 4 + 2 = 12 + 2 = 14."),
    tags: ["litteral_calcul", "short", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi
    // 3x + 2x = 5x ». Désormais le sens de la réduction, par un nombre.
    text: "Combien de fois x y a-t-il dans 3x + 2x ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "3x et 2x contiennent la même lettre.",
    explanation: expl("3 fois x plus 2 fois x, cela fait 3 + 2 = 5 fois x. Donc 3x + 2x = 5x."),
    tags: ["litteral_calcul", "short", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi 3x + 2
    // ne peut pas se réduire en 5x ». Désormais l'élève calcule pour x = 2 ; le
    // leurre 10 est la valeur de 5x (le piège), 12 = 3 × (2 + 2).
    text: "On prend x = 2. Combien vaut 3x + 2 ?",
    format: "qcm",
    choices: ["10", "8", "12"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Remplace x par 2. Fais d’abord la multiplication.",
    explanation: expl("3x + 2 = 3 × 2 + 2 = 6 + 2 = 8. Or 5x = 5 × 2 = 10. On ne trouve pas le même nombre : 3x + 2 n’est pas égal à 5x. Le 2 n’a pas de lettre, il ne se regroupe pas avec 3x."),
    tags: ["litteral_calcul", "qcm", "reduire", "piege"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique son erreur ».
    // Leurres : 5x² (l'erreur de l'élève), 6x et 6x² (multiplier au lieu d'additionner).
    text: "Un élève écrit : 2x + 3x = 5x². Quel est le bon résultat de 2x + 3x ?",
    format: "qcm",
    choices: ["5x²", "5x", "6x", "6x²"],
    expected: ["5x"],
    comparator: "mcq_exact",
    hint: "On additionne les coefficients, mais on ne multiplie pas les lettres.",
    explanation: expl("Dans 2x + 3x, on additionne les coefficients : 2 + 3 = 5. Le x reste x. Donc 2x + 3x = 5x, pas 5x²."),
    tags: ["litteral_calcul", "qcm", "defi", "erreur"],
  },

  // =========================
  // TOP-UP — LITTERAL_EXPRESSION_COMPRENDRE (+3)
  // =========================
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 4x + 7, quel est le coefficient de x ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Le coefficient est le nombre collé à la lettre.",
    explanation: expl("Dans 4x + 7, le nombre collé à x est 4 : c’est le coefficient de x."),
    tags: ["litteral_calcul", "expression"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Que signifie l’écriture « ab » ?",
    format: "qcm",
    choices: ["a × b", "a + b", "a − b", "a ÷ b"],
    expected: ["a × b"],
    comparator: "mcq_exact",
    hint: "Deux lettres collées indiquent une multiplication.",
    explanation: expl("Deux lettres collées signifient une multiplication : ab = a × b."),
    tags: ["litteral_calcul", "expression", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi on peut
    // écrire 3 × x plus simplement ». Leurres : 3 + x, x3 (ordre inversé).
    text: "Comment écrit-on 3 × x plus simplement ?",
    format: "qcm",
    choices: ["3 + x", "3x", "x3"],
    expected: ["3x"],
    comparator: "mcq_exact",
    hint: "On peut supprimer le signe ×.",
    explanation: expl("Quand un nombre multiplie une lettre, on supprime le signe × et on écrit le nombre devant : 3 × x s’écrit 3x."),
    tags: ["litteral_calcul", "expression", "qcm"],
  },

  // =========================
  // TOP-UP — LITTERAL_TRADUIRE (+3)
  // =========================
  {
    kind: "fixed",
    id: "litteral_traduire_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 1,
    theme: "neutral",
    text: "Traduis par une expression littérale : « un nombre x diminué de 7 »",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — l'expression est comparée, plus un mot-clé.
    expected: ["x - 7"],
    comparator: "expression_reduite",
    hint: "Diminuer, c’est soustraire.",
    explanation: expl("« diminué de 7 » se traduit par − 7 : l’expression est x − 7."),
    tags: ["litteral_calcul", "traduire"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression traduit « le triple de x » ?",
    format: "qcm",
    choices: ["3x", "x+3", "x/3", "x-3"],
    expected: ["3x"],
    comparator: "mcq_exact",
    hint: "Triple = ×3.",
    explanation: expl("Le triple de x est 3 × x, c’est-à-dire 3x."),
    tags: ["litteral_calcul", "traduire", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_traduire_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Augmenter, c’est ajouter.",
    tags: ["litteral_calcul", "traduire", "template"],
    // 08/10/2026 : précise et simple (Frédéric) — l'expression est comparée, plus un mot-clé.
    generate: () => {
      const n = randomInt(2, 9);
      return {
        text: `Traduis par une expression littérale : « un nombre n augmenté de ${n} »`,
        format: "short",
        expected: [`n + ${n}`],
        comparator: "expression_reduite",
        explanation: expl(`« augmenté de ${n} » se traduit par + ${n} : l’expression est n + ${n}.`),
      };
    },
  },

  // =========================
  // TOP-UP — LITTERAL_SUBSTITUER (+3)
  // =========================
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule la valeur de 5x pour x = 3.",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "5 × 3.",
    explanation: expl("5x = 5 × 3 = 15."),
    tags: ["litteral_calcul", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule la valeur de 4x − 5 pour x = 2.",
    format: "short",
    expected: ["3", "+3"],
    comparator: "number_equal",
    hint: "Remplace x par 2 puis calcule.",
    explanation: expl("4x − 5 = 4 × 2 − 5 = 8 − 5 = 3."),
    tags: ["litteral_calcul", "substituer"],
  },
  {
    kind: "template",
    id: "litteral_substituer_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace x puis effectue le calcul.",
    tags: ["litteral_calcul", "substituer", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 9);
      const x = randomInt(2, 7);
      const result = a * x + b;
      return {
        text: `Calcule la valeur de ${a}x + ${b} pour x = ${x}.`,
        format: "short",
        expected: [String(result), formatSigned(result)],
        comparator: "number_equal",
        explanation: expl(`${a}x + ${b} = ${a} × ${x} + ${b} = ${a * x} + ${b} = ${result}.`),
      };
    },
  },

  // =========================
  // TOP-UP — LITTERAL_REDUIRE (+1)
  // =========================
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Réduis : 2x + 5x",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — la réponse doit VALOIR 7x et être réduite.
    expected: ["7x"],
    comparator: "expression_reduite",
    hint: "On additionne les coefficients de x.",
    explanation: expl("On additionne les coefficients : 2 + 5 = 7, donc 2x + 5x = 7x."),
    tags: ["litteral_calcul", "reduire"],
  },

  /* ===== LITTERAL_TESTER =====
     Le programme de 5e demande de tester une égalité pour une valeur : c'est
     la porte d'entrée vers les équations. Les items figés portent les cas qui
     se retiennent — l'égalité vraie pour tout x, celle qui ne l'est que pour
     zéro — et le piège du « vrai une fois, donc vrai toujours ». */
  {
    kind: "fixed",
    id: "litteral_tester_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 2,
    theme: "neutral",
    text: "L’égalité 3x + 1 = 10 est-elle vraie pour x = 3 ?",
    format: "qcm",
    // 08/10/2026 : précise et simple (Frédéric) — choix courts, plus de phrase.
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Remplace x par 3 dans le membre de gauche, puis compare.",
    explanation: expl(
      "On remplace x par 3 à gauche : 3 × 3 + 1 = 9 + 1 = 10. À droite, on lit 10. Les deux membres sont égaux, donc l’égalité est vraie pour x = 3.",
    ),
    tags: ["litteral_calcul", "tester", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_tester_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 2,
    theme: "neutral",
    text: "L’égalité 3x + 1 = 10 est-elle vraie pour x = 2 ?",
    format: "qcm",
    // 08/10/2026 : précise et simple (Frédéric) — choix courts, plus de phrase.
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule les deux membres séparément avant de conclure.",
    explanation: expl(
      "À gauche : 3 × 2 + 1 = 6 + 1 = 7. À droite : 10. Comme 7 n’est pas égal à 10, l’égalité est fausse pour x = 2.",
    ),
    tags: ["litteral_calcul", "tester", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_tester_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 4,
    theme: "neutral",
    text: "Pour quelles valeurs de x l’égalité x + 5 = 5 + x est-elle vraie ?",
    format: "qcm",
    // 08/10/2026 : précise et simple (Frédéric) — choix courts (un mot ou un nombre).
    choices: ["toutes", "x = 0", "x = 5", "aucune"],
    expected: ["toutes"],
    comparator: "mcq_exact",
    hint: "Essaie avec deux ou trois valeurs différentes avant de trancher.",
    explanation: expl(
      "Additionner dans un sens ou dans l’autre donne le même résultat. Quelle que soit la valeur de x, les deux membres sont égaux : cette égalité est toujours vraie.",
    ),
    tags: ["litteral_calcul", "tester", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_tester_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 4,
    theme: "neutral",
    text: "Pour quelle valeur de x l’égalité 2x = x est-elle vraie ? Réponds par un nombre.",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Essaie 1, puis 2, puis 0.",
    explanation: expl(
      "Pour x = 1 : 2 × 1 = 2 et x = 1, ce n’est pas égal. Pour x = 0 : 2 × 0 = 0 et x = 0, les deux membres valent 0. Zéro est la seule valeur qui convient.",
    ),
    tags: ["litteral_calcul", "tester", "remarquable"],
  },
  {
    kind: "fixed",
    id: "litteral_tester_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 3,
    theme: "reunion",
    // 08/10/2026 (Frédéric) : énoncé raccourci, on calcule p.
    text: "Au marché de Saint-Paul, le prix p d’un panier de x letchis est p = x + 2.\nCombien vaut p pour x = 7 ?",
    format: "short",
    expected: ["9", "9 €"],
    comparator: "number_equal",
    hint: "Remplace x par 7.",
    explanation: expl(
      "On remplace x par 7 : p = 7 + 2 = 9. Le panier coûte 9 €.",
    ),
    tags: ["litteral_calcul", "tester", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_tester_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment vérifier
    // si x = 5 rend l'égalité vraie ». Désormais l'élève fait la vérification.
    text: "L’égalité 2x − 3 = 7 est-elle vraie pour x = 5 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Remplace x par 5 à gauche, calcule, puis compare avec 7.",
    explanation: expl(
      "On remplace x par 5 à gauche : 2 × 5 − 3 = 10 − 3 = 7. À droite, on lit 7. Les deux côtés sont égaux : l’égalité est vraie pour x = 5.",
    ),
    tags: ["litteral_calcul", "tester", "qcm", "methode"],
  },
  {
    kind: "fixed",
    id: "litteral_tester_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Un élève conclut que
    // l'égalité est vraie pour tous les nombres. Explique son erreur ». Désormais
    // l'élève teste lui-même le contre-exemple x = 1.
    text: "L’égalité 4x = 12 est vraie pour x = 3. Est-elle vraie aussi pour x = 1 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Remplace x par 1 : combien vaut 4x ?",
    explanation: expl(
      "Pour x = 1 : 4 × 1 = 4, et 4 n’est pas égal à 12. L’égalité est fausse pour x = 1. Être vraie pour une valeur ne veut pas dire être vraie pour tous les nombres.",
    ),
    tags: ["litteral_calcul", "tester", "qcm", "piege"],
  },
  {
    kind: "template",
    id: "litteral_tester_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace x par la valeur proposée, calcule les deux membres, compare.",
    tags: ["litteral_calcul", "tester", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 9);
      const x = randomInt(2, 8);
      const juste = randomChoice([true, true, false]);
      const droite = juste ? a * x + b : a * x + b + randomChoice([-3, -2, 2, 3]);
      return {
        text: `L’égalité ${a}x + ${b} = ${droite} est-elle vraie pour x = ${x} ?`,
        format: "qcm",
        // 08/10/2026 : précise et simple (Frédéric) — choix courts, plus de phrase.
        choices: ["oui", "non"],
        expected: [juste ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(
          `On remplace x par ${x} à gauche : ${a} × ${x} + ${b} = ${a * x} + ${b} = ${a * x + b}. ` +
            `À droite, on lit ${droite}. ` +
            (juste
              ? "Les deux membres sont égaux : l’égalité est vraie pour cette valeur."
              : "Les deux membres sont différents : l’égalité est fausse pour cette valeur."),
        ),
      };
    },
  },
  {
    kind: "template",
    id: "litteral_tester_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 4,
    theme: "neutral",
    hint: "Remplace x par la valeur donnée à gauche, calcule, puis compare avec la droite.",
    tags: ["litteral_calcul", "tester", "qcm", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment savoir si
    // x = … rend l'égalité vraie », toujours vraie. Désormais un QCM oui / non ;
    // une fois sur deux, le membre de droite est faux de 1 à 3 (une erreur de calcul).
    generate: () => {
      const a = randomInt(2, 7);
      const x = randomInt(2, 9);
      // Le membre de gauche reste positif (au moins 4) : un seul calcul, pas de relatif.
      const b = randomInt(1, Math.min(9, a * x - 4));
      const gauche = a * x - b;
      const juste = randomChoice([true, false]);
      const droite = juste ? gauche : gauche + randomChoice([-3, -2, -1, 1, 2, 3]);
      return {
        text: `L’égalité ${a}x − ${b} = ${droite} est-elle vraie pour x = ${x} ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [juste ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(
          `On remplace x par ${x} à gauche : ${a} × ${x} − ${b} = ${a * x} − ${b} = ${gauche}. À droite, on lit ${droite}. ` +
            (juste
              ? `Les deux côtés sont égaux : l’égalité est vraie pour x = ${x}.`
              : `${gauche} n’est pas égal à ${droite} : l’égalité est fausse pour x = ${x}.`),
        ),
      };
    },
  },

  /* ===== LITTERAL_DISTRIBUTIVITE =====
     Développer k(a + b), au programme de 5e. Le piège le plus tenace — celui
     du facteur oublié, 5(x + 3) = 5x + 3 — est figé ; les développements, eux,
     sont générés. */
  {
    kind: "fixed",
    id: "litteral_distributivite_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 2,
    theme: "neutral",
    text: "Développe : 3(x + 2)",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — toute écriture développée et réduite de 3x + 6 passe.
    expected: ["3x + 6"],
    comparator: "expression_developpee",
    hint: "Le 3 multiplie CE QUI EST DANS la parenthèse, les deux termes.",
    explanation: expl(
      "Le facteur 3 se distribue sur chaque terme : 3 × x = 3x, puis 3 × 2 = 6. On obtient 3x + 6.",
    ),
    tags: ["litteral_calcul", "distributivite"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Développe : 4(x - 1)",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — toute écriture développée et réduite de 4x − 4 passe.
    expected: ["4x - 4"],
    comparator: "expression_developpee",
    hint: "Le signe moins reste : le 4 multiplie aussi le 1 qu’on retire.",
    explanation: expl(
      "Le facteur 4 se distribue sur les deux termes : 4 × x = 4x, puis 4 × 1 = 4, qu’on retire. On obtient 4x - 4.",
    ),
    tags: ["litteral_calcul", "distributivite", "signe"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — choix courts. Leurres : 5x + 3
    // (l'erreur de l'élève), 5x + 8 (5 + 3), 8x (tout additionné).
    text: "Un élève écrit : 5(x + 3) = 5x + 3. Quel est le bon développement ?",
    format: "qcm",
    choices: ["5x + 3", "5x + 15", "5x + 8", "8x"],
    expected: ["5x + 15"],
    comparator: "mcq_exact",
    hint: "Compte les termes de la parenthèse : combien doivent être multipliés ?",
    explanation: expl(
      "Le facteur se distribue sur TOUS les termes de la parenthèse, pas seulement le premier. 5 × x = 5x et 5 × 3 = 15, donc 5(x + 3) = 5x + 15. C’est l’erreur la plus fréquente du chapitre.",
    ),
    tags: ["litteral_calcul", "distributivite", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Développe : 2(3x + 4)",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — toute écriture développée et réduite de 6x + 8 passe.
    expected: ["6x + 8"],
    comparator: "expression_developpee",
    hint: "2 × 3x, c’est 6x : les deux nombres se multiplient, la lettre reste.",
    explanation: expl(
      "2 × 3x = 6x, puis 2 × 4 = 8. On obtient 6x + 8.",
    ),
    tags: ["litteral_calcul", "distributivite"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 4,
    theme: "reunion",
    text: "Un planteur de Saint-Joseph a un champ rectangulaire de 5 m de large. Sa longueur mesure (x + 3) m. Écris l’aire du champ sous forme développée.",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — toute écriture développée et réduite de 5x + 15 passe.
    expected: ["5x + 15"],
    comparator: "expression_developpee",
    hint: "L’aire d’un rectangle, c’est largeur × longueur.",
    explanation: expl(
      "L’aire vaut 5 × (x + 3). Le facteur 5 se distribue : 5 × x = 5x et 5 × 3 = 15. L’aire développée s’écrit 5x + 15 (en m²).",
    ),
    tags: ["litteral_calcul", "distributivite", "reunion", "aire"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi 3(x + 2)
    // n'est pas égal à 3x + 2 ». Désormais l'élève calcule pour x = 1 ; le leurre 5
    // est la valeur de 3x + 2 (le facteur oublié), 6 = 3 + 1 + 2.
    text: "On prend x = 1. Combien vaut 3(x + 2) ?",
    format: "qcm",
    choices: ["5", "9", "6"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Calcule d’abord la parenthèse : 1 + 2.",
    explanation: expl(
      "3(x + 2) = 3 × (1 + 2) = 3 × 3 = 9. Or 3x + 2 = 3 × 1 + 2 = 5. Ce n’est pas le même nombre : 3(x + 2) n’est pas égal à 3x + 2. Le 3 multiplie aussi le 2 : 3(x + 2) = 3x + 6.",
    ),
    tags: ["litteral_calcul", "distributivite", "qcm", "piege"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi l'aire
    // s'écrit k(a + b) et ka + kb » (lettres seulement). Désormais avec des nombres ;
    // l'explication montre les deux façons de compter.
    text: "Un rectangle a une hauteur de 4 cm. Il est coupé en deux morceaux de largeurs 3 cm et 5 cm. Quelle est son aire ?",
    format: "short",
    expected: ["32 cm²", "32"],
    comparator: "number_equal",
    hint: "Compte l’aire de deux façons : en un seul bloc, puis morceau par morceau.",
    explanation: expl(
      "En un seul bloc : 4 × (3 + 5) = 4 × 8 = 32. Morceau par morceau : 4 × 3 + 4 × 5 = 12 + 20 = 32. On trouve la même aire : 32 cm². C’est pour cela que k(a + b) = ka + kb.",
    ),
    tags: ["litteral_calcul", "distributivite", "short", "raisonnement"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 3,
    theme: "neutral",
    hint: "Le facteur devant la parenthèse multiplie chacun des deux termes.",
    tags: ["litteral_calcul", "distributivite", "template"],
    generate: () => {
      const k = randomInt(2, 9);
      const a = randomInt(1, 6);
      const b = randomInt(1, 9);
      const plus = randomChoice([true, true, false]);
      const coefficient = k * a;
      const constante = k * b;
      const gauche = a === 1 ? "x" : `${a}x`;
      const signe = plus ? "+" : "-";
      return {
        text: `Développe : ${k}(${gauche} ${signe} ${b})`,
        format: "short",
        // 08/10/2026 : précise et simple (Frédéric) — « 15 + 5x » passe aussi, « 5(x + 3) » non.
        expected: [`${coefficient}x ${signe} ${constante}`],
        comparator: "expression_developpee",
        explanation: expl(
          `${k} × ${gauche} = ${coefficient}x, puis ${k} × ${b} = ${constante}. ` +
            `On obtient ${coefficient}x ${signe} ${constante}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 4,
    theme: "neutral",
    hint: "Le facteur multiplie aussi le nombre de la parenthèse.",
    tags: ["litteral_calcul", "distributivite", "short", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique, étape par étape,
    // comment tu développes k(x + b) ». Désormais l'élève complète le terme qu'on
    // oublie le plus : k × b (le piège « b » est refusé, c'est un nombre exact).
    generate: () => {
      const k = randomInt(3, 8);
      const b = randomInt(2, 9);
      return {
        text: `Complète : ${k}(x + ${b}) = ${k}x + …`,
        format: "short",
        expected: [String(k * b)],
        comparator: "number_equal",
        explanation: expl(
          `Le facteur ${k} se distribue sur chacun des deux termes de la parenthèse : ${k} × x = ${k}x, puis ${k} × ${b} = ${k * b}. ` +
            `On additionne les deux résultats : ${k}(x + ${b}) = ${k}x + ${k * b}.`,
        ),
      };
    },
  },
];