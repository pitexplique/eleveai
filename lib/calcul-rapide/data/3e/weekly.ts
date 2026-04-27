// lib/calcul-rapide/data/3e/weekly.ts

import type { CalculRapideWeek } from "../../types";

export const weekly3e: CalculRapideWeek[] = [
  {
    id: "3e_S1",
    niveau: "3e",
    week: "S1",
    title: "Calcul rapide 3e",
    themeDominant: "Révisions brevet",
    sessions: [
      {
        id: "3e_lundi",
        niveau: "3e",
        day: "lundi",
        title: "Défi",
        theme: "Mix",
        durationTotalSec: 300,
        itemIds: [
          "3e_calcul_puissance_001",
          "3e_calcul_racine_001",
          "3e_calcul_equation_001",
          "3e_template_equation_001",
          "3e_calcul_fonction_001",
          "3e_template_fonction_001",
          "3e_probleme_pythagore_001",
        ],
      },
    ],
  },
];