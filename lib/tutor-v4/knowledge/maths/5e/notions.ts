import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  // =========================
  // NOMBRES
  // =========================
  {
    id: "nombres_relatifs",
    label: "Nombres relatifs",
    boId: "BO5N1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "operations_relatifs",
    label: "Opérations sur les nombres relatifs",
    boId: "BO5N1",
    prerequis: ["nombres_relatifs"],
    levels: [1, 2, 3],
  },
  {
    id: "fractions",
    label: "Fractions et nombres rationnels",
    boId: "BO5N2",
    prerequis: [],
    levels: [1, 2, 3],
  },

  // =========================
  // PROPORTIONNALITÉ
  // =========================
  {
    id: "proportionnalite",
    label: "Proportionnalité",
    boId: "BO5P1",
    prerequis: ["fractions"],
    levels: [1, 2, 3],
  },

  // =========================
  // ALGÈBRE
  // =========================
  {
    id: "calcul_litteral",
    label: "Calcul littéral",
    boId: "BO5A1",
    prerequis: ["operations_relatifs"],
    levels: [1, 2, 3],
  },

  // =========================
  // GÉOMÉTRIE PLANE
  // =========================
  {
    id: "angles",
    label: "Angles",
    boId: "BO5G1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "triangles",
    label: "Triangles",
    boId: "BO5G1",
    prerequis: ["angles"],
    levels: [1, 2, 3],
  },
  {
    id: "symetrie_centrale",
    label: "Symétrie centrale",
    boId: "BO5G1",
    prerequis: ["angles"],
    levels: [1, 2],
  },

  // =========================
  // GRANDEURS ET MESURES
  // =========================
  {
    id: "aires",
    label: "Aires",
    boId: "BO5M1",
    prerequis: ["triangles"],
    levels: [1, 2],
  },

  // =========================
  // GÉOMÉTRIE DANS L’ESPACE
  // =========================
  {
    id: "volumes",
    label: "Volumes",
    boId: "BO5G2",
    prerequis: ["aires"],
    levels: [1, 2],
  },

  // =========================
  // DONNÉES
  // =========================
  {
    id: "statistiques",
    label: "Statistiques",
    boId: "BO5D1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "probabilites",
    label: "Probabilités",
    boId: "BO5D2",
    prerequis: ["statistiques"],
    levels: [1, 2],
  },
];