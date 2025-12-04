"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24 grid gap-10 lg:grid-cols-2 items-center">
          
          {/* Colonne gauche : titre */}
          <div>
            <p className="inline-flex items-center rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300 mb-4">
              IA pédagogique · Eduscol · neurosciences · pour toute la communauté scolaire
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-50">
              EleveAI, l’IA pédagogique
              <span className="block text-emerald-400 mt-1">
                conçue pour la classe, la maison et l’établissement.
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-xl">
              Une IA fiable, claire et accessible, pensée pour les <strong>élèves</strong>, 
              les <strong>parents</strong>, les <strong>profs</strong> et 
              l’<strong>administration</strong>.  
              EleveAI respecte les programmes officiels et les principes des neurosciences :
              progressivité, exemples concrets, rappel actif, clarté cognitive.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/espace-eleves"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition"
              >
                Espace élèves
              </Link>
              <Link
                href="/espace-profs"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-300 transition"
              >
                Espace profs
              </Link>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-400">
              Conforme Eduscol · Adapté DYS · Aligné neurosciences · Conçu à la Réunion
            </p>
          </div>

          {/* Colonne droite : carte "pour qui ?" */}
          <div className="lg:justify-self-end">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl shadow-black/40 space-y-4">
              <h2 className="text-lg font-semibold text-slate-50">
                Une IA pour toute la communauté éducative
              </h2>
              <p className="text-sm text-slate-300">
                EleveAI soutient chacun dans son rôle, avec des outils simples, adaptés et pédagogiques.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <p className="font-semibold text-emerald-300">Élèves</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Explications pas à pas</li>
                    <li>• Révisions guidées</li>
                    <li>• Préparation aux oraux</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-emerald-300">Parents</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Comprendre les notions</li>
                    <li>• Aider sans faire à la place</li>
                    <li>• Organisation du travail</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-emerald-300">Profs</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Cours conformes Eduscol</li>
                    <li>• Adaptations DYS</li>
                    <li>• Activités clé en main</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-emerald-300">Administration</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Notes internes</li>
                    <li>• Courriers officiels</li>
                    <li>• Projets & réunions</li>
                  </ul>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                Objectif : rendre l'école plus fluide, plus claire et plus humaine, pour tous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION RAPIDE : LIENS ESPACES */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Choisissez votre espace EleveAI
        </h2>

        <div className="grid gap-4 md:grid-cols-4">
          <Link
            href="/espace-eleves"
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-400 hover:-translate-y-0.5 transition"
          >
            <p className="text-sm font-semibold text-emerald-300">Espace élèves</p>
            <p className="mt-1 text-xs text-slate-300">Comprendre, réviser, progresser.</p>
          </Link>

          <Link
            href="/espace-profs"
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-400 hover:-translate-y-0.5 transition"
          >
            <p className="text-sm font-semibold text-emerald-300">Espace profs</p>
            <p className="mt-1 text-xs text-slate-300">Cours, activités, évaluations Eduscol.</p>
          </Link>

          <Link
            href="/espace-administration"
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-400 hover:-translate-y-0.5 transition"
          >
            <p className="text-sm font-semibold text-emerald-300">Administratif</p>
            <p className="mt-1 text-xs text-slate-300">Textes officiels, notes, synthèses.</p>
          </Link>

          <Link
            href="/parents"
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-400 hover:-translate-y-0.5 transition"
          >
            <p className="text-sm font-semibold text-emerald-300">Parents & communauté</p>
            <p className="mt-1 text-xs text-slate-300">Accompagner son enfant avec l’IA.</p>
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
              Je suis enseignant de mathématiques à La Réunion, passionné de pédagogie, 
              de nature, de création et de transmission.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              Je conçois EleveAI pour rendre l’école plus claire, plus humaine et plus efficace,
              avec des outils sérieux, alignés sur Eduscol, les neurosciences, et la réalité des élèves 
              d’aujourd’hui — à La Réunion comme ailleurs.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              Je conçois, je prototype, j’enseigne, j’inspire.  
              Et j’aide les jeunes à utiliser l’IA non pas pour tricher…  
              mais pour <strong>comprendre, créer et grandir</strong>.
            </p>

            <p className="mt-3 text-sm font-medium text-emerald-300">
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







