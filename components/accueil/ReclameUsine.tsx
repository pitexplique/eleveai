// La réclame de l'usine à sucre — sous celle du cyclone dans le fil du jour
// (demande de Frédéric) : les deux machines « dans ta main » l'une sous
// l'autre. Même grammaire de réclame de presse, version compacte.

import Image from "next/image";
import Link from "next/link";

export default function ReclameUsine() {
  return (
    <div className="py-3">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
        🏭 Nouveau · La campagne sucrière
      </p>
      <Link
        href="/simulateur-sucre"
        className="group mt-1.5 block border-4 border-double border-[#1d1c16] p-3 text-center transition hover:bg-[#1d1c16] hover:text-[#f6f1e4]"
      >
        <Image
          src="/images/usine-sucre.webp"
          alt="Le schéma de l'usine : la canne devient sucre et électricité"
          width={1200}
          height={675}
          className="w-full border border-[#1d1c16]/25"
        />
        <p className="mt-1.5 font-serif text-lg font-black leading-tight">
          L&apos;usine dans ta main
        </p>
        <p className="mt-1 text-xs font-semibold leading-5 opacity-75">
          Règle la canne, récolte le sucre — et la lumière.
        </p>
        <p className="mt-1.5 text-sm font-black text-emerald-900 group-hover:text-emerald-300">
          Faire tourner l&apos;usine →
        </p>
      </Link>
    </div>
  );
}
