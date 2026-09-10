import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

/**
 * ⭐ DEUX MICROS PAR NOTION, ET LA SECONDE EST LA RAISON DE LA REFONTE.
 *
 * L'ancien coach d'économie n'avait qu'UNE micro par thème — « définir les
 * termes » — et c'est ce qui lui valait d'être masqué du menu le 23/07/2026
 * (« coach pas assez fourni »). Réciter une définition et reconnaître la chose
 * dans une scène ordinaire sont deux gestes différents ; le second est celui
 * qu'on emporte hors du contrôle.
 *
 * ⛔ LES DEUX IDENTIFIANTS SONT UN CONTRAT AVEC LA BANQUE : `<notion>_def` et
 * `<notion>_situation` sont fabriqués par `banqueEconomie`
 * (lib/tutor-v4/questionBank/economieBanque.ts). En renommer un ici sans
 * l'autre rend toutes ses questions inatteignables, sans lever la moindre
 * erreur — c'est le repli silencieux habituel de cette chaîne.
 */
export const microSkills: MicroSkillSource[] = [
  // ── L'argent ────────────────────────────────────────────────────────────
  { id: "eco_a1_argent_def",         label: "Définir les mots de l'argent",            notionId: "eco_a1_argent",    prerequis: [] },
  { id: "eco_a1_argent_situation",   label: "Reconnaître un paiement dans une scène",  notionId: "eco_a1_argent",    prerequis: ["eco_a1_argent_def"] },

  // ── Le budget ───────────────────────────────────────────────────────────
  { id: "eco_a1_budget_def",         label: "Définir revenu, dépense, épargne",        notionId: "eco_a1_budget",    prerequis: ["eco_a1_argent_def"] },
  { id: "eco_a1_budget_situation",   label: "Lire un budget de famille",               notionId: "eco_a1_budget",    prerequis: ["eco_a1_budget_def"] },

  // ── Acheter ─────────────────────────────────────────────────────────────
  { id: "eco_a1_consommer_def",      label: "Définir bien, service, besoin, envie",    notionId: "eco_a1_consommer", prerequis: ["eco_a1_budget_def"] },
  { id: "eco_a1_consommer_situation", label: "Choisir entre deux offres",              notionId: "eco_a1_consommer", prerequis: ["eco_a1_consommer_def"] },
];
