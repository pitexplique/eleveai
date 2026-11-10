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
  CanvasFigure,
  StatGraphCanvasData,
  TableauDonneesCanvasData,
  TutorBankItemV4,
} from "@/lib/tutor-v4/types";
import { choix, de, gabarit, maj, pick, pl, PRENOMS, quelquun, rint, shuffle, tirer, type Etoile, type Q } from "./outils-mesures-ce2";

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
];

/* =========================================================
   LES GABARITS (10/11/2026)
   ⛔ Avant : deux gabarits par micro, tous sur les mêmes quatre
   fruits du marché forain (letchis, mangues, ananas, bananes) :
   « mangues ont été vendus », « de ananas », et un élève revoyait
   la même phrase 8 à 15 fois sur 20. Désormais : seize thèmes de
   vie d'enfant (glaces de la kermesse, animal préféré, buts,
   oiseaux du jardin, métier rêvé…), huit tableaux à double
   entrée, sept stands de vente, et pour chaque micro plusieurs
   façons de prendre le tableau ou le diagramme.
   ⛔ Le dessin ne donne pas la réponse : les diagrammes à LIRE ont
   un axe gradué et aucune valeur écrite sur les barres.
========================================================= */

/** Une ligne du tableau : son libellé, et sa forme dans une question. */
type Ligne = { l: string; q: string };

type Theme = {
  titre: string;
  /** L'en-tête de la première colonne (« Parfum »). */
  cat: string;
  /** L'en-tête des nombres (« Glaces vendues »). */
  val: string;
  /** « glace », « glaces » : l'unité écrite dans les choix. */
  unite: readonly [string, string];
  items: readonly Ligne[];
  /** « Combien de glaces à la vanille ont été vendues » (sans « ? »). */
  combien: (q: string) => string;
  /** « Quel parfum a été le plus vendu » (sans « ? »). */
  plus: string;
  moins: string;
  /** « Quel parfum » : pour retrouver une ligne à partir d'un nombre. */
  quel: string;
  /** La valeur la plus grande qui reste vraisemblable. */
  max: number;
  /** Une suite de jours : on peut parler de « chaque jour ». */
  jours?: boolean;
};

const PRENOMS_T: readonly Ligne[] = PRENOMS.slice(0, 12).map((p) => ({ l: p.nom, q: p.nom }));

const THEMES: readonly Theme[] = [
  {
    titre: "Les glaces de la kermesse", cat: "Parfum", val: "Glaces vendues", unite: ["glace", "glaces"],
    items: [
      { l: "vanille", q: "à la vanille" }, { l: "chocolat", q: "au chocolat" }, { l: "fraise", q: "à la fraise" },
      { l: "coco", q: "à la coco" }, { l: "citron", q: "au citron" }, { l: "pistache", q: "à la pistache" },
    ],
    combien: (q) => `Combien de glaces ${q} ont été vendues`,
    plus: "Quel parfum a été le plus vendu", moins: "Quel parfum a été le moins vendu", quel: "Quel parfum", max: 300,
  },
  {
    titre: "L'animal préféré de la classe", cat: "Animal", val: "Nombre d'élèves", unite: ["élève", "élèves"],
    items: [
      { l: "chat", q: "le chat" }, { l: "chien", q: "le chien" }, { l: "lapin", q: "le lapin" },
      { l: "cheval", q: "le cheval" }, { l: "dauphin", q: "le dauphin" }, { l: "tortue", q: "la tortue" },
    ],
    combien: (q) => `Combien d'élèves préfèrent ${q}`,
    plus: "Quel animal a été le plus choisi", moins: "Quel animal a été le moins choisi", quel: "Quel animal", max: 30,
  },
  {
    titre: "Les livres empruntés à la bibliothèque", cat: "Jour", val: "Livres empruntés", unite: ["livre", "livres"],
    items: [
      { l: "lundi", q: "lundi" }, { l: "mardi", q: "mardi" }, { l: "mercredi", q: "mercredi" },
      { l: "jeudi", q: "jeudi" }, { l: "vendredi", q: "vendredi" }, { l: "samedi", q: "samedi" },
    ],
    combien: (q) => `Combien de livres ont été empruntés ${q}`,
    plus: "Quel jour a-t-on emprunté le plus de livres", moins: "Quel jour a-t-on emprunté le moins de livres", quel: "Quel jour", max: 200, jours: true,
  },
  {
    titre: "Les buts du tournoi de football", cat: "Équipe", val: "Buts marqués", unite: ["but", "buts"],
    items: [
      { l: "Requins", q: "les Requins" }, { l: "Aigles", q: "les Aigles" }, { l: "Tigres", q: "les Tigres" },
      { l: "Lions", q: "les Lions" }, { l: "Zèbres", q: "les Zèbres" }, { l: "Dauphins", q: "les Dauphins" },
    ],
    combien: (q) => `Combien de buts ont marqué ${q}`,
    plus: "Quelle équipe a marqué le plus de buts", moins: "Quelle équipe a marqué le moins de buts", quel: "Quelle équipe", max: 40,
  },
  {
    titre: "Les oiseaux vus dans le jardin", cat: "Oiseau", val: "Oiseaux vus", unite: ["oiseau", "oiseaux"],
    items: [
      { l: "merles", q: "merles" }, { l: "moineaux", q: "moineaux" }, { l: "pigeons", q: "pigeons" },
      { l: "mésanges", q: "mésanges" }, { l: "pies", q: "pies" }, { l: "rouges-gorges", q: "rouges-gorges" },
    ],
    combien: (q) => `Combien de ${q} y avait-il dans le jardin`,
    plus: "Quel oiseau a été vu le plus souvent", moins: "Quel oiseau a été vu le moins souvent", quel: "Quel oiseau", max: 60,
  },
  {
    titre: "Les points du jeu de quilles", cat: "Joueur", val: "Points", unite: ["point", "points"],
    items: PRENOMS_T,
    combien: (q) => `Combien de points a marqué ${q}`,
    plus: "Qui a marqué le plus de points", moins: "Qui a marqué le moins de points", quel: "Qui", max: 500,
  },
  {
    titre: "Les œufs ramassés à la ferme", cat: "Jour", val: "Œufs ramassés", unite: ["œuf", "œufs"],
    items: [
      { l: "lundi", q: "lundi" }, { l: "mardi", q: "mardi" }, { l: "mercredi", q: "mercredi" },
      { l: "jeudi", q: "jeudi" }, { l: "vendredi", q: "vendredi" }, { l: "samedi", q: "samedi" }, { l: "dimanche", q: "dimanche" },
    ],
    combien: (q) => `Combien d'œufs ont été ramassés ${q}`,
    plus: "Quel jour a-t-on ramassé le plus d'œufs", moins: "Quel jour a-t-on ramassé le moins d'œufs", quel: "Quel jour", max: 90, jours: true,
  },
  {
    titre: "Le sport préféré des enfants", cat: "Sport", val: "Nombre d'enfants", unite: ["enfant", "enfants"],
    items: [
      { l: "football", q: "le football" }, { l: "natation", q: "la natation" }, { l: "danse", q: "la danse" },
      { l: "judo", q: "le judo" }, { l: "basket", q: "le basket" }, { l: "vélo", q: "le vélo" },
    ],
    combien: (q) => `Combien d'enfants préfèrent ${q}`,
    plus: "Quel sport a été le plus choisi", moins: "Quel sport a été le moins choisi", quel: "Quel sport", max: 120,
  },
  {
    titre: "Les coquillages ramassés sur la plage", cat: "Enfant", val: "Coquillages", unite: ["coquillage", "coquillages"],
    items: PRENOMS_T,
    combien: (q) => `Combien de coquillages y a-t-il dans le seau de ${q}`,
    plus: "Qui a ramassé le plus de coquillages", moins: "Qui a ramassé le moins de coquillages", quel: "Qui", max: 90,
  },
  {
    titre: "Les visiteurs du zoo", cat: "Jour", val: "Visiteurs", unite: ["visiteur", "visiteurs"],
    items: [
      { l: "lundi", q: "lundi" }, { l: "mardi", q: "mardi" }, { l: "mercredi", q: "mercredi" },
      { l: "jeudi", q: "jeudi" }, { l: "vendredi", q: "vendredi" }, { l: "samedi", q: "samedi" }, { l: "dimanche", q: "dimanche" },
    ],
    combien: (q) => `Combien de visiteurs sont venus ${q}`,
    plus: "Quel jour y a-t-il eu le plus de visiteurs", moins: "Quel jour y a-t-il eu le moins de visiteurs", quel: "Quel jour", max: 2000, jours: true,
  },
  {
    titre: "Les voitures du parking", cat: "Couleur", val: "Voitures", unite: ["voiture", "voitures"],
    items: [
      { l: "rouges", q: "rouges" }, { l: "blanches", q: "blanches" }, { l: "noires", q: "noires" },
      { l: "grises", q: "grises" }, { l: "bleues", q: "bleues" }, { l: "vertes", q: "vertes" },
    ],
    combien: (q) => `Combien de voitures ${q} y a-t-il`,
    plus: "Quelle couleur de voiture est la plus nombreuse", moins: "Quelle couleur de voiture est la moins nombreuse", quel: "Quelle couleur", max: 150,
  },
  {
    titre: "Les fleurs du jardin de l'école", cat: "Fleur", val: "Nombre de fleurs", unite: ["fleur", "fleurs"],
    items: [
      { l: "roses", q: "roses" }, { l: "tulipes", q: "tulipes" }, { l: "marguerites", q: "marguerites" },
      { l: "tournesols", q: "tournesols" }, { l: "pensées", q: "pensées" }, { l: "jonquilles", q: "jonquilles" },
    ],
    combien: (q) => `Combien de ${q} y a-t-il dans le jardin`,
    plus: "Quelle fleur est la plus nombreuse", moins: "Quelle fleur est la moins nombreuse", quel: "Quelle fleur", max: 100,
  },
  {
    titre: "La collection de dinosaures de Ravi", cat: "Dinosaure", val: "Figurines", unite: ["figurine", "figurines"],
    items: [
      { l: "T-rex", q: "T-rex" }, { l: "tricératops", q: "tricératops" }, { l: "diplodocus", q: "diplodocus" },
      { l: "ptéranodon", q: "ptéranodons" }, { l: "stégosaure", q: "stégosaures" }, { l: "vélociraptor", q: "vélociraptors" },
    ],
    combien: (q) => `Combien de figurines de ${q} Ravi a-t-il`,
    plus: "Quel dinosaure est le plus nombreux", moins: "Quel dinosaure est le moins nombreux", quel: "Quel dinosaure", max: 40,
  },
  {
    titre: "Le plat préféré à la cantine", cat: "Plat", val: "Nombre d'enfants", unite: ["enfant", "enfants"],
    items: [
      { l: "pâtes", q: "les pâtes" }, { l: "frites", q: "les frites" }, { l: "riz", q: "le riz" },
      { l: "purée", q: "la purée" }, { l: "couscous", q: "le couscous" }, { l: "pizza", q: "la pizza" },
    ],
    combien: (q) => `Combien d'enfants ont choisi ${q}`,
    plus: "Quel plat a été le plus choisi", moins: "Quel plat a été le moins choisi", quel: "Quel plat", max: 200,
  },
  {
    titre: "Le métier rêvé des élèves", cat: "Métier", val: "Nombre d'élèves", unite: ["élève", "élèves"],
    items: [
      { l: "vétérinaire", q: "vétérinaire" }, { l: "pompier", q: "pompier" }, { l: "boulanger", q: "boulanger" },
      { l: "pilote", q: "pilote" }, { l: "médecin", q: "médecin" }, { l: "astronaute", q: "astronaute" }, { l: "jardinier", q: "jardinier" },
    ],
    combien: (q) => `Combien d'élèves rêvent d'être ${q}`,
    plus: "Quel métier a été le plus choisi", moins: "Quel métier a été le moins choisi", quel: "Quel métier", max: 60,
  },
  {
    titre: "Les tours de manège à la fête", cat: "Manège", val: "Tours vendus", unite: ["tour", "tours"],
    items: [
      { l: "chevaux de bois", q: "de chevaux de bois" }, { l: "auto-tamponneuses", q: "d'auto-tamponneuses" },
      { l: "grande roue", q: "de grande roue" }, { l: "petit train", q: "de petit train" }, { l: "trampoline", q: "de trampoline" },
      { l: "toboggan géant", q: "de toboggan géant" },
    ],
    combien: (q) => `Combien de tours ${q} ont été vendus`,
    plus: "Quel manège a vendu le plus de tours", moins: "Quel manège a vendu le moins de tours", quel: "Quel manège", max: 400,
  },
];

