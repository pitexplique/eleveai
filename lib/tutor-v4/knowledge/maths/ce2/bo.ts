// Competences BO de mathematiques pour la classe de CE2.
// Reference : programme officiel de mathematiques du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCE2N1", label: "Nombres entiers" },
  { boId: "BOCE2C1", label: "Calcul et automatismes" },
  { boId: "BOCE2F1", label: "Fractions" },
  { boId: "BOCE2P1", label: "Resolution de problemes" },
  { boId: "BOCE2M1", label: "Grandeurs et mesures" },
  { boId: "BOCE2G1", label: "Espace et geometrie" },
  { boId: "BOCE2D1", label: "Organisation et gestion de donnees" },
  { boId: "BOCE2I1", label: "Initiation a la pensee informatique" },
];
