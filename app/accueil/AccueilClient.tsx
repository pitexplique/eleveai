"use client";

import Link from "next/link";
import Image from "next/image";

export default function AccueilPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* =========================
          BLOC 1 — Entrée (7 secondes)
          ========================= */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-950">
        <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-6 py-10 sm:py-14">
          {/* Badges sobres */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-200">
              🧠 IA autorisée mais encadrée
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 font-semibold text-slate-200">
              🏫 École · Collège · Lycée
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 font-semibold text-slate-200">
              🌿 Les outils doivent s’adapter aux humains, pas l’inverse.
            </span>
            <span className="text-slate-400">EleveAI — l’IA au service de l’apprentissage</span>
          </div>

          <div className="mt-7 grid gap-10 lg:grid-cols-[3fr,2fr] items-start">
            {/* Gauche : message ultra clair (silence, confiance) */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                  L’IA pédagogique
                  <span className="block text-emerald-300">pour créer, apprendre, progresser.</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                  Ici, l’IA <span className="font-semibold">aide</span>. L’humain{" "}
                  <span className="font-semibold">décide</span>.
                </p>

                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  EleveAI n’est pas un “générateur de devoirs”. C’est un{" "}
                  <span className="text-slate-100 font-semibold">cadre d’apprentissage</span> :
                  consigne claire, étapes, justification, puis{" "}
                  <span className="text-slate-100 font-semibold">avis critique</span> et amélioration.
                </p>

                {/* Sobriété (micro-ligne, crédible, sans promesse absolue) */}
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                  🌿 Des consignes plus claires → moins d’allers-retours → moins de requêtes inutiles.
                </p>

                {/* Micro-preuve / crédibilité (répond au “Perplexity” sans le citer) */}
                <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1">
                    👨‍🏫 Conçu par un professeur
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1">
                    ✅ Anti-triche pédagogique (traces)
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1">
                    🧩 Profs · Élèves · Parents
                  </span>
                </div>
              </div>

              {/* CTA : plus calmes, mieux hiérarchisés */}
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
                ✅ Compatible établissement : l’IA n’évalue pas à ta place — elle structure, questionne et fait progresser.
              </p>
            </div>

            {/* Droite : 7 secondes pour chaque public */}
            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold text-slate-100">En 7 secondes…</p>
                <div className="mt-3 space-y-2 text-xs text-slate-300">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2">
                    <span className="text-sky-300 font-semibold">👩‍🏫 Prof</span>{" "}
                    <span className="text-slate-400">→</span>{" "}
                    <span className="text-slate-200">“Je garde la main.”</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2">
                    <span className="text-rose-300 font-semibold">👨‍👩‍👧 Parent</span>{" "}
                    <span className="text-slate-400">→</span>{" "}
                    <span className="text-slate-200">“C’est encadré.”</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2">
                    <span className="text-emerald-300 font-semibold">🎒 Élève</span>{" "}
                    <span className="text-slate-400">→</span>{" "}
                    <span className="text-slate-200">“J’ai le droit d’apprendre avec l’IA.”</span>
                  </div>

                  {/* Ajout demandé : élève + atelier-IA */}
                  <div className="rounded-xl border border-emerald-500/25 bg-emerald-900/10 px-3 py-2">
                    <span className="text-emerald-200 font-semibold">🧪 Atelier-IA</span>{" "}
                    <span className="text-slate-400">→</span>{" "}
                    <span className="text-slate-100">“On me guide. Je m’améliore.”</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 shadow-lg shadow-emerald-900/20">
                <p className="text-sm font-semibold text-emerald-100">🔒 Traces (pédagogiques)</p>
                <p className="text-xs text-emerald-50/90 mt-1 leading-relaxed">
                  On exige des <b>traces</b> : consigne IA, réponse IA, <b>corrections personnelles</b>, analyse critique.
                </p>
              </div>

              {/* Sobriété numérique (petit encart : crédible, sans greenwashing) */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3">
                <p className="text-sm font-semibold text-slate-100">🌿 Sobriété numérique</p>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  EleveAI aide à mieux interroger l’IA : consignes claires, contraintes, étapes.
                  Moins d’essais répétés, moins de requêtes inutiles.
                </p>
                <p className="mt-2 text-[11px] text-slate-400">Mieux demander, c’est moins gaspiller.</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3">
                <p className="text-sm font-semibold text-slate-100">✨ Micro-fun (utile)</p>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Une réponse IA n’est pas “la vérité”. C’est une proposition à tester, critiquer, améliorer.
                </p>
                <p className="mt-2 text-[11px] text-slate-400">
                  (Oui, l’IA se trompe. Et c’est justement là qu’on apprend.)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BLOC 2 — Le cadre (simple, lisible)
          ========================= */}
      <section className="border-b border-slate-800 bg-slate-950/70">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid gap-6 md:grid-cols-[2fr,1fr] items-start rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-emerald-200">Le cadre, sans jargon</p>
              <p className="text-sm text-slate-200 leading-relaxed">
                EleveAI n’est pas une IA qui fait à ta place. C’est un <b>cadre d’apprentissage</b> :
                consigne claire, étapes, justification, puis <b>avis critique</b>.
              </p>
              <ul className="mt-2 space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-300">•</span>
                  L’IA <b>propose</b>, l’humain <b>valide</b> (ou corrige).
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-300">•</span>
                  Pas de “copier-coller” : on demande des <b>traces</b> et une amélioration personnelle.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-300">•</span>
                  L’objectif : apprendre à <b>penser</b> avec l’IA, pas à lui obéir.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-300">•</span>
                  Bonus : une consigne claire évite des essais inutiles (sobriété numérique).
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="text-sm font-semibold text-slate-100">Notre principe</p>
              <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                Une réponse IA n’est jamais une fin : elle doit être{" "}
                <span className="text-emerald-200 font-semibold">jugée</span> et{" "}
                <span className="text-emerald-200 font-semibold">améliorée</span>.
              </p>
              <p className="mt-3 text-[11px] text-slate-400">
                Dans tous les espaces : ✅ ⚠️ ❌ ✍️ (avis critique obligatoire)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BLOC 3 — Ce que fait l’IA (actions)
          ========================= */}
      <section className="border-b border-slate-800 bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { t: "Créer une consigne claire", d: "Objectifs, contraintes, niveau, étapes.", i: "🧩" },
              { t: "Structurer et reformuler", d: "Clarifier, résumer, expliciter.", i: "🧠" },
              { t: "Corriger intelligemment", d: "Repérer une erreur, proposer une amélioration.", i: "🛠️" },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-2xl" aria-hidden>
                  {c.i}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-100">{c.t}</p>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">{c.d}</p>
                <p className="mt-3 text-[11px] text-slate-400">L’IA propose → tu vérifies → tu améliores.</p>
                <p className="mt-2 text-[11px] text-slate-500">🌿 Moins d’aller-retours quand la consigne est bien posée.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          BLOC 4 — Atelier-IA (cœur)
          ========================= */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-900/10 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-200">🧪 Atelier-IA</p>
                <h2 className="mt-1 text-xl sm:text-2xl font-semibold text-slate-100">Apprendre à penser avec l’IA</h2>
                <p className="mt-2 text-sm text-slate-200 max-w-3xl leading-relaxed">
                  Un espace où l’IA est <b>autorisée</b>, mais <b>encadrée</b>. On apprend à questionner,
                  repérer les erreurs et améliorer une production.
                </p>
                <p className="mt-2 text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Pour l’élève : <b>permission + sécurité</b> — “On ne m’évalue pas sur ce que dit l’IA,
                  mais sur ce que j’en fais.”
                </p>
                <p className="mt-2 text-xs text-slate-300 max-w-3xl leading-relaxed">
                  🌿 Bonus : apprendre à mieux interroger l’IA, c’est aussi éviter des requêtes inutiles.
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/atelier-IA"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  Voir le programme →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-900/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-900/20"
                >
                  Demander une démo
                </Link>
              </div>
            </div>

            {/* NOTE vidéo (sans l’intégrer) */}
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/30 px-4 py-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                💡 Option “Dyma” : une courte vidéo silencieuse (10–15 s) ici peut rassurer énormément
                (montrer un geste réel : consigne → réponse → avis critique).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BLOC 5 — Choisir son espace (bifurcation claire)
          ========================= */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-100">Tu es…</h3>
            <p className="text-xs text-slate-400 max-w-2xl">Même cadre. Trois usages. Choisis ton point d’entrée.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/espace-profs"
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
            >
              <p className="text-sm font-semibold text-sky-300 flex items-center gap-2">
                👩‍🏫 Professeur
                <span className="text-[10px] rounded-full bg-sky-500/15 px-2 py-0.5 text-sky-100 border border-sky-500/40">
                  Soulagement
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-200">Gagner du temps sans perdre la main.</p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-sky-200">
                Ouvrir → créer une consigne IA → avis critique →
              </p>
            </Link>

            <Link
              href="/espace-eleves"
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
            >
              <p className="text-sm font-semibold text-emerald-300 flex items-center gap-2">
                🎒 Élève
                <span className="text-[10px] rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-200 border border-emerald-500/40">
                  Permission
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-200">Comprendre, s’entraîner, progresser (sans copier).</p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-emerald-200">
                Ouvrir → s’entraîner → s’améliorer →
              </p>
            </Link>

            <Link
              href="/espace-parents"
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-emerald-400/60 hover:bg-slate-900 transition-colors"
            >
              <p className="text-sm font-semibold text-rose-300 flex items-center gap-2">
                👨‍👩‍👧 Parent
                <span className="text-[10px] rounded-full bg-rose-500/15 px-2 py-0.5 text-rose-100 border border-rose-500/40">
                  Sécurité
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Aider sans faire à la place : cadre, organisation, motivation.
              </p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-rose-200">
                Ouvrir → accompagner → rassurer →
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          BLOC 6 — Projection douce (ce que ça change)
          ========================= */}
      <section className="border-b border-slate-800 bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              "✅ Une consigne IA claire en quelques minutes",
              "🧾 Des traces : consigne → réponse → corrections",
              "🌿 Moins d’essais répétés (sobriété numérique)",
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
        </div>
      </section>

      {/* =========================
          BLOC 7 — Clôture + philosophie (calme)
          ========================= */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
          <div className="grid gap-6 md:grid-cols-[1fr,2fr] items-center rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-emerald-200">Philosophie : humble, utile, ouverte.</p>
              <p className="text-sm text-slate-200 leading-relaxed">
                EleveAI est une <b>borne d’entrée</b> : un point de départ pour dialoguer
                avec l’IA comme <b>partenaire</b>, pas comme oracle.
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">
                L’IA peut se tromper : l’humain garde la main, et l’apprentissage reste central.
              </p>

              <p className="text-xs text-slate-400">
                L’IA est là. L’apprentissage reste humain.{" "}
                <span className="text-slate-500">(Et mieux interroger l’IA, c’est aussi éviter du gaspillage numérique.)</span>
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

              {/* Bloc “anti-confusion Perplexity” : plateforme ≠ contact perso */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/30 px-4 py-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  📌 EleveAI est un cadre pédagogique : l’IA ne remplace pas l’enseignant, n’évalue pas à sa place,
                  et chaque réponse doit être justifiée, critiquée, améliorée.
                </p>
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

          {/* Etablissement (plus tard, plus doux) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-[12px] text-slate-200">
            <p className="font-semibold text-slate-100 flex items-center gap-2">🏫 Établissement</p>
            <p className="mt-1 leading-relaxed">
              L’atelier-IA peut devenir un <b>cadre commun</b> : pratiques alignées, élèves accompagnés,
              et usage de l’IA rassurant.{" "}
              <Link href="/offre-pilote" className="text-emerald-200 underline underline-offset-4 hover:text-emerald-100">
                Découvrir l’offre pilote →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
