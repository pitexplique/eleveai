"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  Download,
  Hand,
  Heart,
  Pencil,
  Printer,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import type { CahierConfig } from "./types";
import type { Activite, CahierDataPetit, JourPetit } from "./petits-types";
import CaptureApresTelechargement from "./CaptureApresTelechargement";
import EncartDon from "@/components/EncartDon";
import { bougeDuJour } from "@/lib/cahier/bougeDuJour";

/* URL d'inscription encodée dans le QR de la couverture. ?from=cahier = tracking. */
const SIGNUP_URL = "https://eleveai.fr/auth/signin?from=cahier";

/* Barème de points — un cahier « petits » reste simple (sur 10). */
const baremePoints = [
  { label: "Maths", pts: "3 pts", color: "text-sky-600" },
  { label: "Français", pts: "3 pts", color: "text-violet-600" },
  { label: "Mot", pts: "1 pt", color: "text-teal-600" },
  { label: "Geste", pts: "1 pt", color: "text-emerald-600" },
  { label: "Bouge", pts: "1 pt", color: "text-orange-500" },
  { label: "Défi", pts: "2 pts", color: "text-orange-500" },
];

/* -------------------------------------------------------------------------- */
/*  Illustration (emoji ↔ image future) — repérable via data-illustration.    */
/* -------------------------------------------------------------------------- */
function Illu({
  emoji,
  label,
  className = "h-14 w-14 text-3xl",
  src,
}: {
  emoji: string;
  label: string;
  className?: string;
  src?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={label}
        data-illustration={label}
        className={`inline-block shrink-0 object-contain ${className}`}
      />
    );
  }
  return (
    <span
      role="img"
      aria-label={label}
      data-illustration={label}
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-white/70 ${className}`}
    >
      {emoji}
    </span>
  );
}

/** Petite case d'écriture (l'enfant écrit le résultat). */
function Case({ w = "w-12" }: { w?: string }) {
  return (
    <span
      className={`inline-block ${w} rounded-md border-2 border-dashed border-slate-300 align-middle`}
      style={{ height: "1.6em" }}
    />
  );
}

/** Ligne de consigne parente (lue à voix haute). */
function ConsigneParent({ texte }: { texte: string }) {
  return (
    <p className="text-xs font-bold leading-5 text-slate-500">
      <span className="text-slate-400">🗣️ Parent —</span> {texte}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*  Rendu d'une activité (selon son `kind`).                                   */
/* -------------------------------------------------------------------------- */
function ActiviteView({ a }: { a: Activite }) {
  return (
    <div className="rounded-xl border border-white bg-white/70 p-3">
      <ConsigneParent texte={a.consigne} />
      <div className="mt-2">
        {a.kind === "compter" && (
          <div className="flex flex-wrap items-center gap-1.5">
            {Array.from({ length: a.n }).map((_, i) => (
              <span key={i} className="text-2xl leading-none">
                {a.emoji}
              </span>
            ))}
            <span className="ml-1 text-lg font-black text-slate-400">=</span>
            <Case />
          </div>
        )}

        {a.kind === "calcul" && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-base font-bold text-slate-800 sm:grid-cols-3">
            {a.ops.map((o) => (
              <span key={o.q} className="flex items-center gap-1.5">
                <span className="font-mono">{o.q} =</span>
                <Case w="w-10" />
              </span>
            ))}
          </div>
        )}

        {a.kind === "tracer" && (
          <p
            className="select-none text-3xl font-black tracking-[0.25em] text-slate-200"
            style={{ WebkitTextStroke: "1px #cbd5e1" }}
          >
            {a.modele}
          </p>
        )}

        {a.kind === "entoure" && (
          <div className="flex flex-wrap gap-2">
            {a.items.map((it, i) => (
              <span
                key={`${it.label}-${i}`}
                className="rounded-full border-2 border-slate-300 px-3 py-1.5 text-base font-bold text-slate-800"
              >
                {it.label}
              </span>
            ))}
          </div>
        )}

        {a.kind === "relier" && (
          <div className="flex justify-between gap-8 px-2">
            <ul className="grid gap-2 text-base font-bold text-slate-800">
              {a.paires.map((p) => (
                <li key={`g-${p.g}`} className="flex items-center gap-2">
                  {p.g} <span className="text-slate-400">•</span>
                </li>
              ))}
            </ul>
            <ul className="grid gap-2 text-base font-bold text-slate-800">
              {/* colonne droite inversée : l'enfant doit chercher l'association */}
              {[...a.paires].reverse().map((p) => (
                <li key={`d-${p.d}`} className="flex items-center gap-2">
                  <span className="text-slate-400">•</span> {p.d}
                </li>
              ))}
            </ul>
          </div>
        )}

        {a.kind === "son" && (
          <div>
            <p className="mb-2 text-sm font-black text-violet-700">
              Le son{" "}
              <span className="rounded-md bg-violet-100 px-2 py-0.5">
                [{a.son}]
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              {a.images.map((im, i) => (
                <span
                  key={`${im.mot}-${i}`}
                  className="flex w-16 flex-col items-center gap-1 rounded-xl border-2 border-slate-200 p-1.5"
                >
                  <span className="text-2xl">{im.emoji}</span>
                  <span className="text-[10px] font-bold text-slate-500">
                    {im.mot}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        {a.kind === "suite" && (
          <div className="flex flex-wrap items-center gap-2">
            {a.debut.map((e, i) => (
              <span key={`d-${i}`} className="text-2xl leading-none">
                {e}
              </span>
            ))}
            {a.reponse.map((_, i) => (
              <span
                key={`r-${i}`}
                className="inline-block w-9 rounded-md border-2 border-dashed border-slate-300 align-middle"
                style={{ height: "1.6em" }}
              />
            ))}
          </div>
        )}

        {a.kind === "lecture" && (
          <div>
            <p className="rounded-xl border-2 border-violet-100 bg-white px-3 py-2 text-base font-semibold leading-7 text-slate-800">
              {a.texte}
            </p>
            {a.question && (
              <div className="mt-2">
                <p className="text-sm font-bold text-slate-700">{a.question}</p>
                <div className="mt-1 h-6 border-b border-dashed border-slate-300" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Corrigés — dérivés des activités.                                          */
/* -------------------------------------------------------------------------- */
function corrigeActivite(a: Activite): string | null {
  switch (a.kind) {
    case "compter":
      return `Compter les ${a.emoji} → ${a.n}`;
    case "calcul":
      return a.ops.map((o) => `${o.q} = ${o.r}`).join(" · ");
    case "entoure": {
      const bons = a.items.filter((it) => it.bon).map((it) => it.label);
      return bons.length ? `Entourer : ${bons.join(", ")}` : null;
    }
    case "relier":
      return a.paires.map((p) => `${p.g} → ${p.d}`).join(" · ");
    case "son": {
      const bons = a.images.filter((im) => im.bon).map((im) => im.mot);
      return bons.length ? `Images avec [${a.son}] : ${bons.join(", ")}` : null;
    }
    case "lecture":
      return a.question && a.reponse ? a.reponse : null;
    case "suite":
      return `Suite : ${a.debut.join(" ")} → ${a.reponse.join(" ")}`;
    case "tracer":
      return null;
  }
}

/* Habillage de la rubrique « Le monde de Ti Margo » selon son thème du jour. */
const themesMonde = {
  histoire: { emoji: "📜", label: "Avant", border: "border-amber-200", bg: "bg-amber-50/60", title: "text-amber-700" },
  ecologie: { emoji: "🌱", label: "La nature", border: "border-green-200", bg: "bg-green-50/60", title: "text-green-700" },
  futur: { emoji: "🚀", label: "Demain", border: "border-indigo-200", bg: "bg-indigo-50/60", title: "text-indigo-700" },
} as const;

/* -------------------------------------------------------------------------- */
/*  Moteur d'affichage des cahiers « petits ».                                 */
/* -------------------------------------------------------------------------- */
export default function CahierPetits({
  data,
  config,
}: {
  data: CahierDataPetit;
  config: CahierConfig;
}) {
  const { jours, parcours, defisExpert, carnet, leSaviasTu, mondeDemain } = data;
  const semaines = Array.from(new Set(jours.map((j) => j.semaine)));

  const mathsDe = (j: JourPetit) => j.activites.filter((a) => a.bloc === "maths");
  const fraDe = (j: JourPetit) => j.activites.filter((a) => a.bloc === "francais");

  return (
    <main className="relative isolate min-h-screen bg-[#fff7ed] text-slate-800">
      <CaptureApresTelechargement
        coachHref={`/coach-ia/maths?classe=${config.coachClasse}&from=cahier`}
      />
      {/* Barre d'actions (écran) */}
      <div className="screen-only border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link
            href="/cahier-vacances"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-400"
          >
            <Download className="h-4 w-4" />
            Imprimer / PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        {/* ================= PAGE DE GARDE ================= */}
        <section className="cahier-page garde-page overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/40 print:rounded-none print:border-0 print:shadow-none">
          <div className="flex items-center justify-between gap-3 text-[11px] font-bold text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="font-black text-orange-600">EleveAI</span>
              <span className="text-slate-300">—</span>
              Plusieurs portes pour apprendre
            </span>
            <span className="hidden sm:inline">
              eleveai.fr/cahier-vacances/{config.slug}
            </span>
          </div>

          <div className="relative mt-8 text-center">
            <span className="pointer-events-none absolute -left-2 top-2 -rotate-12 text-2xl">
              ✏️
            </span>
            <span className="pointer-events-none absolute right-0 top-6 rotate-6 text-2xl">
              🌺
            </span>

            <p className="text-2xl font-black uppercase tracking-[0.2em] text-slate-700 sm:text-3xl">
              Cahier de vacances
            </p>
            <div className="mt-2 flex items-center justify-center gap-4">
              <h1 className="text-6xl font-black tracking-tight text-slate-900 print:text-5xl">
                {config.titre}
              </h1>
              <Illu
                emoji="🦎"
                label="Ti Margo"
                src="/cahier-vacances/ti-margo-cahier-sac-a-dos.png"
                className="h-24 w-24"
              />
            </div>
            <p className="mt-4 text-xl font-black">
              <span className="text-sky-600">Compter</span>
              <span className="text-slate-300"> · </span>
              <span className="text-rose-500">Lire</span>
              <span className="text-slate-300"> · </span>
              <span className="text-violet-600">Écrire</span>
              <span className="text-slate-300"> · </span>
              <span className="text-amber-500">Jouer</span>
            </p>
            <p className="mt-2 text-base font-bold text-slate-500">
              {config.sousTitre}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-black text-rose-700">
                🌺 100&nbsp;% Réunion
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                ✅ Conforme aux programmes
              </span>
            </div>
            <p className="mt-2 text-sm font-bold italic text-slate-500">
              Conçu à La Réunion par un professeur, pour ses élèves.
            </p>
            <p className="mt-1 text-base font-black text-teal-600">
              « Nou la fé&nbsp;! » 🌺
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-lg font-black text-white shadow-lg shadow-orange-500/30">
              <Sparkles className="h-5 w-5" />
              {config.mission}
            </div>
          </div>

          {/* Parcours en étapes */}
          <div className="mt-7 rounded-2xl border border-orange-200 bg-orange-50/60 p-4">
            <p className="text-center text-sm font-black text-orange-700">
              {config.parcoursTitre}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-xs font-bold text-slate-600">
              {parcours.map((e) => (
                <span key={e.etape} className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 shadow-sm">
                    <span className="text-sm">{e.emoji}</span>
                    {e.lieu}
                  </span>
                  <span className="text-orange-400">→</span>
                </span>
              ))}
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 font-black text-white">
                {config.chipFin}
              </span>
            </div>
          </div>

          {/* À qui appartient ce cahier — + QR « continuer gratuitement » (parents).
             Placé sur la couverture = la page la plus vue/partagée. Légende à gauche
             du QR pour ne pas rallonger la garde. Impression libre, aucun mur. */}
          <div className="mx-auto mt-7 flex max-w-lg items-center gap-4 rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/40 p-4">
            <div className="flex-1">
              <p className="text-sm font-black uppercase tracking-wide text-orange-600">
                Ce cahier est à
              </p>
              <div className="mt-5 border-b-2 border-dotted border-slate-300" />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <p className="max-w-[84px] text-right text-[10px] font-black leading-tight text-slate-600">
                Parents, scannez pour continuer{" "}
                <span className="text-teal-600">gratuitement</span>
              </p>
              <div className="inline-block rounded-lg border border-slate-200 bg-white p-1">
                <QRCodeSVG value={SIGNUP_URL} size={52} level="M" marginSize={1} />
              </div>
            </div>
          </div>

          {/* Mode d'emploi parent + solidaire */}
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
              <h2 className="flex items-center gap-2 text-base font-black text-slate-900">
                <Hand className="h-5 w-5 text-sky-500" />
                Pour les parents
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Une page par jour, à faire <strong>avec</strong> votre enfant.
                Vous lisez les consignes <span className="font-bold">🗣️</span> à
                voix haute ; l&apos;enfant compte, entoure, trace et colorie. Les
                corrigés sont à la fin.
              </p>
            </div>
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
              <h2 className="flex items-center gap-2 text-base font-black text-slate-900">
                <Heart className="h-4 w-4 text-orange-500" />
                Un cahier solidaire
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                En utilisant ce cahier, vous participez à offrir l&apos;accès à
                EleveAI à un enfant qui n&apos;en a pas les moyens. Merci&nbsp;!
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <span className="flex items-center gap-2 text-base font-black text-slate-800">
              <Award className="h-6 w-6 text-amber-500" />
              Gagne des étoiles et des badges !
            </span>
            <span className="flex gap-2 text-2xl">⭐ 🌟 👑</span>
          </div>

          <p className="mt-7 text-center text-lg font-black italic text-orange-600">
            Chaque jour, un petit pas avec Ti Margo&nbsp;! 🦎
          </p>
        </section>

        {/* ================= PAGES JOURS ================= */}
        {semaines.map((sem) =>
          jours
            .filter((j) => j.semaine === sem)
            .map((jour) => {
              const etape = parcours.find((e) => e.semaine === jour.semaine);
              const maths = mathsDe(jour);
              const fra = fraDe(jour);
              return (
                <section
                  key={jour.numero}
                  className="cahier-page jour-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:mt-0 print:rounded-none print:border-0 print:p-4 print:shadow-none"
                >
                  <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide">
                      <span className="rounded-md bg-sky-500 px-3 py-1 text-white">
                        Semaine {jour.semaine}
                      </span>
                      <span className="rounded-md bg-orange-500 px-3 py-1 text-white">
                        Jour {jour.numero}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm font-bold italic text-slate-400">
                      eleveai.fr · {config.titre}
                      <Star className="h-4 w-4 fill-amber-300 text-amber-400" />
                    </span>
                  </header>

                  {etape && (
                    <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700">
                      <span className="text-sm">{etape.emoji}</span>
                      <span>
                        Étape {etape.etape} · {etape.lieu}
                      </span>
                    </div>
                  )}

                  {/* Le carnet de Ti Margo (le parent lit) */}
                  {carnet[jour.numero] && (
                    <p className="mt-2 text-sm italic leading-6 text-slate-600">
                      <span className="font-black not-italic text-orange-700">
                        📖 Ti Margo te raconte —{" "}
                      </span>
                      {carnet[jour.numero]}
                    </p>
                  )}

                  {/* Le savais-tu ? */}
                  {leSaviasTu[jour.numero] && (
                    <p
                      className={`mt-2 rounded-lg px-3 py-1.5 text-xs leading-5 ${
                        leSaviasTu[jour.numero].portee === "local"
                          ? "bg-emerald-50 text-emerald-900"
                          : "bg-sky-50 text-sky-900"
                      }`}
                    >
                      <span className="font-black">
                        {leSaviasTu[jour.numero].portee === "local"
                          ? "🌺 Le savais-tu ? (La Réunion) — "
                          : "🌍 Le savais-tu ? — "}
                      </span>
                      {leSaviasTu[jour.numero].texte}
                    </p>
                  )}

                  {/* Bouge du jour — défi-corps (banque partagée). Le parent lit,
                     l'enfant bouge : anti-écran, esprit « nager, coder, bâtir ». */}
                  <p className="mt-2 rounded-lg bg-orange-50 px-3 py-1.5 text-xs leading-5 text-orange-900 print:mt-1.5 print:py-1 print:text-[11px] print:leading-4">
                    <span className="font-black">🤸 Bouge du jour — </span>
                    {bougeDuJour(jour.numero)}
                  </p>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_14rem] print:grid-cols-[1fr_13rem]">
                    {/* ---------- Colonne principale ---------- */}
                    <div className="grid gap-4">
                      {/* Maths */}
                      {maths.length > 0 && (
                        <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-4">
                          <h2 className="flex items-center gap-2 text-lg font-black text-sky-700">
                            🔢 Les maths
                          </h2>
                          <div className="mt-3 grid gap-3">
                            {maths.map((a, i) => (
                              <ActiviteView key={i} a={a} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Français */}
                      {fra.length > 0 && (
                        <div className="rounded-2xl border border-violet-200 bg-violet-50/60 p-4">
                          <h2 className="flex items-center gap-2 text-lg font-black text-violet-700">
                            📚 Le français
                          </h2>
                          <div className="mt-3 grid gap-3">
                            {fra.map((a, i) => (
                              <ActiviteView key={i} a={a} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Mot illustré + geste */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50/60 p-4">
                          <Illu
                            emoji={jour.mot.emoji}
                            label={jour.mot.mot}
                            className="h-14 w-14 text-3xl"
                          />
                          <div>
                            <h2 className="flex items-center gap-1.5 text-sm font-black text-teal-700">
                              <BookOpen className="h-4 w-4" />
                              Le mot du jour
                            </h2>
                            <p className="mt-0.5 text-base font-black text-teal-800">
                              {jour.mot.mot}
                            </p>
                            <p className="text-xs italic leading-5 text-slate-500">
                              {jour.mot.phrase}
                            </p>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                          <h2 className="flex items-center gap-1.5 text-sm font-black text-emerald-700">
                            🖱️ Le geste du jour
                          </h2>
                          <p className="mt-1 text-sm font-bold text-emerald-700">
                            {jour.geste.titre}
                          </p>
                          <p className="text-sm leading-6 text-slate-700">
                            {jour.geste.texte}
                          </p>
                        </div>
                      </div>

                      {/* Défi du jour */}
                      <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-4">
                        <h2 className="flex items-center gap-2 text-base font-black text-orange-600">
                          <Target className="h-5 w-5" />
                          Le défi du jour
                        </h2>
                        <ConsigneParent texte={jour.defi.consigne} />
                        <div className="mt-2 h-7 border-b border-dashed border-slate-300" />
                      </div>
                    </div>

                    {/* ---------- Colonne latérale ---------- */}
                    <aside className="grid content-start gap-4">
                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center">
                        <p className="text-xs font-black uppercase tracking-wide text-amber-600">
                          Badge du jour
                        </p>
                        <Illu
                          emoji="🏅"
                          label={`badge ${jour.badge}`}
                          className="mx-auto mt-2 h-14 w-14 text-3xl"
                        />
                        <p className="mt-2 text-sm font-black uppercase leading-tight text-slate-800">
                          {jour.badge}
                        </p>
                      </div>

                      <div className="overflow-hidden rounded-2xl border border-slate-200">
                        <p className="bg-orange-600 px-4 py-2 text-center text-xs font-black uppercase tracking-wide text-white">
                          Mes étoiles
                        </p>
                        <ul className="grid grid-cols-2 gap-x-3 gap-y-1 bg-white px-3 py-2.5">
                          {baremePoints.map((p) => (
                            <li
                              key={p.label}
                              className="flex items-center justify-between gap-1.5 text-[11px] leading-tight"
                            >
                              <span className={`font-bold ${p.color}`}>
                                {p.label}
                              </span>
                              <span className="font-black text-slate-900">
                                {p.pts}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between bg-orange-50 px-4 py-2">
                          <span className="text-sm font-black text-orange-700">
                            TOTAL
                          </span>
                          <span className="text-lg font-black text-orange-700">
                            /11
                          </span>
                        </div>
                      </div>

                      {/* Défi ★★★★★ (pour les champions) */}
                      {defisExpert[jour.numero] && (
                        <div className="rounded-2xl border-2 border-indigo-300 bg-indigo-50/60 p-3">
                          <h2 className="flex items-center gap-1.5 text-sm font-black text-indigo-700">
                            <Star className="h-4 w-4 fill-indigo-400 text-indigo-500" />
                            Défi ★★★★★
                          </h2>
                          <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-500">
                            Pour les champions
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-700">
                            {defisExpert[jour.numero].enonce}
                          </p>
                          <div className="mt-2 h-7 border-b border-dashed border-slate-300" />
                        </div>
                      )}

                      <div className="flex items-center gap-2 rounded-2xl border border-orange-200 bg-white p-2.5 text-left">
                        <Illu
                          emoji="🦎"
                          label="Ti Margo"
                          src="/cahier-vacances/ti-margo.png"
                          className="h-12 w-12 shrink-0"
                        />
                        <div>
                          <p className="text-sm font-black text-orange-700">
                            Bravo&nbsp;!
                          </p>
                          <p className="text-xs leading-4 text-slate-600">
                            Continue chaque jour, tu es un champion&nbsp;!
                          </p>
                        </div>
                      </div>
                    </aside>
                  </div>

                  {/* Le monde de Ti Margo — Histoire / Écologie / Futur, lu par
                     le parent (gaté : ne s'affiche que si le cahier le fournit). */}
                  {mondeDemain?.[jour.numero] &&
                    (() => {
                      const md = mondeDemain[jour.numero];
                      const t = themesMonde[md.theme];
                      return (
                        <div className={`mt-4 rounded-2xl border ${t.border} ${t.bg} p-4 print:mt-3`}>
                          <h2 className={`flex items-center gap-2 text-base font-black ${t.title}`}>
                            <span aria-hidden="true">🌍</span>
                            Le monde de Ti Margo — {t.label} {t.emoji}
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-slate-700">
                            <span className="font-black text-orange-700">🗣️ Parent — </span>
                            {md.parent}
                          </p>
                        </div>
                      );
                    })()}

                  {/* Mon dessin du jour */}
                  <div className="mt-4 flex flex-1 flex-col rounded-2xl border-2 border-dashed border-orange-300 bg-white p-3 print:mt-3">
                    <p className="flex flex-wrap items-center gap-x-2 text-sm font-black text-orange-700">
                      <span className="flex items-center gap-1.5">
                        <Pencil className="h-4 w-4" />
                        Mon dessin du jour
                      </span>
                      <span className="text-xs font-normal italic text-slate-500">
                        Dessine ce que tu as préféré aujourd&apos;hui&nbsp;!
                      </span>
                    </p>
                    <div className="mt-2 min-h-[110px] flex-1 print:min-h-[40px]" />
                  </div>

                  <footer className="mt-4 border-t border-slate-200 pt-3 text-center text-sm font-bold text-orange-600">
                    Un petit pas chaque jour, un grand pas pour grandir&nbsp;! 🌱
                  </footer>
                </section>
              );
            })
        )}

        {/* ================= CORRIGÉS ================= */}
        <section className="cahier-page corriges-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:mt-0 print:rounded-none print:border-0 print:p-4 print:shadow-none">
          <header className="border-b border-slate-200 pb-4">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-700">
              Corrigés
            </span>
            <h2 className="mt-3 flex items-center gap-2 text-2xl font-black text-slate-900">
              <CheckCircle2 className="h-6 w-6 text-emerald-500 print:hidden" />
              Les réponses (pour les parents)
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              À regarder ensemble après avoir cherché&nbsp;!
            </p>
          </header>

          <div className="mt-4 grid gap-3">
            {jours.map((jour) => {
              const lignes = jour.activites
                .map(corrigeActivite)
                .filter((x): x is string => Boolean(x));
              return (
                <details
                  key={jour.numero}
                  className="fiche-correction rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <summary className="cursor-pointer text-sm font-black text-slate-900">
                    Jour {jour.numero} — corrigé
                  </summary>
                  <div className="mt-3 grid gap-1.5 text-sm leading-6 text-slate-700">
                    {lignes.map((l, i) => (
                      <p key={i}>• {l}</p>
                    ))}
                    <p>
                      <span className="font-bold text-orange-600">Défi : </span>
                      {jour.defi.correction}
                    </p>
                    {defisExpert[jour.numero] && (
                      <p>
                        <span className="font-bold text-indigo-600">
                          Défi ★★★★★ :{" "}
                        </span>
                        {defisExpert[jour.numero].correction}
                      </p>
                    )}
                  </div>
                </details>
              );
            })}
          </div>

          <div className="screen-only mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-center">
            <p className="text-sm font-bold text-slate-700">
              Envie de continuer en ligne, avec un coach qui s&apos;adapte&nbsp;?
            </p>
            <Link
              href={`/coach-ia/maths?classe=${config.coachClasse}`}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-400"
            >
              <Sparkles className="h-4 w-4" />
              Découvrir le Coach IA
            </Link>
          </div>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500">
            <span>eleveai.fr · Cahier de vacances</span>
            <span>{config.titre}</span>
          </footer>
        </section>
      </article>

      {/* Encart « Participez à l'aventure » — 3 QR (don · coach · journal) pour
          laisser le choix, sans pression. */}
      <div className="mx-auto max-w-4xl px-5 pb-8 sm:px-6">
        <EncartDon coachUrl={`https://eleveai.fr/coach-ia/maths?classe=${config.coachClasse}&from=cahier`} />
      </div>

      {/* Bouton imprimer flottant */}
      <div className="screen-only fixed bottom-5 right-5 hidden sm:block">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-xl shadow-slate-300/50 transition hover:bg-slate-100"
        >
          <Printer className="h-4 w-4" />
          Imprimer / PDF
        </button>
      </div>

      <style jsx global>{`
        .remerciements-bar {
          display: none !important;
        }

        @media print {
          @page {
            size: A4;
            /* haut · droite · bas · gauche — marge gauche élargie pour la
               reliure (perforation / agrafage / spirale) sans rogner le contenu. */
            margin: 6mm 6mm 6mm 16mm;
          }
          .jour-page {
            padding: 0 !important;
            font-size: 12px;
            line-height: 1.35;
            display: flex !important;
            flex-direction: column !important;
            min-height: 281mm !important;
            box-sizing: border-box !important;
          }
          .jour-page header {
            padding-bottom: 4px !important;
          }
          .jour-page .rounded-2xl {
            padding: 6px !important;
          }
          .jour-page .grid {
            gap: 7px !important;
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
          .cahier-page {
            break-after: page;
            page-break-after: always;
          }
          .cahier-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }
          /* La page de garde tient sur une seule A4 (marges resserrées
             pour garder la dernière ligne sur la page). */
          .garde-page {
            padding: 5mm !important;
          }
          .garde-page .mt-8 {
            margin-top: 10px !important;
          }
          .garde-page .mt-7 {
            margin-top: 8px !important;
          }
          .garde-page .mt-6 {
            margin-top: 7px !important;
          }
          .garde-page .mt-5 {
            margin-top: 12px !important;
          }
          .garde-page .mt-4 {
            margin-top: 7px !important;
          }
          .garde-page .mt-3 {
            margin-top: 8px !important;
          }
          .garde-page .mt-2 {
            margin-top: 5px !important;
          }
          .corriges-page {
            break-before: page;
            page-break-before: always;
            padding: 0 !important;
          }
          .fiche-correction > summary {
            list-style: none;
            font-weight: 800;
            color: #0f172a !important;
          }
          .fiche-correction > *:not(summary) {
            display: block !important;
          }
        }
      `}</style>
    </main>
  );
}
