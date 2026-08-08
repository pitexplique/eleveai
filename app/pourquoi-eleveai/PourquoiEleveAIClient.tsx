"use client";

import Link from "next/link";
import Script from "next/script";

const portes = [
  {
    emoji: "🛤️",
    title: "Le Parcours",
    text: "Un bilan clair : notions maîtrisées 🟢, à revoir 🟡, fragiles 🔴. L'élève sait exactement où il en est.",
    href: "/parcours",
    color: "from-violet-500 to-indigo-600",
  },
  {
    emoji: "🧠",
    title: "Coach Maths IA",
    text: "Un entraînement notion par notion, du CM1 à la Terminale. Missions progressives, score, badges.",
    href: "/coach-ia/maths",
    color: "from-orange-400 to-red-500",
  },
  {
    emoji: "📚",
    title: "Coach Brevet",
    text: "Sprint 30 jours pour le brevet des collèges. Automatismes, problèmes guidés, sujets express.",
    href: "/coach-brevet",
    color: "from-emerald-400 to-teal-600",
  },
  {
    emoji: "🎓",
    title: "Coach Bac Spé",
    text: "21 jours pour préparer l'épreuve de maths spé : suites, fonctions, probabilités, logarithme…",
    href: "/coach-bac-spe",
    color: "from-blue-600 to-violet-700",
  },
  {
    emoji: "⚡",
    title: "Calcul rapide",
    text: "7 questions en 5 minutes. Des sessions courtes pour muscler les automatismes de calcul.",
    href: "/calcul-rapide",
    color: "from-lime-400 to-green-600",
  },
  {
    emoji: "🇬🇧",
    title: "English Maths",
    text: "La semaine des verbes en anglais, avec audio et mini-défi.",
    href: "/english-maths",
    color: "from-sky-500 to-blue-600",
  },
  {
    emoji: "🎯",
    title: "Défis du jour",
    text: "Des défis maths inspirés de La Réunion — Piton de la Fournaise, Grand Raid, océan…",
    href: "/defis-du-jour",
    color: "from-pink-500 to-rose-600",
  },
  {
    emoji: "🏆",
    title: "Concours général",
    text: "Des questions de niveau supérieur pour les élèves qui veulent aller plus loin.",
    href: "/concours-general",
    color: "from-amber-400 to-orange-500",
  },
];

const preuves = [
  { chiffre: "CM1 → Bac", label: "Niveaux couverts" },
  { chiffre: "8", label: "Portes d'entrée" },
  { chiffre: "100 %", label: "Suivi enregistré" },
  { chiffre: "La Réunion", label: "Conçu ici" },
];

