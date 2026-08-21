"use client";

import Link from "next/link";

import { VENTE } from "@/lib/legal/editeur";
import {
  ARGUMENT_COLLECTIF,
  EXEMPLE_CLASSE,
  EXEMPLE_ETABLISSEMENT,
  PRIX_CLASSE_ELEVE_AN,
  PRIX_ETABLISSEMENT_ELEVE_AN,
  PRIX_FAMILLE_AN,
  euros,
} from "@/lib/tarifs";

// ─────────────────────────────────────────────────────────────────────────────
// LA PAGE TARIFS, REFAITE LE 21/08/2026.
//
// Ce qu'elle faisait avant : elle ouvrait sur « Classe » et « Établissement »,
// les deux canaux qui n'existent pas cette année, et fermait sur « Famille ·
// Bientôt » — la seule offre qui concerne les 74 % de visiteurs qui arrivent
// par un cahier de vacances. Elle promettait en plus, dans la carte Famille,
// six outils qui sont GRATUITS (coach, parcours, calcul rapide, défis…) : elle
// vendait ce qu'elle donne, et échouait au test maison — « si l'enfant d'à côté
// ne paie pas, apprend-il moins ? ».
//
// Ce qu'elle fait maintenant, dans cet ordre : la famille d'abord, puis le mur
// du gratuit (c'est LUI qui rend les 12 € compréhensibles), puis le collectif
// en bas — non plus comme un tunnel de vente mais comme une preuve de sérieux.
//
// ⭐ Les couleurs sont celles du coach (`app/tutor-v4/TutorV4Client.tsx`) :
// bandeau indigo→sky→cyan, tuiles sky/violet/emerald/amber. Une page de tarifs
// qui ne ressemble pas au produit se lit comme une page de quelqu'un d'autre.
// ─────────────────────────────────────────────────────────────────────────────

/** Ce qui ne se paiera jamais. La liste est longue exprès : c'est l'argument. */
const gratuit = [
  { icon: "🧠", label: "Coach Maths IA", desc: "Du CP à la Terminale, notion par notion" },
  { icon: "📖", label: "Coach Français IA", desc: "CP → 3e, sons, grammaire, conjugaison" },
  { icon: "🇬🇧", label: "English Maths", desc: "A1 → B2, avec l'audio" },
  { icon: "🛤️", label: "Parcours", desc: "Un bilan de compétences, matière par matière" },
  { icon: "⚡", label: "Calcul rapide", desc: "Les automatismes en 5 minutes" },
  { icon: "🎯", label: "Défis du jour", desc: "Des problèmes ancrés à La Réunion" },
  { icon: "☀️", label: "Cahiers de vacances", desc: "14 cahiers, de la GS au post-bac" },
  { icon: "📄", label: "Fiches de cours", desc: "À lire à l'écran ou à imprimer" },
  { icon: "✍️", label: "Dictée du jour", desc: "Et les rituels de langue" },
  { icon: "📝", label: "Évaluations blanches", desc: "6e et 4e, dans les conditions réelles" },
  { icon: "🎓", label: "Coach Brevet · Bac", desc: "Sprint de révisions, notions clés" },
  { icon: "💾", label: "Ses résultats gardés", desc: "L'élève retrouve sa progression" },
];

/** Ce que la famille achète — et qui n'apprend rien à personne. */
const inclusFamille = [
  "Le bulletin de votre enfant, mis à jour tout seul",
  "Ce qu'il a travaillé cette semaine, et ce qui coince",
  "Son historique depuis le début, sans rien à saisir",
  "Pour lui : son thème, son badge, composer son parcours",
  "Son nom dans les remerciements du site",
];

