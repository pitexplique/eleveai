// components/BoutonAbonnement.tsx
// ⭐ 26/10/2026 — Frédéric : « les élèves ne comprennent pas qu'on ne peut pas
// s'abonner car on est sur R2 et pas sur YouTube ». Les vidéos finissent par
// « Et abonne-toi ! », mais le lecteur R2 n'a pas de bouton d'abonnement : on
// le pose sous chaque vidéo. `?sub_confirmation=1` ouvre directement la
// fenêtre « S'abonner » de YouTube.
import { IconeYoutube, YOUTUBE_URL } from "./IconesReseaux";

export default function BoutonAbonnement({ petit }: { petit?: boolean }) {
  return (
    <a
      href={`${YOUTUBE_URL}?sub_confirmation=1`}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center gap-2 rounded-full bg-white font-black text-red-700 ring-2 ring-red-600 hover:bg-red-50",
        petit ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm",
      ].join(" ")}
    >
      <IconeYoutube className={petit ? "h-3.5 w-3.5" : "h-4 w-4"} />
      S&apos;abonner à la chaîne YouTube
    </a>
  );
}
