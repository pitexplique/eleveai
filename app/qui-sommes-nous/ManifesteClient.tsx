"use client";

import Link from "next/link";
import { useState } from "react";

const EMAIL = "contact@eleveai.fr";

const principes = [
  {
    title: "L’élève doit essayer",
    text: "EleveAI questionne avant d’expliquer. L’élève doit réfléchir, proposer une réponse, puis améliorer.",
  },
  {
    title: "L’erreur est utile",
    text: "Se tromper fait partie de l’apprentissage. EleveAI aide à comprendre l’erreur et à recommencer.",
  },
  {
    title: "Anti-triche par design",
    text: "EleveAI n’a pas pour objectif de produire un devoir prêt à rendre, mais d’aider à apprendre réellement.",
  },
  {
    title: "Le professeur garde la main",
    text: "L’IA accompagne, mais elle ne remplace ni le professeur, ni le cours, ni l’exigence scolaire.",
  },
  {
    title: "Clarté et accessibilité",
    text: "Les activités doivent rester lisibles, progressives, rassurantes et adaptées aux élèves.",
  },
  {
    title: "Sobriété et crédibilité",
    text: "Pas de gadget inutile : EleveAI cherche d’abord l’efficacité pédagogique.",
  },
];

const faqItems = [
  {
    question: "EleveAI remplace-t-elle les enseignants ?",
    answer:
      "Non. EleveAI est conçue comme un outil d’accompagnement. Le professeur reste la référence pédagogique. L’IA aide à questionner, structurer et comprendre, jamais à se substituer à l’enseignement.",
  },
  {
    question: "EleveAI permet-elle de tricher ?",
    answer:
      "Non. EleveAI est pensée anti-triche par design : pas de production prête à rendre, pas de réponses clés sans raisonnement. L’élève doit essayer, réfléchir et corriger.",
  },
  {
    question: "À qui s’adresse EleveAI ?",
    answer:
      "EleveAI s’adresse aux élèves, aux enseignants et aux familles qui souhaitent utiliser l’IA de manière responsable, encadrée et compatible avec les exigences scolaires.",
  },
  {
    question: "EleveAI est-elle adaptée au cadre scolaire français ?",
    answer:
      "Oui. EleveAI est conçue par un enseignant en activité, en lien avec le terrain, les programmes et les contraintes réelles de l’école française.",
  },
];

