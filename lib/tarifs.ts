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
// LA RÈGLE (revue le 21/08/2026 au soir) : UN DASHBOARD = 12 € PAR AN.
//
// Un email, un tableau de bord, douze euros. Que ce soit celui d'une famille ou
// celui d'un professeur, c'est le même objet et c'est le même prix — et un prof
// peut donc dire oui sans demander l'autorisation à personne.
//
// ⚠️ CE N'EST PLUS « on divise par deux quand le cercle s'élargit » (12 → 6 → 3).
// Cette règle-là était belle et se recitait, mais elle facturait le professeur
// à l'élève : 30 élèves lui coûtaient 180 €, soit quinze fois le prix d'une
// famille pour le même geste. Un prof qui doit demander 180 € à sa coopérative
// attend une réunion ; à 12 €, il paie et il commence.
//
// L'ÉTABLISSEMENT EST À PART, ET C'EST ASSUMÉ (Frédéric : « établissement 2
// euros car dashboard compliqué ! »). Ce n'est pas la même chose à l'échelle,
// c'est un AUTRE produit : tous les niveaux, toutes les classes, la vue
// complète de la direction, et rien à gérer professeur par professeur.
//
// ⭐ ET IL EST AU FORFAIT DEPUIS LE 22/08/2026, comme le professeur : AUCUNE
// des trois lignes ne compte les élèves. Le prix par élève obligeait à
// connaître un effectif qu'on n'a pas, qui change à chaque rentrée, et qui
// transforme chaque renouvellement en négociation. Un seul nombre se signe.
// ⚠️ Et sous ~500 €, un chef d'établissement ne lit pas « bonne affaire » mais
// « gadget » — le prix bas ne rassure pas un acheteur institutionnel, il
// inquiète. Ce prix-là paie aussi le TEMPS de Frédéric : la relance au bon
// moment du calendrier budgétaire, la réunion, le déploiement.
//
// Et ce que ces nombres NE disent pas, mais qui les gouverne : l'élève ne paie
// jamais. Ce qui se paie, c'est de VOIR et de GARDER — jamais d'accéder.
// ─────────────────────────────────────────────────────────────────────────────

/** 12 € par an et PAR FAMILLE — jamais par enfant. Le frère d'à côté non plus. */
export const PRIX_FAMILLE_AN = 12;

/**
 * 12 € par an et PAR PROFESSEUR — forfaitaire, quel que soit le nombre d'élèves.
 *
 * ⭐ LE FORFAIT EST LE PRODUIT, pas une simplification comptable. À 6 € par
 * élève, une classe de 30 coûtait 180 € : un prof ne sort pas 180 € de sa poche
 * et doit passer par la coopérative, donc par une réunion, donc par la rentrée
 * suivante. À 12 €, il décide seul, ce soir. C'est la porte d'entrée des salles
 * des profs, et elle vaut plus que la différence de prix.
 */
export const PRIX_PROF_AN = 12;

/**
 * Tout l'établissement, tous les profs, plus la vue complète du principal —
 * FORFAITAIRE, quel que soit l'effectif.
 *
 * ⚠️ L'ancienne constante s'appelait `PRIX_ETABLISSEMENT_ELEVE_AN` (2 € par
 * élève). Elle n'a pas été modifiée mais SUPPRIMÉE, volontairement : douze
 * endroits écrivaient « par élève » en toutes lettres autour d'elle. Changer sa
 * valeur les aurait tous laissés mentir en silence — c'est exactement le défaut
 * que ce fichier existe pour empêcher. En la renommant, le compilateur les a
 * tous désignés.
 */
export const PRIX_ETABLISSEMENT_AN = 900;

/** « 1 € par mois » — l'arrondi se calcule, il ne se recopie pas. */
export const PRIX_FAMILLE_MENSUEL_EQUIVALENT = PRIX_FAMILLE_AN / 12;

const CLASSE_EXEMPLE_ELEVES = 30;
/** Le collège type de référence — 400 élèves, taille ordinaire d'un collège 974. */
const ETABLISSEMENT_EXEMPLE_ELEVES = 400;

/**
 * Ce que le forfait professeur donne PAR ÉLÈVE, pour une classe ordinaire.
 * C'est le chiffre qui frappe — quarante centimes — et il se calcule, donc il
 * suivra si le forfait bouge.
 */
export const EXEMPLE_CLASSE = {
  eleves: CLASSE_EXEMPLE_ELEVES,
  total: PRIX_PROF_AN,
  parEleve: PRIX_PROF_AN / CLASSE_EXEMPLE_ELEVES,
};

/**
 * Ce que le forfait établissement donne PAR ÉLÈVE, pour un collège ordinaire.
 *
 * ⭐ C'est un ARGUMENT, pas un mode de facturation — exactement le même rôle
 * que `EXEMPLE_CLASSE` pour le professeur. On ne facture plus à l'élève, mais
 * on montre ce que ça représente, parce que c'est ce chiffre qui fait dire oui.
 */
export const EXEMPLE_ETABLISSEMENT = {
  eleves: ETABLISSEMENT_EXEMPLE_ELEVES,
  total: PRIX_ETABLISSEMENT_AN,
  parEleve: PRIX_ETABLISSEMENT_AN / ETABLISSEMENT_EXEMPLE_ELEVES,
};

/**
 * L'ARGUMENT DE VENTE LE PLUS FORT DE LA PAGE, et il se calcule.
 *
 * Trente familles qui s'abonnent chacune coûtent trente fois le forfait du
 * professeur qui couvre exactement les mêmes élèves — et là, personne n'est
 * laissé dehors. Écrit en dur, ce couple de nombres se serait désaccordé au
 * premier changement de prix.
 */
export const ARGUMENT_COLLECTIF = {
  eleves: CLASSE_EXEMPLE_ELEVES,
  siChaqueFamillePaie: CLASSE_EXEMPLE_ELEVES * PRIX_FAMILLE_AN,
  siLeProfPaie: PRIX_PROF_AN,
};

/**
 * « 12 € », « 800 € » — un seul format d'écriture pour toute l'application.
 *
 * ⚠️ Le groupement se fait à la main, PAS avec `toLocaleString("fr-FR")` : le
 * formatage local dépend de la bibliothèque ICU présente, qui n'est pas la même
 * au rendu serveur et dans le navigateur. Un « 1 260 » d'un côté et un « 1,260 »
 * de l'autre, c'est un écart d'hydratation — et il ne se voit pas à la relecture.
 */
export function euros(montant: number): string {
  const groupe = String(Math.trunc(montant)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${groupe} €`;
}

/**
 * « 0,40 € » — pour les montants sous l'euro, qui ne se tronquent pas.
 * `euros()` afficherait « 0 € », ce qui est faux et se remarque.
 */
export function centimes(montant: number): string {
  return `${montant.toFixed(2).replace(".", ",")} €`;
}
