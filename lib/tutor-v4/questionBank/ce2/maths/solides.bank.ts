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

export const solidesBank: TutorBankItemV4[] = [
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
    canvas: solide("cube"),
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
    canvas: solide("pave_droit"),
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
    canvas: solide("boule"),
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
        text: `Combien ${s.nom} a-t-il de ${quoi} ?`,
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
    canvas: solide("pave_droit"),
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
        canvas: solide(s.canvas),
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
