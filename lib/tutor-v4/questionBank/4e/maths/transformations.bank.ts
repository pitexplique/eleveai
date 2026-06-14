// lib/tutor-v4/question-banks/maths/4e/transformations.bank.ts

import type {
  TutorBankItemV4,
  TransformationCanvasData,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function transformationCanvas(
  data: Omit<TransformationCanvasData, "kind">
): TransformationCanvasData {
  return { kind: "transformation", ...data };
}

export const transformationsBank: TutorBankItemV4[] = [
  /* =========================
     TRANSFO_SYMETRIE_AXIALE
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_axiale_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle transformation utilise un axe comme un miroir ?",
    format: "qcm",
    choices: ["une symétrie axiale", "une symétrie centrale", "une translation", "une rotation"],
    expected: ["une symétrie axiale"],
    comparator: "mcq_exact",
    hint: "Le mot important est axe.",
    explanation:
      "Définition : une symétrie axiale transforme une figure comme dans un miroir.\n\n" +
      "Méthode : on repère l’axe de symétrie.\n\n" +
      "Calcul : chaque point et son image sont à la même distance de l’axe.\n\n" +
      "Conclusion : la transformation est une symétrie axiale.",
    tags: ["transformation", "symetrie_axiale", "rappel", "qcm", "canvas"],
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
      axis: { type: "vertical", x: 4, label: "axe" },
    }),
  },

  {
    kind: "template",
    id: "4e_sym_axiale_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans une symétrie axiale, l’axe est au milieu entre un point et son image.",
    tags: ["transformation", "symetrie_axiale", "template", "canvas"],
    generate: () => {
      const axisX = randomChoice([4, 5]);

      return {
        text: "La figure rouge est-elle l’image de la figure bleue par symétrie axiale ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une symétrie axiale utilise un axe comme miroir.\n\n" +
          "Méthode : on vérifie que chaque point et son image sont à la même distance de l’axe.\n\n" +
          "Calcul : l’axe est la médiatrice des segments reliant les points à leurs images.\n\n" +
          "Conclusion : la figure rouge est bien l’image par symétrie axiale.",
        canvas: transformationCanvas({
          transformation: "symetrie_axiale",
          grid: { rows: 8, cols: 10 },
          source: {
            label: "F",
            points: [
              { x: axisX - 3, y: 2 },
              { x: axisX - 1, y: 2 },
              { x: axisX - 2, y: 4 },
            ],
          },
          image: {
            label: "F'",
            points: [
              { x: axisX + 3, y: 2 },
              { x: axisX + 1, y: 2 },
              { x: axisX + 2, y: 4 },
            ],
          },
          axis: { type: "vertical", x: axisX, label: "axe" },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_axiale_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment vérifier qu’un point A' est l’image de A par symétrie axiale.",
    format: "open",
    expected: ["axe", "distance", "perpendiculaire", "milieu", "médiatrice"],
    comparator: "contains_keyword",
    hint: "Parle de l’axe et des distances.",
    explanation:
      "Définition : dans une symétrie axiale, l’axe joue le rôle d’un miroir.\n\n" +
      "Méthode : on vérifie que A et A' sont de part et d’autre de l’axe.\n\n" +
      "Calcul : l’axe doit être la médiatrice du segment [AA'].\n\n" +
      "Conclusion : A' est l’image de A si l’axe est au milieu et perpendiculaire à [AA'].",
    tags: ["transformation", "symetrie_axiale", "open", "methode"],
  },

  /* =========================
     TRANSFO_SYMETRIE_CENTRALE
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_centrale_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 1,
    theme: "neutral",
    text: "Une symétrie centrale correspond à...",
    format: "qcm",
    choices: ["un demi-tour autour d’un point", "un glissement", "un miroir avec un axe", "un agrandissement"],
    expected: ["un demi-tour autour d’un point"],
    comparator: "mcq_exact",
    hint: "Pense à une rotation de 180°.",
    explanation:
      "Définition : une symétrie centrale est un demi-tour autour d’un point appelé centre.\n\n" +
      "Méthode : on repère le centre de symétrie.\n\n" +
      "Calcul : un point, son image et le centre sont alignés, et le centre est au milieu.\n\n" +
      "Conclusion : une symétrie centrale correspond à un demi-tour autour d’un point.",
    tags: ["transformation", "symetrie_centrale", "definition", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_centrale",
      grid: { rows: 8, cols: 8 },
      source: {
        label: "F",
        points: [
          { x: 1, y: 2 },
          { x: 3, y: 2 },
          { x: 2, y: 3 },
        ],
      },
      image: {
        label: "F'",
        points: [
          { x: 7, y: 6 },
          { x: 5, y: 6 },
          { x: 6, y: 5 },
        ],
      },
      center: { point: { x: 4, y: 4 }, label: "O" },
    }),
  },

  {
    kind: "fixed",
    id: "4e_sym_centrale_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence principale entre une symétrie axiale et une symétrie centrale ?",
    format: "qcm",
    choices: [
      "la symétrie axiale utilise un axe, la symétrie centrale utilise un point",
      "la symétrie axiale agrandit, la symétrie centrale réduit",
      "la symétrie axiale tourne toujours de 90°",
      "il n’y a aucune différence",
    ],
    expected: ["la symétrie axiale utilise un axe, la symétrie centrale utilise un point"],
    comparator: "mcq_exact",
    hint: "Axiale vient de axe ; centrale vient de centre.",
    explanation:
      "Définition : une symétrie axiale utilise un axe, tandis qu’une symétrie centrale utilise un centre.\n\n" +
      "Méthode : on identifie l’élément qui définit la transformation.\n\n" +
      "Calcul : axe pour la symétrie axiale ; point O pour la symétrie centrale.\n\n" +
      "Conclusion : la différence principale est axe contre centre.",
    tags: ["transformation", "symetrie_axiale", "symetrie_centrale", "comparaison"],
  },

  {
    kind: "template",
    id: "4e_sym_centrale_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 2,
    theme: "neutral",
    hint: "Le centre est le milieu entre chaque point et son image.",
    tags: ["transformation", "symetrie_centrale", "template", "canvas"],
    generate: () => ({
      text: "La figure rouge est-elle l’image de la figure bleue par symétrie centrale de centre O ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["oui"],
      comparator: "mcq_exact",
      explanation:
        "Définition : une symétrie centrale est un demi-tour autour d’un centre.\n\n" +
        "Méthode : on vérifie que O est le milieu entre chaque point et son image.\n\n" +
        "Calcul : les points correspondants sont alignés avec O et à la même distance de O.\n\n" +
        "Conclusion : la figure rouge est bien l’image par symétrie centrale.",
      canvas: transformationCanvas({
        transformation: "symetrie_centrale",
        grid: { rows: 8, cols: 8 },
        source: {
          label: "F",
          points: [
            { x: 2, y: 2 },
            { x: 3, y: 2 },
            { x: 2, y: 4 },
          ],
        },
        image: {
          label: "F'",
          points: [
            { x: 6, y: 6 },
            { x: 5, y: 6 },
            { x: 6, y: 4 },
          ],
        },
        center: { point: { x: 4, y: 4 }, label: "O" },
      }),
    }),
  },

  {
    kind: "fixed",
    id: "4e_sym_centrale_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment vérifier qu’un point A' est bien l’image de A par symétrie centrale de centre O.",
    format: "open",
    expected: ["alignés", "milieu", "OA", "OA'", "centre"],
    comparator: "contains_keyword",
    hint: "Il faut parler d’alignement et de milieu.",
    explanation:
      "Définition : dans une symétrie centrale de centre O, A, O et A' sont alignés.\n\n" +
      "Méthode : on vérifie deux choses : l’alignement et l’égalité des distances.\n\n" +
      "Calcul : si OA = OA', alors O est le milieu de [AA'].\n\n" +
      "Conclusion : A' est bien l’image de A si A, O et A' sont alignés et si O est le milieu de [AA'].",
    tags: ["transformation", "symetrie_centrale", "open", "methode"],
  },

  /* =========================
     TRANSFO_TRANSLATION
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_translation_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 1,
    theme: "neutral",
    text: "Une translation est...",
    format: "qcm",
    choices: ["un glissement", "un demi-tour", "un miroir", "un agrandissement"],
    expected: ["un glissement"],
    comparator: "mcq_exact",
    hint: "La figure se déplace sans tourner.",
    explanation:
      "Définition : une translation fait glisser une figure selon un vecteur.\n\n" +
      "Méthode : on observe que tous les points se déplacent de la même façon.\n\n" +
      "Calcul : même direction, même sens et même longueur de déplacement.\n\n" +
      "Conclusion : une translation est un glissement.",
    tags: ["transformation", "translation", "definition", "qcm"],
  },

  {
    kind: "template",
    id: "4e_sym_translation_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 2,
    theme: "neutral",
    hint: "Tous les points doivent subir le même déplacement.",
    tags: ["transformation", "translation", "template", "canvas"],
    generate: () => {
      const dx = randomChoice([2, 3, 4]);
      const dy = randomChoice([1, 2]);

      return {
        text: `La figure rouge est obtenue en déplaçant la figure bleue de ${dx} carreaux vers la droite et ${dy} carreau(x) vers le bas. Quelle transformation reconnaît-on ?`,
        format: "qcm",
        choices: shuffle(["translation", "symétrie axiale", "symétrie centrale", "rotation"]),
        expected: ["translation"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une translation est un glissement.\n\n" +
          "Méthode : on regarde si chaque point se déplace de la même manière.\n\n" +
          `Calcul : ici, chaque point avance de ${dx} carreaux vers la droite et ${dy} carreau(x) vers le bas.\n\n` +
          "Conclusion : la transformation est une translation.",
        canvas: transformationCanvas({
          transformation: "translation",
          grid: { rows: 8, cols: 8 },
          source: {
            label: "F",
            points: [
              { x: 1, y: 1 },
              { x: 3, y: 1 },
              { x: 2, y: 3 },
            ],
          },
          image: {
            label: "F'",
            points: [
              { x: 1 + dx, y: 1 + dy },
              { x: 3 + dx, y: 1 + dy },
              { x: 2 + dx, y: 3 + dy },
            ],
          },
          vector: {
            from: { x: 1, y: 7 },
            to: { x: 1 + dx, y: 7 + dy },
            label: "vecteur",
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_translation_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment reconnaître une translation sur une figure.",
    format: "open",
    expected: ["même", "déplacement", "direction", "sens", "longueur"],
    comparator: "contains_keyword",
    hint: "Tous les points se déplacent de la même façon.",
    explanation:
      "Définition : une translation déplace une figure selon un vecteur.\n\n" +
      "Méthode : on compare le déplacement de plusieurs points.\n\n" +
      "Calcul : ils doivent avoir la même direction, le même sens et la même longueur.\n\n" +
      "Conclusion : on reconnaît une translation si tous les points ont le même déplacement.",
    tags: ["transformation", "translation", "open", "methode"],
  },

  /* =========================
     TRANSFO_ROTATION
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_rotation_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 1,
    theme: "neutral",
    text: "Une rotation est définie par...",
    format: "qcm",
    choices: ["un centre et un angle", "un axe seulement", "un vecteur seulement", "un rapport"],
    expected: ["un centre et un angle"],
    comparator: "mcq_exact",
    hint: "Une rotation tourne autour d’un point.",
    explanation:
      "Définition : une rotation fait tourner une figure autour d’un centre.\n\n" +
      "Méthode : on repère le centre et l’angle de rotation.\n\n" +
      "Calcul : la distance au centre est conservée.\n\n" +
      "Conclusion : une rotation est définie par un centre et un angle.",
    tags: ["transformation", "rotation", "definition", "qcm"],
  },

  {
    kind: "template",
    id: "4e_sym_rotation_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 2,
    theme: "neutral",
    hint: "La figure tourne autour du centre O.",
    tags: ["transformation", "rotation", "template", "canvas"],
    generate: () => {
      const angle = randomChoice([90, 180]);

      return {
        text: `La figure rouge est obtenue par une rotation de centre O et d’angle ${angle}°. Quelle transformation reconnaît-on ?`,
        format: "qcm",
        choices: shuffle(["rotation", "translation", "symétrie axiale", "agrandissement"]),
        expected: ["rotation"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une rotation fait tourner une figure autour d’un centre.\n\n" +
          "Méthode : on repère le centre O et l’angle indiqué.\n\n" +
          `Calcul : ici, la figure tourne de ${angle}° autour de O.\n\n` +
          "Conclusion : la transformation est une rotation.",
        canvas: transformationCanvas({
          transformation: "rotation",
          angleDeg: angle,
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
            points:
              angle === 90
                ? [
                    { x: 6, y: 5 },
                    { x: 6, y: 6 },
                    { x: 4, y: 6 },
                  ]
                : [
                    { x: 3, y: 6 },
                    { x: 2, y: 6 },
                    { x: 2, y: 4 },
                  ],
          },
          center: { point: { x: 4, y: 4 }, label: "O" },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_rotation_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment reconnaître une rotation sur une figure.",
    format: "open",
    expected: ["centre", "angle", "tourne", "distance", "conservée"],
    comparator: "contains_keyword",
    hint: "Parle du centre et de l’angle.",
    explanation:
      "Définition : une rotation fait tourner une figure autour d’un centre.\n\n" +
      "Méthode : on repère le centre, l’angle et le sens de rotation.\n\n" +
      "Calcul : les distances au centre sont conservées.\n\n" +
      "Conclusion : on reconnaît une rotation grâce à son centre et à son angle.",
    tags: ["transformation", "rotation", "open", "methode"],
  },

  /* =========================
     TRANSFO_PROPRIETES
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_transformation_propriete_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "La symétrie centrale, la translation et la rotation conservent...",
    format: "qcm",
    choices: ["les longueurs et les angles", "seulement les longueurs", "seulement les aires", "aucune propriété"],
    expected: ["les longueurs et les angles"],
    comparator: "mcq_exact",
    hint: "Ces transformations ne déforment pas les figures.",
    explanation:
      "Définition : ces transformations déplacent ou tournent une figure sans la déformer.\n\n" +
      "Méthode : on compare la figure de départ et la figure image.\n\n" +
      "Calcul : les longueurs, les angles, l’alignement et le parallélisme sont conservés.\n\n" +
      "Conclusion : elles conservent les longueurs et les angles.",
    tags: ["transformation", "propriete", "conservation", "qcm"],
  },

  {
    kind: "template",
    id: "4e_sym_transformation_propriete_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Une transformation de 4e conserve la forme et la taille.",
    tags: ["transformation", "propriete", "template"],
    generate: () => {
      const transfo = randomChoice(["translation", "rotation", "symétrie centrale"]);
      const longueur = randomChoice([4, 5, 6, 7, 8]);

      return {
        text: `Un segment mesure ${longueur} cm. On lui applique une ${transfo}. Quelle est la longueur de son image ?`,
        format: "short",
        expected: [String(longueur)],
        comparator: "number_equal",
        explanation:
          "Définition : une translation, une rotation ou une symétrie centrale conserve les longueurs.\n\n" +
          "Méthode : on identifie que la transformation ne déforme pas la figure.\n\n" +
          `Calcul : le segment mesure ${longueur} cm, donc son image mesure aussi ${longueur} cm.\n\n` +
          `Conclusion : la longueur image est ${longueur} cm.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_transformation_propriete_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : une rotation change la taille de la figure. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une rotation ne déforme pas.",
    explanation:
      "Définition : une rotation fait tourner une figure autour d’un centre.\n\n" +
      "Méthode : on vérifie si la taille change.\n\n" +
      "Calcul : les longueurs sont conservées.\n\n" +
      "Conclusion : l’élève a tort, une rotation ne change pas la taille.",
    tags: ["transformation", "propriete", "erreur", "rotation"],
  },

  {
    kind: "fixed",
    id: "4e_sym_transformation_propriete_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 4,
    theme: "neutral",
    text: "Cite deux propriétés conservées par une symétrie centrale, une translation ou une rotation.",
    format: "open",
    expected: ["longueurs", "angles", "alignement", "parallélisme"],
    comparator: "contains_keyword",
    hint: "Pense à ce qui ne change pas dans la figure.",
    explanation:
      "Définition : ces transformations ne déforment pas les figures.\n\n" +
      "Méthode : on compare la figure initiale et son image.\n\n" +
      "Calcul : les longueurs, les angles, l’alignement et le parallélisme sont conservés.\n\n" +
      "Conclusion : on peut citer par exemple les longueurs et les angles.",
    tags: ["transformation", "propriete", "open"],
  },

  /* =========================
     TRANSFO_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_transformation_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un plan de Saint-Pierre, un pictogramme est déplacé de 4 carreaux vers la droite et 2 vers le bas, sans tourner. Quelle transformation est utilisée ?",
    format: "qcm",
    choices: ["translation", "rotation", "symétrie centrale", "symétrie axiale"],
    expected: ["translation"],
    comparator: "mcq_exact",
    hint: "La figure glisse sans tourner.",
    explanation:
      "Définition : une translation est un glissement.\n\n" +
      "Méthode : on regarde si la figure se déplace sans changer d’orientation.\n\n" +
      "Calcul : elle avance de 4 carreaux vers la droite et 2 vers le bas.\n\n" +
      "Conclusion : la transformation est une translation.",
    tags: ["transformation", "defi", "translation", "reunion"],
  },

  {
    kind: "template",
    id: "4e_sym_transformation_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche si la figure glisse, tourne ou fait un demi-tour.",
    tags: ["transformation", "defi", "template", "qcm"],
    generate: () => {
      const situation = randomChoice([
        {
          text: "La figure glisse sans tourner.",
          expected: "translation",
          wrongs: ["rotation", "symétrie centrale", "symétrie axiale"],
        },
        {
          text: "La figure tourne autour d’un point O.",
          expected: "rotation",
          wrongs: ["translation", "symétrie axiale", "homothétie"],
        },
        {
          text: "La figure effectue un demi-tour autour d’un point O.",
          expected: "symétrie centrale",
          wrongs: ["translation", "symétrie axiale", "rotation de 90°"],
        },
        {
          text: "La figure est retournée comme dans un miroir par rapport à une droite.",
          expected: "symétrie axiale",
          wrongs: ["translation", "rotation", "symétrie centrale"],
        },
      ]);

      return {
        text: `${situation.text} Quelle transformation reconnaît-on ?`,
        format: "qcm",
        choices: shuffle([situation.expected, ...situation.wrongs]),
        expected: [situation.expected],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque transformation possède un indice visuel.\n\n" +
          "Méthode : glissement = translation ; demi-tour = symétrie centrale ; tour autour d’un centre = rotation ; miroir = symétrie axiale.\n\n" +
          `Calcul : ici, ${situation.text.toLowerCase()}\n\n` +
          `Conclusion : la transformation est ${situation.expected}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_transformation_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre une symétrie axiale, une symétrie centrale, une translation et une rotation.",
    format: "open",
    expected: ["axe", "centre", "glissement", "tourne", "angle"],
    comparator: "contains_keyword",
    hint: "Associe chaque transformation à son indice principal.",
    explanation:
      "Définition : les transformations se distinguent par leur élément caractéristique.\n\n" +
      "Méthode : on associe chaque transformation à un indice.\n\n" +
      "Calcul : symétrie axiale = axe ; symétrie centrale = centre et demi-tour ; translation = glissement ; rotation = centre et angle.\n\n" +
      "Conclusion : ces indices permettent de reconnaître rapidement la transformation.",
    tags: ["transformation", "defi", "open", "comparaison"],
  },
    /* =========================
     RENFORT SYMÉTRIE AXIALE
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_axiale_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : dans une symétrie axiale, le point A, son image A' et l’axe sont toujours alignés. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Dans une symétrie axiale, l’axe est perpendiculaire au segment [AA'].",
    explanation:
      "Définition : dans une symétrie axiale, l’axe est la médiatrice du segment reliant un point à son image.\n\n" +
      "Méthode : on vérifie la position de l’axe par rapport à [AA'].\n\n" +
      "Calcul : l’axe est perpendiculaire à [AA'] et passe par son milieu.\n\n" +
      "Conclusion : A, A' et l’axe ne sont pas toujours alignés.",
    tags: ["transformation", "symetrie_axiale", "erreur"],
  },

  /* =========================
     RENFORT SYMÉTRIE CENTRALE
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_centrale_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : une symétrie centrale fonctionne comme un miroir avec un axe. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La symétrie centrale utilise un point, pas un axe.",
    explanation:
      "Définition : une symétrie centrale est un demi-tour autour d’un centre.\n\n" +
      "Méthode : on distingue l’axe et le centre.\n\n" +
      "Calcul : symétrie axiale → axe ; symétrie centrale → point centre.\n\n" +
      "Conclusion : l’élève confond symétrie axiale et symétrie centrale.",
    tags: ["transformation", "symetrie_centrale", "erreur", "comparaison"],
  },

  {
    kind: "template",
    id: "4e_sym_centrale_tpl_2_milieu",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 3,
    theme: "neutral",
    hint: "Le centre O est le milieu de [AA'].",
    tags: ["transformation", "symetrie_centrale", "milieu", "template"],
    generate: () => {
      const oa = randomChoice([2, 3, 4, 5, 6]);

      return {
        text: `Dans une symétrie centrale de centre O, on sait que OA = ${oa} cm. Quelle est la longueur OA' ?`,
        format: "short",
        expected: [String(oa)],
        comparator: "number_equal",
        explanation:
          "Définition : dans une symétrie centrale, le centre est le milieu entre un point et son image.\n\n" +
          "Méthode : on utilise l’égalité OA = OA'.\n\n" +
          `Calcul : OA = ${oa} cm, donc OA' = ${oa} cm.\n\n` +
          `Conclusion : OA' mesure ${oa} cm.`,
      };
    },
  },

  /* =========================
     RENFORT TRANSLATION
  ========================= */

  {
    kind: "template",
    id: "4e_sym_translation_tpl_2_coordonnees",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 3,
    theme: "neutral",
    hint: "Ajoute le même déplacement aux coordonnées du point.",
    tags: ["transformation", "translation", "coordonnees", "template"],
    generate: () => {
      const x = randomChoice([1, 2, 3, 4]);
      const y = randomChoice([1, 2, 3]);
      const dx = randomChoice([2, 3, 4]);
      const dy = randomChoice([1, 2]);

      return {
        text: `Le point A(${x};${y}) est déplacé par translation de ${dx} carreaux vers la droite et ${dy} carreau(x) vers le haut. Quelles sont les coordonnées de A' ?`,
        format: "qcm",
        choices: shuffle([
          `(${x + dx};${y - dy})`,
          `(${x + dx};${y + dy})`,
          `(${x - dx};${y + dy})`,
          `(${dx};${dy})`,
        ]),
        expected: [`(${x + dx};${y - dy})`],
        comparator: "mcq_exact",
        explanation:
          "Définition : une translation déplace tous les points de la même façon.\n\n" +
          "Méthode : vers la droite, on ajoute à l’abscisse ; vers le haut, on diminue l’ordonnée sur un quadrillage écran.\n\n" +
          `Calcul : A(${x};${y}) devient A'(${x + dx};${y - dy}).\n\n` +
          `Conclusion : les coordonnées de A' sont (${x + dx};${y - dy}).`,
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_translation_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : dans une translation, la figure peut tourner un peu. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une translation est un glissement.",
    explanation:
      "Définition : une translation est un glissement sans rotation.\n\n" +
      "Méthode : on vérifie que l’orientation de la figure ne change pas.\n\n" +
      "Calcul : tous les points se déplacent selon le même vecteur.\n\n" +
      "Conclusion : l’élève a tort, la figure ne tourne pas.",
    tags: ["transformation", "translation", "erreur"],
  },

  /* =========================
     RENFORT ROTATION
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_rotation_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 2,
    theme: "neutral",
    text: "Lors d’une rotation de centre O, que devient la distance OA ?",
    format: "qcm",
    choices: [
      "elle est conservée",
      "elle est doublée",
      "elle est divisée par deux",
      "elle disparaît",
    ],
    expected: ["elle est conservée"],
    comparator: "mcq_exact",
    hint: "Une rotation ne déforme pas.",
    explanation:
      "Définition : une rotation fait tourner un point autour d’un centre.\n\n" +
      "Méthode : on compare la distance au centre avant et après rotation.\n\n" +
      "Calcul : OA = OA'.\n\n" +
      "Conclusion : la distance au centre est conservée.",
    tags: ["transformation", "rotation", "distance", "qcm"],
  },

  {
    kind: "template",
    id: "4e_sym_rotation_tpl_2_distance",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 3,
    theme: "neutral",
    hint: "Une rotation conserve la distance au centre.",
    tags: ["transformation", "rotation", "distance", "template"],
    generate: () => {
      const distance = randomChoice([3, 4, 5, 6, 7]);

      return {
        text: `Par une rotation de centre O, le point A devient A'. On sait que OA = ${distance} cm. Quelle est la longueur OA' ?`,
        format: "short",
        expected: [String(distance)],
        comparator: "number_equal",
        explanation:
          "Définition : une rotation conserve les distances au centre.\n\n" +
          "Méthode : on utilise OA = OA'.\n\n" +
          `Calcul : OA = ${distance} cm, donc OA' = ${distance} cm.\n\n` +
          `Conclusion : OA' mesure ${distance} cm.`,
      };
    },
  },

  /* =========================
     RENFORT PROPRIÉTÉS
  ========================= */

  {
    kind: "template",
    id: "4e_sym_transformation_propriete_tpl_2_angle",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Ces transformations conservent les angles.",
    tags: ["transformation", "propriete", "angle", "template"],
    generate: () => {
      const angle = randomChoice([35, 45, 60, 75, 90]);
      const transfo = randomChoice([
        "symétrie axiale",
        "symétrie centrale",
        "translation",
        "rotation",
      ]);

      return {
        text: `Un angle mesure ${angle}°. On applique une ${transfo}. Quelle est la mesure de l’angle image ?`,
        format: "short",
        expected: [String(angle)],
        comparator: "number_equal",
        explanation:
          "Définition : les symétries, translations et rotations conservent les angles.\n\n" +
          "Méthode : on repère que la transformation ne déforme pas la figure.\n\n" +
          `Calcul : l’angle de départ mesure ${angle}°, donc l’angle image mesure aussi ${angle}°.\n\n` +
          `Conclusion : l’angle image mesure ${angle}°.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_sym_transformation_propriete_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Une translation transforme un rectangle en...",
    format: "qcm",
    choices: ["un rectangle de même taille", "un triangle", "un rectangle agrandi", "un cercle"],
    expected: ["un rectangle de même taille"],
    comparator: "mcq_exact",
    hint: "La translation conserve la nature et les dimensions de la figure.",
    explanation:
      "Définition : une translation conserve la forme et la taille.\n\n" +
      "Méthode : on regarde la nature de la figure.\n\n" +
      "Calcul : un rectangle reste un rectangle, avec les mêmes dimensions.\n\n" +
      "Conclusion : l’image est un rectangle de même taille.",
    tags: ["transformation", "propriete", "rectangle", "qcm"],
  },

  /* =========================
     RENFORT DÉFIS
  ========================= */

  {
    kind: "template",
    id: "4e_sym_transformation_defi_tpl_2_reunion_canvas",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Observe si la figure glisse, tourne, se retourne ou fait un demi-tour.",
    tags: ["transformation", "defi", "reunion", "canvas", "template"],
    generate: () => {
      const dx = randomChoice([2, 3]);
      const dy = randomChoice([1, 2]);

      return {
        text: `Sur une carte simplifiée de La Réunion, un symbole est déplacé de ${dx} carreaux vers la droite et ${dy} carreau(x) vers le bas. Quelle transformation est représentée ?`,
        format: "qcm",
        choices: shuffle([
          "translation",
          "rotation",
          "symétrie centrale",
          "symétrie axiale",
        ]),
        expected: ["translation"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une translation correspond à un glissement.\n\n" +
          "Méthode : on vérifie si le symbole garde la même orientation.\n\n" +
          `Calcul : il est déplacé de ${dx} carreaux vers la droite et ${dy} carreau(x) vers le bas.\n\n` +
          "Conclusion : la transformation représentée est une translation.",
        canvas: transformationCanvas({
          transformation: "translation",
          grid: { rows: 8, cols: 8 },
          source: {
            label: "S",
            points: [
              { x: 1, y: 2 },
              { x: 2, y: 2 },
              { x: 1, y: 3 },
            ],
          },
          image: {
            label: "S'",
            points: [
              { x: 1 + dx, y: 2 + dy },
              { x: 2 + dx, y: 2 + dy },
              { x: 1 + dx, y: 3 + dy },
            ],
          },
          vector: {
            from: { x: 1, y: 7 },
            to: { x: 1 + dx, y: 7 + dy },
            label: "déplacement",
          },
        }),
      };
    },
  },
    /* =========================
     RENFORT CANVAS — AXE HORIZONTAL
  ========================= */

  {
    kind: "template",
    id: "4e_sym_axiale_tpl_2_axe_horizontal",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 2,
    theme: "neutral",
    hint: "L’axe horizontal joue le rôle d’un miroir.",
    tags: ["transformation", "symetrie_axiale", "axe_horizontal", "template", "canvas"],
    generate: () => {
      const axisY = randomChoice([4, 5]);

      return {
        text: "La figure rouge est-elle l’image de la figure bleue par symétrie axiale d’axe horizontal ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une symétrie axiale utilise un axe comme miroir.\n\n" +
          "Méthode : on vérifie que chaque point et son image sont à la même distance de l’axe.\n\n" +
          "Calcul : ici, l’axe est horizontal et sépare la figure de son image.\n\n" +
          "Conclusion : la figure rouge est bien l’image par symétrie axiale.",
        canvas: transformationCanvas({
          transformation: "symetrie_axiale",
          grid: { rows: 10, cols: 8 },
          source: {
            label: "F",
            points: [
              { x: 2, y: axisY - 3 },
              { x: 4, y: axisY - 3 },
              { x: 3, y: axisY - 1 },
            ],
          },
          image: {
            label: "F'",
            points: [
              { x: 2, y: axisY + 3 },
              { x: 4, y: axisY + 3 },
              { x: 3, y: axisY + 1 },
            ],
          },
          axis: { type: "horizontal", y: axisY, label: "axe" },
        }),
      };
    },
  },

  /* =========================
     RENFORT CANVAS — SYMÉTRIE CENTRALE PIÈGE
  ========================= */

  {
    kind: "template",
    id: "4e_sym_centrale_tpl_3_piege_non",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie si O est vraiment le milieu entre chaque point et son image.",
    tags: ["transformation", "symetrie_centrale", "piege", "template", "canvas"],
    generate: () => {
      return {
        text: "La figure rouge est-elle l’image de la figure bleue par symétrie centrale de centre O ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans une symétrie centrale, le centre doit être le milieu entre chaque point et son image.\n\n" +
          "Méthode : on vérifie l’alignement et les distances par rapport à O.\n\n" +
          "Calcul : ici, au moins un point image n’est pas placé exactement en face du point de départ par rapport à O.\n\n" +
          "Conclusion : la figure rouge n’est pas l’image par symétrie centrale.",
        canvas: transformationCanvas({
          transformation: "symetrie_centrale",
          grid: { rows: 8, cols: 8 },
          source: {
            label: "F",
            points: [
              { x: 2, y: 2 },
              { x: 3, y: 2 },
              { x: 2, y: 4 },
            ],
          },
          image: {
            label: "F'",
            points: [
              { x: 6, y: 6 },
              { x: 5, y: 6 },
              { x: 5, y: 4 },
            ],
          },
          center: { point: { x: 4, y: 4 }, label: "O" },
        }),
      };
    },
  },

  /* =========================
     TRANSLATION — VECTEUR ET IMAGE
  ========================= */

  {
    kind: "template",
    id: "4e_sym_translation_tpl_3_trouver_deplacement",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare un point et son image.",
    tags: ["transformation", "translation", "vecteur", "template", "canvas"],
    generate: () => {
      const dx = randomChoice([2, 3, 4]);
      const dy = randomChoice([1, 2]);

      return {
        text: "Quel déplacement permet de passer de la figure bleue à la figure rouge ?",
        format: "qcm",
        choices: shuffle([
          `${dx} carreaux à droite et ${dy} vers le bas`,
          `${dx} carreaux à gauche et ${dy} vers le bas`,
          `${dy} carreaux à droite et ${dx} vers le bas`,
          "un demi-tour autour de O",
        ]),
        expected: [`${dx} carreaux à droite et ${dy} vers le bas`],
        comparator: "mcq_exact",
        explanation:
          "Définition : une translation est définie par un déplacement.\n\n" +
          "Méthode : on compare un point de la figure et son image.\n\n" +
          `Calcul : le déplacement est de ${dx} carreaux à droite et ${dy} vers le bas.\n\n` +
          "Conclusion : ce déplacement définit la translation.",
        canvas: transformationCanvas({
          transformation: "translation",
          grid: { rows: 8, cols: 8 },
          source: {
            label: "F",
            points: [
              { x: 1, y: 1 },
              { x: 2, y: 1 },
              { x: 1, y: 3 },
            ],
          },
          image: {
            label: "F'",
            points: [
              { x: 1 + dx, y: 1 + dy },
              { x: 2 + dx, y: 1 + dy },
              { x: 1 + dx, y: 3 + dy },
            ],
          },
          vector: {
            from: { x: 1, y: 7 },
            to: { x: 1 + dx, y: 7 + dy },
            label: "vecteur",
          },
        }),
      };
    },
  },

  /* =========================
     ROTATION — SENS ET ANGLE
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_rotation_fixed_3_angle_180",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 2,
    theme: "neutral",
    text: "Une rotation de 180° autour d’un point correspond aussi à...",
    format: "qcm",
    choices: [
      "une symétrie centrale",
      "une translation",
      "une symétrie axiale",
      "un agrandissement",
    ],
    expected: ["une symétrie centrale"],
    comparator: "mcq_exact",
    hint: "Un demi-tour autour d’un point.",
    explanation:
      "Définition : une symétrie centrale est un demi-tour autour d’un centre.\n\n" +
      "Méthode : on associe demi-tour et rotation de 180°.\n\n" +
      "Calcul : 180° correspond à un demi-tour.\n\n" +
      "Conclusion : une rotation de 180° correspond à une symétrie centrale.",
    tags: ["transformation", "rotation", "symetrie_centrale", "qcm"],
  },

  {
    kind: "template",
    id: "4e_sym_rotation_tpl_3_angle_qcm",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe l’angle de rotation autour de O.",
    tags: ["transformation", "rotation", "angle", "template", "canvas"],
    generate: () => {
      const angle = randomChoice([90, 180]);

      return {
        text: "Quel angle de rotation semble transformer la figure bleue en figure rouge autour de O ?",
        format: "qcm",
        choices: shuffle([`${angle}°`, "45°", "270°", "aucune rotation"]),
        expected: [`${angle}°`],
        comparator: "mcq_exact",
        explanation:
          "Définition : une rotation est définie par un centre et un angle.\n\n" +
          "Méthode : on observe le changement de position autour du centre O.\n\n" +
          `Calcul : ici, l’angle indiqué est ${angle}°.\n\n` +
          `Conclusion : la rotation est une rotation de ${angle}°.`,
        canvas: transformationCanvas({
          transformation: "rotation",
          angleDeg: angle,
          grid: { rows: 8, cols: 8 },
          source: {
            label: "F",
            points: [
              { x: 5, y: 2 },
              { x: 6, y: 2 },
              { x: 5, y: 3 },
            ],
          },
          image: {
            label: "F'",
            points:
              angle === 90
                ? [
                    { x: 6, y: 5 },
                    { x: 6, y: 6 },
                    { x: 5, y: 5 },
                  ]
                : [
                    { x: 3, y: 6 },
                    { x: 2, y: 6 },
                    { x: 3, y: 5 },
                  ],
          },
          center: { point: { x: 4, y: 4 }, label: "O" },
        }),
      };
    },
  },

  /* =========================
     PROPRIÉTÉS — ALIGNEMENT / PARALLÉLISME
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_transformation_propriete_fixed_3_alignement",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Si trois points sont alignés, leurs images par une translation sont...",
    format: "qcm",
    choices: [
      "alignées",
      "toujours perpendiculaires",
      "toujours confondues",
      "placées au hasard",
    ],
    expected: ["alignées"],
    comparator: "mcq_exact",
    hint: "Une translation conserve l’alignement.",
    explanation:
      "Définition : une translation conserve la forme de la figure.\n\n" +
      "Méthode : on applique la propriété de conservation.\n\n" +
      "Calcul : l’alignement est conservé par translation.\n\n" +
      "Conclusion : les images de trois points alignés sont alignées.",
    tags: ["transformation", "propriete", "alignement"],
  },

  {
    kind: "fixed",
    id: "4e_sym_transformation_propriete_fixed_4_parallelisme",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Deux droites parallèles restent parallèles après une rotation.",
    format: "qcm",
    choices: ["vrai", "faux"],
    expected: ["vrai"],
    comparator: "mcq_exact",
    hint: "Une rotation conserve le parallélisme.",
    explanation:
      "Définition : une rotation ne déforme pas la configuration.\n\n" +
      "Méthode : on utilise les propriétés conservées par rotation.\n\n" +
      "Calcul : le parallélisme est conservé.\n\n" +
      "Conclusion : l’affirmation est vraie.",
    tags: ["transformation", "propriete", "parallelisme", "qcm"],
  },

  /* =========================
     DÉFIS — TRANSFORMATIONS SUCCESSIVES
  ========================= */

  {
    kind: "fixed",
    id: "4e_sym_transformation_defi_fixed_2_successives",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une figure subit une translation puis une rotation. Peut-on dire que les longueurs sont conservées après les deux transformations ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Chaque transformation conserve les longueurs.",
    explanation:
      "Définition : une translation et une rotation conservent les longueurs.\n\n" +
      "Méthode : on applique successivement les propriétés de chaque transformation.\n\n" +
      "Calcul : si la première conserve les longueurs et la deuxième aussi, alors la composition conserve les longueurs.\n\n" +
      "Conclusion : les longueurs sont conservées après les deux transformations.",
    tags: ["transformation", "defi", "successives", "propriete"],
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- SYM_AXIALE ----------
  {
    kind: "fixed",
    id: "4e_sym_axiale_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une symétrie axiale, l’axe est…",
    format: "qcm",
    choices: [
      "la médiatrice du segment reliant un point à son image",
      "parallèle au segment [AA']",
      "toujours horizontal",
      "le milieu de la figure",
    ],
    expected: ["la médiatrice du segment reliant un point à son image"],
    comparator: "mcq_exact",
    hint: "L’axe passe au milieu de [AA'] et lui est perpendiculaire.",
    explanation:
      "Définition : dans une symétrie axiale, l’axe est la médiatrice de [AA'].\n\n" +
      "Méthode : on vérifie que l’axe est perpendiculaire à [AA'] et passe par son milieu.\n\n" +
      "Calcul : c’est la définition de la médiatrice.\n\n" +
      "Conclusion : l’axe est la médiatrice du segment [AA'].",
    tags: ["transformation", "symetrie_axiale", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_sym_axiale_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 2,
    theme: "neutral",
    text: "Une symétrie axiale conserve-t-elle les longueurs ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un miroir ne déforme pas.",
    explanation:
      "Définition : une symétrie axiale est une isométrie (elle ne déforme pas).\n\n" +
      "Méthode : on compare la figure et son image.\n\n" +
      "Calcul : les longueurs sont identiques.\n\n" +
      "Conclusion : oui, la symétrie axiale conserve les longueurs.",
    tags: ["transformation", "symetrie_axiale", "propriete", "qcm"],
  },
  {
    kind: "template",
    id: "4e_sym_axiale_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 2,
    theme: "neutral",
    hint: "La distance à l’axe est conservée.",
    tags: ["transformation", "symetrie_axiale", "distance", "template"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5]);
      return {
        text: `Un point A est à ${d} cm de l’axe de symétrie. À quelle distance de l’axe se trouve son image A' ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation:
          "Définition : dans une symétrie axiale, un point et son image sont à la même distance de l’axe.\n\n" +
          "Méthode : on utilise la conservation de la distance à l’axe.\n\n" +
          `Calcul : A est à ${d} cm, donc A' est aussi à ${d} cm.\n\n` +
          `Conclusion : A' est à ${d} cm de l’axe.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_sym_axiale_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie que chaque point et son image sont à la même distance de l’axe.",
    tags: ["transformation", "symetrie_axiale", "template", "canvas"],
    generate: () => {
      const axisX = randomChoice([4, 5]);
      return {
        text: "La figure rouge est-elle l’image de la figure bleue par cette symétrie axiale ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une symétrie axiale utilise l’axe comme miroir.\n\n" +
          "Méthode : on vérifie l’égalité des distances à l’axe.\n\n" +
          "Calcul : chaque point et son image sont symétriques par rapport à l’axe.\n\n" +
          "Conclusion : oui, la figure rouge est l’image par symétrie axiale.",
        canvas: transformationCanvas({
          transformation: "symetrie_axiale",
          grid: { rows: 8, cols: 10 },
          source: {
            label: "F",
            points: [
              { x: axisX - 2, y: 2 },
              { x: axisX - 1, y: 2 },
              { x: axisX - 2, y: 5 },
            ],
          },
          image: {
            label: "F'",
            points: [
              { x: axisX + 2, y: 2 },
              { x: axisX + 1, y: 2 },
              { x: axisX + 2, y: 5 },
            ],
          },
          axis: { type: "vertical", x: axisX, label: "axe" },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_sym_axiale_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_axiale",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi l’axe d’une symétrie axiale est appelé « axe de symétrie ».",
    format: "open",
    expected: ["miroir", "axe", "distance"],
    comparator: "contains_keyword",
    hint: "Pense à l’effet miroir.",
    explanation:
      "Définition : l’axe agit comme un miroir entre la figure et son image.\n\n" +
      "Méthode : on observe que chaque point et son image sont symétriques par rapport à l’axe.\n\n" +
      "Calcul : ils sont à la même distance de l’axe, de part et d’autre.\n\n" +
      "Conclusion : l’axe est un axe de symétrie car il reflète la figure comme un miroir.",
    tags: ["transformation", "symetrie_axiale", "open"],
  },

  // ---------- SYM_CENTRALE ----------
  {
    kind: "fixed",
    id: "4e_sym_centrale_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une symétrie centrale de centre O, le point O est…",
    format: "qcm",
    choices: [
      "le milieu de [AA']",
      "un sommet de la figure",
      "sur l’axe de symétrie",
      "à l’extérieur du segment [AA']",
    ],
    expected: ["le milieu de [AA']"],
    comparator: "mcq_exact",
    hint: "O est au centre, entre A et A'.",
    explanation:
      "Définition : dans une symétrie centrale, O est le milieu de [AA'].\n\n" +
      "Méthode : on vérifie l’alignement A, O, A' et l’égalité OA = OA'.\n\n" +
      "Calcul : O est exactement au milieu.\n\n" +
      "Conclusion : O est le milieu de [AA'].",
    tags: ["transformation", "symetrie_centrale", "qcm"],
  },
  {
    kind: "template",
    id: "4e_sym_centrale_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 2,
    theme: "neutral",
    hint: "O doit être le milieu entre chaque point et son image.",
    tags: ["transformation", "symetrie_centrale", "template", "canvas"],
    generate: () => ({
      text: "La figure rouge est-elle l’image de la figure bleue par symétrie centrale de centre O ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["oui"],
      comparator: "mcq_exact",
      explanation:
        "Définition : une symétrie centrale est un demi-tour autour de O.\n\n" +
        "Méthode : on vérifie que O est le milieu entre chaque point et son image.\n\n" +
        "Calcul : les points correspondants sont alignés avec O et à la même distance.\n\n" +
        "Conclusion : oui, la figure rouge est l’image par symétrie centrale.",
      canvas: transformationCanvas({
        transformation: "symetrie_centrale",
        grid: { rows: 8, cols: 8 },
        source: {
          label: "F",
          points: [
            { x: 1, y: 3 },
            { x: 3, y: 3 },
            { x: 1, y: 5 },
          ],
        },
        image: {
          label: "F'",
          points: [
            { x: 7, y: 5 },
            { x: 5, y: 5 },
            { x: 7, y: 3 },
          ],
        },
        center: { point: { x: 4, y: 4 }, label: "O" },
      }),
    }),
  },
  {
    kind: "fixed",
    id: "4e_sym_centrale_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_centrale",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi une symétrie centrale est aussi appelée « demi-tour ».",
    format: "open",
    expected: ["demi-tour", "180", "centre"],
    comparator: "contains_keyword",
    hint: "Pense à une rotation de 180°.",
    explanation:
      "Définition : une symétrie centrale de centre O équivaut à une rotation de 180° autour de O.\n\n" +
      "Méthode : on imagine la figure qui pivote d’un demi-tour autour de O.\n\n" +
      "Calcul : 180° correspond à un demi-tour complet.\n\n" +
      "Conclusion : la symétrie centrale est un demi-tour autour du centre.",
    tags: ["transformation", "symetrie_centrale", "open"],
  },

  // ---------- SYM_TRANSLATION ----------
  {
    kind: "fixed",
    id: "4e_sym_translation_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 1,
    theme: "neutral",
    text: "Lors d’une translation, l’orientation de la figure…",
    format: "qcm",
    choices: ["ne change pas", "tourne de 90°", "fait un demi-tour", "est inversée comme un miroir"],
    expected: ["ne change pas"],
    comparator: "mcq_exact",
    hint: "La figure glisse sans tourner.",
    explanation:
      "Définition : une translation est un glissement, sans rotation.\n\n" +
      "Méthode : on observe l’orientation avant et après.\n\n" +
      "Calcul : la figure garde la même orientation.\n\n" +
      "Conclusion : l’orientation ne change pas.",
    tags: ["transformation", "translation", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_sym_translation_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 2,
    theme: "neutral",
    text: "Une translation est définie par…",
    format: "qcm",
    choices: ["un vecteur (déplacement)", "un centre et un angle", "un axe", "un rapport"],
    expected: ["un vecteur (déplacement)"],
    comparator: "mcq_exact",
    hint: "Direction, sens et longueur du glissement.",
    explanation:
      "Définition : une translation est définie par un vecteur (déplacement).\n\n" +
      "Méthode : le vecteur donne la direction, le sens et la longueur.\n\n" +
      "Calcul : tous les points suivent ce même vecteur.\n\n" +
      "Conclusion : une translation est définie par un vecteur.",
    tags: ["transformation", "translation", "qcm"],
  },
  {
    kind: "template",
    id: "4e_sym_translation_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 3,
    theme: "neutral",
    hint: "Vers la droite : on ajoute à l’abscisse ; vers le bas : on ajoute à l’ordonnée écran.",
    tags: ["transformation", "translation", "coordonnees", "template"],
    generate: () => {
      const x = randomChoice([0, 1, 2, 3]);
      const y = randomChoice([0, 1, 2]);
      const dx = randomChoice([2, 3, 4]);
      const dy = randomChoice([1, 2]);
      return {
        text: `Le point A(${x};${y}) subit une translation de ${dx} carreaux vers la droite et ${dy} vers le bas. Quelles sont les coordonnées de A' ?`,
        format: "qcm",
        choices: shuffle([
          `(${x + dx};${y + dy})`,
          `(${x - dx};${y + dy})`,
          `(${x + dx};${y - dy})`,
          `(${dx};${dy})`,
        ]),
        expected: [`(${x + dx};${y + dy})`],
        comparator: "mcq_exact",
        explanation:
          "Définition : une translation déplace tous les points de la même façon.\n\n" +
          "Méthode : on ajoute le déplacement aux coordonnées (ordonnée écran vers le bas).\n\n" +
          `Calcul : A(${x};${y}) devient A'(${x + dx};${y + dy}).\n\n` +
          `Conclusion : les coordonnées de A' sont (${x + dx};${y + dy}).`,
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_sym_translation_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_translation",
    difficulty: 3,
    theme: "neutral",
    text: "Explique ce qu’est le vecteur d’une translation.",
    format: "open",
    expected: ["direction", "sens", "longueur"],
    comparator: "contains_keyword",
    hint: "Trois informations : direction, sens, longueur.",
    explanation:
      "Définition : le vecteur d’une translation indique le déplacement à appliquer à chaque point.\n\n" +
      "Méthode : il précise la direction, le sens et la longueur du glissement.\n\n" +
      "Calcul : tous les points subissent ce même vecteur.\n\n" +
      "Conclusion : le vecteur donne la direction, le sens et la longueur du déplacement.",
    tags: ["transformation", "translation", "open"],
  },

  // ---------- SYM_ROTATION ----------
  {
    kind: "fixed",
    id: "4e_sym_rotation_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 2,
    theme: "neutral",
    text: "Une rotation de 360° autour d’un point ramène la figure…",
    format: "qcm",
    choices: [
      "à sa position de départ",
      "à un demi-tour",
      "à un quart de tour",
      "vers un agrandissement",
    ],
    expected: ["à sa position de départ"],
    comparator: "mcq_exact",
    hint: "360° = un tour complet.",
    explanation:
      "Définition : une rotation de 360° est un tour complet.\n\n" +
      "Méthode : on imagine la figure qui revient à son point de départ.\n\n" +
      "Calcul : un tour complet ne change pas la position.\n\n" +
      "Conclusion : la figure revient à sa position de départ.",
    tags: ["transformation", "rotation", "qcm"],
  },
  {
    kind: "template",
    id: "4e_sym_rotation_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 3,
    theme: "neutral",
    hint: "Une rotation conserve la distance au centre, pas la position.",
    tags: ["transformation", "rotation", "distance", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6, 8]);
      return {
        text: `Par une rotation de centre O, un point M situé à ${d} cm de O devient M'. À quelle distance de O se trouve M' ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation:
          "Définition : une rotation conserve la distance au centre.\n\n" +
          "Méthode : on utilise OM = OM'.\n\n" +
          `Calcul : OM = ${d} cm, donc OM' = ${d} cm.\n\n` +
          `Conclusion : M' est à ${d} cm de O.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_sym_rotation_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_rotation",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles informations faut-il pour définir une rotation ?",
    format: "open",
    expected: ["centre", "angle", "sens"],
    comparator: "contains_keyword",
    hint: "Trois éléments dont le centre.",
    explanation:
      "Définition : une rotation est définie par un centre, un angle et un sens.\n\n" +
      "Méthode : on précise autour de quel point, de combien de degrés et dans quel sens.\n\n" +
      "Calcul : ces trois éléments déterminent complètement la rotation.\n\n" +
      "Conclusion : il faut le centre, l’angle et le sens de rotation.",
    tags: ["transformation", "rotation", "open"],
  },

  // ---------- SYM_TRANSFORMATION_PROPRIETE ----------
  {
    kind: "fixed",
    id: "4e_sym_transformation_propriete_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Une symétrie centrale conserve-t-elle l’aire d’une figure ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Ces transformations ne déforment pas la figure.",
    explanation:
      "Définition : une symétrie centrale est une isométrie.\n\n" +
      "Méthode : on compare la figure et son image.\n\n" +
      "Calcul : les longueurs sont conservées, donc l’aire aussi.\n\n" +
      "Conclusion : oui, l’aire est conservée.",
    tags: ["transformation", "propriete", "aire", "qcm"],
  },
  {
    kind: "template",
    id: "4e_sym_transformation_propriete_tpl_3_perimetre",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Le périmètre est conservé par ces transformations.",
    tags: ["transformation", "propriete", "perimetre", "template"],
    generate: () => {
      const perimetre = randomChoice([12, 16, 18, 20, 24]);
      const transfo = randomChoice(["translation", "rotation", "symétrie centrale", "symétrie axiale"]);
      return {
        text: `Une figure a un périmètre de ${perimetre} cm. On lui applique une ${transfo}. Quel est le périmètre de son image ?`,
        format: "short",
        expected: [String(perimetre)],
        comparator: "number_equal",
        explanation:
          "Définition : ces transformations conservent les longueurs, donc le périmètre.\n\n" +
          "Méthode : on identifie que la figure n’est pas déformée.\n\n" +
          `Calcul : le périmètre de départ est ${perimetre} cm, l’image aussi.\n\n` +
          `Conclusion : le périmètre image est ${perimetre} cm.`,
      };
    },
  },

  // ---------- SYM_TRANSFORMATION_DEFIS ----------
  {
    kind: "fixed",
    id: "4e_sym_transformation_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une figure est retournée comme dans un miroir par rapport à une droite. Quelle transformation est-ce ?",
    format: "qcm",
    choices: ["symétrie axiale", "translation", "rotation", "symétrie centrale"],
    expected: ["symétrie axiale"],
    comparator: "mcq_exact",
    hint: "Effet miroir = axe.",
    explanation:
      "Définition : un effet miroir par rapport à une droite est une symétrie axiale.\n\n" +
      "Méthode : on repère la droite-miroir.\n\n" +
      "Calcul : la figure est retournée par rapport à l’axe.\n\n" +
      "Conclusion : c’est une symétrie axiale.",
    tags: ["transformation", "defi", "symetrie_axiale", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_sym_transformation_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une figure subit une symétrie axiale puis une autre symétrie axiale. Les longueurs sont-elles conservées ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Chaque symétrie axiale conserve les longueurs.",
    explanation:
      "Définition : une symétrie axiale est une isométrie.\n\n" +
      "Méthode : on enchaîne deux transformations qui conservent chacune les longueurs.\n\n" +
      "Calcul : si chaque étape conserve les longueurs, la composition aussi.\n\n" +
      "Conclusion : oui, les longueurs sont conservées.",
    tags: ["transformation", "defi", "successives", "qcm"],
  },
  {
    kind: "template",
    id: "4e_sym_transformation_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Associe l’indice visuel à la bonne transformation.",
    tags: ["transformation", "defi", "template"],
    generate: () => {
      const situation = randomChoice([
        { text: "La figure fait un quart de tour autour d’un point.", expected: "rotation", wrongs: ["translation", "symétrie axiale", "symétrie centrale"] },
        { text: "La figure glisse en diagonale sans tourner.", expected: "translation", wrongs: ["rotation", "symétrie axiale", "symétrie centrale"] },
        { text: "La figure fait un demi-tour autour d’un point.", expected: "symétrie centrale", wrongs: ["translation", "symétrie axiale", "rotation de 90°"] },
        { text: "La figure se reflète par rapport à une droite verticale.", expected: "symétrie axiale", wrongs: ["translation", "rotation", "symétrie centrale"] },
      ]);
      return {
        text: `${situation.text} Quelle transformation reconnaît-on ?`,
        format: "qcm",
        choices: shuffle([situation.expected, ...situation.wrongs]),
        expected: [situation.expected],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque transformation a un indice visuel.\n\n" +
          "Méthode : glissement = translation ; demi-tour = symétrie centrale ; tour autour d’un centre = rotation ; miroir = symétrie axiale.\n\n" +
          `Calcul : ici, ${situation.text.toLowerCase()}\n\n` +
          `Conclusion : la transformation est ${situation.expected}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_sym_transformation_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi les transformations vues en 4e (symétries, translation, rotation) ne changent pas la taille des figures.",
    format: "open",
    expected: ["longueurs", "conservées", "déforme"],
    comparator: "contains_keyword",
    hint: "Pense à ce que ces transformations conservent.",
    explanation:
      "Définition : ces transformations sont des isométries.\n\n" +
      "Méthode : elles déplacent ou retournent la figure sans la déformer.\n\n" +
      "Calcul : les longueurs et les angles sont conservés, donc la taille ne change pas.\n\n" +
      "Conclusion : la taille est inchangée car les longueurs sont conservées.",
    tags: ["transformation", "defi", "open"],
  },
  {
    kind: "template",
    id: "4e_sym_transformation_defi_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "sym_transformation",
    microId: "sym_transformation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Un motif répété par glissement régulier.",
    tags: ["transformation", "defi", "frise", "template"],
    generate: () => {
      const dx = randomChoice([2, 3, 4]);
      return {
        text: `Sur une frise décorative, un même motif est reproduit en le déplaçant à chaque fois de ${dx} carreaux vers la droite. Quelle transformation est utilisée ?`,
        format: "qcm",
        choices: shuffle(["translation", "rotation", "symétrie axiale", "symétrie centrale"]),
        expected: ["translation"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un déplacement régulier sans rotation est une translation.\n\n" +
          "Méthode : on observe que le motif glisse toujours de la même façon.\n\n" +
          `Calcul : chaque motif avance de ${dx} carreaux vers la droite.\n\n` +
          "Conclusion : la transformation est une translation.",
      };
    },
  },
];