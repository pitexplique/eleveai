import type { FamilleDico, MotDico } from "../types";

// 🔢 Dico Maths Terminale (CARTES) — la dernière marche de l'escalier lycée.
// Notions NEUVES de terminale (spé), distinctes de la 1re.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsMathsTerminale: MotDico[] = [
  carte("term-m-primitive", "Primitive", "nombres-calcul", "La fonction dont la dérivée redonne f ; l'inverse de dériver."),
  carte("term-m-logarithme", "Logarithme", "nombres-calcul", "La fonction ln, réciproque de l'exponentielle."),
  carte("term-m-asymptote", "Asymptote", "geometrie", "La droite dont la courbe se rapproche sans jamais la toucher."),
  carte("term-m-continuite", "Continuité", "nombres-calcul", "La courbe se trace sans lever le crayon."),
  carte("term-m-convexite", "Convexité", "nombres-calcul", "La courbe est « tournée vers le haut » ; f'' est positive."),
  carte("term-m-recurrence", "Récurrence", "nombres-calcul", "Le raisonnement en dominos : vrai au départ, vrai de proche en proche."),
  carte("term-m-integrale", "Intégrale", "nombres-calcul", "L'aire sous la courbe entre deux bornes."),
  carte("term-m-orthogonal", "Orthogonal", "geometrie", "Perpendiculaire, dans l'espace : produit scalaire nul."),
  carte("term-m-combinaison", "Combinaison", "donnees-proba", "Le nombre de façons de choisir k objets parmi n, sans ordre."),
  carte("term-m-esperance", "Espérance", "donnees-proba", "La moyenne théorique d'une variable aléatoire."),
  carte("term-m-variance", "Variance", "donnees-proba", "Elle mesure la dispersion autour de l'espérance."),
  carte("term-m-limite", "Limite", "nombres-calcul", "La valeur dont f(x) se rapproche quand x tend vers un point ou l'infini."),
];
