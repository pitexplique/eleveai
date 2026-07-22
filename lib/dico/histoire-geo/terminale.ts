import type { FamilleDico, MotDico } from "../types";

// 📜 Dico Histoire-Géo Terminale (CARTES) — le monde de 1945 à nos jours :
// le vocabulaire du bac, souvent long et piégeux à écrire.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsHistGeoTerminale: MotDico[] = [
  carte("term-h-mondialisation", "Mondialisation", "geographie", "La mise en relation croissante des économies et des sociétés du monde."),
  carte("term-h-geopolitique", "Géopolitique", "geographie", "L'étude des rivalités de pouvoir sur des territoires."),
  carte("term-h-decolonisation", "Décolonisation", "histoire", "L'accession des colonies à l'indépendance après 1945."),
  carte("term-h-totalitarisme", "Totalitarisme", "histoire", "Un régime qui veut contrôler toute la société et les esprits."),
  carte("term-h-multilateralisme", "Multilatéralisme", "histoire", "Régler les problèmes du monde à plusieurs États, par la négociation."),
  carte("term-h-hegemonie", "Hégémonie", "histoire", "La domination d'une puissance sur les autres."),
  carte("term-h-souverainete", "Souveraineté", "histoire", "Le pouvoir d'un État de décider sans dépendre d'un autre."),
  carte("term-h-detente", "Détente", "histoire", "La période d'apaisement de la guerre froide (années 1960-70)."),
  carte("term-h-bipolarisation", "Bipolarisation", "histoire", "Le monde organisé autour de deux blocs rivaux (USA / URSS)."),
  carte("term-h-gouvernance", "Gouvernance", "geographie", "La manière de gouverner en associant plusieurs acteurs."),
  carte("term-h-guerilla", "Guérilla", "histoire", "Une guerre de harcèlement menée par des combattants irréguliers."),
  carte("term-h-metropolisation", "Métropolisation", "geographie", "La concentration des richesses et des pouvoirs dans les grandes villes."),
];
