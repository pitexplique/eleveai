// lib/calcul-rapide/data/terminale-spe/weekly.ts

import type { CalculRapideWeek } from "../../types";

export const weeklyTerminaleSpe: CalculRapideWeek[] = [
  {
    id: "terminale_spe_2026_S22",
    niveau: "terminale-spe",
    week: "2026-S22",
    title: "Calcul rapide Terminale spé - Sprint bac",
    themeDominant: "Dérivées, suites, exponentielle, logarithme, probabilités et variations",
    sessions: [
      {
        id: "terminale_spe_2026_S22_lundi",
        niveau: "terminale-spe",
        day: "lundi",
        title: "Défi du lundi",
        theme: "Dérivées express",
        durationTotalSec: 300,
        itemIds: [
          "terminale_spe_calcul_derivee_polynome_001",
          "terminale_spe_template_derivee_ax2_001",
          "terminale_spe_template_derivee_ax2_bx_001",
          "terminale_spe_calcul_derivee_exp_001",
          "terminale_spe_calcul_derivee_ln_001",
          "terminale_spe_probleme_tangente_001",
          "terminale_spe_template_probleme_tangente_001",
        ],
      },

      {
        id: "terminale_spe_2026_S22_mardi",
        niveau: "terminale-spe",
        day: "mardi",
        title: "Défi du mardi",
        theme: "Suites",
        durationTotalSec: 300,
        itemIds: [
          "terminale_spe_calcul_suite_geo_001",
          "terminale_spe_calcul_suite_arith_001",
          "terminale_spe_template_suite_arith_001",
          "terminale_spe_template_suite_geo_001",
          "terminale_spe_template_probleme_evolution_geo_001",
          "terminale_spe_probleme_suite_population_001",
          "terminale_spe_template_suite_geo_001",
        ],
      },

      {
        id: "terminale_spe_2026_S22_mercredi",
        niveau: "terminale-spe",
        day: "mercredi",
        title: "Défi du mercredi",
        theme: "Exponentielle et logarithme",
        durationTotalSec: 300,
        itemIds: [
          "terminale_spe_calcul_ln_exp_001",
          "terminale_spe_calcul_exp_ln_001",
          "terminale_spe_template_ln_exp_001",
          "terminale_spe_template_exp_ln_001",
          "terminale_spe_template_exp_produit_001",
          "terminale_spe_probleme_exp_croissance_001",
          "terminale_spe_template_probleme_ln_exp_001",
        ],
      },

      {
        id: "terminale_spe_2026_S22_jeudi",
        niveau: "terminale-spe",
        day: "jeudi",
        title: "Défi du jeudi",
        theme: "Probabilités",
        durationTotalSec: 300,
        itemIds: [
          "terminale_spe_calcul_proba_indep_001",
          "terminale_spe_template_proba_indep_001",
          "terminale_spe_calcul_binomiale_esperance_001",
          "terminale_spe_template_binomiale_esperance_001",
          "terminale_spe_template_probleme_binomiale_001",
          "terminale_spe_probleme_binomiale_001",
          "terminale_spe_template_proba_indep_001",
        ],
      },

      {
        id: "terminale_spe_2026_S22_vendredi",
        niveau: "terminale-spe",
        day: "vendredi",
        title: "Défi du vendredi",
        theme: "Limites et variations",
        durationTotalSec: 300,
        itemIds: [
          "terminale_spe_calcul_limite_carre_001",
          "terminale_spe_calcul_variation_derivee_001",
          "terminale_spe_probleme_variation_001",
          "terminale_spe_template_derivee_ax2_bx_001",
          "terminale_spe_calcul_derivee_polynome_001",
          "terminale_spe_template_probleme_tangente_001",
          "terminale_spe_template_probleme_aire_integrale_constante_001",
        ],
      },

      {
        id: "terminale_spe_2026_S22_samedi",
        niveau: "terminale-spe",
        day: "samedi",
        title: "Défi du samedi",
        theme: "Mix bac express",
        durationTotalSec: 300,
        itemIds: [
          "terminale_spe_template_derivee_ax2_001",
          "terminale_spe_template_suite_geo_001",
          "terminale_spe_template_ln_exp_001",
          "terminale_spe_template_exp_produit_001",
          "terminale_spe_template_binomiale_esperance_001",
          "terminale_spe_template_probleme_evolution_geo_001",
          "terminale_spe_template_probleme_aire_integrale_constante_001",
        ],
      },

      {
        id: "terminale_spe_2026_S22_dimanche",
        niveau: "terminale-spe",
        day: "dimanche",
        title: "Final du dimanche 🏆",
        theme: "Challenge global Terminale spé",
        durationTotalSec: 300,
        itemIds: [
          "terminale_spe_calcul_derivee_exp_001",
          "terminale_spe_template_derivee_ax2_bx_001",
          "terminale_spe_template_suite_arith_001",
          "terminale_spe_template_exp_ln_001",
          "terminale_spe_calcul_proba_indep_001",
          "terminale_spe_probleme_tangente_001",
          "terminale_spe_template_probleme_binomiale_001",
        ],
      },
    ],
  },
];