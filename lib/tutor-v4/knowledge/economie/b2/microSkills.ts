import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

/** ⛔ `<notion>_def` et `<notion>_situation` : le contrat avec la banque
 *  (lib/tutor-v4/questionBank/economieBanque.ts). Voir a1/microSkills.ts. */
export const microSkills: MicroSkillSource[] = [
  // ── Croissance et emploi ────────────────────────────────────────────────
  { id: "eco_b2_croissance_def",       label: "Définir PIB, croissance, population active", notionId: "eco_b2_croissance", prerequis: [] },
  { id: "eco_b2_croissance_situation", label: "Lire un chiffre d'actualité",                notionId: "eco_b2_croissance", prerequis: ["eco_b2_croissance_def"] },

  // ── Monnaie et prix ─────────────────────────────────────────────────────
  { id: "eco_b2_prix_def",             label: "Définir inflation, indice, taux directeur",  notionId: "eco_b2_prix",       prerequis: ["eco_b2_croissance_def"] },
  { id: "eco_b2_prix_situation",       label: "Reconnaître un effet sur les prix",          notionId: "eco_b2_prix",       prerequis: ["eco_b2_prix_def"] },

  // ── Les choix de l'État ─────────────────────────────────────────────────
  { id: "eco_b2_politiques_def",       label: "Définir déficit, dette, relance",            notionId: "eco_b2_politiques", prerequis: ["eco_b2_prix_def"] },
  { id: "eco_b2_politiques_situation", label: "Reconnaître une mesure dans un programme",   notionId: "eco_b2_politiques", prerequis: ["eco_b2_politiques_def"] },
];
