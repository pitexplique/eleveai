// lib/tutor-v4/question-banks/maths/cm1/masse.bank.ts

import type {
  TutorBankItemV4,
  MasseCanvasData,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

function masseCanvas(data: Omit<MasseCanvasData, "kind">): MasseCanvasData {
  return {
    kind: "masse",
    ...data,
  };
}

function formatKg(value: number) {
  return Number.isInteger(value)
    ? String(value)
    : String(value).replace(".", ",");
}

export const masseBank: TutorBankItemV4[] = [
  // ============================================================
  // MASSE_COMPARER
  // Comparer des masses
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_masse_comparer_fixed_001_unites_identiques",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle masse est la plus grande : 750 g ou 500 g ?",
    format: "qcm",
    choices: ["750 g", "500 g"],
    expected: ["750 g"],
    comparator: "mcq_exact",
    hint: "Les deux masses sont en grammes : compare les nombres.",
    explanation: exp(
      "Comparer des masses, c’est déterminer laquelle est la plus lourde, la plus légère ou si elles sont égales.",
      "Quand les unités sont les mêmes, on compare directement les nombres.",
      "750 est plus grand que 500.",
      "La masse la plus grande est 750 g."
    ),
    canvas: masseCanvas({
      variant: "balance",
      gauche: {
        label: "Sac A",
        icon: "📦",
        masse: "750 g",
        grammes: 750,
      },
      droite: {
        label: "Sac B",
        icon: "📦",
        masse: "500 g",
        grammes: 500,
      },
      questionLabel: "Quel sac est le plus lourd ?",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "comparer",
      "grammes",
      "qcm",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_masse_comparer_fixed_002_kg_g",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle masse est la plus grande : 1 kg ou 750 g ?",
    format: "qcm",
    choices: ["1 kg", "750 g"],
    expected: ["1 kg"],
    comparator: "mcq_exact",
    hint: "Convertis 1 kg en grammes.",
    explanation: exp(
      "Pour comparer deux masses avec des unités différentes, il faut les écrire dans la même unité.",
      "On convertit les kilogrammes en grammes.",
      "1 kg = 1 000 g, et 1 000 g est plus grand que 750 g.",
      "La masse la plus grande est 1 kg."
    ),
    canvas: masseCanvas({
      variant: "balance",
      gauche: {
        label: "Sac de riz",
        icon: "🍚",
        masse: "1 kg",
        grammes: 1000,
      },
      droite: {
        label: "Panier",
        icon: "🧺",
        masse: "750 g",
        grammes: 750,
      },
      questionLabel: "Quel côté est le plus lourd ?",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "comparer",
      "kg_g",
      "qcm",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_masse_comparer_fixed_003_egalite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Compare 1 kg et 1000 g.",
    format: "qcm",
    choices: [
      "1 kg est plus lourd",
      "1000 g est plus lourd",
      "les deux masses sont égales",
      "on ne peut pas comparer",
    ],
    expected: ["les deux masses sont égales"],
    comparator: "mcq_exact",
    hint: "1 kg = 1000 g.",
    explanation: exp(
      "Deux masses peuvent être égales même si elles sont écrites avec des unités différentes.",
      "On convertit pour comparer dans la même unité.",
      "1 kg = 1000 g.",
      "Les deux masses sont égales."
    ),
    canvas: masseCanvas({
      variant: "balance",
      gauche: {
        label: "Sac A",
        icon: "📦",
        masse: "1 kg",
        grammes: 1000,
      },
      droite: {
        label: "Sac B",
        icon: "📦",
        masse: "1000 g",
        grammes: 1000,
      },
      questionLabel: "La balance est-elle équilibrée ?",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "comparer",
      "egalite",
      "qcm",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_masse_comparer_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment comparer 2 kg et 1500 g.",
    format: "open",
    expected: ["2", "2000", "1500", "g", "plus"],
    comparator: "contains_keyword",
    hint: "Convertis 2 kg en grammes.",
    explanation: exp(
      "Pour comparer des masses avec des unités différentes, il faut les mettre dans la même unité.",
      "On choisit par exemple les grammes.",
      "2 kg = 2000 g, et 2000 g est plus grand que 1500 g.",
      "Donc 2 kg est plus lourd que 1500 g."
    ),
    canvas: masseCanvas({
      variant: "balance",
      gauche: {
        label: "Sac A",
        icon: "📦",
        masse: "2 kg",
        grammes: 2000,
      },
      droite: {
        label: "Sac B",
        icon: "📦",
        masse: "1500 g",
        grammes: 1500,
      },
      questionLabel: "Explique quel sac est le plus lourd.",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "comparer",
      "open",
      "expliquer",
      "conversion",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_masse_comparer_tpl_001_g_g",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 1,
    theme: "neutral",
    hint: "Les deux masses sont en grammes.",
    tags: [
      "cm1",
      "masse",
      "comparer",
      "grammes",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const a = randomChoice([120, 250, 300, 450, 600, 750, 900]);
      const b = randomChoice([100, 200, 350, 500, 650, 800]);
      const gauche = a === b ? a + 100 : a;

      const correct = gauche > b ? `${gauche} g` : `${b} g`;

      return {
        text: `Quelle masse est la plus grande : ${gauche} g ou ${b} g ?`,
        format: "qcm",
        choices: [`${gauche} g`, `${b} g`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand deux masses ont la même unité, on compare les nombres.",
          "Ici, les deux masses sont en grammes.",
          `${Math.max(gauche, b)} est plus grand que ${Math.min(gauche, b)}.`,
          `La masse la plus grande est ${correct}.`
        ),
        canvas: masseCanvas({
          variant: "balance",
          gauche: {
            label: "Objet A",
            icon: "📦",
            masse: `${gauche} g`,
            grammes: gauche,
          },
          droite: {
            label: "Objet B",
            icon: "📦",
            masse: `${b} g`,
            grammes: b,
          },
          questionLabel: "Quel objet est le plus lourd ?",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_comparer_tpl_002_kg_g",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Convertis les kilogrammes en grammes.",
    tags: [
      "cm1",
      "masse",
      "comparer",
      "kg_g",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const kg = randomChoice([1, 2, 3, 4]);
      const g = randomChoice([750, 1200, 1800, 2500, 3500, 4500]);
      const kgEnG = kg * 1000;

      const correct = kgEnG > g ? `${kg} kg` : `${g} g`;

      return {
        text: `Quelle masse est la plus grande : ${kg} kg ou ${g} g ?`,
        format: "qcm",
        choices: [`${kg} kg`, `${g} g`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer des kilogrammes et des grammes, on convertit dans la même unité.",
          "On utilise 1 kg = 1000 g.",
          `${kg} kg = ${kgEnG} g. On compare donc ${kgEnG} g et ${g} g.`,
          `La masse la plus grande est ${correct}.`
        ),
        canvas: masseCanvas({
          variant: "balance",
          gauche: {
            label: "Masse A",
            icon: "⚖️",
            masse: `${kg} kg`,
            grammes: kgEnG,
          },
          droite: {
            label: "Masse B",
            icon: "⚖️",
            masse: `${g} g`,
            grammes: g,
          },
          questionLabel: "Quel côté est le plus lourd ?",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_comparer_tpl_003_egalite_kg_g",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "1 kg = 1000 g.",
    tags: [
      "cm1",
      "masse",
      "comparer",
      "egalite",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const kg = randomChoice([1, 2, 3, 4, 5]);
      const g = kg * 1000;
      const correct = "les deux masses sont égales";

      return {
        text: `Compare ${kg} kg et ${g} g.`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${kg} kg est plus lourd`,
          `${g} g est plus lourd`,
          "on ne peut pas comparer",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux masses peuvent être égales avec des écritures différentes.",
          "On convertit les kilogrammes en grammes.",
          `${kg} kg = ${g} g.`,
          "Les deux masses sont égales."
        ),
        canvas: masseCanvas({
          variant: "balance",
          gauche: {
            label: "Masse A",
            icon: "📦",
            masse: `${kg} kg`,
            grammes: g,
          },
          droite: {
            label: "Masse B",
            icon: "📦",
            masse: `${g} g`,
            grammes: g,
          },
          questionLabel: "La balance est-elle équilibrée ?",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_comparer_tpl_004_reunion_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 2,
    theme: "reunion",
    hint: "Compare les masses en grammes.",
    tags: [
      "cm1",
      "masse",
      "comparer",
      "reunion",
      "fruits",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const mangues = randomChoice([600, 800, 1000, 1200]);
      const letchis = randomChoice([500, 750, 900, 1300]);
      const correct = mangues > letchis ? "les mangues" : "les letchis";

      return {
        text: `Au marché de Saint-Pierre, un panier de mangues pèse ${mangues} g et un panier de letchis pèse ${letchis} g. Lequel est le plus lourd ?`,
        format: "qcm",
        choices: ["les mangues", "les letchis"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer deux masses exprimées dans la même unité, on compare les nombres.",
          "Les deux masses sont données en grammes.",
          `${Math.max(mangues, letchis)} g est plus grand que ${Math.min(mangues, letchis)} g.`,
          `Le panier le plus lourd est celui avec ${correct}.`
        ),
        canvas: masseCanvas({
          variant: "balance",
          gauche: {
            label: "Mangues",
            icon: "🥭",
            masse: `${mangues} g`,
            grammes: mangues,
          },
          droite: {
            label: "Letchis",
            icon: "🍒",
            masse: `${letchis} g`,
            grammes: letchis,
          },
          questionLabel: "Quel panier est le plus lourd ?",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_comparer_tpl_005_objets_ranger",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère l’objet le plus léger, puis le plus lourd.",
    tags: [
      "cm1",
      "masse",
      "comparer",
      "ranger",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const objects = [
        { label: "Gomme", icon: "🧽", masse: "20 g", grammes: 20 },
        { label: "Livre", icon: "📘", masse: "500 g", grammes: 500 },
        { label: "Cartable", icon: "🎒", masse: "4 kg", grammes: 4000 },
      ];

      const correct = "Gomme < Livre < Cartable";

      return {
        text: "Range ces objets du plus léger au plus lourd.",
        format: "qcm",
        choices: makeChoices(correct, [
          "Cartable < Livre < Gomme",
          "Livre < Gomme < Cartable",
          "Gomme < Cartable < Livre",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Ranger des masses demande de comparer toutes les valeurs.",
          "On peut convertir si nécessaire, puis classer du plus petit au plus grand.",
          "20 g < 500 g < 4000 g.",
          "L’ordre est : Gomme < Livre < Cartable."
        ),
        canvas: masseCanvas({
          variant: "objets",
          objets: objects,
          questionLabel: "Range les objets du plus léger au plus lourd.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_comparer_tpl_006_open_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique la conversion avant de comparer.",
    tags: [
      "cm1",
      "masse",
      "comparer",
      "open",
      "expliquer",
      "template",
      "canvas",
    ],
    generate: () => {
      const kg = randomChoice([1, 2, 3]);
      const g = randomChoice([700, 1500, 2500, 3500]);
      const kgEnG = kg * 1000;
      const bigger = kgEnG > g ? `${kg} kg` : `${g} g`;

      return {
        text: `Explique comment comparer ${kg} kg et ${g} g.`,
        format: "open",
        expected: [
          String(kg),
          String(kgEnG),
          String(g),
          "g",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour comparer deux masses avec des unités différentes, on les convertit dans une même unité.",
          "On peut convertir les kilogrammes en grammes.",
          `${kg} kg = ${kgEnG} g. On compare ${kgEnG} g et ${g} g.`,
          `La masse la plus grande est ${bigger}.`
        ),
        canvas: masseCanvas({
          variant: "balance",
          gauche: {
            label: "Masse A",
            icon: "📦",
            masse: `${kg} kg`,
            grammes: kgEnG,
          },
          droite: {
            label: "Masse B",
            icon: "📦",
            masse: `${g} g`,
            grammes: g,
          },
          questionLabel: "Explique la comparaison.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  // ============================================================
  // MASSE_CONVERTIR
  // Convertir des masses simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_masse_convertir_fixed_001_kg_g",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 3 kg en grammes.",
    format: "short",
    expected: ["3000", "3 000"],
    comparator: "number_equal",
    hint: "1 kg = 1000 g.",
    explanation: exp(
      "Convertir une masse, c’est l’écrire dans une autre unité.",
      "Pour passer des kilogrammes aux grammes, on multiplie par 1000.",
      "3 kg = 3 × 1000 g = 3000 g.",
      "3 kg = 3000 g."
    ),
    canvas: masseCanvas({
      variant: "conversion",
      from: "3 kg",
      to: "? g",
      questionLabel: "Convertis en grammes.",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "convertir",
      "kg_g",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_masse_convertir_fixed_002_g_kg",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 5000 g en kilogrammes.",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "1000 g = 1 kg.",
    explanation: exp(
      "Pour convertir des grammes en kilogrammes, on regroupe les grammes par paquets de 1000.",
      "On divise le nombre de grammes par 1000.",
      "5000 ÷ 1000 = 5.",
      "5000 g = 5 kg."
    ),
    canvas: masseCanvas({
      variant: "conversion",
      from: "5000 g",
      to: "? kg",
      questionLabel: "Convertis en kilogrammes.",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "convertir",
      "g_kg",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_masse_convertir_fixed_003_t_kg",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Convertis 2 t en kilogrammes.",
    format: "short",
    expected: ["2000", "2 000"],
    comparator: "number_equal",
    hint: "1 t = 1000 kg.",
    explanation: exp(
      "La tonne est une unité utilisée pour les masses très grandes.",
      "Pour passer des tonnes aux kilogrammes, on multiplie par 1000.",
      "2 t = 2 × 1000 kg = 2000 kg.",
      "2 t = 2000 kg."
    ),
    tags: [
      "cm1",
      "masse",
      "convertir",
      "t_kg",
      "short",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_masse_convertir_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment convertir 2500 g en kilogrammes.",
    format: "open",
    expected: ["2500", "1000", "2,5", "kg"],
    comparator: "contains_keyword",
    hint: "1000 g = 1 kg.",
    explanation: exp(
      "Pour convertir des grammes en kilogrammes, on utilise l’égalité 1000 g = 1 kg.",
      "On divise le nombre de grammes par 1000.",
      "2500 ÷ 1000 = 2,5.",
      "2500 g = 2,5 kg."
    ),
    canvas: masseCanvas({
      variant: "conversion",
      from: "2500 g",
      to: "? kg",
      questionLabel: "Explique la conversion.",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "convertir",
      "open",
      "expliquer",
      "g_kg",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_masse_convertir_tpl_001_kg_g",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour passer des kilogrammes aux grammes, multiplie par 1000.",
    tags: [
      "cm1",
      "masse",
      "convertir",
      "kg_g",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const kg = randomChoice([1, 2, 3, 4, 5, 6, 8, 10]);
      const g = kg * 1000;

      return {
        text: `Convertis ${kg} kg en grammes.`,
        format: "short",
        expected: [String(g)],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des kilogrammes en grammes, on utilise 1 kg = 1000 g.",
          "On multiplie le nombre de kilogrammes par 1000.",
          `${kg} × 1000 = ${g}.`,
          `${kg} kg = ${g} g.`
        ),
        canvas: masseCanvas({
          variant: "conversion",
          from: `${kg} kg`,
          to: "? g",
          questionLabel: "Convertis en grammes.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_convertir_tpl_002_g_kg_entier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour passer des grammes aux kilogrammes, divise par 1000.",
    tags: [
      "cm1",
      "masse",
      "convertir",
      "g_kg",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const kg = randomChoice([1, 2, 3, 4, 5, 6, 8]);
      const g = kg * 1000;

      return {
        text: `Convertis ${g} g en kilogrammes.`,
        format: "short",
        expected: [String(kg)],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des grammes en kilogrammes, on utilise 1000 g = 1 kg.",
          "On divise le nombre de grammes par 1000.",
          `${g} ÷ 1000 = ${kg}.`,
          `${g} g = ${kg} kg.`
        ),
        canvas: masseCanvas({
          variant: "conversion",
          from: `${g} g`,
          to: "? kg",
          questionLabel: "Convertis en kilogrammes.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_convertir_tpl_003_g_kg_decimal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise par 1000.",
    tags: [
      "cm1",
      "masse",
      "convertir",
      "decimal",
      "g_kg",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const g = randomChoice([500, 1500, 2500, 3500, 4500, 750]);
      const kg = g / 1000;
      const correct = `${formatKg(kg)} kg`;

      return {
        text: `Convertis ${g} g en kilogrammes.`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${g * 1000} kg`,
          `${g / 100} kg`,
          `${g + 1000} kg`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour convertir des grammes en kilogrammes, on divise par 1000.",
          "Le résultat peut être un nombre décimal.",
          `${g} ÷ 1000 = ${formatKg(kg)}.`,
          `${g} g = ${correct}.`
        ),
        canvas: masseCanvas({
          variant: "conversion",
          from: `${g} g`,
          to: "? kg",
          questionLabel: "Choisis la bonne conversion.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_convertir_tpl_004_t_kg",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "1 t = 1000 kg.",
    tags: [
      "cm1",
      "masse",
      "convertir",
      "t_kg",
      "template",
      "short",
    ],
    generate: () => {
      const tonnes = randomChoice([1, 2, 3, 4, 5]);
      const kg = tonnes * 1000;

      return {
        text: `Convertis ${tonnes} t en kilogrammes.`,
        format: "short",
        expected: [String(kg)],
        comparator: "number_equal",
        explanation: exp(
          "La tonne sert à exprimer de très grandes masses.",
          "Pour convertir des tonnes en kilogrammes, on multiplie par 1000.",
          `${tonnes} × 1000 = ${kg}.`,
          `${tonnes} t = ${kg} kg.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_convertir_tpl_005_kg_t_entier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "1000 kg = 1 t.",
    tags: [
      "cm1",
      "masse",
      "convertir",
      "kg_t",
      "template",
      "short",
    ],
    generate: () => {
      const tonnes = randomChoice([1, 2, 3, 4, 5]);
      const kg = tonnes * 1000;

      return {
        text: `Convertis ${kg} kg en tonnes.`,
        format: "short",
        expected: [String(tonnes)],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des kilogrammes en tonnes, on utilise 1000 kg = 1 t.",
          "On divise le nombre de kilogrammes par 1000.",
          `${kg} ÷ 1000 = ${tonnes}.`,
          `${kg} kg = ${tonnes} t.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_convertir_tpl_006_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 2,
    theme: "reunion",
    hint: "Convertis les kilogrammes en grammes.",
    tags: [
      "cm1",
      "masse",
      "convertir",
      "reunion",
      "marche",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const kg = randomChoice([1, 2, 3, 4]);
      const g = kg * 1000;

      return {
        text: `Au marché de Saint-Pierre, un sac de fruits pèse ${kg} kg. Quelle est sa masse en grammes ?`,
        format: "short",
        expected: [String(g)],
        comparator: "number_equal",
        explanation: exp(
          "Pour exprimer une masse en grammes, on convertit les kilogrammes.",
          "On utilise 1 kg = 1000 g.",
          `${kg} kg = ${kg} × 1000 g = ${g} g.`,
          `Le sac pèse ${g} g.`
        ),
        canvas: masseCanvas({
          variant: "conversion",
          from: `${kg} kg`,
          to: "? g",
          questionLabel: "Convertis la masse du sac en grammes.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_convertir_tpl_007_qcm_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Choisis l’opération qui respecte 1 kg = 1000 g.",
    tags: [
      "cm1",
      "masse",
      "convertir",
      "operation",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const kg = randomChoice([2, 3, 4, 5, 6]);
      const correct = `${kg} × 1000`;

      return {
        text: `Quel calcul permet de convertir ${kg} kg en grammes ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${kg} + 1000`,
          `${kg} ÷ 1000`,
          `${kg} × 100`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour convertir des kilogrammes en grammes, on multiplie par 1000.",
          "Chaque kilogramme contient 1000 grammes.",
          `${kg} kg = ${kg} × 1000 g = ${kg * 1000} g.`,
          `Le bon calcul est ${correct}.`
        ),
        canvas: masseCanvas({
          variant: "conversion",
          from: `${kg} kg`,
          to: "? g",
          questionLabel: "Quel calcul faut-il faire ?",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_convertir_tpl_008_open_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 4,
    theme: "neutral",
    hint: "Indique l’égalité d’unités utilisée.",
    tags: [
      "cm1",
      "masse",
      "convertir",
      "open",
      "expliquer",
      "template",
      "canvas",
    ],
    generate: () => {
      const kg = randomChoice([2, 3, 4, 5]);
      const g = kg * 1000;

      return {
        text: `Explique comment convertir ${kg} kg en grammes.`,
        format: "open",
        expected: [
          String(kg),
          "1000",
          String(g),
          "g",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour expliquer une conversion, on donne l’égalité d’unités utilisée.",
          "On sait que 1 kg = 1000 g.",
          `${kg} × 1000 = ${g}.`,
          `${kg} kg = ${g} g.`
        ),
        canvas: masseCanvas({
          variant: "conversion",
          from: `${kg} kg`,
          to: "? g",
          questionLabel: "Explique la conversion.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },
    // ============================================================
  // MASSE_ESTIMER
  // Estimer une masse
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_masse_estimer_fixed_001_unite_adaptee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la masse d’une pomme ?",
    format: "qcm",
    choices: ["g", "kg", "t", "km"],
    expected: ["g"],
    comparator: "mcq_exact",
    hint: "Une pomme est un petit objet : elle ne pèse pas plusieurs kilogrammes.",
    explanation: exp(
      "Estimer une masse, c’est choisir une valeur ou une unité raisonnable.",
      "On pense à la taille et au poids habituel de l’objet.",
      "Une pomme pèse souvent quelques centaines de grammes.",
      "L’unité la plus adaptée est le gramme."
    ),
    canvas: masseCanvas({
      variant: "estimation",
      objet: {
        label: "Pomme",
        icon: "🍎",
      },
      choix: ["150 g", "15 kg", "2 t"],
      questionLabel: "Quelle masse semble raisonnable ?",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "estimer",
      "unite",
      "qcm",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_masse_estimer_fixed_002_cartable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle estimation est la plus raisonnable pour la masse d’un cartable rempli ?",
    format: "qcm",
    choices: ["4 kg", "4 g", "4 t", "400 kg"],
    expected: ["4 kg"],
    comparator: "mcq_exact",
    hint: "Un cartable est plus lourd qu’une gomme, mais beaucoup moins lourd qu’une voiture.",
    explanation: exp(
      "Une estimation doit être cohérente avec l’objet.",
      "Un cartable rempli est assez lourd pour se mesurer en kilogrammes.",
      "4 g est trop léger et 4 t est beaucoup trop lourd.",
      "Une estimation raisonnable est 4 kg."
    ),
    canvas: masseCanvas({
      variant: "estimation",
      objet: {
        label: "Cartable",
        icon: "🎒",
      },
      choix: ["4 g", "4 kg", "4 t"],
      questionLabel: "Choisis la masse la plus raisonnable.",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "estimer",
      "ordre_grandeur",
      "qcm",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_masse_estimer_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 3 tonnes n’est pas une estimation raisonnable pour la masse d’un cahier.",
    format: "open",
    expected: ["tonnes", "cahier", "trop lourd", "g", "kg"],
    comparator: "contains_keyword",
    hint: "Compare un cahier avec une voiture ou un camion.",
    explanation: exp(
      "Une estimation doit rester plausible.",
      "Un cahier est un objet léger, il se mesure plutôt en grammes.",
      "3 tonnes correspond à une masse très grande, comme un véhicule lourd.",
      "3 tonnes est donc beaucoup trop lourd pour un cahier."
    ),
    canvas: masseCanvas({
      variant: "estimation",
      objet: {
        label: "Cahier",
        icon: "📒",
      },
      choix: ["200 g", "3 t", "20 kg"],
      questionLabel: "Explique pourquoi 3 t est impossible.",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "estimer",
      "open",
      "expliquer",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_masse_estimer_tpl_001_choisir_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 1,
    theme: "neutral",
    hint: "Choisis l’unité adaptée à l’objet.",
    tags: [
      "cm1",
      "masse",
      "estimer",
      "unite",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const item = randomChoice([
        {
          objet: "une gomme",
          icon: "🧽",
          correct: "g",
          wrongs: ["kg", "t", "km"],
          explanationText: "Une gomme est très légère : on utilise les grammes.",
        },
        {
          objet: "un cartable rempli",
          icon: "🎒",
          correct: "kg",
          wrongs: ["g seulement", "t", "m"],
          explanationText:
            "Un cartable rempli pèse souvent plusieurs kilogrammes.",
        },
        {
          objet: "un camion",
          icon: "🚚",
          correct: "t",
          wrongs: ["g", "cm", "mg"],
          explanationText:
            "Un camion a une très grande masse : on peut utiliser la tonne.",
        },
        {
          objet: "une mangue",
          icon: "🥭",
          correct: "g",
          wrongs: ["t", "km", "m"],
          explanationText:
            "Une mangue pèse quelques centaines de grammes.",
        },
      ]);

      return {
        text: `Quelle unité est la plus adaptée pour estimer la masse de ${item.objet} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour estimer une masse, il faut choisir une unité adaptée.",
          "On pense à l’objet réel et à son ordre de grandeur.",
          item.explanationText,
          `L’unité adaptée est ${item.correct}.`
        ),
        canvas: masseCanvas({
          variant: "estimation",
          objet: {
            label: item.objet,
            icon: item.icon,
          },
          choix: [item.correct, ...item.wrongs.slice(0, 2)],
          questionLabel: "Quelle unité semble la plus adaptée ?",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_estimer_tpl_002_choisir_masse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 2,
    theme: "neutral",
    hint: "Élimine les masses beaucoup trop petites ou beaucoup trop grandes.",
    tags: [
      "cm1",
      "masse",
      "estimer",
      "ordre_grandeur",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const item = randomChoice([
        {
          objet: "une pomme",
          icon: "🍎",
          correct: "150 g",
          wrongs: ["150 kg", "150 t", "1 g"],
          conclusion: "Une pomme pèse souvent quelques centaines de grammes.",
        },
        {
          objet: "un livre",
          icon: "📘",
          correct: "500 g",
          wrongs: ["500 kg", "5 t", "5 g"],
          conclusion: "Un livre peut peser environ 500 g.",
        },
        {
          objet: "un cartable rempli",
          icon: "🎒",
          correct: "4 kg",
          wrongs: ["4 g", "4 t", "400 kg"],
          conclusion: "Un cartable rempli peut peser quelques kilogrammes.",
        },
        {
          objet: "une voiture",
          icon: "🚗",
          correct: "1 t",
          wrongs: ["1 g", "1 kg", "10 g"],
          conclusion: "Une voiture se mesure plutôt en tonnes.",
        },
      ]);

      return {
        text: `Quelle estimation est la plus raisonnable pour la masse de ${item.objet} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Estimer une masse, c’est choisir une valeur plausible.",
          "On compare avec des objets que l’on connaît.",
          item.conclusion,
          `L’estimation raisonnable est ${item.correct}.`
        ),
        canvas: masseCanvas({
          variant: "estimation",
          objet: {
            label: item.objet,
            icon: item.icon,
          },
          choix: [item.correct, ...item.wrongs.slice(0, 2)],
          questionLabel: "Choisis la masse la plus raisonnable.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_estimer_tpl_003_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 2,
    theme: "reunion",
    hint: "Un fruit se mesure souvent en grammes, un gros sac en kilogrammes.",
    tags: [
      "cm1",
      "masse",
      "estimer",
      "reunion",
      "marche",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const item = randomChoice([
        {
          objet: "une mangue",
          icon: "🥭",
          correct: "300 g",
          wrongs: ["300 kg", "3 t", "3 g"],
          conclusion: "Une mangue peut peser environ 300 g.",
        },
        {
          objet: "un sac de letchis",
          icon: "🍒",
          correct: "2 kg",
          wrongs: ["2 g", "2 t", "200 kg"],
          conclusion: "Un sac de fruits peut peser quelques kilogrammes.",
        },
        {
          objet: "un petit ananas",
          icon: "🍍",
          correct: "1 kg",
          wrongs: ["1 g", "1 t", "100 kg"],
          conclusion: "Un petit ananas peut peser environ 1 kg.",
        },
      ]);

      return {
        text: `Au marché de Saint-Pierre, quelle masse est raisonnable pour ${item.objet} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour estimer une masse, on choisit une valeur réaliste.",
          "On pense à l’objet et à son ordre de grandeur.",
          item.conclusion,
          `La masse raisonnable est ${item.correct}.`
        ),
        canvas: masseCanvas({
          variant: "estimation",
          objet: {
            label: item.objet,
            icon: item.icon,
          },
          choix: [item.correct, ...item.wrongs.slice(0, 2)],
          questionLabel: "Choisis la masse la plus raisonnable.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_estimer_tpl_004_open_justifier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique pourquoi l’estimation est trop petite ou trop grande.",
    tags: [
      "cm1",
      "masse",
      "estimer",
      "open",
      "justifier",
      "template",
      "canvas",
    ],
    generate: () => {
      const item = randomChoice([
        {
          objet: "une gomme",
          icon: "🧽",
          mauvaise: "5 kg",
          bonne: "20 g",
          mots: ["gomme", "kg", "g", "trop lourd"],
        },
        {
          objet: "un camion",
          icon: "🚚",
          mauvaise: "5 g",
          bonne: "5 t",
          mots: ["camion", "g", "t", "trop léger"],
        },
        {
          objet: "un cahier",
          icon: "📒",
          mauvaise: "2 t",
          bonne: "200 g",
          mots: ["cahier", "t", "g", "trop lourd"],
        },
      ]);

      return {
        text: `Explique pourquoi ${item.mauvaise} n’est pas une estimation raisonnable pour ${item.objet}.`,
        format: "open",
        expected: item.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Une estimation doit être cohérente avec l’objet.",
          "On compare la masse proposée avec une masse plus réaliste.",
          `${item.mauvaise} ne convient pas pour ${item.objet}. Une estimation plus raisonnable serait ${item.bonne}.`,
          "Il faut choisir une masse adaptée à l’objet."
        ),
        canvas: masseCanvas({
          variant: "estimation",
          objet: {
            label: item.objet,
            icon: item.icon,
          },
          choix: [item.mauvaise, item.bonne, "100 kg"],
          questionLabel: "Explique quelle estimation est raisonnable.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  // ============================================================
  // MASSE_MESURER
  // Lire ou déterminer une masse dans une situation simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_masse_mesurer_fixed_001_balance_egalite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Une balance est équilibrée : à gauche il y a un sac, à droite il y a 1 kg. Quelle est la masse du sac ?",
    format: "short",
    expected: ["1", "1000"],
    comparator: "number_equal",
    hint: "Si la balance est équilibrée, les deux côtés ont la même masse.",
    explanation: exp(
      "Sur une balance équilibrée, les deux côtés ont la même masse.",
      "On lit la masse connue sur le côté droit.",
      "À droite, il y a 1 kg, donc le sac pèse aussi 1 kg.",
      "La masse du sac est 1 kg."
    ),
    canvas: masseCanvas({
      variant: "balance",
      gauche: {
        label: "Sac",
        icon: "📦",
        masse: "?",
        grammes: 1000,
      },
      droite: {
        label: "Masse",
        icon: "⚖️",
        masse: "1 kg",
        grammes: 1000,
      },
      questionLabel: "La balance est équilibrée : quelle est la masse du sac ?",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "mesurer",
      "balance",
      "egalite",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_masse_mesurer_fixed_002_objets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Un paquet pèse 750 g. Quelle est sa masse en grammes ?",
    format: "short",
    expected: ["750"],
    comparator: "number_equal",
    hint: "La masse est déjà donnée en grammes.",
    explanation: exp(
      "Mesurer ou lire une masse, c’est identifier la valeur donnée.",
      "Ici, la masse est déjà écrite en grammes.",
      "Le paquet pèse 750 g.",
      "La réponse est 750 g."
    ),
    canvas: masseCanvas({
      variant: "objets",
      objets: [
        {
          label: "Paquet",
          icon: "📦",
          masse: "750 g",
          grammes: 750,
        },
      ],
      questionLabel: "Lis la masse du paquet.",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "mesurer",
      "lecture",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_masse_mesurer_open_001_expliquer_balance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_mesurer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi, si une balance est équilibrée avec un sac à gauche et 500 g à droite, le sac pèse 500 g.",
    format: "open",
    expected: ["balance", "équilibrée", "même masse", "500"],
    comparator: "contains_keyword",
    hint: "Une balance équilibrée signifie que les deux côtés ont la même masse.",
    explanation: exp(
      "Une balance équilibrée indique une égalité de masses.",
      "Si les deux côtés sont au même niveau, ils ont la même masse.",
      "À droite, il y a 500 g.",
      "Donc le sac à gauche pèse 500 g."
    ),
    canvas: masseCanvas({
      variant: "balance",
      gauche: {
        label: "Sac",
        icon: "📦",
        masse: "?",
        grammes: 500,
      },
      droite: {
        label: "Masse",
        icon: "⚖️",
        masse: "500 g",
        grammes: 500,
      },
      questionLabel: "Explique ce que montre la balance.",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "mesurer",
      "open",
      "balance",
      "expliquer",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_masse_mesurer_tpl_001_lire_objet",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_mesurer",
    difficulty: 1,
    theme: "neutral",
    hint: "Lis la masse affichée sous l’objet.",
    tags: [
      "cm1",
      "masse",
      "mesurer",
      "lecture",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const item = randomChoice([
        { label: "Livre", icon: "📘", masse: "500 g", grammes: 500 },
        { label: "Pomme", icon: "🍎", masse: "150 g", grammes: 150 },
        { label: "Cartable", icon: "🎒", masse: "4 kg", grammes: 4000 },
        { label: "Paquet", icon: "📦", masse: "750 g", grammes: 750 },
      ]);

      return {
        text: `Lis la masse de l’objet : quelle est la masse de ${item.label.toLowerCase()} ?`,
        format: "qcm",
        choices: makeChoices(item.masse, ["10 t", "1 cm", "2 L"]),
        expected: [item.masse],
        comparator: "mcq_exact",
        explanation: exp(
          "Lire une masse, c’est repérer la valeur associée à l’objet.",
          "On observe l’étiquette de masse.",
          `${item.label} a pour masse ${item.masse}.`,
          `La réponse est ${item.masse}.`
        ),
        canvas: masseCanvas({
          variant: "objets",
          objets: [item],
          questionLabel: "Lis la masse affichée.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_mesurer_tpl_002_balance_egalite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_mesurer",
    difficulty: 2,
    theme: "neutral",
    hint: "Si la balance est équilibrée, les masses sont égales.",
    tags: [
      "cm1",
      "masse",
      "mesurer",
      "balance",
      "egalite",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const masse = randomChoice([
        { texte: "250 g", grammes: 250 },
        { texte: "500 g", grammes: 500 },
        { texte: "750 g", grammes: 750 },
        { texte: "1 kg", grammes: 1000 },
        { texte: "2 kg", grammes: 2000 },
      ]);

      return {
        text: `Une balance est équilibrée : à gauche il y a un sac, à droite il y a ${masse.texte}. Quelle est la masse du sac ?`,
        format: "short",
        expected: [masse.texte.replace(" kg", "").replace(" g", ""), String(masse.grammes)],
        comparator: "number_equal",
        explanation: exp(
          "Une balance équilibrée indique que les deux côtés ont la même masse.",
          "On lit la masse connue sur le côté droit.",
          `À droite, il y a ${masse.texte}.`,
          `Le sac pèse donc ${masse.texte}.`
        ),
        canvas: masseCanvas({
          variant: "balance",
          gauche: {
            label: "Sac",
            icon: "📦",
            masse: "?",
            grammes: masse.grammes,
          },
          droite: {
            label: "Masse",
            icon: "⚖️",
            masse: masse.texte,
            grammes: masse.grammes,
          },
          questionLabel: "La balance est équilibrée.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_mesurer_tpl_003_balance_somme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_mesurer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les masses du même côté.",
    tags: [
      "cm1",
      "masse",
      "mesurer",
      "balance",
      "addition",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const a = randomChoice([200, 250, 300, 500]);
      const b = randomChoice([100, 200, 250, 500]);
      const total = a + b;

      return {
        text: `Un sac est équilibré avec deux masses : ${a} g et ${b} g. Quelle est la masse du sac ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Sur une balance équilibrée, les deux côtés ont la même masse.",
          "Si un côté contient plusieurs masses, on les additionne.",
          `${a} + ${b} = ${total}.`,
          `Le sac pèse ${total} g.`
        ),
        canvas: masseCanvas({
          variant: "balance",
          gauche: {
            label: "Sac",
            icon: "📦",
            masse: "?",
            grammes: total,
          },
          droite: {
            label: "Masses",
            icon: "⚖️",
            masse: `${a} g + ${b} g`,
            grammes: total,
          },
          questionLabel: "La balance est équilibrée : trouve la masse du sac.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_mesurer_tpl_004_reunion_panier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_mesurer",
    difficulty: 3,
    theme: "reunion",
    hint: "Lis la masse du panier sur le dessin.",
    tags: [
      "cm1",
      "masse",
      "mesurer",
      "reunion",
      "marche",
      "template",
      "qcm",
      "canvas",
    ],
    generate: () => {
      const masse = randomChoice([
        { texte: "800 g", grammes: 800 },
        { texte: "1 kg", grammes: 1000 },
        { texte: "2 kg", grammes: 2000 },
      ]);

      return {
        text: `Au marché de Saint-Pierre, un panier de fruits est affiché avec une masse de ${masse.texte}. Quelle est sa masse ?`,
        format: "qcm",
        choices: makeChoices(masse.texte, ["2 L", "50 cm", "3 km"]),
        expected: [masse.texte],
        comparator: "mcq_exact",
        explanation: exp(
          "Lire une masse, c’est repérer la valeur écrite avec l’objet.",
          "On observe l’étiquette du panier.",
          `Le panier est indiqué à ${masse.texte}.`,
          `Sa masse est ${masse.texte}.`
        ),
        canvas: masseCanvas({
          variant: "objets",
          objets: [
            {
              label: "Panier de fruits",
              icon: "🧺",
              masse: masse.texte,
              grammes: masse.grammes,
            },
          ],
          questionLabel: "Lis la masse du panier.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_mesurer_tpl_005_open_balance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_mesurer",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique que les deux côtés ont la même masse.",
    tags: [
      "cm1",
      "masse",
      "mesurer",
      "open",
      "balance",
      "template",
      "canvas",
    ],
    generate: () => {
      const a = randomChoice([200, 250, 500]);
      const b = randomChoice([100, 250, 500]);
      const total = a + b;

      return {
        text: `Explique comment trouver la masse d’un sac équilibré avec deux masses de ${a} g et ${b} g.`,
        format: "open",
        expected: [
          String(a),
          String(b),
          String(total),
          "addition",
          "équilibrée",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Une balance équilibrée signifie que les deux côtés ont la même masse.",
          "On additionne les masses connues.",
          `${a} + ${b} = ${total}.`,
          `Le sac pèse ${total} g.`
        ),
        canvas: masseCanvas({
          variant: "balance",
          gauche: {
            label: "Sac",
            icon: "📦",
            masse: "?",
            grammes: total,
          },
          droite: {
            label: "Masses",
            icon: "⚖️",
            masse: `${a} g + ${b} g`,
            grammes: total,
          },
          questionLabel: "Explique la méthode.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },
    // ============================================================
  // MASSE_DEFI
  // Résoudre un défi sur les masses
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_masse_defi_fixed_001_marche_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi marché : un panier de mangues pèse 1 kg et un sac de letchis pèse 750 g. Quelle est la masse totale en grammes ?",
    format: "short",
    expected: ["1750", "1 750"],
    comparator: "number_equal",
    hint: "Convertis 1 kg en grammes, puis additionne.",
    explanation: exp(
      "Pour additionner des masses, elles doivent être dans la même unité.",
      "On convertit d’abord les kilogrammes en grammes.",
      "1 kg = 1000 g, donc 1000 + 750 = 1750.",
      "La masse totale est 1750 g."
    ),
    canvas: masseCanvas({
      variant: "objets",
      objets: [
        {
          label: "Mangues",
          icon: "🥭",
          masse: "1 kg",
          grammes: 1000,
        },
        {
          label: "Letchis",
          icon: "🍒",
          masse: "750 g",
          grammes: 750,
        },
      ],
      questionLabel: "Calcule la masse totale en grammes.",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "defi",
      "reunion",
      "marche",
      "addition",
      "conversion",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_masse_defi_fixed_002_reste",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : un sac contient 2 kg de riz. On utilise 650 g. Quelle masse de riz reste-t-il en grammes ?",
    format: "short",
    expected: ["1350", "1 350"],
    comparator: "number_equal",
    hint: "Convertis 2 kg en grammes avant de soustraire.",
    explanation: exp(
      "Pour soustraire des masses, elles doivent être dans la même unité.",
      "On convertit les kilogrammes en grammes, puis on soustrait la masse utilisée.",
      "2 kg = 2000 g, donc 2000 - 650 = 1350.",
      "Il reste 1350 g de riz."
    ),
    canvas: masseCanvas({
      variant: "objets",
      objets: [
        {
          label: "Sac de riz au départ",
          icon: "🍚",
          masse: "2 kg",
          grammes: 2000,
        },
        {
          label: "Riz utilisé",
          icon: "🥣",
          masse: "650 g",
          grammes: 650,
        },
      ],
      questionLabel: "Quelle masse reste-t-il en grammes ?",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "defi",
      "soustraction",
      "conversion",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_masse_defi_open_001_expliquer_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève calcule 2 kg + 500 g et répond 502 g. Explique son erreur.",
    format: "open",
    expected: ["2", "2000", "500", "2500", "conversion"],
    comparator: "contains_keyword",
    hint: "On ne peut pas additionner directement 2 et 500 sans convertir.",
    explanation: exp(
      "Pour additionner des masses, il faut utiliser la même unité.",
      "L’élève a mélangé kilogrammes et grammes sans convertir.",
      "2 kg = 2000 g, donc 2000 g + 500 g = 2500 g.",
      "La bonne réponse est 2500 g, pas 502 g."
    ),
    canvas: masseCanvas({
      variant: "conversion",
      from: "2 kg + 500 g",
      to: "? g",
      questionLabel: "Explique l’erreur de conversion.",
      display: {
        showMasses: true,
        showLabels: true,
        showComparison: true,
      },
    }),
    tags: [
      "cm1",
      "masse",
      "defi",
      "open",
      "erreur",
      "conversion",
      "addition",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_masse_defi_tpl_001_addition_kg_g",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Convertis les kilogrammes en grammes avant d’additionner.",
    tags: [
      "cm1",
      "masse",
      "defi",
      "addition",
      "kg_g",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const kg = randomChoice([1, 2, 3, 4]);
      const g = randomChoice([250, 500, 650, 750, 900]);
      const total = kg * 1000 + g;

      return {
        text: `Défi : un sac pèse ${kg} kg et un paquet pèse ${g} g. Quelle est la masse totale en grammes ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour additionner des masses, elles doivent être dans la même unité.",
          "On convertit les kilogrammes en grammes, puis on additionne.",
          `${kg} kg = ${kg * 1000} g, donc ${kg * 1000} + ${g} = ${total}.`,
          `La masse totale est ${total} g.`
        ),
        canvas: masseCanvas({
          variant: "objets",
          objets: [
            {
              label: "Sac",
              icon: "📦",
              masse: `${kg} kg`,
              grammes: kg * 1000,
            },
            {
              label: "Paquet",
              icon: "📦",
              masse: `${g} g`,
              grammes: g,
            },
          ],
          questionLabel: "Calcule la masse totale en grammes.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_defi_tpl_002_soustraction_kg_g",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Convertis d’abord la masse totale en grammes.",
    tags: [
      "cm1",
      "masse",
      "defi",
      "soustraction",
      "kg_g",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const kg = randomChoice([1, 2, 3, 4, 5]);
      const retire = randomChoice([150, 250, 400, 500, 750]);
      const depart = kg * 1000;
      const reste = depart - retire;

      return {
        text: `Défi : un sac contient ${kg} kg de farine. On utilise ${retire} g. Quelle masse reste-t-il en grammes ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Pour soustraire des masses, elles doivent être dans la même unité.",
          "On convertit les kilogrammes en grammes, puis on soustrait la masse utilisée.",
          `${kg} kg = ${depart} g, donc ${depart} - ${retire} = ${reste}.`,
          `Il reste ${reste} g.`
        ),
        canvas: masseCanvas({
          variant: "objets",
          objets: [
            {
              label: "Farine au départ",
              icon: "🌾",
              masse: `${kg} kg`,
              grammes: depart,
            },
            {
              label: "Farine utilisée",
              icon: "🥣",
              masse: `${retire} g`,
              grammes: retire,
            },
          ],
          questionLabel: "Quelle masse reste-t-il en grammes ?",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_defi_tpl_003_balance_inconnue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Si la balance est équilibrée, les deux côtés ont la même masse.",
    tags: [
      "cm1",
      "masse",
      "defi",
      "balance",
      "inconnue",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const total = randomChoice([500, 750, 1000, 1250, 1500]);
      const ajout = randomChoice([100, 200, 250, 500]);
      const sac = total - ajout;

      if (sac <= 0) {
        return {
          text: "Défi : une balance est équilibrée. À gauche, il y a un sac et 200 g. À droite, il y a 1 kg. Quelle est la masse du sac en grammes ?",
          format: "short",
          expected: ["800"],
          comparator: "number_equal",
          explanation: exp(
            "Une balance équilibrée indique que les deux côtés ont la même masse.",
            "On enlève la masse connue du côté gauche pour trouver la masse du sac.",
            "1 kg = 1000 g, donc 1000 - 200 = 800.",
            "Le sac pèse 800 g."
          ),
          canvas: masseCanvas({
            variant: "balance",
            gauche: {
              label: "Sac + masse",
              icon: "📦",
              masse: "? + 200 g",
              grammes: 1000,
            },
            droite: {
              label: "Masse",
              icon: "⚖️",
              masse: "1 kg",
              grammes: 1000,
            },
            questionLabel: "La balance est équilibrée : trouve la masse du sac.",
            display: {
              showMasses: true,
              showLabels: true,
              showComparison: true,
            },
          }),
        };
      }

      return {
        text: `Défi : une balance est équilibrée. À gauche, il y a un sac et ${ajout} g. À droite, il y a ${total} g. Quelle est la masse du sac ?`,
        format: "short",
        expected: [String(sac)],
        comparator: "number_equal",
        explanation: exp(
          "Une balance équilibrée signifie que les deux côtés ont la même masse.",
          "On soustrait la masse déjà connue à la masse totale.",
          `${total} - ${ajout} = ${sac}.`,
          `Le sac pèse ${sac} g.`
        ),
        canvas: masseCanvas({
          variant: "balance",
          gauche: {
            label: "Sac + masse",
            icon: "📦",
            masse: `? + ${ajout} g`,
            grammes: total,
          },
          droite: {
            label: "Masse",
            icon: "⚖️",
            masse: `${total} g`,
            grammes: total,
          },
          questionLabel: "La balance est équilibrée : trouve la masse du sac.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_defi_tpl_004_reunion_fruits_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Mets toutes les masses en grammes avant de calculer.",
    tags: [
      "cm1",
      "masse",
      "defi",
      "reunion",
      "fruits",
      "marche",
      "addition",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const kg = randomChoice([1, 2, 3]);
      const g = randomChoice([250, 500, 750, 900]);
      const total = kg * 1000 + g;

      return {
        text: `Au marché de Saint-Pierre, Maël achète ${kg} kg de mangues et ${g} g de letchis. Quelle masse totale de fruits a-t-il achetée en grammes ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour additionner des masses, on utilise une même unité.",
          "On convertit les kilogrammes en grammes, puis on additionne.",
          `${kg} kg = ${kg * 1000} g. Donc ${kg * 1000} + ${g} = ${total}.`,
          `Maël a acheté ${total} g de fruits.`
        ),
        canvas: masseCanvas({
          variant: "objets",
          objets: [
            {
              label: "Mangues",
              icon: "🥭",
              masse: `${kg} kg`,
              grammes: kg * 1000,
            },
            {
              label: "Letchis",
              icon: "🍒",
              masse: `${g} g`,
              grammes: g,
            },
          ],
          questionLabel: "Calcule la masse totale en grammes.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_defi_tpl_005_reunion_comparer_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule les deux masses en grammes avant de comparer.",
    tags: [
      "cm1",
      "masse",
      "defi",
      "reunion",
      "comparer",
      "addition",
      "template",
      "qcm",
      "canvas",
    ],
    generate: () => {
      const manguesKg = randomChoice([1, 2]);
      const manguesG = randomChoice([250, 500, 750]);
      const letchisKg = randomChoice([1, 2]);
      const letchisG = randomChoice([100, 300, 600, 900]);

      const totalMangues = manguesKg * 1000 + manguesG;
      const totalLetchis = letchisKg * 1000 + letchisG;

      const correct =
        totalMangues > totalLetchis
          ? "les mangues"
          : totalLetchis > totalMangues
            ? "les letchis"
            : "les deux masses sont égales";

      return {
        text: `Défi marché : un panier de mangues pèse ${manguesKg} kg ${manguesG} g. Un panier de letchis pèse ${letchisKg} kg ${letchisG} g. Quel panier est le plus lourd ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "les mangues",
          "les letchis",
          "les deux masses sont égales",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer des masses composées, on les convertit en grammes.",
          "On calcule chaque masse totale en grammes.",
          `Mangues : ${manguesKg * 1000} + ${manguesG} = ${totalMangues} g. Letchis : ${letchisKg * 1000} + ${letchisG} = ${totalLetchis} g.`,
          `La bonne réponse est : ${correct}.`
        ),
        canvas: masseCanvas({
          variant: "balance",
          gauche: {
            label: "Mangues",
            icon: "🥭",
            masse: `${manguesKg} kg ${manguesG} g`,
            grammes: totalMangues,
          },
          droite: {
            label: "Letchis",
            icon: "🍒",
            masse: `${letchisKg} kg ${letchisG} g`,
            grammes: totalLetchis,
          },
          questionLabel: "Quel panier est le plus lourd ?",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_defi_tpl_006_qcm_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Il faut d’abord convertir, puis additionner ou soustraire.",
    tags: [
      "cm1",
      "masse",
      "defi",
      "operation",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const kg = randomChoice([1, 2, 3]);
      const g = randomChoice([250, 500, 750]);
      const correct = `convertir ${kg} kg en ${kg * 1000} g puis additionner`;

      return {
        text: `Pour calculer ${kg} kg + ${g} g en grammes, quelle méthode est correcte ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `additionner directement ${kg} + ${g}`,
          `convertir ${g} g en kilomètres`,
          `soustraire ${g} à ${kg}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour additionner des masses avec des unités différentes, on utilise une même unité.",
          "On convertit d’abord les kilogrammes en grammes.",
          `${kg} kg = ${kg * 1000} g, puis on peut calculer ${kg * 1000} + ${g}.`,
          "La bonne méthode est de convertir puis additionner."
        ),
        canvas: masseCanvas({
          variant: "conversion",
          from: `${kg} kg + ${g} g`,
          to: "? g",
          questionLabel: "Quelle méthode faut-il utiliser ?",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_defi_tpl_007_open_conversion_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique les deux étapes : conversion puis addition.",
    tags: [
      "cm1",
      "masse",
      "defi",
      "open",
      "conversion",
      "addition",
      "template",
      "canvas",
    ],
    generate: () => {
      const kg = randomChoice([1, 2, 3]);
      const g = randomChoice([250, 500, 750, 900]);
      const total = kg * 1000 + g;

      return {
        text: `Explique comment calculer ${kg} kg + ${g} g en grammes.`,
        format: "open",
        expected: [
          String(kg),
          String(kg * 1000),
          String(g),
          String(total),
          "addition",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour additionner des masses, il faut utiliser une même unité.",
          "On convertit les kilogrammes en grammes, puis on additionne.",
          `${kg} kg = ${kg * 1000} g, donc ${kg * 1000} + ${g} = ${total}.`,
          `La masse totale est ${total} g.`
        ),
        canvas: masseCanvas({
          variant: "conversion",
          from: `${kg} kg + ${g} g`,
          to: "? g",
          questionLabel: "Explique la méthode.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_masse_defi_tpl_008_open_erreur_unites",
    niveau: "cm1",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique que kg et g ne sont pas la même unité.",
    tags: [
      "cm1",
      "masse",
      "defi",
      "open",
      "erreur",
      "unites",
      "template",
      "canvas",
    ],
    generate: () => {
      const kg = randomChoice([1, 2, 3]);
      const g = randomChoice([250, 500, 750]);
      const wrong = kg + g;
      const correct = kg * 1000 + g;

      return {
        text: `Un élève calcule ${kg} kg + ${g} g et répond ${wrong} g. Explique son erreur.`,
        format: "open",
        expected: [
          String(kg),
          String(kg * 1000),
          String(g),
          String(correct),
          "conversion",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "L’erreur vient du mélange des unités.",
          "On ne peut pas additionner directement des kilogrammes et des grammes comme de simples nombres.",
          `${kg} kg = ${kg * 1000} g, donc ${kg * 1000} + ${g} = ${correct} g.`,
          `La bonne réponse est ${correct} g, pas ${wrong} g.`
        ),
        canvas: masseCanvas({
          variant: "conversion",
          from: `${kg} kg + ${g} g`,
          to: "? g",
          questionLabel: "Explique l’erreur de l’élève.",
          display: {
            showMasses: true,
            showLabels: true,
            showComparison: true,
          },
        }),
      };
    },
  },
];

