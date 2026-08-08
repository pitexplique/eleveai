import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

// Micro-competences de seconde alignees sur le programme officiel (BO).
export const microSkills: MicroSkillSource[] = [
  /* ===================== reels_intervalles ===================== */
  { id: "reels_ensembles", label: "Distinguer les ensembles N, Z, D, Q et R", notionId: "reels_intervalles", prerequis: [] },
  { id: "reels_droite_graduee", label: "Associer un reel a un point de la droite graduee", notionId: "reels_intervalles", prerequis: ["reels_ensembles"] },
  { id: "intervalle_representer", label: "Representer un intervalle sur une droite", notionId: "reels_intervalles", prerequis: ["reels_droite_graduee"] },
  { id: "intervalle_appartenance", label: "Determiner si un nombre appartient a un intervalle", notionId: "reels_intervalles", prerequis: ["intervalle_representer"] },
  { id: "valeur_absolue_distance", label: "Interpreter la valeur absolue comme une distance", notionId: "reels_intervalles", prerequis: ["intervalle_appartenance"] },
  { id: "reels_encadrement", label: "Donner un encadrement decimal d'un reel", notionId: "reels_intervalles", prerequis: ["reels_ensembles"] },

  /* ===================== arithmetique_entiers ===================== */
  { id: "arith_multiple_diviseur", label: "Utiliser multiple, diviseur, pair et impair", notionId: "arithmetique_entiers", prerequis: [] },
  { id: "arith_nombre_premier", label: "Reconnaitre un nombre premier", notionId: "arithmetique_entiers", prerequis: ["arith_multiple_diviseur"] },
  { id: "arith_fraction_irreductible", label: "Rendre une fraction irreductible", notionId: "arithmetique_entiers", prerequis: ["arith_multiple_diviseur"] },
  { id: "arith_probleme", label: "Modeliser un probleme avec multiples et diviseurs", notionId: "arithmetique_entiers", prerequis: ["arith_nombre_premier", "arith_fraction_irreductible"] },

  /* ===================== puissances_2de ===================== */
  { id: "puiss_calcul", label: "Calculer une puissance a exposant entier", notionId: "puissances_2de", prerequis: ["reels_ensembles"] },
  { id: "puiss_produit_quotient", label: "Utiliser le produit et le quotient de puissances de meme base", notionId: "puissances_2de", prerequis: ["puiss_calcul"] },
  { id: "puiss_puissance_puissance", label: "Calculer une puissance d'une puissance", notionId: "puissances_2de", prerequis: ["puiss_produit_quotient"] },
  { id: "puiss_exposant_negatif", label: "Utiliser un exposant negatif (a^-n = 1/a^n)", notionId: "puissances_2de", prerequis: ["puiss_calcul"] },

  /* ===================== racine_carree_2de ===================== */
  { id: "racine_calcul", label: "Calculer une racine carree", notionId: "racine_carree_2de", prerequis: ["puiss_calcul"] },
  { id: "racine_carre_de_a2", label: "Utiliser racine de a^2 = |a|", notionId: "racine_carree_2de", prerequis: ["racine_calcul", "valeur_absolue_distance"] },
  { id: "racine_produit", label: "Utiliser racine de ab = racine de a x racine de b", notionId: "racine_carree_2de", prerequis: ["racine_calcul"] },
  { id: "racine_simplification", label: "Simplifier une racine carree (racine de 50 = 5 racine de 2)", notionId: "racine_carree_2de", prerequis: ["racine_produit"] },

  /* ===================== developpement_factorisation_2de ===================== */
  { id: "devfac_developper_simple", label: "Developper une expression du type k(a+b)", notionId: "developpement_factorisation_2de", prerequis: [] },
  { id: "devfac_developper_double", label: "Developper un produit (a+b)(c+d)", notionId: "developpement_factorisation_2de", prerequis: ["devfac_developper_simple"] },
  { id: "devfac_facteur_commun", label: "Factoriser par un facteur commun", notionId: "developpement_factorisation_2de", prerequis: ["devfac_developper_simple"] },
  { id: "devfac_factoriser_identite", label: "Factoriser a l'aide d'une identite remarquable", notionId: "developpement_factorisation_2de", prerequis: ["devfac_facteur_commun"] },
  { id: "devfac_choisir_forme", label: "Choisir la forme la plus adaptee (developpee ou factorisee)", notionId: "developpement_factorisation_2de", prerequis: ["devfac_facteur_commun", "devfac_developper_double"] },

  /* ===================== identites_remarquables_2de ===================== */
  { id: "ir_carre_somme", label: "Utiliser (a+b)^2 = a^2 + 2ab + b^2", notionId: "identites_remarquables_2de", prerequis: ["devfac_developper_double"] },
  { id: "ir_carre_difference", label: "Utiliser (a-b)^2 = a^2 - 2ab + b^2", notionId: "identites_remarquables_2de", prerequis: ["ir_carre_somme"] },
  { id: "ir_difference_carres", label: "Utiliser a^2 - b^2 = (a-b)(a+b)", notionId: "identites_remarquables_2de", prerequis: ["ir_carre_somme"] },
  { id: "ir_calcul_mental", label: "Calculer mentalement a l'aide d'une identite remarquable", notionId: "identites_remarquables_2de", prerequis: ["ir_carre_somme", "ir_difference_carres"] },
  { id: "ir_application", label: "Appliquer les identites remarquables dans les deux sens", notionId: "identites_remarquables_2de", prerequis: ["ir_carre_difference", "ir_difference_carres"] },

  /* ===================== expressions_litterales_2de ===================== */
  { id: "expr_modeliser", label: "Modeliser une situation par une expression litterale", notionId: "expressions_litterales_2de", prerequis: ["devfac_developper_simple"] },
  { id: "expr_exprimer_variable", label: "Exprimer une variable en fonction des autres dans une formule", notionId: "expressions_litterales_2de", prerequis: ["devfac_developper_simple"] },
  { id: "expr_reduire_substituer", label: "Reduire une expression et substituer une valeur", notionId: "expressions_litterales_2de", prerequis: ["devfac_developper_simple"] },

  /* ===================== equations_inequations_1er_degre ===================== */
  { id: "equation_resoudre", label: "Resoudre une equation du premier degre", notionId: "equations_inequations_1er_degre", prerequis: ["devfac_developper_simple"] },
  { id: "equation_probleme", label: "Mettre un probleme en equation", notionId: "equations_inequations_1er_degre", prerequis: ["equation_resoudre", "expr_modeliser"] },
  { id: "inequation_resoudre", label: "Resoudre une inequation du premier degre", notionId: "equations_inequations_1er_degre", prerequis: ["equation_resoudre", "intervalle_representer"] },
  { id: "inequation_intervalle", label: "Traduire une inequation en intervalle de solutions", notionId: "equations_inequations_1er_degre", prerequis: ["inequation_resoudre", "intervalle_appartenance"] },
  { id: "comparer_difference_quotient", label: "Comparer deux quantites par leur difference ou leur quotient", notionId: "equations_inequations_1er_degre", prerequis: ["inequation_resoudre"] },

  /* ===================== vecteurs_plan ===================== */
  { id: "vecteur_definition", label: "Comprendre direction, sens et norme d'un vecteur", notionId: "vecteurs_plan", prerequis: [] },
  { id: "vecteur_egalite", label: "Reconnaitre deux vecteurs egaux", notionId: "vecteurs_plan", prerequis: ["vecteur_definition"] },
  { id: "vecteur_somme", label: "Construire la somme de deux vecteurs (relation de Chasles)", notionId: "vecteurs_plan", prerequis: ["vecteur_egalite"] },
  { id: "vecteur_coordonnees", label: "Calculer les coordonnees d'un vecteur", notionId: "vecteurs_plan", prerequis: ["repere_coordonnees_point"] },
  { id: "vecteur_norme", label: "Calculer la norme d'un vecteur", notionId: "vecteurs_plan", prerequis: ["vecteur_coordonnees", "repere_distance"] },
  { id: "vecteur_produit_reel", label: "Multiplier un vecteur par un nombre reel", notionId: "vecteurs_plan", prerequis: ["vecteur_coordonnees"] },
  { id: "vecteur_colinearite", label: "Etudier la colinearite avec le determinant (alignement, parallelisme)", notionId: "vecteurs_plan", prerequis: ["vecteur_produit_reel", "vecteur_coordonnees"] },

  /* ===================== repere_coordonnees ===================== */
  { id: "repere_coordonnees_point", label: "Lire et placer un point dans un repere", notionId: "repere_coordonnees", prerequis: [] },
  { id: "repere_milieu", label: "Calculer les coordonnees d'un milieu", notionId: "repere_coordonnees", prerequis: ["repere_coordonnees_point"] },
  { id: "repere_distance", label: "Calculer une distance dans un repere orthonorme", notionId: "repere_coordonnees", prerequis: ["repere_coordonnees_point"] },

  /* ===================== droites_plan ===================== */
  { id: "droite_pente_ordonne", label: "Lire pente et ordonnee a l'origine", notionId: "droites_plan", prerequis: ["repere_coordonnees_point"] },
  { id: "droite_vecteur_directeur", label: "Determiner un vecteur directeur d'une droite", notionId: "droites_plan", prerequis: ["vecteur_coordonnees"] },
  { id: "droite_equation_reduite", label: "Determiner une equation reduite de droite", notionId: "droites_plan", prerequis: ["droite_pente_ordonne", "equation_resoudre"] },
  { id: "droite_equation_cartesienne", label: "Determiner et utiliser une equation cartesienne", notionId: "droites_plan", prerequis: ["droite_vecteur_directeur", "droite_equation_reduite"] },
  { id: "droite_parallelisme", label: "Exploiter le coefficient directeur pour le parallelisme", notionId: "droites_plan", prerequis: ["droite_equation_reduite"] },
  { id: "droite_intersection", label: "Trouver l'intersection de deux droites", notionId: "droites_plan", prerequis: ["droite_equation_reduite", "equation_resoudre"] },
  { id: "droite_systeme", label: "Resoudre un systeme de deux equations a deux inconnues", notionId: "droites_plan", prerequis: ["droite_intersection", "equation_resoudre"] },

  /* ===================== geometrie_problemes_plan ===================== */
  { id: "geo_projete_orthogonal", label: "Determiner le projete orthogonal d'un point sur une droite", notionId: "geometrie_problemes_plan", prerequis: [] },
  { id: "geo_trigonometrie", label: "Utiliser sinus, cosinus et tangente dans le triangle rectangle", notionId: "geometrie_problemes_plan", prerequis: [] },
  { id: "geo_trig_identite", label: "Utiliser la relation cos^2 + sin^2 = 1", notionId: "geometrie_problemes_plan", prerequis: ["geo_trigonometrie"] },
  { id: "geo_longueurs_aires", label: "Calculer longueurs, angles et aires dans une configuration", notionId: "geometrie_problemes_plan", prerequis: ["geo_trigonometrie"] },
  { id: "geo_optimisation", label: "Traiter un probleme d'optimisation geometrique", notionId: "geometrie_problemes_plan", prerequis: ["geo_longueurs_aires"] },

  /* ===================== fonction_vocabulaire_2de ===================== */
  { id: "fonction_vocabulaire", label: "Utiliser image, antecedent et courbe representative", notionId: "fonction_vocabulaire_2de", prerequis: [] },
  { id: "fonction_image_formule", label: "Calculer une image avec une formule", notionId: "fonction_vocabulaire_2de", prerequis: ["fonction_vocabulaire", "devfac_developper_simple"] },
  { id: "fonction_antecedent", label: "Rechercher un antecedent", notionId: "fonction_vocabulaire_2de", prerequis: ["fonction_image_formule", "equation_resoudre"] },
  { id: "fonction_tableau_graphique", label: "Passer d'un tableau a un graphique", notionId: "fonction_vocabulaire_2de", prerequis: ["fonction_vocabulaire"] },
  { id: "fonction_resolution_graphique", label: "Resoudre graphiquement f(x)=k ou f(x)<k", notionId: "fonction_vocabulaire_2de", prerequis: ["fonction_vocabulaire", "fonction_antecedent"] },
  { id: "fonction_tableau_signes", label: "Resoudre une equation/inequation produit ou quotient avec un tableau de signes", notionId: "fonction_vocabulaire_2de", prerequis: ["fonction_image_formule"] },
  { id: "fonction_parite", label: "Reconnaitre une fonction paire ou impaire", notionId: "fonction_vocabulaire_2de", prerequis: ["fonction_image_formule"] },

  /* ===================== fonction_variations_extremums ===================== */
  { id: "variation_tableau", label: "Lire un tableau de variations", notionId: "fonction_variations_extremums", prerequis: ["fonction_vocabulaire"] },
  { id: "variation_croissance", label: "Decrire croissance et decroissance sur un intervalle", notionId: "fonction_variations_extremums", prerequis: ["variation_tableau", "intervalle_appartenance"] },
  { id: "variation_extremum", label: "Identifier minimum et maximum", notionId: "fonction_variations_extremums", prerequis: ["variation_croissance"] },

  /* ===================== fonctions_affines_2de ===================== */
  { id: "affine_forme", label: "Reconnaitre une fonction affine f(x)=ax+b", notionId: "fonctions_affines_2de", prerequis: ["fonction_image_formule"] },
  { id: "affine_calculer_image", label: "Calculer images et antecedents d'une fonction affine", notionId: "fonctions_affines_2de", prerequis: ["affine_forme", "equation_resoudre"] },
  { id: "affine_determiner_expression", label: "Determiner une fonction affine a partir de donnees", notionId: "fonctions_affines_2de", prerequis: ["affine_calculer_image", "droite_equation_reduite"] },
  { id: "affine_signe", label: "Etudier le signe d'une fonction affine", notionId: "fonctions_affines_2de", prerequis: ["affine_calculer_image", "inequation_resoudre"] },

  /* ===================== fonctions_reference_2de ===================== */
  { id: "reference_carre", label: "Connaitre la fonction carre", notionId: "fonctions_reference_2de", prerequis: ["fonction_vocabulaire"] },
  { id: "reference_inverse", label: "Connaitre la fonction inverse", notionId: "fonctions_reference_2de", prerequis: ["reference_carre"] },
  { id: "reference_racine", label: "Connaitre la fonction racine carree", notionId: "fonctions_reference_2de", prerequis: ["reference_carre"] },
  { id: "reference_cube", label: "Connaitre la fonction cube", notionId: "fonctions_reference_2de", prerequis: ["reference_carre"] },
  { id: "reference_comparer", label: "Comparer deux images avec une fonction de reference", notionId: "fonctions_reference_2de", prerequis: ["reference_carre", "reference_inverse", "reference_racine"] },
  { id: "reference_resoudre", label: "Resoudre f(x)=k pour une fonction de reference", notionId: "fonctions_reference_2de", prerequis: ["reference_carre", "fonction_resolution_graphique"] },

  /* ===================== information_chiffree_evolutions ===================== */
  { id: "info_proportion", label: "Calculer une proportion et un pourcentage d'une sous-population", notionId: "information_chiffree_evolutions", prerequis: [] },
  { id: "info_pourcentage_de_pourcentage", label: "Calculer un pourcentage de pourcentage", notionId: "information_chiffree_evolutions", prerequis: ["info_proportion"] },
  { id: "info_variation_absolue_relative", label: "Distinguer variation absolue et variation relative", notionId: "information_chiffree_evolutions", prerequis: ["info_proportion"] },
  { id: "info_taux_evolution", label: "Calculer un taux d'evolution et le coefficient multiplicateur", notionId: "information_chiffree_evolutions", prerequis: ["info_variation_absolue_relative"] },
  { id: "info_evolutions_successives", label: "Composer des evolutions successives", notionId: "information_chiffree_evolutions", prerequis: ["info_taux_evolution"] },
  { id: "info_evolution_reciproque", label: "Determiner une evolution reciproque", notionId: "information_chiffree_evolutions", prerequis: ["info_taux_evolution"] },

  /* ===================== statistiques_descriptives ===================== */
  { id: "stat_lire_serie", label: "Lire une serie statistique", notionId: "statistiques_descriptives", prerequis: [] },
  { id: "stat_moyenne", label: "Calculer une moyenne", notionId: "statistiques_descriptives", prerequis: ["stat_lire_serie"] },
  { id: "stat_moyenne_ponderee", label: "Calculer une moyenne ponderee", notionId: "statistiques_descriptives", prerequis: ["stat_moyenne"] },
  { id: "stat_mediane_quartiles", label: "Determiner mediane et quartiles", notionId: "statistiques_descriptives", prerequis: ["stat_lire_serie"] },
  { id: "stat_frequence", label: "Calculer une frequence", notionId: "statistiques_descriptives", prerequis: ["stat_lire_serie"] },
  { id: "stat_ecart_interquartile", label: "Determiner l'ecart interquartile", notionId: "statistiques_descriptives", prerequis: ["stat_mediane_quartiles"] },
  { id: "stat_ecart_type", label: "Calculer et interpreter l'ecart type", notionId: "statistiques_descriptives", prerequis: ["stat_moyenne"] },
  { id: "stat_interpreter", label: "Interpreter des indicateurs statistiques", notionId: "statistiques_descriptives", prerequis: ["stat_moyenne", "stat_mediane_quartiles", "stat_frequence"] },

  /* ===================== probabilites_ensemble_fini ===================== */
  { id: "proba_vocabulaire", label: "Utiliser issue, evenement et univers", notionId: "probabilites_ensemble_fini", prerequis: [] },
  { id: "proba_modele", label: "Construire une loi de probabilite sur un univers fini", notionId: "probabilites_ensemble_fini", prerequis: ["proba_vocabulaire"] },
  { id: "proba_calculer", label: "Calculer une probabilite par somme des issues", notionId: "probabilites_ensemble_fini", prerequis: ["proba_modele", "stat_frequence"] },
  { id: "proba_evenement_contraire", label: "Utiliser l'evenement contraire (complementaire)", notionId: "probabilites_ensemble_fini", prerequis: ["proba_calculer"] },
  { id: "proba_reunion_intersection", label: "Utiliser reunion et intersection d'evenements", notionId: "probabilites_ensemble_fini", prerequis: ["proba_calculer"] },
  { id: "proba_formule_union", label: "Utiliser P(A union B) + P(A inter B) = P(A) + P(B)", notionId: "probabilites_ensemble_fini", prerequis: ["proba_reunion_intersection"] },
  { id: "proba_tableau_arbre", label: "Organiser une experience avec tableau ou arbre", notionId: "probabilites_ensemble_fini", prerequis: ["proba_calculer"] },

  /* ===================== echantillonnage_simulation ===================== */
  { id: "echantillon_fluctuation", label: "Comprendre la fluctuation d'echantillonnage", notionId: "echantillonnage_simulation", prerequis: ["stat_frequence", "proba_calculer"] },
  { id: "echantillon_loi_grands_nombres", label: "Mobiliser la loi des grands nombres (estimation par frequence)", notionId: "echantillonnage_simulation", prerequis: ["echantillon_fluctuation"] },
  { id: "simulation_frequence", label: "Simuler une experience aleatoire et observer les frequences", notionId: "echantillonnage_simulation", prerequis: ["echantillon_fluctuation"] },
  { id: "echantillon_interpreter", label: "Interpreter un resultat de simulation", notionId: "echantillonnage_simulation", prerequis: ["simulation_frequence", "stat_interpreter"] },

  /* ===================== algorithmique_python_2de ===================== */
  { id: "python_variable_affectation", label: "Utiliser variables et affectations en Python", notionId: "algorithmique_python_2de", prerequis: [] },
  { id: "python_type_variable", label: "Choisir le type d'une variable (entier, flottant, booleen, chaine)", notionId: "algorithmique_python_2de", prerequis: ["python_variable_affectation"] },
  { id: "python_condition", label: "Ecrire une instruction conditionnelle", notionId: "algorithmique_python_2de", prerequis: ["python_variable_affectation", "inequation_resoudre"] },
  { id: "python_boucle", label: "Utiliser une boucle bornee (for)", notionId: "algorithmique_python_2de", prerequis: ["python_condition"] },
  { id: "python_boucle_non_bornee", label: "Utiliser une boucle non bornee (while)", notionId: "algorithmique_python_2de", prerequis: ["python_boucle"] },
  { id: "python_fonction", label: "Ecrire une fonction Python simple", notionId: "algorithmique_python_2de", prerequis: ["python_variable_affectation", "fonction_image_formule"] },
  { id: "python_simulation", label: "Programmer une simulation simple", notionId: "algorithmique_python_2de", prerequis: ["python_boucle", "simulation_frequence"] },

  /* ===================== logique_ensembles ===================== */
  { id: "logique_appartenance_inclusion", label: "Utiliser l'appartenance et l'inclusion (element, sous-ensemble)", notionId: "logique_ensembles", prerequis: [] },
  { id: "logique_union_intersection", label: "Utiliser reunion, intersection et complementaire d'ensembles", notionId: "logique_ensembles", prerequis: ["logique_appartenance_inclusion"] },
  { id: "logique_connecteurs", label: "Utiliser les connecteurs « et » et « ou »", notionId: "logique_ensembles", prerequis: [] },
  { id: "logique_negation_contre_exemple", label: "Formuler une negation, utiliser un contre-exemple", notionId: "logique_ensembles", prerequis: ["logique_connecteurs"] },
  { id: "logique_implication_reciproque", label: "Formuler une implication, une equivalence et une reciproque", notionId: "logique_ensembles", prerequis: ["logique_connecteurs"] },
];
