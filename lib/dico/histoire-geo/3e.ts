import type { FamilleDico, MotDico } from "../types";

// 🗺️ Dico Histoire-Géographie 3e (CARTES) — le XXᵉ siècle et le monde d'aujourd'hui.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsHistGeo3e: MotDico[] = [
  carte("3e-hg-guerre-mondiale", "Guerre mondiale", "histoire", "Un conflit qui a touché le monde entier : 1914, 1939."),
  carte("3e-hg-genocide", "Génocide", "histoire", "L'extermination volontaire de tout un peuple."),
  carte("3e-hg-resistance", "Résistance", "histoire", "Ceux qui luttaient contre l'occupant pendant la guerre."),
  carte("3e-hg-republique", "République", "histoire", "Un régime politique sans roi, dirigé par des élus."),
  carte("3e-hg-decolonisation", "Décolonisation", "histoire", "Quand les colonies deviennent des pays indépendants."),
  carte("3e-hg-union-europeenne", "Union européenne", "geographie", "L'union de 27 pays d'Europe."),
];
