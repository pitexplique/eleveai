// lib/tutor-v4/question-banks/maths/5e/statistiques.bank.ts

import type {
  TutorBankItemV4,
  StatGraphCanvasData,
} from "@/lib/tutor-v4/types";

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
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function sum(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}

function statGraphCanvas(params: {
  graphType: "barres" | "batons" | "camembert";
  data: Array<{ label: string; value: number; color?: string }>;
  highlightIndex?: number;
}): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    graphType: params.graphType,
    data: params.data,
    display: {
      showLabels: true,
      showValues: true,
      highlightIndex: params.highlightIndex,
    },
    size: {
      width: 320,
      height: 220,
    },
  };
}

export const statistiquesBank: TutorBankItemV4[] = [
  /* =========================
     STAT_ORGANISER_DONNEES
  ========================= */
  {
    kind: "fixed",
    id: "stat_donnee_organiser_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 1,
    theme: "neutral",
    text: "On interroge des élèves sur leur sport préféré. Quelle information doit-on compter pour faire un tableau statistique ?",
    format: "qcm",
    choices: [
      "le nombre d’élèves pour chaque sport",
      "la taille des élèves",
      "la couleur du tableau",
      "le nom du professeur",
    ],
    expected: ["le nombre d’élèves pour chaque sport"],
    comparator: "mcq_exact",
    hint: "Un tableau statistique organise des effectifs.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("Pour faire un tableau statistique, on compte l’effectif de chaque catégorie.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "organiser", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_donnee_organiser_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi il faut organiser les données avant de les représenter.",
    format: "open",
    expected: ["classer", "compter", "effectifs"],
    comparator: "contains_keyword",
    hint: "Avant un graphique, il faut savoir combien il y a de données dans chaque catégorie.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("On organise les données pour les classer et compter les effectifs. Ensuite, on peut construire un tableau ou un graphique.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "organiser", "open"],
  },

  /* =========================
     STAT_LIRE_TABLEAU
  ========================= */
  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une enquête, 8 élèves préfèrent le football, 6 le basket et 4 la natation. Quel est l’effectif du basket ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Lis directement l’effectif associé au basket.",
    explanation: "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("L’effectif du basket est 6.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "tableau", "lecture"],
  },
  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une enquête : foot 8 élèves, basket 6 élèves, natation 4 élèves. Quel est l’effectif total ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Additionne les effectifs.",
    explanation: "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("L’effectif total est 8 + 6 + 4 = 18.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "tableau", "effectif_total"],
  },
  {
    kind: "template",
    id: "stat_lire_tableau_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne tous les effectifs.",
    tags: ["stat_statistique", "tableau", "template"],
    generate: () => {
      const a = randomInt(4, 12);
      const b = randomInt(4, 12);
      const c = randomInt(4, 12);
      const total = a + b + c;

      return {
        text: `Dans une enquête : sport ${a} élèves, musique ${b} élèves, dessin ${c} élèves. Quel est l’effectif total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          (`On additionne les effectifs : ${a} + ${b} + ${c} = ${total}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
      };
    },
  },

  /* =========================
     STAT_LIRE_GRAPHIQUE
  ========================= */
  {
    kind: "fixed",
    id: "stat_lire_graphique_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "D’après le graphique, quelle activité est la plus choisie ?",
    format: "qcm",
    choices: ["Foot", "Basket", "Natation", "Dessin"],
    expected: ["Foot"],
    comparator: "mcq_exact",
    hint: "Regarde la barre la plus haute.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("La barre la plus haute est celle du foot : c’est l’activité la plus choisie.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "graphique", "canvas", "qcm"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Foot", value: 12 },
        { label: "Basket", value: 8 },
        { label: "Natation", value: 5 },
        { label: "Dessin", value: 7 },
      ],
      highlightIndex: 0,
    }),
  },
  {
    kind: "fixed",
    id: "stat_lire_graphique_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver la catégorie la plus fréquente sur un diagramme en barres.",
    format: "open",
    expected: ["barre", "plus haute", "effectif"],
    comparator: "contains_keyword",
    hint: "Observe la hauteur des barres.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("La catégorie la plus fréquente est celle dont la barre est la plus haute, car elle a le plus grand effectif.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "graphique", "open"],
  },
  {
    kind: "template",
    id: "stat_lire_graphique_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère la plus grande valeur.",
    tags: ["stat_statistique", "graphique", "canvas", "template"],
    generate: () => {
      const labels = ["A", "B", "C", "D"];
      const values = shuffle([randomInt(4, 7), randomInt(8, 10), randomInt(11, 14), randomInt(15, 18)]);
      const max = Math.max(...values);
      const index = values.indexOf(max);

      return {
        text: "D’après le graphique, quelle catégorie a le plus grand effectif ?",
        format: "qcm",
        choices: labels,
        expected: [labels[index]],
        comparator: "mcq_exact",
        explanation: "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          (`La plus grande valeur est ${max}. Elle correspond à la catégorie ${labels[index]}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
        canvas: statGraphCanvas({
          graphType: "barres",
          data: labels.map((label, i) => ({ label, value: values[i] })),
          highlightIndex: index,
        }),
      };
    },
  },

  /* =========================
     STAT_EFFECTIF_FREQUENCE
  ========================= */
  {
    kind: "fixed",
    id: "stat_effectif_frequence_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une classe de 25 élèves, 10 viennent à vélo. Quelle est la fréquence des élèves venant à vélo ?",
    format: "short",
    expected: ["0,4", "0.4", "40%"],
    comparator: "number_equal",
    hint: "Fréquence = effectif ÷ effectif total.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("La fréquence est 10 ÷ 25 = 0,4, soit 40 %.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "frequence"],
  },
  {
    kind: "fixed",
    id: "stat_effectif_frequence_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un groupe de 20 élèves, 5 préfèrent les maths. Quelle est la fréquence ?",
    format: "qcm",
    choices: ["0,25", "0,5", "5", "15"],
    expected: ["0,25"],
    comparator: "mcq_exact",
    hint: "Calcule 5 ÷ 20.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("La fréquence est 5 ÷ 20 = 0,25.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "frequence", "qcm"],
  },
  {
    kind: "template",
    id: "stat_effectif_frequence_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence = effectif ÷ total.",
    tags: ["stat_statistique", "frequence", "template"],
    generate: () => {
      const total = randomChoice([20, 25, 30, 40, 50]);
      const effectif = randomChoice([5, 10, 15, 20]);
      const freq = effectif / total;

      return {
        text: `Dans un groupe de ${total} élèves, ${effectif} ont choisi l’activité théâtre. Quelle est la fréquence ?`,
        format: "short",
        expected: [formatNumber(freq), String(freq).replace(".", ",")],
        comparator: "number_equal",
        explanation: "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          (`Fréquence = ${effectif} ÷ ${total} = ${formatNumber(freq)}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_effectif_frequence_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer une fréquence à partir d’un effectif.",
    format: "open",
    expected: ["effectif", "total", "divise"],
    comparator: "contains_keyword",
    hint: "Il faut comparer l’effectif à l’effectif total.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("Pour calculer une fréquence, on divise l’effectif de la catégorie par l’effectif total.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "frequence", "open"],
  },

  /* =========================
     STAT_REPRESENTER
  ========================= */
  {
    kind: "fixed",
    id: "stat_representer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel graphique est adapté pour comparer les effectifs de plusieurs catégories ?",
    format: "qcm",
    choices: [
      "un diagramme en barres",
      "une phrase seulement",
      "une opération posée",
      "une droite graduée seule",
    ],
    expected: ["un diagramme en barres"],
    comparator: "mcq_exact",
    hint: "On veut comparer plusieurs quantités.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("Un diagramme en barres est adapté pour comparer les effectifs de plusieurs catégories.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "template",
    id: "stat_representer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde si les hauteurs correspondent bien aux effectifs.",
    tags: ["stat_statistique", "representation", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "A", value: randomInt(4, 10) },
        { label: "B", value: randomInt(4, 10) },
        { label: "C", value: randomInt(4, 10) },
      ];

      return {
        text: "Le graphique représente trois effectifs. Quel est l’effectif total représenté ?",
        format: "short",
        expected: [String(sum(data.map((d) => d.value)))],
        comparator: "number_equal",
        explanation: "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          (`On additionne les effectifs : ${data
          .map((d) => d.value)
          .join(" + ")} = ${sum(data.map((d) => d.value))}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
        canvas: statGraphCanvas({
          graphType: "batons",
          data,
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_representer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi un diagramme en barres peut aider à comparer des effectifs.",
    format: "open",
    expected: ["barres", "hauteur", "comparer", "effectifs"],
    comparator: "contains_keyword",
    hint: "Regarde le rôle de la hauteur des barres.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("La hauteur des barres représente les effectifs. On peut donc comparer rapidement les catégories.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "representation", "open"],
  },

  /* =========================
     STAT_CHOISIR_REPRESENTATION
  ========================= */
  {
    kind: "fixed",
    id: "stat_representation_choisir_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 2,
    theme: "neutral",
    text: "Pour montrer la répartition d’un total en plusieurs parties, quelle représentation peut-on choisir ?",
    format: "qcm",
    choices: [
      "un diagramme circulaire",
      "une addition posée",
      "une équation",
      "un segment sans graduation",
    ],
    expected: ["un diagramme circulaire"],
    comparator: "mcq_exact",
    hint: "On veut voir des parts d’un total.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("Un diagramme circulaire permet de visualiser la répartition d’un total en plusieurs parties.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "representation", "camembert", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la différence entre un tableau statistique et un diagramme en barres.",
    format: "open",
    expected: ["tableau", "graphique", "barres", "effectifs"],
    comparator: "contains_keyword",
    hint: "Le tableau organise les données ; le graphique les visualise.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("Un tableau présente les données sous forme de lignes et de colonnes. Un diagramme en barres permet de visualiser et comparer les effectifs.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "representation", "open"],
  },

  /* =========================
     STAT_MOYENNE
  ========================= */
  {
    kind: "fixed",
    id: "stat_moyenne_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule la moyenne des notes : 10 ; 12 ; 14.",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Additionne les notes puis divise par 3.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("Moyenne = (10 + 12 + 14) ÷ 3 = 36 ÷ 3 = 12.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "moyenne"],
  },
  {
    kind: "fixed",
    id: "stat_moyenne_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la moyenne de 8 ; 10 ; 12 ; 14 ?",
    format: "qcm",
    choices: ["10", "11", "12", "44"],
    expected: ["11"],
    comparator: "mcq_exact",
    hint: "Additionne puis divise par 4.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("8 + 10 + 12 + 14 = 44. Puis 44 ÷ 4 = 11.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "moyenne", "qcm"],
  },
  {
    kind: "template",
    id: "stat_moyenne_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    hint: "Somme des valeurs ÷ nombre de valeurs.",
    tags: ["stat_statistique", "moyenne", "template"],
    generate: () => {
      const a = randomChoice([6, 8, 10, 12]);
      const b = randomChoice([10, 12, 14]);
      const c = randomChoice([14, 16, 18]);
      const mean = (a + b + c) / 3;

      return {
        text: `Calcule la moyenne de ${a} ; ${b} ; ${c}.`,
        format: "short",
        expected: [formatNumber(mean)],
        comparator: "number_equal",
        explanation: "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          (`Moyenne = (${a} + ${b} + ${c}) ÷ 3 = ${formatNumber(mean)}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_moyenne_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer la moyenne de 10 ; 12 ; 14.",
    format: "open",
    expected: ["additionne", "divise", "3", "12"],
    comparator: "contains_keyword",
    hint: "Il y a deux étapes.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("On additionne les trois valeurs : 10 + 12 + 14 = 36. Puis on divise par 3 : 36 ÷ 3 = 12.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "moyenne", "open"],
  },

  /* =========================
     STAT_DEFIS
  ========================= */
  {
    kind: "fixed",
    id: "stat_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, une classe relève le nombre de déchets ramassés : plastique 12, verre 8, papier 10. Quel est l’effectif total ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Additionne les trois effectifs.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("L’effectif total est 12 + 8 + 10 = 30.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "defi", "reunion"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Plastique", value: 12 },
        { label: "Verre", value: 8 },
        { label: "Papier", value: 10 },
      ],
    }),
  },
  {
    kind: "fixed",
    id: "stat_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « La moyenne de 10, 12 et 14 est 36 ». Explique son erreur.",
    format: "open",
    expected: ["somme", "diviser", "3", "12"],
    comparator: "contains_keyword",
    hint: "36 est la somme, pas la moyenne.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("L’élève a seulement additionné les valeurs. Il faut ensuite diviser par le nombre de valeurs : 36 ÷ 3 = 12.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "defi", "open", "erreur"],
  },
  {
    kind: "template",
    id: "stat_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Calcule d’abord le total, puis la fréquence.",
    tags: ["stat_statistique", "defi", "reunion", "template"],
    generate: () => {
      const mangues = randomInt(5, 12);
      const ananas = randomInt(5, 12);
      const letchis = randomInt(5, 12);
      const total = mangues + ananas + letchis;
      const freq = mangues / total;

      return {
        text: `Au marché de Saint-Pierre, on vend ${mangues} kg de mangues, ${ananas} kg d’ananas et ${letchis} kg de letchis. Quelle est la fréquence des mangues ?`,
        format: "short",
        expected: [formatNumber(freq), String(freq).replace(".", ",")],
        comparator: "number_equal",
        explanation: "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          (`Total = ${mangues} + ${ananas} + ${letchis} = ${total}. Fréquence des mangues = ${mangues} ÷ ${total} = ${formatNumber(freq)}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
        canvas: statGraphCanvas({
          graphType: "barres",
          data: [
            { label: "Mangues", value: mangues },
            { label: "Ananas", value: ananas },
            { label: "Letchis", value: letchis },
          ],
          highlightIndex: 0,
        }),
      };
    },
  },
];