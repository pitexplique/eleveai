// L'AVATAR DE L'ÉLÈVE (31/10/2026). Ses élèves lui ont demandé une photo de
// profil ; Frédéric : « je ne veux pas télécharger une photo ou une image ».
// Donc une GALERIE : une icône + une couleur de fond, rien à téléverser, aucun
// visage stocké (RGPD), rien à modérer. Enregistré comme « 🐢|bleu ».
// En tête de la galerie : les icônes de SES passions (lib/videos/centres-interet.ts).

export const AVATARS = [
  "🐢", "🦁", "🐬", "🦊", "🐼", "🐯", "🐸", "🦉", "🐙", "🦄",
  "🐉", "🦖", "🐺", "🐧", "🦋", "🐝", "🤖", "👽", "🦸", "🧙",
  "🥷", "👑", "🌋", "🚀",
];

export const COULEURS_AVATAR: Record<string, string> = {
  bleu: "bg-sky-200",
  vert: "bg-emerald-200",
  jaune: "bg-amber-200",
  orange: "bg-orange-200",
  rouge: "bg-rose-200",
  violet: "bg-violet-200",
  rose: "bg-pink-200",
  gris: "bg-slate-200",
};

export type Avatar = { emoji: string; couleur: string };

export function lireAvatarTexte(texte: string | null | undefined): Avatar | null {
  if (!texte) return null;
  const [emoji, couleur] = texte.split("|");
  if (!emoji || !COULEURS_AVATAR[couleur]) return null;
  return { emoji, couleur };
}

/** Une icône courte (≤ 16 caractères, pas de texte libre) et une couleur de la liste. */
export function avatarValide(texte: unknown): texte is string {
  if (typeof texte !== "string" || texte.length > 24) return false;
  const a = lireAvatarTexte(texte);
  return !!a && a.emoji.length <= 16 && !/[\w<>]/.test(a.emoji);
}
