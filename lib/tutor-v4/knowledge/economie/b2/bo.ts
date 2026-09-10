import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

/**
 * B2 — L'ÉCONOMIE DU PAYS.
 *
 * Le dernier palier change d'échelle : on ne parle plus d'un porte-monnaie ni
 * d'une entreprise mais d'un pays entier — ce qu'il produit, ce que ses prix
 * font, et les choix que ses dirigeants annoncent en campagne.
 *
 * ⭐ C'EST LE PALIER QUI REND LE JOURNAL TÉLÉVISÉ LISIBLE, et c'est son critère
 * d'acceptation : chaque mot de ces trois notions se rencontre dans un titre
 * d'actualité ordinaire. Un élève qui les tient peut suivre un débat sans
 * qu'on lui traduise.
 *
 * ⚠️ Voir la note de a1/bo.ts sur le mot « BO ».
 */
export const bo: KnowledgeBoCompetence[] = [
  { boId: "ECO_B2_CROISSANCE", label: "Croissance et emploi — PIB, chômage, échanges" },
  { boId: "ECO_B2_PRIX",       label: "Monnaie et prix — inflation, pouvoir d'achat" },
  { boId: "ECO_B2_POLITIQUES", label: "Les choix de l'État — dette, relance, élections" },
];
