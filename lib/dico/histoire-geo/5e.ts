import type { FamilleDico, MotDico } from "../types";

// 🗺️ Dico Histoire-Géographie 5e (CARTES) — Moyen Âge, Renaissance, monde.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsHistGeo5e: MotDico[] = [
  carte("5e-hg-seigneur", "Seigneur", "histoire", "Un noble qui possédait des terres au Moyen Âge."),
  carte("5e-hg-cathedrale", "Cathédrale", "histoire", "Une très grande église du Moyen Âge."),
  carte("5e-hg-islam", "Islam", "histoire", "La religion fondée au VIIᵉ siècle par le prophète Mahomet."),
  carte("5e-hg-renaissance", "Renaissance", "histoire", "La grande période artistique du XVIᵉ siècle."),
  carte("5e-hg-climat", "Climat", "geographie", "Le temps qu'il fait habituellement dans une région."),
  carte("5e-hg-urbanisation", "Urbanisation", "geographie", "Le développement et l'extension des villes."),
];
