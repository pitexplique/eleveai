"use client";

// LA BANNIÈRE CRPE, TOUT EN HAUT DE L'ACCUEIL (17/10/2026).
//
// Historique, pour ne pas refaire le chemin : bandeau en bas de page (15/10),
// fine bande sombre puis bannière au style des pubs SOUS « Cours et exercices
// corrigés » (16/10), et le 17/10 Frédéric : « je me suis trompé, faut pas
// mettre la bannière à cet endroit » → « tout en haut », au-dessus de
// l'en-tête. D'où ce composant à part, rendu par app/layout.tsx AVANT
// <Header /> : AccueilMatieres vit sous l'en-tête et ne pouvait pas passer
// au-dessus.
//
// ⛔ ACCUEIL SEULEMENT (`/accueil`). L'en-tête est collant (`sticky top-0`) : la
// bannière défile, l'en-tête reste. Sur les autres pages, rien ne change.
// ⚠️ Campagne datée (1re séance le 24/10) : quand le groupe est complet,
// retirer la ligne <BanniereCrpe /> du layout suffit.

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

export default function BanniereCrpe() {
  const pathname = usePathname();
  if (pathname !== "/accueil") return null;
  return (
    <section
      aria-label="Préparer le CRPE"
      className="relative overflow-hidden border-y border-amber-200 bg-gradient-to-r from-amber-100 via-rose-50 to-sky-100 px-3 py-5 sm:px-4 sm:py-6"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-4 sm:gap-8">
        <Image
          src="/images/ti-margo-diplome.png"
          alt="Ti Margo, le margouillat d'EleveAI, en toque de diplômé, un diplôme sous le bras"
          width={335}
          height={520}
          sizes="(min-width: 640px) 120px, 96px"
          // Tout en haut de la page : chargée tout de suite, pas en différé.
          priority
          className="h-24 w-auto shrink-0 sm:h-40"
        />
        <div className="min-w-0 flex-1">
          <p className="text-3xl font-black leading-none tracking-tight text-[#041B33] sm:text-5xl">
            CRPE 2027
          </p>
          <p className="mt-1 text-sm font-black uppercase tracking-wide text-orange-600 sm:text-lg">
            Maths et orthographe · La Réunion
          </p>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-700 sm:text-base">
            {/* 16/10 : « je peux aussi suivre les élèves tous les jours » —
                le suivi individuel s'ajoute au samedi, il ne le remplace pas. */}
            {/* ⚠️ Deux longueurs : la phrase entière ne tient pas sur un
                téléphone sans faire passer la bannière à un demi-écran. */}
            <span className="sm:hidden">
              Tests gratuits, puis le samedi (dès le 24/10) ou un suivi au quotidien.
            </span>
            <span className="hidden sm:inline">
              Testez-vous gratuitement, puis préparez-vous avec moi&nbsp;: en
              groupe le samedi matin à Saint-Pierre (dès le 24 octobre), ou en
              suivi individuel, au quotidien.
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              prefetch={false}
              href="/formation-crpe/test?from=accueil"
              onClick={() => track("accueil_bande_crpe", { lien: "test-maths" })}
              className="rounded-full bg-orange-500 px-3 py-1.5 text-xs font-black sm:px-4 sm:py-2 sm:text-sm text-white shadow-sm transition hover:bg-orange-400"
            >
              Test de maths
            </Link>
            <Link
              prefetch={false}
              href="/formation-crpe/test-orthographe?from=accueil"
              onClick={() => track("accueil_bande_crpe", { lien: "test-ortho" })}
              className="rounded-full bg-orange-500 px-3 py-1.5 text-xs font-black sm:px-4 sm:py-2 sm:text-sm text-white shadow-sm transition hover:bg-orange-400"
            >
              Test d&apos;orthographe
            </Link>
            <Link
              prefetch={false}
              href="/formation-crpe?from=accueil"
              onClick={() => track("accueil_bande_crpe", { lien: "formation" })}
              className="rounded-full bg-[#041B33] px-3 py-1.5 text-xs font-black sm:px-4 sm:py-2 sm:text-sm text-white transition hover:bg-[#0b2d52]"
            >
              Le samedi →
            </Link>
            <Link
              prefetch={false}
              href="/formation-crpe?from=accueil#suivi"
              onClick={() => track("accueil_bande_crpe", { lien: "suivi" })}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-black sm:px-4 sm:py-2 sm:text-sm text-[#041B33] ring-1 ring-slate-300 transition hover:bg-slate-50"
            >
              Suivi quotidien →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
