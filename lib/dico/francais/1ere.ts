import type { FamilleDico, MotDico } from "../types";

// ✍️ Dico Français 1re (CARTES) — bac de français, au-dessus de la Seconde.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsFrancais1ere: MotDico[] = [
  carte("1ere-f-romantisme", "Romantisme", "texte", "Un mouvement du XIXᵉ siècle qui exalte les sentiments."),
  carte("1ere-f-realisme", "Réalisme", "texte", "Un mouvement qui peint la réalité telle qu'elle est."),
  carte("1ere-f-antithese", "Antithèse", "texte", "Rapprocher deux mots ou deux idées opposés."),
  carte("1ere-f-oxymore", "Oxymore", "texte", "Unir deux mots contradictoires : « une obscure clarté »."),
  carte("1ere-f-dissertation", "Dissertation", "texte", "Un devoir argumenté qui répond à une question."),
  carte("1ere-f-commentaire", "Commentaire", "texte", "L'analyse détaillée et organisée d'un texte."),
];
