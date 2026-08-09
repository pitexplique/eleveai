// lib/tutor-v4/questionBank/ce2/maths/symetrie.bank.ts
//
// La symétrie axiale du CE2, écrite à la main. Quatre micro-compétences qui
// passaient par le constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : reconnaître un ou
// plusieurs axes de symétrie, compléter une figure pour la rendre symétrique,
// construire le symétrique d'un point sur quadrillage.
// ⛔ Pas de symétrie centrale au cycle 2 : elle arrive en 5ᵉ. Ici l'axe est
// une droite, et on plie autour.
//
// LE PIÈGE DE LA NOTION : la diagonale du rectangle. L'élève compte quatre
// axes de symétrie au rectangle — les deux médianes ET les deux diagonales —
// alors qu'il n'en a que DEUX. En pliant le long d'une diagonale, les deux
// moitiés ne se superposent pas : elles se croisent. Le carré, lui, en a bien
// quatre, et c'est ce qui embrouille.
// Le second : le symétrique d'un point n'est pas « juste de l'autre côté »,
// il est à LA MÊME DISTANCE de l'axe, sur la perpendiculaire.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type { TransformationCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

/**
 * Une symétrie d'axe VERTICAL sur quadrillage.
 * On n'affiche l'image que lorsqu'on veut la montrer : pour les questions où
 * l'élève doit la trouver, on la laisse de côté.
 */
function symetrie(args: {
  source: Array<{ x: number; y: number }>;
  image?: Array<{ x: number; y: number }>;
  axeX: number;
}): TransformationCanvasData {
  return {
    kind: "transformation",
    transformation: "symetrie_axiale",
    grid: { rows: 8, cols: 10 },
    source: { points: args.source, label: "Figure", color: "#2563eb" },
    ...(args.image ? { image: { points: args.image, label: "Symétrique", color: "#16a34a" } } : {}),
    axis: { type: "vertical", x: args.axeX, label: "axe" },
    display: {
      showGrid: true,
      showLabels: true,
      showPoints: true,
      showDashedLinks: true,
    },
  };
}

