"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Download, Scissors, Sparkles, Star } from "lucide-react";
import { TOUS_LES_MOTS, MATIERES, type DicteeMot } from "@/lib/dictee-du-jour/words";

/* URL encodée dans le QR (trace les inscriptions venues du jeu de cartes). */
const SIGNUP_URL = "https://eleveai.fr/auth/signin?from=cartes";
const TI_MARGO = "/cahier-vacances/ti-margo.png";

/* Habillage visuel par matière : couleur vive + gros emoji.
   Classes Tailwind écrites en entier (pas de concat dynamique → purge OK). */
type MatMeta = { emoji: string; ring: string; text: string; soft: string; dot: string };
const MAT: Record<string, MatMeta> = {
  Français: { emoji: "✍️", ring: "border-sky-300", text: "text-sky-700", soft: "bg-sky-50", dot: "bg-sky-500" },
  Maths: { emoji: "📐", ring: "border-violet-300", text: "text-violet-700", soft: "bg-violet-50", dot: "bg-violet-500" },
  Anglais: { emoji: "🇬🇧", ring: "border-blue-300", text: "text-blue-700", soft: "bg-blue-50", dot: "bg-blue-600" },
  Espagnol: { emoji: "🇪🇸", ring: "border-red-300", text: "text-red-700", soft: "bg-red-50", dot: "bg-red-500" },
  Histoire: { emoji: "📜", ring: "border-amber-300", text: "text-amber-800", soft: "bg-amber-50", dot: "bg-amber-600" },
  Géographie: { emoji: "🗺️", ring: "border-teal-300", text: "text-teal-700", soft: "bg-teal-50", dot: "bg-teal-500" },
  Écologie: { emoji: "🌱", ring: "border-green-300", text: "text-green-700", soft: "bg-green-50", dot: "bg-green-500" },
  Physique: { emoji: "⚡", ring: "border-yellow-400", text: "text-yellow-700", soft: "bg-yellow-50", dot: "bg-yellow-500" },
  SVT: { emoji: "🧬", ring: "border-emerald-300", text: "text-emerald-700", soft: "bg-emerald-50", dot: "bg-emerald-500" },
  Musique: { emoji: "🎵", ring: "border-fuchsia-300", text: "text-fuchsia-700", soft: "bg-fuchsia-50", dot: "bg-fuchsia-500" },
  "Arts plastiques": { emoji: "🎨", ring: "border-pink-300", text: "text-pink-700", soft: "bg-pink-50", dot: "bg-pink-500" },
};
const MAT_DEFAUT: MatMeta = { emoji: "⭐", ring: "border-slate-300", text: "text-slate-700", soft: "bg-slate-50", dot: "bg-slate-500" };

/* Un mot est une carte « rare » (légendaire ⭐) si son orthographe est costaude. */
function estRare(mot: DicteeMot): boolean {
  return mot.mot.replace(/[^A-Za-zÀ-ÿ]/g, "").length >= 11;
}

/* Libellé de la matière raccourci pour tenir sur la carte. */
function labelCourt(matiere: string): string {
  return matiere === "Arts plastiques" ? "Arts pla." : matiere;
}

/* Sélection des 32 cartes : round-robin sur les 11 matières → chaque page est
   un arc-en-ciel de matières (effet « on pioche, ça tombe sur n'importe quoi »). */
function construireDeck(): DicteeMot[] {
  const parMatiere = MATIERES.map((mat) => TOUS_LES_MOTS.filter((w) => w.matiere === mat));
  const deck: DicteeMot[] = [];
  for (let tour = 0; tour < 3; tour++) {
    for (const arr of parMatiere) {
      if (arr[tour]) deck.push(arr[tour]);
    }
  }
  return deck.slice(0, 32);
}

/* -------------------------------------------------------------------------- */
/*  Une carte à jouer                                                         */
/* -------------------------------------------------------------------------- */

