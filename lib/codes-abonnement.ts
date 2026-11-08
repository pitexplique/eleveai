// Les codes d'abonnement (contreparties Ulule, 08/11/2026) : ce qui sert au navigateur ET au serveur.
// ⚠️ Même alphabet que scripts/codes-ulule.mjs et que le contrôle de supabase/codes_abonnement.sql.

/** Ni 0 ni O, ni 1 ni I ni L. */
export const ALPHABET_CODES = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

export type TypeCode = "famille" | "cadeau" | "classe";

/**
 * « margo 7kq4 x2pd », « 7KQ4X2PD », « MARGO-7KQ4-X2PD » → « MARGO-7KQ4-X2PD ».
 * null si ce n'est pas la forme d'un code (8 signes de l'alphabet).
 */
export function normaliserCode(saisie: string): string | null {
  let s = saisie.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (s.startsWith("MARGO")) s = s.slice(5);
  if (s.length !== 8) return null;
  for (const c of s) if (!ALPHABET_CODES.includes(c)) return null;
  return `MARGO-${s.slice(0, 4)}-${s.slice(4)}`;
}

/** Le signe tapé qui n'existe dans aucun code (0, O, 1, I, L), pour le dire à la personne. */
export function signeAmbigu(saisie: string): string | null {
  const s = saisie.toUpperCase().replace(/^\s*MARGO/, "");
  const m = s.match(/[01OIL]/);
  return m ? m[0] : null;
}

export const libelleDuree = (mois: number) => (mois === 12 ? "1 an" : `${mois} mois`);

/** Le jeton du compte fictif de l'essai local (CODES_ESSAI=1, jamais en production). */
export const JETON_ESSAI = "essai-local";
