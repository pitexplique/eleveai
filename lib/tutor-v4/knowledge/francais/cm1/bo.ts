// Compétences BO de français pour la classe de CM1.
// Référence : programme officiel du cycle 3,
// BO n° 16 du 17 avril 2025, applicable au CM1 à la rentrée 2025.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCM1FL1", label: "Lecture — Fluence, compréhension et œuvres" },
  { boId: "BOCM1FE1", label: "Écriture — Copier, apprendre, produire" },
  { boId: "BOCM1FO1", label: "Oral — Écouter, dire, échanger" },
  { boId: "BOCM1FV1", label: "Vocabulaire — Enrichir, relier, réutiliser" },
  { boId: "BOCM1FG1", label: "Grammaire et orthographe grammaticale" },
];
