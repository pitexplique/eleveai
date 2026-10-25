// Côte d'Ivoire, PRIMAIRE (CP1, CP2, CE1, CE2, CM1, CM2 ; le CEPE en fin de CM2).
// Source OFFICIELLE : « Programmes éducatifs et guides d'exécution » du
// primaire, un fascicule par classe pour TOUTES les disciplines (partie
// « Programme MATHÉMATIQUES »), ministère de l'Éducation nationale, DPFC,
// programmes « recadrés » par l'approche par les compétences (PDF de nov. 2014,
// toujours en ligne au 25/10/2026) :
//   https://dpfc-ci.net/wp-content/uploads/dpfc_fichiers/Programmes/prg_primaires/CP1.pdf
//   (idem CP2, CE1, CE2, CM1, CM2)
// Relevé le 25/10/2026 sur le CORPS DU PROGRAMME (habiletés et contenus, leçon
// par leçon). 10 h 30 de mathématiques par semaine, 336 h par an.
// Codes : L n = n-ième leçon du programme (numérotation officielle, continue
// sur les trois compétences : nombres et opérations, géométrie, mesures).
// Classe française : par le CONTENU, pas par l'âge — le CP1 est une année de
// mise en route (repérage, tri, nombres jusqu'à 20), le CP2 correspond à notre
// CP (nombres jusqu'à 100), puis CE1 → CE1, …, CM2 → CM2 (les élèves ont un an
// de plus qu'en France à classe égale).
// Limites : la monnaie est le franc CFA (nos micros comptent en euros) ; les
// thèmes « life skills » (environnement, santé) mêlés aux contenus sont omis.

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ContenuPays, Couverture, ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

/** Un contenu sur une ligne : code, domaine, texte, couverture, micros, note. */
const c = (code: string, domaine: string, texte: string, couverture: Couverture, micros: RenvoiMicro[], note?: string): ContenuPays =>
  note ? { code, domaine, texte, couverture, micros, note } : { code, domaine, texte, couverture, micros };

const NB = "Nombres et opérations";
const GEO = "Géométrie";
const MES = "Mesures de grandeur";
const MILIEU = "Structuration du milieu";
const PRENUM = "Activités pré-numériques";

const SOURCE = "https://dpfc-ci.net/wp-content/uploads/dpfc_fichiers/Programmes/prg_primaires/ (CP1.pdf à CM2.pdf)";
const VERSION = "programmes éducatifs et guides d'exécution du primaire MENA/DPFC (PDF de 2014)";
const FCFA = "La monnaie est le franc CFA : nos micros comptent en euros.";

const base = (cle: string, niveau: string, equivalentFrance: Classe, contenus: ContenuPays[]): ProgrammePays => ({
  pays: "cote-divoire", cle, niveau, equivalentFrance, source: SOURCE, version: VERSION, contenus,
});

export const COTE_DIVOIRE_CP1 = base("cp1", "CP1", "cp", [
  c("L1", MILIEU, "Repérage dans un milieu : sur / sous, au-dessus / au-dessous, devant / derrière, gauche / droite, près de / loin de.", "complete", m("cp", "cp_reperage_vocabulaire", "cp_reperage_gauche_droite")),
  c("L2", MILIEU, "Les lignes : courbe, droite, brisée, ouverte, fermée.", "partielle", m("cp", "cp_figure_alignement", "cp_figure_tracer"), "Pas de micro « ligne ouverte / fermée / brisée »."),
  c("L3", PRENUM, "Tri et classement d'objets selon leur forme, leur taille, leur couleur.", "absente", [], "Activité pré-numérique sans micro."),
  c("L4", PRENUM, "Rangement : sériation, rangement, rythme.", "partielle", m("cp", "cp_algo_suite_logique"), "Seul le rythme (suite logique) a une micro."),
  c("L5", PRENUM, "Correspondance « un pour un » et « paquet à paquet », pour introduire la comparaison.", "partielle", m("cp", "cp_entier_comparer"), "Pas de micro de correspondance terme à terme."),
  c("L6", NB, "Les nombres de 0 à 20 : lire, écrire en chiffres et en lettres, dénombrer, construire une collection.", "complete", m("cp", "cp_entier_denombre", "cp_entier_lire_ecrire", "cp_entier_construire_collection")),
  c("L7", NB, "Rangement des nombres de 0 à 20 : comparer (>, <, =), ranger.", "complete", m("cp", "cp_entier_comparer", "cp_entier_ordonner")),
  c("L8", NB, "L'addition : situation d'addition, écriture additive, table d'addition.", "complete", m("cp", "cp_add_sens", "cp_add_calculer", "cp_calcul_tables_addition")),
]);

