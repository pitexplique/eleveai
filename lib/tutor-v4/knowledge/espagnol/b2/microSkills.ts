import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  { id: "es_b2_geopolitics_es_to_fr", label: "Reconnaître géopolitique ES → FR",      notionId: "es_b2_geopolitics", prerequis: [] },
  { id: "es_b2_geopolitics_fr_to_es", label: "Donner géopolitique FR → ES",            notionId: "es_b2_geopolitics", prerequis: ["es_b2_geopolitics_es_to_fr"] },
  { id: "es_b2_geopolitics_listen",   label: "Écouter et identifier géopolitique 🔊",   notionId: "es_b2_geopolitics", prerequis: ["es_b2_geopolitics_es_to_fr"] },
  { id: "es_b2_literature_es_to_fr",  label: "Reconnaître littérature ES → FR",         notionId: "es_b2_literature",  prerequis: [] },
  { id: "es_b2_literature_fr_to_es",  label: "Donner littérature FR → ES",              notionId: "es_b2_literature",  prerequis: ["es_b2_literature_es_to_fr"] },
  { id: "es_b2_literature_listen",    label: "Écouter et identifier littérature 🔊",     notionId: "es_b2_literature",  prerequis: ["es_b2_literature_es_to_fr"] },
  { id: "es_b2_economics_es_to_fr",   label: "Reconnaître économie ES → FR",            notionId: "es_b2_economics",   prerequis: [] },
  { id: "es_b2_economics_fr_to_es",   label: "Donner économie FR → ES",                 notionId: "es_b2_economics",   prerequis: ["es_b2_economics_es_to_fr"] },
  { id: "es_b2_economics_listen",     label: "Écouter et identifier l'économie 🔊",      notionId: "es_b2_economics",   prerequis: ["es_b2_economics_es_to_fr"] },
  { id: "es_b2_philosophy_es_to_fr",  label: "Reconnaître philosophie ES → FR",         notionId: "es_b2_philosophy",  prerequis: [] },
  { id: "es_b2_philosophy_fr_to_es",  label: "Donner philosophie FR → ES",              notionId: "es_b2_philosophy",  prerequis: ["es_b2_philosophy_es_to_fr"] },
  { id: "es_b2_philosophy_listen",    label: "Écouter et identifier la philosophie 🔊",  notionId: "es_b2_philosophy",  prerequis: ["es_b2_philosophy_es_to_fr"] },
];
