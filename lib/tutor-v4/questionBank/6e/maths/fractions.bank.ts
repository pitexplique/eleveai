import type {
  TutorBankItemV4,
  FractionCanvasData,
} from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function simplifyFraction(n: number, d: number) {
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}

function fractionString(n: number, d: number) {
  return `${n}/${d}`;
}

function fractionStringSpaced(n: number, d: number) {
  return `${n} / ${d}`;
}

function decimalComma(value: number, digits?: number) {
  const s =
    typeof digits === "number" ? value.toFixed(digits) : String(value);
  return s.replace(".", ",");
}

function fractionCanvas(
  data: Omit<FractionCanvasData, "kind">
): FractionCanvasData {
  return { kind: "fraction", ...data };
}

export const fractionsBank: TutorBankItemV4[] = [
  // =========================
  // FRACTION_LIRE_ECRIRE
  // =========================
  {
    kind: "fixed",
    id: "fraction_lire_ecrire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction représente 1 part sur 4 parts égales ?",
    format: "short",
    expected: ["1/4", "1 / 4", "0,25", "0.25"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une part sur quatre.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Une fraction s’écrit avec le nombre de parts prises au numérateur et le nombre total de parts au dénominateur. Ici, une part sur 4 se note 1/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "lecture", "ecriture"],
  },
  {
    kind: "fixed",
    id: "fraction_lire_ecrire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction représente 1 part sur 2 parts égales ?",
    format: "short",
    expected: ["1/2", "1 / 2", "0,5", "0.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une part sur deux, c’est une moitié.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Une part sur 2 parts égales se note 1/2. Cette fraction représente une moitié.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "lecture", "moitie"],
  },
  {
    kind: "fixed",
    id: "fraction_lire_ecrire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction représente 3 parts sur 5 parts égales ?",
    format: "short",
    expected: ["3/5", "3 / 5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Le numérateur donne les parts prises.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("3 parts prises sur 5 parts égales se notent 3/5. Le 3 indique les parts prises et le 5 le nombre total de parts.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "lecture", "ecriture"],
  },
  {
    kind: "fixed",
    id: "fraction_lire_ecrire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction représente 2 parts sur 8 parts égales ?",
    format: "short",
    expected: ["2/8", "2 / 8", "1/4", "1 / 4", "0,25", "0.25"],
    comparator: "fraction_decimal_equivalent",
    hint: "2 parts prises sur 8 au total.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("2 parts sur 8 se notent 2/8. Cette fraction peut aussi se simplifier en 1/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "lecture", "ecriture"],
  },
  {
    kind: "fixed",
    id: "fraction_lire_ecrire_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis la fraction qui représente une part sur 5 parts égales.",
    format: "qcm",
    choices: ["1/5", "5/1", "1/4", "2/5"],
    expected: ["1/5"],
    comparator: "mcq_exact",
    hint: "Le dénominateur donne le nombre total de parts.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Une part sur 5 parts égales se note 1/5. Le 1 représente la part prise et le 5 le total.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "lecture", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_lire_ecrire_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction signifie “3 parts sur 4 parts égales” ?",
    format: "qcm",
    choices: ["3/4", "4/3", "1/4", "2/4"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "3 parts prises, 4 parts au total.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("3 parts sur 4 se notent 3/4. Le numérateur est 3 et le dénominateur est 4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "lecture", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_lire_ecrire_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 2,
    theme: "reunion",
    text: "À La Réunion, 2 parts de gâteau sur 8 ont déjà été mangées. Quelle fraction cela représente-t-il ?",
    format: "short",
    expected: ["2/8", "2 / 8", "1/4", "1 / 4", "0,25", "0.25"],
    comparator: "fraction_decimal_equivalent",
    hint: "2 parts sur 8, c’est aussi une fraction simplifiable.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("2 parts mangées sur 8 se notent 2/8. Cette fraction se simplifie en 1/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "lecture", "reunion"],
  },

  // =========================
  // FRACTION_REPRESENTER
  // =========================
  {
    kind: "fixed",
    id: "fraction_representer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 1,
    theme: "neutral",
    text: "Combien faut-il colorier de parts pour représenter 3/4 d’une figure partagée en 4 parts égales ?",
    format: "short",
    expected: ["3", "trois"],
    comparator: "contains_keyword",
    hint: "Le numérateur indique le nombre de parts à colorier.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Dans la fraction 3/4, le numérateur 3 indique le nombre de parts à prendre ou à colorier. Il faut donc colorier 3 parts.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "representation"],
  },
  {
    kind: "fixed",
    id: "fraction_representer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 1,
    theme: "neutral",
    text: "Combien faut-il colorier de parts pour représenter 2/5 ?",
    format: "short",
    expected: ["2", "deux"],
    comparator: "contains_keyword",
    hint: "Le numérateur donne le nombre de parts colorées.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Dans 2/5, le numérateur vaut 2. Il faut donc colorier 2 parts.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "representation"],
  },
  {
    kind: "fixed",
    id: "fraction_representer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour représenter 4/6, combien de parts égales doit avoir la figure au total ?",
    format: "short",
    expected: ["6", "six"],
    comparator: "contains_keyword",
    hint: "Le dénominateur donne le nombre total de parts.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Dans 4/6, le dénominateur 6 indique le nombre total de parts égales. La figure doit donc être partagée en 6 parts.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "representation"],
  },
  {
    kind: "fixed",
    id: "fraction_representer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour représenter 4/6, combien de parts égales doit avoir la figure au total ?",
    format: "qcm",
    choices: ["4", "6", "10", "24"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Le dénominateur donne le nombre total de parts.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Le dénominateur de 4/6 est 6. Il faut donc 6 parts égales au total.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_representer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour représenter 5/8, combien de parts doivent être colorées ?",
    format: "qcm",
    choices: ["3", "5", "8", "13"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Le numérateur donne le nombre de parts colorées.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Dans 5/8, le numérateur vaut 5. Il faut donc colorier 5 parts.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_representer_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "reunion",
    text: "Un plateau de bonbons piments est partagé en 6 parts égales. Pour représenter 4/6 du plateau, combien de parts faut-il prendre ?",
    format: "short",
    expected: ["4", "quatre"],
    comparator: "contains_keyword",
    hint: "4/6 signifie 4 parts parmi 6.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("4/6 signifie que l’on prend 4 parts sur 6 parts égales. Il faut donc prendre 4 parts.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "representation", "reunion"],
  },

  // =========================
  // FRACTION_QUANTITE
  // =========================
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "La moitié de 10, c’est combien ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Partage 10 en 2 parts égales.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("La moitié signifie partager en 2 parts égales. 10 partagé en 2 donne 5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "quantite", "moitie"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Le quart de 20, c’est combien ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Le quart, c’est partager en 4 parts égales.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Le quart signifie partager en 4 parts égales. 20 partagé en 4 donne 5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "quantite", "quart"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Les 3/4 de 12, c’est combien ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Commence par trouver 1/4 de 12.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Le quart de 12 vaut 3. Donc les 3/4 de 12 valent 3 × 3 = 9.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Les 2/3 de 15, c’est combien ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Commence par trouver 1/3 de 15.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Le tiers de 15 vaut 5. Donc les 2/3 de 15 valent 2 × 5 = 10.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la moitié de 14 ?",
    format: "qcm",
    choices: ["6", "7", "8", "9"],
    expected: ["7"],
    comparator: "mcq_exact",
    hint: "Divise par 2.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("La moitié de 14 s’obtient en divisant 14 par 2. On trouve 7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "quantite", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le quart de 16 ?",
    format: "qcm",
    choices: ["2", "4", "8", "12"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Divise par 4.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Le quart de 16 s’obtient en divisant 16 par 4. On trouve 4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "quantite", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, 1/2 d’une caisse de 18 mangues est vendue. Combien de mangues cela fait-il ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "La moitié de 18.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("La moitié de 18 vaut 9. Donc 1/2 d’une caisse de 18 mangues représente 9 mangues.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "quantite", "reunion"],
  },

  // =========================
  // FRACTION_DECIMAL
  // =========================
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 1/2 sous forme décimale.",
    format: "short",
    expected: ["0,5", "0.5", "1/2", "1 / 2"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une moitié vaut 0,5.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/2 représente une moitié. En écriture décimale, une moitié vaut 0,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 1/4 sous forme décimale.",
    format: "short",
    expected: ["0,25", "0.25", "1/4", "1 / 4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Un quart vaut 0,25.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/4 représente un quart. En écriture décimale, un quart vaut 0,25.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 3,
    theme: "neutral",
    text: "Écris 3/4 sous forme décimale.",
    format: "short",
    expected: ["0,75", "0.75", "3/4", "3 / 4"],
    comparator: "fraction_decimal_equivalent",
    hint: "3 quarts = 0,75.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/4 vaut 0,25. Donc 3/4 vaut 3 × 0,25 = 0,75.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 1/5 sous forme décimale.",
    format: "short",
    expected: ["0,2", "0.2", "1/5", "1 / 5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Un cinquième vaut 0,2.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/5 représente un cinquième. En écriture décimale, cela vaut 0,2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "fraction_decimal_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 1/2 ?",
    format: "qcm",
    choices: ["0,2", "0,25", "0,5", "2,0"],
    expected: ["0,5"],
    comparator: "mcq_exact",
    hint: "Une moitié.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/2 signifie une moitié. En décimal, une moitié vaut 0,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "decimal", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_decimal_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 1/4 ?",
    format: "qcm",
    choices: ["0,4", "0,25", "0,14", "0,75"],
    expected: ["0,25"],
    comparator: "mcq_exact",
    hint: "Un quart.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/4 signifie un quart. En décimal, un quart vaut 0,25.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "decimal", "qcm"],
  },

  // =========================
  // FRACTION_COMPARE
  // =========================
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Compare 1/4 et 1/2 : laquelle est la plus grande ?",
    format: "short",
    expected: ["1/2", "1 / 2", "0,5", "0.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une moitié est plus grande qu’un quart.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/2 vaut 0,5 et 1/4 vaut 0,25. Comme 0,5 est plus grand que 0,25, la plus grande fraction est 1/2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Compare 3/5 et 1/5 : laquelle est la plus grande ?",
    format: "short",
    expected: ["3/5", "3 / 5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur : compare les numérateurs.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Quand les dénominateurs sont les mêmes, on compare les numérateurs. Comme 3 est plus grand que 1, 3/5 est plus grande que 1/5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Compare 2/4 et 3/4 : laquelle est la plus grande ?",
    format: "short",
    expected: ["3/4", "3 / 4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Les deux fractions ont le même dénominateur 4. Comme 3 est plus grand que 2, 3/4 est plus grande que 2/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Compare 2/3 et 3/4 : laquelle est la plus grande ?",
    format: "short",
    expected: ["3/4", "3 / 4", "0,75", "0.75"],
    comparator: "fraction_decimal_equivalent",
    hint: "Tu peux comparer les valeurs décimales.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("2/3 vaut environ 0,67 et 3/4 vaut 0,75. Comme 0,75 est plus grand, 3/4 est la plus grande fraction.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est la plus grande ?",
    format: "qcm",
    choices: ["1/3", "2/3", "1/6", "1/2"],
    expected: ["2/3"],
    comparator: "mcq_exact",
    hint: "Tu peux comparer les fractions ou penser à leur valeur.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("2/3 vaut environ 0,67. C’est plus grand que 1/2, 1/3 et 1/6. La plus grande fraction est donc 2/3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est la plus petite ?",
    format: "qcm",
    choices: ["1/2", "1/4", "3/4", "2/4"],
    expected: ["1/4"],
    comparator: "mcq_exact",
    hint: "Pense à 0,5 ; 0,25 ; 0,75.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/2 vaut 0,5, 1/4 vaut 0,25, 3/4 vaut 0,75 et 2/4 vaut aussi 0,5. La plus petite fraction est donc 1/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "comparaison", "qcm"],
  },

  // =========================
  // FRACTION_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "fraction_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 1,
    theme: "neutral",
    text: "Si une pizza est partagée en 8 parts égales et que tu en manges 4, quelle fraction de la pizza as-tu mangée ?",
    format: "short",
    expected: ["4/8", "4 / 8", "1/2", "1 / 2", "0,5", "0.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "4 parts sur 8, c’est aussi une moitié.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("4 parts mangées sur 8 parts égales se notent 4/8. Cette fraction correspond aussi à 1/2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "defi"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une boîte de 12 biscuits, Léa mange 1/3 de la boîte. Combien de biscuits mange-t-elle ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Partage 12 en 3 parts égales.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Le tiers de 12 vaut 12 ÷ 3 = 4. Léa mange donc 4 biscuits.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "defi", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction est équivalente à 2/8 ?",
    format: "qcm",
    choices: ["1/2", "1/4", "2/4", "4/8"],
    expected: ["1/4"],
    comparator: "mcq_exact",
    hint: "Simplifie 2/8.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Si on simplifie 2/8 en divisant le numérateur et le dénominateur par 2, on obtient 1/4. Les deux fractions sont donc équivalentes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, une famille partage 24 samoussas. Si 1/4 est mangé, combien de samoussas ont été mangés ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Le quart de 24.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Le quart de 24 vaut 24 ÷ 4 = 6. Donc 6 samoussas ont été mangés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "defi", "reunion"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Tu hésites entre 2/3 et 3/4. Quelle fraction est la plus grande ?",
    format: "short",
    expected: ["3/4", "3 / 4", "0,75", "0.75"],
    comparator: "fraction_decimal_equivalent",
    hint: "Compare leurs valeurs décimales.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("2/3 vaut environ 0,67 alors que 3/4 vaut 0,75. Comme 0,75 est plus grand, la plus grande fraction est 3/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "defi", "comparaison"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi 2/4 et 1/2 représentent la même quantité.",
    format: "short",
    expected: ["même", "quantité", "2/4", "1/2"],
    comparator: "contains_keyword",
    hint: "Pense à une figure partagée en 4 parts.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("2/4 signifie 2 parts sur 4. Si on regroupe ces 4 parts en 2 groupes égaux, 2 parts sur 4 correspondent à 1 part sur 2. Donc 2/4 et 1/2 représentent la même quantité.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "defi", "raisonnement"],
  },

  // =========================
  // TEMPLATES - LIRE ET ECRIRE
  // =========================
  {
    kind: "template",
    id: "fraction_lire_ecrire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    hint: "Numérateur = parts prises ; dénominateur = parts totales.",
    tags: ["fraction_nombre", "lecture", "template"],
    generate: () => {
      const den = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)];
      const num = 1 + Math.floor(Math.random() * Math.min(den - 1, 3));

      return {
        text: `Quelle fraction représente ${num} part${num > 1 ? "s" : ""} sur ${den} parts égales ?`,
        format: "short",
        expected: [fractionString(num, den), fractionStringSpaced(num, den)],
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (`${num} part${num > 1 ? "s" : ""} sur ${den} parts égales se notent ${num}/${den}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_lire_ecrire_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le dénominateur correspond au nombre total de parts.",
    tags: ["fraction_nombre", "lecture", "qcm", "template"],
    generate: () => {
      const den = [3, 4, 5, 6, 8][Math.floor(Math.random() * 5)];
      const num = 1 + Math.floor(Math.random() * Math.min(den - 1, 3));
      const good = fractionString(num, den);

      const distractors = shuffle(
        Array.from(
          new Set([
            fractionString(den, num),
            fractionString(1, den),
            fractionString(num + 1 <= den ? num + 1 : num - 1, den),
            fractionString(num, den + 1),
          ])
        ).filter((x) => x !== good)
      ).slice(0, 3);

      return {
        text: `Choisis la fraction qui représente ${num} part${num > 1 ? "s" : ""} sur ${den} parts égales.`,
        format: "qcm",
        choices: shuffle([good, ...distractors]),
        expected: [good],
        comparator: "mcq_exact",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (`${num} part${num > 1 ? "s" : ""} sur ${den} parts égales se notent ${good}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - REPRESENTER
  // =========================
  {
    kind: "template",
    id: "fraction_representer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 1,
    theme: "neutral",
    hint: "Le numérateur donne le nombre de parts colorées.",
    tags: ["fraction_nombre", "representation", "template"],
    generate: () => {
      const den = [3, 4, 5, 6, 8][Math.floor(Math.random() * 5)];
      const num = 1 + Math.floor(Math.random() * Math.min(den - 1, 4));

      return {
        text: `Combien faut-il colorier de parts pour représenter ${num}/${den} ?`,
        format: "short",
        expected: [String(num)],
        comparator: "number_equal",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (`Dans ${num}/${den}, le numérateur ${num} indique le nombre de parts à colorier.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_representer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le dénominateur donne le nombre total de parts.",
    tags: ["fraction_nombre", "representation", "qcm", "template"],
    generate: () => {
      const den = [4, 5, 6, 8][Math.floor(Math.random() * 4)];
      // Le numérateur part de 2 : avec 1, le piège « numérateur + dénominateur »
      // valait « dénominateur + 1 », l'autre piège — la même ligne deux fois.
      const num = 2 + Math.floor(Math.random() * (Math.min(den - 1, 4) - 1));

      return {
        text: `Pour représenter ${num}/${den}, combien de parts égales faut-il au total ?`,
        format: "qcm",
        choices: shuffle([
          String(den),
          String(num),
          String(den + 1),
          String(num + den),
        ]),
        expected: [String(den)],
        comparator: "mcq_exact",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (`Dans ${num}/${den}, le dénominateur ${den} indique le nombre total de parts.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - QUANTITE
  // =========================
  {
    kind: "template",
    id: "fraction_quantite_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    hint: "Partage la quantité en parts égales.",
    tags: ["fraction_nombre", "quantite", "template"],
    generate: () => {
      const type = ["moitié", "quart"][Math.floor(Math.random() * 2)];
      const base =
        type === "moitié"
          ? [8, 10, 12, 14, 16, 20][Math.floor(Math.random() * 6)]
          : [8, 12, 16, 20, 24][Math.floor(Math.random() * 5)];
      const expected = type === "moitié" ? base / 2 : base / 4;

      return {
        text: `Le ${type} de ${base}, c’est combien ?`,
        format: "short",
        expected: [String(expected)],
        comparator: "number_equal",
        explanation:
          "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (type === "moitié"
            ? `La moitié de ${base}, c’est ${base} ÷ 2 = ${expected}.`
            : `Le quart de ${base}, c’est ${base} ÷ 4 = ${expected}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par trouver une part.",
    tags: ["fraction_nombre", "quantite", "template"],
    generate: () => {
      const den = [3, 4, 5][Math.floor(Math.random() * 3)];
      const num = [2, 3][Math.floor(Math.random() * 2)];
      const base = den * [3, 4, 5][Math.floor(Math.random() * 3)];
      const expected = (base / den) * num;

      return {
        text: `Les ${num}/${den} de ${base}, c’est combien ?`,
        format: "short",
        expected: [String(expected)],
        comparator: "number_equal",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (`Une part vaut ${base} ÷ ${den} = ${base / den}. Donc ${num}/${den} de ${base} vaut ${expected}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_quantite_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    hint: "Moitié = ÷2 ; quart = ÷4.",
    tags: ["fraction_nombre", "quantite", "qcm", "template"],
    generate: () => {
      const base = [8, 12, 16, 20][Math.floor(Math.random() * 4)];
      const type = Math.random() > 0.5 ? "moitié" : "quart";
      const good = type === "moitié" ? base / 2 : base / 4;

      const distractors = Array.from(
        new Set([good + 1, good + 2, base / 2, base / 4])
      )
        .filter((n) => n !== good)
        .slice(0, 3);

      return {
        text: `Quel est le ${type} de ${base} ?`,
        format: "qcm",
        choices: shuffle([String(good), ...distractors.map(String)]),
        expected: [String(good)],
        comparator: "mcq_exact",
        explanation:
          "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (type === "moitié"
            ? `La moitié de ${base} vaut ${base} ÷ 2 = ${good}.`
            : `Le quart de ${base} vaut ${base} ÷ 4 = ${good}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - FRACTION DECIMALE
  // =========================
  {
    kind: "template",
    id: "fraction_decimal_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Certaines fractions simples ont une écriture décimale connue.",
    tags: ["fraction_nombre", "decimal", "template"],
    generate: () => {
      const items = [
        { n: 1, d: 2, dec: 0.5 },
        { n: 1, d: 4, dec: 0.25 },
        { n: 3, d: 4, dec: 0.75 },
        { n: 1, d: 5, dec: 0.2 },
      ];
      const item = items[Math.floor(Math.random() * items.length)];

      return {
        text: `Écris ${item.n}/${item.d} sous forme décimale.`,
        format: "short",
        expected: [
          decimalComma(item.dec),
          String(item.dec),
          fractionString(item.n, item.d),
          fractionStringSpaced(item.n, item.d),
        ],
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (`${item.n}/${item.d} s’écrit ${decimalComma(item.dec)} en décimal.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_decimal_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Une moitié vaut 0,5 ; un quart vaut 0,25.",
    tags: ["fraction_nombre", "decimal", "qcm", "template"],
    generate: () => {
      const items = [
        { frac: "1/2", good: "0,5", distractors: ["0,2", "0,25", "2,0"] },
        { frac: "1/4", good: "0,25", distractors: ["0,4", "0,14", "0,75"] },
        { frac: "3/4", good: "0,75", distractors: ["0,34", "0,5", "0,25"] },
      ];
      const item = items[Math.floor(Math.random() * items.length)];

      return {
        text: `Quelle écriture décimale correspond à ${item.frac} ?`,
        format: "qcm",
        choices: shuffle([item.good, ...item.distractors]),
        expected: [item.good],
        comparator: "mcq_exact",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (`${item.frac} correspond à ${item.good}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - COMPARE
  // =========================
  {
    kind: "template",
    id: "fraction_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Même dénominateur : compare les numérateurs.",
    tags: ["fraction_nombre", "comparaison", "template"],
    generate: () => {
      const den = [3, 4, 5, 6, 8, 10][Math.floor(Math.random() * 6)];
      const a = 1 + Math.floor(Math.random() * (den - 2));
      let b = 1 + Math.floor(Math.random() * (den - 1));

      while (b === a) {
        b = 1 + Math.floor(Math.random() * (den - 1));
      }

      const max = Math.max(a, b);

      return {
        text: `Compare ${a}/${den} et ${b}/${den} : laquelle est la plus grande ?`,
        format: "short",
        expected: [fractionString(max, den), fractionStringSpaced(max, den)],
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (`Les deux fractions ont le même dénominateur ${den}. On compare donc les numérateurs, et ${max}/${den} est la plus grande.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Tu peux penser à la valeur décimale.",
    tags: ["fraction_nombre", "comparaison", "template"],
    generate: () => {
      const pairs = [
        [{ n: 1, d: 2 }, { n: 3, d: 4 }],
        [{ n: 1, d: 4 }, { n: 2, d: 3 }],
        [{ n: 2, d: 5 }, { n: 1, d: 2 }],
      ];
      const pair = pairs[Math.floor(Math.random() * pairs.length)];
      const left = pair[0];
      const right = pair[1];

      const leftVal = left.n / left.d;
      const rightVal = right.n / right.d;
      const good = leftVal > rightVal ? left : right;

      return {
        text: `Compare ${left.n}/${left.d} et ${right.n}/${right.d} : laquelle est la plus grande ?`,
        format: "short",
        expected: [
          fractionString(good.n, good.d),
          fractionStringSpaced(good.n, good.d),
        ],
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (`${left.n}/${left.d} vaut environ ${decimalComma(
          leftVal,
          2
        )} et ${right.n}/${right.d} vaut environ ${decimalComma(
          rightVal,
          2
        )}. La plus grande fraction est donc ${good.n}/${good.d}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_comparer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Quand les dénominateurs sont identiques, le plus grand numérateur donne la plus grande fraction.",
    tags: ["fraction_nombre", "comparaison", "qcm", "template"],
    generate: () => {
      const den = [4, 5, 6, 8][Math.floor(Math.random() * 4)];
      const nums = [1, 2, 3].filter((n) => n < den);
      const goodNum = nums[Math.floor(Math.random() * nums.length)];
      const good = `${goodNum}/${den}`;

      const distractors = Array.from(
        new Set(nums.filter((n) => n !== goodNum).map((n) => `${n}/${den}`))
      );

      while (distractors.length < 3) {
        distractors.push(`1/${den + distractors.length + 1}`);
      }

      return {
        text: "Quelle fraction est la plus grande ?",
        format: "qcm",
        choices: shuffle([good, ...distractors.slice(0, 3)]),
        expected: [good],
        comparator: "mcq_exact",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (`Parmi les fractions proposées, ${good} est la plus grande.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - DEFIS
  // =========================
  {
    kind: "template",
    id: "fraction_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pense au partage ou à la simplification.",
    tags: ["fraction_nombre", "defi", "template"],
    generate: () => {
      const total = [8, 12, 16, 20, 24][Math.floor(Math.random() * 5)];
      const den = [2, 3, 4][Math.floor(Math.random() * 3)];
      const nums = [1, 2, 3].filter((n) => n < den);
      const num = nums[Math.floor(Math.random() * nums.length)];
      const expected = (total / den) * num;

      return {
        text: `Dans une boîte de ${total} objets, on prend ${num}/${den} de la boîte. Combien d’objets cela représente-t-il ?`,
        format: "short",
        expected: [String(expected)],
        comparator: "number_equal",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (`Une part vaut ${total} ÷ ${den} = ${
          total / den
        }. Donc ${num}/${den} de ${total} vaut ${expected}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche si les deux fractions représentent la même quantité.",
    tags: ["fraction_nombre", "defi", "template", "qcm"],
    generate: () => {
      const items = [
        { a: [2, 4], b: [1, 2], answer: "oui" },
        { a: [3, 6], b: [1, 2], answer: "oui" },
        { a: [2, 5], b: [1, 2], answer: "non" },
        { a: [3, 4], b: [2, 3], answer: "non" },
      ];
      const item = items[Math.floor(Math.random() * items.length)];

      const aVal = item.a[0] / item.a[1];
      const bVal = item.b[0] / item.b[1];

      return {
        text: `Les fractions ${item.a[0]}/${item.a[1]} et ${item.b[0]}/${item.b[1]} représentent-elles la même quantité ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [item.answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (item.answer === "oui"
            ? `${item.a[0]}/${item.a[1]} et ${item.b[0]}/${item.b[1]} ont la même valeur. Elles représentent donc la même quantité.`
            : `${item.a[0]}/${item.a[1]} vaut ${decimalComma(
                aVal,
                2
              )} et ${item.b[0]}/${item.b[1]} vaut ${decimalComma(
                bVal,
                2
              )}. Elles ne représentent donc pas la même quantité.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
    /* =========================
     RENFORT — CANVAS FRACTIONS + OPEN + PIÈGES
  ========================= */

  {
    kind: "template",
    id: "fraction_representer_canvas_tpl_1_barre",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte les parts colorées puis le nombre total de parts.",
    tags: ["fraction_nombre", "representation", "canvas", "template"],
    generate: () => {
      const situations = [
        { n: 1, d: 2 },
        { n: 1, d: 3 },
        { n: 2, d: 3 },
        { n: 3, d: 4 },
        { n: 2, d: 5 },
        { n: 4, d: 5 },
        { n: 5, d: 8 },
      ];
      const s = situations[Math.floor(Math.random() * situations.length)];

      return {
        text: "Quelle fraction est représentée par la partie colorée ?",
        format: "short",
        expected: [fractionString(s.n, s.d), fractionStringSpaced(s.n, s.d)],
        comparator: "fraction_decimal_equivalent",
        explanation:
          "Définition : une fraction représente des parts d’un tout partagé en parts égales.\n\n" +
          "Méthode : on compte les parts colorées puis le nombre total de parts.\n\n" +
          `Observation : ${s.n} part(s) sont colorées sur ${s.d} parts égales.\n\n` +
          `Conclusion : la fraction représentée est ${s.n}/${s.d}.`,
        canvas: fractionCanvas({
          model: "bar",
          fraction: { numerator: s.n, denominator: s.d, label: "?" },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "fraction_representer_canvas_tpl_2_grille",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les cases colorées puis le nombre total de cases.",
    tags: ["fraction_nombre", "representation", "grille", "canvas", "template"],
    generate: () => {
      const situations = [
        { rows: 2, cols: 5, shaded: 3 },
        { rows: 2, cols: 5, shaded: 6 },
        { rows: 3, cols: 4, shaded: 5 },
        { rows: 3, cols: 4, shaded: 9 },
        { rows: 4, cols: 4, shaded: 8 },
      ];
      const s = situations[Math.floor(Math.random() * situations.length)];
      const total = s.rows * s.cols;
      const simp = simplifyFraction(s.shaded, total);

      return {
        text: "Quelle fraction est représentée par la grille colorée ?",
        format: "short",
        expected: [
          fractionString(s.shaded, total),
          fractionStringSpaced(s.shaded, total),
          fractionString(simp.n, simp.d),
          fractionStringSpaced(simp.n, simp.d),
        ],
        comparator: "fraction_decimal_equivalent",
        explanation:
          "Définition : une fraction peut représenter une partie d’une grille.\n\n" +
          "Méthode : on compte les cases colorées puis le nombre total de cases.\n\n" +
          `Observation : ${s.shaded} case(s) sont colorées sur ${total} cases.\n\n` +
          `Conclusion : la fraction est ${s.shaded}/${total}.`,
        canvas: fractionCanvas({
          model: "grid",
          grid: { rows: s.rows, cols: s.cols, shaded: s.shaded },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "fraction_comparer_canvas_tpl_1_barres",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les longueurs colorées.",
    tags: ["fraction_nombre", "comparaison", "canvas", "template"],
    generate: () => {
      const pairs = [
        [
          { n: 1, d: 2 },
          { n: 3, d: 4 },
        ],
        [
          { n: 1, d: 4 },
          { n: 1, d: 2 },
        ],
        [
          { n: 2, d: 5 },
          { n: 3, d: 5 },
        ],
        [
          { n: 2, d: 3 },
          { n: 3, d: 4 },
        ],
      ];
      const [a, b] = pairs[Math.floor(Math.random() * pairs.length)];
      const good = a.n / a.d > b.n / b.d ? a : b;

      return {
        text: "En observant les deux barres, quelle fraction est la plus grande ?",
        format: "short",
        expected: [fractionString(good.n, good.d), fractionStringSpaced(good.n, good.d)],
        comparator: "fraction_decimal_equivalent",
        explanation:
          "Définition : comparer deux fractions, c’est comparer les quantités qu’elles représentent.\n\n" +
          "Méthode : on observe les parties colorées.\n\n" +
          `Observation : ${good.n}/${good.d} représente la plus grande partie colorée.\n\n` +
          `Conclusion : la fraction la plus grande est ${good.n}/${good.d}.`,
        canvas: fractionCanvas({
          model: "compare",
          fractions: [
            { numerator: a.n, denominator: a.d, label: `${a.n}/${a.d}` },
            { numerator: b.n, denominator: b.d, label: `${b.n}/${b.d}` },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "fraction_equivalence_canvas_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde si la même quantité est colorée.",
    tags: ["fraction_nombre", "equivalence", "canvas", "template"],
    generate: () => {
      const situations = [
        { a: { n: 1, d: 2 }, b: { n: 2, d: 4 }, answer: "oui" },
        { a: { n: 1, d: 3 }, b: { n: 2, d: 6 }, answer: "oui" },
        { a: { n: 2, d: 5 }, b: { n: 1, d: 2 }, answer: "non" },
        { a: { n: 3, d: 4 }, b: { n: 2, d: 3 }, answer: "non" },
      ];
      const s = situations[Math.floor(Math.random() * situations.length)];

      return {
        text: `Les fractions ${s.a.n}/${s.a.d} et ${s.b.n}/${s.b.d} représentent-elles la même quantité ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [s.answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux fractions sont équivalentes si elles représentent la même quantité.\n\n" +
          "Méthode : on compare les parties colorées.\n\n" +
          (s.answer === "oui"
            ? `Observation : ${s.a.n}/${s.a.d} et ${s.b.n}/${s.b.d} représentent la même portion.\n\n`
            : `Observation : ${s.a.n}/${s.a.d} et ${s.b.n}/${s.b.d} ne représentent pas la même portion.\n\n`) +
          `Conclusion : la réponse est ${s.answer}.`,
        canvas: fractionCanvas({
          model: "compare",
          fractions: [
            { numerator: s.a.n, denominator: s.a.d, label: `${s.a.n}/${s.a.d}` },
            { numerator: s.b.n, denominator: s.b.d, label: `${s.b.n}/${s.b.d}` },
          ],
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "fraction_representer_piege_parts_inegales_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on écrire une fraction si les parts du tout ne sont pas égales ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une fraction exige des parts égales.",
    explanation:
      "Définition : une fraction représente des parts égales d’un même tout.\n\n" +
      "Méthode : avant d’écrire une fraction, on vérifie que les parts sont égales.\n\n" +
      "Observation : si les parts ne sont pas égales, l’écriture fractionnaire n’est pas correcte.\n\n" +
      "Conclusion : on ne peut pas écrire une fraction fiable avec des parts inégales.",
    tags: ["fraction_nombre", "piege", "parts_inegales", "canvas"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: { numerator: 2, denominator: 4, label: "2/4 ?" },
      display: { unequalParts: true },
    }),
  },

  {
    kind: "fixed",
    id: "fraction_comparer_piege_denominateur_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève affirme que 1/5 est plus grand que 1/3 parce que 5 est plus grand que 3. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Quand on partage en plus de parts, chaque part est plus petite.",
    explanation:
      "Définition : une fraction partage un tout en parts égales.\n\n" +
      "Méthode : on compare la taille d’une seule part.\n\n" +
      "Observation : un cinquième est plus petit qu’un tiers, car le tout est partagé en plus de parts.\n\n" +
      "Conclusion : 1/5 est plus petit que 1/3.",
    tags: ["fraction_nombre", "piege", "comparaison", "denominateur"],
  },

  {
    kind: "fixed",
    id: "fraction_lire_ecrire_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce que représentent le numérateur et le dénominateur dans une fraction.",
    format: "open",
    expected: ["numérateur", "dénominateur", "parts", "total", "prises"],
    comparator: "contains_keyword",
    hint: "Le haut indique les parts prises, le bas indique les parts au total.",
    explanation:
      "Définition : une fraction s’écrit avec un numérateur et un dénominateur.\n\n" +
      "Méthode : on lit d’abord le nombre de parts prises, puis le nombre total de parts.\n\n" +
      "Observation : le numérateur indique les parts prises et le dénominateur indique les parts égales au total.\n\n" +
      "Conclusion : comprendre ces deux nombres permet de lire correctement une fraction.",
    tags: ["fraction_nombre", "open", "vocabulaire", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "fraction_comparer_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi 1/3 est plus grand que 1/5.",
    format: "open",
    expected: ["parts", "égales", "plus petites", "tiers", "cinquième"],
    comparator: "contains_keyword",
    hint: "Quand on partage en plus de parts, chaque part est plus petite.",
    explanation:
      "Définition : une fraction partage un tout en parts égales.\n\n" +
      "Méthode : on compare la taille d’une part dans chaque partage.\n\n" +
      "Observation : si on partage un même tout en 5 parts, chaque part est plus petite que si on le partage en 3 parts.\n\n" +
      "Conclusion : 1/3 est plus grand que 1/5.",
    tags: ["fraction_nombre", "open", "comparaison", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "fraction_equivalence_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « 3/6 est plus petit que 1/2, parce qu’il y a plus de parts. » Explique son erreur.",
    format: "open",
    expected: ["même", "égales", "egales", "moitié", "moitie", "3 sur 6", "plus petites"],
    comparator: "contains_keyword",
    hint: "Coupe une barre en 6 parts, puis prends-en 3. Qu’obtiens-tu ?",
    explanation:
      "Définition : deux fractions sont équivalentes si elles représentent la même quantité.\n\n" +
      "Méthode : on compare les portions du même tout.\n\n" +
      "Observation : couper en 6 donne bien plus de parts qu’en 2, mais chaque part est plus petite. Prendre 3 parts sur 6, c’est prendre la moitié de la barre — exactement comme 1 part sur 2.\n\n" +
      "Conclusion : 3/6 et 1/2 représentent la même quantité, elles ne sont ni plus grandes ni plus petites l’une que l’autre.",
    tags: ["fraction_nombre", "open", "equivalence", "raisonnement"],
  },
];