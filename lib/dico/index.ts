import type { Dico, FamilleDico, GesteDico } from "./types";
import { motsMaths6e } from "./maths/6e";

export type { Dico, MotDico, FamilleDico, GesteDico, DefiDico } from "./types";

// 🔹 Métadonnées d'affichage des familles de mots
export const FAMILLES_DICO: Record<FamilleDico, { label: string; emoji: string }> = {
  "nombres-calcul": { label: "Nombres & calcul", emoji: "🔢" },
  geometrie: { label: "Géométrie", emoji: "📐" },
  "grandeurs-mesures": { label: "Grandeurs & mesures", emoji: "📏" },
  "donnees-proba": { label: "Données & probabilités", emoji: "📊" },
  consignes: { label: "Mots-consignes", emoji: "🧭" },
};

export const ORDRE_FAMILLES: FamilleDico[] = [
  "nombres-calcul",
  "geometrie",
  "grandeurs-mesures",
  "donnees-proba",
  "consignes",
];

// 🔹 Métadonnées des gestes numériques entraînés (clavier, souris, menu, association)
export const GESTES_DICO: Record<GesteDico, { label: string; emoji: string; consigne: string }> = {
  saisie: { label: "Clavier", emoji: "⌨️", consigne: "Tape ta réponse" },
  clic: { label: "Souris", emoji: "🖱️", consigne: "Clique sur la bonne réponse" },
  menu: { label: "Menu déroulant", emoji: "▾", consigne: "Choisis dans le menu" },
  association: { label: "Associer", emoji: "🔗", consigne: "Relie le mot à sa définition" },
};

// 🔹 Registre des dicos disponibles, indexé par "matiere/niveau"
const DICOS: Record<string, Dico> = {
  "maths/6e": {
    matiere: "maths",
    matiereLabel: "Maths",
    niveau: "6e",
    titre: "Dico Maths 6e",
    sousTitre: "50 mots & gestes pour l'éval nationale",
    mots: motsMaths6e,
  },
};

export function getDico(matiere: string, niveau: string): Dico | null {
  return DICOS[`${matiere}/${niveau}`] ?? null;
}

export function listDicos(): Dico[] {
  return Object.values(DICOS);
}

// 🔹 Comparaison souple des réponses tapées (insensible à la casse et aux accents)
// On entraîne le geste de saisie sans pénaliser un accent oublié ; la bonne
// orthographe (avec accents) reste affichée dans le retour.
export function normaliseReponse(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .replace(/[?.!,;:]/g, "");
}

export function reponseCorrecte(saisie: string, attendu: string): boolean {
  return normaliseReponse(saisie) === normaliseReponse(attendu) && saisie.trim().length > 0;
}
