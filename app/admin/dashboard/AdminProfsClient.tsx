"use client";

// 👩‍🏫 PROFS À VALIDER (25/11/2026) — Frédéric : « lance aussi prof gmail ».
// Un prof inscrit avec une adresse non académique ne peut pas créer de classe
// tant qu'il n'est pas validé. Un clic ici : il peut créer ses classes au
// prochain chargement de « Mes classes ». Route : /api/admin/profs.

import { useCallback, useEffect, useState } from "react";

type Prof = { id: string; email: string | null; nom: string | null; created_at?: string | null };

const date = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "";

export default function AdminProfsClient() {
  const [aValider, setAValider] = useState<Prof[] | null>(null);
  const [valides, setValides] = useState<Prof[]>([]);
  const [message, setMessage] = useState<{ ok: boolean; texte: string } | null>(null);
  const [enCours, setEnCours] = useState<string | null>(null);

  const charger = useCallback(async () => {
    const res = await fetch("/api/admin/profs", { cache: "no-store" });
    const d = await res.json().catch(() => ({}));
    if (!res.ok || !d?.ok) {
      setMessage({ ok: false, texte: d?.error ?? "Liste des profs indisponible." });
      setAValider([]);
      return;
    }
    setAValider(d.aValider ?? []);
    setValides(d.valides ?? []);
  }, []);

  useEffect(() => {
    charger();
  }, [charger]);

  async function changer(p: Prof, valide: boolean) {
    const qui = p.nom ? `${p.nom} (${p.email})` : p.email;
    if (!valide && !window.confirm(`Retirer la validation de ${qui} ? Il ne pourra plus créer de classe.`)) return;
    setEnCours(p.id);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/profs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: p.id, valide }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok || !d?.ok) {
        setMessage({ ok: false, texte: d?.error ?? "Erreur. Réessayez." });
        return;
      }
      setMessage({
        ok: true,
        texte: valide
          ? `${qui} est validé : il peut créer ses classes dans « Mes classes ».`
          : `Validation retirée pour ${qui}.`,
      });
      await charger();
    } finally {
      setEnCours(null);
    }
  }

  const ligne = (p: Prof, valide: boolean) => (
    <li key={p.id} className="flex flex-wrap items-center gap-3 rounded-lg bg-slate-900/60 px-3 py-2">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{p.nom || "(sans nom)"}</p>
        <p className="truncate text-xs text-slate-400">
          {p.email} · inscrit le {date(p.created_at)}
        </p>
      </div>
      <button
        type="button"
        onClick={() => changer(p, valide)}
        disabled={enCours === p.id}
        className={
          valide
            ? "rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500 disabled:opacity-50"
            : "rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 disabled:opacity-50"
        }
      >
        {enCours === p.id ? "…" : valide ? "✅ Valider" : "Retirer"}
      </button>
    </li>
  );

  return (
    <section className="rounded-xl border border-violet-700 bg-violet-950/30 p-4">
      <p className="font-bold text-violet-300">
        👩‍🏫 Profs à valider
        {aValider && aValider.length > 0 && (
          <span className="ml-2 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-black text-slate-900">
            {aValider.length}
          </span>
        )}
      </p>
      <p className="mt-0.5 text-xs text-slate-400">
        Profs inscrits avec une adresse non académique (gmail…). Sans validation, ils ne peuvent pas créer de
        classe. Les adresses @ac-…fr n&apos;ont pas besoin d&apos;être validées.
      </p>

      {aValider === null && <p className="mt-3 text-sm text-slate-400">Chargement…</p>}
      {aValider && aValider.length === 0 && (
        <p className="mt-3 text-sm text-slate-400">Aucun prof en attente.</p>
      )}
      {aValider && aValider.length > 0 && <ul className="mt-3 space-y-2">{aValider.map((p) => ligne(p, true))}</ul>}

      {valides.length > 0 && (
        <details className="mt-3">
          <summary className="cursor-pointer text-xs font-semibold text-slate-400">
            Déjà validés ({valides.length})
          </summary>
          <ul className="mt-2 space-y-2">{valides.map((p) => ligne(p, false))}</ul>
        </details>
      )}

      {message && (
        <p className={`mt-2 text-sm ${message.ok ? "text-emerald-300" : "text-red-400"}`}>{message.texte}</p>
      )}
    </section>
  );
}
