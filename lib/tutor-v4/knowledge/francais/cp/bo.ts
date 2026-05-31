// Competences BO de français pour la classe de CP.
// Reference : programme officiel du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCPFO1", label: "Langage oral" },
  { boId: "BOCPFL1", label: "Lecture – Etude du code" },
  { boId: "BOCPFL2", label: "Lecture – Comprehension" },
  { boId: "BOCPFE1", label: "Ecriture – Copie et production" },
  { boId: "BOCPFG1", label: "Etude de la langue – Grammaire et orthographe" },
  { boId: "BOCPFV1", label: "Etude de la langue – Vocabulaire" },
];
