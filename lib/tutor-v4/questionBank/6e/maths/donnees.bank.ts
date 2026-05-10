// lib/tutor-v4/question-banks/maths/6e/donnees.bank.ts

import type {
  TutorBankItemV4,
  TableauDonneesCanvasData,
  StatGraphCanvasData,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function tableauDonneesCanvas(
  data: Omit<TableauDonneesCanvasData, "kind">
): TableauDonneesCanvasData {
  return { kind: "tableau_donnees", ...data };
}

function statGraphCanvas(
  data: Omit<StatGraphCanvasData, "kind">
): StatGraphCanvasData {
  return { kind: "stat_graph", ...data };
}

export const donneesBank: TutorBankItemV4[] = [
  /* =========================
     DATA_LIRE_TABLEAU
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_lire_tableau_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Dans le tableau, combien d’élèves ont choisi le football ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Lis la ligne Football.",
    explanation:
      "Définition : lire un tableau, c’est repérer la bonne ligne et la bonne colonne.\n\n" +
      "Méthode : on cherche la ligne Football, puis on lit la valeur indiquée.\n\n" +
      "Observation : la ligne Football indique 12 élèves.\n\n" +
      "Conclusion : 12 élèves ont choisi le football.",
    tags: ["stat_donnee", "tableau", "lecture", "canvas"],
    canvas: tableauDonneesCanvas({
      title: "Activités choisies",
      headers: ["Nombre d’élèves"],
      rows: [
        { label: "Football", values: [12] },
        { label: "Natation", values: [8] },
        { label: "Danse", values: [10] },
      ],
      highlight: { cell: { row: 0, col: 0 } },
      caption: "Résultats d’un sondage dans une classe de 6e.",
    }),
  },

  {
    kind: "template",
    id: "6e_stat_stat_stat_donnee_lire_tableau_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_tableau",
    difficulty: 2,
    theme: "reunion",
    hint: "Repère la bonne ligne dans le tableau.",
    tags: ["stat_donnee", "tableau", "reunion", "template", "canvas"],
    generate: () => {
      const fruits = [
        { label: "Mangues", value: randomChoice([8, 10, 12, 15]) },
        { label: "Ananas", value: randomChoice([6, 9, 11, 14]) },
        { label: "Letchis", value: randomChoice([7, 13, 16, 18]) },
      ];
      const target = randomChoice(fruits);

      return {
        text: `Au marché, combien de ${target.label.toLowerCase()} ont été vendus ?`,
        format: "short",
        expected: [String(target.value)],
        comparator: "number_equal",
        explanation:
          "Définition : lire un tableau consiste à retrouver une information organisée.\n\n" +
          "Méthode : on cherche la ligne qui correspond au fruit demandé.\n\n" +
          `Observation : la ligne ${target.label} indique ${target.value}.\n\n` +
          `Conclusion : ${target.value} ${target.label.toLowerCase()} ont été vendus.`,
        canvas: tableauDonneesCanvas({
          title: "Ventes au marché",
          headers: ["Quantité vendue"],
          rows: fruits.map((f) => ({
            label: f.label,
            values: [f.value],
          })),
          highlight: {
            cell: { row: fruits.findIndex((f) => f.label === target.label), col: 0 },
          },
          caption: "Marché de Saint-Pierre.",
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_lire_tableau_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment tu fais pour lire correctement une information dans un tableau.",
    format: "open",
    expected: ["ligne", "colonne", "valeur", "titre", "repérer"],
    comparator: "contains_keyword",
    hint: "Parle de la ligne, de la colonne et de la valeur lue.",
    explanation:
      "Définition : un tableau organise des informations en lignes et en colonnes.\n\n" +
      "Méthode : on lit d’abord le titre, puis on repère la ligne et la colonne utiles.\n\n" +
      "Observation : la valeur cherchée se trouve au croisement de la bonne ligne et de la bonne colonne.\n\n" +
      "Conclusion : pour lire un tableau, il faut repérer précisément ligne, colonne et valeur.",
    tags: ["stat_donnee", "tableau", "open", "methode"],
  },

  /* =========================
     DATA_LIRE_GRAPHIQUE
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_lire_graphique_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_graphique",
    difficulty: 1,
    theme: "neutral",
    text: "Sur le graphique, combien d’élèves ont choisi la lecture ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Lis la hauteur du bâton Lecture.",
    explanation:
      "Définition : lire un graphique, c’est repérer une catégorie et la valeur associée.\n\n" +
      "Méthode : on cherche le bâton Lecture, puis on lit sa hauteur.\n\n" +
      "Observation : le bâton Lecture correspond à 9 élèves.\n\n" +
      "Conclusion : 9 élèves ont choisi la lecture.",
    tags: ["stat_donnee", "graphique", "lecture", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      data: [
        { label: "Sport", value: 12 },
        { label: "Lecture", value: 9 },
        { label: "Jeux", value: 15 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 1 },
    }),
  },

  {
    kind: "template",
    id: "6e_stat_stat_stat_donnee_lire_graphique_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la valeur au-dessus du bâton demandé.",
    tags: ["stat_donnee", "graphique", "template", "canvas"],
    generate: () => {
      const data = [
        { label: "Lundi", value: randomChoice([5, 6, 7, 8]) },
        { label: "Mardi", value: randomChoice([8, 9, 10, 11]) },
        { label: "Mercredi", value: randomChoice([4, 5, 6, 7]) },
      ];
      const index = randomChoice([0, 1, 2]);
      const target = data[index];

      return {
        text: `Combien de livres ont été empruntés ${target.label.toLowerCase()} ?`,
        format: "short",
        expected: [String(target.value)],
        comparator: "number_equal",
        explanation:
          "Définition : un graphique permet de représenter visuellement des données.\n\n" +
          "Méthode : on repère la catégorie demandée, puis on lit la valeur associée.\n\n" +
          `Observation : pour ${target.label}, la valeur indiquée est ${target.value}.\n\n` +
          `Conclusion : ${target.value} livres ont été empruntés ${target.label.toLowerCase()}.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: { showLabels: true, showValues: true, highlightIndex: index },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_lire_graphique_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi un graphique peut aider à mieux comprendre des données.",
    format: "open",
    expected: ["voir", "comparer", "valeurs", "plus grand", "plus petit"],
    comparator: "contains_keyword",
    hint: "Parle de la comparaison visuelle.",
    explanation:
      "Définition : un graphique représente des données sous une forme visuelle.\n\n" +
      "Méthode : on observe les hauteurs ou les parts pour comparer rapidement.\n\n" +
      "Observation : on voit plus facilement les valeurs grandes, petites ou proches.\n\n" +
      "Conclusion : un graphique aide à lire et comparer des données.",
    tags: ["stat_donnee", "graphique", "open", "raisonnement"],
  },

  /* =========================
     DATA_PRELEVER
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_prelever_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_prelever",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le tableau, combien de filles ont choisi la natation ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cherche la ligne Natation et la colonne Filles.",
    explanation:
      "Définition : prélever une information, c’est retrouver une donnée précise.\n\n" +
      "Méthode : on cherche la bonne ligne et la bonne colonne.\n\n" +
      "Observation : à la ligne Natation et dans la colonne Filles, on lit 6.\n\n" +
      "Conclusion : 6 filles ont choisi la natation.",
    tags: ["stat_donnee", "prelever", "tableau_double_entree", "canvas"],
    canvas: tableauDonneesCanvas({
      title: "Activités choisies",
      headers: ["Filles", "Garçons"],
      rows: [
        { label: "Football", values: [5, 9] },
        { label: "Natation", values: [6, 7] },
        { label: "Danse", values: [8, 3] },
      ],
      highlight: { cell: { row: 1, col: 0 } },
      caption: "Tableau à deux variables : activité et groupe.",
    }),
  },

  {
    kind: "template",
    id: "6e_stat_stat_stat_donnee_prelever_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_prelever",
    difficulty: 3,
    theme: "reunion",
    hint: "Cherche le croisement entre la bonne ligne et la bonne colonne.",
    tags: ["stat_donnee", "prelever", "reunion", "tableau_double_entree", "template", "canvas"],
    generate: () => {
      const rows = [
        { label: "Saint-Pierre", values: [12, 8] },
        { label: "Le Tampon", values: [9, 11] },
        { label: "Saint-Joseph", values: [7, 10] },
      ];
      const rowIndex = randomChoice([0, 1, 2]);
      const colIndex = randomChoice([0, 1]);
      const colLabel = colIndex === 0 ? "Bus" : "Voiture";

      return {
        text: `Dans le tableau, combien d’élèves de ${rows[rowIndex].label} viennent en ${colLabel.toLowerCase()} ?`,
        format: "short",
        expected: [String(rows[rowIndex].values[colIndex])],
        comparator: "number_equal",
        explanation:
          "Définition : prélever une donnée, c’est lire une information précise dans un document.\n\n" +
          "Méthode : on repère la ligne de la ville et la colonne du moyen de transport.\n\n" +
          `Observation : au croisement ${rows[rowIndex].label} / ${colLabel}, on lit ${rows[rowIndex].values[colIndex]}.\n\n` +
          `Conclusion : ${rows[rowIndex].values[colIndex]} élèves sont concernés.`,
        canvas: tableauDonneesCanvas({
          title: "Moyen de transport des élèves",
          headers: ["Bus", "Voiture"],
          rows,
          highlight: { cell: { row: rowIndex, col: colIndex } },
          caption: "Exemple de données locales à La Réunion.",
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_prelever_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_prelever",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi il faut lire le titre, les lignes et les colonnes avant de répondre à une question sur un tableau.",
    format: "open",
    expected: ["titre", "ligne", "colonne", "information", "erreur"],
    comparator: "contains_keyword",
    hint: "Explique comment éviter de lire la mauvaise donnée.",
    explanation:
      "Définition : un tableau donne des informations organisées.\n\n" +
      "Méthode : le titre indique le sujet, les lignes et colonnes indiquent où chercher.\n\n" +
      "Observation : si on se trompe de ligne ou de colonne, on lit une mauvaise valeur.\n\n" +
      "Conclusion : lire le titre, les lignes et les colonnes permet de répondre avec précision.",
    tags: ["stat_donnee", "prelever", "open", "verification"],
  },

  /* =========================
     DATA_COMPARER
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le tableau, quelle activité a été choisie par le plus d’élèves ?",
    format: "qcm",
    choices: ["Football", "Natation", "Danse", "Aucune"],
    expected: ["Football"],
    comparator: "mcq_exact",
    hint: "Compare les trois nombres.",
    explanation:
      "Définition : comparer des données, c’est regarder quelle valeur est plus grande, plus petite ou égale.\n\n" +
      "Méthode : on compare les effectifs de chaque activité.\n\n" +
      "Calcul : Football = 14, Natation = 10, Danse = 11. Le plus grand nombre est 14.\n\n" +
      "Conclusion : l’activité la plus choisie est le football.",
    tags: ["stat_donnee", "comparer", "tableau", "canvas"],
    canvas: tableauDonneesCanvas({
      title: "Activités choisies",
      headers: ["Nombre d’élèves"],
      rows: [
        { label: "Football", values: [14] },
        { label: "Natation", values: [10] },
        { label: "Danse", values: [11] },
      ],
      highlight: { row: 0 },
    }),
  },

  {
    kind: "template",
    id: "6e_stat_stat_stat_donnee_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la valeur la plus grande.",
    tags: ["stat_donnee", "comparer", "graphique", "template", "canvas"],
    generate: () => {
      const data = [
        { label: "A", value: randomChoice([6, 8, 10]) },
        { label: "B", value: randomChoice([11, 13, 15]) },
        { label: "C", value: randomChoice([5, 7, 9]) },
      ];
   const maxIndex = data.reduce(
    (bestIndex, item, index) =>
        item.value > data[bestIndex].value ? index : bestIndex,
    0
    );

    const max = data[maxIndex];

      return {
        text: "Quel groupe a obtenu le plus grand résultat ?",
        format: "qcm",
        choices: shuffle(data.map((d) => d.label)),
        expected: [max.label],
        comparator: "mcq_exact",
        explanation:
          "Définition : comparer des données permet d’identifier la valeur la plus grande ou la plus petite.\n\n" +
          "Méthode : on compare les valeurs des groupes A, B et C.\n\n" +
          `Calcul : la plus grande valeur est ${max.value}, pour le groupe ${max.label}.\n\n` +
          `Conclusion : le groupe ${max.label} a obtenu le plus grand résultat.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: { showLabels: true, showValues: true, highlightIndex: maxIndex },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_comparer_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment comparer plusieurs données dans un tableau ou un graphique.",
    format: "open",
    expected: ["valeurs", "plus grand", "plus petit", "comparer", "ligne"],
    comparator: "contains_keyword",
    hint: "Parle des valeurs et de ce qu’on cherche.",
    explanation:
      "Définition : comparer des données, c’est étudier les différences entre plusieurs valeurs.\n\n" +
      "Méthode : on repère les valeurs utiles puis on les compare.\n\n" +
      "Observation : on peut chercher la plus grande, la plus petite ou deux valeurs proches.\n\n" +
      "Conclusion : comparer demande de lire précisément les valeurs avant de conclure.",
    tags: ["stat_donnee", "comparer", "open", "methode"],
  },

  /* =========================
     DATA_INTERPRETER
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_interpreter_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ce graphique, quelle conclusion est correcte ?",
    format: "qcm",
    choices: [
      "Le sport est l’activité la plus choisie",
      "La lecture est l’activité la plus choisie",
      "Les jeux sont l’activité la moins choisie",
      "Toutes les activités ont le même nombre",
    ],
    expected: ["Le sport est l’activité la plus choisie"],
    comparator: "mcq_exact",
    hint: "Cherche le bâton le plus haut.",
    explanation:
      "Définition : interpréter des données, c’est donner du sens aux valeurs lues.\n\n" +
      "Méthode : on observe le graphique et on repère la valeur la plus grande.\n\n" +
      "Observation : le sport a la valeur la plus élevée.\n\n" +
      "Conclusion : le sport est l’activité la plus choisie.",
    tags: ["stat_donnee", "interpreter", "graphique", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Sport", value: 16 },
        { label: "Lecture", value: 9 },
        { label: "Jeux", value: 12 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 0 },
    }),
  },

  {
    kind: "template",
    id: "6e_stat_stat_stat_donnee_interpreter_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_interpreter",
    difficulty: 4,
    theme: "reunion",
    hint: "Une conclusion doit être justifiée par les données.",
    tags: ["stat_donnee", "interpreter", "reunion", "template", "canvas"],
    generate: () => {
      const data = [
        { label: "Plage", value: randomChoice([10, 12, 14]) },
        { label: "Volcan", value: randomChoice([15, 17, 19]) },
        { label: "Forêt", value: randomChoice([6, 8, 9]) },
      ];
        const maxIndex = data.reduce(
        (bestIndex, item, index) =>
            item.value > data[bestIndex].value ? index : bestIndex,
        0
        );

        const max = data[maxIndex];

      return {
        text: "Quelle conclusion peut-on tirer du graphique ?",
        format: "qcm",
        choices: shuffle([
          `${max.label} est le lieu préféré du groupe`,
          "Tous les lieux ont le même nombre de votes",
          "La forêt est forcément le lieu préféré",
          "On ne peut rien lire sur le graphique",
        ]),
        expected: [`${max.label} est le lieu préféré du groupe`],
        comparator: "mcq_exact",
        explanation:
          "Définition : interpréter, c’est utiliser les données pour formuler une conclusion.\n\n" +
          "Méthode : on cherche la valeur la plus grande dans le graphique.\n\n" +
          `Observation : ${max.label} obtient ${max.value} votes, c’est la plus grande valeur.\n\n` +
          `Conclusion : ${max.label} est le lieu préféré du groupe.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: { showLabels: true, showValues: true, highlightIndex: maxIndex },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_interpreter_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_interpreter",
    difficulty: 5,
    theme: "neutral",
    text: "Un camarade affirme une conclusion à partir d’un graphique. Que dois-tu vérifier avant d’être d’accord ?",
    format: "open",
    expected: ["titre", "valeurs", "légende", "comparer", "vérifier"],
    comparator: "contains_keyword",
    hint: "Ne te contente pas de l’impression visuelle.",
    explanation:
      "Définition : une conclusion doit être appuyée par des données exactes.\n\n" +
      "Méthode : on lit le titre, les catégories, les valeurs et la légende si elle existe.\n\n" +
      "Observation : une impression visuelle peut être trompeuse si on ne lit pas les valeurs.\n\n" +
      "Conclusion : il faut vérifier les données avant d’accepter une conclusion.",
    tags: ["stat_donnee", "interpreter", "open", "doute_raisonnable", "verification"],
  },

  /* =========================
     DATA_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_donnee_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un tableau indique : 8 élèves viennent à pied, 12 en bus et 5 en voiture. Combien d’élèves ont répondu au sondage ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "Additionne tous les effectifs.",
    explanation:
      "Définition : un effectif total est le nombre total de réponses ou d’individus.\n\n" +
      "Méthode : on additionne les effectifs de toutes les catégories.\n\n" +
      "Calcul : 8 + 12 + 5 = 25.\n\n" +
      "Conclusion : 25 élèves ont répondu au sondage.",
    tags: ["stat_donnee", "defi", "effectif_total"],
    canvas: tableauDonneesCanvas({
      title: "Transport pour venir au collège",
      headers: ["Nombre d’élèves"],
      rows: [
        { label: "À pied", values: [8] },
        { label: "Bus", values: [12] },
        { label: "Voiture", values: [5] },
      ],
      caption: "Sondage réalisé dans une classe.",
    }),
  },

  {
    kind: "template",
    id: "6e_stat_stat_donnee_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Commence par lire toutes les valeurs utiles.",
    tags: ["stat_donnee", "defi", "total", "template", "canvas"],
    generate: () => {
      const a = randomChoice([6, 8, 10]);
      const b = randomChoice([7, 9, 11]);
      const c = randomChoice([5, 12, 13]);
      const total = a + b + c;

      return {
        text: "Combien de réponses ont été recueillies au total ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : le total correspond à la somme de toutes les valeurs du tableau.\n\n" +
          "Méthode : on lit les trois effectifs puis on les additionne.\n\n" +
          `Calcul : ${a} + ${b} + ${c} = ${total}.\n\n` +
          `Conclusion : ${total} réponses ont été recueillies au total.`,
        canvas: tableauDonneesCanvas({
          title: "Réponses à une enquête",
          headers: ["Effectif"],
          rows: [
            { label: "Réponse A", values: [a] },
            { label: "Réponse B", values: [b] },
            { label: "Réponse C", values: [c] },
          ],
          questionLabel: "Cherche le total des réponses.",
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_donnee_defi_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi les données doivent être organisées clairement dans un tableau ou un graphique.",
    format: "open",
    expected: ["lire", "comparer", "comprendre", "erreur", "organiser"],
    comparator: "contains_keyword",
    hint: "Pense à la lecture, à la comparaison et aux erreurs possibles.",
    explanation:
      "Définition : organiser des données, c’est les présenter de manière claire.\n\n" +
      "Méthode : on utilise un tableau ou un graphique pour faciliter la lecture.\n\n" +
      "Observation : une bonne organisation permet de comparer et limite les erreurs.\n\n" +
      "Conclusion : organiser les données aide à comprendre et à raisonner correctement.",
    tags: ["stat_donnee", "defi", "open", "raisonnement", "langage"],
  },
    /* =========================
     RENFORT — ERREURS ET RAISONNEMENT
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_lire_tableau_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève répond sans lire le titre du tableau. Pourquoi est-ce risqué ?",
    format: "open",
    expected: ["titre", "comprendre", "données", "erreur", "contexte"],
    comparator: "contains_keyword",
    hint: "Le titre explique ce que représentent les données.",
    explanation:
      "Définition : le titre d’un tableau indique le sujet des données.\n\n" +
      "Méthode : avant de lire une valeur, on lit le titre, les lignes et les colonnes.\n\n" +
      "Observation : sans le titre, on peut mal comprendre ce que représentent les nombres.\n\n" +
      "Conclusion : lire le titre évite les erreurs d’interprétation.",
    tags: ["stat_donnee", "tableau", "open", "erreur", "langage"],
  },

  {
    kind: "template",
    id: "6e_stat_stat_stat_donnee_prelever_tpl_2_cellule_surlignee",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_prelever",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la cellule surlignée.",
    tags: ["stat_donnee", "prelever", "cellule", "template", "canvas"],
    generate: () => {
      const rows = [
        { label: "6A", values: [12, 8] },
        { label: "6B", values: [9, 11] },
        { label: "6C", values: [14, 6] },
      ];

      const rowIndex = randomChoice([0, 1, 2]);
      const colIndex = randomChoice([0, 1]);

      return {
        text: "Quelle valeur est surlignée dans le tableau ?",
        format: "short",
        expected: [String(rows[rowIndex].values[colIndex])],
        comparator: "number_equal",
        explanation:
          "Définition : prélever une donnée, c’est lire une valeur précise.\n\n" +
          "Méthode : on repère la cellule surlignée.\n\n" +
          `Observation : la cellule surlignée contient ${rows[rowIndex].values[colIndex]}.\n\n` +
          `Conclusion : la valeur demandée est ${rows[rowIndex].values[colIndex]}.`,
        canvas: tableauDonneesCanvas({
          title: "Résultats d’un sondage",
          headers: ["Oui", "Non"],
          rows,
          highlight: { cell: { row: rowIndex, col: colIndex } },
          caption: "La cellule jaune indique la donnée à lire.",
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_comparer_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « 15 est plus petit que 9 parce que le bâton paraît plus bas ». Que doit-il vérifier ?",
    format: "open",
    expected: ["valeur", "échelle", "graphique", "lire", "vérifier"],
    comparator: "contains_keyword",
    hint: "Il faut lire les valeurs et l’échelle.",
    explanation:
      "Définition : comparer des données demande de lire les valeurs exactes.\n\n" +
      "Méthode : on vérifie les nombres indiqués et l’échelle du graphique.\n\n" +
      "Observation : l’impression visuelle peut être trompeuse si on ne lit pas correctement.\n\n" +
      "Conclusion : il faut lire les valeurs avant de comparer.",
    tags: ["stat_donnee", "comparer", "open", "erreur", "verification"],
  },

  {
    kind: "template",
    id: "6e_stat_stat_stat_donnee_comparer_tpl_2_difference",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule la différence entre les deux valeurs.",
    tags: ["stat_donnee", "comparer", "difference", "template", "canvas"],
    generate: () => {
      const a = randomChoice([12, 14, 16, 18]);
      const b = randomChoice([5, 7, 9, 10]);
      const diff = a - b;

      return {
        text: "Combien y a-t-il de réponses de plus pour A que pour B ?",
        format: "short",
        expected: [String(diff)],
        comparator: "number_equal",
        explanation:
          "Définition : comparer deux données peut consister à calculer leur différence.\n\n" +
          "Méthode : on soustrait la plus petite valeur à la plus grande.\n\n" +
          `Calcul : ${a} - ${b} = ${diff}.\n\n` +
          `Conclusion : il y a ${diff} réponses de plus pour A que pour B.`,
        canvas: tableauDonneesCanvas({
          title: "Réponses recueillies",
          headers: ["Effectif"],
          rows: [
            { label: "Réponse A", values: [a] },
            { label: "Réponse B", values: [b] },
          ],
          highlight: { col: 0 },
          questionLabel: "Compare les deux effectifs.",
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_interpreter_open_2_conclusion_justifiee",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_interpreter",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi une conclusion doit être justifiée par une donnée du tableau ou du graphique.",
    format: "open",
    expected: ["donnée", "valeur", "preuve", "justifier", "conclusion"],
    comparator: "contains_keyword",
    hint: "Une conclusion doit s’appuyer sur une valeur lue.",
    explanation:
      "Définition : interpréter des données, c’est formuler une conclusion à partir de valeurs observées.\n\n" +
      "Méthode : on cite une donnée précise pour justifier la conclusion.\n\n" +
      "Observation : sans valeur, la conclusion peut être une simple impression.\n\n" +
      "Conclusion : une bonne conclusion doit être justifiée par une donnée.",
    tags: ["stat_donnee", "interpreter", "open", "justification", "raisonnement"],
  },

  {
    kind: "template",
    id: "6e_stat_stat_donnee_defi_tpl_2_double_entree_total_ligne",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Additionne les valeurs de la ligne demandée.",
    tags: ["stat_donnee", "defi", "tableau_double_entree", "total", "template", "canvas"],
    generate: () => {
      const rows = [
        { label: "Basket", values: [7, 8] },
        { label: "Natation", values: [6, 5] },
        { label: "Danse", values: [9, 4] },
      ];

      const rowIndex = randomChoice([0, 1, 2]);
      const total = rows[rowIndex].values[0] + rows[rowIndex].values[1];

      return {
        text: `Combien d’élèves ont choisi ${rows[rowIndex].label.toLowerCase()} au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : le total d’une ligne est la somme des valeurs de cette ligne.\n\n" +
          "Méthode : on lit les deux valeurs de la ligne demandée, puis on les additionne.\n\n" +
          `Calcul : ${rows[rowIndex].values[0]} + ${rows[rowIndex].values[1]} = ${total}.\n\n` +
          `Conclusion : ${total} élèves ont choisi ${rows[rowIndex].label.toLowerCase()}.`,
        canvas: tableauDonneesCanvas({
          title: "Activités choisies",
          headers: ["Filles", "Garçons"],
          rows,
          highlight: { row: rowIndex },
          caption: "Pour trouver un total de ligne, on additionne les colonnes.",
        }),
      };
    },
  },
    /* =========================
     RENFORT FINAL — DONNÉES 6e
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_lire_tableau_open_2_ligne_colonne",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre une ligne et une colonne dans un tableau.",
    format: "open",
    expected: ["ligne", "horizontale", "colonne", "verticale", "tableau"],
    comparator: "contains_keyword",
    hint: "Une ligne se lit souvent de gauche à droite ; une colonne de haut en bas.",
    explanation:
      "Définition : un tableau organise les données en lignes et en colonnes.\n\n" +
      "Méthode : on repère le sens de lecture.\n\n" +
      "Observation : une ligne est horizontale, une colonne est verticale.\n\n" +
      "Conclusion : distinguer ligne et colonne évite de lire la mauvaise donnée.",
    tags: ["stat_donnee", "tableau", "open", "vocabulaire"],
  },

  {
    kind: "template",
    id: "6e_stat_stat_stat_donnee_lire_tableau_tpl_2_total_colonne",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les valeurs de la colonne.",
    tags: ["stat_donnee", "tableau", "total", "template", "canvas"],
    generate: () => {
      const a = randomChoice([5, 6, 7, 8]);
      const b = randomChoice([9, 10, 11]);
      const c = randomChoice([3, 4, 5, 6]);
      const total = a + b + c;

      return {
        text: "Quel est le total des effectifs du tableau ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : le total est la somme de toutes les valeurs utiles.\n\n" +
          "Méthode : on lit les effectifs puis on les additionne.\n\n" +
          `Calcul : ${a} + ${b} + ${c} = ${total}.\n\n` +
          `Conclusion : le total est ${total}.`,
        canvas: tableauDonneesCanvas({
          title: "Effectifs par atelier",
          headers: ["Effectif"],
          rows: [
            { label: "Atelier A", values: [a] },
            { label: "Atelier B", values: [b] },
            { label: "Atelier C", values: [c] },
          ],
          highlight: { col: 0 },
          questionLabel: "Additionne les effectifs.",
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_lire_graphique_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_graphique",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève regarde seulement le bâton le plus haut sans lire les valeurs. Pourquoi peut-il se tromper ?",
    format: "open",
    expected: ["valeurs", "échelle", "graphique", "lire", "vérifier"],
    comparator: "contains_keyword",
    hint: "Il faut lire les nombres, pas seulement regarder la forme.",
    explanation:
      "Définition : lire un graphique demande de relier une catégorie à une valeur.\n\n" +
      "Méthode : on observe le graphique, mais on lit aussi les valeurs ou l’échelle.\n\n" +
      "Observation : l’impression visuelle peut être trompeuse.\n\n" +
      "Conclusion : il faut vérifier les valeurs avant de conclure.",
    tags: ["stat_donnee", "graphique", "open", "erreur", "verification"],
  },

  {
    kind: "template",
    id: "6e_stat_stat_stat_donnee_lire_graphique_tpl_2_plus_petit",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le bâton le plus bas.",
    tags: ["stat_donnee", "graphique", "minimum", "template", "canvas"],
    generate: () => {
      const data = [
        { label: "A", value: randomChoice([12, 14, 16]) },
        { label: "B", value: randomChoice([5, 6, 7]) },
        { label: "C", value: randomChoice([9, 10, 11]) },
      ];

      const minIndex = data.reduce(
        (bestIndex, item, index) =>
          item.value < data[bestIndex].value ? index : bestIndex,
        0
      );

      const min = data[minIndex];

      return {
        text: "Quel groupe a la plus petite valeur ?",
        format: "qcm",
        choices: shuffle(data.map((d) => d.label)),
        expected: [min.label],
        comparator: "mcq_exact",
        explanation:
          "Définition : comparer un graphique permet de repérer la plus petite valeur.\n\n" +
          "Méthode : on compare les hauteurs ou les valeurs indiquées.\n\n" +
          `Observation : la plus petite valeur est ${min.value}, pour le groupe ${min.label}.\n\n` +
          `Conclusion : le groupe ${min.label} a la plus petite valeur.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: minIndex,
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_prelever_erreur_2_double_entree",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_prelever",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un tableau à deux entrées, un élève lit la bonne ligne mais la mauvaise colonne. Sa réponse peut-elle être correcte ?",
    format: "qcm",
    choices: ["oui, toujours", "non, pas forcément"],
    expected: ["non, pas forcément"],
    comparator: "mcq_exact",
    hint: "Il faut lire la ligne ET la colonne.",
    explanation:
      "Définition : dans un tableau à deux entrées, une donnée se lit au croisement d’une ligne et d’une colonne.\n\n" +
      "Méthode : on doit repérer les deux informations.\n\n" +
      "Observation : si la colonne est mauvaise, la valeur lue peut être fausse.\n\n" +
      "Conclusion : il faut vérifier la ligne et la colonne.",
    tags: ["stat_donnee", "prelever", "tableau_double_entree", "erreur"],
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_prelever_open_2_double_entree",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_prelever",
    difficulty: 4,
    theme: "neutral",
    text: "Décris la méthode pour lire une donnée dans un tableau à deux entrées.",
    format: "open",
    expected: ["ligne", "colonne", "croisement", "valeur", "tableau"],
    comparator: "contains_keyword",
    hint: "La donnée se trouve au croisement.",
    explanation:
      "Définition : un tableau à deux entrées organise les données selon deux critères.\n\n" +
      "Méthode : on repère la bonne ligne, puis la bonne colonne.\n\n" +
      "Observation : la donnée cherchée est au croisement des deux.\n\n" +
      "Conclusion : lire un tableau à deux entrées demande de vérifier ligne et colonne.",
    tags: ["stat_donnee", "prelever", "open", "methode"],
  },

  {
    kind: "template",
    id: "6e_stat_stat_stat_donnee_comparer_tpl_3_ecart_graphique",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "L’écart se calcule avec une soustraction.",
    tags: ["stat_donnee", "comparer", "ecart", "template", "canvas"],
    generate: () => {
      const a = randomChoice([18, 20, 22]);
      const b = randomChoice([9, 11, 13]);
      const c = randomChoice([14, 15, 16]);
      const diff = a - b;

      return {
        text: "Quel est l’écart entre la plus grande et la plus petite valeur ?",
        format: "short",
        expected: [String(diff)],
        comparator: "number_equal",
        explanation:
          "Définition : l’écart entre deux valeurs est leur différence.\n\n" +
          "Méthode : on repère la plus grande valeur et la plus petite valeur.\n\n" +
          `Calcul : ${a} - ${b} = ${diff}.\n\n` +
          `Conclusion : l’écart est ${diff}.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data: [
            { label: "A", value: a },
            { label: "B", value: b },
            { label: "C", value: c },
          ],
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
    id: "6e_stat_stat_stat_donnee_interpreter_erreur_1_conclusion_abusive",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_interpreter",
    difficulty: 5,
    theme: "neutral",
    text: "Un graphique montre que 12 élèves préfèrent le sport dans une classe. Un élève conclut : “Tous les élèves du collège préfèrent le sport.” Pourquoi cette conclusion est-elle abusive ?",
    format: "open",
    expected: ["classe", "collège", "données", "échantillon", "conclusion"],
    comparator: "contains_keyword",
    hint: "Les données ne concernent qu’une classe.",
    explanation:
      "Définition : une conclusion doit rester liée aux données étudiées.\n\n" +
      "Méthode : on vérifie sur quel groupe porte l’enquête.\n\n" +
      "Observation : les données concernent une classe, pas tout le collège.\n\n" +
      "Conclusion : on ne peut pas généraliser à tout le collège.",
    tags: ["stat_donnee", "interpreter", "open", "conclusion", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_interpreter_open_3_hypothese",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_interpreter",
    difficulty: 5,
    theme: "neutral",
    text: "À partir d’un tableau de données, explique la différence entre observer une donnée et faire une hypothèse.",
    format: "open",
    expected: ["observer", "donnée", "valeur", "hypothèse", "supposer"],
    comparator: "contains_keyword",
    hint: "Observer, c’est lire ce qui est écrit ; faire une hypothèse, c’est proposer une idée à vérifier.",
    explanation:
      "Définition : observer une donnée, c’est lire une valeur présente dans le tableau.\n\n" +
      "Méthode : une hypothèse est une idée que l’on propose et qu’il faudra vérifier.\n\n" +
      "Observation : une donnée est certaine dans le document, une hypothèse demande une vérification.\n\n" +
      "Conclusion : il faut distinguer ce qui est lu et ce qui est supposé.",
    tags: ["stat_donnee", "interpreter", "open", "hypothese", "scientifique"],
  },

  {
    kind: "template",
    id: "6e_stat_stat_donnee_defi_tpl_3_deux_variables_total_colonne",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Additionne les valeurs de la colonne demandée.",
    tags: ["stat_donnee", "defi", "tableau_double_entree", "total_colonne", "template", "canvas"],
    generate: () => {
      const rows = [
        { label: "6A", values: [6, 8] },
        { label: "6B", values: [7, 5] },
        { label: "6C", values: [4, 9] },
      ];

      const colIndex = randomChoice([0, 1]);
      const headers = ["Demi-pension", "Externe"];
      const total =
        rows[0].values[colIndex] +
        rows[1].values[colIndex] +
        rows[2].values[colIndex];

      return {
        text: `Combien y a-t-il d’élèves dans la colonne ${headers[colIndex]} au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : le total d’une colonne est la somme des valeurs de cette colonne.\n\n" +
          "Méthode : on lit les valeurs de la colonne demandée, puis on les additionne.\n\n" +
          `Calcul : ${rows[0].values[colIndex]} + ${rows[1].values[colIndex]} + ${rows[2].values[colIndex]} = ${total}.\n\n` +
          `Conclusion : le total de la colonne ${headers[colIndex]} est ${total}.`,
        canvas: tableauDonneesCanvas({
          title: "Organisation des élèves",
          headers,
          rows,
          highlight: { col: colIndex },
          caption: "On additionne uniquement les valeurs de la colonne surlignée.",
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_donnee_defi_open_2_demarche_scientifique",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Décris une démarche simple pour répondre sérieusement à une question à partir de données.",
    format: "open",
    expected: ["lire", "repérer", "comparer", "calculer", "conclure"],
    comparator: "contains_keyword",
    hint: "Pense aux étapes : lire, chercher, vérifier, conclure.",
    explanation:
      "Définition : une démarche sérieuse s’appuie sur des données vérifiées.\n\n" +
      "Méthode : on lit le document, on repère les valeurs utiles, puis on compare ou on calcule.\n\n" +
      "Observation : on vérifie que la réponse correspond bien à la question.\n\n" +
      "Conclusion : on peut alors formuler une conclusion claire et justifiée.",
    tags: ["stat_donnee", "defi", "open", "demarche_scientifique"],
  },
];