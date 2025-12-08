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
              EleveAI – IA au service des élèves, des profs, des parents et des établissements.
            </span>
          </div>

          {/* Titre + texte principal */}
          <div className="grid gap-8 lg:grid-cols-[3fr,2fr] items-start">
            {/* Colonne gauche */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                L’IA pour l’éducation,
                <span className="text-emerald-400"> sans triche</span> et avec
                <span className="text-emerald-300"> bienveillance</span>.
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl">
                EleveAI t’aide à formuler de bons prompts éducatifs : pour un élève qui révise,
                un professeur qui prépare son cours, un parent qui accompagne, ou une équipe
                de direction qui pilote un établissement.
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
                100% adapté au système scolaire français – prompts alignés sur l’esprit d’Eduscol et du BO.
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
                    Imagine un défi positif pour ta classe, ta famille ou ton établissement.
                    EleveAI t’aide à écrire un prompt Père Noël pour en faire un vrai plan d’action.
                  </p>

                  <ul className="text-xs text-slate-300 space-y-1">
                    <li>• Tu décris ce que tu veux changer.</li>
                    <li>• La moulinette IA construit un prompt clair.</li>
                    <li>• Tu peux l’envoyer à Frédéric ou à l’IA de ton choix.</li>
                  </ul>

                  <div className="pt-2 flex flex-wrap gap-2 items-center">
                    <Link
                      href="/defis-ia-pere-noel"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                    >
                      ✨ Lancer mon défi IA Noël
                    </Link>
                    <span className="text-[11px] text-emerald-200/80">
                      Question clé : <span className="italic">« Que viens-tu de changer ? »</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Petit bloc rassurant */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-[11px] text-slate-300">
                Usage responsable de l’IA : ici, on cherche des idées bienveillantes, positives et
                respectueuses de chacun. Pas de triche, pas de moqueries.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS CARTES PRINCIPALES */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
          <h2 className="text-xl font-semibold text-slate-100">
            Choisis ton espace pour générer des prompts utiles
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Carte élèves */}
            <Link
              href="/espace-eleves"
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
            >
              <p className="text-sm font-semibold text-emerald-300 flex items-center gap-2">
                🎒 Espace élèves
                <span className="text-[10px] rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-200 border border-emerald-500/40">
                  Prompts guidés
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Formulaires simples pour créer un prompt d’aide : comprendre un cours, réviser un
                contrôle, préparer le brevet ou le bac.
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
                  Préparation de cours
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Prompts pour préparer une séquence, différencier, créer des évaluations, des exercices,
                des fiches d’activités, en gardant la main sur la pédagogie.
              </p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-sky-200">
                Cliquer pour créer un prompt prof →
              </p>
            </Link>

            {/* Carte parents / vie scolaire */}
            <Link
              href="/parents"
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
            >
              <p className="text-sm font-semibold text-rose-300 flex items-center gap-2">
                🧩 Espace parents
                <span className="text-[10px] rounded-full bg-rose-500/15 px-2 py-0.5 text-rose-100 border border-rose-500/40">
                  Accompagner sans faire à la place
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Idées de prompts pour soutenir son enfant : organiser le travail, relire un devoir,
                préparer un oral, comprendre un bulletin.
              </p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-rose-200">
                Cliquer pour créer un prompt parent →
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
