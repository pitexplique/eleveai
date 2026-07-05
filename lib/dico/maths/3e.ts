import type { FamilleDico, MotDico } from "../types";

// 🔢 Dico Maths 3e (CARTES) — la marche au-dessus de la 4e (fin de collège).

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsMaths3e: MotDico[] = [
  carte("3e-m-fonction", "Fonction", "nombres-calcul", "Un procédé qui associe à chaque nombre un seul résultat : f(x)."),
  carte("3e-m-equation", "Équation", "nombres-calcul", "Une égalité à résoudre pour trouver l'inconnue x."),
  carte("3e-m-factoriser", "Factoriser", "nombres-calcul", "Transformer une somme en produit : ka + kb = k(a + b)."),
  carte("3e-m-antecedent", "Antécédent", "nombres-calcul", "Le nombre de départ d'une fonction, dont on cherche l'image."),
  carte("3e-m-thales", "Théorème de Thalès", "geometrie", "Avec des droites parallèles, il donne des longueurs proportionnelles."),
  carte("3e-m-mediane", "Médiane", "donnees-proba", "La valeur qui partage une série ordonnée en deux moitiés."),
];
