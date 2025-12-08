"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">

      {/* HERO */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24 grid gap-10 lg:grid-cols-2 items-center">
          {/* Colonne gauche : titre / pitch */}
          <div>
            <p className="inline-flex items-center rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300 mb-4">
              Optimisation de prompts · IA éducative · pour toute la communauté scolaire
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-50">
              <span className="block">EleveAI améliore</span>
              <span className="block text-emerald-400 mt-1">
                vos questions et vos prompts scolaires.
              </span>
            </h1>

            <p className="mt-3 text-lg sm:text-xl font-semibold text-emerald-300">
              Défis Prompt : change ton monde.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-slate-700 bg-slate-900 text-slate-300">ChatGPT</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-slate-700 bg-slate-900 text-slate-300">Gemini</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-slate-700 bg-slate-900 text-slate-300">Claude</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-slate-700 bg-slate-900 text-slate-300">Perplexity</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-slate-700 bg-slate-900 text-slate-300">Mistral</span>
            </div>

            <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-xl">
              Vous écrivez votre question ou votre consigne avec vos mots, comme vous le diriez
              à un élève, à un collègue ou à votre enfant. EleveAI la{" "}
              <strong>clarifie</strong>, la <strong>structure</strong> et la{" "}
              <strong>réécrit</strong> pour obtenir de meilleures réponses, avec l’IA de votre choix.
            </p>

            <p className="mt-3 text-sm text-slate-400 max-w-xl">
              Pensé pour les <strong>élèves</strong>, les <strong>parents</strong>, les{" "}
              <strong>professeurs</strong>, la <strong>direction</strong> et la{" "}
              <strong>vie scolaire</strong> : moins de temps perdu à chercher “le bon prompt”,
              plus d’efficacité dans chaque demande… et un peu plus de sérénité au quotidien.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition"
              >
                Voir les tarifs & l’offre pilote
              </Link>
              <Link
                href="#espaces"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-300 transition"
              >
                Choisir mon espace EleveAI
              </Link>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-400">
              Usage responsable de l’IA · Aide à la formulation, pas à la triche · Conçu à La Réunion
            </p>
          </div>

          {/* Colonne droite */}
          <div className="lg:justify-self-end">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl shadow-black/40 space-y-4">
              <h2 className="text-lg font-semibold text-slate-50">
                EleveAI améliore ce que vous écrivez.
              </h2>
              <p className="text-sm text-slate-300">
                Au lieu de passer du temps à inventer “le bon prompt”, vous décrivez simplement
                votre besoin. EleveAI le transforme en une demande claire, structurée et efficace
                pour l’IA (cours, devoirs, mails, projets…).
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <p className="font-semibold text-emerald-300">Élèves</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Reformuler une question de cours</li>
                    <li>• Préparer une demande d’explication</li>
                    <li>• Structurer un devoir ou un oral</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-emerald-300">Parents</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Clarifier un message au professeur</li>
                    <li>• Écrire une consigne à son enfant</li>
                    <li>• Demander une explication adaptée</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-emerald-300">Profs</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Transformer une idée en prompt précis</li>
                    <li>• Générer plusieurs variantes de consignes</li>
                    <li>• Adapter un exercice à différents niveaux</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-emerald-300">
                    Direction & vie scolaire
                  </p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Rédiger une note claire</li>
                    <li>• Poser une demande à l’IA sans jargon</li>
                    <li>• Gagner du temps sur les écrits quotidiens</li>
                  </ul>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                EleveAI n’écrit pas à votre place : il vous aide à mieux demander,
                pour mieux obtenir… et mieux transmettre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION ESPACES */}
      <section id="espaces" className="mx-auto max-w-6xl px-4 py-12 scroll-mt-20">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Choisissez votre espace EleveAI
        </h2>

        <p className="text-sm text-slate-300 mb-4 max-w-2xl">
          Chaque espace vous aide à <strong>formuler de meilleures demandes</strong> :
          questions de cours, consignes, prompts IA, messages officiels…  
          Vous pouvez même vous lancer un petit défi : une meilleure question par jour, pendant une semaine.
        </p>

        <div className="grid gap-4 md:grid-cols-4">
          <Link
            href="/espace-eleves"
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-400 hover:-translate-y-0.5 transition"
          >
            <p className="text-sm font-semibold text-emerald-300">
              Espace élèves
            </p>
            <p className="mt-1 text-xs text-slate-300">
              Transformer ses questions en prompts clairs pour comprendre, réviser et préparer ses évaluations.
            </p>
          </Link>

          <Link
            href="/espace-profs"
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-400 hover:-translate-y-0.5 transition"
          >
            <p className="text-sm font-semibold text-emerald-300">
              Espace profs
            </p>
            <p className="mt-1 text-xs text-slate-300">
              Décrire son besoin, laisser EleveAI le transformer en prompts puissants pour cours, activités et évaluations.
            </p>
          </Link>

          <Link
            href="/espace-administration"
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-400 hover:-translate-y-0.5 transition"
          >
            <p className="text-sm font-semibold text-emerald-300">
              Administration & vie scolaire
            </p>
            <p className="mt-1 text-xs text-slate-300">
              Notes, mails, comptes rendus : EleveAI vous aide à formuler des demandes précises à l’IA pour gagner du temps.
            </p>
          </Link>

          <Link
            href="/parents"
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-400 hover:-translate-y-0.5 transition"
          >
            <p className="text-sm font-semibold text-emerald-300">
              Espace parents
            </p>
            <p className="mt-1 text-xs text-slate-300">
              Écrire à un professeur, demander une explication, organiser le travail de son enfant avec des prompts clarifiés.
            </p>
          </Link>
        </div>

        <div className="mt-6">
          <Link
            href="/tarifs"
            className="inline-flex items-center text-sm text-emerald-300 hover:text-emerald-200"
          >
            Voir les tarifs et l’offre établissement pilote →
          </Link>
        </div>
      </section>

      {/* OFFRE PILOTE */}
      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
          <div className="rounded-2xl border border-emerald-600/60 bg-slate-950/60 p-6 sm:p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-300 mb-2">
                ⭐ Offre pilote pour collèges & lycées
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Testez EleveAI gratuitement dans votre établissement pendant{" "}
                <strong>8 semaines</strong> : optimisation de prompts pour élèves,
                profs, parents, direction et vie scolaire. Sans engagement, sans carte bancaire.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
              >
                Découvrir l’offre pilote
              </Link>
              <Link
                href="/contact"
                className="text-xs text-slate-300 hover:text-emerald-300"
              >
                Contacter EleveAI pour un test dans votre établissement →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUI JE SUIS */}
      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50 mb-6">
            Qui je suis
          </h2>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 sm:p-8 space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              Je m’appelle <strong>Frédéric</strong>.  
              Je suis enseignant de mathématiques à La Réunion, passionné par les prompts,
              les neurosciences de l’apprentissage et l’usage responsable de l’IA à l’école.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              J’ai créé EleveAI pour aider la communauté éducative à{" "}
              <strong>mieux formuler ses demandes</strong> à l’IA : élèves, parents,
              professeurs, direction, vie scolaire. Quand la question est bien posée,
              la réponse devient plus utile, plus claire et plus humaine.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              J’aime aussi lancer de petits <strong>défis</strong> : une meilleure question,
              une consigne plus claire, un mail plus apaisé… un epsilon de progrès à la fois.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              Mon objectif : diminuer la charge mentale et redonner
              de l’énergie à ce qui compte vraiment :{" "}
              <strong>la relation pédagogique et la réussite des élèves</strong>.
            </p>

            <p className="mt-3 text-sm font-medium text-emerald-300">
              — Frédéric, créateur d’EleveAI
            </p>

          </div>
        </div>
      </section>
    </main>
  );
}

