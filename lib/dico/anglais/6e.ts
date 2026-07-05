import type { MotDico } from "../types";

// 🇬🇧 Dico Anglais 6e (CARTES) — l'anglais revient au collège : vocabulaire de base.
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

export const motsAnglais6e: MotDico[] = [
  carte("6e-a-school", "School", "En anglais : l'école."),
  carte("6e-a-homework", "Homework", "En anglais : les devoirs."),
  carte("6e-a-teacher", "Teacher", "En anglais : le professeur."),
  carte("6e-a-monday", "Monday", "En anglais : lundi."),
  carte("6e-a-breakfast", "Breakfast", "En anglais : le petit-déjeuner."),
  carte("6e-a-weather", "Weather", "En anglais : le temps (la météo)."),
];
