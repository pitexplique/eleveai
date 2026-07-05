import type { Dico, FamilleDico, GesteDico, MotDicoClasse } from "./types";
import { motsMaths6e } from "./maths/6e";
import { motsFrancais6e } from "./francais/6e";

export type { Dico, MotDico, MotDicoClasse, FamilleDico, GesteDico, DefiDico } from "./types";
export { NIVEAUX, CYCLES, getNiveau } from "./niveaux";
export type { NiveauDico, CycleDico } from "./niveaux";

// 🔹 Métadonnées d'affichage des familles de mots
export const FAMILLES_DICO: Record<FamilleDico, { label: string; emoji: string }> = {
  // Maths
  "nombres-calcul": { label: "Nombres & calcul", emoji: "🔢" },
  geometrie: { label: "Géométrie", emoji: "📐" },
  "grandeurs-mesures": { label: "Grandeurs & mesures", emoji: "📏" },
  "donnees-proba": { label: "Données & probabilités", emoji: "📊" },
  // Français
  "gram-nature": { label: "Nature des mots", emoji: "🔤" },
  "gram-fonction": { label: "Fonctions", emoji: "🧩" },
  conjugaison: { label: "Conjugaison", emoji: "⏳" },
  "ortho-lexique": { label: "Orthographe & lexique", emoji: "✍️" },
  texte: { label: "Texte & compréhension", emoji: "📖" },
  // Partagé
  consignes: { label: "Mots-consignes", emoji: "🧭" },
};

export const ORDRE_FAMILLES: FamilleDico[] = [
  // Maths
  "nombres-calcul",
  "geometrie",
  "grandeurs-mesures",
  "donnees-proba",
  // Français
  "gram-nature",
  "gram-fonction",
  "conjugaison",
  "ortho-lexique",
  "texte",
  // Partagé
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
  "francais/6e": {
    matiere: "francais",
    matiereLabel: "Français",
    niveau: "6e",
    titre: "Dico Français 6e",
    sousTitre: "50 mots & gestes pour l'éval nationale",
    mots: motsFrancais6e,
  },
};

export function getDico(matiere: string, niveau: string): Dico | null {
  return DICOS[`${matiere}/${niveau}`] ?? null;
}

export function listDicos(): Dico[] {
  return Object.values(DICOS);
}

// 🔹 Tous les mots d'une CLASSE, toutes matières confondues (matière rattachée).
// Base du jeu de cartes « Qui suis-je ? » par classe.
export function motsDeLaClasse(niveau: string): MotDicoClasse[] {
  return Object.values(DICOS)
    .filter((d) => d.niveau === niveau)
    .flatMap((d) =>
      d.mots.map((m) => ({ ...m, matiere: d.matiere, matiereLabel: d.matiereLabel }))
    );
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
