// lib/tutor-v4/question-banks/maths/cm2/tableaux.bank.ts

import type {
  TutorBankItemV4,
  TableauDonneesCanvasData,
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

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
}

function tableauCanvas(
  data: Omit<TableauDonneesCanvasData, "kind">
): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    ...data,
  };
}

// ============================================================
// HELPERS CANVAS
// ============================================================

function tableauFruitsReunionCanvas(
  highlight?: TableauDonneesCanvasData["highlight"]
): TableauDonneesCanvasData {
  return tableauCanvas({
    title: "Fruits vendus au marché",
    headers: ["Lundi", "Mardi", "Mercredi"],
    rows: [
      {
        label: "Ananas",
        values: [18, 24, 20],
      },
      {
        label: "Bananes",
        values: [30, 28, 35],
      },
      {
        label: "Mangues",
        values: [12, 15, 18],
      },
    ],
    highlight,
    caption: "Nombre de fruits vendus",
    display: {
      compact: false,
      striped: true,
    },
  });
}

function tableauSportCanvas(
  highlight?: TableauDonneesCanvasData["highlight"]
): TableauDonneesCanvasData {
  return tableauCanvas({
    title: "Activités choisies par les élèves",
    headers: ["Football", "Danse", "Natation", "Basket"],
    rows: [
      {
        label: "Nombre d’élèves",
        values: [12, 9, 7, 10],
      },
    ],
    highlight,
    caption: "Enquête dans une classe de CM2",
    display: {
      compact: false,
      striped: true,
    },
  });
}

function tableauBibliothequeCanvas(
  highlight?: TableauDonneesCanvasData["highlight"]
): TableauDonneesCanvasData {
  return tableauCanvas({
    title: "Livres lus pendant le mois",
    headers: ["Romans", "BD", "Mangas", "Documentaires"],
    rows: [
      {
        label: "Nombre de livres",
        values: [14, 22, 18, 9],
      },
    ],
    highlight,
    caption: "Lecture des élèves",
    display: {
      compact: false,
      striped: true,
    },
  });
}

function tableauMeteoCanvas(
  highlight?: TableauDonneesCanvasData["highlight"]
): TableauDonneesCanvasData {
  return tableauCanvas({
    title: "Températures relevées",
    headers: ["Lundi", "Mardi", "Mercredi", "Jeudi"],
    rows: [
      {
        label: "Température",
        values: ["25°C", "27°C", "26°C", "28°C"],
      },
    ],
    highlight,
    caption: "Température à midi",
    display: {
      compact: false,
      striped: true,
    },
  });
}

function tableauCantineCanvas(
  highlight?: TableauDonneesCanvasData["highlight"]
): TableauDonneesCanvasData {
  return tableauCanvas({
    title: "Menus choisis à la cantine",
    headers: ["Cari", "Rougail", "Salade", "Sandwich"],
    rows: [
      {
        label: "Nombre d’élèves",
        values: [16, 14, 8, 12],
      },
    ],
    highlight,
    caption: "Choix des élèves un vendredi",
    display: {
      compact: false,
      striped: true,
    },
  });
}

// ============================================================
// BANK
// ============================================================

