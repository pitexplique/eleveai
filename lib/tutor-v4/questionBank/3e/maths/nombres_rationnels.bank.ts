// lib/tutor-v4/question-banks/maths/3e/nombres_rationnels.bank.ts

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

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function simplifyFraction(num: number, den: number) {
  const g = gcd(num, den);
  return {
    num: num / g,
    den: den / g,
  };
}

function formatFraction(num: number, den: number) {
  return `${num}/${den}`;
}

export const nombresRationnelsBank: TutorBankItemV4[] = [
  /* =========================
     RATIONNEL_RECONNAITRE
  ========================= */

  {
    kind: "fixed",
    id: "3e_rationnel_reconnaitre_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un nombre rationnel est un nombre qui peut s’écrire sous la forme…",
    format: "qcm",
    choices: ["a + b", "a/b avec b non nul", "a × b", "a²"],
    expected: ["a/b avec b non nul"],
    comparator: "mcq_exact",
    hint: "Pense à une écriture fractionnaire.",
    explanation:
      "Un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, où a et b sont des entiers et b est non nul.",
    tags: ["rationnel", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_reconnaitre_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre 3/4 est-il un nombre rationnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Il est déjà écrit sous forme de fraction.",
    explanation:
      "Oui. 3/4 est une écriture fractionnaire avec un dénominateur non nul. C’est donc un nombre rationnel.",
    tags: ["rationnel", "fraction", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_reconnaitre_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre -2,5 est-il rationnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "-2,5 peut s’écrire sous forme de fraction.",
    explanation:
      "Oui. -2,5 = -25/10 = -5/2. Il peut s’écrire sous forme fractionnaire, donc c’est un nombre rationnel.",
    tags: ["rationnel", "decimal", "negatif", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_reconnaitre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 0,75 est un nombre rationnel.",
    format: "open",
    expected: ["fraction", "75/100", "3/4", "rationnel"],
    comparator: "contains_keyword",
    hint: "Essaie d’écrire 0,75 sous forme de fraction.",
    explanation:
      "0,75 est rationnel car 0,75 = 75/100 = 3/4. Il peut donc s’écrire sous forme d’une fraction.",
    tags: ["rationnel", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "3e_rationnel_reconnaitre_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Un entier peut toujours s’écrire sur 1.",
    tags: ["rationnel", "entier", "template", "qcm"],
    generate: () => {
      const n = randomInt(-12, 12);

      return {
        text: `Le nombre ${n} est-il rationnel ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: `Oui. Tout entier est rationnel car ${n} peut s’écrire ${n}/1.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_rationnel_reconnaitre_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Un décimal fini peut s’écrire avec un dénominateur 10, 100, 1000...",
    tags: ["rationnel", "decimal", "template", "qcm"],
    generate: () => {
      const decimals = [
        { text: "0,2", frac: "2/10" },
        { text: "0,35", frac: "35/100" },
        { text: "-1,5", frac: "-15/10" },
        { text: "2,75", frac: "275/100" },
      ];
      const item = randomChoice(decimals);

      return {
        text: `Le nombre ${item.text} est-il rationnel ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: `Oui. ${item.text} peut s’écrire sous forme fractionnaire, par exemple ${item.frac}.`,
      };
    },
  },

  /* =========================
     RATIONNEL_ECRITURES
  ========================= */

  {
    kind: "fixed",
    id: "3e_rationnel_ecritures_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_ecritures",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l’écriture décimale de 1/2 ?",
    format: "qcm",
    choices: ["0,2", "0,5", "1,2", "2"],
    expected: ["0,5"],
    comparator: "mcq_exact",
    hint: "1 ÷ 2 = ?",
    explanation:
      "1/2 = 1 ÷ 2 = 0,5.",
    tags: ["rationnel", "ecritures", "decimal", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_ecritures_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_ecritures",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est égale à 0,25 ?",
    format: "qcm",
    choices: ["25/10", "1/4", "4/1", "2/5"],
    expected: ["1/4"],
    comparator: "mcq_exact",
    hint: "0,25 = 25/100.",
    explanation:
      "0,25 = 25/100. En simplifiant par 25, on obtient 1/4.",
    tags: ["rationnel", "ecritures", "simplification", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_ecritures_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_ecritures",
    difficulty: 2,
    theme: "neutral",
    text: "Donne l’écriture décimale de 3/4.",
    format: "short",
    expected: ["0,75", "0.75"],
    comparator: "exact_text",
    hint: "3 ÷ 4 = ?",
    explanation:
      "3/4 = 3 ÷ 4 = 0,75.",
    tags: ["rationnel", "decimal", "short"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_ecritures_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_ecritures",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 0,4 = 2/5.",
    format: "open",
    expected: ["0,4", "4/10", "2/5", "simplifie"],
    comparator: "contains_keyword",
    hint: "Écris 0,4 sous forme de fraction décimale.",
    explanation:
      "0,4 = 4/10. En simplifiant par 2, on obtient 2/5.",
    tags: ["rationnel", "open", "ecritures"],
  },

  {
    kind: "template",
    id: "3e_rationnel_ecritures_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_ecritures",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise le numérateur par le dénominateur.",
    tags: ["rationnel", "decimal", "template", "short"],
    generate: () => {
      const items = [
        { frac: "1/4", dec: "0,25" },
        { frac: "3/4", dec: "0,75" },
        { frac: "1/5", dec: "0,2" },
        { frac: "2/5", dec: "0,4" },
        { frac: "3/5", dec: "0,6" },
        { frac: "4/5", dec: "0,8" },
      ];
      const item = randomChoice(items);

      return {
        text: `Donne l’écriture décimale de ${item.frac}.`,
        format: "short",
        expected: [item.dec, item.dec.replace(",", ".")],
        comparator: "exact_text",
        explanation: `${item.frac} = ${item.dec}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_rationnel_ecritures_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_ecritures",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris d’abord le décimal sur 10 ou sur 100.",
    tags: ["rationnel", "fraction", "template", "qcm"],
    generate: () => {
      const items = [
        { dec: "0,5", frac: "1/2", wrongs: ["5/1", "5/100", "2/1"] },
        { dec: "0,25", frac: "1/4", wrongs: ["25/10", "4/1", "2/5"] },
        { dec: "0,75", frac: "3/4", wrongs: ["75/10", "7/5", "4/3"] },
        { dec: "0,2", frac: "1/5", wrongs: ["2/1", "2/100", "5/1"] },
      ];
      const item = randomChoice(items);

      return {
        text: `Quelle fraction simplifiée est égale à ${item.dec} ?`,
        format: "qcm",
        choices: shuffle([item.frac, ...item.wrongs]),
        expected: [item.frac],
        comparator: "mcq_exact",
        explanation: `${item.dec} s’écrit sous forme de fraction, puis on simplifie pour obtenir ${item.frac}.`,
      };
    },
  },

  /* =========================
     RATIONNEL_COMPARER
  ========================= */

  {
    kind: "fixed",
    id: "3e_rationnel_comparer_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est le plus grand : 2/3 ou 1/3 ?",
    format: "qcm",
    choices: ["2/3", "1/3", "ils sont égaux"],
    expected: ["2/3"],
    comparator: "mcq_exact",
    hint: "Les dénominateurs sont identiques.",
    explanation:
      "Les deux fractions ont le même dénominateur. On compare donc les numérateurs : 2 > 1, donc 2/3 est plus grand.",
    tags: ["rationnel", "comparer", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_comparer_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est le plus petit : -1/2 ou 1/3 ?",
    format: "qcm",
    choices: ["-1/2", "1/3", "ils sont égaux"],
    expected: ["-1/2"],
    comparator: "mcq_exact",
    hint: "Un nombre négatif est plus petit qu’un nombre positif.",
    explanation:
      "-1/2 est négatif alors que 1/3 est positif. Donc -1/2 est le plus petit.",
    tags: ["rationnel", "comparer", "negatif", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_comparer_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Comparer 3/4 et 2/3. Quel est le plus grand ?",
    format: "qcm",
    choices: ["3/4", "2/3", "ils sont égaux"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Tu peux comparer les produits en croix.",
    explanation:
      "On compare 3/4 et 2/3 par produits en croix : 3 × 3 = 9 et 2 × 4 = 8. Comme 9 > 8, 3/4 > 2/3.",
    tags: ["rationnel", "comparer", "produits_croix", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_comparer_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi -3/4 est plus petit que -1/2.",
    format: "open",
    expected: ["négatif", "-0,75", "-0,5", "plus petit"],
    comparator: "contains_keyword",
    hint: "Compare leurs écritures décimales.",
    explanation:
      "-3/4 = -0,75 et -1/2 = -0,5. Sur une droite graduée, -0,75 est plus à gauche que -0,5, donc -3/4 est plus petit.",
    tags: ["rationnel", "comparer", "open", "negatif"],
  },

  {
    kind: "template",
    id: "3e_rationnel_comparer_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare avec les produits en croix.",
    tags: ["rationnel", "comparer", "template", "qcm"],
    generate: () => {
      const a = randomInt(1, 8);
      const b = randomInt(2, 9);
      const c = randomInt(1, 8);
      const d = randomInt(2, 9);

      const left = a / b;
      const right = c / d;

      const f1 = formatFraction(a, b);
      const f2 = formatFraction(c, d);

      const correct = left > right ? f1 : right > left ? f2 : "ils sont égaux";

      return {
        text: `Quel nombre est le plus grand : ${f1} ou ${f2} ?`,
        format: "qcm",
        choices: shuffle([f1, f2, "ils sont égaux"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: `On compare ${f1} et ${f2}. On peut utiliser les produits en croix : ${a} × ${d} = ${
          a * d
        } et ${c} × ${b} = ${c * b}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_rationnel_comparer_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_comparer",
    difficulty: 3,
    theme: "reunion",
    hint: "Compare les fractions de trajet.",
    tags: ["rationnel", "comparer", "reunion", "template", "qcm"],
    generate: () => {
      const items = [
        { a: "2/3", b: "3/4", correct: "3/4" },
        { a: "5/8", b: "1/2", correct: "5/8" },
        { a: "3/5", b: "2/3", correct: "2/3" },
      ];
      const item = randomChoice(items);

      return {
        text: `Sur un sentier à La Réunion, Maé a parcouru ${item.a} du trajet et Léo ${item.b}. Qui a parcouru la plus grande fraction du trajet ?`,
        format: "qcm",
        choices: shuffle([item.a, item.b, "ils ont parcouru la même fraction"]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: `On compare ${item.a} et ${item.b}. La plus grande fraction est ${item.correct}.`,
      };
    },
  },

  /* =========================
     RATIONNEL_CALCULER
  ========================= */

  {
    kind: "fixed",
    id: "3e_rationnel_calculer_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : 1/3 + 2/3",
    format: "short",
    expected: ["1", "3/3"],
    comparator: "exact_text",
    hint: "Les dénominateurs sont identiques.",
    explanation:
      "1/3 + 2/3 = 3/3 = 1.",
    tags: ["rationnel", "calcul", "addition"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_calculer_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : 3/4 × 2/5",
    format: "qcm",
    choices: ["6/20", "5/9", "6/9", "3/10"],
    expected: ["6/20"],
    comparator: "mcq_exact",
    hint: "On multiplie les numérateurs entre eux et les dénominateurs entre eux.",
    explanation:
      "3/4 × 2/5 = (3 × 2)/(4 × 5) = 6/20. On peut simplifier ensuite en 3/10.",
    tags: ["rationnel", "calcul", "produit", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_calculer_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Calculer : 1/2 + 1/4",
    format: "short",
    expected: ["3/4", "0,75", "0.75"],
    comparator: "exact_text",
    hint: "Mets les fractions au même dénominateur.",
    explanation:
      "1/2 = 2/4. Donc 1/2 + 1/4 = 2/4 + 1/4 = 3/4.",
    tags: ["rationnel", "calcul", "addition", "denominateur"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_calculer_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : 1/2 + 1/3 = 2/5. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour additionner des fractions, on ne additionne pas les dénominateurs.",
    explanation:
      "Non. Il faut mettre au même dénominateur : 1/2 = 3/6 et 1/3 = 2/6. Donc 1/2 + 1/3 = 5/6.",
    tags: ["rationnel", "calcul", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_calculer_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 2/3 × 3/5 = 2/5.",
    format: "open",
    expected: ["multiplie", "numérateurs", "dénominateurs", "6/15", "2/5"],
    comparator: "contains_keyword",
    hint: "Multiplie puis simplifie.",
    explanation:
      "On calcule 2/3 × 3/5 = 6/15. En simplifiant par 3, on obtient 2/5.",
    tags: ["rationnel", "calcul", "open", "produit"],
  },

  {
    kind: "template",
    id: "3e_rationnel_calculer_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Les dénominateurs sont identiques.",
    tags: ["rationnel", "calcul", "addition", "template"],
    generate: () => {
      const den = randomChoice([5, 6, 7, 8, 9]);
      const a = randomInt(1, den - 2);
      const b = randomInt(1, den - a - 1);
      const num = a + b;
      const s = simplifyFraction(num, den);

      return {
        text: `Calculer : ${a}/${den} + ${b}/${den}`,
        format: "short",
        expected: [formatFraction(s.num, s.den), `${num}/${den}`],
        comparator: "exact_text",
        explanation: `Les dénominateurs sont identiques : ${a}/${den} + ${b}/${den} = ${num}/${den}. En simplifiant si possible, on obtient ${formatFraction(
          s.num,
          s.den
        )}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_rationnel_calculer_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie les numérateurs et les dénominateurs.",
    tags: ["rationnel", "calcul", "produit", "template"],
    generate: () => {
      const a = randomInt(1, 6);
      const b = randomInt(2, 8);
      const c = randomInt(1, 6);
      const d = randomInt(2, 8);

      const num = a * c;
      const den = b * d;
      const s = simplifyFraction(num, den);

      return {
        text: `Calculer : ${a}/${b} × ${c}/${d}`,
        format: "short",
        expected: [formatFraction(s.num, s.den), formatFraction(num, den)],
        comparator: "exact_text",
        explanation: `${a}/${b} × ${c}/${d} = ${num}/${den}. En simplifiant, on obtient ${formatFraction(
          s.num,
          s.den
        )}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_rationnel_calculer_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par simplifier ou convertir si nécessaire.",
    tags: ["rationnel", "calcul", "probleme", "template"],
    generate: () => {
      const a = randomChoice([
        { text: "0,5", frac: "1/2" },
        { text: "0,25", frac: "1/4" },
        { text: "0,75", frac: "3/4" },
      ]);
      const b = randomChoice([
        { text: "1/2", value: 0.5 },
        { text: "1/4", value: 0.25 },
      ]);

      const valueA =
        a.frac === "1/2" ? 0.5 : a.frac === "1/4" ? 0.25 : 0.75;
      const result = valueA + b.value;

      const expected =
        result === 1 ? ["1"] : result === 0.75 ? ["3/4", "0,75", "0.75"] : ["5/4", "1,25", "1.25"];

      return {
        text: `Calculer : ${a.text} + ${b.text}`,
        format: "short",
        expected,
        comparator: "exact_text",
        explanation: `${a.text} = ${a.frac}. On additionne ensuite ${a.frac} et ${b.text}.`,
      };
    },
  },

  /* =========================
     RATIONNEL_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_rationnel_defis_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Trouve un nombre rationnel strictement compris entre 1/2 et 3/4.",
    format: "short",
    expected: ["2/3", "0,6", "0.6", "5/8", "0,7", "0.7"],
    comparator: "exact_text",
    hint: "Tu peux choisir un décimal entre 0,5 et 0,75.",
    explanation:
      "1/2 = 0,5 et 3/4 = 0,75. Par exemple 0,6, 5/8 ou 2/3 conviennent.",
    tags: ["rationnel", "defi", "encadrement"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_defis_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme : « Entre deux nombres rationnels, il n’y a aucun autre nombre rationnel. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Essaie entre 1/2 et 3/4.",
    explanation:
      "Non. Entre deux rationnels, on peut toujours trouver un autre rationnel. Par exemple entre 1/2 et 3/4, il y a 2/3.",
    tags: ["rationnel", "defi", "densite", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_rationnel_defis_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi tout nombre décimal fini est rationnel.",
    format: "open",
    expected: ["fraction", "10", "100", "1000", "rationnel"],
    comparator: "contains_keyword",
    hint: "Un décimal fini peut s’écrire avec un dénominateur 10, 100 ou 1000.",
    explanation:
      "Tout nombre décimal fini peut s’écrire sous forme d’une fraction dont le dénominateur est 10, 100, 1000, etc. Il est donc rationnel.",
    tags: ["rationnel", "defi", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "3e_rationnel_defis_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les deux rationnels en écriture décimale.",
    tags: ["rationnel", "defi", "template", "qcm"],
    generate: () => {
      const items = [
        {
          a: "1/2",
          b: "3/4",
          candidates: ["2/3", "4/5", "1/4"],
          correct: "2/3",
          explanation: "1/2 = 0,5 ; 3/4 = 0,75 ; 2/3 ≈ 0,67.",
        },
        {
          a: "1/4",
          b: "1/2",
          candidates: ["1/3", "3/4", "1/5"],
          correct: "1/3",
          explanation: "1/4 = 0,25 ; 1/2 = 0,5 ; 1/3 ≈ 0,33.",
        },
      ];
      const item = randomChoice(items);

      return {
        text: `Quel nombre rationnel est strictement compris entre ${item.a} et ${item.b} ?`,
        format: "qcm",
        choices: shuffle(item.candidates),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "3e_rationnel_defis_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "nombres_rationnels",
    microId: "rationnel_defis",
    difficulty: 5,
    theme: "reunion",
    hint: "Calcule la part consommée puis compare.",
    tags: ["rationnel", "defi", "reunion", "probleme", "template"],
    generate: () => {
      const total = randomChoice([24, 30, 36, 48]);
      const part1 = randomChoice([1, 2, 3]);
      const den1 = randomChoice([4, 6, 8]);
      const consumed = (total * part1) / den1;

      return {
        text: `À La Réunion, une classe prépare ${total} portions de fruits. Elle en distribue ${part1}/${den1}. Combien de portions sont distribuées ?`,
        format: "short",
        expected: [String(consumed)],
        comparator: "number_equal",
        explanation: `On calcule ${part1}/${den1} de ${total} : ${total} × ${part1}/${den1} = ${consumed}.`,
      };
    },
  },
];