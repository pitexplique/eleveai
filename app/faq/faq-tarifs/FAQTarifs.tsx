"use client";

import Script from "next/script";
import Link from "next/link";

export default function FAQTarifs() {
  const faq = [
    {
      q: "EleveAI est-il gratuit ?",
      a: "EleveAI est actuellement en phase pilote. L'accès est fourni gratuitement aux élèves des établissements partenaires via un code établissement et un code élève. Aucun paiement n'est demandé aux élèves.",
    },
    {
      q: "Comment un élève accède-t-il à EleveAI ?",
      a: "L'élève reçoit un code établissement et un code élève de la part de son professeur ou de l'établissement. Il se connecte sur /auth/signin-eleve et accède immédiatement à tous les outils : Coach Maths IA, Parcours, Calcul rapide, English Maths, Défis du jour, Brevet et Bac Spé.",
    },
    {
      q: "Les résultats des élèves sont-ils enregistrés ?",
      a: "Oui. Dès qu'un élève est connecté, il peut enregistrer ses scores dans Parcours, Calcul rapide, Défis du jour et English Maths. Tout l'historique est visible dans son tableau de bord personnel.",
    },
    {
      q: "Existe-t-il une offre pour les établissements ?",
      a: "Oui. EleveAI propose une offre pilote pour les collèges et lycées : accès pour une ou plusieurs classes, codes élèves générés par l'établissement, suivi des résultats. Contactez-nous pour un devis.",
    },
    {
      q: "Un élève peut-il utiliser EleveAI sans être connecté ?",
      a: "Oui, la plupart des outils sont accessibles sans connexion. Mais pour enregistrer les scores et accéder au tableau de bord personnel, la connexion avec un code élève est nécessaire.",
    },
    {
      q: "Y aura-t-il un abonnement individuel à l'avenir ?",
      a: "Un accès individuel payant pour les familles est prévu. Il permettra à un élève de s'inscrire sans passer par un établissement. Les modalités seront communiquées prochainement.",
    },
    {
      q: "Les données des élèves sont-elles protégées ?",
      a: "Oui. EleveAI ne collecte que le strict nécessaire : code établissement, code élève, nom et résultats. Aucune donnée personnelle sensible n'est stockée. Consultez notre politique de confidentialité pour le détail.",
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
        id="faq-tarifs-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-sm text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-300 transition">
            Accueil
          </Link>
          <span className="text-slate-600">/</span>
          <Link href="/faq" className="hover:text-emerald-300 transition">
            FAQ
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200">Tarifs</span>
        </div>

        <h1 className="text-3xl font-bold text-emerald-300">
          FAQ Tarifs – EleveAI
        </h1>

        <p className="text-slate-300 text-sm leading-relaxed">
          Ici, on répond simplement aux questions sur les essais gratuits,
          l'abonnement, l'historique et le paiement.
        </p>

        <section className="space-y-4">
          {faq.map((f, i) => (
            <details
              key={i}
              className="rounded-xl border border-slate-700 bg-slate-900/60 p-4"
            >
              <summary className="cursor-pointer font-semibold text-emerald-300">
                {f.q}
              </summary>
              <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </section>

        <div className="pt-6 border-t border-slate-800 text-sm text-slate-400">
          Besoin d'un avis ?{" "}
          <Link
            href="/contact"
            className="text-emerald-300 font-semibold hover:text-emerald-200"
          >
            Écrire à l'équipe
          </Link>
          {" · "}
          <Link
            href="/offre-pilote"
            className="text-emerald-300 font-semibold hover:text-emerald-200"
          >
            Offre pilote (établissements)
          </Link>
          {" · "}
          <Link
            href="/tarifs"
            className="text-emerald-300 font-semibold hover:text-emerald-200"
          >
            Page Tarifs
          </Link>
        </div>
      </div>
    </main>
  );
}

