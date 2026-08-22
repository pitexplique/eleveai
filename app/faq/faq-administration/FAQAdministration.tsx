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
      // ⚠️ CETTE RÉPONSE VENDAIT UNE « PHASE PILOTE » qui n'existe plus en tant
      // qu'offre commerciale : le prix établissement est ferme et public depuis
      // le 22/08, il n'y a plus ni devis ni dispositif pilote à négocier.
      // ⚠️⚠️ ET ELLE A ENSUITE ANNONCÉ UN FORFAIT PROFESSEUR, mort le soir même
      // (22/08) : le prix suit une échelle par élève, et le professeur ne paie
      // rien du tout — il ouvre un tarif de groupe à ses familles. Aucune
      // constante ne protégeait cette phrase, qui ne cite aucun montant.
      // ⚠️ Cette page émet un JSON-LD FAQPage — la réponse peut s'afficher
      // DIRECTEMENT dans les résultats de Google. Une formule périmée ici se lit
      // avant la page elle-même.
      q: "Peut-on commencer petit, avant de généraliser ?",
      a: "Oui, et sans rien négocier. Un professeur peut ouvrir le tarif de groupe de sa classe sans rien sortir de sa poche, pour voir ce que ça donne en conditions réelles — scénarios, règles d’usage, retours des équipes. L’établissement décide ensuite de prendre le relais : il paie alors pour que plus personne d’autre ne paie, et il obtient en plus la vue complète de la direction. Il n’y a pas de dispositif pilote à demander : les prix sont publics et fermes.",
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
          <Link href="/contact" className="text-emerald-300 font-semibold hover:text-emerald-200">
            Contact / pilote
          </Link>
        </div>
      </div>
    </main>
  );
}
