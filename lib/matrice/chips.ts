// lib/matrice/chips.ts
//
// LES CHIPS SE DÉDUISENT DES RESSOURCES, ELLES NE SE DÉCRÈTENT PAS.
//
// Avant (05/08), elles étaient écrites à la main par cycle dans profils.ts :
// on affichait « Créer une évaluation » à un professeur sans savoir si quoi que
// ce soit existait derrière. Une chip qui ne mène nulle part coûte plus cher en
// confiance qu'elle ne rapporte en promesse.
//
// Maintenant :
//   profil → ressources publiables compatibles → intentions réellement
//   couvertes → chips, triées par ce qu'il y a derrière.
//
// Conséquence voulue : une intention sans ressource N'APPARAÎT PAS. Le jour où
// une ressource « créer une remédiation » entre dans ressources.ts, sa chip
// apparaît toute seule. Rien à synchroniser à la main.

import { getProfil } from "./profils";
import { RESSOURCES, STATUTS_PUBLIABLES } from "./ressources";
import type { Intention, ProfilId } from "./types";

export type ChipDynamique = {
  intention: Intention;
  label: string;
  /** Combien de ressources cette chip ouvre réellement. Sert au tri. */
  nombre: number;
};

/**
 * Le mot juste selon à qui l'on parle. Un CP lit « Compter », un lycéen
 * « M'entraîner », un professeur « Trouver une ressource » — même intention,
 * trois vocabulaires. `defaut` sert dès qu'un profil n'a pas son mot à lui.
 */
const LIBELLES: Record<Intention, { defaut: string; primaire?: string; adulte?: string }> = {
  comprendre: { defaut: "Comprendre une notion", primaire: "Comprendre", adulte: "Comprendre une notion" },
  entrainer: { defaut: "M'entraîner", primaire: "M'entraîner", adulte: "Trouver une activité" },
  preparer: { defaut: "Préparer un contrôle", primaire: "Me préparer", adulte: "Préparer une évaluation" },
  corriger: { defaut: "Corriger une erreur", primaire: "Corriger une erreur" },
  decouvrir: { defaut: "Découvrir", primaire: "Découvrir" },
  rituel: { defaut: "Cinq minutes", primaire: "Un petit défi" },
  suivre: { defaut: "Voir la progression", adulte: "Voir la progression" },
  enseigner: { defaut: "Trouver une ressource", adulte: "Trouver une ressource" },
  // « humain » n'a aucune ressource derrière (pas d'annuaire de professeurs) :
  // elle ne sortira donc jamais d'ici. C'est exactement le but du fichier.
  humain: { defaut: "Trouver quelqu'un" },
};

function libelle(intention: Intention, profil: ProfilId): string {
  const p = getProfil(profil);
  const l = LIBELLES[intention];
  if (p.groupe === "adulte") return l.adulte ?? l.defaut;
  if (p.cycle === "primaire") return l.primaire ?? l.defaut;
  return l.defaut;
}

/** Les ressources qu'un profil peut réellement se voir proposer. */
export function ressourcesPour(profil: ProfilId) {
  const p = getProfil(profil);
  return RESSOURCES.filter((r) => {
    if (!STATUTS_PUBLIABLES.includes(r.statut)) return false;
    return r.niveaux.includes("*") || p.niveaux.some((n) => r.niveaux.includes(n));
  });
}

/**
 * Les chips d'un profil, dans l'ordre de ce qu'il y a derrière.
 *
 * ⚠️ Aucun nombre visé. S'il y a deux intentions couvertes, il y a deux chips.
 * On ne remplit pas l'écran pour faire croire à plus de fonctionnalités qu'il
 * n'y en a — c'est la même règle que pour les banques de questions.
 */
export function chipsDisponibles(profil: ProfilId): ChipDynamique[] {
  const compte = new Map<Intention, number>();
  for (const r of ressourcesPour(profil)) {
    for (const i of r.intentions) compte.set(i, (compte.get(i) ?? 0) + 1);
  }

  return [...compte.entries()]
    .map(([intention, nombre]) => ({ intention, nombre, label: libelle(intention, profil) }))
    .sort((a, b) => b.nombre - a.nombre || a.label.localeCompare(b.label));
}

