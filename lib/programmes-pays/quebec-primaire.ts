// Québec, primaire 1re à 6e année — « Progression des apprentissages au
// primaire, Mathématique » (PFEQ, ministère de l'Éducation du Québec,
// 6 octobre 2009, toujours en vigueur).
// Relevé le 25/10/2026 sur le PDF officiel. Comme au secondaire, les années
// sont marquées par des symboles (→ l'élève l'apprend avec l'enseignant, ★ il
// le fait seul en fin d'année) que pdftotext perd : ils ont été lus par leur
// position dans le PDF, puis vérifiés sur les pages rendues en image. Un
// contenu figure dans la Ne année s'il a → ou ★ en colonne N. Le primaire va
// par cycles de deux ans (1re-2e, 3e-4e, 5e-6e) : presque chaque contenu
// couvre les deux années d'un cycle. Il est écrit UNE fois, avec ses années.
//
// Les micros sont écrites pour toutes les classes concernées. En Ne année, on
// ne garde que celles de la classe française du même âge (1re → CP, 2e → CE1,
// 3e → CE2, 4e → CM1, 5e → CM2, 6e → 6e) ; si aucune n'est de cette classe,
// celles de la classe la plus proche (le contenu se travaille alors plus tôt
// ou plus tard chez nous).
// Les codes reprennent la structure du document : SEN = sens et écriture des
// nombres, SOP = sens des opérations, OPN = opérations sur des nombres,
// GEO = géométrie, MES = mesure, STA = statistique, PRB = probabilité.

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ContenuPays, ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

type Annee = 1 | 2 | 3 | 4 | 5 | 6;
type ContenuQuebec = ContenuPays & { annees: Annee[] };

const NB = "Nombres";
const OP = "Opérations";
const GE = "Géométrie";
const ME = "Mesure";
const ST = "Statistique";
const PR = "Probabilité";

const TOUT: Annee[] = [1, 2, 3, 4, 5, 6];
const C2C3: Annee[] = [3, 4, 5, 6];

