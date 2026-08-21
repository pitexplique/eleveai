"use client";

import Link from "next/link";
import Script from "next/script";

/**
 * LES PORTES, DANS L'ORDRE DONNÉ PAR FRÉDÉRIC LE 21/08/2026.
 *
 * « coach maths, coach français, coach espagnol, coach anglais, coach IA — puis
 * les parcours associés — puis les rituels — puis concours général et Concours
 * Avenir — puis les évaluations nationales — puis Pix IA. »
 *
 * ⭐ L'ordre EST une information : on apprend (les coachs), on fait le point
 * (les parcours), on entretient (les rituels), puis on passe les épreuves. La
 * rangée raconte une année scolaire, elle ne liste pas un catalogue.
 *
 * ⚠️ La liste précédente en montrait huit, toutes de maths, sur une page qui
 * annonce cinq matières deux blocs plus bas. Manquaient : les coachs français,
 * espagnol et IA, quatre parcours sur cinq, la dictée, les évaluations
 * nationales, Pix, le Concours Avenir, les cahiers et le guide de survie.
 *
 * ⛔ NE PAS RECOPIER LE NOMBRE DE PORTES ailleurs : `preuves` le compte sur ce
 * tableau. C'est ce qui a fait vivre un « 8 » périmé pendant des mois.
 */
