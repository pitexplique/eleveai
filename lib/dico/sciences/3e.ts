import type { FamilleDico, MotDico } from "../types";

// 🔬 Dico Sciences 3e (CARTES) — génétique, gravitation, chimie, au-dessus de la 4e.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsSciences3e: MotDico[] = [
  carte("3e-s-gene", "Gène", "sciences-vivant", "Il porte une information héréditaire, transmise par les parents."),
  carte("3e-s-adn", "ADN", "sciences-vivant", "La molécule qui contient tous les gènes."),
  carte("3e-s-heredite", "Hérédité", "sciences-vivant", "La transmission des caractères des parents aux enfants."),
  carte("3e-s-gravitation", "Gravitation", "sciences-matiere", "La force qui attire les objets, comme vers la Terre."),
  carte("3e-s-ion", "Ion", "sciences-matiere", "Un atome qui a gagné ou perdu des charges électriques."),
  carte("3e-s-systeme-solaire", "Système solaire", "sciences-matiere", "Le Soleil et les planètes qui tournent autour de lui."),
];
