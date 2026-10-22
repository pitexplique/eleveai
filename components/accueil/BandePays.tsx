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
      <span className="font-bold">Tu n&apos;es pas en France&nbsp;? Le coach suit aussi le programme de ton pays&nbsp;:</span>
      {PAYS.map((p) => (
        <Link
          key={p.slug}
          prefetch={false}
          href={`/pays/${p.slug}`}
          className="rounded-full bg-white px-3 py-1 text-xs font-black text-teal-700 ring-1 ring-sky-200 transition hover:bg-sky-100"
        >
          {p.nom}
        </Link>
      ))}
    </section>
  );
}
