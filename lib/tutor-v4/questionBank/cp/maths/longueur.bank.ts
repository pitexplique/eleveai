// lib/tutor-v4/questionBank/cp/maths/longueur.bank.ts
//
// Les longueurs du CP, écrites à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « Au CP, les travaux sur les longueurs s'appuient principalement sur des
//     MANIPULATIONS » : on compare avant de mesurer ;
//   — le lexique à installer : long, court, près, loin ;
//   — comparer deux objets déplaçables en faisant coïncider une extrémité et
//     en les superposant ; comparer deux objets NON déplaçables en reportant
//     leur longueur avec une ficelle ou une bandelette ; ordonner jusqu'à cinq
//     baguettes ;
//   — mesurer un segment avec une règle graduée en centimètres, et en
//     construire un d'une longueur donnée ;
//   — deux unités seulement : le mètre et le centimètre, symboles m et cm,
//     avec 1 m = 100 cm. ⛔ PAS de kilomètre : il arrive au CE1. Ni décimètre
//     ni millimètre : ils arrivent au CE2 ;
//   — quelques longueurs de référence, pour estimer la hauteur de la porte ou
//     la largeur de la classe. Le BO donne l'item mot pour mot : « L'élève
//     sait dire si la longueur d'une trousse est plutôt 2 cm, 20 cm ou 1 m. »
//
// LE PIÈGE DE LA NOTION : comparer sans aligner. Deux crayons posés côte à
// côte, l'un décalé vers l'avant, et le plus court a l'air du plus long. Son
// cousin s'attrape sur la règle : on pose le bord de la règle au début de
// l'objet au lieu du zéro, ou on commence à lire au 1 — et il manque toujours
// un centimètre.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const longueurBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_LONGUEUR_LEXIQUE — long, court, près, loin
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_longueur_lexique_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_lexique",
    difficulty: 1,
    theme: "neutral",
    text: "Un crayon neuf et un petit bout de crayon presque fini. Lequel est le plus COURT ?",
    format: "qcm",
    choices: [
      "le petit bout de crayon",
      "le crayon neuf",
      "les deux pareil",
      "on ne peut pas savoir",
    ],
    expected: ["le petit bout de crayon"],
    comparator: "mcq_exact",
    hint: "« Court », c'est le contraire de « long ».",
    explanation: exp(
      "« Long » et « court » servent à comparer deux longueurs.",
      "On regarde lequel des deux objets s'étend le moins.",
      "Le crayon neuf est long, le bout de crayon est court : on l'a taillé beaucoup de fois.",
      "Le plus court est le petit bout de crayon.",
    ),
    tags: ["cp", "longueur", "lexique", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_longueur_lexique_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_lexique",
    difficulty: 2,
    theme: "reunion",
    text: "Ton école est à 200 pas de chez toi, et la boulangerie à 20 pas. Laquelle est le plus PRÈS ?",
    format: "qcm",
    choices: ["la boulangerie", "l'école", "les deux pareil", "on ne peut pas savoir"],
    expected: ["la boulangerie"],
    comparator: "mcq_exact",
    hint: "« Près », c'est quand il y a peu de chemin à faire.",
    explanation: exp(
      "« Près » et « loin » comparent des distances : le chemin qu'il faut parcourir.",
      "On compare les deux distances comme deux nombres.",
      "20 pas, c'est moins que 200 pas. Il y a donc moins de chemin jusqu'à la boulangerie.",
      "La boulangerie est le plus près.",
    ),
    tags: ["cp", "longueur", "lexique", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "cp_longueur_lexique_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_lexique",
    difficulty: 2,
    theme: "neutral",
    hint: "Imagine les deux objets posés l'un à côté de l'autre.",
    tags: ["cp", "longueur", "lexique", "template"],
    generate: () => {
      const objets = [
        { nom: "une gomme", rang: 1 },
        { nom: "un crayon", rang: 2 },
        { nom: "une règle", rang: 3 },
        { nom: "un bras", rang: 4 },
        { nom: "une table", rang: 5 },
        { nom: "un tableau de classe", rang: 6 },
        { nom: "un couloir d'école", rang: 7 },
      ] as const;
      const [a, b] = shuffle(objets).slice(0, 2);
      const long = a.rang > b.rang ? a : b;
      const court = a.rang > b.rang ? b : a;
      const chercheLong = randomChoice([true, false]);
      const bonne = chercheLong ? long.nom : court.nom;
      return {
        text: `Qu'est-ce qui est le plus ${chercheLong ? "LONG" : "COURT"} : ${a.nom} ou ${b.nom} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          chercheLong ? court.nom : long.nom,
          "les deux pareil",
          "on ne peut pas savoir",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer deux longueurs, c'est dire laquelle s'étend le plus.",
          "On imagine les deux objets posés l'un contre l'autre, bien alignés au départ.",
          `On les pose côte à côte, alignés au départ : ${long.nom} dépasse, ${court.nom} s'arrête bien avant.`,
          `Le plus ${chercheLong ? "long" : "court"}, c'est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_LONGUEUR_COMPARER — LE piège : comparer sans aligner
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_longueur_comparer_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Pour savoir lequel de deux crayons est le plus long, que faut-il faire d'abord ?",
    format: "qcm",
    choices: [
      "poser les deux crayons côte à côte, en alignant leurs bouts de départ",
      "poser les crayons n'importe comment et regarder",
      "regarder lequel est le plus épais",
      "compter les couleurs",
    ],
    expected: ["poser les deux crayons côte à côte, en alignant leurs bouts de départ"],
    comparator: "mcq_exact",
    hint: "Si l'un des deux part plus en avant, la comparaison est faussée.",
    explanation: exp(
      "On ne compare deux longueurs qu'à partir d'un même point de départ.",
      "On superpose les deux objets en faisant coïncider une extrémité.",
      "Si un crayon est décalé vers l'avant, il dépasse à l'arrivée même s'il est plus court : c'est le décalage qu'on voit, pas la longueur. En alignant les deux départs, celui qui dépasse à l'autre bout est vraiment le plus long.",
      "Il faut aligner les deux bouts de départ.",
    ),
    tags: ["cp", "longueur", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_longueur_comparer_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Deux bandes de papier sont posées l'une sous l'autre. La bande du haut commence plus à gauche et finit plus à droite. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "la bande du haut est la plus longue",
      "la bande du bas est la plus longue",
      "elles ont la même longueur",
      "on ne peut rien dire du tout",
    ],
    expected: ["la bande du haut est la plus longue"],
    comparator: "mcq_exact",
    hint: "Elle dépasse des DEUX côtés à la fois.",
    explanation: exp(
      "Une bande qui dépasse aux deux extrémités contient entièrement l'autre.",
      "On regarde les deux bouts, pas un seul.",
      "La bande du haut commence avant et finit après : l'autre tient tout entière à l'intérieur. Ici, pas besoin d'aligner — le résultat est déjà sûr. C'est quand une seule extrémité dépasse qu'il faut aligner avant de conclure.",
      "La bande du haut est la plus longue.",
    ),
    tags: ["cp", "longueur", "comparer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_longueur_comparer_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Les deux bandes partent du même bord : on peut comparer directement.",
    tags: ["cp", "longueur", "comparer", "template"],
    generate: () => {
      const a = randomInt(4, 18);
      let b = randomInt(4, 18);
      while (b === a) b = randomInt(4, 18);
      const couleurs = shuffle(["rouge", "bleue", "verte", "jaune"]).slice(0, 2);
      const plusLongue = a > b ? couleurs[0] : couleurs[1];
      return {
        text: `Deux bandes de papier partent du même bord. La bande ${couleurs[0]} mesure ${a} cm, la bande ${couleurs[1]} mesure ${b} cm. Laquelle est la plus longue ?`,
        format: "qcm",
        choices: makeChoices(`la bande ${plusLongue}`, [
          `la bande ${plusLongue === couleurs[0] ? couleurs[1] : couleurs[0]}`,
          "les deux pareil",
          "on ne peut pas savoir",
        ]),
        expected: [`la bande ${plusLongue}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux longueurs écrites dans la même unité se comparent comme deux nombres.",
          "On vérifie d'abord que les deux bandes partent du même endroit, puis on compare.",
          `${Math.max(a, b)} cm est plus grand que ${Math.min(a, b)} cm.`,
          `La plus longue est la bande ${plusLongue}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_LONGUEUR_MESURER_UNITE — le report d'une bandelette
     Ce que le BO demande quand les objets ne se déplacent pas :
     la porte et la fenêtre ne viennent pas se poser côte à côte.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_longueur_mesurer_unite_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_mesurer_unite",
    difficulty: 3,
    theme: "neutral",
    text: "Comment comparer la largeur de la porte et celle de la fenêtre, qu'on ne peut pas déplacer ?",
    format: "qcm",
    choices: [
      "en reportant la largeur de la porte avec une ficelle",
      "en les regardant de loin",
      "en comptant les carreaux du sol",
      "on ne peut pas les comparer",
    ],
    expected: ["en reportant la largeur de la porte avec une ficelle"],
    comparator: "mcq_exact",
    hint: "Ce qui ne se déplace pas, on l'emporte avec une ficelle.",
    explanation: exp(
      "Reporter une longueur, c'est la transporter ailleurs à l'aide d'une ficelle ou d'une bandelette.",
      "On tend la ficelle sur le premier objet, on marque, puis on va comparer sur le second.",
      "On tend la ficelle d'un bord à l'autre de la porte et on fait un nœud. Puis on pose cette ficelle sur la fenêtre : si le nœud dépasse, la porte est plus large.",
      "On reporte la largeur avec une ficelle.",
    ),
    tags: ["cp", "longueur", "report", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cp_longueur_mesurer_unite_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_mesurer_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte combien de fois on a posé l'objet bout à bout.",
    tags: ["cp", "longueur", "report", "template"],
    generate: () => {
      const unite = randomChoice(["gomme", "trombone", "cube", "allumette"]);
      const nb = randomInt(3, 9);
      const objet = randomChoice(["le crayon", "la trousse", "le livre", "la règle"]);
      return {
        text: `On mesure ${objet} en posant des ${unite}s bout à bout. Il en faut exactement ${nb}. Combien de ${unite}s mesure ${objet} ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "Mesurer, c'est compter combien de fois une même longueur tient dans l'objet.",
          "On pose l'unité choisie bout à bout, sans laisser de trou ni se chevaucher, et on compte.",
          `On a posé ${nb} ${unite}s bout à bout : ${objet} mesure donc ${nb} ${unite}s. Avec une autre unité, le nombre changerait — mais la longueur, elle, resterait la même.`,
          `${objet.charAt(0).toUpperCase()}${objet.slice(1)} mesure ${nb} ${unite}s.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_longueur_mesurer_unite_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_mesurer_unite",
    difficulty: 4,
    theme: "neutral",
    hint: "Plus l'unité est petite, plus il en faut.",
    tags: ["cp", "longueur", "report", "piege", "template"],
    generate: () => {
      const nbGrand = randomInt(3, 6);
      const bonne = "il en faut plus";
      return {
        text: `Une table mesure ${nbGrand} règles de long. Si on la mesure avec des gommes, qui sont bien plus petites que les règles, en faudra-t-il plus ou moins que ${nbGrand} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "il en faut moins",
          "il en faut exactement autant",
          "on ne peut pas savoir",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre trouvé dépend de l'unité choisie : la table, elle, ne change pas de longueur.",
          "On se demande si l'unité est plus petite ou plus grande que la précédente.",
          `Une gomme est bien plus courte qu'une règle : il en faut donc davantage pour couvrir la même table — une trentaine, peut-être, là où ${nbGrand} règles suffisaient.`,
          "Il en faut plus.",
        ),
      };
    },
  },

  /* =========================================================
     CP_LONGUEUR_REGLE — la règle graduée, et son décalage
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_longueur_regle_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_regle",
    difficulty: 4,
    theme: "neutral",
    text: "Pour mesurer un segment avec une règle graduée, sur quelle graduation faut-il placer le début du segment ?",
    format: "qcm",
    choices: ["sur le 0", "sur le 1", "sur le bord de la règle", "n'importe où"],
    expected: ["sur le 0"],
    comparator: "mcq_exact",
    hint: "Avant de commencer à mesurer, on n'a encore parcouru aucun centimètre.",
    explanation: exp(
      "La mesure d'un segment se lit à partir du zéro de la règle.",
      "On fait coïncider le début du segment avec la graduation 0, puis on lit à l'autre bout.",
      "En partant du 1, on oublie le premier centimètre : un segment de 8 cm serait lu 7 cm. Et le bord de la règle n'est pas toujours au même endroit que le 0 : sur beaucoup de règles, il y a un petit espace avant.",
      "Le début du segment se place sur le 0.",
    ),
    tags: ["cp", "longueur", "regle", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_longueur_regle_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_regle",
    difficulty: 5,
    theme: "neutral",
    text: "Un segment commence à la graduation 2 et finit à la graduation 9 de la règle. Combien mesure-t-il ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Ce n'est pas 9 : la règle était décalée. Compte les centimètres parcourus.",
    explanation: exp(
      "La longueur d'un segment, c'est l'écart entre son début et sa fin, pas le nombre écrit à l'arrivée.",
      "On compte les centimètres entre les deux graduations.",
      "De 2 à 9, on parcourt 7 centimètres : 2 + 7 = 9. Lire directement 9 reviendrait à mesurer depuis le zéro, alors que le segment ne commence pas là.",
      "Le segment mesure 7 cm.",
    ),
    tags: ["cp", "longueur", "regle", "piege"],
  },
  {
    kind: "template",
    id: "cp_longueur_regle_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_regle",
    difficulty: 5,
    theme: "neutral",
    hint: "Le nombre d'arrivée n'est la mesure que si le départ est sur le 0.",
    tags: ["cp", "longueur", "regle", "piege", "template"],
    generate: () => {
      const debut = randomInt(1, 5);
      const longueur = randomInt(3, 9);
      const fin = debut + longueur;
      return {
        text: `Un segment est posé sur une règle : il commence à la graduation ${debut} et finit à la graduation ${fin}. Combien mesure-t-il, en centimètres ?`,
        format: "short",
        expected: [String(longueur)],
        comparator: "number_equal",
        explanation: exp(
          "Une longueur se lit comme un écart entre deux graduations.",
          "On compte les centimètres du début jusqu'à la fin.",
          `De ${debut} à ${fin}, il y a ${longueur} centimètres : ${debut} + ${longueur} = ${fin}. Répondre ${fin} reviendrait à croire que le segment part du 0.`,
          `Le segment mesure ${longueur} cm.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_longueur_regle_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_regle",
    difficulty: 2,
    theme: "neutral",
    hint: "Le segment part du 0 : la mesure se lit directement à l'arrivée.",
    tags: ["cp", "longueur", "regle", "template"],
    generate: () => {
      const longueur = randomInt(2, 15);
      return {
        text: `Un segment commence à la graduation 0 de la règle et finit à la graduation ${longueur}. Combien mesure-t-il, en centimètres ?`,
        format: "short",
        expected: [String(longueur)],
        comparator: "number_equal",
        explanation: exp(
          "Quand un segment part du zéro, sa mesure se lit directement à l'autre bout.",
          "On vérifie que le départ est bien sur le 0, puis on lit l'arrivée.",
          `Le segment va de 0 à ${longueur} : il mesure ${longueur} cm.`,
          `Il mesure ${longueur} cm.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_LONGUEUR_M_CM — le mètre, le centimètre, et 1 m = 100 cm
     ⛔ Pas de kilomètre au CP.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_longueur_m_cm_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_m_cm",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de centimètres dans 1 mètre ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "C'est le même nombre que le plus grand nombre que tu sais écrire cette année.",
    explanation: exp(
      "1 mètre vaut 100 centimètres.",
      "On se rappelle le mètre ruban : il porte cent petits traits numérotés.",
      "Un mètre, c'est cent centimètres. Une règle d'écolier fait souvent 20 ou 30 cm : il en faudrait trois ou cinq bout à bout pour faire un mètre.",
      "1 m = 100 cm.",
    ),
    tags: ["cp", "longueur", "m_cm", "remarquable"],
  },
  {
    kind: "fixed",
    id: "cp_longueur_m_cm_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_m_cm",
    difficulty: 3,
    theme: "neutral",
    text: "Combien mesure une trousse, à peu près ?",
    format: "qcm",
    choices: ["20 cm", "2 cm", "1 m", "100 m"],
    expected: ["20 cm"],
    comparator: "mcq_exact",
    hint: "2 cm, c'est la largeur d'un doigt. 1 m, c'est presque ta taille.",
    explanation: exp(
      "Estimer une longueur, c'est la comparer à une longueur qu'on connait bien.",
      "On essaie chaque proposition et on garde celle qui a du sens.",
      "2 cm, c'est à peine plus qu'un doigt : bien trop petit pour une trousse. 1 m, c'est presque la taille d'un élève de CP : bien trop grand. Il reste 20 cm, la longueur d'une grande règle.",
      "Une trousse mesure environ 20 cm.",
    ),
    tags: ["cp", "longueur", "m_cm", "estimer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_longueur_m_cm_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_m_cm",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce qui tient dans la main se mesure en centimètres, ce qui est plus grand que toi en mètres.",
    tags: ["cp", "longueur", "m_cm", "template"],
    generate: () => {
      const objets = [
        { nom: "une gomme", unite: "le centimètre" },
        { nom: "un crayon", unite: "le centimètre" },
        { nom: "un cahier", unite: "le centimètre" },
        { nom: "une trousse", unite: "le centimètre" },
        { nom: "la hauteur de la porte", unite: "le mètre" },
        { nom: "la largeur de la classe", unite: "le mètre" },
        { nom: "la longueur du couloir", unite: "le mètre" },
        { nom: "la hauteur d'un cocotier", unite: "le mètre" },
      ] as const;
      const o = randomChoice(objets);
      return {
        text: `Quelle unité convient le mieux pour mesurer ${o.nom} ?`,
        format: "qcm",
        choices: shuffle(["le centimètre", "le mètre"]),
        expected: [o.unite],
        comparator: "mcq_exact",
        explanation: exp(
          "On choisit l'unité qui donne un nombre simple à dire.",
          "On se demande si l'objet tient dans la main ou s'il dépasse notre taille.",
          o.unite === "le centimètre"
            ? `${o.nom.charAt(0).toUpperCase()}${o.nom.slice(1)} tient dans la main : en mètres, on n'obtiendrait même pas 1.`
            : `${o.nom.charAt(0).toUpperCase()}${o.nom.slice(1)} dépasse largement une règle : en centimètres, le nombre serait bien trop grand à écrire.`,
          `On utilise ${o.unite}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_LONGUEUR_DEFI — ranger cinq baguettes, et le mètre qui
     se reconstitue avec des règles d'écolier.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_longueur_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une règle d'écolier mesure 20 cm. Combien de règles faut-il poser bout à bout pour faire 1 mètre ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "1 m = 100 cm. Compte de 20 en 20 jusqu'à 100.",
    explanation: exp(
      "Reporter une longueur bout à bout, c'est chercher combien de fois elle tient dans une plus grande.",
      "On écrit le mètre en centimètres, puis on compte de 20 en 20.",
      "1 m = 100 cm. On compte : 20, 40, 60, 80, 100. Il a fallu cinq règles.",
      "Il faut 5 règles.",
    ),
    tags: ["cp", "longueur", "defi", "piege"],
  },
  {
    kind: "template",
    id: "cp_longueur_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Range d'abord dans ta tête, du plus court au plus long.",
    tags: ["cp", "longueur", "defi", "template"],
    generate: () => {
      const longueurs = shuffle([6, 9, 12, 15, 18, 21, 24]).slice(0, 4);
      const croissant = randomChoice([true, false]);
      const range = [...longueurs].sort((x, y) => (croissant ? x - y : y - x));
      const inverse = [...range].reverse();
      const echangeDebut = [range[1], range[0], range[2], range[3]];
      const echangeFin = [range[0], range[1], range[3], range[2]];
      const cm = (l: number[]) => l.map((x) => `${x} cm`).join(" ; ");
      return {
        text: `Range ces baguettes ${croissant ? "de la plus COURTE à la plus LONGUE" : "de la plus LONGUE à la plus COURTE"} : ${cm(longueurs)}.`,
        format: "qcm",
        choices: makeChoices(cm(range), [
          cm(inverse),
          cm(echangeDebut),
          cm(echangeFin),
        ]),
        expected: [cm(range)],
        comparator: "mcq_exact",
        explanation: exp(
          "Ranger des longueurs écrites dans la même unité revient à ranger des nombres.",
          `On cherche la ${croissant ? "plus courte" : "plus longue"}, on l'écrit, puis on recommence.`,
          `La ${croissant ? "plus courte" : "plus longue"} est ${range[0]} cm, puis vient ${range[1]} cm, puis ${range[2]} cm, et enfin ${range[3]} cm.`,
          `L'ordre est ${cm(range)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_longueur_defi_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Les deux morceaux mis bout à bout font la longueur totale.",
    tags: ["cp", "longueur", "defi", "template"],
    generate: () => {
      const total = randomInt(12, 30);
      const premier = randomInt(4, total - 4);
      const manque = total - premier;
      return {
        text: `Un ruban doit mesurer ${total} cm. On en a déjà découpé ${premier} cm. Combien de centimètres manque-t-il ?`,
        format: "short",
        expected: [String(manque)],
        comparator: "number_equal",
        explanation: exp(
          "Compléter une longueur, c'est chercher ce qui manque pour atteindre le total.",
          "On part de la longueur déjà obtenue et on compte jusqu'au total.",
          `De ${premier} à ${total}, il manque ${manque} : ${premier} + ${manque} = ${total}.`,
          `Il manque ${manque} cm.`,
        ),
      };
    },
  },
];
