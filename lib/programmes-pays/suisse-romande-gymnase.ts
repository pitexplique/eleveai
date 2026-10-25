// Suisse, SECONDAIRE II : le gymnase (école de maturité gymnasiale), après la
// 11H, de 3 à 4 ans selon le canton (durée par canton non vérifiée ici).
// Source OFFICIELLE : « Plan d'études cadre écoles de maturité gymnasiale »
// (PEC), CDIP, Berne, adopté le 20 juin 2024, en vigueur le 1er août 2024
// (les cantons ont huit ans pour le mettre en œuvre), chapitre
// « Mathématiques » (discipline fondamentale), p. 65-68, § 4 « Domaines de
// formation et compétences disciplinaires ».
// PDF : https://edudoc.ch/record/232279/files/Plan-etudes-cadre-ecoles-maturite.pdf
// Relevé le 25/10/2026 (pdftotext, texte lisible).
// ⚠️ Limites : le PEC est NATIONAL (pas propre à la Suisse romande) et fixe des
// exigences minimales pour TOUT le gymnase, sans répartition par année : chaque
// canton (et souvent chaque gymnase) écrit son plan d'études, non relevé ici.
// D'où UNE seule matrice « gymnase ». Les compétences sont générales : une
// ligne du PEC = un contenu ; « (CdBA) » = compétence de base constitutive de
// l'aptitude générale aux études (le socle exigé de tous). Codes = numéros des
// domaines partiels du PEC (1.1 Nombres… 4.3 Statistiques) + une lettre à nous.
// Équivalent France : seconde (entrée au gymnase à 15-16 ans) ; les micros
// viennent de la seconde à la terminale (spécialité).

import type { Classe } from "@/lib/tutor-v4/catalog";
import type { ContenuPays, Couverture, ProgrammePays, RenvoiMicro } from "./types";

const m = (classe: Classe, ...micros: string[]): RenvoiMicro[] =>
  micros.map((micro) => ({ classe, micro }));

const c = (
  code: string,
  domaine: string,
  texte: string,
  couverture: Couverture,
  micros: RenvoiMicro[],
  note?: string
): ContenuPays => ({ code, domaine, texte, couverture, micros, ...(note ? { note } : {}) });

const ALG = "1. Arithmétique et algèbre";
const ANA = "2. Analyse";
const GEO = "3. Géométrie";
const STO = "4. Stochastique";

