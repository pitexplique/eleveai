import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ── Entreprise ───────────────────────────────────────────────────────────────
  { id: "eco_4e_entreprise_def",   label: "Définir les termes de l'entreprise",  notionId: "eco_4e_entreprise", prerequis: [] },

  // ── Marché ────────────────────────────────────────────────────────────────────
  { id: "eco_4e_marche_def",       label: "Définir offre, demande, prix",        notionId: "eco_4e_marche",     prerequis: ["eco_4e_entreprise_def"] },

  // ── Travail & Emploi ─────────────────────────────────────────────────────────
  { id: "eco_4e_travail_def",      label: "Définir salaire, chômage, contrat",   notionId: "eco_4e_travail",    prerequis: [] },

  // ── Monnaie ───────────────────────────────────────────────────────────────────
  { id: "eco_4e_monnaie_def",      label: "Définir inflation, pouvoir d'achat",  notionId: "eco_4e_monnaie",    prerequis: [] },

  // ── Budget ────────────────────────────────────────────────────────────────────
  { id: "eco_4e_budget_def",       label: "Définir revenus, dépenses, épargne",  notionId: "eco_4e_budget",     prerequis: ["eco_4e_monnaie_def"] },

  // ── Fiscalité ─────────────────────────────────────────────────────────────────
  { id: "eco_4e_fiscalite_def",    label: "Définir impôt, TVA, redistribution",  notionId: "eco_4e_fiscalite",  prerequis: ["eco_4e_budget_def"] },

  // ── Élections ─────────────────────────────────────────────────────────────────
  { id: "eco_4e_elections_def",    label: "Comprendre déficit, dette, programme", notionId: "eco_4e_elections",  prerequis: ["eco_4e_fiscalite_def"] },
];
