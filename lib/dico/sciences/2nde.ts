import type { FamilleDico, MotDico } from "../types";

// 🔬 Dico Sciences 2nde (CARTES) — chimie, physique, SVT, au-dessus de la 3e.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsSciences2nde: MotDico[] = [
  carte("2nde-s-molecule", "Molécule", "sciences-matiere", "Un assemblage de plusieurs atomes."),
  carte("2nde-s-mole", "Mole", "sciences-matiere", "L'unité de quantité de matière en chimie."),
  carte("2nde-s-force", "Force", "sciences-matiere", "Une action capable de modifier le mouvement d'un objet."),
  carte("2nde-s-densite", "Densité", "sciences-matiere", "La masse d'un corps comparée à son volume."),
  carte("2nde-s-ecosysteme", "Écosystème", "sciences-vivant", "Un milieu et l'ensemble des êtres vivants qui y vivent."),
  carte("2nde-s-biodiversite", "Biodiversité", "sciences-vivant", "La variété des espèces vivantes."),
];
