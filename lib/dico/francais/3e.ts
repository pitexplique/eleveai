import type { FamilleDico, MotDico } from "../types";

// ✍️ Dico Français 3e (CARTES) — la marche au-dessus de la 4e (fin de collège).

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsFrancais3e: MotDico[] = [
  carte("3e-f-argument", "Argument", "texte", "Une idée qui appuie une opinion dans un débat."),
  carte("3e-f-these", "Thèse", "texte", "L'opinion défendue dans un texte argumentatif."),
  carte("3e-f-autobiographie", "Autobiographie", "texte", "Un récit où l'auteur raconte sa propre vie."),
  carte("3e-f-subjonctif", "Subjonctif", "conjugaison", "Le mode du souhait ou du doute : « qu'il vienne »."),
  carte("3e-f-champ-lexical", "Champ lexical", "ortho-lexique", "L'ensemble des mots qui évoquent un même thème."),
  carte("3e-f-enonciation", "Énonciation", "texte", "Qui parle, à qui, où et quand dans un texte."),
];
