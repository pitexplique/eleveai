// LE PRÉNOM OU PSEUDO DE L'ÉLÈVE (10/11/2026) — supabase/passions_eleves_pseudo.sql.
//
// Frédéric suit ses élèves EN DIRECT (/prof/classes/direct) mais ne voit que
// leur code (« 6B-07 ») : il ne sait pas toujours qui est qui. L'élève peut
// donc écrire, depuis son tableau de bord, son prénom ou un pseudo.
//
// Protection des mineurs : FACULTATIF, court (20 caractères), jamais de nom de
// famille demandé, et filtré — pas d'adresse e-mail, pas de lien, pas de
// numéro de téléphone, pas de caractères bizarres. Partagé par le navigateur
// (message tout de suite) et par /api/passions (qui fait foi).

export const PSEUDO_MAX = 20;

/** Lettres (accents compris), chiffres, espace, trait d'union, apostrophe, point, tiret bas. */
const PERMIS = /^[\p{L}\p{M}0-9 '’._-]+$/u;

/** Quelques gros mots : le prof les verrait projetés en classe. */
const INTERDITS = ["merde", "pute", "connard", "connasse", "salope", "encule", "enculé", "batard", "bâtard", "nique", "fdp", "ntm", "pd", "zizi", "bite", "couille"];

/** null = vide (l'élève efface son pseudo) ; { erreur } = refusé ; sinon le pseudo propre. */
export function nettoyerPseudo(brut: unknown): string | null | { erreur: string } {
  if (brut === null || brut === undefined) return null;
  if (typeof brut !== "string") return { erreur: "Pseudo invalide." };
  const p = brut.normalize("NFC").replace(/\s+/g, " ").trim();
  if (!p) return null;
  if (p.length > PSEUDO_MAX) return { erreur: `${PSEUDO_MAX} caractères au plus.` };
  if (/@|https?:|www\.|\.(fr|com|net|org|re)\b/i.test(p)) return { erreur: "Pas d'adresse ni de lien, juste un prénom ou un pseudo." };
  if (/\d{4,}/.test(p.replace(/[ ._-]/g, ""))) return { erreur: "Pas de numéro : juste un prénom ou un pseudo." };
  if (!PERMIS.test(p)) return { erreur: "Lettres, chiffres, espace et trait d'union seulement." };
  const mots = p
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .split(/[ '’._-]+/);
  const interdits = INTERDITS.map((m) => m.normalize("NFD").replace(/\p{M}/gu, ""));
  if (mots.some((m) => interdits.includes(m))) return { erreur: "Choisis un autre pseudo." };
  return p;
}
