"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calculator,
  CheckCircle2,
  Download,
  Dumbbell,
  GraduationCap,
  Heart,
  Mouse,
  Pencil,
  Printer,
  Sparkles,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import type { CahierConfig, CahierData } from "./types";
import CaptureApresTelechargement from "./CaptureApresTelechargement";
import { bougeDuJour } from "@/lib/cahier/bougeDuJour";

/* URL d'inscription encodée dans le QR de fin de cahier. Le ?from=cahier
   permet de tracer les inscriptions venues du cahier de vacances. */
const SIGNUP_URL = "https://eleveai.fr/auth/signin?from=cahier";

/* Habillage de la rubrique « Comprendre le monde » selon son thème du jour. */
const themesMonde = {
  histoire: { emoji: "📜", label: "Histoire", border: "border-amber-200", bg: "bg-amber-50/60", title: "text-amber-700" },
  ecologie: { emoji: "🌱", label: "Écologie", border: "border-green-200", bg: "bg-green-50/60", title: "text-green-700" },
  futur: { emoji: "🚀", label: "Demain", border: "border-indigo-200", bg: "bg-indigo-50/60", title: "text-indigo-700" },
} as const;

/* Barème de points commun à chaque jour (panneau latéral). */
const baremePoints = [
  { label: "Maths", pts: "2 pts", icon: Calculator, color: "text-sky-600" },
  { label: "Français", pts: "2 pts", icon: Pencil, color: "text-violet-600" },
  { label: "Mot", pts: "1 pt", icon: BookOpen, color: "text-teal-600" },
  { label: "Geste", pts: "1 pt", icon: Mouse, color: "text-emerald-600" },
  { label: "Bouge", pts: "1 pt", icon: Dumbbell, color: "text-orange-500" },
  { label: "Défi", pts: "2 pts", icon: Target, color: "text-orange-500" },
  { label: "Défi ★★★★★", pts: "+ 2 pts", icon: Star, color: "text-amber-500" },
];

/* -------------------------------------------------------------------------- */
/*  Petits composants réutilisables                                           */
/* -------------------------------------------------------------------------- */

/**
 * Illustration : affiche une image si `src` est fourni, sinon un emoji.
 * Tous les visuels passent par ici → un seul endroit pour brancher de vraies
 * images (repérables aussi via l'attribut data-illustration).
 */
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
      title={`Illustration à remplacer : ${label}`}
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-white/70 ${className}`}
    >
      {emoji}
    </span>
  );
}

/** Case « Terminé ! » à cocher (imprimable). */
function Termine() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
      <span className="inline-block h-4 w-4 rounded-full border-2 border-slate-300" />
      Terminé !
    </span>
  );
}

/** Bandeau de tête présent en haut de chaque page imprimée. */
function PageEntete({ slug }: { slug: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[11px] font-bold text-slate-400">
      <span className="flex items-center gap-1.5">
        <span className="text-sm font-black text-teal-600">eleveai.fr</span>
        <span className="text-slate-300">—</span>
        Plusieurs portes pour apprendre
      </span>
      <span className="hidden font-bold text-teal-600 sm:inline">
        eleveai.fr/cahier-vacances/{slug}
      </span>
    </div>
  );
}

/** Fil « J'apprends → Je m'entraîne → Je progresse ». */
function FilProgression() {
  const etapes = [
    { icon: GraduationCap, label: "J'apprends", color: "text-sky-600", bg: "bg-sky-100" },
    { icon: Dumbbell, label: "Je m'entraîne", color: "text-emerald-600", bg: "bg-emerald-100" },
    { icon: TrendingUp, label: "Je progresse", color: "text-violet-600", bg: "bg-violet-100" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-black">
      {etapes.map((e, i) => (
        <span key={e.label} className="flex items-center gap-2">
          <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${e.bg} ${e.color}`}
          >
            <e.icon className="h-5 w-5" />
          </span>
          <span className={e.color}>{e.label}</span>
          {i < etapes.length - 1 && (
            <span className="px-1 text-slate-300">→</span>
          )}
        </span>
      ))}
    </div>
  );
}

