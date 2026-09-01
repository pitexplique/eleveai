"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const EMAIL = "contact@eleveai.fr";

const principes = [
  {
    title: "Plusieurs portes d'entrée",
    text: "Coach IA (maths, français, anglais, espagnol, IA), Parcours, Brevet, Calcul rapide, Dictée, Défis… Chaque élève choisit ce qui lui convient le mieux.",
  },
  {
    title: "Suivi réel de la progression",
    text: "Les scores sont enregistrés notion par notion. L'élève voit ses progrès, le professeur aussi.",
  },
  {
    title: "L'élève cherche, comprend, vérifie",
    text: "EleveAI pose des questions avant de corriger. L'élève réfléchit, se trompe, recommence — c'est comme ça qu'on apprend.",
  },
  {
    title: "Le professeur garde la main",
    text: "EleveAI accompagne, mais ne remplace ni le cours, ni l'exigence scolaire, ni le professeur.",
  },
  {
    title: "Ancré à La Réunion",
    text: "Les défis et exemples sont inspirés du territoire : Piton de la Fournaise, Grand Raid, biodiversité de l'île.",
  },
  {
    title: "Simple et efficace",
    text: "Pas de gadget inutile. Des outils lisibles, progressifs et adaptés aux niveaux du CP au Bac.",
  },
];

