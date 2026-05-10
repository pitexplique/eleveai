// knowledge/maths/6e/notions.ts

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [

  
  // =========================
  // ALGORITHMIQUE
  // =========================

{
  id: "algo_programmation",
  label: "Algorithmique et programmation",
  boId: "BO6I1",
  prerequis: ["entier_calcul_mental"],
  levels: [1, 2, 3],
},
  {
    id: "entier_nombre",
    label: "Nombres entiers",
    boId: "BO6N1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "decimal_nombre",
    label: "Nombres décimaux",
    boId: "BO6N1",
    prerequis: ["entier_nombre"],
    levels: [1, 2, 3],
  },

  {
    id: "fraction_nombre",
    label: "Fractions",
    boId: "BO6N2",
    prerequis: ["decimal_nombre"],
    levels: [1, 2, 3],
  },

  {
    id: "pourcentage_nombre",
    label: "Pourcentages",
    boId: "BO6N2",
    prerequis: ["fraction_nombre"],
    levels: [1, 2, 3],
  },

  {
    id: "prop_proportionnalite",
    label: "Proportionnalité",
    boId: "BO6N3",
    prerequis: ["pourcentage_nombre"],
    levels: [1, 2, 3],
  },

  {
    id: "entier_calcul_pose",
    label: "Calcul posé",
    boId: "BO6N4",
    prerequis: ["entier_nombre"],
    levels: [1, 2, 3],
  },

  {
    id: "entier_calcul_mental",
    label: "Calcul mental",
    boId: "BO6N4",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "aire_longueur",
    label: "Longueurs",
    boId: "BO6G1",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "aire_perimetre",
    label: "Périmètres",
    boId: "BO6G1",
    prerequis: ["aire_longueur"],
    levels: [1, 2],
  },

  {
    id: "aire_surface",
    label: "Aires",
    boId: "BO6G1",
    prerequis: ["aire_perimetre"],
    levels: [1, 2],
  },

  {
    id: "volume_solide",
    label: "Volumes",
    boId: "BO6G1",
    prerequis: ["aire_surface"],
    levels: [1, 2],
  },

  {
    id: "angle_mesure",
    label: "Angles",
    boId: "BO6G2",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "triangle_figure",
    label: "Triangles",
    boId: "BO6G3",
    prerequis: ["angle_mesure"],
    levels: [1, 2, 3],
  },

  {
    id: "quadrilatere_figure",
    label: "Quadrilatères",
    boId: "BO6G4",
    prerequis: ["angle_mesure"],
    levels: [1, 2, 3],
  },

  {
    id: "sym_axiale",
    label: "Symétrie axiale",
    boId: "BO6G4",
    prerequis: ["angle_mesure"],
    levels: [1, 2],
  },

  {
    id: "stat_donnee",
    label: "Données",
    boId: "BO6D1",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "proba_experience",
    label: "Probabilités",
    boId: "BO6P1",
    prerequis: ["stat_donnee"],
    levels: [1, 2],
  },

];