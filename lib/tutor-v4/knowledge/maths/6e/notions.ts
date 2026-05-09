// knowledge/maths/6e/notions.ts

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  {
    id: "nombres_entiers",
    label: "Nombres entiers",
    boId: "BO6N1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "decimaux",
    label: "Nombres décimaux",
    boId: "BO6N1",
    prerequis: ["nombres_entiers"],
    levels: [1, 2, 3],
  },

  {
    id: "fractions",
    label: "Fractions",
    boId: "BO6N2",
    prerequis: ["decimaux"],
    levels: [1, 2, 3],
  },

  {
    id: "pourcentages",
    label: "Pourcentages",
    boId: "BO6N2",
    prerequis: ["fractions"],
    levels: [1, 2, 3],
  },

  {
    id: "proportionnalite",
    label: "Proportionnalité",
    boId: "BO6N3",
    prerequis: ["pourcentages"],
    levels: [1, 2, 3],
  },

  {
    id: "calcul_pose",
    label: "Calcul posé",
    boId: "BO6N4",
    prerequis: ["nombres_entiers"],
    levels: [1, 2, 3],
  },

  {
    id: "calcul_mental",
    label: "Calcul mental",
    boId: "BO6N4",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "longueurs",
    label: "Longueurs",
    boId: "BO6G1",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "perimetres",
    label: "Périmètres",
    boId: "BO6G1",
    prerequis: ["longueurs"],
    levels: [1, 2],
  },

  {
    id: "aires",
    label: "Aires",
    boId: "BO6G1",
    prerequis: ["perimetres"],
    levels: [1, 2],
  },

  {
    id: "volumes",
    label: "Volumes",
    boId: "BO6G1",
    prerequis: ["aires"],
    levels: [1, 2],
  },

  {
    id: "angles",
    label: "Angles",
    boId: "BO6G2",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "triangles",
    label: "Triangles",
    boId: "BO6G3",
    prerequis: ["angles"],
    levels: [1, 2, 3],
  },

  {
    id: "quadrilateres",
    label: "Quadrilatères",
    boId: "BO6G4",
    prerequis: ["angles"],
    levels: [1, 2, 3],
  },

  {
    id: "symetrie",
    label: "Symétrie axiale",
    boId: "BO6G4",
    prerequis: ["angles"],
    levels: [1, 2],
  },

  {
    id: "donnees",
    label: "Données",
    boId: "BO6D1",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "probabilites",
    label: "Probabilités",
    boId: "BO6P1",
    prerequis: ["donnees"],
    levels: [1, 2],
  },

  // =========================
  // ALGORITHMIQUE
  // =========================

{
  id: "algorithmique",
  label: "Algorithmique et programmation",
  boId: "BO6I1",
  prerequis: ["calcul_mental"],
  levels: [1, 2, 3],
},
];