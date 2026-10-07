"use client";

// ─── Les tables de multiplication à imprimer ─────────────────────────────────
// SIX FEUILLES A4, UN SEUL PDF (Frédéric, 07/10/2026 : « un seul pdf pour les
// fiches ») : les tables · le grand tableau · les tables à compléter · le
// tableau à remplir · multiplier et diviser · le corrigé. À l'écran elles se
// suivent ; chacune a son bouton « Imprimer cette feuille ».
//
// ⭐ COULEUR OU NOIR ET BLANC (« en couleur ou noir et blanc »). Le noir et
// blanc n'est pas un filtre gris posé sur la couleur — un aplat gris consomme
// l'encre qu'on voulait économiser. C'est une autre palette : traits noirs,
// fonds blancs, seul le tableau garde sa diagonale en gris très clair. Les
// deux PDF existent (`?nb=1` pour le second), chacun avec tout dedans.
//
// ⛔ LA DIVISION S'ÉCRIT « : », JAMAIS 12/4 — un élève de 6e ne lit pas la
// barre comme une division (Frédéric, 06/10). Et la table de 10 se dit en
// dizaines, jamais « on ajoute un zéro ».
//
// ⚠️ LE TIRAGE DES QUESTIONS EST GRAINÉ, PAS ALÉATOIRE : le serveur et le
// navigateur doivent rendre la même page (sinon React se plaint à
// l'hydratation), et le PDF doit avoir le même corrigé à chaque fabrication.
// « Nouvelles questions » change la graine, pour celui qui imprime deux fois.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Palette, Printer, RefreshCw, Sparkles } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { DOSSIER_PDF } from "@/lib/fiches/pdf";
import { PDF_DISPONIBLES } from "@/lib/fiches/pdf-disponibles";

const PDF_COULEUR = "tables-de-multiplication-1-a-10-a-imprimer.pdf";
const PDF_NB = "tables-de-multiplication-1-a-10-a-imprimer-noir-et-blanc.pdf";

const FACTEURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ⭐ LA VIDÉO « Les bases » (07/10/2026) : sur la page à l'écran, en QR code sur
// le papier (feuille 5 et corrigé) — un lien ne se clique pas sur une feuille.
const VIDEO_ID = "3ISJ48NHGd8";
const VIDEO_URL = `https://youtu.be/${VIDEO_ID}`;
const VIDEO_TITRE = "Une multiplication, deux divisions";

/** Une couleur par table : le trait et le fond. En noir et blanc, tout est noir sur blanc. */
const COULEURS: Record<number, { trait: string; fond: string }> = {
  1: { trait: "#475569", fond: "#f1f5f9" },
  2: { trait: "#dc2626", fond: "#fef2f2" },
  3: { trait: "#ea580c", fond: "#fff7ed" },
  4: { trait: "#a16207", fond: "#fefce8" },
  5: { trait: "#16a34a", fond: "#f0fdf4" },
  6: { trait: "#0d9488", fond: "#f0fdfa" },
  7: { trait: "#0284c7", fond: "#f0f9ff" },
  8: { trait: "#4f46e5", fond: "#eef2ff" },
  9: { trait: "#9333ea", fond: "#faf5ff" },
  10: { trait: "#db2777", fond: "#fdf2f8" },
};
const NB = { trait: "#111827", fond: "#ffffff" };

/** Espaces insécables autour des signes : « 3 × 7 » ne se coupe jamais en fin de ligne. */
const fois = (a: number | string, b: number | string) => `${a} × ${b}`;
const divise = (a: number | string, b: number | string) => `${a} : ${b}`;
const TROU = "……";

