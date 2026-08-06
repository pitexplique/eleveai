import type {
  TutorBankItemV4,
  FractionCanvasData,
  StatGraphCanvasData,
} from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

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
  // La bonne réponse ne doit JAMAIS sauter au découpage : on la met de côté,
  // on tire trois distracteurs distincts, puis on mélange l'ensemble.
  // ⚠️ 05/08/2026 — les versions précédentes jetaient la bonne réponse dans le
  // même chapeau que les pièges avant de couper à quatre. Avec quatre pièges
  // écrits, elle pouvait rester au fond : l'élève voyait alors quatre
  // propositions dont aucune n'était bonne, sans que rien ne le signale.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function fractionCanvas(
  data: Omit<FractionCanvasData, "kind">
): FractionCanvasData {
  return {
    kind: "fraction",
    ...data,
  };
}

function statGraphCanvas(
  data: Omit<StatGraphCanvasData, "kind">
): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    ...data,
  };
}

function probabilitesCanvas(data: {
  variant: "roue" | "billes";
  roue?: {
    segments: {
      label: string;
      poids: number;
      couleur?: string;
    }[];
  };
  billes?: {
    elements: {
      couleur: string;
      label?: string;
    }[];
  };
  size?: {
    width?: number;
    height?: number;
  };
}) {
  return {
    kind: "probabilites" as const,
    variant: data.variant,
    roue: data.roue,
    billes: data.billes,
    size: data.size,
  };
}

