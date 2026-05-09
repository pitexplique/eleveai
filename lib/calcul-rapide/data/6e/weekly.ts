// lib/calcul-rapide/data/6e/weekly.ts

import type { CalculRapideWeek } from "../../types";

export const weekly6e: CalculRapideWeek[] = [
  {
    id: "6e_2026_S18",
    niveau: "6e",
    week: "2026-S18",
    title: "Calcul rapide 6e - Unités et mesures",
    themeDominant: "Conversions et grandeurs",
    sessions: [
      {
        id: "6e_2026_S18_lundi",
        niveau: "6e",
        day: "lundi",
        title: "Défi du lundi",
        theme: "Longueurs",
        durationTotalSec: 300,
        itemIds: [
          "6e_calcul_longueur_001",
          "6e_template_conversion_longueur_001",
          "6e_template_conversion_longueur_001",
          "6e_template_conversion_duree_001",
          "6e_calcul_duree_001",
          "6e_probleme_sentier_001",
          "6e_template_randonnee_001",
        ],
      },

      {
        id: "6e_2026_S18_mardi",
        niveau: "6e",
        day: "mardi",
        title: "Défi du mardi",
        theme: "Masses",
        durationTotalSec: 300,
        itemIds: [
          "6e_calcul_masse_001",
          "6e_template_conversion_masse_001",
          "6e_template_conversion_masse_001",
          "6e_template_conversion_masse_001",
          "6e_calcul_longueur_001",
          "6e_probleme_poisson_001",
          "6e_template_course_001",
        ],
      },

      {
        id: "6e_2026_S18_mercredi",
        niveau: "6e",
        day: "mercredi",
        title: "Défi du mercredi",
        theme: "Contenances",
        durationTotalSec: 300,
        itemIds: [
          "6e_calcul_contenance_001",
          "6e_template_conversion_contenance_001",
          "6e_template_conversion_contenance_001",
          "6e_template_conversion_contenance_001",
          "6e_calcul_volume_001",
          "6e_probleme_bouteilles_001",
          "6e_template_jus_fruits_001",
        ],
      },

      {
        id: "6e_2026_S18_jeudi",
        niveau: "6e",
        day: "jeudi",
        title: "Défi du jeudi",
        theme: "Aires et durées",
        durationTotalSec: 300,
        itemIds: [
          "6e_calcul_aire_001",
          "6e_template_conversion_duree_001",
          "6e_template_conversion_duree_001",
          "6e_template_conversion_longueur_001",
          "6e_calcul_duree_001",
          "6e_probleme_chambre_001",
          "6e_template_course_001",
        ],
      },

      {
        id: "6e_2026_S18_vendredi",
        niveau: "6e",
        day: "vendredi",
        title: "Défi du vendredi",
        theme: "Boss final mesures",
        durationTotalSec: 300,
        itemIds: [
          "6e_template_conversion_longueur_001",
          "6e_template_conversion_masse_001",
          "6e_template_conversion_contenance_001",
          "6e_template_conversion_duree_001",
          "6e_calcul_aire_001",
          "6e_probleme_bouteilles_001",
          "6e_probleme_poisson_001",
        ],
      },

      // 🔵 SAMEDI : MÉLANGE LARGE
      {
        id: "6e_2026_S18_samedi",
        niveau: "6e",
        day: "samedi",
        title: "Défi du samedi",
        theme: "Mix de la semaine",
        durationTotalSec: 300,
        itemIds: [
          "6e_template_conversion_longueur_001",
          "6e_template_conversion_masse_001",
          "6e_template_conversion_contenance_001",
          "6e_calcul_duree_001",
          "6e_calcul_aire_001",
          "6e_probleme_sentier_001",
          "6e_template_jus_fruits_001",
        ],
      },

      // 🔴 DIMANCHE : FINAL
      {
        id: "6e_2026_S18_dimanche",
        niveau: "6e",
        day: "dimanche",
        title: "Final du dimanche 🏆",
        theme: "Challenge global mesures",
        durationTotalSec: 300,
        itemIds: [
          "6e_template_conversion_longueur_001",
          "6e_template_conversion_masse_001",
          "6e_template_conversion_contenance_001",
          "6e_template_conversion_duree_001",
          "6e_calcul_volume_001",
          "6e_probleme_chambre_001",
          "6e_probleme_poisson_001",
        ],
      },
    ],
  },
];