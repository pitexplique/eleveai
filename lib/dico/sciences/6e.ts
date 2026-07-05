import type { FamilleDico, MotDico } from "../types";

// 🔬 Dico Sciences (SVT) 6e (CARTES) — le vivant et son milieu, au-dessus du CM2.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsSciences6e: MotDico[] = [
  carte("6e-s-cellule", "Cellule", "sciences-vivant", "La plus petite unité qui compose tous les êtres vivants."),
  carte("6e-s-espece", "Espèce", "sciences-vivant", "Un groupe d'êtres vivants qui se ressemblent et se reproduisent entre eux."),
  carte("6e-s-habitat", "Habitat", "sciences-vivant", "Le milieu où vit un être vivant."),
  carte("6e-s-chaine-alimentaire", "Chaîne alimentaire", "sciences-vivant", "Qui mange qui : l'herbe, puis le lapin, puis le renard."),
  carte("6e-s-vertebre", "Vertébré", "sciences-vivant", "Un animal qui a une colonne vertébrale."),
  carte("6e-s-environnement", "Environnement", "sciences-vivant", "Tout ce qui entoure un être vivant."),
];