/** Générateur grainé (mulberry32) : même graine, mêmes questions. */
function hasard(graine: number) {
  let a = graine >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function melanger<T>(liste: T[], r: () => number): T[] {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

type QuestionDivision = { texte: string; reponse: number };

function tirer(graine: number) {
  const r = hasard(graine);
  // Les tables à compléter : chaque table dans le désordre.
  const desordre = FACTEURS.map((t) => melanger(FACTEURS, r));
  // Multiplier et diviser : 24 questions, tables de 2 à 10, facteurs de 2 à 10,
  // une sur deux en division (« 42 : 6 »), une sur deux en facteur manquant
  // (« … × 6 = 42 ») — c'est la même question posée à l'envers.
  const paires = melanger(
    FACTEURS.slice(1).flatMap((a) => FACTEURS.slice(1).map((b) => [a, b] as const)),
    r,
  ).slice(0, 24);
  const divisions: QuestionDivision[] = paires.map(([a, b], i) =>
    i % 2 === 0
      ? { texte: `${divise(a * b, b)} = ${TROU}`, reponse: a }
      : { texte: `${TROU} × ${b} = ${a * b}`.replace(/ /g, " "), reponse: a },
  );
  return { desordre, divisions };
}

// ─── Les morceaux ────────────────────────────────────────────────────────────

function EnTeteFeuille({ titre, eleve }: { titre: string; eleve?: boolean }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-2 border-b border-slate-300 pb-2 print:mb-3">
      <div>
        <p className="flex items-center gap-1.5 text-xs font-black text-sky-600">
          <Sparkles className="h-3.5 w-3.5" />
          eleveai.fr · Les tables de multiplication
        </p>
        <h2 className="mt-1 text-2xl font-black text-slate-900 print:text-xl">{titre}</h2>
      </div>
      {eleve ? (
        <p className="text-sm text-slate-600">
          Prénom : ………………………… &nbsp; Date : ……………
        </p>
      ) : null}
    </div>
  );
}

function BoutonImprimerFeuille({ id }: { id: string }) {
  return (
    <button
      type="button"
      onClick={() => imprimer(id)}
      className="screen-only inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
    >
      <Printer className="h-3.5 w-3.5" />
      Imprimer cette feuille
    </button>
  );
}

/** Imprime une seule feuille (id) ou toutes (null). */
function imprimer(id: string | null) {
  const racine = document.documentElement;
  if (id) racine.dataset.imprimer = id;
  else delete racine.dataset.imprimer;
  const nettoyer = () => {
    delete racine.dataset.imprimer;
    window.removeEventListener("afterprint", nettoyer);
  };
  window.addEventListener("afterprint", nettoyer);
  window.print();
}

function Feuille({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-feuille={id}
      className="feuille rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-300/30 sm:p-7 print:rounded-none print:border-0 print:p-0 print:shadow-none"
    >
      {children}
      <div className="mt-4 flex justify-end">
        <BoutonImprimerFeuille id={id} />
      </div>
    </section>
  );
}

function CarteTable({
  table,
  ordre,
  avecResultats,
  nb,
}: {
  table: number;
  ordre: number[];
  avecResultats: boolean;
  nb: boolean;
}) {
  const c = nb ? NB : COULEURS[table];
  return (
    <div
      className="break-inside-avoid rounded-xl border-2 p-2 sm:p-3"
      style={{ borderColor: c.trait, background: c.fond }}
    >
      <p
        className="mb-1.5 rounded-md py-0.5 text-center text-sm font-black print:text-[15px]"
        style={nb ? { color: NB.trait, borderBottom: "2px solid #111827", borderRadius: 0 } : { background: c.trait, color: "#fff" }}
      >
        Table de {table}
      </p>
      <ul className="space-y-0.5 font-mono text-[15px] leading-6 tabular-nums text-slate-900 print:text-[16px] print:leading-[2.05]">
        {ordre.map((k) => (
          <li key={k} className="whitespace-nowrap">
            {fois(table, k)} ={" "}
            {avecResultats ? (
              <b style={{ color: nb ? undefined : c.trait }}>{table * k}</b>
            ) : (
              <span className="text-slate-400">{TROU}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** En-tête de ligne ou de colonne : la couleur de la table, ou un trait noir sur blanc. */
function enTete(n: number, nb: boolean): React.CSSProperties {
  return nb
    ? { color: NB.trait, background: "#fff", borderWidth: 2, borderColor: NB.trait }
    : { background: COULEURS[n].trait, color: "#fff" };
}

function GrandTableau({ rempli, nb }: { rempli: boolean; nb: boolean }) {
  return (
    <table className="w-full table-fixed border-collapse text-center tabular-nums">
      <thead>
        <tr>
          <th className="border border-slate-400 p-0 text-sm font-black sm:text-base"
            style={nb ? { color: NB.trait, background: "#fff" } : { background: "#1e293b", color: "#fff" }}>
            ×
          </th>
          {FACTEURS.map((b) => (
            <th
              key={b}
              className="border border-slate-400 py-1 text-xs font-black sm:text-base print:text-lg"
              style={enTete(b, nb)}
            >
              {b}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {FACTEURS.map((a) => (
          <tr key={a}>
            <th
              className="border border-slate-400 py-1 text-xs font-black sm:text-base print:text-lg"
              style={enTete(a, nb)}
            >
              {a}
            </th>
            {FACTEURS.map((b) => {
              const diagonale = a === b;
              return (
                <td
                  key={b}
                  className="h-7 border border-slate-400 p-0 text-[11px] font-bold text-slate-900 sm:h-10 sm:text-base print:h-[19mm] print:text-[18px]"
                  style={{
                    background: diagonale
                      ? nb
                        ? "#e5e7eb"
                        : "#fde68a"
                      : nb
                        ? "#ffffff"
                        : COULEURS[a].fond,
                  }}
                >
                  {rempli ? a * b : ""}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** 12 jetons en 3 rangées de 4, encadrés par colonnes (12 : 4) ou par rangées (12 : 3). */
function Jetons({ cadre, nb }: { cadre: "aucun" | "colonnes" | "rangees"; nb: boolean }) {
  const pas = 26;
  const x0 = 20;
  const y0 = 18;
  const couleurJeton = nb ? "#111827" : "#0284c7";
  const couleurCadre = nb ? "#111827" : cadre === "colonnes" ? "#16a34a" : "#ea580c";
  return (
    <svg viewBox="0 0 132 96" className="h-auto w-full max-w-[150px]" aria-hidden>
      {cadre === "colonnes"
        ? [0, 1, 2, 3].map((c) => (
            <rect
              key={c}
              x={x0 + c * pas - 10}
              y={y0 - 10}
              width={20}
              height={2 * pas + 20}
              rx={8}
              fill="none"
              stroke={couleurCadre}
              strokeWidth={2}
            />
          ))
        : null}
      {cadre === "rangees"
        ? [0, 1, 2].map((l) => (
            <rect
              key={l}
              x={x0 - 11}
              y={y0 + l * pas - 10}
              width={3 * pas + 22}
              height={20}
              rx={8}
              fill="none"
              stroke={couleurCadre}
              strokeWidth={2}
            />
          ))
        : null}
      {[0, 1, 2].flatMap((l) =>
        [0, 1, 2, 3].map((c) => (
          <circle
            key={`${l}-${c}`}
            cx={x0 + c * pas}
            cy={y0 + l * pas}
            r={7}
            fill={nb ? "#ffffff" : couleurJeton}
            stroke={couleurJeton}
            strokeWidth={2}
          />
        )),
      )}
    </svg>
  );
}

/** Le QR code de la vidéo, pour la feuille imprimée. */
function QrVideo({ nb }: { nb: boolean }) {
  return (
    <div
      className="mt-4 flex items-center gap-3 rounded-2xl border-2 p-3"
      style={{ borderColor: nb ? NB.trait : "#fecdd3", background: nb ? NB.fond : "#fff1f2" }}
    >
      <div className="shrink-0 rounded-lg bg-white p-1">
        <QRCodeSVG value={VIDEO_URL} size={64} aria-label="QR code vers la vidéo" />
      </div>
      <p className="text-sm leading-5 text-slate-700">
        <b className="text-slate-900">La vidéo : « {VIDEO_TITRE} »</b>
        <br />
        Scanne le QR code avec un téléphone pour la voir.
      </p>
    </div>
  );
}

// ─── La page ─────────────────────────────────────────────────────────────────

export default function TablesClient() {
  const [nb, setNb] = useState(false);
  const [graine, setGraine] = useState(2026);

  // `?nb=1` ouvre directement le noir et blanc — c'est ainsi que le script
  // fabrique le second PDF.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("nb") === "1") setNb(true);
  }, []);

  const { desordre, divisions } = useMemo(() => tirer(graine), [graine]);
  const fichierPdf = nb ? PDF_NB : PDF_COULEUR;
  const pdfPret = PDF_DISPONIBLES.has(fichierPdf);

  return (
    <main
      data-mode={nb ? "nb" : "couleur"}
      className="min-h-screen bg-[#f5f8ff] text-slate-800 print:bg-white"
    >
      <article className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-8 print:max-w-none print:space-y-0 print:px-0 print:py-0">
        {/* ── Le chapeau : écran seulement ── */}
        <header className="screen-only rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-300/30 sm:p-7">
          <h1
            data-nom-pdf={fichierPdf}
            className="text-3xl font-black text-slate-900 sm:text-5xl"
          >
            Tables de multiplication de 1 à 10 à imprimer
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Les tables, le grand tableau, des tables à compléter, et la division par les
            tables : <b>{fois(3, 4)} = 12</b>, donc <b>{divise(12, 4)} = 3</b> et{" "}
            <b>{divise(12, 3)} = 4</b>. Six feuilles, un seul PDF, avec le corrigé à la fin.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <div
              role="group"
              aria-label="Couleur ou noir et blanc"
              className="inline-flex rounded-full border border-slate-300 bg-slate-50 p-1"
            >
              <button
                type="button"
                onClick={() => setNb(false)}
                aria-pressed={!nb}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold transition ${
                  !nb ? "bg-white text-sky-700 shadow" : "text-slate-500"
                }`}
              >
                <Palette className="h-4 w-4" />
                Couleur
              </button>
              <button
                type="button"
                onClick={() => setNb(true)}
                aria-pressed={nb}
                className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition ${
                  nb ? "bg-white text-slate-900 shadow" : "text-slate-500"
                }`}
              >
                Noir et blanc
              </button>
            </div>

            <button
              type="button"
              onClick={() => imprimer(null)}
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white shadow transition hover:bg-sky-700"
            >
              <Printer className="h-4 w-4" />
              Tout imprimer
            </button>

            {pdfPret ? (
              <a
                href={`${DOSSIER_PDF}/${fichierPdf}`}
                download
                className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
              >
                <Download className="h-4 w-4" />
                PDF {nb ? "noir et blanc" : "couleur"}
              </a>
            ) : null}

            <button
              type="button"
              onClick={() => setGraine((g) => g + 1)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" />
              Nouvelles questions
            </button>
          </div>

          <nav className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold text-sky-700">
            <a href="#tables">1. Les tables</a>
            <a href="#tableau">2. Le grand tableau</a>
            <a href="#a-completer">3. À compléter</a>
            <a href="#tableau-a-remplir">4. Tableau à remplir</a>
            <a href="#diviser">5. Multiplier et diviser</a>
            <a href="#corrige">6. Corrigé</a>
          </nav>
          {/* ⛔ Pas d'autoplay : le lecteur s'affiche à l'arrêt, l'élève appuie lui-même. */}
          <div className="mt-5 max-w-2xl">
            <p className="mb-2 text-sm font-black text-slate-900">
              La vidéo : « {VIDEO_TITRE} »
            </p>
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
                title={VIDEO_TITRE}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Pour s&apos;entraîner en ligne :{" "}
            <Link href="/coach-ia/maths" className="font-bold text-sky-700 underline">
              le coach de maths
            </Link>
            .
          </p>
        </header>

        {/* ── 1. Les tables ── */}
        <Feuille id="tables">
          <EnTeteFeuille titre="Les tables de multiplication de 1 à 10" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5 print:grid-cols-5 print:gap-2">
            {FACTEURS.map((t) => (
              <CarteTable key={t} table={t} ordre={FACTEURS} avecResultats nb={nb} />
            ))}
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            <b>La table de 10 :</b> {fois(7, 10)}, c&apos;est 7 dizaines, donc 70.
          </p>
        </Feuille>

        {/* ── 2. Le grand tableau ── */}
        <Feuille id="tableau">
          <EnTeteFeuille titre="Le grand tableau de multiplication" />
          <GrandTableau rempli nb={nb} />
          <div className="mt-4 space-y-1.5 text-sm leading-6 text-slate-700">
            <p>
              <b>Comment le lire :</b> pour {fois(6, 7)}, on part de la ligne 6, on va jusqu&apos;à
              la colonne 7 : on trouve 42.
            </p>
            <p>
              <b>{fois(3, 7)} = {fois(7, 3)} = 21.</b> Le tableau est symétrique par rapport à
              sa diagonale (les cases {nb ? "grises" : "jaunes"}) : on a presque deux fois moins
              de résultats à retenir qu&apos;on ne le croit.
            </p>
          </div>
        </Feuille>

        {/* ── 3. Les tables à compléter ── */}
        <Feuille id="a-completer">
          <EnTeteFeuille titre="Les tables à compléter" eleve />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5 print:grid-cols-5 print:gap-2">
            {FACTEURS.map((t, i) => (
              <CarteTable key={t} table={t} ordre={desordre[i]} avecResultats={false} nb={nb} />
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Les calculs sont dans le désordre. Pour vérifier : la feuille 1 ou le grand tableau.
          </p>
        </Feuille>

        {/* ── 4. Le tableau à remplir ── */}
        <Feuille id="tableau-a-remplir">
          <EnTeteFeuille titre="Le grand tableau à remplir" eleve />
          <GrandTableau rempli={false} nb={nb} />
          <p className="mt-4 text-sm leading-6 text-slate-700">
            Commence par les tables faciles : 1, 2, 5 et 10. Puis remplis la case
            symétrique : si tu connais {fois(3, 7)}, tu connais {fois(7, 3)}.
          </p>
        </Feuille>

        {/* ── 5. Multiplier et diviser ── */}
        <Feuille id="diviser">
          <EnTeteFeuille titre="Multiplier et diviser" eleve />
          <div
            className="rounded-2xl border-2 p-4"
            style={{
              borderColor: nb ? NB.trait : "#0284c7",
              background: nb ? NB.fond : "#f0f9ff",
            }}
          >
            <p className="text-center text-lg font-black text-slate-900">
              Une multiplication donne deux divisions.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm font-bold text-slate-900 sm:text-base">
              <div className="flex flex-col items-center">
                <Jetons cadre="aucun" nb={nb} />
                <p>3 rangées de 4</p>
                <p className="whitespace-nowrap text-sm font-black sm:text-lg">{fois(3, 4)} = 12</p>
              </div>
              <div className="flex flex-col items-center">
                <Jetons cadre="colonnes" nb={nb} />
                <p>12 partagés en 4 groupes, 3 dans chaque groupe</p>
                <p className="whitespace-nowrap text-sm font-black sm:text-lg">{divise(12, 4)} = 3</p>
              </div>
              <div className="flex flex-col items-center">
                <Jetons cadre="rangees" nb={nb} />
                <p>12 partagés en 3 groupes, 4 dans chaque groupe</p>
                <p className="whitespace-nowrap text-sm font-black sm:text-lg">{divise(12, 3)} = 4</p>
              </div>
            </div>
            <p className="mt-3 text-center text-sm leading-6 text-slate-700">
              Pour calculer {divise(42, 6)}, on se demande « 6 fois combien font 42 ? ». Dans la
              table de 6, {fois(6, 7)} = 42, donc {divise(42, 6)} = 7.
            </p>
          </div>

          <ol className="mt-5 grid list-none grid-cols-2 gap-x-4 gap-y-3 font-mono text-[15px] tabular-nums text-slate-900 sm:grid-cols-3 print:grid-cols-3 print:gap-y-7 print:text-[17px]">
            {divisions.map((q, i) => (
              <li key={i} className="whitespace-nowrap">
                <span className="mr-1.5 text-xs font-bold text-slate-400">{i + 1}.</span>
                {q.texte}
              </li>
            ))}
          </ol>
          <QrVideo nb={nb} />
        </Feuille>

        {/* ── 6. Le corrigé ── */}
        <Feuille id="corrige">
          <EnTeteFeuille titre="Corrigé" />
          <h3 className="text-base font-black text-slate-900">Multiplier et diviser</h3>
          <ol className="mt-2 grid list-none grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[14px] tabular-nums text-slate-900 sm:grid-cols-3">
            {divisions.map((q, i) => (
              <li key={i} className="whitespace-nowrap">
                <span className="mr-1.5 text-xs font-bold text-slate-400">{i + 1}.</span>
                {q.texte.replace(TROU, `${q.reponse}`)}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm leading-6 text-slate-700">
            <b>Les tables à compléter et le tableau à remplir :</b> les réponses sont sur la
            feuille 1 et la feuille 2.
          </p>
          <QrVideo nb={nb} />
        </Feuille>
      </article>

      <style jsx global>{`
        .remerciements-bar {
          display: none !important;
        }

        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }

          html,
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          body > header,
          body > footer,
          .screen-only {
            display: none !important;
          }

          main {
            min-height: auto !important;
          }

          /* Une feuille = une page A4. */
          .feuille {
            break-after: page;
            page-break-after: always;
          }
          .feuille:last-of-type {
            break-after: auto;
            page-break-after: auto;
          }

          /* « Imprimer cette feuille » : les autres disparaissent le temps de
             l'impression, et la seule restante ne pousse pas de page blanche. */
          html[data-imprimer] .feuille {
            display: none !important;
          }
          html[data-imprimer="tables"] #tables,
          html[data-imprimer="tableau"] #tableau,
          html[data-imprimer="a-completer"] #a-completer,
          html[data-imprimer="tableau-a-remplir"] #tableau-a-remplir,
          html[data-imprimer="diviser"] #diviser,
          html[data-imprimer="corrige"] #corrige {
            display: block !important;
            break-after: auto;
            page-break-after: auto;
          }
        }
      `}</style>
    </main>
  );
}
