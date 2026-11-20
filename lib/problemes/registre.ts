// LE REGISTRE DES PROBLÈMES À PROJETER : une ligne par notion faite.
// Clé = `<classe>/<notionId>` (l'identifiant du coach, avec underscores).
// ⛔ Un nouveau fichier `lib/problemes/<classe>/<notionId>.ts` n'existe pour le
// site que s'il est ajouté ICI (le hub et la page de rendu lisent ce registre).

import type { ProblemesNotion } from "./types";

import e4ePuissanceEcriture from "./4e/puissance_ecriture";
import e4ePythagoreTheoreme from "./4e/pythagore_theoreme";
import e4eRelatifOperation from "./4e/relatif_operation";
import e4eEquationResolution from "./4e/equation_resolution";
import e4ePropPourcentages from "./4e/prop_pourcentages";
import e4eFractionCalcul from "./4e/fraction_calcul";
import e4eLitteralExpression from "./4e/litteral_expression";
import e4eProbaExperience from "./4e/proba_experience";
import e4eLitteralDistributivite from "./4e/litteral_distributivite";
import e6eAireLongueur from "./6e/aire_longueur";
import e6eFractionNombre from "./6e/fraction_nombre";
import e6eAirePerimetre from "./6e/aire_perimetre";
import e6eDecimalNombre from "./6e/decimal_nombre";
import e6eAngleMesure from "./6e/angle_mesure";
import e6ePropProportionnalite from "./6e/prop_proportionnalite";
import e6ePourcentageNombre from "./6e/pourcentage_nombre";
import e6eDureeTemps from "./6e/duree_temps";

const TOUTES: ProblemesNotion[] = [
  // 6e
  e6eFractionNombre,
  e6eAireLongueur,
  e6eAirePerimetre,
  e6eDecimalNombre,
  e6eAngleMesure,
  e6ePropProportionnalite,
  e6ePourcentageNombre,
  e6eDureeTemps,
  // 4e
  e4eRelatifOperation,
  e4eEquationResolution,
  e4ePropPourcentages,
  e4eFractionCalcul,
  e4eLitteralExpression,
  e4eLitteralDistributivite,
  e4eProbaExperience,
  e4ePuissanceEcriture,
  e4ePythagoreTheoreme,
];

const PAR_CLE = new Map(TOUTES.map((n) => [`${n.classe}/${n.notionId}`, n]));

export function listerProblemes(): ProblemesNotion[] {
  return TOUTES;
}

/** Les problèmes d'une notion, depuis l'identifiant du coach OU le slug d'URL. */
export function getProblemes(classe: string, notion: string): ProblemesNotion | null {
  return PAR_CLE.get(`${classe}/${notion.replace(/-/g, "_")}`) ?? null;
}

/** L'adresse de projection d'une notion, ou null si ses problèmes n'existent pas. */
export function problemesHref(classe: string, notionId: string): string | null {
  return getProblemes(classe, notionId) ? `/enigmes-maths/${classe}/${notionId.replace(/_/g, "-")}` : null;
}
