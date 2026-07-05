import type { FamilleDico, MotDico } from "../types";

// ✍️ Dico Français 4e (CARTES) — la marche au-dessus de la 5e.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsFrancais4e: MotDico[] = [
  carte("4e-f-registre", "Registre", "texte", "Le ton d'un texte : courant, soutenu ou familier."),
  carte("4e-f-discours-direct", "Discours direct", "texte", "Rapporter les paroles exactes, avec des guillemets."),
  carte("4e-f-discours-indirect", "Discours indirect", "texte", "Rapporter les paroles sans guillemets : « il dit qu'il vient »."),
  carte("4e-f-conditionnel", "Conditionnel", "conjugaison", "Le mode de ce qui dépend d'une condition : « je viendrais si… »."),
  carte("4e-f-ironie", "Ironie", "texte", "Dire le contraire de ce qu'on pense, pour se moquer."),
  carte("4e-f-periphrase", "Périphrase", "ortho-lexique", "Dire en plusieurs mots : « l'astre du jour » pour le soleil."),
];