/** Le symétrique d'un point par rapport à un axe vertical. */
function miroir(p: { x: number; y: number }, axeX: number) {
  return { x: 2 * axeX - p.x, y: p.y };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/**
 * Combien d'axes de symétrie, pour les figures du CE2.
 * ⛔ Le cercle n'y figure pas : il en a une INFINITÉ, et aucun nombre entier ne
 * peut le dire. Le mettre à 0 serait faux, et une question qui se répond par
 * un nombre ne convient pas ici.
 */
const AXES = [
  { figure: "un carré", nb: 4, pourquoi: "les deux médianes et les deux diagonales" },
  { figure: "un rectangle qui n'est pas un carré", nb: 2, pourquoi: "les deux médianes seulement — pas les diagonales" },
  { figure: "un triangle équilatéral", nb: 3, pourquoi: "une par sommet" },
  { figure: "un losange qui n'est pas un carré", nb: 2, pourquoi: "ses deux diagonales" },
] as const;

export const symetrieBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_SYMETRIE_AXE — reconnaître les axes
     Le piège de la diagonale du rectangle est ici.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_symetrie_axe_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_axe",
    difficulty: 2,
    theme: "neutral",
    text: "Comment vérifie-t-on qu'une droite est un axe de symétrie d'une figure ?",
    format: "qcm",
    choices: [
      "on plie le long de la droite : les deux moitiés doivent se superposer exactement",
      "on regarde si la droite passe au milieu",
      "on mesure la longueur de la droite",
      "on compte les côtés de chaque côté",
    ],
    expected: ["on plie le long de la droite : les deux moitiés doivent se superposer exactement"],
    comparator: "mcq_exact",
    hint: "Prends la figure en papier et plie-la.",
    explanation: exp(
      "Un axe de symétrie est une droite le long de laquelle on peut plier la figure sans qu'elle dépasse.",
      "On découpe la figure dans du papier et on la plie le long de la droite.",
      "Si les deux moitiés se recouvrent exactement, sans dépassement ni jour, c'est un axe de symétrie. Passer au milieu ne suffit pas : la diagonale d'un rectangle passe au milieu et n'est pourtant pas un axe.",
      "On plie et on regarde si les deux moitiés se superposent.",
    ),
    tags: ["ce2", "symetrie", "axe", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_symetrie_axe_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_axe",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit qu'un rectangle a 4 axes de symétrie, comme le carré. Combien en a-t-il vraiment ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Plie un rectangle de papier le long d'une diagonale : que se passe-t-il ?",
    explanation: exp(
      "Un axe de symétrie doit permettre de plier la figure en deux moitiés qui se superposent exactement.",
      "On essaie les quatre pliages : les deux médianes, puis les deux diagonales.",
      "Les deux pliages du milieu marchent : haut sur bas, gauche sur droite. Mais en pliant le long d'une diagonale, les deux moitiés se croisent au lieu de se recouvrir — un rectangle n'est pas un carré. Il a donc 2 axes, pas 4.",
      "Un rectangle a 2 axes de symétrie.",
    ),
    tags: ["ce2", "symetrie", "axe", "piege"],
  },
  {
    kind: "fixed",
    id: "ce2_symetrie_axe_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_axe",
    difficulty: 3,
    theme: "neutral",
    text: "Combien un carré a-t-il d'axes de symétrie ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Deux pliages par le milieu, et deux par les coins.",
    explanation: exp(
      "Un axe de symétrie permet de plier la figure en deux moitiés qui se superposent.",
      "On essaie tous les pliages possibles : les médianes, puis les diagonales.",
      "Le carré se plie en deux de quatre façons : horizontalement, verticalement, et le long de chacune de ses deux diagonales. Cela fait 4 axes. C'est parce que ses quatre côtés sont égaux que les diagonales fonctionnent — dans un rectangle, elles ne fonctionnent pas.",
      "Un carré a 4 axes de symétrie.",
    ),
    tags: ["ce2", "symetrie", "axe", "remarquable"],
  },
  {
    kind: "template",
    id: "ce2_symetrie_axe_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_axe",
    difficulty: 4,
    theme: "neutral",
    hint: "Essaie tous les pliages : par le milieu, puis par les coins.",
    tags: ["ce2", "symetrie", "axe", "template"],
    generate: () => {
      const cas = randomChoice(AXES);
      return {
        text: `Combien d'axes de symétrie a ${cas.figure} ?`,
        format: "short",
        expected: [String(cas.nb)],
        comparator: "number_equal",
        explanation: exp(
          "Un axe de symétrie permet de plier la figure en deux moitiés qui se superposent exactement.",
          "On essaie chaque pliage possible et on garde ceux qui fonctionnent.",
          `Pour ${cas.figure}, les axes sont ${cas.pourquoi} : cela fait ${cas.nb} axes.`,
          `Il y en a ${cas.nb}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_symetrie_axe_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_axe",
    difficulty: 4,
    theme: "neutral",
    hint: "La diagonale ne marche que si les quatre côtés sont égaux.",
    tags: ["ce2", "symetrie", "axe", "piege", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          question: "La diagonale d'un rectangle qui n'est pas un carré est-elle un axe de symétrie ?",
          bonne: "non, en pliant, les deux moitiés se croisent",
          pourquoi: "les côtés du rectangle n'ont pas tous la même longueur : le pliage en diagonale ne les fait pas coïncider",
        },
        {
          question: "La diagonale d'un carré est-elle un axe de symétrie ?",
          bonne: "oui, les deux moitiés se superposent",
          pourquoi: "les quatre côtés du carré sont égaux : le pliage en diagonale les fait coïncider deux par deux",
        },
        {
          question: "Le trait qui coupe un rectangle en deux dans sa hauteur est-il un axe de symétrie ?",
          bonne: "oui, les deux moitiés se superposent",
          pourquoi: "il sépare le rectangle en deux moitiés identiques, l'une image de l'autre",
        },
      ] as const);
      return {
        text: cas.question,
        format: "qcm",
        choices: makeChoices(cas.bonne, [
          "non, en pliant, les deux moitiés se croisent",
          "oui, les deux moitiés se superposent",
          "on ne peut pas le savoir sans mesurer",
          "seulement si la figure est penchée",
        ]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un axe de symétrie permet de plier la figure en deux moitiés qui se superposent exactement.",
          "On plie mentalement le long de la droite proposée et on regarde le résultat.",
          `Ici, ${cas.pourquoi}.`,
          `${cas.bonne.charAt(0).toUpperCase() + cas.bonne.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_SYMETRIE_COMPLETER — rendre une figure symétrique
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_symetrie_completer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour compléter une figure et la rendre symétrique par rapport à un axe, que fait-on ?",
    format: "qcm",
    choices: [
      "on reporte chaque point de l'autre côté, à la même distance de l'axe",
      "on recopie la figure un peu plus loin",
      "on retourne la figure à l'envers",
      "on agrandit la figure",
    ],
    expected: ["on reporte chaque point de l'autre côté, à la même distance de l'axe"],
    comparator: "mcq_exact",
    hint: "Pense à un miroir posé sur l'axe.",
    explanation: exp(
      "Compléter une figure par symétrie, c'est construire son reflet : chaque point trouve son image de l'autre côté de l'axe, à la même distance.",
      "On traite les points un par un, en comptant les carreaux jusqu'à l'axe.",
      "Un point à 3 carreaux à gauche de l'axe a son image à 3 carreaux à droite, sur la même ligne. Recopier la figure plus loin donnerait un glissement, pas un reflet.",
      "On reporte chaque point à la même distance, de l'autre côté.",
    ),
    tags: ["ce2", "symetrie", "completer", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_symetrie_completer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Un point se trouve exactement SUR l'axe de symétrie. Où est son image ?",
    format: "qcm",
    choices: [
      "au même endroit : il ne bouge pas",
      "de l'autre côté de la figure",
      "il disparaît",
      "on ne peut pas le savoir",
    ],
    expected: ["au même endroit : il ne bouge pas"],
    comparator: "mcq_exact",
    hint: "Sa distance à l'axe vaut zéro. De l'autre côté, à zéro carreau, c'est où ?",
    explanation: exp(
      "L'image d'un point est de l'autre côté de l'axe, à la même distance.",
      "On mesure la distance du point à l'axe, puis on la reporte de l'autre côté.",
      "Un point posé sur l'axe est à zéro carreau de l'axe. De l'autre côté, à zéro carreau, on retombe exactement sur lui : il est sa propre image. C'est pour cela qu'en pliant, les points de l'axe ne bougent pas.",
      "Il reste au même endroit.",
    ),
    tags: ["ce2", "symetrie", "completer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_symetrie_completer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure est à 4 carreaux à gauche de l'axe. À combien de carreaux de l'axe se trouve son image ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Un reflet est toujours à la même distance du miroir.",
    explanation: exp(
      "Une figure et son image sont à la même distance de l'axe, de part et d'autre.",
      "On compte les carreaux d'un côté et on reporte le même nombre de l'autre.",
      "La figure est à 4 carreaux à gauche : son image est à 4 carreaux à droite. C'est ce qui fait qu'en pliant, les deux se recouvrent exactement.",
      "Elle est à 4 carreaux.",
    ),
    tags: ["ce2", "symetrie", "completer"],
  },
  {
    kind: "template",
    id: "ce2_symetrie_completer_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Même distance à l'axe, de l'autre côté.",
    tags: ["ce2", "symetrie", "completer", "template", "canvas"],
    generate: () => {
      const axeX = 5;
      const distance = randomInt(1, 4);
      const y0 = randomInt(1, 5);
      const source = [
        { x: axeX - distance, y: y0 },
        { x: axeX - distance, y: y0 + 2 },
        { x: axeX - distance - 1, y: y0 + 1 },
      ];
      return {
        text: `Cette figure est à ${distance} carreau${distance > 1 ? "x" : ""} de l'axe. À combien de carreaux de l'axe faut-il dessiner son image ?`,
        format: "short",
        expected: [String(distance)],
        comparator: "number_equal",
        explanation: exp(
          "Une figure et son image sont à la même distance de l'axe, chacune d'un côté.",
          "On compte les carreaux qui séparent la figure de l'axe, puis on reporte ce nombre de l'autre côté.",
          `La figure est à ${distance} carreau${distance > 1 ? "x" : ""} de l'axe : son image sera à ${distance} carreau${distance > 1 ? "x" : ""} de l'autre côté. En pliant, les deux se recouvriraient exactement.`,
          `À ${distance} carreau${distance > 1 ? "x" : ""}.`,
        ),
        canvas: symetrie({ source, axeX }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_symetrie_completer_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_completer",
    difficulty: 4,
    theme: "neutral",
    hint: "Le pliage doit faire coïncider les deux moitiés, sans dépassement.",
    tags: ["ce2", "symetrie", "completer", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          erreur: "recopié la figure plus loin, du même côté de l'axe",
          bonne: "il fallait la reporter de l'AUTRE côté de l'axe",
        },
        {
          erreur: "dessiné l'image de l'autre côté, mais deux carreaux plus loin que la figure",
          bonne: "il fallait la mettre à la MÊME distance de l'axe",
        },
        {
          erreur: "dessiné l'image de l'autre côté, mais une ligne plus haut",
          bonne: "il fallait rester sur la MÊME ligne",
        },
      ] as const);
      return {
        text: `Pour compléter une figure par symétrie, un élève a ${cas.erreur}. Qu'aurait-il fallu faire ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, [
          "il fallait la reporter de l'AUTRE côté de l'axe",
          "il fallait la mettre à la MÊME distance de l'axe",
          "il fallait rester sur la MÊME ligne",
          "il fallait agrandir la figure",
        ]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "L'image d'un point par symétrie est de l'autre côté de l'axe, à la même distance et sur la même ligne.",
          "On vérifie les trois conditions : le côté, la distance, la ligne.",
          `L'élève a ${cas.erreur} : une des trois conditions n'est pas respectée, et le pliage ne recouvre plus.`,
          `${cas.bonne.charAt(0).toUpperCase() + cas.bonne.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_SYMETRIE_CONSTRUIRE — le symétrique d'un point
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_symetrie_construire_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Un point A est à 3 carreaux à gauche d'un axe vertical. Où se trouve son symétrique ?",
    format: "qcm",
    choices: [
      "à 3 carreaux à droite de l'axe, sur la même ligne",
      "à 3 carreaux à gauche de l'axe, sur la même ligne",
      "à 3 carreaux à droite de l'axe, une ligne plus haut",
      "à 6 carreaux à droite de l'axe",
    ],
    expected: ["à 3 carreaux à droite de l'axe, sur la même ligne"],
    comparator: "mcq_exact",
    hint: "Comme dans un miroir : même distance, même hauteur, autre côté.",
    explanation: exp(
      "Le symétrique d'un point est de l'autre côté de l'axe, à la même distance et sur la même ligne.",
      "On compte les carreaux jusqu'à l'axe, puis on reporte le même nombre de l'autre côté sans changer de ligne.",
      "3 carreaux à gauche deviennent 3 carreaux à droite, à la même hauteur. Répondre 6, c'est avoir compté la distance entre les deux points au lieu de la distance à l'axe.",
      "À 3 carreaux à droite de l'axe, sur la même ligne.",
    ),
    tags: ["ce2", "symetrie", "construire", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_symetrie_construire_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Un point est à 2 carreaux d'un axe vertical. Quelle distance sépare ce point de son symétrique ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "2 carreaux d'un côté, 2 de l'autre.",
    explanation: exp(
      "Un point et son symétrique sont chacun à la même distance de l'axe, de part et d'autre.",
      "On additionne les deux distances : celle du point à l'axe, et celle de l'axe à l'image.",
      "2 + 2 = 4. Les deux points sont séparés de 4 carreaux, alors que chacun n'est qu'à 2 carreaux de l'axe. Confondre les deux est l'erreur la plus fréquente.",
      "Ils sont séparés de 4 carreaux.",
    ),
    tags: ["ce2", "symetrie", "construire", "piege"],
  },
  {
    kind: "fixed",
    id: "ce2_symetrie_construire_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Quand on construit le symétrique d'un point par rapport à un axe vertical, que devient sa hauteur sur le quadrillage ?",
    format: "qcm",
    choices: [
      "elle ne change pas",
      "elle double",
      "elle diminue de moitié",
      "elle devient zéro",
    ],
    expected: ["elle ne change pas"],
    comparator: "mcq_exact",
    hint: "Un miroir vertical renvoie la gauche à droite, pas le haut en bas.",
    explanation: exp(
      "Une symétrie d'axe vertical échange la gauche et la droite, sans toucher à la hauteur.",
      "On garde la même ligne et on ne change que la distance horizontale.",
      "Le point et son image sont sur la même ligne du quadrillage. C'est pour cela qu'en pliant la feuille le long de l'axe, ils se retrouvent l'un sur l'autre.",
      "Elle ne change pas.",
    ),
    tags: ["ce2", "symetrie", "construire", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_symetrie_construire_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les carreaux jusqu'à l'axe, puis reporte-les de l'autre côté.",
    tags: ["ce2", "symetrie", "construire", "template", "canvas"],
    generate: () => {
      const axeX = 5;
      const distance = randomInt(1, 4);
      const y = randomInt(1, 6);
      const source = { x: axeX - distance, y };
      const image = miroir(source, axeX);
      return {
        text: `Le point A est en (${source.x} ; ${source.y}) et l'axe est la droite verticale qui passe par ${axeX}. Où se trouve son symétrique ?`,
        format: "qcm",
        choices: makeChoices(`(${image.x} ; ${image.y})`, [
          `(${source.x} ; ${source.y})`,
          `(${image.x} ; ${image.y + 1})`,
          `(${axeX + 2 * distance} ; ${image.y})`,
          `(${image.y} ; ${image.x})`,
        ]),
        expected: [`(${image.x} ; ${image.y})`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le symétrique d'un point est de l'autre côté de l'axe, à la même distance et sur la même ligne.",
          "On compte les carreaux du point à l'axe, puis on reporte ce nombre de l'autre côté.",
          `A est à ${distance} carreau${distance > 1 ? "x" : ""} à gauche de l'axe. Son symétrique est donc à ${distance} carreau${distance > 1 ? "x" : ""} à droite, soit en (${image.x} ; ${image.y}). La hauteur, elle, ne change pas.`,
          `Le symétrique est en (${image.x} ; ${image.y}).`,
        ),
        canvas: symetrie({ source: [source], image: [image], axeX }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_symetrie_construire_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "Distance à l'axe, ou distance entre les deux points ? Ce n'est pas la même chose.",
    tags: ["ce2", "symetrie", "construire", "piege", "template"],
    generate: () => {
      const distance = randomInt(1, 6);
      const versEcart = randomChoice([true, false]);
      return versEcart
        ? {
            text: `Un point est à ${distance} carreau${distance > 1 ? "x" : ""} d'un axe. Quelle distance le sépare de son symétrique ?`,
            format: "short",
            expected: [String(2 * distance)],
            comparator: "number_equal",
            explanation: exp(
              "Un point et son symétrique sont chacun à la même distance de l'axe, de part et d'autre.",
              "On additionne les deux distances pour aller de l'un à l'autre.",
              `${distance} + ${distance} = ${2 * distance}. Les deux points sont séparés de ${2 * distance} carreaux, même si chacun n'est qu'à ${distance} de l'axe.`,
              `Ils sont séparés de ${2 * distance} carreaux.`,
            ),
          }
        : {
            text: `Un point et son symétrique sont séparés de ${2 * distance} carreaux. À quelle distance de l'axe se trouve chacun d'eux ?`,
            format: "short",
            expected: [String(distance)],
            comparator: "number_equal",
            explanation: exp(
              "L'axe passe exactement au milieu entre un point et son symétrique.",
              "On partage en deux la distance qui sépare les deux points.",
              `${2 * distance} ÷ 2 = ${distance}. Chacun est donc à ${distance} carreau${distance > 1 ? "x" : ""} de l'axe.`,
              `Chacun est à ${distance} carreau${distance > 1 ? "x" : ""}.`,
            ),
          };
    },
  },

  /* =========================================================
     CE2_SYMETRIE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_symetrie_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Léa dit qu'un carré et un rectangle ont le même nombre d'axes de symétrie, puisque tous deux ont quatre angles droits. A-t-elle raison ?",
    format: "qcm",
    choices: [
      "non : 4 pour le carré, 2 pour le rectangle",
      "oui, 4 pour les deux",
      "oui, 2 pour les deux",
      "non : 2 pour le carré, 4 pour le rectangle",
    ],
    expected: ["non : 4 pour le carré, 2 pour le rectangle"],
    comparator: "mcq_exact",
    hint: "Ce sont les CÔTÉS qui décident, pas les angles.",
    explanation: exp(
      "Le nombre d'axes de symétrie dépend des longueurs des côtés, pas seulement des angles.",
      "On essaie les quatre pliages sur chaque figure : les deux médianes, puis les deux diagonales.",
      "Le carré a ses quatre côtés égaux : ses deux diagonales sont des axes, ce qui fait 4 avec les médianes. Le rectangle n'a que ses côtés opposés égaux : ses diagonales ne referment pas la figure sur elle-même, il lui reste 2 axes.",
      "Non : 4 pour le carré, 2 pour le rectangle.",
    ),
    tags: ["ce2", "symetrie", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_symetrie_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une lettre majuscule est symétrique par rapport à un axe vertical : en la pliant verticalement en deux, les moitiés se superposent. Laquelle est-ce ?",
    format: "qcm",
    choices: ["A", "F", "L", "P"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "Plie chaque lettre en deux dans le sens de la hauteur.",
    explanation: exp(
      "Un axe de symétrie vertical partage la figure en deux moitiés qui se recouvrent quand on plie.",
      "On imagine un trait vertical au milieu de chaque lettre et on plie.",
      "Le A se referme parfaitement sur lui-même : sa moitié gauche recouvre sa moitié droite. Le F, le L et le P ont tout leur relief d'un seul côté : rien ne vient les recouvrir.",
      "C'est le A.",
    ),
    tags: ["ce2", "symetrie", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_symetrie_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les deux nombres d'axes.",
    tags: ["ce2", "symetrie", "defi", "template"],
    generate: () => {
      const [a, b] = shuffle(AXES).slice(0, 2);
      const gagnant = a.nb > b.nb ? a : b;
      const perdant = a.nb > b.nb ? b : a;
      const egaux = a.nb === b.nb;
      const bonne = egaux ? "les deux en ont autant" : gagnant.figure;
      return {
        text: `Laquelle de ces deux figures a le PLUS d'axes de symétrie : ${a.figure} ou ${b.figure} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          a.figure,
          b.figure,
          "les deux en ont autant",
          "aucune n'a d'axe de symétrie",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre d'axes de symétrie dépend des longueurs des côtés, pas du nombre d'angles droits.",
          "On compte les axes de chaque figure, puis on compare.",
          egaux
            ? `${a.figure.charAt(0).toUpperCase() + a.figure.slice(1)} en a ${a.nb} (${a.pourquoi}), et ${b.figure} aussi (${b.pourquoi}).`
            : `${gagnant.figure.charAt(0).toUpperCase() + gagnant.figure.slice(1)} en a ${gagnant.nb} : ${gagnant.pourquoi}. ${perdant.figure.charAt(0).toUpperCase() + perdant.figure.slice(1)} n'en a que ${perdant.nb} : ${perdant.pourquoi}.`,
          egaux ? "Les deux en ont autant." : `C'est ${gagnant.figure}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_symetrie_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "ce2_symetrie_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Reporte chaque point de l'autre côté, à la même distance et sur la même ligne.",
    tags: ["ce2", "symetrie", "defi", "template", "canvas"],
    generate: () => {
      const axeX = 5;
      const d1 = randomInt(1, 3);
      const d2 = d1 + randomInt(1, 2);
      const y1 = randomInt(1, 3);
      const source = [
        { x: axeX - d1, y: y1 },
        { x: axeX - d2, y: y1 + 2 },
      ];
      const image = source.map((p) => miroir(p, axeX));
      return {
        text: `Deux points sont à ${d1} et ${d2} carreaux à gauche de l'axe. Après symétrie, à combien de carreaux de l'axe se trouvent leurs images ?`,
        format: "qcm",
        choices: makeChoices(`à ${d1} et ${d2} carreaux, à droite`, [
          `à ${d2} et ${d1} carreaux, mais à gauche`,
          `à ${2 * d1} et ${2 * d2} carreaux, à droite`,
          `à ${d1 + d2} carreaux tous les deux`,
          `à ${d1} et ${d2} carreaux, à gauche`,
        ]),
        expected: [`à ${d1} et ${d2} carreaux, à droite`],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque point garde sa distance à l'axe : la symétrie ne rapproche ni n'éloigne, elle fait passer de l'autre côté.",
          "On traite les points un par un, en reportant chaque distance de l'autre côté.",
          `Le premier point est à ${d1} carreau${d1 > 1 ? "x" : ""} : son image est à ${d1} de l'autre côté. Le second est à ${d2} : son image est à ${d2}. Doubler les distances serait confondre « distance à l'axe » et « écart entre les deux points ».`,
          `À ${d1} et ${d2} carreaux, à droite.`,
        ),
        canvas: symetrie({ source, image, axeX }),
      };
    },
  },
];
