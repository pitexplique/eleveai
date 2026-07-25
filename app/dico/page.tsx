import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Keyboard, MousePointerClick, ChevronRight } from "lucide-react";
import { listDicos, FAMILLES_DICO, ORDRE_FAMILLES } from "@/lib/dico";

export const metadata: Metadata = {
  title: "Dico — mots & gestes pour l'éval nationale",
  description:
    "Le Dico EleveAI : apprends le vocabulaire essentiel et entraîne-toi aux gestes numériques (clavier, souris, menu déroulant) de l'évaluation nationale.",
};

export default function DicoHubPage() {
  const dicos = listDicos();

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      <section className="border-b border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-12 sm:px-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-black uppercase text-cyan-700">
            <BookOpen className="h-4 w-4" />
            Prépa éval nationale
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-black tracking-normal text-slate-900 sm:text-6xl">
              Dico
            </h1>
            <h2 className="mt-2 text-xl font-black text-cyan-700 sm:text-2xl">
              Préparation aux évaluations nationales
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Les mots essentiels <strong>et</strong> les gestes numériques de
              l&apos;examen, dans le même exercice. On apprend le vocabulaire en
              le tapant au clavier, en cliquant, en choisissant dans un menu
              déroulant — exactement comme le jour de l&apos;évaluation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm font-bold">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700">
              <Keyboard className="h-4 w-4 text-cyan-600" /> Clavier
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700">
              <MousePointerClick className="h-4 w-4 text-emerald-600" /> Souris
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700">
              ▾ Menu déroulant
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {dicos.map((dico) => (
            <Link
              key={`${dico.matiere}/${dico.niveau}`}
              href={`/dico/${dico.matiere}/${dico.niveau}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-200/40"
            >
              <div className="flex flex-wrap gap-2 text-xs font-black uppercase">
                <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-cyan-700">
                  {dico.niveau}
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700">
                  {dico.matiereLabel}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
                  {dico.mots.length} mots
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-black text-slate-900">
                {dico.titre}
              </h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {dico.sousTitre}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {ORDRE_FAMILLES.map((famille) => (
                  <span
                    key={famille}
                    className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200"
                  >
                    {FAMILLES_DICO[famille].emoji} {FAMILLES_DICO[famille].label}
                  </span>
                ))}
              </div>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-black text-cyan-600">
                Commencer
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Le pont vers l'entraînement (règle 24/07) : le Dico est une porte —
            la dictée du jour prolonge les mots, le coach entraîne pour de vrai. */}
        <div className="mt-8 rounded-2xl border border-cyan-200 bg-white p-5 text-center shadow-sm">
          <p className="text-sm font-bold text-slate-600">
            Les mots appris, deux façons de continuer :
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <Link
              href="/dictee-du-jour?from=dico"
              className="rounded-xl bg-cyan-600 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-cyan-500"
            >
              ✍️ La dictée du jour
            </Link>
            <Link
              href="/coach-ia/francais?from=dico"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-indigo-700"
            >
              📚 Le coach français t&apos;entraîne
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
