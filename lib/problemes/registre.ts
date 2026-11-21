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
import e4eDroiteMilieux from "./4e/droite_milieux";
import e4eOrdreInequations from "./4e/ordre_inequations";
import e4eDistanceDroite from "./4e/distance_droite";
import e4eTangenteCercle from "./4e/tangente_cercle";
import e4eArcsSecteurs from "./4e/arcs_secteurs";
import e4eTrianglePointsRemarquables from "./4e/triangle_points_remarquables";
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
import eCm1NombreEntier from "./cm1/nombre_entier";
import eCm1Suite from "./cm1/suite";
import eCm1TablesMultiplication from "./cm1/tables_multiplication";
import eCm1Multiplication from "./cm1/multiplication";
import eCm1Division from "./cm1/division";
import eCm1Fraction from "./cm1/fraction";
import eCm1NombreDecimal from "./cm1/nombre_decimal";
import eCm1Calcul from "./cm1/calcul";
import eCm1Probleme from "./cm1/probleme";
import eCm1Algebre from "./cm1/algebre";
import eCm1Proportionnalite from "./cm1/proportionnalite";
import eCm1Longueur from "./cm1/longueur";
import eCm1Masse from "./cm1/masse";
import eCm1Contenance from "./cm1/contenance";
import eCm1Duree from "./cm1/duree";
import eCm1Perimetre from "./cm1/perimetre";
import eCm1Aire from "./cm1/aire";
import eCm1Angle from "./cm1/angle";
import eCm1Reperage from "./cm1/reperage";
import eCm1Droite from "./cm1/droite";
import eCm1Symetrie from "./cm1/symetrie";
import eCm1FigurePlane from "./cm1/figure_plane";
import eCm1Solide from "./cm1/solide";
import eCm1Tableau from "./cm1/tableau";
import eCm1Graphique from "./cm1/graphique";
import eCm1Probabilite from "./cm1/probabilite";
import eCm1TrierClasser from "./cm1/trier_classer";
import eCm1Algorithmique from "./cm1/algorithmique";
import eCe2NombreEntier from "./ce2/nombre_entier";
import eCe2SuiteNombre from "./ce2/suite_nombre";
import eCe2AdditionSoustraction from "./ce2/addition_soustraction";
import eCe2Multiplication from "./ce2/multiplication";
import eCe2Division from "./ce2/division";
import eCe2CalculMental from "./ce2/calcul_mental";
import eCe2Fraction from "./ce2/fraction";
import eCe2Probleme from "./ce2/probleme";
import eCe2Longueur from "./ce2/longueur";
import eCe2Masse from "./ce2/masse";
import eCe2Contenance from "./ce2/contenance";
import eCe2Duree from "./ce2/duree";
import eCe2Monnaie from "./ce2/monnaie";
import eCe2Perimetre from "./ce2/perimetre";
import eCe2Reperage from "./ce2/reperage";
import eCe2DroitesAngles from "./ce2/droites_angles";
import eCe2FiguresPlanes from "./ce2/figures_planes";
import eCe2Solides from "./ce2/solides";
import eCe2Symetrie from "./ce2/symetrie";
import eCe2Donnees from "./ce2/donnees";
import eCe2Algorithmique from "./ce2/algorithmique";
import eCe1NombreEntier from "./ce1/nombre_entier";
import eCe1SuiteNombre from "./ce1/suite_nombre";
import eCe1AdditionSoustraction from "./ce1/addition_soustraction";
import eCe1Multiplication from "./ce1/multiplication";
import eCe1DivisionPartage from "./ce1/division_partage";
import eCe1CalculMental from "./ce1/calcul_mental";
import eCe1Fraction from "./ce1/fraction";
import eCe1Probleme from "./ce1/probleme";
import eCe1Longueur from "./ce1/longueur";
import eCe1Masse from "./ce1/masse";
import eCe1Duree from "./ce1/duree";
import eCe1Monnaie from "./ce1/monnaie";
import eCe1Reperage from "./ce1/reperage";
import eCe1DroitesSegments from "./ce1/droites_segments";
import eCe1FiguresPlanes from "./ce1/figures_planes";
import eCe1Solides from "./ce1/solides";
import eCe1Donnees from "./ce1/donnees";
import eCe1TrierClasser from "./ce1/trier_classer";
import eCe1Algorithmique from "./ce1/algorithmique";
import eCpNombreEntier from "./cp/nombre_entier";
import eCpSuiteNombre from "./cp/suite_nombre";
import eCpAdditionSoustraction from "./cp/addition_soustraction";
import eCpCalculMental from "./cp/calcul_mental";
import eCpProbleme from "./cp/probleme";
import eCpLongueur from "./cp/longueur";
import eCpMasseContenance from "./cp/masse_contenance";
import eCpDuree from "./cp/duree";
import eCpMonnaie from "./cp/monnaie";
import eCpReperage from "./cp/reperage";
import eCpFiguresSolides from "./cp/figures_solides";
import eCpDonnees from "./cp/donnees";
import eCpAlgorithmique from "./cp/algorithmique";
// 3e (imports)
import e3eFractionRationnel from "./3e/fraction_rationnel";
import e3eEntierPuissance from "./3e/entier_puissance";
import e3eEntierRacineCarree from "./3e/entier_racine_carree";
import e3eEntierArithmetique from "./3e/entier_arithmetique";
import e3ePropProportionnalite from "./3e/prop_proportionnalite";
import e3eLitteralCalcul from "./3e/litteral_calcul";
import e3eEquationResolution from "./3e/equation_resolution";
import e3eFonctionGeneralite from "./3e/fonction_generalite";
import e3eAffineFonction from "./3e/affine_fonction";
import e3eTriangleFigure from "./3e/triangle_figure";
import e3ePythagoreTheoreme from "./3e/pythagore_theoreme";
import e3eThalesTheoreme from "./3e/thales_theoreme";
import e3eTrigoTrigonometrie from "./3e/trigo_trigonometrie";
import e3eSymTransformation from "./3e/sym_transformation";
import e3eVolumeGeometrieEspace from "./3e/volume_geometrie_espace";
import e3eSectionsSolides from "./3e/sections_solides";
import e3eAirePerimetre from "./3e/aire_perimetre";
import e3eAireSurface from "./3e/aire_surface";
import e3eVolumeSolide from "./3e/volume_solide";
import e3eAireSolides from "./3e/aire_solides";
import e3eStatStatistique from "./3e/stat_statistique";
import e3eStatClasses from "./3e/stat_classes";
import e3eProbaExperience from "./3e/proba_experience";
import e3eAnglesCercle from "./3e/angles_cercle";
import e3eRelationsMetriques from "./3e/relations_metriques";
import e3eAlgoProgrammation from "./3e/algo_programmation";
import e2deReelsIntervalles from "./seconde/reels_intervalles";
import e2deArithmetiqueEntiers from "./seconde/arithmetique_entiers";
import e2dePuissances2de from "./seconde/puissances_2de";
import e2deRacineCarree2de from "./seconde/racine_carree_2de";
import e2deDeveloppementFactorisation2de from "./seconde/developpement_factorisation_2de";
import e2deIdentitesRemarquables2de from "./seconde/identites_remarquables_2de";
import e2deExpressionsLitterales2de from "./seconde/expressions_litterales_2de";
import e2deEquationsInequations1erDegre from "./seconde/equations_inequations_1er_degre";
import e2deVecteursPlan from "./seconde/vecteurs_plan";
import e2deRepereCoordonnees from "./seconde/repere_coordonnees";
import e2deDroitesPlan from "./seconde/droites_plan";
import e2deGeometrieProblemesPlan from "./seconde/geometrie_problemes_plan";
import e2deSignesExpression2de from "./seconde/signes_expression_2de";
import e2deFonctionVocabulaire2de from "./seconde/fonction_vocabulaire_2de";
import e2deAnalyseGraphique2de from "./seconde/analyse_graphique_2de";
import e2deFonctionVariationsExtremums from "./seconde/fonction_variations_extremums";
import e2deFonctionsAffines2de from "./seconde/fonctions_affines_2de";
import e2deFonctionsReference2de from "./seconde/fonctions_reference_2de";
import e2deInformationChiffreeEvolutions from "./seconde/information_chiffree_evolutions";
import e2deStatistiquesDescriptives from "./seconde/statistiques_descriptives";
import e2deCroisementVariables2de from "./seconde/croisement_variables_2de";
import e2deProbabilitesEnsembleFini from "./seconde/probabilites_ensemble_fini";
import e2deProbabilitesConditionnelles2de from "./seconde/probabilites_conditionnelles_2de";
import e2deEchantillonnageSimulation from "./seconde/echantillonnage_simulation";
import e2deAlgorithmiquePython2de from "./seconde/algorithmique_python_2de";
import e2deLogiqueEnsembles from "./seconde/logique_ensembles";
import e2deDemiPlansSystemes from "./seconde/demi_plans_systemes";
import e2deSystemesDeterminant from "./seconde/systemes_determinant";
import e2deCourbesAssociees from "./seconde/courbes_associees";
import e2dePolynomesDivision from "./seconde/polynomes_division";
import e2deEncadrementsOperations from "./seconde/encadrements_operations";
import e2deRacinesDenominateur from "./seconde/racines_denominateur";
import e2deValeurAbsolueEquations from "./seconde/valeur_absolue_equations";
import e2deHomographiquePartieEntiere from "./seconde/homographique_partie_entiere";
import e2deFonctionsParIntervalles from "./seconde/fonctions_par_intervalles";
import e2deDroitesPerpendiculaires from "./seconde/droites_perpendiculaires";
import e2deProjectionDroite from "./seconde/projection_droite";
import e2deEspacePosition2de from "./seconde/espace_position_2de";
import e2deComposeesTransformations from "./seconde/composees_transformations";
import e1reAutoComparer from "./premiere/auto_comparer";
import e1reAutoFractionsPuissances from "./premiere/auto_fractions_puissances";
import e1reAutoOrdresUnites from "./premiere/auto_ordres_unites";
import e1reAutoDevelopperFactoriser from "./premiere/auto_developper_factoriser";
import e1reAutoEquations from "./premiere/auto_equations";
import e1reAutoSigneExpression from "./premiere/auto_signe_expression";
import e1reAutoFormules from "./premiere/auto_formules";
import e1reAutoProportion from "./premiere/auto_proportion";
import e1reAutoPartieTout from "./premiere/auto_partie_tout";
import e1reAutoCoefficientMultiplicateur from "./premiere/auto_coefficient_multiplicateur";
import e1reAutoTauxEvolution from "./premiere/auto_taux_evolution";
import e1reAutoLectureGraphique from "./premiere/auto_lecture_graphique";
import e1reAutoResolutionGraphique from "./premiere/auto_resolution_graphique";
import e1reAutoDroites from "./premiere/auto_droites";
import e1reAutoLireStatistiques from "./premiere/auto_lire_statistiques";
import e1reAutoIndicateurs from "./premiere/auto_indicateurs";
import e1reAutoProbaBase from "./premiere/auto_proba_base";
import e1reAutoProbaLecture from "./premiere/auto_proba_lecture";
import e1reInfoTableauCroise from "./premiere/info_tableau_croise";
import e1reInfoFrequences from "./premiere/info_frequences";
import e1reInfoRepresentationsCroisees from "./premiere/info_representations_croisees";
import e1reInfoNuage from "./premiere/info_nuage";
import e1reInfoPointMoyen from "./premiere/info_point_moyen";
import e1reInfoAjustementAffine from "./premiere/info_ajustement_affine";
import e1reInfoInterpolerExtrapoler from "./premiere/info_interpoler_extrapoler";
import e1reInfoTableur from "./premiere/info_tableur";
import e1reInfoFiltreDonnees from "./premiere/info_filtre_donnees";
import e1reAleaConditionnelle from "./premiere/alea_conditionnelle";
import e1reAleaConditionnelleCalcul from "./premiere/alea_conditionnelle_calcul";
import e1reAleaArbre from "./premiere/alea_arbre";
import e1reAleaArbreCalcul from "./premiere/alea_arbre_calcul";
import e1reAleaIndependance from "./premiere/alea_independance";
import e1reAleaBernoulli from "./premiere/alea_bernoulli";
import e1reAleaBernoulliCalcul from "./premiere/alea_bernoulli_calcul";
import e1reLinSuiteArithmetique from "./premiere/lin_suite_arithmetique";
import e1reLinSuiteTermeGeneral from "./premiere/lin_suite_terme_general";
import e1reLinAffine from "./premiere/lin_affine";
import e1reLinAffineLecture from "./premiere/lin_affine_lecture";
import e1reLinModeliser from "./premiere/lin_modeliser";
import e1reLinSeuil from "./premiere/lin_seuil";
import e1reQuadParabole from "./premiere/quad_parabole";
import e1reQuadSommetAxe from "./premiere/quad_sommet_axe";
import e1reQuadVariations from "./premiere/quad_variations";
import e1reQuadRacinesSigne from "./premiere/quad_racines_signe";
import e1reExpoSuiteGeometrique from "./premiere/expo_suite_geometrique";
import e1reExpoSuiteTermeGeneral from "./premiere/expo_suite_terme_general";
import e1reExpoFonction from "./premiere/expo_fonction";
import e1reExpoFonctionLecture from "./premiere/expo_fonction_lecture";
import e1reExpoTauxMoyen from "./premiere/expo_taux_moyen";
import e1reExpoModeliser from "./premiere/expo_modeliser";
import e1reExpoSeuil from "./premiere/expo_seuil";
import eTleDenombrementCombinatoire from "./terminale-spe/denombrement_combinatoire";
import eTleGeometrieEspace from "./terminale-spe/geometrie_espace";
import eTleProduitScalaireEspace from "./terminale-spe/produit_scalaire_espace";
import eTleSuiteNumerique from "./terminale-spe/suite_numerique";
import eTleLimiteSuite from "./terminale-spe/limite_suite";
import eTleLimiteFonction from "./terminale-spe/limite_fonction";
import eTleContinuiteTvi from "./terminale-spe/continuite_tvi";
import eTleDerivationFonction from "./terminale-spe/derivation_fonction";
import eTleConvexiteFonction from "./terminale-spe/convexite_fonction";
import eTleFonctionsSinusCosinus from "./terminale-spe/fonctions_sinus_cosinus";
import eTleFonctionExponentielle from "./terminale-spe/fonction_exponentielle";
import eTleFonctionLogarithme from "./terminale-spe/fonction_logarithme";
import eTlePrimitiveIntegrale from "./terminale-spe/primitive_integrale";
import eTleEquationDifferentielle from "./terminale-spe/equation_differentielle";
import eTleProbabiliteConditionnelle from "./terminale-spe/probabilite_conditionnelle";
import eTleVariableAleatoire from "./terminale-spe/variable_aleatoire";
import eTleLoiBinomiale from "./terminale-spe/loi_binomiale";
import eTleConcentrationEchantillonnage from "./terminale-spe/concentration_echantillonnage";
import eTleAlgorithmiquePython from "./terminale-spe/algorithmique_python";
import e1sSuites from "./premiere-spe/suites";
import e1sSecondDegre from "./premiere-spe/second_degre";
import e1sDerivationNombreDerive from "./premiere-spe/derivation_nombre_derive";
import e1sDerivationTangente from "./premiere-spe/derivation_tangente";
import e1sDerivationFormules from "./premiere-spe/derivation_formules";
import e1sDerivationOperations from "./premiere-spe/derivation_operations";
import e1sAnalyseGraphique1s from "./premiere-spe/analyse_graphique_1s";
import e1sVariationsFonctions from "./premiere-spe/variations_fonctions";
import e1sExponentielle from "./premiere-spe/exponentielle";
import e1sTrigonometrie from "./premiere-spe/trigonometrie";
import e1sProduitScalaire from "./premiere-spe/produit_scalaire";
import e1sGeometrieReperee from "./premiere-spe/geometrie_reperee";
import e1sProbabilitesConditionnelles from "./premiere-spe/probabilites_conditionnelles";
import e1sVariablesAleatoires from "./premiere-spe/variables_aleatoires";
import e1sAlgorithmique from "./premiere-spe/algorithmique";
import e1sLogiqueEnsembles from "./premiere-spe/logique_ensembles";
import e1sTrigoFormulesEquations from "./premiere-spe/trigo_formules_equations";
import e1sTriangleQuelconque from "./premiere-spe/triangle_quelconque";
import e1sAnglesOrientes from "./premiere-spe/angles_orientes";
import e1sTangenteReel from "./premiere-spe/tangente_reel";
import e1sBarycentre from "./premiere-spe/barycentre";
import eStmgAutoProportion from "./stmg/auto_proportion";
import eStmgAutoEvoCoefficient from "./stmg/auto_evo_coefficient";
import eStmgAutoEvoTaux from "./stmg/auto_evo_taux";
import eStmgAutoEvoEnchainees from "./stmg/auto_evo_enchainees";
import eStmgAutoIndice from "./stmg/auto_indice";
import eStmgAutoFractionsPuissances from "./stmg/auto_fractions_puissances";
import eStmgAutoOrdresUnites from "./stmg/auto_ordres_unites";
import eStmgAutoDevelopperFactoriser from "./stmg/auto_developper_factoriser";
import eStmgAutoEquations from "./stmg/auto_equations";
import eStmgAutoSignes from "./stmg/auto_signes";
import eStmgAutoFormules from "./stmg/auto_formules";
import eStmgAutoLectureGraphique from "./stmg/auto_lecture_graphique";
import eStmgAutoResolutionGraphique from "./stmg/auto_resolution_graphique";
import eStmgAutoDroites from "./stmg/auto_droites";
import eStmgAutoDonneesGraphiques from "./stmg/auto_donnees_graphiques";
import eStmgSuiteNotation from "./stmg/suite_notation";
import eStmgSuiteTermes from "./stmg/suite_termes";
import eStmgSuiteArithmetique from "./stmg/suite_arithmetique";
import eStmgSuiteGeometrique from "./stmg/suite_geometrique";
import eStmgSuiteGeoEvolution from "./stmg/suite_geo_evolution";
import eStmgSuiteRepresentation from "./stmg/suite_representation";
import eStmgSuiteModeliser from "./stmg/suite_modeliser";
import eStmgSuiteSeuil from "./stmg/suite_seuil";
import eStmgSuiteTermeGeneral from "./stmg/suite_terme_general";
import eStmgFctRepresentation from "./stmg/fct_representation";
import eStmgFctTauxVariation from "./stmg/fct_taux_variation";
import eStmgFctMonotonie from "./stmg/fct_monotonie";
import eStmgFctDegre2Courbe from "./stmg/fct_degre2_courbe";
import eStmgFctDegre2Symetrie from "./stmg/fct_degre2_symetrie";
import eStmgFctDegre2Factorisee from "./stmg/fct_degre2_factorisee";
import eStmgFctDegre2Factoriser from "./stmg/fct_degre2_factoriser";
import eStmgFctDegre3 from "./stmg/fct_degre3";
import eStmgFctEquationsPuissance from "./stmg/fct_equations_puissance";
import eStmgDerSecanteTangente from "./stmg/der_secante_tangente";
import eStmgDerNombreDerive from "./stmg/der_nombre_derive";
import eStmgDerTangenteEquation from "./stmg/der_tangente_equation";
import eStmgDerFormules from "./stmg/der_formules";
import eStmgDerPolynome from "./stmg/der_polynome";
import eStmgDerVariations from "./stmg/der_variations";
import eStmgDerOptimisation from "./stmg/der_optimisation";
import eStmgDonneesTableauCroise from "./stmg/donnees_tableau_croise";
import eStmgDonneesFrequences from "./stmg/donnees_frequences";
import eStmgDonneesFiltres from "./stmg/donnees_filtres";
import eStmgStatNuage from "./stmg/stat_nuage";
import eStmgStatAjustement from "./stmg/stat_ajustement";
import eStmgStatInterpoler from "./stmg/stat_interpoler";
import eStmgStatMoindresCarres from "./stmg/stat_moindres_carres";
import eStmgProbaConditionnelleTableau from "./stmg/proba_conditionnelle_tableau";
import eStmgProbaConditionnelleDistinguer from "./stmg/proba_conditionnelle_distinguer";
import eStmgProbaEpreuvesIndependantes from "./stmg/proba_epreuves_independantes";
import eStmgProbaArbre from "./stmg/proba_arbre";
import eStmgProbaArbreCalcul from "./stmg/proba_arbre_calcul";

