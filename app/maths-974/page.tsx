export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Sparkles, ArrowRight } from "lucide-react";
import { fetchUsages974, type Usage974 } from "@/lib/server/maths974";

export const metadata: Metadata = {
  title: "Maths Réel · 974 | EleveAI",
  description:
    "Un carnet de bord réel de La Réunion : sur le terrain, une vraie photo, une vraie situation, et la notion de maths qui se cache derrière. À chaque étape, un mini-défi à résoudre.",
  alternates: { canonical: "/maths-974" },
  openGraph: {
    title: "Maths Réel · 974",
    description:
      "À quoi servent les maths ? La preuve par La Réunion : volcan, marché, randonnée, lagon… de vraies photos et les vraies maths derrière.",
    url: "/maths-974",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

function Carte({ u }: { u: Usage974 }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      {/* Média : photo et/ou vidéo YouTube */}
      {u.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={u.image_url} alt={u.lieu} className="aspect-video w-full object-cover" loading="lazy" />
      )}
      {u.youtube_id && (
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${u.youtube_id}`}
            title={u.titre}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-black text-cyan-700">
            <MapPin className="h-3.5 w-3.5" />
            {u.lieu}
          </span>
          {u.niveau && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{u.niveau}</span>
          )}
        </div>

        <h2 className="mt-3 text-xl font-black text-slate-900">{u.titre}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{u.situation}</p>

        {u.notion && (
          <p className="mt-3 text-sm">
            <span className="font-black text-slate-800">Les maths derrière&nbsp;: </span>
            <span className="text-emerald-700">{u.notion}</span>
          </p>
        )}

        {u.question && (
          <details className="group mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <summary className="cursor-pointer list-none font-bold text-amber-900 marker:hidden">
              🎯 Le défi&nbsp;: <span className="font-semibold">{u.question}</span>
              <span className="ml-1 text-xs text-amber-600 group-open:hidden"> — voir le corrigé</span>
            </summary>
            {u.reponse && (
              <p className="mt-3 border-t border-amber-200 pt-3 text-sm font-semibold text-amber-900">
                ✅ {u.reponse}
              </p>
            )}
          </details>
        )}

        {u.emerveillement && (
          <p className="mt-4 border-l-2 border-rose-300 pl-3 text-sm italic leading-6 text-rose-600">
            🌺 {u.emerveillement}
          </p>
        )}

        {u.coach_classe && (
          <Link
            href={`/coach-ia/maths?classe=${encodeURIComponent(u.coach_classe)}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-700 hover:text-cyan-900"
          >
            Je m&apos;entraîne sur cette notion
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
}

export default async function Maths974Page() {
  let usages: Usage974[] = [];
  try {
    usages = await fetchUsages974();
  } catch {
    usages = [];
  }

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700 text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Carnet de bord · La Réunion
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Maths Réel <span className="text-amber-300">· 974</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/90 sm:text-lg">
            «&nbsp;À quoi ça sert, les maths&nbsp;?» À regarder le monde et à
            s&apos;en émerveiller. Sur la route de l&apos;île — le volcan qui
            fabrique de la terre neuve, le lagon transparent, les sentiers de
            Mafate, les couleurs d&apos;un marché — il y a, derrière chaque
            instant, une beauté qu&apos;un chiffre éclaire sans jamais l&apos;éteindre.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {usages.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-5xl">🌋</p>
            <h2 className="mt-4 text-2xl font-black text-slate-900">Le carnet démarre bientôt</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Les premières captures arrivent au fil de la traversée de l&apos;île.
              Reviens vite&nbsp;: chaque étape ajoutera une nouvelle situation réelle.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {usages.map((u) => (
                <Carte key={u.id} u={u} />
              ))}
            </div>
            <p className="mt-10 text-center text-lg font-black italic text-teal-600">
              Regarde le monde avec des yeux qui s&apos;émerveillent — les maths,
              ensuite, viennent d&apos;elles-mêmes. 🌺
            </p>
          </>
        )}
      </section>
    </main>
  );
}
