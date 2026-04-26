"use client";

const competences = [
  { nom: "Décimaux", niveau: "Bien avancé", couleur: "bg-green-500", etoiles: "⭐⭐⭐" },
  { nom: "Fractions", niveau: "En progression", couleur: "bg-yellow-500", etoiles: "⭐⭐" },
  { nom: "Proportionnalité", niveau: "À renforcer", couleur: "bg-red-500", etoiles: "⭐" },
  { nom: "Aires et périmètres", niveau: "Bientôt", couleur: "bg-slate-500", etoiles: "🔒" },
];

export default function ParcoursClient() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-violet-500/30 bg-slate-900/80 p-8 shadow-xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-300">
            Bientôt disponible
          </p>

          <h1 className="mb-4 text-4xl font-bold text-violet-300">
            Parcours EleveAI
          </h1>

          <p className="mb-6 max-w-3xl text-lg text-slate-200">
            Le parcours permettra à chaque élève de suivre sa progression grâce
            à une grande matrice de compétences, comme dans les tests nationaux.
          </p>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {competences.map((competence) => (
              <div
                key={competence.nom}
                className="rounded-2xl border border-white/10 bg-slate-800 p-5"
              >
                <div
                  className={`mb-4 h-3 w-16 rounded-full ${competence.couleur}`}
                />
                <h2 className="text-lg font-semibold">{competence.nom}</h2>
                <p className="mt-2 text-sm text-slate-300">
                  {competence.niveau}
                </p>
                <p className="mt-3 text-xl">{competence.etoiles}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-violet-950/50 p-5 text-slate-100">
            <h2 className="mb-2 text-xl font-semibold text-violet-200">
              Objectif du parcours
            </h2>
            <p>
              Identifier les points forts, repérer les compétences à renforcer,
              proposer des défis adaptés et garder une trace des progrès.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}