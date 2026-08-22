// ─── La vision dans l'espace (6e) ──────────────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). « La vision dans l'espace » est
// l'un des deux chapitres du domaine « Espace et géométrie » du programme de 6e
// — l'autre étant l'étude de configurations planes. Le coach n'en avait AUCUNE
// micro. Le canvas `solide_3d` savait pourtant déjà dessiner un assemblage de
// cubes en perspective, cube par cube.
//
// L'objectif, mot pour mot (Exemples pour la mise en œuvre des programmes, 6e,
// 2025, p. 16) : « Voir dans l'espace des assemblages de cubes ».
//
// Et ce que le BO en attend :
//   · « interpréter différentes représentations planes d'un assemblage de
//     cubes : dessin à main levée, perspective cavalière, patron » ;
//   · « tracer les différentes vues de cet assemblage : vue de dessus, vue de
//     face, vue de gauche, vue de droite » ;
//   · « inversement, quatre vues étant fournies, choisir parmi plusieurs
//     assemblages celui qui leur correspond » ;
//   · « résoudre des problèmes de dénombrement comme la recherche du nombre de
//     cubes dans un empilement ».
//
// ⭐ CE QUI SE JOUE ICI ET NULLE PART AILLEURS : les cubes qu'on ne VOIT pas.
// Un empilement dessiné en perspective cache des cubes derrière et dessous ;
// l'élève qui compte les faces visibles se trompe toujours. La parade est de
// compter PAR ÉTAGES, et c'est ce que `vision_denombrer` fait travailler.
//
// ⚠️ UNE VUE NE DIT PAS TOUT, ET C'EST LE DÉFI DE LA NOTION : deux assemblages
// différents peuvent avoir exactement les mêmes quatre vues, parce qu'un cube
// caché ne se voit sur aucune d'elles.
//
// ⚠️ « Vue de face », « vue de gauche » : sur un dessin isométrique, rien ne dit
// où est la face. Chaque énoncé précise donc ce qu'on regarde — « la longueur
// et la hauteur » — au lieu de compter sur une orientation implicite.

import type { TutorBankItemV4, Solide3DCanvasData, FigureLibreCanvasData } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : un assemblage de cubes se représente en perspective, et se décrit par ses quatre vues — dessus, face, gauche, droite.\n\n" +
    "Méthode : pour compter les cubes, on procède étage par étage, sans oublier ceux qu'on ne voit pas.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

type Cube = { x: number; y: number; z: number };

/**
 * Un assemblage de cubes en perspective.
 *
 * ⚠️ `showLabels` est à FAUX par défaut ici : le canvas écrit sinon le nombre de
 * cubes sous la figure, ce qui donnerait la réponse de toutes les questions de
 * dénombrement.
 */
function assemblage(cubes: Cube[], opts: { compte?: boolean } = {}): Solide3DCanvasData {
  return {
    kind: "solide_3d",
    solide: "assemblage_cubes",
    cubes,
    display: { showLabels: opts.compte ?? false, showUnitCubes: true },
  };
}

/** Un pavé plein de L × l × h cubes. */
function pave(L: number, l: number, h: number): Cube[] {
  const cubes: Cube[] = [];
  for (let x = 0; x < L; x++)
    for (let y = 0; y < l; y++) for (let z = 0; z < h; z++) cubes.push({ x, y, z });
  return cubes;
}

/** Une vue, dessinée à plat sur un quadrillage — c'est ce que l'élève trace. */
function vue(rows: number, cols: number, cells: [number, number][]): FigureLibreCanvasData {
  return {
    kind: "figure_libre",
    size: { cellSize: 30 },
    grid: { rows, cols, filledCells: cells },
    display: { showGrid: true, showFilled: true, showPerimeter: false },
  };
}

// L'escalier de trois marches : 1 + 2 + 3 = 6 cubes, tous visibles.
const escalier: Cube[] = [
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 2, y: 0, z: 0 },
  { x: 1, y: 0, z: 1 },
  { x: 2, y: 0, z: 1 },
  { x: 2, y: 0, z: 2 },
];

// La tour en L : un cube se cache derrière, on ne le voit pas de face.
const enL: Cube[] = [
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: 2 },
];

