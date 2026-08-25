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

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- EQUATION_RECONNAITRE ----------
  {
    kind: "fixed",
    id: "equation_reconnaitre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Laquelle de ces écritures est une équation ?",
    format: "qcm",
    choices: ["$5x - 2 = 8$", "$5x - 2$", "$7 + 1 = 8$", "$2x$"],
    expected: ["$5x - 2 = 8$"],
    comparator: "mcq_exact",
    hint: "Une équation a une inconnue ET un signe =.",
    explanation:
      "Définition : une équation est une égalité contenant une inconnue.\n\n" +
      "Méthode : on cherche une écriture avec x et un signe =.\n\n" +
      "Calcul : $5x - 2 = 8$ a une inconnue et une égalité.\n\n" +
      "Conclusion : c’est $5x - 2 = 8$.",
    tags: ["equation", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "equation_reconnaitre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’équation $3x + 2 = 11$, quelle est l’inconnue ?",
    format: "qcm",
    choices: ["x", "3", "2", "11"],
    expected: ["x"],
    comparator: "mcq_exact",
    hint: "L’inconnue est la lettre dont on cherche la valeur.",
    explanation:
      "Définition : l’inconnue est la lettre dont on cherche la valeur.\n\n" +
      "Méthode : on repère la lettre dans l’équation.\n\n" +
      "Calcul : ici la lettre est x.\n\n" +
      "Conclusion : l’inconnue est x.",
    tags: ["equation", "reconnaitre", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "equation_reconnaitre_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Que signifie « résoudre une équation » ?",
    format: "qcm",
    choices: [
      "trouver la valeur de l’inconnue qui rend l’égalité vraie",
      "trouver toutes les valeurs qui rendent l’égalité fausse",
      "calculer la valeur de l’expression pour x égal à zéro",
      "réduire chaque membre de l’égalité le plus possible",
    ],
    expected: ["trouver la valeur de l’inconnue qui rend l’égalité vraie"],
    comparator: "mcq_exact",
    hint: "On cherche la valeur de x.",
    explanation:
      "Définition : résoudre une équation, c’est trouver la valeur de l’inconnue qui rend l’égalité vraie.\n\n" +
      "Méthode : on isole l’inconnue.\n\n" +
      "Calcul : la solution vérifie l’égalité.\n\n" +
      "Conclusion : résoudre, c’est trouver la valeur de l’inconnue.",
    tags: ["equation", "reconnaitre", "qcm"],
  },
  {
    kind: "template",
    id: "equation_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche l’écriture avec une inconnue et un signe =.",
    tags: ["equation", "reconnaitre", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(1, 9);
      const c = randomInt(10, 25);
      const eq = `$${a}x - ${b} = ${c}$`;
      return {
        text: "Laquelle de ces écritures est une équation ?",
        format: "qcm",
        choices: [eq, `$${a}x - ${b}$`, `$${a} \\times ${b} = ${a * b}$`, `$${c} + ${b}$`],
        expected: [eq],
        comparator: "mcq_exact",
        explanation:
          "Définition : une équation est une égalité contenant une inconnue.\n\n" +
          "Méthode : on cherche x et un signe =.\n\n" +
          `Calcul : ${eq} contient une inconnue et une égalité.\n\n` +
          `Conclusion : c’est ${eq}.`,
      };
    },
  },
  {
    kind: "template",
    id: "equation_reconnaitre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une équation contient un signe = ; une expression non.",
    tags: ["equation", "reconnaitre", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(1, 9);
      const c = randomInt(10, 20);
      const estEquation = randomChoice([true, false]);
      const ecriture = estEquation ? `${a}x + ${b} = ${c}` : `${a}x + ${b}`;
      return {
        text: `L’écriture $${ecriture}$ est-elle une équation ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [estEquation ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une équation contient une inconnue et un signe =.\n\n" +
          "Méthode : on cherche la présence du signe =.\n\n" +
          `Calcul : $${ecriture}$ ${estEquation ? "contient un signe =" : "ne contient pas de signe ="}.\n\n` +
          `Conclusion : ${estEquation ? "oui, c’est une équation" : "non, c’est seulement une expression"}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "equation_reconnaitre_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans $4x + 1 = 13$, comment appelle-t-on le nombre 13 ?",
    format: "qcm",
    choices: ["le second membre", "l’inconnue", "le coefficient", "la solution"],
    expected: ["le second membre"],
    comparator: "mcq_exact",
    hint: "C’est ce qui se trouve à droite du signe =.",
    explanation:
      "Définition : une équation a un premier membre (à gauche du =) et un second membre (à droite).\n\n" +
      "Méthode : on repère ce qui est à droite du signe =.\n\n" +
      "Calcul : ici 13 est à droite du signe =.\n\n" +
      "Conclusion : 13 est le second membre.",
    tags: ["equation", "reconnaitre", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "equation_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce qu’est une équation et ce que signifie la résoudre.",
    format: "open",
    expected: ["égalité", "inconnue", "valeur"],
    comparator: "contains_keyword",
    hint: "Pense au signe = et à l’inconnue.",
    explanation:
      "Définition : une équation est une égalité contenant une inconnue.\n\n" +
      "Méthode : résoudre, c’est chercher la valeur de l’inconnue.\n\n" +
      "Calcul : cette valeur rend l’égalité vraie.\n\n" +
      "Conclusion : résoudre une équation, c’est trouver la valeur de l’inconnue qui vérifie l’égalité.",
    tags: ["equation", "reconnaitre", "open"],
  },

  // ---------- EQUATION_TRADUIRE ----------
  {
    kind: "fixed",
    id: "equation_traduire_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle équation traduit « un nombre x diminué de 5 vaut 8 » ?",
    format: "qcm",
    choices: ["$x - 5 = 8$", "$x + 5 = 8$", "$5 - x = 8$", "$5x = 8$"],
    expected: ["$x - 5 = 8$"],
    comparator: "mcq_exact",
    hint: "« diminué de 5 » signifie qu’on enlève 5.",
    explanation:
      "Définition : on traduit chaque mot en symbole.\n\n" +
      "Méthode : « diminué de 5 » donne $x - 5$, « vaut 8 » donne $= 8$.\n\n" +
      "Calcul : on obtient $x - 5 = 8$.\n\n" +
      "Conclusion : l’équation est $x - 5 = 8$.",
    tags: ["equation", "traduction", "qcm"],
  },
  {
    kind: "fixed",
    id: "equation_traduire_qcm_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle équation traduit « le triple de x vaut 21 » ?",
    format: "qcm",
    choices: ["$3x = 21$", "$x + 3 = 21$", "$x - 3 = 21$", "$\\frac{x}{3} = 21$"],
    expected: ["$3x = 21$"],
    comparator: "mcq_exact",
    hint: "Le triple de x est 3x.",
    explanation:
      "Définition : « le triple » signifie multiplier par 3.\n\n" +
      "Méthode : on écrit $3x$, puis « vaut 21 » donne $= 21$.\n\n" +
      "Calcul : on obtient $3x = 21$.\n\n" +
      "Conclusion : l’équation est $3x = 21$.",
    tags: ["equation", "traduction", "qcm"],
  },
  {
    kind: "fixed",
    id: "equation_traduire_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduire en équation : « la somme de x et 7 vaut 20 »",
    format: "short",
    expected: ["x+7=20", "x + 7 = 20", "20=x+7", "20 = x + 7", "7+x=20", "7 + x = 20"],
    comparator: "contains_keyword",
    hint: "« somme » signifie addition.",
    explanation:
      "Définition : on traduit chaque mot en symbole.\n\n" +
      "Méthode : « la somme de x et 7 » donne $x + 7$, « vaut 20 » donne $= 20$.\n\n" +
      "Calcul : on obtient $x + 7 = 20$.\n\n" +
      "Conclusion : l’équation est $x + 7 = 20$.",
    tags: ["equation", "traduction"],
  },
  {
    kind: "fixed",
    id: "equation_traduire_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduire en équation : « le double de x diminué de 4 vaut 10 »",
    format: "short",
    expected: ["2x-4=10", "2x - 4 = 10", "2*x-4=10", "2*x - 4 = 10"],
    comparator: "contains_keyword",
    hint: "Le double de x, puis on enlève 4.",
    explanation:
      "Définition : on traduit mot à mot.\n\n" +
      "Méthode : « le double de x » donne $2x$, « diminué de 4 » donne $- 4$, « vaut 10 » donne $= 10$.\n\n" +
      "Calcul : on obtient $2x - 4 = 10$.\n\n" +
      "Conclusion : l’équation est $2x - 4 = 10$.",
    tags: ["equation", "traduction"],
  },
  {
    kind: "template",
    id: "equation_traduire_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Traduis « fois » par une multiplication.",
    tags: ["equation", "traduction", "qcm", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(1, 9);
      const c = randomInt(10, 30);
      const correct = `$${a}x + ${b} = ${c}$`;
      return {
        text: `Quelle équation traduit « ${a} fois x plus ${b} vaut ${c} » ?`,
        format: "qcm",
        choices: [
          correct,
          `$${a} + x + ${b} = ${c}$`,
          `$${a}x - ${b} = ${c}$`,
          `$${a}x + ${b} = ${c + b}$`,
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : on traduit chaque morceau de la phrase.\n\n" +
          `Méthode : « ${a} fois x » donne $${a}x$, « plus ${b} » donne $+ ${b}$, « vaut ${c} » donne $= ${c}$.\n\n` +
          `Calcul : on obtient $${a}x + ${b} = ${c}$.\n\n` +
          `Conclusion : l’équation est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "equation_traduire_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 3,
    theme: "neutral",
    hint: "« le double de (… plus …) » demande des parenthèses.",
    tags: ["equation", "traduction", "parentheses", "qcm", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const b = randomInt(1, 6);
      const c = randomInt(10, 30);
      const mot = a === 2 ? "double" : a === 3 ? "triple" : `${a} fois`;
      const correct = `$${a}(x + ${b}) = ${c}$`;
      return {
        text: `Quelle équation traduit « le ${mot} de la somme de x et ${b} vaut ${c} » ?`,
        format: "qcm",
        choices: [
          correct,
          `$${a}x + ${b} = ${c}$`,
          `$x + ${a} \\times ${b} = ${c}$`,
          `$${a} + x + ${b} = ${c}$`,
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : « la somme de x et b » se met entre parenthèses quand on la multiplie.\n\n" +
          `Méthode : la somme est $(x + ${b})$, multipliée par ${a}.\n\n` +
          `Calcul : on obtient $${a}(x + ${b}) = ${c}$.\n\n` +
          `Conclusion : l’équation est ${correct}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "equation_traduire_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment traduire « le double de x augmenté de 1 vaut 9 » en équation.",
    format: "open",
    expected: ["2x", "1", "9"],
    comparator: "contains_keyword",
    hint: "Traduis chaque morceau séparément.",
    explanation:
      "Définition : on traduit la phrase morceau par morceau.\n\n" +
      "Méthode : « le double de x » donne $2x$, « augmenté de 1 » donne $+ 1$, « vaut 9 » donne $= 9$.\n\n" +
      "Calcul : on obtient $2x + 1 = 9$.\n\n" +
      "Conclusion : l’équation est $2x + 1 = 9$.",
    tags: ["equation", "traduction", "open"],
  },

  // ---------- EQUATION_RESOUDRE_SIMPLE ----------
  {
    kind: "fixed",
    id: "equation_resoudre_simple_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 1,
    theme: "neutral",
    text: "Résoudre : $x - 3 = 8$",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "On ajoute 3 des deux côtés.",
    explanation:
      "Définition : on isole x en faisant la même opération des deux côtés.\n\n" +
      "Méthode : on ajoute 3 des deux côtés.\n\n" +
      "Calcul : $x = 8 + 3 = 11$.\n\n" +
      "Conclusion : $x = 11$.",
    tags: ["equation", "resolution"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_simple_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Résoudre : $4x = 20$",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "On divise par 4.",
    explanation:
      "Définition : on isole x en divisant des deux côtés.\n\n" +
      "Méthode : on divise par 4.\n\n" +
      "Calcul : $x = 20 \\div 4 = 5$.\n\n" +
      "Conclusion : $x = 5$.",
    tags: ["equation", "resolution"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_simple_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Pour résoudre $x + 5 = 12$, quelle opération fait-on des deux côtés ?",
    format: "qcm",
    choices: ["soustraire 5", "ajouter 5", "diviser par 5", "multiplier par 5"],
    expected: ["soustraire 5"],
    comparator: "mcq_exact",
    hint: "On veut isoler x en supprimant le + 5.",
    explanation:
      "Définition : on isole x en annulant ce qui l’entoure.\n\n" +
      "Méthode : pour annuler « + 5 », on soustrait 5 des deux côtés.\n\n" +
      "Calcul : $x = 12 - 5 = 7$.\n\n" +
      "Conclusion : on soustrait 5.",
    tags: ["equation", "resolution", "qcm"],
  },
  {
    kind: "template",
    id: "equation_resoudre_simple_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "On soustrait le nombre ajouté à x.",
    tags: ["equation", "resolution", "template"],
    generate: () => {
      const x = randomInt(1, 15);
      const a = randomInt(1, 12);
      const c = x + a;
      return {
        text: `Résoudre : $x + ${a} = ${c}$`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : on isole x.\n\n" +
          `Méthode : on soustrait ${a} des deux côtés.\n\n` +
          `Calcul : $x = ${c} - ${a} = ${x}$.\n\n` +
          `Conclusion : $x = ${x}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "equation_resoudre_simple_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "On ajoute le nombre soustrait.",
    tags: ["equation", "resolution", "template"],
    generate: () => {
      const x = randomInt(2, 15);
      const a = randomInt(1, 10);
      const c = x - a;
      return {
        text: `Résoudre : $x - ${a} = ${c}$`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : on isole x.\n\n" +
          `Méthode : on ajoute ${a} des deux côtés.\n\n` +
          `Calcul : $x = ${c} + ${a} = ${x}$.\n\n` +
          `Conclusion : $x = ${x}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "equation_resoudre_simple_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "On divise par le coefficient de x.",
    tags: ["equation", "resolution", "template"],
    generate: () => {
      const x = randomInt(2, 12);
      const a = randomInt(2, 9);
      const b = a * x;
      return {
        text: `Résoudre : $${a}x = ${b}$`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : on isole x en divisant.\n\n" +
          `Méthode : on divise par ${a}.\n\n` +
          `Calcul : $x = ${b} \\div ${a} = ${x}$.\n\n` +
          `Conclusion : $x = ${x}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "equation_resoudre_simple_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment résoudre $x + 4 = 9$.",
    format: "open",
    expected: ["soustraire", "4", "5"],
    comparator: "contains_keyword",
    hint: "On annule le + 4.",
    explanation:
      "Définition : on isole x en gardant l’égalité équilibrée.\n\n" +
      "Méthode : on soustrait 4 des deux côtés.\n\n" +
      "Calcul : $x = 9 - 4 = 5$.\n\n" +
      "Conclusion : $x = 5$.",
    tags: ["equation", "resolution", "open"],
  },

  // ---------- EQUATION_RESOUDRE_REDUCTION ----------
  {
    kind: "fixed",
    id: "equation_resoudre_reduction_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 2,
    theme: "neutral",
    text: "Résoudre : $5x - 2x = 9$",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Réduis $5x - 2x$ d’abord.",
    explanation:
      "Définition : on réduit les termes en x avant de résoudre.\n\n" +
      "Méthode : $5x - 2x = 3x$.\n\n" +
      "Calcul : $3x = 9$ donc $x = 3$.\n\n" +
      "Conclusion : $x = 3$.",
    tags: ["equation", "reduction"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_reduction_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 2,
    theme: "neutral",
    text: "Réduire l’expression $4x + 2x$ donne…",
    format: "qcm",
    choices: ["$6x$", "$8x$", "$6$", "$2x$"],
    expected: ["$6x$"],
    comparator: "mcq_exact",
    hint: "On additionne les coefficients.",
    explanation:
      "Définition : on additionne les coefficients des termes semblables.\n\n" +
      "Méthode : $4 + 2 = 6$.\n\n" +
      "Calcul : $4x + 2x = 6x$.\n\n" +
      "Conclusion : la forme réduite est $6x$.",
    tags: ["equation", "reduction", "qcm"],
  },
  {
    kind: "template",
    id: "equation_resoudre_reduction_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les termes en x, puis divise.",
    tags: ["equation", "reduction", "template"],
    generate: () => {
      const x = randomInt(1, 9);
      const a = randomInt(2, 6);
      const b = randomInt(1, 5);
      const coeff = a + b;
      const total = coeff * x;
      return {
        text: `Résoudre : $${a}x + ${b}x = ${total}$`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : on réduit avant de résoudre.\n\n" +
          `Méthode : $${a}x + ${b}x = ${coeff}x$.\n\n` +
          `Calcul : $${coeff}x = ${total}$ donc $x = ${x}$.\n\n` +
          `Conclusion : $x = ${x}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "equation_resoudre_reduction_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 3,
    theme: "neutral",
    hint: "Soustrais les termes en x, puis divise.",
    tags: ["equation", "reduction", "soustraction", "template"],
    generate: () => {
      const x = randomInt(1, 9);
      const b = randomInt(1, 4);
      const a = b + randomInt(1, 5);
      const coeff = a - b;
      const total = coeff * x;
      return {
        text: `Résoudre : $${a}x - ${b}x = ${total}$`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : on réduit avant de résoudre.\n\n" +
          `Méthode : $${a}x - ${b}x = ${coeff}x$.\n\n` +
          `Calcul : $${coeff}x = ${total}$ donc $x = ${x}$.\n\n` +
          `Conclusion : $x = ${x}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "equation_resoudre_reduction_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 3,
    theme: "neutral",
    hint: "Réduis les termes en x, puis isole x avec la constante.",
    tags: ["equation", "reduction", "constante", "template"],
    generate: () => {
      const x = randomInt(1, 8);
      const a = randomInt(2, 4);
      const b = randomInt(1, 3);
      const c = randomInt(1, 6);
      const coeff = a + b;
      const total = coeff * x + c;
      return {
        text: `Résoudre : $${a}x + ${b}x + ${c} = ${total}$`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : on réduit, puis on isole x.\n\n" +
          `Méthode : $${a}x + ${b}x = ${coeff}x$, puis on soustrait ${c}.\n\n` +
          `Calcul : $${coeff}x = ${total} - ${c} = ${coeff * x}$ donc $x = ${x}$.\n\n` +
          `Conclusion : $x = ${x}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "equation_resoudre_reduction_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_reduction",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi il faut réduire avant de résoudre $2x + 4x = 18$.",
    format: "open",
    expected: ["6x", "réduire", "3"],
    comparator: "contains_keyword",
    hint: "Regroupe les termes en x.",
    explanation:
      "Définition : on regroupe les termes semblables avant de résoudre.\n\n" +
      "Méthode : $2x + 4x = 6x$.\n\n" +
      "Calcul : $6x = 18$ donc $x = 3$.\n\n" +
      "Conclusion : réduire simplifie l’équation pour isoler x.",
    tags: ["equation", "reduction", "open"],
  },

  // ---------- EQUATION_RESOUDRE_DISTRIBUTIVITE ----------
  {
    kind: "fixed",
    id: "equation_resoudre_litteral_distributivite_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Résoudre : $2(x + 5) = 16$",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Divise par 2, puis isole x.",
    explanation:
      "Définition : on supprime la parenthèse en divisant ou en développant.\n\n" +
      "Méthode : on divise par 2.\n\n" +
      "Calcul : $x + 5 = 8$ donc $x = 3$.\n\n" +
      "Conclusion : $x = 3$.",
    tags: ["equation", "litteral_distributivite"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_litteral_distributivite_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Résoudre : $4(x - 2) = 12$",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Divise par 4 d’abord.",
    explanation:
      "Définition : on isole la parenthèse en divisant.\n\n" +
      "Méthode : on divise par 4.\n\n" +
      "Calcul : $x - 2 = 3$ donc $x = 5$.\n\n" +
      "Conclusion : $x = 5$.",
    tags: ["equation", "litteral_distributivite"],
  },
  {
    kind: "fixed",
    id: "equation_resoudre_litteral_distributivite_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Pour résoudre $3(x + 2) = 15$, quelle première étape est la plus simple ?",
    format: "qcm",
    choices: ["diviser les deux côtés par 3", "ajouter 3", "multiplier par 2", "soustraire x"],
    expected: ["diviser les deux côtés par 3"],
    comparator: "mcq_exact",
    hint: "Le 3 multiplie toute la parenthèse.",
    explanation:
      "Définition : on peut isoler la parenthèse en divisant.\n\n" +
      "Méthode : on divise les deux côtés par 3.\n\n" +
      "Calcul : $x + 2 = 5$ donc $x = 3$.\n\n" +
      "Conclusion : la première étape est de diviser par 3.",
    tags: ["equation", "litteral_distributivite", "qcm"],
  },
  {
    kind: "template",
    id: "equation_resoudre_litteral_distributivite_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 4,
    theme: "neutral",
    hint: "Isole la parenthèse en divisant, puis isole x.",
    tags: ["equation", "litteral_distributivite", "template"],
    generate: () => {
      const x = randomInt(2, 9);
      const a = randomInt(2, 5);
      const b = randomInt(1, 6);
      const rhs = a * (x - b);
      return {
        text: `Résoudre : $${a}(x - ${b}) = ${rhs}$`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : on isole la parenthèse en divisant.\n\n" +
          `Méthode : on divise par ${a}.\n\n` +
          `Calcul : $x - ${b} = ${rhs / a}$ donc $x = ${x}$.\n\n` +
          `Conclusion : $x = ${x}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "equation_resoudre_litteral_distributivite_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 4,
    theme: "neutral",
    hint: "Divise par le coefficient, puis isole x.",
    tags: ["equation", "litteral_distributivite", "template"],
    generate: () => {
      const x = randomInt(1, 9);
      const a = randomInt(2, 6);
      const b = randomInt(1, 7);
      const rhs = a * (x + b);
      return {
        text: `Résoudre : $${a}(x + ${b}) = ${rhs}$`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : on isole la parenthèse en divisant.\n\n" +
          `Méthode : on divise par ${a}.\n\n` +
          `Calcul : $x + ${b} = ${rhs / a}$ donc $x = ${x}$.\n\n` +
          `Conclusion : $x = ${x}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "equation_resoudre_litteral_distributivite_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe d’abord, puis résous.",
    tags: ["equation", "litteral_distributivite", "developper", "template"],
    generate: () => {
      const x = randomInt(1, 8);
      const a = randomInt(2, 4);
      const b = randomInt(1, 5);
      const rhs = a * x + a * b;
      return {
        text: `Développer puis résoudre : $${a}(x + ${b}) = ${rhs}$`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : on peut développer avant de résoudre.\n\n" +
          `Méthode : $${a}(x + ${b}) = ${a}x + ${a * b}$.\n\n` +
          `Calcul : $${a}x + ${a * b} = ${rhs}$ donc $${a}x = ${a * x}$ et $x = ${x}$.\n\n` +
          `Conclusion : $x = ${x}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "equation_resoudre_litteral_distributivite_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_resoudre_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Explique deux façons de commencer la résolution de $2(x + 3) = 14$.",
    format: "open",
    expected: ["diviser", "développer", "4"],
    comparator: "contains_keyword",
    hint: "On peut diviser par 2 ou développer.",
    explanation:
      "Définition : on peut isoler la parenthèse ou la développer.\n\n" +
      "Méthode : soit on divise par 2 ($x + 3 = 7$), soit on développe ($2x + 6 = 14$).\n\n" +
      "Calcul : dans les deux cas, $x = 4$.\n\n" +
      "Conclusion : diviser par 2 ou développer mènent à la même solution.",
    tags: ["equation", "litteral_distributivite", "open"],
  },

  // ---------- EQUATION_VERIFIER ----------
  {
    kind: "fixed",
    id: "equation_verifier_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 5 est-il solution de l’équation $2x = 10$ ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Calcule $2 \\times 5$.",
    explanation:
      "Définition : une solution rend l’égalité vraie.\n\n" +
      "Méthode : on remplace x par 5.\n\n" +
      "Calcul : $2 \\times 5 = 10$.\n\n" +
      "Conclusion : oui, 5 est solution.",
    tags: ["equation", "verification", "qcm"],
  },
  {
    kind: "fixed",
    id: "equation_verifier_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 3 est-il solution de l’équation $x + 4 = 8$ ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule $3 + 4$.",
    explanation:
      "Définition : une solution rend l’égalité vraie.\n\n" +
      "Méthode : on remplace x par 3.\n\n" +
      "Calcul : $3 + 4 = 7$, pas 8.\n\n" +
      "Conclusion : non, 3 n’est pas solution (la solution est 4).",
    tags: ["equation", "verification", "qcm"],
  },
  {
    kind: "fixed",
    id: "equation_verifier_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 0 est-il solution de l’équation $3x = 0$ ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Calcule $3 \\times 0$.",
    explanation:
      "Définition : une solution rend l’égalité vraie.\n\n" +
      "Méthode : on remplace x par 0.\n\n" +
      "Calcul : $3 \\times 0 = 0$.\n\n" +
      "Conclusion : oui, 0 est solution.",
    tags: ["equation", "verification", "qcm"],
  },
  {
    kind: "template",
    id: "equation_verifier_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace x par la valeur proposée.",
    tags: ["equation", "verification", "template"],
    generate: () => {
      const x = randomInt(1, 12);
      const a = randomInt(1, 10);
      const c = x + a;
      const isSolution = randomChoice([true, false]);
      const candidate = isSolution ? x : x + randomChoice([1, 2]);
      return {
        text: `Le nombre ${candidate} est-il solution de $x + ${a} = ${c}$ ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [isSolution ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une solution rend l’égalité vraie.\n\n" +
          `Méthode : on remplace x par ${candidate}.\n\n` +
          `Calcul : ${candidate} + ${a} = ${candidate + a}. ${isSolution ? "Cela donne bien" : "Cela ne donne pas"} ${c}.\n\n` +
          `Conclusion : ${isSolution ? "oui" : "non"}.`,
      };
    },
  },
  {
    kind: "template",
    id: "equation_verifier_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace x puis calcule le premier membre.",
    tags: ["equation", "verification", "template"],
    generate: () => {
      const x = randomInt(1, 8);
      const a = randomInt(2, 5);
      const b = randomInt(1, 6);
      const c = a * x + b;
      const isSolution = randomChoice([true, false]);
      const candidate = isSolution ? x : x + 1;
      return {
        text: `Le nombre ${candidate} est-il solution de $${a}x + ${b} = ${c}$ ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [isSolution ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une solution rend l’égalité vraie.\n\n" +
          `Méthode : on remplace x par ${candidate}.\n\n` +
          `Calcul : $${a} \\times ${candidate} + ${b} = ${a * candidate + b}$. ${isSolution ? "Cela donne bien" : "Cela ne donne pas"} ${c}.\n\n` +
          `Conclusion : ${isSolution ? "oui" : "non"}.`,
      };
    },
  },
  {
    kind: "template",
    id: "equation_verifier_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace x dans la parenthèse.",
    tags: ["equation", "verification", "litteral_distributivite", "template"],
    generate: () => {
      const x = randomInt(1, 7);
      const a = randomInt(2, 4);
      const b = randomInt(1, 5);
      const c = a * (x + b);
      const isSolution = randomChoice([true, false]);
      const candidate = isSolution ? x : x + 1;
      return {
        text: `Le nombre ${candidate} est-il solution de $${a}(x + ${b}) = ${c}$ ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [isSolution ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une solution rend l’égalité vraie.\n\n" +
          `Méthode : on remplace x par ${candidate}.\n\n` +
          `Calcul : $${a}(${candidate} + ${b}) = ${a * (candidate + b)}$. ${isSolution ? "Cela donne bien" : "Cela ne donne pas"} ${c}.\n\n` +
          `Conclusion : ${isSolution ? "oui" : "non"}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "equation_verifier_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment vérifier que 4 est solution de $2x + 1 = 9$.",
    format: "open",
    expected: ["remplace", "4", "9"],
    comparator: "contains_keyword",
    hint: "Remplace x par 4 dans le premier membre.",
    explanation:
      "Définition : une solution rend l’égalité vraie.\n\n" +
      "Méthode : on remplace x par 4.\n\n" +
      "Calcul : $2 \\times 4 + 1 = 9$.\n\n" +
      "Conclusion : l’égalité est vérifiée, donc 4 est solution.",
    tags: ["equation", "verification", "open"],
  },

  // ---------- EQUATION_PROBLEME ----------
  {
    kind: "fixed",
    id: "equation_probleme_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Le triple d’un nombre augmenté de 2 vaut 17. Quel est ce nombre ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Pose $3x + 2 = 17$.",
    explanation:
      "Définition : on traduit l’énoncé par une équation.\n\n" +
      "Méthode : on pose $3x + 2 = 17$.\n\n" +
      "Calcul : $3x = 15$ donc $x = 5$.\n\n" +
      "Conclusion : le nombre est 5.",
    tags: ["equation", "probleme"],
  },
  {
    kind: "fixed",
    id: "equation_probleme_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle a une longueur double de sa largeur. Son périmètre est 30 cm. Quelle est sa largeur (en cm) ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Largeur x, longueur 2x : périmètre $2(x + 2x) = 30$.",
    explanation:
      "Définition : on modélise le périmètre par une équation.\n\n" +
      "Méthode : largeur x, longueur 2x, périmètre $2(x + 2x) = 6x$.\n\n" +
      "Calcul : $6x = 30$ donc $x = 5$.\n\n" +
      "Conclusion : la largeur est 5 cm.",
    tags: ["equation", "probleme", "geometrie"],
  },
  {
    kind: "template",
    id: "equation_probleme_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Pose une équation avec une soustraction.",
    tags: ["equation", "probleme", "template"],
    generate: () => {
      const x = randomInt(8, 20);
      const b = randomInt(2, 7);
      const reste = x - b;
      return {
        text: `J’ai pensé à un nombre. Si j’enlève ${b}, j’obtiens ${reste}. Quel est ce nombre ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : on traduit l’énoncé par une équation.\n\n" +
          `Méthode : on pose $x - ${b} = ${reste}$.\n\n` +
          `Calcul : $x = ${reste} + ${b} = ${x}$.\n\n` +
          `Conclusion : le nombre est ${x}.`,
      };
    },
  },
  {
    kind: "template",
    id: "equation_probleme_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Pose une équation produit.",
    tags: ["equation", "probleme", "achat", "template"],
    generate: () => {
      const x = randomInt(4, 12);
      const prix = randomInt(2, 6);
      const total = x * prix;
      return {
        text: `Des cahiers coûtent ${prix} € l’unité. On paie ${total} € au total. Combien de cahiers a-t-on achetés ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : on traduit la situation par une équation.\n\n" +
          `Méthode : on pose $${prix}x = ${total}$.\n\n` +
          `Calcul : $x = ${total} \\div ${prix} = ${x}$.\n\n` +
          `Conclusion : on a acheté ${x} cahiers.`,
      };
    },
  },
  {
    kind: "template",
    id: "equation_probleme_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Pose une équation du type $ax + b = c$.",
    tags: ["equation", "probleme", "template"],
    generate: () => {
      const x = randomInt(3, 10);
      const a = randomInt(2, 5);
      const b = randomInt(2, 8);
      const total = a * x + b;
      return {
        text: `Un taxi facture ${b} € de prise en charge puis ${a} € par kilomètre. Pour une course de x km, on paie ${total} €. Combien de kilomètres a-t-on parcourus ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : on modélise le prix par une équation.\n\n" +
          `Méthode : on pose $${a}x + ${b} = ${total}$.\n\n` +
          `Calcul : $${a}x = ${total} - ${b} = ${a * x}$ donc $x = ${x}$.\n\n` +
          `Conclusion : la course fait ${x} km.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "equation_probleme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment mettre en équation : « le double d’un nombre augmenté de 5 vaut 17 ».",
    format: "open",
    expected: ["2x", "5", "17"],
    comparator: "contains_keyword",
    hint: "Choisis x pour le nombre inconnu.",
    explanation:
      "Définition : on choisit une inconnue et on traduit la phrase.\n\n" +
      "Méthode : x est le nombre ; « le double » donne $2x$, « augmenté de 5 » donne $+ 5$, « vaut 17 » donne $= 17$.\n\n" +
      "Calcul : on obtient $2x + 5 = 17$, donc $x = 6$.\n\n" +
      "Conclusion : l’équation est $2x + 5 = 17$.",
    tags: ["equation", "probleme", "open"],
  },

  // ---------- EQUATION_DEFIS ----------
  {
    kind: "fixed",
    id: "equation_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Résoudre : $4x - 3 = 2x + 7$",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Regroupe les x d’un côté.",
    explanation:
      "Définition : on regroupe les x d’un côté et les nombres de l’autre.\n\n" +
      "Méthode : on soustrait $2x$ des deux côtés.\n\n" +
      "Calcul : $2x - 3 = 7$ donc $2x = 10$ et $x = 5$.\n\n" +
      "Conclusion : $x = 5$.",
    tags: ["equation", "defi", "avance"],
  },
  {
    kind: "fixed",
    id: "equation_defi_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Résoudre : $3(x - 1) = 2x + 4$",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Développe d’abord le membre de gauche.",
    explanation:
      "Définition : on développe puis on regroupe.\n\n" +
      "Méthode : $3(x - 1) = 3x - 3$.\n\n" +
      "Calcul : $3x - 3 = 2x + 4$ donc $x = 7$.\n\n" +
      "Conclusion : $x = 7$.",
    tags: ["equation", "defi", "avance"],
  },
  {
    kind: "template",
    id: "equation_defi_tpl_deux_membres_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Mets les x d’un côté, les nombres de l’autre.",
    tags: ["equation", "defi", "deux_membres", "template"],
    generate: () => {
      const x = randomInt(2, 9);
      const a = randomInt(3, 6);
      const c = randomInt(1, a - 1);
      const b = randomInt(1, 6);
      // a x + b = c x + d  with solution x
      const d = (a - c) * x + b;
      return {
        text: `Résoudre : $${a}x + ${b} = ${c}x + ${d}$`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : on regroupe les x d’un côté et les nombres de l’autre.\n\n" +
          `Méthode : on soustrait $${c}x$ des deux côtés.\n\n` +
          `Calcul : $${a - c}x + ${b} = ${d}$ donc $${a - c}x = ${d - b}$ et $x = ${x}$.\n\n` +
          `Conclusion : $x = ${x}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "equation_defi_open_balance_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on fait la même opération des deux côtés d’une équation.",
    format: "open",
    expected: ["égalité", "deux côtés", "équilibre"],
    comparator: "contains_keyword",
    hint: "Pense à une balance.",
    explanation:
      "Définition : une équation est une égalité, comme une balance équilibrée.\n\n" +
      "Méthode : pour garder l’égalité vraie, on fait la même opération des deux côtés.\n\n" +
      "Calcul : ajouter ou retirer la même chose des deux côtés conserve l’équilibre.\n\n" +
      "Conclusion : on agit identiquement des deux côtés pour préserver l’égalité.",
    tags: ["equation", "defi", "open"],
  },
  {
    kind: "fixed",
    id: "equation_defi_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "equation_resolution",
    microId: "equation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Pour quelle équation x = 0 est-il solution ?",
    format: "qcm",
    choices: ["$5x = 0$", "$x + 1 = 0$", "$2x = 4$", "$x - 3 = 0$"],
    expected: ["$5x = 0$"],
    comparator: "mcq_exact",
    hint: "Teste x = 0 dans chaque équation.",
    explanation:
      "Définition : une solution rend l’égalité vraie.\n\n" +
      "Méthode : on remplace x par 0 dans chaque équation.\n\n" +
      "Calcul : $5 \\times 0 = 0$ : vrai ; les autres ne sont pas vérifiées.\n\n" +
      "Conclusion : x = 0 est solution de $5x = 0$.",
    tags: ["equation", "defi", "qcm"],
  },
];