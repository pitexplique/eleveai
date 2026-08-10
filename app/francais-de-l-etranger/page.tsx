// /francais-de-l-etranger — la porte d'entrée des familles françaises
// expatriées. Idée née d'Arthur (élève-testeur, 6e) : « il faudrait traduire
// eleveai pour les étrangers » → raffinée en « les Français chez les
// étrangers » : ils veulent le programme français EN français, et ont
// l'habitude de payer les ressources numériques. Zéro traduction nécessaire.
// Angle unique : La Réunion est elle-même à 9 000 km de Paris — suivre le
// programme français loin de la métropole, c'est notre quotidien.

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import EncartCallEnDirect from "@/components/accueil/EncartCallEnDirect";

const SITE_URL = "https://www.eleveai.fr";

export const metadata: Metadata = {
  title: "Le programme français à l'étranger",
  description:
    "Votre enfant grandit loin de la France ? Dictée quotidienne, coach IA aligné sur le programme français (CP au Bac), cahiers de vacances à imprimer — où que vous soyez, à votre fuseau horaire. Conçu par un professeur français, à La Réunion.",
  alternates: { canonical: `${SITE_URL}/francais-de-l-etranger` },
  keywords: [
    "programme français à l'étranger",
    "soutien scolaire expatriés",
    "école française étranger",
    "dictée quotidienne en ligne",
    "garder le niveau de français",
    "AEFE soutien scolaire",
    "cahier de vacances expatriés",
    "retour en France école",
  ],
  openGraph: {
    title: "Le programme français à l'étranger — EleveAI",
    description:
      "Dictée quotidienne, coach IA aligné programme français, cahiers à imprimer — où que vous soyez. Conçu par un prof français, à 9 000 km de Paris.",
    url: `${SITE_URL}/francais-de-l-etranger`,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

// Les 4 vraies douleurs d'une famille expatriée → les 4 réponses déjà en prod.
const REPONSES = [
  {
    emoji: "🗣️",
    douleur: "« Mon enfant perd son français »",
    reponse:
      "La dictée du jour : 5 mots à écouter et écrire, chaque jour, en 5 minutes. Le rituel qui garde le français vivant, même quand l'école est dans une autre langue.",
    cta: "Découvrir la dictée du jour",
    href: "/dictee-du-jour",
    color: "border-rose-300/25 from-rose-400/[0.10]",
  },
  {
    emoji: "📚",
    douleur: "« Il décroche du programme français »",
    reponse:
      "Un coach IA aligné sur les programmes officiels, du CP au Bac : maths, français, anglais, espagnol, IA. Il explique et encourage — il ne fait pas à la place.",
    cta: "Essayer le coach",
    href: "/coach-ia/maths",
    color: "border-cyan-300/25 from-cyan-400/[0.10]",
  },
  {
    emoji: "🧑‍🏫",
    douleur: "« Aucun prof français sous la main »",
    reponse:
      "Des rendez-vous en direct avec un professeur de mathématiques français en poste — les horaires sont affichés dans votre fuseau (New York, métropole, Réunion).",
    cta: "Voir le prochain rendez-vous",
    href: "#en-direct",
    color: "border-amber-300/25 from-amber-400/[0.10]",
  },
  {
    emoji: "🌏",
    douleur: "« Le décalage horaire complique tout »",
    reponse:
      "Tout EleveAI est utilisable à toute heure : le coach, la dictée, les parcours. Et les cahiers de vacances s'impriment depuis n'importe où — corrigés compris.",
    cta: "Imprimer un cahier de vacances",
    href: "/cahier-vacances",
    color: "border-emerald-300/25 from-emerald-400/[0.10]",
  },
];

export default function FrancaisDeLEtrangerPage() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#041B33] px-4 py-10 text-white sm:px-6 lg:px-8">
      {/* Fond joyeux, même esprit que l'accueil : quadrillage « cahier » +
         halos de couleur + icônes voyage qui flottent (décoratif, aria-hidden).
         On garde le bleu nuit — loin, mais sous le même ciel. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div className="absolute -left-40 top-[-8%] h-[34rem] w-[34rem] rounded-full bg-sky-500/15 blur-[120px]" />
        <div className="absolute right-[-12%] top-[22%] h-[30rem] w-[30rem] rounded-full bg-amber-400/10 blur-[120px]" />
        <div className="absolute left-[6%] top-[60%] h-[30rem] w-[30rem] rounded-full bg-emerald-500/12 blur-[120px]" />
        <div className="absolute right-[2%] top-[85%] h-[28rem] w-[28rem] rounded-full bg-rose-500/10 blur-[120px]" />

        {/* Icônes voyage — grosses, très transparentes, légèrement penchées. */}
        <span className="absolute right-[6%] top-[3%] rotate-12 text-7xl opacity-15 sm:text-8xl">✈️</span>
        <span className="absolute left-[3%] top-[26%] -rotate-12 text-6xl opacity-15 sm:text-7xl">🗼</span>
        <span className="absolute right-[4%] top-[46%] rotate-6 text-6xl opacity-15 sm:text-7xl">📮</span>
        <span className="absolute left-[5%] top-[68%] rotate-[-8deg] text-6xl opacity-15 sm:text-7xl">🌴</span>
        <span className="absolute right-[8%] top-[92%] -rotate-6 text-6xl opacity-15 sm:text-7xl">🧳</span>
        <span className="absolute left-[40%] top-[9%] rotate-3 text-5xl opacity-10 sm:text-6xl">🌍</span>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <p className="inline-flex items-center rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-sky-300">
          🌍 Familles françaises à l&apos;étranger
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
          Votre enfant grandit loin de la France&nbsp;?{" "}
          <span className="text-amber-300">Ici, il est chez lui.</span>
        </h1>

        <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/80 sm:text-lg">
          Le programme français, la dictée quotidienne, un coach qui explique
          sans juger — utilisables à votre fuseau horaire, où que vous viviez.
        </p>

        {/* L'angle unique : nous aussi, on est loin de Paris. */}
        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <Image
            src="/images/avatar-frederic-Lacoste.jpg"
            alt="Frédéric Lacoste, professeur de mathématiques à La Réunion, fondateur d'EleveAI"
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 rounded-full border-2 border-amber-300/60 object-cover sm:h-16 sm:w-16"
          />
          <p className="text-sm font-semibold leading-6 text-white/85">
            « EleveAI est né à La Réunion — à{" "}
            <span className="font-black text-amber-200">9 000 km de Paris</span>.
            Suivre le programme français loin de la métropole, c&apos;est notre
            quotidien depuis toujours. Je sais exactement ce que vivent vos
            enfants. »
            <span className="mt-1 block text-xs font-black text-white/50">
              — Frédéric Lacoste, professeur de mathématiques, fondateur d&apos;EleveAI
            </span>
          </p>
        </div>

        {/* Preuve (vraie donnée analytics : cahiers tirés depuis les USA). */}
        <p className="mt-4 text-sm font-bold text-white/60">
          ✈️ Nos cahiers de vacances sont déjà téléchargés depuis les
          États-Unis — rejoignez les familles qui gardent le lien avec
          l&apos;école française.
        </p>

        {/* ── LES 4 DOULEURS → RÉPONSES ────────────────────────────────────── */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {REPONSES.map((r) => (
            <div
              key={r.douleur}
              className={`flex flex-col rounded-2xl border bg-gradient-to-br to-white/[0.03] p-5 ${r.color}`}
            >
              <p className="text-2xl" aria-hidden>
                {r.emoji}
              </p>
              <h2 className="mt-2 text-lg font-black text-white">{r.douleur}</h2>
              <p className="mt-2 flex-1 text-sm font-semibold leading-6 text-white/75">
                {r.reponse}
              </p>
              <Link
                href={r.href}
                className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-white transition hover:bg-white/20"
              >
                {r.cta} →
              </Link>
            </div>
          ))}
        </div>

        {/* ── PRÉPARER UN RETOUR EN FRANCE ─────────────────────────────────── */}
        <div className="mt-8 rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-400/[0.10] to-white/[0.03] p-5 sm:p-6">
          <h2 className="text-lg font-black text-white">
            🧭 Vous préparez un retour en France&nbsp;?
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-white/75">
            Les parcours d&apos;EleveAI font le point notion par notion, classe
            par classe : vous savez exactement où en est votre enfant par
            rapport au programme — et le coach reprend ce qui est fragile,
            sans stress et sans jugement.
          </p>
          <Link
            href="/parcours"
            className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-violet-400 px-5 py-2.5 text-sm font-black text-[#041B33] transition hover:brightness-110"
          >
            Faire le point avec un parcours →
          </Link>
        </div>

        {/* ── COMMENT ÇA MARCHE / PRIX (honnête : pas « tout gratuit ») ────── */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <h2 className="text-lg font-black text-white">Comment commencer ?</h2>
          <ol className="mt-3 space-y-2 text-sm font-semibold leading-6 text-white/80">
            <li>
              <span className="font-black text-amber-200">1.</span> Découvrez
              gratuitement : la dictée du jour, les cahiers de vacances à
              imprimer, l&apos;essai du coach — sans installation, depuis
              n&apos;importe quel pays.
            </li>
            <li>
              <span className="font-black text-amber-200">2.</span> Créez votre
              espace famille (par email — aucun établissement requis) pour
              suivre la progression de votre enfant.
            </li>
            <li>
              <span className="font-black text-amber-200">3.</span> Pour un
              accompagnement complet, découvrez l&apos;offre Famille sur la{" "}
              <Link href="/tarifs" className="font-black text-amber-200 underline underline-offset-2 hover:text-amber-100">
                page des tarifs
              </Link>
              .
            </li>
          </ol>
          <Link
            href="/auth/signin?from=expat"
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-black text-[#041B33] shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
          >
            ✨ Créer notre espace famille →
          </Link>
        </div>
      </div>

      {/* ── LE RENDEZ-VOUS EN DIRECT (formulaire d'inscription complet) ───── */}
      <div className="mx-auto mt-4 max-w-4xl">
        <EncartCallEnDirect />
      </div>
    </main>
  );
}
