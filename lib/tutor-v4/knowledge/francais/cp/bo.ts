// Compétences BO de français pour la classe de CP.
// Référence : programme officiel du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCPFO1", label: "Langage oral" },
  { boId: "BOCPFL1", label: "Lecture – Étude du code" },
  { boId: "BOCPFL2", label: "Lecture – Compréhension" },
  { boId: "BOCPFE1", label: "Écriture – Copie et production" },
  { boId: "BOCPFG1", label: "Étude de la langue – Grammaire et orthographe" },
  { boId: "BOCPFV1", label: "Étude de la langue – Vocabulaire" },
];
