"use client";

// LA FICHE PROF — le gabarit imprimable des machines « dans ta main ».
// Une feuille A4 clé en main, GÉNÉRÉE à partir des mêmes défis que le simulateur
// (aucune double saisie : on change un défi, la fiche suit). Réutilisable pour
// toutes les machines — on passe le titre, l'objectif, la manip, la trace et les
// défis ; le reste (déroulé, tableau + corrigé, impression) est commun.
//
// Impression : « 🖨️ Imprimer / PDF » → window.print(). La feuille de style
// @media print masque TOUT sauf la fiche (astuce visibility) — quel que soit le
// header du site — et pose des marges A4.

import Link from "next/link";
import type { DefiSimulateur } from "@/components/simulateurs/DefisSimulateur";

export type FicheProfProps = {
  titre: string;
  matiere: string;
  niveaux: string;
  duree: string;
  /** URL affichée (ex. « eleveai.fr/pourquoi-les-bulles-sont-rondes »). */
  url: string;
  /** Lien interne de retour vers la machine. */
  retour: string;
  objectif: string;
  /** Temps 1 — la question d'accroche (ce que fait le prof). */
  question: string;
  /** Temps 2 — la consigne sur le simulateur. */
  manip: string;
  /** Temps 3 — la trace écrite (le mot-clé peut être en gras). */
  trace: string;
  /** Ligne « lycée » optionnelle de la trace (la version formelle). */
  traceLycee?: string;
  /** Les MÊMES défis que le simulateur : le tableau + le corrigé en sortent. */
  defis: DefiSimulateur[];
  prolongements?: string[];
  /** Couleur d'accent (défaut : le cyan du journal). */
  accent?: string;
};

// « CP · CE1 — La ficelle… » → { niveau: "CP · CE1", texte: "La ficelle…" }
function couperNiveau(question: string): { niveau: string; texte: string } {
  const i = question.indexOf("—");
  if (i === -1) return { niveau: "", texte: question };
  return { niveau: question.slice(0, i).trim(), texte: question.slice(i + 1).trim() };
}

const CSS_IMPRESSION = `
@media print {
  body * { visibility: hidden !important; }
  #fiche-prof, #fiche-prof * { visibility: visible !important; }
  #fiche-prof { position: absolute; inset: 0; margin: 0 !important; border: 0 !important; box-shadow: none !important; }
  .no-print { display: none !important; }
  @page { margin: 12mm; }
}
`;

