// LE REGISTRE DES ÉNIGMES À PROJETER : une ligne par notion faite.
// Clé = `<classe>/<notionId>` (l'identifiant du coach, avec underscores).
// ⛔ Un nouveau fichier `lib/enigmes/<classe>/<notionId>.ts` n'existe pour le
// site que s'il est ajouté ICI (le hub et la page de rendu lisent ce registre).

import type { EnigmesNotion } from "./types";

import e4ePuissanceEcriture from "./4e/puissance_ecriture";
import e4ePythagoreTheoreme from "./4e/pythagore_theoreme";
import e4eRelatifOperation from "./4e/relatif_operation";
import e6eAireLongueur from "./6e/aire_longueur";
import e6eFractionNombre from "./6e/fraction_nombre";

const TOUTES: EnigmesNotion[] = [
  // 6e
  e6eFractionNombre,
  e6eAireLongueur,
  // 4e
  e4eRelatifOperation,
  e4ePuissanceEcriture,
  e4ePythagoreTheoreme,
];

const PAR_CLE = new Map(TOUTES.map((n) => [`${n.classe}/${n.notionId}`, n]));

export function listerEnigmes(): EnigmesNotion[] {
  return TOUTES;
}

/** Les énigmes d'une notion, depuis l'identifiant du coach OU le slug d'URL. */
export function getEnigmes(classe: string, notion: string): EnigmesNotion | null {
  return PAR_CLE.get(`${classe}/${notion.replace(/-/g, "_")}`) ?? null;
}

/** L'adresse de projection d'une notion, ou null si ses énigmes n'existent pas. */
export function enigmesHref(classe: string, notionId: string): string | null {
  return getEnigmes(classe, notionId) ? `/enigmes/${classe}/${notionId.replace(/_/g, "-")}` : null;
}
