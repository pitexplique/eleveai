import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "es_b1_opinions",    label: "Opinions & arguments",    boId: "ESP_B1_OPINIONS",    prerequis: [], levels: [1, 2, 3] },
  { id: "es_b1_environment", label: "Environnement & société", boId: "ESP_B1_ENVIRONMENT", prerequis: [], levels: [1, 2, 3] },
  { id: "es_b1_media",       label: "Médias & culture",        boId: "ESP_B1_MEDIA",       prerequis: [], levels: [1, 2, 3] },
  { id: "es_b1_economy",     label: "Économie de base",        boId: "ESP_B1_ECONOMY",     prerequis: [], levels: [1, 2, 3] },
  { id: "es_b1_science",     label: "Sciences & technologie",  boId: "ESP_B1_SCIENCE",     prerequis: [], levels: [1, 2, 3] },
];