export const COTE_DIVOIRE_CP2 = base("cp2", "CP2", "cp", [
  c("L1", NB, "Les nombres de 0 à 20 : collections de 2, 3, 4, 5, 10 objets, écriture en chiffres et en lettres, tableau de numération.", "complete", m("cp", "cp_entier_denombre", "cp_entier_lire_ecrire", "cp_entier_construire_collection", "cp_entier_dizaine_unite")),
  c("L2", NB, "Les nombres de 21 à 100 : dizaines, écriture en chiffres et en lettres, tableau de numération.", "complete", m("cp", "cp_entier_lire_ecrire", "cp_entier_dizaine_unite", "cp_entier_decomposer", "cp_entier_representations")),
  c("L3", NB, "Les signes <, > et = : comparer et ranger les nombres de 0 à 100.", "complete", m("cp", "cp_entier_comparer", "cp_entier_ordonner")),
  c("L4", NB, "L'addition : table, technique opératoire sans retenue, fonction « ajouter n ».", "complete", m("cp", "cp_calcul_tables_addition", "cp_add_pose", "cp_add_calculer", "cp_suite_completer")),
  c("L5", NB, "La multiplication : quadrillage, somme de termes égaux ↔ produit de deux nombres.", "complete", [...m("cp", "cp_mult_sens"), ...m("ce1", "ce1_multiplication_sens")]),
  c("L6", NB, "La soustraction : reste d'une collection, complément d'une addition à trou, fonction « retrancher n ».", "complete", m("cp", "cp_sous_sens", "cp_sous_calculer", "cp_add_sous_ligne")),
  c("L7", GEO, "Les solides à faces planes et leur squelette.", "complete", m("cp", "cp_solide_reconnaitre", "cp_solide_faces")),
  c("L8", GEO, "Prise d'empreintes des faces planes des solides : figures planes, contour d'une face.", "complete", m("cp", "cp_solide_faces", "cp_figure_reconnaitre")),
  c("L9", GEO, "Tracé d'empreintes : classer les figures planes selon le nombre de côtés.", "complete", m("cp", "cp_figure_decrire", "cp_figure_tracer")),
  c("L10", MES, "La longueur : comparer, unité arbitraire, règle graduée.", "complete", m("cp", "cp_longueur_comparer", "cp_longueur_mesurer_unite", "cp_longueur_regle")),
  c("L11", MES, "La capacité : comparer des contenances, unité arbitraire.", "partielle", m("cp", "cp_masse_contenance_estimer"), "Pas de micro « mesurer avec une unité arbitraire de capacité »."),
]);

