"use client";

// Les signalements — les lire, les retenir, les payer.
//
// Le contexte est affiché en premier, avant le message : c'est lui qui rend un
// signalement exploitable. « La réponse est fausse » ne dit rien ; « la réponse
// est fausse, sur 2/3 + 1/6, notion fractions, dans le coach de maths » se
// corrige dans la minute.
//
// Retenir et payer sont le MÊME geste : attribuer des points passe le
// signalement en « traité ». Deux boutons qui pourraient se contredire, ça
// finit toujours par se contredire.

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  POINTS_SIGNALEMENT_CORRIGE,
  POINTS_SIGNALEMENT_RETENU,
} from "@/lib/points/signalementPoints";

type Signalement = {
  id: string;
  created_at: string;
  connecte: boolean;
  profil: string | null;
  code_etablissement: string | null;
  code_utilisateur: string | null;
  type_utilisateur: string | null;
  type: "bug" | "erreur_pedagogique" | "idee" | "avis";
  message: string;
  page: string | null;
  question: string | null;
  notion_lue: string | null;
  intention_lue: string | null;
  ressource_visee: string | null;
  statut: "nouveau" | "vu" | "traite" | "rejete";
  note_interne: string | null;
  points_attribues: number;
  ia_probable: boolean;
};

const TYPE_META: Record<string, { emoji: string; label: string; badge: string }> = {
  erreur_pedagogique: {
    emoji: "📕",
    label: "Erreur",
    badge: "bg-rose-400/15 text-rose-200 ring-1 ring-rose-300/30",
  },
  bug: { emoji: "🐞", label: "Bug", badge: "bg-amber-400/15 text-amber-200 ring-1 ring-amber-300/30" },
  idee: { emoji: "💡", label: "Idée", badge: "bg-sky-400/15 text-sky-200 ring-1 ring-sky-300/30" },
  avis: { emoji: "⭐", label: "Avis", badge: "bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/30" },
};

const STATUT_LABEL: Record<Signalement["statut"], string> = {
  nouveau: "Nouveau",
  vu: "Vu",
  traite: "Retenu",
  rejete: "Rejeté",
};

