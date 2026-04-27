// lib/calcul-rapide/data/5e/weekly.ts

import type { CalculRapideWeek } from "../../types";

export const weekly5e: CalculRapideWeek[] = [
  {
    id: "5e_S1",
    niveau: "5e",
    week: "S1",
    title: "Calcul rapide 5e",
    themeDominant: "Relatifs et fractions",
    sessions: [
      {
        id: "5e_lundi",
        niveau: "5e",
        day: "lundi",
        title: "Relatifs",
        theme: "Calculs relatifs",
        durationTotalSec: 300,
        itemIds: [
          "5e_calcul_relatif_addition_001",
          "5e_template_relatifs_001",
          "5e_probleme_fraction_quantite_001",
        ],
      },
      {
        id: "5e_vendredi",
        niveau: "5e",
        day: "vendredi",
        title: "Boss",
        theme: "Mix",
        durationTotalSec: 300,
        itemIds: [
          "5e_template_fraction_produit_001",
          "5e_probleme_volume_001",
        ],
      },
    ],
  },
];