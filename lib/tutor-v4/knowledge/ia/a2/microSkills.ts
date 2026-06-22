import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // --- Notion 1 : Ecrire un bon prompt ---
  { id: "ia_a2_prompt_clair", label: "Je sais ecrire un prompt simple, clair et oriente vers un objectif.", notionId: "ia_a2_prompts", prerequis: [] },
  { id: "ia_a2_contexte_niveau", label: "Je sais donner un contexte et demander une reponse adaptee a mon niveau.", notionId: "ia_a2_prompts", prerequis: ["ia_a2_prompt_clair"] },
  { id: "ia_a2_expliquer_autrement", label: "Je sais demander a l'IA d'expliquer une notion autrement.", notionId: "ia_a2_prompts", prerequis: ["ia_a2_contexte_niveau"] },
  { id: "ia_a2_reformuler_relancer", label: "Je sais reformuler ou preciser ma demande si la reponse ne convient pas.", notionId: "ia_a2_prompts", prerequis: ["ia_a2_expliquer_autrement"] },
  { id: "ia_a2_exemple_format", label: "Je sais demander un exemple ou un format precis (liste, tableau, etapes).", notionId: "ia_a2_prompts", prerequis: ["ia_a2_reformuler_relancer"] },

  // --- Notion 2 : Reviser et s'entrainer avec l'IA ---
  { id: "ia_a2_fiche_revision", label: "Je sais utiliser l'IA pour creer une fiche de revision.", notionId: "ia_a2_reviser", prerequis: ["ia_a2_exemple_format"] },
  { id: "ia_a2_quiz_entrainement", label: "Je sais demander un quiz pour m'entrainer.", notionId: "ia_a2_reviser", prerequis: ["ia_a2_fiche_revision"] },
  { id: "ia_a2_faire_expliquer_erreur", label: "Je sais demander a l'IA d'expliquer mon erreur pour comprendre.", notionId: "ia_a2_reviser", prerequis: ["ia_a2_quiz_entrainement"] },
  { id: "ia_a2_aide_sans_triche", label: "Je sais demander une aide ou une correction sans deleguer ma pensee.", notionId: "ia_a2_reviser", prerequis: ["ia_a2_faire_expliquer_erreur"] },

  // --- Notion 3 : Apprendre vraiment, sans tricher ---
  { id: "ia_a2_integrite_triche", label: "Je sais utiliser l'IA pour apprendre, pas pour copier a sa place.", notionId: "ia_a2_apprendre_honnete", prerequis: ["ia_a2_aide_sans_triche"] },
  { id: "ia_a2_verifier_avant_utiliser", label: "Je sais verifier une reponse de l'IA avant de l'utiliser.", notionId: "ia_a2_apprendre_honnete", prerequis: ["ia_a2_integrite_triche"] },
];
