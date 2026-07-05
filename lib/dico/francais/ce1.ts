import type { FamilleDico, MotDico } from "../types";

// ✍️ Dico Français CE1 — la marche au-dessus du GS-CP, sous le CE2/CM1.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsFrancaisCE1: MotDico[] = [
  carte("ce1-f-lettre", "Lettre", "ortho-lexique", "Un des 26 signes de l'alphabet : a, b, c…"),
  carte("ce1-f-mot", "Mot", "ortho-lexique", "Une suite de lettres qui a un sens."),
  carte("ce1-f-son", "Son", "ortho-lexique", "Ce qu'on entend quand on prononce : le son [a]."),
  carte("ce1-f-article", "Article", "gram-nature", "Un petit mot devant le nom : le, la, un, des."),
  carte("ce1-f-question", "Question", "texte", "Une phrase qui demande quelque chose, avec un « ? »."),
  carte("ce1-f-reponse", "Réponse", "texte", "Ce qu'on dit ou écrit après une question."),
  carte("ce1-f-chanson", "Chanson", "texte", "Un texte qu'on chante."),
  carte("ce1-f-liste", "Liste", "texte", "Des mots écrits les uns sous les autres."),
];
