// Ontario, 9e année, cours décloisonné MTH1W (programme-cadre 2021).
// Les 43 contenus d'apprentissage relevés le 22/10/2026 sur le site du
// ministère, renvoyés vers nos micros. La 9e année a l'âge de la 3e française,
// mais une partie du cours (droites, quartiles, nuages de points) se fait chez
// nous en seconde ou en première : les renvois vont là où la micro existe.

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

export const ONTARIO_9E_MTH1W: ProgrammePays = {
  pays: "ontario",
  niveau: "9e année",
  codeCours: "MTH1W",
  equivalentFrance: "3e",
  source: "https://www.dcp.edu.gov.on.ca/fr/curriculum/secondaire-mathematiques/cours/mth1w/domaines",
  version: "2021",
  contenus: [
    // ── B. Nombres ──────────────────────────────────────────────────────────
    {
      code: "B1.1", domaine: "Nombres",
      texte: "Faire une recherche sur un concept numérique et raconter son développement dans une culture.",
      couverture: "hors-coach", micros: [],
    },
    {
      code: "B1.2", domaine: "Nombres",
      texte: "Décrire comment sont définis les sous-ensembles d'un système de nombres, leurs ressemblances et différences.",
      couverture: "complete",
      micros: [...m("seconde", "reels_ensembles"), ...m("3e", "fraction_rationnel_reconnaitre")],
    },
    {
      code: "B1.3", domaine: "Nombres",
      texte: "Utiliser régularités et relations entre nombres pour expliquer densité, infini et limite.",
      couverture: "partielle",
      micros: m("seconde", "reels_encadrement", "reels_droite_graduee"),
      note: "Rien sur la densité (« entre deux nombres, il y en a toujours un autre ») ni sur l'infini.",
    },
    {
      code: "B2.1", domaine: "Nombres",
      texte: "Relier le signe et la valeur d'un exposant à la valeur d'une puissance ; notation scientifique.",
      couverture: "complete",
      micros: [
        ...m("4e", "puissance_calculer", "puissance_exposant_negatif", "puissance_notation_scientifique"),
        ...m("3e", "entier_puissance_ecriture_scientifique"),
      ],
    },
    {
      code: "B2.2", domaine: "Nombres",
      texte: "Lois des exposants pour simplifier des expressions numériques et algébriques.",
      couverture: "complete",
      micros: m("seconde", "puiss_produit_quotient", "puiss_puissance_puissance", "puiss_expression_composee"),
    },
    {
      code: "B3.1", domaine: "Nombres",
      texte: "Nombres entiers (relatifs) pour décrire emplacements, directions, quantités et leurs changements.",
      couverture: "complete",
      micros: [...m("5e", "relatif_placer", "relatif_comparer"), ...m("4e", "relatif_probleme")],
    },
    {
      code: "B3.2", domaine: "Nombres",
      texte: "Fractions unitaires et leurs relations à d'autres fractions, y compris avec des instruments de mesure.",
      couverture: "partielle",
      micros: [...m("6e", "fraction_representer", "fraction_quantite"), ...m("5e", "fraction_egale")],
      note: "Manquent les mesures en fractions (règle graduée en 1/16 de pouce, tasses de recette).",
    },
    {
      code: "B3.3", domaine: "Nombres",
      texte: "Effet des signes sur la valeur des rapports, taux, fractions et décimaux.",
      couverture: "complete",
      micros: m("4e", "fraction_oppose", "relatif_multiplication", "relatif_division"),
    },
    {
      code: "B3.4", domaine: "Nombres",
      texte: "Problèmes avec opérations sur fractions positives et négatives et nombres fractionnaires ; formules, mesures.",
      couverture: "partielle",
      micros: [
        ...m("4e", "fraction_additionner", "fraction_multiplier", "fraction_diviser"),
        ...m("3e", "fraction_rationnel_calculer"),
        ...m("6e", "fraction_mixte"),
      ],
      note: "Calculer AVEC des nombres fractionnaires (2 ¾ + 1 ⅝) : rare chez nous, très présent en Ontario.",
    },
    {
      code: "B3.5", domaine: "Nombres",
      texte: "Problèmes de taux, pourcentages et proportions dans divers contextes.",
      couverture: "complete",
      micros: m("4e", "prop_pourcentage", "prop_coeff_multiplicateur", "prop_evolution", "prop_rapport", "prop_ratio_quotients", "grandeur_quotient"),
    },

    // ── C. Algèbre ──────────────────────────────────────────────────────────
    {
      code: "C1.1", domaine: "Algèbre",
      texte: "Faire une recherche sur un concept algébrique et raconter son développement dans une culture.",
      couverture: "hors-coach", micros: [],
    },
    {
      code: "C1.2", domaine: "Algèbre",
      texte: "Créer des expressions algébriques pour généraliser des relations (mots, nombres, représentations visuelles).",
      couverture: "complete",
      micros: [...m("4e", "litteral_expression_traduire"), ...m("3e", "algo_generaliser")],
    },
    {
      code: "C1.3", domaine: "Algèbre",
      texte: "Comparer des expressions algébriques pour repérer les expressions équivalentes, et justifier.",
      couverture: "complete",
      micros: m("4e", "litteral_distributivite_reconnaitre", "litteral_factoriser_verifier", "litteral_expression_substituer"),
    },
    {
      code: "C1.4", domaine: "Algèbre",
      texte: "Simplifier des expressions algébriques avec les propriétés des opérations.",
      couverture: "complete",
      micros: m("4e", "litteral_expression_reduire", "litteral_distributivite_simple", "litteral_distributivite_reduire"),
    },
    {
      code: "C1.5", domaine: "Algèbre",
      texte: "Créer et résoudre des équations dans divers contextes, et vérifier les solutions.",
      couverture: "complete",
      micros: m("4e", "equation_traduire", "equation_resoudre_reduction", "equation_verifier", "equation_probleme"),
    },
    {
      code: "C2.1", domaine: "Algèbre",
      texte: "Codage pour les concepts algébriques : variables, paramètres, équations, inéquations.",
      couverture: "complete",
      micros: [
        ...m("4e", "algo_variable"),
        ...m("3e", "algo_variable_boucle", "algo_generaliser"),
        ...m("seconde", "python_variable_affectation", "python_condition"),
      ],
    },
    {
      code: "C2.2", domaine: "Algèbre",
      texte: "Créer du code qui décompose une situation en étapes pour représenter des relations et résoudre des problèmes.",
      couverture: "complete",
      micros: [...m("4e", "algo_programme_objectif"), ...m("seconde", "python_boucle", "python_fonction")],
    },
    {
      code: "C2.3", domaine: "Algèbre",
      texte: "Lire du code pour prédire son résultat, et le modifier pour une situation nouvelle.",
      couverture: "complete",
      micros: [...m("4e", "algo_modifier"), ...m("3e", "algo_programme_calcul", "algo_corriger")],
    },
    {
      code: "C3.1", domaine: "Algèbre",
      texte: "Comparer les formes de graphiques linéaires et non linéaires, taux de variation, suites croissantes ou décroissantes.",
      couverture: "partielle",
      micros: [
        ...m("4e", "fonction_graphique_lire"),
        ...m("seconde", "variation_croissance", "reference_carre"),
        ...m("premiere", "lin_suite_reconnaitre", "expo_suite_reconnaitre"),
      ],
      note: "Les suites sont chez nous en 1re : il faudrait une micro « suite linéaire ou non ? » au niveau collège.",
    },
    {
      code: "C3.2", domaine: "Algèbre",
      texte: "Représenter des relations linéaires (tables, graphiques, équations) : taux de variation et valeur initiale.",
      couverture: "complete",
      micros: [...m("3e", "affine_coeff_directeur", "affine_ordonnee_origine", "affine_expression"), ...m("4e", "fonction_changer_mode")],
    },
    {
      code: "C3.3", domaine: "Algèbre",
      texte: "Comparer deux relations y = ax + b, graphiquement et algébriquement ; sens du point d'intersection.",
      couverture: "complete",
      micros: m("seconde", "droite_intersection", "fonction_comparer_courbes", "droite_systeme"),
    },
    {
      code: "C4.1", domaine: "Algèbre",
      texte: "Comparer graphiques, tables et équations de relations linéaires et non linéaires.",
      couverture: "complete",
      micros: [...m("3e", "fonction_affine_lineaire"), ...m("seconde", "fonction_tableau_graphique", "reference_carre", "reference_inverse")],
    },
    {
      code: "C4.2", domaine: "Algèbre",
      texte: "Tracer x = k, y = k, x + y = k, x – y = k, ax + by = k, xy = k et les inéquations associées (régions).",
      couverture: "partielle",
      micros: m("seconde", "droite_equation_cartesienne", "reference_inverse"),
      note: "Manquent les droites x = k / y = k comme notion, et les RÉGIONS du plan (inéquations à deux inconnues).",
    },
    {
      code: "C4.3", domaine: "Algèbre",
      texte: "Translations, réflexions, rotations de droites y = ax ; effet sur le graphique et l'équation.",
      couverture: "absente",
      micros: [],
      note: "Nos transformations (4e) portent sur des figures, jamais sur l'équation d'une droite.",
    },
    {
      code: "C4.4", domaine: "Algèbre",
      texte: "Équation d'une droite : taux de variation = pente, valeur initiale = ordonnée à l'origine ; problèmes.",
      couverture: "complete",
      micros: [...m("seconde", "droite_pente_ordonne", "droite_equation_reduite"), ...m("3e", "affine_probleme")],
    },

    // ── D. Données ──────────────────────────────────────────────────────────
    {
      code: "D1.1", domaine: "Données",
      texte: "Situation comportant des mégadonnées : impacts de leur collecte, sauvegarde et utilisation.",
      couverture: "hors-coach", micros: [],
    },
    {
      code: "D1.2", domaine: "Données",
      texte: "Analyse statistique d'une variable, y compris quartiles et diagrammes de quartiles.",
      couverture: "partielle",
      micros: [...m("3e", "stat_moyenne", "stat_mediane"), ...m("seconde", "stat_mediane_quartiles", "stat_ecart_interquartile")],
      note: "Le diagramme de quartiles (boîte à moustaches) n'existe nulle part dans le coach.",
    },
    {
      code: "D1.3", domaine: "Données",
      texte: "Nuage de points, corrélation, modèles de régression (technologie), prédictions.",
      couverture: "partielle",
      micros: m("premiere", "info_nuage_construire", "info_nuage_tendance", "info_ajust_determiner", "info_ajust_equation", "info_ajust_extrapoler"),
      note: "Niveau 1re chez nous ; manquent le vocabulaire de la corrélation (forte, faible, positive) et les modèles non linéaires.",
    },
    {
      code: "D2.1", domaine: "Données",
      texte: "Décrire la valeur de la modélisation mathématique dans la vie quotidienne.",
      couverture: "hors-coach", micros: [],
    },
    {
      code: "D2.2", domaine: "Données",
      texte: "Formuler une question d'intérêt nécessitant la collecte et l'analyse de données.",
      couverture: "hors-coach", micros: [],
    },
    {
      code: "D2.3", domaine: "Données",
      texte: "Plan de collecte de données, suppositions, ce qui change et ce qui reste identique.",
      couverture: "hors-coach", micros: [],
    },
    {
      code: "D2.4", domaine: "Données",
      texte: "Choisir comment représenter et analyser les données pour créer un modèle.",
      couverture: "partielle",
      micros: m("premiere", "lin_modele_choisir", "expo_modele_choisir"),
      note: "Le processus complet est un projet de classe ; le coach n'en travaille que le choix du modèle.",
    },
    {
      code: "D2.5", domaine: "Données",
      texte: "Expliquer comment le modèle répond à la question, ses limites et ses prédictions.",
      couverture: "partielle",
      micros: m("premiere", "info_ajust_limites", "info_ajust_interpoler"),
    },

    // ── E. Géométrie et mesure ──────────────────────────────────────────────
    {
      code: "E1.1", domaine: "Géométrie et mesure",
      texte: "Faire une recherche sur un concept géométrique ou un système de mesure dans une culture.",
      couverture: "hors-coach", micros: [],
    },
    {
      code: "E1.2", domaine: "Géométrie et mesure",
      texte: "Créer et analyser des conceptions graphiques avec les propriétés des cercles et des triangles.",
      couverture: "partielle",
      micros: [
        ...m("6e", "cercle_vocabulaire", "circonscrit_construire"),
        ...m("5e", "triangle_somme_angle", "angle_paralleles"),
        ...m("4e", "triangle_semblable"),
      ],
      note: "Les propriétés ontariennes du cercle (angle inscrit, médiatrice d'une corde) sont peu travaillées chez nous.",
    },
    {
      code: "E1.3", domaine: "Géométrie et mesure",
      texte: "Problèmes avec différentes unités d'un système et d'un système à l'autre (métrique ↔ impérial).",
      couverture: "partielle",
      micros: [...m("5e", "conversion_decimal", "conversion_avant_calcul"), ...m("4e", "grandeur_convertir"), ...m("3e", "volume_unite")],
      note: "Aucune unité impériale (pouce, pied, livre, gallon) : micro à écrire.",
    },
    {
      code: "E1.4", domaine: "Géométrie et mesure",
      texte: "Effet d'un changement de dimensions sur périmètre, circonférence, aire de surface et volume.",
      couverture: "partielle",
      micros: [...m("4e", "agrandissement_aire", "agrandissement_volume"), ...m("3e", "sym_transformation_effet", "volume_agrandissement_reduction")],
      note: "L'aire de la surface d'un solide (aire totale d'un prisme, d'un cylindre) n'a pas de micro.",
    },
    {
      code: "E1.5", domaine: "Géométrie et mesure",
      texte: "Relation de Pythagore dans des situations de la vie quotidienne, y compris des figures composées.",
      couverture: "complete",
      micros: [...m("4e", "pythagore_calculer_hypotenuse", "pythagore_calculer_cote", "pythagore_defi"), ...m("3e", "pythagore_solide")],
    },
    {
      code: "E1.6", domaine: "Géométrie et mesure",
      texte: "Relation entre volumes de prismes et de pyramides, de cylindres et de cônes.",
      couverture: "partielle",
      micros: m("4e", "volume_prisme", "volume_cylindre"),
      note: "Pas de micro « volume d'une pyramide ou d'un cône » (V = B × h ÷ 3) — trou AUSSI pour le programme français de 3e.",
    },

    // ── F. Littératie financière ────────────────────────────────────────────
    {
      code: "F1.1", domaine: "Littératie financière",
      texte: "Situation financière passée ou actuelle pour éclairer des décisions financières.",
      couverture: "hors-coach", micros: [],
    },
    {
      code: "F1.2", domaine: "Littératie financière",
      texte: "Appréciation et dépréciation : situations et graphiques associés.",
      couverture: "partielle",
      micros: [...m("4e", "prop_evolution"), ...m("seconde", "info_taux_evolution", "info_evolutions_successives")],
      note: "Manque le contexte (voiture qui perd de la valeur, maison qui en prend) lu sur un graphique.",
    },
    {
      code: "F1.3", domaine: "Littératie financière",
      texte: "Impact des taux d'intérêt, de la durée d'emprunt et du premier versement sur le coût d'un achat.",
      couverture: "partielle",
      micros: m("stmg", "suiteT_interets_simples_composes", "suite_mod_capital", "suiteT_somme_emprunt"),
      note: "Seulement en terminale STMG, trop difficile pour la 9e année : il faut une version collège (intérêts simples, coût total d'un achat à crédit).",
    },
    {
      code: "F1.4", domaine: "Littératie financière",
      texte: "Ajuster des budgets selon les changements de circonstances, et justifier.",
      couverture: "absente",
      micros: [],
      note: "Aucun budget dans le coach.",
    },
  ],
};
