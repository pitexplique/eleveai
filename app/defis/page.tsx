// app/defis/page.tsx

import { getAllDefis } from "@/lib/defis/helpers";
import DefiDuJourCard from "@/components/defis/DefiDuJourCard";

export default function DefisPage() {
  const defis = getAllDefis();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-y border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16">

          {/* En-tête */}
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-indigo-600">
              Répertoire
            </p>

            <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              Défis IA
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-700 sm:text-xl">
              Des questions pour réfléchir, vérifier, comprendre…
              <br />
              et ne jamais laisser l’IA penser à ta place.
            </p>
          </div>

          {/* Liste des défis */}
          <div className="mt-14 space-y-10">
            {defis.map((defi) => (
              <div
                key={defi.id}
                className="rounded-3xl border border-indigo-100 bg-white p-4 shadow-md"
              >
                <DefiDuJourCard defi={defi} />
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}