const portes = [
  // ── Apprendre : les cinq coachs ────────────────────────────────────────
  {
    emoji: "🧠",
    title: "Coach Maths",
    text: "Un entraînement notion par notion, du CP à la Terminale. Missions progressives, score, badges.",
    href: "/coach-ia/maths",
    color: "from-orange-400 to-red-500",
  },
  {
    emoji: "📖",
    title: "Coach Français",
    text: "Du CP à la 3ᵉ : les sons, la grammaire, la conjugaison, notion par notion comme en maths.",
    href: "/coach-ia/francais",
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    emoji: "🗣️",
    title: "Coach Espagnol",
    text: "A1 → B2, avec l'audio : le vocabulaire, les verbes, les tournures du quotidien.",
    href: "/coach-ia/espagnol",
    color: "from-rose-500 to-red-600",
  },
  {
    emoji: "🇬🇧",
    title: "Coach Anglais",
    text: "English Maths, A1 → B2 : parler des maths en anglais, avec l'audio et un mini-défi.",
    href: "/coach-ia/english-maths",
    color: "from-sky-500 to-blue-600",
  },
  {
    emoji: "✳️",
    title: "Coach IA",
    text: "Ce qu'il faut savoir sur l'intelligence artificielle, calé sur le référentiel Pix.",
    href: "/coach-ia/ia",
    color: "from-cyan-500 to-teal-600",
  },

  // ── Faire le point : un parcours par matière ───────────────────────────
  {
    emoji: "🛤️",
    title: "Parcours Maths",
    text: "Un bilan clair : notions maîtrisées 🟢, à revoir 🟡, fragiles 🔴. L'élève sait où il en est.",
    href: "/parcours",
    color: "from-violet-500 to-indigo-600",
  },
  {
    emoji: "🛤️",
    title: "Parcours Français",
    text: "Le même bilan, matière par matière : ce qui est acquis, ce qui demande à être repris.",
    href: "/parcours-francais",
    color: "from-violet-500 to-purple-600",
  },
  {
    emoji: "🛤️",
    title: "Parcours Espagnol",
    text: "Où en est-on vraiment&nbsp;? Le point sur les notions travaillées, sans note ni classement.",
    href: "/parcours-espagnol",
    color: "from-indigo-500 to-violet-600",
  },
  {
    emoji: "🛤️",
    title: "Parcours Anglais",
    text: "Le bilan English Maths : le vocabulaire tenu, celui qui s'échappe encore.",
    href: "/parcours-english-maths",
    color: "from-blue-500 to-indigo-600",
  },
  {
    emoji: "🛤️",
    title: "Parcours IA",
    text: "Le point sur les compétences numériques, dans l'ordre du référentiel.",
    href: "/parcours-ia",
    color: "from-teal-500 to-cyan-600",
  },

  // ── Entretenir : les rituels du jour ───────────────────────────────────
  {
    emoji: "⚡",
    title: "Calcul rapide",
    text: "7 questions en 5 minutes. Des sessions courtes pour muscler les automatismes.",
    href: "/calcul-rapide",
    color: "from-lime-400 to-green-600",
  },
  {
    emoji: "✍️",
    title: "Dictée du jour",
    text: "Une dictée courte chaque jour, lue à voix haute et corrigée mot à mot.",
    href: "/dictee-du-jour",
    color: "from-teal-500 to-cyan-600",
  },
  {
    emoji: "🎯",
    title: "Défis du jour",
    text: "Des défis inspirés de La Réunion — Piton de la Fournaise, Grand Raid, océan…",
    href: "/defis-du-jour",
    color: "from-pink-500 to-rose-600",
  },

  // ── Préparer une épreuve ───────────────────────────────────────────────
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
    text: "21 jours pour l'épreuve de maths spé : suites, fonctions, probabilités, logarithme…",
    href: "/coach-bac-spe",
    color: "from-blue-600 to-violet-700",
  },

  // ── Les concours ───────────────────────────────────────────────────────
  {
    emoji: "🏆",
    title: "Concours général",
    text: "Des questions de niveau supérieur, pour les élèves qui veulent aller plus loin.",
    href: "/concours-general",
    color: "from-amber-400 to-orange-500",
  },
  {
    emoji: "🥇",
    title: "Concours Avenir",
    text: "L'entraînement au concours des écoles d'ingénieurs post-bac, épreuve par épreuve.",
    href: "/concours-avenir",
    color: "from-yellow-400 to-amber-600",
  },

  // ── Les évaluations, puis Pix ──────────────────────────────────────────
  {
    emoji: "📝",
    title: "Évaluations nationales",
    text: "6ᵉ et 4ᵉ, français et maths, dans les conditions réelles — et corrigées tout de suite.",
    href: "/evaluation-nationale-college",
    color: "from-slate-500 to-slate-700",
  },
  {
    emoji: "🎖️",
    title: "Pix IA",
    text: "Une évaluation blanche sur le référentiel Pix, pour savoir où l'on se situe avant la vraie.",
    href: "/eval-pix-ia",
    color: "from-cyan-600 to-blue-700",
  },

  // ── Et les deux portes en papier — celles qui amènent vraiment du monde :
  //    les cahiers font 74 % du trafic du site, et ils circulent hors du site,
  //    de parent à parent.
  {
    emoji: "☀️",
    title: "Cahiers de vacances",
    text: "14 cahiers à imprimer, de la GS au post-bac. Trente jours, un par page, corrigés compris.",
    href: "/cahier-vacances",
    color: "from-amber-400 to-yellow-500",
  },
  {
    emoji: "🆘",
    title: "Guide de survie",
    text: "L'essentiel d'une année sur quelques feuilles, à garder sous la main toute l'année.",
    href: "/guide-de-survie",
    color: "from-red-500 to-orange-600",
  },
];