/** Réponses du calcul mental, dans l'ordre des énoncés. */
function calculReponses(calcul: { q: string; r: string }[]): string {
  return calcul.map((c) => `${c.q.replace(/\s*=$/, "")} ${c.r}`).join(" · ");
}

/* -------------------------------------------------------------------------- */
/*  Moteur d'affichage commun à tous les cahiers de vacances.                 */
/*  Un niveau = un fichier de données (CahierData) + une config (libellés).   */
/* -------------------------------------------------------------------------- */

export default function CahierVacances({
  data,
  config,
}: {
  data: CahierData;
  config: CahierConfig;
}) {
  const { jours, parcours, defisExpert, carnet, leSaviasTu, mondeDemain } = data;
  const semaines = Array.from(new Set(jours.map((j) => j.semaine)));

  return (
    <main className="relative isolate min-h-screen bg-[#f8f6ff] text-slate-800">
      {/* Capter après le téléchargement/impression (jamais avant, aucun mur). */}
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
            className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-600 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            Imprimer / PDF
          </button>
        </div>
      </div>

      {/* CTA « aimant » en HAUT (écran) : UN seul geste évident — continuer avec
         le coach IA. Capte le parent venu de Google AVANT qu'il ne reparte (le
         cahier gratuit se suffit sinon). Bouton primaire seul, « Imprimer » passe
         en secondaire, les autres liens descendent sous le cahier. ?from=cahier =
         tracking. */}
      <div className="screen-only mx-auto max-w-4xl px-5 pt-5 sm:px-8">
        <Link
          href={`/coach-ia/maths?classe=${config.coachClasse}&from=cahier`}
          className="flex w-full flex-col items-center gap-1 rounded-2xl bg-amber-400 px-6 py-4 text-center shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
        >
          <span className="inline-flex items-center gap-2 text-base font-black text-slate-900 sm:text-lg">
            <Sparkles className="h-5 w-5" />
            Continuer avec un coach IA — gratuit →
          </span>
          <span className="text-xs font-bold text-amber-950/80">
            Maths, français, anglais… du CP au Bac, au rythme de ton enfant, sans jugement.
          </span>
        </Link>
        {/* Preuve sociale : un vrai avis d'élève (retours_eleves), sous le CTA
           pour rassurer avant le clic. Prénom seul (RGPD : jamais relié à une
           classe/établissement). */}
        <figure className="mx-auto mt-2 max-w-xl text-center">
          <div className="text-xs tracking-wide text-amber-500">★★★★★</div>
          <blockquote className="mt-0.5 text-xs font-semibold italic leading-5 text-slate-600">
            « Franchement, j&apos;ai adoré faire ça le soir, quand j&apos;avais un
            moment. Ça ne peut être que bénéfique sur le long terme. »
          </blockquote>
          <figcaption className="mt-0.5 text-[11px] font-black text-slate-500">
            — Pierre, élève
          </figcaption>
        </figure>
      </div>

      <article className="mx-auto max-w-4xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        {/* ================= PAGE DE GARDE ================= */}
        <section className="cahier-page garde-page overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/40 print:rounded-none print:border-0 print:shadow-none">
          <PageEntete slug={config.slug} />

          <div className="mt-4 text-center tracking-tight">
            <span className="text-2xl font-black text-teal-600 sm:text-3xl">
              eleveai.fr
            </span>
            <span className="ml-2 text-sm font-bold italic text-slate-500">
              · La liberté d&apos;apprendre
            </span>
          </div>

          <div className="relative mt-8 text-center">
            {/* doodles maths */}
            <span className="pointer-events-none absolute -left-2 top-2 -rotate-12 text-sm font-black text-teal-400">
              2 + 3 = 5
            </span>
            <span className="pointer-events-none absolute right-0 top-8 rotate-6 text-sm font-black text-violet-400">
              6 × 7 = 42
            </span>
            <span className="pointer-events-none absolute left-1/4 top-0 text-xl font-black text-amber-300">
              +
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
              <span className="text-sky-600">Maths</span>
              <span className="text-slate-300"> · </span>
              <span className="text-rose-500">Français</span>
              <span className="text-slate-300"> · </span>
              <span className="text-violet-600">Vocabulaire</span>
              <span className="text-slate-300"> · </span>
              <span className="text-amber-500">Défis</span>
            </p>
            <p className="mt-2 text-base font-bold text-slate-500">{config.sousTitre}</p>

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

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-lg font-black text-white shadow-lg shadow-teal-500/30">
              <Sparkles className="h-5 w-5" />
              {config.mission}
            </div>
          </div>

          {/* Le parcours en étapes (fil conducteur) */}
          <div className="mt-7 rounded-2xl border border-teal-200 bg-teal-50/50 p-4">
            <p className="text-center text-sm font-black text-teal-700">
              {config.parcoursTitre}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-xs font-bold text-slate-600">
              {parcours.map((e) => (
                <span key={e.etape} className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 shadow-sm">
                    <span className="text-sm">{e.emoji}</span>
                    {e.lieu}
                  </span>
                  <span className="text-teal-400">→</span>
                </span>
              ))}
              <span className="inline-flex items-center gap-1 rounded-full bg-teal-500 px-2.5 py-1 font-black text-white">
                {config.chipFin}
              </span>
            </div>
          </div>

          <div className="mx-auto mt-7 flex max-w-lg items-center gap-4 rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/40 p-4">
            <div className="flex-1">
              <p className="text-sm font-black uppercase tracking-wide text-teal-600">
                Ce cahier appartient à
              </p>
              <div className="mt-5 border-b-2 border-dotted border-slate-300" />
            </div>
            {/* QR « continuer gratuitement » : la couverture est la page la plus vue
               et la plus partagée → le meilleur point de fuite vers l'inscription.
               ?from=cahier = tracking. Impression 100 % libre, aucun mur.
               Légende à gauche du QR (pas dessous) pour ne pas rallonger la garde. */}
            <div className="flex shrink-0 items-center gap-2">
              <p className="max-w-[84px] text-right text-[10px] font-black leading-tight text-slate-600">
                Scanne pour continuer <span className="text-teal-600">gratuitement</span>
              </p>
              <div className="inline-block rounded-lg border border-slate-200 bg-white p-1">
                <QRCodeSVG value={SIGNUP_URL} size={52} level="M" marginSize={1} />
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="flex items-center gap-2 text-base font-black text-slate-900">
                <BookOpen className="h-5 w-5 text-teal-500" />
                Mode d&apos;emploi
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Une page par jour, à ton rythme : un peu de maths, un peu de
                français, un mot nouveau et un défi. Les corrigés sont à la fin
                du cahier.
              </p>
            </div>
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
              <h2 className="flex items-center gap-2 text-base font-black text-slate-900">
                <Heart className="h-4 w-4 text-orange-500" />
                Un cahier solidaire
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                En utilisant ce cahier, tu participes à offrir l&apos;accès à
                EleveAI à un élève qui n&apos;en a pas les moyens. Merci&nbsp;!
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <span className="flex items-center gap-2 text-base font-black text-slate-800">
              <Award className="h-6 w-6 text-amber-500" />
              Gagne des points et des badges !
            </span>
            <span className="flex gap-2 text-2xl">
              <Illu emoji="⭐" label="badge étoile" className="h-9 w-9 text-xl" />
              <Illu emoji="⚡" label="badge éclair" className="h-9 w-9 text-xl" />
              <Illu emoji="👑" label="badge couronne" className="h-9 w-9 text-xl" />
            </span>
          </div>

          <div className="mt-6">
            <FilProgression />
          </div>

          <p className="mt-7 text-center text-lg font-black italic text-teal-600">
            Chaque jour, un pas de plus vers la réussite !
          </p>
        </section>

        {/* ================= PAGES JOURS ================= */}
        {semaines.map((sem) =>
          jours
            .filter((j) => j.semaine === sem)
            .map((jour) => {
              const etape = parcours.find((e) => e.semaine === jour.semaine);
              return (
                <section
                  key={jour.numero}
                  className="cahier-page jour-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:mt-0 print:rounded-none print:border-0 print:p-4 print:shadow-none"
                >
                  <PageEntete slug={config.slug} />

                  <header className="mt-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
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
                    <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                      <span className="text-sm">{etape.emoji}</span>
                      <span>
                        Étape {etape.etape} · {etape.lieu}
                      </span>
                    </div>
                  )}

                  {/* Le carnet de Ti Margo — récit du jour (le voyage se vit) */}
                  {carnet[jour.numero] && (
                    <p className="mt-2 text-sm italic leading-6 text-slate-600">
                      <span className="font-black not-italic text-teal-700">
                        📖 Le carnet de Ti Margo —{" "}
                      </span>
                      {carnet[jour.numero]}
                    </p>
                  )}

                  {/* Le savais-tu ? — ancrage local 🌺 / ouverture monde 🌍 */}
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
                          : "🌍 Le savais-tu ? (dans le monde) — "}
                      </span>
                      {leSaviasTu[jour.numero].texte}
                    </p>
                  )}

                  {/* Bouge du jour — défi-corps (banque partagée). Le cahier n'est
                     plus 100 % cérébral : anti-écran, esprit « nager, coder, bâtir ».
                     Compacté au print pour préserver le « 1 jour = 1 A4 ». */}
                  <p className="mt-2 rounded-lg bg-orange-50 px-3 py-1.5 text-xs leading-5 text-orange-900 print:mt-1.5 print:py-1 print:text-[11px] print:leading-4">
                    <span className="font-black">🤸 Bouge du jour — </span>
                    {bougeDuJour(jour.numero)}
                  </p>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_15rem] print:grid-cols-[1fr_14rem]">
                    {/* ---------- Colonne principale ---------- */}
                    <div className="grid gap-4">
                      {/* Maths */}
                      <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-4">
                        <div className="flex items-center justify-between">
                          <h2 className="flex items-center gap-2 text-lg font-black text-sky-700">
                            <Calculator className="h-5 w-5" />
                            Maths
                          </h2>
                          <Termine />
                        </div>
                        <p className="mt-3 text-sm font-bold text-slate-700">
                          Calcul mental
                        </p>
                        <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-800 sm:grid-cols-3">
                          {jour.maths.calcul.map((c) => (
                            <span key={c.q} className="font-mono">
                              {c.q} ____
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-slate-700">Problème</p>
                            <p className="mt-1 text-sm leading-6 text-slate-700">
                              {jour.maths.probleme.enonce}
                            </p>
                            <div className="mt-2 h-7 border-b border-dashed border-slate-300" />
                          </div>
                          <Illu emoji={jour.maths.illu.emoji} label={jour.maths.illu.label} />
                        </div>
                      </div>

                      {/* Français */}
                      <div className="rounded-2xl border border-violet-200 bg-violet-50/60 p-4">
                        <div className="flex items-center justify-between">
                          <h2 className="flex items-center gap-2 text-lg font-black text-violet-700">
                            <Pencil className="h-5 w-5" />
                            Français — {jour.francais.regleTitre}
                          </h2>
                          <Termine />
                        </div>
                        <p className="mt-2 rounded-xl border border-violet-100 bg-white p-3 text-sm leading-6 text-slate-700">
                          {jour.francais.regle}
                        </p>
                        <div className="mt-3 flex items-end justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-slate-700">
                              {jour.francais.consigne}
                            </p>
                            <ul className="mt-2 grid gap-2 text-sm leading-6 text-slate-800">
                              {jour.francais.items.map((it) => (
                                <li key={it}>• {it}</li>
                              ))}
                            </ul>
                          </div>
                          <Illu
                            emoji="🦎"
                            label="Ti Margo"
                            src="/cahier-vacances/ti-margo.png"
                            className="h-14 w-14"
                          />
                        </div>
                      </div>

                      {/* Mot & geste */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-4">
                          <div className="flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-base font-black text-teal-700">
                              <BookOpen className="h-5 w-5" />
                              Le mot du jour
                            </h2>
                            <Termine />
                          </div>
                          <p className="mt-2 text-sm">
                            <span className="font-black text-teal-700">{jour.mot.mot}</span>{" "}
                            <span className="text-xs italic text-slate-500">
                              ({jour.mot.nature})
                            </span>
                          </p>
                          <p className="mt-1 text-sm leading-6 text-slate-700">
                            {jour.mot.definition}
                          </p>
                          <p className="mt-1 text-xs italic leading-5 text-slate-500 print:hidden">
                            {jour.mot.exemple}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                          <div className="flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-base font-black text-emerald-700">
                              <Mouse className="h-5 w-5" />
                              Le geste du jour
                            </h2>
                            <Termine />
                          </div>
                          <p className="mt-2 text-sm font-bold text-emerald-700">
                            {jour.geste.titre}
                          </p>
                          <div className="mt-1 flex items-end justify-between gap-2">
                            <p className="text-sm leading-6 text-slate-700">
                              {jour.geste.texte}
                            </p>
                            <Illu
                              emoji="🦎"
                              label="Ti Margo"
                              src="/cahier-vacances/ti-margo-tablette-sac-a-dos.png"
                              className="h-14 w-14 shrink-0"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Défi */}
                      <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-4">
                        <div className="flex items-center justify-between">
                          <h2 className="flex items-center gap-2 text-base font-black text-orange-600">
                            <Target className="h-5 w-5" />
                            Le défi du jour
                          </h2>
                          <Termine />
                        </div>
                        <p className="mt-1 text-sm leading-6 text-slate-700">
                          {jour.defi.enonce}
                        </p>
                        <div className="mt-2 h-7 border-b border-dashed border-slate-300" />
                      </div>
                    </div>

                    {/* ---------- Colonne latérale (gamification) ---------- */}
                    <aside className="grid content-start gap-4">
                      {/* Badge du jour */}
                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center">
                        <p className="text-xs font-black uppercase tracking-wide text-amber-600">
                          Badge du jour
                        </p>
                        <Illu emoji="🏅" label={`badge ${jour.badge}`} className="mx-auto mt-2 h-14 w-14 text-3xl" />
                        <p className="mt-2 text-sm font-black uppercase leading-tight text-slate-800">
                          {jour.badge}
                        </p>
                      </div>

                      {/* Points du jour */}
                      <div className="overflow-hidden rounded-2xl border border-slate-200">
                        <p className="bg-teal-600 px-4 py-2 text-center text-xs font-black uppercase tracking-wide text-white">
                          Points du jour
                        </p>
                        <ul className="grid grid-cols-2 gap-x-3 gap-y-1 bg-white px-3 py-2.5">
                          {baremePoints.map((p) => (
                            <li
                              key={p.label}
                              className="flex items-center justify-between gap-1.5 text-[11px] leading-tight"
                            >
                              <span className="flex items-center gap-1 font-bold text-slate-700">
                                <p.icon className={`h-3.5 w-3.5 shrink-0 ${p.color}`} />
                                {p.label}
                              </span>
                              <span className="font-black text-slate-900">{p.pts}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between bg-teal-50 px-4 py-2">
                          <span className="text-sm font-black text-teal-700">TOTAL</span>
                          <span className="text-lg font-black text-teal-700">/11</span>
                        </div>
                      </div>

                      {/* Défi ★★★★★ (expert / HPI) — dans la sidebar pour
                         laisser plus de place à l'encadré d'écriture en bas */}
                      {defisExpert[jour.numero] && (
                        <div className="rounded-2xl border-2 border-indigo-300 bg-indigo-50/60 p-3">
                          <div className="flex items-center justify-between gap-2">
                            <h2 className="flex items-center gap-1.5 text-sm font-black text-indigo-700">
                              <Star className="h-4 w-4 fill-indigo-400 text-indigo-500" />
                              Défi ★★★★★
                            </h2>
                            <Termine />
                          </div>
                          <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-500">
                            Pour les champions
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-700">
                            {defisExpert[jour.numero].enonce}
                          </p>
                          <div className="mt-2 h-7 border-b border-dashed border-slate-300" />
                        </div>
                      )}

                      {/* Encouragement mascotte (compact) */}
                      <div className="flex items-center gap-2 rounded-2xl border border-teal-200 bg-white p-2.5 text-left">
                        <Illu
                          emoji="🦎"
                          label="Ti Margo"
                          src="/cahier-vacances/ti-margo.png"
                          className="h-12 w-12 shrink-0"
                        />
                        <div>
                          <p className="text-sm font-black text-teal-700">Bravo !</p>
                          <p className="text-xs leading-4 text-slate-600">
                            Continue chaque jour, tu vas y arriver !
                          </p>
                        </div>
                      </div>
                    </aside>
                  </div>

                  {/* Comprendre le monde — Histoire / Écologie / Futur (gaté :
                     ne s'affiche que si le cahier fournit le contenu du jour). */}
                  {mondeDemain?.[jour.numero] &&
                    (() => {
                      const md = mondeDemain[jour.numero];
                      const t = themesMonde[md.theme];
                      return (
                        <div className={`mt-4 rounded-2xl border ${t.border} ${t.bg} p-4 print:mt-3`}>
                          <div className="flex items-center justify-between">
                            <h2 className={`flex items-center gap-2 text-base font-black ${t.title}`}>
                              <span aria-hidden="true">🌍</span>
                              Comprendre le monde — {t.label} {t.emoji}
                            </h2>
                            <Termine />
                          </div>
                          <p className="mt-1 text-sm leading-6 text-slate-700">
                            <span className="font-bold">{md.titre}.</span> {md.texte}
                          </p>
                          <p className="mt-1 text-xs italic leading-5 text-slate-600">
                            💭 À toi de réfléchir : {md.question}
                          </p>
                        </div>
                      );
                    })()}

                  {/* Mon carnet de voyage — espace libre pour dessiner / écrire
                     (flex-1 : remplit la place restante avant le footer) */}
                  <div className="mt-4 flex flex-1 flex-col rounded-2xl border-2 border-dashed border-teal-300 bg-white p-3 print:mt-3">
                    <p className="flex flex-wrap items-center gap-x-2 text-sm font-black text-teal-700">
                      <span className="flex items-center gap-1.5">
                        <Pencil className="h-4 w-4" />
                        Mon carnet de voyage
                      </span>
                      <span className="text-xs font-normal italic text-slate-500">
                        Dessine ou raconte ton étape du jour… et change le monde !
                      </span>
                    </p>
                    <div className="mt-2 min-h-[110px] flex-1 print:min-h-[40px]" />
                  </div>

                  <footer className="mt-4 border-t border-slate-200 pt-3">
                    <FilProgression />
                    <p className="mt-3 text-center text-sm font-bold text-teal-600">
                      Un petit pas chaque jour, un grand pas pour tes connaissances !
                    </p>
                    <p className="mt-1.5 text-center text-base font-black text-slate-800">
                      Continue en ligne sur{" "}
                      <span className="text-teal-600">eleveai.fr</span>
                    </p>
                  </footer>
                </section>
              );
            })
        )}

        {/* ================= CORRIGÉS (page séparée) ================= */}
        <section className="cahier-page corriges-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:mt-0 print:rounded-none print:border-0 print:p-4 print:shadow-none">
          <PageEntete slug={config.slug} />
          <header className="mt-3 border-b border-slate-200 pb-4">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-700">
              Corrigés
            </span>
            <h2 className="mt-3 flex items-center gap-2 text-2xl font-black text-slate-900">
              <CheckCircle2 className="h-6 w-6 text-emerald-500 print:hidden" />
              Les réponses
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              À regarder seulement après avoir cherché&nbsp;!
            </p>
          </header>

          <div className="mt-4 grid gap-3">
            {jours.map((jour) => (
              <details
                key={jour.numero}
                className="fiche-correction rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <summary className="cursor-pointer text-sm font-black text-slate-900">
                  Jour {jour.numero} — corrigé
                </summary>
                <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                  <p>
                    <span className="font-bold text-sky-700">Maths : </span>
                    Calcul → {calculReponses(jour.maths.calcul)}.{" "}
                    {jour.maths.probleme.correction}
                  </p>
                  <p>
                    <span className="font-bold text-violet-600">Français : </span>
                    {jour.francais.correction}
                  </p>
                  <p>
                    <span className="font-bold text-orange-600">Défi : </span>
                    {jour.defi.correction}
                  </p>
                  {defisExpert[jour.numero] && (
                    <p>
                      <span className="font-bold text-indigo-600">Défi ★★★★★ : </span>
                      {defisExpert[jour.numero].correction}
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-teal-200 bg-teal-50 p-5">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div>
                <p className="text-base font-black text-slate-900">
                  Ce cahier vous a plu&nbsp;? La suite est en ligne sur{" "}
                  <span className="text-teal-600">eleveai.fr</span>
                </p>
                <p className="mt-1 text-sm font-bold text-slate-600">
                  <span className="font-black text-slate-800">Parents&nbsp;:</span>{" "}
                  créez un compte <span className="font-black">gratuit</span> pour
                  suivre votre enfant et être prévenu·e des nouveautés (nouveaux
                  cahiers, coach, dictée du jour…). Rien à installer&nbsp;: ça
                  s&apos;ouvre dans le navigateur, et s&apos;ajoute à l&apos;écran
                  d&apos;accueil comme une appli.
                </p>
                <div className="screen-only mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <Link
                    href="/auth/signin?from=cahier"
                    className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-teal-500/30 transition hover:bg-teal-400"
                  >
                    <Sparkles className="h-4 w-4" />
                    Créer un compte gratuit
                  </Link>
                  <Link
                    href={`/coach-ia/maths?classe=${config.coachClasse}&from=cahier`}
                    className="inline-flex items-center gap-2 rounded-full border border-teal-300 bg-white px-5 py-3 text-sm font-black text-teal-700 transition hover:bg-teal-50"
                  >
                    Découvrir le Coach IA
                  </Link>
                </div>
              </div>

              {/* QR code vers l'inscription parent (visible écran ET impression) */}
              <div className="shrink-0 text-center">
                <div className="inline-block rounded-xl border border-slate-200 bg-white p-2">
                  <QRCodeSVG value={SIGNUP_URL} size={112} level="M" marginSize={2} />
                </div>
                <p className="mt-1 text-xs font-black leading-tight text-slate-700">
                  Scannez pour créer
                  <br />
                  votre compte gratuit
                </p>
                <p className="text-[10px] font-bold text-slate-400">
                  eleveai.fr
                </p>
              </div>
            </div>
          </div>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500">
            <span>eleveai.fr · Cahier de vacances</span>
            <span>{config.titre}</span>
          </footer>
        </section>
      </article>

      {/* Aussi à imprimer : le Cahier de maths (Picto Maths) + la carte des savoirs.
         Placé APRÈS le cahier pour ne pas diluer le CTA coach en haut de page. */}
      <div className="screen-only mx-auto max-w-4xl px-5 pb-8 sm:px-8">
        <div className="flex flex-col gap-3 rounded-2xl border border-cyan-200 bg-cyan-50/60 p-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-sm font-black text-slate-900">
            🃏 Aussi, à imprimer&nbsp;: le <span className="text-cyan-700">Cahier de maths</span>{" "}
            (Picto Maths 974) et la <span className="text-cyan-700">carte des savoirs</span> de La Réunion.
          </p>
          <div className="flex shrink-0 flex-wrap justify-center gap-2">
            <Link
              href="/cahier-vacances/maths"
              className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-4 py-2 text-sm font-black text-white transition hover:bg-cyan-500"
            >
              🃏 Cahier de maths →
            </Link>
            <Link
              href="/carte"
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300 bg-white px-4 py-2 text-sm font-black text-cyan-700 transition hover:bg-cyan-50"
            >
              🗺️ La carte →
            </Link>
          </div>
        </div>
      </div>

      {/* Bouton imprimer flottant (écran) */}
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

          /* Chaque page-jour doit tenir sur une seule A4 : on compresse
             marges, paddings, gaps et tailles de texte à l'impression. */
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
            margin-top: 3px !important;
            padding-bottom: 4px !important;
          }
          .jour-page .rounded-2xl {
            padding: 6px !important;
          }
          .jour-page .grid {
            gap: 7px !important;
          }
          .jour-page .mt-4 {
            margin-top: 7px !important;
          }
          .jour-page .mt-3 {
            margin-top: 5px !important;
          }
          .jour-page .mt-2,
          .jour-page .mt-1 {
            margin-top: 3px !important;
          }
          .jour-page h2 {
            font-size: 13px !important;
          }
          .jour-page .text-lg {
            font-size: 13px !important;
          }
          .jour-page .text-sm {
            font-size: 11px !important;
          }
          .jour-page .text-xs {
            font-size: 9.5px !important;
          }
          .jour-page .leading-6 {
            line-height: 1.3 !important;
          }
          .jour-page .h-7 {
            height: 14px !important;
          }
          /* Footer compact ; l'encadré « Mon carnet de voyage » (flex-1)
             occupe l'espace libre et pousse le footer en bas. */
          .jour-page footer {
            padding-top: 5px !important;
          }
          .jour-page .border-teal-300 {
            flex: 1 1 auto !important;
          }
          .jour-page footer .h-9 {
            height: 26px !important;
            width: 26px !important;
          }
          .jour-page footer .h-5 {
            height: 16px !important;
            width: 16px !important;
          }
          .jour-page footer .mt-3 {
            margin-top: 4px !important;
          }
          .jour-page li {
            padding-top: 2px !important;
            padding-bottom: 2px !important;
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

          /* Une « page » du cahier = une page imprimée */
          .cahier-page {
            break-after: page;
            page-break-after: always;
          }
          .cahier-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }

          /* La page de garde tient sur une seule A4 (marges resserrées).
             Resserrées davantage pour garder la dernière ligne sur la page. */
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

          /* Les corrigés démarrent toujours sur une page neuve. */
          .corriges-page {
            break-before: page;
            page-break-before: always;
            padding: 0 !important;
          }
          .corriges-page header {
            padding-bottom: 8px !important;
          }
          .corriges-page .gap-3 {
            gap: 8px !important;
          }
          .corriges-page .gap-2 {
            gap: 3px !important;
          }
          .corriges-page .rounded-2xl {
            padding: 9px !important;
          }
          .corriges-page footer {
            margin-top: 12px !important;
            padding-top: 8px !important;
          }

          /* À l'impression, les corrigés sont toujours dépliés. */
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
