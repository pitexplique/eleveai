// app/atelier-IA/page.tsx

import Link from "next/link";
import {
  getAllAtelierIaPosts,
  type AtelierIaPost,
} from "@/data/atelierIaPosts";

export default function AtelierIaListPage() {
  const ateliers = getAllAtelierIaPosts();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      
      <h1 className="text-3xl font-bold mb-2">Ateliers IA au collège</h1>

      <p className="text-slate-700 mb-2">
        Des ateliers pédagogiques pour aider les élèves à{" "}
        <strong>comprendre, utiliser et questionner l’intelligence artificielle</strong>,
        dans un cadre sécurisé et bienveillant.
      </p>
      <p className="text-sm text-blue-700 font-semibold mb-8">
        Ces ateliers respectent les recommandations institutionnelles (Eduscol,
        EMI, usage responsable de l’IA) et s’appuient sur les neurosciences de
        l’apprentissage (activité, oral, répétition espacée, débat).
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {ateliers.map((atelier) => (
          <article
            key={atelier.slug}
            className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-2">
                {atelier.title}
              </h2>

              <p className="text-xs text-slate-500 mb-2">
                Collège • Niveau {atelier.niveau}
                {atelier.lieu ? ` • ${atelier.lieu}` : ""}
              </p>

              <p className="text-sm text-slate-700 mb-4">
                {atelier.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {atelier.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/atelier-IA/${atelier.slug}`}
                className="inline-flex items-center text-sm font-semibold text-blue-600 hover:underline"
              >
                Voir le détail des 3 séances →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

