import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // --- Notion 1 : Qu'est-ce que l'IA ? ---
  { id: "ia_a1_expliquer_ia", label: "Je sais expliquer ce qu'est une intelligence artificielle avec mes mots.", notionId: "ia_a1_definition", prerequis: [] },
  { id: "ia_a1_distinguer_outils", label: "Je sais distinguer IA, moteur de recherche, calculatrice et humain.", notionId: "ia_a1_definition", prerequis: ["ia_a1_expliquer_ia"] },
  { id: "ia_a1_reconnaitre_ia", label: "Je sais reconnaitre ou il y a de l'IA autour de moi.", notionId: "ia_a1_definition", prerequis: ["ia_a1_distinguer_outils"] },
  { id: "ia_a1_apprend_donnees", label: "Je comprends qu'une IA apprend a partir d'exemples (des donnees).", notionId: "ia_a1_definition", prerequis: ["ia_a1_reconnaitre_ia"] },
  { id: "ia_a1_prediction", label: "Je comprends qu'une IA produit une reponse probable, pas une verite garantie.", notionId: "ia_a1_definition", prerequis: ["ia_a1_apprend_donnees"] },

  // --- Notion 2 : Ce que l'IA sait faire... et ses limites ---
  { id: "ia_a1_exemples_quotidiens", label: "Je connais des exemples d'IA dans la vie quotidienne et les metiers.", notionId: "ia_a1_usages_limites", prerequis: ["ia_a1_prediction"] },
  { id: "ia_a1_erreur_possible", label: "Je sais expliquer qu'une IA peut se tromper meme si elle repond avec assurance.", notionId: "ia_a1_usages_limites", prerequis: ["ia_a1_exemples_quotidiens"] },
  { id: "ia_a1_biais_donnees", label: "Je comprends qu'une IA peut etre injuste ou biaisee selon les donnees qui l'ont entrainee.", notionId: "ia_a1_usages_limites", prerequis: ["ia_a1_erreur_possible"] },
  { id: "ia_a1_vocabulaire_base", label: "Je connais les mots donnee, modele, prompt, biais et hallucination.", notionId: "ia_a1_usages_limites", prerequis: ["ia_a1_biais_donnees"] },

  // --- Notion 3 : Mon role et l'impact de l'IA ---
  { id: "ia_a1_humain_responsable", label: "Je comprends que l'humain garde l'objectif, la verification et la decision.", notionId: "ia_a1_responsabilite_impact", prerequis: ["ia_a1_vocabulaire_base"] },
  { id: "ia_a1_energie_environnement", label: "Je comprends que l'IA consomme de l'energie et a un impact sur l'environnement.", notionId: "ia_a1_responsabilite_impact", prerequis: ["ia_a1_humain_responsable"] },
];
