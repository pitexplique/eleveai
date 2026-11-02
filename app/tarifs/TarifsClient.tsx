// app/tarifs/TarifsClient.tsx — LES OFFRES DE L'OUVERTURE (refaite le 02/11/2026).
//
// ⭐ Frédéric, 02/11 : « aligne /tarifs et /parents et fais une offre
// établissement étranger ». La page d'avant (962 lignes, grille 2,50 € /
// 19,90 €, comparatif IXL, échelle des payeurs) est entière dans l'historique :
//     git show 6bc34dc5:app/tarifs/TarifsClient.tsx
//
// ⭐ LA LOGIQUE, la même que l'accueil (app/accueil/AccueilSuivi.tsx) : l'IA
// explique tout sans rien demander, on ne vend donc pas l'explication. On vend
// ce qu'elle ne fait pas — le SUIVI, la VIDÉOTHÈQUE (3 500 vidéos, 500 sur
// YouTube), un PROFESSEUR en visio. Le coach reste ouvert à tous.
// ⛔ Aucun prix écrit à la main : tout vient de lib/tarifs.ts (« GRILLE 2026 »).
// ⛔ Aucun bouton de paiement avant l'ouverture (`VENTE.ouverte`).
// ⛔ Les établissements : HORS DE FRANCE seulement.
// ⛔ Jamais aux élèves actuels ou anciens de Frédéric.

import Link from "next/link";
import { ArrowRight, Building2, Check, Eye, Globe2, MonitorPlay, Sparkles } from "lucide-react";
import {
  ETABLISSEMENT_ETRANGER,
  OUVERTURE_SUIVI,
  OUVERTURE_VISIO,
  PERIODE_ANNUELLE,
  PRIX_ANNUEL,
  PRIX_MENSUEL,
  PRIX_PAR_PAYS,
  PRIX_VISIO,
  VIDEOS_SITE,
  VIDEOS_YOUTUBE,
  montant,
} from "@/lib/tarifs";

const nombre = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const OUVERT = [
  "Le coach de maths sur tout le programme, micro-compétence par micro-compétence",
  "Dans le coach, la vidéo de chaque micro-compétence, avec ses questions-pauses",
  "Les résultats gardés dans le compte de l'élève",
  "Pour le prof : ses classes, la séance en direct, le bilan par micro",
  "Les feuilles d'exercices corrigées",
];

const SUIVI = [
  `Toute la vidéothèque : ${nombre(VIDEOS_SITE)} vidéos du CP à la Terminale (${nombre(VIDEOS_YOUTUBE)} seulement sur YouTube)`,
  "Un bilan de départ : la carte de votre enfant sur toute sa classe",
  "Un compte rendu chaque semaine : ce qui est acquis, les erreurs qui reviennent, les 3 choses à revoir",
  "10 minutes par jour choisies par le coach, et la préparation ciblée d'un contrôle",
  "Une alerte quand il décroche sur une notion",
  "Un seul abonnement pour tous les enfants de la maison",
];

const VISIO = [
  "Des cours collectifs en direct, 1 h 30, avec un professeur de maths",
  "Les grands rendez-vous : entrée en 6e, brevet, épreuve anticipée de 1re, bac, CRPE",
  "Le replay et la fiche de la séance, gardés",
  "Pas besoin de caméra ni de micro pour l'élève",
];

const ETABLISSEMENT = [
  "Un compte pour chaque professeur et chaque élève, avec « Mes classes » et le bilan par micro-compétence",
  `La vidéothèque entière pour tous les élèves : ${nombre(VIDEOS_SITE)} vidéos`,
  "Le suivi famille ouvert aux parents de vos élèves, sans rien de plus à payer",
  "Une formation de vos professeurs en visio (1 h 30) au démarrage",
  "Le programme français, et celui de votre pays dès qu'il est prêt sur le site",
];

const faq = [
  {
    q: "Pourquoi payer, alors qu'une IA explique tout ?",
    a: "Une IA explique, mais elle ne sait pas où en est votre enfant dans son programme, elle ne garde pas ses résultats d'une semaine à l'autre et elle ne vous dit pas quoi revoir. C'est cela que vous achetez : le suivi, la vidéothèque entière et, si vous le voulez, un professeur en direct.",
  },
  {
    q: "Sans abonnement, mon enfant est-il bridé ?",
    a: "Non. Il garde le coach sur tout le programme, la vidéo de chaque micro-compétence dans le coach, les exercices et ses résultats. L'abonnement ajoute votre vue à vous et la vidéothèque complète.",
  },
  {
    q: "Quand est-ce que ça ouvre ?",
    a: `Le suivi famille ouvre ${OUVERTURE_SUIVI}, les cours en visio en ${OUVERTURE_VISIO}. Rien n'est encaissé avant l'ouverture.`,
  },
  {
    q: "Le prix est-il le même dans tous les pays ?",
    a: `Non : il suit le niveau de vie. ${montant(PRIX_MENSUEL)} par mois en France, ${PRIX_PAR_PAYS.find((p) => p.suivi.includes("FCFA"))?.suivi} en Afrique de l'Ouest et centrale. Le tableau des pays est sur cette page.`,
  },
  {
    q: "Puis-je arrêter quand je veux ?",
    a: `Oui. La formule au mois est sans engagement. La formule à l'année (${montant(PRIX_ANNUEL)}) vaut ${PERIODE_ANNUELLE}.`,
  },
  {
    q: "Notre école est en France, pouvons-nous prendre l'offre établissement ?",
    a: "Non : l'offre établissement ne concerne que les écoles, collèges et lycées situés hors de France. En France, les professeurs ont leur compte à titre personnel, et les familles peuvent prendre le suivi.",
  },
];

