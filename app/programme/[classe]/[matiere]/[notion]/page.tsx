// La page d'UNE notion du programme — l'étage qui manquait entre
// /programme/<classe> (qui porte jusqu'à 205 compétences d'un coup) et le
// coach. Toute la donnée vient de `listerToutesLesNotions()` : ni liste, ni
// libellé écrits ici. Voir la note longue en bas de lib/programme.ts.
//
// ⛔ SI UNE FICHE DE COURS EXISTE, CETTE PAGE N'EXISTE PAS : elle redirige vers
// la fiche. Deux pages sur « Thalès 4e » se cannibaliseraient. La redirection
// plutôt qu'un 404 est délibérée — le jour où une fiche est écrite, l'adresse
// de programme continue de marcher et passe son autorité à la fiche.

import type { Metadata } from "next";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Check,
  FileText,
  Sparkles,
} from "lucide-react";
import {
  getNotionProgramme,
  listerNotionsAvecPage,
  listerToutesLesNotions,
} from "@/lib/programme";
import { ficheHrefSiExiste } from "@/lib/fiches/registre";

const SITE_URL = "https://www.eleveai.fr";

// ⚠️ ON NE PRÉ-REND QUE LES NOTIONS SANS FICHE. Les autres restent servies à la
// demande — et leur page appelle `redirect()` vers la fiche.
export function generateStaticParams() {
  return listerNotionsAvecPage().map((n) => ({
    classe: n.classeSlug,
    matiere: n.matiere,
    notion: n.notionSlug,
  }));
}

type Params = Promise<{ classe: string; matiere: string; notion: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { classe, matiere, notion } = await params;
  const n = getNotionProgramme(classe, matiere, notion);
  if (!n || n.ficheHref) return {};

  const url = `${SITE_URL}/programme/${n.classeSlug}/${n.matiere}/${n.notionSlug}`;
  // La description reprend les vraies compétences, pas une phrase de remplissage :
  // ce sont elles qu'on tape dans un moteur.
  const listeMicros = n.micros.slice(0, 4).join(", ").toLowerCase();

  return {
    title: `${n.label} ${n.classeLabel} : ce qu'il faut savoir faire`,
    description: `${n.label} ${n.enClasse} — les ${n.micros.length} compétences du programme, une par une : ${listeMicros}. Et un coach IA pour s'entraîner sur chacune.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${n.label} ${n.enClasse} — ${n.micros.length} compétences détaillées`,
      description: `Ce qu'il faut savoir faire, compétence par compétence, et un coach pour s'entraîner.`,
      url,
      type: "website",
      siteName: "EleveAI",
      locale: "fr_FR",
    },
  };
}

export default async function NotionProgrammePage({
  params,
}: {
  params: Params;
}) {
  const { classe, matiere, notion } = await params;
  const n = getNotionProgramme(classe, matiere, notion);
  if (!n) notFound();
  // La fiche est la page de cette notion : on lui passe la main.
  if (n.ficheHref) redirect(n.ficheHref);

  // Les notions voisines du même domaine du BO — un maillage interne qui suit
  // le programme, et une vraie sortie pour l'élève qui s'est trompé de notion.
  const voisines = listerToutesLesNotions().filter(
    (v) =>
      v.classeSlug === n.classeSlug &&
      v.matiere === n.matiere &&
      v.boLabel === n.boLabel &&
      v.notionSlug !== n.notionSlug
  );

  const hubFiches = ficheHrefSiExiste(n.matiere, n.classeSlug, n.notionSlug)
    ? null
    : `/fiches-cours/${n.matiere}/${n.classeSlug}`;

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      <section className="border-b border-slate-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50">
        <div className="mx-auto flex max-w-4xl flex-col gap-5 px-5 py-12 sm:px-8">
          <nav className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-bold text-slate-500">
            <Link
              href={`/programme/${n.classeSlug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Programme {n.classeLabel}
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">{n.matiereLabel}</span>
          </nav>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-black uppercase text-sky-700">
            <BookOpen className="h-4 w-4" />
            {n.matiereLabel} · {n.classeLabel}
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-normal text-slate-900 sm:text-5xl">
              {n.label}
            </h1>
            <p className="mt-3 text-sm font-bold text-slate-500">{n.boLabel}</p>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Les {n.micros.length} compétences du programme {n.enClasse} sur
              cette notion, une par une — et un coach pour s&apos;entraîner sur
              chacune.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <h2 className="text-xl font-black text-slate-900">
          Ce qu&apos;il faut savoir faire
        </h2>
        <ul className="mt-5 space-y-3">
          {n.micros.map((micro) => (
            <li
              key={micro}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
              <span className="text-base leading-7 text-slate-700">{micro}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={n.coachHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
          >
            <Sparkles className="h-4 w-4" />
            S&apos;entraîner avec le coach
          </Link>
          <Link
            href={n.parcoursHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-black text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            <ArrowRight className="h-4 w-4" />
            Se tester sur le parcours
          </Link>
          {hubFiches ? (
            <Link
              href={hubFiches}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-black text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
            >
              <FileText className="h-4 w-4" />
              Les fiches de {n.classeLabel}
            </Link>
          ) : null}
        </div>

        {voisines.length > 0 ? (
          <div className="mt-12">
            <h2 className="text-xl font-black text-slate-900">
              Les autres notions de « {n.boLabel} »
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {voisines.map((v) => (
                <Link
                  key={v.notionSlug}
                  // Une voisine qui a sa fiche est liée DIRECTEMENT à la fiche :
                  // inutile de faire passer l'élève par une redirection.
                  href={
                    v.ficheHref ??
                    `/programme/${v.classeSlug}/${v.matiere}/${v.notionSlug}`
                  }
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-200/40"
                >
                  <span className="text-base font-black text-slate-900">
                    {v.label}
                  </span>
                  {v.ficheHref ? (
                    <span className="mt-0.5 shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-black uppercase text-emerald-700">
                      Fiche
                    </span>
                  ) : (
                    <span className="mt-0.5 shrink-0 text-xs font-bold text-slate-400">
                      {v.micros.length} compét.
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <p className="mt-12 text-sm font-bold text-slate-500">
          <Link
            href={`/programme/${n.classeSlug}`}
            className="underline decoration-slate-300 underline-offset-4 hover:text-slate-700"
          >
            Voir tout le programme {n.enClasse} →
          </Link>
        </p>
      </section>
    </main>
  );
}
