// La réclame du lagon — la machine du moment dans le fil du jour (le
// volcan descend dans la rangée compacte). Illustration BD de la plage de
// l'Ermitage (style du journal) : le lagon calme, paddles et baigneurs.
// Même grammaire de réclame de presse, version compacte.

import Image from "next/image";
import Link from "next/link";

export default function ReclameLagon() {
  return (
    <div className="py-3">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
        🐠 Nouveau · Lagon de l&apos;Ermitage
      </p>
      <Link
        href="/simulateur-lagon"
        className="group mt-1.5 block border-4 border-double border-[#1d1c16] p-3 text-center transition hover:bg-[#1d1c16] hover:text-[#f6f1e4]"
      >
        <Image
          src="/images/lagon.webp"
          alt="La plage de l'Ermitage en dessin : le lagon turquoise et calme, des paddles et des baigneurs, le sable sous les cocotiers"
          width={1280}
          height={960}
          className="w-full border border-[#1d1c16]/25"
        />
        <p className="mt-1.5 font-serif text-lg font-black leading-tight">
          Le lagon dans ta main
        </p>
        <p className="mt-1 text-xs font-semibold leading-5 opacity-75">
          Règle la houle : la barrière de corail casse 90 % de l&apos;énergie —
          et la plage reste calme.
        </p>
        <p className="mt-1.5 text-sm font-black text-cyan-800 group-hover:text-cyan-300">
          Régler la houle →
        </p>
      </Link>
    </div>
  );
}
