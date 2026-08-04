// Fractions (5e) — deux notions depuis le 04/08/2026 : fraction_nombre
// (reconnaître, comparer) et fraction_calcul (les quatre opérations).
// ⚠️ C'est le microId de chaque item qui fait foi, PAS le commentaire de
// section au-dessus : les items déplacés sont restés à leur place dans le
// fichier pour garder leur id, et donc l'historique des réponses des élèves.

import type {
  TutorBankItemV4,
  FractionCanvasData,
} from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const r = x % y;
    x = y;
    y = r;
  }
  return x || 1;
}

function simplifyFraction(n: number, d: number) {
  const sign = d < 0 ? -1 : 1;
  const nn = n * sign;
  const dd = Math.abs(d);
  const g = gcd(nn, dd);
  return { n: nn / g, d: dd / g };
}

function fractionStr(n: number, d: number) {
  return `${n}/${d}`;
}

function equivalentFractionAnswers(n: number, d: number): string[] {
  const simp = simplifyFraction(n, d);
  return Array.from(
    new Set([
      `${simp.n}/${simp.d}`,
      `${n}/${d}`,
    ])
  );
}

function fractionCanvas(
  data: Omit<FractionCanvasData, "kind">
): FractionCanvasData {
  return { kind: "fraction", ...data };
}

function expl(calcul: string) {
  return (
    "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
    "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse."
  );
}

