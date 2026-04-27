// lib/calcul-rapide/data/4e/weekly.ts

import type { CalculRapideWeek } from "../../types";

export const weekly4e: CalculRapideWeek[] = [
  {
    id: "4e_S1",
    niveau: "4e",
    week: "S1",
    title: "Calcul rapide 4e",
    themeDominant: "Relatifs, puissances et problèmes",
    sessions: [
      {
        id: "4e_lundi",
        niveau: "4e",
        day: "lundi",
        title: "Calculs",
        theme: "Relatifs et puissances",
        durationTotalSec: 300,
        itemIds: [
          "4e_calcul_relatif_001",
          "4e_template_relatifs_001",
          "4e_calcul_puissance_001",
          "4e_template_puissance_001",
          "4e_calcul_fraction_001",
          "4e_probleme_vitesse_001",
          "4e_probleme_pythagore_001",
        ],
      },
    ],
  },
];