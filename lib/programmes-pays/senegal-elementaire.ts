// Sénégal, enseignement ÉLÉMENTAIRE (CI, CP, CE1, CE2, CM1, CM2 ; le CFEE en fin de CM2).
// Source OFFICIELLE : « Curriculum de l'éducation de base, guide pédagogique,
// enseignement élémentaire », ministère de l'Éducation nationale, un volume par
// étape : étape 1 (CI-CP), étape 2 (CE1-CE2), étape 3 (CM1-CM2, nouvelle édition
// de juin 2016). PDF lus le 05/11/2026 :
//   https://lecouloirdusavoir.com/Guide%20p%C3%A9dagogique_%C3%A9tape%201.pdf
//   (idem étape 2, étape 3)
// Relevé sur les tableaux « Planification » de la partie MATHÉMATIQUES, qui
// donnent le contenu semaine par semaine pour chaque niveau : étape 1 p. 156-168,
// étape 2 p. 152-171, étape 3 p. 171-177 ; compléments étape 3 p. 184-192.
// Pour chaque étape, « niveau 1 » = la première classe, « niveau 2 » = la seconde.
// Le programme n'a pas de codes officiels. Les codes sont les nôtres, dans l'ordre
// de la planification, par domaine : AG n = activités géométriques, AN n =
// numériques, AM n = de mesure, RP n = résolution de problèmes.
// Classe française : par le CONTENU, comme pour la Côte d'Ivoire : le CI (nombres
// jusqu'à 20) et le CP (jusqu'à 100) correspondent à notre CP, puis CE1 → CE1, …,
// CM2 → CM2 (les élèves ont un an de plus qu'en France à classe égale).
// Le programme va souvent plus vite que le nôtre : nombres jusqu'à 10 000 dès le
// CE1, angles au rapporteur en CM1, volumes, division de fractions et placements
// en CM2. Les renvois visent alors une classe française plus avancée.
// Limites : la monnaie est le franc CFA (nos micros comptent en euros) ; le calcul
// mental est mêlé aux activités numériques ; les situations d'intégration
// interdisciplinaires ne sont pas des contenus et sont omises.

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ContenuPays, Couverture, ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

/** Un contenu sur une ligne : code, domaine, texte, couverture, micros, note. */
const c = (code: string, domaine: string, texte: string, couverture: Couverture, micros: RenvoiMicro[], note?: string): ContenuPays =>
  note ? { code, domaine, texte, couverture, micros, note } : { code, domaine, texte, couverture, micros };

const AG = "Activités géométriques";
const AN = "Activités numériques";
const AM = "Activités de mesure";
const RP = "Résolution de problèmes";

const SOURCE = "https://lecouloirdusavoir.com/ressources.html (guides pédagogiques du CEB, étapes 1, 2 et 3)";
const VERSION = "Curriculum de l'éducation de base, guides pédagogiques de l'élémentaire (ministère de l'Éducation nationale, édition 2016)";
const FCFA = "La monnaie est le franc CFA : nos micros comptent en euros.";

const base = (cle: string, niveau: string, equivalentFrance: Classe, contenus: ContenuPays[]): ProgrammePays => ({
  pays: "senegal", cle, niveau, equivalentFrance, source: SOURCE, version: VERSION, contenus,
});

export const SENEGAL_CI = base("ci", "CI", "cp", [
  c("AG 1", AG, "Se situer et situer des objets : droite / gauche, devant / derrière, en haut / en bas, sur / sous, près de / loin de, avant / au même niveau / après.", "complete", m("cp", "cp_reperage_vocabulaire", "cp_reperage_gauche_droite")),
  c("AG 2", AG, "Les solides familiers (cylindre, parallélépipède) : classer, dessiner, décrire, décomposer et recomposer.", "partielle", m("cp", "cp_solide_reconnaitre", "cp_solide_faces", "cp_reperage_assemblage"), "Dessiner un solide se fait à la main, sans micro."),
  c("AG 3", AG, "Les figures planes (carré, rectangle, triangle, rond) : classer selon la forme, dessiner, décrire.", "complete", m("cp", "cp_figure_reconnaitre", "cp_figure_decrire", "cp_figure_tracer")),
  c("AG 4", AG, "Les lignes ouvertes et fermées ; intérieur, extérieur, frontière ; rythmes graphiques.", "partielle", m("cp", "cp_figure_tracer", "cp_algo_suite_logique"), "Pas de micro « ligne ouverte / fermée », ni « intérieur / extérieur / frontière »."),
  c("AG 5", AG, "Le vocabulaire du déplacement : quadrillage, case, nœud, point de départ, point d'arrivée, parcours, itinéraire.", "complete", m("cp", "cp_reperage_quadrillage", "cp_reperage_deplacement", "cp_algo_deplacement")),
  c("AN 1", AN, "Les ensembles : former, représenter, sous-ensemble, appartenance, inclusion, partition, réunion ; classer selon la quantité ou la qualité (forme, couleur).", "absente", [], "Trou : pas de micro sur les ensembles."),
  c("AN 2", AN, "Comparer des ensembles : plus que, moins que, autant que.", "partielle", m("cp", "cp_entier_comparer"), "Comparaison de nombres seulement : pas de micro de correspondance terme à terme."),
  c("AN 3", AN, "Les nombres de 0 à 10 : découvrir, composer et décomposer.", "complete", m("cp", "cp_entier_denombre", "cp_entier_lire_ecrire", "cp_entier_construire_collection", "cp_entier_decomposer", "cp_calcul_complements_10")),
  c("AN 4", AN, "La dizaine et les nombres de 11 à 20 : découvrir, composer et décomposer.", "complete", m("cp", "cp_entier_dizaine_unite", "cp_entier_representations", "cp_entier_decomposer")),
  c("AN 5", AN, "Le sens de l'addition et de la soustraction.", "complete", m("cp", "cp_add_sens", "cp_sous_sens")),
  c("AN 6", AN, "Le double et la moitié d'un nombre.", "complete", m("cp", "cp_calcul_doubles", "cp_calcul_moitie")),
  c("AN 7", AN, "Effectuer des opérations sur les nombres de 0 à 20.", "complete", m("cp", "cp_add_calculer", "cp_sous_calculer", "cp_calcul_tables_addition")),
  c("AM 1", AM, "Estimer et comparer des longueurs et des distances : court / long, grand / petit, près / loin.", "complete", m("cp", "cp_longueur_lexique", "cp_longueur_comparer")),
  c("AM 2", AM, "Estimer et comparer des capacités : beaucoup / peu, plus que, moins que, autant que.", "partielle", m("ce2", "ce2_contenance_comparer"), "Chez nous au CE2, avec des unités : pas de micro sans unité, à ce niveau."),
  c("AM 3", AM, "Estimer et comparer des masses : lourd / léger, plus, moins, aussi lourd que.", "complete", m("cp", "cp_masse_lexique", "cp_masse_comparer")),
  c("AM 4", AM, "Estimer et comparer des durées : long / court, lent / rapide.", "absente", [], "Trou : pas de micro de comparaison de durées à ce niveau."),
  c("AM 5", AM, "Se repérer dans la journée (matin, midi, soir) et dans la semaine.", "complete", [...m("cp", "cp_duree_jour_semaine", "cp_duree_ordonner"), ...m("ce1", "ce1_duree_calendrier")]),
  c("RP 1", RP, "Observer une image : indices, intrus, ce qui manque, remettre dans l'ordre, lier un indice à une image, reproduire un modèle.", "absente", [], "Trou : activités de logique sur images, sans micro."),
  c("RP 2", RP, "Reconnaître et appliquer un algorithme : rythme, algorithme répétitif, récursif.", "complete", m("cp", "cp_algo_suite_logique")),
  c("RP 3", RP, "Construire et utiliser un tableau à double entrée.", "complete", m("cp", "cp_donnees_lire_tableau", "cp_donnees_completer_tableau")),
  c("RP 4", RP, "Reconnaître un problème mathématique parmi d'autres énoncés ; le dramatiser.", "partielle", m("cp", "cp_probleme_identifier"), "Dramatiser se fait en classe."),
  c("RP 5", RP, "Lire un énoncé : relever les données, distinguer les données utiles et inutiles, reconnaître la question finale et les questions intermédiaires.", "partielle", m("cp", "cp_probleme_identifier", "cp_probleme_deux_etapes", "cp_probleme_reponse"), "Pas de micro de tri des données utiles et inutiles."),
]);

