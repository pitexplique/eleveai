"use client";

import Link from "next/link";

const offres = [
  {
    nom: "Accès Pilote",
    badge: "Gratuit · 4 semaines",
    badgeColor: "bg-emerald-100 text-emerald-800",
    prix: "Gratuit",
    soustitre: "Pour tester avec une classe",
    description: "Accès complet pour une classe pendant 4 semaines. Idéal pour évaluer EleveAI avant de s'engager.",
    inclus: [
      "Jusqu'à 35 élèves",
      "Tous les outils débloqués",
      "Dashboard professeur inclus",
      "Accompagnement par l'équipe",
      "Sans engagement",
    ],
    cta: "Demander le pilote",
    ctaHref: "/contact",
    ctaColor: "bg-emerald-500 hover:bg-emerald-400 text-white",
    highlight: false,
  },
  {
    nom: "Établissement",
    badge: "⭐ Recommandé",
    badgeColor: "bg-blue-100 text-blue-800",
    prix: "Sur devis",
    soustitre: "Pour un ou plusieurs niveaux",
    description: "Accès annuel pour tout ou partie de l'établissement. Tarif adapté au nombre de classes et d'élèves.",
    inclus: [
      "Nombre de classes à définir",
      "Codes élèves et profs créés par nos soins",
      "Dashboard principal inclus",
      "Suivi notion par notion",
      "Support dédié",
      "Formation initiale incluse",
    ],
    cta: "Demander un devis",
    ctaHref: "/contact",
    ctaColor: "bg-blue-600 hover:bg-blue-500 text-white",
    highlight: true,
  },
  {
    nom: "Famille",
    badge: "Bientôt disponible",
    badgeColor: "bg-amber-100 text-amber-800",
    prix: "~7 €/mois",
    soustitre: "Pour un élève individuel",
    description: "Un accès personnel pour votre enfant, sans passer par l'établissement. En cours de préparation.",
    inclus: [
      "1 élève",
      "Tous les outils",
      "Dashboard élève",
      "Sans contrat d'établissement",
      "Résiliation libre",
    ],
    cta: "Être notifié à l'ouverture",
    ctaHref: "/contact",
    ctaColor: "bg-amber-400 hover:bg-amber-300 text-slate-950",
    highlight: false,
  },
];

const faq = [
  {
    q: "Les élèves doivent-ils payer ?",
    a: "Non. Les élèves accèdent à EleveAI avec un code fourni par leur établissement. Aucun paiement n'est demandé aux élèves ni aux familles dans le cadre scolaire.",
  },
  {
    q: "Comment fonctionne le pilote gratuit ?",
    a: "Nous créons les codes pour une classe (jusqu'à 35 élèves) et vous accompagnons pendant 4 semaines. Si vous êtes satisfait, on discute d'un accès annuel. Aucun engagement.",
  },
  {
    q: "Quel est le tarif pour un collège complet ?",
    a: "Le tarif dépend du nombre de classes et d'élèves. Contactez-nous pour une proposition adaptée à votre établissement.",
  },
  {
    q: "Y a-t-il un contrat à signer ?",
    a: "Pour l'accès établissement, oui — un contrat simple qui précise les conditions d'accès, la protection des données et la durée. Conforme au RGPD.",
  },
  {
    q: "Quand sera disponible l'abonnement famille ?",
    a: "L'accès famille individuel est en cours de préparation. Laissez votre contact via le formulaire pour être parmi les premiers informés.",
  },
];

