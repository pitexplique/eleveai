// lib/tutor-v4/micros-masquees.ts
//
// MASQUER UNE MICRO, CE N'EST PAS LA SUPPRIMER (décision de Frédéric, 05/11/2026 :
// « masque les micros qui ne sont plus au programme »).
//
// Une micro masquée garde sa banque, ses vidéos, ses liens déjà distribués et les
// progrès des élèves. Elle disparaît seulement de ce que le coach PROPOSE :
//   · les listes (`getNotionOptions`, `getNotionMicroMap`, `getDomaineMap`,
//     `getKnowledgePack`) ne la donnent plus, sauf demande explicite ;
//   · une séance ne la tire plus au hasard ni en remédiation ;
//   · un ancien lien `/coach/serie?…&microId=<masquée>` continue de marcher et
//     sert bien cette micro : on ne casse jamais un lien donné à une classe.
//
// Deux raisons, un seul mécanisme :
//   · `hors_programme` : le programme français en vigueur ne la contient plus ;
//   · `hors_france`    : écrite pour d'autres pays (voir lib/programmes-pays),
//     jamais au programme français. Invisible dans le coach France, gardée pour
//     `/pays` et `/coach/serie`.
//
// Une NOTION dont toutes les micros sont masquées disparaît avec elles.
// Démasquer = retirer la ligne ici, rien d'autre.

import type { KnowledgePack } from "@/lib/tutor-v4/types";

export type RaisonMasquage = "hors_programme" | "hors_france";

type Masquage = { raison: RaisonMasquage; note: string };

