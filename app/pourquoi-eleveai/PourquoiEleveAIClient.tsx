"use client";

import Link from "next/link";
import Script from "next/script";

const features = [
  {
    title: "Tutor IA guidé",
    text: "Des entraînements progressifs par compétence avec indices, corrections et explications.",
    href: "/tutor-v4",
    cta: "Essayer Tutor IA",
  },
  {
    title: "Coach Maths IA",
    text: "Un repérage clair des notions et micro-compétences à travailler selon le niveau.",
    href: "/coach-maths-ia",
    cta: "Voir le coach",
  },
  {
    title: "Calcul rapide",
    text: "Des sessions courtes pour renforcer les automatismes essentiels en mathématiques.",
    href: "/calcul-rapide",
    cta: "Calcul rapide",
  },
  {
    title: "Problème du jour",
    text: "Un problème court pour apprendre à chercher, modéliser et expliquer sa démarche.",
    href: "/probleme-du-jour",
    cta: "Voir le problème",
  },
  {
    title: "Leçon du jour",
    text: "Des rappels réguliers pour consolider les notions importantes.",
    href: "/lecon-du-jour",
    cta: "Leçon du jour",
  },
  {
    title: "Parcours",
    text: "Une progression visible pour aider l’élève à avancer étape par étape.",
    href: "/parcours",
    cta: "Voir le parcours",
  },
];

export default function PourquoiEleveAIClient() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EleveAI",
    url: "https://eleveai.fr",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "contact@eleveai.fr",
        availableLanguage: ["fr"],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <Script
        id="org-eleveai"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      <section className="border-b border-slate-800 bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="mb-8 flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-emerald-300">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-slate-200">Pourquoi EleveAI</span>
          </div>

          <header className="space-y-5">
            <p className="inline-flex rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-xs font-bold uppercase tracking-wide text-emerald-300">
              Comprendre · S’entraîner · Progresser
            </p>

            <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">
              EleveAI aide les élèves à progresser en mathématiques sans faire à leur place.
            </h1>

            <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
              EleveAI est une plateforme pédagogique construite autour des compétences :
              calcul rapide, tutor guidé, défis, leçons courtes et parcours de progression.
              L’objectif est simple : rendre l’élève actif, régulier et plus confiant.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/accueil"
                className="rounded-2xl bg-emerald-400 px-5 py-3 text-center text-sm font-black text-slate-950 hover:bg-emerald-300"
              >
                Découvrir EleveAI
              </Link>

              <Link
                href="/coach-maths-ia"
                className="rounded-2xl border border-slate-700 px-5 py-3 text-center text-sm font-black text-slate-100 hover:bg-slate-900"
              >
                Voir Coach Maths IA
              </Link>
            </div>
          </header>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl"
            >
              <h2 className="text-xl font-black text-emerald-300">
                {item.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {item.text}
              </p>

              <Link
                href={item.href}
                className="mt-5 inline-flex text-sm font-bold text-emerald-300 hover:text-emerald-200"
              >
                {item.cta} →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
          <h2 className="text-2xl font-black text-slate-50">
            Une IA pédagogique, encadrée et utile
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            EleveAI n’est pas une IA qui remplace le travail de l’élève. La plateforme
            propose des questions progressives, des indices, des corrections expliquées
            et des défis pour apprendre à raisonner.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "L’élève répond, cherche et essaie.",
              "Les erreurs servent à comprendre.",
              "Les questions sont progressives.",
              "Les défis développent la résolution de problèmes.",
              "Les automatismes sont travaillés régulièrement.",
              "Le professeur garde son rôle central.",
            ].map((text) => (
              <div
                key={text}
                className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-sm font-semibold text-slate-200"
              >
                ✅ {text}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 sm:p-8">
          <h2 className="text-2xl font-black text-emerald-300">
            Pourquoi EleveAI ?
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
            Parce que beaucoup d’élèves ont besoin de reprendre confiance, de
            consolider les bases et de s’entraîner régulièrement. EleveAI propose
            un cadre simple : une compétence, une question, un indice, une correction,
            puis une progression.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-black text-slate-50">
              Pour les élèves
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              S’entraîner, comprendre ses erreurs, progresser à son rythme et
              gagner en confiance.
            </p>

            <Link
              href="/accueil"
              className="mt-5 inline-flex rounded-2xl bg-emerald-400 px-4 py-2 text-sm font-black text-slate-950 hover:bg-emerald-300"
            >
              Commencer
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-black text-slate-50">
              Pour les familles et les professeurs
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Un outil rassurant pour accompagner le travail régulier, sans
              encourager la copie ni remplacer l’explication humaine.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-2xl border border-slate-700 px-4 py-2 text-sm font-black text-slate-100 hover:bg-slate-800"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}