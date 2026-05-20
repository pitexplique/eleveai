// lib/tutor-v4/question-banks/maths/cm1/tableaux.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

type CellValue = string | number;

type TableauDonneesCanvasData = {
  kind: "tableau_donnees";
  title?: string;
  caption?: string;
  headers: string[];
  rows: {
    label?: string;
    values: CellValue[];
  }[];
  highlight?: {
    row?: number;
    col?: number;
    cell?: {
      row: number;
      col: number;
    };
  };
  display?: {
    compact?: boolean;
    striped?: boolean;
  };
  questionLabel?: string;
};

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

function tableauCanvas(
  data: Omit<TableauDonneesCanvasData, "kind">
): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    ...data,
  };
}

const CONTEXTES_FRUITS = [
  ["Mangues", "Ananas", "Bananes"],
  ["Letchis", "Papayes", "Goyaviers"],
  ["Citrons", "Avocats", "Cocos"],
];

const CONTEXTES_SPORTS = [
  ["Football", "Danse", "Natation"],
  ["Basket", "Course", "Tennis"],
  ["Surf", "Volley", "Randonnée"],
];

const CONTEXTES_ECOLE = [
  ["CM1 A", "CM1 B", "CM1 C"],
  ["Groupe 1", "Groupe 2", "Groupe 3"],
  ["Lundi", "Mardi", "Mercredi"],
];

