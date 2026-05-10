import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const equationsBank: TutorBankItemV4[] = [
  // =========================
  // EQUATION_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "equation_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Laquelle de ces écritures est une équation ?",
    format: "qcm",
    choices: ["3x + 5", "2 + 7 = 9", "3x + 2 = 11", "5 - 2"],
    expected: ["3x + 2 = 11"],
    comparator: "mcq_exact",
    hint: "Une équation contient un signe = et une inconnue.",
    explanation:
      "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("Une équation contient une inconnue, ici x, et une égalité. Donc 3x + 2 = 11 est une équation.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "equation_reconnaitre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "L’écriture x + 4 = 9 est-elle une équation ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Vérifie s’il y a une inconnue et un signe =.",
    explanation:
      "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("Oui. x + 4 = 9 contient une inconnue x et un signe égal.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "vocabulaire"],
  },
  {
    kind: "template",
    id: "equation_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche l’écriture avec une inconnue et un signe =.",
    tags: ["equation", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(1, 9);
      const c = randomInt(10, 25);

      const eq = `${a}x + ${b} = ${c}`;
      const wrong1 = `${a}x + ${b}`;
      const wrong2 = `${a} + ${b} = ${c}`;
      const wrong3 = `${c} - ${b}`;
      const choices = randomChoice([
        [eq, wrong1, wrong2, wrong3],
        [wrong1, eq, wrong2, wrong3],
        [wrong1, wrong2, eq, wrong3],
        [wrong1, wrong2, wrong3, eq],
      ]);

      return {
        text: "Laquelle de ces écritures est une équation ?",
        format: "qcm",
        choices,
        expected: [eq],
        comparator: "mcq_exact",
        explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          (`${eq} est une équation car elle contient une inconnue x et une égalité.`) +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
      };
    },
  },

  // =========================
  // EQUATION_TRADUIRE
  // =========================
  {
    kind: "fixed",
    id: "equation_traduire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduire en équation : « un nombre x augmenté de 3 vaut 11 »",
    format: "short",
    expected: ["x+3=11", "x + 3 = 11", "11=x+3", "11 = x + 3"],
    comparator: "contains_keyword",
    hint: "« augmenté de 3 » puis « vaut 11 ».",
    explanation:
      "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("« Un nombre x augmenté de 3 vaut 11 » se traduit par x + 3 = 11.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "traduction"],
  },
  {
    kind: "fixed",
    id: "equation_traduire_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduire en équation : « le double de x est égal à 14 »",
    format: "short",
    expected: ["2x=14", "2x = 14", "14=2x", "14 = 2x", "2*x=14", "2*x = 14"],
    comparator: "contains_keyword",
    hint: "Le double de x signifie 2x.",
    explanation:
      "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("« Le double de x est égal à 14 » se traduit par 2x = 14.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "traduction"],
  },
  {
    kind: "template",
    id: "equation_traduire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Transforme la phrase en égalité avec x.",
    tags: ["equation", "traduction", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(1, 9);
      const c = randomInt(10, 30);

      const forms = [
        {
          text: `Traduire en équation : « ${a} fois x plus ${b} vaut ${c} »`,
          expected: [
            `${a}x+${b}=${c}`,
            `${a}x + ${b} = ${c}`,
            `${a}*x+${b}=${c}`,
            `${a}*x + ${b} = ${c}`,
          ],
          explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          (`La phrase se traduit par ${a}x + ${b} = ${c}.`) +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
        },
        {
          text: `Traduire en équation : « ${a} fois x moins ${b} vaut ${c} »`,
          expected: [
            `${a}x-${b}=${c}`,
            `${a}x - ${b} = ${c}`,
            `${a}*x-${b}=${c}`,
            `${a}*x - ${b} = ${c}`,
          ],
          explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          (`La phrase se traduit par ${a}x - ${b} = ${c}.`) +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
        },
      ];

      const picked = randomChoice(forms);

      return {
        text: picked.text,
        format: "short",
        expected: picked.expected,
        comparator: "contains_keyword",
        explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          (picked.explanation) +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
      };
    },
  },

  // =========================
  // EQUATION_RESOUDRE_SIMPLE
  // =========================
  {
    kind: "fixed",
    id: "equation_resoudre_simple_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 1,
    theme: "neutral",
    text: "Résoudre : x + 4 = 9",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Quel nombre plus 4 donne 9 ?",
    explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("x + 4 = 9 donc x = 5.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "resolution"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_simple_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 1,
    theme: "neutral",
    text: "Résoudre : 3x = 15",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Divise 15 par 3.",
    explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("3x = 15 donc x = 15 ÷ 3 = 5.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "resolution"],
  },
  {
    kind: "template",
    id: "equation_resoudre_simple_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Isole x.",
    tags: ["equation", "resolution", "template"],
    generate: () => {
      const x = randomInt(1, 9);
      const a = randomInt(2, 8);
      const b = a * x;

      return {
        text: `Résoudre : ${a}x = ${b}`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          (`${a}x = ${b} donc x = ${b} ÷ ${a} = ${x}.`) +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
      };
    },
  },

  // =========================
  // EQUATION_RESOUDRE_REDUCTION
  // =========================
  {
    kind: "fixed",
    id: "equation_resoudre_reduction_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 2,
    theme: "neutral",
    text: "Résoudre : 2x + 3x = 15",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Réduis d’abord 2x + 3x.",
    explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("2x + 3x = 5x, donc 5x = 15 et x = 3.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "reduction"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_reduction_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 2,
    theme: "neutral",
    text: "Résoudre : 4x - x = 12",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Réduis 4x - x.",
    explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("4x - x = 3x, donc 3x = 12 et x = 4.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "reduction"],
  },
  {
    kind: "template",
    id: "equation_resoudre_reduction_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 3,
    theme: "neutral",
    hint: "Réduis les termes en x avant de résoudre.",
    tags: ["equation", "reduction", "template"],
    generate: () => {
      const x = randomInt(1, 9);
      const a = randomInt(2, 6);
      const b = randomInt(1, 4);
      const coeff = a + b;
      const total = coeff * x;

      return {
        text: `Résoudre : ${a}x + ${b}x = ${total}`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          (`${a}x + ${b}x = ${coeff}x. Donc ${coeff}x = ${total}, d’où x = ${x}.`) +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
      };
    },
  },

  // =========================
  // EQUATION_RESOUDRE_DISTRIBUTIVITE
  // =========================
  {
    kind: "fixed",
    id: "equation_resoudre_litteral_distributivite_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Résoudre : 2(x + 3) = 14",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Développe ou divise d’abord par 2.",
    explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("2(x + 3) = 14 donc x + 3 = 7 puis x = 4.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "litteral_distributivite"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_litteral_distributivite_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Résoudre : 3(x - 1) = 12",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Commence par diviser par 3.",
    explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("3(x - 1) = 12 donc x - 1 = 4 puis x = 5.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "litteral_distributivite"],
  },
  {
    kind: "template",
    id: "equation_resoudre_litteral_distributivite_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 4,
    theme: "neutral",
    hint: "Supprime d’abord la parenthèse ou isole la parenthèse.",
    tags: ["equation", "litteral_distributivite", "template"],
    generate: () => {
      const x = randomInt(1, 8);
      const a = randomInt(2, 5);
      const b = randomInt(1, 6);
      const rhs = a * (x + b);

      return {
        text: `Résoudre : ${a}(x + ${b}) = ${rhs}`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          (`${a}(x + ${b}) = ${rhs} donc x + ${b} = ${rhs / a}, puis x = ${x}.`) +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
      };
    },
  },

  // =========================
  // EQUATION_VERIFIER
  // =========================
  {
    kind: "fixed",
    id: "equation_verifier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 4 est-il solution de l’équation x + 3 = 7 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Remplace x par 4.",
    explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("4 + 3 = 7, donc 4 est bien solution.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "verification"],
  },
  {
    kind: "fixed",
    id: "equation_verifier_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 2 est-il solution de l’équation 3x = 9 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule 3 × 2.",
    explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("3 × 2 = 6, ce n’est pas 9. Donc 2 n’est pas solution.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "verification"],
  },
  {
    kind: "template",
    id: "equation_verifier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Teste la valeur proposée dans l’équation.",
    tags: ["equation", "verification", "template"],
    generate: () => {
      const x = randomInt(1, 8);
      const a = randomInt(2, 5);
      const b = a * x;
      const isSolution = randomChoice([true, false]);
      const candidate = isSolution ? x : x + randomChoice([1, 2]);

      return {
        text: `Le nombre ${candidate} est-il solution de l’équation ${a}x = ${b} ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [isSolution ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          (`${a} × ${candidate} = ${a * candidate}. ${
          isSolution ? "Cela donne bien" : "Cela ne donne pas"
        } ${b}.`) +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
      };
    },
  },

  // =========================
  // EQUATION_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "equation_probleme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "J’ai pensé à un nombre. Si j’ajoute 5, j’obtiens 17. Quel est ce nombre ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Pose x + 5 = 17.",
    explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("On pose x + 5 = 17. Donc x = 12.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "probleme"],
  },
  {
    kind: "fixed",
    id: "equation_probleme_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Le double d’un nombre diminué de 3 vaut 11. Quel est ce nombre ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Pose 2x - 3 = 11.",
    explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("2x - 3 = 11 donc 2x = 14 puis x = 7.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "probleme"],
  },
  {
    kind: "template",
    id: "equation_probleme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Traduis l’énoncé par une équation, puis résous-la.",
    tags: ["equation", "probleme", "template"],
    generate: () => {
      const x = randomInt(2, 12);
      const b = randomInt(2, 8);
      const total = x + b;

      return {
        text: `J’ai pensé à un nombre. Si j’ajoute ${b}, j’obtiens ${total}. Quel est ce nombre ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          (`On pose x + ${b} = ${total}. Donc x = ${total} - ${b} = ${x}.`) +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
      };
    },
  },
  {
  kind: "template",
  id: "equation_probleme_tpl_2",
  niveau: "4e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_probleme",
  difficulty: 5,
  theme: "reunion",
  hint: "Pose une équation avec x.",
  tags: ["equation", "probleme", "reunion"],
  generate: () => {
    const x = randomInt(5, 15);
    const prix = randomInt(2, 5);
    const total = x * prix;

    return {
      text: `Au marché de saint Pierre, on achète des mangues à ${prix} € l’unité. On paie ${total} €. Combien de mangues a-t-on achetées ?`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          (`${prix}x = ${total} donc x = ${total} ÷ ${prix} = ${x}.`) +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    };
  },
},

  // =========================
  // EQUATION_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "equation_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi x = 3 est solution de 2x + 1 = 7.",
    format: "short",
    expected: ["2×3+1=7", "2x+1=7", "6+1=7", "7"],
    comparator: "contains_keyword",
    hint: "Remplace x par 3 dans l’équation.",
    explanation:
      "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("On remplace x par 3 : 2 × 3 + 1 = 6 + 1 = 7. L’égalité est vraie, donc 3 est solution.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "defi", "justification"],
  },
  {
    kind: "fixed",
    id: "equation_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Léo dit : « dans 2x + 3 = 11, x = 4 car 2 + 3 + 4 = 9 ». A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Teste vraiment x = 4 dans l’équation.",
   explanation:
  "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("Non. Même si x = 4 est bien solution, le raisonnement de Léo est faux. Il faut remplacer x dans l’expression, pas additionner les nombres.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "defi", "erreur"],
  },
  {
    kind: "fixed",
    id: "equation_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Résoudre : 2(x + 3) = 3x + 1",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Développe puis regroupe les termes.",
    explanation:
      "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          ("2(x + 3) = 3x + 1 donne 2x + 6 = 3x + 1. Donc 6 = x + 1 puis x = 5.") +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    tags: ["equation", "defi", "avance"],
  },
  {
  kind: "template",
  id: "equation_open_justifier_1",
  niveau: "4e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_defi",
  difficulty: 4,
  theme: "neutral",
  hint: "Remplace x dans l’équation.",
  tags: ["equation", "open", "justification"],
  generate: () => {
    const x = randomInt(2, 8);
    const a = randomInt(2, 5);
    const b = a * x;

    return {
      text: `Explique pourquoi x = ${x} est solution de ${a}x = ${b}.`,
      format: "open",
      expected: ["remplace", "multiplie", "égalité", `${b}`],
      comparator: "contains_keyword",
      explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          (`On remplace x par ${x} : ${a} × ${x} = ${b}, donc l’égalité est vérifiée.`) +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    };
  },
},
{
  kind: "template",
  id: "equation_open_erreur_1",
  niveau: "4e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_defi",
  difficulty: 4,
  theme: "neutral",
  hint: "Regarde ce qui ne va pas dans le raisonnement.",
  tags: ["equation", "open", "erreur"],
  generate: () => {
    const a = randomInt(2, 5);
    const b = randomInt(2, 8);

    return {
      text: `Un élève dit : "${a}x = ${a + b} donc x = ${b}". Explique pourquoi c’est faux.`,
      format: "open",
      expected: ["division", "erreur", "multiplier", "égalité"],
      comparator: "contains_keyword",
      explanation: "Définition : une équation est une égalité avec une inconnue ; la résoudre, c’est trouver la valeur qui rend l’égalité vraie.\n\n" +
          "Méthode : on garde l’égalité équilibrée en faisant la même opération des deux côtés.\n\nCalcul : " +
          (`On doit diviser par ${a}, pas soustraire.`) +
          "\n\nConclusion : la valeur trouvée est la solution de l’équation.",
    };
  },
},
];