const CONTENUS: ContenuQuebec[] = [
  // ── Sens et écriture des nombres ──────────────────────────────────────────
  // Nombres naturels : inférieurs à 1 000 (1er cycle), 100 000 (2e), 1 000 000 (3e).
  { code: "SEN A1", domaine: NB, annees: TOUT, texte: "Réciter la comptine des nombres naturels : à partir d'un nombre donné, en ordre croissant ou décroissant, par bonds.", couverture: "complete", micros: [...m("cp", "cp_suite_compter_avant", "cp_suite_compter_arriere", "cp_suite_2_5_10"), ...m("ce1", "ce1_suite_pas", "ce1_suite_10_100"), ...m("ce2", "ce2_suite_croissante_decroissante"), ...m("cm1", "suite_croissante_decroissante"), ...m("cm2", "suite_croissante_decroissante")] },
  { code: "SEN A2", domaine: NB, annees: TOUT, texte: "Dénombrer des collections réelles ou dessinées (à partir d'un nombre, en groupant, collection déjà groupée).", couverture: "complete", micros: [...m("cp", "cp_entier_denombre", "cp_entier_construire_collection"), ...m("ce1", "ce1_entier_denombrer", "ce1_entier_construire_collection")] },
  { code: "SEN A3", domaine: NB, annees: TOUT, texte: "Lire et écrire tout nombre naturel.", couverture: "complete", micros: [...m("cp", "cp_entier_lire_ecrire"), ...m("ce1", "ce1_entier_lire_ecrire"), ...m("ce2", "ce2_entier_lire_ecrire"), ...m("cm1", "entier_lire"), ...m("cm2", "entier_lire"), ...m("6e", "entier_lire_ecrire")] },
  { code: "SEN A4", domaine: NB, annees: TOUT, texte: "Représenter des nombres naturels : groupement, échange, puis valeur de position.", couverture: "complete", micros: [...m("cp", "cp_entier_dizaine_unite", "cp_entier_representations"), ...m("ce1", "ce1_entier_valeur_position", "ce1_entier_centaines"), ...m("ce2", "ce2_entier_milliers"), ...m("cm1", "entier_decomposer"), ...m("cm2", "entier_decomposer"), ...m("6e", "entier_rang")] },
  { code: "SEN A5-A6", domaine: NB, annees: TOUT, texte: "Composer et décomposer un nombre naturel ; reconnaître des expressions équivalentes (52 = 40 + 12).", couverture: "complete", micros: [...m("cp", "cp_entier_decomposer"), ...m("ce1", "ce1_entier_decomposer", "ce1_entier_expressions"), ...m("ce2", "ce2_entier_decomposer"), ...m("cm1", "entier_decomposer"), ...m("cm2", "entier_decomposer"), ...m("6e", "entier_decomposer")] },
  { code: "SEN A7-A8", domaine: NB, annees: TOUT, texte: "Comparer et ordonner des nombres naturels.", couverture: "complete", micros: [...m("cp", "cp_entier_comparer", "cp_entier_ordonner"), ...m("ce1", "ce1_entier_comparer", "ce1_entier_ordonner"), ...m("ce2", "ce2_entier_comparer"), ...m("cm1", "entier_comparer"), ...m("cm2", "entier_comparer"), ...m("6e", "entier_comparer")] },
  { code: "SEN A9 / A12", domaine: NB, annees: TOUT, texte: "Décrire des régularités numériques et classifier les nombres selon leurs propriétés (pairs, impairs, carrés, triangulaires, premiers, composés).", couverture: "partielle", micros: [...m("ce1", "ce1_nombre_parite"), ...m("cm1", "entier_multiple"), ...m("cm2", "entier_multiple"), ...m("5e", "div_multiple_diviseur")], note: "Nombres carrés et triangulaires : pas de micro au primaire." },
  { code: "SEN A10", domaine: NB, annees: TOUT, texte: "Situer des nombres naturels sur une grille, une bande ou une droite numérique.", couverture: "complete", micros: [...m("cp", "cp_entier_droite"), ...m("ce1", "ce1_entier_droite"), ...m("ce2", "ce2_entier_droite"), ...m("6e", "abscisse_placer")] },
  { code: "SEN A11a", domaine: NB, annees: [1, 2], texte: "Reconnaître un nombre pair ou impair.", couverture: "complete", micros: m("ce1", "ce1_nombre_parite") },
  { code: "SEN A11b", domaine: NB, annees: [3, 4], texte: "Reconnaître un nombre carré, premier ou composé.", couverture: "partielle", micros: [...m("4e", "premier_definition"), ...m("5e", "div_lister_diviseurs")], note: "Les nombres premiers sont en 4e chez nous ; le nombre carré n'a pas de micro." },
  { code: "SEN A13", domaine: NB, annees: TOUT, texte: "Faire une approximation d'une collection ou d'un nombre (estimer, arrondir).", couverture: "complete", micros: [...m("ce1", "ce1_entier_encadrer"), ...m("ce2", "ce2_entier_encadrer"), ...m("cm1", "entier_arrondir"), ...m("cm2", "entier_arrondir"), ...m("6e", "entier_encadrer")] },
  { code: "SEN A14", domaine: NB, annees: [5, 6], texte: "Représenter la puissance d'un nombre naturel (exposant, carré, cube).", couverture: "complete", micros: m("4e", "puissance_comprendre"), note: "Les puissances sont en 4e chez nous." },

  // Fractions (à l'aide de matériel concret ou de schémas)
  { code: "SEN B1-B2", domaine: NB, annees: TOUT, texte: "Reconnaître et représenter une fraction à partir d'un tout ou d'une collection.", couverture: "complete", micros: [...m("ce1", "ce1_fraction_partage", "ce1_fraction_demi", "ce1_fraction_quart", "ce1_fraction_representer"), ...m("ce2", "ce2_fraction_representer"), ...m("cm1", "fraction_representer"), ...m("cm2", "fraction_representer"), ...m("6e", "fraction_representer")] },
  { code: "SEN B3 / B5-B6", domaine: NB, annees: [3, 4], texte: "Associer une fraction à une partie d'un tout ; rôle du numérateur et du dénominateur ; lire et écrire une fraction.", couverture: "complete", micros: [...m("ce2", "ce2_fraction_lire", "ce2_fraction_unite"), ...m("cm1", "fraction_lire", "fraction_unite")] },
  { code: "SEN B4", domaine: NB, annees: C2C3, texte: "Reconnaître les différents sens de la fraction : partage, division, rapport.", couverture: "partielle", micros: [...m("ce2", "ce2_fraction_unite"), ...m("cm1", "fraction_unite"), ...m("cm2", "fraction_quantite"), ...m("6e", "fraction_quantite")], note: "La fraction comme quotient (3/4 = 3 ÷ 4) ou comme rapport n'a pas de micro au primaire." },
  { code: "SEN B7", domaine: NB, annees: [3, 4], texte: "Comparer une fraction à 0, à ½ ou à 1.", couverture: "complete", micros: [...m("ce2", "ce2_fraction_comparer_unite"), ...m("cm1", "fraction_superieure_1")] },
  { code: "SEN B8 / OPN B1", domaine: NB, annees: C2C3, texte: "Vérifier l'équivalence de deux fractions ; construire des fractions équivalentes.", couverture: "complete", micros: [...m("ce2", "ce2_fraction_egalite"), ...m("cm1", "fraction_equivalente"), ...m("cm2", "fraction_equivalente"), ...m("6e", "fraction_egale")] },
  { code: "SEN B9", domaine: NB, annees: [4, 5, 6], texte: "Associer un nombre décimal ou un pourcentage à une fraction.", couverture: "complete", micros: [...m("cm1", "fraction_decimale"), ...m("cm2", "fraction_decimale", "pourcentage_fraction_decimal"), ...m("6e", "fraction_decimal", "pourcentage_fraction")] },
  { code: "SEN B10-B12", domaine: NB, annees: [4, 5, 6], texte: "Ordonner des fractions : même dénominateur, dénominateur multiple de l'autre, même numérateur.", couverture: "complete", micros: [...m("cm1", "fraction_comparer"), ...m("cm2", "fraction_comparer"), ...m("6e", "fraction_comparer")] },
  { code: "SEN B13", domaine: NB, annees: [5, 6], texte: "Situer des fractions sur une droite numérique.", couverture: "complete", micros: [...m("cm2", "fraction_droite", "fraction_encadrer"), ...m("6e", "abscisse_fraction", "fraction_mixte")] },

  // Nombres décimaux (centièmes au 2e cycle, millièmes au 3e)
  { code: "SEN C1-C3", domaine: NB, annees: C2C3, texte: "Représenter, lire et écrire des nombres décimaux.", couverture: "complete", micros: [...m("ce2", "ce2_monnaie_ecriture_virgule"), ...m("cm1", "decimal_lire"), ...m("cm2", "decimal_lire"), ...m("6e", "decimal_lire_ecrire")] },
  { code: "SEN C4-C6", domaine: NB, annees: C2C3, texte: "Rôle de la virgule ; composer et décomposer un nombre décimal ; expressions équivalentes (0,5 = 0,50).", couverture: "complete", micros: [...m("cm1", "decimal_valeur_chiffre"), ...m("cm2", "decimal_valeur_chiffre"), ...m("6e", "decimal_rang")] },
  { code: "SEN C7", domaine: NB, annees: C2C3, texte: "Situer des nombres décimaux sur une droite numérique.", couverture: "complete", micros: [...m("cm1", "decimal_droite"), ...m("cm2", "decimal_droite"), ...m("6e", "abscisse_placer")] },
  { code: "SEN C8 / C10", domaine: NB, annees: C2C3, texte: "Comparer et ordonner des nombres décimaux.", couverture: "complete", micros: [...m("cm1", "decimal_comparer", "decimal_ordonner"), ...m("cm2", "decimal_comparer", "decimal_ordonner"), ...m("6e", "decimal_comparer")] },
  { code: "SEN C9", domaine: NB, annees: C2C3, texte: "Faire une approximation d'un nombre décimal (estimer, arrondir, tronquer).", couverture: "complete", micros: [...m("cm1", "decimal_arrondir"), ...m("cm2", "decimal_arrondir"), ...m("6e", "decimal_arrondir", "decimal_encadrer")] },
  { code: "SEN C11", domaine: NB, annees: C2C3, texte: "Associer une fraction (2e cycle) ou un pourcentage (3e cycle) à un nombre décimal.", couverture: "complete", micros: [...m("cm1", "decimal_fraction"), ...m("cm2", "decimal_fraction", "pourcentage_fraction_decimal"), ...m("6e", "pourcentage_decimal")] },

  // Nombres entiers (positifs et négatifs)
  { code: "SEN D1-D5", domaine: NB, annees: [4, 5, 6], texte: "Nombres entiers négatifs et positifs : représenter (thermomètre, ascenseur), lire, écrire, situer, comparer, ordonner.", couverture: "complete", micros: m("5e", "relatif_lire", "relatif_placer", "relatif_comparer"), note: "Les nombres relatifs sont en 5e chez nous." },

  // ── Sens des opérations ───────────────────────────────────────────────────
  { code: "SOP A1", domaine: OP, annees: TOUT, texte: "Reconnaître l'opération ou les opérations à effectuer dans une situation.", couverture: "complete", micros: [...m("cp", "cp_probleme_identifier"), ...m("ce1", "ce1_probleme_operation"), ...m("ce2", "ce2_probleme_choisir_operation"), ...m("cm1", "probleme_choisir_operation"), ...m("cm2", "probleme_choisir_operation")] },
  { code: "SOP A2 / B1", domaine: OP, annees: TOUT, texte: "Sens de l'addition et de la soustraction : ajout, retrait, réunion, comparaison, composition de transformations.", couverture: "complete", micros: [...m("cp", "cp_add_sens", "cp_sous_sens", "cp_probleme_additif", "cp_probleme_soustractif"), ...m("ce1", "ce1_probleme_add_sous", "ce1_probleme_comparaison"), ...m("ce2", "ce2_probleme_comparaison", "ce2_probleme_deux_etapes"), ...m("cm1", "probleme_plusieurs_etapes"), ...m("cm2", "probleme_plusieurs_etapes")] },
  { code: "SOP A3 / B2", domaine: OP, annees: TOUT, texte: "Sens de la multiplication et de la division : disposition rectangulaire, addition répétée, produit cartésien, partage, contenance, comparaison.", couverture: "complete", micros: [...m("cp", "cp_mult_sens", "cp_probleme_partage"), ...m("ce1", "ce1_multiplication_sens", "ce1_division_partage", "ce1_division_groupement"), ...m("ce2", "ce2_multiplication_sens", "ce2_division_sens", "ce2_probleme_produit_cartesien", "ce2_probleme_comparaison_multiplicative"), ...m("cm1", "division_sens", "prop_fois_plus"), ...m("cm2", "division_sens")] },
  { code: "SOP A4-A5 / B3", domaine: OP, annees: TOUT, texte: "Relation d'égalité ; équivalences numériques par la commutativité, l'associativité et la distributivité.", couverture: "complete", micros: [...m("cp", "cp_signe_egal"), ...m("ce1", "ce1_multiplication_commutativite", "ce1_calcul_distributivite"), ...m("ce2", "ce2_calcul_distributivite"), ...m("cm1", "algebre_egalite"), ...m("cm2", "algebre_egalite")] },
  { code: "SOP A6 / OPN A12", domaine: OP, annees: [5, 6], texte: "Traduire une situation par une chaîne d'opérations et l'effectuer en respectant la priorité des opérations.", couverture: "complete", micros: [...m("cm1", "calcul_priorite"), ...m("cm2", "calcul_priorite")] },
  { code: "SOP B1-B2", domaine: OP, annees: C2C3, texte: "Sens des opérations avec les nombres décimaux (situations d'addition, de soustraction, de multiplication, de division).", couverture: "complete", micros: [...m("ce2", "ce2_monnaie_additionner", "ce2_monnaie_probleme"), ...m("cm1", "calcul_decimal_addition"), ...m("cm2", "calcul_decimal_addition"), ...m("6e", "decimal_additionner", "decimal_multiplier")] },

  // ── Opérations sur des nombres ────────────────────────────────────────────
  { code: "OPN A1 / C1", domaine: OP, annees: TOUT, texte: "Faire une approximation du résultat d'une opération.", couverture: "partielle", micros: [...m("ce1", "ce1_add_sous_estimer"), ...m("ce2", "ce2_add_sous_estimer")], note: "Estimer un produit ou un quotient (cycle 3) n'a pas de micro dédiée." },
  { code: "OPN A2", domaine: OP, annees: [1, 2, 3], texte: "Répertoire mémorisé de l'addition et de la soustraction (0 + 0 à 10 + 10).", couverture: "complete", micros: [...m("cp", "cp_calcul_tables_addition", "cp_calcul_complements_10", "cp_calcul_doubles"), ...m("ce1", "ce1_calcul_tables_addition", "ce1_calcul_complements_100"), ...m("ce2", "ce2_calcul_complements")] },
  { code: "OPN A3", domaine: OP, annees: TOUT, texte: "Calcul mental : somme et différence (1er cycle), produit et quotient (2e et 3e cycles).", couverture: "complete", micros: [...m("cp", "cp_calcul_ajouter_deux_nombres"), ...m("ce1", "ce1_calcul_ajouter_9_19_29_39"), ...m("ce2", "ce2_calcul_decomposer", "ce2_calcul_multiplier_4_8"), ...m("cm1", "calcul_mental", "multiplication_mental"), ...m("cm2", "calcul_mental", "multiplication_mental"), ...m("6e", "entier_strategie_mentale", "entier_division_mentale")] },
  { code: "OPN A4", domaine: OP, annees: [1, 2, 3, 4], texte: "Calcul écrit de l'addition et de la soustraction (procédés personnels, puis conventionnels jusqu'à 4 chiffres).", couverture: "complete", micros: [...m("cp", "cp_add_pose"), ...m("ce1", "ce1_addition_posee", "ce1_soustraction_posee"), ...m("ce2", "ce2_addition_posee", "ce2_soustraction_posee"), ...m("cm1", "calcul_addition_posee", "calcul_soustraction_posee")] },
  { code: "OPN A5", domaine: OP, annees: [1, 2], texte: "Terme manquant dans une addition ou une soustraction (a + □ = c).", couverture: "complete", micros: [...m("cp", "cp_calcul_complements_10"), ...m("ce1", "ce1_add_sous_complement")] },
  { code: "OPN A6", domaine: OP, annees: C2C3, texte: "Répertoire mémorisé de la multiplication et de la division (0 × 0 à 10 × 10).", couverture: "complete", micros: [...m("ce2", "ce2_tables_2_3_4_5_10", "ce2_tables_6_7_8_9", "ce2_division_lien_multiplication"), ...m("cm1", "tables_melangees", "division_lien_multiplication"), ...m("cm2", "multiplication_table")] },
  { code: "OPN A7", domaine: OP, annees: C2C3, texte: "Calcul écrit de la multiplication (3 chiffres × 2 chiffres) et de la division (4 chiffres ÷ 2 chiffres, reste en décimal).", couverture: "complete", micros: [...m("ce2", "ce2_multiplication_posee", "ce2_division_reste"), ...m("cm1", "calcul_multiplication_posee", "division_posee"), ...m("cm2", "multiplication_posee", "division_posee"), ...m("6e", "entier_multiplication_posee", "entier_division_posee")] },
  { code: "OPN A8", domaine: OP, annees: C2C3, texte: "Terme manquant dans une multiplication ou une division (a × □ = c).", couverture: "complete", micros: [...m("cm1", "tables_trous", "algebre_completer_egalite"), ...m("cm2", "algebre_completer_egalite", "algebre_nombre_inconnu"), ...m("6e", "algebre_inconnues")] },
  { code: "OPN A9", domaine: OP, annees: [4, 5, 6], texte: "Décomposer un nombre en facteurs premiers.", couverture: "complete", micros: m("4e", "premier_decomposer"), note: "En 4e chez nous." },
  { code: "OPN A10", domaine: OP, annees: [5, 6], texte: "Calculer la puissance d'un nombre.", couverture: "complete", micros: m("4e", "puissance_calculer"), note: "En 4e chez nous." },
  { code: "OPN A11", domaine: OP, annees: [5, 6], texte: "Divisibilité par 2, 3, 4, 5, 6, 8, 9 et 10.", couverture: "partielle", micros: m("5e", "div_critere_2_5_10", "div_critere_3_9"), note: "Les critères par 4, 6 et 8 n'ont pas de micro." },
  { code: "OPN A13-A14", domaine: OP, annees: TOUT, texte: "Décrire des régularités (couleurs, formes, nombres) et des suites ; ajouter des termes à une suite.", couverture: "complete", micros: [...m("cp", "cp_algo_suite_logique", "cp_suite_completer"), ...m("ce1", "ce1_suite_continuer"), ...m("ce2", "ce2_suite_regle"), ...m("cm1", "suite_regle"), ...m("cm2", "suite_regle"), ...m("6e", "algebre_motif")] },
  { code: "OPN A15", domaine: OP, annees: TOUT, texte: "Utiliser la calculatrice (fonctions simples, × et ÷, mémoires, changement de signe).", couverture: "hors-coach", micros: [] },
  { code: "OPN B2", domaine: OP, annees: [5, 6], texte: "Réduire une fraction à sa plus simple expression (fraction irréductible).", couverture: "complete", micros: [...m("6e", "fraction_egale"), ...m("5e", "fraction_simplifier")], note: "Chez nous, on simplifie dès la 6e (« Fractions égales, simplifier ») ; la fraction irréductible est travaillée en 5e." },
  { code: "OPN B3 / SOP C1", domaine: OP, annees: [5, 6], texte: "Additionner et soustraire des fractions dont le dénominateur de l'une est un multiple de l'autre.", couverture: "complete", micros: [...m("cm2", "fraction_additionner"), ...m("6e", "fraction_additionner")] },
  { code: "OPN B4", domaine: OP, annees: [5, 6], texte: "Multiplier un nombre naturel par une fraction.", couverture: "complete", micros: [...m("cm2", "fraction_produit_entier", "fraction_quantite"), ...m("6e", "fraction_multiplier_entier", "fraction_quantite")] },
  { code: "OPN C2a / C3a", domaine: OP, annees: C2C3, texte: "Additionner et soustraire des nombres décimaux, mentalement et par écrit (jusqu'aux centièmes).", couverture: "complete", micros: [...m("ce2", "ce2_monnaie_additionner"), ...m("cm1", "calcul_decimal_addition", "calcul_decimal_soustraction"), ...m("cm2", "calcul_decimal_addition", "calcul_decimal_soustraction"), ...m("6e", "decimal_additionner")] },
  { code: "OPN C2b-c", domaine: OP, annees: [5, 6], texte: "Calcul mental : multiplier ou diviser un décimal par un naturel ; multiplier et diviser par 10, 100, 1 000.", couverture: "complete", micros: [...m("cm2", "multiplication_puissance_dix"), ...m("6e", "decimal_multiplier_par_01")] },
  { code: "OPN C3b-c", domaine: OP, annees: [5, 6], texte: "Calcul écrit : multiplier des nombres décimaux ; diviser un décimal par un naturel inférieur à 11.", couverture: "complete", micros: m("6e", "decimal_multiplier", "decimal_diviser_par_entier") },
  { code: "OPN D1-D4", domaine: OP, annees: [5, 6], texte: "Passer d'une écriture à l'autre (fraction, décimal, pourcentage) et choisir l'écriture adaptée au contexte.", couverture: "complete", micros: [...m("cm2", "pourcentage_fraction_decimal", "fraction_decimale"), ...m("6e", "pourcentage_fraction", "pourcentage_decimal", "fraction_decimal")] },

  // ── Géométrie ─────────────────────────────────────────────────────────────
  { code: "GEO A1", domaine: GE, annees: [1, 2], texte: "Se repérer et repérer des objets dans l'espace (relations spatiales).", couverture: "complete", micros: [...m("cp", "cp_reperage_vocabulaire", "cp_reperage_gauche_droite"), ...m("ce1", "ce1_espace_positions", "ce1_espace_situer")] },
  { code: "GEO A2", domaine: GE, annees: [1, 2, 3, 4], texte: "Effectuer des activités de repérage dans un plan.", couverture: "complete", micros: [...m("cp", "cp_reperage_quadrillage", "cp_reperage_deplacement"), ...m("ce1", "ce1_reperage_cases_noeuds", "ce1_reperage_deplacement"), ...m("ce2", "ce2_reperage_plan", "ce2_reperage_deplacement"), ...m("cm1", "reperage_quadrillage", "reperage_deplacement")] },
  { code: "GEO A3", domaine: GE, annees: TOUT, texte: "Effectuer des activités de repérage sur un axe (selon les nombres à l'étude).", couverture: "complete", micros: [...m("cp", "cp_entier_droite"), ...m("ce1", "ce1_entier_droite"), ...m("ce2", "ce2_entier_droite"), ...m("cm1", "decimal_droite"), ...m("cm2", "decimal_droite"), ...m("6e", "abscisse_lire")] },
  { code: "GEO A4a", domaine: GE, annees: [1, 2, 3, 4], texte: "Repérer des points dans le plan cartésien (1er quadrant), écriture d'un couple (a, b).", couverture: "complete", micros: [...m("ce1", "ce1_reperage_coordonnees"), ...m("ce2", "ce2_reperage_coordonnees"), ...m("cm1", "reperage_coordonnees", "reperage_placer_point")] },
  { code: "GEO A4b", domaine: GE, annees: [5, 6], texte: "Repérer des points dans les 4 quadrants du plan cartésien.", couverture: "complete", micros: [...m("cm2", "reperage_coordonnees"), ...m("4e", "repere_plan")], note: "Les coordonnées négatives sont en 4e chez nous." },
  { code: "GEO B1-B3", domaine: GE, annees: [1, 2], texte: "Comparer, construire et identifier les solides : boule, cône, cube, cylindre, prisme, pyramide.", couverture: "complete", micros: [...m("cp", "cp_solide_reconnaitre"), ...m("ce1", "ce1_solide_reconnaitre", "ce1_solide_nommer", "ce1_solide_construire")] },
  { code: "GEO B4", domaine: GE, annees: [1, 2], texte: "Identifier et représenter les faces d'un prisme ou d'une pyramide.", couverture: "complete", micros: [...m("cp", "cp_solide_faces"), ...m("ce1", "ce1_solide_faces")] },
  { code: "GEO B5-B6", domaine: GE, annees: [3, 4], texte: "Décrire (faces, sommets, arêtes) et classifier des prismes et des pyramides.", couverture: "complete", micros: [...m("ce2", "ce2_solide_decrire", "ce2_solide_faces_pyramide"), ...m("cm1", "solide_sommet_arete_face", "solide_face")] },
  { code: "GEO B7-B8", domaine: GE, annees: [2, 3, 4, 5, 6], texte: "Développer un prisme ou une pyramide ; associer un développement au solide (polyèdre convexe au 3e cycle).", couverture: "complete", micros: [...m("ce2", "ce2_solide_patron"), ...m("cm1", "solide_patron"), ...m("cm2", "solide_patron")] },
  { code: "GEO B9", domaine: GE, annees: [5, 6], texte: "Expérimenter la relation d'Euler sur des polyèdres convexes.", couverture: "absente", micros: [], note: "F + S − A = 2 : rien chez nous." },
  { code: "GEO C1-C3", domaine: GE, annees: [1, 2], texte: "Lignes courbes et brisées fermées ; identifier et décrire carré, rectangle, triangle, losange, cercle.", couverture: "complete", micros: [...m("cp", "cp_figure_reconnaitre", "cp_figure_decrire"), ...m("ce1", "ce1_figure_reconnaitre", "ce1_figure_decrire")] },
  { code: "GEO C4", domaine: GE, annees: [3, 4], texte: "Décrire des polygones convexes et non convexes.", couverture: "absente", micros: [], note: "La convexité n'est pas travaillée dans le coach." },
  { code: "GEO C5", domaine: GE, annees: [3, 4], texte: "Identifier et construire des droites parallèles et perpendiculaires.", couverture: "complete", micros: [...m("ce2", "ce2_droite_perpendiculaire"), ...m("cm1", "droite_parallele", "droite_perpendiculaire", "droite_tracer")] },
  { code: "GEO C6-C7", domaine: GE, annees: [3, 4], texte: "Décrire et classifier des quadrilatères (parallélisme, perpendicularité, angles).", couverture: "complete", micros: [...m("ce2", "ce2_figure_proprietes", "ce2_figure_losange"), ...m("cm1", "figure_quadrilatere", "figure_propriete")] },
  { code: "GEO C8-C9", domaine: GE, annees: [5, 6], texte: "Décrire et classifier des triangles : scalène, rectangle, isocèle, équilatéral.", couverture: "complete", micros: [...m("cm2", "figure_triangle"), ...m("6e", "triangle_type_cote", "triangle_type_angle")] },
  { code: "GEO C10", domaine: GE, annees: [5, 6], texte: "Décrire le cercle : rayon, diamètre, circonférence, angle au centre.", couverture: "complete", micros: [...m("cm2", "figure_cercle"), ...m("6e", "cercle_vocabulaire")] },
  { code: "GEO D1", domaine: GE, annees: [1, 2], texte: "Identifier des figures isométriques (superposables).", couverture: "absente", micros: [] },
  { code: "GEO D2", domaine: GE, annees: [1, 2, 3, 4], texte: "Observer et produire des régularités à l'aide de figures géométriques.", couverture: "complete", micros: [...m("cp", "cp_algo_suite_logique"), ...m("cm1", "algebre_motif")] },
  { code: "GEO D3a", domaine: GE, annees: [3, 4], texte: "Frises et dallages à l'aide de la réflexion (symétrie axiale).", couverture: "complete", micros: [...m("ce2", "ce2_symetrie_axe", "ce2_symetrie_construire"), ...m("cm1", "symetrie_completer", "symetrie_construire")] },
  { code: "GEO D3b", domaine: GE, annees: [5, 6], texte: "Frises et dallages à l'aide de la translation.", couverture: "partielle", micros: m("4e", "sym_translation"), note: "La translation est en 4e chez nous ; frises et dallages n'ont pas de micro." },

  // ── Mesure ────────────────────────────────────────────────────────────────
  { code: "MES A1-A3", domaine: ME, annees: [1, 2], texte: "Comparer des longueurs ; construire des règles ; mesurer avec des unités non conventionnelles.", couverture: "complete", micros: [...m("cp", "cp_longueur_comparer", "cp_longueur_mesurer_unite"), ...m("ce1", "ce1_longueur_comparer")] },
  { code: "MES A4", domaine: ME, annees: TOUT, texte: "Estimer et mesurer des longueurs : m, dm, cm (1er cycle), mm (2e), km (3e).", couverture: "complete", micros: [...m("cp", "cp_longueur_regle", "cp_longueur_m_cm"), ...m("ce1", "ce1_longueur_mesurer_cm_m", "ce1_longueur_estimer"), ...m("ce2", "ce2_longueur_mesurer", "ce2_longueur_estimer"), ...m("cm1", "longueur_mesurer", "longueur_estimer"), ...m("cm2", "longueur_estimer"), ...m("6e", "aire_longueur_mesurer")] },
  { code: "MES A5", domaine: ME, annees: C2C3, texte: "Établir des relations entre les unités de longueur (du millimètre au kilomètre).", couverture: "complete", micros: [...m("ce2", "ce2_longueur_relations"), ...m("cm1", "longueur_convertir"), ...m("cm2", "longueur_convertir"), ...m("6e", "aire_longueur_convertir")] },
  { code: "MES A6", domaine: ME, annees: [3, 4], texte: "Calculer le périmètre de figures planes.", couverture: "complete", micros: [...m("ce2", "ce2_perimetre_polygone", "ce2_perimetre_rectangle"), ...m("cm1", "perimetre_polygone", "perimetre_quadrilatere")] },
  { code: "MES B1", domaine: ME, annees: C2C3, texte: "Estimer et mesurer des aires : unités non conventionnelles, puis cm², dm², m².", couverture: "complete", micros: [...m("cm1", "aire_comprendre", "aire_unite"), ...m("cm2", "aire_comprendre", "aire_carre_rectangle"), ...m("6e", "aire_compter", "aire_convertir")] },
  { code: "MES C1", domaine: ME, annees: C2C3, texte: "Estimer et mesurer des volumes : unités non conventionnelles, puis cm³, dm³, m³.", couverture: "complete", micros: [...m("6e", "volume_compter", "volume_unite"), ...m("5e", "volume_comprendre")] },
  { code: "MES D1", domaine: ME, annees: [3, 4], texte: "Comparer des angles : droit, aigu, obtus.", couverture: "complete", micros: [...m("ce2", "ce2_angle_droit"), ...m("cm1", "angle_type", "angle_comparer")] },
  { code: "MES D2", domaine: ME, annees: [5, 6], texte: "Estimer et mesurer des angles en degrés (rapporteur).", couverture: "complete", micros: [...m("cm2", "angle_mesurer"), ...m("6e", "angle_mesurer")] },
  { code: "MES E1-E2", domaine: ME, annees: [3, 4, 5], texte: "Estimer et mesurer des capacités (unités non conventionnelles, puis L et mL).", couverture: "complete", micros: [...m("ce2", "ce2_contenance_unites", "ce2_contenance_comparer"), ...m("cm1", "contenance_estimer"), ...m("cm2", "contenance_estimer")] },
  { code: "MES E3", domaine: ME, annees: [5], texte: "Relations entre les unités de capacité (1 L = 1 000 mL).", couverture: "complete", micros: [...m("ce2", "ce2_contenance_relations"), ...m("cm2", "contenance_convertir")] },
  { code: "MES F1-F2", domaine: ME, annees: C2C3, texte: "Estimer et mesurer des masses (unités non conventionnelles, puis g et kg).", couverture: "complete", micros: [...m("ce2", "ce2_masse_unites", "ce2_masse_estimer"), ...m("cm1", "masse_estimer"), ...m("cm2", "masse_estimer")] },
  { code: "MES F3", domaine: ME, annees: [5, 6], texte: "Relations entre les unités de masse (1 kg = 1 000 g).", couverture: "complete", micros: m("cm2", "masse_convertir") },
  { code: "MES G1", domaine: ME, annees: [1, 2, 3, 4], texte: "Estimer et mesurer le temps ; cycles quotidien, hebdomadaire et annuel.", couverture: "complete", micros: [...m("cp", "cp_duree_lire_heure", "cp_duree_jour_semaine"), ...m("ce1", "ce1_duree_lire_heure_demi", "ce1_duree_calendrier"), ...m("ce2", "ce2_duree_lire_heure"), ...m("cm1", "duree_lire")] },
  { code: "MES G2", domaine: ME, annees: TOUT, texte: "Établir des relations entre les unités de temps (jour, heure, minute, seconde).", couverture: "complete", micros: [...m("ce1", "ce1_duree_unites_h_min"), ...m("ce2", "ce2_duree_convertir"), ...m("cm1", "duree_convertir"), ...m("cm2", "duree_convertir"), ...m("6e", "duree_convertir")] },
  { code: "MES H1", domaine: ME, annees: TOUT, texte: "Estimer et mesurer des températures (degré Celsius).", couverture: "absente", micros: [], note: "Lire un thermomètre : aucune micro." },

  // ── Statistique ───────────────────────────────────────────────────────────
  { code: "STA 1-2", domaine: ST, annees: TOUT, texte: "Formuler des questions d'enquête ; collecter, décrire et organiser des données dans des tableaux.", couverture: "complete", micros: [...m("cp", "cp_donnees_completer_tableau"), ...m("ce1", "ce1_donnees_completer_tableau"), ...m("ce2", "ce2_donnees_completer_tableau"), ...m("cm1", "tableau_completer"), ...m("cm2", "tableau_completer"), ...m("6e", "stat_enquete_planifier", "stat_construire_tableau")] },
  { code: "STA 3", domaine: ST, annees: TOUT, texte: "Interpréter des données : tableau, diagramme à bandes, à pictogrammes, à ligne brisée (2e cycle), circulaire (3e cycle).", couverture: "complete", micros: [...m("cp", "cp_donnees_lire_tableau", "cp_donnees_barres", "cp_donnees_interpreter"), ...m("ce1", "ce1_donnees_lire_graphique"), ...m("ce2", "ce2_donnees_lire_graphique"), ...m("cm1", "graphique_lire", "graphique_interpreter"), ...m("cm2", "graphique_interpreter"), ...m("6e", "stat_donnee_lire_circulaire", "stat_donnee_interpreter")] },
  { code: "STA 4", domaine: ST, annees: [1, 2, 3, 4], texte: "Représenter des données : tableau, diagramme à bandes, à pictogrammes, à ligne brisée.", couverture: "complete", micros: [...m("cp", "cp_donnees_completer_tableau"), ...m("ce1", "ce1_donnees_produire"), ...m("ce2", "ce2_donnees_produire"), ...m("cm1", "graphique_completer")] },
  { code: "STA 5", domaine: ST, annees: [5, 6], texte: "Comprendre et calculer la moyenne arithmétique.", couverture: "complete", micros: m("5e", "stat_moyenne"), note: "La moyenne est en 5e chez nous." },

  // ── Probabilité ───────────────────────────────────────────────────────────
  { code: "PRB 1-4 / 6", domaine: PR, annees: TOUT, texte: "Expérimenter le hasard : variabilité des résultats, équiprobabilité, indépendance des tours ; distinguer prédiction et résultat obtenu.", couverture: "complete", micros: [...m("cm1", "probabilite_hasard", "probabilite_roue_de_sac"), ...m("cm2", "probabilite_hasard", "probabilite_roue_de_sac"), ...m("6e", "proba_lire"), ...m("5e", "proba_equiprobabilite")] },
  { code: "PRB 5a", domaine: PR, annees: TOUT, texte: "Prédire qualitativement un résultat : certain, possible, impossible.", couverture: "complete", micros: [...m("cm1", "probabilite_vocabulaire"), ...m("cm2", "probabilite_vocabulaire"), ...m("6e", "proba_vocabulaire")] },
  { code: "PRB 5b / 9", domaine: PR, annees: C2C3, texte: "Événements plus, également ou moins probables ; comparer qualitativement des probabilités théoriques ou fréquentielles.", couverture: "complete", micros: [...m("cm1", "probabilite_comparer"), ...m("cm2", "probabilite_comparer"), ...m("6e", "proba_comparer")] },
  { code: "PRB 7-8", domaine: PR, annees: TOUT, texte: "Dénombrer les résultats possibles (expérience simple, puis tableau ou diagramme en arbre) et les colliger.", couverture: "partielle", micros: [...m("6e", "proba_issue"), ...m("seconde", "proba_tableau_arbre")], note: "Le diagramme en arbre n'arrive qu'en seconde chez nous." },
  { code: "PRB 10-11", domaine: PR, annees: [5, 6], texte: "Une probabilité est entre 0 et 1 ; la quantifier par une fraction, un décimal ou un pourcentage.", couverture: "complete", micros: [...m("6e", "proba_estimer"), ...m("5e", "proba_calculer")] },
  { code: "PRB 12-13", domaine: PR, annees: C2C3, texte: "Simuler des expériences aléatoires ; comparer les résultats obtenus aux résultats théoriques.", couverture: "complete", micros: m("6e", "proba_frequence_calculer", "proba_frequence_comparer") },
];

