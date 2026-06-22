import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // --- Notion 1 : Methode : prompt avance et iteration ---
  { id: "ia_b2_prompt_structure", label: "Je sais construire un prompt avec role, contexte, tache, contraintes et format attendu.", notionId: "ia_b2_prompt_avance", prerequis: [] },
  { id: "ia_b2_iteration", label: "Je sais ameliorer un resultat IA par iterations successives.", notionId: "ia_b2_prompt_avance", prerequis: ["ia_b2_prompt_structure"] },
  { id: "ia_b2_choisir_version", label: "Je sais generer plusieurs versions puis choisir et justifier la meilleure.", notionId: "ia_b2_prompt_avance", prerequis: ["ia_b2_iteration"] },
  { id: "ia_b2_donner_exemples", label: "Je sais guider l'IA en lui montrant un exemple du style ou du resultat attendu.", notionId: "ia_b2_prompt_avance", prerequis: ["ia_b2_choisir_version"] },

  // --- Notion 2 : Production creative ---
  { id: "ia_b2_creer_contenu", label: "Je sais creer une affiche, un texte, un quiz, une image ou une presentation avec l'IA.", notionId: "ia_b2_production", prerequis: ["ia_b2_donner_exemples"] },
  { id: "ia_b2_prototype_simple", label: "Je sais creer une maquette ou un petit prototype avec l'aide de l'IA.", notionId: "ia_b2_production", prerequis: ["ia_b2_creer_contenu"] },
  { id: "ia_b2_adapter_public", label: "Je sais adapter ma production a un public et a un objectif (ton, niveau, longueur).", notionId: "ia_b2_production", prerequis: ["ia_b2_prototype_simple"] },

  // --- Notion 3 : Qualite, verification et responsabilite ---
  { id: "ia_b2_verifier_ameliorer", label: "Je sais verifier et corriger une production de l'IA (faits, qualite) avant de la diffuser.", notionId: "ia_b2_qualite_responsabilite", prerequis: ["ia_b2_adapter_public"] },
  { id: "ia_b2_documenter_role_ia", label: "Je sais documenter ce que l'IA a produit et ce que j'ai modifie.", notionId: "ia_b2_qualite_responsabilite", prerequis: ["ia_b2_verifier_ameliorer"] },
  { id: "ia_b2_droits_contenu", label: "Je sais qu'un contenu cree avec l'IA pose des questions de droits et de mentions.", notionId: "ia_b2_qualite_responsabilite", prerequis: ["ia_b2_documenter_role_ia"] },
  { id: "ia_b2_eviter_desinfo", label: "Je sais ne pas creer ni diffuser de contenu trompeur (fausses images, desinformation).", notionId: "ia_b2_qualite_responsabilite", prerequis: ["ia_b2_droits_contenu"] },
];
