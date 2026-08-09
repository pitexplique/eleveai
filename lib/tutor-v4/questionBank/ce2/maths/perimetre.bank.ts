// lib/tutor-v4/questionBank/ce2/maths/perimetre.bank.ts
//
// Les périmètres du CE2, écrits à la main. Cinq micro-compétences qui passaient
// par le constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, applicable à la rentrée 2025,
// cycle 2) : comprendre ce qu'est le périmètre, le déterminer pour un polygone
// en additionnant les côtés, comparer des périmètres, et traiter le cas du
// rectangle et du carré.
//
// ⚠️ DEUX FAÇONS DE COMPARER, et le texte les demande toutes les deux. La
// seconde est longtemps restée absente d'ici : « Comparer le périmètre de
// plusieurs polygones SANS RÈGLE GRADUÉE, en utilisant un COMPAS. » La méthode
// est décrite mot pour mot : « reporter au compas les longueurs des côtés d'un
// polygone sur une droite afin d'obtenir un segment ayant une longueur égale au
// périmètre du polygone ».
// Ce n'est pas une variante folklorique. C'est la seule façon de comparer deux
// figures dont les côtés ne tombent pas sur des nombres entiers — et elle
// montre qu'un périmètre est une LONGUEUR qu'on peut déplier, pas seulement un
// calcul.
// ⛔ Pas d'AIRE au cycle 2 : la surface arrive au CM1. On ne parle donc jamais
// de cm² ici, et on ne demande jamais « combien de carreaux à l'intérieur ».
// ⛔ Pas de formule à retenir non plus : au CE2 on ADDITIONNE les côtés. Pour
// le rectangle on peut regrouper (deux longueurs et deux largeurs), mais la
// formule 2 × (L + l) est une écriture de cycle 3.
//
// LE PIÈGE DE LA NOTION : le tour et le dedans. « Combien de peinture pour la
// pièce » et « combien de plinthes autour de la pièce » ne se calculent pas
// pareil, et l'élève qui ne s'est pas posé la question multiplie au lieu
// d'additionner. Chaque question de cette banque parle donc d'un objet réel
// qu'on entoure : une clôture, un ruban, une bordure.
// Son cousin : le côté qu'on oublie. Un polygone à cinq côtés en additionne
// cinq, pas quatre.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type {
  FigureLibreCanvasData,
  QuadrilatereCanvasData,
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

function quadrilatere(data: Omit<QuadrilatereCanvasData, "kind">): QuadrilatereCanvasData {
  return { kind: "quadrilatere", ...data };
}

/**
 * Une figure posée sur un quadrillage : on compte les carreaux du CONTOUR.
 * ⚠️ `filledCells` attend des TUPLES `[ligne, colonne]`, pas des objets, et la
 * numérotation commence à 1.
 */
function surQuadrillage(
  cellules: Array<[number, number]>,
): FigureLibreCanvasData {
  return {
    kind: "figure_libre",
    grid: { rows: 6, cols: 8, filledCells: cellules },
    display: { showGrid: true, showFilled: true, showPerimeter: true },
  };
}

