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
    // ⭐ 17/10, suite : « la bannière a trop de hauteur — il y a 2 ou 3
    // commits tu avais fait une bannière d'une bonne hauteur en fond bleu
    // foncé ». Retour à la BANDE BLEU NUIT du 16/10 (commit 05755453), en plus
    // serrée : Ti Margo plus petit, et sur grand écran les boutons À DROITE du
    // texte au lieu d'en dessous. Le contenu (deux tests, samedi, suivi) reste.
    <section aria-label="Préparer le CRPE" className="bg-[#041B33] px-3 py-2 text-white sm:px-4">
      <div className="mx-auto flex max-w-6xl items-center gap-3 sm:gap-4">
        <Image
          src="/images/ti-margo-diplome.png"
          alt="Ti Margo, le margouillat d'EleveAI, en toque de diplômé, un diplôme sous le bras"
          width={335}
          height={520}
          sizes="56px"
          // Tout en haut de la page : chargée tout de suite, pas en différé.
          priority
          className="h-14 w-auto shrink-0 sm:h-16"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 lg:flex-row lg:items-center lg:gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-wide text-amber-300">
              CRPE 2027 · futurs professeurs des écoles
            </p>
            <p className="text-sm font-bold leading-5">
              {/* ⚠️ Deux longueurs : la phrase entière doublerait la hauteur sur
                  un téléphone. */}
              <span className="sm:hidden">
                Tests gratuits, puis le samedi (dès le 24/10) ou un suivi au quotidien.
              </span>
              <span className="hidden sm:inline">
                Tests gratuits en maths et en orthographe, puis préparation le
                samedi matin à Saint-Pierre (dès le 24 octobre) ou suivi au quotidien.
              </span>
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-1.5">
            <Link
              prefetch={false}
              href="/formation-crpe/test?from=accueil"
              onClick={() => track("accueil_bande_crpe", { lien: "test-maths" })}
              className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-[#041B33] transition hover:bg-amber-300"
            >
              Test de maths
            </Link>
            <Link
              prefetch={false}
              href="/formation-crpe/test-orthographe?from=accueil"
              onClick={() => track("accueil_bande_crpe", { lien: "test-ortho" })}
              className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-[#041B33] transition hover:bg-amber-300"
            >
              Test d&apos;orthographe
            </Link>
            <Link
              prefetch={false}
              href="/formation-crpe?from=accueil"
              onClick={() => track("accueil_bande_crpe", { lien: "formation" })}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white ring-1 ring-white/25 transition hover:bg-white/20"
            >
              Le samedi →
            </Link>
            <Link
              prefetch={false}
              href="/formation-crpe?from=accueil#suivi"
              onClick={() => track("accueil_bande_crpe", { lien: "suivi" })}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white ring-1 ring-white/25 transition hover:bg-white/20"
            >
              Suivi quotidien →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
