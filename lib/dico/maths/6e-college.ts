import type { FamilleDico, MotDico } from "../types";

// 🔢 Dico Maths 6e (CARTES) — notions NEUVES de 6e, la marche au-dessus du CM2.
// (À ne pas confondre avec maths/6e.ts = Dico ÉVAL nationale, autre usage.)

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsMaths6eCollege: MotDico[] = [
  carte("6e-m-proportionnalite", "Proportionnalité", "nombres-calcul", "Quand deux grandeurs augmentent (ou diminuent) dans les mêmes proportions."),
  carte("6e-m-pourcentage", "Pourcentage", "nombres-calcul", "Une proportion sur cent, notée avec le signe %."),
  carte("6e-m-volume", "Volume", "grandeurs-mesures", "La place qu'occupe un solide, mesurée en cm³."),
  carte("6e-m-abscisse", "Abscisse", "donnees-proba", "La position d'un point sur un axe gradué horizontal."),
  carte("6e-m-mediatrice", "Médiatrice", "geometrie", "La droite perpendiculaire à un segment, en son milieu."),
  carte("6e-m-effectif", "Effectif", "donnees-proba", "Le nombre de fois qu'une valeur apparaît dans des données."),
];
