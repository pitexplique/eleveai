// lib/tutor-v4/question-banks/maths/cm1/contenance.bank.ts

import type {
  TutorBankItemV4,
  ContenanceCanvasData,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function formatDecimal(n: number) {
  return Number.isInteger(n)
    ? String(n)
    : String(n).replace(".", ",");
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function contenanceCanvas(
  data: Omit<ContenanceCanvasData, "kind">
): ContenanceCanvasData {
  return {
    kind: "contenance",
    ...data,
  };
}

function displayBase() {
  return {
    showContenances: true,
    showLabels: true,
    showComparison: true,
  };
}

export const contenanceBank: TutorBankItemV4[] = [
  // ============================================================
  // CONTENANCE_COMPARER
  // Comparer des contenances
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_contenance_comparer_fixed_001_modele_meme_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle contenance est la plus grande : 75 cL ou 50 cL ?",
    format: "qcm",
    choices: ["75 cL", "50 cL"],
    expected: ["75 cL"],
    comparator: "mcq_exact",
    hint: "Les deux contenances sont en centilitres : compare les nombres.",
    explanation: exp(
      "Comparer des contenances, c’est chercher quel récipient contient le plus de liquide.",
      "Quand les unités sont les mêmes, on compare directement les nombres.",
      "75 est plus grand que 50.",
      "La plus grande contenance est 75 cL."
    ),
    canvas: contenanceCanvas({
      variant: "comparaison",
      gauche: {
        label: "Bouteille A",
        icon: "🧴",
        contenance: "75 cL",
        millilitres: 750,
      },
      droite: {
        label: "Bouteille B",
        icon: "🥤",
        contenance: "50 cL",
        millilitres: 500,
      },
      questionLabel: "Quel récipient contient le plus ?",
      display: displayBase(),
    }),
    tags: [
      "cm1",
      "contenance",
      "comparer",
      "meme_unite",
      "qcm",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_contenance_comparer_fixed_002_modele_conversion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle contenance est la plus grande : 1 L ou 75 cL ?",
    format: "qcm",
    choices: ["1 L", "75 cL"],
    expected: ["1 L"],
    comparator: "mcq_exact",
    hint: "Convertis 1 L en centilitres.",
    explanation: exp(
      "Pour comparer deux contenances avec des unités différentes, il faut les écrire dans la même unité.",
      "On peut convertir les litres en centilitres.",
      "1 L = 100 cL, et 100 cL est plus grand que 75 cL.",
      "La plus grande contenance est 1 L."
    ),
    canvas: contenanceCanvas({
      variant: "comparaison",
      gauche: {
        label: "Gourde",
        icon: "🚰",
        contenance: "1 L",
        millilitres: 1000,
      },
      droite: {
        label: "Bouteille",
        icon: "🧴",
        contenance: "75 cL",
        millilitres: 750,
      },
      questionLabel: "Compare les deux contenances.",
      display: displayBase(),
    }),
    tags: [
      "cm1",
      "contenance",
      "comparer",
      "conversion",
      "l_cl",
      "qcm",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_contenance_comparer_fixed_003_egalite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Compare 1 L et 100 cL.",
    format: "qcm",
    choices: [
      "1 L est plus grand",
      "100 cL est plus grand",
      "les deux contenances sont égales",
      "on ne peut pas comparer",
    ],
    expected: ["les deux contenances sont égales"],
    comparator: "mcq_exact",
    hint: "1 L = 100 cL.",
    explanation: exp(
      "Deux contenances peuvent être égales même si elles sont écrites avec des unités différentes.",
      "On convertit pour comparer.",
      "1 L = 100 cL.",
      "Les deux contenances sont égales."
    ),
    canvas: contenanceCanvas({
      variant: "comparaison",
      gauche: {
        label: "Carafe",
        icon: "🫙",
        contenance: "1 L",
        millilitres: 1000,
      },
      droite: {
        label: "Bouteille",
        icon: "🧴",
        contenance: "100 cL",
        millilitres: 1000,
      },
      questionLabel: "Les deux contenances sont-elles égales ?",
      display: displayBase(),
    }),
    tags: [
      "cm1",
      "contenance",
      "comparer",
      "egalite",
      "qcm",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_contenance_comparer_open_001_expliquer_conversion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment comparer 2 L et 150 cL.",
    format: "open",
    expected: ["2", "200", "150", "cL", "plus"],
    comparator: "contains_keyword",
    hint: "Convertis 2 L en centilitres.",
    explanation: exp(
      "Pour comparer deux contenances avec des unités différentes, on les met dans la même unité.",
      "On choisit ici le centilitre.",
      "2 L = 200 cL, et 200 cL est plus grand que 150 cL.",
      "Donc 2 L est plus grand que 150 cL."
    ),
    canvas: contenanceCanvas({
      variant: "comparaison",
      gauche: {
        label: "Bidon A",
        icon: "🛢️",
        contenance: "2 L",
        millilitres: 2000,
      },
      droite: {
        label: "Bidon B",
        icon: "🧴",
        contenance: "150 cL",
        millilitres: 1500,
      },
      questionLabel: "Explique la comparaison.",
      display: displayBase(),
    }),
    tags: [
      "cm1",
      "contenance",
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
    id: "cm1_contenance_comparer_tpl_001_cl_cl",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 1,
    theme: "neutral",
    hint: "Les deux contenances sont en cL : compare les nombres.",
    tags: [
      "cm1",
      "contenance",
      "comparer",
      "cl",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const a = randomChoice([25, 33, 50, 75, 100, 125]);
      const b0 = randomChoice([20, 40, 60, 80, 90, 110]);
      const b = b0 === a ? b0 + 10 : b0;
      const correct = a > b ? `${a} cL` : `${b} cL`;

      return {
        text: `Quelle contenance est la plus grande : ${a} cL ou ${b} cL ?`,
        format: "qcm",
        choices: [`${a} cL`, `${b} cL`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand deux contenances ont la même unité, on compare les nombres.",
          "Ici, les deux contenances sont en centilitres.",
          `${Math.max(a, b)} est plus grand que ${Math.min(a, b)}.`,
          `La plus grande contenance est ${correct}.`
        ),
        canvas: contenanceCanvas({
          variant: "comparaison",
          gauche: {
            label: "Récipient A",
            icon: "🥤",
            contenance: `${a} cL`,
            millilitres: a * 10,
          },
          droite: {
            label: "Récipient B",
            icon: "🧴",
            contenance: `${b} cL`,
            millilitres: b * 10,
          },
          questionLabel: "Quel récipient contient le plus ?",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_comparer_tpl_002_l_cl",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Convertis les litres en centilitres.",
    tags: [
      "cm1",
      "contenance",
      "comparer",
      "l_cl",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3, 4]);
      const cl = randomChoice([75, 120, 180, 250, 350, 450]);
      const litresCl = litres * 100;
      const correct = litresCl > cl ? `${litres} L` : `${cl} cL`;

      return {
        text: `Quelle contenance est la plus grande : ${litres} L ou ${cl} cL ?`,
        format: "qcm",
        choices: [`${litres} L`, `${cl} cL`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer des litres et des centilitres, on convertit dans la même unité.",
          "On utilise 1 L = 100 cL.",
          `${litres} L = ${litresCl} cL. On compare ${litresCl} cL et ${cl} cL.`,
          `La plus grande contenance est ${correct}.`
        ),
        canvas: contenanceCanvas({
          variant: "comparaison",
          gauche: {
            label: "Récipient A",
            icon: "🚰",
            contenance: `${litres} L`,
            millilitres: litres * 1000,
          },
          droite: {
            label: "Récipient B",
            icon: "🥤",
            contenance: `${cl} cL`,
            millilitres: cl * 10,
          },
          questionLabel: "Compare les contenances.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_comparer_tpl_003_l_ml",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "1 L = 1000 mL.",
    tags: [
      "cm1",
      "contenance",
      "comparer",
      "l_ml",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3]);
      const ml = randomChoice([750, 1200, 1800, 2500, 3500]);
      const litresMl = litres * 1000;
      const correct = litresMl > ml ? `${litres} L` : `${ml} mL`;

      return {
        text: `Quelle contenance est la plus grande : ${litres} L ou ${ml} mL ?`,
        format: "qcm",
        choices: [`${litres} L`, `${ml} mL`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer des litres et des millilitres, on convertit dans la même unité.",
          "On utilise 1 L = 1000 mL.",
          `${litres} L = ${litresMl} mL. On compare ${litresMl} mL et ${ml} mL.`,
          `La plus grande contenance est ${correct}.`
        ),
        canvas: contenanceCanvas({
          variant: "comparaison",
          gauche: {
            label: "Récipient A",
            icon: "🛢️",
            contenance: `${litres} L`,
            millilitres: litres * 1000,
          },
          droite: {
            label: "Récipient B",
            icon: "🧴",
            contenance: `${ml} mL`,
            millilitres: ml,
          },
          questionLabel: "Quel récipient contient le plus ?",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_comparer_tpl_004_egalite_l_cl",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Convertis les litres en centilitres.",
    tags: [
      "cm1",
      "contenance",
      "comparer",
      "egalite",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3, 4, 5]);
      const cl = litres * 100;
      const correct = "les deux contenances sont égales";

      return {
        text: `Compare ${litres} L et ${cl} cL.`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${litres} L est plus grand`,
          `${cl} cL est plus grand`,
          "on ne peut pas comparer",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux contenances peuvent être égales avec des unités différentes.",
          "On convertit les litres en centilitres.",
          `${litres} L = ${cl} cL.`,
          "Les deux contenances sont égales."
        ),
        canvas: contenanceCanvas({
          variant: "comparaison",
          gauche: {
            label: "Récipient A",
            icon: "🫙",
            contenance: `${litres} L`,
            millilitres: litres * 1000,
          },
          droite: {
            label: "Récipient B",
            icon: "🧴",
            contenance: `${cl} cL`,
            millilitres: cl * 10,
          },
          questionLabel: "Les contenances sont-elles égales ?",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_comparer_tpl_005_reunion_plage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 2,
    theme: "reunion",
    hint: "Convertis la gourde en cL pour comparer.",
    tags: [
      "cm1",
      "contenance",
      "comparer",
      "reunion",
      "plage",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const gourdeL = randomChoice([1, 2]);
      const bouteilleCl = randomChoice([75, 120, 150, 250]);
      const gourdeCl = gourdeL * 100;
      const correct = gourdeCl > bouteilleCl ? "la gourde" : "la bouteille";

      return {
        text: `Pour aller à la plage, Lina prend une gourde de ${gourdeL} L et une bouteille de ${bouteilleCl} cL. Laquelle contient le plus ?`,
        format: "qcm",
        choices: ["la gourde", "la bouteille"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer deux contenances, on utilise une même unité.",
          "On convertit la gourde en centilitres.",
          `${gourdeL} L = ${gourdeCl} cL. On compare ${gourdeCl} cL et ${bouteilleCl} cL.`,
          `C’est ${correct} qui contient le plus.`
        ),
        canvas: contenanceCanvas({
          variant: "comparaison",
          gauche: {
            label: "Gourde",
            icon: "🚰",
            contenance: `${gourdeL} L`,
            millilitres: gourdeL * 1000,
          },
          droite: {
            label: "Bouteille",
            icon: "🧴",
            contenance: `${bouteilleCl} cL`,
            millilitres: bouteilleCl * 10,
          },
          questionLabel: "Quel récipient contient le plus ?",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_comparer_tpl_006_open_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique la conversion avant de comparer.",
    tags: [
      "cm1",
      "contenance",
      "comparer",
      "open",
      "expliquer",
      "template",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3]);
      const cl = randomChoice([80, 150, 250, 350]);
      const litresCl = litres * 100;
      const bigger = litresCl > cl ? `${litres} L` : `${cl} cL`;

      return {
        text: `Explique comment comparer ${litres} L et ${cl} cL.`,
        format: "open",
        expected: [
          String(litres),
          String(litresCl),
          String(cl),
          "cL",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour comparer deux contenances avec des unités différentes, on les convertit dans une même unité.",
          "On peut convertir les litres en centilitres.",
          `${litres} L = ${litresCl} cL. On compare ${litresCl} cL et ${cl} cL.`,
          `La plus grande contenance est ${bigger}.`
        ),
        canvas: contenanceCanvas({
          variant: "comparaison",
          gauche: {
            label: "Récipient A",
            icon: "🚰",
            contenance: `${litres} L`,
            millilitres: litres * 1000,
          },
          droite: {
            label: "Récipient B",
            icon: "🥤",
            contenance: `${cl} cL`,
            millilitres: cl * 10,
          },
          questionLabel: "Explique la comparaison.",
          display: displayBase(),
        }),
      };
    },
  },
    // ============================================================
  // CONTENANCE_CONVERTIR
  // Convertir des contenances simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_contenance_convertir_fixed_001_modele_l_cl",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 3 L en centilitres.",
    format: "short",
    expected: ["300"],
    comparator: "number_equal",
    hint: "1 L = 100 cL.",
    explanation: exp(
      "Convertir une contenance, c’est écrire la même quantité de liquide dans une autre unité.",
      "Pour passer des litres aux centilitres, on multiplie par 100.",
      "3 × 100 = 300.",
      "3 L = 300 cL."
    ),
    canvas: contenanceCanvas({
      variant: "conversion",
      from: "3 L",
      to: "? cL",
      questionLabel: "Convertis en centilitres.",
      display: displayBase(),
    }),
    tags: [
      "cm1",
      "contenance",
      "convertir",
      "l_cl",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_contenance_convertir_fixed_002_modele_l_ml",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 2 L en millilitres.",
    format: "short",
    expected: ["2000", "2 000"],
    comparator: "number_equal",
    hint: "1 L = 1000 mL.",
    explanation: exp(
      "Le millilitre est une unité plus petite que le litre.",
      "Pour passer des litres aux millilitres, on multiplie par 1000.",
      "2 × 1000 = 2000.",
      "2 L = 2000 mL."
    ),
    canvas: contenanceCanvas({
      variant: "conversion",
      from: "2 L",
      to: "? mL",
      questionLabel: "Convertis en millilitres.",
      display: displayBase(),
    }),
    tags: [
      "cm1",
      "contenance",
      "convertir",
      "l_ml",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_contenance_convertir_fixed_003_modele_cl_ml",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Convertis 50 cL en millilitres.",
    format: "short",
    expected: ["500"],
    comparator: "number_equal",
    hint: "1 cL = 10 mL.",
    explanation: exp(
      "Le centilitre et le millilitre sont deux unités de contenance.",
      "Pour passer des centilitres aux millilitres, on multiplie par 10.",
      "50 × 10 = 500.",
      "50 cL = 500 mL."
    ),
    canvas: contenanceCanvas({
      variant: "conversion",
      from: "50 cL",
      to: "? mL",
      questionLabel: "Convertis en millilitres.",
      display: displayBase(),
    }),
    tags: [
      "cm1",
      "contenance",
      "convertir",
      "cl_ml",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_contenance_convertir_open_001_expliquer_cl_l",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment convertir 250 cL en litres.",
    format: "open",
    expected: ["250", "100", "2,5", "L"],
    comparator: "contains_keyword",
    hint: "100 cL = 1 L.",
    explanation: exp(
      "Pour convertir des centilitres en litres, on utilise l’égalité 100 cL = 1 L.",
      "On divise le nombre de centilitres par 100.",
      "250 ÷ 100 = 2,5.",
      "250 cL = 2,5 L."
    ),
    canvas: contenanceCanvas({
      variant: "conversion",
      from: "250 cL",
      to: "? L",
      questionLabel: "Explique la conversion.",
      display: displayBase(),
    }),
    tags: [
      "cm1",
      "contenance",
      "convertir",
      "open",
      "expliquer",
      "cl_l",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_contenance_convertir_tpl_001_l_cl",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour passer des litres aux centilitres, multiplie par 100.",
    tags: [
      "cm1",
      "contenance",
      "convertir",
      "l_cl",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3, 4, 5, 6, 8, 10]);
      const cl = litres * 100;

      return {
        text: `Convertis ${litres} L en centilitres.`,
        format: "short",
        expected: [String(cl)],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des litres en centilitres, on utilise 1 L = 100 cL.",
          "On multiplie le nombre de litres par 100.",
          `${litres} × 100 = ${cl}.`,
          `${litres} L = ${cl} cL.`
        ),
        canvas: contenanceCanvas({
          variant: "conversion",
          from: `${litres} L`,
          to: "? cL",
          questionLabel: "Convertis en centilitres.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_convertir_tpl_002_cl_l_entier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "100 cL = 1 L.",
    tags: [
      "cm1",
      "contenance",
      "convertir",
      "cl_l",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3, 4, 5, 6]);
      const cl = litres * 100;

      return {
        text: `Convertis ${cl} cL en litres.`,
        format: "short",
        expected: [String(litres)],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des centilitres en litres, on utilise 100 cL = 1 L.",
          "On divise le nombre de centilitres par 100.",
          `${cl} ÷ 100 = ${litres}.`,
          `${cl} cL = ${litres} L.`
        ),
        canvas: contenanceCanvas({
          variant: "conversion",
          from: `${cl} cL`,
          to: "? L",
          questionLabel: "Convertis en litres.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_convertir_tpl_003_l_ml",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour passer des litres aux millilitres, multiplie par 1000.",
    tags: [
      "cm1",
      "contenance",
      "convertir",
      "l_ml",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3, 4, 5]);
      const ml = litres * 1000;

      return {
        text: `Convertis ${litres} L en millilitres.`,
        format: "short",
        expected: [String(ml)],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des litres en millilitres, on utilise 1 L = 1000 mL.",
          "On multiplie le nombre de litres par 1000.",
          `${litres} × 1000 = ${ml}.`,
          `${litres} L = ${ml} mL.`
        ),
        canvas: contenanceCanvas({
          variant: "conversion",
          from: `${litres} L`,
          to: "? mL",
          questionLabel: "Convertis en millilitres.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_convertir_tpl_004_ml_l_entier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "1000 mL = 1 L.",
    tags: [
      "cm1",
      "contenance",
      "convertir",
      "ml_l",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3, 4, 5]);
      const ml = litres * 1000;

      return {
        text: `Convertis ${ml} mL en litres.`,
        format: "short",
        expected: [String(litres)],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des millilitres en litres, on utilise 1000 mL = 1 L.",
          "On divise le nombre de millilitres par 1000.",
          `${ml} ÷ 1000 = ${litres}.`,
          `${ml} mL = ${litres} L.`
        ),
        canvas: contenanceCanvas({
          variant: "conversion",
          from: `${ml} mL`,
          to: "? L",
          questionLabel: "Convertis en litres.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_convertir_tpl_005_cl_ml",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "1 cL = 10 mL.",
    tags: [
      "cm1",
      "contenance",
      "convertir",
      "cl_ml",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const cl = randomChoice([10, 20, 25, 33, 50, 75, 100]);
      const ml = cl * 10;

      return {
        text: `Convertis ${cl} cL en millilitres.`,
        format: "short",
        expected: [String(ml)],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des centilitres en millilitres, on utilise 1 cL = 10 mL.",
          "On multiplie le nombre de centilitres par 10.",
          `${cl} × 10 = ${ml}.`,
          `${cl} cL = ${ml} mL.`
        ),
        canvas: contenanceCanvas({
          variant: "conversion",
          from: `${cl} cL`,
          to: "? mL",
          questionLabel: "Convertis en millilitres.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_convertir_tpl_006_ml_cl",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "10 mL = 1 cL.",
    tags: [
      "cm1",
      "contenance",
      "convertir",
      "ml_cl",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const cl = randomChoice([10, 20, 25, 33, 50, 75]);
      const ml = cl * 10;

      return {
        text: `Convertis ${ml} mL en centilitres.`,
        format: "short",
        expected: [String(cl)],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des millilitres en centilitres, on utilise 10 mL = 1 cL.",
          "On divise le nombre de millilitres par 10.",
          `${ml} ÷ 10 = ${cl}.`,
          `${ml} mL = ${cl} cL.`
        ),
        canvas: contenanceCanvas({
          variant: "conversion",
          from: `${ml} mL`,
          to: "? cL",
          questionLabel: "Convertis en centilitres.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_convertir_tpl_007_qcm_decimal_cl_l",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour passer des cL aux L, divise par 100.",
    tags: [
      "cm1",
      "contenance",
      "convertir",
      "decimal",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const cl = randomChoice([50, 150, 250, 350, 75, 125]);
      const litres = cl / 100;
      const correct = `${formatDecimal(litres)} L`;

      return {
        text: `Convertis ${cl} cL en litres.`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${cl * 100} L`,
          `${formatDecimal(cl / 10)} L`,
          `${cl + 100} L`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour convertir des centilitres en litres, on divise par 100.",
          "Le résultat peut être un nombre décimal.",
          `${cl} ÷ 100 = ${formatDecimal(litres)}.`,
          `${cl} cL = ${correct}.`
        ),
        canvas: contenanceCanvas({
          variant: "conversion",
          from: `${cl} cL`,
          to: "? L",
          questionLabel: "Choisis la bonne conversion.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_convertir_tpl_008_reunion_gourde",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "reunion",
    hint: "1 L = 100 cL.",
    tags: [
      "cm1",
      "contenance",
      "convertir",
      "reunion",
      "gourde",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3]);
      const cl = litres * 100;

      return {
        text: `Pour une sortie à la plage, une gourde contient ${litres} L d’eau. Quelle est cette contenance en centilitres ?`,
        format: "short",
        expected: [String(cl)],
        comparator: "number_equal",
        explanation: exp(
          "Pour exprimer une contenance en centilitres, on convertit les litres.",
          "On utilise 1 L = 100 cL.",
          `${litres} L = ${litres} × 100 cL = ${cl} cL.`,
          `La gourde contient ${cl} cL.`
        ),
        canvas: contenanceCanvas({
          variant: "conversion",
          from: `${litres} L`,
          to: "? cL",
          questionLabel: "Convertis la contenance de la gourde.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_convertir_tpl_009_qcm_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Choisis l’opération qui respecte 1 L = 100 cL.",
    tags: [
      "cm1",
      "contenance",
      "convertir",
      "operation",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([2, 3, 4, 5]);
      const correct = `${litres} × 100`;

      return {
        text: `Quel calcul permet de convertir ${litres} L en centilitres ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${litres} + 100`,
          `${litres} ÷ 100`,
          `${litres} × 10`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour convertir des litres en centilitres, on multiplie par 100.",
          "Chaque litre contient 100 centilitres.",
          `${litres} L = ${litres} × 100 cL = ${litres * 100} cL.`,
          `Le bon calcul est ${correct}.`
        ),
        canvas: contenanceCanvas({
          variant: "conversion",
          from: `${litres} L`,
          to: "? cL",
          questionLabel: "Quel calcul faut-il faire ?",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_convertir_tpl_010_open_expliquer_l_cl",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 4,
    theme: "neutral",
    hint: "Indique l’égalité d’unités utilisée.",
    tags: [
      "cm1",
      "contenance",
      "convertir",
      "open",
      "expliquer",
      "template",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([2, 3, 4, 5]);
      const cl = litres * 100;

      return {
        text: `Explique comment convertir ${litres} L en centilitres.`,
        format: "open",
        expected: [
          String(litres),
          "100",
          String(cl),
          "cL",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour expliquer une conversion, on donne l’égalité d’unités utilisée.",
          "On sait que 1 L = 100 cL.",
          `${litres} × 100 = ${cl}.`,
          `${litres} L = ${cl} cL.`
        ),
        canvas: contenanceCanvas({
          variant: "conversion",
          from: `${litres} L`,
          to: "? cL",
          questionLabel: "Explique la conversion.",
          display: displayBase(),
        }),
      };
    },
  },
    // ============================================================
  // CONTENANCE_ESTIMER
  // Estimer une contenance
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_contenance_estimer_fixed_001_modele_verre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle contenance est la plus raisonnable pour un verre d’eau ?",
    format: "qcm",
    choices: ["20 cL", "20 L", "200 L", "2 km"],
    expected: ["20 cL"],
    comparator: "mcq_exact",
    hint: "Un verre contient une petite quantité de liquide.",
    explanation: exp(
      "Estimer une contenance, c’est choisir une quantité de liquide raisonnable.",
      "On pense à la taille réelle du récipient.",
      "Un verre contient souvent environ 20 cL.",
      "La contenance la plus raisonnable est 20 cL."
    ),
    canvas: contenanceCanvas({
      variant: "estimation",
      objet: {
        label: "Verre",
        icon: "🥤",
      },
      choix: ["20 cL", "20 L", "200 L"],
      questionLabel: "Quelle contenance est raisonnable ?",
      display: displayBase(),
    }),
    tags: [
      "cm1",
      "contenance",
      "estimer",
      "verre",
      "qcm",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_contenance_estimer_fixed_002_modele_baignoire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle estimation est la plus raisonnable pour une baignoire ?",
    format: "qcm",
    choices: ["150 L", "15 cL", "1 mL", "1500 km"],
    expected: ["150 L"],
    comparator: "mcq_exact",
    hint: "Une baignoire contient beaucoup plus qu’un verre.",
    explanation: exp(
      "Une estimation doit être cohérente avec le récipient.",
      "Une baignoire contient une grande quantité d’eau.",
      "15 cL est trop petit et 1 mL est minuscule.",
      "Une estimation raisonnable est 150 L."
    ),
    canvas: contenanceCanvas({
      variant: "estimation",
      objet: {
        label: "Baignoire",
        icon: "🛁",
      },
      choix: ["150 L", "15 cL", "1 mL"],
      questionLabel: "Choisis la contenance plausible.",
      display: displayBase(),
    }),
    tags: [
      "cm1",
      "contenance",
      "estimer",
      "baignoire",
      "qcm",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_contenance_estimer_open_001_expliquer_cuillere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 10 L n’est pas une estimation raisonnable pour une petite cuillère.",
    format: "open",
    expected: ["10", "L", "cuillère", "trop grand", "mL"],
    comparator: "contains_keyword",
    hint: "Une petite cuillère contient seulement quelques millilitres.",
    explanation: exp(
      "Une estimation doit être adaptée au récipient.",
      "Une petite cuillère contient une très petite quantité de liquide.",
      "10 L correspond à une grande quantité, beaucoup trop grande pour une cuillère.",
      "Pour une petite cuillère, on utiliserait plutôt quelques mL."
    ),
    canvas: contenanceCanvas({
      variant: "estimation",
      objet: {
        label: "Petite cuillère",
        icon: "🥄",
      },
      choix: ["5 mL", "10 L", "100 L"],
      questionLabel: "Explique pourquoi 10 L est impossible.",
      display: displayBase(),
    }),
    tags: [
      "cm1",
      "contenance",
      "estimer",
      "open",
      "expliquer",
      "erreur",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_contenance_estimer_tpl_001_choisir_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 1,
    theme: "neutral",
    hint: "Choisis une unité adaptée à la taille du récipient.",
    tags: [
      "cm1",
      "contenance",
      "estimer",
      "unite",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const item = randomChoice([
        {
          objet: "un verre",
          icon: "🥤",
          correct: "cL",
          wrongs: ["km", "kg", "t"],
          explication:
            "Un verre contient quelques centilitres : l’unité cL est adaptée.",
        },
        {
          objet: "une baignoire",
          icon: "🛁",
          correct: "L",
          wrongs: ["mL seulement", "km", "g"],
          explication:
            "Une baignoire contient beaucoup d’eau : on utilise plutôt les litres.",
        },
        {
          objet: "une petite cuillère",
          icon: "🥄",
          correct: "mL",
          wrongs: ["km", "t", "L seulement"],
          explication:
            "Une petite cuillère contient très peu de liquide : on utilise les millilitres.",
        },
        {
          objet: "une gourde",
          icon: "🚰",
          correct: "L",
          wrongs: ["km", "kg", "t"],
          explication:
            "Une gourde contient souvent autour de 1 litre : l’unité L est adaptée.",
        },
      ]);

      return {
        text: `Quelle unité est la plus adaptée pour estimer la contenance de ${item.objet} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour estimer une contenance, il faut choisir une unité adaptée.",
          "On pense à la taille du récipient et à la quantité de liquide qu’il peut contenir.",
          item.explication,
          `L’unité adaptée est ${item.correct}.`
        ),
        canvas: contenanceCanvas({
          variant: "estimation",
          objet: {
            label: item.objet,
            icon: item.icon,
          },
          choix: [item.correct, ...item.wrongs.slice(0, 2)],
          questionLabel: "Quelle unité convient ?",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_estimer_tpl_002_choisir_contenance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 2,
    theme: "neutral",
    hint: "Élimine les contenances beaucoup trop grandes ou trop petites.",
    tags: [
      "cm1",
      "contenance",
      "estimer",
      "ordre_grandeur",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const item = randomChoice([
        {
          objet: "une petite bouteille d’eau",
          icon: "🧴",
          correct: "50 cL",
          wrongs: ["50 L", "500 L", "5 m"],
          explication: "Une petite bouteille d’eau contient souvent 50 cL.",
        },
        {
          objet: "une gourde",
          icon: "🚰",
          correct: "1 L",
          wrongs: ["1 mL", "100 L", "1 kg"],
          explication: "Une gourde peut contenir environ 1 L.",
        },
        {
          objet: "un verre de jus",
          icon: "🥤",
          correct: "25 cL",
          wrongs: ["25 L", "250 L", "25 km"],
          explication: "Un verre de jus contient souvent environ 25 cL.",
        },
        {
          objet: "une grande bouteille",
          icon: "🧴",
          correct: "1,5 L",
          wrongs: ["1,5 mL", "150 L", "1500 L"],
          explication: "Une grande bouteille peut contenir environ 1,5 L.",
        },
      ]);

      return {
        text: `Quelle estimation est la plus raisonnable pour ${item.objet} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Estimer une contenance, c’est choisir une valeur plausible.",
          "On compare avec des récipients que l’on connaît.",
          item.explication,
          `L’estimation raisonnable est ${item.correct}.`
        ),
        canvas: contenanceCanvas({
          variant: "estimation",
          objet: {
            label: item.objet,
            icon: item.icon,
          },
          choix: [item.correct, ...item.wrongs.slice(0, 2)],
          questionLabel: "Choisis la contenance la plus raisonnable.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_estimer_tpl_003_reunion_sortie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 2,
    theme: "reunion",
    hint: "Pour une sortie, on prend souvent une gourde en litres ou centilitres.",
    tags: [
      "cm1",
      "contenance",
      "estimer",
      "reunion",
      "plage",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const item = randomChoice([
        {
          objet: "une gourde pour une marche à La Réunion",
          icon: "🚰",
          correct: "1 L",
          wrongs: ["1 mL", "100 L", "1 km"],
          explication:
            "Pour une marche, une gourde d’environ 1 L est plausible.",
        },
        {
          objet: "un verre de jus de goyavier",
          icon: "🥤",
          correct: "25 cL",
          wrongs: ["25 L", "250 L", "25 kg"],
          explication:
            "Un verre de jus contient souvent autour de 25 cL.",
        },
        {
          objet: "une bouteille d’eau pour la plage",
          icon: "🧴",
          correct: "1,5 L",
          wrongs: ["1,5 mL", "150 L", "1500 L"],
          explication:
            "Une bouteille d’eau pour la plage peut contenir environ 1,5 L.",
        },
      ]);

      return {
        text: `Quelle contenance est raisonnable pour ${item.objet} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une estimation doit être réaliste.",
          "On pense à la situation et à la taille du récipient.",
          item.explication,
          `La contenance raisonnable est ${item.correct}.`
        ),
        canvas: contenanceCanvas({
          variant: "estimation",
          objet: {
            label: item.objet,
            icon: item.icon,
          },
          choix: [item.correct, ...item.wrongs.slice(0, 2)],
          questionLabel: "Choisis une estimation raisonnable.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_estimer_tpl_004_qcm_trop_grand_trop_petit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi si la valeur est trop grande ou trop petite.",
    tags: [
      "cm1",
      "contenance",
      "estimer",
      "erreur",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const item = randomChoice([
        {
          objet: "un verre",
          icon: "🥤",
          proposition: "20 L",
          correct: "trop grand",
          wrongs: ["raisonnable", "trop petit", "impossible à comparer"],
          explication: "20 L est beaucoup trop grand pour un verre.",
        },
        {
          objet: "une baignoire",
          icon: "🛁",
          proposition: "2 mL",
          correct: "trop petit",
          wrongs: ["raisonnable", "trop grand", "impossible à comparer"],
          explication: "2 mL est beaucoup trop petit pour une baignoire.",
        },
        {
          objet: "une petite cuillère",
          icon: "🥄",
          proposition: "5 mL",
          correct: "raisonnable",
          wrongs: ["trop grand", "trop petit", "impossible à comparer"],
          explication: "Une petite cuillère peut contenir quelques millilitres.",
        },
      ]);

      return {
        text: `Pour ${item.objet}, l’estimation ${item.proposition} est-elle raisonnable ?`,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Estimer, c’est vérifier si une valeur est plausible.",
          "On compare avec la taille réelle du récipient.",
          item.explication,
          `La bonne réponse est : ${item.correct}.`
        ),
        canvas: contenanceCanvas({
          variant: "estimation",
          objet: {
            label: item.objet,
            icon: item.icon,
          },
          choix: [item.proposition, "valeur raisonnable ?", "?"],
          questionLabel: "Cette estimation est-elle plausible ?",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_estimer_tpl_005_open_justifier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique pourquoi l’estimation est trop grande ou trop petite.",
    tags: [
      "cm1",
      "contenance",
      "estimer",
      "open",
      "justifier",
      "template",
      "canvas",
    ],
    generate: () => {
      const item = randomChoice([
        {
          objet: "un verre",
          icon: "🥤",
          mauvaise: "20 L",
          bonne: "20 cL",
          mots: ["verre", "L", "cL", "trop grand"],
        },
        {
          objet: "une petite cuillère",
          icon: "🥄",
          mauvaise: "2 L",
          bonne: "5 mL",
          mots: ["cuillère", "L", "mL", "trop grand"],
        },
        {
          objet: "une baignoire",
          icon: "🛁",
          mauvaise: "2 mL",
          bonne: "150 L",
          mots: ["baignoire", "mL", "L", "trop petit"],
        },
      ]);

      return {
        text: `Explique pourquoi ${item.mauvaise} n’est pas une estimation raisonnable pour ${item.objet}.`,
        format: "open",
        expected: item.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Une estimation doit être cohérente avec le récipient.",
          "On compare la valeur proposée avec une valeur plus réaliste.",
          `${item.mauvaise} ne convient pas pour ${item.objet}. Une estimation plus raisonnable serait ${item.bonne}.`,
          "Il faut choisir une contenance adaptée."
        ),
        canvas: contenanceCanvas({
          variant: "estimation",
          objet: {
            label: item.objet,
            icon: item.icon,
          },
          choix: [item.mauvaise, item.bonne, "100 L"],
          questionLabel: "Explique l’estimation raisonnable.",
          display: displayBase(),
        }),
      };
    },
  },
    // ============================================================
  // CONTENANCE_DEFI
  // Résoudre un défi de contenances
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_contenance_defi_fixed_001_modele_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi plage : Lina prend une gourde de 1 L et une bouteille de 50 cL. Quelle quantité totale d’eau a-t-elle en centilitres ?",
    format: "short",
    expected: ["150"],
    comparator: "number_equal",
    hint: "Convertis 1 L en centilitres, puis additionne.",
    explanation: exp(
      "Pour additionner des contenances, elles doivent être dans la même unité.",
      "On convertit 1 L en centilitres, puis on additionne.",
      "1 L = 100 cL, donc 100 + 50 = 150.",
      "Lina a 150 cL d’eau."
    ),
    canvas: contenanceCanvas({
      variant: "objets",
      objets: [
        {
          label: "Gourde",
          icon: "🚰",
          contenance: "1 L",
          millilitres: 1000,
        },
        {
          label: "Bouteille",
          icon: "🧴",
          contenance: "50 cL",
          millilitres: 500,
        },
      ],
      questionLabel: "Calcule la quantité totale en cL.",
      display: displayBase(),
    }),
    tags: [
      "cm1",
      "contenance",
      "defi",
      "addition",
      "conversion",
      "reunion",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_contenance_defi_fixed_002_modele_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : une bouteille contient 2 L de jus. On verse 75 cL. Quelle quantité reste-t-il en centilitres ?",
    format: "short",
    expected: ["125"],
    comparator: "number_equal",
    hint: "Convertis 2 L en centilitres avant de soustraire.",
    explanation: exp(
      "Pour soustraire des contenances, elles doivent être dans la même unité.",
      "On convertit les litres en centilitres, puis on soustrait.",
      "2 L = 200 cL, donc 200 - 75 = 125.",
      "Il reste 125 cL de jus."
    ),
    canvas: contenanceCanvas({
      variant: "objets",
      objets: [
        {
          label: "Bouteille au départ",
          icon: "🧴",
          contenance: "2 L",
          millilitres: 2000,
        },
        {
          label: "Jus versé",
          icon: "🥤",
          contenance: "75 cL",
          millilitres: 750,
        },
      ],
      questionLabel: "Quelle quantité reste-t-il en cL ?",
      display: displayBase(),
    }),
    tags: [
      "cm1",
      "contenance",
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
    id: "cm1_contenance_defi_open_001_erreur_unites",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève calcule 2 L + 50 cL et répond 52 cL. Explique son erreur.",
    format: "open",
    expected: ["2", "200", "50", "250", "conversion"],
    comparator: "contains_keyword",
    hint: "On ne peut pas additionner directement 2 et 50 sans convertir.",
    explanation: exp(
      "L’erreur vient du mélange des unités.",
      "On ne peut pas additionner directement des litres et des centilitres comme de simples nombres.",
      "2 L = 200 cL, donc 200 + 50 = 250.",
      "La bonne réponse est 250 cL, pas 52 cL."
    ),
    canvas: contenanceCanvas({
      variant: "conversion",
      from: "2 L + 50 cL",
      to: "? cL",
      questionLabel: "Explique l’erreur de conversion.",
      display: displayBase(),
    }),
    tags: [
      "cm1",
      "contenance",
      "defi",
      "open",
      "erreur",
      "conversion",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_contenance_defi_tpl_001_addition_l_cl",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Convertis les litres en centilitres avant d’additionner.",
    tags: [
      "cm1",
      "contenance",
      "defi",
      "addition",
      "l_cl",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3, 4]);
      const cl = randomChoice([25, 50, 75, 90]);
      const total = litres * 100 + cl;

      return {
        text: `Défi : une carafe contient ${litres} L d’eau et une bouteille contient ${cl} cL. Quelle est la quantité totale en centilitres ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour additionner des contenances, elles doivent être dans la même unité.",
          "On convertit les litres en centilitres, puis on additionne.",
          `${litres} L = ${litres * 100} cL, donc ${litres * 100} + ${cl} = ${total}.`,
          `La quantité totale est ${total} cL.`
        ),
        canvas: contenanceCanvas({
          variant: "objets",
          objets: [
            {
              label: "Carafe",
              icon: "🫙",
              contenance: `${litres} L`,
              millilitres: litres * 1000,
            },
            {
              label: "Bouteille",
              icon: "🧴",
              contenance: `${cl} cL`,
              millilitres: cl * 10,
            },
          ],
          questionLabel: "Calcule la quantité totale en cL.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_defi_tpl_002_soustraction_l_cl",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Convertis la quantité de départ en cL.",
    tags: [
      "cm1",
      "contenance",
      "defi",
      "soustraction",
      "l_cl",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3, 4]);
      const retire = randomChoice([25, 50, 75, 80, 90]);
      const depart = litres * 100;
      const reste = depart - retire;

      return {
        text: `Défi : une bouteille contient ${litres} L de jus. On verse ${retire} cL. Quelle quantité reste-t-il en centilitres ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Pour soustraire des contenances, elles doivent être dans la même unité.",
          "On convertit les litres en centilitres, puis on soustrait.",
          `${litres} L = ${depart} cL, donc ${depart} - ${retire} = ${reste}.`,
          `Il reste ${reste} cL.`
        ),
        canvas: contenanceCanvas({
          variant: "objets",
          objets: [
            {
              label: "Départ",
              icon: "🧴",
              contenance: `${litres} L`,
              millilitres: litres * 1000,
            },
            {
              label: "Versé",
              icon: "🥤",
              contenance: `${retire} cL`,
              millilitres: retire * 10,
            },
          ],
          questionLabel: "Quelle quantité reste-t-il en cL ?",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_defi_tpl_003_reunion_gourdes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Convertis chaque contenance dans la même unité.",
    tags: [
      "cm1",
      "contenance",
      "defi",
      "reunion",
      "gourde",
      "addition",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2]);
      const cl = randomChoice([50, 75, 100, 150]);
      const total = litres * 100 + cl;

      return {
        text: `Pour une sortie à La Réunion, Noa prend une gourde de ${litres} L et une bouteille de ${cl} cL. Quelle quantité totale a-t-il en centilitres ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour additionner des contenances, on utilise une même unité.",
          "On convertit les litres en centilitres.",
          `${litres} L = ${litres * 100} cL, donc ${litres * 100} + ${cl} = ${total}.`,
          `Noa a ${total} cL de boisson.`
        ),
        canvas: contenanceCanvas({
          variant: "objets",
          objets: [
            {
              label: "Gourde",
              icon: "🚰",
              contenance: `${litres} L`,
              millilitres: litres * 1000,
            },
            {
              label: "Bouteille",
              icon: "🧴",
              contenance: `${cl} cL`,
              millilitres: cl * 10,
            },
          ],
          questionLabel: "Calcule la quantité totale.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_defi_tpl_004_comparer_totaux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule chaque quantité en cL avant de comparer.",
    tags: [
      "cm1",
      "contenance",
      "defi",
      "comparer",
      "addition",
      "template",
      "qcm",
      "canvas",
    ],
    generate: () => {
      const aLitres = randomChoice([1, 2]);
      const aCl = randomChoice([25, 50, 75]);
      const bLitres = randomChoice([1, 2]);
      const bCl = randomChoice([10, 40, 60, 90]);

      const totalA = aLitres * 100 + aCl;
      const totalB = bLitres * 100 + bCl;

      const correct =
        totalA > totalB
          ? "le récipient A"
          : totalB > totalA
            ? "le récipient B"
            : "les deux contenances sont égales";

      return {
        text: `Défi : le récipient A contient ${aLitres} L ${aCl} cL. Le récipient B contient ${bLitres} L ${bCl} cL. Lequel contient le plus ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "le récipient A",
          "le récipient B",
          "les deux contenances sont égales",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer des contenances composées, on les écrit dans la même unité.",
          "On convertit tout en centilitres.",
          `A : ${aLitres * 100} + ${aCl} = ${totalA} cL. B : ${bLitres * 100} + ${bCl} = ${totalB} cL.`,
          `La bonne réponse est : ${correct}.`
        ),
        canvas: contenanceCanvas({
          variant: "comparaison",
          gauche: {
            label: "Récipient A",
            icon: "🫙",
            contenance: `${aLitres} L ${aCl} cL`,
            millilitres: totalA * 10,
          },
          droite: {
            label: "Récipient B",
            icon: "🧴",
            contenance: `${bLitres} L ${bCl} cL`,
            millilitres: totalB * 10,
          },
          questionLabel: "Quel récipient contient le plus ?",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_defi_tpl_005_qcm_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "La bonne méthode commence par une conversion.",
    tags: [
      "cm1",
      "contenance",
      "defi",
      "methode",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3]);
      const cl = randomChoice([25, 50, 75]);
      const correct = `convertir ${litres} L en ${litres * 100} cL puis additionner`;

      return {
        text: `Pour calculer ${litres} L + ${cl} cL en centilitres, quelle méthode est correcte ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `additionner directement ${litres} + ${cl}`,
          `convertir ${cl} cL en kilomètres`,
          `soustraire ${cl} à ${litres}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour additionner des contenances avec des unités différentes, on utilise une même unité.",
          "On convertit d’abord les litres en centilitres.",
          `${litres} L = ${litres * 100} cL, puis on peut calculer ${litres * 100} + ${cl}.`,
          "La bonne méthode est de convertir puis additionner."
        ),
        canvas: contenanceCanvas({
          variant: "conversion",
          from: `${litres} L + ${cl} cL`,
          to: "? cL",
          questionLabel: "Quelle méthode faut-il utiliser ?",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_defi_tpl_006_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Convertis en cL, puis calcule.",
    tags: [
      "cm1",
      "contenance",
      "defi",
      "resultat",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3]);
      const cl = randomChoice([25, 50, 75]);
      const total = litres * 100 + cl;

      return {
        text: `Défi : ${litres} L + ${cl} cL = ?`,
        format: "qcm",
        choices: makeChoices(`${total} cL`, [
          `${litres + cl} cL`,
          `${total + 100} cL`,
          `${Math.max(0, total - 50)} cL`,
        ]),
        expected: [`${total} cL`],
        comparator: "mcq_exact",
        explanation: exp(
          "On ne peut pas additionner directement des litres et des centilitres.",
          "On convertit les litres en centilitres.",
          `${litres} L = ${litres * 100} cL. Donc ${litres * 100} + ${cl} = ${total}.`,
          `Le résultat est ${total} cL.`
        ),
        canvas: contenanceCanvas({
          variant: "conversion",
          from: `${litres} L + ${cl} cL`,
          to: "? cL",
          questionLabel: "Choisis le bon résultat.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_defi_tpl_007_open_resoudre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique les deux étapes : conversion puis calcul.",
    tags: [
      "cm1",
      "contenance",
      "defi",
      "open",
      "resoudre",
      "template",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3]);
      const cl = randomChoice([25, 50, 75]);
      const total = litres * 100 + cl;

      return {
        text: `Explique comment calculer ${litres} L + ${cl} cL en centilitres.`,
        format: "open",
        expected: [
          String(litres),
          String(litres * 100),
          String(cl),
          String(total),
          "addition",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour additionner des contenances, il faut utiliser une même unité.",
          "On convertit les litres en centilitres, puis on additionne.",
          `${litres} L = ${litres * 100} cL, donc ${litres * 100} + ${cl} = ${total}.`,
          `La quantité totale est ${total} cL.`
        ),
        canvas: contenanceCanvas({
          variant: "conversion",
          from: `${litres} L + ${cl} cL`,
          to: "? cL",
          questionLabel: "Explique la méthode.",
          display: displayBase(),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_contenance_defi_tpl_008_open_erreur_unites",
    niveau: "cm1",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique que L et cL ne sont pas la même unité.",
    tags: [
      "cm1",
      "contenance",
      "defi",
      "open",
      "erreur",
      "unites",
      "template",
      "canvas",
    ],
    generate: () => {
      const litres = randomChoice([1, 2, 3]);
      const cl = randomChoice([25, 50, 75]);
      const wrong = litres + cl;
      const correct = litres * 100 + cl;

      return {
        text: `Un élève calcule ${litres} L + ${cl} cL et répond ${wrong} cL. Explique son erreur.`,
        format: "open",
        expected: [
          String(litres),
          String(litres * 100),
          String(cl),
          String(correct),
          "conversion",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "L’erreur vient du mélange des unités.",
          "On ne peut pas additionner directement des litres et des centilitres comme de simples nombres.",
          `${litres} L = ${litres * 100} cL, donc ${litres * 100} + ${cl} = ${correct} cL.`,
          `La bonne réponse est ${correct} cL, pas ${wrong} cL.`
        ),
        canvas: contenanceCanvas({
          variant: "conversion",
          from: `${litres} L + ${cl} cL`,
          to: "? cL",
          questionLabel: "Explique l’erreur de l’élève.",
          display: displayBase(),
        }),
      };
    },
  },
];
