// La liste d'une famille — /fiches-ecriture/lettres
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FAMILLES, famille, fichesDe } from "@/lib/fiches-ecriture/registre";

export function generateStaticParams() {
  return FAMILLES.filter((f) => f.ouverte).map((f) => ({ famille: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ famille: string }>;
}): Promise<Metadata> {
  const { famille: slug } = await params;
  const f = famille(slug);
  if (!f) return {};
  return {
    title: `${f.titre} — fiches à imprimer CP | EleveAI`,
    description: `${f.promesse} Des fiches d'écriture à imprimer, avec la vidéo du geste pour chaque tracé.`,
    alternates: { canonical: `https://www.eleveai.fr/fiches-ecriture/${f.slug}` },
  };
}

export default async function PageFamille({
  params,
}: {
  params: Promise<{ famille: string }>;
}) {
  const { famille: slug } = await params;
  const f = famille(slug);
  // ⛔ Une famille déclarée mais NON OUVERTE rend un 404, elle ne rend pas une
  // grille vide : une page qui ne montre rien est pire qu'une page absente.
  if (!f || !f.ouverte) notFound();

  const fiches = fichesDe(slug);

  return (
    // ⛔ FOND CLAIR EXPLICITE : le gabarit du site est sombre (voir le hub).
    <main className="min-h-screen bg-[#f2fbff] text-slate-800">
      <section className="border-b border-slate-200 bg-gradient-to-br from-sky-400 via-cyan-400 to-teal-400 text-white">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
          <Link href="/fiches-ecriture" className="text-sm font-bold text-white/80 hover:text-white">
            ← Toutes les fiches d&apos;écriture
          </Link>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            {f.titre}
          </h1>
          <p className="mt-3 max-w-2xl text-base font-semibold text-white/90 sm:text-lg">
            {f.promesse}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      {/* ⭐ UNE GRILLE DE LETTRES, PAS UNE LISTE DE TITRES. À cet âge, l'enfant
          reconnaît la lettre avant de lire son nom — et c'est lui qui clique. */}
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-6">
        {fiches.map((fi) => (
          <Link
            key={fi.slug}
            href={`/fiches-ecriture/${f.slug}/${fi.slug}`}
            className="flex aspect-square items-center justify-center rounded-2xl border-2 border-slate-200 bg-white text-5xl font-black text-slate-900 transition hover:border-sky-500 hover:bg-sky-50"
          >
            {fi.slug}
          </Link>
        ))}
      </div>

      {/* ⚠️ On DIT combien il en reste. Trois lettres sur vingt-six, un visiteur
          le voit tout de suite ; le lui cacher ferait croire à un site à
          l'abandon plutôt qu'à un chantier en cours. */}
        <p className="mt-8 text-sm text-slate-500">
          {fiches.length} lettre{fiches.length > 1 ? "s" : ""} sur 26 — les
          suivantes arrivent une par une.
        </p>
      </div>
    </main>
  );
}