/* --------- tirer des données --------- */

/** Les bornes des valeurs selon l'étoile : petites à ★1, jusqu'à quelques centaines à ★5. */
function bornes(T: Theme, e: Etoile, pas = 1): [number, number] {
  const hauts = [0, 20, 50, 99, 300, 900];
  const bas = [0, 2, 5, 10, 20, 40];
  const hi = Math.max(Math.min(hauts[e], T.max), 12 * pas);
  const lo = Math.min(bas[e], Math.floor(hi / 4));
  return [lo, hi];
}

/** k valeurs distinctes, multiples de `pas`, entre lo et hi. */
function valeurs(k: number, lo: number, hi: number, pas = 1): number[] {
  const out = new Set<number>();
  let garde = 0;
  while (out.size < k && garde++ < 500) out.add(pas * rint(Math.max(1, Math.ceil(lo / pas)), Math.max(Math.ceil(lo / pas) + k, Math.floor(hi / pas))));
  return [...out];
}

type Jeu = { T: Theme; lignes: Ligne[]; v: number[] };

function jeu(e: Etoile, k?: number, pas = 1, T: Theme = pick(THEMES)): Jeu {
  const n = k ?? (e <= 2 ? 4 : pick([4, 5]));
  const lignes = T.jours ? suiteDeJours(T.items, n) : shuffle(T.items).slice(0, n);
  const [lo, hi] = bornes(T, e, pas);
  return { T, lignes, v: valeurs(n, lo, hi, pas) };
}

/** Les jours restent dans l'ordre de la semaine. */
function suiteDeJours(items: readonly Ligne[], n: number) {
  const d = rint(0, items.length - n);
  return items.slice(d, d + n);
}

const U = (T: Theme, n: number) => `${n} ${n === 1 ? T.unite[0] : T.unite[1]}`;
const deU = (T: Theme) => de(T.unite[1]);
const min1 = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

function tab(J: Jeu, opts: { trou?: number; total?: number | "?"; hl?: number } = {}): TableauDonneesCanvasData {
  const rows: { values: (string | number)[] }[] = J.lignes.map((li, k) => ({ values: [li.l, opts.trou === k ? "?" : J.v[k]] }));
  if (opts.total !== undefined) rows.push({ values: ["Total", opts.total] });
  return tableau({ title: J.T.titre, headers: [J.T.cat, J.T.val], rows, ...(opts.hl !== undefined ? { highlight: { row: opts.hl } } : {}) });
}

/** Un diagramme à LIRE : axe gradué, aucune valeur sur les barres. */
function graphe(J: Jeu, pas?: number, axeY?: string, v: number[] = J.v): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    graphType: "barres",
    title: J.T.titre,
    data: J.lignes.map((li, k) => ({ label: li.l, value: v[k] })),
    display: { showValues: false, showLabels: true, showAxis: true, ...(pas ? { step: pas } : {}), axeY: axeY ?? J.T.val.toLowerCase() },
  };
}

/** Le tableau ou le diagramme, au hasard (le diagramme gradué de 1, 2, 5 ou 10). */
function support(J: Jeu, pas?: number): { canvas: CanvasFigure; ou: string } {
  return Math.random() < 0.5 ? { canvas: tab(J), ou: "le tableau" } : { canvas: graphe(J, pas), ou: "le diagramme" };
}

/** Pièges d'une lecture : les autres nombres du tableau (la mauvaise ligne), puis ±1, ±10. */
function choixLecture(T: Theme, n: number, autres: readonly number[], extra: readonly number[] = []) {
  return choix(U(T, n), [...extra, ...shuffle(autres).slice(0, 2), n + 10, n - 1, n + 1, n - 10].map((x) => U(T, x)));
}

const indices = (J: Jeu) => J.lignes.map((_, k) => k);
const argmax = (v: number[]) => v.indexOf(Math.max(...v));
const argmin = (v: number[]) => v.indexOf(Math.min(...v));
const somme = (v: readonly number[]) => v.reduce((a, b) => a + b, 0);
const deuxIndices = (n: number): [number, number] => {
  const a = rint(0, n - 1);
  let b = rint(0, n - 1);
  while (b === a) b = rint(0, n - 1);
  return [a, b];
};

/* --------- LIRE UN TABLEAU (ou un diagramme) --------- */

function lireValeur(e: Etoile, J: Jeu = jeu(e), canvas?: CanvasFigure, ou = "le tableau"): Q {
  const { T } = J;
  const i = rint(0, J.lignes.length - 1);
  const n = J.v[i];
  const qu = T.combien(J.lignes[i].q);
  const p = quelquun();
  const tournures = [
    `${qu} ?`,
    `Lis ${ou}. ${qu} ?`,
    `Regarde la ligne « ${J.lignes[i].l} ». ${qu} ?`,
    ...(e >= 3 ? [`${p.nom} lit ${ou} « ${T.titre} ». ${qu} ?`, `D'après ${ou}, ${min1(qu)} ?`] : []),
  ];
  return {
    text: pick(tournures),
    format: "qcm",
    choices: choixLecture(T, n, J.v.filter((x) => x !== n)),
    expected: [U(T, n)],
    comparator: "mcq_exact",
    explanation: exp(
      "Un tableau range des nombres : chaque nombre est sur la ligne de ce qu'il compte.",
      `On cherche la ligne « ${J.lignes[i].l} », puis on suit la ligne jusqu'à la colonne « ${T.val} ».`,
      `Sur la ligne « ${J.lignes[i].l} », on lit ${n}.`,
      `${maj(U(T, n))}.`,
    ),
    canvas: canvas ?? tab(J),
  };
}

function lireInverse(e: Etoile, J: Jeu = jeu(e)): Q {
  const { T } = J;
  const i = rint(0, J.lignes.length - 1);
  const n = J.v[i];
  const tournures = [
    `Dans le tableau, ${min1(T.quel)} correspond à ${U(T, n)} ?`,
    `On lit ${n} dans la colonne « ${T.val} ». Sur quelle ligne ?`,
    `Quelle ligne du tableau montre ${U(T, n)} ?`,
  ];
  return {
    text: pick(tournures),
    format: "qcm",
    choices: choix(J.lignes[i].l, J.lignes.filter((_, k) => k !== i).map((li) => li.l)),
    expected: [J.lignes[i].l],
    comparator: "mcq_exact",
    explanation: exp(
      "On peut lire un tableau dans les deux sens : du nom vers le nombre, ou du nombre vers le nom.",
      `On cherche le nombre ${n} dans la colonne « ${T.val} », puis on lit le nom au début de sa ligne.`,
      `${n} est sur la ligne « ${J.lignes[i].l} ».`,
      `C'est « ${J.lignes[i].l} ».`,
    ),
    canvas: tab(J),
  };
}

function lirePlusMoins(e: Etoile, J: Jeu = jeu(e), canvas?: CanvasFigure, ou = "le tableau"): Q {
  const { T } = J;
  const plus = Math.random() < 0.6;
  const i = plus ? argmax(J.v) : argmin(J.v);
  const tournures = [
    `${plus ? T.plus : T.moins} ?`,
    `Regarde ${ou}. ${plus ? T.plus : T.moins} ?`,
    ...(e >= 3 ? [`${quelquun().nom} lit ${ou} « ${T.titre} ». ${plus ? T.plus : T.moins} ?`] : []),
  ];
  return {
    text: pick(tournures),
    format: "qcm",
    choices: choix(J.lignes[i].l, J.lignes.filter((_, k) => k !== i).map((li) => li.l)),
    expected: [J.lignes[i].l],
    comparator: "mcq_exact",
    explanation: exp(
      plus ? "Le plus grand nombre du tableau désigne ce qu'il y a le plus." : "Le plus petit nombre du tableau désigne ce qu'il y a le moins.",
      ou === "le diagramme" ? `On cherche la barre la plus ${plus ? "haute" : "basse"}.` : `On compare les nombres de la colonne « ${T.val} » : ${J.v.join(", ")}.`,
      `Le plus ${plus ? "grand" : "petit"} est ${J.v[i]}, sur la ligne « ${J.lignes[i].l} ».`,
      `C'est « ${J.lignes[i].l} ».`,
    ),
    canvas: canvas ?? tab(J),
  };
}

function lireEcart(e: Etoile, J: Jeu = jeu(e), canvas?: CanvasFigure, ou = "le tableau"): Q {
  const { T } = J;
  let [a, b] = deuxIndices(J.lignes.length);
  if (J.v[a] < J.v[b]) [a, b] = [b, a];
  const A = J.lignes[a].l, B = J.lignes[b].l;
  const d = J.v[a] - J.v[b];
  const tournures = [
    `Dans ${ou}, combien ${deU(T)} de plus pour « ${A} » que pour « ${B} » ?`,
    `Quelle est la différence entre « ${A} » et « ${B} » dans ${ou} ?`,
    `De combien la ${ou === "le diagramme" ? "barre" : "ligne"} « ${A} » dépasse-t-elle la ${ou === "le diagramme" ? "barre" : "ligne"} « ${B} » ?`,
    ...(e >= 3 ? [`${quelquun().nom} compare « ${A} » et « ${B} ». Combien ${deU(T)} de plus pour « ${A} » ?`] : []),
  ];
  return {
    text: pick(tournures),
    format: "qcm",
    choices: choix(U(T, d), [J.v[a] + J.v[b], J.v[a], J.v[b], d + 10, d - 1, d + 1, d - 10].map((x) => U(T, x))),
    expected: [U(T, d)],
    comparator: "mcq_exact",
    explanation: exp(
      "« Combien de plus » se calcule par une soustraction : le grand nombre moins le petit.",
      `On lit « ${A} » (${J.v[a]}) et « ${B} » (${J.v[b]}), puis on soustrait.`,
      `${J.v[a]} − ${J.v[b]} = ${d}.`,
      `${maj(U(T, d))} de plus pour « ${A} ».`,
    ),
    canvas: canvas ?? tab(J),
  };
}

