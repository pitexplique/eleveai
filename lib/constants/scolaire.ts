/* ----------------------------------------
   CONSTANTES SCOLAIRES PARTAGÉES
---------------------------------------- */

export const CLASSES = [
  { value: "CM2", label: "CM2" },
  { value: "6e", label: "6e" },
  { value: "5e", label: "5e" },
  { value: "4e", label: "4e" },
  { value: "3e", label: "3e" },
  { value: "2de", label: "2de" },
  { value: "1re", label: "1re" },
  { value: "Tle", label: "Terminale" },
  { value: "collège", label: "Collège (niveau mixte)" },
  { value: "lycée", label: "Lycée (niveau mixte)" },
] as const;

export const MATIERES = [
  { value: "maths", label: "Mathématiques" },
  { value: "français", label: "Français" },
  { value: "histoire-géographie", label: "Histoire-Géographie" },
  { value: "SVT", label: "SVT" },
  { value: "physique-chimie", label: "Physique-Chimie" },
  { value: "langues", label: "Langues vivantes" },
  { value: "philosophie", label: "Philosophie" },
  { value: "toutes les matières", label: "Toutes les matières" },
] as const;

/* ----------------------------------------
   TYPES UTILES (optionnel mais propre)
---------------------------------------- */

export type ClasseValue = (typeof CLASSES)[number]["value"];
export type MatiereValue = (typeof MATIERES)[number]["value"];
