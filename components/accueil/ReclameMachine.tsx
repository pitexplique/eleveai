// La réclame de la machine du moment — TOUJOURS la plus récente (demande de
// Frédéric, 24/07 : « toujours mettre les derniers sur l'accueil »). Même
// grammaire de réclame de presse que le lagon d'avant, mais pilotée par la
// donnée : quand une nouvelle machine paraît, elle prend la place ici toute
// seule. Dans le fil du jour, version compacte.

import Link from "next/link";
import { MACHINES_RECENTES } from "@/lib/simulateurs";

export default function ReclameMachine() {
  const m = MACHINES_RECENTES[0];
  if (!m) return null;
  return (
    <div className="py-2.5">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
        {m.emoji} Nouveau · {m.nom}
      </p>
      <Link
        href={m.href}
        className="group mt-1.5 grid grid-cols-[78px_1fr] items-center gap-2.5 border-2 border-[#1d1c16] bg-[#fbf6e7] p-2 transition hover:bg-[#1d1c16] hover:text-[#f6f1e4]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={m.image}
          alt={`${m.nom} - ${m.notion}`}
          loading="lazy"
          className="aspect-[4/3] w-full border border-[#1d1c16]/25 object-contain"
          style={{ backgroundColor: "#fcfcf7" }}
        />
        <span className="block min-w-0">
          <span className="block font-serif text-[15px] font-black leading-tight group-hover:underline">
            {m.nom}
          </span>
          <span className="mt-0.5 block text-xs font-semibold leading-4 opacity-75">
            {m.notion}
          </span>
          <span className="mt-1 block text-xs font-black text-cyan-800 group-hover:text-cyan-300">
            {m.cta} →
          </span>
        </span>
      </Link>
    </div>
  );
}
