import type { FamilleDico, MotDico } from "../types";

// 🗺️ Dico Histoire-Géographie 6e (CARTES) — l'Antiquité et le monde, au-dessus du CM2.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsHistGeo6e: MotDico[] = [
  carte("6e-hg-civilisation", "Civilisation", "histoire", "Un peuple avec ses villes, son écriture et ses croyances."),
  carte("6e-hg-pharaon", "Pharaon", "histoire", "Le roi de l'Égypte ancienne."),
  carte("6e-hg-hieroglyphe", "Hiéroglyphe", "histoire", "L'écriture en dessins des anciens Égyptiens."),
  carte("6e-hg-empire", "Empire", "histoire", "Un grand territoire dominé par un empereur, comme Rome."),
  carte("6e-hg-latitude", "Latitude", "geographie", "La position nord-sud d'un lieu sur le globe."),
  carte("6e-hg-metropole", "Métropole", "geographie", "Une très grande ville et sa banlieue."),
];
