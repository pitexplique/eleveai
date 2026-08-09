// lib/tutor-v4/questionBank/ce2/maths/donnees.bank.ts
//
// Les tableaux et diagrammes en barres du CE2, écrits à la main. Huit
// micro-compétences — la plus grosse notion du niveau — qui passaient par le
// constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : lire un tableau, lire un
// tableau à double entrée, le compléter, lire un diagramme en barres, en
// produire un, interpréter les données et résoudre un problème à partir de là.
// ⛔ Pas de moyenne, pas de pourcentage au cycle 2 : ils arrivent au cycle 3.
// On lit, on compare, on additionne.
//
// LE PIÈGE DE LA NOTION : la graduation du diagramme. Quand un carreau vaut
// 2 unités, une barre haute de 3 carreaux ne vaut pas 3, elle vaut 6. L'élève
// compte les carreaux et s'arrête là. Les diagrammes de cette banque ne sont
// donc pas tous gradués de 1 en 1.
// Le second, propre au tableau à double entrée : croiser la mauvaise ligne. On
// pose un doigt sur la ligne, un autre sur la colonne, et on les fait se
// rejoindre — c'est la seule méthode qui tienne.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type {
  StatGraphCanvasData,
  TableauDonneesCanvasData,
  TutorBankItemV4,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

// La bonne réponse est mise de côté, trois pièges distincts sont tirés ensuite,
// puis on mélange. L'écrire autrement a rendu des questions impossibles à
// réussir dans 79 banques : voir scripts/verifier-generateurs.mjs.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function tableau(data: Omit<TableauDonneesCanvasData, "kind">): TableauDonneesCanvasData {
  return { kind: "tableau_donnees", ...data };
}

/**
 * Un diagramme en barres.
 * ⚠️ `showValues` écrit la hauteur au-dessus de chaque barre : on l'éteint
 * dès qu'on demande à l'élève de LIRE le diagramme, sinon la réponse est
 * imprimée sur le dessin.
 */
function diagramme(
  titre: string,
  donnees: Array<{ label: string; value: number }>,
  montrerValeurs = false,
): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    graphType: "barres",
    title: titre,
    data: donnees,
    display: { showValues: montrerValeurs, showLabels: true },
  };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const FRUITS = ["letchis", "mangues", "ananas", "bananes"] as const;
const CLASSES = ["CP", "CE1", "CE2", "CM1"] as const;

