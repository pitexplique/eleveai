import type { FamilleDico, MotDico } from "../types";

// 🗺️ Dico Histoire-Géographie CE2 — le temps plus long, l'espace plus large.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsHistGeoCE2: MotDico[] = [
  carte("ce2-hg-autrefois", "Autrefois", "histoire", "Il y a très longtemps, dans le passé."),
  carte("ce2-hg-generation", "Génération", "histoire", "Les gens nés à peu près à la même époque."),
  carte("ce2-hg-metier", "Métier", "geographie", "Le travail qu'une personne fait : boulanger, pompier."),
  carte("ce2-hg-pays", "Pays", "geographie", "Un grand territoire avec des frontières : la France."),
  carte("ce2-hg-region", "Région", "geographie", "Une partie d'un pays : La Réunion, la Bretagne."),
  carte("ce2-hg-mer", "Mer", "geographie", "Une grande étendue d'eau salée, plus petite qu'un océan."),
  carte("ce2-hg-plage", "Plage", "geographie", "Le bord de mer couvert de sable."),
  carte("ce2-hg-ile", "Île", "geographie", "Une terre entourée d'eau de tous les côtés."),
];
