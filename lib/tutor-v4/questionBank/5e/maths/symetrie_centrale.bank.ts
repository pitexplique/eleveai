// lib/tutor-v4/question-banks/maths/5e/symetrie_centrale.bank.ts

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

function expl(calcul: string) {
  return (
    "Définition : une symétrie centrale est un demi-tour autour d’un point appelé centre.\n\n" +
    "Méthode : on relie chaque point au centre et on reporte la même distance de l’autre côté.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : la figure ou le point obtenu est l’image par la symétrie centrale."
  );
}

export const symetrieCentraleBank: TutorBankItemV4[] = [
  /* =========================
     SYM_CENTRALE_RECONNAITRE
  ========================= */

  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Une symétrie centrale correspond à...",
    format: "qcm",
    choices: [
      "un demi-tour autour d’un point",
      "un miroir avec un axe",
      "un glissement",
      "un agrandissement",
    ],
    expected: ["un demi-tour autour d’un point"],
    comparator: "mcq_exact",
    hint: "Pense à une rotation de 180°.",
    explanation:
      "Définition : une symétrie centrale est un demi-tour autour d’un point appelé centre.\n\n" +
      "Méthode : on repère le centre de symétrie.\n\n" +
      "Calcul : un point, son image et le centre sont alignés, et le centre est au milieu.\n\n" +
      "Conclusion : une symétrie centrale correspond à un demi-tour autour d’un point.",
    tags: ["sym_centrale", "definition", "qcm", "canvas"],
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
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une symétrie centrale de centre O, le centre O est...",
    format: "qcm",
    choices: [
      "le milieu entre un point et son image",
      "un axe de symétrie",
      "toujours un sommet de la figure",
      "un vecteur de déplacement",
    ],
    expected: ["le milieu entre un point et son image"],
    comparator: "mcq_exact",
    hint: "A et A' sont de part et d’autre de O.",
    explanation:
      "Définition : dans une symétrie centrale, le centre est le milieu entre un point et son image.\n\n" +
      "Méthode : on vérifie que A, O et A' sont alignés.\n\n" +
      "Calcul : OA = OA'.\n\n" +
      "Conclusion : O est le milieu du segment [AA'].",
    tags: ["sym_centrale", "centre", "milieu", "qcm"],
  },

  {
    kind: "template",
    id: "5e_sym_centrale_reconnaitre_tpl_1_canvas_oui",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si O est le milieu entre chaque point et son image.",
    tags: ["sym_centrale", "reconnaitre", "template", "canvas"],
    generate: () => ({
      text: "La figure rouge est-elle l’image de la figure bleue par symétrie centrale de centre O ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["oui"],
      comparator: "mcq_exact",
      explanation:
        "Définition : une symétrie centrale est un demi-tour autour d’un centre.\n\n" +
        "Méthode : on vérifie que chaque point, son image et O sont alignés.\n\n" +
        "Calcul : O est le milieu entre chaque point et son image.\n\n" +
        "Conclusion : la figure rouge est bien l’image par symétrie centrale.",
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
    }),
  },

  {
    kind: "template",
    id: "5e_sym_centrale_reconnaitre_tpl_2_piege_non",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie tous les points, pas seulement un seul.",
    tags: ["sym_centrale", "reconnaitre", "piege", "template", "canvas"],
    generate: () => ({
      text: "La figure rouge est-elle l’image de la figure bleue par symétrie centrale de centre O ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["non"],
      comparator: "mcq_exact",
      explanation:
        "Définition : dans une symétrie centrale, O doit être le milieu entre chaque point et son image.\n\n" +
        "Méthode : on vérifie l’alignement et les distances pour plusieurs points.\n\n" +
        "Calcul : ici, au moins un point image n’est pas placé correctement par rapport à O.\n\n" +
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
    }),
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique en une phrase ce qu’est une symétrie centrale.",
    format: "open",
    expected: ["demi-tour", "centre", "point", "180"],
    comparator: "contains_keyword",
    hint: "Utilise les mots centre et demi-tour.",
    explanation:
      "Définition : une symétrie centrale est un demi-tour autour d’un point appelé centre.\n\n" +
      "Méthode : on décrit le mouvement de la figure.\n\n" +
      "Calcul : un demi-tour correspond à 180°.\n\n" +
      "Conclusion : une symétrie centrale est un demi-tour autour d’un centre.",
    tags: ["sym_centrale", "open", "vocabulaire"],
  },

  /* =========================
     SYM_CENTRALE_POINT
  ========================= */

  {
    kind: "fixed",
    id: "5e_sym_centrale_point_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire l’image A' d’un point A par symétrie centrale de centre O, on doit...",
    format: "qcm",
    choices: [
      "placer A' sur la droite (AO) avec OA = OA'",
      "placer A' n’importe où",
      "tracer un axe vertical",
      "doubler la distance OA",
    ],
    expected: ["placer A' sur la droite (AO) avec OA = OA'"],
    comparator: "mcq_exact",
    hint: "A, O et A' sont alignés.",
    explanation:
      "Définition : dans une symétrie centrale, A, O et A' sont alignés.\n\n" +
      "Méthode : on trace la droite (AO), puis on place A' de l’autre côté de O.\n\n" +
      "Calcul : OA = OA'.\n\n" +
      "Conclusion : A' est placé sur la droite (AO), avec O milieu de [AA'].",
    tags: ["sym_centrale", "point", "construction", "qcm"],
  },

  {
    kind: "template",
    id: "5e_sym_centrale_point_tpl_1_distance",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 2,
    theme: "neutral",
    hint: "Le centre est au milieu.",
    tags: ["sym_centrale", "point", "distance", "template"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5, 6]);

      return {
        text: `Dans une symétrie centrale de centre O, on sait que OA = ${d} cm. Quelle est la longueur OA' ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation:
          "Définition : dans une symétrie centrale, O est le milieu de [AA'].\n\n" +
          "Méthode : on utilise l’égalité OA = OA'.\n\n" +
          `Calcul : OA = ${d} cm, donc OA' = ${d} cm.\n\n` +
          `Conclusion : OA' mesure ${d} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "5e_sym_centrale_point_tpl_2_coordonnees",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 3,
    theme: "neutral",
    hint: "O est le milieu entre A et A'.",
    tags: ["sym_centrale", "point", "coordonnees", "template"],
    generate: () => {
      const ox = 4;
      const oy = 4;
      const x = randomChoice([1, 2, 3]);
      // Deux pièges sont « on échange x et y » et « on soustrait au centre ».
      // Quand x + y = 4, ils s'écrivent pareil : (y ; x) et (4-x ; 4-y) sont le
      // même couple.
      const y = randomChoice([1, 2, 3].filter((v) => v + x !== 4));
      const xp = 2 * ox - x;
      const yp = 2 * oy - y;

      return {
        text: `Sur un quadrillage, O(${ox};${oy}) est le centre de symétrie et A(${x};${y}). Quelles sont les coordonnées de A' ?`,
        format: "qcm",
        choices: shuffle([
          `(${xp};${yp})`,
          `(${x + ox};${y + oy})`,
          `(${y};${x})`,
          `(${ox - x};${oy - y})`,
        ]),
        expected: [`(${xp};${yp})`],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans une symétrie centrale, O est le milieu du segment [AA'].\n\n" +
          "Méthode : on cherche le point situé de l’autre côté de O à la même distance.\n\n" +
          `Calcul : avec O(${ox};${oy}) et A(${x};${y}), on obtient A'(${xp};${yp}).\n\n` +
          `Conclusion : les coordonnées de A' sont (${xp};${yp}).`,
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_point_erreur_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève place A' à la bonne distance de O, mais pas sur la droite (AO). Sa construction est-elle correcte ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut aussi vérifier l’alignement.",
    explanation:
      "Définition : dans une symétrie centrale, A, O et A' sont alignés.\n\n" +
      "Méthode : il faut vérifier deux conditions : alignement et égalité des distances.\n\n" +
      "Calcul : même si OA = OA', A' doit être sur la droite (AO).\n\n" +
      "Conclusion : la construction n’est pas correcte.",
    tags: ["sym_centrale", "point", "erreur", "alignement"],
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_point_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 4,
    theme: "neutral",
    text: "Explique les étapes pour construire l’image A' d’un point A par symétrie centrale de centre O.",
    format: "open",
    expected: ["droite", "alignés", "OA", "OA'", "milieu", "centre"],
    comparator: "contains_keyword",
    hint: "Trace la droite puis reporte la distance.",
    explanation:
      "Définition : dans une symétrie centrale, le centre est le milieu entre un point et son image.\n\n" +
      "Méthode : on trace la droite (AO), puis on place A' de l’autre côté de O.\n\n" +
      "Calcul : on reporte la distance OA pour avoir OA' = OA.\n\n" +
      "Conclusion : A' est construit lorsque O est le milieu de [AA'].",
    tags: ["sym_centrale", "point", "open", "construction"],
  },

  /* =========================
     SYM_CENTRALE_FIGURE
  ========================= */

  {
    kind: "fixed",
    id: "5e_sym_centrale_figure_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire l’image d’un triangle par symétrie centrale, on construit...",
    format: "qcm",
    choices: [
      "l’image de chacun de ses sommets",
      "seulement l’image d’un côté",
      "un axe vertical",
      "une figure plus grande",
    ],
    expected: ["l’image de chacun de ses sommets"],
    comparator: "mcq_exact",
    hint: "Un triangle est défini par ses sommets.",
    explanation:
      "Définition : l’image d’une figure est obtenue en transformant ses points importants.\n\n" +
      "Méthode : pour un triangle, on construit l’image de chaque sommet.\n\n" +
      "Calcul : on construit A', B' et C', puis on relie les points.\n\n" +
      "Conclusion : on construit l’image de chacun des sommets.",
    tags: ["sym_centrale", "figure", "triangle", "qcm"],
  },

  {
    kind: "template",
    id: "5e_sym_centrale_figure_tpl_1_triangle",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque sommet image doit être en face du sommet de départ par rapport à O.",
    tags: ["sym_centrale", "figure", "triangle", "template", "canvas"],
    generate: () => ({
      text: "La figure rouge est-elle bien l’image du triangle bleu par symétrie centrale de centre O ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["oui"],
      comparator: "mcq_exact",
      explanation:
        "Définition : l’image d’un triangle par symétrie centrale est obtenue en transformant ses trois sommets.\n\n" +
        "Méthode : on vérifie que O est le milieu de [AA'], [BB'] et [CC'].\n\n" +
        "Calcul : les trois sommets images sont correctement placés.\n\n" +
        "Conclusion : la figure rouge est bien l’image du triangle bleu.",
      canvas: transformationCanvas({
        transformation: "symetrie_centrale",
        grid: { rows: 8, cols: 8 },
        source: {
          label: "ABC",
          points: [
            { x: 2, y: 2 },
            { x: 4, y: 2 },
            { x: 2, y: 5 },
          ],
        },
        image: {
          label: "A'B'C'",
          points: [
            { x: 6, y: 6 },
            { x: 4, y: 6 },
            { x: 6, y: 3 },
          ],
        },
        center: { point: { x: 4, y: 4 }, label: "O" },
      }),
    }),
  },

  {
    kind: "template",
    id: "5e_sym_centrale_figure_tpl_2_quadrilatere",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Construis l’image de chaque sommet.",
    tags: ["sym_centrale", "figure", "quadrilatere", "template", "canvas"],
    generate: () => ({
      text: "La figure rouge est l’image du quadrilatère bleu par symétrie centrale. Quel est le centre ?",
      format: "qcm",
      choices: shuffle(["O", "A", "B", "F'"]),
      expected: ["O"],
      comparator: "mcq_exact",
      explanation:
        "Définition : le centre de symétrie est le milieu entre chaque point et son image.\n\n" +
        "Méthode : on repère le point situé au milieu des segments reliant les points correspondants.\n\n" +
        "Calcul : le point O est au milieu entre les sommets et leurs images.\n\n" +
        "Conclusion : le centre est O.",
      canvas: transformationCanvas({
        transformation: "symetrie_centrale",
        grid: { rows: 8, cols: 8 },
        source: {
          label: "F",
          points: [
            { x: 1, y: 2 },
            { x: 3, y: 2 },
            { x: 3, y: 4 },
            { x: 2, y: 5 },
          ],
        },
        image: {
          label: "F'",
          points: [
            { x: 7, y: 6 },
            { x: 5, y: 6 },
            { x: 5, y: 4 },
            { x: 6, y: 3 },
          ],
        },
        center: { point: { x: 4, y: 4 }, label: "O" },
      }),
    }),
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_figure_erreur_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève construit correctement A' et B', mais place C' au hasard. Peut-on dire que le triangle image est correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Tous les sommets doivent être correctement transformés.",
    explanation:
      "Définition : l’image d’une figure est correcte si tous ses points importants sont correctement transformés.\n\n" +
      "Méthode : pour un triangle, on vérifie A', B' et C'.\n\n" +
      "Calcul : si C' est mal placé, le triangle image est faux.\n\n" +
      "Conclusion : le triangle image n’est pas correct.",
    tags: ["sym_centrale", "figure", "erreur"],
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_figure_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment construire l’image d’un triangle ABC par symétrie centrale de centre O.",
    format: "open",
    expected: ["A'", "B'", "C'", "sommets", "relier", "centre"],
    comparator: "contains_keyword",
    hint: "Construis l’image de chaque sommet.",
    explanation:
      "Définition : l’image d’un triangle s’obtient en transformant ses trois sommets.\n\n" +
      "Méthode : on construit A', B' et C' par symétrie centrale de centre O.\n\n" +
      "Calcul : O doit être le milieu de [AA'], [BB'] et [CC'].\n\n" +
      "Conclusion : en reliant A', B' et C', on obtient le triangle image.",
    tags: ["sym_centrale", "figure", "open", "construction"],
  },
  {
  kind: "fixed",
  id: "5e_sym_centrale_figure_open_2_justifier_canvas",
  niveau: "5e",
  matiere: "maths",
  notionId: "sym_centrale",
  microId: "sym_centrale_figure",
  difficulty: 4,
  theme: "neutral",
  text: "Observe la figure. Justifie pourquoi la figure rouge est bien l’image de la figure bleue par symétrie centrale de centre O.",
  format: "open",
  expected: ["alignés", "milieu", "centre", "distance", "sommets"],
  comparator: "contains_keyword",
  hint: "Tu dois parler des sommets, de l’alignement et du milieu.",
  explanation:
    "Définition : deux figures sont symétriques par rapport à O si chaque point et son image ont O pour milieu.\n\n" +
    "Méthode : on vérifie plusieurs sommets correspondants.\n\n" +
    "Calcul : les sommets de départ, leurs images et le centre O sont alignés, avec des distances égales de part et d’autre de O.\n\n" +
    "Conclusion : la figure rouge est bien l’image de la figure bleue par symétrie centrale.",
  tags: ["sym_centrale", "figure", "open", "justification", "canvas"],
  canvas: transformationCanvas({
    transformation: "symetrie_centrale",
    grid: { rows: 8, cols: 8 },
    source: {
      label: "F",
      points: [
        { x: 2, y: 2 },
        { x: 4, y: 2 },
        { x: 2, y: 5 },
      ],
    },
    image: {
      label: "F'",
      points: [
        { x: 6, y: 6 },
        { x: 4, y: 6 },
        { x: 6, y: 3 },
      ],
    },
    center: { point: { x: 4, y: 4 }, label: "O" },
  }),
},

  /* =========================
     SYM_CENTRALE_PROPRIETES
  ========================= */

  {
    kind: "fixed",
    id: "5e_sym_centrale_propriete_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Une symétrie centrale conserve...",
    format: "qcm",
    choices: [
      "les longueurs et les angles",
      "les longueurs mais pas les angles",
      "les angles mais pas les longueurs",
      "aucune grandeur",
    ],
    expected: ["les longueurs et les angles"],
    comparator: "mcq_exact",
    hint: "Une symétrie centrale ne déforme pas la figure.",
    explanation:
      "Définition : une symétrie centrale est une transformation qui ne déforme pas la figure.\n\n" +
      "Méthode : on compare la figure et son image.\n\n" +
      "Calcul : les longueurs, les angles, l’alignement et le parallélisme sont conservés.\n\n" +
      "Conclusion : une symétrie centrale conserve les longueurs et les angles.",
    tags: ["sym_centrale", "propriete", "conservation", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_propriete_fixed_2_point_invariant",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une symétrie centrale de centre O, quel point reste invariant ?",
    format: "qcm",
    choices: ["le centre O", "tous les points", "aucun point", "seulement les sommets"],
    expected: ["le centre O"],
    comparator: "mcq_exact",
    hint: "Le centre ne bouge pas.",
    explanation:
      "Définition : un point invariant est un point qui reste à la même place après la transformation.\n\n" +
      "Méthode : dans une symétrie centrale, on observe le centre.\n\n" +
      "Calcul : le centre O est envoyé sur lui-même.\n\n" +
      "Conclusion : le point invariant est le centre O.",
    tags: ["sym_centrale", "propriete", "point_invariant", "qcm"],
  },

  {
    kind: "template",
    id: "5e_sym_centrale_propriete_tpl_1_longueur",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "La symétrie centrale conserve les longueurs.",
    tags: ["sym_centrale", "propriete", "longueur", "template"],
    generate: () => {
      const l = randomChoice([3, 4, 5, 6, 7, 8]);

      return {
        text: `Un segment [AB] mesure ${l} cm. Son image par symétrie centrale est [A'B']. Quelle est la longueur A'B' ?`,
        format: "short",
        expected: [String(l)],
        comparator: "number_equal",
        explanation:
          "Définition : une symétrie centrale conserve les longueurs.\n\n" +
          "Méthode : on identifie le segment et son image.\n\n" +
          `Calcul : AB = ${l} cm, donc A'B' = ${l} cm.\n\n` +
          `Conclusion : A'B' mesure ${l} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "5e_sym_centrale_propriete_tpl_2_angle",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "La symétrie centrale conserve les angles.",
    tags: ["sym_centrale", "propriete", "angle", "template"],
    generate: () => {
      const angle = randomChoice([35, 45, 60, 75, 90]);

      return {
        text: `Un angle mesure ${angle}°. On applique une symétrie centrale. Quelle est la mesure de l’angle image ?`,
        format: "short",
        expected: [String(angle)],
        comparator: "number_equal",
        explanation:
          "Définition : une symétrie centrale conserve les angles.\n\n" +
          "Méthode : on reconnaît que la figure n’est pas déformée.\n\n" +
          `Calcul : l’angle de départ mesure ${angle}°, donc l’angle image mesure aussi ${angle}°.\n\n` +
          `Conclusion : l’angle image mesure ${angle}°.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_propriete_fixed_3_alignement",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Si trois points sont alignés, leurs images par symétrie centrale sont...",
    format: "qcm",
    choices: ["alignées", "toujours perpendiculaires", "toujours confondues", "placées au hasard"],
    expected: ["alignées"],
    comparator: "mcq_exact",
    hint: "La symétrie centrale conserve l’alignement.",
    explanation:
      "Définition : une symétrie centrale conserve l’alignement.\n\n" +
      "Méthode : on regarde une droite et son image.\n\n" +
      "Calcul : des points alignés restent alignés après la transformation.\n\n" +
      "Conclusion : leurs images sont alignées.",
    tags: ["sym_centrale", "propriete", "alignement", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_propriete_erreur_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : une symétrie centrale agrandit la figure. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une symétrie centrale conserve les dimensions.",
    explanation:
      "Définition : une symétrie centrale ne change pas la taille d’une figure.\n\n" +
      "Méthode : on utilise les propriétés de conservation.\n\n" +
      "Calcul : les longueurs et les angles sont conservés.\n\n" +
      "Conclusion : l’élève a tort, la figure n’est pas agrandie.",
    tags: ["sym_centrale", "propriete", "erreur"],
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_propriete_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 4,
    theme: "neutral",
    text: "Cite deux propriétés conservées par la symétrie centrale.",
    format: "open",
    expected: ["longueurs", "angles", "alignement", "parallélisme"],
    comparator: "contains_keyword",
    hint: "Pense à ce qui ne change pas dans la figure.",
    explanation:
      "Définition : une symétrie centrale ne déforme pas les figures.\n\n" +
      "Méthode : on compare la figure de départ et son image.\n\n" +
      "Calcul : elle conserve les longueurs, les angles, l’alignement et le parallélisme.\n\n" +
      "Conclusion : on peut citer par exemple les longueurs et les angles.",
    tags: ["sym_centrale", "propriete", "open"],
  },

  /* =========================
     SYM_CENTRALE_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "5e_sym_centrale_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un dessin de margouillat, l’œil gauche est l’image de l’œil droit par symétrie centrale de centre O. Si l’œil droit est à 3 cm de O, à quelle distance de O se trouve l’œil gauche ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Le centre est au milieu.",
    explanation:
      "Définition : dans une symétrie centrale, les deux points correspondants sont à la même distance du centre.\n\n" +
      "Méthode : on utilise OA = OA'.\n\n" +
      "Calcul : si l’œil droit est à 3 cm de O, l’œil gauche est aussi à 3 cm de O.\n\n" +
      "Conclusion : l’œil gauche se trouve à 3 cm de O.",
    tags: ["sym_centrale", "defi", "reunion", "distance"],
  },

  {
    kind: "template",
    id: "5e_sym_centrale_defi_tpl_1_reunion",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Dans une symétrie centrale, les distances au centre sont égales.",
    tags: ["sym_centrale", "defi", "reunion", "template"],
    generate: () => {
      const d = randomChoice([2, 3, 4, 5, 6]);

      return {
        text: `Sur un motif de carrelage à La Réunion, un point A et son image A' sont symétriques par rapport au centre O. Si OA = ${d} cm, quelle est la longueur OA' ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation:
          "Définition : dans une symétrie centrale, le centre est le milieu entre un point et son image.\n\n" +
          "Méthode : on utilise l’égalité OA = OA'.\n\n" +
          `Calcul : OA = ${d} cm, donc OA' = ${d} cm.\n\n` +
          `Conclusion : OA' mesure ${d} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "5e_sym_centrale_defi_tpl_2_canvas",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie que le centre O est le milieu entre les figures.",
    tags: ["sym_centrale", "defi", "canvas", "template"],
    generate: () => ({
      text: "Un élève affirme que les deux figures sont symétriques par rapport à O. A-t-il raison ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["oui"],
      comparator: "mcq_exact",
      explanation:
        "Définition : deux figures sont symétriques par rapport à O si chaque point et son image ont O pour milieu.\n\n" +
        "Méthode : on vérifie plusieurs sommets correspondants.\n\n" +
        "Calcul : les sommets de la figure rouge sont bien opposés aux sommets de la figure bleue par rapport à O.\n\n" +
        "Conclusion : l’élève a raison.",
      canvas: transformationCanvas({
        transformation: "symetrie_centrale",
        grid: { rows: 8, cols: 8 },
        source: {
          label: "F",
          points: [
            { x: 1, y: 2 },
            { x: 3, y: 2 },
            { x: 3, y: 4 },
            { x: 2, y: 5 },
          ],
        },
        image: {
          label: "F'",
          points: [
            { x: 7, y: 6 },
            { x: 5, y: 6 },
            { x: 5, y: 4 },
            { x: 6, y: 3 },
          ],
        },
        center: { point: { x: 4, y: 4 }, label: "O" },
      }),
    }),
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi une symétrie centrale conserve la forme et la taille d’une figure.",
    format: "open",
    expected: ["demi-tour", "longueurs", "angles", "conserve", "taille"],
    comparator: "contains_keyword",
    hint: "Pense au demi-tour : la figure ne se déforme pas.",
    explanation:
      "Définition : une symétrie centrale est un demi-tour autour d’un centre.\n\n" +
      "Méthode : un demi-tour déplace les points sans étirer ni réduire la figure.\n\n" +
      "Calcul : les longueurs et les angles sont conservés.\n\n" +
      "Conclusion : la symétrie centrale conserve donc la forme et la taille.",
    tags: ["sym_centrale", "defi", "open", "raisonnement"],
  },
  {
  kind: "fixed",
  id: "5e_sym_centrale_defi_open_3_doute_raisonnable",
  niveau: "5e",
  matiere: "maths",
  notionId: "sym_centrale",
  microId: "sym_centrale_defi",
  difficulty: 5,
  theme: "neutral",
  text: "Un camarade affirme que deux figures sont symétriques par rapport à O. Quelles vérifications dois-tu faire avant d’être d’accord ?",
  format: "open",
  expected: ["alignement", "milieu", "distances", "centre", "sommets"],
  comparator: "contains_keyword",
  hint: "Ne te contente pas de regarder rapidement : vérifie plusieurs sommets.",
  explanation:
    "Définition : deux figures sont symétriques par rapport à O si chaque point et son image ont O pour milieu.\n\n" +
    "Méthode : on vérifie plusieurs sommets correspondants.\n\n" +
    "Calcul : il faut contrôler l’alignement avec O et l’égalité des distances de part et d’autre du centre.\n\n" +
    "Conclusion : on peut être d’accord seulement si ces vérifications sont vraies pour tous les sommets importants.",
  tags: ["sym_centrale", "defi", "open", "verification", "raisonnement"],
},
    /* =========================
     RENFORT — RECONNAÎTRE
  ========================= */

  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_erreur_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
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
      "Méthode : on distingue la symétrie axiale et la symétrie centrale.\n\n" +
      "Calcul : symétrie axiale → axe ; symétrie centrale → centre.\n\n" +
      "Conclusion : l’élève confond symétrie axiale et symétrie centrale.",
    tags: ["sym_centrale", "erreur", "symetrie_axiale", "comparaison"],
  },

{
  kind: "fixed",
  id: "5e_sym_centrale_reconnaitre_open_2_vocabulaire",
  niveau: "5e",
  matiere: "maths",
  notionId: "sym_centrale",
  microId: "sym_centrale_reconnaitre",
  difficulty: 3,
  theme: "neutral",
  text: "Explique avec tes mots pourquoi on dit qu’une symétrie centrale est définie par un centre.",
  format: "open",
  expected: ["centre", "demi-tour", "point", "image", "milieu"],
  comparator: "contains_keyword",
  hint: "Parle du point autour duquel la figure fait un demi-tour.",
  explanation:
    "Définition : une symétrie centrale est un demi-tour autour d’un point appelé centre.\n\n" +
    "Méthode : on identifie l’élément qui permet de construire les images.\n\n" +
    "Calcul : pour chaque point A, son image A' est placée de l’autre côté du centre, avec O milieu de [AA'].\n\n" +
    "Conclusion : on dit qu’elle est définie par un centre car ce point permet de construire toutes les images.",
  tags: ["sym_centrale", "open", "vocabulaire", "raisonnement"],
},
  /* =========================
     RENFORT — CONSTRUIRE POINT
  ========================= */

  {
    kind: "template",
    id: "5e_sym_centrale_point_tpl_3_graduation",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 3,
    theme: "neutral",
    hint: "O est au milieu : il faut reporter la même distance de l’autre côté.",
    tags: ["sym_centrale", "point", "construction", "template"],
    generate: () => {
      const left = randomChoice([2, 3, 4, 5]);
      const right = left;

      return {
        text: `Sur une droite, le point A est à ${left} carreaux à gauche de O. Où se trouve A' ?`,
        format: "qcm",
        choices: shuffle([
          `${right} carreaux à droite de O`,
          `${right} carreaux à gauche de O`,
          `${right + 1} carreaux à droite de O`,
          "sur le point O",
        ]),
        expected: [`${right} carreaux à droite de O`],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans une symétrie centrale, le centre est le milieu entre un point et son image.\n\n" +
          "Méthode : on reporte la même distance de l’autre côté du centre.\n\n" +
          `Calcul : A est à ${left} carreaux à gauche de O, donc A' est à ${right} carreaux à droite de O.\n\n` +
          "Conclusion : A' est placé de l’autre côté de O à la même distance.",
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_point_fixed_2_point_centre",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’image du centre O par la symétrie centrale de centre O ?",
    format: "qcm",
    choices: ["O", "A", "A'", "aucun point"],
    expected: ["O"],
    comparator: "mcq_exact",
    hint: "Le centre ne bouge pas.",
    explanation:
      "Définition : un point invariant reste à la même position après transformation.\n\n" +
      "Méthode : on regarde ce qui arrive au centre de symétrie.\n\n" +
      "Calcul : le centre O est envoyé sur lui-même.\n\n" +
      "Conclusion : l’image de O est O.",
    tags: ["sym_centrale", "point", "point_invariant", "qcm"],
  },

  /* =========================
     RENFORT — CONSTRUIRE FIGURE
  ========================= */

  {
    kind: "template",
    id: "5e_sym_centrale_figure_tpl_3_segment",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 2,
    theme: "neutral",
    hint: "L’image d’un segment s’obtient avec les images de ses extrémités.",
    tags: ["sym_centrale", "figure", "segment", "template"],
    generate: () => ({
      text: "Pour construire l’image du segment [AB] par symétrie centrale, que faut-il construire ?",
      format: "qcm",
      choices: shuffle([
        "les images A' et B', puis relier A' à B'",
        "seulement le milieu de [AB]",
        "un axe vertical",
        "un segment deux fois plus long",
      ]),
      expected: ["les images A' et B', puis relier A' à B'"],
      comparator: "mcq_exact",
      explanation:
        "Définition : l’image d’un segment est le segment reliant les images de ses extrémités.\n\n" +
        "Méthode : on construit A' puis B'.\n\n" +
        "Calcul : on relie ensuite A' à B'.\n\n" +
        "Conclusion : l’image de [AB] est [A'B'].",
    }),
  },

  {
    kind: "template",
    id: "5e_sym_centrale_figure_tpl_4_canvas_non",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie chaque sommet.",
    tags: ["sym_centrale", "figure", "piege", "template", "canvas"],
    generate: () => ({
      text: "La figure rouge est-elle correctement construite comme image de la figure bleue par symétrie centrale ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["non"],
      comparator: "mcq_exact",
      explanation:
        "Définition : tous les sommets doivent être correctement transformés.\n\n" +
        "Méthode : on vérifie que O est le milieu entre chaque sommet et son image.\n\n" +
        "Calcul : ici, un sommet image est mal placé.\n\n" +
        "Conclusion : la figure rouge n’est pas correctement construite.",
      canvas: transformationCanvas({
        transformation: "symetrie_centrale",
        grid: { rows: 8, cols: 8 },
        source: {
          label: "F",
          points: [
            { x: 1, y: 2 },
            { x: 3, y: 2 },
            { x: 3, y: 4 },
            { x: 2, y: 5 },
          ],
        },
        image: {
          label: "F'",
          points: [
            { x: 7, y: 6 },
            { x: 5, y: 6 },
            { x: 5, y: 4 },
            { x: 5, y: 3 },
          ],
        },
        center: { point: { x: 4, y: 4 }, label: "O" },
      }),
    }),
  },

  /* =========================
     RENFORT — PROPRIÉTÉS
  ========================= */

  {
    kind: "fixed",
    id: "5e_sym_centrale_propriete_fixed_4_parallelisme",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Deux droites parallèles restent-elles parallèles après une symétrie centrale ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "La symétrie centrale conserve le parallélisme.",
    explanation:
      "Définition : une symétrie centrale conserve les propriétés géométriques importantes.\n\n" +
      "Méthode : on utilise la conservation du parallélisme.\n\n" +
      "Calcul : deux droites parallèles ont des images parallèles.\n\n" +
      "Conclusion : oui, elles restent parallèles.",
    tags: ["sym_centrale", "propriete", "parallelisme", "qcm"],
  },

  {
    kind: "template",
    id: "5e_sym_centrale_propriete_tpl_3_perimetre",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "La symétrie centrale conserve toutes les longueurs.",
    tags: ["sym_centrale", "propriete", "perimetre", "template"],
    generate: () => {
      const p = randomChoice([12, 14, 16, 18, 20, 24]);

      return {
        text: `Une figure a un périmètre de ${p} cm. On construit son image par symétrie centrale. Quel est le périmètre de l’image ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          "Définition : une symétrie centrale conserve les longueurs.\n\n" +
          "Méthode : le périmètre est une somme de longueurs.\n\n" +
          `Calcul : comme chaque longueur est conservée, le périmètre reste ${p} cm.\n\n` +
          `Conclusion : le périmètre de l’image est ${p} cm.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_propriete_erreur_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : le centre O se déplace aussi dans une symétrie centrale de centre O. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le centre est le point invariant.",
    explanation:
      "Définition : le centre d’une symétrie centrale est un point invariant.\n\n" +
      "Méthode : invariant signifie qu’il ne bouge pas.\n\n" +
      "Calcul : l’image de O est O.\n\n" +
      "Conclusion : l’élève a tort, le centre ne se déplace pas.",
    tags: ["sym_centrale", "propriete", "point_invariant", "erreur"],
  },

  /* =========================
     RENFORT — DÉFIS
  ========================= */

  {
    kind: "template",
    id: "5e_sym_centrale_defi_tpl_3_erreur_eleve",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Une bonne construction respecte l’alignement et l’égalité des distances.",
    tags: ["sym_centrale", "defi", "erreur", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6]);

      return {
        text: `Un élève veut construire A' image de A par symétrie centrale de centre O. Il sait que OA = ${d} cm. Il place A' à ${d} cm de O, mais pas sur la droite (AO). Sa construction est-elle correcte ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans une symétrie centrale, A, O et A' doivent être alignés.\n\n" +
          "Méthode : il faut vérifier la distance et l’alignement.\n\n" +
          `Calcul : même si OA' = ${d} cm, A' doit aussi être sur la droite (AO).\n\n` +
          "Conclusion : la construction n’est pas correcte.",
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_defi_fixed_2_point_invariant",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une figure, le point O est le centre de symétrie. Explique pourquoi O ne change pas de position.",
    format: "open",
    expected: ["centre", "invariant", "image", "lui-même", "ne bouge pas"],
    comparator: "contains_keyword",
    hint: "Le centre est son propre symétrique.",
    explanation:
      "Définition : un point invariant est un point qui ne change pas de position.\n\n" +
      "Méthode : dans une symétrie centrale, on regarde le centre.\n\n" +
      "Calcul : l’image du centre O est O lui-même.\n\n" +
      "Conclusion : O ne change pas de position car c’est le point invariant de la symétrie centrale.",
    tags: ["sym_centrale", "defi", "point_invariant", "open"],
  },

  /* =========================
     TOP-UP — SYM_CENTRALE_RECONNAITRE (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "À quelle rotation correspond une symétrie centrale ?",
    format: "qcm",
    choices: ["une rotation de 180°", "une rotation de 90°", "une rotation de 360°", "une translation"],
    expected: ["une rotation de 180°"],
    comparator: "mcq_exact",
    hint: "Un demi-tour.",
    explanation: expl("Une symétrie centrale est un demi-tour, c’est-à-dire une rotation de 180° autour du centre."),
    tags: ["sym_centrale", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence principale entre une symétrie axiale et une symétrie centrale ?",
    format: "qcm",
    choices: [
      "l’une utilise un axe, l’autre un centre",
      "elles sont identiques",
      "l’une agrandit la figure",
      "l’une déplace sans tourner",
    ],
    expected: ["l’une utilise un axe, l’autre un centre"],
    comparator: "mcq_exact",
    hint: "Axe vs point.",
    explanation: expl("La symétrie axiale se fait par rapport à un axe (une droite) ; la symétrie centrale se fait par rapport à un centre (un point)."),
    tags: ["sym_centrale", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Cite un exemple de la vie courante qui évoque une symétrie centrale.",
    format: "open",
    expected: ["demi-tour", "carte", "roue", "centre"],
    comparator: "contains_keyword",
    hint: "Pense aux cartes à jouer ou à un demi-tour.",
    explanation: expl("Une carte à jouer (comme une dame ou un roi) reste identique après un demi-tour : c’est un exemple de symétrie centrale autour de son centre."),
    tags: ["sym_centrale", "reconnaitre", "open"],
  },

  /* =========================
     TOP-UP — SYM_CENTRALE_POINT (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_sym_centrale_point_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une symétrie centrale de centre O, que peut-on dire des points A, O et A' ?",
    format: "qcm",
    choices: [
      "ils sont alignés et O est le milieu de [AA']",
      "ils forment un triangle",
      "A et A' sont confondus",
      "O est en dehors de la droite (AA')",
    ],
    expected: ["ils sont alignés et O est le milieu de [AA']"],
    comparator: "mcq_exact",
    hint: "Le centre est au milieu.",
    explanation: expl("A, O et A' sont alignés et O est le milieu du segment [AA'] : OA = OA'."),
    tags: ["sym_centrale", "point", "qcm"],
  },
  {
    kind: "template",
    id: "5e_sym_centrale_point_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 3,
    theme: "neutral",
    hint: "Coordonnées de A' : (2×ox − x ; 2×oy − y).",
    tags: ["sym_centrale", "point", "coordonnees", "template"],
    generate: () => {
      const ox = randomChoice([3, 4, 5]);
      const oy = randomChoice([3, 4, 5]);
      const x = randomChoice([0, 1, 2]);
      const y = randomChoice([0, 1, 2]);
      const xp = 2 * ox - x;
      const yp = 2 * oy - y;
      return {
        text: `O(${ox};${oy}) est le centre de symétrie et A(${x};${y}). Quelles sont les coordonnées de A' ?`,
        format: "short",
        expected: [`(${xp};${yp})`, `(${xp}; ${yp})`, `${xp};${yp}`],
        comparator: "contains_keyword",
        explanation: expl(`A' a pour coordonnées (2×${ox} − ${x} ; 2×${oy} − ${y}) = (${xp};${yp}).`),
      };
    },
  },
  {
    kind: "fixed",
    id: "5e_sym_centrale_point_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une symétrie centrale de centre O, on sait que OA = 7 cm. Quelle est la longueur OA' ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "O est le milieu de [AA'].",
    explanation: expl("O est le milieu de [AA'], donc OA' = OA = 7 cm."),
    tags: ["sym_centrale", "point"],
  },

  /* =========================
     TOP-UP — SYM_CENTRALE_FIGURE (+2)
  ========================= */
  {
    kind: "fixed",
    id: "5e_sym_centrale_figure_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 3,
    theme: "neutral",
    text: "Par une symétrie centrale, une figure et son image ont-elles la même aire ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "La symétrie conserve les longueurs et les aires.",
    explanation: expl("La symétrie centrale conserve les longueurs et les aires : la figure et son image ont la même aire."),
    tags: ["sym_centrale", "figure", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_sym_centrale_figure_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi il suffit de construire l’image des sommets pour obtenir l’image d’un polygone.",
    format: "open",
    expected: ["sommets", "relie", "image"],
    comparator: "contains_keyword",
    hint: "On relie ensuite les images.",
    explanation: expl("On construit l’image de chaque sommet, puis on relie ces images dans le même ordre : on obtient l’image du polygone."),
    tags: ["sym_centrale", "figure", "open"],
  },

  /* =========================
     TOP-UP — SYM_CENTRALE_DEFI (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_sym_centrale_defi_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle figure possède un centre de symétrie ?",
    format: "qcm",
    choices: ["un parallélogramme", "un triangle quelconque", "la lettre F", "la lettre P"],
    expected: ["un parallélogramme"],
    comparator: "mcq_exact",
    hint: "Pense à un demi-tour qui laisse la figure inchangée.",
    explanation: expl("Le parallélogramme possède un centre de symétrie : un demi-tour autour du point d’intersection de ses diagonales le laisse inchangé."),
    tags: ["sym_centrale", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_sym_centrale_defi_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "A(1;2) a pour image A'(5;6) par une symétrie centrale. Quelles sont les coordonnées du centre O ?",
    format: "short",
    expected: ["(3;4)", "(3; 4)", "3;4"],
    comparator: "contains_keyword",
    hint: "O est le milieu de [AA'].",
    explanation: expl("O est le milieu de [AA'] : ((1+5)/2 ; (2+6)/2) = (3;4)."),
    tags: ["sym_centrale", "defi", "coordonnees"],
  },
  {
    kind: "fixed",
    id: "5e_sym_centrale_defi_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « La symétrie centrale change la taille de la figure ». Explique son erreur.",
    format: "open",
    expected: ["conserve", "longueurs", "taille", "même"],
    comparator: "contains_keyword",
    hint: "La symétrie conserve les longueurs.",
    explanation: expl("La symétrie centrale conserve les longueurs et les angles : la figure image a exactement la même taille que la figure de départ."),
    tags: ["sym_centrale", "defi", "open", "erreur"],
  },
];