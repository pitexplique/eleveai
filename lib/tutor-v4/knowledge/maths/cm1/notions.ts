// Notions de mathématiques pour la classe de CM1.
// Référence : programme officiel cycle 3, BO n°16 du 17 avril 2025.

// lib/tutor-v4/knowledge/maths/cm1/notions.ts

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  // ============================================================
  // NOMBRES, CALCULS ET PROBLÈMES
  // ============================================================

  {
    id: "nombre_entier",
    label: "Nombres entiers",
    boId: "BOCM1N1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "suite",
    label: "Suites de nombres",
    boId: "BOCM1N1",
    prerequis: ["nombre_entier"],
    levels: [1, 2],
  },
  {
    id: "tables_multiplication",
    label: "Tables de multiplication",
    boId: "BOCM1N2",
    prerequis: ["nombre_entier"],
    levels: [1, 2, 3],
  },
  {
    id: "multiplication",
    label: "Multiplication",
    boId: "BOCM1N2",
    prerequis: ["tables_multiplication"],
    levels: [1, 2, 3],
  },
  {
    id: "division",
    label: "Division",
    boId: "BOCM1N2",
    prerequis: ["multiplication"],
    levels: [1, 2],
  },
  {
    id: "fraction",
    label: "Fractions",
    boId: "BOCM1N3",
    prerequis: ["division"],
    levels: [1, 2, 3],
  },
  {
    id: "nombre_decimal",
    label: "Nombres décimaux",
    boId: "BOCM1N3",
    prerequis: ["fraction"],
    levels: [1, 2],
  },
  {
    id: "calcul",
    label: "Calculs",
    boId: "BOCM1N2",
    prerequis: ["nombre_entier", "nombre_decimal", "multiplication"],
    levels: [1, 2, 3],
  },
  {
    id: "probleme",
    label: "Problèmes",
    boId: "BOCM1N2",
    prerequis: ["calcul"],
    levels: [1, 2, 3],
  },

  // ============================================================
  // ALGÈBRE
  // ============================================================

  {
    id: "algebre",
    label: "Algèbre",
    boId: "BOCM1A1",
    prerequis: ["calcul", "probleme"],
    levels: [1, 2],
  },

  // ============================================================
  // PROPORTIONNALITÉ
  // ============================================================

  {
    id: "proportionnalite",
    label: "Proportionnalité",
    boId: "BOCM1P1",
    prerequis: ["multiplication", "division"],
    levels: [1, 2],
  },

  // ============================================================
  // GRANDEURS ET MESURES
  // ============================================================

  {
    id: "longueur",
    label: "Longueurs",
    boId: "BOCM1M1",
    prerequis: ["nombre_decimal"],
    levels: [1, 2],
  },
  {
    id: "masse",
    label: "Masses",
    boId: "BOCM1M1",
    prerequis: ["nombre_decimal"],
    levels: [1, 2],
  },
  {
    id: "contenance",
    label: "Contenances",
    boId: "BOCM1M1",
    prerequis: ["nombre_decimal"],
    levels: [1, 2],
  },
  {
    id: "duree",
    label: "Durées",
    boId: "BOCM1M1",
    prerequis: ["nombre_entier"],
    levels: [1, 2],
  },
  {
    id: "perimetre",
    label: "Périmètres",
    boId: "BOCM1M1",
    prerequis: ["longueur"],
    levels: [1, 2],
  },
  {
    id: "aire",
    label: "Aires",
    boId: "BOCM1M1",
    prerequis: ["longueur", "multiplication"],
    levels: [1, 2],
  },
  {
    id: "angle",
    label: "Angles",
    boId: "BOCM1M1",
    prerequis: ["droite"],
    levels: [1, 2],
  },

  // ============================================================
  // ESPACE ET GÉOMÉTRIE
  // ============================================================

  {
    id: "reperage",
    label: "Repérage",
    boId: "BOCM1G1",
    prerequis: ["nombre_entier"],
    levels: [1, 2],
  },
  {
    id: "droite",
    label: "Droites",
    boId: "BOCM1G1",
    prerequis: ["reperage"],
    levels: [1, 2],
  },
  {
    id: "symetrie",
    label: "Symétrie",
    boId: "BOCM1G1",
    prerequis: ["droite"],
    levels: [1, 2],
  },
  {
    id: "figure_plane",
    label: "Figures planes",
    boId: "BOCM1G1",
    prerequis: ["droite", "angle"],
    levels: [1, 2],
  },
  {
    id: "solide",
    label: "Solides",
    boId: "BOCM1G2",
    prerequis: ["figure_plane"],
    levels: [1, 2],
  },

  // ============================================================
  // DONNÉES ET PROBABILITÉS
  // ============================================================

  {
    id: "tableau",
    label: "Tableaux",
    boId: "BOCM1D1",
    prerequis: ["nombre_entier"],
    levels: [1, 2],
  },
  {
    id: "graphique",
    label: "Graphiques et diagrammes",
    boId: "BOCM1D1",
    prerequis: ["tableau"],
    levels: [1, 2],
  },
  {
    id: "probabilite",
    label: "Probabilités simples",
    boId: "BOCM1D2",
    prerequis: ["tableau"],
    levels: [1, 2],
  },

  // ============================================================
  // PENSÉE INFORMATIQUE ET ALGORITHMIQUE
  // ============================================================

  {
    id: "algorithmique",
    label: "Algorithmique",
    boId: "BOCM1I1",
    prerequis: ["reperage"],
    levels: [1, 2],
  },
];