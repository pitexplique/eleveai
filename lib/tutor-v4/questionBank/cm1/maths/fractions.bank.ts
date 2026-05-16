// lib/tutor-v4/question-banks/maths/cm1/fractions.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function fractionCanvas(data: {
  numerator: number;
  denominator: number;
  model?: "bar" | "circle";
  label?: string;
  showFraction?: boolean;
  unequalParts?: boolean;
}) {
  return {
    kind: "fraction" as const,
    model: data.model ?? "bar",
    fraction: {
      numerator: data.numerator,
      denominator: data.denominator,
      label: data.label,
    },
    display: {
      showFraction: data.showFraction ?? false,
      showLabel: true,
      showParts: true,
      unequalParts: data.unequalParts ?? false,
    },
  };
}

function fractionCompareCanvas(data: {
  a: {
    numerator: number;
    denominator: number;
    label?: string;
  };
  b: {
    numerator: number;
    denominator: number;
    label?: string;
  };
  showFraction?: boolean;
}) {
  return {
    kind: "fraction" as const,
    model: "compare" as const,
    fractions: [
      {
        numerator: data.a.numerator,
        denominator: data.a.denominator,
        label: data.a.label,
      },
      {
        numerator: data.b.numerator,
        denominator: data.b.denominator,
        label: data.b.label,
      },
    ],
    display: {
      showFraction: data.showFraction ?? false,
      showLabel: true,
      showParts: true,
    },
  };
}

function fractionGridCanvas(data: {
  rows: number;
  cols: number;
  shaded: number;
}) {
  return {
    kind: "fraction" as const,
    model: "grid" as const,
    grid: {
      rows: data.rows,
      cols: data.cols,
      shaded: data.shaded,
    },
    display: {
      showFraction: false,
      showLabel: true,
      showParts: true,
    },
  };
}
function droiteGradueeFractionCanvas(data: {
  denominator: number;
  numerator: number;
  label?: string;
  showPointLabel?: boolean;
}) {
  return {
    kind: "number_line" as const,
    min: 0,
    max: 1,
    step: 1 / data.denominator,
    points: [
      {
        value: data.numerator / data.denominator,
        label: data.label ?? "?",
        color: "#2563eb",
      },
    ],
    display: {
      showTicks: true,
      showValues: true,
      showPoints: true,
      showPointLabels: data.showPointLabel ?? true,
      showZero: true,
    },
    size: {
      width: 320,
      height: 120,
    },
  };
}

