// Québec, secondaire 1 à 3 — « Progression des apprentissages au secondaire,
// Mathématique » (PFEQ, ministère de l'Éducation du Québec, 2016).
// Relevé le 22/10/2026 sur le PDF officiel. Les années y sont marquées par des
// symboles (→ l'élève l'apprend avec l'enseignant, ★ il le fait seul en fin
// d'année) : un contenu figure dans Sec N s'il a → ou ★ en colonne N. Beaucoup
// s'étendent sur Sec 1 ET Sec 2 (le 1er cycle) : ils sont écrits UNE fois, avec
// leurs années, et les trois classes sont tirées de cette liste.
// Les codes reprennent la structure du document : SNR = sens du nombre réel,
// OPR = opérations, PRO = proportionnalité, ALG = expressions et équations,
// DEP = liens de dépendance, PRB = probabilités, STA = statistique,
// GEO = figures géométriques, MES = mesures.
// Âges : Sec 1 ≈ notre 5e, Sec 2 ≈ 4e, Sec 3 ≈ 3e.

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ContenuPays, ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

type ContenuQuebec = ContenuPays & { annees: (1 | 2 | 3)[] };

const AR = "Arithmétique";
const AL = "Algèbre";
const PR = "Probabilités";
const ST = "Statistique";
const GE = "Géométrie";
const ME = "Mesure";

