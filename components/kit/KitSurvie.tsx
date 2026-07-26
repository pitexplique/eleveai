"use client";

// Moteur « Guide de survie » : rendu écran + impression A4 d'un condensé de
// programme (1 notion = 1 page). Piloté par les données (voir types.ts).
// Règle produit : le kit est une PORTE, le coach est la destination — chaque
// page ramène vers /coach-ia. Capture APRÈS la valeur, jamais de mur
// (CaptureApresTelechargement sur `afterprint`, QR en couverture).

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import MarkdownMath from "@/components/MarkdownMath";
import CaptureApresTelechargement from "@/components/cahier/CaptureApresTelechargement";
import type { KitData, KitNotion } from "./types";

const LETTRES = ["A", "B", "C", "D", "E", "F"];

function Etoiles({ n }: { n: number }) {
  return (
    <span className="text-[10px] tracking-tight text-amber-500" aria-label={`difficulté ${n} sur 3`}>
      {"★".repeat(n)}
      <span className="text-slate-300">{"★".repeat(Math.max(0, 3 - n))}</span>
    </span>
  );
}

function PageNotion({
  notion,
  index,
  total,
  coachHref,
}: {
  notion: KitNotion;
  index: number;
  total: number;
  coachHref: string;
}) {
  return (
    <article className="kit-page mx-auto mb-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:mb-0 print:rounded-none print:border-0 print:shadow-none">
      {/* En-tête de page */}
      <header className="mb-3 flex items-center justify-between gap-2 border-b-2 border-red-600 pb-2">
        <p className="text-[11px] font-bold uppercase tracking-widest text-red-600">
          Guide de survie · fiche {index + 1}/{total}
        </p>
        <p className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
          {notion.domaine}
        </p>
      </header>

      <h2 className="mb-2 text-2xl font-black text-slate-900">
        <span aria-hidden="true">{notion.emoji}</span> {notion.titre}
      </h2>

      {/* 1. L'essentiel */}
      <section className="mb-3">
        <h3 className="mb-1 text-sm font-extrabold uppercase tracking-wide text-slate-700">
          🎯 En 30 secondes
        </h3>
        <MarkdownMath className="text-[15px] leading-snug text-slate-800">
          {notion.essentiel}
        </MarkdownMath>
      </section>

      {/* 2. Les formules qui sauvent */}
      <section className="mb-3 rounded-xl border-2 border-red-200 bg-red-50/60 p-3">
        <h3 className="mb-1.5 text-sm font-extrabold uppercase tracking-wide text-red-700">
          🧰 Les formules qui sauvent
        </h3>
        <ul className="formules space-y-1">
          {notion.formules.map((f) => (
            <li key={f.label} className="flex flex-wrap items-baseline gap-x-2 text-[14px]">
              {/* Le libellé peut contenir du LaTeX (« Comparer $A$ et $B$ ») :
                  il passe donc aussi par le rendu maths. */}
              <span className="font-semibold text-slate-600">
                <MarkdownMath inline>{f.label}</MarkdownMath> :
              </span>
              <MarkdownMath inline className="font-medium text-slate-900">
                {f.latex}
              </MarkdownMath>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Réflexes + 4. Pièges */}
      <div className="mb-3 grid gap-3 sm:grid-cols-2 print:grid-cols-2">
        <section className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
          <h3 className="mb-1.5 text-sm font-extrabold uppercase tracking-wide text-emerald-700">
            ⚡ Les réflexes
          </h3>
          <ul className="space-y-1.5">
            {notion.reflexes.map((r) => (
              <li key={r.si} className="text-[13px] leading-snug text-slate-800">
                <MarkdownMath inline className="font-semibold">{r.si}</MarkdownMath>{" "}
                <span aria-hidden="true" className="text-emerald-600">→</span>{" "}
                <MarkdownMath inline>{r.alors}</MarkdownMath>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-amber-200 bg-amber-50/60 p-3">
          <h3 className="mb-1.5 text-sm font-extrabold uppercase tracking-wide text-amber-700">
            ⚠️ Les pièges qui coûtent des points
          </h3>
          <ul className="list-disc space-y-1.5 pl-4">
            {notion.pieges.map((p) => (
              <li key={p} className="text-[13px] leading-snug text-slate-800">
                <MarkdownMath inline>{p}</MarkdownMath>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 5. En vrai */}
      {notion.reel && (
        <p className="reel mb-3 rounded-lg bg-teal-50 px-3 py-1.5 text-[13px] italic text-teal-900">
          {/* La ligne « en vrai » peut contenir du LaTeX ($10^9$, $\sqrt{2}$…) */}
          🌺 <span className="font-semibold not-italic">En vrai :</span>{" "}
          <MarkdownMath inline>{notion.reel}</MarkdownMath>
        </p>
      )}

      {/* 6. Le test de survie */}
      <section className="mb-3">
        <h3 className="mb-1.5 text-sm font-extrabold uppercase tracking-wide text-slate-700">
          ✅ Le test de survie
          <span className="ml-2 hidden font-semibold normal-case tracking-normal text-slate-400 print:inline">
            réponses incluses · le pas-à-pas complet est sur eleveai.fr
          </span>
        </h3>
        <ol className="space-y-2.5">
          {notion.exos.map((exo, i) => (
            <li key={exo.id} className="rounded-lg border border-slate-200 p-2.5">
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Exo {i + 1} · {exo.micro}
                </p>
                <Etoiles n={exo.difficulty} />
              </div>
              <MarkdownMath className="text-[14px] leading-snug text-slate-900">
                {exo.enonce}
              </MarkdownMath>
              {exo.choices && exo.choices.length > 0 && (
                <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
                  {exo.choices.map((c, j) => (
                    <li key={c} className="text-[13px] text-slate-700">
                      <span className="font-bold">{LETTRES[j] ?? j + 1}.</span>{" "}
                      <MarkdownMath inline>{c}</MarkdownMath>
                    </li>
                  ))}
                </ul>
              )}
              <details className="fiche-correction mt-1.5">
                <summary className="cursor-pointer text-[12px] font-semibold text-teal-700">
                  Voir la correction
                </summary>
                <div className="mt-1 rounded-md bg-slate-50 p-2 text-[13px] leading-snug text-slate-800">
                  <p className="mb-1">
                    <span className="font-bold text-emerald-700">Réponse :</span>{" "}
                    <MarkdownMath inline>{exo.reponse}</MarkdownMath>
                  </p>
                  {/* Le pas-à-pas complet ne s'imprime pas (place A4) : il vit
                      à l'écran et sur le coach — le kit est la porte. */}
                  {exo.corrige && (
                    <div className="exo-explication">
                      <MarkdownMath>{exo.corrige}</MarkdownMath>
                    </div>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ol>
      </section>

      {/* 7. Checklist micro-compétences */}
      <section className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <h3 className="mb-1.5 text-sm font-extrabold uppercase tracking-wide text-slate-700">
          ☑️ Je sais…
        </h3>
        <ul className="grid gap-x-4 gap-y-1 sm:grid-cols-2 print:grid-cols-2">
          {notion.micros.map((m) => (
            <li key={m} className="text-[12.5px] leading-snug text-slate-700">
              <span aria-hidden="true" className="mr-1 inline-block">☐</span>
              {m}
            </li>
          ))}
        </ul>
      </section>

      {/* Pied de page : la porte vers le coach */}
      <footer className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-2">
        <p className="text-[11px] text-slate-500">
          <span className="font-bold text-slate-700">eleveai.fr</span> · Bloqué ? Le coach t&apos;explique
          gratuitement, pas à pas.
        </p>
        <Link
          href={coachHref}
          className="screen-only rounded-full bg-teal-600 px-3 py-1 text-[12px] font-bold text-white transition hover:bg-teal-700"
        >
          🧠 M&apos;entraîner sur « {notion.titre} »
        </Link>
        <span className="hidden print:inline text-[11px] font-semibold text-slate-600">
          → eleveai.fr/coach-ia/maths
        </span>
      </footer>
    </article>
  );
}

export default function KitSurvie({ data }: { data: KitData }) {
  const coachHref = `/coach-ia/${data.matiere}?classe=${data.coachClasse}`;
  const signupUrl = "https://eleveai.fr/auth/signin?from=kit";

  return (
    <div className="kit-root bg-slate-100 print:bg-white">
      {/* Barre d'actions (écran seulement) */}
      <div className="screen-only sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-2 px-4 py-2.5">
          <Link href="/guide-de-survie" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
            ← Tous les guides
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-red-700"
            >
              🖨️ Imprimer le kit (gratuit)
            </button>
            <Link
              href={coachHref}
              className="rounded-full border-2 border-teal-600 px-4 py-1.5 text-sm font-bold text-teal-700 transition hover:bg-teal-50"
            >
              🧠 S&apos;entraîner avec le coach
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 print:max-w-none print:p-0">
        {/* ─── Page de garde ─── */}
        <section className="kit-page kit-garde mx-auto mb-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm print:mb-0 print:rounded-none print:border-0 print:shadow-none">
          <p className="mx-auto mb-3 inline-block rounded-full bg-red-600 px-4 py-1 text-xs font-black uppercase tracking-widest text-white">
            🆘 Guide de survie
          </p>
          <h1 className="mb-2 text-4xl font-black leading-tight text-slate-900">{data.titre}</h1>
          <p className="mx-auto mb-4 max-w-xl text-[15px] leading-snug text-slate-600">{data.baseline}</p>

          <div className="mb-5 flex flex-wrap items-center justify-center gap-2 text-[12px] font-semibold text-slate-700">
            <span className="rounded-full bg-emerald-50 px-3 py-1 ring-1 ring-emerald-200">✅ Conforme au programme (BO 2019)</span>
            <span className="rounded-full bg-rose-50 px-3 py-1 ring-1 ring-rose-200">🌺 Conçu à La Réunion par un professeur</span>
            <span className="rounded-full bg-teal-50 px-3 py-1 ring-1 ring-teal-200">🧠 Relié au coach en ligne gratuit</span>
          </div>

          {/* Sommaire-checklist */}
          <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
            <h2 className="mb-2 text-center text-sm font-extrabold uppercase tracking-wide text-slate-700">
              Les {data.notions.length} chapitres — coche ce que tu maîtrises
            </h2>
            <ol className="grid gap-x-6 gap-y-1 sm:grid-cols-2 print:grid-cols-2">
              {data.notions.map((n, i) => (
                <li key={n.id} className="flex items-baseline gap-1.5 text-[13px] text-slate-800">
                  <span className="font-black text-red-600">{i + 1}.</span>
                  <span aria-hidden="true">{n.emoji}</span>
                  <span className="font-semibold">{n.titre}</span>
                  <span aria-hidden="true" className="ml-auto text-slate-400">☐</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Appartenance + QR */}
          <div className="mx-auto flex max-w-md items-center justify-between gap-4 rounded-xl border-2 border-dashed border-slate-300 p-3 text-left">
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-bold uppercase tracking-wide text-slate-500">Ce kit appartient à</p>
              <p className="mt-3 border-b border-slate-400 pb-0.5 text-sm text-slate-400">…</p>
              <p className="mt-2 text-[11px] leading-snug text-slate-500">
                Scanne pour continuer <span className="font-bold">gratuitement</span> en ligne — exercices
                corrigés, coach, suivi.
              </p>
            </div>
            <div className="shrink-0 rounded-lg bg-white p-1.5 ring-1 ring-slate-200">
              <QRCodeSVG value={signupUrl} size={64} aria-label="QR code vers eleveai.fr" />
            </div>
          </div>

          <p className="mt-4 text-[12px] text-slate-500">
            <span className="font-bold text-slate-700">eleveai.fr/guide-de-survie</span> · gratuit, sans
            publicité · « Nou la fé ! » 🌺
          </p>
        </section>

        {/* ─── Les fiches ─── */}
        {data.notions.map((n, i) => (
          <PageNotion key={n.id} notion={n} index={i} total={data.notions.length} coachHref={coachHref} />
        ))}

        {/* Pied de parcours (écran) */}
        <div className="screen-only mx-auto max-w-3xl rounded-2xl border-2 border-teal-200 bg-teal-50 p-6 text-center">
          <p className="mb-2 text-lg font-black text-slate-900">Le kit t&apos;a sauvé ? Le coach t&apos;entraîne.</p>
          <p className="mb-4 text-sm text-slate-600">
            Des centaines d&apos;exercices corrigés pas à pas, chapitre par chapitre — gratuit.
          </p>
          <Link
            href={coachHref}
            className="inline-block rounded-full bg-teal-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700"
          >
            🧠 S&apos;entraîner en {data.classeLabel}
          </Link>
        </div>
      </div>

      {/* Capture APRÈS la valeur (modale sur afterprint, aucun mur) */}
      <CaptureApresTelechargement coachHref={coachHref} signupFrom="kit" produitDe="du guide" />

      {/* ─── Impression ─── */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            /* haut · droite · bas · gauche — marge gauche élargie pour la
               reliure (perforation / agrafage) sans rogner le contenu. */
            margin: 6mm 6mm 6mm 16mm;
          }

          body {
            background: white !important;
          }

          .screen-only {
            display: none !important;
          }

          /* 1 fiche = 1 page A4. */
          .kit-page {
            break-after: page;
            page-break-after: always;
            max-width: none !important;
            padding: 0 !important;
            font-size: 11px;
            line-height: 1.3;
          }
          .kit-page:last-of-type {
            break-after: auto;
            page-break-after: auto;
          }

          /* Compression verticale pour tenir sur 1 page. */
          .kit-page h2 {
            font-size: 17px !important;
            margin-bottom: 3px !important;
          }
          .kit-page h3 {
            font-size: 10.5px !important;
            margin-bottom: 2px !important;
          }
          .kit-page header {
            margin-bottom: 4px !important;
            padding-bottom: 3px !important;
          }
          .kit-page section,
          .kit-page .grid {
            margin-bottom: 4px !important;
          }
          .kit-page .rounded-xl,
          .kit-page .rounded-lg {
            padding: 4px 6px !important;
          }
          .kit-page li,
          .kit-page p {
            font-size: 10px !important;
            line-height: 1.25 !important;
          }
          .kit-page .formules li {
            font-size: 10.5px !important;
          }
          .kit-page ul,
          .kit-page ol {
            gap: 2px !important;
          }
          .kit-page ol > li {
            margin-top: 3px !important;
          }
          .kit-page .space-y-1\\.5 > li + li,
          .kit-page .space-y-1 > li + li {
            margin-top: 2px !important;
          }
          .kit-garde h1 {
            font-size: 30px !important;
          }

          /* Corrections : ouvertes à l'impression (PrintCorrections force
             l'ouverture des <details class="fiche-correction">). On imprime la
             RÉPONSE, pas le pas-à-pas (il vit à l'écran et sur le coach). */
          .fiche-correction summary {
            display: none;
          }
          .exo-explication {
            display: none !important;
          }

          /* KaTeX un cran plus petit à l'impression. */
          .kit-page .katex {
            font-size: 0.95em !important;
          }
        }
      `}</style>
    </div>
  );
}