const SOURCE =
  "https://cdn-contenu.quebec.ca/cdn-contenu/education/pfeq/primaire/progressions-apprentissages/PFEQ-progression-apprentissages-mathematique-primaire.pdf";

/** La classe française du même âge que chaque année du primaire québécois. */
const EQUIVALENT: Record<Annee, Classe> = { 1: "cp", 2: "ce1", 3: "ce2", 4: "cm1", 5: "cm2", 6: "6e" };

/** Rang des classes françaises, pour trouver la plus proche d'une année. */
const RANG: Partial<Record<Classe, number>> = { cp: 1, ce1: 2, ce2: 3, cm1: 4, cm2: 5, "6e": 6, "5e": 7, "4e": 8, "3e": 9, seconde: 10 };

/** Les micros de la classe du même âge ; à défaut, celles de la classe la plus proche. */
function microsDeLAnnee(micros: RenvoiMicro[], n: Annee): RenvoiMicro[] {
  if (micros.length === 0) return micros;
  const ecart = (r: RenvoiMicro) => Math.abs((RANG[r.classe] ?? 99) - n);
  const meilleur = Math.min(...micros.map(ecart));
  return micros.filter((r) => ecart(r) === meilleur);
}

function annee(n: Annee): ProgrammePays {
  const classe = EQUIVALENT[n];
  return {
    pays: "quebec",
    cle: `${n}e-annee`,
    niveau: `${n}${n === 1 ? "re" : "e"} année du primaire`,
    equivalentFrance: classe,
    source: SOURCE,
    version: "2009",
    contenus: CONTENUS.filter((c) => c.annees.includes(n)).map(({ annees: _annees, micros, ...c }) => ({
      ...c,
      micros: microsDeLAnnee(micros, n),
    })),
  };
}

export const QUEBEC_1E_ANNEE = annee(1);
export const QUEBEC_2E_ANNEE = annee(2);
export const QUEBEC_3E_ANNEE = annee(3);
export const QUEBEC_4E_ANNEE = annee(4);
export const QUEBEC_5E_ANNEE = annee(5);
export const QUEBEC_6E_ANNEE = annee(6);
