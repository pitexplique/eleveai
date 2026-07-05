import type { FamilleDico, MotDico } from "../types";

// 🔬 Dico Sciences 1re (CARTES) — enseignement scientifique, au-dessus de la Seconde.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsSciences1ere: MotDico[] = [
  carte("1ere-s-photosynthese", "Photosynthèse", "sciences-vivant", "La plante fabrique sa matière grâce à la lumière."),
  carte("1ere-s-onde", "Onde", "sciences-matiere", "Une vibration qui se propage : le son, la lumière."),
  carte("1ere-s-rayonnement", "Rayonnement", "sciences-matiere", "L'énergie émise par une source, comme le Soleil."),
  carte("1ere-s-effet-de-serre", "Effet de serre", "sciences-matiere", "Le réchauffement dû aux gaz qui piègent la chaleur."),
  carte("1ere-s-radioactivite", "Radioactivité", "sciences-matiere", "L'émission de rayons par certains atomes."),
  carte("1ere-s-bilan-carbone", "Bilan carbone", "sciences-matiere", "La quantité de CO₂ émise par une activité."),
];
