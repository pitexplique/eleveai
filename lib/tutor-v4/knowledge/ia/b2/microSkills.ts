import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  { id: "ia_b2_prompt_structure", label: "Je sais construire un prompt avec role, contexte, tache, contraintes et format attendu.", notionId: "ia_b2_prompt_avance", prerequis: [] },
  { id: "ia_b2_iteration", label: "Je sais ameliorer un resultat IA par iterations successives.", notionId: "ia_b2_prompt_avance", prerequis: ["ia_b2_prompt_structure"] },
  { id: "ia_b2_choisir_version", label: "Je sais generer plusieurs versions puis choisir et justifier la meilleure.", notionId: "ia_b2_prompt_avance", prerequis: ["ia_b2_iteration"] },
  { id: "ia_b2_creer_contenu", label: "Je sais creer une affiche, un texte, un quiz, une image ou une presentation avec l'IA.", notionId: "ia_b2_production", prerequis: ["ia_b2_choisir_version"] },
  { id: "ia_b2_prototype_simple", label: "Je sais creer une maquette ou un petit prototype avec l'aide de l'IA.", notionId: "ia_b2_production", prerequis: ["ia_b2_creer_contenu"] },
  { id: "ia_b2_documenter_role_ia", label: "Je sais documenter ce que l'IA a produit et ce que j'ai modifie.", notionId: "ia_b2_production", prerequis: ["ia_b2_prototype_simple"] },
];
