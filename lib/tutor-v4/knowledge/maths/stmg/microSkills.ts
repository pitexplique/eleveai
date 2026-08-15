// knowledge/maths/stmg/microSkills.ts
//
// Micro-compétences du cycle terminal de la voie technologique (série STMG).
//
// Chaque micro est dérivée d'une « capacité attendue » de l'une des deux
// annexes du BO — première technologique, ou terminale technologique — ou de la
// liste d'automatismes commune aux deux années.
//
// ⚠️ 3 à 5 micros par notion, jamais plus : au coach, une notion est une séance
// et elle doit se terminer. Si une notion dépasse 5 micros en grandissant,
// c'est la notion qu'il faut couper en deux, pas la micro qu'il faut supprimer.
//
// prerequis : uniquement des microId de ce fichier (validé au runtime par
// buildKnowledge, qui lève une erreur au moindre identifiant inconnu).
//
// Le poids des automatismes (60 micros, 16 notions) suit le texte : ils ne font
// pas l'objet d'un chapitre, ils s'entretiennent « tout au long des deux
// années » en rituels de début de séance. C'est exactement ce que le coach sait
// faire.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  /* ───────────────────────── auto_proportion ───────────────────────── */

  { id: "auto_prop_calculer", label: "Calculer une proportion", notionId: "auto_proportion", prerequis: [] },
  { id: "auto_prop_formes", label: "Exprimer une proportion sous différentes formes (décimale, fractionnaire, pourcentage)", notionId: "auto_proportion", prerequis: ["auto_prop_calculer"] },
  { id: "auto_prop_appliquer", label: "Appliquer un pourcentage à une quantité", notionId: "auto_proportion", prerequis: ["auto_prop_formes"] },
  { id: "auto_prop_de_proportion", label: "Calculer la proportion d'une proportion", notionId: "auto_proportion", prerequis: ["auto_prop_appliquer"] },

  /* ──────────────────────── auto_evo_coefficient ──────────────────────── */

  { id: "auto_evo_additif_multiplicatif", label: "Passer d'une formulation additive à une formulation multiplicative (+ 5 % → × 1,05)", notionId: "auto_evo_coefficient", prerequis: [] },
  { id: "auto_evo_diminution", label: "Traduire une diminution par un coefficient multiplicateur (− 5 % → × 0,95)", notionId: "auto_evo_coefficient", prerequis: ["auto_evo_additif_multiplicatif"] },
  { id: "auto_evo_valeur_finale", label: "Appliquer un taux d'évolution pour calculer une valeur finale", notionId: "auto_evo_coefficient", prerequis: ["auto_evo_additif_multiplicatif"] },
  { id: "auto_evo_valeur_initiale", label: "Appliquer un taux d'évolution pour retrouver une valeur initiale", notionId: "auto_evo_coefficient", prerequis: ["auto_evo_valeur_finale"] },

  /* ─────────────────────────── auto_evo_taux ─────────────────────────── */

  { id: "auto_evo_absolue_relative", label: "Distinguer variation absolue et variation relative", notionId: "auto_evo_taux", prerequis: [] },
  { id: "auto_evo_calculer_taux", label: "Calculer un taux d'évolution et l'exprimer en pourcentage", notionId: "auto_evo_taux", prerequis: ["auto_evo_absolue_relative"] },
  { id: "auto_evo_nature_pourcentage", label: "Distinguer si un pourcentage exprime une proportion ou une évolution", notionId: "auto_evo_taux", prerequis: ["auto_evo_calculer_taux"] },

  /* ───────────────────────── auto_evo_enchainees ───────────────────────── */

  { id: "auto_evo_chaine_coefficients", label: "Enchaîner des coefficients multiplicateurs", notionId: "auto_evo_enchainees", prerequis: [] },
  { id: "auto_evo_successives", label: "Calculer le taux d'évolution équivalent à plusieurs évolutions successives", notionId: "auto_evo_enchainees", prerequis: ["auto_evo_chaine_coefficients"] },
  { id: "auto_evo_reciproque", label: "Calculer un taux d'évolution réciproque", notionId: "auto_evo_enchainees", prerequis: ["auto_evo_successives"] },
  { id: "auto_evo_piege_compensation", label: "Savoir qu'une baisse puis une hausse de même taux ne ramènent pas au prix initial", notionId: "auto_evo_enchainees", prerequis: ["auto_evo_successives"] },

  /* ─────────────────────────── auto_indice ─────────────────────────── */

  { id: "auto_indice_interpreter", label: "Interpréter un indice de base 100", notionId: "auto_indice", prerequis: [] },
  { id: "auto_indice_calculer", label: "Calculer un indice de base 100", notionId: "auto_indice", prerequis: ["auto_indice_interpreter"] },
  { id: "auto_indice_vers_taux", label: "Calculer le taux d'évolution entre deux valeurs d'un indice", notionId: "auto_indice", prerequis: ["auto_indice_calculer"] },
  { id: "auto_indice_comparer", label: "Comparer deux séries d'indices de même base", notionId: "auto_indice", prerequis: ["auto_indice_vers_taux"] },

  /* ────────────────────── auto_fractions_puissances ────────────────────── */

  { id: "auto_num_fractions_operations", label: "Effectuer des opérations entre fractions simples", notionId: "auto_fractions_puissances", prerequis: [] },
  { id: "auto_num_fractions_comparer", label: "Comparer des fractions simples", notionId: "auto_fractions_puissances", prerequis: ["auto_num_fractions_operations"] },
  { id: "auto_num_puissances", label: "Effectuer des opérations sur les puissances", notionId: "auto_fractions_puissances", prerequis: [] },
  { id: "auto_num_ecritures", label: "Passer d'une écriture d'un nombre à une autre (décimale, fractionnaire, scientifique)", notionId: "auto_fractions_puissances", prerequis: ["auto_num_puissances"] },

  /* ───────────────────────── auto_ordres_unites ───────────────────────── */

  { id: "auto_num_calcul_mental", label: "Effectuer mentalement des calculs simples (décimaux, fractions, pourcentages)", notionId: "auto_ordres_unites", prerequis: [] },
  { id: "auto_num_ordre_grandeur", label: "Estimer un ordre de grandeur", notionId: "auto_ordres_unites", prerequis: ["auto_num_calcul_mental"] },
  { id: "auto_num_conversions", label: "Effectuer des conversions d'unités", notionId: "auto_ordres_unites", prerequis: [] },

  /* ──────────────────── auto_developper_factoriser ──────────────────── */

  { id: "auto_alg_developper", label: "Développer et réduire une expression algébrique simple", notionId: "auto_developper_factoriser", prerequis: [] },
  { id: "auto_alg_identites", label: "Utiliser les identités remarquables pour développer", notionId: "auto_developper_factoriser", prerequis: ["auto_alg_developper"] },
  { id: "auto_alg_factoriser_commun", label: "Factoriser par un facteur commun (ax² + bx, ax + bx)", notionId: "auto_developper_factoriser", prerequis: ["auto_alg_developper"] },
  { id: "auto_alg_factoriser_identite", label: "Factoriser à l'aide d'une identité remarquable", notionId: "auto_developper_factoriser", prerequis: ["auto_alg_identites", "auto_alg_factoriser_commun"] },

  /* ────────────────────────── auto_equations ────────────────────────── */

  { id: "auto_alg_equation_premier_degre", label: "Résoudre une équation du premier degré", notionId: "auto_equations", prerequis: [] },
  { id: "auto_alg_inequation", label: "Résoudre une inéquation du premier degré", notionId: "auto_equations", prerequis: ["auto_alg_equation_premier_degre"] },
  { id: "auto_alg_equation_carre", label: "Résoudre une équation du type x² = a", notionId: "auto_equations", prerequis: [] },
  { id: "auto_alg_produit_nul", label: "Déterminer les solutions d'une équation produit nul", notionId: "auto_equations", prerequis: ["auto_alg_equation_premier_degre"] },

  /* ─────────────────────────── auto_signes ─────────────────────────── */

  { id: "auto_alg_signe_premier_degre", label: "Déterminer le signe d'une expression du premier degré", notionId: "auto_signes", prerequis: [] },
  { id: "auto_alg_signe_factorisee", label: "Déterminer le signe d'une expression factorisée du second degré", notionId: "auto_signes", prerequis: ["auto_alg_signe_premier_degre"] },
  { id: "auto_alg_tableau_signes", label: "Dresser un tableau de signes", notionId: "auto_signes", prerequis: ["auto_alg_signe_factorisee"] },

  /* ────────────────────────── auto_formules ────────────────────────── */

  { id: "auto_alg_litteral", label: "Effectuer un calcul littéral élémentaire (signes, fractions)", notionId: "auto_formules", prerequis: [] },
  { id: "auto_alg_isoler_variable", label: "Isoler une variable dans une égalité ou une inégalité qui en comporte plusieurs", notionId: "auto_formules", prerequis: ["auto_alg_litteral"] },
  { id: "auto_alg_application_formule", label: "Effectuer une application numérique d'une formule", notionId: "auto_formules", prerequis: ["auto_alg_litteral"] },

  /* ─────────────────────── auto_lecture_graphique ─────────────────────── */

  { id: "auto_fct_image_antecedent", label: "Déterminer graphiquement des images et des antécédents", notionId: "auto_lecture_graphique", prerequis: [] },
  { id: "auto_fct_reperer_graphique", label: "Repérer sur un graphique l'origine, les unités de graduation et les échelles", notionId: "auto_lecture_graphique", prerequis: [] },
  { id: "auto_fct_appartenance_courbe", label: "Exploiter une équation de courbe (appartenance d'un point, calcul de coordonnées)", notionId: "auto_lecture_graphique", prerequis: ["auto_fct_image_antecedent"] },
  { id: "auto_fct_estimer_seuil", label: "Estimer graphiquement une valeur atteinte, un antécédent, un seuil", notionId: "auto_lecture_graphique", prerequis: ["auto_fct_image_antecedent"] },

  /* ────────────────────── auto_resolution_graphique ────────────────────── */

  { id: "auto_fct_resoudre_graphiquement", label: "Résoudre graphiquement une équation ou une inéquation du type f(x) = k, f(x) < k", notionId: "auto_resolution_graphique", prerequis: [] },
  { id: "auto_fct_signe_graphique", label: "Déterminer graphiquement le signe d'une fonction", notionId: "auto_resolution_graphique", prerequis: ["auto_fct_resoudre_graphiquement"] },
  { id: "auto_fct_variations_graphique", label: "Déterminer graphiquement le tableau de variations d'une fonction", notionId: "auto_resolution_graphique", prerequis: ["auto_fct_signe_graphique"] },

  /* ──────────────────────────── auto_droites ──────────────────────────── */

  { id: "auto_fct_tracer_droite", label: "Tracer une droite donnée par son équation réduite, ou par un point et son coefficient directeur", notionId: "auto_droites", prerequis: [] },
  { id: "auto_fct_lire_equation_reduite", label: "Lire graphiquement l'équation réduite d'une droite", notionId: "auto_droites", prerequis: ["auto_fct_tracer_droite"] },
  { id: "auto_fct_coefficient_directeur", label: "Déterminer le coefficient directeur d'une droite", notionId: "auto_droites", prerequis: ["auto_fct_lire_equation_reduite"] },
  { id: "auto_fct_equation_deux_points", label: "Déterminer l'équation réduite d'une droite à partir des coordonnées de deux de ses points", notionId: "auto_droites", prerequis: ["auto_fct_coefficient_directeur"] },

  /* ─────────────────────── auto_donnees_graphiques ─────────────────────── */

  { id: "auto_stat_lire_graphique", label: "Lire un graphique ou un histogramme (origine, graduations, échelles)", notionId: "auto_donnees_graphiques", prerequis: [] },
  { id: "auto_stat_diagrammes_usuels", label: "Lire un diagramme en barres ou circulaire", notionId: "auto_donnees_graphiques", prerequis: ["auto_stat_lire_graphique"] },
  { id: "auto_stat_boite", label: "Lire un diagramme en boîte", notionId: "auto_donnees_graphiques", prerequis: ["auto_stat_lire_graphique"] },
  { id: "auto_stat_graphique_donnees", label: "Passer du graphique aux données et inversement", notionId: "auto_donnees_graphiques", prerequis: ["auto_stat_diagrammes_usuels"] },

  /* ─────────────────────────── auto_terminale ─────────────────────────── */
  //
  // Les cinq automatismes que le BO signale « en italique » : ceux qui
  // s'ajoutent en classe terminale, une fois la dérivation installée.

  { id: "autoT_suite_geo_reconnaitre", label: "Reconnaître une situation contextualisée se modélisant par une suite géométrique", notionId: "auto_terminale_reconnaitre", prerequis: [] },
  { id: "autoT_suite_geo_raison", label: "Identifier la raison de la suite géométrique qui modélise une situation", notionId: "auto_terminale_reconnaitre", prerequis: ["autoT_suite_geo_reconnaitre"] },
  { id: "autoT_signe_image_mentale", label: "Déterminer le signe d'une expression factorisée du second degré à l'aide d'une image mentale de la courbe", notionId: "auto_terminale_reconnaitre", prerequis: [] },

  /* ─────────────────────── auto_terminale_derivee ─────────────────────── */

  { id: "autoT_derivee_polynome", label: "Calculer la dérivée d'une fonction polynomiale de degré inférieur ou égal à 3", notionId: "auto_terminale_derivee", prerequis: [] },
  { id: "autoT_coefficient_tangente_derivee", label: "Calculer le coefficient directeur de la tangente en un point à l'aide de la dérivée", notionId: "auto_terminale_derivee", prerequis: ["autoT_derivee_polynome"] },
  { id: "autoT_coefficient_tangente_graphique", label: "Déterminer graphiquement le coefficient directeur d'une tangente à une courbe", notionId: "auto_terminale_derivee", prerequis: [] },

  /* ───────────────────────── suite_generation ───────────────────────── */

  { id: "suite_gen_notation", label: "Passer de la notation fonctionnelle u(n) à la notation indicielle uₙ", notionId: "suite_notation", prerequis: [] },
  { id: "suite_gen_fonctionnelle", label: "Reconnaître une suite définie par une relation fonctionnelle", notionId: "suite_notation", prerequis: ["suite_gen_notation"] },
  { id: "suite_gen_recurrence", label: "Reconnaître une suite définie par une relation de récurrence", notionId: "suite_notation", prerequis: ["suite_gen_notation"] },

  /* ─────────────────────────── suite_termes ─────────────────────────── */

  { id: "suite_gen_premiers_termes", label: "Calculer les premiers termes d'une suite", notionId: "suite_termes", prerequis: [] },
  { id: "suite_gen_terme_rang", label: "Calculer un terme de rang donné", notionId: "suite_termes", prerequis: ["suite_gen_premiers_termes"] },
  { id: "suite_gen_ni_ni", label: "Reconnaître une suite qui n'est ni arithmétique ni géométrique", notionId: "suite_termes", prerequis: ["suite_gen_terme_rang"] },

  /* ───────────────────────── suite_arithmetique ───────────────────────── */

  { id: "suite_arith_reconnaitre", label: "Reconnaître une suite arithmétique et déterminer sa raison", notionId: "suite_arithmetique", prerequis: [] },
  { id: "suite_arith_recurrence", label: "Utiliser la relation de récurrence u(n+1) = u(n) + r", notionId: "suite_arithmetique", prerequis: ["suite_arith_reconnaitre"] },
  { id: "suite_arith_variation", label: "Déterminer le sens de variation d'une suite arithmétique à l'aide de la raison", notionId: "suite_arithmetique", prerequis: ["suite_arith_reconnaitre"] },
  { id: "suite_arith_demontrer", label: "Démontrer qu'une suite est arithmétique", notionId: "suite_arithmetique", prerequis: ["suite_arith_recurrence"] },

  /* ───────────────────────── suite_geometrique ───────────────────────── */

  { id: "suite_geo_reconnaitre", label: "Reconnaître une suite géométrique et déterminer sa raison", notionId: "suite_geometrique", prerequis: [] },
  { id: "suite_geo_recurrence", label: "Utiliser la relation de récurrence u(n+1) = q × u(n)", notionId: "suite_geometrique", prerequis: ["suite_geo_reconnaitre"] },
  { id: "suite_geo_demontrer", label: "Démontrer qu'une suite est géométrique", notionId: "suite_geometrique", prerequis: ["suite_geo_recurrence"] },

  /* ──────────────────────── suite_geo_evolution ──────────────────────── */

  { id: "suite_geo_taux", label: "Relier la raison d'une suite géométrique à un taux d'évolution (+ 20 % → q = 1,2)", notionId: "suite_geo_evolution", prerequis: [] },
  { id: "suite_geo_raison_depuis_taux", label: "Déterminer la raison connaissant le taux d'évolution, et réciproquement", notionId: "suite_geo_evolution", prerequis: ["suite_geo_taux"] },
  { id: "suite_geo_variation", label: "Déterminer le sens de variation d'une suite géométrique à termes positifs à l'aide de la raison", notionId: "suite_geo_evolution", prerequis: ["suite_geo_taux"] },

  /* ──────────────────────── suite_representation ──────────────────────── */

  { id: "suite_rep_nuage", label: "Réaliser la représentation graphique des termes d'une suite : le nuage de points (n, u(n))", notionId: "suite_representation", prerequis: [] },
  { id: "suite_rep_lire", label: "Lire un terme d'une suite sur sa représentation graphique", notionId: "suite_representation", prerequis: ["suite_rep_nuage"] },
  { id: "suite_rep_conjecturer", label: "Conjecturer la nature arithmétique ou géométrique d'une suite à partir de sa représentation", notionId: "suite_representation", prerequis: ["suite_rep_lire"] },
  { id: "suite_rep_tableur", label: "Obtenir une liste de termes d'une suite à l'aide d'un tableur", notionId: "suite_representation", prerequis: ["suite_rep_nuage"] },

  /* ────────────────────────── suite_modeliser ────────────────────────── */

  { id: "suite_mod_reconnaitre", label: "Reconnaître si une situation relève d'un modèle discret de croissance linéaire ou exponentielle", notionId: "suite_modeliser", prerequis: [] },
  { id: "suite_mod_choisir", label: "Modéliser une situation à l'aide d'une suite", notionId: "suite_modeliser", prerequis: ["suite_mod_reconnaitre"] },
  { id: "suite_mod_capital", label: "Modéliser l'évolution ou l'actualisation d'un capital", notionId: "suite_modeliser", prerequis: ["suite_mod_choisir"] },
  { id: "suite_mod_conclure", label: "Répondre à la question posée par une phrase, dans le contexte", notionId: "suite_modeliser", prerequis: ["suite_mod_choisir"] },

  /* ───────────────────────────── suite_seuil ───────────────────────────── */

  { id: "suite_seuil_tableau", label: "Déterminer un seuil à l'aide d'un tableau de valeurs", notionId: "suite_seuil", prerequis: [] },
  { id: "suite_seuil_graphique", label: "Déterminer un seuil par lecture graphique", notionId: "suite_seuil", prerequis: ["suite_seuil_tableau"] },
  { id: "suite_seuil_rang", label: "Déterminer le rang à partir duquel les termes dépassent un seuil donné", notionId: "suite_seuil", prerequis: ["suite_seuil_tableau"] },
  { id: "suite_seuil_croisement", label: "Déterminer le rang à partir duquel une suite dépasse une autre", notionId: "suite_seuil", prerequis: ["suite_seuil_rang"] },

  /* ──────────────────────── suite_terme_general ──────────────────────── */

  { id: "suiteT_arith_explicite", label: "Exprimer en fonction de n le terme général d'une suite arithmétique", notionId: "suite_terme_general", prerequis: [] },
  { id: "suiteT_geo_explicite", label: "Exprimer en fonction de n le terme général d'une suite géométrique", notionId: "suite_terme_general", prerequis: ["suiteT_arith_explicite"] },
  { id: "suiteT_raison_modele", label: "Déterminer la raison d'une suite arithmétique ou géométrique modélisant une évolution", notionId: "suite_terme_general", prerequis: [] },
  { id: "suiteT_trois_termes", label: "Prouver que trois nombres sont, ou ne sont pas, les termes consécutifs d'une suite arithmétique ou géométrique", notionId: "suite_terme_general", prerequis: ["suiteT_geo_explicite"] },

  /* ────────────────────────── suite_moyennes ────────────────────────── */

  { id: "suiteT_moyenne_arithmetique", label: "Calculer la moyenne arithmétique de deux nombres et la relier à une suite arithmétique", notionId: "suite_moyennes", prerequis: [] },
  { id: "suiteT_moyenne_geometrique", label: "Calculer la moyenne géométrique de deux nombres positifs et la relier à une suite géométrique", notionId: "suite_moyennes", prerequis: ["suiteT_moyenne_arithmetique"] },
  { id: "suiteT_moyenne_intercaler", label: "Intercaler un terme entre deux termes donnés", notionId: "suite_moyennes", prerequis: ["suiteT_moyenne_geometrique"] },

  /* ─────────────────────────── suite_somme ─────────────────────────── */

  { id: "suiteT_somme_notation", label: "Lire et écrire une somme avec la notation Σ", notionId: "suite_somme", prerequis: [] },
  { id: "suiteT_somme_arithmetique", label: "Calculer la somme des n premiers termes d'une suite arithmétique", notionId: "suite_somme", prerequis: ["suiteT_somme_notation"] },
  { id: "suiteT_somme_geometrique", label: "Calculer la somme des n premiers termes d'une suite géométrique", notionId: "suite_somme", prerequis: ["suiteT_somme_arithmetique"] },

  /* ──────────────────────── suite_somme_situations ──────────────────────── */

  { id: "suiteT_somme_reconnaitre", label: "Reconnaître une situation relevant du calcul d'une somme de termes consécutifs", notionId: "suite_somme_situations", prerequis: [] },
  { id: "suiteT_somme_versements", label: "Calculer une valeur acquise avec versements réguliers (intérêts composés)", notionId: "suite_somme_situations", prerequis: ["suiteT_somme_reconnaitre"] },
  { id: "suiteT_somme_emprunt", label: "Exploiter un emprunt à annuités constantes", notionId: "suite_somme_situations", prerequis: ["suiteT_somme_versements"] },

  /* ────────────────────────── suite_comparer ────────────────────────── */

  { id: "suiteT_comparer_geometriques", label: "Comparer deux suites géométriques dans une résolution de problème", notionId: "suite_comparer", prerequis: [] },
  { id: "suiteT_comparer_arith_geo", label: "Comparer une suite arithmétique et une suite géométrique", notionId: "suite_comparer", prerequis: ["suiteT_comparer_geometriques"] },
  { id: "suiteT_interets_simples_composes", label: "Comparer intérêts simples et intérêts composés", notionId: "suite_comparer", prerequis: ["suiteT_comparer_arith_geo"] },
  { id: "suiteT_taux_equivalent_proportionnel", label: "Distinguer taux équivalent et taux proportionnel", notionId: "suite_comparer", prerequis: ["suiteT_interets_simples_composes"] },

  /* ──────────────────────── fct_representation ──────────────────────── */

  { id: "fct_rep_modes", label: "Passer d'un mode de représentation d'une fonction à un autre (expression, graphique, tableau)", notionId: "fct_representation", prerequis: [] },
  { id: "fct_rep_notations", label: "Utiliser les notations y = f(x) et x ↦ f(x)", notionId: "fct_representation", prerequis: [] },
  { id: "fct_rep_modeliser", label: "Modéliser la dépendance entre deux grandeurs à l'aide d'une fonction", notionId: "fct_representation", prerequis: ["fct_rep_modes"] },
  { id: "fct_rep_grandeur_composee", label: "Lire un graphique reliant une grandeur à une grandeur composée (x², 1/x)", notionId: "fct_representation", prerequis: ["fct_rep_modes"] },

  /* ──────────────────────── fct_taux_variation ──────────────────────── */

  { id: "fct_taux_calculer", label: "Calculer le taux de variation d'une grandeur entre deux valeurs", notionId: "fct_taux_variation", prerequis: [] },
  { id: "fct_taux_secante", label: "Interpréter le taux de variation comme la pente de la sécante passant par deux points distincts", notionId: "fct_taux_variation", prerequis: ["fct_taux_calculer"] },
  { id: "fct_taux_interpreter", label: "Interpréter un taux de variation dans le contexte (vitesse moyenne, coût)", notionId: "fct_taux_variation", prerequis: ["fct_taux_calculer"] },

  /* ─────────────────────────── fct_monotonie ─────────────────────────── */

  { id: "fct_mono_signe_taux", label: "Relier la monotonie d'une fonction au signe de son taux de variation", notionId: "fct_monotonie", prerequis: [] },
  { id: "fct_mono_tableau", label: "Dresser le tableau de variations d'une fonction monotone par morceaux", notionId: "fct_monotonie", prerequis: ["fct_mono_signe_taux"] },
  { id: "fct_mono_comparer_images", label: "Comparer deux images à l'aide des variations, sans les calculer", notionId: "fct_monotonie", prerequis: ["fct_mono_tableau"] },

  /* ───────────────────────── fct_degre2_courbe ───────────────────────── */

  { id: "fct_d2_associer", label: "Associer une parabole à une expression de degré 2 (ax², ax² + b, a(x − x₁)(x − x₂))", notionId: "fct_degre2_courbe", prerequis: [] },
  { id: "fct_d2_role_a", label: "Interpréter le rôle du coefficient a (orientation et ouverture de la parabole)", notionId: "fct_degre2_courbe", prerequis: ["fct_d2_associer"] },
  { id: "fct_d2_translation", label: "Interpréter le rôle de b comme une translation verticale", notionId: "fct_degre2_courbe", prerequis: ["fct_d2_associer"] },

  /* ──────────────────────── fct_degre2_symetrie ──────────────────────── */

  { id: "fct_d2_axe_symetrie", label: "Déterminer l'axe de symétrie d'une parabole", notionId: "fct_degre2_symetrie", prerequis: [] },
  { id: "fct_d2_extremum", label: "Déterminer l'extremum d'une fonction de la forme a(x − x₁)(x − x₂)", notionId: "fct_degre2_symetrie", prerequis: ["fct_d2_axe_symetrie"] },
  { id: "fct_d2_symetrie_images", label: "Utiliser la symétrie de la parabole pour comparer deux images", notionId: "fct_degre2_symetrie", prerequis: ["fct_d2_axe_symetrie"] },

  /* ─────────────────────── fct_degre2_factorisee ─────────────────────── */

  { id: "fct_d2_racines_factorisee", label: "Déterminer les racines d'un polynôme de degré 2 donné sous forme factorisée", notionId: "fct_degre2_factorisee", prerequis: [] },
  { id: "fct_d2_signe_tableau", label: "Étudier le signe d'un polynôme de degré 2 factorisé", notionId: "fct_degre2_factorisee", prerequis: ["fct_d2_racines_factorisee"] },
  { id: "fct_d2_inequation", label: "Résoudre une inéquation du second degré à l'aide du tableau de signes", notionId: "fct_degre2_factorisee", prerequis: ["fct_d2_signe_tableau"] },

  /* ──────────────────────── fct_degre2_factoriser ──────────────────────── */

  { id: "fct_d2_verifier_racine", label: "Vérifier qu'une valeur conjecturée est racine d'un polynôme", notionId: "fct_degre2_factoriser", prerequis: [] },
  { id: "fct_d2_factoriser_racine_connue", label: "Factoriser une expression du second degré connaissant au moins une de ses racines", notionId: "fct_degre2_factoriser", prerequis: ["fct_d2_verifier_racine"] },
  { id: "fct_d2_verifier_developpee", label: "Vérifier qu'une forme factorisée correspond bien à la forme développée", notionId: "fct_degre2_factoriser", prerequis: ["fct_d2_factoriser_racine_connue"] },

  /* ─────────────────────────── fct_degre3 ─────────────────────────── */

  { id: "fct_d3_courbes", label: "Associer une courbe à une expression x ↦ ax³ ou x ↦ ax³ + b", notionId: "fct_degre3", prerequis: [] },
  { id: "fct_d3_racines", label: "Déterminer les racines d'un polynôme de degré 3 de la forme a(x − x₁)(x − x₂)(x − x₃)", notionId: "fct_degre3", prerequis: ["fct_d3_courbes"] },
  { id: "fct_d3_signe", label: "Étudier le signe d'un polynôme de degré 3 factorisé", notionId: "fct_degre3", prerequis: ["fct_d3_racines"] },
  { id: "fct_d3_verifier_racine", label: "Vérifier qu'une valeur conjecturée est racine d'un polynôme de degré 3", notionId: "fct_degre3", prerequis: ["fct_d3_racines"] },

  /* ─────────────────────── fct_equations_puissance ─────────────────────── */

  { id: "fct_eq_carre", label: "Résoudre une équation de la forme x² = c, avec c positif", notionId: "fct_equations_puissance", prerequis: [] },
  { id: "fct_eq_cube", label: "Résoudre une équation de la forme x³ = c, avec c positif", notionId: "fct_equations_puissance", prerequis: ["fct_eq_carre"] },
  { id: "fct_eq_racine_cubique", label: "Utiliser la racine cubique d'un réel positif et ses notations", notionId: "fct_equations_puissance", prerequis: ["fct_eq_cube"] },

  /* ──────────────────────────── fct_inverse ──────────────────────────── */

  { id: "fctT_inverse_courbe", label: "Reconnaître et exploiter la courbe représentative de la fonction inverse", notionId: "fct_inverse", prerequis: [] },
  { id: "fctT_inverse_bornes", label: "Décrire le comportement de la fonction inverse aux bornes de son ensemble de définition", notionId: "fct_inverse", prerequis: ["fctT_inverse_courbe"] },
  { id: "fctT_inverse_cout_moyen", label: "Exploiter la fonction inverse dans une situation de prix unitaire ou de coût moyen", notionId: "fct_inverse", prerequis: ["fctT_inverse_courbe"] },

  /* ─────────────────────── fct_inverse_derivee ─────────────────────── */

  { id: "fctT_inverse_derivee", label: "Utiliser la dérivée de la fonction inverse", notionId: "fct_inverse_derivee", prerequis: [] },
  { id: "fctT_inverse_variations", label: "Déterminer le sens de variation de la fonction inverse sur chaque intervalle", notionId: "fct_inverse_derivee", prerequis: ["fctT_inverse_derivee"] },
  { id: "fctT_inverse_combinaison", label: "Étudier une combinaison linéaire de la fonction inverse et d'un polynôme de degré au maximum 3", notionId: "fct_inverse_derivee", prerequis: ["fctT_inverse_variations"] },

  /* ──────────────────────── der_secante_tangente ──────────────────────── */

  { id: "der_secante_tracer", label: "Tracer une sécante à une courbe passant par un point donné", notionId: "der_secante_tangente", prerequis: [] },
  { id: "der_tangente_limite", label: "Comprendre la tangente comme position limite des sécantes en un point", notionId: "der_secante_tangente", prerequis: ["der_secante_tracer"] },
  { id: "der_tangente_reconnaitre", label: "Reconnaître la tangente à une courbe en un point", notionId: "der_secante_tangente", prerequis: ["der_tangente_limite"] },

  /* ───────────────────────── der_nombre_derive ───────────────────────── */

  { id: "der_nd_definition", label: "Reconnaître le nombre dérivé comme limite du taux de variation en un point", notionId: "der_nombre_derive", prerequis: [] },
  { id: "der_nd_geometrique", label: "Interpréter géométriquement le nombre dérivé comme coefficient directeur de la tangente", notionId: "der_nombre_derive", prerequis: ["der_nd_definition"] },
  { id: "der_nd_lire_graphique", label: "Lire graphiquement un nombre dérivé sur une tangente tracée", notionId: "der_nombre_derive", prerequis: ["der_nd_geometrique"] },
  { id: "der_nd_cout_marginal", label: "Interpréter le nombre dérivé en contexte (vitesse instantanée, coût marginal)", notionId: "der_nombre_derive", prerequis: ["der_nd_definition"] },

  /* ──────────────────────── der_tangente_equation ──────────────────────── */

  { id: "der_tg_equation_reduite", label: "Déterminer l'équation réduite de la tangente à une courbe en un point", notionId: "der_tangente_equation", prerequis: [] },
  { id: "der_tg_construire", label: "Construire la tangente à une courbe en un point", notionId: "der_tangente_equation", prerequis: ["der_tg_equation_reduite"] },
  { id: "der_tg_verifier_point", label: "Vérifier qu'un point appartient à la tangente", notionId: "der_tangente_equation", prerequis: ["der_tg_equation_reduite"] },

  /* ─────────────────────────── der_formules ─────────────────────────── */

  { id: "der_f_carre", label: "Dériver la fonction carré", notionId: "der_formules", prerequis: [] },
  { id: "der_f_cube", label: "Dériver la fonction cube", notionId: "der_formules", prerequis: ["der_f_carre"] },
  { id: "der_f_kf", label: "Dériver le produit d'une fonction par un réel", notionId: "der_formules", prerequis: ["der_f_carre"] },
  { id: "der_f_somme", label: "Dériver une somme de fonctions", notionId: "der_formules", prerequis: ["der_f_kf"] },

  /* ─────────────────────────── der_polynome ─────────────────────────── */

  { id: "der_p_degre2", label: "Calculer la dérivée d'un polynôme de degré 2", notionId: "der_polynome", prerequis: [] },
  { id: "der_p_degre3", label: "Calculer la dérivée d'un polynôme de degré 3", notionId: "der_polynome", prerequis: ["der_p_degre2"] },
  { id: "der_p_nombre_derive", label: "Calculer f'(a) à partir de l'expression de la dérivée", notionId: "der_polynome", prerequis: ["der_p_degre2"] },
  { id: "der_p_forme_factorisee", label: "Vérifier qu'une forme factorisée donnée est bien celle de la dérivée", notionId: "der_polynome", prerequis: ["der_p_degre3"] },

  /* ─────────────────────────── der_variations ─────────────────────────── */

  { id: "der_v_signe_derivee", label: "Étudier le signe de la fonction dérivée sur un intervalle", notionId: "der_variations", prerequis: [] },
  { id: "der_v_lien_signe", label: "Déduire le sens de variation d'une fonction du signe de sa dérivée", notionId: "der_variations", prerequis: ["der_v_signe_derivee"] },
  { id: "der_v_tableau", label: "Dresser le tableau de variations à partir du signe de la dérivée", notionId: "der_variations", prerequis: ["der_v_lien_signe"] },
  { id: "der_v_extremum", label: "Déterminer un extremum et la valeur où il est atteint", notionId: "der_variations", prerequis: ["der_v_tableau"] },

  /* ────────────────────────── der_optimisation ────────────────────────── */

  { id: "der_o_benefice", label: "Déterminer la production qui rend un bénéfice maximal", notionId: "der_optimisation", prerequis: [] },
  { id: "der_o_cout", label: "Déterminer la quantité qui rend un coût minimal", notionId: "der_optimisation", prerequis: ["der_o_benefice"] },
  { id: "der_o_conclure", label: "Répondre à un problème d'optimisation par une phrase, dans le contexte", notionId: "der_optimisation", prerequis: ["der_o_cout"] },

  /* ────────────────────────── expo_definition ────────────────────────── */

  { id: "expoT_reconnaitre", label: "Reconnaître une fonction exponentielle x ↦ aˣ (a > 0)", notionId: "expo_definition", prerequis: [] },
  { id: "expoT_prolongement", label: "Reconnaître la fonction x ↦ aˣ comme prolongement continu de la suite géométrique (aⁿ)", notionId: "expo_definition", prerequis: ["expoT_reconnaitre"] },
  { id: "expoT_calculer_image", label: "Calculer l'image d'un réel par une fonction exponentielle", notionId: "expo_definition", prerequis: ["expoT_reconnaitre"] },
  { id: "expoT_exposant_negatif", label: "Utiliser a⁻ˣ = 1/aˣ", notionId: "expo_definition", prerequis: ["expoT_calculer_image"] },

  /* ────────────────────────── expo_variations ────────────────────────── */

  { id: "expoT_sens_selon_a", label: "Déterminer le sens de variation de x ↦ aˣ selon les valeurs de a", notionId: "expo_variations", prerequis: [] },
  { id: "expoT_allure", label: "Reconnaître l'allure de la courbe représentative selon les valeurs de a", notionId: "expo_variations", prerequis: ["expoT_sens_selon_a"] },
  { id: "expoT_role_k", label: "Déterminer le sens de variation de x ↦ kaˣ selon le signe de k", notionId: "expo_variations", prerequis: ["expoT_sens_selon_a"] },
  { id: "expoT_lien_suite", label: "Faire le parallèle entre le sens de variation de x ↦ aˣ et celui des suites géométriques", notionId: "expo_variations", prerequis: ["expoT_sens_selon_a"] },

  /* ────────────────────────── expo_proprietes ────────────────────────── */

  { id: "expoT_somme_exposants", label: "Utiliser a^(x+y) = aˣ × a^y", notionId: "expo_proprietes", prerequis: [] },
  { id: "expoT_difference_exposants", label: "Utiliser a^(x−y) = aˣ / a^y", notionId: "expo_proprietes", prerequis: ["expoT_somme_exposants"] },
  { id: "expoT_puissance_exposant", label: "Utiliser a^(nx) = (aˣ)ⁿ pour n entier relatif", notionId: "expo_proprietes", prerequis: ["expoT_somme_exposants"] },
  { id: "expoT_transformer", label: "Transformer une écriture numérique ou littérale à l'aide des propriétés algébriques", notionId: "expo_proprietes", prerequis: ["expoT_difference_exposants", "expoT_puissance_exposant"] },

  /* ────────────────────────── expo_taux_moyen ────────────────────────── */

  { id: "expoT_exposant_un_sur_n", label: "Utiliser l'exposant 1/n comme racine n-ième d'un réel positif", notionId: "expo_taux_moyen", prerequis: [] },
  { id: "expoT_taux_moyen_calculer", label: "Calculer le taux d'évolution moyen équivalent à n évolutions successives", notionId: "expo_taux_moyen", prerequis: ["expoT_exposant_un_sur_n"] },
  { id: "expoT_taux_moyen_piege", label: "Savoir que le taux moyen n'est pas la moyenne des taux", notionId: "expo_taux_moyen", prerequis: ["expoT_taux_moyen_calculer"] },

  /* ──────────────────────── expo_taux_equivalent ──────────────────────── */

  { id: "expoT_taux_moyen_global", label: "Relier taux d'évolution global et taux d'évolution moyen", notionId: "expo_taux_equivalent", prerequis: [] },
  { id: "expoT_taux_mensuel_annuel", label: "Calculer un taux mensuel équivalent à un taux annuel", notionId: "expo_taux_equivalent", prerequis: ["expoT_taux_moyen_global"] },
  { id: "expoT_taux_moyen_interpreter", label: "Interpréter un taux d'évolution moyen dans le contexte", notionId: "expo_taux_equivalent", prerequis: ["expoT_taux_moyen_global"] },

  /* ─────────────────────────── log_definition ─────────────────────────── */

  { id: "logT_definition", label: "Reconnaître log(b) comme l'unique solution de l'équation 10ˣ = b", notionId: "log_definition", prerequis: [] },
  { id: "logT_valeurs_remarquables", label: "Connaître log(1), log(10) et log(10ⁿ)", notionId: "log_definition", prerequis: ["logT_definition"] },
  { id: "logT_sens_variation", label: "Déterminer le sens de variation de la fonction logarithme décimal", notionId: "log_definition", prerequis: ["logT_definition"] },

  /* ─────────────────────────── log_proprietes ─────────────────────────── */

  { id: "logT_produit", label: "Utiliser log(ab) = log(a) + log(b)", notionId: "log_proprietes", prerequis: [] },
  { id: "logT_quotient", label: "Utiliser log(a/b) = log(a) − log(b)", notionId: "log_proprietes", prerequis: ["logT_produit"] },
  { id: "logT_puissance", label: "Utiliser log(aⁿ) = n log(a)", notionId: "log_proprietes", prerequis: ["logT_produit"] },
  { id: "logT_inverse", label: "Utiliser log(1/b) = − log(b)", notionId: "log_proprietes", prerequis: ["logT_quotient"] },

  /* ─────────────────────────── log_equations ─────────────────────────── */

  { id: "logT_resoudre_exponentielle", label: "Résoudre une équation du type aˣ = b à l'aide du logarithme décimal", notionId: "log_equations", prerequis: [] },
  { id: "logT_resoudre_puissance", label: "Résoudre une équation du type xᵃ = b d'inconnue x réelle", notionId: "log_equations", prerequis: ["logT_resoudre_exponentielle"] },
  { id: "logT_inequation", label: "Résoudre une inéquation du type aˣ < b ou aⁿ < b", notionId: "log_equations", prerequis: ["logT_resoudre_exponentielle"] },

  /* ─────────────────────────── log_applications ─────────────────────────── */

  { id: "logT_nombre_annuites", label: "Déterminer un nombre d'annuités ou une durée de placement", notionId: "log_applications", prerequis: [] },
  { id: "logT_temps_doublement", label: "Déterminer un temps de doublement ou une demi-vie", notionId: "log_applications", prerequis: ["logT_nombre_annuites"] },
  { id: "logT_nombre_de_chiffres", label: "Déterminer l'ordre de grandeur d'un nombre et le nombre de chiffres de son écriture décimale", notionId: "log_applications", prerequis: [] },

  /* ──────────────────────── donnees_tableau_croise ──────────────────────── */

  { id: "don_tab_lire", label: "Lire un effectif dans un tableau croisé", notionId: "donnees_tableau_croise", prerequis: [] },
  { id: "don_tab_marges", label: "Calculer les effectifs marginaux et l'effectif total", notionId: "donnees_tableau_croise", prerequis: ["don_tab_lire"] },
  { id: "don_tab_completer", label: "Compléter un tableau croisé par des raisonnements sur les effectifs", notionId: "donnees_tableau_croise", prerequis: ["don_tab_marges"] },
  { id: "don_tab_dresser", label: "Dresser un tableau croisé de deux variables catégorielles à partir de données brutes", notionId: "donnees_tableau_croise", prerequis: ["don_tab_completer"] },

  /* ────────────────────────── donnees_frequences ────────────────────────── */

  { id: "don_freq_marginale", label: "Calculer une fréquence marginale", notionId: "donnees_frequences", prerequis: [] },
  { id: "don_freq_conditionnelle", label: "Calculer une fréquence conditionnelle", notionId: "donnees_frequences", prerequis: ["don_freq_marginale"] },
  { id: "don_freq_completer", label: "Compléter un tableau croisé en utilisant des fréquences conditionnelles", notionId: "donnees_frequences", prerequis: ["don_freq_conditionnelle"] },
  { id: "don_freq_interpreter", label: "Interpréter une fréquence conditionnelle dans une formulation de la presse", notionId: "donnees_frequences", prerequis: ["don_freq_conditionnelle"] },

  /* ─────────────────────────── donnees_filtres ─────────────────────────── */

  { id: "don_filtre_sous_ensemble", label: "Déterminer un sous-ensemble d'individus répondant à un critère", notionId: "donnees_filtres", prerequis: [] },
  { id: "don_filtre_et", label: "Utiliser un filtre avec ET (les deux critères à la fois)", notionId: "donnees_filtres", prerequis: ["don_filtre_sous_ensemble"] },
  { id: "don_filtre_ou", label: "Utiliser un filtre avec OU (l'un des critères au moins)", notionId: "donnees_filtres", prerequis: ["don_filtre_sous_ensemble"] },
  { id: "don_filtre_non", label: "Utiliser un filtre avec NON (le critère contraire)", notionId: "donnees_filtres", prerequis: ["don_filtre_sous_ensemble"] },

  /* ─────────────────────────── stat_nuage ─────────────────────────── */

  { id: "statT_nuage_representer", label: "Représenter un nuage de points associé à une série statistique à deux variables quantitatives", notionId: "stat_nuage", prerequis: [] },
  { id: "statT_nuage_lire", label: "Lire les coordonnées d'un point d'un nuage", notionId: "stat_nuage", prerequis: ["statT_nuage_representer"] },
  { id: "statT_nuage_tendance", label: "Décrire la tendance d'un nuage (croissante, décroissante, alignement)", notionId: "stat_nuage", prerequis: ["statT_nuage_lire"] },

  /* ─────────────────────────── stat_ajustement ─────────────────────────── */

  { id: "statT_ajust_pertinence", label: "Apprécier la pertinence d'un ajustement affine pour un nuage donné", notionId: "stat_ajustement", prerequis: [] },
  { id: "statT_ajust_au_juge", label: "Tracer une droite d'ajustement affine « au jugé »", notionId: "stat_ajustement", prerequis: ["statT_ajust_pertinence"] },
  { id: "statT_ajust_equation", label: "Déterminer l'équation d'une droite d'ajustement affine", notionId: "stat_ajustement", prerequis: ["statT_ajust_au_juge"] },
  { id: "statT_ajust_calculer", label: "Utiliser l'équation d'un ajustement affine pour calculer une valeur", notionId: "stat_ajustement", prerequis: ["statT_ajust_equation"] },

  /* ────────────────────────── stat_interpoler ────────────────────────── */

  { id: "statT_interpoler", label: "Interpoler une valeur inconnue à l'aide d'un ajustement affine", notionId: "stat_interpoler", prerequis: [] },
  { id: "statT_extrapoler", label: "Extrapoler une valeur inconnue à l'aide d'un ajustement affine", notionId: "stat_interpoler", prerequis: ["statT_interpoler"] },
  { id: "statT_limites", label: "Discuter les limites d'une extrapolation", notionId: "stat_interpoler", prerequis: ["statT_extrapoler"] },

  /* ──────────────────────── stat_moindres_carres ──────────────────────── */

  { id: "statT_mc_principe", label: "Reconnaître la droite des moindres carrés comme celle qui minimise la somme des carrés des écarts", notionId: "stat_moindres_carres", prerequis: [] },
  { id: "statT_mc_calculer", label: "Calculer la somme des carrés des écarts pour une droite donnée", notionId: "stat_moindres_carres", prerequis: ["statT_mc_principe"] },
  { id: "statT_mc_comparer", label: "Comparer deux droites d'ajustement à l'aide de la somme des carrés des écarts", notionId: "stat_moindres_carres", prerequis: ["statT_mc_calculer"] },

  /* ────────────────────── stat_changement_variable ────────────────────── */

  { id: "statT_cv_appliquer", label: "Effectuer un changement de variable donné (u², 1/t, log(y)) sur une série", notionId: "stat_changement_variable", prerequis: [] },
  { id: "statT_cv_lire", label: "Lire le nuage transformé et conjecturer une relation de linéarité", notionId: "stat_changement_variable", prerequis: ["statT_cv_appliquer"] },
  { id: "statT_cv_revenir", label: "Revenir aux variables initiales après un ajustement sur les variables transformées", notionId: "stat_changement_variable", prerequis: ["statT_cv_lire"] },

  /* ─────────────────── proba_conditionnelle_tableau ─────────────────── */

  { id: "probaC_reconnaitre", label: "Reconnaître une probabilité conditionnelle dans un énoncé (« parmi », « sachant que »)", notionId: "proba_conditionnelle_tableau", prerequis: [] },
  { id: "probaC_notation", label: "Utiliser la notation P_A(B)", notionId: "proba_conditionnelle_tableau", prerequis: ["probaC_reconnaitre"] },
  { id: "probaC_calculer_tableau", label: "Calculer une probabilité conditionnelle à partir d'un tableau croisé d'effectifs", notionId: "proba_conditionnelle_tableau", prerequis: ["probaC_notation"] },

  /* ────────────────── proba_conditionnelle_distinguer ────────────────── */

  { id: "probaC_distinguer", label: "Distinguer P(A ∩ B), P_A(B) et P_B(A)", notionId: "proba_conditionnelle_distinguer", prerequis: [] },
  { id: "probaC_interpreter_phrase", label: "Interpréter une probabilité conditionnelle par une phrase", notionId: "proba_conditionnelle_distinguer", prerequis: ["probaC_distinguer"] },
  { id: "probaC_test_diagnostique", label: "Interpréter faux positifs, faux négatifs, sensibilité et spécificité d'un test", notionId: "proba_conditionnelle_distinguer", prerequis: ["probaC_distinguer"] },

  /* ─────────────────── proba_epreuves_independantes ─────────────────── */

  { id: "probaI_arbre_deux_epreuves", label: "Représenter par un arbre une expérience à deux épreuves indépendantes", notionId: "proba_epreuves_independantes", prerequis: [] },
  { id: "probaI_produit", label: "Calculer la probabilité d'un chemin comme produit des probabilités des branches", notionId: "proba_epreuves_independantes", prerequis: ["probaI_arbre_deux_epreuves"] },
  { id: "probaI_bernoulli_repetition", label: "Représenter par un arbre la répétition de n épreuves de Bernoulli (n ≤ 4)", notionId: "proba_epreuves_independantes", prerequis: ["probaI_produit"] },
  { id: "probaI_avec_sans_remise", label: "Distinguer un tirage avec remise (indépendance) d'un tirage sans remise", notionId: "proba_epreuves_independantes", prerequis: ["probaI_produit"] },

  /* ─────────────────────────── proba_arbre ─────────────────────────── */

  { id: "probaT_arbre_construire", label: "Construire un arbre de probabilités associé à une situation donnée", notionId: "proba_arbre", prerequis: [] },
  { id: "probaT_arbre_ponderer", label: "Placer les pondérations sur les branches d'un arbre", notionId: "proba_arbre", prerequis: ["probaT_arbre_construire"] },
  { id: "probaT_arbre_completer", label: "Compléter un arbre pondéré incomplet", notionId: "proba_arbre", prerequis: ["probaT_arbre_ponderer"] },
  { id: "probaT_arbre_interpreter", label: "Interpréter la pondération d'une branche en termes de probabilité conditionnelle", notionId: "proba_arbre", prerequis: ["probaT_arbre_ponderer"] },

  /* ──────────────────────── proba_arbre_calcul ──────────────────────── */

  { id: "probaT_chemin", label: "Calculer la probabilité d'un chemin en multipliant les branches", notionId: "proba_arbre_calcul", prerequis: [] },
  { id: "probaT_somme_chemins", label: "Calculer la probabilité d'un évènement comme somme de chemins", notionId: "proba_arbre_calcul", prerequis: ["probaT_chemin"] },
  { id: "probaT_probabilites_totales", label: "Calculer la probabilité d'un évènement connaissant ses probabilités conditionnelles relatives à une partition", notionId: "proba_arbre_calcul", prerequis: ["probaT_somme_chemins"] },
  { id: "probaT_arbre_vers_tableau", label: "Passer d'un arbre pondéré à un tableau croisé, et inversement", notionId: "proba_arbre_calcul", prerequis: ["probaT_somme_chemins"] },

  /* ──────────────────────── proba_independance ──────────────────────── */

  { id: "probaT_indep_definition", label: "Reconnaître l'indépendance de deux évènements : P_A(B) = P(B)", notionId: "proba_independance", prerequis: [] },
  { id: "probaT_indep_produit", label: "Utiliser P(A ∩ B) = P(A) × P(B) pour deux évènements indépendants", notionId: "proba_independance", prerequis: ["probaT_indep_definition"] },
  { id: "probaT_indep_justifier", label: "Justifier par un calcul que deux évènements sont indépendants, ou ne le sont pas", notionId: "proba_independance", prerequis: ["probaT_indep_produit"] },
  { id: "probaT_indep_incompatible", label: "Distinguer indépendance et incompatibilité", notionId: "proba_independance", prerequis: ["probaT_indep_definition"] },

  /* ─────────────────────── va_loi_probabilite ─────────────────────── */

  { id: "va_ecritures", label: "Interpréter en situation les écritures {X = a} et {X ≤ a}", notionId: "va_loi_probabilite", prerequis: [] },
  { id: "va_calculer_probabilites", label: "Calculer P(X = a) et P(X ≤ a)", notionId: "va_loi_probabilite", prerequis: ["va_ecritures"] },
  { id: "va_dresser_loi", label: "Dresser la loi de probabilité d'une variable aléatoire discrète", notionId: "va_loi_probabilite", prerequis: ["va_calculer_probabilites"] },
  { id: "va_somme_un", label: "Vérifier que la somme des probabilités d'une loi vaut 1", notionId: "va_loi_probabilite", prerequis: ["va_dresser_loi"] },

  /* ───────────────────────────── va_esperance ───────────────────────────── */

  { id: "va_esp_calculer", label: "Calculer l'espérance d'une variable aléatoire discrète", notionId: "va_esperance", prerequis: [] },
  { id: "va_esp_interpreter", label: "Interpréter l'espérance comme valeur moyenne sur un grand nombre de répétitions", notionId: "va_esperance", prerequis: ["va_esp_calculer"] },
  { id: "va_esp_jeu_equitable", label: "Décider si un jeu est équitable à l'aide de l'espérance", notionId: "va_esperance", prerequis: ["va_esp_interpreter"] },
  { id: "va_esp_decision", label: "Comparer deux options à l'aide de leur espérance", notionId: "va_esperance", prerequis: ["va_esp_interpreter"] },

  /* ───────────────────────────── va_bernoulli ───────────────────────────── */

  { id: "va_bern_reconnaitre", label: "Reconnaître une situation aléatoire modélisée par une loi de Bernoulli", notionId: "va_bernoulli", prerequis: [] },
  { id: "va_bern_esperance", label: "Calculer l'espérance d'une loi de Bernoulli de paramètre p", notionId: "va_bernoulli", prerequis: ["va_bern_reconnaitre"] },
  { id: "va_bern_simuler", label: "Simuler N échantillons de taille n d'une loi de Bernoulli", notionId: "va_bernoulli", prerequis: ["va_bern_reconnaitre"] },
  { id: "va_bern_representer", label: "Représenter les fréquences observées par un histogramme ou un nuage de points", notionId: "va_bernoulli", prerequis: ["va_bern_simuler"] },

  /* ─────────────────────────── va_echantillonnage ─────────────────────────── */

  { id: "va_ech_fluctuation", label: "Observer la fluctuation d'échantillonnage sur des simulations", notionId: "va_echantillonnage", prerequis: [] },
  { id: "va_ech_distance", label: "Interpréter la distance à p de la fréquence observée dans un échantillon", notionId: "va_echantillonnage", prerequis: ["va_ech_fluctuation"] },
  { id: "va_ech_rare_ou_frequent", label: "Décider si une observation est fréquente ou rare dans le cadre du modèle", notionId: "va_echantillonnage", prerequis: ["va_ech_distance"] },
  { id: "va_ech_taille", label: "Savoir que diviser la dispersion par k demande de multiplier la taille de l'échantillon par k²", notionId: "va_echantillonnage", prerequis: ["va_ech_distance"] },

  /* ─────────────────── va_binomiale_reconnaitre ─────────────────── */

  { id: "vaT_bin_reconnaitre", label: "Reconnaître une situation relevant de la loi binomiale", notionId: "va_binomiale_reconnaitre", prerequis: [] },
  { id: "vaT_bin_parametres", label: "Identifier le couple de paramètres (n, p) d'une loi binomiale", notionId: "va_binomiale_reconnaitre", prerequis: ["vaT_bin_reconnaitre"] },
  { id: "vaT_bin_arbre", label: "Interpréter l'évènement {X = k} sur un arbre de probabilité", notionId: "va_binomiale_reconnaitre", prerequis: ["vaT_bin_parametres"] },
  { id: "vaT_bin_contre_exemple", label: "Reconnaître une situation qui ne relève PAS de la loi binomiale (tirage sans remise)", notionId: "va_binomiale_reconnaitre", prerequis: ["vaT_bin_reconnaitre"] },

  /* ─────────────────── va_binomiale_coefficients ─────────────────── */

  { id: "vaT_coef_definition", label: "Reconnaître le coefficient binomial comme le nombre de chemins réalisant k succès", notionId: "va_binomiale_coefficients", prerequis: [] },
  { id: "vaT_triangle_pascal", label: "Calculer des coefficients binomiaux à l'aide du triangle de Pascal (n ≤ 10)", notionId: "va_binomiale_coefficients", prerequis: ["vaT_coef_definition"] },
  { id: "vaT_formule_pascal", label: "Utiliser la formule de Pascal", notionId: "va_binomiale_coefficients", prerequis: ["vaT_triangle_pascal"] },
  { id: "vaT_coef_denombrer", label: "Dénombrer les chemins d'un arbre réalisant k succès pour n ≤ 4", notionId: "va_binomiale_coefficients", prerequis: ["vaT_coef_definition"] },

  /* ─────────────────────── va_binomiale_calcul ─────────────────────── */

  { id: "vaT_bin_extremes", label: "Calculer P(X = 0), P(X = 1), P(X = n) et P(X = n − 1)", notionId: "va_binomiale_calcul", prerequis: [] },
  { id: "vaT_bin_pk", label: "Calculer P(X = k) à l'aide des coefficients binomiaux", notionId: "va_binomiale_calcul", prerequis: ["vaT_bin_extremes"] },
  { id: "vaT_bin_reunion", label: "Calculer la probabilité d'un évènement obtenu par réunion (« au moins un »)", notionId: "va_binomiale_calcul", prerequis: ["vaT_bin_pk"] },
  { id: "vaT_bin_esperance", label: "Déterminer et interpréter l'espérance d'une loi binomiale", notionId: "va_binomiale_calcul", prerequis: ["vaT_bin_pk"] },

  /* ─────────────────────────── algo_variables ─────────────────────────── */

  { id: "algo_affectation", label: "Lire une affectation et suivre la valeur d'une variable", notionId: "algo_variables", prerequis: [] },
  { id: "algo_compteur", label: "Utiliser la notion de compteur", notionId: "algo_variables", prerequis: ["algo_affectation"] },
  { id: "algo_accumulateur", label: "Utiliser le principe d'accumulateur pour calculer une somme ou un produit", notionId: "algo_variables", prerequis: ["algo_compteur"] },
  { id: "algo_aleatoire", label: "Utiliser un générateur de nombres aléatoires entre 0 et 1 pour simuler une loi de Bernoulli", notionId: "algo_variables", prerequis: ["algo_affectation"] },

  /* ──────────────────────────── algo_boucles ──────────────────────────── */

  { id: "algo_boucle_bornee", label: "Lire et compléter une boucle bornée", notionId: "algo_boucles", prerequis: [] },
  { id: "algo_condition_si", label: "Lire et compléter une instruction conditionnelle", notionId: "algo_boucles", prerequis: [] },
  { id: "algo_boucle_conditionnelle", label: "Lire et compléter une boucle non bornée (recherche de seuil)", notionId: "algo_boucles", prerequis: ["algo_boucle_bornee", "algo_condition_si"] },
  { id: "algo_derouler", label: "Dérouler un algorithme et donner la valeur affichée", notionId: "algo_boucles", prerequis: ["algo_boucle_bornee"] },

  /* ──────────────────────────── algo_listes ──────────────────────────── */

  { id: "algo_liste_generer", label: "Générer une liste (en extension, par ajouts successifs, en compréhension)", notionId: "algo_listes", prerequis: [] },
  { id: "algo_liste_indices", label: "Accéder à un élément d'une liste par son indice", notionId: "algo_listes", prerequis: ["algo_liste_generer"] },
  { id: "algo_liste_parcourir", label: "Itérer sur les éléments d'une liste", notionId: "algo_listes", prerequis: ["algo_liste_indices"] },
  { id: "algo_liste_modifier", label: "Ajouter ou supprimer un élément d'une liste", notionId: "algo_listes", prerequis: ["algo_liste_indices"] },

  /* ─────────────────────────── algo_fonctions ─────────────────────────── */

  { id: "algo_fct_entrees_sorties", label: "Identifier les entrées et les sorties d'une fonction", notionId: "algo_fonctions", prerequis: [] },
  { id: "algo_fct_definir", label: "Lire la définition d'une fonction en langage Python", notionId: "algo_fonctions", prerequis: ["algo_fct_entrees_sorties"] },
  { id: "algo_fct_appeler", label: "Déterminer la valeur renvoyée par un appel de fonction", notionId: "algo_fonctions", prerequis: ["algo_fct_definir"] },
  { id: "algo_fct_structurer", label: "Structurer un programme en ayant recours aux fonctions", notionId: "algo_fonctions", prerequis: ["algo_fct_appeler"] },

  /* ─────────────────────────── tableur_formules ─────────────────────────── */

  { id: "tab_lire", label: "Lire une valeur dans un extrait de feuille de calcul", notionId: "tableur_formules", prerequis: [] },
  { id: "tab_comprendre_formule", label: "Comprendre une formule de tableur (= B2 * 1,05)", notionId: "tableur_formules", prerequis: ["tab_lire"] },
  { id: "tab_ecrire_formule", label: "Écrire la formule à saisir puis à recopier vers le bas ou vers la droite", notionId: "tableur_formules", prerequis: ["tab_comprendre_formule"] },

  /* ─────────────────────────── tableur_recopie ─────────────────────────── */

  { id: "tab_adressage", label: "Utiliser un adressage absolu ou relatif", notionId: "tableur_recopie", prerequis: [] },
  { id: "tab_exploiter_colonne", label: "Exploiter une colonne de valeurs pour répondre à une question (seuil, dépassement)", notionId: "tableur_recopie", prerequis: ["tab_adressage"] },
  { id: "tab_choisir_representation", label: "Choisir la représentation la plus adaptée à une situation (tableau, graphique)", notionId: "tableur_recopie", prerequis: ["tab_exploiter_colonne"] },

  /* ────────────────────────── logique_connecteurs ────────────────────────── */

  { id: "logique_et", label: "Utiliser correctement le connecteur logique « et »", notionId: "logique_connecteurs", prerequis: [] },
  { id: "logique_ou", label: "Utiliser correctement le connecteur logique « ou »", notionId: "logique_connecteurs", prerequis: ["logique_et"] },
  { id: "logique_non", label: "Formuler la négation d'une proposition", notionId: "logique_connecteurs", prerequis: ["logique_et"] },
  { id: "logique_ou_courant", label: "Distinguer le « ou » mathématique du « ou » du langage courant", notionId: "logique_connecteurs", prerequis: ["logique_ou"] },

  /* ────────────────────────── logique_raisonnement ────────────────────────── */

  { id: "logique_contre_exemple", label: "Utiliser un contre-exemple pour infirmer une proposition universelle", notionId: "logique_raisonnement", prerequis: [] },
  { id: "logique_reciproque", label: "Distinguer une proposition de sa réciproque", notionId: "logique_raisonnement", prerequis: ["logique_contre_exemple"] },
  { id: "logique_necessaire_suffisante", label: "Utiliser à bon escient « condition nécessaire », « condition suffisante », « équivalence »", notionId: "logique_raisonnement", prerequis: ["logique_reciproque"] },
];
