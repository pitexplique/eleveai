export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { fetchCatalogue, type ActionCatalogue } from "@/lib/server/catalogue";

export const metadata: Metadata = {
  title: "Explorer — tout ce que tu peux faire | EleveAI",
  description:
    "Le catalogue complet d'EleveAI : coachs, parcours, rituels du jour, révision, concours, cahiers de vacances. Trouve ta prochaine activité, dans ta matière forte ou une voie à découvrir.",
  alternates: { canonical: "/explorer" },
  openGraph: {
    title: "Explorer — tout ce que tu peux faire sur EleveAI",
    description:
      "Coachs, parcours, défis, dictée, concours, cahiers de vacances… tout ce qu'un élève peut faire, au même endroit.",
    url: "/explorer",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

// Ordre et titres des familles (le regroupement de la page).
const FAMILLES: { key: string; titre: string; emoji: string; sous: string }[] = [
  { key: "coach",     titre: "Coachs",              emoji: "🎓", sous: "Le cœur : progresser, notion par notion — un par matière." },
  { key: "rituel",    titre: "Rituels du jour",     emoji: "☀️", sous: "Courts, à faire chaque jour. Le rendez-vous du matin." },
  { key: "parcours",  titre: "Parcours",            emoji: "🛤️", sous: "Faire le point : un bilan de tes compétences." },
  { key: "reviser",   titre: "Réviser & découvrir", emoji: "📖", sous: "Fiches, dico, podcast — pour revoir autrement." },
  { key: "ouverture", titre: "Ouverture",           emoji: "🧭", sous: "Le sens, l'envie : à quoi ça sert, et comment." },
  { key: "evenement", titre: "Défis & concours",    emoji: "🏆", sous: "Se mesurer, se dépasser, pour de vrai." },
  { key: "cahier",    titre: "Cahiers de vacances", emoji: "📥", sous: "Sur papier, même sans connexion." },
];

const ROLE_EMOJI: Record<string, string> = {
  progresser: "🔥",
  explorer: "🧭",
  rituel: "☀️",
  competition: "🏆",
  reviser: "📖",
  "hors-ligne": "📥",
};

const MATIERE_STYLE: Record<string, string> = {
  maths: "bg-orange-50 text-orange-700",
  francais: "bg-sky-50 text-sky-700",
  anglais: "bg-blue-50 text-blue-700",
  espagnol: "bg-red-50 text-red-700",
  ia: "bg-cyan-50 text-cyan-700",
  economie: "bg-amber-50 text-amber-700",
  transversal: "bg-slate-100 text-slate-600",
};

const RYTHME_LABEL: Record<string, string> = {
  quotidien: "chaque jour",
  hebdo: "chaque semaine",
  ponctuel: "quand tu veux",
};

function Barre({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-14 shrink-0 text-[11px] font-bold text-slate-400">{label}</span>
      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
        <span
          className="block h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
          style={{ width: `${Math.round(value * 100)}%` }}
        />
      </span>
      <span className="w-7 shrink-0 text-right text-[11px] font-black text-slate-500">
        {value.toFixed(2)}
      </span>
    </div>
  );
}

function Carte({ a }: { a: ActionCatalogue }) {
  const matiereCls = MATIERE_STYLE[a.matiere] ?? MATIERE_STYLE.transversal;
  const aVenir = !a.actif;

  return (
    <article
      className={`flex flex-col rounded-3xl border bg-white p-5 shadow-sm transition ${
        aVenir
          ? "border-dashed border-slate-300 opacity-80"
          : "border-slate-200 hover:-translate-y-0.5 hover:shadow-lg"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {/* Philosophie VueSchool : apprendre est GRATUIT — le badge le dit sur
           chaque carte. Ce qui se paie = l'accompagnement (cf. bandeau du haut). */}
        {!aVenir && (
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-emerald-700">
            Gratuit
          </span>
        )}
        <span className={`rounded-full px-2.5 py-1 text-xs font-black capitalize ${matiereCls}`}>
          {a.matiere}
        </span>
        {a.niveaux && (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
            {a.niveaux}
          </span>
        )}
        {a.roles.length > 0 && (
          <span className="ml-auto text-base" title={a.roles.join(" · ")}>
            {a.roles.map((r) => ROLE_EMOJI[r] ?? "").join(" ")}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-black text-slate-900">
        {a.label}
        {aVenir && (
          <span className="ml-2 align-middle rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-amber-700">
            {a.etat === "optionnel" ? "à l'étude" : "à venir"}
          </span>
        )}
      </h3>
      {a.description && (
        <p className="mt-1.5 text-sm leading-6 text-slate-600">{a.description}</p>
      )}

      <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
        {RYTHME_LABEL[a.rythme] ?? a.rythme}
      </p>

      <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
        <Barre label="valeur" value={a.valeur} />
        <Barre label="intérêt" value={a.attrait} />
        <Barre label="idéal" value={a.valeur_interet} />
      </div>

      <div className="mt-4">
        {aVenir ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-black text-slate-400">
            Bientôt disponible
          </span>
        ) : (
          <Link
            href={a.route}
            className="inline-flex items-center gap-1.5 text-sm font-black text-cyan-700 hover:text-cyan-900"
          >
            Y aller
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
}

export default async function ExplorerPage() {
  let actions: ActionCatalogue[] = [];
  try {
    actions = await fetchCatalogue();
  } catch {
    actions = [];
  }

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
            <Compass className="h-4 w-4" />
            Le catalogue
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Explorer <span className="text-amber-300">tout ce que tu peux faire</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/90 sm:text-lg">
            Progresse dans ta matière forte, ou tente une voie que tu n&apos;as pas
            encore explorée. Chaque activité est là — à toi de choisir la tienne.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {/* Le modèle, dit en une phrase (philosophie VueSchool) : apprendre est
           gratuit ; ce qui se paie, c'est l'accompagnement dans la durée. */}
        <div className="mb-8 flex flex-col items-start gap-3 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="text-sm font-bold leading-6 text-emerald-900">
            <span className="font-black">Tout ce qui sert à apprendre est gratuit</span> —
            et le restera. Ce qui se paie, c&apos;est l&apos;accompagnement dans la
            durée : un coach qui se souvient, un suivi de progression pour la
            famille ou l&apos;établissement.
          </p>
          <Link
            href="/tarifs"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white transition hover:bg-emerald-500"
          >
            Voir l&apos;accompagnement
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {actions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-5xl">🧭</p>
            <h2 className="mt-4 text-2xl font-black text-slate-900">Le catalogue arrive</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              La liste des activités se remplit. Exécute{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">supabase/catalogue_actions.sql</code>{" "}
              pour l&apos;alimenter.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {FAMILLES.map((f) => {
              const group = actions.filter((a) => a.famille === f.key);
              if (group.length === 0) return null;
              return (
                <div key={f.key}>
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-2xl font-black text-slate-900">
                      <span className="mr-2">{f.emoji}</span>
                      {f.titre}
                    </h2>
                    <span className="text-sm font-semibold text-slate-400">{group.length}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{f.sous}</p>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {group.map((a) => (
                      <Carte key={a.id} a={a} />
                    ))}
                  </div>
                </div>
              );
            })}

            <p className="border-t border-slate-200 pt-6 text-center text-sm font-semibold text-slate-400">
              Chaque carte est notée sur deux axes : la <b>valeur</b> (ce qui te fait
              progresser) et l&apos;<b>intérêt</b> (le plaisir). Bientôt, ta page
              d&apos;accueil te proposera chaque matin celle qui te correspond. ☀️
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
