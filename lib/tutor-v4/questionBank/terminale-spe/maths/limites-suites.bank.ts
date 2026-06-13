// lib/tutor-v4/question-banks/maths/terminale-spe/limites-suites.bank.ts

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

export const limitesSuitesBank: TutorBankItemV4[] = [
  /* =========================
     LIMITE_SUITE_INTERPRETER
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_interpreter_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_interpreter",
    difficulty: 1,
    theme: "neutral",
    text: "Si une suite uₙ tend vers 5, que signifie cela ?",
    format: "qcm",
    choices: [
      "Les termes de la suite se rapprochent de 5",
      "Tous les termes valent 5",
      "La suite est forcément croissante",
      "La suite est forcément arithmétique",
    ],
    expected: ["Les termes de la suite se rapprochent de 5"],
    comparator: "mcq_exact",
    hint: "Une limite décrit le comportement des termes quand n devient très grand.",
    explanation: exp(
      "Dire que uₙ tend vers 5 signifie que les termes de la suite se rapprochent de 5 lorsque n devient très grand.",
      "On ne regarde pas seulement les premiers termes, mais le comportement à long terme.",
      "La suite peut se rapprocher de 5 sans jamais valoir exactement 5.",
      "La bonne interprétation est : les termes de la suite se rapprochent de 5."
    ),
    tags: ["terminale-spe", "limite_suite", "interpreter", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_interpreter_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_interpreter",
    difficulty: 1,
    theme: "neutral",
    text: "Si uₙ tend vers +∞, que peut-on dire des termes de la suite ?",
    format: "qcm",
    choices: [
      "Ils deviennent aussi grands que l’on veut",
      "Ils se rapprochent de 0",
      "Ils valent tous +∞",
      "Ils sont forcément négatifs",
    ],
    expected: ["Ils deviennent aussi grands que l’on veut"],
    comparator: "mcq_exact",
    hint: "Tendre vers +∞ ne veut pas dire atteindre +∞.",
    explanation: exp(
      "Dire qu’une suite tend vers +∞ signifie que ses termes deviennent arbitrairement grands.",
      "On interprète la limite comme un comportement à long terme.",
      "Les termes ne valent pas +∞ : ils dépassent simplement toute valeur fixée à partir d’un certain rang.",
      "Les termes deviennent aussi grands que l’on veut."
    ),
    tags: ["terminale-spe", "limite_suite", "infini", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_interpreter_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Une suite converge si elle admet une limite...",
    format: "qcm",
    choices: ["finie", "+∞", "-∞", "impossible à calculer"],
    expected: ["finie"],
    comparator: "mcq_exact",
    hint: "Converger signifie se rapprocher d’un nombre réel.",
    explanation: exp(
      "Une suite converge lorsqu’elle admet une limite finie.",
      "On distingue convergence vers un réel et divergence vers l’infini.",
      "Si uₙ tend vers +∞ ou -∞, la suite ne converge pas au sens usuel : elle diverge.",
      "Une suite converge si elle admet une limite finie."
    ),
    tags: ["terminale-spe", "limite_suite", "convergence", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_interpreter_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Si uₙ tend vers 0, peut-on affirmer que tous les termes de la suite sont positifs ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La limite ne donne pas forcément le signe de tous les termes.",
    explanation: exp(
      "La limite décrit le comportement de la suite lorsque n devient très grand.",
      "On ne doit pas confondre limite et signe des termes.",
      "Une suite peut tendre vers 0 en ayant des termes positifs, négatifs ou alternés.",
      "On ne peut pas affirmer que tous les termes sont positifs."
    ),
    tags: ["terminale-spe", "limite_suite", "erreur", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_limite_suite_interpreter_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "Une limite finie est une valeur vers laquelle les termes se rapprochent.",
    tags: ["terminale-spe", "limite_suite", "interpreter", "template"],
    generate: () => {
      const limite = randomChoice([1, 2, 3, 4, 5, 10]);

      return {
        text: `Si une suite uₙ tend vers ${limite}, quelle phrase est correcte ?`,
        format: "qcm",
        choices: shuffle([
          `Les termes de la suite se rapprochent de ${limite}`,
          `Tous les termes valent ${limite}`,
          "La suite tend vers +∞",
          "La suite est forcément croissante",
        ]),
        expected: [`Les termes de la suite se rapprochent de ${limite}`],
        comparator: "mcq_exact",
        explanation: exp(
          `Dire que uₙ tend vers ${limite} signifie que les termes se rapprochent de ${limite}.`,
          "On interprète la limite comme un comportement à long terme.",
          `La suite n’a pas besoin de valoir exactement ${limite}.`,
          `Les termes de la suite se rapprochent de ${limite}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_interpreter_open_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Explique avec tes mots ce que signifie : la suite uₙ converge vers 3.",
    format: "open",
    expected: ["rapprochent", "3", "grand", "n", "limite"],
    comparator: "contains_keyword",
    hint: "Parle du comportement des termes quand n devient très grand.",
    explanation: exp(
      "Une suite converge vers un réel lorsque ses termes se rapprochent de ce réel.",
      "On décrit le comportement de uₙ lorsque n devient très grand.",
      "Ici, les termes uₙ se rapprochent de 3.",
      "Dire que uₙ converge vers 3 signifie que 3 est la limite de la suite."
    ),
    tags: ["terminale-spe", "limite_suite", "interpreter", "open"],
  },

  /* =========================
     LIMITE_SUITE_CALCULER
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_calculer_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_calculer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la limite de la suite uₙ = 1/n ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Quand n devient très grand, 1/n devient très petit.",
    explanation: exp(
      "La suite 1/n est une suite de référence.",
      "On utilise le résultat classique : lorsque n tend vers +∞, 1/n tend vers 0.",
      "Plus n est grand, plus 1/n est proche de 0.",
      "La limite est 0."
    ),
    tags: ["terminale-spe", "limite_suite", "calcul", "reference"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_calculer_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_calculer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la limite de la suite uₙ = n² ?",
    format: "qcm",
    choices: ["0", "1", "+∞", "-∞"],
    expected: ["+∞"],
    comparator: "mcq_exact",
    hint: "n² grandit lorsque n devient grand.",
    explanation: exp(
      "La suite n² est une suite de référence.",
      "Lorsque n devient très grand, n² devient aussi très grand.",
      "Par exemple, 100² = 10 000 et 1000² = 1 000 000.",
      "La limite de n² est +∞."
    ),
    tags: ["terminale-spe", "limite_suite", "calcul", "reference", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_calculer_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la limite de la suite uₙ = 4 + 1/n ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "La partie 1/n tend vers 0.",
    explanation: exp(
      "Si une partie d’une expression tend vers 0, elle disparaît dans la limite.",
      "On utilise la limite de référence 1/n → 0.",
      "Comme 1/n tend vers 0, 4 + 1/n tend vers 4 + 0 = 4.",
      "La limite est 4."
    ),
    tags: ["terminale-spe", "limite_suite", "calcul"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_calculer_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Si 0 < q < 1, quelle est la limite de qⁿ ?",
    format: "qcm",
    choices: ["0", "1", "+∞", "q"],
    expected: ["0"],
    comparator: "mcq_exact",
    hint: "Les puissances successives d’un nombre entre 0 et 1 se rapprochent de 0.",
    explanation: exp(
      "Si 0 < q < 1, alors qⁿ tend vers 0 lorsque n tend vers +∞.",
      "On reconnaît une limite de suite géométrique.",
      "Par exemple, 0,5ⁿ devient de plus en plus petit.",
      "La limite est 0."
    ),
    tags: ["terminale-spe", "limite_suite", "geometrique", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_limite_suite_calculer_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "La partie 1/n tend vers 0.",
    tags: ["terminale-spe", "limite_suite", "calcul", "template"],
    generate: () => {
      const a = randomInt(2, 12);

      return {
        text: `Quelle est la limite de la suite uₙ = ${a} + 1/n ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: exp(
          "On utilise la limite de référence 1/n → 0.",
          "On remplace la partie qui tend vers 0 par 0 dans l’expression.",
          `Comme 1/n tend vers 0, ${a} + 1/n tend vers ${a} + 0 = ${a}.`,
          `La limite est ${a}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_limite_suite_calculer_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Si 0 < q < 1, alors qⁿ tend vers 0.",
    tags: ["terminale-spe", "limite_suite", "geometrique", "template"],
    generate: () => {
      const q = randomChoice(["0,2", "0,25", "0,5", "0,8"]);

      return {
        text: `Quelle est la limite de la suite uₙ = ${q}ⁿ ?`,
        format: "short",
        expected: ["0"],
        comparator: "number_equal",
        explanation: exp(
          "Pour une suite géométrique qⁿ avec 0 < q < 1, la limite est 0.",
          "On vérifie que la raison est comprise entre 0 et 1.",
          `Ici, ${q} est compris entre 0 et 1.`,
          "La limite est donc 0."
        ),
      };
    },
  },

  /* =========================
     LIMITE_SUITE_OPERATIONS
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_operations_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_operations",
    difficulty: 2,
    theme: "neutral",
    text: "Si uₙ tend vers 2 et vₙ tend vers 5, quelle est la limite de uₙ + vₙ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La limite d’une somme est la somme des limites lorsque les deux limites sont finies.",
    explanation: exp(
      "Lorsque deux suites ont des limites finies, la limite de leur somme est la somme des limites.",
      "On additionne les deux limites.",
      "2 + 5 = 7.",
      "La limite de uₙ + vₙ est 7."
    ),
    tags: ["terminale-spe", "limite_suite", "operations", "somme"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_operations_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_operations",
    difficulty: 2,
    theme: "neutral",
    text: "Si uₙ tend vers 3 et vₙ tend vers 4, quelle est la limite de uₙ × vₙ ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "La limite d’un produit est le produit des limites lorsque les deux limites sont finies.",
    explanation: exp(
      "Lorsque deux suites ont des limites finies, la limite du produit est le produit des limites.",
      "On multiplie les deux limites.",
      "3 × 4 = 12.",
      "La limite de uₙ × vₙ est 12."
    ),
    tags: ["terminale-spe", "limite_suite", "operations", "produit"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_operations_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_operations",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la limite de uₙ = 3 + 2/n ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "2/n tend vers 0.",
    explanation: exp(
      "On utilise les opérations sur les limites.",
      "On décompose la suite en une constante et une suite qui tend vers 0.",
      "2/n tend vers 0, donc 3 + 2/n tend vers 3 + 0 = 3.",
      "La limite est 3."
    ),
    tags: ["terminale-spe", "limite_suite", "operations"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_operations_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_operations",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la limite de uₙ = (2n + 1) / n ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Divise chaque terme du numérateur par n.",
    explanation: exp(
      "Pour une fraction avec n au numérateur et au dénominateur, on simplifie en divisant par n.",
      "On écrit (2n + 1)/n = 2 + 1/n.",
      "Comme 1/n tend vers 0, 2 + 1/n tend vers 2.",
      "La limite est 2."
    ),
    tags: ["terminale-spe", "limite_suite", "quotient"],
  },

  {
    kind: "template",
    id: "terminale_spe_limite_suite_operations_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_operations",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les deux limites.",
    tags: ["terminale-spe", "limite_suite", "operations", "template"],
    generate: () => {
      const a = randomInt(1, 8);
      const b = randomInt(1, 8);
      const result = a + b;

      return {
        text: `Si uₙ tend vers ${a} et vₙ tend vers ${b}, quelle est la limite de uₙ + vₙ ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "La limite d’une somme de suites convergentes est la somme des limites.",
          "On additionne les limites.",
          `${a} + ${b} = ${result}.`,
          `La limite est ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_limite_suite_operations_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_operations",
    difficulty: 3,
    theme: "neutral",
    hint: "Transforme l’expression en a + b/n.",
    tags: ["terminale-spe", "limite_suite", "quotient", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(1, 9);

      return {
        text: `Quelle est la limite de uₙ = (${a}n + ${b}) / n ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: exp(
          "On simplifie une expression rationnelle en divisant chaque terme par n.",
          `On écrit (${a}n + ${b}) / n = ${a} + ${b}/n.`,
          `${b}/n tend vers 0, donc ${a} + ${b}/n tend vers ${a}.`,
          `La limite est ${a}.`
        ),
      };
    },
  },

  /* =========================
     LIMITE_SUITE_COMPARAISON
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_comparaison_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_comparaison",
    difficulty: 3,
    theme: "neutral",
    text: "Si 0 ≤ uₙ ≤ 1/n pour tout n, quelle est la limite de uₙ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Utilise le théorème des gendarmes.",
    explanation: exp(
      "Le théorème des gendarmes permet de conclure lorsqu’une suite est encadrée par deux suites ayant la même limite.",
      "On vérifie les deux bornes de l’encadrement.",
      "0 tend vers 0 et 1/n tend vers 0. Comme 0 ≤ uₙ ≤ 1/n, uₙ est coincée entre deux suites qui tendent vers 0.",
      "La limite de uₙ est 0."
    ),
    tags: ["terminale-spe", "limite_suite", "comparaison", "gendarmes"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_comparaison_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_comparaison",
    difficulty: 3,
    theme: "neutral",
    text: "Si pour tout n, uₙ ≥ n, quelle est la limite de uₙ ?",
    format: "qcm",
    choices: ["0", "1", "+∞", "on ne peut rien dire"],
    expected: ["+∞"],
    comparator: "mcq_exact",
    hint: "La suite n tend vers +∞.",
    explanation: exp(
      "Un théorème de comparaison permet de conclure vers +∞.",
      "Si une suite est plus grande qu’une suite qui tend vers +∞, alors elle tend aussi vers +∞.",
      "Ici, n tend vers +∞ et uₙ ≥ n.",
      "Donc uₙ tend vers +∞."
    ),
    tags: ["terminale-spe", "limite_suite", "comparaison", "infini", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_comparaison_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_comparaison",
    difficulty: 4,
    theme: "neutral",
    text: "Si -1/n ≤ uₙ ≤ 1/n pour tout n, quelle est la limite de uₙ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Les deux bornes tendent vers 0.",
    explanation: exp(
      "Le théorème des gendarmes s’applique quand une suite est encadrée par deux suites de même limite.",
      "On calcule les limites des deux bornes.",
      "-1/n tend vers 0 et 1/n tend vers 0.",
      "Donc uₙ tend vers 0."
    ),
    tags: ["terminale-spe", "limite_suite", "comparaison", "encadrement"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_comparaison_open_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_comparaison",
    difficulty: 4,
    theme: "neutral",
    text: "Explique quand on peut utiliser le théorème des gendarmes pour une suite.",
    format: "open",
    expected: ["encadrée", "deux suites", "même limite", "gendarmes", "limite"],
    comparator: "contains_keyword",
    hint: "Il faut une suite coincée entre deux suites qui ont la même limite.",
    explanation: exp(
      "Le théorème des gendarmes permet de trouver la limite d’une suite encadrée.",
      "Il faut montrer que aₙ ≤ uₙ ≤ bₙ, avec aₙ et bₙ qui ont la même limite.",
      "Comme uₙ est coincée entre deux suites qui se rapprochent du même nombre, elle se rapproche aussi de ce nombre.",
      "On peut utiliser ce théorème lorsqu’une suite est encadrée par deux suites de même limite."
    ),
    tags: ["terminale-spe", "limite_suite", "comparaison", "open"],
  },

  {
    kind: "template",
    id: "terminale_spe_limite_suite_comparaison_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_comparaison",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare avec 1/n.",
    tags: ["terminale-spe", "limite_suite", "comparaison", "template"],
    generate: () => {
      const a = randomInt(1, 5);

      return {
        text: `Si 0 ≤ uₙ ≤ ${a}/n pour tout n, quelle est la limite de uₙ ?`,
        format: "short",
        expected: ["0"],
        comparator: "number_equal",
        explanation: exp(
          "On utilise le théorème des gendarmes.",
          "On regarde les limites des deux bornes.",
          `0 tend vers 0 et ${a}/n tend vers 0.`,
          "Donc uₙ tend vers 0."
        ),
      };
    },
  },

  /* =========================
     LIMITE_SUITE_MONOTONE_BORNEE
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_monotone_bornee_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_monotone_bornee",
    difficulty: 2,
    theme: "neutral",
    text: "Une suite croissante et majorée est-elle convergente ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "C’est le théorème de convergence monotone.",
    explanation: exp(
      "Une suite croissante et majorée converge.",
      "On vérifie que la suite est monotone et bornée dans le bon sens.",
      "Croissante + majorée donne une suite monotone bornée.",
      "La suite est donc convergente."
    ),
    tags: ["terminale-spe", "limite_suite", "monotone", "bornee", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_monotone_bornee_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_monotone_bornee",
    difficulty: 2,
    theme: "neutral",
    text: "Une suite décroissante et minorée est-elle convergente ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Une suite monotone et bornée converge.",
    explanation: exp(
      "Une suite décroissante et minorée converge.",
      "On applique le théorème de convergence monotone.",
      "La suite est monotone et possède une borne inférieure.",
      "Elle est donc convergente."
    ),
    tags: ["terminale-spe", "limite_suite", "monotone", "bornee", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_monotone_bornee_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_monotone_bornee",
    difficulty: 3,
    theme: "neutral",
    text: "Une suite croissante mais non majorée tend-elle forcément vers +∞ ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Une suite croissante non majorée dépasse toute borne.",
    explanation: exp(
      "Une suite croissante non majorée diverge vers +∞.",
      "Si elle n’est pas majorée, elle finit par dépasser toute valeur fixée.",
      "Comme elle est croissante, une fois qu’elle dépasse une valeur, elle ne redescend pas en dessous.",
      "Elle tend donc vers +∞."
    ),
    tags: ["terminale-spe", "limite_suite", "monotone", "infini", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_monotone_bornee_open_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_monotone_bornee",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un exercice de bac, on montre qu’une suite est croissante et majorée. Quelle conclusion peut-on donner ? Justifie.",
    format: "open",
    expected: ["convergente", "croissante", "majorée", "théorème", "monotone"],
    comparator: "contains_keyword",
    hint: "Utilise le théorème de convergence monotone.",
    explanation: exp(
      "Le théorème de convergence monotone affirme qu’une suite croissante et majorée converge.",
      "On identifie le sens de variation et la borne.",
      "La suite est croissante et majorée.",
      "On peut conclure qu’elle est convergente."
    ),
    tags: ["terminale-spe", "limite_suite", "monotone", "type_bac", "open"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_monotone_bornee_open_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_monotone_bornee",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi le théorème de convergence monotone ne donne pas directement la valeur de la limite.",
    format: "open",
    expected: ["convergence", "valeur", "limite", "théorème", "équation"],
    comparator: "contains_keyword",
    hint: "Le théorème prouve que la limite existe, mais il ne la calcule pas.",
    explanation: exp(
      "Le théorème de convergence monotone donne l’existence d’une limite finie.",
      "Il permet de savoir que la suite converge.",
      "Mais il ne donne pas automatiquement la valeur de cette limite.",
      "Il faut ensuite calculer ou identifier la limite par une autre méthode."
    ),
    tags: ["terminale-spe", "limite_suite", "monotone", "raisonnement", "open"],
  },

  /* =========================
     LIMITE_SUITE_DEFIS - TYPE BAC
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On définit u₀ = 1 et uₙ₊₁ = 0,5uₙ + 2. Si la suite converge vers ℓ, quelle équation vérifie ℓ ?",
    format: "qcm",
    choices: [
      "ℓ = 0,5ℓ + 2",
      "ℓ = 0,5 + 2",
      "ℓ = u₀ + 2",
      "ℓ = 2ℓ + 0,5",
    ],
    expected: ["ℓ = 0,5ℓ + 2"],
    comparator: "mcq_exact",
    hint: "Si uₙ converge vers ℓ, alors uₙ₊₁ converge aussi vers ℓ.",
    explanation: exp(
      "Pour une suite récurrente convergente, la limite éventuelle vérifie l’équation obtenue en remplaçant uₙ et uₙ₊₁ par ℓ.",
      "On passe formellement à la limite dans la relation de récurrence.",
      "uₙ₊₁ = 0,5uₙ + 2 devient ℓ = 0,5ℓ + 2.",
      "La limite éventuelle vérifie ℓ = 0,5ℓ + 2."
    ),
    tags: ["terminale-spe", "limite_suite", "recurrence", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Résoudre l’équation ℓ = 0,5ℓ + 2.",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Regroupe les termes en ℓ du même côté.",
    explanation: exp(
      "Une limite candidate peut être obtenue en résolvant l’équation associée à la relation de récurrence.",
      "On résout l’équation ℓ = 0,5ℓ + 2.",
      "ℓ - 0,5ℓ = 2, donc 0,5ℓ = 2, donc ℓ = 4.",
      "La limite candidate est 4."
    ),
    tags: ["terminale-spe", "limite_suite", "recurrence", "equation", "type_bac"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un exercice, on a montré que uₙ est croissante et que uₙ ≤ 4 pour tout n. Que peut-on conclure ?",
    format: "qcm",
    choices: [
      "La suite converge",
      "La suite tend vers +∞",
      "La suite vaut toujours 4",
      "La suite est forcément constante",
    ],
    expected: ["La suite converge"],
    comparator: "mcq_exact",
    hint: "Croissante et majorée : théorème de convergence monotone.",
    explanation: exp(
      "Une suite croissante et majorée converge.",
      "On vérifie les deux informations données.",
      "La suite est croissante et majorée par 4.",
      "On peut conclure que la suite converge."
    ),
    tags: ["terminale-spe", "limite_suite", "monotone", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On définit u₀ = 1 et uₙ₊₁ = 0,5uₙ + 2. On admet que la suite converge. Quelle est sa limite ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Résous l’équation ℓ = 0,5ℓ + 2.",
    explanation: exp(
      "Si une suite récurrente converge, sa limite vérifie l’équation obtenue en passant à la limite.",
      "On écrit ℓ = 0,5ℓ + 2 puis on résout.",
      "ℓ - 0,5ℓ = 2, donc 0,5ℓ = 2, donc ℓ = 4.",
      "La limite de la suite est 4."
    ),
    tags: ["terminale-spe", "limite_suite", "recurrence", "limite", "type_bac"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_limite_suite_defi_open_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi, dans un exercice de bac, résoudre l’équation de la limite ne suffit pas toujours pour conclure.",
    format: "open",
    expected: ["convergence", "limite", "équation", "justifier", "candidate"],
    comparator: "contains_keyword",
    hint: "Une équation donne une limite possible, mais ne prouve pas que la suite converge.",
    explanation: exp(
      "Résoudre l’équation de la limite donne une limite candidate.",
      "Mais cette équation suppose déjà que la suite converge.",
      "Il faut donc d’abord justifier la convergence, par exemple avec le théorème de convergence monotone.",
      "Au bac, il faut distinguer existence de la limite et calcul de sa valeur."
    ),
    tags: ["terminale-spe", "limite_suite", "raisonnement", "type_bac", "open"],
  },

  {
    kind: "template",
    id: "terminale_spe_limite_suite_defi_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Si la suite converge vers ℓ, remplace uₙ et uₙ₊₁ par ℓ.",
    tags: ["terminale-spe", "limite_suite", "recurrence", "type_bac", "template"],
    generate: () => {
      const a = randomChoice([0.2, 0.25, 0.5]);
      const b = randomChoice([1, 2, 3, 4]);
      const limit = b / (1 - a);

      const aText = String(a).replace(".", ",");

      return {
        text: `On définit u₀ = 1 et uₙ₊₁ = ${aText}uₙ + ${b}. On admet que la suite converge. Quelle est sa limite ?`,
        format: "short",
        expected: [String(limit)],
        comparator: "number_equal",
        explanation: exp(
          "Si une suite récurrente converge, sa limite vérifie l’équation obtenue en remplaçant uₙ et uₙ₊₁ par ℓ.",
          "On résout ℓ = aℓ + b.",
          `Ici, ℓ = ${aText}ℓ + ${b}. Donc ℓ - ${aText}ℓ = ${b}, soit ${(1 - a).toString().replace(".", ",")}ℓ = ${b}. Ainsi ℓ = ${limit}.`,
          `La limite est ${limit}.`
        ),
      };
    },
  },

  /* ========================= HARMONISATION → 10 / microSkill ========================= */

  {
    kind: "fixed", id: "terminale_spe_lim_suite_interpreter_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_interpreter", difficulty: 2, theme: "neutral",
    text: "Si lim uₙ = 3, on dit que la suite (uₙ) :",
    format: "qcm", choices: ["converge vers 3", "diverge", "est constante égale à 3", "n'a pas de limite"], expected: ["converge vers 3"], comparator: "mcq_exact",
    hint: "Une limite finie signifie convergence.",
    explanation: exp("Une limite finie traduit la convergence.", "Les termes se rapprochent de 3.", "On dit que la suite converge vers 3.", "La suite converge vers 3."),
    tags: ["terminale-spe", "limite_suite", "interpreter", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_interpreter_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_interpreter", difficulty: 2, theme: "neutral",
    text: "Si lim uₙ = +∞, la suite (uₙ) :",
    format: "qcm", choices: ["diverge vers +∞", "converge", "est bornée", "est constante"], expected: ["diverge vers +∞"], comparator: "mcq_exact",
    hint: "Une limite infinie n'est pas une convergence.",
    explanation: exp("Une limite infinie correspond à une divergence.", "Les termes dépassent tout réel.", "La suite diverge vers +∞.", "La suite diverge vers +∞."),
    tags: ["terminale-spe", "limite_suite", "interpreter", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_interpreter_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_interpreter", difficulty: 3, theme: "neutral",
    text: "Une suite est convergente lorsque :",
    format: "qcm", choices: ["elle admet une limite finie", "elle tend vers +∞", "elle est croissante", "elle est bornée"], expected: ["elle admet une limite finie"], comparator: "mcq_exact",
    hint: "Convergence ⟺ limite finie.",
    explanation: exp("La convergence se définit par une limite finie.", "Une suite tendant vers ±∞ diverge.", "Être bornée ne suffit pas.", "Elle admet une limite finie."),
    tags: ["terminale-spe", "limite_suite", "interpreter", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_interpreter_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_interpreter", difficulty: 3, theme: "neutral",
    text: "Graphiquement, lim uₙ = L signifie que les points (n ; uₙ) :",
    format: "qcm", choices: ["se rapprochent de la droite y = L", "s'éloignent de l'axe", "forment une parabole", "sont alignés"], expected: ["se rapprochent de la droite y = L"], comparator: "mcq_exact",
    hint: "La droite y = L est asymptote.",
    explanation: exp("La limite se lit comme une asymptote horizontale.", "Les points se rapprochent de y = L.", "La distance à L tend vers 0.", "Ils se rapprochent de la droite y = L."),
    tags: ["terminale-spe", "limite_suite", "interpreter", "qcm"],
  },

  {
    kind: "fixed", id: "terminale_spe_lim_suite_calculer_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_calculer", difficulty: 2, theme: "neutral",
    text: "Que vaut lim (1/n) quand n → +∞ ?",
    format: "qcm", choices: ["0", "+∞", "1", "-∞"], expected: ["0"], comparator: "mcq_exact",
    hint: "Limite de référence.",
    explanation: exp("1/n est une suite de référence.", "Quand n grandit, 1/n se rapproche de 0.", "lim 1/n = 0.", "La limite est 0."),
    tags: ["terminale-spe", "limite_suite", "calcul", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_calculer_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_calculer", difficulty: 2, theme: "neutral",
    text: "Que vaut lim n² quand n → +∞ ?",
    format: "qcm", choices: ["+∞", "0", "1", "-∞"], expected: ["+∞"], comparator: "mcq_exact",
    hint: "Une puissance positive de n.",
    explanation: exp("n² croît sans limite.", "Quand n grandit, n² aussi.", "lim n² = +∞.", "La limite est +∞."),
    tags: ["terminale-spe", "limite_suite", "calcul", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_calculer_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_calculer", difficulty: 3, theme: "neutral",
    text: "Que vaut lim (0,5)ⁿ quand n → +∞ ?",
    format: "qcm", choices: ["0", "+∞", "1", "0,5"], expected: ["0"], comparator: "mcq_exact",
    hint: "Suite géométrique avec -1 < q < 1.",
    explanation: exp("Pour qⁿ avec |q| < 1, la limite est 0.", "Ici q = 0,5.", "lim (0,5)ⁿ = 0.", "La limite est 0."),
    tags: ["terminale-spe", "limite_suite", "calcul", "geometrique", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_calculer_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_calculer", difficulty: 3, theme: "neutral",
    text: "Que vaut lim (2)ⁿ quand n → +∞ ?",
    format: "qcm", choices: ["+∞", "0", "2", "1"], expected: ["+∞"], comparator: "mcq_exact",
    hint: "Suite géométrique avec q > 1.",
    explanation: exp("Pour qⁿ avec q > 1, la limite est +∞.", "Ici q = 2 > 1.", "lim 2ⁿ = +∞.", "La limite est +∞."),
    tags: ["terminale-spe", "limite_suite", "calcul", "geometrique", "qcm"],
  },

  {
    kind: "fixed", id: "terminale_spe_lim_suite_operations_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_operations", difficulty: 3, theme: "neutral",
    text: "Si lim uₙ = 2 et lim vₙ = 3, que vaut lim (uₙ + vₙ) ?",
    format: "short", expected: ["5"], comparator: "number_equal",
    hint: "Somme des limites.",
    explanation: exp("La limite d'une somme est la somme des limites.", "2 + 3.", "= 5.", "La limite est 5."),
    tags: ["terminale-spe", "limite_suite", "operations", "short"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_operations_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_operations", difficulty: 3, theme: "neutral",
    text: "Si lim uₙ = 4 et lim vₙ = 5, que vaut lim (uₙ × vₙ) ?",
    format: "short", expected: ["20"], comparator: "number_equal",
    hint: "Produit des limites.",
    explanation: exp("La limite d'un produit est le produit des limites.", "4 × 5.", "= 20.", "La limite est 20."),
    tags: ["terminale-spe", "limite_suite", "operations", "short"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_operations_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_operations", difficulty: 4, theme: "neutral",
    text: "Si lim uₙ = +∞ et lim vₙ = 3, que vaut lim (uₙ + vₙ) ?",
    format: "qcm", choices: ["+∞", "3", "0", "forme indéterminée"], expected: ["+∞"], comparator: "mcq_exact",
    hint: "+∞ + (réel) = +∞.",
    explanation: exp("On additionne une limite infinie et une limite finie.", "+∞ + 3 = +∞.", "Pas d'indétermination ici.", "La limite est +∞."),
    tags: ["terminale-spe", "limite_suite", "operations", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_operations_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_operations", difficulty: 5, theme: "neutral",
    text: "« +∞ - ∞ » est :",
    format: "qcm", choices: ["une forme indéterminée", "égal à 0", "égal à +∞", "égal à -∞"], expected: ["une forme indéterminée"], comparator: "mcq_exact",
    hint: "On ne peut pas conclure directement.",
    explanation: exp("Certaines opérations sont indéterminées.", "« +∞ - ∞ » ne permet pas de conclure.", "Il faut lever l'indétermination.", "C'est une forme indéterminée."),
    tags: ["terminale-spe", "limite_suite", "operations", "qcm"],
  },

  {
    kind: "fixed", id: "terminale_spe_lim_suite_comparaison_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_comparaison", difficulty: 3, theme: "neutral",
    text: "Si uₙ ≥ vₙ pour tout n et lim vₙ = +∞, que peut-on dire de uₙ ?",
    format: "qcm", choices: ["lim uₙ = +∞", "lim uₙ = 0", "uₙ converge", "on ne peut rien dire"], expected: ["lim uₙ = +∞"], comparator: "mcq_exact",
    hint: "Théorème de comparaison.",
    explanation: exp("Théorème de comparaison vers +∞.", "uₙ ≥ vₙ et vₙ → +∞.", "Alors uₙ → +∞.", "lim uₙ = +∞."),
    tags: ["terminale-spe", "limite_suite", "comparaison", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_comparaison_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_comparaison", difficulty: 4, theme: "neutral",
    text: "Si vₙ ≤ uₙ ≤ wₙ avec lim vₙ = lim wₙ = 2, que vaut lim uₙ ?",
    format: "short", expected: ["2"], comparator: "number_equal",
    hint: "Théorème des gendarmes.",
    explanation: exp("Théorème d'encadrement (gendarmes).", "uₙ est coincée entre vₙ et wₙ.", "Les deux tendent vers 2.", "lim uₙ = 2."),
    tags: ["terminale-spe", "limite_suite", "comparaison", "gendarmes", "short"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_comparaison_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_comparaison", difficulty: 4, theme: "neutral",
    text: "Comment s'appelle le théorème d'encadrement des limites ?",
    format: "qcm", choices: ["théorème des gendarmes", "théorème de Pascal", "théorème des valeurs intermédiaires", "théorème de Thalès"], expected: ["théorème des gendarmes"], comparator: "mcq_exact",
    hint: "Deux suites encadrent la troisième.",
    explanation: exp("L'encadrement de limites a un nom imagé.", "Deux « gendarmes » encadrent la suite.", "Même limite des gendarmes ⟹ même limite.", "C'est le théorème des gendarmes."),
    tags: ["terminale-spe", "limite_suite", "comparaison", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_comparaison_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_comparaison", difficulty: 4, theme: "neutral",
    text: "Si uₙ ≤ wₙ pour tout n et lim wₙ = -∞, alors :",
    format: "qcm", choices: ["lim uₙ = -∞", "lim uₙ = +∞", "uₙ converge", "on ne peut rien dire"], expected: ["lim uₙ = -∞"], comparator: "mcq_exact",
    hint: "Comparaison vers -∞.",
    explanation: exp("Théorème de comparaison vers -∞.", "uₙ ≤ wₙ et wₙ → -∞.", "Alors uₙ → -∞.", "lim uₙ = -∞."),
    tags: ["terminale-spe", "limite_suite", "comparaison", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_comparaison_h5", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_comparaison", difficulty: 5, theme: "neutral",
    text: "Pour montrer que uₙ = (sin n)/n → 0, on encadre par :",
    format: "qcm", choices: ["-1/n ≤ uₙ ≤ 1/n", "0 ≤ uₙ ≤ n", "uₙ ≥ n", "uₙ ≤ -1"], expected: ["-1/n ≤ uₙ ≤ 1/n"], comparator: "mcq_exact",
    hint: "-1 ≤ sin n ≤ 1.",
    explanation: exp("On part de -1 ≤ sin n ≤ 1.", "En divisant par n > 0 : -1/n ≤ uₙ ≤ 1/n.", "Les bornes tendent vers 0.", "On encadre par -1/n ≤ uₙ ≤ 1/n."),
    tags: ["terminale-spe", "limite_suite", "comparaison", "gendarmes", "qcm"],
  },

  {
    kind: "fixed", id: "terminale_spe_lim_suite_mono_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_monotone_bornee", difficulty: 3, theme: "neutral",
    text: "Une suite croissante et majorée est :",
    format: "qcm", choices: ["convergente", "divergente vers +∞", "décroissante", "non bornée"], expected: ["convergente"], comparator: "mcq_exact",
    hint: "Convergence monotone.",
    explanation: exp("Théorème de convergence monotone.", "Croissante + majorée.", "Donc convergente.", "La suite est convergente."),
    tags: ["terminale-spe", "limite_suite", "monotone", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_mono_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_monotone_bornee", difficulty: 3, theme: "neutral",
    text: "Une suite décroissante et minorée est :",
    format: "qcm", choices: ["convergente", "divergente vers -∞", "croissante", "non bornée"], expected: ["convergente"], comparator: "mcq_exact",
    hint: "Convergence monotone.",
    explanation: exp("Théorème de convergence monotone.", "Décroissante + minorée.", "Donc convergente.", "La suite est convergente."),
    tags: ["terminale-spe", "limite_suite", "monotone", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_mono_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_monotone_bornee", difficulty: 4, theme: "neutral",
    text: "Une suite croissante NON majorée :",
    format: "qcm", choices: ["diverge vers +∞", "converge", "est bornée", "est décroissante"], expected: ["diverge vers +∞"], comparator: "mcq_exact",
    hint: "Croissante sans plafond.",
    explanation: exp("Croissante : convergente si majorée, sinon divergente.", "Non majorée : dépasse tout réel.", "Diverge vers +∞.", "Elle diverge vers +∞."),
    tags: ["terminale-spe", "limite_suite", "monotone", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_mono_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_monotone_bornee", difficulty: 4, theme: "neutral",
    text: "Le théorème de convergence monotone s'applique à une suite :",
    format: "qcm", choices: ["monotone et bornée", "quelconque", "alternée", "non bornée"], expected: ["monotone et bornée"], comparator: "mcq_exact",
    hint: "Deux conditions.",
    explanation: exp("Les hypothèses du théorème sont précises.", "Il faut monotone ET bornée.", "Alors la suite converge.", "Monotone et bornée."),
    tags: ["terminale-spe", "limite_suite", "monotone", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_mono_h5", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_monotone_bornee", difficulty: 5, theme: "neutral",
    text: "Le théorème de convergence monotone garantit-il la VALEUR de la limite ?",
    format: "qcm", choices: ["Non, seulement l'existence", "Oui, il la donne", "Oui, elle vaut 0", "Non, la suite diverge"], expected: ["Non, seulement l'existence"], comparator: "mcq_exact",
    hint: "Résultat d'existence.",
    explanation: exp("Le théorème prouve l'existence d'une limite finie.", "Il ne calcule pas sa valeur.", "Autre méthode requise pour la valeur.", "Non, seulement l'existence."),
    tags: ["terminale-spe", "limite_suite", "monotone", "qcm"],
  },

  {
    kind: "fixed", id: "terminale_spe_lim_suite_defi_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_defi", difficulty: 5, theme: "neutral",
    text: "u₀ = 0 et uₙ₊₁ = 0,5uₙ + 3. La limite éventuelle ℓ vérifie ℓ = 0,5ℓ + 3. Que vaut ℓ ?",
    format: "short", expected: ["6"], comparator: "number_equal",
    hint: "Résous 0,5ℓ = 3.",
    explanation: exp("La limite éventuelle est un point fixe.", "ℓ = 0,5ℓ + 3 ⟹ 0,5ℓ = 3.", "ℓ = 6.", "ℓ = 6."),
    tags: ["terminale-spe", "limite_suite", "type_bac", "short"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_defi_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_defi", difficulty: 5, theme: "neutral",
    text: "Que vaut lim (3 + 1/n) quand n → +∞ ?",
    format: "short", expected: ["3"], comparator: "number_equal",
    hint: "1/n → 0.",
    explanation: exp("On combine limite de référence et opérations.", "1/n → 0.", "3 + 0 = 3.", "La limite est 3."),
    tags: ["terminale-spe", "limite_suite", "type_bac", "short"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_defi_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_defi", difficulty: 5, theme: "neutral",
    text: "Pour une suite géométrique de raison q = 0,9 et u₀ > 0, la limite est :",
    format: "short", expected: ["0"], comparator: "number_equal",
    hint: "|q| < 1.",
    explanation: exp("Pour |q| < 1, la suite géométrique tend vers 0.", "q = 0,9.", "u₀ × 0,9ⁿ → 0.", "La limite est 0."),
    tags: ["terminale-spe", "limite_suite", "type_bac", "geometrique", "short"],
  },
  {
    kind: "fixed", id: "terminale_spe_lim_suite_defi_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "limite_suite", microId: "limite_suite_defi", difficulty: 5, theme: "neutral",
    text: "Pour justifier qu'une suite récurrente croissante converge, il suffit souvent de montrer qu'elle est :",
    format: "qcm", choices: ["majorée", "minorée", "négative", "constante"], expected: ["majorée"], comparator: "mcq_exact",
    hint: "Croissante + majorée ⟹ convergente.",
    explanation: exp("On vise le théorème de convergence monotone.", "La suite est déjà croissante.", "Il reste à montrer qu'elle est majorée.", "Il suffit de montrer qu'elle est majorée."),
    tags: ["terminale-spe", "limite_suite", "type_bac", "qcm"],
  },
];