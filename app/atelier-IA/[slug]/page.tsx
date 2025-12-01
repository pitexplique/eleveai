// app/atelier-IA/[slug]/page.tsx

import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  getAllAtelierIaPosts,
  getAtelierIaPostBySlug,
  type AtelierIaPost,
} from "@/data/atelierIaPosts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllAtelierIaPosts().map((atelier) => ({ slug: atelier.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const atelier = getAtelierIaPostBySlug(slug);
  if (!atelier) return {};

  return {
    title: `${atelier.title} | Ateliers IA`,
    description: atelier.description,
  };
}

export default async function AtelierIaPage({ params }: PageProps) {
  const { slug } = await params;

  const atelier = getAtelierIaPostBySlug(slug);
  if (!atelier) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {/* Fil d’Ariane */}
      <div className="text-sm text-slate-500 mb-4">
        <a href="/atelier-IA" className="hover:underline">
          Ateliers IA
        </a>{" "}
        / <span className="text-slate-700">{atelier.title}</span>
      </div>

      <h1 className="text-3xl font-bold mb-3">{atelier.title}</h1>

      <p className="text-xs text-slate-500 mb-2">
        Collège • Niveau {atelier.niveau}
        {atelier.lieu ? ` • ${atelier.lieu}` : ""}
      </p>

      <p className="text-sm text-slate-600 mb-6 italic">
        Parcours conçu pour être à la fois{" "}
        <strong>sécurisé, motivant et conforme aux programmes</strong>, avec
        des séances actives, des temps de débat, et une progression en 3 temps :
        découvrir, utiliser, questionner l’IA.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {atelier.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Intro de l’atelier */}
      <article className="prose prose-slate max-w-none prose-h1:text-2xl prose-h2:text-xl prose-p:leading-relaxed mb-10">
        <ReactMarkdown>{atelier.content}</ReactMarkdown>
      </article>

      {/* Les 3 séances */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Les 3 séances</h2>

        <div className="space-y-6">
          {atelier.seances.map((seance) => (
            <article
              key={seance.numero}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-1">
                {seance.titre}
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Séance {seance.numero} • Durée : {seance.duree}
              </p>

              <h4 className="text-sm font-semibold text-slate-700 mb-1">
                Objectifs pédagogiques
              </h4>
              <ul className="list-disc list-inside text-sm text-slate-700 mb-3">
                {seance.objectifs.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>

              <div className="prose prose-slate max-w-none prose-p:leading-relaxed">
                <ReactMarkdown>{seance.contenu}</ReactMarkdown>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

