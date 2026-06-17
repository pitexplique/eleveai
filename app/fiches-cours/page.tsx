import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Download, FileText, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Fiches de cours",
  description:
    "Fiches de cours eleveai.fr à lire en ligne ou à télécharger en PDF.",
};

const fiches = [
  {
    href: "/fiches-cours/maths/6e/proportionnalite",
    niveau: "6e",
    matiere: "Maths",
    titre: "Proportionnalité",
    resume:
      "Reconnaître une situation proportionnelle, compléter un tableau et revenir à l'unité.",
  },
  {
    href: "/fiches-cours/maths/4e/cosinus",
    niveau: "4e",
    matiere: "Maths",
    titre: "Cosinus",
    resume:
      "Utiliser le cosinus dans un triangle rectangle pour calculer une longueur.",
  },
];

export default function FichesCoursPage() {
  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      <section className="border-b border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-12 sm:px-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black uppercase text-emerald-700">
            <BookOpen className="h-4 w-4" />
            Ressources élèves
          </div>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black tracking-normal text-slate-900 sm:text-5xl">
              Fiches de cours
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Des fiches courtes, colorées, lisibles sur téléphone et
              imprimables en PDF depuis le navigateur.
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
                Ces fiches sont toutes neuves. Lis-les, entraîne-toi, puis
                dis-nous si elles t&apos;aident à mieux comprendre. Ton avis nous
                aide à les améliorer pour toute la classe.
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
        <div className="grid gap-4 md:grid-cols-2">
          {fiches.map((fiche) => (
            <Link
              key={fiche.href}
              href={fiche.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-200/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 text-xs font-black uppercase">
                    <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-cyan-700">
                      {fiche.niveau}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700">
                      {fiche.matiere}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-black text-slate-900">
                    {fiche.titre}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {fiche.resume}
                  </p>
                </div>
                <FileText className="mt-1 h-6 w-6 shrink-0 text-emerald-500" />
              </div>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-600">
                <Download className="h-4 w-4" />
                Ouvrir la fiche PDF
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
