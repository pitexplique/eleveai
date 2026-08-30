"use client";

// components/remerciements/RemerciementsBar.tsx

import Link from "next/link";
import { usePathname } from "next/navigation";
import { elevesRemercies } from "@/lib/remerciements/eleves";

export default function RemerciementsBar() {
  const pathname = usePathname();

  if (pathname.startsWith("/fiches-cours")) return null;
  if (elevesRemercies.length === 0) return null;

  return (
    <section className="remerciements-bar relative w-full overflow-hidden border-t border-yellow-300/25 bg-gradient-to-b from-[#161a2b] to-[#11141f] px-4 py-5 text-white shadow-[0_-10px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">
      {/* halo décoratif */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.10),_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl text-center">
        <div className="mb-3 flex items-center justify-center gap-2">
          <span aria-hidden className="text-lg">🙏</span>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-300">
            Remerciements
          </p>
          <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-2 py-0.5 text-[11px] font-black text-yellow-200">
            {elevesRemercies.length} élèves
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5">
          {/* clé prénom + action : deux élèves peuvent porter le même prénom (deux Maëlle) */}
          {elevesRemercies.map((eleve) => (
            <span
              key={`${eleve.prenom}-${eleve.action}`}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] py-1.5 pl-2 pr-3.5 text-sm font-bold text-white/90 shadow-sm transition hover:-translate-y-0.5 hover:border-yellow-300/50 hover:bg-white/[0.12]"
            >
              {/* ⛔⛔ L'INITIALE NE DOIT PAS ÊTRE DU TEXTE. C'est une pastille,
                  un décor — mais posée juste avant le prénom, tout ce qui
                  extrait du texte la colle à lui et lit « MMaëlle », « KKeïla ».
                  Ce n'est pas une hypothèse : c'est la description que Brave
                  affiche pour /cahier-vacances/maths, mesurée le 29/08.
                  ⚠️ `aria-hidden` SEUL NE SUFFIT PAS, et c'est le piège : il
                  fait taire les lecteurs d'écran, mais la lettre reste dans le
                  DOM et les extracteurs la prennent quand même. Elle est donc
                  rendue par CSS (`content`), où aucun extracteur ne va — et
                  `aria-hidden` reste, pour les rares qui liraient le
                  pseudo-élément. */}
              <span
                aria-hidden
                style={{ "--initiale": `"${eleve.prenom.charAt(0)}"` } as React.CSSProperties}
                className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 text-[11px] font-black text-slate-900 before:content-[var(--initiale)]"
              />
              <span className="text-[15px] font-black text-yellow-300">{eleve.prenom}</span>
              <span className="text-white/30">·</span>
              <span className="text-white/70">{eleve.action}</span>
              {eleve.meta && (
                <span className="rounded-full bg-emerald-400/20 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-300">
                  ★
                </span>
              )}
            </span>
          ))}
        </div>

        <p className="mt-3.5 text-xs font-semibold text-white/55">
          Merci aux élèves testeurs qui font grandir EleveAI —{" "}
          <Link
            href="/remerciements"
            className="font-black text-yellow-300/90 underline-offset-2 transition hover:text-yellow-200 hover:underline"
          >
            voir la page
          </Link>
        </p>
      </div>
    </section>
  );
}
