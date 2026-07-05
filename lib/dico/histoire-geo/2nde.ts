import type { FamilleDico, MotDico } from "../types";

// 🗺️ Dico Histoire-Géographie 2nde (CARTES) — Renaissance à Révolution, environnement.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsHistGeo2nde: MotDico[] = [
  carte("2nde-hg-humanisme", "Humanisme", "histoire", "Le mouvement de la Renaissance qui place l'homme au centre."),
  carte("2nde-hg-monarchie-absolue", "Monarchie absolue", "histoire", "Un roi qui détient tous les pouvoirs, comme Louis XIV."),
  carte("2nde-hg-developpement-durable", "Développement durable", "geographie", "Répondre aux besoins sans épuiser la planète."),
  carte("2nde-hg-ressource", "Ressource", "geographie", "Ce que la nature offre et qu'on exploite : eau, pétrole."),
  carte("2nde-hg-metropolisation", "Métropolisation", "geographie", "La concentration des populations dans les grandes villes."),
  carte("2nde-hg-emigration", "Émigration", "geographie", "Quitter son pays pour s'installer ailleurs."),
];
