// app/atelier-IA/[slug]/page.tsx

import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
// en haut du fichier (si pas déjà fait)
import Link from "next/link";

import {
  getAllAtelierIaPosts,
  getAtelierIaPostBySlug,
  type AtelierIaPost,
} from "@/data/atelierIaPosts";

type PageProps = {
  // comme pour le blog : params est une Promise
  params: Promise<{ slug: string }>;
};

function formatMeta(atelier: AtelierIaPost) {
  const parts: string[] = [];

  parts.push("Collège");
  if (atelier.niveau) parts.push(`Niveau ${atelier.niveau}`);
  if (atelier.lieu) parts.push(atelier.lieu);
  if (atelier.date) {
    const d = new Date(atelier.date);
    parts.push(
      d.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    );
  }

  return parts.join(" • ");
}

// génération statique des slugs (comme pour le blog)
export function generateStaticParams() {
  return getAllAtelierIaPosts().map((atelier) => ({ slug: atelier.slug }));
}

// metadata dynamique (même logique que le blog)
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const atelier = getAtelierIaPostBySlug(slug);

  if (!atelier) return {};

  return {
    title: `${atelier.title} | Ateliers IA`,
    description: atelier.description,
  };
}

// page détail atelier IA
export default async function AtelierIaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const atelier = getAtelierIaPostBySlug(slug);

  if (!atelier) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
       {/* Fil d’Ariane */}
        <div className="text-sm text-slate-500 mb-4">
          <Link href="/atelier-IA" className="hover:underline">
            Ateliers IA
          </Link>{" "}
          / <span className="text-slate-700">{atelier.title}</span>
        </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-3">{atelier.title}</h1>

      {/* Métadonnées */}
      <p className="text-xs text-slate-500 mb-4">
        {formatMeta(atelier)}
      </p>

      <p className="text-sm text-slate-600 mb-6 italic">
        Chaque atelier est conçu pour être à la fois{" "}
        <strong>concret pour les élèves</strong> (création, travail en groupe,
        autonomie) et <strong>lisible pour l’IA</strong> (structure claire,
        objectifs explicites), en cohérence avec Eduscol et les neurosciences
        de l’apprentissage.
      </p>

      {/* Tags */}
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

      {/* Bloc "ce que les élèves vont créer" */}
      <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50/80 px-4 py-3 text-blue-900">
        <h2 className="font-semibold mb-2 text-lg">
          🎄 Ce que les élèves vont créer concrètement
        </h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>✈️ un avion en papier (guidé par un pas-à-pas donné par l’IA)</li>
          <li>🧸 un dessin d’objet construit étape par étape</li>
          <li>🎄 une affiche de Noël pour le collège (slogan, couleurs, mise en page)</li>
        </ul>
        <p className="mt-2 text-sm">
          Chaque élève choisit <strong>son projet</strong> et{" "}
          <strong>sa façon d’apprendre</strong> : lire des étapes, demander des
          exemples supplémentaires, simplifier les consignes, ou passer par le
          dessin. Le travail se fait en petits groupes avec une vraie autonomie.
        </p>
      </div>

      {/* Introduction de l’atelier (markdown) */}
      <article className="prose prose-slate max-w-none mb-10 prose-h1:text-2xl prose-h2:text-xl prose-p:leading-relaxed">
        <ReactMarkdown>{atelier.content}</ReactMarkdown>
      </article>

      {/* Séances détaillées */}
      <section className="space-y-8">
        {atelier.seances.map((seance) => (
          <article
            key={seance.numero}
            className="rounded-xl border border-slate-200 bg-white shadow-sm px-4 py-4"
          >
            <h2 className="text-xl font-semibold mb-1">
              {seance.titre}
            </h2>
            <p className="text-xs text-slate-500 mb-3">
              Durée : {seance.duree}
            </p>

            <h3 className="text-sm font-semibold mb-1">
              Objectifs pédagogiques
            </h3>
            <ul className="list-disc list-inside text-sm mb-3">
              {seance.objectifs.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>

            <article className="prose prose-sm prose-slate max-w-none">
              <ReactMarkdown>{seance.contenu}</ReactMarkdown>
            </article>
          </article>
        ))}
      </section>

      {/* Retour */}
      <div className="mt-10">
        <Link 
          href="/atelier-IA"
          className="text-blue-700 text-sm font-semibold hover:underline"
        >
          ← Retour aux ateliers IA
        </Link >
      </div>
    </main>
  );
}