function lireDeux(e: Etoile, J: Jeu = jeu(e), canvas?: CanvasFigure, ou = "le tableau"): Q {
  const { T } = J;
  const [a, b] = deuxIndices(J.lignes.length);
  const A = J.lignes[a].l, B = J.lignes[b].l;
  const s = J.v[a] + J.v[b];
  const tournures = [
    `Combien ${deU(T)} en tout pour « ${A} » et « ${B} » ?`,
    `Additionne les ${ou === "le diagramme" ? "barres" : "lignes"} « ${A} » et « ${B} ». Combien ${deU(T)} ?`,
    `Si on réunit « ${A} » et « ${B} », combien ${deU(T)} cela fait-il ?`,
  ];
  return {
    text: pick(tournures),
    format: "qcm",
    choices: choix(U(T, s), [Math.abs(J.v[a] - J.v[b]), s + 10, s - 10, s + 1, s - 1].map((x) => U(T, x))),
    expected: [U(T, s)],
    comparator: "mcq_exact",
    explanation: exp(
      "« En tout » se calcule par une addition.",
      `On lit « ${A} » (${J.v[a]}) et « ${B} » (${J.v[b]}), puis on ajoute.`,
      `${J.v[a]} + ${J.v[b]} = ${s}.`,
      `${maj(U(T, s))} en tout.`,
    ),
    canvas: canvas ?? tab(J),
  };
}

function lireTotal(e: Etoile, J: Jeu = jeu(e), canvas?: CanvasFigure, ou = "le tableau"): Q {
  const { T } = J;
  const s = somme(J.v);
  const tournures = [
    `Combien ${deU(T)} en tout dans ${ou} ?`,
    `Additionne tous les nombres ${ou === "le tableau" ? "du tableau" : "du diagramme"}. Combien ${deU(T)} en tout ?`,
    `« ${T.titre} » : combien ${deU(T)} en tout ?`,
  ];
  const oubli = s - J.v[rint(0, J.v.length - 1)];
  return {
    text: pick(tournures),
    format: "qcm",
    choices: choix(U(T, s), [oubli, s + 10, s - 10, s + 1, s - 1].map((x) => U(T, x))),
    expected: [U(T, s)],
    comparator: "mcq_exact",
    explanation: exp(
      "Le total, c'est la somme de toutes les lignes.",
      "On additionne les nombres un par un, sans en oublier.",
      `${J.v.join(" + ")} = ${s}.`,
      `${maj(U(T, s))} en tout.`,
    ),
    canvas: canvas ?? tab(J),
  };
}

function lireRanger(e: Etoile, J: Jeu = jeu(e, 3)): Q {
  const { T } = J;
  const ordre = indices(J).sort((x, y) => J.v[y] - J.v[x]);
  const dire = (o: number[]) => o.map((k) => J.lignes[k].l).join(", ");
  const bonne = dire(ordre);
  const [x, y, z] = ordre;
  const pieges = [dire([z, y, x]), dire([y, x, z]), dire([x, z, y]), dire([z, x, y]), dire([y, z, x])];
  return {
    text: pick([
      `Range les lignes du tableau, du plus grand au plus petit nombre ${deU(T)}.`,
      `Dans quel ordre, du plus grand au plus petit, ranger les lignes du tableau ?`,
      `${quelquun().nom} range les lignes du tableau, de la plus grande à la plus petite. Quel ordre trouve-t-on ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, pieges),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Ranger du plus grand au plus petit, c'est l'ordre décroissant.",
      "On cherche d'abord le plus grand nombre, puis le suivant, puis le plus petit.",
      ordre.map((k) => `${J.v[k]} (${J.lignes[k].l})`).join(" > ") + ".",
      `L'ordre est : ${bonne}.`,
    ),
    canvas: tab(J),
  };
}

function lireTableau(e: Etoile): Q {
  if (e === 1) return tirer([() => lireValeur(1), () => lireValeur(1), () => lireInverse(1), () => lirePlusMoins(1)]);
  if (e === 2) return tirer([() => lireValeur(2), () => lirePlusMoins(2), () => lireEcart(2), () => lireInverse(2)]);
  if (e === 3) return tirer([() => lireValeur(3), () => lireEcart(3), () => lireDeux(3), () => lireRanger(3)]);
  return tirer([() => lireTotal(4), () => lireEcart(4), () => lireDeux(4), () => lireRanger(4)]);
}

/* --------- LE TABLEAU À DOUBLE ENTRÉE --------- */

type Double = {
  titre: string;
  coin: string;
  rows: readonly Ligne[];
  cols: readonly Ligne[];
  unite: readonly [string, string];
  /** La question d'une case, sans « ? ». */
  cell: (r: string, c: string) => string;
  max: number;
  /** Les colonnes sont des choses qu'on compte (« vaches ») : elles donnent l'unité. */
  parCol?: true;
};

const DOUBLES: readonly Double[] = [
  {
    titre: "Les élèves à la cantine", coin: "Classe",
    rows: ["CP", "CE1", "CE2", "CM1", "CM2"].map((c) => ({ l: c, q: c })),
    cols: ["lundi", "mardi", "jeudi", "vendredi"].map((c) => ({ l: c, q: c })),
    unite: ["élève", "élèves"], cell: (r, c) => `Combien d'élèves de ${r} ont mangé à la cantine ${c}`, max: 30,
  },
  {
    titre: "Les livres empruntés", coin: "Classe",
    rows: ["CP", "CE1", "CE2", "CM1", "CM2"].map((c) => ({ l: c, q: c })),
    cols: [{ l: "albums", q: "d'albums" }, { l: "contes", q: "de contes" }, { l: "documentaires", q: "de documentaires" }, { l: "romans", q: "de romans" }],
    parCol: true, unite: ["livre", "livres"], cell: (r, c) => `Combien ${c} la classe de ${r} a-t-elle empruntés`, max: 60,
  },
  {
    titre: "Les médailles de la course", coin: "Équipe",
    rows: [{ l: "Requins", q: "les Requins" }, { l: "Aigles", q: "les Aigles" }, { l: "Tigres", q: "les Tigres" }, { l: "Lions", q: "les Lions" }],
    cols: [{ l: "or", q: "d'or" }, { l: "argent", q: "d'argent" }, { l: "bronze", q: "de bronze" }],
    unite: ["médaille", "médailles"], cell: (r, c) => `Combien de médailles ${c} ont gagné ${r}`, max: 20,
  },
  {
    titre: "Les spectateurs du spectacle de l'école", coin: "Jour",
    rows: [{ l: "vendredi", q: "vendredi" }, { l: "samedi", q: "samedi" }, { l: "dimanche", q: "dimanche" }],
    cols: [{ l: "enfants", q: "d'enfants" }, { l: "adultes", q: "d'adultes" }],
    parCol: true, unite: ["spectateur", "spectateurs"], cell: (r, c) => `Combien ${c} sont venus ${r}`, max: 300,
  },
  {
    titre: "Les fruits cueillis au verger", coin: "Enfant",
    rows: PRENOMS_T.slice(0, 8),
    cols: [{ l: "pommes", q: "de pommes" }, { l: "poires", q: "de poires" }, { l: "prunes", q: "de prunes" }],
    parCol: true, unite: ["fruit", "fruits"], cell: (r, c) => `Combien ${c} y a-t-il dans le panier de ${r}`, max: 50,
  },
  {
    titre: "Les animaux des trois fermes", coin: "Ferme",
    rows: [{ l: "ferme du moulin", q: "à la ferme du moulin" }, { l: "ferme des pins", q: "à la ferme des pins" }, { l: "ferme du lac", q: "à la ferme du lac" }],
    cols: [{ l: "vaches", q: "de vaches" }, { l: "poules", q: "de poules" }, { l: "moutons", q: "de moutons" }, { l: "chèvres", q: "de chèvres" }],
    parCol: true, unite: ["animal", "animaux"], cell: (r, c) => `Combien ${c} y a-t-il ${r}`, max: 90,
  },
  {
    titre: "Les billets du cirque", coin: "Séance",
    rows: [{ l: "matin", q: "le matin" }, { l: "après-midi", q: "l'après-midi" }, { l: "soir", q: "le soir" }],
    cols: [{ l: "enfants", q: "de billets enfant" }, { l: "adultes", q: "de billets adulte" }],
    unite: ["billet", "billets"], cell: (r, c) => `Combien ${c} ont été vendus ${r}`, max: 400,
  },
  {
    titre: "Les bonbons des sachets", coin: "Sachet",
    rows: [{ l: "sachet rouge", q: "le sachet rouge" }, { l: "sachet bleu", q: "le sachet bleu" }, { l: "sachet vert", q: "le sachet vert" }, { l: "sachet jaune", q: "le sachet jaune" }],
    cols: [{ l: "oursons", q: "d'oursons" }, { l: "fraises", q: "de fraises" }, { l: "réglisses", q: "de réglisses" }],
    parCol: true, unite: ["bonbon", "bonbons"], cell: (r, c) => `Combien ${c} y a-t-il dans ${r}`, max: 40,
  },
];

type Grille = { D: Double; R: Ligne[]; C: Ligne[]; g: number[][] };

function grille(e: Etoile, nr?: number, nc?: number): Grille {
  const D = pick(DOUBLES);
  const R = (D.coin === "Jour" || D.coin === "Séance" ? D.rows.slice(0, nr ?? D.rows.length) : shuffle(D.rows).slice(0, nr ?? 3)).slice(0, nr ?? 3);
  const C = shuffle(D.cols).slice(0, Math.min(nc ?? 3, D.cols.length));
  const hi = Math.min([0, 20, 30, 60, 150, 400][e], D.max);
  const lo = Math.max(1, Math.floor(hi / 8));
  const tout = valeurs(R.length * C.length, lo, hi);
  return { D, R, C, g: R.map((_, i) => C.map((_, j) => tout[i * C.length + j])) };
}

const UD = (D: Double, n: number) => `${n} ${n === 1 ? D.unite[0] : D.unite[1]}`;
const deUD = (D: Double) => de(D.unite[1]);
/** L'unité d'une case : le nom de sa colonne quand on y compte des choses. */
const UC = (G: Grille, j: number, n: number) => (G.D.parCol ? `${n} ${G.C[j].l}` : UD(G.D, n));
const deUC = (G: Grille, j: number) => (G.D.parCol ? de(G.C[j].l) : deUD(G.D));

function tabDouble(G: Grille, opts: { totLignes?: boolean; trou?: [number, number] } = {}): TableauDonneesCanvasData {
  const headers = [G.D.coin, ...G.C.map((c) => c.l), ...(opts.totLignes ? ["Total"] : [])];
  return tableau({
    title: G.D.titre,
    headers,
    rows: G.R.map((r, i) => ({
      values: [
        r.l,
        ...G.g[i].map((x, j) => (opts.trou && opts.trou[0] === i && opts.trou[1] === j ? "?" : x)),
        ...(opts.totLignes ? [somme(G.g[i])] : []),
      ],
    })),
  });
}

function caseDouble(e: Etoile, G: Grille = grille(e, e <= 2 ? 2 : 3, e <= 2 ? pick([2, 3]) : 3)): Q {
  const i = rint(0, G.R.length - 1), j = rint(0, G.C.length - 1);
  const n = G.g[i][j];
  const qu = G.D.cell(G.R[i].q, G.C[j].q);
  const tournures = [
    `${qu} ?`,
    `Lis le tableau. ${qu} ?`,
    `Pose un doigt sur la ligne « ${G.R[i].l} », un autre sur la colonne « ${G.C[j].l} ». ${qu} ?`,
    ...(e >= 3 ? [`${quelquun().nom} cherche dans le tableau : ${min1(qu)} ?`] : []),
  ];
  const voisins = [...G.g[i].filter((_, k) => k !== j), ...G.g.map((l) => l[j]).filter((_, k) => k !== i)];
  return {
    text: pick(tournures),
    format: "qcm",
    choices: choix(UC(G, j, n), [...shuffle(voisins).slice(0, 3), n + 1, n + 10, n - 1].map((x) => UC(G, j, x))),
    expected: [UC(G, j, n)],
    comparator: "mcq_exact",
    explanation: exp(
      "Dans un tableau à double entrée, une case est au croisement d'une ligne et d'une colonne.",
      `Un doigt sur la ligne « ${G.R[i].l} », un doigt sur la colonne « ${G.C[j].l} » : on les fait se rejoindre.`,
      `La case du croisement contient ${n}.`,
      `${maj(UC(G, j, n))}.`,
    ),
    canvas: tabDouble(G),
  };
}

function totalLigneDouble(e: Etoile, G: Grille = grille(e)): Q {
  const i = rint(0, G.R.length - 1);
  const s = somme(G.g[i]);
  const tournures = [
    `Combien ${deUD(G.D)} en tout sur la ligne « ${G.R[i].l} » ?`,
    `Additionne la ligne « ${G.R[i].l} ». Combien ${deUD(G.D)} ?`,
    `Pour « ${G.R[i].l} », combien ${deUD(G.D)} en tout ?`,
  ];
  const colonne = somme(G.g.map((l) => l[0]));
  return {
    text: pick(tournures),
    format: "qcm",
    choices: choix(UD(G.D, s), [colonne, s - G.g[i][0], s + 10, s - 10, s + 1].map((x) => UD(G.D, x))),
    expected: [UD(G.D, s)],
    comparator: "mcq_exact",
    explanation: exp(
      "Le total d'une ligne, c'est la somme de toutes ses cases.",
      `On suit la ligne « ${G.R[i].l} » de gauche à droite et on additionne.`,
      `${G.g[i].join(" + ")} = ${s}.`,
      `${maj(UD(G.D, s))} en tout.`,
    ),
    canvas: tabDouble(G),
  };
}

function totalColonneDouble(e: Etoile, G: Grille = grille(e)): Q {
  const j = rint(0, G.C.length - 1);
  const col = G.g.map((l) => l[j]);
  const s = somme(col);
  const tournures = [
    `Combien ${deUC(G, j)} en tout dans la colonne « ${G.C[j].l} » ?`,
    `Additionne la colonne « ${G.C[j].l} ». Combien ${deUC(G, j)} ?`,
    `Pour « ${G.C[j].l} », combien ${deUC(G, j)} en tout ?`,
  ];
  return {
    text: pick(tournures),
    format: "qcm",
    choices: choix(UC(G, j, s), [somme(G.g[0]), s - col[0], s + 10, s - 10, s + 1].map((x) => UC(G, j, x))),
    expected: [UC(G, j, s)],
    comparator: "mcq_exact",
    explanation: exp(
      "Le total d'une colonne, c'est la somme de toutes ses cases, de haut en bas.",
      `On descend la colonne « ${G.C[j].l} » et on additionne.`,
      `${col.join(" + ")} = ${s}.`,
      `${maj(UC(G, j, s))} en tout.`,
    ),
    canvas: tabDouble(G),
  };
}

function comparerDouble(e: Etoile, G: Grille = grille(e)): Q {
  const j = rint(0, G.C.length - 1);
  const col = G.g.map((l) => l[j]);
  const plus = Math.random() < 0.6;
  const i = plus ? argmax(col) : argmin(col);
  return {
    text: pick([
      `Dans la colonne « ${G.C[j].l} », quelle ligne a le ${plus ? "plus" : "moins"} ${deUC(G, j)} ?`,
      `Pour « ${G.C[j].l} », quelle ligne a le ${plus ? "plus grand" : "plus petit"} nombre ?`,
      `${quelquun().nom} regarde seulement la colonne « ${G.C[j].l} ». Quelle ligne a le ${plus ? "plus" : "moins"} ${deUC(G, j)} ?`,
    ]),
    format: "qcm",
    choices: choix(G.R[i].l, G.R.filter((_, k) => k !== i).map((r) => r.l)),
    expected: [G.R[i].l],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour comparer, on reste dans UNE colonne.",
      `On lit la colonne « ${G.C[j].l} » de haut en bas : ${col.join(", ")}.`,
      `Le plus ${plus ? "grand" : "petit"} est ${col[i]}, sur la ligne « ${G.R[i].l} ».`,
      `C'est « ${G.R[i].l} ».`,
    ),
    canvas: tabDouble(G),
  };
}

