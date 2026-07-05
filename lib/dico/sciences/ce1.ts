import type { FamilleDico, MotDico } from "../types";

// 🔬 Dico Sciences CE1 — questionner le monde, la marche au-dessus du GS-CP.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsSciencesCE1: MotDico[] = [
  carte("ce1-s-soleil", "Soleil", "sciences-matiere", "L'astre qui éclaire et réchauffe la journée."),
  carte("ce1-s-lune", "Lune", "sciences-matiere", "L'astre qu'on voit briller la nuit."),
  carte("ce1-s-etoile", "Étoile", "sciences-matiere", "Un petit point qui brille dans le ciel la nuit."),
  carte("ce1-s-saison", "Saison", "sciences-matiere", "Le printemps, l'été, l'automne ou l'hiver."),
  carte("ce1-s-eau", "Eau", "sciences-matiere", "Le liquide qu'on boit et qui remplit la mer."),
  carte("ce1-s-air", "Air", "sciences-matiere", "Le gaz invisible qu'on respire."),
  carte("ce1-s-fleur", "Fleur", "sciences-vivant", "La partie colorée de la plante qui sent bon."),
  carte("ce1-s-fruit", "Fruit", "sciences-vivant", "Ce que donne la plante et qu'on mange : pomme, cerise."),
];
