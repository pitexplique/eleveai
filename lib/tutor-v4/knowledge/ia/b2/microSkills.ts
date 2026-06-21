import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  { id: "ia_b2_prompt_structure", label: "Je sais construire un prompt avec r?le, contexte, t?che, contraintes et format attendu.", notionId: "ia_b2_prompt_avance", prerequis: [] },
  { id: "ia_b2_iteration", label: "Je sais am?liorer un r?sultat IA par it?rations successives.", notionId: "ia_b2_prompt_avance", prerequis: ["ia_b2_prompt_structure"] },
  { id: "ia_b2_choisir_version", label: "Je sais g?n?rer plusieurs versions puis choisir et justifier la meilleure.", notionId: "ia_b2_prompt_avance", prerequis: ["ia_b2_iteration"] },
  { id: "ia_b2_creer_contenu", label: "Je sais cr?er une affiche, un texte, un quiz, une image ou une pr?sentation avec l'IA.", notionId: "ia_b2_production", prerequis: ["ia_b2_choisir_version"] },
  { id: "ia_b2_prototype_simple", label: "Je sais cr?er une maquette ou un petit prototype avec l'aide de l'IA.", notionId: "ia_b2_production", prerequis: ["ia_b2_creer_contenu"] },
  { id: "ia_b2_documenter_role_ia", label: "Je sais documenter ce que l'IA a produit et ce que j'ai modifi?.", notionId: "ia_b2_production", prerequis: ["ia_b2_prototype_simple"] },
];
