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
import e5eDecimalQuotient from "./5e/decimal_quotient";
import e5eNombreApproche from "./5e/nombre_approche";
import e5eFractionNombre from "./5e/fraction_nombre";
import e5eFractionCalcul from "./5e/fraction_calcul";
import e5ePropProportionnalite from "./5e/prop_proportionnalite";
import e5ePropRatioPourcentage from "./5e/prop_ratio_pourcentage";
import e5eLitteralCalcul from "./5e/litteral_calcul";
import e5eAlgoProgrammation from "./5e/algo_programmation";
import e5eAlgoConstruire from "./5e/algo_construire";
import e5eAngleMesure from "./5e/angle_mesure";
import e5eTriangleFigure from "./5e/triangle_figure";
import e5eSymCentrale from "./5e/sym_centrale";
import e5eParallelogramme from "./5e/parallelogramme";
import e5eAireSurface from "./5e/aire_surface";
import e5eGrandeurConversion from "./5e/grandeur_conversion";
import e5eVolumeSolide from "./5e/volume_solide";
import e5eStatStatistique from "./5e/stat_statistique";
import e5eProbaExperience from "./5e/proba_experience";
import e5ePolygonesReguliers from "./5e/polygones_reguliers";
import eCm2NombreEntier from "./cm2/nombre_entier";
import eCm2Suite from "./cm2/suite";
import eCm2Multiplication from "./cm2/multiplication";
import eCm2Division from "./cm2/division";
import eCm2Fraction from "./cm2/fraction";
import eCm2FractionMixte from "./cm2/fraction_mixte";
import eCm2FractionCalcul from "./cm2/fraction_calcul";
import eCm2NombreDecimal from "./cm2/nombre_decimal";
import eCm2Calcul from "./cm2/calcul";
import eCm2Probleme from "./cm2/probleme";
import eCm2Algebre from "./cm2/algebre";
import eCm2Proportionnalite from "./cm2/proportionnalite";
import eCm2Pourcentage from "./cm2/pourcentage";
import eCm2Echelle from "./cm2/echelle";
import eCm2Longueur from "./cm2/longueur";
import eCm2Masse from "./cm2/masse";
import eCm2Contenance from "./cm2/contenance";
import eCm2Duree from "./cm2/duree";
import eCm2Perimetre from "./cm2/perimetre";
import eCm2Aire from "./cm2/aire";
import eCm2Angle from "./cm2/angle";
import eCm2Reperage from "./cm2/reperage";
import eCm2Droite from "./cm2/droite";
import eCm2Symetrie from "./cm2/symetrie";
import eCm2FigurePlane from "./cm2/figure_plane";
import eCm2Solide from "./cm2/solide";
import eCm2Tableau from "./cm2/tableau";
import eCm2Graphique from "./cm2/graphique";
import eCm2CalculsCommerciaux from "./cm2/calculs_commerciaux";
import eCm2Probabilite from "./cm2/probabilite";
import eCm2Algorithmique from "./cm2/algorithmique";

const TOUTES: ProblemesNotion[] = [
  // CM2
  eCm2NombreEntier,
  eCm2Suite,
  eCm2Multiplication,
  eCm2Division,
  eCm2Fraction,
  eCm2FractionMixte,
  eCm2FractionCalcul,
  eCm2NombreDecimal,
  eCm2Calcul,
  eCm2Probleme,
  eCm2Algebre,
  eCm2Proportionnalite,
  eCm2Pourcentage,
  eCm2Echelle,
  eCm2Longueur,
  eCm2Masse,
  eCm2Contenance,
  eCm2Duree,
  eCm2Perimetre,
  eCm2Aire,
  eCm2Angle,
  eCm2Reperage,
  eCm2Droite,
  eCm2Symetrie,
  eCm2FigurePlane,
  eCm2Solide,
  eCm2Tableau,
  eCm2Graphique,
  eCm2CalculsCommerciaux,
  eCm2Probabilite,
  eCm2Algorithmique,
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
  e5eDecimalQuotient,
  e5eNombreApproche,
  e5eFractionNombre,
  e5eFractionCalcul,
  e5ePropProportionnalite,
  e5ePropRatioPourcentage,
  e5eLitteralCalcul,
  e5eAlgoProgrammation,
  e5eAlgoConstruire,
  e5eAngleMesure,
  e5eTriangleFigure,
  e5eSymCentrale,
  e5eParallelogramme,
  e5eAireSurface,
  e5eGrandeurConversion,
  e5eVolumeSolide,
  e5eStatStatistique,
  e5eProbaExperience,
  e5ePolygonesReguliers,
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
