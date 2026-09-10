import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "eco_b2_croissance", label: "Croissance, PIB et emploi",           boId: "ECO_B2_CROISSANCE", prerequis: [],                    levels: [4, 5] },
  { id: "eco_b2_prix",       label: "Monnaie, inflation et pouvoir d'achat", boId: "ECO_B2_PRIX",     prerequis: ["eco_b2_croissance"], levels: [4, 5] },
  { id: "eco_b2_politiques", label: "Les choix de l'État : dette et relance", boId: "ECO_B2_POLITIQUES", prerequis: ["eco_b2_prix"],   levels: [4, 5] },
];
