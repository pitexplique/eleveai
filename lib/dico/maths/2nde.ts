import type { FamilleDico, MotDico } from "../types";

// 🔢 Dico Maths 2nde (CARTES) — la marche au-dessus de la 3e (entrée au lycée).

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsMaths2nde: MotDico[] = [
  carte("2nde-m-vecteur", "Vecteur", "geometrie", "Une flèche définie par une direction, un sens et une longueur."),
  carte("2nde-m-coordonnees", "Coordonnées", "geometrie", "Les deux nombres qui repèrent un point : (x ; y)."),
  carte("2nde-m-intervalle", "Intervalle", "nombres-calcul", "Un ensemble de nombres entre deux bornes : [2 ; 5]."),
  carte("2nde-m-fonction-affine", "Fonction affine", "nombres-calcul", "Une fonction de la forme f(x) = ax + b."),
  carte("2nde-m-inequation", "Inéquation", "nombres-calcul", "Une inégalité à résoudre : trouver les x tels que 2x + 1 > 5."),
  carte("2nde-m-echantillon", "Échantillon", "donnees-proba", "Une partie d'une population étudiée en statistique."),
];
