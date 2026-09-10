import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "eco_b1_fiscalite",  label: "L'impôt : qui paie quoi",                boId: "ECO_B1_FISCALITE",  prerequis: [],                    levels: [3, 4] },
  { id: "eco_b1_protection", label: "La protection sociale : cotiser, être couvert", boId: "ECO_B1_PROTECTION", prerequis: ["eco_b1_fiscalite"], levels: [3, 4] },
  { id: "eco_b1_entreprise", label: "L'entreprise et le marché, de plus près", boId: "ECO_B1_ENTREPRISE", prerequis: [],                    levels: [3, 4] },
];
