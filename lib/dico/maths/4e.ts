import type { FamilleDico, MotDico } from "../types";

// 🔢 Dico Maths 4e (CARTES) — la marche au-dessus de la 5e.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsMaths4e: MotDico[] = [
  carte("4e-m-puissance", "Puissance", "nombres-calcul", "Une écriture courte des produits : 2³ = 2 × 2 × 2."),
  carte("4e-m-racine-carree", "Racine carrée", "nombres-calcul", "Le nombre qui, au carré, redonne le nombre : √9 = 3."),
  carte("4e-m-pythagore", "Théorème de Pythagore", "geometrie", "Dans un triangle rectangle, il relie les carrés des trois côtés."),
  carte("4e-m-cosinus", "Cosinus", "geometrie", "Un rapport dans le triangle rectangle : côté adjacent ÷ hypoténuse."),
  carte("4e-m-translation", "Translation", "geometrie", "Un glissement qui déplace une figure sans la tourner."),
  carte("4e-m-probabilite", "Probabilité", "donnees-proba", "La chance qu'un événement se produise, entre 0 et 1."),
];
