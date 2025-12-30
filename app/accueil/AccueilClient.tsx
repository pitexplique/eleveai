"use client";

import Link from "next/link";
import Image from "next/image";

export default function AccueilPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO PRINCIPAL */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 space-y-10">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-200">
              🧠 IA autorisée mais encadrée
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 font-semibold text-slate-200">
              🏫 Pensé collège/lycée
            </span>
            <span className="text-slate-400">
              EleveAI — IA pédagogique + cadre anti-triche
            </span>
          </div>

          {/* Grille HERO */}
          <div className="grid gap-8 lg:grid-cols-[3fr,2fr] items-start">
            {/* Colonne gauche */}
            <div className="space-y-5">
              {/* ✅ H1 SEO-clair */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                IA pédagogique encadrée
                <span className="block text-emerald-300">
                  Profs · Élèves · Parents — gagnez du temps, gardez la main
                </span>
              </h1>

              {/* Positionnement (mot pro) */}
              <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
                EleveAI aide à créer des <b>consignes IA</b> (prompts) claires et guidées,
                adaptées au niveau, pour <b>apprendre, s’entraîner et accompagner</b> —{" "}
                <b>sans tricher</b>.
                <br />
                <span className="text-slate-400">
                  Consignes, étapes, justification, correction : l’IA structure, l’humain décide.
                </span>
              </p>

              {/* Manifeste / règle */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  <span className="text-emerald-300 font-semibold">
                    La règle EleveAI :
                  </span>{" "}
                  l’IA propose, l’élève (ou le prof){" "}
                  <span className="font-semibold">répond, justifie, corrige</span>.
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Traces + esprit critique + correction personnelle → pas “fait à la place”.
                </p>
              </div>

              {/* ✅ CTA hiérarchisés */}
              <div className="flex flex-wrap gap-2 pt-1">
                {/* CTA principal */}
                <Link
                  href="/espace-profs"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  📚 Démarrer côté profs
                </Link>

                {/* secondaires */}
                <Link
                  href="/espace-eleves"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  🎒 Espace élèves
                </Link>

                <Link
                  href="/espace-parents"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  🧩 Espace parents
                </Link>

                <Link
                  href="/atelier-IA"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-900/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-900/20"
                >
                  🧪 Découvrir l’atelier-IA
                </Link>
              </div>

              <div className="flex flex-wrap gap-3 items-center pt-1 text-xs">
                <Link
                  href="/tarifs"
                  className="text-emerald-200 underline underline-offset-4 hover:text-emerald-100"
                >
                  Voir les tarifs →
                </Link>
                <span className="text-slate-600">•</span>
                <Link
                  href="/pourquoi-nos-tarifs-sont-justes"
                  className="text-slate-300 underline underline-offset-4 hover:text-slate-200"
                >
                  Pourquoi nos tarifs sont justes →
                </Link>
              </div>

              <p className="text-xs text-slate-500">
                ✅ Compatible établissement : l’IA n’évalue pas à ta place — elle structure,
                questionne, et fait progresser.
              </p>
            </div>

            {/* Colonne droite */}
            <div className="space-y-3">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 shadow-lg shadow-emerald-900/30">
                <p className="text-sm font-semibold text-emerald-100">
                  🔒 Anti-triche (pédagogique)
                </p>
                <p className="text-xs text-emerald-50/90 mt-1 leading-relaxed">
                  On exige des <b>traces</b> : consigne IA, réponse IA,{" "}
                  <b>corrections personnelles</b>, analyse critique.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3">
                <p className="text-sm font-semibold text-slate-100">
                  ⚡ Gain de temps… sans perdre la main
                </p>
                <ul className="mt-2 space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-300">•</span>
                    Consignes guidées (étapes, contraintes, niveau, objectifs).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-300">•</span>
                    Résultats propres, prêts à copier-coller (mais perfectibles).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-300">•</span>
                    atelier-IA : activité “IA-friendly” structurée et rassurante.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3">
                <p className="text-sm font-semibold text-slate-100">🎯 Pour qui ?</p>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Profs, élèves, parents : chacun a son espace, mais{" "}
                  <b>le même cadre</b> (apprendre, justifier, corriger).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHIE */}
      <section className="border-b border-slate-800 bg-slate-950/70">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid gap-6 md:grid-cols-[1fr,2fr] items-center rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-emerald-200">
                Notre philosophie : humble, utile, ouverte.
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">
                EleveAI est une <b>borne d’entrée</b> : un point de départ pour dialoguer
                avec des IA <b>comme partenaires</b>, pas comme oracles.
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">
                L’IA peut se tromper : l’humain garde la main, et l’apprentissage reste central.
              </p>
              <p className="text-xs text-slate-400">
                Un détail bien posé peut ouvrir un champ immense — sans perdre le cadre.
              </p>
            </div>

            <Image
              src="/logo-epsilon.png"
              alt="ε → ∞ — Un détail pour tout changer"
              width={250}
              height={250}
              className="mx-auto h-[250px] w-auto opacity-90"
            />
          </div>
        </div>
      </section>

      {/* INDICATEURS */}
      <section className="border-b border-slate-800 bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-4 py-4 grid gap-3 sm:grid-cols-3">
          {[
            "🧪 atelier-IA : apprendre le cadre",
            "🧩 3 espaces (profs / élèves / parents)",
            "✅ Une consigne IA claire en < 5 min",
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

      {/* BANDEAU atelier-IA */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <Link
            href="/atelier-IA"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border border-emerald-500/30 bg-emerald-900/15 px-4 py-3 hover:bg-emerald-900/25 transition"
          >
            <div className="text-sm text-slate-200">
              <span className="font-semibold text-emerald-200">🧪 atelier-IA</span>
              <span className="text-slate-400">
                {" "}
                — règles, traces, esprit critique, anti-triche : un cadre clé en main.
              </span>
            </div>
            <span className="text-xs font-semibold text-emerald-200">
              Voir le programme →
            </span>
          </Link>
        </div>
      </section>

      {/* CARTES : ESPACES */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
          <h2 className="text-xl font-semibold text-slate-100">
            Tester EleveAI
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl leading-snug">
            Objectif : gagner du temps, garder la main, et faire apprendre (pas faire à la place).
          </p>

          <div className="grid gap-4 md:grid-cols-3">
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
                Séances, différenciation, évaluations, devoirs IA-friendly.
              </p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-sky-200">
                Ouvrir → créer une consigne IA →{" "}
              </p>
            </Link>

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
                Comprendre un cours, s’entraîner, se corriger avec méthode (sans copier).
              </p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-emerald-200">
                Ouvrir → s’entraîner →{" "}
              </p>
            </Link>

            <Link
              href="/espace-parents"
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
            >
              <p className="text-sm font-semibold text-rose-300 flex items-center gap-2">
                🧩 Espace parents
                <span className="text-[10px] rounded-full bg-rose-500/15 px-2 py-0.5 text-rose-100 border border-rose-500/40">
                  Accompagner
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Aider sans faire à la place : organisation, motivation, communication école-famille.
              </p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-rose-200">
                Ouvrir → accompagner →{" "}
              </p>
            </Link>
          </div>

          <div className="mt-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-[12px] text-slate-200">
            <p className="font-semibold text-slate-100 flex items-center gap-2">
              🏫 Établissement
            </p>
            <p className="mt-1">
              L’atelier-IA peut devenir un <b>levier</b> : cadre commun, pratiques alignées,
              élèves accompagnés.
              {" "}
              <Link href="/offre-pilote" className="text-emerald-200 underline underline-offset-4 hover:text-emerald-100">
                Découvrir l’offre pilote →
              </Link>
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
                text: "atelier-IA : règles, traces, esprit critique, anti-triche.",
                icon: "🧪",
              },
              {
                title: "Tester un espace",
                text: "Profs / élèves / parents : formulaires guidés, consignes IA propres.",
                icon: "🎯",
              },
              {
                title: "Sauvegarder (option)",
                text: "Compte email (OTP) : presets + historique + dashboard.",
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

          <div className="pt-2 flex flex-wrap gap-2">
            <Link
              href="/atelier-IA"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              🧪 Lire “atelier-IA”
            </Link>
            <Link
              href="/espace-profs"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
            >
              📚 Tester l’espace profs
            </Link>
            <Link
              href="/auth/signup"
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