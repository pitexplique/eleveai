// Maroc, 3e année du collège (3AC), examen régional en fin d'année.
// Source : les « Orientations pédagogiques et programmes de l'enseignement des
// mathématiques au cycle secondaire collégial » du ministère de l'Éducation
// nationale (Direction des curricula, août 2009), toujours en vigueur, dans la
// TRADUCTION FRANÇAISE d'Aziz Aït El Yazid et Fahd Ouaiour pour l'option
// internationale française (« 3.A.P.I.C »), PDF de 31 pages en images diffusé
// par alra2id-educ.blogspot.com (octobre 2019). Même document que pour le 1AC
// et le 2AC (./maroc-college.ts) : pages 22-31 = le 3AC, tableaux « Contenu du
// programme / Capacités attendues / Orientations pédagogiques » et répartition
// semestrielle avec les horaires, relus le 01/11/2026. Remplace le relevé du
// 22/10 fait sur les chapitres d'AlloSchool.
// Pas de codes officiels : S1-n / S2-n = semestre, rang du contenu dans l'ordre
// des tableaux officiels (le paragraphe « triangle rectangle » est découpé en
// trigonométrie, Pythagore, angle inscrit ; « fonctions linéaires / affines »
// en deux, comme dans le texte).
// Horaires officiels. S1 : racines carrées 10 h ; identités remarquables et
// puissances 12 h ; ordre et opérations 12 h ; Thalès 12 h ; triangle rectangle
// et trigonométrie 12 h ; triangles isométriques et semblables 12 h. S2 :
// équations et inéquations 10 h ; systèmes 10 h ; translation et produit d'un
// vecteur par un réel 10 h ; géométrie analytique 14 h ; volumes 8 h ;
// fonctions linéaires et affines 14 h ; statistiques 6 h.
// Ce que le texte officiel change par rapport à AlloSchool : pas de « vecteurs
// et Chasles » au 3AC (c'est le 2AC), mais le PRODUIT D'UN VECTEUR PAR UN RÉEL ;
// en statistiques, la MÉDIANE et le MODE, pas les effectifs cumulés ; les volumes
// « toutes formules » avec l'effet k, k², k³ ; pas de milieu en géométrie
// analytique. Le 3AC a l'âge de notre 3e mais va jusqu'à notre seconde en
// géométrie analytique (vecteurs, repère, droites, systèmes).

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

const AN = "Activités numériques";
const AG = "Géométrie";
const GS = "Activités graphiques et statistiques";

