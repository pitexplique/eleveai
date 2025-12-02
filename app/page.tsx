"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24 grid gap-10 lg:grid-cols-2 items-center">
          {/* Colonne gauche : titre + défi */}
          <div>
            <p className="inline-flex items-center rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300 mb-4">
              IA pédagogique · Eduscol + neurosciences · pour tout le collège
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-50">
              EleveAI, l’IA pédagogique
              <span className="block text-emerald-400 mt-1">
                et son grand défi&nbsp;:
              </span>
              <span className="block mt-2 text-2xl sm:text-3xl text-amber-300">
                «&nbsp;Changer son monde en 7 jours&nbsp;»
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-xl">
              Une IA conçue pour les <strong>élèves</strong>, les{" "}
              <strong>parents</strong>, les <strong>profs</strong>, l’
              <strong>administration</strong>, les{" "}
              <strong>agents d’entretien</strong> et la{" "}
              <strong>restauration scolaire</strong>. Chacun relève un
              mini-défi pour améliorer son quotidien à l’école, à la maison ou
              dans son quartier.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#defi"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition"
              >
                Relever le défi maintenant
              </a>
              <Link
                href="/espace-eleves"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-300 transition"
              >
                Découvrir EleveAI pour la classe
              </Link>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-400">
              Conçu dans le respect des programmes Eduscol et des principes des
              neurosciences (rappel actif, progressivité, exemples concrets), en
              lien avec la nature, le territoire et l’économie sociale et
              solidaire.
            </p>
          </div>

          {/* Colonne droite : carte "pour qui ?" */}
          <div className="lg:justify-self-end">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl shadow-black/40 space-y-4">
              <h2 className="text-lg font-semibold text-slate-50">
                Une IA pour toute la communauté éducative
              </h2>
              <p className="text-sm text-slate-300">
                EleveAI accompagne tous les métiers du collège et du lycée pour{" "}
                <strong>gagner du temps</strong>,{" "}
                <strong>mieux comprendre</strong> et{" "}
                <strong>agir concrètement</strong>.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="space-y-1">
                  <p className="font-semibold text-emerald-300">Élèves</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Explications pas à pas</li>
                    <li>• Révisions guidées</li>
                    <li>• Préparation aux oraux</li>
                  </ul>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-emerald-300">Parents</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Comprendre les notions</li>
                    <li>• Aider sans faire à la place</li>
                    <li>• Organiser les devoirs</li>
                  </ul>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-emerald-300">Profs</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Cours Eduscol-ready</li>
                    <li>• Différenciation & DYS</li>
                    <li>• Activités clé en main</li>
                  </ul>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-emerald-300">
                    Admin · Entretien · Cantine
                  </p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Notes & courriers</li>
                    <li>• Fiches de protocole</li>
                    <li>• Menus & affiches anti-gaspi</li>
                  </ul>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                Objectif : que chaque personne du collège puisse dire&nbsp;:
                <br />
                <span className="text-emerald-300">
                  «&nbsp;Grâce au défi EleveAI, j’ai amélioré une petite chose
                  dans mon monde.&nbsp;»
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION DÉFI */}
      <section
        id="defi"
        className="border-b border-slate-800 bg-slate-900/40"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 space-y-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
                🎯 Défi EleveAI — «&nbsp;Changer son monde en 7 jours&nbsp;»
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
                Chaque élève, parent, professeur, membre de l’administration,
                agent d’entretien ou personnel de cantine choisit{" "}
                <strong>un mini-problème concret</strong> et demande à EleveAI
                :
                <br />
                <span className="italic text-emerald-300">
                  «&nbsp;Aide-moi à améliorer ceci en 7 jours.&nbsp;»
                </span>
              </p>
            </div>
            <div className="mt-3 sm:mt-0">
              <span className="inline-flex items-center rounded-full border border-amber-400/60 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
                Accessible dès la 6e · Adapté aux familles
              </span>
            </div>
          </div>

          {/* Étapes du défi */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-xs font-semibold text-emerald-300 mb-1">
                ÉTAPE 1
              </p>
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Choisir un mini-problème
              </h3>
              <p className="text-sm text-slate-300">
                Exemples&nbsp;: je stresse avant les contrôles, je perds mes
                affaires, j’ai du mal à rédiger un mail, on gaspille à la
                cantine, le ménage est mal réparti, on jette trop d’eau ou de
                nourriture à la maison…
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-xs font-semibold text-emerald-300 mb-1">
                ÉTAPE 2
              </p>
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Demander un plan sur 7 jours
              </h3>
              <p className="text-sm text-slate-300">
                EleveAI propose un mini-plan d’actions simples, adaptées à
                l’âge, au rôle (élève, parent, prof, agent…) et au contexte du
                collège, en privilégiant des gestes concrets, solidaires et
                respectueux de la nature.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-xs font-semibold text-emerald-300 mb-1">
                ÉTAPE 3
              </p>
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Agir & partager le résultat
              </h3>
              <p className="text-sm text-slate-300">
                Chaque participant réalise au moins{" "}
                <strong>3 actions concrètes</strong> et partage une trace :
                petite photo, texte, affiche, recette anti-gaspi, organisation
                de classe, coin nature, geste solidaire…
              </p>
            </div>
          </div>

          {/* Exemples par profil */}
          <div className="grid gap-4 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
              <p className="text-xs font-semibold text-emerald-300">
                Pour un élève
              </p>
              <p className="text-sm text-slate-200">
                « Je révise les maths 10 minutes par jour, je prépare mon
                cartable la veille et je range mon espace de travail. »
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
              <p className="text-xs font-semibold text-emerald-300">
                Pour un parent
              </p>
              <p className="text-sm text-slate-200">
                « Je mets en place une routine calme devoirs + repas, avec des
                conseils d’EleveAI, et j’écoute mon enfant 5 minutes sans écran. »
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
              <p className="text-xs font-semibold text-emerald-300">
                Pour un professeur
              </p>
              <p className="text-sm text-slate-200">
                « Je teste une séance active construite avec EleveAI, en
                respectant Eduscol + neurosciences, sur un thème concret (nature,
                économie sociale, solidarité). »
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
              <p className="text-xs font-semibold text-emerald-300">
                Pour entretien / cantine / admin
              </p>
              <p className="text-sm text-slate-200">
                « On crée une fiche simple de protocole, un planning clair ou
                une affiche anti-gaspillage (eau, énergie, nourriture) à partir
                d’un prompt EleveAI. »
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-slate-300 max-w-xl">
              À la fin, chacun reçoit un badge symbolique&nbsp;:{" "}
              <span className="text-emerald-300 font-semibold">
                «&nbsp;Je change mon monde avec EleveAI&nbsp;».
              </span>{" "}
              Le défi peut être lancé par un collège, un lycée, une association
              ou un foyer.
            </p>
            <div className="flex gap-3">
              <Link
                href="/espace-profs"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-300 transition"
              >
                Lancer le défi dans mon établissement
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION RAPIDE : LIENS ESPACES */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Choisissez votre espace EleveAI
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          <Link
            href="/espace-eleves"
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-400 hover:-translate-y-0.5 transition"
          >
            <p className="text-sm font-semibold text-emerald-300">
              Espace élèves
            </p>
            <p className="mt-1 text-xs text-slate-300">
              Réviser, comprendre, s’entraîner, préparer ses oraux sans tricher.
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
              Cours, activités, évaluations et prompts conformes Eduscol.
            </p>
          </Link>
          <Link
            href="/espace-administration"
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-400 hover:-translate-y-0.5 transition"
          >
            <p className="text-sm font-semibold text-emerald-300">
              Administratif
            </p>
            <p className="mt-1 text-xs text-slate-300">
              Textes administratifs, notes aux familles, synthèses, projets.
            </p>
          </Link>
          <Link
            href="/parents"
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-400 hover:-translate-y-0.5 transition"
          >
            <p className="text-sm font-semibold text-emerald-300">
              Parents & communauté
            </p>
            <p className="mt-1 text-xs text-slate-300">
              Comprendre l’IA, accompagner son enfant, relever le défi en
              famille.
            </p>
          </Link>
        </div>
      </section>

      {/* À PROPOS + SIGNATURE */}
{/* SECTION : QUI JE SUIS */}
<section className="border-t border-slate-800 bg-slate-900/40">
  <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
    <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50 mb-6">
      Qui je suis
    </h2>

    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 sm:p-8 space-y-4">
      <p className="text-sm text-slate-300 leading-relaxed">
        Je m’appelle <strong>Frédéric</strong>. Je suis enseignant de mathématiques 
        à La Réunion, passionné de pédagogie, de nature et de création.  
        J’accompagne les élèves depuis plus de 30 ans, et j’expérimente depuis des années 
        comment <strong>rendre l’école plus claire, plus humaine et plus efficace</strong>.
      </p>

      <p className="text-sm text-slate-300 leading-relaxed">
        EleveAI est né d’un constat simple : chaque élève, chaque parent, chaque professeur, 
        chaque membre d’une communauté scolaire peut <strong>changer une petite partie de son monde</strong> 
        grâce à un outil bien conçu, fiable, et cohérent avec Eduscol + les neurosciences.
      </p>

      <p className="text-sm text-slate-300 leading-relaxed">
        Je conçois, je prototype, j’enseigne, j’inspire.  
        Et j’aide les jeunes — ceux de l’Entre-Deux, de La Réunion, et d’ailleurs —  
        à utiliser l’IA non pour tricher… mais pour <strong>grandir</strong>.
      </p>

      <p className="text-sm font-medium text-emerald-300">
        — Frédéric, créateur d’EleveAI
      </p>

      <p className="mt-2 text-sm italic text-emerald-400 text-right flex items-center justify-end gap-2">
        <span>ε peut engendrer l’infini</span>
        <span className="text-emerald-300 text-lg">∞</span>
      </p>
    </div>
  </div>
</section>

    </main>
  );
}






