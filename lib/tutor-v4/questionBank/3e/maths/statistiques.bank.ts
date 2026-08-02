// lib/tutor-v4/question-banks/maths/3e/statistiques.bank.ts

import type {
  TutorBankItemV4,
  StatGraphCanvasData,
} from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatNumber(n: number) {
  const rounded = Math.round(n * 100) / 100;
  return Number.isInteger(rounded)
    ? String(rounded)
    : String(rounded).replace(".", ",");
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
}

function moyenne(values: number[]) {
  return values.reduce((s, v) => s + v, 0) / values.length;
}

function mediane(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;

  if (n % 2 === 1) return sorted[Math.floor(n / 2)];

  return (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
}

function etendue(values: number[]) {
  return Math.max(...values) - Math.min(...values);
}

function statGraphCanvas(
  params: Omit<StatGraphCanvasData, "kind">
): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    ...params,
  };
}

export const statistiquesBank: TutorBankItemV4[] = [
  /* =========================
     STAT_LIRE_TABLEAU
  ========================= */

  {
    kind: "fixed",
    id: "3e_stat_lire_tableau_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau statistique, que représente l’effectif d’une catégorie ?",
    format: "qcm",
    choices: [
      "le nombre d’individus dans cette catégorie",
      "la moyenne de la série",
      "la plus grande valeur",
      "l’écart entre deux valeurs",
    ],
    expected: ["le nombre d’individus dans cette catégorie"],
    comparator: "mcq_exact",
    hint: "L’effectif répond à la question : combien ?",
    explanation:
      "Définition : l’effectif d’une catégorie est le nombre d’individus ou de données appartenant à cette catégorie.\n\n" +
      "Méthode : dans un tableau, on repère la catégorie demandée puis on lit le nombre associé.\n\n" +
      "Calcul : ici, il n’y a pas de calcul ; il faut reconnaître le sens du mot effectif.\n\n" +
      "Conclusion : l’effectif indique combien d’éléments appartiennent à une catégorie.",
    tags: ["stat_statistique", "tableau", "effectif", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_stat_lire_tableau_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau, on lit : marche : 18 élèves. Que signifie 18 ?",
    format: "qcm",
    choices: [
      "18 élèves ont choisi marche",
      "la moyenne est 18",
      "il y a 18 activités",
      "la médiane vaut 18",
    ],
    expected: ["18 élèves ont choisi marche"],
    comparator: "mcq_exact",
    hint: "Le nombre 18 est placé en face de la catégorie marche.",
    explanation:
      "Définition : dans un tableau statistique, un effectif indique le nombre d’éléments associés à une catégorie.\n\n" +
      "Méthode : on lit la catégorie, puis l’effectif placé en face.\n\n" +
      "Calcul : la catégorie est « marche » et l’effectif indiqué est 18.\n\n" +
      "Conclusion : cela signifie que 18 élèves ont choisi marche.",
    tags: ["stat_statistique", "tableau", "lecture", "effectif"],
  },

  {
    kind: "template",
    id: "3e_stat_lire_tableau_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    hint: "Lis directement la valeur associée à la catégorie demandée.",
    tags: ["stat_statistique", "tableau", "lecture", "template"],
    generate: () => {
      const labels = ["football", "natation", "danse", "basket"];
      const values = labels.map(() => randomInt(6, 28));
      const i = randomInt(0, labels.length - 1);

      return {
        text: `Dans un tableau, on lit : football : ${values[0]}, natation : ${values[1]}, danse : ${values[2]}, basket : ${values[3]}. Quel est l’effectif pour ${labels[i]} ?`,
        format: "short",
        expected: [String(values[i])],
        comparator: "number_equal",
        explanation:
          `Définition : lire un tableau statistique consiste à retrouver une information à partir d’une catégorie.\n\n` +
          `Méthode : on cherche la catégorie ${labels[i]}, puis on lit le nombre associé.\n\n` +
          `Calcul : dans le tableau, ${labels[i]} correspond à ${values[i]}.\n\n` +
          `Conclusion : l’effectif pour ${labels[i]} est ${values[i]}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_lire_tableau_tpl_2_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "reunion",
    hint: "Repère la commune demandée, puis lis son effectif.",
    tags: ["stat_statistique", "tableau", "lecture", "reunion", "template"],
    generate: () => {
      const labels = ["Saint-Pierre", "Saint-Leu", "Le Tampon", "Entre-Deux"];
      const values = labels.map(() => randomInt(10, 45));
      const i = randomInt(0, labels.length - 1);

      return {
        text: `Lors d’un sondage à La Réunion, on obtient : Saint-Pierre : ${values[0]}, Saint-Leu : ${values[1]}, Le Tampon : ${values[2]}, Entre-Deux : ${values[3]}. Quel est l’effectif pour ${labels[i]} ?`,
        format: "short",
        expected: [String(values[i])],
        comparator: "number_equal",
        explanation:
          `Définition : un tableau statistique permet d’organiser des données par catégories.\n\n` +
          `Méthode : on repère la catégorie demandée, ici ${labels[i]}, puis on lit son effectif.\n\n` +
          `Calcul : le tableau indique ${values[i]} pour ${labels[i]}.\n\n` +
          `Conclusion : l’effectif pour ${labels[i]} est ${values[i]}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_lire_tableau_tpl_3_total",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour obtenir le total, additionne tous les effectifs.",
    tags: ["stat_statistique", "tableau", "effectif_total", "template"],
    generate: () => {
      const a = randomInt(5, 20);
      const b = randomInt(5, 20);
      const c = randomInt(5, 20);
      const total = a + b + c;

      return {
        text: `Dans un tableau statistique, on lit : A : ${a}, B : ${b}, C : ${c}. Quel est l’effectif total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : l’effectif total est le nombre total de données de la série.\n\n` +
          `Méthode : on additionne les effectifs de toutes les catégories.\n\n` +
          `Calcul : ${a} + ${b} + ${c} = ${total}.\n\n` +
          `Conclusion : l’effectif total est ${total}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_stat_lire_tableau_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce que signifie : « vélo : 12 élèves » dans un tableau statistique.",
    format: "open",
    expected: ["vélo", "12", "élèves"],
    comparator: "contains_keyword",
    hint: "Tu dois dire quelle catégorie est concernée et combien d’élèves sont concernés.",
    explanation:
      "Définition : dans un tableau statistique, une catégorie est associée à un effectif.\n\n" +
      "Méthode : on lit la catégorie, puis le nombre placé en face.\n\n" +
      "Calcul : ici, la catégorie est « vélo » et l’effectif est 12.\n\n" +
      "Conclusion : cela signifie que 12 élèves sont dans la catégorie vélo.",
    tags: ["stat_statistique", "tableau", "open", "effectif"],
  },
    /* =========================
     STAT_LIRE_GRAPHIQUE
  ========================= */

  {
    kind: "fixed",
    id: "3e_stat_lire_graphique_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un diagramme en barres, que représente la hauteur d’une barre ?",
    format: "qcm",
    choices: [
      "la valeur ou l’effectif de la catégorie",
      "la couleur de la catégorie",
      "toujours la moyenne",
      "toujours la médiane",
    ],
    expected: ["la valeur ou l’effectif de la catégorie"],
    comparator: "mcq_exact",
    hint: "Plus la barre est haute, plus la valeur représentée est grande.",
    explanation:
      "Définition : un diagramme en barres permet de représenter des effectifs ou des valeurs par des hauteurs.\n\n" +
      "Méthode : on repère la catégorie, puis on lit la hauteur de sa barre.\n\n" +
      "Calcul : ici, il n’y a pas de calcul ; il faut comprendre le rôle de la barre.\n\n" +
      "Conclusion : la hauteur d’une barre représente la valeur ou l’effectif de la catégorie.",
    tags: ["stat_statistique", "graphique", "barres", "qcm"],
  },

  {
    kind: "template",
    id: "3e_stat_lire_graphique_tpl_1_barres",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la valeur écrite au-dessus de la barre demandée.",
    tags: ["stat_statistique", "graphique", "barres", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "A", value: randomInt(5, 18) },
        { label: "B", value: randomInt(8, 25) },
        { label: "C", value: randomInt(6, 22) },
        { label: "D", value: randomInt(4, 20) },
      ];
      const i = randomInt(0, data.length - 1);

      return {
        text: `D’après le graphique, quelle est la valeur de la catégorie ${data[i].label} ?`,
        format: "short",
        expected: [String(data[i].value)],
        comparator: "number_equal",
        explanation:
          `Définition : lire un graphique statistique consiste à retrouver une information représentée visuellement.\n\n` +
          `Méthode : on repère la barre correspondant à la catégorie ${data[i].label}.\n\n` +
          `Calcul : la barre ${data[i].label} indique la valeur ${data[i].value}.\n\n` +
          `Conclusion : la valeur de la catégorie ${data[i].label} est ${data[i].value}.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: i,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_lire_graphique_tpl_2_batons",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la valeur au sommet du bâton.",
    tags: ["stat_statistique", "graphique", "batons", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "1", value: randomInt(2, 10) },
        { label: "2", value: randomInt(4, 14) },
        { label: "3", value: randomInt(3, 12) },
        { label: "4", value: randomInt(1, 9) },
      ];
      const i = randomInt(0, data.length - 1);

      return {
        text: `D’après le diagramme en bâtons, quel est l’effectif associé à la valeur ${data[i].label} ?`,
        format: "short",
        expected: [String(data[i].value)],
        comparator: "number_equal",
        explanation:
          `Définition : un diagramme en bâtons associe une valeur à un effectif.\n\n` +
          `Méthode : on repère le bâton placé au-dessus de ${data[i].label}, puis on lit sa hauteur.\n\n` +
          `Calcul : le bâton correspondant à ${data[i].label} indique ${data[i].value}.\n\n` +
          `Conclusion : l’effectif associé à ${data[i].label} est ${data[i].value}.`,
        canvas: statGraphCanvas({
          graphType: "batons",
          data,
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: i,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_lire_graphique_tpl_3_max",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "reunion",
    hint: "Cherche la barre la plus haute.",
    tags: ["stat_statistique", "graphique", "maximum", "reunion", "canvas"],
    generate: () => {
      const data = [
        { label: "Saint-Pierre", value: randomInt(10, 30) },
        { label: "Saint-Leu", value: randomInt(10, 30) },
        { label: "Tampon", value: randomInt(10, 30) },
      ];

      const max = Math.max(...data.map((d) => d.value));
      const correct = data.find((d) => d.value === max)?.label ?? data[0].label;

      return {
        text: "D’après le graphique, quelle commune a la plus grande valeur ?",
        format: "qcm",
        choices: data.map((d) => d.label),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : lire un graphique permet aussi de comparer plusieurs catégories.\n\n` +
          `Méthode : on cherche la barre la plus haute.\n\n` +
          `Calcul : ${correct} correspond à la valeur la plus grande : ${max}.\n\n` +
          `Conclusion : la commune ayant la plus grande valeur est ${correct}.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: data.findIndex((d) => d.label === correct),
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_lire_graphique_tpl_4_min",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la barre la plus basse.",
    tags: ["stat_statistique", "graphique", "minimum", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "A", value: randomInt(5, 25) },
        { label: "B", value: randomInt(5, 25) },
        { label: "C", value: randomInt(5, 25) },
        { label: "D", value: randomInt(5, 25) },
      ];

      const min = Math.min(...data.map((d) => d.value));
      const correct = data.find((d) => d.value === min)?.label ?? data[0].label;

      return {
        text: "D’après le graphique, quelle catégorie a la plus petite valeur ?",
        format: "qcm",
        choices: data.map((d) => d.label),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : comparer un graphique consiste à repérer les valeurs les plus grandes ou les plus petites.\n\n` +
          `Méthode : on cherche la barre la plus basse.\n\n` +
          `Calcul : ${correct} correspond à la plus petite valeur : ${min}.\n\n` +
          `Conclusion : la catégorie ayant la plus petite valeur est ${correct}.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: data.findIndex((d) => d.label === correct),
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_lire_graphique_tpl_5_camembert",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un camembert, la plus grande part correspond à la plus grande valeur.",
    tags: ["stat_statistique", "graphique", "camembert", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "A", value: randomInt(8, 18) },
        { label: "B", value: randomInt(8, 18) },
        { label: "C", value: randomInt(8, 18) },
      ];

      const max = Math.max(...data.map((d) => d.value));
      const correct = data.find((d) => d.value === max)?.label ?? data[0].label;

      return {
        text: "D’après le diagramme circulaire, quelle catégorie est la plus représentée ?",
        format: "qcm",
        choices: data.map((d) => d.label),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : un diagramme circulaire représente les catégories par des parts.\n\n` +
          `Méthode : on cherche la part la plus grande.\n\n` +
          `Calcul : la catégorie ${correct} a la plus grande valeur : ${max}.\n\n` +
          `Conclusion : la catégorie la plus représentée est ${correct}.`,
        canvas: statGraphCanvas({
          graphType: "camembert",
          data,
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: data.findIndex((d) => d.label === correct),
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_stat_lire_graphique_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment lire une information dans un diagramme en barres.",
    format: "open",
    expected: ["barre", "hauteur", "valeur"],
    comparator: "contains_keyword",
    hint: "Tu dois parler de la catégorie et de la hauteur de la barre.",
    explanation:
      "Définition : un diagramme en barres représente des valeurs par des hauteurs.\n\n" +
      "Méthode : on repère la catégorie demandée, puis on lit la hauteur de sa barre.\n\n" +
      "Calcul : la hauteur donne directement la valeur ou l’effectif associé.\n\n" +
      "Conclusion : pour lire un diagramme en barres, on associe chaque catégorie à la hauteur de sa barre.",
    tags: ["stat_statistique", "graphique", "open"],
  },
    /* =========================
     STAT_EFFECTIF_FREQUENCE
  ========================= */

  {
    kind: "fixed",
    id: "3e_stat_effectif_frequence_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 1,
    theme: "neutral",
    text: "Un tableau indique : filles : 14, garçons : 11. Quel est l’effectif total ?",
    format: "qcm",
    choices: ["14", "11", "25", "154"],
    expected: ["25"],
    comparator: "mcq_exact",
    hint: "Additionne les effectifs.",
    explanation:
      "Définition : l’effectif total est le nombre total d’individus dans la série.\n\n" +
      "Méthode : on additionne les effectifs de toutes les catégories.\n\n" +
      "Calcul : 14 + 11 = 25.\n\n" +
      "Conclusion : l’effectif total est 25.",
    tags: ["stat_statistique", "effectif", "total", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_stat_effectif_frequence_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une classe de 25 élèves, 10 pratiquent un sport. Quelle est la fréquence sous forme décimale ?",
    format: "qcm",
    choices: ["0,4", "0,25", "2,5", "10"],
    expected: ["0,4"],
    comparator: "mcq_exact",
    hint: "Fréquence = effectif de la catégorie ÷ effectif total.",
    explanation:
      "Définition : une fréquence indique la part d’une catégorie dans l’effectif total.\n\n" +
      "Méthode : on divise l’effectif de la catégorie par l’effectif total.\n\n" +
      "Calcul : 10 ÷ 25 = 0,4.\n\n" +
      "Conclusion : la fréquence est 0,4.",
    tags: ["stat_statistique", "frequence", "decimal", "qcm"],
  },

  {
    kind: "template",
    id: "3e_stat_effectif_frequence_tpl_1_total",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne tous les effectifs.",
    tags: ["stat_statistique", "effectif", "total", "template"],
    generate: () => {
      const a = randomInt(5, 20);
      const b = randomInt(5, 20);
      const c = randomInt(5, 20);
      const total = a + b + c;

      return {
        text: `Dans une enquête, on compte ${a} réponses A, ${b} réponses B et ${c} réponses C. Quel est l’effectif total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : l’effectif total est la somme de tous les effectifs.\n\n` +
          `Méthode : on additionne les effectifs des catégories A, B et C.\n\n` +
          `Calcul : ${a} + ${b} + ${c} = ${total}.\n\n` +
          `Conclusion : l’effectif total est ${total}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_effectif_frequence_tpl_2_total_graphique",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne toutes les valeurs du graphique.",
    tags: ["stat_statistique", "effectif", "graphique", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "A", value: randomInt(4, 12) },
        { label: "B", value: randomInt(4, 12) },
        { label: "C", value: randomInt(4, 12) },
        { label: "D", value: randomInt(4, 12) },
      ];
      const total = data.reduce((s, d) => s + d.value, 0);

      return {
        text: "D’après le graphique, quel est l’effectif total ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : l’effectif total est la somme de tous les effectifs représentés.\n\n` +
          `Méthode : on lit chaque valeur du graphique, puis on les additionne.\n\n` +
          `Calcul : ${data.map((d) => d.value).join(" + ")} = ${total}.\n\n` +
          `Conclusion : l’effectif total est ${total}.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
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
    id: "3e_stat_effectif_frequence_tpl_3_decimal",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence = effectif ÷ effectif total.",
    tags: ["stat_statistique", "frequence", "decimal", "template"],
    generate: () => {
      const total = randomChoice([20, 25, 40, 50]);
      const effectif = randomChoice([total / 2, total / 4, total / 5]);
      const freq = effectif / total;

      return {
        text: `Dans un groupe de ${total} élèves, ${effectif} élèves ont choisi théâtre. Quelle est la fréquence sous forme décimale ?`,
        format: "short",
        expected: [String(freq), String(freq).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : une fréquence est le quotient effectif de la catégorie ÷ effectif total.\n\n` +
          `Méthode : on divise ${effectif} par ${total}.\n\n` +
          `Calcul : ${effectif} ÷ ${total} = ${formatNumber(freq)}.\n\n` +
          `Conclusion : la fréquence est ${formatNumber(freq)}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_effectif_frequence_tpl_4_pourcentage",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule la fréquence, puis transforme-la en pourcentage.",
    tags: ["stat_statistique", "frequence", "pourcentage", "template"],
    generate: () => {
      const total = randomChoice([20, 25, 40, 50]);
      const pourcentage = randomChoice([20, 25, 40, 50]);
      const effectif = (total * pourcentage) / 100;

      return {
        text: `Dans un groupe de ${total} élèves, ${effectif} élèves ont choisi une activité. Quelle est la fréquence en pourcentage ?`,
        format: "short",
        expected: [String(pourcentage)],
        comparator: "number_equal",
        explanation:
          `Définition : une fréquence peut s’exprimer sous forme décimale ou en pourcentage.\n\n` +
          `Méthode : on calcule effectif ÷ effectif total, puis on convertit en pourcentage.\n\n` +
          `Calcul : ${effectif} ÷ ${total} = ${formatNumber(effectif / total)}, soit ${pourcentage} %.\n\n` +
          `Conclusion : la fréquence est ${pourcentage} %.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_effectif_frequence_tpl_5_graphique",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 4,
    theme: "neutral",
    hint: "Lis l’effectif de la catégorie, puis divise par le total.",
    tags: ["stat_statistique", "frequence", "graphique", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "A", value: 10 },
        { label: "B", value: 15 },
        { label: "C", value: 25 },
      ];
      const total = data.reduce((s, d) => s + d.value, 0);
      const i = randomInt(0, data.length - 1);
      const freq = data[i].value / total;

      return {
        text: `D’après le graphique, quelle est la fréquence de la catégorie ${data[i].label} ?`,
        format: "short",
        expected: [String(freq), String(freq).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : une fréquence indique la part d’une catégorie dans l’ensemble.\n\n` +
          `Méthode : on lit l’effectif de ${data[i].label}, puis on le divise par l’effectif total.\n\n` +
          `Calcul : l’effectif total est ${total}. Fréquence de ${data[i].label} = ${data[i].value} ÷ ${total} = ${formatNumber(freq)}.\n\n` +
          `Conclusion : la fréquence de ${data[i].label} est ${formatNumber(freq)}.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: i,
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_stat_effectif_frequence_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « Dans une classe de 30 élèves, 12 élèves font du basket, donc la fréquence est 12. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "12 est un effectif, pas une fréquence.",
    explanation:
      "Définition : une fréquence est une proportion, pas un simple effectif.\n\n" +
      "Méthode : on divise l’effectif de la catégorie par l’effectif total.\n\n" +
      "Calcul : 12 ÷ 30 = 0,4.\n\n" +
      "Conclusion : l’élève a tort ; la fréquence est 0,4.",
    tags: ["stat_statistique", "frequence", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_stat_effectif_frequence_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer une fréquence à partir d’un effectif et d’un effectif total.",
    format: "open",
    expected: ["effectif", "total", "divise"],
    comparator: "contains_keyword",
    hint: "C’est un quotient.",
    explanation:
      "Définition : une fréquence mesure la part d’une catégorie dans une série statistique.\n\n" +
      "Méthode : on divise l’effectif de la catégorie par l’effectif total.\n\n" +
      "Calcul : par exemple, si 10 élèves sur 25 font du sport, la fréquence est 10 ÷ 25 = 0,4.\n\n" +
      "Conclusion : calculer une fréquence revient à comparer une partie au total.",
    tags: ["stat_statistique", "frequence", "open", "methode"],
  },
    /* =========================
     STAT_MOYENNE
  ========================= */

  {
    kind: "fixed",
    id: "3e_stat_moyenne_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la moyenne de 8 ; 10 ; 12 ?",
    format: "qcm",
    choices: ["8", "10", "12", "30"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Additionne les valeurs puis divise par le nombre de valeurs.",
    explanation:
      "Définition : la moyenne est un indicateur qui résume une série de valeurs.\n\n" +
      "Méthode : on additionne toutes les valeurs, puis on divise par le nombre de valeurs.\n\n" +
      "Calcul : (8 + 10 + 12) ÷ 3 = 30 ÷ 3 = 10.\n\n" +
      "Conclusion : la moyenne est 10.",
    tags: ["stat_statistique", "moyenne", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_stat_moyenne_fixed_2_erreur",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule la moyenne de 5 ; 10 ; 15 et répond 30. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "30 est la somme, pas la moyenne.",
    explanation:
      "Définition : la moyenne n’est pas seulement la somme des valeurs.\n\n" +
      "Méthode : il faut additionner les valeurs puis diviser par le nombre de valeurs.\n\n" +
      "Calcul : 5 + 10 + 15 = 30, puis 30 ÷ 3 = 10.\n\n" +
      "Conclusion : l’élève a tort ; la moyenne est 10.",
    tags: ["stat_statistique", "moyenne", "erreur"],
  },

  {
    kind: "template",
    id: "3e_stat_moyenne_tpl_1_liste",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne toutes les valeurs puis divise par leur nombre.",
    tags: ["stat_statistique", "moyenne", "template"],
    generate: () => {
      const values = [
        randomInt(6, 16),
        randomInt(6, 16),
        randomInt(6, 16),
        randomInt(6, 16),
      ];
      const avg = moyenne(values);

      return {
        text: `Calculer la moyenne de la série : ${values.join(" ; ")}.`,
        format: "short",
        expected: [formatNumber(avg)],
        comparator: "number_equal",
        explanation:
          `Définition : la moyenne permet de résumer une série de valeurs par une seule valeur.\n\n` +
          `Méthode : on additionne les ${values.length} valeurs, puis on divise par ${values.length}.\n\n` +
          `Calcul : (${values.join(" + ")}) ÷ ${values.length} = ${formatNumber(avg)}.\n\n` +
          `Conclusion : la moyenne est ${formatNumber(avg)}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_moyenne_tpl_2_notes",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    hint: "La moyenne d’un élève se calcule comme une moyenne de nombres.",
    tags: ["stat_statistique", "moyenne", "notes", "template"],
    generate: () => {
      const a = randomInt(6, 18);
      const b = randomInt(6, 18);
      const c = randomInt(6, 18);
      const avg = moyenne([a, b, c]);

      return {
        text: `Un élève a obtenu ${a}/20, ${b}/20 et ${c}/20. Quelle est sa moyenne ?`,
        format: "short",
        expected: [formatNumber(avg)],
        comparator: "number_equal",
        explanation:
          `Définition : la moyenne d’une série de notes résume les résultats obtenus.\n\n` +
          `Méthode : on additionne les notes puis on divise par le nombre de notes.\n\n` +
          `Calcul : (${a} + ${b} + ${c}) ÷ 3 = ${formatNumber(avg)}.\n\n` +
          `Conclusion : la moyenne de l’élève est ${formatNumber(avg)}/20.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_moyenne_tpl_3_effectifs",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : chaque valeur peut apparaître plusieurs fois.",
    tags: ["stat_statistique", "moyenne", "effectifs", "template"],
    generate: () => {
      const v1 = randomChoice([8, 10, 12]);
      const v2 = v1 + 4;
      const e1 = randomInt(2, 5);
      const e2 = randomInt(2, 5);
      const total = e1 + e2;
      const avg = (v1 * e1 + v2 * e2) / total;

      return {
        text: `${e1} élèves ont obtenu ${v1}/20 et ${e2} élèves ont obtenu ${v2}/20. Quelle est la moyenne du groupe ?`,
        format: "short",
        expected: [formatNumber(avg)],
        comparator: "number_equal",
        explanation:
          `Définition : quand des valeurs ont des effectifs, la moyenne doit tenir compte du nombre de fois où chaque valeur apparaît.\n\n` +
          `Méthode : on multiplie chaque valeur par son effectif, on additionne, puis on divise par l’effectif total.\n\n` +
          `Calcul : (${v1} × ${e1} + ${v2} × ${e2}) ÷ ${total} = ${formatNumber(avg)}.\n\n` +
          `Conclusion : la moyenne du groupe est ${formatNumber(avg)}/20.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_moyenne_tpl_4_graphique",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis les valeurs du graphique, puis calcule leur moyenne.",
    tags: ["stat_statistique", "moyenne", "graphique", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "A", value: randomInt(5, 18) },
        { label: "B", value: randomInt(5, 18) },
        { label: "C", value: randomInt(5, 18) },
        { label: "D", value: randomInt(5, 18) },
      ];
      const values = data.map((d) => d.value);
      const avg = moyenne(values);

      return {
        text: "D’après le graphique, calculer la moyenne des valeurs représentées.",
        format: "short",
        expected: [formatNumber(avg)],
        comparator: "number_equal",
        explanation:
          `Définition : une moyenne résume plusieurs valeurs par une seule valeur.\n\n` +
          `Méthode : on lit les valeurs du graphique, puis on les additionne et on divise par leur nombre.\n\n` +
          `Calcul : (${values.join(" + ")}) ÷ ${values.length} = ${formatNumber(avg)}.\n\n` +
          `Conclusion : la moyenne est ${formatNumber(avg)}.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
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
    id: "3e_stat_moyenne_tpl_5_valeur_manquante",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise : somme totale = moyenne × nombre de valeurs.",
    tags: ["stat_statistique", "moyenne", "valeur_manquante", "template"],
    generate: () => {
      const a = randomInt(8, 14);
      const b = randomInt(8, 14);
      const c = randomInt(8, 14);
      const target = randomInt(10, 15);
      const x = target * 4 - (a + b + c);

      return {
        text: `La moyenne de ${a}, ${b}, ${c} et x est ${target}. Quelle est la valeur de x ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          `Définition : si on connaît la moyenne et le nombre de valeurs, on peut retrouver la somme totale.\n\n` +
          `Méthode : on calcule d’abord somme totale = moyenne × nombre de valeurs, puis on enlève les valeurs connues.\n\n` +
          `Calcul : somme totale = ${target} × 4 = ${target * 4}. Donc x = ${target * 4} - (${a} + ${b} + ${c}) = ${x}.\n\n` +
          `Conclusion : la valeur manquante est x = ${x}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_stat_moyenne_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer la moyenne d’une série de valeurs.",
    format: "open",
    expected: ["additionne", "divise", "nombre"],
    comparator: "contains_keyword",
    hint: "Il y a deux étapes : additionner puis diviser.",
    explanation:
      "Définition : la moyenne est un indicateur qui résume une série de valeurs.\n\n" +
      "Méthode : on additionne toutes les valeurs, puis on divise par le nombre de valeurs.\n\n" +
      "Calcul : par exemple, pour 8 ; 10 ; 12, on calcule (8 + 10 + 12) ÷ 3 = 10.\n\n" +
      "Conclusion : calculer une moyenne revient à répartir équitablement la somme des valeurs.",
    tags: ["stat_statistique", "moyenne", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "3e_stat_moyenne_open_2_interpretation",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi la moyenne n’est pas toujours une valeur de la série.",
    format: "open",
    expected: ["somme", "divise", "valeurs"],
    comparator: "contains_keyword",
    hint: "La moyenne est le résultat d’un calcul.",
    explanation:
      "Définition : la moyenne est une valeur calculée à partir de toutes les valeurs de la série.\n\n" +
      "Méthode : on additionne toutes les valeurs puis on divise par leur nombre.\n\n" +
      "Calcul : par exemple, la moyenne de 10 et 11 est 10,5, même si 10,5 n’apparaît pas dans la série.\n\n" +
      "Conclusion : la moyenne peut ne pas être une valeur observée.",
    tags: ["stat_statistique", "moyenne", "open", "interpretation"],
  },
    /* =========================
     STAT_MEDIANE
  ========================= */

  {
    kind: "fixed",
    id: "3e_stat_mediane_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la médiane de la série rangée : 4 ; 7 ; 9 ; 12 ; 15 ?",
    format: "qcm",
    choices: ["7", "9", "12", "15"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "La médiane est la valeur centrale d’une série rangée.",
    explanation:
      "Définition : la médiane est une valeur qui partage une série rangée en deux groupes de même effectif.\n\n" +
      "Méthode : comme la série est déjà rangée et contient 5 valeurs, on prend la valeur centrale.\n\n" +
      "Calcul : la valeur centrale est la 3e valeur : 9.\n\n" +
      "Conclusion : la médiane est 9.",
    tags: ["stat_statistique", "mediane", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_stat_mediane_fixed_2_pair",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la médiane de la série rangée : 4 ; 8 ; 10 ; 14 ?",
    format: "qcm",
    choices: ["8", "9", "10", "14"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Avec un nombre pair de valeurs, on prend la moyenne des deux valeurs centrales.",
    explanation:
      "Définition : avec un nombre pair de valeurs, la médiane est la moyenne des deux valeurs centrales.\n\n" +
      "Méthode : on repère les deux valeurs centrales de la série rangée.\n\n" +
      "Calcul : les deux valeurs centrales sont 8 et 10. Médiane = (8 + 10) ÷ 2 = 9.\n\n" +
      "Conclusion : la médiane est 9.",
    tags: ["stat_statistique", "mediane", "pair", "qcm"],
  },

  {
    kind: "template",
    id: "3e_stat_mediane_tpl_1_impair",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 3,
    theme: "neutral",
    hint: "Range la série puis prends la valeur centrale.",
    tags: ["stat_statistique", "mediane", "impair", "template"],
    generate: () => {
      const sorted = [
        randomInt(2, 5),
        randomInt(6, 9),
        randomInt(10, 13),
        randomInt(14, 17),
        randomInt(18, 22),
      ];
      const values = shuffle(sorted);
      const med = sorted[2];

      return {
        text: `Déterminer la médiane de la série : ${values.join(" ; ")}.`,
        format: "short",
        expected: [String(med)],
        comparator: "number_equal",
        explanation:
          `Définition : la médiane est la valeur centrale d’une série rangée.\n\n` +
          `Méthode : on range la série dans l’ordre croissant, puis on prend la valeur du milieu.\n\n` +
          `Calcul : série rangée : ${sorted.join(" ; ")}. La valeur centrale est ${med}.\n\n` +
          `Conclusion : la médiane est ${med}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_mediane_tpl_2_pair",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 4,
    theme: "neutral",
    hint: "Avec un nombre pair de valeurs, calcule la moyenne des deux valeurs centrales.",
    tags: ["stat_statistique", "mediane", "pair", "template"],
    generate: () => {
      const sorted = [
        randomInt(2, 5),
        randomInt(6, 9),
        randomInt(10, 13),
        randomInt(14, 18),
      ];
      const values = shuffle(sorted);
      const med = (sorted[1] + sorted[2]) / 2;

      return {
        text: `Déterminer la médiane de la série : ${values.join(" ; ")}.`,
        format: "short",
        expected: [formatNumber(med)],
        comparator: "number_equal",
        explanation:
          `Définition : avec un nombre pair de valeurs, la médiane est la moyenne des deux valeurs centrales.\n\n` +
          `Méthode : on range la série, puis on repère les deux valeurs centrales.\n\n` +
          `Calcul : série rangée : ${sorted.join(" ; ")}. Les deux valeurs centrales sont ${sorted[1]} et ${sorted[2]}. Médiane = (${sorted[1]} + ${sorted[2]}) ÷ 2 = ${formatNumber(med)}.\n\n` +
          `Conclusion : la médiane est ${formatNumber(med)}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_mediane_tpl_3_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 3,
    theme: "reunion",
    hint: "Range les durées dans l’ordre croissant.",
    tags: ["stat_statistique", "mediane", "reunion", "template"],
    generate: () => {
      const sorted = [
        randomInt(15, 20),
        randomInt(21, 25),
        randomInt(26, 30),
        randomInt(31, 35),
        randomInt(36, 40),
      ];
      const values = shuffle(sorted);
      const med = sorted[2];

      return {
        text: `À La Réunion, on relève les durées de trajet suivantes vers le collège : ${values.join(" min ; ")} min. Quelle est la durée médiane ?`,
        format: "short",
        expected: [String(med)],
        comparator: "number_equal",
        explanation:
          `Définition : la médiane partage une série rangée en deux groupes de même effectif.\n\n` +
          `Méthode : on range les durées de trajet dans l’ordre croissant.\n\n` +
          `Calcul : ${sorted.join(" ; ")}. La valeur centrale est ${med}.\n\n` +
          `Conclusion : la durée médiane est ${med} min.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_mediane_tpl_4_avec_effectifs",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 5,
    theme: "neutral",
    hint: "Reconstitue mentalement la série avec les effectifs.",
    tags: ["stat_statistique", "mediane", "effectifs", "template"],
    generate: () => {
      const v1 = randomChoice([6, 7, 8]);
      const v2 = v1 + 2;
      const v3 = v2 + 2;
      const e1 = randomInt(2, 4);
      const e2 = randomInt(3, 5);
      const e3 = randomInt(2, 4);

      const values = [
        ...Array.from({ length: e1 }, () => v1),
        ...Array.from({ length: e2 }, () => v2),
        ...Array.from({ length: e3 }, () => v3),
      ];
      const med = mediane(values);

      return {
        text: `Dans une série statistique, la valeur ${v1} apparaît ${e1} fois, la valeur ${v2} apparaît ${e2} fois, et la valeur ${v3} apparaît ${e3} fois. Quelle est la médiane ?`,
        format: "short",
        expected: [formatNumber(med)],
        comparator: "number_equal",
        explanation:
          `Définition : la médiane est la valeur centrale de la série rangée.\n\n` +
          `Méthode : on tient compte des effectifs pour reconstituer la série rangée.\n\n` +
          `Calcul : la série contient ${values.length} valeurs. En tenant compte des effectifs, la médiane est ${formatNumber(med)}.\n\n` +
          `Conclusion : la médiane est ${formatNumber(med)}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_stat_mediane_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève cherche la médiane de 12 ; 4 ; 9 ; 7 ; 15 et répond 9 sans ranger la série. Sa réponse est bonne, mais sa méthode est-elle complète ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour justifier une médiane, il faut d’abord ranger la série.",
    explanation:
      "Définition : la médiane se détermine à partir d’une série rangée.\n\n" +
      "Méthode : même si la réponse est correcte, il faut ranger la série pour justifier.\n\n" +
      "Calcul : la série rangée est 4 ; 7 ; 9 ; 12 ; 15. La valeur centrale est 9.\n\n" +
      "Conclusion : la réponse est correcte, mais la méthode n’est pas complète.",
    tags: ["stat_statistique", "mediane", "erreur", "methode"],
  },

  {
    kind: "fixed",
    id: "3e_stat_mediane_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi il faut ranger une série avant de déterminer sa médiane.",
    format: "open",
    expected: ["ranger", "ordre", "centrale"],
    comparator: "contains_keyword",
    hint: "La médiane dépend de la position centrale.",
    explanation:
      "Définition : la médiane est une valeur centrale dans une série rangée.\n\n" +
      "Méthode : on doit ranger les valeurs dans l’ordre croissant pour connaître leur position.\n\n" +
      "Calcul : sans rangement, on risque de choisir une valeur qui n’est pas réellement au centre.\n\n" +
      "Conclusion : ranger la série est indispensable pour déterminer correctement la médiane.",
    tags: ["stat_statistique", "mediane", "open"],
  },

  /* =========================
     STAT_ETENDUE
  ========================= */

  {
    kind: "fixed",
    id: "3e_stat_etendue_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 1,
    theme: "neutral",
    text: "Que mesure l’étendue d’une série statistique ?",
    format: "qcm",
    choices: [
      "l’écart entre la plus grande et la plus petite valeur",
      "la valeur la plus fréquente",
      "la valeur centrale de la série",
      "la somme de toutes les valeurs",
    ],
    expected: ["l’écart entre la plus grande et la plus petite valeur"],
    comparator: "mcq_exact",
    hint: "L’étendue mesure la dispersion : du minimum au maximum.",
    explanation:
      "Définition : l’étendue d’une série est la différence entre la plus grande et la plus petite valeur.\n\n" +
      "Méthode : on repère le maximum et le minimum, puis on calcule $\\text{max} - \\text{min}$.\n\n" +
      "Calcul : ici il n’y a pas de calcul, il faut reconnaître le rôle de l’étendue.\n\n" +
      "Conclusion : l’étendue mesure l’écart entre la plus grande et la plus petite valeur.",
    tags: ["stat_statistique", "etendue", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_stat_etendue_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’étendue de la série : $4 \\,;\\, 7 \\,;\\, 9 \\,;\\, 15$ ?",
    format: "qcm",
    choices: ["$11$", "$4$", "$15$", "$9$"],
    expected: ["$11$"],
    comparator: "mcq_exact",
    hint: "Étendue $= \\text{max} - \\text{min}$.",
    explanation:
      "Définition : l’étendue est la différence entre la plus grande et la plus petite valeur.\n\n" +
      "Méthode : on repère le maximum et le minimum de la série.\n\n" +
      "Calcul : le maximum est $15$ et le minimum est $4$, donc l’étendue $= 15 - 4 = 11$.\n\n" +
      "Conclusion : l’étendue de la série est $11$.",
    tags: ["stat_statistique", "etendue", "calcul", "qcm"],
  },

  {
    kind: "template",
    id: "3e_stat_etendue_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère la plus grande et la plus petite valeur, puis soustrais.",
    tags: ["stat_statistique", "etendue", "template"],
    generate: () => {
      const values = [
        randomInt(2, 6),
        randomInt(7, 12),
        randomInt(13, 18),
        randomInt(19, 25),
      ];
      const shown = shuffle(values);
      const e = etendue(values);

      return {
        text: `Calculer l’étendue de la série : ${shown.join(" ; ")}.`,
        format: "short",
        expected: [String(e)],
        comparator: "number_equal",
        explanation:
          `Définition : l’étendue est la différence entre la plus grande et la plus petite valeur.\n\n` +
          `Méthode : on cherche le maximum et le minimum de la série.\n\n` +
          `Calcul : le maximum est $${Math.max(...values)}$ et le minimum est $${Math.min(
            ...values
          )}$, donc l’étendue $= ${Math.max(...values)} - ${Math.min(
            ...values
          )} = ${e}$.\n\n` +
          `Conclusion : l’étendue est $${e}$.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_etendue_tpl_2_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "reunion",
    hint: "L’étendue des températures est la différence entre la plus chaude et la plus froide.",
    tags: ["stat_statistique", "etendue", "reunion", "template"],
    generate: () => {
      const temps = [
        randomInt(18, 21),
        randomInt(22, 25),
        randomInt(26, 29),
        randomInt(30, 33),
      ];
      const shown = shuffle(temps);
      const e = etendue(temps);

      return {
        text: `À La Réunion, on relève les températures (en °C) : ${shown.join(
          " ; "
        )}. Quelle est l’étendue de ces températures ?`,
        format: "short",
        expected: [String(e)],
        comparator: "number_equal",
        explanation:
          `Définition : l’étendue mesure l’écart entre la valeur la plus grande et la valeur la plus petite.\n\n` +
          `Méthode : on repère la température maximale et la température minimale.\n\n` +
          `Calcul : la plus chaude est $${Math.max(...temps)}$ °C et la plus froide $${Math.min(
            ...temps
          )}$ °C, donc l’étendue $= ${Math.max(...temps)} - ${Math.min(
            ...temps
          )} = ${e}$ °C.\n\n` +
          `Conclusion : l’étendue des températures est $${e}$ °C.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_etendue_tpl_3_graphique",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis la plus grande et la plus petite barre, puis soustrais.",
    tags: ["stat_statistique", "etendue", "graphique", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "A", value: randomInt(4, 9) },
        { label: "B", value: randomInt(10, 15) },
        { label: "C", value: randomInt(16, 22) },
        { label: "D", value: randomInt(23, 28) },
      ];
      const values = data.map((d) => d.value);
      const e = etendue(values);

      return {
        text: "D’après le graphique, quelle est l’étendue des valeurs représentées ?",
        format: "short",
        expected: [String(e)],
        comparator: "number_equal",
        explanation:
          `Définition : l’étendue est la différence entre la plus grande et la plus petite valeur.\n\n` +
          `Méthode : on repère la barre la plus haute et la barre la plus basse.\n\n` +
          `Calcul : la plus grande valeur est $${Math.max(
            ...values
          )}$ et la plus petite $${Math.min(...values)}$, donc l’étendue $= ${Math.max(
            ...values
          )} - ${Math.min(...values)} = ${e}$.\n\n` +
          `Conclusion : l’étendue est $${e}$.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: {
            showLabels: true,
            showValues: true,
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_stat_etendue_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « Pour la série $5 \\,;\\, 8 \\,;\\, 12$, l’étendue est $5 + 8 + 12 = 25$. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "L’étendue est une soustraction, pas une somme.",
    explanation:
      "Définition : l’étendue est la différence entre la plus grande et la plus petite valeur, pas leur somme.\n\n" +
      "Méthode : on calcule $\\text{max} - \\text{min}$.\n\n" +
      "Calcul : ici $12 - 5 = 7$.\n\n" +
      "Conclusion : l’élève a tort, l’étendue est $7$.",
    tags: ["stat_statistique", "etendue", "erreur", "qcm"],
  },

  {
    kind: "template",
    id: "3e_stat_etendue_tpl_4_max_manquant",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 4,
    theme: "neutral",
    hint: "Si tu connais le minimum et l’étendue, alors max = min + étendue.",
    tags: ["stat_statistique", "etendue", "inverse", "template"],
    generate: () => {
      const min = randomInt(3, 9);
      const e = randomInt(8, 18);
      const max = min + e;

      return {
        text: `Dans une série, la plus petite valeur est ${min} et l’étendue est ${e}. Quelle est la plus grande valeur ?`,
        format: "short",
        expected: [String(max)],
        comparator: "number_equal",
        explanation:
          `Définition : l’étendue relie le minimum et le maximum par $\\text{étendue} = \\text{max} - \\text{min}$.\n\n` +
          `Méthode : on isole le maximum : $\\text{max} = \\text{min} + \\text{étendue}$.\n\n` +
          `Calcul : $\\text{max} = ${min} + ${e} = ${max}$.\n\n` +
          `Conclusion : la plus grande valeur est ${max}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_stat_etendue_fixed_3_comparer",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 4,
    theme: "neutral",
    text: "Série A : $10 \\,;\\, 11 \\,;\\, 12$. Série B : $2 \\,;\\, 11 \\,;\\, 20$. Quelle série est la plus régulière (la moins dispersée) ?",
    format: "qcm",
    choices: ["la série A", "la série B", "elles sont aussi régulières", "on ne peut pas savoir"],
    expected: ["la série A"],
    comparator: "mcq_exact",
    hint: "Plus l’étendue est petite, plus la série est régulière.",
    explanation:
      "Définition : l’étendue mesure la dispersion d’une série.\n\n" +
      "Méthode : on compare les étendues des deux séries.\n\n" +
      "Calcul : étendue de A $= 12 - 10 = 2$ ; étendue de B $= 20 - 2 = 18$.\n\n" +
      "Conclusion : la série A, d’étendue plus petite, est la plus régulière.",
    tags: ["stat_statistique", "etendue", "comparaison", "qcm"],
  },

  {
    kind: "template",
    id: "3e_stat_etendue_tpl_5_defi",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 5,
    theme: "neutral",
    hint: "Range mentalement les valeurs : seules la plus grande et la plus petite comptent.",
    tags: ["stat_statistique", "etendue", "defi", "template"],
    generate: () => {
      const values = [
        randomInt(1, 4),
        randomInt(5, 9),
        randomInt(10, 14),
        randomInt(15, 19),
        randomInt(20, 26),
        randomInt(27, 32),
      ];
      const shown = shuffle(values);
      const e = etendue(values);

      return {
        text: `On a relevé les nombres suivants : ${shown.join(
          " ; "
        )}. Sans tout ranger, détermine l’étendue de cette série.`,
        format: "short",
        expected: [String(e)],
        comparator: "number_equal",
        explanation:
          `Définition : l’étendue ne dépend que du maximum et du minimum.\n\n` +
          `Méthode : inutile de tout ranger, on cherche seulement la plus grande et la plus petite valeur.\n\n` +
          `Calcul : maximum $= ${Math.max(...values)}$, minimum $= ${Math.min(
            ...values
          )}$, donc l’étendue $= ${Math.max(...values)} - ${Math.min(
            ...values
          )} = ${e}$.\n\n` +
          `Conclusion : l’étendue est $${e}$.`,
      };
    },
  },

  /* =========================
     STAT_INTERPRETER
  ========================= */

  {
    kind: "fixed",
    id: "3e_stat_interpreter_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "La moyenne des notes d’une classe est $12$. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "si chaque élève avait la même note, ce serait $12$",
      "tous les élèves ont eu $12$",
      "la meilleure note est $12$",
      "personne n’a eu en dessous de $12$",
    ],
    expected: ["si chaque élève avait la même note, ce serait $12$"],
    comparator: "mcq_exact",
    hint: "La moyenne répartit équitablement le total entre tous.",
    explanation:
      "Définition : la moyenne est la valeur que prendrait chacun si on répartissait équitablement le total.\n\n" +
      "Méthode : on interprète la moyenne comme une valeur d’équilibre, pas comme une note réelle de chaque élève.\n\n" +
      "Calcul : une moyenne de $12$ n’interdit ni notes plus basses ni notes plus hautes.\n\n" +
      "Conclusion : si tous avaient la même note, elle vaudrait $12$.",
    tags: ["stat_statistique", "interpreter", "moyenne", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_stat_interpreter_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "La médiane des durées de trajet d’une classe est $20$ min. Que signifie-t-elle ?",
    format: "qcm",
    choices: [
      "la moitié des élèves mettent moins de $20$ min, l’autre moitié plus",
      "tous les élèves mettent $20$ min",
      "le trajet le plus long est $20$ min",
      "la moyenne des trajets est $20$ min",
    ],
    expected: [
      "la moitié des élèves mettent moins de $20$ min, l’autre moitié plus",
    ],
    comparator: "mcq_exact",
    hint: "La médiane partage l’effectif en deux groupes égaux.",
    explanation:
      "Définition : la médiane partage une série rangée en deux groupes de même effectif.\n\n" +
      "Méthode : on interprète la médiane comme la valeur qui sépare les $50\\,\\%$ du bas des $50\\,\\%$ du haut.\n\n" +
      "Calcul : ici, $50\\,\\%$ des élèves mettent moins de $20$ min.\n\n" +
      "Conclusion : la moitié des élèves mettent moins de $20$ min, l’autre moitié davantage.",
    tags: ["stat_statistique", "interpreter", "mediane", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_stat_interpreter_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Une grande étendue dans une série indique surtout…",
    format: "qcm",
    choices: [
      "des valeurs très dispersées",
      "des valeurs toutes proches",
      "une moyenne élevée",
      "une médiane élevée",
    ],
    expected: ["des valeurs très dispersées"],
    comparator: "mcq_exact",
    hint: "L’étendue mesure l’écart entre les extrêmes.",
    explanation:
      "Définition : l’étendue mesure la dispersion d’une série.\n\n" +
      "Méthode : on relie une grande étendue à un grand écart entre le minimum et le maximum.\n\n" +
      "Calcul : une étendue élevée signifie que les valeurs s’étalent beaucoup.\n\n" +
      "Conclusion : une grande étendue indique des valeurs très dispersées.",
    tags: ["stat_statistique", "interpreter", "etendue", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_stat_interpreter_fixed_4_extreme",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une série, une valeur très grande apparaît (une valeur extrême). Quel indicateur est le plus modifié ?",
    format: "qcm",
    choices: ["la moyenne", "la médiane", "l’effectif total", "le nombre de valeurs"],
    expected: ["la moyenne"],
    comparator: "mcq_exact",
    hint: "La moyenne utilise toutes les valeurs ; la médiane ne regarde que le centre.",
    explanation:
      "Définition : la moyenne tient compte de toutes les valeurs, la médiane seulement de la position centrale.\n\n" +
      "Méthode : on regarde quel indicateur est sensible à une valeur extrême.\n\n" +
      "Calcul : une valeur extrême tire la moyenne vers le haut mais déplace peu la médiane.\n\n" +
      "Conclusion : c’est la moyenne qui est la plus modifiée.",
    tags: ["stat_statistique", "interpreter", "valeur_extreme", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_stat_interpreter_fixed_5_choix",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Pour décrire le salaire « typique » d’une entreprise où quelques dirigeants gagnent énormément, quel indicateur est le plus pertinent ?",
    format: "qcm",
    choices: ["la médiane", "la moyenne", "l’étendue", "le maximum"],
    expected: ["la médiane"],
    comparator: "mcq_exact",
    hint: "La moyenne est gonflée par les très hauts salaires.",
    explanation:
      "Définition : la médiane représente la valeur centrale, peu sensible aux valeurs extrêmes.\n\n" +
      "Méthode : on choisit l’indicateur le moins déformé par quelques très grandes valeurs.\n\n" +
      "Calcul : la moyenne serait tirée vers le haut par les dirigeants ; la médiane reste représentative.\n\n" +
      "Conclusion : la médiane décrit le mieux le salaire typique.",
    tags: ["stat_statistique", "interpreter", "choix_indicateur", "qcm"],
  },

  {
    kind: "template",
    id: "3e_stat_interpreter_tpl_1_compare_moyenne",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les deux moyennes : la plus grande indique de meilleurs résultats d’ensemble.",
    tags: ["stat_statistique", "interpreter", "comparaison", "template"],
    generate: () => {
      const mA = randomInt(10, 13);
      const mB = mA + randomInt(1, 4);

      return {
        text: `La classe A a une moyenne de ${mA}/20 et la classe B une moyenne de ${mB}/20. Quelle classe a, en moyenne, les meilleurs résultats ?`,
        format: "qcm",
        choices: ["la classe B", "la classe A", "les deux pareil", "on ne peut pas savoir"],
        expected: ["la classe B"],
        comparator: "mcq_exact",
        explanation:
          `Définition : la moyenne résume le niveau global d’un groupe.\n\n` +
          `Méthode : on compare les deux moyennes.\n\n` +
          `Calcul : $${mB} > ${mA}$, donc la classe B a une moyenne plus élevée.\n\n` +
          `Conclusion : en moyenne, la classe B a les meilleurs résultats.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_interpreter_tpl_2_graphique",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "La catégorie la plus représentée est celle dont la barre est la plus haute.",
    tags: ["stat_statistique", "interpreter", "graphique", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "Foot", value: randomInt(10, 30) },
        { label: "Danse", value: randomInt(10, 30) },
        { label: "Musique", value: randomInt(10, 30) },
      ];
      const max = Math.max(...data.map((d) => d.value));
      const correct = data.find((d) => d.value === max)?.label ?? data[0].label;

      return {
        text: "D’après ce graphique des activités choisies, quelle activité est la plus populaire ?",
        format: "qcm",
        choices: data.map((d) => d.label),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : interpréter un graphique, c’est en tirer une conclusion concrète.\n\n` +
          `Méthode : on repère la barre la plus haute, qui correspond à l’effectif le plus grand.\n\n` +
          `Calcul : ${correct} atteint la valeur la plus grande : $${max}$.\n\n` +
          `Conclusion : l’activité la plus populaire est ${correct}.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: data.findIndex((d) => d.label === correct),
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_stat_interpreter_fixed_6_moyenne_mediane",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 5,
    theme: "neutral",
    text: "Deux classes ont la même moyenne de $12$, mais la classe A a une étendue de $4$ et la classe B une étendue de $16$. Dans quelle classe les notes sont-elles les plus homogènes ?",
    format: "qcm",
    choices: ["la classe A", "la classe B", "elles sont identiques", "on ne peut pas savoir"],
    expected: ["la classe A"],
    comparator: "mcq_exact",
    hint: "Même moyenne, mais l’étendue dit comment les notes sont réparties.",
    explanation:
      "Définition : à moyenne égale, l’étendue renseigne sur la dispersion des valeurs.\n\n" +
      "Méthode : on compare les étendues : la plus petite correspond aux notes les plus regroupées.\n\n" +
      "Calcul : étendue de A $= 4 <$ étendue de B $= 16$.\n\n" +
      "Conclusion : la classe A a les notes les plus homogènes.",
    tags: ["stat_statistique", "interpreter", "moyenne_etendue", "qcm"],
  },

  /* =========================
     STAT_DEFI
  ========================= */

  {
    kind: "template",
    id: "3e_stat_defi_tpl_1_moyenne",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les notes puis divise par leur nombre.",
    tags: ["stat_statistique", "defi", "moyenne", "template"],
    generate: () => {
      const values = [
        randomInt(8, 16),
        randomInt(8, 16),
        randomInt(8, 16),
        randomInt(8, 16),
        randomInt(8, 16),
      ];
      const avg = moyenne(values);

      return {
        text: `Type brevet : un élève a obtenu les notes ${values.join(
          " ; "
        )}. Calcule sa moyenne.`,
        format: "short",
        expected: [formatNumber(avg)],
        comparator: "number_equal",
        explanation:
          `Définition : la moyenne résume une série de notes.\n\n` +
          `Méthode : on additionne les ${values.length} notes puis on divise par ${values.length}.\n\n` +
          `Calcul : $(${values.join(" + ")}) \\div ${values.length} = ${formatNumber(
            avg
          )}$.\n\n` +
          `Conclusion : la moyenne est $${formatNumber(avg)}$.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_defi_tpl_2_mediane_etendue",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Range la série : la médiane est au centre, l’étendue est max − min.",
    tags: ["stat_statistique", "defi", "mediane", "etendue", "template"],
    generate: () => {
      const sorted = [
        randomInt(2, 5),
        randomInt(6, 9),
        randomInt(10, 13),
        randomInt(14, 17),
        randomInt(18, 22),
      ];
      const values = shuffle(sorted);
      const med = sorted[2];

      return {
        text: `On donne la série ${values.join(
          " ; "
        )}. Détermine sa médiane.`,
        format: "short",
        expected: [String(med)],
        comparator: "number_equal",
        explanation:
          `Définition : la médiane est la valeur centrale d’une série rangée.\n\n` +
          `Méthode : on range la série, puis on prend la valeur du milieu (la série a ${values.length} valeurs).\n\n` +
          `Calcul : série rangée : ${sorted.join(" ; ")}. La valeur centrale est $${med}$.\n\n` +
          `Conclusion : la médiane est $${med}$.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_defi_tpl_3_valeur_manquante",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Somme totale = moyenne × nombre de valeurs.",
    tags: ["stat_statistique", "defi", "valeur_manquante", "template"],
    generate: () => {
      const a = randomInt(8, 14);
      const b = randomInt(8, 14);
      const c = randomInt(8, 14);
      const d = randomInt(8, 14);
      const target = randomInt(10, 14);
      const x = target * 5 - (a + b + c + d);

      return {
        text: `La moyenne des cinq notes ${a}, ${b}, ${c}, ${d} et x est ${target}. Quelle est la note x ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          `Définition : connaître la moyenne et le nombre de valeurs permet de retrouver la somme totale.\n\n` +
          `Méthode : on calcule la somme totale, puis on retire les valeurs connues.\n\n` +
          `Calcul : somme totale $= ${target} \\times 5 = ${target * 5}$, donc $x = ${
            target * 5
          } - (${a} + ${b} + ${c} + ${d}) = ${x}$.\n\n` +
          `Conclusion : la note manquante est $x = ${x}$.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_stat_defi_tpl_4_graphique_moyenne",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Lis chaque valeur du graphique, additionne, puis divise.",
    tags: ["stat_statistique", "defi", "graphique", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "Lun", value: randomInt(20, 30) },
        { label: "Mar", value: randomInt(20, 30) },
        { label: "Mer", value: randomInt(20, 30) },
        { label: "Jeu", value: randomInt(20, 30) },
      ];
      const values = data.map((d) => d.value);
      const avg = moyenne(values);

      return {
        text: "Ce graphique donne le nombre de visiteurs par jour d’un marché à La Réunion. Calcule le nombre moyen de visiteurs par jour.",
        format: "short",
        expected: [formatNumber(avg)],
        comparator: "number_equal",
        explanation:
          `Définition : la moyenne répartit le total également sur les jours.\n\n` +
          `Méthode : on lit les ${values.length} valeurs, on les additionne, puis on divise par ${values.length}.\n\n` +
          `Calcul : $(${values.join(" + ")}) \\div ${values.length} = ${formatNumber(
            avg
          )}$.\n\n` +
          `Conclusion : il y a en moyenne $${formatNumber(avg)}$ visiteurs par jour.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: {
            showLabels: true,
            showValues: true,
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_stat_defi_fixed_1_choix_indicateur",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On veut connaître la valeur qui partage une série de salaires en deux groupes de même effectif. Quel indicateur faut-il calculer ?",
    format: "qcm",
    choices: ["la médiane", "la moyenne", "l’étendue", "l’effectif total"],
    expected: ["la médiane"],
    comparator: "mcq_exact",
    hint: "« Deux groupes de même effectif » est la définition d’un indicateur précis.",
    explanation:
      "Définition : la médiane partage une série rangée en deux groupes de même effectif.\n\n" +
      "Méthode : on identifie l’indicateur correspondant à la description.\n\n" +
      "Calcul : ni la moyenne, ni l’étendue ne partagent l’effectif en deux ; c’est la médiane.\n\n" +
      "Conclusion : il faut calculer la médiane.",
    tags: ["stat_statistique", "defi", "choix_indicateur", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_stat_defi_fixed_2_brevet",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Série : $6 \\,;\\, 9 \\,;\\, 9 \\,;\\, 12 \\,;\\, 14$. Parmi ces affirmations, laquelle est exacte ?",
    format: "qcm",
    choices: [
      "la médiane est $9$ et l’étendue est $8$",
      "la médiane est $9$ et l’étendue est $14$",
      "la médiane est $10$ et l’étendue est $8$",
      "la médiane est $12$ et l’étendue est $6$",
    ],
    expected: ["la médiane est $9$ et l’étendue est $8$"],
    comparator: "mcq_exact",
    hint: "La série est déjà rangée : médiane au centre, étendue = max − min.",
    explanation:
      "Définition : la médiane est la valeur centrale d’une série rangée et l’étendue vaut $\\text{max} - \\text{min}$.\n\n" +
      "Méthode : la série a $5$ valeurs rangées, on prend la $3^\\text{e}$ pour la médiane.\n\n" +
      "Calcul : médiane $= 9$ ; étendue $= 14 - 6 = 8$.\n\n" +
      "Conclusion : la médiane est $9$ et l’étendue est $8$.",
    tags: ["stat_statistique", "defi", "brevet", "qcm"],
  },

  /* =========================
     STAT_LIRE_TABLEAU (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_stat_lire_tableau_tpl_4_valeur",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    hint: "Repère la catégorie demandée, puis lis le nombre en face.",
    tags: ["stat_statistique", "tableau", "lecture", "template"],
    generate: () => {
      const labels = ["rouge", "bleu", "vert", "jaune"];
      const values = labels.map(() => randomInt(5, 30));
      const i = randomInt(0, labels.length - 1);
      return {
        text: `Un tableau indique — rouge : ${values[0]}, bleu : ${values[1]}, vert : ${values[2]}, jaune : ${values[3]}. Quel est l’effectif de ${labels[i]} ?`,
        format: "short",
        expected: [String(values[i])],
        comparator: "number_equal",
        explanation:
          `Définition : lire un tableau, c’est retrouver une valeur par catégorie.\n\n` +
          `Méthode : on cherche ${labels[i]} et on lit le nombre associé.\n\n` +
          `Calcul : ${labels[i]} correspond à ${values[i]}.\n\n` +
          `Conclusion : l’effectif de ${labels[i]} est ${values[i]}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_stat_lire_tableau_qcm_1_max",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Un tableau indique — foot : $18$, danse : $12$, judo : $9$. Quelle activité a le plus d’élèves ?",
    format: "qcm",
    choices: ["foot", "danse", "judo", "elles sont à égalité"],
    expected: ["foot"],
    comparator: "mcq_exact",
    hint: "On compare les effectifs.",
    explanation:
      "Définition : on compare les valeurs du tableau.\n\n" +
      "Méthode : on cherche le plus grand effectif.\n\n" +
      "Calcul : $18 > 12 > 9$.\n\n" +
      "Conclusion : c’est le foot.",
    tags: ["stat_statistique", "tableau", "max", "qcm"],
  },
  {
    kind: "template",
    id: "3e_stat_lire_tableau_tpl_5_total",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "L’effectif total est la somme des effectifs.",
    tags: ["stat_statistique", "tableau", "total", "template"],
    generate: () => {
      const a = randomInt(5, 15);
      const b = randomInt(5, 15);
      const c = randomInt(5, 15);
      const total = a + b + c;
      return {
        text: `Un tableau indique — A : ${a}, B : ${b}, C : ${c}. Quel est l’effectif total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : l’effectif total est la somme de tous les effectifs.\n\n` +
          `Méthode : on additionne A, B et C.\n\n` +
          `Calcul : ${a} + ${b} + ${c} = ${total}.\n\n` +
          `Conclusion : l’effectif total est ${total}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_stat_lire_tableau_qcm_2_sens",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un tableau, on lit « tennis : 14 ». Que signifie le nombre $14$ ?",
    format: "qcm",
    choices: [
      "$14$ personnes ont choisi tennis",
      "la moyenne vaut $14$",
      "il y a $14$ sports",
      "le tennis est en $14^\\text{e}$ position",
    ],
    expected: ["$14$ personnes ont choisi tennis"],
    comparator: "mcq_exact",
    hint: "C’est l’effectif de la catégorie tennis.",
    explanation:
      "Définition : un effectif est le nombre d’individus d’une catégorie.\n\n" +
      "Méthode : on lit la catégorie et le nombre en face.\n\n" +
      "Calcul : tennis $\\to 14$.\n\n" +
      "Conclusion : $14$ personnes ont choisi tennis.",
    tags: ["stat_statistique", "tableau", "sens", "qcm"],
  },

  /* =========================
     STAT_LIRE_GRAPHIQUE (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_stat_lire_graphique_tpl_6_valeur",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la valeur au sommet de la barre demandée.",
    tags: ["stat_statistique", "graphique", "lecture", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "Lun", value: randomInt(5, 20) },
        { label: "Mar", value: randomInt(5, 20) },
        { label: "Mer", value: randomInt(5, 20) },
        { label: "Jeu", value: randomInt(5, 20) },
      ];
      const i = randomInt(0, data.length - 1);
      return {
        text: `D’après le graphique, quelle est la valeur du jour ${data[i].label} ?`,
        format: "short",
        expected: [String(data[i].value)],
        comparator: "number_equal",
        explanation:
          `Définition : la hauteur d’une barre donne la valeur de la catégorie.\n\n` +
          `Méthode : on repère la barre ${data[i].label}.\n\n` +
          `Calcul : la barre ${data[i].label} indique ${data[i].value}.\n\n` +
          `Conclusion : la valeur de ${data[i].label} est ${data[i].value}.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: { showLabels: true, showValues: true, highlightIndex: i },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "3e_stat_lire_graphique_tpl_7_difference",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis les deux valeurs, puis soustrais.",
    tags: ["stat_statistique", "graphique", "difference", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "A", value: randomInt(10, 15) },
        { label: "B", value: randomInt(16, 25) },
      ];
      const diff = data[1].value - data[0].value;
      return {
        text: "D’après le graphique, de combien la valeur de B dépasse-t-elle celle de A ?",
        format: "short",
        expected: [String(diff)],
        comparator: "number_equal",
        explanation:
          `Définition : on compare deux barres par soustraction.\n\n` +
          `Méthode : on lit B et A, puis on calcule $B - A$.\n\n` +
          `Calcul : ${data[1].value} - ${data[0].value} = ${diff}.\n\n` +
          `Conclusion : B dépasse A de ${diff}.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: { showLabels: true, showValues: true },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_stat_lire_graphique_qcm_2_min",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un diagramme en barres, la catégorie la moins représentée correspond à…",
    format: "qcm",
    choices: ["la barre la plus basse", "la barre la plus haute", "la première barre", "la dernière barre"],
    expected: ["la barre la plus basse"],
    comparator: "mcq_exact",
    hint: "Moins représentée = plus petite valeur.",
    explanation:
      "Définition : la hauteur d’une barre représente l’effectif.\n\n" +
      "Méthode : on cherche la plus petite hauteur.\n\n" +
      "Calcul : la plus petite valeur est la barre la plus basse.\n\n" +
      "Conclusion : c’est la barre la plus basse.",
    tags: ["stat_statistique", "graphique", "min", "qcm"],
  },

  /* =========================
     STAT_DEFI (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_stat_defi_tpl_5_moyenne_pondere",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Multiplie chaque note par son effectif, additionne, puis divise par l’effectif total.",
    tags: ["stat_statistique", "defi", "moyenne", "effectifs", "template"],
    generate: () => {
      const v1 = randomChoice([8, 10, 12]);
      const v2 = v1 + 4;
      const e1 = randomInt(2, 4);
      const e2 = randomInt(2, 4);
      const total = e1 + e2;
      const avg = (v1 * e1 + v2 * e2) / total;
      return {
        text: `Dans une classe, ${e1} élèves ont eu ${v1}/20 et ${e2} élèves ont eu ${v2}/20. Quelle est la moyenne de la classe ?`,
        format: "short",
        expected: [formatNumber(avg)],
        comparator: "number_equal",
        explanation:
          `Définition : une moyenne pondérée tient compte des effectifs.\n\n` +
          `Méthode : on calcule $(${v1} \\times ${e1} + ${v2} \\times ${e2}) \\div ${total}$.\n\n` +
          `Calcul : $= ${formatNumber(avg)}$.\n\n` +
          `Conclusion : la moyenne est ${formatNumber(avg)}/20.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_stat_defi_fixed_3_choix_dispersion",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour mesurer si les valeurs d’une série sont très étalées ou regroupées, quel indicateur utilise-t-on ?",
    format: "qcm",
    choices: ["l’étendue", "la moyenne", "la médiane", "l’effectif total"],
    expected: ["l’étendue"],
    comparator: "mcq_exact",
    hint: "Il mesure l’écart entre le maximum et le minimum.",
    explanation:
      "Définition : l’étendue mesure la dispersion.\n\n" +
      "Méthode : on choisit l’indicateur qui compare les extrêmes.\n\n" +
      "Calcul : étendue $= \\text{max} - \\text{min}$.\n\n" +
      "Conclusion : on utilise l’étendue.",
    tags: ["stat_statistique", "defi", "dispersion", "qcm"],
  },
  {
    kind: "template",
    id: "3e_stat_defi_tpl_6_etendue_graphique",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Lis la plus grande et la plus petite barre, puis soustrais.",
    tags: ["stat_statistique", "defi", "etendue", "graphique", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "A", value: randomInt(5, 9) },
        { label: "B", value: randomInt(10, 14) },
        { label: "C", value: randomInt(20, 28) },
        { label: "D", value: randomInt(15, 19) },
      ];
      const values = data.map((d) => d.value);
      const e = etendue(values);
      return {
        text: "D’après le graphique, quelle est l’étendue des valeurs représentées ?",
        format: "short",
        expected: [String(e)],
        comparator: "number_equal",
        explanation:
          `Définition : étendue $= \\text{max} - \\text{min}$.\n\n` +
          `Méthode : on repère la plus grande et la plus petite barre.\n\n` +
          `Calcul : ${Math.max(...values)} - ${Math.min(...values)} = ${e}.\n\n` +
          `Conclusion : l’étendue est ${e}.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: { showLabels: true, showValues: true },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_stat_defi_fixed_4_brevet_complet",
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Série : $4 \\,;\\, 6 \\,;\\, 6 \\,;\\, 8 \\,;\\, 11$. Quelle affirmation est exacte ?",
    format: "qcm",
    choices: [
      "moyenne $= 7$ et médiane $= 6$",
      "moyenne $= 6$ et médiane $= 7$",
      "moyenne $= 7$ et médiane $= 8$",
      "moyenne $= 6$ et médiane $= 6$",
    ],
    expected: ["moyenne $= 7$ et médiane $= 6$"],
    comparator: "mcq_exact",
    hint: "Moyenne $= 35 \\div 5$ ; médiane = valeur centrale de la série rangée.",
    explanation:
      "Définition : moyenne et médiane sont deux indicateurs.\n\n" +
      "Méthode : moyenne $= (4+6+6+8+11) \\div 5$ ; médiane = $3^\\text{e}$ valeur rangée.\n\n" +
      "Calcul : moyenne $= 35 \\div 5 = 7$ ; médiane $= 6$.\n\n" +
      "Conclusion : moyenne $= 7$ et médiane $= 6$.",
    tags: ["stat_statistique", "defi", "brevet", "qcm"],
  }

]