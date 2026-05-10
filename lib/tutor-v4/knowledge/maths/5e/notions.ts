import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [

    // =========================
  // ALGORITHME
  // =========================
{
  id: "algo_programmation",
  label: "Algorithmique et programmation",
  boId: "BO5I1",
  prerequis: ["litteral_calcul", "prop_proportionnalite"],
  levels: [1, 2, 3],
},

  // =========================
  // NOMBRES
  // =========================
  {
    id: "relatif_nombre",
    label: "Nombres relatifs",
    boId: "BO5N1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "relatif_operation",
    label: "Opérations sur les nombres relatifs",
    boId: "BO5N1",
    prerequis: ["relatif_nombre"],
    levels: [1, 2, 3],
  },
  {
    id: "fraction_nombre",
    label: "Fractions et nombres rationnels",
    boId: "BO5N2",
    prerequis: [],
    levels: [1, 2, 3],
  },

  // =========================
  // PROPORTIONNALITÉ
  // =========================
  {
    id: "prop_proportionnalite",
    label: "Proportionnalité",
    boId: "BO5P1",
    prerequis: ["fraction_nombre"],
    levels: [1, 2, 3],
  },

  // =========================
  // ALGÈBRE
  // =========================
  {
    id: "litteral_calcul",
    label: "Calcul littéral",
    boId: "BO5A1",
    prerequis: ["relatif_operation"],
    levels: [1, 2, 3],
  },

  // =========================
  // GÉOMÉTRIE PLANE
  // =========================
  {
    id: "angle_mesure",
    label: "Angles",
    boId: "BO5G1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "triangle_figure",
    label: "Triangles",
    boId: "BO5G1",
    prerequis: ["angle_mesure"],
    levels: [1, 2, 3],
  },
  {
    id: "sym_centrale",
    label: "Symétrie centrale",
    boId: "BO5G1",
    prerequis: ["angle_mesure"],
    levels: [1, 2],
  },

  // =========================
  // GRANDEURS ET MESURES
  // =========================
  {
    id: "aire_surface",
    label: "Aires",
    boId: "BO5M1",
    prerequis: ["triangle_figure"],
    levels: [1, 2],
  },

  // =========================
  // GÉOMÉTRIE DANS L’ESPACE
  // =========================
  {
    id: "volume_solide",
    label: "Volumes",
    boId: "BO5G2",
    prerequis: ["aire_surface"],
    levels: [1, 2],
  },

  // =========================
  // DONNÉES
  // =========================
  {
    id: "stat_statistique",
    label: "Statistiques",
    boId: "BO5D1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "proba_experience",
    label: "Probabilités",
    boId: "BO5D2",
    prerequis: ["stat_statistique"],
    levels: [1, 2],
  },

];