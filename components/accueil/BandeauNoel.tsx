// LE BANDEAU NOËL DE L'ACCUEIL (27/11/2026), sous le nuage de Ti Margo.
// Frédéric, 27/11 : « rajouter un onglet Noël ». Le nuage a six places fixes :
// une septième bulle l'aurait cassé, d'où ce bandeau qui mène à /noel.
// ⛔ Bleu nuit et or, JAMAIS de bannière rouge sur l'accueil (06/11).
// ⛔ Gratuit : rien à vendre ici.
// Il disparaît seul après le 6 janvier 2027 (l'accueil se régénère toutes les heures).

import Link from "next/link";
import { dernierJourOuvert, noelEnCours } from "@/lib/noel/calendrier";

export default function BandeauNoel() {
  const maintenant = new Date();
  if (!noelEnCours(maintenant)) return null;
  const jour = dernierJourOuvert(maintenant);
  const accroche =
    jour === 0
      ? "Le calendrier de l'Avent des maths ouvre le 1er décembre"
      : jour < 24
        ? "Le défi du jour t'attend dans le calendrier de l'Avent"
        : "Les 24 défis de Noël sont ouverts";
  return (
    <Link
      href="/noel"
      className="group mx-auto mt-6 flex max-w-3xl items-center gap-3 rounded-2xl bg-gradient-to-r from-[#0f1d3a] via-[#173469] to-[#0f1d3a] px-4 py-3 text-white shadow-lg ring-2 ring-amber-300/60 transition hover:-translate-y-0.5 hover:ring-amber-300 sm:gap-4 sm:px-6 sm:py-4"
    >
      <span aria-hidden="true" className="text-3xl sm:text-4xl">🎄</span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-black uppercase tracking-[0.18em] text-amber-300">Noël avec Ti Margo</span>
        <span className="block font-black leading-snug sm:text-lg">{accroche}</span>
        <span className="block text-sm text-sky-100">Un défi par jour, du CP à la Terminale, sous la neige ou au soleil. Gratuit.</span>
      </span>
      <span aria-hidden="true" className="shrink-0 text-2xl font-black text-amber-300 transition group-hover:translate-x-1">→</span>
    </Link>
  );
}