/** Quelles classes de quelle matière. Seules les maths sont concernées à ce jour. */
const MICROS_MASQUEES: Record<string, Record<string, Record<string, Masquage>>> = {
  maths: {
    /* Cycle 3, cours moyen : « les élèves n'utilisent pas de tableaux de
       proportionnalité », « ni l'utilisation du coefficient de proportionnalité, ni
       le recours au “produit en croix” » ; le rapporteur « sera introduit au collège ». */
    cm1: {
      ...lot("hors_programme", "Programme du cours moyen", [
      "prop_tableau",
      "prop_coefficient",
      "angle_comparer", // comparait des degrés ; remplacée par `angle_comparer_sans_mesure`
      ]),
      /* Trier, classer, ensembles, arbre : ni dans l'audit `audit-france-ecole.md`, ni dans `cm1/bo.ts`. */
      ...lot("hors_france", "Suisse, Belgique, Sénégal, Côte d'Ivoire", [
      "tri_criteres_successifs",
      "tri_ensembles_intersection",
      "tri_arbre",
      ]),
    },
    /* Trier, classer, ensembles : ni dans l'audit `audit-france-ecole.md`, ni dans `ce1/bo.ts`. */
    ce1: lot("hors_france", "Suisse, Belgique, Sénégal, Côte d'Ivoire", [
      "ce1_tri_critere",
      "ce1_tri_ensembles",
    ]),
    /* Diviser par un décimal : le BO de 6e s'arrête au diviseur « entier non nul inférieur à 10 »
       (`6e/bo-objectifs.ts`). Le cycle 4 cite le « quotient de nombres décimaux » sans en dire la
       classe (`docs/bo-maths-cycle4-recopie.md`, p. 131) : en 6e, elle reste masquée. */
    "6e": lot("hors_france", "Maroc, Suisse, Sénégal, Côte d'Ivoire", [
      "decimal_diviser_par_decimal",
    ]),
    cm2: lot("hors_programme", "Programme du cours moyen", [
      "prop_tableau",
      "prop_coefficient",
      "angle_mesurer",
    ]),
    /* Hors programme français : « par défaut », « par excès », « troncature » n'y sont pas ;
       l'encadrement d'un quotient, lui, y est et reste visible. Maroc, Côte d'Ivoire, Belgique, Québec. */
    "5e": {
      ...lot("hors_france", "Maroc, Côte d'Ivoire, Belgique, Québec", [
      "approx_defaut_exces",
      "approx_troncature_arrondi",
      ]),
      /* Polygones réguliers : absents de `docs/bo-maths-cycle4-recopie.md`. */
      ...lot("hors_france", "Maroc, Suisse, Belgique, Québec", [
      "polygone_regulier_reconnaitre",
      "polygone_regulier_angles",
      "polygone_regulier_aire",
      ]),
      /* Aire du losange et du trapèze : formules non exigées par le programme français. */
      ...lot("hors_france", "Suisse, Belgique, Sénégal, Côte d'Ivoire", [
      "aire_losange",
      "aire_trapeze",
      ]),
    },
    /* Médianes, centre de gravité, cercle inscrit, orthocentre : absents du BO, qui ne cite
       que hauteurs et médiatrices (la hauteur reste visible, `triangle_droites`). */
    "4e": {
      ...lot("hors_france", "Québec, Maroc, Suisse, Belgique, Sénégal, Côte d'Ivoire", [
      "mediane_triangle",
      "centre_gravite",
      "bissectrice_equidistance",
      "cercle_inscrit",
      "orthocentre",
      ]),
      /* Arc et secteur par l'angle : l'arc ne revient en France qu'en 1re spé, en radians. */
      ...lot("hors_france", "Québec, Suisse, Sénégal, Côte d'Ivoire", [
      "arc_longueur",
      "secteur_aire",
      ]),
      /* Distance à une droite : ni dans le BO de 6e (`6e/bo-objectifs.ts`), ni au cycle 4. */
      ...lot("hors_france", "Maroc, Belgique, Sénégal, Côte d'Ivoire", [
      "distance_point_droite",
      "distance_paralleles",
      ]),
    },
    /* Classe modale, centre, moyenne par les centres, effectifs cumulés : Sénégal, Côte
       d'Ivoire, Belgique, Québec. Regrouper en classes reste visible (BO 2020, p. 133). */
    "3e": {
      ...lot("hors_france", "Sénégal, Côte d'Ivoire, Belgique, Québec", [
      "stat_classe_modale_centre",
      "stat_moyenne_classes",
      "stat_effectifs_cumules",
      ]),
      /* Aires latérales, aire de la sphère, angles inscrits : absents du BO. La section d'une
         sphère, elle, y est (« sections planes ») et reste visible. */
      ...lot("hors_france", "Québec, Maroc, Suisse, Belgique, Sénégal, Côte d'Ivoire", [
      "aire_prisme_droit",
      "aire_cylindre",
      "aire_pyramide_cone",
      "aire_sphere",
      "angle_inscrit_centre",
      "angles_inscrits_meme_arc",
      "triangle_demi_cercle",
      ]),
      /* Relations métriques du triangle rectangle : absentes du BO. */
      ...lot("hors_france", "Québec, Maroc, Sénégal, Côte d'Ivoire", [
      "metrique_produit",
      "metrique_carre",
      ]),
    },
    /* Annexe du programme de seconde, BO n°14 du 02/04/2026, lue le 05/11/2026. */
    seconde: {
      ...lot("hors_programme", "Programme 2026 de seconde", [
      "arith_nombre_premier", // l'arithmétique s'arrête à multiple, diviseur, pair, impair
      "geo_projete_orthogonal", // plus aucune occurrence de « projeté »
      "geo_trig_identite", // seulement les lignes trigonométriques du triangle rectangle
      "droite_systeme", // reste le point d'intersection de deux droites sécantes
      "racine_domaine", // courbes au programme : valeur absolue, carré, inverse
      "reference_racine", // reste seulement la résolution de f(x) = k
      "reference_cube", // idem
      "echantillon_fluctuation", // citée dans les objectifs, aucun contenu ; reste la loi des grands nombres
    ]),
      /* Demi-plans, systèmes d'inéquations à deux inconnues, programmation linéaire. */
      ...lot("hors_france", "Sénégal, Maroc, Côte d'Ivoire, Québec", ["demi_plan_couple_solution", "demi_plan_representer", "demi_plan_systeme"]),
      /* Déterminant et Cramer ; courbes associées ; division de polynômes et Horner. */
      ...lot("hors_france", "Maroc, Belgique, Sénégal, Côte d'Ivoire", ["systeme_determinant", "systeme_cramer"]),
      ...lot("hors_france", "Suisse, Belgique, Sénégal, Côte d'Ivoire", ["courbe_translation", "courbe_dilatation_abs"]),
      ...lot("hors_france", "Maroc, Belgique, Sénégal, Côte d'Ivoire", ["poly_racine_factoriser", "poly_division", "poly_horner"]),
    },
    /* Annexe de première spécialité, BO n°14 du 02/04/2026. La terminale garde
       sinus et cosinus. La dérivée de t ↦ e^(at) reste : `exp_derivee_affine`. */
    "premiere-spe": {
      ...lot("hors_programme", "Programme 2026 de première spécialité", [
      "trig_parite",
      "trig_periodicite",
      "trig_courbes",
      "der_composee_affine",
    ]),
      /* Formules d'addition et de duplication, solutions générales sur ℝ. Le programme français garde `trigo_equation_cos` en Terminale. */
      ...lot("hors_france", "Maroc, Sénégal, Côte d'Ivoire, Belgique", ["trig_formule_addition", "trig_formule_duplication", "trig_equation_generale"]),
    },
    /* Module spécifique de première, BO n°14 du 02/04/2026 : ni « dériv » ni
       « tangente » dans le texte. ⚠️ Revient sur la décision du 14/08/2026, qui
       suivait les sujets de juin 2026 ; l'épreuve de juin 2027 porte sur le nouveau
       programme. Aucun texte lu n'exclut la dérivation en toutes lettres : c'est
       déduit du programme. Pour la rendre : retirer ce bloc. */
    premiere: lot("hors_programme", "Programme 2026 du module spécifique", [
      "der_tangente_lire",
      "der_tangente_signe",
      "der_tangente_horizontale",
      "der_comparer_vitesses",
      "der_nombre_derive_sens",
      "der_tangente_coefficient",
      "der_modele_interpreter",
      "der_derivee_constante",
      "der_derivee_identite",
      "der_derivee_carre_cube",
      "der_derivee_produit_reel",
      "der_derivee_somme",
      "der_derivee_degre2",
      "der_derivee_degre3",
      "der_calculer_nombre_derive",
      "der_signe_etudier",
      "der_signe_factorisee",
      "der_verifier_forme_factorisee",
      "der_variations_deduire",
      "der_tableau_dresser",
      "der_extremum_determiner",
      "der_optimisation",
      "der_prevoir_evolution",
    ]),
    /* Annexe de première technologique, BO n°14 du 02/04/2026. Reste la dérivée
       d'un polynôme de degré ≤ 3 ; les fréquences marginales passent en seconde. */
    stmg: lot("hors_programme", "Programme 2026 de première technologique", [
      "fct_d3_courbes",
      "fct_d3_racines",
      "fct_d3_signe",
      "fct_d3_verifier_racine",
      "don_freq_marginale",
      "don_freq_conditionnelle",
      "don_freq_completer",
      "don_freq_interpreter",
    ]),
    /* Fonction réciproque : bijection, f⁻¹, courbes symétriques, nombre dérivé. */
    "terminale-spe": {
      ...lot("hors_france", "Sénégal, Maroc, Côte d'Ivoire, Belgique, Québec", ["reciproque_bijection", "reciproque_expression", "reciproque_courbe", "reciproque_derivee"]),
      /* Exposants fractionnaires m/n, racines n-ièmes, x^r : la France s'arrête à a^(1/n) en 1re. */
      ...lot("hors_france", "Québec, Maroc, Suisse, Sénégal, Côte d'Ivoire", ["expo_ratio_racine", "expo_ratio_calcul", "expo_ratio_regles"]),
    },
  },
};

