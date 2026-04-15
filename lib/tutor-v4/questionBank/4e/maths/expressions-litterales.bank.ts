import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const expressionsLitteralesBank: TutorBankItemV4[] = [
  // =========================
  // EXPR_LITTERALE_COMPRENDRE
  // =========================
  {
    kind: "fixed",
    id: "expr_litterale_comprendre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 3x + 5, quelle est la lettre ?",
    format: "short",
    expected: ["x"],
    comparator: "contains_keyword",
    hint: "Cherche le symbole qui peut représenter un nombre variable.",
    explanation:
      "Dans 3x + 5, la lettre est x. Elle représente une valeur qui peut changer.",
    tags: ["expression", "lettre", "variable"],
  },
  {
    kind: "fixed",
    id: "expr_litterale_comprendre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 7a - 2, quel est le coefficient de a ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Le coefficient est le nombre placé devant la lettre.",
    explanation:
      "Dans 7a - 2, le coefficient de a est 7, car 7a signifie 7 multiplié par a.",
    tags: ["expression", "coefficient"],
  },
  {
    kind: "fixed",
    id: "expr_litterale_comprendre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "L’expression 4x + 1 est-elle une expression littérale ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Une expression littérale contient au moins une lettre.",
    explanation:
      "Oui, 4x + 1 est une expression littérale, car elle contient la lettre x.",
    tags: ["expression", "reconnaitre"],
  },
  {
    kind: "template",
    id: "expr_litterale_comprendre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Repère la lettre dans l’expression.",
    tags: ["expression", "variable", "template"],
    generate: () => {
      const letters = ["x", "a", "b", "n", "t"];
      const letter = randomChoice(letters);
      const a = randomInt(2, 9);
      const b = randomInt(1, 9);

      return {
        text: `Dans l’expression ${a}${letter} + ${b}, quelle est la lettre ?`,
        format: "short",
        expected: [letter],
        comparator: "contains_keyword",
        explanation: `Dans l’expression ${a}${letter} + ${b}, la lettre est ${letter}.`,
      };
    },
  },

  // =========================
  // EXPR_LITTERALE_TRADUIRE
  // =========================
  {
    kind: "fixed",
    id: "expr_litterale_traduire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_traduire",
    difficulty: 1,
    theme: "neutral",
    text: "Traduire par une expression littérale : « un nombre x augmenté de 4 »",
    format: "short",
    expected: ["x+4", "x + 4", "4+x", "4 + x"],
    comparator: "contains_keyword",
    hint: "« augmenté de 4 » signifie qu’on ajoute 4.",
    explanation: "« Un nombre x augmenté de 4 » se traduit par x + 4.",
    tags: ["traduction", "addition"],
  },
  {
    kind: "fixed",
    id: "expr_litterale_traduire_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_traduire",
    difficulty: 1,
    theme: "neutral",
    text: "Traduire par une expression littérale : « le double de x »",
    format: "short",
    expected: ["2x", "2*x"],
    comparator: "contains_keyword",
    hint: "Le double signifie 2 fois.",
    explanation: "Le double de x se traduit par 2x.",
    tags: ["traduction", "multiplication"],
  },
  {
    kind: "fixed",
    id: "expr_litterale_traduire_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduire par une expression littérale : « le triple de y diminué de 5 »",
    format: "short",
    expected: ["3y-5", "3y - 5", "3*y-5", "3*y - 5"],
    comparator: "contains_keyword",
    hint: "Le triple de y, puis on enlève 5.",
    explanation: "Le triple de y est 3y. Diminué de 5 donne 3y - 5.",
    tags: ["traduction", "soustraction"],
  },
  {
    kind: "template",
    id: "expr_litterale_traduire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_traduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Traduis mot à mot la phrase mathématique.",
    tags: ["traduction", "template"],
    generate: () => {
      const letter = randomChoice(["x", "a", "n"]);
      const k = randomInt(2, 9);
      const c = randomInt(1, 9);

      const forms = [
        {
          text: `Traduire par une expression littérale : « ${k} fois ${letter} plus ${c} »`,
          expected: [
            `${k}${letter}+${c}`,
            `${k}${letter} + ${c}`,
            `${k}*${letter}+${c}`,
            `${k}*${letter} + ${c}`,
          ],
          explanation: `« ${k} fois ${letter} plus ${c} » se traduit par ${k}${letter} + ${c}.`,
        },
        {
          text: `Traduire par une expression littérale : « ${k} fois ${letter} moins ${c} »`,
          expected: [
            `${k}${letter}-${c}`,
            `${k}${letter} - ${c}`,
            `${k}*${letter}-${c}`,
            `${k}*${letter} - ${c}`,
          ],
          explanation: `« ${k} fois ${letter} moins ${c} » se traduit par ${k}${letter} - ${c}.`,
        },
      ];

      const picked = randomChoice(forms);

      return {
        text: picked.text,
        format: "short",
        expected: picked.expected,
        comparator: "contains_keyword",
        explanation: picked.explanation,
      };
    },
  },

  // =========================
  // EXPR_LITTERALE_SUBSTITUER
  // =========================
  {
    kind: "fixed",
    id: "expr_litterale_substituer_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer 3x + 2 pour x = 4.",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Remplace x par 4, puis calcule.",
    explanation: "3x + 2 avec x = 4 donne 3 × 4 + 2 = 12 + 2 = 14.",
    tags: ["substitution", "calcul"],
  },
  {
    kind: "fixed",
    id: "expr_litterale_substituer_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer 5a - 1 pour a = 3.",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Remplace a par 3.",
    explanation: "5a - 1 avec a = 3 donne 5 × 3 - 1 = 15 - 1 = 14.",
    tags: ["substitution", "calcul"],
  },
  {
    kind: "fixed",
    id: "expr_litterale_substituer_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 2x + 3y pour x = 2 et y = 5.",
    format: "short",
    expected: ["19"],
    comparator: "number_equal",
    hint: "Remplace chaque lettre par sa valeur.",
    explanation:
      "2x + 3y avec x = 2 et y = 5 donne 2 × 2 + 3 × 5 = 4 + 15 = 19.",
    tags: ["substitution", "deux-lettres"],
  },
  {
    kind: "template",
    id: "expr_litterale_substituer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_substituer",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace la lettre par sa valeur, puis effectue le calcul.",
    tags: ["substitution", "template"],
    generate: () => {
      const letter = randomChoice(["x", "a", "n"]);
      const k = randomInt(2, 8);
      const c = randomInt(1, 9);
      const value = randomInt(1, 6);
      const result = k * value + c;

      return {
        text: `Calculer ${k}${letter} + ${c} pour ${letter} = ${value}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: `${k}${letter} + ${c} avec ${letter} = ${value} donne ${k} × ${value} + ${c} = ${result}.`,
      };
    },
  },

  // =========================
  // EXPR_LITTERALE_REDUIRE
  // =========================
  {
    kind: "fixed",
    id: "expr_litterale_reduire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_reduire",
    difficulty: 1,
    theme: "neutral",
    text: "Réduire : 3x + 2x",
    format: "short",
    expected: ["5x", "5*x"],
    comparator: "contains_keyword",
    hint: "3x et 2x sont des termes de même nature.",
    explanation:
      "3x + 2x = 5x, car on additionne les coefficients : 3 + 2 = 5.",
    tags: ["reduction", "termes-semblables"],
  },
  {
    kind: "fixed",
    id: "expr_litterale_reduire_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_reduire",
    difficulty: 1,
    theme: "neutral",
    text: "Réduire : 4a - a",
    format: "short",
    expected: ["3a", "3*a"],
    comparator: "contains_keyword",
    hint: "Soustraire a revient à soustraire 1a.",
    explanation: "4a - a = 4a - 1a = 3a.",
    tags: ["reduction"],
  },
  {
    kind: "fixed",
    id: "expr_litterale_reduire_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Réduire : 2x + 5 + 3x",
    format: "short",
    expected: ["5x+5", "5x + 5", "5+5x", "5 + 5x"],
    comparator: "contains_keyword",
    hint: "Réunis les termes en x, puis garde le nombre seul.",
    explanation: "2x + 5 + 3x = 5x + 5, car 2x + 3x = 5x.",
    tags: ["reduction", "ordre"],
  },
  {
    kind: "template",
    id: "expr_litterale_reduire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_reduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regroupe les termes semblables.",
    tags: ["reduction", "template"],
    generate: () => {
      const letter = randomChoice(["x", "a", "y"]);
      const c1 = randomInt(2, 7);
      const c2 = randomInt(1, 6);
      const total = c1 + c2;

      return {
        text: `Réduire : ${c1}${letter} + ${c2}${letter}`,
        format: "short",
        expected: [`${total}${letter}`, `${total}*${letter}`],
        comparator: "contains_keyword",
        explanation: `${c1}${letter} + ${c2}${letter} = ${total}${letter}, car ${c1} + ${c2} = ${total}.`,
      };
    },
  },

  // =========================
  // EXPR_LITTERALE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "expr_litterale_defis_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_defis",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 3x + 2x peut se réduire en 5x.",
    format: "short",
    expected: [
      "5x",
      "termes semblables",
      "coefficients",
      "même lettre",
      "meme lettre",
    ],
    comparator: "contains_keyword",
    hint: "3x et 2x représentent des quantités de même nature.",
    explanation:
      "3x et 2x sont des termes semblables : ils contiennent la même lettre x. On peut donc additionner leurs coefficients : 3 + 2 = 5, donc 3x + 2x = 5x.",
    tags: ["defi", "justification", "reduction"],
  },
  {
    kind: "fixed",
    id: "expr_litterale_defis_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_defis",
    difficulty: 3,
    theme: "neutral",
    text: "Léa dit que 2x + 3 = 5x. A-t-elle raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Peut-on additionner 2x et 3 ?",
    explanation:
      "Non. 2x et 3 ne sont pas des termes semblables. 2x contient une lettre, 3 est un nombre seul. On ne peut pas les additionner en 5x.",
    tags: ["defi", "erreur-frequente"],
  },
  {
    kind: "fixed",
    id: "expr_litterale_defis_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "expressions_litterales",
    microId: "expr_litterale_defis",
    difficulty: 3,
    theme: "neutral",
    text: "Un vendeur propose x stylos à 2 euros chacun et ajoute 3 euros de frais fixes. Quelle expression donne le prix total ?",
    format: "short",
    expected: ["2x+3", "2x + 3", "3+2x", "3 + 2x"],
    comparator: "contains_keyword",
    hint: "Prix des stylos + frais fixes.",
    explanation:
      "x stylos à 2 euros chacun coûtent 2x euros. Avec 3 euros de frais fixes, le total est 2x + 3.",
    tags: ["defi", "situation"],
  },
];