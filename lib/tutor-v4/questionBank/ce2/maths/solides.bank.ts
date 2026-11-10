// lib/tutor-v4/questionBank/ce2/maths/solides.bank.ts
//
// Les solides du CE2, écrits à la main. Cinq micro-compétences qui passaient
// par le constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, applicable à la rentrée 2025,
// cycle 2) : nommer le cube, la boule, le pavé droit, le cône, la pyramide et
// le cylindre ; les décrire avec les mots faces, arêtes et sommets ; connaître
// la nature des faces d'une pyramide ; construire un cube à partir d'un patron.
//
// ⚠️ LA PERSPECTIVE, note entière du programme longtemps sans question ici :
// « En CE2, les élèves travaillent aussi avec des représentations en
// perspective des solides dont ils sont familiers. Certaines faces, certaines
// arêtes et certains sommets ne sont pas visibles dans de telles
// représentations, et les arêtes non visibles sont souvent tracées en
// pointillés. S'ils ne construisent pas eux-mêmes de telles représentations,
// ils savent néanmoins IDENTIFIER un solide connu à partir d'une représentation
// en perspective. »
// ⚠️ Le canvas `solide_3d` dessine bien en perspective, mais avec des faces
// opaques : il ne trace AUCUNE arête cachée en pointillés. Les questions qui
// portent sur ce qu'on ne voit pas sont donc posées en MOTS, pas sur le dessin.
// Le dessin, lui, sert à ce que le programme lui demande : reconnaître.
// ⛔ Pas de volume au cycle 2 : le cm³ arrive au cycle 3. On compte des faces,
// des arêtes et des sommets, jamais des cubes-unités.
// ⛔ Pas de relation d'inclusion non plus : on ne demande pas « un cube est-il
// un pavé droit ? ». On décrit chacun par ses faces.
//
// LE PIÈGE DE LA NOTION : les faces de la pyramide. L'élève retient
// « pyramide = triangles » et oublie la base, qui n'en est pas un. Une pyramide
// à base carrée a cinq faces : quatre triangles ET un carré.
// Le second : compter les arêtes. Le cube a 8 sommets et 12 arêtes, et l'élève
// annonce 8 pour les deux — il a compté les coins, pas les traits.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type {
  FigureLibreCanvasData,
  Solide3DCanvasData,
  TutorGeneratedQuestionV4,
  TutorBankItemV4,
} from "@/lib/tutor-v4/types";
import type { PatronsCubeCanvasData } from "@/lib/tutor-v4/types_canvas";
import { cap, melange, qcm, qcmN, un } from "../../cm1/maths/trous-outils";

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

function solide(kind: Solide3DCanvasData["solide"]): Solide3DCanvasData {
  return {
    kind: "solide_3d",
    solide: kind,
    display: { showLabels: false, showDimensions: false, showFormulaHint: false },
  };
}

/**
 * Un patron dessiné sur le quadrillage.
 * ⚠️ `filledCells` attend des TUPLES `[ligne, colonne]`, numérotées à partir
 * de 1 — pas des objets.
 */
function patron(cellules: Array<[number, number]>): FigureLibreCanvasData {
  return {
    kind: "figure_libre",
    grid: { rows: 5, cols: 5, filledCells: cellules },
    display: { showGrid: true, showFilled: true, showPerimeter: false },
  };
}

/** La croix : six carrés qui se referment bien en cube. */
const PATRON_CROIX: Array<[number, number]> = [
  [1, 2],
  [2, 1],
  [2, 2],
  [2, 3],
  [3, 2],
  [4, 2],
];

/** Six carrés en bloc de 2 sur 3 : ils ne se referment PAS. */
const PATRON_BLOC: Array<[number, number]> = [
  [2, 1],
  [2, 2],
  [2, 3],
  [3, 1],
  [3, 2],
  [3, 3],
];

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/** Ce que chaque solide du CE2 a, et de quoi ses faces sont faites. */
const SOLIDES = [
  {
    nom: "le cube",
    canvas: "cube",
    faces: 6,
    aretes: 12,
    sommets: 8,
    natureFaces: "six carrés",
    objet: "un dé à jouer",
  },
  {
    nom: "le pavé droit",
    canvas: "pave_droit",
    faces: 6,
    aretes: 12,
    sommets: 8,
    natureFaces: "six rectangles",
    objet: "une boîte de letchis",
  },
  {
    nom: "la pyramide",
    canvas: "pyramide",
    faces: 5,
    aretes: 8,
    sommets: 5,
    natureFaces: "un carré pour la base et quatre triangles",
    objet: "un toit de kiosque à quatre pans",
  },
  {
    nom: "le cylindre",
    canvas: "cylindre",
    faces: 2,
    aretes: 0,
    sommets: 0,
    natureFaces: "deux disques, reliés par une surface courbe",
    objet: "une boîte de conserve",
  },
  {
    nom: "le cône",
    canvas: "cone",
    faces: 1,
    aretes: 0,
    sommets: 1,
    natureFaces: "un disque, et une surface courbe qui monte jusqu'à la pointe",
    objet: "un cornet de glace",
  },
  {
    nom: "la boule",
    canvas: "boule",
    faces: 0,
    aretes: 0,
    sommets: 0,
    natureFaces: "aucune face plate : tout est courbe",
    objet: "une boule de pétanque",
  },
] as const;

