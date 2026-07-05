import type { MotDico } from "../types";

// 🇬🇧 Dico Anglais 2nde (CARTES) — vocabulaire plus abstrait, au-dessus de la 3e.

function carte(id: string, mot: string, definition: string): MotDico {
  return {
    id,
    mot,
    famille: "anglais",
    definition,
    defi: { geste: "saisie", question: definition, reponse: mot },
  };
}

export const motsAnglais2nde: MotDico[] = [
  carte("2nde-a-freedom", "Freedom", "En anglais : la liberté."),
  carte("2nde-a-nowadays", "Nowadays", "En anglais : de nos jours."),
  carte("2nde-a-achieve", "Achieve", "En anglais : réussir, accomplir."),
  carte("2nde-a-behaviour", "Behaviour", "En anglais : le comportement."),
  carte("2nde-a-issue", "Issue", "En anglais : un problème, une question."),
  carte("2nde-a-whereas", "Whereas", "En anglais : alors que, tandis que."),
];
