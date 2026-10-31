"use client";

// L'avatar d'un élève en rond : icône + couleur (lib/avatars.ts, 31/10/2026).
import { COULEURS_AVATAR, lireAvatarTexte } from "@/lib/avatars";

const TAILLES = { s: "h-8 w-8 text-lg", m: "h-12 w-12 text-2xl", l: "h-20 w-20 text-5xl" };

export default function AvatarRond({ avatar, taille = "m" }: { avatar: string | null | undefined; taille?: keyof typeof TAILLES }) {
  const a = lireAvatarTexte(avatar);
  if (!a) return null;
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-full ring-2 ring-white ${COULEURS_AVATAR[a.couleur]} ${TAILLES[taille]}`}
    >
      {a.emoji}
    </span>
  );
}
