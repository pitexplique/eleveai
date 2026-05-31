// Competences BO de francais pour la classe de CE2.
// Reference : programme officiel du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCE2FO1", label: "Langage oral" },
  { boId: "BOCE2FL1", label: "Lecture - Fluence et comprehension" },
  { boId: "BOCE2FE1", label: "Ecriture - Copie et production" },
  { boId: "BOCE2FG1", label: "Etude de la langue - Grammaire et orthographe" },
  { boId: "BOCE2FC1", label: "Etude de la langue - Conjugaison" },
  { boId: "BOCE2FV1", label: "Etude de la langue - Vocabulaire" },
];
