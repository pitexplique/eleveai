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
  "maths/5e/aire_surface": 1,
  "maths/5e/algo_construire": 1,
  "maths/5e/algo_programmation": 1,
  "maths/5e/angle_mesure": 1,
  "maths/5e/divisibilite": 1,
  "maths/5e/fraction_calcul": 1,
  "maths/5e/fraction_nombre": 1,
  "maths/5e/grandeur_conversion": 1,
  "maths/5e/litteral_calcul": 1,
  "maths/5e/parallelogramme": 1,
  "maths/5e/proba_experience": 1,
  "maths/5e/prop_proportionnalite": 1,
  "maths/5e/prop_ratio_pourcentage": 1,
  "maths/5e/relatif_nombre": 1,
  "maths/5e/relatif_operation": 1,
  "maths/5e/stat_statistique": 1,
  "maths/5e/sym_centrale": 1,
  "maths/5e/triangle_figure": 1,
  "maths/5e/volume_solide": 1,
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
