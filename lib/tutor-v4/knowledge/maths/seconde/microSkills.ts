import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

// Micro-compétences de seconde alignées sur le programme officiel (BO).
//
// ⭐ 07/09/2026 — CE FICHIER A ÉTÉ REPRIS EN ENTIER, pour deux défauts qui se
// voyaient à l'écran :
//   · il était écrit SANS AUCUN ACCENT (« Developper », « identite ») — 122
//     libellés sur 122, seul fichier de maths dans ce cas avec l'adulte ;
//   · ses formules étaient en ASCII (« (a+b)^2 = a^2 + 2ab + b^2 »).
// Les formules sont désormais entre `$…$` et rendues par KaTeX dans la liste du
// coach. ⚠️ DEUX ANTISLASHS DANS LE SOURCE : `"$\\sqrt{2}$"` — avec un seul,
// `\s` et `\f` sont mangés à la compilation, sans erreur.
// ⛔ Le vocabulaire LaTeX admis est celui que `lib/tutor-v4/libelleMath.ts` sait
// retraduire en texte (les kits imprimables, les URL YouTube et les `aria-label`
// lisent cette traduction) : une macro nouvelle s'ajoute LÀ-BAS d'abord.
export const microSkills: MicroSkillSource[] = [
  /* ===================== reels_intervalles ===================== */
  { id: "reels_ensembles", label: "Distinguer les ensembles $\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{D}$, $\\mathbb{Q}$ et $\\mathbb{R}$", notionId: "reels_intervalles", prerequis: [] },
  { id: "reels_droite_graduee", label: "Associer un réel à un point de la droite graduée", notionId: "reels_intervalles", prerequis: ["reels_ensembles"] },
  { id: "intervalle_representer", label: "Représenter un intervalle sur une droite", notionId: "reels_intervalles", prerequis: ["reels_droite_graduee"] },
  { id: "intervalle_appartenance", label: "Déterminer si un nombre appartient à un intervalle", notionId: "reels_intervalles", prerequis: ["intervalle_representer"] },
  { id: "valeur_absolue_distance", label: "Interpréter la valeur absolue comme une distance", notionId: "reels_intervalles", prerequis: ["intervalle_appartenance"] },
  { id: "reels_encadrement", label: "Donner un encadrement décimal d'un réel", notionId: "reels_intervalles", prerequis: ["reels_ensembles"] },

  /* ===================== arithmetique_entiers ===================== */
  { id: "arith_multiple_diviseur", label: "Utiliser multiple, diviseur, pair et impair", notionId: "arithmetique_entiers", prerequis: [] },
  { id: "arith_nombre_premier", label: "Reconnaitre un nombre premier", notionId: "arithmetique_entiers", prerequis: ["arith_multiple_diviseur"] },
  { id: "arith_fraction_irreductible", label: "Rendre une fraction irréductible", notionId: "arithmetique_entiers", prerequis: ["arith_multiple_diviseur"] },
  { id: "arith_probleme", label: "Modéliser un problème avec multiples et diviseurs", notionId: "arithmetique_entiers", prerequis: ["arith_nombre_premier", "arith_fraction_irreductible"] },

  /* ===================== puissances_2de ===================== */
  { id: "puiss_calcul", label: "Calculer une puissance à exposant entier", notionId: "puissances_2de", prerequis: ["reels_ensembles"] },
  { id: "puiss_produit_quotient", label: "Utiliser le produit et le quotient de puissances de même base", notionId: "puissances_2de", prerequis: ["puiss_calcul"] },
  { id: "puiss_puissance_puissance", label: "Calculer une puissance d'une puissance", notionId: "puissances_2de", prerequis: ["puiss_produit_quotient"] },
  { id: "puiss_exposant_negatif", label: "Utiliser un exposant négatif ($a^{-n} = \\frac{1}{a^n}$)", notionId: "puissances_2de", prerequis: ["puiss_calcul"] },

  /* ===================== racine_carree_2de ===================== */
  { id: "racine_calcul", label: "Calculer une racine carrée", notionId: "racine_carree_2de", prerequis: ["puiss_calcul"] },
  { id: "racine_carre_de_a2", label: "Utiliser $\\sqrt{a^2} = |a|$", notionId: "racine_carree_2de", prerequis: ["racine_calcul", "valeur_absolue_distance"] },
  { id: "racine_produit", label: "Utiliser $\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$", notionId: "racine_carree_2de", prerequis: ["racine_calcul"] },
  { id: "racine_simplification", label: "Simplifier une racine carrée ($\\sqrt{50} = 5\\sqrt{2}$)", notionId: "racine_carree_2de", prerequis: ["racine_produit"] },
  // ⭐ AJOUTE LE 08/09/2026. Le coach n'avait qu'un seul item sur l'addition
  // de radicaux, et rien sur son interdit. Or le controle commun de mars 2025
  // le demande : √75 − √48 sous la forme a√3, ce qui exige de simplifier PUIS
  // de soustraire des radicaux identiques.
  { id: "racine_somme", label: "Additionner des racines carrées : seulement à radical identique", notionId: "racine_carree_2de", prerequis: ["racine_simplification"] },
  // ⭐ LA FONCTION, INTRODUITE DES LE CHAPITRE DE LA RACINE (08/09/2026).
  // `reference_racine` la traite aussi, mais dans `fonctions_reference_2de`,
  // plus tard dans l'annee. Frederic l'amene ICI : faire calculer l'image de 4
  // et montrer que -1 n'en a pas rend le domaine VISIBLE, au lieu d'enoncer
  // une interdiction que l'eleve doit croire sur parole.
  { id: "racine_domaine", label: "Lire une image et le domaine sur la courbe de la fonction racine carrée", notionId: "racine_carree_2de", prerequis: ["racine_calcul"] },

  /* ===================== developpement_factorisation_2de ===================== */
  { id: "devfac_developper_simple", label: "Développer une expression du type $k(a+b)$", notionId: "developpement_factorisation_2de", prerequis: [] },
  { id: "devfac_developper_double", label: "Développer un produit $(a+b)(c+d)$", notionId: "developpement_factorisation_2de", prerequis: ["devfac_developper_simple"] },
  { id: "devfac_facteur_commun", label: "Factoriser par un facteur commun", notionId: "developpement_factorisation_2de", prerequis: ["devfac_developper_simple"] },
  { id: "devfac_factoriser_identite", label: "Factoriser à l'aide d'une identité remarquable", notionId: "developpement_factorisation_2de", prerequis: ["devfac_facteur_commun"] },
  { id: "devfac_choisir_forme", label: "Choisir la forme la plus adaptée (développée ou factorisée)", notionId: "developpement_factorisation_2de", prerequis: ["devfac_facteur_commun", "devfac_developper_double"] },

  /* ===================== identites_remarquables_2de ===================== */
  { id: "ir_carre_somme", label: "Utiliser $(a+b)^2 = a^2 + 2ab + b^2$", notionId: "identites_remarquables_2de", prerequis: ["devfac_developper_double"] },
  { id: "ir_carre_difference", label: "Utiliser $(a-b)^2 = a^2 - 2ab + b^2$", notionId: "identites_remarquables_2de", prerequis: ["ir_carre_somme"] },
  { id: "ir_difference_carres", label: "Utiliser $a^2 - b^2 = (a-b)(a+b)$", notionId: "identites_remarquables_2de", prerequis: ["ir_carre_somme"] },
  { id: "ir_calcul_mental", label: "Calculer mentalement à l'aide d'une identité remarquable", notionId: "identites_remarquables_2de", prerequis: ["ir_carre_somme", "ir_difference_carres"] },
  { id: "ir_application", label: "Appliquer les identités remarquables dans les deux sens", notionId: "identites_remarquables_2de", prerequis: ["ir_carre_difference", "ir_difference_carres"] },

  /* ===================== expressions_litterales_2de ===================== */
  { id: "expr_modeliser", label: "Modéliser une situation par une expression littérale", notionId: "expressions_litterales_2de", prerequis: ["devfac_developper_simple"] },
  { id: "expr_exprimer_variable", label: "Exprimer une variable en fonction des autres dans une formule", notionId: "expressions_litterales_2de", prerequis: ["devfac_developper_simple"] },
  { id: "expr_reduire_substituer", label: "Réduire une expression et substituer une valeur", notionId: "expressions_litterales_2de", prerequis: ["devfac_developper_simple"] },

  /* ===================== equations_inequations_1er_degre ===================== */
  { id: "equation_resoudre", label: "Résoudre une équation du premier degré", notionId: "equations_inequations_1er_degre", prerequis: ["devfac_developper_simple"] },
  { id: "equation_probleme", label: "Mettre un problème en équation", notionId: "equations_inequations_1er_degre", prerequis: ["equation_resoudre", "expr_modeliser"] },
  { id: "inequation_resoudre", label: "Résoudre une inéquation du premier degré", notionId: "equations_inequations_1er_degre", prerequis: ["equation_resoudre", "intervalle_representer"] },
  { id: "inequation_intervalle", label: "Traduire une inéquation en intervalle de solutions", notionId: "equations_inequations_1er_degre", prerequis: ["inequation_resoudre", "intervalle_appartenance"] },
  { id: "comparer_difference_quotient", label: "Comparer deux quantités par leur différence ou leur quotient", notionId: "equations_inequations_1er_degre", prerequis: ["inequation_resoudre"] },

  /* ===================== vecteurs_plan ===================== */
  { id: "vecteur_definition", label: "Comprendre direction, sens et norme d'un vecteur", notionId: "vecteurs_plan", prerequis: [] },
  { id: "vecteur_egalite", label: "Reconnaitre deux vecteurs égaux", notionId: "vecteurs_plan", prerequis: ["vecteur_definition"] },
  { id: "vecteur_somme", label: "Construire la somme de deux vecteurs (relation de Chasles)", notionId: "vecteurs_plan", prerequis: ["vecteur_egalite"] },
  { id: "vecteur_coordonnees", label: "Calculer les coordonnées d'un vecteur", notionId: "vecteurs_plan", prerequis: ["repere_coordonnees_point"] },
  { id: "vecteur_norme", label: "Calculer la norme d'un vecteur", notionId: "vecteurs_plan", prerequis: ["vecteur_coordonnees", "repere_distance"] },
  { id: "vecteur_produit_reel", label: "Multiplier un vecteur par un nombre réel", notionId: "vecteurs_plan", prerequis: ["vecteur_coordonnees"] },
  { id: "vecteur_colinearite", label: "Étudier la colinéarité avec le déterminant (alignement, parallélisme)", notionId: "vecteurs_plan", prerequis: ["vecteur_produit_reel", "vecteur_coordonnees"] },

  /* ===================== repere_coordonnees ===================== */
  { id: "repere_coordonnees_point", label: "Lire et placer un point dans un repère", notionId: "repere_coordonnees", prerequis: [] },
  { id: "repere_milieu", label: "Calculer les coordonnées d'un milieu", notionId: "repere_coordonnees", prerequis: ["repere_coordonnees_point"] },
  { id: "repere_distance", label: "Calculer une distance dans un repère orthonormé", notionId: "repere_coordonnees", prerequis: ["repere_coordonnees_point"] },

  /* ===================== droites_plan ===================== */
  { id: "droite_pente_ordonne", label: "Lire pente et ordonnée à l'origine", notionId: "droites_plan", prerequis: ["repere_coordonnees_point"] },
  { id: "droite_vecteur_directeur", label: "Déterminer un vecteur directeur d'une droite", notionId: "droites_plan", prerequis: ["vecteur_coordonnees"] },
  { id: "droite_equation_reduite", label: "Déterminer une équation réduite de droite", notionId: "droites_plan", prerequis: ["droite_pente_ordonne", "equation_resoudre"] },
  { id: "droite_equation_cartesienne", label: "Déterminer et utiliser une équation cartésienne", notionId: "droites_plan", prerequis: ["droite_vecteur_directeur", "droite_equation_reduite"] },
  { id: "droite_parallelisme", label: "Exploiter le coefficient directeur pour le parallélisme", notionId: "droites_plan", prerequis: ["droite_equation_reduite"] },
  { id: "droite_intersection", label: "Trouver l'intersection de deux droites", notionId: "droites_plan", prerequis: ["droite_equation_reduite", "equation_resoudre"] },
  { id: "droite_systeme", label: "Résoudre un système de deux équations à deux inconnues", notionId: "droites_plan", prerequis: ["droite_intersection", "equation_resoudre"] },

  /* ===================== geometrie_problemes_plan ===================== */
  { id: "geo_projete_orthogonal", label: "Déterminer le projeté orthogonal d'un point sur une droite", notionId: "geometrie_problemes_plan", prerequis: [] },
  { id: "geo_trigonometrie", label: "Utiliser sinus, cosinus et tangente dans le triangle rectangle", notionId: "geometrie_problemes_plan", prerequis: [] },
  { id: "geo_trig_identite", label: "Utiliser la relation $\\cos^2 x + \\sin^2 x = 1$", notionId: "geometrie_problemes_plan", prerequis: ["geo_trigonometrie"] },
  { id: "geo_longueurs_aires", label: "Calculer longueurs, angles et aires dans une configuration", notionId: "geometrie_problemes_plan", prerequis: ["geo_trigonometrie"] },
  { id: "geo_optimisation", label: "Traiter un problème d'optimisation géométrique", notionId: "geometrie_problemes_plan", prerequis: ["geo_longueurs_aires"] },

  /* ===================== fonction_vocabulaire_2de ===================== */
  { id: "fonction_vocabulaire", label: "Utiliser image, antécédent et courbe représentative", notionId: "fonction_vocabulaire_2de", prerequis: [] },
  { id: "fonction_image_formule", label: "Calculer une image avec une formule", notionId: "fonction_vocabulaire_2de", prerequis: ["fonction_vocabulaire", "devfac_developper_simple"] },
  { id: "fonction_antecedent", label: "Rechercher un antécédent", notionId: "fonction_vocabulaire_2de", prerequis: ["fonction_image_formule", "equation_resoudre"] },
  { id: "fonction_tableau_graphique", label: "Passer d'un tableau à un graphique", notionId: "fonction_vocabulaire_2de", prerequis: ["fonction_vocabulaire"] },
  { id: "fonction_resolution_graphique", label: "Résoudre graphiquement $f(x) = k$ ou $f(x) < k$", notionId: "fonction_vocabulaire_2de", prerequis: ["fonction_vocabulaire", "fonction_antecedent"] },
  // ⭐ AJOUTE LE 08/09/2026, sur le controle commun de mars 2025 : ses
  // questions 5.4 et 5.5 comparent DEUX courbes. Geste distinct de
  // `fonction_resolution_graphique`, qui compare une courbe a une
  // HORIZONTALE : ici le reflexe « au-dessus de l'axe » ne sert plus.
  { id: "fonction_comparer_courbes", label: "Résoudre graphiquement $f(x) = g(x)$ ou $f(x) > g(x)$", notionId: "fonction_vocabulaire_2de", prerequis: ["fonction_resolution_graphique"] },

  /* ===================== signes_expression_2de ===================== */
  // ⛔ `fonction_tableau_signes` GARDE SON IDENTIFIANT en changeant de notion :
  // le renommer aurait orphelin ses quatorze items d'un coup.
  { id: "signes_premier_degre", label: "Déterminer le signe de $ax + b$", notionId: "signes_expression_2de", prerequis: ["inequation_resoudre"] },
  { id: "signes_produit", label: "Dresser le tableau de signes d'un produit", notionId: "signes_expression_2de", prerequis: ["signes_premier_degre"] },
  { id: "signes_quotient", label: "Dresser le tableau de signes d'un quotient et repérer la valeur interdite", notionId: "signes_expression_2de", prerequis: ["signes_produit"] },
  // ⭐ DEUX MICROS ET NON UN. Résoudre $f(x) = 0$, c'est LIRE LES RACINES ;
  // résoudre $f(x) > 0$, c'est CHOISIR DES INTERVALLES. Deux gestes, deux
  // erreurs typiques — et dans les deux cas l'énoncé part soit du tableau,
  // soit d'une courbe tracée.
  { id: "signes_resoudre_equation", label: "Résoudre une équation à partir d'un tableau de signes ou d'une courbe", notionId: "signes_expression_2de", prerequis: ["signes_produit"] },
  { id: "signes_resoudre_inequation", label: "Résoudre une inéquation à partir d'un tableau de signes ou d'une courbe", notionId: "signes_expression_2de", prerequis: ["signes_resoudre_equation"] },
  // ⭐ LE DOMAINE DE DÉFINITION remplace la parité, retirée le 04/09/2026 :
  // le mot « paire » n'apparait NULLE PART dans le BO 2026, tandis que la
  // « recherche de domaine d'étude (ensemble de définition) » y figure en
  // contenu de la section « Représentation algébrique et graphique ».
  { id: "fonction_domaine", label: "Déterminer le domaine de définition d'une fonction", notionId: "fonction_vocabulaire_2de", prerequis: ["fonction_image_formule"] },

  /* ===================== fonction_variations_extremums ===================== */
  { id: "variation_tableau", label: "Lire un tableau de variations", notionId: "fonction_variations_extremums", prerequis: ["fonction_vocabulaire"] },
  { id: "variation_croissance", label: "Décrire croissance et décroissance sur un intervalle", notionId: "fonction_variations_extremums", prerequis: ["variation_tableau", "intervalle_appartenance"] },
  { id: "variation_extremum", label: "Identifier minimum et maximum", notionId: "fonction_variations_extremums", prerequis: ["variation_croissance"] },

  /* ===================== fonctions_affines_2de ===================== */
  { id: "affine_forme", label: "Reconnaitre une fonction affine $f(x) = ax + b$", notionId: "fonctions_affines_2de", prerequis: ["fonction_image_formule"] },
  { id: "affine_calculer_image", label: "Calculer images et antécédents d'une fonction affine", notionId: "fonctions_affines_2de", prerequis: ["affine_forme", "equation_resoudre"] },
  { id: "affine_determiner_expression", label: "Déterminer une fonction affine à partir de données", notionId: "fonctions_affines_2de", prerequis: ["affine_calculer_image", "droite_equation_reduite"] },
  { id: "affine_signe", label: "Étudier le signe d'une fonction affine", notionId: "fonctions_affines_2de", prerequis: ["affine_calculer_image", "inequation_resoudre"] },

  /* ===================== fonctions_reference_2de ===================== */
  { id: "reference_carre", label: "Connaitre la fonction carré", notionId: "fonctions_reference_2de", prerequis: ["fonction_vocabulaire"] },
  { id: "reference_inverse", label: "Connaitre la fonction inverse", notionId: "fonctions_reference_2de", prerequis: ["reference_carre"] },
  { id: "reference_racine", label: "Connaitre la fonction racine carrée", notionId: "fonctions_reference_2de", prerequis: ["reference_carre"] },
  { id: "reference_cube", label: "Connaitre la fonction cube", notionId: "fonctions_reference_2de", prerequis: ["reference_carre"] },
  // ⭐ LA VALEUR ABSOLUE MANQUAIT, et le BO 2026 la cite TROIS fois : sa
  // définition et sa courbe, son signe et ses variations, et la résolution
  // de f(x) = k. Elle s'enseigne en début d'année (Frédéric, 04/09/2026),
  // d'où le prérequis sur la distance, déjà vue dans reels_intervalles.
  { id: "reference_valeur_absolue", label: "Connaitre la fonction valeur absolue (calcul et courbe)", notionId: "fonctions_reference_2de", prerequis: ["valeur_absolue_distance"] },
  { id: "reference_comparer", label: "Comparer deux images avec une fonction de référence", notionId: "fonctions_reference_2de", prerequis: ["reference_carre", "reference_inverse", "reference_racine"] },
  { id: "reference_resoudre", label: "Résoudre $f(x) = k$ pour une fonction de référence", notionId: "fonctions_reference_2de", prerequis: ["reference_carre", "fonction_resolution_graphique"] },

  /* ===================== information_chiffree_evolutions ===================== */
  { id: "info_proportion", label: "Calculer une proportion et un pourcentage d'une sous-population", notionId: "information_chiffree_evolutions", prerequis: [] },
  { id: "info_pourcentage_de_pourcentage", label: "Calculer un pourcentage de pourcentage", notionId: "information_chiffree_evolutions", prerequis: ["info_proportion"] },
  { id: "info_variation_absolue_relative", label: "Distinguer variation absolue et variation relative", notionId: "information_chiffree_evolutions", prerequis: ["info_proportion"] },
  { id: "info_taux_evolution", label: "Calculer un taux d'évolution et le coefficient multiplicateur", notionId: "information_chiffree_evolutions", prerequis: ["info_variation_absolue_relative"] },
  { id: "info_evolutions_successives", label: "Composer des évolutions successives", notionId: "information_chiffree_evolutions", prerequis: ["info_taux_evolution"] },
  { id: "info_evolution_reciproque", label: "Déterminer une évolution réciproque", notionId: "information_chiffree_evolutions", prerequis: ["info_taux_evolution"] },

  /* ===================== statistiques_descriptives ===================== */
  { id: "stat_lire_serie", label: "Lire une série statistique", notionId: "statistiques_descriptives", prerequis: [] },
  { id: "stat_moyenne", label: "Calculer une moyenne", notionId: "statistiques_descriptives", prerequis: ["stat_lire_serie"] },
  { id: "stat_moyenne_ponderee", label: "Calculer une moyenne pondérée", notionId: "statistiques_descriptives", prerequis: ["stat_moyenne"] },
  { id: "stat_mediane_quartiles", label: "Déterminer médiane et quartiles", notionId: "statistiques_descriptives", prerequis: ["stat_lire_serie"] },
  { id: "stat_frequence", label: "Calculer une fréquence", notionId: "statistiques_descriptives", prerequis: ["stat_lire_serie"] },
  { id: "stat_ecart_interquartile", label: "Déterminer l'écart interquartile", notionId: "statistiques_descriptives", prerequis: ["stat_mediane_quartiles"] },
  // ⭐ LA LINÉARITÉ DE LA MOYENNE est un contenu explicite du BO 2026, au
  // même titre que l'écart type : « Linéarité de la moyenne » ouvre la liste
  // des contenus de « Statistiques à une variable ».
  { id: "stat_linearite_moyenne", label: "Utiliser la linéarité de la moyenne", notionId: "statistiques_descriptives", prerequis: ["stat_moyenne"] },
  { id: "stat_ecart_type", label: "Calculer et interpréter l'écart type", notionId: "statistiques_descriptives", prerequis: ["stat_moyenne"] },
  { id: "stat_interpreter", label: "Interpréter des indicateurs statistiques", notionId: "statistiques_descriptives", prerequis: ["stat_moyenne", "stat_mediane_quartiles", "stat_frequence"] },

  /* ===================== probabilites_ensemble_fini ===================== */
  { id: "proba_vocabulaire", label: "Utiliser issue, évènement et univers", notionId: "probabilites_ensemble_fini", prerequis: [] },
  { id: "proba_modele", label: "Construire une loi de probabilité sur un univers fini", notionId: "probabilites_ensemble_fini", prerequis: ["proba_vocabulaire"] },
  { id: "proba_calculer", label: "Calculer une probabilité par somme des issues", notionId: "probabilites_ensemble_fini", prerequis: ["proba_modele", "stat_frequence"] },
  { id: "proba_evenement_contraire", label: "Utiliser l'évènement contraire (complémentaire)", notionId: "probabilites_ensemble_fini", prerequis: ["proba_calculer"] },
  { id: "proba_reunion_intersection", label: "Utiliser réunion et intersection d'évènements", notionId: "probabilites_ensemble_fini", prerequis: ["proba_calculer"] },
  { id: "proba_formule_union", label: "Utiliser $P(A \\cup B) + P(A \\cap B) = P(A) + P(B)$", notionId: "probabilites_ensemble_fini", prerequis: ["proba_reunion_intersection"] },
  { id: "proba_tableau_arbre", label: "Organiser une expérience avec tableau ou arbre", notionId: "probabilites_ensemble_fini", prerequis: ["proba_calculer"] },

  /* ================= probabilites_conditionnelles_2de ================= */
  // ⭐ Le BO 2026 : « probabilité conditionnelle d'un évènement B sachant un
  // évènement A de probabilité non nulle. Notation PA(B). » et « arbres de
  // probabilité, application au calcul de probabilités ».
  //
  // ⛔ PAS DE FORMULE DES PROBABILITÉS TOTALES : le BO exclut explicitement le
  // calcul « relatif à une partition de l'univers ». On additionne les chemins
  // de l'arbre, ce qui est demandé ; on ne pose pas la formule générale.
  { id: "proba_conditionnelle", label: "Calculer une probabilité conditionnelle $P_A(B)$", notionId: "probabilites_conditionnelles_2de", prerequis: ["proba_calculer"] },
  { id: "proba_arbre_pondere", label: "Lire et construire un arbre pondéré", notionId: "probabilites_conditionnelles_2de", prerequis: ["proba_tableau_arbre", "proba_conditionnelle"] },
  { id: "proba_arbre_chemins", label: "Calculer une probabilité en additionnant les chemins", notionId: "probabilites_conditionnelles_2de", prerequis: ["proba_arbre_pondere"] },
  { id: "proba_tableau_croise", label: "Lire une probabilité conditionnelle sur un tableau croisé", notionId: "probabilites_conditionnelles_2de", prerequis: ["proba_conditionnelle"] },
  { id: "proba_faux_positifs", label: "Distinguer $P_A(B)$ et $P_B(A)$ (faux positifs)", notionId: "probabilites_conditionnelles_2de", prerequis: ["proba_conditionnelle"] },

  /* ===================== echantillonnage_simulation ===================== */
  { id: "echantillon_fluctuation", label: "Comprendre la fluctuation d'échantillonnage", notionId: "echantillonnage_simulation", prerequis: ["stat_frequence", "proba_calculer"] },
  { id: "echantillon_loi_grands_nombres", label: "Mobiliser la loi des grands nombres (estimation par fréquence)", notionId: "echantillonnage_simulation", prerequis: ["echantillon_fluctuation"] },
  { id: "simulation_frequence", label: "Simuler une expérience aléatoire et observer les fréquences", notionId: "echantillonnage_simulation", prerequis: ["echantillon_fluctuation"] },
  { id: "echantillon_interpreter", label: "Interpréter un résultat de simulation", notionId: "echantillonnage_simulation", prerequis: ["simulation_frequence", "stat_interpreter"] },

  /* ===================== algorithmique_python_2de ===================== */
  { id: "python_variable_affectation", label: "Utiliser variables et affectations en Python", notionId: "algorithmique_python_2de", prerequis: [] },
  { id: "python_type_variable", label: "Choisir le type d'une variable (entier, flottant, booléen, chaine)", notionId: "algorithmique_python_2de", prerequis: ["python_variable_affectation"] },
  { id: "python_condition", label: "Écrire une instruction conditionnelle", notionId: "algorithmique_python_2de", prerequis: ["python_variable_affectation", "inequation_resoudre"] },
  { id: "python_boucle", label: "Utiliser une boucle bornée (for)", notionId: "algorithmique_python_2de", prerequis: ["python_condition"] },
  { id: "python_boucle_non_bornee", label: "Utiliser une boucle non bornée (while)", notionId: "algorithmique_python_2de", prerequis: ["python_boucle"] },
  { id: "python_fonction", label: "Écrire une fonction Python simple", notionId: "algorithmique_python_2de", prerequis: ["python_variable_affectation", "fonction_image_formule"] },
  { id: "python_simulation", label: "Programmer une simulation simple", notionId: "algorithmique_python_2de", prerequis: ["python_boucle", "simulation_frequence"] },

  /* ===================== logique_ensembles ===================== */
  { id: "logique_appartenance_inclusion", label: "Utiliser l'appartenance et l'inclusion (élément, sous-ensemble)", notionId: "logique_ensembles", prerequis: [] },
  { id: "logique_union_intersection", label: "Utiliser réunion, intersection et complémentaire d'ensembles", notionId: "logique_ensembles", prerequis: ["logique_appartenance_inclusion"] },
  { id: "logique_connecteurs", label: "Utiliser les connecteurs « et » et « ou »", notionId: "logique_ensembles", prerequis: [] },
  { id: "logique_negation_contre_exemple", label: "Formuler une négation, utiliser un contre-exemple", notionId: "logique_ensembles", prerequis: ["logique_connecteurs"] },
  { id: "logique_implication_reciproque", label: "Formuler une implication, une équivalence et une réciproque", notionId: "logique_ensembles", prerequis: ["logique_connecteurs"] },
];
