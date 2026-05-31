// Competences BO de mathematiques pour la classe de CP.
// Reference : programme officiel de mathematiques du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCPN1", label: "Nombres entiers" },
  { boId: "BOCPC1", label: "Calcul et automatismes" },
  { boId: "BOCPP1", label: "Resolution de problemes" },
  { boId: "BOCPM1", label: "Grandeurs et mesures" },
  { boId: "BOCPG1", label: "Espace et geometrie" },
  { boId: "BOCPD1", label: "Organisation et gestion de donnees" },
  { boId: "BOCPI1", label: "Initiation a la pensee informatique" },
];
