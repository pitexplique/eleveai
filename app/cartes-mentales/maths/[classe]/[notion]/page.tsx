// ─── La CARTE MENTALE d'une notion, A4 recto verso ──────────────────────────────
// /cartes-mentales/maths/<classe>/<notion> (27/10 ; avant : /video/bilan/…, redirigé).
// ⭐ 27/10/2026 — Frédéric : « une feuille A4 pour les micros d'une notion, elle
// peut être recto verso », puis « on n'est pas sur une feuille d'exercices, on
// est sur une feuille de ce qu'ont retenu les élèves en regardant toutes les
// vidéos de toutes les micros », « pas de question, ils ont les feuilles
// d'exercices pour cela », « cette feuille doit être un brainstorming, carte
// mentale » (« j'adore la carte mentale »).
// Les micros viennent du COACH, qu'il y ait des vidéos ou non (« tu fais comme si
// les vidéos existaient ») : lib/videos/bilans-notions.json, par
// scripts/generer-bilans-videos.mjs.
// Disposition, la sienne : « en haut 1 2 3, au milieu 4 5, puis 6 7 8 », la
// notion au centre ; « au-delà de 6 ou 7, tu partages en deux » (deux faces).
// ⭐ 27/10, suite : « le verso doit prendre toute la page, l'encadré est trop
// petit » → chaque face est une page A4 entière, l'encadré s'étire jusqu'en
// bas ; « il faut plusieurs formats : on écrit plus en Terminale, 1re, 2de
// qu'en 3e et 4e, et peu en 5e, 6e » → l'écart des lignes dépend de la classe.
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import NOTIONS from "@/lib/videos/bilans-notions.json";
import BoutonImprimer from "@/components/BoutonImprimer";
import ModeTableau from "@/components/cartes/ModeTableau";

type Props = { params: Promise<{ classe: string; notion: string }> };
type Notion = { classe: string; notion: string; micros: string[] };

const NOM_CLASSE: Record<string, string> = {
  seconde: "2de",
  premiere: "1re",
  "premiere-spe": "1re spé",
  "terminale-spe": "Tle spé",
  stmg: "STMG",
  adulte: "adultes",
};

// L'écart entre deux lignes d'écriture : grand pour les petits (écriture large,
// peu de texte), serré au lycée (on écrit davantage).
const LYCEE = new Set(["seconde", "premiere", "premiere-spe", "terminale-spe", "stmg", "adulte"]);
const ECART_LIGNE = (classe: string) => (LYCEE.has(classe) ? "6.5mm" : classe === "4e" || classe === "3e" ? "8mm" : "10mm");

async function lire(params: Props["params"]) {
  const { classe, notion } = await params;
  return (NOTIONS as Record<string, Notion>)[`${decodeURIComponent(classe)}/${decodeURIComponent(notion)}`] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = await lire(params);
  if (!n) return { title: "Carte mentale" };
  const classe = NOM_CLASSE[n.classe] ?? n.classe;
  // Indexée (au sitemap, 27/10) : la requête est « carte mentale <notion> <classe> ».
  return {
    title: `Carte mentale : ${n.notion} (maths ${classe}) à imprimer`,
    description: `La carte mentale de ${n.notion} en maths ${classe} : les ${n.micros.length} compétences autour de la notion, à cocher (compris, pas tout à fait, pas compris) et à compléter avec ce que l'élève a retenu. A4 recto verso, gratuite.`,
    alternates: { canonical: `/cartes-mentales/maths/${(await params).classe}/${(await params).notion}` },
  };
}

// Des lignes d'écriture qui REMPLISSENT leur boîte, quelle que soit sa hauteur
// (un fond rayé, imprimé grâce à print-color-adjust).
function ZoneEcriture({ ecart, className = "" }: { ecart: string; className?: string }) {
  const style: CSSProperties = {
    backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent calc(${ecart} - 1px), #cbd5e1 calc(${ecart} - 1px), #cbd5e1 ${ecart})`,
    backgroundPosition: `0 calc(${ecart} * 0.6)`,
    printColorAdjust: "exact",
    WebkitPrintColorAdjust: "exact",
  };
  return <div className={`min-h-0 flex-1 ${className}`} style={style} />;
}

