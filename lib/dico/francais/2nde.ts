import type { FamilleDico, MotDico } from "../types";

// ✍️ Dico Français 2nde (CARTES) — objets d'étude du lycée, au-dessus de la 3e.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsFrancais2nde: MotDico[] = [
  carte("2nde-f-apologue", "Apologue", "texte", "Un court récit qui délivre une leçon, comme une fable."),
  carte("2nde-f-comedie", "Comédie", "texte", "Une pièce de théâtre qui fait rire."),
  carte("2nde-f-tragedie", "Tragédie", "texte", "Une pièce de théâtre au destin funeste."),
  carte("2nde-f-requisitoire", "Réquisitoire", "texte", "Un discours qui accuse."),
  carte("2nde-f-plaidoyer", "Plaidoyer", "texte", "Un discours qui défend."),
  carte("2nde-f-incipit", "Incipit", "texte", "Le début d'un roman."),
];
