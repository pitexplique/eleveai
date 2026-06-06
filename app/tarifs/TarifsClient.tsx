"use client";

import Link from "next/link";

const offres = [
  {
    nom: "Famille",
    badge: "Élève solo",
    badgeColor: "bg-violet-100 text-violet-800",
    prix: "4,90 €",
    soustitre: "par mois · ou 39 € / an (2 mois offerts)",
    description: "Un accès complet pour votre enfant, sans passer par l'établissement. Disponible dès maintenant.",
    inclus: [
      "1 élève, tous les outils débloqués",
      "Coach Maths IA · Coach Français IA",
      "English Maths A1 → B2",
      "Parcours · Calcul rapide · Défis",
      "Dashboard de progression",
      "Résiliation libre à tout moment",
    ],
    cta: "Commencer — 4,90 €/mois",
    ctaHref: "/contact",
    ctaColor: "bg-violet-600 hover:bg-violet-500 text-white",
    highlight: false,
    soon: false,
  },
  {
    nom: "Classe",
    badge: "⭐ Le plus populaire",
    badgeColor: "bg-blue-100 text-blue-800",
    prix: "150 €",
    soustitre: "par an · jusqu'à 35 élèves",
    description: "Un accès annuel pour toute une classe. Idéal pour un enseignant qui veut intégrer EleveAI dans ses cours.",
    inclus: [
      "Jusqu'à 35 élèves",
      "Codes élèves créés par nos soins",
      "Dashboard professeur inclus",
      "Suivi notion par notion par élève",
      "Support email prioritaire",
      "Formation initiale en visio",
    ],
    cta: "Demander un accès classe",
    ctaHref: "/contact",
    ctaColor: "bg-blue-600 hover:bg-blue-500 text-white",
    highlight: true,
    soon: false,
  },
  {
    nom: "Établissement",
    badge: "Multi-classes",
    badgeColor: "bg-emerald-100 text-emerald-800",
    prix: "Sur devis",
    soustitre: "à partir de 400 € / an",
    description: "Accès pour plusieurs classes ou un établissement complet. Tarif dégressif selon le nombre d'élèves.",
    inclus: [
      "Nombre de classes illimité",
      "Dashboard principal établissement",
      "Tableaux de bord par classe et par élève",
      "Accompagnement personnalisé",
      "Contrat RGPD inclus",
      "Formation et support dédiés",
    ],
    cta: "Demander un devis",
    ctaHref: "/contact",
    ctaColor: "bg-emerald-600 hover:bg-emerald-500 text-white",
    highlight: false,
    soon: false,
  },
];

const comparatif = [
  { outil: "Kwyk",       prix: "6 € / élève / mois",   soit: "72 € / an / élève" },
  { outil: "Mathia",     prix: "8 € / élève / mois",   soit: "96 € / an / élève" },
  { outil: "Lumni Pro",  prix: "5,99 € / mois",        soit: "72 € / an" },
  { outil: "EleveAI 🟢", prix: "4,90 € / mois",        soit: "39 € / an — soit 5× moins cher" },
];

const valeur = [
  { icon: "🧠", label: "Coach Maths IA",      desc: "Du CP à la Terminale, notion par notion" },
  { icon: "📖", label: "Coach Français IA",   desc: "CP → 3e, phonologie, grammaire, conjugaison" },
  { icon: "🇬🇧", label: "English Maths",       desc: "A1 → B2, vocabulaire maths en anglais + audio" },
  { icon: "🛤️", label: "Parcours adaptatif",   desc: "Bilan de compétences personnalisé" },
  { icon: "⚡", label: "Calcul rapide",        desc: "Automatismes en 5 minutes chrono" },
  { icon: "🎯", label: "Défis du jour",        desc: "Problèmes contextualisés La Réunion" },
  { icon: "📚", label: "Coach Brevet",         desc: "Sprint 30 jours, toutes les notions clés" },
  { icon: "🎓", label: "Coach Bac Spé",        desc: "Suites, fonctions, probabilités" },
];

const faq = [
  {
    q: "Les élèves doivent-ils payer ?",
    a: "Dans le cadre scolaire, non. Les élèves accèdent à EleveAI avec un code fourni par leur établissement. Aucun paiement n'est demandé aux élèves ni aux familles.",
  },
  {
    q: "Comment se passe la mise en place pour une classe ?",
    a: "On crée les codes pour vos élèves (sous 48h) et on vous accompagne avec une formation rapide en visio. Vos élèves peuvent commencer le jour même.",
  },
  {
    q: "Y a-t-il un pilote gratuit ?",
    a: "Oui — contactez-nous pour un accès pilote de 4 semaines pour une classe complète. Sans engagement, pour tester avant de vous décider.",
  },
  {
    q: "Y a-t-il un contrat à signer ?",
    a: "Pour l'accès établissement, oui — un contrat simple qui précise les conditions d'accès, la protection des données et la durée. Conforme au RGPD.",
  },
  {
    q: "Puis-je résilier à tout moment (offre famille) ?",
    a: "Oui. L'abonnement mensuel famille se résilie en 1 clic, sans frais ni préavis.",
  },
  {
    q: "Pourquoi EleveAI est moins cher que les autres ?",
    a: "EleveAI est développé par un seul enseignant de La Réunion — sans équipe commerciale, sans levée de fonds, sans surcoût. L'objectif est que chaque élève puisse y accéder, quelle que soit la situation de sa famille.",
  },
];