export const COTE_DIVOIRE_CE1 = base("ce1", "CE1", "ce1", [
  c("L1", NB, "Les nombres de 0 à 1 000 : écriture en chiffres et en lettres, position d'un chiffre, unités, dizaines, centaines, comparer, ranger, suites.", "complete", m("ce1", "ce1_entier_lire_ecrire", "ce1_entier_valeur_position", "ce1_entier_decomposer", "ce1_entier_comparer", "ce1_entier_ordonner", "ce1_suite_continuer")),
  c("L2", NB, "L'addition des nombres de 0 à 1 000 : technique opératoire, fonction « ajouter n ».", "complete", m("ce1", "ce1_addition_posee", "ce1_suite_pas", "ce1_probleme_add_sous")),
  c("L3", NB, "La soustraction des nombres de 0 à 1 000 : technique opératoire, fonction « retrancher n ».", "complete", m("ce1", "ce1_soustraction_posee", "ce1_add_sous_complement")),
  c("L4", NB, "La multiplication des nombres de 0 à 1 000 : technique opératoire, fonction « multiplier par n ».", "complete", [...m("ce1", "ce1_multiplication_sens", "ce1_multiplication_calculer", "ce1_calcul_tables_multiplication"), ...m("ce2", "ce2_multiplication_posee")]),
  c("L5", NB, "La division des nombres de 0 à 1 000 : situation de division, technique opératoire par approche.", "partielle", [...m("ce1", "ce1_division_partage", "ce1_division_groupement", "ce1_division_reste"), ...m("ce2", "ce2_division_lien_multiplication")], "La division posée « par approche » arrive chez nous au CM1."),
  c("L6", GEO, "Le pavé droit et le cube : reconnaître, squelette, empreintes des faces.", "complete", m("ce1", "ce1_solide_reconnaitre", "ce1_solide_faces", "ce1_solide_sommets_aretes", "ce1_solide_construire")),
  c("L7", GEO, "Les droites perpendiculaires et parallèles (reconnaître, tracer par pliage).", "complete", [...m("ce1", "ce1_angle_droit"), ...m("ce2", "ce2_droite_perpendiculaire"), ...m("cm1", "droite_parallele")]),
  c("L8", GEO, "Le rectangle et le carré : propriétés, construction par pliage, sur quadrillage, à l'équerre.", "complete", m("ce1", "ce1_figure_reconnaitre", "ce1_figure_proprietes", "ce1_figure_construire")),
  c("L9", MES, "Les longueurs : instruments, mètre, unités plus petites et plus grandes, tableau, conversions.", "complete", [...m("ce1", "ce1_longueur_unites", "ce1_longueur_convertir_simple"), ...m("ce2", "ce2_longueur_relations")]),
  c("L10", MES, "Les durées : lire l'heure sur une montre, quart d'heure et demi-heure.", "complete", m("ce1", "ce1_duree_lire_heure_demi", "ce1_duree_positionner_aiguilles")),
  c("L11", MES, "La monnaie : pièces et billets, faire des achats, échanger billets contre pièces.", "partielle", m("ce1", "ce1_monnaie_valeur_ensemble", "ce1_monnaie_constituer", "ce1_monnaie_rendre"), FCFA),
]);

export const COTE_DIVOIRE_CE2 = base("ce2", "CE2", "ce2", [
  c("L1", NB, "Les nombres de 0 à 1 000 000 : position d'un chiffre, chiffres et lettres, tableau de numération, comparer, ranger.", "complete", [...m("ce2", "ce2_entier_lire_ecrire", "ce2_entier_milliers", "ce2_entier_decomposer", "ce2_entier_comparer"), ...m("cm1", "entier_lire")]),
  c("L2", NB, "L'addition des nombres de 0 à 1 000 000.", "complete", m("ce2", "ce2_addition_posee")),
  c("L3", NB, "La soustraction des nombres de 0 à 1 000 000.", "complete", m("ce2", "ce2_soustraction_posee")),
  c("L4", NB, "La multiplication : tables de 3 à 9, produits.", "complete", m("ce2", "ce2_tables_2_3_4_5_10", "ce2_tables_6_7_8_9", "ce2_multiplication_posee")),
  c("L5", NB, "La division : situation de division, technique opératoire.", "complete", [...m("ce2", "ce2_division_sens", "ce2_division_reste"), ...m("cm1", "division_posee")]),
  c("L6", NB, "La proportionnalité : situation, tableau de proportionnalité.", "complete", m("cm1", "prop_reconnaitre", "prop_tableau")),
  c("L7", GEO, "Le rectangle et le carré : construction aux instruments, diagonales, axes de symétrie.", "complete", m("ce2", "ce2_figure_proprietes", "ce2_figure_construire", "ce2_symetrie_axe")),
  c("L8", GEO, "Le repérage sur un quadrillage : repère, placer un point, coordonnées.", "complete", [...m("ce2", "ce2_reperage_coordonnees"), ...m("cm1", "reperage_coordonnees", "reperage_placer_point")]),
  c("L9", MES, "Les longueurs : unités, tableau, conversions.", "complete", m("ce2", "ce2_longueur_unites", "ce2_longueur_relations")),
  c("L10", MES, "Les capacités : instruments, litre, unités plus petites et plus grandes, tableau, conversions.", "complete", [...m("ce2", "ce2_contenance_unites", "ce2_contenance_relations"), ...m("cm1", "contenance_convertir")]),
  c("L11", MES, "Les masses : instruments, gramme, unités, tableau, conversions.", "complete", [...m("ce2", "ce2_masse_unites", "ce2_masse_relations"), ...m("cm1", "masse_convertir")]),
  c("L12", MES, "Les durées : calendrier, unités de durée.", "complete", [...m("ce2", "ce2_duree_convertir"), ...m("ce1", "ce1_duree_calendrier")]),
]);

