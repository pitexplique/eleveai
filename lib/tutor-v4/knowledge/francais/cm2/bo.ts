// Compétences BO de français pour la classe de CM2.
// Référence : programme officiel du cycle 3,
// BO n° 16 du 17 avril 2025, application progressive au CM2.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCM2FL1", label: "Lecture — Fluence, compréhension et œuvres" },
  { boId: "BOCM2FE1", label: "Écriture — Copier, apprendre, produire" },
  { boId: "BOCM2FO1", label: "Oral — Écouter, dire, échanger" },
  { boId: "BOCM2FV1", label: "Vocabulaire — Enrichir, relier, réutiliser" },
  { boId: "BOCM2FG1", label: "Grammaire et orthographe grammaticale" },
];