export default function TarifsClient() {
  return (
    <main className="relative min-h-screen overflow-hidden text-slate-950">

      {/* FOND SVG */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg className="h-full w-full" viewBox="0 0 1440 1100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="tar-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="50%" stopColor="#EFF6FF" />
              <stop offset="100%" stopColor="#FFFBEB" />
            </linearGradient>
            <radialGradient id="tar-g1" cx="10%" cy="15%" r="50%">
              <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#86EFAC" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="tar-g2" cx="90%" cy="15%" r="50%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="tar-g3" cx="50%" cy="90%" r="55%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
            </radialGradient>
            <filter id="tar-blur"><feGaussianBlur stdDeviation="28" /></filter>
          </defs>
          <rect width="1440" height="1100" fill="url(#tar-bg)" />
          <rect width="1440" height="1100" fill="url(#tar-g1)" />
          <rect width="1440" height="1100" fill="url(#tar-g2)" />
          <rect width="1440" height="1100" fill="url(#tar-g3)" />
          <circle cx="130" cy="170" r="140" fill="#4ADE80" opacity="0.18" filter="url(#tar-blur)" />
          <circle cx="1310" cy="160" r="160" fill="#60A5FA" opacity="0.18" filter="url(#tar-blur)" />
          <circle cx="720" cy="950" r="200" fill="#FCD34D" opacity="0.14" filter="url(#tar-blur)" />
          <path d="M0 950 C360 900 720 950 1080 920 C1260 905 1380 920 1440 910 L1440 1100 L0 1100 Z"
            fill="white" opacity="0.55" />
        </svg>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 space-y-12">

        {/* HERO */}
        <section className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-2xl backdrop-blur-xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200">
            💰 EleveAI · Tarifs
          </div>
          <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Simple, transparent, sans surprise
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-base font-semibold leading-relaxed text-slate-600">
            EleveAI est en phase pilote. L&apos;accès est gratuit pour les premières classes
            partenaires. L&apos;offre famille individuelle arrive bientôt.
          </p>
        </section>

        {/* OFFRES */}
        <section className="grid gap-6 md:grid-cols-3">
          {offres.map((o) => (
            <div
              key={o.nom}
              className={`relative flex flex-col rounded-[2rem] border bg-white/85 p-6 shadow-xl backdrop-blur transition hover:-translate-y-1 ${
                o.highlight
                  ? "border-blue-300 ring-4 ring-blue-100"
                  : "border-white/70"
              }`}
            >
              {o.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-black text-white shadow">
                  ⭐ Recommandé
                </div>
              )}

              <div className="mb-4">
                <span className={`rounded-full px-3 py-1 text-xs font-black ${o.badgeColor}`}>
                  {o.badge}
                </span>
              </div>

              <h2 className="text-xl font-black text-slate-950">{o.nom}</h2>
              <p className="mt-1 text-3xl font-black text-blue-700">{o.prix}</p>
              <p className="mt-1 text-sm font-bold text-slate-500">{o.soustitre}</p>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
                {o.description}
              </p>

              <ul className="mt-5 flex-1 space-y-2">
                {o.inclus.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={o.ctaHref}
                className={`mt-6 block rounded-2xl px-5 py-3 text-center text-sm font-black shadow transition ${o.ctaColor}`}
              >
                {o.cta}
              </Link>
            </div>
          ))}
        </section>

        {/* PHASE PILOTE */}
        <section className="rounded-[2rem] border border-emerald-200 bg-white/80 p-8 shadow-xl backdrop-blur text-center">
          <p className="text-3xl">🚀</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Pourquoi c&apos;est gratuit au départ ?
          </h2>
          <p className="mt-3 font-semibold text-slate-600 max-w-2xl mx-auto">
            EleveAI est développé par un enseignant de La Réunion. La phase pilote permet
            de valider que la plateforme répond aux vrais besoins du terrain avant de
            fixer un tarif définitif. Vos retours comptent autant que les résultats de vos élèves.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-2xl bg-emerald-500 px-8 py-4 text-base font-black text-white shadow-lg hover:bg-emerald-400 transition"
          >
            📩 Rejoindre le pilote gratuit
          </Link>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="mb-6 text-2xl font-black text-slate-950 text-center">
            Questions sur les tarifs
          </h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="rounded-[1.5rem] border border-white/80 bg-white/80 px-6 py-4 shadow-md backdrop-blur"
              >
                <summary className="cursor-pointer font-black text-slate-950">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="rounded-[2rem] bg-blue-600 p-8 shadow-2xl text-center text-white">
          <h2 className="text-2xl font-black">Une question sur les tarifs ?</h2>
          <p className="mt-2 font-semibold text-blue-100">
            Réponse sous 24h · Pas de commercial · Juste une conversation.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex rounded-2xl bg-white px-8 py-4 text-base font-black text-blue-700 shadow hover:bg-blue-50 transition"
          >
            📩 Nous écrire
          </Link>
        </section>

      </div>
    </main>
  );
}
