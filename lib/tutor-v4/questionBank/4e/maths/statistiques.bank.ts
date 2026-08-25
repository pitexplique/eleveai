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

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
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

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- STAT_LIRE_TABLEAU ----------
  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau statistique, que désigne une « valeur » de la série ?",
    format: "qcm",
    choices: [
      "une donnée observée (par exemple une note)",
      "le nombre total d’individus",
      "la moyenne de la série",
      "l’écart entre deux nombres",
    ],
    expected: ["une donnée observée (par exemple une note)"],
    comparator: "mcq_exact",
    hint: "Une valeur est ce qu’on observe, pas un calcul.",
    explanation:
      "Définition : une valeur est une donnée observée de la série.\n\n" +
      "Méthode : on distingue valeur, effectif et indicateurs.\n\n" +
      "Calcul : la valeur est par exemple une note ou une catégorie.\n\n" +
      "Conclusion : une valeur est une donnée observée.",
    tags: ["stat_statistique", "tableau", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Un tableau indique : A : 5, B : 7, C : 3. Quel est l’effectif total ?",
    format: "qcm",
    choices: ["15", "7", "3", "12"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "On additionne tous les effectifs.",
    explanation:
      "Définition : l’effectif total est la somme des effectifs.\n\n" +
      "Méthode : on additionne 5, 7 et 3.\n\n" +
      "Calcul : 5 + 7 + 3 = 15.\n\n" +
      "Conclusion : l’effectif total est 15.",
    tags: ["stat_statistique", "tableau", "total", "qcm"],
  },
  {
    kind: "template",
    id: "stat_lire_tableau_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    hint: "Lis l’effectif en face de la catégorie demandée.",
    tags: ["stat_statistique", "tableau", "lecture", "template"],
    generate: () => {
      const labels = ["rouge", "vert", "bleu", "jaune"];
      const values = labels.map(() => randomInt(5, 20));
      const i = randomInt(0, labels.length - 1);
      return {
        text: `Un tableau de couleurs préférées indique : rouge : ${values[0]}, vert : ${values[1]}, bleu : ${values[2]}, jaune : ${values[3]}. Quel est l’effectif pour ${labels[i]} ?`,
        format: "short",
        expected: [String(values[i])],
        comparator: "number_equal",
        explanation:
          "Définition : l’effectif est le nombre d’individus d’une catégorie.\n\n" +
          `Méthode : on lit la valeur en face de ${labels[i]}.\n\n` +
          `Calcul : l’effectif de ${labels[i]} est ${values[i]}.\n\n` +
          `Conclusion : l’effectif est ${values[i]}.`,
      };
    },
  },
  {
    kind: "template",
    id: "stat_lire_tableau_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le plus grand effectif.",
    tags: ["stat_statistique", "tableau", "maximum", "template"],
    generate: () => {
      const labels = ["lecture", "sport", "jeux", "musique"];
      const values = labels.map(() => randomInt(6, 24));
      const max = Math.max(...values);
      const correct = labels[values.indexOf(max)];
      return {
        text: `Un tableau indique : lecture : ${values[0]}, sport : ${values[1]}, jeux : ${values[2]}, musique : ${values[3]}. Quelle activité a le plus grand effectif ?`,
        format: "qcm",
        choices: labels,
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : on compare les effectifs des catégories.\n\n" +
          "Méthode : on cherche le plus grand nombre.\n\n" +
          `Calcul : le plus grand effectif est ${max}.\n\n` +
          `Conclusion : l’activité la plus choisie est ${correct}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_lire_tableau_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment trouver l’effectif total à partir d’un tableau.",
    format: "open",
    expected: ["additionne", "effectifs", "total"],
    comparator: "contains_keyword",
    hint: "On regroupe toutes les catégories.",
    explanation:
      "Définition : l’effectif total est la somme des effectifs.\n\n" +
      "Méthode : on additionne tous les effectifs du tableau.\n\n" +
      "Calcul : on fait la somme ligne par ligne.\n\n" +
      "Conclusion : l’effectif total s’obtient en additionnant tous les effectifs.",
    tags: ["stat_statistique", "tableau", "open"],
  },

  // ---------- STAT_LIRE_GRAPHIQUE ----------
  {
    kind: "fixed",
    id: "stat_lire_graphique_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un diagramme en barres, que lit-on sur l’axe horizontal ?",
    format: "qcm",
    choices: ["les catégories", "les effectifs", "la moyenne", "l’étendue"],
    expected: ["les catégories"],
    comparator: "mcq_exact",
    hint: "Les barres sont rangées par catégorie.",
    explanation:
      "Définition : l’axe horizontal porte les catégories.\n\n" +
      "Méthode : on repère ce qui est écrit sous chaque barre.\n\n" +
      "Calcul : ce sont les catégories ; les effectifs sont sur l’axe vertical.\n\n" +
      "Conclusion : l’axe horizontal indique les catégories.",
    tags: ["stat_statistique", "graphique", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_lire_graphique_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un diagramme circulaire (camembert), que représente un secteur plus grand ?",
    format: "qcm",
    choices: [
      "une catégorie plus fréquente",
      "une catégorie plus rare",
      "la moyenne",
      "rien de particulier",
    ],
    expected: ["une catégorie plus fréquente"],
    comparator: "mcq_exact",
    hint: "Plus la part est grande, plus l’effectif est grand.",
    explanation:
      "Définition : dans un camembert, la taille d’un secteur est proportionnelle à l’effectif.\n\n" +
      "Méthode : on compare les tailles des secteurs.\n\n" +
      "Calcul : un grand secteur correspond à un grand effectif.\n\n" +
      "Conclusion : un secteur plus grand est une catégorie plus fréquente.",
    tags: ["stat_statistique", "graphique", "camembert", "qcm"],
  },
  {
    kind: "template",
    id: "stat_lire_graphique_tpl_4",
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
          "Définition : la hauteur d’une barre donne la valeur.\n\n" +
          `Méthode : on lit la barre ${data[i].label}.\n\n` +
          `Calcul : elle monte jusqu’à ${data[i].value}.\n\n` +
          `Conclusion : la valeur est ${data[i].value}.`,
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
    id: "stat_lire_graphique_tpl_5_min",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la barre la plus basse.",
    tags: ["stat_statistique", "graphique", "minimum", "canvas", "template"],
    generate: () => {
      const data = [
        { label: "A", value: randomInt(10, 25) },
        { label: "B", value: randomInt(10, 25) },
        { label: "C", value: randomInt(10, 25) },
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
          "Définition : on compare les hauteurs des barres.\n\n" +
          "Méthode : on cherche la barre la plus basse.\n\n" +
          `Calcul : la plus petite valeur est ${min}.\n\n` +
          `Conclusion : c’est la catégorie ${correct}.`,
        canvas: statGraphCanvas({
          graphType: "barres",
          data,
          display: { showLabels: true, showValues: true, highlightIndex: data.findIndex((d) => d.label === correct) },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_lire_graphique_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Explique l’avantage d’un graphique par rapport à un tableau de données.",
    format: "open",
    expected: ["visuel", "comparer", "rapide"],
    comparator: "contains_keyword",
    hint: "Pense à la lecture visuelle.",
    explanation:
      "Définition : un graphique représente visuellement les données.\n\n" +
      "Méthode : on compare les hauteurs ou les parts d’un coup d’œil.\n\n" +
      "Calcul : on repère vite le maximum, le minimum, les écarts.\n\n" +
      "Conclusion : le graphique permet de comparer rapidement et visuellement.",
    tags: ["stat_statistique", "graphique", "open"],
  },

  // ---------- STAT_EFFECTIF ----------
  {
    kind: "fixed",
    id: "stat_effectif_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif",
    difficulty: 1,
    theme: "neutral",
    text: "L’effectif d’une valeur, c’est…",
    format: "qcm",
    choices: [
      "le nombre de fois où cette valeur apparaît",
      "la part de la série que cette valeur représente",
      "le rang de cette valeur dans la série rangée",
      "la somme de toutes les valeurs de la série",
    ],
    expected: ["le nombre de fois où cette valeur apparaît"],
    comparator: "mcq_exact",
    hint: "C’est un comptage.",
    explanation:
      "Définition : l’effectif compte les apparitions d’une valeur.\n\n" +
      "Méthode : on compte combien de fois la valeur revient.\n\n" +
      "Calcul : c’est un nombre d’individus.\n\n" +
      "Conclusion : l’effectif est le nombre de fois où la valeur apparaît.",
    tags: ["stat_statistique", "effectif", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_effectif_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif",
    difficulty: 2,
    theme: "neutral",
    text: "Un tableau indique : A : 8, B : 12, total : 25. Quel est l’effectif de C ?",
    format: "qcm",
    choices: ["5", "20", "4", "13"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Total - (A + B).",
    explanation:
      "Définition : l’effectif total est la somme des effectifs.\n\n" +
      "Méthode : on soustrait les effectifs connus du total.\n\n" +
      "Calcul : 25 - (8 + 12) = 25 - 20 = 5.\n\n" +
      "Conclusion : l’effectif de C est 5.",
    tags: ["stat_statistique", "effectif", "qcm"],
  },
  {
    kind: "template",
    id: "stat_effectif_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne tous les effectifs.",
    tags: ["stat_statistique", "effectif", "template"],
    generate: () => {
      const a = randomInt(4, 15);
      const b = randomInt(4, 15);
      const c = randomInt(4, 15);
      const d = randomInt(4, 15);
      const total = a + b + c + d;
      return {
        text: `Une enquête donne : ${a}, ${b}, ${c} et ${d} réponses pour quatre catégories. Quel est l’effectif total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : l’effectif total est la somme des effectifs.\n\n" +
          "Méthode : on additionne les quatre effectifs.\n\n" +
          `Calcul : ${a} + ${b} + ${c} + ${d} = ${total}.\n\n` +
          `Conclusion : l’effectif total est ${total}.`,
      };
    },
  },
  {
    kind: "template",
    id: "stat_effectif_tpl_4_manquant",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif",
    difficulty: 3,
    theme: "neutral",
    hint: "Effectif manquant = total - somme des effectifs connus.",
    tags: ["stat_statistique", "effectif", "manquant", "template"],
    generate: () => {
      const a = randomInt(5, 15);
      const b = randomInt(5, 15);
      const c = randomInt(5, 15);
      const total = a + b + c + randomInt(3, 12);
      const x = total - (a + b + c);
      return {
        text: `Un tableau indique trois effectifs ${a}, ${b}, ${c} et un effectif total de ${total}. Quel est le quatrième effectif ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : la somme des effectifs vaut l’effectif total.\n\n" +
          "Méthode : on soustrait les effectifs connus du total.\n\n" +
          `Calcul : ${total} - (${a} + ${b} + ${c}) = ${x}.\n\n` +
          `Conclusion : le quatrième effectif est ${x}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_effectif_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une série, la valeur 7 apparaît 3 fois. Quel est son effectif ?",
    format: "qcm",
    choices: ["3", "7", "21", "10"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "On compte le nombre d’apparitions.",
    explanation:
      "Définition : l’effectif d’une valeur est le nombre de fois où elle apparaît.\n\n" +
      "Méthode : on compte les apparitions de 7.\n\n" +
      "Calcul : elle apparaît 3 fois.\n\n" +
      "Conclusion : son effectif est 3.",
    tags: ["stat_statistique", "effectif", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_effectif_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la différence entre une valeur et son effectif.",
    format: "open",
    expected: ["valeur", "effectif", "nombre"],
    comparator: "contains_keyword",
    hint: "L’une est observée, l’autre est un comptage.",
    explanation:
      "Définition : la valeur est la donnée observée, l’effectif est le nombre de fois où elle apparaît.\n\n" +
      "Méthode : on distingue la donnée et son comptage.\n\n" +
      "Calcul : par exemple, la note 12 (valeur) obtenue par 4 élèves (effectif).\n\n" +
      "Conclusion : la valeur est la donnée, l’effectif est son nombre d’apparitions.",
    tags: ["stat_statistique", "effectif", "open"],
  },

  // ---------- STAT_FREQUENCE ----------
  {
    kind: "fixed",
    id: "stat_frequence_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une classe de 20 élèves, 5 portent des lunettes. Quelle est la fréquence en pourcentage ?",
    format: "qcm",
    choices: ["25 %", "5 %", "20 %", "50 %"],
    expected: ["25 %"],
    comparator: "mcq_exact",
    hint: "5 ÷ 20 = 0,25 = 25 %.",
    explanation:
      "Définition : la fréquence est l’effectif divisé par l’effectif total.\n\n" +
      "Méthode : on calcule 5 ÷ 20, puis on convertit en pourcentage.\n\n" +
      "Calcul : 5 ÷ 20 = 0,25 = 25 %.\n\n" +
      "Conclusion : la fréquence est 25 %.",
    tags: ["stat_statistique", "frequence", "pourcentage", "qcm"],
  },
  {
    kind: "template",
    id: "stat_frequence_tpl_4_decimal",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence = effectif ÷ total.",
    tags: ["stat_statistique", "frequence", "decimal", "template"],
    generate: () => {
      const total = randomChoice([10, 20, 25, 50]);
      const effectif = randomChoice([total / 2, total / 5, total / 10]);
      const freq = effectif / total;
      const fPoint = String(freq);
      const fComma = fPoint.replace(".", ",");
      return {
        text: `Sur ${total} personnes, ${effectif} aiment le sucré. Quelle est la fréquence (forme décimale) ?`,
        format: "short",
        expected: [fPoint, fComma],
        comparator: "number_equal",
        explanation:
          "Définition : la fréquence est l’effectif divisé par le total.\n\n" +
          "Méthode : on divise l’effectif par l’effectif total.\n\n" +
          `Calcul : ${effectif} ÷ ${total} = ${fComma}.\n\n` +
          `Conclusion : la fréquence est ${fComma}.`,
      };
    },
  },
  {
    kind: "template",
    id: "stat_frequence_tpl_5_pourcentage",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence en % = (effectif ÷ total) × 100.",
    tags: ["stat_statistique", "frequence", "pourcentage", "template"],
    generate: () => {
      const total = randomChoice([20, 25, 50, 100]);
      const pourcentage = randomChoice([10, 20, 25, 40, 50]);
      const effectif = (total * pourcentage) / 100;
      return {
        text: `Sur ${total} réponses, ${effectif} sont positives. Quelle est la fréquence en pourcentage ?`,
        format: "short",
        expected: [String(pourcentage)],
        comparator: "number_equal",
        explanation:
          "Définition : la fréquence en pourcentage = (effectif ÷ total) × 100.\n\n" +
          "Méthode : on divise puis on multiplie par 100.\n\n" +
          `Calcul : (${effectif} ÷ ${total}) × 100 = ${pourcentage} %.\n\n` +
          `Conclusion : la fréquence est ${pourcentage} %.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_frequence_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Une fréquence peut-elle être supérieure à 1 (ou 100 %) ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une partie ne dépasse pas le tout.",
    explanation:
      "Définition : une fréquence est un quotient effectif ÷ total, donc entre 0 et 1.\n\n" +
      "Méthode : l’effectif ne dépasse jamais le total.\n\n" +
      "Calcul : le quotient est au plus 1 (100 %).\n\n" +
      "Conclusion : non, une fréquence ne dépasse pas 1.",
    tags: ["stat_statistique", "frequence", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_frequence_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment passer d’une fréquence décimale à un pourcentage.",
    format: "open",
    expected: ["multiplie", "100", "pourcentage"],
    comparator: "contains_keyword",
    hint: "On change d’écriture en multipliant.",
    explanation:
      "Définition : un pourcentage est une fréquence exprimée sur 100.\n\n" +
      "Méthode : on multiplie la fréquence décimale par 100.\n\n" +
      "Calcul : par exemple 0,25 × 100 = 25 %.\n\n" +
      "Conclusion : on multiplie la fréquence décimale par 100 pour obtenir le pourcentage.",
    tags: ["stat_statistique", "frequence", "open"],
  },

  // ---------- STAT_MOYENNE ----------
  {
    kind: "fixed",
    id: "stat_moyenne_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la moyenne de 6 ; 8 ; 10 ; 12 ?",
    format: "qcm",
    choices: ["9", "8", "10", "36"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Somme ÷ 4.",
    explanation:
      "Définition : la moyenne est la somme divisée par le nombre de valeurs.\n\n" +
      "Méthode : on additionne puis on divise par 4.\n\n" +
      "Calcul : (6 + 8 + 10 + 12) ÷ 4 = 36 ÷ 4 = 9.\n\n" +
      "Conclusion : la moyenne est 9.",
    tags: ["stat_statistique", "moyenne", "qcm"],
  },
  {
    kind: "template",
    id: "stat_moyenne_tpl_4_liste",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne, puis divise par le nombre de valeurs.",
    tags: ["stat_statistique", "moyenne", "template"],
    generate: () => {
      const values = [randomInt(4, 12), randomInt(4, 12), randomInt(4, 12)];
      const avg = moyenne(values);
      return {
        text: `Calculer la moyenne de : ${values.join(" ; ")}.`,
        format: "short",
        expected: [formatNumber(avg)],
        comparator: "number_equal",
        explanation:
          "Définition : la moyenne = somme ÷ nombre de valeurs.\n\n" +
          "Méthode : on additionne puis on divise par 3.\n\n" +
          `Calcul : (${values.join(" + ")}) ÷ 3 = ${formatNumber(avg)}.\n\n` +
          `Conclusion : la moyenne est ${formatNumber(avg)}.`,
      };
    },
  },
  {
    kind: "template",
    id: "stat_moyenne_tpl_5_contexte",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les notes, divise par leur nombre.",
    tags: ["stat_statistique", "moyenne", "contexte", "template"],
    generate: () => {
      const values = [randomInt(8, 18), randomInt(8, 18), randomInt(8, 18), randomInt(8, 18), randomInt(8, 18)];
      const avg = moyenne(values);
      return {
        text: `Un élève a obtenu les notes : ${values.join(" ; ")}. Quelle est sa moyenne ?`,
        format: "short",
        expected: [formatNumber(avg)],
        comparator: "number_equal",
        explanation:
          "Définition : la moyenne = somme des notes ÷ nombre de notes.\n\n" +
          "Méthode : on additionne les 5 notes puis on divise par 5.\n\n" +
          `Calcul : (${values.join(" + ")}) ÷ 5 = ${formatNumber(avg)}.\n\n` +
          `Conclusion : la moyenne est ${formatNumber(avg)}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_moyenne_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la méthode pour calculer une moyenne.",
    format: "open",
    expected: ["additionne", "divise", "nombre"],
    comparator: "contains_keyword",
    hint: "Deux étapes : somme puis division.",
    explanation:
      "Définition : la moyenne résume une série par une seule valeur.\n\n" +
      "Méthode : on additionne toutes les valeurs, puis on divise par leur nombre.\n\n" +
      "Calcul : moyenne = somme ÷ nombre de valeurs.\n\n" +
      "Conclusion : on additionne puis on divise par le nombre de valeurs.",
    tags: ["stat_statistique", "moyenne", "open"],
  },

  // ---------- STAT_MEDIANE ----------
  {
    kind: "fixed",
    id: "stat_mediane_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la médiane de la série rangée : 3 ; 5 ; 8 ?",
    format: "qcm",
    choices: ["5", "3", "8", "16"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Avec 3 valeurs, c’est celle du milieu.",
    explanation:
      "Définition : la médiane est la valeur centrale d’une série rangée.\n\n" +
      "Méthode : avec 3 valeurs, la médiane est la 2e.\n\n" +
      "Calcul : la valeur centrale est 5.\n\n" +
      "Conclusion : la médiane est 5.",
    tags: ["stat_statistique", "mediane", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_mediane_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 2,
    theme: "neutral",
    text: "Que signifie la médiane d’une série ?",
    format: "qcm",
    choices: [
      "la valeur qui partage la série rangée en deux moitiés",
      "la valeur qui apparaît le plus souvent dans la série",
      "la valeur qu’on obtient en divisant la somme par l’effectif",
      "la valeur qui sépare la plus grande de la plus petite",
    ],
    expected: ["la valeur qui partage la série rangée en deux moitiés"],
    comparator: "mcq_exact",
    hint: "C’est la valeur du milieu.",
    explanation:
      "Définition : la médiane partage la série rangée en deux moitiés de même effectif.\n\n" +
      "Méthode : on range puis on prend la valeur centrale.\n\n" +
      "Calcul : la moitié des valeurs lui est inférieure, l’autre supérieure.\n\n" +
      "Conclusion : la médiane partage la série en deux moitiés.",
    tags: ["stat_statistique", "mediane", "qcm"],
  },
  {
    kind: "template",
    id: "stat_mediane_tpl_3_impair",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 3,
    theme: "neutral",
    hint: "Range puis prends la valeur centrale.",
    tags: ["stat_statistique", "mediane", "impair", "template"],
    generate: () => {
      const sorted = [randomInt(2, 6), randomInt(7, 11), randomInt(12, 18)];
      const values = shuffle(sorted);
      const med = sorted[1];
      return {
        text: `Déterminer la médiane de : ${values.join(" ; ")}.`,
        format: "short",
        expected: [String(med)],
        comparator: "number_equal",
        explanation:
          "Définition : la médiane est la valeur centrale de la série rangée.\n\n" +
          `Méthode : on range : ${sorted.join(" ; ")}.\n\n` +
          `Calcul : la valeur centrale est ${med}.\n\n` +
          `Conclusion : la médiane est ${med}.`,
      };
    },
  },
  {
    kind: "template",
    id: "stat_mediane_tpl_4_pair",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 4,
    theme: "neutral",
    hint: "Avec un nombre pair, moyenne des deux valeurs centrales.",
    tags: ["stat_statistique", "mediane", "pair", "template"],
    generate: () => {
      const sorted = [randomInt(2, 5), randomInt(6, 9), randomInt(10, 13), randomInt(14, 18), randomInt(19, 22), randomInt(23, 28)];
      const values = shuffle(sorted);
      const med = (sorted[2] + sorted[3]) / 2;
      return {
        text: `Déterminer la médiane de : ${values.join(" ; ")}.`,
        format: "short",
        expected: [formatNumber(med)],
        comparator: "number_equal",
        explanation:
          "Définition : avec un nombre pair de valeurs, la médiane est la moyenne des deux valeurs centrales.\n\n" +
          `Méthode : on range : ${sorted.join(" ; ")}.\n\n` +
          `Calcul : (${sorted[2]} + ${sorted[3]}) ÷ 2 = ${formatNumber(med)}.\n\n` +
          `Conclusion : la médiane est ${formatNumber(med)}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_mediane_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment trouver la médiane d’une série ayant un nombre pair de valeurs.",
    format: "open",
    expected: ["ranger", "deux", "moyenne"],
    comparator: "contains_keyword",
    hint: "Il y a deux valeurs centrales.",
    explanation:
      "Définition : avec un nombre pair de valeurs, il y a deux valeurs centrales.\n\n" +
      "Méthode : on range la série, on repère les deux valeurs du milieu.\n\n" +
      "Calcul : la médiane est la moyenne de ces deux valeurs.\n\n" +
      "Conclusion : on prend la moyenne des deux valeurs centrales.",
    tags: ["stat_statistique", "mediane", "open"],
  },

  // ---------- STAT_ETENDUE ----------
  {
    kind: "fixed",
    id: "stat_etendue_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’étendue de la série : 3 ; 9 ; 5 ; 12 ?",
    format: "qcm",
    choices: ["9", "12", "3", "15"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Maximum - minimum = 12 - 3.",
    explanation:
      "Définition : l’étendue = maximum - minimum.\n\n" +
      "Méthode : on repère le plus grand (12) et le plus petit (3).\n\n" +
      "Calcul : 12 - 3 = 9.\n\n" +
      "Conclusion : l’étendue est 9.",
    tags: ["stat_statistique", "etendue", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_etendue_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 1,
    theme: "neutral",
    text: "L’étendue d’une série se calcule par…",
    format: "qcm",
    choices: ["maximum - minimum", "maximum + minimum", "somme ÷ nombre", "valeur centrale"],
    expected: ["maximum - minimum"],
    comparator: "mcq_exact",
    hint: "C’est un écart entre extrêmes.",
    explanation:
      "Définition : l’étendue mesure l’écart entre les extrêmes.\n\n" +
      "Méthode : on soustrait le minimum du maximum.\n\n" +
      "Calcul : étendue = maximum - minimum.\n\n" +
      "Conclusion : la formule est maximum - minimum.",
    tags: ["stat_statistique", "etendue", "qcm"],
  },
  {
    kind: "template",
    id: "stat_etendue_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère le min et le max.",
    tags: ["stat_statistique", "etendue", "template"],
    generate: () => {
      const min = randomInt(1, 7);
      const max = randomInt(20, 35);
      const values = shuffle([min, randomInt(8, 13), randomInt(14, 19), max]);
      const result = max - min;
      return {
        text: `Calculer l’étendue de : ${values.join(" ; ")}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : l’étendue = maximum - minimum.\n\n" +
          `Méthode : minimum = ${min}, maximum = ${max}.\n\n` +
          `Calcul : ${max} - ${min} = ${result}.\n\n` +
          `Conclusion : l’étendue est ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "stat_etendue_tpl_4_contexte",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "neutral",
    hint: "Étendue des températures = plus chaude - plus froide.",
    tags: ["stat_statistique", "etendue", "contexte", "template"],
    generate: () => {
      const min = randomInt(10, 18);
      const max = randomInt(24, 34);
      const result = max - min;
      return {
        text: `Sur une semaine, la température la plus basse est ${min} °C et la plus haute ${max} °C. Quelle est l’étendue des températures ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : l’étendue = maximum - minimum.\n\n" +
          "Méthode : on soustrait la plus basse de la plus haute.\n\n" +
          `Calcul : ${max} - ${min} = ${result}.\n\n` +
          `Conclusion : l’étendue est ${result} °C.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_etendue_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "neutral",
    text: "Deux séries ont la même moyenne. La série dont l’étendue est la plus petite est…",
    format: "qcm",
    choices: ["la plus regroupée", "la plus dispersée", "la plus grande", "impossible à comparer"],
    expected: ["la plus regroupée"],
    comparator: "mcq_exact",
    hint: "Petite étendue = valeurs proches.",
    explanation:
      "Définition : l’étendue mesure la dispersion.\n\n" +
      "Méthode : une petite étendue signifie des valeurs proches.\n\n" +
      "Calcul : moins d’écart entre extrêmes = série regroupée.\n\n" +
      "Conclusion : la plus petite étendue correspond à la série la plus regroupée.",
    tags: ["stat_statistique", "etendue", "interpretation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_etendue_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi l’étendue ne dépend que de deux valeurs.",
    format: "open",
    expected: ["maximum", "minimum", "extrêmes"],
    comparator: "contains_keyword",
    hint: "Quelles valeurs interviennent dans le calcul ?",
    explanation:
      "Définition : l’étendue = maximum - minimum.\n\n" +
      "Méthode : seules les valeurs extrêmes interviennent.\n\n" +
      "Calcul : les valeurs intermédiaires ne changent pas l’étendue.\n\n" +
      "Conclusion : l’étendue ne dépend que du maximum et du minimum.",
    tags: ["stat_statistique", "etendue", "open"],
  },

  // ---------- STAT_INTERPRETATION ----------
  {
    kind: "fixed",
    id: "stat_interpreter_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Quel indicateur mesure la dispersion d’une série ?",
    format: "qcm",
    choices: ["l’étendue", "la moyenne", "la médiane", "l’effectif"],
    expected: ["l’étendue"],
    comparator: "mcq_exact",
    hint: "C’est l’écart entre les extrêmes.",
    explanation:
      "Définition : la dispersion décrit l’écart entre les valeurs.\n\n" +
      "Méthode : on choisit l’indicateur d’écart.\n\n" +
      "Calcul : l’étendue (max - min) mesure la dispersion.\n\n" +
      "Conclusion : c’est l’étendue.",
    tags: ["stat_statistique", "interpretation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_interpreter_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Quel indicateur n’est pas influencé par une seule valeur extrême ?",
    format: "qcm",
    choices: ["la médiane", "la moyenne", "l’étendue", "la somme"],
    expected: ["la médiane"],
    comparator: "mcq_exact",
    hint: "La médiane dépend de la position, pas des valeurs extrêmes.",
    explanation:
      "Définition : la médiane est la valeur centrale.\n\n" +
      "Méthode : elle dépend de la position, pas de la taille des extrêmes.\n\n" +
      "Calcul : une valeur extrême change la moyenne et l’étendue, mais peu la médiane.\n\n" +
      "Conclusion : la médiane résiste aux valeurs extrêmes.",
    tags: ["stat_statistique", "interpretation", "qcm"],
  },
  {
    kind: "template",
    id: "stat_interpreter_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Plus l’étendue est petite, plus les valeurs sont regroupées.",
    tags: ["stat_statistique", "interpretation", "template"],
    generate: () => {
      const eA = randomChoice([3, 4, 5]);
      const eB = randomChoice([9, 11, 13]);
      return {
        text: `Deux séries ont la même moyenne. La série A a une étendue de ${eA}, la série B une étendue de ${eB}. Laquelle est la plus régulière (valeurs proches) ?`,
        format: "qcm",
        choices: ["série A", "série B"],
        expected: ["série A"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une petite étendue indique des valeurs proches.\n\n" +
          "Méthode : on compare les étendues.\n\n" +
          `Calcul : ${eA} < ${eB}, donc A est plus regroupée.\n\n` +
          "Conclusion : la série A est la plus régulière.",
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_interpreter_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "La moyenne d’une classe est 11/20. Peut-on en déduire la note de chaque élève ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La moyenne résume, elle ne donne pas le détail.",
    explanation:
      "Définition : la moyenne est un résumé global.\n\n" +
      "Méthode : plusieurs répartitions donnent la même moyenne.\n\n" +
      "Calcul : 11 peut venir de 8 et 14, ou de 11 et 11, etc.\n\n" +
      "Conclusion : non, la moyenne ne donne pas chaque note.",
    tags: ["stat_statistique", "interpretation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_interpreter_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi il est utile d’utiliser plusieurs indicateurs pour décrire une série.",
    format: "open",
    expected: ["moyenne", "étendue", "dispersion"],
    comparator: "contains_keyword",
    hint: "Un seul indicateur ne dit pas tout.",
    explanation:
      "Définition : chaque indicateur décrit un aspect différent.\n\n" +
      "Méthode : la moyenne donne le niveau, l’étendue la dispersion, la médiane le centre.\n\n" +
      "Calcul : deux séries de même moyenne peuvent être très différentes.\n\n" +
      "Conclusion : plusieurs indicateurs donnent une image complète de la série.",
    tags: ["stat_statistique", "interpretation", "open"],
  },
  {
    kind: "template",
    id: "stat_interpreter_tpl_3_mieux",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "À moyenne égale, on regarde la régularité.",
    tags: ["stat_statistique", "interpretation", "template"],
    generate: () => {
      const eA = randomChoice([2, 3, 4]);
      const eB = randomChoice([8, 10, 12]);
      return {
        text: `Deux joueurs ont la même moyenne de points. Le joueur A a une étendue de ${eA}, le joueur B de ${eB}. Lequel est le plus régulier ?`,
        format: "qcm",
        choices: ["le joueur A", "le joueur B"],
        expected: ["le joueur A"],
        comparator: "mcq_exact",
        explanation:
          "Définition : la régularité se lit dans une faible dispersion.\n\n" +
          "Méthode : on compare les étendues.\n\n" +
          `Calcul : ${eA} < ${eB}, donc A varie moins.\n\n` +
          "Conclusion : le joueur A est le plus régulier.",
      };
    },
  },

  // ---------- STAT_PROBLEME ----------
  {
    kind: "fixed",
    id: "stat_probleme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève a 12, 14 et 10 en maths. Quelle est sa moyenne ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Somme ÷ 3.",
    explanation:
      "Définition : la moyenne = somme ÷ nombre de notes.\n\n" +
      "Méthode : on additionne puis on divise par 3.\n\n" +
      "Calcul : (12 + 14 + 10) ÷ 3 = 36 ÷ 3 = 12.\n\n" +
      "Conclusion : la moyenne est 12.",
    tags: ["stat_statistique", "probleme", "moyenne"],
  },
  {
    kind: "fixed",
    id: "stat_probleme_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Sur 30 élèves, 18 font de l’anglais. Quelle est la fréquence en pourcentage ?",
    format: "qcm",
    choices: ["60 %", "18 %", "30 %", "12 %"],
    expected: ["60 %"],
    comparator: "mcq_exact",
    hint: "18 ÷ 30 = 0,6.",
    explanation:
      "Définition : fréquence = effectif ÷ total.\n\n" +
      "Méthode : on calcule 18 ÷ 30, puis × 100.\n\n" +
      "Calcul : 18 ÷ 30 = 0,6 = 60 %.\n\n" +
      "Conclusion : la fréquence est 60 %.",
    tags: ["stat_statistique", "probleme", "frequence", "qcm"],
  },
  {
    kind: "template",
    id: "stat_probleme_tpl_3_etendue",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Étendue = max - min.",
    tags: ["stat_statistique", "probleme", "etendue", "template"],
    generate: () => {
      const min = randomInt(2, 8);
      const max = randomInt(20, 30);
      const values = shuffle([min, randomInt(9, 14), randomInt(15, 19), max]);
      const result = max - min;
      return {
        text: `Les ventes journalières d’un magasin sont : ${values.join(" ; ")}. Quelle est l’étendue des ventes ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : l’étendue = maximum - minimum.\n\n" +
          `Méthode : minimum = ${min}, maximum = ${max}.\n\n` +
          `Calcul : ${max} - ${min} = ${result}.\n\n` +
          `Conclusion : l’étendue des ventes est ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "stat_probleme_tpl_4_mediane",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Range les valeurs puis prends la centrale.",
    tags: ["stat_statistique", "probleme", "mediane", "template"],
    generate: () => {
      const sorted = [randomInt(2, 6), randomInt(7, 11), randomInt(12, 16), randomInt(17, 20), randomInt(21, 26)];
      const values = shuffle(sorted);
      const med = sorted[2];
      return {
        text: `Cinq magasins ont vendu : ${values.join(" ; ")} articles. Quelle est la médiane des ventes ?`,
        format: "short",
        expected: [String(med)],
        comparator: "number_equal",
        explanation:
          "Définition : la médiane est la valeur centrale de la série rangée.\n\n" +
          `Méthode : on range : ${sorted.join(" ; ")}.\n\n` +
          `Calcul : la 3e valeur est ${med}.\n\n` +
          `Conclusion : la médiane est ${med}.`,
      };
    },
  },
  {
    kind: "template",
    id: "stat_probleme_tpl_5_total",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne tous les effectifs.",
    tags: ["stat_statistique", "probleme", "effectif", "template"],
    generate: () => {
      const a = randomInt(10, 30);
      const b = randomInt(10, 30);
      const c = randomInt(10, 30);
      const total = a + b + c;
      return {
        text: `Un club a ${a} membres en judo, ${b} en danse et ${c} en escalade. Combien de membres le club a-t-il en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : l’effectif total est la somme des effectifs.\n\n" +
          "Méthode : on additionne les trois sections.\n\n" +
          `Calcul : ${a} + ${b} + ${c} = ${total}.\n\n` +
          `Conclusion : le club a ${total} membres.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_probleme_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique quel indicateur choisir pour connaître le niveau moyen d’une classe.",
    format: "open",
    expected: ["moyenne", "somme", "divise"],
    comparator: "contains_keyword",
    hint: "Niveau moyen = moyenne.",
    explanation:
      "Définition : la moyenne donne le niveau global.\n\n" +
      "Méthode : on additionne les notes et on divise par leur nombre.\n\n" +
      "Calcul : moyenne = somme ÷ effectif.\n\n" +
      "Conclusion : pour le niveau moyen, on choisit la moyenne.",
    tags: ["stat_statistique", "probleme", "open"],
  },

  // ---------- STAT_DEFIS ----------
  {
    kind: "fixed",
    id: "stat_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une série est : 4 ; 4 ; 4 ; 4. Que vaut son étendue ?",
    format: "qcm",
    choices: ["0", "4", "16", "1"],
    expected: ["0"],
    comparator: "mcq_exact",
    hint: "Toutes les valeurs sont identiques.",
    explanation:
      "Définition : l’étendue = maximum - minimum.\n\n" +
      "Méthode : ici, maximum = minimum = 4.\n\n" +
      "Calcul : 4 - 4 = 0.\n\n" +
      "Conclusion : l’étendue est 0 (aucune dispersion).",
    tags: ["stat_statistique", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « ajouter une note de 0 ne change pas la moyenne ». A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le nombre de valeurs change.",
    explanation:
      "Définition : la moyenne dépend de la somme ET du nombre de valeurs.\n\n" +
      "Méthode : ajouter un 0 augmente le nombre de valeurs sans augmenter la somme.\n\n" +
      "Calcul : la somme reste identique mais on divise par un nombre plus grand.\n\n" +
      "Conclusion : non, la moyenne diminue.",
    tags: ["stat_statistique", "defi", "moyenne", "qcm"],
  },
  {
    kind: "template",
    id: "stat_defi_tpl_2_moyenne_ponderee",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque note compte autant de fois que son effectif.",
    tags: ["stat_statistique", "defi", "moyenne_ponderee", "template"],
    generate: () => {
      const v1 = randomChoice([8, 10, 12]);
      const v2 = v1 + randomChoice([2, 4]);
      const e1 = randomInt(2, 5);
      const e2 = randomInt(2, 5);
      const total = e1 + e2;
      const avg = (v1 * e1 + v2 * e2) / total;
      return {
        text: `${e1} élèves ont eu ${v1} et ${e2} élèves ont eu ${v2}. Quelle est la moyenne de ces ${total} élèves ?`,
        format: "short",
        expected: [formatNumber(avg)],
        comparator: "number_equal",
        explanation:
          "Définition : la moyenne pondérée tient compte des effectifs.\n\n" +
          "Méthode : on multiplie chaque note par son effectif, on additionne, puis on divise par le total.\n\n" +
          `Calcul : (${v1} × ${e1} + ${v2} × ${e2}) ÷ ${total} = ${formatNumber(avg)}.\n\n` +
          `Conclusion : la moyenne est ${formatNumber(avg)}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la médiane peut mieux représenter une série que la moyenne quand il y a une valeur très grande.",
    format: "open",
    expected: ["médiane", "extrême", "moyenne"],
    comparator: "contains_keyword",
    hint: "Pense à l’effet d’une valeur extrême.",
    explanation:
      "Définition : la médiane est la valeur centrale, peu sensible aux extrêmes.\n\n" +
      "Méthode : une valeur très grande tire la moyenne vers le haut.\n\n" +
      "Calcul : la médiane reste proche du centre des données.\n\n" +
      "Conclusion : avec une valeur extrême, la médiane représente souvent mieux la série.",
    tags: ["stat_statistique", "defi", "open"],
  },
  {
    kind: "fixed",
    id: "stat_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la série 2 ; 2 ; 2 ; 100, quel indicateur est le plus « tiré vers le haut » par le 100 ?",
    format: "qcm",
    choices: ["la moyenne", "la médiane", "le minimum", "l’effectif"],
    expected: ["la moyenne"],
    comparator: "mcq_exact",
    hint: "La moyenne utilise toutes les valeurs.",
    explanation:
      "Définition : la moyenne tient compte de toutes les valeurs.\n\n" +
      "Méthode : on compare l’effet de la valeur extrême.\n\n" +
      "Calcul : la moyenne vaut (2+2+2+100)÷4 = 26,5, alors que la médiane vaut 2.\n\n" +
      "Conclusion : c’est la moyenne qui est tirée vers le haut.",
    tags: ["stat_statistique", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "stat_defi_tpl_3_valeur_manquante",
    niveau: "4e",
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
      const target = randomInt(10, 14);
      const x = target * 3 - (a + b);
      return {
        text: `La moyenne de ${a}, ${b} et x est ${target}. Quelle est la valeur de x ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : somme totale = moyenne × nombre de valeurs.\n\n" +
          `Méthode : la somme doit valoir ${target} × 3 = ${target * 3}.\n\n` +
          `Calcul : x = ${target * 3} - (${a} + ${b}) = ${x}.\n\n` +
          `Conclusion : x = ${x}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "stat_defi_open_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi deux séries peuvent avoir la même moyenne mais des étendues très différentes.",
    format: "open",
    expected: ["moyenne", "étendue", "dispersion"],
    comparator: "contains_keyword",
    hint: "La moyenne ne dit rien sur la dispersion.",
    explanation:
      "Définition : la moyenne mesure le niveau, l’étendue mesure la dispersion.\n\n" +
      "Méthode : on peut garder la même somme avec des valeurs plus ou moins écartées.\n\n" +
      "Calcul : par exemple 9 ; 11 et 2 ; 18 ont une moyenne de 10 mais des étendues différentes.\n\n" +
      "Conclusion : la moyenne n’indique pas la dispersion, d’où des étendues différentes.",
    tags: ["stat_statistique", "defi", "open"],
  },
];