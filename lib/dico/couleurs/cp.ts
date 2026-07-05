import type { MotDico } from "../types";

// 🎨 Mes premières cartes (GS-CP) — Couleurs, en IMAGES.
// La pastille de couleur est l'indice ; le mot reste écrit au dos.

function carte(id: string, mot: string, definition: string, image: string): MotDico {
  return {
    id,
    mot,
    famille: "images-mots",
    definition,
    image,
    defi: { geste: "saisie", question: definition, reponse: mot },
  };
}

export const motsCouleursCP: MotDico[] = [
  carte("cp-c-rouge", "Rouge", "La couleur de la tomate et des fraises.", "🔴"),
  carte("cp-c-bleu", "Bleu", "La couleur du ciel et de la mer.", "🔵"),
  carte("cp-c-vert", "Vert", "La couleur de l'herbe et des feuilles.", "🟢"),
  carte("cp-c-jaune", "Jaune", "La couleur du soleil et du citron.", "🟡"),
  carte("cp-c-orange", "Orange", "La couleur de la carotte.", "🟠"),
  carte("cp-c-violet", "Violet", "La couleur du raisin.", "🟣"),
  carte("cp-c-noir", "Noir", "La couleur de la nuit.", "⚫"),
  carte("cp-c-blanc", "Blanc", "La couleur de la neige.", "⚪"),
  carte("cp-c-marron", "Marron", "La couleur du chocolat et du bois.", "🟤"),
  carte("cp-c-rose", "Rose", "La couleur des flamants et des bonbons.", "🩷"),
];
