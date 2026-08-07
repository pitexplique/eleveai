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

export type EntreeHistorique = {
  question: string;
  profil: ProfilId;
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
