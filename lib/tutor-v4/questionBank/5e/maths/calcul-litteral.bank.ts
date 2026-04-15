import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatSigned(n: number): string {
  return n >= 0 ? `+${n}` : `${n}`;
}

export const calculLitteralBank: TutorBankItemV4[] = [
  // =========================
  // LITTERAL_EXPRESSION
  // =========================
  {
    kind: "fixed",
    id: "litteral_expression_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_expression",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 3x + 2, quelle lettre représente un nombre ?",
    format: "short",
    expected: ["x"],
    comparator: "contains_keyword",
    hint: "La lettre sert à représenter un nombre que l’on ne connaît pas encore.",
    explanation:
      "Dans 3x + 2, la lettre x représente un nombre.",
    tags: ["calcul_litteral", "expression"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_expression",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’écriture 5a, que signifie le 5 ?",
    format: "short",
    expected: ["multiplie", "fois", "coefficient"],
    comparator: "contains_keyword",
    hint: "5a veut dire 5 multiplié par a.",
    explanation:
      "Dans 5a, le 5 est le coefficient : il signifie que l’on multiplie a par 5.",
    tags: ["calcul_litteral", "expression"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_expression",
    difficulty: 1,
    theme: "neutral",
    text: "L’écriture 2x signifie-t-elle 2 + x ou 2 × x ?",
    format: "short",
    expected: ["2 × x", "2x", "2*x", "2 fois x", "2 multiplié par x"],
    comparator: "contains_keyword",
    hint: "Quand un nombre est collé à une lettre, cela signifie une multiplication.",
    explanation:
      "2x signifie 2 × x, c’est-à-dire 2 multiplié par x.",
    tags: ["calcul_litteral", "expression"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_expression",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture est une expression littérale ?",
    format: "qcm",
    choices: ["7 + 3", "4x - 1", "12", "9 ÷ 3"],
    expected: ["4x - 1"],
    comparator: "mcq_exact",
    hint: "Une expression littérale contient au moins une lettre.",
    explanation:
      "4x - 1 contient la lettre x : c’est une expression littérale.",
    tags: ["calcul_litteral", "expression", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_expression",
    difficulty: 2,
    theme: "neutral",
    text: "Dans l’expression 2x + 5, quel est le terme constant ?",
    format: "qcm",
    choices: ["2", "x", "5", "2x"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Le terme constant est celui qui ne contient pas de lettre.",
    explanation:
      "Dans 2x + 5, le terme constant est 5 car il ne contient pas de lettre.",
    tags: ["calcul_litteral", "expression", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_expression",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient est le nombre placé devant la lettre.",
    tags: ["calcul_litteral", "expression", "template"],
    generate: () => {
      const coef = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
      return {
        text: `Dans l’expression ${coef}x + 4, quel est le coefficient de x ?`,
        format: "short",
        expected: [String(coef)],
        comparator: "number_equal",
        explanation: `Dans ${coef}x + 4, le coefficient de x est ${coef}.`,
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
    notionId: "calcul_litteral",
    microId: "litteral_traduire",
    difficulty: 1,
    theme: "neutral",
    text: "Traduis par une expression littérale : « un nombre x augmenté de 3 »",
    format: "short",
    expected: ["x+3", "x + 3"],
    comparator: "contains_keyword",
    hint: "« augmenté de 3 » correspond à + 3.",
    explanation:
      "« un nombre x augmenté de 3 » se traduit par x + 3.",
    tags: ["calcul_litteral", "traduire"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_traduire",
    difficulty: 1,
    theme: "neutral",
    text: "Traduis par une expression littérale : « le double de x »",
    format: "short",
    expected: ["2x", "2*x", "2 x"],
    comparator: "contains_keyword",
    hint: "Le double signifie multiplier par 2.",
    explanation:
      "Le double de x se traduit par 2x.",
    tags: ["calcul_litteral", "traduire"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduis par une expression littérale : « 5 de plus que y »",
    format: "short",
    expected: ["y+5", "y + 5"],
    comparator: "contains_keyword",
    hint: "« de plus que y » signifie qu’on ajoute 5 à y.",
    explanation:
      "« 5 de plus que y » se traduit par y + 5.",
    tags: ["calcul_litteral", "traduire"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduis par une expression littérale : « le triple d’un nombre n diminué de 4 »",
    format: "short",
    expected: ["3n-4", "3n - 4", "3*n-4", "3*n - 4"],
    comparator: "contains_keyword",
    hint: "Le triple de n donne 3n, puis on enlève 4.",
    explanation:
      "« le triple d’un nombre n diminué de 4 » se traduit par 3n - 4.",
    tags: ["calcul_litteral", "traduire"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
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
      "Le quart de x se note x/4.",
    tags: ["calcul_litteral", "traduire", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_traduire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère les mots : double, triple, augmenté de, diminué de.",
    tags: ["calcul_litteral", "traduire", "template"],
    generate: () => {
      const n = randomChoice([2, 3, 4, 5, 6, 7, 8]);
      const op = randomChoice(["augmente", "diminue"]);
      if (op === "augmente") {
        return {
          text: `Traduis par une expression littérale : « le double de x augmenté de ${n} »`,
          format: "short",
          expected: [`2x+${n}`, `2x + ${n}`],
          comparator: "contains_keyword",
          explanation: `Le double de x est 2x, puis on ajoute ${n}, donc on obtient 2x + ${n}.`,
        };
      }
      return {
        text: `Traduis par une expression littérale : « le triple de x diminué de ${n} »`,
        format: "short",
        expected: [`3x-${n}`, `3x - ${n}`],
        comparator: "contains_keyword",
        explanation: `Le triple de x est 3x, puis on enlève ${n}, donc on obtient 3x - ${n}.`,
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
    notionId: "calcul_litteral",
    microId: "litteral_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule la valeur de x + 3 pour x = 5.",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Remplace x par 5, puis calcule.",
    explanation:
      "Si x = 5, alors x + 3 = 5 + 3 = 8.",
    tags: ["calcul_litteral", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule la valeur de 2x pour x = 4.",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "2x signifie 2 multiplié par x.",
    explanation:
      "Si x = 4, alors 2x = 2 × 4 = 8.",
    tags: ["calcul_litteral", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule la valeur de 3x - 2 pour x = 6.",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "Commence par calculer 3 × 6.",
    explanation:
      "Si x = 6, alors 3x - 2 = 3 × 6 - 2 = 18 - 2 = 16.",
    tags: ["calcul_litteral", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule la valeur de 2x + 5 pour x = -3.",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "Remplace x par -3 en gardant les parenthèses mentalement.",
    explanation:
      "Si x = -3, alors 2x + 5 = 2 × (-3) + 5 = -6 + 5 = -1.",
    tags: ["calcul_litteral", "substituer", "relatifs"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
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
      "Si y = 10, alors y - 4 = 10 - 4 = 6.",
    tags: ["calcul_litteral", "substituer", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_substituer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace la lettre par la valeur donnée puis calcule.",
    tags: ["calcul_litteral", "substituer", "template"],
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
        explanation: `${a}x + ${b} = ${a} × (${x}) + ${b} = ${result}.`,
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
    notionId: "calcul_litteral",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Réduis : x + x",
    format: "short",
    expected: ["2x", "2*x", "2 x"],
    comparator: "contains_keyword",
    hint: "Un x plus un autre x, cela fait deux x.",
    explanation:
      "x + x = 2x.",
    tags: ["calcul_litteral", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Réduis : 3x + 2x",
    format: "short",
    expected: ["5x", "5*x", "5 x"],
    comparator: "contains_keyword",
    hint: "On additionne les coefficients des termes semblables.",
    explanation:
      "3x + 2x = 5x.",
    tags: ["calcul_litteral", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Réduis : 4x - x",
    format: "short",
    expected: ["3x", "3*x", "3 x"],
    comparator: "contains_keyword",
    hint: "4x - x = 4x - 1x.",
    explanation:
      "4x - x = 4x - 1x = 3x.",
    tags: ["calcul_litteral", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    text: "Réduis : x + x + 3",
    format: "short",
    expected: ["2x+3", "2x + 3", "3+2x", "3 + 2x"],
    comparator: "contains_keyword",
    hint: "Regroupe les termes en x ensemble.",
    explanation:
      "x + x + 3 = 2x + 3.",
    tags: ["calcul_litteral", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    text: "Réduis : x × x",
    format: "short",
    expected: ["x²", "x^2"],
    comparator: "contains_keyword",
    hint: "Multiplier x par x donne le carré de x.",
    explanation:
      "x × x = x².",
    tags: ["calcul_litteral", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
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
      "2x + 5x = 7x.",
    tags: ["calcul_litteral", "reduire", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_reduire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne ou soustrais les coefficients des termes semblables.",
    tags: ["calcul_litteral", "reduire", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5, 6]);
      const b = randomChoice([1, 2, 3, 4, 5]);
      const sign = randomChoice(["+", "-"]);
      const result = sign === "+" ? a + b : a - b;

      return {
        text: `Réduis : ${a}x ${sign} ${b}x`,
        format: "short",
        expected: [`${result}x`, `${result}*x`, `${result} x`],
        comparator: "contains_keyword",
        explanation:
          sign === "+"
            ? `${a}x + ${b}x = ${result}x.`
            : `${a}x - ${b}x = ${result}x.`,
      };
    },
  },

  // =========================
  // LITTERAL_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "litteral_defis_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 3x + 2x peut se réduire en 5x.",
    format: "short",
    expected: ["5x", "termes semblables", "coefficients", "meme lettre"],
    comparator: "contains_keyword",
    hint: "3x et 2x représentent des quantités de même nature.",
    explanation:
      "3x et 2x sont des termes semblables car ils contiennent la même lettre x. On peut donc additionner leurs coefficients : 3 + 2 = 5, d’où 5x.",
    tags: ["calcul_litteral", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "litteral_defis_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_defis",
    difficulty: 4,
    theme: "neutral",
    text: "On note x l’âge de Léa. Écris puis calcule l’expression qui représente l’âge de Léa dans 5 ans si Léa a actuellement 12 ans.",
    format: "short",
    expected: ["17"],
    comparator: "number_equal",
    hint: "L’expression est x + 5 puis on remplace x par 12.",
    explanation:
      "L’expression est x + 5. Si x = 12, alors x + 5 = 17.",
    tags: ["calcul_litteral", "defi", "probleme"],
  },
  {
    kind: "fixed",
    id: "litteral_defis_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Réduis puis calcule pour x = 3 : 2x + x + 4",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Commence par réduire 2x + x.",
    explanation:
      "2x + x + 4 = 3x + 4. Pour x = 3, on obtient 3 × 3 + 4 = 13.",
    tags: ["calcul_litteral", "defi", "reduire", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_defis_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle expression représente « le double d’un nombre x augmenté de 7 » ?",
    format: "qcm",
    choices: ["2x + 7", "2(x + 7)", "x + 14", "7x + 2"],
    expected: ["2x + 7"],
    comparator: "mcq_exact",
    hint: "On prend d’abord le double de x, puis on ajoute 7.",
    explanation:
      "Le double de x est 2x, puis augmenté de 7 donne 2x + 7.",
    tags: ["calcul_litteral", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_defis_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "calcul_litteral",
    microId: "litteral_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Réduis d’abord, puis remplace la lettre par la valeur donnée.",
    tags: ["calcul_litteral", "defi", "template"],
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
        explanation: `${a}x + ${b}x + ${c} = ${coef}x + ${c}. Pour x = ${x}, on obtient ${coef} × ${x} + ${c} = ${result}.`,
      };
    },
  },
];