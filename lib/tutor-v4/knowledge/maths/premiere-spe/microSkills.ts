// knowledge/maths/premiere-spe/microSkills.ts
//
// Micro-compétences de la spécialité mathématiques de Première générale.
// Chaque microId est dérivé d'une « capacité attendue » du BO.
// prerequis : uniquement des microId existants (validés au runtime par buildKnowledge).
//
// ─────────────────────────────────────────────────────────────────────────────
// RÉVISION DU 02/08/2026 : 45 → 132 micro-compétences.
//
// Le découpage précédent ne couvrait qu'une partie des capacités attendues.
// Manquaient notamment, alors qu'elles figurent noir sur blanc au programme :
//   - toute la section « Vocabulaire ensembliste et logique » (13 micros ici) ;
//   - le produit scalaire par PROJECTION orthogonale, qui en est la définition
//     première dans le BO, avant même les coordonnées ;
//   - le tableau croisé d'effectifs, et la distinction P_A(B) / P_B(A) dans les
//     situations de type « faux positifs » ;
//   - l'enroulement de la droite sur le cercle trigonométrique ;
//   - l'échantillonnage : simuler une variable aléatoire, moyenne d'un
//     échantillon de taille n ;
//   - les listes (seule notion NOUVELLE du programme d'algorithmique) ;
//   - la dérivée de g(ax+b), celle de x^n pour n dans Z, la non-dérivabilité
//     de la valeur absolue en 0.
//
// ⚠️ Les micros déjà en place ont GARDÉ leur identifiant : les items écrits
// jusqu'ici (495 au 02/08) leur restent rattachés. Les micros ajoutés démarrent
// à zéro item — décision de Frédéric le 02/08 : on pose d'abord la structure
// complète, quitte à ce que des compétences soient vides le temps qu'on écrive
// les banques, les élèves étant en vacances.
// ─────────────────────────────────────────────────────────────────────────────

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  /* ===================== SUITES ===================== */
  {
    id: "suite_registres",
    label: "Passer du langage courant à l’écriture d’une suite",
    notionId: "suites",
    prerequis: [],
  },
  {
    id: "suite_termes",
    label: "Calculer les termes d’une suite définie explicitement",
    notionId: "suites",
    prerequis: [],
  },
  {
    id: "suite_recurrence",
    label: "Calculer les termes d’une suite définie par récurrence",
    notionId: "suites",
    prerequis: ["suite_termes"],
  },
  {
    id: "suite_algorithme",
    label: "Calculer des termes d’une suite avec un algorithme",
    notionId: "suites",
    prerequis: ["suite_recurrence"],
  },
  {
    id: "suite_modeliser",
    label: "Modéliser une situation par une suite (motif, dénombrement)",
    notionId: "suites",
    prerequis: ["suite_termes"],
  },
  {
    id: "suite_arithmetique",
    label: "Suites arithmétiques : raison et terme général",
    notionId: "suites",
    prerequis: ["suite_termes"],
  },
  {
    id: "suite_geometrique",
    label: "Suites géométriques : raison et terme général",
    notionId: "suites",
    prerequis: ["suite_termes"],
  },
  {
    id: "suite_evolution",
    label: "Taux d’évolution : croissance linéaire ou exponentielle",
    notionId: "suites",
    prerequis: ["suite_geometrique"],
  },
  {
    id: "suite_variation",
    label: "Étudier le sens de variation d’une suite",
    notionId: "suites",
    prerequis: ["suite_arithmetique", "suite_geometrique"],
  },
  {
    id: "suite_sommes",
    label: "Calculer 1 + 2 + … + n et une somme arithmétique",
    notionId: "suites",
    prerequis: ["suite_arithmetique"],
  },
  {
    id: "suite_somme_geo",
    label: "Calculer 1 + q + … + qⁿ et une somme géométrique",
    notionId: "suites",
    prerequis: ["suite_geometrique"],
  },
  {
    id: "suite_limite",
    label: "Conjecturer la limite éventuelle d’une suite",
    notionId: "suites",
    prerequis: ["suite_variation"],
  },

  /* ===================== SECOND DEGRÉ ===================== */
  {
    id: "sd_discriminant",
    label: "Calculer le discriminant d’un trinôme",
    notionId: "second_degre",
    prerequis: [],
  },
  {
    id: "sd_racines",
    label: "Résoudre une équation du second degré",
    notionId: "second_degre",
    prerequis: ["sd_discriminant"],
  },
  {
    id: "sd_forme_factorisee",
    label: "Lire racines et signe sur une forme factorisée",
    notionId: "second_degre",
    prerequis: [],
  },
  {
    id: "sd_factorisation",
    label: "Factoriser un trinôme (racine évidente, somme/produit)",
    notionId: "second_degre",
    prerequis: ["sd_racines"],
  },
  {
    id: "sd_somme_produit",
    label: "Utiliser la somme et le produit des racines",
    notionId: "second_degre",
    prerequis: ["sd_racines"],
  },
  {
    id: "sd_deux_racines",
    label: "Trouver un trinôme s’annulant en deux nombres donnés",
    notionId: "second_degre",
    prerequis: ["sd_somme_produit"],
  },
  {
    id: "sd_canonique",
    label: "Forme canonique, sommet et axe de symétrie",
    notionId: "second_degre",
    prerequis: ["sd_discriminant"],
  },
  {
    id: "sd_completion_carre",
    label: "Obtenir la forme canonique par complétion du carré",
    notionId: "second_degre",
    prerequis: ["sd_canonique"],
  },
  {
    id: "sd_signe",
    label: "Étudier le signe d’un trinôme",
    notionId: "second_degre",
    prerequis: ["sd_racines"],
  },
  {
    id: "sd_inequation",
    label: "Résoudre une inéquation du second degré",
    notionId: "second_degre",
    prerequis: ["sd_signe"],
  },
  {
    id: "sd_forme_adaptee",
    label: "Choisir la forme adaptée (développée, canonique, factorisée)",
    notionId: "second_degre",
    prerequis: ["sd_factorisation", "sd_canonique"],
  },

  /* ===================== DÉRIVATION ===================== */
  {
    id: "der_taux",
    label: "Taux de variation et pente d’une sécante",
    notionId: "derivation",
    prerequis: [],
  },
  {
    id: "der_nombre_derive",
    label: "Nombre dérivé comme limite du taux de variation",
    notionId: "derivation",
    prerequis: ["der_taux"],
  },
  {
    id: "der_definition",
    label: "Calculer un nombre dérivé à partir de la définition",
    notionId: "derivation",
    prerequis: ["der_nombre_derive"],
  },
  {
    id: "der_interpreter",
    label: "Interpréter f’(a) : vitesse instantanée, coût marginal",
    notionId: "derivation",
    prerequis: ["der_nombre_derive"],
  },
  {
    id: "der_graphique",
    label: "Lire f’(a) sur un graphique et tracer la tangente",
    notionId: "derivation",
    prerequis: ["der_nombre_derive"],
  },
  {
    id: "der_tangente",
    label: "Équation de la tangente en un point",
    notionId: "derivation",
    prerequis: ["der_nombre_derive"],
  },
  {
    id: "der_usuelles",
    label: "Dérivées des fonctions carré, cube, inverse, racine",
    notionId: "derivation",
    prerequis: ["der_nombre_derive"],
  },
  {
    id: "der_puissance",
    label: "Dériver x ↦ xⁿ pour n entier relatif",
    notionId: "derivation",
    prerequis: ["der_usuelles"],
  },
  {
    id: "der_operations",
    label: "Dérivée d’une somme et d’un produit",
    notionId: "derivation",
    prerequis: ["der_usuelles"],
  },
  {
    id: "der_quotient",
    label: "Dérivée d’un inverse et d’un quotient",
    notionId: "derivation",
    prerequis: ["der_operations"],
  },
  {
    id: "der_composee_affine",
    label: "Dériver x ↦ g(ax + b)",
    notionId: "derivation",
    prerequis: ["der_operations"],
  },
  {
    id: "der_valeur_absolue",
    label: "Valeur absolue : courbe et non-dérivabilité en 0",
    notionId: "derivation",
    prerequis: ["der_nombre_derive"],
  },

  /* ===================== VARIATIONS ET COURBES ===================== */
  {
    id: "var_signe_derivee",
    label: "Lien entre signe de la dérivée et variations",
    notionId: "variations_fonctions",
    prerequis: [],
  },
  {
    id: "var_constante",
    label: "Reconnaître une fonction constante par sa dérivée",
    notionId: "variations_fonctions",
    prerequis: ["var_signe_derivee"],
  },
  {
    id: "var_tableau",
    label: "Dresser un tableau de variations",
    notionId: "variations_fonctions",
    prerequis: ["var_signe_derivee"],
  },
  {
    id: "var_lecture_courbe",
    label: "Lire les variations et les extremums sur une courbe",
    notionId: "variations_fonctions",
    prerequis: [],
  },
  {
    id: "var_extremum",
    label: "Déterminer un extremum",
    notionId: "variations_fonctions",
    prerequis: ["var_signe_derivee"],
  },
  {
    id: "var_extremum_tangente",
    label: "Tangente horizontale en un extremum",
    notionId: "variations_fonctions",
    prerequis: ["var_extremum"],
  },
  {
    id: "var_optimisation",
    label: "Résoudre un problème d’optimisation",
    notionId: "variations_fonctions",
    prerequis: ["var_extremum"],
  },
  {
    id: "var_inegalite",
    label: "Démontrer une inégalité à l’aide des variations",
    notionId: "variations_fonctions",
    prerequis: ["var_tableau"],
  },
  {
    id: "var_position_relative",
    label: "Étudier la position relative de deux courbes",
    notionId: "variations_fonctions",
    prerequis: ["var_inegalite"],
  },
  {
    id: "var_second_degre",
    label: "Étudier un trinôme par la dérivation",
    notionId: "variations_fonctions",
    prerequis: ["var_tableau"],
  },

  /* ===================== EXPONENTIELLE ===================== */
  {
    id: "exp_definition",
    label: "Définition : l’unique fonction telle que f’ = f et f(0) = 1",
    notionId: "exponentielle",
    prerequis: [],
  },
  {
    id: "exp_relation",
    label: "Relation fonctionnelle exp(x + y) = exp(x)exp(y)",
    notionId: "exponentielle",
    prerequis: ["exp_definition"],
  },
  {
    id: "exp_nombre_e",
    label: "Le nombre e et la notation eˣ",
    notionId: "exponentielle",
    prerequis: ["exp_definition"],
  },
  {
    id: "exp_proprietes",
    label: "Propriétés algébriques de l’exponentielle",
    notionId: "exponentielle",
    prerequis: ["exp_relation"],
  },
  {
    id: "exp_simplifier",
    label: "Simplifier une expression avec l’exponentielle",
    notionId: "exponentielle",
    prerequis: ["exp_proprietes"],
  },
  {
    id: "exp_signe",
    label: "L’exponentielle est strictement positive",
    notionId: "exponentielle",
    prerequis: ["exp_definition"],
  },
  {
    id: "exp_derivee",
    label: "Dérivée, signe et variations de l’exponentielle",
    notionId: "exponentielle",
    prerequis: ["exp_signe"],
  },
  {
    id: "exp_derivee_affine",
    label: "Dériver t ↦ e^(kt)",
    notionId: "exponentielle",
    prerequis: ["exp_derivee"],
  },
  {
    id: "exp_courbe",
    label: "Représenter t ↦ e^(kt) et t ↦ e^(−kt)",
    notionId: "exponentielle",
    prerequis: ["exp_derivee_affine"],
  },
  {
    id: "exp_suite_geo",
    label: "Reconnaître que la suite (e^(na)) est géométrique",
    notionId: "exponentielle",
    prerequis: ["exp_proprietes", "suite_geometrique"],
  },
  {
    id: "exp_modelisation",
    label: "Modéliser une croissance ou décroissance exponentielle",
    notionId: "exponentielle",
    prerequis: ["exp_courbe"],
  },

  /* ===================== TRIGONOMÉTRIE ===================== */
  {
    id: "trig_radian",
    label: "Radian et conversion avec les degrés",
    notionId: "trigonometrie",
    prerequis: [],
  },
  {
    id: "trig_arc",
    label: "Longueur d’un arc sur le cercle trigonométrique",
    notionId: "trigonometrie",
    prerequis: ["trig_radian"],
  },
  {
    id: "trig_enroulement",
    label: "Enrouler la droite numérique : image d’un réel",
    notionId: "trigonometrie",
    prerequis: ["trig_arc"],
  },
  {
    id: "trig_cercle",
    label: "Cercle trigonométrique et placement d’un point",
    notionId: "trigonometrie",
    prerequis: ["trig_enroulement"],
  },
  {
    id: "trig_cos_sin",
    label: "Cosinus et sinus d’un réel comme coordonnées",
    notionId: "trigonometrie",
    prerequis: ["trig_cercle"],
  },
  {
    id: "trig_triangle_rectangle",
    label: "Lien avec le cosinus et le sinus du triangle rectangle",
    notionId: "trigonometrie",
    prerequis: ["trig_cos_sin"],
  },
  {
    id: "trig_valeurs",
    label: "Valeurs remarquables de cosinus et sinus",
    notionId: "trigonometrie",
    prerequis: ["trig_cos_sin"],
  },
  {
    id: "trig_angles_associes",
    label: "Angles associés lus sur le cercle",
    notionId: "trigonometrie",
    prerequis: ["trig_valeurs"],
  },
  {
    id: "trig_parite",
    label: "Parité de cosinus et sinus, traduction graphique",
    notionId: "trigonometrie",
    prerequis: ["trig_angles_associes"],
  },
  {
    id: "trig_periodicite",
    label: "Périodicité, traduction graphique",
    notionId: "trigonometrie",
    prerequis: ["trig_angles_associes"],
  },
  {
    id: "trig_courbes",
    label: "Courbes de cosinus et sinus, lien avec le cercle",
    notionId: "trigonometrie",
    prerequis: ["trig_parite", "trig_periodicite"],
  },

  /* ===================== PRODUIT SCALAIRE ===================== */
  {
    id: "ps_projection",
    label: "Produit scalaire par projection orthogonale",
    notionId: "produit_scalaire",
    prerequis: [],
  },
  {
    id: "ps_norme_angle",
    label: "Produit scalaire avec normes et angle",
    notionId: "produit_scalaire",
    prerequis: ["ps_projection"],
  },
  {
    id: "ps_coordonnees",
    label: "Produit scalaire à partir des coordonnées",
    notionId: "produit_scalaire",
    prerequis: [],
  },
  {
    id: "ps_norme",
    label: "Calculer la norme d’un vecteur",
    notionId: "produit_scalaire",
    prerequis: ["ps_coordonnees"],
  },
  {
    id: "ps_proprietes",
    label: "Symétrie et bilinéarité du produit scalaire",
    notionId: "produit_scalaire",
    prerequis: ["ps_coordonnees"],
  },
  {
    id: "ps_norme_somme",
    label: "Développer ‖u + v‖²",
    notionId: "produit_scalaire",
    prerequis: ["ps_proprietes", "ps_norme"],
  },
  {
    id: "ps_orthogonalite",
    label: "Caractériser l’orthogonalité de deux vecteurs",
    notionId: "produit_scalaire",
    prerequis: ["ps_coordonnees"],
  },
  {
    id: "ps_alkashi",
    label: "Formule d’Al-Kashi",
    notionId: "produit_scalaire",
    prerequis: ["ps_norme_angle"],
  },
  {
    id: "ps_angle_longueur",
    label: "Calculer un angle ou une longueur avec le produit scalaire",
    notionId: "produit_scalaire",
    prerequis: ["ps_alkashi"],
  },
  {
    id: "ps_ma_mb",
    label: "Transformer MA·MB et décrire un ensemble de points",
    notionId: "produit_scalaire",
    prerequis: ["ps_norme_somme"],
  },
  {
    id: "ps_methode",
    label: "Choisir la méthode adaptée pour un produit scalaire",
    notionId: "produit_scalaire",
    prerequis: ["ps_projection", "ps_coordonnees", "ps_norme_angle"],
  },

  /* ===================== GÉOMÉTRIE REPÉRÉE ===================== */
  {
    id: "gr_vecteur_normal",
    label: "Vecteur normal à une droite",
    notionId: "geometrie_reperee",
    prerequis: ["ps_orthogonalite"],
  },
  {
    id: "gr_vecteur_directeur",
    label: "Vecteur directeur (−b ; a) d’une droite",
    notionId: "geometrie_reperee",
    prerequis: ["gr_vecteur_normal"],
  },
  {
    id: "gr_equation_droite",
    label: "Équation cartésienne à partir d’un point et d’un vecteur normal",
    notionId: "geometrie_reperee",
    prerequis: ["gr_vecteur_normal"],
  },
  {
    id: "gr_droites",
    label: "Droites parallèles ou perpendiculaires",
    notionId: "geometrie_reperee",
    prerequis: ["gr_vecteur_normal", "gr_vecteur_directeur"],
  },
  {
    id: "gr_projete",
    label: "Coordonnées du projeté orthogonal d’un point sur une droite",
    notionId: "geometrie_reperee",
    prerequis: ["gr_equation_droite", "ps_projection"],
  },
  {
    id: "gr_cercle",
    label: "Équation d’un cercle : centre et rayon",
    notionId: "geometrie_reperee",
    prerequis: [],
  },
  {
    id: "gr_cercle_reconnaitre",
    label: "Reconnaître une équation de cercle",
    notionId: "geometrie_reperee",
    prerequis: ["gr_cercle"],
  },
  {
    id: "gr_cercle_utiliser",
    label: "Utiliser l’équation d’un cercle (appartenance, diamètre)",
    notionId: "geometrie_reperee",
    prerequis: ["gr_cercle"],
  },
  {
    id: "gr_parabole",
    label: "Axe de symétrie et sommet d’une parabole",
    notionId: "geometrie_reperee",
    prerequis: ["sd_canonique"],
  },
  {
    id: "gr_configuration",
    label: "Utiliser un repère pour étudier une configuration",
    notionId: "geometrie_reperee",
    prerequis: ["gr_equation_droite", "gr_cercle_utiliser"],
  },

  /* ===================== PROBABILITÉS CONDITIONNELLES ===================== */
  {
    id: "pc_conditionnelle",
    label: "Calculer une probabilité conditionnelle",
    notionId: "probabilites_conditionnelles",
    prerequis: [],
  },
  {
    id: "pc_registres",
    label: "Passer de la langue naturelle à l’écriture symbolique",
    notionId: "probabilites_conditionnelles",
    prerequis: ["pc_conditionnelle"],
  },
  {
    id: "pc_tableau",
    label: "Calculer une probabilité conditionnelle dans un tableau croisé",
    notionId: "probabilites_conditionnelles",
    prerequis: ["pc_conditionnelle"],
  },
  {
    id: "pc_arbre_construire",
    label: "Construire un arbre pondéré à partir d’un énoncé",
    notionId: "probabilites_conditionnelles",
    prerequis: ["pc_registres"],
  },
  {
    id: "pc_arbre",
    label: "Arbre pondéré : règle du produit et de la somme",
    notionId: "probabilites_conditionnelles",
    prerequis: ["pc_arbre_construire"],
  },
  {
    id: "pc_partition",
    label: "Reconnaître une partition de l’univers",
    notionId: "probabilites_conditionnelles",
    prerequis: ["pc_conditionnelle"],
  },
  {
    id: "pc_totales",
    label: "Formule des probabilités totales",
    notionId: "probabilites_conditionnelles",
    prerequis: ["pc_arbre", "pc_partition"],
  },
  {
    id: "pc_inverser",
    label: "Distinguer P_A(B) et P_B(A) : les faux positifs",
    notionId: "probabilites_conditionnelles",
    prerequis: ["pc_totales"],
  },
  {
    id: "pc_independance",
    label: "Indépendance de deux événements",
    notionId: "probabilites_conditionnelles",
    prerequis: ["pc_conditionnelle"],
  },
  {
    id: "pc_independance_incompatible",
    label: "Ne pas confondre indépendants et incompatibles",
    notionId: "probabilites_conditionnelles",
    prerequis: ["pc_independance"],
  },
  {
    id: "pc_succession",
    label: "Succession de deux épreuves indépendantes",
    notionId: "probabilites_conditionnelles",
    prerequis: ["pc_independance"],
  },

  /* ===================== VARIABLES ALÉATOIRES ===================== */
  {
    id: "va_definition",
    label: "Variable aléatoire : une fonction définie sur l’univers",
    notionId: "variables_aleatoires",
    prerequis: [],
  },
  {
    id: "va_notation",
    label: "Interpréter les notations {X = a} et P(X ⩽ a)",
    notionId: "variables_aleatoires",
    prerequis: ["va_definition"],
  },
  {
    id: "va_modeliser",
    label: "Modéliser une situation à l’aide d’une variable aléatoire",
    notionId: "variables_aleatoires",
    prerequis: ["va_definition"],
  },
  {
    id: "va_loi",
    label: "Déterminer la loi d’une variable aléatoire",
    notionId: "variables_aleatoires",
    prerequis: ["va_notation"],
  },
  {
    id: "va_esperance",
    label: "Calculer une espérance",
    notionId: "variables_aleatoires",
    prerequis: ["va_loi"],
  },
  {
    id: "va_esperance_probleme",
    label: "Utiliser l’espérance : mise, jeu équitable",
    notionId: "variables_aleatoires",
    prerequis: ["va_esperance"],
  },
  {
    id: "va_variance",
    label: "Calculer une variance",
    notionId: "variables_aleatoires",
    prerequis: ["va_esperance"],
  },
  {
    id: "va_ecart_type",
    label: "Calculer et interpréter un écart-type",
    notionId: "variables_aleatoires",
    prerequis: ["va_variance"],
  },
  {
    id: "va_simulation",
    label: "Simuler une variable aléatoire avec Python",
    notionId: "variables_aleatoires",
    prerequis: ["va_loi"],
  },
  {
    id: "va_echantillon",
    label: "Moyenne d’un échantillon de taille n et espérance",
    notionId: "variables_aleatoires",
    prerequis: ["va_simulation", "va_esperance"],
  },

  /* ===================== ALGORITHMIQUE ===================== */
  {
    id: "algo_variable",
    label: "Variables et affectation",
    notionId: "algorithmique",
    prerequis: [],
  },
  {
    id: "algo_listes",
    label: "Générer une liste (extension, ajouts, compréhension)",
    notionId: "algorithmique",
    prerequis: ["algo_variable"],
  },
  {
    id: "algo_liste_manipuler",
    label: "Manipuler les éléments d’une liste et leurs indices",
    notionId: "algorithmique",
    prerequis: ["algo_listes"],
  },
  {
    id: "algo_liste_parcourir",
    label: "Parcourir une liste et itérer sur ses éléments",
    notionId: "algorithmique",
    prerequis: ["algo_liste_manipuler"],
  },
  {
    id: "algo_boucles",
    label: "Lire et comprendre une boucle bornée",
    notionId: "algorithmique",
    prerequis: ["algo_variable"],
  },
  {
    id: "algo_condition",
    label: "Lire et écrire une instruction conditionnelle",
    notionId: "algorithmique",
    prerequis: ["algo_variable"],
  },
  {
    id: "algo_while",
    label: "Lire et comprendre une boucle non bornée",
    notionId: "algorithmique",
    prerequis: ["algo_boucles", "algo_condition"],
  },
  {
    id: "algo_seuil",
    label: "Recherche de seuil sur une suite",
    notionId: "algorithmique",
    prerequis: ["algo_while"],
  },
  {
    id: "algo_fonctions",
    label: "Lire et comprendre une fonction Python",
    notionId: "algorithmique",
    prerequis: ["algo_boucles"],
  },
  {
    id: "algo_modulaire",
    label: "Découper une tâche : réutiliser une fonction",
    notionId: "algorithmique",
    prerequis: ["algo_fonctions"],
  },

  /* ===================== VOCABULAIRE ENSEMBLISTE ET LOGIQUE ===================== */
  {
    id: "log_appartenance",
    label: "Appartenance et inclusion : ∈, ⊂, ensembles de nombres",
    notionId: "logique_ensembles",
    prerequis: [],
  },
  {
    id: "log_operations",
    label: "Intersection, réunion, complémentaire",
    notionId: "logique_ensembles",
    prerequis: ["log_appartenance"],
  },
  {
    id: "log_couple",
    label: "Couple et produit cartésien",
    notionId: "logique_ensembles",
    prerequis: ["log_appartenance"],
  },
  {
    id: "log_connecteurs",
    label: "Les connecteurs « et » et « ou »",
    notionId: "logique_ensembles",
    prerequis: ["log_operations"],
  },
  {
    id: "log_contre_exemple",
    label: "Réfuter une proposition par un contre-exemple",
    notionId: "logique_ensembles",
    prerequis: [],
  },
  {
    id: "log_implication",
    label: "Formuler et utiliser une implication",
    notionId: "logique_ensembles",
    prerequis: ["log_connecteurs"],
  },
  {
    id: "log_reciproque",
    label: "Réciproque d’une implication",
    notionId: "logique_ensembles",
    prerequis: ["log_implication"],
  },
  {
    id: "log_equivalence",
    label: "Équivalence logique et « si et seulement si »",
    notionId: "logique_ensembles",
    prerequis: ["log_reciproque"],
  },
  {
    id: "log_condition",
    label: "Condition nécessaire, condition suffisante",
    notionId: "logique_ensembles",
    prerequis: ["log_implication"],
  },
  {
    id: "log_statut_lettres",
    label: "Identité ou équation ; variable, inconnue, paramètre",
    notionId: "logique_ensembles",
    prerequis: [],
  },
  {
    id: "log_quantificateurs",
    label: "« Pour tout », « il existe » et quantifications implicites",
    notionId: "logique_ensembles",
    prerequis: ["log_connecteurs"],
  },
  {
    id: "log_negation",
    label: "Nier une proposition quantifiée",
    notionId: "logique_ensembles",
    prerequis: ["log_quantificateurs"],
  },
  {
    id: "log_raisonnements",
    label: "Disjonction de cas, absurde, contraposée",
    notionId: "logique_ensembles",
    prerequis: ["log_implication", "log_contre_exemple"],
  },
];
