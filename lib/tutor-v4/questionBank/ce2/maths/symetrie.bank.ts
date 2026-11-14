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

import type { CanvasFigure, TransformationCanvasData, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { cap, melange, qcm, qcmN, un } from "../../cm1/maths/trous-outils";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return melangeEnPlace([...items]);
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

const symetrieBase: TutorBankItemV4[] = [
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
    text: "Une figure est à 4 carreaux à gauche de l'axe. Son image est à combien de carreaux ?",
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
          erreur: "recopié la figure plus loin, du même côté",
          bonne: "il fallait la reporter de l'AUTRE côté de l'axe",
        },
        {
          erreur: "mis l'image de l'autre côté, deux carreaux trop loin",
          bonne: "il fallait la mettre à la MÊME distance de l'axe",
        },
        {
          erreur: "mis l'image de l'autre côté, une ligne trop haut",
          bonne: "il fallait rester sur la MÊME ligne",
        },
      ] as const);
      return {
        text: `Pour compléter par symétrie, un élève a ${cas.erreur}. Que fallait-il faire ?`,
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
    text: "On construit le symétrique d'un point par rapport à un axe vertical. Que devient sa hauteur ?",
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
            text: `Entre un point et son symétrique : ${2 * distance} carreaux. À quelle distance de l'axe est chacun ?`,
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
    text: "Léa : « Carré et rectangle ont autant d'axes de symétrie : ils ont quatre angles droits. » A-t-elle raison ?",
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
    text: "Quelle lettre a un axe de symétrie vertical : pliée de haut en bas, ses moitiés se superposent ?",
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
        text: `Lequel a le PLUS d'axes de symétrie : ${a.figure} ou ${b.figure} ?`,
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
        text: `Deux points sont à ${d1} et ${d2} carreaux à gauche de l'axe. Où sont leurs images ?`,
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

/* ═════════════════════════════════════════════════════════════════════════
   LES GÉNÉRATEURS RICHES (10/11/2026) — robustesse du coach du cycle 2.

   Mesuré le 10/11 : 7 à 15 squelettes par micro, 8 à 18 répétitions sur 20.
   Chaque gabarit tire désormais une FIGURE (une lettre, la moitié d'un sapin,
   d'une fusée, d'un papillon, un rectangle et son pli) × une TOURNURE × une
   situation à partir de ★3. L'ancien générateur reste servi une fois sur sept.
   ⛔ Le dessin ne donne JAMAIS la réponse : quand on demande où va l'image,
   on ne la dessine pas (l'ancien `construire_tpl_1` la dessinait, il est donc
   remplacé en entier) ; quand on demande si un trait est un axe, il n'est pas
   étiqueté « axe » ; quand on demande si la partie rouge est le symétrique,
   rien ne l'appelle « symétrique ».
═════════════════════════════════════════════════════════════════════════ */

type Gen = TutorGeneratedQuestionV4;
type Pt = { x: number; y: number };

const TROUPE = [
  "Nina", "Téo", "Zoé", "Ravi", "Pic",
  "Lou", "Malo", "Inès", "Sacha", "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis",
] as const;
const qui = () => un(TROUPE);

const OUI = "oui, les deux moitiés se superposent";
const NON = "non, les deux moitiés ne se superposent pas";
const ouiNon = (oui: boolean) => qcm(oui ? OUI : NON, [OUI, NON]);

function grille(
  source: Pt[],
  axis: TransformationCanvasData["axis"],
  extra: Partial<TransformationCanvasData> = {},
  rows = 7,
): TransformationCanvasData {
  return {
    kind: "transformation",
    transformation: "symetrie_axiale",
    grid: { rows, cols: 10 },
    // Fond presque transparent : un aplat plein cachait l'axe qui traverse la figure (vu au rendu le 10/11).
    source: { points: source, color: "#2563eb", fill: "rgba(37, 99, 235, 0.10)" },
    axis,
    display: { showGrid: true, showLabels: false, showPoints: false, showDashedLinks: true },
    ...extra,
  };
}

/* ─── 1. Les lettres capitales, dessinées en bâton sur le quadrillage ─── */
const LETTRES_DESSIN = [
  { l: "T", w: 4, v: true, h: false, pts: [[0, 0], [4, 0], [4, 1], [3, 1], [3, 5], [1, 5], [1, 1], [0, 1]] },
  { l: "H", w: 4, v: true, h: true, pts: [[0, 0], [1, 0], [1, 2], [3, 2], [3, 0], [4, 0], [4, 5], [3, 5], [3, 3], [1, 3], [1, 5], [0, 5]] },
  { l: "U", w: 4, v: true, h: false, pts: [[0, 0], [1, 0], [1, 4], [3, 4], [3, 0], [4, 0], [4, 5], [0, 5]] },
  { l: "C", w: 3, v: false, h: true, pts: [[0, 0], [3, 0], [3, 1], [1, 1], [1, 4], [3, 4], [3, 5], [0, 5]] },
  { l: "E", w: 3, v: false, h: true, pts: [[0, 0], [3, 0], [3, 1], [1, 1], [1, 2], [2, 2], [2, 3], [1, 3], [1, 4], [3, 4], [3, 5], [0, 5]] },
  { l: "L", w: 3, v: false, h: false, pts: [[0, 0], [1, 0], [1, 4], [3, 4], [3, 5], [0, 5]] },
  { l: "F", w: 3, v: false, h: false, pts: [[0, 0], [3, 0], [3, 1], [1, 1], [1, 2], [2, 2], [2, 3], [1, 3], [1, 5], [0, 5]] },
  { l: "I", w: 3, v: true, h: true, pts: [[0, 0], [3, 0], [3, 1], [2, 1], [2, 4], [3, 4], [3, 5], [0, 5], [0, 4], [1, 4], [1, 1], [0, 1]] },
] as const;

function lettreDessinee(ctx: boolean): Gen {
  const L = un(LETTRES_DESSIN);
  const x0 = 3;
  const y0 = 1;
  const cx = x0 + L.w / 2;
  const cy = y0 + 2.5;
  const cas = un(["vc", "hc", "vd", "hd", "vc", "hc"] as const);
  const axis: TransformationCanvasData["axis"] =
    cas === "vc" ? { type: "vertical", x: cx }
    : cas === "hc" ? { type: "horizontal", y: cy }
    : cas === "vd" ? { type: "vertical", x: cx + un([-1, 1]) }
    : { type: "horizontal", y: cy + un([-1, 1]) };
  const oui = (cas === "vc" && L.v) || (cas === "hc" && L.h);
  const sens = cas[0] === "v" ? "vertical" : "horizontal";
  const P = qui();
  return {
    text: [
      ctx
        ? un([`${P} a découpé la lettre ${L.l} en carton.`, `${P} plie la lettre ${L.l}.`, `Pour une affiche, ${P} dessine la lettre ${L.l}.`])
        : un([`Voici la lettre ${L.l}.`, `Regarde la lettre ${L.l}.`, `La lettre ${L.l} est dessinée.`]),
      un([
        `Le trait vert ${sens} est-il un axe de symétrie ?`,
        "En pliant le long du trait vert, les moitiés se superposent-elles ?",
        "Ce trait vert est-il un axe de symétrie de la lettre ?",
      ]),
    ].join(" "),
    ...ouiNon(oui),
    explanation: exp(
      "Un axe de symétrie partage la figure en deux moitiés qui se superposent quand on plie.",
      "On imagine le pliage le long du trait : chaque morceau doit tomber exactement sur un morceau de l'autre côté.",
      oui
        ? `Le trait passe au milieu de la lettre ${L.l} et ses deux moitiés sont pareilles, retournées : elles se superposent.`
        : cas === "vd" || cas === "hd"
          ? `Le trait ne passe pas au milieu de la lettre ${L.l} : une moitié est plus grosse que l'autre.`
          : `Les deux moitiés de la lettre ${L.l} ne sont pas pareilles : en pliant, elles dépassent.`,
      oui ? "Oui, c'est un axe de symétrie." : "Non, ce n'est pas un axe de symétrie.",
    ),
    canvas: grille(L.pts.map(([x, y]) => ({ x: x0 + x, y: y0 + y })), axis),
  };
}

/* ─── 2. Les lettres en mots (capitales d'imprimerie) ─── */
const AXE_VERTICAL = ["A", "H", "I", "M", "O", "T", "U", "V", "W", "X", "Y"];
const AXE_HORIZONTAL = ["B", "C", "D", "E", "H", "I", "K", "O", "X"];
const SANS_AXE = ["F", "G", "J", "L", "N", "P", "R", "S", "Z"];
function lettreEnMots(deux: boolean): Gen {
  if (deux) {
    const juste = un(["H", "I", "O", "X"]);
    const faux = melange(["A", "T", "U", "V", "M", "B", "C", "D", "E"]).slice(0, 3);
    return {
      text: un([
        "Laquelle de ces lettres a DEUX axes de symétrie ?",
        "Quelle lettre peut se plier en deux de haut en bas ET de gauche à droite ?",
        `${qui()} cherche une lettre avec deux axes de symétrie. Laquelle ?`,
      ]),
      ...qcm(juste, faux),
      explanation: exp(
        "Une lettre peut avoir un axe vertical, un axe horizontal, les deux, ou aucun.",
        "On essaie les deux pliages : de haut en bas, puis de gauche à droite.",
        `${juste} se superpose dans les deux pliages. ${faux.join(", ")} n'ont qu'un seul axe.`,
        `C'est ${juste}.`,
      ),
    };
  }
  const vertical = Math.random() < 0.6;
  const juste = un(vertical ? AXE_VERTICAL : AXE_HORIZONTAL);
  const faux = melange(vertical ? [...SANS_AXE, "B", "C", "D", "E", "K"] : [...SANS_AXE, "A", "T", "U", "V", "M"]).slice(0, 3);
  const sens = vertical ? "vertical" : "horizontal";
  return {
    text: un([
      `Laquelle de ces lettres capitales a un axe de symétrie ${sens} ?`,
      vertical
        ? "Quelle lettre se plie en deux, la gauche sur la droite, sans dépasser ?"
        : "Quelle lettre se plie en deux, le haut sur le bas, sans dépasser ?",
      `${qui()} écrit son nom en capitales. Quelle lettre a un axe de symétrie ${sens} ?`,
    ]),
    ...qcm(juste, faux),
    explanation: exp(
      `Un axe ${sens} partage la lettre en deux moitiés ${vertical ? "gauche et droite" : "du haut et du bas"} qui se superposent.`,
      "On imagine qu'on plie la lettre le long de cet axe.",
      `${juste} se superpose. ${faux.join(", ")} dépassent quand on les plie ainsi.`,
      `C'est ${juste}.`,
    ),
  };
}

/* ─── 3. Combien d'axes ? (les figures usuelles, sans les axes dessinés) ─── */
const FIGURES = [
  {
    nom: "ce carré", Nom: "Ce carré", nb: 4, pourquoi: "les deux médianes et les deux diagonales",
    canvas: (): CanvasFigure => ({
      kind: "quadrilatere",
      points: { A: { x: 90, y: 40 }, B: { x: 230, y: 40 }, C: { x: 230, y: 180 }, D: { x: 90, y: 180 } },
      display: { showPoints: false, showLabels: false, showSides: true },
      marks: { rightAnglesAt: ["A", "B", "C", "D"], equalSides: [["AB", "BC"], ["CD", "DA"]] },
    }),
  },
  {
    nom: "ce rectangle", Nom: "Ce rectangle", nb: 2, pourquoi: "les deux médianes seulement, pas les diagonales",
    canvas: (): CanvasFigure => ({
      kind: "quadrilatere",
      points: { A: { x: 50, y: 60 }, B: { x: 270, y: 60 }, C: { x: 270, y: 170 }, D: { x: 50, y: 170 } },
      display: { showPoints: false, showLabels: false, showSides: true },
      marks: { rightAnglesAt: ["A", "B", "C", "D"] },
    }),
  },
  {
    nom: "ce losange", Nom: "Ce losange", nb: 2, pourquoi: "ses deux diagonales",
    canvas: (): CanvasFigure => ({
      kind: "quadrilatere",
      points: { A: { x: 160, y: 20 }, B: { x: 230, y: 110 }, C: { x: 160, y: 200 }, D: { x: 90, y: 110 } },
      display: { showPoints: false, showLabels: false, showSides: true },
      marks: { equalSides: [["AB", "BC"], ["CD", "DA"]] },
    }),
  },
  {
    nom: "ce triangle équilatéral", Nom: "Ce triangle équilatéral", nb: 3, pourquoi: "une par sommet",
    canvas: (): CanvasFigure => ({
      kind: "triangle",
      points: { A: { x: 70, y: 190 }, B: { x: 250, y: 190 }, C: { x: 160, y: 34 } },
      display: { showPoints: false, showLabels: false, showSides: true },
      marks: { equalSides: [["AB", "BC"], ["BC", "CA"]] },
    }),
  },
] as const;

function combienAxes(ctx: boolean): Gen {
  const f = un(FIGURES);
  const P = qui();
  return {
    text: ctx
      ? un([
          `${P} plie ${f.nom} en papier de toutes les façons. Combien d'axes de symétrie trouve-t-${P === "Pic" ? "il" : "on"} ?`,
          `${P} cherche tous les plis qui marchent pour ${f.nom}. Combien d'axes de symétrie a-t-il ?`,
        ])
      : un([`Combien d'axes de symétrie a ${f.nom} ?`, `${f.Nom} : combien a-t-il d'axes de symétrie ?`, `Regarde ${f.nom}. Combien a-t-il d'axes de symétrie ?`]),
    ...qcmN(f.nb, [4, 2, 3, 1, 0].filter((n) => n !== f.nb)),
    explanation: exp(
      "Un axe de symétrie est un pli qui superpose les deux moitiés.",
      "On essaie chaque pli possible : par le milieu des côtés, par les sommets.",
      `${f.Nom} en a ${f.nb} : ${f.pourquoi}.`,
      `Il a ${f.nb} axes de symétrie.`,
    ),
    canvas: f.canvas(),
  };
}

/* ─── 4. Une figure au hasard : symétrique ou presque ─── */
function figureHasard(): { pts: Pt[]; sym: boolean } {
  const ys = melange([2, 3, 4, 5]).slice(0, un([2, 3])).sort();
  const prof: Array<[number, number]> = [[un([0, 1, 2]), 1], ...ys.map((y): [number, number] => [un([1, 2, 3]), y]), [un([0, 1, 2]), 6]];
  const X = 5;
  const droite = prof.map(([dx, y]) => ({ x: X + dx, y }));
  const gauche = [...prof].reverse().map(([dx, y]) => ({ x: X - dx, y }));
  const sym = Math.random() < 0.5;
  if (!sym) {
    // On déplace d'un carreau un point de gauche qui n'est ni en haut ni en bas.
    const i = 1 + Math.floor(Math.random() * ys.length);
    const p = gauche[i];
    const dx = X - p.x;
    gauche[i] = { x: X - (dx === 3 ? 2 : dx + 1), y: p.y };
  }
  const pts = [...droite, ...gauche].filter((p, i, a) => i === 0 || p.x !== a[i - 1].x || p.y !== a[i - 1].y);
  return { pts, sym };
}

function figureEtAxe(): Gen {
  const { pts, sym } = figureHasard();
  const P = qui();
  return {
    text: [
      un([
        `${P} a découpé cette forme dans du papier.`,
        `${P} plie son dessin le long du trait vert.`,
        `Pour une guirlande, ${P} découpe cette forme.`,
        `${P} fait un pliage à l'atelier.`,
        "La maîtresse dessine cette figure au tableau.",
        "Ti Margo a dessiné cette figure.",
      ]),
      un([
        "Le trait vert est-il un axe de symétrie ?",
        "Les deux moitiés se superposent-elles exactement ?",
        "Ce trait coupe-t-il la figure en deux moitiés pareilles ?",
      ]),
    ].join(" "),
    ...ouiNon(sym),
    explanation: exp(
      "Un axe de symétrie partage la figure en deux moitiés qui se superposent quand on plie.",
      "On compare chaque coin de gauche à son coin de droite : même ligne, même distance du trait.",
      sym
        ? "Chaque coin de gauche a son jumeau à droite, sur la même ligne et à la même distance du trait."
        : "Un coin de gauche n'est pas à la même distance du trait que son jumeau de droite : en pliant, il dépasse.",
      sym ? "Oui, c'est un axe de symétrie." : "Non, ce n'est pas un axe de symétrie.",
    ),
    canvas: grille(pts, { type: "vertical", x: 5 }, {}, 7),
  };
}

/* ─── 5. Le pli du rectangle, du carré, du losange ─── */
const QUADS = [
  {
    nom: "rectangle", objets: ["une serviette rectangulaire", "une carte postale", "un drapeau", "une feuille de papier"],
    pts: [{ x: 2, y: 1 }, { x: 8, y: 1 }, { x: 8, y: 5 }, { x: 2, y: 5 }],
    plis: [
      { axe: { type: "vertical", x: 5 }, oui: true, quoi: "par le milieu de deux côtés" },
      { axe: { type: "horizontal", y: 3 }, oui: true, quoi: "par le milieu de deux côtés" },
      { axe: { type: "line", from: { x: 2, y: 1 }, to: { x: 8, y: 5 } }, oui: false, quoi: "par une diagonale : les coins ne tombent pas l'un sur l'autre" },
      { axe: { type: "line", from: { x: 8, y: 1 }, to: { x: 2, y: 5 } }, oui: false, quoi: "par une diagonale : les coins ne tombent pas l'un sur l'autre" },
    ],
  },
  {
    nom: "carré", objets: ["un mouchoir carré", "une serviette carrée", "un papier d'origami carré"],
    pts: [{ x: 3, y: 1 }, { x: 7, y: 1 }, { x: 7, y: 5 }, { x: 3, y: 5 }],
    plis: [
      { axe: { type: "line", from: { x: 3, y: 1 }, to: { x: 7, y: 5 } }, oui: true, quoi: "par une diagonale : dans un carré, elle marche" },
      { axe: { type: "vertical", x: 5 }, oui: true, quoi: "par le milieu de deux côtés" },
      { axe: { type: "vertical", x: 4 }, oui: false, quoi: "à côté du milieu : une moitié est plus large" },
      { axe: { type: "horizontal", y: 2 }, oui: false, quoi: "à côté du milieu : une moitié est plus haute" },
    ],
  },
  {
    nom: "losange", objets: ["un cerf-volant en losange", "une étiquette en losange"],
    pts: [{ x: 5, y: 0 }, { x: 7, y: 3 }, { x: 5, y: 6 }, { x: 3, y: 3 }],
    plis: [
      { axe: { type: "vertical", x: 5 }, oui: true, quoi: "par une diagonale : dans un losange, elle marche" },
      { axe: { type: "horizontal", y: 3 }, oui: true, quoi: "par une diagonale : dans un losange, elle marche" },
      { axe: { type: "line", from: { x: 6, y: 1.5 }, to: { x: 4, y: 4.5 } }, oui: false, quoi: "par le milieu de deux côtés : dans un losange, ce pli ne marche pas" },
      { axe: { type: "vertical", x: 4 }, oui: false, quoi: "à côté du milieu : une moitié est plus large" },
    ],
  },
] as const;

function pliQuadrilatere(ctx: boolean, piege = false): Gen {
  const q = piege ? QUADS[0] : un(QUADS);
  const plis: readonly (typeof q.plis)[number][] = q.plis;
  const pli = piege ? un([plis[2], plis[3], plis[0]]) : un(plis);
  const P = qui();
  const o = un(q.objets);
  return {
    text: ctx
      ? `${P} plie ${o} le long du trait vert. ${un(["Les deux moitiés se superposent-elles ?", "Ce pli est-il un axe de symétrie ?", "Les bords tombent-ils pile l'un sur l'autre ?"])}`
      : `Voici un ${q.nom}. ${un(["Le trait vert est-il un axe de symétrie ?", "En pliant le long du trait vert, les moitiés se superposent-elles ?"])}`,
    ...ouiNon(pli.oui),
    explanation: exp(
      "Un axe de symétrie est un pli qui superpose les deux moitiés, sans dépasser.",
      "On imagine le pliage et on regarde où tombent les coins.",
      `Ici on plie le ${q.nom} ${pli.quoi}.`,
      pli.oui ? "Oui, c'est un axe de symétrie." : "Non, ce n'est pas un axe de symétrie.",
    ),
    canvas: grille([...q.pts], pli.axe as TransformationCanvasData["axis"]),
  };
}

function axeRiche(d: number): Gen {
  const r = Math.random();
  if (d <= 2) {
    if (r < 0.45) return lettreDessinee(false);
    if (r < 0.75) return combienAxes(false);
    if (r < 0.9) return pliQuadrilatere(false);
    return lettreEnMots(false);
  }
  if (r < 0.3) return figureEtAxe();
  if (r < 0.6) return pliQuadrilatere(true, d >= 5 && Math.random() < 0.5);
  if (r < 0.75) return lettreDessinee(true);
  if (r < 0.9) return combienAxes(true);
  return lettreEnMots(d >= 5);
}

/* ─── 6. Compléter : la moitié d'un objet contre l'axe ─── */
const MOITIES = [
  { le: "le sapin", du: "du sapin", un: "un sapin", f: false, prof: [[0, 0], [2, 2], [1, 2], [3, 4], [1, 4], [1, 6], [0, 6]] },
  { le: "la maison", du: "de la maison", un: "une maison", f: true, prof: [[0, 0], [3, 2], [2, 2], [2, 6], [0, 6]] },
  { le: "la fusée", du: "de la fusée", un: "une fusée", f: true, prof: [[0, 0], [1, 1], [1, 4], [2, 5], [2, 6], [0, 6]] },
  { le: "la tour", du: "de la tour", un: "une tour", f: true, prof: [[0, 0], [1, 0], [1, 1], [2, 1], [2, 0], [3, 0], [3, 6], [0, 6]] },
  { le: "le vase", du: "du vase", un: "un vase", f: false, prof: [[0, 0], [2, 0], [1, 1], [1, 2], [3, 4], [2, 6], [0, 6]] },
  { le: "la flèche", du: "de la flèche", un: "une flèche", f: true, prof: [[0, 0], [3, 3], [1, 3], [1, 6], [0, 6]] },
  { le: "la couronne", du: "de la couronne", un: "une couronne", f: true, prof: [[0, 1], [1, 3], [3, 0], [3, 6], [0, 6]] },
  { le: "le papillon", du: "du papillon", un: "un papillon", f: false, prof: [[0, 1], [2, 0], [3, 1], [2, 3], [3, 5], [2, 6], [0, 5]] },
  { le: "le cœur", du: "du cœur", un: "un cœur", f: false, prof: [[0, 1], [1, 0], [2, 0], [3, 1], [3, 2], [0, 5]] },
] as const;
type Moitie = (typeof MOITIES)[number];
const AXE_X = 5;
const HAUT = 1;

/** La moitié dessinée, à gauche ou à droite de l'axe (le signe dit le côté). */
const demi = (m: Moitie, cote: 1 | -1, decale = 0, monte = 0): Pt[] =>
  m.prof.map(([dx, y]) => ({ x: AXE_X + cote * (dx + decale), y: HAUT + y + monte }));
const largeur = (m: Moitie) => Math.max(...m.prof.map(([dx]) => dx));

function completerDistance(ctx: boolean): Gen {
  const m = un(MOITIES);
  const cote = un([1, -1] as const);
  const ext = cote === -1 ? "gauche" : "droite";
  const w = largeur(m);
  const P = qui();
  return {
    text: [
      ctx
        ? un([`${P} complète ${m.le}.`, `${P} finit ${m.le}.`])
        : un([`Voici la moitié ${m.du}.`, `Voici une moitié ${m.du}.`]),
      un([
        `L'image du point le plus à ${ext} sera à combien de carreaux de l'axe ?`,
        `À combien de carreaux de l'axe va l'image du point le plus à ${ext} ?`,
      ]),
    ].join(" "),
    ...qcmN(w, [w - 1, w + 1, 2 * w]),
    explanation: exp(
      "Le symétrique d'un point est de l'autre côté de l'axe, sur la même ligne, à la même distance.",
      "On compte les carreaux entre le point et l'axe, puis on reporte ce nombre de l'autre côté.",
      `Le point le plus à ${ext} est à ${w} carreaux de l'axe : son image aussi.`,
      `À ${w} carreaux de l'axe.`,
    ),
    canvas: grille(demi(m, cote), { type: "vertical", x: AXE_X, label: "axe" }, {}, 8),
  };
}

function completerLargeur(): Gen {
  const m = un(MOITIES);
  const cote = un([1, -1] as const);
  const w = largeur(m);
  const P = qui();
  return {
    text: [
      un([`${P} va compléter ${m.le} par symétrie.`, `Voici la moitié ${m.du}.`, `${P} a peint la moitié ${m.du}.`]),
      un([
        `${cap(m.le)} ${m.f ? "complète" : "complet"} fera combien de carreaux de large ?`,
        `Combien de carreaux de large aura ${m.le} ${m.f ? "entière" : "entier"} ?`,
      ]),
    ].join(" "),
    ...qcmN(2 * w, [w, 2 * w + 1, 2 * w - 1, w + 1]),
    explanation: exp(
      "Les deux moitiés d'une figure symétrique sont pareilles : chacune a la même largeur.",
      "On compte la largeur de la moitié dessinée, puis on la double.",
      `La moitié fait ${w} carreaux de large : ${w} + ${w} = ${2 * w}.`,
      `${cap(m.le)} mesurera ${2 * w} carreaux de large.`,
    ),
    canvas: grille(demi(m, cote), { type: "vertical", x: AXE_X, label: "axe" }, {}, 8),
  };
}

const BIEN = "oui, c'est bien le symétrique";
const GLISSE = "non : la moitié est glissée, pas retournée";
const LOIN = "non : elle est trop loin de l'axe";
const HAUTEUR = "non : elle n'est pas à la même hauteur";

function completerJuger(d: number): Gen {
  const m = un(MOITIES);
  const cote = un([1, -1] as const);
  const w = largeur(m);
  const cas = un(d >= 4 ? [BIEN, BIEN, GLISSE, LOIN, HAUTEUR] : [BIEN, BIEN, GLISSE, LOIN]);
  const image =
    cas === BIEN ? demi(m, (-cote) as 1 | -1)
    : cas === LOIN ? demi(m, (-cote) as 1 | -1, 1)
    : cas === HAUTEUR ? demi(m, (-cote) as 1 | -1, 0, 1)
    : m.prof.map(([dx, y]) => ({ x: AXE_X + cote * dx - cote * w, y: HAUT + y }));
  const P = qui();
  const explications: Record<string, string> = {
    [BIEN]: "Chaque point rouge est en face de son point bleu, sur la même ligne, à la même distance de l'axe.",
    [GLISSE]: "La partie rouge est la même que la bleue, simplement poussée de côté : elle n'est pas retournée comme dans un miroir.",
    [LOIN]: "La partie rouge est retournée, mais chaque point est un carreau trop loin de l'axe.",
    [HAUTEUR]: "La partie rouge est retournée, mais elle est descendue d'un carreau : les points ne sont plus sur la même ligne.",
  };
  return {
    text: [
      un([`${P} complète la moitié ${m.du}.`, `${P} a fini son dessin ${m.du}.`, `${P} dessine ${m.un} symétrique.`, `${P} a colorié l'autre moitié en rouge.`]),
      un(["La partie rouge est-elle bien le symétrique de la bleue ?", "Le dessin est-il juste ?", "La partie rouge est-elle bien placée ?"]),
    ].join(" "),
    ...qcm(cas, d >= 4 ? [BIEN, GLISSE, LOIN, HAUTEUR] : [BIEN, GLISSE, LOIN]),
    explanation: exp(
      "Pour compléter par symétrie, on retourne la moitié comme dans un miroir : même ligne, même distance de l'axe.",
      "On suit chaque pointillé d'un point bleu à son point rouge et on compte les carreaux de chaque côté de l'axe.",
      explications[cas],
      cas === BIEN ? "Le dessin est juste." : "Le dessin n'est pas juste.",
    ),
    canvas: grille(demi(m, cote), { type: "vertical", x: AXE_X }, { image: { points: image, color: "#dc2626", fill: "rgba(220, 38, 38, 0.12)" } }, 9),
  };
}

function completerSurAxe(): Gen {
  const m = un(MOITIES.filter((x) => x.prof[0][0] === 0));
  const P = qui();
  const juste = "au même endroit : il ne bouge pas";
  return {
    text: `${un([`${P} complète ${m.le}.`, `Voici la moitié ${m.du}.`])} Le point tout en haut est posé sur l'axe. ${un(["Où sera son image ?", "Où faut-il dessiner son symétrique ?"])}`,
    ...qcm(juste, ["à 1 carreau de l'autre côté de l'axe", "à 2 carreaux de l'autre côté de l'axe", "tout en bas de l'axe"]),
    explanation: exp(
      "Le symétrique d'un point est à la même distance de l'axe, de l'autre côté.",
      "On mesure la distance entre le point et l'axe.",
      "Le point est SUR l'axe : sa distance à l'axe vaut zéro. Son image est donc lui-même.",
      "Il ne bouge pas.",
    ),
    canvas: grille(demi(m, un([1, -1] as const)), { type: "vertical", x: AXE_X, label: "axe" }, {}, 8),
  };
}

function completerRiche(d: number): Gen {
  const r = Math.random();
  if (d <= 2) return r < 0.65 ? completerDistance(false) : completerJuger(2);
  if (d === 3) return r < 0.4 ? completerDistance(true) : r < 0.85 ? completerJuger(3) : completerLargeur();
  if (r < 0.45) return completerJuger(4);
  if (r < 0.75) return completerLargeur();
  if (r < 0.9) return completerDistance(true);
  return completerSurAxe();
}

/* ─── 7. Construire : le symétrique d'un point sur le quadrillage ─── */
const PAS = 40;
const NOMS = ["B", "C", "D", "E"];

function pointsDroites(axe: "v" | "h", A: [number, number], cands: Array<[number, number]>): CanvasFigure {
  const ligne =
    axe === "v"
      ? { id: "axe", type: "droite" as const, from: { x: 4 * PAS, y: 0 }, to: { x: 4 * PAS, y: 6 * PAS }, color: "#16a34a", dashed: true, strokeWidth: 3 }
      : { id: "axe", type: "droite" as const, from: { x: 0, y: 3 * PAS }, to: { x: 8 * PAS, y: 3 * PAS }, color: "#16a34a", dashed: true, strokeWidth: 3 };
  return {
    kind: "droites",
    size: { width: 8 * PAS, height: 6 * PAS },
    grid: { show: true, cols: 8, rows: 6 },
    lines: [ligne],
    points: [
      { x: A[0] * PAS, y: A[1] * PAS, label: "A", color: "#2563eb" },
      ...cands.map(([c, r], i) => ({ x: c * PAS, y: r * PAS, label: NOMS[i], color: "#f59e0b" })),
    ],
    display: { showGrid: true, showLabels: true, showPoints: true, showIntersections: false },
  };
}

function symetriquePoint(ctx: boolean, d: number): Gen {
  const axe: "v" | "h" = d >= 4 && Math.random() < 0.5 ? "h" : Math.random() < 0.8 ? "v" : "h";
  let A: [number, number];
  let img: [number, number];
  const leurres: Array<[number, number]> = [];
  if (axe === "v") {
    A = [un([1, 2, 3, 5, 6, 7]), un([1, 2, 3, 4, 5])];
    img = [8 - A[0], A[1]];
    leurres.push([img[0] + (img[0] > 4 ? 1 : -1), A[1]], [img[0] - (img[0] > 4 ? 1 : -1), A[1]], [img[0], A[1] + 1], [img[0], A[1] - 1], [A[0] + (A[0] < 4 ? 4 : -4), A[1]]);
  } else {
    A = [un([1, 2, 3, 4, 5, 6, 7]), un([1, 2, 4, 5])];
    img = [A[0], 6 - A[1]];
    leurres.push([A[0], img[1] + (img[1] > 3 ? 1 : -1)], [A[0], img[1] - (img[1] > 3 ? 1 : -1)], [A[0] + 1, img[1]], [A[0] - 1, img[1]]);
  }
  const ok = (p: [number, number]) =>
    p[0] >= 1 && p[0] <= 7 && p[1] >= 1 && p[1] <= 5 && !(p[0] === A[0] && p[1] === A[1]) && !(p[0] === img[0] && p[1] === img[1]) &&
    (axe === "v" ? p[0] !== 4 : p[1] !== 3);
  const uniques = leurres.filter(ok).filter((p, i, a) => a.findIndex((q) => q[0] === p[0] && q[1] === p[1]) === i);
  const faux = melange(uniques).slice(0, 3);
  const cands = melange([img, ...faux]);
  const lettre = NOMS[cands.indexOf(img)];
  const P = qui();
  const juste = `le point ${lettre}`;
  const lac = axe === "h" && ctx && Math.random() < 0.4;
  return {
    text: lac
      ? `Le bord du lac est l'axe vert. ${P} se tient au point A. ${un(["Où est son reflet ?", "Sur quel point voit-on son reflet ?"])}`
      : [
        ctx
          ? un([
              `${P} a posé un jeton sur le point A.`,
              "Pic est perché sur le point A.",
              `${P} a marqué le point A.`,
              `${P} a caché un trésor au point A.`,
              `Le jardinier plante une fleur au point A.`,
            ])
          : un(["Voici le point A et un axe vert.", "Regarde le point A et l'axe vert."]),
        un(["Quel point est le symétrique de A ?", "Lequel de ces points est l'image de A ?", "En pliant le long de l'axe vert, où tombe A ?"]),
      ].join(" "),
    ...qcm(juste, cands.map((_, i) => `le point ${NOMS[i]}`)),
    explanation: exp(
      "Le symétrique d'un point est de l'autre côté de l'axe, sur la même ligne droite qui le traverse, à la même distance.",
      "On compte les carreaux entre A et l'axe, puis le même nombre de carreaux de l'autre côté, sans changer de ligne.",
      `A est à ${axe === "v" ? Math.abs(A[0] - 4) : Math.abs(A[1] - 3)} carreaux de l'axe. Le point ${lettre} aussi, en face de A : c'est son symétrique.`,
      `C'est ${juste}.`,
    ),
    canvas: pointsDroites(axe, A, cands),
  };
}

function distancePoint(): Gen {
  const axe: "v" | "h" = Math.random() < 0.5 ? "v" : "h";
  const A: [number, number] = axe === "v" ? [un([1, 2, 3, 5, 6, 7]), un([1, 2, 3, 4, 5])] : [un([1, 2, 3, 5, 6, 7]), un([1, 2, 4, 5])];
  const dist = axe === "v" ? Math.abs(A[0] - 4) : Math.abs(A[1] - 3);
  const P = qui();
  const inverse = Math.random() < 0.3;
  if (inverse) {
    return {
      text: `Entre A et son symétrique : ${2 * dist} carreaux. À combien de carreaux de l'axe est A ?`,
      ...qcmN(dist, [2 * dist, dist + 1, 4 * dist]),
      explanation: exp(
        "Un point et son symétrique sont à la même distance de l'axe, chacun d'un côté.",
        "L'écart total se partage en deux moitiés égales.",
        `${2 * dist} carreaux, c'est ${dist} + ${dist} : chacun est à ${dist} carreaux de l'axe.`,
        `À ${dist} carreaux.`,
      ),
      canvas: pointsDroites(axe, A, []),
    };
  }
  return {
    text: `${un([`${P} a marqué le point A.`, "Pic est sur le point A.", "Regarde le point A et l'axe vert."])} ${un([
      "Combien de carreaux séparent A de son symétrique ?",
      "Quelle distance, en carreaux, y a-t-il entre A et son image ?",
    ])}`,
    ...qcmN(2 * dist, [dist, 2 * dist + 1, 2 * dist - 1]),
    explanation: exp(
      "Le symétrique de A est de l'autre côté de l'axe, à la même distance.",
      "On compte les carreaux de A jusqu'à l'axe, puis de l'axe jusqu'à l'image.",
      `A est à ${dist} carreaux de l'axe, son image aussi : ${dist} + ${dist} = ${2 * dist}.`,
      `${2 * dist} carreaux.`,
    ),
    canvas: pointsDroites(axe, A, []),
  };
}

function construireRiche(d: number): Gen {
  const r = Math.random();
  if (d <= 3) return symetriquePoint(r < 0.6, 3);
  return r < 0.65 ? symetriquePoint(true, d) : distancePoint();
}

function defiRiche(): Gen {
  const r = Math.random();
  if (r < 0.2) return pliQuadrilatere(true, true);
  if (r < 0.35) return lettreEnMots(true);
  if (r < 0.55) return symetriquePoint(true, 5);
  if (r < 0.75) return completerJuger(5);
  if (r < 0.88) return figureEtAxe();
  return completerLargeur();
}

const RICHE: Record<string, (d: number) => Gen> = {
  ce2_symetrie_axe: axeRiche,
  ce2_symetrie_completer: completerRiche,
  ce2_symetrie_construire: construireRiche,
  ce2_symetrie_defi: () => defiRiche(),
};
const AIDE: Record<string, string> = {
  ce2_symetrie_axe: "Imagine que tu plies le long du trait : les deux moitiés tombent-elles pile l'une sur l'autre ?",
  ce2_symetrie_completer: "Compte les carreaux jusqu'à l'axe, puis le même nombre de l'autre côté, sur la même ligne.",
  ce2_symetrie_construire: "Même ligne, même distance de l'axe, de l'autre côté.",
  ce2_symetrie_defi: "Plie dans ta tête, et compte les carreaux de chaque côté de l'axe.",
};
/** L'ancien générateur garde une part, sauf celui qui dessinait la réponse. */
const PART_ANCIENNE: Record<string, number> = { ce2_symetrie_construire_tpl_1: 0 };

function nouveau(id: string, microId: string, difficulty: 1 | 2 | 3 | 4 | 5): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "ce2",
    matiere: "maths",
    notionId: "symetrie",
    microId,
    difficulty,
    theme: "neutral",
    hint: AIDE[microId],
    tags: ["ce2", "symetrie", "template", "canvas"],
    generate: () => RICHE[microId](difficulty),
  };
}

export const symetrieBank: TutorBankItemV4[] = [
  ...symetrieBase.map((it): TutorBankItemV4 => {
    if (it.kind !== "template" || !RICHE[it.microId]) return it;
    const ancien = it.generate;
    const part = PART_ANCIENNE[it.id] ?? 0.15;
    const d = it.difficulty;
    return {
      ...it,
      hint: AIDE[it.microId],
      generate: (ctx) => (Math.random() < part ? ancien(ctx) : RICHE[it.microId](d)),
    };
  }),
  // ★2 des axes et ★3 de « construire » n'avaient que des items figés.
  nouveau("ce2_symetrie_axe_tpl_3", "ce2_symetrie_axe", 2),
  nouveau("ce2_symetrie_construire_tpl_3", "ce2_symetrie_construire", 3),
];