const CONTENUS: ContenuQuebec[] = [
  // ── Arithmétique ──────────────────────────────────────────────────────────
  { code: "SNR 2b", domaine: AR, annees: [1, 2], texte: "Sens de la fraction : partie d'un tout, division, rapport, opérateur, mesure.", couverture: "complete", micros: [...m("6e", "fraction_representer", "fraction_quantite"), ...m("5e", "fraction_egale")] },
  { code: "SNR 6", domaine: AR, annees: [1], texte: "Représenter, lire et écrire des nombres en notation fractionnaire ou décimale.", couverture: "complete", micros: m("6e", "fraction_lire_ecrire", "fraction_decimal") },
  { code: "SNR 7", domaine: AR, annees: [1], texte: "Faire une approximation : estimation, arrondissement, troncature.", couverture: "partielle", micros: m("4e", "ordre_estimer"), note: "Arrondir et tronquer n'ont pas de micro dédiée." },
  { code: "SNR 8", domaine: AR, annees: [3], texte: "Distinguer nombres naturels, entiers, rationnels, irrationnels et réels.", couverture: "complete", micros: [...m("seconde", "reels_ensembles"), ...m("3e", "fraction_rationnel_reconnaitre")] },
  { code: "SNR 9", domaine: AR, annees: [3], texte: "Sous-ensembles de réels : intervalle, extension, droite numérique.", couverture: "complete", micros: m("seconde", "intervalle_representer", "intervalle_appartenance", "reels_droite_graduee") },
  { code: "SNR 10", domaine: AR, annees: [1, 2, 3], texte: "La valeur absolue en contexte (écart, distance entre deux points).", couverture: "complete", micros: [...m("5e", "relatif_valeur_absolue"), ...m("seconde", "valeur_absolue_distance")] },
  { code: "SNR 11b", domaine: AR, annees: [1, 2], texte: "Carrés et racines carrées.", couverture: "complete", micros: [...m("3e", "entier_racine_carre_parfait", "entier_racine_calculer"), ...m("4e", "pythagore_carre_racine")] },
  { code: "SNR 11c", domaine: AR, annees: [1, 2], texte: "Notation exponentielle (exposant entier).", couverture: "complete", micros: m("4e", "puissance_comprendre", "puissance_calculer", "puissance_exposant_negatif") },
  { code: "SNR 11d", domaine: AR, annees: [3], texte: "Notation scientifique.", couverture: "complete", micros: [...m("4e", "puissance_notation_scientifique"), ...m("3e", "entier_puissance_ecriture_scientifique")] },
  { code: "SNR 11e", domaine: AR, annees: [3], texte: "Cubes et racines cubiques.", couverture: "absente", micros: [], note: "Aucune racine cubique dans le coach (même trou qu'aux États-Unis, 8.EE.A.2)." },
  { code: "SNR 11f", domaine: AR, annees: [3], texte: "Notation exponentielle à exposant fractionnaire.", couverture: "absente", micros: [], note: "Les exposants fractionnaires (8^(1/3)) ne sont pas au programme français du collège." },
  { code: "SNR 13-14", domaine: AR, annees: [1, 2, 3], texte: "Estimer l'ordre de grandeur d'un réel, au besoin avec la notation scientifique.", couverture: "complete", micros: m("4e", "ordre_estimer", "ordre_vraisemblance", "puissance_comparer") },
  { code: "SNR 15", domaine: AR, annees: [1, 2], texte: "Comparer et ordonner des nombres écrits sous différentes formes.", couverture: "complete", micros: [...m("5e", "fraction_comparer"), ...m("3e", "fraction_rationnel_comparer")] },
  { code: "OPR 4b", domaine: AR, annees: [1], texte: "Caractères de divisibilité par 2, 3, 4, 5 et 10.", couverture: "complete", micros: m("5e", "div_critere_2_5_10", "div_critere_3_9") },
  { code: "OPR 5-6", domaine: AR, annees: [1, 2], texte: "Approximer un résultat ; calcul mental des quatre opérations.", couverture: "complete", micros: [...m("6e", "entier_strategie_mentale", "decimal_multiplier_par_01"), ...m("4e", "ordre_estimer")] },
  { code: "OPR 7a", domaine: AR, annees: [1], texte: "Calcul écrit avec des nombres décimaux, en appliquant les règles des signes.", couverture: "complete", micros: [...m("5e", "relatif_addition", "relatif_soustraction"), ...m("4e", "relatif_multiplication", "relatif_division")] },
  { code: "OPR 7b", domaine: AR, annees: [1, 2], texte: "Calcul écrit avec des fractions positives.", couverture: "complete", micros: [...m("5e", "fraction_additionner", "fraction_multiplier"), ...m("4e", "fraction_diviser")] },
  { code: "OPR 7c", domaine: AR, annees: [3], texte: "Calcul écrit avec des nombres en notation fractionnaire (positifs et négatifs).", couverture: "complete", micros: [...m("4e", "fraction_oppose"), ...m("3e", "fraction_rationnel_calculer")] },
  { code: "OPR 8 / SOP 6", domaine: AR, annees: [1], texte: "Traduire une situation par une chaîne d'opérations et l'effectuer (priorités, parenthèses).", couverture: "partielle", micros: [...m("4e", "relatif_calcul"), ...m("6e", "algebre_barres")], note: "Les priorités opératoires n'ont pas de micro dédiée au collège." },
  { code: "OPR 9", domaine: AR, annees: [1], texte: "Effectuer opérations et chaînes d'opérations à la calculatrice.", couverture: "hors-coach", micros: [] },
  { code: "OPR 11", domaine: AR, annees: [1, 2], texte: "Passer d'une écriture à une autre : fraction, décimal, pourcentage.", couverture: "complete", micros: [...m("6e", "pourcentage_fraction", "pourcentage_decimal"), ...m("4e", "fraction_decimal")] },
  { code: "OPR 14a", domaine: AR, annees: [3], texte: "Expressions numériques avec exposants entiers et fractionnaires.", couverture: "partielle", micros: m("seconde", "puiss_produit_quotient", "puiss_puissance_puissance"), note: "Exposants fractionnaires absents." },
  { code: "SOP 2b / 5", domaine: AR, annees: [1], texte: "Opérations sur des fractions ; expressions équivalentes (fractions équivalentes, simplification).", couverture: "complete", micros: m("5e", "fraction_quantite", "fraction_simplifier", "fraction_egale") },
  { code: "SOP 7-8", domaine: AR, annees: [1], texte: "Anticiper le résultat d'opérations et l'interpréter selon le contexte.", couverture: "complete", micros: [...m("4e", "ordre_vraisemblance"), ...m("5e", "conversion_coherence")] },
  { code: "PRO 1a", domaine: AR, annees: [1], texte: "Calculer le tant pour cent.", couverture: "complete", micros: [...m("6e", "pourcentage_calcul_simple"), ...m("4e", "prop_pourcentage")] },
  { code: "PRO 1b", domaine: AR, annees: [1, 2], texte: "Calculer le cent pour cent (retrouver le tout à partir d'une partie).", couverture: "partielle", micros: m("4e", "prop_coeff_multiplicateur", "prop_pourcentage"), note: "« 30 % valent 12, combien vaut le tout ? » n'a pas de micro dédiée." },
  { code: "PRO 2-6", domaine: AR, annees: [1, 2], texte: "Rapports et taux : reconnaître, interpréter, comparer (taux unitaire), traduire une situation.", couverture: "complete", micros: [...m("4e", "prop_rapport", "prop_ratio_quotients", "prop_ratio_partager", "grandeur_quotient"), ...m("6e", "prop_unite")] },
  { code: "PRO 7-8", domaine: AR, annees: [1, 2], texte: "Reconnaître et représenter une situation de proportionnalité (contexte, table, graphique).", couverture: "complete", micros: m("4e", "prop_reconnaitre", "prop_table", "prop_graphique") },
  { code: "PRO 9", domaine: AR, annees: [1, 2], texte: "Résoudre des situations de proportionnalité, directe ou INVERSE.", couverture: "partielle", micros: m("4e", "prop_quatrieme", "prop_coeff", "prop_probleme"), note: "La variation inverse (produit constant : 4 ouvriers en 6 jours, 8 ouvriers en 3) est absente au collège." },
  { code: "PRO 10", domaine: AR, annees: [3], texte: "Liens entre fonctions du 1er degré ou rationnelle et proportionnalité.", couverture: "complete", micros: [...m("3e", "fonction_affine_lineaire"), ...m("seconde", "reference_inverse")] },

  // ── Algèbre ───────────────────────────────────────────────────────────────
  { code: "ALG A4a-b", domaine: AL, annees: [1, 2], texte: "Rôle de l'inconnue, de la variable et de la constante.", couverture: "complete", micros: [...m("4e", "equation_reconnaitre", "litteral_expression_comprendre", "algo_variable")] },
  { code: "ALG A4c", domaine: AL, annees: [1, 2, 3], texte: "Le paramètre (de façon intuitive).", couverture: "partielle", micros: m("3e", "affine_coeff_directeur", "affine_ordonnee_origine"), note: "Le mot « paramètre » n'est pas travaillé comme tel." },
  { code: "ALG A4d-A6", domaine: AL, annees: [1, 2], texte: "Coefficient, degré, termes semblables ; construire et interpréter une expression algébrique.", couverture: "complete", micros: [...m("4e", "litteral_expression_reduire", "litteral_expression_traduire"), ...m("5e", "litteral_traduire")] },
  { code: "ALG A7-A8a", domaine: AL, annees: [1, 2], texte: "Expressions équivalentes ; égalités et équations.", couverture: "complete", micros: [...m("5e", "litteral_tester"), ...m("4e", "litteral_distributivite_reconnaitre")] },
  { code: "ALG B1", domaine: AL, annees: [1, 2], texte: "Valeur numérique d'une expression algébrique.", couverture: "complete", micros: m("4e", "litteral_expression_substituer") },
  { code: "ALG B2-B3", domaine: AL, annees: [1, 2], texte: "Opérations sur des expressions (+, −, × et ÷ par une constante) ; mise en évidence simple.", couverture: "complete", micros: m("4e", "litteral_expression_reduire", "litteral_distributivite_simple", "litteral_facteur_commun") },
  { code: "ALG B4a", domaine: AL, annees: [3], texte: "Multiplier des expressions algébriques de degré inférieur à 3.", couverture: "complete", micros: [...m("4e", "litteral_distributivite_double"), ...m("3e", "litteral_developper")] },
  { code: "ALG B5a", domaine: AL, annees: [3], texte: "Diviser une expression algébrique par un monôme.", couverture: "absente", micros: [], note: "(6x² + 4x) ÷ 2x : rien chez nous." },
  { code: "ALG B6a", domaine: AL, annees: [3], texte: "Factoriser par mise en évidence simple.", couverture: "complete", micros: [...m("3e", "litteral_factoriser"), ...m("4e", "litteral_factoriser_simple")] },
  { code: "ALG C1-C5a", domaine: AL, annees: [1, 2], texte: "Traduire une situation par une équation du 1er degré, dans différents registres.", couverture: "complete", micros: m("4e", "equation_traduire", "equation_probleme") },
  { code: "ALG C3", domaine: AL, annees: [1, 2], texte: "Manipuler des formules (isoler un élément).", couverture: "partielle", micros: m("4e", "equation_resoudre_simple"), note: "Isoler une lettre dans une formule (A = L × l → l = A ÷ L) n'a pas de micro." },
  { code: "ALG C7-C9", domaine: AL, annees: [1, 2], texte: "Transformer des équations (règles) ; résoudre ax + b = cx + d.", couverture: "complete", micros: m("4e", "equation_resoudre_simple", "equation_resoudre_reduction") },
  { code: "ALG C13-C15", domaine: AL, annees: [1, 2], texte: "Valider une solution (substitution) et l'interpréter selon le contexte.", couverture: "complete", micros: m("4e", "equation_verifier", "equation_probleme") },
  { code: "ALG C-inéq.", domaine: AL, annees: [3], texte: "Inéquations du 1er degré à une variable : reconnaître, traduire, transformer, résoudre.", couverture: "complete", micros: m("seconde", "inequation_resoudre", "inequation_intervalle") },
  { code: "ALG D1-D3", domaine: AL, annees: [3], texte: "Systèmes d'équations y = ax + b : traduire, résoudre (tables, graphique, comparaison).", couverture: "complete", micros: m("seconde", "droite_systeme", "droite_intersection", "fonction_comparer_courbes") },
  { code: "DEP A2-A3", domaine: AL, annees: [1, 2], texte: "Analyser une situation dans différents registres ; la représenter globalement par un graphique.", couverture: "complete", micros: m("4e", "fonction_changer_mode", "fonction_tableau_lire", "fonction_graphique_lire") },
  { code: "DEP A4-A5", domaine: AL, annees: [3], texte: "Variables dépendante et indépendante ; relations, fonctions et réciproques.", couverture: "partielle", micros: [...m("4e", "fonction_reconnaitre"), ...m("3e", "fonction_vocabulaire")], note: "La réciproque d'une fonction n'a pas de micro." },
  { code: "DEP B-a", domaine: AL, annees: [3], texte: "Fonctions polynomiales de degré 0 ou 1 : modéliser, règle, paramètres, propriétés.", couverture: "complete", micros: m("3e", "affine_reconnaitre", "affine_expression", "affine_graphique", "affine_probleme") },
  { code: "DEP B-d", domaine: AL, annees: [3], texte: "Fonction rationnelle f(x) = k/x (xy = k).", couverture: "complete", micros: m("seconde", "reference_inverse") },
  { code: "DEP B-g", domaine: AL, annees: [3], texte: "Fonctions définies par parties (initiation).", couverture: "absente", micros: [] },

  // ── Probabilités ──────────────────────────────────────────────────────────
  { code: "PRB A7", domaine: PR, annees: [1, 2], texte: "Expériences aléatoires à une ou plusieurs étapes (avec ou sans remise, avec ou sans ordre).", couverture: "partielle", micros: m("4e", "proba_issue"), note: "Les expériences à deux étapes (arbre, avec ou sans remise) sont chez nous en seconde." },
  { code: "PRB A9b", domaine: PR, annees: [1, 2], texte: "Dénombrer : réseaux, grilles, schémas, diagrammes de Venn.", couverture: "partielle", micros: m("seconde", "logique_union_intersection"), note: "Grilles et diagrammes de Venn au collège : rien." },
  { code: "PRB A10-A11", domaine: PR, annees: [1, 2], texte: "Univers des possibles ; types d'événements (certain, impossible, complémentaires, compatibles, dépendants…).", couverture: "complete", micros: [...m("5e", "proba_issue"), ...m("4e", "proba_issue", "proba_evenement")] },
  { code: "PRB B3", domaine: PR, annees: [1, 2], texte: "Distinguer probabilité théorique et probabilité fréquentielle.", couverture: "complete", micros: m("4e", "proba_frequence_comparer", "proba_frequence_repeter") },
  { code: "PRB B4 / B9", domaine: PR, annees: [1, 2], texte: "Calculer la probabilité d'un événement, l'interpréter et décider.", couverture: "complete", micros: m("4e", "proba_calculer_fraction", "proba_convertir", "proba_comparer") },
  { code: "PRB A8", domaine: PR, annees: [3], texte: "Variable aléatoire discrète ou continue.", couverture: "absente", micros: [] },
  { code: "PRB B5", domaine: PR, annees: [3], texte: "Arrangements, permutations, combinaisons (par raisonnement).", couverture: "absente", micros: [], note: "Le dénombrement n'est pas au programme français avant la Terminale spé." },
  { code: "PRB A9c / B7", domaine: PR, annees: [3], texte: "Probabilités géométriques (aires, longueurs) et contextes de mesure.", couverture: "absente", micros: [] },

  // ── Statistique ───────────────────────────────────────────────────────────
  { code: "STA A4", domaine: ST, annees: [1, 2], texte: "Types de caractères : qualitatif, quantitatif discret ou continu.", couverture: "absente", micros: [] },
  { code: "STA A6b", domaine: ST, annees: [1, 2], texte: "Tableau des effectifs et des fréquences ; diagramme circulaire.", couverture: "complete", micros: [...m("5e", "stat_effectif_frequence", "stat_representer"), ...m("6e", "stat_donnee_lire_circulaire")] },
  { code: "STA A6c", domaine: ST, annees: [3], texte: "Données groupées en classes, histogramme, diagramme de quartiles.", couverture: "partielle", micros: m("seconde", "stat_mediane_quartiles"), note: "Histogramme et diagramme de quartiles (boîte à moustaches) absents — même trou qu'en Ontario." },
  { code: "STA A7 / A12", domaine: ST, annees: [1, 2], texte: "Comparer des distributions ; choisir les mesures statistiques appropriées.", couverture: "complete", micros: [...m("4e", "stat_interpreter"), ...m("5e", "stat_lire_graphique")] },
  { code: "STA A9-A10", domaine: ST, annees: [1, 2], texte: "Moyenne arithmétique : concept, calcul, interprétation.", couverture: "complete", micros: [...m("5e", "stat_moyenne"), ...m("4e", "stat_moyenne")] },
  { code: "STA A11b-c", domaine: ST, annees: [1, 2], texte: "Étendue, minimum, maximum.", couverture: "complete", micros: m("4e", "stat_etendue") },
  { code: "STA A11a", domaine: ST, annees: [3], texte: "Mode, médiane, moyenne pondérée.", couverture: "partielle", micros: [...m("4e", "stat_mediane"), ...m("seconde", "stat_moyenne_ponderee")], note: "Le mode n'a pas de micro." },
  { code: "STA A11b-ii", domaine: ST, annees: [3], texte: "Étendue des quarts, étendue interquartile.", couverture: "complete", micros: m("seconde", "stat_mediane_quartiles", "stat_ecart_interquartile") },
  { code: "STA B1", domaine: ST, annees: [3], texte: "Données expérimentales et théoriques ; nuages de points.", couverture: "partielle", micros: m("premiere", "info_nuage_construire", "info_nuage_tendance"), note: "Niveau 1re chez nous." },

  // ── Géométrie ─────────────────────────────────────────────────────────────
  { code: "GEO A5", domaine: GE, annees: [1], texte: "Reconnaître et nommer des polygones réguliers convexes.", couverture: "absente", micros: [] },
  { code: "GEO A6-A7", domaine: GE, annees: [1, 2], texte: "Décomposer des figures planes ; disques et secteurs.", couverture: "partielle", micros: [...m("6e", "aire_decomposer", "cercle_vocabulaire")], note: "Le secteur de disque n'a pas de micro." },
  { code: "GEO A8", domaine: GE, annees: [1, 2, 3], texte: "Segments et droites remarquables (hauteur, médiane, médiatrice, bissectrice, apothème) ; cathète, hypoténuse.", couverture: "complete", micros: m("4e", "triangle_droites", "pythagore_reconnaitre") },
  { code: "GEO A9-A10", domaine: GE, annees: [1, 2], texte: "Propriétés des figures planes ; justifier à partir de définitions et de propriétés.", couverture: "complete", micros: [...m("5e", "para_cotes_angles", "para_diagonales"), ...m("4e", "sym_transformation_propriete")] },
  { code: "GEO B2-B6a", domaine: GE, annees: [1, 2], texte: "Développements de solides ; hauteur, apothème, face latérale ; solides décomposables (prismes, cylindres, pyramides).", couverture: "complete", micros: m("4e", "vision_reconnaitre", "vision_representation") },
  { code: "GEO B6b-B7", domaine: GE, annees: [3], texte: "Cônes droits et boules ; représenter un solide (développement, projections, perspectives).", couverture: "complete", micros: [...m("3e", "volume_solide_reconnaitre", "volume_representation", "section_cone_pyramide"), ...m("4e", "vision_vues")] },
  { code: "GEO C2-C4", domaine: GE, annees: [1, 2], texte: "Translation, rotation, réflexion : reconnaître, construire, propriétés.", couverture: "complete", micros: m("4e", "sym_translation", "sym_rotation", "sym_axiale", "sym_transformation_propriete") },
  { code: "GEO C5-C6", domaine: GE, annees: [1, 2], texte: "Homothéties de rapport positif : reconnaître, construire.", couverture: "complete", micros: m("3e", "sym_homothetie_reconnaitre", "sym_homothetie_construire") },
  { code: "GEO D2-D8", domaine: GE, annees: [1, 2], texte: "Figures isométriques ou semblables : reconnaître, transformations, invariants, justifier.", couverture: "complete", micros: m("4e", "triangle_egalite", "triangle_semblable") },

  // ── Mesure ────────────────────────────────────────────────────────────────
  { code: "MES B4", domaine: ME, annees: [1, 2], texte: "Durée et position dans le temps.", couverture: "complete", micros: m("6e", "duree_calculer", "duree_probleme") },
  { code: "MES C3-C5a", domaine: ME, annees: [1, 2], texte: "Angles complémentaires, supplémentaires, opposés par le sommet, alternes-internes, correspondants ; angles d'un triangle.", couverture: "complete", micros: m("5e", "angle_paires", "angle_paralleles", "triangle_somme_angle") },
  { code: "MES C5b", domaine: ME, annees: [1, 2], texte: "Angles au centre et arcs en degrés.", couverture: "absente", micros: [], note: "Angle au centre et longueur d'arc : rien (absents du programme français)." },
  { code: "MES D3-D4", domaine: ME, annees: [1, 2], texte: "Unités de longueur ; périmètre et circonférence.", couverture: "complete", micros: [...m("6e", "aire_longueur_convertir", "cercle_perimetre"), ...m("4e", "aire_perimetre_figure")] },
  { code: "MES D5", domaine: ME, annees: [1, 2, 3], texte: "Mesures manquantes : arc, segments issus d'une isométrie ou d'une similitude, segments d'un solide.", couverture: "partielle", micros: [...m("4e", "thales_calculer_longueur", "agrandissement_rapport"), ...m("3e", "pythagore_solide")], note: "Longueur d'un arc absente." },
  { code: "MES E3-E6e", domaine: ME, annees: [1, 2], texte: "Unités d'aire ; aire des quadrilatères, triangles, disques, secteurs ; aire latérale et totale des prismes, cylindres, pyramides.", couverture: "partielle", micros: [...m("6e", "aire_convertir"), ...m("5e", "aire_triangle", "aire_parallelogramme", "aire_composer")], note: "Manquent l'aire du disque et du secteur, et l'aire latérale/totale d'un solide." },
  { code: "MES E6f", domaine: ME, annees: [2, 3], texte: "Aire de figures semblables (rapport des aires = carré du rapport).", couverture: "complete", micros: [...m("4e", "agrandissement_aire"), ...m("3e", "sym_transformation_effet")] },
  { code: "MES E5 / E6g", domaine: ME, annees: [3], texte: "Aire d'une sphère, aire latérale et totale d'un cône.", couverture: "absente", micros: [] },
  { code: "MES F3-F4", domaine: ME, annees: [3], texte: "Unités de volume et de capacité.", couverture: "complete", micros: [...m("3e", "volume_unite"), ...m("5e", "volume_unite")] },
  { code: "MES F5-F7", domaine: ME, annees: [3], texte: "Volumes : prismes, cylindres, pyramides, cônes, boules, solides décomposables, similitude.", couverture: "partielle", micros: m("3e", "volume_prisme", "volume_cylindre", "volume_boule", "volume_agrandissement_reduction"), note: "Volume d'une pyramide ou d'un cône absent — le trou commun à tous les pays." },
  { code: "MES G2a", domaine: ME, annees: [3], texte: "Relation de Pythagore : mesures manquantes et justification.", couverture: "complete", micros: m("4e", "pythagore_calculer_hypotenuse", "pythagore_calculer_cote", "pythagore_reciproque_conclure", "pythagore_rediger") },
];

const SOURCE =
  "https://cdn-contenu.quebec.ca/cdn-contenu/education/pfeq/secondaire/progressions-apprentissages/PFEQ-progression-apprentissages-mathematique-secondaire.pdf";

function annee(n: 1 | 2 | 3, equivalentFrance: Classe): ProgrammePays {
  return {
    pays: "quebec",
    cle: `sec-${n}`,
    niveau: `Secondaire ${n}`,
    equivalentFrance,
    source: SOURCE,
    version: "2016",
    contenus: CONTENUS.filter((c) => c.annees.includes(n)).map(({ annees: _annees, ...c }) => c),
  };
}

export const QUEBEC_SEC_1 = annee(1, "5e");
export const QUEBEC_SEC_2 = annee(2, "4e");
export const QUEBEC_SEC_3 = annee(3, "3e");
