// La RÉCLAME du simulateur cyclone — l'esprit des encarts de presse d'époque
// (double filet, produit maison). Remplace les relevés météo du fil (« tout le
// monde s'en fout des températures à Saint-Denis » — Frédéric, 17/07).
// Mentionne le widget intégrable : chaque lecteur-journaliste est un relais.
// Pas de "use client" : purement statique, l'animation est en CSS.

import Image from "next/image";
import Link from "next/link";

export default function ReclameCyclone() {
  return (
    <div className="py-3">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
        🌀 Nouveau · La vigie
      </p>
      <Link
        href="/simulateur-cyclone"
        className="group mt-1.5 block border-4 border-double border-[#1d1c16] p-3 text-center transition hover:bg-[#1d1c16] hover:text-[#f6f1e4]"
      >
        {/* La carte du simulateur (montrer le produit, pas un décor — la règle
            éditoriale de Frédéric) : Madagascar, la route, le cyclone en
            course, l'alerte sur l'île — et les nuages. */}
        <Image
          src="/images/cyclone-simulateur-carte.webp"
          alt="La carte du simulateur : un cyclone en route vers La Réunion"
          width={1000}
          height={660}
          className="w-full border border-[#1d1c16]/25"
        />
        <p className="mt-1.5 font-serif text-lg font-black leading-tight">
          Dans l&apos;œil du cyclone
        </p>
        <p className="mt-1 text-xs font-semibold leading-5 opacity-75">
          Trace la trajectoire, déclenche les alertes de l&apos;île, rejoue
          Belal ou Firinga.
        </p>
        <p className="mt-1.5 text-sm font-black text-emerald-900 group-hover:text-emerald-300">
          Lancer ton cyclone →
        </p>
      </Link>
      <p className="mt-1.5 text-[10px] font-medium italic text-[#1d1c16]/55">
        Médias : widget intégrable gratuit sur votre site —{" "}
        <Link href="/contact" className="font-black underline underline-offset-2">
          écrire à la rédaction
        </Link>
      </p>
    </div>
  );
}
