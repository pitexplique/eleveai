// lib/tutor-v4/question-banks/maths/4e/statistiques.bank.ts

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
  const rounded = Math.round(n * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(".", ",");
}

function statGraphCanvas(
  params: Omit<StatGraphCanvasData, "kind">
): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    ...params,
  };
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function mediane(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;

  if (n % 2 === 1) return sorted[Math.floor(n / 2)];

  return (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
}

function moyenne(values: number[]) {
  return values.reduce((s, v) => s + v, 0) / values.length;
}

function etendue(values: number[]) {
  return Math.max(...values) - Math.min(...values);
}

export const statistiquesBank: TutorBankItemV4[] = [
  /* =========================
     STAT_LIRE_TABLEAU
  ========================= */

  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau statistique, que représente l’effectif ?",
    format: "qcm",
    choices: [
      "le nombre d’individus correspondant à une valeur",
      "la plus grande valeur de la série",
      "la différence entre deux valeurs",
      "la moyenne des valeurs",
    ],
    expected: ["le nombre d’individus correspondant à une valeur"],
    comparator: "mcq_exact",
    hint: "L’effectif répond à la question : combien ?",
    explanation:
      "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("L’effectif indique combien d’individus correspondent à une valeur ou à une catégorie.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "tableau", "effectif", "definition"],
  },

  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau, on lit : vélo : 12 élèves. Que signifie 12 ?",
    format: "qcm",
    choices: [
      "12 élèves ont choisi vélo",
      "la moyenne est 12",
      "il y a 12 activités",
      "le vélo coûte 12 €",
    ],
    expected: ["12 élèves ont choisi vélo"],
    comparator: "mcq_exact",
    hint: "Le nombre est placé en face de la catégorie vélo.",
    explanation:
      "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Le nombre 12 est l’effectif de la catégorie vélo : 12 élèves ont choisi vélo.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "tableau", "lecture"],
  },

  {
    kind: "template",
    id: "stat_lire_tableau_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    hint: "Lis directement l’information demandée.",
    tags: ["stat_statistique", "tableau", "lecture", "template"],
    generate: () => {
      const labels = ["football", "natation", "danse", "basket"];
      const values = labels.map(() => randomInt(6, 24));
      const i = randomInt(0, labels.length - 1);

      return {
        text: `Dans un tableau, on lit : football : ${values[0]}, natation : ${values[1]}, danse : ${values[2]}, basket : ${values[3]}. Quel est l’effectif pour ${labels[i]} ?`,
        format: "short",
        expected: [String(values[i])],
        comparator: "number_equal",
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`On lit directement la ligne ou la colonne correspondant à ${labels[i]} : l’effectif est ${values[i]}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
      };
    },
  },

  {
    kind: "template",
    id: "stat_lire_tableau_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "reunion",
    hint: "Repère la catégorie demandée puis lis son effectif.",
    tags: ["stat_statistique", "tableau", "reunion", "template"],
    generate: () => {
      const labels = ["Saint-Pierre", "Saint-Leu", "Le Tampon", "Entre-Deux"];
      const values = labels.map(() => randomInt(10, 40));
      const i = randomInt(0, labels.length - 1);

      return {
        text: `Lors d’un sondage à La Réunion, on obtient : Saint-Pierre : ${values[0]}, Saint-Leu : ${values[1]}, Le Tampon : ${values[2]}, Entre-Deux : ${values[3]}. Quel est l’effectif pour ${labels[i]} ?`,
        format: "short",
        expected: [String(values[i])],
        comparator: "number_equal",
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`Pour ${labels[i]}, le tableau indique ${values[i]}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
      };
    },
  },

  {
    kind: "fixed",
    id: "stat_lire_tableau_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce que signifie : « marche : 18 élèves » dans un tableau statistique.",
    format: "open",
    expected: ["marche", "18", "élèves"],
    comparator: "contains_keyword",
    hint: "Il faut dire quelle catégorie est concernée et combien d’élèves sont concernés.",
    explanation:
      "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Cela signifie que 18 élèves appartiennent à la catégorie « marche », par exemple qu’ils ont choisi cette activité.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "tableau", "open"],
  },

  /* =========================
     STAT_LIRE_GRAPHIQUE
  ========================= */

  {
    kind: "fixed",
    id: "stat_lire_graphique_fixed_1",
    niveau: "4e",
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
      "toujours une moyenne",
      "toujours une médiane",
    ],
    expected: ["la valeur ou l’effectif de la catégorie"],
    comparator: "mcq_exact",
    hint: "Plus la barre est haute, plus la valeur est grande.",
    explanation:
      "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("La hauteur d’une barre représente la valeur ou l’effectif associé à une catégorie.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "graphique", "barres"],
  },

  {
    kind: "template",
    id: "stat_lire_graphique_tpl_1_barres",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la hauteur de la barre demandée.",
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
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`La barre ${data[i].label} indique la valeur ${data[i].value}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
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
    id: "stat_lire_graphique_tpl_2_batons",
    niveau: "4e",
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
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`Le bâton au-dessus de ${data[i].label} monte jusqu’à ${data[i].value}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
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
    id: "stat_lire_graphique_tpl_3_max",
    niveau: "4e",
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
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`${correct} correspond à la barre la plus haute : ${max}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
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
    id: "stat_lire_graphique_open_1",
    niveau: "4e",
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
      "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("On repère la catégorie demandée, puis on lit la hauteur de sa barre pour obtenir la valeur ou l’effectif.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "graphique", "open"],
  },
    /* =========================
     STAT_EFFECTIF
  ========================= */

  {
    kind: "fixed",
    id: "stat_effectif_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif",
    difficulty: 1,
    theme: "neutral",
    text: "Un tableau indique : filles : 14, garçons : 11. Quel est l’effectif total ?",
    format: "qcm",
    choices: ["14", "11", "25", "154"],
    expected: ["25"],
    comparator: "mcq_exact",
    hint: "Additionne les effectifs.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("L’effectif total vaut 14 + 11 = 25.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "effectif", "total"],
  },

  {
    kind: "template",
    id: "stat_effectif_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne tous les effectifs.",
    tags: ["stat_statistique", "effectif", "template"],
    generate: () => {
      const a = randomInt(5, 18);
      const b = randomInt(5, 18);
      const c = randomInt(5, 18);
      const total = a + b + c;

      return {
        text: `Dans une enquête, on compte ${a} réponses A, ${b} réponses B et ${c} réponses C. Quel est l’effectif total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`Effectif total = ${a} + ${b} + ${c} = ${total}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
      };
    },
  },

  {
    kind: "template",
    id: "stat_effectif_tpl_2_graphique",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne toutes les valeurs du graphique.",
    tags: ["stat_statistique", "effectif", "graphique", "canvas"],
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
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`On additionne : ${data.map((d) => d.value).join(" + ")} = ${total}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
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
    id: "stat_effectif_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver l’effectif total dans une série statistique.",
    format: "open",
    expected: ["additionne", "effectifs", "total"],
    comparator: "contains_keyword",
    hint: "On regroupe toutes les catégories.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Pour trouver l’effectif total, on additionne tous les effectifs des catégories.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "effectif", "open"],
  },

  /* =========================
     STAT_FREQUENCE
  ========================= */

  {
    kind: "fixed",
    id: "stat_frequence_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une classe de 25 élèves, 10 pratiquent un sport. Quelle est la fréquence sous forme décimale ?",
    format: "qcm",
    choices: ["0,4", "0,25", "2,5", "10"],
    expected: ["0,4"],
    comparator: "mcq_exact",
    hint: "Fréquence = effectif ÷ effectif total.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("La fréquence vaut 10 ÷ 25 = 0,4.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "frequence", "qcm"],
  },

  {
    kind: "template",
    id: "stat_frequence_tpl_1_decimal",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence = effectif de la catégorie ÷ effectif total.",
    tags: ["stat_statistique", "frequence", "decimal", "template"],
    generate: () => {
      const total = randomChoice([20, 25, 40, 50]);
      const effectif = randomChoice([total / 2, total / 4, total / 5]);
      const freq = effectif / total;

      return {
        text: `Dans un groupe de ${total} élèves, ${effectif} élèves ont choisi théâtre. Quelle est la fréquence ?`,
        format: "short",
        expected: [String(freq), String(freq).replace(".", ",")],
        comparator: "number_equal",
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`Fréquence = ${effectif} ÷ ${total} = ${formatNumber(freq)}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
      };
    },
  },

  {
    kind: "template",
    id: "stat_frequence_tpl_2_pourcentage",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie la fréquence décimale par 100.",
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
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`Fréquence = ${effectif} ÷ ${total} = ${formatNumber(effectif / total)}, soit ${pourcentage} %.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
      };
    },
  },

  {
    kind: "template",
    id: "stat_frequence_tpl_3_graphique",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_frequence",
    difficulty: 4,
    theme: "neutral",
    hint: "Lis l’effectif de la catégorie puis divise par le total.",
    tags: ["stat_statistique", "frequence", "graphique", "canvas"],
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
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`Effectif total = ${total}. Fréquence de ${data[i].label} = ${data[i].value} ÷ ${total} = ${formatNumber(freq)}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: { showLabels: true, showValues: true, highlightIndex: i },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "stat_frequence_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_frequence",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment calculer une fréquence à partir d’un effectif et d’un effectif total.",
    format: "open",
    expected: ["effectif", "total", "divise"],
    comparator: "contains_keyword",
    hint: "C’est un quotient.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("On divise l’effectif de la catégorie par l’effectif total.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "frequence", "open"],
  },

  /* =========================
     STAT_MOYENNE
  ========================= */

  {
    kind: "fixed",
    id: "stat_moyenne_fixed_1",
    niveau: "4e",
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
    hint: "Additionne puis divise par le nombre de valeurs.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Moyenne = (8 + 10 + 12) ÷ 3 = 30 ÷ 3 = 10.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "moyenne", "qcm"],
  },

  {
    kind: "fixed",
    id: "stat_moyenne_fixed_2_piege",
    niveau: "4e",
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
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("La somme est 30, mais il faut diviser par 3. La moyenne vaut 10.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "moyenne", "erreur"],
  },

  {
    kind: "template",
    id: "stat_moyenne_tpl_1_liste",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les valeurs puis divise par leur nombre.",
    tags: ["stat_statistique", "moyenne", "template"],
    generate: () => {
      const values = [randomInt(6, 16), randomInt(6, 16), randomInt(6, 16), randomInt(6, 16)];
      const avg = moyenne(values);

      return {
        text: `Calculer la moyenne de la série : ${values.join(" ; ")}.`,
        format: "short",
        expected: [formatNumber(avg)],
        comparator: "number_equal",
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`Moyenne = (${values.join(" + ")}) ÷ ${values.length} = ${formatNumber(avg)}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
      };
    },
  },

  {
    kind: "template",
    id: "stat_moyenne_tpl_2_effectifs",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention, chaque valeur peut apparaître plusieurs fois.",
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
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`Moyenne = (${v1} × ${e1} + ${v2} × ${e2}) ÷ ${total} = ${formatNumber(avg)}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
      };
    },
  },

  {
    kind: "template",
    id: "stat_moyenne_tpl_3_retrouver_valeur",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise somme totale = moyenne × nombre de valeurs.",
    tags: ["stat_statistique", "moyenne", "valeur_manquante", "template"],
    generate: () => {
      const a = randomInt(8, 14);
      const b = randomInt(8, 14);
      const c = randomInt(8, 14);
      const target = randomInt(10, 14);
      const x = target * 4 - (a + b + c);

      return {
        text: `La moyenne de ${a}, ${b}, ${c} et x est ${target}. Quelle est la valeur de x ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`La somme totale doit être ${target} × 4 = ${target * 4}. Donc x = ${target * 4} - (${a} + ${b} + ${c}) = ${x}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
      };
    },
  },

  {
    kind: "fixed",
    id: "stat_moyenne_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi la moyenne n’est pas toujours une valeur de la série.",
    format: "open",
    expected: ["somme", "divise", "valeurs"],
    comparator: "contains_keyword",
    hint: "La moyenne est un calcul, pas forcément une valeur observée.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("La moyenne est obtenue en additionnant les valeurs puis en divisant par leur nombre. Elle peut donc ne pas apparaître dans la série.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "moyenne", "open"],
  },
    /* =========================
     STAT_MEDIANE
  ========================= */

  {
    kind: "fixed",
    id: "stat_mediane_fixed_1",
    niveau: "4e",
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
    hint: "La médiane est la valeur centrale.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Il y a 5 valeurs. La valeur centrale est la 3e : 9.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "mediane", "qcm"],
  },

  {
    kind: "fixed",
    id: "stat_mediane_fixed_2_pair",
    niveau: "4e",
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
    hint: "Avec 4 valeurs, on prend la moyenne des deux valeurs centrales.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Les deux valeurs centrales sont 8 et 10. Médiane = (8 + 10) ÷ 2 = 9.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "mediane", "pair"],
  },

  {
    kind: "template",
    id: "stat_mediane_tpl_1_impair",
    niveau: "4e",
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
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`On range la série : ${sorted.join(" ; ")}. La valeur centrale est ${med}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
      };
    },
  },

  {
    kind: "template",
    id: "stat_mediane_tpl_2_pair",
    niveau: "4e",
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
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`On range la série : ${sorted.join(" ; ")}. Les deux valeurs centrales sont ${sorted[1]} et ${sorted[2]}. Médiane = (${sorted[1]} + ${sorted[2]}) ÷ 2 = ${formatNumber(med)}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
      };
    },
  },

  {
    kind: "fixed",
    id: "stat_mediane_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi il faut d’abord ranger une série avant de déterminer sa médiane.",
    format: "open",
    expected: ["ranger", "ordre", "centrale"],
    comparator: "contains_keyword",
    hint: "La médiane dépend de la position centrale.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Il faut ranger la série dans l’ordre croissant pour identifier correctement la ou les valeurs centrales.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "mediane", "open"],
  },

  /* =========================
     STAT_ETENDUE
  ========================= */

  {
    kind: "fixed",
    id: "stat_etendue_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’étendue de la série : 4 ; 7 ; 10 ; 15 ?",
    format: "qcm",
    choices: ["4", "7", "11", "15"],
    expected: ["11"],
    comparator: "mcq_exact",
    hint: "Étendue = maximum - minimum.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Maximum = 15, minimum = 4. Étendue = 15 - 4 = 11.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "etendue", "qcm"],
  },

  {
    kind: "template",
    id: "stat_etendue_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère la plus petite et la plus grande valeur.",
    tags: ["stat_statistique", "etendue", "template"],
    generate: () => {
      const min = randomInt(2, 8);
      const max = randomInt(18, 32);
      const values = shuffle([min, randomInt(9, 14), randomInt(15, 17), max]);
      const result = max - min;

      return {
        text: `Calculer l’étendue de la série : ${values.join(" ; ")}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`Minimum = ${min}, maximum = ${max}. Étendue = ${max} - ${min} = ${result}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
      };
    },
  },

  {
    kind: "template",
    id: "stat_etendue_tpl_2_graphique",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "neutral",
    hint: "L’étendue se calcule avec la plus grande et la plus petite valeur.",
    tags: ["stat_statistique", "etendue", "graphique", "canvas"],
    generate: () => {
      const data = [
        { label: "A", value: randomInt(4, 9) },
        { label: "B", value: randomInt(10, 16) },
        { label: "C", value: randomInt(17, 25) },
      ];
      const values = data.map((d) => d.value);
      const result = etendue(values);

      return {
        text: "D’après le graphique, quelle est l’étendue des valeurs ?",
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`Maximum = ${Math.max(...values)}, minimum = ${Math.min(...values)}. Étendue = ${result}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
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
    id: "stat_etendue_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce que mesure l’étendue d’une série statistique.",
    format: "open",
    expected: ["maximum", "minimum", "écart"],
    comparator: "contains_keyword",
    hint: "L’étendue compare les extrêmes.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("L’étendue mesure l’écart entre la plus grande valeur et la plus petite valeur de la série.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "etendue", "open"],
  },

  /* =========================
     STAT_INTERPRETATION
  ========================= */

  {
    kind: "fixed",
    id: "stat_interpreter_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Deux séries ont la même moyenne, mais l’une a une étendue plus grande. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "ses valeurs sont plus dispersées",
      "sa moyenne est forcément plus grande",
      "sa médiane est forcément nulle",
      "son effectif est forcément plus petit",
    ],
    expected: ["ses valeurs sont plus dispersées"],
    comparator: "mcq_exact",
    hint: "L’étendue mesure la dispersion entre les extrêmes.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Une étendue plus grande indique des valeurs plus dispersées.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "interpretation", "etendue"],
  },

  {
    kind: "fixed",
    id: "stat_interpreter_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "La moyenne d’un groupe est 12. Cela signifie forcément que chaque élève a eu 12 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La moyenne résume le groupe, elle ne donne pas chaque valeur.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Non. Une moyenne de 12 peut venir de notes différentes, par exemple 10 et 14.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "interpretation", "moyenne", "piege"],
  },

  {
    kind: "template",
    id: "stat_interpreter_tpl_1_moyenne_etendue",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare surtout l’étendue pour juger la dispersion.",
    tags: ["stat_statistique", "interpretation", "template"],
    generate: () => {
      const moyenneCommune = randomChoice([10, 11, 12, 13]);
      const etendueA = randomChoice([4, 5, 6]);
      const etendueB = randomChoice([10, 12, 14]);

      return {
        text: `Deux groupes ont la même moyenne : ${moyenneCommune}. Le groupe A a une étendue de ${etendueA}, le groupe B une étendue de ${etendueB}. Quel groupe est le plus dispersé ?`,
        format: "qcm",
        choices: ["groupe A", "groupe B"],
        expected: ["groupe B"],
        comparator: "mcq_exact",
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`Le groupe B a l’étendue la plus grande (${etendueB}), donc ses valeurs sont plus dispersées.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
      };
    },
  },

  {
    kind: "fixed",
    id: "stat_interpreter_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre moyenne, médiane et étendue.",
    format: "open",
    expected: ["moyenne", "médiane", "étendue"],
    comparator: "contains_keyword",
    hint: "La moyenne résume, la médiane coupe la série, l’étendue mesure l’écart.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("La moyenne est un équilibre calculé, la médiane est la valeur centrale d’une série rangée, et l’étendue est l’écart entre le maximum et le minimum.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "interpretation", "open"],
  },

  /* =========================
     STAT_PROBLEME
  ========================= */

  {
    kind: "template",
    id: "stat_probleme_tpl_1_reunion",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule la moyenne des températures.",
    tags: ["stat_statistique", "probleme", "reunion", "moyenne"],
    generate: () => {
      const values = [
        randomInt(22, 26),
        randomInt(23, 27),
        randomInt(24, 28),
        randomInt(25, 29),
      ];
      const avg = moyenne(values);

      return {
        text: `À La Réunion, on relève les températures suivantes sur 4 jours : ${values.join(" °C ; ")} °C. Quelle est la température moyenne ?`,
        format: "short",
        expected: [formatNumber(avg)],
        comparator: "number_equal",
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`Moyenne = (${values.join(" + ")}) ÷ 4 = ${formatNumber(avg)} °C.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
      };
    },
  },

  {
    kind: "template",
    id: "stat_probleme_tpl_2_graphique",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les effectifs du graphique.",
    tags: ["stat_statistique", "probleme", "graphique", "canvas"],
    generate: () => {
      const data = [
        { label: "Marche", value: randomInt(8, 18) },
        { label: "Foot", value: randomInt(8, 18) },
        { label: "Natation", value: randomInt(8, 18) },
      ];
      const total = data.reduce((s, d) => s + d.value, 0);

      return {
        text: "D’après le graphique, combien d’élèves sont représentés au total ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`On additionne les effectifs : ${data.map((d) => d.value).join(" + ")} = ${total}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
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
    id: "stat_probleme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi les statistiques aident à comparer deux groupes.",
    format: "open",
    expected: ["moyenne", "médiane", "étendue"],
    comparator: "contains_keyword",
    hint: "Utilise au moins deux indicateurs.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Les statistiques permettent de résumer et comparer des groupes avec des indicateurs comme la moyenne, la médiane et l’étendue.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "probleme", "open"],
  },

  /* =========================
     STAT_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "stat_defi_fixed_1_erreur_moyenne_mediane",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « La médiane est toujours égale à la moyenne. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La moyenne et la médiane ne mesurent pas la même chose.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Non. La moyenne utilise toutes les valeurs, alors que la médiane dépend de la position centrale dans la série rangée.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "defi", "erreur"],
  },

  {
    kind: "template",
    id: "stat_defi_tpl_1_retrouver_valeur",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Somme totale = moyenne × nombre de valeurs.",
    tags: ["stat_statistique", "defi", "valeur_manquante"],
    generate: () => {
      const a = randomInt(8, 14);
      const b = randomInt(8, 14);
      const c = randomInt(8, 14);
      const target = randomInt(10, 14);
      const x = target * 4 - (a + b + c);

      return {
        text: `La moyenne de ${a}, ${b}, ${c} et x est ${target}. Quelle est la valeur de x ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          (`Somme totale = ${target} × 4 = ${target * 4}. Donc x = ${target * 4} - (${a} + ${b} + ${c}) = ${x}.`) +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
      };
    },
  },

  {
    kind: "fixed",
    id: "stat_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi une valeur extrême peut modifier fortement une moyenne.",
    format: "open",
    expected: ["valeur", "extrême", "moyenne"],
    comparator: "contains_keyword",
    hint: "La moyenne utilise toutes les valeurs.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Une valeur extrême entre dans le calcul de la somme totale, donc elle peut tirer la moyenne vers le haut ou vers le bas.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "defi", "open"],
  },
];