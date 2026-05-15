// Compétences BO de mathématiques pour la classe de CM1.
// Référence : programme officiel cycle 3, BO n°16 du 17 avril 2025.

// lib/tutor-v4/knowledge/maths/cm1/bo.ts

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCM1N1", label: "Nombres entiers" },
  { boId: "BOCM1N2", label: "Calculs et résolution de problèmes" },
  { boId: "BOCM1N3", label: "Fractions et nombres décimaux" },

  { boId: "BOCM1A1", label: "Algèbre" },

  { boId: "BOCM1P1", label: "Proportionnalité" },

  { boId: "BOCM1M1", label: "Grandeurs et mesures" },

  { boId: "BOCM1G1", label: "Géométrie plane" },
  { boId: "BOCM1G2", label: "Géométrie dans l’espace" },

  { boId: "BOCM1D1", label: "Données" },
  { boId: "BOCM1D2", label: "Probabilités" },

  { boId: "BOCM1I1", label: "Pensée informatique" },
];