/**
 * LES TROIS PORTES — la seule chose d'IXL qui valait d'être reprise telle
 * quelle : chez eux, la page d'entrée sépare Familles / Classes / Écoles avant
 * de parler d'argent, et chaque porte a DEUX boutons — le prix, et « en savoir
 * plus ».
 *
 * ⛔ Pas de sous-pages `/tarifs/familles` : les trois pages d'audience existent
 * déjà (`/espace-parents`, `/espace-profs`, `/espace-ecoles`). En créer de
 * nouvelles ferait deux pages du même sujet pour le même lecteur — Google en
 * choisit une, rarement la bonne, et les deux perdent.
 *
 * ⭐ Ce que ces portes apportent au référencement : le texte des liens. « Pour
 * les parents » → /espace-parents dit à Google et à Bing de quoi cette page
 * parle, bien mieux qu'un mot-clé posé dessus.
 */
const portes = [
  {
    emoji: "🏠",
    titre: "Pour les parents",
    sousTitre: "Suivre son enfant à la maison",
    prix: `${euros(PRIX_FAMILLE_AN)} par an, par famille`,
    ancre: "#famille",
    page: "/espace-parents",
    pageLabel: "Ce que voient les parents",
    gradient: "from-emerald-400 to-green-500",
    anneau: "ring-emerald-100",
  },
  {
    emoji: "🧑‍🏫",
    titre: "Pour les enseignants",
    sousTitre: "Voir sa classe sans corriger",
    prix: `${euros(PRIX_CLASSE_ELEVE_AN)} par élève et par an`,
    ancre: "#classe",
    page: "/espace-profs",
    pageLabel: "L'outil du professeur",
    gradient: "from-sky-400 to-blue-500",
    anneau: "ring-sky-100",
  },
  {
    emoji: "🏫",
    titre: "Pour les établissements",
    sousTitre: "Tout le collège, et la vue du principal",
    prix: `${euros(PRIX_ETABLISSEMENT_ELEVE_AN)} par élève et par an`,
    ancre: "#etablissement",
    page: "/espace-ecoles",
    pageLabel: "EleveAI dans un établissement",
    gradient: "from-violet-400 to-purple-500",
    anneau: "ring-violet-100",
  },
];

const collectif = [
  {
    id: "classe",
    nom: "Classe",
    badge: "🧑‍🏫 Un enseignant",
    prix: `${euros(PRIX_CLASSE_ELEVE_AN)} / élève / an`,
    exemple: `${EXEMPLE_CLASSE.eleves} élèves = ${euros(EXEMPLE_CLASSE.total)} par an`,
    description:
      "Le prof voit sa classe sans corriger : devoirs suivis, bulletins, qui décroche. Les familles de la classe ne paient rien.",
    inclus: [
      "Toutes les matières, tous les élèves de la classe",
      "Évaluation automatique, sans correction",
      "Devoirs maison faits et suivis en ligne",
      "Tableau de bord professeur",
      "Pris en charge par la coopérative ou le FSE",
    ],
    cta: "Demander un accès classe",
    gradient: "from-sky-400 to-blue-500",
    anneau: "ring-sky-100",
  },
  {
    id: "etablissement",
    nom: "Établissement",
    badge: "🏫 Tout le collège",
    prix: `${euros(PRIX_ETABLISSEMENT_ELEVE_AN)} / élève / an`,
    exemple: `${EXEMPLE_ETABLISSEMENT.eleves} élèves = ${euros(EXEMPLE_ETABLISSEMENT.total)} par an`,
    description:
      "Tous les profs équipés, et le principal a la vue complète : tous les niveaux, toutes les classes. Facturé à l'établissement — rien aux familles.",
    inclus: [
      "Tous les élèves, toutes les classes, tous les profs",
      "La vue complète du chef d'établissement",
      "Accès 100 % gratuit pour chaque élève",
      "Éligible REP/REP+, fonds sociaux, coopérative",
      "Jamais un classement des enseignants",
    ],
    cta: "Demander un devis",
    gradient: "from-violet-400 to-purple-500",
    anneau: "ring-violet-100",
  },
];