function Carte({ mot, n }: { mot: DicteeMot; n: number }) {
  const m = MAT[mot.matiere] ?? MAT_DEFAUT;
  const rare = estRare(mot);
  const trad = mot.lang !== "fr";
  const consigne = trad ? "Comment dit-on ?" : "Qui suis-je ?";

  return (
    <article
      className={`carte relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 p-3 print:rounded-none ${
        rare ? "border-amber-400 bg-amber-50/50" : `${m.ring} bg-white`
      }`}
    >
      {/* Gros emoji filigrane en fond */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-3 -top-2 select-none text-[86px] leading-none opacity-10"
      >
        {m.emoji}
      </span>

      {/* Haut : matière + n°, et badge rare */}
      <div className="relative flex items-start justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full ${m.soft} px-2 py-0.5 text-[11px] font-black ${m.text}`}
        >
          <span className="text-sm leading-none">{m.emoji}</span>
          {labelCourt(mot.matiere)}
        </span>
        {rare ? (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-black text-amber-900">
            <Star className="h-3 w-3 fill-amber-900" />
            RARE
          </span>
        ) : (
          <span className="text-[11px] font-black text-slate-300">#{n}</span>
        )}
      </div>

      {/* Cœur : la consigne + l'indice */}
      <div className="relative my-2 flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{consigne}</p>
        <p className="mt-1.5 text-[14px] font-bold leading-snug text-slate-800 print:text-[12px]">
          {trad ? (
            <>
              «&nbsp;{mot.indice}&nbsp;»{" "}
              <span className="text-slate-400">en {mot.lang === "en" ? "anglais" : "espagnol"}</span>
            </>
          ) : (
            mot.indice
          )}
        </p>
      </div>

      {/* Réponse à l'envers + Ti Margo */}
      <div className="relative mt-1 flex items-end justify-between border-t border-dashed border-slate-200 pt-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={TI_MARGO} alt="" className="h-5 w-5 shrink-0 rotate-180 object-contain opacity-70" />
        <p className="rotate-180 text-center text-[11px] font-black text-slate-400">
          réponse&nbsp;: {mot.mot}
        </p>
      </div>
    </article>
  );
}

/* Une page A4 = 8 cartes (2 × 4), un arc-en-ciel de matières */
function PageCartes({ cartes, depart, titre }: { cartes: DicteeMot[]; depart: number; titre: string }) {
  return (
    <section className="carte-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 print:mt-0 print:rounded-none print:border-0 print:p-3 print:shadow-none">
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-black text-slate-900">🃏 {titre}</h2>
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
          <Scissors className="h-3.5 w-3.5" />
          Découpe le long des bords
        </span>
      </header>
      <div className="carte-grid mt-4 grid grid-cols-2 gap-3 print:mt-3 print:gap-2">
        {cartes.map((mot, i) => (
          <Carte key={`${mot.matiere}-${mot.mot}`} mot={mot} n={depart + i} />
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page complète (garde + règles + 4 pages de cartes)                        */
/* -------------------------------------------------------------------------- */

export default function QuiSuisJeClient() {
  const deck = construireDeck();
  const pages = [0, 8, 16, 24]; // 4 pages de 8 cartes

  return (
    <main className="relative isolate min-h-screen bg-[#f8f6ff] text-slate-800">
      {/* Barre d'actions (écran) */}
      <div className="screen-only border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link
            href="/accueil"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-400"
          >
            <Download className="h-4 w-4" />
            Imprimer / PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        {/* ================= PAGE DE GARDE + RÈGLES (imprimée) ================= */}
        <section className="carte-page garde-page overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/40 print:rounded-none print:border-0 print:shadow-none">
          <div className="flex items-center justify-between gap-3 text-[11px] font-bold text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="text-sm font-black text-violet-600">eleveai.fr</span>
              <span className="text-slate-300">—</span>
              Plusieurs portes pour apprendre
            </span>
            <span className="hidden font-bold text-violet-600 sm:inline">
              eleveai.fr/qui-suis-je-a-imprimer
            </span>
          </div>

          <div className="mt-6 flex flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={TI_MARGO} alt="Ti Margo, la mascotte d'EleveAI" className="h-24 w-24 object-contain" />
            <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-violet-700">
              <Sparkles className="h-4 w-4" />
              Jeu de 32 cartes · Toutes matières
            </p>
            <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-900 print:text-4xl">
              Qui suis-je&nbsp;?
            </h1>
            <p className="mt-2 text-lg font-bold text-slate-500">
              32 cartes à imprimer pour réviser 11 matières en jouant
            </p>
          </div>

          {/* Règle du jeu (imprimée avec le jeu) */}
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/50 p-6">
            <h2 className="text-center text-lg font-black text-violet-800">📜 La règle du jeu</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <li>
                <span className="font-black text-violet-700">1. Découpe & mélange.</span> Imprime les 4
                pages, découpe les 32 cartes le long des bords, et mélange le paquet.
              </li>
              <li>
                <span className="font-black text-violet-700">2. On lit, on devine.</span> Un meneur pioche
                une carte et lit la question à voix haute — «&nbsp;Qui suis-je&nbsp;?&nbsp;». Le premier
                qui trouve le mot juste gagne la carte&nbsp;!
              </li>
              <li>
                <span className="font-black text-violet-700">3. Tout seul&nbsp;?</span> Tu réponds, puis tu{" "}
                <span className="font-bold">retournes la carte</span> pour vérifier — la réponse est
                imprimée à l&apos;envers, en bas.
              </li>
              <li>
                <span className="font-black text-violet-700">4. Les cartes rares ⭐.</span> Les mots les
                plus costauds sont des cartes <span className="font-bold text-amber-600">RARES</span>
                &nbsp;: elles valent <span className="font-bold">double&nbsp;!</span>
              </li>
              <li>
                <span className="font-black text-violet-700">5. Qui gagne&nbsp;?</span> Après tout le
                paquet, celui qui a le plus de cartes remporte la partie. 🏆
              </li>
            </ol>
          </div>

          {/* Les 11 matières + QR */}
          <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-400">
                Les 11 matières du paquet
              </p>
              <div className="flex flex-wrap gap-2">
                {MATIERES.map((mat) => {
                  const m = MAT[mat] ?? MAT_DEFAUT;
                  return (
                    <span
                      key={mat}
                      className={`inline-flex items-center gap-1 rounded-full ${m.soft} px-2.5 py-1 text-xs font-black ${m.text}`}
                    >
                      <span className="text-sm leading-none">{m.emoji}</span>
                      {labelCourt(mat)}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4">
              <QRCodeSVG value={SIGNUP_URL} size={92} />
              <p className="max-w-[9rem] text-center text-[11px] font-bold leading-4 text-slate-500">
                Prolonge le jeu en ligne sur eleveai.fr
              </p>
            </div>
          </div>
        </section>

        {/* ================= 4 PAGES DE CARTES ================= */}
        {pages.map((depart, idx) => (
          <PageCartes
            key={depart}
            cartes={deck.slice(depart, depart + 8)}
            depart={depart + 1}
            titre={`Cartes ${depart + 1} à ${depart + 8} · paquet ${idx + 1}/4`}
          />
        ))}
      </article>

      {/* Styles d'impression : chaque section = une page A4 */}
      <style jsx global>{`
        @media screen {
          .carte-grid .carte {
            min-height: 188px;
          }
        }

        @media print {
          @page {
            size: A4;
            margin: 8mm;
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

          .carte-page {
            break-after: page;
            page-break-after: always;
          }
          .carte-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }

          .garde-page {
            padding: 6mm !important;
          }

          .carte-grid {
            grid-template-rows: repeat(4, 1fr);
            height: 262mm;
          }
          .carte-grid .carte {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </main>
  );
}
