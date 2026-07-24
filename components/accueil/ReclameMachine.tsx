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
    <div className="py-3">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
        {m.emoji} Nouveau · {m.nom}
      </p>
      <Link
        href={m.href}
        className="group mt-1.5 block border-4 border-double border-[#1d1c16] p-3 text-center transition hover:bg-[#1d1c16] hover:text-[#f6f1e4]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={m.image}
          alt={`${m.nom} — ${m.notion}`}
          loading="lazy"
          className="w-full border border-[#1d1c16]/25"
          style={{ backgroundColor: "#fcfcf7" }}
        />
        <p className="mt-1.5 font-serif text-lg font-black leading-tight">{m.nom}</p>
        <p className="mt-1 text-xs font-semibold leading-5 opacity-75">{m.notion}</p>
        <p className="mt-1.5 text-sm font-black text-cyan-800 group-hover:text-cyan-300">
          {m.cta} →
        </p>
      </Link>
    </div>
  );
}
