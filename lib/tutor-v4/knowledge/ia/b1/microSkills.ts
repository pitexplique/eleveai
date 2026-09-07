import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // --- Notion 1 : Verifier et garder l'esprit critique ---
  { id: "ia_b1_reperer_douteux", label: "Je sais repérer une information douteuse ou inventée.", notionId: "ia_b1_verification", prerequis: [] },
  { id: "ia_b1_sources_fiables", label: "Je sais vérifier une information avec des sources fiables.", notionId: "ia_b1_verification", prerequis: ["ia_b1_reperer_douteux"] },
  { id: "ia_b1_recouper_sources", label: "Je sais croiser plusieurs sources avant de conclure.", notionId: "ia_b1_verification", prerequis: ["ia_b1_sources_fiables"] },
  { id: "ia_b1_fait_opinion_hypothese", label: "Je sais distinguer un fait, une opinion et une hypothèse.", notionId: "ia_b1_verification", prerequis: ["ia_b1_recouper_sources"] },
  { id: "ia_b1_biais_esprit_critique", label: "Je garde mon esprit critique : une IA peut être biaisée ou très persuasive.", notionId: "ia_b1_verification", prerequis: ["ia_b1_fait_opinion_hypothese"] },

  // --- Notion 2 : Securite et donnees personnelles ---
  { id: "ia_b1_donnees_personnelles", label: "Je sais ne pas partager de données personnelles sensibles avec une IA.", notionId: "ia_b1_securite", prerequis: ["ia_b1_biais_esprit_critique"] },
  { id: "ia_b1_proteger_infos", label: "Je sais quelles informations protéger (mot de passe, adresse, photos, identité).", notionId: "ia_b1_securite", prerequis: ["ia_b1_donnees_personnelles"] },
  { id: "ia_b1_deepfake_arnaque", label: "Je connais les risques de deepfakes et de manipulation des images, voix et vidéos.", notionId: "ia_b1_securite", prerequis: ["ia_b1_proteger_infos"] },
  { id: "ia_b1_arnaque_hameconnage", label: "Je sais reconnaitre une arnaque ou un hameçonnage et comment réagir.", notionId: "ia_b1_securite", prerequis: ["ia_b1_deepfake_arnaque"] },

  // --- Notion 3 : Plagiat, droits et responsabilite ---
  { id: "ia_b1_plagiat_triche", label: "Je sais distinguer aide autorisée, aide limitée, plagiat et triche.", notionId: "ia_b1_responsabilite_numerique", prerequis: ["ia_b1_arnaque_hameconnage"] },
  { id: "ia_b1_droit_auteur_citer", label: "Je sais qu'il faut respecter les droits d'auteur et citer mes sources et l'usage de l'IA.", notionId: "ia_b1_responsabilite_numerique", prerequis: ["ia_b1_plagiat_triche"] },
];
