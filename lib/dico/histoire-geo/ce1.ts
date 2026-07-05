import type { FamilleDico, MotDico } from "../types";

// 🗺️ Dico Histoire-Géographie CE1 — se repérer dans le temps et l'espace proche.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsHistGeoCE1: MotDico[] = [
  carte("ce1-hg-hier", "Hier", "histoire", "Le jour d'avant aujourd'hui."),
  carte("ce1-hg-aujourdhui", "Aujourd'hui", "histoire", "Le jour où l'on est."),
  carte("ce1-hg-demain", "Demain", "histoire", "Le jour d'après aujourd'hui."),
  carte("ce1-hg-annee", "Année", "histoire", "Douze mois, du 1ᵉʳ janvier au 31 décembre."),
  carte("ce1-hg-famille", "Famille", "histoire", "Les parents, les enfants, les grands-parents…"),
  carte("ce1-hg-ecole", "École", "geographie", "Le lieu où l'on apprend, avec la maîtresse ou le maître."),
  carte("ce1-hg-rue", "Rue", "geographie", "Le chemin bordé de maisons dans une ville."),
  carte("ce1-hg-maison", "Maison", "geographie", "Le bâtiment où l'on habite."),
];
