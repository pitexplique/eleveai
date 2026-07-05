import type { FamilleDico, MotDico } from "../types";

// 🔢 Dico Maths CE1 — la marche au-dessus du GS-CP, sous le CE2/CM1.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsMathsCE1: MotDico[] = [
  carte("ce1-m-nombre", "Nombre", "nombres-calcul", "Ce qui dit combien il y a : 7, 25, 100."),
  carte("ce1-m-compter", "Compter", "nombres-calcul", "Dire les nombres dans l'ordre : 1, 2, 3…"),
  carte("ce1-m-addition", "Addition", "nombres-calcul", "L'opération pour ajouter, avec le signe +."),
  carte("ce1-m-soustraction", "Soustraction", "nombres-calcul", "L'opération pour enlever, avec le signe −."),
  carte("ce1-m-signe", "Signe", "nombres-calcul", "Le petit symbole du calcul : +, −, =."),
  carte("ce1-m-heure", "Heure", "grandeurs-mesures", "Ce qu'on lit sur l'horloge pour savoir le temps."),
  carte("ce1-m-semaine", "Semaine", "grandeurs-mesures", "Sept jours, de lundi à dimanche."),
  carte("ce1-m-euro", "Euro", "grandeurs-mesures", "L'argent qu'on utilise en France."),
];
