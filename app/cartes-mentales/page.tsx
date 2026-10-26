import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Network, PencilLine, Play } from "lucide-react";
import { libelleClasse } from "@/lib/fiches/registre";
import NOTIONS from "@/lib/videos/bilans-notions.json";

// ─── Le hub des CARTES MENTALES (27/10/2026) ──────────────────────────────────
// Frédéric : « créer un hub carte mentale comme le hub vidéos ou fiches
// exercices ». Une carte par notion du coach (la notion au centre, une bulle par
// micro : compris ou pas, ce que j'ai retenu), du CP à la Terminale.
// ⚠️ MÊME SOURCE QUE LES CARTES ET LE SITEMAP : lib/videos/bilans-notions.json
// (scripts/generer-bilans-videos.mjs). Jamais de liste en dur ici.

export const metadata: Metadata = {
  title: "Cartes mentales de maths à imprimer, du CP à la Terminale",
  description:
    "Une carte mentale par notion de maths : la notion au centre, chaque compétence dans sa bulle, à cocher (compris, pas tout à fait, pas compris) et à compléter avec ce que l'élève a retenu. A4 recto verso, gratuites.",
  alternates: { canonical: "/cartes-mentales" },
};

type Notion = { classe: string; notion: string; micros: string[] };

// L'ordre de l'école, du CP à la Terminale (les adultes à part, pas ici).
const ORDRE = ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "premiere-spe", "terminale-spe", "stmg"];

export default function CartesMentalesPage() {
  const toutes = Object.entries(NOTIONS as Record<string, Notion>);
  const groupes = ORDRE.map((classe) => ({
    classe,
    notions: toutes.filter(([, n]) => n.classe === classe).map(([cle, n]) => ({ cle, ...n })),
  })).filter((g) => g.notions.length > 0);

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      <section className="border-b border-slate-200 bg-gradient-to-br from-teal-50 via-white to-sky-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-12 sm:px-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-black uppercase text-teal-800">
            <Network className="h-4 w-4" />
            Ressources élèves et profs
          </div>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black tracking-normal text-slate-900 sm:text-5xl">Cartes mentales de maths</h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Une carte par notion : la notion au centre, chaque compétence dans sa bulle. Après les vidéos,
              l&apos;élève coche ce qu&apos;il a compris et écrit ce qu&apos;il a retenu. Une feuille A4, recto verso,
              à imprimer.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/video" className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-bold text-rose-800 shadow-sm transition hover:bg-rose-50">
              <Play className="h-4 w-4" />
              Les vidéos
            </Link>
            <Link href="/fiches-cours" className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm transition hover:bg-emerald-50">
              <BookOpen className="h-4 w-4" />
              Les fiches de cours
            </Link>
            <Link href="/fiches-exercices" className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-800 shadow-sm transition hover:bg-amber-50">
              <PencilLine className="h-4 w-4" />
              Les fiches d&apos;exercices
            </Link>
          </div>
          {/* Aller droit à sa classe. */}
          <nav className="flex flex-wrap gap-1.5" aria-label="Classes">
            {groupes.map((g) => (
              <a key={g.classe} href={`#${g.classe}`} className="rounded-full bg-white px-3 py-1 text-sm font-black text-teal-800 ring-1 ring-teal-200 hover:bg-teal-50">
                {libelleClasse(g.classe)}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {groupes.map((g) => (
          <div key={g.classe} id={g.classe} className="mb-10 scroll-mt-24">
            <h2 className="mb-3 text-xl font-black text-slate-900">Maths {libelleClasse(g.classe)}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.notions.map((n) => (
                <Link
                  key={n.cle}
                  href={`/cartes-mentales/maths/${n.cle}`}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700 ring-1 ring-teal-200">
                    <Network className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-black leading-tight text-slate-900 group-hover:text-teal-800">{n.notion}</span>
                    <span className="text-sm text-slate-500">
                      {n.micros.length} compétence{n.micros.length > 1 ? "s" : ""}
                      {n.micros.length > 7 ? " · recto verso" : ""}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
