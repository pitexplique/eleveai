// lib/tutor-v4/question-banks/maths/cm2/symetrie.bank.ts

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

// ============================================================
// HELPERS CANVAS
// ============================================================

function symVerticalOui(): TransformationCanvasData {
  return transformationCanvas({
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
  });
}

function symHorizontalOui(): TransformationCanvasData {
  return transformationCanvas({
    transformation: "symetrie_axiale",
    grid: { rows: 8, cols: 8 },
    source: {
      label: "F",
      points: [
        { x: 2, y: 1 },
        { x: 5, y: 1 },
        { x: 3, y: 3 },
      ],
    },
    image: {
      label: "F'",
      points: [
        { x: 2, y: 7 },
        { x: 5, y: 7 },
        { x: 3, y: 5 },
      ],
    },
    axis: { type: "horizontal", y: 4, label: "axe" },
  });
}

function symVerticalNon(): TransformationCanvasData {
  return transformationCanvas({
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
  });
}

function symObliqueOui(): TransformationCanvasData {
  return transformationCanvas({
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
  });
}

function symPointVertical(distance = 2): TransformationCanvasData {
  const axisX = 4;
  const y = 3;

  return transformationCanvas({
    transformation: "symetrie_axiale",
    grid: { rows: 7, cols: 8 },
    source: {
      label: "A",
      points: [{ x: axisX - distance, y }],
    },
    image: {
      label: "A'",
      points: [{ x: axisX + distance, y }],
    },
    axis: { type: "vertical", x: axisX, label: "axe" },
  });
}

function symPointHorizontal(distance = 2): TransformationCanvasData {
  const axisY = 4;
  const x = 3;

  return transformationCanvas({
    transformation: "symetrie_axiale",
    grid: { rows: 8, cols: 7 },
    source: {
      label: "A",
      points: [{ x, y: axisY - distance }],
    },
    image: {
      label: "A'",
      points: [{ x, y: axisY + distance }],
    },
    axis: { type: "horizontal", y: axisY, label: "axe" },
  });
}

function symSegmentVertical(): TransformationCanvasData {
  return transformationCanvas({
    transformation: "symetrie_axiale",
    grid: { rows: 8, cols: 8 },
    source: {
      label: "AB",
      points: [
        { x: 1, y: 2 },
        { x: 2, y: 5 },
      ],
    },
    image: {
      label: "A'B'",
      points: [
        { x: 7, y: 2 },
        { x: 6, y: 5 },
      ],
    },
    axis: { type: "vertical", x: 4, label: "axe" },
  });
}

function symFigureVertical(): TransformationCanvasData {
  return transformationCanvas({
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
  });
}

function symFigureVerticalErreur(): TransformationCanvasData {
  return transformationCanvas({
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
  });
}

// ============================================================
// BANK
// ============================================================

