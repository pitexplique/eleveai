// ─── Le composeur de feuilles d'exercices ──────────────────────────────────────
//
// ⭐ 28/09/2026, Frédéric : « j'aimerais pouvoir les générer en cochant les
// notions ou micros qui m'intéressent ». On ne FABRIQUE aucun exercice : on
// PIOCHE dans les feuilles écrites et vérifiées, grâce au champ `micros` que
// porte chaque exercice. Une feuille composée ne peut donc pas contenir une
// erreur qu'une feuille publiée n'a pas déjà.
//
// ⭐ DEUX SUJETS, GAUCHE ET DROITE — « pour ne pas que les élèves trichent
// trop ». Chaque ligne de la feuille aligne un exercice A et un exercice B du
// même niveau, qui travaillent les mêmes micros autant que possible : deux
// voisins de table font le même geste sur des nombres différents.
// Et l'inverse reste possible (« sauf si on considère le fait de parler à son
// copain comme une valeur ») : `duo: false` donne un seul sujet.
//
// Tout ici est PUR et déterministe à graine égale : le même lien redonne la
// même feuille, « un autre tirage » change seulement la graine.

import type { ExerciceCorrige, NiveauExercice } from "@/lib/fiches-exercices/types";

/** Un exercice du réservoir, avec d'où il vient. */
export type ExerciceCompose = ExerciceCorrige & {
  /** `<slug de la feuille>#<rang dans la feuille>` — stable d'un tirage à l'autre. */
  id: string;
  niveau: NiveauExercice;
  source: string;
};

/** Une ligne de la feuille composée : l'exercice A, et B s'il y a deux sujets. */
export type LigneComposee = { a: string; b?: string };

/** Ce qui a été coché, feuille par feuille. `micros` vide = la feuille entière. */
export type SelectionFeuille = { slug: string; micros: string[] };

// ── L'adresse ────────────────────────────────────────────────────────────────
// `?c=maths/premiere&s=der-formules&s=expo-seuil:expo_x,expo_y&nb=10&duo=1&t=7`
// Un `s` par feuille ; après les deux-points, les micros retenues.

export function lireSelection(s: string | string[] | undefined): SelectionFeuille[] {
  const brut = Array.isArray(s) ? s : s ? [s] : [];
  const vues = new Map<string, SelectionFeuille>();
  // Une feuille cochée EN ENTIER l'emporte sur ses micros cochées une à une.
  const entieres = new Set<string>();
  for (const morceau of brut) {
    const [slug, micros = ""] = morceau.split(":");
    if (!/^[a-z0-9-]+$/.test(slug)) continue;
    const entree = vues.get(slug) ?? { slug, micros: [] };
    const liste = micros.split(",").map((x) => x.trim()).filter((m) => /^[A-Za-z0-9_]+$/.test(m));
    if (!liste.length) entieres.add(slug);
    for (const m of liste) if (!entree.micros.includes(m)) entree.micros.push(m);
    vues.set(slug, entree);
  }
  return [...vues.values()].map((f) => (entieres.has(f.slug) ? { ...f, micros: [] } : f));
}

export function ecrireSelection(selection: SelectionFeuille[]): string[] {
  return selection.map((f) => (f.micros.length ? `${f.slug}:${f.micros.join(",")}` : f.slug));
}

// ── Le hasard reproductible ──────────────────────────────────────────────────

