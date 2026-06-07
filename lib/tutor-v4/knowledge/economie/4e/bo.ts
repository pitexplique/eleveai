import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  // ── Entreprise ───────────────────────────────────────────────────────────────
  { boId: "ECO_4E_ENTREPRISE",       label: "L'entreprise — production & profit" },
  { boId: "ECO_4E_MARCHE",           label: "Le marché — offre & demande" },

  // ── Travail & Emploi ─────────────────────────────────────────────────────────
  { boId: "ECO_4E_TRAVAIL",          label: "Travail & emploi — salaire, chômage" },

  // ── Monnaie & Budget ─────────────────────────────────────────────────────────
  { boId: "ECO_4E_MONNAIE",          label: "Monnaie — inflation, pouvoir d'achat" },
  { boId: "ECO_4E_BUDGET",           label: "Budget — épargne, dépenses, revenus" },

  // ── Fiscalité ────────────────────────────────────────────────────────────────
  { boId: "ECO_4E_FISCALITE",        label: "Fiscalité — impôts, TVA, redistribution" },

  // ── Actualité — Élections ────────────────────────────────────────────────────
  { boId: "ECO_4E_ELECTIONS",        label: "Actualité — Élections & programme économique" },
];
