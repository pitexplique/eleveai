"use client";

import Script from "next/script";
import Link from "next/link";

export default function FAQAdministration() {
  const faq = [
    {
      q: "EleveAI est-elle compatible avec le cadre scolaire français ?",
      a: "EleveAI est conçue pour s’inscrire dans le cadre existant : rôle central du professeur, objectifs d’apprentissage, transparence et responsabilité. Elle vise un usage encadré, non une délégation de l’évaluation.",
    },
    {
      q: "Comment sont traitées les données ?",
      a: "EleveAI suit une approche “privacy by design” : minimisation des données, anonymisation possible, règles de conservation adaptées. Les modalités exactes dépendent aussi des paramétrages et du contexte d’usage.",
    },
    {
      q: "Peut-on cadrer les usages élèves ?",
      a: "Oui. L’établissement peut définir une charte, des règles d’usage et des consignes pédagogiques. L’objectif est d’aligner l’outil avec le projet d’établissement et les pratiques des équipes.",
    },
    {
      q: "Existe-t-il une charte d’usage de l’IA ?",
      a: "Oui. EleveAI propose une charte explicitant droits, devoirs et limites : transparence, démarche, responsabilité, et anti-triche par design.",
    },
    {
      q: "Proposez-vous une phase pilote ?",
      a: "Oui. Une phase pilote permet de tester l’usage encadré (scénarios, règles, retours terrain) avant toute généralisation. Elle peut inclure un accompagnement et des ajustements.",
    },
    {
      q: "Quels accompagnements sont proposés ?",
      a: "Formation, ateliers pratiques, sensibilisation aux risques, écriture de prompts pédagogiques, et appui à la mise en place d’un cadre IA dans l’établissement.",
    },
    {
      q: "Comment éviter les dérives (copie, sur-dépendance, contournements) ?",
      a: "En combinant cadre + pédagogie : exigences de traces (démarche), justification, correction personnelle, et consignes qui valorisent le raisonnement. L’outil seul ne suffit pas : le cadre d’établissement est déterminant.",
    },
    {
      q: "EleveAI est-elle adaptée à un usage multi-profils (profs, élèves, parents) ?",
      a: "Oui. EleveAI structure les usages par publics et encourage une cohérence : même philosophie (apprendre sans tricher), avec des réponses adaptées aux besoins de chaque acteur.",
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
        id="faq-administration-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-sm text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-300 transition">Accueil</Link>
          <span className="text-slate-600">/</span>
          <Link href="/faq" className="hover:text-emerald-300 transition">FAQ</Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200">Établissements</span>
        </div>

        <h1 className="text-3xl font-bold text-emerald-300">
          FAQ Établissements & Administration – EleveAI
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
          Pour cadrer :{" "}
          <Link href="/atelier-IA/charte" className="text-emerald-300 font-semibold hover:text-emerald-200">
            Charte EleveAI
          </Link>
          {" · "}
          <Link href="/contact" className="text-emerald-300 font-semibold hover:text-emerald-200">
            Contact / pilote
          </Link>
        </div>
      </div>
    </main>
  );
}
