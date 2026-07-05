import type { MotDico } from "../types";

// 🇬🇧 Dico Anglais 3e (CARTES) — vocabulaire au-dessus de la 4e (brevet).

function carte(id: string, mot: string, definition: string): MotDico {
  return {
    id,
    mot,
    famille: "anglais",
    definition,
    defi: { geste: "saisie", question: definition, reponse: mot },
  };
}

export const motsAnglais3e: MotDico[] = [
  carte("3e-a-future", "Future", "En anglais : le futur, l'avenir."),
  carte("3e-a-environment", "Environment", "En anglais : l'environnement."),
  carte("3e-a-society", "Society", "En anglais : la société."),
  carte("3e-a-improve", "Improve", "En anglais : améliorer."),
  carte("3e-a-however", "However", "En anglais : cependant."),
  carte("3e-a-although", "Although", "En anglais : bien que."),
];
