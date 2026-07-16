// La RÉCLAME du simulateur cyclone — l'esprit des encarts de presse d'époque
// (double filet, produit maison). Remplace les relevés météo du fil (« tout le
// monde s'en fout des températures à Saint-Denis » — Frédéric, 17/07).
// Mentionne le widget intégrable : chaque lecteur-journaliste est un relais.
// Pas de "use client" : purement statique, l'animation est en CSS.

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
        {/* La spirale qui tourne (sens horaire — hémisphère sud). */}
        <svg
          viewBox="-30 -30 60 60"
          aria-hidden
          className="mx-auto h-10 w-10 motion-safe:animate-[spin_2.8s_linear_infinite]"
        >
          {[0, 1, 2, 3].map((bras) => {
            let d = "";
            for (let i = 0; i <= 14; i++) {
              const t = i / 14;
              const ang = (bras * Math.PI) / 2 + t * 2.2;
              const r = 3 + t * 24;
              d += (i ? "L" : "M") + (Math.cos(ang) * r).toFixed(1) + "," + (Math.sin(ang) * r).toFixed(1);
            }
            return (
              <path key={bras} d={d} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" opacity={0.85} />
            );
          })}
          <circle r={2.5} fill="currentColor" />
        </svg>
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