function lot(raison: RaisonMasquage, note: string, ids: string[]): Record<string, Masquage> {
  return Object.fromEntries(ids.map((id) => [id, { raison, note }]));
}

/** Les identifiants à conserver quand même : ceux qu'un lien nomme explicitement. */
export type VisibiliteCatalogue = {
  /** Micros ou notions nommées par l'adresse : elles restent, même masquées. */
  garder?: readonly (string | null | undefined)[];
  /** Tout voir, masquées comprises : scripts, admin, `/pays`. */
  tout?: boolean;
};

export function masquagesDe(classe: string, matiere: string = "maths"): Record<string, Masquage> {
  return MICROS_MASQUEES[matiere]?.[classe] ?? {};
}

export function estMasquee(classe: string, matiere: string, microId: string): boolean {
  return microId in masquagesDe(classe, matiere);
}

/**
 * Le pack tel que le coach doit le voir. Les prérequis qui visaient une micro
 * masquée sont retirés : une remédiation ne doit pas renvoyer un élève vers ce que
 * le programme a sorti. Les notions vidées par le masquage disparaissent, sauf
 * celle qu'un lien nomme : ses micros reviennent alors toutes.
 */
export function appliquerMasquage<P extends KnowledgePack>(pack: P, vis: VisibiliteCatalogue = {}): P {
  if (vis.tout) return pack;
  const masquage = masquagesDe(pack.classe, pack.matiere);
  if (Object.keys(masquage).length === 0) return pack;

  const garder = new Set((vis.garder ?? []).filter((x): x is string => Boolean(x)));

  const entierementMasquees = new Set<string>();
  for (const n of pack.notions) {
    const micros = pack.microSkills.filter((m) => m.notionId === n.id);
    if (micros.length > 0 && micros.every((m) => m.id in masquage)) entierementMasquees.add(n.id);
  }

  const microsVisibles = pack.microSkills.filter(
    (m) =>
      !(m.id in masquage) ||
      garder.has(m.id) ||
      (garder.has(m.notionId) && entierementMasquees.has(m.notionId))
  );
  const idsVisibles = new Set(microsVisibles.map((m) => m.id));
  const notionsAvecMicro = new Set(microsVisibles.map((m) => m.notionId));

  const notionsVisibles = pack.notions.filter(
    (n) => !entierementMasquees.has(n.id) || notionsAvecMicro.has(n.id)
  );
  const idsNotions = new Set(notionsVisibles.map((n) => n.id));

  return {
    ...pack,
    notions: notionsVisibles.map((n) => ({
      ...n,
      prerequis: n.prerequis.filter((id) => idsNotions.has(id)),
      microTargets: n.microTargets.filter((id) => idsVisibles.has(id)),
    })),
    microSkills: microsVisibles.map((m) => ({
      ...m,
      prerequis: m.prerequis.filter((id) => idsVisibles.has(id)),
    })),
  };
}
