import type { FamilleDico, MotDico } from "../types";

// 🔢 Dico Maths CM1 — les fondations (la marche sous le CM2).
// Volontairement SANS recouvrement avec le CM2 (fractions, décimaux, aires… = CM2).

function carte(
  id: string,
  mot: string,
  famille: FamilleDico,
  definition: string,
  aide?: string
): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsMathsCM1: MotDico[] = [
  // ── Nombres & calcul ──────────────────────────────────────────
  carte("cm1-m-chiffre", "Chiffre", "nombres-calcul", "Un des dix symboles (0, 1, 2… 9) qui servent à écrire les nombres."),
  carte("cm1-m-dizaine", "Dizaine", "nombres-calcul", "Un paquet de dix unités."),
  carte("cm1-m-centaine", "Centaine", "nombres-calcul", "Un paquet de cent unités."),
  carte("cm1-m-millier", "Millier", "nombres-calcul", "Un paquet de mille unités."),
  carte("cm1-m-somme", "Somme", "nombres-calcul", "Le résultat d'une addition."),
  carte("cm1-m-double", "Double", "nombres-calcul", "Le double de 4, c'est 8 : deux fois le nombre."),
  carte("cm1-m-moitie", "Moitié", "nombres-calcul", "La moitié de 10, c'est 5 : le nombre partagé en deux."),
  carte("cm1-m-pair", "Pair", "nombres-calcul", "Un nombre pair se termine par 0, 2, 4, 6 ou 8."),

  // ── Géométrie ─────────────────────────────────────────────────
  carte("cm1-m-segment", "Segment", "geometrie", "Un morceau de droite limité par deux points."),
  carte("cm1-m-droite", "Droite", "geometrie", "Une ligne droite illimitée des deux côtés."),
  carte("cm1-m-milieu", "Milieu", "geometrie", "Le point au centre d'un segment, à égale distance des deux bouts."),
  carte("cm1-m-polygone", "Polygone", "geometrie", "Une figure fermée faite uniquement de segments."),
  carte("cm1-m-triangle", "Triangle", "geometrie", "Un polygone à 3 côtés."),
  carte("cm1-m-carre", "Carré", "geometrie", "Un quadrilatère aux 4 côtés égaux et 4 angles droits."),
  carte("cm1-m-rectangle", "Rectangle", "geometrie", "Un quadrilatère à 4 angles droits."),
  carte("cm1-m-cercle", "Cercle", "geometrie", "Une courbe fermée dont tous les points sont à la même distance du centre."),

  // ── Grandeurs & mesures ───────────────────────────────────────
  carte("cm1-m-longueur", "Longueur", "grandeurs-mesures", "La mesure d'une distance, par exemple en cm ou en m."),
  carte("cm1-m-masse", "Masse", "grandeurs-mesures", "Ce qui se mesure avec une balance, en grammes."),
];
