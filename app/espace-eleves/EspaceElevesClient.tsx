"use client";

// L'ESPACE ÉLÈVES — la vitrine « élève » vue des moteurs de recherche (elle
// tient la 2e place de la SERP de marque). Refonte du 25/07/2026 : la page
// datait du 13/07 et affichait encore « Bac le 16 juin », « Brevet J−30 »…
//
// Règles de cette page (pour qu'elle ne pourrisse plus) :
// 1. AUCUNE date, aucun badge périssable — que des piliers durables.
// 2. Le coach en tête d'affiche (règle 24/07 : le coach est LA destination).
// 3. Tout le reste vit dans /explorer (catalogue piloté par la base) — ici on
//    n'écrit à la main que les piliers : coachs, rituels, classes, machines.

import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import { NB_MACHINES } from "@/lib/simulateurs";

type EleveSession = {
  nom?: string | null;
  code_etablissement?: string | null;
  code_eleve?: string | null;
  code_utilisateur?: string | null;
};

// Les 5 coachs visibles (économie masquée — pas assez fournie).
const coachs = [
  {
    emoji: "🧮",
    title: "Coach Maths",
    description: "Des séries d'exercices corrigés par notion, du CP à la Terminale.",
    href: "/coach-ia/maths",
    color: "from-orange-400 to-red-500",
  },
  {
    emoji: "📖",
    title: "Coach Français",
    description: "Grammaire, conjugaison, vocabulaire — notion par notion.",
    href: "/coach-ia/francais",
    color: "from-sky-400 to-blue-500",
  },
  {
    emoji: "🇬🇧",
    title: "Coach English",
    description: "A1 → B2 : le vocabulaire, les phrases et les maths en anglais.",
    href: "/coach-ia/english-maths",
    color: "from-blue-500 to-indigo-600",
  },
  {
    emoji: "🇪🇸",
    title: "Coach Espagnol",
    description: "A1 → B2 : le vocabulaire et les expressions du quotidien.",
    href: "/coach-ia/espagnol",
    color: "from-red-400 to-rose-600",
  },
  {
    emoji: "🤖",
    title: "Coach IA",
    description: "Comprendre et maîtriser l'intelligence artificielle, A1 → C1.",
    href: "/coach-ia/ia",
    color: "from-cyan-400 to-teal-600",
  },
];

// Les rituels : courts, à refaire chaque jour — le rendez-vous du matin.
const rituels = [
  {
    emoji: "✍️",
    title: "La dictée du jour",
    description: "5 mots à écouter et écrire — mélange, ta classe ou prépa éval 6e.",
    href: "/dictee-du-jour",
    color: "from-sky-400 to-cyan-500",
  },
  {
    emoji: "🇬🇧",
    title: "L'anglais du jour",
    description: "5 mots avec audio, qui reviennent au bon moment pour être retenus.",
    href: "/anglais-du-jour",
    color: "from-indigo-400 to-blue-600",
  },
  {
    emoji: "🇪🇸",
    title: "L'espagnol du jour",
    description: "5 mots avec audio, du niveau débutant au niveau avancé.",
    href: "/espagnol-du-jour",
    color: "from-amber-400 to-red-500",
  },
  {
    emoji: "⚡",
    title: "Calcul rapide",
    description: "5 minutes pour renforcer tes automatismes de calcul.",
    href: "/calcul-rapide",
    color: "from-lime-400 to-green-600",
  },
  {
    emoji: "🎯",
    title: "Le défi du jour",
    description: "Un problème inspiré de La Réunion — volcan, Grand Raid, océan…",
    href: "/defis-du-jour",
    color: "from-pink-500 to-rose-600",
  },
];

// Un clic = le coach maths réglé sur sa classe — l'échelle COMPLÈTE, du CP à
// la Terminale (les slugs sont ceux de la whitelist du coach).
const classes = [
  { label: "CP",  href: "/coach-ia/maths?classe=cp" },
  { label: "CE1", href: "/coach-ia/maths?classe=ce1" },
  { label: "CE2", href: "/coach-ia/maths?classe=ce2" },
  { label: "CM1", href: "/coach-ia/maths?classe=cm1" },
  { label: "CM2", href: "/coach-ia/maths?classe=cm2" },
  { label: "6e",  href: "/coach-ia/maths?classe=6e" },
  { label: "5e",  href: "/coach-ia/maths?classe=5e" },
  { label: "4e",  href: "/coach-ia/maths?classe=4e" },
  { label: "3e",  href: "/coach-ia/maths?classe=3e" },
  { label: "2nde", href: "/coach-ia/maths?classe=seconde" },
  { label: "1re spé", href: "/coach-ia/maths?classe=premiere-spe" },
  { label: "Term spé", href: "/coach-ia/maths?classe=terminale-spe" },
];

