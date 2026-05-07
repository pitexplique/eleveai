// app/pourquoi-eleveai/PourquoiEleveAIClient.tsx
"use client";

import Link from "next/link";
import Script from "next/script";

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

      <section className="border-b border-slate-800 bg-gradient-to-b from-emerald-950/30 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <div className="mb-8 flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-emerald-300">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-slate-200">Pourquoi EleveAI</span>
          </div>

          <header className="space-y-5">
            <p className="inline-flex rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-xs font-bold uppercase tracking-wide text-emerald-300">
              Apprendre · Raisonner · Progresser
            </p>

            <h1 className="max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
              EleveAI aide les élèves à progresser sans faire à leur place.
            </h1>

            <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
              EleveAI est pensé pour renforcer les bases, développer le
              raisonnement scientifique et redonner confiance aux élèves grâce à
              des entraînements courts, guidés et réguliers.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/signin-eleve"
                className="rounded-2xl bg-emerald-400 px-5 py-3 text-center text-sm font-black text-slate-950 hover:bg-emerald-300"
              >
                Connexion élève
              </Link>

              <Link
                href="/accueil"
                className="rounded-2xl border border-slate-700 px-5 py-3 text-center text-sm font-black text-slate-100 hover:bg-slate-900"
              >
                Découvrir EleveAI
              </Link>
            </div>
          </header>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            {
              title: "Automatismes",
              text: "Des entraînements courts pour consolider les bases en mathématiques.",
              href: "/calcul-rapide",
              cta: "Calcul rapide",
            },
            {
              title: "Raisonnement",
              text: "Des questions guidées pour apprendre à chercher, justifier et corriger.",
              href: "/coach-maths-ia",
              cta: "Coach Maths IA",
            },
            {
              title: "Mémoire",
              text: "Des leçons courtes et régulières pour réactiver les notions essentielles.",
              href: "/lecon-du-jour",
              cta: "Leçon du jour",
            },
          ].map((item) => (
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
            Une IA discrète, au service de l’apprentissage
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            EleveAI n’est pas conçu pour donner directement une réponse à
            recopier. L’objectif est d’aider l’élève à comprendre la méthode, à
            repérer ses erreurs et à progresser étape par étape.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "L’élève reste actif.",
              "L’erreur devient un moment d’apprentissage.",
              "Les exercices sont progressifs.",
              "Le professeur garde son rôle essentiel.",
              "Les parents peuvent accompagner sans faire à la place.",
              "L’IA reste encadrée et pédagogique.",
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
            Pourquoi maintenant ?
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
            Les élèves ont besoin de bases solides, de méthode et d’autonomie.
            EleveAI répond à ce besoin avec des parcours simples, motivants et
            réguliers : un peu chaque jour, pour progresser durablement.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-black text-slate-50">
              Pour les élèves
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              S’entraîner, comprendre ses erreurs, reprendre confiance et voir
              sa progression.
            </p>
            <Link
              href="/auth/signin-eleve"
              className="mt-5 inline-flex rounded-2xl bg-emerald-400 px-4 py-2 text-sm font-black text-slate-950 hover:bg-emerald-300"
            >
              Se connecter
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-black text-slate-50">
              Pour les familles et les professeurs
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Un cadre rassurant : l’élève apprend à faire, à expliquer et à
              progresser sans tricher.
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