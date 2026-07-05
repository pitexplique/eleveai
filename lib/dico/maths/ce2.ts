import type { FamilleDico, MotDico } from "../types";

// 🔢 Dico Maths CE2 — la marche au-dessus du CE1, sous le CM1.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsMathsCE2: MotDico[] = [
  carte("ce2-m-multiplication", "Multiplication", "nombres-calcul", "L'opération « fois », avec le signe ×."),
  carte("ce2-m-division", "Division", "nombres-calcul", "L'opération pour partager en parts égales."),
  carte("ce2-m-table", "Table", "nombres-calcul", "La table de multiplication : 2, 4, 6, 8…"),
  carte("ce2-m-total", "Total", "nombres-calcul", "Le résultat quand on met tout ensemble."),
  carte("ce2-m-metre", "Mètre", "grandeurs-mesures", "L'unité pour mesurer les longueurs."),
  carte("ce2-m-litre", "Litre", "grandeurs-mesures", "L'unité pour mesurer les liquides."),
  carte("ce2-m-gramme", "Gramme", "grandeurs-mesures", "L'unité pour mesurer les petites masses."),
  carte("ce2-m-calendrier", "Calendrier", "grandeurs-mesures", "Il montre les jours, les semaines et les mois de l'année."),
];
