"use client";

import Script from "next/script";
import Link from "next/link";

export default function FAQProfesseurs() {
  const faq = [
    {
      q: "EleveAI remplace-t-elle l’enseignant ?",
      a: "Non. EleveAI est un assistant pédagogique. Le professeur reste la référence : il fixe les objectifs, choisit les exigences, valide les supports et garde la main sur l’évaluation.",
    },
    {
      q: "Comment EleveAI limite-t-elle la triche ?",
      a: "EleveAI est pensée “anti-triche par design” : guidage par étapes, questionnement, demandes de justification et absence de production prête à rendre. L’objectif est de rendre la triche moins utile que le raisonnement.",
    },
    {
      q: "Est-ce compatible avec mes pratiques (cours, devoirs, évaluations) ?",
      a: "Oui. EleveAI s’intègre à tes pratiques existantes : préparation de séquences, exercices, remédiation, différenciation, reformulations. Tu peux l’utiliser ponctuellement ou régulièrement.",
    },
    {
      q: "Les contenus sont-ils alignés avec les programmes ?",
      a: "EleveAI vise l’alignement avec les programmes et compétences officiels via des prompts structurés. Comme pour tout support, la validation pédagogique finale reste celle du professeur.",
    },
    {
      q: "Puis-je l’utiliser pour la différenciation et les élèves DYS ?",
      a: "Oui. EleveAI facilite la reformulation, l’explicitation pas à pas, l’allègement du langage et la structuration, tout en conservant les objectifs d’apprentissage.",
    },
    {
      q: "Quel gain de temps concret pour un professeur ?",
      a: "Gain de temps sur la création d’exercices, la préparation de supports, la remédiation, et la mise en forme. EleveAI t’aide à produire plus vite, sans te déposséder du cœur du métier.",
    },
    {
      q: "Comment cadrer l’usage en classe ?",
      a: "Avec des consignes claires : l’élève doit montrer sa démarche, expliciter ses choix, et produire une correction personnelle. La charte EleveAI sert de base, et tu peux l’adapter à ta classe.",
    },
    {
      q: "EleveAI peut-elle aider à repérer les productions IA ?",
      a: "EleveAI encourage la transparence (démarche, essais, corrections). Aucun outil ne “détecte” parfaitement l’IA, mais un cadre de traces et d’explication réduit fortement les dérives.",
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
        id="faq-professeurs-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-sm text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-300 transition">Accueil</Link>
          <span className="text-slate-600">/</span>
          <Link href="/faq" className="hover:text-emerald-300 transition">FAQ</Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200">Professeurs</span>
        </div>

        <h1 className="text-3xl font-bold text-emerald-300">
          FAQ Professeurs – EleveAI
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
          Pour le cadre global :{" "}
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