export const SENEGAL_CP = base("cp", "CP", "cp", [
  c("AG 1", AG, "Les lignes ouvertes et fermées ; intérieur, extérieur, frontière ; rythmes graphiques ; lignes droites, courbes, brisées.", "partielle", m("cp", "cp_figure_alignement", "cp_figure_tracer", "cp_algo_suite_logique"), "Pas de micro « ligne ouverte / fermée / brisée »."),
  c("AG 2", AG, "Le vocabulaire du déplacement et les itinéraires : quadrillage, case, nœud, point de départ, point d'arrivée, parcours.", "complete", m("cp", "cp_reperage_quadrillage", "cp_reperage_deplacement", "cp_algo_deplacement")),
  c("AG 3", AG, "Utiliser la règle, le double décimètre, le crayon : techniques de traçage.", "complete", m("cp", "cp_figure_tracer", "cp_longueur_regle")),
  c("AG 4", AG, "Reproduire et découper des figures planes simples : carré, rectangle, triangle, rond.", "complete", m("cp", "cp_figure_reconnaitre", "cp_figure_decrire", "cp_figure_tracer")),
  c("AN 1", AN, "Les nombres de 0 à 100 : découvrir, composer et décomposer, la centaine.", "complete", m("cp", "cp_entier_denombre", "cp_entier_lire_ecrire", "cp_entier_construire_collection", "cp_entier_dizaine_unite", "cp_entier_representations", "cp_entier_decomposer", "cp_entier_comparer", "cp_entier_ordonner")),
  c("AN 2", AN, "Les nombres pairs et impairs.", "complete", m("ce1", "ce1_nombre_parite")),
  c("AN 3", AN, "L'addition et la soustraction : sens et mécanisme, addition avec retenue, soustraction avec emprunt.", "complete", [...m("cp", "cp_add_sens", "cp_sous_sens", "cp_add_calculer", "cp_sous_calculer", "cp_add_pose"), ...m("ce1", "ce1_addition_posee", "ce1_soustraction_posee")]),
  c("AN 4", AN, "Le sens de la multiplication, écritures multiplicatives.", "complete", [...m("cp", "cp_mult_sens"), ...m("ce1", "ce1_multiplication_sens")]),
  c("AN 5", AN, "Le sens de la division (partage), écritures du partage.", "complete", [...m("cp", "cp_probleme_partage"), ...m("ce1", "ce1_division_partage")]),
  c("AM 1", AM, "Les longueurs : comparer avec des instruments non conventionnels (pas, pied, empan, coudée, bâton, ficelle), puis le mètre et le double décimètre.", "complete", m("cp", "cp_longueur_comparer", "cp_longueur_mesurer_unite", "cp_longueur_regle", "cp_longueur_m_cm")),
  c("AM 2", AM, "Les capacités : comparer avec une bouteille, une tasse, puis le litre, le demi-litre, le quart de litre.", "partielle", m("ce2", "ce2_contenance_comparer", "ce2_contenance_unites"), "Chez nous au CE2 : pas de micro « unité arbitraire de capacité », ni « demi-litre, quart de litre »."),
  c("AM 3", AM, "Les masses : comparer avec une balançoire, des cailloux, puis le kilogramme, le demi-kilogramme, le quart de kilogramme.", "partielle", [...m("cp", "cp_masse_comparer"), ...m("ce1", "ce1_masse_kg_g")], "Pas de micro « demi-kilogramme, quart de kilogramme »."),
  c("AM 4", AM, "Les durées : comparer avec un sablier ou en comptant.", "absente", [], "Trou : pas de micro de comparaison de durées à ce niveau."),
  c("AM 5", AM, "Se repérer dans la semaine, le mois, l'année : emploi du temps, calendrier, saisons.", "complete", m("ce1", "ce1_duree_calendrier")),
  c("AM 6", AM, "Lire l'heure : heure, minute.", "complete", [...m("cp", "cp_duree_lire_heure", "cp_duree_placer_aiguilles"), ...m("ce1", "ce1_duree_lire_heure_demi")]),
  c("AM 7", AM, "La monnaie courante : 5 F, 10 F, 25 F, 50 F, 100 F.", "partielle", m("cp", "cp_monnaie_reconnaitre", "cp_monnaie_valeur", "cp_monnaie_constituer"), FCFA),
  c("RP 1", RP, "Lire un énoncé : données utiles, inutiles, manquantes ; consignes, questions, question finale, questions intermédiaires.", "partielle", m("cp", "cp_probleme_identifier", "cp_probleme_deux_etapes", "cp_probleme_reponse"), "Pas de micro de tri des données utiles, inutiles, manquantes."),
  c("RP 2", RP, "Construire un énoncé à partir de consignes ou de questions ; compléter un énoncé incomplet.", "absente", [], "Trou : écrire ou compléter un énoncé."),
  c("RP 3", RP, "Appliquer une démarche progressive : reformuler l'énoncé, répondre aux questions dans l'ordre, écrire la solution.", "complete", m("cp", "cp_probleme_additif", "cp_probleme_soustractif", "cp_probleme_schema", "cp_probleme_deux_etapes", "cp_probleme_reponse")),
]);

