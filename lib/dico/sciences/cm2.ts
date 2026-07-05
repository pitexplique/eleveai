import type { FamilleDico, MotDico } from "../types";

// 🔬 Dico Sciences CM2 — sciences & technologie de fin de primaire (vers la 6e).
// Format « Qui suis-je ? » : la définition est l'indice, on retrouve le mot.

function carte(
  id: string,
  mot: string,
  famille: FamilleDico,
  definition: string,
  aide?: string
): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsSciencesCM2: MotDico[] = [
  // ── Le vivant ─────────────────────────────────────────────────
  carte("cm2-s-squelette", "Squelette", "sciences-vivant", "L'ensemble des os qui soutiennent le corps."),
  carte("cm2-s-digestion", "Digestion", "sciences-vivant", "La transformation des aliments dans le corps."),
  carte("cm2-s-respiration", "Respiration", "sciences-vivant", "Faire entrer de l'air dans les poumons."),
  carte("cm2-s-germination", "Germination", "sciences-vivant", "Quand une graine commence à pousser."),
  carte("cm2-s-predateur", "Prédateur", "sciences-vivant", "Un animal qui chasse d'autres animaux pour se nourrir."),

  // ── Matière & énergie ─────────────────────────────────────────
  carte("cm2-s-energie", "Énergie", "sciences-matiere", "Ce qui permet de bouger, de chauffer, d'éclairer."),
  carte("cm2-s-circuit", "Circuit", "sciences-matiere", "Le chemin fermé où passe le courant électrique."),
  carte("cm2-s-aimant", "Aimant", "sciences-matiere", "Un objet qui attire le fer."),
  carte("cm2-s-matiere", "Matière", "sciences-matiere", "Ce dont sont faits les objets : solide, liquide ou gaz."),
  carte("cm2-s-planete", "Planète", "sciences-matiere", "Un astre qui tourne autour du Soleil, comme la Terre."),
  carte("cm2-s-recyclage", "Recyclage", "sciences-matiere", "Transformer les déchets pour les réutiliser."),
  carte("cm2-s-thermometre", "Thermomètre", "sciences-matiere", "L'instrument qui mesure la température."),
];