export default function PourquoiEleveAIClient() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "EleveAI",
    url: "https://www.eleveai.fr",
    description:
      "EleveAI : plusieurs portes d'entrée pour apprendre les maths et suivre la progression des élèves, du CM1 au Bac.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "contact@eleveai.fr",
      availableLanguage: "fr",
    },
  };

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-950">
      <Script
        id="org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* FOND SVG */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg className="h-full w-full" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="pq-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="50%" stopColor="#EFF6FF" />
              <stop offset="100%" stopColor="#FFFBEB" />
            </linearGradient>
            <radialGradient id="pq-g1" cx="15%" cy="20%" r="50%">
              <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="pq-g2" cx="85%" cy="18%" r="50%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="pq-g3" cx="50%" cy="88%" r="55%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
            </radialGradient>
            <filter id="pq-blur"><feGaussianBlur stdDeviation="28" /></filter>
          </defs>
          <rect width="1440" height="1000" fill="url(#pq-bg)" />
          <rect width="1440" height="1000" fill="url(#pq-g1)" />
          <rect width="1440" height="1000" fill="url(#pq-g2)" />
          <rect width="1440" height="1000" fill="url(#pq-g3)" />
          <circle cx="160" cy="170" r="140" fill="#34D399" opacity="0.18" filter="url(#pq-blur)" />
          <circle cx="1280" cy="160" r="160" fill="#60A5FA" opacity="0.18" filter="url(#pq-blur)" />
          <circle cx="720" cy="840" r="200" fill="#FCD34D" opacity="0.14" filter="url(#pq-blur)" />
          <polygon points="1360,70 1370,100 1400,100 1376,118 1385,148 1360,130 1335,148 1344,118 1320,100 1350,100"
            fill="#FDE68A" opacity="0.5" />
          <polygon points="70,580 80,610 110,610 86,628 95,658 70,640 45,658 54,628 30,610 60,610"
            fill="#6EE7B7" opacity="0.45" />
          <g opacity="0.1" fill="#1E40AF" fontFamily="serif" fontSize="52" fontWeight="900">
            <text x="100" y="270">+</text>
            <text x="1320" y="290">π</text>
            <text x="640" y="940">×</text>
          </g>
          <path d="M0 870 C240 820 480 870 720 840 C960 810 1200 860 1440 830 L1440 1000 L0 1000 Z"
            fill="white" opacity="0.55" />
        </svg>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10">

        {/* ε → ∞ — LE DESSIN DU FONDATEUR (20/07/2026, adresse courte /epsilon).
            Le SVG s'anime tout seul : le cœur se trace, l'étincelle active le
            epsilon, traverse le réseau de neurones, allume les infinis. */}
        <section className="mb-10 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-800 ring-1 ring-blue-200">
            ε → ∞ · Le dessin du fondateur
          </div>

          <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Activer des epsilons peut engendrer des infinis
          </h1>

          <div className="mt-6 grid items-center gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200" style={{ backgroundColor: "#fcfcf7" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/coeur-epsilon-infini.svg"
                alt="Un cœur dessiné au stylo bleu : un epsilon, les indices i j k n, un réseau de neurones, les nombres 1 2 3 4, l'infini — et une flèche qui s'échappe"
                className="h-auto w-full"
              />
            </div>
            <div className="space-y-4 text-base font-semibold leading-relaxed text-slate-700">
              <p>
                Un soir de juillet, un prof de maths a dessiné un cœur sur une feuille à
                carreaux. Dedans&nbsp;: un <strong>ε</strong> — l&apos;infiniment petit. Le grand
                mathématicien Erdős appelait les enfants «&nbsp;des epsilons&nbsp;».
              </p>
              <p>
                L&apos;epsilon avance pas à pas — <em>i, j, k, n</em>, un exercice après
                l&apos;autre — et traverse un <strong>réseau de neurones</strong>&nbsp;:
                l&apos;IA est <em>dans</em> le cœur, jamais au-dessus. Il en ressort en
                comptant 1, 2, 3, 4… jusqu&apos;à <strong>l&apos;infini</strong>.
              </p>
              <p>
                Les petites actions du quotidien font pareil&nbsp;: aider, expliquer,
                réessayer. En créole&nbsp;: <strong>«&nbsp;In min i lav lot&nbsp;»</strong> —
                une main lave l&apos;autre.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/simulateur-epsilon"
                  className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  ⚡ Active un epsilon toi-même →
                </Link>
                <Link
                  href="/besoin-de-vous"
                  className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
                >
                  🤝 EleveAI a besoin de vous →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* HERO */}
        <section className="mb-10 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200">
            🚀 Pourquoi EleveAI
          </div>

          <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Plusieurs portes pour apprendre les maths
          </h1>

          <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-slate-700 sm:text-lg">
            Chaque élève est différent. Certains progressent mieux avec des défis chronométrés,
            d'autres avec un bilan de notions, d'autres encore avec un entraînement notion par notion.
            EleveAI propose <strong>8 portes d'entrée</strong> — l'élève choisit celle qui lui convient,
            et ses résultats sont suivis automatiquement.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/auth/signin-eleve"
              className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-white shadow-lg hover:bg-emerald-400"
            >
              🔐 Connexion élève
            </Link>
            <Link
              href="/parcours"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              🛤️ Faire mon bilan
            </Link>
          </div>
        </section>

        {/* CHIFFRES CLÉS */}
        <section className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {preuves.map((p) => (
            <div
              key={p.label}
              className="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 text-center shadow-md backdrop-blur"
            >
              <p className="text-2xl font-black text-emerald-700">{p.chiffre}</p>
              <p className="mt-1 text-xs font-bold text-slate-600">{p.label}</p>
            </div>
          ))}
        </section>

        {/* LES PORTES */}
        <section className="mb-10">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-slate-500">
            Les 8 portes d'entrée
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {portes.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 shadow-md backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`bg-gradient-to-br ${p.color} px-5 py-4`}>
                  <span className="text-3xl">{p.emoji}</span>
                </div>
                <div className="p-4">
                  <h2 className="font-black text-slate-950">{p.title}</h2>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">{p.text}</p>
                  <p className="mt-3 text-xs font-black text-emerald-700 transition group-hover:translate-x-1">
                    Découvrir →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SUIVI */}
        <section className="mb-10 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-xl backdrop-blur-xl sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">
            📊 Le suivi de progression — ce qui change tout
          </h2>
          <p className="mt-3 text-base font-semibold text-slate-700">
            Quand un élève est connecté avec son code élève, tous ses résultats sont
            enregistrés automatiquement dans son tableau de bord :
          </p>
          <ul className="mt-4 space-y-2 text-sm font-semibold text-slate-700">
            <li className="flex items-center gap-2"><span className="text-emerald-500">✅</span> Notions maîtrisées et fragiles (Parcours)</li>
            <li className="flex items-center gap-2"><span className="text-emerald-500">✅</span> Score et temps en Calcul rapide</li>
            <li className="flex items-center gap-2"><span className="text-emerald-500">✅</span> Réponses exactes aux Défis du jour</li>
            <li className="flex items-center gap-2"><span className="text-emerald-500">✅</span> Score des mini-défis English Maths</li>
            <li className="flex items-center gap-2"><span className="text-emerald-500">✅</span> Score sur 20 et notions travaillées au Coach Maths IA</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard-eleve"
              className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow hover:bg-emerald-400"
            >
              Voir mon tableau de bord
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              Offre établissement
            </Link>
          </div>
        </section>

        {/* ANCRÉ LA RÉUNION */}
        <section className="rounded-[2rem] border border-amber-200 bg-white/80 p-6 shadow-xl backdrop-blur text-center">
          <p className="text-3xl">🏝️</p>
          <h2 className="mt-2 text-xl font-black text-slate-950">
            Conçu à La Réunion, pour les enfants du monde entier
          </h2>
          <p className="mt-2 font-semibold text-slate-600 max-w-xl mx-auto">
            EleveAI est créé par un enseignant de maths en activité à La Réunion.
            Les défis s'inspirent du Piton de la Fournaise, du Grand Raid, de l'océan.
            Les niveaux suivent les programmes officiels français.
          </p>
          <Link
            href="/qui-sommes-nous"
            className="mt-5 inline-flex rounded-2xl bg-amber-400 px-6 py-3 text-sm font-black text-slate-950 shadow hover:bg-amber-300"
          >
            Qui sommes-nous →
          </Link>
        </section>

      </div>
    </main>
  );
}
