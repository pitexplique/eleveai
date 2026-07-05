import type { MotDico } from "../types";

// 🇬🇧 Dico Anglais 1re (CARTES) — vocabulaire au-dessus de la Seconde.

function carte(id: string, mot: string, definition: string): MotDico {
  return {
    id,
    mot,
    famille: "anglais",
    definition,
    defi: { geste: "saisie", question: definition, reponse: mot },
  };
}

export const motsAnglais1ere: MotDico[] = [
  carte("1ere-a-right", "Right", "En anglais : un droit."),
  carte("1ere-a-wealth", "Wealth", "En anglais : la richesse."),
  carte("1ere-a-threat", "Threat", "En anglais : une menace."),
  carte("1ere-a-spread", "Spread", "En anglais : se répandre, propager."),
  carte("1ere-a-meanwhile", "Meanwhile", "En anglais : pendant ce temps."),
  carte("1ere-a-whether", "Whether", "En anglais : si (dans une question indirecte)."),
];
