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
  // ⭐ SCINDÉE LE 28/08/2026, EXACTEMENT COMME LA 5e. `prop_proportionnalite`
  // portait NEUF micros et deux objets : la proportionnalité elle-même
  // (reconnaître, tableau, quatrième, coefficient, problème) et les RAPPORTS
  // (pourcentage, coefficient multiplicateur, évolution). La 5e a déjà cette
  // coupure, avec les mêmes identifiants — l'élève la retrouve d'une année sur
  // l'autre, et les six micros qui restent ici correspondent une à une aux six
  // de la 5e.
  //
  // ⛔ ET C'EST AUSSI UN TROU DU BO QUI SE FERME : le mot « ratio » n'existait
  // nulle part en 4e, alors que le programme du cycle 4 (p. 134) en fait une
  // connaissance — « deux nombres a et b sont dans le ratio 2 : 3 si
  // a/2 = b/3 » — et lui consacre une compétence de partage.
  //
  // ⚠️ LE SENS DES PRÉREQUIS EST À SENS UNIQUE, et il a fallu l'obtenir : les
  // prérequis de `prop_probleme` citaient `prop_pourcentage` et
  // `prop_evolution`, qui partent ici. Ils ont été allégés (voir microSkills),
  // sans quoi les deux notions se seraient mutuellement dépendantes.
  {
    id: "prop_ratio_pourcentage",
    label: "Ratios et pourcentages",
    boId: "BO4P1",
    prerequis: ["prop_proportionnalite"],
    levels: [1, 2, 3],
  },
  // ⭐ OUVERTE LE 28/08/2026. Elle ferme DEUX trous du BO et complète DEUX
  // partiels, ce qui en fait le meilleur rapport de tout ce qui restait :
  //   · 4e-C-transformations-2 « Utiliser un rapport de réduction ou
  //     d'agrandissement (architecture, maquettes) pour calculer des longueurs,
  //     des aires, des volumes » — TROU ;
  //   · 4e-C-transformations-3 « Utiliser l'échelle d'une carte » — TROU ;
  //   · 4e-C-transformations-1, dont l'effet sur les AIRES et les VOLUMES
  //     manquait ; 4e-B-proportionnalite-8, qui n'avait que les pourcentages.
  //
  // ⭐ UN SEUL OBJET, ET LE BO LE DIT : une échelle EST une réduction de rapport
  // 1/k, et le programme cite « pourcentages, échelles, agrandissement
  // réduction » dans la même compétence. Les trois micros neuves sont une seule
  // idée déroulée — on multiplie les longueurs par k, donc les aires par k² et
  // les volumes par k³.
  //
  // ⭐ MÊME IDENTIFIANT QU'EN 6e, où la notion existe déjà avec ses quatre
  // micros et 76 items (`echelles.bank.ts`). Les trois micros de lecture d'une
  // échelle sont RÉACTIVÉES ici, avec des énoncés de 4e — cartes, maquettes,
  // plans d'architecte. ⛔ Frédéric, 28/08 : on garde le rappel de 6e. Renvoyer
  // un élève de 4e vers une fiche de 6e serait un jugement ; le moteur
  // d'étoiles, lui, fait le tri sans rien dire à personne.
  {
    id: "prop_echelle",
    label: "Agrandissement, réduction et échelles",
    boId: "BO4M2",
    prerequis: ["prop_proportionnalite", "aire_surface"],
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
  // ⭐ OUVERTE LE 28/08/2026. Elle ferme DEUX trous du BO et complète DEUX
  // partiels — même profil que `prop_echelle` :
  //   · 4e-C-grandeurs-1 « Notion de grandeur produit et de grandeur
  //     quotient » — TROU. Une vitesse était CALCULÉE dans `prop_probleme`,
  //     jamais NOMMÉE, et aucun item ne composait des unités ;
  //   · 4e-C-grandeurs-6 « Vérifier la cohérence des résultats du point de vue
  //     des unités » — TROU ;
  //   · 4e-C-grandeurs-5, dont le mot « composées » n'était pas couvert ;
  //   · 4e-C-grandeurs-7, où seuls les VOLUMES se convertissaient — aucune
  //     micro de 4e ne convertissait une longueur ni une aire.
  //
  // ⭐ UN SEUL OBJET, ET C'EST CE QUI JUSTIFIE DE METTRE LA CONVERSION ICI : les
  // unités ne SUIVENT pas le calcul, elles SE CALCULENT. Composer (m × m = m²,
  // km ÷ h = km/h), convertir, contrôler : c'est le même geste vu trois fois.
  // Une conversion rangée dans « aires » serait une recette ; rangée ici, elle
  // est une conséquence.
  {
    id: "grandeur_composee",
    label: "Grandeurs composées et unités",
    boId: "BO4M1",
    prerequis: ["aire_surface", "volume_solide", "prop_proportionnalite"],
    levels: [1, 2, 3],
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
  // ⭐ OUVERTE LE 28/08/2026. Elle ferme la puce 4e-B-probabilites-7 du BO,
  // « Faire le lien entre fréquence et probabilité », qui était vide : le mot
  // « fréquence » n'apparaissait dans `probabilites.bank.ts` que comme LEURRE
  // d'un QCM de vocabulaire.
  //
  // ⭐ NOTION À PART, PAS GREFFE, et pour deux raisons qui vont ensemble :
  // `proba_experience` porte déjà huit micros, et la 6e a fait exactement cette
  // coupure (`proba_frequence`, trois micros, 60 items). Même identifiant, donc
  // l'élève retrouve la même séparation d'une année sur l'autre.
  //
  // ⭐ CE QUE LA 4e AJOUTE : la 6e CONSTATE que l'écart se réduit quand on
  // répète ; la 4e dit POURQUOI ça compte. Six lancers donnant quatre « pile »
  // ne prouvent rien ; six cents lancers donnant quatre cents « pile » prouvent
  // que la pièce est truquée. C'est le premier raisonnement statistique de la
  // scolarité, et il tient dans une micro.
  //
  // ⚠️ Le sens des prérequis est à SENS UNIQUE : `proba_frequence` dépend de
  // `proba_experience` et de `stat_statistique`, jamais l'inverse.
  {
    id: "proba_frequence",
    label: "Fréquences observées et probabilité",
    boId: "BO4D2",
    prerequis: ["proba_experience", "stat_statistique"],
    levels: [1, 2],
  },


];