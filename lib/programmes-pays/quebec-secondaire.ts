// Québec, secondaire 1 à 5 — « Progression des apprentissages au secondaire,
// Mathématique » (PFEQ, ministère de l'Éducation du Québec, août 2016, avec la
// mise à jour de la séquence CST de 5e secondaire).
// Relevé le 22/10/2026 sur le PDF officiel. Les années y sont marquées par des
// symboles (→ l'élève l'apprend avec l'enseignant, ★ il le fait seul en fin
// d'année) : un contenu figure dans Sec N s'il a → ou ★ en colonne N. Beaucoup
// s'étendent sur Sec 1 ET Sec 2 (le 1er cycle) : ils sont écrits UNE fois, avec
// leurs années, et les trois classes sont tirées de cette liste.
// Les codes reprennent la structure du document : SNR = sens du nombre réel,
// OPR = opérations, PRO = proportionnalité, ALG = expressions et équations,
// DEP = liens de dépendance, PRB = probabilités, STA = statistique,
// GEO = figures géométriques, MES = mesures.
// Âges : Sec 1 ≈ notre 5e, Sec 2 ≈ 4e, Sec 3 ≈ 3e, Sec 4 ≈ 2de, Sec 5 ≈ 1re.
//
// ⭐ SEC 4 ET 5 = SÉQUENCE CST (25/10/2026). Au 2e cycle, l'élève suit l'une
// de trois séquences : CST (Culture, société et technique, la plus suivie), TS
// (Technico-sciences) ou SN (Sciences naturelles). La PDA n'a pas de tronc
// commun suffisant (les lignes sont cochées séquence par séquence) : on retient
// CST. Un contenu entre dans Sec 4 ou Sec 5 s'il est coché pour TOUTES les
// séquences (ligne sans étiquette) ou pour la ligne CST. Les contenus propres
// à TS ou SN (polynômes, coniques, vecteurs, cercle trigonométrique, matrices…)
// ne sont pas repris. Relevé le 25/10/2026 : symboles lus par leur position
// dans le PDF, lignes CST/TS/SN vérifiées sur les pages rendues en image.
// GAN = géométrie analytique, GRA = graphes, CHS = choix social,
// FIN = mathématiques financières.

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ContenuPays, ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

type Annee = 1 | 2 | 3 | 4 | 5;
type ContenuQuebec = ContenuPays & { annees: Annee[] };

const AR = "Arithmétique";
const AL = "Algèbre";
const PR = "Probabilités";
const ST = "Statistique";
const GE = "Géométrie";
const ME = "Mesure";
const GA = "Géométrie analytique";
const MD = "Mathématiques discrètes";
const MF = "Mathématiques financières";

