// lib/tutor-v4/question-banks/maths/terminale-spe/limites-fonctions.bank.ts

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

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const limitesFonctionsBank: TutorBankItemV4[] = [
  /* =========================
     LIMITE_FONCTION_REFERENCE
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_reference_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_reference",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la limite de 1/x quand x tend vers +∞ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Quand x devient très grand, 1/x devient très petit.",
    explanation: exp(
      "La fonction 1/x est une fonction de référence.",
      "On utilise la limite classique de 1/x en +∞.",
      "Lorsque x devient très grand, 1/x se rapproche de 0.",
      "La limite est 0."
    ),
    tags: ["terminale-spe", "limite_fonction", "reference", "inverse"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_reference_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_reference",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la limite de x² quand x tend vers +∞ ?",
    format: "qcm",
    choices: ["0", "1", "+∞", "-∞"],
    expected: ["+∞"],
    comparator: "mcq_exact",
    hint: "x² devient très grand quand x devient très grand.",
    explanation: exp(
      "La fonction x² est une fonction de référence.",
      "On regarde le comportement de x² quand x augmente sans limite.",
      "Plus x est grand, plus x² est grand.",
      "La limite est +∞."
    ),
    tags: ["terminale-spe", "limite_fonction", "reference", "carre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_reference_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_reference",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la limite de x³ quand x tend vers -∞ ?",
    format: "qcm",
    choices: ["+∞", "-∞", "0", "1"],
    expected: ["-∞"],
    comparator: "mcq_exact",
    hint: "Une puissance impaire garde le signe de x.",
    explanation: exp(
      "La fonction x³ est une fonction de référence.",
      "Pour une puissance impaire, le signe de x est conservé.",
      "Quand x tend vers -∞, x³ tend aussi vers -∞.",
      "La limite est -∞."
    ),
    tags: ["terminale-spe", "limite_fonction", "reference", "cube", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_reference_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_reference",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la limite de √x quand x tend vers +∞ ?",
    format: "qcm",
    choices: ["0", "1", "+∞", "n’existe pas"],
    expected: ["+∞"],
    comparator: "mcq_exact",
    hint: "La racine carrée augmente sans limite, mais lentement.",
    explanation: exp(
      "La fonction racine carrée est définie sur les réels positifs.",
      "On étudie son comportement quand x devient très grand.",
      "Quand x augmente sans limite, √x augmente aussi sans limite.",
      "La limite est +∞."
    ),
    tags: ["terminale-spe", "limite_fonction", "reference", "racine", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_reference_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_reference",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la limite de 1/x² quand x tend vers +∞ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "x² devient très grand, donc son inverse devient très petit.",
    explanation: exp(
      "La fonction 1/x² est une fonction de référence construite avec un inverse.",
      "On observe que x² tend vers +∞ quand x tend vers +∞.",
      "Donc 1/x² se rapproche de 0.",
      "La limite est 0."
    ),
    tags: ["terminale-spe", "limite_fonction", "reference", "inverse"],
  },

  {
    kind: "template",
    id: "terminale_spe_limite_fonction_reference_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_reference",
    difficulty: 2,
    theme: "neutral",
    hint: "Quand x tend vers +∞, 1/xᵏ tend vers 0 pour k > 0.",
    tags: ["terminale-spe", "limite_fonction", "reference", "template"],
    generate: () => {
      const k = randomChoice([1, 2, 3, 4]);

      return {
        text: `Quelle est la limite de 1/x^${k} quand x tend vers +∞ ?`,
        format: "short",
        expected: ["0"],
        comparator: "number_equal",
        explanation: exp(
          "Pour tout entier k strictement positif, x^k tend vers +∞ quand x tend vers +∞.",
          "L’inverse d’une quantité qui tend vers +∞ tend vers 0.",
          `Ici, x^${k} tend vers +∞, donc 1/x^${k} tend vers 0.`,
          "La limite est 0."
        ),
      };
    },
  },

  /* =========================
     LIMITE_FONCTION_OPERATIONS
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_operations_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_operations",
    difficulty: 2,
    theme: "neutral",
    text: "Si f(x) tend vers 2 et g(x) tend vers 5, quelle est la limite de f(x) + g(x) ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La limite d’une somme est la somme des limites quand elles sont finies.",
    explanation: exp(
      "Quand deux fonctions ont des limites finies, la limite de la somme est la somme des limites.",
      "On additionne les deux limites.",
      "2 + 5 = 7.",
      "La limite de f(x) + g(x) est 7."
    ),
    tags: ["terminale-spe", "limite_fonction", "operations", "somme"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_operations_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_operations",
    difficulty: 2,
    theme: "neutral",
    text: "Si f(x) tend vers 3 et g(x) tend vers 4, quelle est la limite de f(x) × g(x) ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "La limite d’un produit est le produit des limites quand elles sont finies.",
    explanation: exp(
      "Quand deux fonctions ont des limites finies, la limite du produit est le produit des limites.",
      "On multiplie les deux limites.",
      "3 × 4 = 12.",
      "La limite de f(x) × g(x) est 12."
    ),
    tags: ["terminale-spe", "limite_fonction", "operations", "produit"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_operations_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_operations",
    difficulty: 2,
    theme: "neutral",
    text: "Si f(x) tend vers 10 et g(x) tend vers 2, quelle est la limite de f(x) / g(x) ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "On peut diviser les limites si la limite du dénominateur n’est pas 0.",
    explanation: exp(
      "Quand le dénominateur tend vers un nombre non nul, la limite du quotient est le quotient des limites.",
      "On divise les deux limites.",
      "10 / 2 = 5.",
      "La limite de f(x) / g(x) est 5."
    ),
    tags: ["terminale-spe", "limite_fonction", "operations", "quotient"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_operations_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_operations",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la limite de f(x) = 3 + 2/x quand x tend vers +∞ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "2/x tend vers 0.",
    explanation: exp(
      "On utilise les opérations sur les limites.",
      "On sépare la constante et la partie qui tend vers 0.",
      "2/x tend vers 0, donc 3 + 2/x tend vers 3 + 0 = 3.",
      "La limite est 3."
    ),
    tags: ["terminale-spe", "limite_fonction", "operations"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_operations_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_operations",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la limite de f(x) = (2x + 1) / x quand x tend vers +∞ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Divise chaque terme du numérateur par x.",
    explanation: exp(
      "Pour une fraction rationnelle simple, on peut diviser chaque terme par x.",
      "On écrit (2x + 1)/x = 2 + 1/x.",
      "Comme 1/x tend vers 0, 2 + 1/x tend vers 2.",
      "La limite est 2."
    ),
    tags: ["terminale-spe", "limite_fonction", "operations", "quotient"],
  },

  {
    kind: "template",
    id: "terminale_spe_limite_fonction_operations_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_operations",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les limites.",
    tags: ["terminale-spe", "limite_fonction", "operations", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      const b = randomInt(1, 9);

      return {
        text: `Si f(x) tend vers ${a} et g(x) tend vers ${b}, quelle est la limite de f(x) + g(x) ?`,
        format: "short",
        expected: [String(a + b)],
        comparator: "number_equal",
        explanation: exp(
          "La limite d’une somme de fonctions convergentes est la somme des limites.",
          "On additionne les limites.",
          `${a} + ${b} = ${a + b}.`,
          `La limite est ${a + b}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_limite_fonction_operations_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_operations",
    difficulty: 3,
    theme: "neutral",
    hint: "Transforme l’expression en a + b/x.",
    tags: ["terminale-spe", "limite_fonction", "quotient", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(1, 9);

      return {
        text: `Quelle est la limite de f(x) = (${a}x + ${b}) / x quand x tend vers +∞ ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: exp(
          "On simplifie une expression rationnelle en divisant chaque terme par x.",
          `On écrit (${a}x + ${b}) / x = ${a} + ${b}/x.`,
          `${b}/x tend vers 0, donc ${a} + ${b}/x tend vers ${a}.`,
          `La limite est ${a}.`
        ),
      };
    },
  },

  /* =========================
     LIMITE_FONCTION_INFINI
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_infini_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_infini",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la limite de f(x) = 2x + 3 quand x tend vers +∞ ?",
    format: "qcm",
    choices: ["0", "3", "+∞", "-∞"],
    expected: ["+∞"],
    comparator: "mcq_exact",
    hint: "Le terme dominant est 2x.",
    explanation: exp(
      "Pour une fonction affine ax + b, le comportement en l’infini dépend du terme ax.",
      "On regarde le terme dominant lorsque x devient très grand.",
      "2x tend vers +∞ quand x tend vers +∞.",
      "La limite est +∞."
    ),
    tags: ["terminale-spe", "limite_fonction", "infini", "affine", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_infini_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_infini",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la limite de f(x) = -3x + 1 quand x tend vers +∞ ?",
    format: "qcm",
    choices: ["+∞", "-∞", "0", "1"],
    expected: ["-∞"],
    comparator: "mcq_exact",
    hint: "Le coefficient directeur est négatif.",
    explanation: exp(
      "Pour une fonction affine ax + b, le terme ax domine en l’infini.",
      "On regarde le signe du coefficient de x.",
      "-3x tend vers -∞ quand x tend vers +∞.",
      "La limite est -∞."
    ),
    tags: ["terminale-spe", "limite_fonction", "infini", "affine", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_infini_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_infini",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la limite de f(x) = x² - 5x + 1 quand x tend vers +∞ ?",
    format: "qcm",
    choices: ["+∞", "-∞", "0", "1"],
    expected: ["+∞"],
    comparator: "mcq_exact",
    hint: "Le terme dominant est x².",
    explanation: exp(
      "Pour un polynôme, la limite en l’infini est donnée par le terme de plus haut degré.",
      "On repère le terme dominant.",
      "Le terme dominant est x², qui tend vers +∞ quand x tend vers +∞.",
      "La limite est +∞."
    ),
    tags: ["terminale-spe", "limite_fonction", "infini", "polynome", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_infini_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_infini",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la limite de f(x) = -2x² + 7x - 4 quand x tend vers +∞ ?",
    format: "qcm",
    choices: ["+∞", "-∞", "0", "7"],
    expected: ["-∞"],
    comparator: "mcq_exact",
    hint: "Le terme dominant est -2x².",
    explanation: exp(
      "Pour un polynôme, le terme de plus haut degré domine en l’infini.",
      "On repère le terme de plus haut degré et son signe.",
      "Le terme dominant est -2x². Comme x² tend vers +∞, -2x² tend vers -∞.",
      "La limite est -∞."
    ),
    tags: ["terminale-spe", "limite_fonction", "infini", "polynome", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_infini_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_infini",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la limite de f(x) = (3x² + 1) / x² quand x tend vers +∞ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Divise numérateur et dénominateur par x².",
    explanation: exp(
      "Pour une fraction rationnelle, on compare les termes dominants.",
      "On divise par x² au numérateur et au dénominateur.",
      "(3x² + 1)/x² = 3 + 1/x². Comme 1/x² tend vers 0, la limite est 3.",
      "La limite est 3."
    ),
    tags: ["terminale-spe", "limite_fonction", "infini", "quotient"],
  },

  {
    kind: "template",
    id: "terminale_spe_limite_fonction_infini_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_infini",
    difficulty: 3,
    theme: "neutral",
    hint: "Le terme dominant est ax².",
    tags: ["terminale-spe", "limite_fonction", "infini", "polynome", "template"],
    generate: () => {
      const a = randomChoice([-5, -4, -3, -2, 2, 3, 4, 5]);
      const b = randomInt(-8, 8);
      const c = randomInt(-8, 8);
      const result = a > 0 ? "+∞" : "-∞";

      return {
        text: `Quelle est la limite de f(x) = ${a}x² + ${b}x + ${c} quand x tend vers +∞ ?`,
        format: "qcm",
        choices: shuffle(["+∞", "-∞", "0", String(c)]),
        expected: [result],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour un polynôme, le terme de plus haut degré domine en l’infini.",
          "On regarde le signe du coefficient du terme dominant.",
          `Le terme dominant est ${a}x². Comme x² tend vers +∞, la limite dépend du signe de ${a}.`,
          `La limite est ${result}.`
        ),
      };
    },
  },

  /* =========================
     LIMITE_FONCTION_POINT
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_point_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_point",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la limite de f(x) = x² + 1 quand x tend vers 2 ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Pour un polynôme, on remplace x par la valeur.",
    explanation: exp(
      "Une fonction polynôme est continue sur R.",
      "Pour calculer la limite en un point, on remplace x par la valeur.",
      "2² + 1 = 4 + 1 = 5.",
      "La limite est 5."
    ),
    tags: ["terminale-spe", "limite_fonction", "point", "polynome"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_point_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_point",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la limite de f(x) = 3x - 4 quand x tend vers 5 ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Remplace x par 5.",
    explanation: exp(
      "Une fonction affine est continue sur R.",
      "La limite en un point se calcule par substitution directe.",
      "3 × 5 - 4 = 15 - 4 = 11.",
      "La limite est 11."
    ),
    tags: ["terminale-spe", "limite_fonction", "point", "affine"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_point_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_point",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la limite de f(x) = 1/(x - 2) quand x tend vers 2 par valeurs supérieures ?",
    format: "qcm",
    choices: ["+∞", "-∞", "0", "2"],
    expected: ["+∞"],
    comparator: "mcq_exact",
    hint: "Si x tend vers 2 par valeurs supérieures, alors x - 2 tend vers 0 positif.",
    explanation: exp(
      "Une limite à droite regarde le comportement de la fonction quand x approche le point par valeurs supérieures.",
      "On étudie le signe du dénominateur.",
      "Quand x tend vers 2 par valeurs supérieures, x - 2 tend vers 0 positif. Donc 1/(x - 2) tend vers +∞.",
      "La limite à droite est +∞."
    ),
    tags: ["terminale-spe", "limite_fonction", "point", "droite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_point_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_point",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la limite de f(x) = 1/(x - 2) quand x tend vers 2 par valeurs inférieures ?",
    format: "qcm",
    choices: ["+∞", "-∞", "0", "2"],
    expected: ["-∞"],
    comparator: "mcq_exact",
    hint: "Si x tend vers 2 par valeurs inférieures, alors x - 2 tend vers 0 négatif.",
    explanation: exp(
      "Une limite à gauche regarde le comportement de la fonction quand x approche le point par valeurs inférieures.",
      "On étudie le signe du dénominateur.",
      "Quand x tend vers 2 par valeurs inférieures, x - 2 tend vers 0 négatif. Donc 1/(x - 2) tend vers -∞.",
      "La limite à gauche est -∞."
    ),
    tags: ["terminale-spe", "limite_fonction", "point", "gauche", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_point_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_point",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction f(x) = 1/(x - 2) admet-elle une limite finie quand x tend vers 2 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare la limite à gauche et la limite à droite.",
    explanation: exp(
      "Pour avoir une limite finie en un point, les comportements à gauche et à droite doivent être compatibles.",
      "On compare les deux limites latérales.",
      "À droite de 2, f(x) tend vers +∞. À gauche de 2, f(x) tend vers -∞.",
      "La fonction n’admet pas de limite finie en 2."
    ),
    tags: ["terminale-spe", "limite_fonction", "point", "limites_laterales", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_limite_fonction_point_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_point",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace x par la valeur donnée.",
    tags: ["terminale-spe", "limite_fonction", "point", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = randomInt(-6, 6);
      const x0 = randomInt(1, 6);
      const result = a * x0 + b;

      return {
        text: `Quelle est la limite de f(x) = ${a}x + ${b} quand x tend vers ${x0} ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une fonction affine est continue sur R.",
          "On calcule la limite par substitution.",
          `${a} × ${x0} + ${b} = ${result}.`,
          `La limite est ${result}.`
        ),
      };
    },
  },

  /* =========================
     LIMITE_FONCTION_ASYMPTOTE
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_asymptote_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_asymptote",
    difficulty: 2,
    theme: "neutral",
    text: "Si f(x) tend vers 3 quand x tend vers +∞, quelle asymptote horizontale peut-on identifier ?",
    format: "qcm",
    choices: ["y = 3", "x = 3", "y = x", "x = 0"],
    expected: ["y = 3"],
    comparator: "mcq_exact",
    hint: "Une limite finie en l’infini donne une asymptote horizontale.",
    explanation: exp(
      "Si f(x) tend vers un réel ℓ quand x tend vers +∞ ou -∞, la courbe admet une asymptote horizontale.",
      "L’équation de l’asymptote horizontale est y = ℓ.",
      "Ici, ℓ = 3.",
      "L’asymptote horizontale est y = 3."
    ),
    tags: ["terminale-spe", "limite_fonction", "asymptote", "horizontale", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_asymptote_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_asymptote",
    difficulty: 2,
    theme: "neutral",
    text: "Si f(x) tend vers +∞ quand x tend vers 2 par valeurs supérieures, quelle asymptote verticale peut-on suspecter ?",
    format: "qcm",
    choices: ["x = 2", "y = 2", "y = +∞", "x = 0"],
    expected: ["x = 2"],
    comparator: "mcq_exact",
    hint: "Une limite infinie en un point donne une asymptote verticale.",
    explanation: exp(
      "Si f(x) tend vers +∞ ou -∞ quand x tend vers a, la courbe peut admettre une asymptote verticale.",
      "L’équation de l’asymptote verticale est x = a.",
      "Ici, a = 2.",
      "L’asymptote verticale est x = 2."
    ),
    tags: ["terminale-spe", "limite_fonction", "asymptote", "verticale", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_asymptote_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_asymptote",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction f(x) = 2 + 1/x admet quelle asymptote horizontale quand x tend vers +∞ ?",
    format: "qcm",
    choices: ["y = 2", "x = 2", "y = 1", "x = 0"],
    expected: ["y = 2"],
    comparator: "mcq_exact",
    hint: "1/x tend vers 0.",
    explanation: exp(
      "Une limite finie en l’infini donne une asymptote horizontale.",
      "On calcule la limite de la fonction en +∞.",
      "1/x tend vers 0, donc 2 + 1/x tend vers 2.",
      "L’asymptote horizontale est y = 2."
    ),
    tags: ["terminale-spe", "limite_fonction", "asymptote", "horizontale"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_asymptote_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_asymptote",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction f(x) = 1/(x - 4) admet quelle asymptote verticale ?",
    format: "qcm",
    choices: ["x = 4", "y = 4", "x = 0", "y = 0"],
    expected: ["x = 4"],
    comparator: "mcq_exact",
    hint: "Le dénominateur s’annule en x = 4.",
    explanation: exp(
      "Une asymptote verticale apparaît souvent lorsqu’un dénominateur tend vers 0 et que la fonction tend vers l’infini.",
      "On cherche où le dénominateur s’annule.",
      "x - 4 = 0 pour x = 4.",
      "L’asymptote verticale est x = 4."
    ),
    tags: ["terminale-spe", "limite_fonction", "asymptote", "verticale"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_asymptote_open_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_asymptote",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre une asymptote horizontale et une asymptote verticale.",
    format: "open",
    expected: ["horizontale", "verticale", "y", "x", "limite"],
    comparator: "contains_keyword",
    hint: "L’une a une équation de type y = ℓ, l’autre de type x = a.",
    explanation: exp(
      "Une asymptote décrit une droite dont la courbe se rapproche.",
      "On distingue les limites en l’infini et les limites infinies en un point.",
      "Une asymptote horizontale a une équation y = ℓ. Une asymptote verticale a une équation x = a.",
      "L’asymptote horizontale vient d’une limite finie en l’infini ; l’asymptote verticale vient d’une limite infinie en un point."
    ),
    tags: ["terminale-spe", "limite_fonction", "asymptote", "open"],
  },

  {
    kind: "template",
    id: "terminale_spe_limite_fonction_asymptote_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_asymptote",
    difficulty: 3,
    theme: "neutral",
    hint: "Si f(x) tend vers ℓ en +∞, l’asymptote horizontale est y = ℓ.",
    tags: ["terminale-spe", "limite_fonction", "asymptote", "template"],
    generate: () => {
      const l = randomInt(-5, 8);

      return {
        text: `Si f(x) tend vers ${l} quand x tend vers +∞, quelle est l’asymptote horizontale ?`,
        format: "qcm",
        choices: shuffle([`y = ${l}`, `x = ${l}`, "y = x", "x = 0"]),
        expected: [`y = ${l}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une limite finie en l’infini donne une asymptote horizontale.",
          "L’équation est y = ℓ.",
          `Ici, ℓ = ${l}.`,
          `L’asymptote horizontale est y = ${l}.`
        ),
      };
    },
  },

  /* =========================
     LIMITE_FONCTION_DEFIS - TYPE BAC
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la limite de f(x) = (2x² - 3x + 1) / x² quand x tend vers +∞ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Divise le numérateur et le dénominateur par x².",
    explanation: exp(
      "Pour une fraction rationnelle, on compare les termes dominants ou on divise par la plus grande puissance de x.",
      "On divise le numérateur et le dénominateur par x².",
      "(2x² - 3x + 1)/x² = 2 - 3/x + 1/x². Les termes -3/x et 1/x² tendent vers 0.",
      "La limite est 2."
    ),
    tags: ["terminale-spe", "limite_fonction", "type_bac", "quotient"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la limite de f(x) = (x² + 1) / x quand x tend vers +∞ ?",
    format: "qcm",
    choices: ["0", "1", "+∞", "-∞"],
    expected: ["+∞"],
    comparator: "mcq_exact",
    hint: "Simplifie : (x² + 1)/x = x + 1/x.",
    explanation: exp(
      "Pour étudier une fraction rationnelle, on simplifie ou on compare les degrés.",
      "Le numérateur est de degré 2 et le dénominateur de degré 1.",
      "(x² + 1)/x = x + 1/x. Quand x tend vers +∞, x tend vers +∞ et 1/x tend vers 0.",
      "La limite est +∞."
    ),
    tags: ["terminale-spe", "limite_fonction", "type_bac", "quotient", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "La courbe de f(x) = 3 + 2/x admet-elle une asymptote horizontale en +∞ ?",
    format: "qcm",
    choices: ["oui, y = 3", "oui, x = 3", "non", "oui, y = 2"],
    expected: ["oui, y = 3"],
    comparator: "mcq_exact",
    hint: "2/x tend vers 0.",
    explanation: exp(
      "Une limite finie en +∞ donne une asymptote horizontale.",
      "On calcule la limite de f(x) en +∞.",
      "2/x tend vers 0, donc 3 + 2/x tend vers 3.",
      "La courbe admet l’asymptote horizontale y = 3."
    ),
    tags: ["terminale-spe", "limite_fonction", "asymptote", "type_bac"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "La fonction f(x) = 1/(x - 1) admet-elle une limite en 1 ?",
    format: "qcm",
    choices: [
      "oui, la limite vaut 0",
      "oui, la limite vaut 1",
      "non, les limites à gauche et à droite sont différentes",
      "oui, la limite vaut +∞ uniquement",
    ],
    expected: ["non, les limites à gauche et à droite sont différentes"],
    comparator: "mcq_exact",
    hint: "Étudie la limite à gauche et la limite à droite de 1.",
    explanation: exp(
      "Pour qu’une limite en un point existe, les limites latérales doivent être compatibles.",
      "On étudie le signe de x - 1 à gauche et à droite de 1.",
      "À droite de 1, x - 1 est positif donc f(x) tend vers +∞. À gauche de 1, x - 1 est négatif donc f(x) tend vers -∞.",
      "La fonction n’admet pas de limite en 1."
    ),
    tags: ["terminale-spe", "limite_fonction", "limites_laterales", "type_bac"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_fonction_defi_open_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi, pour calculer une limite de fraction rationnelle en +∞, on regarde souvent les termes de plus haut degré.",
    format: "open",
    expected: ["degré", "dominant", "infini", "plus haut", "limite"],
    comparator: "contains_keyword",
    hint: "Quand x devient très grand, les termes de plus haut degré dominent les autres.",
    explanation: exp(
      "Dans un polynôme ou une fraction rationnelle, les puissances de x ne grandissent pas toutes à la même vitesse.",
      "Quand x tend vers l’infini, les termes de plus haut degré dominent les termes de degré plus faible.",
      "Par exemple, x² devient beaucoup plus grand que x et qu’une constante.",
      "C’est pourquoi on étudie les termes dominants pour calculer la limite en l’infini."
    ),
    tags: ["terminale-spe", "limite_fonction", "raisonnement", "type_bac", "open"],
  },

  {
    kind: "template",
    id: "terminale_spe_limite_fonction_defi_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_fonction",
    microId: "limite_fonction_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Divise par x².",
    tags: ["terminale-spe", "limite_fonction", "quotient", "type_bac", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5, 6]);
      const b = randomInt(-8, 8);
      const c = randomInt(-8, 8);

      return {
        text: `Quelle est la limite de f(x) = (${a}x² + ${b}x + ${c}) / x² quand x tend vers +∞ ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: exp(
          "Pour une fraction rationnelle, on divise par la plus grande puissance de x du dénominateur.",
          "On divise ici par x².",
          `(${a}x² + ${b}x + ${c}) / x² = ${a} + ${b}/x + ${c}/x². Les deux derniers termes tendent vers 0.`,
          `La limite est ${a}.`
        ),
      };
    },
  },
];