// La réclame de la fromagerie — la troisième machine « dans ta main », sous
// le cyclone et l'usine à sucre dans le fil du jour. Image de Frédéric
// (18/07) : le pot dans le pré de la Plaine des Cafres. Même grammaire de
// réclame de presse, version compacte.

import Image from "next/image";
import Link from "next/link";

export default function ReclameFromagerie() {
  return (
    <div className="py-3">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
        🧀 Nouveau · Le lait des Hauts
      </p>
      <Link
        href="/simulateur-fromage"
        className="group mt-1.5 block border-4 border-double border-[#1d1c16] p-3 text-center transition hover:bg-[#1d1c16] hover:text-[#f6f1e4]"
      >
        <Image
          src="/images/tifrais-plaine-des-cafres.webp"
          alt="Un pot de fromage frais péi posé devant les vaches de la Plaine des Cafres"
          width={1200}
          height={980}
          className="w-full border border-[#1d1c16]/25"
        />
        <p className="mt-1.5 font-serif text-lg font-black leading-tight">
          La fromagerie dans ta main
        </p>
        <p className="mt-1 text-xs font-semibold leading-5 opacity-75">
          Règle le lait des Hauts, remplis les pots — du pré au pot de 150 g.
        </p>
        <p className="mt-1.5 text-sm font-black text-cyan-800 group-hover:text-cyan-300">
          Faire tourner la fromagerie →
        </p>
      </Link>
    </div>
  );
}