export const visionEspaceBank: TutorBankItemV4[] = [
  // =========================
  // VISION_VUES — dessus, face, gauche, droite
  // =========================
  {
    kind: "fixed",
    id: "vision_vues_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 2,
    theme: "neutral",
    text: "Un pavé est formé de cubes : 4 de long, 3 de large, 2 de haut. Sa vue de dessus est un rectangle. Combien de carreaux contient-elle ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Vue de dessus : on ne voit que la longueur et la largeur.",
    explanation: expl(
      "Vue de dessus, on regarde le pavé d'en haut : on voit un rectangle de 4 sur 3, soit 4 × 3 = 12 carreaux. La hauteur, elle, ne se voit pas de dessus."
    ),
    tags: ["vision_espace", "vues", "canvas", "short"],
    canvas: assemblage(pave(4, 3, 2)),
  },
  {
    kind: "fixed",
    id: "vision_vues_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 2,
    theme: "neutral",
    text: "Le même pavé (4 de long, 3 de large, 2 de haut) est regardé de face, c'est-à-dire en voyant sa longueur et sa hauteur. Combien de carreaux contient cette vue ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "De face, on voit la longueur et la hauteur.",
    explanation: expl(
      "De face, on voit un rectangle de 4 de long sur 2 de haut : 4 × 2 = 8 carreaux. La largeur disparaît, elle part vers l'arrière."
    ),
    tags: ["vision_espace", "vues", "canvas", "short"],
    canvas: vue(2, 4, [
      [0, 0], [0, 1], [0, 2], [0, 3],
      [1, 0], [1, 1], [1, 2], [1, 3],
    ]),
  },
  {
    kind: "fixed",
    id: "vision_vues_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 3,
    theme: "neutral",
    text: "Toujours le même pavé (4 de long, 3 de large, 2 de haut). Combien de carreaux contient sa vue de droite, où l'on voit la largeur et la hauteur ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "De droite, on voit la largeur et la hauteur.",
    explanation: expl(
      "De droite, on voit un rectangle de 3 de large sur 2 de haut : 3 × 2 = 6 carreaux. C'est la longueur qui, cette fois, part vers l'arrière."
    ),
    tags: ["vision_espace", "vues", "short"],
  },
  {
    kind: "fixed",
    id: "vision_vues_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 3,
    theme: "neutral",
    text: "Pour un pavé plein, quelles vues ont toujours les mêmes dimensions ?",
    format: "qcm",
    choices: [
      "la vue de gauche et la vue de droite",
      "la vue de dessus et la vue de face",
      "la vue de face et la vue de droite",
      "aucune : les quatre vues sont toujours différentes",
    ],
    expected: ["la vue de gauche et la vue de droite"],
    comparator: "mcq_exact",
    hint: "Ce sont les deux faces opposées d'un même pavé.",
    explanation: expl(
      "La vue de gauche et la vue de droite montrent deux faces opposées du pavé, qui sont identiques : largeur × hauteur dans les deux cas. Sur un pavé plein, la vue de dessus et la vue de dessous le sont aussi."
    ),
    tags: ["vision_espace", "vues", "qcm"],
  },
  {
    kind: "fixed",
    id: "vision_vues_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 4,
    theme: "neutral",
    text: "Observe l'assemblage en escalier. Combien de carreaux contient sa vue de dessus ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Vu d'en haut, une colonne de cubes empilés ne fait qu'un seul carreau.",
    explanation: expl(
      "L'escalier occupe trois colonnes, les unes derrière les autres sur une seule rangée. Vu de dessus, chaque colonne — quelle que soit sa hauteur — ne donne qu'un carreau : la vue de dessus contient donc 3 carreaux, alors que l'assemblage compte 6 cubes."
    ),
    tags: ["vision_espace", "vues", "canvas", "short"],
    canvas: assemblage(escalier),
  },
  {
    kind: "template",
    id: "vision_vues_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque vue ne montre que DEUX des trois dimensions.",
    tags: ["vision_espace", "vues", "template"],
    generate: () => {
      const L = randomInt(2, 6);
      const l = randomInt(2, 5);
      const h = randomInt(2, 4);
      const vues = [
        { nom: "de dessus, où l'on voit la longueur et la largeur", n: L * l, a: L, b: l },
        { nom: "de face, où l'on voit la longueur et la hauteur", n: L * h, a: L, b: h },
        { nom: "de droite, où l'on voit la largeur et la hauteur", n: l * h, a: l, b: h },
      ];
      const v = vues[randomInt(0, vues.length - 1)];
      return {
        text: `Un pavé est formé de cubes : ${L} de long, ${l} de large, ${h} de haut. Combien de carreaux contient sa vue ${v.nom} ?`,
        format: "short",
        expected: [String(v.n)],
        comparator: "number_equal",
        explanation: expl(
          `Cette vue montre un rectangle de ${v.a} sur ${v.b}, soit ${v.a} × ${v.b} = ${v.n} carreaux. La troisième dimension part vers l'arrière et ne se voit pas.`
        ),
        canvas: assemblage(pave(L, l, h)),
      };
    },
  },
  {
    kind: "template",
    id: "vision_vues_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis ce que chaque vue montre, et ce qu'elle perd.",
    tags: ["vision_espace", "vues", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi une vue d'un assemblage ne montre jamais que deux des trois dimensions.",
          mots: ["profondeur", "arrière", "arriere", "deux", "troisième", "troisieme", "plat"],
          r: "Une vue est un dessin PLAT : elle n'a que deux directions, une largeur et une hauteur sur la feuille. La troisième dimension de l'objet part vers l'arrière, dans la direction du regard, et se retrouve écrasée. C'est pour cela qu'il faut plusieurs vues pour décrire un assemblage.",
        },
        {
          q: "Explique pourquoi la vue de dessus d'un escalier de cubes contient moins de carreaux qu'il n'y a de cubes.",
          mots: ["colonne", "empilés", "empiles", "au-dessus", "un seul", "cachent"],
          r: "Vu d'en haut, tous les cubes d'une même colonne se cachent les uns les autres : la colonne entière ne laisse voir qu'un seul carreau, qu'elle contienne un cube ou cinq. La vue de dessus compte donc les colonnes, pas les cubes.",
        },
        {
          q: "Explique pourquoi la vue de gauche et la vue de droite d'un pavé plein ont les mêmes dimensions.",
          mots: ["opposées", "opposees", "faces", "identiques", "largeur", "hauteur"],
          r: "Ce sont les deux faces opposées du pavé, et dans un pavé les faces opposées sont identiques : toutes deux mesurent la largeur sur la hauteur. Les deux vues ont donc le même nombre de carreaux — même si, sur un assemblage creux, l'image dessinée peut différer.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // VISION_DENOMBRER — et surtout les cubes qu'on ne voit pas
  // =========================
  {
    kind: "fixed",
    id: "vision_denombrer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 2,
    theme: "neutral",
    text: "Un pavé plein est formé de cubes : 3 de long, 2 de large, 2 de haut. Combien de cubes contient-il ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Compte un étage, puis multiplie par le nombre d'étages.",
    explanation: expl(
      "Un étage contient 3 × 2 = 6 cubes. Il y a 2 étages, donc 6 × 2 = 12 cubes au total. On peut aussi écrire directement 3 × 2 × 2 = 12."
    ),
    tags: ["vision_espace", "denombrer", "canvas", "short"],
    canvas: assemblage(pave(3, 2, 2)),
  },
  {
    kind: "fixed",
    id: "vision_denombrer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 3,
    theme: "neutral",
    text: "Observe l'assemblage en escalier. Combien de cubes le composent ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Compte étage par étage : combien au rez-de-chaussée, puis au-dessus ?",
    explanation: expl(
      "Étage du bas : 3 cubes. Étage du milieu : 2 cubes. Étage du haut : 1 cube. Total : 3 + 2 + 1 = 6 cubes."
    ),
    tags: ["vision_espace", "denombrer", "canvas", "short"],
    canvas: assemblage(escalier),
  },
  {
    kind: "fixed",
    id: "vision_denombrer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un empilement dessiné en perspective, pourquoi ne peut-on pas compter les cubes en comptant les faces visibles ?",
    format: "qcm",
    choices: [
      "parce que certains cubes sont cachés derrière ou dessous les autres",
      "parce qu'un cube montre toujours trois faces",
      "parce que le dessin déforme les longueurs",
      "parce que les cubes du haut sont plus petits",
    ],
    expected: ["parce que certains cubes sont cachés derrière ou dessous les autres"],
    comparator: "mcq_exact",
    hint: "Un empilement a un intérieur, et l'intérieur ne se voit pas.",
    explanation: expl(
      "Un empilement cache des cubes : ceux du fond, ceux des étages inférieurs, ceux du milieu. Compter ce qu'on voit donne toujours un nombre trop petit. La parade est de compter ÉTAGE PAR ÉTAGE, en se demandant chaque fois combien de cubes soutiennent l'étage du dessus."
    ),
    tags: ["vision_espace", "denombrer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "vision_denombrer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 4,
    theme: "neutral",
    text: "Un empilement a 3 étages : 9 cubes au rez-de-chaussée, 4 au premier, 1 au second. Combien de cubes en tout ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "On additionne les étages.",
    explanation: expl("9 + 4 + 1 = 14 cubes. Compter par étages évite d'oublier ceux du fond."),
    tags: ["vision_espace", "denombrer", "short"],
  },
  {
    kind: "template",
    id: "vision_denombrer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 3,
    theme: "neutral",
    hint: "Un étage, puis le nombre d'étages.",
    tags: ["vision_espace", "denombrer", "template"],
    generate: () => {
      const L = randomInt(2, 5);
      const l = randomInt(2, 4);
      const h = randomInt(2, 4);
      return {
        text: `Un pavé plein est formé de cubes : ${L} de long, ${l} de large, ${h} de haut. Combien de cubes contient-il ?`,
        format: "short",
        expected: [String(L * l * h)],
        comparator: "number_equal",
        explanation: expl(
          `Un étage contient ${L} × ${l} = ${L * l} cubes, et il y a ${h} étages : ${L * l} × ${h} = ${L * l * h} cubes.`
        ),
        canvas: assemblage(pave(L, l, h)),
      };
    },
  },
  {
    kind: "template",
    id: "vision_denombrer_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les étages, du bas vers le haut.",
    tags: ["vision_espace", "denombrer", "template"],
    generate: () => {
      const n = randomInt(3, 5);
      const etages: number[] = [];
      for (let i = n; i >= 1; i--) etages.push(i * i);
      const total = etages.reduce((a, b) => a + b, 0);
      return {
        text: `Un empilement en pyramide a ${n} étages : ${etages.map((e) => `${e}`).join(", puis ")} cubes en montant. Combien de cubes en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: expl(
          `On additionne les étages : ${etages.join(" + ")} = ${total} cubes. Chaque étage est un carré de côté décroissant.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "vision_denombrer_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 5,
    theme: "neutral",
    hint: "Décris une méthode qui ne dépend pas de ce qu'on voit.",
    tags: ["vision_espace", "denombrer", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique comment compter les cubes d'un empilement sans oublier ceux qui sont cachés.",
          mots: ["étage", "etage", "additionne", "par étages", "rez", "colonne"],
          r: "On ne compte pas ce qu'on voit, on compte par ÉTAGES : combien de cubes au rez-de-chaussée, combien au premier, combien au second, puis on additionne. Chaque cube d'un étage supérieur en repose forcément sur un autre, ce qui permet de retrouver ceux du fond même sans les voir.",
        },
        {
          q: "Un élève compte 9 cubes sur un dessin, mais l'assemblage en contient 14. Explique d'où vient l'écart.",
          mots: ["cachés", "caches", "derrière", "derriere", "dessous", "voit"],
          r: "Il a compté les cubes VISIBLES. Les autres sont cachés derrière ceux du premier plan ou dessous ceux du dessus : le dessin ne les montre pas, mais ils sont là — sans eux, l'empilement s'effondrerait. Il faut donc raisonner sur la structure, pas sur l'image.",
        },
        {
          q: "Explique pourquoi le nombre de cubes d'un pavé plein se calcule en multipliant ses trois dimensions.",
          mots: ["étage", "etage", "multiplie", "rectangle", "hauteur", "trois"],
          r: "Un étage est un rectangle de cubes : il en contient longueur × largeur. Tous les étages sont identiques, et il y en a autant que la hauteur. On multiplie donc le nombre de cubes d'un étage par le nombre d'étages, ce qui revient à multiplier les trois dimensions.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // VISION_REPRESENTATION — perspective, main levée, patron
  // =========================
  {
    kind: "fixed",
    id: "vision_representation_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une représentation en perspective cavalière, comment dessine-t-on les arêtes cachées ?",
    format: "qcm",
    choices: [
      "en pointillés",
      "en trait épais",
      "on ne les dessine pas du tout",
      "en rouge",
    ],
    expected: ["en pointillés"],
    comparator: "mcq_exact",
    hint: "Il faut qu'on les devine sans les confondre avec les autres.",
    explanation: expl(
      "Les arêtes cachées se tracent en POINTILLÉS : elles existent sur le solide mais on ne les verrait pas en vrai. Le pointillé permet de les montrer sans laisser croire qu'elles sont visibles."
    ),
    tags: ["vision_espace", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "vision_representation_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de carrés compte le patron d'un cube ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Autant que le cube a de faces.",
    explanation: expl(
      "Un cube a 6 faces carrées, donc son patron est fait de 6 carrés. Ils peuvent être disposés de plusieurs façons — il existe onze patrons différents du cube — mais il y en a toujours six."
    ),
    tags: ["vision_espace", "representation", "short"],
  },
  {
    kind: "fixed",
    id: "vision_representation_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une perspective cavalière d'un cube, les faces qui sont des carrés en réalité sont dessinées…",
    format: "qcm",
    choices: [
      "certaines en carré, d'autres en parallélogramme penché",
      "toutes en carré, sans exception",
      "toutes en parallélogramme",
      "toutes en rectangle",
    ],
    expected: ["certaines en carré, d'autres en parallélogramme penché"],
    comparator: "mcq_exact",
    hint: "Regarde les faces de côté sur un dessin de cube.",
    explanation: expl(
      "La face de devant se dessine en vrai carré, mais les faces qui partent vers l'arrière sont penchées : elles deviennent des parallélogrammes. C'est le prix à payer pour représenter du volume sur une feuille plate — le dessin ne conserve pas les angles."
    ),
    tags: ["vision_espace", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "vision_representation_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle représentation permet de LIRE directement le nombre de cubes d'une colonne ?",
    format: "qcm",
    choices: [
      "la vue de face ou de côté, où les étages se comptent",
      "la vue de dessus, qui montre toutes les colonnes",
      "le patron, qui montre toutes les faces",
      "aucune : il faut toujours manipuler l'assemblage",
    ],
    expected: ["la vue de face ou de côté, où les étages se comptent"],
    comparator: "mcq_exact",
    hint: "Quelle vue montre la hauteur ?",
    explanation: expl(
      "La hauteur ne se voit ni de dessus ni sur un patron. Ce sont les vues de face, de gauche et de droite qui la montrent : on y compte les étages d'une colonne directement. La vue de dessus, elle, dit où sont les colonnes, pas leur hauteur."
    ),
    tags: ["vision_espace", "representation", "qcm"],
  },
  {
    kind: "template",
    id: "vision_representation_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les faces du solide.",
    tags: ["vision_espace", "representation", "template"],
    generate: () => {
      const solides = [
        { nom: "un cube", faces: 6, detail: "6 faces carrées" },
        { nom: "un pavé droit", faces: 6, detail: "6 faces rectangulaires, égales deux à deux" },
        { nom: "une pyramide à base carrée", faces: 5, detail: "1 base carrée et 4 faces triangulaires" },
        { nom: "un prisme droit à base triangulaire", faces: 5, detail: "2 bases triangulaires et 3 faces rectangulaires" },
      ];
      const s = solides[randomInt(0, solides.length - 1)];
      return {
        text: `Combien de faces compte le patron de ${s.nom} ?`,
        format: "short",
        expected: [String(s.faces)],
        comparator: "number_equal",
        explanation: expl(
          `Le patron contient autant de morceaux que le solide a de faces : ${s.detail}, soit ${s.faces} faces.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "vision_representation_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis ce que chaque représentation garde, et ce qu'elle perd.",
    tags: ["vision_espace", "representation", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi un cube dessiné en perspective ne montre pas six carrés.",
          mots: ["parallélogramme", "parallelogramme", "penchée", "penchee", "plat", "déforme", "deforme"],
          r: "Une feuille est plate : pour donner l'illusion du volume, on penche les faces qui partent vers l'arrière, et un carré penché devient un parallélogramme. Le dessin conserve le nombre de faces et les arêtes parallèles, mais pas les angles droits.",
        },
        {
          q: "Explique la différence entre un patron et une perspective cavalière.",
          mots: ["plié", "plie", "à plat", "a plat", "volume", "faces", "illusion"],
          r: "Le patron est le solide DÉPLIÉ à plat : toutes les faces y sont en vraie grandeur, mais on ne voit plus le volume. La perspective cavalière montre au contraire le solide en volume, mais elle déforme les faces qui partent vers l'arrière. L'une sert à construire, l'autre à comprendre la forme.",
        },
        {
          q: "Explique pourquoi il faut plusieurs vues pour décrire un assemblage de cubes sans ambiguïté.",
          mots: ["une seule", "cachés", "caches", "hauteur", "dessus", "plusieurs"],
          r: "Chaque vue perd une dimension : celle de dessus ne dit rien des hauteurs, celles de face et de côté ne disent pas où sont les colonnes. Une seule vue laisse donc plusieurs assemblages possibles. En les croisant, on lève presque toute l'ambiguïté — presque, car un cube complètement caché reste invisible sur les quatre.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // VISION_DEFI
  // =========================
  {
    kind: "fixed",
    id: "vision_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux assemblages de cubes différents peuvent-ils avoir exactement les mêmes quatre vues (dessus, face, gauche, droite) ?",
    format: "qcm",
    choices: [
      "oui : un cube complètement caché ne se voit sur aucune des quatre vues",
      "non : quatre vues décrivent toujours un seul assemblage",
      "oui, mais seulement si les assemblages sont des pavés",
      "non, sauf si on ajoute la vue de dessous",
    ],
    expected: ["oui : un cube complètement caché ne se voit sur aucune des quatre vues"],
    comparator: "mcq_exact",
    hint: "Que devient un cube enfoui au milieu d'un gros empilement ?",
    explanation: expl(
      "Un cube entouré de tous les côtés n'apparaît sur aucune vue : le retirer ne change aucune des quatre images. Deux assemblages, l'un avec ce cube et l'autre sans, ont donc les mêmes vues sans être identiques. Les vues décrivent beaucoup, mais pas tout."
    ),
    tags: ["vision_espace", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "vision_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un cube de 3 sur 3 sur 3 est peint en rouge à l'extérieur, puis découpé en 27 petits cubes. Combien de petits cubes n'ont AUCUNE face peinte ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Lequel ne touche aucune paroi ?",
    explanation: expl(
      "Seul le petit cube du centre ne touche aucune face extérieure : il n'a donc aucune face peinte. Tous les autres sont sur une paroi, une arête ou un coin. Réponse : 1 cube."
    ),
    tags: ["vision_espace", "defi", "canvas", "short"],
    canvas: assemblage(pave(3, 3, 3)),
  },
  {
    kind: "template",
    id: "vision_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le cœur d'un cube est lui-même un cube, plus petit de deux unités dans chaque direction.",
    tags: ["vision_espace", "defi", "template"],
    generate: () => {
      const n = randomInt(3, 5);
      const interieur = (n - 2) ** 3;
      return {
        text: `Un cube de ${n} sur ${n} sur ${n} est peint en rouge à l'extérieur, puis découpé en ${n ** 3} petits cubes. Combien n'ont aucune face peinte ?`,
        format: "short",
        expected: [String(interieur)],
        comparator: "number_equal",
        explanation: expl(
          `Les cubes sans peinture forment le cœur du grand cube : on enlève une couche de chaque côté, donc deux unités dans chaque direction. Le cœur est un cube de ${n - 2} sur ${n - 2} sur ${n - 2}, soit ${interieur} petits cubes.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "vision_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Raisonne sur ce qui touche l'extérieur et ce qui ne le touche pas.",
    tags: ["vision_espace", "defi", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi les quatre vues d'un assemblage ne suffisent pas toujours à le reconstituer.",
          mots: ["caché", "cache", "entouré", "entoure", "invisible", "aucune vue"],
          r: "Un cube entouré de tous les côtés n'apparaît sur aucune vue : le retirer ne change aucune des quatre images. Deux assemblages différant seulement par ce cube ont donc les mêmes vues. Les vues décrivent l'enveloppe, pas l'intérieur.",
        },
        {
          q: "Dans un grand cube peint puis découpé, explique où se trouvent les petits cubes sans aucune face peinte.",
          mots: ["intérieur", "interieur", "cœur", "coeur", "centre", "couche", "touche pas"],
          r: "Ce sont ceux qui ne touchent aucune paroi : ils forment le cœur du grand cube. On les obtient en retirant une couche sur chaque face, donc deux unités dans chaque direction. Pour un cube de côté n, ils forment un cube de côté n − 2.",
        },
        {
          q: "Explique comment reconstituer un assemblage à partir de sa vue de dessus et de sa vue de face.",
          mots: ["colonne", "hauteur", "dessus", "face", "croise"],
          r: "La vue de dessus indique où se trouvent les colonnes de cubes, sur le quadrillage du sol. La vue de face indique la hauteur maximale de chaque rangée. En croisant les deux, on attribue à chaque colonne une hauteur compatible — mais il reste parfois plusieurs solutions, et c'est là qu'une troisième vue sert.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },
];

// La tour en L sert de réserve pour les prochains items de reconstitution
// (vue de dessus identique, hauteurs différentes).
void enL;
void shuffle;
