// Micro-compétences de mathématiques pour la classe de CP.
// Référence : programme officiel de mathématiques du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.

// lib/tutor-v4/knowledge/maths/cp/microSkills.ts

// ⚠️ CES INTITULÉS SONT AFFICHÉS À L'ÉLÈVE dans le coach. Ils sont restés sans
// accent jusqu'au 09/08/2026 — un enfant de six ans, qui apprend justement à
// lire cette année-là, voyait « Resoudre un defi de reperage ».
//
// RELU LIGNE À LIGNE contre le TEXTE INTÉGRAL du programme — « Annexe 4,
// programme de mathématiques du cycle 2 », colonnes « Objectifs
// d'apprentissage » ET « Exemples de réussite » du Cours préparatoire.
//
// PÉRIMÈTRE DU CP — ce qui suit décide de chaque question :
//   — les nombres vont jusqu'à CENT. Au plus tard en période 2 jusqu'à 59, en
//     période 3 jusqu'à 100. Les ordinaux vont jusqu'à « vingtième » ;
//   — l'écriture EN LETTRES n'est maitrisée que jusqu'à cinquante ;
//   — l'addition posée en colonnes n'arrive qu'en période 4 ou 5, sur deux ou
//     trois nombres à un ou deux chiffres ;
//   — la multiplication n'est pas POSÉE : on en comprend le SENS, par des
//     additions répétées et le mot « fois » ;
//   — les longueurs se disent en m et cm, avec 1 m = 100 cm. ⛔ PAS de
//     kilomètre : il arrive au CE1 ;
//   — les masses n'ont AUCUNE unité au CP. On soupèse, on compare, on range.
//     ⛔ Ni gramme ni kilogramme : ils arrivent au CE1 ;
//   — ⛔ AUCUNE contenance : le tableau du BO laisse la ligne vide au CP comme
//     au CE1. Les litres n'arrivent qu'au CE2 ;
//   — la monnaie ne connait que des euros ENTIERS, inférieurs ou égaux à 100.
//     ⛔ Pas de centimes, donc PAS DE VIRGULE : les centimes sont au CE1 ;
//   — l'heure se lit en heures ENTIÈRES, inférieures ou égales à douze.
//     ⛔ Pas de demi-heure, pas de quart d'heure, pas de minute, et aucune
//     durée à calculer : tout cela est au CE1 ;
//   — en géométrie plane on nomme le DISQUE, pas le cercle, et on décrit avec
//     « côté » et « sommet ». ⛔ Ni équerre, ni compas, ni angle droit ;
//   — les solides : cube, boule, cône, cylindre, pavé à reconnaitre ; cube,
//     pavé et boule à nommer ; on les décrit avec le mot « face » seul.
//     ⛔ Ni arête ni sommet pour les solides : ils arrivent au CE1. Et « au CP,
//     où le classement se fait sur des critères visuels, le cube n'est pas
//     considéré comme un pavé » — le BO l'écrit, on ne tend pas ce piège ;
//   — le repérage dans l'espace s'arrête à l'espace de la CLASSE : plan,
//     maquette, déplacement. ⛔ Aucune coordonnée (4 ; 2) au CP ;
//   — un déplacement codé compte au maximum dix instructions, dont deux
//     virages ;
//   — les données portent sur un caractère QUALITATIF de deux à cinq valeurs,
//     sur moins de quarante individus, et l'axe du diagramme en barres est
//     gradué DE UN EN UN.
//
// ⚠️ LES IDENTIFIANTS NE BOUGENT PAS : la progression des élèves est rangée
// dessous. Seuls les intitulés changent.
//
// ⛔ `cp_contenance_comparer` A ÉTÉ RETIRÉ. Il n'a jamais été au programme du
// CP. Les micro-compétences voisines gardent en revanche leurs identifiants
// historiques `cp_masse_contenance_*`, qui ne parlent plus que de masses.
//
// ✅ VINGT-HUIT MICRO-COMPÉTENCES AJOUTÉES, toutes tirées d'un attendu du BO
// qui n'avait rien en face dans le coach. Les plus grosses absences étaient
// les NOMBRES ORDINAUX (quatre attendus, zéro question), le SENS DE LA
// MULTIPLICATION, les PROBLÈMES EN DEUX ÉTAPES et les PROBLÈMES MULTIPLICATIFS
// — et, en calcul mental, six procédures que le BO nomme une à une.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ============================================================
  // LES NOMBRES ENTIERS — jusqu'à cent
  // ============================================================

  { id: "cp_entier_denombre", label: "Dénombrer une collection en l'organisant", notionId: "nombre_entier", prerequis: [] },
  { id: "cp_entier_lire_ecrire", label: "Lire et écrire les nombres jusqu'à 100", notionId: "nombre_entier", prerequis: [] },
  { id: "cp_entier_construire_collection", label: "Construire une collection d'un nombre donné", notionId: "nombre_entier", prerequis: ["cp_entier_denombre"] },
  { id: "cp_entier_dizaine_unite", label: "Connaître la valeur des chiffres : dizaines et unités", notionId: "nombre_entier", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_entier_representations", label: "Passer d'une écriture d'un nombre à une autre", notionId: "nombre_entier", prerequis: ["cp_entier_dizaine_unite"] },
  { id: "cp_entier_decomposer", label: "Décomposer un nombre en dizaines et unités", notionId: "nombre_entier", prerequis: ["cp_entier_dizaine_unite"] },
  { id: "cp_entier_comparer", label: "Comparer deux nombres avec les signes =, < et >", notionId: "nombre_entier", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_entier_ordonner", label: "Ranger des nombres du plus petit au plus grand", notionId: "nombre_entier", prerequis: ["cp_entier_comparer"] },
  { id: "cp_entier_droite", label: "Placer un nombre sur une demi-droite graduée", notionId: "nombre_entier", prerequis: ["cp_entier_comparer"] },
  { id: "cp_entier_ordinal", label: "Dire premier, deuxième… jusqu'à vingtième", notionId: "nombre_entier", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_entier_rang", label: "Trouver le rang d'un objet dans une file", notionId: "nombre_entier", prerequis: ["cp_entier_ordinal"] },
  { id: "cp_entier_defi", label: "Résoudre un défi sur les nombres", notionId: "nombre_entier", prerequis: ["cp_entier_decomposer", "cp_entier_droite"] },

  // ============================================================
  // LES SUITES DE NOMBRES — la comptine, en avant et à rebours
  // ============================================================

  { id: "cp_suite_compter_avant", label: "Compter en avant à partir de n'importe quel nombre", notionId: "suite_nombre", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_suite_compter_arriere", label: "Compter à rebours, de un en un", notionId: "suite_nombre", prerequis: ["cp_suite_compter_avant"] },
  { id: "cp_suite_2_5_10", label: "Compter de 2 en 2, de 5 en 5 et de 10 en 10", notionId: "suite_nombre", prerequis: ["cp_entier_dizaine_unite"] },
  { id: "cp_suite_completer", label: "Compléter les trous d'une suite de nombres", notionId: "suite_nombre", prerequis: ["cp_suite_compter_avant"] },
  { id: "cp_suite_defi", label: "Résoudre un défi de suites", notionId: "suite_nombre", prerequis: ["cp_suite_completer", "cp_suite_compter_arriere"] },

  // ============================================================
  // LES QUATRE OPÉRATIONS — additionner, soustraire, et le sens
  // de la multiplication
  // ============================================================

  { id: "cp_add_sens", label: "Comprendre le sens de l'addition", notionId: "addition_soustraction", prerequis: ["cp_entier_denombre"] },
  { id: "cp_sous_sens", label: "Comprendre le sens de la soustraction", notionId: "addition_soustraction", prerequis: ["cp_entier_denombre"] },
  { id: "cp_signe_egal", label: "Comprendre ce que veut dire le signe =", notionId: "addition_soustraction", prerequis: ["cp_add_sens"] },
  { id: "cp_add_calculer", label: "Calculer une addition", notionId: "addition_soustraction", prerequis: ["cp_add_sens"] },
  { id: "cp_sous_calculer", label: "Calculer une soustraction", notionId: "addition_soustraction", prerequis: ["cp_sous_sens"] },
  { id: "cp_add_sous_ligne", label: "Compléter une égalité à trou", notionId: "addition_soustraction", prerequis: ["cp_add_calculer", "cp_signe_egal"] },
  { id: "cp_add_pose", label: "Poser et effectuer une addition en colonnes", notionId: "addition_soustraction", prerequis: ["cp_add_calculer", "cp_entier_dizaine_unite"] },
  { id: "cp_mult_sens", label: "Comprendre le sens de la multiplication", notionId: "addition_soustraction", prerequis: ["cp_add_calculer"] },
  { id: "cp_add_sous_defi", label: "Résoudre un défi d'additions et de soustractions", notionId: "addition_soustraction", prerequis: ["cp_add_sous_ligne", "cp_sous_calculer"] },

  // ============================================================
  // LE CALCUL MENTAL — neuf résultats en trois minutes en fin
  // d'année, et six procédures que le BO nomme une à une
  // ============================================================

  { id: "cp_calcul_tables_addition", label: "Connaître les tables d'addition dans les deux sens", notionId: "calcul_mental", prerequis: ["cp_add_calculer"] },
  { id: "cp_calcul_complements_10", label: "Connaître les compléments à 10", notionId: "calcul_mental", prerequis: ["cp_add_sens"] },
  { id: "cp_calcul_doubles", label: "Connaître les doubles jusqu'à 10 et ceux des dizaines", notionId: "calcul_mental", prerequis: ["cp_add_calculer"] },
  { id: "cp_calcul_moitie", label: "Trouver la moitié d'un nombre pair", notionId: "calcul_mental", prerequis: ["cp_calcul_doubles"] },
  { id: "cp_calcul_plus_moins_1_2_10", label: "Ajouter ou retirer 1, 2 ou 10", notionId: "calcul_mental", prerequis: ["cp_entier_dizaine_unite"] },
  { id: "cp_calcul_dizaines_entieres", label: "Ajouter ou retirer 20, 30, 40… jusqu'à 90", notionId: "calcul_mental", prerequis: ["cp_calcul_plus_moins_1_2_10"] },
  { id: "cp_calcul_complement_dizaine", label: "Trouver le complément à la dizaine du dessus", notionId: "calcul_mental", prerequis: ["cp_calcul_complements_10"] },
  { id: "cp_calcul_ajouter_9", label: "Ajouter 9 en ajoutant 10 puis en retirant 1", notionId: "calcul_mental", prerequis: ["cp_calcul_plus_moins_1_2_10"] },
  { id: "cp_calcul_ajouter_deux_nombres", label: "Ajouter deux nombres inférieurs à 100", notionId: "calcul_mental", prerequis: ["cp_calcul_dizaines_entieres", "cp_calcul_complement_dizaine"] },
  { id: "cp_calcul_soustraire_dizaine", label: "Retirer un petit nombre à un nombre de dizaines", notionId: "calcul_mental", prerequis: ["cp_calcul_complements_10"] },
  { id: "cp_calcul_defi", label: "Résoudre un défi de calcul mental", notionId: "calcul_mental", prerequis: ["cp_calcul_complements_10", "cp_calcul_plus_moins_1_2_10"] },

  // ============================================================
  // LA RÉSOLUTION DE PROBLÈMES — au moins dix par semaine, dit le
  // BO. Les structures sont nommées : parties-tout, deux étapes,
  // groupes égaux, partage.
  // ============================================================

  { id: "cp_probleme_identifier", label: "Comprendre ce que cherche le problème", notionId: "probleme", prerequis: ["cp_add_sens", "cp_sous_sens"] },
  { id: "cp_probleme_additif", label: "Résoudre un problème de parties-tout en une étape", notionId: "probleme", prerequis: ["cp_add_calculer"] },
  { id: "cp_probleme_soustractif", label: "Résoudre un problème de retrait ou d'écart", notionId: "probleme", prerequis: ["cp_sous_calculer"] },
  { id: "cp_probleme_schema", label: "S'aider d'un dessin ou d'un schéma", notionId: "probleme", prerequis: ["cp_probleme_identifier"] },
  { id: "cp_probleme_deux_etapes", label: "Résoudre un problème en deux étapes", notionId: "probleme", prerequis: ["cp_probleme_additif", "cp_probleme_soustractif"] },
  { id: "cp_probleme_multiplicatif", label: "Résoudre un problème de groupes égaux", notionId: "probleme", prerequis: ["cp_mult_sens"] },
  { id: "cp_probleme_partage", label: "Résoudre un problème de partage", notionId: "probleme", prerequis: ["cp_probleme_multiplicatif"] },
  { id: "cp_probleme_reponse", label: "Écrire la réponse et vérifier qu'elle est possible", notionId: "probleme", prerequis: ["cp_probleme_additif", "cp_probleme_soustractif"] },
  { id: "cp_probleme_defi", label: "Résoudre un défi de problèmes", notionId: "probleme", prerequis: ["cp_probleme_reponse", "cp_probleme_deux_etapes"] },

  // ============================================================
  // LES LONGUEURS — on compare d'abord, on mesure ensuite
  // ============================================================

  { id: "cp_longueur_lexique", label: "Utiliser les mots long, court, près et loin", notionId: "longueur", prerequis: [] },
  { id: "cp_longueur_comparer", label: "Comparer deux objets selon leur longueur", notionId: "longueur", prerequis: ["cp_longueur_lexique"] },
  { id: "cp_longueur_mesurer_unite", label: "Comparer des longueurs en reportant une bandelette", notionId: "longueur", prerequis: ["cp_longueur_comparer"] },
  { id: "cp_longueur_regle", label: "Mesurer un segment avec une règle graduée", notionId: "longueur", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_longueur_m_cm", label: "Connaître le mètre, le centimètre, et que 1 m = 100 cm", notionId: "longueur", prerequis: ["cp_longueur_regle"] },
  { id: "cp_longueur_defi", label: "Résoudre un défi de longueurs", notionId: "longueur", prerequis: ["cp_longueur_regle", "cp_longueur_m_cm"] },

  // ============================================================
  // LES MASSES — sans une seule unité : on soupèse, on compare,
  // on range. Le gramme et le kilogramme sont au CE1.
  // ============================================================

  { id: "cp_masse_lexique", label: "Utiliser les mots lourd et léger", notionId: "masse_contenance", prerequis: [] },
  { id: "cp_masse_comparer", label: "Comparer deux objets selon leur masse", notionId: "masse_contenance", prerequis: ["cp_masse_lexique"] },
  { id: "cp_masse_contenance_estimer", label: "Ranger trois objets du plus léger au plus lourd", notionId: "masse_contenance", prerequis: ["cp_masse_comparer"] },
  { id: "cp_masse_contenance_defi", label: "Résoudre un défi de masses", notionId: "masse_contenance", prerequis: ["cp_masse_contenance_estimer"] },

  // ============================================================
  // LE REPÉRAGE DANS LE TEMPS — heures entières, jusqu'à douze
  // ============================================================

  { id: "cp_duree_lire_heure", label: "Lire une heure entière sur une horloge à aiguilles", notionId: "duree", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_duree_placer_aiguilles", label: "Placer les aiguilles pour une heure entière", notionId: "duree", prerequis: ["cp_duree_lire_heure"] },
  { id: "cp_duree_jour_semaine", label: "Associer une heure à un moment de la journée", notionId: "duree", prerequis: [] },
  { id: "cp_duree_ordonner", label: "Ranger des moments de la journée dans l'ordre", notionId: "duree", prerequis: ["cp_duree_jour_semaine"] },
  { id: "cp_duree_defi", label: "Résoudre un défi sur l'heure", notionId: "duree", prerequis: ["cp_duree_placer_aiguilles"] },

  // ============================================================
  // LA MONNAIE — des euros entiers, jamais de virgule
  // ============================================================

  { id: "cp_monnaie_reconnaitre", label: "Reconnaître les pièces et les billets en euros", notionId: "monnaie", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_monnaie_valeur", label: "Trouver la valeur d'un ensemble de pièces et de billets", notionId: "monnaie", prerequis: ["cp_monnaie_reconnaitre", "cp_add_calculer"] },
  { id: "cp_monnaie_comparer", label: "Comparer deux sommes d'argent", notionId: "monnaie", prerequis: ["cp_monnaie_valeur"] },
  { id: "cp_monnaie_constituer", label: "Constituer une somme d'argent donnée", notionId: "monnaie", prerequis: ["cp_monnaie_valeur"] },
  { id: "cp_monnaie_rendre", label: "Rendre la monnaie", notionId: "monnaie", prerequis: ["cp_monnaie_constituer", "cp_sous_calculer"] },
  { id: "cp_monnaie_defi", label: "Résoudre un défi de monnaie", notionId: "monnaie", prerequis: ["cp_monnaie_rendre"] },

  // ============================================================
  // LE REPÉRAGE DANS L'ESPACE — l'espace de la classe, un plan,
  // une maquette. Aucune coordonnée.
  // ============================================================

  { id: "cp_reperage_vocabulaire", label: "Utiliser les mots sur, sous, entre, devant, derrière", notionId: "reperage", prerequis: [] },
  { id: "cp_reperage_gauche_droite", label: "Distinguer la gauche et la droite", notionId: "reperage", prerequis: ["cp_reperage_vocabulaire"] },
  { id: "cp_reperage_quadrillage", label: "Se repérer sur un plan de la classe", notionId: "reperage", prerequis: ["cp_reperage_vocabulaire"] },
  { id: "cp_reperage_deplacement", label: "Décrire un déplacement en s'aidant de repères", notionId: "reperage", prerequis: ["cp_reperage_gauche_droite", "cp_reperage_quadrillage"] },
  { id: "cp_reperage_assemblage", label: "Reproduire un assemblage de cubes et de pavés", notionId: "reperage", prerequis: ["cp_reperage_vocabulaire"] },
  { id: "cp_reperage_defi", label: "Résoudre un défi de repérage", notionId: "reperage", prerequis: ["cp_reperage_deplacement"] },

  // ============================================================
  // LES FIGURES PLANES ET LES SOLIDES — le disque, pas le cercle.
  // Le mot « face » pour les solides, « côté » et « sommet » pour
  // les figures.
  // ============================================================

  { id: "cp_figure_reconnaitre", label: "Reconnaître le disque, le carré, le rectangle et le triangle", notionId: "figures_solides", prerequis: ["cp_reperage_vocabulaire"] },
  { id: "cp_figure_decrire", label: "Décrire une figure avec les mots côté et sommet", notionId: "figures_solides", prerequis: ["cp_figure_reconnaitre"] },
  { id: "cp_solide_reconnaitre", label: "Reconnaître un cube, une boule, un cône, un cylindre et un pavé", notionId: "figures_solides", prerequis: ["cp_figure_reconnaitre"] },
  { id: "cp_solide_faces", label: "Compter et nommer les faces d'un cube et d'un pavé", notionId: "figures_solides", prerequis: ["cp_solide_reconnaitre"] },
  { id: "cp_figure_alignement", label: "Vérifier un alignement avec la règle", notionId: "figures_solides", prerequis: ["cp_figure_reconnaitre"] },
  { id: "cp_figure_tracer", label: "Tracer et compléter une figure sur un quadrillage", notionId: "figures_solides", prerequis: ["cp_figure_decrire", "cp_figure_alignement"] },
  { id: "cp_figure_defi", label: "Résoudre un défi de géométrie", notionId: "figures_solides", prerequis: ["cp_figure_tracer", "cp_solide_faces"] },

  // ============================================================
  // LES TABLEAUX ET LES DIAGRAMMES — une enquête de la classe,
  // un axe gradué de un en un
  // ============================================================

  { id: "cp_donnees_lire_tableau", label: "Lire un tableau de résultats", notionId: "donnees", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_donnees_barres", label: "Lire un diagramme en barres", notionId: "donnees", prerequis: ["cp_donnees_lire_tableau"] },
  { id: "cp_donnees_completer_tableau", label: "Compléter un tableau à double entrée", notionId: "donnees", prerequis: ["cp_donnees_lire_tableau"] },
  { id: "cp_donnees_interpreter", label: "Répondre avec les mots le plus, le moins, autant que", notionId: "donnees", prerequis: ["cp_donnees_barres"] },
  { id: "cp_donnees_defi", label: "Résoudre un défi avec un tableau ou un diagramme", notionId: "donnees", prerequis: ["cp_donnees_interpreter", "cp_donnees_completer_tableau"] },

  // ============================================================
  // LES INSTRUCTIONS ET LES DÉPLACEMENTS CODÉS — dix instructions
  // au maximum, dont deux virages
  // ============================================================

  { id: "cp_algo_instruction", label: "Suivre une suite d'instructions", notionId: "algorithmique", prerequis: ["cp_reperage_vocabulaire"] },
  { id: "cp_algo_deplacement", label: "Coder un déplacement sur un quadrillage", notionId: "algorithmique", prerequis: ["cp_reperage_deplacement"] },
  { id: "cp_algo_suite_logique", label: "Trouver le rang d'un dessin dans une suite qui se répète", notionId: "algorithmique", prerequis: ["cp_suite_completer", "cp_entier_ordinal"] },
  { id: "cp_algo_defi", label: "Résoudre un défi d'instructions", notionId: "algorithmique", prerequis: ["cp_algo_instruction", "cp_algo_deplacement"] },
];
