// lib/tutor-v4/question-banks/maths/cm1/proportionnalite.bank.ts

import type {
  TutorBankItemV4,
  TableauProportionnaliteCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function tableauProportionnaliteCanvas(
  data: Omit<TableauProportionnaliteCanvasData, "kind">
): TableauProportionnaliteCanvasData {
  return {
    kind: "tableau_proportionnalite",
    ...data,
  };
}

export const proportionnaliteBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_prop_fois_plus_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_plus",
    difficulty: 2,
    theme: "neutral",
    text: "1 crayon coûte 2 €. Combien coûtent 3 crayons au même prix ?",
    format: "qcm",
    choices: ["6 €","5 €","3 €","2 €"],
    expected: ["6 €"],
    comparator: "mcq_exact",
    hint: "3 fois plus de crayons, c'est 3 fois plus cher.",
    explanation: "3 crayons, c'est 3 fois plus : 3 × 2 = 6 €.",
    tags: ["cm1","proportionnalite","prop_fois_plus","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_prop_fois_moins_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_moins",
    difficulty: 2,
    theme: "neutral",
    text: "4 gâteaux coûtent 8 €. Combien coûtent 2 gâteaux au même prix ?",
    format: "qcm",
    choices: ["4 €","6 €","2 €","16 €"],
    expected: ["4 €"],
    comparator: "mcq_exact",
    hint: "2 fois moins de gâteaux, c'est 2 fois moins cher.",
    explanation: "2 gâteaux, c'est 2 fois moins que 4 : la moitié du prix, 8 ÷ 2 = 4 €.",
    tags: ["cm1","proportionnalite","prop_fois_moins","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_prop_tableau_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un tableau de proportionnalité, 2 kg coûtent 6 €. Combien coûtent 4 kg ?",
    format: "qcm",
    choices: ["12 €","8 €","10 €","24 €"],
    expected: ["12 €"],
    comparator: "mcq_exact",
    hint: "4 kg, c'est 2 fois 2 kg.",
    explanation: "4 kg = 2 fois 2 kg, donc 2 × 6 = 12 €.",
    tags: ["cm1","proportionnalite","prop_tableau","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_prop_probleme_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, 3 kg de letchis coûtent 12 €. Combien coûtent 5 kg au même prix ?",
    format: "qcm",
    choices: ["20 €","15 €","17 €","24 €"],
    expected: ["20 €"],
    comparator: "mcq_exact",
    hint: "Cherche d'abord le prix d'1 kg.",
    explanation: "Prix d'1 kg : 12 ÷ 3 = 4 €. Puis 5 kg : 5 × 4 = 20 €.",
    tags: ["cm1","proportionnalite","prop_probleme","guide","qcm"],
  },

  // ============================================================
  // PROP_RECONNAITRE
  // Reconnaître une situation de proportionnalité
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_prop_reconnaitre_fixed_001_definition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans quelle situation parle-t-on de proportionnalité ?",
    format: "qcm",
    choices: [
      "Quand on multiplie toujours par le même nombre",
      "Quand on ajoute toujours 1",
      "Quand les nombres sont tous différents",
      "Quand le résultat est toujours plus petit",
    ],
    expected: ["Quand on multiplie toujours par le même nombre"],
    comparator: "mcq_exact",
    hint: "Cherche l’idée de même coefficient multiplicateur.",
    explanation: exp(
      "Une situation de proportionnalité existe quand deux quantités sont liées par une multiplication toujours identique.",
      "On vérifie si on passe d’une quantité à l’autre en multipliant toujours par le même nombre.",
      "Par exemple : 1 carnet coûte 3 €, 2 carnets coûtent 6 €, 3 carnets coûtent 9 €. On multiplie par 3.",
      "C’est une situation de proportionnalité."
    ),
    tags: [
      "cm1",
      "proportionnalite",
      "reconnaitre",
      "definition",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_prop_reconnaitre_fixed_002_prix_quantite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un carnet coûte 3 €. Deux carnets coûtent 6 €. Trois carnets coûtent 9 €. Est-ce une situation de proportionnalité ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Regarde si le prix est toujours le nombre de carnets multiplié par le même nombre.",
    explanation: exp(
      "Une situation est proportionnelle si on multiplie toujours par le même nombre.",
      "Ici, le prix dépend du nombre de carnets.",
      "1 × 3 = 3, 2 × 3 = 6, 3 × 3 = 9.",
      "C’est proportionnel, car on multiplie toujours par 3."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 3,
      rowLabels: ["Carnets", "Prix (€)"],
      colLabels: ["1", "2", "3"],
      values: [
        ["1", "2", "3"],
        ["3", "6", "9"],
      ],
      missing: [],
      highlightedCells: [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
      ],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "reconnaitre",
      "prix",
      "qcm",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_prop_reconnaitre_fixed_003_age_taille",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "L’âge d’un enfant et sa taille sont-ils toujours proportionnels ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Quand l’âge double, la taille ne double pas forcément.",
    explanation: exp(
      "Dans une situation de proportionnalité, multiplier une quantité doit multiplier l’autre par le même nombre.",
      "On vérifie si la relation reste régulière.",
      "Si un enfant de 5 ans mesure 110 cm, un enfant de 10 ans ne mesure pas forcément 220 cm.",
      "L’âge et la taille ne sont donc pas toujours proportionnels."
    ),
    tags: [
      "cm1",
      "proportionnalite",
      "reconnaitre",
      "contre_exemple",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_prop_reconnaitre_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi cette situation est proportionnelle : 1 ticket coûte 4 €, 2 tickets coûtent 8 €, 3 tickets coûtent 12 €.",
    format: "open",
    expected: ["4", "8", "12", "multiplie", "même"],
    comparator: "contains_keyword",
    hint: "Cherche le nombre par lequel on multiplie le nombre de tickets.",
    explanation: exp(
      "Une situation proportionnelle utilise toujours le même coefficient multiplicateur.",
      "On cherche comment passer du nombre de tickets au prix.",
      "1 × 4 = 4, 2 × 4 = 8, 3 × 4 = 12.",
      "La situation est proportionnelle, car on multiplie toujours par 4."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 3,
      rowLabels: ["Tickets", "Prix (€)"],
      colLabels: ["1", "2", "3"],
      values: [
        ["1", "2", "3"],
        ["4", "8", "12"],
      ],
      missing: [],
      highlightedCells: [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
      ],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "reconnaitre",
      "open",
      "expliquer",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_prop_reconnaitre_tpl_001_prix_unitaire_oui",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si le prix total est toujours le nombre d’objets multiplié par le même prix.",
    tags: [
      "cm1",
      "proportionnalite",
      "reconnaitre",
      "prix_unitaire",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const prix = randomChoice([2, 3, 4, 5, 6]);
      const values = [1, 2, 3].map((n) => n * prix);

      return {
        text: `Un objet coûte ${prix} €. Le tableau indique le prix pour 1, 2 et 3 objets. Est-ce une situation de proportionnalité ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le prix est proportionnel à la quantité si chaque objet coûte le même prix.",
          "On vérifie si le prix total s’obtient en multipliant la quantité par un même nombre.",
          `1 × ${prix} = ${values[0]}, 2 × ${prix} = ${values[1]}, 3 × ${prix} = ${values[2]}.`,
          `C’est proportionnel : on multiplie toujours par ${prix}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Objets", "Prix (€)"],
          colLabels: ["1", "2", "3"],
          values: [
            ["1", "2", "3"],
            values.map(String),
          ],
          missing: [],
          highlightedCells: [
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_reconnaitre_tpl_002_prix_unitaire_non",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie si le même multiplicateur fonctionne partout.",
    tags: [
      "cm1",
      "proportionnalite",
      "reconnaitre",
      "non_proportionnel",
      "prix",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const prix = randomChoice([2, 3, 4, 5]);
      const erreur = randomChoice([1, 2]);
      const v1 = prix;
      const v2 = 2 * prix;
      const v3 = 3 * prix + erreur;

      return {
        text: `Un tableau donne : 1 objet coûte ${v1} €, 2 objets coûtent ${v2} €, 3 objets coûtent ${v3} €. Est-ce proportionnel ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une situation est proportionnelle si le même coefficient fonctionne pour toutes les colonnes.",
          "On teste le coefficient à partir des premières colonnes.",
          `Pour 1 objet, on trouve ${prix} €. Pour 2 objets, ${v2} € correspond bien à ×${prix}. Mais pour 3 objets, on devrait avoir ${3 * prix} €, pas ${v3} €.`,
          "Ce n’est pas proportionnel."
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Objets", "Prix (€)"],
          colLabels: ["1", "2", "3"],
          values: [
            ["1", "2", "3"],
            [String(v1), String(v2), String(v3)],
          ],
          missing: [],
          highlightedCells: [{ row: 1, col: 2 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_reconnaitre_tpl_003_groupes_egaux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque groupe contient le même nombre d’objets.",
    tags: [
      "cm1",
      "proportionnalite",
      "reconnaitre",
      "groupes_egaux",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const parGroupe = randomChoice([3, 4, 5, 6, 8]);
      const values = [1, 2, 4].map((n) => n * parGroupe);

      return {
        text: `Chaque boîte contient ${parGroupe} objets. Le nombre total d’objets est-il proportionnel au nombre de boîtes ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand chaque groupe contient la même quantité, le total est proportionnel au nombre de groupes.",
          "On multiplie le nombre de boîtes par le nombre d’objets dans une boîte.",
          `1 × ${parGroupe} = ${values[0]}, 2 × ${parGroupe} = ${values[1]}, 4 × ${parGroupe} = ${values[2]}.`,
          `C’est proportionnel, car on multiplie toujours par ${parGroupe}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Boîtes", "Objets"],
          colLabels: ["1", "2", "4"],
          values: [
            ["1", "2", "4"],
            values.map(String),
          ],
          missing: [],
          highlightedCells: [
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_reconnaitre_tpl_004_reunion_marche_oui",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "reunion",
    hint: "Si chaque panier contient le même nombre de fruits, on multiplie toujours par le même nombre.",
    tags: [
      "cm1",
      "proportionnalite",
      "reconnaitre",
      "reunion",
      "marche",
      "fruits",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const fruits = randomChoice([6, 8, 10, 12]);
      const values = [1, 2, 3].map((n) => n * fruits);

      return {
        text: `Au marché de Saint-Pierre, chaque panier contient ${fruits} fruits. Le nombre de fruits est-il proportionnel au nombre de paniers ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une situation de proportionnalité apparaît quand chaque unité correspond à la même quantité.",
          "Ici, chaque panier contient le même nombre de fruits.",
          `1 panier : ${fruits} fruits ; 2 paniers : ${2 * fruits} fruits ; 3 paniers : ${3 * fruits} fruits.`,
          `C’est proportionnel, car on multiplie le nombre de paniers par ${fruits}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Paniers", "Fruits"],
          colLabels: ["1", "2", "3"],
          values: [
            ["1", "2", "3"],
            values.map(String),
          ],
          missing: [],
          highlightedCells: [
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_reconnaitre_tpl_005_situation_non_age",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand l’âge double, la taille ne double pas forcément.",
    tags: [
      "cm1",
      "proportionnalite",
      "reconnaitre",
      "non_proportionnel",
      "qcm",
      "template",
    ],
    generate: () => {
      const age = randomChoice([5, 6, 7, 8]);
      const taille = randomChoice([105, 110, 115, 120]);
      const doubleAge = age * 2;
      const tailleDouble = taille * 2;

      return {
        text: `Un enfant de ${age} ans mesure ${taille} cm. Peut-on dire qu’un enfant de ${doubleAge} ans mesure forcément ${tailleDouble} cm ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Toutes les situations ne sont pas proportionnelles.",
          "Pour être proportionnelle, quand une quantité double, l’autre devrait aussi doubler.",
          `Ici, si l’âge double de ${age} à ${doubleAge}, la taille ne devient pas forcément ${tailleDouble} cm.`,
          "L’âge et la taille ne sont pas toujours proportionnels."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_reconnaitre_tpl_006_choisir_situation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la situation où on multiplie toujours par le même nombre.",
    tags: [
      "cm1",
      "proportionnalite",
      "reconnaitre",
      "choisir",
      "qcm",
      "template",
    ],
    generate: () => {
      const prix = randomChoice([2, 3, 4, 5]);
      const correct = `Un cahier coûte ${prix} €, donc le prix dépend du nombre de cahiers.`;

      return {
        text: "Quelle situation est proportionnelle ?",
        format: "qcm",
        choices: makeChoices(correct, [
          "Plus un enfant grandit, plus son âge augmente.",
          "La température augmente toujours de la même façon pendant la journée.",
          "Le score d’un joueur dépend toujours de son prénom.",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On reconnaît une situation de proportionnalité quand une quantité se calcule avec une multiplication fixe.",
          "Un prix unitaire constant donne une situation proportionnelle.",
          `Si un cahier coûte ${prix} €, alors 2 cahiers coûtent ${2 * prix} €, 3 cahiers coûtent ${3 * prix} €.`,
          "La situation des cahiers est proportionnelle."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_reconnaitre_tpl_007_open_expliquer_oui",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique avec le même multiplicateur.",
    tags: [
      "cm1",
      "proportionnalite",
      "reconnaitre",
      "open",
      "expliquer",
      "template",
      "canvas",
    ],
    generate: () => {
      const prix = randomChoice([2, 3, 4, 5, 6]);
      const values = [1, 2, 4].map((n) => n * prix);

      return {
        text: `Explique pourquoi le tableau suivant est proportionnel : 1 objet → ${values[0]} €, 2 objets → ${values[1]} €, 4 objets → ${values[2]} €.`,
        format: "open",
        expected: [
          String(prix),
          "multiplie",
          "même",
          "proportionnel",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Un tableau est proportionnel si on passe de la première ligne à la deuxième avec le même multiplicateur.",
          "On cherche le coefficient multiplicateur.",
          `1 × ${prix} = ${values[0]}, 2 × ${prix} = ${values[1]}, 4 × ${prix} = ${values[2]}.`,
          `Le tableau est proportionnel, car on multiplie toujours par ${prix}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Objets", "Prix (€)"],
          colLabels: ["1", "2", "4"],
          values: [
            ["1", "2", "4"],
            values.map(String),
          ],
          missing: [],
          highlightedCells: [
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_reconnaitre_tpl_008_open_expliquer_non",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    hint: "Montre que le même multiplicateur ne fonctionne pas partout.",
    tags: [
      "cm1",
      "proportionnalite",
      "reconnaitre",
      "open",
      "expliquer",
      "non_proportionnel",
      "template",
      "canvas",
    ],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5]);
      const erreur = randomChoice([1, 2, 3]);
      const v1 = k;
      const v2 = 2 * k;
      const v3 = 3 * k + erreur;

      return {
        text: `Explique pourquoi ce tableau n’est pas proportionnel : 1 objet → ${v1} €, 2 objets → ${v2} €, 3 objets → ${v3} €.`,
        format: "open",
        expected: [
          String(k),
          String(3 * k),
          String(v3),
          "pas",
          "même",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Un tableau n’est pas proportionnel si le même multiplicateur ne fonctionne pas partout.",
          "On vérifie ce que devrait donner la troisième colonne.",
          `Si le coefficient était ${k}, alors 3 objets devraient coûter ${3 * k} €, pas ${v3} €.`,
          "Le tableau n’est donc pas proportionnel."
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Objets", "Prix (€)"],
          colLabels: ["1", "2", "3"],
          values: [
            ["1", "2", "3"],
            [String(v1), String(v2), String(v3)],
          ],
          missing: [],
          highlightedCells: [{ row: 1, col: 2 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },
    // ============================================================
  // PROP_FOIS_PLUS
  // Utiliser un raisonnement “fois plus”
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_prop_fois_plus_fixed_001_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_plus",
    difficulty: 2,
    theme: "neutral",
    text: "Si 2 carnets coûtent 6 €, combien coûtent 4 carnets ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "4 carnets, c’est 2 fois plus que 2 carnets.",
    explanation: exp(
      "Le raisonnement “fois plus” consiste à multiplier les deux quantités par le même nombre.",
      "On remarque que 4 carnets, c’est 2 fois plus que 2 carnets.",
      "Le prix est donc aussi 2 fois plus grand : 6 × 2 = 12.",
      "4 carnets coûtent 12 €."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 2,
      rowLabels: ["Carnets", "Prix (€)"],
      colLabels: ["Départ", "Fois plus"],
      values: [
        ["2", "4"],
        ["6", ""],
      ],
      missing: [{ row: 1, col: 1 }],
      highlightedCells: [{ row: 1, col: 1 }],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "fois_plus",
      "modele",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_prop_fois_plus_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_plus",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver le prix de 6 objets si 3 objets coûtent 15 €.",
    format: "open",
    expected: ["6", "3", "2", "15", "30", "fois"],
    comparator: "contains_keyword",
    hint: "6 objets, c’est 2 fois plus que 3 objets.",
    explanation: exp(
      "Dans une situation proportionnelle, si une quantité est multipliée, l’autre est multipliée par le même nombre.",
      "On compare 3 objets et 6 objets.",
      "6 = 3 × 2, donc le prix devient 15 × 2 = 30.",
      "6 objets coûtent 30 €."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 2,
      rowLabels: ["Objets", "Prix (€)"],
      colLabels: ["Départ", "Fois plus"],
      values: [
        ["3", "6"],
        ["15", ""],
      ],
      missing: [{ row: 1, col: 1 }],
      highlightedCells: [{ row: 1, col: 1 }],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "fois_plus",
      "open",
      "expliquer",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_prop_fois_plus_tpl_001_double",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_plus",
    difficulty: 2,
    theme: "neutral",
    hint: "La deuxième quantité est le double de la première.",
    tags: [
      "cm1",
      "proportionnalite",
      "fois_plus",
      "double",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const depart = randomChoice([2, 3, 4, 5, 6]);
      const coefficient = 2;
      const arrivee = depart * coefficient;

      const valeurDepart = randomChoice([6, 8, 10, 12, 15, 18]);
      const valeurArrivee = valeurDepart * coefficient;

      return {
        text: `Si ${depart} objets coûtent ${valeurDepart} €, combien coûtent ${arrivee} objets ?`,
        format: "short",
        expected: [String(valeurArrivee)],
        comparator: "number_equal",
        explanation: exp(
          "Le raisonnement “fois plus” utilise le même multiplicateur sur les deux lignes.",
          `Ici, ${arrivee} objets, c’est 2 fois plus que ${depart} objets.`,
          `${valeurDepart} × 2 = ${valeurArrivee}.`,
          `${arrivee} objets coûtent ${valeurArrivee} €.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 2,
          rowLabels: ["Objets", "Prix (€)"],
          colLabels: ["Départ", "Double"],
          values: [
            [String(depart), String(arrivee)],
            [String(valeurDepart), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_fois_plus_tpl_002_triple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_plus",
    difficulty: 2,
    theme: "neutral",
    hint: "La deuxième quantité est le triple de la première.",
    tags: [
      "cm1",
      "proportionnalite",
      "fois_plus",
      "triple",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const depart = randomChoice([2, 3, 4, 5]);
      const coefficient = 3;
      const arrivee = depart * coefficient;

      const valeurDepart = randomChoice([4, 5, 6, 8, 10, 12]);
      const valeurArrivee = valeurDepart * coefficient;

      return {
        text: `Si ${depart} sachets contiennent ${valeurDepart} billes, combien contiennent ${arrivee} sachets ?`,
        format: "short",
        expected: [String(valeurArrivee)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un tableau proportionnel, quand une quantité est multipliée par 3, l’autre l’est aussi.",
          `Ici, ${arrivee} sachets, c’est 3 fois plus que ${depart} sachets.`,
          `${valeurDepart} × 3 = ${valeurArrivee}.`,
          `${arrivee} sachets contiennent ${valeurArrivee} billes.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 2,
          rowLabels: ["Sachets", "Billes"],
          colLabels: ["Départ", "Triple"],
          values: [
            [String(depart), String(arrivee)],
            [String(valeurDepart), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_fois_plus_tpl_003_reunion_paniers",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_plus",
    difficulty: 2,
    theme: "reunion",
    hint: "Le nombre de paniers est multiplié, donc le nombre de fruits aussi.",
    tags: [
      "cm1",
      "proportionnalite",
      "fois_plus",
      "reunion",
      "marche",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const depart = randomChoice([2, 3, 4]);
      const coefficient = randomChoice([2, 3]);
      const arrivee = depart * coefficient;

      const fruitsDepart = randomChoice([12, 15, 18, 24]);
      const fruitsArrivee = fruitsDepart * coefficient;

      return {
        text: `Au marché de Saint-Pierre, ${depart} paniers contiennent ${fruitsDepart} fruits. Combien contiennent ${arrivee} paniers identiques ?`,
        format: "short",
        expected: [String(fruitsArrivee)],
        comparator: "number_equal",
        explanation: exp(
          "Quand les paniers sont identiques, le nombre de fruits est proportionnel au nombre de paniers.",
          `On passe de ${depart} paniers à ${arrivee} paniers en multipliant par ${coefficient}.`,
          `${fruitsDepart} × ${coefficient} = ${fruitsArrivee}.`,
          `${arrivee} paniers contiennent ${fruitsArrivee} fruits.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 2,
          rowLabels: ["Paniers", "Fruits"],
          colLabels: ["Départ", "Fois plus"],
          values: [
            [String(depart), String(arrivee)],
            [String(fruitsDepart), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_fois_plus_tpl_004_qcm_calcul",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_plus",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche par combien on multiplie la première quantité.",
    tags: [
      "cm1",
      "proportionnalite",
      "fois_plus",
      "qcm",
      "calcul",
      "template",
      "canvas",
    ],
    generate: () => {
      const depart = randomChoice([2, 3, 4, 5]);
      const coefficient = randomChoice([2, 3, 4]);
      const arrivee = depart * coefficient;

      const valeurDepart = randomChoice([5, 6, 8, 10, 12]);
      const valeurArrivee = valeurDepart * coefficient;

      return {
        text: `Si ${depart} objets correspondent à ${valeurDepart} unités, combien correspondent à ${arrivee} objets ?`,
        format: "qcm",
        choices: makeChoices(String(valeurArrivee), [
          String(valeurDepart + coefficient),
          String(valeurDepart + arrivee),
          String(valeurDepart * depart),
        ]),
        expected: [String(valeurArrivee)],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans un raisonnement “fois plus”, on multiplie les deux grandeurs par le même nombre.",
          `On passe de ${depart} à ${arrivee} en multipliant par ${coefficient}.`,
          `${valeurDepart} × ${coefficient} = ${valeurArrivee}.`,
          `La réponse est ${valeurArrivee}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 2,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["Départ", "Fois plus"],
          values: [
            [String(depart), String(arrivee)],
            [String(valeurDepart), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_fois_plus_tpl_005_qcm_demarche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_plus",
    difficulty: 3,
    theme: "neutral",
    hint: "La bonne démarche multiplie par le même nombre.",
    tags: [
      "cm1",
      "proportionnalite",
      "fois_plus",
      "qcm",
      "demarche",
      "template",
    ],
    generate: () => {
      const depart = randomChoice([2, 3, 4]);
      const coefficient = randomChoice([2, 3, 4]);
      const arrivee = depart * coefficient;
      const valeurDepart = randomChoice([6, 8, 10, 12]);

      const correct = `multiplier ${valeurDepart} par ${coefficient}`;

      return {
        text: `On sait que ${depart} objets correspondent à ${valeurDepart} unités. Pour trouver la valeur de ${arrivee} objets, quelle démarche est correcte ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `ajouter ${coefficient} à ${valeurDepart}`,
          `multiplier ${valeurDepart} par ${depart}`,
          `soustraire ${coefficient} à ${valeurDepart}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La démarche doit respecter le même rapport entre les deux quantités.",
          `On passe de ${depart} objets à ${arrivee} objets en multipliant par ${coefficient}.`,
          `Il faut donc multiplier ${valeurDepart} par ${coefficient}.`,
          "La bonne démarche est de multiplier par le même nombre."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_fois_plus_tpl_006_open_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_plus",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique le multiplicateur utilisé.",
    tags: [
      "cm1",
      "proportionnalite",
      "fois_plus",
      "open",
      "expliquer",
      "template",
      "canvas",
    ],
    generate: () => {
      const depart = randomChoice([2, 3, 4, 5]);
      const coefficient = randomChoice([2, 3, 4]);
      const arrivee = depart * coefficient;
      const valeurDepart = randomChoice([5, 6, 8, 10, 12]);
      const valeurArrivee = valeurDepart * coefficient;

      return {
        text: `Explique comment trouver la valeur pour ${arrivee} objets si ${depart} objets correspondent à ${valeurDepart} unités.`,
        format: "open",
        expected: [
          String(depart),
          String(arrivee),
          String(coefficient),
          String(valeurArrivee),
          "multiplie",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans une situation proportionnelle, le même multiplicateur s’applique aux deux lignes.",
          `On repère que ${arrivee} = ${depart} × ${coefficient}.`,
          `On fait donc ${valeurDepart} × ${coefficient} = ${valeurArrivee}.`,
          `La valeur cherchée est ${valeurArrivee}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 2,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["Départ", "Fois plus"],
          values: [
            [String(depart), String(arrivee)],
            [String(valeurDepart), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  // ============================================================
  // PROP_FOIS_MOINS
  // Utiliser un raisonnement “fois moins”
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_prop_fois_moins_fixed_001_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_moins",
    difficulty: 2,
    theme: "neutral",
    text: "Si 6 carnets coûtent 18 €, combien coûtent 3 carnets ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "3 carnets, c’est 2 fois moins que 6 carnets.",
    explanation: exp(
      "Le raisonnement “fois moins” consiste à diviser les deux quantités par le même nombre.",
      "On remarque que 3 carnets, c’est 2 fois moins que 6 carnets.",
      "Le prix est donc aussi divisé par 2 : 18 ÷ 2 = 9.",
      "3 carnets coûtent 9 €."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 2,
      rowLabels: ["Carnets", "Prix (€)"],
      colLabels: ["Départ", "Fois moins"],
      values: [
        ["6", "3"],
        ["18", ""],
      ],
      missing: [{ row: 1, col: 1 }],
      highlightedCells: [{ row: 1, col: 1 }],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "fois_moins",
      "modele",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_prop_fois_moins_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_moins",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver le prix de 2 objets si 8 objets coûtent 32 €.",
    format: "open",
    expected: ["8", "2", "4", "32", "8", "divise"],
    comparator: "contains_keyword",
    hint: "2 objets, c’est 4 fois moins que 8 objets.",
    explanation: exp(
      "Dans une situation proportionnelle, si une quantité est divisée, l’autre est divisée par le même nombre.",
      "On compare 8 objets et 2 objets.",
      "8 ÷ 4 = 2, donc le prix devient 32 ÷ 4 = 8.",
      "2 objets coûtent 8 €."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 2,
      rowLabels: ["Objets", "Prix (€)"],
      colLabels: ["Départ", "Fois moins"],
      values: [
        ["8", "2"],
        ["32", ""],
      ],
      missing: [{ row: 1, col: 1 }],
      highlightedCells: [{ row: 1, col: 1 }],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "fois_moins",
      "open",
      "expliquer",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_prop_fois_moins_tpl_001_moitie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_moins",
    difficulty: 2,
    theme: "neutral",
    hint: "La deuxième quantité est la moitié de la première.",
    tags: [
      "cm1",
      "proportionnalite",
      "fois_moins",
      "moitie",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const arrivee = randomChoice([2, 3, 4, 5, 6]);
      const coefficient = 2;
      const depart = arrivee * coefficient;

      const valeurArrivee = randomChoice([4, 5, 6, 8, 10, 12]);
      const valeurDepart = valeurArrivee * coefficient;

      return {
        text: `Si ${depart} objets coûtent ${valeurDepart} €, combien coûtent ${arrivee} objets ?`,
        format: "short",
        expected: [String(valeurArrivee)],
        comparator: "number_equal",
        explanation: exp(
          "Le raisonnement “fois moins” divise les deux quantités par le même nombre.",
          `Ici, ${arrivee} objets, c’est 2 fois moins que ${depart} objets.`,
          `${valeurDepart} ÷ 2 = ${valeurArrivee}.`,
          `${arrivee} objets coûtent ${valeurArrivee} €.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 2,
          rowLabels: ["Objets", "Prix (€)"],
          colLabels: ["Départ", "Moitié"],
          values: [
            [String(depart), String(arrivee)],
            [String(valeurDepart), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_fois_moins_tpl_002_tiers",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_moins",
    difficulty: 3,
    theme: "neutral",
    hint: "La deuxième quantité est trois fois moins que la première.",
    tags: [
      "cm1",
      "proportionnalite",
      "fois_moins",
      "tiers",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const arrivee = randomChoice([2, 3, 4, 5]);
      const coefficient = 3;
      const depart = arrivee * coefficient;

      const valeurArrivee = randomChoice([4, 5, 6, 8, 10]);
      const valeurDepart = valeurArrivee * coefficient;

      return {
        text: `Si ${depart} sachets contiennent ${valeurDepart} billes, combien contiennent ${arrivee} sachets ?`,
        format: "short",
        expected: [String(valeurArrivee)],
        comparator: "number_equal",
        explanation: exp(
          "Quand une quantité est divisée par 3, l’autre doit aussi être divisée par 3.",
          `Ici, ${arrivee} sachets, c’est 3 fois moins que ${depart} sachets.`,
          `${valeurDepart} ÷ 3 = ${valeurArrivee}.`,
          `${arrivee} sachets contiennent ${valeurArrivee} billes.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 2,
          rowLabels: ["Sachets", "Billes"],
          colLabels: ["Départ", "Tiers"],
          values: [
            [String(depart), String(arrivee)],
            [String(valeurDepart), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_fois_moins_tpl_003_reunion_paniers",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_moins",
    difficulty: 3,
    theme: "reunion",
    hint: "Le nombre de paniers est divisé, donc le nombre de fruits aussi.",
    tags: [
      "cm1",
      "proportionnalite",
      "fois_moins",
      "reunion",
      "marche",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const arrivee = randomChoice([2, 3, 4]);
      const coefficient = randomChoice([2, 3]);
      const depart = arrivee * coefficient;

      const fruitsArrivee = randomChoice([8, 10, 12, 15]);
      const fruitsDepart = fruitsArrivee * coefficient;

      return {
        text: `Au marché de Saint-Pierre, ${depart} paniers contiennent ${fruitsDepart} fruits. Combien contiennent ${arrivee} paniers identiques ?`,
        format: "short",
        expected: [String(fruitsArrivee)],
        comparator: "number_equal",
        explanation: exp(
          "Avec des paniers identiques, le nombre de fruits est proportionnel au nombre de paniers.",
          `On passe de ${depart} paniers à ${arrivee} paniers en divisant par ${coefficient}.`,
          `${fruitsDepart} ÷ ${coefficient} = ${fruitsArrivee}.`,
          `${arrivee} paniers contiennent ${fruitsArrivee} fruits.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 2,
          rowLabels: ["Paniers", "Fruits"],
          colLabels: ["Départ", "Fois moins"],
          values: [
            [String(depart), String(arrivee)],
            [String(fruitsDepart), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_fois_moins_tpl_004_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_moins",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise par le même nombre.",
    tags: [
      "cm1",
      "proportionnalite",
      "fois_moins",
      "qcm",
      "resultat",
      "template",
      "canvas",
    ],
    generate: () => {
      const arrivee = randomChoice([2, 3, 4, 5]);
      const coefficient = randomChoice([2, 3, 4]);
      const depart = arrivee * coefficient;

      const valeurArrivee = randomChoice([4, 5, 6, 8, 10]);
      const valeurDepart = valeurArrivee * coefficient;

      return {
        text: `Si ${depart} objets correspondent à ${valeurDepart} unités, combien correspondent à ${arrivee} objets ?`,
        format: "qcm",
        choices: makeChoices(String(valeurArrivee), [
          String(valeurDepart + coefficient),
          String(valeurDepart - coefficient),
          String(valeurDepart + arrivee),
        ]),
        expected: [String(valeurArrivee)],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans un raisonnement “fois moins”, on divise les deux grandeurs par le même nombre.",
          `On passe de ${depart} à ${arrivee} en divisant par ${coefficient}.`,
          `${valeurDepart} ÷ ${coefficient} = ${valeurArrivee}.`,
          `La réponse est ${valeurArrivee}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 2,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["Départ", "Fois moins"],
          values: [
            [String(depart), String(arrivee)],
            [String(valeurDepart), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_fois_moins_tpl_005_qcm_demarche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_moins",
    difficulty: 3,
    theme: "neutral",
    hint: "La bonne démarche divise par le même nombre.",
    tags: [
      "cm1",
      "proportionnalite",
      "fois_moins",
      "qcm",
      "demarche",
      "template",
    ],
    generate: () => {
      const arrivee = randomChoice([2, 3, 4]);
      const coefficient = randomChoice([2, 3, 4]);
      const depart = arrivee * coefficient;
      const valeurDepart = randomChoice([24, 30, 36, 48, 60]);

      const correct = `diviser ${valeurDepart} par ${coefficient}`;

      return {
        text: `On sait que ${depart} objets correspondent à ${valeurDepart} unités. Pour trouver la valeur de ${arrivee} objets, quelle démarche est correcte ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `ajouter ${coefficient} à ${valeurDepart}`,
          `multiplier ${valeurDepart} par ${coefficient}`,
          `soustraire ${coefficient} à ${valeurDepart}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La démarche doit respecter le même rapport entre les deux quantités.",
          `On passe de ${depart} objets à ${arrivee} objets en divisant par ${coefficient}.`,
          `Il faut donc diviser ${valeurDepart} par ${coefficient}.`,
          "La bonne démarche est de diviser par le même nombre."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_fois_moins_tpl_006_open_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_fois_moins",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique le diviseur utilisé.",
    tags: [
      "cm1",
      "proportionnalite",
      "fois_moins",
      "open",
      "expliquer",
      "template",
      "canvas",
    ],
    generate: () => {
      const arrivee = randomChoice([2, 3, 4, 5]);
      const coefficient = randomChoice([2, 3, 4]);
      const depart = arrivee * coefficient;
      const valeurArrivee = randomChoice([4, 5, 6, 8, 10]);
      const valeurDepart = valeurArrivee * coefficient;

      return {
        text: `Explique comment trouver la valeur pour ${arrivee} objets si ${depart} objets correspondent à ${valeurDepart} unités.`,
        format: "open",
        expected: [
          String(depart),
          String(arrivee),
          String(coefficient),
          String(valeurArrivee),
          "divise",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans une situation proportionnelle, le même diviseur s’applique aux deux lignes.",
          `On repère que ${arrivee} = ${depart} ÷ ${coefficient}.`,
          `On fait donc ${valeurDepart} ÷ ${coefficient} = ${valeurArrivee}.`,
          `La valeur cherchée est ${valeurArrivee}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 2,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["Départ", "Fois moins"],
          values: [
            [String(depart), String(arrivee)],
            [String(valeurDepart), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },
    // ============================================================
  // PROP_TABLEAU
  // Compléter un tableau simple de proportionnalité
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_prop_tableau_fixed_001_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 1 carnet coûte 3 €. Combien coûtent 4 carnets ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Dans le tableau, on multiplie le nombre de carnets par 3.",
    explanation: exp(
      "Un tableau de proportionnalité permet d’organiser deux quantités liées.",
      "On cherche le coefficient multiplicateur : ici, 1 carnet coûte 3 €, donc on multiplie par 3.",
      "4 × 3 = 12.",
      "4 carnets coûtent 12 €."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 4,
      rowLabels: ["Carnets", "Prix (€)"],
      colLabels: ["1", "2", "3", "4"],
      values: [
        ["1", "2", "3", "4"],
        ["3", "6", "9", ""],
      ],
      missing: [{ row: 1, col: 3 }],
      highlightedCells: [{ row: 1, col: 3 }],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "tableau",
      "modele",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_prop_tableau_fixed_002_case_milieu",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un tableau proportionnel, 2 objets coûtent 8 €. Combien coûtent 5 objets si 1 objet coûte 4 € ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Le prix est le nombre d’objets multiplié par 4.",
    explanation: exp(
      "Dans un tableau proportionnel, chaque colonne garde le même coefficient.",
      "Ici, 1 objet coûte 4 €, donc on multiplie le nombre d’objets par 4.",
      "5 × 4 = 20.",
      "5 objets coûtent 20 €."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 4,
      rowLabels: ["Objets", "Prix (€)"],
      colLabels: ["1", "2", "5", "10"],
      values: [
        ["1", "2", "5", "10"],
        ["4", "8", "", "40"],
      ],
      missing: [{ row: 1, col: 2 }],
      highlightedCells: [{ row: 1, col: 2 }],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "tableau",
      "case_manquante",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_prop_tableau_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment compléter le tableau : 1 objet → 5 €, 2 objets → 10 €, 4 objets → ?",
    format: "open",
    expected: ["5", "4", "20", "multiplie", "tableau"],
    comparator: "contains_keyword",
    hint: "Cherche le prix d’un objet.",
    explanation: exp(
      "Pour compléter un tableau de proportionnalité, on cherche comment passer d’une ligne à l’autre.",
      "Ici, 1 objet coûte 5 €, donc on multiplie le nombre d’objets par 5.",
      "4 × 5 = 20.",
      "4 objets coûtent 20 €."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 3,
      rowLabels: ["Objets", "Prix (€)"],
      colLabels: ["1", "2", "4"],
      values: [
        ["1", "2", "4"],
        ["5", "10", ""],
      ],
      missing: [{ row: 1, col: 2 }],
      highlightedCells: [{ row: 1, col: 2 }],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "tableau",
      "open",
      "expliquer",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_prop_tableau_tpl_001_prix_unitaire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie le nombre d’objets par le prix d’un objet.",
    tags: [
      "cm1",
      "proportionnalite",
      "tableau",
      "prix_unitaire",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const prix = randomChoice([2, 3, 4, 5, 6, 8]);
      const quantite = randomChoice([3, 4, 5, 6, 8]);
      const result = prix * quantite;

      return {
        text: `Un objet coûte ${prix} €. Complète le tableau : combien coûtent ${quantite} objets ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Un tableau de proportionnalité peut être complété avec le prix unitaire.",
          "On multiplie la quantité par le prix d’un objet.",
          `${quantite} × ${prix} = ${result}.`,
          `${quantite} objets coûtent ${result} €.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Objets", "Prix (€)"],
          colLabels: ["1", "2", String(quantite), "10"],
          values: [
            ["1", "2", String(quantite), "10"],
            [String(prix), String(2 * prix), "", String(10 * prix)],
          ],
          missing: [{ row: 1, col: 2 }],
          highlightedCells: [{ row: 1, col: 2 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_tableau_tpl_002_fruits_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_tableau",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque panier contient le même nombre de fruits.",
    tags: [
      "cm1",
      "proportionnalite",
      "tableau",
      "reunion",
      "fruits",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const fruitsParPanier = randomChoice([6, 8, 10, 12]);
      const paniers = randomChoice([3, 4, 5, 6]);
      const total = fruitsParPanier * paniers;

      return {
        text: `Au marché de Saint-Pierre, chaque panier contient ${fruitsParPanier} fruits. Combien y a-t-il de fruits dans ${paniers} paniers ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le tableau est proportionnel car chaque panier contient le même nombre de fruits.",
          "On multiplie le nombre de paniers par le nombre de fruits dans un panier.",
          `${paniers} × ${fruitsParPanier} = ${total}.`,
          `Il y a ${total} fruits dans ${paniers} paniers.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Paniers", "Fruits"],
          colLabels: ["1", "2", String(paniers), "10"],
          values: [
            ["1", "2", String(paniers), "10"],
            [
              String(fruitsParPanier),
              String(2 * fruitsParPanier),
              "",
              String(10 * fruitsParPanier),
            ],
          ],
          missing: [{ row: 1, col: 2 }],
          highlightedCells: [{ row: 1, col: 2 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_tableau_tpl_003_complete_ligne_bas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le coefficient multiplicateur.",
    tags: [
      "cm1",
      "proportionnalite",
      "tableau",
      "ligne_bas",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5, 6, 8]);
      const x = randomChoice([4, 5, 6, 7, 8, 9]);
      const result = x * k;

      return {
        text: `Dans un tableau proportionnel, on multiplie la première ligne par ${k}. Quelle est la valeur sous ${x} ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un tableau proportionnel, on passe d’une ligne à l’autre avec le même multiplicateur.",
          `Ici, on multiplie par ${k}.`,
          `${x} × ${k} = ${result}.`,
          `La valeur manquante est ${result}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Ligne 1", "Ligne 2"],
          colLabels: ["1", "2", String(x), "10"],
          values: [
            ["1", "2", String(x), "10"],
            [String(k), String(2 * k), "", String(10 * k)],
          ],
          missing: [{ row: 1, col: 2 }],
          highlightedCells: [{ row: 1, col: 2 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_tableau_tpl_004_complete_ligne_haut",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche quel nombre de la première ligne donne la valeur de la deuxième ligne.",
    tags: [
      "cm1",
      "proportionnalite",
      "tableau",
      "ligne_haut",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5, 6]);
      const x = randomChoice([3, 4, 5, 6, 8]);
      const y = x * k;

      return {
        text: `Dans un tableau proportionnel, on multiplie la première ligne par ${k}. Quel nombre doit-on écrire au-dessus de ${y} ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "Pour compléter la première ligne, on utilise l’opération inverse.",
          `La deuxième ligne s’obtient en multipliant par ${k}.`,
          `${y} ÷ ${k} = ${x}.`,
          `Il faut écrire ${x} au-dessus de ${y}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Ligne 1", "Ligne 2"],
          colLabels: ["1", "2", "?", "10"],
          values: [
            ["1", "2", "", "10"],
            [String(k), String(2 * k), String(y), String(10 * k)],
          ],
          missing: [{ row: 0, col: 2 }],
          highlightedCells: [{ row: 0, col: 2 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_tableau_tpl_005_deux_cases_manquantes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise le même coefficient pour toutes les colonnes.",
    tags: [
      "cm1",
      "proportionnalite",
      "tableau",
      "deux_cases",
      "template",
      "qcm",
      "canvas",
    ],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5]);
      const x1 = randomChoice([3, 4, 5, 6]);
      const x2 = randomChoice([7, 8, 9, 10]);
      const y1 = x1 * k;
      const y2 = x2 * k;
      const correct = `${y1} et ${y2}`;

      return {
        text: `Dans ce tableau proportionnel, quelles sont les deux valeurs manquantes ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${y1 + 1} et ${y2 + 1}`,
          `${x1 + k} et ${x2 + k}`,
          `${x1 * x2} et ${k}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On complète un tableau proportionnel en utilisant le même coefficient.",
          `Ici, on multiplie la première ligne par ${k}.`,
          `${x1} × ${k} = ${y1} et ${x2} × ${k} = ${y2}.`,
          `Les valeurs manquantes sont ${y1} et ${y2}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Ligne 1", "Ligne 2"],
          colLabels: ["1", String(x1), String(x2), "10"],
          values: [
            ["1", String(x1), String(x2), "10"],
            [String(k), "", "", String(10 * k)],
          ],
          missing: [
            { row: 1, col: 1 },
            { row: 1, col: 2 },
          ],
          highlightedCells: [
            { row: 1, col: 1 },
            { row: 1, col: 2 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_tableau_tpl_006_qcm_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Le tableau est proportionnel : utilise le coefficient.",
    tags: [
      "cm1",
      "proportionnalite",
      "tableau",
      "operation",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const k = randomChoice([3, 4, 5, 6]);
      const x = randomChoice([4, 5, 6, 8]);
      const result = x * k;
      const correct = `${x} × ${k}`;

      return {
        text: `Quel calcul permet de compléter la case manquante du tableau ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${x} + ${k}`,
          `${x} - ${k}`,
          `${k} - ${x}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour compléter une case, il faut choisir l’opération qui respecte le tableau proportionnel.",
          `Ici, on multiplie la première ligne par ${k}.`,
          `${x} × ${k} = ${result}.`,
          `Le calcul correct est ${correct}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Ligne 1", "Ligne 2"],
          colLabels: ["1", String(x), "10"],
          values: [
            ["1", String(x), "10"],
            [String(k), "", String(10 * k)],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_tableau_tpl_007_open_expliquer_case",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_tableau",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique le coefficient du tableau.",
    tags: [
      "cm1",
      "proportionnalite",
      "tableau",
      "open",
      "expliquer",
      "template",
      "canvas",
    ],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5, 6]);
      const x = randomChoice([4, 5, 6, 8]);
      const result = x * k;

      return {
        text: `Explique comment compléter la case manquante : ${x} correspond à ? dans un tableau où 1 correspond à ${k}.`,
        format: "open",
        expected: [
          String(x),
          String(k),
          String(result),
          "multiplie",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour compléter un tableau de proportionnalité, on cherche le coefficient.",
          `Si 1 correspond à ${k}, alors on multiplie la première ligne par ${k}.`,
          `${x} × ${k} = ${result}.`,
          `La case manquante vaut ${result}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Ligne 1", "Ligne 2"],
          colLabels: ["1", String(x), "10"],
          values: [
            ["1", String(x), "10"],
            [String(k), "", String(10 * k)],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_tableau_tpl_008_open_erreur_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_tableau",
    difficulty: 4,
    theme: "neutral",
    hint: "Dans ce tableau, on multiplie. On n’ajoute pas toujours le même nombre.",
    tags: [
      "cm1",
      "proportionnalite",
      "tableau",
      "open",
      "erreur",
      "addition",
      "template",
      "canvas",
    ],
    generate: () => {
      const k = randomChoice([3, 4, 5, 6]);
      const x = randomChoice([4, 5, 6]);
      const correct = x * k;
      const wrong = x + k;

      return {
        text: `Un élève voit que 1 correspond à ${k}. Pour compléter sous ${x}, il calcule ${x} + ${k} = ${wrong}. Explique son erreur.`,
        format: "open",
        expected: [
          String(x),
          String(k),
          String(correct),
          "multiplie",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans un tableau proportionnel, on ne complète pas forcément en additionnant.",
          "Ici, 1 correspond à un nombre : il faut multiplier par ce coefficient.",
          `${x} × ${k} = ${correct}, et non ${x} + ${k} = ${wrong}.`,
          `La case manquante vaut ${correct}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Ligne 1", "Ligne 2"],
          colLabels: ["1", String(x), "10"],
          values: [
            ["1", String(x), "10"],
            [String(k), "", String(10 * k)],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },
    // ============================================================
  // PROP_COEFFICIENT
  // Utiliser un coefficient de proportionnalité simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_prop_coefficient_fixed_001_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coefficient",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un tableau, 1 carnet correspond à 4 €. Quel est le coefficient de proportionnalité ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Le coefficient est le nombre par lequel on multiplie la première ligne.",
    explanation: exp(
      "Le coefficient de proportionnalité est le nombre qui permet de passer d’une ligne à l’autre.",
      "Ici, on passe du nombre de carnets au prix en euros.",
      "1 × 4 = 4.",
      "Le coefficient de proportionnalité est 4."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 4,
      rowLabels: ["Carnets", "Prix (€)"],
      colLabels: ["1", "2", "3", "4"],
      values: [
        ["1", "2", "3", "4"],
        ["4", "8", "12", "16"],
      ],
      missing: [],
      highlightedCells: [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
      ],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "coefficient",
      "modele",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_prop_coefficient_fixed_002_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coefficient",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un tableau proportionnel, 3 objets correspondent à 15 unités. Quel est le coefficient ?",
    format: "qcm",
    choices: ["3", "5", "12", "18"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Cherche par combien on multiplie 3 pour obtenir 15.",
    explanation: exp(
      "Le coefficient de proportionnalité permet de passer d’une quantité à l’autre.",
      "On cherche le nombre qui transforme 3 en 15.",
      "15 ÷ 3 = 5, donc 3 × 5 = 15.",
      "Le coefficient est 5."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 3,
      rowLabels: ["Objets", "Unités"],
      colLabels: ["1", "3", "6"],
      values: [
        ["1", "3", "6"],
        ["5", "15", "30"],
      ],
      missing: [],
      highlightedCells: [
        { row: 0, col: 1 },
        { row: 1, col: 1 },
      ],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "coefficient",
      "qcm",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_prop_coefficient_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coefficient",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver le coefficient si 4 objets correspondent à 20 unités.",
    format: "open",
    expected: ["4", "20", "5", "divise", "coefficient"],
    comparator: "contains_keyword",
    hint: "Cherche le nombre qui transforme 4 en 20.",
    explanation: exp(
      "Pour trouver le coefficient, on cherche par combien on multiplie la première quantité.",
      "On peut faire une division : valeur de la deuxième ligne divisée par valeur de la première ligne.",
      "20 ÷ 4 = 5.",
      "Le coefficient de proportionnalité est 5."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 3,
      rowLabels: ["Objets", "Unités"],
      colLabels: ["1", "4", "8"],
      values: [
        ["1", "4", "8"],
        ["5", "20", "40"],
      ],
      missing: [],
      highlightedCells: [
        { row: 0, col: 1 },
        { row: 1, col: 1 },
      ],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "coefficient",
      "open",
      "expliquer",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_prop_coefficient_tpl_001_trouver_depuis_un",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coefficient",
    difficulty: 2,
    theme: "neutral",
    hint: "Si 1 objet correspond à une valeur, cette valeur est le coefficient.",
    tags: [
      "cm1",
      "proportionnalite",
      "coefficient",
      "depuis_un",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5, 6, 8, 10]);

      return {
        text: `Dans un tableau proportionnel, 1 objet correspond à ${k} unités. Quel est le coefficient ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: exp(
          "Quand la première ligne vaut 1, la valeur correspondante donne directement le coefficient.",
          "On lit la valeur associée à 1.",
          `1 × ${k} = ${k}.`,
          `Le coefficient de proportionnalité est ${k}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["1", "2", "3", "5"],
          values: [
            ["1", "2", "3", "5"],
            [String(k), String(2 * k), String(3 * k), String(5 * k)],
          ],
          missing: [],
          highlightedCells: [
            { row: 0, col: 0 },
            { row: 1, col: 0 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_coefficient_tpl_002_trouver_par_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coefficient",
    difficulty: 3,
    theme: "neutral",
    hint: "Fais valeur de la deuxième ligne ÷ valeur de la première ligne.",
    tags: [
      "cm1",
      "proportionnalite",
      "coefficient",
      "division",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const x = randomChoice([2, 3, 4, 5, 6, 8]);
      const k = randomChoice([2, 3, 4, 5, 6]);
      const y = x * k;

      return {
        text: `Dans un tableau proportionnel, ${x} objets correspondent à ${y} unités. Quel est le coefficient ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: exp(
          "Pour trouver le coefficient, on divise la valeur de la deuxième ligne par celle de la première ligne.",
          `On cherche par combien on multiplie ${x} pour obtenir ${y}.`,
          `${y} ÷ ${x} = ${k}.`,
          `Le coefficient est ${k}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["1", String(x), String(x * 2), String(x * 3)],
          values: [
            ["1", String(x), String(x * 2), String(x * 3)],
            [String(k), String(y), String(x * 2 * k), String(x * 3 * k)],
          ],
          missing: [],
          highlightedCells: [
            { row: 0, col: 1 },
            { row: 1, col: 1 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_coefficient_tpl_003_reunion_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coefficient",
    difficulty: 2,
    theme: "reunion",
    hint: "Le coefficient correspond au nombre de fruits dans un panier.",
    tags: [
      "cm1",
      "proportionnalite",
      "coefficient",
      "reunion",
      "fruits",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const fruits = randomChoice([6, 8, 10, 12]);
      const paniers = randomChoice([2, 3, 4, 5]);
      const total = fruits * paniers;

      return {
        text: `Au marché de Saint-Pierre, ${paniers} paniers identiques contiennent ${total} fruits. Combien de fruits y a-t-il dans 1 panier ?`,
        format: "short",
        expected: [String(fruits)],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient peut représenter la quantité pour une unité.",
          "Ici, on cherche le nombre de fruits dans un seul panier.",
          `${total} ÷ ${paniers} = ${fruits}.`,
          `Il y a ${fruits} fruits dans 1 panier.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Paniers", "Fruits"],
          colLabels: ["1", String(paniers), String(paniers * 2), "10"],
          values: [
            ["1", String(paniers), String(paniers * 2), "10"],
            ["", String(total), String(total * 2), String(10 * fruits)],
          ],
          missing: [{ row: 1, col: 0 }],
          highlightedCells: [{ row: 1, col: 0 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_coefficient_tpl_004_completer_apres_coefficient",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coefficient",
    difficulty: 3,
    theme: "neutral",
    hint: "Trouve d’abord le coefficient, puis complète.",
    tags: [
      "cm1",
      "proportionnalite",
      "coefficient",
      "completer",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5, 6]);
      const xKnown = randomChoice([2, 3, 4, 5]);
      const yKnown = xKnown * k;
      const xTarget = randomChoice([6, 7, 8, 9]);
      const result = xTarget * k;

      return {
        text: `Dans un tableau proportionnel, ${xKnown} correspond à ${yKnown}. Combien correspond à ${xTarget} ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "On peut d’abord trouver le coefficient de proportionnalité.",
          `Comme ${xKnown} correspond à ${yKnown}, le coefficient est ${yKnown} ÷ ${xKnown} = ${k}.`,
          `${xTarget} × ${k} = ${result}.`,
          `${xTarget} correspond à ${result}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Ligne 1", "Ligne 2"],
          colLabels: ["1", String(xKnown), String(xTarget), "10"],
          values: [
            ["1", String(xKnown), String(xTarget), "10"],
            [String(k), String(yKnown), "", String(10 * k)],
          ],
          missing: [{ row: 1, col: 2 }],
          highlightedCells: [
            { row: 0, col: 1 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_coefficient_tpl_005_qcm_coefficient",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coefficient",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient est le multiplicateur entre les deux lignes.",
    tags: [
      "cm1",
      "proportionnalite",
      "coefficient",
      "qcm",
      "template",
      "canvas",
    ],
    generate: () => {
      const x = randomChoice([2, 3, 4, 5, 6]);
      const k = randomChoice([2, 3, 4, 5, 6]);
      const y = x * k;

      return {
        text: `Dans un tableau proportionnel, ${x} correspond à ${y}. Quel est le coefficient ?`,
        format: "qcm",
        choices: makeChoices(String(k), [
          String(x + y),
          String(y - x),
          String(x),
        ]),
        expected: [String(k)],
        comparator: "mcq_exact",
        explanation: exp(
          "Le coefficient est le nombre par lequel on multiplie la valeur de départ.",
          `On cherche par combien on multiplie ${x} pour obtenir ${y}.`,
          `${y} ÷ ${x} = ${k}.`,
          `Le coefficient est ${k}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Ligne 1", "Ligne 2"],
          colLabels: ["1", String(x), "10"],
          values: [
            ["1", String(x), "10"],
            [String(k), String(y), String(10 * k)],
          ],
          missing: [],
          highlightedCells: [
            { row: 0, col: 1 },
            { row: 1, col: 1 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_coefficient_tpl_006_qcm_erreur_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coefficient",
    difficulty: 4,
    theme: "neutral",
    hint: "Le coefficient n’est pas l’écart. C’est un multiplicateur.",
    tags: [
      "cm1",
      "proportionnalite",
      "coefficient",
      "qcm",
      "erreur",
      "template",
      "canvas",
    ],
    generate: () => {
      const x = randomChoice([2, 3, 4, 5]);
      const k = randomChoice([3, 4, 5, 6]);
      const y = x * k;
      const wrong = y - x;

      return {
        text: `Dans un tableau, ${x} correspond à ${y}. Un élève dit que le coefficient est ${wrong}, car ${y} - ${x} = ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le coefficient de proportionnalité est un multiplicateur, pas une différence.",
          "Il faut chercher par combien on multiplie la première valeur.",
          `${y} ÷ ${x} = ${k}, donc le coefficient est ${k}.`,
          `L’élève n’a pas raison : ${wrong} est un écart, pas le coefficient.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Ligne 1", "Ligne 2"],
          colLabels: ["1", String(x), "10"],
          values: [
            ["1", String(x), "10"],
            [String(k), String(y), String(10 * k)],
          ],
          missing: [],
          highlightedCells: [
            { row: 0, col: 1 },
            { row: 1, col: 1 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_coefficient_tpl_007_open_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coefficient",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique avec une division.",
    tags: [
      "cm1",
      "proportionnalite",
      "coefficient",
      "open",
      "expliquer",
      "template",
      "canvas",
    ],
    generate: () => {
      const x = randomChoice([2, 3, 4, 5, 6]);
      const k = randomChoice([2, 3, 4, 5, 6]);
      const y = x * k;

      return {
        text: `Explique comment trouver le coefficient de proportionnalité si ${x} correspond à ${y}.`,
        format: "open",
        expected: [
          String(x),
          String(y),
          String(k),
          "divise",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour trouver le coefficient, on cherche le multiplicateur entre deux valeurs correspondantes.",
          "On divise la valeur de la deuxième ligne par celle de la première ligne.",
          `${y} ÷ ${x} = ${k}.`,
          `Le coefficient de proportionnalité est ${k}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Ligne 1", "Ligne 2"],
          colLabels: ["1", String(x), "10"],
          values: [
            ["1", String(x), "10"],
            [String(k), String(y), String(10 * k)],
          ],
          missing: [],
          highlightedCells: [
            { row: 0, col: 1 },
            { row: 1, col: 1 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_coefficient_tpl_008_open_utiliser_coefficient",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coefficient",
    difficulty: 4,
    theme: "neutral",
    hint: "Trouve le coefficient puis utilise-le pour compléter.",
    tags: [
      "cm1",
      "proportionnalite",
      "coefficient",
      "open",
      "utiliser",
      "template",
      "canvas",
    ],
    generate: () => {
      const xKnown = randomChoice([2, 3, 4, 5]);
      const k = randomChoice([2, 3, 4, 5]);
      const yKnown = xKnown * k;
      const xTarget = randomChoice([6, 7, 8, 9]);
      const yTarget = xTarget * k;

      return {
        text: `Explique comment compléter : ${xKnown} correspond à ${yKnown}, donc ${xTarget} correspond à ?`,
        format: "open",
        expected: [
          String(k),
          String(xTarget),
          String(yTarget),
          "coefficient",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour compléter, on peut d’abord trouver le coefficient de proportionnalité.",
          `${yKnown} ÷ ${xKnown} = ${k}. Le coefficient est donc ${k}.`,
          `${xTarget} × ${k} = ${yTarget}.`,
          `${xTarget} correspond à ${yTarget}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Ligne 1", "Ligne 2"],
          colLabels: ["1", String(xKnown), String(xTarget), "10"],
          values: [
            ["1", String(xKnown), String(xTarget), "10"],
            [String(k), String(yKnown), "", String(10 * k)],
          ],
          missing: [{ row: 1, col: 2 }],
          highlightedCells: [
            { row: 0, col: 1 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },
    // ============================================================
  // PROP_PROBLEME
  // Résoudre un problème simple de proportionnalité
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_prop_probleme_fixed_001_prix",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un stylo coûte 2 €. Combien coûtent 7 stylos ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Multiplie le nombre de stylos par le prix d’un stylo.",
    explanation: exp(
      "Un problème de proportionnalité relie deux quantités par un même multiplicateur.",
      "Ici, le prix total dépend du nombre de stylos.",
      "7 × 2 = 14.",
      "7 stylos coûtent 14 €."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 4,
      rowLabels: ["Stylos", "Prix (€)"],
      colLabels: ["1", "2", "7", "10"],
      values: [
        ["1", "2", "7", "10"],
        ["2", "4", "", "20"],
      ],
      missing: [{ row: 1, col: 2 }],
      highlightedCells: [{ row: 1, col: 2 }],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "probleme",
      "prix",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_prop_probleme_fixed_002_partage_groupes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "4 boîtes contiennent 28 crayons. Les boîtes sont identiques. Combien de crayons contient 1 boîte ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche la quantité pour une seule boîte.",
    explanation: exp(
      "Dans un problème de proportionnalité, on peut chercher la valeur pour une unité.",
      "Les boîtes sont identiques, donc chaque boîte contient le même nombre de crayons.",
      "28 ÷ 4 = 7.",
      "1 boîte contient 7 crayons."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 3,
      rowLabels: ["Boîtes", "Crayons"],
      colLabels: ["1", "4", "8"],
      values: [
        ["1", "4", "8"],
        ["", "28", "56"],
      ],
      missing: [{ row: 1, col: 0 }],
      highlightedCells: [{ row: 1, col: 0 }],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "probleme",
      "retour_unite",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_prop_probleme_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment résoudre : 3 carnets coûtent 12 €. Combien coûtent 6 carnets ?",
    format: "open",
    expected: ["3", "12", "6", "2", "24"],
    comparator: "contains_keyword",
    hint: "6 carnets, c’est 2 fois plus que 3 carnets.",
    explanation: exp(
      "Un problème de proportionnalité peut se résoudre avec un raisonnement fois plus.",
      "On compare les quantités : 6 carnets, c’est 2 fois plus que 3 carnets.",
      "12 × 2 = 24.",
      "6 carnets coûtent 24 €."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 2,
      rowLabels: ["Carnets", "Prix (€)"],
      colLabels: ["Départ", "Fois plus"],
      values: [
        ["3", "6"],
        ["12", ""],
      ],
      missing: [{ row: 1, col: 1 }],
      highlightedCells: [{ row: 1, col: 1 }],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "probleme",
      "open",
      "expliquer",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_prop_probleme_tpl_001_prix_unitaire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Prix total = quantité × prix d’un objet.",
    tags: [
      "cm1",
      "proportionnalite",
      "probleme",
      "prix_unitaire",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const prix = randomChoice([2, 3, 4, 5, 6, 8]);
      const quantite = randomChoice([4, 5, 6, 7, 8, 9]);
      const total = prix * quantite;

      return {
        text: `Un objet coûte ${prix} €. Combien coûtent ${quantite} objets ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le prix total est proportionnel au nombre d’objets si chaque objet a le même prix.",
          "On multiplie le nombre d’objets par le prix d’un objet.",
          `${quantite} × ${prix} = ${total}.`,
          `${quantite} objets coûtent ${total} €.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Objets", "Prix (€)"],
          colLabels: ["1", "2", String(quantite), "10"],
          values: [
            ["1", "2", String(quantite), "10"],
            [String(prix), String(2 * prix), "", String(10 * prix)],
          ],
          missing: [{ row: 1, col: 2 }],
          highlightedCells: [{ row: 1, col: 2 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_probleme_tpl_002_retour_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche d’abord la quantité pour 1.",
    tags: [
      "cm1",
      "proportionnalite",
      "probleme",
      "retour_unite",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const unite = randomChoice([3, 4, 5, 6, 8]);
      const groupes = randomChoice([2, 3, 4, 5]);
      const total = unite * groupes;

      return {
        text: `${groupes} boîtes identiques contiennent ${total} objets. Combien d’objets contient 1 boîte ?`,
        format: "short",
        expected: [String(unite)],
        comparator: "number_equal",
        explanation: exp(
          "Quand les boîtes sont identiques, la situation est proportionnelle.",
          "Pour trouver la quantité dans une boîte, on divise le total par le nombre de boîtes.",
          `${total} ÷ ${groupes} = ${unite}.`,
          `1 boîte contient ${unite} objets.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Boîtes", "Objets"],
          colLabels: ["1", String(groupes), String(groupes * 2)],
          values: [
            ["1", String(groupes), String(groupes * 2)],
            ["", String(total), String(total * 2)],
          ],
          missing: [{ row: 1, col: 0 }],
          highlightedCells: [{ row: 1, col: 0 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_probleme_tpl_003_reunion_paniers",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque panier contient le même nombre de fruits.",
    tags: [
      "cm1",
      "proportionnalite",
      "probleme",
      "reunion",
      "marche",
      "fruits",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const fruitsParPanier = randomChoice([6, 8, 10, 12]);
      const paniers = randomChoice([3, 4, 5, 6, 8]);
      const total = fruitsParPanier * paniers;

      return {
        text: `Au marché de Saint-Pierre, chaque panier contient ${fruitsParPanier} fruits. Combien y a-t-il de fruits dans ${paniers} paniers ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le nombre total de fruits est proportionnel au nombre de paniers.",
          "On multiplie le nombre de paniers par le nombre de fruits dans un panier.",
          `${paniers} × ${fruitsParPanier} = ${total}.`,
          `Il y a ${total} fruits.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Paniers", "Fruits"],
          colLabels: ["1", "2", String(paniers), "10"],
          values: [
            ["1", "2", String(paniers), "10"],
            [
              String(fruitsParPanier),
              String(2 * fruitsParPanier),
              "",
              String(10 * fruitsParPanier),
            ],
          ],
          missing: [{ row: 1, col: 2 }],
          highlightedCells: [{ row: 1, col: 2 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_probleme_tpl_004_reunion_bouteilles",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Le nombre de bouteilles est multiplié, donc la contenance totale aussi.",
    tags: [
      "cm1",
      "proportionnalite",
      "probleme",
      "reunion",
      "contenance",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const litresParLot = randomChoice([6, 8, 10, 12]);
      const lots = randomChoice([2, 3, 4, 5]);
      const total = litresParLot * lots;

      return {
        text: `Pour une sortie à la plage, 1 lot contient ${litresParLot} litres d’eau. Combien de litres y a-t-il dans ${lots} lots identiques ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La quantité d’eau est proportionnelle au nombre de lots identiques.",
          "On multiplie la quantité d’un lot par le nombre de lots.",
          `${lots} × ${litresParLot} = ${total}.`,
          `Il y a ${total} litres d’eau.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Lots", "Litres"],
          colLabels: ["1", "2", String(lots), "10"],
          values: [
            ["1", "2", String(lots), "10"],
            [
              String(litresParLot),
              String(2 * litresParLot),
              "",
              String(10 * litresParLot),
            ],
          ],
          missing: [{ row: 1, col: 2 }],
          highlightedCells: [{ row: 1, col: 2 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_probleme_tpl_005_fois_plus",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche par combien la quantité augmente.",
    tags: [
      "cm1",
      "proportionnalite",
      "probleme",
      "fois_plus",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const depart = randomChoice([2, 3, 4, 5]);
      const multiplicateur = randomChoice([2, 3, 4]);
      const arrivee = depart * multiplicateur;
      const valeurDepart = randomChoice([8, 10, 12, 15]);
      const valeurArrivee = valeurDepart * multiplicateur;

      return {
        text: `${depart} objets correspondent à ${valeurDepart} unités. Combien correspondent à ${arrivee} objets ?`,
        format: "short",
        expected: [String(valeurArrivee)],
        comparator: "number_equal",
        explanation: exp(
          "On peut résoudre ce problème avec un raisonnement fois plus.",
          `On passe de ${depart} objets à ${arrivee} objets en multipliant par ${multiplicateur}.`,
          `${valeurDepart} × ${multiplicateur} = ${valeurArrivee}.`,
          `${arrivee} objets correspondent à ${valeurArrivee} unités.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 2,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["Départ", "Fois plus"],
          values: [
            [String(depart), String(arrivee)],
            [String(valeurDepart), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_probleme_tpl_006_fois_moins",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche par combien la quantité diminue.",
    tags: [
      "cm1",
      "proportionnalite",
      "probleme",
      "fois_moins",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const arrivee = randomChoice([2, 3, 4, 5]);
      const diviseur = randomChoice([2, 3, 4]);
      const depart = arrivee * diviseur;
      const valeurArrivee = randomChoice([6, 8, 10, 12]);
      const valeurDepart = valeurArrivee * diviseur;

      return {
        text: `${depart} objets correspondent à ${valeurDepart} unités. Combien correspondent à ${arrivee} objets ?`,
        format: "short",
        expected: [String(valeurArrivee)],
        comparator: "number_equal",
        explanation: exp(
          "On peut résoudre ce problème avec un raisonnement fois moins.",
          `On passe de ${depart} objets à ${arrivee} objets en divisant par ${diviseur}.`,
          `${valeurDepart} ÷ ${diviseur} = ${valeurArrivee}.`,
          `${arrivee} objets correspondent à ${valeurArrivee} unités.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 2,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["Départ", "Fois moins"],
          values: [
            [String(depart), String(arrivee)],
            [String(valeurDepart), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_probleme_tpl_007_qcm_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Choisis l’opération qui respecte la proportionnalité.",
    tags: [
      "cm1",
      "proportionnalite",
      "probleme",
      "qcm",
      "operation",
      "template",
      "canvas",
    ],
    generate: () => {
      const prix = randomChoice([2, 3, 4, 5, 6]);
      const quantite = randomChoice([4, 5, 6, 8]);
      const total = prix * quantite;
      const correct = `${quantite} × ${prix}`;

      return {
        text: `Un objet coûte ${prix} €. Quel calcul permet de trouver le prix de ${quantite} objets ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${quantite} + ${prix}`,
          `${prix} - ${quantite}`,
          `${quantite} ÷ ${prix}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans un problème de prix proportionnel, on multiplie la quantité par le prix d’un objet.",
          "Chaque objet coûte le même prix.",
          `${quantite} × ${prix} = ${total}.`,
          `Le bon calcul est ${correct}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Objets", "Prix (€)"],
          colLabels: ["1", String(quantite), "10"],
          values: [
            ["1", String(quantite), "10"],
            [String(prix), "", String(10 * prix)],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_probleme_tpl_008_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Trouve d’abord la quantité pour 1 ou utilise le coefficient.",
    tags: [
      "cm1",
      "proportionnalite",
      "probleme",
      "qcm",
      "resultat",
      "template",
      "canvas",
    ],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5, 6]);
      const x = randomChoice([4, 5, 6, 8]);
      const result = x * k;

      return {
        text: `Dans une situation proportionnelle, 1 correspond à ${k}. Combien correspond à ${x} ?`,
        format: "qcm",
        choices: makeChoices(String(result), [
          String(x + k),
          String(result + k),
          String(Math.max(0, result - 1)),
        ]),
        expected: [String(result)],
        comparator: "mcq_exact",
        explanation: exp(
          "Si 1 correspond à une valeur, cette valeur est le coefficient.",
          `On multiplie ${x} par ${k}.`,
          `${x} × ${k} = ${result}.`,
          `${x} correspond à ${result}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Ligne 1", "Ligne 2"],
          colLabels: ["1", String(x), "10"],
          values: [
            ["1", String(x), "10"],
            [String(k), "", String(10 * k)],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_probleme_tpl_009_open_rediger",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique le coefficient et rédige une phrase-réponse.",
    tags: [
      "cm1",
      "proportionnalite",
      "probleme",
      "open",
      "rediger",
      "template",
      "canvas",
    ],
    generate: () => {
      const prix = randomChoice([2, 3, 4, 5, 6]);
      const quantite = randomChoice([4, 5, 6, 8]);
      const total = prix * quantite;

      return {
        text: `Un objet coûte ${prix} €. Explique comment trouver le prix de ${quantite} objets et rédige une phrase-réponse.`,
        format: "open",
        expected: [
          String(prix),
          String(quantite),
          String(total),
          "multiplie",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour résoudre le problème, on reconnaît une situation de proportionnalité.",
          "Le prix total dépend du nombre d’objets et chaque objet coûte le même prix.",
          `${quantite} × ${prix} = ${total}.`,
          `Phrase-réponse : ${quantite} objets coûtent ${total} €.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Objets", "Prix (€)"],
          colLabels: ["1", String(quantite), "10"],
          values: [
            ["1", String(quantite), "10"],
            [String(prix), "", String(10 * prix)],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_probleme_tpl_010_open_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : il ne faut pas ajouter la quantité et le prix unitaire.",
    tags: [
      "cm1",
      "proportionnalite",
      "probleme",
      "open",
      "erreur",
      "template",
      "canvas",
    ],
    generate: () => {
      const prix = randomChoice([3, 4, 5, 6]);
      const quantite = randomChoice([4, 5, 6, 8]);
      const wrong = prix + quantite;
      const correct = prix * quantite;

      return {
        text: `Un objet coûte ${prix} €. Pour ${quantite} objets, un élève calcule ${quantite} + ${prix} = ${wrong}. Explique son erreur.`,
        format: "open",
        expected: [
          String(prix),
          String(quantite),
          String(correct),
          "multiplie",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans un problème de proportionnalité avec un prix unitaire, on multiplie.",
          "L’élève a additionné la quantité et le prix d’un objet, mais cela ne donne pas le prix total.",
          `${quantite} × ${prix} = ${correct}, et non ${quantite} + ${prix} = ${wrong}.`,
          `Le prix total est ${correct} €.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 3,
          rowLabels: ["Objets", "Prix (€)"],
          colLabels: ["1", String(quantite), "10"],
          values: [
            ["1", String(quantite), "10"],
            [String(prix), "", String(10 * prix)],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },
    // ============================================================
  // PROP_DEFI
  // Résoudre un défi de proportionnalité
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_prop_defi_fixed_001_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi marché : 3 paniers contiennent 24 fruits. Les paniers sont identiques. Combien de fruits contiennent 5 paniers ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "Cherche d’abord le nombre de fruits dans 1 panier.",
    explanation: exp(
      "Un défi de proportionnalité peut demander de revenir à l’unité avant de calculer une autre quantité.",
      "On cherche d’abord combien contient 1 panier, puis on calcule pour 5 paniers.",
      "24 ÷ 3 = 8, puis 5 × 8 = 40.",
      "5 paniers contiennent 40 fruits."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 4,
      rowLabels: ["Paniers", "Fruits"],
      colLabels: ["1", "3", "5", "10"],
      values: [
        ["1", "3", "5", "10"],
        ["", "24", "", "80"],
      ],
      missing: [
        { row: 1, col: 0 },
        { row: 1, col: 2 },
      ],
      highlightedCells: [
        { row: 1, col: 0 },
        { row: 1, col: 2 },
      ],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "defi",
      "reunion",
      "marche",
      "retour_unite",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_prop_defi_fixed_002_fois_plus",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : 4 boîtes contiennent 36 crayons. Combien de crayons contiennent 8 boîtes identiques ?",
    format: "short",
    expected: ["72"],
    comparator: "number_equal",
    hint: "8 boîtes, c’est 2 fois plus que 4 boîtes.",
    explanation: exp(
      "Un défi de proportionnalité peut se résoudre avec un raisonnement fois plus.",
      "On remarque que 8 boîtes, c’est 2 fois plus que 4 boîtes.",
      "36 × 2 = 72.",
      "8 boîtes contiennent 72 crayons."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 2,
      rowLabels: ["Boîtes", "Crayons"],
      colLabels: ["Départ", "Fois plus"],
      values: [
        ["4", "8"],
        ["36", ""],
      ],
      missing: [{ row: 1, col: 1 }],
      highlightedCells: [{ row: 1, col: 1 }],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "defi",
      "fois_plus",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_prop_defi_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment résoudre : 6 objets coûtent 30 €. Combien coûtent 10 objets ?",
    format: "open",
    expected: ["6", "30", "1", "5", "10", "50"],
    comparator: "contains_keyword",
    hint: "Tu peux chercher le prix d’un objet, puis multiplier par 10.",
    explanation: exp(
      "Un défi de proportionnalité peut demander deux étapes.",
      "On cherche d’abord le prix d’un objet, puis on calcule le prix de 10 objets.",
      "30 ÷ 6 = 5, puis 10 × 5 = 50.",
      "10 objets coûtent 50 €."
    ),
    canvas: tableauProportionnaliteCanvas({
      rows: 2,
      cols: 4,
      rowLabels: ["Objets", "Prix (€)"],
      colLabels: ["1", "6", "10", "12"],
      values: [
        ["1", "6", "10", "12"],
        ["", "30", "", "60"],
      ],
      missing: [
        { row: 1, col: 0 },
        { row: 1, col: 2 },
      ],
      highlightedCells: [
        { row: 1, col: 0 },
        { row: 1, col: 2 },
      ],
      display: {
        showRowLabels: true,
        showColLabels: true,
        showMissing: true,
        showGrid: true,
      },
    }),
    tags: [
      "cm1",
      "proportionnalite",
      "defi",
      "open",
      "expliquer",
      "retour_unite",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_prop_defi_tpl_001_retour_unite_puis_multiplier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche d’abord la valeur pour 1, puis calcule la valeur demandée.",
    tags: [
      "cm1",
      "proportionnalite",
      "defi",
      "retour_unite",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const coefficient = randomChoice([3, 4, 5, 6, 8]);
      const knownX = randomChoice([2, 3, 4, 5]);
      const targetX = randomChoice([6, 7, 8, 9, 10]);
      const knownY = knownX * coefficient;
      const targetY = targetX * coefficient;

      return {
        text: `Défi : ${knownX} objets correspondent à ${knownY} unités. Combien correspondent à ${targetX} objets ?`,
        format: "short",
        expected: [String(targetY)],
        comparator: "number_equal",
        explanation: exp(
          "On peut résoudre ce défi en revenant à l’unité.",
          `On cherche d’abord la valeur pour 1 objet : ${knownY} ÷ ${knownX} = ${coefficient}.`,
          `Puis ${targetX} × ${coefficient} = ${targetY}.`,
          `${targetX} objets correspondent à ${targetY} unités.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["1", String(knownX), String(targetX), "10"],
          values: [
            ["1", String(knownX), String(targetX), "10"],
            ["", String(knownY), "", String(10 * coefficient)],
          ],
          missing: [
            { row: 1, col: 0 },
            { row: 1, col: 2 },
          ],
          highlightedCells: [
            { row: 1, col: 0 },
            { row: 1, col: 2 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_defi_tpl_002_reunion_fruits_retour_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Cherche le nombre de fruits dans 1 panier.",
    tags: [
      "cm1",
      "proportionnalite",
      "defi",
      "reunion",
      "marche",
      "fruits",
      "retour_unite",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const fruitsParPanier = randomChoice([6, 8, 10, 12]);
      const knownPaniers = randomChoice([2, 3, 4]);
      const targetPaniers = randomChoice([5, 6, 8, 10]);
      const knownFruits = knownPaniers * fruitsParPanier;
      const targetFruits = targetPaniers * fruitsParPanier;

      return {
        text: `Au marché de Saint-Pierre, ${knownPaniers} paniers identiques contiennent ${knownFruits} fruits. Combien de fruits contiennent ${targetPaniers} paniers ?`,
        format: "short",
        expected: [String(targetFruits)],
        comparator: "number_equal",
        explanation: exp(
          "On reconnaît une situation de proportionnalité avec des paniers identiques.",
          "On cherche d’abord combien de fruits contient 1 panier.",
          `${knownFruits} ÷ ${knownPaniers} = ${fruitsParPanier}, puis ${targetPaniers} × ${fruitsParPanier} = ${targetFruits}.`,
          `${targetPaniers} paniers contiennent ${targetFruits} fruits.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Paniers", "Fruits"],
          colLabels: ["1", String(knownPaniers), String(targetPaniers), "10"],
          values: [
            ["1", String(knownPaniers), String(targetPaniers), "10"],
            ["", String(knownFruits), "", String(10 * fruitsParPanier)],
          ],
          missing: [
            { row: 1, col: 0 },
            { row: 1, col: 2 },
          ],
          highlightedCells: [
            { row: 1, col: 0 },
            { row: 1, col: 2 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_defi_tpl_003_fois_plus_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère si la quantité demandée est plusieurs fois plus grande.",
    tags: [
      "cm1",
      "proportionnalite",
      "defi",
      "fois_plus",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const knownX = randomChoice([2, 3, 4, 5]);
      const multiplier = randomChoice([2, 3, 4]);
      const targetX = knownX * multiplier;
      const knownY = randomChoice([8, 10, 12, 15, 18]);
      const targetY = knownY * multiplier;

      return {
        text: `Défi : ${knownX} objets correspondent à ${knownY} unités. Combien correspondent à ${targetX} objets ?`,
        format: "short",
        expected: [String(targetY)],
        comparator: "number_equal",
        explanation: exp(
          "On peut utiliser un raisonnement fois plus.",
          `On passe de ${knownX} objets à ${targetX} objets en multipliant par ${multiplier}.`,
          `${knownY} × ${multiplier} = ${targetY}.`,
          `${targetX} objets correspondent à ${targetY} unités.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 2,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["Départ", "Fois plus"],
          values: [
            [String(knownX), String(targetX)],
            [String(knownY), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_defi_tpl_004_fois_moins_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère si la quantité demandée est plusieurs fois plus petite.",
    tags: [
      "cm1",
      "proportionnalite",
      "defi",
      "fois_moins",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const targetX = randomChoice([2, 3, 4, 5]);
      const divider = randomChoice([2, 3, 4]);
      const knownX = targetX * divider;
      const targetY = randomChoice([6, 8, 10, 12]);
      const knownY = targetY * divider;

      return {
        text: `Défi : ${knownX} objets correspondent à ${knownY} unités. Combien correspondent à ${targetX} objets ?`,
        format: "short",
        expected: [String(targetY)],
        comparator: "number_equal",
        explanation: exp(
          "On peut utiliser un raisonnement fois moins.",
          `On passe de ${knownX} objets à ${targetX} objets en divisant par ${divider}.`,
          `${knownY} ÷ ${divider} = ${targetY}.`,
          `${targetX} objets correspondent à ${targetY} unités.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 2,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["Départ", "Fois moins"],
          values: [
            [String(knownX), String(targetX)],
            [String(knownY), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_defi_tpl_005_qcm_strategie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "La bonne stratégie commence par la valeur pour 1.",
    tags: [
      "cm1",
      "proportionnalite",
      "defi",
      "qcm",
      "strategie",
      "template",
      "canvas",
    ],
    generate: () => {
      const coefficient = randomChoice([3, 4, 5, 6]);
      const knownX = randomChoice([2, 3, 4]);
      const targetX = randomChoice([5, 6, 8, 10]);
      const knownY = knownX * coefficient;
      const targetY = targetX * coefficient;

      const correct = `chercher 1 objet, puis multiplier par ${targetX}`;

      return {
        text: `${knownX} objets correspondent à ${knownY} unités. On cherche la valeur pour ${targetX} objets. Quelle stratégie est correcte ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `additionner ${knownX} et ${knownY}`,
          `soustraire ${knownX} à ${knownY}`,
          `multiplier ${knownY} par ${knownX}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans un défi de proportionnalité, revenir à l’unité est souvent une stratégie fiable.",
          `On cherche d’abord la valeur pour 1 objet : ${knownY} ÷ ${knownX} = ${coefficient}.`,
          `Puis ${targetX} × ${coefficient} = ${targetY}.`,
          `La bonne stratégie est : ${correct}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["1", String(knownX), String(targetX), "10"],
          values: [
            ["1", String(knownX), String(targetX), "10"],
            ["", String(knownY), "", String(10 * coefficient)],
          ],
          missing: [
            { row: 1, col: 0 },
            { row: 1, col: 2 },
          ],
          highlightedCells: [
            { row: 1, col: 0 },
            { row: 1, col: 2 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_defi_tpl_006_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Trouve d’abord le coefficient de proportionnalité.",
    tags: [
      "cm1",
      "proportionnalite",
      "defi",
      "qcm",
      "resultat",
      "template",
      "canvas",
    ],
    generate: () => {
      const coefficient = randomChoice([3, 4, 5, 6]);
      const knownX = randomChoice([2, 3, 4, 5]);
      const targetX = randomChoice([6, 7, 8, 9, 10]);
      const knownY = knownX * coefficient;
      const targetY = targetX * coefficient;

      return {
        text: `Défi : ${knownX} objets correspondent à ${knownY} unités. Combien correspondent à ${targetX} objets ?`,
        format: "qcm",
        choices: makeChoices(String(targetY), [
          String(knownY + targetX),
          String(targetY + coefficient),
          String(Math.max(0, targetY - coefficient)),
        ]),
        expected: [String(targetY)],
        comparator: "mcq_exact",
        explanation: exp(
          "On cherche d’abord le coefficient de proportionnalité.",
          `${knownY} ÷ ${knownX} = ${coefficient}.`,
          `${targetX} × ${coefficient} = ${targetY}.`,
          `La réponse est ${targetY}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["1", String(knownX), String(targetX), "10"],
          values: [
            ["1", String(knownX), String(targetX), "10"],
            ["", String(knownY), "", String(10 * coefficient)],
          ],
          missing: [
            { row: 1, col: 0 },
            { row: 1, col: 2 },
          ],
          highlightedCells: [
            { row: 1, col: 0 },
            { row: 1, col: 2 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_defi_tpl_007_open_expliquer_retour_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique les deux étapes : pour 1, puis pour la quantité demandée.",
    tags: [
      "cm1",
      "proportionnalite",
      "defi",
      "open",
      "expliquer",
      "retour_unite",
      "template",
      "canvas",
    ],
    generate: () => {
      const coefficient = randomChoice([3, 4, 5, 6]);
      const knownX = randomChoice([2, 3, 4]);
      const targetX = randomChoice([5, 6, 8, 10]);
      const knownY = knownX * coefficient;
      const targetY = targetX * coefficient;

      return {
        text: `Explique comment résoudre : ${knownX} objets correspondent à ${knownY} unités. Combien correspondent à ${targetX} objets ?`,
        format: "open",
        expected: [
          String(knownX),
          String(knownY),
          String(coefficient),
          String(targetX),
          String(targetY),
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "On peut résoudre le défi en revenant à l’unité.",
          `D’abord, on cherche la valeur pour 1 objet : ${knownY} ÷ ${knownX} = ${coefficient}.`,
          `Ensuite, on calcule pour ${targetX} objets : ${targetX} × ${coefficient} = ${targetY}.`,
          `${targetX} objets correspondent à ${targetY} unités.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["1", String(knownX), String(targetX), "10"],
          values: [
            ["1", String(knownX), String(targetX), "10"],
            ["", String(knownY), "", String(10 * coefficient)],
          ],
          missing: [
            { row: 1, col: 0 },
            { row: 1, col: 2 },
          ],
          highlightedCells: [
            { row: 1, col: 0 },
            { row: 1, col: 2 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_prop_defi_tpl_008_open_erreur_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Dans une situation proportionnelle, on cherche un multiplicateur, pas une addition au hasard.",
    tags: [
      "cm1",
      "proportionnalite",
      "defi",
      "open",
      "erreur",
      "addition",
      "template",
      "canvas",
    ],
    generate: () => {
      const coefficient = randomChoice([3, 4, 5, 6]);
      const knownX = randomChoice([2, 3, 4]);
      const targetX = randomChoice([5, 6, 8, 10]);
      const knownY = knownX * coefficient;
      const targetY = targetX * coefficient;
      const wrong = knownY + targetX;

      return {
        text: `Un élève lit : ${knownX} objets correspondent à ${knownY} unités. Pour ${targetX} objets, il calcule ${knownY} + ${targetX} = ${wrong}. Explique son erreur.`,
        format: "open",
        expected: [
          String(knownX),
          String(knownY),
          String(targetX),
          String(targetY),
          "multiplie",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "L’erreur vient du choix de l’opération.",
          "Dans une situation proportionnelle, on cherche le coefficient multiplicateur ou on revient à l’unité.",
          `${knownY} ÷ ${knownX} = ${coefficient}, puis ${targetX} × ${coefficient} = ${targetY}.`,
          `La bonne réponse est ${targetY}, pas ${wrong}.`
        ),
        canvas: tableauProportionnaliteCanvas({
          rows: 2,
          cols: 4,
          rowLabels: ["Objets", "Unités"],
          colLabels: ["1", String(knownX), String(targetX), "10"],
          values: [
            ["1", String(knownX), String(targetX), "10"],
            ["", String(knownY), "", String(10 * coefficient)],
          ],
          missing: [
            { row: 1, col: 0 },
            { row: 1, col: 2 },
          ],
          highlightedCells: [
            { row: 1, col: 0 },
            { row: 1, col: 2 },
          ],
          display: {
            showRowLabels: true,
            showColLabels: true,
            showMissing: true,
            showGrid: true,
          },
        }),
      };
    },
  },
];
