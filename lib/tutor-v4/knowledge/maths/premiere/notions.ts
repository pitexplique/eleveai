// knowledge/maths/premiere/notions.ts
//
// Notions (chapitres) du module spécifique de mathématiques de Première
// générale — les élèves SANS la spécialité maths. Alignées sur le programme
// officiel, rien hors programme.
//
// Organisation, dans l'ordre du programme :
// - Automatismes            : la partie transversale, entretenue toute l'année
//                             (et la première partie de l'épreuve, 6 points)
// - Information chiffrée    : statistiques à deux caractères, ajustement affine
// - Phénomènes aléatoires   : conditionnelles, indépendance, Bernoulli
// - Variation linéaire      : suites arithmétiques, fonctions affines
// - Modélisation quadratique: polynômes de degré 2 (sans discriminant)
// - Variation exponentielle : suites géométriques, fonctions x ↦ a^x
// - Dérivation              : polynômes, tangente, signe et variations
//
// Deux garde-fous tirés du texte, à ne pas franchir en écrivant les banques :
//   ⛔ le discriminant n'est PAS au programme — les racines d'un polynôme de
//      degré 2 ne s'obtiennent QUE par la forme factorisée ;
//   ⛔ les suites géométriques sont à termes strictement positifs.
//
// Les identifiants sont préfixés par domaine (auto_, info_, alea_, lin_, quad_,
// expo_, der_) : la spécialité a ses propres notions « suites », « derivation »,
// « probabilites_conditionnelles », et rien ne doit se confondre à la lecture
// d'un identifiant d'item.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  /* ===================== AUTOMATISMES (BOP1AU) ===================== */

  {
    id: "auto_calcul_numerique",
    label: "Automatismes : calcul numérique",
    boId: "BOP1AU",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "auto_calcul_algebrique",
    label: "Automatismes : calcul algébrique",
    boId: "BOP1AU",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "auto_proportions_pourcentages",
    label: "Automatismes : proportions et pourcentages",
    boId: "BOP1AU",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "auto_evolutions_variations",
    label: "Automatismes : évolutions et variations",
    boId: "BOP1AU",
    prerequis: ["auto_proportions_pourcentages"],
    levels: [1, 2, 3],
  },
  {
    id: "auto_fonctions_representations",
    label: "Automatismes : fonctions et représentations",
    boId: "BOP1AU",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "auto_statistiques",
    label: "Automatismes : statistiques",
    boId: "BOP1AU",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "auto_probabilites",
    label: "Automatismes : probabilités",
    boId: "BOP1AU",
    prerequis: [],
    levels: [1, 2, 3],
  },

  /* ============ ANALYSE DE L'INFORMATION CHIFFRÉE (BOP1IC) ============ */

  {
    id: "info_tableau_croise",
    label: "Tableau croisé d'effectifs",
    boId: "BOP1IC",
    prerequis: ["auto_proportions_pourcentages"],
    levels: [1, 2, 3],
  },
  {
    id: "info_representations_croisees",
    label: "Représenter le croisement de deux caractères",
    boId: "BOP1IC",
    prerequis: ["info_tableau_croise"],
    levels: [1, 2, 3],
  },
  {
    id: "info_nuage_point_moyen",
    label: "Nuage de points et point moyen",
    boId: "BOP1IC",
    prerequis: ["auto_fonctions_representations"],
    levels: [1, 2, 3],
  },
  {
    id: "info_ajustement_affine",
    label: "Ajustement affine, interpolation et extrapolation",
    boId: "BOP1IC",
    prerequis: ["info_nuage_point_moyen"],
    levels: [1, 2, 3],
  },
  {
    id: "info_tableur",
    label: "Lire et exploiter un tableur",
    boId: "BOP1IC",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "info_filtre_donnees",
    label: "Filtrer un fichier de données (ET, OU, NON)",
    boId: "BOP1IC",
    prerequis: ["info_tableur", "info_tableau_croise"],
    levels: [1, 2, 3],
  },

  /* ================== PHÉNOMÈNES ALÉATOIRES (BOP1AL) ================== */

  {
    id: "alea_conditionnelle",
    label: "Probabilité conditionnelle",
    boId: "BOP1AL",
    prerequis: ["auto_probabilites", "info_tableau_croise"],
    levels: [1, 2, 3],
  },
  {
    id: "alea_arbre_pondere",
    label: "Arbre pondéré",
    boId: "BOP1AL",
    prerequis: ["alea_conditionnelle"],
    levels: [1, 2, 3],
  },
  {
    id: "alea_independance",
    label: "Indépendance de deux évènements",
    boId: "BOP1AL",
    prerequis: ["alea_conditionnelle"],
    levels: [1, 2, 3],
  },
  {
    id: "alea_bernoulli",
    label: "Répétition d'épreuves de Bernoulli",
    boId: "BOP1AL",
    prerequis: ["alea_arbre_pondere", "alea_independance"],
    levels: [1, 2, 3],
  },

  /* ==================== VARIATION LINÉAIRE (BOP1VL) ==================== */

  {
    id: "lin_suite_arithmetique",
    label: "Suites arithmétiques",
    boId: "BOP1VL",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "lin_fonction_affine",
    label: "Fonctions affines",
    boId: "BOP1VL",
    prerequis: ["auto_fonctions_representations"],
    levels: [1, 2, 3],
  },
  {
    id: "lin_modele_seuil",
    label: "Modéliser une croissance linéaire, problème de seuil",
    boId: "BOP1VL",
    prerequis: ["lin_suite_arithmetique", "lin_fonction_affine"],
    levels: [1, 2, 3],
  },

  /* ================= MODÉLISATION QUADRATIQUE (BOP1MQ) ================= */

  {
    id: "quad_parabole_expression",
    label: "Parabole et expression de degré 2",
    boId: "BOP1MQ",
    prerequis: ["auto_fonctions_representations"],
    levels: [1, 2, 3],
  },
  {
    id: "quad_elements_caracteristiques",
    label: "Sommet, axe de symétrie et variations",
    boId: "BOP1MQ",
    prerequis: ["quad_parabole_expression"],
    levels: [1, 2, 3],
  },
  {
    id: "quad_racines_signe",
    label: "Racines et signe par la forme factorisée",
    boId: "BOP1MQ",
    prerequis: ["quad_parabole_expression", "auto_calcul_algebrique"],
    levels: [1, 2, 3],
  },

  /* ================== VARIATION EXPONENTIELLE (BOP1VE) ================== */

  {
    id: "expo_suite_geometrique",
    label: "Suites géométriques",
    boId: "BOP1VE",
    prerequis: ["auto_evolutions_variations"],
    levels: [1, 2, 3],
  },
  {
    id: "expo_fonction_base_a",
    label: "Fonctions exponentielles x ↦ a^x",
    boId: "BOP1VE",
    prerequis: ["expo_suite_geometrique"],
    levels: [1, 2, 3],
  },
  {
    id: "expo_taux_moyen",
    label: "Taux d'évolution moyen",
    boId: "BOP1VE",
    prerequis: ["expo_suite_geometrique", "auto_evolutions_variations"],
    levels: [1, 2, 3],
  },
  {
    id: "expo_modele_seuil",
    label: "Modéliser une évolution exponentielle, problème de seuil",
    boId: "BOP1VE",
    prerequis: ["expo_suite_geometrique", "expo_fonction_base_a"],
    levels: [1, 2, 3],
  },

  /* ======================== DÉRIVATION (BOP1DE) ======================== */

  {
    id: "der_nombre_derive_tangente",
    label: "Nombre dérivé et tangente",
    boId: "BOP1DE",
    prerequis: ["auto_fonctions_representations", "lin_fonction_affine"],
    levels: [1, 2, 3],
  },
  {
    id: "der_derivee_polynome",
    label: "Dérivée d'une fonction polynôme",
    boId: "BOP1DE",
    prerequis: ["der_nombre_derive_tangente"],
    levels: [1, 2, 3],
  },
  {
    id: "der_signe_variations",
    label: "Signe de la dérivée et tableau de variations",
    boId: "BOP1DE",
    prerequis: ["der_derivee_polynome", "quad_racines_signe"],
    levels: [1, 2, 3],
  },
];
