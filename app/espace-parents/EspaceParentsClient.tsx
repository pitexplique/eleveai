"use client";

import Link from "next/link";

const outils = [
  {
    emoji: "📊",
    title: "Tableau de bord élève",
    description: "Votre enfant peut consulter tous ses résultats enregistrés : parcours, calcul rapide, défis et English Maths.",
    href: "/dashboard-eleve",
    color: "from-emerald-400 to-teal-500",
  },
  {
    emoji: "🛤️",
    title: "Parcours de notions",
    description: "Un bilan clair des notions maîtrisées, à revoir ou fragiles. Idéal pour cibler les révisions.",
    href: "/parcours",
    color: "from-violet-500 to-indigo-600",
  },
  {
    emoji: "📚",
    title: "Coach Brevet",
    description: "Sprint 30 jours pour préparer le brevet des collèges. Automatismes, problèmes guidés et sujets express.",
    href: "/coach-brevet",
    color: "from-emerald-500 to-cyan-600",
  },
  {
    emoji: "🧠",
    title: "Coach Maths IA",
    description: "Un entraînement adapté, notion par notion, du CM1 à la Terminale. L'élève progresse à son rythme.",
    href: "/coach-ia/maths",
    color: "from-orange-400 to-red-500",
  },
  {
    emoji: "⚡",
    title: "Calcul rapide",
    description: "7 questions en 5 minutes pour renforcer les automatismes. Résultats enregistrés si l'élève est connecté.",
    href: "/calcul-rapide",
    color: "from-lime-400 to-green-600",
  },
  {
    emoji: "🇬🇧",
    title: "English Maths",
    description: "La semaine des verbes en anglais, avec audio et mini-défi.",
    href: "/english-maths",
    color: "from-sky-500 to-blue-600",
  },
];

const rassurances = [
  {
    emoji: "🔐",
    title: "Accès sécurisé par code",
    text: "Votre enfant se connecte avec un code établissement et un code élève fourni par l'école. Aucun email ni mot de passe personnel.",
  },
  {
    emoji: "📈",
    title: "Progression visible",
    text: "Tous les scores sont enregistrés dans un tableau de bord. Vous pouvez suivre les progrès notion par notion.",
  },
  {
    emoji: "🎯",
    title: "Centré sur l'apprentissage",
    text: "EleveAI ne donne pas les réponses directement. L'élève cherche, comprend, puis vérifie. Pas de triche possible.",
  },
  {
    emoji: "🏝️",
    title: "Ancré à La Réunion",
    text: "Les défis et exemples sont inspirés du contexte local : Piton de la Fournaise, Grand Raid, biodiversité de l'île.",
  },
];

