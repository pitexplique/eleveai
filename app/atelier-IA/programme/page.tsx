// app/atelier-IA/programme/page.tsx
"use client";

import Link from "next/link";
import { SEANCES } from "@/data/atelierIAProgramme";
import type { Seance } from "@/data/atelierIAProgramme";

function Badge({ text }: { text: string }) {
  return (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-200">
      {text}
    </span>
  );
}

function RecommandationLink({ seance }: { seance: Seance }) {
  if (!seance.recommandation) return null;

  const { label, href, type } = seance.recommandation;

  const base =
    "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-[11px] sm:text-xs font-semibold transition";
  const cls =
    type === "eleves"
      ? `${base} bg-emerald-500 text-slate-950 hover:bg-emerald-400`
      : `${base} bg-emerald-600 text-slate-950 hover:bg-emerald-500`;

  const emoji = type === "eleves" ? "🎒" : "⚡";

  return (
    <Link href={href} className={cls}>
      {emoji} {label}
    </Link>
  );
}

export default function AtelierIAProgrammePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HEADER */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 space-y-5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <Link href="/atelier-IA" className="text-xs text-emerald-300 hover:underline">
              ← Retour à l’atelier-IA
            </Link>

            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-slate-200">
              🧩 Programme (élèves)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            Programme atelier-IA
          </h1>

          <p className="text-lg font-semibold text-emerald-300">
            Crée ton prompt maintenant.
            <br />
            Garde la main sur ta réflexion.
          </p>

          <p className="max-w-3xl text-slate-300 leading-relaxed">
            Un déroulé simple en séances courtes. Chaque séance produit une{" "}
            <b>trace scolaire</b> : prompt, réponse IA, corrections personnelles et analyse.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href="/atelier-IA/vision"
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold hover:bg-slate-800"
            >
              👀 Vision pédagogique
            </Link>

            <Link
              href="/espace-eleves"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              🎒 Ouvrir le générateur Élèves (cours, révisions, méthodes)
            </Link>

            <Link
              href="/espace-atelier-IA"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-500"
            >
              ⚡ Ouvrir le générateur Atelier-IA (agir, écologie, projets)
            </Link>
          </div>
        </div>
      </section>

      {/* LISTE SEANCES */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {SEANCES.map((s) => (
              <div
                key={s.titre}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-100">{s.titre}</p>
                    <p className="text-[11px] text-slate-400">⏱️ {s.duree}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {s.badge ? <Badge text={s.badge} /> : null}
                  </div>
                </div>

                {/* Recommandation (après le badge) */}
                <div className="flex flex-wrap gap-2">
                  <RecommandationLink seance={s} />
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                  <p className="text-xs font-semibold text-emerald-200">🎯 Objectif</p>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">{s.objectif}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-200">🧠 Activités</p>
                  <ul className="mt-2 space-y-1 text-xs text-slate-300 list-disc list-inside">
                    {s.activites.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-900/10 p-3">
                  <p className="text-xs font-semibold text-emerald-200">📝 Trace produite</p>
                  <p className="mt-1 text-xs text-slate-200 leading-relaxed">{s.trace}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CADRE SIMPLE */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <p className="text-sm font-semibold text-slate-100">✅ Règles simples (à afficher en classe)</p>
            <ul className="mt-2 text-xs text-slate-300 list-disc list-inside space-y-1">
              <li>Je ne copie-colle pas : je relis, je corrige, j’explique.</li>
              <li>Je garde des traces : prompt + réponse IA + correction perso.</li>
              <li>Si la réponse est “trop sûre”, je vérifie davantage.</li>
              <li>Je peux utiliser le cours, le manuel, et la logique pour valider.</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center pt-2">
            <Link
              href="/atelier-IA"
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20"
            >
              Revenir au HUB atelier-IA →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
