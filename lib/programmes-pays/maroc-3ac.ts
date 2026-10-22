// Maroc, 3e année du collège (3AC), examen régional en fin d'année.
// ⚠️ Le programme marocain n'a pas de codes officiels : il est découpé en
// chapitres. Les 17 chapitres et leur ordre viennent d'AlloSchool (site de
// cours), PAS du PDF du ministère (introuvable le 22/10/2026) : à revérifier.
// Le « code » est donc S1-n / S2-n (semestre, rang du chapitre).
// Le 3AC a l'âge de notre 3e, mais va plus loin en géométrie analytique
// (vecteurs, repère, droites, systèmes : chez nous en seconde).

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

export const MAROC_3AC: ProgrammePays = {
  pays: "maroc",
  niveau: "3e année collège (3AC)",
  equivalentFrance: "3e",
  source: "https://www.alloschool.com/course/mathematiques-3eme-annee-college",
  version: "chapitres relevés sur AlloSchool, non vérifiés sur le programme officiel",
  contenus: [
    // ── Semestre 1 ──────────────────────────────────────────────────────────
    {
      code: "S1-1", domaine: "Algèbre",
      texte: "Développement et factorisation, identités remarquables.",
      couverture: "complete",
      micros: [
        ...m("3e", "litteral_developper", "litteral_factoriser", "litteral_identite"),
        ...m("4e", "litteral_distributivite_double", "litteral_facteur_commun"),
        ...m("seconde", "ir_difference_carres", "devfac_factoriser_identite"),
      ],
    },
    {
      code: "S1-2", domaine: "Nombres",
      texte: "Les puissances : exposants entiers, propriétés, puissances de 10, écriture scientifique.",
      couverture: "complete",
      micros: [
        ...m("3e", "entier_puissance_calcul", "entier_puissance_ecriture_scientifique"),
        ...m("4e", "puissance_exposant_negatif"),
        ...m("seconde", "puiss_produit_quotient", "puiss_puissance_puissance"),
      ],
    },
    {
      code: "S1-3", domaine: "Nombres",
      texte: "Les racines carrées : propriétés, simplification, rendre rationnel un dénominateur.",
      couverture: "partielle",
      micros: [
        ...m("3e", "entier_racine_calculer", "entier_racine_carre_parfait"),
        ...m("seconde", "racine_produit", "racine_simplification", "racine_somme"),
      ],
      note: "Manque « rendre rationnel le dénominateur » (3/√2 = 3√2/2, 1/(√3 − 1)) : classique au Maroc, absent du programme français.",
    },
    {
      code: "S1-4", domaine: "Géométrie",
      texte: "Le théorème de Thalès et sa réciproque.",
      couverture: "complete",
      micros: m("3e", "thales_configuration", "thales_calculer_longueur", "thales_reciproque", "thales_rediger"),
    },
    {
      code: "S1-5", domaine: "Géométrie",
      texte: "Le théorème de Pythagore et sa réciproque.",
      couverture: "complete",
      micros: [...m("3e", "pythagore_calculer_hypotenuse", "pythagore_calculer_cote", "pythagore_reciproque", "pythagore_rediger")],
    },
    {
      code: "S1-6", domaine: "Nombres",
      texte: "Ordre et opérations : comparer, ordre et addition, ordre et multiplication, encadrements.",
      couverture: "partielle",
      micros: [
        ...m("3e", "entier_racine_encadrer"),
        ...m("seconde", "reels_encadrement", "inequation_resoudre", "comparer_difference_quotient"),
      ],
      note: "Manquent les règles de l'ordre comme notion (si a < b alors a + c < b + c ; multiplier par un négatif renverse) et l'encadrement d'une somme ou d'un produit à partir d'encadrements.",
    },
    {
      code: "S1-7", domaine: "Géométrie",
      texte: "Trigonométrie dans le triangle rectangle : cosinus, sinus, tangente, relations cos² + sin² = 1 et tan = sin/cos.",
      couverture: "partielle",
      micros: m("3e", "trigo_triangle_rectangle", "trigo_cosinus", "trigo_sinus", "trigo_tangente", "trigo_calculer_angle"),
      note: "Manquent les relations entre rapports (cos² x + sin² x = 1, tan x = sin x ÷ cos x), au programme du 3AC et pas du nôtre.",
    },
    {
      code: "S1-8", domaine: "Géométrie",
      texte: "Angles inscrits et angles au centre.",
      couverture: "absente",
      micros: [],
      note: "Retiré du programme français depuis 2008 : micros à écrire (angle inscrit = moitié de l'angle au centre, deux angles inscrits interceptant le même arc).",
    },
    {
      code: "S1-9", domaine: "Géométrie",
      texte: "Triangles isométriques et triangles semblables.",
      couverture: "complete",
      micros: m("4e", "triangle_egalite", "triangle_semblable"),
    },

    // ── Semestre 2 ──────────────────────────────────────────────────────────
    {
      code: "S2-1", domaine: "Algèbre",
      texte: "Équations et inéquations du premier degré à une inconnue, problèmes.",
      couverture: "complete",
      micros: [
        ...m("3e", "equation_resoudre_developper", "equation_produit_nul", "equation_probleme"),
        ...m("seconde", "inequation_resoudre", "inequation_intervalle"),
      ],
    },
    {
      code: "S2-2", domaine: "Géométrie",
      texte: "Vecteurs et translation : égalité, somme, relation de Chasles.",
      couverture: "complete",
      micros: [
        ...m("4e", "sym_translation"),
        ...m("seconde", "vecteur_definition", "vecteur_egalite", "vecteur_somme", "vecteur_chasles_calcul"),
      ],
    },
    {
      code: "S2-3", domaine: "Géométrie",
      texte: "Repère dans le plan : coordonnées d'un point, d'un vecteur, du milieu ; distance.",
      couverture: "complete",
      micros: m("seconde", "repere_coordonnees_point", "vecteur_coordonnees", "repere_milieu", "repere_distance"),
    },
    {
      code: "S2-4", domaine: "Géométrie",
      texte: "Équation d'une droite : équation réduite, coefficient directeur, droites parallèles et perpendiculaires.",
      couverture: "partielle",
      micros: m("seconde", "droite_pente_ordonne", "droite_equation_reduite", "droite_parallelisme"),
      note: "Manque le critère de perpendicularité (m × m' = −1), au programme du 3AC, absent chez nous.",
    },
    {
      code: "S2-5", domaine: "Fonctions",
      texte: "Fonctions linéaires et fonctions affines.",
      couverture: "complete",
      micros: m("3e", "affine_reconnaitre", "affine_coeff_directeur", "affine_ordonnee_origine", "affine_expression", "affine_graphique", "affine_probleme"),
    },
    {
      code: "S2-6", domaine: "Algèbre",
      texte: "Systèmes de deux équations du premier degré à deux inconnues.",
      couverture: "complete",
      micros: m("seconde", "droite_systeme", "droite_intersection"),
    },
    {
      code: "S2-7", domaine: "Géométrie",
      texte: "Géométrie dans l'espace : pyramide et cône, sections, agrandissement et réduction, volumes.",
      couverture: "partielle",
      micros: [
        ...m("3e", "volume_solide_reconnaitre", "section_cone_pyramide", "pythagore_solide", "volume_agrandissement_reduction"),
      ],
      note: "Pas de micro « volume d'une pyramide ou d'un cône » (V = B × h ÷ 3) : même trou qu'en Ontario E1.6 et en 3e française.",
    },
    {
      code: "S2-8", domaine: "Données",
      texte: "Statistiques : effectifs, fréquences, effectifs cumulés, moyenne, médiane, mode.",
      couverture: "partielle",
      micros: m("3e", "stat_effectif_frequence", "stat_moyenne", "stat_mediane", "stat_etendue", "stat_interpreter"),
      note: "Manquent les effectifs et fréquences CUMULÉS, et le mode, que le Maroc demande explicitement.",
    },
  ],
};
