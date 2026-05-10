// lib/tutor-v4/question-banks/maths/4e/fractions.bank.ts
import type {
  TutorBankItemV4,
  FractionCanvasData,
} from "@/lib/tutor-v4/types";

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

function fractionCanvas(
  data: Omit<FractionCanvasData, "kind">
): FractionCanvasData {
  return { kind: "fraction", ...data };
}


export const fractionsBank: TutorBankItemV4[] = [
  // =========================
  // FRACTION_EGALES
  // =========================
  {
    kind: "fixed",
    id: "fraction_egale_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction est égale à 1/2 ?",
    format: "qcm",
    choices: ["2/4", "1/3", "3/5", "2/3"],
    expected: ["2/4"],
    comparator: "mcq_exact",
    hint: "Multiplie le numérateur et le dénominateur par le même nombre.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("1/2 = 2/4 car on multiplie 1 et 2 par 2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "egales", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_egale_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 1,
    theme: "neutral",
    hint: "Deux fractions sont égales si on multiplie haut et bas par le même nombre.",
    tags: ["fraction_nombre", "egales", "template"],
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
        explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          (`On multiplie le numérateur et le dénominateur par ${k} : ${n}/${d} = ${n * k}/${d * k}.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
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
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 1,
    theme: "neutral",
    text: "Simplifier 6/8.",
    format: "qcm",
    choices: ["3/4", "2/4", "6/4", "1/2"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Divise le numérateur et le dénominateur par 2.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("6/8 = 3/4 car on divise 6 et 8 par 2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "simplifier"],
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche un diviseur commun.",
    tags: ["fraction_nombre", "simplifier", "template"],
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
        explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          (`On divise ${n} et ${d} par ${k} : ${n}/${d} = ${n0}/${d0}.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
      };
    },
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 8/12 peut se simplifier en 2/3.",
    format: "open",
    expected: ["divise", "4", "2/3"],
    comparator: "contains_keyword",
    hint: "Cherche par quel nombre on divise 8 et 12.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("On divise 8 et 12 par 4 : 8/12 = 2/3.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "simplifier", "open"],
  },

  // =========================
  // FRACTION_DECIMAL
  // =========================
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 1,
    theme: "neutral",
    text: "À quel nombre décimal correspond 1/2 ?",
    format: "qcm",
    choices: ["0,2", "0,5", "1,2", "2"],
    expected: ["0,5"],
    comparator: "mcq_exact",
    hint: "1 ÷ 2 = 0,5.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("1/2 = 1 ÷ 2 = 0,5.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "decimal"],
  },
  {
    kind: "template",
    id: "fraction_decimal_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule le numérateur divisé par le dénominateur.",
    tags: ["fraction_nombre", "decimal", "template"],
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
        explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          (`${item.f} correspond à ${item.d}.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
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
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 1,
    theme: "neutral",
    text: "Un nombre rationnel peut s’écrire sous la forme…",
    format: "qcm",
    choices: ["a/b avec b non nul", "a/b avec b = 0", "toujours un entier", "toujours positif"],
    expected: ["a/b avec b non nul"],
    comparator: "mcq_exact",
    hint: "Le dénominateur ne doit pas être nul.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("Un nombre rationnel peut s’écrire a/b avec b différent de 0.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "rationnel"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 0,5 est un nombre rationnel.",
    format: "open",
    expected: ["0,5", "1/2", "fraction"],
    comparator: "contains_keyword",
    hint: "Essaie d’écrire 0,5 sous forme de fraction.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("0,5 = 1/2. Comme il peut s’écrire sous forme de fraction, c’est un nombre rationnel.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "rationnel", "open"],
  },

  // =========================
  // FRACTION_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est la plus grande ?",
    format: "qcm",
    choices: ["1/2", "1/3", "1/4", "1/5"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "À numérateur égal, plus le dénominateur est petit, plus la fraction est grande.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("1/2 est plus grand que 1/3, 1/4 et 1/5.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "comparer"],
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Mets au même dénominateur ou compare les produits en croix.",
    tags: ["fraction_nombre", "comparer", "template"],
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
        explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          (`On compare ${a} × ${d} = ${a * d} et ${c} × ${b} = ${c * b}. La plus grande fraction est ${correct}.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
      };
    },
  },

  // =========================
  // FRACTION_ADDITION
  // =========================
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 1/4 + 2/4.",
    format: "qcm",
    choices: ["3/4", "3/8", "2/8", "1/2"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Les dénominateurs sont déjà les mêmes.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("1/4 + 2/4 = 3/4.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "addition"],
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    hint: "Mets les fractions au même dénominateur.",
    tags: ["fraction_nombre", "addition", "template"],
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
        explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          (`${a}/${d} + ${b}/${d} = ${a + b}/${d}, soit ${s.n}/${s.d} si on simplifie.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
      };
    },
  },
  {
    kind: "fixed",
    id: "fraction_additionner_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 1/2 + 1/3 ne vaut pas 2/5.",
    format: "open",
    expected: ["dénominateur", "commun", "5/6"],
    comparator: "contains_keyword",
    hint: "On n’additionne pas les dénominateurs.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("Il faut mettre au même dénominateur : 1/2 = 3/6 et 1/3 = 2/6, donc 1/2 + 1/3 = 5/6.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "addition", "erreur", "open"],
  },

  // =========================
  // FRACTION_PRODUIT
  // =========================
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 2/3 × 3/5.",
    format: "qcm",
    choices: ["6/15", "5/8", "6/8", "1/5"],
    expected: ["6/15"],
    comparator: "mcq_exact",
    hint: "On multiplie les numérateurs entre eux et les dénominateurs entre eux.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("2/3 × 3/5 = (2×3)/(3×5) = 6/15.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "produit"],
  },
  {
    kind: "template",
    id: "fraction_multiplier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie haut avec haut, bas avec bas.",
    tags: ["fraction_nombre", "produit", "template"],
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
        explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          (`${a}/${b} × ${c}/${d} = ${a * c}/${b * d}, soit ${s.n}/${s.d} si on simplifie.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
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
    notionId: "fraction_nombre",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’inverse de 3/5 ?",
    format: "qcm",
    choices: ["5/3", "-3/5", "3/5", "2/5"],
    expected: ["5/3"],
    comparator: "mcq_exact",
    hint: "On inverse le numérateur et le dénominateur.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("L’inverse de 3/5 est 5/3 car 3/5 × 5/3 = 1.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "inverse"],
  },
  {
    kind: "template",
    id: "fraction_inverse_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    hint: "Échange le numérateur et le dénominateur.",
    tags: ["fraction_nombre", "inverse", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);

      return {
        text: `Quel est l’inverse de ${a}/${b} ?`,
        format: "short",
        expected: [`${b}/${a}`],
        comparator: "contains_keyword",
        explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          (`L’inverse de ${a}/${b} est ${b}/${a}.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
      };
    },
  },

  // =========================
  // FRACTION_DIVISION
  // =========================
  {
    kind: "fixed",
    id: "fraction_diviser_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_diviser",
    difficulty: 3,
    theme: "neutral",
    text: "Diviser par 2/3 revient à multiplier par…",
    format: "qcm",
    choices: ["2/3", "3/2", "-2/3", "1/3"],
    expected: ["3/2"],
    comparator: "mcq_exact",
    hint: "On multiplie par l’inverse.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("Diviser par 2/3 revient à multiplier par son inverse, donc par 3/2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "division"],
  },
  {
    kind: "template",
    id: "fraction_diviser_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_diviser",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplier par l’inverse de la deuxième fraction.",
    tags: ["fraction_nombre", "division", "template"],
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
        explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          (`${a}/${b} ÷ ${c}/${d} = ${a}/${b} × ${d}/${c} = ${a * d}/${b * c}, soit ${s.n}/${s.d}.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
      };
    },
  },
  {
    kind: "fixed",
    id: "fraction_diviser_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_diviser",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la méthode pour diviser par une fraction.",
    format: "open",
    expected: ["multiplier", "inverse"],
    comparator: "contains_keyword",
    hint: "On ne divise pas directement : on transforme.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("Pour diviser par une fraction, on multiplie par son inverse.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "division", "open"],
  },

  // =========================
  // FRACTION_QUANTITE
  // =========================
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 3/4 de 20.",
    format: "qcm",
    choices: ["15", "12", "10", "5"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "On calcule 20 ÷ 4 puis on multiplie par 3.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("3/4 de 20 = 20 × 3/4 = 15.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "reunion",
    hint: "Prends la fraction de la quantité totale.",
    tags: ["fraction_nombre", "quantite", "reunion", "template"],
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
        explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          (`${num}/${den} de ${total} = ${total} ÷ ${den} × ${num} = ${result}.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
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
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’opposé de 3/7 ?",
    format: "qcm",
    choices: ["-3/7", "7/3", "3/-7", "3/7"],
    expected: ["-3/7"],
    comparator: "mcq_exact",
    hint: "L’opposé change le signe.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("L’opposé de 3/7 est -3/7.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "oppose"],
  },
  {
    kind: "template",
    id: "fraction_oppose_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    hint: "Change seulement le signe.",
    tags: ["fraction_nombre", "oppose", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      const b = randomInt(2, 10);
      return {
        text: `Quel est l’opposé de ${a}/${b} ?`,
        format: "short",
        expected: [`-${a}/${b}`],
        comparator: "contains_keyword",
        explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          (`L’opposé de ${a}/${b} est -${a}/${b}.`) +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
      };
    },
  },

  // =========================
  // FRACTION_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "fraction_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme que 1/2 + 1/3 = 2/5. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On n’additionne pas les dénominateurs.",
    explanation: "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("Non. 1/2 + 1/3 = 3/6 + 2/6 = 5/6.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
    tags: ["fraction_nombre", "defi", "erreur"],
  },
  {
    kind: "template",
    id: "fraction_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Repère l’erreur classique.",
    tags: ["fraction_nombre", "defi", "open", "erreur"],
    generate: () => {
      return {
        text: "Explique pourquoi on ne peut pas additionner directement les dénominateurs dans une addition de fractions.",
        format: "open",
        expected: ["dénominateur", "commun", "même"],
        comparator: "contains_keyword",
        explanation:
          "Définition : une fraction représente un quotient ; le numérateur est au-dessus et le dénominateur est en dessous.\n\n" +
          "Méthode : on applique la règle des fractions adaptée : simplifier, comparer, additionner ou multiplier.\n\nCalcul : " +
          ("Pour additionner des fractions, il faut les mettre au même dénominateur. On additionne ensuite les numérateurs, mais pas les dénominateurs.") +
          "\n\nConclusion : la fraction ou le nombre obtenu répond à la question.",
      };
    },
  },
    /* =========================
     RENFORT — FRACTION CANVAS 4e
  ========================= */

  {
    kind: "template",
    id: "4e_fraction_egale_canvas_compare_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe si les deux parties colorées représentent la même proportion.",
    tags: ["fraction_nombre", "egales", "canvas", "compare", "template"],
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
        text: `Les fractions ${s.a[0]}/${s.a[1]} et ${s.b[0]}/${s.b[1]} sont-elles égales ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [s.answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux fractions sont égales si elles représentent le même quotient ou la même proportion.\n\n" +
          "Méthode : on compare les représentations ou on vérifie par multiplication.\n\n" +
          (s.answer === "oui"
            ? `Observation : ${s.a[0]}/${s.a[1]} et ${s.b[0]}/${s.b[1]} représentent la même proportion.\n\n`
            : `Observation : ${s.a[0]}/${s.a[1]} et ${s.b[0]}/${s.b[1]} ne représentent pas la même proportion.\n\n`) +
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
    id: "4e_fraction_simplifier_canvas_bar_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche une fraction plus simple qui représente la même partie colorée.",
    tags: ["fraction_nombre", "simplifier", "canvas", "bar", "template"],
    generate: () => {
      const situations = [
        { n: 4, d: 8 },
        { n: 6, d: 9 },
        { n: 6, d: 12 },
        { n: 8, d: 12 },
        { n: 10, d: 15 },
      ];

      const s = randomChoice(situations);
      const simp = simplify(s.n, s.d);

      return {
        text: `Simplifie la fraction ${s.n}/${s.d}.`,
        format: "short",
        expected: [frac(simp.n, simp.d), frac(s.n, s.d)],
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
    id: "4e_fraction_comparer_canvas_compare_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les portions colorées ou utilise le produit en croix.",
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
        text: `Compare ${s.a[0]}/${s.a[1]} et ${s.b[0]}/${s.b[1]}. Réponds par >, < ou =.`,
        format: "short",
        expected: [sign],
        comparator: "contains_keyword",
        explanation:
          "Définition : comparer deux fractions, c’est comparer les quotients qu’elles représentent.\n\n" +
          "Méthode : on peut observer les portions colorées ou utiliser le produit en croix.\n\n" +
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
    id: "4e_fraction_additionner_canvas_bar_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    hint: "Les dénominateurs sont identiques : additionne les numérateurs.",
    tags: ["fraction_nombre", "addition", "canvas", "bar", "template"],
    generate: () => {
      const d = randomChoice([4, 5, 6, 8, 10]);
      const a = randomInt(1, Math.floor(d / 2));
      const b = randomInt(1, Math.floor(d / 2));
      const total = a + b;
      const simp = simplify(total, d);

      return {
        text: `Calcule ${a}/${d} + ${b}/${d}.`,
        format: "short",
        expected: [frac(simp.n, simp.d), frac(total, d)],
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
    id: "4e_fraction_quantite_canvas_circle_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "reunion",
    hint: "Divise par le dénominateur puis multiplie par le numérateur.",
    tags: ["fraction_nombre", "quantite", "canvas", "circle", "template", "reunion"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6]);
      const n = randomInt(1, d - 1);
      const total = d * randomInt(4, 10);
      const result = (total / d) * n;

      return {
        text: `Au marché, un panier contient ${total} fruits. ${n}/${d} des fruits sont des mangues. Combien y a-t-il de mangues ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : calculer une fraction d’une quantité, c’est prendre une partie de cette quantité.\n\n" +
          "Méthode : on divise par le dénominateur puis on multiplie par le numérateur.\n\n" +
          `Calcul : ${total} ÷ ${d} = ${total / d}, puis ${total / d} × ${n} = ${result}.\n\n` +
          `Conclusion : il y a ${result} mangues.`,
        canvas: fractionCanvas({
          model: "circle",
          fraction: { numerator: n, denominator: d, label: `${n}/${d}` },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "4e_fraction_rationnel_canvas_grid_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    hint: "Un rationnel peut s’écrire comme quotient de deux entiers.",
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
      const simp = simplify(s.shaded, total);

      return {
        text: "Écris la partie colorée sous forme de fraction simplifiée.",
        format: "short",
        expected: [frac(simp.n, simp.d), frac(s.shaded, total)],
        comparator: "fraction_decimal_equivalent",
        explanation:
          "Définition : une fraction est une écriture d’un nombre rationnel.\n\n" +
          "Méthode : on compte les cases colorées et les cases totales, puis on simplifie.\n\n" +
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
    kind: "fixed",
    id: "4e_fraction_piege_parts_inegales_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 3,
    theme: "neutral",
    text: "Deux figures ont 2 parts colorées sur 4. Peut-on toujours dire qu’elles représentent la même fraction ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut vérifier que les parts sont égales.",
    explanation:
      "Définition : une fraction représente des parts égales d’un même tout.\n\n" +
      "Méthode : avant d’écrire ou de comparer une fraction, on vérifie que le partage est régulier.\n\n" +
      "Observation : si les parts ne sont pas égales, l’écriture 2/4 n’est pas fiable.\n\n" +
      "Conclusion : on ne peut pas conclure sans parts égales.",
    tags: ["fraction_nombre", "piege", "parts_inegales", "canvas"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: { numerator: 2, denominator: 4, label: "2/4 ?" },
      display: { unequalParts: true },
    }),
  },

  {
    kind: "fixed",
    id: "4e_fraction_additionner_erreur_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : 1/2 + 1/3 = 2/5. Explique son erreur.",
    format: "open",
    expected: ["dénominateur", "commun", "5/6", "additionne"],
    comparator: "contains_keyword",
    hint: "On n’additionne pas les dénominateurs.",
    explanation:
      "Définition : pour additionner deux fractions, il faut utiliser un dénominateur commun.\n\n" +
      "Méthode : on transforme les fractions avant d’additionner.\n\n" +
      "Calcul : 1/2 = 3/6 et 1/3 = 2/6, donc 1/2 + 1/3 = 5/6.\n\n" +
      "Conclusion : l’erreur est d’avoir additionné les dénominateurs.",
    tags: ["fraction_nombre", "erreur", "open", "addition"],
  },
];
