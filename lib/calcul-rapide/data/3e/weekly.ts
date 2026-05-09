// lib/calcul-rapide/data/3e/weekly.ts

import type { CalculRapideWeek } from "../../types";

export const weekly3e: CalculRapideWeek[] = [
  {
    id: "3e_2026_S18",
    niveau: "3e",
    week: "2026-S18",
    title: "Calcul rapide 3e - Unités et mesures",
    themeDominant: "Réactivation brevet, vitesses, conversions et grandeurs",
    sessions: [
      {
        id: "3e_2026_S18_lundi",
        niveau: "3e",
        day: "lundi",
        title: "Défi du lundi",
        theme: "Conversions et durées",
        durationTotalSec: 300,
        itemIds: [
          "3e_calcul_conversion_longueur_001",
          "3e_template_conversion_longueur_001",
          "3e_calcul_conversion_masse_001",
          "3e_template_conversion_masse_001",
          "3e_calcul_duree_001",
          "3e_probleme_randonnee_001",
          "3e_template_randonnee_001",
        ],
      },

      {
        id: "3e_2026_S18_mardi",
        niveau: "3e",
        day: "mardi",
        title: "Défi du mardi",
        theme: "Vitesses et proportionnalité",
        durationTotalSec: 300,
        itemIds: [
          "3e_calcul_vitesse_001",
          "3e_template_vitesse_001",
          "3e_calcul_vitesse_002",
          "3e_template_vitesse_moyenne_001",
          "3e_template_conversion_duree_001",
          "3e_probleme_vitesse_001",
          "3e_probleme_vitesse_002",
        ],
      },

      {
        id: "3e_2026_S18_mercredi",
        niveau: "3e",
        day: "mercredi",
        title: "Défi du mercredi",
        theme: "Réactivation brevet",
        durationTotalSec: 300,
        itemIds: [
          "3e_calcul_conversion_longueur_001",
          "3e_calcul_conversion_masse_001",
          "3e_template_conversion_duree_001",
          "3e_template_vitesse_001",
          "3e_calcul_volume_001",
          "3e_probleme_volume_001",
          "3e_template_volume_001",
        ],
      },

      {
        id: "3e_2026_S18_jeudi",
        niveau: "3e",
        day: "jeudi",
        title: "Défi du jeudi",
        theme: "Aires et volumes",
        durationTotalSec: 300,
        itemIds: [
          "3e_calcul_aire_001",
          "3e_template_aire_001",
          "3e_calcul_volume_001",
          "3e_template_volume_001",
          "3e_calcul_piege_aire_001",
          "3e_probleme_aire_001",
          "3e_probleme_piege_aire_001",
        ],
      },

      {
        id: "3e_2026_S18_vendredi",
        niveau: "3e",
        day: "vendredi",
        title: "Défi du vendredi",
        theme: "Boss final mesures",
        durationTotalSec: 300,
        itemIds: [
          "3e_template_conversion_longueur_001",
          "3e_template_vitesse_moyenne_001",
          "3e_template_aire_001",
          "3e_calcul_volume_001",
          "3e_calcul_piege_aire_001",
          "3e_probleme_vitesse_001",
          "3e_probleme_pythagore_001",
        ],
      },

      // 🔵 SAMEDI : CONSOLIDATION
      {
        id: "3e_2026_S18_samedi",
        niveau: "3e",
        day: "samedi",
        title: "Défi du samedi",
        theme: "Mix de la semaine",
        durationTotalSec: 300,
        itemIds: [
          "3e_template_conversion_masse_001",
          "3e_template_conversion_duree_001",
          "3e_template_vitesse_001",
          "3e_calcul_aire_001",
          "3e_template_volume_001",
          "3e_probleme_volume_001",
          "3e_template_pythagore_001",
        ],
      },

      // 🔴 DIMANCHE : FINAL BREVET
      {
        id: "3e_2026_S18_dimanche",
        niveau: "3e",
        day: "dimanche",
        title: "Final du dimanche 🏆",
        theme: "Simulation brevet mesures",
        durationTotalSec: 300,
        itemIds: [
          "3e_template_vitesse_moyenne_001",
          "3e_template_aire_001",
          "3e_template_conversion_duree_001",
          "3e_calcul_volume_001",
          "3e_calcul_piege_aire_001",
          "3e_probleme_vitesse_002",
          "3e_probleme_pythagore_001",
        ],
      },
    ],
  },
];