const solidesBase: TutorBankItemV4[] = [
  /* =========================================================
     CE2_SOLIDE_RECONNAITRE — nommer les six solides
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_solide_reconnaitre_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quel solide a toutes ses faces carrées ?",
    format: "qcm",
    choices: ["le cube", "le pavé droit", "le cylindre", "la boule"],
    expected: ["le cube"],
    comparator: "mcq_exact",
    hint: "Pense à un dé à jouer.",
    explanation: exp(
      "Le cube a six faces, et toutes les six sont des carrés identiques.",
      "On regarde la forme de chaque face l'une après l'autre.",
      "Un dé à jouer est un cube : ses six faces sont des carrés de même taille. Le pavé droit, lui, a des faces rectangulaires.",
      "C'est le cube.",
    ),
    tags: ["ce2", "solides", "reconnaitre", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_solide_reconnaitre_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_reconnaitre",
    difficulty: 3,
    theme: "reunion",
    text: "Une boîte de letchis a la forme d'une caisse rectangulaire. Quel solide est-ce ?",
    format: "qcm",
    choices: ["un pavé droit", "un cube", "un cylindre", "une pyramide"],
    expected: ["un pavé droit"],
    comparator: "mcq_exact",
    hint: "Ses faces sont des rectangles, pas des carrés.",
    explanation: exp(
      "Le pavé droit a six faces rectangulaires.",
      "On regarde la forme des faces : des rectangles, ou des carrés ?",
      "Une boîte de letchis est plus longue que large et que haute : ses faces sont des rectangles. C'est un pavé droit. Si toutes ses faces étaient des carrés, ce serait un cube.",
      "C'est un pavé droit.",
    ),
    tags: ["ce2", "solides", "reconnaitre", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_solide_reconnaitre_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quel solide n'a aucune face plate ?",
    format: "qcm",
    choices: ["la boule", "le cube", "le cône", "le cylindre"],
    expected: ["la boule"],
    comparator: "mcq_exact",
    hint: "Lequel roule dans toutes les directions ?",
    explanation: exp(
      "Une face plate est une surface sur laquelle le solide peut se poser sans bouger.",
      "On essaie de poser chaque solide à plat sur la table.",
      "La boule roule dans tous les sens : elle n'a aucune face plate. Le cône a un disque à sa base, le cylindre en a deux, le cube en a six.",
      "C'est la boule.",
    ),
    tags: ["ce2", "solides", "reconnaitre", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_solide_reconnaitre_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche un objet de la vie de tous les jours qui a cette forme.",
    tags: ["ce2", "solides", "reconnaitre", "template", "canvas"],
    generate: () => {
      const s = randomChoice(SOLIDES);
      return {
        text: `${s.objet.charAt(0).toUpperCase() + s.objet.slice(1)} a la forme de quel solide ?`,
        format: "qcm",
        choices: makeChoices(s.nom, SOLIDES.map((x) => x.nom)),
        expected: [s.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque solide se reconnaît à ses faces et à sa façon de se poser.",
          "On regarde la forme de l'objet et on la compare aux six solides connus.",
          `${s.objet.charAt(0).toUpperCase() + s.objet.slice(1)} a ${s.natureFaces}. C'est ${s.nom}.`,
          `C'est ${s.nom}.`,
        ),
        canvas: solide(s.canvas),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_solide_reconnaitre_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde le dessin : combien de faces plates, et de quelle forme ?",
    tags: ["ce2", "solides", "reconnaitre", "template", "canvas"],
    generate: () => {
      const s = randomChoice(SOLIDES);
      return {
        text: "Quel est ce solide ?",
        format: "qcm",
        choices: makeChoices(s.nom, SOLIDES.map((x) => x.nom)),
        expected: [s.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "On reconnaît un solide à la forme et au nombre de ses faces.",
          "On compte les faces plates, puis on regarde leur forme.",
          `Ce solide a ${s.natureFaces}. C'est ${s.nom}.`,
          `C'est ${s.nom}.`,
        ),
        canvas: solide(s.canvas),
      };
    },
  },

  // --- Reconnaître SUR UNE VUE EN PERSPECTIVE ---------------
  // Le programme ne demande pas à l'élève de dessiner en
  // perspective. Il lui demande de RECONNAÎTRE un solide sur un
  // tel dessin — donc de ne pas se laisser arrêter par les
  // faces qui se déforment.
  {
    kind: "fixed",
    id: "ce2_solide_reconnaitre_fixed_5",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un dessin en perspective, les faces carrées d'un cube ont l'air penchées, comme des losanges. Est-ce toujours un cube ?",
    format: "qcm",
    choices: [
      "oui : c'est le dessin qui déforme, pas le solide",
      "non, c'est un autre solide",
      "non, ses faces sont devenues des losanges",
      "on ne peut pas le savoir sur un dessin",
    ],
    expected: ["oui : c'est le dessin qui déforme, pas le solide"],
    comparator: "mcq_exact",
    hint: "Pense à une boîte de dés posée sur la table, vue de biais. Ses faces sont toujours carrées.",
    explanation: exp(
      "Une représentation en perspective montre un solide vu de biais : les faces s'y déforment, le solide non.",
      "On se demande ce qu'est l'objet réel, pas ce que le dessin en montre.",
      "Un cube vu de face montre un carré ; vu de biais, ce même carré devient un parallélogramme sur la feuille. La boîte n'a pas changé de forme, c'est l'angle de vue qui a changé. C'est un cube.",
      "Oui, c'est toujours un cube : le dessin déforme, le solide non.",
    ),
    tags: ["ce2", "solides", "reconnaitre", "perspective", "piege", "qcm"],
    canvas: solide("cube"),
  },
  {
    kind: "fixed",
    id: "ce2_solide_reconnaitre_fixed_6",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Sur les dessins en perspective, on trace souvent certains traits en pointillés. Pourquoi ?",
    format: "qcm",
    choices: [
      "ce sont les arêtes cachées derrière le solide",
      "ce sont les arêtes les plus courtes",
      "ce sont les arêtes qu'il ne faut pas compter",
      "c'est pour faire joli",
    ],
    expected: ["ce sont les arêtes cachées derrière le solide"],
    comparator: "mcq_exact",
    hint: "Pose une boîte sur la table : les arêtes du fond, tu ne les vois pas. Elles existent quand même.",
    explanation: exp(
      "Dans une vue en perspective, une partie du solide passe derrière : ces arêtes-là se dessinent en pointillés.",
      "On regarde ce que le dessin cache, et pas seulement ce qu'il montre.",
      "Le pointillé veut dire « cette arête existe, mais elle est derrière ». Surtout pas « ne la compte pas » : elle compte comme les autres, exactement comme le fond d'une boîte qu'on ne voit pas mais qui est bien là.",
      "Les pointillés marquent les arêtes cachées derrière le solide.",
    ),
    tags: ["ce2", "solides", "reconnaitre", "perspective", "qcm"],
  },

  /* =========================================================
     CE2_SOLIDE_DECRIRE — faces, arêtes, sommets
     Le piège : compter les coins et croire qu'on a compté
     les arêtes.
     Et sur une vue en perspective, un second piège se pose
     par-dessus : compter ce qu'on VOIT. Un cube dessiné de
     biais ne montre que 9 arêtes sur 12 et 7 sommets sur 8.
     Le solide n'a pas changé, c'est le dessin qui cache.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_solide_decrire_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_decrire",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un solide, qu'appelle-t-on une arête ?",
    format: "qcm",
    choices: [
      "le trait où deux faces se rejoignent",
      "un coin pointu",
      "une face plate",
      "le dessus du solide",
    ],
    expected: ["le trait où deux faces se rejoignent"],
    comparator: "mcq_exact",
    hint: "Passe le doigt sur le bord d'une boîte : tu suis une arête.",
    explanation: exp(
      "Une arête est le segment où deux faces se rencontrent ; un sommet est le point où plusieurs arêtes se rejoignent.",
      "On suit du doigt le bord d'une boîte : le trait est une arête, le coin piquant est un sommet.",
      "Face, arête, sommet : une surface, un trait, un point. Ce sont trois choses différentes, et on ne les compte pas ensemble.",
      "C'est le trait où deux faces se rejoignent.",
    ),
    tags: ["ce2", "solides", "decrire", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_solide_decrire_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_decrire",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit qu'un cube a 8 arêtes, parce qu'il a compté ses 8 coins. Combien un cube a-t-il d'arêtes ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Compte les traits, pas les coins : 4 en haut, 4 en bas, 4 debout.",
    explanation: exp(
      "Les arêtes sont les traits, les sommets sont les coins : ce ne sont pas les mêmes objets, et il n'y en a pas le même nombre.",
      "On compte les arêtes par groupes : celles du dessus, celles du dessous, celles qui montent.",
      "4 arêtes en haut, 4 en bas, et 4 verticales qui relient les deux : 4 + 4 + 4 = 12. L'élève a compté les 8 sommets, ce qui est juste — mais ce n'était pas la question.",
      "Un cube a 12 arêtes.",
    ),
    tags: ["ce2", "solides", "decrire", "piege", "canvas"],
    canvas: solide("cube"),
  },
  {
    kind: "fixed",
    id: "ce2_solide_decrire_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_decrire",
    difficulty: 2,
    theme: "neutral",
    text: "Combien un cube a-t-il de faces ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Pense aux six chiffres d'un dé.",
    explanation: exp(
      "Une face est une surface plate du solide.",
      "On compte les faces par paires : dessus et dessous, devant et derrière, gauche et droite.",
      "2 + 2 + 2 = 6. C'est pour cela qu'un dé porte six chiffres : un par face.",
      "Un cube a 6 faces.",
    ),
    tags: ["ce2", "solides", "decrire", "remarquable"],
  },
  {
    kind: "template",
    id: "ce2_solide_decrire_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_decrire",
    difficulty: 3,
    theme: "neutral",
    hint: "Faces, arêtes, sommets : une surface, un trait, un point.",
    tags: ["ce2", "solides", "decrire", "template", "canvas"],
    generate: () => {
      const s = randomChoice(
        SOLIDES.filter((x) => x.nom === "le cube" || x.nom === "le pavé droit" || x.nom === "la pyramide"),
      );
      const quoi = randomChoice(["faces", "arêtes", "sommets"] as const);
      const valeur = quoi === "faces" ? s.faces : quoi === "arêtes" ? s.aretes : s.sommets;
      return {
        text: `Combien ${s.nom} a-t-${s.nom.startsWith("la ") ? "elle" : "il"} ${quoi === "arêtes" ? "d'arêtes" : `de ${quoi}`} ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Une face est une surface plate, une arête est le trait où deux faces se rejoignent, un sommet est un coin.",
          "On compte par groupes, en tournant le solide dans sa tête.",
          `${s.nom.charAt(0).toUpperCase() + s.nom.slice(1)} a ${s.faces} faces, ${s.aretes} arêtes et ${s.sommets} sommets. Ici on cherchait les ${quoi} : il y en a ${valeur}.`,
          `Il y en a ${valeur}.`,
        ),
        canvas: solide(s.canvas),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_solide_decrire_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_decrire",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux solides différents peuvent avoir le même nombre de faces.",
    tags: ["ce2", "solides", "decrire", "template"],
    generate: () => {
      const mot = randomChoice([
        { nom: "une face", desc: "une surface plate du solide" },
        { nom: "une arête", desc: "le trait où deux faces se rejoignent" },
        { nom: "un sommet", desc: "le point où plusieurs arêtes se rejoignent" },
      ] as const);
      return {
        text: `Comment appelle-t-on ${mot.desc} ?`,
        format: "qcm",
        choices: makeChoices(mot.nom, [
          "une face",
          "une arête",
          "un sommet",
          "un patron",
        ]),
        expected: [mot.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "Trois mots pour trois choses : la face est une surface, l'arête est un trait, le sommet est un point.",
          "On se demande si l'objet décrit a une surface, une longueur, ou s'il n'est qu'un point.",
          `${mot.desc.charAt(0).toUpperCase() + mot.desc.slice(1)}, cela s'appelle ${mot.nom}.`,
          `C'est ${mot.nom}.`,
        ),
      };
    },
  },

  // --- Ce que la perspective CACHE -------------------------
  // ⚠️ Posé en mots, pas sur le dessin : le canvas `solide_3d`
  // rend des faces opaques et ne trace aucune arête cachée en
  // pointillés. Une question qui demanderait de compter sur ce
  // dessin-là compterait autre chose que ce qu'on croit.
  {
    kind: "fixed",
    id: "ce2_solide_decrire_fixed_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_decrire",
    difficulty: 4,
    theme: "neutral",
    text: "Un cube est dessiné en perspective. Un élève compte les arêtes sur le dessin : il en voit 9. Combien le cube a-t-il d'arêtes ?",
    format: "qcm",
    choices: ["12", "9", "8", "6"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "Les arêtes du fond sont derrière. Elles existent, on ne les voit pas.",
    explanation: exp(
      "Un cube a 12 arêtes, quelle que soit la façon dont on le dessine.",
      "On compte sur le solide, pas sur l'image : on ajoute ce qui passe derrière.",
      "Vu de biais, un cube ne montre que 9 arêtes : les 3 autres sont cachées derrière, et on les trace en pointillés. L'élève a bien compté ce qu'il voyait — il a compté le dessin, pas le cube. Le cube en a 12.",
      "Le cube a 12 arêtes.",
    ),
    tags: ["ce2", "solides", "decrire", "perspective", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_solide_decrire_fixed_5",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_decrire",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un cube dessiné en perspective, on ne voit que 7 sommets. Combien le cube en a-t-il vraiment ?",
    format: "qcm",
    choices: ["8", "7", "12", "6"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Un coin est caché derrière le solide, celui du fond.",
    explanation: exp(
      "Un cube a 8 sommets : les huit coins de la boîte.",
      "On compte les coins du solide réel, en n'oubliant pas celui qui passe derrière.",
      "Sur une vue en perspective, le coin du fond disparaît derrière le cube : il n'en reste que 7 de visibles. Le huitième est bien là — pose une boîte sur la table et tourne-la, il réapparaît.",
      "Le cube a 8 sommets.",
    ),
    tags: ["ce2", "solides", "decrire", "perspective", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_solide_decrire_fixed_6",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_decrire",
    difficulty: 5,
    theme: "neutral",
    text: "Sur un pavé droit dessiné en perspective, combien de faces voit-on au maximum en même temps ?",
    format: "qcm",
    choices: ["3", "6", "4", "2"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Prends une boîte de gâteaux et regarde-la de biais. Le dessus, la devanture, et un côté.",
    explanation: exp(
      "Un pavé droit a 6 faces, mais elles vont deux par deux : chaque face en a une opposée, de l'autre côté.",
      "On regarde combien de faces peuvent être tournées vers nous en même temps.",
      "De biais, on voit le dessus, la face avant et une face latérale : trois faces. Les trois autres — le dessous, l'arrière et l'autre côté — sont exactement derrière celles-là. Le pavé en a bien 6, on n'en voit que la moitié à la fois.",
      "On en voit 3 à la fois, sur les 6 que compte le pavé.",
    ),
    tags: ["ce2", "solides", "decrire", "perspective", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_solide_decrire_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_decrire",
    difficulty: 4,
    theme: "neutral",
    hint: "Le dessin en cache une partie. On compte le solide, pas l'image.",
    tags: ["ce2", "solides", "decrire", "perspective", "template"],
    generate: () => {
      const cas = randomChoice([
        { quoi: "arêtes", vues: 9, total: 12, solide: "cube" },
        { quoi: "arêtes", vues: 9, total: 12, solide: "pavé droit" },
        { quoi: "sommets", vues: 7, total: 8, solide: "cube" },
        { quoi: "sommets", vues: 7, total: 8, solide: "pavé droit" },
        { quoi: "faces", vues: 3, total: 6, solide: "cube" },
        { quoi: "faces", vues: 3, total: 6, solide: "pavé droit" },
      ] as const);
      const caches = cas.total - cas.vues;
      return {
        text: `Un ${cas.solide} est dessiné en perspective : on n'en voit que ${cas.vues} ${cas.quoi}. Combien en a-t-il en tout ?`,
        format: "qcm",
        choices: makeChoices(String(cas.total), [
          String(cas.vues),
          String(cas.vues + 1),
          String(cas.total + cas.vues),
          String(caches),
        ]),
        expected: [String(cas.total)],
        comparator: "mcq_exact",
        explanation: exp(
          `Un ${cas.solide} a toujours ${cas.total} ${cas.quoi}, quelle que soit la façon dont on le dessine.`,
          "On ajoute à ce qu'on voit ce que le dessin cache derrière.",
          `Le dessin en montre ${cas.vues} ; ${caches} passe${caches > 1 ? "nt" : ""} derrière le solide et se trace${caches > 1 ? "nt" : ""} en pointillés. ${cas.vues} + ${caches} = ${cas.total}. Répondre ${cas.vues}, c'est décrire l'image et non le solide.`,
          `Il en a ${cas.total}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_SOLIDE_FACES_PYRAMIDE
     La base n'est pas un triangle. C'est tout le sujet.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_solide_faces_pyramide_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_faces_pyramide",
    difficulty: 3,
    theme: "neutral",
    text: "De quelle forme sont les faces qui montent vers la pointe d'une pyramide ?",
    format: "qcm",
    choices: ["des triangles", "des carrés", "des rectangles", "des disques"],
    expected: ["des triangles"],
    comparator: "mcq_exact",
    hint: "Elles se rétrécissent toutes vers le même point.",
    explanation: exp(
      "Les faces latérales d'une pyramide sont des triangles : elles partent de la base et se rejoignent toutes au sommet.",
      "On suit du regard une face depuis la base jusqu'à la pointe.",
      "Chaque face part d'un côté de la base et se resserre jusqu'au sommet : trois côtés, donc un triangle.",
      "Ce sont des triangles.",
    ),
    tags: ["ce2", "solides", "faces_pyramide", "definition", "qcm"],
    canvas: solide("pyramide"),
  },
  {
    kind: "fixed",
    id: "ce2_solide_faces_pyramide_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_faces_pyramide",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « toutes les faces d'une pyramide sont des triangles ». A-t-il raison pour une pyramide à base carrée ?",
    format: "qcm",
    choices: [
      "non, la base est un carré",
      "oui, les cinq faces sont des triangles",
      "non, la base est un rectangle",
      "non, aucune face n'est un triangle",
    ],
    expected: ["non, la base est un carré"],
    comparator: "mcq_exact",
    hint: "Compte les faces : celles qui montent, et celle sur laquelle la pyramide est posée.",
    explanation: exp(
      "Une pyramide a des faces latérales triangulaires ET une base, dont la forme donne son nom à la pyramide.",
      "On compte séparément les faces qui montent vers la pointe et celle sur laquelle le solide repose.",
      "Une pyramide à base carrée a cinq faces : quatre triangles qui montent, et un carré en dessous. Oublier la base, c'est oublier la face sur laquelle elle est posée.",
      "Non : la base est un carré.",
    ),
    tags: ["ce2", "solides", "faces_pyramide", "piege", "qcm", "canvas"],
    canvas: solide("pyramide"),
  },
  {
    kind: "fixed",
    id: "ce2_solide_faces_pyramide_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_faces_pyramide",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de faces a une pyramide à base carrée ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Quatre faces montent vers la pointe. Et en dessous ?",
    explanation: exp(
      "Une pyramide à base carrée a autant de faces triangulaires que la base a de côtés, plus la base elle-même.",
      "On compte les triangles, puis on ajoute la base.",
      "La base carrée a 4 côtés, donc 4 triangles montent vers le sommet. Avec la base : 4 + 1 = 5 faces.",
      "Elle a 5 faces.",
    ),
    tags: ["ce2", "solides", "faces_pyramide", "remarquable"],
  },
  {
    kind: "template",
    id: "ce2_solide_faces_pyramide_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_faces_pyramide",
    difficulty: 4,
    theme: "neutral",
    hint: "Autant de triangles que la base a de côtés, plus la base.",
    tags: ["ce2", "solides", "faces_pyramide", "template"],
    generate: () => {
      const base = randomChoice([
        { nom: "carrée", cotes: 4 },
        { nom: "triangulaire", cotes: 3 },
        { nom: "rectangulaire", cotes: 4 },
      ]);
      const quoi = randomChoice(["triangles", "faces"] as const);
      const valeur = quoi === "triangles" ? base.cotes : base.cotes + 1;
      return {
        text: `Combien de ${quoi} a une pyramide à base ${base.nom} ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Une pyramide a autant de faces triangulaires que sa base a de côtés, plus la base elle-même.",
          "On compte d'abord les côtés de la base, puis on décide si la base compte dans la réponse.",
          quoi === "triangles"
            ? `La base ${base.nom} a ${base.cotes} côtés : ${base.cotes} triangles montent vers le sommet. La base, elle, n'est pas un triangle.`
            : `La base ${base.nom} a ${base.cotes} côtés : ${base.cotes} triangles montent vers le sommet, et la base s'ajoute. ${base.cotes} + 1 = ${valeur} faces.`,
          `Il y en a ${valeur}.`,
        ),
        canvas: solide("pyramide"),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_solide_faces_pyramide_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_faces_pyramide",
    difficulty: 4,
    theme: "neutral",
    hint: "La base donne son nom à la pyramide.",
    tags: ["ce2", "solides", "faces_pyramide", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          question: "De quelle forme est la BASE d'une pyramide à base carrée ?",
          bonne: "un carré",
        },
        {
          question: "De quelle forme sont les faces LATÉRALES d'une pyramide ?",
          bonne: "des triangles",
        },
        {
          question: "Une pyramide à base carrée a-t-elle des faces qui ne sont pas des triangles ?",
          bonne: "oui, la base carrée",
        },
      ] as const);
      return {
        text: cas.question,
        format: "qcm",
        choices: makeChoices(cas.bonne, [
          "un carré",
          "des triangles",
          "oui, la base carrée",
          "des disques",
          "non, toutes sont des triangles",
        ]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une pyramide se décrit en deux temps : sa base d'un côté, ses faces latérales de l'autre.",
          "On sépare la base, qui donne son nom à la pyramide, des triangles qui montent vers le sommet.",
          "Les faces latérales sont toujours des triangles ; la base, elle, a la forme annoncée par le nom — carrée pour une pyramide à base carrée.",
          `Réponse : ${cas.bonne}.`,
        ),
        canvas: solide("pyramide"),
      };
    },
  },

  /* =========================================================
     CE2_SOLIDE_PATRON — le cube à plat
     Six carrés ne suffisent pas : encore faut-il qu'ils se
     referment.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_solide_patron_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_patron",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qu'un patron de cube ?",
    format: "qcm",
    choices: [
      "le cube déplié à plat sur une feuille",
      "un dessin du cube en perspective",
      "la face du dessus du cube",
      "le modèle à recopier",
    ],
    expected: ["le cube déplié à plat sur une feuille"],
    comparator: "mcq_exact",
    hint: "On le découpe, on le plie, et le cube apparaît.",
    explanation: exp(
      "Un patron est le solide déplié : toutes ses faces posées à plat, encore attachées les unes aux autres.",
      "On imagine qu'on ouvre le cube le long de ses arêtes et qu'on l'aplatit.",
      "En découpant le patron et en le repliant, on retrouve le cube. Un dessin en perspective, lui, ne se plie pas : ce n'est qu'une image.",
      "C'est le cube déplié à plat.",
    ),
    tags: ["ce2", "solides", "patron", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_solide_patron_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_patron",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de carrés faut-il pour faire le patron d'un cube ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Autant que le cube a de faces.",
    explanation: exp(
      "Le patron contient toutes les faces du solide, une fois chacune.",
      "On compte les faces du cube : le patron en a exactement autant.",
      "Un cube a 6 faces, donc son patron est fait de 6 carrés. Avec 5, il resterait un trou ; avec 7, un carré dépasserait.",
      "Il en faut 6.",
    ),
    tags: ["ce2", "solides", "patron"],
    canvas: patron(PATRON_CROIX),
  },
  {
    kind: "fixed",
    id: "ce2_solide_patron_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_patron",
    difficulty: 5,
    theme: "neutral",
    text: "Voici six carrés collés en un bloc de 2 lignes sur 3 colonnes. En les pliant, obtient-on un cube ?",
    format: "qcm",
    choices: [
      "non, deux faces se superposent et il reste un trou",
      "oui, il y a bien six carrés",
      "oui, à condition de plier dans le bon sens",
      "on ne peut pas savoir sans découper",
    ],
    expected: ["non, deux faces se superposent et il reste un trou"],
    comparator: "mcq_exact",
    hint: "Six carrés ne suffisent pas : il faut aussi qu'ils se referment.",
    explanation: exp(
      "Un patron doit avoir le bon nombre de faces ET la bonne disposition : chaque face doit trouver sa place quand on replie.",
      "On plie mentalement le long des arêtes et on regarde si les faces se recouvrent.",
      "Il y a bien six carrés, mais en bloc : deux d'entre eux viennent se poser au même endroit, et un côté du cube reste ouvert. Le patron en croix, lui, se referme parfaitement.",
      "Non, ce bloc ne se referme pas en cube.",
    ),
    tags: ["ce2", "solides", "patron", "piege", "qcm", "canvas"],
    canvas: patron(PATRON_BLOC),
  },
  {
    kind: "template",
    id: "ce2_solide_patron_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_patron",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les carrés, puis regarde s'ils peuvent se refermer.",
    tags: ["ce2", "solides", "patron", "template", "canvas"],
    generate: () => {
      const bon = randomChoice([true, false]);
      const bonne = bon
        ? "oui, c'est un patron de cube"
        : "non, ces carrés ne se referment pas en cube";
      return {
        text: "En découpant cette figure et en la pliant, obtient-on un cube ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          "oui, c'est un patron de cube",
          "non, ces carrés ne se referment pas en cube",
          "non, il n'y a pas six carrés",
          "on ne peut pas savoir sans découper",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un patron de cube a six carrés ET une disposition qui permet de refermer le solide.",
          "On compte les carrés, puis on plie mentalement pour voir si tout se met en place.",
          bon
            ? "Les six carrés sont disposés en croix : en repliant les quatre bras autour du carré central, le cube se referme exactement."
            : "Les six carrés sont collés en bloc : en repliant, deux faces se superposent et un côté reste ouvert. Six carrés ne suffisent pas.",
          bonne.charAt(0).toUpperCase() + bonne.slice(1) + ".",
        ),
        canvas: patron(bon ? PATRON_CROIX : PATRON_BLOC),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_solide_patron_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_patron",
    difficulty: 3,
    theme: "neutral",
    hint: "Le patron contient toutes les faces, une fois chacune.",
    tags: ["ce2", "solides", "patron", "template"],
    generate: () => {
      const cas = randomChoice([
        { article: "d'un cube", nom: "le cube", faces: 6, natureFaces: "six carrés" },
        { article: "d'un pavé droit", nom: "le pavé droit", faces: 6, natureFaces: "six rectangles" },
        {
          article: "d'une pyramide à base carrée",
          nom: "la pyramide",
          faces: 5,
          natureFaces: "un carré pour la base et quatre triangles",
        },
      ] as const);
      const s = cas;
      return {
        text: `Combien de faces faut-il dessiner pour faire le patron ${cas.article} ?`,
        format: "short",
        expected: [String(s.faces)],
        comparator: "number_equal",
        explanation: exp(
          "Le patron contient toutes les faces du solide, une fois chacune.",
          "On compte les faces du solide : le patron en aura exactement autant.",
          `${s.nom.charAt(0).toUpperCase() + s.nom.slice(1)} a ${s.faces} faces — ${s.natureFaces}. Son patron en a donc ${s.faces}.`,
          `Il en faut ${s.faces}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_SOLIDE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_solide_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un solide a 6 faces, 12 arêtes et 8 sommets, et toutes ses faces sont des rectangles qui ne sont pas des carrés. Lequel est-ce ?",
    format: "qcm",
    choices: ["un pavé droit", "un cube", "une pyramide", "un cylindre"],
    expected: ["un pavé droit"],
    comparator: "mcq_exact",
    hint: "Le nombre de faces ne suffit pas : regarde leur forme.",
    explanation: exp(
      "Deux solides peuvent avoir le même nombre de faces, d'arêtes et de sommets : c'est la FORME des faces qui les distingue.",
      "On lit d'abord les nombres, puis la nature des faces.",
      "6 faces, 12 arêtes, 8 sommets : cela va au cube comme au pavé droit. Mais les faces sont des rectangles qui ne sont pas des carrés : c'est donc un pavé droit.",
      "C'est un pavé droit.",
    ),
    tags: ["ce2", "solides", "defi", "piege", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "ce2_solide_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_defi",
    difficulty: 5,
    theme: "reunion",
    text: "On fabrique un cube en carton de 8 cm d'arête. Quelle longueur totale de ruban adhésif faut-il pour recouvrir toutes ses arêtes, en cm ?",
    format: "short",
    expected: ["96"],
    comparator: "number_equal",
    hint: "Combien d'arêtes, et combien mesure chacune ?",
    explanation: exp(
      "Toutes les arêtes d'un cube ont la même longueur.",
      "On compte les arêtes, puis on multiplie par la longueur de l'une d'elles.",
      "Un cube a 12 arêtes, toutes de 8 cm : 12 × 8 = 96.",
      "Il faut 96 cm de ruban.",
    ),
    tags: ["ce2", "solides", "defi", "reunion", "deux_etapes"],
    canvas: solide("cube"),
  },
  {
    kind: "template",
    id: "ce2_solide_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Les nombres seuls ne suffisent pas toujours : regarde aussi la forme des faces.",
    tags: ["ce2", "solides", "defi", "template"],
    generate: () => {
      const s = randomChoice(SOLIDES);
      // « aucune face plate : tout est courbe » se recolle mal derrière deux
      // points : on l'introduit par « On y voit », qui va aux six solides.
      return {
        text: `Un solide a ${s.faces} face${s.faces > 1 ? "s" : ""} plate${s.faces > 1 ? "s" : ""}, ${s.aretes} arête${s.aretes > 1 ? "s" : ""} et ${s.sommets} sommet${s.sommets > 1 ? "s" : ""}. On y voit ${s.natureFaces}. Lequel est-ce ?`,
        format: "qcm",
        choices: makeChoices(s.nom, SOLIDES.map((x) => x.nom)),
        expected: [s.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "On identifie un solide par ses nombres de faces, d'arêtes et de sommets, ET par la forme de ses faces.",
          "On lit chaque information et on élimine les solides qui ne collent pas.",
          `${s.faces} face${s.faces > 1 ? "s" : ""}, ${s.aretes} arête${s.aretes > 1 ? "s" : ""}, ${s.sommets} sommet${s.sommets > 1 ? "s" : ""}, et ${s.natureFaces} : cela ne va qu'à un seul solide.`,
          `C'est ${s.nom}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_solide_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId: "ce2_solide_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Toutes les arêtes d'un cube sont égales.",
    tags: ["ce2", "solides", "defi", "template"],
    generate: () => {
      const arete = randomInt(3, 12);
      return {
        text: `Un cube a une arête de ${arete} cm. Quelle est la longueur totale de ses 12 arêtes, en cm ?`,
        format: "short",
        expected: [String(12 * arete)],
        comparator: "number_equal",
        explanation: exp(
          "Les douze arêtes d'un cube ont toutes la même longueur.",
          "On multiplie la longueur d'une arête par le nombre d'arêtes.",
          `${arete} × 12 = ${12 * arete}.`,
          `Cela fait ${12 * arete} cm en tout.`,
        ),
        canvas: solide("cube"),
      };
    },
  },
];

/* ═════════════════════════════════════════════════════════════════════════
   LES GÉNÉRATEURS RICHES (10/11/2026) — robustesse du coach du cycle 2.

   Mesuré le 10/11 : 8 à 24 squelettes par micro, 11 à 18 répétitions sur 20.
   Les gabarits ci-dessus tiraient UNE phrase dans six solides : l'enfant de
   8 ans reconnaît la phrase avant la notion. Chaque gabarit tire désormais une
   SITUATION (un enfant de la troupe, un objet de la vie, un geste : coller,
   piquer, plier) × une TOURNURE × un solide. L'ancien générateur reste servi
   une fois sur sept, pour ne rien perdre de ce qu'il posait.
   ⭐ Le dessin porte la question (le solide en perspective, le patron à
   plier) ; il ne la résout jamais : on ne dessine pas le solide quand on
   demande son nom à partir d'une propriété.
   ⭐ ★1-★2 : une phrase directe. Le contexte arrive à ★3.
═════════════════════════════════════════════════════════════════════════ */

type Gen = TutorGeneratedQuestionV4;

const TROUPE = [
  "Nina", "Téo", "Zoé", "Ravi", "Pic le paille-en-queue",
  "Lou", "Malo", "Inès", "Sacha", "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis",
] as const;
const qui = () => un(TROUPE);

/** Les six solides du CE2, pour les reconnaître. */
const TOUS = [
  {
    nom: "le cube", de: "d'un cube", canvas: () => solide("cube"),
    objets: ["un dé à jouer", "un glaçon tout carré", "un bloc de construction tout carré", "une boîte cadeau aux faces toutes carrées"],
    props: ["six faces carrées, toutes pareilles", "six faces qui sont toutes des carrés"],
  },
  {
    nom: "le pavé droit", de: "d'un pavé droit", canvas: () => solide("pave_droit"),
    objets: ["une boîte de céréales", "une brique de lait", "une boîte à chaussures", "un livre fermé", "une gomme", "un aquarium"],
    props: ["six faces rectangulaires, pas toutes carrées", "six faces en rectangles, comme une boîte à chaussures"],
  },
  {
    nom: "la pyramide", de: "d'une pyramide", canvas: () => solide("pyramide"),
    objets: ["une pyramide d'Égypte", "un toit à quatre pans", "un dé à quatre faces"],
    props: ["une pointe et des faces en triangles", "une base carrée et quatre triangles qui montent en pointe"],
  },
  {
    nom: "le cylindre", de: "d'un cylindre", canvas: () => solide("cylindre"),
    objets: ["une boîte de conserve", "un rouleau de papier", "une bougie ronde", "une pile", "un tambour", "une canette"],
    props: ["deux disques plats et une surface qui roule", "un dessus et un dessous ronds et plats"],
  },
  {
    nom: "le cône", de: "d'un cône", canvas: () => solide("cone"),
    objets: ["un cornet de glace", "un chapeau de fée", "un plot de sport", "un chapeau pointu de clown"],
    props: ["un seul disque plat et une pointe", "une base ronde et une pointe"],
  },
  {
    nom: "la boule", de: "d'une boule", canvas: () => solide("boule"),
    objets: ["un ballon de foot", "une bille", "une orange", "une boule de neige", "une perle", "une boule de Noël"],
    props: ["aucune face plate", "une surface toute ronde, sans aucun bord"],
  },
] as const;
type UnSolide = (typeof TOUS)[number];

/** Les confusions d'enfant : le cube et le pavé, le cône et la pyramide… */
const VOISINS: Record<string, string[]> = {
  "le cube": ["le pavé droit", "la pyramide", "le cylindre", "la boule"],
  "le pavé droit": ["le cube", "la pyramide", "le cylindre"],
  "la pyramide": ["le cône", "le cube", "le pavé droit"],
  "le cylindre": ["le cône", "la boule", "le pavé droit"],
  "le cône": ["la pyramide", "le cylindre", "la boule"],
  "la boule": ["le cylindre", "le cône", "le cube"],
};
const parNom = (n: string) => TOUS.find((s) => s.nom === n)!;

function reconnaitre(d: number): Gen {
  const s: UnSolide = un(TOUS);
  const r = Math.random();
  const P = qui();
  const expl = (calcul: string) =>
    exp(
      "On reconnaît un solide à ses faces : plates ou courbes, carrées, rectangulaires, en triangle ou rondes.",
      "On regarde les faces, la pointe, ce qui roule, puis on compare aux six solides connus.",
      calcul,
      `C'est ${s.nom}.`,
    );
  if (d <= 2) {
    if (r < 0.6) {
      return {
        text: [
          un(["Regarde le dessin.", "Observe bien ce solide.", "Voici un solide.", "Voici le dessin d'un solide."]),
          un(["Quel est son nom ?", "Comment s'appelle-t-il ?", "Quel solide est-ce ?", "Comment le nomme-t-on ?"]),
        ].join(" "),
        ...qcm(s.nom, VOISINS[s.nom]),
        explanation: expl(`Ce solide a ${un(s.props)} : c'est ${s.nom}.`),
        canvas: s.canvas(),
      };
    }
    const o = un(s.objets);
    return {
      text: un([`${cap(o)} a la forme de quel solide ?`, `Quel solide a la même forme que ${o} ?`, `${cap(o)} : quel solide a cette forme ?`]),
      ...qcm(s.nom, VOISINS[s.nom]),
      explanation: expl(`${cap(o)} a ${un(s.props)} : c'est la forme ${s.de}.`),
    };
  }
  // ★3 et plus : une situation.
  if (r < 0.35 || (d < 4 && r >= 0.75)) {
    // Le solide est dessiné : quel objet de la vie a cette forme ?
    const o = un(s.objets);
    const faux = VOISINS[s.nom].map((v) => un(parNom(v).objets));
    return {
      text: [
        un([
          `${P} a modelé ce solide en pâte à modeler.`,
          `${P} a dessiné ce solide au tableau.`,
          `${P} a trouvé ce solide dans la caisse de jeux.`,
          `La maîtresse montre ce solide à ${P}.`,
          `Le menuisier a taillé ce solide dans du bois.`,
        ]),
        un(["Quel objet a la même forme ?", "Lequel de ces objets lui ressemble ?", "Quel objet pourrait avoir cette forme ?"]),
      ].join(" "),
      ...qcm(o, faux),
      explanation: expl(`Le dessin montre ${s.nom}. ${cap(o)} a la même forme : ${un(s.props)}.`),
      canvas: s.canvas(),
    };
  }
  if (r < 0.55) {
    const o = un(s.objets);
    return {
      text: [
        un([
          `Sur une photo, ${P} voit ${o}.`,
          `${P} dessine ${o} dans son cahier.`,
          `${P} montre ${o} à la classe.`,
          `Dans un livre, ${P} découvre ${o}.`,
          `Pour la kermesse, ${P} apporte ${o}.`,
        ]),
        un(["Quel solide a cette forme ?", "Cet objet a la forme de quel solide ?", "Quel solide lui ressemble ?"]),
      ].join(" "),
      ...qcm(s.nom, VOISINS[s.nom]),
      explanation: expl(`${cap(o)} a ${un(s.props)} : c'est la forme ${s.de}.`),
    };
  }
  if (r < 0.75) {
    // Une propriété en mots — pas de dessin : il donnerait la réponse.
    const p = un(s.props);
    return {
      text: un([
        `Quel solide a ${p} ?`,
        `Je suis un solide. J'ai ${p}. Qui suis-je ?`,
        `${P} cherche un solide qui a ${p}. Lequel ?`,
        `Devinette ${/^[AEIOUÉ]/.test(P) ? "d'" : "de "}${P} : « J'ai ${p}. » Quel solide est-ce ?`,
      ]),
      ...qcm(s.nom, VOISINS[s.nom]),
      explanation: expl(`Avoir ${p}, c'est le propre ${s.de}.`),
    };
  }
  // ★4 : l'intrus. Trois objets ont la forme du solide dessiné, pas le quatrième.
  const bons = melange([...s.objets]).slice(0, 3);
  const v = parNom(un(VOISINS[s.nom]));
  const intrus = un(v.objets);
  return {
    text: un([
      `Trois de ces objets ont la forme ${s.de}. Lequel n'a PAS cette forme ?`,
      `${P} range les objets qui ont la forme ${s.de}. Lequel n'est pas à sa place ?`,
      `Voici ${s.nom}. Quel objet n'a PAS sa forme ?`,
    ]),
    ...qcm(intrus, bons),
    explanation: expl(`${cap(bons.join(", "))} ont la forme ${s.de}. ${cap(intrus)} a la forme ${v.de}.`),
    canvas: s.canvas(),
  };
}

/* ─── Faces, arêtes, sommets : les polyèdres du CE2 ─── */
const POLYS = [
  {
    nom: "le cube", un: "un cube", ce: "ce cube", il: "il", deS: "de cube", canvas: () => solide("cube"),
    faces: 6, aretes: 12, sommets: 8,
    objets: ["un dé à jouer", "un glaçon", "une boîte cadeau", "un bloc de construction"],
  },
  {
    nom: "le pavé droit", un: "un pavé droit", ce: "ce pavé droit", il: "il", deS: "de pavé droit", canvas: () => solide("pave_droit"),
    faces: 6, aretes: 12, sommets: 8,
    objets: ["une boîte de céréales", "une brique de lait", "une boîte à chaussures", "un livre", "une gomme", "un aquarium"],
  },
  {
    nom: "la pyramide à base carrée", un: "une pyramide à base carrée", ce: "cette pyramide", il: "elle", deS: "de pyramide à base carrée",
    canvas: () => solide("pyramide"),
    faces: 5, aretes: 8, sommets: 5,
    objets: ["un chocolat", "un presse-papier", "une bougie", "un toit de cabane"],
  },
  {
    nom: "la pyramide à base triangulaire", un: "une pyramide à base triangulaire", ce: "cette pyramide", il: "elle",
    deS: "de pyramide à base triangulaire",
    canvas: (): Solide3DCanvasData => ({ ...solide("pyramide"), baseTriangulaire: true }),
    faces: 4, aretes: 6, sommets: 4,
    objets: ["un dé à quatre faces", "un bonbon berlingot", "une décoration de sapin"],
  },
] as const;
type Poly = (typeof POLYS)[number];
type Quoi = "faces" | "aretes" | "sommets";
const MOTS: Record<Quoi, { de: string; les: string; mot: string; def: string }> = {
  faces: { de: "de faces", les: "les faces", mot: "faces", def: "une face est une partie plate du solide" },
  aretes: { de: "d'arêtes", les: "les arêtes", mot: "arêtes", def: "une arête est le trait où deux faces se rejoignent" },
  sommets: { de: "de sommets", les: "les sommets", mot: "sommets", def: "un sommet est un coin pointu, où plusieurs arêtes se rejoignent" },
};
const deObjet = (o: string) => o.replace(/^un /, "d'un ").replace(/^une /, "d'une ");

/** Un nombre et ses leurres d'enfant : les deux autres comptes du solide, ±1. */
function choixCompte(s: Poly, q: Quoi, juste: number = s[q]) {
  const autres = (["faces", "aretes", "sommets"] as Quoi[]).filter((x) => x !== q).map((x) => s[x]);
  return qcmN(juste, [...autres, juste + 1, juste - 1, juste + 2]);
}
const explCompte = (s: Poly, q: Quoi, calcul: string) =>
  exp(
    `Sur un solide, ${MOTS[q].def}.`,
    `On compte ${MOTS[q].les} une par une, sans oublier celles qu'on ne voit pas sur le dessin.`,
    calcul,
    `${cap(s.nom)} a ${s.faces} faces, ${s.aretes} arêtes et ${s.sommets} sommets.`,
  );

const GESTES: Record<Quoi, Array<{ geste: string; quoi: string }>> = {
  faces: [
    { geste: "colle une gommette sur chaque face", quoi: "gommettes" },
    { geste: "peint chaque face d'une couleur différente", quoi: "couleurs" },
    { geste: "pose un autocollant sur chaque face", quoi: "autocollants" },
    { geste: "dessine une étoile sur chaque face", quoi: "étoiles" },
  ],
  aretes: [
    { geste: "colle un ruban sur chaque arête", quoi: "rubans" },
    { geste: "repasse chaque arête au feutre, un trait par arête", quoi: "traits" },
    { geste: "pose un fil de laine sur chaque arête", quoi: "fils de laine" },
  ],
  sommets: [
    { geste: "pique une perle sur chaque sommet", quoi: "perles" },
    { geste: "pose une coccinelle sur chaque sommet", quoi: "coccinelles" },
    { geste: "colle une paillette sur chaque sommet", quoi: "paillettes" },
  ],
};
/** [baguettes, boules, « une baguette », « une boule »] : de quoi monter un squelette de solide. */
const MATERIAUX = [
  ["pailles", "boules de pâte", "une paille", "une boule"],
  ["cure-dents", "guimauves", "un cure-dent", "une guimauve"],
  ["bâtonnets", "perles", "un bâtonnet", "une perle"],
  ["spaghettis", "boules d'argile", "un spaghetti", "une boule"],
] as const;

function decrire(d: number): Gen {
  const s: Poly = un(POLYS);
  const q: Quoi = un(["faces", "aretes", "sommets"] as const);
  const v = s[q];
  const P = qui();
  const r = Math.random();
  if (d <= 2) {
    if (r < 0.7) {
      return {
        text: un([
          `Combien ${MOTS[q].de} a ${s.nom} ?`,
          `Regarde ${s.ce}. Combien a-t-${s.il} ${MOTS[q].de} ?`,
          `Compte ${MOTS[q].les} de ${s.ce}. Combien y en a-t-il ?`,
          `Combien ${MOTS[q].de} compte-t-on sur ${s.ce} ?`,
          `Voici ${s.un}. Combien a-t-${s.il} ${MOTS[q].de} ?`,
        ]),
        ...choixCompte(s, q),
        explanation: explCompte(s, q, `${cap(s.nom)} a ${v} ${MOTS[q].mot}.`),
        canvas: s.canvas(),
      };
    }
    // Le compte est donné : quel solide ? (sans dessin, il répondrait.)
    const t: Poly = un([POLYS[0], POLYS[2], POLYS[3]]);
    const n = t[q];
    const noms = POLYS.filter((p) => p !== t && p[q] !== n).map((p) => p.nom as string);
    return {
      text: un([`Quel solide a ${n} ${MOTS[q].mot} ?`, `Je suis un solide avec ${n} ${MOTS[q].mot}. Qui suis-je ?`, `Lequel de ces solides a ${n} ${MOTS[q].mot} ?`]),
      ...qcm(t.nom, [...noms, "le cylindre"]),
      explanation: explCompte(t, q, `${cap(t.nom)} a ${n} ${MOTS[q].mot}.`),
    };
  }
  const o = un(s.objets);
  if (d === 3 || r < 0.2) {
    const g = un(GESTES[q]);
    return {
      text: `${P} ${g.geste} ${deObjet(o)} en forme ${s.deS}. Combien ${/^[aeiouéèh]/i.test(g.quoi) ? "d'" : "de "}${g.quoi} lui faut-il ?`,
      ...choixCompte(s, q),
      explanation: explCompte(s, q, `Il faut autant de ${g.quoi} que ${MOTS[q].de} : ${v}.`),
      canvas: s.canvas(),
    };
  }
  if (r < 0.6) {
    // Le squelette du solide : une baguette par arête, une boule par sommet.
    const [m1, m2, u1, u2] = un(MATERIAUX);
    const enTout = Math.random() < 0.25;
    const qq: Quoi = Math.random() < 0.5 ? "aretes" : "sommets";
    const juste = enTout ? s.aretes + s.sommets : s[qq];
    const mot = qq === "aretes" ? m1 : m2;
    return {
      text: `${P} fabrique ${s.un} avec des ${m1} et des ${m2}. ${cap(u1)} par arête, ${u2} par sommet. ${
        enTout ? `Combien d'objets en tout ?` : `Combien ${/^[aeiouéèh]/i.test(mot) ? "d'" : "de "}${mot} lui faut-il ?`
      }`,
      ...(enTout ? qcmN(juste, [s.aretes, s.sommets, s.faces + s.sommets, juste + 1]) : choixCompte(s, qq)),
      explanation: explCompte(
        s,
        enTout ? "aretes" : qq,
        enTout
          ? `${s.aretes} ${m1} pour les arêtes et ${s.sommets} ${m2} pour les sommets : ${s.aretes} + ${s.sommets} = ${juste}.`
          : `Il faut un objet par ${qq === "aretes" ? "arête" : "sommet"} : ${s[qq]} ${mot}.`,
      ),
      canvas: s.canvas(),
    };
  }
  if (r < 0.85) {
    return {
      text: un([
        `Sur ce dessin, on ne voit pas toutes ${MOTS[q].les} de ${s.ce}. Combien en a-t-${s.il} en tout ?`,
        `${P} compte ${MOTS[q].les} de ${s.ce} sur le dessin. Attention aux cachées ! Combien y en a-t-il ?`,
        `Certaines ${MOTS[q].mot} de ${s.ce} sont cachées derrière. Combien en a-t-${s.il} vraiment ?`,
      ]),
      ...choixCompte(s, q),
      explanation: explCompte(s, q, `Le dessin cache l'arrière du solide. ${cap(s.nom)} a en tout ${v} ${MOTS[q].mot}.`),
      canvas: s.canvas(),
    };
  }
  // Comparer deux solides.
  const [a, b] = melange<Poly>([POLYS[0], POLYS[2], POLYS[3]]).slice(0, 2).sort((x, y) => y[q] - x[q]);
  const ecart = a[q] - b[q];
  return {
    text: un([
      `${P} compare ${a.nom} et ${b.nom}. Combien ${MOTS[q].de} de plus a ${a.nom} ?`,
      `${cap(a.nom)} a combien ${MOTS[q].de} de plus que ${b.nom} ?`,
    ]),
    ...qcmN(ecart, [a[q], b[q], ecart + 1, ecart - 1]),
    explanation: explCompte(a, q, `${cap(a.nom)} a ${a[q]} ${MOTS[q].mot}, ${b.nom} en a ${b[q]} : ${a[q]} - ${b[q]} = ${ecart}.`),
  };
}