export default function TarifsClient() {
  return (
    <main className="relative min-h-screen overflow-hidden text-slate-950">

      {/* FOND */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg className="h-full w-full" viewBox="0 0 1440 1800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="tar-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="50%" stopColor="#EFF6FF" />
              <stop offset="100%" stopColor="#FFFBEB" />
            </linearGradient>
            <radialGradient id="tar-g1" cx="10%" cy="10%" r="50%">
              <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#86EFAC" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="tar-g2" cx="90%" cy="10%" r="50%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
            </radialGradient>
            <filter id="tar-blur"><feGaussianBlur stdDeviation="30" /></filter>
          </defs>
          <rect width="1440" height="1800" fill="url(#tar-bg)" />
          <rect width="1440" height="1800" fill="url(#tar-g1)" />
          <rect width="1440" height="1800" fill="url(#tar-g2)" />
          <circle cx="130" cy="200" r="160" fill="#4ADE80" opacity="0.15" filter="url(#tar-blur)" />
          <circle cx="1310" cy="180" r="180" fill="#60A5FA" opacity="0.15" filter="url(#tar-blur)" />
        </svg>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 space-y-14">

        {/* HERO */}
        <section className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-2xl backdrop-blur-xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-800 ring-1 ring-blue-200">
            💰 Tarifs EleveAI
          </div>
          <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Un coach IA complet.<br />À un prix accessible.
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-base font-semibold leading-relaxed text-slate-600">
            Développé par un enseignant de La Réunion en 5 mois. Sans équipe commerciale, sans intermédiaire.
            <br />Le prix reflète l&apos;essentiel : que vos élèves progressent.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700">
            <span className="text-lg">🧑‍🏫</span>
            Conçu par un prof · Pour les profs · Utilisé à La Réunion
          </div>
        </section>

        {/* OFFRES */}
        <section className="grid gap-6 md:grid-cols-3">
          {offres.map((o) => (
            <div
              key={o.nom}
              className={`relative flex flex-col rounded-[2rem] border bg-white/90 p-6 shadow-xl backdrop-blur transition hover:-translate-y-1 ${
                o.highlight
                  ? "border-blue-300 ring-4 ring-blue-100"
                  : "border-white/70"
              }`}
            >
              {o.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-black text-white shadow">
                  ⭐ Le plus populaire
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

        {/* PILOTE GRATUIT */}
        <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50/80 p-6 shadow-lg backdrop-blur flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="text-5xl shrink-0">🎁</div>
          <div className="flex-1">
            <h2 className="text-xl font-black text-slate-950">Pilote gratuit — 4 semaines</h2>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              Accès complet pour une classe (jusqu&apos;à 35 élèves), sans engagement. Pour tester avant de décider.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-white shadow hover:bg-emerald-400 transition"
          >
            Demander le pilote
          </Link>
        </section>

        {/* CE QUE TU OBTIENS */}
        <section>
          <div className="mb-6 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Inclus dans tous les plans</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">8 outils. 1 seul abonnement.</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {valeur.map((v) => (
              <div
                key={v.label}
                className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-md backdrop-blur"
              >
                <span className="text-2xl">{v.icon}</span>
                <p className="mt-2 text-sm font-black text-slate-950">{v.label}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMPARATIF */}
        <section className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="mb-6 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Comparatif</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">EleveAI vs les autres</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-black uppercase tracking-wide text-slate-400">
                  <th className="pb-3 pr-6">Outil</th>
                  <th className="pb-3 pr-6">Tarif</th>
                  <th className="pb-3">Soit / an</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparatif.map((c) => (
                  <tr key={c.outil} className={c.outil.includes("EleveAI") ? "bg-emerald-50" : ""}>
                    <td className="py-3 pr-6 font-black text-slate-950">{c.outil}</td>
                    <td className="py-3 pr-6 font-semibold text-slate-600">{c.prix}</td>
                    <td className={`py-3 font-bold ${c.outil.includes("EleveAI") ? "text-emerald-600" : "text-slate-500"}`}>
                      {c.soit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs font-semibold text-slate-400 text-center">
            * Tarifs constatés sur les sites officiels en juin 2026.
          </p>
        </section>

        {/* HISTOIRE */}
        <section className="rounded-[2rem] bg-[#041B33] p-8 shadow-2xl text-center text-white">
          <p className="text-3xl">🧑‍💻</p>
          <h2 className="mt-3 text-2xl font-black">Développé seul, en 5 mois, à La Réunion</h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm font-semibold leading-relaxed text-white/70">
            EleveAI n&apos;a pas de levée de fonds, pas d&apos;équipe de 50 personnes, pas de service commercial.
            C&apos;est un enseignant qui a construit l&apos;outil qu&apos;il aurait voulu avoir pour ses élèves.
            Le prix bas n&apos;est pas un manque de qualité — c&apos;est un choix.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-bold">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Coach Maths IA ✓</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Coach Français IA ✓</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">English Maths ✓</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">CP → Terminale ✓</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Audio TTS ✓</span>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="mb-6 text-2xl font-black text-slate-950 text-center">Questions fréquentes</h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="rounded-[1.5rem] border border-white/80 bg-white/80 px-6 py-4 shadow-md backdrop-blur"
              >
                <summary className="cursor-pointer font-black text-slate-950">{f.q}</summary>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">{f.a}</p>
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