export const fractionsBank: TutorBankItemV4[] = [
  // ============================================================
  // FRACTION_LIRE
  // Lire une fraction
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_fraction_lire_qcm_001",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Comment lit-on la fraction 3/4 ?",
    format: "qcm",
    choices: [
      "trois quarts",
      "quatre tiers",
      "trois et quatre",
      "quatre sur trois",
    ],
    expected: ["trois quarts"],
    comparator: "mcq_exact",
    hint: "Le nombre du bas indique le nom des parts.",
    explanation: exp(
      "Une fraction s’écrit avec un numérateur en haut et un dénominateur en bas.",
      "On lit d’abord le numérateur, puis le nom donné par le dénominateur.",
      "Dans 3/4, 3 est le numérateur et 4 indique des quarts.",
      "La fraction 3/4 se lit trois quarts."
    ),
    canvas: fractionCanvas({
      numerator: 3,
      denominator: 4,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "lire", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_lire_short_002_numerateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans la fraction 5/8, quel est le numérateur ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Le numérateur est le nombre du haut.",
    explanation: exp(
      "Le numérateur indique combien de parts sont prises.",
      "On regarde le nombre placé au-dessus de la barre de fraction.",
      "Dans 5/8, le nombre du haut est 5.",
      "Le numérateur est 5."
    ),
    tags: ["cm1", "fraction", "lire", "numerateur"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_lire_short_003_denominateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans la fraction 2/7, quel est le dénominateur ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Le dénominateur est le nombre du bas.",
    explanation: exp(
      "Le dénominateur indique en combien de parts égales l’unité est partagée.",
      "On regarde le nombre placé sous la barre de fraction.",
      "Dans 2/7, le nombre du bas est 7.",
      "Le dénominateur est 7."
    ),
    tags: ["cm1", "fraction", "lire", "denominateur"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_lire_qcm_004_piege",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève dit que dans 4/9, le dénominateur est 4. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le dénominateur est le nombre du bas.",
    explanation: exp(
      "Dans une fraction, le nombre du bas est le dénominateur.",
      "On identifie la position des deux nombres.",
      "Dans 4/9, 4 est le numérateur et 9 est le dénominateur.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "fraction", "lire", "piege", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_fraction_lire_tpl_001_numerateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Le numérateur est le nombre du haut.",
    tags: ["cm1", "fraction", "lire", "template"],
    generate: () => {
      const denominator = randomChoice([3, 4, 5, 6, 8, 10]);
      const numerator = randomInt(1, denominator - 1);

      return {
        text: `Dans la fraction ${numerator}/${denominator}, quel est le numérateur ?`,
        format: "short",
        expected: [String(numerator)],
        comparator: "number_equal",
        explanation: exp(
          "Le numérateur est le nombre placé au-dessus de la barre de fraction.",
          "On regarde le nombre du haut.",
          `Dans ${numerator}/${denominator}, le nombre du haut est ${numerator}.`,
          `Le numérateur est ${numerator}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_lire_tpl_002_denominateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Le dénominateur est le nombre du bas.",
    tags: ["cm1", "fraction", "lire", "template"],
    generate: () => {
      const denominator = randomChoice([3, 4, 5, 6, 8, 10]);
      const numerator = randomInt(1, denominator - 1);

      return {
        text: `Dans la fraction ${numerator}/${denominator}, quel est le dénominateur ?`,
        format: "short",
        expected: [String(denominator)],
        comparator: "number_equal",
        explanation: exp(
          "Le dénominateur est le nombre placé sous la barre de fraction.",
          "On regarde le nombre du bas.",
          `Dans ${numerator}/${denominator}, le nombre du bas est ${denominator}.`,
          `Le dénominateur est ${denominator}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_lire_tpl_003_vocabulaire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le numérateur est en haut, le dénominateur est en bas.",
    tags: ["cm1", "fraction", "lire", "vocabulaire", "template"],
    generate: () => {
      const denominator = randomChoice([4, 5, 6, 8, 10]);
      const numerator = randomInt(1, denominator - 1);

      const askNumerator = randomChoice([true, false]);
      const correct = askNumerator ? "numérateur" : "dénominateur";
      const value = askNumerator ? numerator : denominator;

      return {
        text: `Dans la fraction ${numerator}/${denominator}, comment s’appelle le nombre ${value} ?`,
        format: "qcm",
        choices: ["numérateur", "dénominateur"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une fraction, chaque nombre a un rôle.",
          "Le nombre du haut est le numérateur ; le nombre du bas est le dénominateur.",
          `Dans ${numerator}/${denominator}, ${value} est le ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  // ============================================================
  // FRACTION_REPRESENTER
  // Représenter une fraction
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_fraction_representer_qcm_001_barre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_representer",
    difficulty: 1,
    theme: "neutral",
    text: "Une unité est partagée en 4 parts égales. On colorie 3 parts. Quelle fraction est représentée ?",
    format: "qcm",
    choices: ["3/4", "4/3", "1/4", "3/3"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Le nombre de parts coloriées va en haut.",
    explanation: exp(
      "Une fraction représente une ou plusieurs parts d’une unité partagée en parts égales.",
      "Le numérateur indique les parts coloriées ; le dénominateur indique le nombre total de parts.",
      "Il y a 3 parts coloriées sur 4 parts égales.",
      "La fraction représentée est 3/4."
    ),
    canvas: fractionCanvas({
      numerator: 3,
      denominator: 4,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "representer", "qcm", "barre", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_representer_qcm_002_cercle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Un disque est partagé en 6 parts égales. On colorie 2 parts. Quelle fraction est représentée ?",
    format: "qcm",
    choices: ["2/6", "6/2", "1/6", "2/2"],
    expected: ["2/6"],
    comparator: "mcq_exact",
    hint: "On écrit parts coloriées / parts totales.",
    explanation: exp(
      "Une fraction peut être représentée avec un disque, une bande ou une grille.",
      "On compte les parts coloriées puis les parts totales.",
      "Il y a 2 parts coloriées sur 6 parts égales.",
      "La fraction représentée est 2/6."
    ),
    canvas: fractionCanvas({
      numerator: 2,
      denominator: 6,
      model: "circle",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "representer", "qcm", "cercle", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_representer_qcm_003_grille",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une grille de 10 cases, 7 cases sont coloriées. Quelle fraction est représentée ?",
    format: "qcm",
    choices: ["7/10", "10/7", "3/10", "7/7"],
    expected: ["7/10"],
    comparator: "mcq_exact",
    hint: "Il y a 7 cases coloriées sur 10 cases au total.",
    explanation: exp(
      "Une grille peut représenter une fraction.",
      "On compte les cases coloriées et le nombre total de cases.",
      "Il y a 7 cases coloriées sur 10.",
      "La fraction représentée est 7/10."
    ),
    canvas: fractionGridCanvas({
      rows: 2,
      cols: 5,
      shaded: 7,
    }),
    tags: ["cm1", "fraction", "representer", "qcm", "grille", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_representer_qcm_004_parts_egales",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_representer",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi les parts doivent-elles être égales pour représenter une fraction ?",
    format: "qcm",
    choices: [
      "parce qu’une fraction partage une unité en parts de même taille",
      "parce que les parts doivent avoir des couleurs différentes",
      "parce qu’il faut toujours 10 parts",
      "parce que le numérateur doit être plus grand",
    ],
    expected: ["parce qu’une fraction partage une unité en parts de même taille"],
    comparator: "mcq_exact",
    hint: "Une fraction correcte utilise des parts égales.",
    explanation: exp(
      "Une fraction repose sur un partage en parts égales.",
      "On doit vérifier que chaque part a la même taille.",
      "Si les parts ne sont pas égales, une part ne représente pas toujours la même quantité.",
      "Les parts doivent donc être égales pour que la fraction soit correcte."
    ),
    canvas: fractionCanvas({
      numerator: 2,
      denominator: 5,
      model: "bar",
      showFraction: false,
      unequalParts: true,
    }),
    tags: ["cm1", "fraction", "representer", "parts_egales", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_fraction_representer_tpl_001_barre_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les parts coloriées puis les parts totales.",
    tags: ["cm1", "fraction", "representer", "template", "barre", "canvas"],
    generate: () => {
      const denominator = randomChoice([4, 5, 6, 8, 10]);
      const numerator = randomInt(1, denominator - 1);
      const correct = `${numerator}/${denominator}`;

      return {
        text: `Une bande est partagée en ${denominator} parts égales. On colorie ${numerator} parts. Quelle fraction est représentée ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${denominator}/${numerator}`,
          `1/${denominator}`,
          `${numerator}/${numerator}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La fraction représentée dépend du nombre de parts coloriées et du nombre total de parts.",
          "On écrit parts coloriées sur parts totales.",
          `${numerator} parts coloriées sur ${denominator} parts égales donnent ${correct}.`,
          `La fraction représentée est ${correct}.`
        ),
        canvas: fractionCanvas({
          numerator,
          denominator,
          model: "bar",
          showFraction: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_representer_tpl_002_cercle_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le nombre du bas est le nombre total de parts égales.",
    tags: ["cm1", "fraction", "representer", "template", "cercle", "canvas"],
    generate: () => {
      const denominator = randomChoice([3, 4, 5, 6, 8]);
      const numerator = randomInt(1, denominator - 1);
      const correct = `${numerator}/${denominator}`;

      return {
        text: `Un disque est partagé en ${denominator} parts égales. ${numerator} parts sont coloriées. Quelle fraction est représentée ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${denominator}/${numerator}`,
          `${numerator}/1`,
          `1/${denominator}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour écrire une fraction représentée, on compte les parts coloriées et les parts totales.",
          "On place les parts coloriées au numérateur et les parts totales au dénominateur.",
          `${numerator} parts coloriées sur ${denominator} parts égales donnent ${correct}.`,
          `La fraction représentée est ${correct}.`
        ),
        canvas: fractionCanvas({
          numerator,
          denominator,
          model: "circle",
          showFraction: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_representer_tpl_003_grille_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    hint: "Écris cases coloriées / cases totales.",
    tags: ["cm1", "fraction", "representer", "template", "grille", "canvas"],
    generate: () => {
      const rows = randomChoice([2, 3]);
      const cols = randomChoice([4, 5]);
      const total = rows * cols;
      const shaded = randomInt(1, total - 1);
      const correct = `${shaded}/${total}`;

      return {
        text: `Une grille contient ${total} cases. ${shaded} cases sont coloriées. Quelle fraction est représentée ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${total}/${shaded}`,
          `1/${total}`,
          `${total - shaded}/${total}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une grille peut représenter une fraction.",
          "On compte les cases coloriées et le nombre total de cases.",
          `${shaded} cases coloriées sur ${total} cases donnent ${correct}.`,
          `La fraction représentée est ${correct}.`
        ),
        canvas: fractionGridCanvas({
          rows,
          cols,
          shaded,
        }),
      };
    },
  },
    // ============================================================
  // FRACTION_UNITE
  // Comprendre l’unité dans une fraction
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_fraction_unite_qcm_001_unite_entiere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Une unité est partagée en 4 parts égales. Quelle fraction représente l’unité entière ?",
    format: "qcm",
    choices: ["4/4", "1/4", "3/4", "4/1"],
    expected: ["4/4"],
    comparator: "mcq_exact",
    hint: "L’unité entière contient toutes les parts.",
    explanation: exp(
      "L’unité est le tout que l’on partage.",
      "Quand toutes les parts de l’unité sont prises, la fraction est égale à 1.",
      "Ici, l’unité contient 4 parts sur 4.",
      "L’unité entière est représentée par 4/4."
    ),
    canvas: fractionCanvas({
      numerator: 4,
      denominator: 4,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "unite", "unite_entiere", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_unite_qcm_002_pizza",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Une pizza entière est coupée en 8 parts égales. Quelle fraction représente toute la pizza ?",
    format: "qcm",
    choices: ["8/8", "1/8", "7/8", "8/1"],
    expected: ["8/8"],
    comparator: "mcq_exact",
    hint: "Toute la pizza, c’est toutes les parts.",
    explanation: exp(
      "Une unité entière correspond au tout.",
      "Si la pizza est coupée en 8 parts, toute la pizza correspond aux 8 parts.",
      "Toute la pizza représente 8 parts sur 8.",
      "La fraction est 8/8."
    ),
    canvas: fractionCanvas({
      numerator: 8,
      denominator: 8,
      model: "circle",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "unite", "pizza", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_unite_qcm_003_egal_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est égale à 1 ?",
    format: "qcm",
    choices: ["6/6", "5/6", "1/6", "6/5"],
    expected: ["6/6"],
    comparator: "mcq_exact",
    hint: "Une fraction est égale à 1 quand le numérateur est égal au dénominateur.",
    explanation: exp(
      "Une fraction peut représenter exactement une unité.",
      "Quand le numérateur et le dénominateur sont égaux, toutes les parts sont prises.",
      "Dans 6/6, on prend 6 parts sur 6.",
      "6/6 est égal à 1."
    ),
    canvas: fractionCanvas({
      numerator: 6,
      denominator: 6,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "unite", "egal_1", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_unite_qcm_004_piege_pas_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_unite",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que 3/4 représente une unité entière. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour représenter l’unité entière, il faut prendre toutes les parts.",
    explanation: exp(
      "Une unité entière est obtenue quand toutes les parts sont prises.",
      "On compare le numérateur et le dénominateur.",
      "Dans 3/4, on prend seulement 3 parts sur 4.",
      "3/4 ne représente pas une unité entière."
    ),
    canvas: fractionCanvas({
      numerator: 3,
      denominator: 4,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "unite", "piege", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_unite_qcm_005_plusieurs_unites",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_unite",
    difficulty: 3,
    theme: "neutral",
    text: "Si une unité est partagée en 5 parts égales, que représente 5/5 ?",
    format: "qcm",
    choices: [
      "une unité entière",
      "une demi-unité",
      "5 unités entières",
      "une part seulement",
    ],
    expected: ["une unité entière"],
    comparator: "mcq_exact",
    hint: "5/5 signifie toutes les 5 parts de l’unité.",
    explanation: exp(
      "Une fraction dont le numérateur est égal au dénominateur représente une unité entière.",
      "On lit 5/5 comme 5 parts prises sur 5 parts au total.",
      "Toutes les parts sont prises.",
      "5/5 représente une unité entière."
    ),
    canvas: fractionCanvas({
      numerator: 5,
      denominator: 5,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "unite", "egal_1", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_fraction_unite_tpl_001_unite_entiere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "L’unité entière correspond à toutes les parts.",
    tags: ["cm1", "fraction", "unite", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([3, 4, 5, 6, 8, 10]);
      const correct = `${denominator}/${denominator}`;

      return {
        text: `Une unité est partagée en ${denominator} parts égales. Quelle fraction représente l’unité entière ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `1/${denominator}`,
          `${denominator - 1}/${denominator}`,
          `${denominator}/1`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "L’unité entière correspond à toutes les parts de l’unité.",
          "Si l’unité est partagée en plusieurs parts, on prend toutes ces parts.",
          `Avec ${denominator} parts égales, l’unité entière est ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
        canvas: fractionCanvas({
          numerator: denominator,
          denominator,
          model: randomChoice(["bar", "circle"] as const),
          showFraction: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_unite_tpl_002_egal_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour être égal à 1, le numérateur et le dénominateur doivent être égaux.",
    tags: ["cm1", "fraction", "unite", "egal_1", "template"],
    generate: () => {
      const denominator = randomChoice([3, 4, 5, 6, 7, 8, 9, 10]);
      const correct = `${denominator}/${denominator}`;

      return {
        text: "Quelle fraction est égale à 1 ?",
        format: "qcm",
        choices: makeChoices(correct, [
          `${denominator - 1}/${denominator}`,
          `1/${denominator}`,
          `${denominator}/${denominator - 1}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction est égale à 1 quand elle représente toute l’unité.",
          "Cela arrive quand le numérateur est égal au dénominateur.",
          `Dans ${correct}, on prend toutes les parts.`,
          `${correct} est égal à 1.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_unite_tpl_003_verifier_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare le numérateur et le dénominateur.",
    tags: ["cm1", "fraction", "unite", "verifier", "template", "qcm"],
    generate: () => {
      const denominator = randomChoice([4, 5, 6, 8, 10]);
      const isUnit = randomChoice([true, false]);
      const numerator = isUnit
        ? denominator
        : randomInt(1, denominator - 1);

      const fraction = `${numerator}/${denominator}`;
      const correct = isUnit ? "oui" : "non";

      return {
        text: `La fraction ${fraction} représente-t-elle une unité entière ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une unité entière est représentée quand toutes les parts sont prises.",
          "On compare le numérateur et le dénominateur.",
          isUnit
            ? `${numerator} est égal à ${denominator}, donc toutes les parts sont prises.`
            : `${numerator} est plus petit que ${denominator}, donc toutes les parts ne sont pas prises.`,
          correct === "oui"
            ? `${fraction} représente une unité entière.`
            : `${fraction} ne représente pas une unité entière.`
        ),
        canvas: fractionCanvas({
          numerator,
          denominator,
          model: "bar",
          showFraction: false,
        }),
      };
    },
  },

  // ============================================================
  // FRACTION_SUPERIEURE_1
  // Reconnaître une fraction supérieure à 1
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_fraction_superieure_1_qcm_001",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_superieure_1",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction est supérieure à 1 ?",
    format: "qcm",
    choices: ["5/4", "3/4", "4/4", "1/4"],
    expected: ["5/4"],
    comparator: "mcq_exact",
    hint: "Une fraction est supérieure à 1 si le numérateur est plus grand que le dénominateur.",
    explanation: exp(
      "Une fraction peut être inférieure, égale ou supérieure à 1.",
      "On compare le numérateur et le dénominateur.",
      "Dans 5/4, le numérateur 5 est plus grand que le dénominateur 4.",
      "La fraction 5/4 est supérieure à 1."
    ),
    tags: ["cm1", "fraction", "superieure_1", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_superieure_1_qcm_002_oui_non",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_superieure_1",
    difficulty: 3,
    theme: "neutral",
    text: "La fraction 7/5 est-elle supérieure à 1 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare 7 et 5.",
    explanation: exp(
      "Une fraction est supérieure à 1 quand elle dépasse une unité entière.",
      "On compare le numérateur au dénominateur.",
      "7 est plus grand que 5, donc 7/5 dépasse 1.",
      "Oui, 7/5 est supérieure à 1."
    ),
    tags: ["cm1", "fraction", "superieure_1", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_superieure_1_qcm_003_piege_egal_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_superieure_1",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que 4/4 est supérieure à 1. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "4/4 représente exactement une unité.",
    explanation: exp(
      "Quand le numérateur est égal au dénominateur, la fraction vaut 1.",
      "On compare 4 et 4.",
      "4/4 représente une unité entière, donc exactement 1.",
      "L’élève n’a pas raison : 4/4 n’est pas supérieure à 1."
    ),
    canvas: fractionCanvas({
      numerator: 4,
      denominator: 4,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "superieure_1", "piege", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_superieure_1_qcm_004_piege_denominateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_superieure_1",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit que 3/8 est supérieure à 1 car 8 est grand. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour être supérieure à 1, il faut plus de parts prises que de parts dans une unité.",
    explanation: exp(
      "Pour comparer une fraction à 1, on regarde le numérateur et le dénominateur.",
      "Une fraction est supérieure à 1 si le numérateur est plus grand que le dénominateur.",
      "Dans 3/8, 3 est plus petit que 8.",
      "3/8 est inférieure à 1, donc l’élève n’a pas raison."
    ),
    canvas: fractionCanvas({
      numerator: 3,
      denominator: 8,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "superieure_1", "piege", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_superieure_1_qcm_005_plusieurs_pizzas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_superieure_1",
    difficulty: 4,
    theme: "neutral",
    text: "On a mangé 9 parts de pizza. Une pizza entière contient 8 parts. Quelle fraction de pizza a été mangée ?",
    format: "qcm",
    choices: ["9/8", "8/9", "1/8", "8/8"],
    expected: ["9/8"],
    comparator: "mcq_exact",
    hint: "On a mangé plus qu’une pizza entière.",
    explanation: exp(
      "Une fraction supérieure à 1 peut représenter plus qu’une unité.",
      "Le dénominateur indique le nombre de parts dans une unité.",
      "Une pizza entière contient 8 parts, mais 9 parts ont été mangées.",
      "La fraction mangée est 9/8."
    ),
    tags: ["cm1", "fraction", "superieure_1", "pizza", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_fraction_superieure_1_tpl_001_reconnaitre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_superieure_1",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare le nombre du haut et le nombre du bas.",
    tags: ["cm1", "fraction", "superieure_1", "template"],
    generate: () => {
      const denominator = randomChoice([3, 4, 5, 6, 8, 10]);
      const numerator = denominator + randomChoice([1, 2, 3]);
      const correct = `${numerator}/${denominator}`;

      return {
        text: "Quelle fraction est supérieure à 1 ?",
        format: "qcm",
        choices: makeChoices(correct, [
          `${denominator - 1}/${denominator}`,
          `${denominator}/${denominator}`,
          `1/${denominator}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction est supérieure à 1 si le numérateur est plus grand que le dénominateur.",
          "On compare le haut et le bas de chaque fraction.",
          `Dans ${correct}, ${numerator} est plus grand que ${denominator}.`,
          `${correct} est supérieure à 1.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_superieure_1_tpl_002_oui_non",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_superieure_1",
    difficulty: 3,
    theme: "neutral",
    hint: "Si le numérateur dépasse le dénominateur, la fraction dépasse 1.",
    tags: ["cm1", "fraction", "superieure_1", "template", "qcm"],
    generate: () => {
      const denominator = randomChoice([3, 4, 5, 6, 8, 10]);
      const type = randomChoice(["inferieure", "egale", "superieure"] as const);

      const numerator =
        type === "inferieure"
          ? randomInt(1, denominator - 1)
          : type === "egale"
            ? denominator
            : denominator + randomChoice([1, 2, 3]);

      const fraction = `${numerator}/${denominator}`;
      const correct = type === "superieure" ? "oui" : "non";

      return {
        text: `La fraction ${fraction} est-elle supérieure à 1 ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction est supérieure à 1 quand elle représente plus qu’une unité.",
          "On compare le numérateur et le dénominateur.",
          `Ici, on compare ${numerator} et ${denominator}.`,
          correct === "oui"
            ? `${fraction} est supérieure à 1.`
            : `${fraction} n’est pas supérieure à 1.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_superieure_1_tpl_003_contexte_parts",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_superieure_1",
    difficulty: 4,
    theme: "neutral",
    hint: "Le dénominateur est le nombre de parts dans une unité.",
    tags: ["cm1", "fraction", "superieure_1", "contexte", "template"],
    generate: () => {
      const partsParUnite = randomChoice([4, 5, 6, 8]);
      const partsMangees = partsParUnite + randomChoice([1, 2, 3]);
      const correct = `${partsMangees}/${partsParUnite}`;

      return {
        text: `Un gâteau entier contient ${partsParUnite} parts égales. On mange ${partsMangees} parts. Quelle fraction de gâteau a été mangée ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${partsParUnite}/${partsMangees}`,
          `${partsMangees - partsParUnite}/${partsParUnite}`,
          `${partsParUnite}/${partsParUnite}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction supérieure à 1 peut apparaître quand on dépasse une unité entière.",
          "Le dénominateur indique le nombre de parts dans une unité.",
          `Ici, une unité contient ${partsParUnite} parts et ${partsMangees} parts sont prises.`,
          `La fraction est ${correct}.`
        ),
      };
    },
  },
    // ============================================================
  // FRACTION_DROITE
  // Placer une fraction sur une droite graduée
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_fraction_droite_qcm_001_position_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une droite de 0 à 1 partagée en 4 parts égales, le point est au 3e trait après 0. Quelle fraction représente-t-il ?",
    format: "qcm",
    choices: ["3/4", "1/4", "4/3", "3/3"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Le dénominateur indique le nombre de parts entre 0 et 1.",
    explanation: exp(
      "Une fraction peut représenter une position sur une droite graduée.",
      "On compte le nombre de parts égales entre 0 et 1, puis le nombre de traits parcourus depuis 0.",
      "La droite est partagée en 4 parts égales et le point est au 3e trait.",
      "La fraction représentée est 3/4."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 4,
      numerator: 3,
      label: "?",
    }),
    tags: ["cm1", "fraction", "droite", "position", "qcm", "canvas"],
  },
    {
    kind: "fixed",
    id: "cm1_fraction_droite_qcm_002_demi",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une droite de 0 à 1 partagée en 2 parts égales, le point placé au milieu correspond à quelle fraction ?",
    format: "qcm",
    choices: ["1/2", "2/1", "1/1", "2/2"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "Le milieu entre 0 et 1 correspond à une moitié.",
    explanation: exp(
      "Sur une droite graduée, une fraction peut indiquer une position.",
      "Le dénominateur indique en combien de parts égales l’unité est partagée.",
      "Ici, l’unité est partagée en 2 parts égales et le point est à 1 part après 0.",
      "La fraction représentée est 1/2."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 2,
      numerator: 1,
      label: "?",
    }),
    tags: ["cm1", "fraction", "droite", "demi", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_droite_qcm_003_cinquiemes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une droite de 0 à 1 partagée en 5 parts égales, le point est au 2e trait après 0. Quelle fraction représente-t-il ?",
    format: "qcm",
    choices: ["2/5", "5/2", "1/5", "2/2"],
    expected: ["2/5"],
    comparator: "mcq_exact",
    hint: "Le point est au 2e trait sur 5 parts égales.",
    explanation: exp(
      "Le dénominateur indique le nombre de parts égales entre 0 et 1.",
      "Le numérateur indique combien de parts on avance depuis 0.",
      "Le point est au 2e trait sur 5 parts.",
      "La fraction représentée est 2/5."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 5,
      numerator: 2,
      label: "?",
    }),
    tags: ["cm1", "fraction", "droite", "cinquiemes", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_droite_qcm_004_numero_trait",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une droite de 0 à 1 partagée en 8 parts égales, à quel trait après 0 se place 3/8 ?",
    format: "qcm",
    choices: ["3e trait", "8e trait", "5e trait", "1er trait"],
    expected: ["3e trait"],
    comparator: "mcq_exact",
    hint: "Dans 3/8, le numérateur est 3.",
    explanation: exp(
      "Sur une droite graduée, le numérateur indique combien de parts on avance.",
      "Le dénominateur indique le nombre de parts entre 0 et 1.",
      "3/8 signifie 3 parts sur 8.",
      "Le point se place au 3e trait après 0."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 8,
      numerator: 3,
      label: "?",
    }),
    tags: ["cm1", "fraction", "droite", "trait", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_droite_qcm_005_piege_trait",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 3,
    theme: "neutral",
    text: "Une droite de 0 à 1 est partagée en 8 parts égales. Un élève place 3/8 au 4e trait après 0. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "3/8 se place au 3e trait après 0.",
    explanation: exp(
      "Pour placer une fraction sur une droite, on utilise le numérateur.",
      "Le numérateur indique le nombre de traits à compter après 0.",
      "3/8 se place au 3e trait après 0, pas au 4e.",
      "L’élève n’a pas raison."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 8,
      numerator: 3,
      label: "?",
    }),
    tags: ["cm1", "fraction", "droite", "piege", "trait", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_droite_qcm_006_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une droite de 0 à 1 partagée en 6 parts égales, quelle fraction correspond au point 1 ?",
    format: "qcm",
    choices: ["6/6", "1/6", "5/6", "6/1"],
    expected: ["6/6"],
    comparator: "mcq_exact",
    hint: "Le point 1 correspond à toute l’unité.",
    explanation: exp(
      "Le point 1 représente une unité entière.",
      "Si l’unité est partagée en 6 parts égales, toute l’unité correspond à 6 parts sur 6.",
      "On écrit donc 6/6.",
      "Le point 1 correspond à 6/6."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 6,
      numerator: 6,
      label: "1",
    }),
    tags: ["cm1", "fraction", "droite", "unite", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_droite_open_001_expliquer_trait",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 3/8 se place au 3e trait après 0 sur une droite partagée en 8 parts égales.",
    format: "open",
    expected: ["3", "8", "trait", "parts", "0"],
    comparator: "contains_keyword",
    hint: "Le numérateur indique combien de parts on avance depuis 0.",
    explanation: exp(
      "Sur une droite graduée, une fraction indique une position.",
      "Le dénominateur indique le nombre de parts égales entre 0 et 1, et le numérateur indique combien de parts on avance depuis 0.",
      "Dans 3/8, l’unité est partagée en 8 parts égales et on avance de 3 parts.",
      "Donc 3/8 se place au 3e trait après 0."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 8,
      numerator: 3,
      label: "?",
    }),
    tags: ["cm1", "fraction", "droite", "open", "expliquer", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_droite_open_002_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi le point 1 correspond à 5/5 sur une droite partagée en 5 parts égales.",
    format: "open",
    expected: ["1", "5", "5/5", "unité", "parts"],
    comparator: "contains_keyword",
    hint: "Le point 1 représente toute l’unité.",
    explanation: exp(
      "Le point 1 représente une unité entière.",
      "Si l’unité est partagée en 5 parts égales, il faut avancer de 5 parts pour atteindre 1.",
      "On a donc 5 parts sur 5.",
      "Le point 1 correspond à 5/5."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 5,
      numerator: 5,
      label: "1",
    }),
    tags: ["cm1", "fraction", "droite", "open", "unite", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_fraction_droite_tpl_001_identifier_fraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 2,
    theme: "neutral",
    hint: "Le nombre du bas indique le nombre de parts entre 0 et 1.",
    tags: ["cm1", "fraction", "droite", "identifier", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([4, 5, 6, 8, 10]);
      const numerator = randomInt(1, denominator - 1);
      const correct = `${numerator}/${denominator}`;

      return {
        text: `Une droite de 0 à 1 est partagée en ${denominator} parts égales. Le point est au ${numerator}e trait après 0. Quelle fraction représente-t-il ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${denominator}/${numerator}`,
          `1/${denominator}`,
          `${numerator}/${numerator}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction peut représenter une position sur une droite graduée.",
          "On compte les parts égales entre 0 et 1, puis les traits depuis 0.",
          `Le point est au ${numerator}e trait sur ${denominator} parts égales.`,
          `La fraction représentée est ${correct}.`
        ),
        canvas: droiteGradueeFractionCanvas({
          denominator,
          numerator,
          label: "?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_droite_tpl_002_numero_trait",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 2,
    theme: "neutral",
    hint: "Le numérateur indique le numéro du trait après 0.",
    tags: ["cm1", "fraction", "droite", "numero_trait", "template", "qcm", "canvas"],
    generate: () => {
      const denominator = randomChoice([4, 5, 6, 8, 10]);
      const numerator = randomInt(1, denominator - 1);
      const correct = `${numerator}e trait`;

      return {
        text: `Sur une droite de 0 à 1 partagée en ${denominator} parts égales, à quel trait après 0 se place ${numerator}/${denominator} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${denominator}e trait`,
          "1er trait",
          `${Math.max(1, denominator - numerator)}e trait`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur une droite graduée, le numérateur indique combien de parts on avance depuis 0.",
          "On lit la fraction et on repère le nombre du haut.",
          `${numerator}/${denominator} signifie ${numerator} parts sur ${denominator}.`,
          `Le point se place au ${numerator}e trait après 0.`
        ),
        canvas: droiteGradueeFractionCanvas({
          denominator,
          numerator,
          label: "?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_droite_tpl_003_verifier_position",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie le numérateur : c’est le nombre de traits après 0.",
    tags: ["cm1", "fraction", "droite", "verifier", "template", "qcm", "canvas"],
    generate: () => {
      const denominator = randomChoice([5, 6, 8, 10]);
      const numerator = randomInt(2, denominator - 2);
      const wrongTrait = numerator + randomChoice([-1, 1]);

      return {
        text: `Une droite de 0 à 1 est partagée en ${denominator} parts égales. Un élève place ${numerator}/${denominator} au ${wrongTrait}e trait après 0. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour placer une fraction sur une droite, on compte les traits depuis 0.",
          "Le numérateur indique le bon numéro du trait.",
          `${numerator}/${denominator} se place au ${numerator}e trait, pas au ${wrongTrait}e.`,
          "L’élève n’a pas raison."
        ),
        canvas: droiteGradueeFractionCanvas({
          denominator,
          numerator,
          label: "?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_droite_tpl_004_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_droite",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point 1 représente toute l’unité.",
    tags: ["cm1", "fraction", "droite", "unite", "template", "qcm", "canvas"],
    generate: () => {
      const denominator = randomChoice([3, 4, 5, 6, 8, 10]);
      const correct = `${denominator}/${denominator}`;

      return {
        text: `Sur une droite de 0 à 1 partagée en ${denominator} parts égales, quelle fraction correspond au point 1 ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `1/${denominator}`,
          `${denominator - 1}/${denominator}`,
          `${denominator}/1`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le point 1 représente une unité entière.",
          "Si l’unité est découpée en plusieurs parts, il faut toutes les parts pour atteindre 1.",
          `Avec ${denominator} parts égales, le point 1 correspond à ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
        canvas: droiteGradueeFractionCanvas({
          denominator,
          numerator: denominator,
          label: "1",
        }),
      };
    },
  },
    // ============================================================
  // FRACTION_COMPARER
  // Comparer des fractions simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_fraction_comparer_qcm_001_meme_denominateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est la plus grande ?",
    format: "qcm",
    choices: ["5/8", "3/8", "1/8", "2/8"],
    expected: ["5/8"],
    comparator: "mcq_exact",
    hint: "Les fractions ont le même dénominateur : compare les numérateurs.",
    explanation: exp(
      "Quand deux fractions ont le même dénominateur, les parts ont la même taille.",
      "On compare alors les numérateurs.",
      "5 est plus grand que 3, 2 et 1.",
      "La plus grande fraction est 5/8."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 5, denominator: 8, label: "?" },
      b: { numerator: 3, denominator: 8, label: "?" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "comparer", "meme_denominateur", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_comparer_qcm_002_signe",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 2/5 ... 4/5",
    format: "qcm",
    choices: ["<", ">", "="],
    expected: ["<"],
    comparator: "mcq_exact",
    hint: "Les deux fractions ont le même dénominateur.",
    explanation: exp(
      "Comparer deux fractions de même dénominateur revient à comparer les numérateurs.",
      "Les cinquièmes ont la même taille.",
      "2 est plus petit que 4, donc 2/5 est plus petit que 4/5.",
      "On écrit 2/5 < 4/5."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 2, denominator: 5, label: "2/5" },
      b: { numerator: 4, denominator: 5, label: "4/5" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "comparer", "signe", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_comparer_qcm_003_meme_numerateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction est la plus grande ?",
    format: "qcm",
    choices: ["1/3", "1/6", "1/8", "1/10"],
    expected: ["1/3"],
    comparator: "mcq_exact",
    hint: "Quand le numérateur est 1, plus le dénominateur est petit, plus la part est grande.",
    explanation: exp(
      "Quand on compare des fractions comme 1/3 et 1/6, on compare la taille des parts.",
      "Plus on partage l’unité en beaucoup de parts, plus chaque part est petite.",
      "Un tiers est plus grand qu’un sixième, un huitième et un dixième.",
      "La plus grande fraction est 1/3."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 1, denominator: 3, label: "1/3" },
      b: { numerator: 1, denominator: 6, label: "1/6" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "comparer", "meme_numerateur", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_comparer_qcm_004_comparer_a_un",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction est égale à 1 ?",
    format: "qcm",
    choices: ["4/4", "3/4", "5/4", "1/4"],
    expected: ["4/4"],
    comparator: "mcq_exact",
    hint: "Une fraction est égale à 1 quand le numérateur est égal au dénominateur.",
    explanation: exp(
      "Une fraction peut être comparée à 1.",
      "Quand le numérateur est égal au dénominateur, toutes les parts de l’unité sont prises.",
      "4/4 représente 4 parts sur 4.",
      "4/4 est égal à 1."
    ),
    canvas: fractionCanvas({
      numerator: 4,
      denominator: 4,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "comparer", "unite", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_comparer_qcm_005_piege_denominateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que 1/8 est plus grand que 1/4 car 8 est plus grand que 4. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Quand on partage en plus de parts, chaque part est plus petite.",
    explanation: exp(
      "Pour des fractions de numérateur 1, le dénominateur indique en combien de parts l’unité est partagée.",
      "Plus on partage l’unité en beaucoup de parts, plus chaque part est petite.",
      "1/8 est plus petit que 1/4.",
      "L’élève n’a pas raison."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 1, denominator: 8, label: "1/8" },
      b: { numerator: 1, denominator: 4, label: "1/4" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "comparer", "piege", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_comparer_qcm_006_inf_egal_sup_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "La fraction 6/5 est-elle inférieure, égale ou supérieure à 1 ?",
    format: "qcm",
    choices: ["inférieure à 1", "égale à 1", "supérieure à 1"],
    expected: ["supérieure à 1"],
    comparator: "mcq_exact",
    hint: "Compare le numérateur et le dénominateur.",
    explanation: exp(
      "Pour comparer une fraction à 1, on compare le numérateur et le dénominateur.",
      "Si le numérateur est plus grand que le dénominateur, la fraction est supérieure à 1.",
      "Dans 6/5, 6 est plus grand que 5.",
      "6/5 est supérieure à 1."
    ),
    tags: ["cm1", "fraction", "comparer", "superieure_1", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_comparer_open_001_meme_denominateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 5/8 est plus grand que 3/8.",
    format: "open",
    expected: ["même", "dénominateur", "8", "5", "3"],
    comparator: "contains_keyword",
    hint: "Les deux fractions ont le même dénominateur.",
    explanation: exp(
      "Quand deux fractions ont le même dénominateur, les parts ont la même taille.",
      "On compare alors les numérateurs.",
      "5 est plus grand que 3, donc 5 parts de huitièmes représentent plus que 3 parts de huitièmes.",
      "Donc 5/8 est plus grand que 3/8."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 5, denominator: 8, label: "5/8" },
      b: { numerator: 3, denominator: 8, label: "3/8" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "comparer", "open", "meme_denominateur", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_comparer_open_002_meme_numerateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 1/4 est plus grand que 1/8.",
    format: "open",
    expected: ["4", "8", "parts", "plus", "grand"],
    comparator: "contains_keyword",
    hint: "Quand on partage en 4 parts, chaque part est plus grande que lorsqu’on partage en 8 parts.",
    explanation: exp(
      "Quand le numérateur est le même, on compare la taille des parts.",
      "Plus le dénominateur est grand, plus les parts sont petites.",
      "Un quart est une part plus grande qu’un huitième.",
      "Donc 1/4 est plus grand que 1/8."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 1, denominator: 4, label: "1/4" },
      b: { numerator: 1, denominator: 8, label: "1/8" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "comparer", "open", "meme_numerateur", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_fraction_comparer_tpl_001_meme_denominateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le dénominateur est le même : compare les numérateurs.",
    tags: ["cm1", "fraction", "comparer", "meme_denominateur", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([4, 5, 6, 8, 10]);
      const a = randomInt(1, denominator - 2);
      const b = randomInt(a + 1, denominator - 1);
      const correct = `${b}/${denominator}`;

      return {
        text: `Quelle fraction est la plus grande : ${a}/${denominator} ou ${b}/${denominator} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${a}/${denominator}`,
          "elles sont égales",
          `${denominator}/${b}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand deux fractions ont le même dénominateur, les parts ont la même taille.",
          "On compare donc les numérateurs.",
          `${b} est plus grand que ${a}.`,
          `La plus grande fraction est ${correct}.`
        ),
        canvas: fractionCompareCanvas({
          a: { numerator: a, denominator, label: `${a}/${denominator}` },
          b: { numerator: b, denominator, label: `${b}/${denominator}` },
          showFraction: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_comparer_tpl_002_signe_meme_denominateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Les fractions ont le même dénominateur.",
    tags: ["cm1", "fraction", "comparer", "signe", "template"],
    generate: () => {
      const denominator = randomChoice([4, 5, 6, 8, 10]);
      const a = randomInt(1, denominator - 1);
      let b = randomInt(1, denominator - 1);

      while (b === a) {
        b = randomInt(1, denominator - 1);
      }

      const correct = a < b ? "<" : ">";

      return {
        text: `Complète : ${a}/${denominator} ... ${b}/${denominator}`,
        format: "qcm",
        choices: ["<", ">", "="],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand deux fractions ont le même dénominateur, on compare les numérateurs.",
          "Les parts ont la même taille.",
          `${a} ${correct} ${b}.`,
          `Donc ${a}/${denominator} ${correct} ${b}/${denominator}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_comparer_tpl_003_meme_numerateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Avec le même numérateur, la fraction avec le plus petit dénominateur est la plus grande.",
    tags: ["cm1", "fraction", "comparer", "meme_numerateur", "template", "canvas"],
    generate: () => {
      const numerator = 1;
      const smallDenominator = randomChoice([3, 4, 5]);
      const bigDenominator = randomChoice([6, 8, 10, 12]);
      const correct = `${numerator}/${smallDenominator}`;

      return {
        text: `Quelle fraction est la plus grande : ${numerator}/${smallDenominator} ou ${numerator}/${bigDenominator} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${numerator}/${bigDenominator}`,
          "elles sont égales",
          `${bigDenominator}/${numerator}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand le numérateur est le même, on compare la taille des parts.",
          "Plus le dénominateur est petit, plus chaque part est grande.",
          `Une part sur ${smallDenominator} est plus grande qu’une part sur ${bigDenominator}.`,
          `La plus grande fraction est ${correct}.`
        ),
        canvas: fractionCompareCanvas({
          a: { numerator, denominator: smallDenominator, label: `${numerator}/${smallDenominator}` },
          b: { numerator, denominator: bigDenominator, label: `${numerator}/${bigDenominator}` },
          showFraction: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_comparer_tpl_004_comparer_a_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare le numérateur et le dénominateur.",
    tags: ["cm1", "fraction", "comparer", "unite", "template"],
    generate: () => {
      const denominator = randomChoice([3, 4, 5, 6, 8]);
      const type = randomChoice(["inferieure", "egale", "superieure"] as const);

      const numerator =
        type === "inferieure"
          ? randomInt(1, denominator - 1)
          : type === "egale"
            ? denominator
            : denominator + randomChoice([1, 2, 3]);

      const fraction = `${numerator}/${denominator}`;

      const correct =
        type === "inferieure"
          ? "inférieure à 1"
          : type === "egale"
            ? "égale à 1"
            : "supérieure à 1";

      return {
        text: `La fraction ${fraction} est-elle inférieure, égale ou supérieure à 1 ?`,
        format: "qcm",
        choices: ["inférieure à 1", "égale à 1", "supérieure à 1"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer une fraction à 1, on compare le numérateur et le dénominateur.",
          "Si le numérateur est plus petit, la fraction est inférieure à 1 ; s’il est égal, elle vaut 1 ; s’il est plus grand, elle est supérieure à 1.",
          `Ici, on compare ${numerator} et ${denominator}.`,
          `${fraction} est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_comparer_tpl_005_piege_denominateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Un grand dénominateur signifie des parts plus petites.",
    tags: ["cm1", "fraction", "comparer", "piege", "template", "qcm"],
    generate: () => {
      const smallDenominator = randomChoice([3, 4, 5]);
      const bigDenominator = randomChoice([8, 10, 12]);
      const correct = "non";

      return {
        text: `Un élève dit que 1/${bigDenominator} est plus grand que 1/${smallDenominator} car ${bigDenominator} est plus grand que ${smallDenominator}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand le numérateur est 1, le dénominateur indique en combien de parts l’unité est coupée.",
          "Plus il y a de parts, plus chaque part est petite.",
          `1/${bigDenominator} est plus petit que 1/${smallDenominator}.`,
          "L’élève n’a pas raison."
        ),
      };
    },
  },
    // ============================================================
  // FRACTION_EQUIVALENTE
  // Reconnaître des fractions équivalentes simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_fraction_equivalente_qcm_001_moitie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_equivalente",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction est équivalente à 1/2 ?",
    format: "qcm",
    choices: ["2/4", "1/4", "3/4", "2/3"],
    expected: ["2/4"],
    comparator: "mcq_exact",
    hint: "Deux quarts représentent la moitié de l’unité.",
    explanation: exp(
      "Deux fractions sont équivalentes si elles représentent la même quantité.",
      "On peut utiliser un dessin ou chercher une fraction qui représente la même part.",
      "1/2 représente une moitié. 2/4 représente aussi une moitié.",
      "La fraction équivalente à 1/2 est 2/4."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 1, denominator: 2, label: "1/2" },
      b: { numerator: 2, denominator: 4, label: "?" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "equivalente", "moitie", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_equivalente_qcm_002_tiers",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_equivalente",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction est équivalente à 1/3 ?",
    format: "qcm",
    choices: ["2/6", "1/6", "3/6", "2/3"],
    expected: ["2/6"],
    comparator: "mcq_exact",
    hint: "Si on découpe chaque tiers en 2, on obtient 2 parts sur 6.",
    explanation: exp(
      "Des fractions équivalentes représentent la même part de l’unité.",
      "On peut multiplier le numérateur et le dénominateur par le même nombre.",
      "1 × 2 = 2 et 3 × 2 = 6.",
      "1/3 est équivalente à 2/6."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 1, denominator: 3, label: "1/3" },
      b: { numerator: 2, denominator: 6, label: "?" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "equivalente", "tiers", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_equivalente_qcm_003_oui_non",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_equivalente",
    difficulty: 3,
    theme: "neutral",
    text: "Les fractions 3/6 et 1/2 sont-elles équivalentes ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "3 parts sur 6, c’est la moitié.",
    explanation: exp(
      "Deux fractions équivalentes représentent la même quantité.",
      "On compare les parts représentées.",
      "3/6 représente 3 parts sur 6, donc la moitié de l’unité.",
      "Oui, 3/6 est équivalente à 1/2."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 3, denominator: 6, label: "3/6" },
      b: { numerator: 1, denominator: 2, label: "1/2" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "equivalente", "oui_non", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_equivalente_qcm_004_piege_meme_numerateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_equivalente",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit que 1/3 et 1/4 sont équivalentes car elles ont le même numérateur. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le dénominateur change la taille des parts.",
    explanation: exp(
      "Avoir le même numérateur ne suffit pas pour que deux fractions soient équivalentes.",
      "Il faut regarder la quantité représentée.",
      "1/3 représente une part plus grande que 1/4.",
      "L’élève n’a pas raison."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 1, denominator: 3, label: "1/3" },
      b: { numerator: 1, denominator: 4, label: "1/4" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "equivalente", "piege", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_equivalente_qcm_005_piege_ajouter",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_equivalente",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit que 1/2 est équivalente à 2/3 parce qu’il a ajouté 1 en haut et en bas. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour obtenir une fraction équivalente, on multiplie ou on divise en haut et en bas par le même nombre.",
    explanation: exp(
      "Pour construire une fraction équivalente, on multiplie ou on divise le numérateur et le dénominateur par le même nombre.",
      "Ajouter le même nombre en haut et en bas ne conserve pas toujours la même quantité.",
      "1/2 représente une moitié, mais 2/3 représente plus qu’une moitié.",
      "L’élève n’a pas raison."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 1, denominator: 2, label: "1/2" },
      b: { numerator: 2, denominator: 3, label: "2/3" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "equivalente", "erreur", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_equivalente_qcm_006_grille",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_equivalente",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une grille de 10 cases, 5 cases sont coloriées. Quelle fraction équivalente simple peut-on reconnaître ?",
    format: "qcm",
    choices: ["1/2", "1/5", "5/5", "2/10"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "5 cases sur 10, c’est la moitié.",
    explanation: exp(
      "Une fraction peut parfois être simplifiée mentalement.",
      "On observe la quantité représentée.",
      "5 cases coloriées sur 10 représentent la moitié de la grille.",
      "5/10 est équivalente à 1/2."
    ),
    canvas: fractionGridCanvas({
      rows: 2,
      cols: 5,
      shaded: 5,
    }),
    tags: ["cm1", "fraction", "equivalente", "grille", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_equivalente_open_001_moitie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_equivalente",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 2/4 est équivalente à 1/2.",
    format: "open",
    expected: ["2", "4", "moitié", "même", "équivalente"],
    comparator: "contains_keyword",
    hint: "Deux parts sur quatre représentent la moitié.",
    explanation: exp(
      "Deux fractions sont équivalentes si elles représentent la même quantité.",
      "On peut comparer les parts représentées.",
      "2/4 signifie 2 parts sur 4, donc la moitié de l’unité.",
      "Donc 2/4 est équivalente à 1/2."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 2, denominator: 4, label: "2/4" },
      b: { numerator: 1, denominator: 2, label: "1/2" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "equivalente", "open", "moitie", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_equivalente_open_002_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_equivalente",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment obtenir une fraction équivalente à 2/3.",
    format: "open",
    expected: ["multiplier", "numérateur", "dénominateur", "même", "nombre"],
    comparator: "contains_keyword",
    hint: "On peut multiplier le haut et le bas par le même nombre.",
    explanation: exp(
      "Pour obtenir une fraction équivalente, on transforme le numérateur et le dénominateur de la même façon.",
      "On peut multiplier le numérateur et le dénominateur par le même nombre.",
      "Par exemple, 2 × 2 = 4 et 3 × 2 = 6.",
      "Une fraction équivalente à 2/3 est 4/6."
    ),
    tags: ["cm1", "fraction", "equivalente", "open", "methode"],
  },

  {
    kind: "template",
    id: "cm1_fraction_equivalente_tpl_001_moitie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_equivalente",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche une fraction qui représente la moitié.",
    tags: ["cm1", "fraction", "equivalente", "moitie", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([4, 6, 8, 10, 12]);
      const numerator = denominator / 2;
      const correct = `${numerator}/${denominator}`;

      return {
        text: "Quelle fraction est équivalente à 1/2 ?",
        format: "qcm",
        choices: makeChoices(correct, [
          `1/${denominator}`,
          `${numerator - 1}/${denominator}`,
          `${numerator}/${denominator - 1}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction équivalente à 1/2 représente la moitié de l’unité.",
          "On cherche une fraction où le numérateur est la moitié du dénominateur.",
          `${numerator} est la moitié de ${denominator}.`,
          `${correct} est équivalente à 1/2.`
        ),
        canvas: fractionCompareCanvas({
          a: { numerator: 1, denominator: 2, label: "1/2" },
          b: { numerator, denominator, label: "?" },
          showFraction: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_equivalente_tpl_002_multiplier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_equivalente",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplie le numérateur et le dénominateur par le même nombre.",
    tags: ["cm1", "fraction", "equivalente", "multiplier", "template"],
    generate: () => {
      const base = randomChoice([
        { n: 1, d: 2 },
        { n: 1, d: 3 },
        { n: 2, d: 3 },
        { n: 1, d: 4 },
      ]);

      const factor = randomChoice([2, 3]);
      const correct = `${base.n * factor}/${base.d * factor}`;
      const original = `${base.n}/${base.d}`;

      return {
        text: `Quelle fraction est équivalente à ${original} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${base.n + factor}/${base.d + factor}`,
          `${base.n}/${base.d * factor}`,
          `${base.n * factor}/${base.d}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour obtenir une fraction équivalente, on multiplie le numérateur et le dénominateur par le même nombre.",
          "On applique la même transformation en haut et en bas.",
          `${base.n} × ${factor} = ${base.n * factor} et ${base.d} × ${factor} = ${base.d * factor}.`,
          `${original} est équivalente à ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_equivalente_tpl_003_verifier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_equivalente",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde si les deux fractions représentent la même quantité.",
    tags: ["cm1", "fraction", "equivalente", "verifier", "template", "qcm"],
    generate: () => {
      const pairs = [
        { a: "1/2", b: "2/4", correct: "oui" },
        { a: "1/3", b: "2/6", correct: "oui" },
        { a: "2/3", b: "4/6", correct: "oui" },
        { a: "1/4", b: "2/8", correct: "oui" },
        { a: "1/2", b: "3/4", correct: "non" },
        { a: "1/3", b: "1/4", correct: "non" },
        { a: "2/5", b: "3/6", correct: "non" },
      ];

      const item = randomChoice(pairs);

      return {
        text: `Les fractions ${item.a} et ${item.b} sont-elles équivalentes ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux fractions sont équivalentes si elles représentent la même quantité.",
          "On peut les comparer avec un dessin ou une transformation.",
          item.correct === "oui"
            ? `${item.a} et ${item.b} représentent la même part de l’unité.`
            : `${item.a} et ${item.b} ne représentent pas la même part de l’unité.`,
          `La bonne réponse est ${item.correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_equivalente_tpl_004_grille",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_equivalente",
    difficulty: 4,
    theme: "neutral",
    hint: "Observe la part coloriée de la grille.",
    tags: ["cm1", "fraction", "equivalente", "grille", "template", "canvas"],
    generate: () => {
      const options = [
        { rows: 2, cols: 4, shaded: 4, correct: "1/2", represented: "4/8" },
        { rows: 2, cols: 5, shaded: 5, correct: "1/2", represented: "5/10" },
        { rows: 3, cols: 4, shaded: 3, correct: "1/4", represented: "3/12" },
        { rows: 3, cols: 4, shaded: 6, correct: "1/2", represented: "6/12" },
      ];

      const item = randomChoice(options);

      return {
        text: `Une grille représente ${item.represented}. Quelle fraction simple équivalente peut-on reconnaître ?`,
        format: "qcm",
        choices: makeChoices(item.correct, ["1/3", "3/4", "2/3"]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une grille permet de visualiser des fractions équivalentes.",
          "On observe la part totale coloriée.",
          `${item.represented} représente la même quantité que ${item.correct}.`,
          `La fraction équivalente simple est ${item.correct}.`
        ),
        canvas: fractionGridCanvas({
          rows: item.rows,
          cols: item.cols,
          shaded: item.shaded,
        }),
      };
    },
  },
    // ============================================================
  // FRACTION_DECIMALE
  // Reconnaître une fraction décimale
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_fraction_decimale_qcm_001_dixieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_decimale",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est une fraction décimale ?",
    format: "qcm",
    choices: ["7/10", "3/4", "5/6", "2/3"],
    expected: ["7/10"],
    comparator: "mcq_exact",
    hint: "Une fraction décimale a un dénominateur 10, 100 ou 1 000.",
    explanation: exp(
      "Une fraction décimale est une fraction dont le dénominateur est 10, 100, 1 000...",
      "On observe le nombre sous la barre de fraction.",
      "Dans 7/10, le dénominateur est 10.",
      "7/10 est une fraction décimale."
    ),
    canvas: fractionCanvas({
      numerator: 7,
      denominator: 10,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "decimale", "dixieme", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_decimale_qcm_002_centieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_decimale",
    difficulty: 2,
    theme: "neutral",
    text: "La fraction 23/100 est-elle une fraction décimale ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Regarde le dénominateur.",
    explanation: exp(
      "Une fraction décimale a pour dénominateur 10, 100, 1 000...",
      "On regarde le nombre sous la barre.",
      "Dans 23/100, le dénominateur est 100.",
      "Oui, 23/100 est une fraction décimale."
    ),
    tags: ["cm1", "fraction", "decimale", "centieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_decimale_qcm_003_millieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_decimale",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction a un dénominateur égal à 1 000 ?",
    format: "qcm",
    choices: ["42/1000", "42/100", "42/10", "42/4"],
    expected: ["42/1000"],
    comparator: "mcq_exact",
    hint: "Cherche la fraction dont le nombre du bas est 1 000.",
    explanation: exp(
      "Une fraction décimale peut avoir pour dénominateur 1 000.",
      "On regarde le nombre placé sous la barre de fraction.",
      "Dans 42/1000, le dénominateur est 1 000.",
      "La bonne réponse est 42/1000."
    ),
    tags: ["cm1", "fraction", "decimale", "millieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_decimale_qcm_004_piege_numerateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_decimale",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que 10/3 est une fraction décimale car il y a 10 dans la fraction. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour reconnaître une fraction décimale, regarde le dénominateur.",
    explanation: exp(
      "Pour reconnaître une fraction décimale, on regarde le dénominateur.",
      "Le dénominateur doit être 10, 100, 1 000...",
      "Dans 10/3, le dénominateur est 3.",
      "10/3 n’est pas une fraction décimale."
    ),
    tags: ["cm1", "fraction", "decimale", "piege", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_decimale_qcm_005_piege_100",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_decimale",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction n’est pas une fraction décimale ?",
    format: "qcm",
    choices: ["3/4", "7/10", "23/100", "105/1000"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Cherche celle dont le dénominateur n’est pas 10, 100 ou 1 000.",
    explanation: exp(
      "Une fraction décimale a un dénominateur égal à 10, 100, 1 000...",
      "On regarde les dénominateurs proposés.",
      "3/4 a pour dénominateur 4.",
      "3/4 n’est pas une fraction décimale."
    ),
    tags: ["cm1", "fraction", "decimale", "non_decimale", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_decimale_qcm_006_lien_decimal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_decimale",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction correspond à 0,7 ?",
    format: "qcm",
    choices: ["7/10", "7/100", "10/7", "1/7"],
    expected: ["7/10"],
    comparator: "mcq_exact",
    hint: "0,7 signifie 7 dixièmes.",
    explanation: exp(
      "Un nombre décimal peut s’écrire avec une fraction décimale.",
      "Le chiffre après la virgule indique des dixièmes.",
      "0,7 signifie 7 dixièmes.",
      "Donc 0,7 = 7/10."
    ),
    canvas: fractionCanvas({
      numerator: 7,
      denominator: 10,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "decimale", "nombre_decimal", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_decimale_open_001_definition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_decimale",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 37/100 est une fraction décimale.",
    format: "open",
    expected: ["100", "dénominateur", "fraction", "décimale"],
    comparator: "contains_keyword",
    hint: "Regarde le nombre sous la barre de fraction.",
    explanation: exp(
      "Une fraction décimale est une fraction dont le dénominateur est 10, 100, 1 000...",
      "On observe le dénominateur.",
      "Dans 37/100, le dénominateur est 100.",
      "Donc 37/100 est une fraction décimale."
    ),
    tags: ["cm1", "fraction", "decimale", "open", "definition"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_decimale_open_002_piege",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_decimale",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 100/7 n’est pas une fraction décimale.",
    format: "open",
    expected: ["7", "dénominateur", "pas", "10", "100"],
    comparator: "contains_keyword",
    hint: "Ce n’est pas le numérateur qui compte, mais le dénominateur.",
    explanation: exp(
      "Pour reconnaître une fraction décimale, on regarde le dénominateur.",
      "Le dénominateur doit être 10, 100, 1 000...",
      "Dans 100/7, le dénominateur est 7.",
      "Donc 100/7 n’est pas une fraction décimale."
    ),
    tags: ["cm1", "fraction", "decimale", "open", "piege"],
  },

  {
    kind: "template",
    id: "cm1_fraction_decimale_tpl_001_reconnaitre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_decimale",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde le nombre du bas.",
    tags: ["cm1", "fraction", "decimale", "reconnaitre", "template"],
    generate: () => {
      const decimalDenominator = randomChoice([10, 100, 1000]);
      const numerator = randomInt(1, 99);
      const correct = `${numerator}/${decimalDenominator}`;

      return {
        text: "Quelle fraction est une fraction décimale ?",
        format: "qcm",
        choices: makeChoices(correct, [
          `${randomInt(1, 9)}/3`,
          `${randomInt(1, 9)}/4`,
          `${randomInt(1, 9)}/6`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction décimale a pour dénominateur 10, 100, 1 000...",
          "On observe le nombre situé sous la barre de fraction.",
          `Dans ${correct}, le dénominateur est ${decimalDenominator}.`,
          `${correct} est une fraction décimale.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_decimale_tpl_002_oui_non",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_decimale",
    difficulty: 3,
    theme: "neutral",
    hint: "Une fraction décimale a un dénominateur 10, 100 ou 1 000.",
    tags: ["cm1", "fraction", "decimale", "oui_non", "template", "qcm"],
    generate: () => {
      const isDecimal = randomChoice([true, false]);
      const denominator = isDecimal
        ? randomChoice([10, 100, 1000])
        : randomChoice([3, 4, 6, 7, 8, 9]);

      const numerator = randomInt(1, 50);
      const fraction = `${numerator}/${denominator}`;
      const correct = isDecimal ? "oui" : "non";

      return {
        text: `La fraction ${fraction} est-elle une fraction décimale ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction décimale se reconnaît grâce à son dénominateur.",
          "On regarde si le dénominateur est 10, 100 ou 1 000.",
          `Ici, le dénominateur est ${denominator}.`,
          correct === "oui"
            ? `${fraction} est une fraction décimale.`
            : `${fraction} n’est pas une fraction décimale.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_decimale_tpl_003_lien_dixieme_decimal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_decimale",
    difficulty: 3,
    theme: "neutral",
    hint: "Un chiffre après la virgule correspond aux dixièmes.",
    tags: ["cm1", "fraction", "decimale", "decimal", "template", "qcm"],
    generate: () => {
      const numerator = randomInt(1, 9);
      const decimalText = `0,${numerator}`;
      const correct = `${numerator}/10`;

      return {
        text: `Quelle fraction décimale correspond à ${decimalText} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${numerator}/100`,
          `10/${numerator}`,
          `1/${numerator}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre avec un chiffre après la virgule peut s’écrire en dixièmes.",
          "On lit le chiffre après la virgule.",
          `${decimalText} signifie ${numerator} dixième(s).`,
          `${decimalText} = ${correct}.`
        ),
        canvas: fractionCanvas({
          numerator,
          denominator: 10,
          model: "bar",
          showFraction: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_decimale_tpl_004_lien_centieme_decimal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_decimale",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux chiffres après la virgule correspondent aux centièmes.",
    tags: ["cm1", "fraction", "decimale", "centieme", "template", "qcm"],
    generate: () => {
      const numerator = randomChoice([12, 25, 34, 47, 58, 63, 75, 89]);
      const decimalText = `0,${String(numerator).padStart(2, "0")}`;
      const correct = `${numerator}/100`;

      return {
        text: `Quelle fraction décimale correspond à ${decimalText} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${numerator}/10`,
          `${numerator}/1000`,
          `100/${numerator}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre avec deux chiffres après la virgule peut s’écrire en centièmes.",
          "On lit les deux chiffres après la virgule.",
          `${decimalText} signifie ${numerator} centièmes.`,
          `${decimalText} = ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_decimale_tpl_005_intrus",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_decimale",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche la fraction dont le dénominateur n’est pas 10, 100 ou 1 000.",
    tags: ["cm1", "fraction", "decimale", "intrus", "template", "qcm"],
    generate: () => {
      const intrusDenominator = randomChoice([3, 4, 6, 8, 9]);
      const intrusNumerator = randomInt(1, 9);
      const correct = `${intrusNumerator}/${intrusDenominator}`;

      return {
        text: "Quelle fraction n’est pas une fraction décimale ?",
        format: "qcm",
        choices: makeChoices(correct, [
          `${randomInt(1, 9)}/10`,
          `${randomInt(10, 99)}/100`,
          `${randomInt(10, 99)}/1000`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction décimale a un dénominateur 10, 100, 1 000...",
          "On cherche donc celle dont le dénominateur est différent.",
          `Dans ${correct}, le dénominateur est ${intrusDenominator}.`,
          `${correct} n’est pas une fraction décimale.`
        ),
      };
    },
  },
    // ============================================================
  // FRACTION_DEFI
  // Résoudre un défi sur les fractions
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_fraction_defi_qcm_001_partage_gateau",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un gâteau est partagé en 8 parts égales. Lina mange 3 parts et Noé mange 2 parts. Quelle fraction du gâteau ont-ils mangée ensemble ?",
    format: "qcm",
    choices: ["5/8", "3/8", "2/8", "5/16"],
    expected: ["5/8"],
    comparator: "mcq_exact",
    hint: "Additionne les parts mangées, puis garde le même dénominateur.",
    explanation: exp(
      "Quand les parts ont la même taille, on peut additionner les numérateurs.",
      "On compte le nombre total de parts mangées.",
      "Lina mange 3 parts et Noé mange 2 parts : 3 + 2 = 5 parts sur 8.",
      "Ils ont mangé 5/8 du gâteau."
    ),
    canvas: fractionCanvas({
      numerator: 5,
      denominator: 8,
      model: "circle",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "defi", "partage", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_defi_qcm_002_reunion_ananas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, un ananas est coupé en 10 morceaux égaux. On mange 7 morceaux. Quelle fraction de l’ananas reste-t-il ?",
    format: "qcm",
    choices: ["3/10", "7/10", "10/3", "3/7"],
    expected: ["3/10"],
    comparator: "mcq_exact",
    hint: "Il y avait 10 morceaux au départ.",
    explanation: exp(
      "Une fraction peut représenter ce qui reste d’une unité.",
      "On calcule les parts non mangées.",
      "Il y avait 10 morceaux et 7 ont été mangés : 10 - 7 = 3.",
      "Il reste 3/10 de l’ananas."
    ),
    canvas: fractionCanvas({
      numerator: 3,
      denominator: 10,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "defi", "reunion", "ananas", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_defi_qcm_003_droite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une droite de 0 à 1 partagée en 6 parts égales, un point est placé au 5e trait après 0. Quelle fraction correspond à ce point ?",
    format: "qcm",
    choices: ["5/6", "6/5", "1/6", "5/5"],
    expected: ["5/6"],
    comparator: "mcq_exact",
    hint: "Le point est au 5e trait sur 6 parts égales.",
    explanation: exp(
      "Sur une droite graduée, le dénominateur indique le nombre de parts entre 0 et 1.",
      "Le numérateur indique combien de parts on avance depuis 0.",
      "Le point est au 5e trait sur 6 parts égales.",
      "La fraction correspondante est 5/6."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 6,
      numerator: 5,
      label: "?",
    }),
    tags: ["cm1", "fraction", "defi", "droite", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_defi_qcm_004_equivalente",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une grille de 12 cases, 6 cases sont coloriées. Quelle fraction simple équivalente reconnaît-on ?",
    format: "qcm",
    choices: ["1/2", "1/3", "2/3", "6/6"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "6 cases sur 12, c’est la moitié de la grille.",
    explanation: exp(
      "Une fraction peut parfois être reconnue sous une forme plus simple.",
      "On observe la part coloriée dans la grille.",
      "6 cases coloriées sur 12 représentent la moitié.",
      "La fraction simple équivalente est 1/2."
    ),
    canvas: fractionGridCanvas({
      rows: 3,
      cols: 4,
      shaded: 6,
    }),
    tags: ["cm1", "fraction", "defi", "equivalente", "grille", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_defi_qcm_005_comparer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Deux élèves mangent une tarte. Emma mange 3/8 de la tarte et Sami mange 5/8. Qui a mangé la plus grande part ?",
    format: "qcm",
    choices: ["Sami", "Emma", "ils ont mangé la même part", "on ne peut pas savoir"],
    expected: ["Sami"],
    comparator: "mcq_exact",
    hint: "Les dénominateurs sont identiques : compare les numérateurs.",
    explanation: exp(
      "Quand deux fractions ont le même dénominateur, les parts ont la même taille.",
      "On compare les numérateurs.",
      "5 est plus grand que 3, donc 5/8 est plus grand que 3/8.",
      "Sami a mangé la plus grande part."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 3, denominator: 8, label: "Emma" },
      b: { numerator: 5, denominator: 8, label: "Sami" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "defi", "comparer", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_defi_qcm_006_fraction_decimale",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une course, Léo a parcouru 8/10 du trajet. Quelle écriture décimale correspond à cette fraction ?",
    format: "qcm",
    choices: ["0,8", "0,08", "8,10", "1,8"],
    expected: ["0,8"],
    comparator: "mcq_exact",
    hint: "8/10 signifie 8 dixièmes.",
    explanation: exp(
      "Une fraction décimale peut s’écrire avec une virgule.",
      "Le dénominateur 10 indique des dixièmes.",
      "8/10 se lit 8 dixièmes.",
      "8/10 = 0,8."
    ),
    canvas: fractionCanvas({
      numerator: 8,
      denominator: 10,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "defi", "decimale", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_defi_qcm_007_superieure_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une pizza contient 6 parts. Des élèves mangent 8 parts au total. Quelle fraction de pizza ont-ils mangée ?",
    format: "qcm",
    choices: ["8/6", "6/8", "2/6", "6/6"],
    expected: ["8/6"],
    comparator: "mcq_exact",
    hint: "On a mangé plus qu’une pizza entière.",
    explanation: exp(
      "Une fraction peut être supérieure à 1 quand on dépasse une unité entière.",
      "Le dénominateur indique le nombre de parts dans une pizza entière.",
      "Une pizza contient 6 parts et 8 parts ont été mangées.",
      "La fraction mangée est 8/6."
    ),
    tags: ["cm1", "fraction", "defi", "superieure_1", "pizza", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_defi_qcm_008_erreur_frequente",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « 1/8 est plus grand que 1/4 car 8 est plus grand que 4 ». A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Plus on partage l’unité en beaucoup de parts, plus les parts sont petites.",
    explanation: exp(
      "Comparer des fractions demande de comprendre la taille des parts.",
      "Quand le numérateur est 1, plus le dénominateur est grand, plus la part est petite.",
      "Un huitième est plus petit qu’un quart.",
      "L’élève n’a pas raison."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 1, denominator: 8, label: "1/8" },
      b: { numerator: 1, denominator: 4, label: "1/4" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "defi", "erreur", "comparer", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_defi_open_001_partage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment trouver la fraction restante si on mange 3 parts d’un gâteau partagé en 8 parts égales.",
    format: "open",
    expected: ["8", "3", "reste", "5", "parts"],
    comparator: "contains_keyword",
    hint: "Calcule combien de parts ne sont pas mangées.",
    explanation: exp(
      "Pour trouver une fraction restante, on cherche les parts qui ne sont pas utilisées.",
      "On part du nombre total de parts et on enlève les parts mangées.",
      "8 - 3 = 5, donc il reste 5 parts sur 8.",
      "La fraction restante est 5/8."
    ),
    canvas: fractionCanvas({
      numerator: 5,
      denominator: 8,
      model: "circle",
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "defi", "open", "partage", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_fraction_defi_open_002_comparer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi 6/10 est plus grand que 4/10.",
    format: "open",
    expected: ["même", "dénominateur", "10", "6", "4"],
    comparator: "contains_keyword",
    hint: "Les deux fractions ont le même dénominateur.",
    explanation: exp(
      "Quand deux fractions ont le même dénominateur, les parts ont la même taille.",
      "On compare les numérateurs.",
      "6 est plus grand que 4.",
      "Donc 6/10 est plus grand que 4/10."
    ),
    canvas: fractionCompareCanvas({
      a: { numerator: 6, denominator: 10, label: "6/10" },
      b: { numerator: 4, denominator: 10, label: "4/10" },
      showFraction: false,
    }),
    tags: ["cm1", "fraction", "defi", "open", "comparer", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_fraction_defi_tpl_001_partage_reste",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule le nombre de parts restantes.",
    tags: ["cm1", "fraction", "defi", "partage", "reste", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([6, 8, 10, 12]);
      const eaten = randomInt(1, denominator - 2);
      const remaining = denominator - eaten;
      const correct = `${remaining}/${denominator}`;

      return {
        text: `Un gâteau est partagé en ${denominator} parts égales. On mange ${eaten} parts. Quelle fraction du gâteau reste-t-il ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${eaten}/${denominator}`,
          `${remaining}/${eaten}`,
          `${denominator}/${remaining}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver la fraction restante, on calcule les parts qui ne sont pas mangées.",
          "On enlève les parts mangées au total.",
          `${denominator} - ${eaten} = ${remaining}.`,
          `Il reste ${correct} du gâteau.`
        ),
        canvas: fractionCanvas({
          numerator: remaining,
          denominator,
          model: randomChoice(["bar", "circle"] as const),
          showFraction: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_defi_tpl_002_reunion_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Additionne les parts choisies.",
    tags: ["cm1", "fraction", "defi", "reunion", "fruits", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([8, 10, 12]);
      const a = randomInt(1, 3);
      const b = randomInt(1, 3);
      const total = a + b;
      const correct = `${total}/${denominator}`;

      return {
        text: `À La Réunion, une mangue est coupée en ${denominator} parts égales. Maé mange ${a} parts et Ana mange ${b} parts. Quelle fraction de la mangue ont-elles mangée ensemble ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${a}/${denominator}`,
          `${b}/${denominator}`,
          `${total}/${denominator + denominator}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand les parts ont la même taille, on additionne les parts prises.",
          "Le dénominateur reste le nombre total de parts de l’unité.",
          `${a} + ${b} = ${total}.`,
          `Elles ont mangé ${correct} de la mangue.`
        ),
        canvas: fractionCanvas({
          numerator: total,
          denominator,
          model: "bar",
          showFraction: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_defi_tpl_003_droite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Le numérateur indique le numéro du trait.",
    tags: ["cm1", "fraction", "defi", "droite", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([5, 6, 8, 10]);
      const numerator = randomInt(1, denominator - 1);
      const correct = `${numerator}/${denominator}`;

      return {
        text: `Sur une droite de 0 à 1 partagée en ${denominator} parts égales, un point est placé au ${numerator}e trait après 0. Quelle fraction représente-t-il ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${denominator}/${numerator}`,
          `1/${denominator}`,
          `${numerator}/${numerator}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur une droite graduée, une fraction indique une position.",
          "Le dénominateur indique les parts entre 0 et 1 ; le numérateur indique combien de parts on avance.",
          `Le point est au ${numerator}e trait sur ${denominator} parts.`,
          `La fraction représentée est ${correct}.`
        ),
        canvas: droiteGradueeFractionCanvas({
          denominator,
          numerator,
          label: "?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_defi_tpl_004_comparer_meme_denominateur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Les dénominateurs sont identiques.",
    tags: ["cm1", "fraction", "defi", "comparer", "template", "canvas"],
    generate: () => {
      const denominator = randomChoice([6, 8, 10, 12]);
      const a = randomInt(1, denominator - 2);
      const b = randomInt(a + 1, denominator - 1);
      const correct = `${b}/${denominator}`;

      return {
        text: `Quelle fraction est la plus grande : ${a}/${denominator} ou ${b}/${denominator} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${a}/${denominator}`,
          "elles sont égales",
          `${denominator}/${b}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand deux fractions ont le même dénominateur, les parts ont la même taille.",
          "On compare les numérateurs.",
          `${b} est plus grand que ${a}.`,
          `La plus grande fraction est ${correct}.`
        ),
        canvas: fractionCompareCanvas({
          a: { numerator: a, denominator, label: `${a}/${denominator}` },
          b: { numerator: b, denominator, label: `${b}/${denominator}` },
          showFraction: false,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_defi_tpl_005_fraction_decimale",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Un dénominateur 10 permet d’écrire un dixième.",
    tags: ["cm1", "fraction", "defi", "decimale", "template"],
    generate: () => {
      const numerator = randomInt(1, 9);
      const correct = `0,${numerator}`;

      return {
        text: `Quelle écriture décimale correspond à ${numerator}/10 ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `0,0${numerator}`,
          `${numerator},10`,
          `1,${numerator}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction en dixièmes peut s’écrire avec un chiffre après la virgule.",
          "Le numérateur indique le nombre de dixièmes.",
          `${numerator}/10 signifie ${numerator} dixième(s).`,
          `${numerator}/10 = ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_fraction_defi_tpl_006_equivalente",
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche une fraction qui représente la même quantité.",
    tags: ["cm1", "fraction", "defi", "equivalente", "template", "canvas"],
    generate: () => {
      const pairs = [
        { a: "1/2", correct: "2/4", wrongs: ["1/4", "3/4", "2/3"] },
        { a: "1/3", correct: "2/6", wrongs: ["1/6", "3/6", "2/3"] },
        { a: "2/3", correct: "4/6", wrongs: ["2/6", "3/6", "4/3"] },
        { a: "1/4", correct: "2/8", wrongs: ["1/8", "4/8", "2/4"] },
      ];

      const item = randomChoice(pairs);

      return {
        text: `Quelle fraction est équivalente à ${item.a} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux fractions équivalentes représentent la même quantité.",
          "On peut multiplier le numérateur et le dénominateur par le même nombre.",
          `${item.a} et ${item.correct} représentent la même part.`,
          `La bonne réponse est ${item.correct}.`
        ),
      };
    },
  },
];