export const SENEGAL_CE1 = base("ce1", "CE1", "ce1", [
  c("AG 1", AG, "Les lignes (droites, brisées, courbes) et les droites horizontales, verticales, obliques, à la règle et au double décimètre.", "complete", [...m("ce1", "ce1_droite_segment_reconnaitre", "ce1_droite_segment_tracer", "ce1_droite_alignement_regle"), ...m("cm1", "droite_reconnaitre")]),
  c("AG 2", AG, "Les droites sécantes, perpendiculaires, parallèles et l'angle droit, aux instruments.", "complete", [...m("ce1", "ce1_angle_droit"), ...m("ce2", "ce2_droite_perpendiculaire"), ...m("cm1", "droite_parallele", "droite_perpendiculaire", "droite_tracer")]),
  c("AG 3", AG, "Le carré : découverte, propriétés, diagonales, médianes, construction.", "partielle", [...m("ce1", "ce1_figure_proprietes", "ce1_figure_construire"), ...m("cm1", "figure_quadrilatere", "figure_construire")], "Pas de micro sur les diagonales ni sur les médianes (droites qui joignent les milieux des côtés opposés)."),
  c("AG 4", AG, "Le rectangle : découverte, propriétés, diagonales, médianes, construction.", "partielle", [...m("ce1", "ce1_figure_proprietes", "ce1_figure_construire"), ...m("cm1", "figure_quadrilatere", "figure_construire")], "Pas de micro sur les diagonales ni sur les médianes (droites qui joignent les milieux des côtés opposés)."),
  c("AN 1", AN, "Les nombres de 100 à 999 : unité, dizaine, centaine, notion d'ordre, écritures additives, multiplicatives, mixtes.", "complete", m("ce1", "ce1_entier_lire_ecrire", "ce1_entier_centaines", "ce1_entier_representations", "ce1_entier_valeur_position", "ce1_entier_decomposer", "ce1_entier_comparer", "ce1_entier_ordonner")),
  c("AN 2", AN, "Les nombres de 1 000 à 10 000 : tableau de numération, unité de mille, dizaine de mille, notion d'ordre, écritures additives et multiplicatives, partage.", "complete", m("ce2", "ce2_entier_lire_ecrire", "ce2_entier_milliers", "ce2_entier_decomposer", "ce2_entier_comparer"), "Chez nous au CE2."),
  c("AN 3", AN, "Caractériser un nombre : pair, impair, moitié, double, triple ; divisibilité par 2, 5 et 10.", "complete", [...m("ce1", "ce1_nombre_parite", "ce1_calcul_doubles_moities"), ...m("5e", "div_critere_2_5_10")]),
  c("AN 4", AN, "L'addition et la soustraction : sens, technique avec et sans retenue, avec et sans emprunt.", "complete", [...m("ce1", "ce1_addition_posee", "ce1_soustraction_posee", "ce1_add_sous_complement"), ...m("ce2", "ce2_addition_posee", "ce2_soustraction_posee")]),
  c("AN 5", AN, "La multiplication : sens et technique, sans et avec retenue, au plus deux chiffres au multiplicateur.", "complete", [...m("ce1", "ce1_multiplication_sens", "ce1_multiplication_calculer", "ce1_calcul_tables_multiplication"), ...m("ce2", "ce2_multiplication_posee")]),
  c("AN 6", AN, "La division : sens et technique, un chiffre au diviseur.", "complete", [...m("ce1", "ce1_division_partage", "ce1_division_groupement", "ce1_division_reste"), ...m("ce2", "ce2_division_sens", "ce2_division_reste"), ...m("cm1", "division_posee")]),
  c("AM 1", AM, "Les longueurs : le mètre, le décimètre, le centimètre, le millimètre, conversions pratiques.", "complete", [...m("ce1", "ce1_longueur_unites", "ce1_longueur_convertir_simple"), ...m("ce2", "ce2_longueur_unites", "ce2_longueur_relations")]),
  c("AM 2", AM, "Les capacités : le litre, le décilitre, le centilitre, le millilitre, conversions pratiques.", "complete", [...m("ce2", "ce2_contenance_unites", "ce2_contenance_relations"), ...m("cm1", "contenance_convertir")]),
  c("AM 3", AM, "Les masses : à la balance, le kilogramme, le gramme, 500 g, 250 g, conversions pratiques.", "complete", m("ce1", "ce1_masse_kg_g", "ce1_masse_relation_kg_g", "ce1_masse_comparer")),
  c("AM 4", AM, "Utiliser un calendrier : jour, semaine, mois, année.", "complete", m("ce1", "ce1_duree_calendrier")),
  c("AM 5", AM, "Lire l'heure : heure, minute.", "complete", m("ce1", "ce1_duree_lire_heure_demi", "ce1_duree_positionner_aiguilles", "ce1_duree_unites_h_min")),
  c("AM 6", AM, "Calculer le périmètre et le demi-périmètre du carré et du rectangle.", "complete", m("ce2", "ce2_perimetre_comprendre", "ce2_perimetre_polygone", "ce2_perimetre_rectangle"), "Chez nous au CE2. Le demi-périmètre n'a pas de micro à part."),
  c("AM 7", AM, "Effectuer des échanges : pièces de monnaie, billets de banque.", "partielle", m("ce1", "ce1_monnaie_valeur_ensemble", "ce1_monnaie_constituer", "ce1_monnaie_comparer_ensembles"), FCFA),
  c("AM 8", AM, "Calculer des prix : prix d'achat, prix de revient, frais, prix de vente.", "absente", [], "Trou : prix de revient, frais, prix de vente. " + FCFA),
  c("RP 1", RP, "Organiser les informations d'un énoncé : données numériques ou non, utiles, inutiles, manquantes, questions et consignes.", "partielle", m("ce1", "ce1_probleme_operation", "ce1_probleme_reponse"), "Pas de micro de tri des données utiles, inutiles, manquantes."),
  c("RP 2", RP, "Exploiter les données d'un tableau.", "complete", m("ce1", "ce1_donnees_lire_tableau", "ce1_donnees_double_entree", "ce1_donnees_interpreter")),
  c("RP 3", RP, "Formuler la question, la consigne, la question finale et les questions intermédiaires d'un énoncé.", "absente", [], "Trou : écrire la question d'un problème."),
  c("RP 4", RP, "Raisonner avec ou sans données numériques : démarche progressive.", "complete", m("ce1", "ce1_probleme_deux_etapes", "ce1_probleme_mixte", "ce1_probleme_schema")),
]);

