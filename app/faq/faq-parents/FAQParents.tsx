"use client";

import Script from "next/script";
import Link from "next/link";

export default function FAQParents() {
  const faq = [
    {
      q: "Mon enfant peut-il tricher avec EleveAI ?",
      a: "EleveAI est conçue pour limiter la triche : elle guide par questions, demande des explications et favorise la correction. Elle n’est pas pensée pour produire un devoir “prêt à rendre”.",
    },
    {
      q: "Est-ce que l’IA fait les devoirs à sa place ?",
      a: "Non. EleveAI aide à comprendre, structurer et s’entraîner. L’élève doit essayer, se tromper et progresser : c’est le cœur de la démarche.",
    },
    {
      q: "Est-ce adapté au niveau de mon enfant ?",
      a: "Oui. EleveAI peut ajuster le niveau de langage et le rythme des explications, tout en conservant les objectifs d’apprentissage.",
    },
    {
      q: "Est-ce compatible avec l’école et les enseignants ?",
      a: "Oui, à condition d’un usage encadré : consignes claires, traces de démarche, correction personnelle. EleveAI est conçue pour respecter le rôle du professeur.",
    },
    {
      q: "Comment savoir si mon enfant apprend vraiment ?",
      a: "Un bon indicateur : la capacité à expliquer avec ses mots, à justifier une réponse, à corriger ses erreurs. EleveAI encourage cette démarche plutôt que la simple réponse finale.",
    },
    {
      q: "Les données sont-elles protégées ?",
      a: "EleveAI adopte une approche de minimisation des données et d’encadrement des usages. Les modalités exactes peuvent varier selon les paramétrages et le contexte (compte, établissement, usages).",
    },
    {
      q: "EleveAI peut-elle aider un élève en difficulté ?",
      a: "Oui, notamment grâce aux explications pas à pas, à la reformulation et à la structuration. L’objectif est de redonner méthode et confiance.",
    },
    {
      q: "Que faire si mon enfant veut utiliser l’IA pour tout ?",
      a: "Fixer des règles simples : d’abord essayer seul, puis utiliser EleveAI pour comprendre, et enfin produire une réponse personnelle. La charte EleveAI peut servir de repère.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-16">
      <Script
        id="faq-parents-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-sm text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-300 transition">Accueil</Link>
          <span className="text-slate-600">/</span>
          <Link href="/faq" className="hover:text-emerald-300 transition">FAQ</Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200">Parents</span>
        </div>

        <h1 className="text-3xl font-bold text-emerald-300">
          FAQ Parents – EleveAI
        </h1>

        <section className="space-y-4">
          {faq.map((f, i) => (
            <details
              key={i}
              className="rounded-xl border border-slate-700 bg-slate-900/60 p-4"
            >
              <summary className="cursor-pointer font-semibold text-emerald-300">
                {f.q}
              </summary>
              <p className="mt-3 text-sm text-slate-200 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </section>

        <div className="pt-6 border-t border-slate-800 text-sm text-slate-400">
          À lire aussi :{" "}
          <Link href="/atelier-IA/charte" className="text-emerald-300 font-semibold hover:text-emerald-200">
            Charte EleveAI
          </Link>
          {" · "}
          <Link href="/qui-sommes-nous" className="text-emerald-300 font-semibold hover:text-emerald-200">
            Qui sommes-nous
          </Link>
        </div>
      </div>
    </main>
  );
}

