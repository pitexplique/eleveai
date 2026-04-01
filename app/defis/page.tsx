// app/defis/page.tsx
// 🔹 Page qui affiche TOUS les défis

import { getAllDefis } from "@/lib/defis/helpers";
import DefiDuJourCard from "@/components/defis/DefiDuJourCard";

export default function DefisPage() {
  const defis = getAllDefis();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-y border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-600">
              Répertoire
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Défis IA
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Une collection de questions courtes pour réfléchir à l’utilité de
              l’IA, à ses limites et à ses usages.
            </p>
          </div>

          {/* Liste des défis */}
          <div className="mt-10 space-y-8">
            {defis.map((defi) => (
              <div
                key={defi.id}
                className="rounded-3xl border border-indigo-100 bg-white p-2 shadow-sm"
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