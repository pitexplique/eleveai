import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BookOpen, ChevronRight, Download, FileText, MessageCircle } from "lucide-react";
import { listerFiches } from "@/lib/fiches/registre";

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
  title: "Maths : cours et exercices corrigés (CM2, 6e, 5e, 4e, 1re)",
  description:
    "Cours, méthodes et exercices corrigés (ou exercices résolus) en maths, du CM2 à la Première : à lire en ligne ou à imprimer en PDF.",
};

// Généré depuis le registre : toute fiche ajoutée à FICHES_REGISTRE apparaît
// ici automatiquement, triée par niveau. Zéro liste à maintenir en double.
const fiches = listerFiches("maths");

// Regroupement par niveau pour un affichage en sections (6e, 5e, 4e, 3e…).
const parNiveau = fiches.reduce<Record<string, typeof fiches>>((acc, f) => {
  (acc[f.classe] ??= []).push(f);
  return acc;
}, {});
const niveauxOrdonnes = Object.keys(parNiveau);
const LABEL_NIVEAU: Record<string, string> = {
  "6e": "6e", "5e": "5e", "4e": "4e", "3e": "3e",
  seconde: "2nde", "premiere-spe": "1re spé", "terminale-spe": "Tale spé",
};

export default function FichesCoursMathsPage() {
  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      <section className="border-b border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-12 sm:px-8">
          <nav className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-bold text-slate-500">
            <Link
              href="/fiches-cours"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Fiches de cours
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">Maths</span>
          </nav>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black uppercase text-emerald-700">
            <BookOpen className="h-4 w-4" />
            Mathématiques
          </div>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black tracking-normal text-slate-900 sm:text-5xl">
              Fiches de cours Maths
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Des fiches courtes, colorées, lisibles sur téléphone et imprimables
              en PDF depuis le navigateur.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-0.5 h-6 w-6 shrink-0 text-emerald-500" />
            <div>
              <p className="text-base font-black text-slate-900">
                Teste les nouvelles fiches de cours
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Ces fiches sont toutes neuves. Lis-les, entraîne-toi, puis dis-nous
                si elles t&apos;aident à mieux comprendre. Ton avis nous aide à les
                améliorer pour toute la classe.
              </p>
            </div>
          </div>
          <Link
            href="/votre-avis"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
          >
            <MessageCircle className="h-4 w-4" />
            Donner mon avis
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <p className="mb-6 text-sm font-bold text-slate-500">
          {fiches.length} fiches de maths — chacune se lit, se révise en
          flashcards et se compose.
        </p>
        {niveauxOrdonnes.map((niveau) => (
          <div key={niveau} className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900">
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm text-cyan-700">
                {LABEL_NIVEAU[niveau] ?? niveau}
              </span>
              <span className="text-slate-400">
                {parNiveau[niveau].length} fiche
                {parNiveau[niveau].length > 1 ? "s" : ""}
              </span>
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {parNiveau[niveau].map((fiche) => (
                <Link
                  key={fiche.href}
                  href={fiche.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-200/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">
                        {fiche.titre}
                      </h3>
                      {fiche.resume ? (
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {fiche.resume}
                        </p>
                      ) : null}
                    </div>
                    <FileText className="mt-1 h-6 w-6 shrink-0 text-emerald-500" />
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-600">
                    <Download className="h-4 w-4" />
                    Ouvrir la fiche
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