export const donneesBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_DONNEES_LIRE_TABLEAU — lire une ligne, une colonne
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_donnees_lire_tableau_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "À quoi sert la première ligne d'un tableau, celle qui est en gras ?",
    format: "qcm",
    choices: [
      "elle dit ce que contient chaque colonne",
      "elle contient les plus grands nombres",
      "elle sert de décoration",
      "elle donne le total",
    ],
    expected: ["elle dit ce que contient chaque colonne"],
    comparator: "mcq_exact",
    hint: "C'est le mode d'emploi du tableau.",
    explanation: exp(
      "La première ligne d'un tableau porte les en-têtes : elle nomme ce que contient chaque colonne.",
      "On lit d'abord les en-têtes, avant de chercher un nombre.",
      "Sans en-tête, un nombre dans une case ne veut rien dire : on ne saurait pas s'il compte des élèves, des euros ou des kilos.",
      "Elle dit ce que contient chaque colonne.",
    ),
    tags: ["ce2", "donnees", "lire_tableau", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_donnees_lire_tableau_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_lire_tableau",
    difficulty: 2,
    theme: "reunion",
    text: "Dans ce tableau, combien de mangues ont été vendues ?",
    format: "short",
    expected: ["45"],
    comparator: "number_equal",
    hint: "Trouve la ligne « mangues », puis lis la case des quantités.",
    explanation: exp(
      "Un tableau range les données : chaque ligne concerne un objet, chaque colonne une information.",
      "On cherche la ligne demandée, puis on lit la case de la bonne colonne.",
      "La ligne « mangues » porte 45 dans la colonne des quantités vendues.",
      "45 mangues ont été vendues.",
    ),
    tags: ["ce2", "donnees", "lire_tableau", "reunion", "canvas"],
    canvas: tableau({
      title: "Ventes du marché forain",
      headers: ["Fruit", "Quantité vendue"],
      rows: [
        { values: ["letchis", 78] },
        { values: ["mangues", 45] },
        { values: ["ananas", 32] },
        { values: ["bananes", 60] },
      ],
    }),
  },
  {
    kind: "fixed",
    id: "ce2_donnees_lire_tableau_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_lire_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève cherche une donnée dans un tableau et lit la case juste au-dessus de la bonne. Que doit-il faire pour ne plus se tromper ?",
    format: "qcm",
    choices: [
      "poser son doigt sur la ligne cherchée et le faire glisser jusqu'à la colonne",
      "lire plus vite",
      "commencer par la dernière ligne",
      "recopier tout le tableau",
    ],
    expected: ["poser son doigt sur la ligne cherchée et le faire glisser jusqu'à la colonne"],
    comparator: "mcq_exact",
    hint: "Le doigt ne saute pas de ligne, l'œil si.",
    explanation: exp(
      "Lire un tableau, c'est croiser une ligne et une colonne — et l'œil seul saute facilement d'une ligne à l'autre.",
      "On pose le doigt sur la ligne, on le fait glisser jusqu'à la colonne, et on lit la case où il s'arrête.",
      "Le doigt garde la ligne pendant que le regard cherche la colonne. C'est la méthode la plus sûre, et elle sert encore plus dans les tableaux à double entrée.",
      "Il faut poser le doigt sur la ligne et le faire glisser.",
    ),
    tags: ["ce2", "donnees", "lire_tableau", "piege", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_donnees_lire_tableau_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_lire_tableau",
    difficulty: 2,
    theme: "reunion",
    hint: "Trouve la ligne, puis lis la case.",
    tags: ["ce2", "donnees", "lire_tableau", "reunion", "template", "canvas"],
    generate: () => {
      const valeurs = shuffle([
        randomInt(20, 40),
        randomInt(41, 60),
        randomInt(61, 80),
        randomInt(81, 99),
      ]);
      const i = randomInt(0, 3);
      return {
        text: `Dans ce tableau, combien de ${FRUITS[i]} ont été vendus ?`,
        format: "short",
        expected: [String(valeurs[i])],
        comparator: "number_equal",
        explanation: exp(
          "Un tableau range les données : chaque ligne concerne un fruit, chaque colonne une information.",
          "On pose le doigt sur la ligne cherchée et on le fait glisser jusqu'à la colonne.",
          `La ligne « ${FRUITS[i]} » porte ${valeurs[i]} dans la colonne des quantités.`,
          `${valeurs[i]} ${FRUITS[i]} ont été vendus.`,
        ),
        canvas: tableau({
          title: "Ventes du marché forain",
          headers: ["Fruit", "Quantité vendue"],
          rows: FRUITS.map((f, k) => ({ values: [f, valeurs[k]] })),
          highlight: { row: i },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_donnees_lire_tableau_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les nombres de la colonne.",
    tags: ["ce2", "donnees", "lire_tableau", "template", "canvas"],
    generate: () => {
      const valeurs = shuffle([
        randomInt(20, 40),
        randomInt(41, 60),
        randomInt(61, 80),
        randomInt(81, 99),
      ]);
      const cherche = randomChoice(["le plus", "le moins"] as const);
      const cible = cherche === "le plus" ? Math.max(...valeurs) : Math.min(...valeurs);
      const bonne = FRUITS[valeurs.indexOf(cible)];
      return {
        text: `Dans ce tableau, quel fruit s'est vendu ${cherche} ?`,
        format: "qcm",
        choices: makeChoices(bonne, FRUITS),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer des données d'un tableau, c'est comparer les nombres d'une même colonne.",
          "On parcourt la colonne des quantités et on cherche le nombre le plus grand ou le plus petit.",
          `Les quantités sont ${valeurs.join(", ")}. La ${cherche === "le plus" ? "plus grande" : "plus petite"} est ${cible}, sur la ligne « ${bonne} ».`,
          `C'est ${bonne}.`,
        ),
        canvas: tableau({
          title: "Ventes du marché forain",
          headers: ["Fruit", "Quantité vendue"],
          rows: FRUITS.map((f, k) => ({ values: [f, valeurs[k]] })),
        }),
      };
    },
  },

  /* =========================================================
     CE2_DONNEES_DOUBLE_ENTREE — croiser ligne et colonne
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_donnees_double_entree_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_double_entree",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un tableau à double entrée, que trouve-t-on dans une case ?",
    format: "qcm",
    choices: [
      "ce qui croise la ligne et la colonne",
      "le total de la ligne",
      "le total de la colonne",
      "un nombre au hasard",
    ],
    expected: ["ce qui croise la ligne et la colonne"],
    comparator: "mcq_exact",
    hint: "Deux entrées : une par le côté, une par le haut.",
    explanation: exp(
      "Un tableau à double entrée croise deux informations : une donnée par les lignes, une autre par les colonnes.",
      "On repère la ligne, puis la colonne, et on lit la case où elles se rencontrent.",
      "La case qui croise la ligne « CE2 » et la colonne « mardi » donne ce qui concerne le CE2 le mardi — et rien d'autre.",
      "Ce qui croise la ligne et la colonne.",
    ),
    tags: ["ce2", "donnees", "double_entree", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_donnees_double_entree_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_double_entree",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ce tableau, combien d'élèves de CE2 mangent à la cantine le mardi ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Doigt sur la ligne CE2, glisse jusqu'à la colonne mardi.",
    explanation: exp(
      "Une case d'un tableau à double entrée donne le croisement d'une ligne et d'une colonne.",
      "On pose le doigt sur la ligne CE2, on le fait glisser jusqu'à la colonne « mardi », et on lit.",
      "La ligne CE2 croise la colonne « mardi » sur la case 18.",
      "18 élèves de CE2 mangent à la cantine le mardi.",
    ),
    tags: ["ce2", "donnees", "double_entree", "canvas"],
    canvas: tableau({
      title: "Élèves à la cantine",
      headers: ["Classe", "lundi", "mardi", "jeudi"],
      rows: [
        { values: ["CP", 12, 15, 11] },
        { values: ["CE1", 20, 14, 19] },
        { values: ["CE2", 16, 18, 21] },
      ],
    }),
  },
  {
    kind: "fixed",
    id: "ce2_donnees_double_entree_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_double_entree",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève cherche le nombre d'élèves de CE2 le mardi, mais il lit la case de la ligne CE1. Quelle erreur a-t-il faite ?",
    format: "qcm",
    choices: [
      "il a croisé la bonne colonne avec la mauvaise ligne",
      "il a lu le total",
      "il a inversé les colonnes",
      "il n'y a pas d'erreur",
    ],
    expected: ["il a croisé la bonne colonne avec la mauvaise ligne"],
    comparator: "mcq_exact",
    hint: "Il tenait la colonne, mais il a lâché la ligne.",
    explanation: exp(
      "Dans un tableau à double entrée, il faut tenir la ligne ET la colonne : lâcher l'une des deux donne une case voisine, plausible mais fausse.",
      "On garde le doigt sur la ligne pendant que le regard cherche la colonne.",
      "Il a bien trouvé la colonne « mardi », mais son regard a glissé d'une ligne. Le nombre qu'il lit existe, il est même juste — mais il répond à une autre question.",
      "Il a croisé la bonne colonne avec la mauvaise ligne.",
    ),
    tags: ["ce2", "donnees", "double_entree", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_donnees_double_entree_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_double_entree",
    difficulty: 3,
    theme: "neutral",
    hint: "Doigt sur la ligne, glisse jusqu'à la colonne.",
    tags: ["ce2", "donnees", "double_entree", "template", "canvas"],
    generate: () => {
      const jours = ["lundi", "mardi", "jeudi"] as const;
      const grille = CLASSES.slice(0, 3).map(() => jours.map(() => randomInt(8, 28)));
      const li = randomInt(0, 2);
      const co = randomInt(0, 2);
      return {
        text: `Dans ce tableau, combien d'élèves de ${CLASSES[li]} mangent à la cantine le ${jours[co]} ?`,
        format: "short",
        expected: [String(grille[li][co])],
        comparator: "number_equal",
        explanation: exp(
          "Une case d'un tableau à double entrée donne le croisement d'une ligne et d'une colonne.",
          "On pose le doigt sur la ligne, on le fait glisser jusqu'à la colonne, et on lit la case où il s'arrête.",
          `La ligne « ${CLASSES[li]} » croise la colonne « ${jours[co]} » sur la case ${grille[li][co]}.`,
          `Il y en a ${grille[li][co]}.`,
        ),
        canvas: tableau({
          title: "Élèves à la cantine",
          headers: ["Classe", ...jours],
          rows: CLASSES.slice(0, 3).map((c, k) => ({ values: [c, ...grille[k]] })),
          highlight: { cell: { row: li, col: co + 1 } },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_donnees_double_entree_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_double_entree",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne toutes les cases d'une même ligne.",
    tags: ["ce2", "donnees", "double_entree", "template", "canvas"],
    generate: () => {
      const jours = ["lundi", "mardi", "jeudi"] as const;
      const grille = CLASSES.slice(0, 3).map(() => jours.map(() => randomInt(8, 28)));
      const li = randomInt(0, 2);
      const total = grille[li].reduce((a, b) => a + b, 0);
      return {
        text: `Dans ce tableau, combien d'élèves de ${CLASSES[li]} ont mangé à la cantine sur les trois jours ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le total d'une ligne s'obtient en additionnant toutes ses cases.",
          "On garde le doigt sur la ligne et on additionne les cases de gauche à droite, sans en sauter.",
          `${grille[li].join(" + ")} = ${total}.`,
          `Cela fait ${total} élèves.`,
        ),
        canvas: tableau({
          title: "Élèves à la cantine",
          headers: ["Classe", ...jours],
          rows: CLASSES.slice(0, 3).map((c, k) => ({ values: [c, ...grille[k]] })),
          highlight: { row: li },
        }),
      };
    },
  },

  /* =========================================================
     CE2_DONNEES_COMPLETER_TABLEAU
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_donnees_completer_tableau_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_completer_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Un tableau donne 12, 15 et une case vide, avec un total de 40. Que vaut la case vide ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Le total est la somme des trois : enlève ce que tu connais.",
    explanation: exp(
      "Le total d'une ligne est la somme de toutes ses cases : une case manquante se retrouve par soustraction.",
      "On additionne les cases connues, puis on les retire du total.",
      "12 + 15 = 27. Puis 40 − 27 = 13. Vérification : 12 + 15 + 13 = 40.",
      "La case vide vaut 13.",
    ),
    tags: ["ce2", "donnees", "completer", "canvas"],
    canvas: tableau({
      title: "Livres empruntés",
      headers: ["Semaine 1", "Semaine 2", "Semaine 3", "Total"],
      rows: [{ values: [12, 15, "?", 40] }],
    }),
  },
  {
    kind: "fixed",
    id: "ce2_donnees_completer_tableau_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_completer_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Pour compléter la case « Total » d'une ligne, que fait-on ?",
    format: "qcm",
    choices: [
      "on additionne toutes les cases de la ligne",
      "on recopie la plus grande case",
      "on additionne la première et la dernière",
      "on compte le nombre de cases",
    ],
    expected: ["on additionne toutes les cases de la ligne"],
    comparator: "mcq_exact",
    hint: "Le total réunit tout ce que la ligne contient.",
    explanation: exp(
      "Le total d'une ligne est la somme de toutes ses cases, sans en oublier.",
      "On additionne les cases de gauche à droite, en marquant celles déjà comptées.",
      "Additionner seulement la première et la dernière laisserait tout le milieu de côté. C'est l'erreur la plus fréquente sur les tableaux à plus de trois colonnes.",
      "On additionne toutes les cases de la ligne.",
    ),
    tags: ["ce2", "donnees", "completer", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_donnees_completer_tableau_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_completer_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Comment vérifier qu'on a bien complété une case manquante ?",
    format: "qcm",
    choices: [
      "on additionne toute la ligne : on doit retrouver le total",
      "on recommence le même calcul",
      "on compare avec la ligne d'à côté",
      "on ne peut pas vérifier",
    ],
    expected: ["on additionne toute la ligne : on doit retrouver le total"],
    comparator: "mcq_exact",
    hint: "L'addition défait la soustraction.",
    explanation: exp(
      "L'addition et la soustraction sont inverses : on retrouve le total en additionnant toutes les cases, une fois la manquante remplie.",
      "On remet le nombre trouvé dans le tableau et on refait la somme complète.",
      "Si la case trouvée vaut 13 et que la ligne donne 12 + 15 + 13 = 40, le total annoncé est bien retrouvé : le calcul est juste.",
      "On additionne toute la ligne et on doit retrouver le total.",
    ),
    tags: ["ce2", "donnees", "completer", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_donnees_completer_tableau_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_completer_tableau",
    difficulty: 4,
    theme: "neutral",
    hint: "Enlève au total ce que tu connais déjà.",
    tags: ["ce2", "donnees", "completer", "template", "canvas"],
    generate: () => {
      const a = randomInt(8, 30);
      const b = randomInt(8, 30);
      const c = randomInt(8, 30);
      const total = a + b + c;
      const trou = randomInt(0, 2);
      const valeurs = [a, b, c];
      const affiches = valeurs.map((v, i) => (i === trou ? "?" : v));
      const connus = valeurs.filter((_, i) => i !== trou);
      return {
        text: "Dans ce tableau, quel nombre manque dans la case marquée d'un point d'interrogation ?",
        format: "short",
        expected: [String(valeurs[trou])],
        comparator: "number_equal",
        explanation: exp(
          "Le total d'une ligne est la somme de toutes ses cases : une case manquante se retrouve par soustraction.",
          "On additionne les cases connues, puis on les retire du total.",
          `${connus.join(" + ")} = ${connus.reduce((x, y) => x + y, 0)}. Puis ${total} − ${connus.reduce((x, y) => x + y, 0)} = ${valeurs[trou]}. Vérification : ${valeurs.join(" + ")} = ${total}.`,
          `Il manque ${valeurs[trou]}.`,
        ),
        canvas: tableau({
          title: "Livres empruntés",
          headers: ["Semaine 1", "Semaine 2", "Semaine 3", "Total"],
          rows: [{ values: [...affiches, total] }],
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_donnees_completer_tableau_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_completer_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les cases, sans en sauter une seule.",
    tags: ["ce2", "donnees", "completer", "template", "canvas"],
    generate: () => {
      const valeurs = [randomInt(5, 25), randomInt(5, 25), randomInt(5, 25), randomInt(5, 25)];
      const total = valeurs.reduce((a, b) => a + b, 0);
      return {
        text: "Quel nombre faut-il écrire dans la case « Total » ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le total d'une ligne est la somme de toutes ses cases.",
          "On additionne les cases de gauche à droite, sans en sauter.",
          `${valeurs.join(" + ")} = ${total}. Il y avait bien 4 cases à additionner.`,
          `Le total est ${total}.`,
        ),
        canvas: tableau({
          title: "Livres empruntés",
          headers: ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4", "Total"],
          rows: [{ values: [...valeurs, "?"] }],
        }),
      };
    },
  },

  /* =========================================================
     CE2_DONNEES_LIRE_GRAPHIQUE — le diagramme en barres
     Le piège de la graduation est ici.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_donnees_lire_graphique_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un diagramme en barres, que signifie une barre plus haute qu'une autre ?",
    format: "qcm",
    choices: [
      "elle représente une quantité plus grande",
      "elle est plus importante",
      "elle a été dessinée en premier",
      "elle occupe plus de place sur la feuille",
    ],
    expected: ["elle représente une quantité plus grande"],
    comparator: "mcq_exact",
    hint: "La hauteur raconte le nombre.",
    explanation: exp(
      "Dans un diagramme en barres, la hauteur de chaque barre représente une quantité.",
      "On compare les hauteurs pour comparer les quantités, sans même lire les nombres.",
      "C'est tout l'intérêt du diagramme : d'un coup d'œil, on voit ce qui est le plus grand. Pour connaître la valeur exacte, il faut ensuite lire la graduation.",
      "Elle représente une quantité plus grande.",
    ),
    tags: ["ce2", "donnees", "lire_graphique", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_donnees_lire_graphique_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_lire_graphique",
    difficulty: 5,
    theme: "neutral",
    text: "Sur un diagramme, chaque carreau de hauteur vaut 2 élèves. Une barre monte de 3 carreaux. Combien d'élèves représente-t-elle ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Trois carreaux qui valent 2 chacun.",
    explanation: exp(
      "La hauteur d'une barre se lit sur la graduation : chaque carreau vaut ce que la graduation annonce, pas forcément 1.",
      "On lit d'abord ce que vaut un carreau, puis on multiplie par le nombre de carreaux.",
      "3 carreaux × 2 élèves = 6 élèves. Répondre 3, c'est avoir compté les carreaux sans regarder la graduation — l'erreur la plus fréquente sur les diagrammes.",
      "Elle représente 6 élèves.",
    ),
    tags: ["ce2", "donnees", "lire_graphique", "piege"],
  },
  {
    kind: "fixed",
    id: "ce2_donnees_lire_graphique_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_lire_graphique",
    difficulty: 3,
    theme: "reunion",
    text: "Sur ce diagramme, quel fruit a été le plus vendu ?",
    format: "qcm",
    choices: ["les letchis", "les mangues", "les ananas", "les bananes"],
    expected: ["les letchis"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus haute.",
    explanation: exp(
      "La hauteur d'une barre représente la quantité : la plus haute correspond au plus grand nombre.",
      "On compare les hauteurs des barres entre elles.",
      "La barre des letchis dépasse toutes les autres : c'est le fruit le plus vendu. Pas besoin de lire les nombres pour répondre à cette question-là.",
      "Ce sont les letchis.",
    ),
    tags: ["ce2", "donnees", "lire_graphique", "reunion", "qcm", "canvas"],
    canvas: diagramme("Ventes du marché forain", [
      { label: "letchis", value: 78 },
      { label: "mangues", value: 45 },
      { label: "ananas", value: 32 },
      { label: "bananes", value: 60 },
    ]),
  },
  {
    kind: "template",
    id: "ce2_donnees_lire_graphique_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_lire_graphique",
    difficulty: 3,
    theme: "reunion",
    hint: "Compare les hauteurs des barres.",
    tags: ["ce2", "donnees", "lire_graphique", "reunion", "template", "canvas"],
    generate: () => {
      const valeurs = shuffle([
        randomInt(20, 35),
        randomInt(40, 55),
        randomInt(60, 75),
        randomInt(80, 95),
      ]);
      const cherche = randomChoice(["le plus", "le moins"] as const);
      const cible = cherche === "le plus" ? Math.max(...valeurs) : Math.min(...valeurs);
      const bonne = FRUITS[valeurs.indexOf(cible)];
      return {
        text: `Sur ce diagramme, quel fruit a été vendu ${cherche} ?`,
        format: "qcm",
        choices: makeChoices(bonne, FRUITS),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La hauteur d'une barre représente la quantité qu'elle mesure.",
          "On compare les hauteurs sans avoir besoin de lire les nombres exacts.",
          `La barre la plus ${cherche === "le plus" ? "haute" : "basse"} est celle des ${bonne}.`,
          `Ce sont les ${bonne}.`,
        ),
        canvas: diagramme(
          "Ventes du marché forain",
          FRUITS.map((f, k) => ({ label: f, value: valeurs[k] })),
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_donnees_lire_graphique_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_lire_graphique",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde d'abord ce que vaut UN carreau.",
    tags: ["ce2", "donnees", "lire_graphique", "piege", "template"],
    generate: () => {
      const parCarreau = randomChoice([2, 5, 10]);
      const carreaux = randomInt(2, 8);
      const total = parCarreau * carreaux;
      return {
        text: `Sur un diagramme, chaque carreau de hauteur vaut ${parCarreau} élèves. Une barre monte de ${carreaux} carreaux. Combien d'élèves représente-t-elle ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La hauteur d'une barre se lit sur la graduation : un carreau ne vaut pas forcément 1.",
          "On lit ce que vaut un carreau, puis on multiplie par le nombre de carreaux.",
          `${carreaux} × ${parCarreau} = ${total}. Répondre ${carreaux}, c'est avoir compté les carreaux sans regarder la graduation.`,
          `Elle représente ${total} élèves.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_DONNEES_PRODUIRE — fabriquer un tableau ou un diagramme
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_donnees_produire_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_produire",
    difficulty: 3,
    theme: "neutral",
    text: "Pour dessiner un diagramme en barres, que faut-il choisir en premier ?",
    format: "qcm",
    choices: [
      "ce que vaut un carreau de hauteur",
      "la couleur des barres",
      "la largeur des barres",
      "l'ordre alphabétique des étiquettes",
    ],
    expected: ["ce que vaut un carreau de hauteur"],
    comparator: "mcq_exact",
    hint: "Sans cela, on ne sait pas quelle hauteur donner aux barres.",
    explanation: exp(
      "Un diagramme n'est lisible que si l'on sait ce que représente un carreau : c'est la graduation.",
      "On regarde la plus grande valeur à représenter, puis on choisit une graduation qui la fasse tenir sur la feuille.",
      "Avec des valeurs jusqu'à 80 et dix carreaux de haut, un carreau doit valoir 10. Choisir la couleur avant la graduation, c'est décorer un diagramme qu'on ne pourra pas tracer.",
      "Ce que vaut un carreau de hauteur.",
    ),
    tags: ["ce2", "donnees", "produire", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_donnees_produire_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_produire",
    difficulty: 4,
    theme: "neutral",
    text: "Chaque carreau vaut 5 élèves. Quelle hauteur, en carreaux, faut-il donner à une barre représentant 30 élèves ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Combien de fois 5 tient-il dans 30 ?",
    explanation: exp(
      "Pour tracer une barre, on cherche combien de carreaux il faut pour atteindre la valeur voulue.",
      "On partage la valeur par ce que vaut un carreau.",
      "30 ÷ 5 = 6. La barre doit monter de 6 carreaux. Lire un diagramme et en tracer un, c'est le même calcul dans les deux sens.",
      "Il faut 6 carreaux.",
    ),
    tags: ["ce2", "donnees", "produire"],
  },
  {
    kind: "fixed",
    id: "ce2_donnees_produire_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_produire",
    difficulty: 3,
    theme: "neutral",
    text: "Que faut-il écrire sous chaque barre d'un diagramme ?",
    format: "qcm",
    choices: [
      "ce qu'elle représente",
      "sa hauteur en centimètres",
      "le nom de celui qui l'a dessinée",
      "rien du tout",
    ],
    expected: ["ce qu'elle représente"],
    comparator: "mcq_exact",
    hint: "Sans étiquette, on ne sait pas de quoi parle la barre.",
    explanation: exp(
      "Chaque barre porte une étiquette qui dit ce qu'elle représente.",
      "On écrit l'étiquette sous la barre, et on n'oublie pas le titre du diagramme.",
      "Une barre sans étiquette ne dit rien : on voit une hauteur, sans savoir de quoi il s'agit. Le titre et les étiquettes font autant partie du diagramme que les barres.",
      "Ce qu'elle représente.",
    ),
    tags: ["ce2", "donnees", "produire", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_donnees_produire_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_produire",
    difficulty: 4,
    theme: "neutral",
    hint: "Partage la valeur par ce que vaut un carreau.",
    tags: ["ce2", "donnees", "produire", "template"],
    generate: () => {
      const parCarreau = randomChoice([2, 5, 10]);
      const carreaux = randomInt(2, 9);
      const valeur = parCarreau * carreaux;
      return {
        text: `Chaque carreau vaut ${parCarreau} élèves. Quelle hauteur, en carreaux, faut-il donner à une barre représentant ${valeur} élèves ?`,
        format: "short",
        expected: [String(carreaux)],
        comparator: "number_equal",
        explanation: exp(
          "Pour tracer une barre, on cherche combien de carreaux il faut pour atteindre la valeur voulue.",
          "On partage la valeur par ce que vaut un carreau.",
          `${valeur} ÷ ${parCarreau} = ${carreaux}.`,
          `Il faut ${carreaux} carreaux.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_donnees_produire_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_produire",
    difficulty: 4,
    theme: "neutral",
    hint: "La plus grande valeur doit tenir sur la feuille.",
    tags: ["ce2", "donnees", "produire", "template"],
    generate: () => {
      const parCarreau = randomChoice([2, 5, 10]);
      const hauteurMax = randomInt(6, 10);
      const maxValeur = parCarreau * hauteurMax;
      return {
        text: `On a ${hauteurMax} carreaux de hauteur sur la feuille, et chaque carreau vaudra ${parCarreau} élèves. Quelle est la plus grande valeur qu'on pourra représenter ?`,
        format: "short",
        expected: [String(maxValeur)],
        comparator: "number_equal",
        explanation: exp(
          "La hauteur disponible et la valeur d'un carreau décident ensemble de la plus grande valeur représentable.",
          "On multiplie le nombre de carreaux disponibles par ce que vaut un carreau.",
          `${hauteurMax} × ${parCarreau} = ${maxValeur}. Au-delà, la barre dépasserait de la feuille : il faudrait choisir une graduation plus grande.`,
          `On pourra représenter jusqu'à ${maxValeur}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_DONNEES_INTERPRETER — faire parler les données
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_donnees_interpreter_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Sur ce diagramme, de combien les ventes de letchis dépassent-elles celles d'ananas ?",
    format: "short",
    expected: ["46"],
    comparator: "number_equal",
    hint: "Compare les deux barres : c'est une soustraction.",
    explanation: exp(
      "Comparer deux données, c'est calculer l'écart entre elles.",
      "On lit les deux valeurs, puis on retire la plus petite de la plus grande.",
      "Letchis : 78. Ananas : 32. L'écart vaut 78 − 32 = 46.",
      "Les letchis dépassent les ananas de 46.",
    ),
    tags: ["ce2", "donnees", "interpreter", "reunion", "canvas"],
    canvas: diagramme(
      "Ventes du marché forain",
      [
        { label: "letchis", value: 78 },
        { label: "mangues", value: 45 },
        { label: "ananas", value: 32 },
        { label: "bananes", value: 60 },
      ],
      true,
    ),
  },
  {
    kind: "fixed",
    id: "ce2_donnees_interpreter_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_interpreter",
    difficulty: 5,
    theme: "neutral",
    text: "Un diagramme montre que le CE2 a emprunté plus de livres que le CE1. Peut-on en conclure que les élèves de CE2 lisent plus vite ?",
    format: "qcm",
    choices: [
      "non, le diagramme ne dit rien de la vitesse de lecture",
      "oui, forcément",
      "oui, si la barre est deux fois plus haute",
      "on ne peut rien conclure du tout",
    ],
    expected: ["non, le diagramme ne dit rien de la vitesse de lecture"],
    comparator: "mcq_exact",
    hint: "Que compte exactement le diagramme ?",
    explanation: exp(
      "Un diagramme ne dit que ce qu'il compte : en tirer autre chose, c'est inventer.",
      "On relit l'intitulé du diagramme et on vérifie que la conclusion parle bien de la même chose.",
      "Il compte des livres empruntés, pas des pages lues ni du temps passé. Il y a peut-être aussi plus d'élèves en CE2. On peut dire « le CE2 a emprunté plus de livres », rien de plus.",
      "Non : le diagramme ne dit rien de la vitesse de lecture.",
    ),
    tags: ["ce2", "donnees", "interpreter", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_donnees_interpreter_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Deux barres ont exactement la même hauteur. Que peut-on en dire ?",
    format: "qcm",
    choices: [
      "les deux quantités sont égales",
      "les deux barres représentent la même chose",
      "l'une est plus importante que l'autre",
      "le diagramme est faux",
    ],
    expected: ["les deux quantités sont égales"],
    comparator: "mcq_exact",
    hint: "La hauteur mesure la quantité, rien d'autre.",
    explanation: exp(
      "La hauteur d'une barre représente une quantité : deux hauteurs égales annoncent deux quantités égales.",
      "On compare les hauteurs, sans rien ajouter d'autre.",
      "Les deux quantités sont les mêmes. Cela ne veut pas dire que les deux barres parlent de la même chose : elles gardent chacune leur étiquette.",
      "Les deux quantités sont égales.",
    ),
    tags: ["ce2", "donnees", "interpreter", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_donnees_interpreter_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_interpreter",
    difficulty: 4,
    theme: "reunion",
    hint: "L'écart entre deux données, c'est une soustraction.",
    tags: ["ce2", "donnees", "interpreter", "reunion", "template", "canvas"],
    generate: () => {
      const valeurs = shuffle([
        randomInt(20, 35),
        randomInt(40, 55),
        randomInt(60, 75),
        randomInt(80, 95),
      ]);
      const [i, j] = shuffle([0, 1, 2, 3]).slice(0, 2);
      const grand = Math.max(valeurs[i], valeurs[j]);
      const petit = Math.min(valeurs[i], valeurs[j]);
      const nomGrand = FRUITS[valeurs.indexOf(grand)];
      const nomPetit = FRUITS[valeurs.indexOf(petit)];
      return {
        text: `Sur ce diagramme, de combien les ventes de ${nomGrand} dépassent-elles celles de ${nomPetit} ?`,
        format: "short",
        expected: [String(grand - petit)],
        comparator: "number_equal",
        explanation: exp(
          "Comparer deux données, c'est calculer l'écart entre elles.",
          "On lit les deux valeurs, puis on retire la plus petite de la plus grande.",
          `${nomGrand.charAt(0).toUpperCase() + nomGrand.slice(1)} : ${grand}. ${nomPetit.charAt(0).toUpperCase() + nomPetit.slice(1)} : ${petit}. L'écart vaut ${grand} − ${petit} = ${grand - petit}.`,
          `L'écart est de ${grand - petit}.`,
        ),
        canvas: diagramme(
          "Ventes du marché forain",
          FRUITS.map((f, k) => ({ label: f, value: valeurs[k] })),
          true,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_donnees_interpreter_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_interpreter",
    difficulty: 5,
    theme: "neutral",
    hint: "Le diagramme ne dit que ce qu'il compte.",
    tags: ["ce2", "donnees", "interpreter", "piege", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          question: "Un diagramme compte les livres empruntés par classe. Peut-on savoir combien de pages ont été lues ?",
          bonne: "non, le diagramme ne compte que des livres empruntés",
        },
        {
          question: "Un diagramme compte les fruits vendus au marché. Peut-on savoir combien d'argent a été gagné ?",
          bonne: "non, le diagramme ne compte que des fruits",
        },
        {
          question: "Un diagramme compte les élèves à la cantine par jour. Peut-on savoir quel jour la cantine a eu le plus de monde ?",
          bonne: "oui, il suffit de comparer les hauteurs",
        },
      ] as const);
      return {
        text: cas.question,
        format: "qcm",
        choices: makeChoices(cas.bonne, [
          "non, le diagramme ne compte que des livres empruntés",
          "non, le diagramme ne compte que des fruits",
          "oui, il suffit de comparer les hauteurs",
          "oui, en additionnant toutes les barres",
        ]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un diagramme ne dit que ce qu'il compte : on ne peut en tirer que des conclusions sur cette quantité-là.",
          "On relit l'intitulé du diagramme, puis on vérifie que la question porte bien sur la même chose.",
          `Ici, ${cas.bonne.startsWith("oui") ? "la question porte exactement sur ce que compte le diagramme" : "la question porte sur autre chose que ce que compte le diagramme"}.`,
          `${cas.bonne.charAt(0).toUpperCase() + cas.bonne.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_DONNEES_PROBLEME
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_donnees_probleme_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Sur ce diagramme, combien de fruits ont été vendus en tout ?",
    format: "short",
    expected: ["215"],
    comparator: "number_equal",
    hint: "Additionne les quatre barres.",
    explanation: exp(
      "Le total se calcule en additionnant toutes les données du diagramme.",
      "On lit chaque barre, puis on additionne, en marquant celles déjà comptées.",
      "78 + 45 + 32 + 60 = 215.",
      "215 fruits ont été vendus en tout.",
    ),
    tags: ["ce2", "donnees", "probleme", "reunion", "canvas"],
    canvas: diagramme(
      "Ventes du marché forain",
      [
        { label: "letchis", value: 78 },
        { label: "mangues", value: 45 },
        { label: "ananas", value: 32 },
        { label: "bananes", value: 60 },
      ],
      true,
    ),
  },
  {
    kind: "fixed",
    id: "ce2_donnees_probleme_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Un tableau donne 16 élèves lundi, 18 mardi et 21 jeudi à la cantine. Chaque repas coûte 3 €. Combien coûtent les repas des trois jours ?",
    format: "short",
    expected: ["165"],
    comparator: "number_equal",
    hint: "Cherche d'abord le nombre total de repas.",
    explanation: exp(
      "Un problème à deux étapes se résout dans l'ordre : on cherche d'abord ce qu'on peut trouver.",
      "On additionne les repas des trois jours, puis on multiplie par le prix d'un repas.",
      "16 + 18 + 21 = 55 repas. Puis 55 × 3 = 165 €.",
      "Les repas coûtent 165 €.",
    ),
    tags: ["ce2", "donnees", "probleme", "deux_etapes"],
  },
  {
    kind: "template",
    id: "ce2_donnees_probleme_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_probleme",
    difficulty: 4,
    theme: "reunion",
    hint: "Additionne toutes les barres.",
    tags: ["ce2", "donnees", "probleme", "reunion", "template", "canvas"],
    generate: () => {
      const valeurs = [
        randomInt(20, 40),
        randomInt(30, 55),
        randomInt(15, 45),
        randomInt(40, 70),
      ];
      const total = valeurs.reduce((a, b) => a + b, 0);
      return {
        text: "Sur ce diagramme, combien de fruits ont été vendus en tout ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le total se calcule en additionnant toutes les données du diagramme.",
          "On lit chaque barre, puis on additionne sans en oublier une seule.",
          `${valeurs.join(" + ")} = ${total}.`,
          `${total} fruits ont été vendus en tout.`,
        ),
        canvas: diagramme(
          "Ventes du marché forain",
          FRUITS.map((f, k) => ({ label: f, value: valeurs[k] })),
          true,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_donnees_probleme_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "D'abord le total, ensuite le prix.",
    tags: ["ce2", "donnees", "probleme", "deux_etapes", "template", "canvas"],
    generate: () => {
      const jours = ["lundi", "mardi", "jeudi"] as const;
      const repas = jours.map(() => randomInt(10, 28));
      const totalRepas = repas.reduce((a, b) => a + b, 0);
      const prix = randomInt(2, 5);
      return {
        text: `Ce tableau donne le nombre d'élèves à la cantine. Chaque repas coûte ${prix} €. Combien coûtent les repas des trois jours ?`,
        format: "short",
        expected: [String(totalRepas * prix)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes se résout dans l'ordre : on cherche d'abord ce qu'on peut trouver.",
          "On additionne les repas des trois jours, puis on multiplie par le prix d'un repas.",
          `${repas.join(" + ")} = ${totalRepas} repas. Puis ${totalRepas} × ${prix} = ${totalRepas * prix}.`,
          `Cela coûte ${totalRepas * prix} €.`,
        ),
        canvas: tableau({
          title: "Élèves à la cantine",
          headers: [...jours],
          rows: [{ values: repas }],
        }),
      };
    },
  },

  /* =========================================================
     CE2_DONNEES_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_donnees_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Sur un diagramme où chaque carreau vaut 5 élèves, une barre monte de 4 carreaux et une autre de 7. De combien d'élèves la seconde dépasse-t-elle la première ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Trois carreaux d'écart, mais un carreau ne vaut pas 1.",
    explanation: exp(
      "L'écart entre deux barres se compte en carreaux, puis se traduit avec la graduation.",
      "On calcule l'écart en carreaux, puis on le multiplie par ce que vaut un carreau.",
      "7 − 4 = 3 carreaux d'écart. Or un carreau vaut 5 élèves : 3 × 5 = 15. Répondre 3, c'est avoir oublié la graduation.",
      "La seconde dépasse la première de 15 élèves.",
    ),
    tags: ["ce2", "donnees", "defi", "piege", "deux_etapes"],
  },
  {
    kind: "fixed",
    id: "ce2_donnees_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Au marché, 215 fruits ont été vendus en tout : 78 letchis, 45 mangues, 32 ananas et le reste en bananes. Combien de bananes ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Le total moins ce qu'on connaît déjà.",
    explanation: exp(
      "Une donnée manquante se retrouve en retirant du total ce que l'on connaît.",
      "On additionne les données connues, puis on les soustrait du total.",
      "78 + 45 + 32 = 155. Puis 215 − 155 = 60. Vérification : 78 + 45 + 32 + 60 = 215.",
      "Il y a eu 60 bananes.",
    ),
    tags: ["ce2", "donnees", "defi", "reunion", "deux_etapes"],
  },
  {
    kind: "template",
    id: "ce2_donnees_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "L'écart en carreaux d'abord, la graduation ensuite.",
    tags: ["ce2", "donnees", "defi", "piege", "template"],
    generate: () => {
      const parCarreau = randomChoice([2, 5, 10]);
      const basse = randomInt(2, 5);
      const haute = basse + randomInt(1, 4);
      const ecart = (haute - basse) * parCarreau;
      return {
        text: `Sur un diagramme où chaque carreau vaut ${parCarreau} élèves, une barre monte de ${basse} carreaux et une autre de ${haute}. De combien d'élèves la seconde dépasse-t-elle la première ?`,
        format: "short",
        expected: [String(ecart)],
        comparator: "number_equal",
        explanation: exp(
          "L'écart entre deux barres se compte en carreaux, puis se traduit avec la graduation.",
          "On calcule l'écart en carreaux, puis on le multiplie par ce que vaut un carreau.",
          `${haute} − ${basse} = ${haute - basse} carreaux d'écart. Or un carreau vaut ${parCarreau} élèves : ${haute - basse} × ${parCarreau} = ${ecart}. Répondre ${haute - basse}, c'est avoir oublié la graduation.`,
          `L'écart est de ${ecart} élèves.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_donnees_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "donnees",
    microId: "ce2_donnees_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Additionne ce que tu connais, puis retire-le du total.",
    tags: ["ce2", "donnees", "defi", "reunion", "deux_etapes", "template", "canvas"],
    generate: () => {
      const valeurs = [
        randomInt(30, 60),
        randomInt(20, 50),
        randomInt(15, 40),
        randomInt(25, 55),
      ];
      const total = valeurs.reduce((a, b) => a + b, 0);
      const trou = randomInt(0, 3);
      const connus = valeurs.filter((_, i) => i !== trou);
      const sommeConnus = connus.reduce((a, b) => a + b, 0);
      const affiches = valeurs.map((v, i) => (i === trou ? "?" : v));
      return {
        text: `Au marché, ${total} fruits ont été vendus en tout. Le tableau donne toutes les quantités sauf une. Combien de ${FRUITS[trou]} ont été vendus ?`,
        format: "short",
        expected: [String(valeurs[trou])],
        comparator: "number_equal",
        explanation: exp(
          "Une donnée manquante se retrouve en retirant du total ce que l'on connaît.",
          "On additionne les données connues, puis on les soustrait du total.",
          `${connus.join(" + ")} = ${sommeConnus}. Puis ${total} − ${sommeConnus} = ${valeurs[trou]}. Vérification : ${valeurs.join(" + ")} = ${total}.`,
          `Il y a eu ${valeurs[trou]} ${FRUITS[trou]}.`,
        ),
        canvas: tableau({
          title: "Ventes du marché forain",
          headers: ["Fruit", "Quantité vendue"],
          rows: FRUITS.map((f, k) => ({ values: [f, affiches[k]] })),
          highlight: { row: trou },
        }),
      };
    },
  },
];
