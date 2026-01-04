import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ EleveAI – Professeurs, Parents, Établissements",
  description:
    "Toutes les réponses sur EleveAI : usages pédagogiques, cadre anti-triche, protection des données et accompagnement des établissements.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ EleveAI – Professeurs, Parents, Établissements",
    description:
      "Usages pédagogiques, anti-triche, protection des données et déploiement établissement.",
    url: "/faq",
    siteName: "EleveAI",
    type: "website",
  },
};

export default function FAQIndexPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-emerald-300">
          FAQ – EleveAI
        </h1>

        <p className="text-slate-300">
          Choisissez la FAQ correspondant à votre situation.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/faq-professeurs"
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:bg-slate-900/80 transition"
          >
            <p className="font-semibold text-emerald-300">Professeurs</p>
            <p className="mt-2 text-sm text-slate-300">
              Pédagogie, différenciation, anti-triche, gain de temps.
            </p>
          </Link>

          <Link
            href="/faq-parents"
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:bg-slate-900/80 transition"
          >
            <p className="font-semibold text-emerald-300">Parents</p>
            <p className="mt-2 text-sm text-slate-300">
              Confiance, progression, usage responsable à la maison.
            </p>
          </Link>

          <Link
            href="/faq-administration"
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:bg-slate-900/80 transition"
          >
            <p className="font-semibold text-emerald-300">Établissements</p>
            <p className="mt-2 text-sm text-slate-300">
              Cadre, gouvernance, protection des données, pilote.
            </p>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-800 text-sm text-slate-400">
          Vous cherchez le cadre global ?{" "}
          <Link href="/atelier-IA/charte" className="text-emerald-300 font-semibold hover:text-emerald-200">
            Lire la charte
          </Link>{" "}
          ·{" "}
          <Link href="/qui-sommes-nous" className="text-emerald-300 font-semibold hover:text-emerald-200">
            Qui sommes-nous
          </Link>
        </div>
      </div>
    </main>
  );
}

