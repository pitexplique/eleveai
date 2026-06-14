/**
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Expressions littérales
 *
 * Objectifs :
 * - comprendre le rôle d’une lettre dans une expression ;
 * - identifier coefficient, variable et constante ;
 * - traduire une phrase en expression littérale ;
 * - substituer une valeur dans une expression ;
 * - réduire des termes semblables ;
 * - repérer les erreurs fréquentes de réduction.
 *
 * Organisation :
 * - fixed : ancrage des notions essentielles ;
 * - templates : variations de lettres, nombres et situations ;
 * - open : justification et verbalisation du raisonnement.
 */
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
    id: "litteral_expression_comprendre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 3x + 5, quelle est la lettre ?",
    format: "short",
    expected: ["x"],
    comparator: "contains_keyword",
    hint: "Cherche le symbole qui peut représenter un nombre variable.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Dans 3x + 5, la lettre est x. Elle représente une valeur qui peut changer.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "lettre", "variable"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 7a - 2, quel est le coefficient de a ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Le coefficient est le nombre placé devant la lettre.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Dans 7a - 2, le coefficient de a est 7, car 7a signifie 7 multiplié par a.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "coefficient"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "L’expression 4x + 1 est-elle une expression littérale ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Une expression littérale contient au moins une lettre.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Oui, 4x + 1 est une expression littérale, car elle contient la lettre x.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "reconnaitre"],
  },
    {
    kind: "fixed",
    id: "litteral_expression_comprendre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce que représente la lettre x dans une expression comme 3x + 5.",
    format: "open",
    expected: ["lettre", "nombre", "variable"],
    comparator: "contains_keyword",
    hint: "La lettre peut représenter un nombre qui change.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Dans une expression littérale, la lettre représente un nombre variable ou inconnu.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "variable", "open"],
  },
  {
    kind: "template",
    id: "litteral_expression_comprendre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
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
        explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          (`Dans l’expression ${a}${letter} + ${b}, la lettre est ${letter}.`) +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
      };
    },
  },

  // =========================
  // EXPR_LITTERALE_TRADUIRE
  // =========================
  {
    kind: "fixed",
    id: "litteral_expression_traduire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 1,
    theme: "neutral",
    text: "Traduire par une expression littérale : « un nombre x augmenté de 4 »",
    format: "short",
    expected: ["x+4", "x + 4", "4+x", "4 + x"],
    comparator: "contains_keyword",
    hint: "« augmenté de 4 » signifie qu’on ajoute 4.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("« Un nombre x augmenté de 4 » se traduit par x + 4.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["traduction", "addition"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_traduire_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 1,
    theme: "neutral",
    text: "Traduire par une expression littérale : « le double de x »",
    format: "short",
    expected: ["2x", "2*x"],
    comparator: "contains_keyword",
    hint: "Le double signifie 2 fois.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Le double de x se traduit par 2x.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["traduction", "multiplication"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_traduire_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduire par une expression littérale : « le triple de y diminué de 5 »",
    format: "short",
    expected: ["3y-5", "3y - 5", "3*y-5", "3*y - 5"],
    comparator: "contains_keyword",
    hint: "Le triple de y, puis on enlève 5.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Le triple de y est 3y. Diminué de 5 donne 3y - 5.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["traduction", "soustraction"],
  },
    {
    kind: "fixed",
    id: "litteral_expression_traduire_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression traduit : « le double de x augmenté de 5 » ?",
    format: "qcm",
    choices: ["2x + 5", "2(x + 5)", "x + 10", "5x + 2"],
    expected: ["2x + 5"],
    comparator: "mcq_exact",
    hint: "Le double de x est 2x, puis on ajoute 5.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Le double de x augmenté de 5 se traduit par 2x + 5.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "traduction", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_traduire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
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
          explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          (`« ${k} fois ${letter} plus ${c} » se traduit par ${k}${letter} + ${c}.`) +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
        },
        {
          text: `Traduire par une expression littérale : « ${k} fois ${letter} moins ${c} »`,
          expected: [
            `${k}${letter}-${c}`,
            `${k}${letter} - ${c}`,
            `${k}*${letter}-${c}`,
            `${k}*${letter} - ${c}`,
          ],
          explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          (`« ${k} fois ${letter} moins ${c} » se traduit par ${k}${letter} - ${c}.`) +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
        },
      ];

      const picked = randomChoice(forms);

      return {
        text: picked.text,
        format: "short",
        expected: picked.expected,
        comparator: "contains_keyword",
        explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          (picked.explanation) +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
      };
    },
  },
    {
    kind: "fixed",
    id: "litteral_expression_traduire_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi « le triple de x diminué de 4 » se traduit par 3x - 4.",
    format: "open",
    expected: ["triple", "3x", "diminué", "4"],
    comparator: "contains_keyword",
    hint: "Traduis séparément « triple » puis « diminué de 4 ».",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Le triple de x se traduit par 3x. Diminué de 4 signifie qu’on enlève 4, donc on obtient 3x - 4.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "traduction", "open"],
  },

  // =========================
  // EXPR_LITTERALE_SUBSTITUER
  // =========================
  {
    kind: "fixed",
    id: "litteral_expression_substituer_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer 3x + 2 pour x = 4.",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Remplace x par 4, puis calcule.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("3x + 2 avec x = 4 donne 3 × 4 + 2 = 12 + 2 = 14.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["substitution", "calcul"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_substituer_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer 5a - 1 pour a = 3.",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Remplace a par 3.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("5a - 1 avec a = 3 donne 5 × 3 - 1 = 15 - 1 = 14.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["substitution", "calcul"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_substituer_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 2x + 3y pour x = 2 et y = 5.",
    format: "short",
    expected: ["19"],
    comparator: "number_equal",
    hint: "Remplace chaque lettre par sa valeur.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("2x + 3y avec x = 2 et y = 5 donne 2 × 2 + 3 × 5 = 4 + 15 = 19.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["substitution", "deux-lettres"],
  },
    {
    kind: "fixed",
    id: "litteral_expression_substituer_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour calculer 4x + 1 avec x = 3, quel calcul faut-il faire ?",
    format: "qcm",
    choices: ["4 + 3 + 1", "4 × 3 + 1", "4 × 1 + 3", "4x + 3"],
    expected: ["4 × 3 + 1"],
    comparator: "mcq_exact",
    hint: "Remplace x par 3.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("On remplace x par 3 : 4x + 1 devient 4 × 3 + 1.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "substitution", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_substituer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
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
        explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          (`${k}${letter} + ${c} avec ${letter} = ${value} donne ${k} × ${value} + ${c} = ${result}.`) +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
      };
    },
  },
    {
    kind: "fixed",
    id: "litteral_expression_substituer_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer 3x + 2 pour x = 4.",
    format: "open",
    expected: ["remplace", "4", "3", "14"],
    comparator: "contains_keyword",
    hint: "Remplace x par 4 puis effectue le calcul.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("On remplace x par 4 : 3x + 2 = 3 × 4 + 2 = 12 + 2 = 14.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "substitution", "open"],
  },

  // =========================
  // EXPR_LITTERALE_REDUIRE
  // =========================
  {
    kind: "fixed",
    id: "litteral_expression_reduire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 1,
    theme: "neutral",
    text: "Réduire : 3x + 2x",
    format: "short",
    expected: ["5x", "5*x"],
    comparator: "contains_keyword",
    hint: "3x et 2x sont des termes de même nature.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("3x + 2x = 5x, car on additionne les coefficients : 3 + 2 = 5.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["reduction", "termes-semblables"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_reduire_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 1,
    theme: "neutral",
    text: "Réduire : 4a - a",
    format: "short",
    expected: ["3a", "3*a"],
    comparator: "contains_keyword",
    hint: "Soustraire a revient à soustraire 1a.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("4a - a = 4a - 1a = 3a.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["reduction"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_reduire_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Réduire : 2x + 5 + 3x",
    format: "short",
    expected: ["5x+5", "5x + 5", "5+5x", "5 + 5x"],
    comparator: "contains_keyword",
    hint: "Réunis les termes en x, puis garde le nombre seul.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("2x + 5 + 3x = 5x + 5, car 2x + 3x = 5x.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["reduction", "ordre"],
  },
    {
    kind: "fixed",
    id: "litteral_expression_reduire_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle réduction est correcte ?",
    format: "qcm",
    choices: ["2x + 3 = 5x", "2x + 3x = 5x", "2x + 3x = 6x", "2x + 3 = 5"],
    expected: ["2x + 3x = 5x"],
    comparator: "mcq_exact",
    hint: "On peut additionner seulement les termes semblables.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("2x et 3x sont des termes semblables, donc 2x + 3x = 5x.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "reduction", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_reduire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
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
        explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          (`${c1}${letter} + ${c2}${letter} = ${total}${letter}, car ${c1} + ${c2} = ${total}.`) +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
      };
    },
  },
    {
    kind: "fixed",
    id: "litteral_expression_reduire_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi on ne peut pas réduire 2x + 3 en 5x.",
    format: "open",
    expected: ["2x", "3", "pas", "semblables"],
    comparator: "contains_keyword",
    hint: "Compare 2x et 3 : sont-ils de même nature ?",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("2x contient une lettre, alors que 3 est un nombre seul. Ce ne sont pas des termes semblables, donc on ne peut pas écrire 5x.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "reduction", "erreur", "open"],
  },

  // =========================
  // EXPR_LITTERALE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "litteral_expression_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 3x + 2x peut se réduire en 5x.",
    format: "open",
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
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("3x et 2x sont des termes semblables : ils contiennent la même lettre x. On peut donc additionner leurs coefficients : 3 + 2 = 5, donc 3x + 2x = 5x.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["defi", "justification", "reduction"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Léa dit que 2x + 3 = 5x. A-t-elle raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Peut-on additionner 2x et 3 ?",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Non. 2x et 3 ne sont pas des termes semblables. 2x contient une lettre, 3 est un nombre seul. On ne peut pas les additionner en 5x.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["defi", "erreur-frequente"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un vendeur propose x stylos à 2 euros chacun et ajoute 3 euros de frais fixes. Quelle expression donne le prix total ?",
    format: "short",
    expected: ["2x+3", "2x + 3", "3+2x", "3 + 2x"],
    comparator: "contains_keyword",
    hint: "Prix des stylos + frais fixes.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("x stylos à 2 euros chacun coûtent 2x euros. Avec 3 euros de frais fixes, le total est 2x + 3.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["defi", "situation"],
  },
    {
    kind: "template",
    id: "litteral_expression_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique le prix variable puis les frais fixes.",
    tags: ["expression", "defi", "open", "situation"],
    generate: () => {
      const prix = randomInt(2, 6);
      const frais = randomInt(1, 8);

      return {
        text: `Un vendeur propose x objets à ${prix} euros chacun et ajoute ${frais} euros de frais fixes. Explique pourquoi le prix total est ${prix}x + ${frais}.`,
        format: "open",
        expected: [String(prix), "x", String(frais), "frais"],
        comparator: "contains_keyword",
        explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          (`Les x objets coûtent ${prix}x euros. On ajoute ensuite ${frais} euros de frais fixes, donc le prix total est ${prix}x + ${frais}.`) +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
      };
    },
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- LITTERAL_EXPRESSION_COMPRENDRE ----------
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression $5x$, que représente le nombre 5 ?",
    format: "qcm",
    choices: ["le coefficient", "la variable", "une constante seule", "l’inconnue"],
    expected: ["le coefficient"],
    comparator: "mcq_exact",
    hint: "C’est le nombre placé devant la lettre.",
    explanation:
      "Définition : le coefficient est le nombre placé devant la lettre.\n\n" +
      "Méthode : on repère le nombre multiplié par la lettre.\n\n" +
      "Calcul : dans $5x$, 5 multiplie x.\n\n" +
      "Conclusion : 5 est le coefficient de x.",
    tags: ["expression", "coefficient", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans l’expression $2x + 7$, quel est le terme constant (le nombre seul) ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "C’est le nombre qui n’est pas multiplié par une lettre.",
    explanation:
      "Définition : un terme constant est un nombre seul, sans lettre.\n\n" +
      "Méthode : on repère le terme sans lettre.\n\n" +
      "Calcul : dans $2x + 7$, le terme constant est 7.\n\n" +
      "Conclusion : le terme constant est 7.",
    tags: ["expression", "constante"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Que peut représenter la lettre dans une expression littérale ?",
    format: "qcm",
    choices: [
      "un nombre qui peut changer",
      "toujours le nombre 0",
      "une opération",
      "un signe de calcul",
    ],
    expected: ["un nombre qui peut changer"],
    comparator: "mcq_exact",
    hint: "La lettre remplace un nombre variable ou inconnu.",
    explanation:
      "Définition : dans une expression littérale, la lettre représente un nombre.\n\n" +
      "Méthode : on rappelle le rôle de la variable.\n\n" +
      "Calcul : selon les cas, ce nombre peut prendre différentes valeurs.\n\n" +
      "Conclusion : la lettre représente un nombre qui peut changer.",
    tags: ["expression", "variable", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_comprendre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Le coefficient est le nombre devant la lettre.",
    tags: ["expression", "coefficient", "template"],
    generate: () => {
      const letter = randomChoice(["x", "a", "b", "n", "t"]);
      const k = randomInt(2, 9);
      const c = randomInt(1, 9);
      return {
        text: `Dans l’expression $${k}${letter} + ${c}$, quel est le coefficient de ${letter} ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation:
          "Définition : le coefficient est le nombre placé devant la lettre.\n\n" +
          `Méthode : on repère le nombre qui multiplie ${letter}.\n\n` +
          `Calcul : dans $${k}${letter} + ${c}$, le coefficient de ${letter} est ${k}.\n\n` +
          `Conclusion : le coefficient est ${k}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_expression_comprendre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une expression littérale contient au moins une lettre.",
    tags: ["expression", "reconnaitre", "template"],
    generate: () => {
      const avecLettre = randomChoice([true, false]);
      const k = randomInt(2, 9);
      const c = randomInt(1, 9);
      const letter = randomChoice(["x", "a", "n"]);
      const expr = avecLettre ? `${k}${letter} + ${c}` : `${k} + ${c}`;
      return {
        text: `L’expression $${expr}$ est-elle une expression littérale ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [avecLettre ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une expression littérale contient au moins une lettre.\n\n" +
          "Méthode : on cherche la présence d’une lettre.\n\n" +
          `Calcul : $${expr}$ ${avecLettre ? "contient une lettre" : "ne contient que des nombres"}.\n\n` +
          `Conclusion : ${avecLettre ? "oui, c’est une expression littérale" : "non, ce n’est qu’un calcul numérique"}.`,
      };
    },
  },

  // ---------- LITTERAL_EXPRESSION_TRADUIRE ----------
  {
    kind: "fixed",
    id: "litteral_expression_traduire_qcm_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression traduit « la somme de x et de y » ?",
    format: "qcm",
    choices: ["$x + y$", "$x \\times y$", "$x - y$", "$xy + 2$"],
    expected: ["$x + y$"],
    comparator: "mcq_exact",
    hint: "« somme » signifie addition.",
    explanation:
      "Définition : traduire une phrase, c’est l’écrire avec des symboles mathématiques.\n\n" +
      "Méthode : « somme » correspond à l’addition.\n\n" +
      "Calcul : la somme de x et y est $x + y$.\n\n" +
      "Conclusion : l’expression est $x + y$.",
    tags: ["traduction", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_traduire_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression traduit « le produit de 5 par n » ?",
    format: "qcm",
    choices: ["$5n$", "$5 + n$", "$n - 5$", "$n^5$"],
    expected: ["$5n$"],
    comparator: "mcq_exact",
    hint: "« produit » signifie multiplication.",
    explanation:
      "Définition : « produit » correspond à la multiplication.\n\n" +
      "Méthode : on multiplie 5 par n.\n\n" +
      "Calcul : $5 \\times n = 5n$.\n\n" +
      "Conclusion : l’expression est $5n$.",
    tags: ["traduction", "multiplication", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_traduire_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Traduis « fois » par une multiplication.",
    tags: ["traduction", "qcm", "template"],
    generate: () => {
      const letter = randomChoice(["x", "a", "n"]);
      const k = randomInt(2, 9);
      const c = randomInt(1, 9);
      const plus = randomChoice([true, false]);
      const op = plus ? "+" : "-";
      const mot = plus ? "augmenté de" : "diminué de";
      const correct = `$${k}${letter} ${op} ${c}$`;
      return {
        text: `Quelle expression traduit « le produit de ${k} par ${letter}, ${mot} ${c} » ?`,
        format: "qcm",
        choices: [
          correct,
          `$${k} ${op} ${letter}$`,
          `$${k}(${letter} ${op} ${c})$`,
          `$${letter} ${op} ${k + c}$`,
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : on traduit chaque morceau de la phrase.\n\n" +
          `Méthode : « le produit de ${k} par ${letter} » est $${k}${letter}$, puis « ${mot} ${c} » ajoute l’opération.\n\n` +
          `Calcul : on obtient $${k}${letter} ${op} ${c}$.\n\n` +
          `Conclusion : l’expression est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_expression_traduire_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 3,
    theme: "neutral",
    hint: "« le … de (… plus …) » demande des parenthèses.",
    tags: ["traduction", "parentheses", "qcm", "template"],
    generate: () => {
      const letter = randomChoice(["x", "a", "n"]);
      const k = randomInt(2, 5);
      const c = randomInt(1, 9);
      const mot = k === 2 ? "double" : k === 3 ? "triple" : `${k} fois`;
      const correct = `$${k}(${letter} + ${c})$`;
      return {
        text: `Quelle expression traduit « le ${mot} de la somme de ${letter} et ${c} » ?`,
        format: "qcm",
        choices: [
          correct,
          `$${k}${letter} + ${c}$`,
          `$${letter} + ${k} \\times ${c}$`,
          `$${k} + ${letter} + ${c}$`,
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : « la somme de … et … » se met entre parenthèses quand on la multiplie.\n\n" +
          `Méthode : la somme est $(${letter} + ${c})$, puis on la multiplie par ${k}.\n\n` +
          `Calcul : on obtient $${k}(${letter} + ${c})$.\n\n` +
          `Conclusion : l’expression est ${correct}.`,
      };
    },
  },

  // ---------- LITTERAL_EXPRESSION_SUBSTITUER ----------
  {
    kind: "fixed",
    id: "litteral_expression_substituer_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $2x + 5$ pour $x = -3$.",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "Remplace x par -3, attention au signe.",
    explanation:
      "Définition : substituer, c’est remplacer la lettre par sa valeur.\n\n" +
      "Méthode : on remplace x par -3 puis on calcule.\n\n" +
      "Calcul : $2 \\times (-3) + 5 = -6 + 5 = -1$.\n\n" +
      "Conclusion : le résultat est -1.",
    tags: ["substitution", "relatif"],
  },
  {
    kind: "template",
    id: "litteral_expression_substituer_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace la lettre, puis effectue.",
    tags: ["substitution", "template"],
    generate: () => {
      const letter = randomChoice(["x", "a", "n"]);
      const k = randomInt(2, 8);
      const c = randomInt(1, 9);
      const value = randomInt(2, 7);
      const result = k * value - c;
      return {
        text: `Calculer $${k}${letter} - ${c}$ pour ${letter} = ${value}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : substituer, c’est remplacer la lettre par sa valeur.\n\n" +
          `Méthode : on remplace ${letter} par ${value}.\n\n` +
          `Calcul : $${k} \\times ${value} - ${c} = ${k * value} - ${c} = ${result}$.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_expression_substituer_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace chaque lettre par sa valeur.",
    tags: ["substitution", "deux_lettres", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(2, 6);
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      const result = a * x + b * y;
      return {
        text: `Calculer $${a}x + ${b}y$ pour $x = ${x}$ et $y = ${y}$.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : on remplace chaque lettre par sa valeur.\n\n" +
          "Méthode : on substitue x et y, puis on calcule.\n\n" +
          `Calcul : $${a} \\times ${x} + ${b} \\times ${y} = ${a * x} + ${b * y} = ${result}$.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_expression_substituer_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord la parenthèse.",
    tags: ["substitution", "parentheses", "template"],
    generate: () => {
      const letter = randomChoice(["x", "a", "n"]);
      const k = randomInt(2, 5);
      const c = randomInt(1, 6);
      const value = randomInt(1, 6);
      const result = k * (value + c);
      return {
        text: `Calculer $${k}(${letter} + ${c})$ pour ${letter} = ${value}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : on remplace la lettre, puis on respecte les priorités.\n\n" +
          "Méthode : on calcule d’abord la parenthèse, puis on multiplie.\n\n" +
          `Calcul : $${k}(${value} + ${c}) = ${k} \\times ${value + c} = ${result}$.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },

  // ---------- LITTERAL_EXPRESSION_REDUIRE ----------
  {
    kind: "fixed",
    id: "litteral_expression_reduire_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Réduire $5x - 2x$.",
    format: "qcm",
    choices: ["$3x$", "$7x$", "$3$", "$10x$"],
    expected: ["$3x$"],
    comparator: "mcq_exact",
    hint: "On soustrait les coefficients.",
    explanation:
      "Définition : on réduit en additionnant ou soustrayant les coefficients des termes semblables.\n\n" +
      "Méthode : $5x$ et $2x$ sont semblables.\n\n" +
      "Calcul : $5 - 2 = 3$, donc $5x - 2x = 3x$.\n\n" +
      "Conclusion : la forme réduite est $3x$.",
    tags: ["reduction", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_reduire_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle expression ne peut PAS être réduite davantage ?",
    format: "qcm",
    choices: ["$3x + 2$", "$3x + 2x$", "$x + 4x$", "$2a + 3a$"],
    expected: ["$3x + 2$"],
    comparator: "mcq_exact",
    hint: "On ne peut réduire que des termes semblables.",
    explanation:
      "Définition : on ne réduit que des termes semblables (même lettre).\n\n" +
      "Méthode : on cherche l’expression dont les termes ne sont pas semblables.\n\n" +
      "Calcul : $3x$ et $2$ ne sont pas semblables ; les autres se réduisent.\n\n" +
      "Conclusion : $3x + 2$ ne peut pas être réduite.",
    tags: ["reduction", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_reduire_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regroupe les termes en lettre, garde le nombre seul.",
    tags: ["reduction", "qcm", "template"],
    generate: () => {
      const letter = randomChoice(["x", "a", "y"]);
      const c1 = randomInt(2, 6);
      const c2 = randomInt(1, 5);
      const cst = randomInt(1, 9);
      const total = c1 + c2;
      const correct = `$${total}${letter} + ${cst}$`;
      return {
        text: `Réduire $${c1}${letter} + ${cst} + ${c2}${letter}$.`,
        format: "qcm",
        choices: [
          correct,
          `$${total + cst}${letter}$`,
          `$${total}${letter} + ${cst}${letter}$`,
          `$${c1}${letter} + ${c2 + cst}$`,
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : on regroupe les termes semblables.\n\n" +
          `Méthode : on additionne $${c1}${letter}$ et $${c2}${letter}$, on garde ${cst} à part.\n\n` +
          `Calcul : $${c1}${letter} + ${c2}${letter} = ${total}${letter}$, donc l’expression réduite est $${total}${letter} + ${cst}$.\n\n` +
          `Conclusion : la forme réduite est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_expression_reduire_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "On regroupe séparément les x et les y.",
    tags: ["reduction", "deux_lettres", "qcm", "template"],
    generate: () => {
      const ax = randomInt(2, 6);
      const cx = randomInt(1, 5);
      const by = randomInt(2, 6);
      const sx = ax + cx;
      const correct = `$${sx}x + ${by}y$`;
      return {
        text: `Réduire $${ax}x + ${by}y + ${cx}x$.`,
        format: "qcm",
        choices: [
          correct,
          `$${sx + by}xy$`,
          `$${ax}x + ${by + cx}y$`,
          `$${sx}x + ${by}x$`,
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : on regroupe les termes semblables, séparément pour chaque lettre.\n\n" +
          "Méthode : on additionne les termes en x ; le terme en y reste seul.\n\n" +
          `Calcul : $${ax}x + ${cx}x = ${sx}x$, et $${by}y$ reste, donc $${sx}x + ${by}y$.\n\n` +
          `Conclusion : la forme réduite est ${correct}.`,
      };
    },
  },

  // ---------- LITTERAL_EXPRESSION_DEFIS ----------
  {
    kind: "fixed",
    id: "litteral_expression_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un carré a un côté de longueur $c$. Quelle expression donne son périmètre ?",
    format: "qcm",
    choices: ["$4c$", "$c^2$", "$2c$", "$c + 4$"],
    expected: ["$4c$"],
    comparator: "mcq_exact",
    hint: "Le périmètre est la somme des quatre côtés.",
    explanation:
      "Définition : le périmètre d’un carré est la somme de ses quatre côtés égaux.\n\n" +
      "Méthode : on additionne quatre fois le côté.\n\n" +
      "Calcul : $c + c + c + c = 4c$.\n\n" +
      "Conclusion : le périmètre est $4c$.",
    tags: ["defi", "perimetre", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_defi_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un rectangle a une longueur $L$ et une largeur $\\ell$. Quelle expression donne son périmètre ?",
    format: "qcm",
    choices: ["$2(L + \\ell)$", "$L \\times \\ell$", "$L + \\ell$", "$2L \\times 2\\ell$"],
    expected: ["$2(L + \\ell)$"],
    comparator: "mcq_exact",
    hint: "On additionne deux longueurs et deux largeurs.",
    explanation:
      "Définition : le périmètre d’un rectangle est la somme de ses quatre côtés.\n\n" +
      "Méthode : il y a deux longueurs et deux largeurs.\n\n" +
      "Calcul : $L + \\ell + L + \\ell = 2L + 2\\ell = 2(L + \\ell)$.\n\n" +
      "Conclusion : le périmètre est $2(L + \\ell)$.",
    tags: ["defi", "perimetre", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_defi_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit $3x \\times 2 = 5x$. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Multiplier par 2, ce n’est pas additionner.",
    explanation:
      "Définition : multiplier $3x$ par 2 multiplie le coefficient.\n\n" +
      "Méthode : $3x \\times 2 = (3 \\times 2)x$.\n\n" +
      "Calcul : $3x \\times 2 = 6x$, pas $5x$.\n\n" +
      "Conclusion : non, le résultat correct est $6x$.",
    tags: ["defi", "erreur", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Remplace la lettre par sa valeur dans l’expression du prix.",
    tags: ["defi", "situation", "substitution", "template"],
    generate: () => {
      const prix = randomInt(2, 6);
      const frais = randomInt(1, 8);
      const n = randomInt(3, 10);
      const total = prix * n + frais;
      return {
        text: `Le prix total de n objets est donné par $${prix}n + ${frais}$ (en euros). Combien coûte l’achat de ${n} objets ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : on substitue la valeur de n dans l’expression du prix.\n\n" +
          `Méthode : on remplace n par ${n}.\n\n` +
          `Calcul : $${prix} \\times ${n} + ${frais} = ${prix * n} + ${frais} = ${total}$.\n\n` +
          `Conclusion : l’achat coûte ${total} euros.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_expression_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Traduis l’âge actuel puis remplace.",
    tags: ["defi", "situation", "substitution", "template"],
    generate: () => {
      const ecart = randomInt(3, 12);
      const age = randomInt(8, 20);
      const resultat = age + ecart;
      return {
        text: `Marie a $x$ ans. Son frère a ${ecart} ans de plus, soit $x + ${ecart}$ ans. Si Marie a ${age} ans, quel est l’âge de son frère ?`,
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        explanation:
          "Définition : l’âge du frère est donné par l’expression $x + " + ecart + "$.\n\n" +
          `Méthode : on remplace x par ${age}.\n\n` +
          `Calcul : $${age} + ${ecart} = ${resultat}$.\n\n` +
          `Conclusion : son frère a ${resultat} ans.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_expression_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre le coefficient et le terme constant dans l’expression $4x + 7$.",
    format: "open",
    expected: ["coefficient", "4", "constant", "7"],
    comparator: "contains_keyword",
    hint: "L’un est devant la lettre, l’autre est un nombre seul.",
    explanation:
      "Définition : le coefficient est le nombre devant la lettre ; le terme constant est un nombre seul.\n\n" +
      "Méthode : on repère chaque rôle dans $4x + 7$.\n\n" +
      "Calcul : 4 est le coefficient de x, 7 est le terme constant.\n\n" +
      "Conclusion : 4 multiplie x, tandis que 7 ne dépend pas de x.",
    tags: ["defi", "open"],
  },
];