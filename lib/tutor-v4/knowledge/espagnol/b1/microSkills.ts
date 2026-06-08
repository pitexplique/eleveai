import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  { id: "es_b1_opinions_es_to_fr",    label: "Reconnaître opinion ES → FR",    notionId: "es_b1_opinions",    prerequis: [] },
  { id: "es_b1_opinions_fr_to_es",    label: "Donner opinion FR → ES",         notionId: "es_b1_opinions",    prerequis: ["es_b1_opinions_es_to_fr"] },
  { id: "es_b1_environment_es_to_fr", label: "Reconnaître environnement ES → FR", notionId: "es_b1_environment", prerequis: [] },
  { id: "es_b1_environment_fr_to_es", label: "Donner environnement FR → ES",   notionId: "es_b1_environment", prerequis: ["es_b1_environment_es_to_fr"] },
  { id: "es_b1_media_es_to_fr",       label: "Reconnaître médias ES → FR",     notionId: "es_b1_media",       prerequis: [] },
  { id: "es_b1_media_fr_to_es",       label: "Donner médias FR → ES",          notionId: "es_b1_media",       prerequis: ["es_b1_media_es_to_fr"] },
  { id: "es_b1_economy_es_to_fr",     label: "Reconnaître économie ES → FR",   notionId: "es_b1_economy",     prerequis: [] },
  { id: "es_b1_economy_fr_to_es",     label: "Donner économie FR → ES",        notionId: "es_b1_economy",     prerequis: ["es_b1_economy_es_to_fr"] },
  { id: "es_b1_science_es_to_fr",     label: "Reconnaître science ES → FR",    notionId: "es_b1_science",     prerequis: [] },
  { id: "es_b1_science_fr_to_es",     label: "Donner science FR → ES",         notionId: "es_b1_science",     prerequis: ["es_b1_science_es_to_fr"] },
];