export const tableauxBank: TutorBankItemV4[] = [
  // ============================================================
  // TABLEAU_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "À quoi sert un tableau de données ?",
    format: "qcm",
    choices: [
      "à organiser des informations pour les lire plus facilement",
      "à dessiner seulement des figures géométriques",
      "à remplacer tous les calculs",
      "à écrire une histoire sans nombres",
    ],
    expected: ["à organiser des informations pour les lire plus facilement"],
    comparator: "mcq_exact",
    hint: "Un tableau range des informations en lignes et en colonnes.",
    explanation:
      "Un tableau de données sert à organiser des informations. On peut ainsi lire plus facilement les valeurs, comparer des données ou répondre à des questions.",
    tags: ["cm2", "tableau", "lire", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_2_ligne_colonne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau, les informations sont souvent rangées...",
    format: "qcm",
    choices: [
      "en lignes et en colonnes",
      "uniquement en cercle",
      "seulement au hasard",
      "toujours dans une phrase longue",
    ],
    expected: ["en lignes et en colonnes"],
    comparator: "mcq_exact",
    hint: "Regarde la forme d’un tableau.",
    explanation:
      "Dans un tableau, les informations sont rangées en lignes et en colonnes. Pour lire une donnée, on croise souvent une ligne et une colonne.",
    tags: ["cm2", "tableau", "lire", "ligne", "colonne", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_3_lire_cellule_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Dans le tableau, combien d’ananas ont été vendus mardi ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Cherche la ligne “Ananas”, puis la colonne “Mardi”.",
    explanation:
      "On lit la ligne “Ananas” et la colonne “Mardi”. La case située au croisement indique 24.",
    tags: ["cm2", "tableau", "lire", "cellule", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      cell: {
        row: 0,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_4_lire_cellule_bananes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Dans le tableau, combien de bananes ont été vendues mercredi ?",
    format: "short",
    expected: ["35"],
    comparator: "number_equal",
    hint: "Croise la ligne “Bananes” avec la colonne “Mercredi”.",
    explanation:
      "La ligne “Bananes” et la colonne “Mercredi” se croisent sur la valeur 35.",
    tags: ["cm2", "tableau", "lire", "cellule", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      cell: {
        row: 1,
        col: 2,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_5_lire_sport_football",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’élèves ont choisi le football ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Cherche la colonne “Football”.",
    explanation:
      "Dans la colonne “Football”, on lit 12. Donc 12 élèves ont choisi le football.",
    tags: ["cm2", "tableau", "lire", "sport", "short", "canvas"],
    canvas: tableauSportCanvas({
      cell: {
        row: 0,
        col: 0,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_6_lire_sport_natation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’élèves ont choisi la natation ?",
    format: "qcm",
    choices: ["7", "9", "10", "12"],
    expected: ["7"],
    comparator: "mcq_exact",
    hint: "Lis la valeur sous “Natation”.",
    explanation:
      "La valeur située sous “Natation” est 7. La bonne réponse est donc 7 élèves.",
    tags: ["cm2", "tableau", "lire", "sport", "qcm", "canvas"],
    canvas: tableauSportCanvas({
      cell: {
        row: 0,
        col: 2,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_7_lire_livres_bd",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de BD ont été lues ?",
    format: "short",
    expected: ["22"],
    comparator: "number_equal",
    hint: "Cherche la colonne “BD”.",
    explanation:
      "Dans la colonne “BD”, on lit 22. Les élèves ont donc lu 22 BD.",
    tags: ["cm2", "tableau", "lire", "livres", "short", "canvas"],
    canvas: tableauBibliothequeCanvas({
      cell: {
        row: 0,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_8_lire_temperature",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Quelle température a été relevée jeudi ?",
    format: "qcm",
    choices: ["28°C", "25°C", "26°C", "27°C"],
    expected: ["28°C"],
    comparator: "mcq_exact",
    hint: "Cherche la colonne “Jeudi”.",
    explanation:
      "Dans la colonne “Jeudi”, on lit 28°C. La température relevée jeudi est donc 28°C.",
    tags: ["cm2", "tableau", "lire", "temperature", "reunion", "qcm", "canvas"],
    canvas: tableauMeteoCanvas({
      cell: {
        row: 0,
        col: 3,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_9_lire_cantine",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Combien d’élèves ont choisi le rougail ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Lis la valeur sous “Rougail”.",
    explanation:
      "Dans la colonne “Rougail”, on lit 14. Donc 14 élèves ont choisi le rougail.",
    tags: ["cm2", "tableau", "lire", "cantine", "reunion", "short", "canvas"],
    canvas: tableauCantineCanvas({
      cell: {
        row: 0,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_10_lire_ligne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Dans le tableau des fruits, quelle ligne faut-il lire pour connaître les ventes de mangues ?",
    format: "qcm",
    choices: ["Mangues", "Ananas", "Bananes", "Mercredi"],
    expected: ["Mangues"],
    comparator: "mcq_exact",
    hint: "La ligne porte le nom du fruit.",
    explanation:
      "Pour connaître les ventes de mangues, il faut lire la ligne “Mangues”.",
    tags: ["cm2", "tableau", "lire", "ligne", "reunion", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      row: 2,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_11_lire_colonne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Dans le tableau des fruits, quelle colonne faut-il lire pour connaître les ventes du mercredi ?",
    format: "qcm",
    choices: ["Mercredi", "Mardi", "Lundi", "Ananas"],
    expected: ["Mercredi"],
    comparator: "mcq_exact",
    hint: "La colonne porte le nom du jour.",
    explanation:
      "Pour connaître les ventes du mercredi, il faut lire la colonne “Mercredi”.",
    tags: ["cm2", "tableau", "lire", "colonne", "reunion", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 2,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_12_unite_caption",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Dans le tableau des fruits, les nombres représentent...",
    format: "qcm",
    choices: [
      "le nombre de fruits vendus",
      "le prix des fruits",
      "la masse des fruits",
      "la température",
    ],
    expected: ["le nombre de fruits vendus"],
    comparator: "mcq_exact",
    hint: "Lis la légende sous le tableau.",
    explanation:
      "La légende indique “Nombre de fruits vendus”. Les nombres du tableau représentent donc des quantités de fruits vendus.",
    tags: ["cm2", "tableau", "lire", "legende", "unite", "reunion", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_13_erreur_ligne_colonne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 3,
    theme: "reunion",
    text: "Un élève cherche les ananas vendus mardi, mais il lit la ligne “Bananes”. Est-ce correct ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut lire la ligne du bon fruit.",
    explanation:
      "Non. Pour connaître les ananas vendus mardi, il faut lire la ligne “Ananas” et la colonne “Mardi”.",
    tags: ["cm2", "tableau", "lire", "erreur", "ligne", "colonne", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      row: 0,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_14_erreur_colonne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève veut lire le nombre d’élèves ayant choisi le basket, mais il regarde la colonne “Danse”. Est-ce correct ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut lire la colonne correspondant à l’activité demandée.",
    explanation:
      "Non. Pour lire le nombre d’élèves ayant choisi le basket, il faut regarder la colonne “Basket”.",
    tags: ["cm2", "tableau", "lire", "erreur", "sport", "qcm", "canvas"],
    canvas: tableauSportCanvas({
      col: 3,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_15_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment lire une donnée dans un tableau.",
    format: "open",
    expected: ["ligne", "colonne", "croiser", "case", "valeur"],
    comparator: "contains_keyword",
    hint: "Parle de la ligne, de la colonne et de la case au croisement.",
    explanation:
      "Pour lire une donnée dans un tableau, on repère la bonne ligne et la bonne colonne. La valeur se trouve dans la case au croisement.",
    tags: ["cm2", "tableau", "lire", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_16_open_pourquoi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi un tableau peut-il aider à mieux comprendre des données ?",
    format: "open",
    expected: ["organise", "lignes", "colonnes", "comparer", "lire"],
    comparator: "contains_keyword",
    hint: "Un tableau range les informations.",
    explanation:
      "Un tableau aide à comprendre des données car il les organise en lignes et en colonnes. On peut alors lire, comparer et retrouver les informations plus facilement.",
    tags: ["cm2", "tableau", "lire", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "cm2_tableau_lire_tpl_1_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la valeur sous l’activité demandée.",
    tags: ["cm2", "tableau", "lire", "sport", "template", "qcm", "canvas"],
    generate: () => {
      const data = [
        { label: "Football", value: 12, col: 0 },
        { label: "Danse", value: 9, col: 1 },
        { label: "Natation", value: 7, col: 2 },
        { label: "Basket", value: 10, col: 3 },
      ];

      const item = randomChoice(data);

      return {
        text: `Combien d’élèves ont choisi ${item.label.toLowerCase()} ?`,
        format: "qcm",
        choices: makeChoices(String(item.value), ["7", "9", "10", "12", "14"]),
        expected: [String(item.value)],
        comparator: "mcq_exact",
        explanation:
          `On lit la colonne “${item.label}”. La valeur indiquée est ${item.value}.`,
        canvas: tableauSportCanvas({
          cell: {
            row: 0,
            col: item.col,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_tableau_lire_tpl_2_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    hint: "Cherche d’abord le fruit, puis le jour.",
    tags: ["cm2", "tableau", "lire", "fruits", "reunion", "template", "short", "canvas"],
    generate: () => {
      const items = [
        { fruit: "ananas", row: 0, jour: "lundi", col: 0, value: 18 },
        { fruit: "ananas", row: 0, jour: "mardi", col: 1, value: 24 },
        { fruit: "ananas", row: 0, jour: "mercredi", col: 2, value: 20 },
        { fruit: "bananes", row: 1, jour: "lundi", col: 0, value: 30 },
        { fruit: "bananes", row: 1, jour: "mardi", col: 1, value: 28 },
        { fruit: "bananes", row: 1, jour: "mercredi", col: 2, value: 35 },
        { fruit: "mangues", row: 2, jour: "lundi", col: 0, value: 12 },
        { fruit: "mangues", row: 2, jour: "mardi", col: 1, value: 15 },
        { fruit: "mangues", row: 2, jour: "mercredi", col: 2, value: 18 },
      ];

      const item = randomChoice(items);

      return {
        text: `Combien de ${item.fruit} ont été vendues ${item.jour} ?`,
        format: "short",
        expected: [String(item.value)],
        comparator: "number_equal",
        explanation:
          `On croise la ligne “${item.fruit}” avec la colonne “${item.jour}”. La valeur est ${item.value}.`,
        canvas: tableauFruitsReunionCanvas({
          cell: {
            row: item.row,
            col: item.col,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_tableau_lire_tpl_3_ligne_colonne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Une ligne se lit horizontalement ; une colonne se lit verticalement.",
    tags: ["cm2", "tableau", "lire", "ligne", "colonne", "template", "qcm", "canvas"],
    generate: () => {
      const askLine = Math.random() < 0.5;

      return {
        text: askLine
          ? "Dans le tableau des fruits, que faut-il lire pour connaître toutes les ventes de bananes ?"
          : "Dans le tableau des fruits, que faut-il lire pour connaître toutes les ventes du mardi ?",
        format: "qcm",
        choices: askLine
          ? ["la ligne Bananes", "la colonne Mardi", "la ligne Ananas", "la colonne Mercredi"]
          : ["la colonne Mardi", "la ligne Bananes", "la colonne Lundi", "la ligne Mangues"],
        expected: [askLine ? "la ligne Bananes" : "la colonne Mardi"],
        comparator: "mcq_exact",
        explanation: askLine
          ? "Pour connaître toutes les ventes de bananes, on lit la ligne “Bananes”."
          : "Pour connaître toutes les ventes du mardi, on lit la colonne “Mardi”.",
        canvas: tableauFruitsReunionCanvas(askLine ? { row: 1 } : { col: 1 }),
      };
    },
  },
    // ============================================================
  // TABLEAU_COMPLETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 1,
    theme: "neutral",
    text: "Compléter un tableau, c’est...",
    format: "qcm",
    choices: [
      "retrouver une information manquante",
      "effacer toutes les lignes",
      "changer les titres au hasard",
      "ne lire que la première case",
    ],
    expected: ["retrouver une information manquante"],
    comparator: "mcq_exact",
    hint: "Il manque une valeur dans le tableau.",
    explanation:
      "Compléter un tableau, c’est retrouver une information manquante en utilisant les données déjà présentes.",
    tags: ["cm2", "tableau", "completer", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_2_lire_avant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 1,
    theme: "neutral",
    text: "Avant de compléter une case d’un tableau, il faut d’abord...",
    format: "qcm",
    choices: [
      "lire le titre de la ligne et de la colonne",
      "choisir un nombre au hasard",
      "effacer le tableau",
      "regarder seulement la dernière case",
    ],
    expected: ["lire le titre de la ligne et de la colonne"],
    comparator: "mcq_exact",
    hint: "Une case dépend de sa ligne et de sa colonne.",
    explanation:
      "Avant de compléter une case, on lit le titre de la ligne et le titre de la colonne. Cela permet de savoir quelle information est demandée.",
    tags: ["cm2", "tableau", "completer", "ligne", "colonne", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_3_fruits_case_manquante",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Dans le tableau, la case des mangues vendues mardi est manquante. Quelle valeur faut-il écrire ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Cherche la ligne “Mangues” et la colonne “Mardi”.",
    explanation:
      "On croise la ligne “Mangues” avec la colonne “Mardi”. La valeur à écrire est 15.",
    tags: ["cm2", "tableau", "completer", "fruits", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      cell: {
        row: 2,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_4_sport_case_manquante",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le tableau, combien d’élèves faut-il écrire pour la danse ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Lis la colonne “Danse”.",
    explanation:
      "Dans la colonne “Danse”, la valeur est 9. Il faut donc écrire 9 élèves.",
    tags: ["cm2", "tableau", "completer", "sport", "short", "canvas"],
    canvas: tableauSportCanvas({
      cell: {
        row: 0,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_5_bibliotheque_case",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le tableau, quelle valeur faut-il écrire pour les documentaires ?",
    format: "qcm",
    choices: ["9", "14", "18", "22"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Cherche la colonne “Documentaires”.",
    explanation:
      "La colonne “Documentaires” indique 9. Il faut donc écrire 9.",
    tags: ["cm2", "tableau", "completer", "livres", "qcm", "canvas"],
    canvas: tableauBibliothequeCanvas({
      cell: {
        row: 0,
        col: 3,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_6_temperature",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Dans le tableau, la température du mardi est manquante. Quelle valeur faut-il écrire ?",
    format: "qcm",
    choices: ["27°C", "25°C", "26°C", "28°C"],
    expected: ["27°C"],
    comparator: "mcq_exact",
    hint: "Regarde la colonne “Mardi”.",
    explanation:
      "Dans la colonne “Mardi”, on lit 27°C. La valeur manquante est donc 27°C.",
    tags: ["cm2", "tableau", "completer", "temperature", "qcm", "canvas"],
    canvas: tableauMeteoCanvas({
      cell: {
        row: 0,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_7_cantine",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Dans le tableau, quelle valeur faut-il écrire pour les élèves ayant choisi le sandwich ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Lis la colonne “Sandwich”.",
    explanation:
      "La colonne “Sandwich” indique 12. Il faut donc écrire 12 élèves.",
    tags: ["cm2", "tableau", "completer", "cantine", "reunion", "short", "canvas"],
    canvas: tableauCantineCanvas({
      cell: {
        row: 0,
        col: 3,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_8_total_simple_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "neutral",
    text: "On veut compléter le total des élèves du tableau : 12 + 9 + 7 + 10. Quel total faut-il écrire ?",
    format: "short",
    expected: ["38"],
    comparator: "number_equal",
    hint: "Additionne toutes les valeurs du tableau.",
    explanation:
      "On additionne les valeurs : 12 + 9 + 7 + 10 = 38. Il faut écrire 38.",
    tags: ["cm2", "tableau", "completer", "total", "sport", "short", "canvas"],
    canvas: tableauSportCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_9_total_livres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "neutral",
    text: "On veut compléter le total des livres lus : 14 + 22 + 18 + 9. Quel total faut-il écrire ?",
    format: "short",
    expected: ["63"],
    comparator: "number_equal",
    hint: "Additionne les nombres de livres.",
    explanation:
      "Calcul : 14 + 22 + 18 + 9 = 63. Le total est donc 63 livres.",
    tags: ["cm2", "tableau", "completer", "total", "livres", "short", "canvas"],
    canvas: tableauBibliothequeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_10_total_fruits_lundi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "reunion",
    text: "On veut compléter le total des fruits vendus lundi : 18 + 30 + 12. Quel total faut-il écrire ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Additionne les valeurs de la colonne “Lundi”.",
    explanation:
      "Dans la colonne “Lundi”, on additionne 18 + 30 + 12 = 60. Le total du lundi est 60 fruits.",
    tags: ["cm2", "tableau", "completer", "total", "fruits", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 0,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_11_total_fruits_mercredi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "reunion",
    text: "On veut compléter le total des fruits vendus mercredi : 20 + 35 + 18. Quel total faut-il écrire ?",
    format: "short",
    expected: ["73"],
    comparator: "number_equal",
    hint: "Additionne les valeurs de la colonne “Mercredi”.",
    explanation:
      "On additionne les fruits du mercredi : 20 + 35 + 18 = 73. Le total est 73 fruits.",
    tags: ["cm2", "tableau", "completer", "total", "fruits", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 2,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_12_completer_par_difference",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une enquête, il y a 40 élèves. 12 ont choisi le football, 9 la danse, 7 la natation. Combien ont choisi le basket ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Additionne les valeurs connues, puis retire ce total à 40.",
    explanation:
      "On additionne les choix connus : 12 + 9 + 7 = 28. Il reste 40 - 28 = 12. Donc 12 élèves ont choisi le basket.",
    tags: ["cm2", "tableau", "completer", "difference", "sport", "short"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_13_erreur_choisir_hasard",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève complète une case manquante sans lire la ligne ni la colonne. Est-ce une bonne méthode ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une valeur du tableau a un sens précis.",
    explanation:
      "Non. Une case du tableau correspond à une ligne et une colonne. Il faut donc lire les deux titres avant de compléter.",
    tags: ["cm2", "tableau", "completer", "erreur", "methode", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_14_erreur_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule le total des activités : 12 + 9 + 7 + 10 = 28. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Refais l’addition.",
    explanation:
      "Non. Le calcul correct est 12 + 9 + 7 + 10 = 38. L’élève a fait une erreur d’addition.",
    tags: ["cm2", "tableau", "completer", "erreur", "total", "qcm", "canvas"],
    canvas: tableauSportCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_15_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment compléter une case manquante dans un tableau.",
    format: "open",
    expected: ["ligne", "colonne", "case", "information", "valeur"],
    comparator: "contains_keyword",
    hint: "Parle de la ligne, de la colonne et de la valeur à écrire.",
    explanation:
      "Pour compléter une case manquante, on repère la ligne et la colonne de cette case. Ensuite, on utilise les informations du tableau ou de l’énoncé pour écrire la valeur correcte.",
    tags: ["cm2", "tableau", "completer", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_16_open_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment compléter une case “Total” dans un tableau.",
    format: "open",
    expected: ["additionner", "valeurs", "ligne", "colonne", "total"],
    comparator: "contains_keyword",
    hint: "Un total s’obtient souvent par addition.",
    explanation:
      "Pour compléter une case “Total”, on additionne les valeurs de la ligne ou de la colonne concernée. Il faut vérifier que l’on additionne les bonnes données.",
    tags: ["cm2", "tableau", "completer", "open", "total", "methode"],
  },

  {
    kind: "template",
    id: "cm2_tableau_completer_tpl_1_cellule_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "reunion",
    hint: "Croise la ligne du fruit avec la colonne du jour.",
    tags: ["cm2", "tableau", "completer", "fruits", "template", "short", "canvas"],
    generate: () => {
      const items = [
        { fruit: "ananas", row: 0, jour: "lundi", col: 0, value: 18 },
        { fruit: "ananas", row: 0, jour: "mardi", col: 1, value: 24 },
        { fruit: "ananas", row: 0, jour: "mercredi", col: 2, value: 20 },
        { fruit: "bananes", row: 1, jour: "lundi", col: 0, value: 30 },
        { fruit: "bananes", row: 1, jour: "mardi", col: 1, value: 28 },
        { fruit: "bananes", row: 1, jour: "mercredi", col: 2, value: 35 },
        { fruit: "mangues", row: 2, jour: "lundi", col: 0, value: 12 },
        { fruit: "mangues", row: 2, jour: "mardi", col: 1, value: 15 },
        { fruit: "mangues", row: 2, jour: "mercredi", col: 2, value: 18 },
      ];

      const item = randomChoice(items);

      return {
        text: `Une case est manquante : ${item.fruit} vendues ${item.jour}. Quelle valeur faut-il écrire ?`,
        format: "short",
        expected: [String(item.value)],
        comparator: "number_equal",
        explanation:
          `On croise la ligne “${item.fruit}” avec la colonne “${item.jour}”. La valeur à écrire est ${item.value}.`,
        canvas: tableauFruitsReunionCanvas({
          cell: {
            row: item.row,
            col: item.col,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_tableau_completer_tpl_2_cellule_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la colonne de l’activité demandée.",
    tags: ["cm2", "tableau", "completer", "sport", "template", "qcm", "canvas"],
    generate: () => {
      const items = [
        { label: "Football", value: 12, col: 0 },
        { label: "Danse", value: 9, col: 1 },
        { label: "Natation", value: 7, col: 2 },
        { label: "Basket", value: 10, col: 3 },
      ];

      const item = randomChoice(items);

      return {
        text: `Quelle valeur faut-il écrire pour l’activité “${item.label}” ?`,
        format: "qcm",
        choices: makeChoices(String(item.value), ["7", "9", "10", "12", "14"]),
        expected: [String(item.value)],
        comparator: "mcq_exact",
        explanation:
          `Dans la colonne “${item.label}”, la valeur à écrire est ${item.value}.`,
        canvas: tableauSportCanvas({
          cell: {
            row: 0,
            col: item.col,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_tableau_completer_tpl_3_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Un total s’obtient en additionnant les valeurs.",
    tags: ["cm2", "tableau", "completer", "total", "template", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Quel total faut-il écrire pour les activités choisies ?",
          values: [12, 9, 7, 10],
          total: 38,
          canvas: tableauSportCanvas,
          explanation:
            "On additionne les activités : 12 + 9 + 7 + 10 = 38.",
        },
        {
          text: "Quel total faut-il écrire pour les livres lus ?",
          values: [14, 22, 18, 9],
          total: 63,
          canvas: tableauBibliothequeCanvas,
          explanation:
            "On additionne les livres : 14 + 22 + 18 + 9 = 63.",
        },
        {
          text: "Quel total faut-il écrire pour les menus choisis à la cantine ?",
          values: [16, 14, 8, 12],
          total: 50,
          canvas: tableauCantineCanvas,
          explanation:
            "On additionne les menus : 16 + 14 + 8 + 12 = 50.",
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
    id: "cm2_tableau_completer_tpl_4_difference",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les valeurs connues, puis soustrais au total.",
    tags: ["cm2", "tableau", "completer", "difference", "template", "short"],
    generate: () => {
      const total = randomChoice([40, 45, 50]);
      const a = randomInt(8, 14);
      const b = randomInt(7, 12);
      const c = randomInt(6, 10);
      const missing = total - a - b - c;

      return {
        text: `Une enquête compte ${total} élèves. Trois choix ont déjà ${a}, ${b} et ${c} élèves. Combien d’élèves manque-t-il pour compléter le tableau ?`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation:
          `On additionne les valeurs connues : ${a} + ${b} + ${c} = ${a + b + c}. Puis on calcule ${total} - ${a + b + c} = ${missing}. Il manque donc ${missing} élèves.`,
      };
    },
  },
    // ============================================================
  // TABLEAU_INTERPRETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 1,
    theme: "neutral",
    text: "Interpréter un tableau, c’est...",
    format: "qcm",
    choices: [
      "utiliser les données pour répondre à une question",
      "copier les nombres sans réfléchir",
      "changer les titres du tableau",
      "ne lire qu’une seule colonne au hasard",
    ],
    expected: ["utiliser les données pour répondre à une question"],
    comparator: "mcq_exact",
    hint: "Interpréter, c’est donner du sens aux données.",
    explanation:
      "Interpréter un tableau, c’est utiliser les données pour répondre à une question, comparer des valeurs ou tirer une conclusion.",
    tags: ["cm2", "tableau", "interpreter", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_2_plus_grand_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle activité a été choisie par le plus d’élèves ?",
    format: "qcm",
    choices: ["Football", "Danse", "Natation", "Basket"],
    expected: ["Football"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre du tableau.",
    explanation:
      "On compare les valeurs : Football 12, Danse 9, Natation 7, Basket 10. Le plus grand nombre est 12, donc l’activité la plus choisie est Football.",
    tags: ["cm2", "tableau", "interpreter", "maximum", "sport", "qcm", "canvas"],
    canvas: tableauSportCanvas({
      cell: {
        row: 0,
        col: 0,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_3_plus_petit_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle activité a été choisie par le moins d’élèves ?",
    format: "qcm",
    choices: ["Natation", "Football", "Danse", "Basket"],
    expected: ["Natation"],
    comparator: "mcq_exact",
    hint: "Cherche le plus petit nombre du tableau.",
    explanation:
      "On compare les valeurs du tableau. Le plus petit nombre est 7, sous “Natation”. L’activité la moins choisie est donc la natation.",
    tags: ["cm2", "tableau", "interpreter", "minimum", "sport", "qcm", "canvas"],
    canvas: tableauSportCanvas({
      cell: {
        row: 0,
        col: 2,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_4_difference_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Combien d’élèves de plus ont choisi le football que la natation ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compare 12 et 7.",
    explanation:
      "Football : 12 élèves. Natation : 7 élèves. La différence est 12 - 7 = 5. Il y a donc 5 élèves de plus pour le football.",
    tags: ["cm2", "tableau", "interpreter", "difference", "sport", "short", "canvas"],
    canvas: tableauSportCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_5_plus_vendu_fruit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel fruit a été le plus vendu mercredi ?",
    format: "qcm",
    choices: ["Bananes", "Ananas", "Mangues", "On ne peut pas savoir"],
    expected: ["Bananes"],
    comparator: "mcq_exact",
    hint: "Lis la colonne “Mercredi” et compare les nombres.",
    explanation:
      "Dans la colonne “Mercredi”, on lit : Ananas 20, Bananes 35, Mangues 18. Le plus grand nombre est 35, donc les bananes ont été les plus vendues.",
    tags: ["cm2", "tableau", "interpreter", "maximum", "fruits", "reunion", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 2,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_6_moins_vendu_fruit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel fruit a été le moins vendu lundi ?",
    format: "qcm",
    choices: ["Mangues", "Ananas", "Bananes", "Tous pareil"],
    expected: ["Mangues"],
    comparator: "mcq_exact",
    hint: "Lis la colonne “Lundi”.",
    explanation:
      "Lundi, on lit : Ananas 18, Bananes 30, Mangues 12. Le plus petit nombre est 12, donc les mangues ont été les moins vendues.",
    tags: ["cm2", "tableau", "interpreter", "minimum", "fruits", "reunion", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 0,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_7_total_ananas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien d’ananas ont été vendus au total sur les trois jours ?",
    format: "short",
    expected: ["62"],
    comparator: "number_equal",
    hint: "Additionne les valeurs de la ligne “Ananas”.",
    explanation:
      "Pour les ananas, on additionne les trois jours : 18 + 24 + 20 = 62. Au total, 62 ananas ont été vendus.",
    tags: ["cm2", "tableau", "interpreter", "total", "fruits", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      row: 0,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_8_total_bananes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de bananes ont été vendues au total sur les trois jours ?",
    format: "short",
    expected: ["93"],
    comparator: "number_equal",
    hint: "Additionne les valeurs de la ligne “Bananes”.",
    explanation:
      "Pour les bananes, on additionne : 30 + 28 + 35 = 93. Le total est donc 93 bananes.",
    tags: ["cm2", "tableau", "interpreter", "total", "fruits", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      row: 1,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_9_total_mercredi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de fruits ont été vendus au total mercredi ?",
    format: "short",
    expected: ["73"],
    comparator: "number_equal",
    hint: "Additionne les valeurs de la colonne “Mercredi”.",
    explanation:
      "Mercredi, on additionne : 20 + 35 + 18 = 73. Le total est donc 73 fruits.",
    tags: ["cm2", "tableau", "interpreter", "total", "fruits", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 2,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_10_difference_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Mardi, combien de bananes de plus que de mangues ont été vendues ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Mardi : bananes 28, mangues 15.",
    explanation:
      "Mardi, 28 bananes et 15 mangues ont été vendues. La différence est 28 - 15 = 13.",
    tags: ["cm2", "tableau", "interpreter", "difference", "fruits", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 1,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_11_temperature_max",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel jour la température a-t-elle été la plus élevée ?",
    format: "qcm",
    choices: ["Jeudi", "Lundi", "Mardi", "Mercredi"],
    expected: ["Jeudi"],
    comparator: "mcq_exact",
    hint: "Cherche la température la plus grande.",
    explanation:
      "Les températures sont 25°C, 27°C, 26°C et 28°C. La plus grande est 28°C, relevée jeudi.",
    tags: ["cm2", "tableau", "interpreter", "temperature", "maximum", "qcm", "canvas"],
    canvas: tableauMeteoCanvas({
      cell: {
        row: 0,
        col: 3,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_12_livres_plus_lus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quel type de livre a été le plus lu ?",
    format: "qcm",
    choices: ["BD", "Romans", "Mangas", "Documentaires"],
    expected: ["BD"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre de livres.",
    explanation:
      "On compare : Romans 14, BD 22, Mangas 18, Documentaires 9. Le plus grand nombre est 22, donc ce sont les BD.",
    tags: ["cm2", "tableau", "interpreter", "livres", "maximum", "qcm", "canvas"],
    canvas: tableauBibliothequeCanvas({
      cell: {
        row: 0,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_13_cantine_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien d’élèves ont répondu à l’enquête sur les menus ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "Additionne tous les choix.",
    explanation:
      "On additionne les choix : 16 + 14 + 8 + 12 = 50. Donc 50 élèves ont répondu.",
    tags: ["cm2", "tableau", "interpreter", "cantine", "total", "reunion", "short", "canvas"],
    canvas: tableauCantineCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_14_cantine_plus_choisi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel menu a été le plus choisi ?",
    format: "qcm",
    choices: ["Cari", "Rougail", "Salade", "Sandwich"],
    expected: ["Cari"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre.",
    explanation:
      "Les choix sont : Cari 16, Rougail 14, Salade 8, Sandwich 12. Le plus choisi est donc le cari.",
    tags: ["cm2", "tableau", "interpreter", "cantine", "maximum", "reunion", "qcm", "canvas"],
    canvas: tableauCantineCanvas({
      cell: {
        row: 0,
        col: 0,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_15_erreur_plus_grand",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que la natation est l’activité la plus choisie. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare toutes les valeurs.",
    explanation:
      "Non. La natation a 7 élèves, alors que le football en a 12. L’activité la plus choisie est le football.",
    tags: ["cm2", "tableau", "interpreter", "erreur", "maximum", "qcm", "canvas"],
    canvas: tableauSportCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_16_erreur_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit que le total des livres lus est 53. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Additionne 14 + 22 + 18 + 9.",
    explanation:
      "Non. Le total correct est 14 + 22 + 18 + 9 = 63. L’élève s’est trompé dans le calcul.",
    tags: ["cm2", "tableau", "interpreter", "erreur", "total", "qcm", "canvas"],
    canvas: tableauBibliothequeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_17_open_interpreter",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment trouver la plus grande valeur dans un tableau.",
    format: "open",
    expected: ["lire", "valeurs", "comparer", "plus grand", "tableau"],
    comparator: "contains_keyword",
    hint: "Il faut lire puis comparer les valeurs.",
    explanation:
      "Pour trouver la plus grande valeur, on lit les valeurs concernées dans le tableau, puis on les compare. La plus grande donne la réponse.",
    tags: ["cm2", "tableau", "interpreter", "open", "maximum", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_18_open_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment calculer un total à partir d’un tableau.",
    format: "open",
    expected: ["additionner", "valeurs", "ligne", "colonne", "total"],
    comparator: "contains_keyword",
    hint: "Un total s’obtient souvent par addition.",
    explanation:
      "Pour calculer un total, on repère les valeurs à utiliser dans une ligne, une colonne ou tout le tableau. Ensuite, on les additionne.",
    tags: ["cm2", "tableau", "interpreter", "open", "total", "methode"],
  },

  {
    kind: "template",
    id: "cm2_tableau_interpreter_tpl_1_max_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le plus grand nombre.",
    tags: ["cm2", "tableau", "interpreter", "maximum", "template", "qcm", "canvas"],
    generate: () => ({
      text: "Quelle activité a été choisie par le plus d’élèves ?",
      format: "qcm",
      choices: shuffle(["Football", "Danse", "Natation", "Basket"]),
      expected: ["Football"],
      comparator: "mcq_exact",
      explanation:
        "On compare les valeurs : 12, 9, 7 et 10. Le plus grand nombre est 12, donc la réponse est Football.",
      canvas: tableauSportCanvas({
        cell: {
          row: 0,
          col: 0,
        },
      }),
    }),
  },

  {
    kind: "template",
    id: "cm2_tableau_interpreter_tpl_2_total_fruits_jour",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    hint: "Additionne les valeurs de la colonne demandée.",
    tags: ["cm2", "tableau", "interpreter", "total", "fruits", "reunion", "template", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          jour: "lundi",
          col: 0,
          values: [18, 30, 12],
          total: 60,
        },
        {
          jour: "mardi",
          col: 1,
          values: [24, 28, 15],
          total: 67,
        },
        {
          jour: "mercredi",
          col: 2,
          values: [20, 35, 18],
          total: 73,
        },
      ]);

      return {
        text: `Combien de fruits ont été vendus au total ${item.jour} ?`,
        format: "short",
        expected: [String(item.total)],
        comparator: "number_equal",
        explanation:
          `On additionne les valeurs de la colonne “${item.jour}” : ${item.values.join(" + ")} = ${item.total}.`,
        canvas: tableauFruitsReunionCanvas({
          col: item.col,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_tableau_interpreter_tpl_3_difference",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour comparer deux valeurs, on peut soustraire.",
    tags: ["cm2", "tableau", "interpreter", "difference", "template", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          aName: "Football",
          a: 12,
          bName: "Natation",
          b: 7,
          diff: 5,
          canvas: tableauSportCanvas,
        },
        {
          aName: "BD",
          a: 22,
          bName: "Documentaires",
          b: 9,
          diff: 13,
          canvas: tableauBibliothequeCanvas,
        },
        {
          aName: "Cari",
          a: 16,
          bName: "Salade",
          b: 8,
          diff: 8,
          canvas: tableauCantineCanvas,
        },
      ]);

      return {
        text: `Combien y a-t-il de différence entre ${item.aName} et ${item.bName} ?`,
        format: "short",
        expected: [String(item.diff)],
        comparator: "number_equal",
        explanation:
          `On calcule la différence : ${item.a} - ${item.b} = ${item.diff}.`,
        canvas: item.canvas(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_tableau_interpreter_tpl_4_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie la lecture ou le calcul.",
    tags: ["cm2", "tableau", "interpreter", "erreur", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un élève dit que la natation est l’activité la plus choisie. A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. La natation a 7 élèves, alors que le football en a 12.",
          canvas: tableauSportCanvas,
        },
        {
          text: "Un élève dit que les BD sont les livres les plus lus. A-t-il raison ?",
          expected: "oui",
          explanation:
            "Oui. Les BD ont la valeur 22, qui est la plus grande du tableau.",
          canvas: tableauBibliothequeCanvas,
        },
        {
          text: "Un élève dit que le menu Salade est le plus choisi. A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Salade a 8 élèves, alors que Cari en a 16.",
          canvas: tableauCantineCanvas,
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas(),
      };
    },
  },
  // ============================================================
  // TABLEAU_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_1_question_mixte_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Au marché, quel jour a-t-on vendu le plus de fruits au total ?",
    format: "qcm",
    choices: ["Mercredi", "Mardi", "Lundi", "On ne peut pas savoir"],
    expected: ["Mercredi"],
    comparator: "mcq_exact",
    hint: "Calcule le total de chaque colonne.",
    explanation:
      "On calcule les totaux par jour : lundi 18 + 30 + 12 = 60, mardi 24 + 28 + 15 = 67, mercredi 20 + 35 + 18 = 73. Le plus grand total est mercredi.",
    tags: ["cm2", "tableau", "defi", "fruits", "reunion", "total", "maximum", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 2,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_2_question_mixte_fruits_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Combien de fruits ont été vendus au total sur les trois jours ?",
    format: "short",
    expected: ["200"],
    comparator: "number_equal",
    hint: "Additionne les totaux des trois jours.",
    explanation:
      "On peut additionner par colonnes : lundi 60, mardi 67, mercredi 73. Donc 60 + 67 + 73 = 200 fruits vendus au total.",
    tags: ["cm2", "tableau", "defi", "fruits", "reunion", "total", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_3_difference_jours",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Combien de fruits de plus ont été vendus mercredi que lundi ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Calcule le total du mercredi, le total du lundi, puis compare.",
    explanation:
      "Le total du mercredi est 73. Le total du lundi est 60. La différence est 73 - 60 = 13.",
    tags: ["cm2", "tableau", "defi", "fruits", "difference", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_4_livres_conclusion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle conclusion est correcte à partir du tableau des livres lus ?",
    format: "qcm",
    choices: [
      "Les BD sont les livres les plus lus",
      "Les documentaires sont les livres les plus lus",
      "Les romans sont plus lus que les mangas",
      "Tous les types de livres ont été lus autant de fois",
    ],
    expected: ["Les BD sont les livres les plus lus"],
    comparator: "mcq_exact",
    hint: "Cherche la plus grande valeur du tableau.",
    explanation:
      "On compare les valeurs : Romans 14, BD 22, Mangas 18, Documentaires 9. La plus grande valeur est 22 : les BD sont donc les livres les plus lus.",
    tags: ["cm2", "tableau", "defi", "livres", "conclusion", "maximum", "qcm", "canvas"],
    canvas: tableauBibliothequeCanvas({
      cell: {
        row: 0,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_5_cantine_ecart",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À la cantine, combien d’élèves de plus ont choisi le cari que la salade ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Compare 16 et 8.",
    explanation:
      "Cari : 16 élèves. Salade : 8 élèves. On calcule 16 - 8 = 8. Il y a donc 8 élèves de plus pour le cari.",
    tags: ["cm2", "tableau", "defi", "cantine", "difference", "reunion", "short", "canvas"],
    canvas: tableauCantineCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_6_temperature_ecart",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Quel est l’écart entre la température la plus haute et la plus basse ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Trouve la plus grande température et la plus petite, puis soustrais.",
    explanation:
      "La température la plus haute est 28°C et la plus basse est 25°C. L’écart est 28 - 25 = 3°C.",
    tags: ["cm2", "tableau", "defi", "temperature", "ecart", "reunion", "short", "canvas"],
    canvas: tableauMeteoCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_7_erreur_conclusion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “Le basket est l’activité la plus choisie.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare les quatre valeurs du tableau.",
    explanation:
      "Non. Le basket a été choisi par 10 élèves, mais le football a été choisi par 12 élèves. Le football est donc l’activité la plus choisie.",
    tags: ["cm2", "tableau", "defi", "erreur", "conclusion", "qcm", "canvas"],
    canvas: tableauSportCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_8_erreur_total_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Un élève dit : “Au total, 190 fruits ont été vendus.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Additionne toutes les valeurs du tableau.",
    explanation:
      "Non. Le total correct est 18 + 24 + 20 + 30 + 28 + 35 + 12 + 15 + 18 = 200. L’élève s’est trompé dans son total.",
    tags: ["cm2", "tableau", "defi", "erreur", "total", "fruits", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_9_question_a_deux_etapes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans le tableau des activités, combien d’élèves ont choisi un sport collectif : football ou basket ?",
    format: "short",
    expected: ["22"],
    comparator: "number_equal",
    hint: "Additionne seulement football et basket.",
    explanation:
      "Football : 12 élèves. Basket : 10 élèves. On additionne 12 + 10 = 22. Donc 22 élèves ont choisi football ou basket.",
    tags: ["cm2", "tableau", "defi", "deux_etapes", "sport", "short", "canvas"],
    canvas: tableauSportCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_10_question_a_deux_etapes_livres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien de livres de loisirs ont été lus si on regroupe BD et mangas ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "Additionne BD et mangas.",
    explanation:
      "BD : 22 livres. Mangas : 18 livres. Donc 22 + 18 = 40 livres de loisirs.",
    tags: ["cm2", "tableau", "defi", "livres", "regrouper", "short", "canvas"],
    canvas: tableauBibliothequeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_11_open_methode_defi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique une méthode pour résoudre un problème à partir d’un tableau.",
    format: "open",
    expected: ["question", "ligne", "colonne", "valeurs", "calcul", "réponse"],
    comparator: "contains_keyword",
    hint: "Commence par lire la question, puis repère les bonnes données.",
    explanation:
      "Méthode : d’abord, on lit bien la question. Ensuite, on repère les lignes et colonnes utiles. Puis on lit les valeurs nécessaires, on fait le calcul demandé, et on rédige une réponse claire.",
    tags: ["cm2", "tableau", "defi", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_12_open_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi il ne faut pas répondre à une question de tableau en prenant un nombre au hasard.",
    format: "open",
    expected: ["ligne", "colonne", "question", "donnée", "vérifier"],
    comparator: "contains_keyword",
    hint: "Une valeur du tableau correspond toujours à une information précise.",
    explanation:
      "Chaque nombre du tableau a un sens : il dépend d’une ligne et d’une colonne. Pour répondre correctement, il faut lire la question, repérer la bonne donnée et vérifier que la valeur utilisée correspond bien à ce qui est demandé.",
    tags: ["cm2", "tableau", "defi", "open", "erreur", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_13_open_conclusion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "neutral",
    text: "À partir du tableau des activités, rédige une conclusion vraie.",
    format: "open",
    expected: ["football", "12", "natation", "7", "plus", "moins"],
    comparator: "contains_keyword",
    hint: "Tu peux parler de l’activité la plus choisie ou la moins choisie.",
    explanation:
      "Exemples de conclusions vraies : le football est l’activité la plus choisie avec 12 élèves ; la natation est l’activité la moins choisie avec 7 élèves.",
    tags: ["cm2", "tableau", "defi", "open", "conclusion", "sport", "canvas"],
    canvas: tableauSportCanvas(),
  },

  {
    kind: "template",
    id: "cm2_tableau_defi_tpl_1_totaux_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Additionne les valeurs de la ligne ou de la colonne demandée.",
    tags: ["cm2", "tableau", "defi", "fruits", "total", "template", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Combien d’ananas ont été vendus au total ?",
          total: 62,
          highlight: { row: 0 },
          explanation: "On additionne la ligne Ananas : 18 + 24 + 20 = 62.",
        },
        {
          text: "Combien de bananes ont été vendues au total ?",
          total: 93,
          highlight: { row: 1 },
          explanation: "On additionne la ligne Bananes : 30 + 28 + 35 = 93.",
        },
        {
          text: "Combien de fruits ont été vendus mardi ?",
          total: 67,
          highlight: { col: 1 },
          explanation: "On additionne la colonne Mardi : 24 + 28 + 15 = 67.",
        },
        {
          text: "Combien de fruits ont été vendus mercredi ?",
          total: 73,
          highlight: { col: 2 },
          explanation: "On additionne la colonne Mercredi : 20 + 35 + 18 = 73.",
        },
      ]);

      return {
        text: item.text,
        format: "short",
        expected: [String(item.total)],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: tableauFruitsReunionCanvas(item.highlight),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_tableau_defi_tpl_2_plus_moins",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les valeurs du tableau.",
    tags: ["cm2", "tableau", "defi", "maximum", "minimum", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Dans le tableau des activités, quelle activité est la plus choisie ?",
          correct: "Football",
          choices: ["Football", "Danse", "Natation", "Basket"],
          explanation: "Le football a la plus grande valeur : 12.",
          canvas: tableauSportCanvas({ cell: { row: 0, col: 0 } }),
        },
        {
          text: "Dans le tableau des activités, quelle activité est la moins choisie ?",
          correct: "Natation",
          choices: ["Football", "Danse", "Natation", "Basket"],
          explanation: "La natation a la plus petite valeur : 7.",
          canvas: tableauSportCanvas({ cell: { row: 0, col: 2 } }),
        },
        {
          text: "Dans le tableau des livres, quel type de livre est le plus lu ?",
          correct: "BD",
          choices: ["Romans", "BD", "Mangas", "Documentaires"],
          explanation: "Les BD ont la plus grande valeur : 22.",
          canvas: tableauBibliothequeCanvas({ cell: { row: 0, col: 1 } }),
        },
        {
          text: "Dans le tableau de la cantine, quel menu est le moins choisi ?",
          correct: "Salade",
          choices: ["Cari", "Rougail", "Salade", "Sandwich"],
          explanation: "La salade a la plus petite valeur : 8.",
          canvas: tableauCantineCanvas({ cell: { row: 0, col: 2 } }),
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
    id: "cm2_tableau_defi_tpl_3_differences",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Pour trouver un écart, on soustrait la plus petite valeur à la plus grande.",
    tags: ["cm2", "tableau", "defi", "difference", "template", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Combien d’élèves de plus ont choisi le football que la danse ?",
          expected: 3,
          explanation: "Football : 12, Danse : 9. La différence est 12 - 9 = 3.",
          canvas: tableauSportCanvas(),
        },
        {
          text: "Combien de BD de plus que de romans ont été lues ?",
          expected: 8,
          explanation: "BD : 22, Romans : 14. La différence est 22 - 14 = 8.",
          canvas: tableauBibliothequeCanvas(),
        },
        {
          text: "Combien d’élèves de plus ont choisi le cari que le rougail ?",
          expected: 2,
          explanation: "Cari : 16, Rougail : 14. La différence est 16 - 14 = 2.",
          canvas: tableauCantineCanvas(),
        },
        {
          text: "Quel est l’écart entre la température de jeudi et celle de lundi ?",
          expected: 3,
          explanation: "Jeudi : 28°C, lundi : 25°C. L’écart est 28 - 25 = 3°C.",
          canvas: tableauMeteoCanvas(),
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
    id: "cm2_tableau_defi_tpl_4_erreurs",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Relis la donnée du tableau ou refais le calcul.",
    tags: ["cm2", "tableau", "defi", "erreur", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un élève dit : “La natation est l’activité la plus choisie.” A-t-il raison ?",
          expected: "non",
          explanation: "Non. La natation a 7 élèves, alors que le football en a 12.",
          canvas: tableauSportCanvas(),
        },
        {
          text: "Un élève dit : “Les BD sont les livres les plus lus.” A-t-il raison ?",
          expected: "oui",
          explanation: "Oui. Les BD ont la plus grande valeur : 22.",
          canvas: tableauBibliothequeCanvas(),
        },
        {
          text: "Un élève dit : “Il y a 50 élèves dans l’enquête de cantine.” A-t-il raison ?",
          expected: "oui",
          explanation: "Oui. Le total est 16 + 14 + 8 + 12 = 50.",
          canvas: tableauCantineCanvas(),
        },
        {
          text: "Un élève dit : “Le total des activités est 28.” A-t-il raison ?",
          expected: "non",
          explanation: "Non. Le total correct est 12 + 9 + 7 + 10 = 38.",
          canvas: tableauSportCanvas(),
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