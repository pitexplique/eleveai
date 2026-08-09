// Compétences BO de français pour la classe de CE1.
// Référence : programme officiel du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCE1FO1", label: "Langage oral" },
  { boId: "BOCE1FL1", label: "Lecture – Étude du code et fluence" },
  { boId: "BOCE1FL2", label: "Lecture – Compréhension" },
  { boId: "BOCE1FE1", label: "Écriture – Copie et production" },
  { boId: "BOCE1FG1", label: "Étude de la langue – Grammaire et orthographe" },
  { boId: "BOCE1FC1", label: "Étude de la langue – Conjugaison" },
  { boId: "BOCE1FV1", label: "Étude de la langue – Vocabulaire" },
];
