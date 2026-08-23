// Notions de mathématiques pour la classe de CM2.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  // ============================================================
  // NOMBRES, CALCULS ET PROBLÈMES
  // ============================================================

  {
    id: "nombre_entier",
    label: "Nombres entiers",
    boId: "BOCM2N1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "suite",
    label: "Suites de nombres",
    boId: "BOCM2N1",
    prerequis: ["nombre_entier"],
    levels: [1, 2],
  },
  {
    id: "multiplication",
    label: "Multiplication",
    boId: "BOCM2N2",
    prerequis: ["nombre_entier"],
    levels: [1, 2, 3],
  },
  {
    id: "division",
    label: "Division",
    boId: "BOCM2N2",
    prerequis: ["multiplication"],
    levels: [1, 2, 3],
  },
  {
    id: "fraction",
    label: "Fractions",
    boId: "BOCM2N3",
    prerequis: ["division"],
    levels: [1, 2, 3],
  },
  // ⛔ OUVERTE LE 23/08/2026 — TROIS TROUS DU PROGRAMME, UN SEUL SUJET
  // (cm2-N-fractions-2, -3 et -4). « Fractions » s'arrêtait à lire, représenter,
  // comparer : rien n'y traitait les fractions PLUS GRANDES QUE 1, alors que le
  // programme de CM2 en fait trois objectifs.
  //
  // ⭐ TOUT REPOSE SUR d/d = 1, et c'est la table de multiplication qui fait le
  // travail : 58/7 = 56/7 + 2/7 = 8 + 2/7. L'obstacle n'est pas technique, c'est
  // la croyance « une fraction, c'est plus petit que 1 » — vraie tant qu'on
  // partageait une pizza, fausse dès qu'on en a deux.
  {
    id: "fraction_mixte",
    label: "Fractions supérieures à 1",
    boId: "BOCM2N3",
    prerequis: ["fraction"],
    levels: [1, 2, 3],
  },

  {
    id: "nombre_decimal",
    label: "Nombres décimaux",
    boId: "BOCM2N3",
    prerequis: ["fraction"],
    levels: [1, 2, 3],
  },
  {
    id: "calcul",
    label: "Calculs",
    boId: "BOCM2N2",
    prerequis: ["nombre_entier", "nombre_decimal"],
    levels: [1, 2, 3],
  },
  {
    id: "probleme",
    label: "Problèmes",
    boId: "BOCM2N2",
    prerequis: ["calcul"],
    levels: [1, 2, 3],
  },

  // ============================================================
  // ALGÈBRE
  // ============================================================

  {
    id: "algebre",
    label: "Algèbre",
    boId: "BOCM2A1",
    prerequis: ["calcul", "probleme"],
    levels: [1, 2, 3],
  },

  // ============================================================
  // PROPORTIONNALITÉ
  // ============================================================

  {
    id: "proportionnalite",
    label: "Proportionnalité",
    boId: "BOCM2P1",
    prerequis: ["multiplication", "division"],
    levels: [1, 2, 3],
  },
  {
    id: "pourcentage",
    label: "Pourcentages simples",
    boId: "BOCM2P1",
    prerequis: ["fraction", "proportionnalite"],
    levels: [1, 2],
  },
  {
    id: "echelle",
    label: "Échelles simples",
    boId: "BOCM2P1",
    prerequis: ["proportionnalite", "longueur"],
    levels: [2, 3],
  },

  // ============================================================
  // GRANDEURS ET MESURES
  // ============================================================

  {
    id: "longueur",
    label: "Longueurs",
    boId: "BOCM2M1",
    prerequis: ["nombre_decimal"],
    levels: [1, 2],
  },
  {
    id: "masse",
    label: "Masses",
    boId: "BOCM2M1",
    prerequis: ["nombre_decimal"],
    levels: [1, 2],
  },
  {
    id: "contenance",
    label: "Contenances",
    boId: "BOCM2M1",
    prerequis: ["nombre_decimal"],
    levels: [1, 2],
  },
  {
    id: "duree",
    label: "Durées",
    boId: "BOCM2M1",
    prerequis: ["nombre_entier"],
    levels: [1, 2],
  },
  {
    id: "perimetre",
    label: "Périmètres",
    boId: "BOCM2M1",
    prerequis: ["longueur"],
    levels: [1, 2, 3],
  },
  {
    id: "aire",
    label: "Aires",
    boId: "BOCM2M1",
    prerequis: ["longueur", "multiplication"],
    levels: [1, 2, 3],
  },
  {
    id: "angle",
    label: "Angles",
    boId: "BOCM2M1",
    prerequis: ["droite"],
    levels: [1, 2],
  },

  // ============================================================
  // ESPACE ET GÉOMÉTRIE
  // ============================================================

  {
    id: "reperage",
    label: "Repérage",
    boId: "BOCM2G1",
    prerequis: ["nombre_entier"],
    levels: [1, 2],
  },
  {
    id: "droite",
    label: "Droites",
    boId: "BOCM2G1",
    prerequis: ["reperage"],
    levels: [1, 2],
  },
  {
    id: "symetrie",
    label: "Symétrie",
    boId: "BOCM2G1",
    prerequis: ["droite"],
    levels: [1, 2],
  },
  {
    id: "figure_plane",
    label: "Figures planes",
    boId: "BOCM2G1",
    prerequis: ["droite", "angle"],
    levels: [1, 2, 3],
  },
  {
    id: "solide",
    label: "Solides",
    boId: "BOCM2G2",
    prerequis: ["figure_plane"],
    levels: [1, 2],
  },

  // ============================================================
  // DONNÉES ET PROBABILITÉS
  // ============================================================

  {
    id: "tableau",
    label: "Tableaux",
    boId: "BOCM2D1",
    prerequis: ["nombre_entier"],
    levels: [1, 2],
  },
  {
    id: "graphique",
    label: "Graphiques et diagrammes",
    boId: "BOCM2D1",
    prerequis: ["tableau"],
    levels: [1, 2],
  },
  {
    id: "probabilite",
    label: "Probabilités simples",
    boId: "BOCM2D2",
    prerequis: ["tableau"],
    levels: [1, 2],
  },

  // ============================================================
  // PENSÉE INFORMATIQUE ET ALGORITHMIQUE
  // ============================================================

  {
    id: "algorithmique",
    label: "Algorithmique",
    boId: "BOCM2I1",
    prerequis: ["reperage"],
    levels: [1, 2, 3],
  },
];