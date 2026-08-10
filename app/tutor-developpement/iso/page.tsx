// app/tutor-developpement/iso/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture du tuteur IA — Gouvernance inspirée ISO/IEC 42001",
  description:
    "EleveAI développe un tuteur pédagogique adaptatif basé sur un graphe de compétences, une matrice pédagogique et un moteur déterministe. Démarche inspirée ISO/IEC 42001.",
};

export default function TutorDeveloppementIsoPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-900 ring-1 ring-sky-100">
          🧭 EleveAI — Architecture du tuteur pédagogique
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Développement d’un tuteur IA pédagogique responsable
        </h1>

        <p className="mt-4 text-slate-700 leading-7">
          EleveAI développe un <strong>tuteur pédagogique adaptatif</strong> destiné à accompagner
          les élèves dans leur progression. Le système est conçu pour rester
          <strong> explicable, contrôlable et améliorable</strong>.
        </p>

        <p className="mt-3 text-slate-700 leading-7">
          L’architecture du tutor s’inspire des principes de la norme
          <strong> ISO/IEC 42001</strong> : gestion des risques, supervision humaine,
          traçabilité des décisions et amélioration continue.
        </p>

        <div className="mt-10 space-y-10">

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Principes de conception
            </h2>

            <p className="mt-3 text-slate-700 leading-7">
              Le tutor EleveAI repose sur plusieurs principes fondamentaux :
            </p>

            <ul className="mt-4 list-disc pl-5 space-y-2 text-slate-700">
              <li>
                séparation entre <strong>données pédagogiques</strong> et
                <strong> moteur décisionnel</strong>
              </li>

              <li>
                progression basée sur des <strong>micro-compétences</strong>
              </li>

              <li>
                décisions prises par un <strong>moteur déterministe explicable</strong>
              </li>

              <li>
                possibilité de <strong>retour automatique vers les prérequis</strong>
              </li>

              <li>
                système conçu pour être <strong>testable et auditable</strong>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Architecture du tuteur
            </h2>

            <p className="mt-3 text-slate-700 leading-7">
              Le tutor fonctionne comme une chaîne de décision pédagogique.
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">

              <pre className="text-sm text-slate-800 whitespace-pre-wrap">
{`
Base de connaissances
(notions + micro-compétences)
            ↓
Graphe de compétences
(prérequis pédagogiques)
            ↓
Matrice pédagogique
(force des relations entre compétences)
            ↓
Banque de questions
(questions + templates)
            ↓
Tutor Engine
 - évalue la réponse
 - met à jour la maîtrise
 - sélectionne la prochaine question
            ↓
Élève
            ↓
Nouvelle interaction
`}
              </pre>

            </div>

            <p className="mt-4 text-slate-700 leading-7">
              Cette architecture permet de maintenir un système
              <strong> transparent</strong> et <strong>robuste</strong>.
            </p>

          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

            <h2 className="text-xl font-bold text-slate-900">
              Exemple simplifié de matrice pédagogique
            </h2>

            <p className="mt-3 text-slate-700 leading-7">
              Une matrice permet de représenter les dépendances entre compétences.
            </p>

            <div className="mt-5 rounded-xl bg-white p-4 ring-1 ring-slate-200">

              <pre className="text-sm text-slate-800 whitespace-pre-wrap">
{`
                   dec_cmp   frac_cmp   frac_qty   prop_unit
decimal_compare        0        -2         0         0
fraction_compare      +2         0         0         0
fraction_quantity      0        +2         0        -2
prop_unit              0         0        +2         0
`}
              </pre>

              <p className="mt-3 text-sm text-slate-600">
                Valeur positive → retour vers un prérequis
              </p>

              <p className="text-sm text-slate-600">
                Valeur négative → progression vers une compétence plus avancée
              </p>

            </div>

          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">

            <h2 className="text-xl font-bold text-slate-900">
              Modes pédagogiques du tuteur
            </h2>

            <div className="mt-5 grid sm:grid-cols-2 gap-4">

              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="font-semibold text-sm text-slate-900">
                  Mode évaluation
                </p>

                <p className="mt-2 text-sm text-slate-700">
                  Le tutor mesure la maîtrise d’une micro-compétence
                  en proposant des questions ciblées.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="font-semibold text-sm text-slate-900">
                  Mode coaching
                </p>

                <p className="mt-2 text-sm text-slate-700">
                  Après plusieurs erreurs, le moteur revient vers
                  une compétence parent et simplifie la tâche.
                </p>
              </div>

            </div>

          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

            <h2 className="text-xl font-bold text-slate-900">
              Gestion des risques IA
            </h2>

            <p className="mt-3 text-slate-700 leading-7">
              Plusieurs garde-fous sont intégrés dans la conception.
            </p>

            <ul className="mt-4 list-disc pl-5 space-y-2 text-slate-700">

              <li>supervision humaine dans la conception pédagogique</li>

              <li>contrôle des réponses générées par IA</li>

              <li>blocage des solutions données trop directement</li>

              <li>traçabilité des décisions importantes</li>

              <li>amélioration continue du système</li>

            </ul>

          </section>

          <footer className="pt-4 text-sm text-slate-500">
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