function ecartDouble(e: Etoile, G: Grille = grille(e)): Q {
  const j = rint(0, G.C.length - 1);
  let [a, b] = deuxIndices(G.R.length);
  if (G.g[a][j] < G.g[b][j]) [a, b] = [b, a];
  const d = G.g[a][j] - G.g[b][j];
  return {
    text: pick([
      `Dans la colonne « ${G.C[j].l} », combien ${deUC(G, j)} de plus pour « ${G.R[a].l} » que pour « ${G.R[b].l} » ?`,
      `Colonne « ${G.C[j].l} » : quelle est la différence entre « ${G.R[a].l} » et « ${G.R[b].l} » ?`,
      `${quelquun().nom} compare « ${G.R[a].l} » et « ${G.R[b].l} » dans la colonne « ${G.C[j].l} ». Combien de plus ?`,
    ]),
    format: "qcm",
    choices: choix(UC(G, j, d), [G.g[a][j] + G.g[b][j], d + 10, d - 1, d + 1, G.g[a][j]].map((x) => UC(G, j, x))),
    expected: [UC(G, j, d)],
    comparator: "mcq_exact",
    explanation: exp(
      "« Combien de plus » : on soustrait le petit nombre du grand.",
      `On lit les deux cases de la colonne « ${G.C[j].l} » : ${G.g[a][j]} et ${G.g[b][j]}.`,
      `${G.g[a][j]} − ${G.g[b][j]} = ${d}.`,
      `${maj(UC(G, j, d))} de plus.`,
    ),
    canvas: tabDouble(G),
  };
}

function totalGeneralDouble(e: Etoile, G: Grille = grille(e)): Q {
  const lignes = G.g.map(somme);
  const s = somme(lignes);
  return {
    text: pick([
      `Combien ${deUD(G.D)} en tout dans le tableau ?`,
      `« ${G.D.titre} » : combien ${deUD(G.D)} en tout ?`,
      `Additionne toutes les cases du tableau. Combien ${deUD(G.D)} ?`,
    ]),
    format: "qcm",
    choices: choix(UD(G.D, s), [s - lignes[0], s - G.g[0][0], s + 10, s - 10, s + 100].map((x) => UD(G.D, x))),
    expected: [UD(G.D, s)],
    comparator: "mcq_exact",
    explanation: exp(
      "Le total général, c'est la somme de TOUTES les cases.",
      "On additionne ligne par ligne, puis on ajoute les totaux des lignes.",
      `${lignes.join(" + ")} = ${s}.`,
      `${maj(UD(G.D, s))} en tout.`,
    ),
    canvas: tabDouble(G),
  };
}

function ligneMaxDouble(e: Etoile, G: Grille = grille(e)): Q {
  const lignes = G.g.map(somme);
  const i = argmax(lignes);
  // deux lignes au même total : pas de gagnant, on pose une autre question
  if (lignes.filter((x) => x === lignes[i]).length > 1) return totalGeneralDouble(e, G);
  return {
    text: pick([
      `Quelle ligne a le plus ${deUD(G.D)} en tout ?`,
      `En additionnant chaque ligne, laquelle a le plus grand total ?`,
      `${quelquun().nom} additionne chaque ligne. Quelle ligne gagne ?`,
    ]),
    format: "qcm",
    choices: choix(G.R[i].l, G.R.filter((_, k) => k !== i).map((r) => r.l)),
    expected: [G.R[i].l],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour savoir quelle ligne a le plus en tout, on calcule le total de chaque ligne.",
      "On additionne les cases de chaque ligne, puis on compare les totaux.",
      G.R.map((r, k) => `${r.l} : ${G.g[k].join(" + ")} = ${lignes[k]}`).join(" ; ") + ".",
      `C'est « ${G.R[i].l} ».`,
    ),
    canvas: tabDouble(G),
  };
}

function doubleEntree(e: Etoile): Q {
  if (e === 2) return tirer([() => caseDouble(2), () => caseDouble(2), () => comparerDouble(2)]);
  if (e === 3) return tirer([() => caseDouble(3), () => totalLigneDouble(3), () => comparerDouble(3)]);
  if (e === 4) return tirer([() => totalColonneDouble(4), () => ecartDouble(4), () => totalLigneDouble(4), () => caseDouble(4)]);
  return tirer([() => totalGeneralDouble(5), () => ligneMaxDouble(5), () => ecartDouble(5)]);
}

/* --------- COMPLÉTER UN TABLEAU --------- */

