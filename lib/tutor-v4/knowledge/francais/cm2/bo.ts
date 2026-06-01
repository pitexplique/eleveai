// Competences BO de francais pour la classe de CM2.
// Reference : programme officiel du cycle 3,
// BO n. 16 du 17 avril 2025, application progressive au CM2.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCM2FL1", label: "Lecture - Fluence, comprehension et oeuvres" },
  { boId: "BOCM2FE1", label: "Ecriture - Copier, apprendre, produire" },
  { boId: "BOCM2FO1", label: "Oral - Ecouter, dire, echanger" },
  { boId: "BOCM2FV1", label: "Vocabulaire - Enrichir, relier, reutiliser" },
  { boId: "BOCM2FG1", label: "Grammaire et orthographe grammaticale" },
];
