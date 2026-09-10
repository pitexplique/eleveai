import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

/**
 * ⚠️ L'ORDRE DES PRÉREQUIS DIT LA PROGRESSION : on paie avant de tenir un
 * budget, on tient un budget avant de comparer deux étiquettes en connaissance
 * de cause. Le coach s'en sert pour proposer la suite.
 */
export const notions: NotionSource[] = [
  { id: "eco_a1_argent",    label: "L'argent : payer et échanger",        boId: "ECO_A1_ARGENT",    prerequis: [],                 levels: [1, 2] },
  { id: "eco_a1_budget",    label: "Le budget : ce qui rentre, ce qui sort", boId: "ECO_A1_BUDGET", prerequis: ["eco_a1_argent"],  levels: [1, 2] },
  { id: "eco_a1_consommer", label: "Acheter : besoin, envie, comparer",   boId: "ECO_A1_CONSOMMER", prerequis: ["eco_a1_budget"],  levels: [1, 2] },
];
