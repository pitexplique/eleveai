"use client";

import { Fragment } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Download, Scissors, Sparkles, Star } from "lucide-react";

const SIGNUP_URL = "https://eleveai.fr/auth/signin?from=cartes";
const TI_MARGO = "/cahier-vacances/ti-margo.png";

/* Une carte-question prête à afficher (préparée côté serveur). */
export type CarteQ = {
  matiere: string; // slug, ex "maths"
  matiereLabel: string; // ex "Maths"
  question: string; // la définition (« Qui suis-je ? »)
  answer: string; // le mot à retrouver
  rare: boolean;
  ref: string; // ex "6E·07"
};

/* Habillage par matière : couleur vive + gros emoji (classes Tailwind en entier). */
type MatMeta = { emoji: string; ring: string; text: string; soft: string };
const MAT: Record<string, MatMeta> = {
  maths: { emoji: "📐", ring: "border-violet-300", text: "text-violet-700", soft: "bg-violet-50" },
  francais: { emoji: "✍️", ring: "border-sky-300", text: "text-sky-700", soft: "bg-sky-50" },
  anglais: { emoji: "🇬🇧", ring: "border-blue-300", text: "text-blue-700", soft: "bg-blue-50" },
  espagnol: { emoji: "🇪🇸", ring: "border-red-300", text: "text-red-700", soft: "bg-red-50" },
  histoire: { emoji: "📜", ring: "border-amber-300", text: "text-amber-800", soft: "bg-amber-50" },
  geographie: { emoji: "🗺️", ring: "border-teal-300", text: "text-teal-700", soft: "bg-teal-50" },
  "histoire-geo": { emoji: "🗺️", ring: "border-amber-300", text: "text-amber-800", soft: "bg-amber-50" },
  sciences: { emoji: "🔬", ring: "border-emerald-300", text: "text-emerald-700", soft: "bg-emerald-50" },
};
const MAT_DEFAUT: MatMeta = { emoji: "⭐", ring: "border-slate-300", text: "text-slate-700", soft: "bg-slate-50" };

type Slot = { kind: "garde" } | { kind: "fin" } | { kind: "question"; carte: CarteQ };

function construireSlots(cartes: CarteQ[]): Slot[] {
  return [
    { kind: "garde" },
    ...cartes.map((carte): Slot => ({ kind: "question", carte })),
    { kind: "fin" },
  ];
}

/* Aligne les dos derrière leur recto (retournement « bord long ») : on échange
   les 2 colonnes de chaque rangée. */
function alignerVerso(slots: Slot[]): Slot[] {
  const out = [...slots];
  for (let i = 0; i + 1 < out.length; i += 2) {
    [out[i], out[i + 1]] = [out[i + 1], out[i]];
  }
  return out;
}

/* -------------------------------------------------------------------------- */
/*  Cartes                                                                    */
/* -------------------------------------------------------------------------- */