export default function TarifsClient() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 [color-scheme:light]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12">
        {/* 1. LA PROMESSE */}
        <section className="text-center">
          <p className="inline-flex rounded-full bg-sky-100 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-sky-800 ring-1 ring-sky-200">
            Ouverture {OUVERTURE_SUIVI}
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">Les offres d&apos;EleveAI</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Le coach reste ouvert à tous. Ce qui s&apos;achète, c&apos;est ce qu&apos;une IA ne fait pas : suivre votre enfant dans
            son programme, toute la vidéothèque, et un professeur en direct.
          </p>
        </section>

        {/* 2. LES QUATRE CARTES */}
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col rounded-3xl border-2 border-emerald-300 bg-emerald-50/50 p-6">
            <p className="text-sm font-black uppercase tracking-wide text-emerald-700">Pour toujours</p>
            <h2 className="mt-1 text-2xl font-black">Ouvert à tous</h2>
            <p className="mt-1 text-slate-600">Élèves et professeurs, sans abonnement.</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-800">
              {OUVERT.map((t) => <Puce key={t} couleur="text-emerald-600">{t}</Puce>)}
            </ul>
            <Link href="/coach-ia/maths" className="mt-6 block rounded-full bg-emerald-600 px-5 py-3 text-center font-black text-white hover:bg-emerald-700">
              Commencer avec le coach
            </Link>
          </div>

          <div className="flex flex-col rounded-3xl border-2 border-sky-300 p-6 shadow-lg">
            <p className="text-sm font-black uppercase tracking-wide text-sky-700">Ouverture {OUVERTURE_SUIVI}</p>
            <h2 className="mt-1 flex items-center gap-2 text-2xl font-black">
              <Eye className="h-6 w-6 text-sky-700" aria-hidden="true" /> Le suivi famille
            </h2>
            <p className="mt-3 text-3xl font-black">
              {montant(PRIX_MENSUEL)} <span className="text-base font-bold text-slate-500">par mois</span>
            </p>
            <p className="text-sm text-slate-500">
              Sans engagement, ou {montant(PRIX_ANNUEL)} {PERIODE_ANNUELLE}. Prix de la France.
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-800">
              {SUIVI.map((t) => <Puce key={t} couleur="text-sky-600">{t}</Puce>)}
            </ul>
            <a href="#pays" className="mt-6 block rounded-full bg-sky-700 px-5 py-3 text-center font-black text-white hover:bg-sky-800">
              Le prix dans mon pays
            </a>
          </div>

          <div className="flex flex-col rounded-3xl border border-slate-200 p-6">
            <p className="text-sm font-black uppercase tracking-wide text-violet-700">À partir de {OUVERTURE_VISIO}</p>
            <h2 className="mt-1 flex items-center gap-2 text-2xl font-black">
              <MonitorPlay className="h-6 w-6 text-violet-700" aria-hidden="true" /> Les cours en visio
            </h2>
            <p className="mt-3 text-3xl font-black">
              {montant(PRIX_VISIO)} <span className="text-base font-bold text-slate-500">la séance</span>
            </p>
            <p className="text-sm text-slate-500">En petit groupe. Prix de la France.</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-800">
              {VISIO.map((t) => <Puce key={t} couleur="text-violet-600">{t}</Puce>)}
            </ul>
          </div>

          <div className="flex flex-col rounded-3xl border border-amber-300 bg-amber-50/40 p-6">
            <p className="text-sm font-black uppercase tracking-wide text-amber-700">Hors de France</p>
            <h2 className="mt-1 flex items-center gap-2 text-2xl font-black">
              <Building2 className="h-6 w-6 text-amber-700" aria-hidden="true" /> Les établissements
            </h2>
            <p className="mt-3 text-3xl font-black">
              {ETABLISSEMENT_ETRANGER.parEleveEtParAn} <span className="text-base font-bold text-slate-500">par élève et par an</span>
            </p>
            <p className="text-sm text-slate-500">
              {ETABLISSEMENT_ETRANGER.parEleveEtParAnAfrique} en zone FCFA. Professeurs inclus.
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-800">
              {ETABLISSEMENT.slice(0, 3).map((t) => <Puce key={t} couleur="text-amber-600">{t}</Puce>)}
            </ul>
            <a href="#etablissements" className="mt-6 block rounded-full bg-amber-500 px-5 py-3 text-center font-black text-slate-900 hover:bg-amber-400">
              L&apos;offre en détail
            </a>
          </div>
        </section>
        <p className="-mt-8 text-center text-sm text-slate-500">
          Rien n&apos;est encaissé avant l&apos;ouverture. Ces offres ne s&apos;adressent pas aux élèves de son professeur.
        </p>

        {/* 3. POURQUOI, À L'HEURE DE L'IA */}
        <section className="rounded-3xl bg-slate-50 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-2xl font-black sm:text-3xl">
            <Sparkles className="h-7 w-7 text-teal-700" aria-hidden="true" /> Une IA explique. EleveAI suit.
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              { titre: "Le programme de son pays", texte: "Chaque exercice et chaque vidéo est rangé dans le programme officiel, micro-compétence par micro-compétence. Une IA répond à la question posée ; elle ne sait pas ce qui vient ensuite." },
              { titre: "Des résultats qui restent", texte: "Chaque réponse est gardée. Vous voyez ce qui est acquis, ce qui coince, et le coach fait revoir ce qui n'est pas solide." },
              { titre: "Un professeur derrière", texte: "Les vidéos sont écrites par un professeur de maths, à partir des erreurs réelles des élèves, et il les corrige chaque semaine." },
            ].map((b) => (
              <div key={b.titre} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <h3 className="font-black">{b.titre}</h3>
                <p className="mt-1 text-sm text-slate-600">{b.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. UN PRIX PAR PAYS */}
        <section id="pays" className="scroll-mt-20">
          <h2 className="flex items-center gap-2 text-2xl font-black sm:text-3xl">
            <Globe2 className="h-7 w-7 text-sky-700" aria-hidden="true" /> Un prix adapté à chaque pays
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Le même suivi partout, à un prix qui suit le niveau de vie. Paiement par carte, et par paiement mobile là où c&apos;est possible.
          </p>
          <div className="mt-5 overflow-x-auto rounded-2xl ring-1 ring-slate-200">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-3 font-black">Zone</th>
                  <th className="p-3 font-black">Suivi famille, par mois</th>
                  <th className="p-3 font-black">Visio, la séance</th>
                </tr>
              </thead>
              <tbody>
                {PRIX_PAR_PAYS.map((p) => (
                  <tr key={p.zone} className="border-t border-slate-100">
                    <td className="p-3">
                      <p className="font-black">{p.zone}</p>
                      <p className="text-xs text-slate-500">{p.pays}</p>
                    </td>
                    <td className="p-3 font-black">{p.suivi}</td>
                    <td className="p-3 font-black">{p.visio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. L'OFFRE AUX ÉTABLISSEMENTS HORS DE FRANCE */}
        <section id="etablissements" className="scroll-mt-20 grid gap-6 rounded-3xl border border-amber-200 bg-amber-50/50 p-6 sm:p-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-amber-700">Écoles, collèges et lycées hors de France</p>
            <h2 className="mt-1 text-2xl font-black sm:text-3xl">Tout EleveAI pour votre établissement</h2>
            <p className="mt-3 text-slate-700">
              Pour les établissements privés, bilingues ou confessionnels qui enseignent en français, du CP à la Terminale.
              Vos professeurs voient les erreurs de leurs classes micro-compétence par micro-compétence ; vos élèves ont
              toute la vidéothèque ; leurs parents suivent leurs progrès.
            </p>
            <p className="mt-4 text-3xl font-black">
              {ETABLISSEMENT_ETRANGER.parEleveEtParAn} <span className="text-base font-bold text-slate-500">par élève et par an</span>
            </p>
            <p className="text-sm text-slate-600">
              {ETABLISSEMENT_ETRANGER.parEleveEtParAnAfrique} en zone FCFA · à partir de {ETABLISSEMENT_ETRANGER.minimumEleves} élèves · les comptes des professeurs sont inclus.
            </p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-black text-slate-900 hover:bg-amber-400">
              Écrire pour votre établissement <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <p className="mt-2 text-xs text-slate-500">Réponse sous {ETABLISSEMENT_ETRANGER.delaiReponse}, avec le prix pour votre nombre d&apos;élèves.</p>
          </div>
          <ul className="space-y-3 self-center text-slate-800">
            {ETABLISSEMENT.map((t) => <Puce key={t} couleur="text-amber-600">{t}</Puce>)}
            <li className="rounded-2xl bg-white p-4 text-sm text-slate-600 ring-1 ring-amber-200">
              Cette offre ne concerne pas les établissements situés en France : là, les professeurs gardent leur compte à
              titre personnel et les familles peuvent prendre le suivi.
            </li>
          </ul>
        </section>

        {/* 6. FAQ */}
        <section>
          <h2 className="text-2xl font-black sm:text-3xl">Vos questions</h2>
          <div className="mt-5 space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="rounded-2xl border border-slate-200 px-5 py-4">
                <summary className="cursor-pointer font-black">{f.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Puce({ children, couleur }: { children: React.ReactNode; couleur: string }) {
  return (
    <li className="flex gap-2">
      <Check className={`mt-0.5 h-5 w-5 shrink-0 ${couleur}`} aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}
