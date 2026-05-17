// lib/tutor-v4/question-banks/maths/cm1/reperage.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

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
  return shuffle([correct, ...wrongs])
    .filter((choice, index, arr) => arr.indexOf(choice) === index)
    .slice(0, 4);
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
  // Se repérer sur un quadrillage
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_reperage_quadrillage_fixed_001_definition",
    niveau: "cm1",
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
      "à calculer une durée",
      "à peser un objet",
    ],
    expected: ["à se repérer plus facilement"],
    comparator: "mcq_exact",
    hint: "Un quadrillage aide à retrouver une position.",
    explanation:
      "Un quadrillage est formé de lignes et de colonnes. " +
      "Il permet de repérer une case, un point ou un chemin. " +
      "C’est comme une petite carte organisée.",
    tags: ["cm1", "reperage", "quadrillage", "definition", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [{ x: 2, y: 3, label: "A", color: "#ef4444" }],
    }),
  },

  {
    kind: "template",
    id: "cm1_reperage_quadrillage_tpl_001_lignes_colonnes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 1,
    theme: "neutral",
    hint: "Les lignes sont horizontales. Les colonnes sont verticales.",
    tags: ["cm1", "reperage", "quadrillage", "lignes", "colonnes", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Dans un quadrillage, les lignes sont plutôt...",
          correct: "horizontales",
          wrongs: ["verticales", "rondes", "invisibles"],
          explanation:
            "Les lignes vont de gauche à droite. Elles sont horizontales.",
        },
        {
          text: "Dans un quadrillage, les colonnes sont plutôt...",
          correct: "verticales",
          wrongs: ["horizontales", "rondes", "effacées"],
          explanation:
            "Les colonnes vont de haut en bas. Elles sont verticales.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_quadrillage_tpl_002_position_globale_gauche_droite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 1,
    theme: "neutral",
    hint: "Observe si le point est plutôt près du bord gauche ou du bord droit.",
    tags: ["cm1", "reperage", "quadrillage", "position", "gauche_droite", "template", "canvas"],
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
        explanation:
          "Pour lire une position globale, on observe où se trouve le point sur le quadrillage. " +
          `Ici, le point A est placé plutôt vers la ${side}.`,
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
    id: "cm1_reperage_quadrillage_tpl_003_position_globale_haut_bas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 1,
    theme: "neutral",
    hint: "Observe si le point est plutôt vers le haut ou vers le bas.",
    tags: ["cm1", "reperage", "quadrillage", "position", "haut_bas", "template", "canvas"],
    generate: () => {
      const side = randomChoice(["haut", "bas"] as const);
      const y = side === "bas" ? randomChoice([0, 1]) : randomChoice([4, 5]);
      const x = randomInt(1, 4);

      return {
        text: "Sur le quadrillage, le point A est-il plutôt en haut ou en bas ?",
        format: "qcm",
        choices: ["en haut", "en bas"],
        expected: [side === "haut" ? "en haut" : "en bas"],
        comparator: "mcq_exact",
        explanation:
          "Pour lire une position globale, on observe si le point est vers le haut ou vers le bas du quadrillage. " +
          `Ici, le point A est placé plutôt ${side === "haut" ? "en haut" : "en bas"}.`,
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
    id: "cm1_reperage_quadrillage_tpl_004_axe_horizontal_vertical",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 1,
    theme: "neutral",
    hint: "Horizontal : gauche-droite. Vertical : haut-bas.",
    tags: ["cm1", "reperage", "quadrillage", "axes", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "L’axe horizontal permet surtout de repérer...",
          correct: "la position gauche-droite",
          wrongs: [
            "la position haut-bas",
            "la masse d’un objet",
            "la contenance d’une bouteille",
          ],
          explanation:
            "Horizontal veut dire de gauche à droite. L’axe horizontal aide donc à lire la position gauche-droite.",
        },
        {
          text: "L’axe vertical permet surtout de repérer...",
          correct: "la position haut-bas",
          wrongs: [
            "la position gauche-droite",
            "la durée d’une activité",
            "la masse d’un objet",
          ],
          explanation:
            "Vertical veut dire de bas en haut ou de haut en bas. L’axe vertical aide donc à lire la position haut-bas.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_quadrillage_tpl_005_point_intersection",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 2,
    theme: "neutral",
    hint: "Un point se place souvent au croisement de deux lignes.",
    tags: ["cm1", "reperage", "quadrillage", "point", "intersection", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);

      return {
        text: "Sur un quadrillage, un point repéré par deux coordonnées se place souvent...",
        format: "qcm",
        choices: makeChoices("à l’intersection de deux lignes", [
          "toujours au milieu d’une case",
          "sur une seule ligne au hasard",
          "en dehors du quadrillage",
        ]),
        expected: ["à l’intersection de deux lignes"],
        comparator: "mcq_exact",
        explanation:
          "Un point repéré par des coordonnées se place au croisement d’une position horizontale et d’une position verticale. " +
          "Ce croisement est une intersection.",
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
    id: "cm1_reperage_quadrillage_tpl_006_carte_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 2,
    theme: "reunion",
    hint: "Une carte quadrillée aide à localiser des lieux.",
    tags: ["cm1", "reperage", "quadrillage", "reunion", "carte", "template", "qcm", "canvas"],
    generate: () => {
      const lieux = [
        { x: 1, y: 1, label: "Plage", color: "#38bdf8" },
        { x: 4, y: 4, label: "Volcan", color: "#f97316" },
        { x: 2, y: 3, label: "École", color: "#16a34a" },
      ];

      return {
        text: "Sur une carte simplifiée de La Réunion en quadrillage, à quoi sert le quadrillage ?",
        format: "qcm",
        choices: makeChoices("à localiser un lieu", [
          "à peser un fruit",
          "à mesurer une durée",
          "à calculer automatiquement une division",
        ]),
        expected: ["à localiser un lieu"],
        comparator: "mcq_exact",
        explanation:
          "Une carte quadrillée permet de repérer plus facilement des lieux. " +
          "On peut retrouver une plage, une école ou un volcan grâce aux lignes et aux colonnes.",
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points: lieux,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_quadrillage_tpl_007_erreur_un_seul_nombre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour repérer précisément un point, on utilise souvent deux informations.",
    tags: ["cm1", "reperage", "quadrillage", "erreur", "coordonnees", "template", "qcm"],
    generate: () => {
      return {
        text: "Un élève dit : “Sur un quadrillage, un seul nombre suffit toujours pour repérer un point.” A-t-il raison ?",
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève n’a pas raison. " +
          "Pour repérer précisément un point sur un quadrillage, on utilise souvent deux informations : " +
          "une position horizontale et une position verticale.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_quadrillage_tpl_008_open_expliquer_quadrillage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise les mots lignes, colonnes ou position.",
    tags: ["cm1", "reperage", "quadrillage", "open", "expliquer", "template"],
    generate: () => {
      return {
        text: "Explique avec tes mots à quoi sert un quadrillage.",
        format: "open",
        expected: ["lignes", "colonnes", "repérer"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : un quadrillage sert à se repérer. " +
          "Il est formé de lignes et de colonnes. " +
          "Grâce à lui, on peut retrouver la position d’un point, d’une case ou d’un lieu.",
      };
    },
  },
    // ============================================================
  // REPERAGE_COORDONNEES
  // Lire les coordonnées d’un point
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_reperage_coordonnees_fixed_001_lire_point_a",
    niveau: "cm1",
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
    hint: "On lit d’abord horizontalement, puis verticalement.",
    explanation:
      "Les coordonnées permettent de repérer précisément un point. " +
      "On lit d’abord la position horizontale, puis la position verticale. " +
      "Ici, le point A est placé à x = 2 et y = 3. " +
      "Ses coordonnées sont donc (2 ; 3).",
    tags: ["cm1", "reperage", "coordonnees", "lire", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [{ x: 2, y: 3, label: "A", color: "#ef4444" }],
    }),
  },

  {
    kind: "template",
    id: "cm1_reperage_coordonnees_tpl_001_lire_point_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 1,
    theme: "neutral",
    hint: "Lis d’abord la coordonnée horizontale, puis la coordonnée verticale.",
    tags: ["cm1", "reperage", "coordonnees", "lire", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      const correct = `(${x} ; ${y})`;

      return {
        text: "Quelles sont les coordonnées du point A ?",
        format: "qcm",
        choices: makeChoices(correct, [
          `(${y} ; ${x})`,
          `(${Math.max(1, x - 1)} ; ${y})`,
          `(${x} ; ${Math.max(1, y - 1)})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Pour lire les coordonnées d’un point, on respecte l’ordre. " +
          "On lit d’abord la position horizontale, puis la position verticale. " +
          `Ici, le point A est en x = ${x} et y = ${y}. ` +
          `Ses coordonnées sont ${correct}.`,
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
    id: "cm1_reperage_coordonnees_tpl_002_lire_point_lettre_variable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 1,
    theme: "neutral",
    hint: "Le nom du point peut changer, mais la méthode reste la même.",
    tags: ["cm1", "reperage", "coordonnees", "lettre", "template", "qcm", "canvas"],
    generate: () => {
      const label = randomChoice(["A", "B", "C", "M", "P"]);
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      const correct = `${label}(${x} ; ${y})`;

      return {
        text: `Le point ${label} est placé en x = ${x} et y = ${y}. Quelle écriture est correcte ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${label}(${y} ; ${x})`,
          `${label}(${x} ; ${Math.max(1, y - 1)})`,
          `${label}(${Math.max(1, x - 1)} ; ${y})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Pour écrire les coordonnées d’un point, on écrit le nom du point puis les deux coordonnées. " +
          "La première coordonnée est horizontale. La deuxième est verticale. " +
          `Ici, on écrit donc ${correct}.`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points: [{ x, y, label, color: "#ef4444" }],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_coordonnees_tpl_003_ordre_horizontal_vertical",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans (x ; y), le premier nombre indique la position horizontale.",
    tags: ["cm1", "reperage", "coordonnees", "ordre", "template", "qcm"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);

      return {
        text: `Dans les coordonnées (${x} ; ${y}), le nombre ${x} indique...`,
        format: "qcm",
        choices: makeChoices("la position horizontale", [
          "la position verticale",
          "la couleur du point",
          "le nom du point",
        ]),
        expected: ["la position horizontale"],
        comparator: "mcq_exact",
        explanation:
          "Dans un couple de coordonnées, le premier nombre indique la position horizontale. " +
          `Dans (${x} ; ${y}), le nombre ${x} se lit donc sur l’axe horizontal.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_coordonnees_tpl_004_ordre_vertical",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans (x ; y), le deuxième nombre indique la position verticale.",
    tags: ["cm1", "reperage", "coordonnees", "ordre", "vertical", "template", "qcm"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);

      return {
        text: `Dans les coordonnées (${x} ; ${y}), le nombre ${y} indique...`,
        format: "qcm",
        choices: makeChoices("la position verticale", [
          "la position horizontale",
          "la couleur du point",
          "le nombre de colonnes",
        ]),
        expected: ["la position verticale"],
        comparator: "mcq_exact",
        explanation:
          "Dans un couple de coordonnées, le deuxième nombre indique la position verticale. " +
          `Dans (${x} ; ${y}), le nombre ${y} se lit donc sur l’axe vertical.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_coordonnees_tpl_005_piege_inverse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention : (x ; y) n’est pas la même chose que (y ; x).",
    tags: ["cm1", "reperage", "coordonnees", "inverse", "erreur", "template", "qcm", "canvas"],
    generate: () => {
      let x = randomInt(1, 5);
      let y = randomInt(1, 5);
      while (x === y) {
        y = randomInt(1, 5);
      }

      return {
        text: `Le point A est en (${x} ; ${y}). Un élève écrit A(${y} ; ${x}). A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève a inversé les deux coordonnées. " +
          "L’ordre est important : on lit d’abord la position horizontale, puis la position verticale. " +
          `A(${x} ; ${y}) et A(${y} ; ${x}) ne désignent pas le même point.`,
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
    id: "cm1_reperage_coordonnees_tpl_006_plusieurs_points",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère d’abord le bon point, puis lis ses coordonnées.",
    tags: ["cm1", "reperage", "coordonnees", "plusieurs_points", "template", "qcm", "canvas"],
    generate: () => {
      const points = [
        { x: 1, y: 2, label: "A", color: "#2563eb" },
        { x: 4, y: 1, label: "B", color: "#16a34a" },
        { x: 3, y: 4, label: "C", color: "#ef4444" },
      ];

      const target = randomChoice(points);
      const correct = `(${target.x} ; ${target.y})`;

      return {
        text: `Quelles sont les coordonnées du point ${target.label} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${target.y} ; ${target.x})`,
          `(${Math.max(1, target.x - 1)} ; ${target.y})`,
          `(${target.x} ; ${Math.max(1, target.y - 1)})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Quand plusieurs points sont placés, il faut d’abord repérer le bon point. " +
          "Ensuite, on lit sa coordonnée horizontale puis sa coordonnée verticale. " +
          `Le point ${target.label} est en x = ${target.x} et y = ${target.y}. ` +
          `Ses coordonnées sont ${correct}.`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_coordonnees_tpl_007_reunion_lieux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 2,
    theme: "reunion",
    hint: "Sur une carte quadrillée, les coordonnées permettent de localiser un lieu.",
    tags: ["cm1", "reperage", "coordonnees", "reunion", "carte", "template", "qcm", "canvas"],
    generate: () => {
      const lieux = [
        { x: 1, y: 1, label: "Plage", color: "#38bdf8" },
        { x: 4, y: 4, label: "Volcan", color: "#f97316" },
        { x: 2, y: 3, label: "École", color: "#16a34a" },
        { x: 5, y: 2, label: "Marché", color: "#8b5cf6" },
      ];

      const target = randomChoice(lieux);
      const correct = `(${target.x} ; ${target.y})`;

      return {
        text: `Sur la carte quadrillée de La Réunion, quelles sont les coordonnées du lieu "${target.label}" ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${target.y} ; ${target.x})`,
          `(${Math.max(1, target.x - 1)} ; ${target.y})`,
          `(${target.x} ; ${Math.max(1, target.y - 1)})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Une carte quadrillée permet de repérer un lieu avec deux coordonnées. " +
          "On lit d’abord la position horizontale, puis la position verticale. " +
          `"${target.label}" est en ${correct}.`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points: lieux,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_coordonnees_tpl_008_point_cache",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point mystère est défini par ses deux coordonnées.",
    tags: ["cm1", "reperage", "coordonnees", "point_cache", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      const correct = `(${x} ; ${y})`;

      return {
        text: `Le point mystère M est placé avec x = ${x} et y = ${y}. Quelles sont ses coordonnées ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${y} ; ${x})`,
          `(${x} ; ${Math.max(1, y - 1)})`,
          `(${Math.max(1, x - 1)} ; ${y})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Les coordonnées s’écrivent dans l’ordre : d’abord x, puis y. " +
          `Ici, x = ${x} et y = ${y}. ` +
          `Les coordonnées du point M sont donc ${correct}.`,
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
    id: "cm1_reperage_coordonnees_tpl_009_open_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique l’ordre : horizontal puis vertical.",
    tags: ["cm1", "reperage", "coordonnees", "open", "methode", "template"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);

      return {
        text: `Explique comment lire les coordonnées d’un point comme A(${x} ; ${y}).`,
        format: "open",
        expected: ["horizontal", "vertical", "premier", "deuxième"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : on lit d’abord la position horizontale, puis la position verticale. " +
          `Dans A(${x} ; ${y}), le premier nombre ${x} indique la position horizontale. ` +
          `Le deuxième nombre ${y} indique la position verticale.`,
      };
    },
  },
    // ============================================================
  // REPERAGE_PLACER_POINT
  // Placer un point à partir de ses coordonnées
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_reperage_placer_point_fixed_001_modele",
    niveau: "cm1",
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
      "sur x = 2 seulement",
      "sur y = 3 seulement",
    ],
    expected: ["à l’intersection de x = 2 et y = 3"],
    comparator: "mcq_exact",
    hint: "On lit d’abord la coordonnée horizontale, puis la coordonnée verticale.",
    explanation:
      "Pour placer un point, on utilise ses deux coordonnées. " +
      "Dans A(2 ; 3), le premier nombre 2 indique la position horizontale. " +
      "Le deuxième nombre 3 indique la position verticale. " +
      "Il faut donc placer A à l’intersection de x = 2 et y = 3.",
    tags: ["cm1", "reperage", "placer_point", "coordonnees", "modele", "qcm", "canvas"],
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
    kind: "template",
    id: "cm1_reperage_placer_point_tpl_001_position_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 1,
    theme: "neutral",
    hint: "Dans (x ; y), on place d’abord x, puis y.",
    tags: ["cm1", "reperage", "placer_point", "coordonnees", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      const correct = `x = ${x} et y = ${y}`;

      return {
        text: `Où faut-il placer le point A(${x} ; ${y}) ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `x = ${y} et y = ${x}`,
          `x = ${x} seulement`,
          `y = ${y} seulement`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Pour placer un point, on utilise ses deux coordonnées. " +
          `Dans A(${x} ; ${y}), on lit d’abord x = ${x}, puis y = ${y}. ` +
          `Il faut donc placer le point à l’intersection de x = ${x} et y = ${y}.`,
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
    id: "cm1_reperage_placer_point_tpl_002_lettre_variable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 1,
    theme: "neutral",
    hint: "La lettre du point change, mais la méthode reste la même.",
    tags: ["cm1", "reperage", "placer_point", "lettre", "template", "qcm", "canvas"],
    generate: () => {
      const label = randomChoice(["A", "B", "C", "M", "P", "T"]);
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);

      return {
        text: `Le point ${label} doit être placé en (${x} ; ${y}). Quelle position faut-il choisir ?`,
        format: "qcm",
        choices: makeChoices(`x = ${x} et y = ${y}`, [
          `x = ${y} et y = ${x}`,
          `x = ${x} et y = ${Math.max(1, y - 1)}`,
          `x = ${Math.max(1, x - 1)} et y = ${y}`,
        ]),
        expected: [`x = ${x} et y = ${y}`],
        comparator: "mcq_exact",
        explanation:
          "Les coordonnées indiquent la position du point. " +
          `Pour ${label}(${x} ; ${y}), la première coordonnée est ${x} et la deuxième est ${y}. ` +
          `On place donc ${label} à x = ${x} et y = ${y}.`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          target: {
            x,
            y,
            label,
            hidden: false,
            color: "#f97316",
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_placer_point_tpl_003_point_mystere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 2,
    theme: "neutral",
    hint: "Le point mystère se place à l’intersection des deux coordonnées.",
    tags: ["cm1", "reperage", "placer_point", "mystere", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      const correct = `(${x} ; ${y})`;

      return {
        text: `Le point mystère M doit être placé avec x = ${x} et y = ${y}. Quelles sont ses coordonnées ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${y} ; ${x})`,
          `(${x} ; ${Math.max(1, y - 1)})`,
          `(${Math.max(1, x - 1)} ; ${y})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Les coordonnées s’écrivent sous la forme (x ; y). " +
          `Ici, x = ${x} et y = ${y}. ` +
          `Les coordonnées du point mystère sont donc ${correct}.`,
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
    id: "cm1_reperage_placer_point_tpl_004_piege_inverse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention : on ne lit pas les coordonnées dans n’importe quel ordre.",
    tags: ["cm1", "reperage", "placer_point", "inverse", "erreur", "template", "qcm", "canvas"],
    generate: () => {
      let x = randomInt(1, 5);
      let y = randomInt(1, 5);
      while (x === y) {
        y = randomInt(1, 5);
      }

      return {
        text:
          `Pour placer A(${x} ; ${y}), un élève va d’abord à ${y}, puis à ${x}. ` +
          `A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève inverse les coordonnées. " +
          `Pour A(${x} ; ${y}), il faut d’abord aller à x = ${x}, puis à y = ${y}. ` +
          `Aller d’abord à ${y}, puis à ${x}, correspondrait plutôt à A(${y} ; ${x}).`,
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
    id: "cm1_reperage_placer_point_tpl_005_choisir_point_parmi_plusieurs",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le point qui est placé à la bonne intersection.",
    tags: ["cm1", "reperage", "placer_point", "plusieurs_points", "template", "qcm", "canvas"],
    generate: () => {
      const points = [
        { x: 1, y: 1, label: "A", color: "#2563eb" },
        { x: 4, y: 2, label: "B", color: "#16a34a" },
        { x: 3, y: 4, label: "C", color: "#ef4444" },
        { x: 2, y: 3, label: "D", color: "#8b5cf6" },
      ];

      const target = randomChoice(points);
      const correct = target.label;

      return {
        text: `Quel point correspond aux coordonnées (${target.x} ; ${target.y}) ?`,
        format: "qcm",
        choices: ["A", "B", "C", "D"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Pour reconnaître un point à partir de ses coordonnées, on cherche la bonne intersection. " +
          `Ici, il faut trouver x = ${target.x} et y = ${target.y}. ` +
          `Le point correspondant est ${correct}.`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_placer_point_tpl_006_reunion_carte_lieu",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 2,
    theme: "reunion",
    hint: "Sur une carte quadrillée, les coordonnées indiquent où placer un lieu.",
    tags: ["cm1", "reperage", "placer_point", "reunion", "carte", "template", "qcm", "canvas"],
    generate: () => {
      const lieux = [
        { label: "Plage", color: "#38bdf8" },
        { label: "Volcan", color: "#f97316" },
        { label: "École", color: "#16a34a" },
        { label: "Marché", color: "#8b5cf6" },
        { label: "Cascade", color: "#0ea5e9" },
      ];

      const lieu = randomChoice(lieux);
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);

      return {
        text:
          `Sur une carte quadrillée de La Réunion, le lieu "${lieu.label}" doit être placé en (${x} ; ${y}). ` +
          `Quelle position faut-il choisir ?`,
        format: "qcm",
        choices: makeChoices(`x = ${x} et y = ${y}`, [
          `x = ${y} et y = ${x}`,
          `x = ${x} seulement`,
          `y = ${y} seulement`,
        ]),
        expected: [`x = ${x} et y = ${y}`],
        comparator: "mcq_exact",
        explanation:
          "Une carte quadrillée permet de placer un lieu grâce à ses coordonnées. " +
          `Pour (${x} ; ${y}), on lit d’abord x = ${x}, puis y = ${y}. ` +
          `"${lieu.label}" doit donc être placé à cette intersection.`,
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

  {
    kind: "template",
    id: "cm1_reperage_placer_point_tpl_007_tresor_cache",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 3,
    theme: "reunion",
    hint: "Le trésor est placé à l’intersection donnée par les coordonnées.",
    tags: ["cm1", "reperage", "placer_point", "tresor", "reunion", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);

      return {
        text:
          `Sur une carte au trésor, le trésor T est en (${x} ; ${y}). ` +
          `Où faut-il le placer ?`,
        format: "qcm",
        choices: makeChoices(`à l’intersection de x = ${x} et y = ${y}`, [
          `à l’intersection de x = ${y} et y = ${x}`,
          `sur x = ${x} seulement`,
          `sur y = ${y} seulement`,
        ]),
        expected: [`à l’intersection de x = ${x} et y = ${y}`],
        comparator: "mcq_exact",
        explanation:
          "Le trésor est repéré par deux coordonnées. " +
          `T(${x} ; ${y}) signifie x = ${x} et y = ${y}. ` +
          "Il faut donc placer le trésor à l’intersection correspondante.",
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          target: {
            x,
            y,
            label: "T",
            hidden: false,
            color: "#f97316",
          },
          points: [
            { x: 1, y: 1, label: "Plage", color: "#38bdf8" },
            { x: 5, y: 5, label: "Volcan", color: "#ef4444" },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_placer_point_tpl_008_open_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique l’ordre : d’abord horizontal, puis vertical.",
    tags: ["cm1", "reperage", "placer_point", "open", "methode", "template"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);

      return {
        text: `Explique comment placer le point A(${x} ; ${y}) sur un quadrillage.`,
        format: "open",
        expected: ["horizontal", "vertical", String(x), String(y)],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : pour placer un point, je lis d’abord la première coordonnée sur l’axe horizontal. " +
          `Pour A(${x} ; ${y}), je vais à x = ${x}. ` +
          `Ensuite, je lis la deuxième coordonnée sur l’axe vertical : y = ${y}. ` +
          "Je place le point à l’intersection.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_placer_point_tpl_009_open_corriger_inverse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique que l’ordre des deux coordonnées est important.",
    tags: ["cm1", "reperage", "placer_point", "open", "erreur", "inverse", "template"],
    generate: () => {
      let x = randomInt(1, 5);
      let y = randomInt(1, 5);
      while (x === y) {
        y = randomInt(1, 5);
      }

      return {
        text:
          `Un élève veut placer A(${x} ; ${y}), mais il place le point en (${y} ; ${x}). ` +
          `Corrige son erreur.`,
        format: "open",
        expected: ["horizontal", "vertical", "inverse"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : l’élève a inversé les coordonnées. " +
          `Pour A(${x} ; ${y}), il faut d’abord lire ${x} horizontalement, puis ${y} verticalement. ` +
          `Le point (${y} ; ${x}) n’est pas au même endroit.`,
      };
    },
  },
    // ============================================================
  // REPERAGE_DEPLACEMENT
  // Suivre un déplacement sur quadrillage
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_reperage_deplacement_fixed_001_droite_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 1,
    theme: "neutral",
    text: "On part de A(1 ; 2), puis on va 2 cases à droite. Où arrive-t-on ?",
    format: "qcm",
    choices: ["(3 ; 2)", "(1 ; 4)", "(2 ; 3)", "(3 ; 4)"],
    expected: ["(3 ; 2)"],
    comparator: "mcq_exact",
    hint: "Vers la droite, la première coordonnée augmente.",
    explanation:
      "Quand on va vers la droite, la coordonnée horizontale augmente. " +
      "On part de A(1 ; 2). " +
      "Après 2 cases à droite, la première coordonnée devient 3 et la deuxième reste 2. " +
      "On arrive donc en (3 ; 2).",
    tags: ["cm1", "reperage", "deplacement", "droite", "modele", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      path: {
        start: { x: 1, y: 2, label: "A", color: "#ef4444" },
        steps: [{ direction: "droite", count: 2 }],
        showArrows: true,
        color: "#8b5cf6",
      },
      target: {
        x: 3,
        y: 2,
        label: "Arrivée",
        hidden: false,
        color: "#f97316",
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_reperage_deplacement_tpl_001_droite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 1,
    theme: "neutral",
    hint: "À droite, x augmente. y ne change pas.",
    tags: ["cm1", "reperage", "deplacement", "droite", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 3);
      const y = randomInt(1, 5);
      const count = randomInt(1, 5 - x);
      const endX = x + count;
      const correct = `(${endX} ; ${y})`;

      return {
        text: `On part de A(${x} ; ${y}) et on va ${count} case(s) à droite. Où arrive-t-on ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${x} ; ${Math.min(5, y + count)})`,
          `(${Math.max(1, x - count)} ; ${y})`,
          `(${endX} ; ${Math.max(1, y - 1)})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Un déplacement vers la droite modifie la position horizontale. " +
          `On part de (${x} ; ${y}). ` +
          `On ajoute ${count} à la première coordonnée : ${x} + ${count} = ${endX}. ` +
          `La deuxième coordonnée reste ${y}. On arrive en ${correct}.`,
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
    id: "cm1_reperage_deplacement_tpl_002_gauche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 1,
    theme: "neutral",
    hint: "À gauche, x diminue. y ne change pas.",
    tags: ["cm1", "reperage", "deplacement", "gauche", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(3, 5);
      const y = randomInt(1, 5);
      const count = randomInt(1, x - 1);
      const endX = x - count;
      const correct = `(${endX} ; ${y})`;

      return {
        text: `On part de A(${x} ; ${y}) et on va ${count} case(s) à gauche. Où arrive-t-on ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${x + count > 5 ? 5 : x + count} ; ${y})`,
          `(${x} ; ${Math.min(5, y + count)})`,
          `(${endX} ; ${Math.max(1, y - 1)})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Un déplacement vers la gauche modifie la position horizontale. " +
          `On part de (${x} ; ${y}). ` +
          `On enlève ${count} à la première coordonnée : ${x} - ${count} = ${endX}. ` +
          `La deuxième coordonnée reste ${y}. On arrive en ${correct}.`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          path: {
            start: { x, y, label: "A", color: "#ef4444" },
            steps: [{ direction: "gauche", count }],
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
    id: "cm1_reperage_deplacement_tpl_003_haut",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 1,
    theme: "neutral",
    hint: "Vers le haut, y augmente. x ne change pas.",
    tags: ["cm1", "reperage", "deplacement", "haut", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 3);
      const count = randomInt(1, 5 - y);
      const endY = y + count;
      const correct = `(${x} ; ${endY})`;

      return {
        text: `On part de A(${x} ; ${y}) et on monte de ${count} case(s). Où arrive-t-on ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${Math.min(5, x + count)} ; ${y})`,
          `(${x} ; ${Math.max(1, y - count)})`,
          `(${Math.max(1, x - 1)} ; ${endY})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Un déplacement vers le haut modifie la position verticale. " +
          `On part de (${x} ; ${y}). ` +
          `On ajoute ${count} à la deuxième coordonnée : ${y} + ${count} = ${endY}. ` +
          `La première coordonnée reste ${x}. On arrive en ${correct}.`,
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
    id: "cm1_reperage_deplacement_tpl_004_bas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 1,
    theme: "neutral",
    hint: "Vers le bas, y diminue. x ne change pas.",
    tags: ["cm1", "reperage", "deplacement", "bas", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(3, 5);
      const count = randomInt(1, y - 1);
      const endY = y - count;
      const correct = `(${x} ; ${endY})`;

      return {
        text: `On part de A(${x} ; ${y}) et on descend de ${count} case(s). Où arrive-t-on ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${Math.min(5, x + count)} ; ${y})`,
          `(${x} ; ${Math.min(5, y + count)})`,
          `(${Math.max(1, x - 1)} ; ${endY})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Un déplacement vers le bas modifie la position verticale. " +
          `On part de (${x} ; ${y}). ` +
          `On enlève ${count} à la deuxième coordonnée : ${y} - ${count} = ${endY}. ` +
          `La première coordonnée reste ${x}. On arrive en ${correct}.`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          path: {
            start: { x, y, label: "A", color: "#ef4444" },
            steps: [{ direction: "bas", count }],
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
    id: "cm1_reperage_deplacement_tpl_005_mixte_droite_haut",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 2,
    theme: "neutral",
    hint: "Applique les deux déplacements dans l’ordre.",
    tags: ["cm1", "reperage", "deplacement", "mixte", "droite", "haut", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 3);
      const y = randomInt(1, 3);
      const dx = randomInt(1, 5 - x);
      const dy = randomInt(1, 5 - y);
      const endX = x + dx;
      const endY = y + dy;
      const correct = `(${endX} ; ${endY})`;

      return {
        text:
          `On part de A(${x} ; ${y}), on va ${dx} case(s) à droite puis ${dy} case(s) en haut. ` +
          `Où arrive-t-on ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${endX} ; ${y})`,
          `(${x} ; ${endY})`,
          `(${endY} ; ${endX})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "On applique les déplacements dans l’ordre. " +
          `On part de (${x} ; ${y}). ` +
          `À droite, x devient ${endX}. ` +
          `En haut, y devient ${endY}. ` +
          `On arrive donc en ${correct}.`,
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

  {
    kind: "template",
    id: "cm1_reperage_deplacement_tpl_006_mixte_gauche_bas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 2,
    theme: "neutral",
    hint: "À gauche, x diminue. En bas, y diminue.",
    tags: ["cm1", "reperage", "deplacement", "mixte", "gauche", "bas", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(3, 5);
      const y = randomInt(3, 5);
      const dx = randomInt(1, x - 1);
      const dy = randomInt(1, y - 1);
      const endX = x - dx;
      const endY = y - dy;
      const correct = `(${endX} ; ${endY})`;

      return {
        text:
          `On part de A(${x} ; ${y}), on va ${dx} case(s) à gauche puis ${dy} case(s) vers le bas. ` +
          `Où arrive-t-on ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${x + dx > 5 ? 5 : x + dx} ; ${endY})`,
          `(${endX} ; ${y + dy > 5 ? 5 : y + dy})`,
          `(${endY} ; ${endX})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "On applique les déplacements dans l’ordre. " +
          `On part de (${x} ; ${y}). ` +
          `À gauche, x devient ${endX}. ` +
          `Vers le bas, y devient ${endY}. ` +
          `On arrive donc en ${correct}.`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          path: {
            start: { x, y, label: "A", color: "#ef4444" },
            steps: [
              { direction: "gauche", count: dx },
              { direction: "bas", count: dy },
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

  {
    kind: "template",
    id: "cm1_reperage_deplacement_tpl_007_erreur_droite_vertical",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 2,
    theme: "neutral",
    hint: "À droite, c’est la première coordonnée qui change.",
    tags: ["cm1", "reperage", "deplacement", "erreur", "droite", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 3);
      const y = randomInt(1, 4);
      const count = randomInt(1, 5 - x);
      const correctX = x + count;

      return {
        text:
          `Un élève part de (${x} ; ${y}), va ${count} case(s) à droite, ` +
          `et dit qu’il arrive en (${x} ; ${Math.min(5, y + count)}). A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève modifie la mauvaise coordonnée. " +
          "Quand on va à droite, c’est la première coordonnée qui augmente. " +
          `On part de (${x} ; ${y}) et on ajoute ${count} à x. ` +
          `On arrive en (${correctX} ; ${y}).`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          path: {
            start: { x, y, label: "Départ", color: "#ef4444" },
            steps: [{ direction: "droite", count }],
            showArrows: true,
            color: "#8b5cf6",
          },
          target: {
            x: correctX,
            y,
            label: "Vrai",
            hidden: false,
            color: "#f97316",
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_deplacement_tpl_008_reunion_margouillat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 3,
    theme: "reunion",
    hint: "Suis le déplacement étape par étape.",
    tags: ["cm1", "reperage", "deplacement", "reunion", "margouillat", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 2);
      const y = randomInt(1, 2);
      const dx = randomInt(1, 5 - x);
      const dy = randomInt(1, 5 - y);
      const endX = x + dx;
      const endY = y + dy;
      const correct = `(${endX} ; ${endY})`;

      return {
        text:
          `Un margouillat part de M(${x} ; ${y}). ` +
          `Il avance ${dx} case(s) à droite puis ${dy} case(s) vers le haut. ` +
          `Où arrive-t-il ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${endY} ; ${endX})`,
          `(${endX} ; ${y})`,
          `(${x} ; ${endY})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "On suit le chemin du margouillat étape par étape. " +
          `Il part de (${x} ; ${y}). ` +
          `Après ${dx} case(s) à droite, x devient ${endX}. ` +
          `Après ${dy} case(s) vers le haut, y devient ${endY}. ` +
          `Il arrive en ${correct}.`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          path: {
            start: { x, y, label: "M", color: "#ef4444" },
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

  {
    kind: "template",
    id: "cm1_reperage_deplacement_tpl_009_open_methode_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique quelle coordonnée change.",
    tags: ["cm1", "reperage", "deplacement", "open", "methode", "template"],
    generate: () => {
      const x = randomInt(1, 3);
      const y = randomInt(1, 5);
      const count = randomInt(1, 5 - x);
      const endX = x + count;

      return {
        text:
          `On part de A(${x} ; ${y}) et on va ${count} case(s) à droite. ` +
          `On arrive en (${endX} ; ${y}). Explique pourquoi.`,
        format: "open",
        expected: ["droite", "horizontal", String(endX)],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : quand on va à droite, la coordonnée horizontale augmente. " +
          `On part de x = ${x}. On ajoute ${count}, donc x devient ${endX}. ` +
          `La coordonnée verticale reste ${y}. On arrive en (${endX} ; ${y}).`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_deplacement_tpl_010_open_corriger_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique que droite/gauche modifient x, haut/bas modifient y.",
    tags: ["cm1", "reperage", "deplacement", "open", "erreur", "template"],
    generate: () => {
      const x = randomInt(1, 3);
      const y = randomInt(1, 4);
      const count = randomInt(1, 5 - x);
      const correct = `(${x + count} ; ${y})`;
      const wrong = `(${x} ; ${Math.min(5, y + count)})`;

      return {
        text:
          `Un élève part de (${x} ; ${y}), va ${count} case(s) à droite et répond ${wrong}. ` +
          `Corrige son erreur.`,
        format: "open",
        expected: ["droite", "horizontal", "x"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : l’élève a modifié la coordonnée verticale, mais il fallait modifier la coordonnée horizontale. " +
          `Quand on va à droite, x augmente. ` +
          `On arrive donc en ${correct}, pas en ${wrong}.`,
      };
    },
  },
    // ============================================================
  // REPERAGE_DEFI
  // Résoudre un défi de repérage
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_reperage_defi_fixed_001_tresor_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur la carte au trésor, le trésor est au point T(4 ; 2). Quelles sont ses coordonnées ?",
    format: "qcm",
    choices: ["(4 ; 2)", "(2 ; 4)", "(4 ; 4)", "(2 ; 2)"],
    expected: ["(4 ; 2)"],
    comparator: "mcq_exact",
    hint: "Lis d’abord la position horizontale, puis la position verticale.",
    explanation:
      "Pour lire les coordonnées d’un point, on respecte l’ordre : horizontal puis vertical. " +
      "Le trésor T est placé en x = 4 et y = 2. " +
      "Ses coordonnées sont donc (4 ; 2).",
    tags: ["cm1", "reperage", "defi", "tresor", "coordonnees", "reunion", "qcm", "canvas"],
    canvas: reperageCanvas({
      rows: 5,
      cols: 5,
      points: [
        { x: 4, y: 2, label: "T", color: "#f97316" },
        { x: 1, y: 4, label: "Plage", color: "#38bdf8" },
      ],
    }),
  },

  {
    kind: "template",
    id: "cm1_reperage_defi_tpl_001_tresor_coordonnees",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Attention à l’ordre : x puis y.",
    tags: ["cm1", "reperage", "defi", "tresor", "coordonnees", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      const correct = `(${x} ; ${y})`;

      return {
        text: `Sur une carte au trésor de La Réunion, le trésor T est placé en x = ${x} et y = ${y}. Quelles sont ses coordonnées ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${y} ; ${x})`,
          `(${Math.max(1, x - 1)} ; ${y})`,
          `(${x} ; ${Math.max(1, y - 1)})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Les coordonnées s’écrivent dans l’ordre : d’abord la position horizontale, puis la position verticale. " +
          `Ici, x = ${x} et y = ${y}. ` +
          `Le trésor est donc en ${correct}.`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points: [
            { x, y, label: "T", color: "#f97316" },
            { x: 1, y: 1, label: "Plage", color: "#38bdf8" },
            { x: 5, y: 5, label: "Volcan", color: "#ef4444" },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_defi_tpl_002_chemin_tresor",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis le chemin étape par étape.",
    tags: ["cm1", "reperage", "defi", "chemin", "tresor", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 3);
      const y = randomInt(1, 3);
      const dx = randomInt(1, 5 - x);
      const dy = randomInt(1, 5 - y);
      const endX = x + dx;
      const endY = y + dy;
      const correct = `(${endX} ; ${endY})`;

      return {
        text:
          `On part de A(${x} ; ${y}). ` +
          `On va ${dx} case(s) à droite puis ${dy} case(s) en haut. ` +
          `Où se trouve le trésor ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${endY} ; ${endX})`,
          `(${endX} ; ${y})`,
          `(${x} ; ${endY})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "On suit le chemin dans l’ordre. " +
          `On part de (${x} ; ${y}). ` +
          `Après ${dx} case(s) à droite, x devient ${endX}. ` +
          `Après ${dy} case(s) en haut, y devient ${endY}. ` +
          `Le trésor est en ${correct}.`,
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
    id: "cm1_reperage_defi_tpl_003_margouillat_chemin",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Le margouillat suit les flèches dans l’ordre.",
    tags: ["cm1", "reperage", "defi", "margouillat", "reunion", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(2, 5);
      const y = randomInt(2, 5);
      const dx = randomInt(1, x - 1);
      const dy = randomInt(1, y - 1);
      const endX = x - dx;
      const endY = y - dy;
      const correct = `(${endX} ; ${endY})`;

      return {
        text:
          `Un margouillat part de M(${x} ; ${y}). ` +
          `Il va ${dx} case(s) à gauche puis ${dy} case(s) vers le bas. ` +
          `Où arrive-t-il ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${x + dx > 5 ? 5 : x + dx} ; ${endY})`,
          `(${endX} ; ${y + dy > 5 ? 5 : y + dy})`,
          `(${endY} ; ${endX})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "On suit le déplacement du margouillat étape par étape. " +
          `Il part de (${x} ; ${y}). ` +
          `À gauche, x diminue : ${x} - ${dx} = ${endX}. ` +
          `Vers le bas, y diminue : ${y} - ${dy} = ${endY}. ` +
          `Il arrive en ${correct}.`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          path: {
            start: { x, y, label: "M", color: "#ef4444" },
            steps: [
              { direction: "gauche", count: dx },
              { direction: "bas", count: dy },
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

  {
    kind: "template",
    id: "cm1_reperage_defi_tpl_004_retrouver_depart",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour retrouver le départ, fais le chemin inverse.",
    tags: ["cm1", "reperage", "defi", "depart", "inverse", "template", "qcm", "canvas"],
    generate: () => {
      const startX = randomInt(1, 3);
      const startY = randomInt(1, 3);
      const dx = randomInt(1, 5 - startX);
      const dy = randomInt(1, 5 - startY);
      const endX = startX + dx;
      const endY = startY + dy;
      const correct = `(${startX} ; ${startY})`;

      return {
        text:
          `On arrive en (${endX} ; ${endY}) après avoir avancé de ${dx} case(s) à droite et ${dy} case(s) en haut. ` +
          `Quel était le point de départ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${endX} ; ${startY})`,
          `(${startX} ; ${endY})`,
          `(${endY} ; ${endX})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Pour retrouver le départ, on fait le chemin inverse. " +
          `Si on a avancé de ${dx} case(s) à droite, on recule de ${dx} sur x. ` +
          `Si on a monté de ${dy} case(s), on descend de ${dy} sur y. ` +
          `Le départ était donc en ${correct}.`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          path: {
            start: { x: startX, y: startY, label: "Départ", color: "#ef4444" },
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

  {
    kind: "template",
    id: "cm1_reperage_defi_tpl_005_erreur_inverse_coordonnees",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention : (x ; y) et (y ; x) ne désignent pas le même point.",
    tags: ["cm1", "reperage", "defi", "erreur", "coordonnees", "inverse", "template", "qcm", "canvas"],
    generate: () => {
      let x = randomInt(1, 5);
      let y = randomInt(1, 5);
      while (x === y) {
        y = randomInt(1, 5);
      }

      return {
        text:
          `Un élève veut placer un trésor en T(${x} ; ${y}), mais il le place en T(${y} ; ${x}). ` +
          `A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève a inversé les coordonnées. " +
          `T(${x} ; ${y}) signifie x = ${x} et y = ${y}. ` +
          `T(${y} ; ${x}) n’est pas le même point. ` +
          "L’ordre des coordonnées est donc très important.",
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          target: {
            x,
            y,
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
    id: "cm1_reperage_defi_tpl_006_erreur_deplacement",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "À droite, x change. En haut, y change.",
    tags: ["cm1", "reperage", "defi", "erreur", "deplacement", "template", "qcm", "canvas"],
    generate: () => {
      const x = randomInt(1, 3);
      const y = randomInt(1, 3);
      const dx = randomInt(1, 5 - x);
      const dy = randomInt(1, 5 - y);
      const correct = `(${x + dx} ; ${y + dy})`;
      const wrong = `(${x + dy} ; ${y + dx})`;

      return {
        text:
          `On part de (${x} ; ${y}), on va ${dx} case(s) à droite puis ${dy} case(s) en haut. ` +
          `Un élève répond ${wrong}. A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève mélange les deux déplacements. " +
          `À droite, on ajoute ${dx} à x. En haut, on ajoute ${dy} à y. ` +
          `Le bon point d’arrivée est ${correct}.`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          path: {
            start: { x, y, label: "Départ", color: "#ef4444" },
            steps: [
              { direction: "droite", count: dx },
              { direction: "haut", count: dy },
            ],
            showArrows: true,
            color: "#8b5cf6",
          },
          target: {
            x: x + dx,
            y: y + dy,
            label: "Vrai",
            hidden: false,
            color: "#f97316",
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_defi_tpl_007_plusieurs_lieux_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Repère le bon lieu, puis lis ses coordonnées.",
    tags: ["cm1", "reperage", "defi", "reunion", "carte", "lieux", "template", "qcm", "canvas"],
    generate: () => {
      const lieux = [
        { x: 1, y: 1, label: "Plage", color: "#38bdf8" },
        { x: 5, y: 5, label: "Volcan", color: "#ef4444" },
        { x: 2, y: 4, label: "Cascade", color: "#0ea5e9" },
        { x: 4, y: 2, label: "Marché", color: "#8b5cf6" },
      ];

      const target = randomChoice(lieux);
      const correct = `(${target.x} ; ${target.y})`;

      return {
        text: `Sur la carte quadrillée de La Réunion, quelles sont les coordonnées du lieu "${target.label}" ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${target.y} ; ${target.x})`,
          `(${Math.max(1, target.x - 1)} ; ${target.y})`,
          `(${target.x} ; ${Math.max(1, target.y - 1)})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "On repère d’abord le lieu demandé, puis on lit ses coordonnées. " +
          `Pour "${target.label}", on lit x = ${target.x} puis y = ${target.y}. ` +
          `Ses coordonnées sont ${correct}.`,
        canvas: reperageCanvas({
          rows: 5,
          cols: 5,
          points: lieux,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_defi_tpl_008_open_chemin",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique chaque étape du déplacement.",
    tags: ["cm1", "reperage", "defi", "open", "chemin", "template"],
    generate: () => {
      const x = randomInt(1, 3);
      const y = randomInt(1, 3);
      const dx = randomInt(1, 5 - x);
      const dy = randomInt(1, 5 - y);
      const endX = x + dx;
      const endY = y + dy;

      return {
        text:
          `On part de (${x} ; ${y}), on va ${dx} case(s) à droite puis ${dy} case(s) en haut. ` +
          `On arrive en (${endX} ; ${endY}). Explique pourquoi.`,
        format: "open",
        expected: ["droite", "haut", String(endX), String(endY)],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : quand on va à droite, la première coordonnée augmente. " +
          `On part de x = ${x} et on ajoute ${dx}, donc x devient ${endX}. ` +
          "Quand on va en haut, la deuxième coordonnée augmente. " +
          `On part de y = ${y} et on ajoute ${dy}, donc y devient ${endY}.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_reperage_defi_tpl_009_open_corriger_inverse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique que l’ordre horizontal puis vertical est important.",
    tags: ["cm1", "reperage", "defi", "open", "erreur", "inverse", "template"],
    generate: () => {
      let x = randomInt(1, 5);
      let y = randomInt(1, 5);
      while (x === y) {
        y = randomInt(1, 5);
      }

      return {
        text:
          `Un élève lit le point A(${x} ; ${y}) comme si c’était A(${y} ; ${x}). ` +
          `Corrige son erreur.`,
        format: "open",
        expected: ["horizontal", "vertical", "inverse"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : l’élève a inversé l’ordre des coordonnées. " +
          `Dans A(${x} ; ${y}), on lit d’abord ${x} sur l’axe horizontal, puis ${y} sur l’axe vertical. ` +
          `A(${y} ; ${x}) serait un autre point.`,
      };
    },
  },
];
