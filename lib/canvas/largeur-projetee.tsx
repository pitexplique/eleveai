"use client";

import { createContext, useContext } from "react";

/**
 * ⭐⭐ LA LARGEUR DE REPLI D'UN CANVAS DÉPEND DE L'ENDROIT OÙ IL EST RENDU,
 * pas de la fiche qui l'a écrit (01/09/2026).
 *
 * ⛔ LE DÉFAUT MESURÉ. Les fiches fixent `largeurMax: 190`, calé sur la carte
 * de fiche (222 px sur un téléphone de 375). Le `PhraseCanvas` plie alors la
 * phrase à un mot par ligne : « C'est / le facteur / qui / apporte / le
 * courrier » donne un viewBox de 200 × 356, très haut et très étroit. Sur la
 * fiche, c'est juste. En MODE CLASSE, le même SVG est en `w-full` dans une
 * colonne de 394 px : il est agrandi ×1,97 et fait 702 px de haut, dans une
 * diapo qui n'en montre que 621.
 *
 * Mesure du 01/09, fiche `francais-cm1-grammaire-phrase`, en 1280 × 720 :
 *   définition 1/5 → dessin 702 px → débordement 274
 *   propriété 1/6  → dessin 592 px → débordement 156
 *   propriété 5/6  → dessin 702 px → débordement 177
 *   ⭐ toute diapo SANS dessin tenait ; le débordement valait la hauteur du
 *   dessin moins ~525. La cause n'était donc pas le texte.
 *
 * ⛔ CE QUI NE MARCHE PAS, ET QUI A DÉJÀ ÉTÉ ESSAYÉ :
 *   · borner le conteneur (`max-h` + `[&_svg]:w-auto`) — le SVG s'effondre, et
 *     la mesure ne bouge pas d'un pixel (retiré le 31/08) ;
 *   · faire lire au canvas la largeur de son conteneur — il se rendrait alors
 *     à l'échelle 1, et le texte projeté tomberait de 24 px à 12 : le mode
 *     classe PROFITE de l'agrandissement, il ne faut pas le supprimer.
 *
 * ⭐ D'OÙ CE CONTEXTE : c'est la SURFACE qui impose sa largeur de repli, en
 * unités de viewBox. Le mode classe demande une phrase plus large — donc moins
 * de lignes, donc moins haute — tout en gardant un facteur d'agrandissement
 * supérieur à 1. La page de fiche, elle, ne fournit aucun contexte : les
 * fiches gardent exactement leur rendu d'avant.
 */
export const LargeurProjetee = createContext<number | undefined>(undefined);

/** La largeur de repli imposée par la surface, s'il y en a une. */
export function useLargeurProjetee(): number | undefined {
  return useContext(LargeurProjetee);
}
