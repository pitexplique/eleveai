// lib/tutor-v4/question-banks/maths/cm2/graphiques.bank.ts

import type {
  TutorBankItemV4,
  StatGraphCanvasData,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function statGraphCanvas(
  data: Omit<StatGraphCanvasData, "kind">
): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    ...data,
  };
}

// ============================================================
// COULEURS DOUCES
// ============================================================

const STAT_COLORS = {
  bleu: "#bfdbfe",
  vert: "#bbf7d0",
  jaune: "#fde68a",
  rose: "#fecdd3",
  violet: "#ddd6fe",
  orange: "#fed7aa",
};

// ============================================================
// HELPERS CANVAS
// ============================================================

function graphiqueActivitesCanvas(
  highlightIndex?: number
): StatGraphCanvasData {
  return statGraphCanvas({
    graphType: "barres",
    data: [
      { label: "Foot", value: 12, color: STAT_COLORS.bleu },
      { label: "Danse", value: 9, color: STAT_COLORS.rose },
      { label: "Nage", value: 7, color: STAT_COLORS.vert },
      { label: "Basket", value: 10, color: STAT_COLORS.jaune },
    ],
    display: {
      showLabels: true,
      showValues: true,
      highlightIndex,
    },
  });
}

function graphiqueFruitsCanvas(
  highlightIndex?: number
): StatGraphCanvasData {
  return statGraphCanvas({
    graphType: "barres",
    data: [
      { label: "Ananas", value: 24, color: STAT_COLORS.jaune },
      { label: "Bananes", value: 28, color: STAT_COLORS.vert },
      { label: "Mangues", value: 15, color: STAT_COLORS.orange },
      { label: "Letchis", value: 18, color: STAT_COLORS.rose },
    ],
    display: {
      showLabels: true,
      showValues: true,
      highlightIndex,
    },
  });
}

function graphiqueLivresCanvas(
  highlightIndex?: number
): StatGraphCanvasData {
  return statGraphCanvas({
    graphType: "batons",
    data: [
      { label: "Romans", value: 14, color: STAT_COLORS.bleu },
      { label: "BD", value: 22, color: STAT_COLORS.jaune },
      { label: "Mangas", value: 18, color: STAT_COLORS.violet },
      { label: "Docs", value: 9, color: STAT_COLORS.vert },
    ],
    display: {
      showLabels: true,
      showValues: true,
      highlightIndex,
    },
  });
}

function graphiqueCantineCanvas(
  highlightIndex?: number
): StatGraphCanvasData {
  return statGraphCanvas({
    graphType: "barres",
    data: [
      { label: "Cari", value: 16, color: STAT_COLORS.orange },
      { label: "Rougail", value: 14, color: STAT_COLORS.rose },
      { label: "Salade", value: 8, color: STAT_COLORS.vert },
      { label: "Sandwich", value: 12, color: STAT_COLORS.bleu },
    ],
    display: {
      showLabels: true,
      showValues: true,
      highlightIndex,
    },
  });
}

function graphiqueMeteoCanvas(
  highlightIndex?: number
): StatGraphCanvasData {
  return statGraphCanvas({
    graphType: "batons",
    data: [
      { label: "Lun", value: 25, color: STAT_COLORS.bleu },
      { label: "Mar", value: 27, color: STAT_COLORS.vert },
      { label: "Mer", value: 26, color: STAT_COLORS.jaune },
      { label: "Jeu", value: 28, color: STAT_COLORS.orange },
    ],
    display: {
      showLabels: true,
      showValues: true,
      highlightIndex,
    },
  });
}

function graphiqueCamembertGoutsCanvas(
  highlightIndex?: number
): StatGraphCanvasData {
  return statGraphCanvas({
    graphType: "camembert",
    data: [
      { label: "Vanille", value: 10, color: STAT_COLORS.jaune },
      { label: "Choco", value: 8, color: STAT_COLORS.orange },
      { label: "Fraise", value: 6, color: STAT_COLORS.rose },
      { label: "Coco", value: 6, color: STAT_COLORS.bleu },
    ],
    display: {
      showLabels: true,
      showValues: true,
      highlightIndex,
    },
  });
}

// ============================================================
// BANK
// ============================================================

