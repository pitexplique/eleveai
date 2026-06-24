"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Download, Printer } from "lucide-react";
import { PIX_DOMAINES } from "@/lib/pix-ia/referentiel";
import type { FicheIaData } from "./FicheCoursIa";

export type ChapitreLivre = { competence: string; data: FicheIaData };

export default function LivreIa({ chapitres }: { chapitres: ChapitreLivre[] }) {
  const numbered = chapitres.map((c, i) => ({ ...c, n: i + 1 }));
  const parties = PIX_DOMAINES.map((d, idx) => ({
    d,
    numero: idx + 1,
    items: numbered.filter((c) => c.data.domaineId === d.id),
  }));

  return (
    <main className="min-h-screen bg-[#eef1fb] text-slate-800">
      {/* Haut et pied de page (uniquement à l'impression, répétés sur chaque page) */}
      <div className="print-running print-running-header">
        <span>Comprendre l&apos;intelligence artificielle</span>
        <span>EleveAI</span>
      </div>
      <div className="print-running print-running-footer">
        <span>Référentiel Pix · Compétences numériques en IA</span>
        <span>eleveai.fr</span>
      </div>

      {/* Barre d'actions (écran) */}
      <div className="screen-only sticky top-0 z-10 border-b border-slate-200 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <Link
            href="/fiches-cours/ia"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Fiches IA
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/livre/comprendre-l-ia.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500"
            >
              <Download className="h-4 w-4" />
              PDF
            </a>
            <a
              href="/livre/comprendre-l-ia.epub"
              download
              className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-5 py-2.5 text-sm font-black text-indigo-700 shadow-sm transition hover:bg-indigo-50"
            >
              <BookOpen className="h-4 w-4" />
              EPUB
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-300/40 print:rounded-none print:shadow-none">
          {/* ── Page de garde ── */}
          <section className="book-cover relative flex min-h-[78vh] flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 p-10 text-white sm:p-16 print:min-h-screen">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
            />
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white/70">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/15 text-base">📕</span>
              eleveai.fr · Fiches de cours
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-white/80">Le livre</p>
              <h1 className="mt-4 text-4xl font-black leading-[1.05] sm:text-6xl">
                Comprendre
                <br />
                l&apos;intelligence artificielle
              </h1>
              <div className="mt-6 h-1 w-24 rounded-full bg-white/40" />
              <p className="mt-6 max-w-xl text-lg font-medium leading-7 text-white/85">
                16 fiches pour s&apos;y retrouver, du fonctionnement de l&apos;IA à ses usages et
                ses enjeux. Aligné sur le référentiel Pix « Compétences numériques en intelligence
                artificielle ».
              </p>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-3 text-sm font-bold text-white/75">
              <span>3 parties · 16 chapitres · de la 6e au lycée</span>
              <span className="text-white/60">EleveAI · 2026</span>
            </div>
          </section>

          {/* ── Avant-propos ── */}
          <section className="book-page px-8 py-10 sm:px-14">
            <p className="text-xs font-black uppercase tracking-widest text-indigo-500">Avant-propos</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">À qui sert ce livre ?</h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-slate-600">
              <p>
                L&apos;intelligence artificielle est partout : dans nos téléphones, nos réseaux, nos
                recherches. Ce livre rassemble <strong>16 fiches courtes</strong> pour comprendre ce
                qu&apos;est l&apos;IA, comment elle fonctionne, comment bien l&apos;utiliser, et quels
                sont ses enjeux pour la société.
              </p>
              <p>
                Il s&apos;adresse aux <strong>élèves du collège et du lycée</strong> (et à toute
                personne curieuse). Chaque chapitre correspond à une compétence du référentiel{" "}
                <strong>Pix « Compétences numériques en IA »</strong>, organisé en trois parties :
                les <strong>fondements</strong>, les <strong>usages</strong> et les{" "}
                <strong>enjeux</strong>.
              </p>
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
                <p className="text-sm font-black uppercase tracking-wide text-indigo-700">
                  Comment l&apos;utiliser
                </p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6 text-slate-700">
                  <li>Lis la fiche du chapitre (à quoi ça sert, notions clés, l&apos;essentiel).</li>
                  <li>Fais les exercices : la correction est juste en dessous.</li>
                  <li>Entraîne-toi avec le Coach IA, puis teste-toi avec l&apos;éval blanche Pix IA.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* ── Sommaire ── */}
          <section className="book-page px-8 py-10 sm:px-14">
            <h2 className="text-3xl font-black text-slate-900">Sommaire</h2>
            <div className="mt-6 space-y-6">
              {parties.map((p) => (
                <div key={p.d.id}>
                  <p className="text-xs font-black uppercase tracking-widest text-indigo-500">
                    Partie {p.numero}
                  </p>
                  <p className="text-lg font-black text-slate-900">{p.d.short}</p>
                  <ul className="mt-2 divide-y divide-slate-100">
                    {p.items.map((c) => (
                      <li key={c.competence} className="flex items-baseline justify-between gap-4 py-1.5">
                        <span className="text-sm text-slate-700">
                          <span className="font-black text-slate-400">{c.n}.</span> {c.data.titre}
                        </span>
                        <span className="text-xs font-bold text-slate-400">{c.competence}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── Chapitres ── */}
          {numbered.map((c) => (
            <article key={c.competence} className="book-page border-t border-slate-200 px-8 py-10 sm:px-14">
              <p className="text-xs font-black uppercase tracking-widest text-indigo-500">
                Partie {c.data.domaineId} · {c.data.domaineLabel} · Compétence {c.competence}
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">
                {c.n}. {c.data.titre}
              </h2>
              <p className="mt-3 text-base italic leading-7 text-slate-600">{c.data.intro}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
                  <h3 className="text-sm font-black uppercase tracking-wide text-indigo-700">
                    À quoi ça sert ?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{c.data.aQuoiCaSert}</p>
                </div>
                <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
                  <h3 className="text-sm font-black uppercase tracking-wide text-amber-700">
                    Le savais-tu ?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{c.data.leSavaisTu}</p>
                </div>
              </div>

              <h3 className="mt-6 text-lg font-black text-slate-900">Notions clés</h3>
              <ul className="mt-2 space-y-1.5 text-sm leading-6 text-slate-700">
                {c.data.notions.map((n) => (
                  <li key={n.titre}>
                    <span className="font-black text-slate-900">{n.titre} — </span>
                    {n.texte}
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 text-lg font-black text-slate-900">{c.data.pointsCles.titre}</h3>
              <div className="mt-2 overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full border-collapse text-left text-sm">
                  <tbody className="divide-y divide-slate-200">
                    {c.data.pointsCles.lignes.map((l) => (
                      <tr key={l.cle}>
                        <th className="w-44 bg-slate-50 px-4 py-2.5 align-top font-black text-indigo-700">
                          {l.cle}
                        </th>
                        <td className="px-4 py-2.5 text-slate-600">{l.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {c.data.pointsCles.callout ? (
                <p className="mt-2 rounded-xl border border-indigo-100 bg-indigo-50 p-3 text-sm leading-6 text-indigo-800">
                  {c.data.pointsCles.callout}
                </p>
              ) : null}

              {c.data.exemples.length > 0 ? (
                <>
                  <h3 className="mt-6 text-lg font-black text-slate-900">Exemple</h3>
                  {c.data.exemples.map((ex) => (
                    <div key={ex.titre} className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6">
                      <p className="font-black text-slate-900">{ex.titre}</p>
                      <p className="mt-1 text-slate-600">{ex.donnees}</p>
                      <p className="mt-0.5 font-bold text-slate-900">{ex.question}</p>
                      <p className="mt-2 text-indigo-800">{ex.solution}</p>
                    </div>
                  ))}
                </>
              ) : null}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wide text-amber-700">
                    Pièges à éviter
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-sm leading-6 text-slate-700">
                    {c.data.pieges.map((p) => (
                      <li key={p}>• {p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wide text-emerald-700">
                    À retenir
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-sm leading-6 text-slate-700">
                    {c.data.aRetenir.map((p) => (
                      <li key={p}>• {p}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <h3 className="mt-6 text-lg font-black text-slate-900">Exercices</h3>
              <ol className="mt-2 space-y-3 text-sm leading-6">
                {c.data.entrainement.map((it, i) => (
                  <li key={it.question} className="rounded-xl border border-slate-200 p-3">
                    <p className="font-bold text-slate-900">
                      {i + 1}. {it.question}
                    </p>
                    <p className="mt-1 text-indigo-800">
                      <span className="font-black">Correction : </span>
                      {it.correction}
                    </p>
                  </li>
                ))}
              </ol>
            </article>
          ))}

          <footer className="border-t border-slate-200 px-8 py-8 text-center text-xs text-slate-400 sm:px-14">
            eleveai.fr · La liberté d&apos;apprendre · Référentiel Pix « Compétences numériques en IA » v2.0
          </footer>
        </div>
      </div>

      <div className="screen-only fixed bottom-5 right-5 hidden sm:block">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-xl shadow-slate-300/50 transition hover:bg-slate-100"
        >
          <Printer className="h-4 w-4" />
          Imprimer
        </button>
      </div>

      <style jsx global>{`
        .remerciements-bar {
          display: none !important;
        }
        .print-running {
          display: none;
        }
        @media print {
          @page {
            size: A4;
            margin: 20mm 14mm;
          }
          html,
          body {
            background: white !important;
            color: #0f172a !important;
          }
          body > header,
          body > footer,
          .screen-only {
            display: none !important;
          }
          main {
            min-height: auto !important;
            background: white !important;
          }
          /* Haut et pied de page répétés sur chaque page imprimée. */
          .print-running {
            position: fixed;
            left: 14mm;
            right: 14mm;
            display: flex;
            justify-content: space-between;
            font-size: 8pt;
            letter-spacing: 0.02em;
            color: #94a3b8;
          }
          .print-running-header {
            top: 8mm;
            border-bottom: 0.3pt solid #e2e8f0;
            padding-bottom: 1.5mm;
          }
          .print-running-footer {
            bottom: 10mm;
            border-top: 0.3pt solid #e2e8f0;
            padding-top: 1.5mm;
          }
          .book-cover {
            break-after: page;
            min-height: auto !important;
          }
          .book-page {
            break-before: page;
          }
        }
      `}</style>
    </main>
  );
}
