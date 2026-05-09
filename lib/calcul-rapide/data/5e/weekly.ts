// lib/calcul-rapide/data/5e/weekly.ts

import type { CalculRapideWeek } from "../../types";

export const weekly5e: CalculRapideWeek[] = [
  {
    id: "5e_2026_S18",
    niveau: "5e",
    week: "2026-S18",
    title: "Calcul rapide 5e - Unités et mesures",
    themeDominant: "Conversions, vitesses et aires",
    sessions: [
      {
        id: "5e_2026_S18_lundi",
        niveau: "5e",
        day: "lundi",
        title: "Défi du lundi",
        theme: "Longueurs",
        durationTotalSec: 300,
        itemIds: [
          "5e_calcul_longueur_001",
          "5e_template_conversion_longueur_001",
          "5e_template_conversion_longueur_001",
          "5e_template_conversion_longueur_001",
          "5e_calcul_duree_001",
          "5e_probleme_randonnee_001",
          "5e_template_randonnee_001",
        ],
      },

      {
        id: "5e_2026_S18_mardi",
        niveau: "5e",
        day: "mardi",
        title: "Défi du mardi",
        theme: "Masses",
        durationTotalSec: 300,
        itemIds: [
          "5e_calcul_masse_001",
          "5e_template_conversion_masse_001",
          "5e_template_conversion_masse_001",
          "5e_template_conversion_masse_001",
          "5e_calcul_longueur_001",
          "5e_probleme_poisson_001",
          "5e_template_bouteille_001",
        ],
      },

      {
        id: "5e_2026_S18_mercredi",
        niveau: "5e",
        day: "mercredi",
        title: "Défi du mercredi",
        theme: "Contenances",
        durationTotalSec: 300,
        itemIds: [
          "5e_calcul_contenance_001",
          "5e_template_conversion_contenance_001",
          "5e_template_conversion_contenance_001",
          "5e_template_conversion_contenance_001",
          "5e_calcul_volume_001",
          "5e_probleme_jus_001",
          "5e_template_bouteille_001",
        ],
      },

      {
        id: "5e_2026_S18_jeudi",
        niveau: "5e",
        day: "jeudi",
        title: "Défi du jeudi",
        theme: "Durées et vitesses",
        durationTotalSec: 300,
        itemIds: [
          "5e_calcul_duree_001",
          "5e_template_conversion_duree_001",
          "5e_template_conversion_duree_001",
          "5e_template_vitesse_001",
          "5e_calcul_vitesse_001",
          "5e_probleme_vitesse_001",
          "5e_template_course_001",
        ],
      },

      {
        id: "5e_2026_S18_vendredi",
        niveau: "5e",
        day: "vendredi",
        title: "Défi du vendredi",
        theme: "Aires et conversions",
        durationTotalSec: 300,
        itemIds: [
          "5e_calcul_aire_001",
          "5e_template_aire_rectangle_001",
          "5e_template_conversion_longueur_001",
          "5e_template_conversion_masse_001",
          "5e_calcul_volume_001",
          "5e_probleme_aire_chambre_001",
          "5e_template_aire_rectangle_001",
        ],
      },

      // 🔵 SAMEDI : MÉLANGE DE LA SEMAINE
      {
        id: "5e_2026_S18_samedi",
        niveau: "5e",
        day: "samedi",
        title: "Défi du samedi",
        theme: "Mix de la semaine",
        durationTotalSec: 300,
        itemIds: [
          "5e_template_conversion_longueur_001",
          "5e_template_conversion_contenance_001",
          "5e_template_conversion_duree_001",
          "5e_template_vitesse_001",
          "5e_calcul_aire_001",
          "5e_probleme_jus_001",
          "5e_template_randonnee_001",
        ],
      },

      // 🔴 DIMANCHE : FINAL DE LA SEMAINE
      {
        id: "5e_2026_S18_dimanche",
        niveau: "5e",
        day: "dimanche",
        title: "Final du dimanche 🏆",
        theme: "Challenge global mesures",
        durationTotalSec: 300,
        itemIds: [
          "5e_template_conversion_longueur_001",
          "5e_template_conversion_masse_001",
          "5e_template_conversion_contenance_001",
          "5e_template_conversion_duree_001",
          "5e_template_vitesse_001",
          "5e_probleme_vitesse_001",
          "5e_probleme_aire_chambre_001",
        ],
      },
    ],
  },
];