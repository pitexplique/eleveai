// L'HISTORIQUE DES DEMANDES — la clé, l'événement, et comment le lire.
//
// Deux composants s'en servent et ils ne se voient pas : l'entrée ÉCRIT
// (components/matrice/EntreeMatrice), la colonne de gauche LIT
// (components/accueil/ColonneGauche). Chacun vivait avec sa propre copie de la
// chaîne "eleveai.ia.historique" — une faute de frappe d'un côté et le RÉCENT
// se serait vidé sans que rien ne casse ni ne prévienne.
//
// ⭐ L'ÉVÉNEMENT EST LE POINT IMPORTANT. Un `localStorage.setItem` ne réveille
// personne dans l'onglet qui écrit : l'événement `storage` du navigateur ne se
// déclenche QUE dans les AUTRES onglets. Sans ce signal maison, la demande
// qu'on vient de poser n'apparaissait dans la colonne qu'au chargement de page
// suivant — et depuis que le bloc « vos dernières demandes » a quitté le bas de
// l'écran, la colonne est le seul endroit qui la porte.

import type { ProfilId } from "./types";

export const CLE_HISTORIQUE = "eleveai.ia.historique";

/** Émis dans l'onglet courant à chaque écriture. Voir la note ci-dessus. */
export const EVENEMENT_HISTORIQUE = "eleveai:historique";

/**
 * « + Nouvelle demande » — émis par la colonne, écouté par l'entrée.
 *
 * ⚠️ POURQUOI UN ÉVÉNEMENT ALORS QUE L'URL SUFFIRAIT PRESQUE. Le bouton pointe
 * vers `/accueil`, et une URL nue veut bien dire « repars à blanc » : depuis
 * `/accueil?d=…` le changement se voit, l'entrée se vide. Mais depuis
 * `/accueil` tout court — quelqu'un qui a tapé une question sans la valider,
 * ou qui vient d'en poser une — l'URL ne bouge pas d'un caractère, et le
 * bouton ne faisait donc rien du tout. C'est le même piège que la navigation
 * douce qui empêchait de rejouer une demande : une URL identique n'est pas un
 * signal. Celui-ci part à tous les coups.
 */
export const EVENEMENT_NOUVELLE_DEMANDE = "eleveai:nouvelle-demande";

export type EntreeHistorique = {
  question: string;
  profil: ProfilId;
  /**
   * L'HORODATAGE EST AUSSI L'IDENTIFIANT (17/08/2026).
   *
   * Il ne servait qu'à écrire « 11 août » sous la demande. Depuis qu'on peut
   * rejouer une demande et la supprimer, il faut pouvoir DÉSIGNER une ligne, et
   * la question ne le peut pas : elle est éditable, elle se répète, et deux
   * « fraction » posées en CM1 puis en 5ᵉ sont deux demandes différentes.
   */
  quand: number;
  /**
   * ⭐ AJOUTÉ LE 07/08 — la matière de la demande, quand on la connaît.
   *
   * Le RÉCENT empilait tout dans une seule liste : trente demandes de quatre
   * matières mélangées, et retrouver « la question de conjugaison de mardi »
   * demandait de toutes les relire. C'est ce champ qui fait exister les
   * filtres de la colonne.
   *
   * ⚠️ FACULTATIF, ET IL LE RESTERA : les demandes déjà enregistrées n'en ont
   * pas, et une demande peut très bien n'avoir aucune matière (« où j'en
   * suis »). Sans matière, l'entrée se range dans « Autres » — jamais dans une
   * matière choisie au hasard.
   */
  matiere?: string | null;
  /** Le libellé lisible du niveau au moment de la demande (« 4e », « Parent »). */
  niveau?: string | null;

  // ─── CE QU'IL FAUT POUR REJOUER LA DEMANDE (17/08/2026) ──────────────────
  //
  // ⭐ Frédéric : « lorsqu'on essaie de supprimer ça ne fonctionne pas, si on
  // sélectionne ça ne marche pas ». Les deux gestes manquaient pour la même
  // raison : on enregistrait la QUESTION et rien de ce qui l'entourait. Cliquer
  // une ligne du RÉCENT recollait donc le texte dans le champ en repartant du
  // profil du jour — « fraction », demandée en CM1 le 11 août, se rejouait en
  // 5ᵉ sans matière ni intention. Ce n'était pas la demande d'avant, c'était la
  // même phrase dans un autre contexte.
  //
  // Une demande, c'est quatre choses : qui on est, de quelle classe on parle,
  // quelle matière est allumée, et ce qu'on veut en faire. On les garde toutes.

  /**
   * LA CLASSE DITE PAR UN ADULTE. `null` chez l'élève — chez lui la classe EST
   * le profil, et l'écrire deux fois romprait l'invariant de VecteurEntree.
   */
  classe?: ProfilId | null;
  /**
   * Le LIBELLÉ de la matière allumée (« Mathématiques »), et non son
   * identifiant.
   *
   * ⚠️ Les deux existent, ils ne sont pas interchangeables et c'est pour ça
   * qu'il y a deux champs. `matiere` porte l'id (« maths ») : il vient du
   * moteur, il sert aux filtres, et il est renseigné même quand personne n'a
   * rien cliqué. Celui-ci porte le libellé du BOUTON, seul mot que
   * `matieresDisponibles` sait rallumer — et il reste vide si la matière a été
   * seulement devinée. Rallumer un bouton que l'élève n'a pas pressé, ce serait
   * lui prêter un choix qu'il n'a pas fait.
   */
  matiereLabel?: string | null;
  /** Le libellé de l'intention allumée (« M'entraîner »). Même règle. */
  intention?: string | null;
};

