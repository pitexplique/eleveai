// lib/tarifs.ts
//
// UN SEUL ENDROIT POUR LES PRIX (grille du 22/08/2026).
//
// Ils vivaient en trois exemplaires : la carte de `/tarifs`, la FAQ de la même
// page, et la description que Google affiche dans ses résultats. La grille a
// changé trois fois depuis juin, et à chaque fois un des trois est resté en
// arrière — la SERP a annoncé « 4,90 €/mois » des semaines après que la carte
// eut cessé de le dire. ⛔ Ne recopier un prix nulle part : l'importer.
//
// ─────────────────────────────────────────────────────────────────────────────
// LA GRILLE : UNE ÉCHELLE, ET ELLE DIT QUI PAIE — PAS QUOI ON ACHÈTE.
//
//   • Famille       1,00 € par élève et par MOIS
//   • Classe        0,75 € par élève et par MOIS
//   • Établissement 0,50 € par élève et par MOIS, JAMAIS PLUS DE 2 000 € PAR AN
//
// ⭐ ON PAIE UNE FOIS, JAMAIS DEUX, et plus le payeur est large moins l'élève
// coûte. Ce ne sont pas trois produits empilés : ce sont trois payeurs
// possibles pour le même élève.
//
// ⭐ ET C'EST LA PREMIÈRE GRILLE SANS FAILLE DANS AUCUN SENS — il en a fallu
// cinq. Pour 400 élèves : les familles 4 800 €, les classes 3 600 €,
// l'établissement 2 000 €. Strictement décroissant, donc aucun payeur n'a
// intérêt à en contourner un autre. Toutes les versions précédentes avaient une
// inversion quelque part, et c'est toujours par là qu'un principal entrait.
// ⛔ TOUTE MODIFICATION D'UN DES TROIS TAUX SE VÉRIFIE SUR CES TROIS TOTAUX
// avant d'être écrite. L'inversion ne se voit pas dans les taux, elle se voit
// dans les totaux.
//
// ⭐ TOUT SE DIT AU MOIS (Frédéric, 22/08 : « on met tout par mois ! »). C'est
// l'unité qui rend les prix comparables entre eux et comparables à la vie : 1 €
// se compare à un café, 12 € à un abonnement. ⚠️ ET C'EST LE MOIS QUI FIXE LES
// NOMBRES RONDS, pas l'année : à 5 € par an, l'établissement tombait sur
// 0,42 € par mois, qu'on ne retient pas.
//
// ⚠️ LA FOURCHETTE, ET ELLE EST DE FRÉDÉRIC (22/08) : « on doit rester entre 1
// et 2 euros par mois par élève, on est 10 fois moins cher que les autres ».
// C'est le POSITIONNEMENT, et il ne se négocie pas vers le bas : sous 1 €, le
// prix cesse de se lire comme une affaire et se lit comme un amateurisme.
//
// ⚠️ SA FOURCHETTE ET SON SEUIL DE 2 000 € SE CONTREDISENT au-delà de 167
// élèves (2 000 ÷ 12). Ils tiennent ensemble d'une seule façon, celle retenue
// ici : le PRIX AFFICHÉ reste dans la fourchette — 1 € par élève et par mois —
// et le PLAFOND fait la remise de volume. Un collège de 400 élèves paierait
// 4 800 € au tarif ; il paie 2 000 €.
//
// ⭐ CE QUI A DÉBLOQUÉ TOUT LE RESTE (Frédéric, 22/08) : « un prof propose
// parfois un livre à 12 euros », puis « je suis prêt à demander à mes élèves
// 12 euros l'année ». LE PROFESSEUR N'EST PAS LE CLIENT, IL EST LE
// PRESCRIPTEUR. Il ne paie pas le livre : il l'inscrit sur la liste, et les
// familles l'achètent. Pas de coopérative, pas de réunion, pas de principal —
// le blocage sur lequel butaient toutes les versions précédentes n'existe pas
// dans ce modèle, parce qu'il n'y a rien à débloquer.
//
// ⚠️ TROIS GRILLES SONT MORTES EN 24 H, NE PAS LES RESSUSCITER :
//   1. Le dégressif 12 → 6 → 3 : facturait le prof à l'élève, 180 € la classe.
//   2. Le forfait « un dashboard = 12 €, quel que soit le nombre d'élèves » :
//      un seul professeur pouvait déclarer tout un collège, et l'offre
//      établissement devenait indéfendable devant un principal qui calcule.
//   3. La classe vendue au professeur (30 €, puis 300 €) : elle mettait l'offre
//      famille et l'offre classe en concurrence frontale sur la même page, et
//      disait au parent « n'achète pas, attends que ton prof paie ».
//
// ⚠️⚠️ LE PIÈGE D'UNITÉ, ET IL EST PIRE DEPUIS LE 22/08 AU SOIR : LA GRILLE
// CONTIENT MAINTENANT TROIS « 1 € » DANS DEUX UNITÉS.
//     famille       1 € par MOIS   (12 € l'an)
//     classe        1 € par AN     (30 € la classe, 2,50 € par mois)
//     établissement 0,50 € par MOIS (6 € l'an, plafonné)
// Frédéric s'est déjà trompé une fois — « ça fait un euro par élève et par mois
// en gros », alors que c'était par an — et l'erreur vaut un facteur douze sur
// tout le chiffre d'affaires.
// ⛔ NE JAMAIS ÉCRIRE « 1 € » SANS SON UNITÉ, nulle part, pas même dans un
// commentaire. Et sur la page, TOUT S'AFFICHE AU MOIS : la classe se montre à
// 2,50 € par mois, le « 1 € par élève et par an » ne vient qu'en dessous, comme
// mécanique. C'est la seule protection qui ne dépend pas de la vigilance.
//
// ⛔ ET LA LIGNE QUI NE SE FRANCHIT PAS. Ce qui se prescrit, c'est LA FENÊTRE DU
// PARENT — jamais l'accès de l'enfant. Le livre, lui, franchit cette ligne :
// l'élève qui ne l'a pas ne suit pas, et ça se voit au premier rang. Ici
// l'enfant dont la famille ne paie pas travaille à l'identique. Le risque n'est
// pas dans le code, il est dans la salle : un professeur qui ramasse 12 € voit
// les huit qui ne les ont pas. Donc les familles s'abonnent EN DIRECT, le
// professeur ne ramasse rien, et son tableau de bord affiche ses 30 élèves sans
// distinction. ⛔ AUCUN COMPTEUR « 14 abonnés sur 30 » NULLE PART — c'est
// exactement le genre de chiffre qu'on ajoute un jour parce qu'il est facile.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ⭐ 1 € PAR MOIS ET PAR FAMILLE — jamais par enfant. Le frère d'à côté non plus.
 *
 * LE MOIS EST LA SOURCE, l'année s'en déduit. C'est l'inverse de ce que faisait
 * ce fichier jusqu'au 22/08, et ce n'est pas cosmétique : tant que l'année était
 * la source, le prix mensuel était un arrondi qu'on affichait, et Frédéric s'est
 * trompé d'un facteur douze en le relisant.
 */
