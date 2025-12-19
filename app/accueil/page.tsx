"use client";

import Link from "next/link";

export default function AccueilPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* TOP BAR (porte email) */}
      <section className="border-b border-slate-800 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-300">
            👋 Prof indépendant ?
            <span className="text-slate-400"> Sauvegarde tes presets + historique avec un compte email (OTP).</span>
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Créer un compte (OTP)
            </Link>
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-50 hover:bg-slate-800"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* HERO PRINCIPAL (CADRE) */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 space-y-8">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-200">
              🧠 IA autorisée mais encadrée
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 font-semibold text-slate-200">
              🏫 Pensé collège/lycée
            </span>
            <span className="text-slate-400">EleveAI — l’outil + le cadre</span>
          </div>

          {/* Grille */}
          <div className="grid gap-6 lg:grid-cols-[3fr,2fr] items-start">
            {/* Colonne gauche */}
            <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Gagnez du temps et de la précision
            </h1>

<p className="mt-3 text-lg sm:text-xl font-semibold text-emerald-300">
  Crée ton prompt maintenant.
</p>
<p className="text-sm text-slate-400">
  L’IA propose, tu décides. La pédagogie reste humaine.
</p>


              <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
                EleveAI sert à <b>apprendre à bien utiliser l’IA</b> (Atelier-IA), et à{" "}
                <b>créer des prompts utiles</b> pour les profs, élèves et parents — sans tricher.
                <br />
                <span className="text-slate-400">
                  L’IA est autorisée, mais encadrée : traces, esprit critique, correction personnelle.
                </span>
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap gap-2 pt-1">
                <Link
                  href="/atelier-IA"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  🧪 Découvrir l’Atelier-IA
                </Link>

                <Link
                  href="/espace-profs"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  📚 Tester (Espace profs)
                </Link>

                <Link
                  href="/espace-eleves"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  🎒 Tester (Espace élèves)
                </Link>

                <Link
                  href="/parents"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  🧩 Tester (Espace parents)
                </Link>
              </div>

              <p className="text-xs text-slate-500">
                ✅ Cadre compatible établissement : usage responsable, pas “fait à la place”, prompts guidés.
              </p>
            </div>

            {/* Colonne droite : cartes rassurantes */}
            <div className="space-y-3">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 shadow-lg shadow-emerald-900/30">
                <p className="text-sm font-semibold text-emerald-100">🔒 Anti-triche intégré</p>
                <p className="text-xs text-emerald-50/90 mt-1 leading-relaxed">
                  On travaille avec des <b>traces</b> : prompt utilisé, réponse IA, corrections personnelles,
                  et analyse critique.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3">
                <p className="text-sm font-semibold text-slate-100">⚡ Gain de temps réel</p>
                <ul className="mt-2 space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-300">•</span>
                    Prompts calibrés programmes (BO/Eduscol).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-300">•</span>
                    Formulaires simples, résultats propres, prêts à copier-coller.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-300">•</span>
                    Atelier-IA : une activité “IA-friendly” structurée et rassurante.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3">
                <p className="text-sm font-semibold text-slate-100">🎯 Pour qui ?</p>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Chef d’établissement, profs, parents, élèves : chacun a son espace, mais{" "}
                  <b>le même cadre</b>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDICATEURS */}
      <section className="border-b border-slate-800 bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-4 py-4 grid gap-3 sm:grid-cols-3">
          {[
            "🧪 Atelier-IA : IA autorisée mais encadrée",
            "🧩 3 espaces (profs / élèves / parents)",
            "✅ Prompts prêts en < 5 min",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2"
            >
              <span className="text-emerald-300 text-lg">★</span>
              <p className="text-sm font-semibold text-slate-100">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BANDEAU ATELIER-IA (LEVERS COLLEGE) */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <Link
            href="/atelier-IA"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border border-emerald-500/30 bg-emerald-900/15 px-4 py-3 hover:bg-emerald-900/25 transition"
          >
            <div className="text-sm text-slate-200">
              <span className="font-semibold text-emerald-200">🧪 Atelier-IA</span>
              <span className="text-slate-400">
                {" "}
                — un cadre clé en main pour intégrer l’IA dès la rentrée (traces, esprit critique, anti-triche).
              </span>
            </div>
            <span className="text-xs font-semibold text-emerald-200">Voir le programme →</span>
          </Link>
        </div>
      </section>

      {/* CARTES : ESPACES */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
          <h2 className="text-xl font-semibold text-slate-100">
            Tester l’outil (sans perdre le cadre)
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl leading-snug">
            L’objectif : gagner du temps, garder la main, et faire apprendre (pas faire à la place).
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Profs */}
            <Link
              href="/espace-profs"
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
            >
              <p className="text-sm font-semibold text-sky-300 flex items-center gap-2">
                📚 Espace profs
                <span className="text-[10px] rounded-full bg-sky-500/15 px-2 py-0.5 text-sky-100 border border-sky-500/40">
                  Gain de temps
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Préparer une séance, différencier, créer une évaluation, produire une activité IA-friendly.
              </p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-sky-200">
                Tester → créer un prompt prof →
              </p>
            </Link>

            {/* Élèves */}
            <Link
              href="/espace-eleves"
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
            >
              <p className="text-sm font-semibold text-emerald-300 flex items-center gap-2">
                🎒 Espace élèves
                <span className="text-[10px] rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-200 border border-emerald-500/40">
                  Révisions
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Comprendre un cours, réviser, s’entraîner, se corriger avec méthode (sans copier).
              </p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-emerald-200">
                Tester → créer un prompt élève →
              </p>
            </Link>

            {/* Parents */}
            <Link
              href="/parents"
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
            >
              <p className="text-sm font-semibold text-rose-300 flex items-center gap-2">
                🧩 Espace parents
                <span className="text-[10px] rounded-full bg-rose-500/15 px-2 py-0.5 text-rose-100 border border-rose-500/40">
                  Accompagner
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Aider sans faire à la place : organisation, motivation, compréhension, communication école-famille.
              </p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-rose-200">
                Tester → créer un prompt parent →
              </p>
            </Link>
          </div>

          {/* Bloc “établissement” */}
          <div className="mt-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-[12px] text-slate-200">
            <p className="font-semibold text-slate-100 flex items-center gap-2">
              🏫 Chef d’établissement / équipe éducative
            </p>
            <p className="mt-1">
              L’Atelier-IA peut devenir un <b>levier</b> pour le collège : cadre commun, pratiques alignées,
              et accompagnement des élèves. (Les espaces admin/établissement arrivent plus tard.)
            </p>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-100">
              En 3 étapes (cadre inclus)
            </h3>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/50 px-3 py-1.5 text-xs font-semibold text-emerald-100 hover:bg-emerald-900/30"
            >
              ☎️ Demander une démo rapide
            </Link>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {[
              {
                title: "Découvrir le cadre",
                text: "Atelier-IA : règles, traces, esprit critique, anti-triche.",
                icon: "🧪",
              },
              {
                title: "Tester un espace",
                text: "Profs / élèves / parents : formulaires guidés, prompts propres.",
                icon: "🎯",
              },
              {
                title: "Sauvegarder (option)",
                text: "Compte email (OTP) pour presets + historique + dashboard.",
                icon: "🔑",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2"
              >
                <p className="text-2xl" aria-hidden>
                  {step.icon}
                </p>
                <p className="text-sm font-semibold text-slate-100">{step.title}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>

          {/* CTA final */}
          <div className="pt-2 flex flex-wrap gap-2">
            <Link
              href="/atelier-IA"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              🧪 Lire “Atelier-IA”
            </Link>
            <Link
              href="/espace-profs"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
            >
              📚 Tester l’espace profs
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-900/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-900/20"
            >
              🔑 Créer un compte (OTP)
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