function caseManquante(e: Etoile, J: Jeu = jeu(e, e <= 3 ? 3 : 4)): Q {
  const { T } = J;
  const t = rint(0, J.lignes.length - 1);
  const s = somme(J.v);
  const n = J.v[t];
  const connus = J.v.filter((_, k) => k !== t);
  return {
    text: pick([
      `Le total est ${s}. Quel nombre faut-il écrire à la place du « ? » ?`,
      `Une case du tableau s'est effacée. Le total est ${s}. Que vaut la case « ${J.lignes[t].l} » ?`,
      `${quelquun().nom} a renversé du jus sur le tableau. Le total est ${s}. Combien pour « ${J.lignes[t].l} » ?`,
    ]),
    format: "qcm",
    choices: choix(U(T, n), [s, somme(connus), n + 10, n - 10, n + 1].map((x) => U(T, x))),
    expected: [U(T, n)],
    comparator: "mcq_exact",
    explanation: exp(
      "Le total est la somme de toutes les lignes : la case manquante, c'est ce qu'il manque pour arriver au total.",
      "On additionne les cases connues, puis on retire cette somme du total.",
      `${connus.join(" + ")} = ${somme(connus)} ; ${s} − ${somme(connus)} = ${n}.`,
      `Il faut écrire ${n}.`,
    ),
    canvas: tab(J, { trou: t, total: s }),
  };
}

function totalManquant(e: Etoile, J: Jeu = jeu(e, e <= 3 ? 3 : 4)): Q {
  const { T } = J;
  const s = somme(J.v);
  return {
    text: pick([
      `Quel nombre faut-il écrire dans la case « Total » ?`,
      `Complète la ligne « Total » du tableau.`,
      `${quelquun().nom} doit finir le tableau. Que vaut le total ?`,
    ]),
    format: "qcm",
    choices: choix(U(T, s), [s - J.v[0], s + 10, s - 10, s + 1, Math.max(...J.v)].map((x) => U(T, x))),
    expected: [U(T, s)],
    comparator: "mcq_exact",
    explanation: exp(
      "Le total d'un tableau, c'est la somme de toutes les lignes.",
      "On additionne tous les nombres de la colonne.",
      `${J.v.join(" + ")} = ${s}.`,
      `Il faut écrire ${s}.`,
    ),
    canvas: tab(J, { total: "?" }),
  };
}

function caseDecrite(e: Etoile, J: Jeu = jeu(e, e <= 3 ? 3 : 4)): Q {
  const { T } = J;
  const [t, r] = deuxIndices(J.lignes.length);
  const d = J.v[t] - J.v[r];
  if (d === 0) return caseManquante(e, J);
  const dit = d > 0 ? `${U(T, Math.abs(d))} de plus` : `${U(T, Math.abs(d))} de moins`;
  const n = J.v[t];
  return {
    text: pick([
      `Pour « ${J.lignes[t].l} », il y a ${dit} que pour « ${J.lignes[r].l} ». Quel nombre écrire à la place du « ? » ?`,
      `${quelquun().nom} se souvient : « ${J.lignes[t].l} » a ${dit} que « ${J.lignes[r].l} ». Que vaut la case « ? » ?`,
      `Complète le tableau : « ${J.lignes[t].l} » a ${dit} que « ${J.lignes[r].l} ».`,
    ]),
    format: "qcm",
    choices: choix(U(T, n), [J.v[r] - d, Math.abs(d), J.v[r], n + 1, n + 10].map((x) => U(T, x))),
    expected: [U(T, n)],
    comparator: "mcq_exact",
    explanation: exp(
      d > 0 ? "« De plus » : on ajoute." : "« De moins » : on retire.",
      `On lit « ${J.lignes[r].l} » (${J.v[r]}), puis on ${d > 0 ? `ajoute ${d}` : `retire ${-d}`}.`,
      d > 0 ? `${J.v[r]} + ${d} = ${n}.` : `${J.v[r]} − ${-d} = ${n}.`,
      `Il faut écrire ${n}.`,
    ),
    canvas: tab(J, { trou: t }),
  };
}

function caseDoubleManquante(e: Etoile, G: Grille = grille(e)): Q {
  const i = rint(0, G.R.length - 1), j = rint(0, G.C.length - 1);
  const s = somme(G.g[i]);
  const n = G.g[i][j];
  const connus = G.g[i].filter((_, k) => k !== j);
  return {
    text: pick([
      `Sur la ligne « ${G.R[i].l} », une case est effacée. Quel nombre écrire à la place du « ? » ?`,
      `Retrouve le nombre caché : la colonne « Total » donne ${s} pour « ${G.R[i].l} ».`,
      `${quelquun().nom} a fait une tache sur le tableau. Que vaut la case « ? » ?`,
    ]),
    format: "qcm",
    choices: choix(UC(G, j, n), [s, somme(connus), n + 10, n - 1, n + 1].map((x) => UC(G, j, x))),
    expected: [UC(G, j, n)],
    comparator: "mcq_exact",
    explanation: exp(
      "Le total d'une ligne est la somme de ses cases.",
      `On additionne les cases connues de la ligne « ${G.R[i].l} », puis on retire du total.`,
      `${connus.join(" + ")} = ${somme(connus)} ; ${s} − ${somme(connus)} = ${n}.`,
      `Il faut écrire ${n}.`,
    ),
    canvas: tabDouble(G, { totLignes: true, trou: [i, j] }),
  };
}

function completer(e: Etoile): Q {
  if (e === 3) return tirer([() => caseManquante(3), () => totalManquant(3), () => caseDecrite(3)]);
  return tirer([() => caseManquante(4), () => caseDecrite(4), () => caseDoubleManquante(4), () => caseDoubleManquante(4)]);
}

/* --------- LIRE UN DIAGRAMME EN BARRES --------- */

/** Un pas de graduation selon l'étoile : 1 ou 2 à ★2, jusqu'à 50 à ★5. */
const PAS: Record<Etoile, number[]> = { 1: [1], 2: [1, 2], 3: [2, 5], 4: [5, 10], 5: [10, 20, 50] };

/**
 * Les lignes d'un DIAGRAMME : les noms sont écrits sous les barres, et un nom
 * trop long mord sur le voisin (« tournesolsmarguerites », rendu du 10/11).
 * 9 lettres au plus sous 4 barres, 8 sous 5.
 */
function lignesGraphe(n: number, pas: number): { T: Theme; lignes: Ligne[] } {
  const court = (li: Ligne) => li.l.length <= (n >= 5 ? 8 : 9);
  const T = pick(THEMES.filter((t) => t.max >= 8 * pas && t.items.filter(court).length >= n));
  const ok = T.items.filter(court);
  return { T, lignes: T.jours ? suiteDeJours(ok, n) : shuffle(ok).slice(0, n) };
}

function jeuGraphe(e: Etoile, k?: number): { J: Jeu; pas: number } {
  const pas = pick(PAS[e]);
  const n = k ?? (e <= 2 ? 4 : pick([4, 5]));
  const { T, lignes } = lignesGraphe(n, pas);
  const v = valeurs(n, pas, Math.min(T.max, 10 * pas), pas);
  return { J: { T, lignes, v }, pas };
}

function lireBarre(e: Etoile): Q {
  const { J, pas } = jeuGraphe(e);
  const { T } = J;
  const i = rint(0, J.lignes.length - 1);
  const n = J.v[i];
  const qu = T.combien(J.lignes[i].q);
  const tournures = [
    `${qu} ? Lis la hauteur de la barre sur l'axe.`,
    `Regarde la barre « ${J.lignes[i].l} ». ${qu} ?`,
    `D'après le diagramme, ${min1(qu)} ?`,
    ...(e >= 3 ? [`${quelquun().nom} lit le diagramme « ${T.titre} ». ${qu} ?`] : []),
  ];
  const carreaux = n / pas;
  return {
    text: pick(tournures),
    format: "qcm",
    choices: choixLecture(T, n, J.v.filter((x) => x !== n), pas > 1 ? [carreaux, n + pas] : [n + 2]),
    expected: [U(T, n)],
    comparator: "mcq_exact",
    explanation: exp(
      "La hauteur d'une barre se lit sur l'axe gradué, à gauche du diagramme.",
      `On suit le haut de la barre « ${J.lignes[i].l} » jusqu'à l'axe.${pas > 1 ? ` Attention : l'axe va de ${pas} en ${pas}.` : ""}`,
      pas > 1 ? `La barre monte de ${carreaux} graduations de ${pas} : ${carreaux} × ${pas} = ${n}.` : `Le haut de la barre arrive à ${n}.`,
      `${maj(U(T, n))}.`,
    ),
    canvas: graphe(J, pas),
  };
}

function lirePas(e: Etoile): Q {
  const { J, pas } = jeuGraphe(e);
  const { T } = J;
  return {
    text: pick([
      `Sur l'axe du diagramme, de combien en combien vont les graduations ?`,
      `Les nombres de l'axe vont de combien en combien ?`,
      `${quelquun().nom} veut lire ce diagramme. De combien augmente l'axe à chaque trait ?`,
    ]),
    format: "qcm",
    choices: choix(`de ${pas} en ${pas}`, [1, 2, 5, 10, 20, 50, 100].filter((x) => x !== pas).map((x) => `de ${x} en ${x}`)),
    expected: [`de ${pas} en ${pas}`],
    comparator: "mcq_exact",
    explanation: exp(
      "La graduation de l'axe dit combien vaut chaque trait.",
      "On lit deux nombres qui se suivent sur l'axe et on calcule l'écart.",
      `Après 0 vient ${pas}, puis ${2 * pas} : l'écart est ${pas}.`,
      `L'axe va de ${pas} en ${pas}. Un trait ne vaut donc pas toujours 1 ${T.unite[0]}.`,
    ),
    canvas: graphe(J, pas),
  };
}

function lireGraphique(e: Etoile): Q {
  const g = () => jeuGraphe(e);
  const plusMoins = () => { const { J, pas } = g(); return lirePlusMoins(e, J, graphe(J, pas), "le diagramme"); };
  const ecart = () => { const { J, pas } = g(); return lireEcart(e, J, graphe(J, pas), "le diagramme"); };
  const total = () => { const { J, pas } = g(); return lireTotal(e, J, graphe(J, pas), "le diagramme"); };
  const deux = () => { const { J, pas } = g(); return lireDeux(e, J, graphe(J, pas), "le diagramme"); };
  if (e === 2) return tirer([() => lireBarre(2), () => lireBarre(2), plusMoins]);
  if (e === 3) return tirer([() => lireBarre(3), () => lireBarre(3), ecart, ecart, plusMoins, () => lirePas(3)]);
  if (e === 4) return tirer([() => lireBarre(4), () => lireBarre(4), ecart, deux, deux, () => lirePas(4)]);
  return tirer([() => lireBarre(5), total, ecart, deux]);
}

/* --------- PRODUIRE UN DIAGRAMME --------- */

