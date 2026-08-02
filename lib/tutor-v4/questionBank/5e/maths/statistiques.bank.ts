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

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
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

function expl(calcul: string) {
  return (
    "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
    "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : l’indicateur obtenu résume correctement les données."
  );
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

  /* =========================
     TOP-UP — STAT_ORGANISER_DONNEES
  ========================= */
  {
    kind: "fixed",
    id: "stat_donnee_organiser_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 1,
    theme: "neutral",
    text: "On veut savoir quel animal de compagnie est le plus fréquent dans la classe. Que faut-il faire en premier ?",
    format: "qcm",
    choices: [
      "compter combien d’élèves ont chaque animal",
      "mesurer la taille des animaux",
      "demander l’âge du professeur",
      "dessiner un graphique au hasard",
    ],
    expected: ["compter combien d’élèves ont chaque animal"],
    comparator: "mcq_exact",
    hint: "On organise d’abord les effectifs.",
    explanation: expl("On compte l’effectif de chaque catégorie avant toute représentation."),
    tags: ["stat_statistique", "organiser", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_donnee_organiser_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 2,
    theme: "neutral",
    text: "Comment appelle-t-on le nombre de fois qu’une valeur apparaît dans une série de données ?",
    format: "qcm",
    choices: ["l’effectif", "la moyenne", "la fréquence", "l’étendue"],
    expected: ["l’effectif"],
    comparator: "mcq_exact",
    hint: "C’est un comptage.",
    explanation: expl("Le nombre de fois qu’une valeur apparaît s’appelle l’effectif de cette valeur."),
    tags: ["stat_statistique", "organiser", "qcm", "vocabulaire"],
  },
  {
    kind: "fixed",
    id: "stat_donnee_organiser_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 2,
    theme: "neutral",
    text: "On note les couleurs préférées : rouge, bleu, rouge, vert, bleu, rouge. Quel est l’effectif du rouge ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Compte combien de fois « rouge » apparaît.",
    explanation: expl("« Rouge » apparaît 3 fois : son effectif est 3."),
    tags: ["stat_statistique", "organiser", "effectif"],
  },
  {
    kind: "fixed",
    id: "stat_donnee_organiser_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un tableau d’effectifs, que représente la dernière case « Total » ?",
    format: "qcm",
    choices: [
      "la somme de tous les effectifs",
      "la plus grande valeur",
      "la moyenne des effectifs",
      "le nombre de catégories",
    ],
    expected: ["la somme de tous les effectifs"],
    comparator: "mcq_exact",
    hint: "On additionne toutes les catégories.",
    explanation: expl("Le total est la somme de tous les effectifs, c’est-à-dire le nombre d’individus observés."),
    tags: ["stat_statistique", "organiser", "qcm", "total"],
  },
  {
    kind: "fixed",
    id: "stat_donnee_organiser_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 3,
    theme: "neutral",
    text: "Explique l’intérêt d’un tableau d’effectifs par rapport à une liste brute de données.",
    format: "open",
    expected: ["classer", "compter", "lisible"],
    comparator: "contains_keyword",
    hint: "Pense à la lisibilité.",
    explanation: expl("Un tableau d’effectifs classe et compte les données : il les rend plus lisibles qu’une longue liste."),
    tags: ["stat_statistique", "organiser", "open"],
  },
  {
    kind: "template",
    id: "stat_donnee_organiser_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte combien de fois la valeur demandée apparaît.",
    tags: ["stat_statistique", "organiser", "template"],
    generate: () => {
      const fruits = ["pomme", "banane", "kiwi"];
      const cible = randomChoice(fruits);
      const liste: string[] = [];
      const counts: Record<string, number> = { pomme: 0, banane: 0, kiwi: 0 };
      for (let i = 0; i < 8; i++) {
        const f = randomChoice(fruits);
        liste.push(f);
        counts[f]++;
      }
      // garantir au moins une occurrence de la cible
      if (counts[cible] === 0) {
        liste[0] = cible;
        counts[cible] = 1;
      }
      return {
        text: `On relève les fruits choisis : ${liste.join(", ")}. Quel est l’effectif de « ${cible} » ?`,
        format: "short",
        expected: [String(counts[cible])],
        comparator: "number_equal",
        explanation: expl(`On compte les « ${cible} » dans la liste : effectif = ${counts[cible]}.`),
      };
    },
  },
  {
    kind: "template",
    id: "stat_donnee_organiser_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 3,
    theme: "neutral",
    hint: "Le total est la somme des effectifs.",
    tags: ["stat_statistique", "organiser", "template", "total"],
    generate: () => {
      const a = randomInt(3, 9);
      const b = randomInt(3, 9);
      const c = randomInt(3, 9);
      const total = a + b + c;
      return {
        text: `Un tableau d’effectifs indique : chien ${a}, chat ${b}, oiseau ${c}. Quel est l’effectif total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: expl(`Total = ${a} + ${b} + ${c} = ${total}.`),
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_donnee_organiser_qcm_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase décrit le mieux une « série statistique » ?",
    format: "qcm",
    choices: [
      "un ensemble de données recueillies sur un caractère",
      "une seule mesure isolée",
      "un calcul de moyenne",
      "un diagramme circulaire",
    ],
    expected: ["un ensemble de données recueillies sur un caractère"],
    comparator: "mcq_exact",
    hint: "C’est l’ensemble des observations.",
    explanation: expl("Une série statistique est l’ensemble des données recueillies sur un même caractère."),
    tags: ["stat_statistique", "organiser", "qcm", "vocabulaire"],
  },

  /* =========================
     TOP-UP — STAT_LIRE_TABLEAU
  ========================= */
  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Tableau des moyens de transport : bus 9, vélo 5, marche 7. Quel est l’effectif du vélo ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Lis la valeur de la colonne « vélo ».",
    explanation: expl("L’effectif du vélo se lit directement : 5."),
    tags: ["stat_statistique", "tableau", "lecture"],
  },
  {
    kind: "fixed",
    id: "stat_lire_tableau_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Tableau : roman 14, BD 20, documentaire 6. Quel genre a le plus grand effectif ?",
    format: "qcm",
    choices: ["BD", "roman", "documentaire", "aucun"],
    expected: ["BD"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre.",
    explanation: expl("Le plus grand effectif est 20 : c’est la BD."),
    tags: ["stat_statistique", "tableau", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_lire_tableau_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Tableau : lundi 12, mardi 9, jeudi 12, vendredi 7. Combien de jours ont un effectif de 12 ?",
    format: "qcm",
    choices: ["2", "1", "3", "12"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Compte les cases égales à 12.",
    explanation: expl("Deux jours (lundi et jeudi) ont un effectif de 12."),
    tags: ["stat_statistique", "tableau", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Tableau : foot 10, basket 6, hand 4, total 25. Quel est l’effectif manquant (autre sport) ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Total moins la somme des effectifs connus.",
    explanation: expl("10 + 6 + 4 = 20. Effectif manquant = 25 − 20 = 5."),
    tags: ["stat_statistique", "tableau", "manquant"],
  },
  {
    kind: "fixed",
    id: "stat_lire_tableau_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment retrouver l’effectif total à partir d’un tableau statistique.",
    format: "open",
    expected: ["additionne", "effectifs"],
    comparator: "contains_keyword",
    hint: "On combine toutes les colonnes.",
    explanation: expl("On additionne tous les effectifs du tableau pour obtenir l’effectif total."),
    tags: ["stat_statistique", "tableau", "open"],
  },
  {
    kind: "template",
    id: "stat_lire_tableau_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis directement la valeur demandée.",
    tags: ["stat_statistique", "tableau", "template"],
    generate: () => {
      const cats = ["rouge", "bleu", "vert"];
      const vals = [randomInt(4, 15), randomInt(4, 15), randomInt(4, 15)];
      const i = randomInt(0, 2);
      return {
        text: `Tableau des couleurs : ${cats.map((c, k) => `${c} ${vals[k]}`).join(", ")}. Quel est l’effectif de « ${cats[i]} » ?`,
        format: "short",
        expected: [String(vals[i])],
        comparator: "number_equal",
        explanation: expl(`L’effectif de « ${cats[i]} » se lit directement : ${vals[i]}.`),
      };
    },
  },
  {
    kind: "template",
    id: "stat_lire_tableau_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Total connu moins la somme des autres.",
    tags: ["stat_statistique", "tableau", "template", "manquant"],
    generate: () => {
      const a = randomInt(5, 12);
      const b = randomInt(5, 12);
      const manquant = randomInt(3, 10);
      const total = a + b + manquant;
      return {
        text: `Tableau : musique ${a}, sport ${b}, dessin ?, total ${total}. Quel est l’effectif du dessin ?`,
        format: "short",
        expected: [String(manquant)],
        comparator: "number_equal",
        explanation: expl(`${a} + ${b} = ${a + b}. Effectif du dessin = ${total} − ${a + b} = ${manquant}.`),
      };
    },
  },

  /* =========================
     TOP-UP — STAT_LIRE_GRAPHIQUE
  ========================= */
  {
    kind: "fixed",
    id: "stat_lire_graphique_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "D’après le graphique, quelle activité est la moins choisie ?",
    format: "qcm",
    choices: ["Lecture", "Jeux", "Musique", "Sport"],
    expected: ["Musique"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus basse.",
    explanation: expl("La barre la plus basse correspond à la musique : c’est l’activité la moins choisie."),
    tags: ["stat_statistique", "graphique", "canvas", "qcm"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Lecture", value: 9 },
        { label: "Jeux", value: 13 },
        { label: "Musique", value: 4 },
        { label: "Sport", value: 11 },
      ],
      highlightIndex: 2,
    }),
  },
  {
    kind: "fixed",
    id: "stat_lire_graphique_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "D’après le graphique, quel est l’effectif du « Sport » ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Lis la hauteur de la barre « Sport ».",
    explanation: expl("La barre « Sport » atteint la valeur 11."),
    tags: ["stat_statistique", "graphique", "canvas", "lecture"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Lecture", value: 9 },
        { label: "Jeux", value: 13 },
        { label: "Musique", value: 4 },
        { label: "Sport", value: 11 },
      ],
      highlightIndex: 3,
    }),
  },
  {
    kind: "fixed",
    id: "stat_lire_graphique_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "D’après le graphique, combien d’élèves ont été interrogés au total ?",
    format: "short",
    expected: ["37"],
    comparator: "number_equal",
    hint: "Additionne toutes les barres.",
    explanation: expl("9 + 13 + 4 + 11 = 37 élèves au total."),
    tags: ["stat_statistique", "graphique", "canvas", "total"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Lecture", value: 9 },
        { label: "Jeux", value: 13 },
        { label: "Musique", value: 4 },
        { label: "Sport", value: 11 },
      ],
    }),
  },
  {
    kind: "fixed",
    id: "stat_lire_graphique_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un diagramme en bâtons, que représente la hauteur d’un bâton ?",
    format: "qcm",
    choices: [
      "l’effectif de la catégorie",
      "le nom de la catégorie",
      "la moyenne de la série",
      "le nombre de catégories",
    ],
    expected: ["l’effectif de la catégorie"],
    comparator: "mcq_exact",
    hint: "Plus c’est haut, plus il y en a.",
    explanation: expl("La hauteur d’un bâton est proportionnelle à l’effectif de la catégorie."),
    tags: ["stat_statistique", "graphique", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_lire_graphique_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment lire l’effectif d’une catégorie sur un diagramme en barres.",
    format: "open",
    expected: ["hauteur", "barre", "axe"],
    comparator: "contains_keyword",
    hint: "On projette la barre sur l’axe vertical.",
    explanation: expl("On repère le haut de la barre, puis on lit la valeur correspondante sur l’axe vertical."),
    tags: ["stat_statistique", "graphique", "open"],
  },
  {
    kind: "template",
    id: "stat_lire_graphique_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la hauteur de la barre demandée.",
    tags: ["stat_statistique", "graphique", "canvas", "template"],
    generate: () => {
      const labels = ["A", "B", "C", "D"];
      const values = [randomInt(4, 18), randomInt(4, 18), randomInt(4, 18), randomInt(4, 18)];
      const i = randomInt(0, 3);
      return {
        text: `D’après le graphique, quel est l’effectif de la catégorie ${labels[i]} ?`,
        format: "short",
        expected: [String(values[i])],
        comparator: "number_equal",
        explanation: expl(`La barre ${labels[i]} atteint la valeur ${values[i]}.`),
        canvas: statGraphCanvas({
          graphType: "barres",
          data: labels.map((label, k) => ({ label, value: values[k] })),
          highlightIndex: i,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "stat_lire_graphique_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les hauteurs.",
    tags: ["stat_statistique", "graphique", "canvas", "template", "total"],
    generate: () => {
      const labels = ["A", "B", "C"];
      const values = [randomInt(4, 12), randomInt(4, 12), randomInt(4, 12)];
      const total = sum(values);
      return {
        text: "D’après le graphique, quel est l’effectif total ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: expl(`On additionne les barres : ${values.join(" + ")} = ${total}.`),
        canvas: statGraphCanvas({
          graphType: "batons",
          data: labels.map((label, k) => ({ label, value: values[k] })),
        }),
      };
    },
  },

  /* =========================
     TOP-UP — STAT_EFFECTIF_FREQUENCE
  ========================= */
  {
    kind: "fixed",
    id: "stat_effectif_frequence_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Sur 50 élèves, 30 mangent à la cantine. Quelle est la fréquence en pourcentage ?",
    format: "qcm",
    choices: ["60%", "30%", "50%", "20%"],
    expected: ["60%"],
    comparator: "mcq_exact",
    hint: "30 ÷ 50 puis ×100.",
    explanation: expl("30 ÷ 50 = 0,6 = 60 %."),
    tags: ["stat_statistique", "frequence", "qcm", "pourcentage"],
  },
  {
    kind: "fixed",
    id: "stat_effectif_frequence_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Sur 40 élèves, 10 font de l’allemand. Quelle est la fréquence (écriture décimale) ?",
    format: "short",
    expected: ["0,25", "0.25"],
    comparator: "number_equal",
    hint: "10 ÷ 40.",
    explanation: expl("Fréquence = 10 ÷ 40 = 0,25."),
    tags: ["stat_statistique", "frequence"],
  },
  {
    kind: "fixed",
    id: "stat_effectif_frequence_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "Une fréquence vaut toujours :",
    format: "qcm",
    choices: [
      "un nombre entre 0 et 1",
      "un nombre plus grand que 1",
      "un nombre entier",
      "un nombre négatif",
    ],
    expected: ["un nombre entre 0 et 1"],
    comparator: "mcq_exact",
    hint: "C’est une part d’un total.",
    explanation: expl("Une fréquence est un quotient effectif ÷ total : elle est toujours comprise entre 0 et 1."),
    tags: ["stat_statistique", "frequence", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_effectif_frequence_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi une fréquence ne peut pas dépasser 1.",
    format: "open",
    expected: ["effectif", "total", "part"],
    comparator: "contains_keyword",
    hint: "L’effectif d’une catégorie ne dépasse pas le total.",
    explanation: expl("La fréquence est l’effectif d’une part divisé par le total. Une part ne peut pas dépasser le total, donc la fréquence reste inférieure ou égale à 1."),
    tags: ["stat_statistique", "frequence", "open"],
  },
  {
    kind: "template",
    id: "stat_effectif_frequence_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence ×100 donne le pourcentage.",
    tags: ["stat_statistique", "frequence", "template", "pourcentage"],
    generate: () => {
      const total = randomChoice([20, 25, 50, 100]);
      const effectif = randomChoice([5, 10, 15, 20]);
      const pct = (effectif / total) * 100;
      return {
        text: `Sur ${total} personnes, ${effectif} préfèrent le thé. Quelle est la fréquence en pourcentage ?`,
        format: "short",
        expected: [`${formatNumber(pct)}%`, formatNumber(pct)],
        comparator: "number_equal",
        explanation: expl(`${effectif} ÷ ${total} = ${formatNumber(effectif / total)} = ${formatNumber(pct)} %.`),
      };
    },
  },
  {
    kind: "template",
    id: "stat_effectif_frequence_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence = effectif ÷ total.",
    tags: ["stat_statistique", "frequence", "template"],
    generate: () => {
      const total = randomChoice([8, 10, 16, 20, 25]);
      const effectif = randomInt(1, total - 1);
      const freq = effectif / total;
      return {
        text: `Une enquête porte sur ${total} réponses, dont ${effectif} « oui ». Quelle est la fréquence des « oui » (écriture décimale) ?`,
        format: "short",
        expected: [formatNumber(freq), String(freq).replace(".", ",")],
        comparator: "number_equal",
        explanation: expl(`Fréquence = ${effectif} ÷ ${total} = ${formatNumber(freq)}.`),
      };
    },
  },

  /* =========================
     TOP-UP — STAT_REPRESENTER
  ========================= */
  {
    kind: "fixed",
    id: "stat_representer_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour représenter l’évolution d’une température heure par heure, quel graphique est le plus adapté ?",
    format: "qcm",
    choices: [
      "un graphique avec des points reliés (courbe)",
      "un diagramme circulaire",
      "un simple tableau de mots",
      "une équation",
    ],
    expected: ["un graphique avec des points reliés (courbe)"],
    comparator: "mcq_exact",
    hint: "On suit une évolution dans le temps.",
    explanation: expl("Pour une évolution dans le temps, on utilise un graphique de points reliés (une courbe)."),
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representer_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un diagramme en barres, deux catégories ont le même effectif. Que peut-on dire de leurs barres ?",
    format: "qcm",
    choices: [
      "elles ont la même hauteur",
      "elles ont des couleurs imposées",
      "l’une doit être deux fois plus haute",
      "elles sont forcément côte à côte",
    ],
    expected: ["elles ont la même hauteur"],
    comparator: "mcq_exact",
    hint: "Même effectif = même hauteur.",
    explanation: expl("La hauteur représente l’effectif : deux effectifs égaux donnent des barres de même hauteur."),
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un diagramme en barres, 1 carreau = 2 élèves. Une barre fait 5 carreaux. Combien d’élèves représente-t-elle ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Multiplie les carreaux par l’échelle.",
    explanation: expl("5 carreaux × 2 élèves = 10 élèves."),
    tags: ["stat_statistique", "representation", "echelle"],
  },
  {
    kind: "fixed",
    id: "stat_representer_qcm_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel élément est indispensable sur un diagramme en barres pour qu’il soit lisible ?",
    format: "qcm",
    choices: [
      "une graduation sur l’axe vertical",
      "un titre en couleur",
      "une bordure épaisse",
      "un fond gris",
    ],
    expected: ["une graduation sur l’axe vertical"],
    comparator: "mcq_exact",
    hint: "Sans graduation on ne peut pas lire les valeurs.",
    explanation: expl("Une graduation sur l’axe vertical est indispensable pour lire les effectifs."),
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representer_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique le rôle de l’échelle quand on construit un diagramme en barres.",
    format: "open",
    expected: ["echelle", "hauteur", "effectif"],
    comparator: "contains_keyword",
    hint: "L’échelle relie carreaux et effectifs.",
    explanation: expl("L’échelle indique combien d’unités vaut un carreau. Elle fixe la hauteur de chaque barre selon son effectif."),
    tags: ["stat_statistique", "representation", "open"],
  },
  {
    kind: "template",
    id: "stat_representer_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère la barre la plus haute.",
    tags: ["stat_statistique", "representation", "canvas", "template"],
    generate: () => {
      const labels = ["A", "B", "C", "D"];
      const values = shuffle([randomInt(5, 8), randomInt(9, 12), randomInt(13, 16), randomInt(17, 20)]);
      const max = Math.max(...values);
      const i = values.indexOf(max);
      return {
        text: "Sur ce diagramme, quelle catégorie faut-il représenter par la barre la plus haute ?",
        format: "qcm",
        choices: labels,
        expected: [labels[i]],
        comparator: "mcq_exact",
        explanation: expl(`Le plus grand effectif est ${max} : la barre la plus haute est celle de ${labels[i]}.`),
        canvas: statGraphCanvas({
          graphType: "barres",
          data: labels.map((label, k) => ({ label, value: values[k] })),
          highlightIndex: i,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "stat_representer_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie le nombre de carreaux par l’échelle.",
    tags: ["stat_statistique", "representation", "template", "echelle"],
    generate: () => {
      const echelle = randomChoice([2, 3, 5]);
      const carreaux = randomInt(3, 8);
      return {
        text: `Sur un diagramme, 1 carreau représente ${echelle} élèves. Une barre mesure ${carreaux} carreaux. Combien d’élèves représente-t-elle ?`,
        format: "short",
        expected: [String(echelle * carreaux)],
        comparator: "number_equal",
        explanation: expl(`${carreaux} carreaux × ${echelle} = ${echelle * carreaux} élèves.`),
      };
    },
  },

  /* =========================
     TOP-UP — STAT_CHOISIR_REPRESENTATION
  ========================= */
  {
    kind: "fixed",
    id: "stat_representation_choisir_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 2,
    theme: "neutral",
    text: "On veut comparer le nombre d’élèves dans 4 clubs. Quelle représentation est la plus simple à lire ?",
    format: "qcm",
    choices: [
      "un diagramme en barres",
      "une longue phrase",
      "une équation",
      "une droite graduée seule",
    ],
    expected: ["un diagramme en barres"],
    comparator: "mcq_exact",
    hint: "On compare des effectifs.",
    explanation: expl("Pour comparer des effectifs entre catégories, le diagramme en barres est le plus lisible."),
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 2,
    theme: "neutral",
    text: "Pour visualiser la part de chaque matière dans une journée de 24 h, on choisit :",
    format: "qcm",
    choices: [
      "un diagramme circulaire",
      "un diagramme en bâtons isolés",
      "une simple liste",
      "une équation",
    ],
    expected: ["un diagramme circulaire"],
    comparator: "mcq_exact",
    hint: "On veut des parts d’un tout.",
    explanation: expl("Le diagramme circulaire montre bien la part de chaque élément dans un total."),
    tags: ["stat_statistique", "representation", "camembert", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_qcm_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle représentation est la PLUS adaptée pour suivre la taille d’une plante semaine après semaine ?",
    format: "qcm",
    choices: [
      "une courbe (points reliés)",
      "un diagramme circulaire",
      "un tableau de couleurs",
      "un diagramme circulaire double",
    ],
    expected: ["une courbe (points reliés)"],
    comparator: "mcq_exact",
    hint: "On suit une évolution.",
    explanation: expl("Pour une évolution au cours du temps, la courbe (points reliés) est la plus adaptée."),
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_qcm_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "Un diagramme circulaire complet représente toujours :",
    format: "qcm",
    choices: ["100 % du total", "la moyenne", "l’effectif le plus grand", "50 % du total"],
    expected: ["100 % du total"],
    comparator: "mcq_exact",
    hint: "Le disque entier = le tout.",
    explanation: expl("Le disque entier d’un diagramme circulaire représente 100 % du total, soit 360°."),
    tags: ["stat_statistique", "representation", "camembert", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_qcm_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 2,
    theme: "neutral",
    text: "Quel outil organise les données mais ne les « dessine » pas ?",
    format: "qcm",
    choices: [
      "un tableau d’effectifs",
      "un diagramme en barres",
      "un diagramme circulaire",
      "une courbe",
    ],
    expected: ["un tableau d’effectifs"],
    comparator: "mcq_exact",
    hint: "Lignes et colonnes, pas de dessin.",
    explanation: expl("Le tableau d’effectifs organise les données sans représentation graphique."),
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_qcm_7",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "On a les notes de toute une classe. Quelle représentation permet de comparer rapidement le nombre d’élèves par note ?",
    format: "qcm",
    choices: [
      "un diagramme en barres",
      "une équation",
      "une phrase descriptive",
      "une seule moyenne",
    ],
    expected: ["un diagramme en barres"],
    comparator: "mcq_exact",
    hint: "Une barre par note.",
    explanation: expl("Un diagramme en barres (une barre par note) permet de comparer rapidement les effectifs."),
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "Explique dans quel cas un diagramme circulaire est préférable à un diagramme en barres.",
    format: "open",
    expected: ["part", "total", "circulaire"],
    comparator: "contains_keyword",
    hint: "Pense aux parts d’un tout.",
    explanation: expl("Le diagramme circulaire est préférable quand on veut montrer la part de chaque catégorie dans le total."),
    tags: ["stat_statistique", "representation", "open"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_qcm_8",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "On veut montrer la répartition des budgets (loisirs, nourriture, transport) d’une famille. Quelle représentation choisir ?",
    format: "qcm",
    choices: [
      "un diagramme circulaire",
      "une courbe d’évolution",
      "une seule moyenne",
      "une droite graduée",
    ],
    expected: ["un diagramme circulaire"],
    comparator: "mcq_exact",
    hint: "On montre des parts d’un budget total.",
    explanation: expl("Pour montrer la répartition (les parts) d’un total, on choisit un diagramme circulaire."),
    tags: ["stat_statistique", "representation", "camembert", "qcm"],
  },

  /* =========================
     TOP-UP — STAT_MOYENNE
  ========================= */
  {
    kind: "fixed",
    id: "stat_moyenne_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule la moyenne de 6 et 10.",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "(6 + 10) ÷ 2.",
    explanation: expl("Moyenne = (6 + 10) ÷ 2 = 16 ÷ 2 = 8."),
    tags: ["stat_statistique", "moyenne"],
  },
  {
    kind: "fixed",
    id: "stat_moyenne_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "La moyenne de 5 ; 5 ; 5 ; 5 vaut :",
    format: "qcm",
    choices: ["5", "20", "4", "10"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Toutes les valeurs sont égales.",
    explanation: expl("Quand toutes les valeurs sont égales à 5, la moyenne vaut 5."),
    tags: ["stat_statistique", "moyenne", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_moyenne_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer une moyenne, par quel nombre faut-il diviser la somme des valeurs ?",
    format: "qcm",
    choices: [
      "le nombre de valeurs",
      "la plus grande valeur",
      "toujours par 2",
      "la plus petite valeur",
    ],
    expected: ["le nombre de valeurs"],
    comparator: "mcq_exact",
    hint: "On divise par le nombre de données.",
    explanation: expl("La moyenne est la somme des valeurs divisée par le nombre de valeurs."),
    tags: ["stat_statistique", "moyenne", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_moyenne_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi la moyenne d’une série est comprise entre la plus petite et la plus grande valeur.",
    format: "open",
    expected: ["entre", "petite", "grande"],
    comparator: "contains_keyword",
    hint: "La moyenne « équilibre » les valeurs.",
    explanation: expl("La moyenne équilibre les valeurs : elle ne peut pas être plus petite que le minimum ni plus grande que le maximum."),
    tags: ["stat_statistique", "moyenne", "open"],
  },
  {
    kind: "template",
    id: "stat_moyenne_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    hint: "Somme ÷ 4.",
    tags: ["stat_statistique", "moyenne", "template"],
    generate: () => {
      const vals = [randomChoice([8, 10, 12]), randomChoice([10, 12, 14]), randomChoice([12, 14, 16]), randomChoice([14, 16, 18])];
      const mean = sum(vals) / 4;
      return {
        text: `Calcule la moyenne de ${vals.join(" ; ")}.`,
        format: "short",
        expected: [formatNumber(mean), String(mean).replace(".", ",")],
        comparator: "number_equal",
        explanation: expl(`Moyenne = (${vals.join(" + ")}) ÷ 4 = ${sum(vals)} ÷ 4 = ${formatNumber(mean)}.`),
      };
    },
  },
  {
    kind: "template",
    id: "stat_moyenne_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne toutes les notes puis divise par leur nombre.",
    tags: ["stat_statistique", "moyenne", "template"],
    generate: () => {
      const n = randomChoice([2, 5]);
      const base = randomChoice([10, 12, 14]);
      const vals = Array.from({ length: n }, () => base + randomInt(-2, 2) * 2);
      const mean = sum(vals) / n;
      return {
        text: `Un élève a obtenu les notes : ${vals.join(" ; ")}. Quelle est sa moyenne ?`,
        format: "short",
        expected: [formatNumber(mean), String(mean).replace(".", ",")],
        comparator: "number_equal",
        explanation: expl(`Somme = ${vals.join(" + ")} = ${sum(vals)}. Moyenne = ${sum(vals)} ÷ ${n} = ${formatNumber(mean)}.`),
      };
    },
  },

  /* =========================
     TOP-UP — STAT_DEFIS
  ========================= */
  {
    kind: "fixed",
    id: "stat_defi_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Une classe de 20 élèves a une moyenne de 12 à un contrôle. Quelle est la somme de toutes les notes ?",
    format: "short",
    expected: ["240"],
    comparator: "number_equal",
    hint: "Moyenne × effectif = somme.",
    explanation: expl("Somme = moyenne × effectif = 12 × 20 = 240."),
    tags: ["stat_statistique", "defi", "moyenne"],
  },
  {
    kind: "fixed",
    id: "stat_defi_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un diagramme circulaire, une part occupe la moitié du disque. Quel pourcentage représente-t-elle ?",
    format: "qcm",
    choices: ["50%", "25%", "100%", "180%"],
    expected: ["50%"],
    comparator: "mcq_exact",
    hint: "La moitié de 100 %.",
    explanation: expl("La moitié du disque correspond à 50 % du total (180°)."),
    tags: ["stat_statistique", "defi", "qcm", "camembert"],
  },
  {
    kind: "fixed",
    id: "stat_defi_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "neutral",
    text: "La moyenne de 4 nombres est 10. Trois d’entre eux valent 8, 12 et 9. Combien vaut le quatrième ?",
    format: "qcm",
    choices: ["11", "10", "9", "13"],
    expected: ["11"],
    comparator: "mcq_exact",
    hint: "Somme totale = 40.",
    explanation: expl("Somme = 10 × 4 = 40. 8 + 12 + 9 = 29. Quatrième = 40 − 29 = 11."),
    tags: ["stat_statistique", "defi", "qcm", "moyenne"],
  },
  {
    kind: "fixed",
    id: "stat_defi_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève affirme : « Ajouter une note de 0 ne change pas la moyenne ». Explique pourquoi c’est faux.",
    format: "open",
    expected: ["diminue", "somme", "valeurs"],
    comparator: "contains_keyword",
    hint: "Le nombre de valeurs augmente, pas la somme.",
    explanation: expl("Ajouter un 0 garde la même somme mais augmente le nombre de valeurs : la moyenne diminue donc."),
    tags: ["stat_statistique", "defi", "open", "erreur"],
  },
  {
    kind: "template",
    id: "stat_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Additionne, puis divise par le nombre de jours.",
    tags: ["stat_statistique", "defi", "reunion", "template"],
    generate: () => {
      const temps = [randomInt(26, 32), randomInt(26, 32), randomInt(26, 32)];
      const mean = sum(temps) / 3;
      return {
        text: `À Saint-Denis, on relève les températures (°C) sur 3 jours : ${temps.join(" ; ")}. Quelle est la température moyenne ?`,
        format: "short",
        expected: [formatNumber(mean), String(mean).replace(".", ",")],
        comparator: "number_equal",
        explanation: expl(`Moyenne = (${temps.join(" + ")}) ÷ 3 = ${sum(temps)} ÷ 3 = ${formatNumber(mean)} °C.`),
        canvas: statGraphCanvas({
          graphType: "batons",
          data: temps.map((value, k) => ({ label: `J${k + 1}`, value })),
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_defi_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un diagramme circulaire de 360°, une catégorie occupe un angle de 90°. Quel pourcentage du total représente-t-elle ?",
    format: "qcm",
    choices: ["25%", "50%", "90%", "10%"],
    expected: ["25%"],
    comparator: "mcq_exact",
    hint: "90° sur 360°.",
    explanation: expl("90 ÷ 360 = 0,25 = 25 % du total."),
    tags: ["stat_statistique", "defi", "qcm", "camembert"],
  },
  {
    kind: "template",
    id: "stat_defi_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Fréquence ×100 = pourcentage.",
    tags: ["stat_statistique", "defi", "reunion", "template", "pourcentage"],
    generate: () => {
      const oui = randomChoice([10, 15, 20, 25]);
      const total = randomChoice([50, 100]);
      const pct = (oui / total) * 100;
      return {
        text: `Un sondage à Saint-Pierre recueille ${total} réponses, dont ${oui} « pour » le projet. Quel pourcentage représente les « pour » ?`,
        format: "short",
        expected: [`${formatNumber(pct)}%`, formatNumber(pct)],
        comparator: "number_equal",
        explanation: expl(`${oui} ÷ ${total} = ${formatNumber(oui / total)} = ${formatNumber(pct)} %.`),
      };
    },
  },
];