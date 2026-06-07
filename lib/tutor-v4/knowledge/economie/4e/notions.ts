import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "eco_4e_entreprise", label: "L'entreprise",         boId: "ECO_4E_ENTREPRISE", prerequis: [],                    levels: [1, 2] },
  { id: "eco_4e_marche",     label: "Le marché",            boId: "ECO_4E_MARCHE",     prerequis: ["eco_4e_entreprise"], levels: [1, 2] },
  { id: "eco_4e_travail",    label: "Travail & emploi",     boId: "ECO_4E_TRAVAIL",    prerequis: [],                    levels: [1, 2] },
  { id: "eco_4e_monnaie",    label: "Monnaie & prix",       boId: "ECO_4E_MONNAIE",    prerequis: [],                    levels: [1, 2] },
  { id: "eco_4e_budget",     label: "Budget personnel",     boId: "ECO_4E_BUDGET",     prerequis: ["eco_4e_monnaie"],    levels: [1, 2] },
  { id: "eco_4e_fiscalite",  label: "Fiscalité",            boId: "ECO_4E_FISCALITE",  prerequis: ["eco_4e_budget"],     levels: [1, 2] },
  { id: "eco_4e_elections",  label: "Élections & économie", boId: "ECO_4E_ELECTIONS",  prerequis: ["eco_4e_fiscalite"],  levels: [1, 2] },
];
