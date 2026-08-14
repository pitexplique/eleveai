// knowledge/maths/premiere/microSkills.ts
//
// Micro-compétences du module spécifique de mathématiques de Première générale
// (élèves SANS la spécialité maths).
//
// Chaque micro est dérivée d'une « capacité attendue » du programme en vigueur
// (BO n° 27 du 7 juillet 2022), de la liste d'automatismes de l'annexe BO du
// 12 juin 2025, ou d'un contenu ajouté par le programme rénové (modélisation
// quadratique, ajustement affine, répétition d'épreuves de Bernoulli).
//
// prerequis : uniquement des microId de ce fichier (validé au runtime par
// buildKnowledge, qui lève une erreur au moindre identifiant inconnu).
//
// Le poids des automatismes (53 micros) est voulu : ils font la première partie
// de l'épreuve — 6 points sur 20, sans calculatrice — et le programme demande
// qu'ils soient entretenus toute l'année, pas traités comme un chapitre.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  /* ═══════════════════ AUTOMATISMES : CALCUL NUMÉRIQUE ═══════════════════ */

  { id: "auto_num_comparer_difference", label: "Comparer deux nombres à l'aide de leur différence", notionId: "auto_calcul_numerique", prerequis: [] },
  { id: "auto_num_comparer_quotient", label: "Comparer deux nombres strictement positifs à l'aide de leur quotient", notionId: "auto_calcul_numerique", prerequis: ["auto_num_comparer_difference"] },
  { id: "auto_num_fractions_operations", label: "Effectuer des opérations entre fractions simples", notionId: "auto_calcul_numerique", prerequis: [] },
  { id: "auto_num_fractions_comparer", label: "Comparer des fractions simples", notionId: "auto_calcul_numerique", prerequis: ["auto_num_fractions_operations"] },
  { id: "auto_num_puissances", label: "Effectuer des opérations sur les puissances", notionId: "auto_calcul_numerique", prerequis: [] },
  { id: "auto_num_ecritures", label: "Passer d'une écriture d'un nombre à une autre (décimale, fractionnaire, pourcentage)", notionId: "auto_calcul_numerique", prerequis: ["auto_num_fractions_operations"] },
  { id: "auto_num_calcul_mental", label: "Effectuer mentalement des calculs simples (décimaux, fractions, pourcentages)", notionId: "auto_calcul_numerique", prerequis: ["auto_num_ecritures"] },
  { id: "auto_num_ordre_grandeur", label: "Estimer un ordre de grandeur", notionId: "auto_calcul_numerique", prerequis: ["auto_num_calcul_mental"] },
  { id: "auto_num_vraisemblance", label: "S'assurer de la vraisemblance et de la cohérence d'un résultat", notionId: "auto_calcul_numerique", prerequis: ["auto_num_ordre_grandeur"] },
  { id: "auto_num_conversions", label: "Effectuer des conversions d'unités (longueurs, aires, volumes, durées, vitesses, masses)", notionId: "auto_calcul_numerique", prerequis: [] },

  /* ══════════════════ AUTOMATISMES : CALCUL ALGÉBRIQUE ══════════════════ */

  { id: "auto_alg_litteral", label: "Effectuer un calcul littéral élémentaire (signes, fractions)", notionId: "auto_calcul_algebrique", prerequis: [] },
  { id: "auto_alg_developper", label: "Développer et réduire une expression algébrique simple", notionId: "auto_calcul_algebrique", prerequis: ["auto_alg_litteral"] },
  { id: "auto_alg_identites", label: "Utiliser les identités remarquables pour développer", notionId: "auto_calcul_algebrique", prerequis: ["auto_alg_developper"] },
  { id: "auto_alg_factoriser_commun", label: "Factoriser par un facteur commun (ax² + bx, ax + bx)", notionId: "auto_calcul_algebrique", prerequis: ["auto_alg_developper"] },
  { id: "auto_alg_factoriser_identite", label: "Factoriser à l'aide d'une identité remarquable", notionId: "auto_calcul_algebrique", prerequis: ["auto_alg_identites", "auto_alg_factoriser_commun"] },
  { id: "auto_alg_equation_premier_degre", label: "Résoudre une équation du type ax + b = cx + d", notionId: "auto_calcul_algebrique", prerequis: ["auto_alg_litteral"] },
  { id: "auto_alg_equation_carre", label: "Résoudre une équation du type x² = a", notionId: "auto_calcul_algebrique", prerequis: ["auto_alg_litteral"] },
  { id: "auto_alg_equation_quotient", label: "Résoudre une équation du type a/x = b", notionId: "auto_calcul_algebrique", prerequis: ["auto_alg_equation_premier_degre"] },
  { id: "auto_alg_inequation", label: "Résoudre une inéquation du premier degré", notionId: "auto_calcul_algebrique", prerequis: ["auto_alg_equation_premier_degre"] },
  { id: "auto_alg_produit_nul", label: "Déterminer les solutions d'une équation produit nul", notionId: "auto_calcul_algebrique", prerequis: ["auto_alg_factoriser_commun", "auto_alg_equation_premier_degre"] },
  { id: "auto_alg_signe_premier_degre", label: "Déterminer le signe d'une expression du premier degré", notionId: "auto_calcul_algebrique", prerequis: ["auto_alg_inequation"] },
  { id: "auto_alg_signe_factorisee", label: "Déterminer le signe d'une expression factorisée du second degré", notionId: "auto_calcul_algebrique", prerequis: ["auto_alg_signe_premier_degre", "auto_alg_produit_nul"] },
  { id: "auto_alg_isoler_variable", label: "Isoler une variable dans une égalité qui en comporte plusieurs", notionId: "auto_calcul_algebrique", prerequis: ["auto_alg_equation_premier_degre"] },
  { id: "auto_alg_application_formule", label: "Effectuer une application numérique d'une formule", notionId: "auto_calcul_algebrique", prerequis: ["auto_alg_litteral"] },

  /* ═════════════ AUTOMATISMES : PROPORTIONS ET POURCENTAGES ═════════════ */

  { id: "auto_prop_calculer", label: "Calculer une proportion", notionId: "auto_proportions_pourcentages", prerequis: [] },
  { id: "auto_prop_formes", label: "Exprimer une proportion sous différentes formes (décimale, fractionnaire, pourcentage)", notionId: "auto_proportions_pourcentages", prerequis: ["auto_prop_calculer"] },
  { id: "auto_prop_appliquer", label: "Appliquer un pourcentage à une quantité", notionId: "auto_proportions_pourcentages", prerequis: ["auto_prop_formes"] },
  { id: "auto_prop_partie_connaissant_tout", label: "Calculer une partie connaissant le tout", notionId: "auto_proportions_pourcentages", prerequis: ["auto_prop_appliquer"] },
  { id: "auto_prop_tout_connaissant_partie", label: "Calculer le tout connaissant une partie", notionId: "auto_proportions_pourcentages", prerequis: ["auto_prop_partie_connaissant_tout"] },
  { id: "auto_prop_pourcentage_de_pourcentage", label: "Calculer un pourcentage d'un pourcentage", notionId: "auto_proportions_pourcentages", prerequis: ["auto_prop_appliquer"] },

  /* ═══════════ AUTOMATISMES : ÉVOLUTIONS ET VARIATIONS ═══════════ */

  { id: "auto_evo_additif_multiplicatif", label: "Passer d'une formulation additive à une formulation multiplicative (+ 5 % → × 1,05)", notionId: "auto_evolutions_variations", prerequis: [] },
  { id: "auto_evo_diminution", label: "Traduire une diminution par un coefficient multiplicateur (− 5 % → × 0,95)", notionId: "auto_evolutions_variations", prerequis: ["auto_evo_additif_multiplicatif"] },
  { id: "auto_evo_valeur_finale", label: "Appliquer un taux d'évolution pour calculer une valeur finale", notionId: "auto_evolutions_variations", prerequis: ["auto_evo_additif_multiplicatif"] },
  { id: "auto_evo_valeur_initiale", label: "Appliquer un taux d'évolution pour retrouver une valeur initiale", notionId: "auto_evolutions_variations", prerequis: ["auto_evo_valeur_finale"] },
  { id: "auto_evo_calculer_taux", label: "Calculer un taux d'évolution et l'exprimer en pourcentage", notionId: "auto_evolutions_variations", prerequis: ["auto_evo_valeur_finale"] },
  { id: "auto_evo_successives", label: "Calculer le taux d'évolution équivalent à plusieurs évolutions successives", notionId: "auto_evolutions_variations", prerequis: ["auto_evo_calculer_taux"] },
  { id: "auto_evo_reciproque", label: "Calculer un taux d'évolution réciproque", notionId: "auto_evolutions_variations", prerequis: ["auto_evo_calculer_taux"] },
  { id: "auto_evo_piege_compensation", label: "Savoir qu'une baisse puis une hausse de même taux ne ramènent pas au prix initial", notionId: "auto_evolutions_variations", prerequis: ["auto_evo_successives"] },

  /* ═════════ AUTOMATISMES : FONCTIONS ET REPRÉSENTATIONS ═════════ */

  { id: "auto_fct_image_antecedent", label: "Déterminer graphiquement des images et des antécédents", notionId: "auto_fonctions_representations", prerequis: [] },
  { id: "auto_fct_reperer_graphique", label: "Préciser sur un graphique les grandeurs en jeu, les unités et les échelles", notionId: "auto_fonctions_representations", prerequis: [] },
  { id: "auto_fct_appartenance_courbe", label: "Exploiter une équation de courbe (appartenance d'un point, calcul de coordonnées)", notionId: "auto_fonctions_representations", prerequis: ["auto_fct_image_antecedent"] },
  { id: "auto_fct_lineaire_affine", label: "Reconnaître une fonction linéaire ou affine et savoir que sa représentation est une droite", notionId: "auto_fonctions_representations", prerequis: [] },
  { id: "auto_fct_resoudre_graphiquement", label: "Résoudre graphiquement une équation ou une inéquation du type f(x) = k, f(x) < k", notionId: "auto_fonctions_representations", prerequis: ["auto_fct_image_antecedent"] },
  { id: "auto_fct_signe_graphique", label: "Déterminer graphiquement le signe d'une fonction", notionId: "auto_fonctions_representations", prerequis: ["auto_fct_resoudre_graphiquement"] },
  { id: "auto_fct_variations_graphique", label: "Déterminer graphiquement le tableau de variations d'une fonction", notionId: "auto_fonctions_representations", prerequis: ["auto_fct_image_antecedent"] },
  { id: "auto_fct_lire_croissance", label: "Lire les variations d'une grandeur : accélération, ralentissement, doublement régulier", notionId: "auto_fonctions_representations", prerequis: ["auto_fct_variations_graphique"] },
  { id: "auto_fct_estimer_seuil", label: "Estimer graphiquement une valeur atteinte, un antécédent, un seuil", notionId: "auto_fonctions_representations", prerequis: ["auto_fct_resoudre_graphiquement"] },
  { id: "auto_fct_tracer_droite", label: "Tracer une droite donnée par son équation réduite, ou par un point et son coefficient directeur", notionId: "auto_fonctions_representations", prerequis: ["auto_fct_lineaire_affine"] },
  { id: "auto_fct_lire_equation_reduite", label: "Lire graphiquement l'équation réduite d'une droite", notionId: "auto_fonctions_representations", prerequis: ["auto_fct_tracer_droite"] },
  { id: "auto_fct_coefficient_directeur", label: "Déterminer le coefficient directeur d'une droite à partir de deux points", notionId: "auto_fonctions_representations", prerequis: ["auto_fct_lire_equation_reduite"] },

  /* ═════════════════ AUTOMATISMES : STATISTIQUES ═════════════════ */

  { id: "auto_stat_lire_graphique", label: "Lire un graphique, un histogramme, un diagramme (origine, graduations, échelles)", notionId: "auto_statistiques", prerequis: [] },
  { id: "auto_stat_graphiques_usuels", label: "Lire et commenter les graphiques usuels (barres, circulaire, nuage de points)", notionId: "auto_statistiques", prerequis: ["auto_stat_lire_graphique"] },
  { id: "auto_stat_graphique_donnees", label: "Passer du graphique aux données et inversement", notionId: "auto_statistiques", prerequis: ["auto_stat_lire_graphique"] },
  { id: "auto_stat_moyenne", label: "Calculer une moyenne, y compris pour des données regroupées par classes", notionId: "auto_statistiques", prerequis: [] },
  { id: "auto_stat_mediane", label: "Calculer une médiane", notionId: "auto_statistiques", prerequis: ["auto_stat_moyenne"] },
  { id: "auto_stat_quartiles", label: "Calculer les quartiles d'une série", notionId: "auto_statistiques", prerequis: ["auto_stat_mediane"] },
  { id: "auto_stat_interpreter_indicateurs", label: "Interpréter des indicateurs statistiques dans le contexte", notionId: "auto_statistiques", prerequis: ["auto_stat_quartiles"] },
  { id: "auto_stat_boites", label: "Comparer des distributions à l'aide de boîtes à moustaches", notionId: "auto_statistiques", prerequis: ["auto_stat_quartiles"] },

  /* ═════════════════ AUTOMATISMES : PROBABILITÉS ═════════════════ */

  { id: "auto_proba_encadrement", label: "Savoir qu'une probabilité est un nombre compris entre 0 et 1", notionId: "auto_probabilites", prerequis: [] },
  { id: "auto_proba_contraire", label: "Calculer la probabilité de l'évènement contraire", notionId: "auto_probabilites", prerequis: ["auto_proba_encadrement"] },
  { id: "auto_proba_somme_issues", label: "Calculer la probabilité d'un évènement comme somme des probabilités des issues", notionId: "auto_probabilites", prerequis: ["auto_proba_encadrement"] },
  { id: "auto_proba_equiprobabilite", label: "Utiliser P(A) = Card(A) / Card(Ω) dans le cas de l'équiprobabilité", notionId: "auto_probabilites", prerequis: ["auto_proba_somme_issues"] },
  { id: "auto_proba_conditionnelle_lecture", label: "Calculer une probabilité conditionnelle à partir d'un tableau croisé ou d'un arbre pondéré", notionId: "auto_probabilites", prerequis: ["auto_proba_equiprobabilite"] },
  { id: "auto_proba_distinguer", label: "Distinguer P(A ∩ B), P_A(B) et P_B(A)", notionId: "auto_probabilites", prerequis: ["auto_proba_conditionnelle_lecture"] },

  /* ═══════════ INFORMATION CHIFFRÉE : TABLEAU CROISÉ ═══════════ */

  { id: "info_tab_lire", label: "Lire un effectif dans un tableau croisé", notionId: "info_tableau_croise", prerequis: [] },
  { id: "info_tab_completer", label: "Compléter un tableau croisé d'effectifs (marges et total)", notionId: "info_tableau_croise", prerequis: ["info_tab_lire"] },
  { id: "info_tab_construire", label: "Dresser un tableau croisé de deux caractères à partir de données", notionId: "info_tableau_croise", prerequis: ["info_tab_completer"] },
  { id: "info_tab_frequence_marginale", label: "Calculer une fréquence marginale", notionId: "info_tableau_croise", prerequis: ["info_tab_completer"] },
  { id: "info_tab_frequence_conditionnelle", label: "Calculer une fréquence conditionnelle", notionId: "info_tableau_croise", prerequis: ["info_tab_frequence_marginale"] },
  { id: "info_tab_interpreter", label: "Interpréter un tableau croisé en utilisant les fréquences conditionnelles", notionId: "info_tableau_croise", prerequis: ["info_tab_frequence_conditionnelle"] },

  /* ═══════ INFORMATION CHIFFRÉE : REPRÉSENTATIONS CROISÉES ═══════ */

  { id: "info_rep_barres", label: "Lire un diagramme en barres croisant deux caractères", notionId: "info_representations_croisees", prerequis: [] },
  { id: "info_rep_circulaire", label: "Lire un diagramme circulaire ou semi-circulaire", notionId: "info_representations_croisees", prerequis: [] },
  { id: "info_rep_choisir", label: "Choisir la représentation adaptée au croisement de deux caractères", notionId: "info_representations_croisees", prerequis: ["info_rep_barres", "info_rep_circulaire"] },
  { id: "info_rep_commenter", label: "Commenter le croisement de deux caractères à partir d'une représentation", notionId: "info_representations_croisees", prerequis: ["info_rep_choisir"] },

  /* ═══════ INFORMATION CHIFFRÉE : NUAGE DE POINTS ═══════ */

  { id: "info_nuage_lire", label: "Lire les coordonnées d'un point d'un nuage", notionId: "info_nuage_point_moyen", prerequis: [] },
  { id: "info_nuage_construire", label: "Construire un nuage de points à partir d'un tableau de données", notionId: "info_nuage_point_moyen", prerequis: ["info_nuage_lire"] },
  { id: "info_nuage_tendance", label: "Décrire la tendance d'un nuage (croissante, décroissante, alignement)", notionId: "info_nuage_point_moyen", prerequis: ["info_nuage_construire"] },
  { id: "info_point_moyen_calculer", label: "Calculer les coordonnées du point moyen d'un nuage", notionId: "info_nuage_point_moyen", prerequis: ["info_nuage_construire"] },
  { id: "info_point_moyen_placer", label: "Placer le point moyen dans le nuage", notionId: "info_nuage_point_moyen", prerequis: ["info_point_moyen_calculer"] },

  /* ═══════ INFORMATION CHIFFRÉE : AJUSTEMENT AFFINE ═══════ */

  { id: "info_ajust_pertinence", label: "Reconnaître qu'un ajustement affine est pertinent pour un nuage", notionId: "info_ajustement_affine", prerequis: [] },
  { id: "info_ajust_determiner", label: "Déterminer une droite d'ajustement affine", notionId: "info_ajustement_affine", prerequis: ["info_ajust_pertinence"] },
  { id: "info_ajust_equation", label: "Utiliser l'équation d'une droite d'ajustement pour calculer une valeur", notionId: "info_ajustement_affine", prerequis: ["info_ajust_determiner"] },
  { id: "info_ajust_interpoler", label: "Interpoler une valeur inconnue à l'aide d'un ajustement affine", notionId: "info_ajustement_affine", prerequis: ["info_ajust_equation"] },
  { id: "info_ajust_extrapoler", label: "Extrapoler une valeur inconnue à l'aide d'un ajustement affine", notionId: "info_ajustement_affine", prerequis: ["info_ajust_equation"] },
  { id: "info_ajust_limites", label: "Discuter les limites d'une extrapolation", notionId: "info_ajustement_affine", prerequis: ["info_ajust_extrapoler"] },

  /* ═══════ INFORMATION CHIFFRÉE : TABLEUR ═══════ */

  { id: "info_tableur_lire", label: "Lire une valeur dans un extrait de tableur", notionId: "info_tableur", prerequis: [] },
  { id: "info_tableur_comprendre_formule", label: "Comprendre une formule de tableur (= B2 * 1,05)", notionId: "info_tableur", prerequis: ["info_tableur_lire"] },
  { id: "info_tableur_ecrire_formule", label: "Écrire la formule à saisir puis à recopier vers le bas ou vers la droite", notionId: "info_tableur", prerequis: ["info_tableur_comprendre_formule"] },
  { id: "info_tableur_exploiter_colonne", label: "Exploiter une colonne de valeurs pour répondre à une question (seuil, dépassement)", notionId: "info_tableur", prerequis: ["info_tableur_comprendre_formule"] },
  { id: "info_tableur_diagramme", label: "Choisir le diagramme adapté aux données d'une feuille de calcul", notionId: "info_tableur", prerequis: ["info_tableur_lire"] },

  /* ═══════ INFORMATION CHIFFRÉE : FILTRER DES DONNÉES ═══════ */

  { id: "info_filtre_sous_ensemble", label: "Déterminer un sous-ensemble d'individus répondant à un critère", notionId: "info_filtre_donnees", prerequis: [] },
  { id: "info_filtre_et", label: "Utiliser un filtre avec ET (les deux critères à la fois)", notionId: "info_filtre_donnees", prerequis: ["info_filtre_sous_ensemble"] },
  { id: "info_filtre_ou", label: "Utiliser un filtre avec OU (l'un des critères au moins)", notionId: "info_filtre_donnees", prerequis: ["info_filtre_sous_ensemble"] },
  { id: "info_filtre_non", label: "Utiliser un filtre avec NON (le critère contraire)", notionId: "info_filtre_donnees", prerequis: ["info_filtre_sous_ensemble"] },
  { id: "info_filtre_effectif", label: "Retrouver l'effectif d'un filtre dans un tableau croisé", notionId: "info_filtre_donnees", prerequis: ["info_filtre_et", "info_filtre_ou", "info_filtre_non"] },

  /* ═══════ PHÉNOMÈNES ALÉATOIRES : PROBABILITÉ CONDITIONNELLE ═══════ */

  { id: "alea_cond_reconnaitre", label: "Reconnaître une probabilité conditionnelle dans un énoncé (« parmi », « sachant que »)", notionId: "alea_conditionnelle", prerequis: [] },
  { id: "alea_cond_notation", label: "Utiliser la notation P_A(B)", notionId: "alea_conditionnelle", prerequis: ["alea_cond_reconnaitre"] },
  { id: "alea_cond_tableau", label: "Calculer une probabilité conditionnelle à l'aide d'un tableau croisé d'effectifs", notionId: "alea_conditionnelle", prerequis: ["alea_cond_notation"] },
  { id: "alea_cond_formule", label: "Utiliser P_A(B) = P(A ∩ B) / P(A)", notionId: "alea_conditionnelle", prerequis: ["alea_cond_notation"] },
  { id: "alea_cond_intersection", label: "Calculer P(A ∩ B) à partir de P(A) et de P_A(B)", notionId: "alea_conditionnelle", prerequis: ["alea_cond_formule"] },
  { id: "alea_cond_interpreter", label: "Interpréter une probabilité conditionnelle par une phrase", notionId: "alea_conditionnelle", prerequis: ["alea_cond_tableau"] },
  { id: "alea_cond_faux_positifs", label: "Distinguer P_A(B) et P_B(A) dans un test médical (faux positifs)", notionId: "alea_conditionnelle", prerequis: ["alea_cond_interpreter", "alea_cond_formule"] },

  /* ═══════ PHÉNOMÈNES ALÉATOIRES : ARBRE PONDÉRÉ ═══════ */

  { id: "alea_arbre_lire", label: "Lire les probabilités portées par les branches d'un arbre pondéré", notionId: "alea_arbre_pondere", prerequis: [] },
  { id: "alea_arbre_completer", label: "Compléter un arbre pondéré", notionId: "alea_arbre_pondere", prerequis: ["alea_arbre_lire"] },
  { id: "alea_arbre_construire", label: "Construire un arbre pondéré à partir d'un énoncé", notionId: "alea_arbre_pondere", prerequis: ["alea_arbre_completer"] },
  { id: "alea_arbre_chemin", label: "Calculer la probabilité d'un chemin en multipliant les branches", notionId: "alea_arbre_pondere", prerequis: ["alea_arbre_lire"] },
  { id: "alea_arbre_somme_chemins", label: "Calculer la probabilité d'un évènement comme somme de chemins", notionId: "alea_arbre_pondere", prerequis: ["alea_arbre_chemin"] },
  { id: "alea_arbre_vers_tableau", label: "Passer d'un arbre pondéré à un tableau croisé, et inversement", notionId: "alea_arbre_pondere", prerequis: ["alea_arbre_somme_chemins"] },

  /* ═══════ PHÉNOMÈNES ALÉATOIRES : INDÉPENDANCE ═══════ */

  { id: "alea_indep_definition", label: "Reconnaître l'indépendance de deux évènements : P_B(A) = P(A)", notionId: "alea_independance", prerequis: [] },
  { id: "alea_indep_produit", label: "Utiliser P(A ∩ B) = P(A) × P(B) pour deux évènements indépendants", notionId: "alea_independance", prerequis: ["alea_indep_definition"] },
  { id: "alea_indep_justifier", label: "Justifier par un calcul que deux évènements sont indépendants, ou ne le sont pas", notionId: "alea_independance", prerequis: ["alea_indep_produit"] },
  { id: "alea_indep_incompatible", label: "Distinguer indépendance et incompatibilité", notionId: "alea_independance", prerequis: ["alea_indep_definition"] },

  /* ═══════ PHÉNOMÈNES ALÉATOIRES : RÉPÉTITION D'ÉPREUVES ═══════ */

  { id: "alea_bern_epreuve", label: "Reconnaître une épreuve de Bernoulli (succès, échec)", notionId: "alea_bernoulli", prerequis: [] },
  { id: "alea_bern_repetition", label: "Reconnaître une répétition d'épreuves identiques et indépendantes", notionId: "alea_bernoulli", prerequis: ["alea_bern_epreuve"] },
  { id: "alea_bern_arbre", label: "Représenter par un arbre la répétition de n épreuves (n ≤ 4)", notionId: "alea_bernoulli", prerequis: ["alea_bern_repetition"] },
  { id: "alea_bern_calculer", label: "Calculer une probabilité sur une répétition d'épreuves", notionId: "alea_bernoulli", prerequis: ["alea_bern_arbre"] },
  { id: "alea_bern_au_moins_un", label: "Calculer la probabilité d'« au moins un succès » par l'évènement contraire", notionId: "alea_bernoulli", prerequis: ["alea_bern_calculer"] },
  { id: "alea_bern_avec_sans_remise", label: "Distinguer un tirage avec remise (indépendance) d'un tirage sans remise", notionId: "alea_bernoulli", prerequis: ["alea_bern_repetition"] },

  /* ═══════════ VARIATION LINÉAIRE : SUITES ARITHMÉTIQUES ═══════════ */

  { id: "lin_suite_reconnaitre", label: "Reconnaître une suite arithmétique et déterminer sa raison", notionId: "lin_suite_arithmetique", prerequis: [] },
  { id: "lin_suite_recurrence", label: "Utiliser la relation de récurrence u(n+1) = u(n) + r", notionId: "lin_suite_arithmetique", prerequis: ["lin_suite_reconnaitre"] },
  { id: "lin_suite_terme_rang", label: "Calculer un terme de rang donné d'une suite arithmétique", notionId: "lin_suite_arithmetique", prerequis: ["lin_suite_recurrence"] },
  { id: "lin_suite_explicite", label: "Exprimer u(n) en fonction de n pour une suite arithmétique", notionId: "lin_suite_arithmetique", prerequis: ["lin_suite_terme_rang"] },
  { id: "lin_suite_variation", label: "Déterminer le sens de variation d'une suite arithmétique selon le signe de r", notionId: "lin_suite_arithmetique", prerequis: ["lin_suite_reconnaitre"] },
  { id: "lin_suite_graphique", label: "Représenter graphiquement les termes d'une suite arithmétique", notionId: "lin_suite_arithmetique", prerequis: ["lin_suite_explicite"] },
  { id: "lin_suite_notation", label: "Passer de la notation fonctionnelle u(n) à la notation indicielle uₙ", notionId: "lin_suite_arithmetique", prerequis: ["lin_suite_recurrence"] },
  { id: "lin_suite_interpreter", label: "Interpréter un terme de la suite dans le contexte de l'énoncé", notionId: "lin_suite_arithmetique", prerequis: ["lin_suite_terme_rang"] },

  /* ═══════════ VARIATION LINÉAIRE : FONCTIONS AFFINES ═══════════ */

  { id: "lin_affine_expression", label: "Déterminer l'expression d'une fonction affine", notionId: "lin_fonction_affine", prerequis: [] },
  { id: "lin_affine_taux_accroissement", label: "Relier le taux d'accroissement et le coefficient directeur de la droite", notionId: "lin_fonction_affine", prerequis: ["lin_affine_expression"] },
  { id: "lin_affine_variation", label: "Déterminer le sens de variation d'une fonction affine", notionId: "lin_fonction_affine", prerequis: ["lin_affine_expression"] },
  { id: "lin_affine_graphique", label: "Représenter graphiquement une fonction affine", notionId: "lin_fonction_affine", prerequis: ["lin_affine_expression"] },
  { id: "lin_affine_par_morceaux", label: "Lire une fonction affine par morceaux (barème d'impôt, tarif progressif)", notionId: "lin_fonction_affine", prerequis: ["lin_affine_graphique"] },
  { id: "lin_affine_point_equilibre", label: "Déterminer un point d'équilibre entre deux fonctions affines (offre et demande)", notionId: "lin_fonction_affine", prerequis: ["lin_affine_graphique"] },

  /* ═══════════ VARIATION LINÉAIRE : MODÉLISER, SEUIL ═══════════ */

  { id: "lin_modele_reconnaitre", label: "Reconnaître un phénomène de croissance linéaire, discret ou continu", notionId: "lin_modele_seuil", prerequis: [] },
  { id: "lin_modele_choisir", label: "Modéliser une situation par une suite arithmétique ou une fonction affine", notionId: "lin_modele_seuil", prerequis: ["lin_modele_reconnaitre"] },
  { id: "lin_seuil_calcul", label: "Résoudre un problème de seuil par le calcul (croissance linéaire)", notionId: "lin_modele_seuil", prerequis: ["lin_modele_choisir"] },
  { id: "lin_seuil_tableau", label: "Résoudre un problème de seuil à l'aide d'un tableau de valeurs", notionId: "lin_modele_seuil", prerequis: ["lin_modele_choisir"] },
  { id: "lin_seuil_graphique", label: "Résoudre un problème de seuil par lecture graphique", notionId: "lin_modele_seuil", prerequis: ["lin_modele_choisir"] },
  { id: "lin_modele_conclure", label: "Répondre à la question posée par une phrase, dans le contexte", notionId: "lin_modele_seuil", prerequis: ["lin_seuil_calcul"] },

  /* ═══════ MODÉLISATION QUADRATIQUE : PARABOLE ET EXPRESSION ═══════ */

  { id: "quad_associer_parabole", label: "Associer une parabole à une expression de degré 2 (ax², ax² + c, a(x − x₁)(x − x₂))", notionId: "quad_parabole_expression", prerequis: [] },
  { id: "quad_role_a", label: "Interpréter le rôle du coefficient a (orientation et ouverture de la parabole)", notionId: "quad_parabole_expression", prerequis: ["quad_associer_parabole"] },
  { id: "quad_role_c", label: "Interpréter le rôle de c (translation verticale)", notionId: "quad_parabole_expression", prerequis: ["quad_associer_parabole"] },
  { id: "quad_image_calculer", label: "Calculer l'image d'un nombre par une fonction polynôme de degré 2", notionId: "quad_parabole_expression", prerequis: [] },
  { id: "quad_lire_racines_courbe", label: "Lire les racines sur la courbe et les relier à la forme factorisée", notionId: "quad_parabole_expression", prerequis: ["quad_associer_parabole"] },

  /* ═══════ MODÉLISATION QUADRATIQUE : ÉLÉMENTS CARACTÉRISTIQUES ═══════ */

  { id: "quad_allure", label: "Déterminer l'allure de la courbe selon le signe de a", notionId: "quad_elements_caracteristiques", prerequis: [] },
  { id: "quad_axe_symetrie", label: "Déterminer l'axe de symétrie d'une parabole", notionId: "quad_elements_caracteristiques", prerequis: ["quad_allure"] },
  { id: "quad_sommet", label: "Déterminer les coordonnées du sommet", notionId: "quad_elements_caracteristiques", prerequis: ["quad_axe_symetrie"] },
  { id: "quad_extremum", label: "Déterminer le maximum ou le minimum d'une fonction polynôme de degré 2", notionId: "quad_elements_caracteristiques", prerequis: ["quad_sommet"] },
  { id: "quad_tableau_variations", label: "Dresser le tableau de variations d'une fonction polynôme de degré 2", notionId: "quad_elements_caracteristiques", prerequis: ["quad_extremum"] },
  { id: "quad_symetrie_images", label: "Utiliser la symétrie de la parabole pour comparer deux images", notionId: "quad_elements_caracteristiques", prerequis: ["quad_axe_symetrie"] },

  /* ═══════ MODÉLISATION QUADRATIQUE : RACINES ET SIGNE ═══════ */

  { id: "quad_racines_factorisee", label: "Déterminer les racines à partir de la forme factorisée", notionId: "quad_racines_signe", prerequis: [] },
  { id: "quad_signe_tableau", label: "Dresser le tableau de signes d'un polynôme de degré 2 factorisé", notionId: "quad_racines_signe", prerequis: ["quad_racines_factorisee"] },
  { id: "quad_inequation", label: "Résoudre une inéquation du second degré à l'aide du tableau de signes", notionId: "quad_racines_signe", prerequis: ["quad_signe_tableau"] },
  { id: "quad_ecrire_factorisee", label: "Écrire la forme factorisée connaissant les racines", notionId: "quad_racines_signe", prerequis: ["quad_racines_factorisee"] },
  { id: "quad_verifier_developpee", label: "Vérifier qu'une forme factorisée correspond bien à la forme développée", notionId: "quad_racines_signe", prerequis: ["quad_ecrire_factorisee"] },

  /* ═══════ VARIATION EXPONENTIELLE : SUITES GÉOMÉTRIQUES ═══════ */

  { id: "expo_suite_reconnaitre", label: "Reconnaître une suite géométrique et déterminer sa raison", notionId: "expo_suite_geometrique", prerequis: [] },
  { id: "expo_suite_recurrence", label: "Utiliser la relation de récurrence u(n+1) = q × u(n)", notionId: "expo_suite_geometrique", prerequis: ["expo_suite_reconnaitre"] },
  { id: "expo_suite_terme_rang", label: "Calculer un terme de rang donné d'une suite géométrique", notionId: "expo_suite_geometrique", prerequis: ["expo_suite_recurrence"] },
  { id: "expo_suite_explicite", label: "Exprimer u(n) en fonction de n pour une suite géométrique", notionId: "expo_suite_geometrique", prerequis: ["expo_suite_terme_rang"] },
  { id: "expo_suite_variation", label: "Déterminer le sens de variation d'une suite géométrique selon la raison", notionId: "expo_suite_geometrique", prerequis: ["expo_suite_reconnaitre"] },
  { id: "expo_suite_graphique", label: "Représenter graphiquement les termes d'une suite géométrique", notionId: "expo_suite_geometrique", prerequis: ["expo_suite_explicite"] },
  { id: "expo_suite_taux", label: "Relier la raison à un taux d'évolution (+ 20 % → q = 1,2)", notionId: "expo_suite_geometrique", prerequis: ["expo_suite_reconnaitre"] },
  { id: "expo_suite_interpreter", label: "Interpréter un terme de la suite dans le contexte de l'énoncé", notionId: "expo_suite_geometrique", prerequis: ["expo_suite_terme_rang"] },

  /* ═══════ VARIATION EXPONENTIELLE : FONCTIONS x ↦ a^x ═══════ */

  { id: "expo_fct_reconnaitre", label: "Reconnaître une fonction exponentielle x ↦ a^x (a > 0)", notionId: "expo_fonction_base_a", prerequis: [] },
  { id: "expo_fct_calculer", label: "Calculer l'image d'un réel positif par une fonction exponentielle", notionId: "expo_fonction_base_a", prerequis: ["expo_fct_reconnaitre"] },
  { id: "expo_fct_proprietes", label: "Utiliser les propriétés algébriques (a^(x+y) = a^x × a^y)", notionId: "expo_fonction_base_a", prerequis: ["expo_fct_calculer"] },
  { id: "expo_fct_variations", label: "Déterminer le sens de variation selon que a > 1 ou 0 < a < 1", notionId: "expo_fonction_base_a", prerequis: ["expo_fct_reconnaitre"] },
  { id: "expo_fct_graphique", label: "Lire et exploiter la représentation graphique d'une fonction exponentielle", notionId: "expo_fonction_base_a", prerequis: ["expo_fct_variations"] },
  { id: "expo_fct_exposant_fractionnaire", label: "Utiliser l'exposant 1/n (racine n-ième d'un réel positif)", notionId: "expo_fonction_base_a", prerequis: ["expo_fct_proprietes"] },
  { id: "expo_fct_prolonger_suite", label: "Relier une suite géométrique et la fonction exponentielle qui la prolonge", notionId: "expo_fonction_base_a", prerequis: ["expo_fct_graphique"] },

  /* ═══════ VARIATION EXPONENTIELLE : TAUX MOYEN ═══════ */

  { id: "expo_taux_moyen_sens", label: "Comprendre ce qu'est un taux d'évolution moyen", notionId: "expo_taux_moyen", prerequis: [] },
  { id: "expo_taux_moyen_calculer", label: "Calculer un taux d'évolution moyen correspondant à n évolutions successives", notionId: "expo_taux_moyen", prerequis: ["expo_taux_moyen_sens"] },
  { id: "expo_taux_moyen_global", label: "Relier taux d'évolution global et taux d'évolution moyen", notionId: "expo_taux_moyen", prerequis: ["expo_taux_moyen_calculer"] },
  { id: "expo_taux_moyen_interpreter", label: "Interpréter un taux d'évolution moyen dans le contexte", notionId: "expo_taux_moyen", prerequis: ["expo_taux_moyen_global"] },

  /* ═══════ VARIATION EXPONENTIELLE : MODÉLISER, SEUIL ═══════ */

  { id: "expo_modele_reconnaitre", label: "Reconnaître un phénomène de croissance ou de décroissance exponentielle", notionId: "expo_modele_seuil", prerequis: [] },
  { id: "expo_modele_choisir", label: "Modéliser une situation par une suite géométrique ou une fonction exponentielle", notionId: "expo_modele_seuil", prerequis: ["expo_modele_reconnaitre"] },
  { id: "expo_modele_comparer", label: "Comparer un modèle linéaire et un modèle exponentiel sur une même situation", notionId: "expo_modele_seuil", prerequis: ["expo_modele_choisir"] },
  { id: "expo_seuil_calcul", label: "Résoudre un problème de seuil par le calcul (croissance exponentielle)", notionId: "expo_modele_seuil", prerequis: ["expo_modele_choisir"] },
  { id: "expo_seuil_tableau", label: "Résoudre un problème de seuil à l'aide d'un tableau de valeurs", notionId: "expo_modele_seuil", prerequis: ["expo_modele_choisir"] },
  { id: "expo_seuil_graphique", label: "Résoudre un problème de seuil par lecture graphique", notionId: "expo_modele_seuil", prerequis: ["expo_modele_choisir"] },
  { id: "expo_ordre_grandeur", label: "Estimer l'ordre de grandeur d'une quantité en évolution exponentielle", notionId: "expo_modele_seuil", prerequis: ["expo_modele_reconnaitre"] },
  { id: "expo_demi_vie", label: "Exploiter une demi-vie ou un temps de doublement", notionId: "expo_modele_seuil", prerequis: ["expo_seuil_calcul"] },

  /* ═══════ DÉRIVATION : NOMBRE DÉRIVÉ ET TANGENTE ═══════ */

  { id: "der_nombre_derive_sens", label: "Interpréter le nombre dérivé comme une vitesse de variation instantanée", notionId: "der_nombre_derive_tangente", prerequis: [] },
  { id: "der_tangente_coefficient", label: "Interpréter géométriquement le nombre dérivé comme coefficient directeur de la tangente", notionId: "der_nombre_derive_tangente", prerequis: ["der_nombre_derive_sens"] },
  { id: "der_tangente_lire", label: "Lire graphiquement un nombre dérivé sur une tangente tracée", notionId: "der_nombre_derive_tangente", prerequis: ["der_tangente_coefficient"] },
  { id: "der_tangente_signe", label: "Déduire le signe du nombre dérivé de l'allure de la courbe", notionId: "der_nombre_derive_tangente", prerequis: ["der_tangente_lire"] },
  { id: "der_tangente_horizontale", label: "Reconnaître une tangente horizontale et l'extremum associé", notionId: "der_nombre_derive_tangente", prerequis: ["der_tangente_signe"] },
  { id: "der_comparer_vitesses", label: "Comparer les vitesses de variation en deux points d'une même courbe", notionId: "der_nombre_derive_tangente", prerequis: ["der_tangente_lire"] },
  { id: "der_modele_interpreter", label: "Interpréter le nombre dérivé dans un modèle d'évolution (croissance, coût marginal)", notionId: "der_nombre_derive_tangente", prerequis: ["der_nombre_derive_sens"] },

  /* ═══════ DÉRIVATION : DÉRIVÉE D'UN POLYNÔME ═══════ */

  { id: "der_derivee_constante", label: "Dériver une fonction constante", notionId: "der_derivee_polynome", prerequis: [] },
  { id: "der_derivee_identite", label: "Dériver la fonction identité et une fonction affine", notionId: "der_derivee_polynome", prerequis: ["der_derivee_constante"] },
  { id: "der_derivee_carre_cube", label: "Dériver les fonctions carré et cube", notionId: "der_derivee_polynome", prerequis: ["der_derivee_identite"] },
  { id: "der_derivee_produit_reel", label: "Dériver le produit d'une fonction par un nombre réel", notionId: "der_derivee_polynome", prerequis: ["der_derivee_carre_cube"] },
  { id: "der_derivee_somme", label: "Dériver une somme de fonctions", notionId: "der_derivee_polynome", prerequis: ["der_derivee_produit_reel"] },
  { id: "der_derivee_degre2", label: "Calculer la dérivée d'un polynôme de degré 2", notionId: "der_derivee_polynome", prerequis: ["der_derivee_somme"] },
  { id: "der_derivee_degre3", label: "Calculer la dérivée d'un polynôme de degré 3", notionId: "der_derivee_polynome", prerequis: ["der_derivee_degre2"] },
  { id: "der_calculer_nombre_derive", label: "Calculer f'(a) à partir de l'expression de la dérivée", notionId: "der_derivee_polynome", prerequis: ["der_derivee_degre2"] },

  /* ═══════ DÉRIVATION : SIGNE ET VARIATIONS ═══════ */

  { id: "der_signe_etudier", label: "Étudier le signe de la fonction dérivée sur un intervalle", notionId: "der_signe_variations", prerequis: [] },
  { id: "der_signe_factorisee", label: "Exploiter une forme factorisée de la dérivée pour en étudier le signe", notionId: "der_signe_variations", prerequis: ["der_signe_etudier"] },
  { id: "der_verifier_forme_factorisee", label: "Vérifier qu'une forme factorisée donnée est bien celle de la dérivée", notionId: "der_signe_variations", prerequis: ["der_signe_factorisee"] },
  { id: "der_variations_deduire", label: "Déduire le sens de variation d'une fonction du signe de sa dérivée", notionId: "der_signe_variations", prerequis: ["der_signe_factorisee"] },
  { id: "der_tableau_dresser", label: "Dresser le tableau de variations à partir du signe de la dérivée", notionId: "der_signe_variations", prerequis: ["der_variations_deduire"] },
  { id: "der_extremum_determiner", label: "Déterminer un extremum et la valeur où il est atteint", notionId: "der_signe_variations", prerequis: ["der_tableau_dresser"] },
  { id: "der_optimisation", label: "Résoudre un problème d'optimisation (bénéfice maximal, coût minimal)", notionId: "der_signe_variations", prerequis: ["der_extremum_determiner"] },
  { id: "der_prevoir_evolution", label: "Prévoir l'évolution d'un phénomène grâce à l'étude de la dérivée", notionId: "der_signe_variations", prerequis: ["der_tableau_dresser"] },
];