const TOUTES: ProblemesNotion[] = [
  // CP
  eCpNombreEntier,
  eCpSuiteNombre,
  eCpAdditionSoustraction,
  eCpCalculMental,
  eCpProbleme,
  eCpLongueur,
  eCpMasseContenance,
  eCpDuree,
  eCpMonnaie,
  eCpReperage,
  eCpFiguresSolides,
  eCpDonnees,
  eCpAlgorithmique,
  // fin CP
  // CE1
  eCe1NombreEntier,
  eCe1SuiteNombre,
  eCe1AdditionSoustraction,
  eCe1Multiplication,
  eCe1DivisionPartage,
  eCe1CalculMental,
  eCe1Fraction,
  eCe1Probleme,
  eCe1Longueur,
  eCe1Masse,
  eCe1Duree,
  eCe1Monnaie,
  eCe1Reperage,
  eCe1DroitesSegments,
  eCe1FiguresPlanes,
  eCe1Solides,
  eCe1Donnees,
  eCe1TrierClasser,
  eCe1Algorithmique,
  // fin CE1
  // CE2
  eCe2NombreEntier,
  eCe2SuiteNombre,
  eCe2AdditionSoustraction,
  eCe2Multiplication,
  eCe2Division,
  eCe2CalculMental,
  eCe2Fraction,
  eCe2Probleme,
  eCe2Longueur,
  eCe2Masse,
  eCe2Contenance,
  eCe2Duree,
  eCe2Monnaie,
  eCe2Perimetre,
  eCe2Reperage,
  eCe2DroitesAngles,
  eCe2FiguresPlanes,
  eCe2Solides,
  eCe2Symetrie,
  eCe2Donnees,
  eCe2Algorithmique,
  // fin CE2
  // CM1
  eCm1NombreEntier,
  eCm1Suite,
  eCm1TablesMultiplication,
  eCm1Multiplication,
  eCm1Division,
  eCm1Fraction,
  eCm1NombreDecimal,
  eCm1Calcul,
  eCm1Probleme,
  eCm1Algebre,
  eCm1Proportionnalite,
  eCm1Longueur,
  eCm1Masse,
  eCm1Contenance,
  eCm1Duree,
  eCm1Perimetre,
  eCm1Aire,
  eCm1Angle,
  eCm1Reperage,
  eCm1Droite,
  eCm1Symetrie,
  eCm1FigurePlane,
  eCm1Solide,
  eCm1Tableau,
  eCm1Graphique,
  eCm1Probabilite,
  eCm1TrierClasser,
  eCm1Algorithmique,
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
  e4eDroiteMilieux,
  e4eOrdreInequations,
  e4eDistanceDroite,
  e4eTangenteCercle,
  e4eArcsSecteurs,
  e4eTrianglePointsRemarquables,
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
  // 3e
  e3eFractionRationnel,
  e3eEntierPuissance,
  e3eEntierRacineCarree,
  e3eEntierArithmetique,
  e3ePropProportionnalite,
  e3eLitteralCalcul,
  e3eEquationResolution,
  e3eFonctionGeneralite,
  e3eAffineFonction,
  e3eTriangleFigure,
  e3ePythagoreTheoreme,
  e3eThalesTheoreme,
  e3eTrigoTrigonometrie,
  e3eSymTransformation,
  e3eVolumeGeometrieEspace,
  e3eSectionsSolides,
  e3eAirePerimetre,
  e3eAireSurface,
  e3eVolumeSolide,
  e3eAireSolides,
  e3eStatStatistique,
  e3eStatClasses,
  e3eProbaExperience,
  e3eAnglesCercle,
  e3eRelationsMetriques,
  e3eAlgoProgrammation,
  // Seconde
  e2deReelsIntervalles,
  e2deArithmetiqueEntiers,
  e2dePuissances2de,
  e2deRacineCarree2de,
  e2deDeveloppementFactorisation2de,
  e2deIdentitesRemarquables2de,
  e2deExpressionsLitterales2de,
  e2deEquationsInequations1erDegre,
  e2deVecteursPlan,
  e2deRepereCoordonnees,
  e2deDroitesPlan,
  e2deGeometrieProblemesPlan,
  e2deSignesExpression2de,
  e2deFonctionVocabulaire2de,
  e2deAnalyseGraphique2de,
  e2deFonctionVariationsExtremums,
  e2deFonctionsAffines2de,
  e2deFonctionsReference2de,
  e2deInformationChiffreeEvolutions,
  e2deStatistiquesDescriptives,
  e2deCroisementVariables2de,
  e2deProbabilitesEnsembleFini,
  e2deProbabilitesConditionnelles2de,
  e2deEchantillonnageSimulation,
  e2deAlgorithmiquePython2de,
  e2deLogiqueEnsembles,
  e2deDemiPlansSystemes,
  e2deSystemesDeterminant,
  e2deCourbesAssociees,
  e2dePolynomesDivision,
  e2deEncadrementsOperations,
  e2deRacinesDenominateur,
  e2deValeurAbsolueEquations,
  e2deHomographiquePartieEntiere,
  e2deFonctionsParIntervalles,
  e2deDroitesPerpendiculaires,
  e2deProjectionDroite,
  e2deEspacePosition2de,
  e2deComposeesTransformations,
  // fin Seconde
  // Première
  e1reAutoComparer,
  e1reAutoFractionsPuissances,
  e1reAutoOrdresUnites,
  e1reAutoDevelopperFactoriser,
  e1reAutoEquations,
  e1reAutoSigneExpression,
  e1reAutoFormules,
  e1reAutoProportion,
  e1reAutoPartieTout,
  e1reAutoCoefficientMultiplicateur,
  e1reAutoTauxEvolution,
  e1reAutoLectureGraphique,
  e1reAutoResolutionGraphique,
  e1reAutoDroites,
  e1reAutoLireStatistiques,
  e1reAutoIndicateurs,
  e1reAutoProbaBase,
  e1reAutoProbaLecture,
  e1reInfoTableauCroise,
  e1reInfoFrequences,
  e1reInfoRepresentationsCroisees,
  e1reInfoNuage,
  e1reInfoPointMoyen,
  e1reInfoAjustementAffine,
  e1reInfoInterpolerExtrapoler,
  e1reInfoTableur,
  e1reInfoFiltreDonnees,
  e1reAleaConditionnelle,
  e1reAleaConditionnelleCalcul,
  e1reAleaArbre,
  e1reAleaArbreCalcul,
  e1reAleaIndependance,
  e1reAleaBernoulli,
  e1reAleaBernoulliCalcul,
  e1reLinSuiteArithmetique,
  e1reLinSuiteTermeGeneral,
  e1reLinAffine,
  e1reLinAffineLecture,
  e1reLinModeliser,
  e1reLinSeuil,
  e1reQuadParabole,
  e1reQuadSommetAxe,
  e1reQuadVariations,
  e1reQuadRacinesSigne,
  e1reExpoSuiteGeometrique,
  e1reExpoSuiteTermeGeneral,
  e1reExpoFonction,
  e1reExpoFonctionLecture,
  e1reExpoTauxMoyen,
  e1reExpoModeliser,
  e1reExpoSeuil,
  // fin Première
  // Terminale
  eTleDenombrementCombinatoire,
  eTleGeometrieEspace,
  eTleProduitScalaireEspace,
  eTleSuiteNumerique,
  eTleLimiteSuite,
  eTleLimiteFonction,
  eTleContinuiteTvi,
  eTleDerivationFonction,
  eTleConvexiteFonction,
  eTleFonctionsSinusCosinus,
  eTleFonctionExponentielle,
  eTleFonctionLogarithme,
  eTlePrimitiveIntegrale,
  eTleEquationDifferentielle,
  eTleProbabiliteConditionnelle,
  eTleVariableAleatoire,
  eTleLoiBinomiale,
  eTleConcentrationEchantillonnage,
  eTleAlgorithmiquePython,
  // fin Terminale
  // Première spé
  e1sSuites,
  e1sSecondDegre,
  e1sDerivationNombreDerive,
  e1sDerivationTangente,
  e1sDerivationFormules,
  e1sDerivationOperations,
  e1sAnalyseGraphique1s,
  e1sVariationsFonctions,
  e1sExponentielle,
  e1sTrigonometrie,
  e1sProduitScalaire,
  e1sGeometrieReperee,
  e1sProbabilitesConditionnelles,
  e1sVariablesAleatoires,
  e1sAlgorithmique,
  e1sLogiqueEnsembles,
  e1sTrigoFormulesEquations,
  e1sTriangleQuelconque,
  e1sAnglesOrientes,
  e1sTangenteReel,
  e1sBarycentre,
  // fin Première spé
  // STMG
  eStmgAutoProportion,
  eStmgAutoEvoCoefficient,
  eStmgAutoEvoTaux,
  eStmgAutoEvoEnchainees,
  eStmgAutoIndice,
  eStmgAutoFractionsPuissances,
  eStmgAutoOrdresUnites,
  eStmgAutoDevelopperFactoriser,
  eStmgAutoEquations,
  eStmgAutoSignes,
  eStmgAutoFormules,
  eStmgAutoLectureGraphique,
  eStmgAutoResolutionGraphique,
  eStmgAutoDroites,
  eStmgAutoDonneesGraphiques,
  eStmgSuiteNotation,
  eStmgSuiteTermes,
  eStmgSuiteArithmetique,
  eStmgSuiteGeometrique,
  eStmgSuiteGeoEvolution,
  eStmgSuiteRepresentation,
  eStmgSuiteModeliser,
  eStmgSuiteSeuil,
  eStmgSuiteTermeGeneral,
  eStmgFctRepresentation,
  eStmgFctTauxVariation,
  eStmgFctMonotonie,
  eStmgFctDegre2Courbe,
  eStmgFctDegre2Symetrie,
  eStmgFctDegre2Factorisee,
  eStmgFctDegre2Factoriser,
  eStmgFctDegre3,
  eStmgFctEquationsPuissance,
  eStmgDerSecanteTangente,
  eStmgDerNombreDerive,
  eStmgDerTangenteEquation,
  eStmgDerFormules,
  eStmgDerPolynome,
  eStmgDerVariations,
  eStmgDerOptimisation,
  eStmgDonneesTableauCroise,
  eStmgDonneesFrequences,
  eStmgDonneesFiltres,
  eStmgStatNuage,
  eStmgStatAjustement,
  eStmgStatInterpoler,
  eStmgStatMoindresCarres,
  eStmgProbaConditionnelleTableau,
  eStmgProbaConditionnelleDistinguer,
  eStmgProbaEpreuvesIndependantes,
  eStmgProbaArbre,
  eStmgProbaArbreCalcul,
  // fin STMG
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
