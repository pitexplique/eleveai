"use client";

// Les candidatures à la bêta — accepter, refuser, annoter.
//
// Le geste central tient en un bouton : « Accepter ». Il fait deux choses que
// rien d'autre ne fait — il donne la place ET il donne le numéro, attribué par
// le serveur. C'est ce numéro que le bêta testeur gardera toute l'année.
//
// Les quotas sont affichés en haut, pas cachés dans une règle : ils sont la
// seule raison d'avoir 50 places réparties plutôt qu'une file d'attente.

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { NIVEAU_LABEL, placeDe } from "@/lib/beta/places";

type Candidature = {
  id: string;
  created_at: string;
  email: string | null;
  code_etablissement: string | null;
  code_utilisateur: string | null;
  prenom: string | null;
  groupe: string;
  niveau: string | null;
  motivation: string | null;
  statut: "candidat" | "accepte" | "refuse" | "termine";
  numero_place: number | null;
  note_interne: string | null;
};

type Quota = {
  groupe: string;
  label: string;
  places: number;
  prises: number;
  restantes: number;
  enAttente: number;
};

const STATUT_META: Record<
  Candidature["statut"],
  { label: string; badge: string }
> = {
  candidat: { label: "En attente", badge: "bg-amber-400/15 text-amber-200 ring-1 ring-amber-300/30" },
  accepte: { label: "Accepté", badge: "bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/30" },
  refuse: { label: "Refusé", badge: "bg-rose-400/15 text-rose-200 ring-1 ring-rose-300/30" },
  termine: { label: "Terminé", badge: "bg-slate-400/15 text-slate-300 ring-1 ring-slate-300/30" },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function AdminBetaClient() {
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [annee, setAnnee] = useState("");
  const [total, setTotal] = useState(0);
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [quotas, setQuotas] = useState<Quota[]>([]);
  const [filtre, setFiltre] = useState<"candidat" | "accepte" | "tous">("candidat");
  const [enCours, setEnCours] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const charger = useCallback(async () => {
    setChargement(true);
    setErreur(null);
    try {
      const res = await fetch("/api/admin/beta-testeurs");
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setCandidatures(data.candidatures ?? []);
        setQuotas(data.quotas ?? []);
        setAnnee(data.annee ?? "");
        setTotal(data.total ?? 0);
      } else {
        setErreur(data?.error ?? "Chargement impossible.");
      }
    } catch {
      setErreur("Erreur réseau.");
    }
    setChargement(false);
  }, []);

  useEffect(() => {
    charger();
  }, [charger]);

  async function changerStatut(
    c: Candidature,
    statut: Candidature["statut"],
    forcer = false
  ) {
    setEnCours(c.id);
    try {
      const res = await fetch("/api/admin/beta-testeurs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: c.id, statut, forcer }),
      });
      const data = await res.json().catch(() => ({}));

      // Groupe complet : on ne passe pas en force sans le dire. La répartition
      // est le seul intérêt des 50 places.
      if (res.status === 409 && data?.erreur === "groupe-complet") {
        setEnCours(null);
        if (
          window.confirm(
            `${data.error}\n\nL'accepter quand même dépassera le quota de ce groupe. Continuer ?`
          )
        ) {
          await changerStatut(c, statut, true);
        }
        return;
      }

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

  async function enregistrerNote(c: Candidature) {
    const note = notes[c.id] ?? c.note_interne ?? "";
    setEnCours(c.id);
    try {
      await fetch("/api/admin/beta-testeurs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: c.id, note }),
      });
      await charger();
    } catch {
      setErreur("Erreur réseau.");
    }
    setEnCours(null);
  }

  const visibles = candidatures.filter((c) =>
    filtre === "tous" ? true : c.statut === filtre
  );
  const prises = quotas.reduce((s, q) => s + q.prises, 0);
  const enAttente = candidatures.filter((c) => c.statut === "candidat").length;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Bêta testeurs {annee}</h1>
            <p className="text-sm text-slate-400">
              {prises} place{prises > 1 ? "s" : ""} attribuée{prises > 1 ? "s" : ""} sur{" "}
              {total} · {enAttente} candidature{enAttente > 1 ? "s" : ""} en attente
            </p>
          </div>
          <Link
            href="/admin/dashboard"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-900"
          >
            ← Dashboard
          </Link>
        </header>

        {/* ── LES QUOTAS ────────────────────────────────────────────────── */}
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {quotas.map((q) => {
            const complet = q.restantes === 0;
            return (
              <div
                key={q.groupe}
                className={[
                  "rounded-xl border p-3",
                  complet
                    ? "border-emerald-700/60 bg-emerald-900/20"
                    : "border-slate-800 bg-slate-900/40",
                ].join(" ")}
              >
                <p className="text-sm font-bold text-slate-200">{q.label}</p>
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  {q.prises} / {q.places}
                  {complet ? " — complet" : ` · ${q.restantes} libre${q.restantes > 1 ? "s" : ""}`}
                  {q.enAttente > 0 ? ` · ${q.enAttente} en attente` : ""}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── FILTRES ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["candidat", "En attente"],
              ["accepte", "Acceptés"],
              ["tous", "Tous"],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
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
        ) : visibles.length === 0 ? (
          <p className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-400">
            Aucune candidature ici pour l’instant. La page publique est{" "}
            <Link href="/devenir-beta-testeur" className="underline">
              /devenir-beta-testeur
            </Link>
            .
          </p>
        ) : (
          <ul className="space-y-3">
            {visibles.map((c) => {
              const meta = STATUT_META[c.statut];
              const place = placeDe(c.groupe);
              const occupe = enCours === c.id;
              return (
                <li
                  key={c.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${meta.badge}`}>
                      {meta.label}
                    </span>
                    {c.numero_place != null && (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-black text-white">
                        n°{c.numero_place}
                      </span>
                    )}
                    <span className="text-sm font-bold text-slate-200">
                      {c.prenom || "— sans prénom —"}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {place?.label ?? c.groupe}
                      {c.niveau ? ` · ${NIVEAU_LABEL[c.niveau] ?? c.niveau}` : ""}
                    </span>
                    <span className="ml-auto text-xs text-slate-500">
                      {formatDate(c.created_at)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    {c.email
                      ? c.email
                      : `${c.code_etablissement ?? "?"} / ${c.code_utilisateur ?? "?"}`}
                  </p>

                  {c.motivation && (
                    <p className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-950/60 p-3 text-sm text-slate-200">
                      {c.motivation}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.statut !== "accepte" && (
                      <button
                        type="button"
                        disabled={occupe}
                        onClick={() => changerStatut(c, "accepte")}
                        className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-slate-950 hover:bg-emerald-400 disabled:opacity-40"
                      >
                        {occupe ? "…" : "✅ Accepter"}
                      </button>
                    )}
                    {c.statut !== "refuse" && (
                      <button
                        type="button"
                        disabled={occupe}
                        onClick={() => changerStatut(c, "refuse")}
                        className="rounded-xl border border-rose-700 px-4 py-2 text-sm font-bold text-rose-200 hover:bg-rose-900/40 disabled:opacity-40"
                      >
                        Refuser
                      </button>
                    )}
                    {c.statut !== "candidat" && (
                      <button
                        type="button"
                        disabled={occupe}
                        onClick={() => changerStatut(c, "candidat")}
                        className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-40"
                      >
                        Remettre en attente
                      </button>
                    )}
                    {c.statut === "accepte" && (
                      <button
                        type="button"
                        disabled={occupe}
                        onClick={() => changerStatut(c, "termine")}
                        className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-40"
                        title="Il a arrêté en cours d'année : la place se libère, le numéro lui reste."
                      >
                        Terminer
                      </button>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={notes[c.id] ?? c.note_interne ?? ""}
                      onChange={(e) =>
                        setNotes((p) => ({ ...p, [c.id]: e.target.value }))
                      }
                      placeholder="Note interne (pour toi seul)"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-slate-600"
                    />
                    <button
                      type="button"
                      disabled={occupe}
                      onClick={() => enregistrerNote(c)}
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
