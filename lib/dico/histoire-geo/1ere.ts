import type { FamilleDico, MotDico } from "../types";

// 🗺️ Dico Histoire-Géographie 1re (CARTES) — nations, industrie, territoires.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsHistGeo1ere: MotDico[] = [
  carte("1ere-hg-nation", "Nation", "histoire", "Une communauté qui se sent unie et veut vivre ensemble."),
  carte("1ere-hg-suffrage-universel", "Suffrage universel", "histoire", "Le droit de vote pour tous les citoyens."),
  carte("1ere-hg-laicite", "Laïcité", "histoire", "La séparation des religions et de l'État."),
  carte("1ere-hg-syndicat", "Syndicat", "histoire", "Une association qui défend les travailleurs."),
  carte("1ere-hg-frontiere", "Frontière", "geographie", "La limite entre deux États."),
  carte("1ere-hg-aire-urbaine", "Aire urbaine", "geographie", "Une grande ville et les communes qu'elle influence."),
];
