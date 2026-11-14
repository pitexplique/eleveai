// lib/tutor-v4/question-banks/maths/cm1/reperage.bank.ts
//
// ⭐ 14/11/2026 — Les cinq micros (quadrillage, coordonnées, placer un point,
// déplacement, défi) n'ont pas de vidéo. Ici, les items figés « modèles » ;
// les gabarits (situations de vie × tournures × nombres, une figure par
// question : cases « C2 » en tableau, nœuds « (3 ; 2) » en repère) sont dans
// reperage-outils.ts.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { reperageGabarits } from "./reperage-outils";

/* =========================
   HELPERS
========================= */

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
  {
    kind: "fixed",
    id: "cm1_reperage_quadrillage_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 1,
    theme: "neutral",
    text: "Pour repérer un point sur un quadrillage, combien de nombres faut-il ?",
    format: "qcm",
    choices: ["2","1","3","4"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "On donne deux coordonnées.",
    explanation: "Il faut deux nombres, les coordonnées : d'abord l'horizontal, puis le vertical.",
    tags: ["cm1","reperage","reperage_quadrillage","guide","qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_reperage_coordonnees_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Quand on lit les coordonnées d'un point, quel nombre lit-on en premier ?",
    format: "qcm",
    choices: ["le nombre horizontal (gauche-droite)","le nombre vertical (haut-bas)","le plus grand","le plus petit"],
    expected: ["le nombre horizontal (gauche-droite)"],
    comparator: "mcq_exact",
    hint: "L'ordre est toujours le même.",
    explanation: "On lit toujours d'abord l'axe horizontal (gauche-droite), puis l'axe vertical (haut-bas).",
    tags: ["cm1","reperage","reperage_coordonnees","guide","qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_reperage_placer_point_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 2,
    theme: "neutral",
    text: "Pour placer le point (3 ; 2), on avance de 3, puis on monte de...",
    format: "qcm",
    choices: ["2","3","5","1"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Le 2e nombre indique de combien on monte.",
    explanation: "Le 2e nombre (2) dit de combien on monte : on monte de 2.",
    tags: ["cm1","reperage","reperage_placer_point","guide","qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_reperage_deplacement_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un quadrillage, si on va vers la droite, quel nombre augmente ?",
    format: "qcm",
    choices: ["le nombre horizontal","le nombre vertical","les deux","aucun"],
    expected: ["le nombre horizontal"],
    comparator: "mcq_exact",
    hint: "À droite ou à gauche : c'est l'axe horizontal.",
    explanation: "Aller vers la droite augmente le 1er nombre, celui de l'axe horizontal.",
    tags: ["cm1","reperage","reperage_deplacement","guide","qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_reperage_defi_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur une carte au trésor quadrillée, le trésor est en (4 ; 4). En partant de (0 ; 0), de combien de cases avance-t-on vers la droite ?",
    format: "qcm",
    choices: ["4","0","8","2"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Regarde le 1er nombre des coordonnées.",
    explanation: "Le 1er nombre (4) donne le déplacement horizontal : 4 cases vers la droite.",
    tags: ["cm1","reperage","reperage_defi","guide","qcm"],
  },

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

  // ⭐ 14/11/2026 — les gabarits des cinq micros (situations × tournures × nombres, figure à chaque fois)
  // vivent dans reperage-outils.ts. Les anciens gabarits (1 à 3 squelettes chacun, questions ouvertes,
  // QCM à deux choix) ont été retirés.
  ...reperageGabarits,
];
