import type { FamilleDico, MotDico } from "../types";

// ✍️ Dico Français 5e (CARTES) — la marche au-dessus de la 6e.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsFrancais5e: MotDico[] = [
  carte("5e-f-cod", "COD", "gram-fonction", "Le complément d'objet direct, sans préposition : « il mange une pomme »."),
  carte("5e-f-coi", "COI", "gram-fonction", "Le complément d'objet indirect, avec préposition : « il parle à Léa »."),
  carte("5e-f-attribut", "Attribut", "gram-fonction", "Ce qui décrit le sujet après le verbe être : « il est content »."),
  carte("5e-f-subordonnee", "Subordonnée", "gram-fonction", "Une proposition qui dépend d'une autre : « je crois qu'il pleut »."),
  carte("5e-f-comparaison", "Comparaison", "texte", "Une image avec « comme » : fort comme un lion."),
  carte("5e-f-conte", "Conte", "texte", "Un récit merveilleux, souvent avec une morale."),
];
