// lib/tutor-v4/question-banks/maths/4e/fractions.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}

function simplify(n: number, d: number) {
  const g = pgcd(n, d);
  return { n: n / g, d: d / g };
}

function frac(n: number, d: number) {
  return `${n}/${d}`;
}

export const fractionsBank: TutorBankItemV4[] = [
  // =========================
  // FRACTION_EGALES
  // =========================
  {
    kind: "fixed",
    id: "fraction_egales_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_egales",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction est égale à 1/2 ?",
    format: "qcm",
    choices: ["2/4", "1/3", "3/5", "2/3"],
    expected: ["2/4"],
    comparator: "mcq_exact",
    hint: "Multiplie le numérateur et le dénominateur par le même nombre.",
    explanation: "1/2 = 2/4 car on multiplie 1 et 2 par 2.",
    tags: ["fractions", "egales", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_egales_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_egales",
    difficulty: 1,
    theme: "neutral",
    hint: "Deux fractions sont égales si on multiplie haut et bas par le même nombre.",
    tags: ["fractions", "egales", "template"],
    generate: () => {
      const n = randomInt(1, 8);
      const d = randomInt(n + 1, 12);
      const k = randomInt(2, 5);
      return {
        text: `Compléter : ${n}/${d} = ?`,
        format: "qcm",
        choices: [
          `${n * k}/${d * k}`,
          `${n + k}/${d}`,
          `${n}/${d + k}`,
          `${d}/${n}`,
        ],
        expected: [`${n * k}/${d * k}`],
        comparator: "mcq_exact",
        explanation: `On multiplie le numérateur et le dénominateur par ${k} : ${n}/${d} = ${n * k}/${d * k}.`,
      };
    },
  },

  // =========================
  // FRACTION_SIMPLIFIER
  // =========================
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_simplifier",
    difficulty: 1,
    theme: "neutral",
    text: "Simplifier 6/8.",
    format: "qcm",
    choices: ["3/4", "2/4", "6/4", "1/2"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Divise le numérateur et le dénominateur par 2.",
    explanation: "6/8 = 3/4 car on divise 6 et 8 par 2.",
    tags: ["fractions", "simplifier"],
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche un diviseur commun.",
    tags: ["fractions", "simplifier", "template"],
    generate: () => {
      const n0 = randomInt(1, 8);
      const d0 = randomInt(n0 + 1, 12);
      const k = randomInt(2, 6);
      const n = n0 * k;
      const d = d0 * k;

      return {
        text: `Simplifier la fraction ${n}/${d}.`,
        format: "short",
        expected: [`${n0}/${d0}`],
        comparator: "contains_keyword",
        explanation: `On divise ${n} et ${d} par ${k} : ${n}/${d} = ${n0}/${d0}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 8/12 peut se simplifier en 2/3.",
    format: "open",
    expected: ["divise", "4", "2/3"],
    comparator: "contains_keyword",
    hint: "Cherche par quel nombre on divise 8 et 12.",
    explanation: "On divise 8 et 12 par 4 : 8/12 = 2/3.",
    tags: ["fractions", "simplifier", "open"],
  },

  // =========================
  // FRACTION_DECIMAL
  // =========================
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_decimal",
    difficulty: 1,
    theme: "neutral",
    text: "À quel nombre décimal correspond 1/2 ?",
    format: "qcm",
    choices: ["0,2", "0,5", "1,2", "2"],
    expected: ["0,5"],
    comparator: "mcq_exact",
    hint: "1 ÷ 2 = 0,5.",
    explanation: "1/2 = 1 ÷ 2 = 0,5.",
    tags: ["fractions", "decimal"],
  },
  {
    kind: "template",
    id: "fraction_decimal_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule le numérateur divisé par le dénominateur.",
    tags: ["fractions", "decimal", "template"],
    generate: () => {
      const items = [
        { f: "1/2", d: "0,5" },
        { f: "1/4", d: "0,25" },
        { f: "3/4", d: "0,75" },
        { f: "1/5", d: "0,2" },
        { f: "1/10", d: "0,1" },
      ];
      const item = randomChoice(items);

      return {
        text: `À quel nombre décimal correspond ${item.f} ?`,
        format: "qcm",
        choices: [item.d, "0,3", "1,5", "2,5"].filter(
          (v, i, arr) => arr.indexOf(v) === i
        ),
        expected: [item.d],
        comparator: "mcq_exact",
        explanation: `${item.f} correspond à ${item.d}.`,
      };
    },
  },

  // =========================
  // FRACTION_RATIONNEL
  // =========================
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_rationnel",
    difficulty: 1,
    theme: "neutral",
    text: "Un nombre rationnel peut s’écrire sous la forme…",
    format: "qcm",
    choices: ["a/b avec b non nul", "a/b avec b = 0", "toujours un entier", "toujours positif"],
    expected: ["a/b avec b non nul"],
    comparator: "mcq_exact",
    hint: "Le dénominateur ne doit pas être nul.",
    explanation: "Un nombre rationnel peut s’écrire a/b avec b différent de 0.",
    tags: ["fractions", "rationnel"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 0,5 est un nombre rationnel.",
    format: "open",
    expected: ["0,5", "1/2", "fraction"],
    comparator: "contains_keyword",
    hint: "Essaie d’écrire 0,5 sous forme de fraction.",
    explanation: "0,5 = 1/2. Comme il peut s’écrire sous forme de fraction, c’est un nombre rationnel.",
    tags: ["fractions", "rationnel", "open"],
  },

  // =========================
  // FRACTION_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est la plus grande ?",
    format: "qcm",
    choices: ["1/2", "1/3", "1/4", "1/5"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "À numérateur égal, plus le dénominateur est petit, plus la fraction est grande.",
    explanation: "1/2 est plus grand que 1/3, 1/4 et 1/5.",
    tags: ["fractions", "comparer"],
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Mets au même dénominateur ou compare les produits en croix.",
    tags: ["fractions", "comparer", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = randomInt(a + 1, 9);
      const c = randomInt(1, 5);
      const d = randomInt(c + 1, 9);
      const left = a / b;
      const right = c / d;
      const correct = left > right ? `${a}/${b}` : `${c}/${d}`;

      return {
        text: `Quelle fraction est la plus grande : ${a}/${b} ou ${c}/${d} ?`,
        format: "qcm",
        choices: [`${a}/${b}`, `${c}/${d}`, "elles sont égales"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: `On compare ${a} × ${d} = ${a * d} et ${c} × ${b} = ${c * b}. La plus grande fraction est ${correct}.`,
      };
    },
  },

  // =========================
  // FRACTION_ADDITION
  // =========================
  {
    kind: "fixed",
    id: "fraction_addition_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 1/4 + 2/4.",
    format: "qcm",
    choices: ["3/4", "3/8", "2/8", "1/2"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Les dénominateurs sont déjà les mêmes.",
    explanation: "1/4 + 2/4 = 3/4.",
    tags: ["fractions", "addition"],
  },
  {
    kind: "template",
    id: "fraction_addition_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_addition",
    difficulty: 3,
    theme: "neutral",
    hint: "Mets les fractions au même dénominateur.",
    tags: ["fractions", "addition", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6, 8, 10]);
      const a = randomInt(1, d - 1);
      const b = randomInt(1, d - 1);
      const s = simplify(a + b, d);

      return {
        text: `Calculer ${a}/${d} + ${b}/${d}.`,
        format: "short",
        expected: [`${s.n}/${s.d}`, `${a + b}/${d}`],
        comparator: "contains_keyword",
        explanation: `${a}/${d} + ${b}/${d} = ${a + b}/${d}, soit ${s.n}/${s.d} si on simplifie.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "fraction_addition_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_addition",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 1/2 + 1/3 ne vaut pas 2/5.",
    format: "open",
    expected: ["dénominateur", "commun", "5/6"],
    comparator: "contains_keyword",
    hint: "On n’additionne pas les dénominateurs.",
    explanation: "Il faut mettre au même dénominateur : 1/2 = 3/6 et 1/3 = 2/6, donc 1/2 + 1/3 = 5/6.",
    tags: ["fractions", "addition", "erreur", "open"],
  },

  // =========================
  // FRACTION_PRODUIT
  // =========================
  {
    kind: "fixed",
    id: "fraction_produit_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_produit",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 2/3 × 3/5.",
    format: "qcm",
    choices: ["6/15", "5/8", "6/8", "1/5"],
    expected: ["6/15"],
    comparator: "mcq_exact",
    hint: "On multiplie les numérateurs entre eux et les dénominateurs entre eux.",
    explanation: "2/3 × 3/5 = (2×3)/(3×5) = 6/15.",
    tags: ["fractions", "produit"],
  },
  {
    kind: "template",
    id: "fraction_produit_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_produit",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie haut avec haut, bas avec bas.",
    tags: ["fractions", "produit", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = randomInt(2, 8);
      const c = randomInt(1, 5);
      const d = randomInt(2, 8);
      const s = simplify(a * c, b * d);

      return {
        text: `Calculer ${a}/${b} × ${c}/${d}.`,
        format: "short",
        expected: [`${s.n}/${s.d}`, `${a * c}/${b * d}`],
        comparator: "contains_keyword",
        explanation: `${a}/${b} × ${c}/${d} = ${a * c}/${b * d}, soit ${s.n}/${s.d} si on simplifie.`,
      };
    },
  },

  // =========================
  // FRACTION_INVERSE
  // =========================
  {
    kind: "fixed",
    id: "fraction_inverse_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’inverse de 3/5 ?",
    format: "qcm",
    choices: ["5/3", "-3/5", "3/5", "2/5"],
    expected: ["5/3"],
    comparator: "mcq_exact",
    hint: "On inverse le numérateur et le dénominateur.",
    explanation: "L’inverse de 3/5 est 5/3 car 3/5 × 5/3 = 1.",
    tags: ["fractions", "inverse"],
  },
  {
    kind: "template",
    id: "fraction_inverse_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    hint: "Échange le numérateur et le dénominateur.",
    tags: ["fractions", "inverse", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);

      return {
        text: `Quel est l’inverse de ${a}/${b} ?`,
        format: "short",
        expected: [`${b}/${a}`],
        comparator: "contains_keyword",
        explanation: `L’inverse de ${a}/${b} est ${b}/${a}.`,
      };
    },
  },

  // =========================
  // FRACTION_DIVISION
  // =========================
  {
    kind: "fixed",
    id: "fraction_division_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_division",
    difficulty: 3,
    theme: "neutral",
    text: "Diviser par 2/3 revient à multiplier par…",
    format: "qcm",
    choices: ["2/3", "3/2", "-2/3", "1/3"],
    expected: ["3/2"],
    comparator: "mcq_exact",
    hint: "On multiplie par l’inverse.",
    explanation: "Diviser par 2/3 revient à multiplier par son inverse, donc par 3/2.",
    tags: ["fractions", "division"],
  },
  {
    kind: "template",
    id: "fraction_division_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_division",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplier par l’inverse de la deuxième fraction.",
    tags: ["fractions", "division", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = randomInt(2, 8);
      const c = randomInt(1, 5);
      const d = randomInt(2, 8);
      const s = simplify(a * d, b * c);

      return {
        text: `Calculer ${a}/${b} ÷ ${c}/${d}.`,
        format: "short",
        expected: [`${s.n}/${s.d}`, `${a * d}/${b * c}`],
        comparator: "contains_keyword",
        explanation: `${a}/${b} ÷ ${c}/${d} = ${a}/${b} × ${d}/${c} = ${a * d}/${b * c}, soit ${s.n}/${s.d}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "fraction_division_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_division",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la méthode pour diviser par une fraction.",
    format: "open",
    expected: ["multiplier", "inverse"],
    comparator: "contains_keyword",
    hint: "On ne divise pas directement : on transforme.",
    explanation: "Pour diviser par une fraction, on multiplie par son inverse.",
    tags: ["fractions", "division", "open"],
  },

  // =========================
  // FRACTION_QUANTITE
  // =========================
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 3/4 de 20.",
    format: "qcm",
    choices: ["15", "12", "10", "5"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "On calcule 20 ÷ 4 puis on multiplie par 3.",
    explanation: "3/4 de 20 = 20 × 3/4 = 15.",
    tags: ["fractions", "quantite"],
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "reunion",
    hint: "Prends la fraction de la quantité totale.",
    tags: ["fractions", "quantite", "reunion", "template"],
    generate: () => {
      const den = randomChoice([2, 3, 4, 5]);
      const num = randomInt(1, den - 1);
      const total = den * randomInt(4, 12);
      const result = (total / den) * num;

      return {
        text: `Au marché, un panier contient ${total} fruits. ${num}/${den} des fruits sont des mangues. Combien y a-t-il de mangues ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: `${num}/${den} de ${total} = ${total} ÷ ${den} × ${num} = ${result}.`,
      };
    },
  },

  // =========================
  // FRACTION_OPPOSE
  // =========================
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’opposé de 3/7 ?",
    format: "qcm",
    choices: ["-3/7", "7/3", "3/-7", "3/7"],
    expected: ["-3/7"],
    comparator: "mcq_exact",
    hint: "L’opposé change le signe.",
    explanation: "L’opposé de 3/7 est -3/7.",
    tags: ["fractions", "oppose"],
  },
  {
    kind: "template",
    id: "fraction_oppose_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    hint: "Change seulement le signe.",
    tags: ["fractions", "oppose", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      const b = randomInt(2, 10);
      return {
        text: `Quel est l’opposé de ${a}/${b} ?`,
        format: "short",
        expected: [`-${a}/${b}`],
        comparator: "contains_keyword",
        explanation: `L’opposé de ${a}/${b} est -${a}/${b}.`,
      };
    },
  },

  // =========================
  // FRACTION_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "fraction_defis_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme que 1/2 + 1/3 = 2/5. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On n’additionne pas les dénominateurs.",
    explanation: "Non. 1/2 + 1/3 = 3/6 + 2/6 = 5/6.",
    tags: ["fractions", "defi", "erreur"],
  },
  {
    kind: "template",
    id: "fraction_defis_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fractions",
    microId: "fraction_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Repère l’erreur classique.",
    tags: ["fractions", "defi", "open", "erreur"],
    generate: () => {
      return {
        text: "Explique pourquoi on ne peut pas additionner directement les dénominateurs dans une addition de fractions.",
        format: "open",
        expected: ["dénominateur", "commun", "même"],
        comparator: "contains_keyword",
        explanation:
          "Pour additionner des fractions, il faut les mettre au même dénominateur. On additionne ensuite les numérateurs, mais pas les dénominateurs.",
      };
    },
  },
];