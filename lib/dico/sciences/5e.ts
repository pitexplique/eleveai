import type { FamilleDico, MotDico } from "../types";

// 🔬 Dico Sciences 5e (CARTES) — SVT + début Physique-Chimie, au-dessus de la 6e.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsSciences5e: MotDico[] = [
  carte("5e-s-circulation", "Circulation", "sciences-vivant", "Le trajet du sang dans le corps, poussé par le cœur."),
  carte("5e-s-poumon", "Poumon", "sciences-vivant", "L'organe qui fait entrer l'air quand on respire."),
  carte("5e-s-reproduction", "Reproduction", "sciences-vivant", "La façon dont les êtres vivants ont des petits."),
  carte("5e-s-melange", "Mélange", "sciences-matiere", "Plusieurs matières mêlées : l'eau et le sirop."),
  carte("5e-s-atome", "Atome", "sciences-matiere", "Le plus petit grain qui compose la matière."),
  carte("5e-s-tension", "Tension", "sciences-matiere", "Ce qui « pousse » le courant électrique, mesuré en volts."),
];
