// Compétences BO de mathématiques pour la classe de CE2.
// Référence : programme officiel de mathématiques du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.

// lib/tutor-v4/knowledge/maths/ce2/bo.ts

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCE2N1", label: "Nombres entiers jusqu'à 10 000" },
  { boId: "BOCE2C1", label: "Calcul et automatismes" },
  { boId: "BOCE2F1", label: "Fractions" },
  { boId: "BOCE2P1", label: "Résolution de problèmes" },
  { boId: "BOCE2M1", label: "Grandeurs et mesures" },
  { boId: "BOCE2G1", label: "Espace et géométrie" },
  { boId: "BOCE2D1", label: "Organisation et gestion de données" },
  // ⚠️ Le programme cycle 2 ne comporte pas de domaine « pensée informatique »
  // au CE2 : coder un déplacement est un attendu du CP et du CE1. On garde la
  // compétence en consolidation, à trancher.
  { boId: "BOCE2I1", label: "Programmes et déplacements codés (consolidation)" },
];