export const symetrieBank: TutorBankItemV4[] = [
  // ============================================================
  // SYMETRIE_AXE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 1,
    theme: "neutral",
    text: "Un axe de symétrie fonctionne comme...",
    format: "qcm",
    choices: [
      "un miroir",
      "une multiplication",
      "un chronomètre",
      "une mesure de masse",
    ],
    expected: ["un miroir"],
    comparator: "mcq_exact",
    hint: "Imagine que l’on plie la figure.",
    explanation:
      "Un axe de symétrie fonctionne comme un miroir. Si on plie selon cet axe, les deux parties doivent se superposer.",
    tags: ["cm2", "symetrie", "axe", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_2_axe_est_droite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 1,
    theme: "neutral",
    text: "Un axe de symétrie est...",
    format: "qcm",
    choices: [
      "une droite",
      "un point seulement",
      "une surface",
      "un volume",
    ],
    expected: ["une droite"],
    comparator: "mcq_exact",
    hint: "On plie la figure selon cette droite.",
    explanation:
      "Un axe de symétrie est une droite. Elle sert de ligne de pliage ou de miroir.",
    tags: ["cm2", "symetrie", "axe", "droite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_3_reconnaitre_oui_vertical",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 2,
    theme: "neutral",
    text: "Les deux figures sont-elles symétriques par rapport à l’axe vertical ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Regarde si l’axe joue le rôle de miroir.",
    explanation:
      "Oui. La figure rouge est placée comme le reflet de la figure bleue de l’autre côté de l’axe.",
    tags: ["cm2", "symetrie", "axe", "vertical", "reconnaitre", "qcm", "canvas"],
    canvas: symVerticalOui(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_4_reconnaitre_oui_horizontal",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 2,
    theme: "neutral",
    text: "Les deux figures sont-elles symétriques par rapport à l’axe horizontal ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "L’image doit être de l’autre côté de l’axe, à la même distance.",
    explanation:
      "Oui. Chaque sommet de la figure rouge est placé de l’autre côté de l’axe horizontal, à la même distance que le sommet correspondant.",
    tags: ["cm2", "symetrie", "axe", "horizontal", "reconnaitre", "qcm", "canvas"],
    canvas: symHorizontalOui(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_5_reconnaitre_non",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 3,
    theme: "neutral",
    text: "La figure rouge est-elle vraiment l’image de la figure bleue par symétrie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie tous les sommets.",
    explanation:
      "Non. La figure rouge ressemble presque à une image symétrique, mais un sommet n’est pas placé correctement.",
    tags: ["cm2", "symetrie", "axe", "erreur", "qcm", "canvas"],
    canvas: symVerticalNon(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_6_axe_oblique",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 4,
    theme: "neutral",
    text: "Un axe de symétrie peut-il être oblique ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un axe est une droite de pliage : elle peut être penchée.",
    explanation:
      "Oui. Un axe de symétrie peut être vertical, horizontal ou oblique, si le pliage superpose bien les deux parties.",
    tags: ["cm2", "symetrie", "axe", "oblique", "qcm", "canvas"],
    canvas: symObliqueOui(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_7_axe_oblique_canvas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 4,
    theme: "neutral",
    text: "Les deux figures sont-elles symétriques par rapport à l’axe oblique ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "L’axe oblique joue ici le rôle de miroir.",
    explanation:
      "Oui. Même si l’axe est penché, les deux figures se correspondent comme dans un miroir.",
    tags: ["cm2", "symetrie", "axe", "oblique", "reconnaitre", "qcm", "canvas"],
    canvas: symObliqueOui(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_8_pliage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 2,
    theme: "neutral",
    text: "Pour vérifier un axe de symétrie, on peut imaginer...",
    format: "qcm",
    choices: [
      "un pliage",
      "une division posée",
      "un calcul de durée",
      "un tableau de conversion",
    ],
    expected: ["un pliage"],
    comparator: "mcq_exact",
    hint: "Les deux parties doivent se superposer.",
    explanation:
      "Pour vérifier un axe de symétrie, on peut imaginer que l’on plie la figure selon l’axe. Les deux parties doivent se superposer.",
    tags: ["cm2", "symetrie", "axe", "pliage", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_9_axes_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 3,
    theme: "neutral",
    text: "Combien d’axes de symétrie possède un rectangle qui n’est pas un carré ?",
    format: "qcm",
    choices: ["2", "4", "1", "0"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Il y a un axe vertical et un axe horizontal.",
    explanation:
      "Un rectangle non carré possède 2 axes de symétrie : un axe vertical et un axe horizontal.",
    tags: ["cm2", "symetrie", "axe", "rectangle", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_10_axes_carre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 3,
    theme: "neutral",
    text: "Combien d’axes de symétrie possède un carré ?",
    format: "qcm",
    choices: ["4", "2", "1", "0"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Pense aux deux axes du milieu et aux deux diagonales.",
    explanation:
      "Un carré possède 4 axes de symétrie : deux axes passant par les milieux des côtés opposés et deux diagonales.",
    tags: ["cm2", "symetrie", "axe", "carre", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_11_axes_triangle_isocele",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 3,
    theme: "neutral",
    text: "Combien d’axes de symétrie possède un triangle isocèle non équilatéral ?",
    format: "qcm",
    choices: ["1", "2", "3", "0"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "L’axe passe par le sommet principal et le milieu de la base.",
    explanation:
      "Un triangle isocèle non équilatéral possède 1 axe de symétrie.",
    tags: ["cm2", "symetrie", "axe", "triangle_isocele", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_12_axes_triangle_equilateral",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 4,
    theme: "neutral",
    text: "Combien d’axes de symétrie possède un triangle équilatéral ?",
    format: "qcm",
    choices: ["3", "1", "2", "0"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Les trois sommets jouent le même rôle.",
    explanation:
      "Un triangle équilatéral possède 3 axes de symétrie.",
    tags: ["cm2", "symetrie", "axe", "triangle_equilateral", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_13_erreur_diagonale_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “La diagonale d’un rectangle non carré est un axe de symétrie.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Imagine le pliage selon la diagonale.",
    explanation:
      "Non. Dans un rectangle non carré, les diagonales ne sont pas des axes de symétrie. Le pliage ne superpose pas exactement les deux parties.",
    tags: ["cm2", "symetrie", "axe", "erreur", "rectangle", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_14_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment vérifier qu’une droite est un axe de symétrie.",
    format: "open",
    expected: ["plier", "axe", "superposer", "miroir"],
    comparator: "contains_keyword",
    hint: "Utilise l’idée du pliage ou du miroir.",
    explanation:
      "Pour vérifier qu’une droite est un axe de symétrie, on imagine un pliage selon cette droite. Si les deux parties se superposent exactement, c’est un axe de symétrie.",
    tags: ["cm2", "symetrie", "axe", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_axe_fixed_15_reunion_motif",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un motif de carrelage à La Réunion, une droite partage le dessin en deux parties superposables. Cette droite est...",
    format: "qcm",
    choices: [
      "un axe de symétrie",
      "un diamètre",
      "une durée",
      "une masse",
    ],
    expected: ["un axe de symétrie"],
    comparator: "mcq_exact",
    hint: "Les deux parties se superposent par pliage.",
    explanation:
      "Si une droite partage un motif en deux parties superposables, alors cette droite est un axe de symétrie.",
    tags: ["cm2", "symetrie", "axe", "reunion", "motif", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_symetrie_axe_tpl_1_reconnaitre_vertical_horizontal",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 2,
    theme: "neutral",
    hint: "L’axe doit jouer le rôle de miroir.",
    tags: ["cm2", "symetrie", "axe", "template", "qcm", "canvas"],
    generate: () => {
      const vertical = Math.random() < 0.5;

      return {
        text: vertical
          ? "Les deux figures sont-elles symétriques par rapport à l’axe vertical ?"
          : "Les deux figures sont-elles symétriques par rapport à l’axe horizontal ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: vertical
          ? "Oui. La figure image est placée de l’autre côté de l’axe vertical, comme dans un miroir."
          : "Oui. La figure image est placée de l’autre côté de l’axe horizontal, comme dans un miroir.",
        canvas: vertical ? symVerticalOui() : symHorizontalOui(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_symetrie_axe_tpl_2_axes_figures_classiques",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 3,
    theme: "neutral",
    hint: "Imagine les pliages possibles.",
    tags: ["cm2", "symetrie", "axe", "figures_classiques", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          figure: "un carré",
          expected: "4",
          explanation:
            "Un carré possède 4 axes de symétrie : deux axes du milieu et deux diagonales.",
        },
        {
          figure: "un rectangle qui n’est pas un carré",
          expected: "2",
          explanation:
            "Un rectangle non carré possède 2 axes de symétrie : un axe vertical et un axe horizontal.",
        },
        {
          figure: "un triangle isocèle non équilatéral",
          expected: "1",
          explanation:
            "Un triangle isocèle non équilatéral possède 1 axe de symétrie.",
        },
        {
          figure: "un triangle équilatéral",
          expected: "3",
          explanation:
            "Un triangle équilatéral possède 3 axes de symétrie.",
        },
      ]);

      return {
        text: `Combien d’axes de symétrie possède ${item.figure} ?`,
        format: "qcm",
        choices: shuffle(["0", "1", "2", "3", "4"]).slice(0, 4).includes(item.expected)
          ? shuffle(["0", "1", "2", "3", "4"]).slice(0, 4)
          : shuffle([item.expected, "0", "1", "2", "4"]).slice(0, 4),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_symetrie_axe_tpl_3_oui_non",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_axe",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie si tous les sommets correspondent.",
    tags: ["cm2", "symetrie", "axe", "erreur", "template", "qcm", "canvas"],
    generate: () => {
      const ok = Math.random() < 0.5;

      return {
        text: "La figure rouge est-elle l’image de la figure bleue par symétrie axiale ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: [ok ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: ok
          ? "Oui. Les sommets correspondants sont bien placés de l’autre côté de l’axe."
          : "Non. Au moins un sommet rouge n’est pas placé correctement par rapport à l’axe.",
        canvas: ok ? symVerticalOui() : symVerticalNon(),
      };
    },
  },
  // ============================================================
  // SYMETRIE_COMPLETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_symetrie_completer_fixed_1_principe",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 1,
    theme: "neutral",
    text: "Compléter une figure par symétrie, c’est...",
    format: "qcm",
    choices: [
      "dessiner l’autre moitié comme dans un miroir",
      "changer toutes les longueurs",
      "effacer l’axe",
      "transformer la figure en cercle",
    ],
    expected: ["dessiner l’autre moitié comme dans un miroir"],
    comparator: "mcq_exact",
    hint: "L’axe sert de miroir.",
    explanation:
      "Compléter une figure par symétrie, c’est dessiner l’autre moitié comme dans un miroir, de l’autre côté de l’axe.",
    tags: ["cm2", "symetrie", "completer", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_completer_fixed_2_distance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour compléter une figure par symétrie, un point image doit être placé...",
    format: "qcm",
    choices: [
      "de l’autre côté de l’axe, à la même distance",
      "sur un point choisi au hasard",
      "toujours sur l’axe",
      "plus loin que le point de départ",
    ],
    expected: ["de l’autre côté de l’axe, à la même distance"],
    comparator: "mcq_exact",
    hint: "Même distance à l’axe.",
    explanation:
      "Dans une symétrie, le point image se place de l’autre côté de l’axe, à la même distance que le point de départ.",
    tags: ["cm2", "symetrie", "completer", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_completer_fixed_3_vertical_oui",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 2,
    theme: "neutral",
    text: "La figure rouge complète-t-elle correctement la figure bleue par symétrie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare les distances à l’axe.",
    explanation:
      "Oui. La partie rouge est placée de l’autre côté de l’axe vertical, comme le reflet de la partie bleue.",
    tags: ["cm2", "symetrie", "completer", "axe_vertical", "qcm", "canvas"],
    canvas: symVerticalOui(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_completer_fixed_4_horizontal_oui",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 2,
    theme: "neutral",
    text: "La figure rouge complète-t-elle correctement la figure bleue par symétrie par rapport à l’axe horizontal ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "L’image doit être sous l’axe, à la même distance.",
    explanation:
      "Oui. La partie rouge est placée de l’autre côté de l’axe horizontal, à la même distance que la partie bleue.",
    tags: ["cm2", "symetrie", "completer", "axe_horizontal", "qcm", "canvas"],
    canvas: symHorizontalOui(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_completer_fixed_5_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 3,
    theme: "neutral",
    text: "La figure rouge complète-t-elle correctement la figure bleue par symétrie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une figure presque correcte peut contenir une erreur.",
    explanation:
      "Non. Une partie de la figure rouge n’est pas à la bonne place : elle ne complète donc pas correctement la symétrie.",
    tags: ["cm2", "symetrie", "completer", "erreur", "qcm", "canvas"],
    canvas: symVerticalNon(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_completer_fixed_6_point_distance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Un point est à 3 carreaux de l’axe. Son point symétrique doit être...",
    format: "qcm",
    choices: [
      "à 3 carreaux de l’axe de l’autre côté",
      "à 1 carreau de l’axe",
      "sur l’axe",
      "à 6 carreaux de l’axe",
    ],
    expected: ["à 3 carreaux de l’axe de l’autre côté"],
    comparator: "mcq_exact",
    hint: "On garde la même distance.",
    explanation:
      "Le point symétrique doit être placé de l’autre côté de l’axe, à la même distance. Ici, il est donc à 3 carreaux.",
    tags: ["cm2", "symetrie", "completer", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_completer_fixed_7_point_sur_axe",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Si un point est placé sur l’axe de symétrie, son symétrique est...",
    format: "qcm",
    choices: [
      "le point lui-même",
      "toujours à droite",
      "toujours plus loin",
      "impossible à trouver",
    ],
    expected: ["le point lui-même"],
    comparator: "mcq_exact",
    hint: "Un point sur le miroir ne bouge pas.",
    explanation:
      "Un point placé sur l’axe de symétrie reste au même endroit. Son symétrique est le point lui-même.",
    tags: ["cm2", "symetrie", "completer", "point_sur_axe", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_completer_fixed_8_ordre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour compléter une figure sur quadrillage, que faut-il faire avec chaque sommet ?",
    format: "qcm",
    choices: [
      "placer son symétrique de l’autre côté de l’axe",
      "le déplacer au hasard",
      "le placer toujours sur l’axe",
      "le supprimer",
    ],
    expected: ["placer son symétrique de l’autre côté de l’axe"],
    comparator: "mcq_exact",
    hint: "On complète sommet par sommet.",
    explanation:
      "Pour compléter une figure par symétrie, on place le symétrique de chaque sommet, puis on relie les points obtenus.",
    tags: ["cm2", "symetrie", "completer", "methode", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_completer_fixed_9_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment compléter une figure par symétrie sur quadrillage.",
    format: "open",
    expected: ["axe", "même", "distance", "autre côté", "relier"],
    comparator: "contains_keyword",
    hint: "Parle de l’axe, de la distance et des points à relier.",
    explanation:
      "On repère chaque sommet de la figure. Pour chacun, on place son symétrique de l’autre côté de l’axe, à la même distance, puis on relie les points.",
    tags: ["cm2", "symetrie", "completer", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_completer_fixed_10_reunion_motif",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un motif de carrelage réunionnais, on voit seulement la moitié gauche. Pour compléter le motif, il faut...",
    format: "qcm",
    choices: [
      "dessiner la moitié droite comme dans un miroir",
      "changer toutes les couleurs au hasard",
      "effacer l’axe",
      "dessiner une figure plus grande",
    ],
    expected: ["dessiner la moitié droite comme dans un miroir"],
    comparator: "mcq_exact",
    hint: "L’axe sert de miroir.",
    explanation:
      "Pour compléter un motif symétrique, on dessine l’autre moitié comme son reflet par rapport à l’axe.",
    tags: ["cm2", "symetrie", "completer", "reunion", "motif", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_completer_fixed_11_axe_oblique_defi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 5,
    theme: "neutral",
    text: "La figure rouge complète-t-elle correctement la figure bleue avec un axe oblique ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Même avec un axe oblique, l’axe joue le rôle de miroir.",
    explanation:
      "Oui. L’axe est oblique, mais il joue bien le rôle de miroir : les deux parties se correspondent.",
    tags: ["cm2", "symetrie", "completer", "axe_oblique", "defi", "qcm", "canvas"],
    canvas: symObliqueOui(),
  },

  {
    kind: "template",
    id: "cm2_symetrie_completer_tpl_1_distance_point",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le point symétrique garde la même distance à l’axe.",
    tags: ["cm2", "symetrie", "completer", "distance", "template", "qcm"],
    generate: () => {
      const d = randomChoice([1, 2, 3, 4]);

      return {
        text: `Un point est à ${d} carreau(x) de l’axe. À quelle distance de l’axe se trouve son symétrique ?`,
        format: "qcm",
        choices: shuffle([
          `${d} carreau(x)`,
          `${d + 1} carreau(x)`,
          `${Math.max(1, d - 1)} carreau(x)`,
          "sur l’axe",
        ]),
        expected: [`${d} carreau(x)`],
        comparator: "mcq_exact",
        explanation:
          `Le symétrique d’un point est à la même distance de l’axe. Il est donc à ${d} carreau(x) de l’axe.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_symetrie_completer_tpl_2_vertical_horizontal",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe si la figure rouge complète correctement la figure bleue.",
    tags: ["cm2", "symetrie", "completer", "template", "qcm", "canvas"],
    generate: () => {
      const horizontal = Math.random() < 0.5;

      return {
        text: horizontal
          ? "La figure rouge complète-t-elle correctement la figure bleue par rapport à l’axe horizontal ?"
          : "La figure rouge complète-t-elle correctement la figure bleue par rapport à l’axe vertical ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: horizontal
          ? "Oui. La partie rouge est le reflet de la partie bleue par rapport à l’axe horizontal."
          : "Oui. La partie rouge est le reflet de la partie bleue par rapport à l’axe vertical.",
        canvas: horizontal ? symHorizontalOui() : symVerticalOui(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_symetrie_completer_tpl_3_erreur_ou_non",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 4,
    theme: "neutral",
    hint: "Une seule erreur suffit pour que la symétrie soit fausse.",
    tags: ["cm2", "symetrie", "completer", "erreur", "template", "qcm", "canvas"],
    generate: () => {
      const ok = Math.random() < 0.5;

      return {
        text: "La figure rouge complète-t-elle correctement la figure bleue par symétrie ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: [ok ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: ok
          ? "Oui. Les sommets rouges sont placés comme les reflets des sommets bleus."
          : "Non. Au moins un sommet rouge n’est pas placé au bon endroit.",
        canvas: ok ? symVerticalOui() : symVerticalNon(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_symetrie_completer_tpl_4_position",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "L’image est de l’autre côté de l’axe.",
    tags: ["cm2", "symetrie", "completer", "position", "template", "qcm"],
    generate: () => {
      const d = randomChoice([1, 2, 3]);
      const left = Math.random() < 0.5;

      return {
        text: left
          ? `Un point est à ${d} carreau(x) à gauche d’un axe vertical. Où se trouve son symétrique ?`
          : `Un point est à ${d} carreau(x) à droite d’un axe vertical. Où se trouve son symétrique ?`,
        format: "qcm",
        choices: shuffle([
          left
            ? `${d} carreau(x) à droite de l’axe`
            : `${d} carreau(x) à gauche de l’axe`,
          left
            ? `${d} carreau(x) à gauche de l’axe`
            : `${d} carreau(x) à droite de l’axe`,
          "sur l’axe",
          `${d + 1} carreau(x) de l’autre côté`,
        ]),
        expected: [
          left
            ? `${d} carreau(x) à droite de l’axe`
            : `${d} carreau(x) à gauche de l’axe`,
        ],
        comparator: "mcq_exact",
        explanation:
          "Le symétrique d’un point se place de l’autre côté de l’axe, à la même distance.",
      };
    },
  },
    // ============================================================
  // SYMETRIE_CONSTRUIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_symetrie_construire_fixed_1_point_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire le symétrique A' d’un point A, il faut placer A'...",
    format: "qcm",
    choices: [
      "de l’autre côté de l’axe, à la même distance",
      "sur n’importe quel point du quadrillage",
      "toujours sur l’axe",
      "plus loin que le point A",
    ],
    expected: ["de l’autre côté de l’axe, à la même distance"],
    comparator: "mcq_exact",
    hint: "L’axe joue le rôle de miroir.",
    explanation:
      "Pour construire A', on place le point de l’autre côté de l’axe, à la même distance que A.",
    tags: ["cm2", "symetrie", "construire", "point", "methode", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_construire_fixed_2_point_canvas_vertical",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Le point A' est-il bien le symétrique du point A par rapport à l’axe vertical ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "A et A' doivent être à la même distance de l’axe.",
    explanation:
      "Oui. Le point A et son image A' sont de chaque côté de l’axe vertical, à la même distance.",
    tags: ["cm2", "symetrie", "construire", "point", "axe_vertical", "qcm", "canvas"],
    canvas: symPointVertical(2),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_construire_fixed_3_point_canvas_horizontal",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Le point A' est-il bien le symétrique du point A par rapport à l’axe horizontal ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "A et A' doivent être de part et d’autre de l’axe.",
    explanation:
      "Oui. Le point A' est placé de l’autre côté de l’axe horizontal, à la même distance que A.",
    tags: ["cm2", "symetrie", "construire", "point", "axe_horizontal", "qcm", "canvas"],
    canvas: symPointHorizontal(2),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_construire_fixed_4_point_distance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Le point A est à 4 carreaux à gauche de l’axe vertical. Où doit être A' ?",
    format: "qcm",
    choices: [
      "à 4 carreaux à droite de l’axe",
      "à 4 carreaux à gauche de l’axe",
      "sur l’axe",
      "à 2 carreaux à droite de l’axe",
    ],
    expected: ["à 4 carreaux à droite de l’axe"],
    comparator: "mcq_exact",
    hint: "Même distance, autre côté.",
    explanation:
      "A' doit être placé de l’autre côté de l’axe, à la même distance. Il sera donc à 4 carreaux à droite de l’axe.",
    tags: ["cm2", "symetrie", "construire", "point", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_construire_fixed_5_point_sur_axe",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Un point placé sur l’axe de symétrie...",
    format: "qcm",
    choices: [
      "reste au même endroit",
      "se déplace toujours à droite",
      "se déplace toujours en haut",
      "disparaît",
    ],
    expected: ["reste au même endroit"],
    comparator: "mcq_exact",
    hint: "Un point sur le miroir ne bouge pas.",
    explanation:
      "Un point placé sur l’axe de symétrie est son propre symétrique. Il reste au même endroit.",
    tags: ["cm2", "symetrie", "construire", "point_sur_axe", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_construire_fixed_6_segment",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Le segment A'B' est-il bien l’image du segment AB par symétrie axiale ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare les extrémités A avec A' et B avec B'.",
    explanation:
      "Oui. Les extrémités A et B ont été placées de l’autre côté de l’axe à la même distance. Le segment A'B' est donc l’image de AB.",
    tags: ["cm2", "symetrie", "construire", "segment", "qcm", "canvas"],
    canvas: symSegmentVertical(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_construire_fixed_7_figure",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Pour construire le symétrique d’une figure, il faut construire le symétrique...",
    format: "qcm",
    choices: [
      "de chacun de ses sommets importants",
      "d’un seul sommet seulement",
      "de l’axe seulement",
      "d’un point choisi au hasard",
    ],
    expected: ["de chacun de ses sommets importants"],
    comparator: "mcq_exact",
    hint: "Une figure est construite à partir de ses points.",
    explanation:
      "Pour construire le symétrique d’une figure, on construit le symétrique de chaque sommet important, puis on relie les points obtenus.",
    tags: ["cm2", "symetrie", "construire", "figure", "methode", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_construire_fixed_8_figure_canvas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 3,
    theme: "neutral",
    text: "La figure rouge est-elle bien la construction symétrique de la figure bleue ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Vérifie les sommets un par un.",
    explanation:
      "Oui. Chaque sommet rouge correspond au sommet bleu placé en miroir par rapport à l’axe.",
    tags: ["cm2", "symetrie", "construire", "figure", "qcm", "canvas"],
    canvas: symFigureVertical(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_construire_fixed_9_figure_erreur_canvas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 4,
    theme: "neutral",
    text: "La construction rouge est-elle correcte ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une seule erreur de sommet rend la construction fausse.",
    explanation:
      "Non. Un des sommets rouges n’est pas placé au bon endroit. La construction symétrique n’est donc pas correcte.",
    tags: ["cm2", "symetrie", "construire", "figure", "erreur", "qcm", "canvas"],
    canvas: symFigureVerticalErreur(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_construire_fixed_10_open_point",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment construire le symétrique A' d’un point A sur quadrillage.",
    format: "open",
    expected: ["axe", "autre côté", "même", "distance"],
    comparator: "contains_keyword",
    hint: "Parle de l’axe et de la distance.",
    explanation:
      "On repère la distance entre A et l’axe. Puis on place A' de l’autre côté de l’axe, à la même distance.",
    tags: ["cm2", "symetrie", "construire", "point", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_construire_fixed_11_open_figure",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment construire le symétrique d’une figure sur quadrillage.",
    format: "open",
    expected: ["sommets", "axe", "distance", "relier"],
    comparator: "contains_keyword",
    hint: "Construis d’abord les sommets images.",
    explanation:
      "On construit le symétrique de chaque sommet de la figure, puis on relie les sommets obtenus dans le bon ordre.",
    tags: ["cm2", "symetrie", "construire", "figure", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_construire_fixed_12_erreur_distance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève place A' de l’autre côté de l’axe, mais pas à la même distance que A. Est-ce correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La distance à l’axe doit être conservée.",
    explanation:
      "Non. Pour une symétrie correcte, A et A' doivent être à la même distance de l’axe.",
    tags: ["cm2", "symetrie", "construire", "erreur", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_construire_fixed_13_erreur_un_seul_sommet",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Pour vérifier la construction symétrique d’une figure, suffit-il de vérifier un seul sommet ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un autre sommet peut être mal placé.",
    explanation:
      "Non. Il faut vérifier tous les sommets importants. Un seul sommet correct ne suffit pas à valider toute la figure.",
    tags: ["cm2", "symetrie", "construire", "verification", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_construire_fixed_14_reunion_frise",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 3,
    theme: "reunion",
    text: "Pour reproduire un motif symétrique sur une frise réunionnaise, il faut placer chaque point image...",
    format: "qcm",
    choices: [
      "de l’autre côté de l’axe, à la même distance",
      "au hasard pour décorer",
      "uniquement sur l’axe",
      "toujours plus loin que le modèle",
    ],
    expected: ["de l’autre côté de l’axe, à la même distance"],
    comparator: "mcq_exact",
    hint: "La symétrie doit être précise.",
    explanation:
      "Pour construire un motif symétrique, chaque point image doit être placé de l’autre côté de l’axe, à la même distance.",
    tags: ["cm2", "symetrie", "construire", "reunion", "motif", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_symetrie_construire_tpl_1_distance_verticale",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 2,
    theme: "neutral",
    hint: "Même distance, autre côté.",
    tags: ["cm2", "symetrie", "construire", "point", "distance", "template", "qcm", "canvas"],
    generate: () => {
      const d = randomChoice([1, 2, 3]);

      return {
        text: `Le point A est à ${d} carreau(x) à gauche de l’axe vertical. Où doit être A' ?`,
        format: "qcm",
        choices: shuffle([
          `${d} carreau(x) à droite de l’axe`,
          `${d} carreau(x) à gauche de l’axe`,
          `${d + 1} carreau(x) à droite de l’axe`,
          "sur l’axe",
        ]),
        expected: [`${d} carreau(x) à droite de l’axe`],
        comparator: "mcq_exact",
        explanation:
          `A' doit être de l’autre côté de l’axe, à la même distance que A : donc à ${d} carreau(x) à droite.`,
        canvas: symPointVertical(d),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_symetrie_construire_tpl_2_distance_horizontale",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 2,
    theme: "neutral",
    hint: "Même distance, de l’autre côté de l’axe horizontal.",
    tags: ["cm2", "symetrie", "construire", "point", "distance", "template", "qcm", "canvas"],
    generate: () => {
      const d = randomChoice([1, 2, 3]);

      return {
        text: `Le point A est à ${d} carreau(x) au-dessus de l’axe horizontal. Où doit être A' ?`,
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
          `A' doit être de l’autre côté de l’axe, à la même distance que A : donc à ${d} carreau(x) au-dessous.`,
        canvas: symPointHorizontal(d),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_symetrie_construire_tpl_3_point_ou_figure",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie la distance à l’axe.",
    tags: ["cm2", "symetrie", "construire", "template", "qcm", "canvas"],
    generate: () => {
      const askPoint = Math.random() < 0.5;

      return {
        text: askPoint
          ? "Le point A' est-il bien le symétrique du point A ?"
          : "La figure rouge est-elle bien le symétrique de la figure bleue ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: askPoint
          ? "Oui. A et A' sont de chaque côté de l’axe, à la même distance."
          : "Oui. Les sommets rouges correspondent aux sommets bleus par symétrie.",
        canvas: askPoint ? symPointVertical(2) : symFigureVertical(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_symetrie_construire_tpl_4_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie tous les points importants.",
    tags: ["cm2", "symetrie", "construire", "erreur", "template", "qcm", "canvas"],
    generate: () => ({
      text: "La construction rouge est-elle une construction symétrique correcte ?",
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["non"],
      comparator: "mcq_exact",
      explanation:
        "Non. Un sommet rouge est mal placé : la figure n’est donc pas correctement construite par symétrie.",
      canvas: symFigureVerticalErreur(),
    }),
  },
    // ============================================================
  // SYMETRIE_PROPRIETE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_symetrie_propriete_fixed_1_meme_distance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une symétrie axiale, un point et son image sont...",
    format: "qcm",
    choices: [
      "à la même distance de l’axe",
      "toujours sur l’axe",
      "toujours à 1 carreau de l’axe",
      "placés au hasard",
    ],
    expected: ["à la même distance de l’axe"],
    comparator: "mcq_exact",
    hint: "L’axe sert de miroir.",
    explanation:
      "Dans une symétrie axiale, un point et son image sont à la même distance de l’axe.",
    tags: ["cm2", "symetrie", "propriete", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_propriete_fixed_2_autre_cote",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une symétrie axiale, l’image d’un point est généralement...",
    format: "qcm",
    choices: [
      "de l’autre côté de l’axe",
      "toujours au même endroit",
      "toujours plus grande",
      "toujours effacée",
    ],
    expected: ["de l’autre côté de l’axe"],
    comparator: "mcq_exact",
    hint: "Comme dans un miroir.",
    explanation:
      "Dans une symétrie axiale, l’image d’un point est généralement de l’autre côté de l’axe, sauf si le point est déjà sur l’axe.",
    tags: ["cm2", "symetrie", "propriete", "autre_cote", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_propriete_fixed_3_point_sur_axe",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Un point placé sur l’axe de symétrie...",
    format: "qcm",
    choices: [
      "ne change pas de place",
      "se déplace toujours à gauche",
      "se déplace toujours à droite",
      "devient un segment",
    ],
    expected: ["ne change pas de place"],
    comparator: "mcq_exact",
    hint: "Il est déjà sur le miroir.",
    explanation:
      "Un point placé sur l’axe de symétrie est son propre symétrique. Il ne change pas de place.",
    tags: ["cm2", "symetrie", "propriete", "point_sur_axe", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_propriete_fixed_4_conserve_longueurs",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Une symétrie axiale conserve...",
    format: "qcm",
    choices: [
      "les longueurs",
      "seulement les couleurs",
      "seulement les noms des points",
      "aucune mesure",
    ],
    expected: ["les longueurs"],
    comparator: "mcq_exact",
    hint: "La figure n’est pas déformée.",
    explanation:
      "Une symétrie axiale ne déforme pas la figure : les longueurs sont conservées.",
    tags: ["cm2", "symetrie", "propriete", "longueurs", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_propriete_fixed_5_conserve_forme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "L’image d’une figure par symétrie axiale a...",
    format: "qcm",
    choices: [
      "la même forme et la même taille",
      "toujours une taille plus grande",
      "toujours une forme différente",
      "toujours 4 côtés",
    ],
    expected: ["la même forme et la même taille"],
    comparator: "mcq_exact",
    hint: "Un miroir ne déforme pas.",
    explanation:
      "La symétrie axiale conserve la forme et la taille de la figure.",
    tags: ["cm2", "symetrie", "propriete", "forme", "taille", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_propriete_fixed_6_segment_longueur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Un segment [AB] mesure 5 cm. Son image [A'B'] par symétrie axiale mesure...",
    format: "qcm",
    choices: ["5 cm", "10 cm", "2 cm", "on ne peut pas savoir"],
    expected: ["5 cm"],
    comparator: "mcq_exact",
    hint: "La symétrie conserve les longueurs.",
    explanation:
      "La symétrie axiale conserve les longueurs. Si [AB] mesure 5 cm, alors [A'B'] mesure aussi 5 cm.",
    tags: ["cm2", "symetrie", "propriete", "longueur", "segment", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_propriete_fixed_7_erreur_agrandit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “La symétrie axiale agrandit la figure.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une symétrie ne change pas la taille.",
    explanation:
      "Non. Une symétrie axiale ne change pas la taille de la figure. Elle produit une image en miroir.",
    tags: ["cm2", "symetrie", "propriete", "erreur", "agrandissement", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_propriete_fixed_8_erreur_distance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève place A' de l’autre côté de l’axe, mais plus loin que A. Est-ce une symétrie correcte ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La distance à l’axe doit être la même.",
    explanation:
      "Non. Pour une symétrie correcte, A et A' doivent être à la même distance de l’axe.",
    tags: ["cm2", "symetrie", "propriete", "erreur", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_propriete_fixed_9_canvas_distance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Sur la figure, A et A' respectent-ils la propriété de même distance à l’axe ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compte les carreaux de chaque côté de l’axe.",
    explanation:
      "Oui. A et A' sont placés de part et d’autre de l’axe, à la même distance.",
    tags: ["cm2", "symetrie", "propriete", "distance", "qcm", "canvas"],
    canvas: symPointVertical(2),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_propriete_fixed_10_canvas_figure",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "La figure rouge a-t-elle la même forme que la figure bleue ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Une symétrie ne déforme pas la figure.",
    explanation:
      "Oui. La figure rouge est l’image symétrique de la figure bleue : elle a donc la même forme et la même taille.",
    tags: ["cm2", "symetrie", "propriete", "forme", "taille", "qcm", "canvas"],
    canvas: symFigureVertical(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_propriete_fixed_11_open_conservation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 4,
    theme: "neutral",
    text: "Cite deux choses conservées par une symétrie axiale.",
    format: "open",
    expected: ["longueur", "forme", "taille", "angle", "distance"],
    comparator: "contains_keyword",
    hint: "Pense à ce qui ne change pas dans l’image.",
    explanation:
      "Une symétrie axiale conserve par exemple les longueurs, la forme, la taille et les angles.",
    tags: ["cm2", "symetrie", "propriete", "open", "conservation"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_propriete_fixed_12_open_distance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la propriété de même distance à l’axe.",
    format: "open",
    expected: ["point", "image", "même", "distance", "axe"],
    comparator: "contains_keyword",
    hint: "Parle d’un point et de son image.",
    explanation:
      "Dans une symétrie axiale, un point et son image sont placés de part et d’autre de l’axe, à la même distance de cet axe.",
    tags: ["cm2", "symetrie", "propriete", "distance", "open"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_propriete_fixed_13_reunion_motif",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un motif symétrique de carrelage à La Réunion, la partie image garde...",
    format: "qcm",
    choices: [
      "la même forme et la même taille",
      "une taille toujours plus grande",
      "une forme complètement différente",
      "seulement la couleur",
    ],
    expected: ["la même forme et la même taille"],
    comparator: "mcq_exact",
    hint: "La symétrie ne déforme pas.",
    explanation:
      "Dans un motif symétrique, l’image garde la même forme et la même taille que le motif de départ.",
    tags: ["cm2", "symetrie", "propriete", "reunion", "motif", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_symetrie_propriete_tpl_1_longueur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "La symétrie conserve les longueurs.",
    tags: ["cm2", "symetrie", "propriete", "longueur", "template"],
    generate: () => {
      const l = randomChoice([3, 4, 5, 6, 7, 8]);

      return {
        text: `Un segment [AB] mesure ${l} cm. Son image [A'B'] par symétrie axiale mesure combien ?`,
        format: "short",
        expected: [String(l), `${l} cm`, `${l}cm`],
        comparator: "number_equal",
        explanation:
          `La symétrie axiale conserve les longueurs. Donc si AB = ${l} cm, alors A'B' = ${l} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_symetrie_propriete_tpl_2_distance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Un point et son image sont à la même distance de l’axe.",
    tags: ["cm2", "symetrie", "propriete", "distance", "template", "qcm", "canvas"],
    generate: () => {
      const d = randomChoice([1, 2, 3]);

      return {
        text: `A est à ${d} carreau(x) de l’axe. À quelle distance de l’axe se trouve A' ?`,
        format: "qcm",
        choices: shuffle([
          `${d} carreau(x)`,
          `${d + 1} carreau(x)`,
          "sur l’axe",
          `${Math.max(1, d - 1)} carreau(x)`,
        ]),
        expected: [`${d} carreau(x)`],
        comparator: "mcq_exact",
        explanation:
          `A' est à la même distance de l’axe que A. Il est donc à ${d} carreau(x) de l’axe.`,
        canvas: symPointVertical(d),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_symetrie_propriete_tpl_3_vrai_faux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 4,
    theme: "neutral",
    hint: "Une symétrie ne déforme pas.",
    tags: ["cm2", "symetrie", "propriete", "vrai_faux", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Une symétrie axiale conserve les longueurs.",
          expected: "vrai",
          explanation:
            "Vrai. La symétrie axiale conserve les longueurs.",
        },
        {
          text: "Une symétrie axiale agrandit toujours la figure.",
          expected: "faux",
          explanation:
            "Faux. La symétrie axiale ne change pas la taille de la figure.",
        },
        {
          text: "Un point sur l’axe reste au même endroit.",
          expected: "vrai",
          explanation:
            "Vrai. Un point placé sur l’axe est son propre symétrique.",
        },
        {
          text: "Un point et son image peuvent être à des distances différentes de l’axe.",
          expected: "faux",
          explanation:
            "Faux. Un point et son image sont à la même distance de l’axe.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["vrai", "faux"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_symetrie_propriete_tpl_4_forme_taille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "L’image symétrique ne change pas de taille.",
    tags: ["cm2", "symetrie", "propriete", "forme", "taille", "template", "qcm", "canvas"],
    generate: () => {
      const ok = Math.random() < 0.5;

      return {
        text: ok
          ? "La figure rouge est-elle de même forme et de même taille que la figure bleue ?"
          : "Une image par symétrie axiale peut-elle être plus grande que la figure de départ ?",
        format: "qcm",
        choices: ok ? ["oui", "non"] : ["oui", "non"],
        expected: [ok ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: ok
          ? "Oui. Une symétrie axiale conserve la forme et la taille."
          : "Non. Une symétrie axiale ne change pas la taille de la figure.",
        canvas: symFigureVertical(),
      };
    },
  },
    // ============================================================
  // SYMETRIE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_symetrie_defi_fixed_1_presque_symetrique",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Les deux figures semblent presque symétriques. Peut-on conclure qu’elles sont vraiment symétriques ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une impression visuelle ne suffit pas.",
    explanation:
      "Non. Une figure presque symétrique peut contenir une erreur. Il faut vérifier les distances à l’axe pour les sommets importants.",
    tags: ["cm2", "symetrie", "defi", "presque", "erreur", "qcm", "canvas"],
    canvas: symVerticalNon(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_defi_fixed_2_axe_oblique",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Les deux figures sont symétriques par rapport à un axe oblique. Quelle affirmation est vraie ?",
    format: "qcm",
    choices: [
      "un axe de symétrie peut être oblique",
      "un axe de symétrie est toujours vertical",
      "un axe oblique est impossible",
      "la symétrie change la taille",
    ],
    expected: ["un axe de symétrie peut être oblique"],
    comparator: "mcq_exact",
    hint: "L’axe est une droite de pliage.",
    explanation:
      "Un axe de symétrie peut être vertical, horizontal ou oblique. L’important est que le pliage superpose bien les deux parties.",
    tags: ["cm2", "symetrie", "defi", "axe_oblique", "qcm", "canvas"],
    canvas: symObliqueOui(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_defi_fixed_3_erreur_distance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève place tous les points images du bon côté de l’axe, mais certains ne sont pas à la même distance. Sa construction est-elle correcte ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le bon côté ne suffit pas.",
    explanation:
      "Non. Dans une symétrie axiale, il faut être du bon côté de l’axe, mais aussi à la même distance de l’axe.",
    tags: ["cm2", "symetrie", "defi", "erreur", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_defi_fixed_4_erreur_un_sommet",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une figure symétrique, si un seul sommet image est mal placé, la construction est...",
    format: "qcm",
    choices: ["fausse", "toujours correcte", "plus grande", "sans axe"],
    expected: ["fausse"],
    comparator: "mcq_exact",
    hint: "Tous les sommets importants doivent être corrects.",
    explanation:
      "La construction est fausse. Pour construire une figure symétrique, chaque sommet important doit être bien placé.",
    tags: ["cm2", "symetrie", "defi", "erreur", "sommet", "qcm", "canvas"],
    canvas: symFigureVerticalErreur(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_defi_fixed_5_devinette_axe",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Je suis une droite qui permet de plier une figure en deux parties superposables. Qui suis-je ?",
    format: "qcm",
    choices: [
      "un axe de symétrie",
      "un diamètre",
      "un sommet",
      "une aire",
    ],
    expected: ["un axe de symétrie"],
    comparator: "mcq_exact",
    hint: "Le mot important est axe.",
    explanation:
      "Une droite qui permet de plier une figure en deux parties superposables est un axe de symétrie.",
    tags: ["cm2", "symetrie", "defi", "devinette", "axe", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_defi_fixed_6_devinette_point",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Je suis un point placé sur l’axe de symétrie. Que devient mon image ?",
    format: "qcm",
    choices: [
      "elle reste au même endroit",
      "elle part toujours à droite",
      "elle disparaît",
      "elle double de taille",
    ],
    expected: ["elle reste au même endroit"],
    comparator: "mcq_exact",
    hint: "Un point sur le miroir ne bouge pas.",
    explanation:
      "Un point placé sur l’axe de symétrie est son propre symétrique. Il reste au même endroit.",
    tags: ["cm2", "symetrie", "defi", "point_sur_axe", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_defi_fixed_7_reunion_carrelage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Sur un carrelage à La Réunion, un motif est répété comme dans un miroir par rapport à une droite. Quelle notion de géométrie reconnaît-on ?",
    format: "qcm",
    choices: [
      "la symétrie axiale",
      "la division posée",
      "la proportionnalité",
      "le calcul de durée",
    ],
    expected: ["la symétrie axiale"],
    comparator: "mcq_exact",
    hint: "Il y a un axe qui joue le rôle de miroir.",
    explanation:
      "Quand un motif est répété comme dans un miroir par rapport à une droite, on reconnaît une symétrie axiale.",
    tags: ["cm2", "symetrie", "defi", "reunion", "carrelage", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_defi_fixed_8_reunion_margouillat",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Sur un logo de margouillat stylisé, une droite semble couper le dessin en deux parties semblables. Que faut-il vérifier avant de dire que c’est un axe de symétrie ?",
    format: "open",
    expected: ["plier", "superposer", "axe", "distance", "parties"],
    comparator: "contains_keyword",
    hint: "Ne te fie pas seulement à l’apparence.",
    explanation:
      "Il faut vérifier que le pliage selon cette droite superpose exactement les deux parties. Les points correspondants doivent aussi être à la même distance de l’axe.",
    tags: ["cm2", "symetrie", "defi", "reunion", "open", "verification"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_defi_fixed_9_open_presque_symetrique",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi une figure presque symétrique n’est pas forcément symétrique.",
    format: "open",
    expected: ["vérifier", "distance", "axe", "sommet", "exact"],
    comparator: "contains_keyword",
    hint: "Une seule erreur peut suffire.",
    explanation:
      "Une figure peut sembler symétrique, mais il faut vérifier précisément les sommets et les distances à l’axe. Si un point est mal placé, la symétrie n’est pas exacte.",
    tags: ["cm2", "symetrie", "defi", "open", "erreur", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_defi_fixed_10_open_axe_oblique",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi un axe de symétrie peut être oblique.",
    format: "open",
    expected: ["axe", "oblique", "plier", "superposer", "miroir"],
    comparator: "contains_keyword",
    hint: "Un axe est une droite de pliage.",
    explanation:
      "Un axe de symétrie est une droite qui permet un pliage. Cette droite peut être verticale, horizontale ou oblique si les deux parties se superposent exactement.",
    tags: ["cm2", "symetrie", "defi", "open", "axe_oblique", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_defi_fixed_11_open_methode_complete",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Décris une méthode complète pour vérifier qu’une figure rouge est l’image d’une figure bleue par symétrie axiale.",
    format: "open",
    expected: ["axe", "sommets", "distance", "autre côté", "vérifier"],
    comparator: "contains_keyword",
    hint: "Parle de l’axe et des sommets correspondants.",
    explanation:
      "On repère l’axe. Puis on vérifie que chaque sommet rouge correspond à un sommet bleu placé de l’autre côté de l’axe, à la même distance. Si tous les sommets sont corrects, les figures sont symétriques.",
    tags: ["cm2", "symetrie", "defi", "open", "methode", "verification"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_defi_fixed_12_open_erreur_eleve",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : “Si la figure est du bon côté de l’axe, alors elle est forcément symétrique.” Explique son erreur.",
    format: "open",
    expected: ["distance", "axe", "même", "sommet", "vérifier"],
    comparator: "contains_keyword",
    hint: "Le bon côté ne suffit pas.",
    explanation:
      "L’élève oublie qu’il faut aussi respecter la même distance à l’axe. Une figure peut être du bon côté, mais mal placée.",
    tags: ["cm2", "symetrie", "defi", "open", "erreur", "distance"],
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_defi_fixed_13_canvas_verification_oui",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Après vérification des sommets, peut-on dire que les deux figures sont symétriques ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Chaque sommet image est bien placé.",
    explanation:
      "Oui. Les sommets correspondants sont placés de chaque côté de l’axe, à la même distance.",
    tags: ["cm2", "symetrie", "defi", "verification", "qcm", "canvas"],
    canvas: symFigureVertical(),
  },

  {
    kind: "fixed",
    id: "cm2_symetrie_defi_fixed_14_canvas_verification_non",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Après vérification des sommets, peut-on dire que les deux figures sont symétriques ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Cherche le sommet mal placé.",
    explanation:
      "Non. Au moins un sommet image est mal placé : les deux figures ne sont donc pas exactement symétriques.",
    tags: ["cm2", "symetrie", "defi", "verification", "erreur", "qcm", "canvas"],
    canvas: symFigureVerticalErreur(),
  },

  {
    kind: "template",
    id: "cm2_symetrie_defi_tpl_1_oui_non",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie si la symétrie est exacte.",
    tags: ["cm2", "symetrie", "defi", "template", "qcm", "canvas"],
    generate: () => {
      const ok = Math.random() < 0.5;

      return {
        text: "Les deux figures sont-elles vraiment symétriques par rapport à l’axe ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: [ok ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: ok
          ? "Oui. Les sommets correspondants sont bien à la même distance de l’axe."
          : "Non. Au moins un sommet n’est pas correctement placé.",
        canvas: ok ? symFigureVertical() : symFigureVerticalErreur(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_symetrie_defi_tpl_2_axes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pense aux différents types d’axes.",
    tags: ["cm2", "symetrie", "defi", "axe", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un axe de symétrie peut-il être horizontal ?",
          expected: "oui",
          explanation:
            "Oui. Un axe de symétrie peut être horizontal si le pliage superpose les deux parties.",
          canvas: symHorizontalOui(),
        },
        {
          text: "Un axe de symétrie peut-il être vertical ?",
          expected: "oui",
          explanation:
            "Oui. Un axe de symétrie peut être vertical si le pliage superpose les deux parties.",
          canvas: symVerticalOui(),
        },
        {
          text: "Un axe de symétrie peut-il être oblique ?",
          expected: "oui",
          explanation:
            "Oui. Un axe de symétrie peut aussi être oblique.",
          canvas: symObliqueOui(),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_symetrie_defi_tpl_3_erreur_eleve",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche la propriété oubliée.",
    tags: ["cm2", "symetrie", "defi", "erreur", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un élève dit : “La symétrie axiale agrandit la figure.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. La symétrie axiale conserve la taille de la figure.",
        },
        {
          text: "Un élève dit : “Si un point est sur l’axe, son image reste au même endroit.” A-t-il raison ?",
          expected: "oui",
          explanation:
            "Oui. Un point placé sur l’axe est son propre symétrique.",
        },
        {
          text: "Un élève dit : “Le point image doit être à la même distance de l’axe.” A-t-il raison ?",
          expected: "oui",
          explanation:
            "Oui. Un point et son image sont à la même distance de l’axe.",
        },
        {
          text: "Un élève dit : “Il suffit de vérifier un seul sommet pour toute une figure.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Il faut vérifier tous les sommets importants.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_symetrie_defi_tpl_4_distance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "symetrie",
    microId: "symetrie_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Même distance à l’axe.",
    tags: ["cm2", "symetrie", "defi", "distance", "template", "qcm", "canvas"],
    generate: () => {
      const d = randomChoice([2, 3, 4]);
      const vertical = Math.random() < 0.5;

      return {
        text: vertical
          ? `A est à ${d} carreaux à gauche de l’axe vertical. Où doit être A' ?`
          : `A est à ${d} carreaux au-dessus de l’axe horizontal. Où doit être A' ?`,
        format: "qcm",
        choices: vertical
          ? shuffle([
              `${d} carreaux à droite de l’axe`,
              `${d + 1} carreaux à droite de l’axe`,
              `${d} carreaux à gauche de l’axe`,
              "sur l’axe",
            ])
          : shuffle([
              `${d} carreaux au-dessous de l’axe`,
              `${d + 1} carreaux au-dessous de l’axe`,
              `${d} carreaux au-dessus de l’axe`,
              "sur l’axe",
            ]),
        expected: vertical
          ? [`${d} carreaux à droite de l’axe`]
          : [`${d} carreaux au-dessous de l’axe`],
        comparator: "mcq_exact",
        explanation:
          "Le point image doit être de l’autre côté de l’axe, à la même distance.",
        canvas: vertical ? symPointVertical(d) : symPointHorizontal(d),
      };
    },
  },
];
