import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  { id: "ia_a1_expliquer_ia", label: "Je sais expliquer ce qu'est une intelligence artificielle avec mes mots.", notionId: "ia_a1_definition", prerequis: [] },
  { id: "ia_a1_distinguer_outils", label: "Je sais distinguer IA, moteur de recherche, calculatrice et humain.", notionId: "ia_a1_definition", prerequis: ["ia_a1_expliquer_ia"] },
  { id: "ia_a1_prediction", label: "Je comprends qu'une IA produit une r?ponse probable ? partir de donn?es et de mod?les.", notionId: "ia_a1_definition", prerequis: ["ia_a1_distinguer_outils"] },
  { id: "ia_a1_exemples_quotidiens", label: "Je connais des exemples d'IA dans la vie quotidienne et les m?tiers.", notionId: "ia_a1_usages_limites", prerequis: ["ia_a1_prediction"] },
  { id: "ia_a1_erreur_possible", label: "Je sais expliquer qu'une IA peut se tromper m?me si elle r?pond avec assurance.", notionId: "ia_a1_usages_limites", prerequis: ["ia_a1_exemples_quotidiens"] },
  { id: "ia_a1_vocabulaire_base", label: "Je connais les mots donn?e, mod?le, prompt, biais et hallucination.", notionId: "ia_a1_usages_limites", prerequis: ["ia_a1_erreur_possible"] },
];
