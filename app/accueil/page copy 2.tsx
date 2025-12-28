"use client";

import Link from "next/link";

type UneArticle = {
  emoji: string;
  title: string;
  deck: string; // chapeau
  note: string; // phrase implicite sur le prompt (discrète)
  href: string;
  tag?: string;
};

const UNE_ARTICLES: UneArticle[] = [
  {
    emoji: "💧",
    title: "Pourquoi peut-on manquer d’eau sur une île où il pleut ?",
    deck: "Pluie abondante, relief abrupt, ruissellement rapide : l’eau existe, mais n’est pas toujours disponible.",
    note: "Ce type de question nécessite un prompt explicatif structuré.",
    href: "/atelier-IA#defi-reunion",
    tag: "Eau",
  },
  {
    emoji: "💧",
    title: "Quand la pluie tombe… mais ne reste pas",
    deck: "Stockage, réseaux, usages : ce n’est pas la météo qui décide, mais l’organisation.",
    note: "Ici, un prompt d’analyse de contraintes fait la différence.",
    href: "/atelier-IA#defi-reunion",
    tag: "Eau",
  },
  {
    emoji: "🗺️",
    title: "Une île : un système où tout est lié",
    deck: "Routes, eau, énergie, déchets, prix : sur une île, résoudre un problème isolément ne fonctionne pas.",
    note: "Un prompt systémique permet de relier les causes et les effets.",
    href: "/atelier-IA#defi-reunion",
    tag: "Insularité",
  },
  {
    emoji: "🗺️",
    title: "Peut-on résoudre un problème sans voir l’ensemble ?",
    deck: "Penser local impose de penser global, sans simplifier à l’excès.",
    note: "Ce type de réflexion repose sur un prompt de modélisation.",
    href: "/atelier-IA#defi-reunion",
    tag: "Insularité",
  },
];

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
            <span className="text-slate-400">EleveAI — l’outil + le cadre</span>
          </div>

          {/* UNE (style journal, sans images) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900/30">
              <p className="text-xs font-semibold text-slate-400">🗞️ À la Une — Atelier-IA</p>
              <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                Aujourd’hui : La Réunion en 20 minutes{" "}
                <span className="text-emerald-300">(et un bon prompt).</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Embouteillages, eau, risques, territoire : le réel est complexe. EleveAI transforme ces
                situations en <b>prompts pédagogiques clairs, guidés et réutilisables</b>, pour faire
                réfléchir <b>sans tricher</b>.
              </p>

              {/* Micro-vente implicite */}
              <p className="mt-2 text-xs text-slate-400">
                Derrière chaque défi Atelier-IA : objectifs, étapes, contraintes et <b>traces</b>.
              </p>

              {/* CTA Une */}
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/atelier-IA#defi-reunion"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  🌋 Faire le défi Réunion
                </Link>
                <Link
                  href="/atelier-IA"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  🧪 Lire le cadre (Atelier-IA)
                </Link>
                <Link
                  href="/espace-profs"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-emerald-500/40 border bg-emerald-900/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-900/20"
                >
                  📚 Générer un prompt prof
                </Link>
              </div>
            </div>

            {/* Articles de Une (emojis uniquement) */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-end justify-between gap-3">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-100">À lire aujourd’hui</h2>
                <span className="text-xs text-slate-400">Édition Réunion</span>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {UNE_ARTICLES.map((a) => (
                  <Link
                    key={a.title}
                    href={a.href}
                    className="group rounded-2xl border border-slate-800 bg-slate-950/35 p-4 hover:bg-slate-950/55 hover:border-emerald-500/30 transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl leading-none" aria-hidden>
                        {a.emoji}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-slate-100">{a.title}</p>
                          {a.tag ? (
                            <span className="text-[10px] rounded-full border border-slate-700 bg-slate-950/60 px-2 py-0.5 text-slate-300">
                              {a.tag}
                            </span>
                          ) : null}
                        </div>

                        <p className="mt-1 text-xs text-slate-300 leading-relaxed">{a.deck}</p>

                        <p className="mt-2 text-[11px] text-slate-400 group-hover:text-emerald-200">
                          👉 {a.note}
                        </p>

                        <p className="mt-3 text-[11px] text-slate-500 group-hover:text-slate-300">
                          Ouvrir → voir le défi → générer le prompt
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Note éditoriale */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  🧠 <span className="font-semibold text-slate-100">Note éditoriale :</span> ces sujets
                  présentent des situations réelles.{" "}
                  <span className="text-emerald-200 font-semibold">
                    EleveAI permet de générer les prompts pédagogiques
                  </span>{" "}
                  pour les traiter au bon niveau, avec un cadre clair.
                </p>
              </div>
            </div>
          </div>

          {/* Grille HERO (produit + cadre) */}
          <div className="grid gap-8 lg:grid-cols-[3fr,2fr] items-start">
            {/* Colonne gauche */}
            <div className="space-y-5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                Génération de prompts Expert
                <span className="block text-emerald-300">Gagnez du temps et de la précision</span>
              </h2>

              {/* Manifeste / règle */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  <span className="text-emerald-300 font-semibold">La règle EleveAI :</span>{" "}
                  l’IA propose, l’élève (ou le prof){" "}
                  <span className="font-semibold">répond, justifie, corrige</span>.
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Traces + esprit critique + correction personnelle → pas “fait à la place”.
                </p>
              </div>

              <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
                EleveAI sert à <b>apprendre à bien utiliser l’IA</b> (Atelier-IA) et à{" "}
                <b>créer des prompts utiles</b> pour les profs, élèves et parents —{" "}
                <b>sans tricher</b>.
                <br />
                <span className="text-slate-400">
                  Usage encadré : consignes, étapes, justification, amélioration progressive.
                </span>
              </p>

              {/* CTA */}
              <div className="flex flex-wrap gap-2 pt-1">
                <Link
                  href="/espace-profs"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  📚 Créer un prompt prof
                </Link>

                <Link
                  href="/espace-eleves"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  🎒 Créer un prompt élève
                </Link>

                <Link
                  href="/parents"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                >
                  🧩 Créer un prompt parent
                </Link>

                <Link
                  href="/atelier-IA"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  🧪 Apprendre le cadre (Atelier-IA)
                </Link>
              </div>

              <p className="text-xs text-slate-500">
                ✅ Compatible établissement : l’IA n’évalue pas à ta place — elle structure,
                questionne, et fait progresser.
              </p>
            </div>

            {/* Colonne droite : bénéfices + rituel */}
            <div className="space-y-3">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 shadow-lg shadow-emerald-900/30">
                <p className="text-sm font-semibold text-emerald-100">🔒 Anti-triche (pédagogique)</p>
                <p className="text-xs text-emerald-50/90 mt-1 leading-relaxed">
                  On exige des <b>traces</b> : prompt, réponse IA,{" "}
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
                    Prompts guidés (étapes, contraintes, niveau, objectifs).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-300">•</span>
                    Résultats propres, prêts à copier-coller (mais perfectibles).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-300">•</span>
                    Atelier-IA : activité “IA-friendly” structurée et rassurante.
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

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                <p className="text-sm font-semibold text-slate-100">🧠 Prompt-rituel (Atelier-IA)</p>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  1) Pose-moi 3 questions avant de répondre
                  <br />
                  2) Donne 2 hypothèses + ce qu’il faut vérifier
                  <br />
                  3) Explique simplement (collège puis lycée)
                  <br />
                  4) Termine par :{" "}
                  <span className="text-emerald-200 font-semibold">“Ce que je dois écrire moi-même”</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHIE (sans image) */}
      <section className="border-b border-slate-800 bg-slate-950/70">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-emerald-200">
                Notre philosophie : humble, utile, ouverte.
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">
                EleveAI est une <b>borne d’entrée</b> : un point de départ pour dialoguer avec des IA{" "}
                <b>comme partenaires</b>, pas comme oracles.
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">
                On reste volontairement <b>humble</b> : l’IA peut se tromper, l’humain garde la main,
                et l’apprentissage reste central.
              </p>
              <p className="text-xs text-slate-400">
                Un détail bien posé peut ouvrir un champ immense — sans perdre le cadre.
              </p>
              <p className="pt-2 text-xs text-slate-400">
                <span className="text-emerald-200 font-semibold">ε → ∞</span> — Un détail pour tout changer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INDICATEURS */}
      <section className="border-b border-slate-800 bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-4 py-4 grid gap-3 sm:grid-cols-3">
          {[
            "🧪 Atelier-IA : apprendre le cadre",
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

      {/* BANDEAU ATELIER-IA */}
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
                — règles, traces, esprit critique, anti-triche : un cadre clé en main.
              </span>
            </div>
            <span className="text-xs font-semibold text-emerald-200">Voir le programme →</span>
          </Link>
        </div>
      </section>

      {/* CARTES : ESPACES */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
          <h3 className="text-xl font-semibold text-slate-100">
            Tester l’outil (sans perdre le cadre)
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl leading-snug">
            Objectif : gagner du temps, garder la main, et faire apprendre (pas faire à la place).
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
                Ouvrir → créer un prompt prof →
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
                Comprendre un cours, s’entraîner, se corriger avec méthode (sans copier).
              </p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-emerald-200">
                Ouvrir → créer un prompt élève →
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
                Aider sans faire à la place : organisation, motivation, communication école-famille.
              </p>
              <p className="mt-3 text-[11px] text-slate-400 group-hover:text-rose-200">
                Ouvrir → créer un prompt parent →
              </p>
            </Link>
          </div>

          {/* Bloc “établissement” */}
          <div className="mt-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-[12px] text-slate-200">
            <p className="font-semibold text-slate-100 flex items-center gap-2">
              🏫 Chef d’établissement / équipe éducative
            </p>
            <p className="mt-1">
              L’Atelier-IA peut devenir un <b>levier</b> : cadre commun, pratiques alignées, élèves
              accompagnés. (Les espaces admin/établissement arrivent plus tard.)
            </p>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="text-lg sm:text-xl font-semibold text-slate-100">
              En 3 étapes (cadre inclus)
            </h4>
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
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-900/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-900/20"
            >
              🔑 Créer un compte 
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
