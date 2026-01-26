"use client";

import Link from "next/link";
import Image from "next/image";

export default function AccueilPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* =========================
          BLOC 1 — HERO / EN-TÊTE "JOURNAL"
          ========================= */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-950">
        <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-6 py-10 sm:py-14">
          {/* Marque + promesse */}
          <div className="space-y-3 text-slate-100">
            <p className="text-[11px] uppercase tracking-wider text-slate-400">
              Le Journal IA — EleveAI
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              EleveAI — IA pédagogique encadrée
            </h1>

            <h2 className="text-lg font-semibold text-emerald-300">
              Apprendre à piloter l’IA, sans “fait à la place”.
            </h2>

            <p className="text-sm font-medium text-slate-300 max-w-4xl leading-relaxed">
              EleveAI n’est pas un générateur magique de cours : c’est une plateforme
              qui apprend aux professeurs à dialoguer intelligemment avec l’IA via des
              prompts pédagogiques solides et des presets téléchargeables / adaptables.
            </p>

            <p className="text-xs text-slate-400 pt-1">
              🧠 IA autorisée mais encadrée · 🏫 École · Collège · Lycée · 🔎 Presets par classe & matière · ✅ Traces & avis critique
            </p>
          </div>

          <div className="mt-7 grid gap-10 lg:grid-cols-[3fr,2fr] items-start">
            {/* Colonne gauche : éditorial + CTA */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                  Un journal pédagogique
                  <span className="block text-emerald-300">
                    pour créer, apprendre, progresser.
                  </span>
                </h3>

                <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                  Ici, l’IA <span className="font-semibold">propose</span>. L’humain{" "}
                  <span className="font-semibold">analyse, décide, améliore</span>.
                </p>

                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Une consigne claire, des étapes, des traces, puis un{" "}
                  <span className="text-slate-100 font-semibold">avis critique</span>.
                  EleveAI aide à apprendre à penser avec l’IA — pas à lui obéir.
                </p>

                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                  🌿 Mieux demander → moins d’allers-retours → moins de requêtes inutiles.
                </p>

                {/* Badges de crédibilité */}
                <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1">
                    👨‍🏫 Conçu par un professeur
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1">
                    ✅ Anti-triche pédagogique (traces)
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1">
                    📚 Presets téléchargeables
                  </span>
                </div>
              </div>

              {/* CTA principaux */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Link
                  href="/atelier-IA"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  🧪 Entrer dans l’atelier-IA
                </Link>

                <Link
                  href="/espace-profs"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  📚 Espace Profs
                </Link>

                <Link
                  href="/espace-eleves"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  🎒 Espace Élèves
                </Link>

                <Link
                  href="/espace-parents"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  🧩 Espace Parents
                </Link>
              </div>

              <div className="flex flex-wrap gap-3 items-center pt-2 text-xs">
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
                <span className="text-slate-600">•</span>
                <Link
                  href="/contact"
                  className="text-slate-300 underline underline-offset-4 hover:text-slate-200"
                >
                  Contact / démo →
                </Link>
              </div>

              <p className="text-[11px] text-slate-500 max-w-2xl">
                ✅ Compatible établissement : l’IA n’évalue pas à ta place — elle structure, questionne, et fait progresser.
              </p>
            </div>

            {/* Colonne droite : cartes "7 secondes" + Traces */}
            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold text-slate-100">
                  En 7 secondes…
                </p>
                <div className="mt-3 space-y-2 text-xs text-slate-300">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2">
                    <span className="text-sky-300 font-semibold">👩‍🏫 Prof</span>{" "}
                    <span className="text-slate-400">→</span>{" "}
                    <span className="text-slate-200">
                      “Je garde la main sur mon métier.”
                    </span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2">
                    <span className="text-emerald-300 font-semibold">🎒 Élève</span>{" "}
                    <span className="text-slate-400">→</span>{" "}
                    <span className="text-slate-200">
                      “J’ai le droit d’apprendre avec l’IA.”
                    </span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2">
                    <span className="text-rose-300 font-semibold">👨‍👩‍👧 Parent</span>{" "}
                    <span className="text-slate-400">→</span>{" "}
                    <span className="text-slate-200">“C’est encadré.”</span>
                  </div>
                  <div className="rounded-xl border border-emerald-500/25 bg-emerald-900/10 px-3 py-2">
                    <span className="text-emerald-200 font-semibold">🧪 Atelier-IA</span>{" "}
                    <span className="text-slate-400">→</span>{" "}
                    <span className="text-slate-100">“On me guide. Je m’améliore.”</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 shadow-lg shadow-emerald-900/20">
                <p className="text-sm font-semibold text-emerald-100">
                  🔒 Traces (pédagogiques)
                </p>
                <p className="text-xs text-emerald-50/90 mt-1 leading-relaxed">
                  On exige des <b>traces</b> : consigne IA, réponse IA,{" "}
                  <b>corrections personnelles</b>, analyse critique.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3">
                <p className="text-sm font-semibold text-slate-100">🌿 Sobriété numérique</p>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Consignes claires, contraintes, étapes : moins d’essais répétés, moins de requêtes inutiles.
                </p>
                <p className="mt-2 text-[11px] text-slate-400">Mieux demander, c’est moins gaspiller.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BLOC 2 — À LA UNE (HEBDO)
          ========================= */}
      <section className="border-b border-slate-800 bg-slate-950/70">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-wider text-slate-400">
                  📰 À la Une — cette semaine
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-100">
                  Apprendre avec l’IA sans tricher : une méthode simple
                </h2>
                <p className="text-sm text-slate-200 leading-relaxed max-w-3xl">
                  Interdire l’IA ne fonctionne pas. Fermer les yeux non plus.
                  Cette semaine, on montre comment l’utiliser comme outil
                  d’apprentissage : consigne claire, étapes, traces, puis avis critique.
                </p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-slate-200">
                    Situation réelle
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-slate-200">
                    Consigne
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-slate-200">
                    Traces & critères
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/atelier-IA"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  Voir l’exemple →
                </Link>
                <Link
                  href="/communaute"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  Rejoindre la communauté
                </Link>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/30 px-4 py-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                ✍️ Mini-règle : l’IA propose, l’humain justifie. Ce n’est pas la réponse qui compte, c’est l’amélioration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BLOC 3 — SECTIONS (PROFS / ÉLÈVES / PARENTS / COLLÈGES)
          ========================= */}
      <section className="border-b border-slate-800 bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-100">
              Les rubriques principales
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl">
              Un seul cadre. Quatre entrées. Chacune répond à une question simple.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* PROFS */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-sm font-semibold text-sky-300">
                👩‍🏫 Professeurs
              </p>
              <h4 className="mt-2 text-lg font-semibold text-slate-100">
                Piloter l’IA, sans perdre la main sur son métier
              </h4>
              <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                EleveAI n’est pas un générateur magique de cours. C’est une plateforme
                qui apprend aux professeurs à piloter l’IA via des prompts pédagogiques
                solides et des presets téléchargeables / adaptables.
              </p>

              <div className="mt-4 space-y-2 text-xs text-slate-300">
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2">
                  <span className="font-semibold text-slate-100">1) Former implicitement</span>{" "}
                  <span className="text-slate-400">—</span>{" "}
                  Presets = modèles, formation par l’exemple.
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2">
                  <span className="font-semibold text-slate-100">2) Gagner du temps</span>{" "}
                  <span className="text-slate-400">—</span>{" "}
                  sans “clic magique”, sans dépossession.
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2">
                  <span className="font-semibold text-slate-100">3) Capital pédagogique</span>{" "}
                  <span className="text-slate-400">—</span>{" "}
                  BO / neurosciences / DYS / anti-triche.
                </div>
              </div>

              <p className="mt-4 text-xs text-emerald-200">
                “EleveAI apprend aux professeurs à dialoguer intelligemment avec l’IA, au service de leur pédagogie.”
              </p>

              <div className="mt-4 flex gap-2">
                <Link
                  href="/espace-profs"
                  className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400"
                >
                  Ouvrir l’espace Profs →
                </Link>
                <Link
                  href="/atelier-IA"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  Voir l’Atelier-IA
                </Link>
              </div>
            </div>

            {/* ÉLÈVES */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-sm font-semibold text-emerald-300">
                🎒 Élèves
              </p>
              <h4 className="mt-2 text-lg font-semibold text-slate-100">
                Apprendre avec l’IA, sans copier
              </h4>
              <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                Ici, l’IA est autorisée, mais encadrée. On n’évalue pas ce que dit l’IA,
                mais <b>ce que tu en fais</b> : comprendre, corriger, améliorer, expliquer.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {["Comprendre", "Repérer une erreur", "Améliorer", "Justifier"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-xs text-slate-400">
                ➡️ Tu as le droit d’apprendre avec l’IA. Tu as le devoir de penser.
              </p>

              <div className="mt-4 flex gap-2">
                <Link
                  href="/espace-eleves"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  Ouvrir l’espace Élèves →
                </Link>
                <Link
                  href="/atelier-IA"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  Voir les défis
                </Link>
              </div>
            </div>

            {/* PARENTS */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-sm font-semibold text-rose-300">
                👨‍👩‍👧 Parents
              </p>
              <h4 className="mt-2 text-lg font-semibold text-slate-100">
                Aider sans faire à la place
              </h4>
              <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                Un cadre clair pour accompagner un enfant : comprendre le rôle de l’IA,
                lire une trace de travail, poser les bonnes questions — sans pression.
              </p>

              <div className="mt-4 space-y-2 text-xs text-slate-300">
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2">
                  ✅ Consigne → réponse IA → corrections personnelles
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2">
                  ✅ On valorise l’effort et l’analyse, pas le copier-coller
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  href="/espace-parents"
                  className="inline-flex items-center justify-center rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-rose-400"
                >
                  Ouvrir l’espace Parents →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  Demander une démo
                </Link>
              </div>
            </div>

            {/* COLLÈGES / ÉTABLISSEMENTS */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-sm font-semibold text-slate-200">
                🏫 Collèges & établissements
              </p>
              <h4 className="mt-2 text-lg font-semibold text-slate-100">
                Cadrer sans brider
              </h4>
              <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                Un référentiel commun : usages clairs de l’IA, pratiques alignées,
                respect du cadre institutionnel — sans injonction, sans uniformisation.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {["Cadre commun", "Traces", "Sécurité", "Harmonisation"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  href="/offre-pilote"
                  className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-white"
                >
                  Découvrir l’offre pilote →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  Contact établissement
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BLOC 4 — DÉFIS & CONCOURS (Journal vivant)
          ========================= */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Défis */}
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-900/10 p-6">
              <p className="text-sm font-semibold text-emerald-200">🎯 Défis (courts & faisables)</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-100">
                Apprendre en agissant
              </h3>
              <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                Chaque semaine : un défi prof, un défi élève, un défi “changer son monde”.
                Toujours avec une trace attendue.
              </p>

              <div className="mt-4 space-y-2 text-xs text-slate-300">
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2">
                  👩‍🏫 <span className="font-semibold text-slate-100">Défi prof</span> — améliorer une consigne (Bloom / compétences)
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2">
                  🎒 <span className="font-semibold text-slate-100">Défi élève</span> — repérer 2 erreurs et améliorer
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2">
                  🌍 <span className="font-semibold text-slate-100">Changer son monde</span> — une action locale réaliste
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  href="/atelier-IA"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  Voir les défis →
                </Link>
                <Link
                  href="/communaute"
                  className="inline-flex items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-900/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-900/20"
                >
                  Rejoindre
                </Link>
              </div>
            </div>

            {/* Concours */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-sm font-semibold text-slate-200">🏆 La meilleure question</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-100">
                Une bonne question vaut mieux qu’un long prompt
              </h3>
              <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                Chaque mois, on met en avant une situation réelle : prompt initial,
                réponse IA, analyse humaine, prompt amélioré, et ce qui a changé dans le réel.
              </p>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/30 px-4 py-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  On ne récompense pas la technicité. On valorise la clarté, l’analyse et l’impact réel.
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  href="/communaute"
                  className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-white"
                >
                  Proposer une question →
                </Link>
                <Link
                  href="/atelier-IA"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  Voir des exemples
                </Link>
              </div>
            </div>
          </div>

          {/* Baseline */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="grid gap-6 md:grid-cols-[1fr,2fr] items-center">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-emerald-200">
                  Philosophie
                </p>
                <p className="text-sm text-slate-200 leading-relaxed">
                  L’IA est là. L’apprentissage reste humain.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  EleveAI aide à mieux demander, mieux vérifier, mieux améliorer — pour apprendre et agir avec lucidité.
                </p>

                <div className="pt-3 flex flex-wrap gap-2">
                  <Link
                    href="/atelier-IA"
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                  >
                    🧪 Découvrir l’atelier-IA
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-900/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-900/20"
                  >
                    🔑 Créer un compte (OTP)
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                  >
                    ☎️ Demander une démo
                  </Link>
                </div>
              </div>

              <Image
                src="/logo-epsilon.png"
                alt="ε → ∞ — Un détail pédagogique pour tout changer"
                width={250}
                height={250}
                className="mx-auto h-[220px] w-auto opacity-90"
              />
            </div>

            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/30 px-4 py-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                📌 EleveAI est un cadre pédagogique : l’IA ne remplace pas l’enseignant, n’évalue pas à sa place,
                et chaque réponse doit être justifiée, critiquée, améliorée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BLOC 5 — FOOTER ÉTABLISSEMENT (facultatif)
          ========================= */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-[12px] text-slate-200">
            <p className="font-semibold text-slate-100 flex items-center gap-2">
              🏫 Établissement
            </p>
            <p className="mt-1 leading-relaxed">
              L’atelier-IA peut devenir un <b>cadre commun</b> : pratiques alignées,
              élèves accompagnés, usage de l’IA rassurant.{" "}
              <Link
                href="/offre-pilote"
                className="text-emerald-200 underline underline-offset-4 hover:text-emerald-100"
              >
                Découvrir l’offre pilote →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
