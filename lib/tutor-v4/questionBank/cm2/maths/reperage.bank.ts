// lib/tutor-v4/question-banks/maths/cm2/reperage.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

function reperageCanvas(data: {
  rows?: number;
  cols?: number;
  points?: {
    x: number;
    y: number;
    label?: string;
    color?: string;
  }[];
  target?: {
    x: number;
    y: number;
    label?: string;
    hidden?: boolean;
    color?: string;
  };
  path?: {
    start: {
      x: number;
      y: number;
      label?: string;
      color?: string;
    };
    steps: {
      direction: "haut" | "bas" | "gauche" | "droite";
      count: number;
      color?: string;
    }[];
    showArrows?: boolean;
    color?: string;
  };
  display?: {
    showGrid?: boolean;
    showAxes?: boolean;
    showCoordinates?: boolean;
    showPointLabels?: boolean;
    showTarget?: boolean;
  };
}) {
  return {
    kind: "reperage" as const,
    grid: {
      rows: data.rows ?? 5,
      cols: data.cols ?? 5,
    },
    points: data.points ?? [],
    target: data.target,
    path: data.path,
    colors: {
      background: "#ffffff",
      grid: "#cbd5e1",
      axisX: "#2563eb",
      axisY: "#16a34a",
      point: "#ef4444",
      target: "#f97316",
      path: "#8b5cf6",
      text: "#0f172a",
    },
    display: {
      showGrid: true,
      showAxes: true,
      showCoordinates: true,
      showPointLabels: true,
      showTarget: true,
      ...(data.display ?? {}),
    },
    size: {
      width: 340,
      height: 280,
    },
  };
}