// ⚠️ CES QUATRE NOMBRES SE RECOMPTENT, ILS NE SE RECOPIENT PAS (21/08/2026).
// « CM1 → Bac » était faux depuis des mois — le site commence au CP — et
// « 8 » l'était devenu à la seconde où une porte s'est ajoutée. Un chiffre
// écrit à la main sur une page vieillit sans prévenir : le nombre de portes se
// lit désormais dans le tableau lui-même.
const preuves = [
  { chiffre: "CP → Bac", label: "Niveaux couverts" },
  { chiffre: String(portes.length), label: "Portes d'entrée" },
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
      "EleveAI : de multiples portes pour s'entraîner, s'amuser et s'évaluer — maths, français, anglais, espagnol et IA, du CP au Bac, avec la progression suivie.",
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
            {/* ⭐ LA LÉGENDE SOUS LE DESSIN (Frédéric, 21/08/2026), et elle n'est
                pas décorative : elle relie le dessin à la thèse de la page, qui
                s'appelle « Plusieurs portes pour apprendre ». Le cœur montre un
                epsilon qui avance d'un carreau à l'autre — la légende dit que
                ce carreau-là, ce détail-là, peut tout changer, et qu'il n'est
                pas le même pour chaque enfant. C'est le pont entre l'histoire
                et l'argument. ⛔ Ses mots, on n'y touche pas. */}
            <figure className="m-0">
              <div className="overflow-hidden rounded-2xl border border-slate-200" style={{ backgroundColor: "#fcfcf7" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/coeur-epsilon-infini.svg"
                  alt="Un cœur dessiné au stylo bleu : un epsilon, les indices i j k n, un réseau de neurones, les nombres 1 2 3 4, l'infini — et une flèche qui s'échappe"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm font-bold italic leading-relaxed text-slate-600">
                Un détail peut tout changer, surtout si on a plusieurs portes pour
                apprendre.
              </figcaption>
            </figure>
            <div className="space-y-4 text-base font-semibold leading-relaxed text-slate-700">
              <p>
                {/* « juillet » → « mars » (Frédéric, 21/08/2026) : c'est lui qui
                    l'a dessiné, c'est lui qui sait quand. ⚠️ Ne pas confondre
                    avec l'AUTRE dessin d'un soir de juillet, celui de
                    /loi-performance (ADN → coefficients → réseau) : deux
                    feuilles, deux soirs, et celui-là n'est pas touché. */}
                Un soir de mars, un prof de maths a dessiné un cœur sur une feuille à
                carreaux. Dedans&nbsp;: un <strong>ε</strong> — l&apos;infiniment petit. Le grand
                mathématicien Erdős appelait les enfants «&nbsp;des epsilons&nbsp;».
              </p>
              <p>
                L&apos;epsilon avance pas à pas — <em>i, j, k, n</em>, un exercice après
                l&apos;autre — et traverse un <strong>réseau de neurones</strong>&nbsp;:
                l&apos;IA est <em>dans</em> le cœur, jamais au-dessus. Il en ressort en
                comptant 1, 2, 3, 4… jusqu&apos;à <strong>l&apos;infini</strong>.
              </p>
              {/* ⛔ LE PROVERBE EST RETIRÉ (Frédéric, 21/08/2026). « In min i lav
                  lot » dit la RÉCIPROCITÉ — je t'aide, tu m'aides — quand le
                  paragraphe au-dessus parle d'ACCUMULATION : le petit répété qui
                  engendre l'immense. Ce sont deux idées, et le « font pareil »
                  promettait une équivalence que le proverbe ne tient pas.
                  ⚠️ Il n'est pas faux, il est ailleurs : sa version LONGUE
                  (« … toulédé lav la figir », les deux lavent le visage) ajoute
                  le résultat de l'entraide et retombe, elle, sur l'engendrement.
                  Si le proverbe revient un jour, que ce soit celle-là. */}
              <p>
                Les petites actions du quotidien font pareil&nbsp;: aider, expliquer,
                réessayer.
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

          {/* ⭐ LE TITRE (Frédéric, 21/08/2026). Il disait « pour apprendre LES
              MATHS » alors que la page annonce cinq matières et que la rangée en
              dessous porte le français, l'espagnol, l'anglais et l'IA. Les trois
              verbes disent aussi ce que « apprendre » cachait : on ne fait pas
              que travailler ici, on s'amuse et on se mesure.
              ⚠️ C'est le SECOND <h1> de la page — le premier ouvre le cœur
              ε → ∞. Deux titres de premier niveau, un moteur ne sait pas de quoi
              parle la page : à passer en <h2>, mais pas dans la même minute que
              le texte, sinon on ne saura pas ce qui a bougé. */}
          <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Multiples portes pour s&apos;entraîner, s&apos;amuser et s&apos;évaluer
          </h1>

          <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-slate-700 sm:text-lg">
            Chaque élève est différent. Certains progressent mieux avec des défis chronométrés,
            d&apos;autres avec un bilan de notions, d&apos;autres encore avec un entraînement notion
            par notion. EleveAI ouvre <strong>{portes.length} portes</strong> dans cinq matières,
            du CP au Bac — l&apos;élève choisit la sienne, et ses résultats le suivent.
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
            Les {portes.length} portes d&apos;entrée
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
