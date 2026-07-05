import type { MotDico } from "../types";

// 🐾 Mes premières cartes (GS-CP) — Animaux, en IMAGES.
// L'indice est le grand emoji ; le mot reste écrit au dos (jeu oral pour les
// pré-lecteurs, association image↔mot pour les apprentis-lecteurs).

function carte(id: string, mot: string, definition: string, image: string): MotDico {
  return {
    id,
    mot,
    famille: "images-mots",
    definition,
    image,
    defi: { geste: "saisie", question: definition, reponse: mot },
  };
}

export const motsAnimauxCP: MotDico[] = [
  carte("cp-a-chat", "Chat", "L'animal qui fait « miaou ».", "🐱"),
  carte("cp-a-chien", "Chien", "L'animal qui fait « ouaf ».", "🐶"),
  carte("cp-a-vache", "Vache", "L'animal qui donne le lait.", "🐮"),
  carte("cp-a-cheval", "Cheval", "L'animal sur lequel on monte, il galope.", "🐴"),
  carte("cp-a-cochon", "Cochon", "L'animal rose de la ferme.", "🐷"),
  carte("cp-a-poisson", "Poisson", "L'animal qui vit dans l'eau.", "🐟"),
  carte("cp-a-oiseau", "Oiseau", "L'animal qui vole et fait un nid.", "🐦"),
  carte("cp-a-elephant", "Éléphant", "Le grand animal gris à la trompe.", "🐘"),
  carte("cp-a-lion", "Lion", "Le grand animal à crinière, roi des animaux.", "🦁"),
  carte("cp-a-lapin", "Lapin", "Le petit animal aux longues oreilles.", "🐰"),
];
