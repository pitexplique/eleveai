import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ── Entreprise ───────────────────────────────────────────────────────────────
  { id: "eco_4e_entreprise_def",   label: "Définir les termes de l'entreprise",  notionId: "eco_4e_entreprise", prerequis: [] },
  { id: "eco_4e_entreprise_appli", label: "Appliquer : calcul de profit",        notionId: "eco_4e_entreprise", prerequis: ["eco_4e_entreprise_def"] },

  // ── Marché ────────────────────────────────────────────────────────────────────
  { id: "eco_4e_marche_def",       label: "Définir offre, demande, prix",        notionId: "eco_4e_marche",     prerequis: ["eco_4e_entreprise_def"] },
  { id: "eco_4e_marche_appli",     label: "Analyser une situation de marché",    notionId: "eco_4e_marche",     prerequis: ["eco_4e_marche_def"] },

  // ── Travail & Emploi ─────────────────────────────────────────────────────────
  { id: "eco_4e_travail_def",      label: "Définir salaire, chômage, contrat",   notionId: "eco_4e_travail",    prerequis: [] },
  { id: "eco_4e_travail_appli",    label: "Calculer un salaire net/brut",        notionId: "eco_4e_travail",    prerequis: ["eco_4e_travail_def"] },

  // ── Monnaie ───────────────────────────────────────────────────────────────────
  { id: "eco_4e_monnaie_def",      label: "Définir inflation, pouvoir d'achat",  notionId: "eco_4e_monnaie",    prerequis: [] },
  { id: "eco_4e_monnaie_appli",    label: "Calculer un taux d'inflation",        notionId: "eco_4e_monnaie",    prerequis: ["eco_4e_monnaie_def"] },

  // ── Budget ────────────────────────────────────────────────────────────────────
  { id: "eco_4e_budget_def",       label: "Définir revenus, dépenses, épargne",  notionId: "eco_4e_budget",     prerequis: ["eco_4e_monnaie_def"] },
  { id: "eco_4e_budget_appli",     label: "Construire un budget équilibré",      notionId: "eco_4e_budget",     prerequis: ["eco_4e_budget_def"] },

  // ── Fiscalité ─────────────────────────────────────────────────────────────────
  { id: "eco_4e_fiscalite_def",    label: "Définir impôt, TVA, redistribution",  notionId: "eco_4e_fiscalite",  prerequis: ["eco_4e_budget_def"] },
  { id: "eco_4e_fiscalite_appli",  label: "Calculer une TVA, un impôt",         notionId: "eco_4e_fiscalite",  prerequis: ["eco_4e_fiscalite_def"] },

  // ── Élections ─────────────────────────────────────────────────────────────────
  { id: "eco_4e_elections_def",    label: "Comprendre déficit, dette, programme", notionId: "eco_4e_elections",  prerequis: ["eco_4e_fiscalite_def"] },
  { id: "eco_4e_elections_appli",  label: "Analyser un programme économique",    notionId: "eco_4e_elections",  prerequis: ["eco_4e_elections_def"] },
];
