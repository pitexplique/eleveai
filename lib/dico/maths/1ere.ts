import type { FamilleDico, MotDico } from "../types";

// 🔢 Dico Maths 1re (CARTES) — la marche au-dessus de la Seconde.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsMaths1ere: MotDico[] = [
  carte("1ere-m-derivee", "Dérivée", "nombres-calcul", "Elle mesure comment une fonction varie ; c'est sa pente."),
  carte("1ere-m-tangente", "Tangente", "geometrie", "La droite qui touche la courbe en un point, de pente f'(x)."),
  carte("1ere-m-suite", "Suite", "nombres-calcul", "Une liste ordonnée de nombres : u₀, u₁, u₂…"),
  carte("1ere-m-discriminant", "Discriminant", "nombres-calcul", "Le nombre Δ qui donne le nombre de solutions du second degré."),
  carte("1ere-m-produit-scalaire", "Produit scalaire", "geometrie", "Une opération entre deux vecteurs qui donne un nombre."),
  carte("1ere-m-proba-conditionnelle", "Probabilité conditionnelle", "donnees-proba", "La probabilité d'un événement sachant qu'un autre est réalisé."),
];
