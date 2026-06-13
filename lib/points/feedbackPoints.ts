// lib/points/feedbackPoints.ts
//
// Points gagnes par les eleves quand ils donnent leur avis (page /votre-avis).
// Idee (13/06/2026, demande de l'epouse) : recompenser la participation.
//
// Regles : chaque retour rapporte des points de base (recompense immediate) ;
// un retour marque « traite » par l'enseignant rapporte un bonus (recompense
// la qualite, decourage le spam). Les points sont CALCULES depuis la table
// retours_eleves : rien a stocker, les retours deja envoyes comptent.

export const POINTS_PAR_RETOUR = 5;
export const BONUS_RETOUR_TRAITE = 20;

export function calculerPointsAvis(nbRetours: number, nbTraites: number): number {
  const retours = Math.max(0, nbRetours);
  const traites = Math.max(0, Math.min(nbTraites, retours));
  return retours * POINTS_PAR_RETOUR + traites * BONUS_RETOUR_TRAITE;
}