/**
 * ⚠️ COMPARER CE QUI SE COMPARE. L'ancienne version alignait le prix
 * ÉTABLISSEMENT d'EleveAI contre des prix FAMILLE (Kwyk, Lumni) : le rapport
 * était flatteur et faux. Ici chaque ligne dit pour qui elle vaut, et EleveAI
 * apparaît deux fois — une par public.
 */
const comparatif = [
  {
    outil: "IXL",
    pourQui: "Une famille · toutes matières",
    prix: "19,95 € / mois",
    soit: "239 € / an · +4 €/mois par enfant en plus",
  },
  {
    outil: "IXL",
    pourQui: "Une famille · une seule matière",
    prix: "9,95 € / mois",
    soit: "119 € / an",
  },
  { outil: "Mathia", pourQui: "Par élève", prix: "8 € / élève / mois", soit: "96 € / an / élève" },
  {
    outil: "Kwyk",
    pourQui: "Par élève · établissement",
    prix: "6 € / élève / mois",
    soit: "72 € / an / élève",
  },
  { outil: "Lumni Pro", pourQui: "Une famille", prix: "5,99 € / mois", soit: "72 € / an" },
  {
    outil: "EleveAI 🌺",
    pourQui: "Une famille · toutes matières · tous les enfants",
    prix: `${euros(PRIX_FAMILLE_AN)} / an`,
    soit: "12 € / an — et pas un centime par enfant en plus",
  },
  {
    outil: "EleveAI 🌺",
    pourQui: "Tout un établissement",
    prix: `${euros(PRIX_ETABLISSEMENT_ELEVE_AN)} / élève / an`,
    soit: "3 € / an / élève",
  },
];

const faq = [
  {
    q: "Mon enfant peut-il utiliser EleveAI sans payer ?",
    a: "Oui, entièrement. Le coach dans les cinq matières, les exercices corrigés, les parcours, le calcul rapide, les défis, les cahiers, les fiches, les évaluations blanches : tout est gratuit, sans limite de temps et sans publicité. Et il garde ses résultats. Rien de tout ça ne deviendra payant.",
  },
  {
    q: `Alors qu'est-ce que je paie avec les ${euros(PRIX_FAMILLE_AN)} ?`,
    a: "La fenêtre du parent. Votre enfant, lui, voit déjà sa progression. Ce que l'abonnement ouvre, c'est votre vue à vous : son bulletin, ce qu'il a travaillé cette semaine, son historique. Vous n'achetez pas ce qu'il apprend, vous achetez de le voir apprendre.",
  },
  {
    q: `${euros(PRIX_FAMILLE_AN)} par enfant ou par famille ?`,
    a: "Par famille, quel que soit le nombre d'enfants. Le frère ou la sœur d'à côté n'a pas à apprendre moins parce qu'il est le deuxième.",
  },
  {
    q: "Mon collège peut-il payer pour tout le monde ?",
    a: `Oui, et c'est deux fois moins cher : ${ARGUMENT_COLLECTIF.eleves} familles abonnées, cela ferait ${euros(ARGUMENT_COLLECTIF.siChaqueFamillePaie)} ; la même classe payée par la coopérative, c'est ${euros(ARGUMENT_COLLECTIF.siLaClassePaie)} — et personne n'est laissé dehors. Parlez-en à l'enseignant ou au principal, on s'occupe du reste.`,
  },
  {
    q: "Puis-je arrêter quand je veux ?",
    a: "Oui. Sans engagement, résiliable à tout moment depuis votre espace. Et vous avez 14 jours pour changer d'avis, remboursés, même si votre enfant a déjà tout utilisé — c'est écrit dans les conditions de vente.",
  },
  {
    q: "J'ai un code, où est-ce que je le saisis ?",
    a: "À l'étape du paiement : un champ « code promotionnel » vous attend juste avant de valider. Les codes sont envoyés par courriel ou remis par un enseignant — ils ne sont pas affichés sur le site.",
  },
  {
    q: "Pourquoi si peu cher ?",
    a: "EleveAI est développé par un seul enseignant de La Réunion : pas de levée de fonds à rembourser, pas d'équipe commerciale, pas d'intermédiaire. Le prix bas n'est pas un défaut de qualité, c'est ce qui reste quand on enlève tout le reste.",
  },
  {
    q: "Et une famille qui ne peut pas payer ?",
    a: "Elle ne paie pas, et personne ne le saura. Aucun élève n'a jamais eu à demander quoi que ce soit pour travailler ici, et ça ne changera pas.",
  },
];

