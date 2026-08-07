// lib/ecrireAuProf.ts
//
// « ÉCRIS-MOI » — le nom de l'événement, et rien d'autre.
//
// Pourquoi ce fichier de trois lignes : le formulaire (components/EcrireAuProf)
// et les endroits qui l'ouvrent (le menu du compte, dans la colonne de gauche
// et dans le header) ne se voient pas. Avant le 07/08 ils n'avaient pas à se
// parler — le formulaire portait son propre bouton flottant, en bas à gauche de
// TOUTES les pages, dès qu'un élève était connecté.
//
// ⛔ CE BOUTON EST PARTI (Frédéric, 07/08). Il occupait un coin d'écran en
// permanence pour une action qu'on fait deux fois par trimestre, et sur
// l'accueil il tombait juste à côté du tiroir des demandes : deux pastilles
// rondes dans le même coin, qui ne faisaient pas la même chose.
// ⭐ LE FORMULAIRE, LUI, RESTE ENTIER. C'est la distinction à tenir dans le
// code : on a retiré l'APPEL, pas la fonction. Elle s'ouvre maintenant depuis
// une entrée nommée du menu du compte — là où l'on va quand on cherche quelque
// chose à faire, plutôt que là où l'on passait par hasard.

/** Émis pour ouvrir le formulaire « Écris-moi », de n'importe où. */
export const EVENEMENT_ECRIRE = "eleveai:ecrire-au-prof";

/** À appeler depuis un menu, un bouton, une entrée de navigation. */
export function ouvrirEcrireAuProf() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(EVENEMENT_ECRIRE));
}
