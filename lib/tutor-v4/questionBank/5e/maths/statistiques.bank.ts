import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const statistiquesBank: TutorBankItemV4[] = [

  /* =========================
     LIRE TABLEAU
  ========================= */

  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "statistiques",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il d'élèves au total ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Additionne tous les effectifs.",
    explanation: "On additionne tous les effectifs pour obtenir le total.",
    tags: ["statistiques", "tableau"],
    canvas: {
      kind: "table",
      headers: ["Valeur", "Effectif"],
      rows: [
        ["10", "5"],
        ["12", "8"],
        ["15", "7"],
      ],
    },
  },

  /* =========================
     LIRE GRAPHIQUE
  ========================= */

  {
    kind: "fixed",
    id: "stat_lire_graphique_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "statistiques",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle valeur est la plus fréquente ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Regarde la barre la plus haute.",
    explanation: "La barre la plus haute correspond à la valeur la plus fréquente.",
    tags: ["statistiques", "graphique", "canvas"],
    canvas: {
      kind: "bar",
      labels: ["10", "12", "15"],
      values: [5, 8, 7],
    },
  },

  /* =========================
     EFFECTIF / FREQUENCE
  ========================= */

  {
    kind: "fixed",
    id: "stat_effectif_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "statistiques",
    microId: "stat_effectif_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la fréquence de la valeur 10 ?",
    format: "short",
    expected: ["0.25", "0,25"],
    comparator: "number_equal",
    hint: "Fréquence = effectif / total.",
    explanation: "5 / 20 = 0,25.",
    tags: ["statistiques", "frequence"],
    canvas: {
      kind: "table",
      headers: ["Valeur", "Effectif"],
      rows: [
        ["10", "5"],
        ["12", "8"],
        ["15", "7"],
      ],
    },
  },

  /* =========================
     MOYENNE
  ========================= */

  {
    kind: "fixed",
    id: "stat_moyenne_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "statistiques",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la moyenne des notes : 10, 12, 18 ?",
    format: "short",
    expected: ["13.33", "13,33"],
    comparator: "number_equal",
    hint: "Additionne puis divise par 3.",
    explanation: "(10 + 12 + 18) ÷ 3 = 13,33.",
    tags: ["statistiques", "moyenne"],
  },

  /* =========================
     REPRESENTATION
  ========================= */

  {
    kind: "fixed",
    id: "stat_representer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "statistiques",
    microId: "stat_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel graphique est adapté pour comparer des effectifs ?",
    format: "qcm",
    choices: ["diagramme en barres", "tableau", "texte"],
    expected: ["diagramme en barres"],
    comparator: "mcq_exact",
    hint: "On compare des quantités.",
    explanation: "Le diagramme en barres permet de comparer des effectifs.",
    tags: ["statistiques", "representation"],
  },

  /* =========================
     OPEN QUESTIONS
  ========================= */

  {
    kind: "fixed",
    id: "stat_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "statistiques",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment tu trouves la valeur la plus fréquente sur un graphique.",
    format: "open",
    expected: ["barre", "haute", "frequence"],
    comparator: "contains_keyword",
    hint: "Regarde la hauteur.",
    explanation: "La valeur la plus fréquente correspond à la barre la plus haute.",
    tags: ["statistiques", "open"],
  },

  {
    kind: "fixed",
    id: "stat_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "statistiques",
    microId: "stat_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment calculer une moyenne.",
    format: "open",
    expected: ["addition", "divise", "nombre"],
    comparator: "contains_keyword",
    hint: "2 étapes.",
    explanation: "On additionne toutes les valeurs puis on divise par leur nombre.",
    tags: ["statistiques", "open"],
  },

  /* =========================
     TEMPLATE - MOYENNE
  ========================= */

  {
    kind: "template",
    id: "stat_moyenne_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "statistiques",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    hint: "Somme ÷ nombre.",
    tags: ["statistiques", "template"],
    generate: () => {
      const a = randomChoice([8, 10, 12]);
      const b = randomChoice([10, 12, 14]);
      const c = randomChoice([12, 14, 16]);

      const mean = (a + b + c) / 3;

      return {
        text: `Quelle est la moyenne de ${a}, ${b} et ${c} ?`,
        format: "short",
        expected: [String(mean)],
        comparator: "number_equal",
        explanation: `(${a} + ${b} + ${c}) ÷ 3 = ${mean}.`,
      };
    },
  },

  /* =========================
     TEMPLATE - FREQUENCE
  ========================= */

  {
    kind: "template",
    id: "stat_freq_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "statistiques",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "effectif / total",
    tags: ["statistiques", "template"],
    generate: () => {
      const total = randomChoice([20, 25, 30]);
      const part = randomChoice([5, 10, 15]);

      const freq = part / total;

      return {
        text: `Dans une classe de ${total} élèves, ${part} aiment le sport. Quelle est la fréquence ?`,
        format: "short",
        expected: [String(freq)],
        comparator: "number_equal",
        explanation: `${part} ÷ ${total} = ${freq}.`,
      };
    },
  },

  /* =========================
     DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "stat_defis_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "statistiques",
    microId: "stat_defis",
    difficulty: 5,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, on vend 5 kg de mangues, 10 kg d’ananas et 15 kg de letchis. Quelle est la fréquence des mangues ?",
    format: "short",
    expected: ["0.166", "0,166", "1/6"],
    comparator: "contains_keyword",
    hint: "Total = 30 kg.",
    explanation: "5 / 30 = 1/6 ≈ 0,166.",
    tags: ["statistiques", "defi", "reunion"],
  },

];