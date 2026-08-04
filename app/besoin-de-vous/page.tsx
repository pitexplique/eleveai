// /besoin-de-vous — LA PAGE DE RÉCEPTION.
// Destination des publications Instagram / YouTube (« lien en bio »). Sa mission
// n'est pas de vendre : c'est de montrer le SOCLE HUMAIN d'EleveAI (des gens
// réels, nommés — pas un algorithme), de PROUVER que les contributions
// deviennent de vraies améliorations (le mur « à l'honneur », data-driven), puis
// d'ouvrir les portes : apprendre, améliorer, ou juste dire un mot.
//
// Voir mémoire : socle-humain-et-eleves-contributeurs, eleveai-a-besoin-de-vous-plan.
// ⚠️ RÈGLE ABSOLUE (12/07) : on ne nomme JAMAIS publiquement l'inspectrice ni le
// contact institutionnel — uniquement leurs rôles (« l'inspection », « l'institution »).

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getElevesALHonneur,
  getAmeliorationsALHonneur,
} from "@/lib/ameliorations/honneurServer";
import ElevesALHonneur from "@/components/ameliorations/ElevesALHonneur";

const SITE_URL = "https://eleveai.fr";

export const metadata: Metadata = {
  title: "EleveAI a besoin de vous",
  description:
    "EleveAI n'est pas fait par un algorithme, mais par des gens : un prof, ses élèves, des parents. Viens apprendre, améliorer le site, ou juste dire un mot — et ajoute-toi au socle.",
  alternates: { canonical: `${SITE_URL}/besoin-de-vous` },
  openGraph: {
    title: "EleveAI a besoin de vous",
    description:
      "Ici, tu ne regardes pas : tu construis. Le site est fait par ses élèves et son prof — pas l'un sans l'autre. Viens t'ajouter au socle.",
    url: `${SITE_URL}/besoin-de-vous`,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

// Recharge le mur au plus toutes les heures (comme /votre-avis) — 04/08 :
// allongé de 5 min à 1 h, quota ISR Reads.
export const revalidate = 3600;

// Le socle : les gens qui FONT EleveAI. Prénoms seuls pour les élèves (RGPD).
const SOCLE = [
  {
    emoji: "🧑‍🏫",
    titre: "Le prof",
    nom: "Frédéric",
    texte:
      "Frédéric Lacoste, prof de maths à La Réunion. Il code EleveAI le soir, après ses classes — pour ses élèves d'abord.",
    color: "border-amber-300/25 from-amber-400/[0.12]",
  },
  {
    emoji: "🧒",
    titre: "Les élèves",
    nom: "Les créateurs",
    texte:
      "Ce sont eux qui signalent, proposent, corrigent. Le cours est fait AVEC eux — pas l'un sans l'autre. C'est le cœur.",
    color: "border-sky-300/25 from-sky-400/[0.12]",
  },
  {
    emoji: "👨‍👩‍👧",
    titre: "Les parents",
    nom: "Les alliés",
    texte:
      "Jamais des clients : des partenaires qui veulent voir leur enfant grandir en confiance, sans jugement et sans stress.",
    color: "border-emerald-300/25 from-emerald-400/[0.12]",
  },
  {
    emoji: "💡",
    titre: "L'étincelle",
    nom: "L'inspection",
    texte:
      "Une idée soufflée par une inspectrice a donné naissance à Picto Maths. Preuve qu'une bonne intuition peut devenir un outil.",
    color: "border-fuchsia-300/25 from-fuchsia-400/[0.12]",
  },
  {
    emoji: "🏛️",
    titre: "La reconnaissance",
    nom: "L'institution",
    texte:
      "Le rectorat regarde ce qui se construit ici. Un signe que le travail sérieux, ancré dans le réel, finit par compter.",
    color: "border-violet-300/25 from-violet-400/[0.12]",
  },
];

// Nettoie ?from= (Instagram, YouTube…) pour le propager aux liens d'inscription.
function cleanFrom(v: string | string[] | undefined): string | null {
  const raw = Array.isArray(v) ? v[0] : v;
  if (!raw) return null;
  const s = raw.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 30);
  return s || null;
}

export default async function BesoinDeVousPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string | string[] }>;
}) {
  const { from } = await searchParams;
  const source = cleanFrom(from);
  const signinHref = `/auth/signin${source ? `?from=${source}` : ""}`;

  const [honneur, ameliorations] = await Promise.all([
    getElevesALHonneur(),
    getAmeliorationsALHonneur(12),
  ]);

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#041B33] px-4 py-10 text-white sm:px-6 lg:px-8">
      {/* Fond « cahier » + halos + emoji flottants, esprit accueil. */}
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
        <div className="absolute right-[-12%] top-[20%] h-[30rem] w-[30rem] rounded-full bg-sky-500/15 blur-[120px]" />
        <div className="absolute left-[6%] top-[58%] h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/12 blur-[120px]" />
        <div className="absolute right-[2%] top-[85%] h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-[120px]" />
        <span className="absolute right-[6%] top-[3%] rotate-12 text-7xl opacity-15 sm:text-8xl">💛</span>
        <span className="absolute left-[3%] top-[24%] -rotate-12 text-6xl opacity-15 sm:text-7xl">🤝</span>
        <span className="absolute right-[4%] top-[48%] rotate-6 text-6xl opacity-15 sm:text-7xl">✨</span>
        <span className="absolute left-[5%] top-[70%] rotate-[-8deg] text-6xl opacity-15 sm:text-7xl">🚀</span>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <p className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-amber-300">
          👋 Tu viens d&apos;Instagram ou de YouTube&nbsp;? Bienvenue.
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
          Ici, tu ne regardes pas.{" "}
          <span className="text-amber-300">Tu construis.</span>
        </h1>

        <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/80 sm:text-lg">
          EleveAI n&apos;est pas fait par un algorithme. Il est fait par des{" "}
          <span className="font-black text-white">gens réels</span> : un prof, ses
          élèves, des parents. Le cours est fait par les élèves et les profs —{" "}
          <span className="font-black text-amber-200">pas l&apos;un sans l&apos;autre.</span>
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="#portes"
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-black text-[#041B33] shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
          >
            ✨ Qu&apos;est-ce que je viens faire ici ?
          </Link>
          <Link
            href="#preuve"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/20"
          >
            Voir ce que les élèves ont déjà changé →
          </Link>
        </div>

        {/* ── LE SOCLE ─────────────────────────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-black sm:text-3xl">
            🫱🏽‍🫲🏼 EleveAI, c&apos;est d&apos;abord des gens
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-white/70">
            Pas une marque, pas une IA anonyme. Un socle de personnes qui existent,
            avec un nom et un visage. La prochaine&nbsp;? Peut-être toi.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SOCLE.map((p, i) => (
              <div
                key={p.titre}
                className={`flex flex-col rounded-2xl border bg-gradient-to-br to-white/[0.03] p-5 ${p.color}`}
              >
                {p.nom === "Frédéric" ? (
                  <Image
                    src="/images/avatar-frederic-Lacoste.jpg"
                    alt="Frédéric Lacoste, fondateur d'EleveAI"
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full border-2 border-amber-300/60 object-cover"
                  />
                ) : (
                  <span className="text-3xl" aria-hidden>
                    {p.emoji}
                  </span>
                )}
                <p className="mt-3 text-[11px] font-black uppercase tracking-wide text-white/50">
                  {p.titre}
                </p>
                <p className="text-lg font-black text-white">{p.nom}</p>
                <p className="mt-1 flex-1 text-sm font-semibold leading-6 text-white/75">
                  {p.texte}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── LES TROIS PORTES ─────────────────────────────────────────────── */}
        <section id="portes" className="mt-14 scroll-mt-6">
          <h2 className="text-2xl font-black sm:text-3xl">Qu&apos;est-ce que tu viens faire&nbsp;?</h2>
          <p className="mt-2 text-sm font-semibold text-white/70">
            Trois portes. Aucune n&apos;est fermée, et aucune n&apos;a besoin d&apos;argent.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {/* Apprendre */}
            <div className="flex flex-col rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-400/[0.12] to-white/[0.03] p-5">
              <span className="text-3xl" aria-hidden>📚</span>
              <h3 className="mt-2 text-lg font-black text-white">Je viens apprendre</h3>
              <p className="mt-1 flex-1 text-sm font-semibold leading-6 text-white/75">
                Un coach IA qui explique sans juger, du CM1 au Bac — maths, français,
                anglais, espagnol, IA.
              </p>
              <Link
                href="/coach-ia/maths"
                className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-black text-[#041B33] transition hover:brightness-110"
              >
                Essayer le coach →
              </Link>
            </div>

            {/* Améliorer */}
            <div className="flex flex-col rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-400/[0.14] to-white/[0.03] p-5">
              <span className="text-3xl" aria-hidden>🛠️</span>
              <h3 className="mt-2 text-lg font-black text-white">Je viens améliorer</h3>
              <p className="mt-1 flex-1 text-sm font-semibold leading-6 text-white/75">
                Une idée, un bug repéré, un détail à corriger&nbsp;? Retenu, il devient
                une vraie amélioration <span className="font-black text-amber-200">signée de ton prénom</span> (+50 points).
              </p>
              <Link
                href="/votre-avis"
                className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-black text-[#041B33] transition hover:brightness-110"
              >
                Proposer une idée →
              </Link>
            </div>

            {/* Dire un mot */}
            <div className="flex flex-col rounded-2xl border border-emerald-300/25 bg-gradient-to-br from-emerald-400/[0.12] to-white/[0.03] p-5">
              <span className="text-3xl" aria-hidden>💬</span>
              <h3 className="mt-2 text-lg font-black text-white">Je viens dire un mot</h3>
              <p className="mt-1 flex-1 text-sm font-semibold leading-6 text-white/75">
                Un merci, un avis, une critique honnête. Tout compte — c&apos;est ça
                qui fait grandir EleveAI, pour de vrai.
              </p>
              <Link
                href="/votre-avis"
                className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-black text-[#041B33] transition hover:brightness-110"
              >
                Laisser un mot →
              </Link>
            </div>
          </div>
        </section>

        {/* ── LA PREUVE : LE MUR DES AMÉLIORATIONS À L'HONNEUR ─────────────── */}
        {ameliorations.length > 0 ? (
          <section id="preuve" className="mt-14 scroll-mt-6">
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.07] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-black sm:text-3xl">
                  💬 Vous l&apos;avez demandé&nbsp;→&nbsp;✅ C&apos;est fait
                </h2>
                <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-black text-emerald-200">
                  signé de leur prénom
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold leading-6 text-white/75">
                Ce ne sont pas des promesses. Voici de vraies idées d&apos;élèves qui
                ont déjà changé EleveAI&nbsp;:
              </p>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {ameliorations.map((a, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-white/10 bg-slate-900/50 p-4"
                  >
                    <span className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-black text-emerald-200 ring-1 ring-emerald-500/30">
                      {a.eleve}
                    </span>
                    {a.demande ? (
                      <p className="mt-2 text-sm font-medium leading-6 text-white/70">
                        <span className="text-white/40">« </span>
                        {a.demande}
                        <span className="text-white/40"> »</span>
                      </p>
                    ) : null}
                    <p className="mt-1.5 flex items-start gap-2 text-sm font-bold leading-6 text-emerald-200">
                      <span aria-hidden>✅</span>
                      <span>{a.fait}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* ── LES ÉLÈVES À L'HONNEUR (composant réutilisé) ─────────────────── */}
        <div className="mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
          <ElevesALHonneur eleves={honneur} />
        </div>

        {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
        <section className="mt-14">
          <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/[0.14] to-white/[0.03] p-6 text-center sm:p-9">
            <h2 className="text-2xl font-black sm:text-3xl">
              Ajoute-toi au socle. 💛
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-7 text-white/80 sm:text-base">
              EleveAI a besoin de toi — pas comme un slogan, comme une invitation.
              Une idée, un mot, un bug repéré&nbsp;: tu deviens l&apos;un·e de ceux
              qui l&apos;ont construit.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/votre-avis"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-black text-[#041B33] shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
              >
                🌟 Contribuer maintenant →
              </Link>
              <Link
                href={signinHref}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/20"
              >
                Créer mon espace →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
