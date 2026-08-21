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
  /**
   * ⭐ L'ADULTE QUI VIENT TRAVAILLER POUR LUI (21/08/2026).
   *
   * ⚠️ `groupe: "adulte"` ET POURTANT IL S'AFFICHE DANS LA RANGÉE DES CLASSES.
   * Les deux sont vrais et ne se contredisent pas : `groupe` dit ce qu'il EST
   * (un adulte, qu'on ne tutoie pas), la rangée dit où on le CHOISIT. C'est
   * pour ça que `CLASSES` ne se contente plus de filtrer sur `groupe` dans
   * EntreeMatrice — il l'ajoute explicitement.
   *
   * ⛔ `niveaux: ["adulte"]` ET RIEN D'AUTRE — pas de repli sur la 6ᵉ ni sur le
   * CM2. Un repli déverserait tout l'inventaire scolaire, écrit pour des
   * enfants et tutoyé, sur quelqu'un qui n'a rien demandé de tel. Cinq
   * ressources ont un vrai niveau adulte (voir ressources.ts) : ce sont
   * celles-là qu'il doit voir, et elles seules.
   */
  { id: "adulte", label: "Adulte", cycle: "adulte", groupe: "adulte", niveaux: ["adulte"], tutoie: false },
  { id: "parent", label: "Parent", cycle: "adulte", groupe: "adulte", niveaux: ["parent"], tutoie: false },
  { id: "prof", label: "Professeur", cycle: "adulte", groupe: "adulte", niveaux: ["prof"], tutoie: false },
  { id: "direction", label: "Chef d'établissement", cycle: "adulte", groupe: "adulte", niveaux: ["direction"], tutoie: false },
];

export function getProfil(id: ProfilId): Profil {
  const p = PROFILS.find((x) => x.id === id);
  if (!p) throw new Error(`Profil inconnu : ${id}`);
  return p;
}

/**
 * À QUELLE DISTANCE UNE RESSOURCE EST D'UN PROFIL.
 *   0  → pile à son niveau ;
 *   1+ → le niveau juste en dessous (le repli, écrit dans `niveaux`) ;
 *  -1  → hors de portée.
 *
 * Le calcul était écrit deux fois — une dans le moteur pour le score, une dans
 * chips.ts pour le filtre. Il est devenu le même geste le jour où un adulte a
 * pu dire une classe : on interroge alors DEUX profils pour une seule
 * ressource (le sien, et la classe dont il parle), et deux copies d'un même
 * calcul appelé deux fois plus souvent, c'est deux fois plus de chances qu'elles
 * divergent.
 */
export function rangNiveaux(
  profil: ProfilId | null | undefined,
  niveauxRessource: readonly string[],
): number {
  if (!profil) return -1;
  return getProfil(profil).niveaux.findIndex((n) => niveauxRessource.includes(n));
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
  /**
   * ⭐ LE CYCLE ADULTE N'EST PLUS VIDE (21/08/2026).
   *
   * ⛔ CES LIBELLÉS SONT RECOPIÉS DE `LIBELLES` DANS chips.ts, AU CARACTÈRE
   * PRÈS, et ce n'est pas une redondance qu'on peut « nettoyer » à la légère :
   * `moteur.ts` retrouve l'intention d'une chip CLIQUÉE en comparant son
   * libellé à cette liste (`chipsPour(...).find(c => c.label === chip)`).
   * Les deux tables qui divergent d'une majuscule, et la chip devient muette —
   * elle s'affiche, on clique, rien ne se passe. Les autres cycles sont déjà
   * tenus d'accord de la même façon ; changer un mot ici oblige à le changer
   * là-bas, et réciproquement.
   *
   * ⚠️ Elles sont ensuite FILTRÉES par `chipsDisponibles` contre l'inventaire
   * réel : celles dont aucune ressource adulte ne porte l'intention ne
   * s'affichent pas. Aucune ne peut donc ouvrir sur du vide.
   */
  adulte: [
    { label: "Cinq minutes", intention: "rituel" },
    { label: "Reprendre les bases", intention: "comprendre" },
    { label: "M'entraîner", intention: "entrainer" },
    { label: "Corriger une erreur", intention: "corriger" },
    { label: "Me préparer", intention: "preparer" },
  ],
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
  // ⚠️ CE N'EST PAS CETTE TABLE QUE L'ÉCRAN LIT. EntreeMatrice importe
  // `exemplesPour` depuis lib/matrice/exemples.ts, pas d'ici — celui-ci n'a
  // plus d'appelant depuis que les exemples se déduisent des notions au
  // programme. On la tient quand même d'accord avec l'autre plutôt que de
  // laisser deux réponses à la même question, dont une fausse.
  adulte: ["calculer une remise", "revoir mes accords", "cinq mots d'anglais par jour"],
  parent: ["ma fille passe en 6e", "aider mon enfant en lecture", "comment on explique les fractions"],
  prof: ["une activité de proportionnalité en 5e", "différencier en géométrie", "évaluer mes 4e"],
  direction: ["l'activité de mes classes", "où sont les difficultés", "préparer le bilan de rentrée"],
};

export function exemplesPour(id: ProfilId): string[] {
  if (id === "parent" || id === "prof" || id === "direction") return EXEMPLES[id];
  return EXEMPLES[getProfil(id).cycle];
}
