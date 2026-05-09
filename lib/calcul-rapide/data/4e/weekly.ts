// lib/calcul-rapide/data/4e/weekly.ts

import type { CalculRapideWeek } from "../../types";

export const weekly4e: CalculRapideWeek[] = [
  {
    id: "4e_2026_S18",
    niveau: "4e",
    week: "2026-S18",
    title: "Calcul rapide 4e - Unités et mesures",
    themeDominant: "Conversions, vitesses, aires et réactivation",
    sessions: [
      {
        id: "4e_2026_S18_lundi",
        niveau: "4e",
        day: "lundi",
        title: "Défi du lundi",
        theme: "Longueurs et conversions",
        durationTotalSec: 300,
        itemIds: [
          "4e_calcul_conversion_longueur_001",
          "4e_template_conversion_longueur_001",
          "4e_template_conversion_longueur_001",
          "4e_calcul_conversion_masse_001",
          "4e_calcul_duree_001",
          "4e_probleme_randonnee_001",
          "4e_template_randonnee_001",
        ],
      },

      {
        id: "4e_2026_S18_mardi",
        niveau: "4e",
        day: "mardi",
        title: "Défi du mardi",
        theme: "Vitesses et durées",
        durationTotalSec: 300,
        itemIds: [
          "4e_calcul_vitesse_001",
          "4e_template_vitesse_001",
          "4e_template_conversion_duree_001",
          "4e_calcul_duree_001",
          "4e_calcul_vitesse_002",
          "4e_probleme_vitesse_001",
          "4e_template_duree_001",
        ],
      },

      {
        id: "4e_2026_S18_mercredi",
        niveau: "4e",
        day: "mercredi",
        title: "Défi du mercredi",
        theme: "Réactivation mixte",
        durationTotalSec: 300,
        itemIds: [
          "4e_calcul_conversion_longueur_001",
          "4e_calcul_conversion_masse_001",
          "4e_template_conversion_contenance_001",
          "4e_template_conversion_duree_001",
          "4e_calcul_vitesse_001",
          "4e_probleme_volume_001",
          "4e_template_randonnee_001",
        ],
      },

      {
        id: "4e_2026_S18_jeudi",
        niveau: "4e",
        day: "jeudi",
        title: "Défi du jeudi",
        theme: "Aires et volumes",
        durationTotalSec: 300,
        itemIds: [
          "4e_calcul_aire_001",
          "4e_template_aire_rectangle_001",
          "4e_template_volume_001",
          "4e_calcul_volume_001",
          "4e_calcul_piege_aire_001",
          "4e_probleme_aire_001",
          "4e_probleme_piege_aire_001",
        ],
      },

      {
        id: "4e_2026_S18_vendredi",
        niveau: "4e",
        day: "vendredi",
        title: "Défi du vendredi",
        theme: "Boss final mesures",
        durationTotalSec: 300,
        itemIds: [
          "4e_template_conversion_longueur_001",
          "4e_template_conversion_masse_001",
          "4e_template_vitesse_001",
          "4e_template_aire_001",
          "4e_calcul_volume_001",
          "4e_probleme_vitesse_002",
          "4e_probleme_pythagore_001",
        ],
      },

      // 🔵 SAMEDI : CONSOLIDATION
      {
        id: "4e_2026_S18_samedi",
        niveau: "4e",
        day: "samedi",
        title: "Défi du samedi",
        theme: "Mix de la semaine",
        durationTotalSec: 300,
        itemIds: [
          "4e_template_conversion_longueur_001",
          "4e_template_conversion_duree_001",
          "4e_calcul_vitesse_002",
          "4e_template_volume_001",
          "4e_calcul_piege_aire_001",
          "4e_probleme_volume_001",
          "4e_template_pythagore_001",
        ],
      },

      // 🔴 DIMANCHE : FINAL
      {
        id: "4e_2026_S18_dimanche",
        niveau: "4e",
        day: "dimanche",
        title: "Final du dimanche 🏆",
        theme: "Challenge global mesures",
        durationTotalSec: 300,
        itemIds: [
          "4e_template_vitesse_001",
          "4e_template_aire_001",
          "4e_template_conversion_duree_001",
          "4e_calcul_volume_001",
          "4e_calcul_piege_aire_001",
          "4e_probleme_vitesse_001",
          "4e_probleme_pythagore_001",
        ],
      },
    ],
  },
];