"use client";

// LA BANNIÈRE CRPE DE L'ACCUEIL (17/10/2026).
//
// ⭐ DEUX PLACES SELON L'ÉCRAN (Frédéric, 17/10) :
// - ORDINATEUR : au-dessus des trois colonnes Lycée / Collège / Primaire, sous
//   « Cours et exercices corrigés » (`place="colonnes"`, AccueilMatieres) —
//   « ça convient en bas mais pas en haut, remets-la au-dessus des 3 colonnes » ;
// - TÉLÉPHONE : tout en haut, au-dessus de l'en-tête (`place="haut"`,
//   app/layout.tsx) — « laisse en haut pour le téléphone ».
// Le même composant est donc rendu deux fois, chacun masqué à l'autre taille
// (seuil `sm`, 640 px). ⛔ Ne pas fusionner les deux places.
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
//
// ⭐ 20/10/2026 : AUCUN INSCRIT au samedi de Saint-Pierre. Frédéric : « je
// pense qu'à terme je proposerai en visio », « cours en visio oui ». La bande ne
// promet donc plus le samedi : les deux tests, le suivi au quotidien, et la
// visio annoncée SANS DATE (« en préparation »). ⛔ Le mot « gratuit » ne décrit
// pas l'offre (règle du 22/08) : la chose se dit par le verbe.
// ⛔ 31/10/2026 — « en préparation » RETIRÉ (Frédéric : « tu enlèves "en
// préparation" tant que je n'ai pas le feu vert du rectorat ») : la visio
// payante attend l'accord écrit du cumul. À remettre avec ce feu vert.

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

export default function BanniereCrpe({ place }: { place: "haut" | "colonnes" }) {
  const pathname = usePathname();
  // En haut, c'est le layout qui la rend : sur l'accueil seulement.
  if (place === "haut" && pathname !== "/accueil") return null;
  return (
    // ⭐ 17/10, suite : « la bannière a trop de hauteur — il y a 2 ou 3
    // commits tu avais fait une bannière d'une bonne hauteur en fond bleu
    // foncé ». Retour à la BANDE BLEU NUIT du 16/10 (commit 05755453), en plus
    // serrée : Ti Margo plus petit, et sur grand écran les boutons À DROITE du
    // texte au lieu d'en dessous. Le contenu : deux tests et le suivi (le samedi
    // est retiré le 20/10, voir en tête de fichier).
    // ⭐ 17/10 encore : « ce qui me dérange, c'est la couleur ». Le bleu nuit
    // part : la bande prend les tons CHAUDS DES PUBS (ambre → rose pâle, texte
    // bleu nuit, boutons orange), la hauteur compacte reste.
    <section
      aria-label="Préparer le CRPE"
      className={`border-y border-amber-200 bg-gradient-to-r from-amber-100 via-rose-50 to-amber-50 px-3 py-2 text-[#041B33] sm:px-4 ${place === "haut" ? "sm:hidden" : "hidden sm:block"}`}
    >
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
            <p className="text-xs font-black uppercase tracking-wide text-orange-600">
              CRPE 2027 · futurs professeurs des écoles
            </p>
            <p className="text-sm font-bold leading-5 text-slate-800">
              {/* ⚠️ Deux longueurs : la phrase entière doublerait la hauteur sur
                  un téléphone. */}
              <span className="sm:hidden">
                Deux tests pour se situer, un suivi au quotidien.
              </span>
              <span className="hidden sm:inline">
                Deux tests pour se situer en maths et en orthographe (personne ne
                paie), et un suivi au quotidien.
              </span>
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-1.5">
            <Link
              prefetch={false}
              href="/formation-crpe/test?from=accueil"
              onClick={() => track("accueil_bande_crpe", { lien: "test-maths" })}
              className="rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-white transition hover:bg-orange-400"
            >
              Test de maths
            </Link>
            <Link
              prefetch={false}
              href="/formation-crpe/test-orthographe?from=accueil"
              onClick={() => track("accueil_bande_crpe", { lien: "test-ortho" })}
              className="rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-white transition hover:bg-orange-400"
            >
              Test d&apos;orthographe
            </Link>
            <Link
              prefetch={false}
              href="/formation-crpe?from=accueil#suivi"
              onClick={() => track("accueil_bande_crpe", { lien: "suivi" })}
              className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#041B33] ring-1 ring-slate-300 transition hover:bg-slate-50"
            >
              Suivi quotidien →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
