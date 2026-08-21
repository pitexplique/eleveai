// lib/matrice/exemples.ts
//
// LES EXEMPLES SOUFFLÉS SOUS LA BARRE — « je bloque sur les fractions ».
//
// Ils comptent plus qu'ils n'en ont l'air : devant un champ vide, c'est eux qui
// donnent l'idée de taper quelque chose. Un CM1 qui n'a rien à écrire ferme la
// page.
//
// ⛔ ILS NE SONT PLUS ÉCRITS À LA MAIN PAR CYCLE (06/08/2026). Ils l'étaient, et
// un élève de Seconde lisait « je bloque sur les dérivées » — qui ne sont pas à
// son programme, elles arrivent en Première. Proposer à quelqu'un une notion
// qu'il n'a pas encore vue, c'est lui dire qu'on ne sait pas où il en est.
//
// Ils se déduisent donc des notions RÉELLEMENT au programme de sa classe,
// lues dans la même table que le coach (coach.ts). Une notion qui entre au
// programme entre dans les exemples ; une notion qui n'y est pas n'y est
// jamais.

import { CLASSE_COACH, NOTION_COACH_FRANCAIS, NOTION_COACH_MATHS } from "./coach";
import { NOTIONS } from "./lexique";
import { getProfil } from "./profils";
import type { ProfilId } from "./types";

/** Les adultes n'ont pas de programme : leurs exemples restent écrits. */
const EXEMPLES_ADULTES: Record<string, string[]> = {
  // ⭐ 21/08/2026 — SANS CETTE LIGNE, LE CHAMP D'UN ADULTE RESTAIT MUET.
  // `exemplesPour` rend `EXEMPLES_ADULTES[profil] ?? []` pour tout le groupe
  // adulte : un profil absent de cette table ne reçoit pas le défaut d'un
  // cycle, il reçoit le vide. Et le commentaire en tête du fichier dit ce que
  // ça coûte — devant un champ vide, personne ne tape rien.
  // ⚠️ Les trois pointent chacun vers une ressource réellement taguée
  // « adulte » : la remise vient des « Calculs du quotidien » du coach, les
  // accords de la dictée du jour, les cinq mots de l'anglais du jour. Un
  // exemple soufflé qui n'ouvre sur rien serait pire qu'un champ vide.
  adulte: ["calculer une remise", "revoir mes accords", "cinq mots d'anglais par jour"],
  parent: ["ma fille passe en 6e", "aider mon enfant en lecture", "voir où il en est"],
  prof: ["une activité pour ma classe", "où en sont mes élèves", "différencier en géométrie"],
  direction: ["où en sont mes classes", "préparer le bilan de rentrée", "gérer les accès"],
};

/** Le libellé lisible d'une notion du lexique (« les fractions »). */
function label(notionId: string): string | null {
  return NOTIONS.find((n) => n.id === notionId)?.label ?? null;
}

/**
 * Les notions au programme de cette classe, maths d'abord puis français.
 * On lit les tables du coach : elles disent, notion par notion, dans quelles
 * classes elle existe. C'est la même source que celle qui ouvre le coach au
 * bon endroit — impossible qu'elles divergent.
 */
function notionsAuProgramme(profil: ProfilId): string[] {
  const classe = CLASSE_COACH[profil];
  if (!classe) return [];

  const maths = Object.keys(NOTION_COACH_MATHS).filter((n) => NOTION_COACH_MATHS[n][classe]);
  const francais = Object.keys(NOTION_COACH_FRANCAIS).filter(
    (n) => NOTION_COACH_FRANCAIS[n][classe],
  );
  return [...maths, ...francais];
}

/**
 * Trois exemples, dans la langue du profil et sur SES notions.
 *
 * Le choix est stable pour un profil donné (pas de hasard) : deux visites de
 * suite montrent la même chose, et on peut en discuter avec un élève sans
 * qu'il ait changé entre-temps.
 */
export function exemplesPour(profil: ProfilId): string[] {
  const p = getProfil(profil);
  if (p.groupe === "adulte") return EXEMPLES_ADULTES[profil] ?? [];

  const notions = notionsAuProgramme(profil);
  const libelles = notions.map(label).filter((l): l is string => Boolean(l));
  if (libelles.length === 0) return [];

  // Trois notions espacées dans la liste plutôt que les trois premières :
  // sinon on tombe sur trois notions de nombres et jamais sur la géométrie.
  const pas = Math.max(1, Math.floor(libelles.length / 3));
  const choisies = [libelles[0], libelles[pas], libelles[pas * 2]]
    .filter(Boolean)
    .filter((l, i, t) => t.indexOf(l) === i);

  const primaire = p.cycle === "primaire";
  const modeles = primaire
    ? [(n: string) => `j'ai du mal avec ${n}`, (n: string) => `je veux m'entraîner sur ${n}`, (n: string) => `un exercice sur ${n}`]
    : [(n: string) => `je bloque sur ${n}`, (n: string) => `contrôle sur ${n} vendredi`, (n: string) => `je veux m'entraîner sur ${n}`];

  return choisies.map((n, i) => modeles[i % modeles.length](n));
}