const CONTENUS: ContenuQuebec[] = [
  // ── Arithmétique ──────────────────────────────────────────────────────────
  { code: "SNR 2b", domaine: AR, annees: [1, 2], texte: "Sens de la fraction : partie d'un tout, division, rapport, opérateur, mesure.", couverture: "complete", micros: [...m("6e", "fraction_representer", "fraction_quantite"), ...m("5e", "fraction_egale", "fraction_rationnel", "fraction_quantite")] },
  { code: "SNR 6", domaine: AR, annees: [1], texte: "Représenter, lire et écrire des nombres en notation fractionnaire ou décimale.", couverture: "complete", micros: m("6e", "fraction_lire_ecrire", "fraction_decimal") },
  { code: "SNR 7", domaine: AR, annees: [1], texte: "Faire une approximation : estimation, arrondissement, troncature.", couverture: "partielle", micros: m("4e", "ordre_estimer"), note: "Arrondir et tronquer n'ont pas de micro dédiée." },
  { code: "SNR 8", domaine: AR, annees: [3], texte: "Distinguer nombres naturels, entiers, rationnels, irrationnels et réels.", couverture: "complete", micros: [...m("seconde", "reels_ensembles"), ...m("3e", "fraction_rationnel_reconnaitre")] },
  { code: "SNR 9", domaine: AR, annees: [3], texte: "Sous-ensembles de réels : intervalle, extension, droite numérique.", couverture: "complete", micros: m("seconde", "intervalle_representer", "intervalle_appartenance", "reels_droite_graduee") },
  { code: "SNR 10", domaine: AR, annees: [1, 2, 3, 4], texte: "La valeur absolue en contexte (écart, distance entre deux points).", couverture: "complete", micros: [...m("5e", "relatif_valeur_absolue"), ...m("seconde", "valeur_absolue_distance")] },
  { code: "SNR 11b", domaine: AR, annees: [1, 2], texte: "Carrés et racines carrées.", couverture: "complete", micros: [...m("3e", "entier_racine_carre_parfait", "entier_racine_calculer"), ...m("4e", "pythagore_carre_racine")] },
  { code: "SNR 11c", domaine: AR, annees: [1, 2], texte: "Notation exponentielle (exposant entier).", couverture: "complete", micros: m("4e", "puissance_comprendre", "puissance_calculer", "puissance_exposant_negatif") },
  { code: "SNR 11d", domaine: AR, annees: [3], texte: "Notation scientifique.", couverture: "complete", micros: [...m("4e", "puissance_notation_scientifique"), ...m("3e", "entier_puissance_ecriture_scientifique")] },
  { code: "SNR 11e", domaine: AR, annees: [3], texte: "Cubes et racines cubiques.", couverture: "absente", micros: [], note: "Aucune racine cubique dans le coach (même trou qu'aux États-Unis, 8.EE.A.2)." },
  { code: "SNR 11f", domaine: AR, annees: [3], texte: "Notation exponentielle à exposant fractionnaire.", couverture: "absente", micros: [], note: "Les exposants fractionnaires (8^(1/3)) ne sont pas au programme français du collège." },
  { code: "SNR 13-14", domaine: AR, annees: [1, 2, 3], texte: "Estimer l'ordre de grandeur d'un réel, au besoin avec la notation scientifique.", couverture: "complete", micros: m("4e", "ordre_estimer", "ordre_vraisemblance", "puissance_comparer") },
  { code: "SNR 15", domaine: AR, annees: [1, 2], texte: "Comparer et ordonner des nombres écrits sous différentes formes.", couverture: "complete", micros: [...m("5e", "fraction_comparer"), ...m("4e", "fraction_comparer"), ...m("3e", "fraction_rationnel_comparer")] },
  { code: "OPR 4b", domaine: AR, annees: [1], texte: "Caractères de divisibilité par 2, 3, 4, 5 et 10.", couverture: "complete", micros: m("5e", "div_critere_2_5_10", "div_critere_3_9") },
  { code: "OPR 5-6", domaine: AR, annees: [1, 2], texte: "Approximer un résultat ; calcul mental des quatre opérations.", couverture: "complete", micros: [...m("6e", "entier_strategie_mentale", "decimal_multiplier_par_01"), ...m("4e", "ordre_estimer")] },
  { code: "OPR 7a", domaine: AR, annees: [1], texte: "Calcul écrit avec des nombres décimaux, en appliquant les règles des signes.", couverture: "complete", micros: [...m("5e", "relatif_addition", "relatif_soustraction"), ...m("4e", "relatif_multiplication", "relatif_division")] },
  { code: "OPR 7b", domaine: AR, annees: [1, 2], texte: "Calcul écrit avec des fractions positives.", couverture: "complete", micros: [...m("5e", "fraction_additionner", "fraction_multiplier"), ...m("4e", "fraction_additionner", "fraction_multiplier", "fraction_diviser")] },
  { code: "OPR 7c", domaine: AR, annees: [3], texte: "Calcul écrit avec des nombres en notation fractionnaire (positifs et négatifs).", couverture: "complete", micros: [...m("4e", "fraction_oppose"), ...m("3e", "fraction_rationnel_calculer")] },
  { code: "OPR 8 / SOP 6", domaine: AR, annees: [1], texte: "Traduire une situation par une chaîne d'opérations et l'effectuer (priorités, parenthèses).", couverture: "partielle", micros: [...m("4e", "relatif_calcul"), ...m("6e", "algebre_barres")], note: "Les priorités opératoires n'ont pas de micro dédiée au collège." },
  { code: "OPR 9", domaine: AR, annees: [1], texte: "Effectuer opérations et chaînes d'opérations à la calculatrice.", couverture: "hors-coach", micros: [] },
  { code: "OPR 11", domaine: AR, annees: [1, 2], texte: "Passer d'une écriture à une autre : fraction, décimal, pourcentage.", couverture: "complete", micros: [...m("6e", "fraction_decimal", "pourcentage_fraction", "pourcentage_decimal"), ...m("4e", "fraction_decimal")] },
  { code: "OPR 14a", domaine: AR, annees: [3], texte: "Expressions numériques avec exposants entiers et fractionnaires.", couverture: "partielle", micros: m("seconde", "puiss_produit_quotient", "puiss_puissance_puissance"), note: "Exposants fractionnaires absents." },
  { code: "SOP 2b / 5", domaine: AR, annees: [1], texte: "Opérations sur des fractions ; expressions équivalentes (fractions équivalentes, simplification).", couverture: "complete", micros: [...m("6e", "fraction_egale"), ...m("5e", "fraction_egale", "fraction_simplifier", "fraction_quantite", "fraction_additionner", "fraction_multiplier")] },
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
  { code: "DEP B-g", domaine: AL, annees: [3, 4], texte: "Fonctions définies par parties (initiation en Sec 3, étude en CST 4).", couverture: "partielle", micros: m("premiere", "lin_affine_par_morceaux"), note: "Seule la lecture d'une affine par morceaux (barème, tarif progressif) existe, en 1re." },

  // ── Probabilités ──────────────────────────────────────────────────────────
  { code: "PRB A7", domaine: PR, annees: [1, 2], texte: "Expériences aléatoires à une ou plusieurs étapes (avec ou sans remise, avec ou sans ordre).", couverture: "partielle", micros: m("4e", "proba_issue"), note: "Les expériences à deux étapes (arbre, avec ou sans remise) sont chez nous en seconde." },
  { code: "PRB A9b", domaine: PR, annees: [1, 2], texte: "Dénombrer : réseaux, grilles, schémas, diagrammes de Venn.", couverture: "partielle", micros: m("seconde", "logique_union_intersection"), note: "Grilles et diagrammes de Venn au collège : rien." },
  { code: "PRB A10-A11", domaine: PR, annees: [1, 2], texte: "Univers des possibles ; types d'événements (certain, impossible, complémentaires, compatibles, dépendants…).", couverture: "complete", micros: [...m("5e", "proba_issue"), ...m("4e", "proba_issue", "proba_evenement")] },
  { code: "PRB B3", domaine: PR, annees: [1, 2], texte: "Distinguer probabilité théorique et probabilité fréquentielle.", couverture: "complete", micros: m("4e", "proba_frequence_comparer", "proba_frequence_repeter") },
  { code: "PRB B4 / B9", domaine: PR, annees: [1, 2], texte: "Calculer la probabilité d'un événement, l'interpréter et décider.", couverture: "complete", micros: m("4e", "proba_calculer_fraction", "proba_convertir", "proba_comparer") },
  { code: "PRB A8", domaine: PR, annees: [3], texte: "Variable aléatoire discrète ou continue.", couverture: "absente", micros: [] },
  { code: "PRB B5", domaine: PR, annees: [3, 5], texte: "Probabilités avec arrangements, permutations, combinaisons (par raisonnement, sans formule).", couverture: "partielle", micros: [...m("terminale-spe", "denombrement_reconnaitre", "denombrement_arrangement_combinaison"), ...m("stmg", "vaT_coef_denombrer")], note: "Le dénombrement n'est au programme français qu'en Terminale : micros de ce niveau." },
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
  // ── Secondaire 4 et 5 : séquence CST (2e cycle) ───────────────────────────
  // Arithmétique
  { code: "SNR 12", domaine: AR, annees: [4], texte: "Apprécier la valeur d'une puissance selon sa base (entre 0 et 1, supérieure à 1) et son exposant (positif, négatif, entier, fractionnaire).", couverture: "partielle", micros: [...m("seconde", "puiss_exposant_negatif"), ...m("premiere", "expo_fct_reconnaitre", "expo_fct_graphique")], note: "Les exposants fractionnaires n'ont pas de micro." },
  { code: "SNR 11h / OPR 14c", domaine: AR, annees: [5], texte: "Notation logarithmique (log_a x = n ⇔ a^n = x) : définition et changement de base.", couverture: "partielle", micros: [...m("stmg", "logT_resoudre_exponentielle", "logT_sens_variation"), ...m("terminale-spe", "ln_definition")], note: "Le changement de base d'un logarithme n'a pas de micro ; chez nous le logarithme arrive en Terminale." },
  { code: "OPR 14b", domaine: AR, annees: [5], texte: "Expressions numériques avec des puissances : propriétés des exposants, changement de base (8^x = 2^(3x)).", couverture: "partielle", micros: m("seconde", "puiss_produit_quotient", "puiss_puissance_puissance", "puiss_expression_composee"), note: "Réécrire une puissance dans une autre base n'a pas de micro dédiée." },

  // Algèbre
  { code: "ALG D3b", domaine: AL, annees: [4], texte: "Résoudre un système d'équations du premier degré à deux variables (méthode au choix) ; valider et interpréter la solution.", couverture: "complete", micros: m("seconde", "droite_systeme", "droite_intersection") },
  { code: "DEP B 1-9", domaine: AL, annees: [4], texte: "Modéliser une situation par une fonction ; décrire ses propriétés à partir du graphique (domaine, image, variation, signe, extrémums) ; interpoler, extrapoler, comparer, décider.", couverture: "complete", micros: m("seconde", "fonction_tableau_graphique", "fonction_resolution_graphique", "fonction_comparer_courbes", "fonction_domaine") },
  { code: "DEP B-b-i", domaine: AL, annees: [4], texte: "Fonction polynomiale du second degré f(x) = ax².", couverture: "complete", micros: [...m("seconde", "reference_carre"), ...m("premiere", "quad_role_a", "quad_associer_parabole")] },
  { code: "DEP B-e-i", domaine: AL, annees: [4], texte: "Fonction exponentielle f(x) = a·c^x (la manipuler, sans rechercher la règle).", couverture: "complete", micros: m("premiere", "expo_fct_reconnaitre", "expo_fct_calculer", "expo_fct_graphique", "expo_modele_reconnaitre") },
  { code: "DEP B-i", domaine: AL, annees: [4], texte: "Fonctions en escalier (tarif postal, stationnement).", couverture: "absente", micros: [], note: "Rien chez nous : la fonction constante par paliers n'est pas travaillée." },
  { code: "DEP B-k-i", domaine: AL, annees: [4], texte: "Fonctions modélisant un phénomène périodique (marée, son) : analyse à partir du graphique, sans règle.", couverture: "partielle", micros: m("premiere-spe", "trig_courbes"), note: "Lire une période et une amplitude sur un graphique de marée n'a pas de micro." },
  { code: "ALG C11b", domaine: AL, annees: [5], texte: "Résoudre une équation exponentielle ou logarithmique à une variable (définition du logarithme, changement de base).", couverture: "complete", micros: [...m("stmg", "logT_resoudre_exponentielle"), ...m("premiere", "expo_seuil_calcul"), ...m("terminale-spe", "ln_equation_inequation")] },
  { code: "ALG C14a / GAN B3b", domaine: AL, annees: [5], texte: "Inéquation du premier degré à deux variables : demi-plan, région-solution (graphiquement et algébriquement).", couverture: "absente", micros: [], note: "Les demi-plans ne sont pas au programme français (même trou qu'au Sénégal)." },
  { code: "ALG D1b-D4a", domaine: AL, annees: [5], texte: "Traduire une situation par un système d'inéquations du premier degré à deux variables et le résoudre.", couverture: "absente", micros: [] },
  { code: "ALG E", domaine: AL, annees: [5], texte: "Programmation linéaire : polygone de contraintes, sommets, fonction à optimiser, solution optimale et décision.", couverture: "absente", micros: [], note: "Hors programme français : une série entière à écrire." },

  // Probabilités
  { code: "PRB A12", domaine: PR, annees: [5], texte: "Distinguer événements mutuellement exclusifs ou non, dépendants ou indépendants.", couverture: "partielle", micros: m("seconde", "proba_reunion_intersection", "proba_formule_union"), note: "L'indépendance de deux événements n'a pas de micro." },
  { code: "PRB A16", domaine: PR, annees: [5], texte: "Notation factorielle (facultative en CST).", couverture: "partielle", micros: m("terminale-spe", "denombrement_arrangement_combinaison"), note: "Pas de micro sur n! lui-même." },
  { code: "PRB A17 / B6", domaine: PR, annees: [5], texte: "Types de probabilités : fréquentielle, théorique, subjective ; associer le type à une situation.", couverture: "partielle", micros: m("4e", "proba_frequence_comparer", "proba_calculer_fraction"), note: "La probabilité subjective n'est pas travaillée." },
  { code: "PRB B8", domaine: PR, annees: [5], texte: "Calculer des probabilités conditionnelles.", couverture: "complete", micros: [...m("seconde", "proba_conditionnelle", "proba_arbre_pondere", "proba_tableau_croise"), ...m("premiere", "alea_cond_formule")] },
  { code: "PRB A18 / B10-B12", domaine: PR, annees: [5], texte: "Chances pour et chances contre : définir, calculer, interpréter, choisir entre chance et probabilité.", couverture: "absente", micros: [], note: "La notion de cote (« 3 contre 1 ») n'existe pas dans le programme français." },
  { code: "PRB A19 / B13-B15", domaine: PR, annees: [5], texte: "Espérance mathématique : la calculer, rendre un jeu équitable, décider.", couverture: "complete", micros: [...m("premiere-spe", "va_esperance", "va_esperance_probleme"), ...m("stmg", "va_esp_calculer")] },

  // Statistique
  { code: "STA A6d", domaine: ST, annees: [4], texte: "Diagramme à tige et à feuilles.", couverture: "absente", micros: [] },
  { code: "STA A11b-iii", domaine: ST, annees: [4], texte: "Écart moyen.", couverture: "absente", micros: [], note: "Le coach a l'écart type (seconde), pas l'écart moyen." },
  { code: "STA A11c-ii", domaine: ST, annees: [4], texte: "Rang centile (et la donnée correspondant à un rang centile).", couverture: "partielle", micros: m("seconde", "stat_mediane_quartiles"), note: "Seuls la médiane et les quartiles existent." },
  { code: "STA B2", domaine: ST, annees: [4], texte: "Représenter des données par un nuage de points ou un tableau à double entrée.", couverture: "complete", micros: m("premiere", "info_nuage_construire", "info_nuage_lire") },
  { code: "STA B3a / B7", domaine: ST, annees: [4], texte: "Associer à un nuage de points le modèle du premier degré le mieux ajusté et tracer la courbe.", couverture: "complete", micros: m("premiere", "info_ajust_pertinence", "info_ajust_determiner") },
  { code: "STA B4-B6", domaine: ST, annees: [4], texte: "Décrire le lien entre deux variables ; apprécier qualitativement la corrélation ; approximer et interpréter le coefficient de corrélation linéaire.", couverture: "partielle", micros: m("premiere", "info_nuage_tendance"), note: "Le coefficient de corrélation n'est pas au programme français : aucune micro." },
  { code: "STA B8", domaine: ST, annees: [4], texte: "Droite de régression : tracé à main levée, droite médiane-médiane, droite de Mayer.", couverture: "complete", micros: [...m("stmg", "statT_ajust_au_juge", "statT_ajust_equation"), ...m("premiere", "info_point_moyen_droite")] },
  { code: "STA B9a", domaine: ST, annees: [4], texte: "Interpoler ou extrapoler à l'aide de la droite de régression.", couverture: "complete", micros: m("premiere", "info_ajust_interpoler", "info_ajust_extrapoler") },
  { code: "STA B10", domaine: ST, annees: [4], texte: "Comparer des distributions à deux caractères.", couverture: "partielle", micros: m("premiere", "info_nuage_tendance"), note: "Comparer deux nuages entre eux n'a pas de micro." },

  // Géométrie et mesure
  { code: "GEO D5-D6", domaine: GE, annees: [4], texte: "Conditions minimales d'isométrie ou de similitude de triangles ; démontrer, chercher des mesures manquantes.", couverture: "complete", micros: m("4e", "triangle_egalite", "triangle_semblable", "thales_calculer_longueur") },
  { code: "MES G2a-ii", domaine: ME, annees: [4], texte: "Relations métriques dans le triangle rectangle (moyenne proportionnelle, hauteur issue de l'angle droit).", couverture: "absente", micros: [], note: "Hors programme français." },
  { code: "MES G2a-iii", domaine: ME, annees: [4], texte: "Rapports trigonométriques (sinus, cosinus, tangente) dans le triangle rectangle.", couverture: "complete", micros: m("3e", "trigo_sinus", "trigo_cosinus", "trigo_tangente", "trigo_calculer_longueur", "trigo_calculer_angle") },
  { code: "MES G2b-i", domaine: ME, annees: [4], texte: "Mesures manquantes dans un triangle quelconque : loi des sinus.", couverture: "absente", micros: [], note: "La loi des sinus n'est pas au programme français." },
  { code: "MES G2b-iii / G3", domaine: ME, annees: [4], texte: "Aire d'un triangle quelconque : formule de Héron, ou un angle et deux côtés.", couverture: "absente", micros: [] },
  { code: "MES G2b-ii", domaine: ME, annees: [5], texte: "Mesures manquantes dans un triangle quelconque : loi des cosinus.", couverture: "complete", micros: m("premiere-spe", "ps_alkashi"), note: "C'est la formule d'Al-Kashi, en 1re spécialité chez nous." },
  { code: "GEO D7 / MES D5d-F6d", domaine: GE, annees: [5], texte: "Figures équivalentes (même aire ou même volume) : reconnaître, chercher des mesures manquantes, optimiser.", couverture: "absente", micros: [] },

  // Géométrie analytique (relevée le 25/10 : elle complète aussi Sec 3)
  { code: "GAN B1a", domaine: GA, annees: [3, 4], texte: "Distance entre deux points du plan cartésien.", couverture: "complete", micros: m("seconde", "repere_distance") },
  { code: "GAN B1b", domaine: GA, annees: [4], texte: "Coordonnées d'un point de partage selon un rapport donné (dont le point milieu).", couverture: "partielle", micros: m("seconde", "repere_milieu"), note: "Seul le milieu existe ; le point au tiers ou aux 2/5 n'a pas de micro." },
  { code: "GAN B1c", domaine: GA, annees: [3, 4], texte: "Calculer et interpréter une pente (taux de variation).", couverture: "complete", micros: [...m("3e", "affine_coeff_directeur"), ...m("seconde", "droite_pente_ordonne")] },
  { code: "GAN B2 / B3c", domaine: GA, annees: [3, 4], texte: "Position relative de deux droites selon leurs pentes (sécantes, parallèles, perpendiculaires).", couverture: "complete", micros: [...m("seconde", "droite_parallelisme"), ...m("premiere-spe", "gr_droites")] },
  { code: "GAN B3a / B4", domaine: GA, annees: [3, 4], texte: "Modéliser par une droite ; équation d'une droite à partir de la pente et d'un point ou de deux points.", couverture: "complete", micros: [...m("seconde", "droite_equation_reduite", "droite_equation_cartesienne"), ...m("stmg", "auto_fct_equation_deux_points")] },
  { code: "GAN B5", domaine: GA, annees: [4], texte: "Équation d'une droite parallèle ou perpendiculaire à une autre.", couverture: "complete", micros: m("premiere-spe", "gr_droites", "gr_equation_droite") },

  // Mathématiques discrètes (CST 5)
  { code: "GRA A1-A4", domaine: MD, annees: [5], texte: "Graphes : degré, distance, chaîne, cycle ; chaînes et cycles eulériens ou hamiltoniens ; graphes orientés, valués, colorés, arbres.", couverture: "absente", micros: [], note: "Les graphes ne sont au programme français qu'en maths expertes : rien dans le coach." },
  { code: "GRA B1-B4", domaine: MD, annees: [5], texte: "Modéliser une situation par un graphe et l'optimiser : chemin critique, chaîne la plus courte, arbre de valeur minimale, nombre chromatique.", couverture: "absente", micros: [] },
  { code: "CHS 1", domaine: MD, annees: [5], texte: "Théorie du choix social : comparer des procédures de vote (majorité, pluralité, Borda, Condorcet, assentiment, élimination).", couverture: "absente", micros: [] },

  // Mathématiques financières (CST 5, mise à jour 2016)
  { code: "FIN 1-2", domaine: MF, annees: [5], texte: "Intérêt simple et composé, période, actualisation, capitalisation ; modéliser une situation financière.", couverture: "complete", micros: [...m("stmg", "suite_mod_capital", "suite_geo_taux"), ...m("premiere", "auto_evo_valeur_finale")] },
  { code: "FIN 3-4", domaine: MF, annees: [5], texte: "Capitalisation Cn = C0(1 + i)^n et actualisation C0 = Cn(1 + i)^(−n).", couverture: "complete", micros: [...m("stmg", "suite_mod_capital", "suiteT_geo_explicite"), ...m("premiere", "expo_suite_terme_rang")] },
  { code: "FIN 5-7", domaine: MF, annees: [5], texte: "Déterminer une valeur par la résolution d'équations ; comparer des situations financières ; décider.", couverture: "partielle", micros: [...m("stmg", "logT_resoudre_exponentielle"), ...m("premiere", "expo_taux_moyen_calculer")], note: "Comparer deux placements ou deux emprunts n'a pas de micro dédiée." },
];

const SOURCE =
  "https://cdn-contenu.quebec.ca/cdn-contenu/education/pfeq/secondaire/progressions-apprentissages/PFEQ-progression-apprentissages-mathematique-secondaire.pdf";

function annee(n: Annee, equivalentFrance: Classe): ProgrammePays {
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
/** Sec 4 et 5 : séquence CST (voir l'en-tête). */
export const QUEBEC_SEC_4 = annee(4, "seconde");
export const QUEBEC_SEC_5 = annee(5, "premiere");
