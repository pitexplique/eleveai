// /faire-un-don — « Participez à l'aventure ».
// Page de soutien libre, dans l'esprit de Frédéric : on AFFICHE les coûts, on
// dit où va chaque euro, et on rappelle que l'élève ne paie jamais. Le don se
// fait par Wero, vers le numéro de Frédéric. Transparence radicale = la ligne.
//
// ⚠️ Décision assumée (26/07) : encaissement via Wero perso, en test. Le cadre
// (statut / asso) reste à poser — voir mémoire monetisation-retraite-statut.

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CopierNumero from "./CopierNumero";

const SITE_URL = "https://eleveai.fr";

// Le numéro Wero (déjà public sur /entreprises). Un seul endroit à changer.
const NUMERO_AFFICHE = "06 92 74 29 58";
const NUMERO_TEL = "+262692742958";

export const metadata: Metadata = {
  // Le layout ajoute déjà « — EleveAI ».
  title: "Faire un don · Participez à l'aventure",
  description:
    "EleveAI est gratuit pour l'élève, et le restera. Faire tourner la machine a un coût — on l'affiche. Soutenez le projet par Wero : chaque euro va aux coûts, jamais à de la pub.",
  alternates: { canonical: `${SITE_URL}/faire-un-don` },
  openGraph: {
    title: "Faire un don · Participez à l'aventure — EleveAI",
    description:
      "Une éducation libre et gratuite. On affiche les coûts, 100 % de votre don y va, l'élève ne paie jamais. Soutien par Wero.",
    url: `${SITE_URL}/faire-un-don`,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

// Le coût réel, poste par poste. On ne nomme PAS les prestataires (choix
// de Frédéric) : on décrit le service, pas la marque.
const COUTS = [
  { emoji: "🤖", poste: "L'IA (le coach qui répond aux élèves)", montant: "92 €" },
  { emoji: "☁️", poste: "L'hébergement du site", montant: "18 €" },
  { emoji: "🗄️", poste: "La base de données", montant: "18 €" },
];

// Où va ton don : d'abord la machine, ensuite faire vivre du travail sur l'île.
const DESTINATION = [
  {
    emoji: "⚙️",
    quand: "Aujourd'hui",
    titre: "Garder la machine allumée",
    ligne: "Les ≈ 128 €/mois ci-dessus, en premier. Pas de salaire, pas de pub, pas de marge.",
    color: "border-sky-300/25 from-sky-400/[0.10]",
  },
  {
    emoji: "🌴",
    quand: "Demain",
    titre: "Rémunérer des Réunionnais",
    ligne: "Dès qu'il y a un surplus, il paie des tâches à des gens d'ici — faire vivre du travail sur l'île.",
    color: "border-emerald-300/25 from-emerald-400/[0.10]",
  },
  {
    emoji: "🎓",
    quand: "Toujours",
    titre: "0 € pour l'élève",
    ligne: "L'élève ne paie jamais. Jamais. C'est la promesse, elle ne bouge pas.",
    color: "border-amber-300/25 from-amber-400/[0.10]",
  },
];

// Comment donner par Wero, en pas simples.
const ETAPES = [
  "Ouvre ton appli bancaire (ou l'appli Wero).",
  "Choisis « envoyer de l'argent » → Wero.",
  "Colle le numéro ci-dessus comme destinataire.",
  "Mets le montant que tu veux — et un petit mot (ton prénom, « pour EleveAI »).",
];

export default function FaireUnDonPage() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#041B33] px-4 py-10 text-white sm:px-6 lg:px-8">
      {/* Fond « cahier » + halos, même esprit que l'accueil. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div className="absolute -left-40 top-[-8%] h-[34rem] w-[34rem] rounded-full bg-amber-400/12 blur-[120px]" />
        <div className="absolute right-[-12%] top-[24%] h-[30rem] w-[30rem] rounded-full bg-emerald-500/12 blur-[120px]" />
        <div className="absolute left-[8%] top-[64%] h-[30rem] w-[30rem] rounded-full bg-sky-500/12 blur-[120px]" />
        <span className="absolute right-[6%] top-[4%] rotate-12 text-7xl opacity-15 sm:text-8xl">💛</span>
        <span className="absolute left-[3%] top-[34%] -rotate-12 text-6xl opacity-15 sm:text-7xl">🎓</span>
        <span className="absolute right-[5%] top-[60%] rotate-6 text-6xl opacity-15 sm:text-7xl">⚙️</span>
      </div>

      <div className="mx-auto max-w-3xl">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <p className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-amber-300">
          💛 Participez à l&apos;aventure
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
          Faire un don pour une{" "}
          <span className="text-amber-300">éducation libre et gratuite</span>
        </h1>

        <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/80 sm:text-lg">
          EleveAI est gratuit pour l&apos;élève, et le restera. Mais faire
          tourner la machine a un coût. Ici, on ne le cache pas&nbsp;: on
          l&apos;affiche, et on te dit où va chaque euro.
        </p>

        {/* Le mot de Frédéric. */}
        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <Image
            src="/images/avatar-frederic-Lacoste.jpg"
            alt="Frédéric Lacoste, professeur de mathématiques à La Réunion, fondateur d'EleveAI"
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 rounded-full border-2 border-amber-300/60 object-cover sm:h-16 sm:w-16"
          />
          <p className="text-sm font-semibold leading-6 text-white/85">
            «&nbsp;Je ne veux pas qu&apos;un élève paie pour apprendre. Alors si
            tu peux donner un petit coup de main pour garder la machine allumée,
            tu ne m&apos;aides pas moi&nbsp;: tu aides celui qui, après toi,
            ouvrira le coach sans rien avoir à sortir de sa poche.&nbsp;»
            <span className="mt-1 block text-xs font-black text-white/50">
              — Frédéric Lacoste, professeur de mathématiques, fondateur d&apos;EleveAI
            </span>
          </p>
        </div>

        {/* ── CE QUE ÇA COÛTE ────────────────────────────────────────────── */}
        <h2 className="mt-10 text-xl font-black text-white sm:text-2xl">
          Ce que ça coûte, sans rien cacher
        </h2>
        <p className="mt-1 text-sm font-semibold text-white/60">
          Les chiffres réels, poste par poste.
        </p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <ul className="divide-y divide-white/10">
            {COUTS.map((c) => (
              <li
                key={c.poste}
                className="flex items-center justify-between gap-3 py-3 first:pt-0"
              >
                <span className="flex items-center gap-3 text-sm font-semibold text-white/85">
                  <span className="text-xl" aria-hidden>
                    {c.emoji}
                  </span>
                  {c.poste}
                </span>
                <span className="shrink-0 text-base font-black text-white">
                  {c.montant}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between gap-3 border-t-2 border-amber-300/30 pt-3">
            <span className="text-sm font-black uppercase tracking-wide text-amber-300">
              Total
            </span>
            <span className="text-xl font-black text-amber-300">
              ≈ 128 € / mois
            </span>
          </div>
          <p className="mt-3 text-xs font-semibold leading-5 text-white/55">
            À ça s&apos;ajoutent ~6 h de travail par jour. Celles-là, Frédéric
            ne les compte pas.
          </p>
        </div>

        {/* ── OÙ VA TON DON ──────────────────────────────────────────────── */}
        <h2 className="mt-10 text-xl font-black text-white sm:text-2xl">
          Où va ton don
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {DESTINATION.map((d) => (
            <div
              key={d.titre}
              className={`rounded-2xl border bg-gradient-to-br to-white/[0.03] p-5 ${d.color}`}
            >
              <p className="text-2xl" aria-hidden>
                {d.emoji}
              </p>
              <p className="mt-2 text-xs font-black uppercase tracking-wide text-white/50">
                {d.quand}
              </p>
              <p className="mt-1 text-base font-black text-white">{d.titre}</p>
              <p className="mt-1.5 text-sm font-semibold leading-6 text-white/75">
                {d.ligne}
              </p>
            </div>
          ))}
        </div>

        {/* ── LE DON PAR WERO ────────────────────────────────────────────── */}
        <div className="mt-10 rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-400/[0.10] to-white/[0.03] p-5 sm:p-7">
          <h2 className="text-xl font-black text-white sm:text-2xl">
            Donner par Wero
          </h2>
          <p className="mt-1 text-sm font-semibold text-white/70">
            Le montant que tu veux — même 2&nbsp;€ comptent. Wero envoie
            l&apos;argent d&apos;appli bancaire à appli bancaire, en quelques
            secondes.
          </p>

          {/* Le numéro, en grand + bouton copier. */}
          <div className="mt-5 flex flex-col items-start gap-3 rounded-xl border border-white/15 bg-[#041B33]/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-white/50">
                Numéro Wero
              </p>
              <a
                href={`tel:${NUMERO_TEL}`}
                className="text-3xl font-black tracking-wide text-amber-300 hover:underline sm:text-4xl"
              >
                {NUMERO_AFFICHE}
              </a>
            </div>
            <CopierNumero numero={NUMERO_AFFICHE} />
          </div>

          {/* Les pas. */}
          <ol className="mt-5 space-y-2.5">
            {ETAPES.map((etape, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs font-black text-[#041B33]">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold leading-6 text-white/85">
                  {etape}
                </span>
              </li>
            ))}
          </ol>

          {/* Le petit mot honnête : ce qu'est ce don, et ce qu'il n'est pas. */}
          <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs font-semibold leading-5 text-white/60">
            C&apos;est un soutien libre, sans contrepartie ni reçu fiscal —
            juste un coup de main pour tenir la machine allumée. Merci d&apos;y
            laisser un mot&nbsp;: c&apos;est comme ça que Frédéric saura à qui
            dire merci.
          </p>
        </div>

        {/* ── LA DEVISE ──────────────────────────────────────────────────── */}
        <p className="mt-10 text-center text-lg font-black text-white/80 sm:text-xl">
          «&nbsp;Des epsilons engendrent des infinis.&nbsp;»
        </p>
        <p className="mt-1 text-center text-sm font-semibold text-white/50">
          Chaque petit geste, mis bout à bout, fait tenir le tout.
        </p>

        <p className="mt-8 text-center text-sm font-bold text-white/50">
          <Link href="/" className="underline underline-offset-2 hover:text-white">
            ← Retour au journal
          </Link>
        </p>
      </div>
    </main>
  );
}
