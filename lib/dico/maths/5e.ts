import type { FamilleDico, MotDico } from "../types";

// 🔢 Dico Maths 5e (CARTES) — la marche au-dessus de la 6e.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsMaths5e: MotDico[] = [
  carte("5e-m-nombre-relatif", "Nombre relatif", "nombres-calcul", "Un nombre positif ou négatif : −5, +3."),
  carte("5e-m-priorite", "Priorité opératoire", "nombres-calcul", "L'ordre des calculs : × et ÷ avant + et −."),
  carte("5e-m-developper", "Développer", "nombres-calcul", "Transformer un produit en somme : k(a + b) = ka + kb."),
  carte("5e-m-parallelogramme", "Parallélogramme", "geometrie", "Un quadrilatère dont les côtés opposés sont parallèles."),
  carte("5e-m-losange", "Losange", "geometrie", "Un quadrilatère dont les 4 côtés sont égaux."),
  carte("5e-m-frequence", "Fréquence", "donnees-proba", "La part d'une valeur : son effectif divisé par le total."),
];
