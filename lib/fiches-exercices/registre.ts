// Registre des fiches d'exercices : LA source de vérité de la liste. Même
// principe que `lib/fiches/registre.ts` pour les fiches de cours — une ligne ici,
// et la fiche est au sitemap (app/sitemap.ts) et sur la ligne de sa notion dans
// le coach (app/coach-ia/[matiere]/page.tsx). Rien d'autre à maintenir.
//
// ⚠️ La clé est `<matière>/<classe>/<slug de la notion du coach>`, en tirets :
// c'est ce qui permet au coach de retrouver la fiche depuis un `notionId`.

type FicheExercicesEntry = { titre: string; resume: string };

export const FICHES_EXERCICES_REGISTRE: Record<string, FicheExercicesEntry> = {
  // ⭐ LA PREMIÈRE (15/09/2026) — écrite pour la fille de Frédéric, en 1re, qui
  // teste ce soir. Le verdict est pour demain.
  "maths/premiere-spe/exponentielle": {
    titre: "L'exponentielle : 20 exercices corrigés",
    resume:
      "Du geste seul au problème de contrôle : calculer, résoudre, dériver, étudier. Un rappel de cours avant chaque niveau, et chaque corrigé étape par étape.",
  },
};

export function hrefFicheExercices(matiere: string, classe: string, notion: string) {
  return `/fiches-exercices/${matiere}/${classe}/${notion}`;
}

/** Le lien de la fiche d'exercices d'une notion DU COACH, ou null. Le slug de
 *  la fiche EST le `notionId` du coach, en tirets. */
export function ficheExercicesHrefPourCoach(
  matiere: string,
  classe: string,
  coachNotionId: string,
): string | null {
  if (!matiere || !classe || !coachNotionId) return null;
  const cle = `${matiere}/${classe.toLowerCase()}/${coachNotionId.toLowerCase().replace(/_/g, "-")}`;
  return FICHES_EXERCICES_REGISTRE[cle] ? `/fiches-exercices/${cle}` : null;
}
