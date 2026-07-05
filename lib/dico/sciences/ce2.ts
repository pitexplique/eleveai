import type { FamilleDico, MotDico } from "../types";

// 🔬 Dico Sciences CE2 — le vivant de plus près, la marche au-dessus du CE1.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsSciencesCE2: MotDico[] = [
  carte("ce2-s-feuille", "Feuille", "sciences-vivant", "La partie plate et verte d'une plante."),
  carte("ce2-s-tige", "Tige", "sciences-vivant", "La partie de la plante qui porte les feuilles."),
  carte("ce2-s-insecte", "Insecte", "sciences-vivant", "Un petit animal à six pattes : fourmi, abeille."),
  carte("ce2-s-papillon", "Papillon", "sciences-vivant", "L'insecte aux grandes ailes colorées."),
  carte("ce2-s-nid", "Nid", "sciences-vivant", "La maison que l'oiseau construit pour ses œufs."),
  carte("ce2-s-oeuf", "Œuf", "sciences-vivant", "Ce que pond la poule ou l'oiseau."),
  carte("ce2-s-chaud", "Chaud", "sciences-matiere", "Une température élevée, comme en été."),
  carte("ce2-s-froid", "Froid", "sciences-matiere", "Une température basse, comme en hiver."),
];
