import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

export const fractionsBank: TutorBankItemV4[] = [
  // =========================
  // FRACTION_EGALES
  // =========================
  {
    kind: "fixed",
    id: "fraction_egales_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_egales",
    difficulty: 1,
    theme: "neutral",
    text: "1/2 et 2/4 représentent-ils la même quantité ?",
    format: "short",
    expected: ["oui"],
    comparator: "contains_keyword",
    hint: "On peut multiplier le numérateur et le dénominateur par le même nombre.",
    explanation:
      "1/2 = 2/4 car on a multiplié le numérateur et le dénominateur de 1/2 par 2.",
    tags: ["fractions", "fractions_egales"],
  },
  {
    kind: "fixed",
    id: "fraction_egales_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_egales",
    difficulty: 1,
    theme: "neutral",
    text: "3/5 et 6/10 sont-elles égales ?",
    format: "short",
    expected: ["oui"],
    comparator: "contains_keyword",
    hint: "Passe de 3/5 à une fraction de dénominateur 10.",
    explanation:
      "3/5 = 6/10 car on a multiplié 3 et 5 par 2.",
    tags: ["fractions", "fractions_egales"],
  },
  {
    kind: "fixed",
    id: "fraction_egales_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_egales",
    difficulty: 2,
    theme: "neutral",
    text: "2/3 et 4/5 sont-elles égales ?",
    format: "short",
    expected: ["non"],
    comparator: "contains_keyword",
    hint: "Cherche si on peut obtenir l’une en multipliant l’autre en haut et en bas par le même nombre.",
    explanation:
      "2/3 ne devient pas 4/5 en multipliant le numérateur et le dénominateur par un même nombre. Ces fractions ne sont donc pas égales.",
    tags: ["fractions", "fractions_egales"],
  },
  {
    kind: "fixed",
    id: "fraction_egales_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_egales",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est égale à 3/4 ?",
    format: "qcm",
    choices: ["6/8", "5/8", "9/10", "4/3"],
    expected: ["6/8"],
    comparator: "mcq_exact",
    hint: "Multiplie 3 et 4 par le même nombre.",
    explanation:
      "3/4 = 6/8 car 3 × 2 = 6 et 4 × 2 = 8.",
    tags: ["fractions", "fractions_egales", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_egales_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_egales",
    difficulty: 2,
    theme: "neutral",
    hint: "On peut multiplier le numérateur et le dénominateur par le même nombre.",
    tags: ["fractions", "fractions_egales", "template"],
    generate: () => {
      const n = randomChoice([1, 2, 3, 4, 5]);
      const d = randomChoice([2, 3, 4, 5, 6]);
      const k = randomChoice([2, 3, 4]);
      const isEqual = Math.random() > 0.5;
      const n2 = n * k;
      const d2 = isEqual ? d * k : d * k + 1;

      return {
        text: `${n}/${d} et ${n2}/${d2} sont-elles égales ?`,
        format: "short",
        expected: [isEqual ? "oui" : "non"],
        comparator: "contains_keyword",
        explanation: isEqual
          ? `${n}/${d} = ${n2}/${d2} car on a multiplié le numérateur et le dénominateur par ${k}.`
          : `${n}/${d} et ${n2}/${d2} ne sont pas égales car le numérateur et le dénominateur n’ont pas été transformés avec le même coefficient.`,
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
    notionId: "fractions",
    microId: "fraction_simplifier",
    difficulty: 1,
    theme: "neutral",
    text: "Simplifie 6/8.",
    format: "short",
    expected: ["3/4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Divise le numérateur et le dénominateur par leur plus grand diviseur commun.",
    explanation:
      "6 et 8 sont divisibles par 2. On obtient 6/8 = 3/4.",
    tags: ["fractions", "simplifier"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_simplifier",
    difficulty: 1,
    theme: "neutral",
    text: "Simplifie 9/12.",
    format: "short",
    expected: ["3/4"],
    comparator: "fraction_decimal_equivalent",
    hint: "9 et 12 ont un diviseur commun.",
    explanation:
      "9 et 12 sont divisibles par 3. Donc 9/12 = 3/4.",
    tags: ["fractions", "simplifier"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme simplifiée de 15/20 ?",
    format: "qcm",
    choices: ["3/4", "5/4", "10/15", "4/3"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "15 et 20 sont divisibles par 5.",
    explanation:
      "15/20 = 3/4 car on divise 15 et 20 par 5.",
    tags: ["fractions", "simplifier", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le plus grand diviseur commun.",
    tags: ["fractions", "simplifier", "template"],
    generate: () => {
      const a = randomChoice([1, 2, 3, 4, 5, 6]);
      const b = randomChoice([2, 3, 4, 5, 6, 7]);
      const k = randomChoice([2, 3, 4]);
      const n = a * k;
      const d = b * k;
      const simp = simplifyFraction(n, d);

      return {
        text: `Simplifie ${n}/${d}.`,
        format: "short",
        expected: [fractionStr(simp.n, simp.d)],
        comparator: "fraction_decimal_equivalent",
        explanation: `${n}/${d} = ${simp.n}/${simp.d} après simplification.`,
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
    notionId: "fractions",
    microId: "fraction_rationnel",
    difficulty: 1,
    theme: "neutral",
    text: "Une fraction comme 3/5 représente-t-elle un nombre rationnel ?",
    format: "short",
    expected: ["oui"],
    comparator: "contains_keyword",
    hint: "Un nombre rationnel peut s’écrire comme quotient de deux entiers.",
    explanation:
      "3/5 est un quotient de deux entiers. C’est donc un nombre rationnel.",
    tags: ["fractions", "rationnel"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Écris le nombre rationnel 'moins deux tiers' sous forme de fraction.",
    format: "short",
    expected: ["-2/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Place le signe moins devant la fraction.",
    explanation:
      "Le nombre 'moins deux tiers' s’écrit -2/3.",
    tags: ["fractions", "rationnel"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
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
      "7/4 est le quotient de deux entiers. C’est un nombre rationnel.",
    tags: ["fractions", "rationnel", "qcm"],
  },

  // =========================
  // FRACTION_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus grand : 1/2 ou 3/4 ?",
    format: "short",
    expected: ["3/4"],
    comparator: "contains_keyword",
    hint: "Tu peux comparer leurs valeurs décimales ou utiliser des fractions de même dénominateur.",
    explanation:
      "1/2 = 2/4, donc 3/4 est plus grand que 1/2.",
    tags: ["fractions", "comparer"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Compare 2/3 et 3/5. Réponds par >, < ou =.",
    format: "short",
    expected: [">"],
    comparator: "contains_keyword",
    hint: "Tu peux comparer 2 × 5 et 3 × 3.",
    explanation:
      "2/3 et 3/5 : 2 × 5 = 10 et 3 × 3 = 9, donc 2/3 > 3/5.",
    tags: ["fractions", "comparer"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
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
      "2/3 ≈ 0,67 ; 3/4 = 0,75 ; 5/6 ≈ 0,83 ; 7/8 = 0,875. La plus petite est 2/3.",
    tags: ["fractions", "comparer", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare par produit en croix ou en mettant au même dénominateur.",
    tags: ["fractions", "comparer", "template"],
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
        text: `Compare ${n1}/${d1} et ${n2}/${d2}. Réponds par >, < ou =.`,
        format: "short",
        expected: [sign],
        comparator: "contains_keyword",
        explanation: `${n1}/${d1} ${sign} ${n2}/${d2}.`,
      };
    },
  },

  // =========================
  // FRACTION_ADDITION
  // =========================
  {
    kind: "fixed",
    id: "fraction_addition_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 1/4 + 2/4.",
    format: "short",
    expected: ["3/4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Les dénominateurs sont déjà égaux.",
    explanation:
      "1/4 + 2/4 = 3/4.",
    tags: ["fractions", "addition"],
  },
  {
    kind: "fixed",
    id: "fraction_addition_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 3/5 - 1/5.",
    format: "short",
    expected: ["2/5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Quand les dénominateurs sont égaux, on additionne ou on soustrait seulement les numérateurs.",
    explanation:
      "3/5 - 1/5 = 2/5.",
    tags: ["fractions", "addition", "soustraction"],
  },
  {
    kind: "fixed",
    id: "fraction_addition_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_addition",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 1/2 + 1/3.",
    format: "short",
    expected: ["5/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "Mets les fractions au même dénominateur.",
    explanation:
      "1/2 = 3/6 et 1/3 = 2/6, donc 1/2 + 1/3 = 5/6.",
    tags: ["fractions", "addition"],
  },
  {
    kind: "fixed",
    id: "fraction_addition_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_addition",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, Inès mange 1/4 d’un gâteau le matin puis 1/2 du même gâteau à midi. Quelle quantité a-t-elle mangée en tout ?",
    format: "qcm",
    choices: ["2/3", "3/4", "1", "5/8"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Transforme 1/2 en une fraction de dénominateur 4.",
    explanation:
      "1/2 = 2/4. Donc 1/4 + 2/4 = 3/4.",
    tags: ["fractions", "addition", "qcm", "reunion"],
  },
  {
    kind: "template",
    id: "fraction_addition_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_addition",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par mettre les fractions au même dénominateur.",
    tags: ["fractions", "addition", "template"],
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
        text: `Calcule ${n1}/${d1} + ${n2}/${d2}.`,
        format: "short",
        expected: [fractionStr(simp.n, simp.d)],
        comparator: "fraction_decimal_equivalent",
        explanation: `${n1}/${d1} + ${n2}/${d2} = ${n1 * d2}/${d1 * d2} + ${n2 * d1}/${d1 * d2} = ${(n1 * d2) + (n2 * d1)}/${d1 * d2} = ${simp.n}/${simp.d}.`,
      };
    },
  },

  // =========================
  // FRACTION_PRODUIT
  // =========================
  {
    kind: "fixed",
    id: "fraction_produit_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_produit",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 2/3 × 3/4.",
    format: "short",
    expected: ["1/2", "6/12"],
    comparator: "fraction_decimal_equivalent",
    hint: "Multiplie les numérateurs entre eux, puis les dénominateurs entre eux.",
    explanation:
      "2/3 × 3/4 = 6/12 = 1/2.",
    tags: ["fractions", "produit"],
  },
  {
    kind: "fixed",
    id: "fraction_produit_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_produit",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 5/6 × 2/5.",
    format: "short",
    expected: ["1/3", "10/30"],
    comparator: "fraction_decimal_equivalent",
    hint: "Puis simplifie le résultat.",
    explanation:
      "5/6 × 2/5 = 10/30 = 1/3.",
    tags: ["fractions", "produit"],
  },
  {
    kind: "fixed",
    id: "fraction_produit_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_produit",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le résultat de 3/4 × 2/3 ?",
    format: "qcm",
    choices: ["1/2", "5/7", "6/7", "2/5"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "Multiplie et simplifie.",
    explanation:
      "3/4 × 2/3 = 6/12 = 1/2.",
    tags: ["fractions", "produit", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_produit_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_produit",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie en haut et en bas, puis simplifie.",
    tags: ["fractions", "produit", "template"],
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
        text: `Calcule ${n1}/${d1} × ${n2}/${d2}.`,
        format: "short",
        expected: [fractionStr(simp.n, simp.d)],
        comparator: "fraction_decimal_equivalent",
        explanation: `${n1}/${d1} × ${n2}/${d2} = ${n1 * n2}/${d1 * d2} = ${simp.n}/${simp.d}.`,
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
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 3/4 de 20.",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Prendre 3/4 d’un nombre, c’est multiplier ce nombre par 3/4.",
    explanation:
      "3/4 de 20 = 20 × 3/4 = 15.",
    tags: ["fractions", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 2/5 de 30.",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Commence par calculer 1/5 de 30.",
    explanation:
      "1/5 de 30 vaut 6, donc 2/5 de 30 vaut 12.",
    tags: ["fractions", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "cuisine",
    text: "Pour une recette, Léa utilise 3/4 d’un paquet de 28 biscuits. Combien de biscuits cela représente-t-il ?",
    format: "short",
    expected: ["21"],
    comparator: "number_equal",
    hint: "Calcule 1/4 puis multiplie par 3.",
    explanation:
      "1/4 de 28 vaut 7, donc 3/4 de 28 vaut 21.",
    tags: ["fractions", "quantite", "cuisine"],
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par partager la quantité en parts égales.",
    tags: ["fractions", "quantite", "template"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5, 6]);
      const n = randomChoice([1, 2, 3, 4]);
      const baseUnit = randomChoice([4, 5, 6, 8, 10]);
      const quantity = d * baseUnit;
      const good = (quantity * n) / d;

      return {
        text: `Calcule ${n}/${d} de ${quantity}.`,
        format: "short",
        expected: [String(good)],
        comparator: "number_equal",
        explanation: `${n}/${d} de ${quantity} = ${quantity} × ${n}/${d} = ${good}.`,
      };
    },
  },

  // =========================
  // FRACTION_INVERSE
  // =========================
  {
    kind: "fixed",
    id: "fraction_inverse_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’inverse de 2/3 ?",
    format: "short",
    expected: ["3/2"],
    comparator: "fraction_decimal_equivalent",
    hint: "On échange le numérateur et le dénominateur.",
    explanation:
      "L’inverse de 2/3 est 3/2.",
    tags: ["fractions", "inverse"],
  },
  {
    kind: "fixed",
    id: "fraction_inverse_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’inverse de -5/7 ?",
    format: "short",
    expected: ["-7/5"],
    comparator: "fraction_decimal_equivalent",
    hint: "On échange le haut et le bas, en gardant le signe.",
    explanation:
      "L’inverse de -5/7 est -7/5.",
    tags: ["fractions", "inverse"],
  },
  {
    kind: "fixed",
    id: "fraction_inverse_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_inverse",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l’inverse de 4/9 ?",
    format: "qcm",
    choices: ["9/4", "4/9", "-9/4", "-4/9"],
    expected: ["9/4"],
    comparator: "mcq_exact",
    hint: "On retourne la fraction.",
    explanation:
      "L’inverse de 4/9 est 9/4.",
    tags: ["fractions", "inverse", "qcm"],
  },

  // =========================
  // FRACTION_DIVISION
  // =========================
  {
    kind: "fixed",
    id: "fraction_division_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_division",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 2/3 ÷ 4/5.",
    format: "short",
    expected: ["5/6", "10/12"],
    comparator: "fraction_decimal_equivalent",
    hint: "Diviser par une fraction, c’est multiplier par son inverse.",
    explanation:
      "2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6.",
    tags: ["fractions", "division"],
  },
  {
    kind: "fixed",
    id: "fraction_division_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_division",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 3/4 ÷ 2/3.",
    format: "short",
    expected: ["9/8"],
    comparator: "fraction_decimal_equivalent",
    hint: "Multiplie par l’inverse de 2/3.",
    explanation:
      "3/4 ÷ 2/3 = 3/4 × 3/2 = 9/8.",
    tags: ["fractions", "division"],
  },
  {
    kind: "fixed",
    id: "fraction_division_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_division",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le résultat de 5/6 ÷ 5/3 ?",
    format: "qcm",
    choices: ["1/2", "2/3", "3/2", "1"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "Multiplie 5/6 par l’inverse de 5/3.",
    explanation:
      "5/6 ÷ 5/3 = 5/6 × 3/5 = 15/30 = 1/2.",
    tags: ["fractions", "division", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_division_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_division",
    difficulty: 4,
    theme: "neutral",
    hint: "Inverse la deuxième fraction puis multiplie.",
    tags: ["fractions", "division", "template"],
    generate: () => {
      const pairs = [
        [2, 3, 4, 5],
        [3, 4, 2, 3],
        [5, 6, 5, 3],
        [3, 5, 9, 10],
      ];
      const [n1, d1, n2, d2] = randomChoice(pairs);
      const simp = simplifyFraction(n1 * d2, d1 * n2);

      return {
        text: `Calcule ${n1}/${d1} ÷ ${n2}/${d2}.`,
        format: "short",
        expected: [fractionStr(simp.n, simp.d)],
        comparator: "fraction_decimal_equivalent",
        explanation: `${n1}/${d1} ÷ ${n2}/${d2} = ${n1}/${d1} × ${d2}/${n2} = ${simp.n}/${simp.d}.`,
      };
    },
  },

  // =========================
  // FRACTION_OPPOSE
  // =========================
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_oppose",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’opposé de 3/5 ?",
    format: "short",
    expected: ["-3/5"],
    comparator: "fraction_decimal_equivalent",
    hint: "L’opposé a la même distance à 0 mais un signe contraire.",
    explanation:
      "L’opposé de 3/5 est -3/5.",
    tags: ["fractions", "oppose"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’opposé de -7/9 ?",
    format: "short",
    expected: ["7/9"],
    comparator: "fraction_decimal_equivalent",
    hint: "On change simplement le signe.",
    explanation:
      "L’opposé de -7/9 est 7/9.",
    tags: ["fractions", "oppose"],
  },

  // =========================
  // FRACTION_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "fraction_defis_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 1/3 est plus grand que 1/4.",
    format: "short",
    expected: ["plus grand", "parts", "quart", "tiers"],
    comparator: "contains_keyword",
    hint: "Quand on partage la même quantité en moins de parts, les parts sont plus grandes.",
    explanation:
      "Si on partage une même quantité en 3 parts égales, chaque part est plus grande que si on la partage en 4 parts égales. Donc 1/3 > 1/4.",
    tags: ["fractions", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "fraction_defis_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_defis",
    difficulty: 4,
    theme: "cuisine",
    text: "Une recette utilise 2/3 d’un litre de lait. Léa ne veut préparer que la moitié de la recette. Quelle quantité de lait doit-elle utiliser ?",
    format: "short",
    expected: ["1/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Prendre la moitié de 2/3, c’est multiplier par 1/2.",
    explanation:
      "La moitié de 2/3 vaut 2/3 × 1/2 = 2/6 = 1/3. Il faut donc 1/3 de litre de lait.",
    tags: ["fractions", "defi", "cuisine"],
  },
  {
    kind: "fixed",
    id: "fraction_defis_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_defis",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, Enzo mange 3/4 d’un gâteau le midi puis 1/6 du même gâteau le soir. Quelle quantité a-t-il mangée en tout ?",
    format: "qcm",
    choices: ["5/6", "7/12", "11/12", "1"],
    expected: ["11/12"],
    comparator: "mcq_exact",
    hint: "Mets les fractions au même dénominateur.",
    explanation:
      "3/4 = 9/12 et 1/6 = 2/12. Donc 9/12 + 2/12 = 11/12.",
    tags: ["fractions", "defi", "qcm", "reunion"],
  },
    /* =========================
     QUESTIONS OUVERTES — FRACTIONS
  ========================= */
  {
    kind: "fixed",
    id: "fraction_egales_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_egales",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 1/2 et 2/4 représentent la même quantité.",
    format: "open",
    expected: ["multiplie", "numérateur", "dénominateur", "2"],
    comparator: "contains_keyword",
    hint: "On passe de 1/2 à 2/4 en multipliant en haut et en bas par le même nombre.",
    explanation: "1/2 = 2/4 car on multiplie le numérateur et le dénominateur par 2.",
    tags: ["fractions", "open", "fractions_egales"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment simplifier la fraction 12/18.",
    format: "open",
    expected: ["divise", "6", "2/3"],
    comparator: "contains_keyword",
    hint: "Cherche un diviseur commun à 12 et 18.",
    explanation: "12 et 18 sont divisibles par 6. Donc 12/18 = 2/3.",
    tags: ["fractions", "open", "simplifier"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 2/3 est plus grand que 3/5.",
    format: "open",
    expected: ["2/3", "3/5", "10", "9"],
    comparator: "contains_keyword",
    hint: "Tu peux comparer par produit en croix.",
    explanation: "On compare 2 × 5 = 10 et 3 × 3 = 9. Comme 10 > 9, alors 2/3 > 3/5.",
    tags: ["fractions", "open", "comparer"],
  },
  {
    kind: "fixed",
    id: "fraction_addition_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_addition",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 1/2 + 1/3 = 5/6.",
    format: "open",
    expected: ["même dénominateur", "3/6", "2/6", "5/6"],
    comparator: "contains_keyword",
    hint: "Mets 1/2 et 1/3 au même dénominateur.",
    explanation: "1/2 = 3/6 et 1/3 = 2/6. Donc 1/2 + 1/3 = 3/6 + 2/6 = 5/6.",
    tags: ["fractions", "open", "addition"],
  },
  {
    kind: "fixed",
    id: "fraction_produit_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_produit",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer 2/3 × 3/4.",
    format: "open",
    expected: ["multiplie", "numérateurs", "dénominateurs", "1/2"],
    comparator: "contains_keyword",
    hint: "Multiplie les numérateurs entre eux et les dénominateurs entre eux.",
    explanation: "2/3 × 3/4 = 6/12, puis on simplifie : 6/12 = 1/2.",
    tags: ["fractions", "open", "produit"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer 3/4 de 20.",
    format: "open",
    expected: ["20", "4", "5", "15"],
    comparator: "contains_keyword",
    hint: "Commence par calculer 1/4 de 20.",
    explanation: "1/4 de 20 vaut 5, donc 3/4 de 20 vaut 3 × 5 = 15.",
    tags: ["fractions", "open", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce qu’est l’opposé de 3/5.",
    format: "open",
    expected: ["signe", "-3/5", "0"],
    comparator: "contains_keyword",
    hint: "Deux nombres opposés ont des signes contraires et leur somme vaut 0.",
    explanation: "L’opposé de 3/5 est -3/5. Les deux nombres ont des signes contraires et leur somme vaut 0.",
    tags: ["fractions", "open", "oppose"],
  },
  {
    kind: "fixed",
    id: "fraction_defis_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : 1/2 + 1/3 = 2/5. Explique son erreur.",
    format: "open",
    expected: ["dénominateur", "même dénominateur", "5/6", "erreur"],
    comparator: "contains_keyword",
    hint: "On n’additionne pas les dénominateurs entre eux.",
    explanation: "L’élève additionne les numérateurs et les dénominateurs séparément. Il faut mettre au même dénominateur : 1/2 = 3/6 et 1/3 = 2/6, donc le résultat est 5/6.",
    tags: ["fractions", "open", "defi", "erreur"],
  },
];