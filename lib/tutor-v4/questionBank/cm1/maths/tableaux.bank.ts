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
  // La bonne réponse ne doit JAMAIS sauter au découpage : on la met de côté,
  // on tire trois distracteurs distincts, puis on mélange l'ensemble.
  // ⚠️ 05/08/2026 — les versions précédentes jetaient la bonne réponse dans le
  // même chapeau que les pièges avant de couper à quatre. Avec quatre pièges
  // écrits, elle pouvait rester au fond : l'élève voyait alors quatre
  // propositions dont aucune n'était bonne, sans que rien ne le signale.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
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
  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau, la ligne « Ananas » et la colonne « Mardi » se croisent sur la case 24. Combien d'ananas le mardi ?",
    format: "qcm",
    choices: ["24","2","42","4"],
    expected: ["24"],
    comparator: "mcq_exact",
    hint: "On croise la bonne ligne et la bonne colonne.",
    explanation: "La valeur est au croisement de la ligne « Ananas » et de la colonne « Mardi » : 24.",
    tags: ["cm1","tableau","tableau_lire","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_g2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau, pour trouver une valeur, on croise...",
    format: "qcm",
    choices: ["la bonne ligne et la bonne colonne","deux colonnes","deux lignes","le titre seulement"],
    expected: ["la bonne ligne et la bonne colonne"],
    comparator: "mcq_exact",
    hint: "La réponse est dans une case.",
    explanation: "On croise une ligne et une colonne : la valeur cherchée est dans la case au croisement.",
    tags: ["cm1","tableau","tableau_lire","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Un tableau indique 12 bananes lundi et 18 bananes mardi. La case « total » doit contenir...",
    format: "qcm",
    choices: ["30","6","24","1218"],
    expected: ["30"],
    comparator: "mcq_exact",
    hint: "Additionne les deux nombres.",
    explanation: "Total = 12 + 18 = 30.",
    tags: ["cm1","tableau","tableau_completer","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Un tableau montre : lundi 12, mardi 18, mercredi 9. Quel jour a-t-on vendu le plus ?",
    format: "qcm",
    choices: ["mardi","lundi","mercredi","tous pareil"],
    expected: ["mardi"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre.",
    explanation: "Le plus grand nombre est 18 : c'est mardi.",
    tags: ["cm1","tableau","tableau_interpreter","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, un tableau note 24 ananas et 30 bananes. Combien de bananes de plus que d'ananas ?",
    format: "qcm",
    choices: ["6","54","4","30"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Soustrais les deux nombres.",
    explanation: "30 − 24 = 6 bananes de plus.",
    tags: ["cm1","tableau","tableau_defi","guide","qcm"],
  },

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

      // ⚠️ Tirées séparément, les trois valeurs tombaient souvent égales : les
      // deux pièges « tu as lu la mauvaise colonne » devenaient alors la bonne
      // réponse et disparaissaient. Et un tableau dont les trois colonnes
      // portent le même nombre n'apprend rien à lire. On tire donc trois
      // valeurs DISTINCTES.
      const values = shuffle(
        Array.from({ length: 11 }, (_, i) => i + 8),
      ).slice(0, 3);

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

  // ============================================================
  // TOP-UP — TABLEAU_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_4_basket",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "sport",
    text: "Combien d’élèves ont choisi le basket ?",
    format: "qcm",
    choices: ["14", "9", "11", "34"],
    expected: ["14"],
    comparator: "mcq_exact",
    hint: "Cherche la colonne Basket.",
    explanation: exp(
      "Un tableau range les informations en colonnes.",
      "On repère la colonne Basket et on lit la valeur.",
      "Dans la colonne Basket, on lit 14.",
      "14 élèves ont choisi le basket."
    ),
    tags: ["cm1", "tableau", "lire", "sport", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Sports préférés",
      headers: ["Basket", "Course", "Tennis"],
      rows: [{ label: "Élèves", values: [14, 9, 11] }],
      highlight: { cell: { row: 0, col: 0 } },
      questionLabel: "Combien d’élèves au basket ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_5_papayes_aprem",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché, combien de papayes ont été vendues l’après-midi ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Croise la ligne Après-midi et la colonne Papayes.",
    explanation: exp(
      "Lire un tableau à deux lignes, c’est croiser une ligne et une colonne.",
      "On cherche la ligne Après-midi et la colonne Papayes.",
      "À l’intersection, on lit 12.",
      "12 papayes ont été vendues l’après-midi."
    ),
    tags: ["cm1", "tableau", "lire", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes au marché",
      headers: ["Letchis", "Papayes", "Goyaviers"],
      rows: [
        { label: "Matin", values: [20, 15, 18] },
        { label: "Après-midi", values: [16, 12, 14] },
      ],
      highlight: { cell: { row: 1, col: 1 } },
      questionLabel: "Papayes — Après-midi",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_6_absents_mercredi",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’élèves étaient absents mercredi ?",
    format: "qcm",
    choices: ["1", "2", "3", "6"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Cherche la colonne Mercredi.",
    explanation: exp(
      "Un tableau permet de retrouver vite une information.",
      "On repère la colonne Mercredi.",
      "Dans cette colonne, on lit 1.",
      "1 élève était absent mercredi."
    ),
    tags: ["cm1", "tableau", "lire", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Absents de la semaine",
      headers: ["Lundi", "Mardi", "Mercredi"],
      rows: [{ label: "Absents", values: [2, 3, 1] }],
      highlight: { cell: { row: 0, col: 2 } },
      questionLabel: "Absents mercredi ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_7_surf",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "sport",
    text: "Combien d’élèves font du surf ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche la colonne Surf.",
    explanation: exp(
      "Pour lire un tableau, on repère la bonne colonne.",
      "On cherche la colonne Surf et on lit la valeur.",
      "Dans la colonne Surf, on lit 7.",
      "7 élèves font du surf."
    ),
    tags: ["cm1", "tableau", "lire", "sport", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Sports de plein air",
      headers: ["Surf", "Volley", "Randonnée"],
      rows: [{ label: "Élèves", values: [7, 13, 9] }],
      highlight: { cell: { row: 0, col: 0 } },
      questionLabel: "Combien au surf ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_8_citrons",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Combien de citrons ont été vendus ?",
    format: "qcm",
    choices: ["22", "16", "30", "68"],
    expected: ["22"],
    comparator: "mcq_exact",
    hint: "Cherche la colonne Citrons.",
    explanation: exp(
      "Un tableau range chaque fruit dans sa colonne.",
      "On repère la colonne Citrons.",
      "Dans cette colonne, on lit 22.",
      "22 citrons ont été vendus."
    ),
    tags: ["cm1", "tableau", "lire", "reunion", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes du jour",
      headers: ["Citrons", "Avocats", "Cocos"],
      rows: [{ label: "Quantité", values: [22, 16, 30] }],
      highlight: { cell: { row: 0, col: 0 } },
      questionLabel: "Combien de citrons ?",
    }),
  },

  // ============================================================
  // TOP-UP — TABLEAU_COMPLETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_3_goyaviers",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Le total est 50 fruits. Il y a 20 letchis et 12 papayes. Combien y a-t-il de goyaviers ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Additionne les fruits connus, puis complète jusqu’à 50.",
    explanation: exp(
      "Compléter un tableau, c’est retrouver une case manquante.",
      "On additionne les valeurs connues, puis on soustrait au total.",
      "20 + 12 = 32, puis 50 - 32 = 18.",
      "Il y a 18 goyaviers."
    ),
    tags: ["cm1", "tableau", "completer", "total", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Fruits vendus",
      headers: ["Letchis", "Papayes", "Goyaviers", "Total"],
      rows: [{ label: "Quantité", values: [20, 12, "?", 50] }],
      highlight: { cell: { row: 0, col: 2 } },
      questionLabel: "Quelle valeur manque ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_4_total_activites",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "sport",
    text: "11 élèves font du football, 9 de la danse et 14 de la natation. Quel est le total ?",
    format: "short",
    expected: ["34"],
    comparator: "number_equal",
    hint: "Additionne les trois nombres.",
    explanation: exp(
      "Un total regroupe toutes les valeurs.",
      "On additionne les élèves de chaque activité.",
      "11 + 9 + 14 = 34.",
      "Le total est 34 élèves."
    ),
    tags: ["cm1", "tableau", "completer", "total", "sport", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Activités choisies",
      headers: ["Football", "Danse", "Natation", "Total"],
      rows: [{ label: "Élèves", values: [11, 9, 14, "?"] }],
      highlight: { cell: { row: 0, col: 3 } },
      questionLabel: "Quel est le total ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_5_ananas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "reunion",
    text: "Le total est 40 fruits. Il y a 15 mangues et 12 bananes. Combien y a-t-il d’ananas ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Additionne les fruits connus, puis complète jusqu’à 40.",
    explanation: exp(
      "On retrouve une case manquante grâce au total.",
      "On additionne les valeurs connues, puis on soustrait au total.",
      "15 + 12 = 27, puis 40 - 27 = 13.",
      "Il y a 13 ananas."
    ),
    tags: ["cm1", "tableau", "completer", "valeur_manquante", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Fruits vendus",
      headers: ["Mangues", "Ananas", "Bananes", "Total"],
      rows: [{ label: "Quantité", values: [15, "?", 12, 40] }],
      highlight: { cell: { row: 0, col: 1 } },
      questionLabel: "Quelle valeur manque ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_6_cm1a",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Les trois classes ont 72 élèves en tout. CM1 B a 24 élèves et CM1 C en a 26. Combien y a-t-il d’élèves en CM1 A ?",
    format: "short",
    expected: ["22"],
    comparator: "number_equal",
    hint: "Additionne CM1 B et CM1 C, puis complète jusqu’à 72.",
    explanation: exp(
      "On utilise le total pour retrouver la case manquante.",
      "On additionne les classes connues, puis on soustrait au total.",
      "24 + 26 = 50, puis 72 - 50 = 22.",
      "Il y a 22 élèves en CM1 A."
    ),
    tags: ["cm1", "tableau", "completer", "valeur_manquante", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Effectifs des classes",
      headers: ["CM1 A", "CM1 B", "CM1 C", "Total"],
      rows: [{ label: "Élèves", values: ["?", 24, 26, 72] }],
      highlight: { cell: { row: 0, col: 0 } },
      questionLabel: "Quelle valeur manque ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_7_tennis",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "sport",
    text: "Le total est 30 élèves. 13 font du basket et 8 de la course. Combien font du tennis ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Additionne basket et course, puis complète jusqu’à 30.",
    explanation: exp(
      "On retrouve la case manquante avec le total.",
      "On additionne les valeurs connues, puis on soustrait au total.",
      "13 + 8 = 21, puis 30 - 21 = 9.",
      "9 élèves font du tennis."
    ),
    tags: ["cm1", "tableau", "completer", "total", "sport", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Sports choisis",
      headers: ["Basket", "Course", "Tennis", "Total"],
      rows: [{ label: "Élèves", values: [13, 8, "?", 30] }],
      highlight: { cell: { row: 0, col: 2 } },
      questionLabel: "Combien au tennis ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_8_volley",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "sport",
    text: "Le total est 25 élèves. 7 font du surf et 9 de la randonnée. Combien font du volley ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Additionne surf et randonnée, puis complète jusqu’à 25.",
    explanation: exp(
      "Le total permet de retrouver la valeur cachée.",
      "On additionne les valeurs connues, puis on soustrait au total.",
      "7 + 9 = 16, puis 25 - 16 = 9.",
      "9 élèves font du volley."
    ),
    tags: ["cm1", "tableau", "completer", "valeur_manquante", "sport", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Sports de plein air",
      headers: ["Surf", "Volley", "Randonnée", "Total"],
      rows: [{ label: "Élèves", values: [7, "?", 9, 25] }],
      highlight: { cell: { row: 0, col: 1 } },
      questionLabel: "Combien au volley ?",
    }),
  },

  // ============================================================
  // TOP-UP — TABLEAU_INTERPRETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_4_moins_choisie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "sport",
    text: "Quelle activité est la moins choisie ?",
    format: "qcm",
    choices: ["Football", "Danse", "Natation", "On ne peut pas savoir"],
    expected: ["Danse"],
    comparator: "mcq_exact",
    hint: "Cherche le plus petit nombre.",
    explanation: exp(
      "Interpréter un tableau, c’est comparer les valeurs.",
      "Pour la moins choisie, on cherche le plus petit nombre.",
      "Football : 16, Danse : 9, Natation : 12. Le plus petit est 9.",
      "L’activité la moins choisie est la Danse."
    ),
    tags: ["cm1", "tableau", "interpreter", "comparer", "sport", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Activités choisies",
      headers: ["Football", "Danse", "Natation"],
      rows: [{ label: "Élèves", values: [16, 9, 12] }],
      highlight: { cell: { row: 0, col: 1 } },
      questionLabel: "Quelle activité est la moins choisie ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_5_total_aprem",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de fruits ont été vendus en tout l’après-midi ?",
    format: "short",
    expected: ["44"],
    comparator: "number_equal",
    hint: "Additionne toute la ligne Après-midi.",
    explanation: exp(
      "Pour le total d’une ligne, on additionne ses valeurs.",
      "On additionne les fruits de l’après-midi.",
      "14 + 10 + 20 = 44.",
      "44 fruits ont été vendus l’après-midi."
    ),
    tags: ["cm1", "tableau", "interpreter", "total_ligne", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes au marché",
      headers: ["Mangues", "Ananas", "Bananes"],
      rows: [
        { label: "Matin", values: [18, 12, 25] },
        { label: "Après-midi", values: [14, 10, 20] },
      ],
      highlight: { row: 1 },
      questionLabel: "Total de l’après-midi ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_6_difference_mangues",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de mangues de plus ont été vendues le matin que l’après-midi ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Compare 18 et 14.",
    explanation: exp(
      "Comparer deux cases, c’est chercher leur différence.",
      "On soustrait la plus petite valeur à la plus grande.",
      "18 - 14 = 4.",
      "Il y a 4 mangues de plus le matin."
    ),
    tags: ["cm1", "tableau", "interpreter", "difference", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes de mangues",
      headers: ["Mangues", "Ananas", "Bananes"],
      rows: [
        { label: "Matin", values: [18, 12, 25] },
        { label: "Après-midi", values: [14, 10, 20] },
      ],
      highlight: { col: 0 },
      questionLabel: "Mangues : matin − après-midi ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_7_classe_moins",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle classe a le moins d’élèves ?",
    format: "qcm",
    choices: ["CM1 A", "CM1 B", "CM1 C", "Elles sont à égalité"],
    expected: ["CM1 A"],
    comparator: "mcq_exact",
    hint: "Cherche le plus petit nombre.",
    explanation: exp(
      "Pour comparer des effectifs, on regarde les nombres.",
      "On cherche le plus petit effectif.",
      "CM1 A : 22, CM1 B : 24, CM1 C : 26. Le plus petit est 22.",
      "La classe avec le moins d’élèves est CM1 A."
    ),
    tags: ["cm1", "tableau", "interpreter", "comparer", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Effectifs",
      headers: ["CM1 A", "CM1 B", "CM1 C"],
      rows: [{ label: "Élèves", values: [22, 24, 26] }],
      highlight: { cell: { row: 0, col: 0 } },
      questionLabel: "Quelle classe a le moins d’élèves ?",
    }),
  },

  // ============================================================
  // TOP-UP — TABLEAU_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_4_total_journee_letchis",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de fruits ont été vendus en tout dans la journée ?",
    format: "short",
    expected: ["95"],
    comparator: "number_equal",
    hint: "Additionne toutes les cases du tableau.",
    explanation: exp(
      "Un défi peut demander d’additionner toutes les cases.",
      "On additionne les ventes du matin et de l’après-midi.",
      "20 + 15 + 18 + 16 + 12 + 14 = 95.",
      "95 fruits ont été vendus dans la journée."
    ),
    tags: ["cm1", "tableau", "defi", "total_general", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes au marché",
      headers: ["Letchis", "Papayes", "Goyaviers"],
      rows: [
        { label: "Matin", values: [20, 15, 18] },
        { label: "Après-midi", values: [16, 12, 14] },
      ],
      questionLabel: "Total de toute la journée ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_5_ecart_classes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de tickets de plus la classe CM1 B a-t-elle vendus que la classe CM1 A en tout ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Calcule le total de chaque classe, puis fais la différence.",
    explanation: exp(
      "Ce défi demande deux étapes : totaliser puis comparer.",
      "On calcule chaque total, puis on cherche la différence.",
      "CM1 A : 12 + 9 = 21. CM1 B : 10 + 15 = 25. Différence : 25 - 21 = 4.",
      "CM1 B a vendu 4 tickets de plus."
    ),
    tags: ["cm1", "tableau", "defi", "difference_totaux", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Vente de tickets",
      headers: ["Matin", "Après-midi"],
      rows: [
        { label: "CM1 A", values: [12, 9] },
        { label: "CM1 B", values: [10, 15] },
      ],
      questionLabel: "Différence CM1 B − CM1 A ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_6_marche_plus",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Quel marché a vendu le plus de fruits en tout ?",
    format: "qcm",
    choices: ["Marché Nord", "Marché Sud", "Ils ont vendu pareil", "On ne peut pas savoir"],
    expected: ["Marché Sud"],
    comparator: "mcq_exact",
    hint: "Calcule le total de chaque marché.",
    explanation: exp(
      "Pour comparer deux lignes, on calcule d’abord chaque total.",
      "On additionne les ventes de chaque marché.",
      "Nord : 30 + 25 = 55. Sud : 28 + 30 = 58.",
      "Le marché qui a vendu le plus est le Marché Sud."
    ),
    tags: ["cm1", "tableau", "defi", "comparer_totaux", "reunion", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes de fruits",
      headers: ["Matin", "Après-midi"],
      rows: [
        { label: "Marché Nord", values: [30, 25] },
        { label: "Marché Sud", values: [28, 30] },
      ],
      highlight: { row: 1 },
      questionLabel: "Quel marché a vendu le plus ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_7_ecart_matin_aprem",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Combien de fruits de plus ont été vendus le matin que l’après-midi ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Calcule le total du matin et celui de l’après-midi, puis compare.",
    explanation: exp(
      "Ce défi demande de totaliser chaque ligne puis de comparer.",
      "On calcule les deux totaux, puis on fait la différence.",
      "Matin : 18 + 12 + 25 = 55. Après-midi : 14 + 10 + 20 = 44. Différence : 55 - 44 = 11.",
      "Il y a 11 fruits de plus le matin."
    ),
    tags: ["cm1", "tableau", "defi", "difference_totaux", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes au marché",
      headers: ["Mangues", "Ananas", "Bananes"],
      rows: [
        { label: "Matin", values: [18, 12, 25] },
        { label: "Après-midi", values: [14, 10, 20] },
      ],
      questionLabel: "Matin − Après-midi ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_8_total_general_sports",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 3,
    theme: "sport",
    text: "Combien d’élèves ont été comptés en tout dans ce tableau ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Additionne toutes les cases.",
    explanation: exp(
      "Le total général regroupe toutes les valeurs du tableau.",
      "On additionne toutes les cases.",
      "12 + 8 + 10 + 9 + 11 + 10 = 60.",
      "60 élèves ont été comptés en tout."
    ),
    tags: ["cm1", "tableau", "defi", "total_general", "sport", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Sports par groupe",
      headers: ["Football", "Basket", "Tennis"],
      rows: [
        { label: "Groupe A", values: [12, 8, 10] },
        { label: "Groupe B", values: [9, 11, 10] },
      ],
      questionLabel: "Total général ?",
    }),
  },
];