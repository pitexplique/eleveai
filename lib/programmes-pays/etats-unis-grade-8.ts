// États-Unis, grade 8, Common Core State Standards (mathématiques, 2010).
// Pour les enfants français scolarisés dans une école américaine, y compris
// les écoles d'immersion en français (Louisiane, Utah…). Les lycées français
// du réseau AEFE suivent, eux, le programme français : pas de matrice.
// Les 28 standards relevés le 22/10/2026 sur thecorestandards.org ; les
// sous-standards (8.EE.C.7a, 8.G.A.1b…) sont résumés dans leur parent.
// Le grade 8 a l'âge de notre 4e (13-14 ans), mais son contenu est celui de
// notre 3e, avec des emprunts à la seconde (systèmes, distance dans un repère)
// et à la première (nuages de points).

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

export const ETATS_UNIS_GRADE_8: ProgrammePays = {
  pays: "etats-unis",
  cle: "grade-8",
  niveau: "Grade 8",
  codeCours: "CCSS Math 8",
  equivalentFrance: "4e",
  source: "https://www.thecorestandards.org/Math/Content/8/",
  version: "2010",
  contenus: [
    // ── The Number System ───────────────────────────────────────────────────
    {
      code: "8.NS.A.1", domaine: "Nombres",
      texte: "Nombres irrationnels ; tout nombre a un développement décimal, périodique pour un rationnel ; convertir un décimal périodique en fraction.",
      couverture: "partielle",
      micros: [...m("seconde", "reels_ensembles"), ...m("3e", "fraction_rationnel_ecriture")],
      note: "Manque le sens inverse : 0,272727… = 27/99. Le développement périodique n'est jamais travaillé.",
    },
    {
      code: "8.NS.A.2", domaine: "Nombres",
      texte: "Approcher des irrationnels par des rationnels pour les comparer, les placer sur une droite et estimer (√2 entre 1,4 et 1,5).",
      couverture: "complete",
      micros: [...m("3e", "entier_racine_encadrer"), ...m("seconde", "reels_encadrement", "reels_droite_graduee")],
    },

    // ── Expressions & Equations ─────────────────────────────────────────────
    {
      code: "8.EE.A.1", domaine: "Expressions et équations",
      texte: "Propriétés des exposants entiers pour écrire des expressions numériques équivalentes.",
      couverture: "complete",
      micros: [...m("4e", "puissance_calcul", "puissance_exposant_negatif"), ...m("seconde", "puiss_produit_quotient")],
    },
    {
      code: "8.EE.A.2", domaine: "Expressions et équations",
      texte: "Racines carrées et cubiques pour résoudre x² = p et x³ = p ; carrés et cubes parfaits ; √2 est irrationnel.",
      couverture: "partielle",
      micros: [...m("3e", "entier_racine_calculer", "entier_racine_carre_parfait"), ...m("seconde", "reference_resoudre")],
      note: "Aucune racine CUBIQUE (∛27 = 3, cubes parfaits) dans le coach.",
    },
    {
      code: "8.EE.A.3", domaine: "Expressions et équations",
      texte: "Un chiffre × une puissance de 10 pour estimer de très grandes ou très petites quantités et les comparer.",
      couverture: "complete",
      micros: [...m("4e", "puissance_dix", "puissance_comparer", "ordre_estimer")],
    },
    {
      code: "8.EE.A.4", domaine: "Expressions et équations",
      texte: "Opérations en notation scientifique ; choisir les unités ; lire la notation d'une calculatrice (3.2E7).",
      couverture: "complete",
      micros: [...m("4e", "puissance_notation_scientifique", "puissance_calcul"), ...m("3e", "entier_puissance_ecriture_scientifique")],
    },
    {
      code: "8.EE.B.5", domaine: "Expressions et équations",
      texte: "Représenter une proportionnalité, le taux unitaire est la pente ; comparer deux proportionnalités représentées différemment.",
      couverture: "complete",
      micros: [...m("4e", "prop_graphique", "prop_coeff", "prop_relation"), ...m("3e", "fonction_affine_lineaire")],
    },
    {
      code: "8.EE.B.6", domaine: "Expressions et équations",
      texte: "Triangles semblables pour montrer que la pente est constante ; établir y = mx et y = mx + b.",
      couverture: "partielle",
      micros: [...m("4e", "triangle_semblable"), ...m("3e", "affine_coeff_directeur")],
      note: "Le lien « pente constante ⇐ triangles semblables » n'est fait nulle part : micro à écrire.",
    },
    {
      code: "8.EE.C.7", domaine: "Expressions et équations",
      texte: "Équations du premier degré à coefficients rationnels (distributivité, réduction) ; dire si elles ont une, aucune ou une infinité de solutions.",
      couverture: "partielle",
      micros: [
        ...m("4e", "equation_resoudre_distributivite", "equation_verifier"),
        ...m("3e", "equation_resoudre_developper"),
      ],
      note: "7a manque : reconnaître une équation SANS solution (3 = 5) ou vraie pour tout x (3 = 3).",
    },
    {
      code: "8.EE.C.8", domaine: "Expressions et équations",
      texte: "Systèmes de deux équations : point d'intersection, résolution algébrique, estimation graphique, problèmes.",
      couverture: "complete",
      micros: m("seconde", "droite_systeme", "droite_intersection", "fonction_comparer_courbes"),
    },

    // ── Functions ───────────────────────────────────────────────────────────
    {
      code: "8.F.A.1", domaine: "Fonctions",
      texte: "Une fonction associe à chaque entrée exactement une sortie ; son graphique est l'ensemble des couples.",
      couverture: "complete",
      micros: [...m("4e", "fonction_reconnaitre"), ...m("3e", "fonction_vocabulaire", "fonction_image")],
    },
    {
      code: "8.F.A.2", domaine: "Fonctions",
      texte: "Comparer deux fonctions représentées différemment (formule, graphique, tableau, phrase).",
      couverture: "complete",
      micros: [...m("4e", "fonction_changer_mode"), ...m("seconde", "fonction_tableau_graphique")],
    },
    {
      code: "8.F.A.3", domaine: "Fonctions",
      texte: "y = mx + b est une fonction linéaire (droite) ; exemples de fonctions non linéaires (aire d'un carré).",
      couverture: "complete",
      micros: [...m("3e", "affine_reconnaitre", "fonction_affine_lineaire"), ...m("seconde", "reference_carre")],
    },
    {
      code: "8.F.B.4", domaine: "Fonctions",
      texte: "Modéliser par une fonction linéaire : taux de variation et valeur initiale depuis une phrase, deux points, un tableau, un graphique.",
      couverture: "complete",
      micros: m("3e", "affine_expression", "affine_coeff_directeur", "affine_ordonnee_origine", "affine_probleme"),
    },
    {
      code: "8.F.B.5", domaine: "Fonctions",
      texte: "Décrire qualitativement une relation sur un graphique (croissante, linéaire ou non) ; esquisser le graphique d'une description.",
      couverture: "partielle",
      micros: [...m("4e", "fonction_graphique_lire"), ...m("3e", "fonction_graphique"), ...m("seconde", "variation_croissance")],
      note: "Manque le sens inverse : esquisser un graphique à partir d'une histoire (la baignoire qui se remplit puis se vide).",
    },

    // ── Geometry ────────────────────────────────────────────────────────────
    {
      code: "8.G.A.1", domaine: "Géométrie",
      texte: "Rotations, réflexions et translations conservent droites, longueurs, angles et parallélisme.",
      couverture: "complete",
      micros: m("4e", "sym_transformation_propriete", "sym_translation", "sym_rotation", "sym_axiale"),
    },
    {
      code: "8.G.A.2", domaine: "Géométrie",
      texte: "Deux figures sont congruentes si une SUITE de rotations, réflexions et translations envoie l'une sur l'autre ; décrire cette suite.",
      couverture: "partielle",
      micros: m("4e", "triangle_egalite", "sym_transformation_propriete"),
      note: "Manque « décrire la suite de transformations » qui envoie une figure sur l'autre.",
    },
    {
      code: "8.G.A.3", domaine: "Géométrie",
      texte: "Décrire avec les coordonnées l'effet d'homothéties, translations, rotations et réflexions.",
      couverture: "absente",
      micros: [],
      note: "Aucune transformation en coordonnées ((x ; y) → (x + 3 ; y − 2), (x ; y) → (−x ; y)) : micro à écrire.",
    },
    {
      code: "8.G.A.4", domaine: "Géométrie",
      texte: "Deux figures sont semblables si une suite de transformations avec homothéties envoie l'une sur l'autre.",
      couverture: "partielle",
      micros: [...m("3e", "sym_homothetie_reconnaitre", "sym_homothetie_rapport"), ...m("4e", "triangle_semblable")],
      note: "Même manque qu'en 8.G.A.2 : décrire la suite de transformations.",
    },
    {
      code: "8.G.A.5", domaine: "Géométrie",
      texte: "Somme des angles d'un triangle, angle extérieur, angles et parallèles, critère angle-angle de similitude.",
      couverture: "partielle",
      micros: [...m("5e", "triangle_somme_angle", "angle_paralleles"), ...m("4e", "triangle_semblable")],
      note: "L'angle EXTÉRIEUR d'un triangle (somme des deux autres) n'a pas de micro.",
    },
    {
      code: "8.G.B.6", domaine: "Géométrie",
      texte: "Expliquer une démonstration du théorème de Pythagore et de sa réciproque.",
      couverture: "partielle",
      micros: m("4e", "pythagore_rediger", "pythagore_reciproque_conclure"),
      note: "Nos micros APPLIQUENT le théorème ; aucune n'en explique une démonstration (puzzle des carrés).",
    },
    {
      code: "8.G.B.7", domaine: "Géométrie",
      texte: "Pythagore pour trouver une longueur, dans le plan et dans l'espace, en situation.",
      couverture: "complete",
      micros: [...m("4e", "pythagore_calculer_hypotenuse", "pythagore_calculer_cote"), ...m("3e", "pythagore_solide")],
    },
    {
      code: "8.G.B.8", domaine: "Géométrie",
      texte: "Pythagore pour la distance entre deux points d'un repère.",
      couverture: "complete",
      micros: m("seconde", "repere_distance"),
    },
    {
      code: "8.G.C.9", domaine: "Géométrie",
      texte: "Formules du volume du cône, du cylindre et de la boule ; problèmes.",
      couverture: "partielle",
      micros: m("3e", "volume_cylindre", "volume_boule"),
      note: "Pas de micro « volume d'un cône » : même trou qu'en Ontario E1.6, au Maroc et en 3e française.",
    },

    // ── Statistics & Probability ────────────────────────────────────────────
    {
      code: "8.SP.A.1", domaine: "Statistiques",
      texte: "Construire et lire un nuage de points : groupements, valeurs aberrantes, association positive ou négative, linéaire ou non.",
      couverture: "partielle",
      micros: m("premiere", "info_nuage_construire", "info_nuage_tendance", "info_nuage_lire"),
      note: "Niveau 1re chez nous ; manquent les valeurs aberrantes et les groupements.",
    },
    {
      code: "8.SP.A.2", domaine: "Statistiques",
      texte: "Une droite modélise souvent la relation ; tracer une droite d'ajustement à l'œil et juger sa qualité.",
      couverture: "complete",
      micros: [...m("premiere", "info_ajust_pertinence"), ...m("stmg", "statT_ajust_au_juge")],
    },
    {
      code: "8.SP.A.3", domaine: "Statistiques",
      texte: "Utiliser l'équation d'un modèle linéaire pour résoudre un problème ; interpréter pente et ordonnée à l'origine.",
      couverture: "complete",
      micros: m("premiere", "info_ajust_equation", "info_ajust_interpoler"),
    },
    {
      code: "8.SP.A.4", domaine: "Statistiques",
      texte: "Tableaux à double entrée de deux variables qualitatives : fréquences relatives, association.",
      couverture: "complete",
      micros: [...m("stmg", "don_tab_dresser", "don_freq_interpreter"), ...m("premiere", "info_tab_interpreter")],
    },
  ],
};
