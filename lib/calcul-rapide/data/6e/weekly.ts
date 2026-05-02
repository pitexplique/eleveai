// lib/calcul-rapide/data/6e/weekly.ts

import type { CalculRapideWeek } from "../../types";

export const weekly6e: CalculRapideWeek[] = [
  {
    id: "6e_2026_S18",
    niveau: "6e",
    week: "2026-S18",
    title: "Calcul rapide 6e - Semaine 1",
    themeDominant: "Automatismes et problèmes courts",
    sessions: [
      {
        id: "6e_2026_S18_lundi",
        niveau: "6e",
        day: "lundi",
        title: "Défi du lundi",
        theme: "Décimaux et calcul mental",
        durationTotalSec: 300,
        itemIds: [
          "6e_calcul_decimal_soustraction_002",
          "6e_calcul_pourcentage_002",
          "6e_template_addition_flash_001",
          "6e_template_multiplication_flash_001",
          "6e_calcul_diviser_100_002",
          "6e_probleme_aire_carre_001",
          "6e_template_pages_livre_001",
        ],
      },
      {
        id: "6e_2026_S18_mardi",
        niveau: "6e",
        day: "mardi",
        title: "Défi du mardi",
        theme: "Multiplications et partages",
        durationTotalSec: 300,
        itemIds: [
          "6e_template_multiplication_flash_001",
          "6e_calcul_decimal_multiplication_002",
          "6e_template_diviser_10_100_001",
          "6e_calcul_division_euclidienne_002",
          "6e_template_pourcentage_25_001",
          "6e_template_partage_letchis_001",
          "6e_template_verger_tampon_001",
        ],
      },
      {
        id: "6e_2026_S18_mercredi",
        niveau: "6e",
        day: "mercredi",
        title: "Défi du mercredi",
        theme: "Réactivation mixte",
        durationTotalSec: 300,
        itemIds: [
          "6e_template_addition_flash_001",
          "6e_template_multiplication_flash_001",
          "6e_calcul_pourcentage_002",
          "6e_template_diviser_10_100_001",
          "6e_calcul_decimal_soustraction_002",
          "6e_probleme_pourcentage_college_001",
          "6e_template_pages_livre_001",
        ],
      },
      {
        id: "6e_2026_S18_jeudi",
        niveau: "6e",
        day: "jeudi",
        title: "Défi du jeudi",
        theme: "Géométrie et proportionnalité",
        durationTotalSec: 300,
        itemIds: [
          "6e_template_addition_flash_001",
          "6e_template_pourcentage_25_001",
          "6e_calcul_diviser_100_002",
          "6e_template_multiplication_flash_001",
          "6e_calcul_division_euclidienne_002",
          "6e_probleme_angle_triangle_001",
          "6e_probleme_aire_carre_001",
        ],
      },
      {
        id: "6e_2026_S18_vendredi",
        niveau: "6e",
        day: "vendredi",
        title: "Défi du vendredi",
        theme: "Boss final mixte",
        durationTotalSec: 300,
        itemIds: [
          "6e_template_multiplication_flash_001",
          "6e_template_diviser_10_100_001",
          "6e_template_pourcentage_25_001",
          "6e_calcul_decimal_multiplication_002",
          "6e_calcul_decimal_soustraction_002",
          "6e_probleme_proba_boules_001",
          "6e_template_verger_tampon_001",
        ],
      },

      // 🔵 NOUVEAU : SAMEDI (MÉLANGE LARGE)
      {
        id: "6e_2026_S18_samedi",
        niveau: "6e",
        day: "samedi",
        title: "Défi du samedi",
        theme: "Mix de la semaine",
        durationTotalSec: 300,
        itemIds: [
          // mélange des jours précédents
          "6e_template_addition_flash_001",
          "6e_template_multiplication_flash_001",
          "6e_template_diviser_10_100_001",
          "6e_calcul_pourcentage_002",
          "6e_calcul_decimal_soustraction_002",
          "6e_probleme_aire_carre_001",
          "6e_template_verger_tampon_001",
        ],
      },

      // 🔴 NOUVEAU : DIMANCHE (FINAL SEMAINE)
      {
        id: "6e_2026_S18_dimanche",
        niveau: "6e",
        day: "dimanche",
        title: "Final du dimanche 🏆",
        theme: "Challenge global",
        durationTotalSec: 300,
        itemIds: [
          // version plus “challenge”
          "6e_template_multiplication_flash_001",
          "6e_template_pourcentage_25_001",
          "6e_calcul_decimal_multiplication_002",
          "6e_calcul_division_euclidienne_002",
          "6e_template_diviser_10_100_001",
          "6e_probleme_proba_boules_001",
          "6e_probleme_pourcentage_college_001",
        ],
      },
    ],
  },
];