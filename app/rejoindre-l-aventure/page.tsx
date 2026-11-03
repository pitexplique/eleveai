// /rejoindre-l-aventure — un professeur, une classe offerte, huit pays.
//
// ⭐ 03/11/2026 — Frédéric : « vérifier, c'est peut-être un aveu de faiblesse.
// Ça peut commencer par participer à l'aventure. » La page ne demande donc
// jamais de « vérifier » : elle propose de CONSTRUIRE avec nous l'adaptation
// au programme de son pays. Les signalements en font partie, ils ne sont pas
// le titre.
//
// Les 8 pays sont les cases d'un plan d'expérience (lib/aventure/pays.ts) ;
// la page montre les pays, jamais les facteurs.
//
// C'est aussi la page vers laquelle pointent les réseaux sociaux et les
// descriptions YouTube : elle doit se lire seule, sans rien connaître du site.

import type { Metadata } from "next";
import Link from "next/link";
import FormulaireAventure from "./FormulaireAventure";
import { FIN_AVENTURE, PAYS_AVENTURE, type StatutPays } from "@/lib/aventure/pays";

const SITE_URL = "https://www.eleveai.fr";

export const metadata: Metadata = {
  // Le layout ajoute déjà « — EleveAI ».
  title: "Rejoindre l'aventure : 8 pays francophones",
  description: `EleveAI s'adapte au programme de 8 pays francophones. Professeurs : votre classe a le coach, les vidéos, les fiches et le suivi par élève gratuitement jusqu'au ${FIN_AVENTURE}, et vous construisez avec nous l'adaptation à votre pays.`,
  alternates: { canonical: `${SITE_URL}/rejoindre-l-aventure` },
  openGraph: {
    title: "EleveAI, adapté à 8 pays francophones",
    description:
      "Professeurs de France, d'Andorre, de Suisse, de Belgique, du Luxembourg, de Côte d'Ivoire, du Sénégal et du Maroc : votre classe offerte toute l'année.",
    url: `${SITE_URL}/rejoindre-l-aventure`,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

const STATUT: Record<StatutPays, { label: string; classe: string }> = {
  "programme-francais": {
    label: "Programme français",
    classe: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
  },
  relie: {
    label: "Programme du pays relié",
    classe: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
  },
  "en-preparation": {
    label: "En préparation",
    classe: "border-amber-300/30 bg-amber-400/10 text-amber-200",
  },
};

const LA_CLASSE_RECOIT = [
  {
    emoji: "🎯",
    titre: "Le coach",
    texte:
      "Des exercices qui changent à chaque fois, du plus simple au défi, sur chaque compétence du programme. L'élève avance à son rythme.",
  },
  {
    emoji: "🎬",
    titre: "Les vidéos",
    texte:
      "Une vidéo pour comprendre et un short pour se tester, rattachés à la compétence que l'élève travaille.",
  },
  {
    emoji: "📄",
    titre: "Les fiches",
    texte:
      "Des fiches de cours et des fiches d'exercices à projeter ou à imprimer, avec leurs corrigés.",
  },
  {
    emoji: "📊",
    titre: "Le suivi de chaque élève",
    texte:
      "Vous voyez, élève par élève, ce qui est acquis et ce qui coince, en direct pendant le cours et en bilan après.",
  },
];

const VOUS_APPORTEZ = [
  {
    titre: "Votre programme",
    texte:
      "Vous nous dites ce que votre pays enseigne, dans quel ordre, avec quels mots. Nous relions chaque notion à nos exercices et nos vidéos.",
  },
  {
    titre: "Vos élèves",
    texte:
      "Des situations de chez vous pour les énoncés : le marché, le sport, les métiers que vos élèves connaissent.",
  },
  {
    titre: "Votre œil de professeur",
    texte:
      "Quand quelque chose ne tombe pas juste pour votre classe, vous le dites en deux clics, et la correction part en ligne pour tous.",
  },
];

export default function RejoindreAventurePage() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#041B33] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <header className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300/80">
            Professeurs de mathématiques
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
            EleveAI, adapté à 8 pays francophones
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold text-white/75">
            Un même site, et le programme de votre pays. Rejoignez l’aventure :
            votre classe a tout EleveAI gratuitement jusqu’au {FIN_AVENTURE},
            et vous construisez avec nous ce qu’il devient chez vous.
          </p>
          <a
            href="#rejoindre"
            className="mt-6 inline-block rounded-xl bg-amber-400 px-6 py-3 text-base font-black text-slate-900 transition hover:bg-amber-300"
          >
            Je rejoins l’aventure
          </a>
        </header>

        {/* ── LES 8 PAYS ───────────────────────────────────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-black">Les 8 pays</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PAYS_AVENTURE.map((p) => {
              const s = STATUT[p.statut];
              const contenu = (
                <>
                  <span className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/drapeaux/${p.slug}.svg`}
                      alt=""
                      width={28}
                      height={21}
                      className="h-[21px] w-7 shrink-0 rounded-[3px] object-cover ring-1 ring-white/20"
                    />
                    <span className="font-black text-white">{p.nom}</span>
                  </span>
                  <span
                    className={`mt-2 inline-block rounded-full border px-2 py-0.5 text-[11px] font-black ${s.classe}`}
                  >
                    {s.label}
                  </span>
                </>
              );
              return (
                <li key={p.slug}>
                  {p.lien ? (
                    <Link
                      href={p.lien}
                      className="block h-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/30"
                    >
                      {contenu}
                    </Link>
                  ) : (
                    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      {contenu}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {/* ── CE QUE LA CLASSE REÇOIT ──────────────────────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-black">Ce que votre classe reçoit</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {LA_CLASSE_RECOIT.map((r) => (
              <div
                key={r.titre}
                className="rounded-2xl border border-emerald-300/25 bg-emerald-400/[0.08] p-4"
              >
                <p className="text-2xl" aria-hidden>
                  {r.emoji}
                </p>
                <p className="mt-2 font-black text-emerald-200">{r.titre}</p>
                <p className="mt-1 text-sm font-semibold text-white/75">{r.texte}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm font-semibold text-white/60">
            Gratuit pour vous et pour vos élèves jusqu’au {FIN_AVENTURE}. Rien
            n’est reconduit tout seul : en juin, on fait le point ensemble.
          </p>
        </section>

        {/* ── CE QUE VOUS APPORTEZ ─────────────────────────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-black">Ce que vous apportez</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {VOUS_APPORTEZ.map((r) => (
              <div
                key={r.titre}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="font-black text-white">{r.titre}</p>
                <p className="mt-1 text-sm font-semibold text-white/70">{r.texte}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm font-semibold text-white/60">
            Aucun quota, aucun rapport à rendre. Votre prénom figure sur les
            notions que vous avez construites avec nous, si vous le souhaitez.
          </p>
        </section>

        {/* ── FORMULAIRE ───────────────────────────────────────────────── */}
        <section id="rejoindre" className="mt-12 scroll-mt-8">
          <h2 className="text-2xl font-black">Je rejoins l’aventure</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold text-white/70">
            Frédéric, professeur de mathématiques, lit chaque demande et vous
            répond lui-même.
          </p>
          <div className="mt-6">
            <FormulaireAventure />
          </div>
        </section>

        <p className="mt-10 text-center text-xs font-semibold text-white/40">
          Prénom seul, jamais le nom de famille. Votre adresse ne sert qu’à vous
          répondre et n’est transmise à personne.
        </p>
      </div>
    </main>
  );
}
