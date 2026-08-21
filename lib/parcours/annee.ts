// lib/parcours/annee.ts
//
// L'ANNÉE À L'INTÉRIEUR D'UNE CLASSE QUI EN COUVRE DEUX — côté parcours.
//
// La STMG est le cas : une classe, deux années (voir
// `lib/tutor-v4/knowledge/maths/stmg/annees.ts`). Le coach filtre sa liste
// depuis le 18/08/2026 ; le parcours le fait depuis le 21/08, et il doit le
// faire AVANT de tirer ses questions — une notion écartée de la liste ne peut
// alors pas revenir par la porte du tirage.
//
// ⭐ Pourquoi un module plutôt que dix lignes dans `ParcoursClient` : le
// vérificateur (`scripts/verifier-parcours-annee.ts`) doit mesurer CE filtre-là,
// pas une copie qu'il aurait réécrite pour lui — une copie dirait toujours oui.
// L'instrument et son étalon partagent la même règle.

import type { ParcoursNotion } from "./types";
import type { AnneeStmg } from "@/lib/tutor-v4/catalog";

/** Les deux années, plus le cycle entier — ce que montrent les trois pastilles. */
export type ParcoursAnnee = AnneeStmg | "cycle";

/**
 * `?annee=` : une valeur inconnue ne casse rien, elle ramène la première —
 * le même défaut que le coach, et la même indulgence que `?classe=`.
 */
export function normalizeAnnee(value: string | null): ParcoursAnnee {
  return value === "terminale" || value === "cycle" || value === "premiere"
    ? value
    : "premiere";
}

/**
 * La liste servie à l'élève.
 *
 * ⚠️ `anneesNotions` à `null`, c'est « cette classe n'a pas d'années à
 * distinguer » : on rend la liste ENTIÈRE, inchangée. Ce n'est pas un repli.
 * Une notion que la carte ne connaît pas reste visible dans les deux années —
 * mieux vaut la montrer deux fois que l'escamoter en silence.
 */
export function filtrerNotionsParAnnee<T extends ParcoursNotion>(
  notions: T[],
  anneesNotions: Record<string, AnneeStmg> | null,
  annee: ParcoursAnnee
): T[] {
  if (!anneesNotions || annee === "cycle") return notions;

  return notions.filter((notion) => {
    const a = anneesNotions[notion.id];
    return a === undefined || a === annee;
  });
}

/** Faut-il retirer le « (Tle) » des libellés ? Oui dès que l'élève a choisi. */
export function marqueurAnneeUtile(
  anneesNotions: Record<string, AnneeStmg> | null,
  annee: ParcoursAnnee
): boolean {
  return Boolean(anneesNotions) && annee !== "cycle";
}
