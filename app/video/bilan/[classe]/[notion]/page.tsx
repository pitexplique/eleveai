// ─── La feuille BILAN d'une NOTION : toutes ses micros, A4 recto verso ───────
// ⭐ 27/10/2026 — Frédéric : « on va essayer une feuille A4 pour les micros d'une
// notion, elle peut être recto verso ». Recto : une ligne par micro (sa vidéo) à
// cocher compris / pas tout à fait / pas compris, puis ce que j'ai retenu.
// Verso : une question de chaque vidéo, ma question pour le prof, le corrigé à
// l'envers. Données : lib/videos/bilans-notions.json (generer-bilans-videos.mjs).
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NOTIONS from "@/lib/videos/bilans-notions.json";
import BoutonImprimer from "../../../[id]/bilan/BoutonImprimer";

type Props = { params: Promise<{ classe: string; notion: string }> };
type Notion = {
  classe: string;
  notion: string;
  videos: { id: string; micro: string; question: { question: string; choix: string[]; reponse: number } | null }[];
};

const LETTRES = ["A", "B", "C", "D", "E"];
const NOM_CLASSE: Record<string, string> = { premiere: "1re", seconde: "2de", terminale: "Tle" };

async function lire(params: Props["params"]) {
  const { classe, notion } = await params;
  return (NOTIONS as Record<string, Notion>)[`${decodeURIComponent(classe)}/${decodeURIComponent(notion)}`] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = await lire(params);
  return { title: n ? `Bilan — ${n.notion}` : "Bilan", robots: { index: false, follow: false } };
}

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

export default async function PageBilanNotion({ params }: Props) {
  const n = await lire(params);
  if (!n) notFound();
  const questions = n.videos.filter((v) => v.question);
  const classe = NOM_CLASSE[n.classe] ?? n.classe.toUpperCase().replace(/^(\d)E/, "$1e");

  return (
    <main data-bilan className="mx-auto max-w-3xl bg-white px-4 py-6 text-slate-900 print:max-w-none print:px-0 print:py-0">
      {/* À l'impression : seulement la feuille (ni l'en-tête ni le pied du site). */}
      <style>{`@media print { @page { size: A4; margin: 12mm; } body:has([data-bilan]) header.sticky, body:has([data-bilan]) > footer, body:has([data-bilan]) > * > footer { display: none !important; } }`}</style>
      <div className="mb-4 flex items-center justify-between gap-3 print:hidden">
        <Link href="/video" className="text-sm font-bold text-teal-700 hover:underline">
          ← Les vidéos
        </Link>
        <BoutonImprimer />
      </div>

      <header className="border-b-2 border-slate-900 pb-3">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">EleveAI · Ma feuille bilan · Maths {classe}</p>
        <h1 className="mt-1 text-xl font-black leading-tight">{n.notion} : ce que j&apos;ai compris</h1>
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
          <p>Nom : <span className="inline-block w-32 border-b border-slate-400" /></p>
          <p>Classe : <span className="inline-block w-16 border-b border-slate-400" /></p>
          <p>Date : <span className="inline-block w-20 border-b border-slate-400" /></p>
        </div>
      </header>

      <section className="mt-5">
        <h2 className="text-base font-black">1. Les vidéos que j&apos;ai vues</h2>
        <p className="text-sm text-slate-600">Pour chaque vidéo, coche une case.</p>
        <ol className="mt-2 divide-y divide-slate-200 rounded-xl border border-slate-300">
          {n.videos.map((v, i) => (
            <li key={v.id} className="break-inside-avoid px-3 py-2">
              <p className="font-semibold">{i + 1}. {v.micro}</p>
              <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <Case texte="J'ai compris" />
                <Case texte="Pas tout à fait" />
                <Case texte="Pas compris" />
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-5 break-inside-avoid">
        <h2 className="text-base font-black">2. Ce que j&apos;ai retenu</h2>
        <Lignes n={3} />
      </section>

      {questions.length > 0 && (
        <section className="mt-5 print:break-before-page">
          <h2 className="text-base font-black">3. Je refais une question de chaque vidéo</h2>
          <ol className="mt-2 space-y-3">
            {questions.map((v, i) => (
              <li key={v.id} className="break-inside-avoid rounded-xl border border-slate-300 px-3 py-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{v.micro}</p>
                <p className="font-semibold">Question {i + 1} : {v.question!.question}</p>
                <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                  {v.question!.choix.map((c, j) => (
                    <Case key={j} texte={`${LETTRES[j]}. ${c}`} />
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-5 break-inside-avoid">
        <h2 className="text-base font-black">{questions.length > 0 ? "4" : "3"}. Ma question pour le prof</h2>
        <Lignes n={2} />
      </section>

      {questions.length > 0 && (
        <p className="mt-8 rotate-180 text-right text-xs text-slate-500">
          Corrigé : {questions.map((v, i) => `${i + 1} → ${LETTRES[v.question!.reponse]}`).join(" · ")}
        </p>
      )}
    </main>
  );
}