const faqItems = [
  {
    question: "À qui s'adresse EleveAI ?",
    answer:
      // ⛔ « PENSÉE POUR LES ÉCOLES, COLLÈGES ET LYCÉES » RETIRÉ : on ne vend
      // plus à un établissement depuis le 31/08 (contractuel en CDI), donc la
      // plateforme n'est plus pensée pour eux — elle est pensée pour l'élève,
      // son professeur à titre personnel, et sa famille.
      "EleveAI s'adresse aux élèves du CP au Bac, à leurs enseignants et à leurs familles. Un professeur l'utilise avec ses classes sans avoir l'autorisation de personne à demander.",
  },
  {
    // ⛔ CETTE RÉPONSE NE DÉCRIVAIT QU'UN SEUL CHEMIN, ET C'ÉTAIT DEVENU
    // L'EXCEPTION : « l'élève reçoit un code établissement de son professeur ».
    // Depuis qu'on ne vend plus aux établissements, le chemin normal est
    // l'inscription individuelle — celle qui ne demande de code à personne.
    // ⚠️ Le chemin par code reste vrai et fonctionne : il sert au professeur qui
    // distribue des codes à sa classe. Ce qui a changé, c'est lequel des deux se
    // raconte en premier.
    question: "Comment un élève accède-t-il à EleveAI ?",
    answer:
      "Le plus souvent sans rien demander à personne : les exercices, les parcours et le coach s'ouvrent directement, et créer un compte sert seulement à garder sa progression. Un élève dont le professeur lui a remis un code établissement et un code élève se connecte avec, et retrouve sa classe. Dans les deux cas les résultats sont enregistrés automatiquement.",
  },
  {
    question: "EleveAI remplace-t-elle les enseignants ?",
    answer:
      "Non. EleveAI est un outil d'accompagnement. Le professeur reste la référence pédagogique. EleveAI aide l'élève à s'entraîner, à réviser et à suivre sa progression entre les cours.",
  },
  {
    question: "EleveAI est-elle adaptée au cadre scolaire français ?",
    answer:
      "Oui. EleveAI est conçue par un enseignant en activité à La Réunion, en lien avec les programmes officiels et les contraintes réelles du terrain.",
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
      console.error("Impossible de copier l'email", e);
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
              EleveAI · Qui sommes-nous
            </p>

            <h1 className="text-3xl font-black tracking-tight text-slate-50 sm:text-5xl">
              Plusieurs portes pour apprendre
            </h1>

            {/* Le fondateur, incarné dès le hero : on sait tout de suite QUI
               est derrière — un vrai prof, en poste, sur l'île. */}
            <div className="flex items-start gap-4">
              <Image
                src="/images/avatar-frederic-Lacoste.jpg"
                alt="Frédéric Lacoste, professeur de mathématiques à La Réunion, fondateur d'EleveAI"
                width={72}
                height={72}
                className="h-16 w-16 shrink-0 rounded-full border-2 border-emerald-400/60 object-cover sm:h-[72px] sm:w-[72px]"
              />
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                EleveAI est conçu et développé par{" "}
                <span className="font-semibold text-slate-50">
                  Frédéric Lacoste
                </span>
                , professeur de mathématiques en collège à La Réunion.{" "}
                <span className="font-semibold text-slate-50">
                  Chaque élève entre par la porte qui lui correspond
                </span>{" "}
                — et progresse à son rythme, avec un suivi réel de ses résultats.
              </p>
            </div>

            {/* Preuves de confiance — que du vérifiable. */}
            <div className="flex flex-wrap gap-2">
              {[
                "🏫 Utilisé en collège, à La Réunion",
                "🧪 Construit en classe, avec les élèves",
                "🔒 RGPD · sans publicité",
                /* ⛔⛔ CE BADGE DISAIT « GRATUIT POUR LES FAMILLES — FINANCÉ PAR
                   L'ÉTABLISSEMENT », et c'était la phrase la plus fausse du
                   site : elle donnait la raison POUR LAQUELLE les familles ne
                   paient pas, et cette raison est un canal interdit depuis le
                   31/08. Elle contredisait en plus la grille — la famille paie
                   2,50 €/mois pour sa fenêtre.
                   ⚠️ IL ÉTAIT DANS UN TABLEAU DE BADGES, pas dans la FAQ que
                   j'avais corrigée dix minutes plus tôt : une même page peut
                   porter le modèle mort dans trois structures différentes, et
                   corriger celle qu'on a lue ne prouve rien sur les autres. */
                "🎒 L'élève ne paie jamais",
              ].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-300"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* À retenir */}
            <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-4 sm:p-5">
              <p className="text-sm font-semibold text-emerald-300">
                En résumé
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-200">
                <li>• Un coach IA par matière : maths, français, anglais, espagnol, IA — du CP au Bac.</li>
                <li>• Plusieurs portes : parcours, brevet, calcul rapide, dictée du jour, défis…</li>
                <li>• Résultats enregistrés et visibles dans le tableau de bord élève.</li>
                <li>• Ancré à La Réunion — contexte local, exemples du territoire.</li>
                {/* ⛔ DEUXIÈME EXEMPLAIRE de « pensé pour les écoles, collèges et
                    lycées », dans un tableau différent de celui de la FAQ. */}
                <li>• Pensé pour l&apos;élève, son professeur et sa famille — sans passer par personne.</li>
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
              Les élèves utilisent déjà l'intelligence artificielle. Sans cadre,
              cela peut conduire à copier une réponse sans comprendre, à perdre
              la méthode ou à contourner l'effort nécessaire.
            </p>

            <p>
              EleveAI est conçu pour faire l'inverse : poser des questions,
              faire essayer, corriger, expliquer et aider l'élève à progresser
              réellement.
            </p>
          </div>

          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-200">
            <li>• apprendre par questions et essais ;</li>
            <li>• renforcer l'autonomie et la confiance ;</li>
            <li>• faire gagner du temps aux enseignants ;</li>
            <li>• rassurer les familles et l'institution.</li>
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
              Interdire totalement l'IA ne suffit pas. Les élèves y auront accès
              d'une manière ou d'une autre. Le vrai enjeu est donc d'apprendre à
              l'utiliser correctement.
            </p>

            <p>
              EleveAI propose un cadre : l'élève ne reçoit pas simplement une
              réponse finale. Il doit s'engager dans une démarche, comprendre les
              étapes, identifier ses erreurs et progresser.
            </p>
          </div>
        </div>

        {/* Qui sommes-nous */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-emerald-300">
            Qui sommes-nous ?
          </h2>

          {/* Le visage + la fonction, comme une carte de visite. */}
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/images/avatar-frederic-Lacoste.jpg"
              alt="Frédéric Lacoste"
              width={80}
              height={80}
              className="h-20 w-20 shrink-0 rounded-full border-2 border-emerald-400/60 object-cover"
            />
            <div>
              <p className="text-lg font-black text-slate-50">Frédéric Lacoste</p>
              <p className="text-sm text-slate-400">
                Professeur de mathématiques au Collège du Dimitile, à La Réunion
                · fondateur d&apos;EleveAI
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-200">
            <p>
              J&apos;ai construit EleveAI depuis ma salle de classe, pour mes
              élèves — pas dans un bureau, loin d&apos;eux.
            </p>

            <p>
              Titulaire d&apos;un{" "}
              <span className="font-semibold text-slate-50">
                DESS de mathématiques appliquées
              </span>
              , je suis spécialiste de la{" "}
              <span className="font-semibold text-slate-50">
                théorie du plus proche voisin
              </span>{" "}
              — un algorithme d&apos;optimisation et de classification au cœur de
              nombreuses applications de l&apos;intelligence artificielle moderne.
            </p>

            <p>
              C&apos;est cette double expertise — terrain pédagogique et fondements
              mathématiques de l&apos;IA — qui est au cœur d&apos;EleveAI. Pas un produit
              fabriqué loin des élèves, mais une plateforme construite depuis la
              salle de classe, avec les vraies difficultés du terrain réunionnais.
            </p>

            <p>
              EleveAI avance chaque semaine avec les retours des élèves, des
              professeurs et des familles — leurs mots sont sur la{" "}
              <Link
                href="/remerciements"
                className="font-semibold text-emerald-300 hover:text-emerald-200"
              >
                page des remerciements
              </Link>
              .
            </p>

            <p className="pt-1 text-right font-semibold italic text-slate-400">
              — Frédéric Lacoste, fondateur d&apos;EleveAI
            </p>
          </div>
        </div>

        {/* Phrase clé */}
        <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-yellow-200">
            Notre vision
          </h2>

          <p className="mt-4 text-lg font-bold leading-8 text-slate-50">
            Un outil pour tous, avec plusieurs portes d'entrée et une
            cartographie de leur évolution.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-200">
            Chaque élève peut progresser par un chemin différent : défi, calcul
            rapide, coach, parcours, leçon courte, évaluation ou activité
            contextualisée. L'important est de rendre les progrès visibles et de
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
              essayer, corriger, expliquer, renforcer. L'IA aide, elle ne
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
                aria-label="Copier l'adresse email"
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
