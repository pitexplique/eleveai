// lib/tutor-v4/apercus.generated.ts
//
// ⚠️ FICHIER GÉNÉRÉ — ne pas modifier à la main.
//     npm run capturer:apercus-coach -- http://localhost:3000 --tout
//
// Les notions qui ont un aperçu dans public/apercus/coach/, et le nombre
// d'écrans de chacune. La clé est « matiere/classe/notion » : un identifiant de
// notion n'est unique qu'à l'intérieur d'une classe.
//
// Une notion absente d'ici n'ouvre pas de fenêtre au survol — sa ligne reste
// exactement ce qu'elle était.

export const APERCUS_COACH: Readonly<Record<string, number>> = {
  "francais/5e/conjugaison_formes": 2,
  "francais/5e/conjugaison_temps": 2,
  "francais/5e/conjugaison_valeurs": 2,
  "francais/5e/culture_connaissances": 2,
  "francais/5e/culture_entrees_5e": 2,
  "francais/5e/discours_paroles_rapportees": 2,
  "francais/5e/discours_registres": 2,
  "francais/5e/ecriture_produire": 2,
  "francais/5e/ecriture_reflechir": 2,
  "francais/5e/ecriture_reviser": 2,
  "francais/5e/grammaire_fonctions": 2,
  "francais/5e/grammaire_groupe_nominal": 2,
  "francais/5e/grammaire_phrase": 2,
  "francais/5e/grammaire_reprises": 2,
  "francais/5e/lecture_apprecier": 2,
  "francais/5e/lecture_comprehension": 2,
  "francais/5e/lecture_oeuvre_contextes": 2,
  "francais/5e/lecture_voix_haute": 2,
  "francais/5e/oral_dire_jouer": 2,
  "francais/5e/oral_ecouter": 2,
  "francais/5e/oral_prendre_parole": 2,
  "francais/5e/orthographe_accords": 2,
  "francais/5e/orthographe_participe": 2,
  "francais/5e/vocabulaire_enrichir": 2,
  "francais/5e/vocabulaire_formation": 2,
  "francais/5e/vocabulaire_jouer": 2,
  "francais/5e/vocabulaire_orthographe": 2,
  "francais/5e/vocabulaire_relations": 2,
  "maths/5e/aire_surface": 2,
  "maths/5e/algo_construire": 2,
  "maths/5e/algo_programmation": 2,
  "maths/5e/angle_mesure": 2,
  "maths/5e/divisibilite": 2,
  "maths/5e/fraction_calcul": 2,
  "maths/5e/fraction_nombre": 2,
  "maths/5e/grandeur_conversion": 2,
  "maths/5e/litteral_calcul": 2,
  "maths/5e/parallelogramme": 2,
  "maths/5e/proba_experience": 2,
  "maths/5e/prop_proportionnalite": 2,
  "maths/5e/prop_ratio_pourcentage": 2,
  "maths/5e/relatif_nombre": 2,
  "maths/5e/relatif_operation": 2,
  "maths/5e/stat_statistique": 2,
  "maths/5e/sym_centrale": 2,
  "maths/5e/triangle_figure": 2,
  "maths/5e/volume_solide": 2,
  "maths/premiere/auto_coefficient_multiplicateur": 2,
  "maths/premiere/auto_droites": 2,
  "maths/premiere/auto_formules": 2,
  "maths/premiere/auto_indicateurs": 2,
  "maths/premiere/auto_lecture_graphique": 2,
  "maths/premiere/auto_ordres_unites": 2,
  "maths/premiere/auto_resolution_graphique": 2,
  "maths/premiere/auto_taux_evolution": 2,
  "maths/premiere/info_ajustement_affine": 2,
  "maths/premiere/info_point_moyen": 2,
  "maths/premiere/info_representations_croisees": 2,
  "maths/premiere/info_tableur": 2,
};

/** Le chemin de l'aperçu d'une notion, ou `null` si elle n'en a pas. */
export function apercuNotion(
  matiere: string,
  classe: string,
  notion: string,
): { src: string; ecrans: number } | null {
  const cle = `${matiere}/${classe}/${notion}`;
  const ecrans = APERCUS_COACH[cle];
  if (!ecrans) return null;
  return { src: `/apercus/coach/${cle}.${ecrans}.webp`, ecrans };
}
