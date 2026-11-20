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
import e4eStatStatistique from "./4e/stat_statistique";
import e4eNombrePremier from "./4e/nombre_premier";
import e4eGrandeurComposee from "./4e/grandeur_composee";
import e4eThalesTheoreme from "./4e/thales_theoreme";
import e6eAireLongueur from "./6e/aire_longueur";
import e6eFractionNombre from "./6e/fraction_nombre";
import e6eAirePerimetre from "./6e/aire_perimetre";
import e6eDecimalNombre from "./6e/decimal_nombre";
import e6eAngleMesure from "./6e/angle_mesure";
import e6ePropProportionnalite from "./6e/prop_proportionnalite";
import e6ePourcentageNombre from "./6e/pourcentage_nombre";
import e6eDureeTemps from "./6e/duree_temps";
import e6eEntierNombre from "./6e/entier_nombre";
import e6eStatDonnee from "./6e/stat_donnee";
import e6eAireSurface from "./6e/aire_surface";
import e6eEntierCalculMental from "./6e/entier_calcul_mental";
import e6eCercleDisque from "./6e/cercle_disque";
import e6eDecimalCalcul from "./6e/decimal_calcul";
import e4eTrigoCosinus from "./4e/trigo_cosinus";
import e4ePropRatio from "./4e/prop_ratio";
import e6eTriangleFigure from "./6e/triangle_figure";
import e6eFractionCalcul from "./6e/fraction_calcul";
import e4ePropEchelle from "./4e/prop_echelle";
import e4eLitteralFactorisation from "./4e/litteral_factorisation";
import e6eSymAxiale from "./6e/sym_axiale";
import e6eVolumeSolide from "./6e/volume_solide";
import e4eVolumeSolide from "./4e/volume_solide";
import e4eDivisibilite from "./4e/divisibilite";
import e6eEntierCalculPose from "./6e/entier_calcul_pose";
import e6eQuadrilatereFigure from "./6e/quadrilatere_figure";
import e4eFonctionDependance from "./4e/fonction_dependance";
import e4eReperage from "./4e/reperage";
import e6eTrianglePropriete from "./6e/triangle_propriete";
import e6eProbaExperience from "./6e/proba_experience";
import e4eTriangleFigure from "./4e/triangle_figure";
import e4eProbaFrequence from "./4e/proba_frequence";
import e6eQuadrilaterePropriete from "./6e/quadrilatere_propriete";
import e6eDistanceSegment from "./6e/distance_segment";
import e4eQuadrilatereParallelogramme from "./4e/quadrilatere_parallelogramme";
import e4eSymTransformation from "./4e/sym_transformation";
import e6eMediatriceSegment from "./6e/mediatrice_segment";
import e6eBissectriceAngle from "./6e/bissectrice_angle";
import e6eCercleCirconscrit from "./6e/cercle_circonscrit";
import e6ePropEchelle from "./6e/prop_echelle";
import e6eAireUnite from "./6e/aire_unite";
import e6eDemiDroiteGraduee from "./6e/demi_droite_graduee";
import e6eProbaFrequence from "./6e/proba_frequence";
import e6eStatEnquete from "./6e/stat_enquete";
import e6eAlgebreProbleme from "./6e/algebre_probleme";
import e6eAlgoProgrammation from "./6e/algo_programmation";
import e6eVisionEspace from "./6e/vision_espace";
import e4ePropProportionnalite from "./4e/prop_proportionnalite";
import e4eLitteralIdentiteRemarquable from "./4e/litteral_identite_remarquable";
import e4eAireSurface from "./4e/aire_surface";
import e4eStatDonnee from "./4e/stat_donnee";
import e4eAirePerimetre from "./4e/aire_perimetre";
import e4eFractionNombre from "./4e/fraction_nombre";
import e4eOrdreGrandeur from "./4e/ordre_grandeur";
import e4eVisionEspace from "./4e/vision_espace";
import e4eAlgoProgrammation from "./4e/algo_programmation";
// 5e
import e5eRelatifNombre from "./5e/relatif_nombre";
import e5eRelatifOperation from "./5e/relatif_operation";
import e5ePuissanceSimple from "./5e/puissance_simple";
import e5eDivisibilite from "./5e/divisibilite";
import eCm2NombreEntier from "./cm2/nombre_entier";
import eCm2Suite from "./cm2/suite";
import eCm2Multiplication from "./cm2/multiplication";
import eCm2Division from "./cm2/division";

const TOUTES: ProblemesNotion[] = [
  // CM2
  eCm2NombreEntier,
  eCm2Suite,
  eCm2Multiplication,
  eCm2Division,
  // 6e
  e6eFractionNombre,
  e6eAireLongueur,
  e6eAirePerimetre,
  e6eDecimalNombre,
  e6eAngleMesure,
  e6ePropProportionnalite,
  e6ePourcentageNombre,
  e6eDureeTemps,
  e6eEntierNombre,
  e6eStatDonnee,
  e6eAireSurface,
  e6eEntierCalculMental,
  e6eCercleDisque,
  e6eDecimalCalcul,
  e6eTriangleFigure,
  e6eFractionCalcul,
  e6eSymAxiale,
  e6eVolumeSolide,
  e6eEntierCalculPose,
  e6eQuadrilatereFigure,
  e6eTrianglePropriete,
  e6eProbaExperience,
  e6eQuadrilaterePropriete,
  e6eDistanceSegment,
  e6eMediatriceSegment,
  e6eBissectriceAngle,
  e6eCercleCirconscrit,
  e6ePropEchelle,
  e6eAireUnite,
  e6eDemiDroiteGraduee,
  e6eProbaFrequence,
  e6eStatEnquete,
  e6eAlgebreProbleme,
  e6eAlgoProgrammation,
  e6eVisionEspace,
  // 4e
  e4eRelatifOperation,
  e4eEquationResolution,
  e4ePropPourcentages,
  e4eFractionCalcul,
  e4eLitteralExpression,
  e4eLitteralDistributivite,
  e4eProbaExperience,
  e4eStatStatistique,
  e4eNombrePremier,
  e4eGrandeurComposee,
  e4eThalesTheoreme,
  e4eTrigoCosinus,
  e4ePropRatio,
  e4ePropEchelle,
  e4eLitteralFactorisation,
  e4eVolumeSolide,
  e4eDivisibilite,
  e4eFonctionDependance,
  e4eReperage,
  e4eTriangleFigure,
  e4eProbaFrequence,
  e4eQuadrilatereParallelogramme,
  e4eSymTransformation,
  e4ePropProportionnalite,
  e4eLitteralIdentiteRemarquable,
  e4eAireSurface,
  e4eStatDonnee,
  e4eAirePerimetre,
  e4eFractionNombre,
  e4eOrdreGrandeur,
  e4eVisionEspace,
  e4eAlgoProgrammation,
  e4ePuissanceEcriture,
  e4ePythagoreTheoreme,
  // 5e
  e5eRelatifNombre,
  e5eRelatifOperation,
  e5ePuissanceSimple,
  e5eDivisibilite,
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
