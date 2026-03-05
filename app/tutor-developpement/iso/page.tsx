// app/tutor-developpement/iso/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Développement du tuteur IA — Gouvernance ISO/IEC 42001 | EleveAI",
  description:
    "Comment EleveAI développe un tuteur pédagogique IA de manière responsable, avec traçabilité, gestion des risques et contrôle humain (inspiré ISO/IEC 42001).",
};

export default function TutorDeveloppementIsoPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Bandeau */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-900 ring-1 ring-sky-100">
          <span aria-hidden>🧭</span>
          <span>EleveAI — Développement du tuteur IA (gouvernance inspirée ISO/IEC 42001)</span>
        </div>

        {/* Titre */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Développer un tuteur IA de manière responsable
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-700">
          EleveAI développe un tuteur pédagogique adaptatif pour aider les élèves à progresser
          étape par étape. Cette page documente notre démarche de conception et de contrôle, inspirée
          par les principes de la norme ISO/IEC 42001 (gouvernance des systèmes d’IA).
        </p>

        {/* Sections */}
        <div className="mt-10 space-y-10">
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">Un tuteur sous contrôle humain</h2>
            <p className="mt-3 text-slate-700 leading-7">
              EleveAI ne cherche pas à “remplacer” l’enseignant. Le tuteur est conçu comme un outil
              d’entraînement et de progression, qui respecte le cadre scolaire.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
              <li>
                Les décisions pédagogiques (niveau, difficulté, retour aux prérequis) sont prises par
                un <strong>moteur déterministe</strong> (code explicable).
              </li>
              <li>
                L’IA sert surtout à <strong>formuler</strong>, <strong>reformuler</strong> et{" "}
                <strong>encourager</strong>, sans décider du parcours.
              </li>
              <li>
                L’objectif : un système utile, rassurant, et améliorable par itérations.
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold text-slate-900">Un graphe de notions basé sur le programme</h2>
            <p className="mt-3 text-slate-700 leading-7">
              En mathématiques, les erreurs viennent souvent d’un prérequis non maîtrisé. Le tuteur
              s’appuie donc sur un <strong>graphe de notions</strong> (prérequis → notion cible).
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-900">Exemple (simplifié)</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-white p-3 ring-1 ring-slate-200">
                  <p className="text-sm font-semibold text-slate-900">Fractions</p>
                  <p className="text-sm text-slate-600">Notion de base</p>
                </div>
                <div className="hidden sm:flex items-center justify-center text-slate-500">→</div>
                <div className="rounded-lg bg-white p-3 ring-1 ring-slate-200">
                  <p className="text-sm font-semibold text-slate-900">Proportionnalité</p>
                  <p className="text-sm text-slate-600">Notion qui dépend des fractions</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Si un élève bloque sur la proportionnalité, le tuteur peut vérifier et consolider
                d’abord les fractions.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">Les risques IA et nos garde-fous</h2>
            <p className="mt-3 text-slate-700 leading-7">
              Une démarche inspirée ISO/IEC 42001 commence par identifier des risques, puis par
              mettre en place des contrôles concrets.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-900">Risque : donner la solution trop vite</p>
                <p className="mt-2 text-sm text-slate-700">
                  En mode “évaluation”, le système bloque les formulations qui livrent directement
                  la réponse finale et propose une relance guidée.
                </p>
              </div>

              <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-900">Risque : données personnelles</p>
                <p className="mt-2 text-sm text-slate-700">
                  Les emails et numéros de téléphone sont automatiquement masqués dans les messages
                  pour réduire les risques d’exposition.
                </p>
              </div>

              <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-900">Risque : niveau inadapté</p>
                <p className="mt-2 text-sm text-slate-700">
                  Après plusieurs erreurs, le tuteur baisse la difficulté et peut revenir à un
                  prérequis “fort” dans le graphe.
                </p>
              </div>

              <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-900">Risque : frustration</p>
                <p className="mt-2 text-sm text-slate-700">
                  Le tuteur adapte le format (ex. QCM pour DYS) et cherche à terminer sur une étape
                  réussie, pour préserver la confiance.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold text-slate-900">Traçabilité et amélioration continue</h2>
            <p className="mt-3 text-slate-700 leading-7">
              Chaque tour de dialogue peut être journalisé en interne : question, réponse, évaluation,
              décision du moteur (difficulté / notion / mode) et garde-fous activés.
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-900">Cycle de développement</p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Analyse pédagogique (besoin réel + risques)</li>
                <li>Spécification (règles, données, tests)</li>
                <li>Implémentation (branche + revue)</li>
                <li>Tests (scénarios élèves, robustesse)</li>
                <li>Amélioration continue (petites itérations contrôlées)</li>
              </ol>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">Pourquoi cette page existe</h2>
            <p className="mt-3 text-slate-700 leading-7">
              EleveAI documente publiquement sa démarche pour être transparent sur le fonctionnement
              du tuteur et montrer comment on peut développer une IA utile avec rigueur.
            </p>
            <p className="mt-3 text-slate-700 leading-7">
              C’est aussi un exemple réutilisable en entreprise : construire un tuteur interne
              (procédures, sécurité, qualité) demande la même méthode — référentiel clair, moteur
              explicable, contrôles, traçabilité.
            </p>
          </section>

          <footer className="pt-2 text-sm text-slate-500">
            Dernière mise à jour :{" "}
            <span className="font-medium text-slate-700">
              {new Date().toLocaleDateString("fr-FR")}
            </span>
          </footer>
        </div>
      </div>
    </main>
  );
}