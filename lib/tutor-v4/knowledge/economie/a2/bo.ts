import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

/**
 * A2 — PRODUIRE, VENDRE, TRAVAILLER.
 *
 * Le palier où l'on sort de son porte-monnaie : il y a désormais quelqu'un en
 * face — une entreprise qui produit, un marché où deux volontés se
 * rencontrent, un contrat qui lie un salarié à un employeur.
 *
 * ⚠️ Voir la note de a1/bo.ts sur le mot « BO » : l'économie n'est au
 * programme d'aucune classe avant le lycée, ces compétences ne citent donc
 * aucun bulletin officiel.
 */
export const bo: KnowledgeBoCompetence[] = [
  { boId: "ECO_A2_ENTREPRISE", label: "L'entreprise — produire, vendre, gagner" },
  { boId: "ECO_A2_MARCHE",     label: "Le marché — offre, demande, prix" },
  { boId: "ECO_A2_TRAVAIL",    label: "Le travail — salaire, contrat, emploi" },
];