export const reperageBank: TutorBankItemV4[] = [
  // ============================================================
  // REPERAGE_QUADRILLAGE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_reperage_quadrillage_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 1,
    theme: "neutral",
    text: "À quoi sert un quadrillage ?",
    format: "qcm",
    choices: [
      "à se repérer plus facilement",
      "à mesurer une masse",
      "à calculer une division",
      "à mesurer une température",
    ],
    expected: ["à se repérer plus facilement"],
    comparator: "mcq_exact",
    hint: "Un quadrillage aide à retrouver une position.",
    explanation: exp(
      "Un quadrillage est formé de lignes et de colonnes.",
      "On l’utilise pour repérer une case, un point ou un déplacement.",
      "Grâce aux lignes et aux colonnes, on peut indiquer où se trouve un objet.",
      "Un quadrillage sert à se repérer plus facilement."
    ),
    tags: ["cm2", "reperage", "quadrillage", "definition", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [{ x: 2, y: 3, label: "A", color: "#ef4444" }],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_quadrillage_fixed_2_lignes_colonnes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 1,
    theme: "neutral",
    text: "Un quadrillage est souvent formé de...",
    format: "qcm",
    choices: [
      "lignes et colonnes",
      "litres et grammes",
      "heures et minutes",
      "additions et soustractions",
    ],
    expected: ["lignes et colonnes"],
    comparator: "mcq_exact",
    hint: "On parle souvent de lignes horizontales et de colonnes verticales.",
    explanation: exp(
      "Un quadrillage est une organisation régulière.",
      "On distingue les lignes et les colonnes.",
      "Les lignes vont horizontalement et les colonnes verticalement.",
      "Un quadrillage est formé de lignes et de colonnes."
    ),
    tags: ["cm2", "reperage", "quadrillage", "lignes", "colonnes", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 4,
      cols: 5,
      points: [{ x: 1, y: 2, label: "B", color: "#ef4444" }],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_quadrillage_fixed_3_axe_horizontal",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 1,
    theme: "neutral",
    text: "Sur un quadrillage, l’axe horizontal correspond plutôt...",
    format: "qcm",
    choices: [
      "au déplacement gauche-droite",
      "au déplacement haut-bas",
      "à la hauteur d’un solide",
      "à la masse d’un objet",
    ],
    expected: ["au déplacement gauche-droite"],
    comparator: "mcq_exact",
    hint: "Horizontal veut dire de gauche à droite.",
    explanation: exp(
      "L’axe horizontal est l’axe qui va de gauche à droite.",
      "On observe le sens de lecture de l’axe.",
      "Sur un quadrillage, l’axe horizontal aide à repérer la position gauche-droite.",
      "L’axe horizontal correspond au déplacement gauche-droite."
    ),
    tags: ["cm2", "reperage", "quadrillage", "axe_horizontal", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [{ x: 4, y: 1, label: "C", color: "#ef4444" }],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_quadrillage_fixed_4_axe_vertical",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 1,
    theme: "neutral",
    text: "Sur un quadrillage, l’axe vertical correspond plutôt...",
    format: "qcm",
    choices: [
      "au déplacement haut-bas",
      "au déplacement gauche-droite",
      "au périmètre",
      "à une fraction",
    ],
    expected: ["au déplacement haut-bas"],
    comparator: "mcq_exact",
    hint: "Vertical veut dire de bas en haut ou de haut en bas.",
    explanation: exp(
      "L’axe vertical est l’axe qui monte ou descend.",
      "On observe le sens de l’axe.",
      "Sur un quadrillage, l’axe vertical aide à repérer la position haut-bas.",
      "L’axe vertical correspond au déplacement haut-bas."
    ),
    tags: ["cm2", "reperage", "quadrillage", "axe_vertical", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [{ x: 3, y: 4, label: "D", color: "#ef4444" }],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_quadrillage_fixed_5_case_ou_point",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un quadrillage, un point est placé...",
    format: "qcm",
    choices: [
      "à l’intersection de deux lignes",
      "toujours au milieu d’une case",
      "sur une seule ligne au hasard",
      "sans repère possible",
    ],
    expected: ["à l’intersection de deux lignes"],
    comparator: "mcq_exact",
    hint: "Un point repéré par coordonnées se place souvent sur un croisement.",
    explanation: exp(
      "Un point sur quadrillage peut être repéré par deux coordonnées.",
      "On cherche le croisement correspondant.",
      "Le point se place à l’intersection d’une ligne verticale et d’une ligne horizontale.",
      "Un point est placé à l’intersection de deux lignes."
    ),
    tags: ["cm2", "reperage", "quadrillage", "point", "intersection", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [{ x: 2, y: 2, label: "A", color: "#ef4444" }],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_quadrillage_fixed_6_lire_position_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 2,
    theme: "neutral",
    text: "Sur le quadrillage, le point A est-il plutôt à gauche ou à droite ?",
    format: "qcm",
    choices: ["à droite", "à gauche"],
    expected: ["à droite"],
    comparator: "mcq_exact",
    hint: "Regarde si le point est près du bord gauche ou du bord droit.",
    explanation: exp(
      "Se repérer sur un quadrillage, c’est aussi lire une position globale.",
      "On observe l’emplacement du point.",
      "Le point A est placé vers la droite du quadrillage.",
      "Le point A est plutôt à droite."
    ),
    tags: ["cm2", "reperage", "quadrillage", "position", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [{ x: 4, y: 2, label: "A", color: "#ef4444" }],
      display: {
        showCoordinates: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_quadrillage_fixed_7_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 2,
    theme: "reunion",
    text: "Sur une carte simplifiée de La Réunion en quadrillage, à quoi sert le quadrillage ?",
    format: "qcm",
    choices: [
      "à localiser un lieu",
      "à peser un fruit",
      "à mesurer une durée",
      "à calculer une aire automatiquement",
    ],
    expected: ["à localiser un lieu"],
    comparator: "mcq_exact",
    hint: "Une carte quadrillée aide à retrouver une position.",
    explanation: exp(
      "Un quadrillage permet de se repérer dans un espace.",
      "Sur une carte, on peut utiliser lignes et colonnes pour localiser un lieu.",
      "Par exemple, on peut repérer une plage, une école ou un volcan sur une carte quadrillée.",
      "Le quadrillage sert à localiser un lieu."
    ),
    tags: ["cm2", "reperage", "quadrillage", "reunion", "carte", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [
        { x: 1, y: 1, label: "Plage", color: "#38bdf8" },
        { x: 4, y: 4, label: "Volcan", color: "#f97316" },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_quadrillage_fixed_8_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Sur un quadrillage, la position d’un point ne dépend que d’un seul nombre.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour repérer un point, on utilise souvent deux informations.",
    explanation: exp(
      "Sur un quadrillage, on repère souvent un point avec deux coordonnées.",
      "On a besoin d’une position horizontale et d’une position verticale.",
      "Un seul nombre ne suffit généralement pas pour repérer précisément un point.",
      "L’élève a tort."
    ),
    tags: ["cm2", "reperage", "quadrillage", "erreur", "coordonnees", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_reperage_quadrillage_tpl_1_point_global",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe la position globale du point sur le quadrillage.",
    tags: ["cm2", "reperage", "quadrillage", "template", "qcm", "canvas"],
    generate: () => {
      const side = randomChoice(["gauche", "droite"] as const);
      const x = side === "gauche" ? randomChoice([0, 1]) : randomChoice([4, 5]);
      const y = randomInt(1, 4);

      return {
        text: "Sur le quadrillage, le point A est-il plutôt à gauche ou à droite ?",
        format: "qcm",
        choices: ["à gauche", "à droite"],
        expected: [side === "gauche" ? "à gauche" : "à droite"],
        comparator: "mcq_exact",
        explanation: exp(
          "Se repérer, c’est lire la position d’un point.",
          "On regarde si le point est plutôt vers le bord gauche ou le bord droit.",
          `Le point A est placé vers la ${side}.`,
          `Le point A est plutôt à ${side}.`
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points: [{ x, y, label: "A", color: "#ef4444" }],
          display: {
            showCoordinates: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_reperage_quadrillage_tpl_2_nombre_colonnes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 2,
    theme: "neutral",
    hint: "Les colonnes sont verticales.",
    tags: ["cm2", "reperage", "quadrillage", "colonnes", "template", "qcm", "canvas"],
    generate: () => {
      const cols = randomChoice([4, 5, 6]);
      const rows = randomChoice([4, 5]);

      return {
        text: `Ce quadrillage possède ${cols} colonnes. Les colonnes sont-elles plutôt verticales ou horizontales ?`,
        format: "qcm",
        choices: ["verticales", "horizontales"],
        expected: ["verticales"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un quadrillage est formé de lignes et de colonnes.",
          "On distingue leur direction.",
          "Les colonnes sont verticales : elles vont de haut en bas.",
          "Les colonnes sont verticales."
        ),
        canvas: reperageCanvas({
          rows,
          cols,
          points: [{ x: 2, y: 2, label: "A", color: "#ef4444" }],
          display: {
            showCoordinates: false,
          },
        }),
      };
    },
  },
    // ============================================================
  // REPERAGE_COORDONNEES
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_reperage_coordonnees_fixed_1_lire_point_a",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 1,
    theme: "neutral",
    text: "Sur le quadrillage, quelles sont les coordonnées du point A ?",
    format: "qcm",
    choices: ["(2 ; 3)", "(3 ; 2)", "(2 ; 2)", "(3 ; 3)"],
    expected: ["(2 ; 3)"],
    comparator: "mcq_exact",
    hint: "On lit d’abord la position horizontale, puis la position verticale.",
    explanation: exp(
      "Les coordonnées d’un point indiquent sa position sur un quadrillage.",
      "On lit d’abord la coordonnée horizontale, puis la coordonnée verticale.",
      "Le point A est placé à x = 2 et y = 3.",
      "Les coordonnées de A sont (2 ; 3)."
    ),
    tags: ["cm2", "reperage", "coordonnees", "lire", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [{ x: 2, y: 3, label: "A", color: "#ef4444" }],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_coordonnees_fixed_2_lire_point_b",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 1,
    theme: "neutral",
    text: "Sur le quadrillage, le point B est placé en (4 ; 1). Quelle réponse est correcte ?",
    format: "qcm",
    choices: ["B(4 ; 1)", "B(1 ; 4)", "B(4 ; 4)", "B(1 ; 1)"],
    expected: ["B(4 ; 1)"],
    comparator: "mcq_exact",
    hint: "La première coordonnée se lit sur l’axe horizontal.",
    explanation: exp(
      "Les coordonnées permettent d’écrire précisément la position d’un point.",
      "On écrit le nom du point puis ses deux coordonnées.",
      "Le point B est à x = 4 et y = 1.",
      "On écrit B(4 ; 1)."
    ),
    tags: ["cm2", "reperage", "coordonnees", "lire", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [{ x: 4, y: 1, label: "B", color: "#ef4444" }],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_coordonnees_fixed_3_ordre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Dans les coordonnées (3 ; 5), le nombre 3 indique...",
    format: "qcm",
    choices: [
      "la position horizontale",
      "la position verticale",
      "la couleur du point",
      "le nombre de cases du quadrillage",
    ],
    expected: ["la position horizontale"],
    comparator: "mcq_exact",
    hint: "On lit d’abord horizontalement, puis verticalement.",
    explanation: exp(
      "Un couple de coordonnées contient deux nombres.",
      "On lit le premier nombre sur l’axe horizontal.",
      "Dans (3 ; 5), le nombre 3 indique la position horizontale.",
      "Le nombre 3 donne la position horizontale."
    ),
    tags: ["cm2", "reperage", "coordonnees", "ordre", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_reperage_coordonnees_fixed_4_ordre_vertical",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Dans les coordonnées (3 ; 5), le nombre 5 indique...",
    format: "qcm",
    choices: [
      "la position verticale",
      "la position horizontale",
      "la longueur du quadrillage",
      "le nom du point",
    ],
    expected: ["la position verticale"],
    comparator: "mcq_exact",
    hint: "Le deuxième nombre se lit verticalement.",
    explanation: exp(
      "Un couple de coordonnées contient deux nombres.",
      "On lit le deuxième nombre sur l’axe vertical.",
      "Dans (3 ; 5), le nombre 5 indique la position verticale.",
      "Le nombre 5 donne la position verticale."
    ),
    tags: ["cm2", "reperage", "coordonnees", "ordre", "vertical", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_reperage_coordonnees_fixed_5_piege_inverse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Le point A est en (1 ; 4). Un élève écrit A(4 ; 1). A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Attention à ne pas inverser les deux coordonnées.",
    explanation: exp(
      "L’ordre des coordonnées est important.",
      "On lit d’abord la position horizontale, puis la position verticale.",
      "A(1 ; 4) n’est pas la même position que A(4 ; 1).",
      "L’élève a tort."
    ),
    tags: ["cm2", "reperage", "coordonnees", "erreur", "inverse", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [{ x: 1, y: 4, label: "A", color: "#ef4444" }],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_coordonnees_fixed_6_plusieurs_points",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Sur le quadrillage, quelles sont les coordonnées du point C ?",
    format: "qcm",
    choices: ["(3 ; 4)", "(4 ; 3)", "(2 ; 4)", "(3 ; 2)"],
    expected: ["(3 ; 4)"],
    comparator: "mcq_exact",
    hint: "Cherche le point C, puis lis horizontalement et verticalement.",
    explanation: exp(
      "Pour lire les coordonnées d’un point, il faut d’abord repérer son nom.",
      "On lit ensuite la position horizontale puis la position verticale.",
      "Le point C est placé à x = 3 et y = 4.",
      "Les coordonnées de C sont (3 ; 4)."
    ),
    tags: ["cm2", "reperage", "coordonnees", "plusieurs_points", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [
        { x: 1, y: 2, label: "A", color: "#2563eb" },
        { x: 4, y: 1, label: "B", color: "#16a34a" },
        { x: 3, y: 4, label: "C", color: "#ef4444" },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_coordonnees_fixed_7_reunion_tresor",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 3,
    theme: "reunion",
    text: "Sur la carte au trésor, le volcan est au point V. Quelles sont ses coordonnées ?",
    format: "qcm",
    choices: ["(4 ; 4)", "(4 ; 2)", "(2 ; 4)", "(1 ; 4)"],
    expected: ["(4 ; 4)"],
    comparator: "mcq_exact",
    hint: "Lis d’abord la position horizontale du volcan.",
    explanation: exp(
      "Une carte quadrillée permet de localiser un lieu avec des coordonnées.",
      "On lit d’abord l’axe horizontal, puis l’axe vertical.",
      "Le volcan V est placé à x = 4 et y = 4.",
      "Les coordonnées du volcan sont (4 ; 4)."
    ),
    tags: ["cm2", "reperage", "coordonnees", "reunion", "volcan", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [
        { x: 1, y: 1, label: "Plage", color: "#38bdf8" },
        { x: 4, y: 4, label: "V", color: "#f97316" },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_coordonnees_fixed_8_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment lire les coordonnées d’un point sur un quadrillage.",
    format: "open",
    expected: ["horizontal", "vertical", "premier", "deuxième"],
    comparator: "contains_keyword",
    hint: "Dis dans quel ordre on lit les deux coordonnées.",
    explanation: exp(
      "Les coordonnées permettent de repérer précisément un point.",
      "On lit d’abord la position horizontale, puis la position verticale.",
      "Par exemple, dans (2 ; 3), 2 est la position horizontale et 3 la position verticale.",
      "Pour lire des coordonnées, on respecte toujours cet ordre."
    ),
    tags: ["cm2", "reperage", "coordonnees", "open", "methode"],
  },

  {
    kind: "template",
    id: "cm2_reperage_coordonnees_tpl_1_lire_point",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis d’abord horizontalement, puis verticalement.",
    tags: ["cm2", "reperage", "coordonnees", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      const correct = `(${x} ; ${y})`;

      return {
        text: "Quelles sont les coordonnées du point A ?",
        format: "qcm",
        choices: makeChoices(correct, [
          `(${y} ; ${x})`,
          `(${Math.max(0, x - 1)} ; ${y})`,
          `(${x} ; ${Math.max(0, y - 1)})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Les coordonnées donnent la position d’un point.",
          "On lit d’abord la position horizontale, puis la position verticale.",
          `Le point A est placé à x = ${x} et y = ${y}.`,
          `Les coordonnées de A sont ${correct}.`
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points: [{ x, y, label: "A", color: "#ef4444" }],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_reperage_coordonnees_tpl_2_piege_inverse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention : (x ; y) n’est pas la même chose que (y ; x).",
    tags: ["cm2", "reperage", "coordonnees", "inverse", "template", "qcm", "canvas"],
    generate: () => {
      let x = randomInt(1, 5);
      let y = randomInt(1, 5);
      while (y === x) y = randomInt(1, 5);

      return {
        text: `Le point A est en (${x} ; ${y}). Un élève écrit A(${y} ; ${x}). A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "L’ordre des coordonnées est important.",
          "On écrit d’abord la position horizontale, puis la position verticale.",
          `A(${x} ; ${y}) et A(${y} ; ${x}) ne désignent pas le même point.`,
          "L’élève a tort."
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points: [{ x, y, label: "A", color: "#ef4444" }],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_reperage_coordonnees_tpl_3_plusieurs_points",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère d’abord le bon point, puis lis ses coordonnées.",
    tags: ["cm2", "reperage", "coordonnees", "plusieurs_points", "template", "qcm", "canvas"],
    generate: () => {
      const points = [
        { x: randomInt(1, 2), y: randomInt(1, 2), label: "A", color: "#2563eb" },
        { x: randomInt(3, 5), y: randomInt(1, 2), label: "B", color: "#16a34a" },
        { x: randomInt(2, 5), y: randomInt(3, 5), label: "C", color: "#ef4444" },
      ];

      const target = randomChoice(points);
      const correct = `(${target.x} ; ${target.y})`;

      return {
        text: `Quelles sont les coordonnées du point ${target.label} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${target.y} ; ${target.x})`,
          `(${Math.max(0, target.x - 1)} ; ${target.y})`,
          `(${target.x} ; ${Math.max(0, target.y - 1)})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand plusieurs points sont placés, il faut repérer le bon point.",
          "On lit ensuite sa coordonnée horizontale puis sa coordonnée verticale.",
          `Le point ${target.label} est en x = ${target.x} et y = ${target.y}.`,
          `Ses coordonnées sont ${correct}.`
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points,
        }),
      };
    },
  },
    // ============================================================
  // REPERAGE_PLACER_POINT
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_reperage_placer_point_fixed_1_point_a",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 1,
    theme: "neutral",
    text: "Où faut-il placer le point A(2 ; 3) ?",
    format: "qcm",
    choices: [
      "à l’intersection de x = 2 et y = 3",
      "à l’intersection de x = 3 et y = 2",
      "sur l’axe vertical uniquement",
      "au hasard sur le quadrillage",
    ],
    expected: ["à l’intersection de x = 2 et y = 3"],
    comparator: "mcq_exact",
    hint: "On lit d’abord la coordonnée horizontale, puis la coordonnée verticale.",
    explanation: exp(
      "Placer un point, c’est utiliser ses coordonnées sur le quadrillage.",
      "On avance d’abord horizontalement jusqu’à x = 2, puis verticalement jusqu’à y = 3.",
      "Le point A(2 ; 3) se place à l’intersection de x = 2 et y = 3.",
      "Il faut placer A à l’intersection de x = 2 et y = 3."
    ),
    tags: ["cm2", "reperage", "placer_point", "coordonnees", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      target: {
        x: 2,
        y: 3,
        label: "A",
        hidden: false,
        color: "#f97316",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_placer_point_fixed_2_point_b",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 1,
    theme: "neutral",
    text: "Pour placer le point B(4 ; 1), on commence par lire...",
    format: "qcm",
    choices: [
      "la coordonnée horizontale 4",
      "la coordonnée verticale 1",
      "le nom de la couleur",
      "le nombre de lignes seulement",
    ],
    expected: ["la coordonnée horizontale 4"],
    comparator: "mcq_exact",
    hint: "Dans (4 ; 1), on lit d’abord 4.",
    explanation: exp(
      "Les coordonnées se lisent dans un ordre précis.",
      "Pour placer un point, on lit d’abord la coordonnée horizontale.",
      "Dans B(4 ; 1), la première coordonnée est 4.",
      "On commence par lire la coordonnée horizontale 4."
    ),
    tags: ["cm2", "reperage", "placer_point", "ordre", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      target: {
        x: 4,
        y: 1,
        label: "B",
        hidden: false,
        color: "#f97316",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_placer_point_fixed_3_choisir_point",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 2,
    theme: "neutral",
    text: "Quel point correspond aux coordonnées (3 ; 4) ?",
    format: "qcm",
    choices: ["A", "B", "C", "D"],
    expected: ["C"],
    comparator: "mcq_exact",
    hint: "Cherche le point placé à x = 3 et y = 4.",
    explanation: exp(
      "Pour reconnaître un point à partir de ses coordonnées, on lit sa position sur le quadrillage.",
      "On cherche d’abord x = 3, puis y = 4.",
      "Le point placé à l’intersection de x = 3 et y = 4 est le point C.",
      "Le point correspondant est C."
    ),
    tags: ["cm2", "reperage", "placer_point", "identifier", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [
        { x: 1, y: 1, label: "A", color: "#2563eb" },
        { x: 4, y: 2, label: "B", color: "#16a34a" },
        { x: 3, y: 4, label: "C", color: "#ef4444" },
        { x: 2, y: 3, label: "D", color: "#8b5cf6" },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_placer_point_fixed_4_piege_inverse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 2,
    theme: "neutral",
    text: "Pour placer A(2 ; 5), un élève va d’abord à 5 puis monte à 2. Est-ce correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On lit d’abord la première coordonnée.",
    explanation: exp(
      "Pour placer un point, l’ordre des coordonnées est important.",
      "On lit d’abord la coordonnée horizontale, puis la coordonnée verticale.",
      "Pour A(2 ; 5), il faut d’abord aller à x = 2, puis à y = 5.",
      "L’élève a tort."
    ),
    tags: ["cm2", "reperage", "placer_point", "erreur", "inverse", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      target: {
        x: 2,
        y: 5,
        label: "A",
        hidden: false,
        color: "#f97316",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_placer_point_fixed_5_point_cache",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 2,
    theme: "neutral",
    text: "Le point mystère est M(5 ; 2). Où doit-il être placé ?",
    format: "qcm",
    choices: [
      "x = 5 et y = 2",
      "x = 2 et y = 5",
      "x = 5 et y = 5",
      "x = 2 et y = 2",
    ],
    expected: ["x = 5 et y = 2"],
    comparator: "mcq_exact",
    hint: "M(5 ; 2) signifie x = 5 et y = 2.",
    explanation: exp(
      "Les coordonnées d’un point indiquent où le placer.",
      "On lit d’abord la coordonnée horizontale, puis la coordonnée verticale.",
      "M(5 ; 2) signifie x = 5 et y = 2.",
      "Le point doit être placé en x = 5 et y = 2."
    ),
    tags: ["cm2", "reperage", "placer_point", "mystere", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      target: {
        x: 5,
        y: 2,
        label: "M",
        hidden: true,
        color: "#f97316",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_placer_point_fixed_6_reunion_tresor",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 3,
    theme: "reunion",
    text: "Sur une carte au trésor, le trésor est en T(4 ; 3). Où faut-il le placer ?",
    format: "qcm",
    choices: [
      "à l’intersection de x = 4 et y = 3",
      "à l’intersection de x = 3 et y = 4",
      "sur x = 4 seulement",
      "sur y = 3 seulement",
    ],
    expected: ["à l’intersection de x = 4 et y = 3"],
    comparator: "mcq_exact",
    hint: "La première coordonnée est horizontale.",
    explanation: exp(
      "Une carte quadrillée permet de localiser un lieu avec des coordonnées.",
      "On lit d’abord la position horizontale, puis la position verticale.",
      "T(4 ; 3) signifie x = 4 et y = 3.",
      "Il faut placer le trésor à l’intersection de x = 4 et y = 3."
    ),
    tags: ["cm2", "reperage", "placer_point", "reunion", "tresor", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      target: {
        x: 4,
        y: 3,
        label: "T",
        hidden: false,
        color: "#f97316",
      },
      points: [
        { x: 1, y: 1, label: "Plage", color: "#38bdf8" },
        { x: 5, y: 5, label: "Volcan", color: "#ef4444" },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_placer_point_fixed_7_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment placer le point A(3 ; 2) sur un quadrillage.",
    format: "open",
    expected: ["3", "2", "horizontal", "vertical"],
    comparator: "contains_keyword",
    hint: "Dis dans quel ordre tu utilises les deux coordonnées.",
    explanation: exp(
      "Placer un point consiste à utiliser ses deux coordonnées.",
      "On lit d’abord la coordonnée horizontale, puis la coordonnée verticale.",
      "Pour A(3 ; 2), on va à x = 3 puis à y = 2.",
      "Le point A se place à l’intersection de x = 3 et y = 2."
    ),
    tags: ["cm2", "reperage", "placer_point", "open", "methode"],
  },

  {
    kind: "template",
    id: "cm2_reperage_placer_point_tpl_1_choisir_position",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans (x ; y), on lit d’abord x puis y.",
    tags: ["cm2", "reperage", "placer_point", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      const correct = `x = ${x} et y = ${y}`;

      return {
        text: `Où faut-il placer le point A(${x} ; ${y}) ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `x = ${y} et y = ${x}`,
          `x = ${x} et y = ${Math.max(0, y - 1)}`,
          `x = ${Math.max(0, x - 1)} et y = ${y}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Les coordonnées indiquent où placer le point.",
          "On lit d’abord la coordonnée horizontale, puis la coordonnée verticale.",
          `A(${x} ; ${y}) signifie x = ${x} et y = ${y}.`,
          `Il faut placer A à l’intersection de x = ${x} et y = ${y}.`
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          target: {
            x,
            y,
            label: "A",
            hidden: false,
            color: "#f97316",
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_reperage_placer_point_tpl_2_point_mystere",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point mystère se place à l’intersection des deux coordonnées.",
    tags: ["cm2", "reperage", "placer_point", "mystere", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      const correct = `(${x} ; ${y})`;

      return {
        text: `Le point mystère M doit être placé avec x = ${x} et y = ${y}. Quelles sont ses coordonnées ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${y} ; ${x})`,
          `(${x} ; ${Math.max(0, y - 1)})`,
          `(${Math.max(0, x - 1)} ; ${y})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Les coordonnées s’écrivent sous la forme (x ; y).",
          "On écrit d’abord la coordonnée horizontale, puis la coordonnée verticale.",
          `Ici, x = ${x} et y = ${y}.`,
          `Les coordonnées de M sont ${correct}.`
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          target: {
            x,
            y,
            label: "M",
            hidden: true,
            color: "#f97316",
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_reperage_placer_point_tpl_3_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 3,
    theme: "reunion",
    hint: "Sur une carte, les coordonnées permettent de localiser un lieu.",
    tags: ["cm2", "reperage", "placer_point", "reunion", "template", "qcm", "canvas"],
    generate: () => {
      const lieux = [
        { label: "Plage", color: "#38bdf8" },
        { label: "Volcan", color: "#f97316" },
        { label: "École", color: "#16a34a" },
        { label: "Marché", color: "#8b5cf6" },
      ];

      const lieu = randomChoice(lieux);
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      const correct = `x = ${x} et y = ${y}`;

      return {
        text: `Sur la carte, le lieu "${lieu.label}" doit être placé en (${x} ; ${y}). Quelle position faut-il choisir ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `x = ${y} et y = ${x}`,
          `x = ${x} et y = ${Math.max(0, y - 1)}`,
          `x = ${Math.max(0, x - 1)} et y = ${y}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une carte quadrillée permet de localiser un lieu avec deux coordonnées.",
          "On lit d’abord la position horizontale, puis la position verticale.",
          `(${x} ; ${y}) signifie x = ${x} et y = ${y}.`,
          `Il faut placer "${lieu.label}" à cette position.`
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          target: {
            x,
            y,
            label: lieu.label,
            hidden: false,
            color: lieu.color,
          },
        }),
      };
    },
  },
    // ============================================================
  // REPERAGE_DEPLACEMENT
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_reperage_deplacement_fixed_1_droite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 1,
    theme: "neutral",
    text: "À partir du point A, on se déplace de 2 cases vers la droite. Où arrive-t-on ?",
    format: "qcm",
    choices: ["B", "C", "D", "A"],
    expected: ["B"],
    comparator: "mcq_exact",
    hint: "Vers la droite, la coordonnée horizontale augmente.",
    explanation: exp(
      "Un déplacement sur quadrillage se fait case par case.",
      "Vers la droite, on augmente la position horizontale.",
      "On part de A(1 ; 2). Après 2 cases à droite, on arrive en (3 ; 2), au point B.",
      "On arrive au point B."
    ),
    tags: ["cm2", "reperage", "deplacement", "droite", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [
        { x: 1, y: 2, label: "A", color: "#ef4444" },
        { x: 3, y: 2, label: "B", color: "#f97316" },
      ],
      path: {
        start: { x: 1, y: 2, label: "A", color: "#ef4444" },
        steps: [{ direction: "droite", count: 2 }],
        showArrows: true,
        color: "#8b5cf6",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_deplacement_fixed_2_haut",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 1,
    theme: "neutral",
    text: "À partir du point A, on monte de 3 cases. Quelle coordonnée change ?",
    format: "qcm",
    choices: [
      "la coordonnée verticale",
      "la coordonnée horizontale",
      "le nom du point",
      "aucune coordonnée",
    ],
    expected: ["la coordonnée verticale"],
    comparator: "mcq_exact",
    hint: "Monter ou descendre agit sur l’axe vertical.",
    explanation: exp(
      "Un déplacement vertical modifie la coordonnée verticale.",
      "On regarde si le déplacement est horizontal ou vertical.",
      "Monter de 3 cases change la position sur l’axe vertical.",
      "C’est la coordonnée verticale qui change."
    ),
    tags: ["cm2", "reperage", "deplacement", "haut", "vertical", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [
        { x: 2, y: 1, label: "A", color: "#ef4444" },
        { x: 2, y: 4, label: "B", color: "#f97316" },
      ],
      path: {
        start: { x: 2, y: 1, label: "A", color: "#ef4444" },
        steps: [{ direction: "haut", count: 3 }],
        showArrows: true,
        color: "#8b5cf6",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_deplacement_fixed_3_coordonnees_arrivee",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 2,
    theme: "neutral",
    text: "On part de A(2 ; 2), puis on va 2 cases à droite. Quelles sont les coordonnées du point d’arrivée ?",
    format: "qcm",
    choices: ["(4 ; 2)", "(2 ; 4)", "(0 ; 2)", "(4 ; 4)"],
    expected: ["(4 ; 2)"],
    comparator: "mcq_exact",
    hint: "Vers la droite, x augmente. y ne change pas.",
    explanation: exp(
      "Un déplacement vers la droite augmente la coordonnée horizontale.",
      "On ajoute 2 à la première coordonnée.",
      "On part de (2 ; 2). 2 cases à droite donnent x = 4 et y reste 2.",
      "Le point d’arrivée est (4 ; 2)."
    ),
    tags: ["cm2", "reperage", "deplacement", "coordonnees", "droite", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      path: {
        start: { x: 2, y: 2, label: "A", color: "#ef4444" },
        steps: [{ direction: "droite", count: 2 }],
        showArrows: true,
        color: "#8b5cf6",
      },
      target: {
        x: 4,
        y: 2,
        label: "Arrivée",
        hidden: false,
        color: "#f97316",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_deplacement_fixed_4_coordonnees_haut",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 2,
    theme: "neutral",
    text: "On part de A(3 ; 1), puis on monte de 3 cases. Quelles sont les coordonnées du point d’arrivée ?",
    format: "qcm",
    choices: ["(3 ; 4)", "(4 ; 3)", "(0 ; 3)", "(3 ; 3)"],
    expected: ["(3 ; 4)"],
    comparator: "mcq_exact",
    hint: "Quand on monte, y augmente.",
    explanation: exp(
      "Un déplacement vers le haut augmente la coordonnée verticale.",
      "On garde la coordonnée horizontale et on ajoute 3 à la coordonnée verticale.",
      "On part de (3 ; 1). En montant de 3 cases, on arrive à (3 ; 4).",
      "Le point d’arrivée est (3 ; 4)."
    ),
    tags: ["cm2", "reperage", "deplacement", "coordonnees", "haut", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      path: {
        start: { x: 3, y: 1, label: "A", color: "#ef4444" },
        steps: [{ direction: "haut", count: 3 }],
        showArrows: true,
        color: "#8b5cf6",
      },
      target: {
        x: 3,
        y: 4,
        label: "Arrivée",
        hidden: false,
        color: "#f97316",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_deplacement_fixed_5_gauche_bas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "On part de A(4 ; 4), puis on va 2 cases à gauche et 1 case vers le bas. Où arrive-t-on ?",
    format: "qcm",
    choices: ["(2 ; 3)", "(6 ; 3)", "(2 ; 5)", "(3 ; 2)"],
    expected: ["(2 ; 3)"],
    comparator: "mcq_exact",
    hint: "À gauche, x diminue. Vers le bas, y diminue.",
    explanation: exp(
      "Un déplacement peut modifier les deux coordonnées.",
      "On applique les déplacements dans l’ordre.",
      "On part de (4 ; 4). Deux cases à gauche donnent (2 ; 4), puis une case vers le bas donne (2 ; 3).",
      "On arrive en (2 ; 3)."
    ),
    tags: ["cm2", "reperage", "deplacement", "gauche", "bas", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      path: {
        start: { x: 4, y: 4, label: "A", color: "#ef4444" },
        steps: [
          { direction: "gauche", count: 2 },
          { direction: "bas", count: 1 },
        ],
        showArrows: true,
        color: "#8b5cf6",
      },
      target: {
        x: 2,
        y: 3,
        label: "Arrivée",
        hidden: false,
        color: "#f97316",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_deplacement_fixed_6_erreur_direction",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève part de (2 ; 2), va 2 cases à droite, et dit qu’il arrive en (2 ; 4). A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "À droite, c’est la première coordonnée qui change.",
    explanation: exp(
      "Un déplacement vers la droite modifie la coordonnée horizontale.",
      "On ajoute 2 à la première coordonnée, pas à la deuxième.",
      "À partir de (2 ; 2), deux cases à droite donnent (4 ; 2), pas (2 ; 4).",
      "L’élève a tort."
    ),
    tags: ["cm2", "reperage", "deplacement", "erreur", "droite", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      path: {
        start: { x: 2, y: 2, label: "A", color: "#ef4444" },
        steps: [{ direction: "droite", count: 2 }],
        showArrows: true,
        color: "#8b5cf6",
      },
      target: {
        x: 4,
        y: 2,
        label: "vrai",
        hidden: false,
        color: "#f97316",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_deplacement_fixed_7_reunion_margouillat",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 3,
    theme: "reunion",
    text: "Un margouillat part de M(1 ; 1). Il avance 3 cases à droite puis 2 cases vers le haut. Où arrive-t-il ?",
    format: "qcm",
    choices: ["(4 ; 3)", "(3 ; 4)", "(1 ; 3)", "(4 ; 1)"],
    expected: ["(4 ; 3)"],
    comparator: "mcq_exact",
    hint: "À droite, x augmente. En haut, y augmente.",
    explanation: exp(
      "Un déplacement sur quadrillage modifie les coordonnées.",
      "On applique les étapes dans l’ordre.",
      "On part de (1 ; 1). Trois cases à droite donnent (4 ; 1), puis deux cases en haut donnent (4 ; 3).",
      "Le margouillat arrive en (4 ; 3)."
    ),
    tags: ["cm2", "reperage", "deplacement", "reunion", "margouillat", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      path: {
        start: { x: 1, y: 1, label: "M", color: "#ef4444" },
        steps: [
          { direction: "droite", count: 3 },
          { direction: "haut", count: 2 },
        ],
        showArrows: true,
        color: "#8b5cf6",
      },
      target: {
        x: 4,
        y: 3,
        label: "Arrivée",
        hidden: false,
        color: "#f97316",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_deplacement_fixed_8_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver l’arrivée quand on part de (2 ; 3), puis on va 2 cases à droite et 1 case en haut.",
    format: "open",
    expected: ["droite", "haut", "4", "4"],
    comparator: "contains_keyword",
    hint: "À droite, x augmente. En haut, y augmente.",
    explanation: exp(
      "Pour suivre un déplacement, on modifie les coordonnées étape par étape.",
      "On applique chaque déplacement dans l’ordre.",
      "On part de (2 ; 3). Deux cases à droite donnent (4 ; 3), puis une case en haut donne (4 ; 4).",
      "Le point d’arrivée est (4 ; 4)."
    ),
    tags: ["cm2", "reperage", "deplacement", "open", "methode"],
  },

  {
    kind: "template",
    id: "cm2_reperage_deplacement_tpl_1_droite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 2,
    theme: "neutral",
    hint: "Vers la droite, la première coordonnée augmente.",
    tags: ["cm2", "reperage", "deplacement", "droite", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(0, 3);
      const y = randomInt(1, 5);
      const count = randomInt(1, 5 - x);
      const endX = x + count;
      const correct = `(${endX} ; ${y})`;

      return {
        text: `On part de A(${x} ; ${y}) et on va ${count} case(s) à droite. Où arrive-t-on ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${x} ; ${y + count})`,
          `(${Math.max(0, x - count)} ; ${y})`,
          `(${endX} ; ${Math.max(0, y - 1)})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Vers la droite, la coordonnée horizontale augmente.",
          "On ajoute le nombre de cases à la première coordonnée.",
          `On calcule ${x} + ${count} = ${endX}, et y reste ${y}.`,
          `On arrive en ${correct}.`
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          path: {
            start: { x, y, label: "A", color: "#ef4444" },
            steps: [{ direction: "droite", count }],
            showArrows: true,
            color: "#8b5cf6",
          },
          target: {
            x: endX,
            y,
            label: "Arrivée",
            hidden: false,
            color: "#f97316",
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_reperage_deplacement_tpl_2_haut",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 2,
    theme: "neutral",
    hint: "Vers le haut, la deuxième coordonnée augmente.",
    tags: ["cm2", "reperage", "deplacement", "haut", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(0, 3);
      const count = randomInt(1, 5 - y);
      const endY = y + count;
      const correct = `(${x} ; ${endY})`;

      return {
        text: `On part de A(${x} ; ${y}) et on monte de ${count} case(s). Où arrive-t-on ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${x + count} ; ${y})`,
          `(${x} ; ${Math.max(0, y - count)})`,
          `(${Math.max(0, x - 1)} ; ${endY})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Vers le haut, la coordonnée verticale augmente.",
          "On ajoute le nombre de cases à la deuxième coordonnée.",
          `On calcule ${y} + ${count} = ${endY}, et x reste ${x}.`,
          `On arrive en ${correct}.`
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          path: {
            start: { x, y, label: "A", color: "#ef4444" },
            steps: [{ direction: "haut", count }],
            showArrows: true,
            color: "#8b5cf6",
          },
          target: {
            x,
            y: endY,
            label: "Arrivée",
            hidden: false,
            color: "#f97316",
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_reperage_deplacement_tpl_3_mixte",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 3,
    theme: "neutral",
    hint: "Applique les deux déplacements dans l’ordre.",
    tags: ["cm2", "reperage", "deplacement", "mixte", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 3);
      const y = randomInt(1, 3);
      const dx = randomInt(1, 5 - x);
      const dy = randomInt(1, 5 - y);
      const endX = x + dx;
      const endY = y + dy;
      const correct = `(${endX} ; ${endY})`;

      return {
        text: `On part de A(${x} ; ${y}), on va ${dx} case(s) à droite puis ${dy} case(s) en haut. Où arrive-t-on ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${x + dx} ; ${y})`,
          `(${x} ; ${y + dy})`,
          `(${y + dy} ; ${x + dx})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un déplacement mixte peut modifier les deux coordonnées.",
          "On applique les déplacements dans l’ordre.",
          `À droite : x devient ${endX}. En haut : y devient ${endY}.`,
          `On arrive en ${correct}.`
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          path: {
            start: { x, y, label: "A", color: "#ef4444" },
            steps: [
              { direction: "droite", count: dx },
              { direction: "haut", count: dy },
            ],
            showArrows: true,
            color: "#8b5cf6",
          },
          target: {
            x: endX,
            y: endY,
            label: "Arrivée",
            hidden: false,
            color: "#f97316",
          },
        }),
      };
    },
  },
    // ============================================================
  // REPERAGE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_reperage_defi_fixed_1_tresor_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Sur la carte, le trésor est au point T(4 ; 2). Quelles sont ses coordonnées ?",
    format: "qcm",
    choices: ["(4 ; 2)", "(2 ; 4)", "(4 ; 4)", "(2 ; 2)"],
    expected: ["(4 ; 2)"],
    comparator: "mcq_exact",
    hint: "Lis d’abord la position horizontale, puis la position verticale.",
    explanation: exp(
      "Un point sur un quadrillage peut être repéré par ses coordonnées.",
      "On lit d’abord la coordonnée horizontale, puis la coordonnée verticale.",
      "Le trésor T est placé en x = 4 et y = 2.",
      "Les coordonnées du trésor sont (4 ; 2)."
    ),
    tags: ["cm2", "reperage", "defi", "tresor", "coordonnees", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [
        { x: 4, y: 2, label: "T", color: "#f97316" },
        { x: 1, y: 4, label: "A", color: "#38bdf8" },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_defi_fixed_2_chemin_tresor",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On part de A(1 ; 1). On va 3 cases à droite puis 2 cases en haut. Où se trouve le trésor ?",
    format: "qcm",
    choices: ["(4 ; 3)", "(3 ; 4)", "(1 ; 3)", "(4 ; 1)"],
    expected: ["(4 ; 3)"],
    comparator: "mcq_exact",
    hint: "À droite, x augmente. En haut, y augmente.",
    explanation: exp(
      "Un déplacement sur quadrillage se suit étape par étape.",
      "On modifie les coordonnées selon les directions.",
      "Depuis (1 ; 1), 3 cases à droite donnent (4 ; 1), puis 2 cases en haut donnent (4 ; 3).",
      "Le trésor est en (4 ; 3)."
    ),
    tags: ["cm2", "reperage", "defi", "chemin", "tresor", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      path: {
        start: { x: 1, y: 1, label: "A", color: "#ef4444" },
        steps: [
          { direction: "droite", count: 3 },
          { direction: "haut", count: 2 },
        ],
        showArrows: true,
        color: "#8b5cf6",
      },
      target: {
        x: 4,
        y: 3,
        label: "T",
        hidden: false,
        color: "#f97316",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_defi_fixed_3_reunion_plage_volcan",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Sur la carte, la plage est en P(1 ; 2) et le volcan en V(5 ; 4). Quel lieu est le plus à droite ?",
    format: "qcm",
    choices: ["le volcan", "la plage", "ils sont sur la même verticale", "impossible à savoir"],
    expected: ["le volcan"],
    comparator: "mcq_exact",
    hint: "Compare les premières coordonnées.",
    explanation: exp(
      "La première coordonnée indique la position horizontale.",
      "Pour savoir quel point est le plus à droite, on compare les premières coordonnées.",
      "La plage a x = 1 et le volcan a x = 5. Comme 5 est plus grand que 1, le volcan est plus à droite.",
      "Le volcan est le plus à droite."
    ),
    tags: ["cm2", "reperage", "defi", "reunion", "plage", "volcan", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [
        { x: 1, y: 2, label: "P", color: "#38bdf8" },
        { x: 5, y: 4, label: "V", color: "#f97316" },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_defi_fixed_4_plus_haut",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Les points A(2 ; 1), B(4 ; 5) et C(1 ; 3) sont placés. Quel point est le plus haut ?",
    format: "qcm",
    choices: ["A", "B", "C", "aucun"],
    expected: ["B"],
    comparator: "mcq_exact",
    hint: "Compare les deuxièmes coordonnées.",
    explanation: exp(
      "La deuxième coordonnée indique la position verticale.",
      "Pour trouver le point le plus haut, on compare les deuxièmes coordonnées.",
      "A a y = 1, B a y = 5 et C a y = 3. La plus grande valeur est 5.",
      "Le point le plus haut est B."
    ),
    tags: ["cm2", "reperage", "defi", "comparer", "haut", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [
        { x: 2, y: 1, label: "A", color: "#2563eb" },
        { x: 4, y: 5, label: "B", color: "#ef4444" },
        { x: 1, y: 3, label: "C", color: "#16a34a" },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_defi_fixed_5_retour_depart",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On part de A(3 ; 3). On va 2 cases à droite puis 2 cases à gauche. Où arrive-t-on ?",
    format: "qcm",
    choices: ["(3 ; 3)", "(5 ; 3)", "(1 ; 3)", "(3 ; 5)"],
    expected: ["(3 ; 3)"],
    comparator: "mcq_exact",
    hint: "Les deux déplacements horizontaux s’annulent.",
    explanation: exp(
      "Certains déplacements peuvent s’annuler.",
      "On applique les étapes dans l’ordre.",
      "Depuis (3 ; 3), 2 cases à droite donnent (5 ; 3), puis 2 cases à gauche ramènent à (3 ; 3).",
      "On revient au point de départ : (3 ; 3)."
    ),
    tags: ["cm2", "reperage", "defi", "deplacement", "retour", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      path: {
        start: { x: 3, y: 3, label: "A", color: "#ef4444" },
        steps: [
          { direction: "droite", count: 2 },
          { direction: "gauche", count: 2 },
        ],
        showArrows: true,
        color: "#8b5cf6",
      },
      target: {
        x: 3,
        y: 3,
        label: "Arrivée",
        hidden: false,
        color: "#f97316",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_defi_fixed_6_erreur_coordonnees",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : “Le point A(2 ; 5) est plus à droite que le point B(4 ; 1), car 5 est plus grand que 1.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour comparer gauche-droite, regarde la première coordonnée.",
    explanation: exp(
      "La position gauche-droite dépend de la première coordonnée.",
      "On compare les coordonnées horizontales.",
      "A a x = 2 et B a x = 4. Comme 4 est plus grand que 2, B est plus à droite.",
      "L’élève a tort."
    ),
    tags: ["cm2", "reperage", "defi", "erreur", "coordonnees", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [
        { x: 2, y: 5, label: "A", color: "#ef4444" },
        { x: 4, y: 1, label: "B", color: "#2563eb" },
      ],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_defi_fixed_7_open_carte",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Explique comment retrouver un lieu placé en (3 ; 4) sur une carte quadrillée.",
    format: "open",
    expected: ["3", "4", "horizontal", "vertical"],
    comparator: "contains_keyword",
    hint: "Explique l’ordre : d’abord horizontal, puis vertical.",
    explanation: exp(
      "Une carte quadrillée permet de localiser un lieu avec deux coordonnées.",
      "On lit d’abord la position horizontale, puis la position verticale.",
      "Pour (3 ; 4), on va d’abord à x = 3, puis on monte jusqu’à y = 4.",
      "Le lieu est à l’intersection de x = 3 et y = 4."
    ),
    tags: ["cm2", "reperage", "defi", "open", "carte", "reunion", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_reperage_defi_fixed_8_code_secret",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Code secret : A(1 ; 1), B(2 ; 3), C(4 ; 3). Quel point a la même coordonnée verticale que C ?",
    format: "qcm",
    choices: ["B", "A", "aucun", "tous"],
    expected: ["B"],
    comparator: "mcq_exact",
    hint: "Même coordonnée verticale = même deuxième nombre.",
    explanation: exp(
      "La coordonnée verticale est le deuxième nombre du couple.",
      "On compare les deuxièmes coordonnées.",
      "C a y = 3. B a aussi y = 3.",
      "Le point B a la même coordonnée verticale que C."
    ),
    tags: ["cm2", "reperage", "defi", "code_secret", "coordonnees", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [
        { x: 1, y: 1, label: "A", color: "#2563eb" },
        { x: 2, y: 3, label: "B", color: "#16a34a" },
        { x: 4, y: 3, label: "C", color: "#ef4444" },
      ],
    }),
  },

  {
    kind: "template",
    id: "cm2_reperage_defi_tpl_1_chemin_tresor",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Applique les déplacements dans l’ordre.",
    tags: ["cm2", "reperage", "defi", "chemin", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 3);
      const y = randomInt(1, 3);
      const dx = randomInt(1, 5 - x);
      const dy = randomInt(1, 5 - y);
      const endX = x + dx;
      const endY = y + dy;
      const correct = `(${endX} ; ${endY})`;

      return {
        text: `Carte au trésor : on part de A(${x} ; ${y}), on va ${dx} case(s) à droite puis ${dy} case(s) en haut. Où est le trésor ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${x + dx} ; ${y})`,
          `(${x} ; ${y + dy})`,
          `(${endY} ; ${endX})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un chemin sur quadrillage se suit étape par étape.",
          "À droite, x augmente. En haut, y augmente.",
          `x devient ${x} + ${dx} = ${endX} et y devient ${y} + ${dy} = ${endY}.`,
          `Le trésor est en ${correct}.`
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          path: {
            start: { x, y, label: "A", color: "#ef4444" },
            steps: [
              { direction: "droite", count: dx },
              { direction: "haut", count: dy },
            ],
            showArrows: true,
            color: "#8b5cf6",
          },
          target: {
            x: endX,
            y: endY,
            label: "T",
            hidden: false,
            color: "#f97316",
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_reperage_defi_tpl_2_plus_a_droite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour comparer gauche-droite, compare les premières coordonnées.",
    tags: ["cm2", "reperage", "defi", "comparer", "droite", "template", "qcm", "canvas"],
    generate: () => {
      const ax = randomInt(1, 3);
      const bx = randomInt(ax + 1, 5);
      const ay = randomInt(1, 5);
      const by = randomInt(1, 5);

      return {
        text: `A est en (${ax} ; ${ay}) et B est en (${bx} ; ${by}). Quel point est le plus à droite ?`,
        format: "qcm",
        choices: ["A", "B"],
        expected: ["B"],
        comparator: "mcq_exact",
        explanation: exp(
          "La position gauche-droite dépend de la première coordonnée.",
          "On compare les coordonnées horizontales.",
          `A a x = ${ax} et B a x = ${bx}. Comme ${bx} > ${ax}, B est plus à droite.`,
          "Le point le plus à droite est B."
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points: [
            { x: ax, y: ay, label: "A", color: "#2563eb" },
            { x: bx, y: by, label: "B", color: "#ef4444" },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_reperage_defi_tpl_3_plus_haut",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour comparer la hauteur, compare les deuxièmes coordonnées.",
    tags: ["cm2", "reperage", "defi", "comparer", "haut", "template", "qcm", "canvas"],
    generate: () => {
      const ax = randomInt(1, 5);
      const bx = randomInt(1, 5);
      const ay = randomInt(1, 3);
      const by = randomInt(ay + 1, 5);

      return {
        text: `A est en (${ax} ; ${ay}) et B est en (${bx} ; ${by}). Quel point est le plus haut ?`,
        format: "qcm",
        choices: ["A", "B"],
        expected: ["B"],
        comparator: "mcq_exact",
        explanation: exp(
          "La hauteur dépend de la deuxième coordonnée.",
          "On compare les coordonnées verticales.",
          `A a y = ${ay} et B a y = ${by}. Comme ${by} > ${ay}, B est plus haut.`,
          "Le point le plus haut est B."
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points: [
            { x: ax, y: ay, label: "A", color: "#2563eb" },
            { x: bx, y: by, label: "B", color: "#ef4444" },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_reperage_defi_tpl_4_erreur_inverse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Attention à l’ordre des coordonnées.",
    tags: ["cm2", "reperage", "defi", "erreur", "inverse", "template", "qcm", "canvas"],
    generate: () => {
      let x = randomInt(1, 5);
      let y = randomInt(1, 5);
      while (x === y) y = randomInt(1, 5);

      return {
        text: `Un élève veut placer A(${x} ; ${y}), mais il place le point en (${y} ; ${x}). Est-ce correct ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "L’ordre des coordonnées est important.",
          "On écrit d’abord la coordonnée horizontale, puis la coordonnée verticale.",
          `A(${x} ; ${y}) n’est pas la même position que (${y} ; ${x}).`,
          "Le placement n’est pas correct."
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points: [{ x, y, label: "A", color: "#ef4444" }],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_reperage_defi_tpl_5_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Sur une carte, les coordonnées servent à localiser les lieux.",
    tags: ["cm2", "reperage", "defi", "reunion", "carte", "template", "qcm", "canvas"],
    generate: () => {
      const lieux = [
        { label: "Plage", color: "#38bdf8" },
        { label: "Volcan", color: "#f97316" },
        { label: "Marché", color: "#8b5cf6" },
        { label: "École", color: "#16a34a" },
      ];

      const target = randomChoice(lieux);
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      const correct = `(${x} ; ${y})`;

      return {
        text: `Sur la carte de La Réunion, le lieu "${target.label}" est placé en x = ${x} et y = ${y}. Quelles sont ses coordonnées ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${y} ; ${x})`,
          `(${Math.max(0, x - 1)} ; ${y})`,
          `(${x} ; ${Math.max(0, y - 1)})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un lieu sur une carte quadrillée peut être repéré par ses coordonnées.",
          "On écrit d’abord la coordonnée horizontale, puis la coordonnée verticale.",
          `Ici, x = ${x} et y = ${y}.`,
          `Les coordonnées de "${target.label}" sont ${correct}.`
        ),
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points: [{ x, y, label: target.label, color: target.color }],
        }),
      };
    },
  },
];
