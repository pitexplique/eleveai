import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

// Cinq grandes parties du programme officiel de seconde (BO)
// + le vocabulaire ensembliste et logique (section transversale du programme).
export const bo: KnowledgeBoCompetence[] = [
  { boId: "BO2N1", label: "Nombres et calculs" },
  { boId: "BO2G1", label: "Geometrie" },
  { boId: "BO2F1", label: "Fonctions" },
  { boId: "BO2D1", label: "Statistiques et probabilites" },
  { boId: "BO2I1", label: "Algorithmique et programmation" },
  { boId: "BO2L1", label: "Vocabulaire ensembliste et logique" },
];
