// knowledge/maths/4e/notions.ts
//
// Notions de mathématiques pour la classe de 4e.
// Ce fichier est aligné avec la structure 5e, tout en raffinant
// davantage l’algèbre, qui devient un bloc central en 4e.
//
// Choix retenu :
// - conserver un BO simple et stable ;
// - découper l’algèbre en plusieurs notions distinctes ;
// - séparer clairement périmètres, aires et parallélogrammes ;
// - améliorer la finesse du suivi pédagogique dans Tutor V4.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [

      // =========================
    // ALGO
    // =========================
      {
    id: "algo_programmation",
    label: "Algorithmique et programmation",
    boId: "BO4I1",
    prerequis: ["litteral_expression", "prop_proportionnalite", "equation_resolution"],
    levels: [1, 2, 3],
  },
  // =========================
  // NOMBRES
  // =========================
  {
    id: "relatif_operation",
    label: "Opérations sur les nombres relatifs",
    boId: "BO4N1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  // ⭐ LES FRACTIONS SONT SCINDÉES EN DEUX (26/08/2026). Elles portaient DOUZE
  // micro-compétences, contre une médiane de sept sur les dix-neuf notions de la
  // classe — Frédéric : « une notion ne doit pas avoir 12 micro-compétences ».
  //
  // Le découpage suit la ligne de fracture déjà présente dans les PRÉREQUIS :
  // aucun des sept micros de calcul n'est prérequis d'un des cinq micros de
  // nombre, donc la coupure ne crée aucun cycle et ne casse aucune progression.
  //
  // ⭐ ET C'EST LE DÉCOUPAGE DE LA 5e, à l'identique : elle sépare déjà
  // `fraction_nombre` de `fraction_calcul`, chacune avec sa fiche. L'élève
  // retrouve la même coupure d'une année sur l'autre.
  // ⚠️ `fraction_nombre` GARDE son identifiant : dix fichiers le citent, dont
  // `lib/matrice/coach.ts` qui associe une notion de fractions à chaque classe.
  {
    id: "fraction_nombre",
    label: "Fractions et nombres rationnels",
    boId: "BO4N2",
    prerequis: ["relatif_operation"],
    levels: [1, 2, 3],
  },
  {
    id: "fraction_calcul",
    label: "Calculer avec les fractions",
    boId: "BO4N2",
    prerequis: ["fraction_nombre"],
    levels: [1, 2, 3],
  },
  // ⭐ OUVERTE LE 28/08/2026. Le programme du cycle 4 (BOEN n° 31 du 30 juillet
  // 2020, p. 130-131) porte trois puces que la 4e ne couvrait PAS : « Puissance
  // d'un nombre (exposants entiers, positifs ou négatifs) », « Notation
  // scientifique », et « Effectuer des calculs numériques simples impliquant des
  // puissances ». Zéro occurrence du mot « puissance » dans les vingt banques.
  //
  // ⭐ C'EST LA VALEUR SÛRE DU CHANTIER : les puissances restent en 4e dans le
  // programme 2020 ET dans celui qui s'applique à partir de septembre 2027,
  // contrairement à Thalès et au cosinus, qui passent en 3e.
  //
  // PRÉREQUIS : les relatifs pour l'exposant négatif et le signe de la base
  // ((−2)³ contre −2³), les fractions pour lire 10⁻³ comme 1/1000.
  {
    id: "puissance_ecriture",
    label: "Puissances et notation scientifique",
    boId: "BO4N3",
    prerequis: ["relatif_operation", "fraction_nombre"],
    levels: [1, 2, 3],
  },

  // =========================
  // PROPORTIONNALITÉ
  // =========================
  {
    id: "prop_proportionnalite",
    label: "Proportionnalité",
    boId: "BO4P1",
    prerequis: ["fraction_nombre"],
    levels: [1, 2, 3],
  },

  // =========================
  // ALGÈBRE
  // =========================
  {
    id: "litteral_expression",
    label: "Expressions littérales",
    boId: "BO4A1",
    prerequis: ["relatif_operation"],
    levels: [1, 2, 3],
  },
  {
    id: "litteral_distributivite",
    label: "Distributivité",
    boId: "BO4A1",
    prerequis: ["litteral_expression"],
    levels: [1, 2, 3],
  },
  {
    id: "litteral_identite_remarquable",
    label: "Identités remarquables",
    boId: "BO4A1",
    prerequis: ["litteral_distributivite"],
    levels: [1, 2, 3],
  },
  {
    id: "litteral_factorisation",
    label: "Factorisation",
    boId: "BO4A1",
    prerequis: ["litteral_distributivite", "litteral_identite_remarquable"],
    levels: [1, 2, 3],
  },
  {
    id: "equation_resolution",
    label: "Équations",
    boId: "BO4A1",
    prerequis: ["litteral_expression", "litteral_distributivite"],
    levels: [1, 2, 3],
  },

  // =========================
  // GÉOMÉTRIE PLANE
  // =========================

  {
    id: "pythagore_theoreme",
    label: "Pythagore et sa réciproque",
    boId: "BO4G1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "thales_theoreme",
    label: "Thalès et sa réciproque",
    boId: "BO4G1",
    prerequis: ["prop_proportionnalite"],
    levels: [1, 2, 3],
  },
  {
    id: "trigo_cosinus",
    label: "Cosinus dans le triangle rectangle",
    boId: "BO4G1",
    prerequis: ["pythagore_theoreme"],
    levels: [1, 2, 3],
  },
  {
    id: "quadrilatere_parallelogramme",
    label: "Parallélogrammes",
    boId: "BO4G1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "sym_transformation",
    label: "Transformations (symétrie, translation, rotation)",
    boId: "BO4G1",
    prerequis: [],
    levels: [1, 2],
  },

  // =========================
  // GRANDEURS ET MESURES
  // =========================
  {
    id: "aire_perimetre",
    label: "Périmètres",
    boId: "BO4M1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "aire_surface",
    label: "Aires",
    boId: "BO4M1",
    prerequis: ["aire_perimetre"],
    levels: [1, 2, 3],
  },

  // =========================
  // GÉOMÉTRIE DANS L’ESPACE
  // =========================
  {
    id: "volume_solide",
    label: "Volumes",
    boId: "BO4G2",
    prerequis: ["aire_surface"],
    levels: [1, 2],
  },

  // =========================
  // DONNÉES
  // =========================
  {
    id: "stat_statistique",
    label: "Statistiques",
    boId: "BO4D1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "proba_experience",
    label: "Probabilités",
    boId: "BO4D2",
    prerequis: ["fraction_nombre", "stat_statistique"],
    levels: [1, 2],
  },


];