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
];