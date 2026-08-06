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

export type EntreeHistorique = { question: string; profil: ProfilId; quand: number };

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
