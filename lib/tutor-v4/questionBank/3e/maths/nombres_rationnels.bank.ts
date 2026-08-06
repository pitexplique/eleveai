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
    id: "3e_fraction_rationnel_reconnaitre_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un nombre rationnel est un nombre qui peut s’écrire sous la forme…",
    format: "qcm",
    choices: ["a + b", "a/b avec b non nul", "a × b", "a²"],
    expected: ["a/b avec b non nul"],
    comparator: "mcq_exact",
    hint: "Pense à une écriture fractionnaire.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("Un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, où a et b sont des entiers et b est non nul.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_reconnaitre_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre 3/4 est-il un nombre rationnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Il est déjà écrit sous forme de fraction.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("Oui. 3/4 est une écriture fractionnaire avec un dénominateur non nul. C’est donc un nombre rationnel.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "fraction", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_reconnaitre_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre -2,5 est-il rationnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "-2,5 peut s’écrire sous forme de fraction.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("Oui. -2,5 = -25/10 = -5/2. Il peut s’écrire sous forme fractionnaire, donc c’est un nombre rationnel.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "decimal", "negatif", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_reconnaitre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 0,75 est un nombre rationnel.",
    format: "open",
    expected: ["fraction", "75/100", "3/4", "rationnel"],
    comparator: "contains_keyword",
    hint: "Essaie d’écrire 0,75 sous forme de fraction.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("0,75 est rationnel car 0,75 = 75/100 = 3/4. Il peut donc s’écrire sous forme d’une fraction.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "3e_fraction_rationnel_reconnaitre_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Un entier peut toujours s’écrire sur 1.",
    tags: ["fraction_rationnel", "entier", "template", "qcm"],
    generate: () => {
      const n = randomInt(-12, 12);

      return {
        text: `Le nombre ${n} est-il rationnel ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
          `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
          `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
          (`Oui. Tout entier est rationnel car ${n} peut s’écrire ${n}/1.`) +
          `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_fraction_rationnel_reconnaitre_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Un décimal fini peut s’écrire avec un dénominateur 10, 100, 1000...",
    tags: ["fraction_rationnel", "decimal", "template", "qcm"],
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
        explanation: `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
          `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
          `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
          (`Oui. ${item.text} peut s’écrire sous forme fractionnaire, par exemple ${item.frac}.`) +
          `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
      };
    },
  },

  /* =========================
     RATIONNEL_ECRITURES
  ========================= */

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_ecriture_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_ecriture",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l’écriture décimale de 1/2 ?",
    format: "qcm",
    choices: ["0,2", "0,5", "1,2", "2"],
    expected: ["0,5"],
    comparator: "mcq_exact",
    hint: "1 ÷ 2 = ?",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("1/2 = 1 ÷ 2 = 0,5.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "ecritures", "decimal", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_ecriture_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_ecriture",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est égale à 0,25 ?",
    format: "qcm",
    choices: ["25/10", "1/4", "4/1", "2/5"],
    expected: ["1/4"],
    comparator: "mcq_exact",
    hint: "0,25 = 25/100.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("0,25 = 25/100. En simplifiant par 25, on obtient 1/4.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "ecritures", "simplification", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_ecriture_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_ecriture",
    difficulty: 2,
    theme: "neutral",
    text: "Donne l’écriture décimale de 3/4.",
    format: "short",
    expected: ["0,75", "0.75"],
    comparator: "exact_text",
    hint: "3 ÷ 4 = ?",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("3/4 = 3 ÷ 4 = 0,75.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "decimal", "short"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_ecriture_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_ecriture",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 0,4 = 2/5.",
    format: "open",
    expected: ["0,4", "4/10", "2/5", "simplifie"],
    comparator: "contains_keyword",
    hint: "Écris 0,4 sous forme de fraction décimale.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("0,4 = 4/10. En simplifiant par 2, on obtient 2/5.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "open", "ecritures"],
  },

  {
    kind: "template",
    id: "3e_fraction_rationnel_ecriture_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_ecriture",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise le numérateur par le dénominateur.",
    tags: ["fraction_rationnel", "decimal", "template", "short"],
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
        explanation: `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
          `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
          `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
          (`${item.frac} = ${item.dec}.`) +
          `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_fraction_rationnel_ecriture_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_ecriture",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris d’abord le décimal sur 10 ou sur 100.",
    tags: ["fraction_rationnel", "fraction", "template", "qcm"],
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
        explanation: `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
          `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
          `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
          (`${item.dec} s’écrit sous forme de fraction, puis on simplifie pour obtenir ${item.frac}.`) +
          `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
      };
    },
  },

  /* =========================
     RATIONNEL_COMPARER
  ========================= */

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_comparer_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est le plus grand : 2/3 ou 1/3 ?",
    format: "qcm",
    choices: ["2/3", "1/3", "ils sont égaux"],
    expected: ["2/3"],
    comparator: "mcq_exact",
    hint: "Les dénominateurs sont identiques.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("Les deux fractions ont le même dénominateur. On compare donc les numérateurs : 2 > 1, donc 2/3 est plus grand.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "comparer", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_comparer_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est le plus petit : -1/2 ou 1/3 ?",
    format: "qcm",
    choices: ["-1/2", "1/3", "ils sont égaux"],
    expected: ["-1/2"],
    comparator: "mcq_exact",
    hint: "Un nombre négatif est plus petit qu’un nombre positif.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("-1/2 est négatif alors que 1/3 est positif. Donc -1/2 est le plus petit.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "comparer", "negatif", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_comparer_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Comparer 3/4 et 2/3. Quel est le plus grand ?",
    format: "qcm",
    choices: ["3/4", "2/3", "ils sont égaux"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Tu peux comparer les produits en croix.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("On compare 3/4 et 2/3 par produits en croix : 3 × 3 = 9 et 2 × 4 = 8. Comme 9 > 8, 3/4 > 2/3.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "comparer", "produits_croix", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_comparer_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi -3/4 est plus petit que -1/2.",
    format: "open",
    expected: ["négatif", "-0,75", "-0,5", "plus petit"],
    comparator: "contains_keyword",
    hint: "Compare leurs écritures décimales.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("-3/4 = -0,75 et -1/2 = -0,5. Sur une droite graduée, -0,75 est plus à gauche que -0,5, donc -3/4 est plus petit.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "comparer", "open", "negatif"],
  },

  {
    kind: "template",
    id: "3e_fraction_rationnel_comparer_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare avec les produits en croix.",
    tags: ["fraction_rationnel", "comparer", "template", "qcm"],
    generate: () => {
      const a = randomInt(1, 8);
      const b = randomInt(2, 9);
      let c = randomInt(1, 8);
      let d = randomInt(2, 9);

      // Deux fois la même écriture, c'est deux fois la même proposition — et
      // une question sans objet. On retire jusqu'à ce qu'elles diffèrent.
      // Deux fractions égales écrites autrement (1/2 et 2/4) restent bonnes à
      // tirer : « ils sont égaux » devient alors la réponse.
      while (c === a && d === b) {
        c = randomInt(1, 8);
        d = randomInt(2, 9);
      }

      // Produits en croix plutôt que division : c'est la méthode enseignée, et
      // elle ne dépend pas de l'arrondi des décimaux.
      const left = a * d;
      const right = c * b;

      const f1 = formatFraction(a, b);
      const f2 = formatFraction(c, d);

      const correct = left > right ? f1 : right > left ? f2 : "ils sont égaux";

      return {
        text: `Quel nombre est le plus grand : ${f1} ou ${f2} ?`,
        format: "qcm",
        choices: shuffle([f1, f2, "ils sont égaux"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
          `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
          `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
          (`On compare ${f1} et ${f2}. On peut utiliser les produits en croix : ${a} × ${d} = ${
          a * d
        } et ${c} × ${b} = ${c * b}.`) +
          `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_fraction_rationnel_comparer_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_comparer",
    difficulty: 3,
    theme: "reunion",
    hint: "Compare les fractions de trajet.",
    tags: ["fraction_rationnel", "comparer", "reunion", "template", "qcm"],
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
        explanation: `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
          `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
          `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
          (`On compare ${item.a} et ${item.b}. La plus grande fraction est ${item.correct}.`) +
          `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
      };
    },
  },

  /* =========================
     RATIONNEL_CALCULER
  ========================= */

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_calculer_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : 1/3 + 2/3",
    format: "short",
    expected: ["1", "3/3"],
    comparator: "exact_text",
    hint: "Les dénominateurs sont identiques.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("1/3 + 2/3 = 3/3 = 1.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "calcul", "addition"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_calculer_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : 3/4 × 2/5",
    format: "qcm",
    choices: ["6/20", "5/9", "6/9", "3/10"],
    expected: ["6/20"],
    comparator: "mcq_exact",
    hint: "On multiplie les numérateurs entre eux et les dénominateurs entre eux.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("3/4 × 2/5 = (3 × 2)/(4 × 5) = 6/20. On peut simplifier ensuite en 3/10.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "calcul", "produit", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_calculer_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Calculer : 1/2 + 1/4",
    format: "short",
    expected: ["3/4", "0,75", "0.75"],
    comparator: "exact_text",
    hint: "Mets les fractions au même dénominateur.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("1/2 = 2/4. Donc 1/2 + 1/4 = 2/4 + 1/4 = 3/4.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "calcul", "addition", "denominateur"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_calculer_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : 1/2 + 1/3 = 2/5. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour additionner des fractions, on ne additionne pas les dénominateurs.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("Non. Il faut mettre au même dénominateur : 1/2 = 3/6 et 1/3 = 2/6. Donc 1/2 + 1/3 = 5/6.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "calcul", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_calculer_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 2/3 × 3/5 = 2/5.",
    format: "open",
    expected: ["multiplie", "numérateurs", "dénominateurs", "6/15", "2/5"],
    comparator: "contains_keyword",
    hint: "Multiplie puis simplifie.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("On calcule 2/3 × 3/5 = 6/15. En simplifiant par 3, on obtient 2/5.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "calcul", "open", "produit"],
  },

  {
    kind: "template",
    id: "3e_fraction_rationnel_calculer_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Les dénominateurs sont identiques.",
    tags: ["fraction_rationnel", "calcul", "addition", "template"],
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
        explanation: `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
          `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
          `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
          (`Les dénominateurs sont identiques : ${a}/${den} + ${b}/${den} = ${num}/${den}. En simplifiant si possible, on obtient ${formatFraction(
          s.num,
          s.den
        )}.`) +
          `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_fraction_rationnel_calculer_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie les numérateurs et les dénominateurs.",
    tags: ["fraction_rationnel", "calcul", "produit", "template"],
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
        explanation: `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
          `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
          `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
          (`${a}/${b} × ${c}/${d} = ${num}/${den}. En simplifiant, on obtient ${formatFraction(
          s.num,
          s.den
        )}.`) +
          `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_fraction_rationnel_calculer_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par simplifier ou convertir si nécessaire.",
    tags: ["fraction_rationnel", "calcul", "probleme", "template"],
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
        explanation: `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
          `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
          `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
          (`${a.text} = ${a.frac}. On additionne ensuite ${a.frac} et ${b.text}.`) +
          `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
      };
    },
  },

  /* =========================
     RATIONNEL_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Trouve un nombre rationnel strictement compris entre 1/2 et 3/4.",
    format: "short",
    expected: ["2/3", "0,6", "0.6", "5/8", "0,7", "0.7"],
    comparator: "exact_text",
    hint: "Tu peux choisir un décimal entre 0,5 et 0,75.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("1/2 = 0,5 et 3/4 = 0,75. Par exemple 0,6, 5/8 ou 2/3 conviennent.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "defi", "encadrement"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_defi_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme : « Entre deux nombres rationnels, il n’y a aucun autre nombre rationnel. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Essaie entre 1/2 et 3/4.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("Non. Entre deux rationnels, on peut toujours trouver un autre rationnel. Par exemple entre 1/2 et 3/4, il y a 2/3.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "defi", "densite", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_fraction_rationnel_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi tout nombre décimal fini est rationnel.",
    format: "open",
    expected: ["fraction", "10", "100", "1000", "rationnel"],
    comparator: "contains_keyword",
    hint: "Un décimal fini peut s’écrire avec un dénominateur 10, 100 ou 1000.",
    explanation:
      `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
      `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
      `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
      ("Tout nombre décimal fini peut s’écrire sous forme d’une fraction dont le dénominateur est 10, 100, 1000, etc. Il est donc rationnel.") +
      `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
    tags: ["fraction_rationnel", "defi", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "3e_fraction_rationnel_defi_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les deux rationnels en écriture décimale.",
    tags: ["fraction_rationnel", "defi", "template", "qcm"],
    generate: () => {
      const items = [
        {
          a: "1/2",
          b: "3/4",
          candidates: ["2/3", "4/5", "1/4"],
          correct: "2/3",
          explanation: `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
            `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
            `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
            ("1/2 = 0,5 ; 3/4 = 0,75 ; 2/3 ≈ 0,67.") +
            `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
        },
        {
          a: "1/4",
          b: "1/2",
          candidates: ["1/3", "3/4", "1/5"],
          correct: "1/3",
          explanation: `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
            `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
            `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
            ("1/4 = 0,25 ; 1/2 = 0,5 ; 1/3 ≈ 0,33.") +
            `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
        },
      ];
      const item = randomChoice(items);

      return {
        text: `Quel nombre rationnel est strictement compris entre ${item.a} et ${item.b} ?`,
        format: "qcm",
        choices: shuffle(item.candidates),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
          `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
          `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
          (item.explanation) +
          `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_fraction_rationnel_defi_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Calcule la part consommée puis compare.",
    tags: ["fraction_rationnel", "defi", "reunion", "probleme", "template"],
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
        explanation: `Définition : un nombre rationnel est un nombre qui peut s’écrire sous la forme a/b, avec a et b entiers et b non nul.\n\n` +
          `Méthode : on écrit les nombres sous une forme adaptée : fraction, décimal ou même dénominateur, puis on calcule ou on compare.\n\n` +
          `Calcul : on effectue les transformations ou les opérations nécessaires étape par étape. ` +
          (`On calcule ${part1}/${den1} de ${total} : ${total} × ${part1}/${den1} = ${consumed}.`) +
          `\n\nConclusion : le résultat obtenu donne la réponse attendue sous forme exacte ou simplifiée.`,
      };
    },
  },

  /* =========================
     RATIONNEL_RECONNAITRE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_fraction_rationnel_reconnaitre_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre entier $5$ est-il un nombre rationnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Peut-on l’écrire sous la forme $\\dfrac{a}{b}$ ?",
    explanation:
      "Définition : un rationnel s’écrit $\\dfrac{a}{b}$ avec $a$, $b$ entiers et $b \\neq 0$.\n\n" +
      "Méthode : on cherche une écriture fractionnaire de $5$.\n\n" +
      "Calcul : $5 = \\dfrac{5}{1}$.\n\n" +
      "Conclusion : oui, $5$ est un nombre rationnel.",
    tags: ["fraction_rationnel", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_fraction_rationnel_reconnaitre_fixed_4_decimal",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre décimal $0{,}25$ est-il un nombre rationnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "$0{,}25 = \\dfrac{25}{100}$.",
    explanation:
      "Définition : un rationnel s’écrit sous forme de fraction.\n\n" +
      "Méthode : on cherche une fraction égale à $0{,}25$.\n\n" +
      "Calcul : $0{,}25 = \\dfrac{25}{100} = \\dfrac{1}{4}$.\n\n" +
      "Conclusion : oui, $0{,}25$ est un nombre rationnel.",
    tags: ["fraction_rationnel", "reconnaitre", "decimal", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_fraction_rationnel_reconnaitre_fixed_5_denominateur",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans l’écriture $\\dfrac{a}{b}$ d’un nombre rationnel, quelle condition sur $b$ ?",
    format: "qcm",
    choices: ["$b \\neq 0$", "$b = 0$", "$b > a$", "$b$ est pair"],
    expected: ["$b \\neq 0$"],
    comparator: "mcq_exact",
    hint: "On ne peut pas diviser par $0$.",
    explanation:
      "Définition : un rationnel est $\\dfrac{a}{b}$ avec $b \\neq 0$.\n\n" +
      "Méthode : on se rappelle qu’une division par $0$ est impossible.\n\n" +
      "Calcul : donc le dénominateur ne peut pas être nul.\n\n" +
      "Conclusion : $b \\neq 0$.",
    tags: ["fraction_rationnel", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_fraction_rationnel_reconnaitre_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Lequel de ces nombres n’est PAS écrit comme un rationnel valide ?",
    format: "qcm",
    choices: ["$\\dfrac{3}{0}$", "$\\dfrac{3}{4}$", "$\\dfrac{-2}{5}$", "$\\dfrac{7}{1}$"],
    expected: ["$\\dfrac{3}{0}$"],
    comparator: "mcq_exact",
    hint: "Le dénominateur ne peut pas être $0$.",
    explanation:
      "Définition : un rationnel a un dénominateur non nul.\n\n" +
      "Méthode : on repère un dénominateur égal à $0$.\n\n" +
      "Calcul : $\\dfrac{3}{0}$ n’a pas de sens (division par $0$).\n\n" +
      "Conclusion : $\\dfrac{3}{0}$ n’est pas valide.",
    tags: ["fraction_rationnel", "reconnaitre", "qcm"],
  },

  /* =========================
     RATIONNEL_ECRITURE (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_fraction_rationnel_ecriture_tpl_1_decimal",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_ecriture",
    difficulty: 2,
    theme: "neutral",
    hint: "On effectue la division du numérateur par le dénominateur.",
    tags: ["fraction_rationnel", "ecriture", "decimal", "template"],
    generate: () => {
      const item = randomChoice([
        { num: 1, den: 2, dec: "0,5" },
        { num: 3, den: 4, dec: "0,75" },
        { num: 1, den: 4, dec: "0,25" },
        { num: 2, den: 5, dec: "0,4" },
        { num: 3, den: 5, dec: "0,6" },
        { num: 1, den: 5, dec: "0,2" },
      ]);
      return {
        text: `Écris $\\dfrac{${item.num}}{${item.den}}$ sous forme décimale.`,
        format: "short",
        expected: [item.dec, item.dec.replace(",", ".")],
        comparator: "number_equal",
        explanation:
          `Définition : passer en écriture décimale, c’est effectuer la division.\n\n` +
          `Méthode : on divise $${item.num}$ par $${item.den}$.\n\n` +
          `Calcul : $${item.num} \\div ${item.den} = ${item.dec}$.\n\n` +
          `Conclusion : $\\dfrac{${item.num}}{${item.den}} = ${item.dec}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_fraction_rationnel_ecriture_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_ecriture",
    difficulty: 1,
    theme: "neutral",
    text: "Écris $\\dfrac{1}{2}$ sous forme décimale.",
    format: "short",
    expected: ["0,5", "0.5"],
    comparator: "number_equal",
    hint: "$1 \\div 2$.",
    explanation:
      "Définition : on effectue la division.\n\n" +
      "Méthode : $1 \\div 2$.\n\n" +
      "Calcul : $1 \\div 2 = 0{,}5$.\n\n" +
      "Conclusion : $\\dfrac{1}{2} = 0{,}5$.",
    tags: ["fraction_rationnel", "ecriture", "short"],
  },
  {
    kind: "fixed",
    id: "3e_fraction_rationnel_ecriture_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_ecriture",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est égale à $0{,}25$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{4}$", "$\\dfrac{1}{2}$", "$\\dfrac{2}{5}$", "$\\dfrac{1}{25}$"],
    expected: ["$\\dfrac{1}{4}$"],
    comparator: "mcq_exact",
    hint: "$0{,}25 = \\dfrac{25}{100}$, à simplifier.",
    explanation:
      "Définition : un décimal peut s’écrire en fraction.\n\n" +
      "Méthode : $0{,}25 = \\dfrac{25}{100}$, puis on simplifie.\n\n" +
      "Calcul : $\\dfrac{25}{100} = \\dfrac{1}{4}$.\n\n" +
      "Conclusion : $0{,}25 = \\dfrac{1}{4}$.",
    tags: ["fraction_rationnel", "ecriture", "qcm"],
  },
  {
    kind: "template",
    id: "3e_fraction_rationnel_ecriture_tpl_2_vers_fraction",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_ecriture",
    difficulty: 3,
    theme: "neutral",
    hint: "Un dixième s’écrit sur $10$, un centième sur $100$.",
    tags: ["fraction_rationnel", "ecriture", "qcm", "template"],
    generate: () => {
      const item = randomChoice([
        { dec: "0,5", correct: "$\\dfrac{1}{2}$", w: ["$\\dfrac{1}{5}$", "$\\dfrac{5}{1}$", "$\\dfrac{1}{50}$"] },
        { dec: "0,2", correct: "$\\dfrac{1}{5}$", w: ["$\\dfrac{1}{2}$", "$\\dfrac{2}{1}$", "$\\dfrac{1}{20}$"] },
        { dec: "0,75", correct: "$\\dfrac{3}{4}$", w: ["$\\dfrac{7}{5}$", "$\\dfrac{3}{5}$", "$\\dfrac{1}{4}$"] },
      ]);
      return {
        text: `Quelle fraction simplifiée est égale à $${item.dec}$ ?`,
        format: "qcm",
        choices: shuffle([item.correct, ...item.w]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : un décimal s’écrit comme une fraction décimale, puis on simplifie.\n\n` +
          `Méthode : on écrit $${item.dec}$ sur $10$ ou $100$, puis on simplifie.\n\n` +
          `Calcul : on obtient ${item.correct}.\n\n` +
          `Conclusion : $${item.dec} = $ ${item.correct}.`,
      };
    },
  },

  /* =========================
     RATIONNEL_COMPARER (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_fraction_rationnel_comparer_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le plus grand : $\\dfrac{2}{3}$ ou $\\dfrac{3}{4}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{3}{4}$", "$\\dfrac{2}{3}$", "ils sont égaux", "on ne peut pas comparer"],
    expected: ["$\\dfrac{3}{4}$"],
    comparator: "mcq_exact",
    hint: "Mets au même dénominateur ($12$).",
    explanation:
      "Définition : pour comparer, on met au même dénominateur.\n\n" +
      "Méthode : $\\dfrac{2}{3} = \\dfrac{8}{12}$ et $\\dfrac{3}{4} = \\dfrac{9}{12}$.\n\n" +
      "Calcul : $\\dfrac{9}{12} > \\dfrac{8}{12}$.\n\n" +
      "Conclusion : $\\dfrac{3}{4}$ est le plus grand.",
    tags: ["fraction_rationnel", "comparer", "qcm"],
  },
  {
    kind: "template",
    id: "3e_fraction_rationnel_comparer_tpl_1_meme_denominateur",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "À même dénominateur, on compare les numérateurs.",
    tags: ["fraction_rationnel", "comparer", "qcm", "template"],
    generate: () => {
      const den = randomChoice([5, 7, 9]);
      const a = randomInt(1, den - 1);
      let b = randomInt(1, den - 1);
      while (b === a) b = randomInt(1, den - 1);
      const correct = a > b ? `$\\dfrac{${a}}{${den}}$` : `$\\dfrac{${b}}{${den}}$`;
      return {
        text: `Quel est le plus grand : $\\dfrac{${a}}{${den}}$ ou $\\dfrac{${b}}{${den}}$ ?`,
        format: "qcm",
        choices: shuffle([`$\\dfrac{${a}}{${den}}$`, `$\\dfrac{${b}}{${den}}$`, "ils sont égaux"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : à même dénominateur, la plus grande fraction a le plus grand numérateur.\n\n` +
          `Méthode : on compare $${a}$ et $${b}$.\n\n` +
          `Calcul : $${Math.max(a, b)} > ${Math.min(a, b)}$.\n\n` +
          `Conclusion : la plus grande est ${correct}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_fraction_rationnel_comparer_fixed_2_decimal",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le plus grand : $\\dfrac{1}{2}$ ou $0{,}4$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{2}$", "$0{,}4$", "ils sont égaux", "on ne peut pas comparer"],
    expected: ["$\\dfrac{1}{2}$"],
    comparator: "mcq_exact",
    hint: "Écris $\\dfrac{1}{2}$ en décimal.",
    explanation:
      "Définition : on peut comparer en passant tout en décimal.\n\n" +
      "Méthode : $\\dfrac{1}{2} = 0{,}5$.\n\n" +
      "Calcul : $0{,}5 > 0{,}4$.\n\n" +
      "Conclusion : $\\dfrac{1}{2}$ est le plus grand.",
    tags: ["fraction_rationnel", "comparer", "decimal", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_fraction_rationnel_comparer_qcm_1_meme_num",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Entre $\\dfrac{1}{3}$ et $\\dfrac{1}{5}$, quelle est la plus grande ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{3}$", "$\\dfrac{1}{5}$", "elles sont égales", "on ne peut pas savoir"],
    expected: ["$\\dfrac{1}{3}$"],
    comparator: "mcq_exact",
    hint: "À numérateur égal, plus le dénominateur est petit, plus la fraction est grande.",
    explanation:
      "Définition : à numérateur égal, la fraction est d’autant plus grande que le dénominateur est petit.\n\n" +
      "Méthode : on compare les dénominateurs $3$ et $5$.\n\n" +
      "Calcul : $3 < 5$, donc $\\dfrac{1}{3} > \\dfrac{1}{5}$.\n\n" +
      "Conclusion : $\\dfrac{1}{3}$ est la plus grande.",
    tags: ["fraction_rationnel", "comparer", "qcm"],
  },

  /* =========================
     RATIONNEL_CALCULER (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_fraction_rationnel_calculer_tpl_1_somme",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "À même dénominateur, on additionne les numérateurs.",
    tags: ["fraction_rationnel", "calculer", "qcm", "template"],
    generate: () => {
      const den = randomChoice([5, 7, 8, 9]);
      const a = randomInt(1, den - 2);
      // a × b = a + b uniquement pour 2 et 2 : le piège « on multiplie les
      // numérateurs » tomberait alors sur la bonne réponse.
      let b = randomInt(1, den - a);
      while (a === 2 && b === 2) b = randomInt(1, den - a);
      const s = a + b;
      const correct = `$\\dfrac{${s}}{${den}}$`;
      return {
        text: `Calcule $\\dfrac{${a}}{${den}} + \\dfrac{${b}}{${den}}$.`,
        format: "qcm",
        // Le troisième piège était « on additionne aussi les dénominateurs »
        // écrit une deuxième fois (den + den et den × 2 sont le même nombre) :
        // la question montrait deux lignes identiques à TOUS les tirages. Il
        // devient « on multiplie les dénominateurs ».
        choices: shuffle([correct, `$\\dfrac{${s}}{${den + den}}$`, `$\\dfrac{${a * b}}{${den}}$`, `$\\dfrac{${s}}{${den * den}}$`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : à même dénominateur, on additionne les numérateurs et on garde le dénominateur.\n\n` +
          `Méthode : $\\dfrac{${a}}{${den}} + \\dfrac{${b}}{${den}} = \\dfrac{${a}+${b}}{${den}}$.\n\n` +
          `Calcul : $= \\dfrac{${s}}{${den}}$.\n\n` +
          `Conclusion : le résultat est $\\dfrac{${s}}{${den}}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_fraction_rationnel_calculer_qcm_1_diff",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\dfrac{5}{8} - \\dfrac{2}{8}$.",
    format: "qcm",
    choices: ["$\\dfrac{3}{8}$", "$\\dfrac{7}{8}$", "$\\dfrac{3}{16}$", "$\\dfrac{2}{8}$"],
    expected: ["$\\dfrac{3}{8}$"],
    comparator: "mcq_exact",
    hint: "À même dénominateur, on soustrait les numérateurs.",
    explanation:
      "Définition : à même dénominateur, on soustrait les numérateurs.\n\n" +
      "Méthode : $\\dfrac{5}{8} - \\dfrac{2}{8} = \\dfrac{5-2}{8}$.\n\n" +
      "Calcul : $= \\dfrac{3}{8}$.\n\n" +
      "Conclusion : le résultat est $\\dfrac{3}{8}$.",
    tags: ["fraction_rationnel", "calculer", "qcm"],
  },

  /* =========================
     RATIONNEL_DEFI (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_fraction_rationnel_defi_tpl_3_fraction_quantite",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Une fraction d’une quantité : on divise par le dénominateur, on multiplie par le numérateur.",
    tags: ["fraction_rationnel", "defi", "reunion", "template"],
    generate: () => {
      const den = randomChoice([3, 4, 5]);
      const num = randomInt(1, den - 1);
      const total = den * randomChoice([6, 8, 10]);
      const res = (total * num) / den;
      return {
        text: `Dans un panier de ${total} fruits, $\\dfrac{${num}}{${den}}$ sont des mangues. Combien y a-t-il de mangues ?`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation:
          `Définition : prendre $\\dfrac{${num}}{${den}}$ d’une quantité, c’est la diviser par ${den} puis multiplier par ${num}.\n\n` +
          `Méthode : on calcule $${total} \\div ${den} \\times ${num}$.\n\n` +
          `Calcul : $${total} \\div ${den} = ${total / den}$, puis $\\times ${num} = ${res}$.\n\n` +
          `Conclusion : il y a ${res} mangues.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_fraction_rationnel_defi_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « $\\dfrac{1}{2} + \\dfrac{1}{2} = \\dfrac{2}{4}$ ». A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "À même dénominateur, on n’additionne pas les dénominateurs.",
    explanation:
      "Définition : à même dénominateur, on additionne les numérateurs et on garde le dénominateur.\n\n" +
      "Méthode : $\\dfrac{1}{2} + \\dfrac{1}{2} = \\dfrac{1+1}{2}$.\n\n" +
      "Calcul : $= \\dfrac{2}{2} = 1$.\n\n" +
      "Conclusion : non, le résultat est $1$, pas $\\dfrac{2}{4}$.",
    tags: ["fraction_rationnel", "defi", "erreur", "qcm"],
  },
  {
    kind: "template",
    id: "3e_fraction_rationnel_defi_tpl_4_reste",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "On calcule la part utilisée, puis ce qui reste.",
    tags: ["fraction_rationnel", "defi", "template"],
    generate: () => {
      const den = randomChoice([4, 5]);
      const num = randomInt(1, den - 1);
      const total = den * randomChoice([4, 5, 6]);
      const utilise = (total * num) / den;
      const reste = total - utilise;
      return {
        text: `Un réservoir contient ${total} litres. On utilise $\\dfrac{${num}}{${den}}$ du réservoir. Combien de litres reste-t-il ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation:
          `Définition : on calcule la part utilisée, puis on soustrait au total.\n\n` +
          `Méthode : utilisé $= ${total} \\times \\dfrac{${num}}{${den}} = ${utilise}$.\n\n` +
          `Calcul : reste $= ${total} - ${utilise} = ${reste}$.\n\n` +
          `Conclusion : il reste ${reste} litres.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_fraction_rationnel_defi_qcm_2_simplifier",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la forme irréductible de $\\dfrac{6}{8}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{3}{4}$", "$\\dfrac{2}{3}$", "$\\dfrac{6}{8}$", "$\\dfrac{12}{16}$"],
    expected: ["$\\dfrac{3}{4}$"],
    comparator: "mcq_exact",
    hint: "On divise numérateur et dénominateur par leur PGCD ($2$).",
    explanation:
      "Définition : une fraction est irréductible quand on ne peut plus la simplifier.\n\n" +
      "Méthode : on divise par le PGCD de $6$ et $8$, qui est $2$.\n\n" +
      "Calcul : $\\dfrac{6}{8} = \\dfrac{3}{4}$.\n\n" +
      "Conclusion : la forme irréductible est $\\dfrac{3}{4}$.",
    tags: ["fraction_rationnel", "defi", "simplifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_fraction_rationnel_defi_qcm_3_comparer",
    niveau: "3e",
    matiere: "maths",
    notionId: "fraction_rationnel",
    microId: "fraction_rationnel_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux élèves ont mangé : l’un $\\dfrac{2}{5}$ d’une pizza, l’autre $\\dfrac{1}{2}$. Qui a mangé le plus ?",
    format: "qcm",
    choices: ["celui qui a mangé $\\dfrac{1}{2}$", "celui qui a mangé $\\dfrac{2}{5}$", "ils ont mangé pareil", "on ne peut pas savoir"],
    expected: ["celui qui a mangé $\\dfrac{1}{2}$"],
    comparator: "mcq_exact",
    hint: "Mets au même dénominateur ($10$).",
    explanation:
      "Définition : on compare deux fractions au même dénominateur.\n\n" +
      "Méthode : $\\dfrac{2}{5} = \\dfrac{4}{10}$ et $\\dfrac{1}{2} = \\dfrac{5}{10}$.\n\n" +
      "Calcul : $\\dfrac{5}{10} > \\dfrac{4}{10}$.\n\n" +
      "Conclusion : celui qui a mangé $\\dfrac{1}{2}$ a mangé le plus.",
    tags: ["fraction_rationnel", "defi", "comparer", "qcm"],
  },

];