export const SENEGAL_CE2 = base("ce2", "CE2", "ce2", [
  c("AG 1", AG, "Tracer des lignes et des droites aux instruments : horizontales, verticales, obliques, sécantes, parallèles, perpendiculaires.", "complete", [...m("ce2", "ce2_droite_alignement", "ce2_droite_perpendiculaire"), ...m("cm1", "droite_reconnaitre", "droite_parallele", "droite_tracer")]),
  c("AG 2", AG, "Construire des angles : droit, obtus, aigu.", "complete", [...m("ce1", "ce1_angle_aigu_obtus"), ...m("cm1", "angle_type"), ...m("6e", "angle_tracer")]),
  c("AG 3", AG, "Le carré et le rectangle : découverte, propriétés, construction.", "complete", m("ce2", "ce2_figure_proprietes", "ce2_figure_construire")),
  c("AG 4", AG, "Le triangle : découverte, propriétés, types (quelconque, rectangle, équilatéral, isocèle), hauteur.", "complete", [...m("ce2", "ce2_figure_triangle_rectangle"), ...m("cm1", "figure_triangle"), ...m("4e", "triangle_droites")]),
  c("AG 5", AG, "Le cercle : découverte et propriétés.", "complete", [...m("ce2", "ce2_figure_cercle"), ...m("cm1", "figure_cercle")]),
  c("AG 6", AG, "La symétrie : figures symétriques, axe de symétrie.", "complete", m("ce2", "ce2_symetrie_axe", "ce2_symetrie_completer", "ce2_symetrie_construire")),
  c("AG 7", AG, "Décomposer et recomposer un solide, reconnaître son patron : le cube, le pavé droit.", "complete", [...m("ce2", "ce2_solide_patron", "ce2_solide_decrire"), ...m("cm1", "solide_patron")]),
  c("AG 8", AG, "Décomposer et recomposer un solide, reconnaître son patron : le cylindre.", "partielle", m("cm2", "solide_reconnaitre", "solide_patron"), "Pas de micro dédiée au patron du cylindre."),
  c("AN 1", AN, "Les nombres de 0 à 100 000 : tableau de numération jusqu'à la centaine de mille, notion d'ordre, écritures additives et multiplicatives.", "complete", [...m("ce2", "ce2_entier_lire_ecrire", "ce2_entier_milliers", "ce2_entier_decomposer", "ce2_entier_comparer"), ...m("cm1", "entier_lire", "entier_comparer")]),
  c("AN 2", AN, "L'addition et la soustraction : sens (enlever, compléter) et technique.", "complete", m("ce2", "ce2_addition_posee", "ce2_soustraction_posee", "ce2_add_sous_complement")),
  c("AN 3", AN, "La multiplication : sens et technique, au plus deux chiffres au multiplicateur ; multiplier par 10, 100, 1 000 ; tables de 2 à 8.", "complete", m("ce2", "ce2_multiplication_sens", "ce2_multiplication_posee", "ce2_multiplication_10_100", "ce2_tables_2_3_4_5_10", "ce2_tables_6_7_8_9")),
  c("AN 4", AN, "La division : sens et technique par encadrement et multiples, plusieurs chiffres au dividende.", "complete", [...m("ce2", "ce2_division_sens", "ce2_division_lien_multiplication", "ce2_division_reste"), ...m("cm1", "division_posee")]),
  c("AN 5", AN, "Caractériser un nombre : pair, impair, moitié, double, triple ; divisibilité par 2, 5, 10, 3 et 9.", "complete", [...m("ce2", "ce2_calcul_doubles_moities"), ...m("5e", "div_critere_2_5_10", "div_critere_3_9")]),
  c("AN 6", AN, "Commutativité et associativité de l'addition et de la multiplication.", "partielle", [...m("ce1", "ce1_multiplication_commutativite"), ...m("ce2", "ce2_calcul_decomposer")], "Pas de micro sur l'associativité."),
  c("AN 7", AN, "Les nombres décimaux simples (un chiffre après la virgule).", "complete", m("cm1", "decimal_lire", "decimal_fraction", "decimal_droite")),
  c("AN 8", AN, "Les fractions simples : 1/2, 1/3, 1/4, 1/10, 1/100, 1/1 000.", "complete", [...m("ce1", "ce1_fraction_demi", "ce1_fraction_tiers", "ce1_fraction_quart"), ...m("cm1", "fraction_decimale")]),
  c("AN 9", AN, "Le calcul mental : compter de 2 en 2, de 3 en 3, de 5 en 5, de 10 en 10 ; ajouter 9, 10 ou 11 ; additions et soustractions simples.", "complete", [...m("ce1", "ce1_suite_pas"), ...m("ce2", "ce2_calcul_ajouter_9_19", "ce2_calcul_soustraire_9_19", "ce2_calcul_complements")]),
  c("AM 1", AM, "Les longueurs : le mètre, ses multiples et sous-multiples, le sens des préfixes, conversions.", "complete", m("ce2", "ce2_longueur_unites", "ce2_longueur_relations")),
  c("AM 2", AM, "Les masses : le kilogramme et ses sous-multiples, conversions.", "complete", m("ce2", "ce2_masse_unites", "ce2_masse_relations")),
  c("AM 3", AM, "Poids net, poids brut, tare.", "absente", [], "Trou : poids net, poids brut, tare."),
  c("AM 4", AM, "Les capacités : le litre, ses multiples et sous-multiples, conversions.", "complete", m("ce2", "ce2_contenance_unites", "ce2_contenance_relations")),
  c("AM 5", AM, "Lire l'heure (heure, minute, seconde) et calculer une durée (écart entre le début et la fin).", "complete", m("ce2", "ce2_duree_lire_heure", "ce2_duree_convertir", "ce2_duree_calculer")),
  c("AM 6", AM, "Calculer des prix : prix d'achat, coût de revient, frais, prix de vente, bénéfice, perte.", "absente", [], "Trou : coût de revient, bénéfice, perte. " + FCFA),
  c("AM 7", AM, "Effectuer des partages : parts égales, parts proportionnelles (l'une des parts est un multiple de l'autre).", "partielle", [...m("ce2", "ce2_division_probleme", "ce2_probleme_schema_barre"), ...m("cm1", "algebre_schema_barre")], "Pas de micro dédiée au partage en parts proportionnelles."),
  c("AM 8", AM, "Le périmètre du carré, du rectangle, du triangle ; calculer une dimension à partir du périmètre.", "partielle", [...m("ce2", "ce2_perimetre_rectangle", "ce2_perimetre_polygone"), ...m("cm1", "perimetre_triangle", "perimetre_quadrilatere")], "Retrouver une dimension à partir du périmètre n'a pas de micro."),
  c("AM 9", AM, "Les unités d'aire (m², dm², cm², conversions) et la surface du carré et du rectangle.", "complete", [...m("cm1", "aire_comprendre", "aire_unite", "aire_carre_rectangle"), ...m("cm2", "aire_convertir_unites")], "Chez nous en CM1-CM2."),
  c("RP 1", RP, "Organiser les données et les questions d'un énoncé : données utiles, inutiles, manquantes, question finale, questions intermédiaires.", "partielle", m("ce2", "ce2_probleme_choisir_operation", "ce2_probleme_deux_etapes"), "Pas de micro de tri des données utiles, inutiles, manquantes."),
  c("RP 2", RP, "Exploiter les données d'un tableau.", "complete", m("ce2", "ce2_donnees_lire_tableau", "ce2_donnees_double_entree", "ce2_donnees_interpreter")),
  c("RP 3", RP, "Raisonner avec ou sans données numériques : démarche progressive, démarche régressive.", "partielle", m("ce2", "ce2_probleme_deux_etapes", "ce2_probleme_trois_etapes", "ce2_probleme_schema_barre"), "La démarche régressive n'a pas de micro dédiée."),
  c("RP 4", RP, "Construire un énoncé à partir de données ou d'une résolution ; reconstituer un énoncé en désordre.", "absente", [], "Trou : écrire ou reconstituer un énoncé."),
  c("RP 5", RP, "Trouver l'erreur dans une résolution : stratégies de vérification.", "partielle", m("ce2", "ce2_probleme_verifier"), "On vérifie un résultat : pas de micro où l'on cherche l'erreur dans une résolution."),
]);