export const MAROC_3AC: ProgrammePays = {
  pays: "maroc",
  cle: "3ac",
  niveau: "3e année collège (3AC)",
  equivalentFrance: "3e",
  source: "https://alra2id-educ.blogspot.com/2019/10/Directives-pedagogiques-math-biof-college-pdf.html",
  version:
    "orientations pédagogiques officielles 2009 (secondaire collégial), traduction française d'enseignants pour l'option française, pages 22-31",
  contenus: [
    // ── Semestre 1 ──────────────────────────────────────────────────────────
    {
      code: "S1-1", domaine: AN,
      texte: "Racines carrées : racine carrée d'un positif, (√a)² et √(a²), x² = a ; valeurs approchées à la calculatrice ; √(ab) = √a × √b, √(a/b) = √a / √b ; rendre rationnel le dénominateur dans des cas simples.",
      couverture: "partielle",
      micros: [
        ...m("3e", "entier_racine_comprendre", "entier_racine_calculer", "entier_racine_carre_parfait", "entier_racine_encadrer"),
        ...m("seconde", "racine_carre_de_a2", "racine_produit", "racine_simplification"),
      ],
      note: "Manquent le quotient √(a/b) = √a / √b et « rendre rationnel le dénominateur » (3/√2 = 3√2/2) : classiques au Maroc, absents du programme français.",
    },
    {
      code: "S1-2", domaine: AN,
      texte: "Identités remarquables (a + b)², (a − b)², a² − b² = (a + b)(a − b), dans les deux sens : développer, factoriser, simplifier, résoudre.",
      couverture: "complete",
      micros: [
        ...m("3e", "litteral_developper", "litteral_factoriser", "litteral_identite"),
        ...m("4e", "litteral_identite_developper", "litteral_facteur_commun"),
        ...m("seconde", "ir_application", "ir_difference_carres", "devfac_factoriser_identite"),
      ],
    },
    {
      code: "S1-3", domaine: AN,
      texte: "Puissances : propriétés ; puissances de 10, valeur approchée, écriture scientifique.",
      couverture: "complete",
      micros: [
        ...m("3e", "entier_puissance_calcul", "entier_puissance_dix", "entier_puissance_ecriture_scientifique"),
        ...m("4e", "puissance_exposant_negatif"),
        ...m("seconde", "puiss_produit_quotient", "puiss_puissance_puissance"),
      ],
    },
    {
      code: "S1-4", domaine: AN,
      texte: "Ordre et opérations : propriétés de l'ordre ; techniques de comparaison de deux nombres ; encadrer et approcher la somme, la différence, le produit et le quotient de deux rationnels.",
      couverture: "partielle",
      micros: [
        ...m("3e", "entier_racine_encadrer", "fraction_rationnel_comparer"),
        ...m("seconde", "reels_encadrement", "comparer_difference_quotient", "inequation_resoudre"),
        ...m("5e", "approx_encadrer_quotient"),
      ],
      note: "Encadrer un quotient est couvert ; manquent les règles de l'ordre comme notion (si a < b alors a + c < b + c ; multiplier par un négatif renverse) et l'encadrement d'une somme ou d'un produit à partir d'encadrements.",
    },
    {
      code: "S1-5", domaine: AG,
      texte: "Théorème de Thalès et sa réciproque (en tenant compte de l'ordre des points) ; rappel des propriétés de la droite des milieux ; problèmes.",
      couverture: "complete",
      micros: m("3e", "thales_configuration", "thales_rapport", "thales_calculer_longueur", "thales_reciproque", "thales_rediger"),
      note: "Le rappel de la droite des milieux (2AC) n'a pas de micro chez nous.",
    },
    {
      code: "S1-6", domaine: AG,
      texte: "Trigonométrie dans le triangle rectangle : sinus, cosinus, tangente d'un angle aigu ; valeurs à la calculatrice dans les deux sens ; cos² x + sin² x = 1 et tan x = sin x ÷ cos x.",
      couverture: "partielle",
      micros: [
        ...m("3e", "trigo_triangle_rectangle", "trigo_cosinus", "trigo_sinus", "trigo_tangente", "trigo_choisir_rapport", "trigo_calculer_angle"),
        ...m("seconde", "geo_trig_identite"),
      ],
      note: "Manque la relation tan x = sin x ÷ cos x (cos² x + sin² x = 1 est en seconde chez nous). Les relations métriques (AH² = HB × HC…) sont en exercices, hors cours.",
    },
    {
      code: "S1-7", domaine: AG,
      texte: "Théorème de Pythagore et sa réciproque, en géométrie plane et dans certains polygones réguliers (triangle équilatéral, carré).",
      couverture: "complete",
      micros: m("3e", "pythagore_reconnaitre", "pythagore_calculer_hypotenuse", "pythagore_calculer_cote", "pythagore_reciproque", "pythagore_rediger"),
    },
    {
      code: "S1-8", domaine: AG,
      texte: "Angle inscrit et angle au centre interceptant le même arc : les comparer.",
      couverture: "complete",
      micros: m("3e", "angle_inscrit_centre", "angles_inscrits_meme_arc"),
    },
    {
      code: "S1-9", domaine: AG,
      texte: "Triangles isométriques (les trois cas) et triangles semblables (côtés proportionnels, cas de similitude).",
      couverture: "complete",
      micros: m("4e", "triangle_egalite", "triangle_semblable"),
    },

    // ── Semestre 2 ──────────────────────────────────────────────────────────
    {
      code: "S2-1", domaine: AN,
      texte: "Équations et inéquations du premier degré à une inconnue, et équations qui s'y ramènent ; solutions d'une inéquation sur une droite ; problèmes. Paramètres hors programme.",
      couverture: "complete",
      micros: [
        ...m("3e", "equation_resoudre_developper", "equation_produit_nul", "equation_probleme"),
        ...m("seconde", "inequation_resoudre", "inequation_intervalle"),
      ],
      note: "Les inéquations sont en seconde chez nous.",
    },
    {
      code: "S2-2", domaine: AN,
      texte: "Système de deux équations du premier degré à deux inconnues : résolution algébrique (combinaison, substitution) et graphique ; mise en équation de situations.",
      couverture: "complete",
      micros: m("seconde", "droite_systeme", "droite_intersection"),
      note: "En seconde chez nous.",
    },
    {
      code: "S2-3", domaine: GS,
      texte: "Fonctions linéaires : situation de proportionnalité traduite par f(x) = ax ; image, nombre d'image connue, par le calcul et sur la représentation graphique ; formule à partir d'un nombre et de son image ou d'un point.",
      couverture: "complete",
      micros: [
        ...m("3e", "fonction_affine_lineaire", "affine_reconnaitre", "affine_calcul_image", "affine_coeff_directeur", "affine_graphique"),
        ...m("4e", "prop_graphique"),
      ],
    },
    {
      code: "S2-4", domaine: GS,
      texte: "Fonctions affines f(x) = ax + b : image, représentation graphique, formule à partir de deux nombres et leurs images ou de deux points ; problèmes.",
      couverture: "complete",
      micros: [
        ...m("3e", "affine_ordonnee_origine", "affine_expression", "affine_graphique", "affine_probleme"),
        ...m("seconde", "affine_determiner_expression"),
      ],
    },
    {
      code: "S2-5", domaine: GS,
      texte: "Statistiques : médiane et mode ; moyenne arithmétique à la calculatrice ; représentations graphiques usuelles ; comparer deux séries.",
      couverture: "partielle",
      micros: m("3e", "stat_lire_tableau", "stat_lire_graphique", "stat_moyenne", "stat_mediane", "stat_interpreter"),
      note: "Manque le MODE (valeur de plus grand effectif), que le Maroc demande explicitement.",
    },
    {
      code: "S2-6", domaine: AG,
      texte: "Translation : image d'un point, d'un segment, d'une droite, d'une demi-droite, d'un angle, d'un cercle ; conservation des distances et des angles ; produit d'un vecteur par un réel (situations simples).",
      couverture: "complete",
      micros: [
        ...m("4e", "sym_translation", "sym_transformation_propriete"),
        ...m("3e", "sym_symetrie_translation_rotation"),
        ...m("seconde", "vecteur_definition", "vecteur_produit_reel"),
      ],
      note: "Le produit d'un vecteur par un réel est en seconde chez nous.",
    },
    {
      code: "S2-7", domaine: AG,
      texte: "Géométrie analytique : repère du plan, coordonnées d'un point et d'un vecteur, distance de deux points.",
      couverture: "complete",
      micros: m("seconde", "repere_coordonnees_point", "vecteur_coordonnees", "repere_distance"),
      note: "En seconde chez nous.",
    },
    {
      code: "S2-8", domaine: AG,
      texte: "Équation réduite d'une droite ; parallèles si a = a', perpendiculaires si a × a' = −1 ; lien avec les fonctions affines et les systèmes.",
      couverture: "partielle",
      micros: m("seconde", "droite_pente_ordonne", "droite_equation_reduite", "droite_parallelisme"),
      note: "Manque le critère de perpendicularité a × a' = −1 (en 1re spé, la perpendicularité passe par les vecteurs normaux, pas par les coefficients directeurs).",
    },
    {
      code: "S2-9", domaine: AG,
      texte: "Calcul des volumes (toutes les formules d'aires et de volumes) ; positions relatives et orthogonalité autour du prisme droit ; agrandissement et réduction de rapport k : longueurs × k, aires × k², volumes × k³.",
      couverture: "partielle",
      micros: m("3e", "volume_pave", "volume_prisme", "volume_cylindre", "volume_boule", "pythagore_solide", "aire_agrandissement_reduction", "volume_agrandissement_reduction", "volume_pyramide", "volume_cone", "aire_prisme_droit", "aire_cylindre", "aire_pyramide_cone", "aire_sphere"),
      note: "Toutes les formules d'aires et de volumes sont couvertes ; restent les positions relatives et l'orthogonalité autour du prisme droit.",
    },
  ],
};
