// lib/tutor-v4/question-banks/maths/3e/transformations.bank.ts

import type {
  TutorBankItemV4,
  TransformationCanvasData,
} from "@/lib/tutor-v4/types";

// Les propositions d'un gabarit sont écrites à la main, et deux d'entre elles
// finissent par coïncider dès qu'un paramètre tombe sur une valeur particulière
// (a = b, un coefficient nul, une fraction qui se simplifie…). L'élève voyait
// alors deux fois la même ligne. On met la bonne réponse de côté, on tire trois
// pièges réellement distincts, puis on mélange l'ensemble.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}


function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function transformationCanvas(
  data: Omit<TransformationCanvasData, "kind">
): TransformationCanvasData {
  return {
    kind: "transformation",
    ...data,
  };
}

export const transformationsBank: TutorBankItemV4[] = [
  /* =========================
     TRANSFO_SYMETRIE_TRANSLATION_ROTATION
  ========================= */

  {
    kind: "fixed",
    id: "3e_sym_transformation_reactivation_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_symetrie_translation_rotation",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle transformation retourne une figure comme dans un miroir ?",
    format: "qcm",
    choices: [
      "une symétrie axiale",
      "une translation",
      "une rotation",
      "une homothétie",
    ],
    expected: ["une symétrie axiale"],
    comparator: "mcq_exact",
    hint: "Pense à un miroir.",
    explanation:
      "Définition : une symétrie axiale transforme une figure comme si elle était réfléchie dans un miroir.\n\n" +
      "Méthode : on repère l’axe de symétrie.\n\n" +
      "Calcul : chaque point et son image sont à la même distance de l’axe.\n\n" +
      "Conclusion : la transformation décrite est une symétrie axiale.",
    tags: ["transformation", "symetrie_axiale", "qcm"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        label: "F",
        points: [
          { x: 1, y: 2 },
          { x: 3, y: 2 },
          { x: 2, y: 4 },
        ],
      },
      image: {
        label: "F'",
        points: [
          { x: 7, y: 2 },
          { x: 5, y: 2 },
          { x: 6, y: 4 },
        ],
      },
      axis: {
        type: "vertical",
        x: 4,
        label: "axe",
      },
    }),
  },

  {
    kind: "fixed",
    id: "3e_sym_transformation_reactivation_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_symetrie_translation_rotation",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle transformation fait glisser une figure sans la tourner ni la déformer ?",
    format: "qcm",
    choices: [
      "une translation",
      "une symétrie centrale",
      "une rotation",
      "une homothétie",
    ],
    expected: ["une translation"],
    comparator: "mcq_exact",
    hint: "La figure se déplace dans une même direction.",
    explanation:
      "Définition : une translation fait glisser une figure selon un vecteur.\n\n" +
      "Méthode : on vérifie que tous les points se déplacent dans la même direction, le même sens et la même longueur.\n\n" +
      "Calcul : la figure garde sa taille, ses angles et son orientation.\n\n" +
      "Conclusion : c’est une translation.",
    tags: ["transformation", "translation", "qcm"],
    canvas: transformationCanvas({
      transformation: "translation",
      grid: { rows: 8, cols: 8 },
      source: {
        label: "F",
        points: [
          { x: 1, y: 2 },
          { x: 3, y: 2 },
          { x: 2, y: 4 },
        ],
      },
      image: {
        label: "F'",
        points: [
          { x: 4, y: 3 },
          { x: 6, y: 3 },
          { x: 5, y: 5 },
        ],
      },
      vector: {
        from: { x: 1, y: 7 },
        to: { x: 4, y: 8 },
        label: "vecteur",
      },
    }),
  },

  {
    kind: "fixed",
    id: "3e_sym_transformation_reactivation_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_symetrie_translation_rotation",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle transformation tourne une figure autour d’un point ?",
    format: "qcm",
    choices: [
      "une rotation",
      "une translation",
      "une symétrie axiale",
      "un agrandissement",
    ],
    expected: ["une rotation"],
    comparator: "mcq_exact",
    hint: "Il y a un centre et un angle.",
    explanation:
      "Définition : une rotation transforme une figure en la faisant tourner autour d’un centre.\n\n" +
      "Méthode : on repère le centre de rotation et l’angle de rotation.\n\n" +
      "Calcul : les distances au centre sont conservées.\n\n" +
      "Conclusion : la transformation est une rotation.",
    tags: ["transformation", "rotation", "qcm"],
    canvas: transformationCanvas({
      transformation: "rotation",
      angleDeg: 90,
      grid: { rows: 8, cols: 8 },
      source: {
        label: "F",
        points: [
          { x: 5, y: 2 },
          { x: 6, y: 2 },
          { x: 6, y: 4 },
        ],
      },
      image: {
        label: "F'",
        points: [
          { x: 6, y: 5 },
          { x: 6, y: 6 },
          { x: 4, y: 6 },
        ],
      },
      center: {
        point: { x: 4, y: 4 },
        label: "O",
      },
    }),
  },

  {
    kind: "template",
    id: "3e_sym_transformation_reactivation_tpl_1_translation",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_symetrie_translation_rotation",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans une translation, tous les points se déplacent de la même façon.",
    tags: ["transformation", "translation", "template", "canvas"],
    // ⛔⛔ RÉPARÉ LE 31/08/2026. Ce gabarit répondait TOUJOURS « translation »,
    // et ses deux voisins toujours « symétrie axiale » et « symétrie
    // centrale ». Trois gabarits, trois réponses figées : en mode complet,
    // l'élève tirait deux questions d'un même gabarit et donnait deux fois la
    // même réponse sans avoir à lire la figure.
    // ⭐ La transformation est maintenant TIRÉE AU SORT, et le dessin la porte.
    // Le nom cherché change à chaque tirage : il faut regarder.
    generate: () => {
      const carre = [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 2, y: 3 },
      ];
      const cas = randomChoice([
        {
          nom: "translation",
          kind: "translation" as const,
          dx: randomChoice([2, 3, 4]),
          dy: randomChoice([1, 2]),
          signe: "tous les points glissent du MÊME déplacement, et la figure garde son sens",
        },
        {
          nom: "symétrie axiale",
          kind: "symetrie_axiale" as const,
          dx: 0,
          dy: 0,
          signe: "la figure est retournée comme dans un miroir : elle a changé de sens",
        },
        {
          nom: "symétrie centrale",
          kind: "symetrie_centrale" as const,
          dx: 0,
          dy: 0,
          signe: "la figure a fait un demi-tour autour d'un point",
        },
      ]);

      const axe = 5;
      const centre = { x: 4, y: 4 };
      const image =
        cas.kind === "translation"
          ? carre.map((p) => ({ x: p.x + cas.dx, y: p.y + cas.dy }))
          : cas.kind === "symetrie_axiale"
            ? carre.map((p) => ({ x: 2 * axe - p.x, y: p.y }))
            : carre.map((p) => ({ x: 2 * centre.x - p.x, y: 2 * centre.y - p.y }));

      // ⚠️ LE NOM DE LA FIGURE ENTRE DANS LE TEXTE, et ce n'est pas cosmétique :
      // le vérificateur de renouvellement signe une question par son énoncé ET
      // ses propositions triées. Avec un texte constant et quatre propositions
      // constantes, ce gabarit ne fabriquait qu'UN énoncé — alors même que sa
      // réponse variait. Six figures, six énoncés.
      const fig = randomChoice([
        "Le triangle", "Le fanion", "La flèche", "L'équerre", "Le drapeau", "La voile",
      ]);
      return {
        text: `${fig} rouge est l'image ${fig.toLowerCase().replace(/^le /, "du ").replace(/^la /, "de la ").replace(/^l'/, "de l'")} bleu${fig.startsWith("La ") || fig.startsWith("L'") ? "e" : ""}. Quelle transformation les relie ?`,
        format: "qcm",
        choices: shuffle([
          "translation",
          "symétrie axiale",
          "symétrie centrale",
          "homothétie",
        ]),
        expected: [cas.nom],
        comparator: "mcq_exact",
        explanation:
          "Définition : trois transformations conservent les longueurs — la translation fait GLISSER, la symétrie axiale RETOURNE dans un miroir, la symétrie centrale fait faire un DEMI-TOUR.\n\n" +
          "Méthode : on suit un point, et surtout on regarde le SENS de la figure. La translation le conserve ; les deux symétries l'inversent — et entre elles, c'est l'axe ou le centre qui tranche.\n\n" +
          `Calcul : ici, ${cas.signe}.\n\n` +
          `Conclusion : c'est une ${cas.nom}. ⚠️ L'HOMOTHÉTIE n'est jamais la réponse quand la figure garde sa TAILLE : elle agrandit ou réduit, les trois autres non.`,
        canvas: transformationCanvas({
          transformation: cas.kind,
          grid: { rows: 9, cols: 9 },
          source: { label: "F", points: carre },
          image: { label: "F'", points: image },
          ...(cas.kind === "translation"
            ? {
                vector: {
                  from: { x: 1, y: 7 },
                  to: { x: 1 + cas.dx, y: 7 + cas.dy },
                  label: "déplacement",
                },
              }
            : cas.kind === "symetrie_axiale"
              ? { axis: { type: "vertical" as const, x: axe, label: "axe" } }
              : { center: { point: centre, label: "O" } }),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_transformation_reactivation_tpl_2_symetrie_axiale",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_symetrie_translation_rotation",
    difficulty: 2,
    theme: "neutral",
    hint: "Les deux figures sont de part et d’autre d’un axe.",
    tags: ["transformation", "symetrie_axiale", "template", "canvas"],
    // ⛔⛔ RÉPARÉ LE 31/08/2026, ET LE DÉFAUT ÉTAIT PIRE QU'UNE RÉPONSE FIGÉE :
    // l'énoncé DONNAIT la réponse. « La figure rouge est l'image de la figure
    // bleue PAR RAPPORT À UN AXE vertical. Quelle est la transformation ? » —
    // il suffisait de recopier le mot de la question, sans jamais regarder le
    // dessin. La question ne mesurait rien.
    // ⭐ Elle porte maintenant la PROPRIÉTÉ, qui est ce que la 3e ajoute à la
    // reconnaissance : laquelle conserve le sens, laquelle a un point fixe,
    // laquelle change les longueurs.
    generate: () => {
      const cas = randomChoice([
        { q: "Quelle transformation CONSERVE le sens de la figure ?", r: "la translation", pourquoi: "elle fait glisser sans retourner ; les deux symétries, elles, inversent le sens" },
        { q: "Quelle transformation ne conserve PAS les longueurs ?", r: "l'homothétie", pourquoi: "elle agrandit ou réduit ; les trois autres sont des isométries" },
        { q: "Quelle transformation laisse tous les points d'une DROITE inchangés ?", r: "la symétrie axiale", pourquoi: "les points de l'axe sont leur propre image" },
        { q: "Quelle transformation laisse UN SEUL point inchangé ?", r: "la symétrie centrale", pourquoi: "seul le centre est sa propre image" },
        { q: "Quelle transformation ne laisse AUCUN point inchangé ?", r: "la translation", pourquoi: "tous les points bougent du même déplacement, aucun ne reste en place" },
        { q: "Quelle transformation est un demi-tour ?", r: "la symétrie centrale", pourquoi: "c'est une rotation d'un demi-tour autour du centre" },
        { q: "Après quelle transformation la figure « regarde-t-elle » toujours du même côté ?", r: "la translation", pourquoi: "le sens de parcours est conservé" },
        { q: "Quelle transformation change la TAILLE de la figure ?", r: "l'homothétie", pourquoi: "c'est la seule des quatre à ne pas conserver les longueurs" },
      ]);
      return {
        text: cas.q,
        format: "qcm",
        choices: shuffle([
          "la translation",
          "la symétrie axiale",
          "la symétrie centrale",
          "l'homothétie",
        ]),
        expected: [cas.r],
        comparator: "mcq_exact",
        explanation:
          "Définition : trois de ces transformations sont des ISOMÉTRIES — elles conservent les longueurs. Seule l'homothétie change la taille.\n\n" +
          "Méthode : deux questions suffisent à les séparer. Le SENS de la figure est-il conservé ? Et quels points restent à leur place ?\n\n" +
          `Calcul : ${cas.pourquoi}.\n\n` +
          "Conclusion : ⭐ le tableau tient en trois lignes — la translation conserve le sens et ne fixe aucun point ; la symétrie axiale inverse le sens et fixe toute une droite ; la symétrie centrale inverse le sens et fixe un seul point.",
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_transformation_reactivation_tpl_3_symetrie_centrale",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_symetrie_translation_rotation",
    difficulty: 2,
    theme: "neutral",
    hint: "Le centre est le milieu entre un point et son image.",
    tags: ["transformation", "symetrie_centrale", "template", "canvas"],
    // ⛔⛔ RÉPARÉ LE 31/08/2026, MÊME DÉFAUT QUE SON VOISIN : l'énoncé disait
    // « par symétrie de centre O » puis demandait quelle était la
    // transformation. La réponse était dans la question.
    // ⭐ Il porte maintenant ce qui DÉFINIT chaque transformation — le vecteur,
    // l'axe, le centre, le couple centre-et-angle. C'est le geste utile : une
    // transformation ne se nomme pas, elle se DONNE, et il faut savoir avec
    // quoi.
    generate: () => {
      const cas = randomChoice([
        { t: "une translation", r: "un vecteur (une direction, un sens, une longueur)", pourquoi: "il dit de combien et dans quel sens TOUS les points glissent" },
        { t: "une symétrie axiale", r: "un axe", pourquoi: "l'axe est la médiatrice de chaque segment joignant un point à son image" },
        { t: "une symétrie centrale", r: "un centre", pourquoi: "le centre est le milieu de chaque segment joignant un point à son image" },
        { t: "une rotation", r: "un centre ET un angle", pourquoi: "le centre seul ne suffit pas : il faut dire de combien on tourne, et dans quel sens" },
        { t: "une homothétie", r: "un centre ET un rapport", pourquoi: "le rapport dit de combien la figure grandit ou rétrécit" },
      ]);
      return {
        text: `Que faut-il donner pour définir complètement ${cas.t} ?`,
        format: "qcm",
        // ⚠️ `makeChoices` garantit que la bonne réponse EST dans la liste : il
        // écarte les doublons, retire la bonne réponse des leurres, en tire
        // trois, puis mélange le tout. Cinq leurres fournis pour qu'il en reste
        // toujours trois après filtrage.
        choices: makeChoices(cas.r, [
          "un vecteur (une direction, un sens, une longueur)",
          "un axe",
          "un centre",
          "un centre ET un angle",
          "un centre ET un rapport",
        ]),
        expected: [cas.r],
        comparator: "mcq_exact",
        explanation:
          "Définition : nommer une transformation ne suffit pas à la définir — il faut donner l'objet qui la détermine.\n\n" +
          "Méthode : on se demande ce qu'il faudrait écrire pour qu'une autre personne construise EXACTEMENT la même image.\n\n" +
          `Calcul : pour ${cas.t}, il faut ${cas.r} — ${cas.pourquoi}.\n\n` +
          "Conclusion : ⚠️ deux transformations demandent DEUX données : la rotation (centre et angle) et l'homothétie (centre et rapport). Donner seulement le centre y laisserait une infinité d'images possibles.",
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_sym_transformation_reactivation_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_symetrie_translation_rotation",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — garde l’idée : une rotation tourne autour d’un centre, d’un angle.
    text: "Une figure tourne d’un quart de tour autour du point O.\nQuel est l’angle de cette rotation, en degrés ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Un tour complet fait 360°.",
    explanation:
      "Définition : une rotation fait tourner une figure autour d’un centre, d’un certain angle. Une translation, elle, fait glisser sans tourner.\n\n" +
      "Méthode : un tour complet fait 360°. On prend le quart.\n\n" +
      "Calcul : 360 ÷ 4 = 90.\n\n" +
      "Conclusion : c’est une rotation de centre O et d’angle 90°.",
    tags: ["transformation", "rotation", "calcul"],
  },
  /* =========================
     TRANSFO_HOMOTHETIE_RECONNAITRE
  ========================= */

  {
    kind: "fixed",
    id: "3e_sym_homothetie_reconnaitre_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Une homothétie permet principalement d’obtenir une figure...",
    format: "qcm",
    choices: [
      "agrandie ou réduite",
      "seulement déplacée",
      "seulement retournée",
      "seulement tournée",
    ],
    expected: ["agrandie ou réduite"],
    comparator: "mcq_exact",
    hint: "Une homothétie change la taille de la figure.",
    explanation:
      "Définition : une homothétie transforme une figure en une figure agrandie ou réduite.\n\n" +
      "Méthode : on repère un centre et un rapport.\n\n" +
      "Calcul : si le rapport est supérieur à 1, la figure est agrandie ; s’il est entre 0 et 1, elle est réduite.\n\n" +
      "Conclusion : une homothétie sert à agrandir ou réduire une figure.",
    tags: ["transformation", "homothetie", "definition", "qcm"],
    canvas: transformationCanvas({
      transformation: "homothetie",
      ratio: 2,
      grid: { rows: 8, cols: 8 },
      source: {
        label: "F",
        points: [
          { x: 3, y: 3 },
          { x: 4, y: 3 },
          { x: 3, y: 4 },
        ],
      },
      image: {
        label: "F'",
        points: [
          { x: 4, y: 2 },
          { x: 6, y: 2 },
          { x: 4, y: 4 },
        ],
      },
      center: {
        point: { x: 2, y: 4 },
        label: "O",
      },
    }),
  },

  {
    kind: "fixed",
    id: "3e_sym_homothetie_reconnaitre_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une homothétie de centre O, les points A, O et A' sont...",
    format: "qcm",
    choices: [
      "alignés",
      "toujours perpendiculaires",
      "toujours confondus",
      "placés au hasard",
    ],
    expected: ["alignés"],
    comparator: "mcq_exact",
    hint: "Le point image reste sur la droite qui passe par le centre.",
    explanation:
      "Définition : dans une homothétie de centre O, un point A et son image A' sont alignés avec O.\n\n" +
      "Méthode : on regarde si O, A et A' sont sur une même droite.\n\n" +
      "Calcul : les distances OA et OA' sont liées par le rapport de l’homothétie.\n\n" +
      "Conclusion : O, A et A' sont alignés.",
    tags: ["transformation", "homothetie", "alignement", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_sym_homothetie_reconnaitre_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Si une homothétie a pour rapport 3, alors la figure image est...",
    format: "qcm",
    choices: [
      "3 fois plus grande en longueur",
      "3 fois plus petite en longueur",
      "simplement déplacée",
      "retournée comme dans un miroir",
    ],
    expected: ["3 fois plus grande en longueur"],
    comparator: "mcq_exact",
    hint: "Un rapport supérieur à 1 agrandit les longueurs.",
    explanation:
      "Définition : le rapport d’une homothétie multiplie les longueurs.\n\n" +
      "Méthode : on observe la valeur du rapport.\n\n" +
      "Calcul : avec k = 3, chaque longueur est multipliée par 3.\n\n" +
      "Conclusion : la figure image est 3 fois plus grande en longueur.",
    tags: ["transformation", "homothetie", "rapport", "agrandissement"],
  },

  {
    kind: "template",
    id: "3e_sym_homothetie_reconnaitre_tpl_1_agrandissement",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si la figure rouge est une version agrandie de la figure bleue depuis le centre O.",
    tags: ["transformation", "homothetie", "agrandissement", "template", "canvas"],
    generate: () => {
      const k = randomChoice([2, 3]);

      return {
        text: `La figure rouge est obtenue à partir de la figure bleue avec le centre O et un rapport ${k}. Quelle transformation reconnaît-on ?`,
        format: "qcm",
        choices: shuffle([
          "homothétie",
          "translation",
          "symétrie axiale",
          "rotation",
        ]),
        expected: ["homothétie"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une homothétie transforme une figure en l’agrandissant ou en la réduisant à partir d’un centre.\n\n" +
          "Méthode : on vérifie que les points correspondants sont alignés avec le centre O.\n\n" +
          `Calcul : ici, le rapport est ${k}, donc les longueurs sont multipliées par ${k}.\n\n` +
          "Conclusion : la transformation est une homothétie.",
        canvas: transformationCanvas({
          transformation: "homothetie",
          ratio: k,
          grid: { rows: 8, cols: 8 },
          source: {
            label: "F",
            points: [
              { x: 3, y: 4 },
              { x: 4, y: 4 },
              { x: 3, y: 5 },
            ],
          },
          image: {
            label: "F'",
            points: [
              { x: 2 + k * 1, y: 6 + k * -2 },
              { x: 2 + k * 2, y: 6 + k * -2 },
              { x: 2 + k * 1, y: 6 + k * -1 },
            ],
          },
          center: {
            point: { x: 2, y: 6 },
            label: "O",
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_homothetie_reconnaitre_tpl_2_reduction",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Une réduction est aussi une homothétie.",
    tags: ["transformation", "homothetie", "reduction", "template", "canvas"],
    generate: () => {
      const k = randomChoice([0.5, 0.25]);
      const labelK = k === 0.5 ? "1/2" : "1/4";

      return {
        text: `Une figure est réduite avec un rapport ${labelK} à partir du centre O. Quelle transformation est utilisée ?`,
        format: "qcm",
        choices: shuffle([
          "homothétie",
          "translation",
          "rotation",
          "symétrie centrale",
        ]),
        expected: ["homothétie"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une homothétie peut produire un agrandissement ou une réduction.\n\n" +
          "Méthode : on regarde le rapport de l’homothétie.\n\n" +
          `Calcul : comme le rapport ${labelK} est compris entre 0 et 1, la figure image est réduite.\n\n` +
          "Conclusion : c’est une homothétie de réduction.",
        canvas: transformationCanvas({
          transformation: "homothetie",
          ratio: k,
          grid: { rows: 8, cols: 8 },
          source: {
            label: "F",
            points: [
              { x: 2, y: 2 },
              { x: 6, y: 2 },
              { x: 2, y: 6 },
            ],
          },
          image: {
            label: "F'",
            points: [
              { x: 4 + (2 - 4) * k, y: 4 + (2 - 4) * k },
              { x: 4 + (6 - 4) * k, y: 4 + (2 - 4) * k },
              { x: 4 + (2 - 4) * k, y: 4 + (6 - 4) * k },
            ],
          },
          center: {
            point: { x: 4, y: 4 },
            label: "O",
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_homothetie_reconnaitre_tpl_3_rapport_type",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare le rapport à 1.",
    tags: ["transformation", "homothetie", "rapport", "template"],
    generate: () => {
      const k = randomChoice([0.5, 0.25, 2, 3, 4]);
      const expected =
        k > 1 ? "un agrandissement" : "une réduction";

      return {
        text: `Une homothétie a pour rapport k = ${String(k).replace(".", ",")}. Est-ce un agrandissement ou une réduction ?`,
        format: "qcm",
        choices: shuffle([
          "un agrandissement",
          "une réduction",
          "une translation",
          "une rotation",
        ]),
        expected: [expected],
        comparator: "mcq_exact",
        explanation:
          "Définition : le rapport d’une homothétie indique comment les longueurs sont multipliées.\n\n" +
          "Méthode : on compare le rapport à 1.\n\n" +
          `Calcul : ici, k = ${String(k).replace(".", ",")}. ${
            k > 1
              ? "Comme k est supérieur à 1, les longueurs augmentent."
              : "Comme k est compris entre 0 et 1, les longueurs diminuent."
          }\n\n` +
          `Conclusion : c’est ${expected}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_sym_homothetie_reconnaitre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — garde l’idée : on reconnaît l’homothétie par son rapport.
    text: "Le triangle A'B'C' est l’image du triangle ABC par une homothétie. AB = 4 cm et A'B' = 10 cm.\nQuel est le rapport de l’homothétie ?",
    format: "short",
    expected: ["2,5", "5/2"],
    comparator: "number_equal",
    hint: "Rapport = longueur image ÷ longueur de départ.",
    explanation:
      "Définition : une homothétie multiplie toutes les longueurs par le même nombre : son rapport.\n\n" +
      "Méthode : on divise la longueur image par la longueur de départ : A'B' ÷ AB.\n\n" +
      "Calcul : 10 ÷ 4 = 2,5.\n\n" +
      "Conclusion : le rapport est 2,5. La figure est agrandie.",
    tags: ["transformation", "homothetie", "rapport", "calcul"],
  },
    /* =========================
     TRANSFO_HOMOTHETIE_CONSTRUIRE
  ========================= */

  {
    kind: "fixed",
    id: "3e_sym_homothetie_construire_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire l’image A' d’un point A par homothétie de centre O, on commence par...",
    format: "qcm",
    choices: [
      "tracer la droite (OA)",
      "tracer une droite perpendiculaire à (OA)",
      "tracer un cercle de centre A",
      "placer A' au hasard",
    ],
    expected: ["tracer la droite (OA)"],
    comparator: "mcq_exact",
    hint: "O, A et A' doivent être alignés.",
    explanation:
      "Définition : dans une homothétie de centre O, le point A, le centre O et l’image A' sont alignés.\n\n" +
      "Méthode : on commence donc par tracer la droite (OA).\n\n" +
      "Calcul : ensuite, on place A' selon le rapport k : OA' = k × OA.\n\n" +
      "Conclusion : la première étape est de tracer la droite (OA).",
    tags: ["transformation", "homothetie", "construction", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_sym_homothetie_construire_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Par une homothétie de centre O et de rapport 2, si OA = 3 cm, alors OA' vaut...",
    format: "qcm",
    choices: ["6 cm", "5 cm", "3 cm", "1,5 cm"],
    expected: ["6 cm"],
    comparator: "mcq_exact",
    hint: "Le rapport multiplie la distance au centre.",
    explanation:
      "Définition : dans une homothétie de rapport k, la distance au centre est multipliée par k.\n\n" +
      "Méthode : on utilise la relation OA' = k × OA.\n\n" +
      "Calcul : OA' = 2 × 3 = 6 cm.\n\n" +
      "Conclusion : OA' vaut 6 cm.",
    tags: ["transformation", "homothetie", "construction", "rapport"],
  },

  {
    kind: "fixed",
    id: "3e_sym_homothetie_construire_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Par une homothétie de centre O et de rapport 1/2, si OA = 8 cm, alors OA' vaut...",
    format: "qcm",
    choices: ["4 cm", "8 cm", "16 cm", "10 cm"],
    expected: ["4 cm"],
    comparator: "mcq_exact",
    hint: "Un rapport 1/2 divise les longueurs par 2.",
    explanation:
      "Définition : dans une homothétie de rapport k, on multiplie la distance au centre par k.\n\n" +
      "Méthode : ici, k = 1/2, donc on prend la moitié de OA.\n\n" +
      "Calcul : OA' = 1/2 × 8 = 4 cm.\n\n" +
      "Conclusion : OA' vaut 4 cm.",
    tags: ["transformation", "homothetie", "reduction", "qcm"],
  },

  {
    kind: "template",
    id: "3e_sym_homothetie_construire_tpl_1_placer_point_agrandissement",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise OA' = k × OA.",
    tags: ["transformation", "homothetie", "construction", "template"],
    generate: () => {
      const OA = randomChoice([2, 3, 4, 5]);
      const k = randomChoice([2, 3]);
      const OAp = OA * k;

      return {
        text: `Par une homothétie de centre O et de rapport ${k}, on sait que OA = ${OA} cm. Quelle doit être la distance OA' ?`,
        format: "short",
        expected: [String(OAp)],
        comparator: "number_equal",
        explanation:
          "Définition : dans une homothétie de centre O et de rapport k, la distance au centre est multipliée par k.\n\n" +
          "Méthode : on utilise la formule OA' = k × OA.\n\n" +
          `Calcul : OA' = ${k} × ${OA} = ${OAp} cm.\n\n` +
          `Conclusion : il faut placer A' à ${OAp} cm de O sur la droite (OA).`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_homothetie_construire_tpl_2_placer_point_reduction",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Un rapport 1/2 divise la distance par 2.",
    tags: ["transformation", "homothetie", "reduction", "template"],
    generate: () => {
      const OA = randomChoice([4, 6, 8, 10, 12]);
      const k = randomChoice([0.5, 0.25]);
      const labelK = k === 0.5 ? "1/2" : "1/4";
      const OAp = OA * k;

      return {
        text: `Par une homothétie de centre O et de rapport ${labelK}, on sait que OA = ${OA} cm. Quelle doit être la distance OA' ?`,
        format: "short",
        expected: [String(OAp)],
        comparator: "number_equal",
        explanation:
          "Définition : une homothétie de rapport compris entre 0 et 1 réduit les distances au centre.\n\n" +
          "Méthode : on calcule OA' = k × OA.\n\n" +
          `Calcul : OA' = ${labelK} × ${OA} = ${OAp} cm.\n\n` +
          `Conclusion : il faut placer A' à ${String(OAp).replace(".", ",")} cm de O.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_homothetie_construire_tpl_3_image_triangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque sommet image est aligné avec le centre O et son sommet de départ.",
    tags: ["transformation", "homothetie", "triangle", "template", "canvas"],
    generate: () => {
      const k = randomChoice([2, 3]);

      return {
        text: `La figure rouge est-elle bien l’image de la figure bleue par une homothétie de centre O et de rapport ${k} ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          "Définition : pour construire l’image d’une figure par homothétie, on construit l’image de chacun de ses sommets.\n\n" +
          "Méthode : chaque sommet, son image et le centre O doivent être alignés.\n\n" +
          `Calcul : avec un rapport ${k}, chaque distance au centre est multipliée par ${k}.\n\n` +
          "Conclusion : la figure rouge est bien l’image de la figure bleue.",
        canvas: transformationCanvas({
          transformation: "homothetie",
          ratio: k,
          grid: { rows: 8, cols: 8 },
          source: {
            label: "ABC",
            points: [
              { x: 3, y: 4 },
              { x: 4, y: 4 },
              { x: 3, y: 5 },
            ],
          },
          image: {
            label: "A'B'C'",
            points: [
              { x: 2 + k * 1, y: 6 + k * -2 },
              { x: 2 + k * 2, y: 6 + k * -2 },
              { x: 2 + k * 1, y: 6 + k * -1 },
            ],
          },
          center: {
            point: { x: 2, y: 6 },
            label: "O",
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_homothetie_construire_tpl_4_erreur_alignement",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie l’alignement avec le centre O.",
    tags: ["transformation", "homothetie", "erreur", "alignement", "template"],
    generate: () => {
      return {
        text: "Un élève place A' à la bonne distance de O, mais pas sur la droite (OA). Sa construction est-elle correcte ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans une homothétie de centre O, le point A, le centre O et l’image A' doivent être alignés.\n\n" +
          "Méthode : pour vérifier une construction, on contrôle à la fois l’alignement et la distance.\n\n" +
          "Calcul : même si OA' a la bonne longueur, A' doit être placé sur la droite (OA).\n\n" +
          "Conclusion : la construction n’est pas correcte.",
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_sym_homothetie_construire_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_construire",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — garde l’idée : chaque sommet image se place sur [OA), à k fois la distance.
    text: "On construit l’image du triangle ABC par l’homothétie de centre O et de rapport 2. OA = 3,5 cm.\nÀ quelle distance de O place-t-on A' ?",
    format: "short",
    expected: ["7", "7 cm"],
    comparator: "number_equal",
    hint: "OA' = rapport × OA.",
    explanation:
      "Définition : l’homothétie de centre O et de rapport 2 envoie A sur A', avec A' sur la demi-droite [OA) et OA' = 2 × OA.\n\n" +
      "Méthode : on multiplie la distance OA par le rapport. On fait pareil pour B et C, puis on relie A', B', C'.\n\n" +
      "Calcul : 2 × 3,5 = 7.\n\n" +
      "Conclusion : on place A' sur [OA), à 7 cm de O.",
    tags: ["transformation", "homothetie", "construction", "calcul"],
  },
    /* =========================
     TRANSFO_HOMOTHETIE_RAPPORT
  ========================= */

  {
    kind: "fixed",
    id: "3e_sym_homothetie_rapport_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Par une homothétie de centre O, on a OA = 4 cm et OA' = 12 cm. Quel est le rapport k ?",
    format: "qcm",
    choices: ["3", "8", "16", "1/3"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Le rapport se calcule avec OA' ÷ OA.",
    explanation:
      "Définition : le rapport d’une homothétie indique par combien les distances au centre sont multipliées.\n\n" +
      "Méthode : on calcule k = OA' ÷ OA.\n\n" +
      "Calcul : k = 12 ÷ 4 = 3.\n\n" +
      "Conclusion : le rapport de l’homothétie est k = 3.",
    tags: ["transformation", "homothetie", "rapport", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_sym_homothetie_rapport_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Par une homothétie de centre O, on a OA = 10 cm et OA' = 5 cm. Quel est le rapport k ?",
    format: "qcm",
    choices: ["1/2", "2", "5", "15"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "Le rapport est inférieur à 1 car la figure est réduite.",
    explanation:
      "Définition : dans une homothétie, le rapport k vérifie OA' = k × OA.\n\n" +
      "Méthode : on calcule k = OA' ÷ OA.\n\n" +
      "Calcul : k = 5 ÷ 10 = 1/2.\n\n" +
      "Conclusion : le rapport est k = 1/2.",
    tags: ["transformation", "homothetie", "rapport", "reduction"],
  },

  {
    kind: "fixed",
    id: "3e_sym_homothetie_rapport_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_rapport",
    difficulty: 3,
    theme: "neutral",
    text: "Si une homothétie a pour rapport k = 4, une longueur de 7 cm devient...",
    format: "qcm",
    choices: ["28 cm", "11 cm", "3 cm", "7 cm"],
    expected: ["28 cm"],
    comparator: "mcq_exact",
    hint: "On multiplie la longueur par le rapport.",
    explanation:
      "Définition : une homothétie de rapport k multiplie toutes les longueurs par k.\n\n" +
      "Méthode : on calcule longueur image = k × longueur de départ.\n\n" +
      "Calcul : 4 × 7 = 28 cm.\n\n" +
      "Conclusion : la longueur image est 28 cm.",
    tags: ["transformation", "homothetie", "longueur", "qcm"],
  },

  {
    kind: "template",
    id: "3e_sym_homothetie_rapport_tpl_1_trouver_k_entier",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_rapport",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise k = OA' ÷ OA.",
    tags: ["transformation", "homothetie", "rapport", "template"],
    generate: () => {
      const OA = randomChoice([2, 3, 4, 5, 6]);
      const k = randomChoice([2, 3, 4]);
      const OAp = OA * k;

      return {
        text: `Par une homothétie de centre O, on a OA = ${OA} cm et OA' = ${OAp} cm. Calculer le rapport k.`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation:
          "Définition : le rapport d’une homothétie est le coefficient qui multiplie les distances au centre.\n\n" +
          "Méthode : on calcule k = OA' ÷ OA.\n\n" +
          `Calcul : k = ${OAp} ÷ ${OA} = ${k}.\n\n` +
          `Conclusion : le rapport de l’homothétie est k = ${k}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_homothetie_rapport_tpl_2_trouver_k_fraction",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Le rapport est OA' ÷ OA.",
    tags: ["transformation", "homothetie", "rapport", "fraction", "template"],
    generate: () => {
      const kData = randomChoice([
        { label: "1/2", value: 0.5, denom: 2 },
        { label: "1/3", value: 1 / 3, denom: 3 },
        { label: "1/4", value: 0.25, denom: 4 },
      ]);

      const OAp = randomChoice([2, 3, 4, 5]);
      const OA = OAp * kData.denom;

      return {
        text: `Par une homothétie de centre O, on a OA = ${OA} cm et OA' = ${OAp} cm. Quel est le rapport k ?`,
        format: "qcm",
        // OA − OA' retombe sur le dénominateur dès que OA' vaut 2 : on garde
        // deux longueurs de secours dans le vivier.
        choices: makeChoices(kData.label, [
          String(kData.denom),
          String(OA + OAp),
          String(OA - OAp),
          String(OA),
          String(OAp),
        ]),
        expected: [kData.label],
        comparator: "mcq_exact",
        explanation:
          "Définition : le rapport d’une homothétie se calcule avec k = OA' ÷ OA.\n\n" +
          "Méthode : on divise la distance image par la distance de départ.\n\n" +
          `Calcul : k = ${OAp} ÷ ${OA} = ${kData.label}.\n\n` +
          `Conclusion : le rapport de l’homothétie est k = ${kData.label}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_homothetie_rapport_tpl_3_calculer_longueur_image",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie la longueur de départ par le rapport.",
    tags: ["transformation", "homothetie", "longueur_image", "template"],
    generate: () => {
      const longueur = randomChoice([3, 4, 5, 6, 8, 10]);
      const k = randomChoice([2, 3, 4]);
      const image = longueur * k;

      return {
        text: `Une figure est transformée par une homothétie de rapport ${k}. Un segment mesure ${longueur} cm au départ. Quelle est sa longueur image ?`,
        format: "short",
        expected: [String(image)],
        comparator: "number_equal",
        explanation:
          "Définition : une homothétie de rapport k multiplie toutes les longueurs par k.\n\n" +
          "Méthode : on calcule longueur image = k × longueur de départ.\n\n" +
          `Calcul : ${k} × ${longueur} = ${image} cm.\n\n` +
          `Conclusion : la longueur image est ${image} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_homothetie_rapport_tpl_4_calculer_longueur_depart",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_rapport",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour retrouver la longueur de départ, divise par le rapport.",
    tags: ["transformation", "homothetie", "longueur_depart", "template"],
    generate: () => {
      const longueurDepart = randomChoice([3, 4, 5, 6, 7, 8]);
      const k = randomChoice([2, 3, 4]);
      const longueurImage = longueurDepart * k;

      return {
        text: `Une homothétie de rapport ${k} transforme un segment en un segment de ${longueurImage} cm. Quelle était la longueur du segment de départ ?`,
        format: "short",
        expected: [String(longueurDepart)],
        comparator: "number_equal",
        explanation:
          "Définition : une homothétie de rapport k multiplie les longueurs par k.\n\n" +
          "Méthode : pour retrouver la longueur de départ, on divise la longueur image par k.\n\n" +
          `Calcul : ${longueurImage} ÷ ${k} = ${longueurDepart} cm.\n\n` +
          `Conclusion : la longueur de départ était ${longueurDepart} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_homothetie_rapport_tpl_5_canvas_rapport",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare une distance au centre avant et après transformation.",
    tags: ["transformation", "homothetie", "rapport", "canvas", "template"],
    generate: () => {
      const k = randomChoice([2, 3]);

      return {
        text: `Sur la figure, la figure rouge est l’image de la figure bleue par une homothétie de centre O. Quel est le rapport ?`,
        format: "qcm",
        choices: shuffle([String(k), "1/2", "4", "1"]),
        expected: [String(k)],
        comparator: "mcq_exact",
        explanation:
          "Définition : le rapport d’une homothétie compare une distance image à la distance de départ.\n\n" +
          "Méthode : on compare par exemple OA' et OA.\n\n" +
          `Calcul : la distance au centre est multipliée par ${k}.\n\n` +
          `Conclusion : le rapport est k = ${k}.`,
        canvas: transformationCanvas({
          transformation: "homothetie",
          ratio: k,
          grid: { rows: 8, cols: 8 },
          source: {
            label: "F",
            points: [
              { x: 3, y: 4 },
              { x: 4, y: 4 },
              { x: 3, y: 5 },
            ],
          },
          image: {
            label: "F'",
            points: [
              { x: 2 + k * 1, y: 6 + k * -2 },
              { x: 2 + k * 2, y: 6 + k * -2 },
              { x: 2 + k * 1, y: 6 + k * -1 },
            ],
          },
          center: {
            point: { x: 2, y: 6 },
            label: "O",
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_sym_homothetie_rapport_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_rapport",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : si OA = 3 cm et OA' = 9 cm, alors le rapport est 9 + 3 = 12. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le rapport se calcule avec une division, pas une addition.",
    explanation:
      "Définition : le rapport d’une homothétie est un coefficient multiplicateur.\n\n" +
      "Méthode : on calcule k = OA' ÷ OA.\n\n" +
      "Calcul : k = 9 ÷ 3 = 3, et non 9 + 3.\n\n" +
      "Conclusion : l’élève a tort. Le rapport est 3.",
    tags: ["transformation", "homothetie", "erreur", "rapport"],
  },

  {
    kind: "fixed",
    id: "3e_sym_homothetie_rapport_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_rapport",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — garde l’idée : k = OA' ÷ OA (et pas OA ÷ OA').
    text: "Par une homothétie de centre O, OA = 8 cm et OA' = 6 cm.\nQuel est le rapport k ?",
    format: "short",
    expected: ["0,75", "3/4", "6/8"],
    comparator: "fraction_decimal_equivalent",
    hint: "k = OA' ÷ OA : la distance image divisée par la distance de départ.",
    explanation:
      "Définition : le rapport k indique par combien les distances au centre sont multipliées.\n\n" +
      "Méthode : k = OA' ÷ OA. On ne fait pas OA ÷ OA'.\n\n" +
      "Calcul : 6 ÷ 8 = 0,75.\n\n" +
      "Conclusion : k = 0,75 (ou 3/4). Il est plus petit que 1 : c’est une réduction.",
    tags: ["transformation", "homothetie", "rapport", "calcul"],
  },
    /* =========================
     TRANSFO_EFFETS
  ========================= */

  {
    kind: "fixed",
    id: "3e_sym_transformation_effet_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_effet",
    difficulty: 2,
    theme: "neutral",
    text: "Une translation conserve...",
    format: "qcm",
    choices: [
      "les longueurs et les angles",
      "les longueurs mais pas les angles",
      "les angles mais pas les longueurs",
      "ni les longueurs ni les angles",
    ],
    expected: ["les longueurs et les angles"],
    comparator: "mcq_exact",
    hint: "Une translation ne déforme pas la figure.",
    explanation:
      "Définition : une translation déplace une figure sans la déformer.\n\n" +
      "Méthode : on observe que la figure garde la même forme et la même taille.\n\n" +
      "Calcul : les longueurs et les angles restent identiques.\n\n" +
      "Conclusion : une translation conserve les longueurs et les angles.",
    tags: ["transformation", "effets", "translation", "conservation"],
  },

  {
    kind: "fixed",
    id: "3e_sym_transformation_effet_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_effet",
    difficulty: 2,
    theme: "neutral",
    text: "Une rotation conserve...",
    format: "qcm",
    choices: [
      "les longueurs et les angles",
      "seulement les aires",
      "seulement les longueurs",
      "aucune grandeur",
    ],
    expected: ["les longueurs et les angles"],
    comparator: "mcq_exact",
    hint: "Une rotation tourne la figure sans la déformer.",
    explanation:
      "Définition : une rotation fait tourner une figure autour d’un centre.\n\n" +
      "Méthode : on vérifie que la figure ne change pas de taille.\n\n" +
      "Calcul : les longueurs et les angles sont conservés.\n\n" +
      "Conclusion : une rotation conserve les longueurs et les angles.",
    tags: ["transformation", "effets", "rotation", "conservation"],
  },

  {
    kind: "fixed",
    id: "3e_sym_transformation_effet_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_effet",
    difficulty: 2,
    theme: "neutral",
    text: "Une symétrie axiale conserve...",
    format: "qcm",
    choices: [
      "les longueurs, les angles et les aires",
      "les longueurs seulement",
      "les angles seulement",
      "aucune grandeur",
    ],
    expected: ["les longueurs, les angles et les aires"],
    comparator: "mcq_exact",
    hint: "Une symétrie axiale retourne la figure sans la déformer.",
    explanation:
      "Définition : une symétrie axiale est un retournement par rapport à un axe.\n\n" +
      "Méthode : on observe que la figure image a la même forme et la même taille.\n\n" +
      "Calcul : les longueurs, les angles et les aires sont conservés.\n\n" +
      "Conclusion : une symétrie axiale conserve les longueurs, les angles et les aires.",
    tags: ["transformation", "effets", "symetrie_axiale", "conservation"],
  },

  {
    kind: "fixed",
    id: "3e_sym_transformation_effet_fixed_4",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_effet",
    difficulty: 3,
    theme: "neutral",
    text: "Une homothétie de rapport 3 multiplie les longueurs par...",
    format: "qcm",
    choices: ["3", "6", "9", "1/3"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Le rapport agit directement sur les longueurs.",
    explanation:
      "Définition : une homothétie de rapport k multiplie les longueurs par k.\n\n" +
      "Méthode : on lit directement le rapport.\n\n" +
      "Calcul : ici, k = 3, donc les longueurs sont multipliées par 3.\n\n" +
      "Conclusion : les longueurs sont multipliées par 3.",
    tags: ["transformation", "effets", "homothetie", "longueur"],
  },

  {
    kind: "fixed",
    id: "3e_sym_transformation_effet_fixed_5",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_effet",
    difficulty: 3,
    theme: "neutral",
    text: "Une homothétie de rapport 3 multiplie les aires par...",
    format: "qcm",
    choices: ["9", "3", "6", "27"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Les aires sont multipliées par k².",
    explanation:
      "Définition : lors d’une homothétie de rapport k, les aires sont multipliées par k².\n\n" +
      "Méthode : on élève le rapport au carré.\n\n" +
      "Calcul : 3² = 9.\n\n" +
      "Conclusion : les aires sont multipliées par 9.",
    tags: ["transformation", "effets", "homothetie", "aire"],
  },

  {
    kind: "fixed",
    id: "3e_sym_transformation_effet_fixed_6",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_effet",
    difficulty: 4,
    theme: "neutral",
    text: "Une homothétie de rapport 2 multiplie les volumes par...",
    format: "qcm",
    choices: ["8", "2", "4", "6"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Les volumes sont multipliés par k³.",
    explanation:
      "Définition : lors d’une homothétie de rapport k, les volumes sont multipliés par k³.\n\n" +
      "Méthode : on élève le rapport au cube.\n\n" +
      "Calcul : 2³ = 8.\n\n" +
      "Conclusion : les volumes sont multipliés par 8.",
    tags: ["transformation", "effets", "homothetie", "volume"],
  },

  {
    kind: "template",
    id: "3e_sym_transformation_effet_tpl_1_longueur_homothetie",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_effet",
    difficulty: 3,
    theme: "neutral",
    hint: "Une homothétie de rapport k multiplie les longueurs par k.",
    tags: ["transformation", "effets", "homothetie", "longueur", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const longueur = randomChoice([3, 4, 5, 6, 8]);
      const image = k * longueur;

      return {
        text: `Une homothétie de rapport ${k} transforme un segment de ${longueur} cm. Quelle est la longueur du segment image ?`,
        format: "short",
        expected: [String(image)],
        comparator: "number_equal",
        explanation:
          "Définition : une homothétie de rapport k multiplie les longueurs par k.\n\n" +
          "Méthode : on multiplie la longueur de départ par le rapport.\n\n" +
          `Calcul : ${longueur} × ${k} = ${image} cm.\n\n` +
          `Conclusion : la longueur image est ${image} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_transformation_effet_tpl_2_aire_homothetie",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_effet",
    difficulty: 4,
    theme: "neutral",
    hint: "Une homothétie de rapport k multiplie les aires par k².",
    tags: ["transformation", "effets", "homothetie", "aire", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const aire = randomChoice([5, 6, 8, 10, 12]);
      const image = aire * k * k;

      return {
        text: `Une homothétie de rapport ${k} transforme une figure d’aire ${aire} cm². Quelle est l’aire de la figure image ?`,
        format: "short",
        expected: [String(image)],
        comparator: "number_equal",
        explanation:
          "Définition : une homothétie de rapport k multiplie les aires par k².\n\n" +
          "Méthode : on calcule d’abord k², puis on multiplie l’aire de départ.\n\n" +
          `Calcul : ${k}² = ${k * k}, donc ${aire} × ${k * k} = ${image} cm².\n\n` +
          `Conclusion : l’aire image est ${image} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_transformation_effet_tpl_3_volume_homothetie",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_effet",
    difficulty: 4,
    theme: "neutral",
    hint: "Une homothétie de rapport k multiplie les volumes par k³.",
    tags: ["transformation", "effets", "homothetie", "volume", "template"],
    generate: () => {
      const k = randomChoice([2, 3]);
      const volume = randomChoice([4, 5, 6, 8, 10]);
      const image = volume * k * k * k;

      return {
        text: `Une homothétie de rapport ${k} transforme un solide de volume ${volume} cm³. Quel est le volume du solide image ?`,
        format: "short",
        expected: [String(image)],
        comparator: "number_equal",
        explanation:
          "Définition : une homothétie de rapport k multiplie les volumes par k³.\n\n" +
          "Méthode : on calcule k³, puis on multiplie le volume de départ.\n\n" +
          `Calcul : ${k}³ = ${k * k * k}, donc ${volume} × ${k * k * k} = ${image} cm³.\n\n` +
          `Conclusion : le volume image est ${image} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_transformation_effet_tpl_4_reduction_aire",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_effet",
    difficulty: 4,
    theme: "neutral",
    hint: "Avec un rapport 1/2, les aires sont multipliées par 1/4.",
    tags: ["transformation", "effets", "homothetie", "reduction", "aire", "template"],
    generate: () => {
      const aire = randomChoice([16, 20, 24, 28, 32, 40]);
      const image = aire / 4;

      return {
        text: `Une homothétie de rapport 1/2 transforme une figure d’aire ${aire} cm². Quelle est l’aire de la figure image ?`,
        format: "short",
        expected: [String(image)],
        comparator: "number_equal",
        explanation:
          "Définition : une homothétie de rapport k multiplie les aires par k².\n\n" +
          "Méthode : avec k = 1/2, on calcule (1/2)².\n\n" +
          `Calcul : (1/2)² = 1/4, donc ${aire} ÷ 4 = ${image} cm².\n\n` +
          `Conclusion : l’aire image est ${image} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_transformation_effet_tpl_5_reduction_volume",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_effet",
    difficulty: 5,
    theme: "neutral",
    hint: "Avec un rapport 1/2, les volumes sont multipliés par 1/8.",
    tags: ["transformation", "effets", "homothetie", "reduction", "volume", "template"],
    generate: () => {
      const volume = randomChoice([16, 24, 32, 40, 48, 64]);
      const image = volume / 8;

      return {
        text: `Une homothétie de rapport 1/2 transforme un solide de volume ${volume} cm³. Quel est le volume du solide image ?`,
        format: "short",
        expected: [String(image)],
        comparator: "number_equal",
        explanation:
          "Définition : une homothétie de rapport k multiplie les volumes par k³.\n\n" +
          "Méthode : avec k = 1/2, on calcule (1/2)³.\n\n" +
          `Calcul : (1/2)³ = 1/8, donc ${volume} ÷ 8 = ${image} cm³.\n\n` +
          `Conclusion : le volume image est ${image} cm³.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_sym_transformation_effet_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_effet",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : une homothétie de rapport 3 multiplie les aires par 3. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les aires sont multipliées par k².",
    explanation:
      "Définition : une homothétie de rapport k multiplie les longueurs par k, mais les aires par k².\n\n" +
      "Méthode : pour les aires, on élève le rapport au carré.\n\n" +
      "Calcul : 3² = 9.\n\n" +
      "Conclusion : l’élève a tort. Les aires sont multipliées par 9.",
    tags: ["transformation", "effets", "erreur", "aire"],
  },

  {
    kind: "fixed",
    id: "3e_sym_transformation_effet_erreur_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_effet",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : une homothétie de rapport 2 multiplie les volumes par 4. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les volumes sont multipliés par k³.",
    explanation:
      "Définition : une homothétie de rapport k multiplie les volumes par k³.\n\n" +
      "Méthode : pour les volumes, on élève le rapport au cube.\n\n" +
      "Calcul : 2³ = 8.\n\n" +
      "Conclusion : l’élève a tort. Les volumes sont multipliés par 8.",
    tags: ["transformation", "effets", "erreur", "volume"],
  },

  {
    kind: "fixed",
    id: "3e_sym_transformation_effet_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_effet",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — garde l’idée : longueurs × k, volumes × k³.
    text: "Un cube de 3 cm d’arête est agrandi par une homothétie de rapport 2.\nQuel est le volume du cube agrandi, en cm³ ?",
    format: "short",
    expected: ["216", "216 cm³"],
    comparator: "number_equal",
    hint: "Calcule d’abord la nouvelle arête.",
    explanation:
      "Définition : une homothétie de rapport k multiplie les longueurs par k, les aires par k² et les volumes par k³.\n\n" +
      "Méthode : la nouvelle arête vaut 2 × 3 = 6 cm. On calcule le volume du nouveau cube.\n\n" +
      "Calcul : 6 × 6 × 6 = 216. On retrouve aussi 27 × 2³ = 27 × 8 = 216.\n\n" +
      "Conclusion : le volume est 216 cm³ (et non 27 × 2 = 54).",
    tags: ["transformation", "effets", "volume", "calcul"],
  },
    /* =========================
     TRANSFO_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_sym_transformation_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, un logo de club est agrandi par homothétie de rapport 2. Une longueur du logo mesure 6 cm au départ. Quelle sera sa longueur sur le logo agrandi ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Les longueurs sont multipliées par le rapport.",
    explanation:
      "Définition : une homothétie de rapport k multiplie les longueurs par k.\n\n" +
      "Méthode : on multiplie la longueur de départ par le rapport.\n\n" +
      "Calcul : 6 × 2 = 12 cm.\n\n" +
      "Conclusion : la longueur sur le logo agrandi est 12 cm.",
    tags: ["transformation", "defi", "homothetie", "longueur", "reunion"],
  },

  {
    kind: "template",
    id: "3e_sym_transformation_defi_tpl_1_affiche_club",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Un agrandissement de rapport k multiplie les longueurs par k.",
    tags: ["transformation", "defi", "homothetie", "longueur", "template", "reunion"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const longueur = randomChoice([4, 5, 6, 8, 10]);
      const image = k * longueur;

      return {
        text: `Pour une affiche d’un événement à Saint-Pierre, un dessin est agrandi par homothétie de rapport ${k}. Une longueur du dessin mesure ${longueur} cm au départ. Quelle sera cette longueur sur l’affiche ?`,
        format: "short",
        expected: [String(image)],
        comparator: "number_equal",
        explanation:
          "Définition : une homothétie de rapport k multiplie les longueurs par k.\n\n" +
          "Méthode : on identifie le rapport puis on multiplie la longueur de départ.\n\n" +
          `Calcul : ${longueur} × ${k} = ${image} cm.\n\n` +
          `Conclusion : la longueur sur l’affiche sera ${image} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_transformation_defi_tpl_2_plan_reduction",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Une réduction de rapport 1/2 divise les longueurs par 2.",
    tags: ["transformation", "defi", "homothetie", "reduction", "template"],
    generate: () => {
      const longueur = randomChoice([8, 10, 12, 14, 16, 20]);
      const image = longueur / 2;

      return {
        text: `Un plan est réduit par homothétie de rapport 1/2. Une longueur réelle représentée sur le premier plan mesure ${longueur} cm. Quelle sera cette longueur sur le plan réduit ?`,
        format: "short",
        expected: [String(image)],
        comparator: "number_equal",
        explanation:
          "Définition : une homothétie de rapport 1/2 divise les longueurs par 2.\n\n" +
          "Méthode : on multiplie la longueur de départ par 1/2.\n\n" +
          `Calcul : ${longueur} × 1/2 = ${image} cm.\n\n` +
          `Conclusion : la longueur sur le plan réduit est ${image} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_transformation_defi_tpl_3_surface_logo",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Les aires sont multipliées par k².",
    tags: ["transformation", "defi", "homothetie", "aire", "template", "reunion"],
    generate: () => {
      const k = randomChoice([2, 3]);
      const aire = randomChoice([6, 8, 10, 12, 15]);
      const image = aire * k * k;

      return {
        text: `Pour une banderole à La Réunion, un logo d’aire ${aire} cm² est agrandi par homothétie de rapport ${k}. Quelle est l’aire du logo agrandi ?`,
        format: "short",
        expected: [String(image)],
        comparator: "number_equal",
        explanation:
          "Définition : une homothétie de rapport k multiplie les aires par k².\n\n" +
          "Méthode : on calcule le coefficient d’aire k².\n\n" +
          `Calcul : ${k}² = ${k * k}, donc ${aire} × ${k * k} = ${image} cm².\n\n` +
          `Conclusion : l’aire du logo agrandi est ${image} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_transformation_defi_tpl_4_maquette_volume",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Les volumes sont multipliés par k³.",
    tags: ["transformation", "defi", "homothetie", "volume", "template"],
    generate: () => {
      const k = randomChoice([2, 3]);
      const volume = randomChoice([3, 4, 5, 6, 8]);
      const image = volume * k * k * k;

      return {
        text: `Une maquette de solide est agrandie par homothétie de rapport ${k}. Son volume initial est ${volume} cm³. Quel est le volume du solide agrandi ?`,
        format: "short",
        expected: [String(image)],
        comparator: "number_equal",
        explanation:
          "Définition : une homothétie de rapport k multiplie les volumes par k³.\n\n" +
          "Méthode : on calcule le coefficient de volume k³.\n\n" +
          `Calcul : ${k}³ = ${k * k * k}, donc ${volume} × ${k * k * k} = ${image} cm³.\n\n` +
          `Conclusion : le volume du solide agrandi est ${image} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_sym_transformation_defi_tpl_5_choisir_effet",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Longueur : k ; aire : k² ; volume : k³.",
    tags: ["transformation", "defi", "effets", "qcm", "template"],
    generate: () => {
      const situations = [
        {
          text: "une longueur",
          expected: "multiplier par k",
          wrongs: ["multiplier par k²", "multiplier par k³", "ne pas changer"],
        },
        {
          text: "une aire",
          expected: "multiplier par k²",
          wrongs: ["multiplier par k", "multiplier par k³", "ne pas changer"],
        },
        {
          text: "un volume",
          expected: "multiplier par k³",
          wrongs: ["multiplier par k", "multiplier par k²", "ne pas changer"],
        },
      ];

      const s = randomChoice(situations);

      return {
        text: `Dans une homothétie de rapport k, que faut-il faire pour transformer ${s.text} ?`,
        format: "qcm",
        choices: shuffle([s.expected, ...s.wrongs]),
        expected: [s.expected],
        comparator: "mcq_exact",
        explanation:
          "Définition : une homothétie n’agit pas de la même manière sur les longueurs, les aires et les volumes.\n\n" +
          "Méthode : on choisit le bon coefficient selon la grandeur.\n\n" +
          "Calcul : longueur → k ; aire → k² ; volume → k³.\n\n" +
          `Conclusion : pour ${s.text}, il faut ${s.expected}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_sym_transformation_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — garde l’idée : les DEUX dimensions sont multipliées par 3.
    text: "Un rectangle de 2 cm sur 4 cm est agrandi par une homothétie de rapport 3.\nQuelle est l’aire du rectangle agrandi, en cm² ?",
    format: "short",
    expected: ["72", "72 cm²"],
    comparator: "number_equal",
    hint: "Calcule d’abord les nouvelles dimensions.",
    explanation:
      "Définition : une aire dépend de deux dimensions. Avec un rapport k, chacune est multipliée par k.\n\n" +
      "Méthode : nouvelles dimensions : 2 × 3 = 6 cm et 4 × 3 = 12 cm.\n\n" +
      "Calcul : 6 × 12 = 72. On retrouve aussi 8 × 3² = 8 × 9 = 72.\n\n" +
      "Conclusion : l’aire est 72 cm². Elle est multipliée par 9, pas seulement par 3 (8 × 3 = 24 est faux).",
    tags: ["transformation", "defi", "aire", "calcul"],
  },

  {
    kind: "fixed",
    id: "3e_sym_transformation_defi_open_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — garde l’idée : la rotation conserve, l’homothétie multiplie.
    text: "Le segment [AB] mesure 7 cm. On lui applique une rotation, puis une homothétie de rapport 2.\nQuelle est sa longueur à la fin ?",
    format: "short",
    expected: ["14", "14 cm"],
    comparator: "number_equal",
    hint: "Une rotation ne change pas les longueurs. Une homothétie les multiplie par son rapport.",
    explanation:
      "Définition : translation, rotation et symétrie conservent les longueurs. Une homothétie de rapport k multiplie les longueurs par k.\n\n" +
      "Méthode : après la rotation, le segment mesure encore 7 cm. Puis l’homothétie le multiplie par 2.\n\n" +
      "Calcul : 7 × 2 = 14.\n\n" +
      "Conclusion : le segment mesure 14 cm à la fin.",
    tags: ["transformation", "defi", "comparaison", "calcul"],
  },

  /* ===== SYM_SYMETRIE_TRANSLATION_ROTATION (compléments) ===== */
  {
    kind: "fixed",
    id: "3e_sym_symetrie_translation_rotation_fixed_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_symetrie_translation_rotation",
    difficulty: 2,
    theme: "neutral",
    text: "Une translation, une rotation ou une symétrie conservent…",
    format: "qcm",
    choices: ["les longueurs et les angles", "seulement la couleur", "le nom des points", "rien du tout"],
    expected: ["les longueurs et les angles"],
    comparator: "mcq_exact",
    hint: "La figure garde la même forme et la même taille.",
    explanation:
      "Définition : ces transformations sont des isométries.\n\n" +
      "Méthode : on vérifie ce qui reste inchangé.\n\n" +
      "Calcul : la figure image a les mêmes longueurs et angles.\n\n" +
      "Conclusion : elles conservent les longueurs et les angles.",
    tags: ["transformation", "isometrie", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_sym_symetrie_translation_rotation_fixed_x2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_symetrie_translation_rotation",
    difficulty: 2,
    theme: "neutral",
    text: "Une transformation qui fait « glisser » une figure dans une direction donnée est…",
    format: "qcm",
    choices: ["une translation", "une rotation", "une symétrie", "une homothétie"],
    expected: ["une translation"],
    comparator: "mcq_exact",
    hint: "On glisse sans tourner.",
    explanation:
      "Définition : une translation glisse la figure selon une direction, un sens et une longueur.\n\n" +
      "Méthode : on regarde si la figure tourne ou glisse.\n\n" +
      "Calcul : ici, elle glisse sans tourner.\n\n" +
      "Conclusion : c’est une translation.",
    tags: ["transformation", "translation", "qcm"],
  },
  {
    kind: "template",
    id: "3e_sym_symetrie_translation_rotation_tpl_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_symetrie_translation_rotation",
    difficulty: 3,
    theme: "neutral",
    hint: "Relie la description à la transformation.",
    tags: ["transformation", "template"],
    generate: () => {
      const cas = randomChoice([
        { desc: "fait tourner une figure autour d’un point", rep: "une rotation" },
        { desc: "fait glisser une figure", rep: "une translation" },
        { desc: "renverse une figure de part et d’autre d’une droite", rep: "une symétrie axiale" },
      ]);
      return {
        text: `Quelle transformation ${cas.desc} ?`,
        format: "qcm",
        choices: shuffle(["une rotation", "une translation", "une symétrie axiale"]),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          `Définition : chaque transformation a un effet caractéristique.\n\n` +
          `Méthode : on relie l’action décrite à la transformation.\n\n` +
          `Calcul : « ${cas.desc} » correspond à ${cas.rep}.\n\n` +
          `Conclusion : c’est ${cas.rep}.`,
      };
    },
  },

  /* ===== SYM_HOMOTHETIE_RECONNAITRE (compléments) ===== */
  {
    kind: "fixed",
    id: "3e_sym_homothetie_reconnaitre_fixed_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Une homothétie est une transformation qui…",
    format: "qcm",
    choices: [
      "agrandit ou réduit une figure",
      "conserve toujours les longueurs",
      "fait seulement tourner la figure",
      "ne change rien",
    ],
    expected: ["agrandit ou réduit une figure"],
    comparator: "mcq_exact",
    hint: "Elle utilise un rapport $k$.",
    explanation:
      "Définition : une homothétie agrandit ou réduit une figure selon un rapport $k$.\n\n" +
      "Méthode : on regarde si la taille change.\n\n" +
      "Calcul : si $|k| > 1$ on agrandit, si $|k| < 1$ on réduit.\n\n" +
      "Conclusion : une homothétie agrandit ou réduit la figure.",
    tags: ["transformation", "homothetie", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_sym_homothetie_reconnaitre_fixed_x2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Avec une homothétie de rapport $k = 2$, la figure image est…",
    format: "qcm",
    choices: ["deux fois plus grande", "deux fois plus petite", "identique", "tournée de $90^\\circ$"],
    expected: ["deux fois plus grande"],
    comparator: "mcq_exact",
    hint: "Les longueurs sont multipliées par $k$.",
    explanation:
      "Définition : une homothétie multiplie les longueurs par $k$.\n\n" +
      "Méthode : avec $k = 2$, on multiplie par $2$.\n\n" +
      "Calcul : les longueurs doublent.\n\n" +
      "Conclusion : la figure est deux fois plus grande.",
    tags: ["transformation", "homothetie", "rapport", "qcm"],
  },
  {
    kind: "template",
    id: "3e_sym_homothetie_reconnaitre_tpl_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_homothetie_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Si $|k| > 1$ on agrandit, si $0 < |k| < 1$ on réduit.",
    tags: ["transformation", "homothetie", "template"],
    generate: () => {
      const agrandit = randomChoice([true, false]);
      const k = agrandit ? randomChoice([2, 3]) : randomChoice(["\\dfrac{1}{2}", "\\dfrac{1}{3}"]);
      return {
        text: `Une homothétie a pour rapport $k = ${k}$. La figure image est-elle plus grande ou plus petite que la figure de départ ?`,
        format: "qcm",
        choices: shuffle(["plus grande", "plus petite", "identique"]),
        expected: [agrandit ? "plus grande" : "plus petite"],
        comparator: "mcq_exact",
        explanation:
          `Définition : le rapport $k$ détermine l’agrandissement ou la réduction.\n\n` +
          `Méthode : on compare $|k|$ à $1$.\n\n` +
          `Calcul : ${agrandit ? "$|k| > 1$, on agrandit" : "$|k| < 1$, on réduit"}.\n\n` +
          `Conclusion : la figure image est ${agrandit ? "plus grande" : "plus petite"}.`,
      };
    },
  },
];