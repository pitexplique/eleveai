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
              Défis IA Père Noël · élèves · parents · profs · établissement
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-50">
              <span className="block">Défis IA Père Noël</span>
              <span className="block text-emerald-400 mt-1">
                avec EleveAI, un prompt à la fois.
              </span>
            </h1>

            {/* Slogan / défi */}
            <p className="mt-3 text-lg sm:text-xl font-semibold text-emerald-300">
              Défis Prompt : change ton monde (et celui des autres).
            </p>

            {/* Tags des IA compatibles */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-slate-700 bg-slate-900 text-slate-300">
                ChatGPT
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-slate-700 bg-slate-900 text-slate-300">
                Gemini
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-slate-700 bg-slate-900 text-slate-300">
                Claude
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-slate-700 bg-slate-900 text-slate-300">
                Perplexity
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-slate-700 bg-slate-900 text-slate-300">
                Mistral
              </span>
            </div>

            <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-xl">
              Spécial Noël : EleveAI t’aide à formuler des{" "}
              <strong>défis solidaires, créatifs et bienveillants</strong> :
              lettres au Père Noël, projets de classe, messages de remerciement,
              actions pour changer un petit morceau de ton monde.
            </p>

            <p className="mt-3 text-sm text-slate-400 max-w-xl">
              Tu écris ton idée avec tes mots (élève, parent, prof, CPE,
              chef d’établissement…). EleveAI la{" "}
              <strong>clarifie</strong>, la <strong>structure</strong> et la{" "}
              <strong>réécrit</strong> en un prompt prêt à être envoyé à l’IA
              de ton choix, pour imaginer, organiser ou rédiger ton défi de Noël.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#defis-noel"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition"
              >
                Lancer un défi IA Père Noël
              </Link>
              <Link
                href="#espaces"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-300 transition"
              >
                Choisir mon espace EleveAI
              </Link>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-400">
              Usage responsable de l’IA · Pas de triche, juste des bonnes idées ·
              Conçu à La Réunion, avec un bonnet rouge en option 🎅
            </p>
          </div>

          {/* Colonne droite : carte "comment ça aide ?" */}
          <div className="lg:justify-self-end">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl shadow-black/40 space-y-4">
              <h2 className="text-lg font-semibold text-slate-50">
                Comment EleveAI t’aide pour les défis de Noël ?
              </h2>
              <p className="text-sm text-slate-300">
                Tu as une intuition, une envie de faire plaisir ou d’aider ?
                EleveAI transforme cette idée en une demande claire pour l’IA :
                texte, planning, affiche, activité de classe, message bienveillant…
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <p className="font-semibold text-emerald-300">Élèves</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Écrire une lettre originale au Père Noël</li>
                    <li>• Inventer un calendrier de l’avent de gentillesse</li>
                    <li>• Préparer un petit discours pour la classe</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-emerald-300">Parents</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Formuler un message apaisé à un prof</li>
                    <li>• Demander à l’IA des idées d’activités en famille</li>
                    <li>• Aider son enfant à rédiger sans faire à sa place</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-emerald-300">Profs</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Créer un défi d’écriture “Lettre au Père Noël”</li>
                    <li>• Imaginer un projet solidaire avec la classe</li>
                    <li>• Adapter une activité de Noël aux niveaux des élèves</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-emerald-300">
                    Direction & vie scolaire
                  </p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Rédiger une note bienveillante pour les fêtes</li>
                    <li>• Concevoir un projet de Noël pour l’établissement</li>
                    <li>• Poser une demande claire à l’IA en quelques lignes</li>
                  </ul>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                EleveAI n’écrit pas à ta place : il t’aide à{" "}
                <strong>mieux demander</strong>, pour mieux obtenir… et mieux
                partager la magie de Noël.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION : DEFIS IA PERE NOEL */}
      <section
        id="defis-noel"
        className="mx-auto max-w-6xl px-4 py-12 border-b border-slate-800 bg-slate-950/40"
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Défie le Père Noël… avec l’IA (mais proprement !)
        </h2>

        <p className="text-sm text-slate-300 mb-6 max-w-3xl">
          L’idée est simple : pendant une période donnée, chacun se lance un{" "}
          <strong>petit défi IA Père Noël</strong>. Tu choisis ton angle
          (gentillesse, solidarité, remerciement, organisation, créativité…),
          tu écris ton idée avec tes mots, et EleveAI t’aide à construire le
          prompt parfait pour l’IA.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold uppercase text-emerald-300 mb-1">
              Défi 1 · Lettre au Père Noël
            </p>
            <p className="text-sm text-slate-200 mb-2">
              Rédiger une lettre au Père Noël qui ne parle pas que de cadeaux.
            </p>
            <p className="text-xs text-slate-300">
              Demande à EleveAI : un prompt pour écrire une lettre qui parle
              aussi de ce que tu veux changer chez toi, dans ta classe ou dans
              le monde.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold uppercase text-emerald-300 mb-1">
              Défi 2 · Un geste pour quelqu’un
            </p>
            <p className="text-sm text-slate-200 mb-2">
              Imaginer une petite action concrète pour aider une personne autour
              de toi.
            </p>
            <p className="text-xs text-slate-300">
              EleveAI t’aide à créer un prompt pour demander à l’IA des idées
              d’actions simples, adaptées à ton âge, à ta classe ou à ton rôle
              dans l’établissement.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold uppercase text-emerald-300 mb-1">
              Défi 3 · Change ton monde
            </p>
            <p className="text-sm text-slate-200 mb-2">
              Choisir un “micro-changement” qui rend le quotidien un peu plus
              doux.
            </p>
            <p className="text-xs text-slate-300">
              Tu décris la situation (classe, famille, vie scolaire) et EleveAI
              t’aide à formuler un prompt pour obtenir un plan simple :
              message, affiche, règles communes, idées d’activités…
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Tu peux lancer un seul défi, ou enchaîner les trois. L’important, ce
          n’est pas la perfection du texte : c’est l’intention, la clarté de ta
          demande, et ce que tu choisis de mettre en place derrière.
        </p>
      </section>

      {/* SECTION RAPIDE : LIENS ESPACES */}
      <section
        id="espaces"
        className="mx-auto max-w-6xl px-4 py-12 scroll-mt-20"
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Choisissez votre espace pour lancer vos défis
        </h2>

        <p className="text-sm text-slate-300 mb-4 max-w-2xl">
          Chaque espace EleveAI vous aide à{" "}
          <strong>formuler de meilleures demandes</strong> à l’IA :
          lettres, messages, projets, activités…  
          Vous pouvez même vous lancer un défi :{" "}
          <strong>une meilleure question par jour</strong> jusqu’à Noël.
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
              Transformer ses idées de défis en prompts clairs pour comprendre,
              créer, remercier ou organiser un projet de Noël.
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
              Décrire une activité, un projet solidaire ou un atelier d’écriture
              de Noël, et laisser EleveAI le transformer en prompts puissants.
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
              Notes, mails, projets d’établissement pour Noël : formuler des
              demandes précises à l’IA et gagner du temps sur les écrits.
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
              Écrire à un professeur, organiser un moment en famille, aider son
              enfant à formuler sa lettre ou son projet de Noël.
            </p>
          </Link>
        </div>
      </section>

      {/* SECTION : QUI JE SUIS */}
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
              J’aime lancer de petits <strong>défis</strong> : une meilleure question,
              une consigne plus claire, un mail plus apaisé… et, à Noël, des défis IA
              Père Noël pour semer un peu plus de gentillesse et de créativité.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              Mon objectif : dégager du temps, diminuer la charge mentale et redonner
              de l’énergie à ce qui compte vraiment :{" "}
              <strong>la relation pédagogique et la réussite des élèves</strong>.
            </p>

            <p className="mt-3 text-sm font-medium text-emerald-300">
              — Frédéric, créateur d’EleveAI
            </p>

            <p className="mt-2 text-sm italic text-emerald-400 text-right flex items-center justify-end gap-2">
              <span>Un ε bien choisi peut ouvrir vers l’infini…</span>
              <span className="text-emerald-300 text-lg">∞</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
