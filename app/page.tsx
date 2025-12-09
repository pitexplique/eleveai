"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO PRINCIPAL */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 space-y-10">
          {/* Bandeau haut */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 font-semibold">
              ⚙️ Prompts pédagogiques prêts à l’emploi
            </span>
            <span className="text-slate-400">
              EleveAI – l’IA qui fait gagner du temps aux élèves, aux parents et à toute l’équipe éducative.
            </span>
          </div>

          {/* Titre + texte principal */}
          <div className="grid gap-8 lg:grid-cols-[3fr,2fr] items-start">
            {/* Colonne gauche */}
            <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          L’IA qui améliore vos prompts,
          <span className="text-emerald-400"> pour toute la communauté éducative</span>,
          et vous fait gagner
          <span className="text-emerald-300"> du temps et en efficacité</span>.
        </h1>


              <p className="text-sm sm:text-base text-slate-300 max-w-xl">
                EleveAI t’aide à formuler de bons prompts éducatifs pour aller plus vite et mieux
                cibler ce dont tu as besoin : un élève qui révise, un parent qui accompagne,
                un professeur qui prépare son cours, un principal ou une équipe de vie scolaire qui organise le collège.
              </p>

              {/* ✅ Rangée de boutons avec Défis Noël inclus */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/espace-eleves"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  🎒 Espace élèves (prompts)
                </Link>
                <Link
                  href="/espace-profs"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  📚 Espace profs
                </Link>
                <Link
                  href="/parents"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  🧩 Espace parents
                </Link>
                <Link
                  href="/defis-ia-pere-noel"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/70 bg-emerald-900/40 px-4 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-800/60"
                >
                  🎄 Défis IA Père Noël
                </Link>
              </div>

              <p className="text-xs text-slate-500">
                100% adapté au système scolaire français – prompts alignés sur l’esprit d’Eduscol et du BO,
                pensés pour faire gagner du temps sans tricher.
              </p>
            </div>

            {/* Colonne droite : bloc Défis Noël */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-900/40 via-slate-950 to-slate-950 p-5 shadow-lg relative overflow-hidden">
                {/* Effet décoratif */}
                <div className="pointer-events-none absolute inset-0 opacity-40">
                  <div className="absolute -top-4 right-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl" />
                  <div className="absolute bottom-0 left-4 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />
                </div>

                <div className="relative space-y-3">
                  <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold text-emerald-200">
                    🎄 Spécial Noël • Défi ponctuel
                  </p>

                  <h2 className="text-lg font-bold text-emerald-100">
                    Défis prompt : <span className="text-emerald-300">change ton monde</span>
                  </h2>

                  <p className="text-sm text-slate-200">
                    Imagine un défi positif pour ta classe, ta famille ou ton collège.
                    EleveAI transforme ton idée en un plan d’action clair, étape par étape,
                    pour t’aider à passer de l’idée à des solutions concrètes.
                  </p>

                  <ul className="text-xs text-slate-300 space-y-1">
                    <li>• Tu expliques ce que tu veux améliorer (écrans, ambiance, entraide...).</li>
                    <li>• La moulinette IA construit un prompt structuré qui te fait gagner du temps.</li>
                    <li>• Tu obtiens un vrai plan avec des actions simples à tester dans la réalité.</li>
                  </ul>

                  <div className="pt-2 flex flex-wrap gap-2 items-center">
                    <Link
                      href="/defis-ia-pere-noel"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                    >
                      ✨ Lancer mon défi IA Noël
                    </Link>
                    <span className="text-[11px] text-emerald-200/80">
                      Question clé : <span className="italic">« Quel petit morceau du monde veux-tu améliorer ? »</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Petit bloc rassurant */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-[11px] text-slate-300">
                Usage responsable de l’IA : ici, on cherche des idées bienveillantes, utiles et respectueuses
                pour tous – élèves, parents, personnels, direction. Pas de triche, pas de moqueries.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS CARTES PRINCIPALES */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
          <h2 className="text-xl font-semibold text-slate-100">
            Choisis ton espace et gagne du temps avec des prompts utiles
          </h2>

          <p className="text-xs text-slate-400 max-w-2xl">
            Chaque espace est conçu pour éviter les pertes de temps : moins de minutes à chercher quoi dire
            ou comment s’y prendre, plus de temps pour les vrais échanges et les actions concrètes.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Carte élèves */}
            <Link
              href="/espace-eleves"
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
            >
              <p className="text-sm font-semibold text-emerald-300 flex items-center gap-2">
                🎒 Espace élèves
                <span className="text-[10px] rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-200 border border-emerald-500/40">
                  Révisions rapides
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Formulaires simples pour créer un prompt d’aide : comprendre un cours, préparer un contrôle,
                lancer un défi positif, organiser tes révisions sans perdre de temps.
              </p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-emerald-200">
                Cliquer pour créer un prompt élève → 
              </p>
            </Link>

            {/* Carte profs */}
            <Link
              href="/espace-profs"
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
            >
              <p className="text-sm font-semibold text-sky-300 flex items-center gap-2">
                📚 Espace profs
                <span className="text-[10px] rounded-full bg-sky-500/15 px-2 py-0.5 text-sky-100 border border-sky-500/40">
                  Gain de temps
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Prompts pour préparer une séquence, différencier, créer des évaluations ou des activités.
                L’IA propose, tu choisis et tu ajustes : tu gardes la pédagogie, tu gagnes des heures.
              </p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-sky-200">
                Cliquer pour créer un prompt prof → 
              </p>
            </Link>

            {/* Carte parents */}
            <Link
              href="/parents"
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
            >
              <p className="text-sm font-semibold text-rose-300 flex items-center gap-2">
                🧩 Espace parents
                <span className="text-[10px] rounded-full bg-rose-500/15 px-2 py-0.5 text-rose-100 border border-rose-500/40">
                  Suivi simplifié
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Idées de prompts pour soutenir son enfant sans faire à sa place : organiser le travail,
                préparer un rendez-vous avec le professeur principal, comprendre un bulletin en quelques minutes.
              </p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-rose-200">
                Cliquer pour créer un prompt parent → 
              </p>
            </Link>
          </div>

          {/* Bloc pour les autres personnels : agents, vie scolaire, direction */}
          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-[12px] text-slate-200">
            <p className="font-semibold text-slate-100 flex items-center gap-2">
              🏫 Et aussi… personnels, agents d’entretien, vie scolaire, chef d’établissement
            </p>
            <p className="mt-1">
              EleveAI peut aussi aider à rédiger des messages aux familles, préparer des affiches claires,
              organiser les consignes, ou imaginer des défis pour améliorer le climat scolaire.
              Un espace dédié « collège & équipe éducative » arrive pour vous faire, à vous aussi,
              gagner du temps au quotidien.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
