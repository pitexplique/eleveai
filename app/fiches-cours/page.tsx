import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

// ⭐ 23/08/2026 — LE TITRE PORTE CE QU'ON TAPE, PAS CE QU'ON VEND.
// « Fiche de cours » est le nom de la COLLECTION : il reste dans le fil
// d'Ariane, dans le corps de la page et dans le surtitre des cartes de
// l'accueil. Le `title`, lui, sert à être trouvé — et la requête historique du
// soutien scolaire en France est « cours et exercices corrigés ». « Fiche » n'y
// pèse aucun volume : c'est du vocabulaire de vendeur.
// ⚠️ « exercices résolus » est la même chose dite au Maroc, en Algérie et en
// Belgique. Il n'entre pas dans les 27 titres de fiches — ce serait de
// l'empilement de mots-clés, et Google le lit comme tel. Il est écrit UNE fois
// par sommaire, dans une phrase qui se lit.
export const metadata: Metadata = {
  title: "Fiches de cours",
  description:
    "Toutes les fiches EleveAI par matière : cours et exercices corrigés, à lire en ligne ou à télécharger en PDF.",
};

// Une « porte » par matière. Ajouter une entrée quand une matière a son index.
const matieres = [
  {
    href: "/fiches-cours/maths",
    titre: "Maths",
    resume: "Proportionnalité, Pythagore, cosinus, pourcentages, statistiques…",
    accent: "from-cyan-500 to-emerald-600",
    ring: "hover:border-emerald-300 hover:shadow-emerald-200/40",
    emoji: "🧮",
  },
  {
    href: "/fiches-cours/francais",
    titre: "Français",
    resume: "Nature et fonction, compléments, accords — la grammaire dessinée sur la phrase.",
    accent: "from-violet-500 to-fuchsia-600",
    ring: "hover:border-violet-300 hover:shadow-violet-200/40",
    emoji: "✍️",
  },
  {
    href: "/fiches-cours/ia",
    titre: "Intelligence artificielle",
    resume: "Comprendre, utiliser et questionner l'IA — par domaine du référentiel Pix.",
    accent: "from-indigo-500 to-violet-600",
    ring: "hover:border-indigo-300 hover:shadow-indigo-200/40",
    emoji: "🤖",
  },
];

export default function FichesCoursPage() {
  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      <section className="border-b border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-indigo-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-12 sm:px-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-black uppercase text-indigo-700">
            <BookOpen className="h-4 w-4" />
            Ressources élèves
          </div>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black tracking-normal text-slate-900 sm:text-5xl">
              Fiches de cours
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Des fiches courtes, colorées, lisibles sur téléphone et imprimables
              en PDF. Choisis ta matière.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {matieres.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${m.ring}`}
            >
              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${m.accent} text-2xl shadow-lg`}
              >
                {m.emoji}
              </div>
              <h2 className="mt-5 text-2xl font-black text-slate-900">{m.titre}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{m.resume}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-indigo-600">
                Voir les fiches
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 flex items-center gap-2 text-sm font-medium text-slate-400">
          <Sparkles className="h-4 w-4" />
          D&apos;autres matières arriveront ici.
        </p>
      </section>
    </main>
  );
}
