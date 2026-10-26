// ─── La feuille BILAN d'une vidéo, à imprimer (A4, une page) ─────────────────
// ⭐ 27/10/2026 — Frédéric : « les élèves ont adoré les vidéos ; en tant que prof
// je vais devoir imprimer une feuille sur ce qu'ils ont retenu, compris ou pas
// compris ». Tirée du manifeste (scripts/generer-bilans-videos.mjs) : les
// chapitres à cocher, les questions-pauses à refaire, le corrigé à l'envers.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { trouverVideo } from "@/lib/videos/r2";
import BILANS from "@/lib/videos/bilans-videos.json";
import BoutonImprimer from "./BoutonImprimer";

type Props = { params: Promise<{ id: string }> };
type Bilan = { vus: string[]; questions: { question: string; choix: string[]; reponse: number }[] };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const v = trouverVideo(id);
  return { title: v ? `Bilan — ${v.titre}` : "Bilan", robots: { index: false, follow: false } };
}

const LETTRES = ["A", "B", "C", "D", "E"];

function Case({ texte }: { texte: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span className="inline-block h-4 w-4 rounded border-2 border-slate-500" />
      {texte}
    </span>
  );
}

function Lignes({ n }: { n: number }) {
  return (
    <div className="mt-2 space-y-6">
      {Array.from({ length: n }, (_, i) => (
        <div key={i} className="border-b border-dotted border-slate-400" />
      ))}
    </div>
  );
}

export default async function PageBilan({ params }: Props) {
  const { id } = await params;
  const v = trouverVideo(id);
  if (!v) notFound();
  const b = (BILANS as Record<string, Bilan>)[v.id] ?? { vus: [], questions: [] };
  // Le titre court : avant le premier « — » (le reste dit la classe et l'épisode).
  const [titre, ...suite] = v.titre.split(" — ");

  return (
    <main data-bilan className="mx-auto max-w-3xl bg-white px-4 py-6 text-slate-900 print:max-w-none print:px-0 print:py-0">
      {/* À l'impression : seulement la feuille (ni l'en-tête ni le pied du site). */}
      <style>{`@media print { @page { size: A4; margin: 12mm; } body:has([data-bilan]) header.sticky, body:has([data-bilan]) > footer, body:has([data-bilan]) > * > footer { display: none !important; } }`}</style>
      <div className="mb-4 flex items-center justify-between gap-3 print:hidden">
        <Link href={`/video/${v.id}`} className="text-sm font-bold text-teal-700 hover:underline">
          ← Revenir à la vidéo
        </Link>
        <BoutonImprimer />
      </div>

      <header className="border-b-2 border-slate-900 pb-3">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">EleveAI · Ma feuille bilan</p>
        <h1 className="mt-1 text-xl font-black leading-tight">{titre}</h1>
        {suite.length > 0 && <p className="text-sm text-slate-600">{suite.join(" — ").replace(/ — EleveAI$/, "")}</p>}
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
          <p>Nom : <span className="inline-block w-32 border-b border-slate-400" /></p>
          <p>Classe : <span className="inline-block w-16 border-b border-slate-400" /></p>
          <p>Date : <span className="inline-block w-20 border-b border-slate-400" /></p>
        </div>
      </header>

      {b.vus.length > 0 && (
        <section className="mt-5 break-inside-avoid">
          <h2 className="text-base font-black">1. Ce que j&apos;ai vu dans la vidéo</h2>
          <p className="text-sm text-slate-600">Pour chaque partie, coche une case.</p>
          <ul className="mt-2 divide-y divide-slate-200 rounded-xl border border-slate-300">
            {b.vus.map((t) => (
              <li key={t} className="px-3 py-2">
                <p className="font-semibold">{t}</p>
                <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  <Case texte="J'ai compris" />
                  <Case texte="Pas tout à fait" />
                  <Case texte="Pas compris" />
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {b.questions.length > 0 && (
        <section className="mt-5 break-inside-avoid">
          <h2 className="text-base font-black">{b.vus.length > 0 ? "2" : "1"}. Je refais les questions de la vidéo</h2>
          <ol className="mt-2 space-y-3">
            {b.questions.map((q, i) => (
              <li key={i} className="rounded-xl border border-slate-300 px-3 py-2">
                <p className="font-semibold">Question {i + 1} : {q.question}</p>
                <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                  {q.choix.map((c, j) => (
                    <Case key={j} texte={`${LETTRES[j]}. ${c}`} />
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-5 break-inside-avoid">
        <h2 className="text-base font-black">Ce que j&apos;ai retenu</h2>
        {/* ⭐ 27/10/2026 — Frédéric : « pas 3 mais 5 lignes, ou un encadré ! » */}
        <div className="mt-2 rounded-xl border-2 border-slate-400 px-3 pb-3 pt-1">
          <Lignes n={5} />
        </div>
      </section>
      <section className="mt-5 break-inside-avoid">
        <h2 className="text-base font-black">Ma question pour le prof</h2>
        <Lignes n={1} />
      </section>

      {b.questions.length > 0 && (
        <p className="mt-8 rotate-180 text-right text-xs text-slate-500">
          Corrigé : {b.questions.map((q, i) => `${i + 1} → ${LETTRES[q.reponse]}`).join(" · ")}
        </p>
      )}
    </main>
  );
}
