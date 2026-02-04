// app/espace-colleges/page.tsx
"use client";

import Link from "next/link";

export default function EspaceCollegesPage() {
  const card =
    "rounded-2xl border border-slate-800 bg-slate-950/70 p-5 " +
    "shadow-lg shadow-black/20 hover:bg-slate-900/60 transition";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        {/* Titre */}
        <header className="space-y-2">
          <h1 className="text-2xl font-bold">Espace Écoles</h1>
          <p className="text-slate-300 text-sm">
            Accès aux espaces dédiés aux personnels et à la vie de l’établissement.
          </p>
        </header>

        {/* Cartes de navigation */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/espace-ecoles/espace-administration" className={card}>
            <h2 className="font-semibold text-lg">Administration</h2>
            <p className="text-sm text-slate-400 mt-1">
              Direction, pilotage, documents institutionnels.
            </p>
          </Link>

          <Link href="/espace-ecoles/espace-vie-scolaire" className={card}>
            <h2 className="font-semibold text-lg">Vie scolaire</h2>
            <p className="text-sm text-slate-400 mt-1">
              Suivi des élèves, climat scolaire, organisation quotidienne.
            </p>
          </Link>

          <Link href="/espace-ecoles/espace-aesh" className={card}>
            <h2 className="font-semibold text-lg">AESH</h2>
            <p className="text-sm text-slate-400 mt-1">
              Accompagnement des élèves à besoins éducatifs particuliers.
            </p>
          </Link>

          <Link href="/espace-ecoles/espace-personnels" className={card}>
            <h2 className="font-semibold text-lg">Personnels</h2>
            <p className="text-sm text-slate-400 mt-1">
              Ressources et outils pour les personnels de l’établissement.
            </p>
          </Link>
        </section>

        {/* Note */}
        <footer className="text-xs text-slate-500">
          Accès affiché selon le profil de connexion (élève, personnel, direction).
        </footer>
      </div>
    </main>
  );
}
