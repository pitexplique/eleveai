// L'ANNONCE DES PROGRAMMES DES PAYS sur l'accueil (22/10/2026). Frédéric :
// « on laisse l'accueil comme ça mais on doit annoncer Ontario, Maroc, etc. »
// Une ligne fine sous la bande CRPE, sans toucher au reste du Journal : chaque
// pays mène à son coach (/pays/<pays>), classes du pays à gauche.
// ⚠️ Version d'étude : la liste vient de lib/programmes-pays/pays.ts.

import Link from "next/link";
import { PAYS } from "@/lib/programmes-pays/pays";

export default function BandePays() {
  return (
    <section
      aria-label="Le coach dans ton pays"
      className="flex flex-wrap items-center gap-2 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm text-[#041B33]"
    >
      <span className="font-bold">Pas en France&nbsp;? Le coach suit le programme de ton pays&nbsp;:</span>
      {/* ⭐ Les drapeaux en IMAGES (22/10) : les drapeaux emoji ne s'affichent
          pas sous Windows, on y lisait « CA ». Fichiers dans public/drapeaux
          (flag-icons, licence MIT ; Ontario et Québec : la feuille d'érable, à la demande de Frédéric). */}
      {PAYS.map((p) => (
        <Link
          key={p.slug}
          prefetch={false}
          href={`/pays/${p.slug}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-white py-1 pl-1.5 pr-3 text-xs font-black text-teal-700 ring-1 ring-sky-200 transition hover:bg-sky-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/drapeaux/${p.slug}.svg`} alt="" width={20} height={15} className="h-[15px] w-5 rounded-[3px] object-cover shadow-sm" />
          {p.nom}
        </Link>
      ))}
    </section>
  );
}