export default function EspaceParentsClient() {
  return (
    <main className="relative min-h-screen overflow-hidden text-slate-950">

      {/* ── FOND SVG JOYEUX ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 1000"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ep-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="50%" stopColor="#EFF6FF" />
              <stop offset="100%" stopColor="#FFFBEB" />
            </linearGradient>
            <radialGradient id="ep-g1" cx="10%" cy="20%" r="50%">
              <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#86EFAC" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ep-g2" cx="88%" cy="18%" r="50%">
              <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ep-g3" cx="50%" cy="88%" r="55%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
            </radialGradient>
            <filter id="ep-blur"><feGaussianBlur stdDeviation="28" /></filter>
          </defs>

          <rect width="1440" height="1000" fill="url(#ep-bg)" />
          <rect width="1440" height="1000" fill="url(#ep-g1)" />
          <rect width="1440" height="1000" fill="url(#ep-g2)" />
          <rect width="1440" height="1000" fill="url(#ep-g3)" />

          <circle cx="140" cy="160" r="130" fill="#4ADE80" opacity="0.18" filter="url(#ep-blur)" />
          <circle cx="1300" cy="150" r="150" fill="#38BDF8" opacity="0.18" filter="url(#ep-blur)" />
          <circle cx="720" cy="840" r="190" fill="#FCD34D" opacity="0.14" filter="url(#ep-blur)" />
          <circle cx="300" cy="680" r="100" fill="#C084FC" opacity="0.16" filter="url(#ep-blur)" />
          <circle cx="1150" cy="620" r="120" fill="#F9A8D4" opacity="0.15" filter="url(#ep-blur)" />

          {/* Étoiles décoratives */}
          <polygon points="1380,70 1390,100 1420,100 1396,118 1405,148 1380,130 1355,148 1364,118 1340,100 1370,100"
            fill="#FDE68A" opacity="0.5" />
          <polygon points="70,580 80,610 110,610 86,628 95,658 70,640 45,658 54,628 30,610 60,610"
            fill="#86EFAC" opacity="0.45" />
          <circle cx="60" cy="320" r="14" fill="#93C5FD" opacity="0.55" />
          <circle cx="1390" cy="400" r="16" fill="#F9A8D4" opacity="0.55" />
          <rect x="1220" y="490" width="26" height="26" rx="6" fill="#86EFAC" opacity="0.4" transform="rotate(20,1233,503)" />

          <g opacity="0.1" fill="#1E40AF" fontFamily="serif" fontSize="50" fontWeight="900">
            <text x="110" y="270">+</text>
            <text x="1310" y="290">÷</text>
            <text x="640" y="940">×</text>
            <text x="1080" y="200">π</text>
          </g>

          <path d="M0 870 C240 820 480 870 720 840 C960 810 1200 860 1440 830 L1440 1000 L0 1000 Z"
            fill="white" opacity="0.55" />
        </svg>
      </div>

      {/* ── CONTENU ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 py-10">

        {/* HERO */}
        <section className="mb-10 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-sky-800 ring-1 ring-sky-200">
            👨‍👩‍👧 EleveAI · Espace parents
          </div>

          <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Accompagner votre enfant avec EleveAI
          </h1>

          <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-slate-700">
            EleveAI est une plateforme de soutien en maths pour les collégiens et lycéens.
            Votre enfant s&apos;entraîne à son rythme, enregistre ses scores et suit sa progression
            notion par notion — du CM1 au Bac Spé.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/auth/signin-eleve"
              className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-white shadow-lg hover:bg-emerald-400"
            >
              🔐 Connexion élève
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
            >
              📩 Nous contacter
            </Link>
          </div>
        </section>

        {/* CE QUI RASSURE */}
        <section className="mb-10">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-slate-500">
            Ce que vous devez savoir
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {rassurances.map((r) => (
              <div
                key={r.title}
                className="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 shadow-md backdrop-blur"
              >
                <div className="mb-2 text-3xl">{r.emoji}</div>
                <h2 className="text-base font-black text-slate-950">{r.title}</h2>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OUTILS */}
        <section className="mb-10">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-slate-500">
            Les outils disponibles
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {outils.map((o) => (
              <Link
                key={o.href}
                href={o.href}
                className="group overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 shadow-md backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`bg-gradient-to-br ${o.color} px-5 py-4`}>
                  <span className="text-3xl">{o.emoji}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-black text-slate-950">{o.title}</h3>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">
                    {o.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* OFFRE ÉTABLISSEMENT */}
        <section className="rounded-[2rem] border border-emerald-200 bg-white/80 p-6 shadow-xl backdrop-blur text-center">
          <p className="text-2xl font-black text-slate-950">Votre collège utilise EleveAI ?</p>
          <p className="mt-2 font-semibold text-slate-600 max-w-xl mx-auto">
            Si votre enfant a reçu un code élève de son établissement, il peut se connecter directement
            et accéder à tous les outils gratuitement.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/signin-eleve"
              className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-white shadow-lg hover:bg-emerald-400"
            >
              Se connecter avec un code élève
            </Link>
            <Link
              href="/faq/faq-parents"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              FAQ Parents
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
