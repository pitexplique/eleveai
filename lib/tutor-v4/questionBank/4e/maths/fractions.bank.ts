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

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
     Réponses-fractions → QCM LaTeX ; numériques → short.
  ========================================================= */

  // ---------- FRACTION_EGALE ----------
  {
    kind: "fixed",
    id: "fraction_egale_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction est égale à $\\frac{2}{3}$ ?",
    format: "qcm",
    choices: ["$\\frac{4}{6}$", "$\\frac{2}{4}$", "$\\frac{3}{4}$", "$\\frac{1}{3}$"],
    expected: ["$\\frac{4}{6}$"],
    comparator: "mcq_exact",
    hint: "Multiplie le numérateur et le dénominateur par le même nombre.",
    explanation:
      "Définition : deux fractions sont égales si on multiplie haut et bas par le même nombre.\n\n" +
      "Méthode : on multiplie 2 et 3 par 2.\n\n" +
      "Calcul : $\\frac{2}{3} = \\frac{2\\times2}{3\\times2} = \\frac{4}{6}$.\n\n" +
      "Conclusion : la fraction égale est $\\frac{4}{6}$.",
    tags: ["fraction_nombre", "egales", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_egale_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    text: "À quelle fraction simple est égale $\\frac{6}{9}$ ?",
    format: "qcm",
    choices: ["$\\frac{2}{3}$", "$\\frac{3}{4}$", "$\\frac{6}{3}$", "$\\frac{1}{3}$"],
    expected: ["$\\frac{2}{3}$"],
    comparator: "mcq_exact",
    hint: "Divise le numérateur et le dénominateur par 3.",
    explanation:
      "Définition : deux fractions sont égales si on divise haut et bas par le même nombre.\n\n" +
      "Méthode : on divise 6 et 9 par 3.\n\n" +
      "Calcul : $\\frac{6}{9} = \\frac{6\\div3}{9\\div3} = \\frac{2}{3}$.\n\n" +
      "Conclusion : $\\frac{6}{9} = \\frac{2}{3}$.",
    tags: ["fraction_nombre", "egales", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_egale_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est égale à $\\frac{10}{15}$ ?",
    format: "qcm",
    choices: ["$\\frac{2}{3}$", "$\\frac{5}{3}$", "$\\frac{3}{5}$", "$\\frac{1}{2}$"],
    expected: ["$\\frac{2}{3}$"],
    comparator: "mcq_exact",
    hint: "Divise par 5.",
    explanation:
      "Définition : deux fractions sont égales si on divise haut et bas par le même nombre.\n\n" +
      "Méthode : on divise 10 et 15 par 5.\n\n" +
      "Calcul : $\\frac{10}{15} = \\frac{2}{3}$.\n\n" +
      "Conclusion : $\\frac{10}{15} = \\frac{2}{3}$.",
    tags: ["fraction_nombre", "egales", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_egale_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie le haut et le bas par le même nombre.",
    tags: ["fraction_nombre", "egales", "template"],
    generate: () => {
      const n = randomInt(1, 6);
      const d = randomInt(n + 1, 9);
      const k = randomInt(2, 5);
      return {
        text: `Quelle fraction est égale à $\\frac{${n}}{${d}}$ ?`,
        format: "qcm",
        choices: [
          `$\\frac{${n * k}}{${d * k}}$`,
          `$\\frac{${n + k}}{${d + k}}$`,
          `$\\frac{${n}}{${d * k}}$`,
          `$\\frac{${d}}{${n}}$`,
        ],
        expected: [`$\\frac{${n * k}}{${d * k}}$`],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux fractions sont égales si on multiplie haut et bas par le même nombre.\n\n" +
          `Méthode : on multiplie ${n} et ${d} par ${k}.\n\n` +
          `Calcul : $\\frac{${n}}{${d}} = \\frac{${n * k}}{${d * k}}$.\n\n` +
          `Conclusion : la fraction égale est $\\frac{${n * k}}{${d * k}}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_egale_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    hint: "Quel nombre a-t-on utilisé pour passer du dénominateur de départ à l’autre ?",
    tags: ["fraction_nombre", "egales", "numerateur", "template"],
    generate: () => {
      const n = randomInt(1, 6);
      const d = randomInt(n + 1, 9);
      const k = randomInt(2, 5);
      return {
        text: `Compléter le numérateur manquant : $\\frac{${n}}{${d}} = \\dfrac{?}{${d * k}}$.`,
        format: "short",
        expected: [String(n * k)],
        comparator: "number_equal",
        explanation:
          "Définition : pour obtenir une fraction égale, on multiplie haut et bas par le même nombre.\n\n" +
          `Méthode : le dénominateur a été multiplié par ${k} (car ${d} × ${k} = ${d * k}), on fait pareil au numérateur.\n\n` +
          `Calcul : $${n} \\times ${k} = ${n * k}$.\n\n` +
          `Conclusion : le numérateur manquant est ${n * k}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_egale_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les produits en croix : a × d et b × c.",
    tags: ["fraction_nombre", "egales", "produit_croix", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = randomInt(a + 1, 8);
      const egal = randomChoice([true, false]);
      const k = randomInt(2, 4);
      const c = egal ? a * k : a * k + randomChoice([1, -1, 2]);
      const dd = b * k;
      const reponse = a * dd === c * b ? "oui" : "non";
      return {
        text: `Les fractions $\\frac{${a}}{${b}}$ et $\\frac{${c}}{${dd}}$ sont-elles égales ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [reponse],
        comparator: "mcq_exact",
        explanation:
          "Définition : $\\frac{a}{b} = \\frac{c}{d}$ si et seulement si $a\\times d = b\\times c$.\n\n" +
          "Méthode : on compare les produits en croix.\n\n" +
          `Calcul : $${a} \\times ${dd} = ${a * dd}$ et $${b} \\times ${c} = ${b * c}$.\n\n` +
          `Conclusion : les fractions ${reponse === "oui" ? "sont égales" : "ne sont pas égales"}.`,
      };
    },
  },

  // ---------- FRACTION_SIMPLIFIER ----------
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 1,
    theme: "neutral",
    text: "Simplifier $\\frac{4}{6}$.",
    format: "qcm",
    choices: ["$\\frac{2}{3}$", "$\\frac{1}{2}$", "$\\frac{4}{3}$", "$\\frac{3}{4}$"],
    expected: ["$\\frac{2}{3}$"],
    comparator: "mcq_exact",
    hint: "Divise par 2.",
    explanation:
      "Définition : simplifier, c’est écrire une fraction égale avec des nombres plus petits.\n\n" +
      "Méthode : on divise 4 et 6 par 2.\n\n" +
      "Calcul : $\\frac{4}{6} = \\frac{2}{3}$.\n\n" +
      "Conclusion : la forme simplifiée est $\\frac{2}{3}$.",
    tags: ["fraction_nombre", "simplifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Simplifier $\\frac{9}{12}$.",
    format: "qcm",
    choices: ["$\\frac{3}{4}$", "$\\frac{2}{3}$", "$\\frac{9}{4}$", "$\\frac{1}{3}$"],
    expected: ["$\\frac{3}{4}$"],
    comparator: "mcq_exact",
    hint: "Divise par 3.",
    explanation:
      "Définition : simplifier, c’est écrire une fraction égale avec des nombres plus petits.\n\n" +
      "Méthode : on divise 9 et 12 par 3.\n\n" +
      "Calcul : $\\frac{9}{12} = \\frac{3}{4}$.\n\n" +
      "Conclusion : la forme simplifiée est $\\frac{3}{4}$.",
    tags: ["fraction_nombre", "simplifier", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise le haut et le bas par leur diviseur commun.",
    tags: ["fraction_nombre", "simplifier", "template"],
    generate: () => {
      const n0 = randomInt(1, 5);
      const d0 = randomInt(n0 + 1, 7);
      const k = randomInt(2, 5);
      const n = n0 * k;
      const d = d0 * k;
      return {
        text: `Simplifier $\\frac{${n}}{${d}}$.`,
        format: "qcm",
        choices: [
          `$\\frac{${n0}}{${d0}}$`,
          `$\\frac{${n0 + 1}}{${d0}}$`,
          `$\\frac{${n}}{${d0}}$`,
          `$\\frac{${d0}}{${n0}}$`,
        ],
        expected: [`$\\frac{${n0}}{${d0}}$`],
        comparator: "mcq_exact",
        explanation:
          "Définition : simplifier, c’est écrire une fraction égale avec des nombres plus petits.\n\n" +
          `Méthode : on divise ${n} et ${d} par ${k}.\n\n` +
          `Calcul : $\\frac{${n}}{${d}} = \\frac{${n0}}{${d0}}$.\n\n` +
          `Conclusion : la forme simplifiée est $\\frac{${n0}}{${d0}}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le plus grand nombre qui divise à la fois le haut et le bas.",
    tags: ["fraction_nombre", "simplifier", "pgcd", "template"],
    generate: () => {
      const n0 = randomInt(1, 5);
      const d0 = randomInt(n0 + 1, 7);
      const k = randomChoice([2, 3, 4, 5, 6]);
      const n = n0 * k;
      const d = d0 * k;
      const g = pgcd(n, d);
      return {
        text: `Par quel nombre faut-il diviser le numérateur et le dénominateur pour simplifier complètement $\\frac{${n}}{${d}}$ en une seule étape ?`,
        format: "short",
        expected: [String(g)],
        comparator: "number_equal",
        explanation:
          "Définition : pour simplifier en une étape, on divise par le plus grand diviseur commun (PGCD).\n\n" +
          "Méthode : on cherche le plus grand nombre qui divise le numérateur et le dénominateur.\n\n" +
          `Calcul : le PGCD de ${n} et ${d} est ${g}.\n\n` +
          `Conclusion : on divise par ${g}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Une fraction est irréductible si le seul diviseur commun est 1.",
    tags: ["fraction_nombre", "simplifier", "irreductible", "template"],
    generate: () => {
      const irreductible = randomChoice([true, false]);
      let n: number;
      let d: number;
      if (irreductible) {
        const paires = [
          [2, 3],
          [3, 4],
          [4, 5],
          [5, 6],
          [3, 7],
          [5, 8],
        ];
        const p = randomChoice(paires);
        n = p[0];
        d = p[1];
      } else {
        const base = randomChoice([
          [2, 3],
          [3, 4],
          [1, 2],
        ]);
        const k = randomInt(2, 4);
        n = base[0] * k;
        d = base[1] * k;
      }
      return {
        text: `La fraction $\\frac{${n}}{${d}}$ est-elle déjà irréductible (impossible à simplifier) ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [irreductible ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une fraction est irréductible si son numérateur et son dénominateur n’ont pas de diviseur commun autre que 1.\n\n" +
          "Méthode : on cherche un éventuel diviseur commun.\n\n" +
          `Calcul : le PGCD de ${n} et ${d} est ${pgcd(n, d)}.\n\n` +
          `Conclusion : la fraction ${irreductible ? "est déjà irréductible" : "peut encore être simplifiée"}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment simplifier la fraction $\\frac{12}{18}$.",
    format: "open",
    expected: ["divise", "6", "2/3"],
    comparator: "contains_keyword",
    hint: "Cherche par quel nombre diviser 12 et 18.",
    explanation:
      "Définition : simplifier, c’est diviser le numérateur et le dénominateur par un même nombre.\n\n" +
      "Méthode : on divise 12 et 18 par leur diviseur commun 6.\n\n" +
      "Calcul : $\\frac{12}{18} = \\frac{2}{3}$.\n\n" +
      "Conclusion : la forme simplifiée est $\\frac{2}{3}$.",
    tags: ["fraction_nombre", "simplifier", "open"],
  },

  // ---------- FRACTION_DECIMAL ----------
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 1,
    theme: "neutral",
    text: "À quel nombre décimal correspond $\\frac{1}{4}$ ?",
    format: "qcm",
    choices: ["0,25", "0,4", "0,5", "0,75"],
    expected: ["0,25"],
    comparator: "mcq_exact",
    hint: "1 ÷ 4 = 0,25.",
    explanation:
      "Définition : une fraction est aussi un quotient.\n\n" +
      "Méthode : on calcule numérateur ÷ dénominateur.\n\n" +
      "Calcul : $1 \\div 4 = 0{,}25$.\n\n" +
      "Conclusion : $\\frac{1}{4} = 0{,}25$.",
    tags: ["fraction_nombre", "decimal", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 1,
    theme: "neutral",
    text: "À quel nombre décimal correspond $\\frac{3}{10}$ ?",
    format: "qcm",
    choices: ["0,3", "0,03", "3", "0,13"],
    expected: ["0,3"],
    comparator: "mcq_exact",
    hint: "Diviser par 10 décale la virgule d’un rang.",
    explanation:
      "Définition : une fraction est aussi un quotient.\n\n" +
      "Méthode : diviser par 10, c’est décaler la virgule d’un rang vers la gauche.\n\n" +
      "Calcul : $3 \\div 10 = 0{,}3$.\n\n" +
      "Conclusion : $\\frac{3}{10} = 0{,}3$.",
    tags: ["fraction_nombre", "decimal", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "À quel nombre décimal correspond $\\frac{1}{5}$ ?",
    format: "qcm",
    choices: ["0,2", "0,5", "0,15", "1,5"],
    expected: ["0,2"],
    comparator: "mcq_exact",
    hint: "$\\frac{1}{5} = \\frac{2}{10}$.",
    explanation:
      "Définition : une fraction est aussi un quotient.\n\n" +
      "Méthode : on transforme en dixièmes ou on calcule $1 \\div 5$.\n\n" +
      "Calcul : $\\frac{1}{5} = \\frac{2}{10} = 0{,}2$.\n\n" +
      "Conclusion : $\\frac{1}{5} = 0{,}2$.",
    tags: ["fraction_nombre", "decimal", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_decimal_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Diviser par 10 décale la virgule d’un rang.",
    tags: ["fraction_nombre", "decimal", "template"],
    generate: () => {
      const n = randomInt(1, 9);
      const v = n / 10;
      const vPoint = String(v);
      const vComma = vPoint.replace(".", ",");
      return {
        text: `Écris $\\frac{${n}}{10}$ sous forme de nombre décimal.`,
        format: "short",
        expected: [vPoint, vComma],
        comparator: "number_equal",
        explanation:
          "Définition : une fraction est aussi un quotient.\n\n" +
          "Méthode : diviser par 10 décale la virgule d’un rang.\n\n" +
          `Calcul : $${n} \\div 10 = ${vComma}$.\n\n` +
          `Conclusion : $\\frac{${n}}{10} = ${vComma}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_decimal_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Diviser par 100 décale la virgule de deux rangs.",
    tags: ["fraction_nombre", "decimal", "template"],
    generate: () => {
      const n = randomChoice([3, 7, 9, 12, 25, 45, 50, 75]);
      const v = n / 100;
      const vPoint = String(v);
      const vComma = vPoint.replace(".", ",");
      return {
        text: `Écris $\\frac{${n}}{100}$ sous forme de nombre décimal.`,
        format: "short",
        expected: [vPoint, vComma],
        comparator: "number_equal",
        explanation:
          "Définition : une fraction est aussi un quotient.\n\n" +
          "Méthode : diviser par 100 décale la virgule de deux rangs.\n\n" +
          `Calcul : $${n} \\div 100 = ${vComma}$.\n\n` +
          `Conclusion : $\\frac{${n}}{100} = ${vComma}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_decimal_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule numérateur ÷ dénominateur.",
    tags: ["fraction_nombre", "decimal", "qcm", "template"],
    generate: () => {
      const items = [
        { f: "\\frac{1}{2}", d: "0,5", w: ["0,2", "0,25", "1,5"] },
        { f: "\\frac{3}{4}", d: "0,75", w: ["0,34", "0,7", "0,375"] },
        { f: "\\frac{2}{5}", d: "0,4", w: ["0,25", "0,45", "2,5"] },
        { f: "\\frac{7}{10}", d: "0,7", w: ["0,07", "0,17", "7"] },
      ];
      const it = randomChoice(items);
      return {
        text: `À quel nombre décimal correspond $${it.f}$ ?`,
        format: "qcm",
        choices: [it.d, ...it.w],
        expected: [it.d],
        comparator: "mcq_exact",
        explanation:
          "Définition : une fraction est aussi un quotient.\n\n" +
          "Méthode : on calcule numérateur ÷ dénominateur.\n\n" +
          `Calcul : $${it.f} = ${it.d.replace(",", "{,}")}$.\n\n` +
          `Conclusion : la valeur décimale est ${it.d}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_decimal_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 3,
    theme: "neutral",
    hint: "Pense à la fraction décimale équivalente.",
    tags: ["fraction_nombre", "decimal", "qcm", "reciproque", "template"],
    generate: () => {
      const items = [
        { dec: "0,5", f: "\\frac{1}{2}", w: ["\\frac{1}{5}", "\\frac{5}{10}", "\\frac{2}{1}"] },
        { dec: "0,25", f: "\\frac{1}{4}", w: ["\\frac{1}{25}", "\\frac{2}{5}", "\\frac{1}{2}"] },
        { dec: "0,2", f: "\\frac{1}{5}", w: ["\\frac{1}{2}", "\\frac{2}{10}", "\\frac{1}{20}"] },
        { dec: "0,75", f: "\\frac{3}{4}", w: ["\\frac{7}{5}", "\\frac{3}{5}", "\\frac{1}{4}"] },
      ];
      const it = randomChoice(items);
      return {
        text: `Quelle fraction simplifiée est égale au décimal ${it.dec} ?`,
        format: "qcm",
        choices: [`$${it.f}$`, `$${it.w[0]}$`, `$${it.w[1]}$`, `$${it.w[2]}$`],
        expected: [`$${it.f}$`],
        comparator: "mcq_exact",
        explanation:
          "Définition : un décimal peut s’écrire comme une fraction décimale puis se simplifier.\n\n" +
          `Méthode : on écrit ${it.dec} en fraction décimale puis on simplifie.\n\n` +
          `Calcul : ${it.dec} $= ${it.f}$.\n\n` +
          `Conclusion : la fraction simplifiée est $${it.f}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "fraction_decimal_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment transformer $\\frac{3}{4}$ en nombre décimal.",
    format: "open",
    expected: ["divise", "0,75", "quotient"],
    comparator: "contains_keyword",
    hint: "Une fraction est un quotient.",
    explanation:
      "Définition : une fraction est aussi un quotient.\n\n" +
      "Méthode : on divise le numérateur par le dénominateur.\n\n" +
      "Calcul : $3 \\div 4 = 0{,}75$.\n\n" +
      "Conclusion : $\\frac{3}{4} = 0{,}75$.",
    tags: ["fraction_nombre", "decimal", "open"],
  },

  // ---------- FRACTION_RATIONNEL ----------
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre entier 4 est-il un nombre rationnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Peut-on écrire 4 sous la forme a/b ?",
    explanation:
      "Définition : un nombre rationnel s’écrit $\\frac{a}{b}$ avec $b \\neq 0$.\n\n" +
      "Méthode : on cherche une écriture fractionnaire de 4.\n\n" +
      "Calcul : $4 = \\frac{4}{1}$.\n\n" +
      "Conclusion : oui, 4 est un nombre rationnel.",
    tags: ["fraction_nombre", "rationnel", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi l’écriture $\\frac{a}{0}$ n’a-t-elle pas de sens ?",
    format: "qcm",
    choices: [
      "car on ne peut pas diviser par 0",
      "car a est trop grand",
      "car a doit être nul",
      "car le résultat vaut 0",
    ],
    expected: ["car on ne peut pas diviser par 0"],
    comparator: "mcq_exact",
    hint: "Le dénominateur représente une division.",
    explanation:
      "Définition : un nombre rationnel s’écrit $\\frac{a}{b}$ avec $b \\neq 0$.\n\n" +
      "Méthode : le dénominateur correspond à une division par b.\n\n" +
      "Calcul : la division par 0 est impossible.\n\n" +
      "Conclusion : $\\frac{a}{0}$ n’a pas de sens.",
    tags: ["fraction_nombre", "rationnel", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre $-\\frac{3}{4}$ est-il rationnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un rationnel peut être négatif.",
    explanation:
      "Définition : un nombre rationnel s’écrit $\\frac{a}{b}$ avec $b \\neq 0$, et $a$ peut être négatif.\n\n" +
      "Méthode : on vérifie que c’est un quotient de deux entiers.\n\n" +
      "Calcul : $-\\frac{3}{4}$ est le quotient de $-3$ par $4$.\n\n" +
      "Conclusion : oui, c’est un nombre rationnel.",
    tags: ["fraction_nombre", "rationnel", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’écriture $\\frac{a}{b}$ d’un rationnel, que doit vérifier $b$ ?",
    format: "qcm",
    choices: ["b doit être différent de 0", "b doit être positif", "b doit être un entier pair", "b doit être égal à a"],
    expected: ["b doit être différent de 0"],
    comparator: "mcq_exact",
    hint: "On ne divise jamais par 0.",
    explanation:
      "Définition : un nombre rationnel s’écrit $\\frac{a}{b}$ avec $b \\neq 0$.\n\n" +
      "Méthode : on rappelle la condition sur le dénominateur.\n\n" +
      "Calcul : aucune autre condition n’est imposée à b.\n\n" +
      "Conclusion : b doit être différent de 0.",
    tags: ["fraction_nombre", "rationnel", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_rationnel_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    hint: "Tout nombre qui s’écrit comme quotient de deux entiers est rationnel.",
    tags: ["fraction_nombre", "rationnel", "template"],
    generate: () => {
      const k = randomInt(2, 9);
      const v = k / 10;
      const vComma = String(v).replace(".", ",");
      return {
        text: `Le nombre décimal ${vComma} est-il un nombre rationnel ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un nombre rationnel s’écrit comme quotient de deux entiers.\n\n" +
          "Méthode : on écrit le décimal sous forme de fraction.\n\n" +
          `Calcul : ${vComma} $= \\frac{${k}}{10}$.\n\n` +
          "Conclusion : oui, c’est un nombre rationnel.",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_rationnel_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    hint: "Un entier se met sur 1.",
    tags: ["fraction_nombre", "rationnel", "qcm", "template"],
    generate: () => {
      const n = randomInt(2, 12);
      return {
        text: `Quelle écriture fractionnaire correspond à l’entier ${n} ?`,
        format: "qcm",
        choices: [`$\\frac{${n}}{1}$`, `$\\frac{1}{${n}}$`, `$\\frac{${n}}{${n}}$`, `$\\frac{0}{${n}}$`],
        expected: [`$\\frac{${n}}{1}$`],
        comparator: "mcq_exact",
        explanation:
          "Définition : tout entier est un rationnel, écrit sur un dénominateur 1.\n\n" +
          "Méthode : on place l’entier au numérateur et 1 au dénominateur.\n\n" +
          `Calcul : $${n} = \\frac{${n}}{1}$.\n\n` +
          `Conclusion : l’écriture est $\\frac{${n}}{1}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi tout nombre entier est aussi un nombre rationnel.",
    format: "open",
    expected: ["entier", "fraction", "1"],
    comparator: "contains_keyword",
    hint: "Écris un entier comme une fraction de dénominateur 1.",
    explanation:
      "Définition : un nombre rationnel s’écrit $\\frac{a}{b}$ avec $b \\neq 0$.\n\n" +
      "Méthode : on écrit l’entier sur un dénominateur 1.\n\n" +
      "Calcul : par exemple $7 = \\frac{7}{1}$.\n\n" +
      "Conclusion : tout entier est un rationnel car il s’écrit comme fraction de dénominateur 1.",
    tags: ["fraction_nombre", "rationnel", "open"],
  },

  // ---------- FRACTION_COMPARER ----------
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est la plus grande : $\\frac{2}{5}$ ou $\\frac{3}{5}$ ?",
    format: "qcm",
    choices: ["$\\frac{3}{5}$", "$\\frac{2}{5}$", "elles sont égales"],
    expected: ["$\\frac{3}{5}$"],
    comparator: "mcq_exact",
    hint: "Même dénominateur : on compare les numérateurs.",
    explanation:
      "Définition : à dénominateur égal, la plus grande fraction a le plus grand numérateur.\n\n" +
      "Méthode : on compare 2 et 3.\n\n" +
      "Calcul : $3 > 2$.\n\n" +
      "Conclusion : $\\frac{3}{5}$ est la plus grande.",
    tags: ["fraction_nombre", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "La fraction $\\frac{5}{4}$ est-elle plus grande ou plus petite que 1 ?",
    format: "qcm",
    choices: ["plus grande que 1", "plus petite que 1", "égale à 1"],
    expected: ["plus grande que 1"],
    comparator: "mcq_exact",
    hint: "Compare le numérateur et le dénominateur.",
    explanation:
      "Définition : une fraction est plus grande que 1 si son numérateur dépasse son dénominateur.\n\n" +
      "Méthode : on compare 5 et 4.\n\n" +
      "Calcul : $5 > 4$.\n\n" +
      "Conclusion : $\\frac{5}{4} > 1$.",
    tags: ["fraction_nombre", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "À numérateur égal, quelle fraction est la plus grande : $\\frac{3}{4}$ ou $\\frac{3}{7}$ ?",
    format: "qcm",
    choices: ["$\\frac{3}{4}$", "$\\frac{3}{7}$", "elles sont égales"],
    expected: ["$\\frac{3}{4}$"],
    comparator: "mcq_exact",
    hint: "À numérateur égal, plus le dénominateur est petit, plus la fraction est grande.",
    explanation:
      "Définition : à numérateur égal, la plus grande fraction a le plus petit dénominateur.\n\n" +
      "Méthode : on compare les dénominateurs 4 et 7.\n\n" +
      "Calcul : $4 < 7$, donc $\\frac{3}{4} > \\frac{3}{7}$.\n\n" +
      "Conclusion : $\\frac{3}{4}$ est la plus grande.",
    tags: ["fraction_nombre", "comparer", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Même dénominateur : on compare les numérateurs.",
    tags: ["fraction_nombre", "comparer", "template"],
    generate: () => {
      const d = randomChoice([5, 6, 7, 8, 9, 10]);
      const a = randomInt(1, d - 1);
      let b = randomInt(1, d - 1);
      while (b === a) b = randomInt(1, d - 1);
      const correct = a > b ? `$\\frac{${a}}{${d}}$` : `$\\frac{${b}}{${d}}$`;
      return {
        text: `Quelle fraction est la plus grande : $\\frac{${a}}{${d}}$ ou $\\frac{${b}}{${d}}$ ?`,
        format: "qcm",
        choices: [`$\\frac{${a}}{${d}}$`, `$\\frac{${b}}{${d}}$`, "elles sont égales"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : à dénominateur égal, on compare les numérateurs.\n\n" +
          "Méthode : on regarde quel numérateur est le plus grand.\n\n" +
          `Calcul : on compare ${a} et ${b}.\n\n` +
          `Conclusion : la plus grande est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise le produit en croix : a × d et c × b.",
    tags: ["fraction_nombre", "comparer", "produit_croix", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = randomInt(a + 1, 9);
      const c = randomInt(1, 5);
      const dd = randomInt(c + 1, 9);
      const left = a * dd;
      const right = c * b;
      const sign = left > right ? ">" : left < right ? "<" : "=";
      return {
        text: `Compare $\\frac{${a}}{${b}}$ et $\\frac{${c}}{${dd}}$. Réponds par >, < ou =.`,
        format: "short",
        expected: [sign],
        comparator: "contains_keyword",
        explanation:
          "Définition : pour comparer deux fractions, on compare les produits en croix.\n\n" +
          "Méthode : on compare $a \\times d$ et $c \\times b$.\n\n" +
          `Calcul : $${a} \\times ${dd} = ${left}$ et $${c} \\times ${b} = ${right}$.\n\n` +
          `Conclusion : $\\frac{${a}}{${b}} ${sign} \\frac{${c}}{${dd}}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Transforme la fraction en décimal pour comparer.",
    tags: ["fraction_nombre", "comparer", "decimal", "template"],
    generate: () => {
      const items = [
        { f: "\\frac{1}{2}", val: 0.5 },
        { f: "\\frac{3}{4}", val: 0.75 },
        { f: "\\frac{2}{5}", val: 0.4 },
        { f: "\\frac{1}{4}", val: 0.25 },
      ];
      const it = randomChoice(items);
      const dec = randomChoice([0.3, 0.5, 0.6, 0.7]);
      const decComma = String(dec).replace(".", ",");
      const correct =
        it.val > dec ? `$${it.f}$` : it.val < dec ? `${decComma}` : "ils sont égaux";
      return {
        text: `Lequel est le plus grand : $${it.f}$ ou le décimal ${decComma} ?`,
        format: "qcm",
        choices: [`$${it.f}$`, `${decComma}`, "ils sont égaux"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : pour comparer une fraction et un décimal, on les met sous la même forme.\n\n" +
          "Méthode : on transforme la fraction en décimal.\n\n" +
          `Calcul : $${it.f} = ${String(it.val).replace(".", "{,}")}$, à comparer à ${decComma}.\n\n` +
          `Conclusion : le plus grand est ${correct}.`,
      };
    },
  },

  // ---------- FRACTION_ADDITIONNER ----------
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $\\frac{2}{5} + \\frac{1}{5}$.",
    format: "qcm",
    choices: ["$\\frac{3}{5}$", "$\\frac{3}{10}$", "$\\frac{2}{5}$", "$\\frac{3}{25}$"],
    expected: ["$\\frac{3}{5}$"],
    comparator: "mcq_exact",
    hint: "Même dénominateur : on additionne les numérateurs.",
    explanation:
      "Définition : pour additionner des fractions de même dénominateur, on additionne les numérateurs.\n\n" +
      "Méthode : on garde le dénominateur 5.\n\n" +
      "Calcul : $\\frac{2}{5} + \\frac{1}{5} = \\frac{3}{5}$.\n\n" +
      "Conclusion : le résultat est $\\frac{3}{5}$.",
    tags: ["fraction_nombre", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $\\frac{1}{3} + \\frac{1}{3}$.",
    format: "qcm",
    choices: ["$\\frac{2}{3}$", "$\\frac{2}{6}$", "$\\frac{1}{3}$", "$\\frac{1}{6}$"],
    expected: ["$\\frac{2}{3}$"],
    comparator: "mcq_exact",
    hint: "On additionne les numérateurs et on garde le dénominateur.",
    explanation:
      "Définition : pour additionner des fractions de même dénominateur, on additionne les numérateurs.\n\n" +
      "Méthode : on garde le dénominateur 3.\n\n" +
      "Calcul : $\\frac{1}{3} + \\frac{1}{3} = \\frac{2}{3}$.\n\n" +
      "Conclusion : le résultat est $\\frac{2}{3}$.",
    tags: ["fraction_nombre", "addition", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    hint: "Un dénominateur est multiple de l’autre : mets-les au même dénominateur.",
    tags: ["fraction_nombre", "addition", "denominateur_multiple", "template"],
    generate: () => {
      const d1 = randomChoice([2, 3, 4]);
      const k = randomChoice([2, 3]);
      const d2 = d1 * k;
      const a = randomInt(1, d1 - 1 > 0 ? d1 - 1 : 1);
      const b = randomInt(1, d2 - 1);
      const num = a * k + b;
      const s = simplify(num, d2);
      const correct = `$\\frac{${s.n}}{${s.d}}$`;
      return {
        text: `Calculer $\\frac{${a}}{${d1}} + \\frac{${b}}{${d2}}$.`,
        format: "qcm",
        choices: [
          correct,
          `$\\frac{${a + b}}{${d1 + d2}}$`,
          `$\\frac{${num}}{${d1}}$`,
          `$\\frac{${a + b}}{${d2}}$`,
        ].filter((v, i, arr) => arr.indexOf(v) === i),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : pour additionner, il faut un dénominateur commun.\n\n" +
          `Méthode : on transforme $\\frac{${a}}{${d1}}$ en $\\frac{${a * k}}{${d2}}$.\n\n` +
          `Calcul : $\\frac{${a * k}}{${d2}} + \\frac{${b}}{${d2}} = \\frac{${num}}{${d2}} = ${correct.slice(1, -1)}$.\n\n` +
          `Conclusion : le résultat est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    hint: "Même dénominateur : additionne les numérateurs.",
    tags: ["fraction_nombre", "addition", "qcm", "template"],
    generate: () => {
      const d = randomChoice([6, 7, 8, 9, 10, 12]);
      const a = randomInt(1, d - 2);
      const b = randomInt(1, d - a - 1 > 0 ? d - a - 1 : 1);
      const s = simplify(a + b, d);
      const correct = `$\\frac{${s.n}}{${s.d}}$`;
      return {
        text: `Calculer $\\frac{${a}}{${d}} + \\frac{${b}}{${d}}$.`,
        format: "qcm",
        choices: [
          correct,
          `$\\frac{${a + b}}{${2 * d}}$`,
          `$\\frac{${a + b}}{${d}}$`,
          `$\\frac{${a}}{${d}}$`,
        ].filter((v, i, arr) => arr.indexOf(v) === i),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : à dénominateur égal, on additionne les numérateurs.\n\n" +
          "Méthode : on garde le dénominateur commun.\n\n" +
          `Calcul : $\\frac{${a}}{${d}} + \\frac{${b}}{${d}} = \\frac{${a + b}}{${d}} = ${correct.slice(1, -1)}$.\n\n` +
          `Conclusion : le résultat est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche un dénominateur commun aux deux fractions.",
    tags: ["fraction_nombre", "addition", "soustraction", "template"],
    generate: () => {
      const d1 = randomChoice([2, 3, 4]);
      const d2 = randomChoice([5, 6]);
      const a = randomInt(1, d1 - 1 > 0 ? d1 - 1 : 1);
      const b = randomInt(1, d2 - 1);
      const denom = d1 * d2;
      const num = a * d2 + b * d1;
      const s = simplify(num, denom);
      const correct = `$\\frac{${s.n}}{${s.d}}$`;
      return {
        text: `Calculer $\\frac{${a}}{${d1}} + \\frac{${b}}{${d2}}$.`,
        format: "qcm",
        choices: [
          correct,
          `$\\frac{${a + b}}{${d1 + d2}}$`,
          `$\\frac{${num}}{${d1}}$`,
          `$\\frac{${a + b}}{${denom}}$`,
        ].filter((v, i, arr) => arr.indexOf(v) === i),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : pour additionner, il faut un dénominateur commun.\n\n" +
          `Méthode : on prend ${denom} comme dénominateur commun.\n\n` +
          `Calcul : $\\frac{${a * d2}}{${denom}} + \\frac{${b * d1}}{${denom}} = \\frac{${num}}{${denom}} = ${correct.slice(1, -1)}$.\n\n` +
          `Conclusion : le résultat est ${correct}.`,
      };
    },
  },

  // ---------- FRACTION_MULTIPLIER ----------
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $\\frac{1}{2} \\times \\frac{1}{3}$.",
    format: "qcm",
    choices: ["$\\frac{1}{6}$", "$\\frac{2}{3}$", "$\\frac{1}{5}$", "$\\frac{2}{6}$"],
    expected: ["$\\frac{1}{6}$"],
    comparator: "mcq_exact",
    hint: "On multiplie les numérateurs entre eux et les dénominateurs entre eux.",
    explanation:
      "Définition : pour multiplier deux fractions, on multiplie les numérateurs et les dénominateurs.\n\n" +
      "Méthode : $\\frac{1\\times1}{2\\times3}$.\n\n" +
      "Calcul : $\\frac{1}{2} \\times \\frac{1}{3} = \\frac{1}{6}$.\n\n" +
      "Conclusion : le résultat est $\\frac{1}{6}$.",
    tags: ["fraction_nombre", "produit", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $\\frac{2}{5} \\times 3$.",
    format: "qcm",
    choices: ["$\\frac{6}{5}$", "$\\frac{2}{15}$", "$\\frac{6}{15}$", "$\\frac{5}{6}$"],
    expected: ["$\\frac{6}{5}$"],
    comparator: "mcq_exact",
    hint: "Un entier multiplie le numérateur.",
    explanation:
      "Définition : multiplier une fraction par un entier multiplie le numérateur.\n\n" +
      "Méthode : $3 = \\frac{3}{1}$, on multiplie haut et bas.\n\n" +
      "Calcul : $\\frac{2}{5} \\times 3 = \\frac{6}{5}$.\n\n" +
      "Conclusion : le résultat est $\\frac{6}{5}$.",
    tags: ["fraction_nombre", "produit", "entier", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    text: "Calculer puis simplifier $\\frac{2}{3} \\times \\frac{3}{4}$.",
    format: "qcm",
    choices: ["$\\frac{1}{2}$", "$\\frac{6}{12}$", "$\\frac{5}{7}$", "$\\frac{2}{4}$"],
    expected: ["$\\frac{1}{2}$"],
    comparator: "mcq_exact",
    hint: "Multiplie puis simplifie le résultat.",
    explanation:
      "Définition : on multiplie les numérateurs et les dénominateurs, puis on simplifie.\n\n" +
      "Méthode : $\\frac{2\\times3}{3\\times4} = \\frac{6}{12}$.\n\n" +
      "Calcul : $\\frac{6}{12} = \\frac{1}{2}$.\n\n" +
      "Conclusion : le résultat simplifié est $\\frac{1}{2}$.",
    tags: ["fraction_nombre", "produit", "simplifier", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_multiplier_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie haut avec haut, bas avec bas, puis simplifie.",
    tags: ["fraction_nombre", "produit", "qcm", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = randomInt(2, 7);
      const c = randomInt(1, 5);
      const d = randomInt(2, 7);
      const s = simplify(a * c, b * d);
      const correct = `$\\frac{${s.n}}{${s.d}}$`;
      return {
        text: `Calculer $\\frac{${a}}{${b}} \\times \\frac{${c}}{${d}}$.`,
        format: "qcm",
        choices: [
          correct,
          `$\\frac{${a + c}}{${b + d}}$`,
          `$\\frac{${a * d}}{${b * c}}$`,
          `$\\frac{${a * c}}{${b + d}}$`,
        ].filter((v, i, arr) => arr.indexOf(v) === i),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : pour multiplier deux fractions, on multiplie les numérateurs et les dénominateurs.\n\n" +
          "Méthode : on calcule puis on simplifie.\n\n" +
          `Calcul : $\\frac{${a}}{${b}} \\times \\frac{${c}}{${d}} = \\frac{${a * c}}{${b * d}} = ${correct.slice(1, -1)}$.\n\n` +
          `Conclusion : le résultat est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_multiplier_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    hint: "Un entier multiplie seulement le numérateur.",
    tags: ["fraction_nombre", "produit", "entier", "qcm", "template"],
    generate: () => {
      const a = randomInt(1, 6);
      const b = randomInt(a + 1, 9);
      const k = randomInt(2, 6);
      const s = simplify(a * k, b);
      const correct = `$\\frac{${s.n}}{${s.d}}$`;
      return {
        text: `Calculer $\\frac{${a}}{${b}} \\times ${k}$.`,
        format: "qcm",
        choices: [
          correct,
          `$\\frac{${a}}{${b * k}}$`,
          `$\\frac{${a * k}}{${b * k}}$`,
          `$\\frac{${a + k}}{${b}}$`,
        ].filter((v, i, arr) => arr.indexOf(v) === i),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : multiplier une fraction par un entier multiplie le numérateur.\n\n" +
          `Méthode : $\\frac{${a}}{${b}} \\times ${k} = \\frac{${a} \\times ${k}}{${b}}$.\n\n` +
          `Calcul : $= \\frac{${a * k}}{${b}} = ${correct.slice(1, -1)}$.\n\n` +
          `Conclusion : le résultat est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_multiplier_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    hint: "« Prendre la fraction d’un nombre », c’est multiplier.",
    tags: ["fraction_nombre", "produit", "fraction_de", "template"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5]);
      const num = randomInt(1, d - 1);
      const total = d * randomInt(2, 6);
      const result = (total / d) * num;
      return {
        text: `Calculer $\\frac{${num}}{${d}} \\times ${total}$.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : multiplier une fraction par un entier revient à prendre la fraction de cet entier.\n\n" +
          "Méthode : on divise par le dénominateur, puis on multiplie par le numérateur.\n\n" +
          `Calcul : $${total} \\div ${d} = ${total / d}$, puis $\\times ${num} = ${result}$.\n\n` +
          `Conclusion : le résultat est ${result}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Explique la règle pour multiplier deux fractions.",
    format: "open",
    expected: ["numérateurs", "dénominateurs", "multiplie"],
    comparator: "contains_keyword",
    hint: "Que fait-on des numérateurs ? des dénominateurs ?",
    explanation:
      "Définition : multiplier deux fractions donne une nouvelle fraction.\n\n" +
      "Méthode : on multiplie les numérateurs entre eux et les dénominateurs entre eux.\n\n" +
      "Calcul : $\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a\\times c}{b\\times d}$.\n\n" +
      "Conclusion : on multiplie les numérateurs entre eux et les dénominateurs entre eux, puis on simplifie.",
    tags: ["fraction_nombre", "produit", "open"],
  },

  // ---------- FRACTION_INVERSE ----------
  {
    kind: "fixed",
    id: "fraction_inverse_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_inverse",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’inverse de $\\frac{2}{7}$ ?",
    format: "qcm",
    choices: ["$\\frac{7}{2}$", "$-\\frac{2}{7}$", "$\\frac{2}{7}$", "$\\frac{7}{7}$"],
    expected: ["$\\frac{7}{2}$"],
    comparator: "mcq_exact",
    hint: "On échange numérateur et dénominateur.",
    explanation:
      "Définition : l’inverse d’une fraction s’obtient en échangeant numérateur et dénominateur.\n\n" +
      "Méthode : on échange 2 et 7.\n\n" +
      "Calcul : l’inverse de $\\frac{2}{7}$ est $\\frac{7}{2}$ (car $\\frac{2}{7} \\times \\frac{7}{2} = 1$).\n\n" +
      "Conclusion : l’inverse est $\\frac{7}{2}$.",
    tags: ["fraction_nombre", "inverse", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_inverse_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’inverse de l’entier 5 ?",
    format: "qcm",
    choices: ["$\\frac{1}{5}$", "$-5$", "$5$", "$\\frac{5}{1}$"],
    expected: ["$\\frac{1}{5}$"],
    comparator: "mcq_exact",
    hint: "$5 = \\frac{5}{1}$.",
    explanation:
      "Définition : l’inverse s’obtient en échangeant numérateur et dénominateur.\n\n" +
      "Méthode : on écrit $5 = \\frac{5}{1}$ puis on échange.\n\n" +
      "Calcul : l’inverse de $\\frac{5}{1}$ est $\\frac{1}{5}$.\n\n" +
      "Conclusion : l’inverse de 5 est $\\frac{1}{5}$.",
    tags: ["fraction_nombre", "inverse", "entier", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_inverse_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut le produit d’une fraction par son inverse ?",
    format: "qcm",
    choices: ["1", "0", "la fraction de départ", "l’opposé"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "C’est la propriété qui définit l’inverse.",
    explanation:
      "Définition : deux nombres sont inverses si leur produit vaut 1.\n\n" +
      "Méthode : on multiplie une fraction par son inverse.\n\n" +
      "Calcul : $\\frac{a}{b} \\times \\frac{b}{a} = 1$.\n\n" +
      "Conclusion : le produit vaut 1.",
    tags: ["fraction_nombre", "inverse", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_inverse_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_inverse",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est l’inverse de 1 ?",
    format: "qcm",
    choices: ["1", "0", "$\\frac{1}{0}$", "$-1$"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Quel nombre multiplié par 1 donne 1 ?",
    explanation:
      "Définition : l’inverse de x est le nombre qui, multiplié par x, donne 1.\n\n" +
      "Méthode : on cherche y tel que $1 \\times y = 1$.\n\n" +
      "Calcul : $1 \\times 1 = 1$.\n\n" +
      "Conclusion : l’inverse de 1 est 1.",
    tags: ["fraction_nombre", "inverse", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_inverse_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    hint: "Échange le numérateur et le dénominateur.",
    tags: ["fraction_nombre", "inverse", "qcm", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      return {
        text: `Quel est l’inverse de $\\frac{${a}}{${b}}$ ?`,
        format: "qcm",
        choices: [
          `$\\frac{${b}}{${a}}$`,
          `$-\\frac{${a}}{${b}}$`,
          `$\\frac{${a}}{${b}}$`,
          `$\\frac{${a + b}}{${a}}$`,
        ].filter((v, i, arr) => arr.indexOf(v) === i),
        expected: [`$\\frac{${b}}{${a}}$`],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’inverse s’obtient en échangeant numérateur et dénominateur.\n\n" +
          `Méthode : on échange ${a} et ${b}.\n\n` +
          `Calcul : l’inverse de $\\frac{${a}}{${b}}$ est $\\frac{${b}}{${a}}$.\n\n` +
          `Conclusion : l’inverse est $\\frac{${b}}{${a}}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_inverse_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    hint: "L’inverse d’un entier n est 1/n.",
    tags: ["fraction_nombre", "inverse", "entier", "qcm", "template"],
    generate: () => {
      const n = randomInt(2, 12);
      return {
        text: `Quel est l’inverse de l’entier ${n} ?`,
        format: "qcm",
        choices: [`$\\frac{1}{${n}}$`, `$\\frac{${n}}{1}$`, `$-${n}$`, `$${n}$`],
        expected: [`$\\frac{1}{${n}}$`],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’inverse de l’entier n est $\\frac{1}{n}$.\n\n" +
          `Méthode : on écrit $${n} = \\frac{${n}}{1}$ puis on échange.\n\n` +
          `Calcul : l’inverse est $\\frac{1}{${n}}$.\n\n` +
          `Conclusion : l’inverse de ${n} est $\\frac{1}{${n}}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "fraction_inverse_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_inverse",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment trouver l’inverse d’une fraction et donne un exemple.",
    format: "open",
    expected: ["échange", "numérateur", "dénominateur"],
    comparator: "contains_keyword",
    hint: "Pense à ce qu’on échange.",
    explanation:
      "Définition : l’inverse d’une fraction s’obtient en échangeant numérateur et dénominateur.\n\n" +
      "Méthode : on met le numérateur en bas et le dénominateur en haut.\n\n" +
      "Calcul : par exemple l’inverse de $\\frac{3}{4}$ est $\\frac{4}{3}$.\n\n" +
      "Conclusion : on échange numérateur et dénominateur.",
    tags: ["fraction_nombre", "inverse", "open"],
  },

  // ---------- FRACTION_DIVISER ----------
  {
    kind: "fixed",
    id: "fraction_diviser_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_diviser",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $\\frac{1}{2} \\div \\frac{1}{4}$.",
    format: "qcm",
    choices: ["$2$", "$\\frac{1}{8}$", "$\\frac{1}{2}$", "$\\frac{4}{2}$"],
    expected: ["$2$"],
    comparator: "mcq_exact",
    hint: "Diviser par $\\frac{1}{4}$, c’est multiplier par 4.",
    explanation:
      "Définition : diviser par une fraction revient à multiplier par son inverse.\n\n" +
      "Méthode : $\\frac{1}{2} \\div \\frac{1}{4} = \\frac{1}{2} \\times \\frac{4}{1}$.\n\n" +
      "Calcul : $= \\frac{4}{2} = 2$.\n\n" +
      "Conclusion : le résultat est 2.",
    tags: ["fraction_nombre", "division", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_diviser_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_diviser",
    difficulty: 3,
    theme: "neutral",
    text: "Calculer $\\frac{2}{3} \\div \\frac{5}{4}$.",
    format: "qcm",
    choices: ["$\\frac{8}{15}$", "$\\frac{10}{12}$", "$\\frac{2}{3}$", "$\\frac{5}{6}$"],
    expected: ["$\\frac{8}{15}$"],
    comparator: "mcq_exact",
    hint: "Multiplie par l’inverse de $\\frac{5}{4}$.",
    explanation:
      "Définition : diviser par une fraction revient à multiplier par son inverse.\n\n" +
      "Méthode : $\\frac{2}{3} \\div \\frac{5}{4} = \\frac{2}{3} \\times \\frac{4}{5}$.\n\n" +
      "Calcul : $= \\frac{8}{15}$.\n\n" +
      "Conclusion : le résultat est $\\frac{8}{15}$.",
    tags: ["fraction_nombre", "division", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_diviser_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_diviser",
    difficulty: 3,
    theme: "neutral",
    text: "Diviser un nombre par $\\frac{1}{2}$ revient à…",
    format: "qcm",
    choices: ["le multiplier par 2", "le diviser par 2", "le multiplier par $\\frac{1}{2}$", "lui enlever 2"],
    expected: ["le multiplier par 2"],
    comparator: "mcq_exact",
    hint: "L’inverse de $\\frac{1}{2}$ est 2.",
    explanation:
      "Définition : diviser par une fraction revient à multiplier par son inverse.\n\n" +
      "Méthode : l’inverse de $\\frac{1}{2}$ est 2.\n\n" +
      "Calcul : diviser par $\\frac{1}{2}$ = multiplier par 2.\n\n" +
      "Conclusion : on multiplie par 2.",
    tags: ["fraction_nombre", "division", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_diviser_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_diviser",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie par l’inverse de la deuxième fraction.",
    tags: ["fraction_nombre", "division", "qcm", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = randomInt(2, 7);
      const c = randomInt(1, 5);
      const d = randomInt(2, 7);
      const s = simplify(a * d, b * c);
      const correct = `$\\frac{${s.n}}{${s.d}}$`;
      return {
        text: `Calculer $\\frac{${a}}{${b}} \\div \\frac{${c}}{${d}}$.`,
        format: "qcm",
        choices: [
          correct,
          `$\\frac{${a * c}}{${b * d}}$`,
          `$\\frac{${a}}{${b}}$`,
          `$\\frac{${c * b}}{${a * d}}$`,
        ].filter((v, i, arr) => arr.indexOf(v) === i),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : diviser par une fraction revient à multiplier par son inverse.\n\n" +
          `Méthode : $\\frac{${a}}{${b}} \\div \\frac{${c}}{${d}} = \\frac{${a}}{${b}} \\times \\frac{${d}}{${c}}$.\n\n` +
          `Calcul : $= \\frac{${a * d}}{${b * c}} = ${correct.slice(1, -1)}$.\n\n` +
          `Conclusion : le résultat est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_diviser_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_diviser",
    difficulty: 4,
    theme: "neutral",
    hint: "Diviser par un entier n, c’est multiplier le dénominateur par n.",
    tags: ["fraction_nombre", "division", "entier", "qcm", "template"],
    generate: () => {
      const a = randomInt(1, 6);
      const b = randomInt(2, 6);
      const k = randomInt(2, 5);
      const s = simplify(a, b * k);
      const correct = `$\\frac{${s.n}}{${s.d}}$`;
      return {
        text: `Calculer $\\frac{${a}}{${b}} \\div ${k}$.`,
        format: "qcm",
        choices: [
          correct,
          `$\\frac{${a * k}}{${b}}$`,
          `$\\frac{${a}}{${b}}$`,
          `$\\frac{${a}}{${b + k}}$`,
        ].filter((v, i, arr) => arr.indexOf(v) === i),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : diviser par un entier n, c’est multiplier par $\\frac{1}{n}$.\n\n" +
          `Méthode : $\\frac{${a}}{${b}} \\div ${k} = \\frac{${a}}{${b}} \\times \\frac{1}{${k}}$.\n\n` +
          `Calcul : $= \\frac{${a}}{${b * k}} = ${correct.slice(1, -1)}$.\n\n` +
          `Conclusion : le résultat est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_diviser_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_diviser",
    difficulty: 3,
    theme: "neutral",
    hint: "Par quelle fraction faut-il multiplier pour effectuer la division ?",
    tags: ["fraction_nombre", "division", "inverse", "qcm", "template"],
    generate: () => {
      const c = randomInt(2, 8);
      const d = randomInt(2, 8);
      return {
        text: `Diviser par $\\frac{${c}}{${d}}$ revient à multiplier par…`,
        format: "qcm",
        choices: [
          `$\\frac{${d}}{${c}}$`,
          `$\\frac{${c}}{${d}}$`,
          `$-\\frac{${c}}{${d}}$`,
          `$\\frac{${c}}{${c}}$`,
        ].filter((v, i, arr) => arr.indexOf(v) === i),
        expected: [`$\\frac{${d}}{${c}}$`],
        comparator: "mcq_exact",
        explanation:
          "Définition : diviser par une fraction revient à multiplier par son inverse.\n\n" +
          `Méthode : on cherche l’inverse de $\\frac{${c}}{${d}}$.\n\n` +
          `Calcul : l’inverse est $\\frac{${d}}{${c}}$.\n\n` +
          `Conclusion : on multiplie par $\\frac{${d}}{${c}}$.`,
      };
    },
  },

  // ---------- FRACTION_QUANTITE ----------
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $\\frac{1}{2}$ de 30.",
    format: "qcm",
    choices: ["15", "10", "20", "60"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "On divise 30 par 2.",
    explanation:
      "Définition : prendre une fraction d’un nombre, c’est multiplier.\n\n" +
      "Méthode : $\\frac{1}{2}$ de 30 = $30 \\div 2$.\n\n" +
      "Calcul : $30 \\div 2 = 15$.\n\n" +
      "Conclusion : $\\frac{1}{2}$ de 30 vaut 15.",
    tags: ["fraction_nombre", "quantite", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $\\frac{1}{4}$ de 20.",
    format: "qcm",
    choices: ["5", "4", "16", "80"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "On divise 20 par 4.",
    explanation:
      "Définition : prendre une fraction d’un nombre, c’est multiplier.\n\n" +
      "Méthode : $\\frac{1}{4}$ de 20 = $20 \\div 4$.\n\n" +
      "Calcul : $20 \\div 4 = 5$.\n\n" +
      "Conclusion : $\\frac{1}{4}$ de 20 vaut 5.",
    tags: ["fraction_nombre", "quantite", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise par le dénominateur, multiplie par le numérateur.",
    tags: ["fraction_nombre", "quantite", "template"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5]);
      const num = randomInt(1, d - 1);
      const total = d * randomInt(3, 12);
      const result = (total / d) * num;
      return {
        text: `Calculer $\\frac{${num}}{${d}}$ de ${total}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : prendre une fraction d’un nombre, c’est multiplier.\n\n" +
          "Méthode : on divise par le dénominateur, puis on multiplie par le numérateur.\n\n" +
          `Calcul : $${total} \\div ${d} = ${total / d}$, puis $\\times ${num} = ${result}$.\n\n` +
          `Conclusion : $\\frac{${num}}{${d}}$ de ${total} vaut ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Prends la fraction de la quantité totale.",
    tags: ["fraction_nombre", "quantite", "contexte", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 5]);
      const num = randomInt(1, d - 1);
      const total = d * randomInt(4, 10);
      const result = (total / d) * num;
      return {
        text: `Une classe compte ${total} élèves. $\\frac{${num}}{${d}}$ d’entre eux font de l’allemand. Combien d’élèves font de l’allemand ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : prendre une fraction d’une quantité, c’est multiplier.\n\n" +
          "Méthode : on divise l’effectif par le dénominateur, puis on multiplie par le numérateur.\n\n" +
          `Calcul : $${total} \\div ${d} = ${total / d}$, puis $\\times ${num} = ${result}$.\n\n` +
          `Conclusion : ${result} élèves font de l’allemand.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule la fraction de la somme d’argent.",
    tags: ["fraction_nombre", "quantite", "argent", "template"],
    generate: () => {
      const d = randomChoice([2, 4, 5]);
      const num = randomInt(1, d - 1);
      const total = d * randomChoice([10, 15, 20, 25]);
      const result = (total / d) * num;
      return {
        text: `Léa a ${total} €. Elle dépense $\\frac{${num}}{${d}}$ de cette somme. Combien dépense-t-elle ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : prendre une fraction d’une somme, c’est multiplier.\n\n" +
          "Méthode : on divise par le dénominateur, puis on multiplie par le numérateur.\n\n" +
          `Calcul : $${total} \\div ${d} = ${total / d}$, puis $\\times ${num} = ${result}$.\n\n` +
          `Conclusion : elle dépense ${result} €.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 4,
    theme: "neutral",
    hint: "Si une part vaut le résultat, remonte au total.",
    tags: ["fraction_nombre", "quantite", "inverse", "template"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5]);
      const part = randomInt(2, 9);
      const total = part * d;
      return {
        text: `$\\frac{1}{${d}}$ d’un nombre vaut ${part}. Quel est ce nombre ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : si $\\frac{1}{${d}}$ du nombre vaut ${part}, le nombre entier vaut ${d} fois cette part.\n\n` +
          `Méthode : on multiplie ${part} par ${d}.\n\n` +
          `Calcul : $${part} \\times ${d} = ${total}$.\n\n` +
          `Conclusion : le nombre est ${total}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "fraction_quantite_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer $\\frac{3}{5}$ de 40.",
    format: "open",
    expected: ["divise", "5", "24"],
    comparator: "contains_keyword",
    hint: "Divise d’abord par le dénominateur.",
    explanation:
      "Définition : prendre une fraction d’un nombre, c’est multiplier.\n\n" +
      "Méthode : on divise 40 par 5, puis on multiplie par 3.\n\n" +
      "Calcul : $40 \\div 5 = 8$, puis $8 \\times 3 = 24$.\n\n" +
      "Conclusion : $\\frac{3}{5}$ de 40 vaut 24.",
    tags: ["fraction_nombre", "quantite", "open"],
  },

  // ---------- FRACTION_OPPOSE ----------
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’opposé de $-\\frac{2}{5}$ ?",
    format: "qcm",
    choices: ["$\\frac{2}{5}$", "$-\\frac{2}{5}$", "$\\frac{5}{2}$", "$-\\frac{5}{2}$"],
    expected: ["$\\frac{2}{5}$"],
    comparator: "mcq_exact",
    hint: "L’opposé change le signe.",
    explanation:
      "Définition : l’opposé d’un nombre est son symétrique par rapport à 0 ; il change de signe.\n\n" +
      "Méthode : on change le signe de $-\\frac{2}{5}$.\n\n" +
      "Calcul : l’opposé de $-\\frac{2}{5}$ est $\\frac{2}{5}$.\n\n" +
      "Conclusion : l’opposé est $\\frac{2}{5}$.",
    tags: ["fraction_nombre", "oppose", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’opposé de $\\frac{4}{9}$ ?",
    format: "qcm",
    choices: ["$-\\frac{4}{9}$", "$\\frac{9}{4}$", "$\\frac{4}{9}$", "$-\\frac{9}{4}$"],
    expected: ["$-\\frac{4}{9}$"],
    comparator: "mcq_exact",
    hint: "On change seulement le signe, pas la valeur.",
    explanation:
      "Définition : l’opposé change le signe d’un nombre.\n\n" +
      "Méthode : on met un signe « − » devant $\\frac{4}{9}$.\n\n" +
      "Calcul : l’opposé de $\\frac{4}{9}$ est $-\\frac{4}{9}$.\n\n" +
      "Conclusion : l’opposé est $-\\frac{4}{9}$.",
    tags: ["fraction_nombre", "oppose", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut la somme d’une fraction et de son opposé ?",
    format: "qcm",
    choices: ["0", "1", "2 fois la fraction", "l’inverse"],
    expected: ["0"],
    comparator: "mcq_exact",
    hint: "Une fraction plus son opposé s’annulent.",
    explanation:
      "Définition : deux nombres opposés ont une somme nulle.\n\n" +
      "Méthode : on ajoute une fraction et son opposé.\n\n" +
      "Calcul : $\\frac{a}{b} + \\left(-\\frac{a}{b}\\right) = 0$.\n\n" +
      "Conclusion : la somme vaut 0.",
    tags: ["fraction_nombre", "oppose", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle différence y a-t-il entre l’opposé et l’inverse de $\\frac{3}{4}$ ?",
    format: "qcm",
    choices: [
      "l’opposé est $-\\frac{3}{4}$, l’inverse est $\\frac{4}{3}$",
      "l’opposé est $\\frac{4}{3}$, l’inverse est $-\\frac{3}{4}$",
      "ce sont les mêmes",
      "les deux valent $\\frac{3}{4}$",
    ],
    expected: ["l’opposé est $-\\frac{3}{4}$, l’inverse est $\\frac{4}{3}$"],
    comparator: "mcq_exact",
    hint: "L’opposé change le signe, l’inverse échange haut et bas.",
    explanation:
      "Définition : l’opposé change le signe ; l’inverse échange numérateur et dénominateur.\n\n" +
      "Méthode : on applique chaque transformation à $\\frac{3}{4}$.\n\n" +
      "Calcul : opposé $= -\\frac{3}{4}$, inverse $= \\frac{4}{3}$.\n\n" +
      "Conclusion : ce sont deux notions différentes.",
    tags: ["fraction_nombre", "oppose", "inverse", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_oppose_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    hint: "On change uniquement le signe.",
    tags: ["fraction_nombre", "oppose", "qcm", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      const b = randomInt(2, 10);
      return {
        text: `Quel est l’opposé de $\\frac{${a}}{${b}}$ ?`,
        format: "qcm",
        choices: [
          `$-\\frac{${a}}{${b}}$`,
          `$\\frac{${b}}{${a}}$`,
          `$\\frac{${a}}{${b}}$`,
          `$-\\frac{${b}}{${a}}$`,
        ].filter((v, i, arr) => arr.indexOf(v) === i),
        expected: [`$-\\frac{${a}}{${b}}$`],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’opposé change le signe d’un nombre.\n\n" +
          `Méthode : on met un « − » devant $\\frac{${a}}{${b}}$.\n\n` +
          `Calcul : l’opposé est $-\\frac{${a}}{${b}}$.\n\n` +
          `Conclusion : l’opposé est $-\\frac{${a}}{${b}}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_oppose_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    hint: "L’opposé d’un nombre négatif est positif.",
    tags: ["fraction_nombre", "oppose", "negatif", "qcm", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      const b = randomInt(2, 10);
      return {
        text: `Quel est l’opposé de $-\\frac{${a}}{${b}}$ ?`,
        format: "qcm",
        choices: [
          `$\\frac{${a}}{${b}}$`,
          `$-\\frac{${a}}{${b}}$`,
          `$\\frac{${b}}{${a}}$`,
          `$-\\frac{${b}}{${a}}$`,
        ].filter((v, i, arr) => arr.indexOf(v) === i),
        expected: [`$\\frac{${a}}{${b}}$`],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’opposé change le signe ; l’opposé d’un négatif est positif.\n\n" +
          `Méthode : on change le signe de $-\\frac{${a}}{${b}}$.\n\n` +
          `Calcul : l’opposé est $\\frac{${a}}{${b}}$.\n\n` +
          `Conclusion : l’opposé est $\\frac{${a}}{${b}}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "fraction_oppose_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce qu’est l’opposé d’une fraction et pourquoi leur somme est nulle.",
    format: "open",
    expected: ["signe", "0", "somme"],
    comparator: "contains_keyword",
    hint: "Pense à ce que vaut un nombre plus son opposé.",
    explanation:
      "Définition : l’opposé d’une fraction est cette fraction avec le signe changé.\n\n" +
      "Méthode : on ajoute la fraction et son opposé.\n\n" +
      "Calcul : $\\frac{a}{b} + \\left(-\\frac{a}{b}\\right) = 0$.\n\n" +
      "Conclusion : leur somme est nulle, c’est pourquoi ce sont des opposés.",
    tags: ["fraction_nombre", "oppose", "open"],
  },

  // ---------- FRACTION_DEFIS ----------
  {
    kind: "fixed",
    id: "fraction_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Léo mange $\\frac{2}{3}$ d’un gâteau. Quelle fraction du gâteau reste-t-il ?",
    format: "qcm",
    choices: ["$\\frac{1}{3}$", "$\\frac{2}{3}$", "$\\frac{1}{2}$", "$\\frac{3}{2}$"],
    expected: ["$\\frac{1}{3}$"],
    comparator: "mcq_exact",
    hint: "Le gâteau entier vaut $\\frac{3}{3}$.",
    explanation:
      "Définition : le gâteau entier vaut 1, soit $\\frac{3}{3}$.\n\n" +
      "Méthode : on soustrait la part mangée du total.\n\n" +
      "Calcul : $\\frac{3}{3} - \\frac{2}{3} = \\frac{1}{3}$.\n\n" +
      "Conclusion : il reste $\\frac{1}{3}$ du gâteau.",
    tags: ["fraction_nombre", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Lequel est le plus grand : $\\frac{2}{3}$ ou le décimal $0,7$ ?",
    format: "qcm",
    choices: ["$0,7$", "$\\frac{2}{3}$", "ils sont égaux"],
    expected: ["$0,7$"],
    comparator: "mcq_exact",
    hint: "$\\frac{2}{3} \\approx 0,66$.",
    explanation:
      "Définition : pour comparer, on met sous la même forme.\n\n" +
      "Méthode : on transforme $\\frac{2}{3}$ en décimal approché.\n\n" +
      "Calcul : $\\frac{2}{3} \\approx 0{,}67 < 0{,}7$.\n\n" +
      "Conclusion : $0,7$ est le plus grand.",
    tags: ["fraction_nombre", "defi", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Calculer $\\frac{1}{2}$ de $\\frac{2}{3}$.",
    format: "qcm",
    choices: ["$\\frac{1}{3}$", "$\\frac{2}{6}$", "$\\frac{3}{5}$", "$\\frac{2}{3}$"],
    expected: ["$\\frac{1}{3}$"],
    comparator: "mcq_exact",
    hint: "« de » signifie une multiplication.",
    explanation:
      "Définition : « la fraction d’une fraction » se calcule par une multiplication.\n\n" +
      "Méthode : $\\frac{1}{2} \\times \\frac{2}{3}$.\n\n" +
      "Calcul : $= \\frac{2}{6} = \\frac{1}{3}$.\n\n" +
      "Conclusion : le résultat est $\\frac{1}{3}$.",
    tags: ["fraction_nombre", "defi", "produit", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Pour multiplier, on ne met pas au même dénominateur.",
    tags: ["fraction_nombre", "defi", "erreur", "template"],
    generate: () => {
      const a = randomInt(1, 4);
      const b = randomInt(2, 5);
      const c = randomInt(1, 4);
      const d = randomInt(2, 5);
      return {
        text: `Pour calculer $\\frac{${a}}{${b}} \\times \\frac{${c}}{${d}}$, un élève met d’abord les fractions au même dénominateur. Sa méthode est-elle correcte ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : pour multiplier deux fractions, on multiplie directement numérateurs et dénominateurs.\n\n" +
          "Méthode : la mise au même dénominateur sert à l’addition, pas à la multiplication.\n\n" +
          `Calcul : $\\frac{${a}}{${b}} \\times \\frac{${c}}{${d}} = \\frac{${a * c}}{${b * d}}$.\n\n` +
          "Conclusion : non, sa méthode est inutile ici.",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Effectue d’abord la fraction de la quantité, puis ce qui reste.",
    tags: ["fraction_nombre", "defi", "contexte", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 5]);
      const num = randomInt(1, d - 1);
      const total = d * randomInt(4, 8);
      const utilise = (total / d) * num;
      const reste = total - utilise;
      return {
        text: `Un réservoir contient ${total} litres. On en utilise $\\frac{${num}}{${d}}$. Combien de litres reste-t-il ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation:
          "Définition : on calcule la part utilisée, puis on la retire du total.\n\n" +
          "Méthode : on prend la fraction du total, puis on soustrait.\n\n" +
          `Calcul : utilisé $= ${total} \\div ${d} \\times ${num} = ${utilise}$, reste $= ${total} - ${utilise} = ${reste}$.\n\n` +
          `Conclusion : il reste ${reste} litres.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "fraction_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi diviser par une fraction plus petite que 1 donne un résultat plus grand que le nombre de départ.",
    format: "open",
    expected: ["inverse", "multiplier", "plus grand"],
    comparator: "contains_keyword",
    hint: "Diviser par une fraction, c’est multiplier par son inverse (qui est plus grand que 1).",
    explanation:
      "Définition : diviser par une fraction revient à multiplier par son inverse.\n\n" +
      "Méthode : si la fraction est plus petite que 1, son inverse est plus grand que 1.\n\n" +
      "Calcul : par exemple $6 \\div \\frac{1}{2} = 6 \\times 2 = 12$.\n\n" +
      "Conclusion : multiplier par un nombre plus grand que 1 donne un résultat plus grand.",
    tags: ["fraction_nombre", "defi", "open"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_open_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on peut toujours écrire un nombre décimal comme une fraction, donc comme un rationnel.",
    format: "open",
    expected: ["décimal", "fraction", "10"],
    comparator: "contains_keyword",
    hint: "Pense aux dixièmes, centièmes…",
    explanation:
      "Définition : un nombre rationnel s’écrit comme quotient de deux entiers.\n\n" +
      "Méthode : un décimal s’écrit sur 10, 100, 1000… selon le nombre de chiffres après la virgule.\n\n" +
      "Calcul : par exemple $0{,}25 = \\frac{25}{100} = \\frac{1}{4}$.\n\n" +
      "Conclusion : tout décimal est une fraction, donc un nombre rationnel.",
    tags: ["fraction_nombre", "defi", "rationnel", "open"],
  },
];
