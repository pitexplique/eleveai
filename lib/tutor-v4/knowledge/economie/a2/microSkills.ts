import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

/** ⛔ `<notion>_def` et `<notion>_situation` : le contrat avec la banque. Voir
 *  la note de a1/microSkills.ts — renommer l'un sans l'autre rend toutes ses
 *  questions inatteignables, et sans lever la moindre erreur. */
export const microSkills: MicroSkillSource[] = [
  // ── L'entreprise ────────────────────────────────────────────────────────
  { id: "eco_a2_entreprise_def",       label: "Définir les mots de l'entreprise",       notionId: "eco_a2_entreprise", prerequis: [] },
  { id: "eco_a2_entreprise_situation", label: "Reconnaître un coût, une recette",       notionId: "eco_a2_entreprise", prerequis: ["eco_a2_entreprise_def"] },

  // ── Le marché ───────────────────────────────────────────────────────────
  { id: "eco_a2_marche_def",           label: "Définir offre, demande, prix",           notionId: "eco_a2_marche",     prerequis: ["eco_a2_entreprise_def"] },
  { id: "eco_a2_marche_situation",     label: "Lire une scène de marché",               notionId: "eco_a2_marche",     prerequis: ["eco_a2_marche_def"] },

  // ── Le travail ──────────────────────────────────────────────────────────
  { id: "eco_a2_travail_def",          label: "Définir salaire, contrat, chômage",      notionId: "eco_a2_travail",    prerequis: ["eco_a2_entreprise_def"] },
  { id: "eco_a2_travail_situation",    label: "Reconnaître une situation d'emploi",     notionId: "eco_a2_travail",    prerequis: ["eco_a2_travail_def"] },
];
