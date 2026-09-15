"use client";

// ─── Le rendu d'une fiche d'exercices ──────────────────────────────────────────
// UNE donnée (`FicheExercicesData`), DEUX habillages : la page web, où chaque
// correction est repliée sous son exercice (« Voir la correction » — un geste,
// après avoir cherché), et le PDF, où les corrigés partent sur leur propre page
// en fin de document, comme les fiches d'activité du CP. Dans les deux cas ce
// sont des exercices CORRIGÉS ; ce qui change, c'est que le papier n'a pas de
// geste pour cacher une réponse.
//
// ⚠️ PAS DE MODE CLASSE ICI, et c'est voulu (Frédéric, 15/09/2026) : la fiche de
// cours reste l'outil projetable ; cette feuille est celle de l'élève, à faire
// au brouillon. Le composeur et les flashcards ne s'y appliquent pas non plus.
//
// ⭐ LE H1 NE DIT PAS LA MÊME CHOSE QUE CELUI DE LA FICHE DE COURS. Celle-ci
// titre « cours et exercices corrigés de maths 1re spé » ; ici « 20 exercices
// corrigés — maths 1re spé ». Deux pages, deux requêtes, aucune concurrence
// entre elles (Frédéric : « fais attention au h1 pour l'enregistrement Google »).

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Download,
  Lightbulb,
  PencilLine,
  Printer,
  Sparkles,
} from "lucide-react";
import TexteMath from "@/components/fiches/TexteMath";
import VideoNotion from "@/components/fiches/VideoNotion";
import { libelleClasse } from "@/lib/fiches/registre";
import { DOSSIER_PDF, nomPdfExercices } from "@/lib/fiches/pdf";
import { PDF_DISPONIBLES } from "@/lib/fiches/pdf-disponibles";
import { insecables } from "@/lib/fiches/typographie";
import {
  compterExercices,
  type FicheExercicesData,
  type NiveauExercice,
} from "@/lib/fiches-exercices/types";

const ETOILES: Record<NiveauExercice, string> = { 1: "★", 2: "★★", 3: "★★★" };

// ⚠️ Classes Tailwind écrites en entier, jamais concaténées : Tailwind lit le
// source en texte, `bg-${couleur}-50` ne produirait aucune règle.
const STYLES_NIVEAU: Record<
  NiveauExercice,
  { pastille: string; bordure: string; etoiles: string }
> = {
  1: {
    pastille: "bg-emerald-100 text-emerald-800",
    bordure: "border-emerald-200",
    etoiles: "text-emerald-500",
  },
  2: {
    pastille: "bg-sky-100 text-sky-800",
    bordure: "border-sky-200",
    etoiles: "text-sky-500",
  },
  3: {
    pastille: "bg-violet-100 text-violet-800",
    bordure: "border-violet-200",
    etoiles: "text-violet-500",
  },
};