export const SENEGAL_CM1 = base("cm1", "CM1", "cm1", [
  c("AG 1", AG, "Identifier et représenter des droites sécantes, perpendiculaires, parallèles.", "complete", m("cm1", "droite_reconnaitre", "droite_parallele", "droite_perpendiculaire", "droite_tracer")),
  c("AG 2", AG, "Construire des angles aux instruments.", "complete", [...m("cm1", "angle_reconnaitre", "angle_type"), ...m("6e", "angle_tracer")]),
  c("AG 3", AG, "Construire le carré, le rectangle, le triangle.", "complete", m("cm1", "figure_triangle", "figure_quadrilatere", "figure_construire")),
  c("AG 4", AG, "Construire le parallélogramme.", "partielle", m("4e", "quadrilatere_parallelogramme_reconnaitre", "quadrilatere_parallelogramme_propriete"), "Chez nous en 4e, et sans construction."),
  c("AG 5", AG, "Construire le cercle.", "complete", m("cm1", "figure_cercle", "cercle_ensemble_points")),
  c("AG 6", AG, "Construire le cube et le pavé droit.", "complete", [...m("cm1", "solide_reconnaitre", "solide_sommet_arete_face", "solide_patron"), ...m("cm2", "solide_patron_construire")]),
  c("AG 7", AG, "Construire le cylindre.", "partielle", m("cm1", "solide_reconnaitre", "solide_patron"), "Pas de micro dédiée au patron du cylindre."),
  c("AG 8", AG, "La symétrie par rapport à un axe.", "complete", m("cm1", "symetrie_axe", "symetrie_completer", "symetrie_construire", "symetrie_propriete")),
  c("AG 9", AG, "Les notions élémentaires de translation.", "complete", m("4e", "sym_translation"), "Chez nous en 4e."),
  c("AN 1", AN, "Les grands nombres : classes des unités de mille et des millions.", "complete", m("cm1", "entier_lire", "entier_comparer", "entier_decomposer")),
  c("AN 2", AN, "Les caractères de divisibilité par 2, 5, 3 et 9.", "complete", [...m("cm1", "entier_multiple", "entier_diviseur"), ...m("5e", "div_critere_2_5_10", "div_critere_3_9")]),
  c("AN 3", AN, "L'addition et la soustraction : sens et technique.", "complete", m("cm1", "calcul_addition_posee", "calcul_soustraction_posee", "probleme_choisir_operation")),
  c("AN 4", AN, "La multiplication : sens et technique, plusieurs chiffres au multiplicateur.", "partielle", [...m("cm1", "multiplication_posee", "multiplication_probleme"), ...m("ce2", "ce2_multiplication_posee")], "Notre micro de CM1 s'arrête à un chiffre au multiplicateur, celle de CE2 à deux."),
  c("AN 5", AN, "La division des entiers : sens et technique, plusieurs chiffres au diviseur.", "partielle", m("cm1", "division_sens", "division_posee", "division_reste", "division_probleme"), "Nos divisions posées ont un seul chiffre au diviseur."),
  c("AN 6", AN, "Les tables de multiplication de 2 à 9.", "complete", m("cm1", "tables_melangees", "tables_trous", "table_6", "table_7", "table_8", "table_9")),
  c("AN 7", AN, "Le calcul mental : ajouter ou soustraire 9, 11, des multiples de 10 ; multiplier par 10, 100, 1 000, 11, 25, 50 ; diviser par 5, 10, 100 ; carré d'un nombre jusqu'à 10 ; moitié, tiers, quart.", "partielle", [...m("cm1", "calcul_mental", "multiplication_mental", "multiplication_puissance_dix"), ...m("cm2", "calcul_multiplier_50", "calcul_diviser_4_8")], "Multiplier par 11 ou 25 n'a pas de micro dédiée."),
  c("AN 8", AN, "Les nombres décimaux : découvrir, lire, écrire.", "complete", m("cm1", "decimal_lire", "decimal_fraction", "decimal_valeur_chiffre", "decimal_comparer", "decimal_droite")),
  c("AN 9", AN, "L'addition et la soustraction des décimaux.", "complete", m("cm1", "calcul_decimal_addition", "calcul_decimal_soustraction")),
  c("AN 10", AN, "La multiplication des décimaux.", "complete", [...m("cm1", "multiplication_decimale_posee"), ...m("6e", "decimal_multiplier")]),
  c("AN 11", AN, "La division des décimaux : diviseur ou dividende décimal.", "partielle", m("cm2", "division_decimale_posee", "division_decimale_dividende"), "La division par un décimal n'a pas de micro."),
  c("AN 12", AN, "Les fractions : ordinaires et décimales, comparer à l'unité.", "complete", m("cm1", "fraction_lire", "fraction_representer", "fraction_unite", "fraction_superieure_1", "fraction_decimale")),
  c("AN 13", AN, "Comparer deux fractions de même dénominateur ou de même numérateur.", "complete", [...m("cm1", "fraction_comparer"), ...m("ce1", "ce1_fraction_comparer_unitaires")]),
  c("AN 14", AN, "Identifier des fractions égales : simplifier, réduire au même dénominateur.", "complete", [...m("cm1", "fraction_equivalente"), ...m("5e", "fraction_simplifier")]),
  c("AN 15", AN, "Additionner et soustraire des fractions, de même dénominateur ou non.", "complete", [...m("cm1", "fraction_additionner"), ...m("5e", "fraction_additionner")]),
  c("AN 16", AN, "Prendre une fraction d'une grandeur.", "complete", m("cm2", "fraction_quantite")),
  c("AN 17", AN, "Trouver une grandeur dont on connaît une fraction.", "partielle", [...m("cm2", "fraction_quantite"), ...m("cm1", "algebre_schema_barre")], "Le problème inverse n'a pas de micro dédiée."),
  c("AM 1", AM, "Les longueurs : le mètre, ses multiples et sous-multiples, relations.", "complete", m("cm1", "longueur_convertir", "longueur_mesurer")),
  c("AM 2", AM, "Le périmètre du carré, du rectangle, du cercle ; calculer une dimension.", "partielle", [...m("cm1", "perimetre_quadrilatere", "perimetre_comprendre"), ...m("6e", "cercle_perimetre")], "Retrouver une dimension à partir du périmètre n'a pas de micro."),
  c("AM 3", AM, "Les calculs sur les intervalles.", "absente", [], "Trou : intervalles (plantations, poteaux le long d'une route)."),
  c("AM 4", AM, "Les capacités : le litre, ses multiples et sous-multiples, relations.", "complete", m("cm1", "contenance_convertir", "contenance_comparer")),
  c("AM 5", AM, "Les masses : le kilogramme, ses multiples et sous-multiples ; masse nette, masse brute, tare.", "partielle", m("cm1", "masse_convertir", "masse_comparer"), "Masse nette, masse brute et tare n'ont pas de micro."),
  c("AM 6", AM, "Effectuer des mesures d'angles.", "complete", m("6e", "angle_mesurer"), "Chez nous au rapporteur en 6e."),
  c("AM 7", AM, "Les mesures d'aire : le m², ses multiples et sous-multiples.", "complete", [...m("cm1", "aire_comprendre", "aire_unite"), ...m("cm2", "aire_unites", "aire_convertir_unites")]),
  c("AM 8", AM, "Calculer l'aire et une dimension du carré, du rectangle, du triangle.", "partielle", [...m("cm1", "aire_carre_rectangle"), ...m("cm2", "aire_triangle_rectangle"), ...m("5e", "aire_triangle")], "Retrouver une dimension à partir de l'aire n'a pas de micro."),
  c("AM 9", AM, "Calculer l'aire et une dimension du parallélogramme et du cercle.", "partielle", [...m("5e", "aire_parallelogramme"), ...m("3e", "aire_disque")], "Retrouver une dimension à partir de l'aire n'a pas de micro."),
  c("AM 10", AM, "Les mesures de volume : le m³ et ses sous-multiples.", "complete", [...m("6e", "volume_unite", "volume_compter"), ...m("5e", "volume_unite")], "Chez nous en 6e et 5e."),
  c("AM 11", AM, "Les relations entre volume, capacité et masse ; la masse volumique.", "partielle", m("6e", "volume_unite"), "La masse volumique n'a pas de micro."),
  c("AM 12", AM, "Les durées : unités, relations.", "complete", m("cm1", "duree_convertir", "duree_calculer", "duree_probleme")),
  c("AM 13", AM, "Les calculs sur les mouvements uniformes.", "complete", m("3e", "prop_vitesse_debit"), "Chez nous en 3e."),
  c("AM 14", AM, "Les calculs sur le budget familial.", "absente", [], "Trou : budget familial. " + FCFA),
  c("AM 15", AM, "Les calculs sur les prix.", "absente", [], "Trou : prix d'achat, de revient, de vente, bénéfice, perte. " + FCFA),
  c("AM 16", AM, "Résoudre des problèmes de partage en parts égales ou inégales.", "complete", m("cm1", "division_probleme", "algebre_schema_barre")),
  c("RP 1", RP, "Identifier et organiser les données, les consignes et les questions d'un énoncé.", "partielle", m("cm1", "probleme_choisir_operation", "probleme_une_etape"), "Pas de micro de tri des données."),
  c("RP 2", RP, "Formuler des questions pour compléter un énoncé ; construire un énoncé à partir de données ou d'une résolution.", "partielle", m("cm1", "probleme_rediger"), "Seule la rédaction d'une réponse a une micro : écrire un énoncé n'en a pas."),
  c("RP 3", RP, "Lire des données sur un schéma, un graphique, un tableau.", "complete", m("cm1", "tableau_lire", "tableau_interpreter", "graphique_lire", "graphique_interpreter")),
  c("RP 4", RP, "Représenter un problème, un énoncé à l'aide d'un dessin.", "complete", m("cm1", "algebre_schema_barre")),
  c("RP 5", RP, "Trouver et corriger l'erreur dans une résolution.", "partielle", m("cm1", "probleme_verifier"), "On vérifie un résultat : pas de micro où l'on cherche l'erreur dans une résolution."),
  c("RP 6", RP, "Raisonner sans données numériques : démarche progressive, démarche régressive.", "partielle", m("cm1", "probleme_plusieurs_etapes", "algebre_nombre_inconnu"), "Le raisonnement sans données numériques n'a pas de micro dédiée."),
]);