const FILTRES = [
  ["nouveau", "Nouveaux"],
  ["vu", "Vus"],
  ["traite", "Retenus"],
  ["", "Tous"],
] as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function AdminSignalementsClient() {
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [liste, setListe] = useState<Signalement[]>([]);
  const [total, setTotal] = useState(0);
  const [filtre, setFiltre] = useState<string>("nouveau");
  const [enCours, setEnCours] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const charger = useCallback(async () => {
    setChargement(true);
    setErreur(null);
    try {
      const res = await fetch(
        `/api/admin/signalements${filtre ? `?statut=${filtre}` : ""}`
      );
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setListe(data.signalements ?? []);
        setTotal(data.total ?? 0);
      } else {
        setErreur(data?.error ?? "Chargement impossible.");
      }
    } catch {
      setErreur("Erreur réseau.");
    }
    setChargement(false);
  }, [filtre]);

  useEffect(() => {
    charger();
  }, [charger]);

  async function patch(id: string, corps: Record<string, unknown>) {
    setEnCours(id);
    setErreur(null);
    try {
      const res = await fetch("/api/admin/signalements", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...corps }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        await charger();
      } else {
        setErreur(data?.error ?? "Action impossible.");
      }
    } catch {
      setErreur("Erreur réseau.");
    }
    setEnCours(null);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Signalements</h1>
            <p className="text-sm text-slate-400">
              Ce que les gens ont trouvé cassé — {total} dans cette vue.
            </p>
          </div>
          <Link
            href="/admin/dashboard"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-900"
          >
            ← Dashboard
          </Link>
        </header>

        <div className="flex flex-wrap gap-2">
          {FILTRES.map(([v, label]) => (
            <button
              key={label}
              type="button"
              onClick={() => setFiltre(v)}
              className={[
                "rounded-xl px-3 py-2 text-xs font-bold transition",
                filtre === v
                  ? "bg-emerald-500 text-slate-950"
                  : "border border-slate-700 text-slate-300 hover:bg-slate-900",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>

        {erreur && (
          <p className="rounded-xl border border-rose-700 bg-rose-900/30 px-4 py-3 text-sm font-semibold text-rose-100">
            {erreur}
          </p>
        )}

        {chargement ? (
          <p className="text-sm text-slate-400">Chargement…</p>
        ) : liste.length === 0 ? (
          <p className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-400">
            Rien ici. Le formulaire est sur{" "}
            <Link href="/signaler-une-erreur" className="underline">
              /signaler-une-erreur
            </Link>
            .
          </p>
        ) : (
          <ul className="space-y-3">
            {liste.map((s) => {
              const meta = TYPE_META[s.type] ?? TYPE_META.bug;
              const occupe = enCours === s.id;
              const aDuContexte =
                s.page || s.question || s.notion_lue || s.ressource_visee;
              return (
                <li
                  key={s.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${meta.badge}`}>
                      {meta.emoji} {meta.label}
                    </span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold text-white/80">
                      {STATUT_LABEL[s.statut]}
                    </span>
                    {s.points_attribues > 0 && (
                      <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-xs font-black text-emerald-200">
                        +{s.points_attribues} pts
                      </span>
                    )}
                    {s.ia_probable && (
                      <span className="rounded-full bg-fuchsia-400/15 px-2 py-0.5 text-xs font-bold text-fuchsia-200">
                        🤖 IA probable
                      </span>
                    )}
                    <span className="text-xs font-semibold text-slate-400">
                      {s.connecte
                        ? `${s.code_etablissement} / ${s.code_utilisateur}`
                        : "anonyme"}
                      {s.profil ? ` · se dit ${s.profil}` : ""}
                    </span>
                    <span className="ml-auto text-xs text-slate-500">
                      {formatDate(s.created_at)}
                    </span>
                  </div>

                  {/* Le contexte AVANT le message : c'est lui qui rend le
                      signalement corrigeable. */}
                  {aDuContexte && (
                    <ul className="mt-2 space-y-0.5 rounded-xl border border-sky-800/50 bg-sky-950/30 p-3 text-xs font-semibold text-sky-100/80">
                      {s.page && <li>Page : {s.page}</li>}
                      {s.question && <li>Question : « {s.question} »</li>}
                      {s.notion_lue && <li>Notion : {s.notion_lue}</li>}
                      {s.ressource_visee && <li>Ressource : {s.ressource_visee}</li>}
                    </ul>
                  )}

                  <p className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-950/60 p-3 text-sm text-slate-200">
                    {s.message}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {/* Retenir ET payer : un seul geste. */}
                    {s.connecte ? (
                      <>
                        <button
                          type="button"
                          disabled={occupe}
                          onClick={() => patch(s.id, { points: POINTS_SIGNALEMENT_RETENU })}
                          className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-slate-950 hover:bg-emerald-400 disabled:opacity-40"
                        >
                          ✅ Retenir · +{POINTS_SIGNALEMENT_RETENU}
                        </button>
                        <button
                          type="button"
                          disabled={occupe}
                          onClick={() => patch(s.id, { points: POINTS_SIGNALEMENT_CORRIGE })}
                          className="rounded-xl border border-emerald-600 px-4 py-2 text-sm font-bold text-emerald-200 hover:bg-emerald-900/40 disabled:opacity-40"
                          title="Le cran au-dessus : ça a produit une correction en ligne."
                        >
                          Corrigé · +{POINTS_SIGNALEMENT_CORRIGE}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        disabled={occupe}
                        onClick={() => patch(s.id, { statut: "traite" })}
                        className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-slate-950 hover:bg-emerald-400 disabled:opacity-40"
                        title="Anonyme : rien à créditer, mais le signalement compte."
                      >
                        ✅ Retenir
                      </button>
                    )}
                    {s.statut !== "vu" && (
                      <button
                        type="button"
                        disabled={occupe}
                        onClick={() => patch(s.id, { statut: "vu" })}
                        className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-40"
                      >
                        Vu, à voir plus tard
                      </button>
                    )}
                    {s.statut !== "rejete" && (
                      <button
                        type="button"
                        disabled={occupe}
                        onClick={() => patch(s.id, { statut: "rejete", points: 0 })}
                        className="rounded-xl border border-rose-800 px-4 py-2 text-sm font-bold text-rose-200 hover:bg-rose-900/40 disabled:opacity-40"
                      >
                        Rejeter
                      </button>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={notes[s.id] ?? s.note_interne ?? ""}
                      onChange={(e) => setNotes((p) => ({ ...p, [s.id]: e.target.value }))}
                      placeholder="Note interne"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-slate-600"
                    />
                    <button
                      type="button"
                      disabled={occupe}
                      onClick={() => patch(s.id, { note: notes[s.id] ?? s.note_interne ?? "" })}
                      className="shrink-0 rounded-xl border border-slate-700 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-40"
                    >
                      Noter
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