/* ─── Les faces d'une pyramide : des triangles ET une base ─── */
type Pyr = { base: string; forme: string; n: number; canvas?: () => Solide3DCanvasData };
const PYRS: Pyr[] = [
  { base: "carrée", forme: "un carré", n: 4, canvas: () => solide("pyramide") },
  { base: "triangulaire", forme: "un triangle", n: 3, canvas: () => ({ ...solide("pyramide"), baseTriangulaire: true }) },
];
const PYRS_MOTS: Pyr[] = [
  { base: "rectangulaire", forme: "un rectangle", n: 4 },
  { base: "à cinq côtés", forme: "un pentagone", n: 5 },
];
const NOMBRE_MOT: Record<number, string> = { 2: "deux", 3: "trois", 4: "quatre", 5: "cinq", 6: "six" };

function facesPyramide(d: number): Gen {
  const P = qui();
  const dessin = d < 4 || Math.random() < 0.7;
  const p = dessin ? un(PYRS) : un(PYRS_MOTS);
  const debut = dessin
    ? un([
        `${P} fabrique cette pyramide en carton.`,
        `Le chocolatier a moulé un chocolat comme cette pyramide.`,
        `Au musée, ${P} observe cette pyramide.`,
        `${P} construit cette pyramide en pâte à modeler.`,
        `La maîtresse pose cette pyramide sur la table.`,
        `${P} peint cette pyramide pour la kermesse.`,
        `L'architecte montre la maquette d'un toit comme cette pyramide.`,
      ])
    : un([
        `${P} imagine une pyramide à base ${p.base}.`,
        `L'architecte dessine une pyramide dont la base est ${p.forme}${p.n === 5 ? " (cinq côtés)" : ""}.`,
        `${P} fabrique une pyramide à base ${p.base}.`,
      ]);
  const natures = (n: number) => (p.n === 3 && n === 3 ? "quatre triangles" : `${p.forme} et ${NOMBRE_MOT[n]} triangles`);
  const juste = natures(p.n);
  const expl = (calcul: string) =>
    exp(
      "Une pyramide a une base et des faces en triangle qui montent jusqu'à la pointe.",
      "Il y a un triangle par côté de la base. On n'oublie pas la base elle-même !",
      calcul,
      `Cette pyramide a ${p.n + 1} faces : ${juste}.`,
    );
  const r = Math.random();
  const canvas = p.canvas ? { canvas: p.canvas() } : {};
  if (r < 0.25) {
    return {
      text: `${debut} ${un(["Combien a-t-elle de faces en triangle ?", "Combien de ses faces sont des triangles ?", "Combien compte-t-elle de triangles ?"])}`,
      ...qcmN(p.n, [p.n + 1, p.n - 1, 2 * p.n]),
      explanation: expl(`La base a ${p.n} côtés, donc il y a ${p.n} triangles.`),
      ...canvas,
    };
  }
  if (r < 0.5) {
    return {
      text: `${debut} ${un(["Combien a-t-elle de faces en tout ?", "Combien de faces faut-il compter en tout ?", "Base comprise, combien a-t-elle de faces ?"])}`,
      ...qcmN(p.n + 1, [p.n, p.n + 2, 2 * p.n]),
      explanation: expl(`${p.n} triangles + 1 base = ${p.n + 1} faces.`),
      ...canvas,
    };
  }
  if (r < 0.7 && p.canvas) {
    return {
      text: `${debut} ${un(["Quelle est la forme de sa base ?", "Sur quelle forme est-elle posée ?", "Quelle forme a la face du dessous ?"])}`,
      ...qcm(p.forme, ["un carré", "un triangle", "un rectangle", "un disque"]),
      explanation: expl(`La face du dessous est ${p.forme}.`),
      ...canvas,
    };
  }
  if (r < 0.85) {
    return {
      text: `${debut} ${un(["De quoi sont faites ses faces ?", "Quelles sont toutes ses faces ?", "Quelles faces faut-il découper pour la fabriquer ?"])}`,
      ...qcm(juste, [
        `${NOMBRE_MOT[p.n + 1]} triangles`,
        `${NOMBRE_MOT[p.n]} triangles`,
        `${p.forme} et ${NOMBRE_MOT[p.n - 1]} triangles`,
        p.forme === "un carré" ? "six carrés" : `un carré et ${NOMBRE_MOT[p.n]} triangles`,
      ]),
      explanation: expl(`Il faut ${juste}.`),
      ...canvas,
    };
  }
  const q: "sommets" | "aretes" = Math.random() < 0.5 || d < 4 ? "sommets" : "aretes";
  const n = q === "sommets" ? p.n + 1 : 2 * p.n;
  return {
    text: `${debut} ${q === "sommets" ? un(["Combien a-t-elle de sommets ?", "Combien a-t-elle de coins pointus, pointe comprise ?"]) : "Combien a-t-elle d'arêtes ?"}`,
    ...qcmN(n, q === "sommets" ? [p.n, p.n + 2, 2 * p.n] : [p.n, p.n + 1, 2 * p.n + 1]),
    explanation: expl(
      q === "sommets"
        ? `Les ${p.n} coins de la base + la pointe = ${n} sommets.`
        : `Les ${p.n} arêtes de la base + les ${p.n} arêtes qui montent à la pointe = ${n} arêtes.`,
    ),
    ...canvas,
  };
}

