import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

/** ⛔ `<notion>_def` et `<notion>_situation` : le contrat avec la banque
 *  (lib/tutor-v4/questionBank/economieBanque.ts). Voir a1/microSkills.ts. */
export const microSkills: MicroSkillSource[] = [
  // ── L'impôt ─────────────────────────────────────────────────────────────
  { id: "eco_b1_fiscalite_def",         label: "Définir impôt, TVA, redistribution",      notionId: "eco_b1_fiscalite",  prerequis: [] },
  { id: "eco_b1_fiscalite_situation",   label: "Reconnaître un prélèvement",              notionId: "eco_b1_fiscalite",  prerequis: ["eco_b1_fiscalite_def"] },

  // ── La protection sociale ───────────────────────────────────────────────
  { id: "eco_b1_protection_def",        label: "Définir cotisation, couverture, retraite", notionId: "eco_b1_protection", prerequis: ["eco_b1_fiscalite_def"] },
  { id: "eco_b1_protection_situation",  label: "Dire qui paie quand un risque arrive",    notionId: "eco_b1_protection", prerequis: ["eco_b1_protection_def"] },

  // ── L'entreprise et le marché ───────────────────────────────────────────
  { id: "eco_b1_entreprise_def",        label: "Définir valeur ajoutée, monopole, marge", notionId: "eco_b1_entreprise", prerequis: [] },
  { id: "eco_b1_entreprise_situation",  label: "Repérer un marché qui ne joue plus",      notionId: "eco_b1_entreprise", prerequis: ["eco_b1_entreprise_def"] },
];