function PetiteCase({ texte }: { texte: string }) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap">
      <span className="inline-block h-2.5 w-2.5 rounded-sm border-[1.5px] border-slate-500" />
      {texte}
    </span>
  );
}

// Les 8 places autour du centre, dans son ordre : 1 2 3 / 4 · 5 / 6 7 8
// (ligne, colonne) d'une grille 3 × 3 dont la case du milieu est la notion.
const PLACES: [number, number][] = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]];
// Une face qui n'est pas pleine se répartit autour du centre (toujours dans
// l'ordre de lecture) : 4 bulles aux coins, 6 en haut et en bas…
const REPARTITION: Record<number, number[]> = {
  1: [1],
  2: [3, 4],
  3: [0, 2, 6],
  4: [0, 2, 5, 7],
  5: [0, 1, 2, 3, 4],
  6: [0, 1, 2, 5, 6, 7],
  7: [0, 1, 2, 3, 4, 5, 7],
  8: [0, 1, 2, 3, 4, 5, 6, 7],
};
const placeDe = (i: number, n: number) => PLACES[(REPARTITION[n] ?? REPARTITION[8])[i]];

// « Au-delà de 6 ou 7, tu partages en deux » : 7 au plus sur une face, sinon des
// faces égales (8 places au plus chacune). Au lycée, « la CM peut prendre 2
// pages, même en seconde, à décider en fonction du nombre de micros » : on y
// écrit plus, on partage dès 5 micros.
function faces(micros: string[], lycee: boolean) {
  if (micros.length <= (lycee ? 4 : 7)) return [micros];
  const k = Math.max(2, Math.ceil(micros.length / 8));
  const taille = Math.ceil(micros.length / k);
  return Array.from({ length: k }, (_, i) => micros.slice(i * taille, (i + 1) * taille));
}