/* ─── Les patrons de cube : on PLIE vraiment, en roulant le cube ───
   Plier un patron, c'est faire rouler le cube sur ses carrés : en roulant
   vers l'est, la face est se pose au sol. Six faces différentes au sol = un
   patron de cube ; deux fois la même = deux carrés qui se superposent. */
type Case = [number, number];
type V3 = [number, number, number];
const neg = (v: V3): V3 => [-v[0], -v[1], -v[2]];
const cle3 = (v: V3) => v.join(",");
const kc = (c: Case) => c.join(",");

/** La face du cube posée sur chaque carré, ou null si le patron ne se ferme pas. */
function plier(cases: Case[]): string[] | null {
  const faces = new Map<string, string>();
  const dans = new Set(cases.map(kc));
  const pile: Array<{ c: Case; b: V3; n: V3; e: V3 }> = [{ c: cases[0], b: [0, 0, -1], n: [0, 1, 0], e: [1, 0, 0] }];
  faces.set(kc(cases[0]), cle3([0, 0, -1]));
  while (pile.length) {
    const { c, b, n, e } = pile.pop()!;
    const pas: Array<[Case, V3, V3, V3]> = [
      [[c[0], c[1] + 1], e, n, neg(b)], // vers l'est
      [[c[0], c[1] - 1], neg(e), n, b], // vers l'ouest
      [[c[0] - 1, c[1]], n, neg(b), e], // vers le nord
      [[c[0] + 1, c[1]], neg(n), b, e], // vers le sud
    ];
    for (const [v, nb, nn, ne] of pas) {
      if (!dans.has(kc(v)) || faces.has(kc(v))) continue;
      faces.set(kc(v), cle3(nb));
      pile.push({ c: v, b: nb, n: nn, e: ne });
    }
  }
  const res = cases.map((c) => faces.get(kc(c))!);
  return new Set(res).size === 6 ? res : null;
}

