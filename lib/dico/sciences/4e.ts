import type { FamilleDico, MotDico } from "../types";

// 🔬 Dico Sciences 4e (CARTES) — géologie, lumière, système nerveux, au-dessus de la 5e.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsSciences4e: MotDico[] = [
  carte("4e-s-seisme", "Séisme", "sciences-matiere", "Un tremblement de terre."),
  carte("4e-s-volcan", "Volcan", "sciences-matiere", "Une montagne qui peut cracher de la lave."),
  carte("4e-s-combustion", "Combustion", "sciences-matiere", "Une réaction qui brûle et dégage de la chaleur."),
  carte("4e-s-lumiere", "Lumière", "sciences-matiere", "Ce qui permet de voir, émis par une source."),
  carte("4e-s-vitesse", "Vitesse", "sciences-matiere", "La distance parcourue pendant un temps donné."),
  carte("4e-s-neurone", "Neurone", "sciences-vivant", "Une cellule du cerveau qui transmet les messages."),
];
