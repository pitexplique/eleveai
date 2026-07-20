// La réclame du volcan — la machine du moment dans le fil du jour (le
// barrage descend dans la rangée compacte). Image de Frédéric (19/07) :
// l'éruption vue du belvédère, les veilleurs de l'observatoire au premier
// plan. Même grammaire de réclame de presse, version compacte.

import Image from "next/image";
import Link from "next/link";

export default function ReclameVolcan() {
  return (
    <div className="py-3">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
        🌋 Nouveau · Piton de la Fournaise
      </p>
      <Link
        href="/simulateur-volcan"
        className="group mt-1.5 block border-4 border-double border-[#1d1c16] p-3 text-center transition hover:bg-[#1d1c16] hover:text-[#f6f1e4]"
      >
        <Image
          src="/images/volcan-piton-de-la-fournaise.webp"
          alt="Le Piton de la Fournaise en éruption, observé par deux scientifiques de l'observatoire"
          width={1200}
          height={676}
          className="w-full border border-[#1d1c16]/25"
        />
        <p className="mt-1.5 font-serif text-lg font-black leading-tight">
          Le volcan dans ta main
        </p>
        <p className="mt-1 text-xs font-semibold leading-5 opacity-75">
          Règle la lave, regarde la coulée descendre — et l&apos;île grandir
          sur l&apos;océan.
        </p>
        <p className="mt-1.5 text-sm font-black text-cyan-800 group-hover:text-cyan-300">
          Régler la lave →
        </p>
      </Link>
    </div>
  );
}
