// knowledge/maths/4e/notions.ts
//
// Notions de mathématiques pour la classe de 4e.
// Ce fichier est aligné avec la structure 5e, tout en raffinant
// davantage l’algèbre, qui devient un bloc central en 4e.
//
// Choix retenu :
// - conserver un BO simple et stable ;
// - découper l’algèbre en plusieurs notions distinctes ;
// - séparer clairement périmètres, aires et parallélogrammes ;
// - améliorer la finesse du suivi pédagogique dans Tutor V4.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  // =========================
  // NOMBRES
  // =========================
  {
    id: "operations_relatifs",
    label: "Opérations sur les nombres relatifs",
    boId: "BO4N1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "fractions",
    label: "Fractions et nombres rationnels",
    boId: "BO4N2",
    prerequis: ["operations_relatifs"],
    levels: [1, 2, 3],
  },

  // =========================
  // PROPORTIONNALITÉ
  // =========================
  {
    id: "proportionnalite",
    label: "Proportionnalité",
    boId: "BO4P1",
    prerequis: ["fractions"],
    levels: [1, 2, 3],
  },

  // =========================
  // ALGÈBRE
  // =========================
  {
    id: "expressions_litterales",
    label: "Expressions littérales",
    boId: "BO4A1",
    prerequis: ["operations_relatifs"],
    levels: [1, 2, 3],
  },
  {
    id: "distributivite",
    label: "Distributivité",
    boId: "BO4A1",
    prerequis: ["expressions_litterales"],
    levels: [1, 2, 3],
  },
  {
    id: "identites_remarquables",
    label: "Identités remarquables",
    boId: "BO4A1",
    prerequis: ["distributivite"],
    levels: [1, 2, 3],
  },
  {
    id: "factorisation",
    label: "Factorisation",
    boId: "BO4A1",
    prerequis: ["distributivite", "identites_remarquables"],
    levels: [1, 2, 3],
  },
  {
    id: "equations",
    label: "Équations",
    boId: "BO4A1",
    prerequis: ["expressions_litterales", "distributivite"],
    levels: [1, 2, 3],
  },

  // =========================
  // GÉOMÉTRIE PLANE
  // =========================
  {
    id: "triangles",
    label: "Triangles",
    boId: "BO4G1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "pythagore",
    label: "Pythagore et sa réciproque",
    boId: "BO4G1",
    prerequis: ["triangles"],
    levels: [1, 2, 3],
  },
  {
    id: "parallelogrammes",
    label: "Parallélogrammes",
    boId: "BO4G1",
    prerequis: ["triangles"],
    levels: [1, 2, 3],
  },
  {
    id: "transformations",
    label: "Transformations (symétrie, translation, rotation)",
    boId: "BO4G1",
    prerequis: ["triangles"],
    levels: [1, 2],
  },

  // =========================
  // GRANDEURS ET MESURES
  // =========================
  {
    id: "perimetres",
    label: "Périmètres",
    boId: "BO4M1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "aires",
    label: "Aires",
    boId: "BO4M1",
    prerequis: ["perimetres"],
    levels: [1, 2, 3],
  },

  // =========================
  // GÉOMÉTRIE DANS L’ESPACE
  // =========================
  {
    id: "volumes",
    label: "Volumes",
    boId: "BO4G2",
    prerequis: ["aires"],
    levels: [1, 2],
  },

  // =========================
  // DONNÉES
  // =========================
  {
    id: "statistiques",
    label: "Statistiques",
    boId: "BO4D1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "probabilites",
    label: "Probabilités",
    boId: "BO4D2",
    prerequis: ["fractions", "statistiques"],
    levels: [1, 2],
  },
];