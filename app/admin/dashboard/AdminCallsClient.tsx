"use client";

// Encart « inscriptions aux calls » du dashboard admin : qui s'est inscrit à
// quel call En direct (lib/calls.ts), avec export CSV pour l'envoi du lien
// visio via Resend. Lecture via /api/admin/calls (cookie admin).

import { useEffect, useState } from "react";
import { formatDateCall } from "@/lib/calls";

type Inscrit = {
  call_id: string;
  email: string;
  prenom: string | null;
  role: string;
  consentement_newsletter: boolean;
  present: boolean | null;
  created_at: string;
};

type CallAdmin = {
  id: string;
  titre: string;
  date: string;
  actif: boolean;
  lienVisioRenseigne: boolean;
  inscrits: Inscrit[];
};

const ROLE_EMOJI: Record<string, string> = {
  eleve: "🎓",
  parent: "👪",
  enseignant: "🍎",
};

function dateInscription(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default function AdminCallsClient() {
  const [calls, setCalls] = useState<CallAdmin[]>([]);
  const [erreur, setErreur] = useState<string | null>(null);
  const [charge, setCharge] = useState(false);

  useEffect(() => {
    let actif = true;
    fetch("/api/admin/calls")
      .then((r) => r.json())
      .then((data) => {
        if (!actif) return;
        if (data?.ok) setCalls(data.calls ?? []);
        else setErreur(data?.error || "Erreur de chargement.");
        setCharge(true);
      })
      .catch(() => {
        if (actif) {
          setErreur("Erreur de chargement.");
          setCharge(true);
        }
      });
    return () => {
      actif = false;
    };
  }, []);

  const total = calls.reduce((s, c) => s + c.inscrits.length, 0);

  return (
    <section className="rounded-xl border border-rose-800 bg-rose-950/30 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-bold text-rose-300">🔴 Calls en direct — inscriptions</p>
          <p className="mt-0.5 text-xs text-slate-400">
            Les calls vivent dans <code className="rounded bg-slate-800 px-1">lib/calls.ts</code> ;
            les inscrits ci-dessous. Export CSV pour envoyer le lien visio (Resend).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-rose-500/15 px-2.5 py-1 text-xs font-bold text-rose-300">
            {total} inscrit{total > 1 ? "s" : ""}
          </span>
          <a
            href="/api/admin/calls?format=csv"
            className="rounded-full border border-slate-700 px-3 py-1 text-xs font-bold text-slate-300 transition hover:bg-slate-800"
          >
            ⬇ CSV
          </a>
        </div>
      </div>

      {erreur && <p className="mt-3 text-sm text-rose-400">{erreur}</p>}
      {charge && !erreur && calls.length === 0 && (
        <p className="mt-3 text-sm text-slate-400">Aucun call défini.</p>
      )}

      <div className="mt-3 space-y-3">
        {calls.map((c) => (
          <div key={c.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-slate-200">{c.titre}</p>
                <p className="text-xs text-slate-500">
                  {formatDateCall(c.date)}
                  {!c.lienVisioRenseigne && (
                    <span className="ml-2 rounded bg-amber-500/15 px-1.5 py-0.5 text-[11px] font-bold text-amber-300">
                      ⚠ lien visio à renseigner
                    </span>
                  )}
                </p>
              </div>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-300">
                {c.inscrits.length} inscrit{c.inscrits.length > 1 ? "s" : ""}
              </span>
            </div>

            {c.inscrits.length > 0 && (
              <ul className="mt-2 space-y-1">
                {c.inscrits.map((i) => (
                  <li
                    key={`${i.call_id}-${i.email}`}
                    className="flex flex-wrap items-center justify-between gap-2 rounded bg-slate-950/50 px-2.5 py-1.5 text-xs"
                  >
                    <span className="font-semibold text-slate-300">
                      {ROLE_EMOJI[i.role] ?? "❔"} {i.prenom ? `${i.prenom} · ` : ""}
                      {i.email}
                      {i.consentement_newsletter && (
                        <span className="ml-1.5 text-emerald-400" title="OK newsletter">📣</span>
                      )}
                    </span>
                    <span className="text-slate-600">{dateInscription(i.created_at)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
