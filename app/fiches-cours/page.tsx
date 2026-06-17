import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Download, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Fiches de cours",
  description:
    "Fiches de cours EleveAI a lire en ligne ou a telecharger en PDF.",
};

const fiches = [
  {
    href: "/fiches-cours/proportionnalite-6e",
    niveau: "6e",
    matiere: "Maths",
    titre: "Proportionnalite",
    resume:
      "Reconnaitre une situation proportionnelle, completer un tableau et revenir a l'unite.",
  },
];

export default function FichesCoursPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="border-b border-white/10 bg-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-12 sm:px-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-black uppercase text-emerald-200">
            <BookOpen className="h-4 w-4" />
            Ressources eleves
          </div>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black tracking-normal text-white sm:text-5xl">
              Fiches de cours
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              Des fiches courtes, lisibles sur telephone, et imprimables en PDF
              depuis le navigateur.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {fiches.map((fiche) => (
            <Link
              key={fiche.href}
              href={fiche.href}
              className="group rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-300/60 hover:bg-white/[0.07]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 text-xs font-black uppercase">
                    <span className="rounded-full bg-cyan-300/15 px-2.5 py-1 text-cyan-200">
                      {fiche.niveau}
                    </span>
                    <span className="rounded-full bg-emerald-300/15 px-2.5 py-1 text-emerald-200">
                      {fiche.matiere}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-black text-white">
                    {fiche.titre}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {fiche.resume}
                  </p>
                </div>
                <FileText className="mt-1 h-6 w-6 shrink-0 text-emerald-200" />
              </div>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-200">
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
