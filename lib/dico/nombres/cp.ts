import type { MotDico } from "../types";

// 🔢 Mes premières cartes (GS-CP) — Nombres 1 à 10, en IMAGES.
// Le chiffre est l'indice ; le mot (en lettres) reste écrit au dos.

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

export const motsNombresCP: MotDico[] = [
  carte("cp-n-1", "Un", "Le chiffre 1.", "1️⃣"),
  carte("cp-n-2", "Deux", "Le chiffre 2.", "2️⃣"),
  carte("cp-n-3", "Trois", "Le chiffre 3.", "3️⃣"),
  carte("cp-n-4", "Quatre", "Le chiffre 4.", "4️⃣"),
  carte("cp-n-5", "Cinq", "Le chiffre 5.", "5️⃣"),
  carte("cp-n-6", "Six", "Le chiffre 6.", "6️⃣"),
  carte("cp-n-7", "Sept", "Le chiffre 7.", "7️⃣"),
  carte("cp-n-8", "Huit", "Le chiffre 8.", "8️⃣"),
  carte("cp-n-9", "Neuf", "Le chiffre 9.", "9️⃣"),
  carte("cp-n-10", "Dix", "Le chiffre 10.", "🔟"),
];