export default function ManifesteClient() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Impossible de copier l’email", e);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.20),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_35%)]" />

        <div className="relative mx-auto max-w-4xl space-y-8 px-4 py-12 sm:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="transition hover:text-emerald-300">
              Accueil
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">Manifeste</span>
          </div>

          {/* Header */}
          <header className="space-y-5">
            <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              EleveAI · Manifeste pédagogique · IA responsable
            </p>

            <h1 className="text-3xl font-black tracking-tight text-slate-50 sm:text-5xl">
              Une IA pour apprendre, pas pour tricher
            </h1>

            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              EleveAI est construit sur une idée simple :{" "}
              <span className="font-semibold text-slate-50">
                l’IA est utile si elle fait réfléchir.
              </span>{" "}
              Elle doit guider l’élève, aider les professeurs, rassurer les
              familles et respecter le rôle de l’école.
            </p>

            {/* À retenir */}
            <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-4 sm:p-5">
              <p className="text-sm font-semibold text-emerald-300">
                À retenir
              </p>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-200">
                <li>• EleveAI guide, ne fait pas à la place.</li>
                <li>
                  • L’élève doit essayer, se tromper, comprendre et recommencer.
                </li>
                <li>• Le professeur reste la référence pédagogique.</li>
                <li>• L’usage de l’IA doit rester transparent et responsable.</li>
              </ul>
            </div>
          </header>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:py-12">
        {/* Pourquoi */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-emerald-300">
            Pourquoi EleveAI existe
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-200">
            <p>
              Les élèves utilisent déjà l’intelligence artificielle. Sans cadre,
              cela peut conduire à copier une réponse sans comprendre, à perdre
              la méthode ou à contourner l’effort nécessaire.
            </p>

            <p>
              EleveAI est conçu pour faire l’inverse : poser des questions,
              faire essayer, corriger, expliquer et aider l’élève à progresser
              réellement.
            </p>
          </div>

          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-200">
            <li>• apprendre par questions et essais ;</li>
            <li>• renforcer l’autonomie et la confiance ;</li>
            <li>• faire gagner du temps aux enseignants ;</li>
            <li>• rassurer les familles et l’institution.</li>
          </ul>
        </div>

        {/* Principes */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-slate-50">
            Les principes EleveAI
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {principes.map((principe) => (
              <div
                key={principe.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4"
              >
                <p className="font-semibold text-slate-50">
                  {principe.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {principe.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Anti-triche */}
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-blue-300">
            Anti-triche ne veut pas dire anti-IA
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-200">
            <p>
              Interdire totalement l’IA ne suffit pas. Les élèves y auront accès
              d’une manière ou d’une autre. Le vrai enjeu est donc d’apprendre à
              l’utiliser correctement.
            </p>

            <p>
              EleveAI propose un cadre : l’élève ne reçoit pas simplement une
              réponse finale. Il doit s’engager dans une démarche, comprendre les
              étapes, identifier ses erreurs et progresser.
            </p>
          </div>
        </div>

        {/* Qui sommes-nous */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-emerald-300">
            Qui sommes-nous ?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-200">
            <p>
              Je m’appelle{" "}
              <span className="font-semibold text-slate-50">
                Frédéric Lacoste
              </span>
              , enseignant de mathématiques à La Réunion, ancien statisticien,
              développeur autodidacte et initiateur du projet{" "}
              <span className="font-semibold text-slate-50">EleveAI</span>.
            </p>

            <p>
              Ce “nous” représente une intention : construire une IA au service
              réel des élèves, des enseignants et des familles, en lien avec le
              terrain.
            </p>

            <p>
              EleveAI avance progressivement avec les retours des élèves, des
              professeurs, des familles et des usages réels en classe.
            </p>
          </div>
        </div>

        {/* Phrase clé */}
        <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-yellow-200">
            Notre vision
          </h2>

          <p className="mt-4 text-lg font-bold leading-8 text-slate-50">
            Un outil pour tous, avec plusieurs portes d’entrée et une
            cartographie de leur évolution.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-200">
            Chaque élève peut progresser par un chemin différent : défi, calcul
            rapide, coach, parcours, leçon courte, évaluation ou activité
            contextualisée. L’important est de rendre les progrès visibles et de
            mieux repérer les notions à retravailler.
          </p>
        </div>

        {/* Contact */}
        <div className="grid gap-6 border-t border-slate-800 pt-8 sm:grid-cols-[1.4fr,1fr]">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-50">
              Un projet humain avant tout
            </h2>

            <p className="text-sm leading-7 text-slate-300">
              EleveAI repose sur des principes simples : questionner, faire
              essayer, corriger, expliquer, renforcer. L’IA aide, elle ne
              remplace pas.
            </p>
          </div>

          {/* CONTACT BOX */}
          <div className="space-y-3 rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-4 sm:p-5">
            <h2 className="text-lg font-bold text-emerald-300">
              Me contacter
            </h2>

            <p className="text-sm text-slate-300">
              Collaboration, atelier IA, retours terrain :
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center rounded-xl border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20"
              >
                {EMAIL}
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
                aria-label="Copier l’adresse email"
              >
                {copied ? "✔ Copié" : "Copier"}
              </button>
            </div>
          </div>
        </div>

        {/* FAQ SEO */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-slate-50">
            Questions fréquentes sur EleveAI
          </h2>

          <p className="mt-3 text-sm text-slate-300">
            Besoin de réponses plus détaillées ?{" "}
            <Link
              href="/faq"
              className="font-semibold text-emerald-300 hover:text-emerald-200"
            >
              Voir toutes les FAQ
            </Link>
          </p>

          <div className="mt-5 space-y-3 text-sm text-slate-200">
            {faqItems.map((item) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
      <p className="font-semibold text-slate-50">{question}</p>
      <p className="mt-2 leading-6 text-slate-300">{answer}</p>
    </div>
  );
}