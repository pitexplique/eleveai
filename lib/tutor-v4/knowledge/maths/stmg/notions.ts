// knowledge/maths/stmg/notions.ts
//
// Notions du programme de mathématiques du cycle terminal de la voie
// technologique (série STMG visée). Alignées sur les deux annexes du BO, rien
// hors programme.
//
// ─────────────────────────────────────────────────────────────────────────────
// DÉCOUPAGE : 3 micro-compétences par notion, 4 quand elles vont ensemble.
//
// Au coach, une notion est une séance : elle doit se terminer. Si une notion
// grossit, c'est la NOTION qu'on coupe en deux, jamais la micro qu'on supprime.
//
// ⚠️ Consigne de Frédéric le 15/08/2026, en découvrant la première version :
// « pas entre 3 et 5 micros — parfois il vaut mieux découper les notions ».
// 5 n'est pas une cible à remplir, c'est un plafond qu'on ne devrait presque
// jamais atteindre. Les onze notions qui étaient à 5 ont donc été coupées en
// deux séances de 3. On est en STMG : beaucoup de ces élèves sont fâchés avec
// les maths, et une barre qui n'avance pas est une barre qu'on abandonne.
// ─────────────────────────────────────────────────────────────────────────────
//
// L'ANNÉE EST DANS LE LIBELLÉ quand elle décide de ce qui est exigible :
// « Suite arithmétique — terme général (Tle) » n'est pas au programme de
// première, et un élève de première qui tombe dessus travaille à côté. Là où le
// texte ne tranche pas (les automatismes, travaillés « tout au long des deux
// années »), aucune mention : ce serait une fausse frontière.
//
// ⛔ Rappel des trois interdits du texte, à tenir en écrivant les banques :
//    pas de discriminant, pas de forme canonique, suites géométriques à termes
//    strictement positifs. Voir l'en-tête de bo.ts.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  /* ═══════════════════════ AUTOMATISMES (STMGAU) ═══════════════════════ */
  //
  // La liste du BO est unique pour les deux années : les automatismes de
  // terminale sont les mêmes, enrichis (le texte les signale « dans les tirets
  // en italique »). D'où un seul domaine, et une notion terminale à part pour
  // ce que la première ne peut pas encore faire.

  { id: "auto_proportion", label: "Proportions et pourcentages", boId: "STMGAU", prerequis: [], levels: [1, 2, 3] },
  { id: "auto_evo_coefficient", label: "Coefficient multiplicateur", boId: "STMGAU", prerequis: ["auto_proportion"], levels: [1, 2, 3] },
  { id: "auto_evo_taux", label: "Calculer un taux d'évolution", boId: "STMGAU", prerequis: ["auto_evo_coefficient"], levels: [1, 2, 3] },
  { id: "auto_evo_enchainees", label: "Évolutions successives et réciproque", boId: "STMGAU", prerequis: ["auto_evo_taux"], levels: [1, 2, 3] },
  { id: "auto_indice", label: "Indice base 100", boId: "STMGAU", prerequis: ["auto_evo_taux"], levels: [1, 2, 3] },
  { id: "auto_fractions_puissances", label: "Fractions, puissances et écritures", boId: "STMGAU", prerequis: [], levels: [1, 2, 3] },
  { id: "auto_ordres_unites", label: "Ordre de grandeur et conversions", boId: "STMGAU", prerequis: ["auto_fractions_puissances"], levels: [1, 2, 3] },
  { id: "auto_developper_factoriser", label: "Développer, factoriser, réduire", boId: "STMGAU", prerequis: [], levels: [1, 2, 3] },
  { id: "auto_equations", label: "Équations et inéquations", boId: "STMGAU", prerequis: ["auto_developper_factoriser"], levels: [1, 2, 3] },
  { id: "auto_signes", label: "Signe d'une expression", boId: "STMGAU", prerequis: ["auto_equations"], levels: [1, 2, 3] },
  { id: "auto_formules", label: "Formules et calcul littéral", boId: "STMGAU", prerequis: ["auto_equations"], levels: [1, 2, 3] },
  { id: "auto_lecture_graphique", label: "Lire une courbe", boId: "STMGAU", prerequis: [], levels: [1, 2, 3] },
  { id: "auto_resolution_graphique", label: "Résoudre graphiquement", boId: "STMGAU", prerequis: ["auto_lecture_graphique"], levels: [1, 2, 3] },
  { id: "auto_droites", label: "Droites et coefficient directeur", boId: "STMGAU", prerequis: ["auto_lecture_graphique"], levels: [1, 2, 3] },
  { id: "auto_donnees_graphiques", label: "Lire des données chiffrées", boId: "STMGAU", prerequis: [], levels: [1, 2, 3] },
  { id: "auto_terminale_reconnaitre", label: "Automatismes de terminale — reconnaître (Tle)", boId: "STMGAU", prerequis: ["auto_signes"], levels: [1, 2, 3] },
  { id: "auto_terminale_derivee", label: "Automatismes de terminale — dérivée et tangente (Tle)", boId: "STMGAU", prerequis: ["auto_droites"], levels: [1, 2, 3] },

  /* ═════════════════════ SUITES NUMÉRIQUES (STMGSU) ═════════════════════ */

  { id: "suite_notation", label: "Suite : notation et modes de génération", boId: "STMGSU", prerequis: [], levels: [1, 2, 3] },
  { id: "suite_termes", label: "Suite : calculer des termes", boId: "STMGSU", prerequis: ["suite_notation"], levels: [1, 2, 3] },
  { id: "suite_arithmetique", label: "Suite arithmétique : reconnaître", boId: "STMGSU", prerequis: ["suite_termes"], levels: [1, 2, 3] },
  { id: "suite_geometrique", label: "Suite géométrique : reconnaître", boId: "STMGSU", prerequis: ["suite_termes"], levels: [1, 2, 3] },
  { id: "suite_geo_evolution", label: "Suite géométrique et taux d'évolution", boId: "STMGSU", prerequis: ["suite_geometrique", "auto_evo_coefficient"], levels: [1, 2, 3] },
  { id: "suite_representation", label: "Représenter les termes d'une suite", boId: "STMGSU", prerequis: ["suite_termes"], levels: [1, 2, 3] },
  { id: "suite_modeliser", label: "Modéliser par une suite", boId: "STMGSU", prerequis: ["suite_arithmetique", "suite_geometrique"], levels: [1, 2, 3] },
  { id: "suite_seuil", label: "Problème de seuil", boId: "STMGSU", prerequis: ["suite_modeliser"], levels: [1, 2, 3] },
  { id: "suite_terme_general", label: "Terme général d'une suite (Tle)", boId: "STMGSU", prerequis: ["suite_arithmetique", "suite_geometrique"], levels: [1, 2, 3] },
  { id: "suite_moyennes", label: "Moyenne arithmétique et géométrique (Tle)", boId: "STMGSU", prerequis: ["suite_terme_general"], levels: [1, 2, 3] },
  { id: "suite_somme", label: "Somme des n premiers termes (Tle)", boId: "STMGSU", prerequis: ["suite_terme_general"], levels: [1, 2, 3] },
  { id: "suite_somme_situations", label: "Sommes : emprunts et placements (Tle)", boId: "STMGSU", prerequis: ["suite_somme"], levels: [1, 2, 3] },
  { id: "suite_comparer", label: "Comparer deux suites (Tle)", boId: "STMGSU", prerequis: ["suite_terme_general"], levels: [1, 2, 3] },

  /* ═══════════════════ FONCTIONS ET POLYNÔMES (STMGFO) ═══════════════════ */

  { id: "fct_representation", label: "Fonction : représenter et noter", boId: "STMGFO", prerequis: ["auto_lecture_graphique"], levels: [1, 2, 3] },
  { id: "fct_taux_variation", label: "Taux de variation et sécante", boId: "STMGFO", prerequis: ["fct_representation", "auto_droites"], levels: [1, 2, 3] },
  { id: "fct_monotonie", label: "Fonction monotone sur un intervalle", boId: "STMGFO", prerequis: ["fct_taux_variation"], levels: [1, 2, 3] },
  { id: "fct_degre2_courbe", label: "Degré 2 : la parabole", boId: "STMGFO", prerequis: ["fct_representation"], levels: [1, 2, 3] },
  { id: "fct_degre2_symetrie", label: "Degré 2 : axe de symétrie et extremum", boId: "STMGFO", prerequis: ["fct_degre2_courbe"], levels: [1, 2, 3] },
  { id: "fct_degre2_factorisee", label: "Degré 2 : racines et signe (forme factorisée)", boId: "STMGFO", prerequis: ["fct_degre2_courbe", "auto_signes"], levels: [1, 2, 3] },
  { id: "fct_degre2_factoriser", label: "Degré 2 : factoriser connaissant une racine", boId: "STMGFO", prerequis: ["fct_degre2_factorisee"], levels: [1, 2, 3] },
  { id: "fct_degre3", label: "Degré 3 : courbe, racines et signe", boId: "STMGFO", prerequis: ["fct_degre2_factorisee"], levels: [1, 2, 3] },
  { id: "fct_equations_puissance", label: "Résoudre x² = c et x³ = c", boId: "STMGFO", prerequis: ["auto_equations"], levels: [1, 2, 3] },
  { id: "fct_inverse", label: "Fonction inverse (Tle)", boId: "STMGFO", prerequis: ["fct_representation"], levels: [1, 2, 3] },
  { id: "fct_inverse_derivee", label: "Fonction inverse : dérivée et variations (Tle)", boId: "STMGFO", prerequis: ["fct_inverse"], levels: [1, 2, 3] },

  /* ═══════════════════════ DÉRIVATION (STMGDE) ═══════════════════════ */

  { id: "der_secante_tangente", label: "Dérivée — sécantes et tangente", boId: "STMGDE", prerequis: ["fct_taux_variation"], levels: [1, 2, 3] },
  { id: "der_nombre_derive", label: "Dérivée — nombre dérivé", boId: "STMGDE", prerequis: ["der_secante_tangente"], levels: [1, 2, 3] },
  { id: "der_tangente_equation", label: "Dérivée — équation de la tangente", boId: "STMGDE", prerequis: ["der_nombre_derive", "auto_droites"], levels: [1, 2, 3] },
  { id: "der_formules", label: "Dérivée — les formules de base", boId: "STMGDE", prerequis: ["der_nombre_derive"], levels: [1, 2, 3] },
  { id: "der_polynome", label: "Dérivée — polynômes de degré ≤ 3", boId: "STMGDE", prerequis: ["der_formules"], levels: [1, 2, 3] },
  { id: "der_variations", label: "Dérivée — signe et tableau de variations", boId: "STMGDE", prerequis: ["der_polynome", "auto_signes"], levels: [1, 2, 3] },
  { id: "der_optimisation", label: "Dérivée — problème d'optimisation", boId: "STMGDE", prerequis: ["der_variations"], levels: [1, 2, 3] },

  /* ══════════ EXPONENTIELLES ET LOGARITHME DÉCIMAL (STMGEX) ══════════ */
  //
  // Tout ce domaine relève de la classe terminale. L'année n'est donc pas
  // répétée dans chaque libellé : elle est portée par le domaine.

  { id: "expo_definition", label: "Fonction x ↦ aˣ : définition (Tle)", boId: "STMGEX", prerequis: ["suite_geometrique"], levels: [1, 2, 3] },
  { id: "expo_variations", label: "Fonction x ↦ kaˣ : variations et allure (Tle)", boId: "STMGEX", prerequis: ["expo_definition"], levels: [1, 2, 3] },
  { id: "expo_proprietes", label: "Propriétés algébriques de aˣ (Tle)", boId: "STMGEX", prerequis: ["expo_definition", "auto_fractions_puissances"], levels: [1, 2, 3] },
  { id: "expo_taux_moyen", label: "Taux d'évolution moyen (Tle)", boId: "STMGEX", prerequis: ["expo_proprietes", "auto_evo_enchainees"], levels: [1, 2, 3] },
  { id: "expo_taux_equivalent", label: "Taux équivalent sur une autre période (Tle)", boId: "STMGEX", prerequis: ["expo_taux_moyen"], levels: [1, 2, 3] },
  { id: "log_definition", label: "Logarithme décimal : définition (Tle)", boId: "STMGEX", prerequis: ["expo_definition"], levels: [1, 2, 3] },
  { id: "log_proprietes", label: "Propriétés algébriques de log (Tle)", boId: "STMGEX", prerequis: ["log_definition"], levels: [1, 2, 3] },
  { id: "log_equations", label: "Résoudre aˣ = b avec le logarithme (Tle)", boId: "STMGEX", prerequis: ["log_proprietes"], levels: [1, 2, 3] },
  { id: "log_applications", label: "Logarithme : durées et ordres de grandeur (Tle)", boId: "STMGEX", prerequis: ["log_equations"], levels: [1, 2, 3] },

  /* ═════════════════════ DONNÉES CROISÉES (STMGDC) ═════════════════════ */

  { id: "donnees_tableau_croise", label: "Tableau croisé d'effectifs", boId: "STMGDC", prerequis: [], levels: [1, 2, 3] },
  { id: "donnees_frequences", label: "Fréquences marginales et conditionnelles", boId: "STMGDC", prerequis: ["donnees_tableau_croise", "auto_proportion"], levels: [1, 2, 3] },
  { id: "donnees_filtres", label: "Filtrer des données (ET, OU, NON)", boId: "STMGDC", prerequis: ["donnees_tableau_croise"], levels: [1, 2, 3] },

  /* ═══════════ STATISTIQUE À DEUX VARIABLES (STMGST) ═══════════ */
  //
  // Domaine entièrement de terminale, comme STMGEX.

  { id: "stat_nuage", label: "Nuage de points (Tle)", boId: "STMGST", prerequis: ["auto_lecture_graphique"], levels: [1, 2, 3] },
  { id: "stat_ajustement", label: "Ajustement affine (Tle)", boId: "STMGST", prerequis: ["stat_nuage", "auto_droites"], levels: [1, 2, 3] },
  { id: "stat_interpoler", label: "Interpoler et extrapoler (Tle)", boId: "STMGST", prerequis: ["stat_ajustement"], levels: [1, 2, 3] },
  { id: "stat_moindres_carres", label: "Méthode des moindres carrés (Tle)", boId: "STMGST", prerequis: ["stat_ajustement"], levels: [1, 2, 3] },
  { id: "stat_changement_variable", label: "Changement de variable pour linéariser (Tle)", boId: "STMGST", prerequis: ["stat_ajustement"], levels: [1, 2, 3] },

  /* ═══════════ PROBABILITÉS CONDITIONNELLES (STMGPR) ═══════════ */

  { id: "proba_conditionnelle_tableau", label: "Probabilité conditionnelle sur un tableau", boId: "STMGPR", prerequis: ["donnees_frequences"], levels: [1, 2, 3] },
  { id: "proba_conditionnelle_distinguer", label: "Ne pas confondre les probabilités conditionnelles", boId: "STMGPR", prerequis: ["proba_conditionnelle_tableau"], levels: [1, 2, 3] },
  { id: "proba_epreuves_independantes", label: "Deux épreuves indépendantes", boId: "STMGPR", prerequis: ["proba_conditionnelle_tableau"], levels: [1, 2, 3] },
  { id: "proba_arbre", label: "Arbre de probabilités : construire (Tle)", boId: "STMGPR", prerequis: ["proba_conditionnelle_tableau"], levels: [1, 2, 3] },
  { id: "proba_arbre_calcul", label: "Arbre : chemins et probabilités totales (Tle)", boId: "STMGPR", prerequis: ["proba_arbre"], levels: [1, 2, 3] },
  { id: "proba_independance", label: "Indépendance de deux événements (Tle)", boId: "STMGPR", prerequis: ["proba_arbre_calcul"], levels: [1, 2, 3] },

  /* ═══ VARIABLES ALÉATOIRES ET LOI BINOMIALE (STMGVA) ═══ */

  { id: "va_loi_probabilite", label: "Variable aléatoire : loi de probabilité", boId: "STMGVA", prerequis: ["proba_epreuves_independantes"], levels: [1, 2, 3] },
  { id: "va_esperance", label: "Espérance d'une variable aléatoire", boId: "STMGVA", prerequis: ["va_loi_probabilite"], levels: [1, 2, 3] },
  { id: "va_bernoulli", label: "Loi de Bernoulli", boId: "STMGVA", prerequis: ["va_loi_probabilite"], levels: [1, 2, 3] },
  { id: "va_echantillonnage", label: "Fluctuation d'échantillonnage", boId: "STMGVA", prerequis: ["va_bernoulli"], levels: [1, 2, 3] },
  { id: "va_binomiale_reconnaitre", label: "Loi binomiale : reconnaître (Tle)", boId: "STMGVA", prerequis: ["va_bernoulli", "proba_arbre_calcul"], levels: [1, 2, 3] },
  { id: "va_binomiale_coefficients", label: "Coefficients binomiaux et triangle de Pascal (Tle)", boId: "STMGVA", prerequis: ["va_binomiale_reconnaitre"], levels: [1, 2, 3] },
  { id: "va_binomiale_calcul", label: "Loi binomiale : calculer (Tle)", boId: "STMGVA", prerequis: ["va_binomiale_coefficients"], levels: [1, 2, 3] },

  /* ═══════ ALGORITHMIQUE, TABLEUR ET LOGIQUE (STMGAL) ═══════ */

  { id: "algo_variables", label: "Variables, compteur et accumulateur", boId: "STMGAL", prerequis: [], levels: [1, 2, 3] },
  { id: "algo_boucles", label: "Boucles et instruction conditionnelle", boId: "STMGAL", prerequis: ["algo_variables"], levels: [1, 2, 3] },
  { id: "algo_listes", label: "Listes", boId: "STMGAL", prerequis: ["algo_boucles"], levels: [1, 2, 3] },
  { id: "algo_fonctions", label: "Fonctions en Python", boId: "STMGAL", prerequis: ["algo_variables"], levels: [1, 2, 3] },
  { id: "tableur_formules", label: "Tableur : écrire une formule", boId: "STMGAL", prerequis: [], levels: [1, 2, 3] },
  { id: "tableur_recopie", label: "Tableur : recopier et exploiter", boId: "STMGAL", prerequis: ["tableur_formules"], levels: [1, 2, 3] },
  { id: "logique_connecteurs", label: "Logique : et, ou, non", boId: "STMGAL", prerequis: [], levels: [1, 2, 3] },
  { id: "logique_raisonnement", label: "Contre-exemple et réciproque", boId: "STMGAL", prerequis: ["logique_connecteurs"], levels: [1, 2, 3] },
];