// Faire le point & comprendre — les autres piliers durables.
const decouvrir = [
  {
    emoji: "🛤️",
    title: "Parcours",
    description: "Fais un bilan de tes notions : maîtrisées, à revoir ou fragiles.",
    href: "/parcours",
    color: "from-violet-500 to-indigo-600",
  },
  {
    emoji: "🌋",
    title: `${NB_MACHINES} machines dans ta main`,
    description: "Cyclone, volcan, barrage, lagon… tu règles un curseur, l'île réagit.",
    href: "/simulateurs",
    color: "from-emerald-400 to-teal-600",
  },
  {
    emoji: "📚",
    title: "Fiches de cours",
    description: "L'essentiel d'une notion, avec exercices corrigés, à lire ou imprimer.",
    href: "/fiches-cours",
    color: "from-amber-400 to-orange-500",
  },
  {
    emoji: "🔤",
    title: "Le Dico",
    description: "Les mots et les gestes numériques pour préparer l'éval nationale.",
    href: "/dico",
    color: "from-cyan-500 to-sky-600",
  },
];

function CarteAction({
  emoji,
  title,
  description,
  href,
  color,
}: (typeof coachs)[number]) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className={`bg-gradient-to-br ${color} px-5 py-5`}>
        <span className="text-4xl">{emoji}</span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-black text-slate-950">{title}</h3>
        <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">
          {description}
        </p>
        <p className="mt-3 text-xs font-black text-emerald-700 transition group-hover:translate-x-1">
          Commencer →
        </p>
      </div>
    </Link>
  );
}

