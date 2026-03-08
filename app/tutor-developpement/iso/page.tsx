// app/tutor-developpement/iso/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Développement du tuteur IA — Gouvernance inspirée ISO/IEC 42001 | EleveAI",
  description:
    "EleveAI développe un tuteur pédagogique adaptatif avec moteur déterministe, graphe de compétences et contrôle humain. Démarche inspirée ISO/IEC 42001.",
};

export default function TutorDeveloppementIsoPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-900 ring-1 ring-sky-100">
          🧭 EleveAI — Développement du tuteur IA
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Comment EleveAI développe un tuteur IA pédagogique responsable
        </h1>

        <p className="mt-4 text-slate-700 leading-7">
          EleveAI développe actuellement un <strong>tuteur pédagogique adaptatif</strong> destiné à
          accompagner les élèves dans leur progression. Le système est conçu pour rester{" "}
          <strong>explicable, contrôlable et améliorable</strong>.
        </p>

        <p className="mt-3 text-slate-700 leading-7">
          La démarche s&apos;inspire des principes de la norme <strong>ISO/IEC 42001</strong> :
          gestion des risques, supervision humaine, traçabilité et amélioration continue.
        </p>

        <div className="mt-10 space-y-10">
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">Architecture actuelle du tuteur</h2>

            <p className="mt-3 text-slate-700 leading-7">
              Le tuteur EleveAI repose aujourd&apos;hui sur plusieurs blocs simples et explicables :
              une base de compétences, une banque de questions, un moteur de décision et des
              garde-fous.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
              <li>
                <strong>Knowledge</strong> : notions, micro-compétences, liens avec le programme.
              </li>
              <li>
                <strong>Question bank</strong> : questions fixes + templates générés.
              </li>
              <li>
                <strong>Matrice / graphe</strong> : relations entre prérequis et compétences cibles.
              </li>
              <li>
                <strong>Moteur déterministe</strong> : choix de la prochaine question selon les
                réponses de l&apos;élève.
              </li>
              <li>
                <strong>Audit</strong> : journalisation des décisions importantes du moteur.
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Schéma visuel du fonctionnement actuel
            </h2>

            <p className="mt-3 text-slate-700 leading-7">
              Voici une représentation simplifiée de l&apos;architecture du tuteur telle
              qu&apos;elle fonctionne aujourd&apos;hui.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="grid gap-4 md:grid-cols-3">
                <SchemaCard
                  title="1. Base pédagogique"
                  color="sky"
                  items={[
                    "Notions",
                    "Micro-compétences",
                    "Programme",
                    "Prérequis",
                  ]}
                />

                <SchemaCard
                  title="2. Banque d’exercices"
                  color="emerald"
                  items={[
                    "Questions fixes",
                    "Templates",
                    "Indices",
                    "Formats adaptés",
                  ]}
                />

                <SchemaCard
                  title="3. Moteur de tutorat"
                  color="amber"
                  items={[
                    "Évalue la réponse",
                    "Met à jour la maîtrise",
                    "Choisit la suite",
                    "Passe en coaching si besoin",
                  ]}
                />
              </div>

              <div className="my-5 flex justify-center text-2xl text-slate-400">↓</div>

              <div className="grid gap-4 md:grid-cols-3">
                <SchemaCard
                  title="4. Modes pédagogiques"
                  color="violet"
                  items={[
                    "Évaluation",
                    "Coaching",
                    "Retour au prérequis",
                    "Progression graduelle",
                  ]}
                />

                <SchemaCard
                  title="5. Garde-fous"
                  color="rose"
                  items={[
                    "Pas de solution trop directe",
                    "Masquage données perso",
                    "Décisions explicables",
                    "Contrôles internes",
                  ]}
                />

                <SchemaCard
                  title="6. Amélioration continue"
                  color="slate"
                  items={[
                    "Tests",
                    "Corrections",
                    "Ajustement des liens",
                    "Enrichissement de la banque",
                  ]}
                />
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-900">
                Lecture simplifiée du parcours
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <strong>Réponse élève</strong> → <strong>évaluation</strong> →{" "}
                <strong>mise à jour de la maîtrise</strong> →{" "}
                <strong>choix de la prochaine micro-compétence</strong> →{" "}
                <strong>question suivante</strong>.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">Un tutorat adaptatif</h2>

            <p className="mt-3 text-slate-700 leading-7">
              Le tuteur adapte automatiquement les exercices proposés en fonction des réponses de
              l&apos;élève.
            </p>

            <div className="mt-5 rounded-xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-900">Fonctionnement simplifié</p>

              <ol className="mt-3 list-decimal pl-5 space-y-2 text-sm text-slate-700">
                <li>L’élève répond à une question.</li>
                <li>Le moteur évalue la réponse.</li>
                <li>Le score de maîtrise est mis à jour.</li>
                <li>Le tuteur choisit la prochaine étape la plus pertinente.</li>
              </ol>
            </div>

            <p className="mt-4 text-slate-700 leading-7">
              L’objectif n’est pas seulement de corriger une réponse, mais d’identifier{" "}
              <strong>où se situe réellement la difficulté</strong>.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold text-slate-900">Mode évaluation et mode coaching</h2>

            <p className="mt-3 text-slate-700 leading-7">
              Le tuteur fonctionne actuellement selon deux modes pédagogiques complémentaires.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-900">Mode évaluation</p>
                <p className="mt-2 text-sm text-slate-700">
                  L’élève répond à des questions qui permettent d’évaluer sa maîtrise réelle d’une
                  micro-compétence.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-900">Mode coaching</p>
                <p className="mt-2 text-sm text-slate-700">
                  Après plusieurs erreurs, le moteur revient vers un prérequis plus simple,
                  affiche un indice et cherche à reconstruire la compréhension.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Gestion des risques liés à l&apos;IA
            </h2>

            <p className="mt-3 text-slate-700 leading-7">
              La conception actuelle intègre déjà plusieurs garde-fous inspirés d&apos;une logique
              ISO/IEC 42001.
            </p>

            <ul className="mt-4 list-disc pl-5 space-y-2 text-slate-700">
              <li>Supervision humaine dans la conception pédagogique.</li>
              <li>Blocage des formulations donnant directement la solution finale.</li>
              <li>Filtrage de certaines données personnelles dans les messages.</li>
              <li>Traçabilité interne des décisions du moteur.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold text-slate-900">Développement progressif</h2>

            <p className="mt-3 text-slate-700 leading-7">
              Le tuteur est développé par itérations courtes afin de garantir sa robustesse
              pédagogique et technique.
            </p>

            <ol className="mt-4 list-decimal pl-5 space-y-2 text-slate-700">
              <li>Modélisation des compétences.</li>
              <li>Création de la banque d’exercices.</li>
              <li>Développement du moteur adaptatif.</li>
              <li>Tests de scénarios élèves.</li>
              <li>Amélioration continue.</li>
            </ol>
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

function SchemaCard({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: "sky" | "emerald" | "amber" | "violet" | "rose" | "slate";
}) {
  const styles = {
    sky: "bg-sky-50 ring-sky-200",
    emerald: "bg-emerald-50 ring-emerald-200",
    amber: "bg-amber-50 ring-amber-200",
    violet: "bg-violet-50 ring-violet-200",
    rose: "bg-rose-50 ring-rose-200",
    slate: "bg-slate-100 ring-slate-300",
  };

  return (
    <div className={`rounded-xl p-4 ring-1 ${styles[color]}`}>
      <p className="text-sm font-bold text-slate-900">{title}</p>
      <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}