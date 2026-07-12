// lib/points/feedbackPoints.ts
//
// Points gagnes par les eleves quand ils donnent leur avis (page /votre-avis).
// Idee (13/06/2026, demande de l'epouse) : recompenser la participation.
//
// Regles : chaque retour rapporte des points de base (recompense immediate) ;
// un retour marque « traite » par l'enseignant rapporte un bonus (recompense
// la qualite, decourage le spam) ; une contribution mise « a l'honneur »
// (retenue, publiee et signee sur le mur des ameliorations) rapporte le plus
// gros bonus : c'est LE moment ou l'eleve devient auteur d'une amelioration.
// Les points sont CALCULES depuis la table retours_eleves : rien a stocker,
// les retours deja envoyes comptent.

export const POINTS_PAR_RETOUR = 5;
export const BONUS_RETOUR_TRAITE = 20;
export const BONUS_A_LHONNEUR = 50;

// nbALHonneur s'ajoute par-dessus (un retour a l'honneur est aussi « traite » :
// il cumule +5 +20 +50 = +75). Parametre optionnel pour ne rien casser des
// appels existants a deux arguments.
export function calculerPointsAvis(
  nbRetours: number,
  nbTraites: number,
  nbALHonneur = 0
): number {
  const retours = Math.max(0, nbRetours);
  const traites = Math.max(0, Math.min(nbTraites, retours));
  const alHonneur = Math.max(0, Math.min(nbALHonneur, retours));
  return (
    retours * POINTS_PAR_RETOUR +
    traites * BONUS_RETOUR_TRAITE +
    alHonneur * BONUS_A_LHONNEUR
  );
}
