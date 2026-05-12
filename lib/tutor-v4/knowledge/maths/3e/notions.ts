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
  id: "algo_programmation",
  label: "Algorithmique et programmation",
  boId: "BO3I1",
  prerequis: ["litteral_calcul"],
  levels: [1, 2, 3],
},


  /* =========================
     NOMBRES
  ========================= */

  {
    id: "fraction_rationnel",
    label: "Nombres rationnels",
    boId: "BO3N1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "entier_puissance",
    label: "Puissances",
    boId: "BO3N1",
    prerequis: ["fraction_rationnel"],
    levels: [1, 2, 3],
  },

  {
    id: "entier_racine_carree",
    label: "Racine carrée",
    boId: "BO3N1",
    prerequis: ["fraction_rationnel"],
    levels: [1, 2, 3],
  },

  {
    id: "entier_arithmetique",
    label: "Multiples et diviseurs",
    boId: "BO3N2",
    prerequis: ["fraction_rationnel"],
    levels: [1, 2, 3],
  },

  {
    id: "prop_proportionnalite",
    label: "Proportionnalité",
    boId: "BO3P1",
    prerequis: ["fraction_rationnel"],
    levels: [1, 2, 3],
  },

  /* =========================
     ALGÈBRE / FONCTIONS
  ========================= */

  {
    id: "litteral_calcul",
    label: "Calcul littéral",
    boId: "BO3A1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "equation_resolution",
    label: "Équations",
    boId: "BO3A1",
    prerequis: ["litteral_calcul"],
    levels: [1, 2, 3],
  },

  {
    id: "fonction_generalite",
    label: "Fonctions",
    boId: "BO3F1",
    prerequis: ["prop_proportionnalite"],
    levels: [1, 2, 3],
  },

  {
    id: "affine_fonction",
    label: "Fonctions affines",
    boId: "BO3F1",
    prerequis: ["fonction_generalite", "equation_resolution"],
    levels: [1, 2, 3],
  },

  /* =========================
     GÉOMÉTRIE
  ========================= */

  {
    id: "triangle_figure",
    label: "Triangles",
    boId: "BO3G1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "pythagore_theoreme",
    label: "Théorème de Pythagore",
    boId: "BO3G1",
    prerequis: ["triangle_figure"],
    levels: [1, 2, 3],
  },

  {
    id: "thales_theoreme",
    label: "Théorème de Thalès",
    boId: "BO3G1",
    prerequis: ["triangle_figure", "prop_proportionnalite"],
    levels: [1, 2, 3],
  },

  {
    id: "trigo_trigonometrie",
    label: "Trigonométrie",
    boId: "BO3G1",
    prerequis: ["triangle_figure", "pythagore_theoreme"],
    levels: [1, 2, 3],
  },

  {
    id: "sym_transformation",
    label: "Transformations (dont homothéties)",
    boId: "BO3G1",
    prerequis: ["triangle_figure"],
    levels: [1, 2],
  },

  {
    id: "volume_geometrie_espace",
    label: "Géométrie dans l’espace",
    boId: "BO3G2",
    prerequis: [],
    levels: [1, 2],
  },
    {
    id: "sections_solides",
    label: "Sections planes de solides",
    boId: "BO3G2",
    prerequis: ["volume_geometrie_espace"],
    levels: [2, 3],
  },

  /* =========================
     GRANDEURS ET MESURES
  ========================= */

  {
    id: "aire_perimetre",
    label: "Périmètres",
    boId: "BO3M1",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "aire_surface",
    label: "Aires",
    boId: "BO3M1",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "volume_solide",
    label: "Volumes",
    boId: "BO3M1",
    prerequis: ["aire_surface"],
    levels: [1, 2],
  },

  /* =========================
     DONNÉES
  ========================= */

  {
    id: "stat_statistique",
    label: "Statistiques",
    boId: "BO3D1",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "proba_experience",
    label: "Probabilités",
    boId: "BO3D2",
    prerequis: [],
    levels: [1, 2, 3],
  },



];