function CarteMentale({ centre, micros, debut, ecart, className }: { centre: string; micros: string[]; debut: number; ecart: string; className: string }) {
  return (
    <div className={`relative w-full ${className}`}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {micros.map((_, i) => {
          const [l, c] = placeDe(i, micros.length);
          return <line key={i} x1={50} y1={50} x2={16.7 + c * 33.3} y2={16.7 + l * 33.3} stroke="#94a3b8" strokeWidth={1} vectorEffect="non-scaling-stroke" />;
        })}
      </svg>
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3">
        <div
          className="flex items-center justify-center self-center rounded-[50%] border-[3px] border-teal-600 bg-teal-50 px-3 py-6 text-center text-lg font-black leading-tight text-teal-900"
          style={{ gridRow: 2, gridColumn: 2 }}
        >
          {centre}
        </div>
        {micros.map((m, i) => {
          const [l, c] = placeDe(i, micros.length);
          return (
            <div
              key={i}
              className="relative flex min-h-0 flex-col overflow-hidden rounded-2xl border-2 border-slate-500 bg-white px-2 py-1.5"
              style={{ gridRow: l + 1, gridColumn: c + 1 }}
            >
              <p className="text-[12px] font-black leading-tight">
                {debut + i + 1}. {m}
              </p>
              <p className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] leading-none text-slate-700">
                <PetiteCase texte="compris" />
                <PetiteCase texte="pas tout à fait" />
                <PetiteCase texte="pas compris" />
              </p>
              <p className="mt-1.5 text-[9px] font-bold uppercase tracking-wide text-slate-400">Ce que j&apos;ai retenu</p>
              <ZoneEcriture ecart={ecart} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Une face = une page A4 utile (190 × 277 mm, marges de 10 mm), à l'écran comme
// sur papier ; la dernière s'imprime sans saut de page derrière elle.
const PAGE = "flex flex-col aspect-[190/277] print:aspect-auto print:h-[277mm] break-inside-avoid";

function Encadre({ titre, ecart, className }: { titre: string; ecart: string; className: string }) {
  return (
    <section className={`flex min-h-0 flex-col ${className}`}>
      <h2 className="text-base font-black">{titre}</h2>
      <div className="mt-1.5 flex min-h-0 flex-1 flex-col rounded-xl border-2 border-slate-400 px-3 pb-2 pt-1">
        <ZoneEcriture ecart={ecart} />
      </div>
    </section>
  );
}

export default async function PageCarteMentale({ params }: Props) {
  const n = await lire(params);
  if (!n) notFound();
  const classe = NOM_CLASSE[n.classe] ?? n.classe.toUpperCase().replace(/^(\d)E$/, "$1e");
  const ecart = ECART_LIGNE(n.classe);
  const pages = faces(n.micros, LYCEE.has(n.classe));
  const deux = pages.length > 1;
  const debutDe = (p: number) => pages.slice(0, p).reduce((s, x) => s + x.length, 0);

  return (
    <main data-bilan className="mx-auto max-w-3xl bg-white px-4 py-6 text-slate-900 print:max-w-none print:px-0 print:py-0">
      {/* À l'impression : seulement la feuille (ni l'en-tête ni le pied du site). */}
      <style>{`@media print { @page { size: A4; margin: 10mm; } body:has([data-bilan]) header.sticky, body:has([data-bilan]) > footer, body:has([data-bilan]) > * > footer { display: none !important; } }`}</style>
      <div className="mb-4 flex items-center justify-between gap-3 print:hidden">
        <Link href="/cartes-mentales" className="text-sm font-bold text-teal-700 hover:underline">
          ← Toutes les cartes mentales
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <ModeTableau notion={n.notion} classe={classe} micros={n.micros} />
          <BoutonImprimer />
        </div>
      </div>

      {pages.map((micros, p) => {
        const derniere = p === pages.length - 1;
        return (
          <section key={p} className={`${PAGE} ${p > 0 ? "mt-8 print:mt-0" : ""} print:break-after-page`}>
            {p === 0 ? (
              <header className="mb-3 border-b-2 border-slate-900 pb-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">EleveAI · Ma carte mentale · Maths {classe}</p>
                <h1 className="mt-0.5 text-xl font-black leading-tight">{n.notion}</h1>
                <div className="mt-2 grid grid-cols-3 gap-x-6 text-sm">
                  <p>Nom : <span className="inline-block w-28 border-b border-slate-400" /></p>
                  <p>Classe : <span className="inline-block w-14 border-b border-slate-400" /></p>
                  <p>Date : <span className="inline-block w-20 border-b border-slate-400" /></p>
                </div>
                <p className="mt-1 text-xs text-slate-600">Pour chaque vidéo : je coche, puis j&apos;écris ce que j&apos;ai retenu.</p>
              </header>
            ) : (
              <p className="mb-2 text-sm font-black text-slate-600">{n.notion} (suite)</p>
            )}
            {/* La dernière face d'une carte partagée garde le bas de la page pour
                « ce que je retiens » ; sinon la carte prend toute la face. */}
            <CarteMentale
              centre={n.notion}
              micros={micros}
              debut={debutDe(p)}
              ecart={ecart}
              className={deux && derniere ? "basis-[52%] shrink-0" : "min-h-0 flex-1"}
            />
            {deux && derniere ? (
              <>
                <Encadre titre="Ce que je retiens de toute la notion" ecart={ecart} className="mt-4 flex-[3]" />
                <Encadre titre="Ma question pour le prof" ecart={ecart} className="mt-3 flex-1" />
              </>
            ) : null}
          </section>
        );
      })}

      {/* Une seule face de carte : tout le verso pour ce que je retiens. */}
      {!deux ? (
        <section className={`${PAGE} mt-8 print:mt-0`}>
          <Encadre titre={`Ce que je retiens de toute la notion « ${n.notion} »`} ecart={ecart} className="flex-[4]" />
          <Encadre titre="Ma question pour le prof" ecart={ecart} className="mt-4 flex-1" />
        </section>
      ) : null}
    </main>
  );
}
