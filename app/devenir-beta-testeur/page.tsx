// /devenir-beta-testeur — 50 places pour l'année scolaire 2026-2027.
//
// Pourquoi cette page existe : un élève a demandé la gratuité. Lui répondre par
// une remise aurait été une faute — les élèves capables de repérer et de
// formuler une erreur sont massivement ceux qui ont du temps, du vocabulaire et
// des parents derrière. Un tarif indexé sur la contribution aurait fait une
// remise à ceux qui peuvent payer et plein tarif aux autres.
//
// On répond donc par un RÔLE, pas par un prix. Un rôle, tout le monde peut y
// prétendre : aucune exception nominative, aucun précédent. Et un bêta testeur
// n'est pas un QA salarié — dans toute l'industrie du logiciel, il est payé en
// accès, en nom au générique et en droit de râler avant les autres.

import type { Metadata } from "next";
import Link from "next/link";
import FormulaireBeta from "./FormulaireBeta";
import { ANNEE_BETA, FIN_BETA, TOTAL_PLACES } from "@/lib/beta/places";

const SITE_URL = "https://www.eleveai.fr";

export const metadata: Metadata = {
  // Le layout ajoute déjà « — EleveAI » : pas de marque dans le title.
  title: "Devenir bêta testeur",
  description: `${TOTAL_PLACES} places pour l'année scolaire ${ANNEE_BETA} : élèves, parents et professeurs qui testent le site, signalent ce qui cloche et voient leurs corrections appliquées. Accès gratuit jusqu'au ${FIN_BETA}.`,
  alternates: { canonical: `${SITE_URL}/devenir-beta-testeur` },
  openGraph: {
    title: "Devenir bêta testeur — EleveAI",
    description: `${TOTAL_PLACES} places pour l'année ${ANNEE_BETA}. Tu repères ce qui ne va pas, on le corrige, ton prénom reste dessus.`,
    url: `${SITE_URL}/devenir-beta-testeur`,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

// LE RÔLE — ce qu'on fait vraiment, en trois gestes concrets. C'est ça qui rend
// le titre désirable : pas le mot, mais ce qu'il autorise.
const LE_ROLE = [
  {
    emoji: "🔎",
    titre: "Tu dis quand c'est faux",
    texte:
      "Une question dont la réponse ne tombe pas juste, un énoncé qu'on ne comprend pas, un exercice qui ne correspond pas au programme. Tu le signales là où tu l'as vu, en deux clics.",
  },
  {
    emoji: "🛠️",
    titre: "C'est corrigé, et tu le vois",
    texte:
      "Ton signalement arrive directement chez Frédéric. Quand il est retenu, la correction part en ligne — et tu retrouves la question réparée à l'endroit exact où tu l'avais trouvée cassée.",
  },
  {
    emoji: "✍️",
    titre: "Ton prénom reste dessus",
    texte:
      "Corrigé grâce à toi, et écrit. Ton prénom seul, jamais ton nom de famille, jamais ta classe ni ton établissement.",
  },
];

// L'ENGAGEMENT — formulé comme une intention, jamais comme un quota. Ce sont
// des mineurs, et Frédéric est leur professeur : dès qu'un rythme est exigé,
// ce n'est plus du test, c'est du travail.
const ENGAGEMENT = [
  "Tu signales quand tu vois quelque chose — pas selon un rythme imposé. Il n'y a aucun nombre à atteindre, aucun minimum par mois, rien à rendre.",
  "Tu dis les choses franchement. « Cet exercice est nul » est un signalement utile s'il est suivi de pourquoi.",
  "Tu peux arrêter quand tu veux, sans prévenir et sans te justifier. Ta place repart simplement à quelqu'un d'autre.",
];

const TU_RECOIS = [
  {
    titre: "L'accès complet, gratuit",
    texte: `Tout le site, sans limite, jusqu'au ${FIN_BETA} — y compris ce qui est payant pour les autres : la progression enregistrée, l'historique, le suivi.`,
  },
  {
    titre: "Un numéro de place",
    texte: `Tu es le bêta testeur n°X de l'année ${ANNEE_BETA}. Il y en a ${TOTAL_PLACES} en tout, et le numéro ne change plus.`,
  },
  {
    titre: "Ce qui arrive avant les autres",
    texte:
      "Les nouveautés te sont ouvertes en premier — c'est le principe : quelqu'un doit bien les casser avant qu'elles sortent.",
  },
];

export default function DevenirBetaTesteurPage() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#041B33] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <header className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300/80">
            Année scolaire {ANNEE_BETA}
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
            Devenir bêta testeur
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold text-white/75">
            Le site s’écrit toute l’année, et il a des trous. {TOTAL_PLACES} personnes
            vont passer l’année à les trouver avant les autres élèves — et à les
            faire réparer. Si tu en veux une place, elle est gratuite.
          </p>
        </header>

        {/* ── LE RÔLE ──────────────────────────────────────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-black">Le rôle</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {LE_ROLE.map((r) => (
              <div
                key={r.titre}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-2xl" aria-hidden>
                  {r.emoji}
                </p>
                <p className="mt-2 font-black text-white">{r.titre}</p>
                <p className="mt-1 text-sm font-semibold text-white/70">{r.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── L'ENGAGEMENT ─────────────────────────────────────────────── */}
        <section className="mt-10">
          <h2 className="text-2xl font-black">L’engagement</h2>
          <p className="mt-2 text-sm font-semibold text-white/60">
            Il tient en trois phrases, et aucune ne contient de chiffre.
          </p>
          <ul className="mt-4 space-y-2">
            {ENGAGEMENT.map((e) => (
              <li
                key={e}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-white/80"
              >
                {e}
              </li>
            ))}
          </ul>
        </section>

        {/* ── CE QUE TU REÇOIS ─────────────────────────────────────────── */}
        <section className="mt-10">
          <h2 className="text-2xl font-black">Ce que tu reçois</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {TU_RECOIS.map((r) => (
              <div
                key={r.titre}
                className="rounded-2xl border border-emerald-300/25 bg-emerald-400/[0.08] p-4"
              >
                <p className="font-black text-emerald-200">{r.titre}</p>
                <p className="mt-1 text-sm font-semibold text-white/75">{r.texte}</p>
              </div>
            ))}
          </div>
          {/* La sortie de bêta, écrite AVANT la mise en ligne. Sans cette
              phrase, on créait 50 accès gratuits à vie sans l'avoir décidé —
              et la FAQ des tarifs porte déjà une promesse de ce genre. */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="font-black text-white">Et après ?</p>
            <p className="mt-1 text-sm font-semibold text-white/70">
              Ta place court jusqu’au {FIN_BETA}, puis elle s’arrête. Elle est{" "}
              <strong className="text-white">
                renouvelable chaque année, après approbation
              </strong>{" "}
              — rien n’est reconduit tout seul. En juin, tu repostules avec ce
              que tu as trouvé pendant l’année.
            </p>
          </div>
        </section>

        {/* ── NOUS RECHERCHONS + FORMULAIRE ────────────────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-black">Nous recherchons</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold text-white/70">
            Les places sont réparties, et ce n’est pas décoratif : cinquante
            élèves de 6ᵉ testeraient tous la même chose. Un élève de 3ᵉ ne verra
            jamais ce qui bloque un CE1 sur une consigne.
          </p>
          <div className="mt-6">
            <FormulaireBeta />
          </div>
        </section>

        {/* ── LES ÉTABLISSEMENTS ───────────────────────────────────────── */}
        <section className="mt-10 rounded-2xl border border-sky-300/25 bg-sky-400/[0.08] p-5">
          <h2 className="text-lg font-black text-sky-100">
            Vous représentez un collège ou une école ?
          </h2>
          <p className="mt-2 text-sm font-semibold text-white/75">
            Un établissement ne prend pas une des {TOTAL_PLACES} places — un
            collège de 600 élèves avalerait la bêta entière à lui seul. Vous avez
            une autre porte, faite pour ça : l’accès pilote gratuit de quatre
            semaines, pour tout l’établissement.
          </p>
          <Link
            href="/offre-pilote"
            className="mt-3 inline-block rounded-xl bg-sky-500 px-4 py-2 text-sm font-black text-white hover:bg-sky-400"
          >
            Voir l’accès pilote
          </Link>
        </section>

        <p className="mt-10 text-center text-xs font-semibold text-white/40">
          Prénom seul, jamais le nom de famille. Aucune candidature n’est
          transmise à qui que ce soit.
        </p>
      </div>
    </main>
  );
}
