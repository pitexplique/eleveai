// knowledge/maths/premiere/notions.ts
//
// Notions du module spécifique de mathématiques de Première générale — les
// élèves SANS la spécialité maths. Alignées sur le programme, rien hors
// programme.
//
// ─────────────────────────────────────────────────────────────────────────────
// DÉCOUPAGE FIN — décision de Frédéric le 14/08/2026.
//
// La première version regroupait 204 micro-compétences en 30 notions : jusqu'à
// 14 micros pour « calcul algébrique », 12 pour « fonctions et représentations ».
// Au coach, une notion = une séance : 14 micros, c'est une séance qui ne finit
// jamais et une barre qui n'avance pas. Ces élèves-là, pour la plupart, ne
// s'entendent pas avec les maths ; il leur faut des objectifs qu'on atteint.
//
// D'où la règle ici : 3 à 5 micro-compétences par notion, jamais plus.
// Une notion se termine en une dizaine de minutes, et elle se coche.
//
// Ça sert aussi la progression spiralaire : « Suite arithmétique — reconnaître »
// en octobre, « Suite arithmétique — terme général » en janvier, « Problème de
// seuil » en mars. Des notions courtes se replacent dans l'année ; des gros
// chapitres, non.
//
// Les libellés portent le mot du chapitre quand la notion seule serait ambiguë
// (« Dérivée — polynômes » et non « Polynômes »), parce que la notion s'affiche
// parfois sans son domaine.
// ─────────────────────────────────────────────────────────────────────────────
//
// Deux garde-fous tirés du texte, à ne pas franchir en écrivant les banques :
//   ⛔ le discriminant n'est PAS au programme — les racines d'un polynôme de
//      degré 2 ne s'obtiennent QUE par la forme factorisée ;
//   ⛔ les suites géométriques sont à termes strictement positifs.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  /* ═══════════════════ AUTOMATISMES (BOP1AU) ═══════════════════ */

  { id: "auto_comparer", label: "Comparer deux nombres", boId: "BOP1AU", prerequis: [], levels: [1, 2, 3] },
  { id: "auto_fractions_puissances", label: "Fractions, puissances et écritures", boId: "BOP1AU", prerequis: [], levels: [1, 2, 3] },
  { id: "auto_ordres_unites", label: "Ordre de grandeur et unités", boId: "BOP1AU", prerequis: ["auto_fractions_puissances"], levels: [1, 2, 3] },
  { id: "auto_developper_factoriser", label: "Développer et factoriser", boId: "BOP1AU", prerequis: [], levels: [1, 2, 3] },
  { id: "auto_equations", label: "Équations et inéquations", boId: "BOP1AU", prerequis: ["auto_developper_factoriser"], levels: [1, 2, 3] },
  { id: "auto_signe_expression", label: "Signe d'une expression", boId: "BOP1AU", prerequis: ["auto_equations"], levels: [1, 2, 3] },
  { id: "auto_formules", label: "Formules littérales", boId: "BOP1AU", prerequis: ["auto_equations"], levels: [1, 2, 3] },
  { id: "auto_proportion", label: "Proportions", boId: "BOP1AU", prerequis: ["auto_fractions_puissances"], levels: [1, 2, 3] },
  { id: "auto_partie_tout", label: "Partie et tout", boId: "BOP1AU", prerequis: ["auto_proportion"], levels: [1, 2, 3] },
  { id: "auto_coefficient_multiplicateur", label: "Coefficient multiplicateur", boId: "BOP1AU", prerequis: ["auto_proportion"], levels: [1, 2, 3] },
  { id: "auto_taux_evolution", label: "Taux d'évolution", boId: "BOP1AU", prerequis: ["auto_coefficient_multiplicateur"], levels: [1, 2, 3] },
  { id: "auto_lecture_graphique", label: "Lire un graphique", boId: "BOP1AU", prerequis: [], levels: [1, 2, 3] },
  { id: "auto_resolution_graphique", label: "Résoudre graphiquement", boId: "BOP1AU", prerequis: ["auto_lecture_graphique"], levels: [1, 2, 3] },
  { id: "auto_droites", label: "Droites et coefficient directeur", boId: "BOP1AU", prerequis: ["auto_lecture_graphique"], levels: [1, 2, 3] },
  { id: "auto_lire_statistiques", label: "Lire des statistiques", boId: "BOP1AU", prerequis: ["auto_lecture_graphique"], levels: [1, 2, 3] },
  { id: "auto_indicateurs", label: "Moyenne, médiane, quartiles", boId: "BOP1AU", prerequis: ["auto_lire_statistiques"], levels: [1, 2, 3] },
  { id: "auto_proba_base", label: "Probabilités : les bases", boId: "BOP1AU", prerequis: ["auto_proportion"], levels: [1, 2, 3] },
  { id: "auto_proba_lecture", label: "Probabilités : lire un tableau, un arbre", boId: "BOP1AU", prerequis: ["auto_proba_base"], levels: [1, 2, 3] },

  /* ══════════ ANALYSE DE L'INFORMATION CHIFFRÉE (BOP1IC) ══════════ */

  { id: "info_tableau_croise", label: "Tableau croisé : lire et compléter", boId: "BOP1IC", prerequis: [], levels: [1, 2, 3] },
  { id: "info_frequences", label: "Fréquences marginales et conditionnelles", boId: "BOP1IC", prerequis: ["info_tableau_croise", "auto_proportion"], levels: [1, 2, 3] },
  { id: "info_representations_croisees", label: "Représenter deux caractères", boId: "BOP1IC", prerequis: ["info_tableau_croise"], levels: [1, 2, 3] },
  { id: "info_nuage", label: "Nuage de points", boId: "BOP1IC", prerequis: ["auto_lecture_graphique"], levels: [1, 2, 3] },
  { id: "info_point_moyen", label: "Point moyen", boId: "BOP1IC", prerequis: ["info_nuage"], levels: [1, 2, 3] },
  { id: "info_ajustement_affine", label: "Ajustement affine", boId: "BOP1IC", prerequis: ["info_nuage", "auto_droites"], levels: [1, 2, 3] },
  { id: "info_interpoler_extrapoler", label: "Interpoler et extrapoler", boId: "BOP1IC", prerequis: ["info_ajustement_affine"], levels: [1, 2, 3] },
  { id: "info_tableur", label: "Tableur", boId: "BOP1IC", prerequis: [], levels: [1, 2, 3] },
  { id: "info_filtre_donnees", label: "Filtrer des données (ET, OU, NON)", boId: "BOP1IC", prerequis: ["info_tableur", "info_tableau_croise"], levels: [1, 2, 3] },

  /* ═════════════════ PHÉNOMÈNES ALÉATOIRES (BOP1AL) ═════════════════ */

  { id: "alea_conditionnelle", label: "Probabilité conditionnelle : reconnaître", boId: "BOP1AL", prerequis: ["auto_proba_lecture", "info_frequences"], levels: [1, 2, 3] },
  { id: "alea_conditionnelle_calcul", label: "Probabilité conditionnelle : calculer", boId: "BOP1AL", prerequis: ["alea_conditionnelle"], levels: [1, 2, 3] },
  { id: "alea_arbre", label: "Arbre pondéré : lire et construire", boId: "BOP1AL", prerequis: ["alea_conditionnelle"], levels: [1, 2, 3] },
  { id: "alea_arbre_calcul", label: "Arbre pondéré : calculer", boId: "BOP1AL", prerequis: ["alea_arbre"], levels: [1, 2, 3] },
  { id: "alea_independance", label: "Indépendance de deux évènements", boId: "BOP1AL", prerequis: ["alea_conditionnelle_calcul"], levels: [1, 2, 3] },
  { id: "alea_bernoulli", label: "Épreuves de Bernoulli : reconnaître", boId: "BOP1AL", prerequis: ["alea_independance"], levels: [1, 2, 3] },
  { id: "alea_bernoulli_calcul", label: "Répétition d'épreuves : calculer", boId: "BOP1AL", prerequis: ["alea_bernoulli", "alea_arbre_calcul"], levels: [1, 2, 3] },

  /* ═══════════════════ VARIATION LINÉAIRE (BOP1VL) ═══════════════════ */

  { id: "lin_suite_arithmetique", label: "Suite arithmétique : reconnaître", boId: "BOP1VL", prerequis: [], levels: [1, 2, 3] },
  { id: "lin_suite_terme_general", label: "Suite arithmétique : terme général", boId: "BOP1VL", prerequis: ["lin_suite_arithmetique"], levels: [1, 2, 3] },
  { id: "lin_affine", label: "Fonction affine", boId: "BOP1VL", prerequis: ["auto_droites"], levels: [1, 2, 3] },
  { id: "lin_affine_lecture", label: "Fonction affine : lire et exploiter", boId: "BOP1VL", prerequis: ["lin_affine"], levels: [1, 2, 3] },
  { id: "lin_modeliser", label: "Modéliser une croissance linéaire", boId: "BOP1VL", prerequis: ["lin_suite_terme_general", "lin_affine"], levels: [1, 2, 3] },
  { id: "lin_seuil", label: "Problème de seuil : croissance linéaire", boId: "BOP1VL", prerequis: ["lin_modeliser"], levels: [1, 2, 3] },

  /* ═════════════════ MODÉLISATION QUADRATIQUE (BOP1MQ) ═════════════════ */

  { id: "quad_parabole", label: "Parabole et expression de degré 2", boId: "BOP1MQ", prerequis: ["auto_lecture_graphique"], levels: [1, 2, 3] },
  { id: "quad_sommet_axe", label: "Parabole : sommet et axe de symétrie", boId: "BOP1MQ", prerequis: ["quad_parabole"], levels: [1, 2, 3] },
  { id: "quad_variations", label: "Parabole : variations et extremum", boId: "BOP1MQ", prerequis: ["quad_sommet_axe"], levels: [1, 2, 3] },
  { id: "quad_racines_signe", label: "Racines et signe par la forme factorisée", boId: "BOP1MQ", prerequis: ["quad_parabole", "auto_signe_expression"], levels: [1, 2, 3] },

  /* ═════════════════ VARIATION EXPONENTIELLE (BOP1VE) ═════════════════ */

  { id: "expo_suite_geometrique", label: "Suite géométrique : reconnaître", boId: "BOP1VE", prerequis: ["auto_coefficient_multiplicateur"], levels: [1, 2, 3] },
  { id: "expo_suite_terme_general", label: "Suite géométrique : terme général", boId: "BOP1VE", prerequis: ["expo_suite_geometrique"], levels: [1, 2, 3] },
  { id: "expo_fonction", label: "Fonction exponentielle x ↦ a^x", boId: "BOP1VE", prerequis: ["expo_suite_geometrique"], levels: [1, 2, 3] },
  { id: "expo_fonction_lecture", label: "Fonction exponentielle : variations et courbe", boId: "BOP1VE", prerequis: ["expo_fonction"], levels: [1, 2, 3] },
  { id: "expo_taux_moyen", label: "Taux d'évolution moyen", boId: "BOP1VE", prerequis: ["expo_suite_geometrique", "auto_taux_evolution"], levels: [1, 2, 3] },
  { id: "expo_modeliser", label: "Modéliser une évolution exponentielle", boId: "BOP1VE", prerequis: ["expo_suite_terme_general"], levels: [1, 2, 3] },
  { id: "expo_seuil", label: "Problème de seuil : croissance exponentielle", boId: "BOP1VE", prerequis: ["expo_modeliser"], levels: [1, 2, 3] },

  /* ════════════════════════ DÉRIVATION (BOP1DE) ════════════════════════ */

  { id: "der_graphique", label: "Dérivée — lire un graphique", boId: "BOP1DE", prerequis: ["auto_lecture_graphique"], levels: [1, 2, 3] },
  { id: "der_nombre_derive", label: "Dérivée — nombre dérivé et tangente", boId: "BOP1DE", prerequis: ["der_graphique", "auto_droites"], levels: [1, 2, 3] },
  { id: "der_formules", label: "Dérivée — les formules de base", boId: "BOP1DE", prerequis: ["der_nombre_derive"], levels: [1, 2, 3] },
  { id: "der_polynome", label: "Dérivée — polynômes", boId: "BOP1DE", prerequis: ["der_formules"], levels: [1, 2, 3] },
  { id: "der_signe", label: "Dérivée — signe", boId: "BOP1DE", prerequis: ["der_polynome", "auto_signe_expression"], levels: [1, 2, 3] },
  { id: "der_variations", label: "Dérivée — tableau de variations", boId: "BOP1DE", prerequis: ["der_signe"], levels: [1, 2, 3] },
];