export default function EspaceElevesClient() {
  const eleveContext = useEleve() as unknown as { eleve?: EleveSession | null };
  const eleve = eleveContext.eleve ?? null;

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
            <linearGradient id="ee-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ECFDF5" />
              <stop offset="40%" stopColor="#EFF6FF" />
              <stop offset="100%" stopColor="#FFF7ED" />
            </linearGradient>
            <radialGradient id="ee-g1" cx="15%" cy="20%" r="50%">
              <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ee-g2" cx="85%" cy="15%" r="50%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ee-g3" cx="50%" cy="90%" r="55%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ee-g4" cx="80%" cy="70%" r="40%">
              <stop offset="0%" stopColor="#F9A8D4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F9A8D4" stopOpacity="0" />
            </radialGradient>
            <filter id="ee-blur">
              <feGaussianBlur stdDeviation="25" />
            </filter>
          </defs>

          <rect width="1440" height="1000" fill="url(#ee-bg)" />
          <rect width="1440" height="1000" fill="url(#ee-g1)" />
          <rect width="1440" height="1000" fill="url(#ee-g2)" />
          <rect width="1440" height="1000" fill="url(#ee-g3)" />
          <rect width="1440" height="1000" fill="url(#ee-g4)" />

          {/* Cercles décoratifs */}
          <circle cx="160" cy="180" r="140" fill="#34D399" opacity="0.18" filter="url(#ee-blur)" />
          <circle cx="1260" cy="160" r="160" fill="#60A5FA" opacity="0.2" filter="url(#ee-blur)" />
          <circle cx="720" cy="820" r="200" fill="#FBBF24" opacity="0.15" filter="url(#ee-blur)" />
          <circle cx="1100" cy="650" r="130" fill="#F472B6" opacity="0.18" filter="url(#ee-blur)" />
          <circle cx="280" cy="700" r="110" fill="#A78BFA" opacity="0.18" filter="url(#ee-blur)" />

          {/* Étoiles / formes géométriques joyeuses */}
          <polygon points="1350,80 1360,110 1390,110 1366,128 1375,158 1350,140 1325,158 1334,128 1310,110 1340,110"
            fill="#FDE68A" opacity="0.5" />
          <polygon points="90,600 100,630 130,630 106,648 115,678 90,660 65,678 74,648 50,630 80,630"
            fill="#6EE7B7" opacity="0.45" />
          <circle cx="1380" cy="400" r="18" fill="#F9A8D4" opacity="0.6" />
          <circle cx="60" cy="350" r="14" fill="#93C5FD" opacity="0.6" />
          <circle cx="700" cy="60" r="22" fill="#FDE68A" opacity="0.5" />
          <rect x="1200" y="500" width="30" height="30" rx="6" fill="#6EE7B7" opacity="0.4" transform="rotate(20,1215,515)" />
          <rect x="200" y="440" width="24" height="24" rx="5" fill="#F9A8D4" opacity="0.45" transform="rotate(-15,212,452)" />

          {/* Symboles maths discrets */}
          <g opacity="0.12" fill="#1E40AF" fontFamily="serif" fontSize="52" fontWeight="900">
            <text x="100" y="280">+</text>
            <text x="1320" y="300">÷</text>
            <text x="640" y="940">×</text>
            <text x="1100" y="200">π</text>
            <text x="300" y="880">%</text>
          </g>

          {/* Vague basse blanche */}
          <path
            d="M0 870 C240 820 480 870 720 840 C960 810 1200 860 1440 830 L1440 1000 L0 1000 Z"
            fill="white"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* ── CONTENU ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 py-10">

        {/* HERO */}
        <section className="mb-10 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200">
                🚀 EleveAI · Espace élèves
              </div>

              <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
                Ton espace pour apprendre, du CP au Bac 🎯
              </h1>

              <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-slate-700 sm:text-lg">
                Cinq coachs — maths, français, anglais, espagnol, IA — des rituels
                chaque jour, des parcours pour faire le point et des machines pour
                comprendre. Gratuit, à ton rythme et sans jugement.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {eleve ? (
                  <Link
                    href="/dashboard-eleve"
                    className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-emerald-400"
                  >
                    📊 Voir mon tableau de bord
                  </Link>
                ) : (
                  <Link
                    href="/auth/signin-eleve"
                    className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-emerald-400"
                  >
                    🔐 Me connecter
                  </Link>
                )}
                <Link
                  href="/coach-ia/maths"
                  className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
                >
                  🧮 M&apos;entraîner maintenant
                </Link>
                <Link
                  href="/explorer"
                  className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
                >
                  🧭 Tout explorer
                </Link>
              </div>
            </div>

            {/* Infos élève connecté */}
            {eleve && (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-center lg:min-w-[220px]">
                <div className="text-4xl">👋</div>
                <p className="mt-2 text-xl font-black text-emerald-950">
                  {eleve.nom ?? "Élève"}
                </p>
                <p className="mt-1 text-xs font-bold text-emerald-700">
                  {eleve.code_etablissement} · {eleve.code_eleve ?? eleve.code_utilisateur}
                </p>
                <Link
                  href="/dashboard-eleve"
                  className="mt-4 block rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-black text-white hover:bg-emerald-500"
                >
                  Mon dashboard →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* LES COACHS — en tête d'affiche (le coach est LA destination) */}
        <section className="mb-10">
          <p className="mb-1 text-xs font-black uppercase tracking-[0.25em] text-slate-500">
            Commence ici · un coach par matière
          </p>
          <p className="mb-4 text-sm font-semibold text-slate-500">
            Le cœur d&apos;EleveAI : des séries d&apos;exercices corrigés, notion
            par notion, qui s&apos;adaptent à ton niveau.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {coachs.map((c) => (
              <CarteAction key={c.href} {...c} />
            ))}
          </div>
        </section>

        {/* CHOISIR SA CLASSE */}
        <section className="mb-10">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-slate-500">
            Ou commence par ta classe
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {classes.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group rounded-2xl border border-white/80 bg-white/80 p-4 text-center shadow-lg backdrop-blur transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-xl"
              >
                <span className="text-xl font-black text-slate-950 sm:text-2xl">{c.label}</span>
                <div className="mt-2 rounded-full bg-emerald-400 px-2 py-0.5 text-[10px] font-black text-slate-950 transition group-hover:scale-110">
                  Go →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* LES RITUELS DU JOUR */}
        <section className="mb-10">
          <p className="mb-1 text-xs font-black uppercase tracking-[0.25em] text-slate-500">
            ⏰ Chaque jour · tes rituels
          </p>
          <p className="mb-4 text-sm font-semibold text-slate-500">
            Courts, à refaire chaque jour — et une série 🔥 à faire grandir.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {rituels.map((r) => (
              <CarteAction key={r.href} {...r} />
            ))}
          </div>
        </section>

        {/* FAIRE LE POINT & COMPRENDRE */}
        <section className="mb-10">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-slate-500">
            Faire le point &amp; comprendre
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {decouvrir.map((d) => (
              <CarteAction key={d.href} {...d} />
            ))}
          </div>
          <div className="mt-6 rounded-[1.5rem] border border-white/80 bg-white/75 p-5 text-center shadow-lg backdrop-blur">
            <p className="text-sm font-bold text-slate-700">
              Et ce n&apos;est pas tout : défis, concours, cahiers de vacances,
              podcast, cartes à imprimer…
            </p>
            <Link
              href="/explorer"
              className="mt-3 inline-flex rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-indigo-500"
            >
              🧭 Explorer tout le catalogue →
            </Link>
          </div>
        </section>

        {/* CTA CONNEXION si non connecté */}
        {!eleve && (
          <section className="mt-10 rounded-[2rem] border border-emerald-200 bg-white/80 p-6 text-center shadow-xl backdrop-blur">
            <p className="text-2xl font-black text-slate-950">
              Tu veux suivre ta progression ?
            </p>
            <p className="mt-2 font-semibold text-slate-600">
              Connecte-toi avec ton code élève pour enregistrer tes résultats et
              voir ton évolution. Tout ce qui sert à apprendre reste gratuit.
            </p>
            <Link
              href="/auth/signin-eleve"
              className="mt-5 inline-flex rounded-2xl bg-emerald-500 px-8 py-4 text-base font-black text-white shadow-lg transition hover:bg-emerald-400"
            >
              🔐 Me connecter avec mon code élève
            </Link>
          </section>
        )}

      </div>
    </main>
  );
}