function rectangleCote(longueur: number, largeur: number): QuadrilatereCanvasData {
  return quadrilatere({
    points: {
      A: { x: 50, y: 60 },
      B: { x: 250, y: 60 },
      C: { x: 250, y: 170 },
      D: { x: 50, y: 170 },
    },
    display: { showPoints: true, showLabels: true, showSides: true },
    sideLabels: {
      AB: `${longueur} cm`,
      BC: `${largeur} cm`,
      CD: `${longueur} cm`,
      DA: `${largeur} cm`,
    },
    marks: { rightAnglesAt: ["A", "B", "C", "D"] },
  });
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const perimetreBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_PERIMETRE_COMPRENDRE — le tour, pas le dedans
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_perimetre_comprendre_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce que le périmètre d'une figure ?",
    format: "qcm",
    choices: [
      "la longueur de son contour",
      "la place qu'elle occupe à l'intérieur",
      "le nombre de ses côtés",
      "la longueur de son plus grand côté",
    ],
    expected: ["la longueur de son contour"],
    comparator: "mcq_exact",
    hint: "Imagine que tu fais le tour de la figure à pied.",
    explanation: exp(
      "Le périmètre est la longueur du contour d'une figure : le chemin qu'on parcourt en en faisant le tour.",
      "On suit le bord de la figure en additionnant tous les côtés rencontrés.",
      "C'est une longueur, donc elle se mesure en centimètres ou en mètres. Ce qui se trouve à l'intérieur ne compte pas.",
      "C'est la longueur de son contour.",
    ),
    tags: ["ce2", "perimetre", "comprendre", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_perimetre_comprendre_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_comprendre",
    difficulty: 3,
    theme: "reunion",
    text: "On veut poser un grillage tout autour du potager de l'école. Que faut-il calculer ?",
    format: "qcm",
    choices: [
      "le périmètre du potager",
      "ce qu'il y a à l'intérieur du potager",
      "la longueur du plus grand côté",
      "le nombre de plants",
    ],
    expected: ["le périmètre du potager"],
    comparator: "mcq_exact",
    hint: "Le grillage se pose sur le bord, pas au milieu.",
    explanation: exp(
      "Le périmètre sert à tout ce qui entoure : une clôture, un ruban, une bordure.",
      "On se demande si l'objet fait le TOUR ou s'il remplit le dedans.",
      "Le grillage se pose sur le contour : c'est donc le périmètre qu'il faut. Pour savoir combien de plants entrent dedans, on aurait regardé l'intérieur — mais ça, c'est une autre question.",
      "Il faut calculer le périmètre.",
    ),
    tags: ["ce2", "perimetre", "comprendre", "reunion", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_perimetre_comprendre_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_comprendre",
    difficulty: 4,
    theme: "neutral",
    text: "Deux figures de formes très différentes peuvent-elles avoir le même périmètre ?",
    format: "qcm",
    choices: [
      "oui, la forme ne décide pas du périmètre",
      "non, deux formes différentes ont toujours des périmètres différents",
      "oui, seulement si ce sont deux rectangles",
      "on ne peut pas savoir",
    ],
    expected: ["oui, la forme ne décide pas du périmètre"],
    comparator: "mcq_exact",
    hint: "Prends une ficelle de 20 cm et forme-la en carré, puis en rectangle tout plat.",
    explanation: exp(
      "Le périmètre est la longueur du contour : deux contours de même longueur peuvent dessiner des formes très différentes.",
      "On imagine une ficelle de longueur fixe qu'on déforme sans la couper.",
      "Une ficelle de 20 cm peut former un carré de 5 cm de côté, ou un rectangle tout plat de 9 cm sur 1 cm. Les deux figures ne se ressemblent pas du tout, et pourtant leur périmètre vaut 20 cm dans les deux cas.",
      "Oui, c'est possible.",
    ),
    tags: ["ce2", "perimetre", "comprendre", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_perimetre_comprendre_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi si l'objet fait le TOUR, ou s'il remplit le dedans.",
    tags: ["ce2", "perimetre", "comprendre", "template"],
    generate: () => {
      const cas = randomChoice([
        { quoi: "poser une bordure autour d'un massif de fleurs", tour: true },
        { quoi: "coller un ruban tout autour d'un cadre", tour: true },
        { quoi: "poser des plinthes le long des murs d'une pièce", tour: true },
        { quoi: "clôturer un terrain de foot", tour: true },
        { quoi: "carreler tout le sol d'une pièce", tour: false },
        { quoi: "peindre toute la surface d'un mur", tour: false },
      ] as const);
      const bonne = cas.tour ? "le périmètre" : "ce n'est pas le périmètre : cela concerne l'intérieur";
      return {
        text: `Pour ${cas.quoi}, que faut-il calculer ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "le périmètre",
          "ce n'est pas le périmètre : cela concerne l'intérieur",
          "le nombre de côtés",
          "la longueur du plus grand côté",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le périmètre est la longueur du contour : il sert à tout ce qui ENTOURE.",
          "On se demande si l'objet suit le bord ou s'il remplit le dedans.",
          cas.tour
            ? `Pour ${cas.quoi}, on suit le bord de la figure : c'est bien le périmètre.`
            : `Pour ${cas.quoi}, on remplit le dedans, pas le bord : ce n'est pas le périmètre. Cette question-là arrive au CM1.`,
          cas.tour ? "C'est le périmètre." : "Ce n'est pas le périmètre.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_perimetre_comprendre_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le périmètre est une longueur : on l'additionne côté après côté.",
    tags: ["ce2", "perimetre", "comprendre", "template"],
    generate: () => {
      const nb = randomInt(3, 6);
      const noms: Record<number, string> = {
        3: "un triangle",
        4: "un quadrilatère",
        5: "un pentagone",
        6: "un hexagone",
      };
      return {
        text: `Pour trouver le périmètre ${noms[nb]}, combien de longueurs faut-il additionner ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "Le périmètre est la somme de TOUS les côtés de la figure.",
          "On compte les côtés de la figure, puis on les additionne un par un sans en oublier.",
          `${noms[nb].charAt(0).toUpperCase() + noms[nb].slice(1)} a ${nb} côtés : il faut donc additionner ${nb} longueurs.`,
          `Il faut en additionner ${nb}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_PERIMETRE_POLYGONE — additionner tous les côtés
     Le piège : le côté qu'on oublie.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_perimetre_polygone_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle a pour côtés 6 cm, 8 cm et 5 cm. Quel est son périmètre, en cm ?",
    format: "short",
    expected: ["19"],
    comparator: "number_equal",
    hint: "Additionne les trois côtés.",
    explanation: exp(
      "Le périmètre d'un polygone est la somme de tous ses côtés.",
      "On additionne les côtés un par un, en faisant le tour de la figure.",
      "6 + 8 + 5 = 19.",
      "Le périmètre est 19 cm.",
    ),
    tags: ["ce2", "perimetre", "polygone"],
  },
  {
    kind: "fixed",
    id: "ce2_perimetre_polygone_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_polygone",
    difficulty: 4,
    theme: "neutral",
    text: "Un pentagone a pour côtés 4 cm, 6 cm, 3 cm, 5 cm et 7 cm. Un élève annonce 18 cm. Où s'est-il trompé ?",
    format: "qcm",
    choices: [
      "il a oublié un côté",
      "il a compté un côté deux fois",
      "il a multiplié au lieu d'additionner",
      "il n'y a pas d'erreur",
    ],
    expected: ["il a oublié un côté"],
    comparator: "mcq_exact",
    hint: "Additionne les cinq côtés : 4 + 6 + 3 + 5 + 7. Que trouve l'élève sans le 7 ?",
    explanation: exp(
      "Le périmètre est la somme de TOUS les côtés : il en faut autant que la figure en possède.",
      "On compte d'abord les côtés, puis on vérifie qu'on en a additionné le bon nombre.",
      "4 + 6 + 3 + 5 + 7 = 25. L'élève a trouvé 18, c'est-à-dire 25 - 7 : il a fait le tour en sautant le dernier côté. Marquer chaque côté d'un point au crayon pendant qu'on additionne évite cette erreur.",
      "Il a oublié un côté.",
    ),
    tags: ["ce2", "perimetre", "polygone", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_perimetre_polygone_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_polygone",
    difficulty: 3,
    theme: "reunion",
    text: "Un carré de tissu pour un tour de cou mesure 35 cm de côté. Quelle longueur de biais faut-il pour border les quatre côtés, en cm ?",
    format: "short",
    expected: ["140"],
    comparator: "number_equal",
    hint: "Dans un carré, les quatre côtés sont égaux.",
    explanation: exp(
      "Le périmètre d'un carré est la somme de ses quatre côtés, tous égaux.",
      "On additionne quatre fois le côté, ce qui revient à multiplier par 4.",
      "35 + 35 + 35 + 35 = 140, ou plus vite : 35 × 4 = 140.",
      "Il faut 140 cm de biais.",
    ),
    tags: ["ce2", "perimetre", "polygone", "reunion"],
  },
  {
    kind: "template",
    id: "ce2_perimetre_polygone_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_polygone",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne tous les côtés, sans en sauter un seul.",
    tags: ["ce2", "perimetre", "polygone", "template"],
    generate: () => {
      const nb = randomInt(3, 5);
      const cotes = Array.from({ length: nb }, () => randomInt(2, 15));
      const total = cotes.reduce((a, b) => a + b, 0);
      const noms: Record<number, string> = {
        3: "Un triangle",
        4: "Un quadrilatère",
        5: "Un pentagone",
      };
      return {
        text: `${noms[nb]} a pour côtés ${cotes.map((c) => `${c} cm`).join(", ")}. Quel est son périmètre, en cm ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le périmètre d'un polygone est la somme de tous ses côtés.",
          "On additionne les côtés un par un en faisant le tour de la figure, sans en oublier.",
          `${cotes.join(" + ")} = ${total}. Il y avait bien ${nb} côtés à additionner.`,
          `Le périmètre est ${total} cm.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_perimetre_polygone_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_polygone",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les carreaux du CONTOUR, pas ceux de l'intérieur.",
    tags: ["ce2", "perimetre", "polygone", "template", "canvas"],
    generate: () => {
      // Un rectangle plein posé sur le quadrillage : le contour se compte en
      // côtés de carreaux, et vaut 2 × (largeur + hauteur).
      const larg = randomInt(2, 6);
      const haut = randomInt(2, 4);
      const cellules: Array<[number, number]> = [];
      for (let r = 1; r <= haut; r++) {
        for (let c = 1; c <= larg; c++) cellules.push([r, c]);
      }
      const tour = 2 * (larg + haut);
      return {
        text: `Cette figure est posée sur un quadrillage. Le côté d'un carreau mesure 1 cm. Quel est le périmètre de la figure, en cm ?`,
        format: "short",
        expected: [String(tour)],
        comparator: "number_equal",
        explanation: exp(
          "Le périmètre est la longueur du contour : on compte les côtés de carreaux qui bordent la figure.",
          "On fait le tour en comptant, sans jamais compter les traits de l'intérieur.",
          `La figure fait ${larg} carreaux de large et ${haut} de haut. En faisant le tour : ${larg} + ${haut} + ${larg} + ${haut} = ${tour}.`,
          `Le périmètre est ${tour} cm.`,
        ),
        canvas: surQuadrillage(cellules),
      };
    },
  },

  /* =========================================================
     CE2_PERIMETRE_COMPARER
     Deux méthodes. On calcule quand on a les mesures ; on
     REPORTE AU COMPAS quand on ne les a pas. Les items du bas
     de section couvrent la seconde : elle ne demande aucun
     nombre, et elle tranche quand même.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_perimetre_comparer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle a pour côtés 5 cm, 5 cm et 5 cm. Un carré a un côté de 4 cm. Lequel a le plus grand périmètre ?",
    format: "qcm",
    choices: ["le carré", "le triangle", "ils ont le même périmètre", "on ne peut pas savoir"],
    expected: ["le carré"],
    comparator: "mcq_exact",
    hint: "Calcule les deux périmètres avant de comparer.",
    explanation: exp(
      "Pour comparer deux périmètres, on les calcule d'abord tous les deux.",
      "On additionne les côtés de chaque figure, puis on compare les deux résultats.",
      "Triangle : 5 + 5 + 5 = 15 cm. Carré : 4 × 4 = 16 cm. Le carré a des côtés plus courts, mais il en a un de plus : c'est lui qui gagne.",
      "C'est le carré, avec 16 cm.",
    ),
    tags: ["ce2", "perimetre", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_perimetre_comparer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_comparer",
    difficulty: 5,
    theme: "neutral",
    text: "Un carré a un côté de 5 cm. Un rectangle mesure 9 cm sur 1 cm. Que peut-on dire de leurs périmètres ?",
    format: "qcm",
    choices: [
      "ils sont égaux : 20 cm tous les deux",
      "le carré a le plus grand",
      "le rectangle a le plus grand",
      "on ne peut pas comparer des formes différentes",
    ],
    expected: ["ils sont égaux : 20 cm tous les deux"],
    comparator: "mcq_exact",
    hint: "Calcule les deux, malgré l'allure très différente des deux figures.",
    explanation: exp(
      "Deux figures de formes très différentes peuvent avoir exactement le même périmètre.",
      "On calcule chaque périmètre séparément, sans se fier à l'allure des figures.",
      "Carré : 5 × 4 = 20 cm. Rectangle : 9 + 1 + 9 + 1 = 20 cm. Le rectangle est long et plat, le carré est compact — leurs contours mesurent pourtant la même chose.",
      "Ils sont égaux : 20 cm chacun.",
    ),
    tags: ["ce2", "perimetre", "comparer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_perimetre_comparer_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule les deux périmètres, puis compare.",
    tags: ["ce2", "perimetre", "comparer", "template"],
    generate: () => {
      const coteCarre = randomInt(3, 9);
      const perimetreCarre = coteCarre * 4;
      // On décale le rectangle pour que les deux périmètres ne soient jamais
      // égaux : sinon « ils sont égaux » et le nom d'une figure seraient
      // tous deux justes.
      const ecart = randomChoice([-4, -2, 2, 4]);
      const perimetreRect = perimetreCarre + ecart;
      const longueur = randomInt(2, Math.floor(perimetreRect / 2) - 1);
      const largeur = perimetreRect / 2 - longueur;
      const gagnant = perimetreCarre > perimetreRect ? "le carré" : "le rectangle";
      return {
        text: `Un carré a un côté de ${coteCarre} cm. Un rectangle mesure ${longueur} cm sur ${largeur} cm. Lequel a le plus grand périmètre ?`,
        format: "qcm",
        choices: makeChoices(gagnant, [
          perimetreCarre > perimetreRect ? "le rectangle" : "le carré",
          "ils ont le même périmètre",
          "on ne peut pas savoir",
        ]),
        expected: [gagnant],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer deux périmètres, on les calcule d'abord tous les deux.",
          "On additionne les côtés de chaque figure, puis on compare les résultats.",
          `Carré : ${coteCarre} × 4 = ${perimetreCarre} cm. Rectangle : ${longueur} + ${largeur} + ${longueur} + ${largeur} = ${perimetreRect} cm.`,
          `${gagnant.charAt(0).toUpperCase() + gagnant.slice(1)} a le plus grand périmètre.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_perimetre_comparer_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les côtés de chaque figure avant de choisir.",
    tags: ["ce2", "perimetre", "comparer", "template"],
    generate: () => {
      const a = [randomInt(3, 9), randomInt(3, 9), randomInt(3, 9)];
      const sommeA = a.reduce((x, y) => x + y, 0);
      const b = [randomInt(2, 7), randomInt(2, 7), randomInt(2, 7), randomInt(2, 7)];
      const sommeB = b.reduce((x, y) => x + y, 0);
      const gagnant =
        sommeA === sommeB
          ? "les deux ont le même périmètre"
          : sommeA > sommeB
            ? "la figure A"
            : "la figure B";
      return {
        text: `La figure A a pour côtés ${a.map((c) => `${c} cm`).join(", ")}. La figure B a pour côtés ${b.map((c) => `${c} cm`).join(", ")}. Laquelle a le plus grand périmètre ?`,
        format: "qcm",
        choices: makeChoices(gagnant, [
          "la figure A",
          "la figure B",
          "les deux ont le même périmètre",
          "on ne peut pas comparer un triangle et un quadrilatère",
        ]),
        expected: [gagnant],
        comparator: "mcq_exact",
        explanation: exp(
          "Le périmètre est la somme des côtés : le nombre de côtés ne décide de rien tout seul.",
          "On calcule chaque périmètre, puis on compare les deux nombres.",
          `Figure A : ${a.join(" + ")} = ${sommeA} cm. Figure B : ${b.join(" + ")} = ${sommeB} cm.`,
          `${gagnant.charAt(0).toUpperCase() + gagnant.slice(1)}.`,
        ),
      };
    },
  },

  // --- Comparer SANS RÈGLE GRADUÉE, au compas ---------------
  // Le compas ne mesure rien : il garde un écartement et le
  // repose ailleurs. On déplie le contour sur une droite.
  {
    kind: "fixed",
    id: "ce2_perimetre_comparer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "On veut comparer les périmètres de deux polygones dessinés sur une feuille. On n'a pas de règle graduée, seulement un compas. Comment fait-on ?",
    format: "qcm",
    choices: [
      "on reporte les côtés bout à bout sur une droite, pour chaque figure, puis on compare les deux segments obtenus",
      "on lit la longueur de chaque côté sur le compas",
      "on regarde laquelle des deux figures est la plus grande",
      "c'est impossible sans règle graduée",
    ],
    expected: [
      "on reporte les côtés bout à bout sur une droite, pour chaque figure, puis on compare les deux segments obtenus",
    ],
    comparator: "mcq_exact",
    hint: "Le compas ne donne aucun nombre. Mais il garde un écartement, et il peut le reposer ailleurs.",
    explanation: exp(
      "Un compas ne mesure pas : il garde un écartement et le reporte où l'on veut.",
      "On ouvre le compas sur un côté, on le reporte sur une droite ; on repart de la pointe d'arrivée pour le côté suivant, et ainsi de suite jusqu'au dernier côté.",
      "À la fin, chaque figure a donné un segment aussi long que son contour déplié. Le plus long des deux segments désigne le plus grand périmètre — et on n'a écrit aucun nombre.",
      "On reporte les côtés bout à bout sur une droite, puis on compare les deux segments.",
    ),
    tags: ["ce2", "perimetre", "comparer", "compas", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_perimetre_comparer_fixed_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "On reporte au compas, bout à bout sur une demi-droite, les cinq côtés d'un pentagone. Que représente le segment obtenu ?",
    format: "qcm",
    choices: [
      "le périmètre du pentagone",
      "le plus grand côté du pentagone",
      "la moitié du périmètre",
      "le nombre de côtés du pentagone",
    ],
    expected: ["le périmètre du pentagone"],
    comparator: "mcq_exact",
    hint: "On a posé le tour de la figure, morceau après morceau, sur une ligne droite.",
    explanation: exp(
      "Le périmètre est la longueur du contour : on peut le déplier sans le raccourcir.",
      "On met les cinq côtés bout à bout sur une droite, dans n'importe quel ordre.",
      "Les cinq côtés mis l'un derrière l'autre font exactement le tour de la figure, mais tendu. Le segment obtenu a donc la même longueur que le contour : c'est le périmètre.",
      "C'est le périmètre du pentagone.",
    ),
    tags: ["ce2", "perimetre", "comparer", "compas", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_perimetre_comparer_fixed_5",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_comparer",
    difficulty: 5,
    theme: "neutral",
    text: "Deux figures A et B sont dessinées. En reportant leurs côtés au compas, on obtient un segment plus long pour A que pour B. Que peut-on conclure ?",
    format: "qcm",
    choices: [
      "A a le plus grand périmètre, même sans connaître une seule mesure",
      "on ne peut rien conclure tant qu'on n'a pas mesuré en centimètres",
      "A a plus de côtés que B",
      "A occupe plus de place sur la feuille que B",
    ],
    expected: ["A a le plus grand périmètre, même sans connaître une seule mesure"],
    comparator: "mcq_exact",
    hint: "Comparer, ce n'est pas mesurer. Il suffit de savoir lequel est le plus long.",
    explanation: exp(
      "Comparer deux longueurs ne demande pas de les mesurer : il suffit de les mettre côte à côte.",
      "Chaque segment reporté vaut le périmètre de sa figure. On compare les deux segments directement.",
      "Le segment de A est plus long, donc le contour de A est plus long : A a le plus grand périmètre. Le nombre de côtés ne dit rien — une figure à trois grands côtés peut battre une figure à six petits. Et la place occupée sur la feuille, c'est l'intérieur, pas le contour.",
      "A a le plus grand périmètre.",
    ),
    tags: ["ce2", "perimetre", "comparer", "compas", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_perimetre_comparer_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Un report par côté. Compte les côtés de la figure.",
    tags: ["ce2", "perimetre", "comparer", "compas", "template"],
    generate: () => {
      const figure = randomChoice([
        { nom: "un triangle", cotes: 3 },
        { nom: "un carré", cotes: 4 },
        { nom: "un rectangle", cotes: 4 },
        { nom: "un losange", cotes: 4 },
        { nom: "un pentagone", cotes: 5 },
        { nom: "un hexagone", cotes: 6 },
      ]);
      return {
        // Les six noms commencent par « un » : « d'un triangle », « d'un
        // hexagone ». L'élision se pose une fois, sans cas particulier.
        text: `On veut obtenir au compas un segment égal au périmètre d'${figure.nom}. Combien de fois faut-il reporter le compas sur la demi-droite ?`,
        format: "qcm",
        choices: makeChoices(`${figure.cotes} fois`, [
          `${figure.cotes - 1} fois`,
          `${figure.cotes + 1} fois`,
          "une seule fois",
          `${figure.cotes * 2} fois`,
        ]),
        expected: [`${figure.cotes} fois`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le périmètre est la somme de TOUS les côtés : au compas, cela fait un report par côté.",
          "On compte les côtés de la figure, et on reporte autant de fois, bout à bout.",
          `${figure.nom.charAt(0).toUpperCase() + figure.nom.slice(1)} a ${figure.cotes} côtés : il faut ${figure.cotes} reports. En oublier un, c'est laisser un morceau du tour de côté — le segment serait trop court.`,
          `Il faut reporter ${figure.cotes} fois.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_PERIMETRE_RECTANGLE — le cas du rectangle et du carré
     Le piège : multiplier les deux côtés au lieu de les
     additionner.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_perimetre_rectangle_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm de long et 3 cm de large. Quel est son périmètre, en cm ?",
    format: "short",
    expected: ["22"],
    comparator: "number_equal",
    hint: "Un rectangle a DEUX longueurs et DEUX largeurs.",
    explanation: exp(
      "Le périmètre d'un rectangle est la somme de ses quatre côtés : deux longueurs et deux largeurs.",
      "On additionne les quatre côtés, ou on double la longueur, on double la largeur, et on additionne.",
      "8 + 3 + 8 + 3 = 22. Autrement dit : 16 + 6 = 22.",
      "Le périmètre est 22 cm.",
    ),
    tags: ["ce2", "perimetre", "rectangle", "canvas"],
    canvas: rectangleCote(8, 3),
  },
  {
    kind: "fixed",
    id: "ce2_perimetre_rectangle_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_rectangle",
    difficulty: 4,
    theme: "neutral",
    text: "Pour un rectangle de 8 cm sur 3 cm, un élève calcule 8 × 3 = 24 et annonce un périmètre de 24 cm. Où s'est-il trompé ?",
    format: "qcm",
    choices: [
      "le périmètre s'additionne, il ne se multiplie pas",
      "il a oublié de doubler",
      "il fallait faire 8 + 3",
      "il n'y a pas d'erreur",
    ],
    expected: ["le périmètre s'additionne, il ne se multiplie pas"],
    comparator: "mcq_exact",
    hint: "Fais le tour du rectangle à pied : que rencontres-tu ?",
    explanation: exp(
      "Le périmètre est la longueur du contour : on parcourt les côtés les uns après les autres, donc on les additionne.",
      "On fait le tour de la figure en additionnant chaque côté rencontré.",
      "8 + 3 + 8 + 3 = 22, et non 24. Multiplier la longueur par la largeur, c'est une autre question — celle de ce qu'il y a à l'intérieur, qui s'apprend au CM1.",
      "Le périmètre s'additionne : il vaut 22 cm.",
    ),
    tags: ["ce2", "perimetre", "rectangle", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_perimetre_rectangle_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un carré a un côté de 9 cm. Quel est son périmètre, en cm ?",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Les quatre côtés sont égaux : c'est le seul cas où une multiplication va plus vite.",
    explanation: exp(
      "Le périmètre d'un carré est la somme de ses quatre côtés, tous égaux.",
      "On additionne quatre fois le côté, ce qui revient à le multiplier par 4.",
      "9 + 9 + 9 + 9 = 36, ou plus vite : 9 × 4 = 36. Ici la multiplication est légitime — elle remplace une addition de termes égaux, elle ne calcule pas l'intérieur.",
      "Le périmètre est 36 cm.",
    ),
    tags: ["ce2", "perimetre", "rectangle", "remarquable"],
  },
  {
    kind: "template",
    id: "ce2_perimetre_rectangle_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux longueurs et deux largeurs.",
    tags: ["ce2", "perimetre", "rectangle", "template", "canvas"],
    generate: () => {
      const longueur = randomInt(5, 20);
      const largeur = randomInt(2, longueur - 1);
      const tour = 2 * (longueur + largeur);
      return {
        text: `Un rectangle mesure ${longueur} cm de long et ${largeur} cm de large. Quel est son périmètre, en cm ?`,
        format: "short",
        expected: [String(tour)],
        comparator: "number_equal",
        explanation: exp(
          "Le périmètre d'un rectangle est la somme de ses quatre côtés : deux longueurs et deux largeurs.",
          "On double la longueur, on double la largeur, puis on additionne.",
          `${longueur} + ${largeur} + ${longueur} + ${largeur} = ${tour}. Autrement dit ${2 * longueur} + ${2 * largeur} = ${tour}.`,
          `Le périmètre est ${tour} cm.`,
        ),
        canvas: rectangleCote(longueur, largeur),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_perimetre_rectangle_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un carré, les quatre côtés sont égaux.",
    tags: ["ce2", "perimetre", "rectangle", "template"],
    generate: () => {
      const cote = randomInt(3, 25);
      const versPerimetre = randomChoice([true, false]);
      return versPerimetre
        ? {
            text: `Un carré a un côté de ${cote} cm. Quel est son périmètre, en cm ?`,
            format: "short",
            expected: [String(cote * 4)],
            comparator: "number_equal",
            explanation: exp(
              "Le périmètre d'un carré est la somme de ses quatre côtés, tous égaux.",
              "On multiplie le côté par 4.",
              `${cote} × 4 = ${cote * 4}.`,
              `Le périmètre est ${cote * 4} cm.`,
            ),
          }
        : {
            text: `Le périmètre d'un carré est ${cote * 4} cm. Combien mesure son côté, en cm ?`,
            format: "short",
            expected: [String(cote)],
            comparator: "number_equal",
            explanation: exp(
              "Le périmètre d'un carré vaut quatre fois son côté.",
              "Pour revenir au côté, on partage le périmètre en quatre parts égales.",
              `${cote * 4} ÷ 4 = ${cote}.`,
              `Le côté mesure ${cote} cm.`,
            ),
          };
    },
  },

  /* =========================================================
     CE2_PERIMETRE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_perimetre_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un rectangle a un périmètre de 20 cm. Sa longueur mesure 7 cm. Combien mesure sa largeur, en cm ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Enlève les DEUX longueurs du périmètre : ce qui reste, ce sont les deux largeurs.",
    explanation: exp(
      "Le périmètre d'un rectangle est fait de deux longueurs et de deux largeurs.",
      "On retire les deux longueurs du périmètre, puis on partage le reste en deux.",
      "Les deux longueurs font 7 + 7 = 14 cm. Il reste 20 - 14 = 6 cm pour les deux largeurs, donc 6 ÷ 2 = 3 cm chacune.",
      "La largeur mesure 3 cm.",
    ),
    tags: ["ce2", "perimetre", "defi", "deux_etapes"],
  },
  {
    kind: "fixed",
    id: "ce2_perimetre_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Le potager de l'école est un rectangle de 12 m sur 5 m. On veut le clôturer, mais on laisse une ouverture de 2 m pour le portail. Combien de mètres de grillage faut-il ?",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "Calcule d'abord tout le tour, puis enlève le portail.",
    explanation: exp(
      "Le grillage suit le contour, sauf là où on laisse une ouverture.",
      "On calcule le périmètre complet, puis on retire la largeur du portail.",
      "Le tour complet : 12 + 5 + 12 + 5 = 34 m. On enlève les 2 m du portail : 34 - 2 = 32.",
      "Il faut 32 m de grillage.",
    ),
    tags: ["ce2", "perimetre", "defi", "reunion", "deux_etapes"],
  },
  {
    kind: "template",
    id: "ce2_perimetre_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Enlève les deux longueurs connues, puis partage le reste en deux.",
    tags: ["ce2", "perimetre", "defi", "template"],
    generate: () => {
      const longueur = randomInt(5, 15);
      const largeur = randomInt(2, longueur - 1);
      const tour = 2 * (longueur + largeur);
      return {
        text: `Un rectangle a un périmètre de ${tour} cm. Sa longueur mesure ${longueur} cm. Combien mesure sa largeur, en cm ?`,
        format: "short",
        expected: [String(largeur)],
        comparator: "number_equal",
        explanation: exp(
          "Le périmètre d'un rectangle est fait de deux longueurs et de deux largeurs.",
          "On retire les deux longueurs du périmètre, puis on partage le reste en deux.",
          `Les deux longueurs font ${longueur} + ${longueur} = ${2 * longueur} cm. Il reste ${tour} - ${2 * longueur} = ${2 * largeur} cm pour les deux largeurs, donc ${2 * largeur} ÷ 2 = ${largeur} cm chacune.`,
          `La largeur mesure ${largeur} cm.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_perimetre_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "perimetre",
    microId: "ce2_perimetre_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Le tour complet d'abord, l'ouverture ensuite.",
    tags: ["ce2", "perimetre", "defi", "reunion", "deux_etapes", "template"],
    generate: () => {
      const contexte = randomChoice([
        { lieu: "le potager de l'école", ouverture: "un portail", quoi: "grillage" },
        { lieu: "la cour de récréation", ouverture: "une entrée", quoi: "barrière" },
        { lieu: "l'enclos des cabris", ouverture: "une barrière", quoi: "clôture" },
      ]);
      const longueur = randomInt(8, 20);
      const largeur = randomInt(4, longueur - 1);
      const tour = 2 * (longueur + largeur);
      const ouverture = randomInt(1, 4);
      return {
        text: `${contexte.lieu.charAt(0).toUpperCase() + contexte.lieu.slice(1)} est un rectangle de ${longueur} m sur ${largeur} m. On veut l'entourer, en laissant ${ouverture} m pour ${contexte.ouverture}. Combien de mètres de ${contexte.quoi} faut-il ?`,
        format: "short",
        expected: [String(tour - ouverture)],
        comparator: "number_equal",
        explanation: exp(
          "La clôture suit le contour, sauf là où on laisse une ouverture.",
          "On calcule le périmètre complet, puis on retire la largeur de l'ouverture.",
          `Le tour complet : ${longueur} + ${largeur} + ${longueur} + ${largeur} = ${tour} m. On enlève les ${ouverture} m de l'ouverture : ${tour} - ${ouverture} = ${tour - ouverture}.`,
          `Il faut ${tour - ouverture} m de ${contexte.quoi}.`,
        ),
      };
    },
  },
];
