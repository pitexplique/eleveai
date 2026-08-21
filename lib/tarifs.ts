// lib/tarifs.ts
//
// UN SEUL ENDROIT POUR LES PRIX (21/08/2026).
//
// Ils vivaient en trois exemplaires : la carte de `/tarifs`, la FAQ de la même
// page, et la description que Google affiche dans ses résultats. La grille a
// changé trois fois depuis juin, et à chaque fois un des trois est resté en
// arrière — la SERP a annoncé « 4,90 €/mois » des semaines après que la carte
// eut cessé de le dire. ⛔ Ne recopier un prix nulle part : l'importer.
//
// ─────────────────────────────────────────────────────────────────────────────
// LA RÈGLE, PLUTÔT QUE LA GRILLE : on divise par deux chaque fois que le cercle
// s'élargit. 12 → 6 → 3. Un prof peut la redire à son principal sans avoir la
// page sous les yeux, ce qu'une grille 12/5/4 ne permettait pas.
//
// Et ce que ces trois nombres NE disent pas, mais qui les gouverne : l'élève ne
// paie jamais. Ce qui se paie, c'est de VOIR et de GARDER — jamais d'accéder.
// Si l'enfant d'à côté ne paie pas, il apprend exactement la même chose.
// ─────────────────────────────────────────────────────────────────────────────

/** 12 € par an et PAR FAMILLE — jamais par enfant. Le frère d'à côté non plus. */
export const PRIX_FAMILLE_AN = 12;

/** Un prof qui équipe sa ou ses classes. Les familles de la classe ne paient rien. */
export const PRIX_CLASSE_ELEVE_AN = 6;

/** Tout l'établissement, tous les profs, plus la vue complète du principal. */
export const PRIX_ETABLISSEMENT_ELEVE_AN = 3;

/** « Moins d'un euro par mois » — l'arrondi se calcule, il ne se recopie pas. */
export const PRIX_FAMILLE_MENSUEL_EQUIVALENT = PRIX_FAMILLE_AN / 12;

const CLASSE_EXEMPLE_ELEVES = 30;
const ETABLISSEMENT_EXEMPLE_ELEVES = 420;

export const EXEMPLE_CLASSE = {
  eleves: CLASSE_EXEMPLE_ELEVES,
  total: CLASSE_EXEMPLE_ELEVES * PRIX_CLASSE_ELEVE_AN,
};

export const EXEMPLE_ETABLISSEMENT = {
  eleves: ETABLISSEMENT_EXEMPLE_ELEVES,
  total: ETABLISSEMENT_EXEMPLE_ELEVES * PRIX_ETABLISSEMENT_ELEVE_AN,
};

/**
 * L'ARGUMENT DE VENTE LE PLUS FORT DE LA PAGE, et il se calcule.
 *
 * Trente familles qui s'abonnent chacune coûtent le double de la même classe
 * payée par la coopérative — et là, personne n'est laissé dehors. Écrit en dur,
 * ce couple de nombres se serait désaccordé au premier changement de prix.
 */
export const ARGUMENT_COLLECTIF = {
  eleves: CLASSE_EXEMPLE_ELEVES,
  siChaqueFamillePaie: CLASSE_EXEMPLE_ELEVES * PRIX_FAMILLE_AN,
  siLaClassePaie: CLASSE_EXEMPLE_ELEVES * PRIX_CLASSE_ELEVE_AN,
};

/**
 * « 12 € », « 1 260 € » — un seul format d'écriture pour toute l'application.
 *
 * ⚠️ Le groupement se fait à la main, PAS avec `toLocaleString("fr-FR")` : le
 * formatage local dépend de la bibliothèque ICU présente, qui n'est pas la même
 * au rendu serveur et dans le navigateur. Un « 1 260 » d'un côté et un « 1,260 »
 * de l'autre, c'est un écart d'hydratation — et il ne se voit pas à la relecture.
 */
export function euros(montant: number): string {
  const groupe = String(Math.trunc(montant)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${groupe} €`;
}
