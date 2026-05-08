// lib/tutor-v4/question-banks/maths/6e/symetrie.bank.ts

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

export const symetrieBank: TutorBankItemV4[] = [
  /* =========================
     SYM_RECONNAITRE
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_reconnaitre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Une symétrie axiale fonctionne comme...",
    format: "qcm",
    choices: [
      "un miroir avec un axe",
      "un demi-tour autour d’un point",
      "un glissement",
      "un agrandissement",
    ],
    expected: ["un miroir avec un axe"],
    comparator: "mcq_exact",
    hint: "Le mot important est axe.",
    explanation:
      "Définition : une symétrie axiale transforme une figure comme dans un miroir.\n\n" +
      "Méthode : on repère l’axe de symétrie.\n\n" +
      "Observation : la figure et son image se superposent si on plie selon l’axe.\n\n" +
      "Conclusion : une symétrie axiale fonctionne comme un miroir avec un axe.",
    tags: ["symetrie", "symetrie_axiale", "definition", "qcm", "canvas"],
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
    kind: "fixed",
    id: "6e_sym_reconnaitre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une symétrie axiale, le mot “axiale” signifie qu’il y a...",
    format: "qcm",
    choices: ["un axe", "un centre", "un vecteur", "un rapport"],
    expected: ["un axe"],
    comparator: "mcq_exact",
    hint: "Axiale vient de axe.",
    explanation:
      "Définition : une symétrie axiale est une symétrie par rapport à un axe.\n\n" +
      "Méthode : on cherche la droite qui sert de miroir.\n\n" +
      "Observation : cette droite s’appelle l’axe de symétrie.\n\n" +
      "Conclusion : dans une symétrie axiale, il y a un axe.",
    tags: ["symetrie", "vocabulaire", "axe", "qcm"],
  },

  {
    kind: "template",
    id: "6e_sym_reconnaitre_tpl_1_axe_vertical",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si l’axe joue le rôle d’un miroir.",
    tags: ["symetrie", "reconnaitre", "axe_vertical", "template", "canvas"],
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
          "Méthode : on vérifie que les points correspondants sont à la même distance de l’axe.\n\n" +
          "Observation : ici, la figure rouge est placée en miroir de la figure bleue.\n\n" +
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
    kind: "template",
    id: "6e_sym_reconnaitre_tpl_2_axe_horizontal",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "L’axe peut être vertical ou horizontal.",
    tags: ["symetrie", "reconnaitre", "axe_horizontal", "template", "canvas"],
    generate: () => {
      const axisY = randomChoice([4, 5]);

      return {
        text: "La figure rouge est-elle l’image de la figure bleue par symétrie axiale d’axe horizontal ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une symétrie axiale peut se faire par rapport à un axe horizontal.\n\n" +
          "Méthode : on compare les distances de chaque côté de l’axe.\n\n" +
          "Observation : la figure rouge est placée à la même distance de l’axe que la figure bleue.\n\n" +
          "Conclusion : c’est bien une symétrie axiale.",
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

  {
    kind: "template",
    id: "6e_sym_reconnaitre_tpl_3_piege_non",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie tous les sommets, pas seulement la forme générale.",
    tags: ["symetrie", "reconnaitre", "piege", "template", "canvas"],
    generate: () => ({
      text: "La figure rouge est-elle vraiment l’image de la figure bleue par symétrie axiale ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["non"],
      comparator: "mcq_exact",
      explanation:
        "Définition : dans une symétrie axiale, chaque point et son image doivent être à la même distance de l’axe.\n\n" +
        "Méthode : on vérifie plusieurs sommets correspondants.\n\n" +
        "Observation : ici, au moins un sommet image n’est pas placé correctement.\n\n" +
        "Conclusion : la figure rouge n’est pas l’image par symétrie axiale.",
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
            { x: 5, y: 4 },
          ],
        },
        axis: { type: "vertical", x: 4, label: "axe" },
      }),
    }),
  },

  {
    kind: "fixed",
    id: "6e_sym_reconnaitre_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique avec tes mots comment reconnaître une symétrie axiale.",
    format: "open",
    expected: ["axe", "miroir", "distance", "superposer", "pliage"],
    comparator: "contains_keyword",
    hint: "Parle de l’axe et du pliage.",
    explanation:
      "Définition : une symétrie axiale est une transformation par rapport à un axe.\n\n" +
      "Méthode : on imagine que l’on plie la feuille selon l’axe.\n\n" +
      "Observation : les deux parties doivent se superposer, avec des distances égales à l’axe.\n\n" +
      "Conclusion : on reconnaît une symétrie axiale grâce à l’axe, au miroir ou au pliage.",
    tags: ["symetrie", "open", "vocabulaire", "raisonnement"],
  },

  /* =========================
     SYM_POINT
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_point_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_point",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire l’image A' d’un point A par symétrie axiale, il faut placer A'...",
    format: "qcm",
    choices: [
      "de l’autre côté de l’axe, à la même distance",
      "sur l’axe",
      "n’importe où",
      "au-dessus du point A",
    ],
    expected: ["de l’autre côté de l’axe, à la même distance"],
    comparator: "mcq_exact",
    hint: "L’axe joue le rôle d’un miroir.",
    explanation:
      "Définition : l’image d’un point par symétrie axiale est son reflet par rapport à l’axe.\n\n" +
      "Méthode : on place le point image de l’autre côté de l’axe.\n\n" +
      "Observation : le point et son image sont à la même distance de l’axe.\n\n" +
      "Conclusion : A' se place de l’autre côté de l’axe, à la même distance.",
    tags: ["symetrie", "point", "construction", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_sym_point_fixed_2_point_sur_axe",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_point",
    difficulty: 2,
    theme: "neutral",
    text: "Si un point A est placé sur l’axe de symétrie, son image A' est...",
    format: "qcm",
    choices: [
      "le point A lui-même",
      "un point à droite",
      "un point à gauche",
      "impossible à construire",
    ],
    expected: ["le point A lui-même"],
    comparator: "mcq_exact",
    hint: "Un point sur l’axe ne bouge pas.",
    explanation:
      "Définition : un point situé sur l’axe de symétrie est invariant.\n\n" +
      "Méthode : on observe que le point est déjà sur le miroir.\n\n" +
      "Observation : son reflet est exactement au même endroit.\n\n" +
      "Conclusion : si A est sur l’axe, alors A' = A.",
    tags: ["symetrie", "point", "point_invariant", "qcm"],
  },

  {
    kind: "template",
    id: "6e_sym_point_tpl_1_distance",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_point",
    difficulty: 2,
    theme: "neutral",
    hint: "Le point image est à la même distance de l’axe.",
    tags: ["symetrie", "point", "distance", "template"],
    generate: () => {
      const d = randomChoice([1, 2, 3, 4, 5]);

      return {
        text: `Le point A est à ${d} carreau(x) de l’axe de symétrie. À quelle distance de l’axe se trouve A' ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation:
          "Définition : dans une symétrie axiale, un point et son image sont à la même distance de l’axe.\n\n" +
          "Méthode : on conserve la distance à l’axe.\n\n" +
          `Calcul : A est à ${d} carreau(x) de l’axe, donc A' est aussi à ${d} carreau(x).\n\n` +
          `Conclusion : A' se trouve à ${d} carreau(x) de l’axe.`,
      };
    },
  },

  {
    kind: "template",
    id: "6e_sym_point_tpl_2_position_droite",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_point",
    difficulty: 3,
    theme: "neutral",
    hint: "On reporte la même distance de l’autre côté.",
    tags: ["symetrie", "point", "position", "template"],
    generate: () => {
      const d = randomChoice([2, 3, 4]);

      return {
        text: `Le point A est à ${d} carreaux à gauche d’un axe vertical. Où se trouve son image A' ?`,
        format: "qcm",
        choices: shuffle([
          `${d} carreaux à droite de l’axe`,
          `${d} carreaux à gauche de l’axe`,
          `${d + 1} carreaux à droite de l’axe`,
          "sur l’axe",
        ]),
        expected: [`${d} carreaux à droite de l’axe`],
        comparator: "mcq_exact",
        explanation:
          "Définition : une symétrie axiale place l’image de l’autre côté de l’axe.\n\n" +
          "Méthode : on reporte la même distance de l’autre côté.\n\n" +
          `Calcul : A est à ${d} carreaux à gauche, donc A' est à ${d} carreaux à droite.\n\n` +
          "Conclusion : A' est de l’autre côté de l’axe, à la même distance.",
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_sym_point_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_point",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève place A' de l’autre côté de l’axe, mais pas à la même distance que A. Sa construction est-elle correcte ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut respecter la distance à l’axe.",
    explanation:
      "Définition : dans une symétrie axiale, le point et son image sont à la même distance de l’axe.\n\n" +
      "Méthode : on vérifie la position et la distance.\n\n" +
      "Observation : même si A' est du bon côté, la distance n’est pas correcte.\n\n" +
      "Conclusion : la construction n’est pas correcte.",
    tags: ["symetrie", "point", "erreur", "distance"],
  },

  {
    kind: "fixed",
    id: "6e_sym_point_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_point",
    difficulty: 4,
    theme: "neutral",
    text: "Décris la méthode pour construire l’image A' d’un point A par symétrie axiale.",
    format: "open",
    expected: ["axe", "perpendiculaire", "distance", "autre côté", "même"],
    comparator: "contains_keyword",
    hint: "Parle de l’axe, de la distance et de l’autre côté.",
    explanation:
      "Définition : l’image d’un point par symétrie axiale est son reflet par rapport à l’axe.\n\n" +
      "Méthode : on trace la direction perpendiculaire à l’axe passant par le point, puis on reporte la même distance de l’autre côté.\n\n" +
      "Observation : l’axe est au milieu entre le point et son image.\n\n" +
      "Conclusion : A' est correctement construit s’il est de l’autre côté de l’axe, à la même distance.",
    tags: ["symetrie", "point", "open", "construction", "methode"],
  },
    /* =========================
     SYM_FIGURE
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_figure_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_figure",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire l’image d’un triangle par symétrie axiale, il faut construire...",
    format: "qcm",
    choices: [
      "l’image de chacun de ses sommets",
      "seulement l’image d’un côté",
      "un centre de symétrie",
      "une figure plus grande",
    ],
    expected: ["l’image de chacun de ses sommets"],
    comparator: "mcq_exact",
    hint: "Un triangle est défini par ses sommets.",
    explanation:
      "Définition : l’image d’une figure par symétrie axiale est obtenue en construisant l’image de ses points importants.\n\n" +
      "Méthode : pour un triangle, on construit l’image de chaque sommet.\n\n" +
      "Observation : on obtient A', B' et C', puis on relie ces points.\n\n" +
      "Conclusion : il faut construire l’image de chacun des sommets.",
    tags: ["symetrie", "figure", "triangle", "qcm"],
  },

  {
    kind: "template",
    id: "6e_sym_figure_tpl_1_triangle_canvas_oui",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie que chaque sommet image est à la même distance de l’axe.",
    tags: ["symetrie", "figure", "triangle", "template", "canvas"],
    generate: () => ({
      text: "Le triangle rouge est-il bien l’image du triangle bleu par symétrie axiale ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["oui"],
      comparator: "mcq_exact",
      explanation:
        "Définition : deux figures sont symétriques par rapport à un axe si elles se superposent par pliage selon cet axe.\n\n" +
        "Méthode : on vérifie les sommets correspondants.\n\n" +
        "Observation : chaque sommet rouge est placé de l’autre côté de l’axe, à la même distance que le sommet bleu correspondant.\n\n" +
        "Conclusion : le triangle rouge est bien l’image du triangle bleu.",
      canvas: transformationCanvas({
        transformation: "symetrie_axiale",
        grid: { rows: 8, cols: 8 },
        source: {
          label: "ABC",
          points: [
            { x: 1, y: 2 },
            { x: 3, y: 2 },
            { x: 2, y: 5 },
          ],
        },
        image: {
          label: "A'B'C'",
          points: [
            { x: 7, y: 2 },
            { x: 5, y: 2 },
            { x: 6, y: 5 },
          ],
        },
        axis: { type: "vertical", x: 4, label: "axe" },
      }),
    }),
  },

  {
    kind: "template",
    id: "6e_sym_figure_tpl_2_piege_canvas_non",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_figure",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie tous les sommets un par un.",
    tags: ["symetrie", "figure", "erreur", "template", "canvas"],
    generate: () => ({
      text: "Un élève affirme que la figure rouge est l’image de la figure bleue par symétrie axiale. A-t-il raison ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["non"],
      comparator: "mcq_exact",
      explanation:
        "Définition : dans une symétrie axiale, tous les sommets doivent être correctement placés par rapport à l’axe.\n\n" +
        "Méthode : on vérifie les distances de chaque sommet à l’axe.\n\n" +
        "Observation : ici, au moins un sommet image n’est pas à la bonne place.\n\n" +
        "Conclusion : l’élève a tort, la figure rouge n’est pas correctement construite.",
      canvas: transformationCanvas({
        transformation: "symetrie_axiale",
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
            { x: 7, y: 2 },
            { x: 5, y: 2 },
            { x: 5, y: 4 },
            { x: 5, y: 5 },
          ],
        },
        axis: { type: "vertical", x: 4, label: "axe" },
      }),
    }),
  },

  {
    kind: "fixed",
    id: "6e_sym_figure_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_figure",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment construire l’image d’un triangle ABC par symétrie axiale.",
    format: "open",
    expected: ["sommets", "A'", "B'", "C'", "axe", "relier"],
    comparator: "contains_keyword",
    hint: "Construis l’image de chaque sommet, puis relie les points.",
    explanation:
      "Définition : l’image d’une figure est obtenue en construisant l’image de ses points importants.\n\n" +
      "Méthode : on construit A', B' et C' par symétrie axiale.\n\n" +
      "Observation : chaque sommet image est de l’autre côté de l’axe, à la même distance.\n\n" +
      "Conclusion : en reliant A', B' et C', on obtient le triangle image.",
    tags: ["symetrie", "figure", "open", "construction", "methode"],
  },

  /* =========================
     SYM_PROPRIETES
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_proprietes_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "Une symétrie axiale conserve...",
    format: "qcm",
    choices: [
      "les longueurs et les angles",
      "les longueurs mais pas les angles",
      "les angles mais pas les longueurs",
      "aucune mesure",
    ],
    expected: ["les longueurs et les angles"],
    comparator: "mcq_exact",
    hint: "Une symétrie axiale ne déforme pas la figure.",
    explanation:
      "Définition : une symétrie axiale transforme une figure sans la déformer.\n\n" +
      "Méthode : on compare la figure de départ et son image.\n\n" +
      "Observation : les longueurs, les angles et l’alignement sont conservés.\n\n" +
      "Conclusion : une symétrie axiale conserve les longueurs et les angles.",
    tags: ["symetrie", "proprietes", "conservation", "qcm"],
  },

  {
    kind: "template",
    id: "6e_sym_proprietes_tpl_1_longueur",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_proprietes",
    difficulty: 3,
    theme: "neutral",
    hint: "La symétrie axiale conserve les longueurs.",
    tags: ["symetrie", "proprietes", "longueur", "template"],
    generate: () => {
      const l = randomChoice([3, 4, 5, 6, 7, 8]);

      return {
        text: `Un segment [AB] mesure ${l} cm. Son image par symétrie axiale est [A'B']. Quelle est la longueur A'B' ?`,
        format: "short",
        expected: [String(l)],
        comparator: "number_equal",
        explanation:
          "Définition : une symétrie axiale conserve les longueurs.\n\n" +
          "Méthode : on identifie le segment et son image.\n\n" +
          `Calcul : AB = ${l} cm, donc A'B' = ${l} cm.\n\n` +
          `Conclusion : A'B' mesure ${l} cm.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_sym_proprietes_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : une symétrie axiale agrandit la figure. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une symétrie axiale ne change pas la taille.",
    explanation:
      "Définition : une symétrie axiale ne déforme pas la figure.\n\n" +
      "Méthode : on utilise les propriétés de conservation.\n\n" +
      "Observation : les longueurs restent les mêmes.\n\n" +
      "Conclusion : l’élève a tort, la figure n’est pas agrandie.",
    tags: ["symetrie", "proprietes", "erreur"],
  },

  {
    kind: "fixed",
    id: "6e_sym_proprietes_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_proprietes",
    difficulty: 4,
    theme: "neutral",
    text: "Cite deux éléments conservés par une symétrie axiale.",
    format: "open",
    expected: ["longueurs", "angles", "alignement", "forme", "taille"],
    comparator: "contains_keyword",
    hint: "Pense à ce qui ne change pas dans la figure.",
    explanation:
      "Définition : une symétrie axiale transforme une figure sans la déformer.\n\n" +
      "Méthode : on compare la figure et son image.\n\n" +
      "Observation : les longueurs, les angles, l’alignement, la forme et la taille sont conservés.\n\n" +
      "Conclusion : on peut citer par exemple les longueurs et les angles.",
    tags: ["symetrie", "proprietes", "open", "vocabulaire"],
  },  /* =========================
     SYM_AXES
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_axes_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_axes",
    difficulty: 1,
    theme: "neutral",
    text: "Un axe de symétrie est...",
    format: "qcm",
    choices: [
      "une droite qui partage une figure en deux parties superposables",
      "un point autour duquel on tourne",
      "un segment quelconque",
      "une droite qui agrandit la figure",
    ],
    expected: ["une droite qui partage une figure en deux parties superposables"],
    comparator: "mcq_exact",
    hint: "Imagine un pliage.",
    explanation:
      "Définition : un axe de symétrie est une droite qui permet de plier une figure en deux parties superposables.\n\n" +
      "Méthode : on imagine que l’on plie la figure selon cette droite.\n\n" +
      "Observation : si les deux parties se superposent exactement, c’est un axe de symétrie.\n\n" +
      "Conclusion : un axe de symétrie partage une figure en deux parties superposables.",
    tags: ["symetrie", "axes", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_sym_axes_fixed_2_rectangle",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_axes",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d’axes de symétrie possède un rectangle qui n’est pas un carré ?",
    format: "qcm",
    choices: ["2", "4", "1", "0"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Pense aux deux axes qui passent par les milieux des côtés opposés.",
    explanation:
      "Définition : un axe de symétrie permet de superposer les deux parties d’une figure par pliage.\n\n" +
      "Méthode : on teste les pliages possibles du rectangle.\n\n" +
      "Observation : un rectangle non carré possède un axe vertical et un axe horizontal.\n\n" +
      "Conclusion : un rectangle non carré possède 2 axes de symétrie.",
    tags: ["symetrie", "axes", "rectangle", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_sym_axes_fixed_3_carre",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_axes",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d’axes de symétrie possède un carré ?",
    format: "qcm",
    choices: ["4", "2", "1", "0"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Il y a les axes horizontal/vertical et les deux diagonales.",
    explanation:
      "Définition : un axe de symétrie permet de plier une figure en deux parties superposables.\n\n" +
      "Méthode : on cherche tous les pliages possibles du carré.\n\n" +
      "Observation : le carré possède deux axes passant par les milieux des côtés opposés et deux diagonales.\n\n" +
      "Conclusion : un carré possède 4 axes de symétrie.",
    tags: ["symetrie", "axes", "carre", "qcm"],
  },

  {
    kind: "template",
    id: "6e_sym_axes_tpl_1_figures_classiques",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_axes",
    difficulty: 3,
    theme: "neutral",
    hint: "Imagine les pliages possibles.",
    tags: ["symetrie", "axes", "figures_classiques", "template"],
    generate: () => {
      const situation = randomChoice([
        {
          figure: "un carré",
          expected: "4",
          wrongs: ["2", "1", "0"],
          explanation:
            "Un carré possède 4 axes de symétrie : deux axes passant par les milieux des côtés opposés et deux diagonales.",
        },
        {
          figure: "un rectangle qui n’est pas un carré",
          expected: "2",
          wrongs: ["4", "1", "0"],
          explanation:
            "Un rectangle non carré possède 2 axes de symétrie : un axe horizontal et un axe vertical.",
        },
        {
          figure: "un triangle isocèle non équilatéral",
          expected: "1",
          wrongs: ["0", "2", "3"],
          explanation:
            "Un triangle isocèle non équilatéral possède 1 axe de symétrie.",
        },
        {
          figure: "un triangle équilatéral",
          expected: "3",
          wrongs: ["1", "2", "0"],
          explanation:
            "Un triangle équilatéral possède 3 axes de symétrie.",
        },
      ]);

      return {
        text: `Combien d’axes de symétrie possède ${situation.figure} ?`,
        format: "qcm",
        choices: shuffle([situation.expected, ...situation.wrongs]),
        expected: [situation.expected],
        comparator: "mcq_exact",
        explanation:
          "Définition : un axe de symétrie permet de plier la figure en deux parties superposables.\n\n" +
          "Méthode : on teste mentalement les pliages possibles.\n\n" +
          `Observation : ${situation.explanation}\n\n` +
          `Conclusion : la réponse est ${situation.expected}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_sym_axes_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_axes",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : toutes les diagonales sont des axes de symétrie. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Teste par exemple un rectangle non carré.",
    explanation:
      "Définition : un axe de symétrie doit permettre de superposer exactement les deux parties de la figure.\n\n" +
      "Méthode : on cherche un contre-exemple.\n\n" +
      "Observation : dans un rectangle non carré, les diagonales ne sont pas des axes de symétrie.\n\n" +
      "Conclusion : l’élève a tort, toutes les diagonales ne sont pas des axes de symétrie.",
    tags: ["symetrie", "axes", "erreur", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "6e_sym_axes_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_axes",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment vérifier qu’une droite est un axe de symétrie d’une figure.",
    format: "open",
    expected: ["plier", "axe", "superposer", "deux parties", "distance"],
    comparator: "contains_keyword",
    hint: "Utilise l’idée du pliage.",
    explanation:
      "Définition : un axe de symétrie partage une figure en deux parties superposables.\n\n" +
      "Méthode : on imagine un pliage selon cette droite.\n\n" +
      "Observation : les points correspondants doivent se superposer et être à la même distance de l’axe.\n\n" +
      "Conclusion : la droite est un axe de symétrie si le pliage superpose exactement les deux parties.",
    tags: ["symetrie", "axes", "open", "methode"],
  },

  /* =========================
     SYM_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_defis_fixed_1_reunion",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_defis",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un motif de carrelage à La Réunion, une figure bleue est reflétée de l’autre côté d’un axe vertical. Quelle transformation est utilisée ?",
    format: "qcm",
    choices: [
      "une symétrie axiale",
      "une symétrie centrale",
      "une translation",
      "une rotation",
    ],
    expected: ["une symétrie axiale"],
    comparator: "mcq_exact",
    hint: "Il y a un axe qui joue le rôle de miroir.",
    explanation:
      "Définition : une symétrie axiale utilise un axe comme miroir.\n\n" +
      "Méthode : on repère l’axe vertical et la figure image de l’autre côté.\n\n" +
      "Observation : la figure est reflétée comme dans un miroir.\n\n" +
      "Conclusion : la transformation utilisée est une symétrie axiale.",
    tags: ["symetrie", "defi", "reunion", "transformation"],
  },

  {
    kind: "template",
    id: "6e_sym_defis_tpl_1_canvas_verification",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie les distances à l’axe pour plusieurs sommets.",
    tags: ["symetrie", "defi", "verification", "canvas", "template"],
    generate: () => ({
      text: "Un élève affirme que les deux figures sont symétriques par rapport à l’axe. A-t-il raison ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["oui"],
      comparator: "mcq_exact",
      explanation:
        "Définition : deux figures sont symétriques par rapport à un axe si elles se superposent par pliage selon cet axe.\n\n" +
        "Méthode : on vérifie plusieurs sommets correspondants.\n\n" +
        "Observation : chaque sommet rouge est bien de l’autre côté de l’axe, à la même distance que le sommet bleu correspondant.\n\n" +
        "Conclusion : l’élève a raison.",
      canvas: transformationCanvas({
        transformation: "symetrie_axiale",
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
            { x: 7, y: 2 },
            { x: 5, y: 2 },
            { x: 5, y: 4 },
            { x: 6, y: 5 },
          ],
        },
        axis: { type: "vertical", x: 4, label: "axe" },
      }),
    }),
  },

  {
    kind: "template",
    id: "6e_sym_defis_tpl_2_erreur_canvas",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Une figure presque symétrique n’est pas forcément symétrique.",
    tags: ["symetrie", "defi", "erreur", "canvas", "template"],
    generate: () => ({
      text: "Les deux figures semblent presque symétriques. Peut-on conclure qu’elles sont vraiment symétriques par rapport à l’axe ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["non"],
      comparator: "mcq_exact",
      explanation:
        "Définition : une symétrie axiale doit être exacte.\n\n" +
        "Méthode : on ne se contente pas de l’impression visuelle : on vérifie les sommets.\n\n" +
        "Observation : ici, un sommet rouge n’est pas à la même distance de l’axe que son sommet bleu correspondant.\n\n" +
        "Conclusion : on ne peut pas conclure que les figures sont symétriques.",
      canvas: transformationCanvas({
        transformation: "symetrie_axiale",
        grid: { rows: 8, cols: 8 },
        source: {
          label: "F",
          points: [
            { x: 1, y: 2 },
            { x: 3, y: 2 },
            { x: 2, y: 5 },
          ],
        },
        image: {
          label: "F'",
          points: [
            { x: 7, y: 2 },
            { x: 5, y: 2 },
            { x: 5, y: 5 },
          ],
        },
        axis: { type: "vertical", x: 4, label: "axe" },
      }),
    }),
  },

  {
    kind: "fixed",
    id: "6e_sym_defis_open_1_doute_raisonnable",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Un camarade affirme qu’une figure possède un axe de symétrie. Quelles vérifications dois-tu faire avant d’être d’accord ?",
    format: "open",
    expected: ["axe", "plier", "superposer", "distance", "points"],
    comparator: "contains_keyword",
    hint: "Ne regarde pas seulement la forme générale : vérifie plusieurs points.",
    explanation:
      "Définition : un axe de symétrie permet de plier la figure en deux parties superposables.\n\n" +
      "Méthode : on vérifie plusieurs points ou sommets de la figure.\n\n" +
      "Observation : les points correspondants doivent être à la même distance de l’axe et se superposer par pliage.\n\n" +
      "Conclusion : on peut être d’accord seulement si ces vérifications sont vraies.",
    tags: ["symetrie", "defi", "open", "verification", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "6e_sym_defis_open_2_methode",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la symétrie axiale aide à apprendre à observer avec précision.",
    format: "open",
    expected: ["observer", "axe", "distance", "vérifier", "précision"],
    comparator: "contains_keyword",
    hint: "Pense aux vérifications à faire autour de l’axe.",
    explanation:
      "Définition : la symétrie axiale repose sur un axe et des distances égales.\n\n" +
      "Méthode : pour être sûr, il faut observer les points, les distances et le pliage.\n\n" +
      "Observation : une figure presque symétrique peut être fausse si un point est mal placé.\n\n" +
      "Conclusion : la symétrie axiale développe l’observation précise et la vérification.",
    tags: ["symetrie", "defi", "open", "observation", "raisonnement"],
  },
    /* =========================
     RENFORT — AXE OBLIQUE
  ========================= */

  {
    kind: "template",
    id: "6e_sym_reconnaitre_tpl_4_axe_oblique",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    hint: "Un axe de symétrie peut aussi être oblique.",
    tags: ["symetrie", "reconnaitre", "axe_oblique", "template", "canvas"],
    generate: () => ({
      text: "La figure rouge est-elle l’image de la figure bleue par symétrie axiale d’axe oblique ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["oui"],
      comparator: "mcq_exact",
      explanation:
        "Définition : une symétrie axiale peut se faire par rapport à un axe vertical, horizontal ou oblique.\n\n" +
        "Méthode : on vérifie que l’axe joue le rôle de miroir.\n\n" +
        "Observation : ici, les deux figures se correspondent par rapport à l’axe oblique.\n\n" +
        "Conclusion : la figure rouge est bien l’image de la figure bleue par symétrie axiale.",
      canvas: transformationCanvas({
        transformation: "symetrie_axiale",
        grid: { rows: 8, cols: 8 },
        source: {
          label: "F",
          points: [
            { x: 1, y: 5 },
            { x: 2, y: 5 },
            { x: 1, y: 6 },
          ],
        },
        image: {
          label: "F'",
          points: [
            { x: 5, y: 1 },
            { x: 5, y: 2 },
            { x: 6, y: 1 },
          ],
        },
        axis: {
          type: "line",
          from: { x: 0, y: 0 },
          to: { x: 8, y: 8 },
          label: "axe",
        },
      }),
    }),
  },

  {
    kind: "fixed",
    id: "6e_sym_reconnaitre_open_2_axe_oblique",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi un axe de symétrie n’est pas forcément vertical.",
    format: "open",
    expected: ["axe", "oblique", "horizontal", "vertical", "pliage", "superposer"],
    comparator: "contains_keyword",
    hint: "Pense aux différents pliages possibles d’une figure.",
    explanation:
      "Définition : un axe de symétrie est une droite de pliage.\n\n" +
      "Méthode : on ne regarde pas seulement les axes verticaux.\n\n" +
      "Observation : une figure peut se superposer par pliage selon un axe vertical, horizontal ou oblique.\n\n" +
      "Conclusion : un axe de symétrie peut donc être oblique.",
    tags: ["symetrie", "axe_oblique", "open", "vocabulaire"],
  },

  /* =========================
     RENFORT — CONSTRUCTION POINT AVEC AXE HORIZONTAL
  ========================= */

  {
    kind: "template",
    id: "6e_sym_point_tpl_3_axe_horizontal",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_point",
    difficulty: 3,
    theme: "neutral",
    hint: "Avec un axe horizontal, l’image est au-dessus ou au-dessous à la même distance.",
    tags: ["symetrie", "point", "axe_horizontal", "template"],
    generate: () => {
      const d = randomChoice([1, 2, 3, 4]);

      return {
        text: `Le point A est à ${d} carreau(x) au-dessus d’un axe horizontal. Où se trouve son image A' ?`,
        format: "qcm",
        choices: shuffle([
          `${d} carreau(x) au-dessous de l’axe`,
          `${d} carreau(x) au-dessus de l’axe`,
          `${d + 1} carreau(x) au-dessous de l’axe`,
          "sur l’axe",
        ]),
        expected: [`${d} carreau(x) au-dessous de l’axe`],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans une symétrie axiale, le point image est de l’autre côté de l’axe.\n\n" +
          "Méthode : on reporte la même distance de l’autre côté.\n\n" +
          `Observation : A est à ${d} carreau(x) au-dessus de l’axe, donc A' est à ${d} carreau(x) au-dessous.\n\n` +
          "Conclusion : A' est placé de l’autre côté de l’axe, à la même distance.",
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_sym_point_erreur_2_perpendiculaire",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_point",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève place A' à la même distance de l’axe que A, mais le segment [AA'] n’est pas perpendiculaire à l’axe. Sa construction est-elle correcte ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "L’axe doit être la médiatrice de [AA'].",
    explanation:
      "Définition : dans une symétrie axiale, l’axe est la médiatrice du segment reliant un point à son image.\n\n" +
      "Méthode : il faut vérifier la distance et la direction.\n\n" +
      "Observation : le segment [AA'] doit être perpendiculaire à l’axe.\n\n" +
      "Conclusion : la construction n’est pas correcte.",
    tags: ["symetrie", "point", "erreur", "perpendiculaire", "mediatrice"],
  },

  /* =========================
     RENFORT — FIGURE ET JUSTIFICATION
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_figure_open_2_justifier",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_figure",
    difficulty: 5,
    theme: "neutral",
    text: "Observe une figure et son image. Explique pourquoi il ne suffit pas de vérifier un seul sommet pour conclure que toute la figure est symétrique.",
    format: "open",
    expected: ["tous", "sommets", "vérifier", "figure", "axe", "distance"],
    comparator: "contains_keyword",
    hint: "Une figure peut avoir un sommet bien placé et un autre mal placé.",
    explanation:
      "Définition : l’image d’une figure est correcte seulement si tous ses points importants sont bien transformés.\n\n" +
      "Méthode : on vérifie chaque sommet de la figure.\n\n" +
      "Observation : un seul sommet bien placé ne garantit pas que toute la figure est correcte.\n\n" +
      "Conclusion : il faut vérifier tous les sommets importants.",
    tags: ["symetrie", "figure", "open", "justification", "verification"],
  },

  {
    kind: "template",
    id: "6e_sym_figure_tpl_3_axe_horizontal_canvas",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "L’axe horizontal sépare la figure de son image.",
    tags: ["symetrie", "figure", "axe_horizontal", "canvas", "template"],
    generate: () => ({
      text: "Le triangle rouge est-il l’image du triangle bleu par symétrie axiale d’axe horizontal ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["oui"],
      comparator: "mcq_exact",
      explanation:
        "Définition : une symétrie axiale peut utiliser un axe horizontal.\n\n" +
        "Méthode : on vérifie que chaque sommet image est de l’autre côté de l’axe.\n\n" +
        "Observation : les sommets correspondants sont à la même distance de l’axe horizontal.\n\n" +
        "Conclusion : le triangle rouge est bien l’image du triangle bleu.",
      canvas: transformationCanvas({
        transformation: "symetrie_axiale",
        grid: { rows: 8, cols: 8 },
        source: {
          label: "ABC",
          points: [
            { x: 2, y: 1 },
            { x: 5, y: 1 },
            { x: 3, y: 3 },
          ],
        },
        image: {
          label: "A'B'C'",
          points: [
            { x: 2, y: 7 },
            { x: 5, y: 7 },
            { x: 3, y: 5 },
          ],
        },
        axis: { type: "horizontal", y: 4, label: "axe" },
      }),
    }),
  },

  /* =========================
     RENFORT — PROPRIÉTÉS ET LANGAGE
  ========================= */

  {
    kind: "template",
    id: "6e_sym_proprietes_tpl_2_angle",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_proprietes",
    difficulty: 3,
    theme: "neutral",
    hint: "La symétrie axiale conserve les angles.",
    tags: ["symetrie", "proprietes", "angle", "template"],
    generate: () => {
      const angle = randomChoice([30, 45, 60, 75, 90]);

      return {
        text: `Un angle mesure ${angle}°. Son image par symétrie axiale mesure combien de degrés ?`,
        format: "short",
        expected: [String(angle)],
        comparator: "number_equal",
        explanation:
          "Définition : une symétrie axiale conserve les mesures d’angles.\n\n" +
          "Méthode : on identifie l’angle et son image.\n\n" +
          `Calcul : l’angle mesure ${angle}°, donc son image mesure aussi ${angle}°.\n\n` +
          `Conclusion : l’angle image mesure ${angle}°.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_sym_proprietes_open_2_pourquoi_conserve",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_proprietes",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi une symétrie axiale conserve la forme et la taille d’une figure.",
    format: "open",
    expected: ["pliage", "superposer", "longueurs", "angles", "taille"],
    comparator: "contains_keyword",
    hint: "Imagine que l’on plie la feuille selon l’axe.",
    explanation:
      "Définition : une symétrie axiale correspond à un reflet par rapport à un axe.\n\n" +
      "Méthode : on imagine le pliage selon l’axe.\n\n" +
      "Observation : après pliage, la figure et son image se superposent exactement.\n\n" +
      "Conclusion : la forme et la taille sont conservées.",
    tags: ["symetrie", "proprietes", "open", "raisonnement"],
  },

  /* =========================
     RENFORT — AXES ET DOUTE RAISONNABLE
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_axes_open_2_pas_impression",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_axes",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi ne suffit-il pas de dire “ça a l’air symétrique” pour affirmer qu’une droite est un axe de symétrie ?",
    format: "open",
    expected: ["vérifier", "distance", "points", "pliage", "superposer"],
    comparator: "contains_keyword",
    hint: "Il faut faire des vérifications précises.",
    explanation:
      "Définition : un axe de symétrie doit permettre une superposition exacte par pliage.\n\n" +
      "Méthode : on vérifie plusieurs points de la figure.\n\n" +
      "Observation : une figure peut sembler symétrique mais avoir un point mal placé.\n\n" +
      "Conclusion : il faut vérifier, pas seulement se fier à l’impression.",
    tags: ["symetrie", "axes", "open", "doute_raisonnable", "verification"],
  },

  {
    kind: "template",
    id: "6e_sym_axes_tpl_2_erreur_rectangle_diagonale",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_axes",
    difficulty: 4,
    theme: "neutral",
    hint: "Dans un rectangle non carré, les diagonales ne sont pas des axes.",
    tags: ["symetrie", "axes", "erreur", "template"],
    generate: () => ({
      text: "Un élève affirme que la diagonale d’un rectangle non carré est un axe de symétrie. A-t-il raison ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["non"],
      comparator: "mcq_exact",
      explanation:
        "Définition : un axe de symétrie doit partager la figure en deux parties superposables.\n\n" +
        "Méthode : on imagine le pliage selon la diagonale.\n\n" +
        "Observation : dans un rectangle non carré, les deux parties ne se superposent pas exactement.\n\n" +
        "Conclusion : la diagonale n’est pas un axe de symétrie.",
    }),
  },

  /* =========================
     RENFORT — DÉFIS RÉUNION
  ========================= */

  {
    kind: "template",
    id: "6e_sym_defis_tpl_3_margouillat",
    niveau: "6e",
    matiere: "maths",
    notionId: "symetrie",
    microId: "sym_defis",
    difficulty: 4,
    theme: "reunion",
    hint: "Cherche si l’axe partage le motif en deux parties superposables.",
    tags: ["symetrie", "defi", "reunion", "motif", "template"],
    generate: () => ({
      text: "Sur un logo avec un margouillat stylisé, on trace une droite au milieu du dessin. Que faut-il vérifier pour savoir si cette droite est un axe de symétrie ?",
      format: "open",
      expected: ["plier", "superposer", "axe", "distance", "deux parties"],
      comparator: "contains_keyword",
      explanation:
        "Définition : un axe de symétrie permet de plier une figure en deux parties superposables.\n\n" +
        "Méthode : on imagine le pliage selon la droite tracée.\n\n" +
        "Observation : il faut vérifier que les deux parties du margouillat se superposent exactement.\n\n" +
        "Conclusion : la droite est un axe seulement si les deux parties se superposent.",
    }),
  },
]