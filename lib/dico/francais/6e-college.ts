import type { FamilleDico, MotDico } from "../types";

// ✍️ Dico Français 6e (CARTES) — notions NEUVES de 6e, la marche au-dessus du CM2.
// (À ne pas confondre avec francais/6e.ts = Dico ÉVAL nationale, autre usage.)

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsFrancais6eCollege: MotDico[] = [
  carte("6e-f-complement", "Complément", "gram-fonction", "Un mot ou groupe qui complète le verbe ou la phrase."),
  carte("6e-f-epithete", "Épithète", "gram-fonction", "Un adjectif placé juste à côté du nom qu'il précise."),
  carte("6e-f-adverbe", "Adverbe", "gram-nature", "Un mot invariable qui précise : vite, bien, hier, très."),
  carte("6e-f-preposition", "Préposition", "gram-nature", "Un petit mot invariable : à, de, pour, avec, sur."),
  carte("6e-f-passe-compose", "Passé composé", "conjugaison", "Un temps du passé formé avec avoir ou être + le participe."),
  carte("6e-f-homonyme", "Homonyme", "ortho-lexique", "Des mots qui se prononcent pareil : ver, vert, verre."),
];
