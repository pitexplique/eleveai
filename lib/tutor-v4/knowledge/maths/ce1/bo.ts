// Competences BO de mathematiques pour la classe de CE1.
// Reference : programme officiel de mathematiques du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCE1N1", label: "Nombres entiers" },
  { boId: "BOCE1C1", label: "Calcul et automatismes" },
  { boId: "BOCE1F1", label: "Fractions simples" },
  { boId: "BOCE1P1", label: "Resolution de problemes" },
  { boId: "BOCE1M1", label: "Grandeurs et mesures" },
  { boId: "BOCE1G1", label: "Espace et geometrie" },
  { boId: "BOCE1D1", label: "Organisation et gestion de donnees" },
  { boId: "BOCE1I1", label: "Initiation a la pensee informatique" },
];
