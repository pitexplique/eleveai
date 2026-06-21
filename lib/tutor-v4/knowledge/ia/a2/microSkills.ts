import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  { id: "ia_a2_prompt_clair", label: "Je sais ecrire un prompt simple, clair et oriente vers un objectif.", notionId: "ia_a2_prompts", prerequis: [] },
  { id: "ia_a2_contexte_niveau", label: "Je sais donner un contexte et demander une reponse adaptee a mon niveau.", notionId: "ia_a2_prompts", prerequis: ["ia_a2_prompt_clair"] },
  { id: "ia_a2_expliquer_autrement", label: "Je sais demander a l'IA d'expliquer une notion autrement.", notionId: "ia_a2_prompts", prerequis: ["ia_a2_contexte_niveau"] },
  { id: "ia_a2_fiche_revision", label: "Je sais utiliser l'IA pour creer une fiche de revision.", notionId: "ia_a2_reviser", prerequis: ["ia_a2_expliquer_autrement"] },
  { id: "ia_a2_quiz_entrainement", label: "Je sais demander un quiz pour m'entrainer.", notionId: "ia_a2_reviser", prerequis: ["ia_a2_fiche_revision"] },
  { id: "ia_a2_aide_sans_triche", label: "Je sais demander une aide ou une correction sans deleguer ma pensee.", notionId: "ia_a2_reviser", prerequis: ["ia_a2_quiz_entrainement"] },
];