export const PRIX_FAMILLE_MOIS = 1;
export const PRIX_FAMILLE_AN = PRIX_FAMILLE_MOIS * 12;

/** Gardé sous son ancien nom : il est importé par la page depuis juin. */
export const PRIX_FAMILLE_MENSUEL_EQUIVALENT = PRIX_FAMILLE_MOIS;

/**
 * 0,75 € PAR ÉLÈVE ET PAR MOIS — le deuxième barreau de l'échelle.
 *
 * ⚠️ ET C'EST LE CHIFFRE LE PLUS FRAGILE DE LA GRILLE. Une classe de 30 fait
 * 22,50 € par mois, soit 270 € l'année. Frédéric s'est dit prêt à payer 15 € par
 * mois pour une classe : on est à une fois et demie son propre plafond.
 * ⛔ LA CLASSE S'AFFICHE DONC AU MOIS, JAMAIS À L'ANNÉE. « 22,50 € par mois »
 * se décide seul ; « 270 € » renvoie à la coopérative, donc à une réunion, donc
 * à la rentrée suivante — c'est le mur sur lequel quatre grilles sont mortes le
 * 22/08. Ici le choix de l'unité ne décore pas, il décide si l'offre se vend.
 */
export const PRIX_CLASSE_ELEVE_MOIS = 0.75;

/**
 * 0,50 € PAR ÉLÈVE ET PAR MOIS — la moitié du prix famille, au même compteur.
 *
 * ⭐ C'est le seul endroit de la grille où deux nombres se comparent
 * directement, et le rapport se retient. D'où 0,50 € plutôt qu'un montant annuel
 * rond, qui aurait donné 0,42 € par mois — qu'on ne retient pas.
 */
export const PRIX_ETABLISSEMENT_ELEVE_MOIS = 0.5;

/**
 * ⭐ JAMAIS PLUS DE 2 000 € PAR AN, QUEL QUE SOIT L'EFFECTIF — et ce nombre est
 * de Frédéric (22/08) : « en dessous de 2 000 euros un établissement n'a pas de
 * pb ». C'est un seuil de friction d'achat, pas un arrondi commercial.
 *
 * ⭐ ET LE SEUIL EST VÉRIFIÉ, PAS SUPPOSÉ : son ancien proviseur lui a débloqué
 * 1 500 € l'an dernier, plus 37 € de l'heure supplémentaire. Le circuit court
 * existe, il l'a déjà emprunté, et 2 000 € reste au-dessus de ce qui est passé.
 *
 * ⚠️ Le plafond mord dès 334 élèves : un petit collège paie au tarif, un gros ne
 * franchit jamais le seuil de son proviseur.
 */
