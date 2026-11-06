import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

// Notions de seconde alignées sur le programme officiel (BO).
export const notions: NotionSource[] = [
  /* ===================== NOMBRES ET CALCULS (BO2N1) ===================== */
  {
    id: "reels_intervalles",
    // ⭐ « et valeur absolue » ajouté le 07/09/2026, et ce n'est pas cosmétique.
    // Le moteur de la matrice cherche la notion du programme AVANT le lexique,
    // en comptant les mots forts du libellé présents dans la question. « valeur
    // absolue » ne marquait donc AUCUN point en maths, tandis que le français
    // « Le verbe : valeurs temporelles… » en marquait un sur « valeurs » :
    // l'élève de seconde qui tapait « valeur absolue » ouvrait le coach de
    // FRANÇAIS. Le libellé est aussi plus juste — c'est bien dans ce bloc du BO
    // que vit valeur_absolue_distance.
    label: "Nombres réels, intervalles et valeur absolue",
    boId: "BO2N1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "arithmetique_entiers",
    label: "Multiples, diviseurs, pair et impair",
    boId: "BO2N1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "puissances_2de",
    label: "Puissances",
    boId: "BO2N1",
    prerequis: ["reels_intervalles"],
    levels: [1, 2, 3],
  },
  {
    id: "racine_carree_2de",
    label: "Racine carrée",
    boId: "BO2N1",
    prerequis: ["reels_intervalles"],
    levels: [1, 2, 3],
  },
  {
    id: "developpement_factorisation_2de",
    label: "Développement et factorisation",
    boId: "BO2N1",
    prerequis: ["reels_intervalles"],
    levels: [1, 2, 3],
  },
  {
    id: "identites_remarquables_2de",
    label: "Identités remarquables",
    boId: "BO2N1",
    prerequis: ["developpement_factorisation_2de"],
    levels: [1, 2, 3],
  },
  {
    id: "expressions_litterales_2de",
    label: "Expressions littérales",
    boId: "BO2N1",
    prerequis: ["developpement_factorisation_2de"],
    levels: [1, 2, 3],
  },
  {
    id: "equations_inequations_1er_degre",
    label: "Équations et inéquations du premier degré",
    boId: "BO2N1",
    prerequis: ["developpement_factorisation_2de", "reels_intervalles"],
    levels: [1, 2, 3],
  },

  /* ===================== GEOMETRIE (BO2G1) ===================== */
  {
    id: "vecteurs_plan",
    label: "Vecteurs du plan",
    boId: "BO2G1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "repere_coordonnees",
    label: "Repère et coordonnées",
    boId: "BO2G1",
    prerequis: ["reels_intervalles"],
    levels: [1, 2, 3],
  },
  {
    id: "droites_plan",
    label: "Droites du plan",
    boId: "BO2G1",
    prerequis: ["repere_coordonnees", "equations_inequations_1er_degre", "vecteurs_plan"],
    levels: [1, 2, 3],
  },
  {
    id: "geometrie_problemes_plan",
    label: "Problèmes de géométrie plane",
    boId: "BO2G1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  /* ===================== FONCTIONS (BO2F1) ===================== */
  // ⭐ AJOUTEE LE 08/09/2026. Le tableau de signes logeait jusque-la dans
  // « Vocabulaire des fonctions », a cote de image et antecedent — or ce n'est
  // pas du vocabulaire, c'est une TECHNIQUE DE RESOLUTION, enseignee comme un
  // chapitre a part vers novembre-decembre. La STMG portait deja une notion
  // dediee (`auto_signes`), avec la meme progression.
  {
    id: "signes_expression_2de",
    // ⛔ LE LIBELLE NE CONTIENT PAS « tableau », ET C'EST MESURE. Avec
    // « Signe d'une expression et tableau de signes », le moteur — qui compte
    // les mots forts du libelle presents dans la question — donnait un point a
    // « tableau » seul : « tableau de bord » (un suivi de progres !) et
    // « tableau de variations » ouvraient tous deux cette notion. Le libelle de
    // la STMG, « Signe d'une expression », ne prete pas le flanc, et
    // « tableau de signes » accroche quand meme par le mot « signes ».
    label: "Signe d'une expression",
    boId: "BO2F1",
    prerequis: ["equations_inequations_1er_degre"],
    levels: [1, 2, 3],
  },
  {
    id: "fonction_vocabulaire_2de",
    label: "Fonctions : vocabulaire et représentations",
    boId: "BO2F1",
    prerequis: ["reels_intervalles"],
    levels: [1, 2, 3],
  },
  // ⭐ AJOUTEE LE 12/10/2026 (Frederic) : tout ce qui se LIT sur une courbe,
  // reuni dans une notion — image, antecedents, tableau de signes, tableau de
  // variations, equations et inequations. Les memes gestes vivent aussi, un par
  // un, dans leurs chapitres ; ici ils se pratiquent ensemble, sur des courbes
  // tirees au hasard (moteur : questionBank/analyse-graphique-commun.ts).
  {
    id: "analyse_graphique_2de",
    label: "Analyse graphique d'une fonction",
    boId: "BO2F1",
    prerequis: ["fonction_vocabulaire_2de"],
    levels: [1, 2, 3],
  },
  {
    id: "fonction_variations_extremums",
    label: "Variations et extremums",
    boId: "BO2F1",
    prerequis: ["fonction_vocabulaire_2de"],
    levels: [1, 2, 3],
  },
  {
    id: "fonctions_affines_2de",
    label: "Fonctions affines",
    boId: "BO2F1",
    prerequis: ["fonction_vocabulaire_2de", "droites_plan"],
    levels: [1, 2, 3],
  },
  {
    id: "fonctions_reference_2de",
    label: "Fonctions de référence",
    boId: "BO2F1",
    prerequis: ["fonction_variations_extremums", "developpement_factorisation_2de"],
    levels: [1, 2, 3],
  },

  /* ===================== STATISTIQUES ET PROBABILITES (BO2D1) ===================== */
  {
    id: "information_chiffree_evolutions",
    label: "Information chiffrée : proportions, pourcentages et évolutions",
    boId: "BO2D1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "statistiques_descriptives",
    label: "Statistiques descriptives",
    boId: "BO2D1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  // AJOUTEE LE 05/11/2026 : programme 2026 de seconde, tableau croisé d'effectifs.
  {
    id: "croisement_variables_2de",
    label: "Croiser deux variables : tableaux croisés et fréquences",
    boId: "BO2D1",
    prerequis: ["statistiques_descriptives"],
    levels: [1, 2, 3],
  },
  {
    id: "probabilites_ensemble_fini",
    label: "Probabilités sur un ensemble fini",
    boId: "BO2D1",
    prerequis: ["reels_intervalles"],
    levels: [1, 2, 3],
  },
  // ⭐ AJOUTÉE LE 04/09/2026. Le BO 2026 lui donne son propre bloc de contenus
  // et de capacités ; la première et la terminale la rangent déjà comme une
  // notion distincte (probabilites_conditionnelles, probabilite_conditionnelle).
  {
    id: "probabilites_conditionnelles_2de",
    label: "Probabilités conditionnelles et arbres",
    boId: "BO2D1",
    prerequis: ["probabilites_ensemble_fini"],
    levels: [2, 3],
  },
  {
    id: "echantillonnage_simulation",
    label: "Échantillonnage et simulation",
    boId: "BO2D1",
    prerequis: ["probabilites_ensemble_fini", "statistiques_descriptives"],
    levels: [2, 3],
  },

  /* ===================== ALGORITHMIQUE (BO2I1) ===================== */
  {
    id: "algorithmique_python_2de",
    label: "Algorithmique et Python",
    boId: "BO2I1",
    prerequis: ["expressions_litterales_2de"],
    levels: [1, 2, 3],
  },

  /* ===================== VOCABULAIRE ENSEMBLISTE ET LOGIQUE (BO2L1) ===================== */
  {
    id: "logique_ensembles",
    label: "Vocabulaire ensembliste et logique",
    boId: "BO2L1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  /* ===================== HORS PROGRAMME FRANÇAIS : masquée (lib/tutor-v4/micros-masquees.ts) ===================== */
  {
    id: "demi_plans_systemes",
    label: "Demi-plans et systèmes d'inéquations à deux inconnues",
    boId: "BO2G1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "systemes_determinant",
    label: "Systèmes : déterminant et formules de Cramer",
    boId: "BO2G1",
    prerequis: ["droites_plan", "equations_inequations_1er_degre"],
    levels: [1, 2, 3],
  },
  {
    id: "courbes_associees",
    label: "Courbes associées : translations, dilatations, valeur absolue",
    boId: "BO2F1",
    prerequis: ["fonction_vocabulaire_2de", "analyse_graphique_2de"],
    levels: [1, 2, 3],
  },
  {
    id: "polynomes_division",
    label: "Polynômes : racine, division euclidienne, Horner",
    boId: "BO2N1",
    prerequis: ["developpement_factorisation_2de", "equations_inequations_1er_degre"],
    levels: [1, 2, 3],
  },
  {
    id: "encadrements_operations",
    label: "Encadrer une somme, une différence, un produit, un quotient",
    boId: "BO2N1",
    prerequis: ["reels_intervalles"],
    levels: [1, 2, 3],
  },
  {
    id: "racines_denominateur",
    label: "Racines : rendre rationnel un dénominateur, expression conjuguée",
    boId: "BO2N1",
    prerequis: ["racine_carree_2de", "identites_remarquables_2de"],
    levels: [1, 2, 3],
  },
  {
    id: "valeur_absolue_equations",
    label: "Équations et inéquations avec valeur absolue",
    boId: "BO2N1",
    prerequis: ["reels_intervalles", "equations_inequations_1er_degre"],
    levels: [1, 2, 3],
  },
  {
    id: "homographique_partie_entiere",
    label: "Fonctions homographiques et partie entière",
    boId: "BO2F1",
    prerequis: ["fonctions_reference_2de", "fonction_vocabulaire_2de"],
    levels: [1, 2, 3],
  },
  {
    id: "fonctions_par_intervalles",
    label: "Fonctions affines par intervalles, en escalier, valeur absolue tracée",
    boId: "BO2F1",
    prerequis: ["fonctions_affines_2de", "fonctions_reference_2de"],
    levels: [1, 2, 3],
  },
  {
    id: "droites_perpendiculaires",
    label: "Droites perpendiculaires par les coefficients directeurs",
    boId: "BO2G1",
    prerequis: ["droites_plan"],
    levels: [1, 2, 3],
  },
  {
    id: "projection_droite",
    label: "Projection sur une droite : milieux et rapports conservés",
    boId: "BO2G1",
    prerequis: ["vecteurs_plan", "geometrie_problemes_plan"],
    levels: [1, 2, 3],
  },
  {
    id: "espace_position_2de",
    label: "Géométrie de position dans l'espace, sans repère",
    boId: "BO2G1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "composees_transformations",
    label: "Composées de transformations et similitudes",
    boId: "BO2G1",
    prerequis: ["vecteurs_plan"],
    levels: [1, 2, 3],
  },
];