export const pourcentagesBank: TutorBankItemV4[] = [
  /* ============================================================
     POURCENTAGE_COMPRENDRE
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_pourcentage_comprendre_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie 50 % ?",
    format: "qcm",
    choices: [
      "50 sur 100",
      "50 sur 10",
      "50 + 100",
      "100 sur 50",
    ],
    expected: ["50 sur 100"],
    comparator: "mcq_exact",
    hint: "Pourcentage signifie “sur 100”.",
    explanation: exp(
      "Un pourcentage est une façon d’écrire une proportion sur 100.",
      "On lit le nombre avant le symbole % comme une quantité sur 100.",
      "50 % signifie 50 sur 100.",
      "50 % signifie donc 50/100, c’est-à-dire la moitié."
    ),
    tags: ["cm2", "pourcentage", "comprendre", "definition", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "grid",
      grid: {
        rows: 10,
        cols: 10,
        shaded: 50,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_pourcentage_comprendre_fixed_2_25_pourcent",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "25 %, c’est combien sur 100 ?",
    format: "qcm",
    choices: ["25 sur 100", "25 sur 10", "100 sur 25", "75 sur 100"],
    expected: ["25 sur 100"],
    comparator: "mcq_exact",
    hint: "Le symbole % veut dire “sur 100”.",
    explanation: exp(
      "Un pourcentage exprime une quantité sur 100.",
      "On remplace le symbole % par “sur 100”.",
      "25 % = 25/100.",
      "25 % signifie 25 sur 100."
    ),
    tags: ["cm2", "pourcentage", "comprendre", "25", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "grid",
      grid: {
        rows: 10,
        cols: 10,
        shaded: 25,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_pourcentage_comprendre_fixed_3_100_pourcent",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que représente 100 % d’une tablette de chocolat ?",
    format: "qcm",
    choices: [
      "toute la tablette",
      "la moitié de la tablette",
      "un quart de la tablette",
      "aucun morceau",
    ],
    expected: ["toute la tablette"],
    comparator: "mcq_exact",
    hint: "100 %, c’est le tout.",
    explanation: exp(
      "100 % représente la totalité d’un objet ou d’une quantité.",
      "On pense à 100 cases coloriées sur 100.",
      "100 % d’une tablette correspond à toute la tablette.",
      "100 % représente le tout."
    ),
    tags: ["cm2", "pourcentage", "comprendre", "100", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "grid",
      grid: {
        rows: 10,
        cols: 10,
        shaded: 100,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_pourcentage_comprendre_fixed_4_zero_pourcent",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que représente 0 % d’un gâteau ?",
    format: "qcm",
    choices: [
      "aucune part du gâteau",
      "tout le gâteau",
      "la moitié du gâteau",
      "un quart du gâteau",
    ],
    expected: ["aucune part du gâteau"],
    comparator: "mcq_exact",
    hint: "0 %, c’est rien du tout.",
    explanation: exp(
      "0 % représente aucune partie d’une quantité.",
      "On pense à 0 case coloriée sur 100.",
      "0 % d’un gâteau signifie qu’on ne prend aucune part.",
      "0 % représente rien du tout."
    ),
    tags: ["cm2", "pourcentage", "comprendre", "0", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "grid",
      grid: {
        rows: 10,
        cols: 10,
        shaded: 0,
      },
    }),
  },

  {
    kind: "template",
    id: "cm2_pourcentage_comprendre_tpl_1_grille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Sur une grille de 100 cases, le nombre de cases coloriées donne le pourcentage.",
    tags: ["cm2", "pourcentage", "comprendre", "grille_100", "template", "canvas"],
    generate: () => {
      const percent = randomChoice([10, 20, 25, 40, 50, 60, 75, 80]);
      const correct = `${percent} %`;

      return {
        text: `Une grille de 100 cases contient ${percent} cases coloriées. Quel pourcentage est colorié ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${100 - percent} %`,
          `${percent}/10 %`,
          `${percent + 10} %`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un pourcentage indique une quantité sur 100.",
          "Dans une grille de 100 cases, on compte les cases coloriées.",
          `Il y a ${percent} cases coloriées sur 100.`,
          `La partie coloriée représente ${percent} %.`
        ),
        canvas: fractionCanvas({
          model: "grid",
          grid: {
            rows: 10,
            cols: 10,
            shaded: percent,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_pourcentage_comprendre_tpl_2_barre_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare avec les fractions simples : moitié, quart, trois quarts.",
    tags: ["cm2", "pourcentage", "comprendre", "fraction", "template", "canvas"],
    generate: () => {
      const item = randomChoice([
        { percent: "50 %", numerator: 1, denominator: 2, label: "1/2" },
        { percent: "25 %", numerator: 1, denominator: 4, label: "1/4" },
        { percent: "75 %", numerator: 3, denominator: 4, label: "3/4" },
        { percent: "10 %", numerator: 1, denominator: 10, label: "1/10" },
      ]);

      return {
        text: `Quelle fraction simple correspond à ${item.percent} ?`,
        format: "qcm",
        choices: makeChoices(item.label, ["1/5", "2/5", "4/4"]),
        expected: [item.label],
        comparator: "mcq_exact",
        explanation: exp(
          "Certains pourcentages correspondent à des fractions simples.",
          "On pense à la part du tout représentée.",
          `${item.percent} correspond à ${item.label}.`,
          `${item.percent} = ${item.label}.`
        ),
        canvas: fractionCanvas({
          model: "bar",
          fraction: {
            numerator: item.numerator,
            denominator: item.denominator,
            label: item.percent,
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_pourcentage_comprendre_fixed_5_erreur_sur_10",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “30 %, c’est 30 sur 10.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "% signifie sur 100, pas sur 10.",
    explanation: exp(
      "Un pourcentage est toujours une proportion sur 100.",
      "On remplace le symbole % par “sur 100”.",
      "30 % = 30/100, pas 30/10.",
      "L’élève a tort."
    ),
    tags: ["cm2", "pourcentage", "comprendre", "erreur", "qcm"],
  },

  /* ============================================================
     POURCENTAGE_FRACTION_DECIMAL
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_pourcentage_fraction_decimal_fixed_1_50",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle égalité est correcte ?",
    format: "qcm",
    choices: [
      "50 % = 50/100 = 0,5",
      "50 % = 50/10 = 5",
      "50 % = 1/4 = 0,25",
      "50 % = 100/50 = 2",
    ],
    expected: ["50 % = 50/100 = 0,5"],
    comparator: "mcq_exact",
    hint: "50 %, c’est 50 sur 100.",
    explanation: exp(
      "Un pourcentage peut s’écrire comme une fraction sur 100 et parfois comme un nombre décimal.",
      "On écrit 50 % sous forme de fraction : 50/100.",
      "50/100 = 0,5.",
      "Donc 50 % = 50/100 = 0,5."
    ),
    tags: ["cm2", "pourcentage", "fraction_decimal", "50", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: {
        numerator: 1,
        denominator: 2,
        label: "50 % = 1/2",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_pourcentage_fraction_decimal_fixed_2_25",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "25 % correspond à...",
    format: "qcm",
    choices: [
      "1/4",
      "1/2",
      "3/4",
      "1/10",
    ],
    expected: ["1/4"],
    comparator: "mcq_exact",
    hint: "25 %, c’est un quart.",
    explanation: exp(
      "Un pourcentage peut être relié à une fraction simple.",
      "On sait que 100 % représente le tout. 25 % représente un quart du tout.",
      "25 % = 25/100 = 1/4.",
      "25 % correspond à 1/4."
    ),
    tags: ["cm2", "pourcentage", "fraction_decimal", "25", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: {
        numerator: 1,
        denominator: 4,
        label: "25 % = 1/4",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_pourcentage_fraction_decimal_fixed_3_75",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "75 % correspond à...",
    format: "qcm",
    choices: [
      "3/4",
      "1/4",
      "1/2",
      "1/10",
    ],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "75 %, c’est trois quarts.",
    explanation: exp(
      "Un pourcentage peut être relié à une fraction simple.",
      "On compare avec les quarts : 25 %, 50 %, 75 %.",
      "75 % = 75/100 = 3/4.",
      "75 % correspond à 3/4."
    ),
    tags: ["cm2", "pourcentage", "fraction_decimal", "75", "qcm", "canvas"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: {
        numerator: 3,
        denominator: 4,
        label: "75 % = 3/4",
      },
    }),
  },

  {
    kind: "template",
    id: "cm2_pourcentage_fraction_decimal_tpl_1_associer_fraction",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Pense aux pourcentages classiques : 50 %, 25 %, 75 %, 10 %.",
    tags: ["cm2", "pourcentage", "fraction_decimal", "template", "canvas"],
    generate: () => {
      const item = randomChoice([
        { percent: "50 %", fraction: "1/2", numerator: 1, denominator: 2 },
        { percent: "25 %", fraction: "1/4", numerator: 1, denominator: 4 },
        { percent: "75 %", fraction: "3/4", numerator: 3, denominator: 4 },
        { percent: "10 %", fraction: "1/10", numerator: 1, denominator: 10 },
      ]);

      return {
        text: `Quelle fraction correspond à ${item.percent} ?`,
        format: "qcm",
        choices: makeChoices(item.fraction, ["1/5", "2/3", "4/5"]),
        expected: [item.fraction],
        comparator: "mcq_exact",
        explanation: exp(
          "Un pourcentage peut être transformé en fraction.",
          "On utilise les équivalences simples à connaître.",
          `${item.percent} correspond à ${item.fraction}.`,
          `La bonne réponse est ${item.fraction}.`
        ),
        canvas: fractionCanvas({
          model: "bar",
          fraction: {
            numerator: item.numerator,
            denominator: item.denominator,
            label: item.percent,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_pourcentage_fraction_decimal_tpl_2_associer_decimal",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_fraction_decimal",
    difficulty: 3,
    theme: "neutral",
    hint: "Un pourcentage peut s’écrire sous forme décimale.",
    tags: ["cm2", "pourcentage", "fraction_decimal", "decimal", "template"],
    generate: () => {
      const item = randomChoice([
        { percent: "50 %", decimal: "0,5", fraction: "50/100" },
        { percent: "25 %", decimal: "0,25", fraction: "25/100" },
        { percent: "75 %", decimal: "0,75", fraction: "75/100" },
        { percent: "10 %", decimal: "0,1", fraction: "10/100" },
      ]);

      return {
        text: `Quel nombre décimal correspond à ${item.percent} ?`,
        format: "qcm",
        choices: makeChoices(item.decimal, ["1", "0,05", "2"]),
        expected: [item.decimal],
        comparator: "mcq_exact",
        explanation: exp(
          "Un pourcentage peut s’écrire comme une fraction sur 100 puis comme un décimal.",
          "On écrit d’abord le pourcentage sur 100.",
          `${item.percent} = ${item.fraction} = ${item.decimal}.`,
          `Le nombre décimal correspondant est ${item.decimal}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_pourcentage_fraction_decimal_open_1_expliquer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_fraction_decimal",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 50 % correspond à la moitié.",
    format: "open",
    expected: ["50", "100", "moitié", "1/2"],
    comparator: "contains_keyword",
    hint: "50 %, c’est 50 sur 100.",
    explanation: exp(
      "Un pourcentage est une proportion sur 100.",
      "On compare 50 à 100.",
      "50 est la moitié de 100, donc 50/100 = 1/2.",
      "50 % correspond donc à la moitié."
    ),
    tags: ["cm2", "pourcentage", "fraction_decimal", "open", "explication"],
  },

  /* ============================================================
     POURCENTAGE_CALCULER
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_pourcentage_calculer_fixed_1_50",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 50 % de 80.",
    format: "qcm",
    choices: ["40", "50", "30", "80"],
    expected: ["40"],
    comparator: "mcq_exact",
    hint: "50 %, c’est la moitié.",
    explanation: exp(
      "Calculer un pourcentage, c’est prendre une partie d’une quantité.",
      "50 % correspond à la moitié.",
      "La moitié de 80 est 40.",
      "50 % de 80 vaut 40."
    ),
    tags: ["cm2", "pourcentage", "calculer", "50", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_pourcentage_calculer_fixed_2_25",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 25 % de 100.",
    format: "qcm",
    choices: ["25", "50", "75", "10"],
    expected: ["25"],
    comparator: "mcq_exact",
    hint: "25 %, c’est un quart.",
    explanation: exp(
      "Calculer un pourcentage, c’est prendre une partie d’une quantité.",
      "25 % correspond à un quart.",
      "Le quart de 100 est 25.",
      "25 % de 100 vaut 25."
    ),
    tags: ["cm2", "pourcentage", "calculer", "25", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_pourcentage_calculer_fixed_3_10",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 10 % de 70.",
    format: "qcm",
    choices: ["7", "10", "17", "60"],
    expected: ["7"],
    comparator: "mcq_exact",
    hint: "10 %, c’est un dixième.",
    explanation: exp(
      "10 % correspond à un dixième.",
      "Pour prendre 10 %, on divise par 10.",
      "70 ÷ 10 = 7.",
      "10 % de 70 vaut 7."
    ),
    tags: ["cm2", "pourcentage", "calculer", "10", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_pourcentage_calculer_tpl_1_50",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "50 %, c’est la moitié.",
    tags: ["cm2", "pourcentage", "calculer", "50", "template"],
    generate: () => {
      const n = randomChoice([20, 40, 60, 80, 100, 120, 200]);
      const result = n / 2;

      return {
        text: `Calcule 50 % de ${n}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "50 % correspond à la moitié.",
          "On divise la quantité par 2.",
          `${n} ÷ 2 = ${result}.`,
          `50 % de ${n} vaut ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_pourcentage_calculer_tpl_2_25",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "25 %, c’est un quart.",
    tags: ["cm2", "pourcentage", "calculer", "25", "template"],
    generate: () => {
      const n = randomChoice([40, 80, 100, 120, 200, 240]);
      const result = n / 4;

      return {
        text: `Calcule 25 % de ${n}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "25 % correspond à un quart.",
          "On divise la quantité par 4.",
          `${n} ÷ 4 = ${result}.`,
          `25 % de ${n} vaut ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_pourcentage_calculer_tpl_3_10",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "10 %, c’est un dixième.",
    tags: ["cm2", "pourcentage", "calculer", "10", "template"],
    generate: () => {
      const n = randomChoice([30, 50, 70, 90, 120, 150, 200]);
      const result = n / 10;

      return {
        text: `Calcule 10 % de ${n}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "10 % correspond à un dixième.",
          "On divise la quantité par 10.",
          `${n} ÷ 10 = ${result}.`,
          `10 % de ${n} vaut ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_pourcentage_calculer_tpl_4_75",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "75 %, c’est 3 quarts.",
    tags: ["cm2", "pourcentage", "calculer", "75", "template"],
    generate: () => {
      const n = randomChoice([40, 80, 100, 120, 200, 240]);
      const quart = n / 4;
      const result = quart * 3;

      return {
        text: `Calcule 75 % de ${n}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "75 % correspond à trois quarts.",
          "On calcule d’abord un quart, puis on le multiplie par 3.",
          `${n} ÷ 4 = ${quart}, puis ${quart} × 3 = ${result}.`,
          `75 % de ${n} vaut ${result}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_pourcentage_calculer_fixed_4_erreur_25",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “25 % de 80, c’est 25.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "25 %, c’est un quart de la quantité.",
    explanation: exp(
      "25 % dépend de la quantité de départ.",
      "On ne répond pas toujours 25 : on prend un quart de la quantité.",
      "80 ÷ 4 = 20.",
      "L’élève a tort : 25 % de 80 vaut 20."
    ),
    tags: ["cm2", "pourcentage", "calculer", "erreur", "qcm"],
  },

  /* ============================================================
     POURCENTAGE_PROBLEME
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_pourcentage_probleme_fixed_1_reduction",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un sac coûte 20 €. Il y a une réduction de 50 %. Quel est le nouveau prix ?",
    format: "qcm",
    choices: ["10 €", "15 €", "20 €", "5 €"],
    expected: ["10 €"],
    comparator: "mcq_exact",
    hint: "50 %, c’est la moitié.",
    explanation: exp(
      "Une réduction enlève une partie du prix.",
      "On calcule d’abord 50 % du prix, puis on l’enlève.",
      "50 % de 20 € = 10 €. Nouveau prix : 20 - 10 = 10 €.",
      "Le nouveau prix est 10 €."
    ),
    tags: ["cm2", "pourcentage", "probleme", "reduction", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_pourcentage_probleme_fixed_2_groupe",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une classe de 24 élèves, 50 % sont inscrits à la chorale. Combien d’élèves sont inscrits ?",
    format: "qcm",
    choices: ["12", "24", "6", "50"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "50 %, c’est la moitié.",
    explanation: exp(
      "Un pourcentage peut s’appliquer à un groupe.",
      "50 % correspond à la moitié du groupe.",
      "La moitié de 24 est 12.",
      "12 élèves sont inscrits à la chorale."
    ),
    tags: ["cm2", "pourcentage", "probleme", "groupe", "qcm", "graphique"],
    canvas: statGraphCanvas({
      graphType: "camembert",
      data: [
        { label: "chorale", value: 12 },
        { label: "autres", value: 12 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 0,
      },
    }),
  },

  {
    kind: "template",
    id: "cm2_pourcentage_probleme_tpl_1_reduction_50",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Une réduction de 50 %, c’est la moitié du prix en moins.",
    tags: ["cm2", "pourcentage", "probleme", "reduction", "50", "template"],
    generate: () => {
      const prix = randomChoice([20, 30, 40, 50, 60, 80]);
      const reduction = prix / 2;
      const nouveauPrix = prix - reduction;

      return {
        text: `Un jeu coûte ${prix} €. Il y a une réduction de 50 %. Quel est le nouveau prix ?`,
        format: "short",
        expected: [String(nouveauPrix)],
        comparator: "number_equal",
        explanation: exp(
          "Une réduction diminue le prix de départ.",
          "50 % correspond à la moitié du prix.",
          `50 % de ${prix} € = ${reduction} €. Donc ${prix} - ${reduction} = ${nouveauPrix}.`,
          `Le nouveau prix est ${nouveauPrix} €.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_pourcentage_probleme_tpl_2_reunion_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "25 %, c’est un quart.",
    tags: ["cm2", "pourcentage", "probleme", "reunion", "fruits", "template", "graphique"],
    generate: () => {
      const total = randomChoice([40, 80, 100, 120]);
      const mangues = total / 4;
      const autres = total - mangues;

      return {
        text: `Au marché de Saint-Pierre, un stand a ${total} fruits. 25 % sont des mangues. Combien y a-t-il de mangues ?`,
        format: "short",
        expected: [String(mangues)],
        comparator: "number_equal",
        explanation: exp(
          "Un pourcentage peut représenter une partie d’un total.",
          "25 % correspond à un quart.",
          `${total} ÷ 4 = ${mangues}.`,
          `Il y a ${mangues} mangues.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          data: [
            { label: "mangues", value: mangues },
            { label: "autres", value: autres },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 0,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_pourcentage_probleme_tpl_3_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_probleme",
    difficulty: 3,
    theme: "sport",
    hint: "10 %, c’est un dixième.",
    tags: ["cm2", "pourcentage", "probleme", "sport", "template"],
    generate: () => {
      const total = randomChoice([50, 60, 80, 100, 120]);
      const percent = randomChoice([10, 50]);
      const result = percent === 10 ? total / 10 : total / 2;

      return {
        text: `Dans un club sportif, il y a ${total} adhérents. ${percent} % pratiquent la course. Combien d’adhérents pratiquent la course ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Un pourcentage peut s’appliquer à un groupe de personnes.",
          percent === 10
            ? "10 % correspond à un dixième."
            : "50 % correspond à la moitié.",
          percent === 10
            ? `${total} ÷ 10 = ${result}.`
            : `${total} ÷ 2 = ${result}.`,
          `${result} adhérents pratiquent la course.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_pourcentage_probleme_fixed_3_erreur_reduction",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un tee-shirt coûte 40 €. Il y a une réduction de 25 %. Un élève répond : “le nouveau prix est 25 €”. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "25 % est la réduction, pas forcément le nouveau prix.",
    explanation: exp(
      "Une réduction est une partie du prix que l’on enlève.",
      "On calcule d’abord 25 % du prix initial, puis on le soustrait.",
      "25 % de 40 € = 10 €. Nouveau prix : 40 - 10 = 30 €.",
      "L’élève a tort : le nouveau prix est 30 €."
    ),
    tags: ["cm2", "pourcentage", "probleme", "reduction", "erreur", "qcm"],
  },

  /* ============================================================
     POURCENTAGE_DEFI
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_pourcentage_defi_fixed_1_roue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur cette roue, la partie rouge représente 25 % de la roue. Quelle fraction correspond à la partie rouge ?",
    format: "qcm",
    choices: ["1/4", "1/2", "3/4", "1/10"],
    expected: ["1/4"],
    comparator: "mcq_exact",
    hint: "25 %, c’est un quart.",
    explanation: exp(
      "Un pourcentage peut se lire sur une roue ou un graphique.",
      "25 % correspond à un quart du total.",
      "Un quart s’écrit 1/4.",
      "La partie rouge correspond à 1/4."
    ),
    tags: ["cm2", "pourcentage", "defi", "roue", "probabilites", "qcm", "canvas"],
    canvas: probabilitesCanvas({
      variant: "roue",
      roue: {
        segments: [
          { label: "rouge", poids: 25, couleur: "#ef4444" },
          { label: "autres", poids: 75, couleur: "#94a3b8" },
        ],
      },
    }),
  },

  {
    kind: "template",
    id: "cm2_pourcentage_defi_tpl_1_billes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Sur 10 billes, chaque bille représente 10 %.",
    tags: ["cm2", "pourcentage", "defi", "billes", "probabilites", "template", "canvas"],
    generate: () => {
      const rouges = randomChoice([2, 3, 4, 5, 6, 7]);
      const total = 10;
      const percent = rouges * 10;

      const elements = [
        ...Array.from({ length: rouges }, () => ({
          couleur: "#ef4444",
          label: "R",
        })),
        ...Array.from({ length: total - rouges }, () => ({
          couleur: "#3b82f6",
          label: "B",
        })),
      ];

      return {
        text: `Dans un sac, il y a ${rouges} billes rouges sur 10 billes. Quel pourcentage des billes est rouge ?`,
        format: "short",
        expected: [String(percent), `${percent} %`],
        comparator: "contains_keyword",
        explanation: exp(
          "Un pourcentage indique une quantité sur 100.",
          "Quand le total est 10, chaque bille représente 10 %.",
          `${rouges} billes rouges sur 10 représentent ${rouges} × 10 % = ${percent} %.`,
          `${percent} % des billes sont rouges.`
        ),
        canvas: probabilitesCanvas({
          variant: "billes",
          billes: {
            elements,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_pourcentage_defi_tpl_2_graphique_classe",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare la partie au total.",
    tags: ["cm2", "pourcentage", "defi", "graphique", "classe", "template"],
    generate: () => {
      const total = randomChoice([20, 24, 30, 40]);
      const percent = randomChoice([25, 50, 75]);
      const part =
        percent === 25 ? total / 4 : percent === 50 ? total / 2 : (3 * total) / 4;
      const autres = total - part;

      return {
        text: `Dans une classe de ${total} élèves, ${part} élèves viennent à pied. Quel pourcentage des élèves viennent à pied ?`,
        format: "qcm",
        choices: makeChoices(`${percent} %`, ["10 %", "20 %", "100 %"]),
        expected: [`${percent} %`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver un pourcentage, on compare la partie au total.",
          "On reconnaît ici une proportion simple : un quart, la moitié ou trois quarts.",
          `${part} élèves sur ${total} correspondent à ${percent} %.`,
          `${percent} % des élèves viennent à pied.`
        ),
        canvas: statGraphCanvas({
          graphType: "camembert",
          data: [
            { label: "à pied", value: part },
            { label: "autres", value: autres },
          ],
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 0,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_pourcentage_defi_tpl_3_reunion_gourmand",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Calcule d’abord le pourcentage en euros, puis le prix final.",
    tags: ["cm2", "pourcentage", "defi", "reunion", "marche", "reduction", "template"],
    generate: () => {
      const prix = randomChoice([40, 60, 80, 100]);
      const percent = randomChoice([25, 50]);
      const reduction = percent === 25 ? prix / 4 : prix / 2;
      const final = prix - reduction;

      return {
        text: `Au marché de Saint-Pierre, un panier gourmand coûte ${prix} €. Le vendeur fait une réduction de ${percent} %. Quel est le prix final ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation: exp(
          "Une réduction enlève une partie du prix de départ.",
          percent === 25
            ? "25 % correspond à un quart."
            : "50 % correspond à la moitié.",
          percent === 25
            ? `${prix} ÷ 4 = ${reduction}, puis ${prix} - ${reduction} = ${final}.`
            : `${prix} ÷ 2 = ${reduction}, puis ${prix} - ${reduction} = ${final}.`,
          `Le prix final est ${final} €.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_pourcentage_defi_open_1_expliquer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentage",
    microId: "pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique avec tes mots pourquoi 25 % d’une quantité correspond à un quart.",
    format: "open",
    expected: ["25", "100", "quart", "4"],
    comparator: "contains_keyword",
    hint: "Pense à 100 partagé en 4 parts égales.",
    explanation: exp(
      "Un pourcentage est une quantité sur 100.",
      "On compare 25 à 100.",
      "100 partagé en 4 parts égales donne 25 dans chaque part.",
      "Donc 25 % correspond à un quart."
    ),
    tags: ["cm2", "pourcentage", "defi", "open", "explication"],
  },
];