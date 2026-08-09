// Compétences BO de français pour la classe de CE2.
// Référence : programme officiel du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCE2FO1", label: "Langage oral" },
  { boId: "BOCE2FL1", label: "Lecture – Fluence et compréhension" },
  { boId: "BOCE2FE1", label: "Écriture – Copie et production" },
  { boId: "BOCE2FG1", label: "Étude de la langue – Grammaire et orthographe" },
  { boId: "BOCE2FC1", label: "Étude de la langue – Conjugaison" },
  { boId: "BOCE2FV1", label: "Étude de la langue – Vocabulaire" },
];
