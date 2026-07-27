// lib/tutor-v4/question-banks/maths/cm1/graphiques.bank.ts

import type {
  TutorBankItemV4,
  StatGraphCanvasData,
} from "@/lib/tutor-v4/types";


type GraphType = "barres" | "batons" | "camembert";


function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  const unique = Array.from(new Set([correct, ...wrongs]));
  return shuffle(unique).slice(0, 4);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
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
// CONTEXTES ROBUSTES
// ============================================================

const GRAPH_CONTEXTES_ROBUSTES = [
  {
    title: "Activités sportives",
    theme: "sport" as const,
    labels: ["Football", "Danse", "Natation", "Basket"],
    unit: "élèves",
  },
  {
    title: "Fruits au marché",
    theme: "reunion" as const,
    labels: ["Mangues", "Ananas", "Bananes", "Letchis"],
    unit: "fruits",
  },
  {
    title: "Livres empruntés",
    theme: "neutral" as const,
    labels: ["Romans", "BD", "Documentaires", "Albums"],
    unit: "livres",
  },
  {
    title: "Défis de calcul",
    theme: "neutral" as const,
    labels: ["Équipe A", "Équipe B", "Équipe C", "Équipe D"],
    unit: "points",
  },
  {
    title: "Randonnée à La Réunion",
    theme: "reunion" as const,
    labels: ["Eau", "Fruits", "Sandwichs", "Casquettes"],
    unit: "objets",
  },
  {
    title: "Jardin de l’école",
    theme: "neutral" as const,
    labels: ["Tomates", "Salades", "Carottes", "Fleurs"],
    unit: "plants",
  },
];

function randomContext() {
  return randomChoice(GRAPH_CONTEXTES_ROBUSTES);
}

function uniqueValues(count: number, min: number, max: number) {
  const values = new Set<number>();

  while (values.size < count) {
    values.add(randomInt(min, max));
  }

  return Array.from(values);
}

function makeData(labels: string[], values: number[]) {
  return labels.map((label, index) => ({
    label,
    value: values[index],
  }));
}

function total(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}

function maxIndex(values: number[]) {
  let index = 0;

  for (let i = 1; i < values.length; i++) {
    if (values[i] > values[index]) index = i;
  }

  return index;
}

function minIndex(values: number[]) {
  let index = 0;

  for (let i = 1; i < values.length; i++) {
    if (values[i] < values[index]) index = i;
  }

  return index;
}

function randomGraphType(): GraphType {
  return randomChoice(["barres", "batons"]);
}

// ============================================================
// BANK
// ============================================================

