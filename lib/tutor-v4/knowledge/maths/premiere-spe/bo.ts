// knowledge/maths/premiere-spe/bo.ts
//
// Grands domaines du programme de spécialité mathématiques de Première générale
// (BO). Cinq parties de contenus, plus le vocabulaire ensembliste et
// logique, que le programme traite comme une partie à part entière —
// « transversale à tous les chapitres du programme », précise-t-il.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOPSAL", label: "Algèbre" },
  { boId: "BOPSAN", label: "Analyse" },
  { boId: "BOPSGE", label: "Géométrie" },
  { boId: "BOPSPR", label: "Probabilités et statistiques" },
  { boId: "BOPSAP", label: "Algorithmique et programmation" },
  { boId: "BOPSVL", label: "Vocabulaire ensembliste et logique" },
];