/** Six carrés collés par un côté, tirés au hasard (4 lignes × 5 colonnes au plus). */
function hexomino(): Case[] {
  for (;;) {
    const cs: Case[] = [[0, 0]];
    while (cs.length < 6) {
      const [r, c] = un(cs);
      const v = un<Case>([[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]);
      if (!cs.some((x) => kc(x) === kc(v))) cs.push(v);
    }
    const r0 = Math.min(...cs.map((x) => x[0]));
    const c0 = Math.min(...cs.map((x) => x[1]));
    let n: Case[] = cs.map(([r, c]) => [r - r0, c - c0]);
    const h = Math.max(...n.map((x) => x[0])) + 1;
    const w = Math.max(...n.map((x) => x[1])) + 1;
    if (h > w) n = n.map(([r, c]) => [c, r]);
    if (Math.max(h, w) <= 5 && Math.min(h, w) <= 4) return n.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  }
}
const forme = (cs: Case[]) => cs.map(kc).sort().join(";");
function unPatron(valide: boolean, eviter: string[] = []): Case[] {
  for (;;) {
    const h = hexomino();
    if ((plier(h) !== null) === valide && !eviter.includes(forme(h))) return h;
  }
}
const patrons = (liste: PatronsCubeCanvasData["patrons"]): PatronsCubeCanvasData => ({ kind: "patrons_cube", patrons: liste });
const surQuadrillage = (cs: Case[]): FigureLibreCanvasData => {
  const h = Math.max(...cs.map((c) => c[0])) + 1;
  const w = Math.max(...cs.map((c) => c[1])) + 1;
  return {
    kind: "figure_libre",
    grid: { rows: h + 2, cols: w + 2, filledCells: cs.map(([r, c]) => [r + 1, c + 1] as [number, number]) },
    display: { showGrid: true, showFilled: true, showPerimeter: false },
  };
};

const OUI_PATRON = "oui, il se referme en cube";
const NON_PATRON = "non, deux carrés se retrouvent l'un sur l'autre";
const explPatron = (calcul: string, conclusion: string) =>
  exp(
    "Un patron de cube, ce sont six carrés qui, une fois pliés, ferment le cube sans trou ni carré en double.",
    "On choisit un carré pour le fond, puis on replie les autres autour, un par un, dans sa tête.",
    calcul,
    conclusion,
  );

function patronUn(d: number): Gen {
  const P = qui();
  const valide = Math.random() < 0.5;
  const cs = unPatron(valide);
  return {
    text: [
      d <= 3 && Math.random() < 0.4
        ? un(["Voici six carrés collés.", "Regarde ces six carrés."])
        : un([
            `${P} découpe ce patron et le plie.`,
            `${P} a dessiné ces six carrés sur du carton.`,
            `Pour la kermesse, ${P} veut fabriquer une boîte en forme de cube.`,
            `La maîtresse donne ce patron à ${P}.`,
            `Le chef pâtissier découpe ce carton pour une boîte à gâteau.`,
          ]),
      un(["Obtient-on un cube ?", "Peut-on fermer un cube avec ?", "Est-ce un patron de cube ?"]),
    ].join(" "),
    ...qcm(valide ? OUI_PATRON : NON_PATRON, [OUI_PATRON, NON_PATRON, "non, il manque un carré", "non, il y a un carré en trop"]),
    explanation: explPatron(
      valide
        ? "En repliant les carrés autour du fond, chacun trouve sa place : dessous, dessus et les quatre côtés."
        : "En repliant, deux carrés viennent se poser au même endroit, et une face du cube reste ouverte.",
      valide ? "C'est un patron de cube." : "Ce n'est pas un patron de cube.",
    ),
    // Un patron seul se dessine sur le quadrillage, en grand : le canvas des patrons le rendait à 112 px de large.
    canvas: surQuadrillage(cs),
  };
}

function patronTrois(): Gen {
  const P = qui();
  const chercheBon = Math.random() < 0.6;
  const intrus = unPatron(chercheBon);
  const a1 = unPatron(!chercheBon);
  const a2 = unPatron(!chercheBon, [forme(a1)]);
  const ordre = melange([intrus, a1, a2]);
  const noms = ["A", "B", "C"];
  const lettre = noms[ordre.indexOf(intrus)];
  const juste = `le patron ${lettre}`;
  return {
    text: [
      un([`${P} a dessiné trois patrons.`, "Voici trois assemblages de six carrés.", `Pour son atelier, ${P} prépare trois patrons.`, "Regarde ces trois dessins."]),
      chercheBon
        ? un(["Lequel est un patron de cube ?", "Lequel se replie en cube ?", "Avec lequel peut-on fermer un cube ?"])
        : un(["Lequel NE se replie PAS en cube ?", "Lequel n'est pas un patron de cube ?", "Avec lequel ne peut-on PAS fermer un cube ?"]),
    ].join(" "),
    ...qcm(juste, noms.map((n) => `le patron ${n}`)),
    explanation: explPatron(
      chercheBon
        ? `Seul le patron ${lettre} se replie sans que deux carrés se superposent.`
        : `Les deux autres se ferment bien. Le patron ${lettre}, lui, pose deux carrés au même endroit.`,
      `C'est ${juste}.`,
    ),
    canvas: patrons(ordre.map((cases, i) => ({ nom: noms[i], cases }))),
  };
}

/** Un dé déplié : les nombres sont posés au hasard, il faut PLIER pour trouver la face d'en face. */
function patronDe(): Gen {
  const P = qui();
  const cs = unPatron(true);
  const f = plier(cs)!;
  const nombres = melange([1, 2, 3, 4, 5, 6]);
  const i = Math.floor(Math.random() * 6);
  const opp = f.findIndex((x) => x === cle3(neg(f[i].split(",").map(Number) as V3)));
  const juste = nombres[opp];
  const faux = nombres.filter((_, j) => j !== i && j !== opp);
  return {
    text: [
      un([`${P} fabrique un dé avec ce patron.`, "On plie ce patron pour faire un dé.", `${P} découpe ce patron de dé.`, `Pour le jeu de l'oie, ${P} fabrique un dé tout neuf.`]),
      un([`Quel nombre sera en face du ${nombres[i]} ?`, `Quand le dé est fermé, quel nombre est opposé au ${nombres[i]} ?`, `Si le ${nombres[i]} est dessous, quel nombre est dessus ?`]),
    ].join(" "),
    ...qcm(String(juste), faux.map(String)),
    explanation: explPatron(
      `On pose le ${nombres[i]} au fond et on replie les autres carrés. Ceux qui touchent le ${nombres[i]} deviennent les côtés ; celui qui reste vient en face : le ${juste}.`,
      `En face du ${nombres[i]}, il y a le ${juste}.`,
    ),
    canvas: patrons([{ cases: cs, textes: cs.map((c, j) => ({ case: c, texte: String(nombres[j]) })) }]),
  };
}

/** Il manque un carré : où le coller ? Une seule des trois places ferme le cube. */
function patronManque(): Gen {
  const P = qui();
  for (;;) {
    const net = unPatron(true);
    const enleve = Math.floor(Math.random() * 6);
    const cinq = net.filter((_, j) => j !== enleve);
    // Les cinq carrés restants doivent rester collés.
    const vus = new Set([kc(cinq[0])]);
    const file = [cinq[0]];
    while (file.length) {
      const [r, c] = file.pop()!;
      for (const v of cinq)
        if (!vus.has(kc(v)) && Math.abs(v[0] - r) + Math.abs(v[1] - c) === 1) {
          vus.add(kc(v));
          file.push(v);
        }
    }
    if (vus.size !== 5) continue;
    const voisins = new Map<string, Case>();
    for (const [r, c] of cinq)
      for (const v of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]] as Case[])
        if (!cinq.some((x) => kc(x) === kc(v))) voisins.set(kc(v), v);
    const bons = [...voisins.values()].filter((v) => plier([...cinq, v]) !== null);
    const mauvais = [...voisins.values()].filter((v) => plier([...cinq, v]) === null);
    if (bons.length < 1 || mauvais.length < 2) continue;
    const places = melange([un(bons), ...melange(mauvais).slice(0, 2)]);
    const toutes = [...cinq, ...places];
    const larg = Math.max(...toutes.map((x) => x[1])) - Math.min(...toutes.map((x) => x[1]));
    const haut = Math.max(...toutes.map((x) => x[0])) - Math.min(...toutes.map((x) => x[0]));
    if (Math.max(larg, haut) > 4 || Math.min(larg, haut) > 3) continue;
    const noms = ["A", "B", "C"];
    const lettre = noms[places.findIndex((p) => plier([...cinq, p]) !== null)];
    const juste = `à la place ${lettre}`;
    return {
      text: [
        un([`${P} a perdu un carré de son patron de cube.`, "Il manque un carré à ce patron de cube.", `${P} doit coller un sixième carré.`]),
        un(["Où faut-il l'ajouter ?", "À quelle place faut-il le coller pour fermer le cube ?", "Quelle place permet d'obtenir un cube ?"]),
      ].join(" "),
      ...qcm(juste, noms.map((n) => `à la place ${n}`)),
      explanation: explPatron(
        `Collé en ${lettre}, le sixième carré ferme la face qui restait ouverte. Aux deux autres places, il se poserait sur un carré déjà là.`,
        `Il faut le coller ${juste}.`,
      ),
      canvas: patrons([{ cases: cinq, places: places.map((p, j) => ({ case: p, texte: noms[j] })) }]),
    };
  }
}