function combienDeCarreaux(e: Etoile): Q {
  const pas = e <= 3 ? pick([2, 5]) : pick([5, 10, 20]);
  const T = pick(THEMES.filter((t) => t.max >= 6 * pas));
  const n = e <= 3 ? 4 : pick([4, 5]);
  const J: Jeu = { T, lignes: T.jours ? suiteDeJours(T.items, n) : shuffle(T.items).slice(0, n), v: valeurs(n, pas, 10 * pas, pas) };
  const i = rint(0, n - 1);
  const h = J.v[i] / pas;
  const qui = quelquun().nom;
  return {
    text: pick([
      `On dessine le diagramme de ce tableau. Un carreau vaut ${U(T, pas)}. Combien de carreaux de haut pour la barre « ${J.lignes[i].l} » ?`,
      `${qui} trace les barres : 1 carreau = ${U(T, pas)}. Quelle hauteur pour « ${J.lignes[i].l} » ?`,
      `Chaque carreau compte pour ${U(T, pas)}. Combien de carreaux faut-il pour la barre « ${J.lignes[i].l} » ?`,
    ]),
    format: "qcm",
    choices: choix(pl(h, "carreau", "carreaux"), [J.v[i], h + 1, h - 1, h * 2, J.v[i] + pas].filter((x) => x > 0).map((x) => pl(x, "carreau", "carreaux"))),
    expected: [pl(h, "carreau", "carreaux")],
    comparator: "mcq_exact",
    explanation: exp(
      "Quand un carreau vaut plusieurs unités, la hauteur d'une barre en carreaux est plus petite que le nombre à représenter.",
      `On cherche combien de fois ${pas} il y a dans ${J.v[i]}.`,
      `${h} × ${pas} = ${J.v[i]}.`,
      `La barre monte de ${pl(h, "carreau", "carreaux")}.`,
    ),
    canvas: tab(J, { hl: i }),
  };
}

function combienDeBarres(e: Etoile): Q {
  const J = jeu(e, pick([3, 4, 5]));
  const k = J.lignes.length;
  return {
    text: pick([
      `On veut dessiner le diagramme en barres de ce tableau. Combien de barres faut-il tracer ?`,
      `${quelquun().nom} transforme ce tableau en diagramme en barres. Combien de barres dessinera-t-on ?`,
      `Combien de barres compte le diagramme de ce tableau ?`,
    ]),
    format: "qcm",
    choices: choix(pl(k, "barre", "barres"), [k + 1, k - 1, k + 2, 2 * k].map((x) => pl(x, "barre", "barres"))),
    expected: [pl(k, "barre", "barres")],
    comparator: "mcq_exact",
    explanation: exp(
      "Dans un diagramme en barres, chaque ligne du tableau devient une barre.",
      "On compte les lignes du tableau, sans la ligne des titres.",
      `Le tableau a ${k} lignes : ${J.lignes.map((l) => l.l).join(", ")}.`,
      `On trace ${pl(k, "barre", "barres")}.`,
    ),
    canvas: tab(J),
  };
}

function barreFausse(e: Etoile): Q {
  const { J, pas } = jeuGraphe(e <= 3 ? 2 : 3, e <= 3 ? 3 : 4);
  const f = rint(0, J.lignes.length - 1);
  const dessine = [...J.v];
  let faux = dessine[f] + pick([-1, 1, 2]) * pas;
  if (faux <= 0 || J.v.includes(faux)) faux = dessine[f] + 3 * pas;
  dessine[f] = faux;
  const liste = J.lignes.map((l, k) => `${l.l} ${J.v[k]}`).join(", ");
  return {
    text: pick([
      `Le tableau dit : ${liste}. ${quelquun().nom} a dessiné ce diagramme. Quelle barre est fausse ?`,
      `Voici les vrais nombres : ${liste}. Une barre du diagramme est fausse. Laquelle ?`,
      `Compare le diagramme aux nombres ${liste}. Quelle barre faut-il corriger ?`,
    ]),
    format: "qcm",
    choices: choix(J.lignes[f].l, J.lignes.filter((_, k) => k !== f).map((l) => l.l)),
    expected: [J.lignes[f].l],
    comparator: "mcq_exact",
    explanation: exp(
      "Chaque barre doit monter jusqu'au nombre de sa ligne.",
      "On lit la hauteur de chaque barre sur l'axe et on la compare au nombre donné.",
      `La barre « ${J.lignes[f].l} » monte à ${faux}, au lieu de ${J.v[f]}.`,
      `C'est la barre « ${J.lignes[f].l} ».`,
    ),
    canvas: graphe(J, pas, undefined, dessine),
  };
}

function choisirGraduation(e: Etoile): Q {
  const T = pick(THEMES.filter((t) => t.max >= 60));
  const n = 4;
  const lignes = T.jours ? suiteDeJours(T.items, n) : shuffle(T.items).slice(0, n);
  const v = valeurs(n, 20, 90, 10);
  const J: Jeu = { T, lignes, v };
  const bonne = "de 10 en 10";
  return {
    text: pick([
      `On veut dessiner le diagramme de ce tableau sur une feuille. Quelle graduation choisir pour l'axe ?`,
      `${quelquun().nom} prépare l'axe du diagramme. Quelle graduation est la mieux adaptée ?`,
      `Les nombres vont jusqu'à ${Math.max(...v)}. De combien en combien graduer l'axe ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, ["de 1 en 1", "de 100 en 100", "de 1000 en 1000"]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "La graduation doit permettre de placer le plus grand nombre sans faire trop de traits.",
      `Le plus grand nombre est ${Math.max(...v)}.`,
      `De 1 en 1, il faudrait ${Math.max(...v)} traits ; de 100 en 100, toutes les barres seraient minuscules. De 10 en 10, il faut ${Math.ceil(Math.max(...v) / 10)} traits.`,
      "On gradue de 10 en 10.",
    ),
    canvas: tab(J),
  };
}

function produire(e: Etoile): Q {
  if (e === 3) return tirer([() => combienDeBarres(3), () => combienDeCarreaux(3), () => combienDeCarreaux(3), () => barreFausse(3), () => barreFausse(3), () => barreFausse(3)]);
  return tirer([() => combienDeCarreaux(4), () => barreFausse(4), () => barreFausse(4), () => choisirGraduation(4), () => combienDeCarreaux(4), () => combienDeCarreaux(4)]);
}

/* --------- INTERPRÉTER --------- */

function phraseVraie(e: Etoile): Q {
  const avecGraphe = Math.random() < 0.5;
  const { J, pas } = avecGraphe ? jeuGraphe(e, 4) : { J: jeu(e, 4), pas: undefined };
  const { T } = J;
  const ordre = indices(J).sort((x, y) => J.v[y] - J.v[x]);
  const [g, b] = [ordre[0], ordre[3]];
  const [m1, m2] = [ordre[1], ordre[2]];
  const L = (k: number) => `« ${J.lignes[k].l} »`;
  const d = J.v[m1] - J.v[m2];
  const vraies = [
    `${L(g)} a le plus grand nombre.`,
    `${L(b)} a le plus petit nombre.`,
    `${L(m1)} a ${U(T, d)} de plus que ${L(m2)}.`,
    `${L(m2)} a moins que ${L(m1)}.`,
  ];
  const fausses = [
    `${L(b)} a le plus grand nombre.`,
    `${L(m2)} a le plus grand nombre.`,
    `${L(m1)} a le plus petit nombre.`,
    `${L(m2)} a ${U(T, d)} de plus que ${L(m1)}.`,
    `${L(m1)} a ${U(T, d + (pas ?? 1))} de plus que ${L(m2)}.`,
    `${L(b)} a plus que ${L(g)}.`,
  ];
  const k = e <= 3 ? rint(0, 1) : rint(2, 3);
  const bonne = vraies[k];
  return {
    text: pick([
      `Lis ${avecGraphe ? "le diagramme" : "le tableau"}. Quelle phrase est vraie ?`,
      `${quelquun().nom} écrit quatre phrases sur « ${T.titre} ». Laquelle est vraie ?`,
      `Une seule phrase dit vrai sur ${avecGraphe ? "ce diagramme" : "ce tableau"}. Laquelle ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, fausses),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Interpréter, c'est vérifier une phrase en relisant les données.",
      "On teste chaque phrase avec les nombres.",
      J.lignes.map((l, i) => `${l.l} : ${J.v[i]}`).join(" ; ") + ".",
      `La phrase vraie : ${bonne}`,
    ),
    canvas: avecGraphe ? graphe(J, pas) : tab(J),
  };
}