export default function TarifsClient() {
  // ⚠️ Le bouton n'invente pas l'ouverture de la vente : il lit le même verrou
  // que les CGV et que `lib/paiement/stripe.ts`. Tant que `VENTE.ouverte` est
  // faux, le prix s'affiche mais rien ne prétend encaisser — le jour du
  // branchement, un seul booléen change et la page s'ouvre d'elle-même.
  const venteOuverte = VENTE.ouverte;

  // ⭐ LE SEUL GAIN SEO RÉEL DE CETTE PAGE. Les sitelinks ne se déclarent pas
  // (Google les calcule), mais un bloc `FAQPage` permet aux questions de
  // s'afficher DANS le résultat de recherche. Et ce qui est cherché, ce ne sont
  // pas les tarifs — personne ne tape « tarif EleveAI » — ce sont les
  // questions : « est-ce que c'est gratuit », « combien coûte… ».
  // ⚠️ Les réponses doivent être MOT POUR MOT celles de la page : un balisage
  // qui promet autre chose que ce qu'on lit est une raison de désindexation.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-950">
      <script
        type="application/ld+json"
        // Le `<` échappé : sans lui, une réponse contenant du HTML pourrait
        // fermer la balise script.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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

      <div className="mx-auto max-w-5xl space-y-14 px-4 py-10">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        {/* ⛔ Pas de grand aplat sombre : les couleurs saturées du coach ne
            servent que sur les petits objets (pastilles, boutons). Les fonds
            restent clairs — c'est une page qu'on lit en plein jour. */}
        <section className="rounded-[2rem] border border-white bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-8 text-center shadow-xl ring-1 ring-sky-100">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow">
            🌺 Les tarifs
          </div>
          <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Tout ce qui fait apprendre
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
              est gratuit.
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-bold leading-relaxed text-slate-600">
            Et ça ne changera pas. Ce qui se paie, c&apos;est de{" "}
            <strong className="text-slate-900">voir</strong> et de{" "}
            <strong className="text-slate-900">garder</strong> — jamais d&apos;accéder.
          </p>
          <p className="mx-auto mt-5 max-w-xl rounded-2xl bg-white px-6 py-3 text-sm font-black text-emerald-800 ring-1 ring-emerald-200">
            Si l&apos;enfant d&apos;à côté ne paie pas, il apprend exactement la même chose.
          </p>
        </section>

        {/* ── LES TROIS PORTES ─────────────────────────────────────────── */}
        <section className="grid gap-5 md:grid-cols-3">
          {portes.map((p) => (
            <div
              key={p.titre}
              className={`flex flex-col rounded-[2rem] border border-white bg-white/90 p-6 text-center shadow-xl ring-4 backdrop-blur transition hover:-translate-y-1 ${p.anneau}`}
            >
              <span className="text-5xl">{p.emoji}</span>
              <h2
                className={`mt-3 bg-gradient-to-r ${p.gradient} bg-clip-text text-xl font-black text-transparent`}
              >
                {p.titre}
              </h2>
              <p className="mt-1 flex-1 text-sm font-bold text-slate-600">{p.sousTitre}</p>
              <p className="mt-3 text-sm font-black text-slate-900">{p.prix}</p>

              <Link
                href={p.ancre}
                className={`mt-4 rounded-2xl bg-gradient-to-r ${p.gradient} px-5 py-3 text-sm font-black text-white shadow transition hover:-translate-y-0.5`}
              >
                Voir l&apos;offre
              </Link>
              <Link
                href={p.page}
                className="mt-2 rounded-2xl bg-white px-5 py-2.5 text-sm font-black text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
              >
                {p.pageLabel}
              </Link>
            </div>
          ))}
        </section>

        {/* ── FAMILLE — la carte principale ────────────────────────────── */}
        <section
          id="famille"
          className="relative scroll-mt-24 rounded-[2rem] border border-white bg-white/90 p-8 shadow-2xl ring-4 ring-emerald-100 backdrop-blur"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-5 py-1.5 text-xs font-black text-white shadow-lg">
            🏠 Pour la maison
          </div>

          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
            <div className="text-center md:text-left">
              <p className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-6xl font-black text-transparent sm:text-7xl">
                {euros(PRIX_FAMILLE_AN)}
              </p>
              <p className="mt-1 text-lg font-black text-slate-900">par an</p>
              <p className="mt-1 text-sm font-black text-emerald-700">
                Moins d&apos;un euro par mois · par famille, quel que soit le nombre
                d&apos;enfants
              </p>

              <p className="mt-5 text-base font-bold leading-relaxed text-slate-700">
                Le coach, les exercices, les évaluations : gratuits, et l&apos;élève garde
                ses résultats.
                <br />
                <strong className="text-slate-950">
                  Ce qui se paie, c&apos;est que ça se souvienne de votre enfant.
                </strong>
              </p>

              {venteOuverte ? (
                <>
                  <Link
                    href="/abonnement/famille"
                    className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 px-8 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    S&apos;abonner — {euros(PRIX_FAMILLE_AN)} par an
                  </Link>
                  <p className="mt-3 text-xs font-bold text-slate-500">
                    Sans engagement · 14 jours pour changer d&apos;avis · Apple Pay et
                    Google Pay
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Vous avez un code ? Vous le saisirez juste avant de valider.
                  </p>
                </>
              ) : (
                <>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 px-8 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Prévenez-moi à l&apos;ouverture
                  </Link>
                  <p className="mt-3 text-xs font-bold text-slate-500">
                    L&apos;abonnement ouvre dans quelques jours. Le prix ci-dessus est
                    ferme — rien n&apos;est encaissé pour l&apos;instant.
                  </p>
                </>
              )}
            </div>

            <ul className="space-y-3 rounded-3xl bg-gradient-to-br from-emerald-50 to-green-50 p-6 ring-1 ring-emerald-100">
              {inclusFamille.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                  <span className="mt-0.5 text-lg text-emerald-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── LE MUR DU GRATUIT ────────────────────────────────────────── */}
        <section>
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-2 text-xs font-black uppercase tracking-wide text-white shadow">
              🎁 Gratuit, et ça le reste
            </span>
            <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
              Rien de tout ça ne se paiera jamais
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm font-bold text-slate-600">
              Sans compte obligatoire, sans limite de temps, sans publicité.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {gratuit.map((g) => (
              <div
                key={g.label}
                className="rounded-2xl border border-white bg-white/90 p-4 shadow-md backdrop-blur transition hover:-translate-y-0.5"
              >
                <span className="text-2xl">{g.icon}</span>
                <p className="mt-2 text-sm font-black text-slate-950">{g.label}</p>
                <p className="mt-1 text-xs font-bold leading-relaxed text-slate-500">{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PREMIUM S'ACHÈTE OU SE GAGNE ─────────────────────────────── */}
        <section className="rounded-[2rem] bg-gradient-to-r from-cyan-500 via-emerald-500 to-orange-400 p-1 shadow-xl">
          <div className="rounded-[1.85rem] bg-white/95 p-8 text-center backdrop-blur">
            <p className="text-3xl">⭐</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Premium s&apos;achète — ou se gagne
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-relaxed text-slate-600">
              Le badge, le thème, composer son parcours : compris dans l&apos;abonnement
              famille. <strong className="text-slate-900">Ou gagnés</strong> en aidant
              quelqu&apos;un — proposer un exercice, signaler une erreur, laisser un avis,
              expliquer à un autre élève.
            </p>
            <p className="mx-auto mt-4 max-w-xl rounded-2xl bg-amber-50 px-6 py-3 text-sm font-black text-amber-900 ring-1 ring-amber-200">
              Comme ça, le badge ne dit pas « ma famille a payé ». Il dit « j&apos;ai fait
              quelque chose pour les autres ».
            </p>
          </div>
        </section>

        {/* ── CLASSE ET ÉTABLISSEMENT ──────────────────────────────────── */}
        <section>
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-5 py-2 text-xs font-black uppercase tracking-wide text-white shadow">
              🏫 Quand c&apos;est l&apos;école qui paie
            </span>
            <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
              Plus le cercle s&apos;élargit, moins ça coûte par enfant
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm font-bold text-slate-600">
              On divise par deux à chaque fois : {euros(PRIX_FAMILLE_AN)} pour une famille,{" "}
              {euros(PRIX_CLASSE_ELEVE_AN)} par élève pour une classe,{" "}
              {euros(PRIX_ETABLISSEMENT_ELEVE_AN)} pour tout un établissement.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {collectif.map((o) => (
              <div
                key={o.nom}
                id={o.id}
                className={`flex scroll-mt-24 flex-col rounded-[2rem] border border-white bg-white/90 p-6 shadow-xl ring-4 backdrop-blur transition hover:-translate-y-1 ${o.anneau}`}
              >
                <span className="self-start rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                  {o.badge}
                </span>

                <h3 className="mt-4 text-xl font-black text-slate-950">{o.nom}</h3>
                <p
                  className={`mt-1 bg-gradient-to-r ${o.gradient} bg-clip-text text-3xl font-black text-transparent`}
                >
                  {o.prix}
                </p>
                <p className="mt-1 text-sm font-black text-slate-500">{o.exemple}</p>
                <p className="mt-3 text-sm font-bold leading-relaxed text-slate-600">
                  {o.description}
                </p>

                <ul className="mt-5 flex-1 space-y-2">
                  {o.inclus.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm font-bold text-slate-700"
                    >
                      <span className="mt-0.5 text-emerald-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`mt-6 block rounded-2xl bg-gradient-to-r ${o.gradient} px-5 py-3 text-center text-sm font-black text-white shadow transition hover:-translate-y-0.5`}
                >
                  {o.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* L'argument, calculé — jamais recopié. */}
          <div className="mt-6 rounded-[2rem] border border-emerald-200 bg-emerald-50/80 p-6 text-center shadow-lg backdrop-blur">
            <p className="text-lg font-black text-slate-950">
              Faites le calcul : {ARGUMENT_COLLECTIF.eleves} familles abonnées, c&apos;est{" "}
              {euros(ARGUMENT_COLLECTIF.siChaqueFamillePaie)}.
            </p>
            <p className="mt-1 text-lg font-black text-emerald-700">
              La même classe payée par la coopérative, c&apos;est{" "}
              {euros(ARGUMENT_COLLECTIF.siLaClassePaie)}.
            </p>
            <p className="mt-2 text-sm font-bold text-slate-600">
              Deux fois moins cher — et personne n&apos;est laissé dehors.
            </p>
          </div>
        </section>

        {/* ── PILOTE GRATUIT ───────────────────────────────────────────── */}
        <section className="flex flex-col items-center gap-6 rounded-[2rem] border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 text-center shadow-lg backdrop-blur sm:flex-row sm:text-left">
          <div className="shrink-0 text-5xl">🎁</div>
          <div className="flex-1">
            <h2 className="text-xl font-black text-slate-950">Pilote gratuit — 4 semaines</h2>
            <p className="mt-1 text-sm font-bold text-slate-600">
              Accès complet pour une classe entière, sans engagement. Pour essayer avant de
              décider quoi que ce soit.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-black text-white shadow transition hover:-translate-y-0.5"
          >
            Demander le pilote
          </Link>
        </section>

        {/* ── COMPARATIF ───────────────────────────────────────────────── */}
        <section className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="mb-6 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              Comparatif
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">EleveAI et les autres</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-black uppercase tracking-wide text-slate-400">
                  <th className="pb-3 pr-6">Outil</th>
                  <th className="pb-3 pr-6">Pour qui</th>
                  <th className="pb-3 pr-6">Tarif</th>
                  <th className="pb-3">Soit par an</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparatif.map((c) => {
                  const nous = c.outil.includes("EleveAI");
                  return (
                    <tr key={`${c.outil}-${c.pourQui}`} className={nous ? "bg-emerald-50" : ""}>
                      <td className="py-3 pr-6 font-black text-slate-950">{c.outil}</td>
                      <td className="py-3 pr-6 font-bold text-slate-500">{c.pourQui}</td>
                      <td className="py-3 pr-6 font-bold text-slate-600">{c.prix}</td>
                      <td
                        className={`py-3 font-black ${nous ? "text-emerald-600" : "text-slate-500"}`}
                      >
                        {c.soit}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-5 max-w-2xl rounded-2xl bg-amber-50 px-6 py-3 text-center text-sm font-black text-amber-900 ring-1 ring-amber-200">
            Chez IXL, le deuxième enfant coûte 4 € de plus par mois. Ici, la famille entière
            est comprise dans les {euros(PRIX_FAMILLE_AN)}.
          </p>
          <p className="mt-4 text-center text-xs font-bold text-slate-400">
            * Tarifs relevés sur les sites officiels — IXL en août 2026, les autres en juin 2026.
          </p>
        </section>

        {/* ── LA PREUVE ────────────────────────────────────────────────── */}
        <section className="rounded-[2rem] border border-white bg-gradient-to-br from-amber-50 via-white to-sky-50 p-8 text-center shadow-xl ring-1 ring-amber-100">
          <p className="text-4xl">🧑‍🏫</p>
          <h2 className="mt-3 text-2xl font-black text-slate-950">
            Déjà utilisé dans un collège, à La Réunion, avec de vrais élèves
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-relaxed text-slate-600">
            EleveAI n&apos;a pas de levée de fonds, pas d&apos;équipe de cinquante personnes,
            pas de service commercial. C&apos;est un enseignant qui a construit l&apos;outil
            qu&apos;il aurait voulu avoir pour ses élèves — et les exercices ont été écrits
            un par un, pas achetés.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-black">
            {[
              "Coach Maths IA",
              "Coach Français IA",
              "English Maths",
              "CP → Terminale",
              "Sans publicité",
              "Données dans l'UE",
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-white px-4 py-2 text-slate-700 shadow-sm ring-1 ring-slate-200"
              >
                {chip} ✓
              </span>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section>
          <h2 className="mb-6 text-center text-2xl font-black text-slate-950">
            Les questions qu&apos;on nous pose
          </h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="rounded-[1.5rem] border border-white/80 bg-white/80 px-6 py-4 shadow-md backdrop-blur"
              >
                <summary className="cursor-pointer font-black text-slate-950">{f.q}</summary>
                <p className="mt-3 text-sm font-bold leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────────────────── */}
        <section className="rounded-[2rem] border border-white bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-8 text-center shadow-xl ring-1 ring-sky-100">
          <p className="text-4xl">💬</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Une question ?</h2>
          <p className="mt-2 font-bold text-slate-600">
            Réponse sous 24 h · Pas de commercial · Juste une conversation.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-8 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            📩 Nous écrire
          </Link>
        </section>
      </div>
    </main>
  );
}
