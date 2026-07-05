import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowRight, Printer } from "lucide-react";
import { NIVEAUX, CYCLES, motsDeLaClasse, type CycleDico } from "@/lib/dico";

export const metadata: Metadata = {
  title: "Qui suis-je ? — Jeux de cartes à imprimer par classe (GS-CP → CM2)",
  description:
    "La collection de jeux de cartes « Qui suis-je ? » à imprimer gratuitement, un paquet par classe : GS-CP, CE1, CE2, CM1, CM2… On lit la définition (ou l'image), l'élève retrouve le mot. Toutes matières.",
  keywords: [
    "jeu qui suis-je à imprimer",
    "jeu de cartes à imprimer gratuit",
    "jeu de révision par classe",
    "cartes de révision à imprimer",
    "jeu éducatif à imprimer primaire",
    "EleveAI",
  ],
  alternates: { canonical: "/qui-suis-je-a-imprimer" },
  openGraph: {
    title: "Qui suis-je ? — Jeux de cartes à imprimer par classe — EleveAI",
    description:
      "Un jeu de cartes « Qui suis-je ? » par classe, à imprimer et jouer. La collection grandit chaque année.",
    url: "/qui-suis-je-a-imprimer",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

const TI_MARGO = "/cahier-vacances/ti-margo.png";

const EMOJI_MAT: Record<string, string> = {
  maths: "📐",
  francais: "✍️",
  sciences: "🔬",
  "histoire-geo": "🗺️",
  anglais: "🇬🇧",
  animaux: "🐾",
  couleurs: "🎨",
  nombres: "🔢",
};

type Deck = {
  slug: string;
  label: string;
  code: string;
  cycle: CycleDico;
  matieres: { slug: string; label: string }[];
  count: number;
  images: boolean;
};

function construireDecks(): Deck[] {
  return NIVEAUX.map((n) => {
    const mots = motsDeLaClasse(n.slug);
    if (mots.length === 0) return null;
    const matieres = [...new Map(mots.map((m) => [m.matiere, m.matiereLabel])).entries()].map(
      ([slug, label]) => ({ slug, label })
    );
    return {
      slug: n.slug,
      label: n.label,
      code: n.code,
      cycle: n.cycle,
      matieres,
      count: Math.min(30, mots.length),
      images: mots.some((m) => m.image),
    };
  }).filter((d): d is Deck => d !== null);
}

export default function QuiSuisJeHubPage() {
  const decks = construireDecks();

  return (
    <main className="min-h-screen bg-[#f8f6ff] text-slate-800">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-700 text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={TI_MARGO} alt="Ti Margo" className="h-20 w-20 object-contain" />
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Jeux de cartes à imprimer · gratuit
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Qui suis-je&nbsp;? 🃏
          </h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/90 sm:text-lg">
            Un paquet de cartes <strong>par classe</strong> à imprimer et découper. On lit la
            définition (ou on regarde l&apos;image pour les petits), l&apos;élève retrouve le mot.
            Chaque année, un nouveau paquet&nbsp;: la collection grandit&nbsp;! 🎴
          </p>
        </div>
      </section>

      {/* CTA coach : les cartes plaisent → le coach continue en ligne, gratuit */}
      <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-violet-300 bg-gradient-to-r from-violet-50 to-fuchsia-50 p-4 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm font-black text-slate-900 sm:text-base">
            🦎 Ces jeux plaisent à ton enfant&nbsp;? Son{" "}
            <span className="text-violet-700">coach IA</span> continue en ligne —{" "}
            <span className="text-violet-700">gratuit</span>, à son rythme et sans jugement.
          </p>
          <Link
            href="/explorer?from=cartes"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-400 hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            Commencer gratuitement →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {CYCLES.filter((c) => decks.some((d) => d.cycle === c.key)).map((cycle) => (
          <div key={cycle.key} className="mb-10">
            <h2 className="mb-4 text-lg font-black uppercase tracking-wide text-violet-700">
              {cycle.label}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {decks
                .filter((d) => d.cycle === cycle.key)
                .map((deck) => (
                  <Link
                    key={deck.slug}
                    href={`/qui-suis-je-a-imprimer/${deck.slug}`}
                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-200/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-lg bg-violet-100 px-2.5 py-1 text-sm font-black tabular-nums text-violet-700">
                        {deck.code}
                      </span>
                      {deck.images && (
                        <span className="rounded-full bg-fuchsia-50 px-2 py-0.5 text-[11px] font-black text-fuchsia-600">
                          🖼️ en images
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 text-2xl font-black text-slate-900">{deck.label}</h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {deck.matieres.map((m) => (
                        <span
                          key={m.slug}
                          className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200"
                        >
                          <span className="text-sm leading-none">{EMOJI_MAT[m.slug] ?? "•"}</span>
                          {m.label}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-400">
                        <Printer className="h-4 w-4" />
                        {deck.count} cartes
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-black text-violet-600">
                        Imprimer
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}

        <p className="mt-6 rounded-2xl border border-dashed border-violet-200 bg-violet-50/50 p-5 text-center text-sm font-semibold text-slate-600">
          🪜 D&apos;autres classes arrivent&nbsp;: chaque paquet est conçu comme une marche
          au-dessus du précédent — aucune carte en double d&apos;une année sur l&apos;autre.
        </p>
      </section>
    </main>
  );
}
