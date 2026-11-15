// lib/tutor-v4/question-banks/maths/cm2/reperage.bank.ts
//
// ⭐ 15/11/2026 — Les cinq micros (quadrillage, coordonnées, placer un point,
// déplacement, défi). Ici, les items figés « modèles », repris des exemples de
// la vidéo CM2 (manim/scripts/cm2/reperage.py : A(2 ; 3), B(4 ; 1), le chemin
// « 3 à droite, 2 en haut » depuis (1 ; 1), le trésor en (4 ; 3)) ; les
// gabarits (situations de vie × tournures × nombres, une figure par question :
// cases « C2 » en tableau, nœuds « (3 ; 2) » en repère, plans à l'échelle,
// programmes de déplacement) sont dans reperage-outils.ts.
// Les anciens items (QCM oui/non à deux choix, questions ouvertes, gabarits à
// 1-3 squelettes, 10 à 15 squelettes par micro) ont été retirés.

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
    text: "Pour repérer un point sur un quadrillage, combien de nombres faut-il ?",
    format: "qcm",
    choices: ["2", "1", "3", "4"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "On donne deux coordonnées : x puis y.",
    explanation: "Il faut deux nombres, les coordonnées : d'abord x (l'horizontale →), puis y (la verticale ↑).",
    tags: ["cm2", "reperage", "reperage_quadrillage", "guide", "qcm", "canvas"],
    canvas: reperageCanvas({
      points: [{ x: 2, y: 3, label: "A", color: "#ef4444" }],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_quadrillage_fixed_2_origine",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_quadrillage",
    difficulty: 1,
    theme: "neutral",
    text: "Sur le repère, où se trouve l'origine (0 ; 0) ?",
    format: "qcm",
    choices: ["en bas à gauche", "en haut à gauche", "en bas à droite", "au milieu"],
    expected: ["en bas à gauche"],
    comparator: "mcq_exact",
    hint: "C'est là que les deux axes se croisent.",
    explanation: "L'origine (0 ; 0) est le point de départ des deux axes : en bas à gauche du repère.",
    tags: ["cm2", "reperage", "reperage_quadrillage", "origine", "qcm", "canvas"],
    canvas: reperageCanvas({
      points: [{ x: 0, y: 0, label: "O", color: "#ef4444" }],
    }),
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
    choices: ["(2 ; 3)", "(3 ; 2)", "(2 ; 2)", "(3 ; 4)"],
    expected: ["(2 ; 3)"],
    comparator: "mcq_exact",
    hint: "On lit d'abord x (horizontale), puis y (verticale).",
    explanation: "A est à 2 sur l'axe horizontal (x = 2) et à 3 sur l'axe vertical (y = 3) : A(2 ; 3).",
    tags: ["cm2", "reperage", "reperage_coordonnees", "lire", "qcm", "canvas"],
    canvas: reperageCanvas({
      points: [{ x: 2, y: 3, label: "A", color: "#ef4444" }],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_coordonnees_fixed_2_ordre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Quand on lit les coordonnées d'un point, quel nombre lit-on en premier ?",
    format: "qcm",
    choices: ["x, sur l'axe horizontal", "y, sur l'axe vertical", "le plus grand des deux", "le plus petit des deux"],
    expected: ["x, sur l'axe horizontal"],
    comparator: "mcq_exact",
    hint: "L'ordre est toujours le même : x puis y.",
    explanation: "On lit toujours d'abord x (l'horizontale →), puis y (la verticale ↑).",
    tags: ["cm2", "reperage", "reperage_coordonnees", "guide", "qcm"],
  },

  // ============================================================
  // REPERAGE_PLACER_POINT
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_reperage_placer_point_fixed_1_point_b",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 1,
    theme: "neutral",
    text: "Pour placer B(4 ; 1) depuis l'origine, que fait-on ?",
    format: "qcm",
    choices: [
      "4 vers la droite, puis 1 vers le haut",
      "1 vers la droite, puis 4 vers le haut",
      "4 vers le haut, puis 1 vers la droite",
      "4 vers la droite, puis 1 vers le bas",
    ],
    expected: ["4 vers la droite, puis 1 vers le haut"],
    comparator: "mcq_exact",
    hint: "Le premier nombre (x) fait aller vers la droite, le deuxième (y) fait monter.",
    explanation: "B(4 ; 1) : x = 4, on va de 4 vers la droite ; y = 1, on monte de 1.",
    tags: ["cm2", "reperage", "reperage_placer_point", "modele", "qcm", "canvas"],
    canvas: reperageCanvas({
      points: [{ x: 0, y: 0, label: "O", color: "#94a3b8" }],
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_placer_point_fixed_2_monter",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_placer_point",
    difficulty: 2,
    theme: "neutral",
    text: "Pour placer le point (3 ; 2), on avance de 3 vers la droite, puis on monte de...",
    format: "qcm",
    choices: ["2", "3", "5", "1"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Le 2e nombre (y) dit de combien on monte.",
    explanation: "Le 2e nombre, y = 2, dit de combien on monte : on monte de 2.",
    tags: ["cm2", "reperage", "reperage_placer_point", "guide", "qcm"],
  },

  // ============================================================
  // REPERAGE_DEPLACEMENT
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_reperage_deplacement_fixed_1_chemin_video",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 2,
    theme: "neutral",
    text: "On part de D(1 ; 1). On va 3 carreaux à droite, puis 2 carreaux en haut. Où arrive-t-on ?",
    format: "qcm",
    choices: ["(4 ; 3)", "(3 ; 4)", "(3 ; 2)", "(4 ; 1)"],
    expected: ["(4 ; 3)"],
    comparator: "mcq_exact",
    hint: "À droite : x augmente. En haut : y augmente.",
    explanation: "3 à droite : x passe de 1 à 4. 2 en haut : y passe de 1 à 3. On arrive en (4 ; 3).",
    tags: ["cm2", "reperage", "reperage_deplacement", "modele", "qcm", "canvas"],
    canvas: reperageCanvas({
      path: {
        start: { x: 1, y: 1, label: "D", color: "#ef4444" },
        steps: [
          { direction: "droite", count: 3 },
          { direction: "haut", count: 2 },
        ],
        showArrows: true,
        color: "#8b5cf6",
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_reperage_deplacement_fixed_2_quel_nombre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_deplacement",
    difficulty: 1,
    theme: "neutral",
    text: "Sur un quadrillage, si on va vers la droite, quel nombre change ?",
    format: "qcm",
    choices: ["x, le premier nombre", "y, le deuxième nombre", "les deux nombres", "aucun des deux"],
    expected: ["x, le premier nombre"],
    comparator: "mcq_exact",
    hint: "À droite ou à gauche : c'est l'axe horizontal.",
    explanation: "Aller vers la droite augmente x, le premier nombre (l'axe horizontal). y ne bouge pas.",
    tags: ["cm2", "reperage", "reperage_deplacement", "guide", "qcm"],
  },

  // ============================================================
  // REPERAGE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_reperage_defi_fixed_1_tresor_video",
    niveau: "cm2",
    matiere: "maths",
    notionId: "reperage",
    microId: "reperage_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Défi du trésor : depuis l'origine (0 ; 0), on fait 4 cases à droite, puis 3 en haut. Où est le trésor ?",
    format: "qcm",
    choices: ["(4 ; 3)", "(3 ; 4)", "(7 ; 0)", "(4 ; 0)"],
    expected: ["(4 ; 3)"],
    comparator: "mcq_exact",
    hint: "4 à droite donne x, 3 en haut donne y.",
    explanation: "Depuis (0 ; 0) : 4 à droite, x = 4 ; 3 en haut, y = 3. Le trésor est en (4 ; 3).",
    tags: ["cm2", "reperage", "reperage_defi", "tresor", "qcm", "canvas"],
    canvas: reperageCanvas({
      points: [{ x: 0, y: 0, label: "O", color: "#94a3b8" }],
    }),
  },

  // ⭐ 15/11/2026 — les gabarits des cinq micros (situations × tournures × nombres, figure à chaque fois)
  // vivent dans reperage-outils.ts.
  ...reperageGabarits,
];