/** Ne jette jamais : en navigation privée, l'historique vaut simplement []. */
export function lireHistorique(): EntreeHistorique[] {
  try {
    const brut = localStorage.getItem(CLE_HISTORIQUE);
    if (!brut) return [];
    const lu = JSON.parse(brut);
    return Array.isArray(lu) ? (lu as EntreeHistorique[]) : [];
  } catch {
    return [];
  }
}

/**
 * ÉCRIT LA LISTE, ET PRÉVIENT L'ÉCRAN. Les deux gestes ensemble, toujours.
 *
 * ⚠️ C'ÉTAIT ÉCRIT À LA MAIN DANS EntreeMatrice, et l'oubli était structurel :
 * la colonne ne peut pas se contenter d'écrire dans localStorage, il faut aussi
 * qu'elle émette l'événement — sinon elle supprime une ligne et la liste ne
 * bouge pas tant qu'on ne recharge pas la page. Le `setItem` et le
 * `dispatchEvent` ne se séparent jamais : on les met donc hors de portée.
 */
export function ecrireHistorique(liste: EntreeHistorique[]): void {
  try {
    localStorage.setItem(CLE_HISTORIQUE, JSON.stringify(liste));
    window.dispatchEvent(new Event(EVENEMENT_HISTORIQUE));
  } catch {
    /* navigation privée : la demande vit le temps de la visite */
  }
}

/**
 * Oublie UNE demande — celle qu'on désigne par son horodatage.
 *
 * ⚠️ PAR `quand`, JAMAIS PAR LA QUESTION. Supprimer « fraction » effacerait la
 * demande de CM1 et celle de 5ᵉ d'un seul clic, alors qu'on n'en visait qu'une.
 * Rend la liste écrite, pour que l'appelant n'ait pas à la relire.
 */
export function oublierDemande(quand: number): EntreeHistorique[] {
  const suite = lireHistorique().filter((e) => e.quand !== quand);
  ecrireHistorique(suite);
  return suite;
}

/** Retrouve une demande par son horodatage — c'est ce que porte l'URL. */
export function lireDemande(quand: number): EntreeHistorique | null {
  return lireHistorique().find((e) => e.quand === quand) ?? null;
}

/**
 * Les filtres du RÉCENT. « Toutes » d'abord — c'est la vue principale, celle
 * qui ne cache rien — puis les matières, puis « Autres » pour ce qui n'en a
 * aucune. Les sciences ne sont pas encore une matière d'EleveAI : elles
 * n'apparaissent donc pas, on n'ouvre pas un rayon vide.
 */
export const FILTRES_MATIERE: { id: string | null; label: string }[] = [
  { id: null, label: "Toutes" },
  { id: "maths", label: "Mathématiques" },
  { id: "francais", label: "Français" },
  { id: "anglais", label: "Anglais" },
  { id: "espagnol", label: "Espagnol" },
  { id: "ia", label: "IA" },
  { id: "autres", label: "Autres" },
];

/** Une entrée entre-t-elle dans ce filtre ? */
export function correspondAuFiltre(e: EntreeHistorique, filtre: string | null): boolean {
  if (filtre === null) return true;
  if (filtre === "autres") return !e.matiere;
  return e.matiere === filtre;
}
