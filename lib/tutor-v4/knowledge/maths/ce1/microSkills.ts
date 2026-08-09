// Micro-compétences de mathématiques pour la classe de CE1.
// Référence : programme officiel de mathématiques du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.

// lib/tutor-v4/knowledge/maths/ce1/microSkills.ts

// ⚠️ CES INTITULÉS SONT AFFICHÉS À L'ÉLÈVE dans le coach. Ils sont restés sans
// accent jusqu'au 09/08/2026 — un CE1 lisait « Resoudre un defi de fractions
// simples ».
//
// RELU LIGNE À LIGNE contre le TEXTE INTÉGRAL du programme — « Annexe 4,
// programme de mathématiques du cycle 2 » — le 09/08/2026. Une première
// relecture s'était appuyée sur une synthèse d'enseignant qui ne donnait que
// les attendus de fin d'année : elle a induit six erreurs, toutes corrigées
// ici (calcul mental, problèmes, milieu du segment — voir plus bas).
//
// PÉRIMÈTRE DU CE1 — un an avant le CE2, et ce qui suit change les questions :
//   — les nombres vont jusqu'à 1 000, les ordinaux jusqu'à cent ;
//   — les fractions ont pour dénominateur 2, 3, 4, 5, 6, 8 ou 10, et sont
//     toutes inférieures ou égales à 1. D'abord unitaires, puis non unitaires
//     (3/8) ; on les compare, on les additionne et on les soustrait à
//     dénominateur égal ;
//   — les longueurs se disent en m, cm et km. PAS de décimètre ni de
//     millimètre : ils arrivent au CE2 ;
//   — les masses en g et kg, avec 1 kg = 1 000 g. Pas de tonne ;
//   — la monnaie va jusqu'aux centimes ET à l'écriture à virgule ;
//   — l'heure se lit en heures entières, demi-heures et quarts d'heure. Pas
//     les minutes de 5 en 5 : c'est le CE2 ;
//   — l'équerre, l'angle droit, son code et le COMPAS sont au programme, ainsi
//     que les angles aigu et obtus et le milieu d'un segment ;
//   — le calcul mental reste sous 1 000, et ses procédures sont nommées une à
//     une : ajouter 9, 19, 29 ; soustraire 9 ; multiplier par 10 un nombre
//     plus petit que 100 ; décomposer un facteur entre 11 et 19.
//
// ⛔ RETIRÉ DU CE1 le 09/08/2026, sur décision de Frédéric — on colle au BO :
//   — `contenance` (4 micros) : le CE1 ne traite que « les longueurs et les
//     masses ». Les contenances, le litre, le décilitre et le centilitre sont
//     des objectifs de CE2 ;
//   — `symetrie` (3 micros) : reconnaître un axe et compléter une figure
//     symétrique sont des objectifs de CE2.
// Ces sept micro-compétences recevaient encore les questions hors sujet du
// repli. Elles vivent au CE2, où elles ont déjà leurs banques.
//
// ⚠️ CE QUI RESTE SANS ÊTRE UN ATTENDU DE FIN D'ANNÉE, et qu'on garde :
//   — `ce1_duree_calendrier` : au CE1, le calendrier relève de « Questionner
//     le monde », pas des mathématiques — mais il se travaille en classe ;
//   — `reperage` sur quadrillage : le CE1 travaille sur des plans et des
//     itinéraires, le quadrillage n'y apparaît que sous le robot.
//
// ✅ EN REVANCHE, `division_partage` EST au programme, mais pas comme une
// opération : le partage équitable est une STRUCTURE DE PROBLÈME du CE1 —
// chercher le nombre de parts, ou la valeur d'une part.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ============================================================
  // LES NOMBRES ENTIERS — jusqu'à 1 000
  // ============================================================

  { id: "ce1_entier_denombrer", label: "Dénombrer une collection en l'organisant", notionId: "nombre_entier", prerequis: [] },
  { id: "ce1_entier_lire_ecrire", label: "Lire et écrire les nombres jusqu'à 1 000", notionId: "nombre_entier", prerequis: [] },
  { id: "ce1_entier_construire_collection", label: "Construire une collection d'un nombre donné", notionId: "nombre_entier", prerequis: ["ce1_entier_denombrer"] },
  { id: "ce1_entier_centaines", label: "Comprendre les relations entre unités, dizaines et centaines", notionId: "nombre_entier", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_entier_representations", label: "Passer d'une écriture d'un nombre à une autre", notionId: "nombre_entier", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_entier_valeur_position", label: "Connaître la valeur d'un chiffre selon sa position", notionId: "nombre_entier", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_entier_decomposer", label: "Décomposer un nombre jusqu'à 1 000", notionId: "nombre_entier", prerequis: ["ce1_entier_valeur_position"] },
  { id: "ce1_entier_comparer", label: "Comparer des nombres avec les signes =, < et >", notionId: "nombre_entier", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_entier_expressions", label: "Dire « égal à », « supérieur à », « inférieur à », « compris entre »", notionId: "nombre_entier", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_entier_encadrer", label: "Encadrer et intercaler un nombre", notionId: "nombre_entier", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_entier_ordonner", label: "Ranger des nombres dans l'ordre croissant ou décroissant", notionId: "nombre_entier", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_entier_droite", label: "Placer un nombre sur une demi-droite graduée", notionId: "nombre_entier", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_entier_defi", label: "Résoudre un défi sur les nombres", notionId: "nombre_entier", prerequis: ["ce1_entier_decomposer", "ce1_entier_droite"] },

  // Les nombres ordinaux — cinq attendus à part entière dans le programme.
  // ⚠️ Le piège de la notion : le 5ᵉ a QUATRE éléments avant lui.
  { id: "ce1_ordinal_jusqu_cent", label: "Connaître les nombres ordinaux jusqu'à cent", notionId: "nombre_entier", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_ordinal_utiliser", label: "Comprendre et utiliser les nombres ordinaux", notionId: "nombre_entier", prerequis: ["ce1_ordinal_jusqu_cent"] },
  { id: "ce1_ordinal_rang_file", label: "Repérer un rang dans une file orientée", notionId: "nombre_entier", prerequis: ["ce1_ordinal_utiliser"] },
  { id: "ce1_ordinal_rang_precedents", label: "Relier le rang d'un objet au nombre d'éléments qui le précèdent", notionId: "nombre_entier", prerequis: ["ce1_ordinal_rang_file"] },
  { id: "ce1_ordinal_suite_symboles", label: "Utiliser les ordinaux dans une suite de symboles ou de lettres", notionId: "nombre_entier", prerequis: ["ce1_ordinal_utiliser"] },

  // ============================================================
  // SUITES DE NOMBRES
  // ============================================================

  { id: "ce1_suite_continuer", label: "Continuer une suite de nombres", notionId: "suite_nombre", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_suite_pas", label: "Trouver le pas d'une suite", notionId: "suite_nombre", prerequis: ["ce1_suite_continuer"] },
  { id: "ce1_suite_10_100", label: "Compter de 10 en 10 ou de 100 en 100", notionId: "suite_nombre", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_suite_defi", label: "Résoudre un défi de suites", notionId: "suite_nombre", prerequis: ["ce1_suite_pas"] },

  // ============================================================
  // LES QUATRE OPÉRATIONS — addition et soustraction posées
  // 📅 Jalon du programme : « L'addition posée est régulièrement utilisée dès
  // le début de l'année ; un algorithme de la soustraction posée est introduit
  // en période 3 au plus tard. »
  // ============================================================

  { id: "ce1_addition_posee", label: "Poser et effectuer une addition en colonnes", notionId: "addition_soustraction", prerequis: ["ce1_entier_decomposer"] },
  { id: "ce1_soustraction_posee", label: "Poser et effectuer une soustraction en colonnes", notionId: "addition_soustraction", prerequis: ["ce1_entier_decomposer"] },
  { id: "ce1_add_sous_complement", label: "Trouver un terme manquant dans une addition ou une soustraction", notionId: "addition_soustraction", prerequis: ["ce1_addition_posee", "ce1_soustraction_posee"] },
  { id: "ce1_add_sous_estimer", label: "Estimer l'ordre de grandeur d'un résultat", notionId: "addition_soustraction", prerequis: ["ce1_entier_encadrer"] },
  { id: "ce1_add_sous_defi", label: "Résoudre un défi addition-soustraction", notionId: "addition_soustraction", prerequis: ["ce1_add_sous_complement"] },

  // ============================================================
  // LES QUATRE OPÉRATIONS — multiplication
  // ============================================================

  { id: "ce1_multiplication_sens", label: "Comprendre la multiplication comme une addition répétée", notionId: "multiplication", prerequis: ["ce1_addition_posee"] },
  { id: "ce1_multiplication_symbole", label: "Comprendre et utiliser le symbole ×", notionId: "multiplication", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_multiplication_commutativite", label: "Savoir que 3 × 5 et 5 × 3 donnent le même résultat", notionId: "multiplication", prerequis: ["ce1_multiplication_symbole"] },
  { id: "ce1_nombre_parite", label: "Reconnaître un nombre pair ou impair", notionId: "multiplication", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_table_2", label: "Connaître la table de 2", notionId: "multiplication", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_table_5", label: "Connaître la table de 5", notionId: "multiplication", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_table_10", label: "Connaître la table de 10", notionId: "multiplication", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_multiplication_calculer", label: "Calculer un produit simple", notionId: "multiplication", prerequis: ["ce1_table_2", "ce1_table_5", "ce1_table_10"] },
  { id: "ce1_multiplication_defi", label: "Résoudre un défi de multiplication", notionId: "multiplication", prerequis: ["ce1_multiplication_calculer"] },

  // ============================================================
  // PARTAGES ET GROUPEMENTS
  // ✅ La division n'est pas une opération du CE1, mais le partage équitable
  // est une structure de problème nommée par le programme : « chercher le
  // nombre de parts à partir de la quantité totale et de la quantité de chaque
  // part », et « chercher la valeur d'une part ». Avec le reste à interpréter :
  // 75 œufs vendus par boites de 6, combien de boites ?
  // ============================================================

  { id: "ce1_division_partage", label: "Partager une quantité en parts égales", notionId: "division_partage", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_division_groupement", label: "Faire des groupements égaux", notionId: "division_partage", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_division_reste", label: "Comprendre qu'il peut rester des objets", notionId: "division_partage", prerequis: ["ce1_division_partage"] },
  { id: "ce1_division_defi", label: "Résoudre un défi de partage", notionId: "division_partage", prerequis: ["ce1_division_partage", "ce1_division_groupement"] },

  // ============================================================
  // CALCUL MENTAL — neuf attendus, mémoriser puis procéder
  // ⚠️ « Ajouter ou retirer 9 ou 11 » était FAUX : le programme liste 8, 9,
  // 18, 19, 28, 29, 38 et 39 en ajout, et 9, 19, 29, 39 en retrait. Jamais 11.
  // ============================================================

  { id: "ce1_calcul_tables_addition", label: "Connaître les tables d'addition dans les deux sens", notionId: "calcul_mental", prerequis: ["ce1_addition_posee"] },
  { id: "ce1_calcul_tables_multiplication", label: "Connaître les tables de multiplication dans les deux sens", notionId: "calcul_mental", prerequis: ["ce1_multiplication_calculer"] },
  { id: "ce1_calcul_faits_multiplicatifs", label: "Connaître des faits multiplicatifs usuels", notionId: "calcul_mental", prerequis: ["ce1_calcul_tables_multiplication"] },
  { id: "ce1_calcul_doubles_moities", label: "Connaître les doubles et les moitiés usuels", notionId: "calcul_mental", prerequis: ["ce1_table_2"] },
  // Procédure du CP, réinvestie tout au long du CE1 — et l'appui direct du
  // rendu de monnaie, où l'on complète à 100 centimes.
  { id: "ce1_calcul_complements_100", label: "Trouver le complément d'un nombre à la dizaine ou à la centaine supérieure", notionId: "calcul_mental", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_calcul_dizaines_centaines", label: "Ajouter ou soustraire un nombre entier de dizaines ou de centaines", notionId: "calcul_mental", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_calcul_multiplier_10", label: "Multiplier par 10 un nombre plus petit que 100", notionId: "calcul_mental", prerequis: ["ce1_table_10"] },
  { id: "ce1_calcul_ajouter_9_19_29_39", label: "Ajouter 9, 19 ou 29 à un nombre", notionId: "calcul_mental", prerequis: ["ce1_calcul_tables_addition"] },
  { id: "ce1_calcul_soustraire_9", label: "Soustraire 9 à un nombre", notionId: "calcul_mental", prerequis: ["ce1_calcul_ajouter_9_19_29_39"] },
  { id: "ce1_calcul_soustraire_inferieur_9", label: "Soustraire un nombre plus petit que 9 à un nombre", notionId: "calcul_mental", prerequis: ["ce1_calcul_soustraire_9"] },
  { id: "ce1_calcul_moitie_nombre_pair", label: "Déterminer la moitié d'un nombre pair", notionId: "calcul_mental", prerequis: ["ce1_calcul_doubles_moities", "ce1_nombre_parite"] },
  { id: "ce1_calcul_distributivite", label: "Calculer le produit d'un nombre entre 11 et 19 par un nombre plus petit que 10", notionId: "calcul_mental", prerequis: ["ce1_calcul_tables_multiplication"] },
  { id: "ce1_calcul_defi", label: "Résoudre un défi de calcul mental", notionId: "calcul_mental", prerequis: ["ce1_calcul_complements_100", "ce1_calcul_doubles_moities"] },

  // ============================================================
  // LES FRACTIONS — sept fractions unitaires, jusqu'à 1/10
  // 📅 Jalons du programme : le travail sur les fractions commence dès la
  // PÉRIODE 2 par les fractions unitaires ; dès la PÉRIODE 4, les élèves
  // apprennent à comparer des fractions dans des cas simples.
  // ⚠️ Le piège central : 1/8 est plus PETIT que 1/6, alors que 8 > 6.
  // ============================================================

  { id: "ce1_fraction_partage", label: "Comprendre une fraction comme un partage de l'unité", notionId: "fraction", prerequis: ["ce1_division_partage"] },
  { id: "ce1_fraction_demi", label: "Reconnaître un demi", notionId: "fraction", prerequis: ["ce1_fraction_partage"] },
  { id: "ce1_fraction_quart", label: "Reconnaître un quart", notionId: "fraction", prerequis: ["ce1_fraction_partage"] },
  { id: "ce1_fraction_tiers", label: "Reconnaître un tiers", notionId: "fraction", prerequis: ["ce1_fraction_partage"] },
  { id: "ce1_fraction_unitaires", label: "Lire et écrire les fractions 1/5, 1/6, 1/8 et 1/10", notionId: "fraction", prerequis: ["ce1_fraction_quart", "ce1_fraction_tiers"] },
  { id: "ce1_fraction_vocabulaire", label: "Utiliser les mots numérateur et dénominateur", notionId: "fraction", prerequis: ["ce1_fraction_partage"] },
  { id: "ce1_fraction_representer", label: "Représenter une fraction simple", notionId: "fraction", prerequis: ["ce1_fraction_demi", "ce1_fraction_quart"] },
  { id: "ce1_fraction_inferieure_1", label: "Lire et représenter une fraction inférieure ou égale à 1", notionId: "fraction", prerequis: ["ce1_fraction_representer", "ce1_fraction_vocabulaire"] },
  { id: "ce1_fraction_comparer_meme_denominateur", label: "Comparer des fractions qui ont le même dénominateur", notionId: "fraction", prerequis: ["ce1_fraction_inferieure_1"] },
  { id: "ce1_fraction_comparer_unitaires", label: "Comparer des fractions dont le numérateur est 1", notionId: "fraction", prerequis: ["ce1_fraction_unitaires"] },
  { id: "ce1_fraction_additionner", label: "Additionner et soustraire des fractions de même dénominateur", notionId: "fraction", prerequis: ["ce1_fraction_comparer_meme_denominateur"] },
  { id: "ce1_fraction_complement_1", label: "Trouver le complément d'une fraction à 1", notionId: "fraction", prerequis: ["ce1_fraction_additionner"] },
  { id: "ce1_fraction_defi", label: "Résoudre un défi de fractions simples", notionId: "fraction", prerequis: ["ce1_fraction_representer"] },

  // ============================================================
  // RÉSOLUTION DE PROBLÈMES — six types nommés par le programme
  // ============================================================

  { id: "ce1_probleme_operation", label: "Choisir l'opération adaptée", notionId: "probleme", prerequis: ["ce1_addition_posee", "ce1_soustraction_posee"] },
  { id: "ce1_probleme_add_sous", label: "Résoudre un problème additif de type parties-tout en une étape", notionId: "probleme", prerequis: ["ce1_probleme_operation"] },
  { id: "ce1_probleme_comparaison", label: "Résoudre un problème additif de comparaison en une étape", notionId: "probleme", prerequis: ["ce1_probleme_add_sous"] },
  { id: "ce1_probleme_deux_etapes", label: "Résoudre un problème additif en deux étapes", notionId: "probleme", prerequis: ["ce1_probleme_add_sous"] },
  { id: "ce1_probleme_multiplicatif", label: "Résoudre un problème multiplicatif en une étape", notionId: "probleme", prerequis: ["ce1_multiplication_sens"] },
  { id: "ce1_probleme_mixte", label: "Résoudre un problème mixte en deux étapes", notionId: "probleme", prerequis: ["ce1_probleme_deux_etapes", "ce1_probleme_multiplicatif"] },
  // Le schéma en barre est l'outil de modélisation nommé par le programme du
  // CE1 : parties-tout, comparaison, déplacement sur un axe.
  { id: "ce1_probleme_schema", label: "Utiliser un schéma en barre pour modéliser un problème", notionId: "probleme", prerequis: ["ce1_probleme_operation"] },
  { id: "ce1_probleme_reponse", label: "Rédiger une réponse avec l'unité", notionId: "probleme", prerequis: ["ce1_probleme_add_sous"] },
  { id: "ce1_probleme_defi", label: "Résoudre un défi de problème", notionId: "probleme", prerequis: ["ce1_probleme_reponse", "ce1_probleme_multiplicatif"] },

  // ============================================================
  // LES LONGUEURS — mètre, centimètre, kilomètre
  // ============================================================

  { id: "ce1_longueur_unites", label: "Connaître le mètre, le centimètre et le kilomètre", notionId: "longueur", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_longueur_mesurer_cm_m", label: "Mesurer un segment avec une règle graduée", notionId: "longueur", prerequis: ["ce1_longueur_unites"] },
  { id: "ce1_longueur_choisir_unite", label: "Choisir l'unité la mieux adaptée à une longueur", notionId: "longueur", prerequis: ["ce1_longueur_unites"] },
  { id: "ce1_longueur_convertir_simple", label: "Utiliser les relations entre m, cm et km", notionId: "longueur", prerequis: ["ce1_entier_centaines"] },
  { id: "ce1_longueur_comparer", label: "Comparer des longueurs", notionId: "longueur", prerequis: ["ce1_entier_comparer"] },
  { id: "ce1_longueur_references", label: "Connaître quelques longueurs de référence", notionId: "longueur", prerequis: ["ce1_longueur_unites"] },
  { id: "ce1_longueur_estimer", label: "Estimer la longueur d'un objet du quotidien", notionId: "longueur", prerequis: ["ce1_longueur_references"] },
  // Le tracé d'un segment de longueur donnée est listé au CE2 côté mesures ;
  // au CE1, il vit en géométrie, avec la règle graduée comme instrument de
  // tracé. On le garde ici, c'est le même geste.
  { id: "ce1_longueur_tracer", label: "Tracer un segment de longueur donnée", notionId: "longueur", prerequis: ["ce1_longueur_mesurer_cm_m"] },
  { id: "ce1_longueur_defi", label: "Résoudre un défi de longueurs", notionId: "longueur", prerequis: ["ce1_longueur_convertir_simple"] },

  // ============================================================
  // LES MASSES — gramme et kilogramme
  // ============================================================

  { id: "ce1_masse_soupeser", label: "Trouver le plus lourd en soupesant ou avec une balance", notionId: "masse", prerequis: [] },
  { id: "ce1_masse_kg_g", label: "Connaître le gramme et le kilogramme", notionId: "masse", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_masse_relation_kg_g", label: "Savoir que 1 kg vaut 1 000 g", notionId: "masse", prerequis: ["ce1_masse_kg_g"] },
  { id: "ce1_masse_comparer", label: "Comparer des masses", notionId: "masse", prerequis: ["ce1_masse_relation_kg_g", "ce1_entier_comparer"] },
  { id: "ce1_masse_estimer", label: "Estimer la masse d'un objet du quotidien", notionId: "masse", prerequis: ["ce1_masse_kg_g"] },
  { id: "ce1_masse_probleme", label: "Résoudre un problème simple de masses", notionId: "masse", prerequis: ["ce1_probleme_add_sous"] },
  { id: "ce1_masse_defi", label: "Résoudre un défi de masses", notionId: "masse", prerequis: ["ce1_masse_relation_kg_g"] },

  // ============================================================
  // LE REPÉRAGE DANS LE TEMPS ET LES DURÉES
  // ⚠️ Au CE1 on lit l'heure entière, la demi-heure et le quart d'heure. Les
  // minutes de 5 en 5, c'est le CE2.
  // ============================================================

  { id: "ce1_duree_lire_heure_demi", label: "Lire l'heure : heures entières, demi-heures et quarts d'heure", notionId: "duree", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_duree_positionner_aiguilles", label: "Placer les aiguilles pour une heure donnée", notionId: "duree", prerequis: ["ce1_duree_lire_heure_demi"] },
  { id: "ce1_duree_matin_apres_midi", label: "Distinguer les heures du matin et celles de l'après-midi", notionId: "duree", prerequis: ["ce1_duree_lire_heure_demi"] },
  { id: "ce1_duree_unites_h_min", label: "Connaître les unités heure et minute (h et min)", notionId: "duree", prerequis: ["ce1_duree_lire_heure_demi"] },
  { id: "ce1_duree_calculer_simple", label: "Comparer et mesurer une durée écoulée", notionId: "duree", prerequis: ["ce1_duree_unites_h_min"] },
  { id: "ce1_duree_ajouter", label: "Ajouter ou soustraire des durées", notionId: "duree", prerequis: ["ce1_duree_calculer_simple"] },
  // ⛔ Au CE1, le calendrier relève de « Questionner le monde », pas des
  // mathématiques. Gardé en attendant l'arbitrage de Frédéric.
  { id: "ce1_duree_calendrier", label: "Utiliser un calendrier", notionId: "duree", prerequis: ["ce1_suite_continuer"] },
  { id: "ce1_duree_defi", label: "Résoudre un défi de durées", notionId: "duree", prerequis: ["ce1_duree_calculer_simple"] },

  // ============================================================
  // LA MONNAIE — euros ET centimes, jusqu'à l'écriture à virgule
  // 📅 Jalons du programme : « Les centimes d'euro sont introduits au plus tard
  // en période 2. L'écriture à virgule est utilisée à partir de la période 3. »
  // ⚠️ Le piège : « 4 euros et 5 centimes » écrit 4,5 € au lieu de 4,05 €.
  // ============================================================

  { id: "ce1_monnaie_euros_centimes", label: "Connaître le lien entre les euros et les centimes", notionId: "monnaie", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_monnaie_valeur_ensemble", label: "Trouver la valeur d'un ensemble de pièces et de billets", notionId: "monnaie", prerequis: ["ce1_monnaie_euros_centimes", "ce1_addition_posee"] },
  { id: "ce1_monnaie_comparer_ensembles", label: "Comparer deux ensembles de pièces et de billets", notionId: "monnaie", prerequis: ["ce1_monnaie_valeur_ensemble"] },
  { id: "ce1_monnaie_constituer", label: "Constituer une somme en euros et en centimes", notionId: "monnaie", prerequis: ["ce1_monnaie_valeur_ensemble"] },
  { id: "ce1_monnaie_rendre", label: "Simuler un achat et rendre la monnaie", notionId: "monnaie", prerequis: ["ce1_soustraction_posee"] },
  { id: "ce1_monnaie_virgule", label: "Comprendre l'écriture à virgule d'une somme d'argent", notionId: "monnaie", prerequis: ["ce1_monnaie_euros_centimes"] },
  { id: "ce1_monnaie_probleme", label: "Résoudre un problème de monnaie", notionId: "monnaie", prerequis: ["ce1_probleme_add_sous"] },
  { id: "ce1_monnaie_defi", label: "Résoudre un défi de monnaie", notionId: "monnaie", prerequis: ["ce1_monnaie_rendre"] },

  // ============================================================
  // LE REPÉRAGE DANS L'ESPACE
  // Le CE1 travaille sur des espaces RÉELS et leurs plans : la classe, l'école,
  // le quartier. Les déplacements codés vont jusqu'à quinze instructions, dont
  // quatre virages.
  // ⚠️ Le quadrillage n'apparaît au CE1 que sous le robot, sur son tapis. Les
  // quatre micro-compétences de quadrillage ci-dessous sont donc un usage de
  // classe plus qu'un objectif du programme — à trancher avec Frédéric.
  // ============================================================

  { id: "ce1_espace_positions", label: "Utiliser le vocabulaire des positions : devant, entre, à droite de…", notionId: "reperage", prerequis: [] },
  { id: "ce1_espace_situer", label: "Situer un objet par rapport à un autre", notionId: "reperage", prerequis: ["ce1_espace_positions"] },
  { id: "ce1_espace_representation", label: "Utiliser le plan d'un lieu connu pour se repérer", notionId: "reperage", prerequis: ["ce1_espace_situer"] },
  { id: "ce1_espace_assemblages", label: "Construire un assemblage de cubes et de pavés", notionId: "reperage", prerequis: ["ce1_espace_positions"] },
  { id: "ce1_reperage_cases_noeuds", label: "Lire cases et nœuds d'un quadrillage", notionId: "reperage", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_reperage_coordonnees", label: "Lire des coordonnées simples", notionId: "reperage", prerequis: ["ce1_reperage_cases_noeuds"] },
  { id: "ce1_reperage_deplacement", label: "Décrire un déplacement sur quadrillage", notionId: "reperage", prerequis: ["ce1_reperage_cases_noeuds"] },
  { id: "ce1_reperage_defi", label: "Résoudre un défi de repérage", notionId: "reperage", prerequis: ["ce1_reperage_coordonnees"] },

  // ============================================================
  // DROITES, SEGMENTS ET ALIGNEMENTS
  // ============================================================

  { id: "ce1_droite_segment_reconnaitre", label: "Reconnaître droite, segment et alignement", notionId: "droites_segments", prerequis: ["ce1_reperage_cases_noeuds"] },
  { id: "ce1_droite_alignement_regle", label: "Vérifier un alignement avec la règle", notionId: "droites_segments", prerequis: ["ce1_droite_segment_reconnaitre"] },
  { id: "ce1_droite_segment_tracer", label: "Tracer un segment ou une droite avec la règle", notionId: "droites_segments", prerequis: ["ce1_droite_segment_reconnaitre"] },
  // ✅ Bien au programme, contrairement à ce que laissait croire le tableau
  // d'attendus : « milieu d'un segment » est dans le lexique géométrique du
  // CE1, et le texte précise que l'élève le trouve PAR PLIAGE.
  { id: "ce1_droite_milieu", label: "Trouver le milieu d'un segment par pliage", notionId: "droites_segments", prerequis: ["ce1_droite_segment_tracer"] },
  { id: "ce1_droite_defi", label: "Résoudre un défi sur droites et segments", notionId: "droites_segments", prerequis: ["ce1_droite_segment_tracer"] },

  // ============================================================
  // LA GÉOMÉTRIE PLANE — l'équerre, l'angle droit, son code, le compas
  // ⚠️ Le piège : la figure PENCHÉE cesse d'en être une aux yeux des élèves.
  // ============================================================

  { id: "ce1_figure_reconnaitre", label: "Reconnaître et nommer cercle, carré, rectangle et triangle", notionId: "figures_planes", prerequis: ["ce1_droite_segment_reconnaitre"] },
  { id: "ce1_figure_triangle_rectangle", label: "Reconnaître un triangle rectangle", notionId: "figures_planes", prerequis: ["ce1_figure_reconnaitre"] },
  { id: "ce1_figure_decrire", label: "Décrire une figure avec le vocabulaire géométrique", notionId: "figures_planes", prerequis: ["ce1_figure_reconnaitre"] },
  { id: "ce1_angle_droit", label: "Vérifier un angle droit avec l'équerre", notionId: "figures_planes", prerequis: ["ce1_figure_decrire"] },
  { id: "ce1_angle_aigu_obtus", label: "Distinguer un angle droit, un angle aigu et un angle obtus", notionId: "figures_planes", prerequis: ["ce1_angle_droit"] },
  { id: "ce1_angle_droit_code", label: "Connaître et utiliser le code de l'angle droit", notionId: "figures_planes", prerequis: ["ce1_angle_droit"] },
  { id: "ce1_figure_proprietes", label: "Connaître les angles et les côtés égaux du carré et du rectangle", notionId: "figures_planes", prerequis: ["ce1_angle_droit"] },
  { id: "ce1_figure_construire", label: "Reproduire ou construire une figure simple", notionId: "figures_planes", prerequis: ["ce1_droite_segment_tracer"] },
  { id: "ce1_figure_compas", label: "Utiliser le compas pour tracer un cercle", notionId: "figures_planes", prerequis: ["ce1_figure_reconnaitre"] },
  { id: "ce1_figure_defi", label: "Résoudre un défi de figures planes", notionId: "figures_planes", prerequis: ["ce1_figure_decrire", "ce1_angle_droit"] },

  // ============================================================
  // LES SOLIDES
  // ⚠️ Le piège : compter les coins en croyant compter les arêtes.
  // ============================================================

  { id: "ce1_solide_reconnaitre", label: "Reconnaître cube, boule, cône, pyramide, cylindre et pavé", notionId: "solides", prerequis: ["ce1_figure_reconnaitre"] },
  { id: "ce1_solide_nommer", label: "Nommer un cube, une boule, un pavé, un cône ou une pyramide", notionId: "solides", prerequis: ["ce1_solide_reconnaitre"] },
  { id: "ce1_solide_faces", label: "Connaître le nombre et la forme des faces d'un cube ou d'un pavé", notionId: "solides", prerequis: ["ce1_solide_nommer"] },
  { id: "ce1_solide_sommets_aretes", label: "Identifier sommets et arêtes", notionId: "solides", prerequis: ["ce1_solide_nommer"] },
  { id: "ce1_solide_construire", label: "Construire un cube, un pavé droit ou une pyramide", notionId: "solides", prerequis: ["ce1_solide_faces", "ce1_solide_sommets_aretes"] },
  { id: "ce1_solide_defi", label: "Résoudre un défi sur les solides", notionId: "solides", prerequis: ["ce1_solide_faces", "ce1_solide_sommets_aretes"] },

  // ============================================================
  // ORGANISATION ET GESTION DE DONNÉES — deux attendus seulement
  // ⚠️ Le piège : la graduation. Trois carreaux à 5 unités valent 15, pas 3.
  // ============================================================

  { id: "ce1_donnees_lire_tableau", label: "Lire un tableau", notionId: "donnees", prerequis: ["ce1_entier_lire_ecrire"] },
  { id: "ce1_donnees_double_entree", label: "Lire un tableau à double entrée", notionId: "donnees", prerequis: ["ce1_donnees_lire_tableau"] },
  { id: "ce1_donnees_lire_graphique", label: "Lire un diagramme en barres", notionId: "donnees", prerequis: ["ce1_donnees_lire_tableau"] },
  { id: "ce1_donnees_interpreter", label: "Interpréter les données d'un tableau ou d'un diagramme", notionId: "donnees", prerequis: ["ce1_donnees_lire_graphique", "ce1_donnees_double_entree"] },
  { id: "ce1_donnees_completer_tableau", label: "Compléter un tableau", notionId: "donnees", prerequis: ["ce1_donnees_lire_tableau"] },
  { id: "ce1_donnees_produire", label: "Produire un tableau ou un diagramme en barres", notionId: "donnees", prerequis: ["ce1_donnees_completer_tableau", "ce1_donnees_lire_graphique"] },
  { id: "ce1_donnees_defi", label: "Résoudre un défi avec des données", notionId: "donnees", prerequis: ["ce1_donnees_interpreter"] },

  // ============================================================
  // INSTRUCTIONS ET DÉPLACEMENTS CODÉS
  // ============================================================

  { id: "ce1_algo_instruction", label: "Suivre un programme d'instructions", notionId: "algorithmique", prerequis: ["ce1_reperage_deplacement"] },
  { id: "ce1_algo_deplacement", label: "Écrire une suite d'instructions qui code un déplacement", notionId: "algorithmique", prerequis: ["ce1_reperage_deplacement"] },
  { id: "ce1_algo_repetition", label: "Utiliser une répétition simple", notionId: "algorithmique", prerequis: ["ce1_suite_pas"] },
  { id: "ce1_algo_defi", label: "Résoudre un défi d'algorithmique", notionId: "algorithmique", prerequis: ["ce1_algo_instruction", "ce1_algo_deplacement"] },
];