function Carte({ carte }: { carte: CarteQ }) {
  const m = MAT[carte.matiere] ?? MAT_DEFAUT;
  return (
    <article
      className={`carte relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 p-3 print:rounded-none ${
        carte.rare ? "border-amber-400 bg-amber-50/50" : `${m.ring} bg-white`
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-3 -top-2 select-none text-[86px] leading-none opacity-10"
      >
        {m.emoji}
      </span>

      <div className="relative flex items-start justify-between gap-2">
        <span className={`inline-flex items-center gap-1 rounded-full ${m.soft} px-2 py-0.5 text-[11px] font-black ${m.text}`}>
          <span className="text-sm leading-none">{m.emoji}</span>
          {carte.matiereLabel}
        </span>
        <span className="flex items-center gap-1">
          {carte.rare && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-black text-amber-900">
              <Star className="h-3 w-3 fill-amber-900" />
              RARE
            </span>
          )}
          <span className="rounded border border-slate-400 px-1.5 py-0.5 text-[10px] font-black tabular-nums text-slate-500">
            {carte.ref}
          </span>
        </span>
      </div>

      <div className="relative my-2 flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Qui suis-je&nbsp;?</p>
        <p className="mt-1.5 text-[14px] font-bold leading-snug text-slate-800 print:text-[12px]">
          {carte.question}
        </p>
      </div>

      <div className="relative mt-1 border-t border-dashed border-slate-200 pt-1">
        <div className="flex items-end justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={TI_MARGO} alt="" className="h-4 w-4 shrink-0 rotate-180 object-contain opacity-70" />
          <p className="rotate-180 text-center text-[11px] font-black text-slate-400">réponse&nbsp;: {carte.answer}</p>
        </div>
        <p className="mt-0.5 text-center text-[7px] font-black uppercase tracking-wide text-slate-300">
          eleveai.fr · une autre façon d&apos;apprendre
        </p>
      </div>
    </article>
  );
}

function CarteGarde({ label }: { label: string }) {
  return (
    <article className="carte relative flex flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl border-2 border-violet-400 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-3 text-center print:rounded-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={TI_MARGO} alt="Ti Margo" className="h-14 w-14 object-contain" />
      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-violet-500">Qui suis-je ? · {label}</p>
      <h3 className="text-2xl font-black leading-none text-slate-900">Qui suis-je&nbsp;?</h3>
      <p className="text-[10px] font-bold text-slate-500">On lit la définition, tu trouves le mot&nbsp;!</p>
      <p className="mt-1 text-[8px] font-black uppercase tracking-wide text-slate-400">
        eleveai.fr · une autre façon d&apos;apprendre
      </p>
    </article>
  );
}

function CarteFin() {
  return (
    <article className="carte relative flex flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl border-2 border-teal-400 bg-gradient-to-br from-teal-50 to-emerald-50 p-3 text-center print:rounded-none">
      <p className="text-2xl leading-none">🏆</p>
      <h3 className="text-lg font-black text-slate-900">Bravo&nbsp;!</h3>
      <p className="text-[9px] font-bold leading-snug text-slate-600">
        Inscris-toi sur eleveai.fr pour suivre tes progrès et relever des défis&nbsp;🎯
      </p>
      <QRCodeSVG value={SIGNUP_URL} size={54} />
      <p className="text-[11px] font-black text-teal-700">eleveai.fr</p>
    </article>
  );
}

/* Dos de carte : SOBRE, sans aplat (imprimante N&B / salle des profs).
   Porte la RÉFÉRENCE de sa carte → les élèves peuvent les échanger. */
function DosCarte({ slot }: { slot: Slot }) {
  const ref = slot.kind === "question" ? slot.carte.ref : null;
  return (
    <article className="carte flex flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-slate-800 bg-white p-3 text-center print:rounded-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={TI_MARGO} alt="" className="h-10 w-10 object-contain grayscale" />
      <p className="text-lg font-black leading-none text-slate-900">Qui suis-je&nbsp;?</p>
      {ref ? (
        <p className="rounded border-2 border-slate-800 px-2 py-0.5 text-sm font-black tabular-nums text-slate-900">{ref}</p>
      ) : (
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {slot.kind === "garde" ? "Carte de garde" : "Carte de fin"}
        </p>
      )}
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">eleveai.fr</p>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pages                                                                     */
/* -------------------------------------------------------------------------- */

function PageCartes({ slots, label, titre }: { slots: Slot[]; label: string; titre: string }) {
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
        {slots.map((slot, i) =>
          slot.kind === "garde" ? (
            <CarteGarde key={i} label={label} />
          ) : slot.kind === "fin" ? (
            <CarteFin key={i} />
          ) : (
            <Carte key={i} carte={slot.carte} />
          )
        )}
      </div>
    </section>
  );
}

function PageVerso({ slots }: { slots: Slot[] }) {
  return (
    <section className="carte-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 print:mt-0 print:rounded-none print:border-0 print:p-3 print:shadow-none">
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-black text-slate-900">🔁 Dos des cartes</h2>
        <span className="text-[11px] font-bold text-slate-400">
          Recto-verso&nbsp;: au dos des cartes (retourner sur le bord long)
        </span>
      </header>
      <div className="carte-grid mt-4 grid grid-cols-2 gap-3 print:mt-3 print:gap-2">
        {alignerVerso(slots).map((slot, i) => (
          <DosCarte key={i} slot={slot} />
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Deck complet                                                              */
/* -------------------------------------------------------------------------- */

export default function DeckNiveauClient({
  label,
  cartes,
}: {
  label: string;
  cartes: CarteQ[];
}) {
  const slots = construireSlots(cartes);
  const matieres = [...new Set(cartes.map((c) => c.matiere))];
  const departs: number[] = [];
  for (let i = 0; i < slots.length; i += 8) departs.push(i);

  return (
    <main className="relative isolate min-h-screen bg-[#f8f6ff] text-slate-800">
      <div className="screen-only border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link
            href="/qui-suis-je-a-imprimer"
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
        {/* Couverture */}
        <section className="carte-page couverture-page flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-8 text-center shadow-xl shadow-slate-300/40 print:rounded-none print:border-0 print:shadow-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={TI_MARGO} alt="Ti Margo" className="h-28 w-28 object-contain" />
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-violet-700">
            <Sparkles className="h-4 w-4" />
            Jeu de cartes · {label}
          </p>
          <h1 className="mt-3 text-6xl font-black tracking-tight text-slate-900 print:text-5xl">Qui suis-je&nbsp;?</h1>
          <p className="mt-2 max-w-md text-base font-bold text-slate-500">
            {cartes.length} cartes de {label} à imprimer, découper et jouer en famille.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {matieres.map((mt) => {
              const meta = MAT[mt] ?? MAT_DEFAUT;
              const l = cartes.find((c) => c.matiere === mt)?.matiereLabel ?? mt;
              return (
                <span key={mt} className={`inline-flex items-center gap-1 rounded-full ${meta.soft} px-2.5 py-1 text-xs font-black ${meta.text}`}>
                  <span className="text-sm leading-none">{meta.emoji}</span>
                  {l}
                </span>
              );
            })}
          </div>
          <div className="mt-5 flex flex-col items-center gap-2">
            <QRCodeSVG value={SIGNUP_URL} size={84} />
            <p className="text-sm font-black text-teal-700">eleveai.fr</p>
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">une autre façon d&apos;apprendre</p>
          </div>
        </section>

        {/* Règles */}
        <section className="carte-page garde-page overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/40 print:rounded-none print:border-0 print:shadow-none">
          <div className="flex items-center justify-between gap-3 text-[11px] font-bold text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="text-sm font-black text-violet-600">eleveai.fr</span>
              <span className="text-slate-300">—</span>
              Plusieurs portes pour apprendre
            </span>
          </div>
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/50 p-6">
            <h2 className="text-center text-lg font-black text-violet-800">📜 La règle du jeu</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <li>
                <span className="font-black text-violet-700">1. Découpe &amp; mélange.</span> Imprime les pages, découpe les cartes, mélange le paquet (le dos peut s&apos;imprimer au verso).
              </li>
              <li>
                <span className="font-black text-violet-700">2. On lit, on devine.</span> Un meneur lit «&nbsp;Qui suis-je&nbsp;?&nbsp;» ; le premier qui trouve le mot gagne la carte.
              </li>
              <li>
                <span className="font-black text-violet-700">3. Tout seul&nbsp;?</span> Réponds, puis retourne la carte pour vérifier (réponse à l&apos;envers, en bas).
              </li>
              <li>
                <span className="font-black text-violet-700">4. Les cartes rares ⭐</span> valent double, et chaque carte a une <span className="font-bold">référence {`${label}`}</span> pour les échanger&nbsp;!
              </li>
            </ol>
          </div>
        </section>

        {/* Cartes + versos */}
        {departs.map((depart, idx) => {
          const front = slots.slice(depart, depart + 8);
          return (
            <Fragment key={depart}>
              <PageCartes slots={front} label={label} titre={`À découper · paquet ${idx + 1}/${departs.length}`} />
              <PageVerso slots={front} />
            </Fragment>
          );
        })}
      </article>

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
          .couverture-page {
            min-height: 262mm;
            padding: 12mm !important;
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