export const fractionsBank: TutorBankItemV4[] = [
  // =========================
  // FRACTION_EGALES
  // =========================
  {
    kind: "fixed",
    id: "fraction_egale_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 1,
    theme: "neutral",
    text: "$\\dfrac{1}{2}$ et $\\dfrac{2}{4}$ représentent-ils la même quantité ?",
    format: "short",
    expected: ["oui"],
    comparator: "contains_keyword",
    hint: "On peut multiplier le numérateur et le dénominateur par le même nombre.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/2 = 2/4 car on a multiplié le numérateur et le dénominateur de 1/2 par 2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "fraction_nombre_egales"],
  },
  {
    kind: "fixed",
    id: "fraction_egale_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 1,
    theme: "neutral",
    text: "$\\dfrac{3}{5}$ et $\\dfrac{6}{10}$ sont-elles égales ?",
    format: "short",
    expected: ["oui"],
    comparator: "contains_keyword",
    hint: "Passe de 3/5 à une fraction de dénominateur 10.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("3/5 = 6/10 car on a multiplié 3 et 5 par 2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "fraction_nombre_egales"],
  },
  {
    kind: "fixed",
    id: "fraction_egale_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    text: "$\\dfrac{2}{3}$ et $\\dfrac{4}{5}$ sont-elles égales ?",
    format: "short",
    expected: ["non"],
    comparator: "contains_keyword",
    hint: "Cherche si on peut obtenir l’une en multipliant l’autre en haut et en bas par le même nombre.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("2/3 ne devient pas 4/5 en multipliant le numérateur et le dénominateur par un même nombre. Ces fractions ne sont donc pas égales.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "fraction_nombre_egales"],
  },
  {
    kind: "fixed",
    id: "fraction_egale_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est égale à $\\dfrac{3}{4}$ ?",
    format: "qcm",
    choices: ["6/8", "5/8", "9/10", "4/3"],
    expected: ["6/8"],
    comparator: "mcq_exact",
    hint: "Multiplie 3 et 4 par le même nombre.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("3/4 = 6/8 car 3 × 2 = 6 et 4 × 2 = 8.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "fraction_nombre_egales", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_egale_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    hint: "On peut multiplier le numérateur et le dénominateur par le même nombre.",
    tags: ["fraction_nombre", "fraction_nombre_egales", "template"],
    generate: () => {
      const n = randomChoice([1, 2, 3, 4, 5]);
      const d = randomChoice([2, 3, 4, 5, 6]);
      const k = randomChoice([2, 3, 4]);
      const isEqual = Math.random() > 0.5;
      const n2 = n * k;
      const d2 = isEqual ? d * k : d * k + 1;

      return {
        text: `$\\dfrac{${n}}{${d}}$ et $\\dfrac{${n2}}{${d2}}$ sont-elles égales ?`,
        format: "short",
        expected: [isEqual ? "oui" : "non"],
        comparator: "contains_keyword",
        explanation: "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          (isEqual
          ? `${n}/${d} = ${n2}/${d2} car on a multiplié le numérateur et le dénominateur par ${k}.`
          : `${n}/${d} et ${n2}/${d2} ne sont pas égales car le numérateur et le dénominateur n’ont pas été transformés avec le même coefficient.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
      };
    },
  },

  // =========================
  // FRACTION_SIMPLIFIER
  // =========================
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 1,
    theme: "neutral",
    text: "Simplifie $\\dfrac{6}{8}$.",
    format: "short",
    expected: ["3/4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Divise le numérateur et le dénominateur par leur plus grand diviseur commun.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("6 et 8 sont divisibles par 2. On obtient 6/8 = 3/4.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "simplifier"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 1,
    theme: "neutral",
    text: "Simplifie $\\dfrac{9}{12}$.",
    format: "short",
    expected: ["3/4"],
    comparator: "fraction_decimal_equivalent",
    hint: "9 et 12 ont un diviseur commun.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("9 et 12 sont divisibles par 3. Donc 9/12 = 3/4.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "simplifier"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme simplifiée de $\\dfrac{15}{20}$ ?",
    format: "qcm",
    choices: ["3/4", "5/4", "10/15", "4/3"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "15 et 20 sont divisibles par 5.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("15/20 = 3/4 car on divise 15 et 20 par 5.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "simplifier", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le plus grand diviseur commun.",
    tags: ["fraction_nombre", "simplifier", "template"],
    generate: () => {
      const a = randomChoice([1, 2, 3, 4, 5, 6]);
      const b = randomChoice([2, 3, 4, 5, 6, 7]);
      const k = randomChoice([2, 3, 4]);
      const n = a * k;
      const d = b * k;
      const simp = simplifyFraction(n, d);

      return {
        text: `Simplifie $\\dfrac{${n}}{${d}}$.`,
        format: "short",
        expected: [fractionStr(simp.n, simp.d)],
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          (`${n}/${d} = ${simp.n}/${simp.d} après simplification.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
      };
    },
  },

  // =========================
  // FRACTION_RATIONNEL
  // =========================
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 1,
    theme: "neutral",
    text: "Une fraction comme $\\dfrac{3}{5}$ représente-t-elle un nombre rationnel ?",
    format: "short",
    expected: ["oui"],
    comparator: "contains_keyword",
    hint: "Un nombre rationnel peut s’écrire comme quotient de deux entiers.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("3/5 est un quotient de deux entiers. C’est donc un nombre rationnel.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "rationnel"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Écris le nombre rationnel 'moins deux tiers' sous forme de fraction.",
    format: "short",
    expected: ["-2/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Place le signe moins devant la fraction.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("Le nombre 'moins deux tiers' s’écrit -2/3.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "rationnel"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est écrit comme quotient de deux entiers ?",
    format: "qcm",
    choices: ["7/4", "π", "√2", "abc"],
    expected: ["7/4"],
    comparator: "mcq_exact",
    hint: "On cherche une écriture de type entier sur entier non nul.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("7/4 est le quotient de deux entiers. C’est un nombre rationnel.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "rationnel", "qcm"],
  },

  // =========================
  // FRACTION_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus grand : $\\dfrac{1}{2}$ ou $\\dfrac{3}{4}$ ?",
    format: "short",
    expected: ["3/4"],
    comparator: "contains_keyword",
    hint: "Tu peux comparer leurs valeurs décimales ou utiliser des fractions de même dénominateur.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/2 = 2/4, donc 3/4 est plus grand que 1/2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "comparer"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Compare $\\dfrac{2}{3}$ et $\\dfrac{3}{5}$. Réponds par >, < ou =.",
    format: "short",
    expected: [">"],
    comparator: "contains_keyword",
    hint: "Tu peux comparer 2 × 5 et 3 × 3.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("2/3 et 3/5 : 2 × 5 = 10 et 3 × 3 = 9, donc 2/3 > 3/5.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "comparer"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction est la plus petite ?",
    format: "qcm",
    choices: ["5/6", "3/4", "2/3", "7/8"],
    expected: ["2/3"],
    comparator: "mcq_exact",
    hint: "Compare leurs valeurs approximatives.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("2/3 ≈ 0,67 ; 3/4 = 0,75 ; 5/6 ≈ 0,83 ; 7/8 = 0,875. La plus petite est 2/3.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "comparer", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare par produit en croix ou en mettant au même dénominateur.",
    tags: ["fraction_nombre", "comparer", "template"],
    generate: () => {
      const a = randomChoice([
        [1, 2],
        [2, 3],
        [3, 4],
        [3, 5],
        [4, 5],
      ]);
      const b = randomChoice([
        [1, 3],
        [2, 5],
        [3, 5],
        [5, 6],
        [7, 8],
      ]);

      const [n1, d1] = a;
      const [n2, d2] = b;
      const v1 = n1 / d1;
      const v2 = n2 / d2;
      const sign = v1 > v2 ? ">" : v1 < v2 ? "<" : "=";

      return {
        text: `Compare $\\dfrac{${n1}}{${d1}}$ et $\\dfrac{${n2}}{${d2}}$. Réponds par >, < ou =.`,
        format: "short",
        expected: [sign],
        comparator: "contains_keyword",
        explanation: "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          (`${n1}/${d1} ${sign} ${n2}/${d2}.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
      };
    },
  },

  // =========================
  // FRACTION_ADDITION
  // =========================
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{1}{4} + \\dfrac{2}{4}$.",
    format: "short",
    expected: ["3/4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Les dénominateurs sont déjà égaux.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/4 + 2/4 = 3/4.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{3}{5} - \\dfrac{1}{5}$.",
    format: "short",
    expected: ["2/5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Quand les dénominateurs sont égaux, on additionne ou on soustrait seulement les numérateurs.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("3/5 - 1/5 = 2/5.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "addition", "soustraction"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\dfrac{1}{2} + \\dfrac{1}{3}$.",
    format: "short",
    expected: ["5/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "Mets les fractions au même dénominateur.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/2 = 3/6 et 1/3 = 2/6, donc 1/2 + 1/3 = 5/6.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, Inès mange $\\dfrac{1}{4}$ d’un gâteau le matin puis $\\dfrac{1}{2}$ du même gâteau à midi. Quelle quantité a-t-elle mangée en tout ?",
    format: "qcm",
    choices: ["2/3", "3/4", "1", "5/8"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Transforme 1/2 en une fraction de dénominateur 4.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/2 = 2/4. Donc 1/4 + 2/4 = 3/4.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "addition", "qcm", "reunion"],
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par mettre les fractions au même dénominateur.",
    tags: ["fraction_nombre", "addition", "template"],
    generate: () => {
      const pairs = [
        [1, 2, 1, 3],
        [1, 4, 1, 2],
        [2, 3, 1, 6],
        [3, 4, 1, 8],
      ];
      const [n1, d1, n2, d2] = randomChoice(pairs);
      const simp = simplifyFraction(n1 * d2 + n2 * d1, d1 * d2);

      return {
        text: `Calcule $\\dfrac{${n1}}{${d1}}$ + $\\dfrac{${n2}}{${d2}}$.`,
        format: "short",
        expected: [fractionStr(simp.n, simp.d)],
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          (`${n1}/${d1} + ${n2}/${d2} = ${n1 * d2}/${d1 * d2} + ${n2 * d1}/${d1 * d2} = ${(n1 * d2) + (n2 * d1)}/${d1 * d2} = ${simp.n}/${simp.d}.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
      };
    },
  },

  // =========================
  // FRACTION_PRODUIT
  // =========================
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{2}{3} \\times \\dfrac{3}{4}$.",
    format: "short",
    expected: ["1/2", "6/12"],
    comparator: "fraction_decimal_equivalent",
    hint: "Multiplie les numérateurs entre eux, puis les dénominateurs entre eux.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("2/3 × 3/4 = 6/12 = 1/2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "produit"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{5}{6} \\times \\dfrac{2}{5}$.",
    format: "short",
    expected: ["1/3", "10/30"],
    comparator: "fraction_decimal_equivalent",
    hint: "Puis simplifie le résultat.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("5/6 × 2/5 = 10/30 = 1/3.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "produit"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le résultat de $\\dfrac{3}{4} \\times \\dfrac{2}{3}$ ?",
    format: "qcm",
    choices: ["1/2", "5/7", "6/7", "2/5"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "Multiplie et simplifie.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("3/4 × 2/3 = 6/12 = 1/2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "produit", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_multiplier_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie en haut et en bas, puis simplifie.",
    tags: ["fraction_nombre", "produit", "template"],
    generate: () => {
      const pairs = [
        [1, 2, 2, 3],
        [2, 3, 3, 4],
        [3, 5, 5, 6],
        [2, 5, 5, 4],
        [3, 4, 4, 9],
      ];
      const [n1, d1, n2, d2] = randomChoice(pairs);
      const simp = simplifyFraction(n1 * n2, d1 * d2);

      return {
        text: `Calcule $\\dfrac{${n1}}{${d1}}$ × $\\dfrac{${n2}}{${d2}}$.`,
        format: "short",
        expected: [fractionStr(simp.n, simp.d)],
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          (`${n1}/${d1} × ${n2}/${d2} = ${n1 * n2}/${d1 * d2} = ${simp.n}/${simp.d}.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
      };
    },
  },

  // =========================
  // FRACTION_QUANTITE
  // =========================
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{3}{4}$ de 20.",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Prendre 3/4 d’un nombre, c’est multiplier ce nombre par 3/4.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("3/4 de 20 = 20 × 3/4 = 15.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\dfrac{2}{5}$ de 30.",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Commence par calculer 1/5 de 30.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/5 de 30 vaut 6, donc 2/5 de 30 vaut 12.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "cuisine",
    text: "Pour une recette, Léa utilise $\\dfrac{3}{4}$ d’un paquet de 28 biscuits. Combien de biscuits cela représente-t-il ?",
    format: "short",
    expected: ["21"],
    comparator: "number_equal",
    hint: "Calcule 1/4 puis multiplie par 3.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/4 de 28 vaut 7, donc 3/4 de 28 vaut 21.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "quantite", "cuisine"],
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par partager la quantité en parts égales.",
    tags: ["fraction_nombre", "quantite", "template"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5, 6]);
      const n = randomChoice([1, 2, 3, 4]);
      const baseUnit = randomChoice([4, 5, 6, 8, 10]);
      const quantity = d * baseUnit;
      const good = (quantity * n) / d;

      return {
        text: `Calcule $\\dfrac{${n}}{${d}}$ de ${quantity}.`,
        format: "short",
        expected: [String(good)],
        comparator: "number_equal",
        explanation: "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          (`${n}/${d} de ${quantity} = ${quantity} × ${n}/${d} = ${good}.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
      };
    },
  },

  // =========================
  // FRACTION_INVERSE
  // =========================

  // =========================
  // FRACTION_DIVISION
  // =========================

  // =========================
  // FRACTION_OPPOSE
  // =========================
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’opposé de $\\dfrac{3}{5}$ ?",
    format: "short",
    expected: ["-3/5"],
    comparator: "fraction_decimal_equivalent",
    hint: "L’opposé a la même distance à 0 mais un signe contraire.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("L’opposé de 3/5 est -3/5.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "oppose"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’opposé de -$\\dfrac{7}{9}$ ?",
    format: "short",
    expected: ["7/9"],
    comparator: "fraction_decimal_equivalent",
    hint: "On change simplement le signe.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("L’opposé de -7/9 est 7/9.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "oppose"],
  },

  // =========================
  // FRACTION_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "fraction_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi $\\dfrac{1}{3}$ est plus grand que $\\dfrac{1}{4}$.",
    format: "open",
    expected: ["plus grand", "parts", "quart", "tiers"],
    comparator: "contains_keyword",
    hint: "Quand on partage la même quantité en moins de parts, les parts sont plus grandes.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("Si on partage une même quantité en 3 parts égales, chaque part est plus grande que si on la partage en 4 parts égales. Donc 1/3 > 1/4.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "cuisine",
    text: "Une recette utilise $\\dfrac{2}{3}$ d’un litre de lait. Léa ne veut préparer que la moitié de la recette. Quelle quantité de lait doit-elle utiliser ?",
    format: "short",
    expected: ["1/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Prendre la moitié de 2/3, c’est multiplier par 1/2.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("La moitié de 2/3 vaut 2/3 × 1/2 = 2/6 = 1/3. Il faut donc 1/3 de litre de lait.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "defi", "cuisine"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, Enzo mange $\\dfrac{3}{4}$ d’un gâteau le midi puis $\\dfrac{1}{6}$ du même gâteau le soir. Quelle quantité a-t-il mangée en tout ?",
    format: "qcm",
    choices: ["5/6", "7/12", "11/12", "1"],
    expected: ["11/12"],
    comparator: "mcq_exact",
    hint: "Mets les fractions au même dénominateur.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("3/4 = 9/12 et 1/6 = 2/12. Donc 9/12 + 2/12 = 11/12.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "defi", "qcm", "reunion"],
  },
    /* =========================
     QUESTIONS OUVERTES — FRACTIONS
  ========================= */
  {
    kind: "fixed",
    id: "fraction_egale_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi $\\dfrac{1}{2}$ et $\\dfrac{2}{4}$ représentent la même quantité.",
    format: "open",
    expected: ["multiplie", "numérateur", "dénominateur", "2"],
    comparator: "contains_keyword",
    hint: "On passe de 1/2 à 2/4 en multipliant en haut et en bas par le même nombre.",
    explanation: "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/2 = 2/4 car on multiplie le numérateur et le dénominateur par 2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "open", "fraction_nombre_egales"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment simplifier la fraction $\\dfrac{12}{18}$.",
    format: "open",
    expected: ["divise", "6", "2/3"],
    comparator: "contains_keyword",
    hint: "Cherche un diviseur commun à 12 et 18.",
    explanation: "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("12 et 18 sont divisibles par 6. Donc 12/18 = 2/3.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "open", "simplifier"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi $\\dfrac{2}{3}$ est plus grand que $\\dfrac{3}{5}$.",
    format: "open",
    expected: ["2/3", "3/5", "10", "9"],
    comparator: "contains_keyword",
    hint: "Tu peux comparer par produit en croix.",
    explanation: "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("On compare 2 × 5 = 10 et 3 × 3 = 9. Comme 10 > 9, alors 2/3 > 3/5.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "open", "comparer"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi $\\dfrac{1}{2} + \\dfrac{1}{3}$ = $\\dfrac{5}{6}$.",
    format: "open",
    expected: ["même dénominateur", "3/6", "2/6", "5/6"],
    comparator: "contains_keyword",
    hint: "Mets 1/2 et 1/3 au même dénominateur.",
    explanation: "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/2 = 3/6 et 1/3 = 2/6. Donc 1/2 + 1/3 = 3/6 + 2/6 = 5/6.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "open", "addition"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer $\\dfrac{2}{3} \\times \\dfrac{3}{4}$.",
    format: "open",
    expected: ["multiplie", "numérateurs", "dénominateurs", "1/2"],
    comparator: "contains_keyword",
    hint: "Multiplie les numérateurs entre eux et les dénominateurs entre eux.",
    explanation: "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("2/3 × 3/4 = 6/12, puis on simplifie : 6/12 = 1/2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "open", "produit"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer $\\dfrac{3}{4}$ de 20.",
    format: "open",
    expected: ["20", "4", "5", "15"],
    comparator: "contains_keyword",
    hint: "Commence par calculer 1/4 de 20.",
    explanation: "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/4 de 20 vaut 5, donc 3/4 de 20 vaut 3 × 5 = 15.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "open", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce qu’est l’opposé de $\\dfrac{3}{5}$.",
    format: "open",
    expected: ["signe", "-3/5", "0"],
    comparator: "contains_keyword",
    hint: "Deux nombres opposés ont des signes contraires et leur somme vaut 0.",
    explanation: "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("L’opposé de 3/5 est -3/5. Les deux nombres ont des signes contraires et leur somme vaut 0.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "open", "oppose"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : $\\dfrac{1}{2} + \\dfrac{1}{3}$ = $\\dfrac{2}{5}$. Explique son erreur.",
    format: "open",
    expected: ["dénominateur", "même dénominateur", "5/6", "erreur"],
    comparator: "contains_keyword",
    hint: "On n’additionne pas les dénominateurs entre eux.",
    explanation: "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("L’élève additionne les numérateurs et les dénominateurs séparément. Il faut mettre au même dénominateur : 1/2 = 3/6 et 1/3 = 2/6, donc le résultat est 5/6.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "open", "defi", "erreur"],
  },
    /* =========================
     RENFORT — FRACTION CANVAS 5e
  ========================= */

  {
    kind: "template",
    id: "5e_fraction_egale_canvas_compare_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe si la même proportion est colorée.",
    tags: ["fraction_nombre", "fraction_nombre_egales", "canvas", "compare", "template"],
    generate: () => {
      const situations = [
        { a: [1, 2], b: [2, 4], answer: "oui" },
        { a: [2, 3], b: [4, 6], answer: "oui" },
        { a: [3, 4], b: [6, 8], answer: "oui" },
        { a: [2, 5], b: [1, 2], answer: "non" },
        { a: [3, 5], b: [2, 3], answer: "non" },
      ];
      const s = randomChoice(situations);

      return {
        text: `Les fractions $\\dfrac{${s.a[0]}}{${s.a[1]}}$ et $\\dfrac{${s.b[0]}}{${s.b[1]}}$ représentent-elles la même quantité ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [s.answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux fractions sont égales si elles représentent la même quantité.\n\n" +
          "Méthode : on compare les parties colorées sur les deux représentations.\n\n" +
          (s.answer === "oui"
            ? `Observation : ${s.a[0]}/${s.a[1]} et ${s.b[0]}/${s.b[1]} colorent la même proportion du tout.\n\n`
            : `Observation : ${s.a[0]}/${s.a[1]} et ${s.b[0]}/${s.b[1]} ne colorent pas la même proportion du tout.\n\n`) +
          `Conclusion : la réponse est ${s.answer}.`,
        canvas: fractionCanvas({
          model: "compare",
          fractions: [
            { numerator: s.a[0], denominator: s.a[1], label: `${s.a[0]}/${s.a[1]}` },
            { numerator: s.b[0], denominator: s.b[1], label: `${s.b[0]}/${s.b[1]}` },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_fraction_simplifier_canvas_bar_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche une fraction plus simple qui représente la même partie colorée.",
    tags: ["fraction_nombre", "simplifier", "canvas", "bar", "template"],
    generate: () => {
      const situations = [
        { n: 2, d: 4 },
        { n: 3, d: 6 },
        { n: 4, d: 8 },
        { n: 6, d: 10 },
        { n: 6, d: 12 },
        { n: 8, d: 12 },
      ];
      const s = randomChoice(situations);
      const simp = simplifyFraction(s.n, s.d);

      return {
        text: `Simplifie la fraction représentée : $\\dfrac{${s.n}}{${s.d}}$.`,
        format: "short",
        expected: [fractionStr(simp.n, simp.d), `${s.n}/${s.d}`],
        comparator: "fraction_decimal_equivalent",
        explanation:
          "Définition : simplifier une fraction, c’est écrire une fraction égale avec des nombres plus petits.\n\n" +
          "Méthode : on divise le numérateur et le dénominateur par un même diviseur.\n\n" +
          `Calcul : ${s.n}/${s.d} = ${simp.n}/${simp.d}.\n\n` +
          `Conclusion : la forme simplifiée est ${simp.n}/${simp.d}.`,
        canvas: fractionCanvas({
          model: "bar",
          fraction: { numerator: s.n, denominator: s.d, label: `${s.n}/${s.d}` },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_fraction_rationnel_canvas_grid_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    hint: "Un nombre rationnel peut s’écrire comme quotient de deux entiers.",
    tags: ["fraction_nombre", "rationnel", "canvas", "grid", "template"],
    generate: () => {
      const situations = [
        { rows: 2, cols: 5, shaded: 7 },
        { rows: 3, cols: 4, shaded: 5 },
        { rows: 4, cols: 4, shaded: 10 },
        { rows: 2, cols: 6, shaded: 9 },
      ];
      const s = randomChoice(situations);
      const total = s.rows * s.cols;
      const simp = simplifyFraction(s.shaded, total);

      return {
        text: "Écris la partie colorée sous forme de fraction simplifiée.",
        format: "short",
        expected: [fractionStr(simp.n, simp.d), `${s.shaded}/${total}`],
        comparator: "fraction_decimal_equivalent",
        explanation:
          "Définition : une fraction est une écriture d’un nombre rationnel.\n\n" +
          "Méthode : on compte les cases colorées et les cases totales, puis on simplifie si possible.\n\n" +
          `Calcul : ${s.shaded}/${total} = ${simp.n}/${simp.d}.\n\n` +
          `Conclusion : la fraction simplifiée est ${simp.n}/${simp.d}.`,
        canvas: fractionCanvas({
          model: "grid",
          grid: { rows: s.rows, cols: s.cols, shaded: s.shaded },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_fraction_comparer_canvas_compare_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les portions colorées.",
    tags: ["fraction_nombre", "comparer", "canvas", "compare", "template"],
    generate: () => {
      const situations = [
        { a: [1, 2], b: [3, 4] },
        { a: [2, 3], b: [3, 5] },
        { a: [5, 6], b: [3, 4] },
        { a: [3, 8], b: [1, 2] },
      ];
      const s = randomChoice(situations);
      const va = s.a[0] / s.a[1];
      const vb = s.b[0] / s.b[1];
      const sign = va > vb ? ">" : va < vb ? "<" : "=";

      return {
        text: `Compare $\\dfrac{${s.a[0]}}{${s.a[1]}}$ et $\\dfrac{${s.b[0]}}{${s.b[1]}}$. Réponds par >, < ou =.`,
        format: "short",
        expected: [sign],
        comparator: "contains_keyword",
        explanation:
          "Définition : comparer deux fractions, c’est déterminer laquelle représente la plus grande quantité.\n\n" +
          "Méthode : on peut observer les portions colorées ou comparer par calcul.\n\n" +
          `Observation : ${s.a[0]}/${s.a[1]} ${sign} ${s.b[0]}/${s.b[1]}.\n\n` +
          `Conclusion : le signe correct est ${sign}.`,
        canvas: fractionCanvas({
          model: "compare",
          fractions: [
            { numerator: s.a[0], denominator: s.a[1], label: `${s.a[0]}/${s.a[1]}` },
            { numerator: s.b[0], denominator: s.b[1], label: `${s.b[0]}/${s.b[1]}` },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_fraction_additionner_canvas_bar_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    hint: "Les dénominateurs sont identiques : additionne les numérateurs.",
    tags: ["fraction_nombre", "addition", "canvas", "bar", "template"],
    generate: () => {
      const d = randomChoice([4, 5, 6, 8]);
      const a = randomChoice([1, 2]);
      const b = randomChoice([1, 2, 3]);
      const total = Math.min(a + b, d);
      const simp = simplifyFraction(total, d);

      return {
        text: `Calcule $\\dfrac{${a}}{${d}}$ + $\\dfrac{${b}}{${d}}$.`,
        format: "short",
        expected: [fractionStr(simp.n, simp.d), `${total}/${d}`],
        comparator: "fraction_decimal_equivalent",
        explanation:
          "Définition : pour additionner des fractions de même dénominateur, on additionne les numérateurs.\n\n" +
          "Méthode : on garde le même dénominateur.\n\n" +
          `Calcul : ${a}/${d} + ${b}/${d} = ${total}/${d} = ${simp.n}/${simp.d}.\n\n` +
          `Conclusion : le résultat est ${simp.n}/${simp.d}.`,
        canvas: fractionCanvas({
          model: "bar",
          fraction: { numerator: total, denominator: d, label: `${total}/${d}` },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_fraction_quantite_canvas_circle_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par calculer une part.",
    tags: ["fraction_nombre", "quantite", "canvas", "circle", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6]);
      const n = randomChoice([1, 2, 3]);
      const base = d * randomChoice([4, 5, 6, 8]);
      const result = (base / d) * n;

      return {
        text: `Calcule $\\dfrac{${n}}{${d}}$ de ${base}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : calculer une fraction d’une quantité, c’est prendre une partie de cette quantité.\n\n" +
          "Méthode : on divise par le dénominateur puis on multiplie par le numérateur.\n\n" +
          `Calcul : ${base} ÷ ${d} = ${base / d}, puis ${base / d} × ${n} = ${result}.\n\n` +
          `Conclusion : ${n}/${d} de ${base} vaut ${result}.`,
        canvas: fractionCanvas({
          model: "circle",
          fraction: { numerator: n, denominator: d, label: `${n}/${d}` },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_fraction_piege_parts_inegales_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 3,
    theme: "neutral",
    text: "Deux figures ont 2 parts colorées sur 4. Peut-on toujours dire qu’elles représentent $\\dfrac{2}{4}$ ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut vérifier que les parts sont égales.",
    explanation:
      "Définition : une fraction représente des parts égales d’un même tout.\n\n" +
      "Méthode : avant d’écrire une fraction, on vérifie que le partage est régulier.\n\n" +
      "Observation : si les parts ne sont pas égales, l’écriture 2/4 n’est pas fiable.\n\n" +
      "Conclusion : on ne peut pas toujours dire que cela représente 2/4.",
    tags: ["fraction_nombre", "piege", "parts_inegales", "canvas"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: { numerator: 2, denominator: 4, label: "2/4 ?" },
      display: { unequalParts: true },
    }),
  },

  {
    kind: "fixed",
    id: "5e_fraction_additionner_erreur_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : $\\dfrac{1}{2} + \\dfrac{1}{3}$ = $\\dfrac{2}{5}$. Quelle est son erreur ?",
    format: "open",
    expected: ["dénominateur", "même dénominateur", "5/6", "additionne"],
    comparator: "contains_keyword",
    hint: "On n’additionne pas les dénominateurs entre eux.",
    explanation:
      "Définition : pour additionner deux fractions, il faut utiliser un dénominateur commun.\n\n" +
      "Méthode : on transforme les fractions avant d’additionner.\n\n" +
      "Calcul : 1/2 = 3/6 et 1/3 = 2/6, donc 1/2 + 1/3 = 5/6.\n\n" +
      "Conclusion : l’erreur est d’avoir additionné les dénominateurs.",
    tags: ["fraction_nombre", "erreur", "open", "addition"],
  },

  // =========================
  // TOP-UP — FRACTION_EGALE (+2)
  // =========================
  {
    kind: "fixed",
    id: "fraction_egale_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est égale à $\\dfrac{2}{5}$ ?",
    format: "qcm",
    choices: ["4/10", "3/5", "2/10", "5/2"],
    expected: ["4/10"],
    comparator: "mcq_exact",
    hint: "Multiplie 2 et 5 par le même nombre.",
    explanation: expl("2/5 = 4/10 car on multiplie le numérateur et le dénominateur par 2."),
    tags: ["fraction_nombre", "fraction_nombre_egales", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_egale_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie le haut et le bas par le même nombre.",
    tags: ["fraction_nombre", "fraction_nombre_egales", "template"],
    generate: () => {
      const n = randomChoice([1, 2, 3]);
      const d = randomChoice([2, 3, 4, 5]);
      const k = randomChoice([2, 3, 4]);
      return {
        text: `Complète : $\\dfrac{${n}}{${d}}$ = ?/${d * k}.`,
        format: "short",
        expected: [String(n * k)],
        comparator: "number_equal",
        explanation: expl(`On multiplie ${d} par ${k} pour obtenir ${d * k}, donc on multiplie aussi ${n} par ${k} : le numérateur est ${n * k}.`),
      };
    },
  },

  // =========================
  // TOP-UP — FRACTION_SIMPLIFIER (+4)
  // =========================
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Simplifie $\\dfrac{10}{15}$.",
    format: "short",
    expected: ["2/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "10 et 15 sont divisibles par 5.",
    explanation: expl("10 et 15 sont divisibles par 5 : 10/15 = 2/3."),
    tags: ["fraction_nombre", "simplifier"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $\\dfrac{24}{36}$.",
    format: "short",
    expected: ["2/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Le plus grand diviseur commun de 24 et 36 est 12.",
    explanation: expl("24 et 36 sont divisibles par 12 : 24/36 = 2/3."),
    tags: ["fraction_nombre", "simplifier"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est déjà irréductible (impossible à simplifier) ?",
    format: "qcm",
    choices: ["3/7", "4/8", "6/9", "10/20"],
    expected: ["3/7"],
    comparator: "mcq_exact",
    hint: "Cherche celle dont le numérateur et le dénominateur n’ont pas de diviseur commun.",
    explanation: expl("3 et 7 n’ont aucun diviseur commun autre que 1 : 3/7 est irréductible."),
    tags: ["fraction_nombre", "simplifier", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise par le plus grand diviseur commun.",
    tags: ["fraction_nombre", "simplifier", "template"],
    generate: () => {
      const base = randomChoice([[1, 2], [2, 3], [3, 4], [3, 5], [4, 5]]);
      const k = randomChoice([3, 4, 6]);
      const n = base[0] * k;
      const d = base[1] * k;
      const simp = simplifyFraction(n, d);
      return {
        text: `Simplifie $\\dfrac{${n}}{${d}}$.`,
        format: "short",
        expected: [fractionStr(simp.n, simp.d)],
        comparator: "fraction_decimal_equivalent",
        explanation: expl(`On divise ${n} et ${d} par ${k} : ${n}/${d} = ${simp.n}/${simp.d}.`),
      };
    },
  },

  // =========================
  // TOP-UP — FRACTION_RATIONNEL (+6)
  // =========================
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre entier 4 est-il un nombre rationnel ?",
    format: "short",
    expected: ["oui"],
    comparator: "contains_keyword",
    hint: "Peut-on écrire 4 comme un quotient d’entiers ?",
    explanation: expl("Oui : 4 = 4/1, c’est un quotient de deux entiers, donc 4 est un nombre rationnel."),
    tags: ["fraction_nombre", "rationnel"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Écris le nombre rationnel 'cinq tiers' sous forme de fraction.",
    format: "short",
    expected: ["5/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Numérateur 5, dénominateur 3.",
    explanation: expl("'Cinq tiers' s’écrit 5/3."),
    tags: ["fraction_nombre", "rationnel"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 3,
    theme: "neutral",
    text: "Pour qu’une fraction a/b soit un nombre rationnel, quelle condition doit respecter b ?",
    format: "qcm",
    choices: ["b doit être non nul", "b doit être positif", "b doit être pair", "b doit être premier"],
    expected: ["b doit être non nul"],
    comparator: "mcq_exact",
    hint: "On ne divise jamais par zéro.",
    explanation: expl("Une fraction a/b est définie seulement si b est non nul (on ne divise pas par 0)."),
    tags: ["fraction_nombre", "rationnel", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle écriture représente un nombre rationnel négatif ?",
    format: "qcm",
    choices: ["-3/4", "3/4", "√3", "4/0"],
    expected: ["-3/4"],
    comparator: "mcq_exact",
    hint: "Un quotient d’entiers, avec un signe moins.",
    explanation: expl("-3/4 est un quotient de deux entiers, négatif : c’est un nombre rationnel négatif."),
    tags: ["fraction_nombre", "rationnel", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 3,
    theme: "neutral",
    text: "Explique ce qu’est un nombre rationnel.",
    format: "open",
    expected: ["quotient", "entiers", "fraction"],
    comparator: "contains_keyword",
    hint: "Pense à une écriture sous forme de fraction.",
    explanation: expl("Un nombre rationnel est un nombre qui peut s’écrire comme le quotient de deux entiers (une fraction), le dénominateur étant non nul."),
    tags: ["fraction_nombre", "rationnel", "open"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Écris le nombre rationnel 'moins sept demis' sous forme de fraction.",
    format: "short",
    expected: ["-7/2"],
    comparator: "fraction_decimal_equivalent",
    hint: "Signe moins, numérateur 7, dénominateur 2.",
    explanation: expl("'Moins sept demis' s’écrit -7/2."),
    tags: ["fraction_nombre", "rationnel"],
  },

  // =========================
  // TOP-UP — FRACTION_COMPARER (+4)
  // =========================
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Compare $\\dfrac{5}{8}$ et $\\dfrac{3}{8}$. Réponds par >, < ou =.",
    format: "short",
    expected: [">"],
    comparator: "contains_keyword",
    hint: "Même dénominateur : on compare les numérateurs.",
    explanation: expl("Même dénominateur : 5 > 3, donc 5/8 > 3/8."),
    tags: ["fraction_nombre", "comparer"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction est la plus grande ?",
    format: "qcm",
    choices: ["5/6", "2/3", "1/2", "3/8"],
    expected: ["5/6"],
    comparator: "mcq_exact",
    hint: "Compare les valeurs décimales.",
    explanation: expl("5/6 ≈ 0,83 ; 2/3 ≈ 0,67 ; 1/2 = 0,5 ; 3/8 ≈ 0,375. La plus grande est 5/6."),
    tags: ["fraction_nombre", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Une fraction est-elle plus grande ou plus petite que 1 quand son numérateur est plus petit que son dénominateur ? Réponds par 'plus petite' ou 'plus grande'.",
    format: "short",
    expected: ["plus petite"],
    comparator: "contains_keyword",
    hint: "Compare par exemple 3/4 à 1.",
    explanation: expl("Si le numérateur est plus petit que le dénominateur (ex. 3/4), la fraction est plus petite que 1."),
    tags: ["fraction_nombre", "comparer"],
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les produits en croix.",
    tags: ["fraction_nombre", "comparer", "template"],
    generate: () => {
      const pairs = [
        [2, 3, 3, 5],
        [3, 4, 5, 7],
        [1, 2, 2, 5],
        [4, 5, 5, 6],
      ];
      const [n1, d1, n2, d2] = randomChoice(pairs);
      const left = n1 * d2;
      const right = n2 * d1;
      const signe = left > right ? ">" : left < right ? "<" : "=";
      return {
        text: `Compare $\\dfrac{${n1}}{${d1}}$ et $\\dfrac{${n2}}{${d2}}$. Réponds par >, < ou =.`,
        format: "short",
        expected: [signe],
        comparator: "contains_keyword",
        explanation: expl(`Produits en croix : ${n1} × ${d2} = ${left} et ${n2} × ${d1} = ${right}, donc ${n1}/${d1} ${signe} ${n2}/${d2}.`),
      };
    },
  },

  // =========================
  // TOP-UP — FRACTION_ADDITIONNER (+2)
  // =========================
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{2}{7} + \\dfrac{3}{7}$.",
    format: "short",
    expected: ["5/7"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur : additionne les numérateurs.",
    explanation: expl("2/7 + 3/7 = 5/7."),
    tags: ["fraction_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\dfrac{2}{3} + \\dfrac{1}{6}$.",
    format: "short",
    expected: ["5/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "Mets 2/3 sur 6.",
    explanation: expl("2/3 = 4/6, donc 2/3 + 1/6 = 4/6 + 1/6 = 5/6."),
    tags: ["fraction_nombre", "addition"],
  },

  // =========================
  // TOP-UP — FRACTION_MULTIPLIER (+5)
  // =========================
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{5}{8} \\times \\dfrac{8}{5}$.",
    format: "short",
    expected: ["1", "40/40"],
    comparator: "fraction_decimal_equivalent",
    hint: "Multiplie les numérateurs entre eux et les dénominateurs entre eux, puis regarde ce que tu obtiens.",
    explanation: expl(
      "5/8 × 8/5 = 40/40 = 1. Ces deux fractions sont inverses l’une de l’autre : leur produit vaut toujours 1.",
    ),
    tags: ["fraction_nombre", "produit", "inverse", "remarquable"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{1}{2} \\times \\dfrac{4}{5}$.",
    format: "short",
    expected: ["2/5", "4/10"],
    comparator: "fraction_decimal_equivalent",
    hint: "Multiplie en haut et en bas.",
    explanation: expl("1/2 × 4/5 = 4/10 = 2/5."),
    tags: ["fraction_nombre", "produit"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le résultat de $\\dfrac{3}{5} \\times \\dfrac{2}{3}$ ?",
    format: "qcm",
    choices: ["2/5", "5/8", "6/8", "1"],
    expected: ["2/5"],
    comparator: "mcq_exact",
    hint: "6/15 se simplifie.",
    explanation: expl("3/5 × 2/3 = 6/15 = 2/5."),
    tags: ["fraction_nombre", "produit", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment on multiplie deux fractions.",
    format: "open",
    expected: ["numérateurs", "dénominateurs", "multiplie"],
    comparator: "contains_keyword",
    hint: "Pense aux numérateurs et aux dénominateurs séparément.",
    explanation: expl("On multiplie les numérateurs entre eux et les dénominateurs entre eux, puis on simplifie si possible."),
    tags: ["fraction_nombre", "produit", "open"],
  },
  {
    kind: "template",
    id: "fraction_multiplier_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie les numérateurs et les dénominateurs.",
    tags: ["fraction_nombre", "produit", "template"],
    generate: () => {
      const pairs = [
        [2, 3, 3, 4],
        [1, 2, 4, 5],
        [3, 5, 2, 3],
        [2, 3, 3, 5],
      ];
      const [n1, d1, n2, d2] = randomChoice(pairs);
      const simp = simplifyFraction(n1 * n2, d1 * d2);
      return {
        text: `Calcule $\\dfrac{${n1}}{${d1}}$ × $\\dfrac{${n2}}{${d2}}$.`,
        format: "short",
        expected: [fractionStr(simp.n, simp.d), fractionStr(n1 * n2, d1 * d2)],
        comparator: "fraction_decimal_equivalent",
        explanation: expl(`${n1}/${d1} × ${n2}/${d2} = ${n1 * n2}/${d1 * d2} = ${simp.n}/${simp.d}.`),
      };
    },
  },

  // =========================
  // TOP-UP — FRACTION_QUANTITE (+4)
  // =========================
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{1}{3}$ de 18.",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Divise 18 par 3.",
    explanation: expl("1/3 de 18 = 18 ÷ 3 = 6."),
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\dfrac{3}{5}$ de 25.",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "1/5 de 25 = 5.",
    explanation: expl("1/5 de 25 = 5, donc 3/5 de 25 = 3 × 5 = 15."),
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $\\dfrac{2}{3}$ de 9 ?",
    format: "qcm",
    choices: ["6", "3", "5", "18"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "1/3 de 9 = 3.",
    explanation: expl("1/3 de 9 = 3, donc 2/3 de 9 = 6."),
    tags: ["fraction_nombre", "quantite", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "reunion",
    hint: "Partage d’abord en parts égales.",
    tags: ["fraction_nombre", "quantite", "template", "reunion"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6]);
      const n = randomChoice([1, 2, 3]);
      const unit = randomChoice([3, 4, 5, 6]);
      const quantite = d * unit;
      const res = (quantite * n) / d;
      return {
        text: `Un panier contient ${quantite} letchis. On en mange $\\dfrac{${n}}{${d}}$. Combien de letchis cela représente-t-il ?`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: expl(`1/${d} de ${quantite} = ${quantite / d}, donc ${n}/${d} de ${quantite} = ${n} × ${quantite / d} = ${res}.`),
      };
    },
  },

  // =========================
  // TOP-UP — FRACTION_INVERSE (+7)
  // =========================

  // =========================
  // TOP-UP — FRACTION_DIVISER (+6)
  // =========================

  // =========================
  // TOP-UP — FRACTION_OPPOSE (+7)
  // =========================
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’opposé de $\\dfrac{2}{7}$ ?",
    format: "short",
    expected: ["-2/7"],
    comparator: "fraction_decimal_equivalent",
    hint: "On change le signe.",
    explanation: expl("L’opposé de 2/7 est -2/7."),
    tags: ["fraction_nombre", "oppose"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’opposé de -$\\dfrac{4}{9}$ ?",
    format: "short",
    expected: ["4/9"],
    comparator: "fraction_decimal_equivalent",
    hint: "Le signe contraire de moins, c’est plus.",
    explanation: expl("L’opposé de -4/9 est 4/9."),
    tags: ["fraction_nombre", "oppose"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’opposé de $\\dfrac{5}{6}$ ?",
    format: "qcm",
    choices: ["-5/6", "6/5", "5/6", "-6/5"],
    expected: ["-5/6"],
    comparator: "mcq_exact",
    hint: "On change seulement le signe.",
    explanation: expl("L’opposé de 5/6 est -5/6."),
    tags: ["fraction_nombre", "oppose", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 3,
    theme: "neutral",
    text: "La somme d’une fraction et de son opposé vaut :",
    format: "qcm",
    choices: ["0", "1", "2 fois la fraction", "l’inverse"],
    expected: ["0"],
    comparator: "mcq_exact",
    hint: "Essaie 3/5 + (-3/5).",
    explanation: expl("Une fraction plus son opposé donne toujours 0 (ex. 3/5 + (-3/5) = 0)."),
    tags: ["fraction_nombre", "oppose", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Explique la différence entre l’opposé et l’inverse d’une fraction.",
    format: "open",
    expected: ["signe", "échange", "inverse"],
    comparator: "contains_keyword",
    hint: "L’un change le signe, l’autre échange haut et bas.",
    explanation: expl("L’opposé change le signe de la fraction ; l’inverse échange le numérateur et le dénominateur."),
    tags: ["fraction_nombre", "oppose", "open"],
  },
  {
    kind: "template",
    id: "fraction_oppose_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    hint: "On change uniquement le signe.",
    tags: ["fraction_nombre", "oppose", "template"],
    generate: () => {
      const n = randomChoice([1, 2, 3, 4, 5]);
      const d = randomChoice([3, 5, 7, 8, 9]);
      return {
        text: `Quel est l’opposé de $\\dfrac{${n}}{${d}}$ ?`,
        format: "short",
        expected: [`-${n}/${d}`],
        comparator: "fraction_decimal_equivalent",
        explanation: expl(`L’opposé de ${n}/${d} est -${n}/${d}.`),
      };
    },
  },
  {
    kind: "template",
    id: "fraction_oppose_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 3,
    theme: "neutral",
    hint: "Le signe contraire de moins, c’est plus.",
    tags: ["fraction_nombre", "oppose", "template", "signe"],
    generate: () => {
      const n = randomChoice([2, 3, 4, 7]);
      const d = randomChoice([5, 6, 9, 11]);
      return {
        text: `Quel est l’opposé de -$\\dfrac{${n}}{${d}}$ ?`,
        format: "short",
        expected: [fractionStr(n, d)],
        comparator: "fraction_decimal_equivalent",
        explanation: expl(`L’opposé de -${n}/${d} est ${n}/${d}.`),
      };
    },
  },

  // =========================
  // TOP-UP — FRACTION_DEFI (+6)
  // =========================
  {
    kind: "fixed",
    id: "fraction_defi_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, Tom parcourt $\\dfrac{3}{4}$ d’un sentier de 12 km. Combien de kilomètres a-t-il parcourus ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Calcule 3/4 de 12.",
    explanation: expl("3/4 de 12 = 12 × 3/4 = 9 km."),
    tags: ["fraction_nombre", "defi", "reunion", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle fraction est égale à 1 ?",
    format: "qcm",
    choices: ["7/7", "7/8", "8/7", "0/7"],
    expected: ["7/7"],
    comparator: "mcq_exact",
    hint: "Numérateur = dénominateur.",
    explanation: expl("Une fraction dont le numérateur égale le dénominateur vaut 1 : 7/7 = 1."),
    tags: ["fraction_nombre", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Calcule $\\dfrac{1}{2} + \\dfrac{1}{3} + \\dfrac{1}{6}$.",
    format: "short",
    expected: ["1", "6/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "Mets tout sur 6.",
    explanation: expl("1/2 = 3/6, 1/3 = 2/6, 1/6 = 1/6. Somme = 3/6 + 2/6 + 1/6 = 6/6 = 1."),
    tags: ["fraction_nombre", "defi", "addition"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « $\\dfrac{2}{3} \\times \\dfrac{2}{3}$ = $\\dfrac{4}{3}$ ». Explique son erreur.",
    format: "open",
    expected: ["dénominateurs", "multiplie", "4/9"],
    comparator: "contains_keyword",
    hint: "On multiplie aussi les dénominateurs.",
    explanation: expl("Il faut multiplier aussi les dénominateurs : 2/3 × 2/3 = 4/9, pas 4/3."),
    tags: ["fraction_nombre", "defi", "open", "erreur"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans une classe, $\\dfrac{2}{5}$ des élèves font de l’espagnol et $\\dfrac{1}{3}$ de l’allemand. Quelle langue est choisie par le plus d’élèves ?",
    format: "qcm",
    choices: ["espagnol", "allemand", "autant des deux", "aucun"],
    expected: ["espagnol"],
    comparator: "mcq_exact",
    hint: "Compare 2/5 et 1/3 (mets sur 15).",
    explanation: expl("2/5 = 6/15 et 1/3 = 5/15. Comme 6/15 > 5/15, l’espagnol est choisi par plus d’élèves."),
    tags: ["fraction_nombre", "defi", "qcm", "comparer"],
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Calcule la fraction de la quantité.",
    tags: ["fraction_nombre", "defi", "reunion", "template", "quantite"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6]);
      const n = randomChoice([1, 2, 3]);
      const unit = randomChoice([4, 5, 6, 8]);
      const quantite = d * unit;
      const res = (quantite * n) / d;
      return {
        text: `Un producteur de Saint-Joseph récolte ${quantite} kg de café. Il vend $\\dfrac{${n}}{${d}}$ de sa récolte. Combien de kg vend-il ?`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: expl(`1/${d} de ${quantite} = ${quantite / d}, donc ${n}/${d} de ${quantite} = ${res} kg.`),
      };
    },
  },

  /* ===== FRACTION_DEFI =====
     Défis de lecture et de comparaison. Les défis de calcul sont partis vers
     fraction_calcul_defi le 04/08/2026 ; ce qui reste ici se joue à l'œil et
     au raisonnement, pas à la règle de calcul. */
  {
    kind: "fixed",
    id: "fraction_defi_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Range ces trois fractions de la plus petite à la plus grande : $\\dfrac{1}{2}$ ; $\\dfrac{1}{5}$ ; $\\dfrac{1}{3}$",
    format: "qcm",
    choices: [
      "1/5 ; 1/3 ; 1/2",
      "1/2 ; 1/3 ; 1/5",
      "1/2 ; 1/5 ; 1/3",
      "1/3 ; 1/5 ; 1/2",
    ],
    expected: ["1/5 ; 1/3 ; 1/2"],
    comparator: "mcq_exact",
    hint: "Partage un même gâteau en 2, puis en 5. Quelle part est la plus grosse ?",
    explanation: expl(
      "Le numérateur est le même : c’est le dénominateur qui décide. Plus on partage en un grand nombre de parts, plus chaque part est petite. Donc 1/5 < 1/3 < 1/2.",
    ),
    tags: ["fraction_nombre", "defi", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_qcm_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Une fraction est plus grande que 1. Que peut-on dire de son numérateur ?",
    format: "qcm",
    choices: [
      "il est plus grand que le dénominateur",
      "il est plus petit que le dénominateur",
      "il est égal au dénominateur",
      "il est toujours pair",
    ],
    expected: ["il est plus grand que le dénominateur"],
    comparator: "mcq_exact",
    hint: "Compare avec une fraction qui vaut exactement 1.",
    explanation: expl(
      "Une fraction vaut 1 quand son numérateur est égal à son dénominateur, comme 7/7. Pour dépasser 1, il faut donc un numérateur plus grand que le dénominateur : 9/7 est plus grand que 1.",
    ),
    tags: ["fraction_nombre", "defi", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Sur le marché forain de Saint-Pierre, Malia achète $\\dfrac{3}{4}$ d’un sac de letchis, Kevin $\\dfrac{5}{8}$ du même sac. Qui en a acheté le plus ?",
    format: "qcm",
    choices: ["Malia", "Kevin", "les deux pareil", "on ne peut pas comparer"],
    expected: ["Malia"],
    comparator: "mcq_exact",
    hint: "Écris les deux fractions avec le même dénominateur.",
    explanation: expl(
      "On met les deux fractions sur 8 : 3/4 = 6/8. Il reste à comparer 6/8 et 5/8. Le dénominateur est maintenant le même, donc le plus grand numérateur gagne : 6 > 5, Malia a acheté le plus.",
    ),
    tags: ["fraction_nombre", "defi", "comparer", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_open_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme : « $\\dfrac{3}{8}$ est plus grand que $\\dfrac{1}{2}$, parce que 3 est plus grand que 1 et 8 est plus grand que 2 ». Explique son erreur.",
    format: "open",
    expected: ["même dénominateur", "meme denominateur", "4/8", "moitié", "moitie", "séparément", "separement"],
    comparator: "contains_keyword",
    hint: "Combien de huitièmes font une moitié ?",
    explanation: expl(
      "On ne compare pas les numérateurs et les dénominateurs séparément. Il faut le même dénominateur : 1/2 = 4/8. On compare alors 3/8 et 4/8, et 3 < 4. Donc 3/8 est plus PETIT que 1/2.",
    ),
    tags: ["fraction_nombre", "defi", "open", "piege"],
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Même numérateur : c’est le dénominateur qui décide, et il décide à l’envers.",
    tags: ["fraction_nombre", "defi", "comparer", "template"],
    generate: () => {
      // Le numérateur reste sous le plus petit dénominateur : on ne veut pas
      // proposer 3/3, qui vaut 1 et change la nature de la question.
      const num = randomChoice([1, 2]);
      const [petit, grand] = shuffle([3, 4, 5, 6, 8, 9]).slice(0, 2).sort((a, b) => a - b);
      const plusGrande = `${num}/${petit}`;
      const plusPetite = `${num}/${grand}`;
      return {
        text: `Laquelle de ces deux fractions est la plus grande : ${plusPetite} ou ${plusGrande} ?`,
        format: "qcm",
        choices: shuffle([plusGrande, plusPetite, "elles sont égales", "on ne peut pas comparer"]),
        expected: [plusGrande],
        comparator: "mcq_exact",
        explanation: expl(
          `Les deux fractions ont le même numérateur, ${num}. C’est donc le dénominateur qui décide, et il décide à l’envers : ` +
            `partager en ${petit} parts donne des parts plus grosses que partager en ${grand} parts. Donc ${plusGrande} est la plus grande.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis à quoi tu compares la fraction avant de trancher.",
    tags: ["fraction_nombre", "defi", "open", "template"],
    generate: () => {
      const d = randomChoice([4, 6, 8, 10]);
      const n = randomChoice([d / 2 - 1, d / 2 + 1]);
      const plusGrand = n > d / 2;
      return {
        text: `La fraction $\\dfrac{${n}}{${d}}$ est-elle plus grande ou plus petite que $\\dfrac{1}{2}$ ? Explique comment tu le sais.`,
        format: "open",
        expected: ["moitié", "moitie", `${d / 2}/${d}`, "demi", "compare"],
        comparator: "contains_keyword",
        explanation: expl(
          `On écrit 1/2 avec le dénominateur ${d} : 1/2 = ${d / 2}/${d}. On compare alors ${n}/${d} et ${d / 2}/${d} : ` +
            (plusGrand
              ? `${n} > ${d / 2}, donc ${n}/${d} est plus grande que 1/2.`
              : `${n} < ${d / 2}, donc ${n}/${d} est plus petite que 1/2.`),
        ),
      };
    },
  },
];