function aRaison(e: Etoile): Q {
  const avecGraphe = Math.random() < 0.5;
  const { J, pas } = avecGraphe ? jeuGraphe(e) : { J: jeu(e), pas: undefined };
  const { T } = J;
  let [a, b] = deuxIndices(J.lignes.length);
  if (J.v[a] < J.v[b]) [a, b] = [b, a];
  const d = J.v[a] - J.v[b];
  const p = quelquun();
  const juste = Math.random() < 0.5;
  const dit = juste ? d : d + pick([pas ?? 1, 10, 2 * (pas ?? 1)]);
  const bonne = juste ? "oui" : `non, il y en a ${U(T, d)} de plus`;
  const autre = juste ? `non, il y en a ${U(T, d + (pas ?? 1))} de plus` : `non, il y en a ${U(T, d)} de plus`;
  return {
    text: pick([
      `${p.nom} dit : « Il y a ${dit} ${T.unite[1]} de plus pour ${J.lignes[a].l} que pour ${J.lignes[b].l}. » A-t-${p.il} raison ?`,
      `D'après ${p.nom}, « ${J.lignes[a].l} » a ${U(T, dit)} de plus que « ${J.lignes[b].l} ». Est-ce vrai ?`,
      `${p.nom} lit ${avecGraphe ? "le diagramme" : "le tableau"} : « ${J.lignes[a].l} » dépasse « ${J.lignes[b].l} » de ${U(T, dit)}. Vrai ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, ["oui", autre, `non, c'est « ${J.lignes[b].l} » qui a le plus`, "on ne peut pas savoir"]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour vérifier « combien de plus », on calcule l'écart.",
      `On lit « ${J.lignes[a].l} » (${J.v[a]}) et « ${J.lignes[b].l} » (${J.v[b]}).`,
      `${J.v[a]} − ${J.v[b]} = ${d}.`,
      juste ? `Oui, il y en a bien ${d} de plus.` : `Non : il y en a ${d} de plus, pas ${dit}.`,
    ),
    canvas: avecGraphe ? graphe(J, pas) : tab(J),
  };
}

function foisPlus(e: Etoile): Q {
  const T = pick(THEMES);
  const k = rint(2, 5);
  const base = rint(2, Math.max(3, Math.floor(Math.min(T.max, 200) / (k * 2))));
  const n = 4;
  const lignes = T.jours ? suiteDeJours(T.items, n) : shuffle(T.items).slice(0, n);
  const [a, b] = deuxIndices(n);
  const v = valeurs(n, base, base * k * 2).map((x) => (x === base || x === base * k ? x + 1 : x));
  v[a] = base * k;
  v[b] = base;
  const J: Jeu = { T, lignes, v };
  const bonne = `${k} fois plus`;
  return {
    text: pick([
      `Combien de fois plus pour « ${lignes[a].l} » que pour « ${lignes[b].l} » ?`,
      `${quelquun().nom} compare « ${lignes[a].l} » et « ${lignes[b].l} ». Combien de fois plus ?`,
      `« ${lignes[a].l} » a combien de fois plus que « ${lignes[b].l} » ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, [`${k + 1} fois plus`, `${k - 1 || k + 2} fois plus`, `${base * k - base} fois plus`, `${k * 10} fois plus`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "« Combien de fois plus » : on cherche par quel nombre multiplier le petit pour trouver le grand.",
      `On lit ${base * k} et ${base}.`,
      `${base} × ${k} = ${base * k}.`,
      `${maj(bonne)}.`,
    ),
    canvas: tab(J),
  };
}

function interpreter(e: Etoile): Q {
  if (e === 3) return tirer([() => phraseVraie(3), () => aRaison(3), () => lirePlusMoins(3)]);
  if (e === 4) return tirer([() => phraseVraie(4), () => aRaison(4), () => aRaison(4)]);
  return tirer([() => foisPlus(5), () => phraseVraie(5), () => aRaison(5)]);
}

/* --------- PROBLÈMES --------- */

type Stand = { titre: string; cat: string; val: string; unite: readonly [string, string]; items: readonly string[]; prix: readonly number[]; vend: string };

const STANDS: readonly Stand[] = [
  { titre: "Le stand de crêpes", cat: "Crêpe", val: "Crêpes vendues", unite: ["crêpe", "crêpes"], items: ["sucre", "chocolat", "confiture", "miel", "citron"], prix: [1, 2, 3], vend: "Une crêpe coûte" },
  { titre: "Le stand de jus de fruits", cat: "Jus", val: "Verres vendus", unite: ["verre", "verres"], items: ["orange", "pomme", "ananas", "fraise", "raisin"], prix: [1, 2], vend: "Un verre coûte" },
  { titre: "Les gâteaux de la kermesse", cat: "Gâteau", val: "Parts vendues", unite: ["part", "parts"], items: ["cookies", "muffins", "madeleines", "brownies", "cakes"], prix: [1, 2, 3], vend: "Une part coûte" },
  { titre: "Les plants du marché", cat: "Plant", val: "Plants vendus", unite: ["plant", "plants"], items: ["tomates", "salades", "fraisiers", "courgettes", "radis"], prix: [2, 3, 4, 5], vend: "Un plant coûte" },
  { titre: "Les billets du spectacle", cat: "Séance", val: "Billets vendus", unite: ["billet", "billets"], items: ["mercredi", "vendredi", "samedi", "dimanche"], prix: [4, 5], vend: "Un billet coûte" },
  { titre: "Les bracelets de l'atelier", cat: "Couleur", val: "Bracelets vendus", unite: ["bracelet", "bracelets"], items: ["rouges", "bleus", "verts", "jaunes", "violets"], prix: [2, 3], vend: "Un bracelet coûte" },
  { titre: "Les tickets de la tombola", cat: "Classe", val: "Tickets vendus", unite: ["ticket", "tickets"], items: ["CP", "CE1", "CE2", "CM1", "CM2"], prix: [1, 2], vend: "Un ticket coûte" },
];

function jeuStand(e: Etoile, k = 4): { S: Stand; J: Jeu; prix: number } {
  const S = pick(STANDS);
  const prix = pick(S.prix);
  const items = S.cat === "Séance" || S.cat === "Classe" ? S.items.slice(0, k) : shuffle(S.items).slice(0, k);
  const T: Theme = {
    titre: S.titre, cat: S.cat, val: S.val, unite: S.unite, items: items.map((l) => ({ l, q: l })),
    combien: (q) => q, plus: "", moins: "", quel: "", max: 300,
  };
  const hi = e <= 3 ? 20 : e === 4 ? 40 : 60;
  return { S, J: { T, lignes: T.items.slice(), v: valeurs(k, 3, hi) }, prix };
}

const euros = (n: number) => `${n} €`;

function recette(e: Etoile): Q {
  const { S, J, prix: p0 } = jeuStand(e);
  // à 1 €, le prix et la quantité se confondent : trois choix seulement
  const prix = p0 === 1 ? 2 : p0;
  const i = rint(0, J.lignes.length - 1);
  const n = J.v[i];
  const r = n * prix;
  return {
    text: pick([
      `${S.vend} ${prix} €. Combien d'argent ont rapporté les ventes « ${J.lignes[i].l} » ?`,
      `Au stand, ${min1(S.vend)} ${prix} €. Combien rapporte la ligne « ${J.lignes[i].l} » ?`,
      `${quelquun().nom} tient la caisse. ${S.vend} ${prix} €. Combien pour « ${J.lignes[i].l} » ?`,
    ]),
    format: "qcm",
    choices: choix(euros(r), [n + prix, n, r + prix, r - prix, (n + 1) * prix].map(euros)),
    expected: [euros(r)],
    comparator: "mcq_exact",
    explanation: exp(
      "Le même prix, plusieurs fois : c'est une multiplication.",
      `On lit le tableau : ${pl(n, S.unite[0], S.unite[1])} « ${J.lignes[i].l} ». On multiplie par le prix.`,
      `${n} × ${prix} = ${r}.`,
      `Elles ont rapporté ${r} €.`,
    ),
    canvas: tab(J),
  };
}

function manque(e: Etoile): Q {
  const { S, J } = jeuStand(e);
  const [a, b] = deuxIndices(J.lignes.length);
  const deja = J.v[a] + J.v[b];
  const but = (Math.floor(deja / 10) + rint(1, 4)) * 10;
  const m = but - deja;
  const u = (x: number) => pl(x, S.unite[0], S.unite[1]);
  return {
    text: pick([
      `On voulait vendre ${but} ${S.unite[1]} « ${J.lignes[a].l} » et « ${J.lignes[b].l} » ensemble. Combien en manque-t-il ?`,
      `L'objectif était ${u(but)} pour « ${J.lignes[a].l} » et « ${J.lignes[b].l} ». Combien manque-t-il ?`,
      `${quelquun().nom} espérait ${u(but)} pour « ${J.lignes[a].l} » et « ${J.lignes[b].l} ». Combien en manque-t-il ?`,
    ]),
    format: "qcm",
    choices: choix(u(m), [deja, but - J.v[a], m + 10, m + 1, but + deja].map(u)),
    expected: [u(m)],
    comparator: "mcq_exact",
    explanation: exp(
      "Ce qui manque, c'est l'écart entre ce qu'on veut et ce qu'on a.",
      `On additionne les deux lignes, puis on retire de l'objectif.`,
      `${J.v[a]} + ${J.v[b]} = ${deja} ; ${but} − ${deja} = ${m}.`,
      `Il en manque ${m}.`,
    ),
    canvas: tab(J),
  };
}

function reste(e: Etoile): Q {
  const { S, J } = jeuStand(e);
  const i = rint(0, J.lignes.length - 1);
  const avant = (Math.floor(J.v[i] / 10) + rint(1, 3)) * 10;
  const r = avant - J.v[i];
  const u = (x: number) => pl(x, S.unite[0], S.unite[1]);
  return {
    text: pick([
      `Au début, il y avait ${u(avant)} « ${J.lignes[i].l} ». Combien en reste-t-il à vendre ?`,
      `On avait préparé ${u(avant)} « ${J.lignes[i].l} ». Le tableau donne les ventes. Combien en reste-t-il ?`,
      `${quelquun().nom} avait ${u(avant)} « ${J.lignes[i].l} ». Combien lui en reste-t-il ?`,
    ]),
    format: "qcm",
    choices: choix(u(r), [avant + J.v[i], J.v[i], r + 10, r + 1, r - 1].map(u)),
    expected: [u(r)],
    comparator: "mcq_exact",
    explanation: exp(
      "Ce qui reste : on retire ce qui est parti.",
      `On lit les ventes « ${J.lignes[i].l} » (${J.v[i]}), puis on les retire du départ.`,
      `${avant} − ${J.v[i]} = ${r}.`,
      `Il en reste ${r}.`,
    ),
    canvas: tab(J),
  };
}

function recetteDeux(e: Etoile): Q {
  const { S, J, prix } = jeuStand(e);
  const [a, b] = deuxIndices(J.lignes.length);
  const n = J.v[a] + J.v[b];
  const r = n * prix;
  return {
    text: pick([
      `${S.vend} ${prix} €. Combien ont rapporté « ${J.lignes[a].l} » et « ${J.lignes[b].l} » ensemble ?`,
      `${quelquun().nom} compte la caisse de « ${J.lignes[a].l} » et « ${J.lignes[b].l} ». ${S.vend} ${prix} €. Combien d'euros ?`,
      `Avec ${min1(S.vend)} ${prix} €, combien rapportent les lignes « ${J.lignes[a].l} » et « ${J.lignes[b].l} » ?`,
    ]),
    format: "qcm",
    choices: choix(euros(r), [n, J.v[a] * prix, n + prix, r + prix, r - prix].map(euros)),
    expected: [euros(r)],
    comparator: "mcq_exact",
    explanation: exp(
      "Deux étapes : d'abord combien en tout, puis le prix.",
      "On additionne les deux lignes, puis on multiplie par le prix.",
      `${J.v[a]} + ${J.v[b]} = ${n} ; ${n} × ${prix} = ${r}.`,
      `Elles ont rapporté ${r} €.`,
    ),
    canvas: tab(J),
  };
}

function boites(e: Etoile): Q {
  const { S, J } = jeuStand(e);
  const t = pick([5, 10]);
  const k = rint(2, e >= 5 ? 9 : 6);
  const i = rint(0, J.lignes.length - 1);
  J.v[i] = k * t;
  if (new Set(J.v).size < J.v.length) J.v = J.v.map((x, j) => (j !== i && x === k * t ? x + 1 : x));
  const [texte, sg, plu] = pick([
    [`On range les ${S.unite[1]} « ${J.lignes[i].l} » par paquets de ${t}. Combien de paquets ?`, "paquet", "paquets"],
    [`${quelquun().nom} met les ${S.unite[1]} « ${J.lignes[i].l} » dans des boîtes de ${t}. Combien de boîtes pleines ?`, "boîte", "boîtes"],
    [`Les ${S.unite[1]} « ${J.lignes[i].l} » partent par lots de ${t}. Combien de lots ?`, "lot", "lots"],
  ] as const);
  return {
    text: texte,
    format: "qcm",
    choices: choix(pl(k, sg, plu), [k + 1, k - 1, k * t, k + t, t].map((x) => pl(x, sg, plu))),
    expected: [pl(k, sg, plu)],
    comparator: "mcq_exact",
    explanation: exp(
      "Faire des paquets égaux, c'est chercher combien de fois le paquet entre dans le nombre.",
      `On lit ${k * t} dans le tableau, puis on cherche combien de fois ${t}.`,
      `${k} × ${t} = ${k * t}.`,
      `Il en faut ${k}.`,
    ),
    canvas: tab(J),
  };
}

function probleme(e: Etoile): Q {
  if (e === 3) return tirer([() => recette(3), () => reste(3), () => manque(3)]);
  if (e === 4) return tirer([() => recette(4), () => manque(4), () => reste(4), () => boites(4)]);
  return tirer([() => recetteDeux(5), () => boites(5), () => manque(5)]);
}

/* --------- DÉFIS --------- */

function carreauVaut(): Q {
  const p = quelquun();
  const pas = pick([2, 5, 10, 20]);
  const n = 4;
  const { T, lignes } = lignesGraphe(n, pas / 2);
  const h = valeurs(n, 1, 9);
  const J: Jeu = { T, lignes, v: h };
  const [a, b] = deuxIndices(n);
  const r = h[b] * pas;
  return {
    text: pick([
      `Sur ce diagramme, l'axe compte des carreaux. La barre « ${lignes[a].l} » vaut ${U(T, h[a] * pas)}. Combien vaut la barre « ${lignes[b].l} » ?`,
      `${p.nom} a oublié la graduation. ${maj(p.il)} sait que « ${lignes[a].l} » vaut ${U(T, h[a] * pas)}. Combien pour « ${lignes[b].l} » ?`,
      `« ${lignes[a].l} » représente ${U(T, h[a] * pas)}. Que représente la barre « ${lignes[b].l} » ?`,
    ]),
    format: "qcm",
    choices: choix(U(T, r), [h[b], r + pas, r - pas, h[b] * h[a], h[a] * pas + h[b]].map((x) => U(T, x))),
    expected: [U(T, r)],
    comparator: "mcq_exact",
    explanation: exp(
      "D'abord trouver ce que vaut UN carreau, ensuite le reste.",
      `« ${lignes[a].l} » monte de ${h[a]} carreaux pour ${h[a] * pas} : un carreau vaut ${h[a] * pas} ÷ ${h[a]} = ${pas}.`,
      `« ${lignes[b].l} » monte de ${h[b]} carreaux : ${h[b]} × ${pas} = ${r}.`,
      `${maj(U(T, r))}.`,
    ),
    canvas: graphe(J, 1, "carreaux"),
  };
}

function deuxInconnues(): Q {
  const J = jeu(5, 4);
  const { T } = J;
  let [a, b] = deuxIndices(4);
  if (J.v[a] < J.v[b]) [a, b] = [b, a];
  const s = J.v[a] + J.v[b];
  const d = J.v[a] - J.v[b];
  return {
    text: pick([
      `« ${J.lignes[a].l} » et « ${J.lignes[b].l} » font ${U(T, s)} en tout, et « ${J.lignes[a].l} » a ${U(T, d)} de plus. Combien pour « ${J.lignes[b].l} » ?`,
      `${quelquun().nom} sait que les deux cases « ? » font ${s} ensemble, avec ${d} de plus pour « ${J.lignes[a].l} ». Que vaut « ${J.lignes[b].l} » ?`,
      `Deux cases sont cachées. Ensemble : ${s}. Écart : ${d}, en faveur de « ${J.lignes[a].l} ». Combien pour « ${J.lignes[b].l} » ?`,
    ]),
    format: "qcm",
    choices: choix(U(T, J.v[b]), [J.v[a], s - d, Math.floor(s / 2), s + d, J.v[b] + 1].map((x) => U(T, x))),
    expected: [U(T, J.v[b])],
    comparator: "mcq_exact",
    explanation: exp(
      "Si on enlève l'écart, les deux cases deviennent égales.",
      `On retire ${d} du total, puis on partage en deux.`,
      `${s} − ${d} = ${s - d} ; ${s - d} ÷ 2 = ${J.v[b]}. Vérification : ${J.v[b]} + ${d} = ${J.v[a]} et ${J.v[a]} + ${J.v[b]} = ${s}.`,
      `${maj(U(T, J.v[b]))}.`,
    ),
    canvas: tableau({
      title: T.titre,
      headers: [T.cat, T.val],
      rows: J.lignes.map((li, k) => ({ values: [li.l, k === a || k === b ? "?" : J.v[k]] })),
    }),
  };
}

function totalCache(): Q {
  const G = grille(5);
  const i = rint(0, G.R.length - 1);
  const j = rint(0, G.C.length - 1);
  const col = G.g.map((l) => l[j]);
  const totCol = somme(col);
  const n = G.g[i][j];
  return {
    text: pick([
      `La colonne « ${G.C[j].l} » fait ${totCol} en tout. Quel nombre se cache sous le « ? » ?`,
      `${quelquun().nom} sait que la colonne « ${G.C[j].l} » totalise ${totCol}. Que vaut la case « ? » ?`,
      `Total de la colonne « ${G.C[j].l} » : ${totCol}. Retrouve la case effacée.`,
    ]),
    format: "qcm",
    choices: choix(UC(G, j, n), [totCol, somme(col) - n, n + 10, n - 1, n + 1].map((x) => UC(G, j, x))),
    expected: [UC(G, j, n)],
    comparator: "mcq_exact",
    explanation: exp(
      "Le total d'une colonne est la somme de ses cases, de haut en bas.",
      `On additionne les autres cases de la colonne « ${G.C[j].l} », puis on retire du total.`,
      `${col.filter((_, k) => k !== i).join(" + ")} = ${totCol - n} ; ${totCol} − ${totCol - n} = ${n}.`,
      `La case vaut ${n}.`,
    ),
    canvas: tabDouble(G, { trou: [i, j] }),
  };
}

function defi(): Q {
  return tirer([carreauVaut, deuxInconnues, totalCache, () => lireBarre(5)]);
}

/* ---------------------------------------------------------
   LES GABARITS, micro par micro
--------------------------------------------------------- */

function gab(id: string, microId: string, difficulty: Etoile, hint: string, tags: string[], generate: () => Q) {
  return gabarit({ id, notionId: "donnees", microId, difficulty, hint, tags }, generate);
}

const D_LT = "ce2_donnees_lire_tableau";
const D_DE = "ce2_donnees_double_entree";
const D_CO = "ce2_donnees_completer_tableau";
const D_LG = "ce2_donnees_lire_graphique";
const D_PR = "ce2_donnees_produire";
const D_IN = "ce2_donnees_interpreter";
const D_PB = "ce2_donnees_probleme";
const D_DF = "ce2_donnees_defi";

donneesBank.push(
  gab(`${D_LT}_tpl_3`, D_LT, 1, "Trouve la ligne, puis lis le nombre au bout de la ligne.", ["lire_tableau", "canvas"], () => lireTableau(1)),
  gab(`${D_LT}_tpl_1`, D_LT, 2, "Pose ton doigt sur la ligne, puis glisse jusqu'au nombre.", ["lire_tableau", "canvas"], () => lireTableau(2)),
  gab(`${D_LT}_tpl_2`, D_LT, 3, "Lis les deux nombres utiles, puis calcule.", ["lire_tableau", "canvas"], () => lireTableau(3)),
  gab(`${D_LT}_tpl_4`, D_LT, 4, "« En tout » : on additionne ; « de plus » : on soustrait.", ["lire_tableau", "canvas"], () => lireTableau(4)),

  gab(`${D_DE}_tpl_3`, D_DE, 2, "Un doigt sur la ligne, un doigt sur la colonne : la case est au croisement.", ["double_entree", "canvas"], () => doubleEntree(2)),
  gab(`${D_DE}_tpl_1`, D_DE, 3, "Un doigt sur la ligne, un doigt sur la colonne.", ["double_entree", "canvas"], () => doubleEntree(3)),
  gab(`${D_DE}_tpl_2`, D_DE, 4, "Reste dans la bonne colonne, ou additionne toute la ligne.", ["double_entree", "canvas"], () => doubleEntree(4)),
  gab(`${D_DE}_tpl_4`, D_DE, 5, "Calcule le total de chaque ligne avant de comparer.", ["double_entree", "canvas"], () => doubleEntree(5)),

  gab(`${D_CO}_tpl_2`, D_CO, 3, "Le total moins les cases connues donne la case qui manque.", ["completer", "canvas"], () => completer(3)),
  gab(`${D_CO}_tpl_1`, D_CO, 4, "Additionne les cases connues, puis retire-les du total.", ["completer", "canvas"], () => completer(4)),

  gab(`${D_LG}_tpl_3`, D_LG, 2, "Suis le haut de la barre jusqu'à l'axe.", ["lire_graphique", "canvas"], () => lireGraphique(2)),
  gab(`${D_LG}_tpl_1`, D_LG, 3, "Regarde de combien en combien va l'axe avant de lire.", ["lire_graphique", "canvas"], () => lireGraphique(3)),
  gab(`${D_LG}_tpl_4`, D_LG, 4, "Un trait de l'axe ne vaut pas toujours 1.", ["lire_graphique", "canvas"], () => lireGraphique(4)),
  gab(`${D_LG}_tpl_2`, D_LG, 5, "Lis chaque barre sur l'axe, puis calcule.", ["lire_graphique", "canvas"], () => lireGraphique(5)),

  gab(`${D_PR}_tpl_3`, D_PR, 3, "Une ligne du tableau = une barre du diagramme.", ["produire", "canvas"], () => produire(3)),
  gab(`${D_PR}_tpl_1`, D_PR, 4, "Combien de fois la valeur d'un carreau dans le nombre ?", ["produire", "canvas"], () => produire(4)),
  gab(`${D_PR}_tpl_2`, D_PR, 4, "Chaque barre doit monter jusqu'à son nombre.", ["produire", "canvas"], () => produire(4)),

  gab(`${D_IN}_tpl_3`, D_IN, 3, "Teste chaque phrase avec les nombres.", ["interpreter", "canvas"], () => interpreter(3)),
  gab(`${D_IN}_tpl_1`, D_IN, 4, "Calcule l'écart avant de dire si c'est vrai.", ["interpreter", "canvas"], () => interpreter(4)),
  gab(`${D_IN}_tpl_2`, D_IN, 5, "« Combien de fois plus » : par quel nombre multiplier le petit ?", ["interpreter", "canvas"], () => interpreter(5)),

  gab(`${D_PB}_tpl_3`, D_PB, 3, "Lis le bon nombre dans le tableau, puis calcule.", ["probleme", "canvas"], () => probleme(3)),
  gab(`${D_PB}_tpl_1`, D_PB, 4, "Quelle opération : ajouter, retirer, multiplier ?", ["probleme", "canvas"], () => probleme(4)),
  gab(`${D_PB}_tpl_2`, D_PB, 5, "Deux étapes : d'abord combien en tout, puis le prix.", ["probleme", "canvas"], () => probleme(5)),

  gab(`${D_DF}_tpl_1`, D_DF, 5, "Commence par ce que tu peux calculer tout de suite.", ["defi", "canvas"], () => defi()),
  gab(`${D_DF}_tpl_2`, D_DF, 5, "Trouve d'abord ce que vaut un carreau, ou ce qui manque au total.", ["defi", "canvas"], () => defi()),
);
