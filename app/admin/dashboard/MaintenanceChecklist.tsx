"use client";

// Checklist de maintenance du dashboard admin. La LISTE vient du code
// (lib/admin/maintenance.ts) ; l'état coché est persisté en base via
// /api/admin/maintenance (table maintenance_checklist) → tient d'un jour à
// l'autre et d'un appareil à l'autre. Se remet à zéro chaque jour / semaine :
// chaque période a sa propre clé (jour = date, semaine = semaine ISO).

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  MAINTENANCE_QUOTIDIEN,
  MAINTENANCE_HEBDO,
  type TacheMaintenance,
} from "@/lib/admin/maintenance";

// Clé de jour locale (YYYY-MM-DD) — le reset suit minuit local, pas UTC.
function jourKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const j = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${j}`;
}

// Clé de semaine ISO locale (YYYY-Www) — reset le lundi.
function semaineKey(d: Date): string {
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = (date.getDay() + 6) % 7; // lundi = 0
  date.setDate(date.getDate() - day + 3); // jeudi de la semaine ISO
  const jeudi = date.getTime();
  date.setMonth(0, 1);
  if (date.getDay() !== 4) {
    date.setMonth(0, 1 + ((4 - date.getDay() + 7) % 7));
  }
  const semaine = 1 + Math.ceil((jeudi - date.getTime()) / 604800000);
  return `${new Date(jeudi).getFullYear()}-W${semaine}`;
}

function Section({
  titre,
  sousTitre,
  taches,
  done,
  onToggle,
  couleur,
}: {
  titre: string;
  sousTitre: string;
  taches: TacheMaintenance[];
  done: Set<string>;
  onToggle: (id: string) => void;
  couleur: string;
}) {
  const faits = taches.filter((t) => done.has(t.id)).length;
  const tout = faits === taches.length;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-white">{titre}</p>
          <p className="text-xs text-slate-500">{sousTitre}</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-black ${
            tout ? "bg-emerald-500/20 text-emerald-300" : `${couleur}`
          }`}
        >
          {faits}/{taches.length} {tout ? "✓" : ""}
        </span>
      </div>
      <ul className="space-y-1.5">
        {taches.map((t) => {
          const coche = done.has(t.id);
          return (
            <li key={t.id}>
              <div
                className={`flex items-start gap-3 rounded-lg border p-2.5 transition ${
                  coche
                    ? "border-emerald-800/60 bg-emerald-900/20"
                    : "border-slate-800 bg-slate-900/40 hover:bg-slate-900"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onToggle(t.id)}
                  aria-pressed={coche}
                  aria-label={coche ? `Décocher : ${t.label}` : `Cocher : ${t.label}`}
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border text-xs font-black transition ${
                    coche
                      ? "border-emerald-500 bg-emerald-500 text-slate-950"
                      : "border-slate-600 bg-slate-800 text-transparent hover:border-slate-400"
                  }`}
                >
                  ✓
                </button>
                <button
                  type="button"
                  onClick={() => onToggle(t.id)}
                  className="min-w-0 flex-1 text-left"
                >
                  <p
                    className={`text-sm font-semibold ${
                      coche ? "text-slate-500 line-through" : "text-slate-100"
                    }`}
                  >
                    {t.label}
                  </p>
                  {t.detail && (
                    <p className="mt-0.5 text-xs leading-snug text-slate-500">
                      {t.detail}
                    </p>
                  )}
                </button>
                {t.href && (
                  <Link
                    href={t.href}
                    target="_blank"
                    className="mt-0.5 shrink-0 rounded-md px-2 py-1 text-xs font-bold text-sky-400 transition hover:bg-sky-500/10 hover:text-sky-300"
                  >
                    Ouvrir ↗
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function MaintenanceChecklist() {
  const [cles, setCles] = useState<{ jour: string; semaine: string } | null>(null);
  const [doneQ, setDoneQ] = useState<Set<string>>(new Set());
  const [doneH, setDoneH] = useState<Set<string>>(new Set());
  const [charge, setCharge] = useState(false);

  // Clés calculées côté client (heure locale) → reset aligné sur minuit local.
  useEffect(() => {
    setCles({ jour: jourKey(new Date()), semaine: semaineKey(new Date()) });
  }, []);

  // Charge l'état coché pour aujourd'hui / cette semaine.
  useEffect(() => {
    if (!cles) return;
    let annule = false;
    fetch(
      `/api/admin/maintenance?jour=${cles.jour}&semaine=${cles.semaine}`
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (annule) return;
        setDoneQ(new Set<string>(data.quotidien ?? []));
        setDoneH(new Set<string>(data.hebdo ?? []));
        setCharge(true);
      })
      .catch(() => {
        if (!annule) setCharge(true); // on affiche quand même la liste (vide)
      });
    return () => {
      annule = true;
    };
  }, [cles]);

  const toggle = useCallback(
    (periode: "quotidien" | "hebdo", id: string) => {
      if (!cles) return;
      const done = periode === "quotidien" ? doneQ : doneH;
      const set = periode === "quotidien" ? setDoneQ : setDoneH;
      const fait = !done.has(id);

      // Optimiste : on met à jour l'UI tout de suite.
      const suivant = new Set(done);
      if (fait) suivant.add(id);
      else suivant.delete(id);
      set(suivant);

      fetch("/api/admin/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          periode,
          cle_periode: periode === "quotidien" ? cles.jour : cles.semaine,
          tache_id: id,
          fait,
        }),
      }).catch(() => {
        // Échec réseau : on revient à l'état précédent.
        const retour = new Set(suivant);
        if (fait) retour.delete(id);
        else retour.add(id);
        set(retour);
      });
    },
    [cles, doneQ, doneH]
  );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-4">
        <h2 className="text-lg font-black text-white">🛠️ Maintenance</h2>
        <p className="text-sm text-slate-400">
          La routine à tenir. Les cases se remettent à zéro chaque jour / semaine.
        </p>
      </div>

      {!charge ? (
        <p className="text-sm text-slate-500">Chargement…</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Section
            titre="Chaque jour"
            sousTitre="Réinitialisé à minuit"
            taches={MAINTENANCE_QUOTIDIEN}
            done={doneQ}
            onToggle={(id) => toggle("quotidien", id)}
            couleur="bg-amber-500/20 text-amber-300"
          />
          <Section
            titre="Chaque semaine"
            sousTitre="Réinitialisé le lundi"
            taches={MAINTENANCE_HEBDO}
            done={doneH}
            onToggle={(id) => toggle("hebdo", id)}
            couleur="bg-sky-500/20 text-sky-300"
          />
        </div>
      )}
    </section>
  );
}
