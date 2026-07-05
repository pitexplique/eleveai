import type { FamilleDico, MotDico } from "../types";

// ✍️ Dico Français CE2 — la marche au-dessus du CE1, sous le CM1.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsFrancaisCE2: MotDico[] = [
  carte("ce2-f-recit", "Récit", "texte", "Un texte qui raconte une histoire."),
  carte("ce2-f-personnage", "Personnage", "texte", "Quelqu'un qui vit l'histoire dans un livre."),
  carte("ce2-f-poesie", "Poésie", "texte", "Un texte avec des vers et souvent des rimes."),
  carte("ce2-f-texte", "Texte", "texte", "Un ensemble de phrases qui vont ensemble."),
  carte("ce2-f-resume", "Résumé", "texte", "Raconter une histoire en plus court."),
  carte("ce2-f-bulle", "Bulle", "texte", "Dans une BD, la forme qui contient les paroles."),
  carte("ce2-f-devinette", "Devinette", "texte", "Une petite énigme à deviner."),
  carte("ce2-f-ordre-alpha", "Ordre alphabétique", "ortho-lexique", "Ranger les mots dans l'ordre de l'alphabet."),
];