export const SENEGAL_CM2 = base("cm2", "CM2", "cm2", [
  c("AG 1", AG, "Construire le carré, le rectangle, le triangle.", "complete", m("cm2", "figure_reconnaitre", "figure_triangle", "figure_quadrilatere", "figure_construire")),
  c("AG 2", AG, "Construire le parallélogramme et le losange.", "partielle", [...m("cm2", "figure_quadrilatere", "figure_propriete"), ...m("ce2", "ce2_figure_losange"), ...m("4e", "quadrilatere_parallelogramme_propriete")], "Reconnaître et utiliser les propriétés : pas de micro de construction."),
  c("AG 3", AG, "Construire le cercle.", "complete", m("cm2", "figure_cercle", "cercle_ensemble_points")),
  c("AG 4", AG, "Construire le tangram, un hexagone, un octogone ; décomposer des polygones irréguliers aux instruments.", "partielle", m("cm2", "figure_reconnaitre", "figure_programme_construction", "aire_composer"), "Pas de micro de construction de l'hexagone ou de l'octogone."),
  c("AG 5", AG, "Construire le cube et le pavé droit.", "complete", m("cm2", "solide_reconnaitre", "solide_patron", "solide_patron_construire")),
  c("AG 6", AG, "Construire le cylindre et le prisme droit.", "partielle", [...m("cm2", "solide_reconnaitre", "solide_patron"), ...m("cm1", "solide_prisme")], "Pas de micro dédiée au patron du cylindre."),
  c("AG 7", AG, "La symétrie par rapport à un axe.", "complete", m("cm2", "symetrie_axe", "symetrie_completer", "symetrie_construire", "symetrie_propriete")),
  c("AG 8", AG, "Les notions élémentaires de translation.", "complete", m("4e", "sym_translation"), "Chez nous en 4e."),
  c("AG 9", AG, "Les procédés d'agrandissement et de réduction.", "complete", [...m("cm2", "echelle_comprendre"), ...m("4e", "agrandissement_rapport")]),
  c("AN 1", AN, "La numération décimale : les grands nombres, classes jusqu'aux milliards.", "complete", m("cm2", "entier_lire", "entier_comparer", "entier_decomposer")),
  c("AN 2", AN, "Les caractères de divisibilité par 2, 5, 3 et 9.", "complete", [...m("cm2", "entier_multiple", "entier_diviseur"), ...m("5e", "div_critere_2_5_10", "div_critere_3_9")]),
  c("AN 3", AN, "L'addition et la soustraction des grands nombres.", "complete", m("cm2", "calcul_addition_posee", "calcul_soustraction_posee", "probleme_choisir_operation")),
  c("AN 4", AN, "La multiplication : plusieurs chiffres au multiplicateur.", "complete", m("cm2", "multiplication_posee", "multiplication_probleme")),
  c("AN 5", AN, "La division : plusieurs chiffres au dividende et au diviseur.", "partielle", m("cm2", "division_sens", "division_posee", "division_reste", "division_probleme"), "Nos divisions posées ont un seul chiffre au diviseur."),
  c("AN 6", AN, "Le calcul mental sur les entiers : multiplier par 5, 10, 11, 12, 20, 25, 50, 100, 1 000 ; diviser par 5, 10, 20, 25, 30 ; carrés de 1 à 12.", "partielle", m("cm2", "calcul_mental", "multiplication_mental", "multiplication_puissance_dix", "calcul_multiplier_50"), "Multiplier par 11 ou 12 et les carrés n'ont pas de micro dédiée."),
  c("AN 7", AN, "Les nombres décimaux : lecture, écriture, changement d'unité, comparaison.", "complete", m("cm2", "decimal_lire", "decimal_fraction", "decimal_valeur_chiffre", "decimal_comparer", "decimal_ordonner", "decimal_droite")),
  c("AN 8", AN, "L'addition et la soustraction des décimaux.", "complete", m("cm2", "calcul_decimal_addition", "calcul_decimal_soustraction")),
  c("AN 9", AN, "La multiplication des décimaux.", "complete", [...m("cm2", "multiplication_decimale_posee"), ...m("6e", "decimal_multiplier")]),
  c("AN 10", AN, "La division des décimaux : quotient décimal, quotient approché, dividende entier ou décimal, diviseur décimal.", "partielle", [...m("cm2", "division_decimale_posee", "division_decimale_dividende"), ...m("6e", "decimal_diviser_par_entier")], "La division par un décimal n'a pas de micro."),
  c("AN 11", AN, "Le calcul mental sur les décimaux : multiplier par 0,5 ; 0,25 ; 0,2 ; 10 ; 100 ; 1 000 ; diviser par 0,1 ; 0,5 ; 0,25 ; 10 ; 100 ; 1 000.", "partielle", [...m("cm2", "multiplication_puissance_dix", "decimal_diviser_puissance_dix"), ...m("6e", "decimal_multiplier_par_01")], "Multiplier ou diviser par 0,5 et 0,25 n'a pas de micro."),
  c("AN 12", AN, "Consolider la notion de fraction : fractions ordinaires, décimales, nombres fractionnaires.", "complete", m("cm2", "fraction_lire", "fraction_representer", "fraction_decimale", "fraction_mixte_ecrire", "fraction_mixte_regrouper")),
  c("AN 13", AN, "Comparer des fractions : simplifier, réduire au même dénominateur, comparer.", "complete", [...m("cm2", "fraction_comparer", "fraction_equivalente"), ...m("5e", "fraction_simplifier")]),
  c("AN 14", AN, "Additionner et soustraire des fractions.", "complete", [...m("cm2", "fraction_additionner"), ...m("5e", "fraction_additionner")]),
  c("AN 15", AN, "Multiplier des fractions.", "complete", [...m("cm2", "fraction_produit_entier"), ...m("5e", "fraction_multiplier")]),
  c("AN 16", AN, "Diviser des fractions.", "complete", m("4e", "fraction_inverse", "fraction_diviser"), "Chez nous en 4e."),
  c("AN 17", AN, "Prendre une fraction d'une grandeur.", "complete", m("cm2", "fraction_quantite")),
  c("AN 18", AN, "Trouver une grandeur dont on connaît une fraction.", "partielle", m("cm2", "fraction_quantite", "algebre_schema_barre"), "Le problème inverse n'a pas de micro dédiée."),
  c("AN 19", AN, "La notion de pourcentage ; trouver une grandeur connaissant son pourcentage.", "partielle", m("cm2", "pourcentage_comprendre", "pourcentage_fraction_decimal", "pourcentage_calculer", "pourcentage_probleme"), "Retrouver le tout à partir d'un pourcentage n'a pas de micro dédiée."),
  c("AN 20", AN, "La proportionnalité : rapport de proportionnalité, règle de trois.", "complete", m("cm2", "prop_reconnaitre", "prop_coefficient", "prop_quatrieme", "prop_probleme")),
  c("AM 1", AM, "Les longueurs : le mètre, ses multiples et sous-multiples, relations.", "complete", m("cm2", "longueur_convertir", "longueur_comparer")),
  c("AM 2", AM, "Le périmètre du carré, du rectangle, du cercle ; calculer le côté, la longueur, la largeur, le diamètre, le rayon.", "partielle", [...m("cm2", "perimetre_comprendre", "perimetre_quadrilatere"), ...m("6e", "cercle_perimetre")], "Retrouver une dimension à partir du périmètre n'a pas de micro."),
  c("AM 3", AM, "Les calculs sur les intervalles.", "absente", [], "Trou : intervalles (plantations, poteaux le long d'une route)."),
  c("AM 4", AM, "Les échelles : longueur réelle, longueur sur le plan, échelle.", "complete", m("cm2", "echelle_comprendre", "echelle_distance_reelle", "echelle_distance_plan")),
  c("AM 5", AM, "Les capacités : le litre, ses multiples et sous-multiples, relations.", "complete", m("cm2", "contenance_convertir", "contenance_comparer")),
  c("AM 6", AM, "Les masses : le kilogramme, ses multiples et sous-multiples ; masse nette, masse brute, tare.", "partielle", m("cm2", "masse_convertir", "masse_comparer"), "Masse nette, masse brute et tare n'ont pas de micro."),
  c("AM 7", AM, "Effectuer des mesures d'angles.", "complete", m("cm2", "angle_mesurer")),
  c("AM 8", AM, "Les aires : le m², ses multiples et sous-multiples ; aire et dimension du carré et du rectangle.", "partielle", m("cm2", "aire_unites", "aire_convertir_unites", "aire_carre_rectangle"), "Retrouver une dimension à partir de l'aire n'a pas de micro."),
  c("AM 9", AM, "L'aire et une dimension du triangle, du parallélogramme, du cercle.", "partielle", [...m("cm2", "aire_triangle_rectangle"), ...m("5e", "aire_triangle", "aire_parallelogramme"), ...m("3e", "aire_disque")], "Retrouver une dimension à partir de l'aire n'a pas de micro."),
  c("AM 10", AM, "L'aire et la dimension du losange et du trapèze.", "absente", [], "Trou : aire du losange et du trapèze."),
  c("AM 11", AM, "Les aires diminuées ou augmentées.", "partielle", m("cm2", "aire_composer"), "Pas de micro dédiée (allée autour d'un jardin, par exemple)."),
  c("AM 12", AM, "Les volumes : le m³ et ses sous-multiples ; volume et arête du cube ; volume et dimensions du pavé droit et du cylindre.", "partielle", [...m("6e", "volume_compter"), ...m("5e", "volume_unite", "volume_pave", "volume_cylindre")], "Retrouver une dimension à partir du volume n'a pas de micro."),
  c("AM 13", AM, "Les relations entre volume, capacité et masse ; la masse volumique.", "partielle", m("6e", "volume_unite"), "La masse volumique n'a pas de micro."),
  c("AM 14", AM, "Les durées : relations entre les unités ; calculs sur les mouvements uniformes.", "complete", [...m("cm2", "duree_convertir", "duree_calculer", "duree_probleme"), ...m("3e", "prop_vitesse_debit")]),
  c("AM 15", AM, "Les calculs portant sur le débit.", "complete", m("3e", "prop_vitesse_debit"), "Chez nous en 3e."),
  c("AM 16", AM, "Les calculs sur le budget familial.", "absente", [], "Trou : budget familial. " + FCFA),
  c("AM 17", AM, "Les calculs sur les prix : prix d'achat, prix de revient, prix de vente.", "absente", [], "Trou : prix d'achat, de revient, de vente, bénéfice, perte. " + FCFA),
  c("AM 18", AM, "Le placement : calculer un intérêt, le capital placé, le taux, la durée de placement.", "absente", [], "Trou : intérêt, capital, taux, durée de placement. " + FCFA),
  c("AM 19", AM, "Résoudre des problèmes de partage en parts égales, inégales ou proportionnelles.", "partielle", m("cm2", "division_probleme", "algebre_schema_barre"), "Pas de micro dédiée au partage en parts proportionnelles."),
  c("AM 20", AM, "Calculer une moyenne.", "complete", m("5e", "stat_moyenne"), "Chez nous en 5e."),
  c("RP 1", RP, "Identifier et organiser les données, les consignes et les questions d'un énoncé.", "partielle", m("cm2", "probleme_choisir_operation", "probleme_une_etape"), "Pas de micro de tri des données."),
  c("RP 2", RP, "Formuler des consignes pour compléter un énoncé ; construire un énoncé à partir de données.", "partielle", m("cm2", "probleme_rediger"), "Seule la rédaction d'une réponse a une micro : écrire un énoncé n'en a pas."),
  c("RP 3", RP, "Lire des données sur un schéma, un graphique, un tableau.", "complete", m("cm2", "tableau_lire", "tableau_interpreter", "graphique_lire", "graphique_interpreter")),
  c("RP 4", RP, "Représenter un problème, un énoncé à l'aide d'un dessin.", "complete", m("cm2", "algebre_schema_barre")),
  c("RP 5", RP, "Trouver et corriger l'erreur dans une résolution ; construire et appliquer des outils de vérification.", "partielle", [...m("cm1", "probleme_verifier"), ...m("cm2", "calcul_ordre_grandeur")], "On vérifie un résultat : pas de micro où l'on cherche l'erreur dans une résolution."),
  c("RP 6", RP, "Raisonner sans données numériques : démarche progressive, démarche régressive.", "partielle", m("cm2", "probleme_plusieurs_etapes", "algebre_nombre_inconnu"), "Le raisonnement sans données numériques n'a pas de micro dédiée."),
  c("RP 7", RP, "Communiquer une solution.", "complete", m("cm2", "probleme_rediger")),
]);