function patronRiche(d: number): Gen {
  const r = Math.random();
  if (d <= 3) return r < 0.55 ? patronUn(d) : patronTrois();
  if (r < 0.15) return patronUn(d);
  if (r < 0.4) return patronTrois();
  if (r < 0.75) return patronDe();
  return patronManque();
}

/* ─── Les défis ─── */
function defi(): Gen {
  const r = Math.random();
  if (r < 0.25) return decrire(4);
  if (r < 0.45) return patronDe();
  if (r < 0.6) return patronManque();
  if (r < 0.75) return facesPyramide(5);
  // Le squelette est donné : quel solide ?
  const P = qui();
  const s: Poly = un(POLYS);
  const [m1, m2] = un(MATERIAUX);
  const noms = POLYS.filter((p) => p !== s && !(p.aretes === s.aretes && p.sommets === s.sommets)).map((p) => p.un as string);
  return {
    text: `${P} a utilisé ${s.aretes} ${m1} pour les arêtes et ${s.sommets} ${m2} pour les sommets. Quel solide a-t-${P === "Pic le paille-en-queue" ? "il" : "on"} construit ?`,
    ...qcm(s.un, [...noms, "un cylindre"]),
    explanation: explCompte(s, "aretes", `${s.aretes} arêtes et ${s.sommets} sommets : c'est ${s.un}.`),
  };
}

