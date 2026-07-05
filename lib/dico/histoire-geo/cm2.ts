import type { FamilleDico, MotDico } from "../types";

// 🗺️ Dico Histoire-Géographie CM2 — repères de fin de primaire (vers la 6e).
// Format « Qui suis-je ? » : la définition est l'indice, on retrouve le mot.

function carte(
  id: string,
  mot: string,
  famille: FamilleDico,
  definition: string,
  aide?: string
): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsHistGeoCM2: MotDico[] = [
  // ── Histoire ──────────────────────────────────────────────────
  carte("cm2-hg-prehistoire", "Préhistoire", "histoire", "La période d'avant l'invention de l'écriture."),
  carte("cm2-hg-antiquite", "Antiquité", "histoire", "L'époque des Gaulois, des Grecs et des Romains."),
  carte("cm2-hg-moyen-age", "Moyen Âge", "histoire", "La période des châteaux forts et des chevaliers."),
  carte("cm2-hg-revolution", "Révolution", "histoire", "Un grand bouleversement, comme en 1789."),
  carte("cm2-hg-siecle", "Siècle", "histoire", "Une durée de cent ans."),

  // ── Géographie ────────────────────────────────────────────────
  carte("cm2-hg-continent", "Continent", "geographie", "Une très grande étendue de terre : Europe, Afrique…"),
  carte("cm2-hg-ocean", "Océan", "geographie", "Une immense étendue d'eau salée."),
  carte("cm2-hg-fleuve", "Fleuve", "geographie", "Un grand cours d'eau qui se jette dans la mer."),
  carte("cm2-hg-montagne", "Montagne", "geographie", "Un relief très haut, comme les Alpes."),
  carte("cm2-hg-capitale", "Capitale", "geographie", "La ville principale d'un pays : Paris pour la France."),
  carte("cm2-hg-equateur", "Équateur", "geographie", "La ligne imaginaire au milieu du globe."),
  carte("cm2-hg-carte", "Carte", "geographie", "Un dessin qui représente un lieu vu du dessus."),
];
