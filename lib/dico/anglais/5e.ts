import type { MotDico } from "../types";

// 🇬🇧 Dico Anglais 5e (CARTES) — vocabulaire au-dessus de la 6e.
// « Qui suis-je ? » : l'indice est le sens français, on retrouve le mot anglais.

function carte(id: string, mot: string, definition: string): MotDico {
  return {
    id,
    mot,
    famille: "anglais",
    definition,
    defi: { geste: "saisie", question: definition, reponse: mot },
  };
}

export const motsAnglais5e: MotDico[] = [
  carte("5e-a-yesterday", "Yesterday", "En anglais : hier."),
  carte("5e-a-holiday", "Holiday", "En anglais : les vacances."),
  carte("5e-a-country", "Country", "En anglais : le pays."),
  carte("5e-a-kitchen", "Kitchen", "En anglais : la cuisine."),
  carte("5e-a-clothes", "Clothes", "En anglais : les vêtements."),
  carte("5e-a-always", "Always", "En anglais : toujours."),
];