export const SUISSE_GYMNASE: ProgrammePays = {
  pays: "suisse",
  cle: "gymnase",
  niveau: "Gymnase (maturité gymnasiale, discipline fondamentale)",
  equivalentFrance: "seconde",
  source: "https://edudoc.ch/record/232279/files/Plan-etudes-cadre-ecoles-maturite.pdf",
  version: "Plan d'études cadre écoles de maturité gymnasiale (CDIP, 20 juin 2024), chapitre Mathématiques, relevé le 25/10/2026",
  contenus: [
    c("1.1", ALG, "Caractériser les différents ensembles de nombres, manipuler leurs éléments et décrire leurs propriétés (CdBA).", "complete",
      [...m("seconde", "reels_ensembles", "reels_droite_graduee", "intervalle_representer", "arith_nombre_premier", "racine_simplification", "puiss_calcul")]),
    c("1.2a", ALG, "Formaliser des situations issues de domaines divers à l'aide du langage algébrique (CdBA).", "complete",
      m("seconde", "expr_modeliser", "expr_exprimer_variable")),
    c("1.2b", ALG, "Analyser et manipuler des expressions algébriques (CdBA).", "complete",
      m("seconde", "devfac_developper_double", "devfac_facteur_commun", "devfac_factoriser_identite", "devfac_choisir_forme", "ir_application")),
    c("1.3a", ALG, "Exprimer des situations issues de domaines divers en équations (CdBA).", "complete",
      m("seconde", "equation_probleme")),
    c("1.3b", ALG, "Résoudre différents types d'équations, inéquations et systèmes d'équations (CdBA).", "complete",
      [...m("seconde", "equation_resoudre", "inequation_resoudre", "signes_resoudre_inequation", "droite_systeme"), ...m("premiere-spe", "sd_racines", "sd_inequation")]),
    c("2.1a", ANA, "Définir, exprimer et représenter une fonction de diverses manières (CdBA).", "complete",
      m("seconde", "fonction_vocabulaire", "fonction_image_formule", "fonction_tableau_graphique", "fonction_domaine")),
    c("2.1b", ANA, "Formuler et utiliser les propriétés et caractéristiques de différentes fonctions élémentaires (CdBA).", "complete",
      [...m("seconde", "affine_forme", "reference_carre", "reference_inverse", "reference_racine"), ...m("premiere-spe", "exp_proprietes", "trig_courbes"), ...m("terminale-spe", "ln_proprietes")]),
    c("2.1c", ANA, "Manipuler des fonctions construites à partir de fonctions élémentaires et expliquer leurs propriétés spécifiques.", "partielle",
      [...m("premiere-spe", "der_composee_affine"), ...m("terminale-spe", "derivation_composee")],
      "Pas de micro sur les transformations de courbes (translation, dilatation : f(x) + k, f(x − a), k·f(x)) ni sur la réciproque."),
    c("2.1d", ANA, "Modéliser des situations issues de domaines divers à l'aide d'une représentation fonctionnelle.", "complete",
      [...m("premiere-spe", "exp_modelisation", "suite_modeliser"), ...m("seconde", "geo_optimisation")]),
    c("2.1e", ANA, "Étudier le comportement asymptotique de fonctions.", "complete",
      m("terminale-spe", "limite_fonction_reference", "limite_fonction_infini", "limite_fonction_asymptote")),
    c("2.2a", ANA, "Interpréter la notion de dérivée d'une fonction de différentes manières (CdBA).", "complete",
      m("premiere-spe", "der_taux", "der_nombre_derive", "der_interpreter", "der_tangente")),
    c("2.2b", ANA, "Calculer la dérivée d'une fonction (CdBA).", "complete",
      [...m("premiere-spe", "der_usuelles", "der_operations", "der_quotient"), ...m("terminale-spe", "derivation_composee")]),
    c("2.2c", ANA, "Analyser une fonction à l'aide des outils du calcul différentiel (CdBA).", "complete",
      [...m("premiere-spe", "var_signe_derivee", "var_tableau", "var_extremum"), ...m("terminale-spe", "convexite_derivee_seconde")]),
    c("2.2d", ANA, "Utiliser le calcul différentiel pour résoudre des problèmes d'optimisation (CdBA).", "complete",
      [...m("premiere-spe", "var_optimisation"), ...m("terminale-spe", "derivation_optimisation")]),
    c("2.3a", ANA, "Interpréter la notion d'intégrale définie d'une fonction ; déterminer des primitives (CdBA).", "complete",
      m("terminale-spe", "integrale_aire", "primitive_reconnaitre", "primitive_calculer")),
    c("2.3b", ANA, "Mettre en relation dérivée et intégrale à l'aide du théorème fondamental ; utiliser le calcul intégral pour résoudre des problèmes.", "complete",
      m("terminale-spe", "integrale_calculer", "integrale_valeur_moyenne", "integrale_defi")),
    c("3.1", GEO, "Calculer et mettre en relation les différentes grandeurs des figures planes et des corps solides (CdBA).", "partielle",
      [...m("3e", "aire_disque", "volume_cylindre", "volume_boule", "pythagore_solide"), ...m("seconde", "geo_longueurs_aires")],
      "Manquent le volume de la pyramide et du cône, les aires latérales."),
    c("3.2a", GEO, "Définir les rapports et relations trigonométriques et énoncer leurs propriétés (CdBA).", "complete",
      [...m("3e", "trigo_cosinus", "trigo_sinus", "trigo_tangente"), ...m("premiere-spe", "trig_cercle", "trig_cos_sin", "trig_angles_associes"), ...m("seconde", "geo_trig_identite")]),
    c("3.2b", GEO, "Résoudre des problèmes métriques dans les triangles et des problèmes de domaines divers à l'aide de la trigonométrie (CdBA).", "partielle",
      [...m("3e", "trigo_calculer_longueur", "trigo_calculer_angle"), ...m("premiere-spe", "ps_alkashi")],
      "Al-Kashi est couvert ; pas de micro « loi des sinus » (triangle quelconque), classique au gymnase."),
    c("3.3a", GEO, "Caractériser les vecteurs, les manipuler géométriquement et algébriquement (CdBA) ; utiliser le calcul vectoriel pour mesurer des quantités géométriques.", "complete",
      [...m("seconde", "vecteur_somme", "vecteur_coordonnees", "vecteur_colinearite", "vecteur_norme"), ...m("premiere-spe", "ps_coordonnees", "ps_norme_angle")]),
    c("3.3b", GEO, "Décrire des objets géométriques par diverses représentations, analyser leur position relative, résoudre des problèmes géométriques de manière algébrique.", "complete",
      [...m("seconde", "droite_equation_cartesienne", "droite_intersection"), ...m("premiere-spe", "gr_cercle", "gr_equation_droite"), ...m("terminale-spe", "espace_droite_parametrique", "espace_plan_equation", "espace_position_relative")]),
    c("4.1", STO, "Dénombrer de manière analytique et structurée (CdBA) ; résoudre des problèmes combinatoires.", "complete",
      m("terminale-spe", "denombrement_produit_somme", "denombrement_arrangement_combinaison", "denombrement_coefficient_binomial", "denombrement_pascal")),
    c("4.2a", STO, "Expliquer la notion de probabilité, illustrer et utiliser ses propriétés.", "complete",
      m("seconde", "proba_modele", "proba_calculer", "proba_evenement_contraire", "proba_formule_union")),
    c("4.2b", STO, "Analyser et résoudre des problèmes liés au hasard en mobilisant les divers aspects calculatoires des probabilités.", "complete",
      [...m("premiere-spe", "pc_arbre", "pc_totales", "pc_independance", "va_esperance"), ...m("terminale-spe", "binomiale_calculer")]),
    c("4.3", STO, "Décrire et interpréter un ensemble de données graphiquement ou en calculant les indicateurs appropriés (CdBA).", "complete",
      m("seconde", "stat_moyenne_ponderee", "stat_mediane_quartiles", "stat_ecart_interquartile", "stat_ecart_type", "stat_interpreter")),
  ],
};
