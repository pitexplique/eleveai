// Compétences BO de mathématiques pour la classe de CM2.
// Référence : programme officiel cycle 3, BO n°16 du 17 avril 2025.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

// knowledge/maths/cm2/bo.ts

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCM2N1", label: "Nombres entiers" },
  { boId: "BOCM2N2", label: "Calculs et résolution de problèmes" },
  { boId: "BOCM2N3", label: "Fractions et nombres décimaux" },

  { boId: "BOCM2A1", label: "Algèbre" },

  { boId: "BOCM2P1", label: "Proportionnalité" },

  { boId: "BOCM2M1", label: "Grandeurs et mesures" },

  { boId: "BOCM2G1", label: "Géométrie plane" },
  { boId: "BOCM2G2", label: "Géométrie dans l’espace" },

  { boId: "BOCM2D1", label: "Données" },
  { boId: "BOCM2D2", label: "Probabilités" },

  { boId: "BOCM2I1", label: "Pensée informatique" },
];