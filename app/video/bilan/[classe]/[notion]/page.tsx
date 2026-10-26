// ─── La feuille BILAN d'une NOTION : toutes ses micros, A4 recto verso ───────
// ⭐ 27/10/2026 — Frédéric : « on va essayer une feuille A4 pour les micros d'une
// notion, elle peut être recto verso ». Recto : une ligne par micro (sa vidéo) à
// cocher compris / pas tout à fait / pas compris, puis ce que j'ai retenu.
// (27/10, suite : pas de QCM, une CARTE MENTALE de ce qu'on a retenu.) Données : lib/videos/bilans-notions.json (generer-bilans-videos.mjs).
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

const NOM_CLASSE: Record<string, string> = { premiere: "1re", seconde: "2de", terminale: "Tle" };

async function lire(params: Props["params"]) {
  const { classe, notion } = await params;
  return (NOTIONS as Record<string, Notion>)[`${decodeURIComponent(classe)}/${decodeURIComponent(notion)}`] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = await lire(params);
  return { title: n ? `Bilan — ${n.notion}` : "Bilan", robots: { index: false, follow: false } };
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

// La carte mentale : les micros autour de la notion, dans le sens des aiguilles
// d'une montre à partir du haut. Deux colonnes de bulles (gauche, droite), et une
// bulle en haut (et en bas) au milieu quand il en reste. Positions en % d'un
// cadre au format de la page A4 utile (186 × 255 mm).
function placer(n: number) {
  const milieu = n <= 6 ? n % 2 : n % 2 === 1 ? 1 : 2;
  const cote = (n - milieu) / 2;
  const haut = 2, bas = 98;
  const h = Math.min(24, (bas - haut) / Math.max(cote, 1) - 2);
  const ys = Array.from({ length: cote }, (_, i) => haut + ((bas - haut) * (i + 0.5)) / cote);
  const pos: { x: number; y: number }[] = [];
  if (milieu >= 1) pos.push({ x: 50, y: 13 });
  ys.forEach((y) => pos.push({ x: 83, y }));
  if (milieu === 2) pos.push({ x: 50, y: 87 });
  [...ys].reverse().forEach((y) => pos.push({ x: 17, y }));
  return { pos, h };
}

// Le nom court d'une micro dans sa bulle : avant « : » (« L'hypoténuse : le plus
// long côté… » → « L'hypoténuse ») ; après « ? » pour un titre-question.
const court = (m: string) => (m.includes("? ") ? m.split("? ").slice(1).join("? ") : m).split(" : ")[0].replace(/, corrigé$/, "");

function CarteMentale({ centre, micros }: { centre: string; micros: string[] }) {
  const { pos, h } = placer(micros.length);
  return (
    <section className="mt-5 break-inside-avoid">
      <p className="mb-2 text-sm text-slate-600 print:hidden">
        Ma carte mentale : pour chaque vidéo, je coche, puis j&apos;écris ce que j&apos;ai retenu.
      </p>
      <div className="relative w-full" style={{ aspectRatio: "186 / 255" }}>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {pos.map((p, i) => (
            <line key={i} x1={50} y1={50} x2={p.x} y2={p.y} stroke="#94a3b8" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[50%] border-[3px] border-teal-600 bg-teal-50 px-3 text-center text-lg font-black leading-tight text-teal-900"
          style={{ left: "50%", top: "50%", width: "30%", height: "14%" }}
        >
          {centre}
        </div>
        {micros.map((m, i) => (
          <div
            key={i}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border-2 border-slate-500 bg-white px-2 py-1.5"
            style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%`, width: "32%", height: `${h}%` }}
          >
            <p className="text-[13px] font-black leading-tight">{i + 1}. {court(m)}</p>
            <p className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] leading-none text-slate-700">
              <PetiteCase texte="compris" />
              <PetiteCase texte="pas tout à fait" />
              <PetiteCase texte="pas compris" />
            </p>
            <div className="mt-1 flex flex-1 flex-col justify-evenly">
              {[0, 1, 2].map((l) => (
                <div key={l} className="border-b border-dotted border-slate-400" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PetiteCase({ texte }: { texte: string }) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap">
      <span className="inline-block h-2.5 w-2.5 rounded-sm border-[1.5px] border-slate-500" />
      {texte}
    </span>
  );
}

export default async function PageBilanNotion({ params }: Props) {
  const n = await lire(params);
  if (!n) notFound();
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
        <h1 className="mt-1 text-xl font-black leading-tight">{n.notion} : ma carte mentale</h1>
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
          <p>Nom : <span className="inline-block w-32 border-b border-slate-400" /></p>
          <p>Classe : <span className="inline-block w-16 border-b border-slate-400" /></p>
          <p>Date : <span className="inline-block w-20 border-b border-slate-400" /></p>
        </div>
      </header>

      {/* ⛔ 27/10/2026 — Frédéric : « on n'est pas sur une feuille d'exercices, on
          est sur une feuille de ce qu'ont retenu les élèves en regardant toutes
          les vidéos de toutes les micros », « pas de question, ils ont les
          feuilles d'exercices pour cela », « cette feuille doit être un
          brainstorming, carte mentale ». Recto : la notion au centre, une bulle
          par micro (compris ou pas, ce que j'en ai retenu). Verso : toute la
          notion, et ma question pour le prof. */}
      <CarteMentale centre={n.notion} micros={n.videos.map((v) => v.micro)} />

      <section className="mt-6 break-inside-avoid print:break-before-page print:mt-0">
        <h2 className="text-base font-black">Ce que je retiens de toute la notion « {n.notion} »</h2>
        <div className="mt-2 rounded-xl border-2 border-slate-400 px-3 pb-3 pt-1">
          <Lignes n={8} />
        </div>
      </section>

      <section className="mt-6 break-inside-avoid">
        <h2 className="text-base font-black">Ma question pour le prof</h2>
        <div className="mt-2 rounded-xl border-2 border-slate-400 px-3 pb-3 pt-1">
          <Lignes n={3} />
        </div>
      </section>
    </main>
  );
}
