// La réclame du barrage — la machine du moment dans le fil du jour (la
// fromagerie descend dans la rangée compacte). Image de Frédéric (19/07) :
// le barrage de Takamaka dans les gorges. Même grammaire de réclame de
// presse, version compacte.

import Image from "next/image";
import Link from "next/link";

export default function ReclameBarrage() {
  return (
    <div className="py-3">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
        💧 Nouveau · La rivière des Marsouins
      </p>
      <Link
        href="/simulateur-barrage"
        className="group mt-1.5 block border-4 border-double border-[#1d1c16] p-3 text-center transition hover:bg-[#1d1c16] hover:text-[#f6f1e4]"
      >
        <Image
          src="/images/barrage-takamaka.webp"
          alt="Le barrage de Takamaka dans les gorges de la rivière des Marsouins"
          width={1200}
          height={900}
          className="w-full border border-[#1d1c16]/25"
        />
        <p className="mt-1.5 font-serif text-lg font-black leading-tight">
          Le barrage dans ta main
        </p>
        <p className="mt-1 text-xs font-semibold leading-5 opacity-75">
          Ouvre la vanne : l&apos;eau tombe de 500 m, l&apos;île s&apos;allume — et la
          rivière reprend son eau.
        </p>
        <p className="mt-1.5 text-sm font-black text-cyan-800 group-hover:text-cyan-300">
          Ouvrir les vannes →
        </p>
      </Link>
    </div>
  );
}
