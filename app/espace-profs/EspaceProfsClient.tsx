"use client";

import Link from "next/link";

const fonctionnalites = [
  {
    emoji: "🔑",
    title: "Codes élèves",
    description: "Créez des codes élèves pour votre classe. Chaque élève se connecte avec son code et accède à tous les outils.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    emoji: "📊",
    title: "Suivi des résultats",
    description: "Consultez les scores de vos élèves : parcours, calcul rapide, défis du jour, English Maths et Coach IA.",
    color: "from-sky-400 to-blue-600",
  },
  {
    emoji: "🛤️",
    title: "Parcours de notions",
    description: "Chaque élève fait un bilan de ses notions. Vous voyez en un coup d'œil ce qui est maîtrisé ou fragile.",
    color: "from-violet-500 to-indigo-600",
  },
  {
    emoji: "📚",
    title: "Sprint Brevet / Bac",
    description: "Des programmes de révision structurés sur 30 jours (Brevet) et 21 jours (Bac Spé Maths).",
    color: "from-amber-400 to-orange-500",
  },
  {
    emoji: "⚡",
    title: "Calcul rapide",
    description: "Sessions chronométrées pour muscler les automatismes. Les scores sont enregistrés par élève.",
    color: "from-lime-400 to-green-600",
  },
  {
    emoji: "🇬🇧",
    title: "English Maths",
    description: "Vocabulaire mathématique bilingue — utile pour les sections européennes ou les DNL.",
    color: "from-pink-400 to-rose-500",
  },
];

const etapes = [
  { num: "1", title: "Demandez un accès pilote", text: "Contactez-nous pour créer les codes de votre établissement." },
  { num: "2", title: "Distribuez les codes", text: "Chaque élève reçoit son code établissement + code élève." },
  { num: "3", title: "Les élèves se connectent", text: "Connexion en 10 secondes sur /auth/signin-eleve, aucune installation." },
  { num: "4", title: "Suivez la progression", text: "Les résultats s'enregistrent automatiquement dans la base de données." },
];

export default function EspaceProfsClient() {
  return (
    <main className="relative min-h-screen overflow-hidden text-slate-950">

      {/* ── FOND SVG ─────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 1000"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ep2-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EFF6FF" />
              <stop offset="50%" stopColor="#F0FDF4" />
              <stop offset="100%" stopColor="#FFFBEB" />
            </linearGradient>
            <radialGradient id="ep2-g1" cx="12%" cy="18%" r="50%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ep2-g2" cx="85%" cy="20%" r="50%">
              <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ep2-g3" cx="50%" cy="90%" r="55%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
            </radialGradient>
            <filter id="ep2-blur"><feGaussianBlur stdDeviation="28" /></filter>
          </defs>

          <rect width="1440" height="1000" fill="url(#ep2-bg)" />
          <rect width="1440" height="1000" fill="url(#ep2-g1)" />
          <rect width="1440" height="1000" fill="url(#ep2-g2)" />
          <rect width="1440" height="1000" fill="url(#ep2-g3)" />

          <circle cx="130" cy="170" r="130" fill="#60A5FA" opacity="0.18" filter="url(#ep2-blur)" />
          <circle cx="1310" cy="160" r="150" fill="#4ADE80" opacity="0.18" filter="url(#ep2-blur)" />
          <circle cx="720" cy="840" r="190" fill="#FCD34D" opacity="0.14" filter="url(#ep2-blur)" />
          <circle cx="1130" cy="600" r="110" fill="#A78BFA" opacity="0.16" filter="url(#ep2-blur)" />
          <circle cx="290" cy="680" r="100" fill="#F9A8D4" opacity="0.15" filter="url(#ep2-blur)" />

          <polygon points="1370,65 1380,95 1410,95 1386,113 1395,143 1370,125 1345,143 1354,113 1330,95 1360,95"
            fill="#FDE68A" opacity="0.5" />
          <polygon points="65,570 75,600 105,600 81,618 90,648 65,630 40,648 49,618 25,600 55,600"
            fill="#93C5FD" opacity="0.45" />

          <g opacity="0.1" fill="#1E40AF" fontFamily="serif" fontSize="50" fontWeight="900">
            <text x="100" y="270">∑</text>
            <text x="1320" y="290">f(x)</text>
            <text x="640" y="940">π</text>
          </g>

          <path d="M0 870 C240 820 480 870 720 840 C960 810 1200 860 1440 830 L1440 1000 L0 1000 Z"
            fill="white" opacity="0.55" />
        </svg>
      </div>

      {/* ── CONTENU ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 py-10">

        {/* HERO */}
        <section className="mb-10 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-800 ring-1 ring-blue-200">
            👩‍🏫 EleveAI · Espace professeurs
          </div>

          <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            EleveAI dans votre classe 🎓
          </h1>

          <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-slate-700">
            Donnez à vos élèves un accès personnalisé à EleveAI. Ils s&apos;entraînent,
            progressent et enregistrent leurs résultats. Vous suivez leur progression
            notion par notion, en temps réel.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg hover:bg-blue-500"
            >
              📩 Demander un accès pilote
            </Link>
            <Link
              href="/faq/faq-professeurs"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
            >
              FAQ Professeurs
            </Link>
          </div>
        </section>

        {/* ÉTAPES */}
        <section className="mb-10">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-slate-500">
            Comment ça marche
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {etapes.map((e) => (
              <div
                key={e.num}
                className="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 shadow-md backdrop-blur"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-xl font-black text-blue-800">
                  {e.num}
                </div>
                <h2 className="font-black text-slate-950">{e.title}</h2>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">{e.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FONCTIONNALITÉS */}
        <section className="mb-10">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-slate-500">
            Ce qu&apos;EleveAI propose
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fonctionnalites.map((f) => (
              <div
                key={f.title}
                className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 shadow-md backdrop-blur"
              >
                <div className={`bg-gradient-to-br ${f.color} px-5 py-4`}>
                  <span className="text-3xl">{f.emoji}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-black text-slate-950">{f.title}</h3>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-[2rem] border border-blue-200 bg-white/80 p-6 shadow-xl backdrop-blur text-center">
          <p className="text-2xl font-black text-slate-950">
            Intéressé pour votre établissement ?
          </p>
          <p className="mt-2 font-semibold text-slate-600 max-w-xl mx-auto">
            EleveAI est en phase pilote. Contactez-nous pour tester la plateforme avec votre classe,
            sans engagement.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg hover:bg-blue-500"
            >
              📩 Nous contacter
            </Link>
            <Link
              href="/offre-pilote"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              Voir l&apos;offre pilote
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
