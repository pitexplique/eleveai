import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "eco_a2_entreprise", label: "L'entreprise : produire et vendre", boId: "ECO_A2_ENTREPRISE", prerequis: [],                    levels: [2, 3] },
  { id: "eco_a2_marche",     label: "Le marché : offre et demande",      boId: "ECO_A2_MARCHE",     prerequis: ["eco_a2_entreprise"], levels: [2, 3] },
  { id: "eco_a2_travail",    label: "Le travail : salaire et contrat",   boId: "ECO_A2_TRAVAIL",    prerequis: ["eco_a2_entreprise"], levels: [2, 3] },
];
