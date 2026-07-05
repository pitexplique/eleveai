import type { FamilleDico, MotDico } from "../types";

// 🔢 Dico Maths CM2 — vocabulaire essentiel de fin de primaire (vers la 6e).
// Format « Qui suis-je ? » : la définition est l'indice, on retrouve le mot.
// Le mini-jeu de la page /dico = taper le mot à partir de sa définition.

function carte(
  id: string,
  mot: string,
  famille: FamilleDico,
  definition: string,
  aide?: string
): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsMathsCM2: MotDico[] = [
  // ── Nombres & calcul ──────────────────────────────────────────
  carte("cm2-m-fraction", "Fraction", "nombres-calcul", "Une écriture comme 3/4 qui partage une quantité en parts égales."),
  carte("cm2-m-numerateur", "Numérateur", "nombres-calcul", "Le nombre du haut d'une fraction, au-dessus du trait."),
  carte("cm2-m-denominateur", "Dénominateur", "nombres-calcul", "Le nombre du bas d'une fraction, sous le trait."),
  carte("cm2-m-decimal", "Nombre décimal", "nombres-calcul", "Un nombre avec une virgule, comme 3,5 ou 12,07."),
  carte("cm2-m-quotient", "Quotient", "nombres-calcul", "Le résultat d'une division."),
  carte("cm2-m-produit", "Produit", "nombres-calcul", "Le résultat d'une multiplication."),
  carte("cm2-m-difference", "Différence", "nombres-calcul", "Le résultat d'une soustraction."),
  carte("cm2-m-multiple", "Multiple", "nombres-calcul", "Un multiple de 5 s'obtient en multipliant 5 par un entier : 5, 10, 15…"),

  // ── Géométrie ─────────────────────────────────────────────────
  carte("cm2-m-angle-droit", "Angle droit", "geometrie", "Un angle qui mesure 90°, comme le coin d'une feuille."),
  carte("cm2-m-perpendiculaires", "Perpendiculaires", "geometrie", "Deux droites qui se croisent en formant un angle droit."),
  carte("cm2-m-symetrie", "Symétrie", "geometrie", "Quand une figure se répète en miroir de part et d'autre d'un axe."),
  carte("cm2-m-diagonale", "Diagonale", "geometrie", "Le segment qui relie deux sommets opposés d'une figure."),
  carte("cm2-m-rayon", "Rayon", "geometrie", "Le segment qui va du centre d'un cercle jusqu'à son bord."),
  carte("cm2-m-diametre", "Diamètre", "geometrie", "Le segment qui traverse le cercle en passant par le centre."),

  // ── Grandeurs & mesures ───────────────────────────────────────
  carte("cm2-m-perimetre", "Périmètre", "grandeurs-mesures", "La longueur du tour d'une figure."),
  carte("cm2-m-aire", "Aire", "grandeurs-mesures", "La mesure de la surface d'une figure, en cm²."),
  carte("cm2-m-contenance", "Contenance", "grandeurs-mesures", "La quantité de liquide que peut contenir un récipient, en litres."),
  carte("cm2-m-kilogramme", "Kilogramme", "grandeurs-mesures", "Une unité de masse : 1 kg = 1000 g."),
];