export default function FicheExercicesClient({ fiche }: { fiche: FicheExercicesData }) {
  const nb = compterExercices(fiche);
  const titreComplet = `${fiche.titre} : ${nb} exercices corrigés`;
  // ⭐ LE MÊME NOM POUR LE LIEN ET POUR LE FICHIER : `build-fiches-pdf.ts` lit
  // `data-nom-pdf` sur le h1 et nomme le fichier ainsi. Le bouton n'apparaît que
  // si le fichier existe vraiment (manifeste `PDF_DISPONIBLES`).
  const fichierPdf = nomPdfExercices(fiche.titre, fiche.classe, nb);
  const pdfPret = PDF_DISPONIBLES.has(fichierPdf);
  const hrefPdf = `${DOSSIER_PDF}/${fichierPdf}`;
  const classe = libelleClasse(fiche.classe);

  // La numérotation court d'un niveau à l'autre : 1 à 20, pas trois fois 1 à 8.
  let compteur = 0;
  const seriesNumerotees = fiche.series.map((s) => {
    const debut = compteur + 1;
    compteur += s.exercices.length;
    return { ...s, debut };
  });

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800 print:bg-white">
      <article className="mx-auto max-w-5xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <header className="border-b border-slate-200 pb-6">
            {/* La remontée vers le hub — un élève qui a fini cette feuille doit
                trouver la suivante sans repasser par l'accueil. Écran seulement. */}
            <nav className="screen-only mb-4">
              <Link
                href="/fiches-exercices"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Toutes les fiches d&apos;exercices
              </Link>
            </nav>
            <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="flex items-center gap-2 text-lg font-black tracking-tight text-sky-600">
                <Sparkles className="h-5 w-5" />
                eleveai.fr
              </span>
              <span className="text-sm font-bold italic text-slate-500">
                La liberté d&apos;apprendre
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-normal">
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-cyan-700">
                {fiche.matiereLabel}
              </span>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700">{classe}</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">
                Fiche d&apos;exercices
              </span>
            </div>
            {/* ⚠️ `insecables` sur le texte affiché, JAMAIS sur les deux attributs :
                ils nomment le fichier PDF, et un caractère invisible dans un nom de
                fichier est un piège. */}
            <h1
              data-titre-pdf={fiche.titre}
              data-nom-pdf={fichierPdf}
              className="mt-5 text-3xl font-black tracking-normal text-slate-900 sm:text-5xl print:text-3xl"
            >
              {insecables(titreComplet)}
              <span className="mt-1 block text-base font-bold text-slate-400 sm:text-lg print:text-sm">
                {fiche.matiereLabel.toLowerCase()} {classe} — du geste seul au problème de
                contrôle
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 print:text-sm">
              <TexteMath>{fiche.accroche}</TexteMath>
            </p>

            {/* Les portes voisines : le cours à relire, le coach pour en refaire,
                le PDF pour imprimer. Un papier ne renvoie nulle part : screen-only. */}
            <div className="screen-only mt-5 flex flex-wrap gap-2">
              {fiche.fichesCours.map((f) => (
                <Link
                  key={f.href}
                  href={f.href}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100"
                >
                  <BookOpen className="h-4 w-4" />
                  {insecables(`Relire le cours — ${f.titre}`)}
                </Link>
              ))}
              {pdfPret ? (
                <a
                  href={hrefPdf}
                  download={fichierPdf}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow-sm transition hover:bg-sky-50"
                >
                  <Download className="h-4 w-4" />
                  Télécharger en PDF
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow-sm transition hover:bg-sky-50"
                >
                  <Printer className="h-4 w-4" />
                  Imprimer
                </button>
              )}
            </div>

            <VideoNotion matiere={fiche.matiere} classe={fiche.classe} notion={fiche.notion} />
          </header>

          {seriesNumerotees.map((serie) => {
            const st = STYLES_NIVEAU[serie.niveau];
            return (
              <section key={serie.niveau} className="pt-8 print:pt-5" data-niveau={serie.niveau}>
                {/* ⚠️ L'EN-TÊTE D'UN NIVEAU NE SE COUPE PAS À LA PLIURE (mesuré au
                    premier PDF, 15/09/2026) : le titre « Rappel de cours » restait
                    en bas de la page 2 et ses quatre lignes partaient page 3. Le
                    titre, la consigne et le rappel forment un seul bloc insécable
                    — voir `[data-entete-serie]` dans la feuille d'impression. */}
                <div data-entete-serie={serie.niveau}>
                <h2 className="flex flex-wrap items-center gap-2 text-2xl font-black text-slate-900 print:text-xl">
                  <span className={st.etoiles} aria-hidden="true">
                    {ETOILES[serie.niveau]}
                  </span>
                  {insecables(`${serie.titre} : exercices ${serie.debut} à ${serie.debut + serie.exercices.length - 1}`)}
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${st.pastille}`}>
                    niveau {serie.niveau}
                  </span>
                </h2>
                <p className="mt-1 text-sm text-slate-500 print:text-xs">
                  <TexteMath>{serie.consigne}</TexteMath>
                </p>

                {/* ⭐ LE RAPPEL DE COURS, AVANT LES EXERCICES DU NIVEAU — deux à
                    quatre lignes, pas le cours. Frédéric : « j'adore rappel cours
                    simple pour élèves bas moyens ». Il s'imprime avec la feuille. */}
                <div
                  className={`mt-4 rounded-2xl border bg-amber-50 p-4 ${st.bordure} print:p-3`}
                  style={{ borderColor: "#fde68a" }}
                >
                  <p className="flex items-center gap-2 text-sm font-black text-amber-900">
                    <Lightbulb className="h-4 w-4 text-amber-500 print:hidden" />
                    Rappel de cours
                  </p>
                  <ul className="mt-2 grid gap-1.5 text-sm leading-6 text-slate-800 print:text-xs">
                    {serie.rappel.map((ligne) => (
                      <li key={ligne} className="flex gap-2">
                        <span className="text-amber-500" aria-hidden="true">
                          •
                        </span>
                        <span className="min-w-0">
                          <TexteMath>{ligne}</TexteMath>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                </div>

                <ol start={serie.debut} className="mt-4 grid gap-4 text-sm leading-6 text-slate-700 print:gap-2 print:text-xs">
                  {serie.exercices.map((ex, i) => {
                    const numero = serie.debut + i;
                    return (
                      <li
                        key={ex.enonce}
                        data-exercice={numero}
                        className={`min-w-0 rounded-2xl border bg-white p-4 ${st.bordure}`}
                      >
                        <p className="font-bold text-slate-900">
                          <span className={`mr-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-black ${st.pastille}`}>
                            {numero}
                          </span>
                          {ex.titre ? (
                            <span className="text-slate-900">
                              <TexteMath>{ex.titre}</TexteMath>
                            </span>
                          ) : null}
                        </p>
                        <div className={`whitespace-pre-line text-slate-800 ${ex.titre ? "mt-2" : "-mt-6 pl-9"}`}>
                          <TexteMath>{ex.enonce}</TexteMath>
                        </div>
                        {/* Sur ÉCRAN : repliée, un geste pour l'ouvrir, après
                            avoir cherché. Sur PAPIER : absente d'ici, elle est
                            sur la page des corrigés (voir plus bas). */}
                        <details className="fiche-correction mt-3 print:hidden">
                          <summary className="cursor-pointer text-sm font-bold text-sky-600">
                            Voir la correction
                          </summary>
                          <div className="mt-2 whitespace-pre-line rounded-xl border border-sky-100 bg-sky-50 p-3 text-sm leading-6 text-sky-900">
                            <TexteMath>{ex.correction}</TexteMath>
                          </div>
                        </details>
                      </li>
                    );
                  })}
                </ol>

                <div className="screen-only mt-4">
                  <Link
                    href={fiche.coachHref}
                    className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-black text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                  >
                    <Sparkles className="h-4 w-4" />
                    Encore des exercices comme ceux-là, avec le Coach
                  </Link>
                </div>
              </section>
            );
          })}

          {/* ⭐⭐ LES CORRIGÉS, SUR LEUR PROPRE PAGE — papier seulement. Sur écran
              ce serait un doublon des dépliants. `.corrections-a-part` porte le
              saut de page (app/globals.css) : la feuille d'exercices s'arrête
              avant, et l'élève peut la faire sans lire la réponse. */}
          <section className="corrections-a-part hidden print:block">
            <h2 className="flex items-center gap-2 text-2xl font-black text-slate-900 print:text-xl">
              <CheckCircle2 className="h-6 w-6 text-emerald-500 print:hidden" />
              {insecables(`Corrigés : ${fiche.titre.toLowerCase()}, ${nb} exercices`)}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Ces pages se détachent de la feuille d&apos;exercices. Chaque étape est écrite, avec son
              pourquoi.
            </p>
            <ol className="mt-3 grid gap-3 text-xs leading-5 text-slate-700">
              {seriesNumerotees.flatMap((serie) =>
                serie.exercices.map((ex, i) => (
                  <li key={ex.enonce} className="whitespace-pre-line">
                    <span className="font-black text-slate-900">
                      {serie.debut + i}.{" "}
                      {ex.titre ? <TexteMath>{ex.titre}</TexteMath> : null}
                    </span>
                    {ex.titre ? "\n" : " "}
                    <TexteMath>{ex.correction}</TexteMath>
                  </li>
                )),
              )}
            </ol>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500 print:mt-6">
            <span>eleveai.fr - Fiche d&apos;exercices</span>
            <span>
              {fiche.titre} - {classe}
            </span>
          </footer>
        </section>
      </article>

      <div className="screen-only fixed bottom-5 right-5 hidden sm:block">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-xl shadow-slate-300/50 transition hover:bg-slate-100"
        >
          <PencilLine className="h-4 w-4" />
          Imprimer la feuille
        </button>
      </div>

      <style jsx global>{`
        .remerciements-bar {
          display: none !important;
        }

        @media print {
          @page {
            size: A4;
            margin: 12mm;
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
            color: #0f172a !important;
          }

          /* Un exercice ne se coupe pas à la pliure : son énoncé tient sur une
             page. Le corrigé, lui, peut courir — il est sur ses propres pages. */
          [data-exercice],
          [data-entete-serie] {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </main>
  );
}
