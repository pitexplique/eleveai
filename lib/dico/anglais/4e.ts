import type { MotDico } from "../types";

// 🇬🇧 Dico Anglais 4e (CARTES) — vocabulaire au-dessus de la 5e.

function carte(id: string, mot: string, definition: string): MotDico {
  return {
    id,
    mot,
    famille: "anglais",
    definition,
    defi: { geste: "saisie", question: definition, reponse: mot },
  };
}

export const motsAnglais4e: MotDico[] = [
  carte("4e-a-job", "Job", "En anglais : le métier."),
  carte("4e-a-health", "Health", "En anglais : la santé."),
  carte("4e-a-money", "Money", "En anglais : l'argent."),
  carte("4e-a-journey", "Journey", "En anglais : le voyage."),
  carte("4e-a-never", "Never", "En anglais : jamais."),
  carte("4e-a-because", "Because", "En anglais : parce que."),
];