export const COTE_DIVOIRE_CM1 = base("cm1", "CM1", "cm1", [
  c("L1", NB, "Les nombres entiers jusqu'au milliard et au-delà : multiples d'un million, lire, écrire, comparer.", "complete", m("cm1", "entier_lire", "entier_comparer", "entier_decomposer")),
  c("L2", NB, "L'addition, avec ou sans la calculette.", "complete", m("cm1", "calcul_addition_posee")),
  c("L3", NB, "La soustraction : techniques opératoires, avec ou sans la calculette.", "complete", m("cm1", "calcul_soustraction_posee")),
  c("L4", NB, "La multiplication de nombres de 3 à 6 chiffres, avec ou sans la calculette.", "complete", m("cm1", "multiplication_posee", "calcul_multiplication_posee")),
  c("L5", NB, "La division : quotient et reste, avec ou sans la calculette.", "complete", m("cm1", "division_posee", "division_reste")),
  c("L6", NB, "Les fractions : sens, lire, écrire.", "complete", m("cm1", "fraction_lire", "fraction_representer", "fraction_unite")),
  c("L7", NB, "Les nombres décimaux : lire, écrire en lettres et en chiffres, partie entière et décimale, comparer, ranger.", "complete", m("cm1", "decimal_lire", "decimal_valeur_chiffre", "decimal_comparer", "decimal_ordonner")),
  c("L8", NB, "La proportionnalité : tableau avec un opérateur entier, budget familial.", "complete", m("cm1", "prop_reconnaitre", "prop_tableau", "prop_coefficient", "prop_probleme")),
  c("L9", NB, "Le pourcentage : quantité correspondant à un pourcentage ; intérêt, capital, remise, augmentation, solde.", "partielle", m("cm2", "pourcentage_comprendre", "pourcentage_calculer", "pourcentage_probleme"), "Intérêt et capital n'ont pas de micro."),
  c("L10", NB, "Lecture de tableaux et de graphiques.", "complete", m("cm1", "tableau_lire", "tableau_interpreter", "graphique_lire", "graphique_interpreter")),
  c("L11", GEO, "Le rectangle et le carré : construire, droites particulières (diagonales, médianes, axes).", "complete", m("cm1", "figure_quadrilatere", "figure_propriete", "figure_construire")),
  c("L12", GEO, "Le cercle : centre, rayon, diamètre, tracer.", "complete", m("cm1", "figure_cercle")),
  c("L13", GEO, "Le triangle et les triangles particuliers : reconnaître, construire.", "complete", m("cm1", "figure_triangle", "figure_construire")),
  c("L14", GEO, "Le développement du cube et du pavé droit : patrons.", "complete", m("cm1", "solide_patron", "solide_sommet_arete_face")),
  c("L15", MES, "Les masses : unités, tableau, conversions.", "complete", m("cm1", "masse_convertir")),
  c("L16", MES, "Les capacités : unités, tableau, conversions.", "complete", m("cm1", "contenance_convertir")),
  c("L17", MES, "Les durées : unités, additionner des durées, multiplier une durée par un nombre.", "complete", m("cm1", "duree_convertir", "duree_calculer", "duree_probleme")),
  c("L18", MES, "La monnaie : prix d'achat, de vente, de revient, frais, bénéfice, perte, facture.", "absente", [], "Trou : prix de revient, bénéfice et perte (problèmes commerciaux). " + FCFA),
]);

