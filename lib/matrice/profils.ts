// lib/matrice/profils.ts
//
// « Qui es-tu ? » — le premier geste, et celui qui rend le reste possible.
// Sans lui, « fractions » en CP et « fractions » en Terminale donneraient la
// même chose : on aurait un moteur de recherche, pas une recommandation.
//
// Le profil décide de trois choses : les niveaux acceptés, les chips
// proposées, et le tutoiement (on ne tutoie pas un chef d'établissement).

import type { Intention, ProfilId } from "./types";

export type Cycle = "primaire" | "college" | "lycee" | "adulte";

export type Profil = {
  id: ProfilId;
  label: string;
  cycle: Cycle;
  groupe: "eleve" | "adulte";
  /** Niveaux de ressources acceptés, du plus proche au plus lointain. */
  niveaux: ProfilId[];
  tutoie: boolean;
};

export const PROFILS: Profil[] = [
  { id: "cp", label: "CP", cycle: "primaire", groupe: "eleve", niveaux: ["cp"], tutoie: true },
  { id: "ce1", label: "CE1", cycle: "primaire", groupe: "eleve", niveaux: ["ce1", "cp"], tutoie: true },
  { id: "ce2", label: "CE2", cycle: "primaire", groupe: "eleve", niveaux: ["ce2", "ce1"], tutoie: true },
  { id: "cm1", label: "CM1", cycle: "primaire", groupe: "eleve", niveaux: ["cm1", "ce2"], tutoie: true },
  { id: "cm2", label: "CM2", cycle: "primaire", groupe: "eleve", niveaux: ["cm2", "cm1"], tutoie: true },
  { id: "6e", label: "6e", cycle: "college", groupe: "eleve", niveaux: ["6e", "cm2"], tutoie: true },
  { id: "5e", label: "5e", cycle: "college", groupe: "eleve", niveaux: ["5e", "6e"], tutoie: true },
  { id: "4e", label: "4e", cycle: "college", groupe: "eleve", niveaux: ["4e", "5e"], tutoie: true },
  { id: "3e", label: "3e", cycle: "college", groupe: "eleve", niveaux: ["3e", "4e"], tutoie: true },
  { id: "seconde", label: "Seconde", cycle: "lycee", groupe: "eleve", niveaux: ["seconde", "3e"], tutoie: true },
  { id: "premiere", label: "Première", cycle: "lycee", groupe: "eleve", niveaux: ["premiere", "seconde"], tutoie: true },
  { id: "terminale", label: "Terminale", cycle: "lycee", groupe: "eleve", niveaux: ["terminale", "premiere"], tutoie: true },
  { id: "parent", label: "Parent", cycle: "adulte", groupe: "adulte", niveaux: ["parent"], tutoie: false },
  { id: "prof", label: "Professeur", cycle: "adulte", groupe: "adulte", niveaux: ["prof"], tutoie: false },
  { id: "direction", label: "Chef d'établissement", cycle: "adulte", groupe: "adulte", niveaux: ["direction"], tutoie: false },
];

export function getProfil(id: ProfilId): Profil {
  const p = PROFILS.find((x) => x.id === id);
  if (!p) throw new Error(`Profil inconnu : ${id}`);
  return p;
}

export type Chip = { label: string; intention: Intention };

/**
 * Les chips par cycle. Peu nombreuses, et dans les mots du profil : un CP lit
 * « Compter », pas « M'entraîner au calcul ». Une chip n'est jamais
 * obligatoire — elle court-circuite la lecture de l'intention, rien d'autre.
 */
const CHIPS_PAR_CYCLE: Record<Cycle | "prof" | "direction" | "parent", Chip[]> = {
  primaire: [
    { label: "Compter", intention: "entrainer" },
    { label: "Lire", intention: "comprendre" },
    { label: "Écouter des mots", intention: "rituel" },
    { label: "Un petit défi", intention: "decouvrir" },
  ],
  college: [
    { label: "Comprendre mon cours", intention: "comprendre" },
    { label: "M'entraîner", intention: "entrainer" },
    { label: "Préparer un contrôle", intention: "preparer" },
    { label: "Corriger une erreur", intention: "corriger" },
    { label: "Calcul rapide", intention: "rituel" },
    { label: "Découvrir", intention: "decouvrir" },
  ],
  lycee: [
    { label: "Comprendre une notion", intention: "comprendre" },
    { label: "M'entraîner", intention: "entrainer" },
    { label: "Préparer un contrôle", intention: "preparer" },
    { label: "Revoir mes prérequis", intention: "corriger" },
    { label: "Me challenger", intention: "decouvrir" },
  ],
  adulte: [],
  parent: [
    { label: "Aider mon enfant", intention: "comprendre" },
    { label: "Trouver une activité", intention: "entrainer" },
    { label: "Préparer un contrôle", intention: "preparer" },
    { label: "Voir sa progression", intention: "suivre" },
  ],
  prof: [
    { label: "Trouver une ressource", intention: "enseigner" },
    { label: "Préparer une séance", intention: "enseigner" },
    { label: "Évaluer", intention: "preparer" },
    { label: "Différencier", intention: "enseigner" },
    { label: "Suivre ma classe", intention: "suivre" },
  ],
  direction: [
    { label: "Voir l'activité", intention: "suivre" },
    { label: "Identifier les difficultés", intention: "suivre" },
    { label: "Préparer un bilan", intention: "suivre" },
  ],
};

export function chipsPour(id: ProfilId): Chip[] {
  if (id === "parent" || id === "prof" || id === "direction") return CHIPS_PAR_CYCLE[id];
  return CHIPS_PAR_CYCLE[getProfil(id).cycle];
}

/**
 * Trois exemples écrits dans la langue du profil, soufflés sous la barre.
 * Une barre vide devant un CM1, c'est la page blanche : il ne tape rien.
 */
const EXEMPLES: Record<Cycle | "prof" | "direction" | "parent", string[]> = {
  primaire: ["je sais pas compter jusqu'à 100", "j'ai du mal à lire", "un jeu de maths"],
  college: ["j'ai rien compris aux fractions", "contrôle de maths demain", "je veux m'entraîner en conjugaison"],
  lycee: ["je bloque sur les dérivées", "réviser les suites avant le bac", "revoir mes prérequis de seconde"],
  adulte: [],
  parent: ["ma fille passe en 6e", "aider mon enfant en lecture", "comment on explique les fractions"],
  prof: ["une activité de proportionnalité en 5e", "différencier en géométrie", "évaluer mes 4e"],
  direction: ["l'activité de mes classes", "où sont les difficultés", "préparer le bilan de rentrée"],
};

export function exemplesPour(id: ProfilId): string[] {
  if (id === "parent" || id === "prof" || id === "direction") return EXEMPLES[id];
  return EXEMPLES[getProfil(id).cycle];
}