export const graphiquesBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un graphique en barres, la barre des bananes monte jusqu'à 28. Combien de bananes ?",
    format: "qcm",
    choices: ["28","2","8","280"],
    expected: ["28"],
    comparator: "mcq_exact",
    hint: "On lit la hauteur de la barre.",
    explanation: "La hauteur de la barre des bananes est 28 : il y a 28 bananes.",
    tags: ["cm1","graphique","graphique_lire","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_g2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un graphique en barres, la barre la plus haute représente...",
    format: "qcm",
    choices: ["la plus grande valeur","la plus petite valeur","le total","la moyenne"],
    expected: ["la plus grande valeur"],
    comparator: "mcq_exact",
    hint: "Plus la barre est haute, plus la valeur est grande.",
    explanation: "La barre la plus haute correspond à la plus grande valeur.",
    tags: ["cm1","graphique","graphique_lire","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Un graphique doit montrer 15 mangues, mais la barre est vide. À quelle hauteur faut-il la tracer ?",
    format: "qcm",
    choices: ["15","5","1","50"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "La hauteur doit correspondre à la donnée.",
    explanation: "La barre doit monter jusqu'à 15, car il y a 15 mangues.",
    tags: ["cm1","graphique","graphique_completer","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_graphique_interpreter_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un graphique : ananas 24, bananes 28, mangues 10. Quel fruit a la barre la plus haute ?",
    format: "qcm",
    choices: ["bananes","ananas","mangues","tous pareil"],
    expected: ["bananes"],
    comparator: "mcq_exact",
    hint: "La barre la plus haute = la plus grande valeur.",
    explanation: "La plus grande valeur est 28 (bananes) : c'est la barre la plus haute.",
    tags: ["cm1","graphique","graphique_interpreter","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un graphique : ananas 24, bananes 28. Combien de bananes de plus que d'ananas ?",
    format: "qcm",
    choices: ["4","2","52","24"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Soustrais les deux valeurs.",
    explanation: "28 − 24 = 4 bananes de plus.",
    tags: ["cm1","graphique","graphique_defi","guide","qcm"],
  },

  // ============================================================
  // GRAPHIQUE_LIRE
  // Lire une valeur directe dans un graphique
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_1_activites",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "sport",
    text: "Dans le graphique, combien d’élèves ont choisi la natation ?",
    format: "qcm",
    choices: ["10", "8", "12", "30"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Cherche la barre Natation.",
    explanation: exp(
      "Un graphique permet de représenter des données avec des barres ou des bâtons.",
      "On repère la catégorie demandée, puis on lit sa valeur.",
      "La barre Natation correspond à 10.",
      "10 élèves ont choisi la natation."
    ),
    tags: ["cm1", "graphique", "lire", "qcm", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Activités choisies",
      data: [
        { label: "Football", value: 12 },
        { label: "Danse", value: 8 },
        { label: "Natation", value: 10 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 2,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_2_fruits_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Dans le graphique, combien de mangues ont été vendues ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Lis la valeur de la barre Mangues.",
    explanation: exp(
      "Lire un graphique, c’est retrouver une valeur représentée visuellement.",
      "On cherche la catégorie Mangues.",
      "La valeur indiquée pour Mangues est 18.",
      "18 mangues ont été vendues."
    ),
    tags: ["cm1", "graphique", "lire", "reunion", "short", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Fruits vendus au marché",
      data: [
        { label: "Mangues", value: 18 },
        { label: "Ananas", value: 12 },
        { label: "Bananes", value: 25 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 0,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_3_livres",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de BD ont été empruntées ?",
    format: "qcm",
    choices: ["14", "9", "20", "11"],
    expected: ["14"],
    comparator: "mcq_exact",
    hint: "Cherche la barre BD.",
    explanation: exp(
      "Un graphique associe chaque catégorie à une valeur.",
      "On repère la catégorie BD.",
      "La barre BD vaut 14.",
      "14 BD ont été empruntées."
    ),
    tags: ["cm1", "graphique", "lire", "qcm", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Livres empruntés",
      data: [
        { label: "Romans", value: 9 },
        { label: "BD", value: 14 },
        { label: "Documentaires", value: 11 },
        { label: "Albums", value: 6 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 1,
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_graphique_lire_tpl_1_valeur_aleatoire_short",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Repère la catégorie demandée, puis lis la valeur.",
    tags: ["cm1", "graphique", "lire", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 4);
      const values = uniqueValues(labels.length, 5, 28);
      const index = randomInt(0, labels.length - 1);
      const correct = String(values[index]);

      return {
        theme: ctx.theme,
        text: `Dans le graphique, quelle est la valeur pour "${labels[index]}" ?`,
        format: "short",
        expected: [correct],
        comparator: "number_equal",
        explanation: exp(
          "Lire un graphique, c’est retrouver une valeur représentée.",
          "On cherche la catégorie demandée, puis on lit le nombre associé.",
          `La catégorie ${labels[index]} a pour valeur ${correct}.`,
          `La réponse est ${correct}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: index,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_lire_tpl_2_valeur_aleatoire_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "La réponse est écrite au-dessus ou à côté de la bonne barre.",
    tags: ["cm1", "graphique", "lire", "qcm", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 4);
      const values = uniqueValues(labels.length, 6, 30);
      const index = randomInt(0, labels.length - 1);

      const correct = String(values[index]);
      const wrongs = values
        .filter((_, i) => i !== index)
        .map(String);

      return {
        theme: ctx.theme,
        text: `Quelle est la valeur de "${labels[index]}" ?`,
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un graphique permet de lire rapidement une donnée.",
          "On repère la bonne catégorie sur l’axe ou sous la barre.",
          `Pour ${labels[index]}, on lit ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: index,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_lire_tpl_3_camembert_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère la part demandée et lis sa valeur.",
    tags: ["cm1", "graphique", "lire", "camembert", "template", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 3);
      const values = uniqueValues(labels.length, 5, 20);
      const index = randomInt(0, labels.length - 1);
      const correct = String(values[index]);

      return {
        theme: ctx.theme,
        text: `Dans le diagramme, quelle est la valeur de "${labels[index]}" ?`,
        format: "qcm",
        choices: makeChoices(
          correct,
          values.filter((_, i) => i !== index).map(String)
        ),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un diagramme circulaire représente des catégories avec des parts.",
          "On repère la part demandée et sa valeur.",
          `La part ${labels[index]} vaut ${correct}.`,
          `La réponse est ${correct}.`
        ),
        canvas: statGraphCanvas({
          graphType: "camembert",
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: index,
          },
        }),
      };
    },
  },

  // ============================================================
  // GRAPHIQUE_COMPLETER
  // Retrouver une valeur manquante ou un total
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_1_total_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Le total est 40 fruits. Il y a 15 mangues et 10 ananas. Combien manque-t-il pour les bananes ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Additionne les fruits connus, puis complète jusqu’à 40.",
    explanation: exp(
      "Compléter un graphique peut demander de retrouver une valeur manquante.",
      "On additionne les valeurs connues, puis on soustrait au total.",
      "15 + 10 = 25, puis 40 - 25 = 15.",
      "Il manque 15 bananes."
    ),
    tags: ["cm1", "graphique", "completer", "total", "reunion", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Fruits vendus",
      data: [
        { label: "Mangues", value: 15 },
        { label: "Ananas", value: 10 },
        { label: "Bananes", value: 15 },
      ],
      display: {
        showLabels: true,
        showValues: false,
        highlightIndex: 2,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_2_total_sport",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "sport",
    text: "9 élèves choisissent le football, 7 la danse et 8 la natation. Quel est le total ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Additionne les trois valeurs.",
    explanation: exp(
      "Pour compléter un total, on additionne toutes les valeurs.",
      "On ajoute les élèves de chaque activité.",
      "9 + 7 + 8 = 24.",
      "Le total est 24 élèves."
    ),
    tags: ["cm1", "graphique", "completer", "total", "sport", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Activités choisies",
      data: [
        { label: "Football", value: 9 },
        { label: "Danse", value: 7 },
        { label: "Natation", value: 8 },
      ],
      display: {
        showLabels: true,
        showValues: true,
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_graphique_completer_tpl_1_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour trouver un total, additionne toutes les valeurs.",
    tags: ["cm1", "graphique", "completer", "total", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 3);
      const values = uniqueValues(labels.length, 5, 20);
      const result = total(values);

      return {
        theme: ctx.theme,
        text: `Quel est le total des ${ctx.unit} représentés dans le graphique ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Le total d’un graphique est la somme de toutes les valeurs.",
          "On additionne les valeurs représentées.",
          `${values.join(" + ")} = ${result}.`,
          `Le total est ${result}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_completer_tpl_2_valeur_manquante_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les valeurs connues, puis soustrais au total.",
    tags: ["cm1", "graphique", "completer", "valeur_manquante", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 3);
      const values = uniqueValues(labels.length, 6, 18);

      const missingIndex = randomInt(0, labels.length - 1);
      const missingValue = values[missingIndex];
      const result = total(values);
      const knownSum = result - missingValue;

      return {
        theme: ctx.theme,
        text: `Le total est ${result}. Les autres valeurs font ${knownSum}. Quelle est la valeur de "${labels[missingIndex]}" ?`,
        format: "short",
        expected: [String(missingValue)],
        comparator: "number_equal",
        explanation: exp(
          "Pour retrouver une valeur manquante, on utilise le total.",
          "On soustrait la somme des valeurs connues au total.",
          `${result} - ${knownSum} = ${missingValue}.`,
          `La valeur manquante est ${missingValue}.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: false,
            highlightIndex: missingIndex,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_completer_tpl_3_completer_jusqua",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche combien il manque pour atteindre la valeur demandée.",
    tags: ["cm1", "graphique", "completer", "complement", "template", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 3);

      const current = randomInt(8, 18);
      const missing = randomInt(4, 12);
      const target = current + missing;

      const otherValues = uniqueValues(2, 5, 25);
      const values = [current, otherValues[0], otherValues[1]];

      return {
        theme: ctx.theme,
        text: `${labels[0]} vaut ${current}. Combien faut-il ajouter pour atteindre ${target} ?`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Compléter une valeur, c’est chercher ce qui manque.",
          "On soustrait la valeur actuelle à la valeur visée.",
          `${target} - ${current} = ${missing}.`,
          `Il faut ajouter ${missing}.`
        ),
        canvas: statGraphCanvas({
          graphType: "batons",
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 0,
          },
        }),
      };
    },
  },

  // ============================================================
  // GRAPHIQUE_INTERPRETER
  // Comparer, trouver un maximum, minimum, écart, total
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_interpreter_fixed_1_plus_grand",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "sport",
    text: "Quelle activité est la plus choisie ?",
    format: "qcm",
    choices: ["Football", "Danse", "Natation", "On ne peut pas savoir"],
    expected: ["Football"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus haute.",
    explanation: exp(
      "Interpréter un graphique, c’est utiliser les données pour répondre.",
      "Pour trouver la catégorie la plus choisie, on cherche la plus grande valeur.",
      "Football : 16, Danse : 9, Natation : 12. La plus grande valeur est 16.",
      "L’activité la plus choisie est Football."
    ),
    tags: ["cm1", "graphique", "interpreter", "plus_grand", "qcm", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Activités choisies",
      data: [
        { label: "Football", value: 16 },
        { label: "Danse", value: 9 },
        { label: "Natation", value: 12 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 0,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_interpreter_fixed_2_difference",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de livres de plus en BD qu’en romans ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compare 14 et 9.",
    explanation: exp(
      "Un écart se calcule avec une soustraction.",
      "On soustrait la plus petite valeur à la plus grande.",
      "14 - 9 = 5.",
      "Il y a 5 livres de plus en BD qu’en romans."
    ),
    tags: ["cm1", "graphique", "interpreter", "difference", "short", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Livres empruntés",
      data: [
        { label: "Romans", value: 9 },
        { label: "BD", value: 14 },
        { label: "Documentaires", value: 11 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 1,
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_graphique_interpreter_tpl_1_plus_grand",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la barre la plus haute ou la plus grande valeur.",
    tags: ["cm1", "graphique", "interpreter", "plus_grand", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 4);
      const values = shuffle([
        randomInt(5, 10),
        randomInt(11, 15),
        randomInt(16, 20),
        randomInt(21, 28),
      ]);

      const index = maxIndex(values);
      const correct = labels[index];

      return {
        theme: ctx.theme,
        text: "Quelle catégorie a la plus grande valeur ?",
        format: "qcm",
        choices: makeChoices(correct, labels.filter((l) => l !== correct)),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver la plus grande catégorie, on compare les valeurs.",
          "On cherche le nombre le plus grand.",
          `Le plus grand nombre est ${values[index]}, pour ${correct}.`,
          `La réponse est ${correct}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: index,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_interpreter_tpl_2_plus_petit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la barre la plus basse ou la plus petite valeur.",
    tags: ["cm1", "graphique", "interpreter", "plus_petit", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 4);
      const values = shuffle([
        randomInt(4, 8),
        randomInt(9, 13),
        randomInt(14, 18),
        randomInt(19, 24),
      ]);

      const index = minIndex(values);
      const correct = labels[index];

      return {
        theme: ctx.theme,
        text: "Quelle catégorie a la plus petite valeur ?",
        format: "qcm",
        choices: makeChoices(correct, labels.filter((l) => l !== correct)),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver la plus petite catégorie, on compare les valeurs.",
          "On cherche le nombre le plus petit.",
          `Le plus petit nombre est ${values[index]}, pour ${correct}.`,
          `La réponse est ${correct}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: index,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_interpreter_tpl_3_difference",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour trouver une différence, fais une soustraction.",
    tags: ["cm1", "graphique", "interpreter", "difference", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 3);

      const small = randomInt(6, 15);
      const diff = randomInt(3, 12);
      const big = small + diff;
      const other = randomInt(5, 25);

      const values = [small, big, other];

      return {
        theme: ctx.theme,
        text: `Quelle est la différence entre "${labels[1]}" et "${labels[0]}" ?`,
        format: "short",
        expected: [String(diff)],
        comparator: "number_equal",
        explanation: exp(
          "Une différence est l’écart entre deux valeurs.",
          "On soustrait la plus petite valeur à la plus grande.",
          `${big} - ${small} = ${diff}.`,
          `La différence est ${diff}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_interpreter_tpl_4_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les valeurs du graphique.",
    tags: ["cm1", "graphique", "interpreter", "total", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 4);
      const values = uniqueValues(labels.length, 4, 18);
      const result = total(values);

      return {
        theme: ctx.theme,
        text: `Combien y a-t-il de ${ctx.unit} en tout ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Le total d’un graphique est la somme de toutes les valeurs.",
          "On additionne les nombres représentés.",
          `${values.join(" + ")} = ${result}.`,
          `Il y a ${result} ${ctx.unit} en tout.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
          },
        }),
      };
    },
  },

  // ============================================================
  // GRAPHIQUE_DEFI
  // Problèmes courts à 2 étapes maximum
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_1_total_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché, combien de fruits ont été vendus en tout ?",
    format: "short",
    expected: ["55"],
    comparator: "number_equal",
    hint: "Additionne les trois valeurs du graphique.",
    explanation: exp(
      "Un défi de graphique peut demander d’utiliser plusieurs valeurs.",
      "Ici, on additionne toutes les ventes.",
      "18 + 12 + 25 = 55.",
      "55 fruits ont été vendus en tout."
    ),
    tags: ["cm1", "graphique", "defi", "total", "reunion", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Fruits vendus au marché",
      data: [
        { label: "Mangues", value: 18 },
        { label: "Ananas", value: 12 },
        { label: "Bananes", value: 25 },
      ],
      display: {
        showLabels: true,
        showValues: true,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_2_difference_sports",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 3,
    theme: "sport",
    text: "Combien d’élèves de plus ont choisi le football que la danse ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Compare 16 et 9.",
    explanation: exp(
      "Pour comparer deux catégories, on calcule leur différence.",
      "On soustrait la plus petite valeur à la plus grande.",
      "16 - 9 = 7.",
      "Il y a 7 élèves de plus en football qu’en danse."
    ),
    tags: ["cm1", "graphique", "defi", "difference", "sport", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Activités sportives",
      data: [
        { label: "Football", value: 16 },
        { label: "Danse", value: 9 },
        { label: "Natation", value: 12 },
      ],
      display: {
        showLabels: true,
        showValues: true,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_3_plus_grand_et_ecart",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la différence entre la catégorie la plus grande et la plus petite ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Cherche d’abord le plus grand nombre et le plus petit nombre.",
    explanation: exp(
      "Ce défi demande deux étapes : repérer puis calculer.",
      "On cherche le plus grand nombre et le plus petit nombre.",
      "Albums : 6, Romans : 9, Documentaires : 11, BD : 18. Différence : 18 - 6 = 12.",
      "La différence est 12."
    ),
    tags: ["cm1", "graphique", "defi", "ecart_extremes", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Livres empruntés",
      data: [
        { label: "Romans", value: 9 },
        { label: "BD", value: 18 },
        { label: "Documentaires", value: 11 },
        { label: "Albums", value: 6 },
      ],
      display: {
        showLabels: true,
        showValues: true,
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_graphique_defi_tpl_1_total_general",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les valeurs.",
    tags: ["cm1", "graphique", "defi", "total_general", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 4);
      const values = uniqueValues(labels.length, 4, 20);
      const result = total(values);

      return {
        theme: ctx.theme,
        text: `Quel est le total des ${ctx.unit} représentés par ce graphique ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Un total regroupe toutes les valeurs.",
          "On additionne toutes les catégories du graphique.",
          `${values.join(" + ")} = ${result}.`,
          `Le total est ${result}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_defi_tpl_2_ecart_extremes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche le plus grand nombre, le plus petit nombre, puis soustrais.",
    tags: ["cm1", "graphique", "defi", "ecart_extremes", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 4);
      const values = shuffle([
        randomInt(4, 8),
        randomInt(9, 13),
        randomInt(14, 18),
        randomInt(19, 25),
      ]);

      const max = Math.max(...values);
      const min = Math.min(...values);
      const diff = max - min;

      return {
        theme: ctx.theme,
        text: "Quelle est la différence entre la plus grande valeur et la plus petite valeur ?",
        format: "short",
        expected: [String(diff)],
        comparator: "number_equal",
        explanation: exp(
          "La différence entre les extrêmes se calcule avec une soustraction.",
          "On repère d’abord la plus grande valeur et la plus petite valeur.",
          `${max} - ${min} = ${diff}.`,
          `La différence est ${diff}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_defi_tpl_3_comparer_deux_categories",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les deux valeurs demandées.",
    tags: ["cm1", "graphique", "defi", "comparer_categories", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 4);

      const a = randomInt(8, 18);
      const diff = randomInt(3, 10);
      const b = a + diff;
      const c = randomInt(5, 25);
      const d = randomInt(5, 25);

      const values = [a, b, c, d];

      return {
        theme: ctx.theme,
        text: `Combien y a-t-il de plus pour "${labels[1]}" que pour "${labels[0]}" ?`,
        format: "short",
        expected: [String(diff)],
        comparator: "number_equal",
        explanation: exp(
          "Pour savoir combien il y a de plus, on calcule une différence.",
          "On soustrait la plus petite valeur à la plus grande.",
          `${b} - ${a} = ${diff}.`,
          `Il y a ${diff} de plus pour ${labels[1]}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
          },
        }),
      };
    },
  },

  // ============================================================
  // TOP-UP — GRAPHIQUE_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_4_basket",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "sport",
    text: "Dans le graphique, combien d’élèves font du basket ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Lis la valeur de la barre Basket.",
    explanation: exp(
      "Un graphique associe chaque catégorie à une hauteur de barre.",
      "On repère la barre Basket et on lit sa valeur.",
      "La barre Basket vaut 14.",
      "14 élèves font du basket."
    ),
    tags: ["cm1", "graphique", "lire", "sport", "short", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Activités sportives",
      data: [
        { label: "Football", value: 12 },
        { label: "Danse", value: 8 },
        { label: "Natation", value: 10 },
        { label: "Basket", value: 14 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 3 },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_5_tomates",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de plants de tomates y a-t-il dans le jardin ?",
    format: "qcm",
    choices: ["10", "7", "12", "5"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Cherche la barre Tomates.",
    explanation: exp(
      "Chaque barre représente une catégorie du jardin.",
      "On repère la barre Tomates.",
      "La barre Tomates vaut 10.",
      "Il y a 10 plants de tomates."
    ),
    tags: ["cm1", "graphique", "lire", "qcm", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Jardin de l’école",
      data: [
        { label: "Tomates", value: 10 },
        { label: "Salades", value: 7 },
        { label: "Carottes", value: 12 },
        { label: "Fleurs", value: 5 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 0 },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_6_sandwichs",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Pour la randonnée, combien de sandwichs ont été préparés ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Lis la valeur de la barre Sandwichs.",
    explanation: exp(
      "Un graphique permet de lire vite une quantité.",
      "On repère la barre Sandwichs.",
      "La barre Sandwichs vaut 9.",
      "9 sandwichs ont été préparés."
    ),
    tags: ["cm1", "graphique", "lire", "reunion", "short", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Randonnée à La Réunion",
      data: [
        { label: "Eau", value: 8 },
        { label: "Fruits", value: 6 },
        { label: "Sandwichs", value: 9 },
        { label: "Casquettes", value: 4 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 2 },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_7_camembert_equipe",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le diagramme, combien de points a marqués l’Équipe B ?",
    format: "qcm",
    choices: ["15", "10", "8", "33"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "Repère la part de l’Équipe B.",
    explanation: exp(
      "Un diagramme circulaire représente chaque équipe par une part.",
      "On repère la part de l’Équipe B et sa valeur.",
      "La part de l’Équipe B vaut 15.",
      "L’Équipe B a marqué 15 points."
    ),
    tags: ["cm1", "graphique", "lire", "camembert", "qcm", "canvas"],
    canvas: statGraphCanvas({
      graphType: "camembert",
      title: "Défis de calcul",
      data: [
        { label: "Équipe A", value: 10 },
        { label: "Équipe B", value: 15 },
        { label: "Équipe C", value: 8 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 1 },
    }),
  },

  // ============================================================
  // TOP-UP — GRAPHIQUE_COMPLETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_3_total_jardin",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Il y a 10 tomates, 7 salades et 12 carottes. Quel est le total de plants ?",
    format: "short",
    expected: ["29"],
    comparator: "number_equal",
    hint: "Additionne les trois valeurs.",
    explanation: exp(
      "Un total regroupe toutes les valeurs.",
      "On additionne les plants de chaque catégorie.",
      "10 + 7 + 12 = 29.",
      "Le total est 29 plants."
    ),
    tags: ["cm1", "graphique", "completer", "total", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Jardin de l’école",
      data: [
        { label: "Tomates", value: 10 },
        { label: "Salades", value: 7 },
        { label: "Carottes", value: 12 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_4_bananes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "reunion",
    text: "Le total est 40 fruits. Il y a 15 mangues et 12 ananas. Quelle est la valeur des bananes ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Additionne les fruits connus, puis complète jusqu’à 40.",
    explanation: exp(
      "On retrouve une valeur manquante grâce au total.",
      "On additionne les valeurs connues, puis on soustrait au total.",
      "15 + 12 = 27, puis 40 - 27 = 13.",
      "La barre Bananes vaut 13."
    ),
    tags: ["cm1", "graphique", "completer", "valeur_manquante", "reunion", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Fruits vendus",
      data: [
        { label: "Mangues", value: 15 },
        { label: "Ananas", value: 12 },
        { label: "Bananes", value: 13 },
      ],
      display: { showLabels: true, showValues: false, highlightIndex: 2 },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_5_complement_romans",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    text: "La barre Romans vaut 9. Combien faut-il ajouter pour atteindre 15 ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cherche ce qui manque entre 9 et 15.",
    explanation: exp(
      "Compléter une barre, c’est chercher ce qui manque.",
      "On soustrait la valeur actuelle à la valeur visée.",
      "15 - 9 = 6.",
      "Il faut ajouter 6."
    ),
    tags: ["cm1", "graphique", "completer", "complement", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Livres empruntés",
      data: [
        { label: "Romans", value: 9 },
        { label: "BD", value: 14 },
        { label: "Albums", value: 6 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 0 },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_6_total_quatre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "sport",
    text: "12 élèves font du football, 8 de la danse, 10 de la natation et 14 du basket. Quel est le total ?",
    format: "short",
    expected: ["44"],
    comparator: "number_equal",
    hint: "Additionne les quatre valeurs.",
    explanation: exp(
      "Un total regroupe toutes les valeurs.",
      "On additionne les élèves de chaque activité.",
      "12 + 8 + 10 + 14 = 44.",
      "Le total est 44 élèves."
    ),
    tags: ["cm1", "graphique", "completer", "total", "sport", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Activités sportives",
      data: [
        { label: "Football", value: 12 },
        { label: "Danse", value: 8 },
        { label: "Natation", value: 10 },
        { label: "Basket", value: 14 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_7_manquante_eau",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "reunion",
    text: "Le total est 27 objets. Les fruits, sandwichs et casquettes font 19 en tout. Quelle est la valeur de l’eau ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Soustrais la somme connue au total.",
    explanation: exp(
      "On retrouve une valeur manquante grâce au total.",
      "On soustrait la somme des valeurs connues au total.",
      "27 - 19 = 8.",
      "La barre Eau vaut 8."
    ),
    tags: ["cm1", "graphique", "completer", "valeur_manquante", "reunion", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Randonnée à La Réunion",
      data: [
        { label: "Eau", value: 8 },
        { label: "Fruits", value: 6 },
        { label: "Sandwichs", value: 9 },
        { label: "Casquettes", value: 4 },
      ],
      display: { showLabels: true, showValues: false, highlightIndex: 0 },
    }),
  },

  // ============================================================
  // TOP-UP — GRAPHIQUE_INTERPRETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_interpreter_fixed_3_plus_grand_jardin",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quel légume est le plus cultivé dans le jardin ?",
    format: "qcm",
    choices: ["Carottes", "Tomates", "Salades", "Fleurs"],
    expected: ["Carottes"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus haute.",
    explanation: exp(
      "Interpréter un graphique, c’est comparer les valeurs.",
      "Pour le plus cultivé, on cherche la plus grande barre.",
      "Tomates : 10, Salades : 7, Carottes : 12, Fleurs : 5. La plus grande est 12.",
      "Le légume le plus cultivé est la carotte."
    ),
    tags: ["cm1", "graphique", "interpreter", "plus_grand", "qcm", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Jardin de l’école",
      data: [
        { label: "Tomates", value: 10 },
        { label: "Salades", value: 7 },
        { label: "Carottes", value: 12 },
        { label: "Fleurs", value: 5 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 2 },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_interpreter_fixed_4_plus_petit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "De quel objet a-t-on emporté le moins pour la randonnée ?",
    format: "qcm",
    choices: ["Casquettes", "Eau", "Fruits", "Sandwichs"],
    expected: ["Casquettes"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus basse.",
    explanation: exp(
      "Pour le moins emporté, on cherche la plus petite valeur.",
      "On compare les valeurs des barres.",
      "Eau : 8, Fruits : 6, Sandwichs : 9, Casquettes : 4. La plus petite est 4.",
      "On a emporté le moins de casquettes."
    ),
    tags: ["cm1", "graphique", "interpreter", "plus_petit", "reunion", "qcm", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Randonnée à La Réunion",
      data: [
        { label: "Eau", value: 8 },
        { label: "Fruits", value: 6 },
        { label: "Sandwichs", value: 9 },
        { label: "Casquettes", value: 4 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 3 },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_interpreter_fixed_5_difference_legumes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Combien y a-t-il de carottes de plus que de salades ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compare 12 et 7.",
    explanation: exp(
      "Un écart se calcule avec une soustraction.",
      "On soustrait la plus petite valeur à la plus grande.",
      "12 - 7 = 5.",
      "Il y a 5 carottes de plus que de salades."
    ),
    tags: ["cm1", "graphique", "interpreter", "difference", "short", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Jardin de l’école",
      data: [
        { label: "Tomates", value: 10 },
        { label: "Salades", value: 7 },
        { label: "Carottes", value: 12 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 2 },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_interpreter_fixed_6_total_sports",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "sport",
    text: "Combien d’élèves ont été interrogés en tout ?",
    format: "short",
    expected: ["44"],
    comparator: "number_equal",
    hint: "Additionne toutes les barres.",
    explanation: exp(
      "Le total d’un graphique est la somme de toutes les valeurs.",
      "On additionne les barres.",
      "12 + 8 + 10 + 14 = 44.",
      "44 élèves ont été interrogés en tout."
    ),
    tags: ["cm1", "graphique", "interpreter", "total", "sport", "short", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Activités sportives",
      data: [
        { label: "Football", value: 12 },
        { label: "Danse", value: 8 },
        { label: "Natation", value: 10 },
        { label: "Basket", value: 14 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },

  // ============================================================
  // TOP-UP — GRAPHIQUE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_4_total_jardin",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de plants y a-t-il en tout dans le jardin ?",
    format: "short",
    expected: ["34"],
    comparator: "number_equal",
    hint: "Additionne les quatre barres.",
    explanation: exp(
      "Un défi peut demander d’additionner toutes les valeurs.",
      "On additionne tous les plants.",
      "10 + 7 + 12 + 5 = 34.",
      "Il y a 34 plants en tout."
    ),
    tags: ["cm1", "graphique", "defi", "total_general", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Jardin de l’école",
      data: [
        { label: "Tomates", value: 10 },
        { label: "Salades", value: 7 },
        { label: "Carottes", value: 12 },
        { label: "Fleurs", value: 5 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_5_ecart_extremes_rando",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Quelle est la différence entre l’objet le plus emporté et le moins emporté ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Cherche le plus grand et le plus petit nombre, puis soustrais.",
    explanation: exp(
      "Ce défi demande deux étapes : repérer puis calculer.",
      "On cherche la plus grande valeur et la plus petite.",
      "Sandwichs : 9 (max), Casquettes : 4 (min). Différence : 9 - 4 = 5.",
      "La différence est 5."
    ),
    tags: ["cm1", "graphique", "defi", "ecart_extremes", "reunion", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Randonnée à La Réunion",
      data: [
        { label: "Eau", value: 8 },
        { label: "Fruits", value: 6 },
        { label: "Sandwichs", value: 9 },
        { label: "Casquettes", value: 4 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_6_comparer_equipes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de points l’Équipe B a-t-elle de plus que l’Équipe C ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Compare les points de l’Équipe B et de l’Équipe C.",
    explanation: exp(
      "Pour comparer deux équipes, on calcule leur différence.",
      "On soustrait la plus petite valeur à la plus grande.",
      "Équipe B : 15, Équipe C : 8. 15 - 8 = 7.",
      "L’Équipe B a 7 points de plus."
    ),
    tags: ["cm1", "graphique", "defi", "comparer_categories", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Défis de calcul",
      data: [
        { label: "Équipe A", value: 10 },
        { label: "Équipe B", value: 15 },
        { label: "Équipe C", value: 8 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_7_deux_etapes_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "reunion",
    text: "On a vendu 18 mangues et 12 ananas le matin, puis 25 bananes l’après-midi. Combien de fruits en tout ?",
    format: "short",
    expected: ["55"],
    comparator: "number_equal",
    hint: "Additionne toutes les valeurs.",
    explanation: exp(
      "Un défi peut combiner plusieurs valeurs du graphique.",
      "On additionne les ventes du matin et de l’après-midi.",
      "18 + 12 + 25 = 55.",
      "55 fruits ont été vendus en tout."
    ),
    tags: ["cm1", "graphique", "defi", "total", "reunion", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Fruits vendus au marché",
      data: [
        { label: "Mangues", value: 18 },
        { label: "Ananas", value: 12 },
        { label: "Bananes", value: 25 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },
];