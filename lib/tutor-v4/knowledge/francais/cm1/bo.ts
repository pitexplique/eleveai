// Competences BO de francais pour la classe de CM1.
// Reference : programme officiel du cycle 3,
// BO n. 16 du 17 avril 2025, applicable au CM1 a la rentree 2025.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCM1FL1", label: "Lecture - Fluence, comprehension et oeuvres" },
  { boId: "BOCM1FE1", label: "Ecriture - Copier, apprendre, produire" },
  { boId: "BOCM1FO1", label: "Oral - Ecouter, dire, echanger" },
  { boId: "BOCM1FV1", label: "Vocabulaire - Enrichir, relier, reutiliser" },
  { boId: "BOCM1FG1", label: "Grammaire et orthographe grammaticale" },
];