/** Au-delà, les chips passent derrière « Plus d'options ». */
export const CHIPS_VISIBLES = 6;

/** Retrouve l'intention derrière une chip, même composite. */
export function intentionDeLaChip(profil: ProfilId, chip: string): Intention | null {
  const dispo = chipsDisponibles(profil);
  for (const partie of partiesDeLaChip(chip)) {
    const trouve = dispo.find((c) => c.label === partie);
    if (trouve) return trouve.intention;
  }
  return null;
}

// ─── LES MATIÈRES ──────────────────────────────────────────────────────────
// Même règle que les intentions : on n'affiche que ce qui a des ressources.
// Un CP voit « Maths · Français », un lycéen y ajoute l'anglais, l'espagnol et
// l'IA — parce que c'est ce qui existe pour eux, pas parce qu'on l'a décidé.

export type Matiere = NonNullable<
  (typeof RESSOURCES)[number]["matiere"]
>;

export type ChipMatiere = { matiere: Matiere; label: string; nombre: number };

const LIBELLE_MATIERE: Record<string, string> = {
  // « Mathématiques » en entier (Frédéric, 06/08) : c'est le mot du programme
  // et celui que les parents lisent sur un bulletin. « Maths » reste compris
  // à la saisie — il est dans les alias du lexique.
  maths: "Mathématiques",
  francais: "Français",
  anglais: "Anglais",
  espagnol: "Espagnol",
  ia: "IA",
  transversal: "Tout",
};

/**
 * Matières qu'on NE PROPOSE PAS comme bouton, même si des ressources existent.
 * ⛔ « ia » retirée le 06/08 (Frédéric : « pas assez robuste »). Le coach IA et
 * les parcours d'IA restent en ligne et sortent quand on les demande par leur
 * nom — on ne les met simplement plus en devanture à côté des mathématiques.
 * Une matière en vitrine engage : on l'y remettra quand elle sera prête.
 */
const MATIERES_MASQUEES = new Set(["ia"]);

export function matieresDisponibles(profil: ProfilId): ChipMatiere[] {
  const compte = new Map<Matiere, number>();
  for (const r of ressourcesPour(profil)) {
    // « transversal » n'est pas une matière qu'on choisit : c'est l'absence de
    // matière. L'afficher donnerait un bouton « Tout » à côté de « Maths »,
    // qui ne veut rien dire pour un élève.
    if (!r.matiere || r.matiere === "transversal") continue;
    if (MATIERES_MASQUEES.has(r.matiere)) continue;
    compte.set(r.matiere, (compte.get(r.matiere) ?? 0) + 1);
  }

  return [...compte.entries()]
    .map(([matiere, nombre]) => ({ matiere, nombre, label: LIBELLE_MATIERE[matiere] ?? matiere }))
    .sort((a, b) => b.nombre - a.nombre || a.label.localeCompare(b.label));
}

// ─── LA CHIP COMPOSITE ─────────────────────────────────────────────────────
// « Mathématiques » PUIS « M'entraîner » est le geste le plus naturel qui soit,
// plus que chacun séparément. Mais le vecteur d'entrée n'a qu'UN champ `chip`,
// et il n'en aura pas un deuxième : c'est une règle, pas une limite technique.
//
// D'où la chip composite — une seule chaîne, « Mathématiques · M'entraîner »,
// que le moteur découpe à la lecture. Le vecteur reste :
//   { quiEsTu, question, chip }
const SEP = " · ";

export function composerChip(matiere: string | null, intention: string | null): string | null {
  return [matiere, intention].filter(Boolean).join(SEP) || null;
}

export function partiesDeLaChip(chip: string | null): string[] {
  return chip ? chip.split(SEP).filter(Boolean) : [];
}

/** Retrouve la matière derrière une chip, même composite. */
export function matiereDeLaChip(profil: ProfilId, chip: string): Matiere | null {
  const dispo = matieresDisponibles(profil);
  for (const partie of partiesDeLaChip(chip)) {
    const trouve = dispo.find((m) => m.label === partie);
    if (trouve) return trouve.matiere;
  }
  return null;
}
