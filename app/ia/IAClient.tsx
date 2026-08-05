"use client";

// /ia — l'entrée d'EleveAI en plein écran, sans l'habillage du journal.
// Tout le comportement vit dans components/matrice/EntreeMatrice : la même
// entrée sert ici et en tête de l'accueil, pour qu'elles ne divergent jamais.

import Link from "next/link";
import EntreeMatrice from "@/components/matrice/EntreeMatrice";

export default function IAClient() {
  return (
    <main className="min-h-screen bg-[#f5fafb] px-4 pb-24 pt-10 text-slate-900 sm:pt-16">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-10 text-center">
          <p className="text-2xl font-semibold tracking-[0.14em] sm:text-3xl">ELEVEAI</p>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            L&apos;IA éducative conçue à La Réunion
          </p>
        </header>

        <EntreeMatrice variante="page" />

        <footer className="mt-14 text-center text-xs text-slate-400">
          <p>
            EleveAI tient compte de ton profil et cherche, parmi des ressources relues par un
            enseignant, celles qui peuvent le mieux t&apos;aider.
          </p>
          <p className="mt-3">
            {/* Pas de préchargement : /accueil est lourde et ce lien de bas de
                page est rarement cliqué (cf. le quota ISR Reads). */}
            <Link
              href="/accueil"
              prefetch={false}
              className="underline underline-offset-2 hover:text-slate-600"
            >
              Revenir au journal
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
