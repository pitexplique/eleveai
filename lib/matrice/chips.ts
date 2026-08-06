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

/** Retrouve l'intention derrière un libellé cliqué. */
export function intentionDeLaChip(profil: ProfilId, label: string): Intention | null {
  return chipsDisponibles(profil).find((c) => c.label === label)?.intention ?? null;
}