export default function FicheProf({
  titre,
  matiere,
  niveaux,
  duree,
  url,
  retour,
  objectif,
  question,
  manip,
  trace,
  traceLycee,
  defis,
  prolongements,
  accent = "#0e7490",
}: FicheProfProps) {
  return (
    <main className="min-h-screen bg-[#eef2f5] px-4 py-6 print:bg-white print:p-0" style={{ color: "#0c2733" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS_IMPRESSION }} />

      {/* Barre d'action — jamais imprimée */}
      <div className="no-print mx-auto mb-4 flex max-w-[800px] items-center justify-between gap-3">
        <Link href={retour} className="text-sm font-bold hover:underline" style={{ color: accent }}>
          ← Retour à la machine
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded px-4 py-2 text-sm font-black text-white hover:brightness-110"
          style={{ backgroundColor: accent }}
        >
          🖨️ Imprimer / PDF
        </button>
      </div>

      {/* LA FEUILLE */}
      <div
        id="fiche-prof"
        className="mx-auto max-w-[800px] rounded border bg-white p-6 shadow-sm sm:p-8 print:rounded-none print:border-0 print:shadow-none"
        style={{ borderColor: "#d5dfe4" }}
      >
        {/* En-tête */}
        <div className="flex items-start justify-between gap-4 border-b-2 pb-3" style={{ borderColor: "#0c2733" }}>
          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: accent }}>
              Fiche prof · Un peu de maths
            </p>
            <h1 className="mt-0.5 font-serif text-2xl font-black leading-tight sm:text-3xl">{titre}</h1>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[matiere, niveaux, duree].map((chip) => (
                <span
                  key={chip}
                  className="rounded px-2 py-0.5 text-[11px] font-bold"
                  style={{ backgroundColor: "#e7f2f5", color: accent }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0 text-center">
            <div
              className="flex h-14 w-14 items-center justify-center rounded border text-2xl"
              style={{ borderColor: "#d5dfe4" }}
              aria-hidden
            >
              🫧
            </div>
            <p className="mt-1 max-w-[92px] text-[9px] leading-tight" style={{ color: "#5a7683" }}>
              {url}
            </p>
          </div>
        </div>

        {/* Objectif */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="whitespace-nowrap text-xs font-bold" style={{ color: "#5a7683" }}>Objectif</span>
          <p className="text-[13.5px] leading-6">{objectif}</p>
        </div>

        {/* Déroulé */}
        <section className="mt-5">
          <h2 className="border-b pb-1 text-[13px] font-black" style={{ color: accent, borderColor: "#e0e8ec" }}>
            Déroulé — 3 temps
          </h2>
          <ol className="mt-2 space-y-2.5">
            {[
              { t: "La question", meta: "5 min", c: question },
              { t: "La machine", meta: "10 min · tablette / TBI", c: manip },
            ].map((etape, i) => (
              <li key={etape.t} className="flex gap-2.5">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white"
                  style={{ backgroundColor: accent }}
                >
                  {i + 1}
                </span>
                <p className="text-[12.5px] leading-6">
                  <b>{etape.t}</b> <span className="text-[11px]" style={{ color: "#8aa2ad" }}>{etape.meta}</span>
                  <br />
                  <span style={{ color: "#3a5763" }}>{etape.c}</span>
                </p>
              </li>
            ))}
            <li className="flex gap-2.5">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white"
                style={{ backgroundColor: accent }}
              >
                3
              </span>
              <div className="flex-1">
                <p className="text-[12.5px] leading-6">
                  <b>La trace écrite</b> <span className="text-[11px]" style={{ color: "#8aa2ad" }}>à faire recopier</span>
                </p>
                <div
                  className="mt-1 rounded border border-dashed px-3 py-2 text-[12.5px] leading-7"
                  style={{ borderColor: "#b9cdd4" }}
                >
                  {trace}
                  {traceLycee && (
                    <>
                      <br />
                      <span className="text-[11px]" style={{ color: "#5a7683" }}>
                        Lycée — <span className="font-mono">{traceLycee}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </li>
          </ol>
        </section>

        {/* Les défis + corrigé (générés depuis les mêmes défis que la machine) */}
        <section className="mt-5">
          <h2 className="border-b pb-1 text-[13px] font-black" style={{ color: accent, borderColor: "#e0e8ec" }}>
            Les défis notés <span className="font-normal" style={{ color: "#8aa2ad" }}>— corrigé inclus · choisis les lignes de ton niveau</span>
          </h2>
          <table className="mt-2 w-full border-collapse text-[11.5px]" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr className="text-left" style={{ color: "#5a7683" }}>
                <th className="w-[20%] px-1.5 py-1 font-bold">Niveau</th>
                <th className="px-1.5 py-1 font-bold">Le défi</th>
                <th className="w-[22%] px-1.5 py-1 font-bold">Réponse</th>
              </tr>
            </thead>
            <tbody>
              {defis.map((d) => {
                const { niveau, texte } = couperNiveau(d.question);
                const rep = `${d.reponse}${d.unite ? " " + d.unite : ""}`;
                return (
                  <tr key={d.id} style={{ borderTop: "0.5px solid #e0e8ec", breakInside: "avoid" }}>
                    <td className="px-1.5 py-1.5 align-top font-bold">{niveau}</td>
                    <td className="px-1.5 py-1.5 align-top" style={{ color: "#3a5763" }}>{texte}</td>
                    <td className="px-1.5 py-1.5 align-top font-mono font-bold" style={{ color: "#0f766e" }}>{rep}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-1.5 text-[11px]" style={{ color: "#8aa2ad" }}>
            Astuce : l&apos;élève peut <b>régler la machine</b> pour vérifier lui-même — les nombres des défis sont différents du curseur.
          </p>
        </section>

        {/* Prolongements + pied */}
        {prolongements && prolongements.length > 0 && (
          <section className="mt-4 border-t pt-2.5" style={{ borderColor: "#e0e8ec" }}>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11.5px]" style={{ color: "#5a7683" }}>
              <span className="font-bold" style={{ color: accent }}>Prolongements :</span>
              {prolongements.map((p) => (
                <span key={p}>• {p}</span>
              ))}
            </div>
          </section>
        )}

        <p className="mt-4 text-right text-[10px]" style={{ color: "#8aa2ad" }}>
          EleveAI · {url} — à imprimer ou projeter · usage libre en classe
        </p>
      </div>
    </main>
  );
}
