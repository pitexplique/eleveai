// app/atelier-IA/[slug]/page.tsx

import { notFound } from "next/navigation";
import {
  getAtelierIaPostBySlug,
  type AtelierIaPost,
} from "@/data/atelierIaPosts";

export default function AtelierIaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const atelier = getAtelierIaPostBySlug(params.slug);

  if (!atelier) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 relative">
      {/* Titre */}
      <h1 className="text-3xl font-bold mb-3">{atelier.title}</h1>

      {/* Métadonnées */}
      <p className="text-sm text-slate-600 mb-6">
        Collège • Niveau {atelier.niveau}
        {atelier.lieu ? ` • ${atelier.lieu}` : ""}
        {atelier.date ? ` • ${atelier.date}` : ""}
      </p>

      {/* Bloc création */}
      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-blue-900 shadow-sm">
        <h2 className="font-semibold mb-2 text-lg">🎄 Ce que les élèves vont créer</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>✈️ un avion en papier (avec étapes proposées par l’IA)</li>
          <li>🧸 un dessin d’objet créé étape par étape</li>
          <li>🎄 une affiche de Noël (slogan + mise en page + couleurs)</li>
        </ul>
        <p className="mt-2 text-sm">
          Chaque élève choisit <strong>sa façon d’apprendre</strong> : lire,
          observer, demander des explications supplémentaires, ou simplifier les
          consignes. Le travail se fait en petits groupes avec une vraie
          autonomie.
        </p>
      </div>

      {/* Introduction */}
      <article
        className="prose prose-blue max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: atelier.content }}
      />

      {/* Séances */}
      <section className="space-y-8">
        {atelier.seances.map((s) => (
          <article
            key={s.numero}
            className="rounded-xl border border-slate-200 bg-white/90 p-5 shadow"
          >
            <h2 className="text-xl font-semibold mb-1">
              {s.titre}
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Durée : {s.duree}
            </p>

            <h3 className="text-sm font-semibold mb-2">Objectifs pédagogiques</h3>
            <ul className="list-disc list-inside text-sm mb-4">
              {s.objectifs.map((o, index) => (
                <li key={index}>{o}</li>
              ))}
            </ul>

            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: s.contenu }}
            />
          </article>
        ))}
      </section>

      {/* Bouton retour */}
      <div className="mt-10">
        <a
          href="/atelier-IA"
          className="text-blue-700 font-semibold hover:underline"
        >
          ← Retour aux ateliers
        </a>
      </div>
    </main>
  );
}