const RICHE: Record<string, (d: number) => Gen> = {
  ce2_solide_reconnaitre: reconnaitre,
  ce2_solide_decrire: decrire,
  ce2_solide_faces_pyramide: facesPyramide,
  ce2_solide_patron: patronRiche,
  ce2_solide_defi: () => defi(),
};
const AIDE: Record<string, string> = {
  ce2_solide_reconnaitre: "Regarde les faces : plates ou rondes ? carrées, en triangle ? Y a-t-il une pointe ?",
  ce2_solide_decrire: "Face = partie plate, arête = trait entre deux faces, sommet = coin pointu. Pense aux cachées !",
  ce2_solide_faces_pyramide: "Un triangle par côté de la base… et n'oublie pas la base !",
  ce2_solide_patron: "Choisis un carré pour le fond, puis replie les autres autour, un par un.",
  ce2_solide_defi: "Prends ton temps : une arête, un sommet, une face à la fois.",
};
/** L'ancien générateur garde une part : il posait des questions justes, mais trop peu. */
const PART_ANCIENNE = 0.15;
// ⛔ Servis à 0 : `reconnaitre_tpl_1` dessinait le solide dont il demandait le nom, `faces_pyramide_tpl_2` mêlait
// des réponses en oui/non aux formes (« un carré / non, toutes sont des triangles »).
const ECARTES = new Set(["ce2_solide_reconnaitre_tpl_1", "ce2_solide_faces_pyramide_tpl_2"]);

function nouveau(id: string, microId: string, difficulty: 1 | 2 | 3 | 4 | 5): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "ce2",
    matiere: "maths",
    notionId: "solides",
    microId,
    difficulty,
    theme: "neutral",
    hint: AIDE[microId],
    tags: ["ce2", "solides", "template", "canvas"],
    generate: () => RICHE[microId](difficulty),
  };
}

export const solidesBank: TutorBankItemV4[] = [
  ...solidesBase.map((it): TutorBankItemV4 => {
    if (it.kind !== "template" || !RICHE[it.microId]) return it;
    const ancien = it.generate;
    const d = it.difficulty;
    return {
      ...it,
      hint: AIDE[it.microId],
      generate: (ctx) => (!ECARTES.has(it.id) && Math.random() < PART_ANCIENNE ? ancien(ctx) : RICHE[it.microId](d)),
    };
  }),
  // ★2 de « décrire » n'avait que deux items figés : rien ne s'y renouvelait.
  nouveau("ce2_solide_decrire_tpl_4", "ce2_solide_decrire", 2),
];
