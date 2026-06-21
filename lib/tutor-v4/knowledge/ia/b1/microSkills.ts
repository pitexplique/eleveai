import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  { id: "ia_b1_reperer_douteux", label: "Je sais rep?rer une information douteuse ou invent?e.", notionId: "ia_b1_verification", prerequis: [] },
  { id: "ia_b1_sources_fiables", label: "Je sais v?rifier une information avec des sources fiables.", notionId: "ia_b1_verification", prerequis: ["ia_b1_reperer_douteux"] },
  { id: "ia_b1_fait_opinion_hypothese", label: "Je sais distinguer un fait, une opinion et une hypoth?se.", notionId: "ia_b1_verification", prerequis: ["ia_b1_sources_fiables"] },
  { id: "ia_b1_donnees_personnelles", label: "Je sais ne pas partager de donn?es personnelles sensibles avec une IA.", notionId: "ia_b1_securite", prerequis: ["ia_b1_fait_opinion_hypothese"] },
  { id: "ia_b1_deepfake_arnaque", label: "Je connais les risques de deepfakes, d'arnaques et de manipulation.", notionId: "ia_b1_securite", prerequis: ["ia_b1_donnees_personnelles"] },
  { id: "ia_b1_plagiat_triche", label: "Je sais distinguer aide autoris?e, aide limite, plagiat et triche.", notionId: "ia_b1_securite", prerequis: ["ia_b1_deepfake_arnaque"] },
];