export const COTE_DIVOIRE_CM2 = base("cm2", "CM2", "cm2", [
  c("L1", NB, "Les fractions : additionner et soustraire (même dénominateur), multiplier une fraction par un entier ou par une fraction.", "complete", [...m("cm2", "fraction_additionner", "fraction_produit_entier", "fraction_equivalente"), ...m("5e", "fraction_multiplier")]),
  c("L2", NB, "Les opérations sur les décimaux : techniques opératoires des quatre opérations, calcul rapide (× et ÷ par 0,25 ; 0,5 ; 10 ; 100 ; 1 000), critères de divisibilité par 2, 3, 5, 9, 10.", "partielle", [...m("cm2", "calcul_decimal_addition", "calcul_decimal_soustraction", "multiplication_puissance_dix"), ...m("6e", "decimal_multiplier", "decimal_diviser_par_entier", "decimal_multiplier_par_01"), ...m("5e", "div_critere_2_5_10", "div_critere_3_9")], "Manquent la division par un décimal et le calcul rapide × 0,25 / ÷ 0,5."),
  c("L3", NB, "Vérification d'un résultat : procédé de vérification, estimation.", "complete", [...m("cm1", "probleme_verifier"), ...m("6e", "entier_calcul_verifier")]),
  c("L4", NB, "La proportionnalité : tableau, quatrième proportionnelle, pourcentage, vitesse moyenne (distance, durée), échelle.", "complete", [...m("cm2", "prop_tableau", "prop_coefficient", "prop_quatrieme", "pourcentage_calculer", "echelle_distance_reelle", "echelle_distance_plan"), ...m("3e", "prop_vitesse_debit")]),
  c("L5", NB, "Lecture de tableaux et de graphiques.", "complete", m("cm2", "tableau_lire", "tableau_interpreter", "graphique_lire", "graphique_interpreter")),
  c("L6", NB, "Le partage en parts inégales : graphique (segments), « de plus que », « le triple », « la moitié »…", "complete", [...m("cm2", "algebre_schema_barre"), ...m("6e", "algebre_barres")]),
  c("L7", GEO, "Le triangle : hauteurs et médianes, construction à partir de dimensions données.", "partielle", [...m("cm2", "figure_triangle", "figure_construire"), ...m("4e", "triangle_droites")], "La médiane n'a pas de micro."),
  c("L8", GEO, "La pyramide : reconnaître, construire à partir de son développement.", "complete", [...m("cm2", "solide_reconnaitre", "solide_patron"), ...m("ce2", "ce2_solide_faces_pyramide")]),
  c("L9", GEO, "Le cylindre : reconnaître, construire à partir de son développement.", "partielle", m("cm2", "solide_reconnaitre", "solide_patron"), "Pas de micro dédiée au patron du cylindre."),
  c("L10", MES, "La mesure de masse : écriture « infinie » des nombres (zéros) pour convertir, tableau.", "complete", m("cm2", "masse_convertir")),
  c("L11", MES, "La mesure de capacité : conversions, tableau.", "complete", m("cm2", "contenance_convertir")),
  c("L12", MES, "La mesure d'aire : unités plus petites et plus grandes que le m², mesures agraires (ha, a, ca), tableau, conversions.", "partielle", m("6e", "aire_convertir"), "Les mesures agraires (hectare, are, centiare) n'ont pas de micro dédiée."),
  c("L13", MES, "Le périmètre du rectangle, du carré, du triangle, du cercle (nombre π).", "complete", [...m("cm2", "perimetre_triangle", "perimetre_quadrilatere"), ...m("6e", "cercle_perimetre")]),
  c("L14", MES, "L'aire du carré, du rectangle, du triangle, du disque, d'une figure complexe.", "complete", [...m("cm2", "aire_carre_rectangle", "aire_triangle_rectangle", "aire_composer"), ...m("5e", "aire_triangle"), ...m("3e", "aire_disque")]),
  c("L15", MES, "La facture : facture d'achat, d'électricité, d'eau ou de gaz ; TVA et impôt.", "absente", [], "Trou : lire et établir une facture, TVA."),
  c("L16", MES, "La monnaie : remise, augmentation, prix réel ; capital, taux d'intérêt, intérêt ; TVA.", "partielle", [...m("cm2", "pourcentage_probleme"), ...m("4e", "prop_evolution")], "Le calcul d'intérêt n'a pas de micro. " + FCFA),
]);