export const tableauxBank: TutorBankItemV4[] = [
  // ============================================================
  // TABLEAU_LIRE
  // Lire une information directe dans un tableau
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_1_activites",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans le tableau, combien d’élèves ont choisi la natation ?",
    format: "qcm",
    choices: ["10", "8", "12", "30"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Cherche la colonne Natation.",
    explanation: exp(
      "Un tableau organise des informations en lignes et en colonnes.",
      "On repère la colonne demandée, puis on lit la valeur.",
      "Dans la colonne Natation, on lit 10.",
      "10 élèves ont choisi la natation."
    ),
    tags: ["cm1", "tableau", "lire", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Activités préférées",
      headers: ["Football", "Danse", "Natation"],
      rows: [
        {
          label: "Élèves",
          values: [12, 8, 10],
        },
      ],
      highlight: {
        cell: { row: 0, col: 2 },
      },
      questionLabel: "Combien d’élèves ont choisi la natation ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_2_fruits_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Au marché, combien de mangues ont été vendues le matin ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Regarde la ligne Matin et la colonne Mangues.",
    explanation: exp(
      "Pour lire un tableau, il faut croiser une ligne et une colonne.",
      "On cherche la ligne Matin et la colonne Mangues.",
      "À l’intersection, on lit 18.",
      "18 mangues ont été vendues le matin."
    ),
    tags: ["cm1", "tableau", "lire", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes au marché",
      headers: ["Mangues", "Ananas", "Bananes"],
      rows: [
        {
          label: "Matin",
          values: [18, 12, 25],
        },
        {
          label: "Après-midi",
          values: [14, 10, 20],
        },
      ],
      highlight: {
        cell: { row: 0, col: 0 },
      },
      questionLabel: "Combien de mangues le matin ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_3_classes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’élèves y a-t-il en CM1 B ?",
    format: "qcm",
    choices: ["24", "26", "22", "72"],
    expected: ["24"],
    comparator: "mcq_exact",
    hint: "Cherche la colonne CM1 B.",
    explanation: exp(
      "Un tableau permet de retrouver rapidement une information.",
      "On repère la colonne CM1 B.",
      "Dans cette colonne, on lit 24.",
      "Il y a 24 élèves en CM1 B."
    ),
    tags: ["cm1", "tableau", "lire", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Effectifs des classes",
      headers: ["CM1 A", "CM1 B", "CM1 C"],
      rows: [
        {
          label: "Élèves",
          values: [22, 24, 26],
        },
      ],
      highlight: {
        cell: { row: 0, col: 1 },
      },
      questionLabel: "Combien d’élèves en CM1 B ?",
    }),
  },

  {
    kind: "template",
    id: "cm1_tableau_lire_tpl_1_ligne_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Repère la bonne colonne, puis lis la valeur.",
    tags: ["cm1", "tableau", "lire", "template", "qcm", "canvas"],
    generate: () => {
      const headers = randomChoice([
        ...CONTEXTES_SPORTS,
        ...CONTEXTES_FRUITS,
        ...CONTEXTES_ECOLE,
      ]);

      const values = [
        randomInt(8, 18),
        randomInt(8, 18),
        randomInt(8, 18),
      ];

      const col = randomInt(0, 2);
      const correct = String(values[col]);

      return {
        text: `Dans le tableau, quelle est la valeur pour ${headers[col]} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(values[(col + 1) % 3]),
          String(values[(col + 2) % 3]),
          String(values.reduce((a, b) => a + b, 0)),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Lire un tableau, c’est retrouver une information rangée.",
          "On cherche la colonne demandée.",
          `Dans la colonne ${headers[col]}, on lit ${correct}.`,
          `La réponse est ${correct}.`
        ),
        canvas: tableauCanvas({
          title: "Lecture de tableau",
          headers,
          rows: [
            {
              label: "Valeur",
              values,
            },
          ],
          highlight: {
            cell: { row: 0, col },
          },
          questionLabel: `Valeur pour ${headers[col]} ?`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tableau_lire_tpl_2_deux_lignes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    hint: "Cherche d’abord la bonne ligne, puis la bonne colonne.",
    tags: ["cm1", "tableau", "lire", "deux_lignes", "template", "canvas"],
    generate: () => {
      const headers = randomChoice(CONTEXTES_FRUITS);
      const rows = ["Matin", "Après-midi"];
      const values = [
        [randomInt(10, 30), randomInt(10, 30), randomInt(10, 30)],
        [randomInt(10, 30), randomInt(10, 30), randomInt(10, 30)],
      ];

      const row = randomInt(0, 1);
      const col = randomInt(0, 2);
      const correct = String(values[row][col]);

      return {
        text: `Au marché, combien de ${headers[col].toLowerCase()} ont été vendus ${rows[row].toLowerCase()} ?`,
        format: "short",
        expected: [correct],
        comparator: "number_equal",
        explanation: exp(
          "Dans un tableau à plusieurs lignes, il faut croiser deux informations.",
          "On repère la bonne ligne et la bonne colonne.",
          `Ligne ${rows[row]}, colonne ${headers[col]} : on lit ${correct}.`,
          `La réponse est ${correct}.`
        ),
        canvas: tableauCanvas({
          title: "Ventes au marché",
          headers,
          rows: [
            {
              label: rows[0],
              values: values[0],
            },
            {
              label: rows[1],
              values: values[1],
            },
          ],
          highlight: {
            cell: { row, col },
          },
          questionLabel: `${headers[col]} — ${rows[row]}`,
        }),
      };
    },
  },

  // ============================================================
  // TABLEAU_COMPLETER
  // Compléter une case manquante ou retrouver une valeur
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_1_total_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Le total est 40 fruits. Il y a 15 mangues et 10 ananas. Combien y a-t-il de bananes ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Additionne les fruits connus, puis complète jusqu’à 40.",
    explanation: exp(
      "Compléter un tableau, c’est retrouver une information manquante.",
      "On additionne d’abord les valeurs connues.",
      "15 + 10 = 25, puis 40 - 25 = 15.",
      "Il manque 15 bananes."
    ),
    tags: ["cm1", "tableau", "completer", "total", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Fruits vendus",
      headers: ["Mangues", "Ananas", "Bananes", "Total"],
      rows: [
        {
          label: "Quantité",
          values: [15, 10, "?", 40],
        },
      ],
      highlight: {
        cell: { row: 0, col: 2 },
      },
      questionLabel: "Quelle valeur manque ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_2_sport_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "sport",
    text: "Dans une classe, 9 élèves choisissent le foot, 7 la danse et 8 la natation. Quel est le total ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Additionne les trois nombres.",
    explanation: exp(
      "Pour compléter un total, on additionne toutes les valeurs.",
      "On ajoute les élèves de chaque activité.",
      "9 + 7 + 8 = 24.",
      "Le total est 24 élèves."
    ),
    tags: ["cm1", "tableau", "completer", "total", "sport", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Activités choisies",
      headers: ["Football", "Danse", "Natation", "Total"],
      rows: [
        {
          label: "Élèves",
          values: [9, 7, 8, "?"],
        },
      ],
      highlight: {
        cell: { row: 0, col: 3 },
      },
      questionLabel: "Quel est le total ?",
    }),
  },

  {
    kind: "template",
    id: "cm1_tableau_completer_tpl_1_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour trouver un total, additionne toutes les valeurs.",
    tags: ["cm1", "tableau", "completer", "total", "template", "canvas"],
    generate: () => {
      const headers = randomChoice([
        ...CONTEXTES_SPORTS,
        ...CONTEXTES_FRUITS,
      ]);

      const a = randomInt(5, 20);
      const b = randomInt(5, 20);
      const c = randomInt(5, 20);
      const total = a + b + c;

      return {
        text: `Complète le total du tableau : ${a} + ${b} + ${c} = ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un total regroupe toutes les valeurs.",
          "On additionne les nombres du tableau.",
          `${a} + ${b} + ${c} = ${total}.`,
          `Le total est ${total}.`
        ),
        canvas: tableauCanvas({
          title: "Compléter le total",
          headers: [...headers, "Total"],
          rows: [
            {
              label: "Quantité",
              values: [a, b, c, "?"],
            },
          ],
          highlight: {
            cell: { row: 0, col: 3 },
          },
          questionLabel: "Complète le total.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tableau_completer_tpl_2_valeur_manquante",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les valeurs connues, puis soustrais au total.",
    tags: ["cm1", "tableau", "completer", "valeur_manquante", "template", "canvas"],
    generate: () => {
      const headers = randomChoice([
        ...CONTEXTES_FRUITS,
        ...CONTEXTES_SPORTS,
      ]);

      const a = randomInt(8, 18);
      const b = randomInt(8, 18);
      const missing = randomInt(8, 18);
      const total = a + b + missing;

      const missingCol = randomInt(0, 2);
      const values: CellValue[] =
        missingCol === 0
          ? ["?", a, b, total]
          : missingCol === 1
            ? [a, "?", b, total]
            : [a, b, "?", total];

      const knownSum = total - missing;

      return {
        text: `Le total est ${total}. Quelle valeur manque dans le tableau ?`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Pour retrouver une valeur manquante, on utilise le total.",
          "On additionne les valeurs connues, puis on soustrait au total.",
          `${total} - ${knownSum} = ${missing}.`,
          `La valeur manquante est ${missing}.`
        ),
        canvas: tableauCanvas({
          title: "Valeur manquante",
          headers: [...headers, "Total"],
          rows: [
            {
              label: "Quantité",
              values,
            },
          ],
          highlight: {
            cell: { row: 0, col: missingCol },
          },
          questionLabel: "Quelle valeur manque ?",
        }),
      };
    },
  },

  // ============================================================
  // TABLEAU_INTERPRETER
  // Comprendre, comparer, totaliser, déduire
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_1_plus_grand",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "sport",
    text: "Quelle activité est la plus choisie ?",
    format: "qcm",
    choices: ["Football", "Danse", "Natation", "On ne peut pas savoir"],
    expected: ["Football"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre.",
    explanation: exp(
      "Interpréter un tableau, c’est utiliser les informations pour répondre.",
      "Pour trouver l’activité la plus choisie, on cherche le plus grand nombre.",
      "Football : 16, Danse : 9, Natation : 12. Le plus grand nombre est 16.",
      "L’activité la plus choisie est Football."
    ),
    tags: ["cm1", "tableau", "interpreter", "comparer", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Activités choisies",
      headers: ["Football", "Danse", "Natation"],
      rows: [
        {
          label: "Élèves",
          values: [16, 9, 12],
        },
      ],
      highlight: {
        cell: { row: 0, col: 0 },
      },
      questionLabel: "Quelle activité est la plus choisie ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_2_difference",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il d’élèves de plus en CM1 C qu’en CM1 A ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Compare 26 et 22.",
    explanation: exp(
      "Comparer deux valeurs, c’est souvent chercher une différence.",
      "On soustrait la plus petite valeur à la plus grande.",
      "26 - 22 = 4.",
      "Il y a 4 élèves de plus en CM1 C."
    ),
    tags: ["cm1", "tableau", "interpreter", "difference", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Effectifs",
      headers: ["CM1 A", "CM1 B", "CM1 C"],
      rows: [
        {
          label: "Élèves",
          values: [22, 24, 26],
        },
      ],
      highlight: {
        row: 0,
      },
      questionLabel: "Différence entre CM1 C et CM1 A ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_3_total_deux_lignes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de fruits ont été vendus en tout le matin ?",
    format: "short",
    expected: ["55"],
    comparator: "number_equal",
    hint: "Additionne toute la ligne Matin.",
    explanation: exp(
      "Pour interpréter une ligne du tableau, on peut additionner ses valeurs.",
      "On additionne les fruits vendus le matin.",
      "18 + 12 + 25 = 55.",
      "55 fruits ont été vendus le matin."
    ),
    tags: ["cm1", "tableau", "interpreter", "total_ligne", "reunion", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes au marché",
      headers: ["Mangues", "Ananas", "Bananes"],
      rows: [
        {
          label: "Matin",
          values: [18, 12, 25],
        },
        {
          label: "Après-midi",
          values: [14, 10, 20],
        },
      ],
      highlight: {
        row: 0,
      },
      questionLabel: "Total du matin ?",
    }),
  },

  {
    kind: "template",
    id: "cm1_tableau_interpreter_tpl_1_plus_grand",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la plus grande valeur du tableau.",
    tags: ["cm1", "tableau", "interpreter", "plus_grand", "template", "canvas"],
    generate: () => {
      const headers = randomChoice([
        ...CONTEXTES_SPORTS,
        ...CONTEXTES_FRUITS,
      ]);

      const values = shuffle([randomInt(6, 10), randomInt(11, 15), randomInt(16, 22)]);
      const max = Math.max(...values);
      const col = values.indexOf(max);
      const correct = headers[col];

      return {
        text: "Quelle catégorie a la plus grande valeur ?",
        format: "qcm",
        choices: makeChoices(correct, headers.filter((h) => h !== correct)),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver la plus grande catégorie, on compare les nombres.",
          "On cherche le nombre le plus grand.",
          `Les valeurs sont ${values.join(", ")}. Le plus grand nombre est ${max}.`,
          `La catégorie la plus grande est ${correct}.`
        ),
        canvas: tableauCanvas({
          title: "Comparer des données",
          headers,
          rows: [
            {
              label: "Valeur",
              values,
            },
          ],
          highlight: {
            cell: { row: 0, col },
          },
          questionLabel: "Quelle catégorie est la plus grande ?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tableau_interpreter_tpl_2_difference",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour trouver l’écart, fais une soustraction.",
    tags: ["cm1", "tableau", "interpreter", "difference", "template", "canvas"],
    generate: () => {
      const headers = randomChoice([
        ...CONTEXTES_ECOLE,
        ...CONTEXTES_SPORTS,
      ]);

      const small = randomInt(8, 15);
      const diff = randomInt(3, 9);
      const big = small + diff;
      const other = randomInt(8, 22);

      const values = [small, big, other];
      const correct = String(diff);

      return {
        text: `Quelle est la différence entre ${headers[1]} et ${headers[0]} ?`,
        format: "short",
        expected: [correct],
        comparator: "number_equal",
        explanation: exp(
          "Une différence se calcule avec une soustraction.",
          "On soustrait la plus petite valeur à la plus grande.",
          `${big} - ${small} = ${diff}.`,
          `La différence est ${diff}.`
        ),
        canvas: tableauCanvas({
          title: "Comparer deux valeurs",
          headers,
          rows: [
            {
              label: "Valeur",
              values,
            },
          ],
          highlight: {
            col: 1,
          },
          questionLabel: `Différence entre ${headers[1]} et ${headers[0]} ?`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tableau_interpreter_tpl_3_total_ligne",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    hint: "Additionne les trois valeurs de la ligne demandée.",
    tags: ["cm1", "tableau", "interpreter", "total_ligne", "template", "canvas"],
    generate: () => {
      const headers = randomChoice(CONTEXTES_FRUITS);
      const rowLabels = ["Matin", "Après-midi"];
      const row = randomInt(0, 1);

      const values = [
        [randomInt(5, 20), randomInt(5, 20), randomInt(5, 20)],
        [randomInt(5, 20), randomInt(5, 20), randomInt(5, 20)],
      ];

      const total = values[row].reduce((a, b) => a + b, 0);

      return {
        text: `Quel est le total de la ligne ${rowLabels[row]} ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour trouver le total d’une ligne, on additionne ses valeurs.",
          "On utilise seulement les nombres de la ligne demandée.",
          `${values[row].join(" + ")} = ${total}.`,
          `Le total de la ligne ${rowLabels[row]} est ${total}.`
        ),
        canvas: tableauCanvas({
          title: "Tableau de ventes",
          headers,
          rows: [
            {
              label: rowLabels[0],
              values: values[0],
            },
            {
              label: rowLabels[1],
              values: values[1],
            },
          ],
          highlight: {
            row,
          },
          questionLabel: `Total de la ligne ${rowLabels[row]} ?`,
        }),
      };
    },
  },

  // ============================================================
  // TABLEAU_DEFI
  // Petits problèmes à 2 étapes maximum
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_1_total_journee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché, combien de fruits ont été vendus en tout dans la journée ?",
    format: "short",
    expected: ["99"],
    comparator: "number_equal",
    hint: "Additionne toutes les valeurs du tableau.",
    explanation: exp(
      "Un défi avec tableau peut demander d’utiliser plusieurs cases.",
      "Ici, on additionne toutes les ventes du matin et de l’après-midi.",
      "18 + 12 + 25 + 14 + 10 + 20 = 99.",
      "99 fruits ont été vendus dans la journée."
    ),
    tags: ["cm1", "tableau", "defi", "total_general", "reunion", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes au marché",
      headers: ["Mangues", "Ananas", "Bananes"],
      rows: [
        {
          label: "Matin",
          values: [18, 12, 25],
        },
        {
          label: "Après-midi",
          values: [14, 10, 20],
        },
      ],
      questionLabel: "Total de toute la journée ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_2_comparer_totaux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle classe a vendu le plus de tickets en tout ?",
    format: "qcm",
    choices: ["CM1 A", "CM1 B", "CM1 C", "Elles ont vendu pareil"],
    expected: ["CM1 B"],
    comparator: "mcq_exact",
    hint: "Calcule le total de chaque classe.",
    explanation: exp(
      "Pour comparer plusieurs lignes, on calcule d’abord chaque total.",
      "On additionne les valeurs de chaque classe.",
      "CM1 A : 12 + 9 = 21. CM1 B : 10 + 15 = 25. CM1 C : 8 + 11 = 19.",
      "La classe qui a vendu le plus est CM1 B."
    ),
    tags: ["cm1", "tableau", "defi", "comparer_totaux", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Vente de tickets",
      headers: ["Matin", "Après-midi"],
      rows: [
        {
          label: "CM1 A",
          values: [12, 9],
        },
        {
          label: "CM1 B",
          values: [10, 15],
        },
        {
          label: "CM1 C",
          values: [8, 11],
        },
      ],
      highlight: {
        row: 1,
      },
      questionLabel: "Quelle classe a vendu le plus ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_3_ecart_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "sport",
    text: "Combien d’élèves de plus ont choisi un sport collectif qu’un sport individuel ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Calcule chaque total, puis fais la différence.",
    explanation: exp(
      "Un défi peut demander deux étapes : totaliser puis comparer.",
      "On calcule les deux totaux, puis on cherche la différence.",
      "Sports collectifs : 14 + 12 = 26. Sports individuels : 9 + 11 = 20. Différence : 26 - 20 = 6.",
      "Il y a 6 élèves de plus pour les sports collectifs."
    ),
    tags: ["cm1", "tableau", "defi", "sport", "difference_totaux", "canvas"],
    canvas: tableauCanvas({
      title: "Choix des sports",
      headers: ["Activité 1", "Activité 2"],
      rows: [
        {
          label: "Sports collectifs",
          values: [14, 12],
        },
        {
          label: "Sports individuels",
          values: [9, 11],
        },
      ],
      questionLabel: "Différence entre les deux totaux ?",
    }),
  },

  {
    kind: "template",
    id: "cm1_tableau_defi_tpl_1_total_general",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les cases du tableau.",
    tags: ["cm1", "tableau", "defi", "total_general", "template", "canvas"],
    generate: () => {
      const headers = randomChoice(CONTEXTES_FRUITS);
      const rows = ["Matin", "Après-midi"];

      const values = [
        [randomInt(5, 18), randomInt(5, 18), randomInt(5, 18)],
        [randomInt(5, 18), randomInt(5, 18), randomInt(5, 18)],
      ];

      const total = values.flat().reduce((a, b) => a + b, 0);

      return {
        text: "Quel est le total de toutes les valeurs du tableau ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le total général regroupe toutes les valeurs du tableau.",
          "On additionne toutes les cases numériques.",
          `${values.flat().join(" + ")} = ${total}.`,
          `Le total général est ${total}.`
        ),
        canvas: tableauCanvas({
          title: "Total général",
          headers,
          rows: [
            {
              label: rows[0],
              values: values[0],
            },
            {
              label: rows[1],
              values: values[1],
            },
          ],
          questionLabel: "Total de toutes les valeurs ?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tableau_defi_tpl_2_comparer_deux_lignes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule le total de chaque ligne, puis compare.",
    tags: ["cm1", "tableau", "defi", "comparer_lignes", "template", "canvas"],
    generate: () => {
      const headers = randomChoice(CONTEXTES_SPORTS);
      const rowLabels = ["Groupe A", "Groupe B"];

      const a1 = randomInt(5, 15);
      const a2 = randomInt(5, 15);
      const a3 = randomInt(5, 15);

      const b1 = randomInt(5, 15);
      const b2 = randomInt(5, 15);
      const b3 = randomInt(5, 15);

      const totalA = a1 + a2 + a3;
      const totalB = b1 + b2 + b3;

      const correct =
        totalA > totalB
          ? "Groupe A"
          : totalB > totalA
            ? "Groupe B"
            : "égalité";

      return {
        text: "Quel groupe a le plus grand total ?",
        format: "qcm",
        choices: ["Groupe A", "Groupe B", "égalité"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer deux lignes, on calcule le total de chaque ligne.",
          "On additionne les valeurs de chaque groupe.",
          `Groupe A : ${a1} + ${a2} + ${a3} = ${totalA}. Groupe B : ${b1} + ${b2} + ${b3} = ${totalB}.`,
          correct === "égalité"
            ? "Les deux groupes ont le même total."
            : `Le plus grand total est celui du ${correct}.`
        ),
        canvas: tableauCanvas({
          title: "Comparer deux lignes",
          headers,
          rows: [
            {
              label: rowLabels[0],
              values: [a1, a2, a3],
            },
            {
              label: rowLabels[1],
              values: [b1, b2, b3],
            },
          ],
          highlight:
            correct === "Groupe A"
              ? { row: 0 }
              : correct === "Groupe B"
                ? { row: 1 }
                : undefined,
          questionLabel: "Quel groupe a le plus grand total ?",
        }),
      };
    },
  },
];