export const graphiquesBank: TutorBankItemV4[] = [
  // ============================================================
  // GRAPHIQUE_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "À quoi sert un graphique ?",
    format: "qcm",
    choices: [
      "à représenter des données pour les lire plus facilement",
      "à remplacer toutes les phrases par des dessins",
      "à cacher les données",
      "à faire seulement de la géométrie",
    ],
    expected: ["à représenter des données pour les lire plus facilement"],
    comparator: "mcq_exact",
    hint: "Un graphique rend les données plus visuelles.",
    explanation:
      "Un graphique sert à représenter des données de façon visuelle. Il aide à lire, comparer et interpréter des informations.",
    tags: ["cm2", "graphique", "lire", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_2_barres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un diagramme en barres, une barre plus haute signifie souvent...",
    format: "qcm",
    choices: [
      "une valeur plus grande",
      "une valeur toujours égale à zéro",
      "une erreur",
      "une valeur plus petite",
    ],
    expected: ["une valeur plus grande"],
    comparator: "mcq_exact",
    hint: "La hauteur de la barre représente la valeur.",
    explanation:
      "Dans un diagramme en barres, la hauteur de chaque barre représente une valeur. Une barre plus haute correspond souvent à une valeur plus grande.",
    tags: ["cm2", "graphique", "lire", "barres", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_3_lire_foot",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’élèves ont choisi le football ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Lis la valeur au-dessus de la barre “Foot”.",
    explanation:
      "La barre “Foot” indique 12. Donc 12 élèves ont choisi le football.",
    tags: ["cm2", "graphique", "lire", "barres", "sport", "short", "canvas"],
    canvas: graphiqueActivitesCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_4_lire_danse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’élèves ont choisi la danse ?",
    format: "qcm",
    choices: ["9", "7", "10", "12"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Regarde la barre “Danse”.",
    explanation:
      "La barre “Danse” indique 9. La bonne réponse est donc 9 élèves.",
    tags: ["cm2", "graphique", "lire", "barres", "sport", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(1),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_5_lire_natation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’élèves ont choisi la natation ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Sur le graphique, la natation est notée “Nage”.",
    explanation:
      "La barre “Nage” indique 7. Donc 7 élèves ont choisi la natation.",
    tags: ["cm2", "graphique", "lire", "barres", "sport", "short", "canvas"],
    canvas: graphiqueActivitesCanvas(2),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_6_lire_fruits_ananas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Combien d’ananas ont été vendus ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Lis la valeur de la barre “Ananas”.",
    explanation:
      "La barre “Ananas” indique 24. Il y a donc 24 ananas vendus.",
    tags: ["cm2", "graphique", "lire", "fruits", "reunion", "short", "canvas"],
    canvas: graphiqueFruitsCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_7_lire_fruits_bananes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Combien de bananes ont été vendues ?",
    format: "qcm",
    choices: ["28", "24", "15", "18"],
    expected: ["28"],
    comparator: "mcq_exact",
    hint: "Cherche la barre “Bananes”.",
    explanation:
      "La barre “Bananes” indique 28. La bonne réponse est 28.",
    tags: ["cm2", "graphique", "lire", "fruits", "reunion", "qcm", "canvas"],
    canvas: graphiqueFruitsCanvas(1),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_8_lire_livres_bd",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de BD ont été lues ?",
    format: "short",
    expected: ["22"],
    comparator: "number_equal",
    hint: "Lis la valeur du bâton “BD”.",
    explanation:
      "Le bâton “BD” indique 22. Les élèves ont donc lu 22 BD.",
    tags: ["cm2", "graphique", "lire", "batons", "livres", "short", "canvas"],
    canvas: graphiqueLivresCanvas(1),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_9_lire_livres_docs",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de documentaires ont été lus ?",
    format: "qcm",
    choices: ["9", "14", "18", "22"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Sur le graphique, “Docs” signifie documentaires.",
    explanation:
      "Le bâton “Docs” indique 9. Il y a donc 9 documentaires lus.",
    tags: ["cm2", "graphique", "lire", "batons", "livres", "qcm", "canvas"],
    canvas: graphiqueLivresCanvas(3),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_10_lire_cantine",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Combien d’élèves ont choisi le rougail ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Lis la barre “Rougail”.",
    explanation:
      "La barre “Rougail” indique 14. Donc 14 élèves ont choisi le rougail.",
    tags: ["cm2", "graphique", "lire", "cantine", "reunion", "short", "canvas"],
    canvas: graphiqueCantineCanvas(1),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_11_lire_temperature",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Quelle température a été relevée jeudi ?",
    format: "qcm",
    choices: ["28", "25", "26", "27"],
    expected: ["28"],
    comparator: "mcq_exact",
    hint: "Jeudi est noté “Jeu”.",
    explanation:
      "Le bâton “Jeu” indique 28. La température du jeudi est donc 28°C.",
    tags: ["cm2", "graphique", "lire", "temperature", "qcm", "canvas"],
    canvas: graphiqueMeteoCanvas(3),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_12_camembert_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le diagramme circulaire, quel est le total indiqué ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Lis l’indication “total” sous le diagramme.",
    explanation:
      "Le diagramme indique un total de 30. Cela représente l’ensemble des réponses.",
    tags: ["cm2", "graphique", "lire", "camembert", "total", "short", "canvas"],
    canvas: graphiqueCamembertGoutsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_13_camembert_vanille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le diagramme circulaire, combien d’élèves ont choisi vanille ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Repère la partie “Vanille”.",
    explanation:
      "La partie “Vanille” correspond à 10 réponses.",
    tags: ["cm2", "graphique", "lire", "camembert", "vanille", "short", "canvas"],
    canvas: graphiqueCamembertGoutsCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_14_erreur_label",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève veut connaître la valeur de “Basket”, mais il lit la barre “Danse”. Est-ce correct ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut lire la bonne étiquette.",
    explanation:
      "Non. Pour connaître la valeur de “Basket”, il faut regarder la barre “Basket”, pas la barre “Danse”.",
    tags: ["cm2", "graphique", "lire", "erreur", "label", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(3),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_15_erreur_valeur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que la barre “Foot” vaut 10. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Lis la valeur écrite au-dessus de la barre “Foot”.",
    explanation:
      "Non. La barre “Foot” indique 12, pas 10.",
    tags: ["cm2", "graphique", "lire", "erreur", "valeur", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_16_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment lire une valeur dans un graphique en barres.",
    format: "open",
    expected: ["barre", "étiquette", "valeur", "hauteur", "lire"],
    comparator: "contains_keyword",
    hint: "Parle de l’étiquette et de la valeur de la barre.",
    explanation:
      "Pour lire une valeur dans un graphique en barres, on repère d’abord l’étiquette demandée. Ensuite, on lit la valeur indiquée par la hauteur de la barre ou par le nombre écrit au-dessus.",
    tags: ["cm2", "graphique", "lire", "open", "methode", "barres"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_17_open_interet",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi un graphique peut-il être plus visuel qu’un tableau ?",
    format: "open",
    expected: ["voir", "comparer", "barres", "valeurs", "rapidement"],
    comparator: "contains_keyword",
    hint: "Pense aux barres plus hautes ou plus basses.",
    explanation:
      "Un graphique est souvent plus visuel qu’un tableau car on voit rapidement les différences entre les valeurs. Par exemple, une barre plus haute attire tout de suite l’attention.",
    tags: ["cm2", "graphique", "lire", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "cm2_graphique_lire_tpl_1_activites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la valeur au-dessus de la barre demandée.",
    tags: ["cm2", "graphique", "lire", "activites", "template", "qcm", "canvas"],
    generate: () => {
      const items = [
        { label: "Foot", value: 12, index: 0 },
        { label: "Danse", value: 9, index: 1 },
        { label: "Nage", value: 7, index: 2 },
        { label: "Basket", value: 10, index: 3 },
      ];

      const item = randomChoice(items);

      return {
        text: `Quelle valeur correspond à “${item.label}” ?`,
        format: "qcm",
        choices: makeChoices(String(item.value), ["7", "9", "10", "12", "14"]),
        expected: [String(item.value)],
        comparator: "mcq_exact",
        explanation:
          `On repère la barre “${item.label}”. La valeur indiquée est ${item.value}.`,
        canvas: graphiqueActivitesCanvas(item.index),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_lire_tpl_2_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "reunion",
    hint: "Cherche la barre du fruit demandé.",
    tags: ["cm2", "graphique", "lire", "fruits", "reunion", "template", "short", "canvas"],
    generate: () => {
      const items = [
        { label: "Ananas", value: 24, index: 0 },
        { label: "Bananes", value: 28, index: 1 },
        { label: "Mangues", value: 15, index: 2 },
        { label: "Letchis", value: 18, index: 3 },
      ];

      const item = randomChoice(items);

      return {
        text: `Combien de ${item.label.toLowerCase()} ont été vendus ?`,
        format: "short",
        expected: [String(item.value)],
        comparator: "number_equal",
        explanation:
          `La barre “${item.label}” indique ${item.value}.`,
        canvas: graphiqueFruitsCanvas(item.index),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_lire_tpl_3_livres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la valeur du bâton demandé.",
    tags: ["cm2", "graphique", "lire", "livres", "template", "qcm", "canvas"],
    generate: () => {
      const items = [
        { label: "Romans", value: 14, index: 0 },
        { label: "BD", value: 22, index: 1 },
        { label: "Mangas", value: 18, index: 2 },
        { label: "Docs", value: 9, index: 3 },
      ];

      const item = randomChoice(items);

      return {
        text: `Combien indique le bâton “${item.label}” ?`,
        format: "qcm",
        choices: makeChoices(String(item.value), ["9", "14", "18", "22", "25"]),
        expected: [String(item.value)],
        comparator: "mcq_exact",
        explanation:
          `Le bâton “${item.label}” indique ${item.value}.`,
        canvas: graphiqueLivresCanvas(item.index),
      };
    },
  },
    // ============================================================
  // GRAPHIQUE_COMPLETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 1,
    theme: "neutral",
    text: "Compléter un graphique, c’est...",
    format: "qcm",
    choices: [
      "ajouter une valeur ou une barre manquante à partir des données",
      "changer toutes les couleurs au hasard",
      "effacer les étiquettes",
      "remplacer le graphique par une phrase",
    ],
    expected: ["ajouter une valeur ou une barre manquante à partir des données"],
    comparator: "mcq_exact",
    hint: "Il manque une information sur le graphique.",
    explanation:
      "Compléter un graphique, c’est ajouter une information manquante : une valeur, une barre, un bâton ou une étiquette.",
    tags: ["cm2", "graphique", "completer", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_2_lire_donnee",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 1,
    theme: "neutral",
    text: "Avant de compléter une barre, il faut d’abord...",
    format: "qcm",
    choices: [
      "lire la donnée à représenter",
      "choisir une hauteur au hasard",
      "mettre toutes les barres à la même hauteur",
      "supprimer le titre",
    ],
    expected: ["lire la donnée à représenter"],
    comparator: "mcq_exact",
    hint: "La hauteur de la barre dépend de la valeur.",
    explanation:
      "Avant de compléter une barre, il faut lire la donnée à représenter. La hauteur de la barre doit correspondre à cette valeur.",
    tags: ["cm2", "graphique", "completer", "methode", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_3_foot",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour compléter le graphique, quelle valeur faut-il écrire au-dessus de la barre “Foot” ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Lis la barre “Foot”.",
    explanation:
      "La barre “Foot” correspond à 12 élèves. Il faut donc écrire 12.",
    tags: ["cm2", "graphique", "completer", "activites", "short", "canvas"],
    canvas: graphiqueActivitesCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_4_basket",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour compléter le graphique, quelle valeur faut-il écrire pour “Basket” ?",
    format: "qcm",
    choices: ["10", "7", "9", "12"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Regarde la barre “Basket”.",
    explanation:
      "La barre “Basket” indique 10. Il faut donc écrire 10.",
    tags: ["cm2", "graphique", "completer", "activites", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(3),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_5_ananas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Pour compléter le graphique des fruits, quelle valeur faut-il écrire pour “Ananas” ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Lis la valeur de la barre “Ananas”.",
    explanation:
      "La barre “Ananas” indique 24. Il faut donc écrire 24.",
    tags: ["cm2", "graphique", "completer", "fruits", "reunion", "short", "canvas"],
    canvas: graphiqueFruitsCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_6_mangues",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Pour compléter le graphique des fruits, quelle valeur correspond à “Mangues” ?",
    format: "qcm",
    choices: ["15", "18", "24", "28"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "Cherche la barre “Mangues”.",
    explanation:
      "La barre “Mangues” indique 15. La valeur à écrire est 15.",
    tags: ["cm2", "graphique", "completer", "fruits", "reunion", "qcm", "canvas"],
    canvas: graphiqueFruitsCanvas(2),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_7_livres_mangas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour compléter le diagramme en bâtons, quelle valeur faut-il écrire pour “Mangas” ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Lis le bâton “Mangas”.",
    explanation:
      "Le bâton “Mangas” indique 18. Il faut donc écrire 18.",
    tags: ["cm2", "graphique", "completer", "livres", "batons", "short", "canvas"],
    canvas: graphiqueLivresCanvas(2),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_8_temperature_mardi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Pour compléter le graphique météo, quelle valeur faut-il écrire pour mardi ?",
    format: "qcm",
    choices: ["27", "25", "26", "28"],
    expected: ["27"],
    comparator: "mcq_exact",
    hint: "Mardi est noté “Mar”.",
    explanation:
      "Le bâton “Mar” indique 27. Il faut donc écrire 27.",
    tags: ["cm2", "graphique", "completer", "temperature", "qcm", "canvas"],
    canvas: graphiqueMeteoCanvas(1),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_9_total_camembert",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour compléter le total du diagramme circulaire, on additionne 10 + 8 + 6 + 6. Quel total faut-il écrire ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Additionne les quatre valeurs.",
    explanation:
      "On additionne les valeurs : 10 + 8 + 6 + 6 = 30. Le total à écrire est 30.",
    tags: ["cm2", "graphique", "completer", "camembert", "total", "short", "canvas"],
    canvas: graphiqueCamembertGoutsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_10_valeur_manquante_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Un graphique représente 30 réponses. On connaît 10, 8 et 6 réponses. Quelle valeur manque-t-il ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Additionne les valeurs connues puis soustrais au total.",
    explanation:
      "On additionne les valeurs connues : 10 + 8 + 6 = 24. Il manque 30 - 24 = 6 réponses.",
    tags: ["cm2", "graphique", "completer", "valeur_manquante", "short"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_11_erreur_hauteur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève complète la barre “Foot” avec la valeur 10 au lieu de 12. Est-ce correct ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Relis la valeur de la barre “Foot”.",
    explanation:
      "Non. La barre “Foot” vaut 12. Écrire 10 ne correspond pas à la donnée.",
    tags: ["cm2", "graphique", "completer", "erreur", "activites", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_12_erreur_hasard",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève complète une barre sans lire la donnée. Est-ce une bonne méthode ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La hauteur doit représenter une vraie donnée.",
    explanation:
      "Non. On ne complète pas un graphique au hasard. La hauteur ou la valeur d’une barre doit correspondre à la donnée représentée.",
    tags: ["cm2", "graphique", "completer", "erreur", "methode", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_13_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment compléter une barre manquante dans un graphique.",
    format: "open",
    expected: ["donnée", "valeur", "barre", "hauteur", "étiquette"],
    comparator: "contains_keyword",
    hint: "Parle de la donnée et de la hauteur de la barre.",
    explanation:
      "Pour compléter une barre manquante, on repère d’abord son étiquette. Ensuite, on lit la donnée à représenter et on trace ou complète la barre à la bonne hauteur.",
    tags: ["cm2", "graphique", "completer", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_14_open_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment compléter un total à partir d’un graphique.",
    format: "open",
    expected: ["additionner", "valeurs", "total", "graphique", "données"],
    comparator: "contains_keyword",
    hint: "Un total s’obtient en additionnant les valeurs.",
    explanation:
      "Pour compléter un total, on lit toutes les valeurs utiles du graphique, puis on les additionne. Il faut vérifier que l’on n’oublie aucune donnée.",
    tags: ["cm2", "graphique", "completer", "open", "total"],
  },

  {
    kind: "template",
    id: "cm2_graphique_completer_tpl_1_activites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde la barre demandée.",
    tags: ["cm2", "graphique", "completer", "activites", "template", "qcm", "canvas"],
    generate: () => {
      const items = [
        { label: "Foot", value: 12, index: 0 },
        { label: "Danse", value: 9, index: 1 },
        { label: "Nage", value: 7, index: 2 },
        { label: "Basket", value: 10, index: 3 },
      ];

      const item = randomChoice(items);

      return {
        text: `Quelle valeur faut-il écrire pour compléter la barre “${item.label}” ?`,
        format: "qcm",
        choices: makeChoices(String(item.value), ["7", "9", "10", "12", "14"]),
        expected: [String(item.value)],
        comparator: "mcq_exact",
        explanation:
          `La barre “${item.label}” correspond à ${item.value}. Il faut donc écrire ${item.value}.`,
        canvas: graphiqueActivitesCanvas(item.index),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_completer_tpl_2_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "reunion",
    hint: "Lis la valeur du fruit demandé.",
    tags: ["cm2", "graphique", "completer", "fruits", "reunion", "template", "short", "canvas"],
    generate: () => {
      const items = [
        { label: "Ananas", value: 24, index: 0 },
        { label: "Bananes", value: 28, index: 1 },
        { label: "Mangues", value: 15, index: 2 },
        { label: "Letchis", value: 18, index: 3 },
      ];

      const item = randomChoice(items);

      return {
        text: `Quelle valeur faut-il écrire pour compléter “${item.label}” ?`,
        format: "short",
        expected: [String(item.value)],
        comparator: "number_equal",
        explanation:
          `La barre “${item.label}” indique ${item.value}.`,
        canvas: graphiqueFruitsCanvas(item.index),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_completer_tpl_3_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les valeurs du graphique.",
    tags: ["cm2", "graphique", "completer", "total", "template", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Quel total faut-il écrire pour les activités ?",
          values: [12, 9, 7, 10],
          total: 38,
          canvas: graphiqueActivitesCanvas,
          explanation:
            "On additionne les activités : 12 + 9 + 7 + 10 = 38.",
        },
        {
          text: "Quel total faut-il écrire pour les livres lus ?",
          values: [14, 22, 18, 9],
          total: 63,
          canvas: graphiqueLivresCanvas,
          explanation:
            "On additionne les livres : 14 + 22 + 18 + 9 = 63.",
        },
        {
          text: "Quel total faut-il écrire pour les fruits vendus ?",
          values: [24, 28, 15, 18],
          total: 85,
          canvas: graphiqueFruitsCanvas,
          explanation:
            "On additionne les fruits : 24 + 28 + 15 + 18 = 85.",
        },
      ]);

      return {
        text: item.text,
        format: "short",
        expected: [String(item.total)],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: item.canvas(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_completer_tpl_4_valeur_manquante_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les valeurs connues puis retire-les au total.",
    tags: ["cm2", "graphique", "completer", "valeur_manquante", "template", "short"],
    generate: () => {
      const total = randomChoice([30, 40, 50]);
      const a = randomInt(6, 12);
      const b = randomInt(6, 12);
      const c = randomInt(5, 10);
      const missing = total - a - b - c;

      return {
        text: `Un graphique représente ${total} réponses. Trois valeurs sont ${a}, ${b} et ${c}. Quelle valeur manque-t-il ?`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation:
          `On additionne les valeurs connues : ${a} + ${b} + ${c} = ${a + b + c}. Puis on calcule ${total} - ${a + b + c} = ${missing}.`,
      };
    },
  },
    // ============================================================
  // GRAPHIQUE_INTERPRETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 1,
    theme: "neutral",
    text: "Interpréter un graphique, c’est...",
    format: "qcm",
    choices: [
      "utiliser les données du graphique pour répondre à une question",
      "regarder uniquement les couleurs",
      "ignorer les valeurs",
      "changer les étiquettes du graphique",
    ],
    expected: ["utiliser les données du graphique pour répondre à une question"],
    comparator: "mcq_exact",
    hint: "Interpréter, c’est donner du sens aux données.",
    explanation:
      "Interpréter un graphique, c’est utiliser les données représentées pour comparer, calculer ou tirer une conclusion.",
    tags: ["cm2", "graphique", "interpreter", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_2_max_activite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle activité a été choisie par le plus d’élèves ?",
    format: "qcm",
    choices: ["Foot", "Danse", "Nage", "Basket"],
    expected: ["Foot"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus haute.",
    explanation:
      "On compare les valeurs : Foot 12, Danse 9, Nage 7, Basket 10. La plus grande valeur est 12, donc l’activité la plus choisie est Foot.",
    tags: ["cm2", "graphique", "interpreter", "maximum", "activites", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_3_min_activite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle activité a été choisie par le moins d’élèves ?",
    format: "qcm",
    choices: ["Nage", "Foot", "Danse", "Basket"],
    expected: ["Nage"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus basse.",
    explanation:
      "La plus petite valeur est 7, pour “Nage”. C’est donc l’activité la moins choisie.",
    tags: ["cm2", "graphique", "interpreter", "minimum", "activites", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(2),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_4_difference_foot_nage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Combien d’élèves de plus ont choisi Foot que Nage ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compare 12 et 7.",
    explanation:
      "Foot correspond à 12 élèves et Nage à 7 élèves. La différence est 12 - 7 = 5.",
    tags: ["cm2", "graphique", "interpreter", "difference", "activites", "short", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_5_total_activites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Combien d’élèves ont répondu au total au graphique des activités ?",
    format: "short",
    expected: ["38"],
    comparator: "number_equal",
    hint: "Additionne toutes les valeurs.",
    explanation:
      "On additionne les valeurs : 12 + 9 + 7 + 10 = 38. Il y a donc 38 élèves au total.",
    tags: ["cm2", "graphique", "interpreter", "total", "activites", "short", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_6_max_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel fruit a été le plus vendu ?",
    format: "qcm",
    choices: ["Bananes", "Ananas", "Mangues", "Letchis"],
    expected: ["Bananes"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus haute.",
    explanation:
      "Les valeurs sont : Ananas 24, Bananes 28, Mangues 15, Letchis 18. La plus grande valeur est 28, donc les bananes ont été les plus vendues.",
    tags: ["cm2", "graphique", "interpreter", "maximum", "fruits", "reunion", "qcm", "canvas"],
    canvas: graphiqueFruitsCanvas(1),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_7_min_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel fruit a été le moins vendu ?",
    format: "qcm",
    choices: ["Mangues", "Ananas", "Bananes", "Letchis"],
    expected: ["Mangues"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus basse.",
    explanation:
      "La plus petite valeur est 15, pour les mangues. Les mangues ont donc été les moins vendues.",
    tags: ["cm2", "graphique", "interpreter", "minimum", "fruits", "reunion", "qcm", "canvas"],
    canvas: graphiqueFruitsCanvas(2),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_8_total_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de fruits ont été vendus au total ?",
    format: "short",
    expected: ["85"],
    comparator: "number_equal",
    hint: "Additionne les quatre valeurs du graphique.",
    explanation:
      "On additionne les fruits : 24 + 28 + 15 + 18 = 85. Au total, 85 fruits ont été vendus.",
    tags: ["cm2", "graphique", "interpreter", "total", "fruits", "reunion", "short", "canvas"],
    canvas: graphiqueFruitsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_9_difference_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de bananes de plus que de mangues ont été vendues ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Compare 28 et 15.",
    explanation:
      "Bananes : 28. Mangues : 15. La différence est 28 - 15 = 13.",
    tags: ["cm2", "graphique", "interpreter", "difference", "fruits", "reunion", "short", "canvas"],
    canvas: graphiqueFruitsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_10_livres_max",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quel type de livre a été le plus lu ?",
    format: "qcm",
    choices: ["BD", "Romans", "Mangas", "Docs"],
    expected: ["BD"],
    comparator: "mcq_exact",
    hint: "Cherche le bâton le plus haut.",
    explanation:
      "Les BD ont la valeur 22, qui est la plus grande du graphique. Ce sont donc les livres les plus lus.",
    tags: ["cm2", "graphique", "interpreter", "livres", "maximum", "qcm", "canvas"],
    canvas: graphiqueLivresCanvas(1),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_11_livres_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de livres ont été lus au total ?",
    format: "short",
    expected: ["63"],
    comparator: "number_equal",
    hint: "Additionne les quatre valeurs.",
    explanation:
      "On additionne : 14 + 22 + 18 + 9 = 63. Les élèves ont lu 63 livres au total.",
    tags: ["cm2", "graphique", "interpreter", "livres", "total", "short", "canvas"],
    canvas: graphiqueLivresCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_12_meteo_max",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel jour la température est-elle la plus élevée ?",
    format: "qcm",
    choices: ["Jeu", "Lun", "Mar", "Mer"],
    expected: ["Jeu"],
    comparator: "mcq_exact",
    hint: "Cherche le bâton le plus haut.",
    explanation:
      "La plus grande valeur est 28, pour “Jeu”. La température est donc la plus élevée jeudi.",
    tags: ["cm2", "graphique", "interpreter", "meteo", "maximum", "qcm", "canvas"],
    canvas: graphiqueMeteoCanvas(3),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_13_meteo_ecart",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Quel est l’écart entre la température la plus haute et la plus basse ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Soustrais la plus petite température à la plus grande.",
    explanation:
      "La température la plus haute est 28 et la plus basse est 25. L’écart est 28 - 25 = 3.",
    tags: ["cm2", "graphique", "interpreter", "meteo", "ecart", "short", "canvas"],
    canvas: graphiqueMeteoCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_14_cantine_plus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel menu est le plus choisi ?",
    format: "qcm",
    choices: ["Cari", "Rougail", "Salade", "Sandwich"],
    expected: ["Cari"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus haute.",
    explanation:
      "La barre “Cari” indique 16, c’est la plus grande valeur. Le cari est donc le menu le plus choisi.",
    tags: ["cm2", "graphique", "interpreter", "cantine", "maximum", "qcm", "canvas"],
    canvas: graphiqueCantineCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_15_camembert_plus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le diagramme circulaire, quel goût est le plus choisi ?",
    format: "qcm",
    choices: ["Vanille", "Choco", "Fraise", "Coco"],
    expected: ["Vanille"],
    comparator: "mcq_exact",
    hint: "Compare les valeurs des parts.",
    explanation:
      "Les valeurs sont : Vanille 10, Choco 8, Fraise 6, Coco 6. La plus grande valeur est 10, donc le goût le plus choisi est Vanille.",
    tags: ["cm2", "graphique", "interpreter", "camembert", "maximum", "qcm", "canvas"],
    canvas: graphiqueCamembertGoutsCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_16_erreur_max",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Nage est l’activité la plus choisie.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare les valeurs des quatre barres.",
    explanation:
      "Non. Nage vaut 7, alors que Foot vaut 12. L’activité la plus choisie est Foot.",
    tags: ["cm2", "graphique", "interpreter", "erreur", "maximum", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_17_erreur_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit que le total des activités est 28. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Refais l’addition des quatre valeurs.",
    explanation:
      "Non. Le total correct est 12 + 9 + 7 + 10 = 38. L’élève a fait une erreur de calcul.",
    tags: ["cm2", "graphique", "interpreter", "erreur", "total", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_18_open_maximum",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment trouver la valeur la plus grande dans un graphique.",
    format: "open",
    expected: ["comparer", "barres", "valeurs", "plus", "grande"],
    comparator: "contains_keyword",
    hint: "Regarde les hauteurs ou les valeurs.",
    explanation:
      "Pour trouver la valeur la plus grande, on compare les barres ou les valeurs écrites. La barre la plus haute ou la valeur la plus grande donne la réponse.",
    tags: ["cm2", "graphique", "interpreter", "open", "maximum", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_19_open_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment calculer un total à partir d’un graphique.",
    format: "open",
    expected: ["lire", "valeurs", "additionner", "total", "graphique"],
    comparator: "contains_keyword",
    hint: "Lis toutes les valeurs utiles, puis additionne-les.",
    explanation:
      "Pour calculer un total, on lit toutes les valeurs nécessaires dans le graphique, puis on les additionne. Il faut vérifier que toutes les données utiles ont été prises en compte.",
    tags: ["cm2", "graphique", "interpreter", "open", "total", "methode"],
  },

  {
    kind: "template",
    id: "cm2_graphique_interpreter_tpl_1_maximum",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la plus grande valeur.",
    tags: ["cm2", "graphique", "interpreter", "maximum", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Quelle activité est la plus choisie ?",
          correct: "Foot",
          choices: ["Foot", "Danse", "Nage", "Basket"],
          explanation:
            "Foot vaut 12, c’est la plus grande valeur.",
          canvas: graphiqueActivitesCanvas(0),
        },
        {
          text: "Quel fruit est le plus vendu ?",
          correct: "Bananes",
          choices: ["Ananas", "Bananes", "Mangues", "Letchis"],
          explanation:
            "Bananes vaut 28, c’est la plus grande valeur.",
          canvas: graphiqueFruitsCanvas(1),
        },
        {
          text: "Quel type de livre est le plus lu ?",
          correct: "BD",
          choices: ["Romans", "BD", "Mangas", "Docs"],
          explanation:
            "BD vaut 22, c’est la plus grande valeur.",
          canvas: graphiqueLivresCanvas(1),
        },
        {
          text: "Quel menu est le plus choisi ?",
          correct: "Cari",
          choices: ["Cari", "Rougail", "Salade", "Sandwich"],
          explanation:
            "Cari vaut 16, c’est la plus grande valeur.",
          canvas: graphiqueCantineCanvas(0),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_interpreter_tpl_2_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les valeurs du graphique.",
    tags: ["cm2", "graphique", "interpreter", "total", "template", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Quel est le total des activités ?",
          total: 38,
          explanation:
            "On additionne : 12 + 9 + 7 + 10 = 38.",
          canvas: graphiqueActivitesCanvas(),
        },
        {
          text: "Quel est le total des fruits vendus ?",
          total: 85,
          explanation:
            "On additionne : 24 + 28 + 15 + 18 = 85.",
          canvas: graphiqueFruitsCanvas(),
        },
        {
          text: "Quel est le total des livres lus ?",
          total: 63,
          explanation:
            "On additionne : 14 + 22 + 18 + 9 = 63.",
          canvas: graphiqueLivresCanvas(),
        },
        {
          text: "Quel est le total des menus choisis ?",
          total: 50,
          explanation:
            "On additionne : 16 + 14 + 8 + 12 = 50.",
          canvas: graphiqueCantineCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "short",
        expected: [String(item.total)],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_interpreter_tpl_3_difference",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour trouver un écart, on soustrait.",
    tags: ["cm2", "graphique", "interpreter", "difference", "template", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Combien d’élèves de plus ont choisi Foot que Nage ?",
          expected: 5,
          explanation:
            "Foot vaut 12 et Nage vaut 7. L’écart est 12 - 7 = 5.",
          canvas: graphiqueActivitesCanvas(),
        },
        {
          text: "Combien de bananes de plus que de mangues ont été vendues ?",
          expected: 13,
          explanation:
            "Bananes vaut 28 et Mangues vaut 15. L’écart est 28 - 15 = 13.",
          canvas: graphiqueFruitsCanvas(),
        },
        {
          text: "Combien de BD de plus que de documentaires ont été lues ?",
          expected: 13,
          explanation:
            "BD vaut 22 et Docs vaut 9. L’écart est 22 - 9 = 13.",
          canvas: graphiqueLivresCanvas(),
        },
        {
          text: "Quel est l’écart entre jeudi et lundi ?",
          expected: 3,
          explanation:
            "Jeudi vaut 28 et lundi vaut 25. L’écart est 28 - 25 = 3.",
          canvas: graphiqueMeteoCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "short",
        expected: [String(item.expected)],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },
  // ============================================================
  // GRAPHIQUE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_1_conclusion_activites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle conclusion est vraie à partir du graphique des activités ?",
    format: "qcm",
    choices: [
      "Foot est l’activité la plus choisie",
      "Nage est l’activité la plus choisie",
      "Danse et Basket ont la même valeur",
      "Aucune activité n’a été choisie",
    ],
    expected: ["Foot est l’activité la plus choisie"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus haute.",
    explanation:
      "La barre “Foot” vaut 12, c’est la plus grande valeur du graphique. Donc Foot est l’activité la plus choisie.",
    tags: ["cm2", "graphique", "defi", "conclusion", "activites", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_2_conclusion_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Au marché, quelle conclusion est correcte ?",
    format: "qcm",
    choices: [
      "Les bananes sont les fruits les plus vendus",
      "Les mangues sont les fruits les plus vendus",
      "Les ananas sont les fruits les moins vendus",
      "Tous les fruits ont été vendus en même quantité",
    ],
    expected: ["Les bananes sont les fruits les plus vendus"],
    comparator: "mcq_exact",
    hint: "Compare les hauteurs des barres.",
    explanation:
      "Les valeurs sont : Ananas 24, Bananes 28, Mangues 15, Letchis 18. La plus grande valeur est 28, donc les bananes sont les fruits les plus vendus.",
    tags: ["cm2", "graphique", "defi", "fruits", "reunion", "conclusion", "qcm", "canvas"],
    canvas: graphiqueFruitsCanvas(1),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_3_total_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Combien de fruits ont été vendus au total ?",
    format: "short",
    expected: ["85"],
    comparator: "number_equal",
    hint: "Additionne toutes les valeurs du graphique.",
    explanation:
      "On additionne les fruits : 24 + 28 + 15 + 18 = 85. Au total, 85 fruits ont été vendus.",
    tags: ["cm2", "graphique", "defi", "fruits", "reunion", "total", "short", "canvas"],
    canvas: graphiqueFruitsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_4_total_activites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Combien d’élèves ont répondu au graphique des activités ?",
    format: "short",
    expected: ["38"],
    comparator: "number_equal",
    hint: "Additionne les quatre activités.",
    explanation:
      "On additionne : 12 + 9 + 7 + 10 = 38. Il y a donc 38 élèves au total.",
    tags: ["cm2", "graphique", "defi", "activites", "total", "short", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_5_difference_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Combien de bananes de plus que de letchis ont été vendues ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Compare 28 et 18.",
    explanation:
      "Bananes : 28. Letchis : 18. On calcule 28 - 18 = 10.",
    tags: ["cm2", "graphique", "defi", "fruits", "difference", "reunion", "short", "canvas"],
    canvas: graphiqueFruitsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_6_difference_livres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de BD de plus que de romans ont été lues ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Compare 22 et 14.",
    explanation:
      "BD : 22. Romans : 14. On calcule 22 - 14 = 8.",
    tags: ["cm2", "graphique", "defi", "livres", "difference", "short", "canvas"],
    canvas: graphiqueLivresCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_7_temperature_ecart",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Quel est l’écart entre la température la plus élevée et la plus basse ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Cherche la plus grande valeur et la plus petite valeur.",
    explanation:
      "La température la plus élevée est 28 et la plus basse est 25. L’écart est 28 - 25 = 3.",
    tags: ["cm2", "graphique", "defi", "temperature", "ecart", "short", "canvas"],
    canvas: graphiqueMeteoCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_8_deux_groupes_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien d’élèves ont choisi Foot ou Basket ?",
    format: "short",
    expected: ["22"],
    comparator: "number_equal",
    hint: "Additionne seulement Foot et Basket.",
    explanation:
      "Foot vaut 12 et Basket vaut 10. On additionne 12 + 10 = 22.",
    tags: ["cm2", "graphique", "defi", "activites", "regrouper", "short", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_9_deux_groupes_livres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien de livres de loisirs ont été lus si on regroupe BD et mangas ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "Additionne BD et Mangas.",
    explanation:
      "BD vaut 22 et Mangas vaut 18. On additionne 22 + 18 = 40.",
    tags: ["cm2", "graphique", "defi", "livres", "regrouper", "short", "canvas"],
    canvas: graphiqueLivresCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_10_camembert_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans le diagramme circulaire, combien d’élèves ont répondu au total ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Lis le total indiqué ou additionne les parts.",
    explanation:
      "On peut lire le total indiqué : 30. On peut aussi additionner les parts : 10 + 8 + 6 + 6 = 30.",
    tags: ["cm2", "graphique", "defi", "camembert", "total", "short", "canvas"],
    canvas: graphiqueCamembertGoutsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_11_camembert_difference",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans le diagramme circulaire, combien d’élèves de plus ont choisi Vanille que Fraise ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Compare Vanille 10 et Fraise 6.",
    explanation:
      "Vanille vaut 10 et Fraise vaut 6. La différence est 10 - 6 = 4.",
    tags: ["cm2", "graphique", "defi", "camembert", "difference", "short", "canvas"],
    canvas: graphiqueCamembertGoutsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_12_erreur_conclusion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “Nage est l’activité la plus choisie.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare toutes les barres.",
    explanation:
      "Non. Nage vaut 7, alors que Foot vaut 12. L’activité la plus choisie est Foot.",
    tags: ["cm2", "graphique", "defi", "erreur", "conclusion", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_13_erreur_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : “Le total des livres lus est 53.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Additionne les quatre valeurs du graphique.",
    explanation:
      "Non. Le total correct est 14 + 22 + 18 + 9 = 63. L’élève a fait une erreur de calcul.",
    tags: ["cm2", "graphique", "defi", "erreur", "total", "qcm", "canvas"],
    canvas: graphiqueLivresCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_14_erreur_lecture",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Un élève dit : “Les mangues sont les fruits les plus vendus.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Cherche la plus grande barre.",
    explanation:
      "Non. Les mangues valent 15, alors que les bananes valent 28. Les bananes sont donc les fruits les plus vendus.",
    tags: ["cm2", "graphique", "defi", "erreur", "fruits", "qcm", "canvas"],
    canvas: graphiqueFruitsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_15_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique une méthode pour résoudre un problème à partir d’un graphique.",
    format: "open",
    expected: ["question", "graphique", "valeurs", "comparer", "calcul", "réponse"],
    comparator: "contains_keyword",
    hint: "Commence par lire la question, puis cherche les valeurs utiles.",
    explanation:
      "Méthode : on lit d’abord la question. Ensuite, on repère les valeurs utiles dans le graphique. Puis on compare ou on calcule selon ce qui est demandé. Enfin, on rédige une réponse claire.",
    tags: ["cm2", "graphique", "defi", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_16_open_conclusion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "À partir du graphique des activités, rédige une conclusion vraie.",
    format: "open",
    expected: ["Foot", "12", "Nage", "7", "plus", "moins"],
    comparator: "contains_keyword",
    hint: "Tu peux parler de l’activité la plus choisie ou de la moins choisie.",
    explanation:
      "Exemples de conclusions vraies : Foot est l’activité la plus choisie avec 12 élèves ; Nage est l’activité la moins choisie avec 7 élèves.",
    tags: ["cm2", "graphique", "defi", "open", "conclusion", "activites", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_17_open_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi ne faut-il pas se contenter de regarder les couleurs d’un graphique ?",
    format: "open",
    expected: ["valeurs", "étiquettes", "barres", "lire", "comparer"],
    comparator: "contains_keyword",
    hint: "Les couleurs aident à voir, mais elles ne donnent pas toujours la réponse.",
    explanation:
      "Les couleurs peuvent aider à distinguer les données, mais il faut surtout lire les étiquettes et les valeurs. Pour répondre correctement, on doit comparer les nombres représentés.",
    tags: ["cm2", "graphique", "defi", "open", "erreur", "lecture"],
  },

  {
    kind: "template",
    id: "cm2_graphique_defi_tpl_1_conclusion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche la conclusion qui correspond vraiment au graphique.",
    tags: ["cm2", "graphique", "defi", "conclusion", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Quelle conclusion est vraie pour le graphique des activités ?",
          correct: "Foot est l’activité la plus choisie",
          wrongs: [
            "Nage est l’activité la plus choisie",
            "Danse vaut 20",
            "Toutes les activités ont la même valeur",
          ],
          explanation:
            "Foot vaut 12, c’est la plus grande valeur.",
          canvas: graphiqueActivitesCanvas(0),
        },
        {
          text: "Quelle conclusion est vraie pour le graphique des fruits ?",
          correct: "Les bananes sont les fruits les plus vendus",
          wrongs: [
            "Les mangues sont les plus vendues",
            "Les ananas valent 12",
            "Tous les fruits ont la même valeur",
          ],
          explanation:
            "Bananes vaut 28, c’est la plus grande valeur.",
          canvas: graphiqueFruitsCanvas(1),
        },
        {
          text: "Quelle conclusion est vraie pour le graphique des livres ?",
          correct: "Les BD sont les livres les plus lus",
          wrongs: [
            "Les documentaires sont les plus lus",
            "Les romans valent 22",
            "Tous les livres ont la même valeur",
          ],
          explanation:
            "BD vaut 22, c’est la plus grande valeur.",
          canvas: graphiqueLivresCanvas(1),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_defi_tpl_2_totaux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne toutes les valeurs utiles.",
    tags: ["cm2", "graphique", "defi", "total", "template", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Quel est le total des activités ?",
          total: 38,
          explanation:
            "On additionne : 12 + 9 + 7 + 10 = 38.",
          canvas: graphiqueActivitesCanvas(),
        },
        {
          text: "Quel est le total des fruits vendus ?",
          total: 85,
          explanation:
            "On additionne : 24 + 28 + 15 + 18 = 85.",
          canvas: graphiqueFruitsCanvas(),
        },
        {
          text: "Quel est le total des livres lus ?",
          total: 63,
          explanation:
            "On additionne : 14 + 22 + 18 + 9 = 63.",
          canvas: graphiqueLivresCanvas(),
        },
        {
          text: "Quel est le total des menus choisis ?",
          total: 50,
          explanation:
            "On additionne : 16 + 14 + 8 + 12 = 50.",
          canvas: graphiqueCantineCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "short",
        expected: [String(item.total)],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_defi_tpl_3_differences",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Pour calculer un écart, on fait une soustraction.",
    tags: ["cm2", "graphique", "defi", "difference", "template", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Combien d’élèves de plus ont choisi Foot que Danse ?",
          expected: 3,
          explanation:
            "Foot vaut 12 et Danse vaut 9. On calcule 12 - 9 = 3.",
          canvas: graphiqueActivitesCanvas(),
        },
        {
          text: "Combien de bananes de plus que de mangues ont été vendues ?",
          expected: 13,
          explanation:
            "Bananes vaut 28 et Mangues vaut 15. On calcule 28 - 15 = 13.",
          canvas: graphiqueFruitsCanvas(),
        },
        {
          text: "Combien de BD de plus que de romans ont été lues ?",
          expected: 8,
          explanation:
            "BD vaut 22 et Romans vaut 14. On calcule 22 - 14 = 8.",
          canvas: graphiqueLivresCanvas(),
        },
        {
          text: "Quel est l’écart entre jeudi et lundi ?",
          expected: 3,
          explanation:
            "Jeudi vaut 28 et lundi vaut 25. On calcule 28 - 25 = 3.",
          canvas: graphiqueMeteoCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "short",
        expected: [String(item.expected)],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_defi_tpl_4_erreurs",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Relis la valeur ou refais le calcul.",
    tags: ["cm2", "graphique", "defi", "erreur", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un élève dit : “Nage est l’activité la plus choisie.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Nage vaut 7, alors que Foot vaut 12.",
          canvas: graphiqueActivitesCanvas(),
        },
        {
          text: "Un élève dit : “Les bananes sont les fruits les plus vendus.” A-t-il raison ?",
          expected: "oui",
          explanation:
            "Oui. Les bananes valent 28, c’est la plus grande valeur.",
          canvas: graphiqueFruitsCanvas(),
        },
        {
          text: "Un élève dit : “Le total des activités est 28.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Le total correct est 12 + 9 + 7 + 10 = 38.",
          canvas: graphiqueActivitesCanvas(),
        },
        {
          text: "Un élève dit : “Les BD sont les livres les plus lus.” A-t-il raison ?",
          expected: "oui",
          explanation:
            "Oui. Les BD valent 22, c’est la plus grande valeur.",
          canvas: graphiqueLivresCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },
];