function aleatoire(graine: number) {
  let a = graine >>> 0 || 1;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function melanger<T>(liste: T[], hasard: () => number): T[] {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i -= 1) {
    const j = Math.floor(hasard() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

/** Une feuille après l'autre, à tour de rôle : trois feuilles cochées donnent
 *  trois notions dès les trois premiers exercices, pas dix de la première. */
function aTourDeRole(liste: ExerciceCompose[]): ExerciceCompose[] {
  const parSource = new Map<string, ExerciceCompose[]>();
  for (const ex of liste) parSource.set(ex.source, [...(parSource.get(ex.source) ?? []), ex]);
  const files = [...parSource.values()];
  const sortie: ExerciceCompose[] = [];
  while (files.some((f) => f.length)) for (const f of files) if (f.length) sortie.push(f.shift()!);
  return sortie;
}

/** Combien deux exercices se ressemblent : micros partagées, puis même feuille. */
function proximite(x: ExerciceCompose, y: ExerciceCompose): number {
  const communes = (x.micros ?? []).filter((m) => (y.micros ?? []).includes(m)).length;
  return communes * 10 + (x.source === y.source ? 1 : 0);
}

/** Le jumeau d'un exercice parmi les libres : même niveau, le plus proche. */
function jumeau(ex: ExerciceCompose, libres: ExerciceCompose[]): ExerciceCompose | undefined {
  let meilleur: ExerciceCompose | undefined;
  let score = -1;
  for (const autre of libres) {
    if (autre.id === ex.id || autre.niveau !== ex.niveau) continue;
    const s = proximite(ex, autre);
    if (s > score) {
      meilleur = autre;
      score = s;
    }
  }
  return meilleur;
}

const NIVEAUX: NiveauExercice[] = [1, 2, 3];

/**
 * Tire les lignes de la feuille. `nb` = nombre de lignes, c'est-à-dire
 * d'exercices PAR ÉLÈVE. Les niveaux se servent à tour de rôle, pour qu'une
 * feuille de dix ne soit pas dix gestes seuls sans un seul problème.
 */
export function composer(
  reservoir: ExerciceCompose[],
  { nb, duo, graine }: { nb: number; duo: boolean; graine: number },
): LigneComposee[] {
  const hasard = aleatoire(graine);
  const parNiveau = new Map<NiveauExercice, ExerciceCompose[]>();
  for (const n of NIVEAUX) {
    parNiveau.set(n, aTourDeRole(melanger(reservoir.filter((e) => e.niveau === n), hasard)));
  }

  // Les lignes possibles, niveau par niveau.
  const possibles = new Map<NiveauExercice, LigneComposee[]>();
  for (const n of NIVEAUX) {
    const ordre = parNiveau.get(n)!;
    const lignes: LigneComposee[] = [];
    if (!duo) {
      for (const ex of ordre) lignes.push({ a: ex.id });
    } else {
      const libres = [...ordre];
      while (libres.length >= 2) {
        const a = libres.shift()!;
        const b = jumeau(a, libres)!;
        libres.splice(libres.indexOf(b), 1);
        lignes.push({ a: a.id, b: b.id });
      }
    }
    possibles.set(n, lignes);
  }

  // Combien par niveau : un à tour de rôle tant qu'il en reste.
  const combien = new Map<NiveauExercice, number>(NIVEAUX.map((n) => [n, 0]));
  let total = 0;
  while (total < nb) {
    let ajoute = false;
    for (const n of NIVEAUX) {
      if (total >= nb) break;
      if (combien.get(n)! < possibles.get(n)!.length) {
        combien.set(n, combien.get(n)! + 1);
        total += 1;
        ajoute = true;
      }
    }
    if (!ajoute) break;
  }

  return NIVEAUX.flatMap((n) => possibles.get(n)!.slice(0, combien.get(n)!));
}

/** Le nombre maximal de lignes que le réservoir permet. */
export function lignesPossibles(reservoir: ExerciceCompose[], duo: boolean): number {
  return NIVEAUX.reduce((somme, n) => {
    const k = reservoir.filter((e) => e.niveau === n).length;
    return somme + (duo ? Math.floor(k / 2) : k);
  }, 0);
}

/** Un exercice pour remplacer `id` : même niveau, pas déjà sur la feuille,
 *  le plus proche d'abord. `decalage` fait défiler les candidats. */
export function remplacant(
  reservoir: ExerciceCompose[],
  utilises: Set<string>,
  id: string,
  decalage = 0,
): ExerciceCompose | undefined {
  const ex = reservoir.find((e) => e.id === id);
  if (!ex) return undefined;
  const candidats = reservoir
    .filter((e) => e.niveau === ex.niveau && !utilises.has(e.id))
    .sort((x, y) => proximite(ex, y) - proximite(ex, x));
  if (!candidats.length) return undefined;
  return candidats[decalage % candidats.length];
}
