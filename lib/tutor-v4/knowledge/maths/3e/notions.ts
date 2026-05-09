// knowledge/maths/3e/notions.ts
//
// Notions de mathématiques pour la classe de 3e.
//
// Objectif :
// - alignement avec le BO 2026 cycle 4 ;
// - cohérence avec 5e et 4e ;
// - progression logique pour Tutor V4 ;
// - notions suffisamment larges pour porter les microSkills.
//
// Organisation :
// - Nombres
// - Algèbre / Fonctions
// - Géométrie
// - Grandeurs et mesures
// - Données

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [

  {
  id: "algorithmique",
  label: "Algorithmique et programmation",
  boId: "BO3I1",
  prerequis: ["calcul_litteral"],
  levels: [1, 2, 3],
},


  /* =========================
     NOMBRES
  ========================= */

  {
    id: "nombres_rationnels",
    label: "Nombres rationnels",
    boId: "BO3N1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "puissances",
    label: "Puissances",
    boId: "BO3N1",
    prerequis: ["nombres_rationnels"],
    levels: [1, 2, 3],
  },

  {
    id: "racine_carree",
    label: "Racine carrée",
    boId: "BO3N1",
    prerequis: ["nombres_rationnels"],
    levels: [1, 2, 3],
  },

  {
    id: "arithmetique",
    label: "Multiples et diviseurs",
    boId: "BO3N2",
    prerequis: ["nombres_rationnels"],
    levels: [1, 2, 3],
  },

  {
    id: "proportionnalite",
    label: "Proportionnalité",
    boId: "BO3P1",
    prerequis: ["nombres_rationnels"],
    levels: [1, 2, 3],
  },

  /* =========================
     ALGÈBRE / FONCTIONS
  ========================= */

  {
    id: "calcul_litteral",
    label: "Calcul littéral",
    boId: "BO3A1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "equations",
    label: "Équations",
    boId: "BO3A1",
    prerequis: ["calcul_litteral"],
    levels: [1, 2, 3],
  },

  {
    id: "fonctions",
    label: "Fonctions",
    boId: "BO3F1",
    prerequis: ["proportionnalite"],
    levels: [1, 2, 3],
  },

  {
    id: "affine",
    label: "Fonctions affines",
    boId: "BO3F1",
    prerequis: ["fonctions", "equations"],
    levels: [1, 2, 3],
  },

  /* =========================
     GÉOMÉTRIE
  ========================= */

  {
    id: "triangles",
    label: "Triangles",
    boId: "BO3G1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "pythagore",
    label: "Théorème de Pythagore",
    boId: "BO3G1",
    prerequis: ["triangles"],
    levels: [1, 2, 3],
  },

  {
    id: "thales",
    label: "Théorème de Thalès",
    boId: "BO3G1",
    prerequis: ["triangles", "proportionnalite"],
    levels: [1, 2, 3],
  },

  {
    id: "trigonometrie",
    label: "Trigonométrie",
    boId: "BO3G1",
    prerequis: ["triangles", "pythagore"],
    levels: [1, 2, 3],
  },

  {
    id: "transformations",
    label: "Transformations (dont homothéties)",
    boId: "BO3G1",
    prerequis: ["triangles"],
    levels: [1, 2],
  },

  {
    id: "geometrie_espace",
    label: "Géométrie dans l’espace",
    boId: "BO3G2",
    prerequis: [],
    levels: [1, 2],
  },

  /* =========================
     GRANDEURS ET MESURES
  ========================= */

  {
    id: "perimetres",
    label: "Périmètres",
    boId: "BO3M1",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "aires",
    label: "Aires",
    boId: "BO3M1",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "volumes",
    label: "Volumes",
    boId: "BO3M1",
    prerequis: ["aires"],
    levels: [1, 2],
  },

  /* =========================
     DONNÉES
  ========================= */

  {
    id: "statistiques",
    label: "Statistiques",
    boId: "BO3D1",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "probabilites",
    label: "Probabilités",
    boId: "BO3D2",
    prerequis: [],
    levels: [1, 2, 3],
  },



];