export const PLAFOND_ETABLISSEMENT_AN = 2000;

/** Ce que facture un établissement de `eleves` élèves, plafond compris. */
export function factureEtablissement(eleves: number): number {
  return Math.min(eleves * PRIX_ETABLISSEMENT_ELEVE_MOIS * 12, PLAFOND_ETABLISSEMENT_AN);
}

/** Une classe ordinaire : le nombre qui sert d'étalon à toute la page. */
const CLASSE_EXEMPLE_ELEVES = 30;

/** 400 et non 420 : c'est le nombre sur lequel Frédéric raisonne depuis le 21/08. */
const ETABLISSEMENT_EXEMPLE_ELEVES = 400;

export const EXEMPLE_CLASSE = {
  eleves: CLASSE_EXEMPLE_ELEVES,
  parMois: CLASSE_EXEMPLE_ELEVES * PRIX_CLASSE_ELEVE_MOIS,
  parAn: CLASSE_EXEMPLE_ELEVES * PRIX_CLASSE_ELEVE_MOIS * 12,
  /** 9 € — la seule unité qui se compare à Kwyk (72 €) et Mathia (96 €). */
  parEleveAn: PRIX_CLASSE_ELEVE_MOIS * 12,
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
  total: factureEtablissement(ETABLISSEMENT_EXEMPLE_ELEVES),
  sansPlafond: ETABLISSEMENT_EXEMPLE_ELEVES * PRIX_ETABLISSEMENT_ELEVE_MOIS * 12,
  parMois: factureEtablissement(ETABLISSEMENT_EXEMPLE_ELEVES) / 12,
  /** 5 € — le tarif est de 6 €, le plafond ramène l'exemple à 5 €. */
  parEleveAn: factureEtablissement(ETABLISSEMENT_EXEMPLE_ELEVES) / ETABLISSEMENT_EXEMPLE_ELEVES,
};

/**
 * ⭐ L'ÉCHELLE, CALCULÉE SUR UN SEUL EFFECTIF — c'est la démonstration de la
 * page, et c'est aussi le test de non-régression de la grille.
 *
 * ⛔ Les trois totaux DOIVENT rester strictement décroissants. Si une inversion
 * apparaît, un payeur a intérêt à en contourner un autre, et c'est toujours par
 * là qu'un principal est entré dans les versions précédentes. L'inversion ne se
 * voit jamais dans les taux — seulement ici.
 */
export const ECHELLE = {
  eleves: ETABLISSEMENT_EXEMPLE_ELEVES,
  siLesFamillesPaient: ETABLISSEMENT_EXEMPLE_ELEVES * PRIX_FAMILLE_MOIS * 12,
  siLesClassesPaient: ETABLISSEMENT_EXEMPLE_ELEVES * PRIX_CLASSE_ELEVE_MOIS * 12,
  siLEtablissementPaie: factureEtablissement(ETABLISSEMENT_EXEMPLE_ELEVES),
};

/** L'argument de la carte Établissement : ce que les familles ne débourseront pas. */
export const ARGUMENT_ETABLISSEMENT = {
  eleves: ETABLISSEMENT_EXEMPLE_ELEVES,
  siLesFamillesPaient: ECHELLE.siLesFamillesPaient,
  siLEtablissementPaie: ECHELLE.siLEtablissementPaie,
};

/**
 * « 12 € », « 2 000 € » — un seul format d'écriture pour toute l'application.
 *
 * ⚠️ Le groupement se fait à la main, PAS avec `toLocaleString("fr-FR")` : le
 * formatage local dépend de la bibliothèque ICU présente, qui n'est pas la même
 * au rendu serveur et dans le navigateur. Un « 1 260 » d'un côté et un « 1,260 »
 * de l'autre, c'est un écart d'hydratation — et il ne se voit pas à la relecture.
 */
export function euros(montantEuros: number): string {
  const groupe = String(Math.trunc(montantEuros)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${groupe} €`;
}

/**
 * « 0,40 € » — pour les montants sous l'euro, qui ne se tronquent pas.
 * `euros()` afficherait « 0 € », ce qui est faux et se remarque.
 */
export function centimes(montantEuros: number): string {
  return `${montantEuros.toFixed(2).replace(".", ",")} €`;
}

/**
 * Le bon des deux, choisi tout seul : « 5 € » pour un compte rond, « 0,40 € »
 * sinon. Les prix tombent juste aujourd'hui ; il n'y a aucune raison qu'ils
 * tombent juste après le prochain changement.
 */
export function montant(valeur: number): string {
  return Number.isInteger(valeur) ? euros(valeur) : centimes(valeur);
}
